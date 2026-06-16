### MiniMax-M1：混合注意力推理模型 (MiniMax-M1)
```yaml
id: minimax_m1
name: MiniMax-M1
full_name: 混合注意力推理模型 (MiniMax-M1)
year: '2025.06'
org: MiniMax
paper_url: https://arxiv.org/abs/2506.13585
category: long_context
parent: minimax01
motivation: 混合MoE支持测试时扩展
```

#### 📝 一句话总结
MiniMax-M1 在 MiniMax-Text-01 的 456B/45.9B 激活混合注意力 MoE 底座上，通过 CISPO 强化学习和分阶段长思维扩展，让测试时生成长度扩到 40K/80K，同时把长序列推理 FLOPs 显著低于纯 Softmax 推理模型。它解决的是“长推理越有效但越贵”的矛盾：用 Lightning Attention 降 rollout 成本，用 RL 让模型学会利用更长思维预算。

#### 🎯 核心要点
- 模型底座来自 MiniMax-Text-01：456B 总参数、45.9B activated、32 experts，每 7 个 Lightning Attention block 后接 1 个 Softmax Attention block。
- 原生支持 1M input context，并发布 MiniMax-M1-40k 与 MiniMax-M1-80k 两个 thinking budget 版本。
- Figure 1 报告相对 DeepSeek-R1，M1 在 64K 生成长度下 FLOPs 低于 50%，100K 生成长度下约为 25%。
- 提出 CISPO：不再像 PPO/GRPO 那样裁剪 token update，而是裁剪 importance sampling weight，从而保留所有 token 的梯度贡献。
- RL 数据覆盖数学、逻辑、竞赛编程、软件工程 sandbox 和通用任务；可验证任务用规则/执行奖励，开放任务用生成式 reward model。
- 针对混合注意力 RL 的工程问题，修复训练/推理 kernel 概率不一致、AdamW 超参数敏感、重复高概率 token 造成的病态长输出。
- 80K 训练采用 staged window expansion：40K → 48K → 56K → 64K → 72K → 80K，并用困惑度收敛和 99 分位输出长度判断何时扩窗。

