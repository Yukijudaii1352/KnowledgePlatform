### Mellum 2：面向软件工程的小激活 MoE 模型

```yaml
id: mellum2
name: Mellum 2
full_name: 开放软件工程 MoE 模型 (Mellum 2)
year: "2026.05"
org: JetBrains
paper_url: https://arxiv.org/abs/2605.31268
category: frontier_2026
parent: minimax_m1
motivation: 小激活MoE服务开发场景
```

#### 📝 一句话总结

Mellum 2 提出一个开放权重的 12B 总参数、每 token 仅约 2.5B 激活参数的 MoE 语言模型，专门面向代码生成、编辑、调试、工具调用和 agentic coding 等软件工程场景。它的核心贡献是用推理预算反推架构：64 experts / top-8 路由、4 KV heads GQA、3:1 sliding-window attention、MTP、Muon + FP8 训练、layer-selective YaRN 与 RLVR 后训练共同服务“小激活、可部署、偏工程任务”的目标。

#### 🎯 核心要点

- 模型规模：约 12B 总参数，约 2.5B active parameters per token；目标是在 2-3B dense 计算量附近获得更大的知识容量。
- MoE 结构：每层 MoE FFN，64 个 routed experts，每 token top-8 激活，expert intermediate size 896，无 shared expert，采用 dropless routing。
- Transformer 配置：28 层 decoder-only，hidden dimension 2304，32 query heads，4 KV heads，head dimension 128，RMSNorm \(\epsilon=10^{-6}\)，RoPE base \(\theta=500000\)，词表 98304。
- 注意力效率：3:1 SWA 模式，即每 4 层中 3 层用 window size 1024 的 sliding window attention，剩余 1 层保留 full attention。
- MTP 头：单个 Multi-Token Prediction transformer layer，loss weight \(\alpha=0.1\)，训练时作为辅助目标，部署时可作为 speculative decoding 的 draft 模型，评测时可移除。
- 预训练 curriculum：总计 10.65T tokens，三阶段从 web-heavy 转向 code/math-heavy：6.18T、2.79T、1.69T，对应 code 比例 23% → 42% → 59%。
- 优化与精度：Distributed Muon，内部对 embedding/output layers 使用 Adam；WHD 学习率调度，2000 warmup steps，Phase 3 线性 decay 到 0；BF16 + FP8 hybrid mixed precision，梯度归约 FP32。
- MoE 稳定性：router 使用 FP32，global auxiliary load-balancing loss 系数 \(10^{-3}\)，router z-loss \(10^{-3}\)，dropless routing 避免 token dropping。
- 长上下文：从 8192 扩展到 131072 tokens，通过 layer-selective YaRN 只重映射 full-attention layers 的 RoPE 频率，不扰动 sliding-window layers。
- 后训练：从 128K YaRN checkpoint 出发做 SFT，分别训练 Instruct 与 Thinking 两种变体，再用可程序验证奖励的 RLVR / GRPO 变体强化数学、可执行代码、工具调用等任务。

#### 🔬 深入细节

