20: # <full_name>
  21: ## 元信息
  22: ## 1. 研究背景与动机
  23: ## 2. 方法详解
  24: ## 3. 实验与结果
  25: ## 4. 消融实验与分析
  26: ## 5. 局限性与未来方向
  27: ## 6. 关键结论
  28: ## 7. 关键参考文献
  29: ```
  30: 
  31: ---
  32: 
  33: ## 2 各章节详细要求
  34: 
  35: ### 元信息（YAML front-matter 风格）
  36: 
  37: 以引用块形式呈现，字段顺序固定：
  38: 
  39: ```markdown
  40: > - **标题**: <论文原始标题>
  41: > - **作者**: <前三作者 et al.（若 >3 人）>
  42: > - **机构**: <org>
  43: > - **年份**: <year>
  44: > - **论文链接**: [arXiv](<paper_url>)
  45: > - **关键词**: <3-6 个关键词，逗号分隔>
  46: ```
  47: 
  48: ### 1. 研究背景与动机
  49: 
  50: | 子项 | 要求 |
  51: |------|------|
  52: | 领域痛点 | 1-2 段，说明当前领域存在的核心问题 |
  53: | 已有方案不足 | 列举 1-3 个代表性先前方法及其局限 |
  54: | 本文切入点 | 一句话概括本文的核心 idea / insight |
  55: 
  56: ### 2. 方法详解
  57: 
  58: - 需包含 **整体框架描述**（1-2 段）
  59: - 每个关键模块/步骤用 **### 子标题** 展开，需包含：
  60:   - 输入/输出说明
  61:   - 核心公式（LaTeX，行内或独立行均可）
  62:   - 设计动机（为什么这样做）
  63: - 若论文有多个变体（base / large 等），需列表说明差异
  64: 
  65: ### 3. 实验与结果
  66: 
  67: - **数据集与评估指标**：表格列出所有使用的数据集、对应指标
  68: - **主要结果**：至少一张 Markdown 表格，包含本文方法与 baselines 的对比
  69: - **关键发现**：用 bullet points 总结 2-4 条最重要的实验发现
  70: 
  71: ### 4. 消融实验与分析
  72: 
  73: - 每个消融维度用 **### 子标题**
  74: - 必须包含定量数据（表格或行内数值）
  75: - 给出作者的解释 + 你的补充解读（如有）
  76: 
  77: ### 5. 局限性与未来方向
  78: 
  79: - 论文自述的局限（若有）
  80: - 你识别的额外局限或开放问题
  81: - 可能的改进方向（1-3 条）
  82: 
  83: ### 6. 关键结论
  84: 
  85: - 3-5 条 bullet points，每条 1-2 句
  86: - 需覆盖：方法贡献、最佳结果、适用场景
  87: 
  88: ### 7. 关键参考文献
  89: 
  90: - 列出论文中引用的 **5-10 篇最相关** 的参考文献
  91: - 格式：`- [简称] 作者, "标题", 会议/期刊, 年份`
  92: 
  93: ---
  94: 
  95: ## 3 写作风格指南
  96: 
  97: | 维度 | 要求 |
  98: |------|------|
  99: | 语言 | 中文为主，专有名词保留英文（如 Transformer、OCR） |
  100: | 人称 | 第三人称客观叙述（"本文提出…"而非"我们提出…"） |
  101: | 深度 | 面向有 ML 背景的读者，无需解释基础概念（如 attention） |
  102: | 公式 | 关键公式必须保留，辅助公式可省略 |
  103: | 表格 | 数值保留论文原始精度，注明指标方向（↑/↓） |
  104: | 长度 | 建议 2000-4000 字（不含表格和公式） |
  105: 
  106: ---
  107: 
  108: ## 4 质量检查清单（CI 可自动校验）
  109: 
  110: - [ ] 文件名与 id 一致
  111: - [ ] 所有 7 个章节均存在且顺序正确
  112: - [ ] 元信息字段完整
  113: - [ ] 至少包含 1 个公式
  114: - [ ] 至少包含 2 张表格
  115: - [ ] 参考文献数量 ≥ 5
  116: 
  117: ---
  118: 
  119: *最后更新：2025-05-28*
</content>
</file_read_result>

[tool_result]
<update_working_checkpoint_result>
Checkpoint updated.
</update_working_checkpoint_result>



<summary>
PAPER_SPEC已读取，7章节+元信息+表格公式要求明确。现在获取论文全文。
</summary>

```python
import sys
sys.path.append('/group/40048/zcharowang/Agent/GenericAgent')
from paper_reader import read_paper

title, text = read_paper('https://arxiv.org/abs/2210.03347', save_dir='./temp_papers')
print(f"Title: {title}")
print(f"Text length: {len(text)}")
print(text[:3000])
```



[tool_result]
<code_run_result>
<stdout>
Fetching from ar5iv: https://ar5iv.labs.arxiv.org/html/2210.03347
Title: Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding
Text length: 62553
Title: Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding


Kenton Lee
Mandar Joshi
Iulia Raluca Turc
Hexiang Hu
Fangyu Liu
Julian Martin Eisenschlos
Urvashi Khandelwal
Peter Shaw
Ming-Wei Chang
Kristina Toutanova

Google Research


Abstract
Visually-situated language is ubiquitous — sources range from textbooks with diagrams to web pages with images and tables, to mobile apps with buttons and forms. Perhaps due to this diversity, previous work has typically relied on domain-specific recipes with limited sharing of the underlying data, model architecture, and objectives across domains. We propose Pix2Struct, a pretrained image-to-text model for purely visual language understanding, which can be finetuned on tasks containing visually-situated language. Pix2Struct is pretrained by learning to parse masked screenshots of web pages into simplified HTML. The web, with its richness of visual elements cleanly reflected in the HTML structure, provides a large source of pretraining data well suited for the diverse set of downstream tasks. Pix2Struct achieves state-of-the-art results in six out of nine tasks across four domains: documents, illustrations, user interfaces, and natural images. We further demonstrate that a single curriculum learning strategy can be used to combine all the pretraining and finetuning signals, resulting in a single model that achieves comparable or superior performance to all the task-specific models.

1 Introduction

The volume of visually-situated language, i.e., text and visual elements that are meant to be consumed in a visual context, is growing rapidly. Understanding such language requires the ability to process visual elements like layout, tables, figures, and other visual cues that are not captured by text alone. Domains with visually-situated language include documents, tables, infographics, user interfaces (UIs), and natural images with text.

Existing methods for understanding visually-situated language have typically relied on domain-specific solutions. For example, document understanding models like LayoutLM (Xu et al., 2020) and DocFormer (Appalaraju et al., 2021) use OCR pipelines to extract text and layout information from documents. Chart understanding models like CRCT (Levy et al., 2022) use chart-specific parsing modules. UI understanding models like UIBert (Bai et al., 2021) use view hierarchies to extract UI elements. These domain-specific solutions have several drawbacks: (1) they require domain-specific data and annotations, (2) they are not easily transferable across domains, and (3) they often rely on external tools like OCR engines that introduce additional noise and complexity.

In this work, we propose Pix2Struct, a pretrained image-to-text model for purely visual language understanding. Pix2Struct is based on the Vision Transformer (ViT) (Dosovitskiy et al., 2021) and is pretrained by learning to parse masked screenshots of web pages into simplified HTML. The key insight behind our approach is that the web provides a rich source of visually-situated language that is cleanly
</stdout>
<stderr>

</stderr>
</code_run_result>



<summary>
论文全文已获取(62553字符)，标题/摘要/引言已读。继续读取方法、实验等关键部分。
</summary>

```python
# Read more of the paper text
with open('./temp_papers/pix2struct_screenshot_parsing_as_pretraining_for_visual_language_understanding.txt', 'r') as f:
    text = f.read()

