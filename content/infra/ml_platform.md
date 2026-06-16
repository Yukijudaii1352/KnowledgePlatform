---
domain: infra
topic_id: ml_platform
topic_name: 机器学习平台
page_icon: ⚙️
page_title: 机器学习平台技术演进
page_subtitle: '{build_date} 版'
page_desc: 回顾从Parameter Server到万卡训练、从TFX到智能MLOps的技术演进，系统梳理机器学习平台从分布式训练到全生命周期治理的发展历程。
hero_pills:
- 🏷️ 训练平台 · 实验管理 · MLOps · 推理优化
count_pill: '{count} 个系统'
categories:
  training_platform:
    label: 训练平台
    color: '#22a06b'
  experiment_mgmt:
    label: 实验管理
    color: '#5b63d3'
  mlops_lifecycle:
    label: MLOps治理
    color: '#e8820c'
  inference_system:
    label: 推理系统
    color: '#9c5ec6'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/ml_platform/overview/zhihu__Efficient_Training_of_Large_Language_Models_on_Dis__644d92e7/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/ml_platform/latest/zhihu__从“能用”到“能打”：一场43天的推理性能突围战，正在改写2026年的AI算力版图__17a49a06/article.md

## 算法演化关系

```yaml
nodes:
- id: ps
  x: 50
  y: 80
  category: training_platform
- id: tensorflow
  x: 150
  y: 80
  category: training_platform
- id: horovod
  x: 250
  y: 60
  category: training_platform
- id: ray
  x: 250
  y: 120
  category: training_platform
- id: pytorch
  x: 280
  y: 90
  category: training_platform
- id: gpipe
  x: 280
  y: 50
  category: training_platform
- id: megatron_lm
  x: 350
  y: 90
  category: training_platform
- id: pipedream
  x: 350
  y: 50
  category: training_platform
- id: deepspeed
  x: 450
  y: 90
  category: training_platform
- id: alpa
  x: 420
  y: 130
  category: training_platform
- id: colossal_ai
  x: 520
  y: 130
  category: training_platform
- id: megascale
  x: 550
  y: 90
  category: training_platform
- id: nnscaler
  x: 550
  y: 130
  category: training_platform
- id: axlearn
  x: 650
  y: 100
  category: training_platform
- id: protrain
  x: 650
  y: 80
  category: training_platform
- id: boost
  x: 650
  y: 60
  category: training_platform
- id: tessera
  x: 700
  y: 90
  category: training_platform
- id: mlflow
  x: 250
  y: 220
  category: experiment_mgmt
- id: optuna
  x: 350
  y: 210
  category: experiment_mgmt
- id: dvc
  x: 450
  y: 210
  category: experiment_mgmt
- id: wandb
  x: 450
  y: 230
  category: experiment_mgmt
- id: flashinfer_bench
  x: 650
  y: 210
  category: experiment_mgmt
- id: sagemaker_agent
  x: 650
  y: 230
  category: experiment_mgmt
- id: tfx
  x: 120
  y: 310
  category: mlops_lifecycle
- id: kubeflow
  x: 250
  y: 310
  category: mlops_lifecycle
- id: feast
  x: 350
  y: 310
  category: mlops_lifecycle
- id: tf_serving
  x: 120
  y: 400
  category: inference_system
- id: kserve
  x: 380
  y: 400
  category: inference_system
- id: vllm
  x: 520
  y: 400
  category: inference_system
- id: raidserve
  x: 650
  y: 380
  category: inference_system
- id: superinfer
  x: 650
  y: 400
  category: inference_system
- id: opentela
  x: 650
  y: 420
  category: inference_system
- id: djinn
  x: 700
  y: 400
  category: inference_system
edges:
- from: ps
  to: tensorflow
  label: 数据流图抽象
- from: tensorflow
  to: horovod
  label: Ring AllReduce
- from: tensorflow
  to: ray
  label: 通用计算引擎
- from: tensorflow
  to: gpipe
  label: 流水线并行
- from: pytorch
  to: megatron_lm
  label: 张量并行
- from: gpipe
  to: pipedream
  label: 异步流水线
- from: megatron_lm
  to: deepspeed
  label: 显存优化
- from: ray
  to: alpa
  label: 自动并行
- from: alpa
  to: colossal_ai
  label: 统一系统
- from: alpa
  to: nnscaler
  label: 约束引导
- from: deepspeed
  to: megascale
  label: 万卡扩展
- from: deepspeed
  to: protrain
  label: 内存管理
- from: pytorch
  to: axlearn
  label: 硬件无关
- from: megatron_lm
  to: boost
  label: 低秩优化
- from: megascale
  to: tessera
  label: MoE优化
- from: mlflow
  to: optuna
  label: 超参搜索
- from: mlflow
  to: dvc
  label: 数据版本
- from: mlflow
  to: wandb
  label: 云端协作
- from: mlflow
  to: flashinfer_bench
  label: LLM基准
- from: wandb
  to: sagemaker_agent
  label: 智能代理
- from: tfx
  to: kubeflow
  label: 云原生
- from: kubeflow
  to: feast
  label: 特征存储
- from: tf_serving
  to: kserve
  label: Serverless
- from: kserve
  to: vllm
  label: PagedAttention
- from: vllm
  to: raidserve
  label: 高可用
- from: vllm
  to: superinfer
  label: SLO感知
- from: vllm
  to: opentela
  label: 去中心化
- from: kserve
  to: djinn
  label: GPU解耦
milestones:
- ps
- deepspeed
- vllm
```

## 核心算法

### Parameter Server

```yaml
id: ps
num: 1
name: Parameter Server
full_name: 参数服务器 (Parameter Server)
year: '2014'
org: CMU/Baidu
parent: —
paper_url: https://proceedings.neurips.cc/paper/2014/hash/d5cfead94f5350c12c322b5b664544c1-Abstract.html
project_url: ''
category: training_platform
motivation: 提出异步分布式参数更新框架，奠定分布式ML基础
```

#### 📝 一句话总结
Parameter Server 把全局模型参数抽象成分片的分布式 key-value 向量/矩阵，并让 worker 通过异步 `push`/`pull` 交换局部梯度，解决超大规模稀疏机器学习中参数太大、网络太贵、同步太慢的问题。论文进一步用可配置一致性和通信过滤器，把系统吞吐与优化收敛之间的折中显式暴露给算法设计者。

#### 🎯 核心要点
- 共享参数表示为有序 `(key, value)` 对，可被视为稀疏向量或矩阵，并按 key range 分片到多个 server
- worker 只保存训练数据分片和当前 mini-batch 需要的 working set，通过 range `pull` 获取参数、通过 `push` 上传梯度或统计量
- task dependency graph 支持 sequential、eventual、bounded delay 等一致性模型，允许用最大延迟 \(\tau\) 控制 stale update
- user-defined filters 在通信前过滤或压缩数据，包括 significantly modified、random skip、KKT、key caching 和 compression
- Delayed Block Proximal Gradient Method 按参数块异步更新非凸非光滑目标，并给出有界延迟下的收敛条件
- 论文在 \(636\text{TB}\) 点击预估数据、\(170\) billion 样本、\(65\) billion 特征和 \(1000\) 台机器上展示稀疏 LR 的可扩展性

