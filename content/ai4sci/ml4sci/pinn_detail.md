### PINN — 物理信息神经网络 (Physics-Informed Neural Networks)

```yaml
id: pinn
name: PINN
full_name: 物理信息神经网络 (Physics-Informed Neural Networks)
year: '2019'
org: 布朗大学
paper_url: https://doi.org/10.1016/j.jcp.2018.10.045
category: pinn_family
parent: —
motivation: 利用自动微分将PDE残差嵌入损失函数
```

#### 📝 一句话总结

PINN 提出将偏微分方程（PDE）残差通过自动微分嵌入神经网络损失函数，使网络在仅有少量标注数据的情况下即可求解正问题与反问题，开创了物理信息深度学习范式。

#### 🎯 核心要点

- **通用 PDE 框架**：将 PDE 统一表示为 \(u_t + \mathcal{N}[u] = 0\)，适用于任意非线性偏微分方程
- **物理残差损失**：定义 \(f := u_t + \mathcal{N}[u]\)，通过自动微分精确计算，将 PDE 残差作为损失项 \(\text{MSE}_f\) 约束网络
- **两种时间处理方案**：连续时间模型（直接以 \((t,x)\) 为输入）与离散时间模型（将隐式 Runge-Kutta 嵌入网络结构）
- **数据高效**：Burgers 方程仅需 100 个标注点 + 10000 个配点即可达到 \(6.7 \times 10^{-4}\) 的 \(\mathcal{L}_2\) 相对误差
- **离散时间大步推进**：利用 500 阶隐式 Runge-Kutta 方案，理论时间误差 \(\mathcal{O}(\Delta t^{1000}) \approx 10^{-97}\)，单步即可跨越整个时间域
- **正/反问题统一**：同一框架可用于求解 PDE（正问题）和识别未知参数（反问题）
- **四个基准验证**：Burgers 方程、Schrödinger 方程、Allen-Cahn 方程、KdV 方程

#### 🔬 深入细节

##### 核心架构示意

![PINN 连续时间模型示意图](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x1.png)
*图：连续时间 PINN 架构。左侧神经网络以 \((t, x)\) 为输入，输出 \(u(t,x)\)；右侧通过自动微分构造物理残差 \(f = u_t + \mathcal{N}[u]\)，两者共享参数。*

