### PIKAN

```yaml
id: pikan
name: PIKAN
full_name: KAN物理信息网络 (Physics-Informed KAN)
year: '2026'
org: ResearchGate
paper_url: https://www.researchgate.net/publication/384994434
category: pde_solving
parent: pinn
motivation: KAN替代MLP增强高维处理能力
```

#### 📝 一句话总结

PIKAN 用 Kolmogorov-Arnold Network 替换传统 PINN 中的 MLP，使物理残差约束仍然保留，同时通过可学习的一维边函数、B-spline 或 wavelet 基函数提高微分方程解的表达效率。给定 ResearchGate 链接当前指向无关页面，因此本解读追溯同名方法的 arXiv/JMLR 论文和官方代码来源。

#### 🎯 核心要点

- **核心替换**：保持 PINN 的 collocation residual 训练范式，将网络近似器从 MLP 换成 KAN
- **理论动机**：利用 Kolmogorov-Arnold 表示思想，把多变量函数表示成一维函数叠加，适合学习复杂但结构化的动力学解
- **两类实现**：Efficient-KAN 使用 B-spline/网格化边函数降低原始 KAN 的计算负担，WAV-KAN 使用 wavelet 基函数改善局部和多尺度表达
- **两种训练模式**：DF-PIKAN 在无标签数据时只用方程残差和初/边值损失，DD-PIKAN 在复杂问题中额外加入观测/数值解数据项
- **物理损失结构**：由 PDE/ODE residual loss、初值/边界条件 loss、可选数据 loss 加权组成
- **验证范围**：论文覆盖线性/非线性 ODE、Lorenz 系统、简谐振子、非线性摆、Mathieu、Van der Pol、Burgers 和 Allen-Cahn 等微分方程
- **相对 PINN 的收益**：在若干 case 中用更浅或更小的网络达到相近或更低误差，减少架构调参压力
- **来源限制**：任务给定的 ResearchGate ID `384994434` 访问时跳转到一篇阿拉伯语教学网页论文，不是 PIKAN；可访问方法来源为 https://arxiv.org/abs/2407.18373、https://www.jmlr.org/papers/v26/24-1278.html 和 https://github.com/AI-and-Quantum-Computing/PIKAN

#### 🔬 深入细节

##### 图示与来源