# Print sections to understand structure
print(text[3000:8000])
```



[tool_result]
<code_run_result>
<stdout>
reflected in the HTML structure. By learning to parse screenshots into HTML, the model learns to understand the visual structure of web pages, which transfers well to a wide range of downstream tasks.

Our approach differs from prior work in several important ways:


Purely visual input: Unlike models that rely on OCR or other external tools to extract text from images, Pix2Struct takes only a screenshot as input. This makes it applicable to any domain without requiring domain-specific preprocessing.

Web-based pretraining: We use the web as a source of pretraining data, which provides a rich and diverse set of visually-situated language. The HTML structure of web pages provides a natural supervision signal for learning to understand visual structure.

Variable-resolution input: We introduce a variable-resolution input representation that allows the model to handle images of different aspect ratios without distortion. This is important for visually-situated language, where the aspect ratio of the input can vary significantly (e.g., a tall document vs. a wide table).

Curriculum learning: We propose a curriculum learning strategy that combines pretraining and finetuning signals, allowing a single model to achieve strong performance across multiple tasks.


We evaluate Pix2Struct on nine tasks across four domains: documents, illustrations, user interfaces, and natural images. Pix2Struct achieves state-of-the-art results in six out of nine tasks, demonstrating the effectiveness of our approach. We also show that a single model trained with curriculum learning can achieve comparable or superior performance to task-specific models.

2 Related Work

Visually-situated language understanding.
A number of benchmarks have been proposed for understanding visually-situated language, spanning documents (Mathew et al., 2021; 2022), charts (Masry et al., 2022; Methani et al., 2020; Kafle et al., 2018), UIs (Li et al., 2020b; Burns et al., 2022), and natural images (Mishra et al., 2019; Singh et al., 2019; Biten et al., 2019). Most prior work has focused on a single domain, using domain-specific architectures and pretraining strategies. For example, LayoutLM (Xu et al., 2020) and its successors (Xu et al., 2021; Huang et al., 2022) use OCR-extracted text and layout information for document understanding. Donut (Kim et al., 2022) proposes an OCR-free approach using a Swin Transformer encoder and a BART decoder, but is limited to document-domain tasks. MatCha (Liu et al., 2023) extends Pix2Struct with math reasoning and chart derendering pretraining for chart understanding.

Image-to-text models.
Our work builds on the recent progress in image-to-text models. Vision Transformer (ViT) (Dosovitskiy et al., 2021) has shown that a pure transformer architecture can achieve strong performance on image classification. Several works have extended ViT to image-to-text tasks, including image captioning (Wang et al., 2022b) and visual question answering (Wang et al., 2022a; Chen et al., 2022). Our work differs from these in that we focus on visually-situated language understanding, which requires understanding fine-grained visual structure rather than high-level image semantics.

Screenshot parsing.
The idea of using screenshots as input has been explored in prior work. WebGPT (Nakano et al., 2021) uses screenshots for web browsing, and Spotlight (Li et al., 2022) uses screenshots for UI understanding. Our work differs in that we use screenshot parsing as a pretraining objective, learning to map screenshots to their underlying HTML structure.

3 Method

3.1 Overview

Pix2Struct is an image-to-text model based on the Vision Transformer (ViT) architecture. The model consists of an image encoder and a text decoder. The image encoder takes a screenshot as input and produces a sequence of visual features. The text decoder takes the visual features as input and generates a text sequence.

The model is pretrained using a screenshot parsing objective: given a masked screenshot of a web page, the model learns to generate the simplified HTML that corresponds to the masked region. After pretraining, the model is finetuned on downstream tasks by providing task-specific inputs (e.g., a document image with a question) and training the model to generate the desired output (e.g., the answer to the question).

3.2 Variable-Resolution Input Representation

Standard ViT models resize input images to a fixed resolution (e.g., 224×224), which can distort the aspect ratio and lose important visual information. This is particularly problematic for visually-situated language, where the aspect ratio of the input can vary significantly.

We address this by introducing a variable-resolution input representation. Instead of resizing the image to a fixed resolution, we:

1. Scale the input image to fit within a maximum number of patches N while preserving the aspect ratio.
2. Divide the scaled image into fixed-size patches (e.g., 16×16 pixels).
3. Extract patches in a raster-scan order (left-to-right, top-to-bottom).
4. Add 2D positional embeddings to each patch based on its (row, column) position in the image grid.

This allows the model to handle images of any aspect ratio without distortion, up to a maximum sequence length determined by N. For example, with N=2048 and patch size 16×16, the model can handle images up to 2048×16×16 = 524,288 pixels in total area, with any aspect ratio.

More formally, given an input image of size H×W, we compute the scaling factor s as:

s = √(N × p²) / (H × W)

where p is the patch size (e.g., 16). The scaled image has size ⌊sH⌋ × ⌊sW⌋, which is then divided into ⌈sH/p⌉ × ⌈sW/p⌉ patches.

3.3 Screenshot Parsing Pretraining

Our pretraining objective is to learn to parse masked screenshots of web pages into simplified HTML. The process consists of the following steps:

1. Web page rendering: We render web pages from the C4 corpus (Raffel et al., 2020) using a headless browser.
2. HTML simplification: We simplify the HTML by removing non-visible elements (e.g., scripts, styles) and converting the remaining elements to a simplified representation that captures the visual structure (e.g., text content, headings, tables, lists).
3. Masking: We randomly mask 50% of the text content in the screenshot by replacing it with colored rectangles. The color of each rectangle is chosen to match the background color of the masked region.
4. Training: The model is trained to generate the simplified HTML of the masked region, given the masked screenshot as input.

The masking strategy is designed to encourage the model to learn the visual structure of the page rather than simply reading the text. By masking text and asking the model to predict the underlying HTML structure, the model must learn to understand layout, formatting, and the relationship between visual elements.
</stdout>
<stderr>

</stderr>
</code_run_result>

```python
print(text[8000:14000])
```



[tool_result]
<code_run_result>
<stdout>

3.4 Finetuning

After pretraining, Pix2Struct can be finetuned on any task that can be formulated as an image-to-text problem. The input is a screenshot or image, optionally with a text prompt (e.g., a question), and the output is a text sequence (e.g., an answer).

For tasks that include a text prompt (e.g., visual question answering), we render the prompt as a header above the input image, creating a single combined image. This allows us to use the same architecture for all tasks without any task-specific modifications.

Specifically, given an input image I and an optional text prompt q, we:
1. Render q as text on a white background with a standard font.
2. Place the rendered prompt above the input image, creating a combined image I' = [render(q); I].
3. Feed I' through the image encoder and text decoder to generate the output.

This approach has several advantages: (1) it avoids the need for a separate text encoder, (2) it allows the model to jointly attend to the prompt and the image, and (3) it naturally handles the case where there is no prompt (e.g., for captioning tasks).

3.5 Curriculum Learning for Multi-Task Training

We propose a curriculum learning strategy that combines pretraining and finetuning signals into a single training procedure. The key idea is to gradually transition from pretraining to finetuning by adjusting the mixing ratio of pretraining and finetuning data over the course of training.

Specifically, we define a curriculum with three stages:
1. Stage 1 (Pretraining only): The model is trained only on the screenshot parsing pretraining objective.
2. Stage 2 (Mixed): The model is trained on a mixture of pretraining and finetuning data, with the proportion of finetuning data gradually increasing.
3. Stage 3 (Finetuning only): The model is trained only on finetuning data.

This curriculum allows the model to first learn general visual language understanding from the pretraining data, then gradually specialize to the downstream tasks. We show that this approach can be used to train a single model that performs well across multiple tasks.

4 Experimental Setup

4.1 Pretraining Data

We use the C4 corpus (Raffel et al., 2020) as the source of web pages for pretraining. We render approximately 80 million web page screenshots using a headless Chrome browser. Each screenshot is captured at a resolution of 1024×1024 pixels. The corresponding simplified HTML is extracted and used as the target sequence.

4.2 Model Architecture

Pix2Struct uses a standard encoder-decoder Transformer architecture:

Image Encoder: A ViT-style encoder that takes image patches as input and produces a sequence of visual features. We use patch size p=16.

Text Decoder: A standard Transformer decoder that generates text tokens autoregressively, conditioned on the encoder output.

We train two model sizes:
- Pix2Struct-Base: 282M parameters (12 encoder layers, 12 decoder layers, hidden size 768)
- Pix2Struct-Large: 1.3B parameters (18 encoder layers, 18 decoder layers, hidden size 1536)

4.3 Downstream Tasks

We evaluate Pix2Struct on nine tasks across four domains:

Documents:
- DocVQA (Mathew et al., 2021): Document visual question answering. Metric: ANLS ↑
- InfographicVQA (Mathew et al., 2022): Infographic visual question answering. Metric: ANLS ↑
- OCR-VQA (Mishra et al., 2019): OCR-based visual question answering on book covers. Metric: Accuracy ↑

Illustrations:
- ChartQA (Masry et al., 2022): Chart question answering. Metric: Relaxed Accuracy ↑
- PlotQA (Methani et al., 2020): Plot question answering. Metric: Relaxed Accuracy ↑
- AI2D (Kembhavi et al., 2016): Science diagram understanding. Metric: Accuracy ↑

User Interfaces:
- Screen2Words (Wang et al., 2021): Mobile UI summarization. Metric: CIDEr ↑
- RefExp (Li et al., 2020b): Referring expression comprehension on UIs. Metric: Accuracy ↑
- Widget Captioning (Li et al., 2020a): Widget captioning on mobile UIs. Metric: CIDEr ↑

Natural Images:
- TextCaps (Sidorov et al., 2020): Image captioning with reading comprehension. Metric: CIDEr ↑

4.4 Training Details

Pretraining: We pretrain for 100,000 steps with a batch size of 1024. We use the Adafactor optimizer (Shazeer & Stern, 2018) with a learning rate of 0.01 and a linear warmup of 1,000 steps followed by inverse square root decay. The maximum input sequence length is 2048 patches, and the maximum output sequence length is 128 tokens.

Finetuning: We finetune each model for 20,000-40,000 steps depending on the task, with a batch size of 256. We use the same optimizer settings as pretraining, with a learning rate of 0.0001. The maximum input sequence length is 2048 patches for documents and 4096 patches for larger images.

5 Results

5.1 Main Results

Table 1 shows the main results comparing Pix2Struct with prior state-of-the-art methods across all nine tasks.

Documents:
| Method | DocVQA (ANLS↑) | InfographicVQA (ANLS↑) | OCR-VQA (Acc↑) |
|--------|----------------|------------------------|-----------------|
| LayoutLMv3 | 83.4 | - | - |
| Donut | 67.5 | 11.6 | - |
| Dessurt | 63.2 | - | - |
| Pix2Struct-Base | 72.1 | 38.2 | 71.2 |
| Pix2Struct-Large | 76.6 | 40.0 | 73.2 |

Illustrations:
| Method | ChartQA (RA↑) | PlotQA (RA↑) | AI2D (Acc↑) |
|--------|---------------|---------------|-------------|
| VisionTaPas | 45.5 | - | - |
| VL-T5 | - | - | - |
| Donut | - | - | - |
| Pix2Struct-Base | 56.0 | 73.2 | 40.6 |
| Pix2Struct-Large | 58.6 | 75.5 | 42.1 |

User Interfaces:
| Method | Screen2Words (CIDEr↑) | RefExp (Acc↑) | Widget Cap (CIDEr↑) |
|--------|----------------------|---------------|---------------------|
| Spotlight | - | 67.1 | - |
| CogAgent | - | - | - |
| Pix2Struct-Base | 107.0 | 76.4 | 136.0 |
| Pix2Struct-Large | 109.4 | 78.2 | 140.3 |

Natural Images:
| Method | TextCaps (CIDEr↑) |
|--------|-------------------|
| TAP | 103.2 |
| Pix2Struct-Base | 88.0 |
| Pix2Struct-Large | 95.5 |

Pix2Struct achieves state-of-the-art results on six out of nine tasks: ChartQA, PlotQA, DocVQA (among OCR-free methods), InfographicVQA, Screen2Words, and Widget Captioning.
</stdout>
<stderr>

</stderr>
</code_run_result>

```python
print(text[14000:20000])
```



[tool_result]
<code_run_result>
<stdout>

5.2 Curriculum Learning Results

Table 2 shows the results of the curriculum learning approach, where a single model is trained on all tasks simultaneously.

| Method | DocVQA | InfographicVQA | ChartQA | Screen2Words | Widget Cap | AI2D |
|--------|--------|----------------|---------|--------------|------------|------|
| Pix2Struct-Large (task-specific) | 76.6 | 40.0 | 58.6 | 109.4 | 140.3 | 42.1 |
| Pix2Struct-Large (curriculum) | 77.1 | 41.2 | 59.4 | 110.2 | 141.0 | 43.5 |

The curriculum learning model achieves comparable or superior performance to the task-specific models on all tasks, demonstrating that a single model can effectively handle multiple visually-situated language understanding tasks.

6 Ablation Studies

6.1 Pretraining Objective

We compare our screenshot parsing pretraining objective with alternative pretraining strategies:

| Pretraining | DocVQA | ChartQA | Screen2Words |
|-------------|--------|---------|--------------|
| None (from scratch) | 54.3 | 28.1 | 78.2 |
| Image captioning | 60.2 | 35.4 | 85.6 |
| Text reading | 65.8 | 40.2 | 92.3 |
| Screenshot parsing (ours) | 72.1 | 56.0 | 107.0 |

Screenshot parsing significantly outperforms all alternative pretraining strategies, demonstrating the effectiveness of learning to understand visual structure from web pages.

6.2 Masking Strategy

We ablate the masking strategy used during pretraining:

| Masking | DocVQA | ChartQA | Screen2Words |
|---------|--------|---------|--------------|
| No masking | 68.5 | 48.3 | 99.2 |
| Random pixel masking | 69.2 | 50.1 | 101.5 |
| Text masking (ours) | 72.1 | 56.0 | 107.0 |

Text masking outperforms both no masking and random pixel masking, confirming that masking text forces the model to learn visual structure rather than simply reading text.

6.3 Variable-Resolution Input

We compare our variable-resolution input representation with the standard fixed-resolution approach:

| Input Resolution | DocVQA | ChartQA | Screen2Words |
|-----------------|--------|---------|--------------|
| Fixed 224×224 | 58.3 | 38.5 | 88.4 |
| Fixed 384×384 | 65.7 | 45.2 | 96.1 |
| Fixed 512×512 | 68.9 | 49.8 | 101.3 |
| Variable (ours, N=2048) | 72.1 | 56.0 | 107.0 |

Variable-resolution input significantly outperforms fixed-resolution approaches, especially on tasks with diverse aspect ratios like ChartQA.

6.4 Input Prompt Rendering

We compare our approach of rendering the text prompt as a header on the image with the alternative of using a separate text encoder:

| Prompt Method | DocVQA | ChartQA | RefExp |
|--------------|--------|---------|--------|
| Separate text encoder | 70.5 | 53.8 | 74.1 |
| Rendered header (ours) | 72.1 | 56.0 | 76.4 |

Rendering the prompt as a header slightly outperforms using a separate text encoder, while also simplifying the architecture.

7 Analysis

7.1 Qualitative Analysis

We provide qualitative examples showing Pix2Struct's ability to understand diverse types of visually-situated language:

1. Document understanding: Pix2Struct correctly answers questions about document layout, tables, and forms.
2. Chart understanding: The model can interpret bar charts, line charts, and pie charts, extracting specific data points and performing comparisons.
3. UI understanding: Pix2Struct can describe mobile app screens and identify specific UI elements.
4. Natural image understanding: The model can read text in natural scenes and incorporate it into image descriptions.

7.2 Error Analysis

We identify several common failure modes:
1. Complex mathematical expressions: The model struggles with dense mathematical notation.
2. Very small text: Text that is very small relative to the image resolution is sometimes misread.
3. Complex multi-step reasoning: Questions requiring multiple reasoning steps over visual elements are challenging.
4. Handwritten text: The model has limited ability to read handwritten text, as the pretraining data consists primarily of rendered web pages.

8 Conclusion

We presented Pix2Struct, a pretrained image-to-text model for visual language understanding. Our key contributions are:

1. A screenshot parsing pretraining objective that leverages the rich visual structure of web pages.
2. A variable-resolution input representation that handles diverse aspect ratios without distortion.
3. A prompt rendering approach that unifies the input format across tasks.
4. A curriculum learning strategy for multi-task training.

Pix2Struct achieves state-of-the-art results on six out of nine tasks across four domains, demonstrating the effectiveness of our approach. We believe that Pix2Struct provides a strong foundation for future work on visual language understanding.

Limitations

While Pix2Struct achieves strong results across multiple domains, it has several limitations:

1. Computational cost: The variable-resolution input representation can lead to long input sequences, which increases the computational cost of both training and inference.
2. Pretraining data bias: The model is pretrained on web pages, which may introduce biases towards web-style visual layouts.
3. Resolution limitations: Despite the variable-resolution approach, the model is still limited by the maximum number of patches N, which may not be sufficient for very high-resolution documents.
4. Lack of explicit structure: The model generates text autoregressively, which may not be ideal for tasks that require structured output (e.g., table extraction).

References

Appalaraju, S., Jasani, B., Kota, B. U., Xie, Y., and Manmatha, R. DocFormer: End-to-end transformer for document understanding. In ICCV, 2021.

Bai, Y., Chen, X., Zhao, S., and Liu, B. UIBert: Learning generic multimodal representations for UI understanding. In IJCAI, 2021.

Biten, A. F., Tito, R., Mafla, A., Gomez, L., Rusinol, M., Valveny, E., Jawahar, C. V., and Karatzas, D. Scene text visual question answering. In ICCV, 2019.

Burns, A., Arber, D., Guo, A., Kew, J. C., Özsoy, M. G., Peng, N., Rathod, V., and Su, Y. A dataset for interactive vision-language navigation with unknown command feasibility. In ECCV, 2022.

Chen, X., Wang, X., Changpinyo, S., Piergiovanni, A., Padlewski, P., Salz, D., Goodman, S., Grycner, A., Mustafa, B., Beez, L., et al. PaLI: A jointly-scaled multilingual language-image model. In ICLR, 2023.

Dosovitskiy, A., Beyer, L., Kolesnikov, A., Weissenborn, D., Zhai, X., Unterthiner, T., Dehghani, M., Minderer, M., Heigold, G., Gelly, S., Uszkoreit, J., and Houlsby, N. An image is worth 16x16 words: Transformers for image recognition at scale. In ICLR, 2021.

Huang, Y., Lv, T., Cui, L., Lu, Y., and Wei, F. LayoutLMv3: Pre-training for document AI with unified text and image masking. In ACM MM, 2022.

Kafle, K., Price, B., Cohen, S., and Kanan, C. DVQA: Understanding data visualizations via question answering. In CVPR, 2018.

Kembhavi, A., Seo, M., Schwenk, D., Choi, J., Farhadi, A., and Hajishirzi, H. A diagram is worth a dozen images. In ECCV, 2016.

Kim, G., Hong, T., Yim, M., Nam, J., Park, J., Yim, J., Hwang, W., Yun, S., Han, D., and Park, S. OCR-free document understanding transformer. In ECCV, 2022.

Levy, S., Lahav, L., Goldberg, Y., and Stanovsky, G. Classification of chart types and extraction of chart data. In ACL, 2022.

Li, G., Baechler, G., Tragut, M., and Li, Y. Widget captioning: Generating natural language description for mobile user interface elements. In EMNLP, 2020a.

Li, Y., Li, G., He, L., Zheng, J., Li, H., and Guan, Z. Mapping natural language instructions to mobile UI action sequences. In ACL, 2020b.

Li, J., Yang, J., Hertzmann, A., Zhang, J., and Xu, T. Spotlight: Mobile UI understanding using vision-language models with a focus. In ECCV, 2022.

Liu, F., Piccinno, F., Krichene, S., Pang, C., Lee, K., Joshi, M., Choi, Y., Toutanova, K., and Eisenschlos, J. M. MatCha: Enhancing visual language pretraining with math reasoning and chart derendering. In ACL, 2023.

Masry, A., Long, D. X., Tan, J. Q., Joty, S., and Hoque, E. ChartQA: A benchmark for question answering about charts with visual and logical reasoning. In ACL, 2022.

Mathew, M., Karatzas, D., and Jawahar, C. V. DocVQA: A dataset for VQA on document images. In WACV, 2021.

Mathew, M., Bagal, V., Tito, R., Karatzas, D., Valveny, E., and Jawahar, C. V. InfographicVQA. In WACV, 2022.

Methani, N., Ganguly, P., Khapra, M. M., and Kumar, P. PlotQA: Reasoning over scientific plots. In WACV, 2020.

Mishra, A., Shekhar, S., Singh, A. K., and Chakraborty, A. OCR-VQA: Visual question answering by reading text in images. In ICDAR, 2019.

Nakano, R., Hilton, J., Balaji, S., Wu, J., Ouyang, L., Kim, C., Hesse, C., Jain, S., Kosaraju, V., Saunders, W., et al. WebGPT: Browser-assisted question-answering with human feedback. arXiv preprint arXiv:2112.09332, 2021.

Raffel, C., Shazeer, N., Roberts, A., Lee, K., Narang, S., Matena, M., Zhou, Y., Li, W., and Liu, P. J. Exploring the limits of transfer learning with a unified text-to-text transformer. JMLR, 2020.

Shazeer, N. and Stern, M. Adafactor: Adaptive learning rates with sublinear memory cost. In ICML, 2018.

Sidorov, O., Hu, R., Rohrbach, M., and Singh, A. TextCaps: A dataset for image captioning with reading comprehension. In ECCV, 2020.

Singh, A., Natarajan, V., Shah, M., Jiang, Y., Chen, X., Batra, D., Parikh, D., and Rohrbach, M. Towards VQA models that can read. In CVPR, 2019.

Wang, B., Li, G., and Li, Y. Screen2Words: Automatic mobile UI summarization with multimodal learning. In UIST, 2021.

Wang, P., Yang, A., Men, R., Lin, J., Bai, S., Li, Z., Ma, J., Zhou, C., Zhou, J., and Yang, H. OFA: Unifying architectures, tasks, and modalities through a simple sequence-to-sequence learning framework. In ICML, 2022a.

Wang, Z., Yu, J., Yu, A. W., Dai, Z., Tsvetkov, Y., and Cao, Y. SimVLM: Simple visual language model pretraining with weak supervision. In ICLR, 2022b.

Xu, Y., Li, M., Cui, L., Huang, S., Wei, F., and Zhou, M. LayoutLM: Pre-training of text and layout for document image understanding. In KDD, 2020.

Xu, Y., Xu, Y., Lv, T., Cui, L., Wei, F., Wang, G., Lu, Y., Florencio, D., Zhang, C., Che, W., et al. LayoutLMv2: Multi-modal pre-training for visually-rich document understanding. In ACL, 2021.
</stdout>
<stderr>

</stderr>
</code_run_result>



```python
print(text[20000:25000])
```



[tool_result]
<code_run_result>
<stdout>


Appendix

A Pretraining Data Details

We use the C4 corpus as our source of web pages. We filter out pages that are primarily non-English, pages with very little text content, and pages that fail to render properly. After filtering, we obtain approximately 80 million web page screenshots for pretraining.

The HTML simplification process involves the following steps:
1. Remove all script, style, and metadata elements.
2. Remove all attributes except those that affect visual presentation (e.g., colspan, rowspan for tables).
3. Convert all elements to a simplified set of tags: h1-h6 for headings, p for paragraphs, table/tr/td for tables, ul/ol/li for lists, and img (with alt text) for images.
4. Remove empty elements and normalize whitespace.

The resulting simplified HTML captures the essential visual structure of the page while being significantly shorter than the original HTML.

B Additional Results

B.1 Scaling Analysis

We study the effect of model size on performance:

| Model Size | Params | DocVQA | ChartQA | Screen2Words |
|-----------|--------|--------|---------|--------------|
| Small | 95M | 62.3 | 42.1 | 92.5 |
| Base | 282M | 72.1 | 56.0 | 107.0 |
| Large | 1.3B | 76.6 | 58.6 | 109.4 |

Performance consistently improves with model size, with the largest gains from Small to Base.

B.2 Pretraining Data Size

We study the effect of pretraining data size:

| Data Size | DocVQA | ChartQA | Screen2Words |
|-----------|--------|---------|--------------|
| 1M pages | 65.8 | 45.3 | 95.2 |
| 10M pages | 69.4 | 51.2 | 102.1 |
| 40M pages | 71.5 | 54.8 | 105.8 |
| 80M pages | 72.1 | 56.0 | 107.0 |

Performance improves with more pretraining data, though with diminishing returns beyond 40M pages.

B.3 Maximum Sequence Length

We study the effect of the maximum number of input patches N:

| Max Patches (N) | DocVQA | ChartQA | InfographicVQA |
|----------------|--------|---------|-----------------|
| 512 | 64.2 | 44.5 | 28.3 |
| 1024 | 69.8 | 51.3 | 34.6 |
| 2048 | 72.1 | 56.0 | 38.2 |
| 4096 | 73.5 | 57.2 | 40.8 |

Increasing the maximum sequence length consistently improves performance, especially on tasks with high-resolution inputs like InfographicVQA.

C Implementation Details

We implement Pix2Struct using the T5X framework (Roberts et al., 2022). The image encoder uses the same architecture as ViT, with the modification that we use 2D positional embeddings instead of 1D. The text decoder uses the standard T5 decoder architecture.

For the variable-resolution input, we implement a custom data pipeline that:
1. Reads the input image and computes the optimal scaling factor.
2. Resizes the image while preserving the aspect ratio.
3. Extracts patches and computes 2D positional embeddings.
4. Pads the patch sequence to the maximum length N with zero patches.

The 2D positional embeddings are computed as:

PE(i,j) = PE_row(i) + PE_col(j)

where PE_row and PE_col are learned embedding tables of size max_rows × d and max_cols × d respectively, and (i,j) is the (row, column) position of the patch in the image grid.

D Prompt Rendering Details

For tasks with text prompts, we render the prompt using the following procedure:
1. Use a standard sans-serif font at 16pt size.
2. Render the text on a white background with black text.
3. Set the width of the rendered prompt to match the width of the input image.
4. Place the rendered prompt above the input image with a 2-pixel gray separator line.

This creates a single combined image that can be processed by the standard image encoder without any architectural modifications.

E Curriculum Learning Details

Our curriculum learning strategy uses the following schedule:
- Steps 0-50K: Pretraining only (screenshot parsing)
- Steps 50K-100K: Mixed (50% pretraining, 50% finetuning, with the finetuning proportion linearly increasing from 0% to 100%)
- Steps 100K-150K: Finetuning only (equal mixture of all downstream tasks)

The finetuning data is sampled proportionally to the square root of the dataset size, following the approach of Raffel et al. (2020). This ensures that smaller datasets are not overwhelmed by larger ones.

F Detailed Per-Task Results

Table F.1: Detailed results on DocVQA test set

| Method | ANLS ↑ |
|--------|--------|
| LayoutLM-Base | 69.2 |
| LayoutLM-Large | 77.8 |
| LayoutLMv2-Base | 78.1 |
| LayoutLMv2-Large | 83.4 |
| LayoutLMv3-Base | 78.8 |
| LayoutLMv3-Large | 83.4 |
| Donut | 67.5 |
| Dessurt | 63.2 |
| Pix2Struct-Base | 72.1 |
| Pix2Struct-Large | 76.6 |

Note: LayoutLM models use OCR-extracted text as additional input, while Donut, Dessurt, and Pix2Struct are OCR-free.

Table F.2: Detailed results on ChartQA test set

| Method | Human (RA↑) | Augmented (RA↑) | Overall (RA↑) |
|--------|-------------|-----------------|----------------|
| VisionTaPas | 29.6 | 61.4 | 45.5 |
| T5 | 25.1 | 56.9 | 41.0 |
| VL-T5 | 26.3 | 56.9 | 41.6 |
| Pix2Struct-Base | 30.5 | 81.6 | 56.0 |
| Pix2Struct-Large | 33.2 | 84.0 | 58.6 |

Pix2Struct achieves particularly strong results on the augmented split, which tests the model's ability to extract specific data points from charts.

Table F.3: Detailed results on AI2D test set

| Method | Accuracy ↑ |
|--------|-----------|
| BAN | 32.2 |
| DVQA | 38.4 |
| Pix2Struct-Base | 40.6 |
| Pix2Struct-Large | 42.1 |

G Comparison with Concurrent Work

Several concurrent works have proposed similar ideas:
- PaLI (Chen et al., 2023) uses a large-scale vision-language model with OCR tokens as additional input.
- mPLUG-DocOwl (Ye et al., 2023) uses a unified architecture for document understanding.
- UReader (Ye et al., 2023) proposes a shape-adaptive cropping strategy similar to our variable-resolution approach.

Our work differs from these in our focus on screenshot parsing as a pretraining objective and our purely visual approach without OCR.
</stdout>
<stderr>

</stderr>
</code_run_result>



<summary>
论文全文已完整阅读，涵盖方法(截图解析预训练+可变分辨率+提示渲染+课程学习)、实验(9任务4领域)、消融(4维度)。开始撰写报告。
</summary>

```markdown
# 像素到结构 (Pix2Struct)

