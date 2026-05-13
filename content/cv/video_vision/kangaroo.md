### Kangaroo

```yaml
id: kangaroo
name: "Kangaroo"
full_name: "Kangaroo: A Powerful Video-Language Model Supporting Long-context Video Input"
year: "2024"
org: "Meituan & UCAS"
paper_url: "https://arxiv.org/abs/2408.15542"
category: "video_vision"
parent: "—"
motivation: "通过数据策划系统与课程训练策略构建支持长视频输入的视频语言大模型，实现视频语言对齐"
```

#### 📝 一句话总结

Kangaroo 提出了一套系统化的数据策划流程与渐进式课程训练策略，构建了支持超长视频输入（160帧/22K tokens）的 8B 参数视频语言大模型，在多个视频理解基准上超越同等规模开源模型并在长视频任务上媲美商用模型。

#### 🎯 核心要点

- **模型架构**：EVA-CLIP-L 视觉编码器 + 轻量线性投影器 + 时空 Patchify 模块 + Llama-3-8B-Instruct LLM
- **时序位置编码（TPE）**：使用正弦编码注入帧的实际浮点时间戳（而非帧索引），保留视频元信息
- **数据策划系统**：构建 300M 图像 + 60M 视频的大规模预训练数据集，并精炼出 15M 高质量子集用于预训练精炼阶段
- **五阶段课程训练**：图像预训练 → 视频预训练 → 预训练精炼 → 指令微调 → 长视频微调，逐步解锁组件
- **长视频支持**：高分辨率输入（448×448）+ 最多 160 帧 + 22K 上下文长度 + 动态帧采样 + 序列打包策略
- **SOTA 性能**：在 MVBench、MLVU、MMBench-Video、VideoMME、EgoSchema 等基准上达到 8B 级开源模型最优，部分指标超越 GPT-4V

#### 🔬 深入细节

