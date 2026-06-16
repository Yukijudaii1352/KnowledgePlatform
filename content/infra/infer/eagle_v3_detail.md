### EAGLE-3: 鹰3代 (EAGLE-3)

```yaml
id: eagle_v3
name: EAGLE-3
full_name: 鹰3代 (EAGLE-3)
year: '2025.03'
org: PKU/SafeAI Lab
paper_url: https://arxiv.org/abs/2503.01840
category: spec_decode
parent: eagle_v2
motivation: 直接Token预测+三层特征融合
```

#### 📝 一句话总结

EAGLE-3 移除了 EAGLE 的特征回归约束，改用训练时模拟推理多步的直接 token 预测，并融合目标模型低/中/高三层特征来提升草稿质量。它保持投机解码的 target verification 正确性，同时让 draft model 能从更大训练数据中继续获得接受率和加速收益。

#### 🎯 核心要点

- 直接 token 预测：不再要求 draft 输出拟合目标模型顶层 hidden feature，去掉 \(l_{\text{fea}}\) 对表达能力的限制
- 三层特征融合：从目标模型层索引的低层、中层、高层 hidden states 提取 \(l,m,h\)，拼接后投影为融合特征 \(g\)
- Training-time test：训练阶段显式执行多步 draft，把第 1 步预测输出 \(a\) 回灌到第 2/3 步，缩小训练和推理分布差异
- 单层 decoder 草稿模型：融合特征与已采样 token embedding 拼接后输入 draft decoder，再经 LM head 得到 draft token 分布
- 兼容 EAGLE-2 动态树：推理阶段仍可用 context-aware dynamic draft tree 和 tree attention 让 target 一次验证多条候选路径
- Lossless 加速：最终 token 由目标模型按 speculative sampling 接受/拒绝规则决定，不改 target 权重和输出分布
- 数据扩展有效：论文报告 EAGLE-3 相比 EAGLE-2 约 20%-40% 速度提升，最高约 6.5x，相比原 EAGLE 更能受益于 UltraChat 等更大训练数据

#### 🔬 深入细节

