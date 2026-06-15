### GLM-OCR: 通用语言模型OCR (General Language Model OCR)

```yaml
id: glm_ocr
name: GLM-OCR
full_name: "通用语言模型OCR (General Language Model OCR)"
year: "2026"
org: Zhipu AI
paper_url: https://arxiv.org/abs/2601.xxxxx
category: document_ai
parent: got_ocr
motivation: 专用VLM文档解析领跑基准
```

#### 📝 一句话总结

GLM-OCR 提出 0.9B 参数的专用多模态 OCR 模型，用 CogViT 视觉编码器、GLM 语言解码器、Multi-Token Prediction 和两阶段版面解析流水线，在文档解析、表格、公式和 KIE 上追求高精度与高吞吐的平衡。给定 metadata 中的 paper_url 是占位符，实际公开技术报告为 `https://arxiv.org/abs/2603.10910`。

#### 🎯 核心要点

- 模型规模约 0.9B：0.4B CogViT visual encoder + 0.5B GLM language decoder
- 使用 lightweight cross-modal connector 和 token downsampling，将视觉特征高效接入语言解码器
- 引入 Multi-Token Prediction (MTP)，一次解码预测多个 token，提高确定性 OCR 任务的生成吞吐
- 系统采用两阶段 pipeline：PP-DocLayout-V3 做版面分析，GLM-OCR 对区域并行识别并生成 Markdown/JSON
- 训练包含多阶段 SFT、MTP loss 和稳定的全任务强化学习，用结构奖励提升格式和任务可靠性
- 在 OmniDocBench v1.5 报告 overall 94.62，并在表格解析、公式转写、文档解析、KIE 等任务上表现强

#### 🔬 深入细节

##### 核心架构图

![GLM-OCR 架构与工作流](https://arxiv.org/html/2603.10910v1/x3.png)
*图：GLM-OCR 支持文档解析和 KIE 两类任务；文档解析模式先做 layout detection 和 region cropping，再并行执行区域级识别并输出 Markdown/JSON。*

![GLM-OCR OmniDocBench 结果](https://arxiv.org/html/2603.10910v1/x2.png)
*图：GLM-OCR 在 OmniDocBench v1.5 上的整体表现，报告中强调 0.9B 专用模型对大规模通用 VLM 的效率优势。*

##### 算法伪代码

```python
# GLM-OCR 文档解析系统伪代码
def parse_document(page_image_or_pdf):
    # Stage 1: layout-aware preprocessing
    regions = pp_doclayout_v3_detect(page_image_or_pdf)
    crops = crop_regions(page_image_or_pdf, regions)

    # Stage 2: parallel region recognition
    outputs = parallel_map(glm_ocr_region_recognize, crops)
    markdown = assemble_reading_order(outputs, regions)
    return markdown

def glm_ocr_region_recognize(crop, prompt="<ocr>"):
    v = cogvit_encoder(crop)
    z = cross_modal_connector_downsample(v)
    tokens = []
    while not stop(tokens):
        # MTP predicts several future tokens per decoding step
        next_tokens = glm_decoder.mtp_generate(prompt, z, tokens)
        tokens.extend(accept_tokens(next_tokens))
    return structured_parse(tokens)
```

##### 方法详解

**1. 动机与背景**

GOT-OCR2.0、Donut、Pix2Struct 等模型证明了生成式 OCR/文档解析可行，但生产场景还面临两个硬约束：一是文档解析需要稳定结构化输出和高吞吐，二是超大通用 VLM 成本高、延迟大，不适合大批量 PDF/票据/表格处理。

GLM-OCR 的设计更工程化：不追求大模型通用能力，而是用小而专的 VLM 处理 OCR，并配合版面检测 pipeline 把复杂页面拆成可并行识别的区域。

**2. 模型结构**

GLM-OCR 基于 GLM-V encoder-decoder 架构。视觉侧是 CogViT encoder，语言侧是 GLM-0.5B decoder，中间通过轻量 connector 连接并下采样视觉 token：

$$
\mathbf{z} = \text{Connector}(\text{CogViT}(I))
$$

随后 decoder 生成目标序列：

$$
p(\mathbf{y}|I,q)=\prod_t p(y_t|y_{<t}, \mathbf{z}, q)
$$

这种结构让模型保持生成式灵活性，同时把参数量控制在约 0.9B，便于本地部署和高并发服务。

**3. Multi-Token Prediction**

标准自回归 decoder 每步只预测一个 token，OCR 输出通常长且确定，逐 token 解码会成为吞吐瓶颈。GLM-OCR 引入 MTP：在同一隐藏状态上预测多个未来 token，并通过共享参数控制额外开销。简化表示为：

$$
\mathcal{L}_{MTP} = \sum_{k=1}^{K} \lambda_k \cdot
\text{CE}(p(y_{t+k}|y_{\le t}, I), y_{t+k})
$$

推理时可以一次接受多个高置信 token，减少 decoder 调用次数。报告中强调这对确定性 OCR 任务尤其适合，因为输出空间比开放式对话更可预测。

**4. 两阶段系统 pipeline**

文档解析模式先由 PP-DocLayout-V3 做版面分析，定位标题、正文、表格、公式、图片等区域；随后 GLM-OCR 对每个 crop 并行识别，最后按阅读顺序组装 Markdown。KIE 模式则可根据用户提供的 JSON schema 直接从视觉输入抽取结构化字段。

> 💡 关键：GLM-OCR 不是完全端到端整页模型。它把 layout detection 外置为系统阶段，换取高分辨率复杂文档上的稳定读序、并行吞吐和格式控制。

**5. 训练与奖励**

公开资料描述 GLM-OCR 使用多阶段训练 recipe：先构建基础识别能力，再加入结构化文档解析、KIE、表格和公式等任务；MTP loss 提升解码效率；全任务强化学习通过格式、字段、表格结构等 reward 约束输出可靠性。对于 OCR，这类 reward 比开放聊天更容易定义，例如 JSON schema 合法性、表格结构匹配、公式语法正确性。

**6. 结果与局限**

技术报告称 GLM-OCR 在 OmniDocBench v1.5 overall 达到 94.62，并在表格 TEDS、文档解析、公式转写等指标上处于领先区间；吞吐对比中报告 PDF 输入约 1.86 pages/s。局限也来自两阶段架构：layout detector 出错会传递给识别阶段，跨页依赖、复杂多栏读序和极端低清/畸变文档仍可能失败。

#### 🧪 练习题

```yaml
question: "GLM-OCR 引入 Multi-Token Prediction (MTP) 的主要目的是什么？"
options:
  - "让视觉编码器直接输出 PDF 文件"
  - "一次预测多个未来 token，减少自回归 OCR 解码步数并提升吞吐"
  - "完全替代版面分析模型"
  - "把所有 OCR 任务改成闭集分类"
answer: 1
explain: "OCR 输出通常较确定且序列较长，MTP 通过多 token 预测降低逐 token 解码开销，在保持小模型规模的同时提升推理速度。"
```
