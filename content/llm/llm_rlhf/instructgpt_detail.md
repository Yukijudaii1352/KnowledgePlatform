### InstructGPT：Training Language Models to Follow Instructions with Human Feedback

```yaml
id: instructgpt
full_name: InstructGPT
year: "2022"
paper_url: https://arxiv.org/abs/2203.02155
motivation: RLHF工业化，指令遵循能力突破
parent: rlhf
category: rl_based
```

#### 📝 一句话总结

InstructGPT 将 RLHF 工业化为“监督微调 SFT → 奖励模型 RM → PPO/PPO-ptx 强化学习”的三阶段流程，使 GPT-3 系列模型在真实 API 指令分布上显著更符合人类偏好、也更会遵循用户意图。

#### 🎯 核心要点

- 目标从“预测互联网文本下一个 token”转为“按用户意图有帮助、诚实、无害地完成指令”。
- 训练数据来自 OpenAI API Playground 提示和 labeler 自写提示，覆盖生成、开放问答、头脑风暴、聊天、改写、摘要、分类等任务。
- 三阶段训练流程：收集示范并训练 SFT policy，收集多个模型输出的人类排序并训练 RM，用 RM 奖励通过 PPO 优化 SFT policy。
- SFT 数据约 13k prompts，RM 数据约 33k prompts，PPO 数据约 31k prompts，人工标注由约 40 名经过筛选和培训的 contractors 完成。
- RM 从 SFT 模型去掉 final unembedding layer 后初始化，对 prompt-response 输出标量奖励，用 pairwise ranking loss 学习 labeler 偏好。
- 为提高标注效率，labeler 对每个 prompt 排序 \(K=4\) 到 \(K=9\) 个候选响应，一次排序产生 \({K\choose2}\) 个 pairwise comparisons。
- PPO 阶段把单个 prompt-response 视为 bandit episode，用 RM 分数作为终止奖励，并加入相对 SFT policy 的 per-token KL penalty。
- PPO-ptx 在 PPO 梯度中混入预训练分布的语言建模梯度，以减少 SQuAD、DROP、HellaSwag、翻译等公开 NLP 任务上的 alignment tax。
- 论文报告 1.3B InstructGPT 在人工偏好上超过 175B GPT-3，且在 TruthfulQA、幻觉率、毒性控制等维度有改善。
- 论文明确指出模型对齐的是 labelers 与研究者定义的偏好，并不等同于普遍“人类价值”。

#### 🔬 深入细节

