### VAPO：价值增强策略优化 (Value-Augmented Policy Optimization)

```yaml
id: vapo
name: VAPO
full_name: 价值增强策略优化 (Value-Augmented Policy Optimization)
year: "2025.04"
org: ByteDance / Tsinghua
paper_url: https://arxiv.org/abs/2504.05118
category: frontier_2026
parent: grpo
motivation: 长度自适应GAE解决奖励稀疏
```

#### 📝 一句话总结

VAPO 提出面向长链式推理的 value-model-based augmented PPO 框架，通过价值模型预热、Decoupled-GAE、Length-Adaptive GAE、非对称 clipping、token-level loss 与正例 LM loss，解决长 CoT RL 中价值偏置、序列长度异质和稀疏奖励衰减问题。

#### 🎯 核心要点

- 回到 value-based PPO 路线：相对 GRPO/DAPO 的 value-model-free 组内基线，VAPO 重新引入 value model 做细粒度 credit assignment
- Value-Pretraining：用 reward model 初始化并预热 value network，缓解 PPO 在长 CoT 任务中 critic 初值偏置导致的崩溃
- Decoupled-GAE：critic 用 \(\lambda_{\text{critic}}=1.0\) 学 return，policy 用独立 \(\lambda_{\text{policy}}\) 计算优势，避免一个 GAE 参数同时服务两种目标
- Length-Adaptive GAE：按输出长度 \(l\) 设置 \(\lambda_{\text{policy}}=1-\frac{1}{\alpha l}\)，让长短回答的 TD-error 权重更均衡
- Token-level Policy Gradient Loss：按 token 聚合 PPO loss，而不是按样本平均，减少长序列梯度被样本级归一化稀释的问题
- Clip-Higher：使用非对称裁剪区间 \(\epsilon_{\text{high}}=0.28,\epsilon_{\text{low}}=0.2\)，鼓励对正优势 token 做更充分的策略提升
- Positive Example LM Loss：对 RL 采样中判定正确的回答额外加 NLL imitation loss，提高稀疏正奖励样本利用率
- Group-Sampling：每次采样更少 prompt、每个 prompt 多次生成，论文设置为 512 prompts × 16 samples，增强同题正负对比信号

#### 🔬 深入细节

##### 核心示意图

![VAPO AIME 2024 训练曲线](https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/score.png)
*图：论文 Figure 1。VAPO 在 Qwen 32B base 上的 AIME 2024 分数随训练步数上升，论文报告 5,000 步内达到约 60.4，超过同设置下的 DAPO 与 DeepSeek-R1-Zero-Qwen-32B 报告结果。*

![VAPO 训练动态曲线](https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/length.png)
*图：论文 Figure 2(a) 的图源之一，展示训练中的平均响应长度。论文还提供 reward 与 entropy 曲线：`https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/reward.png`、`https://arxiv.org/html/2504.05118v3/extracted/6352862/fig/entropy.png`。*

##### 算法伪代码

```python
# VAPO: value-model-based augmented PPO for long-CoT reasoning
actor = init_policy(qwen_32b_base)
critic = init_value_from_reward_model(reward_model)

# 1. Value-Pretraining / warmup
for step in range(50):
    prompts = sample_prompts()
    responses = actor.generate(prompts)
    rewards = verifier_or_reward_model(prompts, responses)
    returns = compute_returns(rewards, gamma=1.0, lambda_critic=1.0)
    update_value_model(critic, returns)

for update in range(num_updates):
    # 2. Group-Sampling: fewer prompts, more generations per prompt
    prompts = sample_prompts(num_prompts=512)
    groups = actor_old.generate(prompts, samples_per_prompt=16)
    rewards = verifier_or_reward_model(prompts, groups)

    for response in groups:
        length = len(response.tokens)
        lambda_policy = 1.0 - 1.0 / (alpha * length)  # alpha = 0.05

        deltas = td_errors(critic, response, rewards, gamma=1.0)
        adv_policy = gae(deltas, gamma=1.0, lambda_=lambda_policy)
        ret_critic = gae(deltas, gamma=1.0, lambda_=1.0)

        ratio = actor.prob(response.tokens) / actor_old.prob(response.tokens)
        clipped = clip(ratio, 1 - eps_low, 1 + eps_high)
        ppo_loss_tokens = -min(ratio * adv_policy, clipped * adv_policy)

        if response.is_correct:
            nll_loss = -mean(actor.logprob(response.tokens))
        else:
            nll_loss = 0.0

        actor_loss = mean_over_tokens(ppo_loss_tokens) + mu * nll_loss
        critic_loss = mse(critic.values(response), ret_critic)
        update(actor, critic, actor_loss, critic_loss)
```

