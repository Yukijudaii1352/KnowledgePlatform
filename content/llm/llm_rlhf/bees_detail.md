### 蜂群数据选择 (BeeS)
```yaml
id: bees
full_name: 蜂群数据选择 (BeeS)
year: "2026.02"
paper_url: https://arxiv.org/abs/2502.06648
motivation: 边际最大化数据选择改进DPO
parent: dpo
category: direct_preference
source_paper_url: https://arxiv.org/abs/2502.14560
source_note: "任务 JSON 的 paper_url 指向无关的 Tokyo Olympics 新闻数据集；本文按算法名与动机精读 BeeS 原论文 Less is More: Improving LLM Alignment via Preference Data Selection。"
```

#### 📝 一句话总结
BeeS 提出用“边际最大化 + 多源贝叶斯聚合”来筛选 DPO 偏好数据，解决噪声偏好样本导致的参数收缩和训练低效问题。它不是修改 DPO 损失本身，而是在训练前挑出外部奖励边际与隐式 DPO 边际都足够可信的高价值偏好对。

#### 🎯 核心要点
- 从理论上分析偏好标签噪声会造成 parameter shrinkage，使学到的奖励方向或策略更新向零收缩。
- 提出 margin-maximization principle：大边际偏好对更不容易被噪声翻转，也更能抵消噪声带来的收缩。
- 同时使用 external reward margin 与 implicit DPO reward margin，避免单一奖励模型在 OOD 偏好上误判。
- 用小模型在少量 seed data 上预先 DPO，低成本获得 in-distribution implicit reward signal。
- 将不同来源、不同尺度的 margin 投影到统一概率空间，再用 Bayes aggregation 得到偏好方向正确的联合置信度。
- 一次性 DPO 时选择最高聚合概率样本；迭代 DPO 时每轮生成候选后复用 BeeS 三步流程过滤在线数据。
- 实验覆盖 TL;DR、Anthropic HH、UltraFeedback、Llama-UltraFeedback、Mistral-UltraFeedback，并显示少量 BeeS 子集可超过全量 DPO。

#### 🔬 深入细节
![BeeS workflow](https://arxiv.org/html/2502.14560v4/x1.png)
*图：论文 Figure 1，BeeS 工作流：先做小规模 in-distribution pre-DPO，再计算多源 margin，最后通过贝叶斯聚合选择训练样本。*

```python
# BeeS: Bayesian Aggregation for Preference data Selection
# 输入：偏好数据 D={(x, y_w, y_l)}、外部奖励模型 r_ex、参考模型 pi_ref、小策略模型 pi_small
seed = random_sample(D, n_seed)
pi_theta = dpo_train(pi_small, seed)  # Step 1: in-distribution pre-DPO

scores = []
for x, y_w, y_l in D:
    # Step 2: 多源 margin 计算
    m_ex = r_ex(x, y_w) - r_ex(x, y_l)
    r_im_w = logprob(pi_theta, y_w, x) - logprob(pi_ref, y_w, x)
    r_im_l = logprob(pi_theta, y_l, x) - logprob(pi_ref, y_l, x)
    m_im = r_im_w - r_im_l

    # Step 3: 将 margin 投影为单源偏好概率，并做 Bayes aggregation
    p_ex = (clip(m_ex, L_ex, U_ex) - L_ex) / (U_ex - L_ex)
    p_im = (clip(m_im, L_im, U_im) - L_im) / (U_im - L_im)
    p_joint = (p_ex * p_im) / (p_ex * p_im + (1 - p_ex) * (1 - p_im))
    scores.append((p_joint, x, y_w, y_l))

D_train = top_k(scores, ratio=selection_ratio, key="p_joint")
policy = dpo_train(target_policy, D_train)
```

DPO 的标准目标把偏好对 \((x,y_w,y_l)\) 转成一个二分类式的 log-ratio 训练问题：
$$
\mathcal{L}_{\mathrm{DPO}}(\theta)=-\mathbb{E}\left[\log\sigma\left(\beta\left(\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}-\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}\right)\right)\right].
$$
这个公式隐含了一个假设：\(y_w\) 的确比 \(y_l\) 更符合偏好。BeeS 关注的问题是，如果偏好标签由人类、LLM judge 或 reward model 产生，其中可能混入外生噪声 \(\zeta\)，那么训练会不断收到互相冲突的梯度。论文用线性奖励模型 \(r(x,y)=\langle\phi(x,y),\omega^*\rangle\) 做分析，指出噪声会抵消真实 margin，使最优 \(\omega\) 向原点收缩，即学到的偏好方向变弱。

