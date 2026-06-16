### GINO

```yaml
id: gino
name: GINO
full_name: 几何信息神经算子 (Geometry-Informed Neural Operator)
year: '2023'
org: Caltech
paper_url: https://arxiv.org/abs/2309.03019
category: operators
parent: geo_fno
motivation: 结合GNN与FNO优化3D几何模拟
```

#### 📝 一句话总结

GINO 将 GNO 的局部不规则网格积分与 FNO 的规则潜空间全局频谱积分组合起来，用 SDF 与点云编码复杂几何，解决 FNO 难以直接处理大规模 3D 非结构几何、GNN/GNO 又难以高效捕获全局相互作用的问题。

#### 🎯 核心要点

- **来源校正**：任务给定的 `https://arxiv.org/abs/2309.03019` 实际是语音验证论文；GINO 对应论文为 NeurIPS 2023 `Geometry-Informed Neural Operator for Large-Scale 3D PDEs`，arXiv: `https://arxiv.org/abs/2309.00583`
- **三段式架构**：GNO encoder 将不规则表面点云映射到规则 latent grid，FNO block 在规则网格上做全局频谱积分，GNO decoder 将 latent 表示查询回任意输出点
- **几何输入表示**：同时使用表面点云和 signed distance function (SDF)，其中 SDF 在规则网格上表达几何边界与域信息
- **局部图积分**：GNO 在物理空间半径球 \(B_r(x)\) 内构图，用 Riemann 权重近似连续核积分，避免普通 kNN GNN 在网格细化时退化为点算子
- **全局频谱处理**：FNO 只在 GNO 产生的规则潜空间中运行，因此可使用 FFT 的准线性复杂度捕获长程依赖
- **可扩展图构造**：使用 hash grid / voxel 邻域搜索替代全点对距离，避免 \(O(N^2)\) 内存与计算
- **CFD 验证**：在 ShapeNet car 和大规模 Ahmed body 3D 气动数据上预测表面压力，论文报告 drag coefficient 计算相对 GPU OpenFOAM 约 \(26{,}000\times\) 加速
- **离散收敛性**：训练后的模型可作用于任意分辨率/网格采样，随着离散加密收敛到连续算子，而不是绑定到固定 mesh

#### 🔬 深入细节

