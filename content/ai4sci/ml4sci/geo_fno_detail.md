### Geo-FNO — 几何感知傅里叶神经算子 (Geometry-aware FNO)

```yaml
id: geo_fno
name: Geo-FNO
full_name: 几何感知傅里叶神经算子 (Geometry-aware FNO)
year: '2023'
org: Caltech
paper_url: https://arxiv.org/abs/2207.05209
category: operators
parent: fno
motivation: 变形映射处理不规则物理域
```

#### 📝 一句话总结

Geo-FNO 在 FNO 前后加入可给定或可学习的几何变形，把不规则物理域映射到带均匀网格的计算域，在保留 FFT 高效性的同时让 FNO 适用于点云、非均匀网格和复杂工程几何。

#### 🎯 核心要点

- **解决 FNO 几何限制**：标准 FNO 依赖均匀矩形/周期网格上的 FFT，Geo-FNO 通过物理域到计算域的变形扩展到任意几何
- **计算域统一**：把物理域 \(D_a\) 映射到统一计算域 \(D^c\)（常取 unit torus），在 \(D^c\) 上使用标准 Fourier basis 和 FFT
- **几何 Fourier transform**：用 \(\phi_a^{-1}(x)\) 将物理坐标拉回计算坐标，在变形后的基函数上做谱变换
- **可学习 deformation network**：当几何映射未知时，用神经网络参数化 \(\phi_a^{-1}\)，与 FNO 解算子端到端联合训练
- **输入格式灵活**：支持结构化/非结构化网格、点云、几何设计参数；结构化网格可由索引诱导坐标映射
- **工程基准广泛**：覆盖 hyper-elastic、plasticity、球面 advection、airfoil Euler、pipe Navier-Stokes，并包含 inverse design
- **保留 FNO 效率**：主体仍在潜在均匀网格上执行 FFT，比传统数值求解器可达数量级加速，并比直接插值到规则网格的 FNO 更准确

#### 🔬 深入细节

##### 核心架构示意

