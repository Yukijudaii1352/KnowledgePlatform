### DPO：直接偏好优化 (Direct Preference Optimization)

```yaml
id: dpo
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: "2023"
org: Stanford
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html
category: alignment
parent: rlhf
motivation: 直接偏好优化无需奖励模型
```

#### 📝 一句话总结

DPO 提出把 RLHF 中“先学奖励模型、再用 RL 优化策略”的两阶段流程改写成一个直接作用在偏好样本上的分类损失，解决了 PPO 式 RLHF 训练复杂、采样昂贵和稳定性敏感的问题。它的关键洞察是：在 KL 约束的奖励最大化目标下，语言模型本身可以被视为一个隐式奖励模型。

#### 🎯 核心要点

- 用单阶段策略训练替代传统 RLHF 的奖励模型训练与 PPO 强化学习优化。
- 基于 Bradley-Terry 偏好模型，把人类偏好概率直接写成新策略与参考策略的 log-ratio。
- 通过 KL 约束奖励最大化的闭式最优解，推导出隐式奖励函数 \(\hat r_\theta(x,y)=\beta\log \frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}\)。
- DPO 损失只需要离线偏好三元组 \((x,y_w,y_l)\)，不需要训练时从当前策略 rollout。
- 更新方向同时提高 preferred response 的相对概率、降低 dispreferred response 的相对概率，并按当前排序错误程度动态加权。
- 参考模型 \(\pi_{\mathrm{ref}}\) 通常取 SFT 模型，用于限制策略偏离原始语言分布。
- 实验覆盖情感控制、摘要和单轮对话，显示 DPO 可达到或超过 PPO-based RLHF 的偏好优化效果。

#### 🔬 深入细节

![DPO 与传统 RLHF 流程对比](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)
*图：传统 RLHF 需要显式奖励模型和强化学习循环；DPO 直接在偏好数据上做最大似然分类优化。*

```python
# DPO 核心训练伪代码：离线偏好三元组上直接优化策略
# D = [(prompt x, preferred y_w, rejected y_l)]
pi_ref = frozen_sft_model
pi_theta = trainable_sft_model
beta = kl_temperature

for batch in preference_loader(D):
    x, y_w, y_l = batch
    logp_w = log_prob(pi_theta, x, y_w)
    logp_l = log_prob(pi_theta, x, y_l)
    ref_logp_w = log_prob(pi_ref, x, y_w)
    ref_logp_l = log_prob(pi_ref, x, y_l)

    reward_gap = beta * ((logp_w - ref_logp_w) - (logp_l - ref_logp_l))
    loss = -log_sigmoid(reward_gap).mean()
    loss.backward()
    optimizer.step()
```

DPO 的出发点是传统 RLHF 的实际工程痛点。标准流程先用偏好数据训练奖励模型 \(r_\phi(x,y)\)，再让策略 \(\pi_\theta\) 通过 PPO 最大化奖励，同时用 KL 惩罚限制它不要偏离参考模型。这套流程强大但复杂：奖励模型可能被策略“钻空子”，PPO 需要在线采样，价值函数和 advantage 估计引入额外方差，训练超参也很敏感。DPO 的目标不是换一个奖励模型，而是证明在常用偏好建模假设下，可以把同一个 RLHF 目标直接变成监督学习形式。

传统 RLHF 的 KL 约束目标可写为：

$$
\max_{\pi}\;\mathbb{E}_{x\sim\mathcal{D},y\sim\pi(y\mid x)}[r(x,y)]-\beta D_{\mathrm{KL}}\left(\pi(y\mid x)\;\|\;\pi_{\mathrm{ref}}(y\mid x)\right)
$$

这个目标的最优策略有闭式形式：

$$
\pi_r(y\mid x)=\frac{1}{Z(x)}\pi_{\mathrm{ref}}(y\mid x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

把它反解，可以得到奖励函数的重参数化：

$$
r(x,y)=\beta\log\frac{\pi_r(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}+\beta\log Z(x)
$$

关键在于 Bradley-Terry 偏好模型只关心两个回答的奖励差。对于同一个 prompt \(x\)，归一化项 \(\beta\log Z(x)\) 在 \(y_w\) 与 \(y_l\) 的差分中抵消，因此不需要显式估计 partition function。于是，人类偏好“\(y_w\) 优于 \(y_l\)”的概率可以直接由策略 log-ratio 给出，而不是先由单独的 reward model 给出。

DPO 最终优化的负对数似然为：

$$
\mathcal{L}_{\mathrm{DPO}}(\pi_\theta;\pi_{\mathrm{ref}})
=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}\left[
\log\sigma\left(
\beta\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}
-\beta\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}
\right)
\right]
$$

这不是简单地把 \(y_w\) 做 SFT、把 \(y_l\) 做 unlikelihood。损失中的参考模型 log-ratio 让训练关注“相对参考模型的偏好提升”，而不是无约束地增加某个字符串概率。\(\beta\) 控制隐式 KL 强度：\(\beta\) 越大，模型越强烈地区分胜负样本；\(\beta\) 越小，更新更保守。由于 \(\pi_{\mathrm{ref}}\) 冻结，DPO 的每个 batch 都能离线计算，无需在训练中调用当前策略生成新回答。

从梯度角度看，DPO 会增加 \(\log\pi_\theta(y_w\mid x)\)，降低 \(\log\pi_\theta(y_l\mid x)\)，但样本权重由当前隐式奖励排序是否错误决定。若模型仍给 rejected answer 更高隐式奖励，\(\sigma(\hat r_\theta(x,y_l)-\hat r_\theta(x,y_w))\) 会较大，该样本更新更强；若模型已经明显偏好 \(y_w\)，更新自然变小。这解释了论文中“动态 per-example importance weight”的作用：它避免朴素概率比目标把模型推向退化的高概率模板。

与 PPO-based RLHF 相比，DPO 的优势主要来自去掉了在线 RL 环节。PPO 需要 reward model、value model、policy model、reference model 之间反复交互，还要控制 KL、clip、advantage、rollout 长度等细节；DPO 只保留 trainable policy 与 frozen reference policy。代价是 DPO 更依赖偏好数据覆盖：它不会主动探索新回答，也不会在训练中发现 reward model 未见过的模式。因此在实践中，DPO 适合已有高质量偏好对的对齐微调；若需要持续发现新风险，仍可能需要红队数据生成或在线反馈流程补充。

> 💡 关键：DPO 不是“没有奖励”，而是把奖励函数隐式地编码为策略相对参考策略的 log-ratio，因此语言模型同时扮演 policy 和 reward model。

#### 🧪 练习题

```yaml
question: "DPO 为什么可以绕过显式奖励模型训练？"
options:
  - "因为它只做普通 SFT，不使用偏好中的 rejected response"
  - "因为 Bradley-Terry 偏好概率可通过 KL 约束最优策略的 log-ratio 重参数化表示"
  - "因为它把 PPO 的 clip 操作替换成更大的 batch size"
  - "因为它完全移除了参考模型和 KL 约束"
answer: 1
explain: "DPO 利用 KL 约束奖励最大化目标的闭式最优策略，把奖励差转成策略相对参考策略的 log-ratio 差，从而直接在偏好对上优化分类损失。"
```
