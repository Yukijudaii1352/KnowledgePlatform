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

SGLang v0.5 延续 SGLang 的结构化 serving 路线，面向大规模 MoE 和多节点推理加强弹性专家并行、GPU staging buffer、前缀缓存和后端运行时能力。

#### 🎯 核心要点

- 保留 RadixAttention/prefix cache 作为核心复用机制
- 面向 MoE 推理增强 expert parallelism 和负载调度
- GPU staging buffer 用于缓冲跨阶段或跨设备数据搬运
- 改进多节点、多 GPU serving 的稳定性和吞吐
- 基于官方 SGLang 仓库与任务元信息整理，避免假定未公开论文细节

#### 🔬 深入细节

![SGLang v0.5 核心示意图](https://raw.githubusercontent.com/sgl-project/sglang/main/assets/logo.png)
*图：SGLang 官方仓库 logo；v0.5 细节主要来自官方仓库/发布资料，核心机制用下方数据流说明。*

```python
# SGLang v0.5-style MoE serving sketch
prefix = radix_cache.match(request)
hidden = prefill_suffix(request, prefix)
for layer in moe_layers:
    routes = router(hidden)
    staged = gpu_staging_buffer.exchange(hidden, routes)
    hidden = elastic_expert_parallel_forward(staged)
stream_decode(hidden, radix_cache)
```

##### 动机与背景

MoE LLM 推理除了常规 KV cache 和 batching，还要处理专家路由不均、跨 GPU 专家通信和突发负载。结构化应用又会频繁复用前缀和产生分支请求。

##### 核心机制

SGLang v0.5 的方向是把前缀复用与大规模后端执行继续融合：RadixAttention 降低重复 prefill；弹性专家并行根据专家负载调度；GPU staging buffer 缓冲和组织跨设备数据，减少通信抖动。

##### 训练/推理流程

请求先匹配 radix cache 复用前缀；后续 token 经过 dense/MoE 层时按路由发送到专家并通过 staging buffer 管理中间张量；decode 输出再更新缓存。

##### 与传统方法的区别

SGLang 论文版强调语言前端和 RadixAttention，v0.5 更偏生产运行时演进，尤其是 MoE 和多 GPU 场景。这里按官方仓库与任务元信息总结，不把版本特性误写成单篇论文结论。

#### 🧪 练习题

```yaml
question: "SGLang v0.5 任务元信息强调的新增方向是什么？"
options:
  - "弹性专家并行和 GPU Staging Buffer"
  - "删除前缀缓存"
  - "只支持单 token 输入"
  - "训练图像分类器"
answer: 0
explain: "该条目重点是 MoE/多 GPU serving 中的弹性专家并行和 staging buffer。"
```
