### MS-PINN — 多场耦合物理信息神经网络 (Multi-field coupled PINN)

```yaml
id: ms_pinn
name: MS-PINN
full_name: 多场耦合物理信息神经网络 (Multi-field coupled PINN)
year: '2026'
org: 大连理工大学
paper_url: https://arxiv.org/abs/2601.mspinn
category: pinn_family
parent: pinn
motivation: 金属凝固多场耦合演化建模
```

#### 📝 一句话总结

MS-PINN 将金属凝固中的速度场、温度场和压力场放入同一个 PINN 框架，用 Fourier 特征编码、自动微分物理残差、自适应损失和残差自适应采样共同约束多场耦合演化，解决传统 PINN 在凝固过程高频梯度、强耦合和局部误差区域上的训练困难。

#### 🎯 核心要点

- **多场联合预测**：网络以 \((x,y,t)\) 为输入，联合输出 \((u,v,T,p)\)，同时约束动量方程、连续性方程和能量方程
- **金属凝固物理残差**：显式使用密度 \(\rho\)、黏度 \(\mu\)、比热 \(C_p\)、导热系数 \(k\)，构造 Navier-Stokes 残差与热传导-对流残差
- **Fourier Feature Encoding (FFE)**：对空间和时间分别使用多尺度正弦/余弦映射，增强网络表达高频温度梯度与局部流动结构的能力
- **Self-Adaptive Loss (SAL)**：将 PDE 残差和边界/观测误差放入可学习不确定性权重中，减少手工调 loss 权重的依赖
- **Residual Adaptive Refinement (RAR/RAD)**：周期性在全域采样候选点，根据物理残差补充配点，使训练更关注误差集中的局部区域
- **NeuroPDE 软件化实现**：作者公开仓库将 PINN 训练、回调、可视化、checkpoint、RAR 与自适应损失模块化，便于扩展到 Burgers、扩散、Navier-Stokes 等 PDE
- **来源限制**：任务给出的 arXiv 链接 `https://arxiv.org/abs/2601.mspinn` 不可访问；可追溯到的正式条目为 Computers & Mathematics with Applications 207:60-78, DOI `10.1016/j.camwa.2026.01.015`，方法细节主要来自作者公开 GitHub 仓库

#### 🔬 深入细节

##### 图示与可访问来源

![MS-PINN 总体架构](https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/pinn.png)
*图：作者公开仓库中的 MS-PINN 架构。输入空间位置和时间，经过 FFE 与神经网络得到物理状态，自动微分生成 PDE、边界和初始条件损失，并通过 SAL/RAR 提升关键区域精度。*

