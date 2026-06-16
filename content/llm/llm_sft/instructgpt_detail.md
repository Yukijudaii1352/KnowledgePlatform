### InstructGPT：指令GPT (InstructGPT)

```yaml
id: instructgpt
name: InstructGPT
full_name: 指令GPT (InstructGPT)
year: "2022.03"
org: OpenAI
paper_url: https://arxiv.org/abs/2203.02155
category: instruction
parent: flan
motivation: 引入RLHF框架对齐人类偏好
```

#### 📝 一句话总结
InstructGPT 提出了面向真实用户指令的三阶段 RLHF 训练框架：先用人工示范做监督微调，再用人工偏好训练奖励模型，最后用 PPO 优化策略，从而解决大语言模型“会续写但不一定会按用户意图行动”的对齐问题。

#### 🎯 核心要点
- 三阶段流程：Supervised Fine-Tuning (SFT) → Reward Model (RM) → PPO Reinforcement Learning
- 数据来自标注员编写 prompts、OpenAI API Playground 用户 prompts、人工示范回答与人工排序比较
- SFT 阶段把 GPT-3 微调为初始指令跟随策略，是后续 RLHF 的 warm start
- RM 阶段输入 prompt-response，输出标量奖励，并通过 pairwise ranking loss 学习人类偏好
- PPO 阶段把语言生成视为 bandit 环境，用 RM 分数作为奖励更新策略模型
- 使用相对 SFT/reference policy 的 KL penalty，抑制策略为了骗过奖励模型而偏离可读语言分布
- 提出 PPO-ptx：在 PPO 更新中混入预训练语言建模梯度，以降低 public NLP benchmarks 上的 alignment tax
- 实验显示 1.3B InstructGPT 在人工偏好上可优于 175B GPT-3，说明对齐训练能比单纯扩大规模更直接改善用户体验

#### 🔬 深入细节

