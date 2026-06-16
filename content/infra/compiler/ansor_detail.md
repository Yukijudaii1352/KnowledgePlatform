### Ansor — 无模板高性能张量程序自动生成

```yaml
id: ansor
name: Ansor
full_name: 无模板高性能张量程序自动生成 (Ansor)
year: '2020'
org: UC Berkeley
paper_url: https://www.usenix.org/conference/osdi20/presentation/zheng
category: tensor_ir
parent: autotvm
motivation: 无需专家模板自动构建搜索空间，覆盖更广优化可能性
```

#### 📝 一句话总结

Ansor 提出无需手写 schedule template 的张量程序生成框架，用“sketch + annotation”的分层搜索空间自动覆盖算子和子图优化，再通过随机采样、进化搜索、学习型代价模型和任务调度器找到高性能程序，解决 AutoTVM 等模板式搜索空间覆盖不足的问题。

#### 🎯 核心要点

- **无模板搜索空间**：从计算 DAG 自动生成 sketch，避免为每个算子和硬件后端手写 schedule template
- **分层表示**：sketch 捕获多级 tiling、融合、cache stage、rfactor 等高层结构；annotation 随机填充 tile size、parallel、vectorize、unroll、compute location 等低层选择
- **完整程序采样**：随机采样完整程序后再评估，避免 Halide auto-scheduler 式逐步构造中对 incomplete program 的不准确剪枝
- **进化搜索**：用 tile size mutation、parallel mutation、pragma mutation、computation location mutation、node-based crossover 对完整程序做 out-of-order rewrite
- **学习型代价模型**：提取算术和访存特征，用梯度提升树预测程序吞吐，采用对高吞吐程序加权的平方误差训练
- **任务调度器**：当一个 DNN 被切成多个 subgraph 时，用近似梯度选择最可能改善端到端性能的任务分配 tuning 预算
- **端到端效果**：论文在 Intel CPU、ARM CPU、NVIDIA GPU 上评估 ResNet-50、MobileNet-V2、3D-ResNet、DCGAN、BERT 等模型，相比当时最佳替代方案分别可达约 3.8×、2.6×、1.7× 加速

#### 🔬 深入细节

