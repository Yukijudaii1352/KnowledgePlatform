### InstructGPT

```yaml
id: instructgpt
name: InstructGPT
full_name: 指令调优的GPT-3 (InstructGPT)
year: "2022"
org: OpenAI
paper_url: https://arxiv.org/abs/2203.02155
category: llm_rl
parent: "-"
motivation: 通过人类反馈强化学习（RLHF）使大语言模型对齐人类偏好，提高指令遵循能力、真实性和安全性
```

#### 📝 一句话总结
InstructGPT 提出 **RLHF（基于人类反馈的强化学习）三阶段训练范式**：先通过人工标注的 demonstrations 进行监督微调（SFT），再训练偏好排序的奖励模型（RM），最后用 PPO 算法最大化奖励信号（同时加 KL 惩罚和预训练梯度混合），使 GPT-3 的输出更好地对齐人类指令和偏好，显著优于纯 GPT-3 和 SFT 基线。

#### 🎯 核心要点
- **三阶段训练流程**：Supervised Fine-Tuning (SFT) → Reward Model (RM) → PPO RL（含 KL 散度约束和预训练梯度混合）
- **数据集构建**：雇佣 40 位标注员，收集人工编写的高质量 demonstrations（约 13K prompts）和 comparison 排序数据（约 33K prompts）
- **奖励模型**：基于 SFT 模型末尾移除 unembedding 层，输入 prompt + response 输出标量 reward，使用 K=4~9 个 response 的 pairwise 对比损失
- **PPO-RL 优化**：在 bandit 环境中最大化 RM 奖励，同时加入 KL 散度惩罚项防止策略偏离 SFT 太远
- **PPO-ptx 变体**：混合预训练梯度到 PPO 更新中，缓解在 NLP 标准基准上的性能退化（"alignment tax"）
- **模型规模**：SFT 和 RM 使用 6B 参数（RM 的 175B 版本训练不稳定），PPO 策略使用 1.3B/6B/175B
- **核心优势**：人工评估中 175B InstructGPT 输出被偏好率 85±3% vs GPT-3，且显著降低有害输出、幻觉和不真实性

#### 🔬 深入细节

##### 示意图：三阶段训练框架

论文 Figure 2 描述了三步训练流程图：

> **Step 1 (SFT)**: 从 prompt 分布中采样，标注员编写高质量演示回答 → 监督微调 GPT-3  
> **Step 2 (RM)**: 对同一 prompt 采样 K 个 response，标注员排序 → 训练奖励模型预测偏好  
> **Step 3 (PPO)**: 对新 prompt 用 PPO 策略生成 response，RM 给出奖励 → 用 KL 散度约束更新策略

```
┌─────────────┐    ┌─────────────────┐    ┌───────────────────┐
│  Step 1     │    │     Step 2      │    │      Step 3       │
│  SFT        │───▶│  Reward Model   │───▶│   PPO RL          │
├─────────────┤    ├─────────────────┤    ├───────────────────┤
│ GPT-3 +     │    │ SFT 去头 +      │    │ pi_RL 生成 response │
│ 标注 demo   │    │ pairwise 排序   │    │ RM 打分           │
│ -> pi_SFT   │    │ -> r_theta(x,y) │    │ + KL(pi_RL||pi_SFT)│
│             │    │                 │    │ -> 更新 pi_RL      │
└─────────────┘    └─────────────────┘    └───────────────────┘
```

##### 算法伪代码

```python
# ========= InstructGPT 三阶段训练 =========

# Phase 1: Supervised Fine-Tuning (SFT)
pi_sft = pretrained_GPT3.clone()
for epoch in range(16):
    for prompt, demo in human_demonstrations:  # ~13K samples
        # 标准最大似然估计，在人工编写的回答上微调
        loss = neg_log_prob(pi_sft, demo, prompt)
        loss.backward()
        optimizer.step()

# Phase 2: Reward Model Training
r_theta = pi_sft.clone()
r_theta.replace_head(scalar_output)  # 去掉 unembedding，换标量输出头
for prompt, ranked_responses in comparison_data:  # ~33K prompts
    # K=4~9 responses per prompt
    for (y_win, y_lose) in all_pairs(ranked_responses):  # C(K,2) 对
        # Bradley-Terry pairwise loss
        loss = -log(sigmoid(r_theta(y_win) - r_theta(y_lose)))
    loss.backward()
# 后处理：归一化，让标注 demo 的平均 reward = 0

# Phase 3: PPO Reinforcement Learning
pi_rl = pi_sft.clone()
V = r_theta.clone()  # 价值函数从 RM 初始化
for step in range(num_steps):  # ~2M episodes
    prompt = sample(API_distribution)
    response = pi_rl.sample(prompt)
    # 奖励 = RM分数 - KL惩罚
    reward = r_theta(prompt, response)
    reward -= beta * KL_divergence(pi_rl, pi_sft, prompt)
    # PPO-ptx: 可选混合预训练损失
    loss = -reward + gamma * pretrain_loss(pi_rl, x)
    PPO_clip_update(pi_rl, V, loss)
```

##### 深入解释

**1. 动机与背景：GPT-3 的"对齐"困境**

