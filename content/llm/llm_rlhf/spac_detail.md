### SPAC：自博弈对抗Critic (SPAC)

```yaml
id: spac
full_name: 自博弈对抗Critic (SPAC)
year: 2024
paper_url: https://arxiv.org/abs/2406.04274
motivation: 自博弈对抗Critic离线对齐
parent: dpo
category: direct_preference
```

#### 📝 一句话总结
SPAC 将离线偏好优化表述为 learner policy 与 adversarial critic 的 Stackelberg 自博弈，用 on-average pessimism 在离线数据覆盖不足时抑制过乐观更新，同时通过 DPO 式变量替换得到可扩展的单时间尺度 LLM 对齐算法。

#### 🎯 核心要点
- 面向离线偏好数据：不依赖在线人工反馈或在线 reward rollout，目标是在固定 preference dataset 上对齐语言模型。
- Stackelberg 博弈视角：policy 是 leader，critic 是 follower；policy 试图提升悲观奖励，critic 负责维持对当前 policy 的悲观评估。
- On-average pessimism：不估计每个 `(x,y)` 的点态 reward lower bound，而是约束当前 policy 分布下的期望奖励下界。
- 单策略 concentrability 保证：理论上在比全覆盖更弱的数据覆盖假设下收敛到近优策略。
- DPO 式变量替换：把显式 reward/critic 改写为 policy log density ratio，使算法能接到现有 DPO/SPIN/RLHF 代码栈。
- 单时间尺度 self-play：每轮用当前 policy 生成响应，再用离线偏好数据和自生成样本的 critic 项更新下一轮 policy。