![Ansor 系统总览](https://ar5iv.labs.arxiv.org/html/2006.06762/assets/x4.png)
*图：Ansor 系统架构。DNN 先被 Relay 分割为 subgraph，任务调度器分配优化预算，program sampler 生成初始程序，performance tuner 用进化搜索和代价模型筛选，measurer 把真实运行时间反馈给系统。*

```python
# Ansor 主流程伪代码
def ansor_optimize(dnn, target, max_trials):
    subgraphs = relay_partition_and_fuse(dnn)
    tasks = [SearchTask(g) for g in subgraphs]
    cost_model = GradientBoostedTree()
    history = []

    # warm-up: 给每个任务少量 round-robin 测量
    for task in tasks:
        sketches = generate_sketches(task.dag)           # multi-level tiling, fusion, cache, rfactor
        programs = random_annotate(sketches, target)     # tile sizes, vectorize, parallel, unroll
        measured = compile_run_measure(programs[:k], target)
        history.extend(measured)

    while len(history) < max_trials:
        task = task_scheduler_pick(tasks, history)       # argmax |partial objective / partial budget|
        population = sample_programs(task) + best_seen(task, history)

        for gen in range(num_generations):
            candidates = mutate_and_crossover(population)
            scores = cost_model.predict(candidates)
            population = select_top_and_diverse(candidates, scores)

        batch = topk(population, by=cost_model.predict)
        measured = compile_run_measure(batch, target)
        history.extend(measured)
        cost_model.fit(history, weighted_square_loss)

    return best_program_per_subgraph(history)
```

**动机：AutoTVM 的模板空间太依赖专家，Halide 式逐步搜索又会过早剪枝。** 深度学习算子高性能实现包含 tile structure、tile size、fusion、cache、vectorization、parallelization、unroll、layout rewrite、reduction factorization 等组合。AutoTVM 能做高效搜索，但搜索空间由手写模板定义，新增算子、新硬件或跨算子融合都需要专家重写模板。Halide auto-scheduler 用固定顺序逐步构造程序并用 cost model 剪枝，但中间状态不是完整可测程序，最终性能很难准确估计。Ansor 的策略是：先自动生成足够大的结构空间，再随机采样完整程序，最后只对完整程序做代价模型排序和真实测量。

**Sketch 是高层结构，annotation 是低层选择。** Ansor 对计算 DAG 按拓扑序从输出向输入应用 derivation rule。典型规则包括 Skip、Always Inline、Multi-level Tiling、Multi-level Tiling with Fusion、Add Cache Stage、Reduction Factorization。以 CPU 为例，多级 tiling 采用 `SSRSRS` 结构，其中 `S` 表示 space loop tile，`R` 表示 reduction loop tile；GPU 版本改成 `SSSRRSRS`，前三个 space tile 分别绑定到 `BlockIdx`、virtual thread 和 `ThreadIdx`。sketch 数量通常小于 10，但每个 sketch 的 annotation 组合可达到数十亿级。

**随机 annotation 保证覆盖，进化搜索负责变好。** 对每个 sketch，Ansor 随机填 tile size、并行化外层 loop、向量化内层 loop、设置 unroll pragma，并随机调整部分节点的 compute location。随机采样本身不保证性能，但它让搜索空间里的每个完整程序都有非零机会被选中，避免 beam search 对 incomplete program 的早期偏见。进化阶段再针对完整程序做局部改写：tile size mutation 在不同 tile level 之间转移因子并保持乘积不变，因此程序仍合法；parallel mutation 改并行粒度；pragma mutation 改 unroll 等编译器 hint；node-based crossover 以 DAG 节点为粒度合并不同父程序的 rewrite history，降低破坏依赖的风险。

**代价模型预测的是程序吞吐，并更重视快程序。** Ansor 对每个 innermost non-loop statement 提取特征，包括算术量、内存访问模式和所在上下文；完整程序 \(P\) 的预测吞吐是语句得分之和。论文使用加权平方误差：

$$
loss(f, P, y) = w_p\left(\sum_{s \in S(P)} f(s) - y\right)^2
= y\left(\sum_{s \in S(P)} f(s) - y\right)^2
$$

其中 \(S(P)\) 是程序中的 innermost non-loop statements，\(y\) 是真实吞吐并同时作为权重。这个选择体现了目标偏好：搜索并不需要准确预测所有慢程序，只要能把最有希望的快程序排到前面即可。每轮真实测量后，新的 `(program, throughput)` 样本会加入训练集，代价模型重新训练并服务下一轮进化搜索。

**任务调度器解决“整个 DNN 有很多子图”的预算分配。** Relay 会把模型分成多个 subgraph，例如 `conv2d + relu`。如果每个 subgraph 都给固定 tuning 次数，预算会浪费在不影响端到端延迟的小节点上。Ansor 把每个任务 \(i\) 已分配的优化时间记作 \(t_i\)，用目标函数 \(f(t)\) 表示端到端指标，并近似选择：

$$
i^* = \operatorname*{argmax}_i \left|\frac{\partial f}{\partial t_i}\right|
$$

直觉是：优先调“继续投入最可能改善整体目标”的 subgraph。刚开始任务会 round-robin warm-up；之后如果某个大延迟 subgraph 连续 tuning 没有改进，它的边际收益估计会下降，调度器会把预算转给其他瓶颈。

**与 AutoTVM 的根本差异在搜索空间来源。** AutoTVM 的调优能力很强，但它搜索的是模板作者预先写出的网格；如果最优程序需要模板之外的 cache node、fusion pattern 或 reduction factorization，搜索永远碰不到。Ansor 的 sketch rule 是通用 derivation，不绑定某个算子模板；用户也可以注册新的 derivation rule 来覆盖 Winograd、TensorCore 或特殊加速器 intrinsic。它因此更像“自动构造搜索空间 + 学习型筛选”，而不是“专家给搜索空间 + 自动找参数”。

#### 🧪 练习题

```yaml
question: "Ansor 为什么要先随机采样完整程序，而不是像逐步构造方法那样对 incomplete program 做 beam search 剪枝？"
options:
  - "完整程序不需要编译，因此测量成本更低"
  - "完整程序的最终性能可以真实测量和训练代价模型，避免对中间状态做不可靠估计"
  - "随机采样会自动找到全局最优，因此不需要后续搜索"
  - "beam search 无法处理任何矩阵乘法程序"
answer: 1
explain: "Ansor 认为 incomplete program 的最终性能难以准确预测，早期剪枝会排除潜在好程序；因此先生成完整程序，再用进化搜索、代价模型和真实测量逐步优化。"
```
