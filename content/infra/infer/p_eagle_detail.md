### P-EAGLE: 并行鹰 (P-EAGLE)

```yaml
id: p_eagle
name: P-EAGLE
full_name: 并行鹰 (P-EAGLE)
year: '2026.02'
org: Amazon
paper_url: https://arxiv.org/abs/2602.01469
category: spec_decode
parent: eagle_v3
motivation: 并行草稿单次前向生成K个draft
```

#### 📝 一句话总结

P-EAGLE 把 EAGLE-3 的 draft 生成从 \(K\) 次串行自回归前向改成一次并行多 token 预测，用 learnable shared hidden state 和 mask token embedding 填补未来位置缺失的上下文。它同时提出 mask 预计算与序列分区训练，使并行 drafter 能训练到 reasoning LLM 所需的长上下文。

#### 🎯 核心要点

- 并行 drafting：一次 drafter forward 同时预测 \(K\) 个 draft token，减少 EAGLE-3 中随 speculation depth 线性增长的 drafter latency
- NTP/MTP 位置拆分：第 1 个位置是 Next-Token Prediction，使用真实 target hidden states；第 2 到 \(K\) 个 Multi-Token Prediction 位置使用共享可学习 hidden state
- 两个占位参数：\(h_{\text{shared}}\) 替代未来位置缺失的前序 hidden vector，mask token embedding 替代未知的前序 token embedding
- 目标模型三层特征输入：延续 EAGLE-3，从 target layer \(2,L/2,L-1\) 取 hidden states，拼接为 \(3d\) 后投影给 drafter
- 长上下文训练：用 amortized attention mask construction 避免每个样本重建 \(O((nK)^2)\) mask
- 序列分区：在单条长序列内部做 gradient accumulation，同时保持跨 prediction depth 的 \(p \rightarrow p-1\) 依赖
- 生产实现：集成到 vLLM，论文报告在 GPT-OSS 120B/20B、Qwen3-Coder 30B 上比 autoregressive EAGLE-3 快 1.10x-1.36x

#### 🔬 深入细节

