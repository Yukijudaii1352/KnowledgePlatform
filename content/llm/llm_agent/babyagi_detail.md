### 任务驱动智能体 (BabyAGI)

```yaml
id: babyagi
name: BabyAGI
full_name: 任务驱动智能体 (BabyAGI)
year: '2023'
org: Yohei Nakajima
paper_url: https://yoheinakajima.com/task-driven-autonomous-agent/
category: multi_agent
parent: —
motivation: 任务生成与优先级排序自主循环
```

#### 📝 一句话总结

BabyAGI 提出一个极简任务驱动自主循环：执行当前任务、根据结果生成新任务、重新排序任务队列，并用向量数据库保存上下文，从而展示 LLM agent 可围绕长期目标持续推进子任务。

#### 🎯 核心要点

- **三代理循环**：Execution Agent、Task Creation Agent、Prioritization Agent 依次协作
- **目标驱动**：用户给出 objective，系统围绕 objective 自动维护任务列表
- **任务队列**：用 deque 或列表保存待办任务，每轮取出最高优先级任务执行
- **结果记忆**：将任务结果写入 Pinecone 等向量数据库，用语义检索补充后续上下文
- **动态任务生成**：根据当前任务结果、原始目标和未完成任务生成新任务
- **实时优先级排序**：用 LLM 重新排列任务队列，使后续步骤更贴近目标
- **原型性质明显**：作者页面和仓库都强调它是实验性参考实现，不适合作为生产系统直接部署

#### 🔬 深入细节

##### 核心示意图

![BabyAGI 任务驱动流程图](https://yoheinakajima.com/wp-content/uploads/2023/03/image-1024x728.png)
*图：Yohei Nakajima 作者页面中由 GPT-4 基于代码生成的任务驱动自主智能体流程图，展示执行、生成、排序和记忆循环。图源：作者博客。*

##### 算法伪代码

```python
# BabyAGI 原始任务循环伪代码
def babyagi(objective, first_task, llm, vector_store):
    task_list = deque([{"id": 1, "name": first_task}])
    next_task_id = 2

    while task_list:
        task = task_list.popleft()

        # 1. Execution Agent: 执行当前任务
        context = vector_store.similarity_search(objective, k=5)
        result = llm.execute_task(objective=objective, task=task, context=context)
        vector_store.upsert(task_id=task["id"], text=result)

        # 2. Task Creation Agent: 基于结果生成新任务
        new_tasks = llm.create_tasks(
            objective=objective,
            result=result,
            completed_task=task,
            incomplete_tasks=list(task_list)
        )
        for new_task in deduplicate(new_tasks, task_list):
            task_list.append({"id": next_task_id, "name": new_task})
            next_task_id += 1

        # 3. Prioritization Agent: 重新排序任务队列
        task_list = deque(llm.prioritize_tasks(objective, list(task_list)))
```

##### 方法解读

BabyAGI 的贡献不是复杂模型，而是一个极简 agent loop。用户只需给出目标和初始任务，系统就开始循环：先执行一个任务，再根据执行结果提出后续任务，然后重新排序任务列表。这个模式让 LLM 从一次性问答变成持续维护任务状态的过程。

Execution Agent 负责完成队列头部任务。它会从向量数据库取回与 objective 相关的历史结果，把这些上下文连同当前任务一起交给 LLM。向量记忆的作用是缓解上下文窗口限制：不把全部历史拼进 prompt，而是按语义相似度检索最相关片段。

Task Creation Agent 是开放式规划来源。它读取当前结果、原始目标和剩余任务，生成不重复的新任务。例如完成“调研竞品”后，可能生成“整理价格对比”“提取用户评价”“生成摘要”等后续项。这个机制让系统能在目标空间中自我扩展，而不依赖用户预先列出完整计划。

Prioritization Agent 则控制执行顺序。由于新任务可能越来越多，如果不排序，agent 容易在低价值任务上消耗预算。优先级排序 prompt 会要求 LLM 根据 objective 重新排列未完成任务，使队列更贴近当前目标。

该循环可形式化为任务队列 \(Q_t\)、记忆库 \(M_t\) 和目标 \(g\) 的状态更新：

$$r_t = \operatorname{Exec}(g, q_t, \operatorname{Retrieve}(M_t,g))$$

$$Q_{t+1} = \operatorname{Prioritize}(g, Q_t \cup \operatorname{Create}(g,q_t,r_t))$$

$$M_{t+1}=M_t\cup\{(q_t,r_t)\}$$

BabyAGI 的局限也很典型：缺少可靠停止条件、预算控制、错误恢复、安全约束和结果验证。它适合作为研究和教学原型，展示任务生成与优先级排序如何组成自主循环；在生产场景中，通常需要加入明确工作流、工具权限、审计日志和人工确认。

> ⚠️ 注意：manifest 中的 BabyAGI 指 2023 年 Task-driven Autonomous Agent 原型；当前 GitHub 主仓库后来演进为 functionz/自构建函数框架，但本文聚焦原始任务循环。

#### 🧪 练习题

```yaml
question: "BabyAGI 原始循环中的三个核心步骤是什么？"
options:
  - "训练奖励模型、执行 PPO、发布模型"
  - "执行当前任务、生成新任务、重新排序任务列表"
  - "检索网页、翻译文本、生成图片"
  - "角色扮演、评论、投票"
answer: 1
explain: "BabyAGI 的核心是任务队列循环：Execution Agent 完成任务，Task Creation Agent 生成后续任务，Prioritization Agent 重排队列。"
```
