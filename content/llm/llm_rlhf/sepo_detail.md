### 选择性偏好优化 (SePO)

```yaml
id: sepo
full_name: 选择性偏好优化 (SePO)
year: '2025'
paper_url: https://aclanthology.org/2025.emnlp-main.359/
motivation: 选择性优化关键Token降低成本
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
SePO 提出用小型“参考-Oracle”模型估计 token 级隐式奖励，只在 chosen 的高奖励 token 和 rejected 的低奖励 token 上做偏好优化，从而把 DPO 的训练预算集中到真正决定偏好的关键 token。

#### 🎯 核心要点
- 三步流程：训练 ref/oracle 模型估计 token 奖励、按奖励选择 Top-K% 关键 token、仅在被选 token 上更新策略模型。
- token 奖励来自 DPO 隐式奖励分解，近似为 \( \hat r_t=\beta\log\frac{\pi_{\mathrm{oracle}}(y_t|y_{<t},x)}{\pi_{\mathrm{ref}}(y_t|y_{<t},x)} \)。
- chosen 响应选择高奖励 token，rejected 响应选择低奖励 token，使优化方向更贴近“好答案应该强化什么、坏答案应该压低什么”。
- 论文主实验常用 Top-30% token，报告在保持或提升 AlpacaEval/MT-Bench 表现的同时显著减少 GPU hours。
- 适合长回复偏好学习，因为长序列里大量格式词、连接词和低信息 token 会稀释 DPO 的梯度。

#### 🔬 深入细节
![SePO 三阶段流程图](https://arxiv.org/html/2408.13518v2/x1.png)
*图：SePO 先用 ref-oracle 模型对 token 打分，再筛选关键 token，最后只用这些 token 训练 policy。*

```python
# SePO 核心流程伪代码
ref = sft_model(chosen_responses)
oracle = dpo_model(ref, preference_subset)

selected_pairs = []
for x, y_pos, y_neg in preference_data:
    pos_scores = beta * (logp(oracle, y_pos, x) - logp(ref, y_pos, x))
    neg_scores = beta * (logp(oracle, y_neg, x) - logp(ref, y_neg, x))
    pos_mask = top_k_percent(pos_scores, k=30, largest=True)
    neg_mask = top_k_percent(neg_scores, k=30, largest=False)
    selected_pairs.append((x, y_pos, y_neg, pos_mask, neg_mask))

for batch in selected_pairs:
    margin_pos = masked_logratio(policy, ref, batch.y_pos, batch.pos_mask)
    margin_neg = masked_logratio(policy, ref, batch.y_neg, batch.neg_mask)
    loss = -logsigmoid(beta * (margin_pos - margin_neg))
    update(policy, loss)
```

SePO 的出发点是：标准 DPO 把整条 response 的 log probability 差作为偏好信号，但人类偏好通常只由少数内容词、事实词、推理步骤或拒答策略 token 决定。长答案里大量共享的功能词和格式 token 会把梯度预算摊薄，导致模型在不重要位置上也被迫学习偏好差异。

论文把 DPO 的隐式奖励拆到 token 层面。若 oracle 是用偏好数据训练出的模型，ref 是只经过 SFT 的参考模型，则每个 token 的奖励可用两者条件概率比估计：\( \hat r_t=\beta\log\frac{\pi_{\mathrm{oracle}}(y_t|x,y_{<t})}{\pi_{\mathrm{ref}}(y_t|x,y_{<t})} \)。chosen 中奖励高的 token 被视为“应该强化”的 token，rejected 中奖励低的 token 被视为“应该抑制”的 token。

训练时，SePO 不改变 DPO 的偏好对形式，而是改变用于计算序列 margin 的 token 集合。对 chosen 只累积被选中的高奖励 token log-ratio，对 rejected 只累积被选中的低奖励 token log-ratio，再把两个 masked margin 放入 sigmoid 偏好损失。这保留了 DPO 的直接优化优势，同时降低了对整条序列反向传播的无效计算。

与 TDPO/TI-DPO 这类 token-level DPO 相比，SePO 的关键在于“先估计再选择”：它不是给所有 token 重新加权，而是用小 oracle 把监督信号离线筛出来。这样做特别适合弱到强或低成本对齐场景，因为 oracle 可以比最终 policy 小很多，筛选结果仍能指导更大的策略模型训练。

> 💡 关键：SePO 的节省来自两个层面：少量 token 进入偏好损失，且选择机制把梯度集中在偏好差异最清晰的位置。

#### 🧪 练习题
```yaml
question: "SePO 为什么要分别选择 chosen 的高奖励 token 和 rejected 的低奖励 token？"
options:
  - "为了让模型只学习序列长度差异"
  - "为了强化偏好答案的关键优势并压低非偏好答案的关键错误"
  - "为了完全移除 reference model"
  - "为了把 DPO 改成纯监督学习"
answer: 1
explain: "SePO 的 token 奖励来自 oracle/ref 概率比，高奖励 chosen token 表示应强化的偏好证据，低奖励 rejected token 表示应抑制的错误证据。"
```