#### 🔬 深入细节
![Parameter Server 多服务器分片示意](https://d2l.ai/_images/ps-multips.svg)
*图：多 Parameter Server 按参数分片提供聚合带宽；来源为 Dive into Deep Learning 的 Parameter Servers 章节，用于补充说明论文中的 worker/server 分片抽象。*

```python
# Delayed Block Proximal Gradient on a Parameter Server
for t in range(1, T + 1):
    block = scheduler.pick_parameter_block()
    scheduler.issue_task(block, dependency=f"all iterations <= {t - tau} done")

    # Worker r: data is local, parameters are remote and sharded.
    for worker in workers.parallel():
        worker.wait_until_finished(before=t - tau)
        keys = active_keys(worker.data, block)
        w_local = ps.pull(keys, filters=["significantly_modified"])
        grad, scale = worker.compute_gradient_and_coordinate_lr(w_local, block)
        ps.push(keys, grad, scale, filters=["KKT", "key_cache", "compress"])

    # Servers aggregate sparse updates and apply the block proximal step.
    for server in parameter_servers.parallel():
        g_t, u_t = server.aggregate(block)
        U = diag(u_t)
        w[block] = generalized_prox(w[block] - gamma_t * inv(U) @ g_t, U, gamma_t)
```

论文的基本优化问题写成

$$
\min_w F(w), \quad F(w)=f(w)+h(w), \quad w\in\mathbb{R}^p
$$

其中 \(f\) 是可微但不一定凸的损失，\(h\) 是可能非光滑、但按 block 可分的正则项。Parameter Server 的系统抽象不是“把 SGD 搬到多台机器上”这么简单，而是承认真实工业数据会同时遇到三个约束：数据可达 TB/PB，参数规模可达 \(10^9\) 到 \(10^{12}\)，而 datacenter 网络带宽远小于内存带宽。把参数放在 server group 中分片保存后，worker 不再复制完整模型，只根据本地样本涉及的 key 拉取 working set，这对广告、文本、推荐这类极稀疏特征尤其关键。

`push`/`pull` 接口的设计重点是“范围化”和“线性代数化”。普通 key-value store 如果逐 key 发送 float，会被 RPC 元数据和网络包开销淹没；论文把连续 key range 当作稀疏向量段传输，server 端直接做梯度求和、近端更新或用户定义函数。对一个 worker \(r\)，标准分布式次梯度循环可抽象为先拉取 \(w_r^{(t)}\)，计算本地梯度 \(g_r^{(t)}\)，再把 \(\sum_r g_r^{(t)}\) 交给 server 聚合更新：

$$
w^{(t+1)} = w^{(t)} - \eta_t\left(\sum_{r=1}^{m} g_r^{(t)} + \partial h(w^{(t)})\right)
$$

一致性是 Parameter Server 最有工程价值的旋钮。Sequential consistency 等价于 BSP，每个任务必须等前一个任务完成，语义最干净但慢 worker 会制造 barrier；eventual consistency 允许任务尽快并发，吞吐高但 stale gradient 可能拖慢收敛；bounded delay 用 \(\tau\) 限制最大落后步数，只有所有 \(t-\tau\) 之前的任务完成后才启动新任务。论文的核心判断是：机器学习优化通常能容忍有限误差，所以系统不必用数据库式强一致牺牲吞吐。

通信过滤器进一步把“哪些值值得同步”交给算法。KKT filter 针对 \(\ell_1\)-regularized logistic regression：若某坐标当前 \(w_k=0\)，且梯度近似满足 \(|\hat g_k|\le \lambda-\delta\)，软阈值近端算子仍会把它压回 0，于是该坐标梯度没有必要传输。Key caching filter 则利用 range 内 key 经常不变这一事实，双方缓存 key 列表后只传 value 和签名；compression filter 再对零值、小整数或低精度 float 做压缩。论文报告这些过滤器叠加后显著降低 server/worker 的网络流量，这也是它能在稀疏 LR 上逼近“通信几乎不是瓶颈”的原因。

Delayed Block Proximal Gradient Method 把上面的系统能力写成一个优化算法：scheduler 每轮选择参数块 \(b_t\)，worker 在有界 stale 模型上计算 block gradient 和坐标级学习率，server 聚合后解广义近端算子

$$
\operatorname{Prox}^{U}_{\gamma}(x)
= \arg\min_y \left\{h(y)+\frac{1}{2\gamma}\|y-x\|^2_U\right\}
$$

并在 block Lipschitz 条件下给出学习率限制

$$
\gamma_t \le \frac{M_t}{L_{\mathrm{var}}+\tau L_{\mathrm{cov}}+\epsilon}
$$

这里 \(\tau\) 越大，stale update 带来的 cross-block 误差越大，因此理论上需要更保守的学习率；但如果 block 划分能让特征相关性较低，\(L_{\mathrm{cov}}\) 会变小，系统就能用更大的并发换取吞吐。

与 MapReduce/Spark 式迭代批处理相比，Parameter Server 的模型状态是在线、可变、可分片的，不需要每一轮重新物化完整模型；与纯 Hogwild 式共享内存异步更新相比，它明确处理跨机器网络、分片、延迟、过滤、容错和弹性扩容。后续 TensorFlow、MXNet、Angel、PS-Lite 以及多种推荐系统训练平台，都继承了“worker 负责数据并行计算、server/kv-store 负责共享参数状态”的基本思路。

> 💡 关键：Parameter Server 的贡献不只是一个通信拓扑，而是把大规模 ML 的优化容忍度转化成系统接口：一致性可放松、通信可过滤、参数可分片、状态可恢复。

#### 🧪 练习题
```yaml
question: "Parameter Server 中 bounded delay 一致性模型的主要作用是什么？"
options:
  - "要求所有 worker 每一步严格同步，完全消除 stale gradient"
  - "允许任务并发执行，但限制参数版本最多落后 τ 步"
  - "把所有参数复制到每个 worker，减少 server 负载"
  - "只对 GPU kernel 做自动融合，不影响分布式语义"
answer: 1
explain: "bounded delay 用 τ 控制 stale update 的最大延迟，在吞吐和收敛稳定性之间折中；τ=0 接近同步，τ=∞ 接近 eventual consistency。"
```

### TensorFlow

```yaml
id: tensorflow
num: 2
name: TensorFlow
full_name: TensorFlow
year: '2016'
org: Google Brain
parent: ps
paper_url: https://www.usenix.org/conference/osdi16/technical-sessions/presentation/abadi
project_url: ''
category: training_platform
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

### Horovod

```yaml
id: horovod
num: 3
name: Horovod
full_name: Horovod
year: '2018'
org: Uber
parent: tensorflow
paper_url: https://arxiv.org/abs/1802.05799
project_url: ''
category: training_platform
motivation: 引入Ring All-Reduce提升带宽利用率
```

#### 📝 一句话总结
Horovod 把 MPI/NCCL 的 Ring All-Reduce 集体通信封装成深度学习框架的分布式 optimizer，让 TensorFlow 用户用少量代码把单机同步 SGD 扩展到多节点多 GPU，并绕开参数服务器的中心化通信瓶颈。它的关键价值是同时提升带宽利用率和易用性，而不是发明新的模型优化目标。

#### 🎯 核心要点
- 用去中心化 all-reduce 平均梯度，替代 TensorFlow 参数服务器中 worker-to-server 的梯度聚合路径
- Ring All-Reduce 将梯度 buffer 切成 \(N\) 个 chunk，通过 reduce-scatter 和 all-gather 两阶段完成求和与分发
- 每个 worker 只与环上左右邻居通信，单节点通信量约为 \(2G(N-1)/N\)，没有单点 server 热点
- `hvd.DistributedOptimizer` 包装原 optimizer，自动在应用梯度前执行 all-reduce；`broadcast` 保证所有 rank 初始参数一致
- 使用 MPI 启动作业和建立进程拓扑，使用 NCCL 2 等后端优化 GPU/跨机 collective communication
- Tensor Fusion 将大量小梯度张量合并到默认 64 MB fusion buffer，减少 tiny all-reduce 的 latency 开销

#### 🔬 深入细节
![Horovod Ring All-Reduce 论文 Figure 4](https://ar5iv.labs.arxiv.org/html/1802.05799/assets/image4-2.png)
*图：Horovod 论文 Figure 4，展示 3 个 worker 沿环传递 chunk，先规约再分发，最终每个 worker 获得完整平均梯度。*

```python
# Horovod synchronous data-parallel training
import horovod.tensorflow as hvd

hvd.init()
pin_gpu(local_rank=hvd.local_rank())

model = build_model()
base_opt = tf.train.AdagradOptimizer(learning_rate=0.01 * hvd.size())
opt = hvd.DistributedOptimizer(base_opt)
hooks = [hvd.BroadcastGlobalVariablesHook(root_rank=0)]

for batch in shard(dataset, rank=hvd.rank(), world_size=hvd.size()):
    loss = model.forward(batch)
    # DistributedOptimizer computes local gradients, all-reduces them,
    # then applies the same averaged update on every replica.
    train_op = opt.minimize(loss)
    session.run(train_op, hooks=hooks)
```

```python
# Ring All-Reduce over one gradient tensor g_i on each rank i
chunks = split(local_gradient, world_size)

# Phase 1: reduce-scatter, each rank accumulates one final reduced chunk.
for step in range(world_size - 1):
    send_chunk = chunk_index(rank - step)
    recv_chunk = chunk_index(rank - step - 1)
    send(chunks[send_chunk], to=right_neighbor)
    incoming = recv(from_=left_neighbor)
    chunks[recv_chunk] += incoming

# Phase 2: all-gather, each rank circulates reduced chunks to all peers.
for step in range(world_size - 1):
    send_chunk = chunk_index(rank - step + 1)
    recv_chunk = chunk_index(rank - step)
    send(chunks[send_chunk], to=right_neighbor)
    chunks[recv_chunk] = recv(from_=left_neighbor)

averaged_gradient = concat(chunks) / world_size
```

Horovod 的背景是 Uber 在标准 distributed TensorFlow 上遇到两个问题：一是 128 GPU 训练时大量资源被通信开销吃掉；二是参数服务器模式需要用户配置 worker/PS 比例、`ClusterSpec`、device placement 和多 GPU tower，工程复杂度高。论文把问题重新表述为同步数据并行的梯度平均：每个 rank 都有完整模型副本，只处理数据分片，局部梯度 \(g_i\) 计算完后需要得到

$$
\bar g = \frac{1}{N}\sum_{i=0}^{N-1} g_i
$$

然后所有副本应用同一个 update，因此它天然适合集体通信而不是中心化状态服务。

Ring All-Reduce 的关键在于把大小为 \(G\) 的梯度 buffer 切成 \(N\) 份，并让所有链路同时工作。第一阶段 reduce-scatter 运行 \(N-1\) 步：每个 rank 向右邻居发送一个 chunk、从左邻居接收另一个 chunk，并把收到的数据累加到本地对应 chunk。结束时，每个 rank 持有一个已经对所有 worker 求和的 chunk。第二阶段 all-gather 再运行 \(N-1\) 步：这些求和后的 chunk 沿环传播，直到每个 rank 拥有完整 reduced buffer。

通信量可以直观看出。每个阶段每个 rank 发送 \(N-1\) 个 chunk，每个 chunk 大小是 \(G/N\)，两阶段合计

$$
2(N-1)\frac{G}{N} = \frac{2G(N-1)}{N}
$$

当 \(N\) 增大时它趋近 \(2G\)，不会像单参数服务器那样让 server 需要承受来自所有 worker 的汇聚流量。更重要的是，每一步所有 rank 都能同时使用网络链路；只要 tensor 足够大，环形通信能接近带宽最优。

Horovod 在系统层的封装让这个通信模式对用户几乎不可见。`hvd.init()` 初始化通信世界，`hvd.local_rank()` 用来把进程绑定到本机 GPU，`hvd.DistributedOptimizer(opt)` 拦截 optimizer 的 gradient application，在 `step` 前自动对 dense gradients 做 all-reduce；`BroadcastGlobalVariablesHook(0)` 或对应框架 API 从 rank 0 广播初始变量，避免不同进程随机初始化不一致。训练脚本再由 `mpirun`/`horovodrun` 启动多份副本，每份只根据 `rank` 读自己的数据 shard。

Tensor Fusion 解决的是另一个常见性能坑：现代 CNN/RNN 有很多层，反向传播会产生成百上千个小 tensor。Ring all-reduce 对大 buffer 带宽利用率高，但对小 tensor 会被 per-call latency 主导。Horovod 在一个 cycle 中挑选已经 ready、dtype 相同、能放进 fusion buffer 的梯度，把它们拷贝到默认 64 MB buffer 中执行一次 all-reduce，再把结果拆回原 tensor；论文报告在未优化 TCP 网络上，对小 tensor 多的模型可带来明显提升。

与 TensorFlow Parameter Server 相比，Horovod 的训练语义更窄但更清晰：它主打同步数据并行，每个 worker 都持有完整模型，梯度平均后模型副本保持一致。它不适合天然需要参数分片、异步一致性或超大 embedding table 的所有场景；但当模型能放进单个 worker/GPU 组、瓶颈是每步梯度同步时，去中心化 all-reduce 往往比 worker-to-PS 的 all-to-all 更简单也更高效。

> 💡 关键：Horovod 把“分布式训练系统问题”降维成“在正确时间做高效 collective communication”。这正是它能从 TensorFlow 扩展到 Keras、PyTorch、MXNet 的原因。

#### 🧪 练习题
```yaml
question: "Horovod 中 Tensor Fusion 的主要目的是什么？"
options:
  - "把模型参数永久合并成一个大矩阵，减少模型容量"
  - "把多个小梯度张量打包后再 all-reduce，降低启动开销并提高带宽利用率"
  - "用参数服务器替代 Ring All-Reduce"
  - "让每个 worker 只训练不同层，执行模型并行"
answer: 1
explain: "Ring All-Reduce 对大 buffer 更高效；Tensor Fusion 把许多 ready 的小 tensor 合并进 fusion buffer，减少 tiny collective 的 latency 成本。"
```

### Ray

```yaml
id: ray
num: 4
name: Ray
full_name: Ray分布式框架 (Ray)
year: '2018'
org: UC Berkeley
parent: —
paper_url: https://www.usenix.org/conference/osdi18/presentation/moritz
project_url: ''
category: training_platform
motivation: 统一的分布式执行引擎，支持动态任务调度
```

#### 📝 一句话总结
Ray 提出一个面向新型 AI 应用的统一分布式执行引擎，用 task、actor、分布式对象存储和去中心化调度同时支撑训练、强化学习、超参搜索与在线服务。它解决的是传统批处理数据流系统和专用训练框架难以表达动态、细粒度、有状态工作负载的问题。

#### 🎯 核心要点
- 统一两类编程抽象：无状态 remote function/task 与有状态 actor/method invocation
- 使用动态任务图表达执行过程，包含 data edge、control edge 和 actor stateful edge
- 以 ObjectRef/future 作为一等对象，任务异步提交，依赖满足后自动触发执行
- 采用两级 bottom-up scheduler：任务先进入本地调度器，必要时才转交全局调度器
- 使用 Global Control Store 保存 task table、object table、function table 和 event log 等控制状态
- 使用分布式 immutable object store 共享大对象，调度器只处理控制面，数据面按对象位置拉取
- 用 lineage 记录对象生成过程，节点失败后可重放 task 恢复对象；actor 状态则依赖显式 checkpoint
- 针对 RL/AutoML 等负载支持 `ray.wait`、嵌套任务、资源标签和异构 CPU/GPU 调度

#### 🔬 深入细节
![Ray 系统架构图](https://ar5iv.labs.arxiv.org/html/1712.05889/assets/x4.png)
*图：Ray 论文 Figure 5 的 ar5iv 镜像。上层是 driver、worker、actor 与 object store/local scheduler，下层是 Global Control Store、global scheduler 与调试/诊断工具；这张图体现了 Ray 将应用 API、调度控制面和对象数据面分开的设计。*

```python
# Ray 动态任务图与调度机制伪代码
@ray.remote(num_cpus=1)
def rollout(policy_ref, env_seed):
    policy = ray.get(policy_ref)
    return simulate_episode(policy, env_seed)

@ray.remote(num_gpus=1)
def train_policy(samples_ref, old_policy_ref):
    samples = ray.get(samples_ref)
    old_policy = ray.get(old_policy_ref)
    return update(old_policy, samples)

policy_ref = ray.put(initial_policy())
pending = [rollout.remote(policy_ref, seed) for seed in range(1024)]

while budget_not_exhausted():
    ready, pending = ray.wait(pending, num_returns=64)
    batch_ref = aggregate.remote(ready)
    policy_ref = train_policy.remote(batch_ref, policy_ref)
    pending += [rollout.remote(policy_ref, next_seed()) for _ in ready]
```

Ray 的问题背景不是“怎样让一个固定神经网络训练更快”，而是“怎样把 AI 应用中动态变化的多阶段计算统一放到一个集群运行时里”。强化学习是论文里的典型例子：环境模拟任务耗时不均，策略训练需要 GPU，在线推理服务可能是长期有状态组件，采样和训练还会根据中间结果不断产生新任务。Spark/RDD 这类批数据流系统适合静态、批量、粗粒度 DAG；MPI 和参数服务器适合同步训练内核；但它们都不擅长把模拟、训练、服务、评估和调参混在一个动态执行图里。

Ray 的最小 API 抽象是 remote function 与 actor。remote function 调用立刻返回 `ObjectRef`，调用方可以把这个引用传给后续任务而不阻塞；Ray 运行时会在引用指向的对象可用时触发依赖任务。actor 则是状态化 worker，方法调用同样返回 `ObjectRef`，但同一 actor 的方法按提交顺序串行执行，因此可以包住环境模拟器、参数服务器、模型服务副本或 GPU resident 状态。抽象层面可以把运行中系统写成动态任务图：

$$
G_t=(O_t\cup T_t,\ E_{\text{data}}\cup E_{\text{control}}\cup E_{\text{state}})
$$

其中 \(O_t\) 是对象节点，\(T_t\) 是 task/actor method 节点；data edge 描述对象输入输出，control edge 描述嵌套任务的创建关系，state edge 描述同一 actor 上相邻方法调用的状态依赖。这个建模很关键：Ray 没有把 actor 作为任务图之外的特殊黑盒，而是把 actor 方法也纳入 lineage，使有状态计算能与无状态 task 共用调度、依赖追踪和部分恢复机制。

系统架构上，Ray 把控制状态抽到 Global Control Store。GCS 维护对象位置、任务元数据、函数定义和事件日志，使 local scheduler、global scheduler、object store 等组件尽量无状态。这样做有两个直接收益：第一，调度器不必同时承担对象传输和 lineage 存储，避免中心节点成为每次对象读写的瓶颈；第二，某个调度组件失败后可以重启并从 GCS 读取控制状态，而不是要求用户应用重建整个执行上下文。论文强调的是控制面可扩展性，而不是单个 master 上保存所有元数据。

Ray 的 bottom-up scheduling 是对细粒度任务延迟的专门优化。任务由 driver 或 worker 创建后先交给本地调度器；若本地资源足够、输入对象在本地或可快速拉取，就直接在本地执行；只有在本地队列过长、缺少 GPU/自定义资源或数据局部性明显不合适时，任务才上送全局调度器。调度可以理解为在资源约束下最小化排队与远程输入传输成本：

$$
\operatorname{cost}(n,\tau)=q_n\cdot\bar{t}_{exec}
+\sum_{o\in D(\tau),\operatorname{loc}(o)\ne n}
\frac{\operatorname{size}(o)}{\bar{b}}
$$

这里 \(q_n\) 是节点 \(n\) 的本地队列长度，\(\bar{t}_{exec}\) 是平均任务运行时间，\(D(\tau)\) 是任务依赖对象集合，\(\bar{b}\) 是估计带宽；同时还要满足 \(R(\tau)\le A_n\)，即任务声明的 CPU/GPU/内存等资源向量不能超过节点可用资源。这个公式化视角解释了 Ray 为什么既能追求数据局部性，又不会把所有短任务都压到全局调度器。

对象存储是 Ray 数据面的核心。任务返回值会进入 immutable object store，调用方只拿到引用；当另一个节点上的任务需要该对象时，运行时按 GCS 中的对象位置拉取数据。immutable 约束让对象可以安全共享、缓存和重建，也让 task 失败恢复更简单：如果对象 \(o\) 是由 \(o=f(a_1,\dots,a_k)\) 生成的，且输入 \(a_i\) 或其 lineage 仍可获得，那么对象丢失时可以重放生成它的 task，而不需要每个应用都手写中间状态持久化。

Ray 与 TensorFlow、Horovod 或参数服务器的定位不同。后者主要优化单一训练拓扑中的张量通信，而 Ray 优先提供“动态控制流 + 有状态服务 + 细粒度调度”的集群运行时。上层训练库、RLlib、Tune、Serve 等可以各自实现领域逻辑，但共享同一套任务、actor、对象和调度机制。代价是 Ray 不替代高性能 collective kernel；当工作负载进入纯同步数据并行训练内核时，仍需要调用 NCCL、all-reduce 或专用训练框架。

> 💡 关键：Ray 的贡献在于把 AI 应用的动态任务图、有状态 actor、对象引用、资源感知调度和 lineage 容错组合成一个统一系统，而不是提出某个单一训练算法。

#### 🧪 练习题
```yaml
question: "Ray 为什么要同时提供 task 和 actor 两种抽象？"
options:
  - "task 负责无状态细粒度并行，actor 负责有状态长期计算，两者共同覆盖动态 AI 工作负载"
  - "task 只能在 CPU 上运行，actor 只能在 GPU 上运行"
  - "task 用于训练神经网络，actor 只用于日志收集"
  - "task 和 actor 完全等价，只是 API 名称不同"
answer: 0
explain: "Ray 用 task 表达可重试、可调度的无状态远程函数，用 actor 表达保留内部状态的远程对象；RL、服务和训练流水线通常同时需要这两类计算。"
```

### PyTorch

```yaml
id: pytorch
num: 5
name: PyTorch
full_name: PyTorch
year: '2019'
org: Meta FAIR
parent: —
paper_url: https://arxiv.org/abs/1912.01703
project_url: ''
category: training_platform
motivation: 命令式编程与动态图，提升科研灵活性
```

#### 📝 一句话总结
PyTorch 提出一种 Python-first、命令式、动态图的深度学习框架，把模型、数据加载、优化器和调试过程都保留为普通 Python 程序，同时通过 C++/CUDA 运行时、自动微分和异步 GPU 执行维持高性能。它解决了早期静态图框架在研究迭代、动态控制流和调试体验上的高摩擦问题。

#### 🎯 核心要点
- 采用 imperative/eager execution：Tensor 运算立即执行，模型就是普通 Python 控制流
- 使用 define-by-run 动态计算图，每次前向按实际执行路径构建 autograd graph
- 实现 reverse-mode automatic differentiation，用 operator overloading 记录梯度函数与依赖
- 将控制流留在 Python/C++ host 侧，将张量计算下沉到 libtorch、cuDNN、cuBLAS 和 CUDA kernel
- 通过 CUDA stream 异步排队，使 CPU 调度与 GPU kernel 执行重叠，提高设备利用率
- 使用 caching allocator 与引用计数降低 GPU 内存分配、释放和垃圾回收带来的同步开销
- 保持与 NumPy、DLPack、Python debugger、multiprocessing 和生态工具的互操作性
- 通过 `nn.Module`、`Optimizer`、`DataLoader`、TorchScript、C++ frontend 和分布式工具补齐工程化路径

#### 🔬 深入细节
![PyTorch 异步执行 trace](https://ar5iv.labs.arxiv.org/html/1912.01703/assets/x1.png)
*图：PyTorch 论文 Figure 3 的 ar5iv 镜像。论文没有传统框架总览图，这张 trace 展示了 PyTorch 的关键运行时机制：CPU 侧快速排队算子，GPU 侧异步执行卷积、BatchNorm 等 kernel，从而让命令式 Python 代码仍能保持较高设备利用率。*

```python
# PyTorch 动态图自动微分训练伪代码
class RouterBlock(torch.nn.Module):
    def __init__(self, small, large, head):
        super().__init__()
        self.small = small
        self.large = large
        self.head = head

    def forward(self, x):
        # Python 控制流决定本次真实计算图；下一次 forward 可以走不同路径
        h = self.large(x) if x.shape[-1] > 512 else self.small(x)
        return self.head(torch.relu(h))

model = RouterBlock(small_net, large_net, classifier).cuda()
optimizer = torch.optim.Adam(model.parameters(), lr=3e-4)

for x, y in loader:
    optimizer.zero_grad(set_to_none=True)
    logits = model(x.cuda(non_blocking=True))   # eager 前向，同时记录 autograd 节点
    loss = torch.nn.functional.cross_entropy(logits, y.cuda(non_blocking=True))
    loss.backward()                             # reverse-mode AD 反向遍历本次图
    optimizer.step()                            # 参数更新仍是普通 Python 调用
```

PyTorch 的核心立场是“深度学习模型首先是程序”。静态图框架要求用户先声明完整 dataflow graph，再交给运行时反复执行；这种方式利于全图优化，但会把 Python 调试器、条件分支、循环、递归、动态 shape 和复杂训练逻辑隔离在图构建之外。PyTorch 选择 eager execution：`forward` 调用时立即执行，用户可以在任意中间值上打断点、打印、画图或调用普通 Python 库。论文的关键论证是：通过谨慎的运行时实现，动态图的可用性不必以大幅性能损失为代价。

自动微分是 PyTorch 让“普通程序”可训练的桥梁。每个需要梯度的 Tensor 在运算时会生成或连接到一个 `grad_fn`，运行时记录本次实际执行过的算子、输入输出关系和反向所需的 saved tensors。若前向可写成 \(y=f_\theta(x)\)、损失为 \(L(y)\)，反向传播本质上是在动态图上做向量-Jacobian 积累：

$$
\bar{x}_i=\sum_j \bar{y}_j\frac{\partial y_j}{\partial x_i},
\quad \bar{\theta}=\frac{\partial L}{\partial \theta}
$$

这里 \(\bar{y}_j=\partial L/\partial y_j\)。PyTorch 使用 reverse-mode AD，是因为训练中通常是一个标量 loss 对大量参数求梯度；每个算子只需要实现本地 vector-Jacobian product，autograd engine 就能从 loss 节点反向调度整个图。由于图是在前向时临时构建的，下一次 batch 可以走不同分支或不同循环次数，这正是 define-by-run 的灵活性来源。

命令式接口之所以没有把性能拖垮，是因为 PyTorch 明确分离 control flow 和 data flow。Python 负责决定执行哪些算子，数值密集计算由 C++ core/libtorch 调用底层 CPU/GPU kernel。GPU 上的算子通过 CUDA stream 排队，CPU 发起 kernel 后通常不等待其完成，而是继续提交后续工作；只在读取 GPU 结果、跨 stream 依赖或显式同步时才阻塞。可以把一次训练 step 的执行理解为：

$$
\text{Python control} \rightarrow
\text{C++ dispatcher} \rightarrow
\text{CUDA enqueue} \rightarrow
\text{GPU kernel execution}
$$

论文的 trace 图说明，CPU 侧排队速度可以快于 GPU 侧实际计算时间，于是解释器开销被隐藏在异步执行之后。这也是 PyTorch 能在保持 Pythonic 使用体验的同时接近静态图框架吞吐的关键。

内存管理是另一个容易被低估的系统点。GPU 内存分配通常会触发昂贵同步，如果每个临时 Tensor 都直接 `cudaMalloc/cudaFree`，eager 模式会频繁卡住。PyTorch 使用 caching allocator 复用已释放的块，并结合 CPython 引用计数尽早释放不再使用的 Tensor。对用户来说，这保持了“对象离开作用域就可回收”的直觉；对运行时来说，缓存池避免了分配器同步和碎片化带来的性能悬崖。

PyTorch 的设计也刻意降低生态边界。Tensor 可以与 NumPy 或 DLPack 做零拷贝互转，`Dataset`/`DataLoader` 把 Python 数据处理和 pinned memory 传输组织成训练输入管线，`torch.multiprocessing` 能把 Tensor 存储移到共享内存以减少进程间复制。`nn.Module` 并不是强制图语言，而是参数注册、层组合和状态管理约定；Optimizer 也只是操作参数集合的 Python 对象，因此 GAN、元学习、多损失交替优化等非标准训练循环可以直接表达。

与 TensorFlow 1.x/Theano 这类静态图相比，PyTorch 牺牲了一部分提前全图优化空间，换来模型定义、调试和研究迭代的直接性；与纯 NumPy 相比，它补上了自动微分、GPU kernel、模块系统、数据管线和分布式训练。后续 TorchScript、C++ frontend 与编译路径可以看作在同一哲学下补足部署需求：先让研究代码自然运行，再在需要时把一部分动态程序捕获、编译或迁移到非 Python 环境。

> 💡 关键：PyTorch 论文的贡献不是某个新损失函数，而是证明“命令式 Python 程序 + 动态 autograd + C++/CUDA 高性能运行时”可以同时满足研究灵活性和主流深度学习性能。

#### 🧪 练习题
```yaml
question: "PyTorch define-by-run 动态图最核心的含义是什么？"
options:
  - "每次前向执行都会按真实 Python 控制流记录本次计算图，反向传播只沿本次图求梯度"
  - "训练开始前必须把所有算子编译成固定静态图"
  - "用户需要为每个 Tensor 手写梯度公式"
  - "动态图意味着所有运算只能在 CPU 上同步执行"
answer: 0
explain: "PyTorch 在 eager 前向中用 operator overloading 记录实际发生的运算；loss.backward() 根据这次记录的图做 reverse-mode 自动微分。"
```

### GPipe

```yaml
id: gpipe
num: 6
name: GPipe
full_name: 流水线并行 (GPipe)
year: '2019'
org: Google Brain
parent: tensorflow
paper_url: https://arxiv.org/abs/1811.06965
project_url: ''
category: training_platform
motivation: 通过微批次实现流水线并行，开创性工作
```

#### 📝 一句话总结
GPipe 提出一种通用的 micro-batch pipeline parallelism：把顺序神经网络按层切成多个 stage 放到不同加速器上，再把一个 mini-batch 拆成多个 micro-batch 填充流水线。它在保持同步梯度更新语义的同时提高多设备利用率，并用 activation rematerialization 缓解巨型模型训练的显存压力。

#### 🎯 核心要点
- 将网络视为层序列，把连续层合并成 cell/stage，并把每个 stage 放到一个加速器上
- 使用 batch splitting：一个 mini-batch 被拆成多个 micro-batch，前向和反向跨 stage 流水执行
- 对一个 mini-batch 内所有 micro-batch 累积梯度，最后只做一次同步参数更新
- 避免 PipeDream 式异步流水线的 weight staleness，不需要维护多版本权重来校正梯度
- 通过 rematerialization/checkpointing 只保存分区边界激活，反向时重算 stage 内部激活以节省显存
- 分区目标是让各 stage 计算成本尽量均衡，减少流水线慢 stage 和 bubble overhead
- 跨设备通信只发生在 stage 边界传递激活/梯度，相比 SPMD 张量切分减少 all-reduce 类通信
- 论文验证了 557M 参数 AmoebaNet 和 6B 参数、128 层 multilingual Transformer 的可训练性与扩展性

#### 🔬 深入细节
![GPipe 流水线并行示意图](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/PipelineParallelism.png)
*图：GPipe 论文 Figure 2(c) 的 ar5iv 镜像。横轴是时间，纵向是不同设备；不同 micro-batch 的前向 \(F_{i,j}\) 与反向 \(B_{i,j}\) 在多个 stage 上交错执行，右侧统一做同步 Update，中间的空白区域就是 bubble。*

```python
# GPipe micro-batch 流水线训练伪代码
stages = partition_sequential_layers(model.layers, num_stages=K)
optimizers = [make_optimizer(stage.parameters()) for stage in stages]

for minibatch in loader:
    micros = split(minibatch, chunks=M)
    saved_outputs = []

    # 1. 前向流水：不同 stage 同时处理不同 micro-batch
    for micro_id, micro in enumerate(micros):
        x = micro
        for stage_id, stage in enumerate(stages):
            x = stage.forward(x, checkpoint_boundary=True)
            send_to_next_stage(stage_id, x)
        saved_outputs.append(x)

    # 2. 反向流水：反向传播时可重算 stage 内激活，减少前向缓存
    for micro_id in reversed(range(M)):
        grad = loss_grad(saved_outputs[micro_id])
        for stage_id in reversed(range(K)):
            grad = stages[stage_id].backward_with_rematerialization(grad)
            accumulate_gradients(stages[stage_id])

    # 3. 所有 micro-batch 梯度累积完成后，同步更新一次
    for opt in optimizers:
        opt.step()
        opt.zero_grad()
```

GPipe 针对的是“模型太大而单设备放不下，同时朴素模型并行又利用率很差”的问题。如果只把一个网络按层切到 4 个设备上，一个 batch 必须从 stage 0 依次经过 stage 3，任一时刻大多只有一个设备在工作；如果为了填满设备而让不同 stage 使用不同时间点的权重异步更新，又会产生 weight staleness。GPipe 的关键折中是：用 micro-batch 填满流水线，但更新仍按完整 mini-batch 同步发生。

形式化地，设模型是层序列 \(L_1,\dots,L_N\)，GPipe 将其划分为 \(K\) 个连续 cell：

$$
C_k = L_{a_k}\circ L_{a_k+1}\circ \cdots \circ L_{b_k},\quad k=1,\dots,K
$$

分区器的目标不是简单让层数相等，而是让每个 cell 的估计计算成本接近，即尽量减小 \(\operatorname{Var}(\operatorname{cost}(C_1),\dots,\operatorname{cost}(C_K))\)。原因很直接：流水线吞吐由最慢 stage 决定，某个 stage 过重会让其他设备等待，即使 micro-batch 数量足够也无法线性加速。

batch splitting 是 GPipe 的核心算法。令 mini-batch \(B\) 被拆成 \(M\) 个 micro-batch \(B_1,\dots,B_M\)。第一个 micro-batch 进入 stage 1 后，stage 0 可以立刻处理第二个 micro-batch；当流水线填满时，多个设备同时处理不同 micro-batch 的不同 stage。一次 pipeline sweep 的直觉利用率可近似看作：

$$
U \approx \frac{M}{M+K-1}
$$

其中 \(K-1\) 对应填充和排空流水线带来的 bubble。这个式子不是 GPipe 的优化目标本身，但很好地解释了论文观察：当 micro-batch 数 \(M\) 相对 stage 数 \(K\) 足够大时，bubble overhead 被摊薄；当 \(M=1\) 时就退化为朴素顺序模型并行，几乎没有流水线并发。

同步梯度更新保证了 GPipe 的训练语义接近普通 mini-batch SGD。对参数 \(\theta\)，每个 micro-batch 产生梯度 \(g_j=\nabla_\theta \ell(f_\theta(B_j))\)，GPipe 累积后再更新：

$$
g=\frac{1}{M}\sum_{j=1}^{M} g_j,\quad
\theta \leftarrow \theta-\eta g
$$

关键是所有 \(g_j\) 都基于同一版 \(\theta\) 的前向/反向计算。这样 GPipe 避免了异步流水线中常见的权重版本错位，也不需要像一些异步 pipeline 系统一样在每个设备上保存多份历史权重。代价是一次 mini-batch 的 update 要等所有 micro-batch 完成，吞吐来自流水线并发而不是异步参数更新。

显存方面，GPipe 结合 rematerialization。普通反向传播需要保存每层前向激活；当模型很深且 batch 很大时，激活内存会迅速超过设备限制。GPipe 只在 stage 边界保存必要激活，在反向时重算 stage 内部前向，从计算换内存。直觉上，若每个 stage 有 \(N/K\) 层、micro-batch 大小是 \(B/M\)，则每个设备需要常驻的中间激活随 micro-batch 缩小而下降；这就是为什么 batch splitting 与 rematerialization 必须一起看，而不是只把 batch 切小。

与 SPMD/tensor model parallelism 相比，GPipe 不把单个矩阵乘或卷积的张量维度切到多设备上，因此跨设备通信主要是 stage 边界的 activation 和 gradient，而不是每层大量 all-reduce 或 halo exchange。这让 GPipe 在没有高速互连时也能工作得相对稳健。与 PipeDream 类异步 pipeline 相比，GPipe 的优点是优化更稳定、权重一致性简单；缺点是只适合能表达为主要顺序层序列的网络，并且要求单层本身能放进一个加速器，BatchNorm 这类跨 batch 统计也需要额外处理 micro-batch 与 mini-batch 统计之间的差异。

论文实验展示的是“通用基础设施”的价值，而不是某个架构专用 trick。GPipe 让 AmoebaNet 在 ImageNet 上扩到 557M 参数并达到强结果，也让 128 层、6B 参数 multilingual Transformer 在 100 多种语言任务上训练成为可能。更重要的启发是：当模型深度天然形成层序列时，流水线并行可以与数据并行叠加，成为后来大模型训练系统中 pipeline parallelism、activation checkpointing 和 micro-batch scheduling 的基础组成。

> 💡 关键：GPipe 的本质是用 micro-batch 并发隐藏按层模型并行的设备空闲时间，同时用同步梯度更新保持训练语义稳定。

#### 🧪 练习题
```yaml
question: "GPipe 为什么选择在所有 micro-batch 完成后再统一更新参数？"
options:
  - "为了让每个 micro-batch 的梯度基于同一版权重，避免流水线异步更新带来的 weight staleness"
  - "为了完全取消反向传播，只运行前向推理"
  - "为了让每个 stage 持有模型的完整副本"
  - "为了把跨设备通信变成每层 all-reduce"
answer: 0
explain: "GPipe 通过累积一个 mini-batch 内所有 micro-batch 的梯度并同步更新，保持与普通 mini-batch SGD 接近的语义。"
```

### Megatron-LM

```yaml
id: megatron_lm
num: 7
name: Megatron-LM
full_name: Megatron-LM
year: '2019'
org: NVIDIA
parent: pytorch
paper_url: https://arxiv.org/abs/1909.08053
project_url: ''
category: training_platform
motivation: 高效张量并行支持千亿参数训练
```

#### 📝 一句话总结
Megatron-LM 提出了一套专门面向 Transformer 的层内张量并行方案，把 MLP 大矩阵和 multi-head attention 按张量维度切分，在原生 PyTorch 中只插入少量 collective 通信即可训练十亿级到百亿级语言模型。

#### 🎯 核心要点
- 提出 intra-layer model parallelism：不按层切模型，而是在单个 Transformer block 内切分矩阵乘和 attention heads
- MLP 并行策略：第一层权重按列切分、第二层权重按行切分，将非线性 GeLU 保持在每个 GPU 的局部分片上
- Attention 并行策略：Q/K/V 与 attention heads 按 head 维度切分，每张 GPU 独立计算一组 heads 后再合并输出投影
- 通信设计极简：用互为伴随的 `f`/`g` autograd 算子把一次 Transformer 层的前向和反向通信限制为 4 次 all-reduce
- 系统实现保持 PyTorch 友好：无需新编译器或自定义框架，配合 mixed precision、activation checkpointing、数据并行和高带宽节点内互联
- 实验训练 GPT-2/BERT 风格模型到 8.3B/3.9B 参数规模，并展示 512 GPU 上约 15.1 PFLOPS 的端到端吞吐

#### 🔬 深入细节
![Megatron-LM MLP 张量并行示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/mlp_mp_2.png)
*图：来自 Megatron-LM 论文 Figure 3(a)，展示 MLP 中 `A` 按列切分、`B` 按行切分，以及 `f`/`g` 通信算子的放置。*

![Megatron-LM Attention 张量并行示意图](https://ar5iv.labs.arxiv.org/html/1909.08053/assets/attention_mp_2.png)
*图：来自 Megatron-LM 论文 Figure 3(b)，展示 self-attention 按 heads 切分，输出投影再通过 row-parallel 方式汇合。*

```python
# Megatron-LM tensor parallel training step, simplified to one Transformer MLP + attention block.
# tp_rank owns one shard of every tensor-parallel weight.
def transformer_block_tp(x, tp_rank, tp_group):
    # MLP: H = GeLU(XA), Y = HB
    A_i = shard_columns(A, rank=tp_rank)        # A = [A_1, ..., A_p]
    H_i = gelu(x @ A_i)                         # no communication before GeLU

    B_i = shard_rows(B, rank=tp_rank)           # B = [B_1; ...; B_p]
    y_partial = H_i @ B_i
    y = all_reduce_sum(y_partial, group=tp_group)

    # Attention: each rank owns a subset of heads.
    Q_i, K_i, V_i = qkv_projection_for_local_heads(x, tp_rank)
    ctx_i = softmax(Q_i @ K_i.T / sqrt(head_dim)) @ V_i
    out_partial = ctx_i @ shard_rows(attention_out_proj, tp_rank)
    attn_out = all_reduce_sum(out_partial, group=tp_group)

    return residual_layer_norm(x + y + attn_out)
```

训练超大 Transformer 的直接瓶颈不是“数据量不够分”，而是单层矩阵、激活和优化器状态已经超过单卡内存。纯数据并行会在每张 GPU 上复制完整模型，只能扩大 batch；纯 pipeline 并行可以把不同层放到不同设备，但每一层内部的大矩阵仍然完整落在某张 GPU 上。Megatron-LM 的关键选择是把 Transformer block 内部最重的算子切开，使模型宽度可以随 GPU 数增长。

MLP 的数学形式可以写成：

$$
Y = \operatorname{GeLU}(XA), \quad Z = YB
$$

若使用 \(p\) 个 tensor-parallel rank，将第一层权重按列切分为 \(A=[A_1,\ldots,A_p]\)，每张 GPU 只计算 \(Y_i=\operatorname{GeLU}(XA_i)\)。由于 GeLU 是逐元素非线性，切分后的 \(Y_i\) 可以在本地直接完成非线性。第二层权重按行切分为 \(B=[B_1;\ldots;B_p]\)，每张 GPU 计算局部结果 \(Z_i=Y_iB_i\)，最终只需：

$$
Z = \sum_{i=1}^{p} Z_i = \operatorname{AllReduceSum}(Z_i)
$$

这解释了为什么 Megatron-LM 选择“列切第一层、行切第二层”：它把中间扩展维度留在本地，避免在 GeLU 前后反复 gather 大激活，只在 block 的必要边界做一次求和同步。

Attention 的切分利用了 multi-head attention 的天然可分解结构。对第 \(i\) 个 rank，它只持有部分 heads 的投影矩阵 \(Q_i,K_i,V_i\)，局部计算：

$$
\operatorname{head}_i(X)=\operatorname{softmax}\left(\frac{XQ_i(XK_i)^T}{\sqrt{d_h}}\right)XV_i
$$

不同 heads 在 softmax 之前没有数据依赖，因此可以并行独立计算；跨 GPU 通信主要发生在输出投影和残差连接需要重新合成完整 hidden state 的位置。论文中的 `f` 和 `g` 是两个简单但重要的 autograd 辅助算子：`f` 前向是 identity、反向做 all-reduce；`g` 前向做 all-reduce、反向是 identity。二者配合后，一个 model-parallel Transformer 层在前向加反向中只需要 4 次 collective，而不是在每个子算子后都同步。

从系统角度看，Megatron-LM 的贡献是把算法结构、通信点和 PyTorch autograd 对齐。它没有要求用户重写模型到新 DSL，也没有依赖全图编译器；实现者只需替换 linear、embedding、cross entropy 等少数模块为 parallel 版本，并让 tensor parallel group 内的 rank 共享切分规则。embedding 和输出词表层也可做 vocabulary parallel：每个 rank 持有一段词表 logits，交叉熵通过跨 rank 的 max/sum 规约得到全词表归一化，从而避免完整 logits 常驻单卡。

与 GPipe/PipeDream 这类 pipeline 并行相比，Megatron-LM 主要解决“层内太宽”的问题；与 ZeRO 这类优化器/参数状态分片相比，它直接改变矩阵乘的计算分布。实践中它常与数据并行、pipeline 并行共同组成 3D 并行：tensor parallel 放在节点内 NVLink 等高带宽域中，pipeline parallel 跨层切分模型深度，data parallel 复制整个并行模型副本来扩大吞吐。这个分工也解释了为什么 Megatron-LM 的层内通信必须非常克制，否则 tensor parallel 的收益会被 all-reduce 开销吞掉。

> 💡 关键：Megatron-LM 的核心不是新的 Transformer 公式，而是找到 Transformer 中可以局部计算的维度，把通信压缩到残差/投影等少数必要汇合点。

#### 🧪 练习题
```yaml
question: "Megatron-LM 为什么在 MLP 中对第一层权重按列切分、第二层权重按行切分？"
options:
  - "为了让每个 GPU 都保存完整中间激活，便于调试"
  - "为了让 GeLU 在本地分片上执行，并只在第二层输出处做 all-reduce 求和"
  - "为了减少训练数据读取次数，与模型并行无关"
  - "为了把 attention heads 全部集中到同一个 GPU"
answer: 1
explain: "列切第一层后 GeLU 可局部执行；行切第二层后每个 rank 产生 partial output，最后 all-reduce 相加得到完整输出。"
```

### PipeDream

```yaml
id: pipedream
num: 8
name: PipeDream
full_name: PipeDream
year: '2019'
org: Microsoft/CMU
parent: gpipe
paper_url: https://dl.acm.org/doi/10.1145/3341301.3359646
project_url: ''
category: training_platform
motivation: 异步流水线减少bubble开销
```

#### 📝 一句话总结
PipeDream 提出 generalized pipeline parallelism，把层切分、阶段复制、1F1B 调度和 weight stashing 组合起来，在保持训练正确性近似可控的同时减少 GPipe 式流水线 flush 与 bubble。

#### 🎯 核心要点
- 将 DNN 层划分为多个 pipeline stages，并允许某些 stage 用数据并行副本复制来消除负载不均衡
- 通过短 profile 收集每层前向/反向时间、激活大小、参数大小和平台通信带宽，再自动搜索 stage 切分与复制因子
- 使用 1F1B 调度：稳态中每个 worker 严格交替执行一个 backward 和一个 forward，减少启动/排空之外的空闲时间
- 扩展为 1F1B-RR：在被复制的 stage 内 round-robin 路由 microbatch，并保证反向梯度回到执行过对应前向的副本
- 使用 weight stashing 保存每个 microbatch 前向时的权重版本，使该 microbatch 的反向在同一 stage 内使用一致参数
- 用 vertical sync 等版本控制手段缓解跨 stage 权重版本偏移，在吞吐、内存占用和统计效率之间取舍

#### 🔬 深入细节
![PipeDream pipeline-parallel assignment 与 1F1B 时序图](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/pipedream_figure2.png)
*图：来自 Microsoft Research PipeDream 官方博客 Figure 2，左侧展示 8 GPU 被切成 4 个 stage 且部分 stage 有副本，右侧展示启动后进入 steady state 的 1F1B forward/backward 交替。*

![PipeDream workflow 图](https://www.microsoft.com/en-us/research/wp-content/uploads/2019/10/Figure3_pipedream.png)
*图：来自 Microsoft Research PipeDream 官方博客 Figure 3，展示 profiler、optimizer、constraints 与 runtime 如何形成 pipeline-parallel execution。*

```python
# PipeDream core loop, simplified.
# Each worker owns one stage replica and repeats a static 1F1B-RR schedule.
while training:
    if has_ready_backward(stage):
        mb_id, grad_out = recv_from_next_stage()
        version = forward_weight_version[mb_id]
        weights = load_stashed_weights(version)
        grad_in, grad_w = backward(stage, mb_id, grad_out, weights)
        apply_stage_local_update(stage, grad_w)
        send_to_prev_stage(mb_id, grad_in, route=forward_route[mb_id])

    if has_ready_forward(stage):
        mb_id, activation = recv_from_prev_stage_or_loader()
        version = current_weight_version(stage)
        stash_weights(mb_id, version)
        forward_route[mb_id] = this_stage_replica()
        activation_out = forward(stage, activation, weights_at(version))
        send_to_next_stage(mb_id, activation_out)
```

PipeDream 的出发点是传统 intra-batch 并行的两个极端都不理想。数据并行每个 worker 持有完整模型，扩展到多机后需要频繁同步大梯度，通信量随参数量增长；朴素模型并行只让一个 minibatch 穿过分布式层序列，任一时刻只有少数 worker 忙，硬件利用率低。Pipeline parallelism 的思路是把模型层序列切成 stage，同时把训练 batch 分成连续 microbatch，使多个 microbatch 像流水线指令一样同时处于不同 stage。

如果 stage \(s\) 的一次 microbatch 前向加反向服务时间为 \(t_s\)，稳态吞吐受最慢 stage 限制：

$$
T_{\text{step}} \approx T_{\text{fill/drain}} + (M-1)\max_s t_s
$$

其中 \(M\) 是流入流水线的 microbatch 数。这个公式说明了 PipeDream 为什么必须自动 partition：只要某个 stage 显著更慢，所有其他 stage 都会等待它。PipeDream 先 profile 每层的 compute time、activation/gradient 边界大小和参数大小，再结合硬件拓扑估计 stage 内计算与 stage 间通信；优化目标是选择连续层段、stage 数、stage 副本数和 microbatch 数，使 \(\max_s t_s\) 尽量小，同时满足 GPU 显存和网络带宽约束。

调度层面，PipeDream 使用 1F1B 而不是 GPipe 的“先做完所有 forward，再做所有 backward，再 flush 更新”。在 pipeline 填满后，每个 worker 优先执行一个 ready backward，然后执行一个 ready forward，因此 backward 产生的 activation 可以尽早释放，worker 也不必为了全局同步频繁排空流水线。对包含副本的 stage，1F1B-RR 会把 forward 按 round-robin 分配给副本，并记录 microbatch 的 route；反向时梯度必须回到执行过对应 forward 的同一副本，因为该副本保留了对应 activation 和权重版本。

异步流水线的核心风险是权重版本不一致。若 microbatch \(m\) 在 stage \(s\) 的前向使用权重 \(W_s^{v(m,s)}\)，但它的反向到达时该 stage 已经完成多次本地更新，直接用最新 \(W_s\) 会让梯度不再对应前向计算图。PipeDream 的 weight stashing 明确保存这个版本：

$$
g_s(m)=\nabla_{W_s} L_m\left(W_s^{v(m,s)}\right)
$$

也就是说，反向计算使用前向时的同一 stage-local 权重版本，保证单个 stage 内的梯度数值是自洽的。它不能完全消除跨 stage 的 staleness，因为同一个 microbatch 经过不同 stage 时可能看到不同版本；PipeDream 通过版本管理和可选 vertical sync 限制这种偏移，使统计效率接近数据并行，同时保留高硬件利用率。

与 GPipe 相比，PipeDream 的主要取舍是“少 flush、少 bubble，但要保存多个权重版本并处理 stale gradient”。GPipe 更接近同步 SGD 语义，理解和收敛分析更直接，但周期性排空会损失吞吐；PipeDream 让各 stage 本地更快更新，稳态几乎所有 worker 都有活干，适合通信受限或模型层计算不均的环境。它也不是纯 pipeline：stage replication 本质上把数据并行嵌入 pipeline stage 内，用复制因子吸收层耗时差异，这是 generalized pipeline parallelism 中“generalized”的重要含义。

> ⚠️ 注意：PipeDream 的正确性边界依赖 weight stashing 和路由记录；如果 backward 没有回到执行对应 forward 的 stage 副本，保存的 activation/weight version 就对不上。

#### 🧪 练习题
```yaml
question: "PipeDream 中 weight stashing 主要解决什么问题？"
options:
  - "减少输入数据集的磁盘占用"
  - "确保某个 microbatch 的反向在同一 stage 内使用它前向时的权重版本"
  - "把所有 stage 的权重强制变成同一个全局版本"
  - "让 GPU 不再需要保存 activation"
answer: 1
explain: "异步流水线中 stage 会持续更新权重；stashing 记录 microbatch 前向用过的版本，反向时加载同一版本以得到数值自洽的梯度。"
```

### DeepSpeed ZeRO

```yaml
id: deepspeed
num: 9
name: DeepSpeed ZeRO
full_name: DeepSpeed ZeRO
year: '2020'
org: Microsoft
parent: megatron_lm
paper_url: https://arxiv.org/abs/1910.02054
project_url: ''
category: training_platform
motivation: 消除冗余状态突破显存限制
```

#### 📝 一句话总结
ZeRO（Zero Redundancy Optimizer）通过将优化器状态、梯度和参数在数据并行进程间分区而非复制，消除了数据并行训练中的内存冗余，在不牺牲通信效率的前提下实现了与设备数量成线性比例的显存节省，使得在 1024 块 GPU 上训练万亿参数模型成为可能。

#### 🎯 核心要点
- **三阶段渐进式内存优化（ZeRO-DP）**：Stage 1 分区优化器状态（4× 节省）、Stage 2 叠加分区梯度（8× 节省）、Stage 3 叠加分区参数（线性于 \(N_d\) 倍节省）
- **通信量几乎不增加**：Stage 1+2 通信量与标准数据并行相同（\(2\Psi\)）；Stage 3 仅增加 50%（\(3\Psi\)）
- **混合精度训练内存分析**：系统量化了 Adam + fp16 训练中优化器状态（fp32 参数副本 + 动量 + 方差 = \(12\Psi\) 字节）占主导的内存消耗
- **ZeRO-R 优化残余内存**：包括激活值分区（\(P_a\)）、固定大小临时缓冲区（\(C_B\)）和主动内存碎片整理（\(M_D\)）
- **超线性加速**：100B 参数模型在 400 GPU 上实现超线性加速，达到 15 PFlops 吞吐
- **无需模型并行即可训练 13B 参数模型**，降低了大模型训练的工程门槛
- **Turing-NLG 17B**：利用 ZeRO 训练了当时最大的语言模型，刷新准确率记录

#### 🔬 深入细节
![ZeRO-DP 三阶段内存对比](https://ar5iv.labs.arxiv.org/html/1910.02054/assets/x1.png)
*图：以 7.5B 参数模型、64 路数据并行为例，展示基线 DP 与 ZeRO 三个阶段（\(P_{os}\)、\(P_{os+g}\)、\(P_{os+g+p}\)）的显存消耗对比。基线需要 120GB/GPU，ZeRO Stage 3 仅需 1.9GB/GPU。*

```python
# ZeRO-DP 三阶段训练伪代码
# 假设 Nd 个数据并行进程，模型参数 Ψ，每个进程负责第 rank 个分区

# ===== Stage 1: 优化器状态分区 (P_os) =====
# 每个进程仅持有 1/Nd 的优化器状态（fp32 参数副本 + momentum + variance）
for step in training_steps:
    loss = forward(model, micro_batch)        # 前向：所有进程持有完整参数
    loss.backward()                           # 反向：计算完整梯度
    all_reduce(gradients)                     # 全规约梯度（与标准 DP 相同）
    # 每个进程仅更新自己负责的 1/Nd 参数分区
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)                        # 收集更新后的完整参数

# ===== Stage 2: + 梯度分区 (P_os+g) =====
for step in training_steps:
    loss = forward(model, micro_batch)
    # 反向传播中，每层梯度就绪后立即 reduce-scatter（而非 all-reduce）
    for layer in reversed(model.layers):
        grad = layer.backward()
        reduce_scatter(grad)                  # 每个进程仅保留自己分区的已规约梯度
        # 非本分区的梯度内存立即释放
    optimizer.step(params[rank_start:rank_end])
    all_gather(params)

# ===== Stage 3: + 参数分区 (P_os+g+p) =====
for step in training_steps:
    # 前向：按需广播参数
    for layer in model.layers:
        all_gather(layer.params)              # 从各进程收集该层完整参数
        output = layer.forward(input)
        # 非本分区的参数用完即释放
    # 反向：同样按需广播参数
    for layer in reversed(model.layers):
        all_gather(layer.params)              # 再次收集完整参数用于梯度计算
        grad = layer.backward()
        reduce_scatter(grad)
    optimizer.step(params[rank_start:rank_end])
    # 无需最终 all_gather——参数始终按需获取
