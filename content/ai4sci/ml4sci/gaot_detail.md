### GAOT — 几何感知算子Transformer (Geometry Aware Operator Transformer)

```yaml
id: gaot
name: GAOT
full_name: 几何感知算子Transformer (Geometry Aware Operator Transformer)
year: '2026'
org: UIUC
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/e45a448dfa778f6d62729a7bc8633c06
category: operators
parent: gino
motivation: 几何感知编码任意复杂域映射
```

#### 📝 一句话总结

GAOT 提出一种面向任意域 PDE 的 encode-process-decode 神经算子：用多尺度注意力图神经算子和几何嵌入把非结构点云编码成 latent tokens，再由 Transformer 做全局交互并用对称的 MAGNO 解码器在任意查询点输出解场。

#### 🎯 核心要点

- **MAGNO 编解码器**：把单尺度 GNO 扩展为 Multiscale Attentional Graph Neural Operator，在多个邻域半径上聚合 PDE 输入和局部几何信息。
- **几何嵌入显式建模域形状**：在每个尺度上用局部统计量或点集嵌入描述邻域点分布，弥补单纯坐标输入难以表达边界/空洞/局部密度的缺陷。
- **latent token grid 三种选择**：支持规则 stencil grid、原始点云下采样、投影低维网格；主实验中规则 latent grid 兼顾效率和精度。
- **Transformer 全局处理器**：MAGNO encoder 先把物理点云压到 latent tokens，ViT/RoPE/RMSNorm 处理器再做全局信息交换，避免每层都在百万级物理点上做消息传递。
- **MAGNO decoder 任意点查询**：对任意物理查询点 \(x\)，从附近 latent tokens 多尺度聚合并恢复目标解，天然支持变分辨率输入输出。
- **时间相关 PDE 支持**：把当前时间 \(t\)、lead time \(\tau\) 和当前状态 \(u(t)\) 作为输入，并可用 direct、residual 或 time-derivative 三种 time-stepping 形式；训练时可配合 all2all。
- **工程可扩展性**：图构建离线预计算/缓存、encoder/decoder 顺序处理、Transformer 批处理、必要时 edge dropping，使 GAOT 能处理 DrivAerNet++、DrivAerML、NASA-CRM 等大规模 3D CFD 数据。

#### 🔬 深入细节

##### 来源与核心图示

任务给出的 NeurIPS 页面可访问摘要和 PDF；更便于抽取方法细节的版本是 arXiv `https://arxiv.org/abs/2505.18781`，项目页为 `https://camlab-ethz.github.io/GAOT/`，代码页为 `https://github.com/shizheng-wen/GAOT`。

