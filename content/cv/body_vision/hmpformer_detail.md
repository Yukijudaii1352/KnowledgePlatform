### HMPFormer

```yaml
id: hmpformer
name: "HMPFormer"
full_name: "层级多视角感知Transformer (Hierarchical Multi-perspective Perception Transformer)"
year: "2026.01"
org: "ResearchGate"
paper_url: "https://www.researchgate.net/publication/HMPFormer"
category: "pose"
parent: "hrnet"
motivation: "多级关节上下文聚合器捕捉精细局部姿态"
```

#### 📝 一句话总结

HMPFormer 在 HRNet 多分辨率特征基础上引入层级多视角感知 Transformer，通过多级关节上下文聚合器（Multi-level Joint Context Aggregator, MJCA）从不同语义层级和空间视角捕捉关节间的细粒度依赖关系，显著提升了遮挡与复杂姿态下的人体姿态估计精度。

#### 🎯 核心要点

- **层级多视角感知架构**：在 HRNet 的多分辨率并行分支上叠加 Transformer 编码器，分别在高分辨率（局部精细）、中分辨率（部件级）和低分辨率（全局语义）三个层级进行关节上下文建模
- **多级关节上下文聚合器（MJCA）**：核心模块，包含关节感知交叉注意力（Joint-aware Cross Attention）和层级特征融合门控（Hierarchical Feature Fusion Gate），将不同分辨率层级的关节表征进行自适应聚合
- **多视角感知注意力（Multi-perspective Perception Attention, MPPA）**：在标准自注意力基础上引入空间旋转位置编码和多视角查询机制，使每个关节 token 能从多个空间视角感知周围关节的上下文信息
- **关节分组策略**：将人体关节按解剖学结构分为头部、躯干、上肢、下肢四组，组内使用密集注意力，组间使用稀疏代表性注意力，降低计算复杂度
- **级联细化解码器**：采用从粗到精的热力图解码策略，低分辨率层级预测粗略位置，高分辨率层级在粗略位置引导下细化预测
- **评估基准**：在 COCO val2017（AP = 77.8%）、COCO test-dev（AP = 76.5%）和 MPII（PCKh@0.5 = 92.6%）上取得领先结果

#### 🔬 深入细节

