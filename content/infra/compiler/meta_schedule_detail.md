### MetaSchedule — Tensor Program Optimization with Probabilistic Programs

```yaml
id: meta_schedule
name: MetaSchedule
full_name: 概率化张量程序调度框架 (MetaSchedule)
year: '2022'
org: CMU/OctoML
paper_url: https://proceedings.neurips.cc/paper_files/paper/2022/hash/e894eafae43e68b4c8dfdacf742bcbf3-Abstract-Conference.html
category: tensor_ir
parent: ansor
motivation: 概率程序统一调度搜索空间，泛化模板与无模板调优
```

#### 📝 一句话总结

MetaSchedule 提出一种用概率程序描述张量程序调度搜索空间的方法，将“如何构造搜索空间”和“如何在空间中搜索”解耦，解决 Ansor 等自动调度器搜索规则难以模块化扩展、硬件新知识难以注入的问题。

#### 🎯 核心要点

- **概率化搜索空间**：把候选张量程序表示为初始程序 \(e_0\) 加一串参数化变换 \(\tau\)，变换参数由 `Sample-Tile`、`Sample-Compute-Location` 等随机原语产生
- **随机变换模块**：每个 transformation module 包含程序分析、采样和调度变换，可组合出多级 tiling、auto-inline、cross-thread reduction、tensor-core 等搜索空间片段
- **执行追踪**：MetaSchedule 嵌入 Python，但只记录采样和调度变换指令，形成可重放的 trace，避免反复执行宿主语言控制流
- **学习驱动搜索**：基于 trace 变异候选程序，用 validator 过滤非法变换，再用 learned cost model \(\hat f\) 和退火 Metropolis-Hastings 接受/拒绝候选
- **搜索空间与搜索算法解耦**：同一概率程序搜索空间可接入演化搜索、贝叶斯优化或强化学习；同一搜索器也可服务不同 transformation modules
- **兼容模板与无模板调优**：可覆盖 AutoTVM 模板式调参、Ansor 自动调度规则和专家手写硬件特化规则
- **硬件特化可扩展**：论文展示 `Use-Tensor-Core` 模块可作为额外知识组合进已有空间，在 BERT-large workload 上相对 TVM/AutoTVM 带来 48% 端到端加速

#### 🔬 深入细节

