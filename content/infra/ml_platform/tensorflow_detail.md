### TensorFlow

```yaml
id: tensorflow
name: TensorFlow
full_name: TensorFlow
year: '2016'
org: Google Brain
paper_url: https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
category: training_platform
parent: ps
motivation: 基于数据流图的异构分布式系统，继承DistBelief
```

#### 📝 一句话总结

TensorFlow 提出一个有状态 dataflow graph 运行时，用同一张图表达张量计算、变量状态、输入流水线、自动微分和跨设备通信，解决 DistBelief 难以同时支持研究灵活性、异构设备和大规模分布式执行的问题。它把参数服务器的可变状态能力上升为通用图编程模型，让训练、推理和部署共享一套执行语义。

#### 🎯 核心要点

- 以 directed dataflow graph 表达整个 ML 程序：节点是 `Operation`，边传递 `Tensor`，特殊边表示 control dependency
- `Variable`、`Queue`、`Save`、`Restore` 等有状态节点让图既能表达纯计算，也能表达参数更新、输入队列和 checkpoint
- 运行时根据隐式/显式约束做 device placement，并把跨设备边改写为 `Send`/`Recv` 节点
- Session `Run` 根据 feed/fetch 裁剪出需要执行的子图，支持同一图上的 partial execution 和 concurrent steps
- 自动微分在前向图上追加反向图，支持普通算子、条件分支和循环控制流的梯度计算
- 大模型训练通过 sharded variables、`Part`/`Gather`/`Stitch` 和稀疏更新，把 parameter server 能力嵌入通用图中

#### 🔬 深入细节

