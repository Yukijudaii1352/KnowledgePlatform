### 强化学习规模定律 (RL Scaling Laws)
```yaml
id: rl_scaling
name: RL Scaling Laws
full_name: 强化学习规模定律 (RL Scaling Laws)
year: "2026"
org: 多机构
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
category: scaling
parent: kaplan_scaling
motivation: 强化学习阶段能力-计算量预测
```

#### 📝 一句话总结
RL Scaling Laws 将 LLM 强化学习后训练的验证奖励随 GPU 小时增长的轨迹拟合为可外推的饱和 S 曲线，并据此提出 ScaleRL 配方来预测和筛选真正能在大算力下继续提升的 RL 方法。它解决了 RL 后训练长期依赖经验试错、缺少类似预训练缩放律的能力-算力预测框架的问题。

#### 🎯 核心要点
- 将 RL 后训练性能建模为验证集期望奖励 \(R_C\) 与训练算力 \(C\) 之间的 sigmoid-like 饱和曲线。
- 曲线参数可解释：\(A\) 表示大算力极限下的性能上限，\(B\) 表示计算效率/上升斜率，\(C_{\text{mid}}\) 表示达到一半收益所需的中点算力。
- 通过早期训练段拟合曲线，外推更长训练后的表现，从而避免每个候选 RL recipe 都跑到极大算力。
- 系统消融异步 RL、off-policy 程度、损失函数、logit 精度、loss aggregation、advantage normalization、prompt filtering 和长度控制等设计轴。
- 提出 ScaleRL 配方：PipelineRL-8、CISPO 截断重要性采样、prompt-level loss aggregation、batch-level advantage normalization、FP32 logits、zero-variance filtering、No-Positive-Resampling 和 interruption-based length control。
- 在超过 400,000 GPU-hours 的研究预算下验证，并展示 8B dense 与 17B x 16 MoE 规模上可用早期曲线预测 100k GPU-hours 级别训练。
- 与 GRPO/DAPO、DeepSeek-style、Qwen-style、Magistral、MiniMax-M1 等常见 recipe 相比，ScaleRL 在论文实验中同时具备更好的可扩展性和更高的渐近奖励。

#### 🔬 深入细节

