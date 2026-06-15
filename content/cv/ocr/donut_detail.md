### Donut: 文档理解Transformer (Document Understanding Transformer)

```yaml
id: donut
name: Donut
full_name: "文档理解Transformer (Document Understanding Transformer)"
year: "2022"
org: NAVER CLOVA
paper_url: https://arxiv.org/abs/2111.15664
category: document_ai
parent: layoutlmv3
motivation: OCR-Free直接生成结构化
```

#### 📝 一句话总结

Donut 提出 OCR-free 的文档理解 Transformer，直接把文档图像编码为视觉特征并自回归生成结构化文本，解决了 OCR 检测、识别、解析多阶段流水线误差累积和维护成本高的问题。它把文档分类、信息抽取和 DocVQA 统一成图像到序列生成任务。

#### 🎯 核心要点

- 完全去除外部 OCR：输入只需要文档图像，输出为 JSON、类别标签或问答答案等目标序列
- 架构为视觉 encoder + 文本 decoder，论文实现中使用 Swin Transformer encoder 和 Transformer/BART 式 decoder
- 训练目标是 teacher forcing 下的 next-token cross entropy，预训练学习“如何读”，微调学习“如何理解”
- 引入 SynthDoG 合成文档生成器，用多语言合成文档降低真实标注依赖
- 通过任务提示和特殊 token 将不同任务统一为结构化序列生成
- 在 RVL-CDIP、CORD、Ticket、DocVQA 等分类、信息抽取、视觉问答任务上展示 OCR-free 的速度和准确率优势

#### 🔬 深入细节

##### 核心架构图

![Donut 流水线](https://ar5iv.labs.arxiv.org/html/2111.15664/assets/x3.png)
*图：Donut 的 encoder 将文档图像映射为视觉 embedding，decoder 根据视觉 embedding 和历史 token 生成结构化输出序列。*

![Donut 训练格式](https://ar5iv.labs.arxiv.org/html/2111.15664/assets/x14.png)
*图：Donut 使用 teacher forcing 训练 decoder；推理时把上一步生成 token 作为下一步输入，直到输出结束标记。*

##### 算法伪代码

```python
# Donut 预训练/微调统一为 image-to-text
def train_donut(image, target_sequence, task_prompt):
    visual_tokens = swin_encoder(image)
    decoder_input = [task_prompt] + target_sequence[:-1]
    logits = text_decoder(decoder_input, cross_attend=visual_tokens)
    loss = cross_entropy(logits, target_sequence)  # next-token prediction
    return loss

def infer_donut(image, task_prompt):
    visual_tokens = swin_encoder(image)
    tokens = [task_prompt]
    while tokens[-1] != "<eos>" and len(tokens) < max_len:
        logits = text_decoder(tokens, cross_attend=visual_tokens)
        tokens.append(argmax(logits[-1]))
    return parse_structured_output(tokens)
```

##### 方法详解

**1. 动机与背景**

传统文档信息抽取通常分成文本检测、文本识别、版面解析和任务模型多个模块。这个 pipeline 的问题是误差会层层传递：OCR 漏检或识别错会直接成为后续模型的输入上限；不同语言、字体、低清扫描件还需要维护复杂的 OCR 子系统。

Donut 的核心观点是：文档理解可以被视为图像到结构化文本的生成问题。模型不需要先显式输出 OCR 文本框，而是直接学习从像素到目标结构的映射。

**2. 架构：视觉编码器 + 文本解码器**

视觉编码器将文档图像 \(I\) 编码为视觉 token：

$$
\mathbf{V} = \text{Encoder}(I)
$$

文本解码器自回归生成目标 token：

$$
p(\mathbf{y}|I) = \prod_{t=1}^{T} p(y_t | y_{<t}, \mathbf{V})
$$

这里的 \(\mathbf{y}\) 可以是类别字符串、JSON、键值结构或答案文本。统一的生成接口让 Donut 不需要为每个任务设计独立头部。

**3. 训练目标**

Donut 使用 teacher forcing，训练时 decoder 输入真实前缀，预测下一个 token：

$$
\mathcal{L} = -\sum_{t=1}^{T}\log p(y_t | y_{<t}, I)
$$

这个目标简单但有效。预训练阶段让模型学习文档图像中的文字读取能力；微调阶段通过任务特定序列格式，让模型学习输出结构化信息。

**4. SynthDoG 合成预训练**

真实文档图像和完整转录标注成本较高。Donut 提出 SynthDoG 生成合成文档：采样文本、字体、背景、版面模式和渲染扰动，生成多语言文档图像及其文本序列。合成数据让模型在没有 OCR 模块的情况下学习基本阅读能力。

> 💡 关键：Donut 的 OCR-free 并不意味着模型不学习 OCR；它是把 OCR 能力内化到 encoder-decoder 的参数中，并让读取和理解在同一个生成目标下联合优化。

**5. 结构化输出**

文档信息抽取任务中，目标序列被组织成 JSON-like 格式。字段名、层级关系和结束标记都作为 token 参与训练。这样模型不仅要读出文本，还要生成字段之间的结构关系，例如收据中商品名、数量、价格的分组。

**6. 与 LayoutLM 类模型的区别**

LayoutLM 依赖 OCR 文本和坐标，优势是能显式利用版面 token；Donut 只看图像，优势是避免 OCR 错误上限和流水线成本。代价是生成模型对输入分辨率敏感，小字密集页面可能漏读，且结构化输出需要良好的序列格式约束。

#### 🧪 练习题

```yaml
question: "Donut 被称为 OCR-free 的主要原因是什么？"
options:
  - "它不处理文档中的文字，只做图像分类"
  - "它不依赖外部文本检测/识别模块，而是直接从图像生成目标结构化序列"
  - "它只使用 OCR 框坐标，不使用 OCR 文本"
  - "它用 CTC 替代了 Transformer decoder"
answer: 1
explain: "Donut 输入为文档图像，输出为 JSON、类别或答案等序列，读取和理解能力都由端到端 encoder-decoder 学习，不需要外部 OCR pipeline。"
```
