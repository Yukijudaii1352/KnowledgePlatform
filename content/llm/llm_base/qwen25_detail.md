### Qwen2.5

#### 📝 一句话总结

Qwen2.5 系列是通义千问团队在 Qwen2 基础上的全面升级，将预训练数据规模从 7T 扩展到 18T tokens，并引入两阶段强化学习对齐方案（DPO + GRPO），在数学、编程和指令遵循能力上取得显著提升，Qwen2.5-72B 在多项基准上超越 Llama-3.1-405B。

#### 🎯 核心要点

- 预训练数据从 Qwen2 的 7T tokens 扩展到 **18T tokens**，知识截止至近期，覆盖更广泛的高质量网页、代码和数学数据
- 模型规模覆盖 **0.5B / 1.5B / 3B / 7B / 14B / 32B / 72B** 全系列，均采用开放权重
- 架构延续 Transformer decoder-only：**RoPE 旋转位置编码、SwiGLU 激活、RMSNorm 归一化**；7B+ 模型采用 **GQA (Grouped Query Attention)**
- 提出 **缩放法则 (Scaling Laws)** 指导训练：最优 Batch Size 随模型规模线性增长，数据量与模型规模的最优配比
- **长文本训练**：将 32K 上下文窗口扩展至最高 128K tokens，使用 ABF (Adjusted Base Frequency) 调整 RoPE 基频
- **SFT 阶段**：利用 Qwen2.5-Plus 生成反向翻译数据补充低资源语言指令；对数学/编程采用**拒绝采样**和**执行反馈**筛选高质量 CoT 样本
- 两阶段 RL 对齐：(1) **DPO** 利用离线偏好数据直接优化策略；(2) **GRPO** 在线探索，无需独立 Reward Model，直接从群体采样中计算相对优势
- Qwen2.5-72B 在 MMLU-redux、MATH、MBPP、MultiPL-E、LiveCodeBench、Arena-Hard、MT-Bench 上超越 Llama-3.1-405B-Instruct

#### 🔬 深入细节

##### 1. 预训练与缩放法则

Qwen2.5 的预训练数据相比 Qwen2 提升超过 2.5 倍，从 7T 扩展到 **18T high-quality tokens**。数据分布经过精心调配：

> 💡 **关键数据策略**：
> - 强化了**数学和代码**数据的占比，这是 Qwen2.5 数学推理能力大幅跃升的基础
> - 增加了**多语言数据**（尤其是中文、日语、韩语、阿拉伯语等），提升跨语言迁移能力
> - 对网页数据进行更严格的**质量过滤**，使用 Qwen2 系列协助数据清洗

**缩放法则 (Scaling Laws)** 是 Qwen2.5 训练的核心指导原则。团队通过在小模型上外推，确定了如下关系：

$$ \text{Optimal Batch Size}(N) = a \times N^b $$

其中 \(N\) 为模型参数量，\(b \approx 0.5\)。这意味着模型每增大 4 倍，最优 batch size 约增大 2 倍。实验还验证了 **Chinchilla 型缩放法则**：给定计算预算，模型规模与数据量应按约 1:20 的比例同步增长。

**长文本扩展**：Qwen2.5 将原生上下文窗口从 Qwen2 的 32K 扩展到 **128K tokens**。技术细节：
- 使用 **ABF (Adjusted Base Frequency)**：将 RoPE 的基频 \(\theta\) 从 10,000 上调至更高值（如 1,000,000），使高频旋转角度降低，延长有效上下文长度
- 在预训练后期引入**长序列数据**进行继续训练，逐步从 32K 过渡到 128K

##### 2. 架构设计

Qwen2.5 延续 Qwen2 的 Transformer decoder-only 架构，核心组件如下：

| 组件 | 描述 |
|------|------|
| **位置编码** | RoPE (Rotary Position Embedding)，支持长度外推 |
| **激活函数** | SwiGLU，相比 ReLU/GELU 在长序列上更稳定 |
| **归一化** | RMSNorm (Root Mean Square Layer Normalization)，仅保留缩放，去除平移参数 |
| **注意力机制** | FlashAttention + GQA (7B 及以上模型)，KV 头数 = 4 或 8 |

```
Qwen2.5 核心 Transformer 块伪代码：

def transformer_block(x, position):
    # 1. RMSNorm + GQA Attention
    normed = rms_norm(x)
    q = proj_q(normed)        # [batch, seq, n_heads * d_head]
    k = proj_k(normed)        # [batch, seq, n_kv_heads * d_head]
    v = proj_v(normed)        # [batch, seq, n_kv_heads * d_head]
    # 应用 RoPE
    q, k = apply_rotary_pos_emb(q, k, position)
    attn_out = flash_attention(q, k, v)  # 使用 FlashAttention 加速
    attn_out = repeat_kv(attn_out)       # GQA: 将KV头复制到Q头数
    x = x + proj_out(attn_out)

    # 2. RMSNorm + SwiGLU FFN
    normed = rms_norm(x)
    ffn_out = proj_ffn2(swish(proj_ffn1(normed)) * proj_ffn3(normed))
    x = x + ffn_out
    return x
```