![Kangaroo 模型架构图](https://arxiv.org/html/2408.15542v1/x2.png)
*图：Kangaroo 整体架构。视频帧经视觉编码器提取特征后注入时序位置编码，通过 Patchify 模块压缩并经投影器映射到 LLM 嵌入空间。*

##### 算法伪代码：课程训练流程

```python
# Kangaroo 五阶段课程训练
# Stage I: 图像预训练 - 对齐视觉与语言特征空间
train(data=300M_images, resolution=224, trainable=[projector], frozen=[ViT, LLM])

# Stage II: 视频预训练 - 引入时序建模能力  
train(data=60M_videos, frames=8, resolution=224, trainable=[projector, ViT], frozen=[LLM])

# Stage III: 预训练精炼 - 高分辨率 + Patchify 压缩
train(data=15M_refined, frames=16, resolution=448, trainable=[all], frozen=[])

# Stage IV: 指令微调 - 多任务对话能力
train(data=instruction_data, frames=64_max, resolution=448, context=10K,
      trainable=[projector, patchify, LLM], frozen=[ViT])

# Stage V: 长视频微调 - 扩展上下文处理能力
train(data=long_videos_subset, frames=160_max, resolution=448, context=22K,
      trainable=[projector, patchify, LLM], frozen=[ViT])
```

##### 动机与背景

现有视频语言大模型面临两大核心挑战：（1）**高质量视频-文本数据稀缺**——网络视频字幕噪声大、描述粗糙，难以支撑精细的视频语言对齐学习；（2）**长视频处理能力受限**——受限于 LLM 上下文窗口和视觉 token 数量爆炸，多数模型仅能处理 8-16 帧的短片段，无法捕获长视频的全局语义。

Kangaroo 针对这两个问题分别提出了数据策划系统和课程训练策略。

##### 核心机制一：时序位置编码（TPE）

传统视频模型使用帧索引作为位置信息，丢失了帧间的实际时间间隔。Kangaroo 设计了基于正弦函数的时序位置编码：

$$TPE(t) = \begin{pmatrix} \sin(t/\theta^{0/d}) \\ \cos(t/\theta^{1/d}) \\ \vdots \\ \sin(t/\theta^{(d-2)/d}) \\ \cos(t/\theta^{(d-1)/d}) \end{pmatrix}$$

$$\hat{Z_f^t} = Z_f^t + TPE(t)$$

其中 \(t\) 是帧的**实际浮点时间戳**（秒），而非帧序号。这使得模型能感知视频的真实时间结构——例如区分匀速采样和变速采样的帧序列。增强后的视觉特征沿时间维度拼接并经投影器映射：

$$Z_V = \text{Projector}(\hat{Z_f^0} \oplus \hat{Z_f^1} \oplus \ldots \oplus \hat{Z_f^n})$$

> 💡 **关键**：使用实际时间戳而非帧索引，使模型能够编码视频的时间元信息（如总时长、采样密度），这对长视频理解尤为重要。

##### 核心机制二：数据策划系统

Kangaroo 构建了一套多阶段数据处理流水线：

1. **预训练数据**：收集 300M 图像-文本对（含 LLaVA-558K、ALLaVA 等）和 60M 视频-文本对（Panda-70M、InternVid 等），用于初始的视觉-语言对齐
2. **预训练精炼数据**（15M）：从预训练数据中精选高质量子集，采用多维度过滤：
   - 视频质量过滤：分辨率 > 224、时长 > 5s、美学评分筛选
   - 文本质量过滤：CLIP 相似度阈值、文本长度和信息密度
   - 去重：基于 CLIP 特征的语义去重
3. **指令微调数据**：整合多任务数据集覆盖 caption、QA、对话、推理等任务，并使用 GPT-4 对低质量标注进行重写增强

##### 核心机制三：课程训练策略

五阶段渐进式训练的设计逻辑：

| 阶段 | 目标 | 分辨率 | 帧数 | 上下文 | 可训练组件 |
|------|------|--------|------|--------|-----------|
| I. 图像预训练 | 视觉-语言对齐 | 224 | 1 | 512 | Projector |
| II. 视频预训练 | 时序建模 | 224 | 8 | 2560 | ViT + Projector |
| III. 预训练精炼 | 高分辨率适应 | 448 | 16 | 2560 | All |
| IV. 指令微调 | 多任务能力 | 448 | ≤64 | 10K | Proj + Patchify + LLM |
| V. 长视频微调 | 长上下文泛化 | 448 | ≤160 | 22K | Proj + Patchify + LLM |

> ⚠️ **注意**：分辨率从 224 提升到 448 时，ViT 序列长度从 256 增至 1024（4倍），因此引入 Spatial-Temporal Patchify 模块进行 token 压缩，避免 LLM 输入过长。

##### 核心机制四：长视频处理技术

为支持长视频输入，Kangaroo 采用三项关键技术：

1. **动态帧采样**：根据视频时长自适应调整采样帧数（16~160），长视频多采样以覆盖全局内容，短视频少采样避免冗余
2. **序列打包（Sequence Packing）**：将不同长度的多模态序列聚合为一个复合实例（配合注意力掩码），消除 padding 带来的无效计算
3. **渐进式上下文扩展**：从 512 → 2560 → 10K → 22K 逐步扩展 LLM 上下文窗口，避免一步到位导致的训练不稳定

##### 与传统方法的区别

| 对比维度 | 传统视频 LMM | Kangaroo |
|---------|-------------|----------|
| 输入帧数 | 8-16 帧固定 | 16-160 帧动态 |
| 位置编码 | 帧索引 | 实际时间戳 |
| 训练策略 | 1-2 阶段 | 5 阶段课程学习 |
| 数据处理 | 直接使用公开数据 | 系统化策划+质量精炼 |
| 上下文长度 | 2-4K | 22K |

Kangaroo 在 8B 参数规模下，于 MLVU（61.0）、LVBench（39.4）等长视频基准上超越 20B+ 参数模型和 GPT-4V，验证了数据质量与训练策略的重要性。

#### 🧪 练习题

```yaml
question: "Kangaroo 的时序位置编码（TPE）使用什么作为输入，而非传统的帧索引？"
options:
  - "帧的像素均值"
  - "帧的实际浮点时间戳（秒）"
  - "帧在视频中的相对位置百分比"
  - "帧的 CLIP 特征向量"
answer: 1
explain: "Kangaroo 使用帧的实际浮点时间戳（float-type timestamp）作为 TPE 输入，而非帧索引，从而将视频的时间元信息（如总时长、采样间隔）编码到视觉特征中。"
```