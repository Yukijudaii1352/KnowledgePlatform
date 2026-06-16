### SGLang v0.5: SGLang v0.5 (SGLang v0.5)

```yaml
id: sglang_v05
name: SGLang v0.5
full_name: SGLang v0.5 (SGLang v0.5)
year: '2026'
org: UC Berkeley
paper_url: https://github.com/sgl-project/sglang
category: engine
parent: sglang
motivation: 弹性专家并行+GPU Staging Buffer
```

#### 📝 一句话总结

SGLang v0.5 的重点从单机前缀复用扩展到大规模 MoE 与分离式推理：用 Elastic Expert Parallelism 在专家/DP rank 层提供故障与弹性能力，用 GPU Staging Buffer 在异构 TP 的 prefill-decode disaggregation 中把碎片化 KV 传输合并成高效 RDMA 传输。它解决的是 DeepSeek/Qwen-MoE 这类模型在多 GPU、多节点、PD 分离场景下的专家路由不均、局部故障和 KV 跨实例传输效率问题。

#### 🎯 核心要点

- Expert Parallelism：把 MoE experts 分布到多个 GPU rank，token 由 Top-K router 分派到对应 expert，再经 all-to-all dispatch/combine 汇总。
- 模块化 MoE 框架：`FusedMoE.forward -> Dispatcher.dispatch -> MoeRunner.forward -> Dispatcher.combine`，可插入 DeepEP、Mooncake、NIXL、FlashInfer、CUTLASS、DeepGEMM 等后端。
- Elastic EP：通过 DP rank 健康状态、expert-to-GPU 动态映射、冗余专家和 Mooncake EP，在部分 rank 失败时继续服务。
- EPLB 负载均衡：根据专家激活统计重新摆放或复制 experts，降低 GPU utilization 方差和 expert 热点。
- GPU Staging Buffer：在 prefill TP 与 decode TP/DP attention 不一致时，把 KV head slices 先 gather 到连续 GPU buffer，再批量 RDMA，最后 scatter 到 decode KV pages。
- v0.5 系列工程化：release 资料显示 v0.5.12 已把 DeepSeek V4、Expert Parallelism、Context Parallelism、Data Parallel Attention、PD Disaggregation、HiSparse、FlashMLA/DeepGEMM/MegaMoE 等纳入生产路径。

#### 🔬 深入细节