```

##### 动机与背景：数据并行的内存瓶颈

训练超大模型的核心挑战在于**单设备显存不足**。现有解决方案主要有两类：

1. **模型并行（MP）**：将模型按层或按张量切分到多个设备。虽然能减少单卡显存，但带来大量跨设备通信，且实现复杂、通用性差。Megatron-LM 的张量并行在超过单节点（通常 8 GPU）后效率急剧下降。
2. **数据并行（DP）**：每个设备持有完整模型副本，仅切分数据。通信效率高，但**每张卡都冗余存储了完整的模型状态**。

论文首先对混合精度训练（fp16 参数 + fp32 Adam 优化器）的内存消耗进行了精确量化。对于参数量为 \(\Psi\) 的模型：

$$\text{总内存} = \underbrace{2\Psi}_{\text{fp16 参数}} + \underbrace{2\Psi}_{\text{fp16 梯度}} + \underbrace{4\Psi + 4\Psi + 4\Psi}_{K\Psi = 12\Psi \text{ (fp32 参数副本 + 动量 + 方差)}} = 16\Psi \text{ 字节}$$

> 💡 **关键洞察**：优化器状态占据了 75% 的显存（\(12\Psi / 16\Psi\)），而在标准数据并行中这些状态在每个 GPU 上完全冗余复制。这正是 ZeRO 的突破口。

以 GPT-2（1.5B 参数）为例，仅模型状态就需要 24GB，已超出当时主流 GPU（16–32GB）的容量。而 1.4B 参数是标准 DP 在 32GB GPU 上的极限。

##### 核心机制：ZeRO-DP 三阶段分区

ZeRO-DP 的核心思想极为简洁：**既然数据并行中每个进程最终只需要更新 \(1/N_d\) 的参数，那么每个进程也只需要存储对应的 \(1/N_d\) 优化器状态和梯度**。

**Stage 1 — 优化器状态分区（\(P_{os}\)）**：将 Adam 的 fp32 参数副本、一阶动量和二阶方差均匀分成 \(N_d\) 份，第 \(i\) 个进程仅存储和更新第 \(i\) 份。前向和反向仍使用完整参数和梯度（通过标准 all-reduce 同步梯度），更新后通过 all-gather 收集完整参数。内存从 \(4\Psi + 12\Psi = 16\Psi\) 降至 \(4\Psi + 12\Psi/N_d\)，当 \(N_d\) 较大时约为 \(4\Psi\)，实现 **4× 节省**。通信量不变，仍为 \(2\Psi\)（all-reduce = reduce-scatter + all-gather）。

**Stage 2 — 梯度分区（\(P_{os+g}\)）**：既然每个进程只更新 \(1/N_d\) 的参数，那么它只需要对应分区的规约后梯度。因此将 all-reduce 替换为 **reduce-scatter**：反向传播中每层梯度就绪后，立即通过 reduce-scatter 将不同分区的梯度规约到对应进程，非本分区的梯度内存随即释放。内存进一步降至 \(2\Psi/N_d + 12\Psi/N_d\)（加上 \(2\Psi\) 的 fp16 参数），实现 **8× 节省**。通信量仍为 \(2\Psi\)（reduce-scatter \(\Psi\) + all-gather \(\Psi\)），与标准 DP 完全相同。

> ⚠️ **注意**：实现中使用固定大小的桶（bucket）来批量执行 reduce-scatter，在梯度就绪后先写入桶缓冲区，桶满后一次性通信，以提高带宽利用率。

**Stage 3 — 参数分区（\(P_{os+g+p}\)）**：每个进程仅存储 \(1/N_d\) 的 fp16 参数。前向和反向传播中，当需要某一层的完整参数时，通过 all-gather 从各进程临时收集，计算完成后立即丢弃非本分区的参数。总内存降至 \(16\Psi/N_d\)，**与 \(N_d\) 成线性比例**。通信量增加到 \(3\Psi\)（前向 all-gather \(\Psi\) + 反向 all-gather \(\Psi\) + 反向 reduce-scatter \(\Psi\)），相比基线的 \(2\Psi\) 仅增加 **50%**。

$$\text{Stage 3 通信量} = \underbrace{\Psi}_{\text{前向 all-gather}} + \underbrace{\Psi}_{\text{反向 all-gather}} + \underbrace{\Psi}_{\text{反向 reduce-scatter}} = 3\Psi = 1.5 \times 2\Psi$$

##### ZeRO-R：残余内存优化

在 ZeRO-DP 大幅削减模型状态内存后，激活值、临时缓冲区和内存碎片成为次要瓶颈。ZeRO-R 提供三项互补优化：

1. **激活值分区（\(P_a\)）**：结合激活检查点（activation checkpointing）技术，将检查点激活值在数据并行组间分区存储，需要时通过 all-gather 恢复。对于超大模型，还可将激活值卸载到 CPU 内存。
2. **固定大小缓冲区（\(C_B\)）**：标准实现中 all-reduce 等操作会将所有梯度融合为一个巨大的扁平缓冲区（如 1.5B 参数模型的 fp32 缓冲区需 6GB）。ZeRO-R 使用固定大小的缓冲区，在保证通信效率的同时避免内存爆炸。
3. **内存碎片整理（\(M_D\)）**：训练过程中频繁的内存分配/释放导致碎片化，即使总空闲内存充足也可能因缺乏连续空间而 OOM（观察到 30% 以上可用内存无法使用的极端情况）。ZeRO-R 通过预分配连续内存块并主动管理张量生命周期来缓解碎片问题。

##### 与传统方法的对比

| 维度 | 标准数据并行 | 模型并行 (Megatron) | ZeRO-DP |
|------|-------------|-------------------|---------|
| 单卡内存 | \(16\Psi\)（完全冗余） | \(\sim 16\Psi/N_m\) | \(16\Psi/N_d\)（Stage 3） |
| 通信量 | \(2\Psi\) | \(\mathcal{O}(\Psi \cdot \text{layers})\) | \(2\Psi\) ~ \(3\Psi\) |
| 可扩展性 | 受单卡内存限制 | 受节点内带宽限制 | 线性扩展至千卡 |
| 实现复杂度 | 低 | 高（需改模型代码） | 低（优化器层面） |
| 最大模型 | ~1.4B (32GB GPU) | ~20B (跨节点效率低) | 万亿级 |

> 💡 **关键优势**：ZeRO 与模型并行正交，可以组合使用。实验中 ZeRO + Megatron 张量并行在 400 GPU 上训练 100B 参数模型达到 15 PFlops，实现超线性加速（因为更大的分区使每卡 batch 更适配 GPU 计算特性）。

#### 🧪 练习题
```yaml
question: "ZeRO-DP Stage 2 (P_os+g) 将标准数据并行的 all-reduce 操作替换为了什么？"
options:
  - "all-gather + broadcast"
  - "reduce-scatter + all-gather"
  - "仅 reduce-scatter"
  - "ring all-reduce + reduce"
answer: 1
explain: "Stage 2 在反向传播中用 reduce-scatter 替代 all-reduce 的前半部分，使每个进程仅保留自己分区的规约梯度；更新后再通过 all-gather 收集完整参数。总通信量 = reduce-scatter(Ψ) + all-gather(Ψ) = 2Ψ，与标准 all-reduce 相同。"
```

### Alpa

```yaml
id: alpa
num: 10
name: Alpa
full_name: Alpa自动并行 (Alpa)
year: '2022'
org: UC Berkeley
parent: ray
paper_url: https://arxiv.org/abs/2201.12023
project_url: ''
category: training_platform
motivation: 自动生成算子间与算子内并行策略
```

#### 📝 一句话总结
Alpa 提出分层自动并行编译系统，把大模型训练计划分解为算子间 pipeline 并行和算子内 SPMD 张量并行两级搜索，自动为 JAX 程序生成跨设备执行方案。

#### 🎯 核心要点
- 重新组织并行搜索空间：用 inter-operator parallelism 表示 stage/pipeline 切分，用 intra-operator parallelism 表示算子内部张量切分
- 将物理集群抽象为多个 device meshes，使高带宽 mesh 内执行 collective-heavy 的算子内并行，mesh 间执行 point-to-point pipeline 通信
- Intra-op pass 用 sharding spec 描述张量布局，为每个 HLO/JAX 算子选择 SPMD 并行算法并插入 resharding collective
- Inter-op pass 用动态规划搜索 layer/stage 切分、mesh 切分和 stage-mesh assignment，目标是在显存约束下最小化 pipeline latency
- Runtime orchestration pass 为每个 mesh 生成静态执行指令，协调同步 1F1B pipeline schedule 与跨 mesh activation/gradient 传输
- 以 JAX/XLA 为编译基础、Ray 为分布式运行支撑，让用户通过 `@parallelize` 标注训练函数而不是手写 Megatron/GPipe/ZeRO 组合策略

#### 🔬 深入细节
![Alpa 分层并行搜索空间示意图](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x1.png)
*图：来自 Alpa 论文 Figure 1，对比手工 plan、仅 intra-op、仅 inter-op 和 Alpa 的 hierarchical space。虚线框表示 pipeline stage，颜色表示不同设备。*

![Alpa compiler passes 与 runtime 架构图](https://ar5iv.labs.arxiv.org/html/2201.12023/assets/x3.png)
*图：来自 Alpa 论文 Figure 3，展示 inter-op pass、intra-op pass、runtime orchestration 如何把计算图和设备集群变成多个 mesh executable。*

```python
# Alpa hierarchical auto-parallel compilation, simplified.
def alpa_compile(train_step, cluster):
    ir = trace_jax_to_hlo(train_step)
    layers = cluster_hlo_ops_into_layers(ir)
    candidate_meshes = enumerate_device_mesh_partitions(cluster)

    # Inter-op DP asks the intra-op solver for each candidate stage/mesh cost.
    cost_cache = {}
    for layer_interval in all_contiguous_intervals(layers):
        for mesh in candidate_meshes:
            stage_hlo = slice_layers(ir, layer_interval)
            plan, cost, memory = solve_intra_op_ilp(stage_hlo, mesh)
            if memory <= mesh.memory_budget:
                cost_cache[layer_interval, mesh] = (plan, cost)

    best = dynamic_programming_over_stage_mesh_pairs(
        layers=layers,
        meshes=candidate_meshes,
        stage_costs=cost_cache,
        objective="min_pipeline_latency_with_memory_constraints",
    )

    executables = [xla_compile(stage.plan) for stage in best.stages]
    return build_runtime_schedule(executables, schedule="sync_1f1b")
```

Alpa 要解决的问题是大模型并行策略空间爆炸。对一个 Transformer 或 MoE 模型，用户可能同时需要数据并行、张量并行、ZeRO 式状态分片和 pipeline 并行；每层怎么切、哪些层放一个 stage、哪些 GPU 组成 tensor-parallel group、跨节点怎么流水，彼此强耦合。手工系统如 Megatron-LM 对规则 Transformer 很有效，但模型结构、集群拓扑或 batch 配置变化后，专家需要重新调参。Alpa 的核心观察是：不同并行方式可以按“是否切分单个算子”分成两层，先把联合搜索拆成可求解的子问题。

Intra-operator parallelism 关注一个 stage 内部的每个算子如何切张量。Alpa 用 sharding spec 描述张量布局，例如矩阵的 batch 维、行维或列维映射到 2D device mesh 的某个轴；如果相邻算子的输入输出布局不一致，就插入 resharding 通信，如 all-gather、all-reduce 或 all-to-all。对一个 stage，intra-op pass 可以抽象成：

$$
\min_{\pi} \sum_{v \in V} c_v(\pi_v) + \sum_{(u,v)\in E} r_{u,v}(\pi_u,\pi_v)
$$

其中 \(\pi_v\) 是算子 \(v\) 的并行算法和输出布局，\(c_v\) 是本地计算/collective 成本，\(r_{u,v}\) 是从上游布局转换到下游布局的 resharding 成本。论文将该问题形式化为 ILP，使同一个 pass 可以表达数据并行、operator parallelism、ZeRO update sharding 及其组合，而不是为每种模型写一套手工规则。

Inter-operator parallelism 关注 stage 级别的图切分和设备分配。给定一段连续 layers 和一个 mesh，inter-op pass 会调用 intra-op pass 得到该 stage 在该 mesh 上的最优局部成本，然后用动态规划搜索全局 stage-mesh 序列。若同步 1F1B pipeline 有 \(K\) 个 stage、\(M\) 个 microbatch，粗略 latency 可理解为：

$$
L \approx \sum_{s=1}^{K} t_s + (M-1)\max_s t_s + \sum_{s=1}^{K-1} \operatorname{comm}(s,s+1)
$$

其中 \(t_s\) 来自 intra-op solver 的 stage 执行成本，\(\operatorname{comm}\) 是相邻 mesh 之间传 activation/gradient 的点对点成本。这个公式体现了分层设计的意义：intra-op 尽量在高带宽 mesh 内做 collective 密集的张量切分，inter-op 则把跨 mesh 通信限制在 stage 边界。

Alpa 的 device mesh 抽象也很关键。现代集群的带宽不是均匀的：同机 GPU 之间可能有 NVLink/PCIe，高速但范围小；跨机网络带宽低且延迟高。Alpa 让 inter-op pass 决定如何把物理设备切成多个 logical mesh，并倾向把通信密集的 intra-op sharding 放在 mesh 内，把只传边界 activation/gradient 的 pipeline 放到 mesh 间。这比“所有 GPU 组成一个大 collective group”更符合实际硬件层次。

从用户体验看，Alpa 更像一个并行策略编译器。用户写普通 JAX 训练步骤并加 `@parallelize`，Alpa trace 出 IR 后自动运行 inter-op/intra-op/runtime 三类 pass，最终生成多个 mesh executable 和静态通信计划。它不改变损失函数，也不发明新的优化器；它把 Megatron 的张量并行、GPipe/PipeDream 的流水线并行、ZeRO 的分片思想放入统一搜索框架，降低了大模型训练从单机程序迁移到分布式集群的工程门槛。

> 💡 关键：Alpa 的创新点是“搜索空间分层”，不是单个新的 collective。它牺牲全局穷举最优性，换来可以在真实大模型和真实集群上编译出接近手工调优的并行计划。

#### 🧪 练习题
```yaml
question: "Alpa 为什么把自动并行分成 intra-operator 和 inter-operator 两层？"
options:
  - "因为这两层分别对应模型训练和模型推理"
  - "因为它们的粒度、通信模式和适合的硬件层级不同，分层后搜索空间更可控"
  - "因为 JAX 只能表达 pipeline，不能表达 tensor sharding"
  - "因为所有算子必须放在同一张 GPU 上运行"
answer: 1
explain: "intra-op 在算子内部切张量，通常需要 mesh 内 collective；inter-op 切 stage，主要做 stage 边界通信。分层优化可以降低组合爆炸。"
```

### Colossal-AI

```yaml
id: colossal_ai
num: 11
name: Colossal-AI
full_name: Colossal-AI
year: '2023'
org: HPC-AI Tech
parent: alpa
paper_url: https://arxiv.org/abs/2110.14883
project_url: ''
category: training_platform
motivation: 统一的大规模并行训练系统
```

#### 📝 一句话总结
Colossal-AI 提出一个统一的大规模并行训练系统，把数据并行、流水线并行、多维张量并行、序列并行、ZeRO/异构内存管理和混合精度等能力组织成可组合的训练运行时，解决超大模型训练中“能并行但难组合、能省显存但难写代码”的工程问题。

#### 🎯 核心要点
- 统一系统抽象：用 parallel context、execution engine、trainer/hooks 管理复杂混合并行环境
- 多种并行原语：支持 data parallel、pipeline parallel、1D/2D/2.5D/3D tensor parallel、sequence parallel
- 增强 sharding/offloading：重设计 sharded tensor 接口，结合 PatrickStar 风格 chunk 管理提升带宽利用率并降低碎片
- 动态异构内存：Hybrid Adam 根据 GPU 可用空间动态决定 FP32 参数和梯度在 GPU/CPU 间的放置，而不是固定全部 offload
- 用户友好接口：通过配置和初始化接口把并行策略注入普通 PyTorch 训练循环，后续工程版本演化为 Booster/Plugin 风格
- 经验结论：多维张量并行在跨节点或非全互联 GPU 拓扑上比 1D tensor parallel 更容易降低通信组规模和显存压力

#### 🔬 深入细节
![Colossal-AI 系统架构](https://ar5iv.labs.arxiv.org/html/2110.14883/assets/x1.png)
*图：Colossal-AI 论文 Figure 1，来源于 ar5iv 对 arXiv:2110.14883 的 HTML 渲染。*

```python
# Colossal-AI 论文 Listing 1 风格的训练流程伪代码
import colossalai

config = dict(
    parallel=dict(
        tensor=dict(size=4, mode="1d"),
        pipeline=dict(size=2),
        sequence=dict(enabled=True),
    ),
    fp16=dict(mode="amp"),
    zero=dict(stage=3, offload=True),
)

colossalai.launch_from_torch(config=config)

engine, trainloader, _ = colossalai.initialize(
    model=model,
    optimizer=optimizer,
    criterion=criterion,
    train_dataloader=trainloader,
)

for data, label in trainloader:
    engine.zero_grad()
    output = engine(data)
    loss = engine.criterion(output, label)
    engine.backward(loss)
    engine.step()
```

Colossal-AI 的出发点不是提出一种单点并行算法，而是把训练大模型时常见的多类手段放进同一个系统边界内。单纯数据并行会复制参数、梯度和优化器状态；单纯张量并行受限于高速互联范围；流水线并行需要切层和调度；ZeRO/offload 又会引入额外通信和 CPU-GPU 数据移动。Colossal-AI 的架构图把这些能力放到 parallel context、model builder、schedule、engine、trainer、hooks 等模块中，核心目标是让用户仍然按普通深度学习训练习惯写模型和训练循环，而并行语义由系统注入。

在张量并行部分，论文用 Transformer MLP 的矩阵乘说明 1D tensor parallel 的基本形态：

$$
Y = W_2 W_1 X
$$

如果在 \(N\) 个设备上切分 \(W_1\) 和 \(W_2\)，每个设备只保存约 \(1/N\) 的权重分片，但需要用 collective 通信聚合局部结果。1D 方案通常让一次 collective 覆盖全部参与设备，因此在单机 NVLink 全互联时很高效，但跨节点或部分互联拓扑上容易被低带宽链路拖慢。Colossal-AI 把 2D、2.5D、3D tensor parallel 也纳入同一系统：这些方案把计算设备组织成网格或立方体，通信只发生在行、列或子组内，用更多维度的切分换取更小的通信组和更低的单卡显存占用。系统层面的判断不是“某一种并行永远最好”，而是最小化每个 rank 的计算、通信与内存移动瓶颈：

$$
T_{\text{step}} \approx \max_r \left(T^{\text{compute}}_r + T^{\text{comm}}_r + T^{\text{memory}}_r\right)
$$

内存管理是 Colossal-AI 区别于只做模型切分系统的关键。以混合精度 Adam 为例，模型状态通常包含 FP16 参数、FP16 梯度、FP32 master weight、两个 FP32 动量项，显存近似随参数量 \(P\) 线性膨胀：

$$
M_{\text{Adam states}} \approx 2P + 2P + 4P + 8P = 16P\ \text{bytes}
$$

ZeRO 类方法把这些状态沿数据并行组分片，理想情况下单卡模型状态可降到约 \(1/D\)，其中 \(D\) 是数据并行规模：

$$
M_{\text{per GPU}} \approx \frac{M_{\text{params}} + M_{\text{grads}} + M_{\text{optimizer}}}{D} + M_{\text{activation}}
$$

论文进一步指出，普通按 tensor 粒度搬运状态会产生碎片和大量小通信，带宽利用率低。Colossal-AI 因此引入 chunk 思路，把初始化顺序相近的一组参数放入连续内存块，以 chunk 为单位进行通信、offload 和生命周期管理。这让许多小 tensor 的移动变成少量大块移动，减少 kernel launch 与内存碎片，同时更适合 PCIe、NVLink、RDMA 等链路的带宽特性。

增强 sharding/offloading 还体现在生命周期复用上。前向阶段需要 FP16 参数，反向阶段参数使用结束后会产生 FP16 梯度；Colossal-AI 允许在合适位置复用 FP16 参数存储来放置 FP16 梯度，从而降低峰值显存。Hybrid Adam 则避免 DeepSpeed ZeRO-Offload 中“FP32 master weight 全部放 CPU”的静态策略：如果 GPU 仍有空闲内存，系统会把一部分 FP32 参数和梯度保留在 GPU 上更新，只把必要部分移到 CPU。这个机制的直觉是：offload 节省显存但增加数据移动，静态 offload 可能浪费 GPU 空间；动态 placement 能在显存余量和通信成本之间取更好的折中。

与 Alpa 的自动搜索路线相比，Colossal-AI 更偏“统一训练平台 + 手动/配置化组合并行能力”。Alpa 试图在编译图上自动搜索 pipeline/tensor 计划，Colossal-AI 则强调可插拔模块、常用并行策略覆盖和 PyTorch 生态可用性。对工程用户来说，这种设计的价值在于降低采用门槛：同一个模型可以根据硬件拓扑选择 1D/2D/2.5D/3D 张量并行，根据模型深度选择流水线并行，根据显存压力启用 ZeRO、chunk、offload、activation checkpointing 和 AMP，而不是重写一套训练框架。

> 💡 关键：Colossal-AI 的核心贡献是把“并行策略选择”“模型状态生命周期”“通信组管理”“用户训练接口”放进同一个运行时，使大模型训练从手写分布式程序变成可配置、可组合的系统工程问题。

#### 🧪 练习题
```yaml
question: "Colossal-AI 为什么要在 ZeRO/offload 之外引入 chunk-based memory management？"
options:
  - "把多个小 tensor 组织成连续大块，降低碎片并提升通信/搬运带宽利用率"
  - "把模型参数全部复制到每张 GPU 上，减少通信"
  - "只为了改变模型的损失函数"
  - "让训练完全不需要数据并行"
answer: 0
explain: "chunk 以连续内存块为通信和生命周期管理单位，能减少小 tensor 通信和内存碎片；它与 ZeRO/offload 是互补关系。"
```

### MegaScale

```yaml
id: megascale
num: 12
name: MegaScale
full_name: MegaScale万卡训练 (MegaScale)
year: '2024'
org: ByteDance
parent: deepspeed
paper_url: https://arxiv.org/abs/2402.15627
project_url: ''
category: training_platform
motivation: 万卡规模训练的容错与通信优化
```

#### 📝 一句话总结
MegaScale 是字节跳动面向超过 10,000 张 GPU 的生产级 LLM 训练系统，通过算法-系统协同、3D 并行通信重叠、网络调优、深度可观测性和快速故障恢复，解决万卡同步训练的效率与稳定性问题。

#### 🎯 核心要点
- 生产目标：在 12,288 张 GPU 上训练 175B Transformer，报告 55.2% MFU，相比 Megatron-LM 提升 1.34 倍
- 算法优化：采用 parallel transformer block、sliding window attention、LAMB optimizer 降低计算和流水线 bubble
- 通信重叠：分别针对 data parallel、pipeline parallel、tensor/sequence parallel 设计 all-gather、reduce-scatter、send/receive 与 GEMM 的重叠
- 算子与数据链路：使用 FlashAttention-2、LayerNorm/GeLU kernel fusion、异步数据预处理和单机共享 dataloader
- 大规模初始化与网络：用 Redis 替换 TCPStore、减少全局 barrier，把通信组初始化复杂度从 \(O(n^2)\) 降到 \(O(n)\)，并调优 ECMP、拥塞控制和 NCCL 重传
- 容错闭环：driver、executor、heartbeat、诊断测试、坏节点隔离、两阶段 checkpoint 和恢复读放大优化共同提高长期 goodput

#### 🔬 深入细节
![MegaScale 张量/序列并行通信重叠](https://arxiv.org/html/2402.15627v1/x3.png)
*图：MegaScale 论文 Figure 3，展示 parallel transformer block 中 TP/SP 通信与 FFN/GEMM 的融合和重叠，来源于 arXiv HTML。*

```python
# MegaScale 风格的生产训练控制循环伪代码
driver.submit(job)

while not job.finished:
    pods = kubernetes.allocate_or_replace_nodes(job.world_size)
    executors = launch_training_processes(pods, parallel_plan_3d)
    robust_daemons = start_heartbeat_daemons(executors)

    while job.running:
        metrics = collect(
            cuda_events=True,
            rdma_traffic=True,
            nccl_errors=True,
            heartbeat=True,
            step_latency=True,
        )
        if detect_fault_or_straggler(metrics):
            driver.suspend_all_executors()
            bad_nodes = run_lightweight_diagnostics(executors)
            kubernetes.evict_and_replenish(bad_nodes)
            ckpt = locate_latest_checkpoint()
            executors = relaunch_from_checkpoint(ckpt)
            break

        overlap_dp_pp_tp_sp_communications()
        if should_checkpoint():
            dump_gpu_state_to_host_pinned_memory()
            async_flush_host_state_to_hdfs()
```

MegaScale 的核心观察是：万卡训练下，“单步最快”不等于“长期训练最快”。同步 LLM 训练中，一个慢节点会拖住整组 collective；一个 GPU、RNIC、链路或文件系统异常都会让作业暂停；训练持续数周时，小概率故障会变成常态。因此论文把效率定义为长期稳定的有效训练吞吐，常用指标包括 MFU 和 goodput：

$$
\text{MFU}=\frac{\text{observed model FLOPs per second}}{\text{hardware peak FLOPs per second}}
$$

$$
\text{goodput} \approx \frac{\text{useful training steps or tokens}}{\text{wall-clock time including failure and recovery}}
$$

算法层面，MegaScale 先减少每步计算和流水线浪费。Parallel transformer block 把传统串行结构：

$$
y = x + \text{MLP}(\text{LN}(x + \text{Attention}(\text{LN}(x))))
$$

改写为：

$$
y = x + \text{MLP}(\text{LN}(x)) + \text{Attention}(\text{LN}(x))
$$

这样 Attention 和 MLP 两条分支可以并行执行，更适合与 TP/SP 通信重叠。Sliding window attention 把长度为 \(s\) 的全量注意力从 \(O(s^2)\) 降到 \(O(s \cdot w)\)，其中 \(w\) 是窗口大小；多层堆叠后仍可形成较大感受野。LAMB optimizer 则允许在不损害收敛的情况下放大全局 batch。论文给出 interleaved pipeline 的 bubble 对比：连续 4 个 1x batch step 的 bubble 约为

$$
\frac{4}{v}\frac{p-1}{m}
$$

而使用 4x batch 做 1 个 step 的 bubble 约为

$$
\frac{1}{v}\frac{p-1}{4m}
$$

其中 \(p\) 是 pipeline stage 数、\(m\) 是 micro-batch 数、\(v\) 是 virtual pipeline size，因此 bubble 理论上降低 87.5%。

系统层面，MegaScale 对 3D 并行中的不同通信路径分别处理。数据并行使用 ZeRO2 时，前向需要 all-gather 参数，反向需要 reduce-scatter 梯度；MegaScale 按 model chunk 触发通信，并把第一次 all-gather 预取到 iteration 开始，与数据加载重叠。流水线并行使用 interleaved 1F1B，但不把 send/receive 绑定成阻塞对：warm-up、steady 和 cool-down 阶段中，只要当前计算不依赖某个通信结果，就把 send 或 receive 异步发起。张量/序列并行更棘手，因为 LayerNorm/Dropout 沿 sequence 维切分会引入 all-gather 和 reduce-scatter；MegaScale 将这些通信融合到 FFN 的 parallel Linear 路径，并把 GEMM 切成小块，使通信可以在大 GEMM 执行期间被隐藏。

在万卡规模，初始化和网络调优也会变成训练系统的一部分。默认 `torch.distributed` 在大量 NCCL group 初始化时依赖 TCPStore 和全局 barrier，论文测得 Megatron-LM 在 2,048 张 Ampere GPU 上初始化约 1047 秒。MegaScale 用非阻塞异步的 Redis 替换 TCPStore，并重新设计通信组初始化顺序，减少不必要全局 barrier，把 barrier 复杂度从 \(O(n^2)\) 降到 \(O(n)\)，使 2,048 GPU 初始化低于 5 秒，超过 10,000 GPU 时低于 30 秒。网络上，MegaScale 还针对 CLOS-like 三层交换网络、ToR 下多 rail、ECMP hash conflict、PFC/HoL blocking、DCQCN/Swift 风格拥塞控制和 NCCL retransmit timeout 做专门调优。

容错部分体现了 MegaScale 与普通训练框架的边界差异。每个 executor 管理一个节点并启动 GPU 训练进程，同时有 robust daemon 周期性向 driver 发送 heartbeat，包含进程状态、日志、硬件信息和 RDMA 指标。driver 发现异常或 heartbeat 超时后会暂停全局训练，触发轻量诊断：单机内 RNIC loopback、RNIC-to-RNIC、单机 GPU all-to-all、同 ToR 邻近机器 all-reduce 等，用来定位坏卡、坏链路或异常节点。坏节点被 Kubernetes 驱逐并补齐，作业从最近 checkpoint 恢复。checkpoint 采用两阶段：GPU worker 先把状态写入 host pinned memory 后立刻继续训练，后台进程异步刷到 HDFS；恢复时由同一数据并行组中的一个 worker 读取共享 state partition，再广播给组内其他 worker，降低 HDFS 读放大。

> 💡 关键：MegaScale 的贡献不只是“用了更多 GPU”，而是把模型结构、并行调度、通信库、网络、数据加载、监控、诊断和 checkpoint 都纳入同一个闭环，目标是在故障频繁发生的万卡环境里维持长期有效吞吐。

#### 🧪 练习题
```yaml
question: "MegaScale 为什么特别强调 goodput 而不仅是单步吞吐？"
options:
  - "万卡训练中故障、straggler、checkpoint 和恢复时间会显著影响长期有效训练速度"
  - "goodput 只衡量单卡峰值算力"
  - "goodput 与通信和容错无关"
  - "只要使用 FlashAttention-2，goodput 一定等于 MFU"
answer: 0
explain: "万卡同步训练下，小概率故障会频繁出现；长期有效吞吐必须把暂停、诊断、重启和恢复成本计入。"
```

### nnScaler

```yaml
id: nnscaler
num: 13
name: nnScaler
full_name: nnScaler
year: '2024'
org: Microsoft
parent: alpa
paper_url: https://arxiv.org/abs/2312.05009
project_url: ''
category: training_platform
motivation: 约束引导的并行策略生成
```

#### 📝 一句话总结
nnScaler 提出 constraint-guided parallelization plan generation，用 `op-trans`、`op-assign`、`op-order` 三个并行原语和用户约束构造可搜索的并行计划空间，解决固定 3D 并行或手写策略无法覆盖新模型高效训练计划的问题。

#### 🎯 核心要点
- 三个并行原语：`op-trans(op, algo, n)` 描述算子/张量变换，`op-assign(op, d)` 描述设备放置，`op-order(op1, op2)` 描述同设备无依赖算子的执行顺序
- 约束引导搜索：用专家约束把巨大搜索空间收缩到可搜索子空间，同时仍能表达 DP/TP/PP、Alpa 风格 staged SPMD 和新策略
- 新计划空间：为 SwinTransformer 的 co-shard、T5 大 embedding 跨全设备切分、AlphaFold2 的 3F1B 调度构造传统系统难表达的并行计划
- 搜索策略组合：先抽取 staged_spmd 子空间并复用 Alpa 搜索，再用 ILP 优化 partition/placement，最后用 Tessel/Z3 搜索 temporal order
- 编译正确性：vTensor-pTensor 用 mask 跟踪切分前后的数据 lineage，检测依赖、发现可能死锁的 cycle，并自动插入 split/chunk、send/recv、allgather、allreduce、alltoall
- PyTorch 落地：把单卡 PyTorch 模型转换为 Graph IR，应用计划后生成每个设备的 PyTorch 子图并用 `torchrun` 分布式执行

#### 🔬 深入细节
![nnScaler 并行原语的时空调度抽象](https://www.microsoft.com/en-us/research/wp-content/uploads/2024/09/nnscaler-1-1024x483.jpg)
*图：Microsoft Research 官方文章 Figure 1，展示 DNN 数据流图、算子切分和 spatial-temporal schedule。*

![nnScaler 文档中的并行化流程](https://nnscaler.readthedocs.io/en/latest/_images/nnScaler_flow.png)
*图：nnScaler 官方文档流程图，展示从单卡 DNN model program 到多设备 parallel execution 的编译路径。*

```python
# nnScaler 论文 Algorithm 1 风格的计划搜索与编译伪代码
def generate_parallel_plan(model, devices, user_constraints):
    G = trace_to_graph_ir(model)  # PyTorch -> Graph IR

    C_trans, C_assign, C_order = build_space_with_primitives(
        G,
        primitives=[
            "op-trans(op, algo, n)",
            "op-assign(op, device)",
            "op-order(op1, op2)",
        ],
        constraints=user_constraints,
    )

    # 1. 在能复用现有搜索器的子空间内先搜索
    G_sub, C_sub_trans, C_sub_assign = GetSubSpace(G, C_trans, C_assign)
    C_new_trans, C_new_assign = Alpa(G_sub, C_sub_trans, C_sub_assign)

    # 2. 收缩剩余空间，并用 ILP 找到全图 partition/placement
    C_trans, C_assign = ShrinkSpace(C_trans, C_new_trans, C_assign, C_new_assign)
    final_trans, final_assign = ILP(
        G,
        C_trans,
        C_assign,
        objective="minimize max_d(Comp_d + Comm_d)",
    )

    # 3. 搜索同设备上无依赖算子的 temporal order
    final_order = Tessel(G, final_trans, final_assign, C_order)

    # 4. 编译计划：应用原语、检查依赖、插入通信、生成每卡 PyTorch 代码
    dist_ir = apply_primitives(G, final_trans, final_assign, final_order)
    dist_ir = materialize_dependencies_with_vtensor_ptensor(dist_ir)
    dist_ir = insert_collectives_and_send_recv(dist_ir)
    return lower_to_pytorch_per_device(dist_ir)
