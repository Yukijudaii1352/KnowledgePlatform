### 乐观Nash策略优化 (ONPO)

```yaml
id: onpo
full_name: 乐观Nash策略优化 (ONPO)
year: '2026'
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/eab6ea376caf12d786adbb0a090fb842-Abstract-Conference.html
motivation: 乐观Nash策略在线对齐
parent: dpo
category: direct_preference
```

#### 📝 一句话总结
ONPO 将 LLM 通用偏好对齐建模为两人零和博弈，并用 optimistic online mirror descent 做自博弈更新，以更快逼近 Nash policy 而不依赖 Bradley-Terry 奖励假设。

#### 🎯 核心要点
- 放弃传统 RLHF/DPO 的 BT reward assumption，直接使用 general preference oracle 的 pairwise preference signal。
- 把策略对齐写成对称两人零和博弈，目标是寻找对任意其他策略胜率至少 50% 的 Nash policy。
- 基于 self-play：当前 policy 与自身或历史 policy 比较，通过 online mirror descent 更新。
- ONPO 使用 optimistic OMD，两步更新中用上一轮 reward vector 作为 predictor，提高自博弈收敛速度。
- 理论上将 duality gap 从 INPO/普通 OMD 的 \(O(T^{-1/2})\) 改善到 \(O(T^{-1})\)，OpenReview 页面还报告 last-iterate 线性收敛性质。

#### 🔬 深入细节
公开页面/图源链接：[NeurIPS/OpenReview 论文页](https://openreview.net/forum?id=kZstGANG8D)，PDF 源：[arXiv:2502.16852](https://arxiv.org/pdf/2502.16852)。manifest 的 NeurIPS abstract 页面为最终出版入口，arXiv HTML 当前为模板残留，因此方法解读依据 PDF/OpenReview。

```python
# ONPO 自博弈乐观镜像下降伪代码
pi_aux = pi_initial
prev_reward = zeros_like_policy_scores()

for t in range(1, T + 1):
    # optimistic step: 用上一轮 reward 预测当前收益
    pi_t = argmax_policy(
        expected_score(policy, prev_reward)
        - (1 / eta) * KL(policy || pi_aux)
    )

    samples_a = pi_t.sample(prompts)
    samples_b = pi_t.sample(prompts)
    prefs = preference_oracle.compare(samples_a, samples_b)
    reward_t = estimate_win_rate_vector(prefs, comparator=pi_t)

    # correction step: 观察真实 reward 后更新辅助策略
    pi_aux = argmax_policy(
        expected_score(policy, reward_t)
        - (1 / eta) * KL(policy || pi_aux)
    )
    prev_reward = reward_t

return average_or_last_iterate_policy()
```

ONPO 的起点是对 BT 假设的反思。DPO 等方法通常假设存在一个标量 reward，使人类偏好符合 Bradley-Terry 形式；但真实偏好可能不可传递、上下文相关或包含多维价值冲突。ONPO 因此把偏好看成 oracle 给出的 pairwise 比较，而不是先压缩成单一奖励。

在博弈视角下，一个策略 \(\pi_1\) 与另一个策略 \(\pi_2\) 对战，收益 \(J(\pi_1,\pi_2)\) 是前者回答被偏好于后者回答的概率。对称零和结构下，Nash policy \(\pi^*\) 满足对任意 \(\pi\)，\(J(\pi^*,\pi)\ge 0.5\)。因此对齐目标变成最小化 duality gap，而不是最大化某个 reward model 分数。

普通 OMD 自博弈更新为 \(\pi_{t+1}=\arg\max_\pi \langle \pi,r_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\|\pi_t)\)，其中 \(r_t(y)=P(y\succ \pi_t)\)。ONPO 的 optimistic 版本引入 predictor \(m_t\)，先用预测收益得到 \(\pi_t\)，再用真实收益 \(r_t\) 更新辅助策略 \(\pi'_{t+1}\)。论文建议用上一轮 reward 作为 \(m_t\)，因为 KL 稳定项让相邻轮收益变化较小。

这种“乐观”更新利用了自博弈收益变化的可预测性。理论分析中，optimistic OMD 的 regret bounded by variation in utilities 性质可以抵消收益变化项，使 duality gap 收敛从 \(O(T^{-1/2})\) 提升到 \(O(T^{-1})\)。实现上，ONPO 仍可通过偏好数据上的 loss 直接优化策略，因此比显式估计每个回答期望胜率更轻量。

> 💡 关键：ONPO 的创新不是换一个 reward model，而是把对齐目标从“拟合标量奖励”改为“在通用偏好博弈中逼近 Nash 策略”。

#### 🧪 练习题
```yaml
question: "ONPO 相比 INPO/普通 OMD 的核心改动是什么？"
options:
  - "使用 optimistic OMD 的预测-校正两步更新"
  - "恢复 Bradley-Terry 标量奖励假设"
  - "只训练 reward model 不更新 policy"
  - "把所有偏好比较改成单标签分类"
answer: 0
explain: "ONPO 用上一轮 reward 作为 predictor 做乐观镜像下降，因此能更好利用自博弈结构并改善 duality gap 收敛率。"
```