#### 🔬 深入细节
![SPAC 自博弈流程示意](https://quickchart.io/graphviz?format=svg&graph=digraph%20G%20%7Brankdir%3DLR%3Bnode%5Bshape%3Dbox%2Cstyle%3D%22rounded%2Cfilled%22%2Cfillcolor%3D%22%23EEF6FF%22%5D%3BData%5Blabel%3D%22Offline%20preference%20data%5Cn(x%2C%20y%2B%2C%20y-)%22%5D%3BPolicy%5Blabel%3D%22Current%20policy%20pi_t%22%5D%3BGen%5Blabel%3D%22Self-play%20responses%5Cny%27%20~%20pi_t(.%7Cx)%22%5D%3BCritic%5Blabel%3D%22Adversarial%20critic%5Cnon-average%20pessimism%22%5D%3BUpdate%5Blabel%3D%22DPO-style%20policy%20update%5Cnpreference%20loss%20%2B%20critic%20penalty%22%5D%3BNext%5Blabel%3D%22Next%20policy%20pi_%7Bt%2B1%7D%22%5D%3BData-%3EUpdate%3BPolicy-%3EGen%3BGen-%3ECritic%3BCritic-%3EUpdate%3BUpdate-%3ENext%3BNext-%3EPolicy%3B%7D)
*图：原论文没有提供模型框架 Figure；上图根据论文 Algorithm 2 与 Section 3 的 Stackelberg self-play 描述远程渲染，展示离线偏好数据、自生成响应、对抗 critic 与 DPO 式 policy update 的关系。*

```python
# SPAC practical self-play loop，概括论文 Algorithm 2
pi_t = initial_sft_policy
for t in range(T):
    # 1. self-play: 当前策略在 prompt 上生成候选响应
    generated = []
    for x in prompts_from_preference_data:
        y_prime = sample(pi_t, x)
        generated.append((x, y_prime))

    # 2. 用 DPO 式 log density ratio 表示隐式 critic / reward
    #    preference_loss 来自离线 (x, y+, y-)；critic_penalty 来自 y' ~ pi_t
    for batch in training_batches:
        pref = -log_sigmoid(beta * (log_ratio(pi, batch.y_plus) - log_ratio(pi, batch.y_minus)))
        pessimism = mean(log(pi(y_prime|x)) - log(pi_t(y_prime|x)) for x, y_prime in generated)
        loss = pref + lambda_ * pessimism
        optimizer.step(loss)

    pi_t = updated_policy(pi)
return average_or_last_policy(pi_t)
```

SPAC 处理的问题比普通 DPO 更偏理论：离线偏好数据的覆盖通常很稀疏，模型没有机会在线探索并修正错误估计。经典离线 RL 告诉我们，如果算法对未覆盖区域过于乐观，就会把 policy 推向数据中没有可靠证据支持的行为。DPO、IPO、KTO 等直接偏好优化方法在实践中有效，但它们通常不保证在稀疏覆盖下收敛到最优策略；另一方面，已有带严格保证的偏好优化算法又往往要构造复杂置信集，不适合 7B 级 LLM 训练。

SPAC 的核心思想是把离线 preference optimization 写成一个 Stackelberg game。leader 是 learner policy，它希望在 critic 给出的奖励估计下变好；follower 是 adversarial critic，它并不是帮 policy 找最高分解释，而是维护一个对当前 policy 足够悲观的 reward estimate。论文强调这种悲观性是 on-average 的：不要求对每个样本点都给出 lower bound，而是要求在当前 learner policy 诱导的分布上，期望奖励不要被高估。这样比点态悲观更容易优化，也更适合神经网络函数逼近。

抽象地看，SPAC 的 policy update 可理解为：

$$
\pi_{t+1}\approx\arg\min_{\pi}\;\mathcal{L}_{\mathrm{pref}}(\pi;\mathcal{D})
+\lambda\,\widehat{\mathbb{E}}_{x\sim\mathcal{D},\;y'\sim\pi_t(\cdot\mid x)}
\left[\log\frac{\pi(y'\mid x)}{\pi_t(y'\mid x)}\right]
$$

第一项是离线偏好对上的 DPO-like ranking loss，推动 `y+` 相对 `y-` 的 log density ratio 变大。第二项来自 adversarial critic：如果新策略 `π` 试图显著增加当前策略自生成回答 `y'` 的概率，就会付出惩罚；只有当偏好数据给出足够证据时，这种移动才值得。这个项的直觉类似离线 RL 中的 pessimism：不要因为函数逼近器的外推误差，就在数据支撑不足的区域自信地提高概率。

理论版 SPAC-T 先显式维护 reward/critic 函数类，并用 mirror descent 更新 policy：

$$
\pi_{t+1}(y\mid x)\propto \pi_t(y\mid x)\exp(\eta f_t(x,y))
$$

其中 `f_t` 是当前轮由偏好数据和悲观正则共同确定的 critic。实践版 SPAC 则借鉴 DPO 的变量替换，把 reward 写成 policy log-ratio，从而不需要单独训练一个 reward model 或显式 critic network。这一步很重要：它把原本双层、双时间尺度的 actor-critic 结构压成一个可在现有 DPO 代码上实现的单时间尺度目标。

论文的 Algorithm 2 每轮用 `π_t` 对 prompt 生成一个 response `y_j'`，然后在更新 `π_{t+1}` 时使用 `log(π(y_j'|x_j)/π_t(y_j'|x_j))` 形式的 critic penalty。作者还说明实践中可以把 chosen 与 rejected responses 都用于估计这个 log density ratio，并用 log-sigmoid 平滑来避免理论上很大的 `λ=Θ(C√n)` 带来数值不稳定。理论结论给出在 single-policy concentrability 下的近优收敛，忽略常数与对数项后 suboptimality 以如下速率下降：

$$
\widetilde{O}\left(\sqrt{\frac{1}{n}}+\sqrt{\frac{1}{T}}\right)
$$

其中 `n` 是离线数据规模，`T` 是 self-play 迭代轮数。这个结果说明 SPAC 的贡献不是单纯提出一个新的 DPO loss，而是在“可扩展实现”和“离线 RL 式可证明悲观性”之间建立连接。

> 💡 关键：SPAC 把直接偏好优化重新解释为离线 RL 的悲观自博弈。policy 不是盲目最大化偏好分类边界，而是在 adversarial critic 约束下，只对离线数据足够支持的方向增加概率。

#### 🧪 练习题
```yaml
question: "SPAC 中 adversarial critic 的主要作用是什么？"
options:
  - "替代 tokenizer 以减少序列长度"
  - "在离线数据覆盖不足时提供 on-average pessimism，抑制过乐观 policy 更新"
  - "把所有 rejected responses 从训练集中删除"
  - "让模型只模仿 reference policy，不学习偏好差异"
answer: 1
explain: "SPAC 的 critic 作为 Stackelberg game 的 follower，维护当前 policy 分布下的悲观奖励估计，使离线偏好优化不轻易外推到缺乏数据支撑的区域。"
```
