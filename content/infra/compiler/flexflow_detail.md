### FlexFlow: Beyond Data and Model Parallelism for Deep Neural Networks

```yaml
id: flexflow
name: FlexFlow
full_name: "FlexFlow: Beyond Data and Model Parallelism for Deep Neural Networks"
year: 2019
org: Stanford
paper_url: "https://proceedings.mlsys.org/paper_files/paper/2019/hash/b422680f3db0986ddd7f8f126baaf0fa-Abstract.html"
category: graph_compilers
parent: "—"
motivation: "用SOAP四维搜索空间统一数据/模型/流水线并行，MCMC搜索+执行模拟器自动发现最优并行策略，打破并行二元对立"
```

#### 📝 一句话总结

FlexFlow 提出 SOAP（Sample-Operation-Attribute-Parameter）四维并行搜索空间，将数据并行、模型并行和流水线并行统一到一个框架中，并通过执行模拟器（Execution Simulator）+ MCMC 搜索算法自动发现高效的逐算子并行策略，在多种 DNN 上实现了 1.3–3.3× 的训练加速。

#### 🎯 核心要点

- **SOAP 四维搜索空间**：将并行化配置分解为 Sample（批次维度）、Operation（算子间并行）、Attribute（非批次数据维度，如通道/空间）、Parameter（参数复制 vs 切分）四个正交维度
- **逐算子粒度的并行策略**：每个算子独立选择并行配置，而非全图统一使用数据并行或模型并行
- **执行模拟器**：将算子图 + 设备拓扑 + 并行策略映射为任务图（计算任务 + 通信任务），通过 FIFO 调度模拟预测执行时间，比真实执行快约 1000×
- **Delta 模拟算法**：MCMC 每步仅改变一个算子配置，增量更新任务图而非从头模拟，额外加速 2.2–6.9×
- **MCMC 优化器**：使用 Metropolis-Hastings 采样搜索策略空间，以 \(p(\mathcal{S}) \propto \exp(-\beta \cdot \text{cost}(\mathcal{S}))\) 为目标分布，兼顾贪心搜索与跳出局部最优
- **Legion 分布式运行时**：基于 Legion 实现支持任意维度组合切分的分布式执行引擎
- **评估覆盖 CNN + RNN**：在 AlexNet、Inception-v3、ResNet-101、RNNTC、RNNLM、NMT 六个模型上验证，对比数据并行、专家策略、REINFORCE、OptCNN 均有显著提升

#### 🔬 深入细节

##### 1. 问题动机与背景

现有深度学习系统的并行化策略存在两个根本局限：

1. **并行维度受限**：数据并行仅切分批次维度，模型并行仅切分参数维度，无法利用其他维度（如通道、空间维度）的并行机会
2. **粒度过粗**：整个模型使用同一种并行策略，无法为不同特征的算子（计算密集 vs 通信密集）选择最优配置

FlexFlow 的核心洞察是：**最优并行策略应该是逐算子、多维度的**——不同算子可能适合不同的并行方式，且每个算子可以同时在多个维度上切分。

##### 2. SOAP 搜索空间