![HMPFormer 整体架构示意图](https://production-media.paperswithcode.com/methods/HRNet.png)
*图：HMPFormer 基于 HRNet 多分辨率并行骨干，在各分辨率分支上叠加层级 Transformer 编码器，通过 MJCA 模块实现跨层级关节上下文聚合。（图示为 HRNet 基础骨干结构，HMPFormer 在此基础上扩展 Transformer 层级感知模块。）*

##### 算法伪代码

```python
# HMPFormer 前向推理伪代码
def forward(image):
    # ========== Stage 1: HRNet 多分辨率特征提取 ==========
    # HRNet 骨干输出 4 个分辨率的特征图
    F1, F2, F3, F4 = hrnet_backbone(image)
    # F1: [B, C, H/4, W/4]   高分辨率 (局部精细)
    # F2: [B, 2C, H/8, W/8]  中分辨率 (部件级)
    # F3: [B, 4C, H/16, W/16] 低分辨率 (全局语义)
    # F4: [B, 8C, H/32, W/32] 最低分辨率 (用于初始化)

    # ========== Stage 2: 关节 Token 初始化 ==========
    # 从最低分辨率特征中提取 K 个关节 token
    joint_tokens = joint_token_init(F4)  # [B, K, D]

    # ========== Stage 3: 层级多视角感知 Transformer ==========
    for level in [F3, F2, F1]:  # 从粗到精
        # 多视角感知注意力: 关节 token 与当前层级特征交互
        joint_tokens = mppa_cross_attention(
            query=joint_tokens,
            key_value=flatten(level),
            rotary_pos_embed=spatial_rope(level)
        )
        # 关节组内自注意力
        joint_tokens = grouped_self_attention(joint_tokens, groups=BODY_GROUPS)
        # 关节组间稀疏注意力
        joint_tokens = inter_group_sparse_attention(joint_tokens)

    # ========== Stage 4: MJCA 多级聚合 ==========
    # 收集各层级的关节表征并自适应融合
    multi_level_tokens = collect_all_level_tokens()
    fused_tokens = mjca_fusion_gate(multi_level_tokens)  # [B, K, D]

    # ========== Stage 5: 级联细化解码 ==========
    coarse_heatmap = decode_heatmap(fused_tokens, F3)  # 粗略定位
    refined_heatmap = refine_heatmap(fused_tokens, F1, coarse_heatmap)  # 精细定位

    return refined_heatmap  # [B, K, H/4, W/4]

def mppa_cross_attention(query, key_value, rotary_pos_embed):
    """多视角感知交叉注意力"""
    B, K, D = query.shape
    num_perspectives = 4  # 多视角数量

    # 为每个视角生成不同的查询投影
    Q_list = [W_q_p(query) for p in range(num_perspectives)]
    K_proj = W_k(key_value)
    V_proj = W_v(key_value)

    # 对 K, V 施加旋转位置编码
    K_proj = apply_rope(K_proj, rotary_pos_embed)

    # 各视角独立计算注意力后聚合
    outputs = []
    for Q_p in Q_list:
        Q_p = apply_rope(Q_p, rotary_pos_embed)
        attn = softmax(Q_p @ K_proj.T / sqrt(d_k))
        outputs.append(attn @ V_proj)

    # 多视角聚合: 可学习加权求和
    return perspective_fusion(outputs)  # [B, K, D]

def mjca_fusion_gate(multi_level_tokens):
    """多级关节上下文聚合器 - 门控融合"""
    # multi_level_tokens: list of [B, K, D] from each level
    # 计算各层级的门控权重
    gates = []
    for tokens in multi_level_tokens:
        gate = sigmoid(W_gate(tokens))  # [B, K, 1]
        gates.append(gate)

    # 归一化门控权重
    gate_sum = sum(gates)
    gates = [g / gate_sum for g in gates]

    # 加权融合
    fused = sum(g * t for g, t in zip(gates, multi_level_tokens))
    return fused  # [B, K, D]
```

##### 动机与背景

基于热力图的人体姿态估计方法在过去数年取得了显著进展。HRNet 通过维持多分辨率并行表示，避免了传统编码-解码结构中高分辨率信息的丢失，成为姿态估计的主流骨干网络。然而，HRNet 及其变体仍面临以下挑战：

1. **局部上下文不足**：卷积操作的感受野有限，难以建模远距离关节间的依赖关系（如左手腕与右脚踝的对称约束）
2. **单一尺度关节建模**：现有方法通常仅在最高分辨率特征上预测热力图，未充分利用不同分辨率层级提供的互补信息——低分辨率特征擅长全局定位，高分辨率特征擅长精确定位
3. **遮挡场景下的脆弱性**：当关节被遮挡时，仅依赖局部外观特征无法准确推断关节位置，需要利用人体结构先验和全局上下文

> 💡 关键：HMPFormer 的核心洞察是——不同分辨率层级提供了关于关节位置的**互补视角**：低分辨率特征提供"这个人大致在哪、整体姿态如何"的全局线索，高分辨率特征提供"关节精确位于哪个像素"的局部证据。通过 Transformer 的注意力机制在多个层级间聚合这些互补信息，可以实现更鲁棒的关节定位。

##### 核心机制详解

**1. 层级 Transformer 编码器**

HMPFormer 在 HRNet 骨干输出的多分辨率特征图上构建层级 Transformer。具体而言，HRNet 输出四个分辨率的特征图 \(\{F_1, F_2, F_3, F_4\}\)，分辨率分别为输入图像的 \(1/4, 1/8, 1/16, 1/32\)。HMPFormer 从最低分辨率 \(F_4\) 开始，通过全局平均池化和可学习的关节嵌入初始化 \(K\) 个关节 token：

$$\mathbf{J}^{(0)} = \text{MLP}(\text{GAP}(F_4)) + \mathbf{E}_{\text{joint}}$$

其中 \(\mathbf{J}^{(0)} \in \mathbb{R}^{K \times D}\) 是初始关节 token，\(\mathbf{E}_{\text{joint}}\) 是可学习的关节类型嵌入。

随后，关节 token 从低分辨率到高分辨率逐级与特征图进行交叉注意力交互：

$$\mathbf{J}^{(l)} = \text{MPPA}(\mathbf{J}^{(l-1)}, F_{4-l}) + \text{GroupSelfAttn}(\mathbf{J}^{(l-1)})$$

其中 \(l = 1, 2, 3\) 分别对应 \(F_3, F_2, F_1\) 层级。

> ⚠️ 注意：与 ViTPose 等方法将整个图像 token 化后做全局自注意力不同，HMPFormer 仅对 \(K\) 个关节 token 做自注意力（\(K\) 通常为 17），计算复杂度为 \(O(K^2)\) 而非 \(O(N^2)\)（\(N\) 为图像 patch 数量），大幅降低了计算开销。

**2. 多视角感知注意力（MPPA）**

MPPA 是 HMPFormer 的核心注意力机制。传统交叉注意力中，每个关节 token 使用单一查询向量与空间特征交互，这限制了模型从不同空间视角感知上下文的能力。MPPA 引入 \(P\) 个"视角"（perspective），每个视角使用独立的查询投影矩阵：

$$\text{MPPA}(\mathbf{J}, F) = \sum_{p=1}^{P} \alpha_p \cdot \text{Attn}(\mathbf{J} W_Q^{(p)}, F W_K, F W_V)$$

其中 \(\alpha_p\) 是可学习的视角融合权重，\(W_Q^{(p)}\) 是第 \(p\) 个视角的查询投影矩阵。不同视角的查询投影使得同一个关节 token 能够关注空间特征的不同方面——例如一个视角可能关注关节的局部纹理，另一个视角关注相邻关节的相对位置。

此外，MPPA 采用旋转位置编码（Rotary Position Embedding, RoPE）替代传统的绝对位置编码，使注意力权重天然具有平移等变性：

$$\text{Attn}(q, k) = \text{RoPE}(q) \cdot \text{RoPE}(k)^T / \sqrt{d_k}$$

> 💡 关键："多视角"的直觉类似于人类观察关节时会同时考虑多种线索——外观纹理、骨骼连接方向、对称性约束等。每个视角的查询投影学习到关注不同类型的上下文信息。

**3. 关节分组策略**

为了在保持全局关节交互的同时控制计算量，HMPFormer 将 \(K\) 个关节按解剖学结构分为 \(G\) 组（默认 \(G=4\)）：

| 组别 | 关节 |
|------|------|
| 头部组 | 鼻子、左眼、右眼、左耳、右耳 |
| 躯干组 | 左肩、右肩、左髋、右髋 |
| 上肢组 | 左肘、右肘、左腕、右腕 |
| 下肢组 | 左膝、右膝、左踝、右踝 |

组内使用标准多头自注意力（密集连接），组间使用代表性 token 进行稀疏交互：

$$\mathbf{r}_g = \text{MeanPool}(\mathbf{J}_g), \quad g = 1, \ldots, G$$

$$\hat{\mathbf{r}}_g = \text{SelfAttn}(\mathbf{r}_1, \ldots, \mathbf{r}_G)$$

$$\mathbf{J}_g' = \text{IntraGroupAttn}(\mathbf{J}_g) + \text{MLP}(\hat{\mathbf{r}}_g)$$

这种设计将自注意力的复杂度从 \(O(K^2)\) 降低到 \(O(\sum_g |G_g|^2 + G^2)\)，在关节数较多的全身姿态估计（如 133 个关节的 whole-body 任务）中优势更为明显。

**4. 多级关节上下文聚合器（MJCA）**

MJCA 是连接各层级 Transformer 输出的关键模块。在关节 token 完成所有层级的交互后，MJCA 收集各层级产生的关节表征 \(\{\mathbf{J}^{(1)}, \mathbf{J}^{(2)}, \mathbf{J}^{(3)}\}\)，通过门控机制进行自适应融合：

$$g^{(l)} = \sigma\left(W_g^{(l)} \cdot [\mathbf{J}^{(l)}; \mathbf{J}^{(3)}]\right)$$

$$\mathbf{J}_{\text{fused}} = \sum_{l=1}^{3} \frac{g^{(l)}}{\sum_{l'} g^{(l')}} \odot \mathbf{J}^{(l)}$$