![P-EAGLE 架构图](https://arxiv.org/html/2602.01469v1/x2.png)
*图源：arXiv HTML Figure 2，展示 target hidden states、NTP 位置和多个 MTP 位置如何进入 P-EAGLE drafter。*

![P-EAGLE 序列分区图](https://arxiv.org/html/2602.01469v1/x4.png)
*图源：arXiv HTML Figure 4，展示长序列训练时如何按依赖关系切分不同 prediction depth。*

```python
# P-EAGLE: 一次 forward 生成 K 个 draft token
def p_eagle_parallel_draft(prefix, target_trace, K):
    # NTP position: 和 EAGLE-3 一样使用 target 的三层特征
    h_ntp = project(concat(
        target_trace.layer_2[-1],
        target_trace.layer_mid[-1],
        target_trace.layer_last_minus_1[-1],
    ))
    x_ntp = combine(h_ntp, embed(prefix[-1]))

    # MTP positions: 没有真实的上一轮 hidden/token，用可学习占位符
    xs = [x_ntp]
    for depth in range(1, K):
        xs.append(combine(h_shared, embed(mask_token)))

    states = p_eagle_transformer(xs, rope_positions=make_parallel_positions(K))
    logits = [lm_head(s) for s in states]
    draft_tokens = [sample_or_topk(logits[d]) for d in range(K)]
    return draft_tokens

# 论文中的 sequence partitioning 思路
def sequence_partitioning(sampled_positions, S, L):
    boundaries = [i * L / S for i in range(S + 1)]
    assignment = {}

    # depths 0/1 直接按位置切段
    for g in [0, 1]:
        for p in sampled_positions[g]:
            assignment[g, p] = max(s for s in range(S) if boundaries[s] <= p)

    # depth >= 2 继承它依赖的上一 depth 位置，保持 p -> p-1 依赖不跨段
    for g in range(2, len(sampled_positions)):
        for p in sampled_positions[g]:
            assignment[g, p] = assignment[g - 1, p - 1]

    # 每段累积包含 depth-0 的 causal prefix
    ntp_context = {
        s: [p for p in sampled_positions[0] if p < boundaries[s + 1]]
        for s in range(S)
    }
    return assignment, ntp_context
```

P-EAGLE 首先明确 EAGLE-3 的新瓶颈：draft model 本身已经很小，但要生成 \(K\) 个候选 token 仍需 \(K\) 次串行 forward。若 target verification 足够快、draft quality 足够高，继续加大 speculation depth 会让 drafter latency 成为瓶颈。P-EAGLE 的目标不是改变 target verification，而是把 draft 阶段改成并行多 token 预测：

$$
(\hat{t}_{1},\hat{t}_{2},\ldots,\hat{t}_{K})
= D_{\theta}(x_{\text{NTP}},x_{\text{MTP},2},\ldots,x_{\text{MTP},K})
$$

其中 \(x_{\text{NTP}}\) 使用真实前缀和 target hidden states，后续 MTP 位置用共享参数构造输入。这样每个解码轮次只需一次 drafter forward，然后把 \(K\) 个 draft token 交给目标模型验证。

架构上，P-EAGLE 延续 EAGLE-3 的 target-conditioned drafter。目标模型有 \(L\) 层 decoder 时，从第 2 层、第 \(L/2\) 层和第 \(L-1\) 层取 hidden states 并拼接：

$$
h_i^{\text{tar}} = W_p [h_i^{(2)};h_i^{(L/2)};h_i^{(L-1)}] .
$$

第一个 NTP 位置使用 \(h_i^{\text{tar}}\) 和真实上一 token embedding；而 MTP 位置缺少“上一轮预测 token”和“上一轮 draft hidden”。P-EAGLE 用

$$
x_{\text{MTP},d} = \operatorname{combine}(h_{\text{shared}}, e_{\text{mask}}),\qquad d=2,\ldots,K
$$

作为统一占位输入。论文比较了 depth-specific encoding、注入 NTP hidden、两者结合、正则化注入等替代方案，发现简单共享 \(h_{\text{shared}}\) 反而高 7%-15%。直觉是 RoPE 和 attention 已经能表达绝对位置与可见 NTP 上下文，额外显式注入会制造冗余路径并让优化变差。

训练难点来自并行预测的序列展开。长度为 \(n\)、并行深度为 \(K\) 时，朴素训练会产生 \(nK\) 个位置，attention memory 变为

$$
O((nK)^2).
$$

PARD 的 Conditional Drop-token (COD) 用几何保留率 \(r\) 降低位置数：depth 0 保留 \(n\)，depth 1 保留 \(nr\)，depth 2 保留 \(nr^2\)，总位置数约为

$$
L_{\text{eff}} = n(1+r+r^2+\cdots+r^{K-1})
= n\frac{1-r^K}{1-r}.
$$

但 COD 每个样本随机保留的位置不同，传统做法需要逐样本构造跨 depth causal mask，仍有 \(O((nK)^2)\) 构造成本。P-EAGLE 的 mask 预计算利用“同一位置范围的跨 depth 因果结构与总长度无关”这一事实：初始化时构造最大长度 mask，训练时只切出左上角子矩阵，变成常数时间视图操作。

第二个训练难点是单条长序列本身可能装不进显存，普通 batch-level gradient accumulation 无法解决。P-EAGLE 的序列分区把一条序列拆成 \(S\) 段：depth 0/1 可按位置边界分段，depth \(d\ge2\) 的位置 \(p\) 必须继承它依赖的 depth \(d-1\) 位置 \(p-1\) 所在段。这样每段仍保留正确 attention 依赖；同时每段累积包含 depth-0 前缀，以满足 causal attention。峰值 attention memory 从 \(O(L_{\text{eff}}^2)\) 降为约 \(O(L_{\text{eff}}^2/S^2)\)，代价是多个 segment forward/backward 后再累积梯度。

训练目标本质上仍是多 offset 的 token cross entropy。对被 COD 保留下来的位置集合 \(\mathcal{P}_d\)，第 \(d\) 个 prediction depth 预测 \(d+1\) 步后的 token：

$$
\mathcal{L}
= \sum_{d=0}^{K-1}\sum_{i\in\mathcal{P}_d}
\operatorname{CE}\left(
\operatorname{softmax}(W_{\text{LM}} s_{i,d}),\; t_{i+d+1}
\right).
$$

这让 P-EAGLE 学到“同一前缀下多个未来 offset 的分布”，推理时则仍由 target model 验证候选前缀。因而 P-EAGLE 的正确性边界和 EAGLE-3 一样：draft 越准越快，但 draft 不能绕过 target。

与 EAGLE-3 的关系可以概括为：EAGLE-3 提升单步 draft 质量，P-EAGLE 压缩多步 draft latency。论文强调 P-EAGLE 需要 2-4 层 drafter 才能匹配 1 层 autoregressive EAGLE-3 的 acceptance length；因此低 speculation depth 下不一定总赢，但当 \(K=5\) 到 \(7\) 时，一次 4 层 forward 的开销可以被更深的并行候选摊薄，端到端吞吐提升更明显。

> 💡 关键：P-EAGLE 的“并行”不是并行验证，而是把 EAGLE 的草稿生成本身从链式循环变成一个多位置预测问题；target verification 仍然保证输出分布。

#### 🧪 练习题

```yaml
question: "P-EAGLE 为什么需要 learnable shared hidden state 和 mask token embedding？"
options:
  - "MTP 未来位置没有上一轮预测产生的 hidden vector 和 token embedding，需要可学习占位输入"
  - "目标模型不支持 RoPE，需要换成绝对位置编码"
  - "投机解码的 target verification 必须被删除"
  - "长上下文训练不需要 attention mask"
answer: 0
explain: "P-EAGLE 一次预测多个未来 token，后续 MTP 位置缺少自回归步骤中本应产生的上下文，因此用共享 hidden 和 mask embedding 作为可学习占位符。"
```
