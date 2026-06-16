### Djinn

```yaml
id: djinn
name: Djinn
full_name: Djinn
year: '2026'
org: OSDI Community
paper_url: https://www.usenix.org/conference/osdi26/technical-sessions
category: inference_system
parent: kserve
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