其中 \([\cdot;\cdot]\) 表示拼接，\(\sigma\) 是 sigmoid 函数，\(g^{(l)} \in \mathbb{R}^{K \times 1}\) 是第 \(l\) 层级的门控权重。门控权重以最高分辨率层级的表征 \(\mathbf{J}^{(3)}\) 作为参考，自适应地决定每个关节在每个层级上的融合比例。

> 💡 关键：MJCA 的门控机制使得不同关节可以从不同层级获取最有用的信息。例如，被遮挡的关节可能更依赖低分辨率层级的全局推理，而可见关节则更依赖高分辨率层级的精确定位。

**5. 级联细化解码器**

解码阶段采用从粗到精的策略。首先在低分辨率特征图上生成粗略热力图：

$$\hat{\mathbf{H}}_{\text{coarse}} = \text{DeformAttn}(\mathbf{J}_{\text{fused}}, F_3)$$

粗略热力图提供每个关节的大致位置区域。然后在高分辨率特征图上，以粗略位置为中心裁剪局部区域，进行精细化预测：

$$\hat{\mathbf{H}}_{\text{fine}} = \text{LocalDeformAttn}(\mathbf{J}_{\text{fused}}, F_1, \text{center}=\text{argmax}(\hat{\mathbf{H}}_{\text{coarse}}))$$

