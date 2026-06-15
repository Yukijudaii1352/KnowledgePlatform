### UGround

```yaml
id: uground
name: UGround
full_name: "通用定位 (Universal Grounding)"
year: "2025"
org: "ByteDance"
paper_url: "https://arxiv.org/abs/2410.03243"
category: "gui"
parent: "seeclick"
motivation: "跨平台GUI元素通用视觉定位框架"
```

#### 📝 一句话总结

UGround 提出通用 GUI 视觉定位模型，把自然语言描述的界面元素直接映射到屏幕像素坐标，解决 GUI Agent 依赖 HTML、Accessibility Tree 或候选框列表才能点击的问题。它配合 SeeAct-V 框架，让 Agent 只看截图、只执行像素级操作，也能跨 Web、桌面和移动平台完成定位。

#### 🎯 核心要点

- **视觉优先的 GUI Agent 形态**：只使用截图作为环境观察，不依赖 HTML、a11y tree、OCR 候选列表或预标注元素
- **SeeAct-V 两段式框架**：MLLM 先根据任务生成 textual plan / referring expression，UGround 再把该描述定位为屏幕坐标
- **大规模 GUI Grounding 数据**：构建约 10M GUI 元素、1.3M 截图的训练集，主体来自 Web 合成数据并补充 Android 开源数据
- **三类 referring expression**：覆盖视觉描述、位置描述、功能描述，以及多种组合式描述
- **基于 LLaVA-NeXT 的高分辨率定位模型**：采用 AnyRes 风格的高分辨率切片，输出绝对像素坐标而非归一化框
- **跨平台评测**：覆盖 ScreenSpot、Multimodal-Mind2Web、AndroidControl、OmniACT、Mind2Web-Live、AndroidWorld 等 grounding、offline agent、online agent 场景

#### 🔬 深入细节

##### 框架总览

![UGround / SeeAct-V 框架示意图](https://arxiv.org/html/2410.05243v3/x2.png)
*图：SeeAct-V 使用截图作为唯一环境观察，MLLM 负责规划文本动作，UGround 将动作中提到的 GUI 元素定位成像素坐标。*

##### 算法流程

```python
# UGround + SeeAct-V 推理流程
def seeact_v_step(task, screenshot, history):
    # 1. 规划模型只看截图和任务，生成下一步文字计划
    plan = mllm_planner.generate(
        instruction=task,
        image=screenshot,
        history=history,
    )
    # 例：plan = "Click the blue Submit button at the bottom right"

    # 2. 将计划中的目标元素转成 referring expression
    ref_expr = extract_target_expression(plan)

    # 3. UGround 输出元素中心像素坐标
    x, y = uground.predict_coordinate(
        image=screenshot,
        description=ref_expr,
    )

    # 4. 执行像素级 GUI 操作
    action = parse_operation(plan, coordinate=(x, y))
    execute(action)
    return action

# UGround 训练目标
for screenshot, ref_expr, target_xy in grounding_dataset:
    pred_tokens = model(screenshot, ref_expr)
    loss = cross_entropy(pred_tokens, tokenize(target_xy))
    update(loss)
```

##### 方法细节

**1. 动机与背景**

早期 GUI Agent 常把网页 HTML、移动端 accessibility tree 或检测出来的候选框交给 LLM，让模型在一个短列表里选元素。这种做法工程上有效，但并不符合真实用户的交互方式：用户看到的是屏幕渲染结果，并通过鼠标或触屏点击像素位置。HTML 和 a11y tree 还会带来噪声、缺失标注、跨平台不一致以及大量 token 成本。

UGround 的核心判断是：如果有一个足够强的视觉定位模型能从截图中找到“搜索框右侧的蓝色按钮”“商品卡片里的爱心图标”这类元素，那么 GUI Agent 就可以退化成一个更通用的两模块系统：规划模型负责“要做什么”，grounding 模型负责“点哪里”。

**2. SeeAct-V：把规划和定位解耦**

SeeAct-V 每一步只接收截图、任务指令和历史动作。MLLM 不需要直接输出坐标，而是生成文本计划或目标元素描述；UGround 接收截图 \(I\) 和元素描述 \(r\)，输出像素坐标 \(c=(x,y)\)：

$$
p_\theta(c \mid I, r)=\prod_{t=1}^{T}p_\theta(y_t \mid y_{<t}, I, r)
$$

这里 \(y_t\) 是坐标字符串的 token，例如 `"(1344, 652)"` 中的数字 token。训练时使用标准自回归交叉熵：

$$
\mathcal{L}_{ground}=-\sum_{t=1}^{T}\log p_\theta(y_t^\* \mid y_{<t}^\*, I, r)
$$

这种“用语言生成坐标”的方式让定位任务直接复用多模态大模型的生成接口，不需要额外设计框回归头。

**3. 数据构造：从网页合成跨平台 grounding**

论文的关键工程贡献是数据。网页天然同时拥有 DOM、渲染截图和元素边界框，因此可以自动获得元素与像素区域的对应关系。UGround 先从 Common Crawl 等网页来源收集截图和元素元数据，再为每个元素合成多样化 referring expression。

表达方式被分成三类：视觉表达关注文字、颜色、形状、图标等可见属性；位置表达关注绝对位置和相对位置；功能表达关注按钮或控件的用途，例如“打开购物车”“提交表单”。合成时既使用规则，也使用 LLaVA-NeXT 生成更自然的视觉/功能描述，再用 Llama-3 将表达压缩得更像用户或规划模型会说的话。最终训练集约 10M 元素、1.3M 截图，其中 Web-Hybrid 是主体，并补充 Web-Direct 与 Android 数据集提升跨平台泛化。

**4. 模型设计：高分辨率 GUI 截图是重点**

UGround 基于 LLaVA-NeXT 7B 做视觉定位适配。普通自然图像模型常在较低分辨率上训练，但 GUI 元素高度依赖小文字、小图标和布局关系，因此论文扩大 AnyRes 支持的输入分辨率，将大截图切成多个 CLIP@224 视觉切片，并用长上下文语言模型接收这些视觉 token。

模型输出的是绝对像素坐标，而不是归一化坐标或离散候选 ID。这一点对 GUI Agent 很重要：Agent 最终要执行鼠标点击或触屏点击，绝对坐标可以直接落到操作系统或浏览器环境中。

**5. 与 SeeClick / HTML-based Agent 的区别**

SeeClick 已经证明 GUI grounding 可以通过视觉模型完成，但 UGround 进一步强调“通用性”：训练数据更大，表达类型更丰富，评测覆盖 Web、桌面、移动三类平台。与 Mind2Web、WebArena 这类 HTML/a11y tree Agent 相比，UGround 不要求环境暴露结构化后端，也不要求先生成候选元素列表。

> 💡 关键：UGround 的价值不只是提高单步点击准确率，而是把 GUI Agent 的接口统一成“截图 + 文本描述 → 像素坐标”，从而减少平台依赖。

#### 🧪 练习题

```yaml
question: "UGround 在 SeeAct-V 中承担的核心职责是什么？"
options:
  - "根据用户任务生成完整网页操作计划"
  - "把规划模型产生的元素描述定位为屏幕像素坐标"
  - "从 HTML 中筛选候选 DOM 元素"
  - "训练奖励模型评价 Agent 是否完成任务"
answer: 1
explain: "SeeAct-V 中 MLLM 负责规划，UGround 负责 grounding：输入截图和 referring expression，输出可执行的像素坐标。"
```
