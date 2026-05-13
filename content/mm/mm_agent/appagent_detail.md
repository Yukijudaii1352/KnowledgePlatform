### AppAgent

```yaml
id: appagent
name: AppAgent
full_name: "AppAgent: Multimodal Agents as Smartphone Users"
year: "2023"
org: "Tencent"
paper_url: "https://arxiv.org/abs/2312.13771"
category: "mm_agent"
parent: "—"
motivation: "自主学习App操作"
```

#### 📝 一句话总结

AppAgent 提出了一种基于多模态大语言模型（GPT-4V）的智能手机应用操控框架，通过**探索—部署**两阶段策略让 Agent 自主学习 GUI 元素功能并生成操作文档，在无需访问系统后端的前提下，以类人方式完成多种 App 任务。

#### 🎯 核心要点

- **GUI 级交互**：仅通过屏幕截图 + XML 布局信息感知 UI，无需访问 App 后端代码或系统 API
- **简化动作空间**：定义 6 种高层动作（Tap、Long Press、Swipe、Text、Back、Exit），以 UI 元素编号替代原始坐标，大幅降低 LLM 操作难度
- **两阶段框架**：探索阶段（Exploration）自动试错或观看人类演示，生成 UI 元素功能文档；部署阶段（Deployment）利用文档辅助决策
- **两种探索方式**：(a) 自主交互探索——Agent 自行试错，对比操作前后截图总结功能；(b) 观看人类演示——从录制的操作视频中学习，效率更高
- **文档驱动决策**：部署时根据当前页面 UI 元素动态检索已生成的功能文档，作为 Agent 的参考知识
- **实验覆盖 10 款主流 App**（Google Maps、Twitter、Telegram、YouTube、Spotify 等），成功率从基线 2.2% 提升至自主探索 73.3%、演示观看 84.4%，接近人工文档的 95.6%

#### 🔬 深入细节

##### 框架总览