```

nnScaler 的问题设定是：大模型训练的并行计划不仅要决定“张量怎么切”，还要决定“切完的算子放在哪些 GPU 上”和“同一 GPU 上多个可交换算子按什么顺序跑”。Megatron-LM、DeepSpeed 这类系统把高效但有限的 3D 并行模式工程化；Alpa 扩大了自动搜索空间，但仍依赖预定义的层级空间。nnScaler 的观点是，固定搜索空间会排除很多对新模型很关键的计划，例如某些大 activation 算子可以让多个分片共享同一 GPU 顺序执行来减少通信，或者 T5 这类模型的大 embedding 表占显存多但计算少，应该跨全设备切分而不是独占某个 pipeline stage。

三类原语是整个系统的最小表达单元：

$$
\text{op-trans}(op, algo, n): op \rightarrow \{op_1,\dots,op_n\}
$$

$$
\text{op-assign}(op_i, d): op_i \mapsto d,\quad d \in D
$$

$$
\text{op-order}(op_i, op_j): op_i \prec op_j
$$

其中 `op-trans` 负责把一个算子按 batch、hidden、head、sequence 等维度切成子算子，也可以扩展为 recompute 或 swap 等变换；`op-assign` 负责把子算子映射到设备；`op-order` 则只约束没有数据依赖但共享设备的算子顺序。约束把这些原语的参数固定或限制到一个集合。例如 data/tensor parallel 可表达为“均匀切成 \(|D|\) 份，且每个 sub-op 放在不同设备上”；1F1B pipeline 可表达为对 forward/backward micro-batch 的一组 `op-order` 约束；AlphaFold2 的 3F1B 则用新的 `op-order` 约束交错三个 forward pass 和一个 backward pass。

搜索目标并不是穷举全部计划，而是逐步缩小空间。论文的 partition/placement 目标可写成：

$$
\min \max_{d \in D}\left\{\text{Comp}_d + \text{Comm}_d\right\}
$$

这里 \(\text{Comp}_d\) 是设备 \(d\) 上被分配算子的计算时间，\(\text{Comm}_d\) 是由分片和跨设备数据依赖引入的通信时间。这个问题可归约为整数线性规划，天然难解；nnScaler 的关键是让专家约束先把空间切小，再复用已有搜索器。对 staged SPMD 子空间，它可以调用 Alpa 类搜索；对剩余约束，它用 ILP 求 final transformation/assignment；对 temporal order，它调用 Tessel，把每个 sub-graph 分配到整数 time slot，并用 Z3 枚举不违反依赖的顺序。也就是说，nnScaler 的贡献不是单独发明一个新搜索器，而是让不同搜索策略能在统一原语/约束接口下组合。

编译正确性由 vTensor-pTensor 负责。pTensor 表示原始逻辑模型中的张量，vTensor 表示应用并行原语后某个算子实际访问的张量片段；每个 vTensor 记录自己对应 pTensor 的 mask。两个 vTensor 是否存在数据依赖，可以通过它们是否来自同一 pTensor 且 mask 是否相交判断：

$$
\text{dep}(v_i, v_j) \Longleftrightarrow p(v_i)=p(v_j)\ \land\ \text{mask}(v_i)\cap\text{mask}(v_j)\neq\emptyset
$$

这种 lineage 追踪让 nnScaler 可以在切分和重排后重新构造数据流图，发现可能导致 deadlock 的 cycle，并在 materialization 阶段插入具体数据操作。如果 producer 和 consumer 在同设备，可能只需要 `torch.split` 或 `torch.chunk`；如果跨设备，先插入 send/recv；如果多个 vTensor 的访问模式构成常见 collective，系统会用 allgather、allreduce 或 alltoall 替换点对点通信，以获得更好的通信效率。

从工程角度看，nnScaler 把“模型代码”和“并行计划代码”解耦。模型开发者可以继续写单 GPU PyTorch，系统专家用约束描述计划空间；Graph IR 生成后，nnScaler 应用计划、插入通信、把每个设备的子图降回 PyTorch 代码文件，再由 `torchrun` 并行执行。论文报告其在 SwinTransformer、T5、AlphaFold2 等模型上发现传统 DeepSpeed、Megatron-LM、Alpa 搜索空间之外的计划，最高获得 3.5 倍训练加速；官方文档也强调它的定位是把单卡 DNN 程序编译为可在多 GPU 上并行运行的程序。

> ⚠️ 注意：给定元信息中的 arXiv URL `2312.05009` 与 nnScaler 论文不匹配；本文细节依据官方 USENIX OSDI 2024 论文、Microsoft Research 官方文章和 nnScaler 官方文档完成。

#### 🧪 练习题
```yaml
question: "nnScaler 中 vTensor-pTensor 抽象的主要作用是什么？"
options:
  - "跟踪算子切分后的张量 lineage 和 mask，用于依赖检查、死锁避免与通信插入"
  - "把所有张量永久复制到每张 GPU 上"
  - "替代 PyTorch 的自动求导数学规则"
  - "只用于记录实验日志"
answer: 0
explain: "pTensor 表示原始逻辑张量，vTensor 表示切分后的访问片段；mask 相交关系让系统能重建数据依赖并选择 send/recv 或 collective 通信。"
```

### AXLearn

```yaml
id: axlearn
num: 14
name: AXLearn
full_name: AXLearn
year: '2026'
org: Apple
parent: pytorch
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 模块化、硬件无关训练平台
```

#### 📝 一句话总结
AXLearn 提出模块化、硬件无关的大模型训练平台，用严格封装的层级配置、JAX/XLA/GSPMD 编译栈和云无关运行时，解决大模型团队在模型变体、硬件后端和生产训练运维之间反复改代码的问题。

#### 🎯 核心要点
- 以严格封装的 `Module + Config` 体系替代继承式扩展，让 MoE、RoPE、FlashAttention、量化等功能可以作为可组合模块注入
- 提出 LoC-complexity 度量，用“新增功能随模块数增长需要改多少现有代码”衡量训练框架可扩展性
- AXLearn Composer 将 Python 层级配置物化为 JAX 程序，并注入 mesh、sharding、attention kernel、rematerialization 和编译选项
- AXLearn Runtime 负责分布式作业编排、checkpoint、监控、故障恢复、SDC/hang 检测以及多云环境下的弹性运行
- 通过 mesh rules 为 GPU、TPU、AWS Trainium/Trainium2 等不同后端选择不同并行、精度、内存和 kernel 策略
- 支持 AOT 编译分析，在大规模运行前本地检查 OOM、FLOPs、sharding 和编译错误
- 官方论文/项目资料显示 AXLearn 可训练数百亿到数千亿参数模型，并在 TPU/GPU/Trainium 后端保持接近主流训练系统的性能

#### 🔬 深入细节
![AXLearn 系统架构图](https://arxiv.org/html/2507.05411v1/x2.png)
*图：来自 AXLearn 论文 Figure 2，蓝色部分为 AXLearn；用户配置经 Composer 转换为 JAX/XLA 程序，再由 Runtime 在 Kubernetes/云硬件上编排执行。*

![AXLearn invocation context](https://arxiv.org/html/2507.05411v1/extracted/6594419/figures/context.png)
*图：来自 AXLearn 论文的 invocation context 示例，展示模块调用过程中如何集中管理随机数、状态和输出集合，避免子模块私自穿透封装。*

```python
# AXLearn 配置组合、硬件适配与训练执行伪代码
def build_axlearn_job(target_hardware: str):
    cfg = Trainer.default_config()
    cfg.model = DecoderOnlyTransformer.default_config()
    cfg.input = TextInput.default_config()
    cfg.learner = AdamW.default_config()

    # 功能通过 config tree 注入，而不是修改 Transformer/Trainer 的现有接口。
    cfg = replace_submodules(cfg, old=FeedForwardLayer, new=MoELayer.default_config())
    cfg = attach_rope(cfg, target=AttentionLayer, rope=RoPE.default_config())

    # mesh rule 根据硬件后端选择不同的并行、重算、低精度和 kernel。
    if target_hardware == "tpu-v5e":
        cfg = apply_mesh_rule(cfg, fsdp_within_slice=True, dp_across_slices=True)
        cfg = enable_int8_training(cfg)
        cfg = offload_dot_activations_to_host(cfg)
    elif target_hardware == "h100":
        cfg = apply_mesh_rule(cfg, tensor_parallel=8, fsdp_across_nodes=True)
        cfg = enable_fp8_training(cfg, delayed_scaling=True)
        cfg = save_remat_points(cfg, tags=["q", "k", "v", "o"])
    elif target_hardware == "trainium2":
        cfg = select_attention_kernel(cfg, backend="neuron_nki")

    jax_program, xla_options = AXLearnComposer.materialize(cfg)
    AXLearnComposer.aot_check(jax_program, xla_options)
    executable = XLA.compile(jax_program, xla_options)
    AXLearnRuntime.run(executable, checkpoint=True, monitor=True, fault_tolerant=True)
```

AXLearn 的核心问题不是单个 Transformer 算子的速度，而是生产环境中模型工程复杂度会随模型、功能和硬件后端成倍增长。传统继承式系统常把 RoPE、MoE、attention kernel、KV cache 或量化参数沿着多层构造函数向下传递；一旦新增一个功能，父模块、子模块、trainer、loss、checkpoint 逻辑都可能要改。AXLearn 把每个组件视为配置树中的节点：节点只暴露自己的 config、输入输出和状态集合，父节点通过组合选择子节点实现。这样新增 MoE 时可以把 FFN 子树替换成 MoE 子树，而不要求所有 Transformer 变体都新增 MoE 参数。

论文用 LoC-complexity 把这种工程差异形式化。设 \(n\) 为系统中的模块数量，\(k\) 为某类新功能的变体数，若新增功能需要修改每个祖先模块或每种 attention/model 组合，复杂度会近似增长为：

$$
C_{\text{subtyping}}(F) = \Omega(n) \quad \text{or} \quad \Omega(nk)
$$

AXLearn 的目标是把功能封装在独立模块和 config modifier 中，使新增功能对现有模块接口的修改保持常数级：

$$
C_{\text{AXLearn}}(F) = O(1)
$$

这不是简单少写几行配置，而是让“功能扩展”不再污染已有模型的公共 API。论文以 RoPE/MoE 为例说明，AXLearn 可用约 10 行配置在大量实验中启用这些功能；相同功能在扁平 config 或继承式系统中往往需要修改 attention、MLP、model wrapper、loss 或 trainer 的签名。

Composer 是从“模块化配置”到“可高效执行程序”的桥梁。用户仍然写 Python config，但 Composer 会完成更接近编译器的工作：选择 accelerator mesh shape，为参数和激活添加 sharding annotation，按后端挑选 attention kernel，设置 XLA 编译选项，并根据模块树里的 tag 选择 rematerialization 策略。一个 Linear 层可以用类似 `("fsdp", "model")` 的 partition spec 表达“参数同时沿 FSDP 和 tensor parallel 轴切分”；XLA/GSPMD 再把全局程序 lowers 成每个设备的 SPMD 程序。关键是模型定义不需要硬编码“这是 GPU 版”或“这是 TPU 版”。

硬件无关性体现在 mesh rules。TPU v5e 的片内 ICI 和片间 DCN 拓扑适合“片内 FSDP、片间 DP、INT8、host offload”；H100 节点内 NVLink 强，常见选择是 8-way tensor parallel 叠加跨节点 FSDP，并使用 FP8 delayed scaling；Trainium 则可能需要 Neuron/NKI kernel。AXLearn 把这些策略写成 target-dependent config modifiers：同一份模型结构在不同硬件上切换并行轴、保存/重算点、低精度格式和 kernel，不改模型代码。

Runtime 处理的是论文中容易被忽略但生产训练必须面对的部分：分布式作业提交、checkpoint、日志指标、故障恢复、hang recovery、silent data corruption 检测和云厂商差异。训练数百亿到数千亿参数模型时，系统错误不是异常事件，而是常态；因此 AXLearn 把容错和可观测性放进平台层，而不是留给每个实验脚本。AOT 编译也服务于这个目标：先在单机上检查 sharding、OOM 和 FLOPs，再把作业发到大集群，减少昂贵的失败启动。

与 Megatron-LM/DeepSpeed 这类以张量并行或状态分片为核心的系统相比，AXLearn 的贡献更偏“训练平台抽象”。它并不否定 TP/FSDP/remat/FlashAttention，而是把这些策略放进可组合、可测试、可迁移的配置系统中。真正的收益来自长期迭代：当模型、后端和 kernel 不断变化时，研究代码仍能保持局部替换，而不是把每个新功能扩散成一次全仓库接口迁移。

> 💡 关键：AXLearn 把大模型训练系统拆成“可组合模型模块 + 后端感知 Composer + 生产 Runtime”三层，使研究者主要表达模型意图，平台层再根据硬件和规模选择执行策略。

#### 🧪 练习题
```yaml
question: "AXLearn 为什么要提出 LoC-complexity，而不是只统计当前实现的代码行数？"
options:
  - "因为它想衡量新增功能随模块和变体数量扩展时需要修改多少现有接口代码"
  - "因为 JAX 代码无法统计行数"
  - "因为 LoC-complexity 直接等价于训练吞吐"
  - "因为它用于替代 checkpoint 机制"
answer: 0
explain: "LoC-complexity 关注功能扩展时修改面是否随模块数增长；AXLearn 通过严格封装和组合式配置把这种修改面压到常数级。"
```

### ProTrain

```yaml
id: protrain
num: 15
name: ProTrain
full_name: ProTrain
year: '2026'
org: MLSys Community
parent: deepspeed
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 自动内存管理机制，动态张量生命周期分析
```

#### 📝 一句话总结
ProTrain 提出了一套自适应内存管理系统，通过 Chunk 级模型状态管理、Block 级激活管理和内存感知运行时 Profiler 三大组件的协同，自动搜索最优的 offloading/checkpointing/swapping 配置，无需用户手动调参即可在有限 GPU 内存下实现 1.43×–2.71× 的训练吞吐量提升。

#### 🎯 核心要点
- **Chunk-Based Model State Management**：将模型状态（参数、梯度、优化器状态）组织为统一大小的 Chunk，支持 5 种关键操作（all-gather、reduce-scatter、upload、offload、prefetch），并引入 persistent chunk（常驻 GPU）和 chunk buffer 减少动态内存分配
- **Block-Wise Activation Management**：以 Transformer Block 为粒度管理激活，每个 Block 独立选择 swapping / checkpointing / 不处理三种策略，采用交错式 swapping+checkpointing 布局隐藏通信开销
- **Memory-Aware Runtime Profiler**：采用 drop-and-regenerate 方法在有限内存下完成全模型 profiling，通过 hook 机制推断不可 hook 算子的内存和时间开销
- **Adaptive Memory Management**：包含 Chunk-Aware Runtime Estimator、Peak Memory Usage Estimator 和 Optimal Configuration Search 三个子模块，自动搜索最优配置
- **核心公式**：\(T_{\text{Iteration}} = T_{\text{FWD}} + \max\{T_{\text{BWD}} + T_{\text{GPU\_OPTIM}},\; T_{\text{CPU\_OPTIM}}\}\)
- **实验结果**：在 RTX 3090 上训练模型规模可达 DeepSpeed 的 2×，吞吐量平均提升 1.77×–2.71×；在 A100 上模型规模可达 FSDP 的 7×，吞吐量提升 1.43×–2.25×

#### 🔬 深入细节
##### 系统架构总览

![ProTrain Chunk-Based Model State Management](https://arxiv.org/html/2406.08334v2/x1.png)
*图 1：Chunk-Based Model State Management 的五种关键操作示意。每个 Chunk 在分布式训练中被均匀分片到各 GPU，通过 all-gather 聚合、reduce-scatter 归约、upload/offload 在 CPU-GPU 间迁移。*

![ProTrain Block-Wise Activation Management](https://arxiv.org/html/2406.08334v2/x2.png)
*图 2：Block-Wise Activation Management 布局及内存使用趋势。展示了 swapping block、checkpointing block 和普通 block 的交错排布策略。*

##### 算法伪代码

```python
# ProTrain 自适应内存管理搜索伪代码
def protrain_adaptive_search(model, hardware_info):
    # Step 1: Memory-Aware Runtime Profiling
    profiler = MemoryAwareProfiler(model)
    profiler.drop_and_regenerate_profile()  # 逐层 profile，丢弃非当前层数据
    op_times, op_memory, peak_memory = profiler.collect()

    # Step 2: 枚举配置空间
    best_config, best_time = None, float('inf')
    for n_persistent in range(0, max_persistent + 1):       # persistent chunk 数量
        for n_chunk_buf in range(1, max_buf + 1):            # chunk buffer 数量
            for swap_interval in candidate_intervals:         # activation swap 间隔
                # Step 3: Chunk-Aware Runtime Estimation
                T_fwd = estimate_forward(op_times, n_persistent, n_chunk_buf)
                T_bwd = estimate_backward(op_times, n_persistent, swap_interval)
                T_gpu_optim = estimate_gpu_optim(n_persistent)
                T_cpu_optim = estimate_cpu_optim(n_persistent, n_chunk_buf)
                T_iter = T_fwd + max(T_bwd + T_gpu_optim, T_cpu_optim)

                # Step 4: Peak Memory Usage Estimation
                peak_mem = estimate_peak_memory(
                    n_persistent, n_chunk_buf, swap_interval,
                    op_memory, peak_memory
                )

                # Step 5: 选择满足内存约束的最快配置
                if peak_mem <= hardware_info.gpu_memory and T_iter < best_time:
                    best_config = (n_persistent, n_chunk_buf, swap_interval)
                    best_time = T_iter

    return best_config

# ProTrain 单次迭代训练流程
def protrain_train_step(model, data, config):
    n_persistent, n_chunk_buf, swap_interval = config

    # Forward: 逐 chunk prefetch + 计算，activation 按策略处理
    for block_id, chunk in enumerate(model.chunks):
        prefetch_next_chunk(block_id + 1)           # ❶ 异步预取下一个 chunk
        all_gather(chunk)                            # ❷ 聚合完整参数
        activations[block_id] = forward(chunk, data)
        if is_swap_block(block_id, swap_interval):
            async_offload_activation(activations[block_id])  # swap out
        elif is_ckpt_block(block_id, swap_interval):
            save_input_only(activations[block_id])           # checkpoint

    # Backward: 逆序处理，recompute/swap-in 激活
    for block_id in reversed(range(len(model.chunks))):
        chunk = model.chunks[block_id]
        all_gather(chunk)                            # ❷ 重新聚合参数
        if is_swap_block(block_id, swap_interval):
            async_prefetch_activation(block_id)      # swap in
        elif is_ckpt_block(block_id, swap_interval):
            recompute_activation(block_id)           # 重计算
        grads = backward(chunk, activations[block_id])
        reduce_scatter(chunk)                        # ❸ 梯度归约
        async_offload_gradients(chunk)               # ❹ 梯度异步下传 CPU

    # Optimizer: GPU 更新 persistent chunks，CPU 更新其余
    gpu_optim_step(persistent_chunks)                # ❺ GPU 上更新
    cpu_optim_step(non_persistent_chunks)            # CPU 并行更新（与 BWD 重叠）
```

##### 方法细节深入解析

**1. 动机与背景：为什么需要自适应内存管理？**

LLM 训练的内存消耗主要来自两部分：**模型状态**（参数 + 梯度 + 优化器状态，每个参数约需 16× 内存）和**激活**（随 batch size 和模型深度线性增长）。现有框架如 DeepSpeed、FSDP 提供的内存管理存在两个关键缺陷：

1. **粒度过粗**：只支持 ZeRO-2/ZeRO-3 的二选一、offloading 的全开/全关、gradient checkpointing 的全部/不用，无法针对不同 block 做差异化处理
2. **依赖手动配置**：用户需要手动选择 ZeRO stage、offloading 目标（CPU/NVMe）、各种阈值参数，配置不当会导致 OOM 或性能低下

> 💡 **关键洞察**：不同的 Transformer block 在内存压力和计算特性上是相似的，但整体的内存-计算-IO 平衡点取决于模型规模、硬件配置和 batch size 的组合。ProTrain 的核心思想是将这个多维搜索问题自动化。

**2. Chunk-Based Model State Management：统一粒度的模型状态管理**

ProTrain 将所有模型状态组织为**统一大小的 Chunk**，每个 Chunk 通常对应一个 Transformer Block 的全部参数。这种设计带来三个优势：

- **带宽效率**：大块连续内存的传输比零散小张量更高效，充分利用 PCIe/NVLink 带宽
- **内存可预测性**：统一大小使得内存占用可精确计算，为自适应搜索提供基础
- **减少碎片**：通过 chunk buffer 机制复用内存，避免频繁的 malloc/free

ProTrain 引入两个关键概念：

- **Persistent Chunk**：常驻 GPU 内存的 chunk，无需 offload/upload，适用于内存充裕时保留高频访问的参数
- **Chunk Buffer**：GPU 上的临时缓冲区，用于存放从 CPU 上传的 chunk 数据，数量决定了 prefetch 的并行度

Chunk 按**运行时执行顺序**（而非初始化顺序）排列，减少因内存不足导致的反复加载卸载。

**3. Block-Wise Activation Management：交错式激活管理**

ProTrain 对每个 Transformer Block 的激活独立选择三种策略之一：

| 策略 | 内存开销 | 计算开销 | IO 开销 |
|------|---------|---------|---------|
| **Neither**（保留） | 高（全部激活驻留 GPU） | 无 | 无 |
| **Checkpointing**（重计算） | 低（仅保存 block 输入） | 高（backward 时重算 forward） | 无 |
| **Swapping**（换出） | 低（激活移至 CPU） | 无 | 高（需要 swap-out/swap-in） |

> ⚠️ **注意**：单纯使用 swapping 会因 PCIe 带宽瓶颈导致性能下降。ProTrain 的关键创新是**交错式布局**：典型配置为 1 个 swap block 后跟若干个 checkpoint block，swap 间隔精心选择使得 swap-out 的 IO 时间恰好被后续 checkpoint block 的计算时间覆盖。

具体来说，swapping interval \(I\) 的选择满足：

$$T_{\text{swap-out}}(1\text{ block}) \leq I \times T_{\text{compute}}(1\text{ block})$$

这确保了 swap 操作完全被计算隐藏，不引入额外延迟。在 backward 阶段，先处理 neither block（释放内存），再处理 checkpoint 和 swap block，形成内存使用的"先降后升"曲线，避免峰值溢出。

**4. Memory-Aware Runtime Profiler：精确的运行时感知**

传统 profiling 方法存在两个问题：
- **静态分析**低估实际内存需求（忽略临时缓冲区）
- **逐层 profiling**无法捕获不可 hook 算子的开销

ProTrain 的 **drop-and-regenerate** 方法解决了大模型 profiling 的内存限制：在 profiling 每一层时，丢弃其他层的数据（参数、梯度、激活），仅保留当前层所需数据。通过在每个可 hook 算子前后注册 hook，监控内存变化和峰值，推断不可 hook 算子的内存和时间开销。

Profiler 还收集硬件指标：内存传输带宽、集合通信延迟（在隔离和重叠场景下分别测量），为 Runtime Estimator 提供准确的硬件参数。

**5. Adaptive Memory Management：自动配置搜索**

搜索空间由三个维度定义：
- \(n_p\)：persistent chunk 数量（0 到总 chunk 数）
- \(n_b\)：chunk buffer 数量（决定 prefetch 并行度）
- \(I\)：activation swapping interval

对于每个候选配置，ProTrain 通过以下公式估算单次迭代时间：

$$T_{\text{Iteration}} = T_{\text{FWD}} + \max\{T_{\text{BWD}} + T_{\text{GPU\_OPTIM}},\; T_{\text{CPU\_OPTIM}}\}$$

其中：
- \(T_{\text{FWD}}\) 和 \(T_{\text{BWD}}\) 通过逐 chunk 聚合算子时间 + 通信时间（取 compute-bound 和 communication-bound 中的较大值）得到
- \(T_{\text{GPU\_OPTIM}}\) 为 persistent chunk 使用 FusedAdam 的更新时间
- \(T_{\text{CPU\_OPTIM}}\) 为非 persistent chunk 在 CPU 上的更新时间，与 backward 计算并行

Peak Memory Estimator 结合 profiler 数据和 chunk 配置，精确预测峰值内存。最终选择满足内存约束且迭代时间最短的配置。

**6. 与现有方法的对比**

| 特性 | DeepSpeed | FSDP | Colossal-AI | **ProTrain** |
|------|-----------|------|-------------|-------------|
| 内存管理粒度 | 全局（ZeRO stage） | 全局 | Chunk 级 | **Chunk + Block 级** |
| Offloading 控制 | 全开/全关 | 全开/全关 | 用户指定比例 | **自动决定** |
| Checkpointing | 全部/不用 | 全部/不用 | 全部/不用 | **逐 Block 选择** |
| Activation Swapping | 不支持 | 不支持 | 不支持 | **交错式 Swapping** |
| 用户配置需求 | 高（多参数） | 中 | 中（需指定比例） | **零配置** |
| 最大模型规模（4×RTX3090） | 15B | 15B | 25B | **30B** |

#### 🧪 练习题
```yaml
question: "ProTrain 的 Block-Wise Activation Management 中，交错式 swapping+checkpointing 策略的核心设计目的是什么？"
options:
  - "通过增加 checkpointing block 数量来最大化内存节省"
  - "让 swap-out 的 IO 时间被后续 checkpoint block 的重计算时间覆盖，从而隐藏通信开销"
  - "减少 backward 阶段的重计算量以加速训练"
  - "确保所有 block 的激活都被换出到 CPU 以释放 GPU 内存"
answer: 1
explain: "交错式布局的关键在于 swap interval 的选择使得 swap-out 的 IO 时间恰好被后续若干个 checkpoint block 的计算时间覆盖，实现通信与计算的重叠，在节省内存的同时不引入额外延迟。"
```

### BOOST

```yaml
id: boost
num: 16
name: BOOST
full_name: BOOST
year: '2026'
org: MLSys Community
parent: megatron_lm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: training_platform
motivation: 针对低秩大模型训练的瓶颈优化框架
```

#### 📝 一句话总结
BOOST 提出面向低秩瓶颈 LLM 预训练的分布式训练框架，通过 Bottleneck-aware Tensor Parallelism 将通信边界移动到低维 bottleneck，并结合 Online RMSNorm、线性层分组和低秩激活检查点，解决低秩模型在标准 Megatron 式 3D 并行下通信过多、GPU 利用率低的问题。

#### 🎯 核心要点
- 面向低秩/瓶颈 Transformer 预训练，而不是 LoRA 微调；目标是在 backbone 本身低秩化后仍能高效扩展
- 分析 vanilla low-rank TP 的双重低效：每个瓶颈线性层都引入 collective，且沿低秩维度切分会让 GEMM arithmetic intensity 下降
- 提出 Bottleneck-aware Tensor Parallelism (BTP)：把 TP chunk 边界平移一个 bottleneck layer，让 collective 发生在 \(r \ll d\) 的低维激活上
- BTP 同时减少通信量和改善 GEMM 形状：沿 hidden dimension 切分，而不是进一步切碎已经很窄的 rank dimension
- Online RMSNorm 将局部 RMSNorm 统计与后续 row-split GEMM 的 all-reduce 融合，避免独立的小 payload 同步
- Linear layer grouping 用拼接/批量 GEMM 合并多个低秩线性层，降低 kernel launch 和 collective 次数
- Comm-free low-rank activation checkpointing 只保存低秩激活，反向重算时避免额外通信
- 论文报告在多种低秩结构上相对 full-rank baseline 有 1.46-1.91x 加速，相对 naive low-rank 3D parallelism 有 1.87-2.27x 加速

#### 🔬 深入细节
![BOOST framework overview](https://arxiv.org/html/2512.12131v2/mlsys2026/figure/Framework_Overview.png)
*图：来自 BOOST 论文 Figure 1，展示低秩瓶颈结构、vanilla TP 的 runtime breakdown，以及 BOOST 框架由 BTP、Online RMSNorm、linear grouping 和 activation checkpointing 组成。*

![BOOST Bottleneck-aware Tensor Parallelism](https://arxiv.org/html/2512.12131v2/mlsys2026/figure/btp_main_edited.png)
*图：来自 BOOST 论文 Figure 3。上方 vanilla TP 为每个低秩线性块放置独立 `f/g` 通信边界；下方 BTP 将边界平移到 bottleneck，使同一个低维边界服务相邻的 up/down projection。*

```python
# BOOST: Bottleneck-aware Tensor Parallelism + Online RMSNorm, simplified.
# x: [tokens, d], low-rank dimension r << d, tp_size = p
def btp_block(x, tp_rank, tp_group):
    # Current chunk starts at an up projection and ends after the next down projection.
    # W_up is column-split along hidden dimension d, so each rank produces y_i.
    z = low_rank_activation_from_previous_chunk(x)        # [tokens, r], already at bottleneck
    y_i = z @ shard_columns(W_up, tp_rank)                # [tokens, d / p]
    y_i = activation(y_i)

    # RMSNorm is sharded-unsafe, so BOOST uses online recovery.
    local_ss = sum(y_i * y_i, axis=-1, keepdim=True)
    local_rms = sqrt(local_ss / (d / p) + eps)
    yhat_i = (y_i / local_rms) * shard_gamma(gamma, tp_rank)

    # Next down projection is row-split; fuse output and norm statistic in one collective.
    z_partial = yhat_i @ shard_rows(W_down_next, tp_rank) # [tokens, r]
    z_sum, global_ss = all_reduce_sum((z_partial, local_ss), group=tp_group)

    # Recover exact global RMSNorm effect after the fused collective.
    global_rms = sqrt(global_ss / d + eps)
    correction = local_rms / global_rms
    z_next = recover_scaled_output(z_sum, correction)
    return z_next                                         # [tokens, r]
```

低秩瓶颈层通常把一个 \(d \times d\) 投影替换成两个小矩阵：

$$
Y = \phi(X W_{\text{down}}), \quad Z = Y W_{\text{up}}, \quad
W_{\text{down}} \in \mathbb{R}^{d \times r},\; W_{\text{up}} \in \mathbb{R}^{r \times d},\; r \ll d
$$

单卡上这会显著减少 FLOPs 和参数量，但分布式训练并不会自动变快。Megatron-LM 式 TP 原本假设每个 Transformer block 里有少数几个大矩阵，通信点可以放在 MLP/attention 的自然边界。低秩化后，一个大矩阵变成更深的 down/up 链路；如果仍把每对 low-rank 层当作独立 TP chunk，就会为更多线性层插入 `f/g` collective，导致通信启动次数和激活同步量上升。

vanilla low-rank TP 的计算问题同样严重。低秩结构已经把有效维度从 \(d\) 降到 \(r\)，如果 TP 再沿 \(r\) 维切分，每张 GPU 的 GEMM reduction dimension 变成 \(r/p\)。这类小 GEMM 数据搬运多、计算少，容易落入 memory-bound 区域。BOOST 的观察是：低秩模型的并行策略必须理解 bottleneck，而不能把每个 low-rank linear 当成普通 dense linear。

BTP 的关键动作是把 TP chunk 边界平移一个 bottleneck layer：chunk 从上投影 \(W_{\text{up}}\) 开始，到下一层下投影 \(W_{\text{down}}\) 结束。这样 collective 发生在低维激活 \(r\) 上，而 shard 仍沿较大的 hidden dimension \(d\) 组织。若一次 hidden activation collective 的 payload 近似为：

$$
B_d = \text{bytes} \cdot \text{tokens} \cdot d
$$

则 bottleneck 处的 collective 近似为：

$$
B_r = \text{bytes} \cdot \text{tokens} \cdot r,\quad
\frac{B_d}{B_r} = \frac{d}{r}
$$

当 \(r \ll d\) 时，把同步点移到 bottleneck 直接降低通信量；同时 GEMM 沿 \(d\) 维切分，保留更健康的矩阵形状。论文报告 BTP 在通信量和 hardware FLOPs utilization 两端都优于 naive low-rank TP。

Online RMSNorm 解决的是 BTP 引入的新约束。RMSNorm 的标准形式为：

$$
\operatorname{RMSNorm}(x)=\gamma \odot \frac{x}{\sqrt{\frac{1}{d}\sum_{j=1}^{d}x_j^2+\epsilon}}
$$

但 BTP chunk 内的激活按 hidden dimension 分片，每个 rank 只能看到 \(d/p\) 个元素；若直接计算 RMSNorm，就缺少全局平方和。朴素做法是单独 all-reduce 一个很小的统计量，但这种小 payload collective 被 launch latency 支配。BOOST 改为先计算局部平方和 \(s_i\) 和局部 RMS，把统计量与后续 row-split GEMM 的 all-reduce 一起发送，再用全局 \(s=\sum_i s_i\) 恢复标准 RMSNorm 等价结果。直觉上，它把“必须同步归一化统计”的时刻推迟到本来就要同步的 GEMM 边界。

Linear layer grouping 和低秩激活检查点是为了把 BTP 的理论收益落到端到端训练上。低秩模型的小矩阵更多，kernel launch 和 collective 数量更容易成为瓶颈；BOOST 对共享输入的 down projections 用权重拼接，对输入不同的 up projections 用 batched GEMM，把多个小操作合并成更大的操作。激活检查点方面，低秩结构天然有小激活 \(r\)，保存这些低秩边界并在反向局部重算，可以减少 HBM 压力，同时避免为了重算而重新触发跨 rank 通信。

与 Megatron-LM 的通用 TP 相比，BOOST 更像“结构感知 TP”。Megatron-LM 通过列切/行切把 dense Transformer 的通信压到少数边界；BOOST 则在低秩 Transformer 里重新寻找这些边界。它的结论可以概括为：模型结构变成 bottleneck 后，系统并行边界也必须随之移动，否则参数/FLOPs 减少会被通信、kernel launch 和低 arithmetic intensity 抵消。

> 💡 关键：BOOST 不只是把低秩模型接到 Megatron-LM 上，而是重新定义“哪里同步、沿什么维度切、哪些小操作合并”，让低秩带来的算法节省不会在分布式系统层被吃掉。

#### 🧪 练习题
```yaml
question: "BOOST 的 Bottleneck-aware Tensor Parallelism 为什么能同时降低通信并提高 GPU 利用率？"
options:
  - "它把 collective 移到低维 bottleneck，同时沿较大的 hidden dimension 组织切分以改善 GEMM 形状"
  - "它取消了所有 tensor parallel collective"
  - "它把低秩模型还原成 full-rank 模型"
  - "它只依赖更大的 batch size，不改变并行边界"