![GINO 架构图（Figure 1 位于论文 PDF 第 2 页）](https://proceedings.neurips.cc/paper_files/paper/2023/file/70518ea42831f02afc3a2828993935ad-Paper-Conference.pdf)
*图源说明：NeurIPS 论文 PDF 的 Figure 1 展示 GINO 架构；arXiv source 包 `https://arxiv.org/e-print/2309.00583` 中对应图文件为 `Figs/main_fig.pdf`。公开页面未提供单独图片直链，因此这里给出可访问论文 PDF 与源包位置。*

##### 算法伪代码

```python
# GINO 前向传播伪代码
def gino_forward(surface_points, sdf_grid, query_points, inlet_velocity=None):
    # surface_points: 不规则几何表面点云 S_T
    # sdf_grid:       在规则背景网格 D 上采样的 signed distance function
    # query_points:   需要预测压力/速度的任意输出点

    # 1. GNO encoder: 从不规则点云到规则 latent grid
    graph_in = radius_graph(source=surface_points, target=latent_grid, radius=r_in)
    geom_latent = gno_integral(
        target_points=latent_grid,
        source_points=surface_points,
        source_features=surface_features(surface_points),
        graph=graph_in,
        riemann_weights=surface_area_weights,
    )

    # 2. 拼接 SDF，形成规则网格上的几何表示
    z = concat(geom_latent, sdf_grid)

    # 3. FNO block: 规则潜空间中进行全局 Fourier kernel integration
    if inlet_velocity is not None:
        z = adaptive_instance_norm(z, embed_fourier(inlet_velocity))
    for block in fno_blocks:
        z = block(z)  # FFT -> spectral multiplication -> IFFT + pointwise transform

    # 4. GNO decoder: 从 latent grid 查询到任意输出点
    graph_out = radius_graph(source=latent_grid, target=query_points, radius=r_out)
    pred = gno_integral(
        target_points=query_points,
        source_points=latent_grid,
        source_features=z,
        graph=graph_out,
        riemann_weights=uniform_grid_weights,
    )

    return projection(pred)  # e.g. surface pressure

for batch in dataloader:
    pred = gino_forward(batch.surface, batch.sdf, batch.output_points, batch.velocity)
    loss = relative_l2(pred, batch.pressure)
    loss.backward()
    optimizer.step()
```

##### 问题设定

GINO 学习的是几何参数化 PDE 的解算子。论文将几何写成距离函数 \(T\)，其零水平集 \(S_T=\{x\in D:T(x)=0\}\) 定义物体表面；流体域为 \(\Omega_T=D\setminus\bar{Q}_T\)。抽象 PDE 写作：

$$
\mathcal{L}(u)=f,\quad x\in\Omega_T,
\qquad
u=g,\quad x\in\partial\Omega_T
$$

模型要学习的映射是：

$$
\Psi:\mathcal{T}\times\mathcal{F}\times\mathcal{B}\rightarrow\mathcal{U},
\qquad
(T,f,g)\mapsto E_T(u)
$$

其中 \(E_T\) 是把几何相关域 \(\Omega_T\) 上的解扩展到统一背景域 \(D\) 的算子。对汽车气动问题，\(\mathcal{L}\) 可对应稳态 Navier-Stokes 方程，输出通常是表面压力场或速度/压力组合。

##### GNO Encoder/Decoder

GINO 的局部模块来自 Graph Neural Operator，而不是普通 GNN。它从连续核积分出发：

$$
v_l(x)=\int_D \kappa_l(x,y)v_{l-1}(y)\,dy
$$

为了可扩展，实际只在物理空间半径球内做局部积分：

$$
v_l(x)=\int_{B_r(x)}\kappa(x,y)v_{l-1}(y)\,dy
$$

离散后用 Riemann 和近似：

$$
v_l(x)\approx\sum_{i=1}^{M}\kappa(x,y_i)v_{l-1}(y_i)\mu(y_i),
\qquad y_i\in B_r(x)
$$

这里 \(\mu(y_i)\) 是与点采样密度相关的积分权重。关键不是“连最近邻”，而是“在物理空间球内近似积分”。这样当点云分辨率变化时，离散和会逼近同一个连续积分算子，模型具备离散收敛性。

Encoder 用表面点云 \(\{x_i^{in}\}\subset S_T\) 作为源点，在规则 latent grid \(\{x_j^{grid}\}\subset D\) 上查询几何表示。Decoder 反过来把规则 latent grid 上的函数值映射到任意输出点 \(\{x_k^{out}\}\subset\Omega_T\) 或表面点。

##### FNO 潜空间处理

GNO 适合处理不规则几何，但局部半径构图很难高效捕获全局流动依赖。GINO 将几何编码到规则 latent grid 后，再用 FNO 做全局频谱积分：

$$
\mathcal{C}(v)=\mathcal{F}^{-1}\left(\mathcal{F}(\kappa)\cdot\mathcal{F}(v)\right)
$$

完整 FNO block 可写成：

$$
\mathcal{K}(v)(x)=\sigma\left(Wv(x)+\mathcal{C}(v)(x)\right)
$$

由于该步骤发生在规则网格上，\(\mathcal{F}\) 可以用 FFT 高效实现。GINO 因此得到两边的好处：输入/输出端可处理复杂非结构点云，中间全局传播仍保持 FNO 的频谱效率。

##### 大规模实现细节

半径图构造若直接算全点对距离，需要 \(O(N^2)\) 内存和计算，在 \(10^5\sim10^7\) 点 CFD 网格上不可行。GINO 使用 hash grid：先按体素把点放入哈希表，只检查当前体素及邻近体素，再做 \(\ell^2\) 距离过滤。论文给出的复杂度形式约为 \(O(Ndr^3)\)，其中 \(d\) 是单位密度、\(r\) 是搜索半径。

对边界条件中的标量入口速度，GINO 使用 Fourier feature embedding 加 learnable adaptive instance normalization：速度先嵌入为向量，再由 MLP 生成归一化层的 scale/shift。这样同一网络可根据 inlet velocity 调整流场幅值，而不需要为每个速度训练独立模型。

##### 与相关方法的区别

| 方法 | 几何输入 | 全局依赖 | 网格/分辨率泛化 | 主要瓶颈 |
|------|----------|----------|----------------|----------|
| 标准 FNO | 规则网格 | 强，FFT 高效 | 依赖规则网格 | 难处理复杂几何 |
| Geo-FNO | 学坐标变形 | 强 | 对复杂 3D 成本高 | 不规则 DFT/变形困难 |
| 普通 GNN | 任意图 | 局部 message passing | 细化时易退化 | 不保证连续算子极限 |
| GNO | 任意点云 | 局部积分 | 离散收敛 | 长程依赖成本高 |
| **GINO** | SDF + 点云 | GNO 局部 + FNO 全局 | 离散收敛 | 需要构造 latent grid 与半径图 |

> 💡 关键：GINO 不是简单把 GNN 和 FNO 串起来，而是用 GNO 作为连续积分意义下的 encoder/decoder，把 FNO 限定在规则潜空间中运行，从而同时满足几何灵活性、全局效率和离散收敛。

#### 🧪 练习题

```yaml
question: "GINO 为什么要使用 GNO encoder + FNO latent block + GNO decoder 的三段式结构？"
options:
  - "为了完全避免使用傅里叶变换"
  - "为了把不规则几何映射到规则潜空间，让 FNO 高效捕获全局依赖，再查询回任意输出点"
  - "为了把所有点云强制插值成固定数量的节点"
  - "为了只预测 drag coefficient 而不预测压力场"
answer: 1
explain: "GNO 负责不规则输入/输出上的局部连续积分，FNO 在规则 latent grid 上用 FFT 捕获全局相互作用，这是 GINO 兼顾复杂几何和计算效率的核心。"
```
