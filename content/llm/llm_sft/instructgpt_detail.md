### InstructGPT

```yaml
id: "instructgpt"
name: "InstructGPT"
full_name: "指令GPT (InstructGPT)"
year: "2022.03"
org: "OpenAI"
paper_url: "https://arxiv.org/abs/2203.02155"
category: "instruction"
parent: "flan"
motivation: "引入RLHF框架对齐人类偏好"
```

#### 📝 一句话总结

InstructGPT 提出了面向通用指令跟随的 RLHF 训练流程，用人类示范、偏好排序和 PPO 优化把 GPT-3 对齐到用户更偏好的回答风格。

#### 🎯 核心要点

- 三阶段流程：监督微调 SFT、奖励模型 RM 训练、基于 RM 的 PPO 强化学习。
- 数据来自 OpenAI API prompt 分布、标注员写作示范以及对多个模型输出的排序偏好。
- 奖励模型使用 pairwise ranking loss 学习人类更偏好的回答。
- PPO 阶段加入 KL 约束，限制策略偏离 SFT/reference 模型过远。
- PPO-ptx 额外混入预训练语言建模更新，缓解公共 NLP 任务上的性能回退。
- 结果显示 1.3B InstructGPT 可在人工偏好上超过未对齐的 175B GPT-3。

#### 🔬 深入细节

![InstructGPT 三阶段 RLHF 流程](http://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图源：论文 Figure 2，展示 SFT、Reward Model 训练和 PPO 优化三个步骤。*

```python
# InstructGPT / RLHF 训练伪代码
base = load_pretrained_gpt3()

# 1. 监督微调：学习人工示范
sft_data = collect_labeler_demonstrations(api_prompts)
policy = finetune(base, sft_data, loss="next_token_cross_entropy")

# 2. 奖励模型：学习人类偏好排序
comparisons = []
for prompt in sampled_prompts:
    outputs = [sample(m, prompt) for m in candidate_models]
    ranking = labelers_rank(outputs)
    comparisons.extend(make_pairs(prompt, ranking))
reward_model = train_pairwise_reward_model(comparisons)

# 3. PPO：最大化奖励，同时限制偏离参考策略
ref = freeze(copy(policy))
for batch in rollout_prompts:
    y = policy.generate(batch)
    reward = reward_model(batch, y) - beta * kl(policy, ref, batch, y)
    policy = ppo_update(policy, batch, y, reward)
    optional_pretraining_update(policy)  # PPO-ptx
```

InstructGPT 的出发点是 GPT-3 虽然具备强语言能力，但默认目标是预测互联网文本，不等价于“按用户指令给出有用、真实、无害的回答”。纯 SFT 可以模仿标注员示范，但示范数据昂贵且覆盖有限；只靠人工写标准答案也难以表达“两个可接受回答哪个更好”。RLHF 用偏好排序把更细粒度的质量判断转化为可优化信号。

奖励模型的核心是 pairwise preference loss。对同一 prompt 的两个回答 \(y_w\) 和 \(y_l\)，若标注员偏好 \(y_w\)，奖励模型 \(r_\phi\) 的目标为：

$$
\mathcal{L}_{RM}=-\log \sigma(r_\phi(x,y_w)-r_\phi(x,y_l))
$$

这使 RM 不必预测绝对分数，只需学习相对偏好。随后 PPO 把 RM 当成奖励函数优化策略，但直接最大化 RM 容易让模型钻奖励漏洞或偏离语言质量，因此目标中加入对参考策略的 KL 惩罚：

$$
r(x,y)=r_\phi(x,y)-\beta \log \frac{\pi_\theta(y\mid x)}{\pi_{\text{ref}}(y\mid x)}
$$

训练流程上，SFT 模型是 PPO 的初始化，参考模型通常冻结为 SFT 副本。PPO 在 prompt 上采样回答，RM 打分，价值函数估计优势，再用裁剪策略梯度更新。论文还发现 RLHF 可能牺牲部分标准 NLP benchmark 表现，因此 PPO-ptx 混入预训练分布上的语言建模梯度，在对齐收益和基础能力保持之间折中。

与 FLAN/T0 的主要区别在于监督信号形态。FLAN 依赖任务数据和指令模板，优化“给定任务输出正确答案”；InstructGPT 面向开放 API prompt，优化“人类更喜欢哪个回答”。这使 InstructGPT 更接近聊天和助理场景，但也把模型行为绑定到标注指南、标注员群体和奖励模型覆盖范围。

> ⚠️ 注意：RLHF 并不等于完全安全或完全真实；它把模型推向标注偏好，在分布外 prompt、奖励模型盲区和对抗输入上仍可能失败。

#### 🧪 练习题

```yaml
question: "InstructGPT 中 KL 惩罚的主要作用是什么？"
options:
  - "减少奖励模型参数量"
  - "限制 PPO 后的策略过度偏离 SFT/reference 模型"
  - "替代人工偏好标注"
  - "把分类任务转成生成任务"
answer: 1
explain: "KL 项约束新策略与参考策略的分布差异，避免模型为了追求奖励模型分数而产生不稳定或低质量输出。"
```
