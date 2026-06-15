### Galvatron: 自动并行搜索

```yaml
id: galvatron
name: Galvatron
full_name: 自动并行搜索 (Galvatron)
year: '2022'
org: PKU/Alibaba
paper_url: https://arxiv.org/abs/2211.13878
category: hybrid
parent: —
motivation: 自动搜索最优3D并行配置
```

#### 📝 一句话总结

Galvatron 通过 cost model、决策树剪枝和动态规划，在 DP/TP/PP/重计算等大规模混合并行空间中自动搜索 Transformer 的高吞吐训练策略，解决手工配置 3D 并行难以适配模型和显存预算的问题。

#### 🎯 核心要点

- 覆盖数据并行、张量并行、流水线并行和 activation checkpointing 等常用训练策略组合。
- 用 profiling + analytical model 预测每层在不同并行策略下的时间和显存。
- 决策树先按经验约束分解和剪枝巨大搜索空间，避免直接枚举所有层策略组合。
- 动态规划为每层选择并行策略，并考虑相邻层策略切换产生的 resharding 通信。
- 在 BERT、GPT、T5、Swin 等 Transformer 工作负载上，在不同显存预算下均能自动找到优于有限搜索或手工方案的吞吐。

#### 🔬 深入细节

##### 核心示意图

![Galvatron 系统流程](https://ar5iv.labs.arxiv.org/html/2211.13878/assets/x1.png)
*图：Galvatron 先建立并行策略成本模型，再通过搜索生成每层混合并行计划并执行训练。*

##### 算法伪代码

```python
# Galvatron dynamic programming search
def search_parallel_plan(layers, devices, memory_budget):
    strategies = build_strategy_set(dp=True, tp=True, pp=True, checkpoint=True)
    strategies = decision_tree_prune(strategies, model_shape=layers[0].shape)

    dp = {}
    for l, layer in enumerate(layers):
        for s in strategies[layer.type]:
            cost = compute_time(layer, s) + memory_penalty(layer, s, memory_budget)
            if l == 0:
                dp[l, s] = cost
            else:
                dp[l, s] = min(
                    dp[l - 1, prev] + reshard_cost(prev, s) + cost
                    for prev in strategies[layers[l - 1].type]
                )

    return backtrack_min_cost_plan(dp)
```

##### 方法解释

Transformer 训练的并行空间很大。DP 简单但显存复制严重；TP 降低单层参数和激活压力但引入层内 collective；PP 降低层级显存但有 pipeline bubble；checkpoint 节省激活但增加重算。不同模型结构、batch size、序列长度和 GPU 拓扑下，最佳组合不同，手工调参很难覆盖。

Galvatron 的第一步是为候选策略建立成本模型。对每个层和并行策略，它估计计算时间、通信时间、激活/参数/优化器显存以及 checkpoint 后的重算开销。相邻层若采用不同张量布局，还要加入 resharding cost，因为输出张量可能需要从一种切分方式转换到另一种切分方式。

搜索空间剪枝依靠决策树。论文把一些显然劣势或不适用的组合提前排除，例如在显存预算宽松时不必过度 checkpoint，在通信极重的策略上限制 TP 组合。剪枝后的核心问题可视为序列决策：每层选一个策略，使总时间最小且显存不超限：

$$
\min_{s_1,\ldots,s_L} \sum_{l=1}^{L} T(l,s_l)+\sum_{l=2}^{L} R(s_{l-1},s_l)
$$

其中 \(R\) 是策略切换的重分片通信。

> 💡 关键：Galvatron 的自动化价值不只是选一个全局 TP/PP/DP 度，而是允许不同层在约束下选择不同策略，并把切换成本纳入搜索。

##### 与手工 3D 并行的区别

手工 3D 并行通常为整个模型选择固定 \(dp,tp,pp\)，再微调 microbatch 和 checkpoint。Galvatron 把策略粒度下放到层，并用模型/硬件 profile 适配不同显存预算。相比只搜索 pipeline 切分或只搜索 tensor parallel 的系统，它的搜索空间更接近实际大模型训练栈的组合复杂度。

#### 🧪 练习题

```yaml
question: "Galvatron 动态规划中为什么要考虑相邻层策略切换成本？"
options:
  - "因为不同并行策略可能产生不同张量切分，层间需要 resharding 通信"
  - "因为所有层必须使用完全相同的参数"
  - "因为动态规划不能处理显存约束"
  - "因为 pipeline parallelism 不会产生通信"
answer: 0
explain: "层策略不同会导致输出布局不匹配，重分片通信可能抵消局部策略收益。"
```