![EAGLE-3 推理管线](https://arxiv.org/html/2503.01840v3/x7.png)
*图源：arXiv HTML Figure 5，展示 EAGLE-3 如何用目标模型三层特征、sampled token embedding 和 draft decoder 连续产生多步候选。*

![EAGLE-3 training-time test mask](https://arxiv.org/html/2503.01840v3/x8.png)
*图源：arXiv HTML Figure 6，展示训练时模拟第 1/2/3 轮 draft 的 attention mask。*

```python
# EAGLE-3 推理与训练时测试的核心逻辑
def fuse_target_features(target_trace, i):
    low = target_trace.low_layer[i]
    mid = target_trace.mid_layer[i]
    high = target_trace.high_layer[i]
    return W_fuse @ concat(low, mid, high) + b_fuse

def eagle3_draft(prefix, target_trace, max_depth):
    # target 已在 prefill 或上一轮 verification 中产生 prefix 的特征
    fused = [fuse_target_features(target_trace, i) for i in range(len(prefix))]
    last_token = prefix[-1]
    draft_tokens, draft_probs = [], []
    current_state = fused[-1]

    for depth in range(max_depth):
        x = W_in @ concat(current_state, embed(last_token))
        a = draft_decoder(x)                 # unconstrained vector, not target feature
        q = softmax(lm_head(a))              # direct token distribution
        token = sample_or_topk(q)
        draft_tokens.append(token)
        draft_probs.append(q[token])

        # 后续步无法拿到 target feature g(token)，用上一轮 draft 输出 a 代替
        current_state = a
        last_token = token

    return build_dynamic_tree(draft_tokens, draft_probs)

def training_time_test(tokens, target_traces, steps=3):
    inputs = [fuse_target_features(target_traces, i) for i in range(len(tokens))]
    total_loss = 0
    for s in range(steps):
        mask = make_tree_like_mask(step=s)   # Figure 6 的分步 mask
        a = draft_decoder(inputs, attention_mask=mask)
        logits = lm_head(a)
        total_loss += cross_entropy(logits, next_tokens(tokens, offset=s + 1))
        inputs = feedback_unconstrained_outputs(a, sampled_or_teacher_tokens(tokens, s))
    return total_loss / steps
```

EAGLE-3 的第一处关键变化是“预测目标”的变化。原始 EAGLE 把目标模型顶层特征 \(f_{t+1}\) 当作 draft 的监督目标，再通过目标模型 LM head 得到 token 分布；因此训练目标近似为

$$
\mathcal{L}_{\text{EAGLE}}
= \mathcal{L}_{\text{token}}
+ \lambda \lVert \hat{f}_{t+1}-f_{t+1}\rVert_2^2 .
$$

这个设计让 draft 输出受限于“必须像 target top hidden state”，但推理真正关心的是 token 是否会被目标模型接受。EAGLE-3 去掉 \(l_{\text{fea}}\)，把 draft decoder 的输出 \(a\) 视为 unconstrained vector，只要求经 LM head 后的分布能预测后续 token：

$$
\mathcal{L}_{\text{EAGLE-3}}
= \sum_{s=1}^{S}\operatorname{CE}\left(
\operatorname{softmax}(W_{\text{LM}} a_{t+s}),\; t_{t+s}
\right).
$$

这使 draft model 不再被迫复原目标模型的某一层表示，而是可以学习“对接受率最有用”的中间表示。

第二处变化是三层特征融合。论文指出，顶层特征最贴近“下一个 token 的 logits”，但它对 next-next token 的信息并不充分；低层保留词法/局部模式，中层保留组合结构，高层贴近语义和最终预测。EAGLE-3 在目标模型 forward 后记录三组 \(k\) 维特征，并用线性层压回 hidden size：

$$
g_i = W_g [l_i; m_i; h_i] + b_g,\qquad
[l_i;m_i;h_i]\in\mathbb{R}^{3k},\; g_i\in\mathbb{R}^{k}.
$$

推理第 1 步可直接使用 prefix 中每个位置的 \(g_i\)；从第 2 步开始，候选 token 尚未被 target 验证，无法得到真实 \(g\)，于是用上一轮 draft decoder 输出 \(a\) 代替缺失的 fused feature。这一点正是 EAGLE-3 必须训练时模拟推理的原因。

Training-time test 解决的是“训练只见真实特征，推理却喂自己输出”的分布偏移。训练中先在真实序列上做 native step，再把第一轮预测出的 \(a\) 回灌到下一轮，并用特殊 attention mask 保持树状依赖：原始训练 token 之间是下三角 causal attention，而第 2/3 轮预测 token 只应看到与推理中一致的祖先节点。论文还指出，除 self-attention mask 外，单层 Transformer decoder 的其他部分不需要改动；对于许多 diagonal 的注意关系，可用向量点积减少无效矩阵乘。

推理阶段仍遵循 lossless speculative sampling。draft tree 只提出候选，target model 对树中 token 并行计算概率，并按从前到后的接受规则决定最终输出。若 draft 分布为 \(q\)、target 分布为 \(p\)，链式候选的典型接受概率为

$$
\alpha_i = \min\left(1,\frac{p(t_i\mid x,t_{<i})}{q(t_i\mid x,t_{<i})}\right).
$$

拒绝时从 residual distribution 重新采样并丢弃后续 draft，因此输出分布仍等价于 target 自回归采样。EAGLE-3 的贡献不在于放宽验证，而在于提高候选更早、更长地通过验证的概率。

与 EAGLE-2 相比，EAGLE-3 的创新重点从“如何组织 draft tree”转向“如何训练一个更可扩展的 drafter”。EAGLE-2 用 confidence 估计动态生成和裁剪树，避免静态树浪费；EAGLE-3 继续兼容这套树验证，但通过去掉 feature regression 与融合多层 target 表示提升每个节点的质量。论文消融显示，两项变化都提升 acceptance length；同时训练数据从 ShareGPT 扩展到 UltraChat-200K 后，EAGLE-3 出现了原 EAGLE 不明显的 scaling curve。

> 💡 关键：EAGLE-3 不是让小模型“更像目标模型的一层 hidden state”，而是让它在训练时提前习惯“用自己的输出继续推理”，并把目标模型多层信息压缩成更适合 draft 的状态。

#### 🧪 练习题

```yaml
question: "EAGLE-3 的 training-time test 主要解决什么问题？"
options:
  - "推理时后续 draft 步无法获得 target 的真实融合特征，输入会包含 drafter 自己的输出"
  - "目标模型显存不足，需要把所有权重移到 CPU"
  - "投机解码必须取消 target verification 才能加速"
  - "LM head 无法把 hidden state 映射到 token logits"
answer: 0
explain: "EAGLE-3 在训练中模拟多步 draft 并回灌预测输出，使模型适应推理时用 a 替代缺失 target feature 的分布。"
```
