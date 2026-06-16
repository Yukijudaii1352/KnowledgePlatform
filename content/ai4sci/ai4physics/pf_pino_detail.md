### PF-PINO

```yaml
id: pf_pino
name: PF-PINO
full_name: 相场物理神经算子 (Phase-Field PINO)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2603.09693
category: pde_solving
parent: fno
motivation: 相场方程残差提升长期稳定性
```

#### 📝 一句话总结

PF-PINO 将相场控制方程的 PDE residual 显式加入 FNO 的训练目标，解决纯数据驱动 FNO 在尖锐界面、长时间自回归 rollout 和参数外推时容易漂移的问题。它把神经算子作为可复用的参数化相场求解器，并通过物理残差、动态损失权重和可选测试时微调提高长期稳定性。

#### 🎯 核心要点

- **核心架构**：以 Fourier Neural Operator 为 backbone，输入当前状态 \(\mathbf{u}(\mathbf{x},t_n)\) 与静态参数场 \(\mathbf{a}(\mathbf{x})\)，输出下一步状态 \(\mathbf{u}(\mathbf{x},t_{n+1})\)
- **自回归时间推进**：训练一阶时间映射，推理时递归应用得到完整相场演化轨迹
- **物理信息损失**：在数据拟合误差之外加入相场 PDE residual，包括 Allen-Cahn、Cahn-Hilliard、热扩散等问题相关残差
- **残差计算方式**：空间导数可用有限差分或谱微分计算，避免 PINN 在高阶导数自动微分上的高内存开销
- **梯度归一化权重**：用各 loss 分量对模型参数的梯度范数动态调节数据项和物理项权重，缓解多物理残差量纲与收敛速率不一致
- **可选 rollout fine-tuning**：对测试实例沿整条预测轨迹最小化 PDE residual，修正自回归误差累积
- **验证任务**：覆盖 pencil-electrode corrosion、electro-polishing corrosion、dendritic crystal solidification、spinodal decomposition 四类相场 benchmark
- **相对 FNO 的收益**：在长期预测、参数插值/外推和界面形貌保持上显著优于纯数据 FNO

#### 🔬 深入细节

##### 图示与来源

