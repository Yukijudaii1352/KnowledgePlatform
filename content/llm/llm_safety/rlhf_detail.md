### RLHF — 基于人类反馈的强化学习 (Reinforcement Learning from Human Feedback)

```yaml
id: rlhf
name: RLHF (InstructGPT)
full_name: 基于人类反馈的强化学习 (Reinforcement Learning from Human Feedback)
year: "2022"
org: OpenAI
paper_url: https://arxiv.org/abs/2203.02155
category: alignment
parent: —
motivation: 通过人类反馈训练奖励模型并用强化学习微调语言模型，使其输出与人类意图对齐
```

#### 📝 一句话总结

InstructGPT 提出了 SFT → 奖励模型训练 → PPO 强化学习的三阶段 RLHF 流程，利用人类偏好反馈对齐语言模型输出与用户意图，使 1.3B 参数的对齐模型在人类评估中优于 175B 的原始 GPT-3。

#### 🎯 核心要点

- **三阶段训练流程**：Step 1 监督微调 (SFT) → Step 2 奖励模型训练 (RM) → Step 3 PPO 强化学习优化
- **涉及 4 个模型**：SFT Model、Reward Model (6B)、Policy Model (\(\pi_\phi^{\text{RL}}\))、Reference Model (\(\pi^{\text{SFT}}\))
- **奖励模型**：基于人类对 K=4\~9 个输出的排序，利用 \(\binom{K}{2}\) 对比较对进行 pairwise 训练，6B 参数效果最优
- **PPO-ptx 目标函数**：在 PPO 奖励最大化的基础上加入 KL 散度惩罚（防止策略偏离 SFT）和预训练梯度混合（防止 NLP 能力退化）
- **数据规模**：SFT 约 13k 提示、RM 约 33k 提示、PPO 约 31k 提示，由 40 名标注者提供，标注者间一致率 72.6%
- **核心发现**：1.3B InstructGPT 在人类偏好评估中胜过 175B GPT-3；RLHF 显著降低毒性和幻觉

#### 🔬 深入细节

