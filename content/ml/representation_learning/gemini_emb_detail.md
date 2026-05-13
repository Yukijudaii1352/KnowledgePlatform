### Gemini Embedding 2

```yaml
id: gemini_emb
name: Gemini Embedding 2
full_name: "Gemini Embedding 2 — 原生多模态统一嵌入模型"
year: "2025.03"
org: Google DeepMind
paper_url: "https://cloud.google.com/vertex-ai/generative-ai/docs/embeddings/get-multimodal-embeddings"
category: multimodal
parent: bert
motivation: "原生多模态3072维统一空间"
```

#### 📝 一句话总结

Gemini Embedding 2 基于 Gemini 大模型家族，将文本、图像、音频、视频和文档统一映射到 3072 维共享向量空间，通过指令式任务描述（Instruction-based Task Specification）实现非对称/对称检索的灵活切换，是首个原生支持五种模态的通用嵌入模型。

#### 🎯 核心要点

- **五模态统一嵌入**：文本、图像（JPEG/PNG/GIF/BMP/WebP）、音频（MP3/WAV）、视频（MP4/MOV）、文档（PDF）共享 3072 维向量空间
- **8192 token 共享上下文窗口**：所有模态共享同一 token 预算（Audio 25 tok/s, Video 66 tok/frame, Image 258 tok/img, PDF 258 tok/page）
- **指令式任务规范**：用自然语言 prompt 替代传统 `task_type` 枚举，支持 search query/document、QA、fact verification、code retrieval、classification、clustering、similarity 等任务
- **Matryoshka 表示学习（MRL）**：支持通过 `output_dimensionality` 参数降维至任意维度，非默认维度输出已 L2 归一化
- **视频多模态融合**：支持可配置 FPS 采样、音轨提取（`audio_track_extraction`）、时间片段裁剪（`start_offset`/`end_offset`），实现视觉+听觉联合嵌入

#### 🔬 深入细节

##### 架构总览

```
┌─────────────────────────────────────────────────────────────────┐
│                    Gemini Embedding 2 Pipeline                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────────┐  ┌─────┐ │
│  │  Text   │  │  Image  │  │  Audio  │  │  Video  │  │ PDF │ │
│  │Tokenizer│  │Tokenizer│  │Tokenizer│  │Tokenizer│  │ OCR │ │
│  │         │  │258 tok/ │  │25 tok/s │  │66 tok/  │  │258/ │ │
│  │         │  │  image  │  │         │  │ frame   │  │page │ │
│  └────┬────┘  └────┬────┘  └────┬────┘  └────┬────┘  └──┬──┘ │
│       │             │            │             │           │     │
│       └──────┬──────┴─────┬──────┴──────┬──────┴───────┬──┘     │
│              │            │             │              │         │
│              ▼            ▼             ▼              ▼         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │         Shared Token Sequence (max 8192 tokens)           │  │
│  └───────────────────────────────────┬───────────────────────┘  │
│                                      │                          │
│  ┌───────────────────────────────────▼───────────────────────┐  │
│  │              Instruction Prefix (Task Prompt)              │  │
│  │  e.g. "Given a search query, retrieve relevant passages"  │  │
│  └───────────────────────────────────┬───────────────────────┘  │
│                                      │                          │
│  ┌───────────────────────────────────▼───────────────────────┐  │
│  │           Gemini Transformer Backbone (Decoder)            │  │
│  │              Multi-head Self-Attention + FFN                │  │
│  └───────────────────────────────────┬───────────────────────┘  │
│                                      │                          │
│  ┌───────────────────────────────────▼───────────────────────┐  │
│  │              Pooling → L2 Normalize                        │  │
│  │         Output: 3072-d (or MRL truncated to d')           │  │
│  └───────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
*图：Gemini Embedding 2 多模态嵌入流水线。各模态经专用 tokenizer 编码后拼接为统一 token 序列，前置任务指令后送入 Gemini Transformer 骨干网络，最终经池化和归一化输出固定维度向量。*

##### 核心伪代码

```python
# Gemini Embedding 2 — 多模态嵌入推理伪代码
def gemini_embed(content_parts, instruction=None, output_dim=3072):
    """
    content_parts: List[Part] — 可混合 text/image/audio/video/pdf
    instruction: str — 任务描述 (e.g. "Classify the topic of this document")
    output_dim: int — 输出维度 (MRL 支持任意 ≤ 3072)
    """
    tokens = []
    
    # Step 1: 多模态 Tokenization (共享 8192 token 预算)
    for part in content_parts:
        if part.type == "text":
            tokens += text_tokenize(part.text)          # BPE tokens
        elif part.type == "image":
            tokens += image_tokenize(part.data)         # 258 tokens/image
        elif part.type == "audio":
            tokens += audio_tokenize(part.data)         # 25 tokens/second
        elif part.type == "video":
            frames = sample_frames(part, fps=part.fps)  # default 1 FPS
            for frame in frames:
                tokens += image_tokenize(frame)         # 66 tokens/frame
                tokens += timestamp_tokens(frame.time)  # 10 tokens/second
            if part.audio_track_extraction:
                tokens += audio_tokenize(part.audio)    # 25 tokens/second
        elif part.type == "pdf":
            tokens += ocr_tokenize(part.pages)          # 258 tokens/page
    
    tokens = tokens[:8192]  # 超出静默截断
    
    # Step 2: 前置任务指令
    if instruction:
        input_seq = tokenize(instruction) + tokens
    else:
        input_seq = tokens
    
    # Step 3: Transformer 前向传播
    hidden_states = gemini_transformer(input_seq)  # Decoder backbone
    
    # Step 4: 池化 + Matryoshka 截断 + 归一化
    embedding = pooling(hidden_states)             # [3072]
    if output_dim < 3072:
        embedding = embedding[:output_dim]         # MRL truncation
    embedding = l2_normalize(embedding)
    
    return embedding  # unit vector in R^output_dim
