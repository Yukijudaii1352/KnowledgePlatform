### AppAgent
```yaml
id: appagent
name: AppAgent
full_name: 应用智能体 (AppAgent)
year: '2023'
org: Tencent
paper_url: https://arxiv.org/abs/2312.13771
category: gui
parent: —
motivation: 探索-部署两阶段自主学习App操作
```

#### 📝 一句话总结
AppAgent 让 LLM 先通过自主探索或观看演示为手机 App 生成操作文档，再在部署时结合截图、XML 元素编号和文档记忆逐步调用简化动作完成任务。

#### 🎯 核心要点
- **两阶段框架**：探索阶段学习 App 元素和动作效果，部署阶段按“观察-思考-动作-总结”循环执行具体用户任务。
- **视觉与结构并用**：输入包含实时截图和 Android XML 交互元素，元素被编号叠加在截图上，避免 LLM 直接预测脆弱的屏幕坐标。
- **动作空间工程化**：用 `Tap`、`Long_press`、`Swipe`、`Text`、`Back`、`Exit` 六类函数模拟人类手机操作，显著降低控制难度。
- **文档是长期记忆**：探索产生的文档记录 UI 元素功能和动作后果，部署时动态注入相关文档，减少模型每次从零理解 App。
- **意义**：AppAgent 是 GUI agent 从 prompt-only 执行向“先学习应用、再执行任务”的早期代表，但依赖 XML 和人工/自动探索质量。

#### 🔬 深入细节
论文：*AppAgent: Multimodal Agents as Smartphone Users*。核心图 Figure 2 展示了探索阶段、知识文档和部署阶段的整体框架。

![AppAgent 探索与部署两阶段框架图](https://ar5iv.labs.arxiv.org/html/2312.13771/assets/x2.png)
*图：AppAgent 先在探索阶段与 App 交互并生成参考文档，部署阶段再利用文档、截图和 XML 元素编号完成用户任务。*

AppAgent 的环境运行在 Android CLI/ADB 上。每一步 agent 获得两类观测：当前屏幕截图，以及 XML 文件中解析出的交互元素。系统会为元素分配唯一编号，编号来源可以是 resource id，也可以由 class、size、content 等字段构造，然后半透明叠加到截图上。这样 LLM 可以说“点击 5 号元素”，而不必输出精确像素坐标。

动作空间被刻意设计得接近人类常用手机动作，但比原始坐标控制更稳定：`Tap(element)` 点击编号元素；`Long_press(element)` 长按；`Swipe(element, direction, dist)` 在某元素上按方向和距离滑动；`Text(text)` 在键盘出现时直接输入文本；`Back()` 返回上一页；`Exit()` 结束任务。这一抽象把控制问题从连续坐标预测变为离散函数调用。

探索阶段有两种来源。自主探索时，LLM 带着任务目标尝试点击/滑动 UI 元素，对比动作前后的截图变化，推断元素功能和页面转移，并把结论写入文档；如果当前页面像广告页或无关页，agent 会用 `Back()` 返回，避免盲目 DFS/BFS。观看演示时，人类操作 App，agent 只记录被用到的元素和动作，因此探索空间更小、文档质量通常更高。

部署阶段的 prompt 包含当前截图、可用动作说明、动态检索出的相关文档、以及上一轮交互总结。LLM 先描述当前 UI，再给出任务相关推理，随后调用一个动作函数。动作执行后，agent 总结当前步骤和历史状态，作为下一轮记忆。这个闭环可抽象为
\[
a_t = \pi_\theta(o_t, x_t, m_t, d_t),\qquad
m_{t+1}=\mathrm{Summarize}(m_t,o_t,a_t,o_{t+1}),
\]
其中 \(o_t\) 是截图/XML 观测，\(x_t\) 是用户任务，\(d_t\) 是检索到的 App 文档，\(m_t\) 是交互记忆。

实验中，原始坐标动作空间下 GPT-4 baseline 成功率很低；换成 AppAgent 的离散动作空间后，即使没有文档也大幅提升。加入自动探索文档、观看演示文档和人工文档后，成功率进一步上升，说明主要收益来自两个地方：一是动作接口降低了低层控制噪声，二是探索文档把 App-specific 知识外化成可检索记忆。

```text
Algorithm: AppAgent explore-then-deploy
Exploration:
1. Observe screenshot and numbered XML elements.
2. Choose a UI element/action to try or watch a human demo action.
3. Execute the action through Android control functions.
4. Compare before/after screens and infer the element's function.
5. Update the app document with action effects and useful page knowledge.

Deployment:
1. Receive user task and current screenshot/XML observation.
2. Retrieve relevant app document snippets.
3. Prompt LLM to observe, reason, and select one function call.
4. Execute the function call and observe the new screen.
5. Summarize interaction memory; repeat until Exit().
```

AppAgent 的限制也直接来自其设计。XML 可用时元素编号很强，但许多复杂 GUI、游戏、canvas 或跨平台界面不一定能给出可靠结构树；探索文档若写错，会在部署阶段被反复使用；LLM 对长文档检索和多步状态的鲁棒性也有限。后续 CogAgent 和 SeeClick 更强调直接从高分辨率截图中识别和定位 GUI 元素，试图减少对 XML/DOM 的依赖。

#### 🧪 练习题
```yaml
question: "AppAgent 为什么把手机操作抽象为编号元素上的离散函数调用？"
options:
  - "降低连续坐标预测的不稳定性，让 LLM 基于截图和 XML 元素编号选择可执行动作"
  - "让模型绕过截图输入，只依赖 App 后端 API 完成任务"
  - "使探索阶段不需要记录任何页面知识，部署时完全从零推理"
  - "强制所有 App 使用同一套固定页面布局，避免界面变化"
answer: 0
explain: "编号元素和 Tap/Swipe/Text 等函数把低层控制问题离散化，减少像素坐标误差；但它依赖 XML 元素解析和编号覆盖的质量。"
```