![AppAgent 框架示意图](https://ar5iv.labs.arxiv.org/html/2312.13771/assets/x2.png)
*图：AppAgent 整体框架。左侧为探索阶段（自主交互 / 观看演示），右侧为部署阶段。探索阶段生成的 UI 元素功能文档在部署时被动态检索，辅助 Agent 做出操作决策。*

##### 算法流程

```
# === 探索阶段（Autonomous Exploration）===
Input: app, task_description, max_steps
doc_store = {}   # UI 元素功能文档库

for step in range(max_steps):
    screenshot_before = capture_screen()
    xml_tree = get_xml_layout()
    ui_elements = parse_and_number(xml_tree)  # 标注编号到截图上
    
    # LLM 决策：选择动作
    action = LLM_decide(screenshot_before, ui_elements, task_description)
    execute(action)
    
    screenshot_after = capture_screen()
    
    # LLM 分析：对比前后截图，总结被操作元素的功能
    element_function = LLM_analyze(screenshot_before, screenshot_after, action)
    doc_store[element_id] = element_function
    
    # 若进入无关页面，执行 Back() 返回
    if LLM_judge_irrelevant(screenshot_after, task_description):
        execute(Back())

# === 部署阶段（Deployment）===
Input: app, user_task, doc_store, max_steps=10
history = []

for step in range(max_steps):
    screenshot = capture_screen()
    xml_tree = get_xml_layout()
    ui_elements = parse_and_number(xml_tree)
    
    # 动态检索当前页面 UI 元素对应的文档
    relevant_docs = retrieve(doc_store, ui_elements)
    
    # LLM 推理：观察 → 思考 → 行动 → 总结
    observation = LLM_observe(screenshot, ui_elements, relevant_docs)
    thought = LLM_think(observation, user_task, history)
    action = LLM_act(thought)
    summary = LLM_summarize(action, result)
    
    history.append(summary)  # 作为后续步骤的记忆
    execute(action)
    
    if task_completed or action == Exit():
        break
```

##### 方法细节

**1. 动机与背景**

传统的手机自动化方案（如 Accessibility API、ADB 脚本）依赖系统后端权限，存在安全隐患且难以泛化到不同 App。随着 GPT-4V 等多模态大语言模型的出现，Agent 具备了直接"看懂"屏幕截图的能力。AppAgent 的核心动机是：**像人类用户一样，仅通过观察屏幕和点击/滑动来操作 App，无需任何后端接口**。

然而，直接让 LLM 输出原始触屏坐标（如 tap(x=324, y=567)）的效果极差——实验表明基线成功率仅 2.2%。这是因为 LLM 在空间坐标推理上能力有限。AppAgent 通过两个关键设计解决了这一问题：**简化动作空间** 和 **探索式文档生成**。

**2. 环境与动作空间设计**

AppAgent 基于 Android 系统，利用 ADB（Android Debug Bridge）命令行工具与手机交互。每一步，Agent 获取两类信息：

- **屏幕截图**：当前 App 界面的视觉信息
- **XML 布局树**：Android 系统提供的 UI 元素层级结构，包含元素类型、位置、文本等属性

系统将 XML 中的可交互元素提取出来，为每个元素分配一个**数字编号**，并将编号标注在截图上。这样 Agent 只需输出元素编号而非精确坐标。

6 种动作定义如下：

| 动作 | 格式 | 说明 |
|------|------|------|
| Tap | `Tap(element)` | 点击指定编号的 UI 元素 |
| Long Press | `Long_press(element)` | 长按指定元素 |
| Swipe | `Swipe(element, direction, dist)` | 在元素上滑动，direction ∈ {up, down, left, right}，dist ∈ {short, medium, long} |
| Text | `Text(text)` | 在当前激活的输入框中输入文本 |
| Back | `Back()` | 返回上一页 |
| Exit | `Exit()` | 标记任务完成并退出 |

> 💡 **关键设计**：用元素编号替代坐标是性能飞跃的核心原因——仅此一项改动就将成功率从 2.2% 提升到 48.9%（+46.7%）。

**3. 探索阶段：自主学习 UI 功能**

探索阶段的目标是为 App 的 UI 元素建立**功能文档**（documentation），记录"点击某个按钮会发生什么"。

**(a) 自主交互探索（Autonomous Exploration）**

Agent 在给定一个高层任务描述（如"在 Spotify 上播放音乐"）后，自主与 App 交互。每执行一个动作后，LLM 对比操作前后的截图，分析该操作产生的效果，并将结论写入文档。例如：

> *"点击元素 #5（播放按钮）会开始播放当前选中的歌曲，界面底部出现播放进度条。"*

如果 Agent 发现当前页面与任务无关（如误触广告跳转），会自动执行 `Back()` 返回。探索步数上限设为 40 步。

**(b) 观看人类演示（Watching Demos）**

用户录制操作视频，系统将视频按关键帧提取为截图序列。LLM 逐帧分析人类的操作，推断每个被操作元素的功能并写入文档。这种方式比自主探索更高效，因为人类演示直接展示了正确的操作路径，避免了大量无效试错。

**4. 部署阶段：文档辅助的任务执行**

部署时，Agent 接收用户的自然语言任务指令。每一步：

1. **观察（Observe）**：获取截图和 XML，标注 UI 元素编号
2. **检索文档（Retrieve）**：根据当前页面的 UI 元素，从文档库中检索相关功能描述
3. **思考（Think）**：结合任务目标、当前观察、历史操作记录和检索到的文档，推理下一步操作
4. **行动（Act）**：输出具体动作并执行
5. **总结（Summarize）**：将本步操作及结果压缩为一句话，加入历史记录作为后续步骤的"记忆"

部署阶段最多执行 10 步，超过则判定为失败。

> ⚠️ **注意**：Agent 的"记忆"是通过逐步总结（summarization）实现的，而非保留完整的历史截图序列，这有效控制了 LLM 的上下文长度。

**5. 与传统方法的区别**

| 维度 | 传统自动化 | 纯 LLM 基线 | AppAgent |
|------|-----------|-------------|----------|
| 后端依赖 | 需要 API/脚本 | 不需要 | 不需要 |
| 坐标精度 | 精确 | LLM 难以输出 | 用编号替代 |
| 跨 App 泛化 | 需逐个适配 | 零样本但效果差 | 探索后自动适配 |
| 知识积累 | 无 | 无 | 文档持续积累 |
| 成功率 | 高（但脆弱） | 2.2% | 73.3%–84.4% |

##### 实验结果

在 9 款 App（排除 Lightroom）的 45 个任务上评测，使用 GPT-4 作为底层模型：

| 方法 | 文档来源 | 成功率 (SR) | 平均奖励 | 平均步数 |
|------|---------|------------|---------|---------|
| GPT-4 + 原始坐标动作 | 无 | 2.2% | 2.59 | 7.8 |
| GPT-4 + 简化动作空间 | 无 | 48.9% | 5.83 | 7.0 |
| AppAgent（自主探索） | 自动生成 | 73.3% | 7.63 | 5.2 |
| AppAgent（观看演示） | 自动生成 | 84.4% | 8.54 | 4.8 |
| AppAgent（人工文档） | 手动编写 | 95.6% | 9.56 | 4.2 |

评测指标包括：
- **成功率（SR）**：10 步内完成任务的比例
- **奖励（Reward）**：基于 UI 页面与目标的接近程度打分（0-10），即使失败也有部分得分
- **平均步数**：成功完成任务所需的平均操作步数

此外，在 Adobe Lightroom 图像编辑任务的用户研究中，AppAgent（观看演示）的平均排名为 1.95（满分 1.0），优于 GPT-4 基线的 2.30，接近人工文档的 1.75。

**局限性**：当前仅支持 6 种简化动作，不支持多点触控、不规则手势等高级操作，这在部分复杂场景中可能成为瓶颈。

#### 🧪 练习题

```yaml
question: "AppAgent 中，将基线成功率从 2.2% 大幅提升至 48.9% 的最关键设计改动是什么？"
options:
  - "引入探索阶段生成 UI 功能文档"
  - "使用 GPT-4V 替代纯文本 LLM"
  - "用 UI 元素编号替代原始触屏坐标的简化动作空间"
  - "增加观看人类演示的学习方式"
answer: 2
explain: "实验表明，仅将动作空间从原始坐标改为元素编号（无任何文档辅助），成功率就从 2.2% 跃升至 48.9%，说明 LLM 难以输出精确坐标是核心瓶颈，简化动作空间是最关键的设计改动。"
```