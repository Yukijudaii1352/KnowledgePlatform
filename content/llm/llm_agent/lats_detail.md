### LATS：用蒙特卡洛树搜索统一语言智能体的推理、行动与规划

```yaml
id: lats
name: LATS
full_name: 语言智能体树搜索 (LATS)
year: 2023
org: UIUC
paper_url: https://arxiv.org/abs/2310.04406
category: planning
parent: tot
motivation: 统一推理行动于蒙特卡洛树搜索
```

#### 📝 一句话总结
LATS 提出了把语言模型放进蒙特卡洛树搜索中的 Language Agent Tree Search，用树搜索同时管理思考、动作、环境反馈和自反思，解决 ReAct/CoT 类方法只沿单一路径采样、难以回溯和规划的问题。

#### 🎯 核心要点
- 将语言智能体的状态定义为原始输入、历史动作序列和历史观察序列的组合，使推理步骤与外部行动步骤都能成为树节点。
- 用 MCTS 的 selection、expansion、evaluation、simulation、backpropagation、reflection 六个操作组织推理与行动。
- 复用同一个预训练 LM 作为策略生成器、状态价值评估器和失败轨迹反思器，不需要梯度训练新的 value model。
- 引入外部环境反馈，例如 QA 检索 API、代码测试结果、WebShop 网页观察，将真实反馈纳入搜索而不是只依赖 LM 内部知识。
- 用 UCT 在高价值节点与低访问节点之间做探索-利用权衡，避免 ReAct 式贪心轨迹中的早期错误锁死后续推理。
- 价值函数结合 LM 自评与 self-consistency 分数，论文中对不同任务使用 \\(\lambda\\) 控制二者权重。
- 失败终止时生成 verbal self-reflection，并把反思写入记忆，作为后续 rollout 的语义梯度。
- 在 HumanEval、HotPotQA、WebShop、Game of 24 等任务上验证，重点展示树搜索、外部反馈与反思的组合收益。

#### 🔬 深入细节