GPT-3 虽然在各类 NLP 任务上展现出强大的能力，但其行为存在严重的对齐问题：它常常产生不符合用户意图的输出——例如编造事实（幻觉）、生成有害内容、或不能正确遵循明确的指令约束。核心矛盾在于，标准语言模型的目标是预测下一个 token（最大化训练数据的似然），而用户的真实目标是获得有帮助的、真实的、无害的回答。这两者并不等价。"对齐税"（alignment tax）现象表明，简单地对模型进行指令微调虽然能提升在特定基准上的表现，但可能在其他能力维度上退化。

InstructGPT 的核心洞察是：**人类偏好可以提供比"下一个 token 预测"更精确的信号**。通过让标注员对模型生成的多个回答进行排序，可以训练一个"奖励模型"来模拟人类的偏好判断，然后用强化学习（PPO）来最大化这个奖励信号。

**2. 奖励模型：从排序到标量奖励**

RM 训练是连接人类偏好与策略优化的桥梁。具体做法是：对同一个输入 prompt \\(x\\)，让策略模型生成 \\(K = 4\\sim 9\\) 个不同的 response，然后让标注员按质量排序。这原本只产生一个全序关系，但论文将排序转化为 \\(C_K^2\\) 个 pairwise 比较——每对 \\((y_w, y_l)\\) 标注"哪个更好"。

损失函数采用 Bradley-Terry 偏好模型的交叉熵形式：

$$\text{loss}(\theta) = -\frac{1}{\binom{K}{2}}\mathbb{E}_{(x, y_w, y_l)\sim D}\left[\log\left(\sigma\left(r_\theta(x, y_w) - r_\theta(x, y_l)\right)\right)\right]$$

> 💡 **关键设计**：将所有 \\(C_K^2\\) 个比较放在同一个 batch 中训练（而非独立打散），因为单个 prompt 内的多个比较高度相关。这一技巧不仅避免了过拟合（只扫一遍数据就过拟合），还计算效率更高——只需对 K 个 completion 各做一次前向传播，而非 \\(C_K^2\\) 次。

RM 只有 6B 参数（实验发现 175B RM 训练不稳定，不适合作为 RL 阶段的价值函数），且最终损失对奖励平移不变，因此在 RL 前将标注 demonstrations 的平均分数归零。

**3. PPO 目标函数：三个力量的平衡**

最终的 RL 目标函数需要同时优化三个目标，发表于论文公式(2)：

$$\begin{aligned}\text{objective}(\phi) = &\mathbb{E}_{(x,y)\sim D_{\pi_\phi^{RL}}}\left[r_\theta(x, y) - \beta \log\left(\frac{\pi_\phi^{RL}(y|x)}{\pi^{SFT}(y|x)}\right)\right] \\ &+ \gamma \mathbb{E}_{x\sim D_{\text{pretrain}}}\left[\log\left(\pi_\phi^{RL}(x)\right)\right]\end{aligned}$$

- **第一项 (RM reward)**：来自训练好的奖励模型 \\(r_\\theta\\)，鼓励策略生成人类偏好的回答
- **第二项 (KL 散度惩罚)**：以系数 \\(\\beta\\) 控制新策略相对于 SFT 模型的偏离程度。这防止策略过度优化 RM（reward hacking），因为 RM 只在有限分布上训练，可能对 OOD 响应给出虚高奖励
- **第三项 (预训练混合，PPO-ptx)**：以系数 \\(\\gamma\\) 加入原始预训练数据的语言建模损失。这在保持模型基本语言能力方面至关重要——纯 PPO 模型（\\(\\gamma = 0\\)）在 SQuAD、HellaSwag、翻译等公共 NLP 基准上出现显著退化，PPO-ptx 通过"不忘记预训练语料"来缓解这一对齐税

> ⚠️ **注意**：环境是**bandit 环境**——每次 interaction 是独立的 prompt-response 对，不存在时序状态转移。这简化了 RL 问题：策略只负责生成 response，没有后续状态。

**4. 与以前 RLHF 工作的区别**

InstructGPT 是首个将 RLHF 范式在大规模语言模型上系统性验证的工作（Stiennon et al., 2020 在摘要任务上使用类似方法，但只在 1.3B 模型上实验）。关键区别：
- **规模**：扩展到 175B 参数模型和真实 API 用户分布
- **数据质量闭环**：标注员反复与模型交互，数据质量随时间迭代提升
- **PPO-ptx**：首次提出混合预训练梯度来缓解对齐税
- **多维度评估**：不仅衡量标签偏好，还评估幻觉率、有害性、真实性等关键安全维度

#### 🧪 练习题

```yaml
question: "InstructGPT 的奖励模型损失函数将 K 个 response 的排序转化为多少对 pairwise 比较？"
options:
  - "K 对"
  - "K(K-1) 对"
  - "C(K,2) 对，即 K(K-1)/2"
  - "K² 对"
answer: 2
explain: "K 个 response 的完全排序可产生所有两两组合，即组合数 C(K,2)=K(K-1)/2。例如 K=5 时产生 10 对比较，论文使用 K=4~9。"
```

```yaml
question: "InstructGPT 中 PPO-ptx 变体的主要目的是什么？"
options:
  - "加快 PPO 训练收敛速度"
  - "提高奖励模型的排序精度"
  - "缓解对齐税，防止在公共 NLP 基准上的性能退化"
  - "减少 KL 散度惩罚项的数值不稳定"
answer: 2
explain: "PPO-ptx 通过在 PPO 梯度中混合预训练损失，保留模型在原始语料上的通用语言能力，从而在提升对齐性的同时减少在 SQuAD、HellaSwag 等基准上的退化。"
```
</file_content>