```

##### 动机与背景

传统嵌入模型面临三大局限：

1. **模态割裂**：文本嵌入（如 text-embedding-005）、图像嵌入（如 CLIP）、音频嵌入各自独立，跨模态检索需要额外对齐层
2. **任务僵化**：通过 `task_type` 枚举（如 RETRIEVAL_DOCUMENT、CLUSTERING）指定任务，无法覆盖长尾场景
3. **维度固定**：输出维度不可调，无法在精度与存储/计算成本间灵活权衡

Gemini Embedding 2 通过以下设计解决上述问题：

##### 核心机制详解

**1. 统一多模态 Tokenizer 体系**

Gemini Embedding 2 继承 Gemini 大模型的多模态 tokenizer 架构。各模态的 token 消耗率经过精心设计以平衡信息密度：

$$\text{Total Tokens} = \sum_{m \in \text{modalities}} n_m \cdot r_m \leq 8192$$

其中 \(r_m\) 为各模态的 token 消耗率：
- 文本：约 1 token/word（BPE）
- 图像：258 tokens/image（固定，与分辨率无关，模型内部 resize 至 512×512）
- 音频：25 tokens/second（语音优化）
- 视频帧：66 tokens/frame
- PDF 页面：258 tokens/page（含 OCR）

> 💡 关键：所有模态共享同一 8192 token 上下文窗口，这意味着多模态输入存在 token 竞争——例如一段 81 秒的视频（含音轨）将耗尽全部 token 预算。

**2. 指令式任务规范（Instruction-based Task Specification）**

区别于前代模型的枚举式 `task_type`，Gemini Embedding 2 使用自然语言指令前缀来定义嵌入的语义行为：

| 任务类型 | 指令示例 | 语义特性 |
|---------|---------|---------|
| 搜索查询 | "Given a web search query, retrieve relevant passages" | 非对称（query→doc） |
| 搜索文档 | "Represent this document for retrieval" | 非对称（doc 侧） |
| QA 问题 | "Given a question, retrieve passages that answer it" | 非对称 |
| 事实验证 | "Verify this claim against evidence documents" | 非对称 |
| 代码检索 | "Given a code search query, retrieve relevant code" | 非对称 |
| 分类 | "Classify the topic of this text" | 对称 |
| 聚类 | "Identify the cluster this text belongs to" | 对称 |
| 语义相似度 | "Determine semantic similarity" | 对称 |

> ⚠️ 注意：非对称任务中，query 侧和 document 侧必须使用**不同的指令**，否则检索效果显著下降。

**3. Matryoshka 表示学习（MRL）**

模型训练时采用 Matryoshka Representation Learning 策略，在多个维度切片上同时优化对比损失：

$$\mathcal{L}_{\text{MRL}} = \sum_{d \in \mathcal{D}} \lambda_d \cdot \mathcal{L}_{\text{contrastive}}(\mathbf{e}_{1:d}, \mathbf{e}^+_{1:d}, \mathbf{e}^-_{1:d})$$

其中 \(\mathcal{D} = \{128, 256, 512, 768, 1024, 3072\}\) 为训练时的维度集合。这使得用户可以在推理时选择任意 \(d \leq 3072\) 的输出维度，低维嵌入仍保持高质量的语义区分能力。

> 💡 关键：Gemini Embedding 2 对非默认维度的输出**自动 L2 归一化**（区别于 gemini-embedding-001 需用户手动归一化），确保余弦相似度直接可用。

**4. 视频嵌入的时空融合**

视频嵌入支持三个可配置参数：
- `fps`：帧采样率（默认 1 FPS），控制时间分辨率
- `start_offset` / `end_offset`：时间片段裁剪
- `audio_track_extraction`：是否提取音轨

当启用音轨提取时，每秒视频消耗的 token 数为：

$$\text{tokens/sec} = \text{fps} \times 66 + 25 + 10 = 101 \text{ (at 1 FPS)}$$

其中 10 tokens/second 用于时间戳编码（格式 "mm:ss"，每秒 2 个时间戳）。

##### 与传统方法的对比

| 特性 | text-embedding-005 | CLIP | multimodalembedding@001 | **Gemini Embedding 2** |
|------|-------------------|------|------------------------|----------------------|
| 模态 | 纯文本 | 文本+图像 | 文本+图像+视频 | 文本+图像+音频+视频+PDF |
| 维度 | 768 | 512/768 | 1408 | 3072 (可配) |
| 上下文 | 2048 tokens | 77 tokens | 32 tokens(文本) | 8192 tokens |
| 任务指定 | task_type 枚举 | 无 | 无 | 自然语言指令 |
| 维度灵活性 | 固定 | 固定 | 固定 | MRL 任意维度 |
| 音频支持 | ❌ | ❌ | ❌ | ✅ (180s) |
| 文档 OCR | ❌ | ❌ | ❌ | ✅ |

##### 训练推测

虽然 Google 未公开完整训练细节，基于 Gemini 模型家族和公开文档可推断：

1. **骨干网络**：基于 Gemini 系列 Decoder-only Transformer，通过特殊池化策略（可能为 last-token pooling 或 mean pooling）将变长序列压缩为固定向量
2. **训练目标**：多阶段训练——预训练阶段使用大规模对比学习（InfoNCE），微调阶段结合指令跟随和 MRL 多维度损失
3. **数据**：多模态配对数据（text-image pairs, text-audio pairs, video-text pairs）+ 大规模文本检索数据
4. **归一化**：输出层 L2 归一化确保余弦相似度等价于内积

#### 🧪 练习题

```yaml
question: "Gemini Embedding 2 处理一段 30 秒视频（1 FPS，启用音轨提取）大约消耗多少 tokens？"
options:
  - "约 1980 tokens (30×66)"
  - "约 2730 tokens (30×(66+25))"
  - "约 3030 tokens (30×(66+25+10))"
  - "约 3288 tokens (30×(66+25+10+8.6))"
answer: 2
explain: "1 FPS 采样 30 秒视频得到 30 帧，每帧 66 tokens = 1980；启用音轨提取后音频 25 tok/s × 30s = 750；总计 1980 + 750 = 2730 tokens。"
```

```yaml
question: "关于 Gemini Embedding 2 的指令式任务规范，以下哪项描述是正确的？"
options:
  - "必须从预定义的 task_type 枚举中选择任务类型"
  - "对称任务（如聚类）中 query 和 document 使用相同指令即可"
  - "非对称检索任务中 query 侧和 document 侧必须使用不同指令"
  - "不提供指令时模型无法生成嵌入向量"
answer: 2
explain: "非对称任务（如搜索）中，query 侧使用检索指令，document 侧使用表示指令，两侧指令不同才能获得最佳效果。不提供指令时模型仍可工作，只是效果可能下降。"
```