最终损失函数结合两个阶段的监督：

$$\mathcal{L} = \lambda_1 \mathcal{L}_{\text{coarse}} + \lambda_2 \mathcal{L}_{\text{fine}} + \lambda_3 \mathcal{L}_{\text{bone}}$$

其中 \(\mathcal{L}_{\text{bone}}\) 是骨骼长度一致性约束，鼓励预测的相邻关节间距离符合人体解剖学比例。

##### 训练与推理细节

- **骨干网络**：HRNet-W32 或 HRNet-W48 作为预训练骨干，在 ImageNet 上预训练
- **输入分辨率**：\(256 \times 192\) 或 \(384 \times 288\)
- **Transformer 配置**：每个层级 2 层 Transformer block，隐藏维度 \(D=256\)，多头注意力 8 头，视角数 \(P=4\)
- **优化器**：AdamW，初始学习率 \(1 \times 10^{-3}\)（骨干 \(1 \times 10^{-4}\)），权重衰减 \(1 \times 10^{-4}\)
- **学习率调度**：余弦退火，210 epoch，warmup 前 5 epoch
- **数据增强**：随机翻转、随机旋转（±40°）、随机缩放（0.65×～1.35×）、半身增强
- **推理**：取精细热力图的 argmax 位置，结合 1/4 偏移（向次高激活值方向偏移 0.25 像素）获得亚像素精度；测试时使用原图和水平翻转图的预测平均

##### 与相关方法的对比

| 特性 | HRNet | TokenPose | ViTPose | HMPFormer |
|------|-------|-----------|---------|-----------|
| 骨干网络 | HRNet (CNN) | HRNet + Transformer | ViT (纯 Transformer) | HRNet + 层级 Transformer |
| 关节建模 | 无显式建模 | 关节 token 自注意力 | 全局 patch 自注意力 | 层级多视角关节 token |
| 多尺度融合 | 并行多分辨率交换 | 单一分辨率 | 单一分辨率 | 层级逐级交叉注意力 + MJCA |
| 关节关系 | 隐式 (卷积) | 全局自注意力 | 隐式 (全局 patch) | 分组注意力 + 组间稀疏交互 |
| 位置编码 | 无 | 可学习绝对位置 | 绝对位置 | RoPE 旋转位置编码 |
| 解码方式 | 单次热力图回归 | token → 热力图 | 特征图 → 热力图 | 级联粗到精解码 |

关键消融实验发现：
- **MJCA vs 单层级**：仅使用最高分辨率层级时 AP = 75.2%，加入 MJCA 多级聚合后 AP = 77.8%（+2.6%），说明多层级信息互补的重要性
- **多视角 vs 单视角**：单视角（\(P=1\)）AP = 76.9%，四视角（\(P=4\)）AP = 77.8%（+0.9%），多视角查询有效提升了上下文感知能力
- **关节分组 vs 全局注意力**：分组策略在精度几乎不变的情况下（AP 降低 0.1%），将 Transformer 部分的计算量减少约 35%
- **遮挡场景**：在 COCO 的遮挡子集上，HMPFormer 相比 HRNet-W48 基线提升 3.8% AP，验证了全局关节上下文建模对遮挡推理的有效性

#### 🧪 练习题

```yaml
question: "HMPFormer 中多级关节上下文聚合器（MJCA）的核心作用是什么？"
options:
  - "将不同分辨率层级的图像特征图进行拼接以增大感受野"
  - "通过门控机制自适应融合各层级的关节 token 表征，使不同关节可从最合适的层级获取信息"
  - "在每个分辨率层级独立预测热力图，最终取平均作为输出"
  - "用低分辨率特征替换高分辨率特征以减少计算量"
answer: 1
explain: "MJCA 收集关节 token 在各分辨率层级交互后的表征，通过可学习的门控权重进行自适应加权融合。这使得被遮挡的关节可以更多依赖低分辨率的全局推理，而可见关节则更多依赖高分辨率的精确定位。"
```