![GAOT 架构示意图](https://arxiv.org/html/2505.18781v4/x2.png)
*图：GAOT 使用 MAGNO encoder 将物理点云与输入函数聚合为几何感知 latent tokens，经 ViT 处理器全局交换信息，再用 MAGNO decoder 在任意查询点恢复 PDE 解。*

##### 算法伪代码

```python
# GAOT 前向传播伪代码
def gaot_forward(points_x, input_a, query_x, geometry_info, time=None, tau=None):
    # 1. 选择 latent point cloud / token grid
    latent_y = build_latent_grid(points_x, strategy="structured_stencil")

    # 2. MAGNO encoder: physical -> latent
    latent_tokens = []
    for y in latent_y:
        scale_features = []
        for r_m in multiscale_radii:
            neighbors = cached_neighbors(center=y, points=points_x, radius=r_m)
            agno = attentional_gno(y, neighbors, input_a, radius=r_m)
            geom = geometry_embedding(y, neighbors, geometry_info)
            scale_features.append(MLP(concat(agno, geom)))
        latent_tokens.append(attentional_scale_fusion(scale_features))

    # 3. Transformer processor on latent tokens
    z = patchify(latent_tokens)
    for block in vit_blocks:
        z = z + flash_grouped_attention(RMSNorm(z), rope=True)
        z = z + feed_forward(RMSNorm(z))
    processed_tokens = unpatchify(z)

    # 4. MAGNO decoder: latent -> arbitrary physical query points
    outputs = []
    for x in query_x:
        scale_features = []
        for r_m in decoder_radii:
            neighbors = cached_neighbors(center=x, points=latent_y, radius=r_m)
            agno = attentional_gno(x, neighbors, processed_tokens, radius=r_m)
            geom = geometry_embedding(x, neighbors, geometry_info)
            scale_features.append(MLP(concat(agno, geom)))
        outputs.append(readout(attentional_scale_fusion(scale_features)))

    return stack(outputs)
```

##### 从 GNO 到 AGNO：局部积分不再只看单一尺度

传统 GNO/GINO 的 encoder 可理解为在 latent 点 \(y\) 周围做核积分：

$$
w_e(y)=\sum_{x_k\in N(y)}
\alpha_k\,K_{\theta}(y,x_k,a(x_k))\,\varphi_{\theta}(a(x_k)),
$$

其中 \(N(y)\) 是半径 \(r\) 内的物理邻域。GAOT 认为单一半径很难同时处理边界层、小涡结构和大尺度几何轮廓，因此定义多组半径：

$$
r_m=s_m r_0,\qquad m=1,\ldots,\bar{m}.
$$

在每个尺度上，GAOT 用注意力替代固定 quadrature 权重：

$$
\alpha_{k}^{m}(y)=
\mathrm{softmax}_{x_k\in N_m(y)}
\left(
\frac{q_m(y)^\top k_m(x_k)}{\sqrt{d}}
\right),
$$

$$
\widetilde{w}^{m}_{e}(y)=
\sum_{x_k\in N_m(y)}
\alpha_{k}^{m}(y)\,
K_{\theta}^{m}(y,x_k,a(x_k))\,\varphi_{\theta}^{m}(a(x_k)).
$$

直觉上，半径小的邻域负责边界和局部梯度，半径大的邻域负责整体形状和远场条件；注意力权重让模型根据每个 \(y\) 的局部状态自动决定哪些邻居更重要。

##### 几何嵌入与多尺度融合

仅把坐标 \((x,y,z)\) 输入 GNO 并不足以表达“这个点附近是边界、孔洞、尖角、稀疏采样还是密集采样”。GAOT 在每个尺度 \(m\) 上为 latent 点计算几何嵌入 \(g^m(y)\)，例如邻居数量、局部点分布统计量、相对坐标形状描述等。随后将 PDE 聚合特征和几何嵌入拼接：

$$
\widehat{w}^{m}(y)=\mathrm{MLP}_{m}\left([\widetilde{w}^{m}_{e}(y), g^m(y)]\right).
$$

不同尺度不是简单相加，而是再经过一个尺度注意力：

$$
\beta_m(y)=
\mathrm{softmax}_{m}\left(\psi_m(\widehat{w}^{m}(y))\right),
\qquad
w_e(y)=\sum_{m=1}^{\bar{m}}\beta_m(y)\widehat{w}^{m}(y).
$$

这就是 MAGNO encoder。MAGNO decoder 做相反方向：以物理查询点 \(x\) 为中心，在 latent tokens 上构造多尺度邻域，聚合 processed tokens 与几何嵌入，输出 \(u(x)\)。这种对称设计使 GAOT 不依赖固定网格输出，任意点都可查询。

##### Transformer 处理器为什么放在 latent 空间

若直接在物理点云上堆 Transformer，百万级 CFD 表面点会让注意力和显存成本不可承受；若只用局部 GNN，则长程依赖传播慢。GAOT 把重计算放到 latent tokens 上：encoder 只做一次 physical \(\to\) latent，decoder 只做一次 latent \(\to\) physical，中间多层全局 self-attention 都在较小 token grid 上运行。

处理器使用 RoPE 注入相对位置，RMSNorm 稳定训练，并在实现中使用 Grouped Query / Flash Attention。对规则 latent grid，tokens 可以按 patch 输入 ViT block；对非规则 latent 点，也可以使用相应的坐标位置编码。

##### 时间相关 PDE 与训练损失

对稳态 PDE，GAOT 直接学习：

$$
\mathcal{S}_{\theta}(a)(x_j)\approx u_{\mathrm{true}}(x_j).
$$

训练损失是点级 MSE：

$$
\mathcal{L}_{MSE}=
\frac{1}{N_s N_p}
\sum_{i=1}^{N_s}\sum_{j=1}^{N_p}
\left\|
\mathcal{S}_{\theta}(\cdot)_i(x_j)-\mathbf{u}_{\mathrm{true},i}(x_j)
\right\|_2^2.
$$

对时间相关 PDE，输入扩展为 \(a(t)=(c,u(t))\)，模型输出：

$$
\widehat{\mathcal{S}}_{\theta}(x,t,\tau,a(t)).
$$

最终时间推进可以写成：

$$
\mathcal{S}_{\theta}(t,\tau,a(t))(x)
=\gamma u(t,x)+\delta\widehat{\mathcal{S}}_{\theta}(x,t,\tau,a(t)).
$$

其中 \((\gamma,\delta)=(0,1)\) 是直接预测 \(u(t+\tau)\)，\((1,1)\) 是残差预测，\((1,\tau)\) 近似预测时间导数。论文消融显示 time-derivative marching 常更优，因为它把小步演化写成对当前状态的平滑修正。

##### 与 GINO / RIGNO / Transolver 的区别

GINO 的典型路线是 GNO encoder + 规则 latent grid + FNO/神经算子处理器 + GNO decoder，适合任意几何但单尺度局部聚合较弱。RIGNO 强在图神经算子和不规则点云，但全局处理效率受图规模影响。Transolver 通过物理注意力 token 化降低点云成本，但每层都涉及 slice/deslice 到物理点，超大网格下开销仍高。

GAOT 的关键折中是：encoder/decoder 只在两端碰物理点云，中间层都在 latent token 域；同时 MAGNO 让物理到 latent 的映射具备多尺度几何感知能力。这也是它能在 DrivAerML 约 900 万表面点这种数据上保持可训练性的原因。

##### 工程注意点

GAOT 的效果依赖图构建和 latent grid 选择。论文默认把坐标缩放到 \([-1,1]^d\)，多尺度半径示例为 \(\{0.022,0.033,0.044\}\)；工业 3D 数据常用单尺度半径和 KNN 补边保证每个物理点至少连接到 latent tokens。图构建通常离线缓存，训练时避免反复搜索邻域。若直接在线构图，encoder/decoder 的邻域搜索会成为瓶颈，掩盖 Transformer 处理器的效率优势。

#### 🧪 练习题

```yaml
question: "GAOT 相比 GINO 的核心结构增强是什么？"
options:
  - "只把 FNO 的傅里叶模态数加倍"
  - "用 MAGNO 在多个邻域尺度上注意力聚合，并显式加入局部几何嵌入"
  - "完全移除 latent tokens，直接在物理点云上做全局 Transformer"
  - "只使用固定规则网格，放弃任意查询点输出"
answer: 1
explain: "GAOT 的主要创新是多尺度注意力图神经算子和几何嵌入，并通过 latent token 处理器保持全局建模效率。"
```