answer: 0
explain: "BTP 利用 r << d 的瓶颈激活降低同步 payload，并避免继续切碎低秩维度，从而减少通信且提升 arithmetic intensity。"
```

### Tessera

```yaml
id: tessera
num: 17
name: Tessera
full_name: Tessera
year: '2026'
org: OSDI Community
parent: megascale
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: training_platform
motivation: 整体流水线并行框架，解决万亿参数MoE训练
```

#### 📝 一句话总结
Tessera 面向万亿参数异构 MoE 训练提出整体流水线并行框架，将 pipeline partition、expert/data parallel placement、microbatch overlap 和 backward 调度放在同一优化空间中，缓解 MoE 训练里 stage 不均衡、专家路由倾斜和 all-to-all 通信相互放大的问题。

#### 🎯 核心要点
- 官方 OSDI 2026 条目将 Tessera 放在 “LLM Training at Scale” track，题名明确指向 trillion-parameter heterogeneous MoE training
- 核心对象是异构 MoE：dense attention/shared layer、routed experts、shared experts、router 和不同专家规模共同造成非均匀 stage cost
- 整体优化 pipeline parallelism：不是先静态切层再局部调专家，而是联合决定 stage boundary、expert placement、microbatch schedule 和通信重叠
- 需要处理 MoE 的 token routing skew：每个 microbatch 激活的专家和 token 数不同，导致 expert compute 与 all-to-all 时间随批次变化
- 通过动态 backward scheduling 消化异构 stage 的 readiness 差异，减少固定 1F1B 在慢专家或慢 stage 上形成的 pipeline bubble
- 与 Megascale/Megatron 类生产训练栈互补：后者提供 3D/4D 并行基础，Tessera 关注 MoE pipeline 层面的全局排布和调度
- 公开页面暂未释放 Tessera PDF/论文图；以下机制解读基于官方题名、USENIX 会议信息及公开 MoE/PP/EP 系统资料，涉及推断处已明确说明

#### 🔬 深入细节
![PP + EP + DP 组合参考图](https://arxiv.org/html/2606.11169v1/x1.png)
*图：公开参考图来自 Piper 论文 Figure 1，展示 MoE Transformer 中 PP across layers、expert parallelism 和 data parallelism 的组合。该图不是 Tessera 原图；由于 OSDI 页面当前未公开 Tessera 论文图，这里用它说明 Tessera 所面对的 PP/EP/DP 组合训练形态。*

```python
# Tessera-style holistic MoE pipeline scheduling, reconstructed from public title/context.
def tessera_plan(model, cluster, routing_trace):
    # 1. Profile heterogeneous costs instead of assuming every Transformer layer is equal.
    layer_cost = profile_dense_attention_and_shared_layers(model, cluster)
    expert_cost = profile_experts(model.experts, cluster)
    comm_cost = measure_links(cluster, ops=["pp_send_recv", "ep_all_to_all", "dp_all_reduce"])

    # 2. Estimate per-stage time under candidate partition + placement.
    candidates = enumerate_stage_boundaries(model.layers)
    candidates = attach_expert_placements(candidates, model.experts, cluster)
    best = None
    for plan in candidates:
        for mb in routing_trace:
            token_hist = estimate_tokens_per_expert(mb, model.router)
            stage_time = simulate_pipeline(
                plan=plan,
                token_hist=token_hist,
                layer_cost=layer_cost,
                expert_cost=expert_cost,
                comm_cost=comm_cost,
                overlap=True,
            )
        best = argmin_objective(best, plan, objective="iteration_time + memory_penalty")

    # 3. Runtime scheduling: issue ready microbatches/backward tasks to hide all-to-all.
    ready = initialize_microbatch_queue(best)
    while ready:
        task = pick_ready_task(ready, policy="minimize_bubble_and_a2a_wait")
        overlap(task.compute, task.pp_send_recv, task.ep_all_to_all)
        update_ready_queue(task)
    return best
```

MoE 训练和 dense Transformer 的根本差异在于“每层代价不是固定的”。Dense 层的计算量主要由 batch、sequence、hidden size 决定；MoE 层还要经过 router，把 token 分配给 top-\(k\) 专家。对第 \(s\) 个 pipeline stage 和第 \(m\) 个 microbatch，可以把 stage 时间粗略写成：

$$
T_s(m)=T^{\text{dense}}_s(m)+T^{\text{route}}_s(m)+T^{\text{a2a}}_s(m)+\max_{e \in E_s}T^{\text{expert}}_{s,e}(n_{m,e})+T^{\text{pp}}_s(m)
$$

其中 \(n_{m,e}\) 是 microbatch \(m\) 路由到专家 \(e\) 的 token 数。这个式子解释了为什么 Tessera 需要“holistic”：即使层数平均，热门专家也会让某个 stage 变慢；即使专家放置均衡，all-to-all 也可能和 pipeline send/recv、data-parallel all-reduce 争抢网络；即使单个 stage 最优，固定 1F1B 顺序也可能在 backward 阶段等待慢 stage。

普通 pipeline parallelism 常用 bubble 近似分析：

$$
\text{bubble} \approx \frac{P-1}{M+P-1}
$$

其中 \(P\) 是 pipeline stage 数，\(M\) 是 microbatch 数。这个公式隐含每个 stage 时间相近；异构 MoE 下更现实的迭代时间接近：

$$
T_{\text{iter}} \approx T_{\text{warmup}} + M \cdot \max_s \mathbb{E}_m[T_s(m)] + T_{\text{drain}} + T_{\text{contention}}
$$

Tessera 要优化的不是单纯增加 \(M\)，而是降低 \(\max_s T_s\) 和 \(T_{\text{contention}}\)。这意味着 stage boundary 不能只按层数切，expert placement 不能只按专家个数均分，microbatch order 也不能只套固定表格。

从题名和相关公开系统材料看，Tessera 的关键机制应是把 PP partitioning 与 microbatch overlap schedule 联合搜索或联合求解。对 heterogeneous MoE，分区器需要知道哪些 dense 层重、哪些 expert 层重、哪些专家经常被一起激活，以及设备拓扑里哪些 GPU/节点之间 all-to-all 代价低。然后调度器在 runtime 让 forward、backward、expert all-to-all 和 pipeline p2p 尽量错峰：当某个 backward 已经 ready 且能填补慢 stage 的空档时，优先发射它，而不是严格按静态 1F1B 队列等待。

动态 backward scheduling 的直觉是“ready 不等于立即执行，未 ready 也不应阻塞全局”。MoE backward 同样包含 expert gradient、router gradient、dense gradient 和跨设备通信；如果把所有 backward 绑定到固定 microbatch 顺序，热门专家造成的单点延迟会沿 pipeline 传播。Tessera 这类 holistic 框架更可能把训练 step 表示为带依赖的 DAG：节点是 dense compute、expert compute、all-to-all、send/recv、all-reduce；边表示 activation/gradient 依赖；调度目标是在显存预算内最小化 makespan。

与 Megascale/Megatron 的关系可以理解为“基础并行能力”和“MoE pipeline 全局调度”的分层。Megascale/Megatron 提供 TP、PP、DP、EP、ZeRO/FSDP、checkpoint 等执行原语；Tessera 关注如何在万亿参数异构 MoE 中组合这些原语。对于 dense 模型，PP stage balance 主要看层 FLOPs 和 activation size；对于 Tessera 的目标场景，还必须把 token histogram、expert hotness、all-to-all 拓扑、shared expert 和 backward readiness 一起考虑。

公开信息的限制也需要明确：截至本次写入，USENIX 页面公开了标题、作者、track 和 Operational Systems Paper 类别，但没有稳定 PDF、abstract 或原始 figure URL。因此，上述伪代码和公式是基于标题所指问题、OSDI 条目以及公开 MoE pipeline 系统论文的机制化重构，不应当等同于 Tessera 论文中的正式算法块。后续若 USENIX 放出 PDF，应优先用原论文 Figure/Algorithm 替换参考图和推断性描述。

> 💡 关键：Tessera 的价值不在“又一种 pipeline schedule 名字”，而在把 MoE 的路由不均、专家放置、stage 切分、forward/backward 顺序和通信争用作为一个整体系统问题处理。

#### 🧪 练习题
```yaml
question: "Tessera 面向异构 MoE 训练时，为什么不能只按 Transformer 层数平均切 pipeline stage？"
options:
  - "因为 MoE 的专家路由、all-to-all 通信和专家计算会让不同 microbatch/stage 的实际耗时高度不均"
  - "因为 pipeline parallelism 只能用于 CNN，不能用于 Transformer"
  - "因为平均切层会自动消除所有通信"
  - "因为 MoE 不需要 backward pass"
answer: 0
explain: "异构 MoE 的 stage 时间取决于 dense 层、专家放置、token 路由倾斜和通信争用；按层数平均不能保证吞吐瓶颈被均衡。"
```

### MLflow

```yaml
id: mlflow
num: 18
name: MLflow
full_name: MLflow
year: '2018'
org: Databricks
parent: —
paper_url: https://www.mlflow.org/
project_url: ''
category: experiment_mgmt
motivation: 定义实验追踪、项目打包与模型注册标准接口
```

#### 📝 一句话总结
MLflow 提出了一个由 Tracking、Projects 和 Models 三大组件构成的开放平台，通过统一的 API 和格式规范解决机器学习生命周期中实验追踪困难、工作流不可复现、模型部署碎片化三大核心痛点，成为业界最广泛采用的 ML 平台标准接口。

#### 🎯 核心要点
- **三大组件架构**：MLflow Tracking（实验记录）、MLflow Projects（可复现打包）、MLflow Models（多环境部署），各组件可独立使用也可组合
- **MLflow Tracking**：提供 API 和 UI，自动记录实验的参数（parameters）、指标（metrics）、代码版本、数据文件和产出物（artifacts），支持任意 ML 库
- **MLflow Projects**：基于约定的目录结构 + `MLproject` 描述文件 + Conda 环境，实现代码打包与可复现执行，支持本地/远程/云端多种运行后端
- **MLflow Models**：引入 **flavor** 概念，同一模型可以同时导出为多种格式（如 `python_function`、`tensorflow`、`sklearn`），部署工具只需理解对应 flavor 即可
- **开放设计理念**：不绑定特定 ML 库、语言或基础设施，通过 REST API 和文件格式约定实现跨平台互操作
- **四大 ML 生命周期挑战**：多种工具难追踪、结果难复现、模型难部署、缺乏中心化管理
- **实际应用验证**：发布 4 个月内被超过 200 家公司采用，GitHub 获得 2800+ stars

#### 🔬 深入细节
![MLflow 平台架构概览](https://mlflow.org/img/hero.png)
*图：MLflow 平台整体架构，涵盖实验追踪、项目管理和模型部署三大核心模块*

##### 核心 API 使用示例

```python
# MLflow Tracking API 示例
import mlflow

# 开始一次实验运行
with mlflow.start_run():
    # 记录超参数
    mlflow.log_param("learning_rate", 0.01)
    mlflow.log_param("num_layers", 3)
    
    # 训练过程中记录指标
    for epoch in range(100):
        loss = train_one_epoch(model, data)
        mlflow.log_metric("loss", loss, step=epoch)
    
    # 保存模型产出物
    mlflow.sklearn.log_model(model, "model")
    mlflow.log_artifact("output/feature_importance.png")
```

```yaml
# MLproject 文件示例 —— 定义可复现的项目入口
name: My ML Project
conda_env: conda.yaml

entry_points:
  main:
    parameters:
      learning_rate: {type: float, default: 0.01}
      batch_size: {type: int, default: 64}
    command: "python train.py --lr {learning_rate} --batch {batch_size}"
  
  validate:
    parameters:
      model_path: path
    command: "python validate.py --model {model_path}"
```

```python
# MLflow Models —— 多 flavor 模型保存与加载
import mlflow.pyfunc
import mlflow.tensorflow

# 保存时同时注册多种 flavor
mlflow.tensorflow.log_model(tf_model, "model")
# 自动生成 MLmodel 描述文件，包含:
# flavors:
#   python_function:
#     loader_module: mlflow.tensorflow
#   tensorflow:
#     saved_model_dir: ...

# 部署时按需选择 flavor
model = mlflow.pyfunc.load_model("runs:/abc123/model")  # 通用 Python 接口
prediction = model.predict(input_df)
```

##### 动机与背景

机器学习的生命周期远比传统软件开发复杂。论文作者 Matei Zaharia 等人（Databricks 团队）在与数百家企业的合作中识别出四大核心挑战：

1. **工具繁多，实验难以追踪**：数据科学家需要在众多 ML 库（TensorFlow、PyTorch、scikit-learn 等）、数据处理框架和特征工程工具之间切换，每种工具有不同的接口和配置方式，导致实验参数、结果和中间产物散落各处，难以系统化管理和对比。

2. **结果不可复现**：即使拿到同事的代码，由于缺乏对运行环境（库版本、系统依赖、数据版本）的完整记录，往往无法复现其实验结果。这在团队协作和模型审计中造成严重障碍。

3. **模型部署路径碎片化**：从研究到生产的"最后一公里"极为困难——每个 ML 库输出的模型格式不同，部署目标（REST API、批处理、边缘设备、Spark）各异，导致大量重复的集成工作。

4. **缺乏中心化生命周期管理**：没有统一的平台来管理数据准备、模型训练、部署和监控的完整流程，各阶段之间的衔接依赖临时脚本和手工操作。

> 💡 关键：MLflow 的设计哲学是 **"开放接口优先"**——不试图替代任何现有 ML 工具，而是通过轻量级的 API 和格式约定，在已有工具之上建立统一的管理层。

##### 核心机制：三大组件详解

**1. MLflow Tracking —— 实验记录与对比**

MLflow Tracking 是整个平台的基础组件，解决"实验追踪"问题。其核心概念是 **Run**（一次运行），每个 Run 记录：

- **Parameters**：输入的超参数（如学习率、批大小），类型为字符串键值对
- **Metrics**：输出的评估指标（如准确率、损失），支持随时间步记录变化曲线
- **Artifacts**：任意输出文件（模型文件、可视化图表、数据样本等）
- **Source**：运行的代码来源（Git commit hash 或项目入口）
- **Tags & Notes**：用户自定义的标签和备注

多个 Run 可以组织为 **Experiment**（实验），Tracking UI 提供可视化对比界面，支持按指标排序、筛选和图表展示。

存储后端支持两种模式：
- **本地文件系统**：适合个人使用，零配置
- **远程 Tracking Server**：通过 REST API 提供团队共享的中心化存储，支持 SQL 数据库 + 对象存储（S3/Azure Blob/GCS）

> ⚠️ 注意：Tracking API 的设计刻意保持极简——仅需 `log_param()`、`log_metric()`、`log_artifact()` 三类调用，即可与任何 ML 框架集成，无需修改训练逻辑。

**2. MLflow Projects —— 可复现的代码打包**

MLflow Projects 通过约定优于配置（Convention over Configuration）的方式解决可复现性问题。一个 Project 就是一个包含 `MLproject` 文件的目录（或 Git 仓库），其中定义：

- **环境描述**：通过 Conda 环境文件（`conda.yaml`）精确锁定所有依赖版本，也支持 Docker 容器
- **入口点（Entry Points）**：定义可执行的命令及其参数（含类型和默认值）
- **参数类型系统**：支持 `float`、`int`、`string`、`path` 四种类型，其中 `path` 类型会自动处理本地/远程文件的下载

执行方式灵活：

$$
\text{mlflow run} \xrightarrow{\text{解析 MLproject}} \text{创建 Conda 环境} \xrightarrow{\text{注入参数}} \text{执行 entry point} \xrightarrow{\text{自动记录}} \text{Tracking Run}
$$

Projects 可以嵌套调用——一个 Project 的步骤可以通过 `mlflow.run()` API 调用另一个 Project，形成多步骤工作流（multi-step workflow）。这使得复杂的 ML 流水线（数据预处理 → 特征工程 → 训练 → 评估）可以模块化组织。

**3. MLflow Models —— 多格式模型部署**

MLflow Models 引入了 **flavor（风味）** 这一关键抽象来解决模型部署的碎片化问题。

核心思想：每个模型可以同时以多种 flavor 导出，每种 flavor 对应一种使用方式。例如一个 TensorFlow 模型可以同时具有：
- `tensorflow` flavor：保留完整的 TF SavedModel，供 TensorFlow Serving 使用
- `python_function` flavor：封装为通用 Python 函数，接受 pandas DataFrame 输入，适用于任何 Python 环境

模型以目录形式存储，包含一个 `MLmodel` 元数据文件（YAML 格式）描述可用的 flavor 及其加载方式：

```yaml
# MLmodel 文件示例
artifact_path: model
flavors:
  python_function:
    loader_module: mlflow.sklearn
    python_version: 3.8.10
  sklearn:
    pickled_model: model.pkl
    sklearn_version: 0.24.2
```

部署工具只需理解它支持的 flavor 即可。MLflow 内置了多种部署目标：
- **本地 REST Server**：`mlflow models serve`
- **Docker 容器**：`mlflow models build-docker`
- **Apache Spark UDF**：将模型注册为 Spark SQL 用户自定义函数，实现大规模批处理
- **云平台**：Azure ML、Amazon SageMaker 等

> 💡 关键：flavor 机制的精妙之处在于它实现了 **模型生产者与消费者的解耦**——训练代码只需按框架原生方式保存模型，部署工具只需按自己支持的 flavor 加载，中间通过 MLmodel 元数据文件桥接。

##### 与传统方法的区别

| 维度 | 传统 ML 工具链 | MLflow |
|------|---------------|--------|
| 实验管理 | 手工记录（Excel/笔记）或各框架自带日志 | 统一 Tracking API + 可视化 UI |
| 可复现性 | 依赖文档说明，环境配置靠人工 | MLproject + Conda/Docker 自动化环境 |
| 模型格式 | 每个框架独立格式（.pb/.pt/.pkl） | 多 flavor 统一封装 + MLmodel 元数据 |
| 部署方式 | 针对每种框架×每种目标单独开发 | flavor 抽象解耦，一次保存多处部署 |
| 平台锁定 | 通常绑定特定云/框架生态 | 开放 API，不绑定任何特定工具 |
| 工作流编排 | 需要额外的调度系统（Airflow 等） | Projects 多步骤嵌套 + Tracking 自动关联 |

与同期的其他 ML 平台相比（如 Google TFX、Facebook FBLearner、Uber Michelangelo），MLflow 的核心差异在于：
- **开源开放**：不绑定特定公司的基础设施
- **增量采用**：可以只使用一个组件，无需全盘迁移
- **库无关**：支持任意 ML 框架，而非仅限于自家框架

##### 设计原则总结

论文明确提出了 MLflow 的四大设计原则：

1. **API-first（API 优先）**：所有功能通过编程 API 暴露，而非 GUI 操作，便于自动化集成
2. **Modular（模块化）**：三个组件独立使用，降低采用门槛
3. **Library-agnostic（库无关）**：通过 REST API 和通用格式（而非框架插件）实现集成
4. **Open（开放）**：开源实现，开放格式，避免供应商锁定

#### 🧪 练习题
```yaml
question: "MLflow Models 中 flavor 机制的核心作用是什么？"
options:
  - "将模型压缩为更小的文件格式以节省存储空间"
  - "让同一模型以多种格式导出，实现模型生产者与部署消费者的解耦"
  - "自动选择最优的模型架构进行超参数调优"
  - "将不同框架的模型统一转换为 ONNX 格式"
answer: 1
explain: "flavor 机制允许一个模型同时以多种格式（如 python_function、tensorflow、sklearn）导出，部署工具只需理解它支持的 flavor 即可加载模型，从而解耦了模型训练框架与部署环境之间的依赖关系。"
```

### Optuna

```yaml
id: optuna
num: 19
name: Optuna
full_name: Optuna
year: '2019'
org: Preferred Networks
parent: mlflow
paper_url: https://arxiv.org/abs/1907.10902
project_url: ''
category: experiment_mgmt
motivation: Define-by-run接口，支持高效剪枝与超参搜索
```

#### 📝 一句话总结
Optuna 提出了面向超参数优化的 define-by-run 框架，让搜索空间在 Python 训练代码执行时动态生成，并用可插拔 sampler、pruner 与共享 storage 把单机调参扩展到异步分布式搜索。

#### 🎯 核心要点
- define-by-run API：在 `objective(trial)` 的控制流中调用 `suggest_*`，自然表达条件搜索空间
- Study/Trial 抽象：Study 管理优化方向和历史，Trial 记录参数、中间指标、最终值和状态
- 可插拔 sampler：支持 TPE、随机、CMA-ES 等策略，并允许用户定制采样逻辑
- 可插拔 pruner：通过 `report()` 与 `should_prune()` 利用学习曲线中间值提前终止低潜力 trial
- 共享 storage 架构：内存、SQLite、RDB 等后端让多个 worker 以异步方式协同优化同一个 study
- 与训练框架解耦：Optuna 不接管模型训练，只要求 objective 返回可最小化或最大化的目标值

#### 🔬 深入细节
![Optuna 系统设计图](https://ar5iv.labs.arxiv.org/html/1907.10902/assets/fig/system_return.png)
*图：Optuna 论文 Figure 4 的系统设计图；来源为 arXiv HTML 版本。每个 worker 独立执行 objective function，`suggest()`、`report()`、`should_prune()` 和最终 `return()` 都通过共享 storage 读写 study 历史。*

```python
# Optuna define-by-run 与剪枝流程伪代码
import optuna

def objective(trial):
    model_type = trial.suggest_categorical("model", ["mlp", "cnn"])
    lr = trial.suggest_float("lr", 1e-5, 1e-1, log=True)

    if model_type == "mlp":
        n_layers = trial.suggest_int("n_layers", 1, 4)
        hidden = [trial.suggest_int(f"hidden_{i}", 32, 512) for i in range(n_layers)]
        model = build_mlp(hidden, lr)
    else:
        channels = trial.suggest_int("channels", 16, 128)
        kernel = trial.suggest_int("kernel", 3, 7)
        model = build_cnn(channels, kernel, lr)

    for epoch in range(max_epochs):
        train_one_epoch(model)
        valid_loss = evaluate(model)
        trial.report(valid_loss, step=epoch)
        if trial.should_prune():
            raise optuna.TrialPruned()

    return evaluate(model)

study = optuna.create_study(
    direction="minimize",
    sampler=optuna.samplers.TPESampler(),
    pruner=optuna.pruners.SuccessiveHalvingPruner(),
    storage="sqlite:///study.db",
)
study.optimize(objective, n_trials=200, n_jobs=8)
```

Optuna 要解决的第一类问题是静态搜索空间难以表达真实模型配置。以多层 MLP 为例，层数本身是一个超参数，只有确定了 `n_layers` 后，才知道需要采样多少个 `hidden_i`；如果改成 CNN，又会出现 kernel、channels 等完全不同的分支。传统 define-and-run HPO 工具通常要求用户先写出完整的树状空间，复杂模型会变成嵌套很深的配置对象。Optuna 把搜索空间绑定到 `objective(trial)` 的运行过程：执行到哪个分支，就注册和采样哪个超参数，因此搜索空间是由普通 Python 控制流“运行出来”的。

Sampler 的职责是根据历史 trial 选择下一组参数，而不是简单枚举。以 TPE 为例，Optuna 会把历史观测按目标值分成好样本集合与坏样本集合，分别估计条件密度 \(l(x)=p(x \mid y < y^*)\) 和 \(g(x)=p(x \mid y \ge y^*)\)，然后倾向选择使下式更大的候选：

$$
x^* = \arg\max_x \frac{l(x)}{g(x)}
$$

直觉上，\(l(x)\) 高说明这个参数区域常出现在好 trial 中，\(g(x)\) 低说明它不常出现在差 trial 中；二者比值高，就代表候选参数更可能带来改进。Optuna 的贡献不是发明 TPE 本身，而是把 TPE、随机采样、CMA-ES 等策略放进统一 sampler 接口，使用户能在相同 Trial API 下替换优化算法。

Pruner 解决的是资源浪费问题。很多训练任务在早期 epoch 就能看出趋势，如果某个 trial 的验证损失在相同 step 上明显落后，就不必训练到完整预算。Optuna 的 `trial.report(value, step)` 把学习曲线中间值写入 storage，`trial.should_prune()` 再由 pruner 读取同一 study 的历史中间值做决策。Successive Halving/ASHA 类机制可以理解为按资源 \(r, \eta r, \eta^2 r, ...\) 设置多个 rung：trial 只有在当前 rung 的表现排在前 \(1/\eta\) 左右时才晋级到下一档资源。

分布式架构的关键是把 trial 状态外置到 storage，而不是让某个中心进程长期持有所有状态。多个 worker 只要连接到同一个 storage URL，就能异步领取 trial、查询历史、写入中间值和提交结果。由于剪枝和采样都通过 storage 获得可见的 study 历史，worker 之间不需要同步 barrier；慢 trial 不会阻塞快 trial，这也是论文强调异步剪枝适合分布式环境的原因。

与 MLflow/W&B 这类 run-centric 追踪系统相比，Optuna 更主动：它不仅记录“发生了什么”，还决定“下一次该尝试什么”。在真实平台中常见的组合是 Optuna 负责 HPO 决策，训练脚本把 Optuna trial id、参数、指标和模型产物同步写入 MLflow 或 W&B，从而同时获得自动搜索和团队级实验审计。

> 💡 关键：Optuna 的核心抽象是把超参数优化压缩成 `objective(trial) -> value`，再把搜索空间构造、采样、剪枝和分布式状态管理都挂在 Trial/Study 这两个对象上。

#### 🧪 练习题
```yaml
question: "Optuna 的 define-by-run API 相比静态搜索空间声明，最核心的优势是什么？"
options:
  - "搜索空间可以随 objective 的 Python 控制流动态生成，适合条件超参数"
  - "不需要验证集即可优化模型"
  - "所有 trial 都会使用完全相同的参数"
  - "只能在单进程内执行，避免数据库开销"
answer: 0
explain: "define-by-run 让参数声明发生在 objective 执行期间，因此模型分支、层数变化等条件结构能直接用 Python 表达。"
```

### DVC

```yaml
id: dvc
num: 20
name: DVC
full_name: DVC数据版本控制 (DVC)
year: '2020'
org: Iterative.ai
parent: mlflow
paper_url: https://dvc.org/
project_url: ''
category: experiment_mgmt
motivation: 将Git版本控制引入数据集与模型文件管理
```

#### 📝 一句话总结
DVC 将 Git 的版本历史扩展到大规模数据集、模型权重和流水线产物：Git 只保存轻量元数据，DVC 用内容哈希、缓存和 remote 存储管理真实文件，从而让代码、数据、参数和模型可以一起回溯与复现。

#### 🎯 核心要点
- `.dvc` 文件与 `dvc.lock` 保存数据/模型对象的哈希、路径、大小和依赖关系，Git 负责版本化这些小文件
- DVC cache 以内容寻址方式保存大文件，避免同一内容在不同实验版本中重复存储
- Remote storage 支持 S3、GCS、Azure Blob、SSH/SFTP、HDFS、本地目录等后端，用 `dvc push/pull` 同步真实数据
- `dvc.yaml` 将数据处理、训练、评估声明为 stage，`deps`、`params`、`outs` 构成可复现 DAG
- `dvc repro` 通过比较依赖哈希和参数值，只重跑受影响的 stage 及其下游节点
- 与 Git branch/tag 组合后，一个 commit 同时锁定代码版本、数据版本、模型版本和流水线状态

#### 🔬 深入细节
![DVC Git、CI/CD 与远程存储工作流](https://storage.ghost.io/c/5f/2f/5f2f4d20-2abf-4534-8d40-7aa233aedd43/content/images/2026/03/dvc02.png)
*图：DevOpsCube DVC 教程中的工作流图；它展示 GitHub/CI/CD 读取仓库元文件后执行 `dvc pull` 获取 S3 数据、处理后再 `dvc push` 上传版本化数据。DVC 官方文档同样强调 Git 保存 `.dvc`/`dvc.yaml`/`dvc.lock`，remote storage 保存真实数据与模型对象。*

```bash
# DVC 数据版本控制与流水线复现伪代码
git init
dvc init

# 1. 追踪大数据，但只把指针文件提交给 Git
dvc add data/raw
git add data/raw.dvc data/.gitignore
git commit -m "track raw data with DVC"

# 2. 配置并上传真实对象
dvc remote add -d storage s3://ml-bucket/project-cache
dvc push
git push

# 3. 声明可复现训练流水线
cat > dvc.yaml <<'YAML'
stages:
  featurize:
    cmd: python src/featurize.py --in data/raw --out data/features
    deps:
      - src/featurize.py
      - data/raw
    outs:
      - data/features
  train:
    cmd: python src/train.py --features data/features --params params.yaml
    deps:
      - src/train.py
      - data/features
    params:
      - train.lr
      - train.epochs
    outs:
      - models/model.pkl
    metrics:
      - metrics.json
YAML

