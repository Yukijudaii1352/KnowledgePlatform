### Parameter Server

```yaml
id: ps
name: Parameter Server
full_name: 参数服务器 (Parameter Server)
year: "2014"
org: CMU/Baidu
paper_url: https://proceedings.neurips.cc/paper/2014/hash/d5cfead94f5350c12c322b5b664544c1-Abstract.html
category: training_platform
parent: —
motivation: 提出异步分布式参数更新框架，奠定分布式ML基础
```

#### 📝 一句话总结

Parameter Server 提出以“服务器维护共享参数、worker 负责数据分片计算”的分布式训练框架，解决传统单机或同步 MPI 风格在大规模稀疏模型上通信开销高、容错弱的问题。它把一致性模型、参数分片和异步更新组合起来，成为后续分布式机器学习系统的基础抽象。

#### 🎯 核心要点

- 参数按 key 或区间切分到 server group，worker 只拉取和推送自己需要的参数分片
- 支持同步、异步和 bounded staleness 等一致性策略，在收敛稳定性和吞吐之间折中
- 用稀疏 push/pull、范围压缩和向量时钟降低特征稀疏场景的网络流量
- server 侧可做参数副本、checkpoint 和故障恢复，避免单点状态丢失
- 把训练逻辑与参数存储解耦，适配 LR、LDA、矩阵分解、DNN 等多类模型

#### 🔬 深入细节

> 图示说明：原论文/任务链接未提供稳定可直链的架构图；核心框架可概括为多组 worker 从数据分片计算梯度，通过 push/pull 与分片 parameter servers 交换参数，server 维护全局模型状态和一致性版本。

```python
# Parameter Server 训练循环伪代码
for worker in workers:
    keys = features(minibatch)
    params = ps.pull(keys, min_version=t - staleness)
    grad = compute_gradient(minibatch, params)
    ps.push(keys, grad, clock=t)

for server in parameter_servers:
    for key, grad in incoming_updates:
        state[key] = optimizer_update(state[key], grad)
    checkpoint_if_needed(state, vector_clock)
```

动机来自两个现实约束：大规模模型参数常常超过单机内存，训练数据又天然分布在多台机器上。传统数据并行每轮 all-reduce 要同步完整梯度，对稀疏特征模型尤其浪费；而 MapReduce 式批处理缺少细粒度迭代状态，难以支撑高频参数更新。

Parameter Server 将全局参数视为分布式 key-value store。worker 根据本地 mini-batch 涉及的特征 key 拉取参数，计算梯度后只推送相关 key 的更新；server 对 key 空间分片，并在本地执行 SGD、AdaGrad 或模型特定的更新规则。

一致性模型是系统的关键旋钮。完全同步能保证每轮看到同一版本参数但容易被慢 worker 拖住；完全异步吞吐最高但梯度可能过旧；bounded staleness 用 \(s\) 限制版本差，通常写成 worker 读取满足 \(clock_{server} \ge clock_{worker}-s\) 的参数。

与早期 MPI 训练相比，Parameter Server 的创新不是新的优化公式，而是把模型状态、通信模式和容错边界系统化。它为 TensorFlow、MXNet、Angel、PS-Lite 等后续系统提供了分片参数存储与 worker/server 协同的基本范式。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Parameter Server 最核心的系统抽象是什么？"
options:
  - "把所有 GPU 绑定为一个共享显存池"
  - "把模型参数作为分布式 key-value 状态，由 worker 通过 push/pull 更新"
  - "只使用同步 SGD 训练小模型"
  - "用编译器自动生成 CUDA kernel"
answer: 1
explain: "Parameter Server 的核心是分布式参数状态和稀疏 push/pull 接口，一致性策略可同步也可异步。"
```
