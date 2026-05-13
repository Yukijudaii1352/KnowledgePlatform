### Visual CoT — 视觉思维链多模态推理

```yaml
id: visual_cot
name: Visual CoT
full_name: "Visual CoT: Advancing Multi-Modal Language Models with a Comprehensive Dataset and Benchmark for Chain-of-Thought Reasoning"
year: 2024
authors: "Hao Shao, Shengju Qian, Han Xiao, Guanglu Song, Zhuofan Zong, Letian Wang, Yu Liu, Hongsheng Li"
venue: "NeurIPS 2024 (Datasets and Benchmarks Track)"
org: "CUHK & SenseTime"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2024/hash/0fe99c0f8dd0f926e2c300c9c3c9b1e6-Abstract-Datasets_and_Benchmarks_Track.html"
arxiv_url: "https://arxiv.org/abs/2403.16999"
github_url: "https://github.com/deepcs233/Visual-CoT"
category: mm_reasoning
parent: "—"
motivation: "构建视觉思维链数据集与基准，让多模态大语言模型通过逐步聚焦图像关键区域来推理回答视觉问题"
```

#### 📝 一句话总结

Visual CoT 构建了一个包含 438k 样本的视觉思维链（Visual Chain-of-Thought）数据集，并提出一种让多模态大语言模型在推理时**先预测关键区域边界框、再裁剪放大该区域重新编码**的两阶段推理流程，使模型能够像人类一样"聚焦细节再回答"，在多个 VQA 基准上以更少的视觉 token 实现了超越更大模型和更高分辨率方案的性能。

#### 🎯 核心要点

- **视觉 CoT 数据集**：438k VQA 样本，覆盖 5 大领域（文档/文字识别、图表理解、通用 VQA、关系推理、细粒度识别），其中约 98k 样本附带详细推理步骤标注，数据来源于 12 个公开数据集
- **CoT 边界框标注流水线**：利用 GPT-4 生成推理步骤，再通过专用检测/OCR 模型将文本描述的关键区域自动转化为精确的边界框坐标
- **Visual Sampler 机制**：基于模型预测的边界框，以中心扩展方式裁剪出正方形子区域，经 CLIP 视觉编码器重新编码后与全局特征拼接，实现"先定位后精读"
- **两阶段推理流程**：第一阶段输出关键区域坐标 \([x_1, y_1, x_2, y_2]\)，第二阶段将裁剪区域的视觉特征追加到序列中再生成最终答案
- **Token 效率优势**：224×224 全局 + CoT 裁剪区域（共约 500 token）即可超越 448×448 全图方案（约 1024 token），证明"智能聚焦"比"暴力提分辨率"更高效
- **多任务兼容**：同一模型同时支持 VQA 问答和 Referring Expression Comprehension（REC）目标检测任务，REC 性能超越专用模型

#### 🔬 深入细节

##### 整体框架

