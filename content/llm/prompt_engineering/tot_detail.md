### ToT: 思维树 (Tree of Thoughts)
```yaml
id: tot
name: ToT
full_name: 思维树 (Tree of Thoughts)
year: '2023'
org: Princeton/Google
paper_url: https://proceedings.neurips.cc/paper/2023/hash/271db9922b8d1f4dd7aaef84ed5ac703-Abstract.html
category: reasoning
parent: cot
motivation: 引入搜索算法探索与回溯思维路径
```

#### 📝 一句话总结
Tree of Thoughts 将中间推理步骤建模为树节点，用语言模型生成、评估并搜索多个思维分支，解决了 CoT 单路径推理无法系统探索和回溯的问题。

#### 🎯 核心要点
- 将 thought 定义为可作为中间步骤的连贯语言片段
- 状态表示为输入加已生成 thought 序列 \(s=[x,z_{1:i}]\)
- 四个核心设计：thought decomposition、generation、evaluation、search
- 支持 BFS、DFS 等显式搜索策略和回溯
- 语言模型既可生成候选 thought，也可作为启发式评估器
- 在 Game of 24、Creative Writing、Mini Crosswords 等任务上展示优势

#### 🔬 深入细节
![Tree of Thoughts 框架图](https://ar5iv.labs.arxiv.org/html/2305.10601/assets/x1.png)
*图：论文 Figure 1，对比输入输出、CoT、自洽 CoT 与 ToT 的问题求解结构。图源：ar5iv / arXiv。*

```python
# ToT-BFS 简化伪代码
def tot_bfs(lm, problem, depth, branch, beam):
    frontier = [State(problem=problem, thoughts=[])]
    for t in range(depth):
        candidates = []
        for state in frontier:
            thoughts = generate_thoughts(lm, state, k=branch)
            for z in thoughts:
                next_state = state.extend(z)
                score = evaluate_state(lm, next_state)
                candidates.append((score, next_state))
        frontier = [s for _, s in sorted(candidates, reverse=True)[:beam]]
    return select_best_solution(lm, frontier)
```

ToT 把问题求解写成搜索问题。每个节点是一个 partial solution：

$$
s_i = [x, z_1, z_2, \ldots, z_i]
$$

其中 \(x\) 是原问题，\(z_i\) 是第 \(i\) 个 thought。模型不再一次性生成完整答案，而是在每个状态上生成若干候选 thought，再用评估函数估计这些状态离成功有多近。

论文将 ToT 的实例化拆成四个问题。第一，如何把任务过程分成 thought 粒度，例如 Game of 24 中一步算式就是一个 thought。第二，如何生成候选 thought，可以独立采样或按 prompt 提议多个候选。第三，如何评估状态，可以让模型打分、投票或判断可行性。第四，使用哪种搜索策略，例如 BFS 保留 top-\(b\) 状态，DFS 在低分时回溯。

与 Self-Consistency 相比，ToT 不只是采样多条完整推理链后投票，而是在中间层面就进行选择。错误分支可以提前剪枝，有希望的分支可以继续展开。这种 lookahead 和 backtracking 对组合搜索任务尤其重要，因为早期一个错误步骤会导致后续全部无效。

ToT 的代价是推理调用次数显著增加，并且需要为任务定义 thought 粒度和评估 prompt。它更适合高价值、可分步搜索、可评估中间状态的任务；对于简单问答，普通 CoT 或 Self-Consistency 往往更便宜。

> 💡 关键：ToT 把 prompt 从“线性续写”升级为“语言模型驱动的启发式搜索”。

#### 🧪 练习题
```yaml
question: "ToT 相比普通 CoT 的关键增强是什么？"
options:
  - "只输出最终答案"
  - "维护多个 thought 分支并用搜索策略选择和回溯"
  - "禁止模型生成中间步骤"
  - "只依赖监督微调"
answer: 1
explain: "ToT 将中间推理表示为树节点，通过生成、评估和搜索探索多条候选路径。"
```
