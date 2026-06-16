### MetaGPT：元编程智能体 (MetaGPT)

```yaml
id: metagpt
name: MetaGPT
full_name: 元编程智能体 (MetaGPT)
year: 2024
org: 深度赋智
paper_url: https://openreview.net/forum?id=uS04ESuElM
category: multi_agent
parent: chatdev
motivation: SOP注入多Agent协作流程
```

#### 📝 一句话总结
MetaGPT 将软件公司的标准作业流程 SOP 编码进多 Agent 协作，把自由聊天式协作改造成由产品文档、架构设计、任务分解、代码实现和可执行反馈串联的结构化元编程流程，从而减少级联幻觉并提升复杂软件生成质量。

#### 🎯 核心要点
- 提出 `Code = SOP(Team)` 思想：把人类软件团队的标准作业流程显式注入 LLM Agent 团队。
- 定义五类核心角色：Product Manager、Architect、Project Manager、Engineer、QA Engineer，各自拥有 profile、goal、constraints、context 和 skills。
- 强制产生结构化中间产物：PRD、User Stories、Requirement Pool、File Lists、Data Structures、API Interfaces、Sequence Flow、Test Cases。
- 使用共享消息池与发布-订阅机制，Agent 发布结构化消息，并按角色关注点订阅相关信息，避免一对一反复询问。
- 引入 executable feedback：Engineer 在运行时写代码、执行测试、读取错误、对照 PRD 与系统设计迭代修复。
- 相比 ChatDev 侧重自然语言对话，MetaGPT 更强调文档和图表作为协作接口，减少无效寒暄、信息遗漏和格式不一致。
- 在 HumanEval、MBPP 与 SoftwareDev 上验证，展示 SOP、角色分工和可执行反馈对代码生成与软件工程任务的增益。

#### 🔬 深入细节
![MetaGPT SOP 总览](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/1-metagpt_overall_update.png)
*图：MetaGPT 将真实软件团队中的 SOP 映射到 LLM 多 Agent 团队，由不同角色按标准流程交付结构化产物。*

MetaGPT 的出发点是：早期多 Agent 系统虽然能通过角色扮演提高互动性，但复杂任务会出现级联幻觉。一个 Agent 的含糊输出会被下一个 Agent 当成事实继续扩展，错误沿链条放大；自由聊天还可能产生无关对话、重复指令和信息失真。MetaGPT 借鉴真实软件公司的 SOP，让每个角色知道自己要读什么、写什么、交付给谁，以及输出必须满足什么格式。这样，多 Agent 协作不再是“互相聊天”，而是“按照文档接口传递工程产物”。

MetaGPT 的流程可以抽象为一个 SOP 有向图：

$$
G_{SOP}=(R,D,E),
$$

其中 \(R\) 是角色集合，\(D\) 是结构化交付物集合，\(E\subseteq R\times D\times R\) 表示哪个角色产生某个交付物并供哪个后续角色使用。典型路径是：Product Manager 根据用户需求生成 PRD、用户故事和需求池；Architect 读取 PRD，生成系统设计、文件列表、数据结构和 API 接口；Project Manager 将设计拆成工程任务；Engineer 根据任务写代码；QA Engineer 生成测试用例并检查质量。每个节点都减少了后续 Agent 的自由发挥空间。

```python
# MetaGPT SOP 协作伪代码
message_pool = MessagePool()
team = [ProductManager(), Architect(), ProjectManager(), Engineer(), QAEngineer()]

requirement = receive_user_requirement()
message_pool.publish("user_requirement", requirement)

for role in team:
    inputs = message_pool.subscribe(role.profile.interests)
    artifact = role.act(inputs)
    assert artifact.matches(role.output_schema)
    message_pool.publish(artifact.topic, artifact)

for task in message_pool.subscribe("engineering_tasks"):
    code = Engineer.write_code(task, design=message_pool.get("system_design"))
    for retry in range(3):
        tests = Engineer.write_tests(task, code)
        result = execute(code, tests)
        if result.passed:
            break
        context = message_pool.get_many(["PRD", "system_design", "code_history"])
        code = Engineer.debug(code, result.error, context)
    message_pool.publish("code", code)
```