![InstructGPT 三阶段训练流程图](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：RLHF 训练的三个阶段——(1) 监督微调 SFT，(2) 奖励模型训练 RM，(3) PPO 强化学习优化*

```python
# InstructGPT / RLHF 三阶段训练伪代码

# ========== Step 1: Supervised Fine-Tuning (SFT) ==========
sft_model = pretrained_gpt3.copy()
for epoch in range(16):  # 16 epochs, cosine LR, dropout=0.2
    for (prompt, demonstration) in sft_dataset:  # ~13k prompts
        loss = cross_entropy(sft_model(prompt), demonstration)
        sft_model.update(loss)

# ========== Step 2: Reward Model Training (RM) ==========
reward_model = sft_model.remove_unembedding_layer()  # 6B params
reward_model.add_scalar_head()  # 输出标量奖励值
for batch in rm_dataset:  # ~33k prompts
    prompt, ranked_outputs = batch  # K=4~9 个输出的人类排序
    loss = 0
    for (y_w, y_l) in all_pairs(ranked_outputs):  # C(K,2) 对
        loss -= log(sigmoid(reward_model(prompt, y_w) - reward_model(prompt, y_l)))
    loss /= num_pairs
    reward_model.update(loss)

# ========== Step 3: PPO Reinforcement Learning ==========
policy = sft_model.copy()          # π_RL, 可训练
reference = sft_model.copy()       # π_SFT, 冻结
value_fn = reward_model.copy()     # 初始化自 RM

for iteration in ppo_iterations:
    prompt = sample(ppo_prompts)           # ~31k prompts
    response = policy.generate(prompt)     # rollout
    reward = reward_model(prompt, response)
    kl_penalty = beta * log(policy(response|prompt) / reference(response|prompt))
    ppo_reward = reward - kl_penalty
    # PPO-ptx: 混合预训练梯度
    pretrain_loss = -gamma * log_likelihood(policy, pretrain_batch)
    policy.ppo_update(ppo_reward + pretrain_loss)
```

**动机与背景：大语言模型的对齐问题**

大规模语言模型（如 GPT-3）通过在海量互联网文本上进行下一词预测训练，获得了强大的语言生成能力。然而，"预测下一个词"这一训练目标与"遵循用户指令并生成有帮助、诚实、无害的回答"之间存在根本性的错位（misalignment）。GPT-3 经常生成不真实的内容（幻觉）、有毒文本，或者无法准确理解用户意图。传统的监督微调虽然能在一定程度上改善指令遵循能力，但受限于高质量标注数据的稀缺性——让人类为每个可能的提示编写理想回答的成本极高。InstructGPT 的核心洞察是：**让人类评判输出的好坏（比较/排序）远比让人类撰写完美回答更容易**，因此可以通过人类偏好反馈训练一个奖励模型，再用强化学习优化语言模型的输出策略。

**核心机制：三阶段 RLHF 流程**

**第一阶段——监督微调 (SFT)**：在约 13,000 条由标注者编写的高质量 (prompt, demonstration) 对上微调 GPT-3。训练采用 16 个 epoch、余弦学习率衰减和 0.2 的 dropout。虽然 SFT 模型在 1 个 epoch 后就已过拟合验证损失，但继续训练仍能提升人类偏好评分，说明 RM 评分与验证损失并非完全相关。

**第二阶段——奖励模型训练 (RM)**：从 SFT 模型（6B 参数版本）移除最终的 unembedding 层，添加一个线性投影头输出标量奖励值。对于每个提示，标注者对 K=4\~9 个模型输出进行排序，产生 \(\binom{K}{2}\) 个偏好对。RM 的训练损失函数为：

$$\mathcal{L}_{\text{RM}}(\theta) = -\frac{1}{\binom{K}{2}} \mathbb{E}_{(x, y_w, y_l) \sim D}\left[\log \sigma\left(r_\theta(x, y_w) - r_\theta(x, y_l)\right)\right]$$

其中 \(r_\theta(x, y)\) 是奖励模型对提示 \(x\) 和输出 \(y\) 的标量评分，\(y_w\) 是偏好对中被偏好的输出，\(y_l\) 是较差的输出。关键设计是**将同一提示的所有 \(\binom{K}{2}\) 对比较放入同一个 batch**，避免了奖励模型的过拟合问题。论文发现 6B 的 RM 比 175B 更稳定，大模型 RM 训练不稳定。

> 💡 **关键**：奖励模型只需要学习输出之间的**相对偏好排序**，而非绝对分数。训练前通过偏置归一化使标注者示范的平均奖励为 0。

**第三阶段——PPO 强化学习优化**：将语言模型的生成过程建模为一个 bandit 环境——给定随机提示，模型生成回答，奖励模型给出评分后 episode 结束。PPO-ptx 的完整优化目标为：

$$\operatorname{objective}(\phi) = \mathbb{E}_{(x,y) \sim D_{\pi_\phi^{\text{RL}}}}\left[r_\theta(x,y) - \beta \log\frac{\pi_\phi^{\text{RL}}(y \mid x)}{\pi^{\text{SFT}}(y \mid x)}\right] + \gamma \mathbb{E}_{x \sim D_{\text{pretrain}}}\left[\log \pi_\phi^{\text{RL}}(x)\right]$$

其中第一项是经 KL 惩罚调节的奖励最大化——\(\beta\) 控制 KL 散度惩罚强度，防止策略 \(\pi_\phi^{\text{RL}}\) 过度偏离参考模型 \(\pi^{\text{SFT}}\)，从而避免对奖励模型的过度优化（reward hacking）。第二项是预训练数据上的语言模型损失，系数 \(\gamma\) 控制其权重，用于缓解 RL 训练导致的公共 NLP 任务性能退化（alignment tax）。当 \(\gamma = 0\) 时退化为标准 PPO 模型。Value function 从 RM 初始化。

> ⚠️ **注意**：KL 惩罚是**逐 token**施加的，而非在整个序列级别。这提供了更细粒度的约束，防止模型在局部生成与 SFT 分布严重偏离的 token。

**与传统方法的区别与核心优势**

与纯监督微调相比，RLHF 的关键优势在于利用了**比较反馈**而非**示范反馈**。人类标注者判断"A 比 B 好"的一致性和效率远高于"从零撰写完美回答"。与直接使用 RM 分数做 best-of-n 采样（rejection sampling）相比，PPO 优化将奖励信号内化到模型参数中，推理时无需多次采样，计算效率更高。实验表明，1.3B 的 InstructGPT 在人类偏好评估中以显著优势胜过 175B 的 GPT-3，甚至在 TruthfulQA 和 RealToxicityPrompts 等安全基准上也表现更优。PPO-ptx 变体通过混合预训练梯度，在对齐能力和通用 NLP 能力之间取得了良好平衡，将 alignment tax 降至最低。这一三阶段框架后来成为 ChatGPT 等对话系统的基础训练范式。

#### 🧪 练习题

```yaml
question: "InstructGPT 在 PPO 训练中加入 KL 散度惩罚项的主要目的是什么？"
options:
  - "加速策略模型的收敛速度"
  - "防止策略模型过度偏离 SFT 参考模型，避免奖励模型被过度优化"
  - "提升奖励模型的预测精度"
  - "减少模型的参数量以节省计算资源"
answer: 1
explain: "KL 散度惩罚约束 π_RL 与 π_SFT 的分布差异，防止策略过度优化奖励模型的漏洞（reward hacking），确保生成质量。"
```