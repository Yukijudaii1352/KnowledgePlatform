### InstructGPT

```yaml
id: instructgpt
name: InstructGPT
full_name: 指令遵循GPT (InstructGPT/RLHF)
year: "2022.03"
org: OpenAI
paper_url: https://arxiv.org/abs/2203.02155
category: rlhf
parent: ppo
motivation: 首次大规模验证RLHF对齐有效性
```

#### 📝 一句话总结

InstructGPT 首次把“监督微调 + 奖励模型 + PPO”三阶段 RLHF 流水线在大规模语言模型上系统跑通，证明用人类偏好而不是纯 next-token 目标，可以显著提升指令遵循、真实性和安全性。

#### 🎯 核心要点

- 三阶段训练范式：SFT 监督微调、RM 奖励建模、PPO 强化学习
- 数据来自两路：标注员编写 prompts 与真实 OpenAI API prompts
- SFT 数据约 13k prompts，RM 数据约 33k prompts，PPO 阶段约 31k prompts
- 奖励模型基于 pairwise preference 训练，单个标注任务让标注员对 \(K=4\sim 9\) 个回答排序
- PPO 阶段使用每 token 的 KL 惩罚，约束策略不要偏离 SFT 初始化过远
- 提出 PPO-ptx，把预训练分布上的语言建模梯度混入 RL 更新以缓解 alignment tax
- 人工评测中，175B InstructGPT 相比 175B GPT-3 被偏好约 85% 的时间，且 1.3B InstructGPT 也可胜过 175B GPT-3

#### 🔬 深入细节

##### 核心框架图

