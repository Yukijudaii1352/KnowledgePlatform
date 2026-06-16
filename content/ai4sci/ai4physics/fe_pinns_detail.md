### FE-PINNs — 有限元PINN (Finite-Element-based PINNs)

```yaml
id: fe_pinns
name: FE-PINNs
full_name: 有限元PINN (Finite-Element-based PINNs)
year: '2026'
org: APL Machine Learning
paper_url: https://pubs.aip.org/aip/aml/article/4/1/016106/3379950
category: solid_mechanics
parent: canns
motivation: 有限元基函数实现网格无关建模
```

#### 📝 一句话总结

FE-PINNs 用有限元弱式残差训练神经网络，并提出 stencil convolution 在任意有限元网格上执行类 CNN 卷积，从而让 PINN 代理模型同时获得复杂几何适配、边界条件自然进入 loss、以及比图卷积更接近规则卷积的局部算子。

#### 🎯 核心要点

- **有限元残差作为 physics loss**：不再用强形式 PDE collocation loss，而是把有限元弱 Galerkin 残差 \(\mathbf{R}(\hat{\mathbf{u}})\) 作为训练损失
- **边界条件纳入 FE 方程**：自然边界和外力通过 FE 外力向量进入 residual，避免为 BC loss 手动设置额外权重
- **stencil convolution**：在每个 FE 节点周围定义 stencil 点，用反等参映射和形函数把隐藏场插值到 stencil 点，再做卷积
- **面向任意网格/几何**：卷积不依赖规则像素网格，也不把卷积邻域完全绑定到图连边，适合结构化、非结构化、畸变 FE 网格
- **输入输出是分片函数**：网络输入节点坐标，输出节点位移；通过 FE 形函数 \(N_a\) 解释为连续/分片位移场
- **测试问题为线弹性边值问题**：使用楔形块与带孔块几何，平面应变双线性四边形单元，刚度矩阵来自 ABAQUS
- **代理建模能力来自多几何训练**：单几何训练主要近邻泛化；训练几何数量增加后，未见几何上的测试 loss 系统性下降

#### 🔬 深入细节

##### 论文来源与核心示意图

正式出版页面为 AIP APL Machine Learning：https://pubs.aip.org/aip/aml/article-abstract/4/1/016106/3379950，DOI 为 https://doi.org/10.1063/5.0299671。为保证图示 URL 可直接嵌入，这里使用同一工作的 arXiv HTML 预印本图像：https://arxiv.org/html/2412.07126v1。论文公开代码仓库见 https://gitlab.com/mmod_public/fepinn。

![FE-PINN stencil tensor](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/stencil_tensor.png)
*图：stencil tensor 定义。每个节点周围放置一组规则或自定义 stencil 点，作为类 CNN 卷积核的采样位置。*

![FE-PINN stencil convolution](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/stencil_conv.png)
*图：在 FE 网格节点上执行 stencil convolution。隐藏场先由有限元形函数插值到 stencil 点，再与卷积权重相乘。*

