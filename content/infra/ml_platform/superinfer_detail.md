### SuperInfer

```yaml
id: superinfer
name: SuperInfer
full_name: SuperInfer
year: "2026"
org: MLSys Community
paper_url: https://mlsys.org/Conferences/2026/Schedule?type=Poster
category: inference_system
parent: vllm
motivation: 针对超级芯片的SLO感知调度系统
```

#### 📝 一句话总结

SuperInfer 面向 NVIDIA GH200 等 Superchip 的 GPU-CPU 高带宽互联架构，提出 SLO 感知 rotary scheduling 与 DuplexKV，让 LLM 推理在严格延迟目标下更好利用 CPU 内存和 NVLink-C2C 带宽。

#### 🎯 核心要点

- 针对 Superchip GPU 与 CPU 通过 NVLink-C2C 紧耦合、CPU 内存可作为扩展 KV cache 层的硬件特点
- RotaSched 主动按 SLO 旋转请求，避免某些请求长期占用 GPU KV 资源导致尾延迟超标
- DuplexKV 优化 KV cache 在 GPU/CPU 间的全双工传输，减少 offload/prefetch 阻塞
- 调度同时考虑请求剩余 token、KV 位置、传输带宽和 latency SLO
- 目标是在满足响应性约束的同时提升单位 GPU 可服务请求数

#### 🔬 深入细节

> 图示说明：arXiv 摘要页说明的系统图可概括为：GPU HBM 和 CPU memory 通过 NVLink-C2C 组成两级 KV cache，RotaSched 决定请求驻留/轮换，DuplexKV 执行异步双向迁移。

```python
# SuperInfer RotaSched + DuplexKV 伪代码
for tick in decode_iterations:
    candidates = estimate_slo_slack(active_requests)
    gpu_set, cpu_set = rotate_requests(candidates, hbm_budget, slo_deadlines)
    DuplexKV.prefetch(cpu_set.to_gpu, direction='CPU->GPU')
    DuplexKV.offload(gpu_set.to_cpu, direction='GPU->CPU')
    batch = form_decode_batch(gpu_resident_requests)
    run_decode_step(batch)
    update_slack_and_kv_locations(batch)
```

GH200 这类 Superchip 让 GPU 和 CPU 之间有比传统 PCIe 更高带宽、更低延迟的互联，理论上可以把 CPU 内存作为 KV cache 扩展层。但如果调度不当，KV 迁移会直接伤害 token latency。

SuperInfer 的 RotaSched 是 proactive 和 SLO-aware：它不等 HBM 爆满才被动换出，而是根据请求 deadline/slack 主动轮换，让即将违约的请求保持或回到 GPU。

DuplexKV 关注数据搬运本身。KV cache 有 prefetch 和 offload 两个方向，若能利用全双工链路并与 decode 计算重叠，就能降低 CPU/GPU 分层内存的可见开销。

与 vLLM 的 PagedAttention 相比，SuperInfer 的重点从“GPU 内如何分页管理 KV”扩展到“Superchip 上 GPU HBM 与 CPU 内存如何协同”。两者都把 KV cache 视为 serving 系统的核心资源。

> 💡 关键：这类 ML 平台论文的贡献通常不在单个数学公式，而在把计算、状态、通信、调度和故障边界重新组织成可扩展的系统抽象。

#### 🧪 练习题

```yaml
question: "SuperInfer 的 DuplexKV 主要优化什么？"
options:
  - "GPU 与 CPU 间 KV cache 的双向传输"
  - "训练集去重"
  - "模型量化格式"
  - "HTTP 负载均衡"
answer: 0
explain: "DuplexKV 利用 Superchip 互联优化 KV offload/prefetch。"
```
