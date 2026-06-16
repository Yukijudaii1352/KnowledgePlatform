### OpenAgents：开放智能体平台 (OpenAgents)

```yaml
id: openagents
name: OpenAgents
full_name: 开放智能体平台 (OpenAgents)
year: 2024
org: 香港大学
paper_url: https://arxiv.org/abs/2310.10634
category: multi_agent
parent: autogen
motivation: 面向真实世界的开放Agent平台
```

#### 📝 一句话总结
OpenAgents 提出一个面向真实用户、开发者和研究者的开放语言智能体平台，把 Data Agent、Plugins Agent、Web Agent 三类真实应用智能体接入统一 Web UI、后端、工具接口和可执行环境。它解决的不是单一算法分数问题，而是语言智能体从研究原型走向真实世界时的访问门槛、部署复杂度、流式交互、工具扩展、错误处理和评估可观测性问题。

#### 🎯 核心要点
- 三类内置智能体：Data Agent 用 Python/SQL 和数据工具做分析，Plugins Agent 接入 200+ 日常 API 工具，Web Agent 通过浏览器扩展执行网页浏览。
- 双层系统架构：User Interface 负责前端、后端、流式渲染、错误处理和数据存储；Language Agent 负责模型、工具接口和环境交互。
- Agent 交互循环：每轮遵循 Observation → Deliberation → Action，并把 LLM 输出解析成代码执行、API 调用或浏览器动作。
- 面向真实部署的工程机制：DataModel、Redis/MongoDB 分层存储、实时 response streaming、Chrome Extension、sandbox、自动工具选择。
- 研究价值：提供本地部署代码、共享 agent 组件、Web UI 和人机交互轨迹，支持 in-the-wild human-in-the-loop 评估。
- 与 AutoGen 类框架的区别：OpenAgents 更强调应用层完整性和普通用户访问，而不是只提供开发者用的 agent 编排接口。

