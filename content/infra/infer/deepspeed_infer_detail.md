### DeepSpeed-Inference: DeepSpeed推理 (DeepSpeed-Inference)

```yaml
id: deepspeed_infer
name: DeepSpeed-Inference
full_name: DeepSpeed推理 (DeepSpeed-Inference)
year: '2022'
org: Microsoft
paper_url: https://arxiv.org/abs/2207.00032
category: engine
parent: —
motivation: 异构存储卸载支持万亿参数模型推理
```

#### 📝 一句话总结

DeepSpeed-Inference 将张量/流水并行、异构内存卸载和 kernel injection 结合起来，使千亿到万亿参数 Transformer 可以在有限 GPU 集群上高效推理。

#### 🎯 核心要点

- 支持 GPU/CPU/NVMe 异构存储和 ZeRO-Inference 式权重流式加载
- 通过 tensor parallelism 和 pipeline parallelism 切分超大模型
- kernel injection 替换 Transformer 层为优化内核
- 针对小 batch 低延迟和大 batch 高吞吐分别优化
- 面向 GPT-3/MT-NLG 等超大模型推理部署

#### 🔬 深入细节

![DeepSpeed-Inference 核心示意图](https://ar5iv.labs.arxiv.org/html/2207.00032/assets/x1.png)
*图：DeepSpeed-Inference 论文中的系统架构图，展示并行、卸载和优化 kernel 组合。*

```python
# DeepSpeed-Inference execution sketch
model = load_partitioned_checkpoint(tp_size, pp_size)
for layer in pipeline_layers:
    if layer.weights_on_cpu:
        prefetch_to_gpu(layer.weights)
    hidden = injected_transformer_kernel(layer, hidden)
    if memory_pressure:
        offload_unused_weights(layer)
```

##### 动机与背景

超大语言模型参数量可超过单机 GPU 显存。即使能放下权重，推理还需要 KV cache 和激活空间。传统训练框架的 kernel 和并行策略也不一定适合低延迟生成。

##### 核心机制

DeepSpeed-Inference 一方面用模型并行把权重切到多 GPU，另一方面用异构内存卸载把不活跃权重放到 CPU/NVMe。kernel injection 将 HuggingFace 等模型中的 Transformer 模块替换成融合优化实现，减少框架开销。

##### 训练/推理流程

部署时加载分片 checkpoint，建立张量/流水并行通信组。请求到达后按并行拓扑执行每层；权重可按需预取到 GPU，KV cache 留在高带宽设备上；生成阶段持续复用 cache。

##### 与传统方法的区别

Orca/vLLM 更关注请求调度和 KV 管理，DeepSpeed-Inference 更关注超大模型权重如何跨设备放置与执行。它适合参数规模是主要瓶颈的场景。

#### 🧪 练习题

```yaml
question: "DeepSpeed-Inference 支持万亿参数推理的重要手段是什么？"
options:
  - "异构内存卸载和模型并行"
  - "删除所有注意力层"
  - "只运行 tokenizer"
  - "固定输出长度为 1"
answer: 0
explain: "它通过 GPU/CPU/NVMe 卸载与张量/流水并行让超大权重可被执行。"
```