![TensorFlow 官方文档中的计算图示意](https://www.tensorflow.org/guide/images/intro_to_graphs/two-layer-network.png)
*图：TensorFlow 官方文档中用 TensorBoard 可视化的两层网络计算图；OSDI 论文的核心图是数据流训练流水线，本文用官方图补充展示 op/tensor 图结构。*

```python
# TensorFlow 1.x/OSDI 论文中的核心执行路径伪代码
graph = Graph()
x = graph.placeholder(shape=[batch, features])
y = graph.placeholder(shape=[batch, labels])
W = graph.variable(initializer=random_uniform())
loss = softmax_cross_entropy(matmul(relu(matmul(x, W1) + b1), W2) + b2, y)
grads = add_symbolic_gradients(loss, variables=graph.variables)
train_op = optimizer_update(graph.variables, grads)

run_request = SessionRun(feeds={x: batch_x, y: batch_y}, fetches=[train_op, loss])
subgraph = prune_to_transitive_closure(graph, run_request.feeds, run_request.fetches)
placement = place_ops(subgraph, devices=["CPU", "GPU", "PS", "worker"], constraints=subgraph.constraints)
partitions = partition_by_device(subgraph, placement)
partitions = insert_send_recv_for_cross_device_edges(partitions)

for step in training_steps:
    distributed_executor.run_cached(partitions, feeds=next_batch())
```

TensorFlow 的出发点是 DistBelief 的三类限制：新 layer 往往要写 C++，新 optimizer 要修改 parameter server 逻辑，新训练算法必须服从固定的“读参数、前向、反向、写梯度”模式。TensorFlow 把这些系统内置逻辑拆成图上的基本算子，用户可以用 Python/C++ 前端组合 `MatMul`、`Conv2D`、`AssignAdd`、`Queue`、`Switch`、`Merge` 等 primitive op，而运行时只负责优化和执行图。

图模型的形式可以概括为 \(G=(V,E)\)。每个节点 \(v\in V\) 是一个 op，输入边携带张量，输出边产生新张量；某些 op 拥有可变状态，例如 `Variable` 维护 `State[r]`，`AssignAdd(r, x)` 的语义可写成

$$
\mathrm{State}'[r] \leftarrow \mathrm{State}[r] + x
$$

这使 TensorFlow 不同于传统 batch dataflow：它既保留了图可优化、可分区、可移植的优点，又允许训练中最关键的模型参数原地更新。参数服务器在这里不再是独立接口，而是图中一组承载变量和更新 op 的设备。

Deferred execution 是早期 TensorFlow 性能设计的关键。前端先构造完整符号图，`Session.run()` 再根据 feed/fetch 找到实际需要执行的 transitive closure；这样运行时可以提前做公共子表达式消除、内存调度、设备放置和子图缓存。其代价是用户调试时看到的是“构图”和“执行”两阶段，Python 控制流不能天然等同于图控制流，所以论文把条件和循环也设计为 `Switch`、`Merge`、`Enter`、`Exit`、`NextIteration` 等图算子。

分布式执行靠 graph partitioning，而不是让用户手写 RPC。placement 先为每个 op 选择设备，既要满足 kernel 可用性、colocation、用户 device hint，也要考虑计算、内存和网络成本。随后每个设备拿到自己的 subgraph；如果一条边跨设备，运行时把它替换成源设备上的 `Send` 和目标设备上的 `Recv`。这等价于把通信本身也纳入图：

$$
e=(u\rightarrow v),\ d(u)\ne d(v)
\quad\Rightarrow\quad
u\rightarrow \mathrm{Send}_{d(u),d(v)} \leadsto \mathrm{Recv}_{d(u),d(v)}\rightarrow v
$$

因此同一份程序可以在单机多 GPU、多 worker 多 PS、TPU serving 或移动端推理之间复用。

自动微分也发生在图层面。给定 loss \(L\) 和参数集合 \(\theta\)，TensorFlow 从目标节点反向搜索所有路径，对每个 op 追加 gradient function，并把多条路径贡献的偏导相加：

$$
\frac{\partial L}{\partial x}
= \sum_{y\in \mathrm{users}(x)}
\frac{\partial L}{\partial y}\frac{\partial y}{\partial x}
$$

这种做法让优化器不再是系统内核的一部分。SGD 可以写成 \(W' = W-\alpha\frac{\partial L}{\partial W}\)，Momentum、AdaGrad、RMSProp、Adam、L-BFGS 等则通过额外变量和普通数学 op 组合出来，用户无需修改底层参数服务器。

论文中大模型训练的 embedding case study 展示了 TensorFlow 如何继承 Parameter Server 又超越它：一个 \(n\times d\) embedding matrix 被切成多个 shard，`Part` 根据 id 把稀疏索引分发到对应 shard，`Gather` 在变量所在设备上取行，`Stitch` 再把结果拼回 batch 顺序。反向传播时只有被 gather 的行产生稀疏更新，既避免把 GB/TB 级参数复制到 worker，也能把 softmax 或 sampled softmax 的计算 colocate 到参数 shard 所在设备。

容错方面，TensorFlow 没有为每个 op 做昂贵的强一致日志，而是用图中的 `Save`/`Restore` 周期性 checkpoint 变量。论文还比较了 asynchronous replication、synchronous replication 和 backup worker 等并行 SGD 同步方案；这说明 TensorFlow 的平台目标不是绑定某一种分布式训练策略，而是让同步、异步、备份 worker、参数分片等策略都能在同一图语义里表达。

> 💡 关键：TensorFlow 的系统贡献是“有状态数据流图”。它把 PS 的共享参数、Theano 式符号图、自动微分、设备放置和分布式通信合并到一个可优化的中间表示中。

#### 🧪 练习题

```yaml
question: "早期 TensorFlow 为什么要在图中插入 Send/Recv 节点？"
options:
  - "把跨设备张量传输显式纳入数据流图，从而统一调度和分布式执行"
  - "让用户手动管理 TCP socket，提高网络可控性"
  - "只用于把 TensorBoard 日志发送到浏览器"
  - "替代自动微分中的梯度节点"
answer: 0
explain: "placement 后跨设备边会被 Send/Recv 替换，通信因此成为图的一部分，可被分区、缓存和调度。"
```
