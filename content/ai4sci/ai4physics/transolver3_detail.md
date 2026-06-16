### Transolver-3

```yaml
id: transolver3
name: Transolver-3
full_name: "超大规模求解器 (Transolver-3)"
year: "2026"
org: "清华大学/NVIDIA"
paper_url: "https://arxiv.org/abs/2602.02414"
category: "pde_solving"
parent: "fno"
motivation: "几何切片技术支持1.6亿单元网格"
```

#### 📝 一句话总结

Transolver-3 将 Transolver 的 Physics-Attention 进一步改造成工业级几何求解框架，通过 faster slice/deslice、geometry slice tiling、几何摊销训练和物理状态缓存，把神经 PDE 求解器扩展到超过 \(1.6\times10^8\) 单元的高保真航空/汽车 CFD 网格。

#### 🎯 核心要点

- **来源追溯**：给定 `paper_url` 的 arXiv:2602.02414 实际不是 Transolver-3；检索到 Transolver-3 正确论文为 https://arxiv.org/abs/2602.04940
- **核心瓶颈**：原始 Physics-Attention 虽在 slice domain 做 self-attention，但 Linear1、Linear3 和 slice weight 仍带来 \(O(NC)\)/\(O(NM)\) 级内存压力
- **faster slice/deslice**：利用矩阵乘法结合律，把 Linear1/Linear3 从 \(N\) 个网格单元域移到 \(M\) 个物理状态域，降低中间缓存
- **geometry slice tiling**：分 tile 计算 slice weights，避免一次性物化完整 \(N\times M\) 矩阵
- **geometry amortized training**：训练时从超大高分辨率网格随机抽取 \(10^5\) 到 \(10^6\) 级子集，让模型在不同 step 中摊销学习全局几何规律
- **decoupled inference**：推理时先按 chunk 聚合全局 physical state cache，再对全网格做 field decoding
- **工业级验证**：在 NASA-CRM、AhmedML、DrivAerML 等航空/汽车 CFD 任务上评估，DrivAerML 体网格可超过 160 million cells

#### 🔬 深入细节

##### 图示与来源