#### 🔬 深入细节
![OpenAgents 平台总览](https://github.com/xlang-ai/OpenAgents/raw/main/pics/openagents_overview.png)
*图：OpenAgents 同时服务三类对象。普通用户通过 Web UI 使用智能体，开发者本地部署前后端，研究者复用 Data/Plugins/Web Agent 组件验证新方法。*

![OpenAgents 系统设计](https://github.com/xlang-ai/OpenAgents/raw/main/pics/system_design.png)
*图：OpenAgents 的系统架构分为 User Interface 与 Language Agent。前者处理用户、前端、后端、数据和流式交互，后者连接语言模型、工具和环境。*

OpenAgents 的论文定位非常明确：它不是提出一个新的提示词技巧，而是把语言智能体推向“真实可用平台”。作者指出，许多已有 agent framework 主要服务开发者，通常以 package、console 或 proof-of-concept demo 形式存在；而真实用户需要网页界面、文件上传、富媒体渲染、失败恢复、响应流式显示和账户级数据管理。OpenAgents 因此把系统设计本身作为研究贡献：如果 agent 只能在受控 benchmark 中运行，而不能承受真实用户、真实网络、真实 API 和真实延迟，它的能力评估是不完整的。

论文把架构拆成两部分。第一部分是 User Interface，包括 frontend website、backend server、streaming、error handling、database design、user system 等。第二部分是 Language Agent，包括 language model、tools、environments、prompting、action parsing、agent method、API calling、tool scaling、tool selection、web extension 和 sandbox。二者之间的关键接口是“可解析的 agent 输出”：LLM 不是只返回自然语言，而是产生能被后端解析成代码、API 调用或网页动作的文本。

```python
# OpenAgents 通用交互循环伪代码
history = load_user_history(user_id)
state = init_agent_state(files=user_files, selected_tools=user_tools)

while user_has_request:
    user_msg = receive_from_web_ui()
    observation = build_observation(user_msg, history, state)   # DataModel 负责多模态/表格/代码线性化

    deliberation = llm.generate(prompt=agent_prompt,
                                observation=observation,
                                stream=True)

    for token in streaming_parser(deliberation):
        role = pushdown_automaton.classify(token)               # 文本、工具名、参数、内部计划等
        render_or_buffer(role, token)

    action = parse_action(deliberation)                         # code/API/browser command
    result = sandbox_or_environment.execute(action)
    state = update_state(state, result)
    history.append((user_msg, action, result))
    render_result_to_frontend(DataModel(result))
```

OpenAgents 的 agent loop 可以概括为：

$$
o_t=\operatorname{Observe}(u_t,h_{t-1},e_t),\quad d_t=\operatorname{LLM}_{\theta}(P,o_t),\quad a_t=\operatorname{Parse}(d_t),\quad y_t=\operatorname{Exec}(a_t)
$$

其中 \(u_t\) 是用户输入，\(h_{t-1}\) 是历史，\(e_t\) 是当前环境或工具状态，\(P\) 是平台为具体 agent 构造的提示，\(d_t\) 是模型的推理与动作文本，\(a_t\) 是解析出的动作，\(y_t\) 是执行结果。这个公式的直觉是：OpenAgents 的难点不在“让 LLM 说出答案”，而在让 \(d_t\) 同时满足人类可读、前端可渲染、后端可解析、环境可执行这四类约束。

Data Agent 面向数据分析任务。用户可以上传表格、图像或数据文件，agent 通过 Python、SQL、Kaggle Data Search、Data Profiling、ECharts Tool 等完成查询、处理、可视化和解释。论文中特别强调 DataModel：同一份数据对人类、前端、数据库、LLM 的最佳表示不同。表格对人类可以是交互式窗口，对 LLM 可能需要线性化前几行，对后端需要持久化结构。因此 DataModel 把原始数据封装成多种输出形式，减少“把所有东西粗暴转成字符串”的脆弱性。

Plugins Agent 面向日常工具调用，接入 Google Search、Wolfram Alpha、Zapier、Klarna、Coursera、AskYourPDF、Klook 等 200+ 插件。它的关键机制是工具选择与工具扩展。用户可以手动选插件，也可以让系统自动选择最相关插件。自动选择可以抽象为：

$$
T_k=\operatorname{TopK}_{\tau\in\mathcal{T}}\operatorname{sim}\big(E(u),E(\operatorname{desc}(\tau))\big)
$$

即把用户意图 \(u\) 与工具描述 \(\operatorname{desc}(\tau)\) 编码后做相似度检索，再把候选工具交给 agent 调用。论文强调，真实插件调用还要处理 API 可用性、函数调用接口、返回长度、失败重试和前端展示，而这些通常不在纯 benchmark 中出现。

Web Agent 采用 chat agent 与 browse agent 分工。chat agent 先解析用户问题、初始 URL 和高层意图，并把复杂目标拆成更小的子指令；browse agent 再通过 Chrome Extension 观察、操作和解释网页。这个设计允许用户在浏览器侧看到执行计划和步骤，并在必要时介入。相比“黑盒式 autonomous browsing”，OpenAgents 更强调可监控、可中断、可解释的网页操作，因为真实网页会遇到 CAPTCHA、广告、页面结构变化、下载失败等不可控因素。

OpenAgents 最有工程含量的部分是实时流式解析。普通聊天模型可以边生成边把 markdown 打到前端，但 agent 输出中混有自然语言、内部思考、工具名称、工具参数、代码块、API 返回和最终回答。论文将这类流式角色识别类比为 pushdown automata：系统需要在 token 尚未完整生成时判断它属于展示文本还是工具调用缓冲区。这个机制直接影响用户体验，因为用户不应等长动作全部完成后才看到反馈，也不应看到未解析的内部控制 token。

> ⚠️ 注意：OpenAgents 的贡献不能只按“新模型”理解。它的研究价值在于补齐真实 agent 平台所需的应用层闭环：界面、状态、工具、环境、流式、错误恢复、沙箱与人机评估轨迹。

#### 🧪 练习题
```yaml
question: "OpenAgents 中 DataModel 的主要作用是什么？"
options:
  - "把所有用户数据永久删除以保护隐私"
  - "把原始数据转换为适合人类、前端、计算系统和 LLM 的不同表示"
  - "替代语言模型完成所有推理"
  - "只用于选择 Plugins Agent 的外部 API"
answer: 1
explain: "论文将 DataModel 作为数据封装层，同一份表格、图片或代码输出可按接收方转换为不同格式，从而支持渲染、存储和 LLM 提示。"
```
