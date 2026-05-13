### InternVideo

```yaml
id: internvideo
name: InternVideo
full_name: "InternVideo: General Video Foundation Models via Generative and Discriminative Learning"
year: "2022"
org: "Shanghai AI Lab / PKU / NJU / SenseTime"
paper_url: "https://arxiv.org/abs/2212.03191"
category: "video_foundation"
parent: "VideoMAE / CLIP"
motivation: "通过融合掩码视频建模（VideoMAE）与多模态视频-语言对比学习两条路径，构建统一的视频基础模型，实现跨任务的视频理解与多模态对齐"
```

#### 📝 一句话总结

InternVideo 提出了一种双路径视频基础模型框架，将自监督掩码视频建模（VideoMAE）与多模态视频-语言对比学习通过跨模型注意力（CMA）机制统一融合，在动作识别、视频-语言对齐和开放世界理解等 39 个数据集上取得 SOTA 表现。

#### 🎯 核心要点

- **双路径架构**：掩码视频编码器（VideoMAE ViT-Huge）+ 多模态视频编码器（UniformerV2 + CLIP-ViT-L/14），分别学习时空表征与视频-语言对齐表征
- **跨模型注意力（CMA）**：冻结两个骨干网络，通过可学习的多头交叉注意力模块在两条路径间进行知识迁移与表征对齐
- **Kinetics-710 数据集**：合并 K400/K600/K700 并去重，构建包含 710 个类别、65 万视频的统一动作识别数据集
- **UnlabeledHybrid 数据集**：融合 K710、SSv2、AVA、WebVid2M 和自采集视频共约 1200 万视频片段，用于掩码视频预训练
- **大规模多模态训练**：在 WebVid2M/10M + HowTo100M + LAION-100M 上进行视频-语言联合训练，视频-图像交替迭代
- **tanh 门控机制**：CMA 模块采用 Flamingo 风格的 tanh 门控，确保新增模块初始输出为零，不破坏原始表征
- **39 个数据集 SOTA**：K400 达 91.1%、SSv2 达 77.2%，在视频检索、视频问答等任务上全面领先

#### 🔬 深入细节

![InternVideo 整体框架图](https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x1.png)
*图 1：InternVideo 整体框架。左侧为掩码视频编码器（VideoMAE），右侧为多模态视频编码器（UniformerV2），两者通过跨模型注意力（CMA）进行交互融合。*

