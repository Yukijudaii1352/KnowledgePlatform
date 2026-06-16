### DeepXDE — 深度扩展微分方程 (Deep eXtension Differential Equations)

```yaml
id: deepxde
name: DeepXDE
full_name: 深度扩展微分方程 (Deep eXtension Differential Equations)
year: '2021'
org: 布朗大学
paper_url: https://github.com/lululxvi/deepxde
category: acceleration
parent: —
motivation: 多后端支持学术研究框架
```

#### 📝 一句话总结

DeepXDE 将 PINN 求解微分方程的核心流程封装成可扩展 Python 框架，用几何、PDE、边界条件、网络和训练器等模块把“写物理残差”变成接近数学表达式的程序接口，并通过残差自适应加密（RAR）、复杂几何和正/反问题统一建模提升研究效率。

#### 🎯 核心要点

- **PINN 框架化实现**：用自动微分计算 PDE 残差，把方程、边界/初始条件和观测数据统一写成损失项
- **正问题/反问题统一**：未知物理参数 \(\lambda\) 可以与网络权重 \(\theta\) 一起优化，只需增加测量数据损失
- **残差自适应加密 RAR**：在 PDE 残差大的区域追加训练点，缓解随机配点对尖峰、激波或边界层不敏感的问题
- **几何与边界条件抽象**：支持 interval、rectangle、disk、cuboid、sphere 等基本几何，并用 CSG 的 union/difference/intersection 组合复杂区域
- **紧凑工作流**：`geometry -> PDE -> BC/IC -> data.PDE/TimePDE -> network -> Model.compile -> Model.train -> Model.predict`
- **多类型方程覆盖**：论文讨论 ODE/PDE、integro-differential equation、fractional differential equation、stochastic differential equation 等 PINN 变体
- **多后端研究框架**：项目层面支持 TensorFlow、PyTorch、JAX、PaddlePaddle 等后端，便于算法比较和复现实验

#### 🔬 深入细节

##### 核心架构示意

![DeepXDE PINN 残差构造示意](https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x1.png)
*图：DeepXDE 论文中的 PINN 示意。网络输出 \(\hat{u}(x,t)\)，自动微分产生时间/空间导数，并把 PDE、Dirichlet/Robin/Neumann 边界条件和初始条件共同放入损失。*

