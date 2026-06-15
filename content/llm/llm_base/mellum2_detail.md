### Mellum 2 — A 12B-Parameter Mixture-of-Experts Transformer

#### 📝 一句话总结

Mellum 2 提出了一种极简的 12B 总参数量 MoE 语言模型（2.5B 激活参数）：深度探索了 MoE 路由、多 token 预测（MTP）、双优化器联合训练、层级选择性 YaRN 上下文扩展、以及基于 GRPO 变体的 RL 后训练，在仅 10.65T tokens 的训练预算下于 7 项评测维度平均超越了 Qwen3.5-14B、OLMo3-12B 和 Ministral3-13B 等同类模型。

#### 🎯 核心要点

- 架构：12B 总参数量 MoE，64 个专家每 token 激活 8 个（8-of-64），实际激活参数仅约 2.5B
- 40 层 Transformer，隐藏维度 2560，GQA 分组数为 4，滑动窗口注意力比例 3:1
- 多 Token 预测（MTP）：单头预测下一个 token，推理时可丢弃
- 训练优化：双优化器设计——Muon 用于嵌入和 LM Head，AdamW 用于其余参数
- FP8 混合精度训练（Hybrid FP8：注意力 softmax 和 MoE gate 保留 BF16）
- WHD（Width-Holding Decay）学习率调度器替代 cosine/linear
- 3 阶段预训练 curriculum：5T → 3.65T → 2T tokens（总计 10.65T）
- 上下文扩展：层级选择性 YaRN（只对底层 16 层施加 YaRN 缩放），最高可达 131K
- 后训练流程：SFT 微调 → IcePop（GRPO 变体）RL 训练 → 模型蒸馏
- RLVR（Reinforcement Learning with Verifiable Reward）：在数学和代码任务上使用可验证奖励
- 开源发布全部训练细节、超参表和消融实验

#### 🔬 深入细节

**1. 架构设计：极简 MoE backbone**

Mellum 2 的架构遵循极简设计哲学，几乎全部采用标准组件，仅在 MoE 路由和多头注意力策略上做了针对效率的精细优化：

- **总参数量 12B，专家数 64，每 token 激活 8 个（8-of-64），激活参数仅约 2.5B**
- **40 层 Transformer Decoder**（无 Encoder），`d_model = 2560`
- **分组查询注意力（GQA）**：4 组查询头，减少 KV cache 开销
- **滑动窗口注意力（SWA）: 全局注意力 = 3:1**（每 4 层中有 3 层用 SWA，1 层用全局注意力），节省长序列下计算量
- **RoPE 位置编码**：基频 θ = 50,000,000（5000 万），为长上下文扩展预留空间
- **QK 归一化**：对 Query 和 Key 施加 LayerNorm，稳定长序列训练
- **SwiGLU 激活**：FFN 使用标准 SwiGLU 非线性

```
Mellum 2 架构简表：
┌────────────────────────────────────────────┐
│  Embedding                                  │
│  ├─ Vocab Size: ~128K                       │
│  └─ Vocab Embedding Dim: 2560               │
├────────────────────────────────────────────┤
│  40× Transformer Decoder Block              │
│  ├─ QK LayerNorm                            │
│  ├─ GQA (4 groups, SWA:Global = 3:1)        │
│  ├─ RoPE (θ = 50,000,000)                   │
│  ├─ MoE FFN (8-of-64, dropless)             │
│  │   ├─ Router: top-8 softmax gating        │
│  │   ├─ Aux Loss coefficient: 1e-3          │
│  │   └─ Expert capacity: 无限制 (dropless)  │
│  └─ MTP Head (1 head, 可丢弃)               │
├────────────────────────────────────────────┤
│  LM Head (tied with input embedding)         │
└────────────────────────────────────────────┘
总参数量: 12B | 激活参数: ~2.5B
```

**MoE 路由机制**：
Router 使用经典的 Top-K softmax gating（K=8）。无专家容量限制（"dropless"），即每个 token 被分配的 8 个专家均可完全处理，不存在 token 丢弃。辅助负载均衡损失（auxiliary load balancing loss）系数设为 `1e-3`，以微弱信号鼓励专家间的均匀利用。论文消融实验表明，与 Dense 和 MLA（Multi-head Latent Attention）方案相比，8-of-64 的 MoE 设计在同等激活参数量下提供了最优的推理效率-性能前沿。

**2. 预训练体系：三阶段 curriculum + 双优化器 + FP8**

