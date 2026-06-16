### Mixtral：开放稀疏专家模型
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
Mixtral 8x7B 将 Mistral 7B 的前馈子层替换为 Top-2 稀疏 MoE 层，使每个 token 只激活 2 个专家，在接近 13B 活跃参数成本下访问约 47B 总参数。它验证了开放权重 LLM 中稀疏专家架构的实用性，并在数学、代码、多语言和长上下文任务上达到或超过更大密集模型。

#### 🎯 核心要点
- 稀疏 MoE 架构：每层包含 8 个 FFN 专家，每个 token 由 router 选择 2 个专家处理。
- 参数效率：总参数约 47B，每 token 推理只用约 13B 活跃参数，显著低于 Llama 2 70B 的活跃计算量。
- Mistral 系列基础：保持 Mistral 7B 的 decoder-only Transformer 设计，但将所有 FFN 子块替换为 MoE 层，并支持 32K dense context。
- Top-K gating：router 对 \(xW_g\) 取 Top-2，再 softmax 得到两个专家权重，输出为专家输出的加权和。
- 指令模型：Mixtral 8x7B Instruct 通过 SFT 后接 DPO 对齐，在 MT-Bench 和 LMSys 人类评测中超过多个同时期闭源/开源聊天模型。

#### 🔬 深入细节
![Mixtral MoE 层示意图](https://ar5iv.labs.arxiv.org/html/2401.04088/assets/images/smoe.png)
*图：论文 Figure 1。每个输入向量由 router 分配给 8 个专家中的 2 个，最终输出是这两个专家输出的加权和。*

Mixtral 的动机是扩大模型容量而不线性增加每个 token 的计算量。密集 Transformer 中，FFN 子层对所有 token 使用同一组大矩阵；如果直接扩大 FFN，训练和推理成本都会随参数量增长。MoE 的做法是准备多个 FFN 专家，但对每个 token 只激活少数专家，因此总参数量代表“可用知识容量”，活跃参数量才更接近单 token 推理成本。

对输入 token 表示 \(x\)，MoE 层定义 \(n\) 个专家 \(\{E_0,E_1,\dots,E_{n-1}\}\)。router 先计算专家 logits：

$$
\ell=xW_g
$$

再只保留最大的 \(K\) 个 logits：

$$
(\operatorname{TopK}(\ell))_i=\begin{cases}
\ell_i, & \ell_i \text{ 是 Top-K 坐标之一}\\
-\infty, & \text{否则}
\end{cases}
$$

门控权重为：

$$
G(x)=\operatorname{Softmax}(\operatorname{TopK}(xW_g))
$$

Mixtral 固定 \(n=8\)、\(K=2\)，并把每个专家实现为 SwiGLU FFN。因此每个 token 的 MoE 输出是：

$$
y=\sum_{i=0}^{n-1}\operatorname{Softmax}(\operatorname{Top2}(xW_g))_i\cdot \operatorname{SwiGLU}_i(x)
$$

```python
# Mixtral Top-2 MoE 前馈层伪代码
# x: 一个 token 在某层的 hidden state

def mixtral_moe_ffn(x):
    logits = x @ W_g                         # [num_experts=8]
    expert_ids = topk(logits, k=2)           # 每个 token 只选两个专家
    masked_logits = fill(-inf, shape=[8])
    masked_logits[expert_ids] = logits[expert_ids]
    weights = softmax(masked_logits)

    y = 0
    for i in expert_ids:
        y += weights[i] * swiglu_expert[i](x)
    return y


def transformer_block_with_moe(x):
    x = x + self_attention(rmsnorm(x))       # Mistral 风格注意力块
    x = x + mixtral_moe_ffn(rmsnorm(x))      # 替换原 FFN 子层
    return x
```

这个公式说明了 Mixtral 的“稀疏性”来自 gating，而不是专家本身变小。所有专家都是标准前馈网络，参数总量随专家数增加；但在实际前向中，只有 Top-2 专家参与矩阵乘法。论文特别区分 sparse parameter count 和 active parameter count：前者决定服务时需要加载的权重规模，后者更接近单 token 的计算成本。Mixtral 的优势在于让 token 接触到 47B 级别的参数容量，但每步只计算约 13B 活跃参数。

工程上，MoE 的主要风险是路由造成负载不均。论文讨论了 Expert Parallelism：发往同一专家的 token 会被聚合到相应设备上执行，再把结果送回原 token 位置；同时也指出如果某些专家过热，会造成设备负载不均或通信瓶颈。Mixtral 借助高性能 MoE kernel 思路，例如将专家 FFN 操作转化为大稀疏矩阵乘法，来减轻不同专家 token 数不同带来的执行问题。

与 GShard 类 MoE 相比，Mixtral 的实现更直接：它把 Transformer 中所有 FFN 子块都替换为 MoE，而不是隔层替换；router 使用简单有效的 Top-2 softmax，而不是更复杂的第二专家策略。论文的 routing analysis 还发现专家分配并没有明显按“数学、生物、哲学”等语义领域分工，反而更像和语法/局部模式有关，例如代码缩进、特定词形或连续 token 常被路由到相同专家。这提示 MoE 专家并不一定是人类可解释的领域专家，而是训练动态下形成的稀疏计算子空间。

训练与对齐流程上，基础 Mixtral 使用多语言数据预训练，支持 32K 上下文，并在 passkey retrieval 中展示长上下文检索能力。Instruct 版本先进行监督微调，再对偏好对进行 DPO，对齐后在 MT-Bench 达到 8.30，并在论文报告的 LMSys 截图中超过 GPT-3.5 Turbo、Claude-2.1、Gemini Pro 与 Llama 2 70B Chat。也就是说，Mixtral 的贡献不只是架构稀疏化，还包括把 MoE 开放权重模型完整落地到可用聊天模型。

> ⚠️ 注意：Mixtral 的推理计算少，不代表部署显存也按 13B 计算；服务端仍需容纳或调度约 47B sparse 参数，并处理 MoE 路由通信。

#### 🧪 练习题
```yaml
question: "Mixtral 中 Top-2 router 的核心作用是什么？"
options:
  - "为每个 token 选择两个 FFN 专家并对其输出加权求和"
  - "把注意力头减少到两个以降低 KV cache"
  - "只在最后一层使用专家以减少训练不稳定"
  - "把所有专家平均集成成一个密集 FFN"
answer: 0
explain: "Mixtral 的 MoE 层对 router logits 取 Top-2 后 softmax，仅计算两个被选专家，并用门控权重合成输出。"
```