![MetaGPT 通信协议与可执行反馈](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/2-message_sharing.jpg)
*图：左侧是共享消息池和发布-订阅通信，右侧是 Engineer 基于执行结果进行迭代调试的闭环。*

通信协议是 MetaGPT 区别于 ChatDev 的关键。ChatDev 主要让两个角色在每个 atomic chat 中通过自然语言达成共识；MetaGPT 则要求 Agent 发布结构化消息到全局消息池。若 \(M\) 是消息池，角色 \(r\) 的订阅集合为 \(S_r\)，则该角色可见的信息为：

$$
O_r = \{m \in M \mid topic(m) \in S_r\}.
$$

当角色执行动作 \(a_r\) 时，它只消费与自己职责相关的 \(O_r\)，再产生满足 schema 的产物 \(d_r\)：

$$
d_r = a_r(O_r, profile_r, goal_r, constraints_r), \quad M \leftarrow M \cup \{d_r\}.
$$

这个机制解决两个问题：第一，不需要每个角色向其他角色逐一询问信息，降低通信拓扑复杂度；第二，不把所有消息广播给所有角色，避免信息过载。比如 Architect 主要订阅 PRD，而 QA Engineer 的测试信息不一定需要提前干扰架构设计。

结构化输出是 SOP 的落地形式。论文中特别强调 PRD、系统接口设计、序列流程图等文档，因为这些产物比自由对话更稳定。Product Manager 的 PRD 将用户需求转成可实现条目；Architect 的数据结构和接口定义把需求转成代码边界；Project Manager 的任务拆分让 Engineer 明确实现顺序；QA Engineer 的测试用例把质量标准外显出来。MetaGPT 因此把元编程理解为“编写能指导程序生成的程序”：Agent 不是直接吐出最终代码，而是先生成控制代码生成的工程规范。

Executable Feedback 是另一个核心闭环。非执行式代码审查只能让 LLM 读代码并猜测问题，仍可能漏掉导入错误、类名错误、路径错误或运行时异常。MetaGPT 让 Engineer 在生成初始代码后运行测试，若失败，就把错误输出、历史调试记忆、PRD、系统设计和代码文件一起作为修复上下文。其迭代可表示为：

$$
code_{t+1}=\text{Debug}(code_t, error_t, PRD, design, memory),
$$

并在测试通过或达到最多 3 次重试后停止。这个设计把“正确性判断”从纯语言空间拉回可执行环境，降低 LLM 自我评价不可靠的问题。

![MetaGPT 开发流程细节](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/3-metagpt_details.jpg)
*图：MetaGPT 的软件开发过程依赖 SOP，把需求、设计、任务、实现、测试组织成可追踪的工程流水线。*

与传统单 Agent 或自由多 Agent 相比，MetaGPT 的优势在于把复杂任务的隐性协作知识显式化。AutoGPT/LangChain 更像通用工具调用或链式执行框架，ChatDev 更像角色对话驱动的软件公司；MetaGPT 则把“谁负责什么、输出什么格式、下游如何消费”作为第一等约束。它牺牲了一些开放式灵活性，换来中间状态可检查、错误可定位、交付物可复用。对于软件工程任务，这种约束比增加更多闲聊轮次更重要，因为代码生成失败往往不是模型不会写某一行代码，而是需求、接口、文件边界和测试标准在多轮传递中失真。

#### 🧪 练习题
```yaml
question: "MetaGPT 相比 ChatDev 最关键的方法差异是什么？"
options:
  - "MetaGPT 完全取消多 Agent，只保留一个代码生成模型"
  - "MetaGPT 用 SOP、结构化文档和发布-订阅消息池约束协作，而不主要依赖自由聊天"
  - "MetaGPT 只优化对话娱乐任务，不处理软件工程"
  - "MetaGPT 用强化学习奖励模型替代所有测试执行"
answer: 1
explain: "MetaGPT 将人类软件团队 SOP 编码为角色、结构化产物和消息协议，并用可执行反馈闭环修复代码错误。"
```
