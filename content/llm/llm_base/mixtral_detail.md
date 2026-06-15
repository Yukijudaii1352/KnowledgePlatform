### Mixtral 8x7B：开放稀疏专家模型

```yaml
id: mixtral
name: Mixtral
full_name: 开放稀疏专家模型 (Mixtral of Experts)
year: "2024.01"
org: Mistral AI
paper_url: https://arxiv.org/abs/2401.04088
category: sparse_moe
parent: mistral7b
motivation: Top2专家开放MoE落地
```

#### 📝 一句话总结
Mixtral 8x7B 提出了基于 Top-2 稀疏路由的开放 MoE 语言模型，将 Mistral 7B 的 FFN 层替换为 8 个 SwiGLU 专家并通过可学习路由器为每个 token 动态选择 2 个专家，以 13B 活跃参数（总 47B）超越了 Llama 2 70B 和 GPT-3.5，验证了稀疏 MoE 在开源大模型中的工程可行性。

#### 🎯 核心要点
- **Sparse Mixture of Experts (SMoE) 架构**：每层 Transformer 的 FFN 替换为 8 个独立 SwiGLU 专家网络，每个 token 仅激活其中 2 个
- **Top-2 路由器**：通过线性层 W_g 映射后取 Top-2 logits，经 Softmax 加权组合两专家输出
- **与 Mistral 7B 同架构**：dim=4096, 32 层, 32 注意力头, 8 KV 头（GQA）, 32k 上下文, 32000 词表
- **参数效率**：总稀疏参数 47B，每 token 活跃参数仅 13B（约 Llama 2 70B 的 1/5），推理计算量与 13B 稠密模型相当
- **性能全面超越 Llama 2 70B**：MMLU 70.6% vs 69.9%, GSM8K 74.4% vs 53.6%, HumanEval 40.2% vs 29.3%, MBPP 60.7% vs 49.8%
- **多语言显著优势**：法语/德语/西班牙语/意大利语在各基准上大幅领先 Llama 2 70B
- **全序列长度完美检索**：Passkey 检索任务在 32k 长度内任意位置均达 100% 准确率
- **指令微调版 (Mixtral-Instruct)**：SFT + DPO 训练，MT-Bench 得分 8.30，LMSys Arena ELO 1121 超过 GPT-3.5-Turbo 和 Claude-2.1
- **路由语法偏向而非领域偏向**：专家选择与 token 的语法角色（如缩进、关键词）高度相关，连续 token 常分配同一专家，高层层级中 >50% 连续 token 共享专家

#### 🔬 深入细节

##### 架构总览

Mixtral 以 Mistral 7B 的稠密 Transformer 为基础，唯一改动是将每个 Transformer 层中的前馈网络 (FFN) 替换为 MoE 层。其他组件——RMSNorm、分组查询注意力 (GQA, n_kv_heads=8)、RoPE 位置编码、SwiGLU 激活——全部继承自 Mistral 7B。关键架构参数如下：

| 参数 | 值 |
|---|---|
| dim (隐藏维度) | 4096 |
| n_layers (层数) | 32 |
| head_dim | 128 |
| n_heads (注意力头) | 32 |
| n_kv_heads (KV 头) | 8 |
| hidden_dim (FFN 维度) | 14336 |
| context_len (上下文长度) | 32768 |
| vocab_size (词表大小) | 32000 |
| num_experts (专家数) | 8 |
| top_k_experts (每 token 激活专家数) | 2 |

##### 稀疏 MoE 核心机制

**1. 路由器 (Router/Gating Network)**

路由器是一个简单的线性层 W_g ∈ R^{d_model × n_experts}，对输入 token 表示 x 计算 logits l = x · W_g，然后执行 Top-K 稀疏化：G(x) := Softmax(TopK(x · W_g))。其中 TopK(l)_i = l_i 若 l_i 属于前 K 大 logits，否则为 -∞（经 Softmax 后权重为 0）。Mixtral 固定 K=2。

**2. 专家网络**

每个专家 E_i(x) 是一个标准 SwiGLU FFN 块：SwiGLU_i(x) = (xW_{i,1} ⊙ SiLU(xW_{i,2}))W_{i,3}。8 个专家的权重矩阵各自独立，因此稀疏参数总量约为 8× 单个 FFN 的参数。

**3. 输出合成**

MoE 层最终输出为两被选中专家输出的加权和：y = Σ Softmax(Top2(x · W_g))_i · SwiGLU_i(x)。其中仅 Top-2 专家的 logits 保留，其余经 Softmax 后为零——实际只需计算两个专家的前向传播。

