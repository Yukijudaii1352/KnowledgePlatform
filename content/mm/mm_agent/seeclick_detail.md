### SeeClick
```yaml
id: seeclick
name: SeeClick
full_name: 视觉点击 (SeeClick)
year: '2024'
org: HKUST
paper_url: https://arxiv.org/abs/2401.10935
category: gui
parent: cogagent
motivation: 强化视觉定位对齐指令与像素坐标
```

#### 📝 一句话总结
SeeClick 把 GUI agent 的核心能力明确为“根据指令在截图上定位可操作元素”，通过 GUI grounding 预训练让 LVLM 直接输出点击坐标，从而减少对 HTML、DOM 或 Android ViewHierarchy 的依赖。

#### 🎯 核心要点
- **核心命题**：视觉 GUI agent 的瓶颈不是语言规划，而是能否把“点击搜索按钮”准确落到屏幕元素位置。
- **纯视觉输入**：SeeClick 只依赖截图执行点击、输入等低层操作，不要求 HTML、DOM、XML 或 ViewHierarchy。
- **坐标作为语言生成**：不额外引入坐标 token vocabulary，而是让模型生成自然语言形式的坐标，如 `click (0.49, 0.40)`。
- **自动构造 grounding 数据**：从网页 HTML 自动收集可见文本元素和带 title 的元素，配合移动端 widget caption/grounding 数据，形成约百万级训练集。
- **ScreenSpot 基准**：提出覆盖 mobile、desktop、web 的 GUI grounding benchmark，验证 grounding 能力与下游 MiniWob、AITW、Mind2Web 表现相关。

#### 🔬 深入细节
论文：*SeeClick: Harnessing GUI Grounding for Advanced Visual GUI Agents*。核心图 Figure 2 展示了 GUI grounding 预训练、ScreenSpot 评测和下游 GUI agent 的关系，公开图源：https://ar5iv.labs.arxiv.org/html/2401.10935/assets/x3.png

SeeClick 对 GUI agent 的抽象很直接：给定截图 \(s\) 和元素描述/任务指令 \(x\)，模型预测目标位置 \(y\)，也就是估计
\[
p(y\mid s,x).
\]
这里 \(y\) 可以是点坐标或 bounding box。论文强调，很多文本式 agent 先从 HTML 或 DOM 中筛候选元素，再让 LLM 选择；但桌面软件、canvas、iframe、移动 App 或复杂网页并不总有统一可靠的结构化文本。视觉 agent 若能直接定位，就能跨平台复用。

坐标输出采用语言生成格式，而不是新增 1000 个离散坐标 token。训练样本可以写成问题：“In the UI, where should I click if I want to ...?”，目标回答是类似 `click (0.49, 0.40)` 的归一化坐标。优化仍是自回归交叉熵：
\[
\mathcal{L}_{\mathrm{coord}}
=-\sum_k \log p_\theta(y_k\mid y_{<k},s,x).
\]
这种做法复用 LVLM 的生成接口，也方便和下游动作格式统一，但对数值精度和屏幕缩放一致性提出了要求。

数据构造是 SeeClick 的关键工程。Web 数据从 Common Crawl 抽取约 30 万网页，渲染截图后从 HTML 中收集两类元素：可见文本元素，以及具有 `title` 属性、hover 时有描述的元素。前者覆盖文本按钮/链接，后者帮助覆盖图标类控件。除了 grounding \(p(y\mid s,x)\)，还加入反向 OCR/描述任务 \(p(x\mid s,y)\)，让模型从坐标区域读出文本或功能。

Mobile 数据来自 widget captioning、RICO 等公开 UI 数据。widget captioning 原本给元素写描述，SeeClick 将其反过来：描述变成指令，元素位置变成 grounding 目标；再加入移动 UI summarization 来保持整体界面理解。为了不损失通用视觉语言能力，训练还混入 LLaVA 风格的通用 instruction-following 数据。最终混合生成约 1M 数据，对 Qwen-VL 进行 continual pre-training，并用 LoRA 同时微调视觉编码器和 LLM。

ScreenSpot 是论文为 GUI grounding 单独建立的评测集，覆盖 iOS、Android、macOS、Windows 和网页，包含 600+ 截图、1200+ 指令，同时区分文本元素和 icon/widget。评价时只看模型预测坐标是否落入目标元素框：
\[
\mathrm{ClickAcc}
=\frac{1}{N}\sum_{i=1}^N \mathbf{1}\{(\hat x_i,\hat y_i)\in B_i^\star\}.
\]
实验显示，通用 LVLM 即使有自然图像 grounding 能力，在 GUI 上也常定位失败；经过 GUI grounding 预训练后，SeeClick 在 ScreenSpot 和 MiniWob/AITW/Mind2Web 下游任务上都明显优于同底座基线，且 grounding 提升与 agent 表现提升呈正相关。

```text
Algorithm: SeeClick grounding-centric GUI agent
Pre-training:
1. Render web/mobile GUI screenshots.
2. Extract element descriptions and target boxes/points.
3. Create prompts asking where to click or what text appears at a location.
4. Fine-tune Qwen-VL with LoRA to generate normalized coordinates/actions.

Downstream action:
1. Observe screenshot and receive user task plus optional previous actions.
2. Ask the model for the next operation and target coordinate.
3. Parse generated action, e.g. click (x, y) or type text.
4. Execute on the GUI environment.
5. Repeat until the task is complete.
```

SeeClick 与 CogAgent 的关系可以理解为“更聚焦”。CogAgent 通过高分辨率架构提升读屏能力，SeeClick 则把训练信号集中到 GUI grounding，强调点击坐标是否准确。它的不足也相应明显：纯坐标策略在极复杂网页上仍比 HTML 候选选择困难，且多步任务还需要外部执行环境、记忆和错误恢复机制；但它证明了 grounding 是视觉 GUI agent 的基础能力，而不是附属评测。

#### 🧪 练习题
1. 为什么 GUI grounding 在自然图像 grounding 已经较强的 LVLM 上仍然困难？
2. 用坐标点击替代 HTML 元素选择，会带来哪些跨平台优势和哪些精度风险？
