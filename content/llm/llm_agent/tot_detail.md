### 思维树 (Tree of Thoughts)

```yaml
id: tot
name: ToT
full_name: 思维树 (Tree of Thoughts)
year: '2023'
org: 普林斯顿/Google DeepMind
paper_url: https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html
category: planning
parent: cot
motivation: 树结构推理支持搜索与回溯
```

#### 📝 一句话总结

Tree of Thoughts 将 CoT 的单条左到右推理扩展为对“thought”节点的树搜索，让 LLM 生成、评估并回溯多个中间推理路径，以解决需要探索和前瞻的复杂问题。

#### 🎯 核心要点

- **Thought 作为搜索单元**：一个 thought 是比 token 更高层的自然语言中间步骤
- **状态定义**：状态 \(s=[x,z_{1\cdots i}]\) 包含原问题和当前已生成 thought 序列
- **四个模块问题**：thought 分解、候选生成、状态评估、搜索算法选择
- **生成策略**：支持独立采样多个 thoughts 或在同一上下文中 propose 多个候选
- **评估策略**：LLM 可对状态打分、投票，或标注 sure/maybe/impossible
- **搜索策略**：可用 BFS、DFS 等算法进行前瞻与回溯
- **典型结果**：在 Game of 24 中，GPT-4 + CoT 成功率很低，而 ToT 通过搜索显著提升

#### 🔬 深入细节

##### 核心示意图

![Tree of Thoughts 示意图](https://ar5iv.labs.arxiv.org/html/2305.10601/assets/x1.png)
*图：ToT 将 IO、CoT、Self-Consistency 等看作有限深度或宽度的特例，并显式维护多分支 thought 树。图源：ar5iv 论文 HTML。*

##### 算法伪代码

```python
# ToT-BFS 简化伪代码
def tree_of_thoughts_bfs(problem, model, steps, branch_factor, beam_width):
    states = [State(problem=problem, thoughts=[])]

    for depth in range(steps):
        candidates = []
        for state in states:
            thoughts = generate_thoughts(model, state, k=branch_factor)
            for thought in thoughts:
                new_state = state.extend(thought)
                value = evaluate_state(model, new_state)
                candidates.append((value, new_state))

        states = select_top_b(candidates, b=beam_width)

        for value, state in states:
            if is_solution(state):
                return extract_answer(state)

    return best_state(states).answer()
```

##### 方法解读

CoT 的局限在于它通常只生成一条推理链。一旦早期步骤选错，后续 token 会围绕错误前提继续展开。Self-Consistency 通过多次采样缓解这个问题，但每条链之间仍然独立，不能在中间节点进行系统性比较、剪枝或回溯。ToT 把推理过程显式建模为树搜索。

ToT 的基本状态是 \(s=[x,z_{1\cdots i}]\)，其中 \(x\) 是问题，\(z_i\) 是第 \(i\) 个 thought。thought 的粒度由任务决定：Game of 24 中可以是一条中间算式，创意写作中可以是一段提纲，填字游戏中可以是一个候选词。高层语义单元让搜索空间比 token 级搜索更可控。

候选生成有两种常见方式。Sample 方式从同一状态独立采样多个 \(z\)，适合开放任务；Propose 方式让模型一次列出多个不同候选，适合 thought 空间较受约束的任务。可表示为：

$$[z^{(1)},\ldots,z^{(k)}]\sim p_\theta^{\text{propose}}(z_{i+1}^{(1\cdots k)}\mid s)$$

评估函数 \(V(s)\) 也是由 LLM 实现。它可以直接给状态打分，也可以多次投票，或者在 Game of 24 中判断当前中间算式是否 sure、maybe、impossible。这个评估不是最终答案验证，而是搜索启发式，用来决定哪些分支值得继续扩展。

搜索算法把生成和评估组合起来。BFS 在每一层保留 top-\(b\) 状态，适合需要逐层推进的问题；DFS 可以沿着高分分支深入，在不满足阈值时回溯，适合深度较大或候选较多的问题。ToT 的模块化使同一个框架可以替换基础模型、thought 粒度、价值函数和搜索策略。

> 💡 关键：ToT 的创新点是把 LLM 从“下一个 token 生成器”提升为“候选生成器 + 状态评估器”，再用经典搜索算法控制推理过程。

#### 🧪 练习题

```yaml
question: "Tree of Thoughts 相比 Chain-of-Thought 的核心区别是什么？"
options:
  - "ToT 不生成任何中间步骤"
  - "ToT 维护多个 thought 分支，并用评估与搜索进行选择和回溯"
  - "ToT 只适用于检索增强问答"
  - "ToT 必须微调模型参数"
answer: 1
explain: "CoT 通常是一条线性推理链；ToT 把中间推理表示为树节点，允许生成多个候选、评估状态并搜索。"
```