![Transolver-3 geometry scaling 示意图](https://arxiv.org/html/2602.04940v1/x2.png)
*图：Transolver-3 训练阶段的 geometry scaling：faster slice/deslice、geometry slice tiling 和 geometry amortized training。来源为实际 Transolver-3 arXiv HTML Figure 2；论文页为 https://arxiv.org/abs/2602.04940。*

##### 算法伪代码

```python
# Transolver-3 优化 Physics-Attention 伪代码
def optimized_physics_attention(x, num_tiles):
    # x: [N, C], N 为网格单元数，C 为通道数，M 为 slice/physical-state 数
    tiles = split_mesh_cells(x, num_tiles)
    s_raw = zeros([M, C])
    d = zeros([M, M])  # diagonal normalization
    cached_weights = []

    # Geometry slice tiling: 不一次性物化 [N, M] 权重
    for x_t in tiles:
        w_t = softmax(linear2(x_t), dim="slice")   # [N_t, M]
        s_raw += w_t.T @ x_t                       # [M, C]
        d += diag(sum(w_t, axis=0))                # [M, M]
        cached_weights.append(w_t)

    # Faster slice: Linear1 从网格域移动到 slice 域
    s = linear1(s_raw @ inverse(d))                # [M, C]
    s_out = linear3(self_attention(s))             # [M, C]

    # Faster deslice: 用 tile 权重把 slice 状态投回局部网格
    out_tiles = []
    for w_t in cached_weights:
        out_tiles.append(w_t @ s_out)              # [N_t, C]
    return concat(out_tiles, axis=0)

def transolver3_inference(full_mesh_chunks):
    # 第一阶段：聚合每层 physical state cache
    state_cache = aggregate_states_over_chunks(full_mesh_chunks)
    # 第二阶段：全网格解码，每个 chunk 与全局 cache 交互
    return decode_fields_with_cache(full_mesh_chunks, state_cache)
```

##### 背景：Transolver 已经线性化，但还不够工业级

Transolver 的基本思想是把 \(N\) 个网格点/单元软分配到 \(M\) 个隐含 physical states，其中 \(M\ll N\)。这样 self-attention 不在全网格点之间做，而是在 \(M\) 个 slice 状态之间做，避免标准 Transformer 的 \(O(N^2)\) 注意力复杂度。

原始 Physics-Attention 可写为：

$$
\mathbf{x}_{\mathrm{proj}}=\mathrm{Linear1}(\mathbf{x}),\quad
\mathbf{w}=\mathrm{Softmax}(\mathrm{Linear2}(\mathbf{x}))
$$

$$
\mathbf{s}=\mathbf{d}^{-1}\mathbf{w}^{\top}\mathbf{x}_{\mathrm{proj}},
\quad
\mathbf{d}_{jj}=\sum_{i=1}^{N}\mathbf{w}_{ij}
$$

$$
\mathbf{x}_{\mathrm{out}}=\mathrm{Linear3}(\mathbf{w}\mathbf{s}')
$$

瓶颈在于，虽然 attention 只在 \(M\) 个状态上发生，\(\mathrm{Linear1}(\mathbf{x})\)、\(\mathrm{Linear3}(\cdot)\) 和 \(\mathbf{w}\in\mathbb{R}^{N\times M}\) 仍随全网格规模 \(N\) 增长。对于 \(N>10^8\) 的工业 CFD 网格，这些中间张量的显存和访存会成为主导成本。

##### Faster slice/deslice：把线性层移到小得多的 slice 域

Transolver-3 的关键观察是矩阵乘法满足结合律。原本先对每个网格点做 Linear1，再按 \(\mathbf{w}^{\top}\) 聚合：

$$
\mathbf{s}
=\mathbf{d}^{-1}\mathbf{w}^{\top}\mathrm{Linear1}(\mathbf{x})
$$

可以改写为先聚合原始特征，再在 slice 域做 Linear1：

$$
\mathbf{s}_{\mathrm{raw}}=\mathbf{w}^{\top}\mathbf{x},\quad
\mathbf{s}=\mathrm{Linear1}(\mathbf{s}_{\mathrm{raw}}\mathbf{d}^{-1})
$$

同理，deslice 阶段将 Linear3 放到 \(M\) 个状态上：

$$
\mathbf{s}_{\mathrm{out}}'=\mathrm{Linear3}(\mathrm{Attention}(\mathbf{s})),
\quad
\mathbf{x}_{\mathrm{out}}=\mathbf{w}\mathbf{s}_{\mathrm{out}}'
$$

这在数学上与原始 slice/deslice 等价，但把两次 \(O(NC^2)\) 的大域线性投影变成 \(O(MC^2)\)。因为 \(M\ll N\)，显存缓存也从网格域的大张量转移到 slice 域的小张量。

##### Geometry slice tiling：不物化完整 \(N\times M\) 权重

即使移走 Linear1/Linear3，slice weights \(\mathbf{w}\in\mathbb{R}^{N\times M}\) 仍可能非常大。Geometry slice tiling 将网格按单元分成多个 tile，只在一个 tile 内计算 \(\mathbf{w}^{(t)}\)，并累加：

$$
\mathbf{s}_{\mathrm{raw}}=\sum_{t=1}^{T}(\mathbf{w}^{(t)})^{\top}\mathbf{x}^{(t)},
\quad
\mathbf{d}=\sum_{t=1}^{T}\mathrm{diag}\left(\sum_i \mathbf{w}^{(t)}_{ij}\right)
$$

这样 peak memory 不再需要完整 \(N\times M\) 权重矩阵，只需保留 tile 级权重和全局累加器。论文的消融显示，在不使用 amortized training 的单 GPU 容量测试中，tiling 使 Transolver-3 的可处理网格规模显著提升，并最终支撑后续的 \(10^8\) 级推理。

##### Geometry amortized training 与 decoupled inference

训练时，完整工业网格过大，无法每步都加载全分辨率网格。Transolver-3 采用 geometry amortized training：每次从原始高分辨率网格随机抽取一个子集 \(D_n\)，规模约为 \(n\sim10^5\) 到 \(10^6\)，不同训练 step 覆盖不同局部区域。由于高保真网格是连续几何流形的离散采样，随机子集仍能让模型学习局部-全局物理状态的组织方式。

推理时则不能只预测子集，因此 Transolver-3 解耦成两阶段：

1. **physical state caching**：把完整网格切成 chunk，逐块计算并聚合每层 physical states，得到全局 cache
2. **full mesh decoding**：对每个 chunk 重新计算 slice weights，并与全局 cache 交互得到该 chunk 的物理场输出

可写作：

$$
\mathbf{w}^{(l)}=\mathrm{Softmax}(\mathrm{Linear2}(\mathbf{x}^{(l)})),
\quad
\mathbf{x}^{(l)}_{\mathrm{out}}=\mathbf{w}^{(l)}\mathbf{s}^{(l)}_{\mathrm{cache}}
$$

这种推理方式类似把“全局物理状态估计”和“局部场值解码”拆开：全局信息只缓存一次，局部输出可以按块流式生成。

##### 与传统神经算子/前代 Transolver 的区别

FNO、Geo-FNO、GNO、GINO 等神经算子在规则网格或中小规模非结构网格上表现强，但面对汽车/飞机外形的 3D 高保真 CFD 网格时，\(N\) 级内存和不规则几何会迅速放大。Transolver 系列的优势是把网格点聚合成少量 learned physical states；Transolver-3 进一步把这一思想工程化到工业尺度。

与 Transolver++ 相比，Transolver-3 不只是靠多 GPU 并行扩容。论文指出 Transolver++ 为省显存移除了原始 Physics-Attention 中的 Linear1，而 Transolver-3 保留这层但把它移到 slice 域，从而兼顾表达能力和显存效率。最终在 DrivAerML 等任务中支持超过 160 million cells 的 volume field prediction。

> 💡 关键：Transolver-3 的“1.6 亿单元”不是单一技巧带来的，而是由 slice 域线性层重排、权重 tiling、随机子网格训练和全局状态缓存推理共同组成的系统级缩放方案。

#### 🧪 练习题

```yaml
question: "Transolver-3 中 faster slice/deslice 的核心作用是什么？"
options:
  - "把所有网格单元两两做全局 self-attention"
  - "利用矩阵乘法结合律，将 Linear1/Linear3 从 N 个网格单元域移动到 M 个 physical-state 域"
  - "完全删除 slice weights，改用普通 CNN"
  - "只在训练集较小时才使用 PDE residual loss"
answer: 1
explain: "由于 \\(M\\ll N\\)，把线性投影移到 slice 域可显著降低时间和显存开销，同时保持与原始 slice/deslice 等价。"
```