> ⚠️ **注意**：GQA 仅在 7B+ 模型中使用。0.5B/1.5B/3B 采用标准 MHA (Multi-Head Attention)，以降低小模型的计算开销。

##### 3. 后训练对齐：两阶段 RL 方案

这是 Qwen2.5 技术报告中**最具创新性的部分**。后训练流程分为三个阶段：

**阶段一：监督微调 (SFT)**

| 技术 | 目的 | 具体方法 |
|------|------|----------|
| **反向翻译 (Back-translation)** | 补充低资源语言指令 | 用 Qwen2.5-Plus 将英文指令翻译为多语言，再反向翻译验证一致性 |
| **拒绝采样 (Rejection Sampling)** | 筛选高质量 CoT | 对数学/编程问题生成多个 CoT 解，保留答案正确的样本 |
| **执行反馈 (Execution Feedback)** | 代码正确性验证 | 生成代码后实际运行测试用例，仅保留通过全部测试的样本 |
| **长文本 SFT** | 指令遵循长度扩展 | 构建需要长上下文理解的数据（文档QA、摘要），训练模型在 128K 下保持注意力 |

**阶段二：DPO (Direct Preference Optimization)**

DPO 直接在偏好数据集上优化策略，无需训练独立的 Reward Model：

$$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)} \right) \right]$$

- 从 Qwen2.5 的 SFT 模型 checkpoint 进行初始化
- 偏好数据来自**人工标注** + **合成数据**（用更大模型生成偏好对）
- \(\beta\) 控制与参考策略的偏离程度
- 此阶段主要提升模型的**指令遵循**和**安全性**

**阶段三：GRPO (Group Relative Policy Optimization)**

GRPO 是 DeepSeekMath 中提出的方法，Qwen2.5 将其作为在线 RL 的第二阶段：

> 💡 **GRPO 核心思想**：无需独立的 Value Network 或 Reward Model，而是对同一 prompt 采样多个回答，以组内平均奖励作为基线计算优势。

```
GRPO 采样与优化流程：

对于每个 prompt x：
  1. 从当前策略 π_θ 采样 K 个回答 {y₁, y₂, ..., y_K}
  2. 用评分函数 r(x, y) 计算每个回答的奖励
  3. 计算组内标准化优势：
     A_i = (r_i - mean(r)) / std(r)
  4. 用裁剪目标更新策略：
     L = -min(ratio_i * A_i, clip(ratio_i, 1-ε, 1+ε) * A_i)
     其中 ratio_i = π_θ(y_i|x) / π_θ_old(y_i|x)
```

GRPO 的优势：
- **无需训练 Reward Model**：直接用规则或 LLM-as-judge 评分，减少模型数量
- **在线探索**：采样来自当前策略，避免离线数据的分布偏移 (distribution shift)
- **组内归一化**：自动消除不同 prompt 的奖励尺度差异，训练更稳定

在 Qwen2.5 中，GRPO 阶段主要针对**数学推理 (MATH/GSM8K)** 和**编程 (LiveCodeBench/HumanEval)** 任务进行强化，是 Qwen2.5 在该类任务上大幅超越 Qwen2 的关键因素。

##### 4. 关键实验结果

Qwen2.5-72B 与竞品对比（部分基准）：

| Benchmark | Qwen2-72B | Qwen2.5-72B | Llama-3.1-70B | Llama-3.1-405B |
|-----------|-----------|-------------|---------------|----------------|
| MMLU-redux | 67.2 | **75.4** | 67.2 | 67.1 |
| MATH | 52.9 | **75.5** | 51.9 | 47.1 |
| HumanEval | 79.9 | **84.8** | 72.6 | 72.6 |
| LiveCodeBench | 23.9 | **28.7** | 8.3 | 18.9 |
| Arena-Hard | 25.0 | **52.0** | 27.8 | 41.6 |
| MT-Bench | 8.26 | **8.75** | 8.23 | 8.49 |

> 🎉 **核心突破**：Qwen2.5-72B 在 **MATH** 上从 52.9 跃升至 **75.5**（+22.6），在 **Arena-Hard** 上从 25.0 翻倍至 **52.0**，体现了 GRPO 在数学推理和指令遵循上的巨大增益。

#### 🧪 练习题

```yaml
question: "Qwen2.5 的两阶段 RL 对齐中，DPO 和 GRPO 的核心区别是什么？"
options:
  - "DPO 需要 Reward Model，GRPO 不需要"
  - "DPO 使用离线偏好数据对，GRPO 从当前策略在线采样并计算组内相对优势"
  - "DPO 用于数学任务，GRPO 用于对话任务"
  - "DPO 和 GRPO 是同一算法的两个名称"
answer: 1
explain: "DPO 在固定的离线偏好数据集上优化，而 GRPO 对每个 prompt 从当前策略采样 K 个回答，以组内平均奖励作为基线计算优势——这一在线探索机制避免了离线数据的分布偏移。"
```
