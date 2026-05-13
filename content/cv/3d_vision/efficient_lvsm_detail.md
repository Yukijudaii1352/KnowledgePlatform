### Efficient-LVSM

```yaml
id: efficient_lvsm
name: Efficient-LVSM
full_name: "Efficient-LVSM: 高效大规模视角合成模型 (Efficient Large View Synthesis with Marginal Costs)"
year: "2025"
org: "Fudan University & Shanghai Jiao Tong University"
paper_url: "https://arxiv.org/abs/2602.06478"
category: "3d_vision"
parent: "LVSM"
motivation: "通过解耦双流共精炼架构将 LVSM 的二次复杂度降至线性，在保持渲染质量的同时实现训练 2× 加速与推理 4.4× 加速"
```

#### 📝 一句话总结

Efficient-LVSM 提出解耦双流（Input Encoder + Target Decoder）共精炼架构，将 LVSM 中 \(O(N^2M)\) 的全注意力复杂度降至 \(O(NM + N)\)，在场景级和物体级新视角合成任务上取得 SOTA 质量的同时，训练收敛速度提升 2 倍、推理延迟降低 4.4 倍。

#### 🎯 核心要点

- **解耦双流架构**：将单体 Transformer 拆分为 Input Encoder（视图内自注意力）和 Target Decoder（自注意力 + 交叉注意力），消除输入-目标间的二次复杂度瓶颈
- **逐层共精炼机制（Co-Refinement）**：每层 Encoder 输出直接送入同层 Decoder 做交叉注意力，实现多尺度特征逐层融合，比单纯交叉注意力提升 2.07 dB
- **REPA 蒸馏**：引入 DINOv3 预训练特征对齐（Smooth L1 损失），对双流架构带来 +0.8 dB 增益（对原始 LVSM 仅 +0.16 dB）
- **KV-Cache 增量推理**：双流解耦天然支持 KV 缓存，新增输入视图只需编码一次并追加缓存，增量推理开销近乎恒定
- **复杂度分析**：注意力复杂度从 LVSM Dec-Only 的 \(O(N^2M)\) 降至 \(O(NM + N)\)，16 个输入视图时推理速度提升 14.9×
- **SOTA 结果**：RealEstate10K 达 29.86 dB（res-512），Objaverse/GSO 达 32.92 dB，ABO 达 32.65 dB，均超越 LVSM Dec-Only

#### 🔬 深入细节

##### 核心架构示意图