预训练流程是 Mellum 2 最具参考价值的部分，因为它在相对较小的训练预算（10.65T tokens）下实现了强劲的性能，这归功于精心设计的训练策略。

**三阶段预训练 curriculum**：

| 阶段 | Token 量 | 序列长度 | 峰值学习率 | 关键操作 |
|------|----------|----------|-----------|----------|
| Stage 1 | 5T | 8192 | 3e-4 | 基础预训练 |
| Stage 2 | 3.65T | 8192 | 1.5e-4 | LR 减半 + 数据重 balancing |
| Stage 3 | 2T | 8192 | 8e-5 | LR 再降 + 高质量数据注入 |
| **总计** | **10.65T** | | | |

- 全局 batch size 为 4096（每 step 处理的序列数），序列长度固定为 8192
- 数据并非公开披露，但论文提到了质量过滤和去重流程

**双优化器联合训练**（核心创新）：

这是极少在 Transformer 预训练中被采用的策略，灵感来源于大规模矩阵优化的数值稳定性需求：

- **AdamW**（β₁=0.9, β₂=0.95, weight_decay=0.1）：用于所有 Transformer Block 内部的参数（QKV 投影、FFN、MoE 专家、Router、LayerNorm）
- **Muon**（momentum=0.95, weight_decay=0.01）：专门用于 Embedding 矩阵和 LM Head 的输出投影
- 双优化器在同一个训练 step 中交替更新各自负责的参数，无需额外通信开销

原因：嵌入矩阵和 LM Head 均为巨大的 [vocab_size × d_model] 矩阵（~128K × 2560），其条件数极高。Muon 优化器（基于矩阵 Newton-Schulz 迭代的正则化方法）在数值稳定性上显著优于 AdamW 的一阶矩估计，可防止梯度爆炸。

**WHD 学习率调度器**：

替代常规的 cosine/linear schedule。WHD（Width-Holding Decay）在预热后保持高位 LR 一段时间，然后以可配置的衰减速率下降。关键参数：预热步数 2000，Stage 1 峰值 LR = 3e-4，每个后续阶段 LR 减半。

**FP8 Hybrid 混合精度**：

并非全量 FP8。Attention 的 softmax 计算和 MoE Router 的 gating 计算保留 BF16，其余所有线性层和 FFN 使用 FP8（E4M3 格式），在降低显存的同时避免了 softmax/gating 的数值溢出。

**3. 上下文扩展：层级选择性 YaRN**

在 Stage 3 的 2T tokens 训练结束后，Mellum 2 对模型进行上下文长度扩展，目标从 8K 提升至 131K tokens。核心方法：

- **YaRN（Yet another RoPE extensioN）** 算法，对 RoPE 频率做重缩放
- **层级选择性策略**（Layer-selective）：仅在模型的底层 16 层（共 40 层）施加 YaRN 频率重缩放，顶层保持原始 RoPE 频率
- 直觉：底层更关注局部细节和短程依赖，YaRN 的缩放对其影响更大；而顶层已通过相对位置编码学习到有效的长程表征，过度缩放反而不利

扩展过程采用渐进式微调：在 8K → 32K → 64K → 131K 的序列上逐步训练，每个阶段仅需少量数据（数亿 tokens）。论文在 RULER 长文本评测中验证了该策略的有效性，131K 长度下准确率明显优于全量 YaRN 基线。

**4. 后训练流程：SFT → IcePop RL → 蒸馏**

后训练分三个阶段：

**SFT（监督微调）**：
- 使用精选的指令遵循和对话数据（数万条量级）
- 与预训练相同的数据格式，避免分布偏移
- 学习率 3e-5，全局 batch size 128，约 3 个 epoch

**IcePop RL 训练**（GRPO 的轻量化变体）：

IcePop 是 Group Relative Policy Optimization（GRPO）的改进版：
- 传统 GRPO：对每个 prompt 采样 K 个 response，使用组内相对奖励进行优化 → 需要 K 倍的推理开销
- IcePop 改进：复用 SFT 阶段的高质量 response 作为 "anchor"，仅对每个 prompt 采样 2 个新 response（K=2），极大降低计算量
- 优势函数：`A = r_new - r_anchor`，其中 r_anchor 是 SFT response 的奖励
- Reward 类型：对于数学/代码推理任务使用 RLVR（可验证的 ground-truth 奖励）；对于创意写作等开放任务使用 Reward Model 打分
- 裁剪范围 ε = 0.2，学习率 1e-6，KL penalty coefficient = 0.04

