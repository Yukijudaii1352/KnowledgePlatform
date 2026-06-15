### vLLM: vLLM引擎 (vLLM)

```yaml
id: vllm
name: vLLM
full_name: vLLM引擎 (vLLM)
year: '2023'
org: UC Berkeley
paper_url: https://arxiv.org/abs/2309.06180
category: engine
parent: pagedattn
motivation: 集成PagedAttention的高吞吐引擎
```

#### 📝 一句话总结

vLLM 将 PagedAttention 集成到高吞吐 LLM serving 引擎中，通过分页 KV cache、continuous batching 和 OpenAI 兼容服务接口显著提高显存利用率和吞吐。

#### 🎯 核心要点

- 核心内存机制是 PagedAttention 的 KV block 管理
- 调度器持续把不同请求的 decode iteration 组成 batch
- 支持 prefix sharing、beam/parallel sampling 和 copy-on-write
- 提供 OpenAI API 兼容 server 与 Python 推理接口
- 成为开源 LLM serving 的主流基础引擎之一

#### 🔬 深入细节

![vLLM 核心示意图](https://ar5iv.labs.arxiv.org/html/2309.06180/assets/x2.png)
*图：vLLM 论文中的 PagedAttention block 管理图，解释 vLLM 高吞吐的内存基础。*

```python
engine = VLLMEngine(model, paged_kv_allocator)
while True:
    new_reqs = receive_requests()
    scheduler.add(new_reqs)
    batch = scheduler.build_continuous_batch(kv_budget)
    outputs = model.forward(batch, paged_kv_cache)
    scheduler.update(outputs)
```

##### 动机与背景

LLM serving 的瓶颈不仅是算力，还包括 KV cache 显存碎片、不同请求长度造成的调度浪费，以及多候选采样中的前缀复制。简单 batching 不能充分利用 GPU。

##### 核心机制

vLLM 用 PagedAttention 让 KV cache 以块为单位按需分配；调度器按 iteration 进行 continuous batching；共享前缀通过 copy-on-write 避免重复 KV。系统接口封装为易用服务。

##### 训练/推理流程

请求到达后先 prefill，写入 paged KV；decode 阶段调度器每轮选择一批可运行请求，模型读取 block table 执行 attention，输出 token 后更新请求状态和 KV blocks。

##### 与传统方法的区别

PagedAttention 是核心算法，vLLM 是完整系统。它把内存管理、调度、模型执行和 API 服务结合起来，使算法收益变成实际吞吐提升。

#### 🧪 练习题

```yaml
question: "vLLM 的核心 KV cache 技术是什么？"
options:
  - "PagedAttention"
  - "PPO"
  - "反向传播检查点"
  - "词表排序"
answer: 0
explain: "vLLM 依靠 PagedAttention 的块式 KV 管理显著减少显存浪费。"
```
