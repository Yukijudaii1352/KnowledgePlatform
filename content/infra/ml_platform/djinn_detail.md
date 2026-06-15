### Djinn

```yaml
id: djinn
name: Djinn
full_name: Djinn
year: "2026"
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: inference_system
parent: kserve
motivation: 语义感知的透明GPU解耦系统
```

#### 📝 一句话总结

Djinn 提出语义感知的透明 GPU 解耦系统，在尽量不改应用的情况下把 GPU 资源远程化，并利用深度学习语义优化数据迁移、调度和一致性。

#### 🎯 核心要点

- 目标是 transparent GPU disaggregation：应用看到近似本地 GPU，资源实际可来自远端池化 GPU
- semantic awareness 利用 tensor、kernel、stream、模型阶段等语义，而非只做字节级远程设备转发
- 通过拦截/虚拟化 CUDA 或框架调用，在运行时决定放置、迁移和预取
- 减少无语义 GPU 解耦中的多余数据传输和同步等待
- 适用于 GPU 资源池化、多租户和异构集群利用率提升场景

#### 🔬 深入细节

> 图示说明：USENIX OSDI 页面暂未提供论文图直链；核心架构可理解为应用与 CUDA/框架之间插入 Djinn runtime，runtime 将语义化操作映射到本地或远程 GPU，并管理 tensor 数据位置。

```python
# Djinn 语义感知 GPU 解耦伪代码
intercept(cuda_call_or_framework_op)
sem = infer_semantics(op_type, tensor_lifetime, stream, model_phase)
placement = scheduler.choose_gpu(sem, locality, load, bandwidth)
if tensor_not_on(placement):
    prefetch_or_migrate(tensor, placement, priority=sem.criticality)
execute_remote_or_local(op, placement)
update_tensor_location_and_lifetime(sem)
```

GPU 解耦希望把昂贵 GPU 做成远程资源池，提高利用率和弹性。但朴素远程 CUDA 转发只看到 API 调用和内存拷贝，很难判断哪些数据即将复用、哪些同步在关键路径上。

Djinn 的“语义感知”意味着 runtime 识别更高层含义：某个 tensor 是权重、激活还是临时 buffer，某段计算是前向还是反向，某个 stream 是否在延迟关键路径。

这些语义可指导放置和迁移。例如长期权重适合贴近执行 GPU，短生命周期临时 buffer 不应频繁远程复制；即将使用的激活可以预取，非关键路径迁移可延后。

与 OpenTela 的集群级编排不同，Djinn 更靠近设备虚拟化/运行时层。它解决的是“应用如何透明使用远端 GPU 且不过度损失性能”的问题。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "Djinn 中 semantic awareness 的目的是什么？"
options:
  - "利用 tensor/kernel/执行阶段语义优化远程 GPU 放置和数据迁移"
  - "把所有数据随机发送"
  - "只记录日志"
  - "删除 CUDA API"
answer: 0
explain: "语义信息能避免字节级转发造成的不必要迁移和同步。"
```