![NeuroPDE 软件架构](https://raw.githubusercontent.com/baichen99/PINN-Software/main/images/softarc.png)
*图：NeuroPDE 的插件式训练框架，RAR、自适应损失、checkpoint 与可视化均通过训练回调插入。*

可访问来源说明：论文元信息可在 ResearchGate 条目 `https://www.researchgate.net/publication/403350092_MS-PINN_A_physics-informed_neural_network_for_multi-field_coupled_evolution_modeling_in_metal_solidification` 和 Mindat 索引 `https://www.mindat.org/reference.php?id=19598472` 查到；方法图、训练入口和模块代码来自作者仓库 `https://github.com/baichen99/PINN-Software`。由于论文全文未开放抓取，下述公式级解读以公开代码和 README 为主。

##### 算法伪代码

```python
# MS-PINN 训练逻辑简化版
def pde_residual(u, v, T, p, x, y, t):
    Cp, k = 448.0, 401.0
    rho, mu = 8920.0, 0.0032

    h = Cp * T
    r_energy = rho * (d(h, t) + u * d(h, x) + v * d(h, y)) \
               - k * (d2(T, x) + d2(T, y))

    r_u = d(u, t) + u * d(u, x) + v * d(u, y) \
          - mu / rho * (d2(u, x) + d2(u, y)) + d(p, x) / rho
    r_v = d(v, t) + u * d(v, x) + v * d(v, y) \
          - mu / rho * (d2(v, x) + d2(v, y)) + d(p, y) / rho
    r_c = d(u, x) + d(v, y)
    return [r_u, r_v, r_c, r_energy]

model = MLPWithFFE(
    input=(x, y, t),
    spatial_sigmas=[10, 1, 0.1, 0.01, 0.001, 0.0001],
    temporal_sigmas=[1, 0.1, 0.01],
    hidden_layers=[50] * 5,
    outputs=[u, v, T, p],
)

for epoch in range(25000):
    state = model(collocation_points)
    residual = pde_residual(*state, x, y, t)
    loss_pde = mean_square(residual, weights=[10, 10, 1, 1])
    loss_bc = mean_square(model(boundary_points)[:, supervised_dims] - bc_values,
                          weights=[1000, 1000])
    loss = self_adaptive_loss(loss_pde, loss_bc)
    update_network_with_adam(loss)

    if epoch % 1000 == 0:
        candidates = uniform_sample(domain, 5000)
        new_points = select_residual_refinement_points(candidates, top_k=50)
        collocation_points.add(new_points)
```

##### 多场耦合残差如何构造

MS-PINN 的核心不是单独预测温度或速度，而是把金属凝固中的热-流耦合关系写成同一个神经网络的物理残差。网络输出可记为

$$
\hat{\mathbf{s}}_\theta(x,y,t)=\big(u_\theta(x,y,t), v_\theta(x,y,t), T_\theta(x,y,t), p_\theta(x,y,t)\big).
$$

其中 \(u,v\) 是二维速度分量，\(T\) 是温度，\(p\) 是压力。公开训练脚本中采用的动量残差为

$$
r_u =
u_t + u u_x + v u_y
- \frac{\mu}{\rho}(u_{xx}+u_{yy})
+ \frac{1}{\rho}p_x,
$$

$$
r_v =
v_t + u v_x + v v_y
- \frac{\mu}{\rho}(v_{xx}+v_{yy})
+ \frac{1}{\rho}p_y,
$$

连续性残差为

$$
r_c = u_x + v_y.
$$

能量方程将焓近似写成 \(h=C_pT\)，残差为

$$
r_T =
\rho\left(h_t + u h_x + v h_y\right)
- k\left(T_{xx}+T_{yy}\right).
$$

> 💡 关键：所有导数都由自动微分从同一个网络输出得到，所以速度、压力和温度不会被分别拟合后再拼接，而是在反向传播中共享一组参数和互相牵制的物理约束。

##### Fourier 特征与空间-时间分解

金属凝固常见局部高温梯度、液固界面附近快速变化和局部流动结构，普通 MLP 的低频偏置容易把这些变化抹平。MS-PINN 的公开实现使用 `MLPWithFFE`，对空间 \(\mathbf{x}=(x,y)\) 和时间 \(t\) 分别构造多尺度 Fourier 特征：

$$
\gamma_{\sigma_x}(\mathbf{x}) =
\left[\sin(\mathbf{x}W_{\sigma_x}),\ \cos(\mathbf{x}W_{\sigma_x})\right],
\quad
\gamma_{\sigma_t}(t) =
\left[\sin(tW_{\sigma_t}),\ \cos(tW_{\sigma_t})\right].
$$

实现中会对多个 \(\sigma\) 的特征逐元素相乘，形成空间特征 \(H_x\) 与时间特征 \(H_t\)，再经共享 MLP 编码并相乘融合：

$$
H = \operatorname{MLP}_x(H_x)\odot \operatorname{MLP}_t(H_t),
\quad
\hat{\mathbf{s}}_\theta = \operatorname{Linear}(H).
$$

这种做法的直觉是：空间高频与时间高频先分别展开，再通过乘性融合表达“某个局部区域在某个时间阶段发生快速变化”的耦合模式，比简单拼接 \((x,y,t)\) 更适合相变和流动共同演化的场景。

##### 损失函数与自适应权重

基础损失可以写成

$$
\mathcal{L}_{pde}
=
\sum_{q\in\{u,v,c,T\}} \omega_q
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left|r_q(x_i,y_i,t_i)\right|^2,
$$

$$
\mathcal{L}_{bc}
=
\sum_j \beta_j
\frac{1}{N_b}\sum_{i=1}^{N_b}
\left|\hat{s}_{\theta,j}(x_i,y_i,t_i)-s_{j,i}^{bc}\right|^2.
$$

公开代码还启用了 self-adaptive loss，将 PDE 与边界误差放入可学习尺度参数中：

$$
\mathcal{L}
=
\frac{1}{2\exp(2s_1)}\mathcal{L}_{pde}
+
\frac{1}{2\exp(2s_2)}\mathcal{L}_{bc}
+ s_1+s_2.
$$

当某一类损失数值大且难优化时，可学习尺度会动态调整其影响，避免固定权重下“边界项压过 PDE”或“PDE 项压过数据”的问题。对金属凝固这类多场问题，这一点很重要，因为动量、连续性、能量方程的量纲和数值范围差异明显。

##### RAR/RAD 如何补点

PINN 的配点如果均匀撒在全域，局部界面、边界层或高梯度区域可能采样不足。MS-PINN 启用残差自适应补点：每隔固定 epoch 在 \([0,0.05]\times[0,0.05]\times[0,5]\) 的时空域重新采样候选点，计算这些点的 PDE 残差，并把选中的候选点追加到配点集合。

这一机制的物理意义是把训练预算从“已经满足方程的平滑区域”转移到“方程违反更明显的区域”。在凝固建模里，这通常对应温度快速变化、流动剪切更强或压力-速度耦合更难满足的位置。

##### 与普通 PINN 的区别

普通 PINN 通常写成一个标量场或少量变量的残差最小化问题，而 MS-PINN 的重点是多场耦合和工程过程建模。它不仅要求每个场分别拟合边界/观测数据，还要求速度、压力和温度在相同配点上共同满足动量守恒、质量守恒和能量守恒。

与“先用 CFD 生成数据、再训练代理模型”的流程相比，MS-PINN 的物理残差让无标签配点也参与训练，理论上可以减少对高密度 CFD 标签的依赖。与传统 CFD 相比，它牺牲了严格网格离散求解的确定性，换取可微、可快速推理、可与稀疏观测融合的神经场表达。

> ⚠️ 注意：由于可访问来源主要是公开仓库而不是论文全文，实验误差、消融表格和正式论文中的全部设定无法在此核验；本文只对公开可验证的方法机制作解读。

#### 🧪 练习题

```yaml
question: "MS-PINN 中 Fourier Feature Encoding 的主要作用是什么？"
options:
  - "把 PDE 残差替换成纯数据监督损失"
  - "增强网络表示空间和时间高频变化的能力"
  - "直接生成 CFD 网格并求解线性方程组"
  - "把温度场从模型输出中移除"
answer: 1
explain: "公开实现对空间和时间分别使用多尺度 sin/cos 映射，再经 MLP 融合，用于缓解普通 MLP 的低频偏置，更好表达凝固过程中的局部高梯度和瞬态变化。"
```
