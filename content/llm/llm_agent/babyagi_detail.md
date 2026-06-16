### BabyAGI：任务驱动的自主智能体循环

```yaml
id: babyagi
name: BabyAGI
full_name: 任务驱动智能体 (BabyAGI)
year: 2023
org: Yohei Nakajima
paper_url: https://yoheinakajima.com/task-driven-autonomous-agent/
category: multi_agent
parent: —
motivation: 任务生成与优先级排序自主循环
```

#### 📝 一句话总结
BabyAGI 提出了一个极简任务驱动自主智能体循环，用执行代理完成当前任务、任务生成代理提出后续任务、优先级代理重排队列，并用向量记忆提供上下文，解决单次提示无法持续推进长期目标的问题。

#### 🎯 核心要点
- 以用户给定 objective 和 initial task 启动，系统维护一个可动态更新的 task queue。
- Execution Agent 读取当前任务和相关历史上下文，调用 GPT-4/LLM 生成任务结果。
- Memory 使用 Pinecone 等向量数据库存储 task/result pair，并按相似度检索与当前任务相关的上下文。
- Task Creation Agent 根据 objective、当前任务结果和未完成任务列表生成新的 follow-up tasks。
- Task Prioritization Agent 对任务队列去重、排序和重编号，使下一轮优先处理更关键任务。
- 主循环是 execute -> store -> create -> prioritize -> pop next task，直到队列耗尽或人为停止。
- LangChain 在原始文章中用于组织 chain/agent 能力，使执行代理可扩展到工具调用和环境交互。
- 原型强调极简性：核心思想可用一段很短的 Python 脚本表达，因此成为早期自主 Agent 的标志性框架。
- 主要风险包括无限循环、任务膨胀、优先级误判、隐私泄漏、模型幻觉和缺少可靠停止条件。

#### 🔬 深入细节