**模型蒸馏**：
- 将 IcePop 训练后的 Mellum 2 作为 Teacher，对小批量高质量 reasoning 数据进行再采样
- 将 Teacher 的高质量 output 与原始 SFT 数据混合，微调最终的 release 模型
- 蒸馏使模型在指令遵循和风格一致性上进一步提升

**5. 核心公式**

**MoE 输出**：

$$y = \sum_{i \in \text{TopK}(G(x), 8)} g_i(x) \cdot \text{Expert}_i(x), \quad G(x) = \text{softmax}(W_g \cdot x)$$

其中辅助损失为：

$$\mathcal{L}_{aux} = \alpha \cdot \sum_{i=1}^{64} f_i \cdot p_i, \quad \alpha = 10^{-3}$$

$f_i$ 为专家 i 的 token 比例，$p_i$ 为路由概率均值。

**YaRN 频率缩放**（层级选择性）：

$$\Theta_l = \begin{cases} \theta \cdot \gamma^{-2l/d}, & l \leq 16 \quad \text{(YaRN 缩放)} \\ \theta^{-2l/d}, & l > 16 \quad \text{(原始 RoPE)} \end{cases}$$

其中 γ 为缩放因子，d 为 head 维度。

**IcePop 目标函数**：

$$J(\theta) = \min\left(r_t(\theta) \cdot A, \text{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon) \cdot A \right) - \beta \cdot D_{KL}(\pi_\theta || \pi_{ref})$$

其中 $r_t(\theta) = \frac{\pi_\theta(a_t|s_t)}{\pi_{old}(a_t|s_t)}$ 为策略概率比，A 为锚定优势函数。

**6. 评测结果**

Mellum 2 在 7 大评测维度上与其他 12B-14B 量级模型（Qwen3.5-14B, OLMo3-12B, Ministral3-13B）进行对比：

| 评测维度 | Mellum 2 | Qwen3.5-14B | OLMo3-12B | Ministral3-13B |
|----------|----------|-------------|-----------|----------------|
| 通用能力 (MMLU-Pro) | **52.8** | 51.2 | 48.9 | 49.5 |
| 代码 (HumanEval+) | **78.1** | 76.0 | 72.8 | 73.2 |
| 数学 (MATH-500) | **84.4** | 82.9 | 79.1 | 80.5 |
| 推理 (GPQA Diamond) | **47.2** | 43.8 | 41.3 | 42.1 |
| 指令遵循 (IFEval) | 81.3 | **82.6** | 78.1 | 79.8 |
| 长文本 (RULER-131K) | **75.7** | 68.3 | 65.4 | 63.2 |
| 多语言 (MGSM) | 73.5 | **75.9** | 70.2 | 71.8 |
| *平均* | **70.4** | 68.7 | 65.1 | 65.7 |

MoE 架构 + 精心的训练 recipe 使 Mellum 2 以 2.5B 激活参数战胜了参数量更大的密集模型。

#### 💬 讨论与局限

- **数据非公开**：预训练数据来源和质量过滤细节未披露，限制了对性能来源的完全可归因分析
- **MoE 推理开销**：8-of-64 的 MoE 在推理时需要加载所有 64 个专家的参数（12B），显存需求高于同等激活参数的密集模型（2.5B）
- **MTP 收益有限**：多 Token 预测仅在训练时提供微弱加速（约 5%），推理时被丢弃，并非核心贡献
- **RLVR 适用范围**：可验证奖励仅在数学/代码等有确定答案的任务上有效，在写作/对话等开放任务上仍需 Reward Model，可能存在 reward hacking 风险
- **长上下文实际质量**：131K 场景下通过 RULER 评测，但实际应用中的长上下文连贯性未充分验证
- **与更大规模模型的差距**：相比同期的 70B+ 密集模型，在 GPQA Diamond 等推理任务上仍有较大差距
- **未来方向**：a) 更高效的 MoE 路由（如 domain-aware routing）; b) RLVR for general domains; c) 更深度的 curriculum 数据策略

#### 🧪 练习题

1. 解释 Mellum 2 为什么在预训练中使用双优化器（Muon + AdamW）组合，而不是单一优化器？Muon 专门用于哪些参数矩阵，背后的数值动机是什么？
2. 推导 MoE 辅助负载均衡损失的梯度形式，并解释为什么系数 1e-3 是一个"微弱"信号——如果系数过大（如 0.1）会对路由行为产生什么影响？
3. Mellum 2 的层级选择性 YaRN 为何只作用于底层 16 层？从 Transformer 不同层代表的功能分布角度分析其合理性。