![InstructGPT 三阶段 RLHF 流程图](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：InstructGPT 方法包含收集示范并训练 SFT、收集多回答排序并训练 RM、再用 PPO 针对 RM 奖励优化策略三个阶段。蓝色箭头表示对应数据用于训练模型。*

InstructGPT 的出发点是语言建模目标和用户意图之间存在错位。预训练 GPT-3 优化的是“给定前文预测下一个 token”，它可能生成流畅但不真实、不安全、没有完成任务的文本；而用户希望模型 helpful、honest、harmless。单纯把模型做大不会自动把目标函数从“拟合互联网文本”变成“按照用户指令完成任务”。InstructGPT 因此将目标重新定义为：在真实 prompt 分布上，让输出更符合人工标注者对好回答的偏好。

```python
# InstructGPT / RLHF 训练骨架
base = load_pretrained_gpt3()

# Step 1: supervised fine-tuning from demonstrations
D_sft = collect_labeler_demonstrations(prompts)
pi_sft = finetune_lm(base, D_sft)  # prompt -> labeler-written answer

# Step 2: reward modeling from ranked comparisons
D_rm = []
for prompt in sampled_prompts:
    candidates = sample_outputs([pi_sft, other_policies], prompt, k=4)
    ranking = labelers_rank(candidates)
    D_rm.extend(pairwise_preferences(prompt, ranking))
reward_model = train_pairwise_rm(D_rm)

# Step 3: PPO policy optimization against the reward model
pi = initialize_from(pi_sft)
reference = freeze(pi_sft)
for batch_prompts in ppo_prompt_stream:
    responses = pi.generate(batch_prompts, temperature=1.0)
    rm_reward = reward_model(batch_prompts, responses)
    kl_penalty = beta * logprob_ratio(pi, reference, batch_prompts, responses)
    reward = rm_reward - kl_penalty
    ppo_update(policy=pi, reward=reward, clip_ratio=0.2)

    if use_ptx:
        lm_update(pi, pretraining_tokens, weight=gamma)
```

奖励模型训练把人工排序拆成成对偏好。对于同一个 prompt \(x\)，若标注者更偏好回答 \(y_w\) 而不是 \(y_l\)，奖励模型 \(r_\theta(x,y)\) 应该给 \(y_w\) 更高分。论文使用 logistic pairwise loss：

$$
\mathcal{L}_{\text{RM}}(\theta)
= -\mathbb{E}_{(x,y_w,y_l) \sim D}
\left[\log \sigma\left(r_\theta(x,y_w)-r_\theta(x,y_l)\right)\right]
$$

这个损失的直觉很直接：它不要求人类给出绝对分数，只要求比较两个候选谁更好。这样能把主观的“更有帮助、更诚实、更少有害”转化为可学习的相对顺序。论文还提到对同一 prompt 的多个 completion 不应简单打散重复训练，因为比较样本高度相关，奖励模型容易一轮内过拟合；实际训练中使用 6B RM，是因为更大的 175B RM 虽可能验证损失更低，但训练和作为 value function 初始化都更不稳定。

PPO 阶段不是让模型无限最大化 RM 分数，而是在奖励中加入相对 SFT 策略的 KL 约束。带预训练混合项时，目标可写成：

$$
\max_\phi\;\mathbb{E}_{(x,y)\sim \pi_\phi}
\left[r_\theta(x,y) - \beta \log \frac{\pi_\phi(y\mid x)}{\pi_{\text{SFT}}(y\mid x)}\right]
+ \gamma\,\mathbb{E}_{x\sim D_{\text{pretrain}}}
\left[\log \pi_\phi(x)\right]
$$

其中 \(\pi_\phi\) 是正在优化的 policy，\(\pi_{\text{SFT}}\) 是冻结参考模型，\(\beta\) 控制偏离参考策略的代价，\(\gamma\) 控制预训练分布保持项。KL 项解决的是 reward hacking 与分布漂移：如果只看 RM 分数，策略可能生成奖励模型喜欢但人类并不真正喜欢的异常文本；KL penalty 把优化限制在 SFT 模型附近，让回答仍保持自然语言质量和基本能力。

> ⚠️ 注意：InstructGPT 中的 RL 环境近似为单步 bandit。prompt 给定后，策略生成完整 response，RM 对整个 response 给一个标量奖励，episode 随即结束；这不同于机器人控制中每步都有外部环境状态转移的经典 RL。

PPO-ptx 是论文中很重要但常被忽略的工程设计。RLHF 会让模型更符合标注者偏好，但也可能牺牲部分公开 NLP benchmark 能力，这被称为 alignment tax。论文发现，在每个 PPO minibatch 中额外加入来自 GPT-3 预训练语料的语言建模梯度，可以缓解 SQuAD、DROP、HellaSwag、翻译等任务的性能回退，而不显著损害人工偏好得分。换言之，PPO 负责“向人类偏好移动”，预训练梯度负责“不要忘掉通用语言能力”。

与 FLAN/T0 这类公开任务指令微调相比，InstructGPT 的关键差异在于优化信号来自真实用户分布和人类偏好，而不是传统 NLP 数据集的标准答案。FLAN 教模型理解“任务说明”，InstructGPT 则进一步教模型什么样的回答更被人类认为有用、真实、合适。论文也直接比较了在 API prompt 分布上微调 FLAN/T0 风格数据的模型，发现它们不如 InstructGPT 受标注者偏好，说明 benchmark 指令数据与真实产品 prompt 分布之间存在明显差距。

这套框架仍然有边界。模型对齐的是特定标注者和研究团队的偏好，而不是抽象的全人类价值；奖励模型可能放大标注规范中的偏差，例如过度奖励 hedging 导致回答不够直接；复杂约束、多语言、代码、错误前提等场景仍会失败。但 InstructGPT 的方法论影响很大：它把“对齐”拆成可执行的数据闭环，即收集示范、收集偏好、训练奖励、受约束地优化策略，成为后续 ChatGPT/RLHF 系列方法的基础模板。

#### 🧪 练习题
```yaml
question: "InstructGPT 在 PPO 阶段加入相对 SFT/reference policy 的 KL penalty，主要是为了什么？"
options:
  - "让奖励模型完全不参与训练，只保留监督微调"
  - "限制策略偏离参考模型过远，降低 reward hacking 和语言分布漂移风险"
  - "把所有用户 prompt 转换成分类标签"
  - "强制模型参数量小于 1.3B"
answer: 1
explain: "PPO 直接最大化 RM 分数可能产生异常但高分的回答；KL penalty 将新策略约束在 SFT/reference policy 附近，使偏好优化更稳定。"
```