dvc repro     # 只重跑 hash 或 params 变化影响到的 stage
dvc metrics diff
```

DVC 的核心问题来自 Git 与机器学习产物之间的尺度错配。Git 很适合文本代码和小配置文件，却不适合频繁提交 GB/TB 级数据、特征表、checkpoint 或模型包。只保存代码又会丢失关键上下文：同一个 `train.py` 在不同数据快照和不同 `params.yaml` 下会得到完全不同的模型。DVC 的做法是把“可版本化的引用”放进 Git，把“昂贵的大对象”放进 DVC cache/remote，从而避免 Git 仓库膨胀，同时保留版本历史。

内容寻址是 DVC 数据层的关键机制。对一个文件或目录，DVC 计算内容哈希并把对象放到 cache 中，元文件只记录对象 ID 与工作区路径。可以把它抽象为：

$$
oid = H(\mathrm{bytes}(path)), \qquad metadata = \{path, oid, size, nfiles\}
$$

当用户切换 Git commit 后，`.dvc` 文件或 `dvc.lock` 中的 `oid` 也随之改变；`dvc checkout` 根据当前 Git 版本里的元数据，把 cache 中对应内容链接或复制回 workspace；如果本地 cache 没有，`dvc pull` 会先从 remote 下载。这样，Git commit 不直接包含大文件，却能精确指向某一版大文件。

Pipeline 层把 DVC 从“数据指针工具”提升为“可复现实验构建系统”。`dvc.yaml` 中每个 stage 都是一个节点，`deps` 和 `outs` 形成有向无环图。DVC 不依赖文件时间戳，而是比较依赖内容和参数记录；一个 stage 是否需要重跑，可简化为：

$$
dirty(s) =
\exists d \in deps(s): H(d) \ne lock_s(d)
\;\lor\;
\exists p \in params(s): value(p) \ne lock_s(p)
\;\lor\;
missing(outs(s))
$$

如果 `dirty(featurize)=true`，那么使用 `data/features` 的 `train` 也会被标记为下游受影响节点；如果只改了 `train.lr`，上游特征工程不会重跑。相比 `make` 这类通用构建工具，DVC 的差异在于它内建大文件 hash、参数粒度依赖、metrics/plots 对比和 remote cache 同步，直接服务于 ML 工作流。

Remote storage 承担团队协作和 CI/CD 的数据面。一个开发者执行 `dvc push` 后，真实数据对象进入 S3/GCS/SSH 等后端；另一个开发者或训练节点先 `git clone` 获取代码与元文件，再 `dvc pull` 拉取匹配当前 commit 的数据。此时 `git checkout experiment-a && dvc checkout` 与 `git checkout experiment-b && dvc checkout` 会得到不同的数据/模型工作区，但仓库路径可以保持稳定，例如始终是 `data/raw` 和 `models/model.pkl`。

与 MLflow 的 run 记录相比，DVC 更偏 repository-centric：它将实验可复现性绑定到 Git 历史，而不是只在外部服务中保存一次 run 的日志。与 W&B Artifacts 相比，DVC 更强调本地优先、命令行和 GitOps 工作流；与对象存储裸用相比，DVC 增加了哈希校验、去重、依赖图和版本指针。实际工程中经常把 DVC 用作数据/模型版本基座，再用 MLflow 或 W&B 做指标看板和团队报告。

> 💡 关键：DVC 不试图替代 Git，而是把 Git commit 变成“代码 + 数据指针 + 流水线锁文件”的统一索引，真实大对象由 DVC cache 和 remote 存储承载。

#### 🧪 练习题
```yaml
question: "DVC 为什么通常只把 `.dvc`、`dvc.yaml` 和 `dvc.lock` 提交到 Git，而不把大数据文件直接提交到 Git？"
options:
  - "这些元文件记录大对象哈希和依赖，真实数据放在 DVC cache/remote 中，能避免 Git 仓库膨胀并保持可复现"
  - "DVC 不能处理二进制文件"
  - "Git 不能管理任何文本文件"
  - "DVC 只用于可视化实验曲线，不负责数据版本"
answer: 0
explain: "DVC 让 Git 管理轻量指针和锁文件，大文件由内容寻址 cache 与 remote 存储管理，因此既节省仓库空间，又能通过哈希恢复精确版本。"
```

### W&B

```yaml
id: wandb
num: 21
name: W&B
full_name: Weights & Biases
year: '2020'
org: W&B Inc.
parent: mlflow
paper_url: https://wandb.ai/
project_url: ''
category: experiment_mgmt
motivation: 云端协作式实验看板，强化团队开发效率
```

#### 📝 一句话总结
Weights & Biases 将训练脚本中的配置、指标、媒体、系统资源和模型/数据产物统一记录为云端可协作的 run 与 artifact 图谱，解决团队难以比较实验、复现模型来源和共享分析结论的问题。

#### 🎯 核心要点
- Run 是最小实验单元，记录 config、metric history、summary、stdout、代码状态、系统资源和产物引用
- Dashboard/Workspace 支持跨 run 对比曲线、筛选超参数、分组实验和协作查看训练状态
- Artifacts 对数据集、模型、评估结果等文件资产做版本化，并通过 `use_artifact()`/`log_artifact()` 建立 lineage DAG
- Tables/Media 支持图像、音频、文本、分割 mask、预测样本等多模态结果的样本级分析
- Sweeps 通过 agent 调度随机、网格或贝叶斯超参搜索，并把每次试验自动记录为普通 run
- Reports/Registry/Automations 将实验看板扩展为团队复盘、模型发布和下游流程触发机制

#### 🔬 深入细节
![W&B 实验 dashboard](https://mintcdn.com/wb-21fd5541/88iR80mZ8tuFCZUU/images/experiments/experiments_landing_page.png?fit=max&auto=format&n=88iR80mZ8tuFCZUU&q=85&s=3250a01d7dd14400455474aee6818e30)
*图：W&B 官方 Experiments 文档中的 dashboard 示例。训练代码通过 SDK 上报 run 数据，云端 workspace 将多个 run 的指标、配置和产物集中展示，供团队比较与协作分析。*

```python
# W&B 实验追踪、artifact lineage 与 sweep agent 的核心伪代码
import wandb

def train():
    with wandb.init(project="vision-models", job_type="train") as run:
        cfg = run.config
        dataset = run.use_artifact("tiles-dataset:latest")
        data_dir = dataset.download()

        model = build_model(lr=cfg.lr, depth=cfg.depth)
        for step, batch in enumerate(loader(data_dir)):
            loss, acc, samples = train_step(model, batch)
            run.log({
                "loss": loss,
                "accuracy": acc,
                "examples": wandb.Table(data=samples, columns=["image", "pred", "label"]),
            }, step=step)

        model_artifact = wandb.Artifact("classifier", type="model")
        model_artifact.add_file("checkpoints/best.pt")
        run.log_artifact(model_artifact, aliases=["latest", f"acc-{acc:.3f}"])

sweep_config = {
    "method": "bayes",
    "metric": {"name": "accuracy", "goal": "maximize"},
    "parameters": {
        "lr": {"min": 1e-5, "max": 1e-2},
        "depth": {"values": [18, 34, 50]},
    },
}
sweep_id = wandb.sweep(sweep_config, project="vision-models")
wandb.agent(sweep_id, function=train, count=50)
```

W&B 的设计动机是把实验从本地日志文件提升为团队共享的结构化数据库。一次 run 可以抽象为：

$$
R = (config, history, summary, files, artifacts, media, system, code)
$$

其中 `history` 是按 step 追加的指标序列，`summary` 是最终或聚合后的关键值，`config` 保存超参数和运行配置，`system` 记录 GPU/CPU/内存等资源曲线。Dashboard 的曲线对比、平行坐标图和筛选器，本质上都是在这些结构化字段上做查询和聚合，而不是事后解析散落在机器上的日志文本。

Artifact 机制补上了“指标好看但模型从哪来”的缺口。一个训练 run 可以声明自己使用了 `dataset:v3`，并输出 `classifier:v7`；评估 run 再使用 `classifier:v7` 和 `test-set:v2` 生成 `eval-report:v1`。W&B 将这些关系表示为有向无环图：

$$
G = (V_{run} \cup V_{artifact}, E_{use} \cup E_{log})
$$

边 \(E_{use}\) 表示 run 消费某个 artifact，边 \(E_{log}\) 表示 run 产出某个 artifact。这个图让团队能够沿 lineage 反查模型的训练数据、代码运行、评估文件和下游消费者；alias 如 `latest`、`best` 则提供人类可读的版本入口，但底层版本仍是不可混淆的 artifact revision。

Tables/Media 让实验追踪不止停留在标量曲线。对于计算机视觉，用户可以把输入图像、预测 mask、置信度、真实标签放在同一行；对于 NLP，可以记录 prompt、completion、评分和错误类别。这样，团队不仅能看到 `accuracy` 从 0.82 到 0.86，还能查询“哪些类别仍被误判”“某次模型是否在低光照样本上退化”。这类样本级分析是纯 TensorBoard 曲线或 CSV 指标很难覆盖的。

Sweeps 把超参搜索调度和实验追踪合在一起。用户声明搜索空间、优化指标和方法后，agent 从 W&B 后端领取下一组参数并启动普通训练函数；每一次候选配置仍然是完整 run，所以 dashboard、artifacts、tables 和 reports 都能复用。若使用贝叶斯搜索，系统会根据已完成 run 的目标指标更新候选分布；若使用 grid/random，则重点是并行调度与结果聚合。

与 MLflow 相比，W&B 更偏在线协作和交互式可视化，尤其强化 workspace、reports、tables 和 artifact lineage；与 DVC 相比，W&B 的 artifact 更贴近云端 run 图谱，而不是 Git commit 驱动的本地版本控制；与 Optuna 相比，W&B Sweeps 可以做 HPO，但它的核心价值仍是把大量训练运行组织成可查询、可讨论、可复用的团队知识库。

> 💡 关键：W&B 的工程贡献在于把训练过程标准化为 run 事件流，并把文件资产标准化为 artifact DAG；这两个结构让实验比较、模型溯源和团队协作可以发生在同一个系统里。

#### 🧪 练习题
```yaml
question: "W&B Artifacts 的 lineage 图主要回答哪类问题？"
options:
  - "某个模型版本由哪些数据、代码运行和上游产物生成，又被哪些下游 run 使用"
  - "如何替代 GPU 驱动并提升显存容量"
  - "如何把所有训练脚本自动改写成 C++"
  - "如何让每个 run 使用完全相同的随机种子"
answer: 0
explain: "Artifacts 通过 use/log 关系把 run 与数据、模型、评估文件连接成 DAG，便于复现、审计和团队协作。"
```

### FlashInfer-Bench

```yaml
id: flashinfer_bench
num: 22
name: FlashInfer-Bench
full_name: FlashInfer-Bench
year: '2026'
org: MLSys Community
parent: mlflow
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: experiment_mgmt
motivation: AI驱动的LLM系统基准测试平台
```

#### 📝 一句话总结
FlashInfer-Bench 提出了面向 LLM 推理 GPU kernel 的闭环基准与生产替换流程，用 FlashInfer Trace 把任务定义、真实 workload、候选实现和评测结果统一成可复现记录，解决 AI 生成 kernel 难以进入真实推理系统的问题。

#### 🎯 核心要点
- 闭环架构：把 LLM agent/human expert 生成 kernel、基准评测、排行榜反馈和生产替换组织成同一循环
- FlashInfer Trace：用 Definition、Workload、Solution、Evaluation 四段 schema 描述 kernel 合约、输入分布、实现和不可变评测记录
- 真实 workload 数据集：从 SGLang 运行 DeepSeek-V3、Llama-3.1-8B、Qwen3-30B-A3B 等模型的 serving traces 中采集代表性 kernel 输入
- 鲁棒评测：同时处理确定性 kernel、低精度 FP8 kernel 和采样类随机 kernel，并用隔离执行抑制 reward hacking
- 连续排行榜：用 `fast_p` 曲线同时衡量正确性和相对 FlashInfer/PyTorch baseline 的加速比例
- 生产路径：`flashinfer_bench.apply()` 通过 AOT 索引和运行时 dispatcher，把最快的已验证 Solution 动态注入 SGLang/vLLM 等推理引擎

#### 🔬 深入细节
![FlashInfer-Bench architecture](https://arxiv.org/html/2601.00227v1/x1.png)
*图：FlashInfer-Bench 论文 Figure 1，来源为 arXiv HTML；图中展示 FlashInfer Trace、FlashInfer-Bench Dataset、Leaderboard、LLM Engine 和 `flashinfer_bench.apply()` 组成的闭环。*

```python
# FlashInfer-Bench 反馈式 agent 评测流程伪代码，整理自论文 Algorithm 1
def feedback_loop_agent(definition, language, hardware, max_rounds):
    accepted = []
    agent = CodeAgent.initialize(definition, language, hardware)
    solution = agent.generate()

    for i in range(max_rounds):
        trace = flashinfer_bench.benchmark(definition, solution)
        if trace.status == "PASSED":
            accepted.append((solution, trace))

        # 把编译错误、数值误差、latency、speedup 等反馈给 agent 继续改写 kernel
        solution = agent.optimize(trace)

    return max(accepted, key=lambda item: item[1].speedup).solution
```

FlashInfer-Bench 的核心问题不是“模型能否写出 CUDA/Triton 代码”，而是“候选 kernel 是否能在真实 LLM 服务流量中正确、稳定且可无缝部署”。传统 kernel benchmark 往往用手工挑选的 shape 和公开 reference 做单点测试，容易高估泛化能力；真实服务里会出现 ragged sequence、paged KV cache、FP8/BF16 混合精度、MoE routing、sampling 随机性和不同 batch/concurrency 组合。FlashInfer-Bench 因此把 workload 从生产 trace 中抽象出来，并把每个输入绑定到 Definition，让 agent 面对的是实际推理系统会触发的算子分布。

FlashInfer Trace 是这个平台的通信协议。`Definition` 给出 I/O tensor、dtype、axis 的 const/var 角色和 PyTorch reference semantics；`Workload` 给出具体 shape 与输入材料化方式；`Solution` 保存候选 kernel 源码、入口函数和兼容硬件/软件元数据；`Evaluation` 则把某个 `Definition × Solution × Workload` 的正确性、性能和运行环境快照固化为不可变记录。这样设计的好处是，agent、人类工程师、benchmark service 和 leaderboard 都围绕同一个 trace object 交换信息，不需要在自然语言说明、临时脚本和线下报告之间反复转换。

评测层首先把正确性放在性能之前。确定性 kernel 需要所有输出元素满足误差界，并拒绝 NaN/Inf；低精度 kernel 用 matched-ratio 规则，允许少量 FP8 等低精度算术造成的 outlier；随机采样 kernel 则不能逐元素对比，需要比较经验分布与目标分布的总变差距离：

$$
\mathrm{TVD}(\hat{\mathbf{f}}, \mathbf{q}) = \frac{1}{2}\sum_i |\hat{f}_i - q_i| \le \tau_{\mathrm{TVD}}
$$

这里 \(\mathbf{q}\) 是由输入概率与 top-k/top-p 等 mask 归一化得到的目标分布，\(\hat{\mathbf{f}}\) 是重复运行 kernel 后的经验分布。TVD 的直觉是直接约束任意事件上的最大概率误差；如果采样结果落在 mask 禁止的 token 上，即使总体分布看似接近也会被判失败。

性能指标采用 KernelBench 风格的 `fast_p`，把正确性和相对加速合成一个曲线：

$$
\mathrm{fast}_{p}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}(\mathrm{correct}_{i}\land \{\mathrm{speedup}_{i}>p\})
$$

当 \(p=0\) 时它退化为通过率；当 \(p\) 增大时，它衡量在多少 workload 上既正确又超过指定倍数的 baseline。相比单个平均 latency，这个曲线更适合 agent kernel：一个候选实现可能只在部分 shape 上很快，或在少数长序列上失败；`fast_p` 会把这些局部失败直接反映到曲线面积中。

`flashinfer_bench.apply()` 解决最后一公里部署问题。离线阶段，系统按误差阈值过滤 trace，从 workload 中提取 shape/key，给每个 key 选择最快 Solution，并把最常被选中的实现 AOT 编译成执行文件；在线阶段，dispatcher 只需用当前 kernel 参数构造 key，做 \(O(1)\) 索引查找，必要时 JIT 编译剩余候选。这个机制使 serving engine 可以通过环境变量或装饰器启用替换，禁用时透明回退到原始 FlashInfer 实现，避免为了每个 agent kernel 手写集成代码。

与 MLflow/W&B 这类实验管理平台相比，FlashInfer-Bench 更接近“系统优化实验的执行层”。MLflow 主要记录模型训练参数、指标和 artifact；FlashInfer-Bench 则定义了 kernel 级任务、评测沙箱、硬件相关性能度量和 runtime dispatch。它的 MLOps 价值在于让 AI 生成的底层系统优化也具备可复现 lineage、可比较排行榜和可回滚部署路径。

> 💡 关键：FlashInfer-Bench 的贡献不是单个 kernel 优化技巧，而是把 kernel 生成、验证、评测、选择和生产替换变成同一套可自动迭代的协议。

#### 🧪 练习题
```yaml
question: "FlashInfer-Bench 的 `fast_p` 指标为什么比只报告平均 latency 更适合评测 AI 生成 kernel？"
options:
  - "它只统计编译时间，因此能避免 GPU 噪声"
  - "它同时要求 kernel 正确，并统计超过指定 baseline 加速阈值的 workload 比例"
  - "它会自动忽略失败 workload，从而突出最快样本"
  - "它只适用于训练 loss，而不适用于推理 kernel"
answer: 1
explain: "`fast_p` 对每个 workload 同时检查 correctness 和 speedup>p，能暴露局部错误或只在少数 shape 上变快的候选实现。"
```

### SageMaker AI Agent

```yaml
id: sagemaker_agent
num: 23
name: SageMaker AI Agent
full_name: SageMaker AI Agent
year: '2026'
org: AWS
parent: wandb
paper_url: https://aws.amazon.com/sagemaker/
project_url: ''
category: experiment_mgmt
motivation: 智能代理自动完成数据准备到微调策略选择
```

#### 📝 一句话总结
SageMaker AI Agent 把模型定制中的需求澄清、数据转换、微调策略选择、训练、评估和部署封装为 agent-guided workflow，解决企业从自然语言需求到可运行 SageMaker 训练/部署代码之间依赖人工专家编排的问题。

#### 🎯 核心要点
- Agent-guided workflow：用户用自然语言描述场景，Kiro、Claude Code、Cursor 等 coding agent 在 SageMaker AI Skills 指导下生成可编辑 notebook/代码
- 九类模型定制 Skills：覆盖 use case specification、planning、fine-tuning setup、dataset evaluation/transformation、fine-tuning、model evaluation、deployment 等生命周期阶段
- 训练策略推荐：根据任务和数据在 SFT、DPO、RLVR 等定制技术之间选择，并生成 SageMaker AI serverless fine-tuning 作业
- 数据到评估闭环：自动检查数据 schema/格式，转换到目标模型所需格式，并用 LLM-as-a-Judge 或任务指标比较 base model 与 fine-tuned model
- IDE 与协议集成：SageMaker Studio JupyterLab 内置 Kiro，并支持 Agent Communication Protocol 兼容 agent；Skills 也可通过 AWSLabs agent plugin 在本地 IDE/CLI 使用
- AWS API 编排：agent 生成的代码负责调用 SageMaker AI、S3、MLflow Apps、MCP tools、SageMaker endpoint 或 Bedrock Custom Model Import

#### 🔬 深入细节
![SageMaker AI agent-guided model customization](https://d2908q01vomqb2.cloudfront.net/f1f836cb4ea6efb2a0b1b99f41ad8b103eff4b59/2026/05/04/ml-20721.png)
*图：AWS Machine Learning Blog 的 SageMaker AI agent-guided model customization 配图，来源为 AWS 官方 CloudFront 图片。*

```python
# SageMaker AI Agent-guided model customization 伪代码
def customize_model_with_agent(user_prompt, data_uri, target_env):
    context = {
        "request": user_prompt,
        "data": data_uri,
        "deployment_target": target_env,
    }

    plan = skills["planning"].run(context)
    use_case = skills["use_case_specification"].run(context, plan)
    data_report = skills["dataset_evaluation"].run(data_uri, use_case)
    transformed = skills["dataset_transformation"].run(data_uri, data_report)

    train_cfg = skills["fine_tuning_setup"].select(
        use_case=use_case,
        dataset=transformed,
        candidates=["SFT", "DPO", "RLVR"],
    )
    training_job = sagemaker_ai.start_serverless_fine_tuning(train_cfg)

    eval_report = skills["model_evaluation"].compare(
        base_model=train_cfg.base_model,
        tuned_model=training_job.model_artifact,
        metrics=use_case.success_criteria,
    )
    if eval_report.passes_gate:
        return skills["deployment"].deploy(training_job.model_artifact, target_env)
    return {"status": "blocked", "reason": eval_report.failure_summary}
```

SageMaker AI Agent 不是一个单独的训练算法，而是把模型定制流程拆成可被 coding agent 调用的专家技能集合。AWS 官方文档把这些 Skills 定义为面向 IDE 或命令行 coding assistant 的指令/工作流模块，用来编排 use case specification、planning、dataset transformation、customization technique selection、fine-tuning、model evaluation 和 deployment。用户输入的自然语言并不直接变成一个黑盒作业，而是先被 agent 转换为可审阅计划，再生成 notebook 与 SageMaker API 调用代码。

核心机制可以理解为“技能选择 + 可执行代码生成”。给定用户请求 \(x\)、数据摘要 \(d\)、目标约束 \(c\)，agent 需要选择一组技能序列 \(\pi\) 并输出可运行 artifact：

$$
\pi^* = \arg\max_{\pi} \; U(\mathrm{quality}, \mathrm{cost}, \mathrm{latency}, \mathrm{governance} \mid x,d,c)
$$

这个公式不是 AWS 文档中的显式目标函数，而是对 workflow 的机制化抽象：agent 在任务质量、训练成本、上线延迟和治理要求之间做规划。与通用聊天助手不同，SageMaker AI Skills 把 AWS API、数据格式、权限、S3、MLflow Apps、SageMaker endpoint 和 Bedrock 导入路径等领域知识放进 agent 上下文，降低了“回答看似正确但无法运行”的概率。

微调策略选择是最关键的决策点。SFT 适合有高质量示范答案的数据；DPO 适合偏好对比数据；RLVR 则适合答案可以由规则、程序或 verifier 自动给出奖励的任务。agent 的价值在于先检查数据是否支持这些方法，例如是否有 prompt/response、chosen/rejected pair、verifiable reward function 或评估集，再生成相应 serverless training job。对用户来说，差异不是“点一个训练按钮”，而是把数据准备、训练脚本、指标记录和错误处理都写成可复用代码。

训练与评估阶段形成实验管理闭环。AWS 博客示例中，agent 会生成使用 SageMaker AI serverless training job 的 notebook，并把训练/验证指标分发到 SageMaker AI MLflow Apps。评估 Skill 会按 use case 推荐指标，比较 base model 与 fine-tuned model，只有通过阈值或人工审阅条件才进入 deployment Skill。这与 W&B/MLflow 的关系更像互补：W&B/MLflow 侧重记录和可视化，SageMaker AI Agent 侧重生成并执行 AWS 上的工作流，同时把指标和 artifact 接入实验追踪。

部署阶段体现“agent 生成代码而非替用户隐藏代码”的设计。agent 可以根据延迟、扩缩容和集成要求，在 SageMaker AI endpoint 与 Bedrock Custom Model Import 等路径之间选择，并生成 endpoint provisioning、sample inference 和清理资源的代码。由于 notebook 可编辑，团队可以加入自己的 IAM、VPC、模型注册、审批和成本限制，从而把一次性的对话操作固化为组织内可复用流程。

> 💡 关键：SageMaker AI Agent 的贡献在于把模型定制的专家决策转化为可审阅、可执行、可追踪的 AWS 工作流，而不是只提供一个新的 UI 或单点微调 API。

#### 🧪 练习题
```yaml
question: "SageMaker AI Agent-guided workflow 与普通实验追踪工具的主要区别是什么？"
options:
  - "它只记录 loss 曲线，不负责生成训练代码"
  - "它通过 Skills 指导 coding agent 生成并编排数据、训练、评估和部署代码"
  - "它只能运行本地 CPU 训练，不能调用云端服务"
  - "它要求用户手写所有 SageMaker API 调用"
answer: 1
explain: "SageMaker AI Agent 的核心是用领域 Skills 让 coding agent 生成可执行 SageMaker 工作流；实验追踪只是闭环中的一部分。"
```

### TFX

```yaml
id: tfx
num: 24
name: TFX
full_name: TensorFlow Extended (TFX)
year: '2017'
org: Google
parent: —
paper_url: https://www.tensorflow.org/tfx
project_url: ''
category: mlops_lifecycle
motivation: 端到端生产级ML平台，涵盖数据校验到模型评估
```

#### 📝 一句话总结
TFX 提出了面向生产 ML 的端到端 pipeline 平台，把数据摄取、统计、校验、转换、训练、评估、模型验证和推送拆成强类型组件，解决研究脚本难以稳定进入持续训练与生产部署的问题。

#### 🎯 核心要点
- 标准组件链：ExampleGen、StatisticsGen、SchemaGen、ExampleValidator、Transform、Trainer、Tuner、Evaluator、InfraValidator、Pusher、BulkInferrer
- Artifact DAG：每个组件消费和产出强类型 artifacts，orchestrator 根据 artifact 依赖推导执行顺序
- ML Metadata：记录 artifacts、executions、contexts 和 lineage，使每次训练与模型产物可追溯
- TensorFlow Data Validation：通过数据统计与 schema 检查缺失值、类型错误、取值越界、training-serving skew 和 drift
- TensorFlow Transform：把全量统计特征工程导出为 transform graph，保证训练和服务使用同一预处理逻辑
- Evaluator/TFMA：在部署前按指标和数据切片比较候选模型与 baseline，只有 blessed model 才能进入 Pusher
- 多编排后端：TFX workflow 可运行在 Apache Airflow、Apache Beam、Kubeflow Pipelines、Vertex Pipelines 等环境

#### 🔬 深入细节
![TFX component flow](https://raw.githubusercontent.com/tensorflow/tfx/master/docs/guide/images/prog_fin.png)
*图：TFX 官方文档的 Component Flow，来源为 TensorFlow/tfx GitHub 文档源码；图中展示从 ExampleGen 到 Pusher 的标准组件数据流。*

```python
# TFX 标准 pipeline 伪代码
example_gen = CsvExampleGen(input_base=data_path)
statistics = StatisticsGen(examples=example_gen.outputs["examples"])
schema = SchemaGen(statistics=statistics.outputs["statistics"])
validator = ExampleValidator(
    statistics=statistics.outputs["statistics"],
    schema=schema.outputs["schema"],
)
transform = Transform(
    examples=example_gen.outputs["examples"],
    schema=schema.outputs["schema"],
    module_file="preprocessing.py",
)
trainer = Trainer(
    examples=transform.outputs["transformed_examples"],
    transform_graph=transform.outputs["transform_graph"],
    schema=schema.outputs["schema"],
    module_file="model.py",
)
evaluator = Evaluator(
    examples=example_gen.outputs["examples"],
    model=trainer.outputs["model"],
    baseline_model=latest_blessed_model,
    eval_config=eval_config,
)
pusher = Pusher(
    model=trainer.outputs["model"],
    model_blessing=evaluator.outputs["blessing"],
    push_destination=serving_dir,
)
```

TFX 的出发点是生产 ML 与普通软件发布不同：输入数据本身会变化，特征工程可能依赖全量统计，训练脚本和服务预处理容易不一致，模型上线前还要和当前线上版本做切片级比较。KDD 2017 的 TFX 论文把这些问题抽象成生产级 ML 平台需求；开源 TFX 则把这些需求落成组件化 pipeline，使一次模型训练不再只是执行 Python 脚本，而是生成一组有 lineage 的 artifacts。

Pipeline 的基本结构是 artifact dependency DAG。组件 \(C_i\) 声明输入 artifacts、输出 artifacts 和执行参数，TFX 根据依赖关系构造有向无环图：

$$
C_j \rightarrow C_i \quad \Longleftrightarrow \quad \mathrm{outputs}(C_j) \cap \mathrm{inputs}(C_i) \ne \varnothing
$$

例如 SchemaGen 依赖 StatisticsGen 的 statistics，ExampleValidator 同时依赖 statistics 和 schema，Transform 依赖 examples 与 schema。这样 orchestrator 可以安全地并行运行没有相互依赖的节点，例如 ExampleValidator 和 Transform 在满足共同上游后可并行；同时 ML Metadata 会记录每个 execution 使用了哪些输入、产生了哪些输出，便于定位某个线上模型到底来自哪批数据、哪个 schema 和哪段训练代码。

数据质量控制由 TFDV 负责。StatisticsGen 先计算训练/评估数据的 summary statistics，SchemaGen 从统计中推断初始 schema，ExampleValidator 再用 schema 检查异常。schema 可以表达 dtype、required/optional、取值域、稀疏特征 valency、训练/服务环境差异等约束。一个简化的异常判定可以写成：

$$
\mathrm{anomaly}(f)=
\mathbf{1}[\mathrm{type}(f)\notin S_f]
\lor \mathbf{1}[\mathrm{missing\_rate}(f)>\tau_m]
\lor \mathbf{1}[\mathrm{drift}(P_t(f),P_{t+1}(f))>\tau_d]
$$

其中 \(S_f\) 是 schema 对特征 \(f\) 的约束，\(\tau_m\) 是缺失率阈值，\(\tau_d\) 是 drift 阈值。TFDV 官方文档中，categorical drift 可用 L-infinity distance，numeric drift 可用近似 Jensen-Shannon divergence；这让数据问题在训练前暴露，而不是等模型指标下降后再排查。

Transform 组件解决 training-serving skew。许多特征工程需要全量 pass，例如归一化、分桶、词表构建；如果训练时用 pandas/Beam 计算，服务时用另一套 Java/C++/Python 逻辑复写，很容易出现边界处理不一致。TFT 要求用户定义 `preprocessing_fn`，离线阶段基于训练数据分析出常量、词表和变换图，随后把同一个 `transform_graph` 同时喂给 Trainer 与 serving signature。机制上，它把训练和服务预处理约束为同一个函数：

$$
x'_{\mathrm{train}} = g_\theta(x), \quad x'_{\mathrm{serve}} = g_\theta(x)
$$

这里 \(\theta\) 是从训练数据分析得到的均值、方差、vocabulary 等 transform 状态。只要服务加载的是同一份 `transform_graph`，线上和离线就不会因为手写预处理差异产生系统性偏差。

Evaluator/TFMA 是部署门控。它会在评估集和指定 slices 上计算候选模型指标，并可与最新 blessed baseline 比较：如果候选模型在 AUC、loss、accuracy 等指标上满足绝对阈值和相对变化阈值，Evaluator 产生 blessing；否则 Pusher 不会把模型推到服务目录。这个机制把“模型是否足够好”从人工看几张图变成 pipeline 的显式条件，也使持续训练可以自动运行但不自动发布坏模型。

与 Kubeflow Pipelines、Airflow 的区别在于抽象层级。Airflow/KFP 更偏通用工作流编排；TFX 定义的是 ML 生命周期里的标准组件、artifact 类型和元数据语义。TFX pipeline 可以交给这些 orchestrator 执行，但仍保留 ExampleGen、Transform、Evaluator、Pusher 等 ML 专用契约。对 ML 平台而言，这种契约比单纯 DAG 更重要，因为它规定了数据校验、特征一致性、模型祝福和 lineage 的边界。

> 💡 关键：TFX 的核心贡献是把生产 ML 的隐性工程约束组件化、类型化和可追踪化，让持续训练与部署从手工流程变成可审计 pipeline。

#### 🧪 练习题
```yaml
question: "TFX Transform 组件主要解决的生产问题是什么？"
options:
  - "让训练和服务加载同一份 transform graph，减少 training-serving skew"
  - "替代所有模型训练算法"
  - "只负责把 CSV 文件压缩成 zip"
  - "绕过模型评估直接发布模型"
answer: 0
explain: "TFT 会把从训练数据分析得到的预处理逻辑导出为 transform graph，并同时用于训练与服务。"
```

### Kubeflow

```yaml
id: kubeflow
num: 25
name: Kubeflow
full_name: Kubeflow
year: '2018'
org: Google/Cisco
parent: tfx
paper_url: https://www.kubeflow.org/
project_url: ''
category: mlops_lifecycle
motivation: 基于Kubernetes的云原生ML工作流编排平台
```

#### 📝 一句话总结
Kubeflow 将机器学习开发、训练、调参、流水线和服务部署统一到 Kubernetes 资源模型上，解决了 ML 系统在多团队、多框架、多集群环境中的可复现编排和生产化运维问题。

#### 🎯 核心要点
- 以 Kubernetes 为底座，用 CRD、controller、namespace、RBAC、PVC、Service 等原生机制表达 ML 工作负载
- Kubeflow Pipelines 将端到端 ML 流程编译为由容器化组件组成的 DAG，并追踪 run、artifact、metadata 与参数
- Kubeflow Trainer/Training Operator 将分布式训练封装为 TrainJob、PyTorchJob、TFJob、MPIJob 等声明式 API
- Notebooks、Profiles、Central Dashboard 提供多租户交互开发入口，并把用户隔离映射到 Kubernetes 命名空间和权限
- Katib 负责超参数搜索和 AutoML，KServe 负责模型推理服务、自动扩缩容、健康检查、流量治理和灰度发布
- 与 TFX 的差异在于 Kubeflow 更偏云原生平台层：它不绑定单一 ML 框架，而是把框架、数据处理、训练和服务都托管到 K8s 生态

#### 🔬 深入细节
![Kubeflow 官方架构图](https://www.kubeflow.org/docs/started/images/kubeflow-architecture.drawio.svg)
*图：Kubeflow Architecture 官方文档中的 Overview Diagram，展示 Kubeflow subprojects 如何覆盖 AI lifecycle 并运行在 Kubernetes 之上；图片来源：Kubeflow 官方文档。*

Kubeflow 的核心思想不是发明新的集群调度器，而是把机器学习任务“翻译”为 Kubernetes 能理解的声明式资源。一个训练任务、一次流水线运行或一个推理服务都可以看成期望状态 \(S_{desired}\)，controller 持续观察实际状态 \(S_{actual}\)，并通过创建 Pod、Service、PVC、Job、InferenceService 等资源让二者收敛：

$$
\text{reconcile}(S)=\arg\min_{a \in A} d(S_{desired}, a(S_{actual}))
$$

这个机制使 Kubeflow 可以继承 Kubernetes 的资源调度、故障恢复、服务发现、密钥管理、配额和审计能力。对 ML 平台团队而言，关键收益是边界清晰：数据科学家提交的是 pipeline 或 training spec，平台侧负责把它落到 GPU、存储、网络、权限和日志系统中。

```python
# Kubeflow 端到端训练与部署流程伪代码
from kfp import dsl