![InstructGPT 三阶段 RLHF 流程](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：论文 Figure 2 展示 InstructGPT 的三步方法：SFT、Reward Model training、PPO against reward model。蓝色箭头表示对应数据用于训练哪个模型。*

```python
# InstructGPT training pipeline
base_lm = GPT3_pretrained()

# Step 1: supervised fine-tuning on demonstrations.
D_sft = collect_labeler_demonstrations(api_prompts, labeler_prompts)
pi_sft = finetune(base_lm, D_sft, objective="next_token_likelihood")

# Step 2: reward model from ranked model outputs.
D_rm = []
for x in rm_prompts:
    candidates = [sample(model, x) for model in policy_pool]  # K responses
    ranking = labeler_rank(x, candidates)
    D_rm.append((x, candidates, ranking))
rm = train_reward_model(pi_sft_without_unembedding, D_rm, loss="pairwise_logistic")
normalize_reward_bias(rm, demonstrations_mean=0)

# Step 3: PPO / PPO-ptx against the reward model.
pi_rl = copy(pi_sft)
for x in ppo_prompts:
    y = sample(pi_rl, x)
    terminal_reward = rm(x, y)
    kl_penalty = beta * (logprob(pi_rl, y, x) - logprob(pi_sft, y, x))
    ppo_reward = terminal_reward - kl_penalty
    ppo_update(pi_rl, reward=ppo_reward)
    if use_ptx:
        add_pretraining_gradient(pi_rl, coefficient=gamma)
```

InstructGPT 的问题定义与普通预训练语言模型不同。GPT-3 的预训练目标是最大化互联网文本的似然，但用户真正希望模型“遵循指令、不要胡编、不要输出有害内容”。论文把这种错位称为 misalignment，并将 alignment 操作落到可训练流程上：先让人类写出理想回答，让模型学会指令格式；再让人类比较多个模型回答，让模型学会偏好排序；最后把偏好模型转成 reward，对语言模型做强化学习。

第一阶段 SFT 是整个流程的稳定起点。labeler 针对真实 API prompt 或自写 prompt 给出期望回答，GPT-3 在这些 demonstration 上做 supervised fine-tuning。SFT 不需要奖励模型，也不涉及探索，主要作用是把 base LM 从“网页续写器”拉到“指令响应器”的分布附近。论文还观察到 SFT validation loss 可能较早过拟合，但继续训练仍能提升 RM score 和人工偏好，因此模型选择不只看语言建模损失。

第二阶段训练 reward model。RM 输入 prompt \(x\) 和 completion \(y\)，输出标量 \(r_\theta(x,y)\)。标注界面不是只比较两个输出，而是让 labeler 对 \(K=4\) 到 \(K=9\) 个候选响应排序；一个排序可展开为 \({K\choose2}\) 个胜负对。为了避免同一 completion 在一个 epoch 内被重复过多次导致过拟合，论文把同一 prompt 的所有 pairwise comparisons 作为一个 batch element 处理。RM 的 pairwise logistic loss 为：

$$
\mathrm{loss}(\theta)=-\frac{1}{{K\choose2}}\mathbb{E}_{(x,y_w,y_l)\sim D}\left[\log\sigma\left(r_\theta(x,y_w)-r_\theta(x,y_l)\right)\right].
$$

其中 \(y_w\) 是人类更偏好的 completion，\(y_l\) 是较差 completion。这个目标让 reward 差值表示“人类更偏好 \(y_w\) 的 log odds”。由于 pairwise loss 对 reward 整体平移不敏感，论文在进入 RL 前用 bias 归一化，使 labeler demonstrations 的平均 reward 为 0。

第三阶段是 PPO 强化学习。论文把语言生成建成 bandit environment：环境给出 prompt，policy 生成完整 response，reward model 给出终止标量奖励，episode 结束。为了抑制 reward model over-optimization，训练还在每个 token 上加入相对 SFT policy 的 KL penalty。也就是说，模型不只是最大化 RM 分数，还要付出“偏离原 SFT 行为”的代价；这与后续 RLHF 系统中的 reference model KL 控制一脉相承。

PPO-ptx 是 InstructGPT 论文非常关键的工程改动。普通 PPO 会让模型更符合 API prompt 上的 labeler 偏好，但可能损害公开 NLP benchmark 上的能力，即 alignment tax。为缓解这一点，论文把 PPO 目标与预训练分布上的语言建模目标相加：

$$
\mathrm{objective}(\phi)=
\mathbb{E}_{(x,y)\sim D_{\pi^{\mathrm{RL}}_\phi}}\left[
 r_\theta(x,y)-\beta\log\left(\frac{\pi^{\mathrm{RL}}_\phi(y|x)}{\pi^{\mathrm{SFT}}(y|x)}\right)
\right]
+\gamma\mathbb{E}_{x\sim D_{\mathrm{pretrain}}}\left[\log(\pi^{\mathrm{RL}}_\phi(x))\right].
$$

其中 \(\beta\) 控制 KL 惩罚强度，\(\gamma\) 控制混入预训练梯度的强度；当 \(\gamma=0\) 时就是普通 PPO。论文默认所说 InstructGPT 通常指 PPO-ptx 模型，因为它在保持偏好收益的同时减少了部分公开任务退化。

从结果看，InstructGPT 的重要性不只是“用了 RLHF”，而是证明了 RLHF 可以在真实产品分布上规模化工作。1.3B PPO-ptx 模型在人工偏好中超过 175B GPT-3，说明对齐数据和训练目标的改变可以抵消甚至超过百倍参数规模差异。论文还报告了更好的显式约束遵循、更低闭域幻觉率、TruthfulQA 改善和在 respectful prompt 下毒性降低。不过它也强调局限：模型仍会犯简单错误，训练偏好来自特定 labeler 群体，并且“有帮助、诚实、无害”在冲突场景下如何权衡仍是开放问题。

> 💡 关键：InstructGPT 的 RLHF 不是单一算法，而是一条数据生产线。SFT 决定初始行为分布，RM 决定优化方向，PPO/PPO-ptx 决定如何在奖励最大化与能力保持之间折中。

#### 🧪 练习题

```yaml
question: "InstructGPT 中 PPO-ptx 相比普通 PPO 的主要作用是什么？"
options:
  - "删除 reward model，直接对 labeler demonstration 做监督学习"
  - "在 PPO 目标中混入预训练语言建模梯度，以减少 RLHF 对公开 NLP 能力的退化"
  - "把 pairwise ranking loss 改成多分类交叉熵，从而提升 RM 标注效率"
  - "取消相对 SFT policy 的 KL penalty，让模型尽可能最大化 RM 分数"
answer: 1
explain: "PPO-ptx 在 PPO/RM 奖励目标之外加入 pretraining distribution 上的 log-likelihood 项，用 gamma 控制强度，以缓解 alignment tax。"
```
