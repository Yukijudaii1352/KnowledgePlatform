### DSA: DeepSeek稀疏注意力 (DeepSeek Sparse Attention)

```yaml
id: dsa
name: DSA
full_name: DeepSeek稀疏注意力 (DeepSeek Sparse Attention)
year: '2026'
org: DeepSeek
paper_url: https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro
category: attention
parent: nsa
motivation: 混合架构减90%KV缓存
```

#### 📝 一句话总结

DSA（DeepSeek Sparse Attention）在 DeepSeek-V4-Pro 中组合 Compressed Sparse Attention 与 Heavily Compressed Attention，面向百万 token 上下文显著降低单 token 推理 KV 需求。

#### 🎯 核心要点

- 官方资料描述为 CSA + HCA 的混合稀疏注意力架构
- CSA 保留可检索的压缩稀疏上下文信息
- HCA 对大范围历史使用更强压缩以降低 KV 占用
- 目标是在 1M-token 上下文下只需约 27% 单 token 推理 KV 资源
- 基于 Hugging Face 官方模型卡和 DeepSeek V4-Pro 技术资料整理

#### 🔬 深入细节

![DSA 核心示意图](https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro/resolve/main/assets/dsv4_performance.png)
*图：DeepSeek-V4-Pro 官方模型卡性能图；模型卡说明 DSA 使用 CSA 与 HCA 混合注意力。*

```python
# DSA high-level hybrid sparse attention
for layer in transformer.layers:
    local = attend(Q, recent_window(KV))
    csa = attend(Q, compressed_sparse_index.select(KV))
    hca = attend(Q, heavily_compressed_history(KV))
    out = combine(local, csa, hca)
```

##### 动机与背景

百万 token 上下文中，即使使用 MLA/GQA，完整 KV cache 和全量注意力访问仍会带来巨大单 token 推理开销。DeepSeek-V4-Pro 的目标是在超长上下文下维持智能表现，同时把历史访问压缩到可服务范围。

##### 核心机制

DSA 根据官方模型卡描述采用混合架构：Compressed Sparse Attention 负责对历史进行可选择的压缩稀疏访问，Heavily Compressed Attention 对更远或更大范围历史使用更强压缩表示。二者与局部上下文共同覆盖不同时间尺度。

##### 训练/推理流程

推理时最近窗口直接参与 attention；较远历史进入稀疏索引或压缩表示；更远的大范围历史由高度压缩通道提供全局信号。不同分支结果组合后进入后续层。

##### 与传统方法的区别

NSA 是公开论文中更完整的原生稀疏注意力方法；DSA 是 DeepSeek-V4-Pro 官方工程模型中的混合稀疏注意力落地。这里基于官方模型卡和任务元信息总结，避免编造未公开细节。

#### 🧪 练习题

```yaml
question: "DSA 官方资料强调的混合组成是什么？"
options:
  - "CSA 与 HCA"
  - "PPO 与 DPO"
  - "Adam 与 SGD"
  - "JPEG 与 PNG"
answer: 0
explain: "DeepSeek-V4-Pro 模型卡说明其混合注意力包含 Compressed Sparse Attention 和 Heavily Compressed Attention。"
```
