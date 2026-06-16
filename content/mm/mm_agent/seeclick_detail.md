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
SeeClick 将 GUI agent 的关键能力定义为“根据语言指令在截图中定位可操作元素”，通过大规模 GUI grounding 预训练让 LVLM 直接生成点击坐标，从而减少对 HTML、DOM、XML 或 ViewHierarchy 的依赖。

#### 🎯 核心要点
- **GUI grounding 中心化**：把“元素描述到屏幕位置”的映射作为视觉 GUI agent 的基础能力。
- **纯截图输入**：下游执行主要依赖屏幕截图，不要求结构化网页文本或移动端控件树。
- **坐标自然语言生成**：用 `click (0.49, 0.40)` 这类归一化坐标文本训练模型，不额外扩展 1000-bin 坐标词表。
- **自动构造训练数据**：从约 30 万网页和移动 UI 数据中提取文本元素、title 元素、widget caption 与 grounding 目标，形成约 1M 混合数据。
- **ScreenSpot 基准**：构建覆盖 mobile、desktop、web 的 GUI grounding benchmark，并验证 grounding 提升与 MiniWob、AITW、Mind2Web 下游表现相关。

#### 🔬 深入细节

##### 框架总览

![SeeClick GUI grounding 与下游 agent 框架](https://ar5iv.labs.arxiv.org/html/2401.10935/assets/x3.png)
*图：SeeClick 先通过 GUI grounding 预训练学习从指令到坐标的映射，再把该能力迁移到 MiniWob、AITW、Mind2Web 等 GUI agent 任务。*

##### 算法流程

```python
# SeeClick 的 grounding 预训练与执行流程
def build_grounding_sample(screenshot, element):
    instruction = element.text or element.title or element.caption
    target = normalize(center(element.bounding_box), screenshot.size)
    prompt = f"In the UI, where should I click if I want to {instruction}?"
    answer = f"click ({target.x:.2f}, {target.y:.2f})"
    return prompt, screenshot, answer

def seeclick_step(task, screenshot, history):
    prompt = compose_action_prompt(task, history)
    action_text = lvlm_generate(screenshot, prompt)
    action, x, y = parse_action_and_coordinate(action_text)
    execute(action, denormalize((x, y), screenshot.size))
```

SeeClick 的核心判断是：许多 GUI agent 的失败并不是因为不会规划，而是因为无法把“点击登录按钮”“打开设置图标”这类语言目标落到正确像素位置。传统 web agent 通常先读取 HTML/DOM，把元素转成文本候选，再由 LLM 选择候选编号；这种方法在网页上有效，但在桌面软件、canvas、iframe、移动 App、游戏界面或结构树缺失的场景中会失效。SeeClick 因此把能力抽象为
$$
p_\theta(y\mid s,x),
$$
其中 \(s\) 是截图，\(x\) 是元素描述或任务指令，\(y\) 是点击点或边界框。

坐标输出被设计成普通语言生成任务。论文没有新增离散坐标 token，而是让模型直接生成类似 `click (0.49, 0.40)` 的文本，使用常规自回归交叉熵优化：
$$
\mathcal{L}_{\mathrm{coord}}=-\sum_{k=1}^{K}\log p_\theta(y_k\mid y_{<k},s,x).
$$
这种做法的优势是训练、推理和动作解析都能复用现有 LVLM 接口；代价是数值格式、归一化尺度和小数精度必须稳定，否则一个坐标字符错误就可能使点击偏离目标。

训练数据构造是 SeeClick 的主要工程贡献。Web 数据来自 Common Crawl 渲染得到的约 30 万网页截图，并从 HTML 中抽取两类元素：一类是带可见文本的元素，覆盖按钮、链接、表单标签；另一类是带 `title` 属性的元素，用来覆盖图标控件和 hover 描述。对每个元素，文本或 title 作为 instruction，元素位置作为 grounding 目标；同时加入反向任务 \(p_\theta(x\mid s,y)\)，让模型根据区域预测文本或功能，强化局部读屏能力。

移动端数据则重组自 widget captioning、RICO 等 UI 数据。原始 widget captioning 是“给控件写描述”，SeeClick 将其反过来变成“给描述找控件”；再加入移动 UI summarization 保持整体界面理解。为了不让模型遗忘通用视觉语言能力，训练还混入 LLaVA 风格的通用 instruction-following 数据。最终约 1M 样本用于对 Qwen-VL 做 continual pre-training，并用 LoRA 调整视觉编码器和语言模型。

ScreenSpot 用来单独测量 GUI grounding，而不是把定位错误混在多步 agent 成败里。它覆盖 iOS、Android、macOS、Windows 和网页，目标元素分为文本类和 icon/widget 类。评测指标可写为
$$
\mathrm{ClickAcc}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\{(\hat{x}_i,\hat{y}_i)\in B_i^\star\},
$$
即预测点击点是否落入目标框。论文实验显示，通用 LVLM 即使声称具备自然图像 grounding，在 GUI 上也经常失败；经过 GUI grounding 预训练后，SeeClick 的 ScreenSpot 准确率和 MiniWob、AITW、Mind2Web 下游任务表现同步提高。

与 CogAgent 相比，SeeClick 更聚焦于“点击哪里”。CogAgent 通过高分辨率结构提升读屏能力，SeeClick 则把训练信号集中在指令和像素坐标对齐上。它仍需要外部环境循环、历史记忆和错误恢复来完成长任务，但证明了 GUI grounding 是纯视觉 agent 的底座能力，而不是一个附属评测项。

> ⚠️ 注意：SeeClick 的跨平台优势来自不依赖 DOM，但它也把错误集中到坐标精度上；界面缩放、滚动、遮挡和相邻小控件都会放大定位误差。

#### 🧪 练习题
```yaml
question: "SeeClick 为什么强调 GUI grounding 预训练？"
options:
  - "因为它希望完全绕过截图，只使用网页 HTML"
  - "因为多步 GUI 任务常因目标元素定位错误失败，grounding 能把指令对齐到像素坐标"
  - "因为 grounding 可以替代所有任务规划和历史记忆"
  - "因为 ScreenSpot 只评测自然图像物体检测"
answer: 1
explain: "SeeClick 认为视觉 GUI agent 的基础瓶颈是从语言描述定位到屏幕元素。GUI grounding 预训练直接优化这一映射，并提升下游点击和操作任务表现。"
```