为了抵消这种 shrinkage，BeeS 选择大边际样本。直觉是：如果 \(r(x,y_w)-r(x,y_l)\) 很大，噪声必须非常强才会翻转偏好；如果 margin 接近零，则 chosen / rejected 可能只是偶然排序，DPO 会浪费梯度甚至学到错误方向。论文把这一点称作 parameter inflation：选择大 margin 样本会让模型更确信当前偏好方向，从而给出更明确的参数更新。但单一 margin 来源并不可靠，尤其外部 reward model 在新分布上可能 OOD，因此 BeeS 不只看一个奖励模型。

BeeS 的两个核心 margin 是 external margin 与 implicit margin：
$$
m_{\mathrm{ex}}=r_{\mathrm{ex}}(x,y_w)-r_{\mathrm{ex}}(x,y_l),
$$
$$
m_{\mathrm{im}}=\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}-\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}.
$$
external margin 来自独立奖励模型，能提供外部偏好判断；implicit margin 来自经过少量 DPO 后的小模型，能反映当前数据分布内的偏好结构。论文观察到不同外部/隐式 margin 之间相关性弱，而不同规模模型算出的 implicit margin 相关性较强，因此用小模型预训练估算 implicit margin 是成本可控的。

多源聚合是 BeeS 的“Bee”所在。每个 margin \(m^i\) 先通过 clipping 映射成偏好方向正确的单源概率：
$$
p_i=\mathbb{P}(y_w>y_l\mid m^i)=\frac{\mathrm{clip}(m^i,L,U)-L}{U-L}.
$$
在条件独立近似下，多个来源的联合偏好概率为
$$
\mathbb{P}(y_w>y_l\mid m^1,\ldots,m^K)=\frac{\prod_{i=1}^{K}p_i}{\prod_{i=1}^{K}p_i+\prod_{i=1}^{K}(1-p_i)}.
$$
这个公式体现了一个严格策略：只要某个来源给出低置信度，联合概率就会明显下降。因此 BeeS 会优先保留“多个评估视角都认为 chosen 明显优于 rejected”的偏好对，而不是只相信一个高分 reward model。

训练流程上，BeeS 与 DPO 是解耦的。它先在全量偏好数据上打分和排序，然后把 top subset 送给普通 DPO；因此它能直接叠加到现有 DPO、iterative DPO 或其他偏好优化管线中。论文实验显示，在 TL;DR、HH、UltraFeedback 等任务上，随机选少量数据不稳定，单独按 external margin 或 implicit margin 选也可能在某些数据集上失败；BeeS 的聚合概率更稳健，经常用 2% 到 10% 的数据达到甚至超过全量 DPO。这个结论的含义不是“数据越少越好”，而是偏好数据中存在大量低 margin 或冲突样本，直接全量训练会把这些噪声也放大。

> ⚠️ 注意：BeeS 不会修复错误的 DPO 目标，也不生成新偏好；它只负责在训练前提高偏好对的信噪比。如果所有 margin 来源都同向偏差，贝叶斯聚合仍可能筛出系统性错误样本。

#### 🧪 练习题
```yaml
question: "BeeS 为什么要同时聚合 external margin 和 implicit DPO margin？"
options:
  - "为了让 DPO 训练完全不需要参考模型"
  - "因为单一奖励来源可能 OOD 或噪声较大，多源一致的大边际样本更可能是真正高质量偏好对"
  - "为了把 pairwise preference 任务改成多分类任务"
  - "因为 external margin 只用于推理阶段，不能参与训练前筛选"
answer: 1
explain: "BeeS 的核心是用多源 margin 估计偏好方向的联合置信度；任一来源低置信会降低聚合概率，从而过滤掉噪声或分布外样本。"
```
