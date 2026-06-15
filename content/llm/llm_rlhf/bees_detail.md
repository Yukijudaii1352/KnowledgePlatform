### 蜂群数据选择 (BeeS)

```yaml
id: bees
full_name: 蜂群数据选择 (BeeS)
year: '2026.02'
paper_url: https://arxiv.org/abs/2502.06648
motivation: 边际最大化数据选择改进DPO
parent: dpo
category: direct_preference
```

#### 📝 一句话总结
BeeS 从偏好数据选择角度改进 DPO，用外部奖励 margin 和 DPO 隐式奖励 margin 的贝叶斯聚合筛出高置信偏好对，以更少数据获得更强对齐效果。

#### 🎯 核心要点
- 论文指出噪声偏好会造成 DPO 参数收缩，选择大 margin 样本可诱导 parameter inflation 来抵消该问题。
- BeeS 聚合 external reward margin 与 implicit reward margin，避免单一 reward source 的噪声主导数据筛选。
- 外部 margin 来自 reward model 分数差，隐式 margin 来自 \( \log\frac{\pi_\theta}{\pi_{\mathrm{ref}}} \) 的 chosen/rejected 差值。
- 聚合策略会降低任一来源 margin 过低的样本优先级，因此偏向清晰、稳定、可分离的偏好对。
- 论文报告用 UltraFeedback 10% 子集即可相对全量 DPO 在 AlpacaEval 2.0 上取得 3% 到 8% 改善。

#### 🔬 深入细节
![BeeS 工作流](https://arxiv.org/html/2502.14560v4/x1.png)
*图：BeeS 先计算多源 margin，再做贝叶斯聚合与子集选择，最后用筛选数据训练 DPO。manifest 中 paper_url 指向的页面与 BeeS 题名不匹配，本文精读依据可读公开论文页 https://arxiv.org/abs/2502.14560。*

```python
# BeeS 偏好数据筛选伪代码
weak_policy = dpo_train(reference, seed_preference_subset)

scores = []
for x, y_w, y_l in full_preference_data:
    m_ext = reward_model(x, y_w) - reward_model(x, y_l)
    r_imp_w = logp(weak_policy, y_w, x) - logp(reference, y_w, x)
    r_imp_l = logp(weak_policy, y_l, x) - logp(reference, y_l, x)
    m_imp = r_imp_w - r_imp_l

    p_ext = clip((clip(m_ext, L, U) - L) / (U - L), 0, 1)
    p_imp = clip((clip(m_imp, L, U) - L) / (U - L), 0, 1)
    p_bees = bayesian_aggregate([p_ext, p_imp])
    scores.append((p_bees, x, y_w, y_l))

selected = top_percent(scores, ratio=0.10)
policy = dpo_train(reference, selected)
```

BeeS 的问题设定很务实：偏好优化不一定缺算法，常常缺“足够干净且边界清晰的数据”。在 DPO 中，偏好标签噪声会把 chosen 与 rejected 的方向搅乱，导致参数向零收缩；如果样本本身 margin 很小，即使标签正确，模型也很难从中学到稳定差异。

论文的理论分析把 preference pair 的可分性与 margin 联系起来。大 margin 意味着 \(y_w\) 相对 \(y_l\) 的优势更明确，噪声翻转偏好的概率更低。选择这类样本会让 DPO 更快扩大 chosen/rejected 的隐式奖励差，形成对参数收缩的反向拉力。

BeeS 不直接相信单个 reward model。外部奖励 margin \(m_{\mathrm{ext}}=r_{\mathrm{ext}}(x,y_w)-r_{\mathrm{ext}}(x,y_l)\) 反映独立评估器判断，隐式奖励 margin \(m_{\mathrm{imp}}\) 则反映一个弱 DPO policy 相对 reference 已经学到的偏好差。二者相关性不完全一致，聚合后能减少某一来源误判造成的选择偏差。

最终筛选不是找最“难”的 pair，而是找高置信、可推动 margin 的 pair。BeeS 把 margin 裁剪到 \([L,U]\) 后映射为偏好概率，再通过贝叶斯式聚合得到选择分数；若任一来源认为样本 margin 很低，样本会被降权。这就是它区别于单纯 top reward 或 uncertainty sampling 的地方。

> 💡 关键：BeeS 的“少即是多”并不是随机少用数据，而是避免低 margin/噪声 pair 让 DPO 花算力学习错误或模糊信号。

#### 🧪 练习题
```yaml
question: "BeeS 为什么同时使用 external margin 和 implicit margin？"
options:
  - "为了让两个模型投票生成最终回答"
  - "为了用多源信号降低单一奖励模型噪声造成的筛选偏差"
  - "为了取消 DPO 的 reference model"
  - "为了选择 margin 最接近零的样本"
answer: 1
explain: "BeeS 聚合外部奖励和 DPO 隐式奖励，任一来源低置信都会降低样本优先级，从而筛出更可靠的偏好对。"
```
