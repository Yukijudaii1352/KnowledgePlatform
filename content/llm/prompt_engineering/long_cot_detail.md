### Long-CoT：长思维链缩放 (Long-CoT Scaling)
```yaml
id: long_cot
name: Long-CoT
full_name: 长思维链缩放 (Long-CoT Scaling)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/f3b336ac87912786ef2d72238058cb4f-Abstract-Conference.html
category: frontier_2026
parent: cot
motivation: 长推理链在复杂任务中指数级增益
```

#### 📝 一句话总结
Long-CoT 证明并实证展示：在图连通性这类必须逐步传播信息的推理任务上，把测试时计算预算用于一条更长的思维链，可能比生成大量短思维链再投票具有指数级优势。

#### 🎯 核心要点
- 将测试时计算明确区分为并行缩放和顺序缩放：前者生成多条短回答并用 best-of-n 或 majority vote 聚合，后者让模型在单条 CoT 中持续推进多步推理。
- 构造 \((s,t_1,t_2)\)-connectivity 图连通性任务：给定边列表和三个节点，保证 \(s\) 只与 \(t_1,t_2\) 中一个相连，模型必须找出可达目标。
- 给出基于 transformer 表达能力的理论分离：多项式长度 CoT 可以实现 BFS 等多项式时间算法，而多项式数量的 \(O(1)\) 长度 CoT 在复杂性假设下仍无法解决连通性。
- 提出 Vertex Query Model (VQM/RVQM) 抽象：把 CoT 每一步视为一次局部邻域查询，用 two-path 和 bridge graph 得到更细粒度的顺序与并行差距。
- 在 bridge graph 中证明并行缩放需要 \(\exp(\Omega(d))\) 条独立短链才能把成功率提升到常数水平，而一条足够长的顺序链可以沿图结构逐层推进。
- 实验覆盖从头训练的小型 transformer、DeepSeek-R1-Distill-Qwen-32B 以及 AIME2024 等设置，趋势一致支持长 CoT 在串行依赖任务上的价值。

#### 🔬 深入细节
![Long-CoT 并行与顺序缩放对比](https://github.com/seyedparsa/let-me-think/raw/main/figures/figure1.png)
*图：论文和官方代码仓库给出的 Figure 1。横轴是单条 CoT 的顺序长度预算，纵轴是独立 CoT 数量，可以看到减少少量顺序预算往往需要大幅增加并行样本数才能补偿。*

```python
# Long-CoT 顺序缩放与并行缩放的核心流程抽象
def solve_connectivity_with_test_time_scaling(graph, s, t1, t2, mode, seq_budget, parallel_budget):
    targets = {t1, t2}

    def one_long_cot():
        frontier = [s]
        visited = {s}
        trace = []
        while frontier and len(trace) < seq_budget:
            v = frontier.pop()
            trace.append(v)
            if v in targets:
                return v, trace
            for u in graph.neighbors(v):
                if u not in visited:
                    visited.add(u)
                    frontier.append(u)
        return guess(t1, t2), trace

    def one_short_cot():
        trace = local_or_random_walk(graph, start=s, max_steps=seq_budget)
        answer = extract_target_if_seen(trace, targets) or guess(t1, t2)
        return answer, trace

    if mode == "sequential":
        return one_long_cot()

    votes = []
    for _ in range(parallel_budget):
        answer, trace = one_short_cot()
        if verifies_path(trace, s, answer, graph):
            return answer, trace      # best-of-n: 找到可验证证据就采用
        votes.append(answer)
    return majority_vote(votes), None # majority: 短链没有足够证据时只能靠统计聚合
```

这篇论文的核心不是提出一个新的提示模板，而是给 Long-CoT 一个可分析的计算视角。作者把测试时计算分成两类：并行缩放用 \(N\) 条互不通信的短推理链提高覆盖率，顺序缩放用一条更长的 CoT 把中间状态不断传递下去。对于每一步都依赖前一步发现的任务，这两类预算并不等价，因为短链之间不能共享已经探索到的节点、分支判断或局部证据。

论文选择图连通性作为最小但足够有代表性的串行推理任务。标准 \((s,t)\)-connectivity 在不可达时缺少短证书，因此作者改用 \((s,t_1,t_2)\)-connectivity：保证 \(s\) 恰好和两个候选目标中的一个连通。这样正确答案总能由一条路径证明，CoT 可以自然写成从 \(s\) 出发的节点序列或 DFS 轨迹。输入边被随机排序，节点 ID 也被随机置换，模型不能依靠表面位置捷径，只能逐步恢复图结构。

理论部分先给出极端情形的分离。在 \(TC^0 \not\supseteq L\) 的复杂性假设下，常数长度 CoT 的 bounded-depth transformer 落在低阶电路类中；即便并行采样多项式条，再做 majority vote，本质上仍不足以解决连通性。相反，多项式长度 CoT 可以模拟多项式时间算法，例如 BFS，因此存在常数 \(c>0\)，长度不超过 \(n^c\) 的一条 CoT 可以解决任意规模为 \(n\) 的连通性实例。

为了更贴近真实 CoT 长度预算，作者又提出 Vertex Query Model。VQM 把一次 CoT 推理抽象成一次邻域查询 \(N_G(v)=\{u:\exists(v,u)\in E\}\)，即模型在当前已知节点附近继续探索。two-path 图说明如果路径长为 \(L\)，少于 \((L-2)/2\) 次查询的算法正确率只能是 \(1/2\)，而 \(L-1\) 次查询足以确定答案。bridge graph 更强：每层交叉点都要求做连续分支选择，短链每次都重新开始，优势会随深度指数衰减。

论文中的关键结论可以概括为：

$$
\Pr[\text{parallel succeeds}]
\le \frac{1}{2} + \exp\left(-\Omega(d)\right),
\quad
N_{\text{parallel}} \ge \exp(\Omega(d))
$$

这里 \(d\) 是 bridge graph 深度。直觉上，一条长链可以把每层选择的结果保留下来，并在下一层继续使用；多条短链虽然总 token 数可能相近，但每条链都独立丢失了前面未完成的探索状态，所以很难补偿串行依赖。

实验流程也服务于这个观点。作者训练模型生成 Shortest-Path、Path CoT 和 DFS CoT，并分别用 decision criterion 与 evidence criterion 评估答案和路径证据；并行聚合则使用 majority decision 或 best-of-n。结果显示，只要问题确实需要跨越多层图结构，增加单条 CoT 的长度会出现明显阈值效应，而增加短链数量只能缓慢改善，甚至在低顺序预算区间几乎无效。

> 💡 关键：Long-CoT 的结论不等于“所有任务都应该无限拉长 CoT”。它说明的是，当任务包含不可压缩的串行依赖时，顺序计算和并行采样不是简单可替代关系，提示工程和推理系统应优先保证一条链有足够预算走完整个依赖路径。

#### 🧪 练习题
```yaml
question: "Long-CoT 论文中，为什么 bridge graph 会放大长 CoT 相对多条短 CoT 的优势？"
options:
  - "因为 bridge graph 的节点标签按答案顺序排列，长 CoT 更容易记忆标签"
  - "因为每个交叉点的选择依赖前面已经走到的位置，短 CoT 无法继承连续探索状态"
  - "因为 majority vote 会强制所有短 CoT 输出相同路径"
  - "因为长 CoT 在训练时使用了更多模型参数"
answer: 1
explain: "bridge graph 的难点是连续局部分支选择。长 CoT 能把前面探索到的状态传递到下一步，而互相独立的短链需要反复重新探索，因此并行数量要指数级增长。"
```
