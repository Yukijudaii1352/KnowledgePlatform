### OpenAgents：面向真实世界任务的开放智能体平台

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

OpenAgents 将数据分析、插件工具调用和网页操作三类 Agent 集成到可部署平台中，目标是让普通用户通过聊天完成真实世界任务。

#### 🎯 核心要点

- **平台定位**：不是单一 Agent 算法，而是把 Agent 能力产品化为 Web UI、后端服务和可扩展工具生态。
- **三类 Agent**：Data Agent 处理 Python/SQL 和数据任务，Plugins Agent 调用大量日常 API，Web Agent 通过浏览器扩展操作网页。
- **用户体验**：用户用自然语言发起任务，系统自动选择工具、执行动作并返回中间结果。
- **工程挑战**：真实世界工具有认证、权限、错误恢复、状态同步和安全边界问题。
- **与 AutoGen 关系**：OpenAgents 更强调面向终端用户的开放平台和工具生态，AutoGen 更偏底层对话式编排框架。

#### 🔬 深入细节

![OpenAgents overview](https://raw.githubusercontent.com/xlang-ai/OpenAgents/main/pics/openagents_overview.png)

*图源：OpenAgents 官方 GitHub README，展示 Data Agent、Plugins Agent 与 Web Agent 的平台化结构。*

```python
def openagents(user_request):
    session = create_user_session(user_request)
    agent = route_request(
        user_request,
        candidates=["data_agent", "plugins_agent", "web_agent"],
    )

    plan = agent.make_plan(user_request, session.context)
    for step in plan:
        tool = select_tool(step)
        if requires_permission(tool, step):
            confirm_with_user(tool, step)
        observation = tool.run(step.arguments)
        session.context.append((step, observation))
        plan = agent.revise_plan_if_needed(plan, observation)

    return agent.summarize(session.context)
```

**方法动机**：OpenAgents 的出发点是把实验室中的 Agent 能力搬到真实用户可访问的产品界面。真实任务通常包含外部 API、文件、网页、数据库和用户偏好，因此目标函数不只是 $P(answer \mid prompt)$，还要最大化工具执行轨迹的有效性 $R(\tau)$ 与用户可控性。

**三类 Agent 设计**：Data Agent 主要处理表格、SQL、Python 分析和可视化；Plugins Agent 面向日常服务工具，负责选择和调用大量插件；Web Agent 通过浏览器扩展观察页面并执行点击、输入等动作。三者分别覆盖数据、API 和浏览器这三个高频真实入口。

**平台工程**：OpenAgents 提供前端聊天界面、后端调度与工具层，使 Agent 能在可部署系统中运行。相比论文原型，平台必须处理鉴权、环境隔离、失败重试、用户确认和日志追踪；这些工程细节决定 Agent 是否能从演示走向真实使用。

**开放生态意义**：OpenAgents 的贡献在于把 Agent 作为可扩展平台来设计，而不是封闭脚本。新工具、新网页能力和新任务类型可以接入同一交互框架，但同时也带来工具滥用、隐私泄漏和越权操作的风险，需要显式权限与审计机制。

#### 🧪 练习题

```yaml
question: OpenAgents 中三类主要 Agent 覆盖了哪些能力？
options:
  - A. 数据分析、插件/API 调用、网页操作
  - B. 只做语音合成
  - C. 只做模型压缩
  - D. 只做图像去噪
answer: A
explain: OpenAgents 的平台核心由 Data Agent、Plugins Agent 和 Web Agent 三类能力组成。
```