![FE-PINN architecture and geometries](https://arxiv.org/html/2412.07126v1/extracted/6019127/figures/blcks.png)
*图：论文使用的楔形块与带孔块测试几何，用于检验 FE-PINN 在未见几何上的代理建模能力。*

##### 算法伪代码

```python
# FE-PINN training with stencil convolution, simplified
for mesh in training_meshes:
    K_or_residual_operator = load_fe_operator(mesh)   # from FE code, e.g. ABAQUS output
    S = precompute_stencil_tensor(mesh, stencil_offsets)
    mesh.cache["stencil_tensor"] = S

def stencil_conv(hidden, S, W, bias):
    # hidden: [nodes, in_channels]
    # S[k, l, m, n] interpolates node-field values to stencil point (k,l) around node m
    stencil_values = sparse_contract(S, hidden)       # [nodes, k, l, in_channels]
    out = einsum("mklc,ockl->mo", stencil_values, W) + bias
    return relu(out)

def network_forward(node_coords, mesh):
    h = lift(node_coords)                             # x,y as input channels
    for layer in stencil_layers:
        h = stencil_conv(h, mesh.cache["stencil_tensor"], layer.W, layer.bias)
    ux = head_x(h)
    uy = head_y(h)
    return stack([ux, uy], dim=-1)                    # nodal displacement vector

for epoch in range(1000):
    loss = 0.0
    for mesh in batch_of_geometries:
        u_hat = network_forward(mesh.node_coords, mesh)
        R = finite_element_residual(mesh, u_hat)      # nonlinear R(u), or K u - f
        loss += mean(R**2)

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 从强形式 PINN 到有限元弱式 residual

普通 PINN 对固体力学边值问题常直接惩罚强形式平衡方程。例如小变形静力平衡可写为：

$$
\frac{\partial \sigma_{ij}}{\partial x_j}+b_i=0
\quad \text{in } \Omega,
$$

并配合位移边界 \(\Gamma_u\) 与力边界 \(\Gamma_t\)：

$$
u_i=\bar{u}_i \quad \text{on } \Gamma_u,
\qquad
\sigma_{ij}n_j=\bar{t}_i \quad \text{on } \Gamma_t.
$$

FE-PINNs 改用有限元弱形式。引入权函数 \(w_i\) 并分部积分后，平衡方程变成：

$$
\int_{\Omega}
\sigma_{ij}(\mathbf{u})
\frac{\partial w_i}{\partial x_j}
\,d\Omega
=
\int_{\Omega} b_i w_i\,d\Omega
+
\int_{\Gamma_t}\bar{t}_i w_i\,d\Gamma.
$$

位移场使用 FE 形函数展开：

$$
u_i^h(\mathbf{x})
=
\sum_{a=1}^{N_n} N_a(\mathbf{x})\,d_{ia},
$$

其中 \(d_{ia}\) 是节点 \(a\) 上第 \(i\) 个位移分量。离散后，FE 方程可抽象成 residual：

$$
\mathbf{R}(\mathbf{d})
=
\mathbf{f}_{\mathrm{int}}(\mathbf{d})
-
\mathbf{f}_{\mathrm{ext}}
=
\mathbf{0}.
$$

对于论文实验中的线弹性问题，它进一步退化为：

$$
\mathbf{K}\mathbf{d}-\mathbf{f}=\mathbf{0}.
$$

FE-PINN 让神经网络预测节点位移 \(\hat{\mathbf{d}}_\theta\)，直接最小化有限元 residual：

$$
\mathcal{L}_{\mathrm{FE\text{-}PINN}}(\theta)
=
\frac{1}{N_R}
\left\|
\mathbf{R}(\hat{\mathbf{d}}_\theta)
\right\|_2^2.
$$

> 💡 关键：FE-PINN 的 physics loss 可由已有 FE 代码计算，因此它不是重新手写所有 PDE 微分项，而是复用有限元程序已经实现的弱式、材料模型、单元积分和边界处理。

##### stencil convolution 的数学机制

CNN 的问题是需要规则网格；GNN 的问题是卷积邻域强依赖 mesh connectivity，非结构网格上每个节点的邻域形状不同。FE-PINNs 的 stencil convolution 试图取二者中间路线：卷积核位置像 CNN 一样由固定 stencil 定义，但隐藏场值通过 FE 插值从任意网格中读取。

对每个节点 \(m\)，定义一组 stencil 偏移：

$$
s_{ikl},
\qquad
k,l\in[-\omega,\omega],
\qquad
\omega=\frac{w-1}{2},
$$

其中 \(i\) 是坐标方向，\(w\) 是卷积核大小。节点 \(m\) 的 stencil 点物理坐标可写为：

$$
x_{ikl}^{m}
=
X_i^m+s_{ikl}.
$$

为了在这个点读取隐藏场，算法先找到包含该 stencil 点的有限元单元 \(e(m,k,l)\)，再通过反等参映射求父单元坐标：

$$
\boldsymbol{\xi}_{kl}^{m}
=
\Phi_{e}^{-1}
\left(
\mathbf{x}_{kl}^{m}
\right).
$$

随后用单元形函数插值输入通道 \(c\) 的隐藏场：

$$
h_c(\mathbf{x}_{kl}^{m})
=
\sum_{n\in e(m,k,l)}
N_n
\left(
\boldsymbol{\xi}_{kl}^{m}
\right)
h_{cn}.
$$

论文把这些形函数权重预计算成稀疏 stencil convolution tensor：

$$
S_{klmn}
=
\begin{cases}
N_n(\boldsymbol{\xi}_{kl}^{m}), & n \in e(m,k,l),\\
0, & \text{otherwise}.
\end{cases}
$$

卷积层输出则为：

$$
z_{qm}
=
b_q
+
\sum_{c}
\sum_{k,l}
W_{qckl}
\sum_n
S_{klmn}h_{cn}.
$$

这一步的直觉是：即使网格节点不在规则排列上，网络仍然可以在“以当前节点为中心的规则物理 stencil”上观察场值；而这些场值由 FE 形函数从不规则网格中插值得到。预计算 \(S_{klmn}\) 后，前向传播就是稀疏张量乘法加普通卷积权重收缩。

##### 训练/推理流程与实验设置

论文实验以二维线弹性为主，输入是节点坐标 \((x,y)\)，输出是节点位移 \((u_x,u_y)\)。网络为两个位移分量使用独立子网络，每个子网络含 stencil convolution 隐藏层。训练时不需要 FE 求解标签作为监督目标；但需要 FE mesh、刚度矩阵或 residual operator 来计算 \(\mathbf{R}(\hat{\mathbf{d}}_\theta)\)。实验中的刚度矩阵由 ABAQUS 生成，网格为平面应变双线性四边形单元并使用 \(2\times2\) Gauss 积分。

对单个几何训练时，FE-PINN 可以很好拟合训练几何，也能对相近几何有一定泛化，但对差异很大的几何误差较高。这符合代理模型的插值性质。训练几何从 1 个增加到 3 个后，测试 loss 整体下降，而训练 loss 维持在相近量级，说明网络不是只能记住单个解，而是在多几何 residual 约束下学到更通用的映射。

与数据驱动 surrogate 相比，FE-PINN 不需要预先生成完整位移标签作为训练集；它只需要 FE residual 计算能力。与传统 PINN 相比，它避免了强形式高阶导数和 BC loss 权重调参，并天然适配 FE 已经支持的复杂几何与材料。与 graph PINN 相比，stencil convolution 的感受野由物理空间 stencil 控制，而不是完全由网格连边控制，因此论文观察到它对结构化/非结构化/畸变网格的敏感性较低。

局限也很清楚。stencil tensor 的预计算需要为每个 stencil 点找到所在单元并执行反等参映射；对高阶单元、三维单元或严重畸变单元，这一步可能变复杂。论文当前主要验证了线性二维固体问题，变量边界条件、材料参数、体力、非线性材料和 3D 大规模训练仍属于后续扩展方向。

#### 🧪 练习题

```yaml
question: "FE-PINNs 中 stencil convolution 相比普通 CNN 的关键区别是什么？"
options:
  - "它完全不需要卷积权重，只使用有限元刚度矩阵"
  - "它在 FE 节点周围定义 stencil 点，并用反等参映射和形函数把任意网格上的场插值到这些点后再卷积"
  - "它只能用于规则像素网格，不能用于非结构化有限元网格"
  - "它把边界条件作为额外监督标签直接拟合，不计算 physics loss"
answer: 1
explain: "stencil convolution 的核心是用 FE 插值读取任意物理位置的隐藏场，因此能在不规则 FE 网格上执行类似 CNN 的局部算子。"
```
