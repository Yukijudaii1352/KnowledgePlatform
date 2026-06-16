### ToT：思维树 (Tree of Thoughts)

```yaml
id: tot
name: ToT
full_name: 思维树 (Tree of Thoughts)
year: 2023
org: 普林斯顿/Google DeepMind
paper_url: https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html
category: planning
parent: cot
motivation: 树结构推理支持搜索与回溯
```

#### 📝 一句话总结

ToT 提出把 LLM 的中间推理单元组织成可搜索的树，解决 CoT 只能沿单一路径自左向右生成、难以局部探索和全局回溯的问题。它用语言模型同时生成候选 thought、评价中间状态，并结合 BFS/DFS 等搜索算法在多条推理路径之间做选择。

#### 🎯 核心要点

- 推理单元升级：将 CoT 中连续生成的 token 序列抽象为语义完整的 `thought`，例如一道中间算式、一个写作计划或一个填字候选词
- 树搜索框架：每个节点表示输入与已生成 thoughts 组成的部分解，边表示新增一个候选 thought
- 四个设计问题：如何分解 thought、如何生成候选 thought、如何评价状态、使用哪种搜索算法
- 候选生成策略：可从 CoT prompt 独立采样多个 thought，也可用 propose prompt 顺序提出不重复候选
- 状态评价策略：可对每个状态独立打分或分类，也可让 LM 在多个状态之间投票选择更有前途的分支
- 搜索实例：Game of 24 和 Creative Writing 使用 BFS 保留每层最优状态，Mini Crosswords 使用 DFS、剪枝和回溯处理更深的组合搜索
- 实验任务：Game of 24、Creative Writing、Mini Crosswords；在 Game of 24 中 GPT-4 CoT 仅解决 4% 测试题，而 ToT 在宽度为 5 时达到 74%

#### 🔬 深入细节

![ToT 框架示意图](https://arxiv.org/html/2305.10601/x1.png)
*图：论文 Figure 1 对比 IO、CoT、CoT-SC 与 ToT。ToT 不再只采样完整链路，而是维护一棵可评价、可剪枝、可回溯的 thought tree。*

ToT 的核心动机来自一个很具体的缺陷：自回归 LLM 默认按 token 从左到右生成，一旦早期中间步骤选错，后续 token 往往只能在错误前提上继续补全。CoT 虽然把最终答案前的思考显式化，但通常仍是一条线；Self-Consistency 采样多条完整 CoT 后投票，能增加多样性，却缺少“在第 1 步发现某个中间 thought 不好就停止探索”的局部控制。ToT 把问题求解视为搜索问题，让模型在每一层产生多个备选 thought，然后用语言化的启发式评价决定保留、扩展或回溯。

论文把一个中间状态形式化为：

$$
s_t = [x, z_1, z_2, \ldots, z_t]
$$

其中 \(x\) 是原始输入，\(z_i\) 是第 \(i\) 个 thought。候选生成器 \(G_\theta\) 负责从状态 \(s_t\) 扩展下一层：

$$
Z_{t+1} = G_\theta(s_t, k) = \{z_{t+1}^{(1)}, \ldots, z_{t+1}^{(k)}\}
$$

状态评价器 \(V_\theta\) 再为新状态给出启发式价值，例如数值分、`sure/maybe/impossible` 分类，或在一组状态中投票：

$$
v(s_{t+1}) = V_\theta([x, z_1, \ldots, z_{t+1}])
$$

搜索算法据此保留 top-\(b\) 个状态。这里的 \(G_\theta\) 和 \(V_\theta\) 都可以由同一个 LLM 通过不同 prompt 实现，因此 ToT 不要求训练新的价值网络；它把传统启发式搜索中的手写评价函数替换成语言模型的自评和比较。

```python
# ToT-BFS 简化伪代码
states = [initial_state(x)]
for t in range(max_depth):
    candidates = []
    for state in states:
        thoughts = generate_thoughts(LM, state, k)
        for thought in thoughts:
            candidates.append(state.append(thought))

    scored = [(evaluate_state(LM, s), s) for s in candidates]
    states = select_top_b(scored, breadth=b)

return choose_final_output(states)
```

```python
# ToT-DFS 简化伪代码
def dfs(state, depth):
    if depth == max_depth:
        record_solution(state)
        return

    candidates = generate_thoughts(LM, state, k)
    scored = sort_by_value(candidates, key=lambda z: evaluate_state(LM, state.append(z)))

    for value, thought in scored:
        if value < prune_threshold:
            continue
        dfs(state.append(thought), depth + 1)
```

thought 的粒度是 ToT 是否有效的关键。如果 thought 太小，例如单个 token，LM 很难判断它对最终解是否有意义；如果 thought 太大，例如一次生成完整文章或完整证明，搜索又退化为普通多样本采样。论文在不同任务中采用不同粒度：Game of 24 的 thought 是一步中间算式，Creative Writing 的 thought 是一个段落级写作计划，Mini Crosswords 的 thought 是某个横向或纵向词的候选填充。这个选择让每个节点既足够短，可以展开多个候选，又足够有语义，可以被 LM 评价前景。

在 Game of 24 中，ToT 的生成器会根据当前剩余数字提出下一步算式，例如把 `4 9 10 13` 扩展成 `13 - 9 = 4 (left: 4 4 10)` 等候选；评价器则判断剩余数字是否 `sure`、`maybe` 或 `impossible` 达到 24。BFS 每层保留最有希望的若干状态，避免把计算预算浪费在显然不可能的分支。这个过程解释了为什么 ToT 可以远超 CoT：CoT 第一步如果选错算式，完整链路大概率失败；ToT 可以在第一层同时保留多个算式，并用 lookahead 式语言判断淘汰明显坏的路径。

在 Creative Writing 中，状态是否好很难用硬规则判断，因此论文采用投票式评价：先采样多个写作计划，让 LM 比较哪一个最能满足四个给定句子的结尾约束，再基于最佳计划生成文章。Mini Crosswords 则更接近传统约束搜索，DFS 根据候选词置信度向深处探索，如果某个状态导致任何剩余 clue 被判为 impossible，就剪掉该子树并回溯。由此可以看出 ToT 的本质是一个可插拔框架：同样是 thought tree，不同任务可以换 thought 粒度、生成 prompt、评价 prompt 和搜索策略。

与 CoT、CoT-SC 的区别可以用树的宽度和深度理解。IO prompting 是深度几乎为 0 的直接映射；CoT 是宽度为 1 的单链；CoT-SC 是采样多条完整链后只在叶子层投票；ToT 则允许在中间层做局部选择、剪枝和回溯。它的代价是调用 LM 次数显著增加，且自评不一定可靠；但对于需要战略前瞻、组合搜索和早期决策纠错的问题，这种额外计算能换来远强于线性解码的全局控制。

> ⚠️ 注意：ToT 并不是要求模型“输出树状文本”，而是外部推理程序把多次 LM 生成与评价组织成树搜索；LM 既是生成器，也是启发式评价器。

#### 🧪 练习题

```yaml
question: "Tree of Thoughts 相比 CoT-SC 的主要区别是什么？"
options:
  - "ToT 只采样一个最终答案，因此成本更低"
  - "ToT 在中间 thought 层级进行生成、评价、剪枝和回溯，而不是只对完整推理链投票"
  - "ToT 必须训练一个新的神经网络价值函数"
  - "ToT 只能用于数学题，不能用于写作或填字任务"
answer: 1
explain: "CoT-SC 通常采样完整链路后做叶子层聚合；ToT 把每个中间 thought 当作搜索节点，在过程中持续评价和选择分支。"
```
