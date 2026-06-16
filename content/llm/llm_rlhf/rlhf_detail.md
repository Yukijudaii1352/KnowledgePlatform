### RLHF：基于人类反馈的强化学习 (RLHF)

```yaml
id: rlhf
full_name: 基于人类反馈的强化学习 (RLHF)
year: "2017"
paper_url: https://arxiv.org/abs/1706.03741
motivation: 三阶段流程，PPO+奖励模型对齐
parent: "—"
category: foundational
```

#### 📝 一句话总结

Christiano 等人的《Deep Reinforcement Learning from Human Preferences》提出了“人类偏好比较 → 奖励模型 → 强化学习优化”的 RLHF 基本范式，用少量非专家偏好标注替代手写奖励函数来训练深度 RL agent。

#### 🎯 核心要点

- 将目标指定从“环境给出标量 reward”改为“人类比较两个短轨迹片段哪个更好”。
- 维护两个神经网络：策略 \(\pi\) 与奖励函数估计 \(\hat r(o,a)\)，前者优化行为，后者解释人类偏好。
- 三个异步过程协同运行：策略采样轨迹、系统选择轨迹片段对并请求人类比较、奖励模型用累计比较数据做监督学习。
- 奖励模型采用 Bradley-Terry/Luce-Shepard 风格的概率模型，用片段内预测奖励和的指数比例预测偏好概率。
- 奖励模型训练使用交叉熵损失，并支持“偏好片段 1、偏好片段 2、两者相当、无法比较”等反馈形式。
- 实际实现使用奖励模型 ensemble、bootstrap 采样、验证集正则化、dropout 和 10% 随机响应噪声来提升鲁棒性。
- 查询选择使用 ensemble disagreement 主动学习，优先询问奖励模型成员分歧大的轨迹片段对。
- 策略优化阶段把 \(\hat r\) 当作环境 reward，Atari 使用 A2C，MuJoCo 使用 TRPO；LLM 时代的 InstructGPT 后续把这一环节替换为 PPO。
- 论文在 Atari 与 MuJoCo 上展示少于 agent 环境交互 1% 的人类反馈即可训练复杂行为，部分新目标约一小时人工反馈即可完成。

#### 🔬 深入细节