##### 1. 动机：为什么要从 GRPO/DAPO 回到 value model

GRPO 和 DAPO 的价值在于去掉 critic，用同一 prompt 的多条采样奖励做组内相对优势，训练更简单、显存更低，也避免 value model 在复杂推理任务中不稳定。但 VAPO 的判断是：value-model-free 方法牺牲了 token 级 credit assignment 的上限。长 CoT 推理里，一个最终正确/错误的 verifier reward 很稀疏，如果所有 token 共享同一个组内 advantage，模型很难知道哪些中间推理动作真正贡献了最终答案。

VAPO 因此回到 value-model-based PPO，但不是直接复用 vanilla PPO。论文指出长 CoT PPO 失败主要来自三类问题：value model bias、heterogeneous sequence lengths、sparse reward signals。VAPO 的七个改动基本都围绕这三点展开。

##### 2. Value-Pretraining 与 Decoupled-GAE：先让 critic 能用

Vanilla PPO 在长推理任务上容易崩溃，一个原因是 value model 初期估计严重偏置，策略更新会被错误优势牵引。VAPO 用 reward model 初始化 value network，并在 policy training 前做 50 步 warmup，让 critic 先学到相对合理的 return 估计。

接着，VAPO 采用 Decoupled-GAE。传统 PPO 往往用同一个 \(\lambda\) 同时服务 critic 的 return target 和 actor 的 advantage target；但这两个目标的偏差-方差取舍不同。VAPO 让 critic 用 \(\lambda_{\text{critic}}=1.0\) 学更完整的回报，让 policy 用另一个 \(\lambda_{\text{policy}}\) 控制优势估计平滑度。

设 TD-error 为：

$$
\delta_t=r_t+\gamma V(s_{t+1})-V(s_t).
$$

critic target 更接近完整 return：

$$
\hat{A}^{\text{critic}}_t=
\sum_{k=t}^{T}(\gamma\lambda_{\text{critic}})^{k-t}\delta_k,
\quad \lambda_{\text{critic}}=1.0.
$$

policy advantage 则使用独立参数：

$$
\hat{A}^{\text{policy}}_t=
\sum_{k=t}^{T}(\gamma\lambda_{\text{policy}})^{k-t}\delta_k.
$$

##### 3. Length-Adaptive GAE：让长回答末端奖励不要指数衰减掉

长 CoT 的一个特殊问题是响应长度差异巨大。若固定 \(\lambda_{\text{policy}}=0.95\)，长度超过 100 的序列中，远端 TD-error 权重约为 \(0.95^{100}\approx0.006\)，几乎无法把最终 verifier reward 回传到早期推理 token。结果是长回答的优势估计会被 bootstrap value 主导，而不是被真实最终奖励主导。

VAPO 的 Length-Adaptive GAE 让 \(\lambda_{\text{policy}}\) 随序列长度 \(l\) 增大。论文设计几何系数和与长度成比例：

$$
\sum_{t=0}^{\infty}\lambda_{\text{policy}}^t
\approx
\frac{1}{1-\lambda_{\text{policy}}}
=\alpha l.
$$

解得：

$$
\lambda_{\text{policy}}=1-\frac{1}{\alpha l},
\quad \alpha=0.05.
$$

直觉是：短回答不需要很大的 \(\lambda\)，否则方差偏高；长回答需要更大的 \(\lambda\)，否则最终奖励传不到前面。这个长度自适应参数把长短序列的 credit assignment 拉到同一尺度。

##### 4. Token-level PPO loss 与 Clip-Higher：按 token 稳定推进策略

VAPO 使用非对称 PPO 裁剪：