![SGLang Elastic EP 架构图](https://www.lmsys.org/images/blog/eep-partial-failure-tolerance/figure.png)
*图：LMSYS/SGLang 官方博客中的 Elastic EP 4-GPU 示例。scheduler 层过滤失效 DP rank，EP 层重新分配 expert-to-GPU mapping，使输出保持正确。来源：https://www.lmsys.org/blog/2026-03-25-eep-partial-failure-tolerance/*

```python
# SGLang v0.5 MoE + Elastic EP + GPU staging buffer（简化）
def serve_request(request):
    prefix_node = radix_cache.match(request.prompt)
    hidden = prefill_suffix(request.prompt, prefix_node)

    for layer in model.layers:
        if not layer.is_moe:
            hidden = layer.forward(hidden)
            continue

        active_ranks = elastic_ep_state.active_ranks()     # 1 = alive, 0 = inactive
        routes = topk_router(hidden, active_ranks)         # token -> experts
        dispatch_buf = dispatcher.dispatch(hidden, routes) # DeepEP/Mooncake/NIXL
        expert_out = moe_runner.grouped_gemm(dispatch_buf) # DeepGEMM/FlashInfer/etc.
        hidden = dispatcher.combine(expert_out, routes)

    if request.pd_disaggregation and request.prefill_tp != request.decode_tp:
        staged = staging_buffer.gather_kv_heads(hidden.kv_cache_pages)
        rdma_bulk_send(staged, decode_worker)
        decode_worker.scatter_to_kv_pages(staged)

    return decode_stream(hidden, radix_cache)
```

MoE 的基本计算可以写成：

$$
y_t=\sum_{e\in \operatorname{TopK}(x_t)} g_{t,e}\,E_e(x_t)
$$

其中 \(x_t\) 是 token hidden state，\(E_e\) 是第 \(e\) 个 expert，\(g_{t,e}\) 是 router 给该 expert 的权重。Expert Parallelism 的难点在于 \(E_e\) 分布在不同 GPU 上，token 需要先 dispatch 到持有对应 expert 的 rank，执行 grouped GEMM 后再 combine 回原顺序。SGLang 的 EP 文档把这条路径拆成 TopK、Dispatcher、MoeRunner、pre/post-permute、combine 等模块，使 all-to-all 后端和 MoE GEMM 后端可以独立替换。

Elastic EP 在这个 MoE 公式外面加了一层 **可变 expert-to-rank 映射**。令 \(a_r\in\{0,1\}\) 表示 rank \(r\) 是否可用，令 \(m(e)\) 表示 expert \(e\) 当前所在的物理 rank；故障后不再假设 \(m(e)\) 固定，而是重建到健康 rank 的映射：

$$
m'(e)\in\{r\mid a_r=1\},\quad \forall e\in\mathcal{E}_{\text{needed}}
$$

scheduler 层先把失效 DP rank 从新 batch 中屏蔽，EP 层再通过冗余专家和 Mooncake 的容错通信把丢失 expert 迁移或重映射。官方 Elastic EP 文章报告，在 4 节点 32 GPU DeepSeek V3.2 测试中，模拟 1 到 16 个 rank 失败时服务中断保持在约 6 秒量级，并避免传统整实例重启的分钟级停机。

EPLB 解决的是另一个 MoE 常见问题：router 的 Top-K 选择不是均匀分布，热门 experts 会让某些 GPU 忙到成为尾延迟来源。SGLang 集成 DeepSeek 的 Expert Parallelism Load Balancer，按 expert 激活统计计算重排/复制方案，目标是最小化 rank 间计算时间或利用率方差。直观上，如果第 \(r\) 个 rank 的估计负载是 \(L_r=\sum_{e:m(e)=r} c_e\)，EPLB 希望降低：

$$
\max_r L_r-\frac{1}{R}\sum_{r=1}^{R}L_r
$$

这比静态均分 experts 更适合真实线上流量，因为不同领域、不同提示模板会激活不同 expert 子集。

GPU Staging Buffer 针对的是 **PD disaggregation 的 KV 传输碎片化**。prefill worker 负责长 prompt 的 KV 生成，decode worker 负责后续逐 token 生成；当两侧 TP size 不同，例如 prefill TP=4 而 decode 侧使用 DP attention/有效 TP=1 时，KV cache 的 head layout 不一致。朴素实现会把许多小的 KV head slices 逐 token、逐 head 发送，RDMA 请求数高且难以打满带宽。staging buffer 的流程是：

$$
\text{many small slices}\xrightarrow{\text{gather}}\text{contiguous GPU buffer}\xrightarrow{\text{bulk RDMA}}\text{decode staging pool}\xrightarrow{\text{scatter}}\text{KV pages}
$$

官方 PD disaggregation 文档说明，这个机制在高并发异构 TP 传输下可带来约 2-5 倍吞吐提升，并在同构 TP 时自动 bypass。相关环境变量包括 `SGLANG_DISAGG_STAGING_BUFFER`、`SGLANG_DISAGG_STAGING_BUFFER_SIZE_MB` 和 `SGLANG_DISAGG_STAGING_POOL_SIZE_MB`；它主要面向 GQA/MHA 这类非 MLA 模型，DeepSeek-V2/V3 的 MLA 场景不应盲目开启。

与 SGLang 早期版本相比，v0.5 的重心更偏生产后端。原始 SGLang/RadixAttention 的优势在于结构化程序、共享前缀和 radix cache，使多轮对话、RAG 和 agentic workflow 能复用 KV；v0.5 系列则把这些缓存能力放到更复杂的 MoE、PD disaggregation 和多节点场景中。Elastic EP 让专家层在局部失败或弹性扩缩时还能维持数学正确性，GPU staging buffer 则让 prefill/decode 分离不被 KV 小包传输拖垮。二者共同体现了 SGLang v0.5 的方向：不是只追单 kernel 速度，而是把缓存、路由、通信、故障恢复和专家负载放进统一 serving runtime。

#### 🧪 练习题

```yaml
question: "SGLang v0.5 中 GPU Staging Buffer 主要优化什么问题？"
options:
  - "异构 TP 的 PD disaggregation 中 KV head slices 过于碎片化，导致大量小 RDMA 传输"
  - "MoE router 的训练损失不收敛"
  - "浏览器前端的静态资源加载"
  - "单机 tokenizer 的词表大小"
answer: 0
explain: "staging buffer 先把 prefill 侧 KV head slices gather 成连续 GPU buffer，再批量传输并在 decode 侧 scatter 到 KV pages，减少小包和 layout mismatch 带来的开销。"
```
