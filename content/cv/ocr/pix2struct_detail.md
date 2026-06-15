### Pix2Struct: 像素到结构 (Pix2Struct)

```yaml
id: pix2struct
name: Pix2Struct
full_name: "像素到结构 (Pix2Struct)"
year: "2023"
org: Google Research
paper_url: https://arxiv.org/abs/2210.03347
category: document_ai
parent: donut
motivation: 截图解析预训练VLU
```

#### 📝 一句话总结

Pix2Struct 提出用网页截图到简化 HTML 的 screenshot parsing 作为预训练任务，解决了视觉化语言理解长期依赖领域专用 OCR、表格解析或 UI 结构工具的问题。它把文档、图表、UI、信息图等任务统一为纯视觉输入到文本结构输出的 encoder-decoder 模型。

#### 🎯 核心要点

- 预训练目标为 masked screenshot parsing：输入被遮挡的网页截图，输出遮挡区域对应的简化 HTML
- 仅使用像素输入，不依赖 OCR 文本、DOM 树、Android view hierarchy 或表格解析器等外部通道
- 采用 image-to-text Transformer 架构，视觉 encoder 编码 patch 序列，文本 decoder 生成 HTML、答案或描述
- 提出 variable-resolution input，在固定 patch budget 下保留原始纵横比，避免文档/表格/网页被拉伸
- VQA 类任务将问题直接渲染到图像顶部，让模型通过同一视觉通道读取问题和内容
- 在 documents、illustrations、UIs、natural images 四类 9 个任务中，单任务模型在 6 个任务达到当时 SOTA

#### 🔬 深入细节

##### 核心架构图

![Pix2Struct 预训练示例](https://ar5iv.labs.arxiv.org/html/2210.03347/assets/figures/pretraining_example.png)
*图：Pix2Struct 的预训练样本由网页截图和目标 HTML 片段构成，模型需要根据像素恢复结构化文本。*

![Pix2Struct 可变分辨率输入](https://ar5iv.labs.arxiv.org/html/2210.03347/assets/x1.png)
*图：variable-resolution input 在固定 patch 数预算下保留图像纵横比，相比固定缩放或 padding 更适合长文档和宽表格。*

##### 算法伪代码

```python
# Pix2Struct screenshot parsing 预训练伪代码
def pretrain_pix2struct(web_page):
    screenshot, html = render_page_and_extract_simplified_html(web_page)
    region = sample_mask_region(screenshot)
    masked_screenshot = apply_visual_mask(screenshot, region)
    target = html_for_region(html, region)

    patches = variable_resolution_patchify(masked_screenshot, patch_budget=N)
    visual_tokens = image_encoder(patches)
    logits = text_decoder(prefix=target[:-1], cross_attend=visual_tokens)
    loss = cross_entropy(logits, target)
    return loss

def finetune_vqa(image, question, answer):
    prompt_image = render_question_as_header(image, question)
    patches = variable_resolution_patchify(prompt_image, patch_budget=N)
    return seq2seq_loss(image_encoder(patches), answer)
```

##### 方法详解

**1. 动机与背景**

视觉化语言理解覆盖文档问答、表格理解、图表推理、UI 描述和自然图像文字问答。过去方法通常为每个领域设计专用输入：文档用 OCR 文本和布局，图表用图表解析器，UI 用 view hierarchy。这些方案难共享架构和数据，而且外部工具错误会限制上限。

Pix2Struct 借鉴 Donut 的 OCR-free 方向，但把预训练数据源从合成/文档扩展到整个 Web。网页天然具有“像素渲染”和“HTML 结构”两种视图，因此可以大规模构造从截图到结构的监督信号。

**2. Screenshot Parsing 预训练**

预训练时，模型看到的是被遮挡的网页截图 \(I_{\text{mask}}\)，目标是生成对应区域的简化 HTML 序列 \(y\)：

$$
p(y|I_{\text{mask}})=\prod_{t=1}^{T}p(y_t|y_{<t}, I_{\text{mask}})
$$

损失为标准自回归交叉熵：

$$
\mathcal{L}=-\sum_{t=1}^{T}\log p(y_t|y_{<t},I_{\text{mask}})
$$

HTML 目标不仅包含文字，还包含结构标签。模型因此学习到表格、列表、按钮、段落、布局层级等视觉结构，而不是只学习识别字符。

**3. 纯视觉输入**

Pix2Struct 刻意不把 OCR 文本、DOM 节点或布局框作为额外输入。即使在 DocVQA、ChartQA 等任务中，问题也被渲染到图像顶部作为像素。这个设计保持预训练和微调形式一致：所有信息都经视觉 encoder 进入模型。

> 💡 关键：Pix2Struct 的“结构”不是人工定义的某个领域 schema，而是 HTML 这种 Web 原生监督。它让模型从网页截图中学习通用视觉语言结构。

**4. Variable-Resolution Input**

固定分辨率会拉伸长文档、宽表格或手机 UI，padding 又浪费 patch budget。Pix2Struct 在固定最大 patch 数下，根据原始图像纵横比选择 patch 网格尺寸，尽量保留有效像素：

$$
N_h \times N_w \leq N_{\max}, \quad \frac{N_w}{N_h} \approx \frac{W}{H}
$$

这样同一个模型可以处理不同宽高比输入，不需要为每个任务重建位置参数或改网络结构。

**5. 微调与多任务**

下游任务都被转成 image-to-text：DocVQA 输出答案，ChartQA 输出数值/文本答案，Screen2Words 输出 UI 描述，OCR-VQA 输出自然语言答案。论文还提出课程学习策略，将预训练和微调信号组合到单一模型中，使一个模型在多任务上接近或超过任务专用模型。

**6. 与 Donut 的区别**

Donut 主要面向文档理解，并用 SynthDoG/IIT-CDIP 等数据学习 OCR-free 文档读取。Pix2Struct 把预训练目标扩展到网页截图解析，覆盖 UI、表格、图文混排和文档等更广泛的 visually-situated language。它更强调跨领域统一，而不是只优化文档 OCR-free pipeline。

#### 🧪 练习题

```yaml
question: "Pix2Struct 使用网页截图到 HTML 的预训练任务，核心收益是什么？"
options:
  - "让模型只学习网页分类，不再需要文本 decoder"
  - "利用 Web 中像素渲染与 HTML 结构的天然对应关系，学习跨文档、UI、图表等领域的视觉语言结构"
  - "把所有输入先转换成 OCR token，提升 OCR 召回率"
  - "用固定分辨率强制统一所有任务的图像比例"
answer: 1
explain: "网页提供大规模截图和结构化 HTML 监督，Pix2Struct 通过 image-to-text 学到通用结构解析能力，并保持纯视觉输入。"
```
