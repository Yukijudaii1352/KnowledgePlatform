### TensorFlow

```yaml
id: tensorflow
name: TensorFlow
full_name: TensorFlow
year: "2016"
org: Google Brain
paper_url: https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
category: training_platform
parent: ps
motivation: 基于数据流图的异构分布式系统，继承DistBelief
```

#### 📝 一句话总结

TensorFlow 提出基于有状态数据流图的通用机器学习系统，用统一 graph 表达计算、状态和通信，解决 DistBelief 时代框架难以同时覆盖异构设备、自动微分和大规模分布式执行的问题。

#### 🎯 核心要点

- 用 directed dataflow graph 表示 Tensor、Operation、Variable 和 Queue 等计算/状态节点
- placement 算法把图节点映射到 CPU、GPU、移动端或分布式 worker/parameter server
- 运行时自动插入 Send/Recv 节点跨设备传输张量，统一单机和多机执行
- 支持符号自动微分、局部子图执行、partial run 与 TensorBoard 可视化
- 继承 DistBelief 的大规模训练经验，但把系统开放为更通用的编程模型

#### 🔬 深入细节

![TensorFlow 核心示意图](https://ar5iv.labs.arxiv.org/html/1603.04467/assets/SimpleGraph.svg)
*图：图示展示 TensorFlow 中一个简单数据流图：节点是 op，边是张量依赖；同一抽象可被切分到多个设备执行。*

```python
# TensorFlow graph 执行模型伪代码
graph = build_dataflow_graph(model, loss, optimizer)
for op in graph.ops:
    op.device = placer.choose_device(op, cluster, cost_model)
graph = insert_send_recv_edges(graph)

while training:
    feeds = next_batch()
    fetches = [train_op, loss]
    executor.run(subgraph_needed_by(fetches), feeds)
```

TensorFlow 的核心动机是把机器学习训练从“某个固定模型的专用系统”提升为“可表达任意张量程序的运行时”。DistBelief 在大规模神经网络训练上有效，但接口和系统边界更偏内部专用；TensorFlow 用 graph 统一表达计算、状态、控制依赖和跨设备通信。

数据流图中的边传递多维数组 Tensor，节点执行 op；Variable 是特殊有状态节点，Queue 等节点则支持输入流水线。自动微分根据前向图构造反向图，因此用户定义损失后，系统能生成梯度计算与参数更新子图。

分布式执行时，placement 根据设备能力、内存和通信成本放置节点。若一条边跨设备，运行时插入 Send/Recv 节点；这让“单机多 GPU”和“多 worker + 参数服务器”都落在同一执行语义中。

与 Parameter Server 相比，TensorFlow 的抽象层级更高：PS 关注参数状态服务，TensorFlow 则把整个训练程序变成可优化图。代价是静态图调试和动态控制流不如命令式框架自然，这也是后来 Eager Execution 与 PyTorch 流行的重要背景。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "TensorFlow 早期设计中，跨设备通信主要如何表达？"
options:
  - "用户手写 socket 代码"
  - "运行时在数据流图中插入 Send/Recv 节点"
  - "所有张量都复制到每个设备"
  - "只允许单机执行"
answer: 1
explain: "TensorFlow 将跨设备通信也建模为图中的边和传输节点，从而统一单机与分布式执行。"
```