![InstructGPT 三阶段 RLHF 流程](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：论文 Figure 2。流程被明确拆成 SFT、RM、PPO 三步，这基本奠定了后续 RLHF 系列工作的标准工业模板。*

##### 算法伪代码

```python
# InstructGPT: SFT -> Reward Model -> PPO

# 1. Supervised Fine-Tuning
pi_sft = pretrained_gpt3.clone()
for prompt, demo in sft_data:
    loss = -log_prob(pi_sft, demo, prompt)
    update(pi_sft, loss)

# 2. Reward Model
r_theta = init_from_sft_backbone()
for prompt, ranked_responses in rm_data:
    for y_win, y_lose in all_preference_pairs(ranked_responses):
        loss = -log(sigmoid(r_theta(prompt, y_win) - r_theta(prompt, y_lose)))
        update(r_theta, loss)

# 3. PPO RLHF
pi_rl = pi_sft.clone()
value_model = init_from_reward_model()
for prompt in ppo_prompts:
    response = sample(pi_rl, prompt)
    reward = r_theta(prompt, response)
    reward -= beta * kl_to_sft(pi_rl, pi_sft, prompt, response)
    loss = ppo_objective(pi_rl, value_model, prompt, response, reward)
    loss += gamma * pretraining_loss(pi_rl)   # PPO-ptx 可选
    update(pi_rl, loss)
```

##### 1. 为什么它是 RLHF 的真正起点

在 InstructGPT 之前，语言模型已经能通过 few-shot prompt 做很多任务，但“能做”不等于“按用户意图去做”。论文把问题说得很直接：模型越大，并不会自然变得更会听话，反而会继续放大预训练目标和用户目标之间的不一致。预训练优化的是网页分布上的下一个 token 预测，而用户真正想要的是有帮助、真实、无害且能遵循约束的回答。

InstructGPT 的贡献不是发明了“偏好”这个想法，而是第一次把它在 GPT-3 级别的模型上做成一条可复现、可扩展、可量化评估的对齐流水线。后面几乎所有 RLHF、RLAIF、偏好优化工作，都是在这个三阶段框架上做局部替换或简化。

##### 2. SFT：先把模型拉到“会听指令”的分布上

论文先雇佣 40 位标注员，收集高质量 demonstrations。这里的作用不是直接把模型训到最终最优，而是给后续偏好学习一个稳定起点。论文报告 SFT 训练集大约有 13k prompts，来源同时包括标注员编写数据和 API 真实分布数据。

这一步非常关键，因为后续 RM 和 PPO 都默认模型已经大致会“回答任务本身”。如果跳过这一步，RL 阶段会浪费大量样本在探索最基本的指令遵循行为上。很多后续工作把 SFT 当作默认前置步骤，本质上就是承认 InstructGPT 这一步是必要的 distribution shaping。

##### 3. Reward Model：把人类排序蒸馏成可优化标量

奖励模型训练对应论文的第二步。对同一个 prompt，系统会生成多条候选回答，让标注员对它们排序。论文里一个标注任务通常包含 \(K=4\sim 9\) 个回答，因此一个排序任务可以展开出 \(\binom{K}{2}\) 个两两偏好比较。

RM 的核心目标可以写成：

$$
\mathcal{L}_{\mathrm{RM}}(\theta)
=
- \mathbb{E}_{(x,y_w,y_l)}
\log \sigma\!\left(r_\theta(x,y_w)-r_\theta(x,y_l)\right).
$$

其中 \(y_w\) 是更受偏好的回答，\(y_l\) 是较差回答，\(r_\theta(x,y)\) 是奖励模型输出的标量分数。直觉上，这个目标要求“优回答分数高于劣回答分数”，并通过 sigmoid 把差值转成偏好概率。

论文还指出一个很工程但很重要的细节：不能把同一排序任务拆出来的所有 pair 完全打散独立训练，否则相关性过高，RM 很容易过拟合。于是他们把同一 prompt 下的比较当成一个 batch 元素处理，这个设计后来也被大量后续工作沿用。

##### 4. PPO：真正把“人类偏好”写进策略更新

有了 RM 后，第三步就是用 PPO 最大化奖励模型分数，同时防止策略过快偏离 SFT 模型。论文给出的 RL 目标本质上是：

$$
\mathcal{J}(\phi)
=
\mathbb{E}_{(x,y)\sim D_{\pi_\phi^{\mathrm{RL}}}}
\left[
r_\theta(x,y)
- \beta \log \frac{\pi_\phi^{\mathrm{RL}}(y\mid x)}{\pi^{\mathrm{SFT}}(y\mid x)}
\right]
+
\gamma
\mathbb{E}_{x\sim D_{\mathrm{pretrain}}}
\left[\log \pi_\phi^{\mathrm{RL}}(x)\right].
$$

这里有三个力量同时作用：

- \(r_\theta(x,y)\)：鼓励模型产出更符合标注员偏好的回答。
- KL 项：限制策略不要偏离 SFT 太远，避免 reward hacking。
- 预训练混合项：也就是 PPO-ptx，用来缓解 RL 后模型在通用 NLP 能力上的退化。

> 💡 关键：InstructGPT 并不是“只用 PPO 提高奖励”。它真正重要的是把 PPO 放进一个被 SFT 和 RM 夹住的受控系统里。没有前面的分布初始化和后面的 KL 约束，PPO 很容易把模型推到奇怪区域。

##### 5. PPO-ptx：为什么它后来那么重要

论文很早就观察到 alignment tax。也就是说，模型在“更符合人类偏好”的同时，可能在 SQuAD、DROP、HellaSwag、翻译等公共基准上回退。这说明 RLHF 不是免费午餐，它会把参数容量从通用语言建模能力重新分配给偏好目标。

PPO-ptx 的思路很直接：在 RL 更新时继续混入预训练分布上的语言建模梯度。这样做并不改变“偏好对齐是主目标”，但能减少模型对原始语言能力的遗忘。论文明确指出，单纯把 KL 系数调大，并不能像 pretraining mix 那样有效地修复这些回退。

这件事影响很深，因为它定义了一个后续普遍接受的认知：RLHF 不只是优化 reward，还要处理“保持基座能力”这个正交约束。很多后来工作看似在改 RL，其实都在解决这个问题。

##### 6. 结果为什么有说服力

论文最有代表性的结果有两条。第一，175B InstructGPT 相比原始 175B GPT-3，被人类评测偏好的比例约为 85% 左右。第二，1.3B InstructGPT 甚至能在偏好评测里超过 175B GPT-3，这说明“对齐方式”有时比“参数规模”更重要。

更重要的是，这个提升不只体现在“更像客服模板”，而是同时体现在真实性和毒性控制上。论文报告 InstructGPT 在 TruthfulQA 上更好，在封闭域任务上的幻觉更少，且 toxic output 有所下降。这也是后来大家把它视为现代对齐起点的原因：它第一次用相对完整的证据说明，RLHF 确实能让模型更像“用户想要的系统”，而不是更像“互联网上的平均文本生成器”。

##### 7. 它和后续方法的边界

InstructGPT 也有明显代价：需要高质量人工 demonstrations、需要大规模人工排序、还要在线 PPO 训练，整条链条又贵又慢。这正是后续 DPO、IPO、KTO、ORPO、SimPO 等方法不断尝试“去掉 RM”或“去掉在线 RL”的原因。

但这些后续工作并没有推翻 InstructGPT，反而是在继承它定义的问题设置。它提出的核心问题一直没变：如何把“用户偏好”转成可优化目标，同时不把模型推坏。只是不同方法在答案上做了不同工程折中。

#### 🧪 练习题

```yaml
question: "InstructGPT 中 PPO-ptx 相比纯 PPO 的主要作用是什么？"
options:
  - "把奖励模型替换成价值模型"
  - "缓解 alignment tax，减少公共 NLP 基准上的能力退化"
  - "避免收集人类偏好排序数据"
  - "让 PPO 不再需要 KL 惩罚"
answer: 1
explain: "PPO-ptx 会把预训练分布上的语言建模梯度混入 RL 更新，用来减少模型在通用任务能力上的遗忘和退化。"
```