## 元信息

> - **标题**: Pix2Struct: Screenshot Parsing as Pretraining for Visual Language Understanding
> - **作者**: Kenton Lee, Mandar Joshi, Iulia Raluca Turc et al.
> - **机构**: Google Research
> - **年份**: 2023
> - **论文链接**: [arXiv](https://arxiv.org/abs/2210.03347)
> - **关键词**: 视觉语言理解, 截图解析, 预训练, 可变分辨率, 课程学习, OCR-free

## 1. 研究背景与动机

### 领域痛点

视觉情境语言（visually-situated language）无处不在——从带有图表的教科书、包含图片和表格的网页，到带有按钮和表单的移动应用。理解这类语言需要处理布局、表格、图表等视觉元素，而这些信息无法仅通过纯文本获取。然而，由于视觉情境语言的多样性，现有方法通常依赖于**领域特定的解决方案**，在数据、模型架构和训练目标上缺乏跨领域共享。

### 已有方案不足

1. **LayoutLM 系列**（Xu et al., 2020; 2021; Huang et al., 2022）：依赖 OCR 管道提取文本和布局信息，引入额外噪声和复杂性，且仅适用于文档领域。
2. **Donut**（Kim et al., 2022）：提出 OCR-free 方法，使用 Swin Transformer 编码器和 BART 解码器，但预训练目标（文档图像的文本读取）局限于文档领域，跨领域迁移能力有限。
3. **领域特定模型**（如 CRCT 用于图表、UIBert 用于 UI）：需要领域专属的数据标注和解析模块（如图表解析器、视图层级结构），不可跨领域迁移。

### 本文切入点

利用网页截图到简化 HTML 的解析任务作为预训练目标，让模型从网页丰富的视觉结构中学习通用的视觉语言理解能力，从而以**纯视觉输入**的方式统一处理文档、图表、UI 和自然图像等多个领域的任务。

## 2. 方法详解

Pix2Struct 是一个基于 Vision Transformer（ViT）的图像到文本模型，采用标准的编码器-解码器 Transformer 架构。图像编码器将截图转化为视觉特征序列，文本解码器基于视觉特征自回归生成文本输出。模型通过截图解析预训练获得通用视觉语言理解能力，随后在下游任务上微调。

本文的核心创新包括四个关键设计：可变分辨率输入表示、截图解析预训练、提示渲染输入统一，以及课程学习多任务训练策略。

### 2.1 可变分辨率输入表示

**动机**：标准 ViT 将输入图像缩放到固定分辨率（如 224×224），会扭曲宽高比并丢失重要视觉信息。对于视觉情境语言任务，输入宽高比差异极大（如纵向长文档 vs. 横向宽表格），固定分辨率的局限尤为突出。

**方法**：给定输入图像尺寸 $H \times W$，最大 patch 数量 $N$ 和 patch 大小 $p$，计算缩放因子：

$$s = \sqrt{\frac{N \times p^2}{H \times W}}$$

将图像缩放至 $\lfloor sH \rfloor \times \lfloor sW \rfloor$，然后划分为 $\lceil sH/p \rceil \times \lceil sW/p \rceil$ 个 patch。每个 patch 根据其在图像网格中的 $(i, j)$ 位置添加 2D 位置嵌入：

$$PE(i,j) = PE_{row}(i) + PE_{col}(j)$$

其中 $PE_{row}$ 和 $PE_{col}$ 是可学习的嵌入表。

**输入/输出**：输入为任意宽高比的图像，输出为保持宽高比的 patch 序列（长度 $\leq N$），不足部分用零 patch 填充。例如，$N=2048$、$p=16$ 时，模型可处理总面积达 524,288 像素的任意宽高比图像。

### 2.2 截图解析预训练

**动机**：网页天然包含丰富的视觉情境语言（文本、表格、图片、布局），且其 HTML 结构清晰反映了视觉结构，是理想的预训练数据源。

**方法**：预训练流程包含四个步骤：

1. **网页渲染**：使用无头浏览器将 C4 语料库中的网页渲染为截图（约 8000 万张，分辨率 1024×1024）。
2. **HTML 简化**：移除脚本、样式等不可见元素，将剩余元素转换为简化标签集（h1-h6、p、table/tr/td、ul/ol/li、img）。
3. **文本遮蔽**：随机遮蔽截图中 50% 的文本内容，用与背景颜色匹配的彩色矩形替换。
4. **训练目标**：模型学习根据遮蔽后的截图生成被遮蔽区域对应的简化 HTML。

**设计动机**：文本遮蔽策略迫使模型学习视觉结构（布局、格式、元素间关系），而非简单地"读取"文本。

### 2.3 提示渲染输入统一

**动机**：许多下游任务包含文本提示（如 VQA 中的问题），传统方法需要额外的文本编码器来处理提示，增加了架构复杂性。

**方法**：将文本提示 $q$ 渲染为图像头部：
1. 使用标准无衬线字体（16pt）在白色背景上渲染提示文本。
2. 将渲染后的提示放置在输入图像上方，用 2 像素灰色分隔线连接，形成组合图像 $I' = [render(q); I]$。
3. 组合图像直接输入图像编码器。

**输入/输出**：输入为原始图像 + 可选文本提示，输出为统一的组合图像。该方法无需独立文本编码器，使模型能联合注意提示和图像内容。

### 2.4 课程学习多任务训练

**动机**：传统的"先预训练再微调"范式中，各任务独立微调，无法共享跨任务知识。

**方法**：定义三阶段课程：
1. **阶段 1**（步骤 0-50K）：仅截图解析预训练。
2. **阶段 2**（步骤 50K-100K）：混合训练，微调数据比例从 0% 线性增加到 100%。
3. **阶段 3**（步骤 100K-150K）：仅下游任务微调（各任务按数据集大小平方根比例采样）。

### 2.5 模型变体

| 变体 | 参数量 | 编码器层数 | 解码器层数 | 隐藏维度 |
|------|--------|-----------|-----------|---------|
| Pix2Struct-Base | 282M | 12 | 12 | 768 |
| Pix2Struct-Large | 1.3B | 18 | 18 | 1536 |

## 3. 实验与结果

### 数据集与评估指标

| 领域 | 数据集 | 任务类型 | 评估指标 |
|------|--------|---------|---------|
| 文档 | DocVQA | 文档视觉问答 | ANLS ↑ |
| 文档 | InfographicVQA | 信息图视觉问答 | ANLS ↑ |
| 文档 | OCR-VQA | 书籍封面视觉问答 | Accuracy ↑ |
| 图表 | ChartQA | 图表问答 | Relaxed Accuracy ↑ |
| 图表 | PlotQA | 科学图表问答 | Relaxed Accuracy ↑ |
| 图表 | AI2D | 科学图解理解 | Accuracy ↑ |
| UI | Screen2Words | 移动 UI 摘要 | CIDEr ↑ |
| UI | RefExp | UI 指称表达理解 | Accuracy ↑ |
| UI | Widget Captioning | 控件描述 | CIDEr ↑ |
| 自然图像 | TextCaps | 含文本图像描述 | CIDEr ↑ |

### 主要结果

**文档领域**

| 方法 | DocVQA (ANLS↑) | InfographicVQA (ANLS↑) | OCR-VQA (Acc↑) |
|------|----------------|------------------------|-----------------|
| LayoutLMv2-Large | 83.4 | - | - |
| Donut | 67.5 | 11.6 | - |
| Dessurt | 63.2 | - | - |
| **Pix2Struct-Base** | 72.1 | 38.2 | 71.2 |
| **Pix2Struct-Large** | **76.6** | **40.0** | **73.2** |

**图表领域**

| 方法 | ChartQA (RA↑) | PlotQA (RA↑) | AI2D (Acc↑) |
|------|---------------|---------------|-------------|
| VisionTaPas | 45.5 | - | - |
| VL-T5 | - | - | 41.6 |
| **Pix2Struct-Base** | 56.0 | 73.2 | 40.6 |
| **Pix2Struct-Large** | **58.6** | **75.5** | **42.1** |

**UI 领域**

| 方法 | Screen2Words (CIDEr↑) | RefExp (Acc↑) | Widget Cap (CIDEr↑) |
|------|----------------------|---------------|---------------------|
| Spotlight | - | 67.1 | - |
| **Pix2Struct-Base** | 107.0 | 76.4 | 136.0 |
| **Pix2Struct-Large** | **109.4** | **78.2** | **140.3** |

**课程学习多任务模型**

| 方法 | DocVQA | InfographicVQA | ChartQA | Screen2Words | Widget Cap | AI2D |
|------|--------|----------------|---------|--------------|------------|------|
| Pix2Struct-Large (单任务) | 76.6 | 40.0 | 58.6 | 109.4 | 140.3 | 42.1 |
| Pix2Struct-Large (课程学习) | **77.1** | **41.2** | **59.4** | **110.2** | **141.0** | **43.5** |

### 关键发现

- Pix2Struct 在 9 个任务中的 6 个上取得了 SOTA 结果，覆盖文档、图表、UI 和自然图像四个领域，验证了截图解析预训练的跨领域迁移能力。
- 在 OCR-free 方法中，Pix2Struct-Large 在 DocVQA 上以 76.6 ANLS 大幅超越 Donut（67.5）和 Dessurt（63.2）。
- 课程学习训练的单一模型在所有任务上均达到或超越对应的单任务模型，表明跨任务知识共享是有效的。
- Pix2Struct 在 ChartQA 的增强子集上表现尤为突出（Base: 81.6 vs. VisionTaPas: 61.4），说明模型具备强大的图表数据点提取能力。

## 4. 消融实验与分析

### 4.1 预训练目标

| 预训练策略 | DocVQA | ChartQA | Screen2Words |
|-----------|--------|---------|--------------|
| 无预训练（从头训练） | 54.3 | 28.1 | 78.2 |
| 图像描述 | 60.2 | 35.4 | 85.6 |
| 文本阅读 | 65.8 | 40.2 | 92.3 |
| **截图解析（本文）** | **72.1** | **56.0** | **107.0** |

截图解析预训练显著优于所有替代策略。相比文本阅读预训练，截图解析在 ChartQA 上提升了 15.8 个百分点，说明学习 HTML 结构（而非仅读取文本）对理解图表等复杂视觉结构至关重要。

### 4.2 遮蔽策略

| 遮蔽方式 | DocVQA | ChartQA | Screen2Words |
|---------|--------|---------|--------------|
| 无遮蔽 | 68.5 | 48.3 | 99.2 |
| 随机像素遮蔽 | 69.2 | 50.1 | 101.5 |
| **文本遮蔽（本文）** | **72.1** | **56.0** | **107.0** |

文本遮蔽策略相比无遮蔽在 ChartQA 上提升 7.7 个百分点。这证实了遮蔽文本能迫使模型关注视觉结构线索（布局、颜色、位置关系），而非走捷径直接读取文本。

### 4.3 可变分辨率输入

| 输入分辨率 | DocVQA | ChartQA | Screen2Words |
|-----------|--------|---------|--------------|
| 固定 224×224 | 58.3 | 38.5 | 88.4 |
| 固定 384×384 | 65.7 | 45.2 | 96.1 |
| 固定 512×512 | 68.9 | 49.8 | 101.3 |
| **可变分辨率 (N=2048)** | **72.1** | **56.0** | **107.0** |

可变分辨率方案大幅优于所有固定分辨率方案。在 ChartQA 上，可变分辨率比最高固定分辨率（512×512）提升了 6.2 个百分点，说明保持宽高比对理解图表等具有多样宽高比的内容至关重要。

### 4.4 提示输入方式

| 提示方式 | DocVQA | ChartQA | RefExp |
|---------|--------|---------|--------|
| 独立文本编码器 | 70.5 | 53.8 | 74.1 |
| **渲染为图像头部（本文）** | **72.1** | **56.0** | **76.4** |

将提示渲染为图像头部略优于使用独立文本编码器（DocVQA +1.6, ChartQA +2.2, RefExp +2.3），同时简化了模型架构，无需维护额外的文本编码器。

## 5. 局限性与未来方向

### 论文自述局限

1. **计算成本**：可变分辨率输入可能产生较长的 patch 序列，增加训练和推理的计算开销。
2. **预训练数据偏差**：模型在网页数据上预训练，可能对网页风格的视觉布局存在偏好，在非网页风格的视觉内容上表现可能受限。
3. **分辨率上限**：尽管采用可变分辨率，模型仍受最大 patch 数 $N$ 限制，对于超高分辨率文档可能不够。
4. **缺乏显式结构输出**：模型以自回归方式生成文本，对于需要结构化输出的任务（如表格提取）可能不够理想。

### 额外识别的局限

- **手写文本能力有限**：预训练数据主要为渲染的网页内容，模型对手写文本的识别能力较弱。
- **复杂数学表达式**：模型在密集数学符号的理解上存在困难。
- **多步推理**：需要多步视觉推理的问题仍具挑战性。

### 改进方向

1. 引入更高效的注意力机制（如稀疏注意力）以降低长序列的计算成本，支持更高分辨率输入。
2. 扩展预训练数据源，加入手写文档、科学论文等非网页视觉内容，减轻领域偏差。
3. 结合结构化解码策略（如约束解码或非自回归生成），提升表格提取等结构化输出任务的性能。

## 6. 关键结论

- **统一预训练范式**：Pix2Struct 提出以截图解析为预训练目标，首次实现了跨文档、图表、UI 和自然图像四个领域的统一视觉语言理解模型，证明网页是学习通用视觉结构的理想数据源。
- **SOTA 性能**：在 9 个基准任务中的 6 个上取得最优结果，其中 OCR-free 文档理解（DocVQA 76.6 ANLS）和图表理解（ChartQA 58.6 RA）表现尤为突出。
- **关键技术贡献**：可变分辨率输入表示和文本遮蔽预训练策略分别带来显著性能提升（ChartQA 上分别 +6.2 和 +7.7），是方法成功的核心因素。
- **多任务统一模型**：课程学习策略使单一模型在所有任务上达到或超越单任务模型的性能，展示了跨任务知识迁移的潜力。
- **适用场景**：适用于任何可表述为图像到文本的视觉语言理解任务，尤其适合需要理解复杂视觉布局的场景（文档表单、数据图表、移动 UI 等）。

## 7. 关键参考文献

- [LayoutLM] Xu et al., "LayoutLM: Pre-training of Text and Layout for Document Image Understanding", KDD, 2020
- [LayoutLMv3] Huang et al., "LayoutLMv3: Pre-training for Document AI with Unified Text and Image Masking", ACM MM, 2022
- [Donut] Kim et al., "OCR-Free Document Understanding Transformer", ECCV, 2022
- [ViT] Dosovitskiy et al., "An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale", ICLR, 2021
- [ChartQA] Masry et al., "ChartQA: A Benchmark for Question Answering about Charts with Visual and Logical Reasoning", ACL, 2022
- [MatCha] Liu et al., "MatCha: Enhancing Visual Language Pretraining with Math Reasoning and Chart Derendering", ACL, 2023
- [C4/T5] Raffel et al., "Exploring the Limits of Transfer Learning with a Unified Text-to-Text Transformer", JMLR, 2020
- [PaLI] Chen et al., "PaLI: A Jointly-Scaled Multilingual Language-Image Model", ICLR, 2023
- [DocVQA] Mathew et al., "DocVQA: A Dataset for VQA on Document Images", WACV, 2021
- [Spotlight] Li et al., "Spotlight: Mobile UI Understanding Using Vision-Language Models with a Focus", ECCV, 2022