#### 🔬 深入细节
![MiniMax-M1 基准性能对比](https://arxiv.org/html/2506.13585v1/x1.png)
*图：MiniMax-M1 Figure 1 左图，比较 MiniMax-M1-80k 与主流模型在数学、代码、软件工程、工具使用和长上下文任务上的表现；右图 `https://arxiv.org/html/2506.13585v1/x2.png` 展示生成长度增加时的 FLOPs 缩放。*

```python
# CISPO + 长思维窗口扩展训练伪代码
def train_minimax_m1(policy, prompts):
    windows = [40_000, 48_000, 56_000, 64_000, 72_000, 80_000]

    for max_output_tokens in windows:
        while not ready_to_expand(policy, max_output_tokens):
            batch = sample_curriculum(prompts, max_output_tokens)
            rollouts = policy.generate(batch, max_new_tokens=max_output_tokens)
            rollouts = stop_if_3000_high_prob_tokens(rollouts, threshold=0.99)

            rewards = []
            for sample in rollouts:
                if sample.task in ["math", "logic", "code", "software_engineering"]:
                    rewards.append(rule_or_execution_reward(sample))
                else:
                    rewards.append(generative_reward_model(sample))

            advantages = group_relative_advantage(rewards)
            old_logp = rollout_logprobs(rollouts)
            new_logp = policy.logprobs(rollouts)
            is_weight = exp(new_logp - old_logp)

            # CISPO: 裁剪 IS weight，但不丢弃 token 梯度
            clipped_w = clip(is_weight, 1 - eps_low_is, 1 + eps_high_is)
            loss = -mean(clipped_w * stop_gradient(advantages) * new_logp)
            loss = mix_sample_level_and_token_level_normalization(loss)
            policy.update(loss, adamw_betas=(0.9, 0.95), adamw_eps=1e-15)

    return policy
```

M1 的基础架构继承 MiniMax-Text-01，因此它的“长推理”能力不是靠稀疏采样或外部记忆硬补出来的，而是来自混合注意力本身。Lightning Attention 把长序列 rollout 的边际成本压低，Softmax block 周期性补足精确检索，MoE 让模型保留大容量专家知识。论文强调这对 RL 尤其关键，因为 reasoning model 的训练瓶颈不只在反向传播，还在反复采样长输出；如果 rollout 随生成长度二次增长，80K thinking budget 的训练成本会迅速不可控。

CISPO 的动机来自 PPO/GRPO 在长 CoT 上的 token clipping 问题。论文观察到，反思类 token 如 `Wait`、`Recheck`、`However` 往往在 base model 中概率很低，但它们可能是推理路径分叉和自我纠错的关键。一旦 PPO/GRPO 的概率比 \(r_{i,t}\) 超出裁剪区间，这些 token 会被“裁掉”而不再贡献后续 off-policy 更新。CISPO 改为裁剪 importance sampling weight：
$$
w_{i,t}=\frac{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}{\pi_{\theta_{\mathrm{old}}}(o_{i,t}\mid q,o_{i,<t})},
\qquad
\bar w_{i,t}=\mathrm{clip}(w_{i,t},1-\epsilon^{IS}_{low},1+\epsilon^{IS}_{high}).
$$
直觉上，CISPO 仍限制 off-policy 分布校正的方差，但不把罕见而有用的推理 token 直接从梯度里移除。论文还明确说 CISPO 不使用 KL penalty，并结合 dynamic sampling 与 length penalty。

RL 数据设计服务于“可验证能力”和“通用对齐”两类目标。数学、逻辑和竞赛编程样本可用答案解析器、规则 checker 或测试用例验证；软件工程任务构建 containerized sandbox，用编译、测试通过与回归情况给执行奖励；通用问答、创作和复杂指令没有唯一答案，则用 GenRM 做 pairwise 或打分反馈。为了避免 reward model 偏好冗长输出，训练中持续监控长度偏置，一旦发现模型靠拉长 CoT 奖励套利，就重新校准 reward，并在 RL 侧加入 reward shaping、value clipping 和 normalization。

混合注意力模型做大规模 RL 时还暴露出工程敏感性。论文发现训练模式和推理模式下 rollout token 概率存在不一致，根因是 kernel 精度和 LM head 高幅值激活造成的误差；把 LM output head 提升到 FP32 后，概率相关性从约 0.9x 改善到 0.99x，reward 才能持续增长。优化器也需要重调：默认 AdamW \((0.9,0.999)\)、eps \(10^{-8}\) 会因 M1 梯度范围极宽而不收敛，最终使用 \(\beta_1=0.9,\ \beta_2=0.95,\ \epsilon=10^{-15}\)。

80K thinking budget 不是一次性把输出上限翻倍，而是课程式扩展。M1 先训练 40K，再按 48K、56K、64K、72K、80K 逐步增加窗口；每阶段等待生成序列 perplexity 收敛、99 分位输出长度接近当前上限后才扩展。论文还指出长窗口后期会出现 pattern collapse：负样本长度增长快于正样本，后半段累积过量负梯度，导致输出后段乱码或重复。对应修复包括 3000 个连续高概率 token 的重复早停、混合样本级损失和 token 级归一化、降低梯度裁剪阈值以及调小 \(\epsilon^{IS}_{high}\)。

#### 🧪 练习题
```yaml
question: "CISPO 相比 PPO/GRPO 的关键变化是什么？"
options:
  - "删除所有 off-policy 更新，只保留 SFT"
  - "裁剪 importance sampling weight，同时保留所有 token 的梯度贡献"
  - "把 Lightning Attention 替换为纯 Softmax Attention"
  - "只用 reward model，不再使用规则验证"
answer: 1
explain: "CISPO 的核心是从裁剪 token update 转向裁剪 IS weight，避免长 CoT 中罕见但关键的反思 token 被直接丢掉。"
```