![Geo-FNO 几何变形与潜在空间 FFT 示意图](https://arxiv.org/html/2207.05209/extracted/5573661/figures/geo-FNO5.png)
*图：Geo-FNO 将不规则物理域中的输入函数变形到均匀潜在/计算空间，在该空间应用标准 FNO，再把预测解变形回物理域。下方展示 deformation 如何诱导自适应网格和变形 Fourier basis。来源为 arXiv:2207.05209 HTML 图 1。*

##### 算法伪代码

```python
# Geo-FNO 前向传播伪代码
def geo_fno_forward(x_phys, input_field, geometry_code):
    # 1. 估计或读取物理域 -> 计算域的坐标映射
    if has_given_map:
        xi = given_inverse_map(x_phys, geometry_code)          # xi = phi_a^{-1}(x)
    else:
        xi = deformation_net(x_phys, geometry_code)            # learned inverse deformation

    # 2. 将物理点上的函数拉回到均匀计算网格
    v0 = lift_P(concat(input_field, x_phys, xi))
    v_latent = pullback_to_uniform_grid(v0, xi)                 # irregular -> regular latent grid

    # 3. 在计算域上执行标准 FNO blocks
    v = v_latent
    for layer in range(L):
        v_hat = fftn(v)
        low_modes = complex_weight[layer] * truncate(v_hat)
        spectral = ifftn(pad_modes(low_modes)).real
        v = activation(spectral + pointwise_linear[layer](v))

    # 4. 将潜在解采样/推回物理点，并投影成目标物理量
    latent_solution = sample_from_uniform_grid(v, xi)
    u_pred = project_Q(latent_solution)
    return u_pred

for geometry, input_field, target_solution in dataloader:
    pred = geo_fno_forward(geometry.points, input_field, geometry.code)
    loss = relative_l2_on_physical_domain(pred, target_solution, geometry.weights)
    loss.backward()                                             # 同时更新 deformation_net 与 FNO
    optimizer.step()
```

##### 动机与背景

FNO 的高效性来自 FFT，但 FFT 的直接使用通常要求规则网格和简单拓扑。工程 PDE 恰恰常发生在复杂几何中：机翼周围的 Euler 方程、管道内 Navier-Stokes、材料结构的弹塑性问题都存在曲线边界、非均匀网格或点云表示。如果强行把这些数据插值到矩形网格，边界附近会损失精度，也会浪费大量空白区域计算。

Geo-FNO 的核心思路是借鉴自适应移动网格：不改变 FNO 主体，而是在 FNO 所需的规则计算域和真实物理域之间学习一个几何坐标变换。论文把物理域记为 \(D_a\)，计算域记为 \(D^c\)，希望存在一个近似可逆、平滑的映射：

$$
\phi_a: D^c\to D_a,\qquad \phi_a^{-1}:D_a\to D^c.
$$

计算域 \(D^c\) 上有均匀网格和标准 Fourier basis；通过 \(\phi_a\) 推到物理域后，就得到随几何变化的自适应网格和变形 Fourier basis。

##### 核心机制：几何 Fourier transform

对物理域函数 \(v(x)\)，Geo-FNO 不直接在 \(x\) 上做标准 Fourier transform，而是用反变换 \(\phi_a^{-1}(x)\) 把点拉回计算坐标 \(\xi\)。其前向几何谱变换可写成近似形式：

$$
(\mathcal{F}_{\phi_a}v)_k
\approx
\sum_{x_j\in D_a}
v(x_j)\exp\left(-2\pi i\langle \phi_a^{-1}(x_j),k\rangle\right)w_j,
$$

其中 \(w_j\) 是采样/积分权重。对应的逆变换为：

$$
(\mathcal{F}^{-1}_{\phi_a}\hat{v})(x)
=
\sum_{k\in Z_K^d}\hat{v}_k
\exp\left(2\pi i\langle \phi_a^{-1}(x),k\rangle\right).
$$

因此 Geo-FNO layer 可看作把 FNO 的普通 \(\mathcal{F}^{-1}R\mathcal{F}\) 替换为变形后的版本：

$$
v_{t+1}(x)=\sigma\left(
Wv_t(x)+
\mathcal{F}^{-1}_{\phi_a}
\left(R_{\theta}\cdot\mathcal{F}_{\phi_a}(v_t)\right)(x)
\right).
$$

> 💡 关键：Geo-FNO 不是在变形后的 Fourier 空间里手写求解 PDE，而是数据驱动地学习解算子；因此即使传统谱方法在非正交变形网格上会失去严格等价性，Geo-FNO 仍可把变形作为可学习表征。

##### 变形网络与训练目标

当网格是结构化的，例如 airfoil 常见的 C-grid/O-grid，数组索引本身就诱导了一个从计算域到物理域的坐标映射，此时 Geo-FNO 可近似退化为在索引坐标上执行标准 FNO。当映射未知或输入是点云/设计参数时，论文用一个 deformation neural network 参数化 \(\phi_a^{-1}\)，输入包括物理坐标和几何参数，并使用 sinusoidal features 增强坐标表达能力。变形网络与 FNO 主体共享同一个监督损失端到端优化。

数据监督目标使用物理域上的相对 \(L_2\) 误差：

$$
\mathcal{J}_{\text{data}}(\mathcal{G}_{\theta})
\approx
\frac{1}{N}\sum_{j=1}^{N}
\sqrt{
\frac{\int_{D_{a_j}}\left|u_j(x)-\mathcal{G}_{\theta}(a_j)(x)\right|^2\,dx}
{\int_{D_{a_j}}u_j(x)^2\,dx}
}.
$$

如果扩展到 physics-informed neural operator，\(\phi_a^{-1}\) 是神经网络，因此可用自动微分和链式法则计算变形基函数的导数，从而添加 PDE residual；论文把这一点作为后续方向。

##### Fourier continuation、拓扑与局限

标准 Fourier basis 天然适合周期边界。对非周期边界，Geo-FNO 引入 Fourier continuation 的思想：把物理函数扩展到更大的周期计算域中，再在扩展域上做 FFT。对 Chebyshev 方法，论文指出可把 cosine deformation 看作一种特殊几何变形，使边界附近网格更密。

对球面等非欧氏域，可以选择单位球面作为计算空间并用球谐基；对不同拓扑或非同胚域，单个全局变形不一定存在，需要 domain decomposition，将复杂域拆成若干可规则化子域并训练耦合的算子模型。这也是 Geo-FNO 相比 GNO 的一个边界：它很高效，但仍需要可用的几何参数化或可学习变形；若拓扑变化太大，图神经算子或分块方法更直接。

##### 与 FNO 和插值式方法的区别

| 方法 | 处理复杂几何的方式 | FFT 是否保留 | 误差来源 |
|------|--------------------|--------------|----------|
| 标准 FNO | 通常要求规则矩形网格 | 是 | 几何不匹配、边界插值误差 |
| 插值 + FNO | 先把不规则数据插值到规则网格 | 是 | 插值模糊边界和高梯度区域 |
| GNO | 直接在物理点云/网格上消息传递 | 否 | 边数、采样和长程依赖成本 |
| Geo-FNO | 学习物理域到计算域的变形 | 是 | 变形质量和拓扑可参数化性 |

Geo-FNO 的工程价值在于把 FNO 的快速谱卷积搬到“几何归一化”后的潜在域中：网络在同一个均匀计算空间学习共享规律，但输出仍定义在每个样本自己的真实物理几何上。

#### 🧪 练习题

```yaml
question: "Geo-FNO 中学习或给定坐标变换 phi_a^{-1} 的主要作用是什么？"
options:
  - "把不规则物理域中的点映射到统一计算域，使模型能在潜在均匀网格上使用 FFT"
  - "把所有 PDE 强制改写成线性方程，从而无需训练数据"
  - "删除 FNO 的低频模态截断，使模型只学习高频噪声"
  - "将图消息传递替换为 kNN 分类器"
answer: 0
explain: "Geo-FNO 的核心是通过几何变形把复杂物理域拉回规则计算域，在那里运行标准 FNO/FFT，再把解推回物理域。"
```