![Deep RL from Human Preferences 方法示意图](https://ar5iv.labs.arxiv.org/html/1706.03741/assets/x1.png)
*图：论文 Figure 1 的方法示意，reward predictor 从轨迹片段比较中异步学习，agent 则最大化当前预测奖励。*

```python
# Deep RL from Human Preferences: high-level training loop
initialize policy pi
initialize reward_model r_hat
initialize preference_database D = []
initialize trajectory_buffer B = []

while training:
    # Process 1: policy interacts with environment.
    trajectories = rollout(policy=pi)
    B.extend(trajectories)

    # Process 2: ask humans to compare selected trajectory segments.
    candidate_pairs = sample_segment_pairs(B, length=1_to_2_seconds)
    query_pairs = select_by_ensemble_disagreement(candidate_pairs, r_hat)
    for sigma_1, sigma_2 in query_pairs:
        label = human_compare(sigma_1, sigma_2)  # prefer left, prefer right, tie, or skip
        if label != "incomparable":
            D.append((sigma_1, sigma_2, label))

    # Process 3: fit reward predictor to all collected preferences.
    train_reward_model(r_hat, D, loss="pairwise_cross_entropy")
    normalize_reward(r_hat)

    # Policy optimization uses predicted reward as if it were the environment reward.
    pi = rl_update(policy=pi, reward=lambda o, a: r_hat(o, a))
```

这篇论文解决的是奖励函数难以手写的问题，而不是一开始就面向大语言模型。传统深度 RL 假设环境每一步都返回 \(r_t\)，但现实任务常常只有人类能识别好坏，却很难把目标写成可微、可泛化、不可被 exploit 的奖励函数。论文的核心观察是：与其让人类实时给每一步打分，不如让人类比较两个 1 到 2 秒的行为片段；比较任务对非专家更自然，信息量也比单点状态评分更高。

形式化地，轨迹片段写作 \(\sigma=((o_0,a_0),\ldots,(o_{k-1},a_{k-1}))\)。人类给出 \(\sigma^1\succ\sigma^2\) 时，算法并不直接把它变成一个标量 reward，而是训练一个奖励预测器 \(\hat r\)，让片段累计预测奖励解释偏好概率：

$$
\hat P[\sigma^1 \succ \sigma^2] =
\frac{\exp\left(\sum_t \hat r(o_t^1,a_t^1)\right)}
{\exp\left(\sum_t \hat r(o_t^1,a_t^1)\right)+\exp\left(\sum_t \hat r(o_t^2,a_t^2)\right)}.
$$

这个模型可以理解为偏好学习里的 Bradley-Terry 模型：两个片段的“分数”是预测奖励之和，分数差越大，人类选择高分片段的概率越高。训练损失是对已收集比较数据库 \(\mathcal D\) 的交叉熵：

$$
\mathrm{loss}(\hat r)= -\sum_{(\sigma^1,\sigma^2,\mu)\in\mathcal D}
\mu(1)\log \hat P[\sigma^1\succ\sigma^2]
+\mu(2)\log \hat P[\sigma^2\succ\sigma^1].
$$

其中 \(\mu\) 是人类反馈转成的二项分布：若偏好左片段，\(\mu(1)=1\)；若偏好右片段，\(\mu(2)=1\)；若认为两者相当，则两边各 0.5；若无法比较则不写入数据库。这样做保留了“平局”这种有用信号，同时避免强迫人类在无意义比较中给出噪声标签。

实际系统不是简单地训练单个奖励模型。论文使用 reward predictor ensemble，每个成员从偏好数据库 bootstrap 采样训练，并保留约 \(1/e\) 的数据作为验证集来调节正则化强度；部分任务还使用 dropout。它还假设人类有 10% 概率随机作答，因此不会让 softmax 在奖励差极大时过度自信。这些细节很重要，因为奖励模型一旦过拟合，策略优化会主动寻找 \(\hat r\) 的漏洞，形成 reward hacking。

查询策略也是算法的重要组成。系统不会随机把所有轨迹片段都交给人类，而是先从 agent 当前生成的轨迹中采样大量候选片段对，再用 ensemble 成员分别预测偏好，优先选择预测方差大的片段对询问人类。这是一种近似主动学习：人类时间被花在奖励模型最不确定、最可能改变决策边界的位置上。论文也承认该启发式并非总是最优，但它体现了 RLHF 的一个核心工程原则：人类反馈是昂贵资源，必须被主动分配。

策略优化阶段与偏好建模阶段异步进行。agent 使用当前 \(\hat r(o,a)\) 产生的 reward 继续学习；新行为带来新轨迹；新轨迹产生新比较；新比较更新奖励模型。论文在 Atari 上用 A2C，在 MuJoCo 上用 TRPO，并对 \(\hat r\) 输出做零均值、固定方差归一化，因为偏好损失只决定 reward 的相对差异，无法确定绝对平移尺度。后续 LLM RLHF 继承了“奖励模型 + RL 优化”骨架，只是把环境交互变成 prompt-response bandit，把策略优化器通常换成 PPO 或 GRPO。

> ⚠️ 注意：任务元信息里提到“PPO+奖励模型对齐”，这是 LLM RLHF 里被广泛采用的后续形态；2017 年这篇 foundational paper 本身使用的是 A2C/TRPO，而不是 PPO。

#### 🧪 练习题

```yaml
question: "在 2017 年 Deep RL from Human Preferences 中，奖励模型如何从人类反馈中学习？"
options:
  - "直接把人类选择的片段赋值为 +1，未选择片段赋值为 -1，然后做普通回归"
  - "用两个轨迹片段的累计预测奖励构造偏好概率，并对人类比较标签最小化交叉熵"
  - "让人类为每个环境 step 打连续分数，再用这些分数训练 Q 函数"
  - "只收集专家完整演示轨迹，然后做行为克隆"
answer: 1
explain: "论文使用 Bradley-Terry 风格的 pairwise preference model，片段累计预测奖励决定偏好概率，并用交叉熵拟合人类比较。"
```