![DeepXDE 使用流程](https://ar5iv.labs.arxiv.org/html/1907.04502/assets/x4.png)
*图：DeepXDE 对应 Procedure 3 的工作流。用户先定义 PDE 问题与网络，再由 `Model.compile`、`Model.train`、`Model.predict` 完成优化和推理。*

来源说明：任务给出的 `paper_url` 是项目仓库；方法解读主要追溯到论文 [DeepXDE: A deep learning library for solving differential equations](https://arxiv.org/abs/1907.04502) 与官方项目/文档。

##### 算法伪代码

```python
# DeepXDE 风格 PINN + RAR 训练伪代码
# 输入: 几何域 Ω, 边界 Γ, PDE 算子 F, 边界算子 B, 初始残差点 T_f, 边界点 T_b

geom = Geometry(Ω)                              # 例如 Rectangle、Disk 或 CSG 组合几何
bc = BoundaryCondition(geom, B(u, x) == 0)      # Dirichlet / Neumann / Robin / Periodic

def pde_residual(x, u_theta):
    du = autodiff(u_theta, x)                   # 一阶/高阶导数由后端 AD 产生
    return F(x, u_theta, du)                    # 强形式 PDE 残差

data = PDEData(geom, pde_residual, bc,
               num_domain=len(T_f),
               num_boundary=len(T_b))
net = FNN(input_dim=dim_x, hidden=[width] * depth, output_dim=dim_u)
model = Model(data, net)
model.compile(optimizer="adam", loss_weights=[w_f, w_b])

while True:
    model.train(iterations=K)
    candidates = sample_uniform(Ω, M)
    residual = abs(pde_residual(candidates, model.predict(candidates)))
    mean_residual = mean(residual)
    if mean_residual < tolerance:
        break
    T_new = top_k(candidates, residual, k=m)    # RAR: 选残差最大的点
    data.add_anchors(T_new)

solution = model.predict(query_points)
```

##### 方法机制

DeepXDE 的底层对象仍是 PINN：用神经网络 \(u_\theta(x)\) 近似微分方程解，而不是先生成网格再离散代数方程。对于一般 PDE，

$$
\mathcal{F}\left(x; u, \frac{\partial u}{\partial x_1}, \ldots,
\frac{\partial^2 u}{\partial x_i \partial x_j}, \ldots; \lambda\right)=0,
\quad x \in \Omega
$$

以及边界/初始条件

$$
\mathcal{B}(u, x)=0,\quad x \in \partial\Omega,
$$

DeepXDE 令网络输出 \(u_\theta(x)\)，再通过自动微分得到 \(\partial u_\theta / \partial x_i\)、\(\partial^2 u_\theta / \partial x_i\partial x_j\) 等导数。它不对空间做有限差分 stencil，也不组装 FEM 刚度矩阵；PDE 是否成立直接以残差范数体现。

核心训练目标可以写为：

$$
\mathcal{L}(\theta)=
w_f \frac{1}{|T_f|}\sum_{x_i\in T_f}\left\|
\mathcal{F}(x_i;u_\theta,\nabla u_\theta,\nabla^2u_\theta;\lambda)
\right\|^2
+ w_b \frac{1}{|T_b|}\sum_{x_i\in T_b}
\left\|\mathcal{B}(u_\theta,x_i)\right\|^2 .
$$

如果是反问题，未知参数 \(\lambda\) 直接变成可训练变量，并增加观测数据项：

$$
\mathcal{L}_{data}=
\frac{1}{N_u}\sum_{i=1}^{N_u}\left\|u_\theta(x_i)-u_i^{obs}\right\|^2,
\quad
(\theta^\*,\lambda^\*)=\arg\min_{\theta,\lambda}
(\mathcal{L}+\mathcal{L}_{data}).
$$

> 💡 关键：DeepXDE 的贡献不只是“又写了一个 PINN”，而是把 PINN 的可变部分拆成稳定 API：几何采样、边界条件、PDE 残差、网络、优化器、回调与预测接口。这样研究者可以替换网络或采样策略，而不必重写训练框架。

RAR 是 DeepXDE 论文中最有辨识度的算法增强。普通 PINN 常把配点均匀或随机撒在整个域内，但尖锐梯度通常只出现在小区域，随机采样会浪费大量点。RAR 的做法是先训练一个粗解，再在候选点集合 \(S\) 上评估残差：

$$
r_\theta(x)=\left\|\mathcal{F}(x;u_\theta,\nabla u_\theta,\ldots)\right\|,
\quad
\bar{r}\approx\frac{1}{|S|}\sum_{x_i\in S}r_\theta(x_i).
$$

若 \(\bar{r}\) 超过阈值，就把残差最大的若干点加入训练集 \(T_f\)，继续训练。它与 FEM 自适应网格细化的精神相似：不是盲目增加全域采样密度，而是把计算预算投向模型最违反物理约束的位置。

DeepXDE 的 CSG 几何模块也很关键。复杂区域可由基本图元通过布尔运算组合，例如 \(\Omega=(A\cup B)\setminus C\)。PINN 本身不需要网格，但仍需要知道“点是否在域内”“点是否在边界上”“边界法向是什么”；几何抽象把这些操作封装起来，使 Neumann/Robin 条件中的法向导数能够通过统一接口获得。

与传统有限元/有限差分相比，DeepXDE 的主要差别在于优化对象和误差来源。FEM/FDM 把 PDE 转换成离散代数系统，误差主要来自网格、基函数阶数和数值积分；DeepXDE/PINN 把 PDE 转成非凸优化问题，误差来自网络逼近能力、配点泛化、优化器收敛和损失权重。前者通常更可靠地求单个正问题，后者在高维、反问题、参数化问题和数据稀缺情形中更方便。

##### 训练与实现细节

DeepXDE 论文强调代码应“接近数学表述”。例如用户只需写 PDE 残差函数、边界判定函数和网络结构，其余的随机/网格采样、batch、优化器、保存、回调都由框架处理。回调机制可用于监控频谱、残差或早停；`loss_weights` 可用于平衡 PDE 残差、边界条件和数据项。

库层面的多后端设计进一步服务于研究复现：同一个数学问题可以切换 TensorFlow、PyTorch、JAX 或 PaddlePaddle 后端，从而比较自动微分、高阶导数、GPU 性能和优化器行为。对于 AI4Science 研究，这比单个示例脚本更重要，因为大量工作需要快速替换 PINN 变体、采样策略或网络结构。

#### 🧪 练习题

```yaml
question: "DeepXDE 中 RAR（Residual-based Adaptive Refinement）的主要作用是什么？"
options:
  - "把所有残差点固定在规则网格上，减少随机性"
  - "在 PDE 残差大的位置追加训练点，提高尖锐区域的物理约束精度"
  - "把边界条件从软约束改成硬约束，完全消除边界误差"
  - "用有限元网格替代神经网络，避免非凸优化"
answer: 1
explain: "RAR 先评估候选点处的 PDE 残差，再把残差最大的点加入训练集，使训练点集中到当前解最不满足方程的位置。"
```