```python
# Mixtral MoE 层前向传播伪代码
def moe_layer_forward(x, experts, gate_weight):
    # x: (batch, seq_len, dim)
    # 1. 路由
    logits = x @ gate_weight             # (batch, seq_len, 8)
    top2_logits, top2_indices = topk(logits, k=2, dim=-1)
    gate_weights = softmax(top2_logits, dim=-1)  # (batch, seq_len, 2)

    # 2. 专家计算（每个 token 只算 2 个专家）
    output = zeros_like(x)
    for k in range(2):
        expert_idx = top2_indices[..., k]  # 第一个或第二个专家
        expert_out = experts[expert_idx](x)  # SwiGLU FFN
        output += gate_weights[..., k:k+1] * expert_out

    return output
```

> 💡 关键：稀疏 MoE 的核心洞察在于参数规模与计算成本的解耦。通过增加专家数量 n 而固定 K，可以线性增长总参数（稀疏参数）而保持每 token 计算量（活跃参数）不变。Mixtral 的 n=8、K=2 在参数规模（47B）和推理成本（13B 等效）之间取得了精妙的平衡。

##### 与 GShard 的关键区别

1. **全层替换**：GShard 仅将每隔一层的 FFN 替换为 MoE，而 Mixtral 将所有 32 层的 FFN 全部替换为 MoE 层，赋予模型更大的稀疏参数容量。
2. **简化路由策略**：GShard 对第二个专家使用更复杂的门控策略（需要 token-to-expert 负载约束），而 Mixtral 仅使用简单的 Top-2 Softmax 路由，无需额外的辅助负载均衡损失函数。

> ⚠️ 注意：论文未明确使用辅助负载均衡损失，但路由分析显示专家分配存在较高的位置局部性——高层层级中 >50% 连续 token 被分配给同一专家。这可能导致 Expert Parallelism 场景下的负载不均，但在单 GPU Megablocks 稀疏矩阵乘法实现中不受影响。

##### 训练细节

- **预训练数据**：多语言语料，相比 Mistral 7B 大幅提升了多语言数据比例
- **上下文长度**：32k token，在 Passkey 检索任务上 100% 准确
- **总稀疏参数**：47B（8 个 FFN × 32 层 + 注意力参数）
- **活跃参数**：13B（2 个 FFN × 32 层 + 注意力参数）
- **指令微调**：先 SFT 在指令数据上微调，再通过 DPO (Direct Preference Optimization) 在偏好数据上对齐
- **推理优化**：集成 Megablocks CUDA 内核，贡献给 vLLM 项目以支持开源部署

##### 路由分析：语法偏向而非领域偏向

论文通过 The Pile 验证集的不同子集分析了路由器行为，核心发现：

- **无明显的领域专家**：不同领域的专家分配分布高度相似，未观察到某个专家专精于特定领域
- **语法结构导向**：Python 代码中的 self、英文中的 Question 等关键词、以及缩进 token 被持续分配给同一专家
- **位置局部性**：连续 token 常被分配给相同的专家。在第 15 层，ArXiv 数据上有 27.9% 的连续 token 共享首选专家，远高于随机均匀分配的 12.5%
- **DM Mathematics 的轻微例外**：合成数据集在首层和末层显示出略为不同的专家分布模式

##### 性能全景

| 模型 | 活跃参数 | MMLU | GSM8K | HumanEval | MBPP | HellaSwag |
|---|---|---|---|---|---|---|
| Llama 2 7B | 7B | 44.4% | 16.0% | 11.6% | 26.1% | 77.1% |
| Llama 2 13B | 13B | 55.6% | 34.3% | 18.9% | 35.4% | 80.7% |
| Llama 2 70B | 70B | 69.9% | 53.6% | 29.3% | 49.8% | 85.4% |
| Mistral 7B | 7B | 62.5% | 50.0% | 26.2% | 50.2% | 81.0% |
| **Mixtral 8x7B** | **13B** | **70.6%** | **74.4%** | **40.2%** | **60.7%** | **84.4%** |

> 💡 关键：Mixtral 以 13B 活跃参数（约 Llama 2 70B 的 1/5）在所有指标上全面超越或匹配 Llama 2 70B，并在数学和代码上实现了大幅度领先。

#### 🧪 练习题

```yaml
question: "Mixtral 8x7B 中每个 token 在每层激活几个专家？路由权重如何确定？"
options:
  - "激活全部 8 个专家，权重由 Sigmoid 函数计算"
  - "激活 2 个专家，权重由 Top-2 logits 经 Softmax 后确定"
  - "激活 2 个专家，权重固定为 0.5 + 0.5 等权平均"
  - "激活专家数量动态可变，权重由学习到的注意力机制分配"
answer: 1
explain: "Mixtral 固定激活 Top-2 专家（K=2），路由器通过线性层计算 8 个 logits，取 Top-2 后做 Softmax 归一化得到两个专家的权重，其余专家权重为 0。"
```