![PINN 离散时间模型示意图](https://ar5iv.labs.arxiv.org/html/1711.10561/assets/x4.png)
*图：离散时间 PINN 架构。多输出神经网络预测 Runge-Kutta 各阶段的解 \([u^{n+c_1}, \ldots, u^{n+c_q}, u^{n+1}]\)，通过 RK 公式构造物理约束。*

##### 算法伪代码

```python
# PINN 连续时间模型训练伪代码
# 输入: 标注数据 {t_u, x_u, u}, 配点 {t_f, x_f}, PDE算子 N
# 输出: 训练好的网络 u_θ(t, x)

def physics_informed_nn(t, x, theta):
    u = neural_network(t, x, theta)          # 前向传播
    u_t = auto_diff(u, t)                     # 自动微分求 ∂u/∂t
    u_x = auto_diff(u, x)                     # 自动微分求 ∂u/∂x
    u_xx = auto_diff(u_x, x)                  # 自动微分求 ∂²u/∂x²
    f = u_t + N(u, u_x, u_xx)                 # PDE 残差
    return u, f

# 损失函数
MSE_u = mean(|u_pred - u_data|²)              # 数据拟合项
MSE_f = mean(|f_pred|²)                        # 物理残差项 (配点处)
loss = MSE_u + MSE_f

# 优化: L-BFGS (拟牛顿法, 全批量)
optimizer = L_BFGS(theta)
for iteration in range(max_iter):
    u_pred, f_pred = physics_informed_nn(t, x, theta)
    loss = MSE_u + MSE_f
    optimizer.step(loss)
```

##### 动机与背景

传统 PDE 数值方法（有限元、有限差分、谱方法）依赖精细的网格剖分，在高维问题中面临"维度灾难"，且对复杂几何和多物理场耦合的适应性有限。另一方面，纯数据驱动的深度学习方法虽然灵活，但需要海量标注数据，且无法保证物理一致性。PINN 的核心思想是：**将已知的物理定律（PDE）作为正则化项嵌入神经网络的训练过程**，从而在数据稀疏的情况下仍能获得物理上合理的解。

##### 核心机制：连续时间模型

PINN 的出发点是一般形式的参数化非线性 PDE：

$$u_t + \mathcal{N}[u; \lambda] = 0, \quad x \in \Omega, \quad t \in [0, T]$$

其中 \(u(t, x)\) 是待求解的隐变量，\(\mathcal{N}[\cdot; \lambda]\) 是由参数 \(\lambda\) 参数化的非线性微分算子。

**关键设计**：定义物理残差函数

$$f := u_t + \mathcal{N}[u; \lambda]$$

用一个深度神经网络 \(u_\theta(t, x)\) 近似解 \(u(t, x)\)，然后通过**自动微分**（而非数值差分）精确计算 \(f_\theta(t, x)\)。由于自动微分利用计算图的链式法则，其精度达到机器精度级别，且不引入离散化误差。

> 💡 **关键**：\(f\) 和 \(u\) 共享同一组网络参数 \(\theta\)，因此 \(f\) 本身也是一个"神经网络"——只不过它的结构由 PDE 的形式决定，而非人工设计。

损失函数由两部分组成：

$$\text{MSE} = \text{MSE}_u + \text{MSE}_f$$

$$\text{MSE}_u = \frac{1}{N_u} \sum_{i=1}^{N_u} |u(t_u^i, x_u^i) - u^i|^2$$

$$\text{MSE}_f = \frac{1}{N_f} \sum_{i=1}^{N_f} |f(t_f^i, x_f^i)|^2$$

其中 \(\{t_u^i, x_u^i, u^i\}_{i=1}^{N_u}\) 是初始/边界条件的标注数据，\(\{t_f^i, x_f^i\}_{i=1}^{N_f}\) 是时空域内的配点（collocation points），**不需要标签**——只要求 PDE 残差为零。

> ⚠️ **注意**：配点 \(N_f\) 的选取无需网格化，可以用拉丁超立方采样等准随机方法在整个时空域中撒点，这使得 PINN 天然适用于不规则几何和高维问题。

##### 核心机制：离散时间模型

对于刚性方程或需要大时间步长的问题，论文提出将 **\(q\) 阶隐式 Runge-Kutta（IRK）方案**嵌入网络结构：

$$u^{n+c_i} = u^n - \Delta t \sum_{j=1}^{q} a_{ij} \mathcal{N}[u^{n+c_j}], \quad i = 1, \ldots, q$$

$$u^{n+1} = u^n - \Delta t \sum_{j=1}^{q} b_j \mathcal{N}[u^{n+c_j}]$$

网络以空间坐标 \(x\) 为输入，输出 \(q+1\) 个分量 \([u^{n+c_1}(x), \ldots, u^{n+c_q}(x), u^{n+1}(x)]\)，对应 RK 各阶段的解。通过 RK 公式构造 \(q+1\) 个约束 \(u_i^n(x)\)，要求它们均等于已知的 \(u^n(x)\)。

> 💡 **关键优势**：经典数值方法中，隐式 RK 的阶数受限于计算复杂度（每步需求解大型非线性方程组）。而在 PINN 中，增加 RK 阶数仅增加网络最后一层的输出维度，**计算成本几乎不变**。论文使用了 500 阶 IRK（理论时间误差 \(\Delta t^{1000} = 0.8^{1000} \approx 10^{-97}\)），这在传统数值方法中是不可想象的。

##### 训练与优化细节

- **网络架构**：全连接网络，tanh 激活函数。Burgers 方程使用 9 层 × 20 神经元；Schrödinger 方程使用 5 层 × 100 神经元
- **优化器**：L-BFGS（拟牛顿法），全批量训练。L-BFGS 利用二阶曲率信息，在 PINN 这类光滑损失景观中收敛速度远快于 Adam
- **Xavier 初始化**：权重使用 Xavier 初始化方案，确保各层梯度方差一致
- **训练时间**：Burgers 方程连续时间模型约 60 秒（单 NVIDIA Titan X GPU）

##### 实验结果与对比

| 方程 | 模型类型 | 数据量 | 配点数 | \(\mathcal{L}_2\) 误差 | 特殊说明 |
|------|---------|--------|--------|----------------------|---------|
| Burgers | 连续时间 | \(N_u=100\) | \(N_f=10000\) | \(6.7 \times 10^{-4}\) | 9层×20, 60秒训练 |
| Burgers | 离散时间 | \(N_n=250\) | — | \(8.2 \times 10^{-4}\) | 500阶IRK, 单步 t=0.1→0.9 |
| Schrödinger | 连续时间 | \(N_0=50, N_b=50\) | \(N_f=20000\) | \(1.97 \times 10^{-3}\) | 复值分解为实部+虚部 |
| Allen-Cahn | 离散时间 | \(N_n=200\) | — | — | 500阶IRK处理尖锐界面 |
| KdV | 离散时间 | \(N_n=199\) | — | — | 三阶导数, 多步推进 |

##### 与传统方法的核心区别

1. **无网格化**：传统方法需要空间网格剖分，PINN 通过随机配点避免网格生成
2. **物理即正则化**：PDE 残差项 \(\text{MSE}_f\) 本质上是一种正则化，使网络在数据稀疏区域也能给出物理合理的预测
3. **正反问题统一**：传统方法求解正问题和反问题需要完全不同的算法，PINN 只需调整损失函数中的已知/未知量
4. **自动微分 vs 数值微分**：传统方法的离散化引入截断误差，自动微分精确到机器精度
5. **隐式时间积分无额外成本**：传统隐式方法每步需求解非线性方程组，PINN 中增加 RK 阶数仅增加输出维度

#### 🧪 练习题

```yaml
question: "PINN 损失函数中 MSE_f 项的物理含义是什么？"
options:
  - "衡量神经网络预测值与训练数据之间的拟合误差"
  - "衡量神经网络输出在配点处满足 PDE 方程的程度"
  - "衡量神经网络在边界条件上的违反程度"
  - "衡量神经网络参数的 L2 正则化惩罚"
answer: 1
explain: "MSE_f = (1/N_f) Σ|f(t_f, x_f)|² 其中 f = u_t + N[u]，即 PDE 残差。该项要求网络输出在配点处精确满足 PDE，是 PINN 区别于纯数据驱动方法的核心设计。"
```