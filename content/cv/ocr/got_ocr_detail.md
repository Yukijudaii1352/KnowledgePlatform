### GOT-OCR2.0: 通用OCR理论2.0 (General OCR Theory 2.0)

```yaml
id: got_ocr
name: GOT-OCR2.0
full_name: "通用OCR理论2.0 (General OCR Theory 2.0)"
year: "2024"
org: StepFun
paper_url: https://arxiv.org/abs/2409.01704
category: document_ai
parent: donut
motivation: 580M统一模型处理全类型
```

#### 📝 一句话总结

GOT-OCR2.0 提出将文本、公式、表格、图表、乐谱、分子式和几何图形等人工光学信号统一视为“characters”的 OCR-2.0 范式，并用 580M 端到端模型生成 plain 或 formatted 结果。它将传统 OCR 从“文字识别”扩展为“通用光学符号解析”。

#### 🎯 核心要点

- 提出 General OCR Theory：把人造光学信号统一纳入 OCR 范畴，包括文本、数学/分子公式、表格、图表、乐谱、几何图形等
- GOT 模型约 580M 参数，由高压缩视觉 encoder 和长上下文 decoder 构成
- 通过 prompt 控制输出格式，支持 plain OCR、formatted OCR、Markdown、TikZ、SMILES、Kern 等结构化结果
- 支持 scene/document、slice/whole-page 输入，并扩展到 dynamic resolution 与 multi-page OCR
- 支持交互式细粒度 OCR：可由坐标框或颜色提示指定区域识别
- 使用 LaTeX、Mathpix markdown-it、TikZ、Verovio、Matplotlib/Pyecharts 等渲染工具构造多类型 OCR-2.0 数据

#### 🔬 深入细节

##### 核心架构图

![GOT-OCR2.0 框架](https://arxiv.org/html/2409.01704v1/x2.png)
*图：GOT 的三阶段训练框架。先用小语言模型适配视觉 encoder，再连接 Qwen-0.5B 注入通用 OCR-2.0 知识，最后扩展细粒度能力。*

![GOT 数据引擎](https://arxiv.org/html/2409.01704v1/x3.png)
*图：GOT 使用多种渲染工具生成表格、公式、几何、乐谱、图表等训练数据，使统一模型覆盖更多“字符”类型。*

##### 算法伪代码

```python
# GOT-OCR2.0 统一 OCR 推理伪代码
def got_ocr(image_or_pages, mode="format", box=None, color=None):
    prompt = build_prompt(mode=mode, box=box, color=color)

    # dynamic resolution / multi-crop for high-resolution pages
    crops = make_crops_if_needed(image_or_pages)
    all_outputs = []
    for crop in crops:
        visual_tokens = high_compression_encoder(crop)
        text = long_context_decoder.generate(
            prompt=prompt,
            visual_context=visual_tokens,
            max_tokens=max_len,
        )
        all_outputs.append(text)

    return merge_pages_or_crops(all_outputs)
```

##### 方法详解

**1. 动机与背景**

传统 OCR-1.0 主要关注自然场景或文档中的文字识别，通常输出 plain text。但现代文档和人工视觉内容远不止文字：论文包含公式和表格，化学资料包含分子式，图表包含坐标与数值，乐谱包含音符结构。这些内容若拆成多个专用系统，工程复杂且输出格式不统一。

GOT-OCR2.0 的理论主张是把所有人工设计的光学符号统一称为 characters，并训练一个端到端模型按 prompt 输出不同结构格式。这使 OCR 从文本检测/识别任务升级为通用文档/符号解析任务。

**2. 模型结构**

GOT 由高压缩视觉 encoder 和长上下文 decoder 组成。视觉 encoder 将整页或切片图像压缩成较短视觉 token，decoder 自回归生成目标格式：

$$
p(\mathbf{y}|I, q)=\prod_{t=1}^{T}p(y_t|y_{<t}, \text{Enc}(I), q)
$$

其中 \(q\) 是任务 prompt，例如 plain OCR、format OCR、区域 OCR 或指定输出格式。高压缩 encoder 是实用性的关键，因为 OCR 页面通常分辨率高、文字密集，视觉 token 过多会让 decoder 成本不可控。

**3. 三阶段训练**

第一阶段用较小的 OPT-125M decoder 预训练视觉 encoder，使其高效适配 OCR 任务。第二阶段将视觉 encoder 接到 Qwen-0.5B decoder，并注入更广泛的 OCR-2.0 数据。第三阶段不改视觉 encoder，继续定制区域级、颜色引导、动态分辨率、多页等能力。

这种训练顺序的直觉是：先让视觉 encoder 学会读，再让语言 decoder 学会把读到的内容生成成目标结构，最后用 prompt 和特定数据扩展交互式能力。

**4. 数据引擎与输出格式**

GOT 的覆盖范围主要来自数据构造。论文使用多种渲染工具生成带标准答案的训练对：LaTeX/Markdown 用于表格和公式，TikZ 用于几何图形，Verovio 用于乐谱，Matplotlib/Pyecharts 用于图表。模型输出可由 prompt 控制为 Markdown、TikZ、SMILES、Kern 等格式。

> 💡 关键：GOT 的统一性不只是多任务训练，而是把不同 OCR 目标都转成“图像 + prompt -> 结构化文本”的生成问题。

**5. 细粒度与高分辨率**

GOT 支持两类交互式 OCR：坐标框指定区域、颜色指定区域。对于高分辨率或双页文档，模型使用 dynamic resolution/multi-crop，将页面切片识别后再合并输出；对于多页文档，则将多个页面结果组织为长上下文输出。

**6. 与 Donut/Pix2Struct 的区别**

Donut 强调 OCR-free 文档理解，Pix2Struct 强调截图到结构的视觉语言预训练；GOT 更进一步把 OCR 的对象范围扩展到所有人工光学符号，并围绕格式化输出、区域交互、高分辨率页面和多页文档做工程化扩展。它仍是生成式模型，因此格式稳定性和复杂长页的读序合并是关键挑战。

#### 🧪 练习题

```yaml
question: "GOT-OCR2.0 中 OCR-2.0 相比传统 OCR-1.0 的核心扩展是什么？"
options:
  - "只识别英文和中文纯文本"
  - "把公式、表格、图表、乐谱、分子式等人工光学信号统一纳入 OCR，并生成可控结构化格式"
  - "完全取消视觉编码器，只用语言模型补全文字"
  - "只做文本检测，不做识别"
answer: 1
explain: "GOT 将多种人工视觉符号都视为 characters，并通过 prompt 生成 Markdown、TikZ、SMILES、Kern 等格式化结果。"
```