$$
\mathcal{L}_{\text{PPO}}(\theta)=
-\frac{1}{\sum_{i=1}^{G}|o_i|}
\sum_{i=1}^{G}\sum_{t=1}^{|o_i|}
\min\left(
r_{i,t}(\theta)\hat{A}_{i,t},
\text{clip}\left(r_{i,t}(\theta),1-\epsilon_{\text{low}},1+\epsilon_{\text{high}}\right)\hat{A}_{i,t}
\right).
$$

其中 \(r_{i,t}(\theta)=\pi_\theta(a_t\mid s_t)/\pi_{\theta_{\text{old}}}(a_t\mid s_t)\)，论文设置 \(\epsilon_{\text{high}}=0.28\)、\(\epsilon_{\text{low}}=0.2\)。上界更宽意味着当 token 的优势为正时，策略可以更充分提高该 token 概率；下界保持较保守，避免过度压低概率造成不稳定。

分母使用所有 token 数 \(\sum_i |o_i|\)，这就是 token-level policy gradient loss。相比 sample-level loss，它不会让一条很长的 CoT 只贡献和短回答同等的样本权重；对长推理而言，更多关键决策 token 应该产生更多训练信号。

##### 5. Positive Example LM Loss：稀疏正奖励要被充分利用

数学推理 RL 的正样本很稀少，尤其在训练早期，大多数采样回答是错的。如果只靠 PPO 把错误样本概率压低，学习效率会很差；一旦采样到正确答案，应该像 imitation learning 一样更强地利用它。

VAPO 对正确回答集合 \(\mathcal{T}\) 加入 NLL：

$$
\mathcal{L}_{\text{NLL}}(\theta)=
-\frac{1}{\sum_{o_i\in\mathcal{T}}|o_i|}
\sum_{o_i\in\mathcal{T}}\sum_{t=1}^{|o_i|}
\log\pi_\theta(a_t\mid s_t).
$$

最终 actor 目标为：

$$
\mathcal{L}(\theta)=
\mathcal{L}_{\text{PPO}}(\theta)
+\mu\mathcal{L}_{\text{NLL}}(\theta),
$$

论文实验中 positive-example LM loss 权重为 \(0.1\)。这相当于给 verifier 判定正确的轨迹额外一条监督学习通道，使稀疏奖励不会只以高方差 policy gradient 的形式进入模型。

##### 6. Group-Sampling 与实验结果

在固定计算预算下，VAPO 选择每轮更少 prompt、每个 prompt 多次生成。论文设置为 512 个 prompt，每个 prompt 采样 16 次。这样同一题内更容易同时出现正确/错误、长/短、不同推理路径的样本，critic 和 policy 都能看到更有辨别度的局部对比。

实验部分用 Qwen 32B base，在 AIME24 avg@32 上比较。论文报告 vanilla PPO 后期只有约 5 分，DeepSeek-R1-Zero-Qwen-32B 约 47，DAPO 约 50，而 VAPO 达到约 60.4。消融也显示各组件都有贡献：去掉 Value-Pretraining 会回到崩溃，去掉 Decoupled-GAE 会让长回答 reward 信号衰减，去掉 Length-Adaptive GAE、Clip-Higher、Token-level Loss、Positive Example LM Loss 和 Group-Sampling 都会带来不同幅度下降。

> ⚠️ 注意：VAPO 的核心不是单个新公式，而是一组专门为长 CoT PPO 稳定性设计的工程化组合；其中 Length-Adaptive GAE 直接对应 manifest 中“长度自适应GAE解决奖励稀疏”的动机。

#### 🧪 练习题

```yaml
question: "VAPO 中 Length-Adaptive GAE 的主要目的是什么？"
options:
  - "让所有回答都使用固定 lambda=0，从而完全移除 value model"
  - "根据响应长度调整 lambda_policy，避免长 CoT 中最终奖励信号在 GAE 回传时指数衰减过快"
  - "把 PPO 的裁剪上界和下界设成完全相同"
  - "只对错误回答加入额外 NLL loss"
answer: 1
explain: "固定 lambda=0.95 时，长序列远端奖励权重会快速衰减；VAPO 用 lambda_policy=1-1/(alpha l) 让长回答保留更长的 credit assignment 路径。"
```