![FlexFlow SOAP 搜索空间示意图](https://arxiv.org/html/1807.05358v6/extracted/figures/parallelism.png)
*图：SOAP 四维并行空间统一了数据并行（Sample 维度）、模型并行（Operation + Attribute 维度）和流水线并行（Operation 维度）*

对于算子图 \(\mathcal{G} = (\mathcal{O}, \mathcal{E})\)（\(\mathcal{O}\) 为算子集合，\(\mathcal{E}\) 为依赖边），并行策略 \(\mathcal{S}\) 为每个算子 \(o_i\) 指定一个并行配置 \(c_i\)：

$$\mathcal{S} = \{c_1, c_2, \ldots, c_{|\mathcal{O}|}\}$$

每个配置 \(c_i\) 定义了在各可并行维度上的切分度（degree of parallelism）。以矩阵乘法 \(Y = X \times W\) 为例，可并行维度包括：
- **Sample 维度**：切分批次维度，每个设备处理不同的样本子集
- **Attribute 维度**：切分输出通道等非批次维度
- **Parameter 维度**：决定权重是复制（replicate）还是切分（partition）

各维度切分度的乘积等于分配的设备数：

$$\prod_{d \in \text{dims}(o_i)} \text{degree}(c_i, d) = |\text{devices}(c_i)|$$

> 💡 **关键**：SOAP 空间的指数级大小（\(\prod_{i} |C_i|\)，其中 \(|C_i|\) 为算子 \(o_i\) 的可选配置数）使得穷举不可行，这正是需要高效搜索算法的原因。

##### 3. 执行模拟器

执行模拟器是 FlexFlow 的核心组件，它将并行策略的评估从真实硬件执行（分钟级）转化为模拟预测（毫秒级）。

**任务图构建**：给定算子图 \(\mathcal{G}\)、设备拓扑 \(\mathcal{D}\)、并行策略 \(\mathcal{S}\)，模拟器构建任务图 \(\mathcal{T} = (\mathcal{T}_N, \mathcal{T}_E)\)：

- **计算任务**：每个算子 \(o_i\) 根据配置 \(c_i\) 被拆分为 \(|c_i|\) 个计算任务，每个任务在一个设备上执行
- **通信任务**：当两个有依赖关系的任务被分配到不同设备时，插入通信任务

**四个关键假设**：
- **A1**（可预测的任务执行时间）：同一算子的相同大小子任务执行时间一致，通过 profiling 获取
- **A2**（带宽模型）：通信时间 = \(s / b\)，其中 \(s\) 为数据大小，\(b\) 为带宽
- **A3**（FIFO 调度）：同一设备上的任务按就绪时间先进先出执行
- **A4**（可忽略的运行时开销）：任务调度等运行时开销相比计算和通信可忽略

**Full Simulation 算法**（Dijkstra 变体）：

```python
# Algorithm 1: Full Simulation
def full_simulate(G, D, S):
    T = build_task_graph(G, D, S)
    ready_queue = PriorityQueue(key=lambda t: t.ready_time)
    
    for t in T.nodes:
        t.state = NOT_READY
        if t.has_no_predecessors():
            t.state = READY
            ready_queue.enqueue(t)
    
    while not ready_queue.empty():
        t = ready_queue.dequeue()
        d = t.device
        t.state = COMPLETE
        t.start_time = max(t.ready_time, d.last_task.end_time)
        t.end_time = t.start_time + t.exe_time
        d.last_task = t
        
        for n in t.successors():
            n.ready_time = max(n.ready_time, t.end_time)
            if all(p.state == COMPLETE for p in n.predecessors()):
                n.state = READY
                ready_queue.enqueue(n)
    
    return max(t.end_time for t in T.nodes)
```

##### 4. Delta 模拟算法

MCMC 搜索每步仅修改一个算子的配置，因此大部分执行时间线不变。Delta 模拟算法利用这一特性，仅重新模拟受影响的任务：

```python
# Algorithm 2: Delta Simulation
def delta_simulate(T, G, D, old_config, new_config):
    T, changed_tasks = update_task_graph(T, G, D, old_config, new_config)
    update_queue = PriorityQueue(key=lambda t: t.ready_time)
    update_queue.enqueue_all(changed_tasks)
    
    while not update_queue.empty():
        t = update_queue.dequeue()
        t.start_time = max(t.ready_time, t.prev_task_on_device.end_time)
        t.end_time = t.start_time + t.exe_time
        
        for n in t.successors():
            if update_task(n):  # readyTime or startTime changed
                update_queue.push(n)
        if update_task(t.next_task_on_device):
            update_queue.push(t.next_task_on_device)
    
    return max(t.end_time for t in T.nodes)
```

> 💡 **关键**：Delta 模拟类似 Bellman-Ford 的增量松弛——只传播变化，不重建整个时间线。在 64 GPU 场景下可额外加速 3.0–6.9×。

##### 5. MCMC 搜索优化器

FlexFlow 将并行策略优化转化为代价最小化问题。由于搜索空间是 NP-hard（可归约到最小 makespan 问题），采用 MCMC 采样启发式搜索：

**概率分布定义**：

$$p(\mathcal{S}) \propto \exp\big(-\beta \cdot \text{cost}(\mathcal{S})\big)$$

**Metropolis-Hastings 接受准则**：

$$\alpha(\mathcal{S} \to \mathcal{S}^*) = \min\Big(1, \exp\big(\beta \cdot (\text{cost}(\mathcal{S}) - \text{cost}(\mathcal{S}^*))\big)\Big)$$

**提案生成**：随机选择一个算子，将其并行配置替换为随机配置。该提案分布满足对称性 \(q(\mathcal{S}|\mathcal{S}^*) = q(\mathcal{S}^*|\mathcal{S})\)。

**搜索流程**：
1. 以数据并行和随机策略作为初始候选
2. 对每个初始策略，迭代提案直到：(a) 时间预算耗尽，或 (b) 半个搜索时间内无法改进最优策略
3. 返回搜索过程中发现的最优策略

> ⚠️ **注意**：MCMC 的关键优势在于——当新策略更优时必定接受，当新策略更差时仍有概率接受（概率随代价差增大而指数衰减），从而能跳出局部最优。

##### 6. 与现有方法的对比

| 特性 | 数据并行 | 模型并行 | REINFORCE | OptCNN | **FlexFlow** |
|------|---------|---------|-----------|--------|-------------|
| 搜索空间 | 仅 Sample | 仅 Operation | Operation (设备放置) | Sample + Attribute | **SOAP 全维度** |
| 搜索粒度 | 全图统一 | 全图统一 | 逐算子 | 逐算子 | **逐算子** |
| 搜索方法 | 无需搜索 | 手动设计 | 强化学习 | 动态规划 | **MCMC + 模拟器** |
| 支持非线性图 | ✓ | ✓ | ✓ | ✗ | **✓** |
| 搜索时间 | — | — | 12–27 小时 | 秒级 | **分钟级** |
| 硬件需求 | — | — | 160 节点 | 1 节点 | **1 节点** |

**关键实验结果**：
- 对比数据并行和专家策略：**1.3–3.3× 加速**
- 对比 REINFORCE：**3.4–3.8× 加速**，搜索时间从 12–27 小时降至 14–40 秒
- 对比 OptCNN（非线性图）：**1.2–1.6× 加速**
- 模拟器精度：预测时间与实际执行时间误差在 30% 以内，且保持策略间的相对排序
- Inception-v3 端到端训练：比 TensorFlow 减少 38% 训练时间

##### 7. 发现的策略洞察

FlexFlow 自动发现的最优策略揭示了几个重要洞察：

1. **关键路径上用 intra-op 并行**：Inception-v3 中，关键路径上的算子使用 intra-operation 并行（切分 Sample/Attribute），非关键路径的分支使用 inter-operation 并行，减少 75% 参数同步开销
2. **参数多计算少的层减少设备数**：NMT 的 embedding 层仅在少量设备上执行，减少参数同步
3. **参数多计算重的层用通道切分**：NMT 的 softmax 层按通道维度切分，每个设备只需部分参数，兼顾负载均衡和通信效率
4. **感知设备拓扑**：在非对称 GPU 连接（如 K80 集群）中，策略倾向于将相关算子放在有直连的 GPU 上

#### 🧪 练习题

```yaml
question: "FlexFlow 的 SOAP 搜索空间中，Attribute 维度对应的是什么？"
options:
  - "训练样本的批次维度切分（即数据并行）"
  - "不同算子分配到不同设备（即流水线并行）"
  - "非批次的数据维度切分（如通道、空间维度等）"
  - "模型参数的复制或切分方式"
answer: 2
explain: "Attribute 维度指的是张量中除批次维度外的其他数据维度（如卷积的通道维度、空间维度），切分这些维度可以实现传统数据并行和模型并行之外的并行方式。Sample 对应选项0，Operation 对应选项1，Parameter 对应选项3。"
```