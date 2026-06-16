### Ray分布式框架 (Ray)

```yaml
id: ray
name: Ray
full_name: Ray分布式框架 (Ray)
year: '2018'
org: UC Berkeley
paper_url: https://www.usenix.org/conference/osdi18/presentation/moritz
category: training_platform
parent: —
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