![Mellum 2 MoE iso-latency 设计空间](https://arxiv.org/html/2605.31268v1/x3.png)

*图：论文 Figure 1(a) 展示 64 experts、8 active 的 Qwen3-MoE 架构在 throughput mode 下的 iso-latency 设计空间，用推理延迟约束筛选 Mellum 2 的 MoE 规模。*

```python
# Mellum 2 单 batch 训练伪代码
def mellum2_forward(tokens):
    h = embed(tokens)
    aux_losses = []
    for layer_id in range(28):
        if layer_id % 4 in {0, 1, 2}:
            a = sliding_window_attention(h, window=1024, q_heads=32, kv_heads=4)
        else:
            a = full_attention(h, q_heads=32, kv_heads=4)
        h = h + a

        # MoE FFN: router 用 FP32，选择 64 个专家中的 top-8
        router_logits = fp32_router(h)
        probs = softmax(router_logits)
        top8 = top_k(probs, k=8)
        moe = sum(probs[..., i] * expert_i(h) for i in top8.indices)
        h = h + moe

        aux_losses.append(load_balance_loss(probs, top8) + z_loss(router_logits))
    return h, sum(aux_losses)

def train_step(batch):
    h, router_loss = mellum2_forward(batch.tokens)
    lm_loss = cross_entropy(lm_head(h[:, :-1]), batch.tokens[:, 1:])
    mtp_loss = cross_entropy(mtp_head(h[:, :-2]), batch.tokens[:, 2:])
    loss = lm_loss + 0.1 * mtp_loss + 1e-3 * router_loss
    distributed_muon_step(loss, precision="BF16+FP8 hybrid")
```

Mellum 2 的出发点不是追求最大的通用 benchmark 分数，而是软件工程部署约束：IDE、代码 agent 和工具调用需要低延迟、高吞吐、长上下文和较强代码能力。论文因此采用 MoE，而不是同等总参数的 dense 模型：每个 token 只激活约 2.5B 参数，但 12B 总参数为长尾编程语言、API、调试模式和推理模板提供更大容量。作者把 64 experts 固定为能放入 GPU 内存的上限，再在 active experts 上做延迟-质量折中；2 active 更快但质量损失明显，最终选择 8 active out of 64。

核心计算可以写成 top-k MoE 聚合：

$$
y_t = \sum_{i \in \mathrm{Top8}(g(h_t))} p_i(h_t)\,E_i(h_t),
\quad p(h_t)=\mathrm{softmax}(g(h_t))
$$

其中 \(g\) 是 router，\(E_i\) 是第 \(i\) 个 expert。Mellum 2 使用 dropless routing，也就是不设置 capacity factor 丢 token；这样早期吞吐会受负载不均影响，但随着 global load-balancing loss 让 router 学会均衡分配，吞吐会接近 capacity-limited routing，同时避免 token dropping 带来的信息损失。router 计算保留 FP32，并加入 \(10^{-3}\) 的 auxiliary load-balancing loss 与 \(10^{-3}\) 的 z-loss，这些细节比 MoE 公式本身更影响训练稳定性。

注意力设计同样由推理效率驱动。4 KV heads 的 GQA 降低 KV cache 成本；3:1 sliding-window attention 让 28 层中大多数层只看 1024 token 的局部窗口，减少长输入下的 attention 开销，而每 4 层保留 1 层 full attention，避免模型完全失去远距离交互路径。MTP 头预测额外未来 token，训练目标为：

$$
\mathcal{L}=\mathcal{L}_{\mathrm{next}} + 0.1\,\mathcal{L}_{\mathrm{MTP}} + 10^{-3}\mathcal{L}_{\mathrm{router}}
$$

这个 MTP 头不是改变主模型输出接口，而是作为辅助目标和 speculative decoding 的内置 draft；评测时可以移除，降低对主干推理的影响。

预训练 curriculum 是“web early, curated late”。Phase 1 用 6.18T tokens 建立基础语言和代码能力，web/code/math 比例约 70/23/6；Phase 2 用 2.79T tokens 增加高质量与代码数据，比例约 44/42/14；Phase 3 用 1.69T tokens 在学习率 decay 阶段强化能力，code/math 升至 59/18。学习率使用 Warmup-Hold-Decay：2000 steps warmup 到 \(3\times10^{-4}\)，前两阶段保持峰值，第三阶段约 49306 steps 线性衰减到 0。优化器是 Distributed Muon，使用 Moonlight 配置，Muon 对 hidden layers 做正交化更新，同时对 embedding 和 output layers 使用 Adam；这比旧文件中“Muon 只管 embedding/LM head”的说法相反。

长上下文扩展从 8192 到 131072 tokens。Mellum 2 没有对所有层统一做 YaRN，而是只对 full-attention layers 做频率重映射，sliding-window layers 保留原 RoPE 参数。直觉是 SWA 层本来只处理固定 1024 token 局部窗口，不需要为 128K 全局距离重标定；真正需要外推的是 full-attention 层。论文在 RULER ablation 中报告，64K 评测上下文下 layer-selective recipe 得分 0.64，高于 uniform \(\theta\)-bump 的 0.52 和 unchanged-\(\theta\) 的 0.33，说明“只改必须长距外推的层”比粗暴全层缩放更稳。

后训练分 SFT 和 RLVR。SFT 从 long-context YaRN checkpoint 开始，训练 Instruct 和 Thinking 两个变体：Instruct 直接回答并丢弃 reasoning 字段；Thinking 会输出 reasoning trace，并只对最终 assistant turn 及其 reasoning trace 计算 loss。两者都用 131072 packed sequence、Distributed Muon、BF16+FP8，并把 MoE aux-loss 系数降到 \(10^{-4}\)。RL 阶段使用可程序验证奖励而非 RLHF reward model，因为数学、可执行代码和函数调用任务能用确定性 checker 判对错；这降低了 reward model 噪声，让小激活 MoE 更适合软件工程中的“能跑通就给奖”的训练信号。

> 💡 关键：Mellum 2 的方法重点是 inference-aware model design。MoE、GQA、SWA、MTP、Muon、FP8、YaRN 和 RLVR 都围绕同一个约束展开：在可部署计算量下，把软件工程任务需要的容量、长上下文和工具调用能力尽量做满。

#### 🧪 练习题

```yaml
question: "Mellum 2 为什么只对 full-attention layers 使用 layer-selective YaRN？"
options:
  - "因为 sliding-window layers 只处理固定局部窗口，主要由 full-attention layers 承担长距离外推"
  - "因为 MoE experts 只能在 full-attention layers 中工作"
  - "因为 YaRN 只能用于 dense 模型，不能用于 MoE 层"
  - "因为 128K 上下文只在 SFT 阶段使用，预训练阶段完全不用位置编码"
answer: 0
explain: "论文认为 SWA 层的注意力跨度固定，统一缩放会扰动原本有效的局部建模；需要长距离位置外推的是 full-attention layers。"
```