![LATS 总体框架图](https://ar5iv.labs.arxiv.org/html/2310.04406v3/assets/x1.png)
*图：LATS 把 LLM Agent、环境、记忆、上下文、自评/反思和 Tree Search 连接成闭环。智能体向环境发出 action，环境返回 observation/reward，树搜索根据 value 选择下一步。*

![LATS 六个核心操作](https://ar5iv.labs.arxiv.org/html/2310.04406v3/assets/x5.png)
*图：论文 Figure 3 展示 LATS 的 selection、expansion、evaluation、simulation、backpropagation、reflection 六步。*

```python
# LATS 核心流程伪代码，按论文 Algorithm 1 简化
initialize_tree(root_state)
initialize_value_and_visit_counter(V, N)
memory = []

for trajectory_id in range(k):
    s = root_state
    path = [s]

    for depth in range(d):
        if not expanded(s):
            children = []
            for i in range(n):
                action = sample_lm_action(policy_lm, s, memory)
                observation, reward, done = env.step_from_state(s, action)
                child = make_state(s, action, observation)

                lm_score = value_lm_score(child)
                sc_score = self_consistency_score(child)
                V[child] = lambda_ * lm_score + (1 - lambda_) * sc_score
                N[child] = 1
                children.append(child)
            attach_children(s, children)

        s = argmax_child(
            s,
            key=lambda child: V[child] + w * sqrt(log(N[s]) / N[child])
        )
        N[s] += 1
        path.append(s)

        if is_terminal(s) or is_output_action(s):
            break

    reward = env.final_reward(s)
    for node in path:
        V[node] = (V[node] * (N[node] - 1) + reward) / N[node]

    if reward < success_threshold:
        reflection = reflection_lm(path, reward)
        memory.append({"trajectory": path, "reflection": reflection})
    else:
        return extract_answer_or_action_sequence(s)

return best_terminal_state_by_value(tree)
```

LATS 的动机来自两个局限：第一，CoT 和 ReAct 都主要沿着一个自回归轨迹向前走，早期一步的错误会在后续上下文中被放大；第二，ToT/RAP 虽然引入搜索，但通常偏向内部推理，不能自然吸收环境观测、测试失败、网页状态这类外部反馈。LATS 的关键转折是把每一步的“thought/action + observation”看成可回滚的状态，语言任务中的回滚不需要真实物理环境倒带，只需要把历史文本上下文恢复到某个节点即可。因此，树搜索在语言智能体里变得便宜且通用：节点是文本状态，边是 LM 采样出来的行动或思考，环境反馈也变成后续 prompt 的一部分。

论文把节点写作包含原始任务、动作历史和观察历史的状态，可概括为：

$$
s_t = \left(x, a_{1:t}, o_{1:t}\right)
$$

其中 \\(x\\) 是原始输入，\\(a_{1:t}\\) 既可以是自然语言 thought，也可以是搜索、点击、提交代码等可执行 action，\\(o_{1:t}\\) 是外部环境返回的 observation。这个定义让 LATS 同时覆盖纯推理任务和交互式决策任务：在 Game of 24 中 observation 可以很少，主要依赖内部推理；在 WebShop 中 observation 是网页反馈；在 HumanEval 中 observation 是编译器和测试用例反馈。相比把 LM 当作一次性生成器，LATS 把 LM 当作可被搜索算法反复查询的策略先验。

Selection 使用 UCT 公式在 exploitation 与 exploration 之间做权衡。对当前节点 \\(s\\) 的一个候选子节点 \\(s'\\)，可写成：

$$
\operatorname{UCT}(s') = V(s') + w\sqrt{\frac{\ln N(s)}{N(s')}}
$$

这里 \\(V(s')\\) 是该子树的估计价值，\\(N(s)\\) 与 \\(N(s')\\) 是父子节点访问次数，\\(w\\) 是探索强度。直觉上，高价值节点会被继续利用，但访问次数少的节点也会因为第二项得到额外奖励。这样 LATS 不会只选择当前 LM 评分最高的一条路径，而是保留“看起来还没充分探索”的备选分支；这正是它相对 ReAct 的核心优势。

Expansion 阶段从当前状态一次采样 \\(n\\) 个候选动作，而不是只取一个 greedy 输出。动作空间由具体任务决定：HotPotQA 中可以是 search/lookup/answer 等 API 操作与思考文本，WebShop 中可以是网页导航动作，HumanEval 中可以是完整代码解。每个动作都送入环境，环境反馈被拼回新状态。由于 LATS 把环境 observation 显式放入节点，树搜索不是在纯文本幻想里模拟世界，而是在真实工具/环境响应上推进。

Evaluation 是 LATS 适配 LM 的关键。传统 MCTS 往往需要一个训练好的 value network 或 rollout policy，LATS 则用 prompt 让 LM 对当前状态给出进度评分，再结合 self-consistency 形成状态价值：

$$
\hat V(s) = \lambda p_V(s) + (1-\lambda)\operatorname{SC}(s)
$$

其中 \\(p_V(s)\\) 是 LM 自评价值，\\(\operatorname{SC}(s)\\) 表示从该状态继续推理时答案一致性的启发式分数。\\(\lambda\\) 越大，越相信 LM 的显式评分；越小，越依赖多样采样的一致性。这个设计的直觉是：LM 的自然语言判断很灵活，但会自信犯错；self-consistency 较粗糙，却能在多条候选轨迹收敛到相同答案时提供稳健信号。

Simulation 会沿着当前最有希望的分支继续扩展，直到达到终止动作、任务成功、失败或深度预算。终止后，Backpropagation 用真实 reward 更新路径上的节点价值：

$$
V(s) \leftarrow \frac{V(s)(N(s)-1)+r}{N(s)}
$$

这一步把环境最终反馈从叶节点传回根节点附近，使后续 selection 不只是参考局部 LM 打分，也参考曾经真实成功或失败的轨迹。对代码任务而言，reward 可以来自测试通过比例；对网页购物而言，可以来自目标属性匹配分；对 QA 任务而言，可以来自答案正确性反馈。

Reflection 则是 LATS 与普通 MCTS 最大的语义差异之一。失败轨迹不会只留下一个低 reward，而是交给 LM 生成文字反思：哪里走错、下次应尝试什么替代动作、哪些约束被忽略。这个 reflection 被放入记忆，并作为后续 agent 与 value function 的上下文。论文把它视为一种无需梯度更新的“语义梯度”：标量 reward 只能说明好坏，反思文本能说明为什么坏、如何改。

与 ToT 相比，LATS 不只是对 thought 做 BFS/DFS，而是把 action 与 observation 一并纳入搜索；与 RAP 相比，LATS 不要求 LM 充当世界模型去想象下一个状态，而是直接和环境交互；与 Reflexion 相比，LATS 不只在失败后重试，而是在树中系统性探索多个备选分支。代价是推理预算明显更高，并且要求环境能从历史状态恢复或至少能用文本上下文近似恢复。因此它更适合高价值、可验证、可回滚的困难任务，例如代码生成、工具调用、多跳问答和网页导航。

> 💡 关键：LATS 的本质不是“让 LLM 多想几步”，而是把 LLM 的生成能力拆成策略、价值和反思三个接口，再由 MCTS 管理搜索预算。

#### 🧪 练习题
```yaml
question: "LATS 相比 ReAct 的核心改进是什么？"
options:
  - "把语言模型微调成专用价值网络"
  - "用树搜索同时探索多条 thought/action 轨迹，并用环境反馈和反思更新节点价值"
  - "只保留最终答案，删除中间观察以节省上下文"
  - "完全依赖 self-consistency 投票，不再调用外部环境"
answer: 1
explain: "LATS 的核心是将 ReAct 式行动序列扩展为 MCTS 搜索树，节点价值由 LM 评估、环境反馈和失败反思共同塑造。"
```
