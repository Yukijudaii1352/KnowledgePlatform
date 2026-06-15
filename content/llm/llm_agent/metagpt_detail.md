### MetaGPT：把标准作业流程写进多智能体协作

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

MetaGPT 将软件公司的 SOP 编码进多智能体系统，让产品经理、架构师、项目经理、工程师和测试角色按结构化文档流协作产出软件。

#### 🎯 核心要点

- **核心问题**：多 Agent 自由聊天容易发散，缺少稳定的中间文档、职责边界和交付标准。
- **关键思想**：把标准作业流程转为角色职责、输入输出模板和阶段性文档，使协作从聊天变成可审计流程。
- **协作介质**：PRD、系统设计、任务拆分、代码和测试报告等结构化产物在共享消息池中流动。
- **相比 ChatDev**：MetaGPT 更强调 SOP 和文档化接口，而不仅是模拟软件公司角色之间的对话。
- **收益与代价**：流程更稳定、可追踪，但也更依赖预定义 SOP 是否覆盖真实项目变化。

#### 🔬 深入细节

![MetaGPT overview](https://arxiv.org/html/2308.00352v7/extracted/5946302/imgs/1-metagpt_overall_update.png)

*图源：arXiv HTML 论文图，展示 MetaGPT 从需求到 PRD、设计、任务和代码的多角色流水线。*

```python
def metagpt(requirement):
    pool = MessagePool()
    roles = {
        "PM": ProductManager(output="PRD"),
        "Architect": Architect(output="system_design"),
        "ProjectManager": ProjectManager(output="task_list"),
        "Engineer": Engineer(output="code"),
        "QA": QAEngineer(output="tests"),
    }

    pool.publish("user_requirement", requirement)
    for role_name in ["PM", "Architect", "ProjectManager", "Engineer", "QA"]:
        role = roles[role_name]
        subscribed = pool.collect(role.subscriptions)
        artifact = role.run_sop(subscribed)
        pool.publish(role.output, artifact)

    return assemble_repository(pool.collect(["code", "tests", "docs"]))
```

**方法动机**：MetaGPT 认为多 Agent 协作的关键瓶颈不是“有多少角色”，而是角色之间缺少稳定接口。它把软件工程中的 SOP 写成可执行提示和文档模板，相当于用中间变量 $d_t$ 约束每个阶段：$d_t=f_t(d_{<t}, req)$，下一阶段不直接依赖松散聊天，而依赖明确文档。

**角色与文档接口**：产品经理生成 PRD，架构师基于 PRD 生成系统设计，项目经理拆分任务，工程师实现代码，QA 生成和执行测试。每个角色的输出都被结构化为后续角色可消费的输入，减少自由对话中常见的信息丢失和指令漂移。

**共享消息池机制**：MetaGPT 使用共享消息池和订阅机制，让角色只读取与自身职责相关的消息。这样既保留了全局可追溯性，又避免每个 Agent 被全部历史淹没；从系统角度看，它把多 Agent 通信从点对点闲聊变成了发布订阅式协作。

**SOP 的工程意义**：SOP 注入使系统更像一个自动化软件团队：每个阶段有产物、有负责人、有检查点。缺点是它可能过度依赖预先设计的流程，在高度探索性或需求频繁变化的任务中，固定 SOP 可能需要动态改写才能保持有效。

#### 🧪 练习题

```yaml
question: MetaGPT 中 SOP 注入主要解决什么问题？
options:
  - A. 多 Agent 自由对话缺少稳定流程和结构化交付物
  - B. GPU 显存不足
  - C. 网页加载速度太慢
  - D. 只能处理英文输入
answer: A
explain: MetaGPT 的贡献是把软件工程 SOP 转为角色职责、文档模板和消息流，约束多 Agent 协作。
```