![Visual CoT 整体框架](https://arxiv.org/html/2403.16999v2/x1.png)
*图：Visual CoT 的完整流程。给定图像和问题，模型首先预测关键区域的边界框，Visual Sampler 据此裁剪并重新编码该区域，最后将新增的视觉特征拼接到已有序列中生成最终答案。*

Visual CoT 的核心思想是将人类"先扫视全局、再聚焦细节"的视觉推理模式引入多模态大语言模型。传统 MLLM（如 LLaVA）将整张图像编码为固定分辨率的视觉 token 后直接回答问题，当关键信息位于图像的小区域时（如文档中的某个数字、图表中的某条曲线），低分辨率编码会丢失细节。Visual CoT 通过让模型"自己决定看哪里"来解决这一问题。

##### 数据集构建流水线

![数据集构建与示例](https://arxiv.org/html/2403.16999v2/x2.png)
*图：Visual CoT 数据集的构建流程与各领域示例。*

数据集构建分为三个关键步骤：

**步骤一：推理步骤生成。** 对于每个 VQA 样本，将图像、问题和答案输入 GPT-4，要求其生成逐步推理过程，并在推理中明确指出需要关注的图像区域（以自然语言描述）。

**步骤二：区域定位与边界框生成。** 根据 GPT-4 输出的区域描述，使用专用模型将其转化为精确坐标：
- 对于**文档/文字类**数据，使用 OCR 引擎（如 PaddleOCR）定位文字区域
- 对于**通用物体类**数据，使用开放词汇检测器（如 Grounding DINO）定位目标
- 对于**图表类**数据，结合 OCR 和检测器处理混合内容

**步骤三：质量过滤。** 通过 IoU 阈值、面积比例等规则过滤掉定位不准确的样本，确保边界框确实指向回答问题所需的关键区域。

最终数据集涵盖 5 个领域、12 个来源数据集：

| 领域 | 来源数据集 | 样本数 |
|------|-----------|--------|
| 文档/文字 | SROIE, TextVQA, TextCaps, STVQA | ~120k |
| 图表 | ChartQA, DVQA, PlotQA | ~95k |
| 通用 VQA | VQAv2, OK-VQA, GQA | ~150k |
| 关系推理 | VSR | ~10k |
| 细粒度 | Hateful Memes | ~8.5k |

##### Visual Sampler 裁剪策略

![Visual Sampler 示意](https://arxiv.org/html/2403.16999v2/x3.png)
*图：Visual Sampler 的裁剪策略。以预测框中心为基准，取半宽、半高、半分辨率三者的最大值作为扩展半径，裁剪出正方形区域。*

Visual Sampler 是连接"定位"与"精读"的关键组件。给定模型预测的边界框 \([x_1, y_1, x_2, y_2]\)，裁剪过程如下：

```python
# Visual Sampler 裁剪伪代码
def visual_sampler(image, bbox, input_resolution):
    x1, y1, x2, y2 = bbox
    cx, cy = (x1 + x2) / 2, (y1 + y2) / 2          # 边界框中心
    w_half, h_half = (x2 - x1) / 2, (y2 - y1) / 2   # 半宽、半高
    res_half = input_resolution / 2                    # 输入分辨率的一半

    # 取三者最大值作为正方形半边长
    half_len = max(w_half, h_half, res_half)

    # 以中心扩展为正方形，并裁剪到图像边界内
    crop_x1 = max(0, cx - half_len)
    crop_y1 = max(0, cy - half_len)
    crop_x2 = min(image.width, cx + half_len)
    crop_y2 = min(image.height, cy + half_len)

    cropped = image.crop((crop_x1, crop_y1, crop_x2, crop_y2))
    # 缩放到与全局图像相同的输入分辨率
    cropped = cropped.resize((input_resolution, input_resolution))
    return cropped
```

这一设计有三个关键考量：

1. **正方形裁剪**：CLIP ViT 的输入为正方形，直接裁剪正方形避免了额外的形变
2. **最小尺寸保证**（\(\text{res\_half}\) 下界）：即使预测框很小，裁剪区域也不会小于输入分辨率的一半，防止过度放大导致的模糊
3. **中心对齐**：以预测框中心为裁剪中心，保留目标周围的上下文信息

> 💡 **关键直觉**：Visual Sampler 的本质是一个"可微的数字变焦镜头"——模型通过预测坐标来控制镜头对准哪里，然后用相同的视觉编码器对放大后的区域重新提取特征。

##### 两阶段推理流程

完整的推理过程可以形式化为：

**第一阶段（定位）：**

$$\text{bbox} = [x_1, y_1, x_2, y_2] = f_{\text{LLM}}(H_0, T_q)$$

其中 \(H_0 = g_{\text{ViT}}(I)\) 是全局图像特征，\(T_q\) 是问题的文本 token。模型在生成答案之前，先输出一个特殊格式的边界框坐标。

**第二阶段（精读与回答）：**

$$I_{\text{crop}} = \text{VisualSampler}(I, \text{bbox})$$

$$H_1 = g_{\text{ViT}}(I_{\text{crop}})$$

$$\text{answer} = f_{\text{LLM}}([H_0; H_1], T_q)$$

裁剪后的图像经同一 CLIP ViT 编码得到 \(H_1\)，与原始全局特征 \(H_0\) 拼接后，模型基于"全局+局部"的双重视觉信息生成最终答案。

> ⚠️ **注意**：整个流程只需要一个 ViT 和一个 LLM，不引入额外的检测模型。边界框预测完全由 LLM 自身完成，这使得模型在推理时保持端到端的简洁性。

##### 训练策略

模型基于 LLaVA-1.5 架构（CLIP ViT-L/14 + Vicuna-7B/13B），采用两阶段训练：

| 阶段 | 数据 | 学习率 | 训练参数 | Epoch |
|------|------|--------|----------|-------|
| 预训练 | 558k 图文对齐数据 | 2e-3 | 仅投影层 | 1 |
| 微调 | 665k 指令数据 + 438k VisCoT 数据 | 2e-5 | 全参数 | 1 |

训练在 32 张 A100 GPU 上使用 FSDP ZeRO-3 策略完成。训练数据中的 CoT 样本格式为：

```
Question: {question}
Answer: To answer this question, I need to focus on [x1, y1, x2, y2].
{reasoning steps}
The answer is {answer}.
```

##### 实验结果与分析

**主要结果：** VisCoT-7B（336×336）在 8 个 VQA 基准上的平均得分达到 0.580，超越了 LLaVA-1.5-13B（0.478）这一参数量近两倍的模型。

关键发现包括：

1. **CoT 的显著增益**：在消融实验中，移除 CoT 机制后平均性能从 0.580 降至 0.443（-13.7%），证明视觉思维链的核心价值
2. **GT 边界框上界**：使用 ground-truth 边界框时性能可达 0.752，说明更精准的定位还有巨大提升空间
3. **Token 效率**：224 分辨率 + CoT 裁剪（~500 token）的性能优于 448 分辨率无 CoT（~1024 token），以约一半的 token 量实现更好效果
4. **文档场景的巨大提升**：在 SROIE（收据信息提取）任务上，VisCoT 相比基线提升约 8 倍（从 5.8% 到 47.8%），因为文档中的关键文字通常集中在小区域
5. **REC 能力**：模型在 RefCOCO/RefCOCO+/RefCOCOg 上的目标检测性能超越了 KOSMOS-2、Shikra 等专用模型，证明 CoT 训练带来的定位能力具有通用性

> 💡 **关键洞察**：Visual CoT 揭示了一个重要设计原则——对于需要细节理解的视觉任务，"智能地选择看哪里"比"盲目提高全图分辨率"更有效且更经济。这与人类视觉系统中注视点（foveation）机制的原理一致。

#### 🧪 练习题

```yaml
- question: "Visual CoT 中 Visual Sampler 裁剪区域的最小尺寸由什么决定？"
  options:
    - "预测边界框的面积"
    - "输入分辨率的一半（res_half）"
    - "图像原始分辨率"
    - "CLIP ViT 的 patch 大小"
  answer: 1
  explain: "Visual Sampler 取 w_half、h_half、res_half 三者的最大值作为裁剪半边长，其中 res_half（输入分辨率的一半）作为下界，确保裁剪区域不会过小导致放大后模糊。"

- question: "Visual CoT 的两阶段推理中，第二阶段的视觉输入是什么？"
  options:
    - "仅裁剪区域的特征 H1"
    - "全局特征 H0 与裁剪区域特征 H1 的拼接 [H0; H1]"
    - "全局特征 H0 与 H1 的加权平均"
    - "将裁剪区域覆盖到原图后重新编码"
  answer: 1
  explain: "第二阶段将裁剪区域经 ViT 编码得到 H1，与全局特征 H0 直接拼接后输入 LLM，使模型同时获得全局上下文和局部细节信息。"

- question: "Visual CoT 数据集中，边界框标注是如何生成的？"
  options:
    - "人工标注员逐一标注每个样本的关键区域"
    - "使用 GPT-4 直接输出边界框坐标"
    - "GPT-4 生成推理步骤描述关键区域，再用检测/OCR 模型转化为坐标"
    - "从原始数据集的已有标注中直接复用"
  answer: 2
  explain: "数据集构建采用两步流水线：先用 GPT-4 生成包含区域描述的推理步骤，再用 Grounding DINO、PaddleOCR 等专用模型将自然语言描述转化为精确的边界框坐标。"
```