![Efficient-LVSM 架构总览](https://arxiv.org/html/2602.06478v1/extracted/6230191/figures/method_v6.png)
*图：Efficient-LVSM 双流共精炼架构。左侧 Input Encoder 对各输入视图独立做 intra-view self-attention；右侧 Target Decoder 先做 self-attention 再通过 cross-attention 从 Encoder 特征中提取信息。每层 Encoder 的输出直接桥接到同层 Decoder，实现逐层共精炼。*

##### 算法伪代码

```python
# Efficient-LVSM 前向推理伪代码
# 输入: source_images [N, H, W, 3], target_plücker [M, H, W, 6]
# 输出: rendered_images [M, H, W, 3]

# Step 1: Tokenization
S = patchify(concat(source_images, source_plücker))  # [N, P, D]  P=patches per view
T = patchify(target_plücker)                          # [M, P, D]

# Step 2: L-layer Co-Refinement
for l in range(L):
    # Input Encoder: intra-view self-attention (each view independently)
    for i in range(N):
        S[i] = self_attn_layer_l(S[i])               # O(P²) per view, O(NP²) total
    
    # Target Decoder: self-attention then cross-attention
    T = self_attn_layer_l(T)                          # O((MP)²) = O(M²P²)
    T = cross_attn_layer_l(Q=T, KV=concat(S))         # O(MP × NP) = O(NMP²)
    
    # Optional: REPA distillation alignment (training only)
    if training:
        loss_repa += smooth_l1(mlp(S), dinov3(source_images))
        loss_repa += smooth_l1(mlp(T), dinov3(target_images))

# Step 3: Decode to pixels
rendered = detokenize(T)  # [M, H, W, 3]

# KV-Cache for incremental inference:
# When new source view N+1 arrives:
#   S_new = encode(source_image_N+1)  # only encode new view
#   cache.append(S_new)               # append to KV cache
#   T = decode(T, cache)              # reuse all cached KV
```

##### 动机与背景

LVSM（Large View Synthesis Model）首次证明了纯 Transformer 架构在新视角合成（NVS）任务上的有效性，无需显式 3D 表征（如 NeRF 或 3D Gaussian Splatting），仅通过注意力机制在潜空间中隐式完成多视图到新视图的映射。然而，LVSM 的核心瓶颈在于其**单体注意力设计**：

- **LVSM Decoder-Only**：将所有 \(N\) 个输入视图和 \(M\) 个目标视图的 token 拼接后做全局自注意力，复杂度为 \(O((N+M)^2 P^2)\)，即 \(O(N^2M)\) 量级，随视图数量二次增长
- **LVSM Encoder-Decoder**：虽然分离了编码和解码，但 Encoder 仍对所有输入视图做全局注意力 \(O(N^2P^2)\)，且缺乏逐层信息传递

> 💡 **关键洞察**：论文通过系统分析发现，LVSM 中不同视图间的注意力模式呈现明显的**稀疏性**——输入视图之间的 cross-view attention 权重远低于 intra-view attention。这意味着全局注意力中大量计算浪费在了低信息量的跨视图交互上。

##### 核心机制：解耦双流共精炼

**1. Input Encoder（视图内自注意力）**

Encoder 对每个输入视图独立处理，仅在视图内部做自注意力：

$$\hat{\mathbf{S}}_i^{(l)} = \text{SelfAttn}^{(l)}(\mathbf{S}_i^{(l-1)}), \quad i = 1, \ldots, N$$

每个视图有 \(P\) 个 patch token，单视图自注意力复杂度为 \(O(P^2)\)，\(N\) 个视图总计 \(O(NP^2)\)。相比 LVSM 的 \(O(N^2P^2)\)，这是从二次到线性的降低。

**2. Target Decoder（自注意力 + 交叉注意力）**

Decoder 对目标视图 token 先做自注意力（捕获目标视图间的空间关系），再通过交叉注意力从 Encoder 特征中提取 3D 信息：

$$\mathbf{T}^{(l)} = \text{CrossAttn}^{(l)}\big(\text{SelfAttn}^{(l)}(\mathbf{T}^{(l-1)}),\; \text{Concat}(\hat{\mathbf{S}}_1^{(l)}, \ldots, \hat{\mathbf{S}}_N^{(l)})\big)$$

交叉注意力中，Query 来自目标 token（\(MP\) 个），Key/Value 来自所有输入 token（\(NP\) 个），复杂度为 \(O(NMP^2)\)。

**3. 逐层共精炼（Co-Refinement）**

> ⚠️ **关键创新**：与传统 Encoder-Decoder 仅在最后一层传递特征不同，Efficient-LVSM 在**每一层**都将 Encoder 的输出桥接到 Decoder。

这一设计的直觉是：浅层特征包含低级纹理和边缘信息，深层特征包含高级语义信息。逐层桥接确保 Decoder 能在每个抽象层级上获取输入视图的信息，实现从细粒度结构到全局语义的渐进式特征融合。消融实验证实，co-refinement 比仅在最后一层交叉注意力提升了 **2.07 dB**（24.18→26.25 PSNR）。

**4. 总体复杂度对比**

| 模型 | Encoder 复杂度 | Decoder 复杂度 | 总复杂度 |
|------|---------------|---------------|---------|
| LVSM Dec-Only | — | \(O((N+M)^2P^2)\) | \(O(N^2M)\) |
| LVSM Enc-Dec | \(O(N^2P^2)\) | \(O(M^2P^2 + NMP^2)\) | \(O(N^2 + NM)\) |
| **Efficient-LVSM** | \(O(NP^2)\) | \(O(M^2P^2 + NMP^2)\) | **\(O(NM + N)\)** |

当 \(N \gg M\)（多输入少目标的典型场景），Efficient-LVSM 的优势尤为显著。

##### REPA 蒸馏：利用预训练视觉先验加速收敛

论文引入 REPA（REPresentation Alignment）蒸馏策略，将 DINOv3 预训练编码器的特征作为监督信号，对齐 Encoder 和 Decoder 中间层的特征表示：

$$\mathcal{L}_{\text{REPA}} = \frac{1}{N}\sum_{i=1}^{N} \text{sim}\big(f(\mathbf{I}), h_\phi(\mathbf{X}_k)\big)$$

其中 \(f\) 是冻结的 DINOv3 编码器，\(h_\phi\) 是可学习的 MLP 投影层（3 层），\(\mathbf{X}_k\) 可以是 Encoder 或 Decoder 的中间特征。

> 💡 **关键发现**：REPA 对 Efficient-LVSM 的增益（+0.8 dB）远大于对原始 LVSM 的增益（+0.16 dB）。论文推测这是因为 LVSM 的全局自注意力将不同视图的特征纠缠在一起，难以与单视图预训练特征对齐；而 Efficient-LVSM 的解耦设计使得 Encoder 特征天然保持视图独立性，更适合蒸馏。

REPA 的最佳配置（通过消融确定）：
- **损失函数**：Smooth L1（优于 L2 和 Cosine，因为绝对近似优于相对近似）
- **蒸馏目标**：同时对输入和目标 token 蒸馏（比单独蒸馏任一方更好）
- **DINOv3 源层**：第 8 层（中间层优于最终层，与 DINOv3 特征分析文献一致）
- **推理时丢弃**：预训练编码器和 MLP 投影层仅在训练时使用，推理时完全丢弃，零额外开销

##### 训练与推理流程

**训练损失**：总损失为像素重建损失与 REPA 蒸馏损失的加权和：

$$\mathcal{L} = \mathcal{L}_{\text{recon}} + \lambda \mathcal{L}_{\text{REPA}}$$

**模型配置**：
- Patch size: \(8 \times 8\)
- Transformer: 24 层（12 层 Encoder + 12 层 Decoder）
- Hidden dimension: 1024
- 参数量: 199M

**推理优化 — KV-Cache**：
- 首次推理：编码所有 \(N\) 个输入视图，缓存 KV
- 新增目标视图：直接复用缓存，仅需运行 Decoder
- 新增输入视图：仅编码新视图并追加缓存，无需重新处理已有视图
- 增量推理开销近乎恒定，适用于交互式 3D 应用

##### 与传统方法的对比

| 维度 | 优化式方法 (NeRF) | 高斯泼溅 (3DGS) | 扩散模型 | LVSM | **Efficient-LVSM** |
|------|-----------------|----------------|---------|------|-------------------|
| 3D 表征 | 显式/隐式 | 显式高斯 | 无 | 无（潜空间） | 无（潜空间） |
| 推理速度 | 慢（需优化） | 快 | 极慢 | 中等 | **快（24.78ms）** |
| 多视图扩展性 | 差 | 中等 | 差 | 差（二次） | **好（线性）** |
| 渲染质量 | 高 | 高 | 中等 | 高 | **最高** |
| 增量推理 | 不支持 | 不支持 | 不支持 | 不支持 | **支持** |

##### 实验结果亮点

**场景级（RealEstate10K）**：
- Res-512: **29.86 dB** PSNR / 0.905 SSIM，超越 LVSM Dec-Only（29.53 dB）
- 推理延迟仅 24.78ms，GFLOPS 仅 1325（LVSM Dec-Only 为 8523）

**物体级（Objaverse → GSO/ABO）**：
- GSO Res-512: **32.92 dB** / 0.973 SSIM / 0.021 LPIPS
- ABO Res-512: **32.65 dB** / 0.951 SSIM / 0.042 LPIPS
- 全面超越 LVSM Dec-Only 和 GS-LRM

**效率**：
- 16 个输入视图时推理速度比 LVSM Dec-Only 快 **14.9×**，内存减少 **50%**
- 训练收敛速度提升 **2×**（达到 LVSM 最终性能仅需一半 GPU 时间）
- 零样本泛化：未经多视图训练即可受益于更多输入视图

#### 🧪 练习题

```yaml
question: "Efficient-LVSM 的 Input Encoder 采用何种注意力机制来降低复杂度？"
options:
  - "所有输入视图之间的全局自注意力（cross-view self-attention）"
  - "仅在每个输入视图内部做自注意力（intra-view self-attention）"
  - "输入视图与目标视图之间的交叉注意力（cross-attention）"
  - "基于局部窗口的稀疏注意力（window attention）"
answer: 1
explain: "Efficient-LVSM 的 Input Encoder 对每个输入视图独立做 intra-view self-attention，避免了视图间的二次复杂度，将 Encoder 复杂度从 O(N²P²) 降至 O(NP²)。"
```