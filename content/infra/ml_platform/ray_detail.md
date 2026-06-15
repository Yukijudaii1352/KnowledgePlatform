### Ray

```yaml
id: ray
name: Ray
full_name: Ray分布式框架 (Ray)
year: "2018"
org: UC Berkeley
paper_url: https://www.usenix.org/conference/osdi18/presentation/moritz
category: training_platform
parent: —
motivation: 统一的分布式执行引擎，支持动态任务调度
```

#### 📝 一句话总结

Ray 提出面向 AI 应用的统一分布式执行框架，用 task、actor 和分布式对象存储同时支持训练、调参、强化学习和在线服务等动态工作负载。

#### 🎯 核心要点

- 统一 stateless task 与 stateful actor，覆盖函数式并行和有状态服务
- 用 lineage 记录任务依赖，结合对象存储实现透明容错和数据共享
- 两层调度架构：全局控制状态 + 本地调度器，兼顾动态性和可扩展性
- 对象通过 plasma object store 以 immutable 引用传递，减少 Python 进程间复制
- 为 Tune、RLlib、Serve 等上层库提供统一运行时基础

#### 🔬 深入细节

![Ray 核心示意图](https://ar5iv.labs.arxiv.org/html/1712.05889/assets/x1.png)
*图：图示概括 Ray 的任务图与系统组件：driver 提交 task/actor，调度器按依赖和资源放置任务，对象存储负责跨任务数据传递。*

```python
# Ray task/actor 编程模型伪代码
@ray.remote
def train_shard(data_ref, config):
    data = ray.get(data_ref)
    return fit_model(data, config)

@ray.remote
class ParameterActor:
    def __init__(self): self.state = init_state()
    def update(self, grad): self.state = opt(self.state, grad)

refs = [train_shard.remote(d, cfg) for d in shards]
metrics = ray.get(refs)
```

Ray 的背景是 AI 应用越来越不像单一批训练任务：强化学习需要环境模拟、采样、训练和评估动态交织；超参搜索会产生大量短任务；在线服务又需要长期有状态 actor。传统 Spark 风格批数据流和 MPI 风格同步程序都难以覆盖这些模式。

Ray 的抽象非常小：remote function 生成 task，remote class 生成 actor，调用返回 object reference。task 默认无状态、可重试；actor 保留内部状态，适合参数服务器、环境模拟器、模型服务副本等长期组件。

系统设计用分布式对象存储承载数据流，用 lineage 追踪对象由哪个任务生成。失败时可以根据 lineage 重放任务恢复对象，而不是强制每个应用自己写 checkpoint 逻辑。

与 TensorFlow/Horovod 这类训练框架相比，Ray 不是单个训练算法，而是分布式控制平面。它把动态任务调度作为一等能力，因此很适合支撑 AutoML、RL 和 LLM serving 中复杂的多阶段工作流。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Ray 同时支持短任务和长生命周期状态的两个核心抽象是什么？"
options:
  - "RDD 和 DataFrame"
  - "Task 和 Actor"
  - "Graph 和 Session"
  - "Parameter 和 Gradient"
answer: 1
explain: "Ray 用 task 表达无状态远程函数，用 actor 表达有状态远程对象。"
```