@dsl.component
def preprocess(raw_uri: str) -> str:
    dataset_uri = run_spark_or_container_job(raw_uri)
    return dataset_uri

@dsl.component
def train(dataset_uri: str, epochs: int) -> str:
    # 实际实现可创建 PyTorchJob/TFJob/TrainJob，由 Kubernetes controller 编排 worker pod。
    model_uri = submit_distributed_training(
        image="registry.example.com/trainer:latest",
        inputs={"dataset": dataset_uri, "epochs": epochs},
        resources={"gpu": 8, "cpu": 64},
    )
    return model_uri

@dsl.component
def evaluate(model_uri: str, holdout_uri: str) -> float:
    metrics = run_batch_inference(model_uri, holdout_uri)
    return metrics["auc"]

@dsl.component
def deploy(model_uri: str):
    apply_kserve_inferenceservice(
        name="fraud-model",
        predictor={"tensorflow": {"storageUri": model_uri}},
        autoscaling={"minReplicas": 1, "maxReplicas": 20},
    )

@dsl.pipeline(name="train-evaluate-deploy")
def pipeline(raw_uri: str, holdout_uri: str, epochs: int = 5):
    ds = preprocess(raw_uri=raw_uri)
    model = train(dataset_uri=ds.output, epochs=epochs)
    auc = evaluate(model_uri=model.output, holdout_uri=holdout_uri)
    with dsl.If(auc.output > 0.80):
        deploy(model_uri=model.output)
```

Kubeflow Pipelines 将工作流建模为有向无环图 \(G=(V,E)\)。每个节点 \(v \in V\) 是一个容器化组件，边 \(e=(u,v)\) 表示数据依赖或执行顺序，因此调度约束可以写成：

$$
e=(u,v) \in E \Rightarrow start(v) \ge finish(u)
$$

组件之间传递的是参数和 artifact，而不是隐式共享的本地文件。这样做牺牲了一点开发便利性，但换来可复现性：每次 run 的输入、镜像、参数、产物位置和指标都能被记录，失败节点可以单独重试，缓存也可以基于组件输入输出进行判断。相比把整个 ML 脚本塞进一个单体 Job，DAG 把“数据准备、训练、评估、注册、部署”拆成可审计的边界。

分布式训练层体现了 Kubeflow 的第二个系统抽象：将框架特定的启动协议写入 CRD 和 controller。例如 PyTorch 分布式训练需要 rank、world size、master 地址、worker 副本、重启策略和资源请求；TFJob 又有 chief、worker、parameter server 等角色。Kubeflow 把这些内容声明为训练资源，controller 负责创建 Pod、注入环境变量、观察状态和汇总 job condition。资源可行性由 Kubernetes 调度器处理：

$$
\sum_{p \in node} cpu_p \le C_{node},\quad
\sum_{p \in node} mem_p \le M_{node},\quad
\sum_{p \in node} gpu_p \le G_{node}
$$

模型服务层通常通过 KServe 接入。Kubeflow 不把“服务模型”简化为启动一个 Flask 进程，而是把模型 URI、runtime、protocol、autoscaling、canary traffic 和 health check 组织为 InferenceService。训练产物从 pipeline artifact 或模型仓库流入服务层，线上请求再通过网关路由到 predictor。这使部署过程能被 GitOps、审计和回滚管理，而不是依赖人工复制模型文件。

Kubeflow 的平台价值还在多租户。Profiles 和 namespace 将不同团队的 notebook、pipeline run、secret、PVC 和服务隔离开；RBAC 决定谁能提交训练、读取产物或发布服务。这个设计非常贴合企业 ML 平台：数据科学家使用 Notebook 和 SDK，平台工程师维护 cluster policy，安全团队审计 Kubernetes 对象和访问控制。

> 💡 关键：Kubeflow 的“算法”不是某个损失函数，而是一套云原生控制面抽象。它把 ML 生命周期中的状态、依赖、资源和权限都变成声明式对象，再用 Kubernetes reconciliation loop 保持系统收敛。

#### 🧪 练习题
```yaml
question: "Kubeflow Pipelines 为什么适合表达端到端机器学习流程？"
options:
  - "它把每个步骤表示为容器化组件 DAG，并记录参数、产物和运行元数据"
  - "它要求所有模型必须用 TensorFlow 编写"
  - "它通过单机 shell 脚本顺序执行所有任务"
  - "它只负责展示 notebook，不参与训练或部署"
answer: 0
explain: "KFP 的核心是组件 DAG 和元数据追踪；这让数据准备、训练、评估和部署可以被复现、重试、缓存和审计。"
```

### Feast

```yaml
id: feast
num: 26
name: Feast
full_name: Feast特征存储 (Feast)
year: '2019'
org: Gojek/Google
parent: kubeflow
paper_url: https://feast.dev/
project_url: ''
category: mlops_lifecycle
motivation: 首个开源特征存储，解决训练与推理数据一致性
```

#### 📝 一句话总结
Feast 提出开源特征存储抽象，用统一的特征定义、离线/在线存储和时间正确的读取 API，解决生产 ML 中训练-推理特征不一致、未来信息泄漏和在线低延迟取数问题。

#### 🎯 核心要点
- 用 Entity、FeatureView、DataSource、FeatureService 描述特征语义、主键、schema、事件时间、TTL 和服务分组
- Registry 保存特征对象元数据，使特征定义可以版本化、复用、审计并被训练和推理共享
- Offline Store 面向历史训练集和 batch scoring，Online Store 面向毫秒级在线推理查询
- `get_historical_features` 执行 point-in-time join，确保训练样本只使用预测时间点之前可见的特征
- materialization 或 push 写入将特征从 batch/stream/request sources 同步到在线存储，降低线上计算复杂度
- Feature Server 和 SDK 使模型服务按 entity row 获取在线特征，避免每个模型服务重复实现特征读取逻辑

#### 🔬 深入细节
![Feast 官方架构图](https://raw.githubusercontent.com/feast-dev/feast/master/docs/assets/feast_marchitecture.png)
*图：Feast 官方架构图，展示 request/stream/batch sources 经 Transform 进入 Feast 的 Store、Serve、Register 三类能力，并输出 online/offline features；图片来源：Feast 官方文档仓库。*

Feast 解决的是生产 ML 数据路径问题，而不是模型结构问题。推荐、广告、风控等系统通常有两套特征逻辑：训练时用 Spark/SQL 从历史表中拼出训练集，线上推理时用服务代码、缓存或 KV store 取最近特征。只要两套逻辑在窗口、过滤条件、缺失值或时间戳处理上不一致，就会出现 training-serving skew；如果训练集 join 时拿到了样本时间之后才产生的值，还会出现未来信息泄漏。

Feast 的对象模型把这些隐含约定显式化。Entity 定义 join key，DataSource 指向表、流或请求输入，FeatureView 定义一组共享实体、时间戳、TTL 和 schema 的特征，Registry 则保存这些定义。训练和服务读取都引用同一份 Registry，因此“哪个特征叫什么、从哪里来、实体键是什么、保鲜期多长”不再散落在训练脚本和线上服务中。

```python
# Feast 特征定义、训练读取、在线读取的核心流程伪代码
from datetime import timedelta
from feast import Entity, FeatureStore, FeatureView, Field
from feast.types import Float32, Int64

driver = Entity(name="driver", join_keys=["driver_id"])

driver_stats = FeatureView(
    name="driver_hourly_stats",
    entities=[driver],
    ttl=timedelta(days=2),
    schema=[
        Field(name="conv_rate", dtype=Float32),
        Field(name="avg_daily_trips", dtype=Int64),
    ],
    source=driver_stats_batch_source,  # 包含 event_timestamp 字段的离线/流式数据源
)

store = FeatureStore(repo_path="feature_repo/")
store.apply([driver, driver_stats])      # 将定义写入 registry
store.materialize(start_date, end_date)  # 将最新可服务特征写入 online store

training = store.get_historical_features(
    entity_df=label_rows_with_event_timestamp,
    features=[
        "driver_hourly_stats:conv_rate",
        "driver_hourly_stats:avg_daily_trips",
    ],
)

online = store.get_online_features(
    features=["driver_hourly_stats:conv_rate"],
    entity_rows=[{"driver_id": 1001}, {"driver_id": 1002}],
)
```

Point-in-time join 是 Feast 最关键的机制。对训练样本 \((e,t)\)，其中 \(e\) 是实体键、\(t\) 是样本预测时间，Feast 不能简单取该实体的最新特征，而要取在 \(t\) 之前已经产生且没有超过 TTL 的最新值：

$$
r^*(e,t)=\operatorname*{arg\,max}_{r \in F(e)}
r.event\_timestamp
\quad \text{s.t.}\quad
r.event\_timestamp \le t,\quad
t-r.event\_timestamp \le TTL
$$

这个公式的直觉很简单：训练时模拟线上预测在当时能看到的信息状态。若样本发生在 10:00，就不能把 10:05 才计算出的点击率 join 进来；否则离线 AUC 会虚高，上线后模型拿不到这些“未来特征”。当数据源有 `created_timestamp` 时，还可以进一步处理迟到数据，避免在某个事件时间已经存在但实际晚到的数据污染训练视图。

在线服务路径则追求低延迟。Feast 推荐把预计算特征 materialize 到 Redis、DynamoDB、Bigtable、PostgreSQL 等 Online Store，让推理服务把特征读取简化为带 TTL 语义的 KV 查询：

$$
\hat{y}=model\big(x_{request},\; f_{online}(entity\_id)\big)
$$

这里 \(x_{request}\) 是请求时才有的上下文特征，\(f_{online}\) 是 Feast 从在线存储返回的预计算特征。把重计算从请求链路中移出后，模型服务不需要连接数据仓库或重跑复杂 SQL，只需通过 SDK 或 Feature Server 拉取统一定义的在线特征。

Feast 的 Transform/Store/Serve/Register 分层也解释了它为什么适合嵌入现有数据平台。Transform 可以发生在请求时、流式链路或离线计算引擎中；Store 不强制替换企业已有的 Snowflake、BigQuery、Spark、Redis 或 DynamoDB；Serve 提供训练和推理两类读取 API；Register 则让元数据成为协作接口。它更像“特征控制面”和“一致读取层”，而不是一个必须托管全部数据的数据库。

与 Kubeflow 的关系可以理解为上下游协同：Kubeflow Pipelines 可以编排特征生成、训练和部署；Feast 则负责让训练步骤和线上 InferenceService 获取同一组特征定义。二者结合后，ML 平台不只会调度容器，还能保证模型输入的数据语义一致。

> 💡 关键：Feast 的核心不是把特征集中存到一个地方，而是把特征定义、时间正确性和离线/在线读取路径集中管理；这正是生产 ML 数据系统最容易出错的部分。

#### 🧪 练习题
```yaml
question: "Feast 的 point-in-time join 主要防止哪类问题？"
options:
  - "训练样本 join 到预测时间之后才可见的未来特征"
  - "GPU 显存被模型权重占满"
  - "Kubernetes 调度器无法创建 Pod"
  - "模型服务只能使用 REST，不能使用 gRPC"
answer: 0
explain: "Point-in-time join 会为每个样本选择其事件时间之前的最新有效特征，避免离线训练看到线上推理时不可用的信息。"
```

### TF Serving

```yaml
id: tf_serving
num: 27
name: TF Serving
full_name: TensorFlow Serving
year: '2017'
org: Google
parent: —
paper_url: https://www.tensorflow.org/tfx/guide/serving
project_url: ''
category: inference_system
motivation: 高性能模型推理系统，支持模型版本热切换
```

#### 📝 一句话总结
TensorFlow Serving 提出面向生产推理的高性能模型服务器，用 Servable 生命周期管理、版本策略、SavedModel 集成和请求 batching 解决模型热更新、低延迟访问和多模型服务化问题。

#### 🎯 核心要点
- Servable 是核心抽象，可表示 SavedModel、查找表、词表或组合模型，而生命周期由 Serving Core 管理
- Source 发现模型版本，Loader 封装加载/卸载逻辑，Manager 根据 aspired versions 和 version policy 控制上线状态
- 版本化模型目录支持在不中断服务的情况下加载新版本，并允许客户端请求 latest 或指定版本
- TensorFlow ModelServer 提供 gRPC/REST Predict API，并能通过 model config 同时托管多个模型
- Batching 将多个小请求合并为一次推理，在 GPU/CPU 加速器上用可控排队延迟换取更高吞吐
- Availability Preserving Policy 偏可用性，Resource Preserving Policy 偏资源节省，二者对应不同热切换成本

#### 🔬 深入细节
![TensorFlow Serving 官方架构图](https://raw.githubusercontent.com/tensorflow/serving/master/tensorflow_serving/g3doc/images/serving_architecture.svg)
*图：TensorFlow Serving 官方架构图，展示 Source、Loader、Manager 与 Servable 的生命周期关系；图片来源：TensorFlow Serving 官方文档仓库。*

TensorFlow Serving 面对的核心问题是“模型是动态对象，但服务 API 必须稳定”。训练系统会持续产出新模型版本，线上服务却不能在加载权重时停止接收请求，也不能让请求访问到半加载的模型。Serving 的设计把模型文件、加载过程、版本选择和请求路径拆开，使服务端 API 保持稳定，同时后台异步更新可服务对象。

官方论文和文档中最重要的抽象是 Servable。Servable 是客户端真正使用的对象，可以是一个 TensorFlow SavedModelBundle，也可以是 embedding lookup table、词表或其他推理依赖。它本身不管理生命周期；Source 负责发现某个 servable stream 的新版本，Loader 知道如何把该版本装入内存，Manager 决定何时加载、暴露和卸载。

```python
# TensorFlow Serving 生命周期与推理路径伪代码
class FileSystemSource:
    def poll(self, base_path):
        # /models/ranker/1, /models/ranker/2, ... 目录号即模型版本
        versions = sorted(list_numeric_subdirs(base_path))
        loaders = [SavedModelLoader(path=f"{base_path}/{v}", version=v) for v in versions]
        manager.update_aspired_versions("ranker", loaders)

class Manager:
    def update_aspired_versions(self, model_name, loaders):
        plan = version_policy.plan(current=self.loaded[model_name], aspired=loaders)
        for action in plan:
            if action.kind == "load" and resource_ok(action.loader):
                servable = action.loader.load()
                self.publish(model_name, action.version, servable)
            if action.kind == "unload" and policy_allows_unload(action.version):
                self.unpublish_and_free(model_name, action.version)

def predict(request):
    model_name = request.model_spec.name
    version = request.model_spec.version or manager.latest_ready_version(model_name)
    with manager.get_servable_handle(model_name, version) as servable:
        batch = batch_scheduler.enqueue_or_form_batch(request)
        return servable.session.run(
            fetches=request.output_tensor_names,
            feed_dict=batch.to_feed_dict(),
        )
```

版本控制可以写成一个 aspired set 问题。Source 在时刻 \(t\) 观测到希望服务的版本集合 \(A_t=\{v_1,\dots,v_k\}\)，Manager 已加载集合为 \(L_t\)。Version policy 负责生成加载/卸载动作，使最终状态接近 \(A_t\)，并满足可用性或资源约束：

$$
L_{t+1} = policy(L_t, A_t, R)
$$

Availability Preserving Policy 的约束是尽量保证任意时刻至少有一个可用版本，因此常见顺序是先加载新版本再卸载旧版本；Resource Preserving Policy 则避免新旧模型同时占用内存，可能先卸载旧版本再加载新版本。前者适合强可用服务，后者适合模型很大或显存紧张的场景。

```text
/models/fraud_detector/
  1678900000/
    saved_model.pb
    variables/
  1679000000/
    saved_model.pb
    variables/

model_config_list {
  config {
    name: "fraud_detector"
    base_path: "/models/fraud_detector"
    model_platform: "tensorflow"
    model_version_policy { latest { num_versions: 2 } }
  }
}
```

这个目录约定让部署系统非常简单：训练完成后导出 SavedModel 到一个新的数字版本目录，Serving 通过 Source 轮询或外部通知发现新目录，再由 Loader 构建 servable。客户端可以继续请求 `fraud_detector` 的 latest，也可以在灰度、回滚或 A/B test 中指定版本号。相比把模型权重直接嵌入业务服务，版本目录和 Manager 把“发布模型”变成了一个受控生命周期事件。

Batching 是 TensorFlow Serving 的性能机制。单个在线请求的 batch size 往往很小，矩阵乘法和 GPU kernel 启动成本无法被摊薄。Serving 在请求到达后等待一个很短窗口，把满足形状兼容条件的请求组成批：

$$
B=\{r_i \mid 0 \le arrival(r_i)-arrival(r_0) \le \Delta,\ |B|\le B_{max}\}
$$

平均计算成本可以近似理解为：

$$
cost_{per\_request}(B) \approx \frac{T_{infer}(|B|)+T_{queue}}{|B|}
$$

其中 \(\Delta\) 或 `batch_timeout_micros` 决定额外排队延迟，`max_batch_size` 决定吞吐上限和显存风险。调参的本质是寻找延迟 SLO 和硬件利用率之间的平衡：低流量服务可能不值得等待，高并发 GPU 推理则通常能从 batching 中获得显著吞吐收益。

TensorFlow Serving 与 KServe 的层次不同。TensorFlow Serving 是模型服务器和 Serving Core，关注模型加载、版本、推理 API 和 batching；KServe 是 Kubernetes 上的推理控制面，关注 InferenceService CRD、自动扩缩容、网关路由、canary 和多框架 runtime。生产系统中经常由 KServe 管理 TensorFlow Serving runtime，从而把单机模型服务器能力接入集群级发布和弹性能力。

> 💡 关键：TF Serving 的创新点在于把模型服务拆为稳定 API、动态 servable 生命周期和可调性能路径。热切换不是“覆盖文件”，而是 Source、Loader、Manager、Version Policy 共同完成的状态迁移。

#### 🧪 练习题
```yaml
question: "TensorFlow Serving 中 Manager 的核心职责是什么？"
options:
  - "根据 Source 提供的 aspired versions 管理 Servable 的加载、暴露和卸载"
  - "训练神经网络并更新反向传播梯度"
  - "替代客户端生成所有输入特征"
  - "把 Kubernetes 集群节点扩容到更多机器"
answer: 0
explain: "Manager 监听 Source/Loader 产生的版本信息，并按 version policy 管理 servable 生命周期，保证客户端拿到可用版本。"
```

### KServe

```yaml
id: kserve
num: 28
name: KServe
full_name: KServe
year: '2021'
org: KubeFlow Community
parent: tf_serving
paper_url: https://kserve.github.io/website/
project_url: ''
category: inference_system
motivation: 基于Serverless架构的标准化模型推理协议
```

#### 📝 一句话总结
KServe 提出以 Kubernetes CRD 为核心的云原生模型服务抽象，把模型运行时选择、模型加载、推理协议、弹性伸缩、流量治理和预处理/后处理/可解释组件统一封装到 `InferenceService` 生命周期中。

#### 🎯 核心要点
- 以 `InferenceService` 为核心 API，将 `predictor`、`transformer`、`explainer`、模型存储 URI、资源需求和流量策略声明为 Kubernetes 原生资源。
- 通过 `ServingRuntime`/`ClusterServingRuntime` 解耦模型格式与模型服务器，支持 TensorFlow、PyTorch、scikit-learn、XGBoost、ONNX、Triton、Hugging Face、vLLM 等运行时。
- 控制面采用 Kubernetes controller reconcile 模式，把高层模型服务声明翻译为 Deployment/Knative Service、Service、Gateway/Ingress、HPA/KEDA 和状态条件。
- 数据面提供预测模型的 V1/V2 Open Inference Protocol，以及生成式模型的 OpenAI-compatible API、SSE 流式返回和 LLM 路由能力。
- 支持 canary、A/B testing、InferenceGraph、pre/post-processing、explainability、model cache、storage container 和多租户资源隔离。
- 与 TF Serving 这类单模型服务器不同，KServe 的贡献在于平台级标准化：模型服务器只是一个可插拔 runtime，生命周期、网络、弹性和协议由控制面统一治理。

#### 🔬 深入细节
![KServe 官方分层架构](https://kserve.github.io/website/img/kserve-layer.png)
*图：KServe 官方架构图，来源为 KServe website；图中展示 KServe 位于 Kubernetes 编排层之上，并向上统一 predictive/generative runtime、GenAI integration、autoscaling、networking 和硬件加速能力。*

```python
# KServe controller 的核心 reconcile 逻辑（简化伪代码）
def reconcile_inference_service(isvc):
    spec = isvc.spec
    runtime = select_serving_runtime(
        model_format=spec.predictor.model.modelFormat,
        explicit_runtime=spec.predictor.model.runtime,
    )
    model_volume = resolve_storage_uri(spec.predictor.model.storageUri)

    workload = build_predictor_workload(
        runtime=runtime,
        model_volume=model_volume,
        resources=spec.predictor.resources,
        mode=isvc.annotations.get("deploymentMode", "standard"),
    )
    if spec.transformer:
        workload = attach_transformer(workload, spec.transformer)
    if spec.explainer:
        workload = attach_explainer(workload, spec.explainer)

    route = configure_gateway_or_knative_route(isvc, traffic=spec.predictor.canaryTrafficPercent)
    scaler = configure_autoscaler(isvc, min_replicas=spec.predictor.minReplicas)
    status = observe_readiness(workload, route, scaler)
    patch_status(isvc, status)
```

KServe 的基本设计动机是把“运行一个模型服务器容器”提升为“声明一个生产推理服务”。在直接使用 TF Serving、TorchServe 或自定义容器时，团队通常还要重复实现模型下载、runtime 参数、健康检查、灰度、伸缩、网关、协议适配和可观测性。KServe 将这些重复模式收敛到 `InferenceService`、`ServingRuntime`、`InferenceGraph`、`LocalModelCache` 等 CRD 中，使推理服务可以像其他 Kubernetes 工作负载一样被声明、审计、滚动更新和回滚。

从机制上看，`InferenceService` 是一个高层 desired state，控制面持续执行：

$$
\text{InferenceServiceSpec}
\xrightarrow{\text{reconcile}}
\{\text{Runtime Pod},\text{Model Storage},\text{Service},\text{Gateway Route},\text{Autoscaler},\text{Status}\}
$$

这个映射的关键是分离“模型语义”和“平台实现”。`modelFormat` 与 `storageUri` 描述用户真正关心的模型，`ServingRuntime` 描述该模型应由哪个 server image 运行，controller 再根据部署模式选择标准 Kubernetes Deployment、Knative Service、Gateway API/Ingress 与 HPA/KEDA。这样，平台管理员可以统一维护 runtime 模板、资源默认值、镜像安全策略和网络策略，而模型开发者只需要提交服务声明。

KServe 的数据面则把请求路径标准化。预测式模型通常走 V1 或 V2 inference protocol：V1 延续 TensorFlow Serving 风格的 `:predict`/`:explain`，V2 使用 `/infer`、metadata、readiness/liveness 和 REST/gRPC 接口，便于 Triton 等 server 互通。生成式模型增加 OpenAI-compatible endpoints，例如 `/v1/chat/completions`、`/v1/completions`、`/v1/embeddings`，并支持流式 token 返回。其抽象可以写成：

$$
y = R_{\theta}(\tau_{\text{pre}}(x;\phi),\; m,\; p), \qquad
\hat{y} = \tau_{\text{post}}(y;\psi)
$$

其中 \(R_{\theta}\) 是被 `ServingRuntime` 封装的模型服务器，\(m\) 是模型文件或 Hugging Face/对象存储 URI，\(p\) 是协议参数，\(\tau_{\text{pre}}\) 与 \(\tau_{\text{post}}\) 分别对应可选 `transformer` 中的预处理和后处理。KServe 把这些组件放在一个 endpoint 的流量链路中，调用方看到的是稳定 API，平台内部可以独立升级 runtime、替换 storage backend 或扩缩容副本。

控制面和数据面分离是 KServe 相比传统模型服务器的核心差别。TF Serving 主要关注单进程内的模型版本加载、batching 和 RPC；KServe 关注跨模型、跨框架、跨租户的运维边界。它把灰度发布表述为 Gateway/Knative 的流量比例，把 scale-to-zero 或按指标伸缩交给 Knative/HPA/KEDA，把复杂模型组合交给 `InferenceGraph`。因此它的“算法”更像系统编排算法：通过 CRD、controller 和 runtime contract 将模型服务变成可组合的 Kubernetes 原生资源。

> 💡 关键：KServe 的创新不是新的神经网络公式，而是把推理服务的控制面状态、数据面协议和 runtime 插拔点统一成声明式接口，降低多框架生产部署的运维复杂度。

#### 🧪 练习题
```yaml
question: "KServe 相比直接部署 TF Serving 容器，最核心的系统抽象是什么？"
options:
  - "用 InferenceService CRD 声明模型服务，并由控制面统一生成 runtime、网络、伸缩和状态资源"
  - "把所有模型强制转换成 TensorFlow SavedModel"
  - "只提供一个固定 REST endpoint，不管理底层 Kubernetes 资源"
  - "用单个 GPU kernel 同时执行所有模型"
answer: 0
explain: "KServe 的核心贡献是平台级 CRD 与 reconcile 控制面；模型服务器是可插拔 runtime，而不是唯一抽象。"
```

### vLLM

```yaml
id: vllm
num: 29
name: vLLM
full_name: vLLM
year: '2023'
org: UC Berkeley
parent: kserve
paper_url: https://arxiv.org/abs/2309.06180
project_url: ''
category: inference_system
motivation: 提出PagedAttention，极大提升LLM推理吞吐量
```

#### 📝 一句话总结
vLLM 提出 PagedAttention，把操作系统分页思想引入 LLM KV cache 管理，让连续逻辑 token 的 KV 可以映射到非连续物理 block，从而减少显存浪费、支持 cache 共享，并显著提升高并发推理吞吐。

#### 🎯 核心要点
- PagedAttention 将每个序列的 KV cache 划分为固定大小 KV block，通过 block table 完成逻辑块到物理块的映射。
- KV cache manager 按需分配和释放 GPU/CPU block，避免按最大输出长度预分配连续 tensor 带来的 reserved waste、内部碎片和外部碎片。
- PagedAttention kernel 根据 block table 读取非连续 KV block，在 attention 计算中保持逻辑连续视图。
- 通过 reference count 与 copy-on-write 支持 parallel sampling、beam search 和 shared prefix 场景下的 KV cache 共享。
- 中央 scheduler 与 block manager 协同进行 continuous batching、抢占、recompute/swap 和分布式 GPU worker 执行。
- 论文在 ShareGPT/Alpaca 等 workload 上显示，在相同延迟水平下，vLLM 相比 FasterTransformer/Orca 可获得约 2-4 倍吞吐提升，长上下文和复杂 decoding 更受益。

#### 🔬 深入细节
![vLLM block table 翻译示意图](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x7.png)
*图：vLLM 论文 Figure 6，来源为 ar5iv/arXiv HTML；逻辑 KV block 通过 block table 映射到 GPU DRAM 中非连续的物理 KV block。*

```python
# vLLM decoding loop with PagedAttention（简化伪代码）
while scheduler.has_unfinished_requests():
    batch = scheduler.select_requests(policy="FCFS", memory_budget=kv_allocator.free_blocks)

    for seq in batch:
        # prefill 阶段可能一次写入多个 token；decode 阶段通常每步追加一个 token
        needed = seq.required_new_kv_blocks()
        for _ in range(needed):
            physical_block = kv_allocator.allocate_gpu_block()
            seq.block_table.append(physical_block)

    input_tokens = scheduler.pack_current_step_tokens(batch)
    block_tables = [seq.block_table for seq in batch]

    # kernel 按 block table 读取非连续 KV，并把新 KV 写入当前 block
    logits, new_kv = model.forward_with_paged_attention(input_tokens, block_tables)
    next_tokens = sampler.sample(logits, batch.sampling_params)

    for seq, token in zip(batch, next_tokens):
        seq.append(token)
        if seq.finished():
            kv_allocator.free(seq.block_table)
        elif kv_allocator.needs_preemption():
            scheduler.preempt_latest(seq, mode="swap_or_recompute")
```

LLM serving 的主要瓶颈往往不是单步矩阵乘本身，而是能否在 GPU 显存中容纳足够多并发请求。每个 token 在每一层都产生 key/value 向量，KV cache 会随 prompt 和生成长度增长；输出长度在请求开始时未知，因此传统系统若为每个请求按最大长度预留连续 tensor，会把大量显存锁在未来可能用不到的位置上。论文将浪费分为保留未用位置、内部碎片和外部碎片，这些浪费会直接压低 batch size，导致 GPU 算力利用率不足。

PagedAttention 的核心是把 KV cache 的地址空间虚拟化。对一个序列而言，逻辑 token 仍然是连续的；对 GPU allocator 而言，存储被切成固定大小 block，序列的第 \(j\) 个逻辑 block 可以映射到任意空闲物理 block。设 block size 为 \(B\)，第 \(j\) 个 key/value block 为：

$$
K_j=(k_{(j-1)B+1},\ldots,k_{jB}), \qquad
V_j=(v_{(j-1)B+1},\ldots,v_{jB})
$$

对第 \(i\) 个 query token，attention 不再假设所有 \(K,V\) 在一段连续地址中，而是按 block table 逐块读取：

$$
A_{ij}=\operatorname{softmax}_j\left(\frac{q_i^\top K_j}{\sqrt d}\right), \qquad
o_i=\sum_{j=1}^{\lceil i/B\rceil} A_{ij}V_j
$$

公式的直觉是：数学上的 attention 仍然覆盖所有历史 token，只是 kernel 获取历史 KV 的方式从“连续数组下标”变成“查表后访问物理块”。只要 block table 维护正确，模型语义不变，显存分配却可以动态增长。由于每个请求只可能在最后一个 block 留有空位，浪费上界被限制在一个 block 内；block 越小，碎片越低，但 kernel 管理和调度开销越高，因此实现需要在 block size、访存合并和调度复杂度之间折中。

PagedAttention 还把复杂 decoding 的 cache 共享变成自然结果。parallel sampling 中，同一个 prompt 会分叉成多个输出；beam search 中，多个 beam 在早期共享前缀，后续逐步分叉。传统系统常需要复制大量 KV tensor，而 vLLM 让多个逻辑 block 指向同一个物理 block，并维护 reference count。当某个分支要写入共享 block 时，系统只复制一个 block 并更新映射，这就是 block 粒度的 copy-on-write。共享关系由 block table 隐藏，模型执行只看到每个序列的物理 block 列表。

系统层面，vLLM 将 scheduler、KV cache manager 和 GPU worker 共同设计。scheduler 负责选择当前 batch、执行抢占策略并发送每个请求的 token 与 block table；KV cache manager 负责 GPU block、CPU block、swap 或 recompute；GPU worker 只需按调度器给出的 block table 执行模型分片，并通过 NCCL 等 collective 同步张量并行结果。相比 KServe 这种平台控制面，vLLM 的位置更靠近推理引擎内核：它把显存管理、attention kernel 和 batching 策略绑定起来优化吞吐。

> 💡 关键：PagedAttention 的价值不只是“省显存”，而是把可变长、可共享、可抢占的 KV cache 变成一个分页对象，使调度器可以用更多并发请求填满 GPU。

#### 🧪 练习题
```yaml
question: "PagedAttention 中 block table 的主要作用是什么？"
options:
  - "记录逻辑 KV block 到非连续物理 KV block 的映射，让 attention kernel 按表访问历史 KV"
  - "保存模型权重的梯度，供反向传播使用"
  - "把所有请求强制填充到相同最大长度"
  - "替代 tokenizer，把文本直接转换成 logits"