![MetaSchedule 学习驱动搜索流程](https://ar5iv.labs.arxiv.org/html/2205.13603/assets/x7.png)
*图：MetaSchedule 从 transformation modules 采样 trace，变异随机变量生成候选程序，用 validator、cost model 和硬件实测共同更新搜索。来源：论文 Figure 7。*

![MetaSchedule 概率语言示意](https://ar5iv.labs.arxiv.org/html/2205.13603/assets/x3.png)
*图：概率程序同时包含随机变量采样和依赖随机变量的程序变换；一次采样对应搜索空间中的一个具体调度 trace。来源：论文 Figure 3。*

```python
# MetaSchedule 核心流程伪代码：概率搜索空间 + 学习驱动搜索
def multi_level_tiling(loop_nest):
    tiles = [[] for _ in range(5)]

    def tile_loop(loop, tile_ids):
        theta = sample_tile(loop, parts=len(tile_ids))  # 随机变量
        tiled = split(loop, theta)                      # 调度变换
        for tile_id, tile in zip(tile_ids, tiled):
            tiles[tile_id].append(tile)

    for loop in loop_nest:
        if is_spatial_loop(loop):
            tile_loop(loop, [0, 1, 3])
        elif is_reduction_loop(loop):
            tile_loop(loop, [2, 4])
    reorder(concat(tiles))


def meta_schedule_optimize(program_e0, modules, hardware):
    traces = []
    cost_model = TreeBoostingCostModel()
    measured = []

    # 1. 运行概率程序，追踪采样与调度变换
    for _ in range(num_initial_samples):
        trace = run_and_trace(program_e0, modules)
        traces.append(trace)

    # 2. 在 trace 条件空间中搜索
    for round_id in range(num_rounds):
        proposals = []
        for trace in traces:
            mutated = mutate_random_choices(trace)
            if validator(mutated):
                latency_hat = cost_model.predict(apply_trace(program_e0, mutated))
                proposals.append((mutated, latency_hat))

        accepted = annealed_metropolis_hastings(proposals, temperature(round_id))
        real_latency = measure_on_hardware(program_e0, accepted, hardware)
        measured.extend(zip(accepted, real_latency))
        cost_model.update(measured)
        traces = update_trace_pool(traces, accepted, real_latency)

    return best_measured_program(measured)
```

**动机与背景：搜索空间才是自动调度的上限。** AutoTVM 依赖模板显式枚举 tile、unroll、vectorize 等调度参数，Ansor 进一步用无模板规则生成更大的搜索空间，但这些规则通常写死在调度系统内部。问题不在于学习搜索不重要，而是搜索器只能在给定空间内找最优；当新硬件提供 tensor core、新算子需要特殊 fusion、新后端需要不同 memory hierarchy 策略时，开发者往往要“手术式”修改调度框架。MetaSchedule 的核心观点是：搜索空间本身应成为可编程对象，专家知识应以模块化概率变换的形式被组合，而不是散落在调度器内部。

**搜索空间表示：从离散网格变成状态相关的概率程序。** 对初始张量程序 \(e_0\)，MetaSchedule 不直接枚举一个静态参数网格，而是执行一段概率程序。程序在每个状态 \(e_i\) 上先做分析，再采样随机变量 \(\theta_i\)，最后施加语义保持的调度变换 \(t_i\)，得到 \(e_{i+1}\)。因此候选程序可写作：

$$
e_\tau = g(e_0, \tau), \quad \tau = (t_1(\theta_1), t_2(\theta_2), \ldots, t_n(\theta_n)).
$$

这里的关键不是“随机”本身，而是随机变量的分布可以依赖当前程序结构。例如 ReLU 的 compute-at 位置必须在 Dense tiling 后的合法循环层级中采样；后一个随机选择的取值域由前面所有变换共同决定。这比 AutoTVM 式正交参数网格更贴近张量调度：循环分裂、重排、融合、tensorization 之间有长期结构依赖。

**Transformation module 是可复用的调度知识单元。** 一个模块可以是原子变换，也可以是多个变换的组合。`Multi-Level-Tiling` 先分析空间轴和归约轴，再分别采样 tile 因子，最后把各层 tile 按硬件友好的顺序 `Reorder`；`Auto-Inline` 可处理 elementwise 内联；`Use-Tensor-Core` 可把特定矩阵乘模式映射到硬件 tensor intrinsic。模块组合时，系统在可应用位置上采样模块并施加变换，形成复杂搜索空间。这样做的直接收益是：新增硬件特化知识只需新增模块并组合，不必改写搜索器。

**学习驱动搜索：把优化问题写成后验最大化。** 论文将变换 trace \(\tau\) 的搜索形式化为 MAP 估计。若 \(f(e)\) 是真实硬件延迟，越小越好，则候选 trace 的后验可写作：

$$
P(\tau \mid e_0) \propto \exp\left(-f(g(e_0,\tau))\right) P(\tau),
$$

$$
\tau^\star = \arg\max_\tau P(\tau \mid e_0).
$$

真实测量 \(f(e)\) 代价高，因此系统训练代理代价模型 \(\hat f(e)\)。搜索时对 trace 中的随机变量做 mutation，非法程序由 validator 丢弃，合法候选通过退火 Metropolis-Hastings 机制接受或拒绝：

$$
\alpha(\tau \rightarrow \tau') =
\min\left(1,\exp\left(-\frac{\hat f(g(e_0,\tau'))-\hat f(g(e_0,\tau))}{T}\right)
\frac{P(\tau')}{P(\tau)}\right).
$$

温度 \(T\) 高时更容易探索差一点的候选，温度降低后逐步偏向利用代价模型预测的低延迟候选。被选中的程序会在真实硬件上测量，结果再用于更新 \(\hat f\)。这保留了 Ansor 一类学习搜索的优点，但搜索空间不再由固定 C++/Python 规则硬编码。

**与 Ansor 的关系和差异。** Ansor 的核心贡献是自动生成 schedule sketches 并用学习代价模型搜索，它已经摆脱 AutoTVM 模板的人工参数网格。MetaSchedule 则进一步抽象“sketch/rule 本身”：调度规则被写成概率 transformation modules，搜索器只消费 trace 与随机选择。换句话说，Ansor 偏向提供一套强内置规则，MetaSchedule 提供一个可扩展的规则语言与统一搜索框架；二者不是简单替代关系，MetaSchedule 可以覆盖 Ansor 式空间，同时允许领域专家持续增加新模块。

> 💡 关键：MetaSchedule 的“概率程序”不是为了做贝叶斯建模而引入复杂统计框架，而是为了表达状态相关、可组合、可追踪、可学习搜索的调度空间。

#### 🧪 练习题

```yaml
question: "MetaSchedule 相比 Ansor 的核心抽象变化是什么？"
options:
  - "用固定模板替代自动调度规则"
  - "只优化图级算子融合，不再优化张量程序"
  - "把调度搜索空间构造写成可组合的概率程序，并与搜索算法解耦"
  - "完全取消硬件实测，只依赖静态代价模型"
answer: 2
explain: "MetaSchedule 的重点是用随机采样和调度变换组成 transformation modules，让搜索空间可编程、可追踪、可扩展；搜索器仍会结合代价模型和真实硬件测量。"
```