![ScaleRL 100k GPU-hours 可预测缩放曲线](https://arxiv.org/html/2510.13786v1/paper_figs/100k.png)
*图：论文用早期验证集 pass rate 拟合 sigmoid 曲线，并外推到更长的 RL 训练预算，展示 ScaleRL 在 8B dense 与 MoE 模型上的预测能力。*

任务 JSON 给出的 `paper_url` 是缩放律综述页；这里的精读对象是其中对应的 ICLR 2026 论文 *The Art of Scaling Reinforcement Learning Compute for LLMs*，arXiv 链接为 `https://arxiv.org/abs/2510.13786`。这篇论文关注的不是传统 RL 环境中的 sample complexity，而是现代 LLM 在 SFT 之后继续用 verifiable reward 或偏好信号做 RL post-training 时，怎样判断一个训练 recipe 是否值得放大到数万甚至十万 GPU 小时。

```python
# ScaleRL / RL Scaling Laws 核心伪代码
# 目标：用早期 RL 曲线预测大算力表现，并选择可扩展 recipe

for recipe in candidate_rl_recipes:
    initialize_policy_from_sft_or_base_model()
    C, validation_rewards = [], []

    while gpu_hours < small_or_medium_budget:
        # PipelineRL: generators 持续采样，trainers 异步更新
        prompts = sample_training_prompts()
        rollouts = generate_G_responses(policy_old, prompts)
        rewards = verifier_or_rule_reward(rollouts)

        # 过滤无梯度或已过易样本
        rollouts = drop_zero_variance_prompts(rollouts, rewards)
        prompts = drop_prompts_with_historical_pass_rate_ge_0_9(prompts)

        # 计算 batch-level normalized advantages
        advantages = normalize_advantages_across_batch(rewards)

        # CISPO / truncated importance sampling policy gradient
        rho = pi_train_theta(rollouts) / pi_gen_old(rollouts)
        loss = -mean(stop_grad(min(rho, epsilon)) * advantages * logprob_theta(rollouts))
        update_policy(loss, fp32_logits=True)

        if step % eval_interval == 0:
            R_C = evaluate_mean_at_16_on_iid_validation(policy)
            C.append(current_gpu_hours())
            validation_rewards.append(R_C)

    # 用早期曲线拟合 A, B, C_mid，再外推到大预算
    params = fit_sigmoid_scaling_law(C, validation_rewards)
    predicted_large_scale_reward = predict_reward(params, target_gpu_hours)
    rank_recipe(recipe, predicted_large_scale_reward, params.A, params.B)
```

论文的核心缩放公式是一个饱和 S 曲线，而不是预训练中常见的幂律损失下降。设 \(R_0\) 是起始策略的验证奖励，\(R_C\) 是消耗训练算力 \(C\) 后的验证奖励，公式为：

$$
R_C - R_0 = (A-R_0)\times \frac{1}{1+(C_{\text{mid}}/C)^B}.
$$

等价地：

$$
R_C = R_0 + \frac{A-R_0}{1+(C_{\text{mid}}/C)^B}.
$$

这个形式非常适合 RL 后训练，因为验证 reward 或 pass rate 是有上界的。预训练 NLL 可以在很宽范围内用幂律持续下降，而 RL reward 往往经历三个阶段：初期变化慢或不稳定，中期快速上升，后期接近任务和 recipe 允许的性能上限。参数 \(A\) 衡量“最终天花板”，\(B\) 和 \(C_{\text{mid}}\) 衡量“多快接近天花板”。因此两个方法在小预算下谁更强并不一定重要，更重要的是拟合出来的 \(A\) 和效率参数是否能支撑大预算外推。

ScaleRL 的训练目标来自 off-policy policy-gradient 家族。生成器用旧策略 \(\pi^{\theta_{old}}_{gen}\) 产生回答，训练器用当前策略 \(\pi^\theta_{train}\) 更新，因此每个 token 都有重要性采样比率：

$$
\rho_{i,t}(\theta)=\frac{\pi^\theta_{train}(y_{i,t}\mid x,y_{i,<t})}{\pi^{\theta_{old}}_{gen}(y_{i,t}\mid x,y_{i,<t})}.
$$

论文最终采用 CISPO 思路，把重要性采样比率截断后放入 REINFORCE 风格目标。简化写法如下：

$$
\mathcal{J}_{\text{ScaleRL}}(\theta)=\mathbb{E}\left[\frac{1}{\sum_g |y_g|}\sum_{i=1}^{G}\sum_{t=1}^{|y_i|}\text{sg}(\min(\rho_{i,t},\epsilon))\hat{A}^{\text{norm}}_i\log \pi^\theta_{train}(y_{i,t})\right].
$$

这里 \(\text{sg}\) 是 stop-gradient，\(\hat{A}^{\text{norm}}_i\) 是 batch-level 标准化后的优势。直觉上，CISPO 保留了“好的回答增加概率、坏的回答降低概率”的策略梯度方向，但用截断 \(\min(\rho,\epsilon)\) 避免 off-policy 采样比率爆炸。论文发现 GSPO/CISPO 相比 DAPO 能提高渐近 pass rate，其中 CISPO 后期略优，因此被纳入 ScaleRL。

ScaleRL 的工程配方同样关键。PipelineRL-8 让生成器和训练器异步流水工作，减少等待，并允许最多 8 steps 的 off-policyness；FP32 logits 修复生成端和训练端 kernel 数值差异，因为微小概率误差会直接放大到 \(\rho\)；prompt-level loss aggregation 让每个 prompt 而不是每个 rollout 或 token 主导梯度权重；batch-level advantage normalization 让不同 prompt 的奖励尺度更稳定；zero-variance filtering 丢弃同一 prompt 所有样本全对或全错的批内样本，因为这些样本优势为零，不贡献有效策略梯度；No-Positive-Resampling 则把历史 pass rate \(\ge 0.9\) 的过易 prompt 从后续 epoch 中移除，避免把 RL 算力浪费在已经学会的题目上。

> 💡 关键：这篇论文中的“scaling law”不是直接告诉你参数量和 token 数如何配比，而是告诉你一个 RL recipe 的 reward-算力曲线是否可预测、上限多高、到达上限多快。它更像一个大规模 RL 方法筛选器。

与预训练缩放律相比，RL scaling 的困难在于算法选择会改变曲线形状。预训练中很多配置差异最后可以折算成 loss 曲线的平移，但 RL 中一个不稳定 recipe 可能早期看起来很好，放大后却撞到低天花板。论文强调“small compute winner”并不一定是“large compute winner”，所以要用早期曲线拟合 \(A,B,C_{\text{mid}}\) 后再比较。这个框架允许研究者用较小预算消融设计，再把最有前途的 recipe 放大到 100k GPU-hours，而不是靠一次性赌博式大训练。

实验部分显示，ScaleRL 在 iid validation 上的曲线可以从较早阶段外推到更长训练，并且下游 AIME-24 等评估也呈现一致增长趋势。论文还分析了模型规模、生成长度、global batch size、每 prompt 生成数、数学与代码多任务等轴，发现 sigmoid compute-performance 关系不只适用于单一设置。限制也很明确：这仍主要在可验证数学/代码类任务上建立，未来需要把模型大小、预训练 compute、RL 数据量、奖励模型质量和多轮 agent 环境纳入统一更高维的 RL 缩放律。

#### 🧪 练习题
```yaml
question: "在 RL Scaling Laws 中，参数 A 的主要含义是什么？"
options:
  - "当前 batch 的平均 advantage"
  - "训练曲线在大算力极限下可达到的渐近 reward/pass rate"
  - "每次 rollout 的最大生成长度"
  - "训练数据中 prompt 的数量"
answer: 1
explain: "论文用 sigmoid 曲线拟合 reward-算力关系，A 表示大算力极限下的性能上限；B 和 C_mid 更侧重描述接近该上限的效率。"
```