answer: 0
explain: "vLLM 保持逻辑序列连续，但物理 KV block 可以非连续分配；block table 是二者之间的地址翻译层。"
```

### RaidServe

```yaml
id: raidserve
num: 30
name: RaidServe
full_name: RaidServe
year: '2026'
org: MLSys Community
parent: vllm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: inference_system
motivation: 高可靠弹性推理平台，冗余计算与快速恢复
```

#### 📝 一句话总结
RaidServe 面向张量并行 LLM serving 的 GPU 故障与不规则可用性问题，提出 KVCache/计算均衡与 Lightning Recovery 机制，在 GPU 失效后避免整组停摆、昂贵重算和长期负载倾斜。

#### 🎯 核心要点
- 针对 tensor parallelism 的紧耦合脆弱性：任一 GPU 失效都会丢失本 rank 的 KVCache，阻塞 collective，并迫使请求重算或模型重分片。
- Cyclic KVCache Placement 将 attention head 及其 KVCache 按层循环分布，缓解非均匀 TP 配置下的显存倾斜。
- Hybrid Attention 同时使用 TP attention 与 DP-style replicated attention，让余数 attention head 的计算分散到不同 GPU，减少 straggler 和同步等待。
- Fine-Grained Load-Aware Routing 将新请求路由到剩余 DP workload 最小的 GPU，并用自适应 chunked prefill 形成更均衡的 prefill batch。
- Lightning Recovery 包含 proactive KVCache backup 与 on-demand weight recovery：后台异步备份新 KV page，故障后只恢复缺失 KV 和缺失权重块。
- Stanford MAST/MLSys 条目报告其在 8xH100 DGX 上实现最高约 2 倍吞吐提升和数量级级别的恢复延迟下降，并能在多 GPU 故障下维持较高利用率。

#### 🔬 深入细节
![RaidServe Lightning Recovery 机制](https://ar5iv.labs.arxiv.org/html/2511.14116v1/assets/images/lightning_recovery.drawio.png)
*图：RaidServe/Failsafe 论文 Figure 4 的 On-demand Recovery 机制图，来源为 DOI 10.48550/arXiv.2511.14116 的 arXiv HTML 资产；正式 MLSys/Stanford MAST 条目使用 RaidServe 题名，OpenReview PDF 也以 RaidServe 发布。*

```python
# RaidServe: DP-aware adaptive chunked prefill + failure recovery（简化伪代码）
def build_prefill_batch(token_budget, ranks, schedulable_tokens, workloads):
    load = {r: 0 for r in ranks}
    batch, candidates = [], []
    while len(batch) < token_budget and any(schedulable_tokens[r] for r in ranks):
        r = argmin([r for r in ranks if schedulable_tokens[r]], key=lambda x: load[x])
        token = schedulable_tokens[r].pop(0)
        batch.append(token)
        load[r] += estimate_prefill_cost(token, workloads[r])
        candidates.append(list(batch))
    return choose_best_balanced_batch(candidates, load)

def recover_after_gpu_failure(failed_rank, surviving_ranks):
    mark_unavailable(failed_rank)
    new_layout = cyclic_relayout_attention_and_kv(surviving_ranks)
    for rank in surviving_ranks:
        rank.keep_resident_weights_and_kv()
        rank.load_missing_kv_pages_from_host(disjoint_subset=True)
        rank.load_only_missing_weight_shards()
    nvlink_shuffle_for_locality(new_layout)
    resume_serving_with_hybrid_attention(new_layout)
```

RaidServe 的问题背景来自 TP serving 的故障边界。vLLM 解决了单个引擎内部 KV cache 的内存管理，但大模型常需要多 GPU 张量并行：每层的 attention/FFN 被切分到多个 rank，并在层内通过 collective 合并中间结果。这个设计在正常情况下吞吐高、延迟低，但容错性很差：一个 GPU 掉线不仅使该 rank 的权重 shard 不可用，还会丢失它持有的 KVCache 分片；如果直接重启或重分片，所有 inflight 长上下文请求可能要重新 prefill，尾延迟和队列积压会急剧放大。

第一组机制是“故障后继续高效运行”的平衡器。假设某层有 \(H\) 个 KV heads，故障后可用 GPU 数为 \(R\)，若 \(H\) 不能被 \(R\) 整除，朴素 non-uniform TP 会让一部分 GPU 拿到 \(\lceil H/R\rceil\) 个 heads，另一部分拿到 \(\lfloor H/R\rfloor\) 个 heads。因为 TP 层通常要同步等待最慢 rank，attention 的有效时间近似受最大负载支配：

$$
T_{\text{attn}} \approx \max_{r \in R} T_r, \qquad
T_r \propto h_r \cdot L
$$

其中 \(h_r\) 是 rank \(r\) 负责的 head 数，\(L\) 是当前上下文长度。Cyclic KVCache Placement 通过跨层轮转 head/KVCache 的归属，让长期显存占用不集中在固定 GPU；Hybrid Attention 则把“除不尽”的 head 用 DP-style 复制/路由处理，使不同请求的余数计算分散到多个 GPU，降低单层 straggler。

第二组机制解决请求流量和 prefill batch 的倾斜。长上下文 prefill 的代价不是线性的；当一个 chunk 长度为 \(N\)，此前已处理上下文长度为 \(L\) 时，论文给出的注意力代价可概括为：

$$
\operatorname{cost}_{\text{prefill}}(N,L)=O(N^2 + NL + N)
$$

如果调度器只按 FIFO 把一个长请求的 chunk 塞满 token budget，可能出现一个 GPU 忙于 DP attention、其他 GPU 空转的情况。RaidServe 的 load-aware router 将新请求分配给 pending DP token workload 最小的 rank；adaptive chunked prefill 再从最轻载 rank 迭代取 token/chunk，直到达到全局 budget。这样做不是追求单个请求最快完成，而是追求每个 batch 内各 rank 的工作量接近，从而提高整体吞吐和 SLO 稳定性。

Lightning Recovery 关注“故障瞬间如何恢复状态”。KVCache backup 不是在故障发生后才复制，而是在正常执行期间把新生成 KV page 异步增量复制到 host memory；请求完成后丢弃对应备份。故障后，幸存 GPU 直接复用本地 KVCache，只从 host 恢复缺失 rank 的那部分 KV，并借助 cyclic placement 将 host-to-device 传输分摊到多个 GPU。恢复时间因此近似由最忙恢复 rank 的缺失数据量决定：

$$
T_{\text{recover}} \approx
\max_{r \in R'} \frac{|KV^{\text{miss}}_r| + |W^{\text{miss}}_r|}{BW^{\text{PCIe}}_r}
 + T_{\text{NVLink-shuffle}}
$$

这里 \(R'\) 是幸存 rank 集合。RaidServe 的目标是让每个 rank 的 \(|KV^{\text{miss}}_r|\) 与 \(|W^{\text{miss}}_r|\) 尽量均衡，并用 NVLink 在 GPU 间交换局部状态，避免所有缺失数据都由单个 GPU 经 PCIe 重载。

On-demand weight recovery 则避免重分片时重载已经在显存中的有效权重。以 FFN 中间维度为例，权重可按与 TP world size 无关的固定 shard 切分；故障后如果朴素地把 TP4 改成 TP3，幸存 GPU 可能被迫加载新的连续 shard，造成大量重复 PCIe 传输。RaidServe 保留幸存 rank 上已有 shard，只把失效 rank 的缺失 shard 循环分派给幸存 rank。对 attention 权重和 KVCache，也采用“每个 rank 加载不相交子集，再通过高速 GPU 互联交换”的策略。与单纯全量复制模型副本相比，这种设计更接近 RAID 的思想：增加足够的恢复状态和重布局规则，而不是为每个 TP group 保留完整热备副本。

> 💡 关键：RaidServe 与 vLLM 是互补关系。vLLM 把 KV cache 管成分页对象以提高正常路径吞吐；RaidServe 进一步处理多 GPU TP group 在失效、降级和恢复期间的状态保存、计算均衡与快速重布局。

#### 🧪 练习题
```yaml
question: "RaidServe 的 Lightning Recovery 为什么能降低 GPU 故障后的恢复延迟？"
options:
  - "正常执行时异步备份 KVCache，故障后只恢复缺失 KV page 和缺失权重 shard，并复用幸存 GPU 上已有状态"
  - "把所有请求立即丢弃，从空队列重新开始服务"
  - "要求每个 GPU 始终保存完整模型和完整 KVCache 副本"
  - "关闭 tensor parallelism，改用单 GPU 执行所有模型"
answer: 0
explain: "Lightning Recovery 的关键是增量备份与按需恢复，避免长上下文 re-prefill 和重复权重传输。"
```

### SuperInfer

```yaml
id: superinfer
num: 31
name: SuperInfer
full_name: SuperInfer
year: '2026'
org: MLSys Community
parent: vllm
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
project_url: ''
category: inference_system
motivation: 针对超级芯片的SLO感知调度系统
```

#### 📝 一句话总结
SuperInfer 面向 NVIDIA GH200 这类 GPU-CPU Superchip，提出 RotaSched 与 DuplexKV，把 SLO 感知调度和 KV cache 分层内存管理联合起来，解决高并发 LLM 推理中 GPU HBM 不足导致的 TTFT/TBT 尾延迟问题。

#### 🎯 核心要点
- 硬件假设从传统 PCIe GPU 扩展到 GH200 的 Hopper HBM + Grace DRAM + NVLink-C2C 分层内存
- RotaSched 引入 running、waiting、rotary 三类请求状态，用主动轮转替代仅在 OOM 前触发的被动抢占
- Virtual Lag Time (VLT) 同时表达 TTFT 和 TBT 的 SLO 滞后程度，Largest-VLT-First (LVF) 优先恢复最可能违约的请求
- DuplexKV 用 eager block rotation 消除 swap-in/swap-out 数据竞争，使 H2D 与 D2H 可以全双工重叠
- KV cache 从 layer-first 改为 block-first 布局，并用 batched transfer 合并小段传输，避免 PagedAttention 细粒度块拖垮 C2C 带宽
- 跨迭代流水线把调度、KV 迁移和 decode 计算重叠，目标是在不牺牲吞吐的前提下提升 SLO attainment

#### 🔬 深入细节
![SuperInfer 总体架构](https://arxiv.org/html/2601.20309v2/x7.png)
*图源：SuperInfer arXiv HTML 版 Figure 6。图中 RotaSched 维护请求状态并按 VLT/LVF 调度，DuplexKV 用 block table 管理 Hopper HBM 与 Grace DRAM 中的 KV cache 驻留和迁移。*

![DuplexKV block-first KV cache 布局](https://arxiv.org/html/2601.20309v2/x15.png)
*图源：SuperInfer arXiv HTML 版 Figure 14。block-first 布局把同一 KV block 的多层小 segment 合并成更大的连续传输单元，并通过 `cudaMemcpyBatchAsync` 降低 launch 开销。*

```python
# SuperInfer: LVF scheduling + DuplexKV rotation sketch
def vlt(req, now, alpha, beta_ttft, beta_tbt, slo_ttft, slo_tbt):
    if req.state == "rotary":
        return alpha * max(0, now - req.last_token_time - beta_tbt * slo_tbt)
    if req.state == "waiting":
        return max(0, now - req.arrival_time - beta_ttft * slo_ttft)
    if req.state == "running":
        return -(now - req.running_since)

for iteration in decode_loop:
    requests = running + waiting + rotary
    if hbm_can_hold_all(requests):
        batch = fcfs_batch(requests)
    else:
        ranked = sorted(requests, key=lambda r: vlt(r, now(), alpha, beta_F, beta_B, S_F, S_B), reverse=True)
        prioritized = pick_from_head(ranked, free_hbm_blocks + transfer_budget)
        preempted = pick_running_from_tail(ranked, blocks_needed(prioritized) - free_hbm_blocks)

        DuplexKV.eager_offload_synced_blocks(running)
        DuplexKV.swap_out_dirty_blocks(preempted)      # HBM -> DRAM
        DuplexKV.swap_in_required_blocks(prioritized) # DRAM -> HBM
        batch = form_decode_batch(prioritized)

    run_decode_step(batch)
    DuplexKV.update_block_table(batch)
```

SuperInfer 的出发点是：LLM serving 的瓶颈并不只是“算得慢”，而是每个请求在自回归生成中不断增长的 KV cache 会迅速吃满 HBM。一旦高 RPS 下 HBM 无法容纳所有活跃请求，FCFS、SJF 或只在内存不足时触发的被动 swap 都会出现队头阻塞。论文把用户体验拆成两个 SLO：TTFT 约束首 token 等待时间，TBT 约束相邻 token 间隔。Waiting-First 会照顾新请求 TTFT 却让已生成中的请求长期停顿，Swapped-First 又会保护 TBT 但让新请求排队，二者都不是统一的 SLO 策略。

RotaSched 的关键抽象是 rotary state：请求可以暂时离开 GPU 执行队列，KV cache 放在 Grace DRAM，稍后再被轮转回 Hopper HBM。调度优先级由 VLT 给出：

$$
VLT =
\begin{cases}
\alpha \cdot \mathrm{ReLU}(t_{\text{now}} - t_{\text{last}} - \beta_B S_B), & \text{rotary} \\
\mathrm{ReLU}(t_{\text{now}} - t_{\text{arr}} - \beta_F S_F), & \text{waiting} \\
-(t_{\text{now}} - t_{\text{run}}), & \text{running}
\end{cases}
$$

其中 \(S_B\) 和 \(S_F\) 分别对应 TBT 与 TTFT SLO，\(\alpha\) 调整 TBT 相对 TTFT 的敏感度，\(\beta_B,\beta_F\) 是容忍系数。直觉上，waiting/rotary 请求一旦超过容忍窗口，VLT 变正并随等待时间增大，表示“落后”；running 请求 VLT 为负且越跑越小，表示“已经占用了较多 GPU 时间”。LVF 每轮把 VLT 最大的 waiting/rotary 请求放回 HBM，把 VLT 最小的 running 请求换出，从而把有限 HBM 当成 OS scheduler 中的时间片资源来管理。

DuplexKV 解决的是“即使有 GH200，也不能天真地 memcpy”。vLLM/PagedAttention 的 layer-first 布局让每层每块形成很小的 segment，例如一个 block 的完整 KV 可能有数 MB，但每次连续内存段只有数十 KB，导致大量 `cudaMemcpyAsync` launch，实际 C2C 带宽远低于硬件上限。SuperInfer 把布局改成 block-first，使一个请求 block 跨层连续，近似有：

$$
S_{\text{block}} = N_L \cdot S_{\text{seg}}
$$

当 \(N_L\) 层的 segment 被合并后，传输粒度进入 NVLink-C2C 的高效区间；再用 batch copy 把同方向多个 block 描述符合并提交，就减少了 kernel launch 的固定成本。

全双工迁移还有一个正确性问题：swap-in 的目标 HBM block 可能正是 swap-out 的源 block，直接开两个 CUDA stream 会产生数据竞争。DuplexKV 的 eager block rotation 利用 KV cache 只追加写入的性质，把已填满且不会再修改的 synced block 提前后台复制到 DRAM；真正抢占时，只需要处理最后一个 dirty block，已同步 block 可以从 HBM 丢弃。这让 H2D 和 D2H 在多数情况下不再互相等待，并能和 decode 计算跨迭代重叠。

与 vLLM 的关系可以理解为“保留分页抽象，扩大调度边界”。PagedAttention 解决的是 GPU 内部 KV cache 碎片与复用问题，SuperInfer 进一步把 CPU DRAM 纳入 serving 的热/冷层级，并让请求调度显式感知 SLO、传输预算与 KV 驻留位置。它不是替代连续 batching，而是在 HBM 成为约束时决定哪些请求应该继续运行、哪些应该进入 rotary、哪些应该被立即恢复。

> 💡 关键：SuperInfer 的核心不是单个更快的 kernel，而是把请求调度、KV cache 布局、双向数据搬运和 GH200 硬件层级共同建模，避免“有高速互联但软件仍按 PCIe 时代方式搬数据”。

#### 🧪 练习题
```yaml
question: "SuperInfer 中 VLT 的主要作用是什么？"
options:
  - "把所有请求固定为 FCFS 顺序"
  - "估计请求相对 TTFT/TBT SLO 的滞后程度，用于决定恢复和抢占"
  - "压缩模型权重以减少参数量"
  - "选择 HTTP 网关的负载均衡策略"
answer: 1
explain: "VLT 把 waiting、rotary、running 请求统一到同一优先级尺度；LVF 优先执行 VLT 高的滞后请求，并抢占 VLT 很低的长期 running 请求。"
```

### OpenTela

```yaml
id: opentela
num: 32
name: OpenTela
full_name: OpenTela
year: '2026'
org: OSDI Community
parent: vllm
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: inference_system
motivation: 统一去中心化HPC集群的异构LLM推理系统
```

#### 📝 一句话总结
OpenTela 提出面向去中心化 HPC/云混合集群的 LLM serving overlay，用 P2P、CRDT 状态复制、身份组路由和用户态 Slurm/Kubernetes 适配，把分散异构 GPU 节点组织成一个可共享的推理资源池。

#### 🎯 核心要点
- 采用 decentralized compute fabric，而不是依赖单一 Kubernetes 控制面或中心调度器
- 通过 libp2p gossip + CRDT registry 复制 distributed node table，承载 peer、service、identity group、health、relay 等状态
- 路由入口为 `/v1/service/:service/*path`，按服务名和请求体中的 identity group 选择能服务指定模型的 worker
- 支持 exact、wildcard、catch-all 三层匹配，利用 `X-Otela-Fallback` 控制是否退化到更宽松的候选集合
- 提供 direct routing 与 relay-hop routing，适配 HPC 计算节点位于防火墙/NAT 后的常见部署
- 请求级调度内置 random、round-robin、shortest-queue，并把 fleet-level orchestration 留给外部控制环或 Fleet Manager
- 在 SwissAI 场景中连接 Alps 的 Slurm 子集群和 Kubernetes 子集群，支撑多模型、多租户、跨硬件的共享推理服务

#### 🔬 深入细节
![SwissAI OpenTela 架构图](https://raw.githubusercontent.com/eth-easl/OpenTela/main/docs/content/docs/assets/swissai-arch.png)
*图源：OpenTela 官方仓库文档中的 SwissAI 架构图。该图展示 API frontend、OpenTela overlay、Slurm/Kubernetes 子集群和 vLLM/SGLang 后端如何组成统一 serving 平台。*

```python
# OpenTela request routing and decentralized state sketch
def route_request(head, service, body, fallback_level, min_trust=0):
    table = head.crdt_node_table.snapshot()
    providers = [p for p in table.peers if p.provides(service)]

    exact = [p for p in providers if p.identity_matches(body, mode="exact")]
    wildcard = [p for p in providers if p.identity_matches(body, mode="wildcard")]
    catch_all = [p for p in providers if p.identity_matches(body, mode="all")]

    tiers = [exact]
    if fallback_level >= 1:
        tiers.append(wildcard)
    if fallback_level >= 2:
        tiers.append(catch_all)

    candidates = first_non_empty([trust_filter(t, min_trust) for t in tiers])
    worker = load_balancer.pick(candidates)  # random, round-robin, shortest-queue, or weighted

    if head.has_direct_libp2p_connection(worker):
        return p2p_forward(worker, f"/v1/_service/{service}", body)
    relay = worker.relay_peer
    return p2p_forward(relay, f"/v1/p2p/{worker.peer_id}/v1/_service/{service}", body)

def on_crdt_head_received(peer, cid):
    block = bitswap_fetch(peer, cid, timeout="5m")
    if block:
        local_node_table.merge(block.delta)
```

OpenTela 的问题设定很具体：很多科研和国家级 AI 基础设施不是云厂商式的单一弹性集群，而是由 Slurm HPC 队列、若干子集群、少量 Kubernetes 长跑服务和多种 GPU 架构组成。传统做法要求研究者自己准备环境、提交作业、等待排队、暴露服务并管理生命周期；同一个模型可能被多人重复启动，GPU 利用率和服务可达性都不好。OpenTela 的目标是在不要求 root 权限、不改内核、不把整套 HPC 纳入 Kubernetes 的前提下，给这些节点加一层“云式”的服务发现、路由、健康检查和共享访问。

系统核心状态是 distributed node table。每个 peer 在表中发布自己提供的 service、监听地址、identity group、trust/health、relay_peer 等元数据；CRDT 后端通过 Merkle-DAG head 与 PubSub/gossip 传播更新。可以把收敛过程抽象为：

$$
T_i^{(k+1)} = T_i^{(k)} \sqcup \Delta_j
$$

其中 \(T_i\) 是节点 \(i\) 当前看到的 node table，\(\Delta_j\) 是其他 peer 广播的新 delta，\(\sqcup\) 是 CRDT merge/join。即使某次 DAG block 因 peer 离线、NAT 或超时未取到，后续 gossip 仍能继续收敛；这比单中心 registry 更适合高 churn、预emptible、排队式 HPC 节点。

请求路由分两层完成。第一层是语义筛选：用户访问 head node 的 `/v1/service/llm/v1/chat/completions`，head 从 JSON body 读取 `model` 等字段，和 worker 注册的 `identity_group` 对比。候选集合可写成：

$$
C =
\begin{cases}
C_{\text{exact}}, & C_{\text{exact}}\neq\varnothing \\
C_{\text{wildcard}}, & L\ge 1 \land C_{\text{wildcard}}\neq\varnothing \\
C_{\text{all}}, & L\ge 2 \land C_{\text{all}}\neq\varnothing \\
\varnothing, & \text{otherwise}
\end{cases}
$$

这里 \(L\) 来自 `X-Otela-Fallback`。默认只接受 exact match，例如 `model=Qwen/Qwen3-8B`；开启 fallback 后才会退到 `model=*` 或 `all`。这种设计避免把不兼容模型的请求随机打到错误 worker，同时允许平台配置兜底模型或通用后端。

第二层是负载均衡与连通性处理。OpenTela 内置 random、round-robin 和 shortest-queue；`shortest-queue` 使用每个 peer 的 in-flight 请求数，等价于选择

$$
p^* = \arg\min_{p\in C} q_p
$$

其中 \(q_p\) 是该 peer 当前未完成请求数。若启用 weighted routing，还可以把候选分数 \(w_p\) 转成 \(P(p)=w_p/\sum_{c\in C}w_c\) 的随机选择。选中 worker 后，如果 head 与 worker 有直接 libp2p 连接，请求走 direct routing；如果 worker 在 HPC 防火墙后，则经 worker 注册的 relay peer 中转。对用户来说 endpoint 不变，这正是 overlay 的价值。

OpenTela 明确区分 request-level scheduling 和 fleet-level orchestration。前者在 head node 热路径内决定“这个请求给哪个 worker”；后者是外部 observe-decide-act 控制环，轮询 `/v1/dnt/table`、`/metrics`、`/v1/health` 等接口，再通过 Slurm 作业、云 VM、systemd 或 Fleet Manager 启停节点。这个边界让 OpenTela 不强行替代 HPC scheduler，而是把 Slurm 负责的资源分配和在线服务层需要的路由/发现/故障转移连接起来。

与 vLLM 的关系也很清楚：vLLM/SGLang 是单个模型实例内的推理引擎，负责 batching、KV cache 和 kernel；OpenTela 是跨节点、跨站点、跨 scheduler 的服务网络，负责把请求送到正确实例并让多个实例形成共享池。与 KServe 相比，OpenTela 不把 Kubernetes 作为唯一底座，反而把用户态 overlay 放在 Slurm 与 Kubernetes 之上，因此更适合不能长期独占节点、不能安装集群级组件的 HPC 环境。

> 💡 关键：OpenTela 的“算法”不是一个模型内调度公式，而是把分散节点状态建模成可收敛 CRDT，把模型可服务性建模成 identity group，把不可达 HPC 节点建模成 relay-hop，从而把批处理环境变成可交互推理平台。

#### 🧪 练习题
```yaml
question: "OpenTela 中 identity group 路由的主要目的是什么？"
options:
  - "按请求中的模型等语义字段筛选能处理该服务的 worker"
  - "压缩 KV cache"
  - "替代 vLLM 的 attention kernel"
  - "强制所有节点迁移到 Kubernetes"
answer: 0
explain: "identity group 让 worker 声明自己能服务的模型或服务类型；head node 根据请求体和 fallback 级别选择 exact、wildcard 或 catch-all 候选。"
```

### Djinn

```yaml
id: djinn
num: 33
name: Djinn
full_name: Djinn
year: '2026'
org: OSDI Community
parent: kserve
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
project_url: ''
category: inference_system
motivation: 语义感知的透明GPU解耦系统
```

#### 📝 一句话总结
Djinn 面向透明 GPU disaggregation，核心思想是在保持应用近似本地 GPU 编程体验的同时，让运行时理解模型阶段、tensor 驻留、依赖和关键路径语义，从而把远端 GPU 的放置、缓存和数据迁移从字节级转发提升为语义感知调度。

#### 🎯 核心要点
- USENIX OSDI '26 页面目前公开了题名与作者，论文正文/图尚未公开；以下结合官方页面和同一作者方向的公开 HotNets'25 论文进行同等深度解读
- 目标是 transparent GPU disaggregation：应用无需显式改写成远程调用，GPU 可以来自网络连接的资源池
- semantic awareness 关注 phase、dependency、residency、criticality、tensor metadata，而不是只看 CUDA call、DMA 或 PCIe transaction
- 通过框架/运行时层捕获计算意图，避免低层 driver replay 丢失语义，也避免应用专用系统需要大量手工重构
- 调度器可根据语义决定远端 GPU 放置、KV cache/权重驻留、激活迁移、预取和重算
- 后端数据路径适合结合 RDMA/GPUDirect 等 zero-copy 机制，减少 CPU bounce buffer 和重复传输
- 与 KServe 这类服务编排不同，Djinn 更靠近设备虚拟化与 ML framework runtime 层

#### 🔬 深入细节
![GPU-NIC 直接数据路径示意](https://developer-blogs.nvidia.com/wp-content/uploads/2022/04/Inline-Packet-Fig-2.png)
*图源：NVIDIA Technical Blog 的 GPUDirect RDMA 示意图。Djinn OSDI 页面目前未公开论文图；这里用 NVIDIA 官方图说明语义感知 GPU 解耦底层可能依赖的网络到 GPU 直接数据路径，而 Djinn 的关键新增部分在其上层的语义运行时和调度器。*

```python
# Djinn-style semantic GPU disaggregation sketch
def execute_with_remote_gpu(op, tensors, runtime_state):
    sem = infer_semantics(
        op=op,
        phase=runtime_state.phase,              # e.g. llm_prefill, llm_decode
        tensor_roles=[role(t) for t in tensors],# weight, activation, kv_cache, temp
        dependencies=runtime_state.graph_edges,
        criticality=runtime_state.critical_path
    )

    graph_node = SRGNode(op=op, semantics=sem, cost=profile_or_estimate(op, tensors))
    target = scheduler.place(graph_node, gpu_pool=runtime_state.remote_gpus)

    for t in tensors:
        if not residency_ok(t, target):
            if sem.allows_recompute(t):
                mark_for_recompute(t, target)
            else:
                prefetch_or_migrate(t, target, priority=sem.criticality)

    handle = backend.launch(target, graph_node, zero_copy=True)
    runtime_state.update_residency(outputs(handle), target)
    return materialize_if_needed(handle)
```

公开资料的边界需要先说明：USENIX OSDI '26 的 Djinn 条目截至当前只给出题名“Transparent GPU Disaggregation with Semantic Awareness”和作者；同一作者组在 HotNets'25 的 *Lost in Translation: The Search for Meaning in Network-Attached AI Accelerator Disaggregation* 中系统阐述了“语义翻译缺口”、Semantically Rich Graph (SRG)、framework-layer runtime 和 zero-copy backend。因此下面的机制解读以 Djinn 题名为目标，用这篇公开论文的设计语言解释 Djinn 很可能要解决的系统问题；具体实现细节应以 OSDI 正文发布后为准。

传统 GPU 解耦有两个极端。低层方案在 PCIe、driver 或 CUDA API 级别转发调用，透明性好，但看到的只是内存拷贝、kernel launch 和同步点，无法判断某个 buffer 是持久权重、一次性 activation、KV cache，还是关键路径上的 logits。高层方案则可以利用模型知识，但往往变成 DistServe/Prism 这类面向特定工作负载的系统，通用性和透明性下降。Djinn 的“semantic awareness”正是在这两者之间找窄腰：运行时需要足够高，能看见 ML framework 的计算语义；同时又要足够通用，不要求每个应用手写远程执行计划。

可以把语义运行时抽象为一张带注解的图：

$$
SRG = (V, E, A_V, A_E)
$$

其中 \(V\) 是 op 或 fused subgraph，\(E\) 是 tensor 依赖，\(A_V\) 包含 phase、residency、modality、FLOPs/bytes 等节点注解，\(A_E\) 包含 tensor shape、precision、producer-consumer rate 和 criticality。对 LLM 推理而言，prefill 是更偏 compute-bound 的批量阶段，decode 是更偏 memory-bound 且强依赖 KV cache 的串行阶段；如果运行时能识别这一点，就不会把每一步 decode 的 KV cache 当成普通字节流反复搬运。

调度器可使用类似下面的代价模型选择远端 GPU：

$$
\mathrm{cost}(v,g)=C_{\mathrm{compute}}(v,g)+
\sum_{(u,v)\in E}\frac{\mathrm{bytes}(u,v)\cdot \mathbf{1}[\mathrm{loc}(u)\ne g]}{\mathrm{bw}(\mathrm{loc}(u),g)}
\lambda\cdot \mathrm{criticality}(u,v)
$$

这个公式表达的不是 Djinn 论文中的最终形式，而是语义解耦系统必须优化的核心机制：计算放置不能只看 GPU 空闲度，还要看前驱 tensor 是否已驻留、网络带宽是否足够、依赖是否在关键路径上、迁移能否被隐藏。语义信息越丰富，调度器越能把持久权重固定在远端 GPU，把 decode 与 KV cache 共置，把短生命周期 activation 延后或重算，把非关键路径迁移放到后台。

透明性意味着应用看到的接口尽量不变，复杂性落到 runtime/backend。前端可以通过框架 hook、lazy tensor、graph capture 或 CUDA/框架调用拦截捕获 intent；中间层生成语义图并交给调度器；后端再用 RDMA、GPUDirect、GPU memory handle 或用户态 RPC 执行远端计划。NVIDIA GPUDirect RDMA 图展示的是底层目标：NIC 可以直接把数据送入 GPU memory，减少 CPU 参与和 host memory bounce；Djinn 类系统的新增价值，是知道“哪些数据值得走这条快路径、哪些数据根本不该搬”。

与 KServe 的区别在层级。KServe 管理的是容器化模型服务：模型副本、HTTP/gRPC endpoint、autoscaling 和流量入口；Djinn 管理的是一个模型进程内部或框架运行时看到的 GPU 资源：某个 op 在哪块本地/远端 GPU 执行，某个 tensor 的真实副本在哪里，某次同步是否必须阻塞。两者可以上下叠加：KServe 仍可负责 service lifecycle，而 Djinn 在单个 pod 或 worker 内把 GPU 从本地独占设备扩展为可池化远端资源。

> ⚠️ 注意：由于 Djinn OSDI 正文尚未公开，本文件没有声称其最终实现一定采用 SRG 或某个具体代价函数；这些内容是基于公开题名、作者页和同作者公开论文中“semantic accelerator disaggregation”路线的机制化解读。

#### 🧪 练习题
```yaml
question: "语义感知 GPU 解耦相对于低层 CUDA/PCIe 转发的关键优势是什么？"
options:
  - "能区分权重、激活、KV cache、执行阶段和关键路径，从而减少不必要的数据迁移"
  - "完全不需要网络"
  - "只适用于单机本地 GPU"
  - "把模型参数随机切分到所有节点"
answer: 0
explain: "低层转发通常只看到字节和调用，无法判断数据语义；语义运行时能据此做放置、缓存、预取和重算决策。"
```