![PIKAN 训练结果示例](https://arxiv.org/html/2407.18373v2/x1.png)
*图：PIKAN 论文 arXiv HTML 中的示例训练曲线与数值解对比图。该论文没有给出单独的总架构图；方法结构可从 arXiv/JMLR 论文正文和官方 GitHub 代码复现。*

##### 算法伪代码

```python
# Physics-Informed KAN for an ODE/PDE
def pikan_train(collocation_points, boundary_points, data=None):
    model = KAN(width=[input_dim, hidden_dim, output_dim],
                basis="bspline_or_wavelet")  # Efficient-KAN or WAV-KAN

    for step in range(num_steps):
        x_f = sample(collocation_points)
        u_pred = model(x_f)

        # Autodiff computes derivatives needed by the governing equation.
        derivatives = autodiff(u_pred, x_f)
        residual = N(u_pred, derivatives, x_f)  # N[u](x)=0
        loss_phys = mean_square(residual)

        x_b, u_b = sample(boundary_points)
        loss_bc = mean_square(model(x_b) - u_b)

        loss_data = 0.0
        if data is not None:
            x_d, u_d = sample(data)
            loss_data = mean_square(model(x_d) - u_d)

        loss = loss_phys + lambda_bc * loss_bc + lambda_data * loss_data
        update(model.parameters(), loss)

    return model
```

##### 方法机制

PIKAN 的问题设定与 PINN 相同：给定微分方程

$$
\mathcal{N}[u](\mathbf{x})=0,\qquad \mathbf{x}\in\Omega,
$$

以及初值或边界条件

$$
\mathcal{B}[u](\mathbf{x})=g(\mathbf{x}),\qquad \mathbf{x}\in\partial\Omega,
$$

用神经网络 \(u_\theta(\mathbf{x})\) 近似未知解。标准 PINN 通常用 MLP 表示 \(u_\theta\)，再通过自动微分得到 \(\partial_t u_\theta,\nabla u_\theta,\Delta u_\theta\) 等导数，最小化方程残差和边界误差。PIKAN 的核心不是改变 physics-informed 目标，而是改变函数逼近器：把 MLP 换成 KAN，让每条边上的激活函数成为可学习的一维函数。

KAN 层可抽象写成

$$
z^{(\ell+1)}_j=\sum_i \phi^{(\ell)}_{ij}\left(z^{(\ell)}_i\right),
$$

其中 \(\phi_{ij}\) 不是固定 ReLU/Tanh，而是由 B-spline、wavelet 或其他基函数参数化的可学习一维函数。这个设计对应 Kolmogorov-Arnold 表示定理的直觉：高维连续函数可由一维函数叠加表达。对于 PDE/ODE 解，很多复杂性来自不同坐标方向、时间尺度和非线性项的组合；在边上学习一维函数可以用较小网络捕获这些组合关系。

PIKAN 的 data-free 版本只依赖物理约束：

$$
\mathcal{L}_{\mathrm{DF}}
=\frac{1}{N_f}\sum_{i=1}^{N_f}
\left\|\mathcal{N}[u_\theta](\mathbf{x}_i^f)\right\|_2^2
+\lambda_b\frac{1}{N_b}\sum_{i=1}^{N_b}
\left\|\mathcal{B}[u_\theta](\mathbf{x}_i^b)-g(\mathbf{x}_i^b)\right\|_2^2.
$$

当方程复杂、残差优化难以收敛或存在观测数据时，data-driven 版本加入监督项：

$$
\mathcal{L}_{\mathrm{DD}}
=\mathcal{L}_{\mathrm{DF}}
+\lambda_d\frac{1}{N_d}\sum_{i=1}^{N_d}
\left\|u_\theta(\mathbf{x}_i^d)-u_i^d\right\|_2^2.
$$

这和 PINN 的训练目标非常接近，因此 PIKAN 可以直接继承 collocation sampling、初/边值惩罚、Adam/AdamW 优化和自动微分流程。区别在于模型内部的频率和局部结构表达能力。Efficient-KAN 通过更高效的 B-spline 参数化降低原始 KAN 的内存与计算开销；WAV-KAN 用 wavelet basis 表示边函数，在振荡、尖峰或多尺度解中往往更容易表示局部变化。

论文对比了多类动力学问题。对于简单 ODE，DF-PIKAN 往往已经能靠残差拟合到数值解；对于耦合非线性系统、Lorenz、Burgers 或 Allen-Cahn 等问题，DD-PIKAN 的数据项能给优化提供额外引导。论文还指出若干 case 中 PIKAN 可以用比 PINN 更小的 architecture 达到相近精度，例如线性耦合系统可用一个较小 KAN 同时输出多个变量，而传统 PINN 往往需要为不同变量设置更深或更多神经元的 MLP。

需要注意的是，PIKAN 并不自动解决所有 PINN 难题。它仍然依赖 collocation 点覆盖、损失权重、优化器和边界条件处理；高维 PDE 中自动微分导数仍有计算成本。它的主要价值是提供一个更强的 physics-informed 函数逼近器，在不改变 PINN 问题形式的前提下改善表达效率、局部多尺度拟合能力和部分任务上的架构调参负担。

#### 🧪 练习题

```yaml
question: "PIKAN 与传统 PINN 最核心的架构差异是什么？"
options:
  - "PIKAN 删除了 PDE residual，只保留数据监督"
  - "PIKAN 用 KAN 替换 PINN 中的 MLP 作为解函数近似器"
  - "PIKAN 只能求解线性 ODE，不能处理 PDE"
  - "PIKAN 必须使用有限元网格，不支持 collocation 点"
answer: 1
explain: "PIKAN 保留 physics-informed residual、初值和边界损失，但把神经网络近似器换成 Efficient-KAN 或 WAV-KAN，以可学习边函数增强表达能力。"
```