![PF-PINO 框架图](https://arxiv.org/html/2603.09693v1/x1.png)
*图：PF-PINO 的自回归 FNO 框架、谱卷积模块以及数据损失/PDE residual 组合训练目标。可访问来源包括 arXiv HTML 页面 https://arxiv.org/html/2603.09693 和官方实现 https://github.com/NanxiiChen/PF-PINO。*

##### 算法伪代码

```python
# PF-PINO training / rollout sketch
for batch in phase_field_trajectories:
    u_n, a, u_next_ref = batch.current_state, batch.params, batch.next_state

    # 1. FNO learns a one-step operator.
    u_next_pred = FNO(theta)(concat(u_n, a))

    # 2. Supervised one-step fidelity.
    loss_data = mean_square(u_next_pred - u_next_ref)

    # 3. Physics residuals from the governing phase-field equations.
    residuals = []
    for equation in governing_equations:
        derivatives = finite_difference_or_spectral_derivative(u_next_pred, u_n, a)
        residuals.append(equation.residual(u_next_pred, u_n, a, derivatives))
    loss_pde = sum(mean_square(r) for r in residuals)

    # 4. Balance data and physics terms using gradient-normalized weights.
    w_data, w_pde = gradnorm_weights([loss_data, loss_pde], theta)
    loss = w_data * loss_data + w_pde * loss_pde
    update(theta, loss)

# Optional test-time fine-tuning over a full autoregressive trajectory.
u = u0
trajectory = []
for n in range(num_steps):
    u = FNO(theta)(concat(u, a))
    trajectory.append(u)
theta = fine_tune(theta, sum_pde_residuals(trajectory, a))
```

##### 方法机制

PF-PINO 的出发点是相场模型的两个矛盾：一方面，Allen-Cahn、Cahn-Hilliard 等方程能精确描述界面迁移、腐蚀、凝固和相分离，但传统 FEM/FDM 求解在大规模参数扫描中很慢；另一方面，FNO 能学习从参数场到解场的算子映射，却不天然满足质量守恒、界面能下降或热扩散耦合等物理约束。因此论文没有把 FNO 只当回归器，而是把它训练成一个满足控制方程的时间推进算子。

FNO 主体可以写成 lifting、谱卷积和 projection 三段：

$$
\mathbf{v}_0(\mathbf{x}) = \mathcal{P}(\mathbf{u}_n(\mathbf{x}),\mathbf{a}(\mathbf{x})), \qquad
\mathbf{v}_{\ell+1}(\mathbf{x}) =
\sigma\left(\mathcal{F}^{-1}\left(R_\ell \cdot \mathcal{F}(\mathbf{v}_\ell)\right)(\mathbf{x}) + W_\ell \mathbf{v}_\ell(\mathbf{x})\right),
$$

$$
\widehat{\mathbf{u}}_{n+1}(\mathbf{x})=\mathcal{Q}(\mathbf{v}_L(\mathbf{x})).
$$

这里 \(\mathcal{F}\) 与 \(\mathcal{F}^{-1}\) 是 Fourier 变换和逆变换，\(R_\ell\) 是低频 Fourier mode 上的可学习复权重，\(W_\ell\) 是物理空间旁路。相场问题通常有全局耦合、尖锐界面和多尺度形貌，谱卷积适合捕获非局部相互作用，同时保持 \(O(N\log N)\) 的 FFT 复杂度。

训练目标是 PF-PINO 的关键。对一般相场系统

$$
\mathcal{N}_k\left[\mathbf{u};\mathbf{a}\right](\mathbf{x},t)=0,\qquad k=1,\ldots,K,
$$

模型不仅最小化一步预测误差，还最小化每个控制方程的离散残差：

$$
\mathcal{L}_{\mathrm{data}}
=\frac{1}{N}\sum_{i=1}^{N}
\left\|\widehat{\mathbf{u}}_{n+1}(\mathbf{x}_i)-\mathbf{u}_{n+1}(\mathbf{x}_i)\right\|_2^2,
$$

$$
\mathcal{L}_{\mathrm{pde}}
=\sum_{k=1}^{K}\frac{1}{N}\sum_{i=1}^{N}
\left\|\mathcal{N}_k\left[\widehat{\mathbf{u}};\mathbf{a}\right](\mathbf{x}_i,t_{n+1})\right\|_2^2,
\qquad
\mathcal{L}=\lambda_d\mathcal{L}_{\mathrm{data}}+\lambda_p\mathcal{L}_{\mathrm{pde}}.
$$

在腐蚀 benchmark 中，模型要同时处理描述界面相变量 \(\phi\) 的 Allen-Cahn 动力学和描述离子浓度 \(c\) 的 Cahn-Hilliard 约束；在枝晶凝固中，\(\phi\) 与温度 \(T\) 通过潜热项耦合；在 spinodal decomposition 中，浓度守恒由 Cahn-Hilliard 方程控制。残差项迫使网络输出不仅“像训练数据”，还要在局部导数、守恒形式和耦合源项上接近数值解。

多项物理损失的尺度往往差异很大，例如 Cahn-Hilliard 的高阶导数残差可能比数据误差更难优化。PF-PINO 使用梯度归一化思想动态更新权重，直觉是让每个 loss 分量对参数更新的影响接近同一量级：

$$
\lambda_j \propto \frac{\overline{g}}{g_j+\epsilon},
\qquad
g_j=\left\|\nabla_\theta \mathcal{L}_j\right\|_2,
\qquad
\overline{g}=\frac{1}{M}\sum_{j=1}^{M}g_j.
$$

这样可以避免训练早期被某个大残差主导，也避免数据项过强导致模型忽略物理一致性。论文还给出测试时 rollout fine-tuning：固定某个测试参数场，从 \(t_0\) 递推到 \(T\)，再对整条轨迹的累计 residual 做少量优化。这个步骤不改变 PF-PINO 的基本算子学习设定，但能在高精度场景下进一步压低长时间误差。

与传统 PINN 相比，PF-PINO 学的是“参数到轨迹”的算子，不需要为每组材料参数或初始条件重新训练；与纯 FNO 相比，它在训练时看到控制方程，因此自回归误差不会那么快放大。论文实验中的一个重要现象是：单步 validation loss 低并不必然代表长时间 rollout 好，纯 FNO 即使一步误差可控，也可能在界面位置、枝晶形貌或相分离谱结构上持续漂移；PF-PINO 的 residual 约束正是针对这个长期稳定性缺口。

#### 🧪 练习题

```yaml
question: "PF-PINO 相比普通 FNO 的核心差异是什么？"
options:
  - "把 Fourier 卷积替换为 Transformer attention"
  - "只训练最后一个时间步，不做自回归预测"
  - "在数据拟合损失之外加入相场控制方程的 PDE residual"
  - "完全不使用数值模拟数据，只依赖边界条件"
answer: 2
explain: "PF-PINO 保留 FNO 的算子架构，但把 Allen-Cahn、Cahn-Hilliard、热扩散等相场方程残差加入训练目标，从而提升物理一致性和长期 rollout 稳定性。"
```