![跨模型注意力（CMA）示意图](https://ar5iv.labs.arxiv.org/html/2212.03191/assets/x4.png)
*图 2：Cross-Model Attention 的模型交互机制。冻结双骨干，通过交叉注意力模块实现双向知识迁移。*

##### 动机与背景

视频理解任务种类繁多，包括动作识别、时序定位、视频检索、视频问答等。传统方法通常只关注单一预训练范式：要么使用掩码自编码（如 VideoMAE）学习细粒度的时空表征，要么使用对比学习（如 CLIP）学习语义对齐的多模态表征。然而，这两种范式各有优劣：

- **掩码视频建模**（生成式）：擅长捕捉局部时空细节，在动作识别等细粒度任务上表现优异，但缺乏语言语义对齐能力
- **视频-语言对比学习**（判别式）：擅长语义级别的跨模态对齐，在检索、问答等任务上表现出色，但对细粒度时空建模能力有限

InternVideo 的核心思想是：**将两种互补的预训练范式统一到一个框架中**，通过跨模型注意力机制让两个编码器相互增强，构建一个真正通用的视频基础模型。

##### 掩码视频编码器（Masked Video Encoder）

掩码视频编码器基于 **VideoMAE** 框架，使用 **ViT-Huge**（632M 参数）作为骨干网络。核心训练流程：

1. **预训练数据**：在 UnlabeledHybrid 数据集（~12M 视频片段）上进行自监督预训练
2. **掩码策略**：采用管状掩码（tube masking），掩码比例高达 **90%**，迫使模型学习强大的时空表征
3. **训练配置**：在 64 块 A100 GPU 上训练 **1200 个 epoch**，学习率 \(2.5 \times 10^{-4}\)，余弦退火调度
4. **后续微调**：在 K710 上用 32 块 GPU 微调 40 个 epoch，基础学习率 0.001，层衰减 0.8

掩码视频建模的核心目标函数为像素级重建损失：

$$\mathcal{L}_{\text{MAE}} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 是被掩码的 token 集合，\(\hat{x}_i\) 是重建的像素值，\(x_i\) 是原始像素值。

> 💡 **关键**：90% 的超高掩码比例是 VideoMAE 的核心设计——视频帧间存在大量冗余，高掩码比例迫使模型真正理解时空结构而非简单插值。

##### 多模态视频编码器（Multimodal Video Encoder）

多模态路径基于 **UniformerV2** 架构，以 **CLIP-ViT-L/14** 作为视觉骨干：

1. **架构设计**：在 ViT 的最后 4 层插入全局 UniBlock，实现多阶段时空融合。额外参数初始化为使输出与原始 CLIP 模型一致，这对保持零样本性能至关重要
2. **视频字幕模块**：标准 6 层 Transformer 解码器（\(c=768\)），后接两层 MLP
3. **训练数据**：WebVid2M/10M + HowTo100M（视频-文本）+ LAION-100M（图像-文本），视频和图像交替迭代训练
4. **训练配置**：128 块 A100 GPU 训练 2 周，共 400K 步；视频-文本 batch size 14,336，图像-文本 batch size 86,016；学习率 \(8 \times 10^{-5}\)

多模态训练采用标准的对比学习损失：

$$\mathcal{L}_{\text{contrast}} = -\frac{1}{N} \sum_{i=1}^{N} \left[ \log \frac{\exp(\text{sim}(v_i, t_i) / \tau)}{\sum_{j=1}^{N} \exp(\text{sim}(v_i, t_j) / \tau)} \right]$$

其中 \(v_i, t_i\) 分别是视频和文本的嵌入表示，\(\tau\) 是温度参数。

> ⚠️ **注意**：图像-文本数据的引入是关键设计——视频-文本数据集规模远小于 CLIP 的 400M 图像-文本对，因此通过图像-文本联合训练弥补数据不足。

##### 跨模型注意力（Cross-Model Attention, CMA）

CMA 是 InternVideo 的核心创新，用于在两个冻结的骨干网络之间建立知识桥梁：

```python
# CMA 伪代码
# 阶段1: 冻结两个预训练骨干
freeze(masked_video_encoder)
freeze(multimodal_video_encoder)

# 阶段2: 添加可学习的CMA模块
for layer_i in range(num_cma_layers - 1):
    # 多模态编码器的中间token作为K/V
    # 掩码编码器的token作为Q
    K, V = multimodal_encoder.intermediate_tokens[layer_i]
    Q = masked_encoder.tokens[layer_i]
    cma_out = MultiHeadCrossAttention(Q, K, V)
    cma_out = tanh_gate * FFN(cma_out)  # tanh门控，初始为0
    masked_encoder.tokens[layer_i] += cma_out

# 最后一层CMA: 方向反转
K, V = masked_encoder.final_tokens
Q = multimodal_encoder.class_token
cma_out_final = MultiHeadCrossAttention(Q, K, V)
multimodal_encoder.class_token += tanh_gate * FFN(cma_out_final)

# 阶段3: 动态加权融合预测分数
score = w1 * masked_score + w2 * multimodal_score  # w1, w2可学习，初始为0
```

CMA 的设计有以下关键特点：

1. **双向知识迁移**：前 N-1 层 CMA 将多模态知识迁移到掩码编码器（多模态→掩码），最后一层反向迁移掩码编码器的细粒度时空知识到多模态编码器（掩码→多模态）
2. **tanh 门控**：借鉴 Flamingo 的设计，在 MHCA 和 FFN 后添加 tanh 门控层，参数初始化为零，确保训练初期 CMA 输出为零，不破坏预训练表征
3. **动态分数融合**：最终预测通过可学习的线性组合动态融合两个编码器的预测分数，权重初始化为零
4. **训练效率**：仅更新 CMA 模块、分类层和多模态编码器的 query token，大幅减少可训练参数

##### Kinetics-710 数据集

InternVideo 提出了 **Kinetics-710（K710）** 数据集，通过合并 K400、K600、K700 三个 Kinetics 版本并去除重复类别构建：

- K400 有 400 类，K600 有 600 类，K700 有 700 类，三者存在大量类别重叠
- 去重后得到 **710 个唯一类别**，共约 **65 万个训练视频**
- 作为统一的动作识别微调数据集，避免了在不同 Kinetics 版本间重复实验的问题

##### 与传统方法的区别

| 维度 | 传统单路径方法 | InternVideo |
|------|---------------|-------------|
| 预训练范式 | 仅掩码建模 或 仅对比学习 | 双路径融合：掩码 + 对比 |
| 表征能力 | 偏向细粒度 或 偏向语义 | 兼具细粒度时空 + 语义对齐 |
| 模型交互 | 无 | CMA 跨模型注意力双向迁移 |
| 任务覆盖 | 单一类型任务 | 39 个数据集，3 大类任务 |
| 数据规模 | 通常单一数据集 | 12M 视频 + 100M 图文对 |

> 💡 **核心洞察**：InternVideo 的成功表明，生成式（掩码建模）和判别式（对比学习）预训练是互补的——前者提供细粒度的时空理解，后者提供语义级别的跨模态对齐，两者通过 CMA 融合后能显著超越任一单独路径。

#### 🧪 练习题

```yaml
question: "InternVideo 中跨模型注意力（CMA）最后一层的设计与前面层有何不同？"
options:
  - "最后一层使用更大的隐藏维度"
  - "最后一层的 Query 来自多模态编码器的 class token，Key/Value 来自掩码编码器"
  - "最后一层不使用 tanh 门控机制"
  - "最后一层同时融合两个编码器的所有 token"
answer: 1
explain: "前 N-1 层 CMA 以掩码编码器 token 为 Q、多模态编码器 token 为 K/V（多模态→掩码方向），而最后一层反转方向：以多模态编码器的 class token 为 Q、掩码编码器 token 为 K/V，实现掩码→多模态的知识迁移。"
```