![BabyAGI 任务驱动自主智能体框架图](https://yoheinakajima.com/wp-content/uploads/2023/03/image-1024x728.png)
*图：作者页面中的任务驱动自主智能体框架。Objective 与 First Task 初始化当前状态，执行结果进入 Memory 和 Task Generator，新任务进入 Tasklist，再由 Task Prioritization 选出下一轮任务。*

```python
# BabyAGI 核心循环伪代码
objective = user_defined_objective
queue = deque([initial_task])
memory = VectorStore()
next_task_id = 1

while queue:
    task = queue.popleft()

    context = memory.similarity_search(
        query=f"{objective}\n{task.name}",
        top_k=K,
    )

    result = execution_agent(
        objective=objective,
        task=task,
        context=context,
    )

    memory.add(
        text=result,
        metadata={"task": task.name, "task_id": task.id},
        embedding=embed(result),
    )

    new_tasks = task_creation_agent(
        objective=objective,
        last_result=result,
        completed_task=task.name,
        incomplete_tasks=[t.name for t in queue],
    )

    for new_task in deduplicate(new_tasks, queue):
        next_task_id += 1
        queue.append(Task(id=next_task_id, name=new_task))

    queue = prioritization_agent(
        objective=objective,
        tasks=queue,
        last_completed_task_id=task.id,
    )
```

BabyAGI 的核心问题是：如果用户给模型一个长期目标，模型如何在没有人类逐步提示的情况下持续推进？普通 ChatGPT 工作流依赖用户每轮判断“下一步该做什么”。BabyAGI 把这个判断显式拆成三个代理：Execution Agent 负责完成当前任务，Task Creation Agent 负责基于结果提出下一批任务，Task Prioritization Agent 负责决定任务顺序。它不是让一个模型一次性规划完整路线，而是让规划在每轮结果之后重新发生。

可以把 BabyAGI 的状态写成任务队列、记忆库和目标三元组。第 \\(t\\) 轮队列为：

$$
Q_t = [\tau_1, \tau_2, \ldots, \tau_m]
$$

系统弹出队首任务 \\(\tau_1\\)，从向量记忆中检索相关上下文：

$$
C_t = \operatorname{TopK}\left(M_t, \operatorname{embed}(O, \tau_1)\right)
$$

执行代理生成结果：

$$
r_t = E_\theta(O, \tau_1, C_t)
$$

这里 \\(O\\) 是总目标，\\(C_t\\) 是检索出的历史 task/result 上下文，\\(E_\theta\\) 是由 LLM 驱动的执行函数。这个公式体现了 BabyAGI 与简单队列脚本的区别：当前任务不是孤立执行，而是用向量记忆把历史结果重新注入上下文。

执行完成后，系统将任务结果写入记忆：

$$
M_{t+1} = M_t \cup \{(\tau_1, r_t, \operatorname{embed}(r_t))\}
$$

这一步让后续任务能够“知道之前做过什么”。在原始实现语境中，Pinecone 用来存储高维向量并做相似度检索；在后来的简化/归档版本中，也可以替换为 Chroma、Weaviate 或本地向量库。关键不是具体数据库，而是把长期任务的中间结果转化为可检索记忆，否则循环越长，上下文越容易丢失或爆炸。

Task Creation Agent 接收 objective、刚完成任务、执行结果和当前未完成任务列表，输出不与现有任务重复的新任务：

$$
T_t^+ = G_\theta(O, \tau_1, r_t, Q_t \setminus \{\tau_1\})
$$

直觉上，它相当于一个“动态项目经理”：看到最新结果后，决定哪些后续行动变得必要。例如目标是调研某市场，执行任务得到竞品列表后，任务生成器可能新增“分析竞品定价”“查找用户痛点”“总结进入壁垒”。这种机制使 BabyAGI 能从开放目标中滚动展开任务树，而不是只执行初始任务。

Task Prioritization Agent 再把旧队列和新任务合并重排：

$$
Q_{t+1} = P_\theta\left(O, (Q_t \setminus \{\tau_1\}) \cup T_t^+\right)
$$

早期 BabyAGI 中，优先级代理最初也承担去重作用，因为 LLM 很容易生成相似任务。排序的意义在于控制有限执行预算：如果任务生成速度超过任务完成速度，队列会膨胀，系统必须决定先做最能推进目标的任务。这个模块也是 BabyAGI 最脆弱的部分之一，因为 LLM 对优先级的理解可能不稳定，容易把显眼但不重要的任务排到前面。

BabyAGI 与 AutoGPT、CAMEL 的差异在于状态表示。AutoGPT 更强调工具执行链和外部行动，CAMEL 更强调两个角色之间的自然语言协作，而 BabyAGI 的最小抽象是“任务队列 + 结果记忆 + 三个 LLM 函数”。这种抽象非常简单，因此易于复现和改造：可以把 execution agent 接入搜索、文件系统、Zapier、代码解释器；可以把 prioritization agent 换成规则排序；可以增加 human approval 作为停止阀。它的影响力很大，正是因为它把自主智能体拆成了可理解、可替换的循环部件。

不过，BabyAGI 也暴露了早期 autonomous agent 的核心风险。首先是停止条件弱：只要任务生成器持续产生任务，系统就会一直运行，带来 API 成本和失控风险。其次是目标漂移：新任务由 LLM 根据上轮结果生成，若某轮结果错误，后续任务会围绕错误继续展开。第三是记忆污染：向量库保存的结果未必真实，但后续会把它当上下文使用。第四是安全边界：如果执行代理接入真实工具或外部 API，错误任务可能产生真实副作用。

因此，BabyAGI 最适合被理解为“任务驱动 Agent 架构原型”，而不是可直接生产部署的 AGI。它的贡献不在于证明模型能自主完成任意目标，而在于给出一个最小闭环：目标驱动任务，任务产生结果，结果更新记忆并生成新任务，优先级排序决定下一步。这一闭环后来成为很多 agent 框架中 planner、executor、memory、scheduler 模块的雏形。

> 💡 关键：BabyAGI 的智能主要来自循环结构，而不是单个 prompt。只要 execute/create/prioritize 三个函数可替换，整个系统就能从玩具脚本演化成更复杂的 agent runtime。

#### 🧪 练习题
```yaml
question: "BabyAGI 主循环中 Task Creation Agent 的输入最关键包含哪些信息？"
options:
  - "只包含用户最初的 objective，不读取执行结果"
  - "包含 objective、刚完成任务的结果、已完成任务描述和当前未完成任务列表"
  - "只包含向量数据库中的随机历史记录"
  - "只包含优先级排序后的任务编号"
answer: 1
explain: "任务生成器需要根据目标和最新结果提出不重复的后续任务，同时参考现有未完成任务避免队列膨胀和重复。"
```
