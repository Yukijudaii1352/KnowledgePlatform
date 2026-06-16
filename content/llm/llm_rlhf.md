---
domain: llm
topic_id: llm_rlhf
topic_name: LLM人类偏好对齐
page_icon: 🎯
page_title: LLM人类偏好对齐技术演进图谱
page_subtitle: 2026-05-12 版
page_desc: 涵盖RLHF、DPO、Constitutional AI等对齐方法的原理与实践，以及2026年最新研究进展
hero_pills: []
count_pill: 24 个算法
categories:
  foundational:
    label: 奠基算法
    color: '#3b82f6'
  rl_based:
    label: 基于RL的对齐
    color: '#10b981'
  direct_preference:
    label: 直接偏好优化
    color: '#8b5cf6'
  token_multimodal:
    label: Token级与多模态
    color: '#f59e0b'
image_base: ../../content/llm/llm_rlhf/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_rlhf/overview/zhihu__大模型强化学习与偏好对齐算法梳理__571d9c80/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_rlhf/latest/zhihu__为什么大模型对齐正在从“一个奖励分数”，走向“一组可调偏好”？__7e1924d2/article.md

## 算法演化关系

```yaml
nodes:
- id: rlhf
  x: 2017.0
  y: 0
  category: foundational
- id: instructgpt
  x: 2022.0
  y: 1
  category: rl_based
- id: constitutional_ai
  x: 2022.0
  y: 1
  category: rl_based
- id: rlaif
  x: 2023.0
  y: 1
  category: rl_based
- id: dpo
  x: 2023.0
  y: 2
  category: direct_preference
- id: ipo
  x: 2024.0
  y: 2
  category: direct_preference
- id: kto
  x: 2024.0
  y: 2
  category: direct_preference
- id: orpo
  x: 2024.0
  y: 2
  category: direct_preference
- id: simpo
  x: 2024.0
  y: 2
  category: direct_preference
- id: tdpo
  x: 2024.0
  y: 3
  category: token_multimodal
- id: spac
  x: 2024.0
  y: 2
  category: direct_preference
- id: grpo
  x: 2025.0
  y: 1
  category: rl_based
- id: rto
  x: 2025.0
  y: 3
  category: token_multimodal
- id: sepo
  x: 2025.0
  y: 3
  category: token_multimodal
- id: llmdoctor
  x: 2026.08
  y: 3
  category: token_multimodal
- id: triplay_rl
  x: 2026.08
  y: 1
  category: rl_based
- id: light_alignment
  x: 2026.17
  y: 1
  category: rl_based
- id: f_grpo
  x: 2026.17
  y: 1
  category: rl_based
- id: bees
  x: 2026.17
  y: 2
  category: direct_preference
- id: bidpo
  x: 2026.17
  y: 3
  category: token_multimodal
- id: tab_po
  x: 2026.25
  y: 3
  category: token_multimodal
- id: tlpo
  x: 2026.33
  y: 3
  category: token_multimodal
- id: mm_dpo
  x: 2026.0
  y: 3
  category: token_multimodal
- id: onpo
  x: 2026.0
  y: 2
  category: direct_preference
edges:
- from: rlhf
  to: instructgpt
  label: 工业化应用
- from: rlhf
  to: constitutional_ai
  label: 原则驱动
- from: rlhf
  to: dpo
  label: 去除RL
- from: rlhf
  to: grpo
  label: 组相对优化
- from: constitutional_ai
  to: rlaif
  label: AI反馈
- from: dpo
  to: ipo
  label: 正则化改进
- from: dpo
  to: kto
  label: 二元反馈
- from: dpo
  to: orpo
  label: 去参考模型
- from: dpo
  to: simpo
  label: 长度归一化
- from: dpo
  to: tdpo
  label: Token级扩展
- from: dpo
  to: spac
  label: 自博弈对抗
- from: dpo
  to: mm_dpo
  label: 多模态扩展
- from: dpo
  to: bees
  label: 数据选择
- from: dpo
  to: onpo
  label: 在线Nash
- from: grpo
  to: triplay_rl
  label: 多角色博弈
- from: grpo
  to: light_alignment
  label: 单神经元专家
- from: grpo
  to: f_grpo
  label: 散度泛化
- from: tdpo
  to: rto
  label: MDP建模
- from: tdpo
  to: sepo
  label: 选择性优化
- from: tdpo
  to: llmdoctor
  label: 测试时对齐
- from: tdpo
  to: tlpo
  label: 语言混淆
- from: tdpo
  to: tab_po
  label: 自适应屏障
- from: tdpo
  to: bidpo
  label: VLM扩展
milestones:
- rlhf
- dpo
- grpo
```

## 核心算法

### 基于人类反馈的强化学习 (RLHF)

```yaml
id: rlhf
num: 1
name: 基于人类反馈的强化学习 (RLHF)
full_name: 基于人类反馈的强化学习 (RLHF)
year: '2017'
org: ''
parent: —
paper_url: https://arxiv.org/abs/1706.03741
project_url: ''
category: foundational
motivation: 三阶段流程，PPO+奖励模型对齐
```

#### 📝 一句话总结
Christiano 等人的《Deep Reinforcement Learning from Human Preferences》提出了“人类偏好比较 → 奖励模型 → 强化学习优化”的 RLHF 基本范式，用少量非专家偏好标注替代手写奖励函数来训练深度 RL agent。

#### 🎯 核心要点
- 将目标指定从“环境给出标量 reward”改为“人类比较两个短轨迹片段哪个更好”。
- 维护两个神经网络：策略 \(\pi\) 与奖励函数估计 \(\hat r(o,a)\)，前者优化行为，后者解释人类偏好。
- 三个异步过程协同运行：策略采样轨迹、系统选择轨迹片段对并请求人类比较、奖励模型用累计比较数据做监督学习。
- 奖励模型采用 Bradley-Terry/Luce-Shepard 风格的概率模型，用片段内预测奖励和的指数比例预测偏好概率。
- 奖励模型训练使用交叉熵损失，并支持“偏好片段 1、偏好片段 2、两者相当、无法比较”等反馈形式。
- 实际实现使用奖励模型 ensemble、bootstrap 采样、验证集正则化、dropout 和 10% 随机响应噪声来提升鲁棒性。
- 查询选择使用 ensemble disagreement 主动学习，优先询问奖励模型成员分歧大的轨迹片段对。
- 策略优化阶段把 \(\hat r\) 当作环境 reward，Atari 使用 A2C，MuJoCo 使用 TRPO；LLM 时代的 InstructGPT 后续把这一环节替换为 PPO。
- 论文在 Atari 与 MuJoCo 上展示少于 agent 环境交互 1% 的人类反馈即可训练复杂行为，部分新目标约一小时人工反馈即可完成。

#### 🔬 深入细节
![Deep RL from Human Preferences 方法示意图](https://ar5iv.labs.arxiv.org/html/1706.03741/assets/x1.png)
*图：论文 Figure 1 的方法示意，reward predictor 从轨迹片段比较中异步学习，agent 则最大化当前预测奖励。*

```python
# Deep RL from Human Preferences: high-level training loop
initialize policy pi
initialize reward_model r_hat
initialize preference_database D = []
initialize trajectory_buffer B = []

while training:
    # Process 1: policy interacts with environment.
    trajectories = rollout(policy=pi)
    B.extend(trajectories)

    # Process 2: ask humans to compare selected trajectory segments.
    candidate_pairs = sample_segment_pairs(B, length=1_to_2_seconds)
    query_pairs = select_by_ensemble_disagreement(candidate_pairs, r_hat)
    for sigma_1, sigma_2 in query_pairs:
        label = human_compare(sigma_1, sigma_2)  # prefer left, prefer right, tie, or skip
        if label != "incomparable":
            D.append((sigma_1, sigma_2, label))

    # Process 3: fit reward predictor to all collected preferences.
    train_reward_model(r_hat, D, loss="pairwise_cross_entropy")
    normalize_reward(r_hat)

    # Policy optimization uses predicted reward as if it were the environment reward.
    pi = rl_update(policy=pi, reward=lambda o, a: r_hat(o, a))
```

这篇论文解决的是奖励函数难以手写的问题，而不是一开始就面向大语言模型。传统深度 RL 假设环境每一步都返回 \(r_t\)，但现实任务常常只有人类能识别好坏，却很难把目标写成可微、可泛化、不可被 exploit 的奖励函数。论文的核心观察是：与其让人类实时给每一步打分，不如让人类比较两个 1 到 2 秒的行为片段；比较任务对非专家更自然，信息量也比单点状态评分更高。

形式化地，轨迹片段写作 \(\sigma=((o_0,a_0),\ldots,(o_{k-1},a_{k-1}))\)。人类给出 \(\sigma^1\succ\sigma^2\) 时，算法并不直接把它变成一个标量 reward，而是训练一个奖励预测器 \(\hat r\)，让片段累计预测奖励解释偏好概率：

$$
\hat P[\sigma^1 \succ \sigma^2] =
\frac{\exp\left(\sum_t \hat r(o_t^1,a_t^1)\right)}
{\exp\left(\sum_t \hat r(o_t^1,a_t^1)\right)+\exp\left(\sum_t \hat r(o_t^2,a_t^2)\right)}.
$$

这个模型可以理解为偏好学习里的 Bradley-Terry 模型：两个片段的“分数”是预测奖励之和，分数差越大，人类选择高分片段的概率越高。训练损失是对已收集比较数据库 \(\mathcal D\) 的交叉熵：

$$
\mathrm{loss}(\hat r)= -\sum_{(\sigma^1,\sigma^2,\mu)\in\mathcal D}
\mu(1)\log \hat P[\sigma^1\succ\sigma^2]
+\mu(2)\log \hat P[\sigma^2\succ\sigma^1].
$$

其中 \(\mu\) 是人类反馈转成的二项分布：若偏好左片段，\(\mu(1)=1\)；若偏好右片段，\(\mu(2)=1\)；若认为两者相当，则两边各 0.5；若无法比较则不写入数据库。这样做保留了“平局”这种有用信号，同时避免强迫人类在无意义比较中给出噪声标签。

实际系统不是简单地训练单个奖励模型。论文使用 reward predictor ensemble，每个成员从偏好数据库 bootstrap 采样训练，并保留约 \(1/e\) 的数据作为验证集来调节正则化强度；部分任务还使用 dropout。它还假设人类有 10% 概率随机作答，因此不会让 softmax 在奖励差极大时过度自信。这些细节很重要，因为奖励模型一旦过拟合，策略优化会主动寻找 \(\hat r\) 的漏洞，形成 reward hacking。

查询策略也是算法的重要组成。系统不会随机把所有轨迹片段都交给人类，而是先从 agent 当前生成的轨迹中采样大量候选片段对，再用 ensemble 成员分别预测偏好，优先选择预测方差大的片段对询问人类。这是一种近似主动学习：人类时间被花在奖励模型最不确定、最可能改变决策边界的位置上。论文也承认该启发式并非总是最优，但它体现了 RLHF 的一个核心工程原则：人类反馈是昂贵资源，必须被主动分配。

策略优化阶段与偏好建模阶段异步进行。agent 使用当前 \(\hat r(o,a)\) 产生的 reward 继续学习；新行为带来新轨迹；新轨迹产生新比较；新比较更新奖励模型。论文在 Atari 上用 A2C，在 MuJoCo 上用 TRPO，并对 \(\hat r\) 输出做零均值、固定方差归一化，因为偏好损失只决定 reward 的相对差异，无法确定绝对平移尺度。后续 LLM RLHF 继承了“奖励模型 + RL 优化”骨架，只是把环境交互变成 prompt-response bandit，把策略优化器通常换成 PPO 或 GRPO。

> ⚠️ 注意：任务元信息里提到“PPO+奖励模型对齐”，这是 LLM RLHF 里被广泛采用的后续形态；2017 年这篇 foundational paper 本身使用的是 A2C/TRPO，而不是 PPO。

#### 🧪 练习题
```yaml
question: "在 2017 年 Deep RL from Human Preferences 中，奖励模型如何从人类反馈中学习？"
options:
  - "直接把人类选择的片段赋值为 +1，未选择片段赋值为 -1，然后做普通回归"
  - "用两个轨迹片段的累计预测奖励构造偏好概率，并对人类比较标签最小化交叉熵"
  - "让人类为每个环境 step 打连续分数，再用这些分数训练 Q 函数"
  - "只收集专家完整演示轨迹，然后做行为克隆"
answer: 1
explain: "论文使用 Bradley-Terry 风格的 pairwise preference model，片段累计预测奖励决定偏好概率，并用交叉熵拟合人类比较。"
```

### InstructGPT

```yaml
id: instructgpt
num: 2
name: InstructGPT
full_name: InstructGPT
year: '2022'
org: ''
parent: rlhf
paper_url: https://arxiv.org/abs/2203.02155
project_url: ''
category: rl_based
motivation: RLHF工业化，指令遵循能力突破
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

### 宪法AI (Constitutional AI)

```yaml
id: constitutional_ai
num: 3
name: 宪法AI (Constitutional AI)
full_name: 宪法AI (Constitutional AI)
year: '2022'
org: ''
parent: rlhf
paper_url: https://arxiv.org/abs/2212.08073
project_url: ''
category: rl_based
motivation: 宪法原则驱动的自我修订机制
```

#### 📝 一句话总结
Constitutional AI 提出用一组自然语言“宪法原则”驱动模型自我批评、自我修订和 AI 偏好评估，从而在几乎不使用有害性人工偏好标签的情况下训练更 harmless 且更少逃避的助手。它把 RLHF 中最昂贵、最不透明的有害性人工反馈替换成可审计的原则提示和 RLAIF 偏好模型。

#### 🎯 核心要点
- 两阶段训练框架：监督学习阶段执行 critique-revision，自举出 SL-CAI；强化学习阶段用 AI 生成的偏好标签训练 PM，再用 RLAIF 得到 RL-CAI。
- 核心监督信号从“人工逐条标注有害性偏好”改为“少量人写原则 + 模型按原则自评”，论文实验中用于 harmlessness 的宪法原则约 16 条。
- SL 阶段对红队提示先生成有害初答，再按随机抽取的宪法原则生成 critique 和 revision，最终用修订后的回答做监督微调。
- RL 阶段把两个候选回答和一条宪法原则组织成多选题，由模型选择更符合原则的回答，形成 AI preference dataset。
- Preference Model 同时吸收 human helpfulness labels 和 AI harmlessness labels，既保持有用性，又把有害性判断从人工标签迁移到 AI feedback。
- Chain-of-thought 可用于 critique 和偏好判断，使训练信号更可读；论文发现 CoT 能提升模型识别 helpful / honest / harmless 回答的能力。
- 方法重点不是让模型简单拒答，而是减少 evasiveness：对不当请求仍解释拒绝理由，避免“无害但无用”的 canned refusal。

#### 🔬 深入细节
![Constitutional AI 两阶段流程](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：CAI 的 Figure 1。上半部分是监督式自我批评与修订，下半部分是用 AI feedback 训练 preference model 后进行 RLAIF。*

CAI 的出发点是 RLHF 在 harmlessness 上的两类瓶颈：第一，人工红队和偏好标注成本高，并且标注者需要长期接触不适内容；第二，传统 HH-RLHF 容易把“拒绝一切敏感请求”当作安全策略，导致模型 harmless 但 evasive。论文的核心改造是把人类监督压缩为一组自然语言原则，也就是 constitution；之后让模型在训练管线中显式引用这些原则完成自我修订和偏好选择。这样监督目标不再隐含在成千上万条偏好标签里，而是变成可以被阅读、讨论和替换的文本规则。

监督学习阶段可以理解为“把 helpful-only 模型拉到更安全的分布上”。给定红队提示 \(x\)，初始 helpful RLHF 模型先采样回答 \(y_0\)，这个回答可能包含有害内容；随后系统追加一条宪法原则 \(c\) 和 critique request，让同一个模型生成批评 \(g\)，再追加 revision request 生成修订回答 \(y_1\)。论文还允许重复执行多轮修订：\(y_0 \rightarrow y_1 \rightarrow \cdots \rightarrow y_K\)，每轮随机抽取不同原则，增加覆盖面。最终把 \((x, y_k)\) 作为监督样本微调预训练模型，得到 SL-CAI。这个阶段的关键作用不是最终对齐，而是降低第二阶段 RL 的探索难度：如果初始策略仍频繁产生明显有害输出，RL 需要大量惩罚信号才能把策略推回安全区域；SL-CAI 先把输出分布变得“可优化”。

```python
# Constitutional AI: supervised critique-revision stage
for prompt in red_team_prompts:
    response = helpful_rlhf_model.sample(prompt, temperature=1.0)
    revised = response
    for step in range(num_revision_steps):
        principle = random.choice(constitution_principles)
        critique = helpful_rlhf_model.sample(
            prompt + revised + critique_request(principle)
        )
        revised = helpful_rlhf_model.sample(
            prompt + revised + critique + revision_request(principle)
        )
    supervised_dataset.add(prompt, revised)

sl_cai_model = finetune(pretrained_lm, supervised_dataset + helpfulness_samples)
```

RL 阶段更接近标准 RLHF，但 harmlessness 标签来自 AI。SL-CAI 对同一个红队提示采样两个候选回答 \((y_a, y_b)\)，系统把提示、两个候选和某条宪法原则组织成多选判断题，让反馈模型回答哪个候选更符合原则。若反馈模型对选项 A/B 的 log-probability 分别为 \(\ell_a, \ell_b\)，可以得到软偏好：

$$
q_a = \frac{\exp(\ell_a)}{\exp(\ell_a)+\exp(\ell_b)}, \quad q_b = 1-q_a
$$

然后训练 preference model \(r_\phi(x,y)\) 去拟合这些软标签。若 A 是第一个候选，软标签损失可写为：

$$
\mathcal{L}_{PM} = -q_a \log \sigma(r_\phi(x,y_a)-r_\phi(x,y_b)) - q_b \log \sigma(r_\phi(x,y_b)-r_\phi(x,y_a))
$$

这里的直觉是：宪法原则本身不直接变成一个可微 reward，而是先被模型解释为 pairwise preference，再被蒸馏到 PM。论文特别强调 PM 是 hybrid 的：helpfulness 仍使用已有人工 helpfulness 偏好，而 harmlessness 使用 AI preference。这样做避免模型只优化安全而牺牲有用性。

```python
# Constitutional AI: RLAIF stage
for prompt in harmful_prompts:
    y_a = sl_cai_model.sample(prompt)
    y_b = sl_cai_model.sample(prompt)
    principle = random.choice(constitution_principles)

    # multiple-choice AI feedback, optionally with chain-of-thought
    logp_a, logp_b = feedback_lm.score_choices(
        make_constitutional_choice_prompt(prompt, y_a, y_b, principle)
    )
    q_a = softmax([logp_a, logp_b])[0]
    ai_preference_dataset.add(prompt, y_a, y_b, q_a)

pm = train_preference_model(ai_harmlessness_labels + human_helpfulness_labels)
rl_cai_model = reinforce_or_ppo(sl_cai_model, reward_model=pm, kl_reference=sl_cai_model)
```

最终的 RL 目标可以写成带 KL 约束的奖励最大化：

$$
\max_{\pi_\theta}\; \mathbb{E}_{x, y\sim\pi_\theta}[r_\phi(x,y)] - \beta D_{KL}(\pi_\theta(\cdot|x)\;||\;\pi_{SL\text{-}CAI}(\cdot|x))
$$

其中 \(\pi_{SL\text{-}CAI}\) 是参考策略，\(\beta\) 控制策略偏离幅度。KL 项很重要，因为 preference model 只在某些策略生成分布上可靠；如果 RL 过度优化 PM，模型可能学会 PM 偏好的表面模式，例如过度说教、过度安全化或固定模板。论文也讨论了 Goodharting：过训练的 RL-CAI 可能对红队提示过分严厉，甚至在很多回答里插入 boilerplate 式安慰话。因此 CAI 不是“把原则写进 prompt 就完事”，而是把原则、软标签、PM、KL 约束和人工 helpfulness 数据一起组合成可控训练管线。

与传统 RLHF 相比，CAI 最大的差别不在 RL 算法本身，而在偏好来源和可解释性。RLHF 的 harmlessness 目标主要来自人工比较，成本高且很难从标签集合中看出“模型到底被教成什么样”；CAI 则把目标暴露为文本原则，并让模型在 critique、revision 和 preference labeling 中显式使用这些原则。它并没有完全取消人类监督：原则仍由人写，helpfulness 仍可用人工标签，最终模型也要由人评估；但它显著减少了 harmlessness 标签依赖，并把监督从“海量隐式样本”转成“少量可审计规范 + AI 执行”。

论文实验中的数据流也体现了这个设计。SL 阶段使用红队提示生成多轮修订样本，同时混入 helpfulness prompts 来维持有用性；RL 阶段对 SL-CAI 生成的候选回答打 AI 偏好标签，并将这些 harmlessness 标签与 human helpfulness labels 混合训练 PM。最终 RL-CAI 在 harmlessness-helpfulness Elo 图上相对标准 HH-RLHF 更少表现出“安全换有用”的折中，尤其 CoT 版本进一步改善了 AI 反馈质量。直觉上，CoT 让反馈模型不只是输出 A/B，而是先显式比较“哪个回答更符合原则”，这使得标签更接近可检查的推理过程。

> 💡 关键：Constitutional AI 的“宪法”不是硬编码规则，也不是推理时的安全过滤器；它是训练数据生成和偏好标签生成时的监督接口。模型最终学到的是经由 SL 和 RLAIF 蒸馏后的行为分布。

#### 🧪 练习题
```yaml
question: "Constitutional AI 中 SL 阶段的主要作用是什么？"
options:
  - "先用自我批评和修订把模型输出分布拉向更安全区域，降低后续 RL 的探索难度"
  - "完全替代 preference model，使 RL 阶段不再需要奖励信号"
  - "把宪法原则硬编码进模型解码器，推理时逐条检查"
  - "只增加拒答率，从而最大化 harmlessness"
answer: 0
explain: "SL-CAI 通过 critique-revision 生成监督样本，使策略初始分布更少有害且不那么 evasive；RL 阶段仍需要 PM 和奖励优化。"
```

### 基于AI反馈的强化学习 (RLAIF)

```yaml
id: rlaif
num: 4
name: 基于AI反馈的强化学习 (RLAIF)
full_name: 基于AI反馈的强化学习 (RLAIF)
year: '2023'
org: ''
parent: constitutional_ai
paper_url: https://arxiv.org/abs/2309.00267
project_url: ''
category: rl_based
motivation: AI反馈替代人工偏好标注
```

#### 📝 一句话总结
RLAIF 用现成 LLM 生成偏好标签来替代昂贵的人类偏好标注，并在 summarization、helpful dialogue、harmless dialogue 上验证其效果可接近 RLHF。论文还提出 direct-RLAIF，直接在 RL 过程中查询 LLM 作为奖励源，避免单独训练 reward model 及其 stale reward 问题。

#### 🎯 核心要点
- Canonical RLAIF：用 off-the-shelf LLM 给候选回答对打软偏好标签，再训练 reward model，最后用 RL 优化 policy。
- 标签生成方式：提示 LLM 比较两个候选，抽取生成 “1” 和 “2” 的 log-probabilities，经 softmax 得到偏好分布。
- 位置偏差修正：同一候选对做两次推理，第二次交换 A/B 顺序，再平均两个方向的偏好分布。
- CoT 偏好判断：先让 LLM 生成评价理由，再把理由拼回提示中提取偏好 token 概率，以提升与人类偏好的一致性。
- Direct-RLAIF：不训练 RM，而是在 RL 中让 LLM 对单个生成打 1-10 分，按分数 token 概率求期望并归一化为 reward。
- 实验任务包括 Reddit TL;DR summarization、helpful dialogue generation、harmless dialogue generation，并与 RLHF 和 SFT baseline 对比。
- RL 训练使用适配语言模型的 REINFORCE with baseline，policy 和 value model 从 SFT checkpoint 初始化。

#### 🔬 深入细节
![RLAIF 与 RLHF 对比流程](https://arxiv.org/html/2309.00267v3/x3.png)
*图：论文 Figure 2。RLAIF 与 RLHF 的训练骨架相同，关键区别是 preference labels 来自 AI labeler 而不是 human annotator。*

RLAIF 解决的是 RLHF 的标注扩展性问题。标准 RLHF 需要人类比较候选回答，训练 reward model，再用 RL 优化策略；这在高质量偏好标签昂贵、任务需要大量迭代、或标注内容有心理负担时会成为瓶颈。RLAIF 保留 RLHF 的“偏好建模 + 强化学习”结构，但把偏好标注者换成一个通用 LLM。论文的关键实验问题不是“AI 标签是否理论上可行”，而是直接比较 RLAIF 与 RLHF 在端到端人类评估中的差距：结果显示在 summarization 和 helpful dialogue 中 RLAIF 与 RLHF 对 SFT 的提升非常接近，在 harmless dialogue 中 RLAIF 的 harmless rate 还高于 RLHF。

偏好标签生成是 RLAIF 的核心。给定上下文 \(x\) 和两个候选回答 \((y_1, y_2)\)，系统构造一个评价 prompt，包含任务说明、可选 few-shot 示例、待评价样本，以及类似 “Preferred Response=” 的结尾。LLM 不一定要自由生成完整判断；论文选择读取下一个 token 为 “1” 和 “2” 的 log-probability：

$$
p_{AI}(y_1 \succ y_2 \mid x) = \frac{\exp(\ell_1)}{\exp(\ell_1)+\exp(\ell_2)}, \quad
p_{AI}(y_2 \succ y_1 \mid x) = 1 - p_{AI}(y_1 \succ y_2 \mid x)
$$

这里 \(\ell_1\) 和 \(\ell_2\) 是 LLM 对选项 token 的 log-probability。相比硬标签，这种 soft label 保留了不确定性；相比解析自由文本，它实现简单且不容易因为输出格式漂移而失败。

```python
# RLAIF preference labeling with an off-the-shelf LLM
for x, y1, y2 in candidate_pairs:
    prompt = build_preference_prompt(x, y1, y2, ending="Preferred Response=")
    logp_1 = llm.logprob(prompt, next_token="1")
    logp_2 = llm.logprob(prompt, next_token="2")
    pref_forward = softmax([logp_1, logp_2])

    # position debiasing: swap the order and score again
    prompt_swapped = build_preference_prompt(x, y2, y1, ending="Preferred Response=")
    logp_1s = llm.logprob(prompt_swapped, next_token="1")
    logp_2s = llm.logprob(prompt_swapped, next_token="2")
    pref_swapped = softmax([logp_1s, logp_2s])

    # convert swapped result back to original order and average
    q_y1 = 0.5 * pref_forward[0] + 0.5 * pref_swapped[1]
    preference_dataset.add(x, y1, y2, q_y1)
```

位置偏差是论文特别处理的细节。LLM 评价器可能偏好第一个或第二个展示的候选，而不是完全根据内容判断；这个偏差在较小 labeler 上更明显。RLAIF 的修正方法很直接：每个候选对推理两次，第二次交换候选顺序，然后把第二次结果映射回原始候选顺序再平均。如果原始顺序给出 \(q\)，交换顺序后第二个位置其实对应原来的 \(y_1\)，最终偏好就是 \(\frac{1}{2}(q + q'_{mapped})\)。这不是完美去偏，但能显著降低“固定选项位置”导致的系统性错误。

论文还研究了 CoT 对 AI labeler 的影响。普通偏好提示直接要求输出 1/2；CoT 版本先把结尾替换成要求解释的句子，让 LLM 生成 rationale，然后把原 prompt、rationale 和标准结尾拼接起来，再读取 “1”/“2” 的概率。其直觉是：复杂偏好判断往往需要比较 factuality、coverage、coherence、helpfulness 或 harmlessness；先生成理由能让 LLM 在打分前显式完成评价步骤。论文发现 CoT 通常提升与人类偏好的 alignment，尤其在 summarization 上更稳定。

Canonical RLAIF 接着把 AI 软偏好蒸馏成 reward model。若 RM 对两个候选输出标量 \(r_\phi(x,y_1), r_\phi(x,y_2)\)，先用 softmax 得到 RM 的偏好分布：

$$
\hat{p}_\phi(y_1 \succ y_2|x)=\frac{\exp(r_\phi(x,y_1))}{\exp(r_\phi(x,y_1))+\exp(r_\phi(x,y_2))}
$$

若 AI label 给出软标签 \(q=[q_1,q_2]\)，RM 用 cross-entropy 拟合：

$$
\mathcal{L}_{RM}=-q_1\log \hat{p}_\phi(y_1 \succ y_2|x)-q_2\log \hat{p}_\phi(y_2 \succ y_1|x)
$$

这个步骤本质上是 distillation：把大 LLM labeler 的偏好判断压缩到一个可高效查询的 RM 中。随后 RL 阶段与 RLHF 类似，用 RM 对 policy 生成的回答打分，并用带 baseline 的 REINFORCE 更新 policy。

```python
# Canonical RLAIF training
rm = train_reward_model(preference_dataset, loss="soft_label_cross_entropy")
policy = initialize_from_sft()
value = initialize_from_sft()

for batch in prompts:
    responses = policy.sample(batch)
    rewards = rm.score(batch, responses)
    advantages = rewards - value(batch, responses).detach()
    policy_loss = -mean(advantages * policy.logprob(batch, responses))
    value_loss = mse(value(batch, responses), rewards)
    update(policy, value, policy_loss + value_loss)
```

![Direct-RLAIF 流程](https://arxiv.org/html/2309.00267v3/x5.png)
*图：论文 Figure 4。d-RLAIF 在 RL 过程中直接让 LLM 打分，不再先训练静态 reward model。*

Direct-RLAIF 是论文更进一步的简化。Canonical RLAIF 的 RM 在训练前由初始策略样本构造的数据集训练得到；随着 policy 通过 RL 逐步改变，新的生成可能偏离 RM 训练分布，导致 reward staleness。d-RLAIF 直接在 RL loop 中调用 off-the-shelf LLM 给当前生成打分，省掉 AI preference labeling 和 RM training。具体做法是让 LLM 对单个生成在 1 到 10 之间打质量分，读取每个分数 token 的概率并计算期望：

$$
s(y|x)=\sum_{i=1}^{10} i\,P(i|y,x)
$$

之后把分数归一化到 \([-1,1]\)，作为 RL reward。它的优点是 reward 总是针对当前 policy 的生成计算，不需要担心 RM 只见过旧策略样本；缺点是每次 RL rollout 都要查询更大的 LLM labeler，计算成本和服务延迟更高。

RLAIF 与 Constitutional AI 的关系也值得区分。Constitutional AI 首先引入“AI 根据宪法原则提供反馈”的思想，用于 harmlessness；RLAIF vs. RLHF 这篇论文则系统比较 AI feedback 与 human feedback，并把任务扩展到 summarization、helpful dialogue 和 harmless dialogue。它还证明了一个更强的自改进现象：即使 AI labeler 与 policy 同尺寸，甚至在某些设置下是同一个初始 checkpoint，RLAIF 仍能超过 SFT baseline。直觉上，生成回答和评价回答是不同能力切片；同一模型可能无法一次生成最佳回答，但在两个候选之间仍能识别更好的那个。

> ⚠️ 注意：RLAIF 不是“完全没有人类价值输入”。Prompt preamble、few-shot exemplars、任务定义、评估标准和最终 human evaluation 仍由人设计；它减少的是大规模逐样本偏好标注，而不是所有人类监督。

#### 🧪 练习题
```yaml
question: "Direct-RLAIF 相比 canonical RLAIF 主要解决什么问题？"
options:
  - "避免 reward model 随 policy 更新而 stale，并省去 RM 训练流程"
  - "完全取消强化学习，只做监督微调"
  - "把人类偏好标签扩展为多标签分类任务"
  - "只通过交换候选顺序来修正位置偏差"
answer: 0
explain: "d-RLAIF 在 RL 过程中直接调用 LLM 打分，因此不需要先训练静态 RM，也减少了策略分布变化导致的 RM 过时问题。"
```

### 直接偏好优化 (DPO)

```yaml
id: dpo
num: 5
name: 直接偏好优化 (DPO)
full_name: 直接偏好优化 (DPO)
year: '2023'
org: ''
parent: rlhf
paper_url: https://arxiv.org/abs/2305.18290
project_url: ''
category: direct_preference
motivation: 去除奖励模型，直接偏好分类优化
```

#### 📝 一句话总结
DPO 将 RLHF 的“训练奖励模型 + 用 RL 优化策略”改写成一个直接作用在偏好样本上的二分类损失，从而不需要显式 reward model、在线采样或 PPO。它利用 KL 约束最优策略与奖励函数之间的闭式关系，让语言模型本身同时扮演 policy 和隐式 reward model。

#### 🎯 核心要点
- 核心目标：在给定偏好数据 \((x,y_w,y_l)\) 时，直接提高 chosen response 相对 rejected response 的 log-probability。
- 理论起点与 RLHF 相同：最大化 reward，同时用 KL penalty 限制 policy 偏离 reference policy。
- 关键变换：KL 约束最优解满足 \(\pi_r(y|x) \propto \pi_{ref}(y|x)\exp(r(x,y)/\beta)\)，因此 reward 可由 policy/reference 的 log-ratio 表示。
- 在 Bradley-Terry 偏好模型下，两个回答的 partition function 抵消，得到只依赖 \(\pi_\theta\) 和 \(\pi_{ref}\) 的偏好概率。
- DPO 损失是 logistic binary cross-entropy，不需要训练独立 RM，也不需要在微调时从 policy rollout 后再跑 PPO。
- \(\beta\) 控制偏离 reference 的强度：越大越保守，越小越允许 policy 为满足偏好而远离参考模型。
- 实验覆盖 sentiment control、summarization、single-turn dialogue，论文报告 DPO 与 PPO-based RLHF 相当或更好，同时实现更简单。

#### 🔬 深入细节
![DPO 避免显式强化学习流程](https://arxiv.org/html/2305.18290v3/figures/diagrams/teaser.png)
*图：论文 Figure 1。传统 RLHF 先拟合 reward model 再用 RL 优化；DPO 直接把偏好数据转成 policy 的分类损失。*

DPO 要解决的是 RLHF 工程复杂度和训练不稳定性。标准 RLHF 通常有三步：先 SFT 得到参考模型，再用偏好数据训练 reward model，最后用 PPO 或类似 RL 算法让 policy 最大化 reward，同时用 KL 约束防止偏离参考模型。这个流程有多个脆弱点：reward model 可能被过优化，PPO 需要在线采样和大量超参调试，语言生成又是离散动作空间，导致端到端训练成本高。DPO 的核心观察是：如果 RLHF 的目标本身包含 KL 约束，那么最优 policy 与 reward 之间存在闭式映射；既然偏好数据只关心 reward 差值，就可以把 reward model 消去，直接优化 policy。

DPO 沿用 RLHF 的 KL-constrained reward maximization 目标。给定 prompt \(x\)、policy \(\pi_\theta\)、reference policy \(\pi_{ref}\)、奖励 \(r(x,y)\)，传统目标可写为：

$$
\max_{\pi_\theta}\; \mathbb{E}_{x\sim\mathcal{D}, y\sim\pi_\theta(y|x)}[r(x,y)] - \beta D_{KL}(\pi_\theta(y|x)\,||\,\pi_{ref}(y|x))
$$

其中 \(\beta\) 是 KL 温度。对任意固定 reward，这个目标的最优解为：

$$
\pi_r(y|x)=\frac{1}{Z(x)}\pi_{ref}(y|x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

等价地，reward 可以写成：

$$
r(x,y)=\beta\log\frac{\pi_r(y|x)}{\pi_{ref}(y|x)}+\beta\log Z(x)
$$

这一步是 DPO 的关键。\(Z(x)\) 是对所有可能回答求和的 partition function，直接估计很困难；但偏好模型只使用两个回答的 reward 差，因此同一个 prompt 下的 \(\beta\log Z(x)\) 会抵消。

```python
# DPO training loop on static preference pairs
reference = freeze(sft_model)
policy = initialize_from(sft_model)

for x, y_w, y_l in preference_loader:
    logp_w = policy.logprob(x, y_w)
    logp_l = policy.logprob(x, y_l)
    ref_logp_w = reference.logprob(x, y_w)
    ref_logp_l = reference.logprob(x, y_l)

    chosen_adv = logp_w - ref_logp_w
    rejected_adv = logp_l - ref_logp_l
    logits = beta * (chosen_adv - rejected_adv)
    loss = -log_sigmoid(logits)
    update(policy, loss)
```

在 Bradley-Terry 偏好模型中，人类偏好概率由 reward 差决定：

$$
p^*(y_w \succ y_l|x)=\sigma(r^*(x,y_w)-r^*(x,y_l))
$$

把上面的 reward-policy 关系代入并消去 \(Z(x)\)，得到 DPO 对偏好样本的概率模型：

$$
p_\theta(y_w \succ y_l|x)=\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\beta\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)
$$

于是 DPO 损失就是负对数似然：

$$
\mathcal{L}_{DPO}(\pi_\theta;\pi_{ref}) = -\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{ref}(y_w|x)}-\beta\log\frac{\pi_\theta(y_l|x)}{\pi_{ref}(y_l|x)}\right)\right]
$$

这个式子有两个直觉层次。第一，\(\log \pi_\theta(y_w|x)-\log \pi_\theta(y_l|x)\) 鼓励模型更偏向 chosen 而不是 rejected。第二，减去 reference 的 log-ratio 后，DPO 鼓励的是“相对参考模型更偏好 chosen”，而不是无约束地把 chosen 概率推到极高、把 rejected 概率推到极低。这相当于把 KL 约束内化到了分类 logits 里，避免 naive unlikelihood 那种容易导致语言质量崩坏的目标。

DPO 与 reward modeling 的关系也很重要。DPO 并不是说 reward 不存在，而是使用了一个隐式 reward：

$$
r_\theta(x,y)=\beta\log\frac{\pi_\theta(y|x)}{\pi_{ref}(y|x)} + C(x)
$$

其中 \(C(x)\) 是任意只依赖 prompt 的常数。Bradley-Terry 只看同一 prompt 下两个回答的 reward 差，所以 \(C(x)\) 不影响偏好概率。这解释了论文副标题 “Your Language Model is Secretly a Reward Model”：当前 policy 相对 reference 增加某个回答概率的幅度，本身就可以被解释为该回答的隐式奖励。

与 PPO-based RLHF 相比，DPO 的训练数据流更短。PPO 需要先训练 RM，然后循环采样 response、计算 reward、估计 advantage、更新 policy 和 value model，还要调 KL penalty、reward normalization、rollout batch 等参数；DPO 只需要静态偏好数据和 frozen reference model，像普通监督学习一样跑 binary cross-entropy。这降低了实现门槛，也减少了 reward hacking 的一部分来源：没有独立 RM 就没有“policy 钻 RM 漏洞”的同样形式。不过 DPO 仍然可能过拟合偏好数据或学到数据中的偏差，因此 reference model、\(\beta\)、数据质量和 chosen/rejected 的覆盖范围仍然关键。

DPO 的 \(\beta\) 可以理解为“偏好优化力度”。当 \(\beta\) 较大时，同样的 log-ratio 差异会产生更尖锐的偏好概率，训练会更强烈地区分 chosen/rejected；但从 KL 目标角度看，\(\beta\) 也对应偏离 reference 的惩罚尺度。实践中它控制了模型在遵循偏好与保持原模型语言分布之间的折中。过小可能让更新太弱，过大可能让模型过度追随偏好对中的局部模式。

> 💡 关键：DPO 的“直接”不是直接最大化 chosen 的似然，而是直接最大化一个从 RLHF KL 目标推导出的偏好概率；reference log-probability 是防止它退化成普通偏好分类的重要项。

#### 🧪 练习题
```yaml
question: "DPO 为什么可以不训练显式 reward model？"
options:
  - "因为 KL 约束 RLHF 目标给出了 reward 与最优 policy 的闭式关系，偏好差值中 partition function 会抵消"
  - "因为 DPO 假设所有 chosen responses 都来自同一个人工专家"
  - "因为 DPO 只做 SFT，不使用 rejected responses"
  - "因为 Bradley-Terry 模型不需要任何奖励概念"
answer: 0
explain: "DPO 将 reward 写成 policy/reference log-ratio；在同一 prompt 的两个回答比较中 Z(x) 抵消，因此可直接用 policy 参数化偏好概率。"
```

### 身份偏好优化 (IPO)

```yaml
id: ipo
num: 6
name: 身份偏好优化 (IPO)
full_name: 身份偏好优化 (IPO)
year: '2024'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2310.12036
project_url: ''
category: direct_preference
motivation: MSE正则化解决DPO过拟合
```

#### 📝 一句话总结
IPO 将偏好学习从 DPO 的 logistic 分类目标改写为带固定目标间隔的均方误差回归，解决了 DPO 在确定性或近确定性偏好样本上让 KL 正则失效、过度远离参考模型的问题。

#### 🎯 核心要点
- 提出统一的 \(\Psi\)-Preference Optimisation（\(\Psi\)PO）框架，把 RLHF、DPO 与 IPO 都表示为“偏好函数收益 + KL 正则”的离线策略优化问题。
- 指出 DPO 对应 \(\Psi(q)=\log(q/(1-q))\)，当经验偏好 \(q\) 接近 0 或 1 时目标无界，容易忽略 KL 正则并过拟合偏好数据。
- IPO 选择恒等映射 \(\Psi(q)=q\)，直接优化总偏好概率 \(p^*_\rho(\pi \succ \mu)\)，保持偏好收益有界。
- 核心损失是 MSE：把新旧策略的 winner/loser 对数似然比差回归到 \(\frac{1}{2\tau}\)，而不是像 DPO 那样持续放大偏好 margin。
- 训练不需要显式奖励模型，也不需要 PPO 采样；只需要偏好三元组 \((x,y_w,y_l)\) 和冻结参考策略 \(\pi_\text{ref}\)。
- 理论上给出 root-finding 形式和唯一最优性证明，说明 IPO 的经验损失仍会把解拉向带 KL 约束的最优策略。

#### 🔬 深入细节
![IPO 与 DPO 在确定性偏好下的行为对比](https://ar5iv.labs.arxiv.org/html/2310.12036/assets/x1.png)
*图：论文中的确定性偏好实验。DPO 在偏好样本完全偏向某个动作时倾向于收敛到贪心策略；IPO 会随 \(\tau\) 保留对参考策略的正则约束。*

IPO 的出发点不是“再设计一个 DPO 变体”，而是先把偏好优化抽象成一个统一目标。给定行为策略 \(\mu\)、参考策略 \(\pi_\text{ref}\)、真实 pairwise preference \(p^*(y \succ y'|x)\)，论文定义：

$$
\max_\pi\;\mathbb{E}_{x\sim\rho,\,y\sim\pi(\cdot|x),\,y'\sim\mu(\cdot|x)}
\left[\Psi\left(p^*(y \succ y'|x)\right)\right]
-\tau D_\text{KL}(\pi\|\pi_\text{ref}).
$$

当 \(\Psi(q)=\log\frac{q}{1-q}\) 且 Bradley-Terry 假设成立时，这个目标与 RLHF/DPO 的最优策略一致。问题在于 \(\log\frac{q}{1-q}\) 是无界函数：如果经验数据里某个 winner 总是胜过 loser，\(\hat q=1\)，那么 logit 偏好趋向无穷大，任何有限的 KL 系数 \(\tau\) 都难以阻止策略把 loser 概率压到 0。这解释了论文所谓的 DPO overfitting：DPO 不是没有正则项，而是偏好项在确定性样本上会变得过强。

IPO 的关键替换是设 \(\Psi(q)=q\)，也就是直接优化“一个策略输出相对行为策略输出被偏好的概率”：

$$
\max_\pi\;p^*_\rho(\pi \succ \mu)-\tau D_\text{KL}(\pi\|\pi_\text{ref}).
$$

由于偏好概率天然落在 \([0,1]\)，偏好收益不会像 logit preference 那样爆炸。论文进一步把这个目标推导成 root-finding 问题。定义

$$
h_\pi(y,y',x)=\log\frac{\pi(y|x)\pi_\text{ref}(y'|x)}{\pi(y'|x)\pi_\text{ref}(y|x)},
$$

它度量的是“当前策略相对参考策略，把 \(y\) 放到 \(y'\) 前面的 log-ratio 变化”。若最优策略为 \(\pi^*\)，则该 log-ratio 应等于偏好收益差除以正则强度。IPO 用平方误差去拟合这个条件。

论文先给出 population loss：

$$
L(\pi)=\mathbb{E}_{y,y'\sim\mu}\left[\left(h_\pi(y,y')-
\frac{p^*(y\succ\mu)-p^*(y'\succ\mu)}{\tau}\right)^2\right].
$$

实际训练时我们拿到的是偏好样本 \((x,y_w,y_l)\)，而不是完整的 \(p^*\)。利用 \((y_w,y_l,I=1)\) 与反向样本 \((y_l,y_w,I=0)\) 的对称性，论文把经验损失化简为：

$$
\mathcal{L}_\text{IPO}
=\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[\left(h_\pi(y_w,y_l,x)-\frac{\tau^{-1}}{2}\right)^2\right].
$$

这条公式体现了 IPO 与 DPO 的本质差异。DPO 的 \(-\log\sigma(\cdot)\) 会在 winner margin 不够大时继续推动 margin 增大；IPO 则只要求 margin 接近固定目标 \(\frac{1}{2\tau}\)。当 margin 已经足够时，继续增大反而会产生 MSE 惩罚，因此 IPO 自带“不要离参考模型太远”的机制。

```python
# IPO sampled loss, simplified from Algorithm 1 in the paper
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # sequence log-probabilities under trainable policy
    logp_w = policy.logprob(x, y_w)
    logp_l = policy.logprob(x, y_l)

    # frozen reference model log-probabilities
    with no_grad():
        ref_logp_w = ref_policy.logprob(x, y_w)
        ref_logp_l = ref_policy.logprob(x, y_l)

    h = (logp_w - logp_l) - (ref_logp_w - ref_logp_l)
    target_margin = 1.0 / (2.0 * tau)
    loss = mean((h - target_margin) ** 2)

    loss.backward()
    optimizer.step()
```

从训练流程看，IPO 与 DPO 一样可以直接作用在离线偏好数据上：先用 SFT 或其他方式得到 \(\pi_\text{ref}\)，冻结它；然后对当前策略 \(\pi_\theta\) 计算 winner 和 loser 的序列级 log probability；最后最小化上面的平方误差。它不需要奖励模型，也不需要像 PPO 那样从当前策略 rollout 新样本，因此工程复杂度接近 DPO。

> 💡 关键：IPO 的“正则化”不只是外部 KL 项，而是被折进了目标 margin 本身。\(\tau\) 越大，\(\frac{1}{2\tau}\) 越小，策略相对参考模型的 winner/loser log-ratio 变化就越受限制。

这也解释了论文中 deterministic preference 的实验现象。如果数据只告诉模型“\(y_a\) 总是优于 \(y_b\)”，DPO 会不断强化 \(y_a\) 相对 \(y_b\) 的概率比；IPO 则只把该比值推到与 \(\tau\) 匹配的有限间隔。对于 LLM 对齐，这一点很重要，因为偏好数据常常是稀疏的、单次标注的、带采样偏差的；把一次胜负当成无限强的偏好证据，会使模型牺牲多样性和参考模型中已有的语言能力。

与传统 RLHF 相比，IPO 避免了 reward model 的外推问题：不需要先拟合 \(r(x,y)\)，再假设该奖励能泛化到当前策略新采样的分布。与 DPO 相比，IPO 保留了“直接从偏好更新策略”的便利，但用有界 identity preference 和 MSE margin 避免了 DPO 的无界 logit 偏好。代价是 IPO 的目标更像“回归到一个固定偏好间隔”，当任务确实需要非常强的偏好压制时，\(\tau\) 的选择会直接决定对齐强度。

#### 🧪 练习题
```yaml
question: "IPO 为什么能缓解 DPO 在确定性偏好样本上的过拟合？"
options:
  - "它用 PPO rollout 生成更多负样本"
  - "它把 winner/loser 的相对 log-ratio 回归到有限目标，而不是无限放大偏好 margin"
  - "它删除了参考模型，避免 KL 计算误差"
  - "它只训练 reward model，不直接更新策略"
answer: 1
explain: "IPO 的 sampled loss 是 MSE，目标间隔为 1/(2τ)。当 margin 超过目标时继续增大会被惩罚，因此不会像 DPO 的 logit preference 那样在 q=1 时趋向无界。"
```

### Kahneman-Tversky优化 (KTO)

```yaml
id: kto
num: 7
name: Kahneman-Tversky优化 (KTO)
full_name: Kahneman-Tversky优化 (KTO)
year: '2024'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2402.01306
project_url: ''
category: direct_preference
motivation: 前景理论，仅需二元好坏反馈
```

#### 📝 一句话总结
KTO 把 LLM 对齐目标解释为前景理论下的人类效用最大化，用“好/坏”二元反馈替代成对偏好数据，在不构造 preference pair 的情况下达到接近或超过 DPO 的对齐效果。

#### 🎯 核心要点
- 提出 Human-Aware Losses（HALOs）视角，说明 DPO、PPO-Clip 等有效对齐损失隐式包含类似人类决策的参考点、收益递减和损失敏感性。
- KTO 不最大化 preference likelihood，而是直接最大化单个生成样本的 Kahneman-Tversky 式主观效用。
- 训练数据只需要 \((x,y,\text{desirable/undesirable})\) 标签，不要求同一个 prompt 下的 winner/loser 成对比较。
- 使用隐式奖励 \(r_\theta(x,y)=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)}\)，并以 KL 参考点 \(z_0\) 判断该输出是相对收益还是相对损失。
- 对 desirable 与 undesirable 样本分别设置 \(\lambda_D,\lambda_U\)，可处理正负反馈比例严重不均衡的数据。
- 实践中对 \(z_0\) 停止梯度，并用 batch 内错配输出估计 KL 参考点，以提高训练稳定性。

#### 🔬 深入细节
![KTO 只需要二元好坏反馈](https://ar5iv.labs.arxiv.org/html/2402.01306/assets/figures/teaser.png)
*图：传统 RLHF/DPO 依赖成对偏好；KTO 只需要判断单个输出对输入是否 desirable，因此能利用更便宜、更丰富的二元反馈。*

KTO 的核心问题是：LLM 对齐是否一定需要 \((y_w,y_l)\) 这种 pairwise preference？论文认为不一定。DPO 的成功并不只来自 pair 数据本身，还来自损失函数带有合适的 inductive bias。作者把这类损失称为 HALO：它们不是简单地最大化 token likelihood，而是围绕“相对某个参考点的收益/损失”塑造效用，这与 Kahneman 和 Tversky 的前景理论相似。

前景理论中的 value function 通常写作：

$$
v(z;\lambda,\alpha,z_0)=
\begin{cases}
(z-z_0)^\alpha, & z\ge z_0 \\
-\lambda(z_0-z)^\alpha, & z<z_0
\end{cases}
$$

其中 \(z_0\) 是参考点，\(\alpha\) 控制曲率，\(\lambda\) 控制损失厌恶。KTO 将这个思想迁移到 LLM：输出 \(y\) 的“收益”不是金钱，而是当前模型相对参考模型对该输出增加了多少 log probability。也就是隐式奖励：

$$
r_\theta(x,y)=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)}.
$$

为了避免原始幂函数数值不稳定，KTO 用 sigmoid 作为效用函数的平滑替代，并引入 \(\beta\) 控制饱和速度。默认损失为：

$$
L_\text{KTO}(\pi_\theta,\pi_\text{ref})=
\mathbb{E}_{x,y\sim D}\left[\lambda_y-v(x,y)\right],
$$

其中

$$
\begin{aligned}
r_\theta(x,y)&=\log\frac{\pi_\theta(y|x)}{\pi_\text{ref}(y|x)},\\
z_0&=D_\text{KL}(\pi_\theta(\cdot|x)\|\pi_\text{ref}(\cdot|x)),\\
v(x,y)&=
\begin{cases}
\lambda_D\sigma\left(\beta(r_\theta(x,y)-z_0)\right), & y\sim y_\text{desirable}|x,\\
\lambda_U\sigma\left(\beta(z_0-r_\theta(x,y))\right), & y\sim y_\text{undesirable}|x.
\end{cases}
\end{aligned}
$$

这组公式的直觉很直接：如果一个输出被标记为 desirable，模型应该提高它相对参考模型的隐式奖励，并且这个提升要超过参考点 \(z_0\)；如果输出是 undesirable，模型应该让它的隐式奖励低于参考点。\(z_0\) 的作用类似“人类最近看过的平均质量基准”：不是所有概率提升都值得奖励，只有超过基准的提升才是收益。

```python
# KTO training loop, simplified from the paper's implementation notes
for batch in binary_feedback_loader:
    x, y, label = batch.prompt, batch.output, batch.is_desirable

    logp = policy.logprob(x, y)
    with no_grad():
        ref_logp = ref_policy.logprob(x, y)

    reward = logp - ref_logp

    # Biased but stable KL/reference-point estimate using mismatched outputs.
    y_shift = shift_outputs_within_microbatch(y)
    kl_hat = mean(policy.logprob(x, y_shift) - ref_policy.logprob(x, y_shift))
    z0 = stop_gradient(max(0.0, kl_hat))

    value_good = lambda_D * sigmoid(beta * (reward - z0))
    value_bad = lambda_U * sigmoid(beta * (z0 - reward))

    loss = where(label == "desirable",
                 lambda_D - value_good,
                 lambda_U - value_bad)
    loss = mean(loss)

    loss.backward()
    optimizer.step()
```

KTO 的训练流程与 DPO 最大的不同是数据组织。DPO 必须看到同一个 prompt 下的 \(y_w\) 和 \(y_l\)，因为它优化的是二者的相对偏好概率；KTO 只需要知道一个输出是好还是坏。因此，一份偏好数据可以拆成两条 KTO 样本，真实生产系统中的 thumbs-up/thumbs-down、审核通过/拒绝、用户采纳/丢弃等二元信号也可以直接使用。

> 💡 关键：KTO 并不是把 binary label 当作 +1/-1 reward 直接做分类，而是把 label 放进“相对参考点的效用函数”里。KL 参考点让模型不能用整体抬高所有输出概率的方式投机，必须学到哪些模式真正对应 desirable。

论文还强调 \(\lambda_D\) 与 \(\lambda_U\) 的工程价值。如果正样本远少于负样本，可以提高 desirable 一侧的权重，或者反过来降低 undesirable 一侧的权重，使两类反馈在期望梯度上保持平衡。这就是 KTO 能处理极端数据不均衡的原因之一：它不要求每个好样本都有一个对应坏样本，只要求整体上用权重校准正负反馈的贡献。

与 IPO/DPO 相比，KTO 的参考模型仍然存在，但它服务于隐式奖励和 KL 参考点，而不是 pairwise log-ratio。与 RLHF 相比，KTO 不训练单独的 reward model，也不需要在线 rollout；与 DPO 相比，KTO 放弃 Bradley-Terry preference likelihood，改为优化人类效用形状。这样做的代价是需要选择 \(\beta,\lambda_D,\lambda_U\) 以及 KL 估计方式；但收益是可以使用更便宜、更自然的二元反馈，并能在论文实验中匹配或超过 DPO。

#### 🧪 练习题
```yaml
question: "KTO 相比 DPO 对数据格式的主要放宽是什么？"
options:
  - "KTO 不需要任何参考模型"
  - "KTO 只需要单个输出的 desirable/undesirable 标签，不要求成对偏好"
  - "KTO 只使用无监督预训练语料"
  - "KTO 必须使用人工打分的连续 reward"
answer: 1
explain: "KTO 的损失作用在 (x, y, binary label) 上，通过前景理论式效用区分好坏输出；DPO 则需要 (x, y_w, y_l) 成对偏好。"
```

### 比值比偏好优化 (ORPO)

```yaml
id: orpo
num: 8
name: 比值比偏好优化 (ORPO)
full_name: 比值比偏好优化 (ORPO)
year: '2024'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2403.07691
project_url: ''
category: direct_preference
motivation: 单阶段对齐，无需参考模型
```

#### 📝 一句话总结
ORPO 将 SFT 的负对数似然损失与 odds ratio 偏好惩罚合并到一个单阶段目标中，在不使用冻结参考模型和额外 DPO/RLHF 阶段的情况下同时完成指令适配与偏好对齐。

#### 🎯 核心要点
- 提出 reference-free、monolithic 的偏好优化流程：一个训练阶段内同时做 SFT 和偏好对齐。
- 观察到普通 SFT 只提升 chosen response 的概率并不够，rejected response 的概率也可能随领域适配一起升高。
- 使用 odds \(P/(1-P)\) 而非单纯概率比来衡量 chosen 相对 rejected 的可生成性优势。
- 总损失为 \(\mathcal{L}_\text{SFT}+\lambda\mathcal{L}_\text{OR}\)，其中 \(\mathcal{L}_\text{OR}\) 用 log-sigmoid 最大化 chosen/rejected odds ratio。
- 不需要 DPO 中的 \(\pi_\text{ref}\)，因此训练时少一个冻结模型，也减少每个 batch 的 forward 计算和显存占用。
- 在 HH-RLHF、Binarized UltraFeedback、AlpacaEval、MT-Bench 等实验中验证了 125M 到 7B 规模模型上的有效性。

#### 🔬 深入细节
![ORPO 与 RLHF/DPO/SFT 流程对比](https://ar5iv.labs.arxiv.org/html/2403.07691/assets/x2.png)
*图：ORPO 将偏好惩罚直接附加到 SFT 目标中，不再需要先 SFT 再执行 DPO/RLHF，也不需要保留单独的参考模型。*

ORPO 的动机来自一个很实际的现象：SFT 在 chosen responses 上训练时，会把模型推向目标对话/指令域，但这种领域适配也可能提升 rejected responses 的概率。也就是说，模型学会了“像这个数据集一样说话”，却未必学会了“避开坏回答风格”。传统 DPO 通常在 SFT 后再做一轮偏好优化，并依赖冻结的 SFT 模型作为参考；ORPO 试图把这两步合并。

首先定义序列级平均 log-likelihood：

$$
\log P_\theta(y|x)=\frac{1}{m}\sum_{t=1}^{m}\log P_\theta(y_t|x,y_{<t}).
$$

ORPO 不直接比较 \(P_\theta(y_w|x)\) 和 \(P_\theta(y_l|x)\)，而是比较 odds：

$$
\mathbf{odds}_\theta(y|x)=\frac{P_\theta(y|x)}{1-P_\theta(y|x)}.
$$

chosen over rejected 的 odds ratio 为：

$$
\mathbf{OR}_\theta(y_w,y_l)=
\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}.
$$

ORPO 的总目标由两部分组成：

$$
\mathcal{L}_\text{ORPO}=\mathbb{E}_{(x,y_w,y_l)}
\left[\mathcal{L}_\text{SFT}+\lambda\mathcal{L}_\text{OR}\right],
$$

其中 \(\mathcal{L}_\text{SFT}\) 是对 chosen response 的常规 causal LM NLL，\(\mathcal{L}_\text{OR}\) 是偏好项：

$$
\mathcal{L}_\text{OR}=-\log\sigma\left(
\log\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}
\right).
$$

这个形式可以理解为：如果 chosen 的 odds 已经明显大于 rejected，log-sigmoid 损失接近 0；如果 rejected 的 odds 不低，损失会变大，迫使模型降低 rejected 或提高 chosen。与 DPO 的最大区别是公式里没有 \(\pi_\text{ref}\)。ORPO 不需要衡量“当前策略相对参考策略变化多少”，而是在当前模型自身的 SFT 过程中直接塑造 chosen/rejected 的 odds 对比。

```python
# ORPO single-stage objective
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    logp_w = model.avg_logprob(x, y_w)
    logp_l = model.avg_logprob(x, y_l)

    p_w = exp(logp_w)
    p_l = exp(logp_l)
    odds_w = p_w / (1.0 - p_w + eps)
    odds_l = p_l / (1.0 - p_l + eps)

    sft_loss = -mean(logp_w)
    odds_ratio_logit = log(odds_w + eps) - log(odds_l + eps)
    or_loss = -mean(logsigmoid(odds_ratio_logit))

    loss = sft_loss + lambda_or * or_loss
    loss.backward()
    optimizer.step()
```

论文还通过梯度解释 odds ratio 为什么适合放进 SFT。偏好项的梯度可写为两个因子的乘积：

$$
\nabla_\theta\mathcal{L}_\text{OR}=\delta(d)\cdot h(d),
$$

其中

$$
\delta(d)=\left[1+\frac{\mathbf{odds}_\theta(y_w|x)}{\mathbf{odds}_\theta(y_l|x)}\right]^{-1},
$$

$$
h(d)=\frac{\nabla_\theta\log P_\theta(y_w|x)}{1-P_\theta(y_w|x)}-
\frac{\nabla_\theta\log P_\theta(y_l|x)}{1-P_\theta(y_l|x)}.
$$

当 chosen odds 已经高于 rejected odds 时，\(\delta(d)\) 变小，偏好项自动减弱；当模型仍然更容易生成 rejected response 时，\(\delta(d)\) 较大，更新会更强。\(h(d)\) 则把 chosen 和 rejected 的梯度做对比，分母 \(1-P\) 会在相应概率较高时改变梯度尺度，使模型在适配 chosen 风格的同时抑制 rejected 风格。

> 💡 关键：ORPO 不是“只在 SFT 上加一个负样本交叉熵”。它用 odds ratio 建模 chosen 与 rejected 的相对可生成性，因此偏好信号始终是成对、动态的，而不是预先定义一个固定的禁用 token 集合。

为什么不用简单 probability ratio？论文认为，在 SFT 与偏好对齐合并时，模型还处于领域适配阶段，过强地压低 rejected 可能导致退化。odds ratio 对 \(P\) 接近 0 或 1 的区域更敏感，配合 log-sigmoid 后能提供更合适的区分尺度：既让 chosen 相对 rejected 获得优势，又避免像单独的概率比目标那样需要通过过度压制 rejected 来制造 margin。

从系统角度看，ORPO 的优势很直接。DPO 通常需要当前模型和参考模型都对 \(y_w,y_l\) 做 forward；RLHF 还要奖励模型与 PPO rollout。ORPO 只有一个正在训练的模型，对 chosen/rejected 各算一次 likelihood 即可。论文因此称其为 monolithic preference optimization：同一个目标同时承担领域适配、偏好区分和拒绝风格惩罚。

ORPO 的局限也来自这个设计。由于没有参考模型，\(\lambda\) 控制的偏好项强度非常关键：太小会退化成普通 SFT，太大则可能牺牲语言建模和多样性。它适合已有明确 chosen/rejected pair 的训练集，并且特别适合希望降低显存、减少训练阶段、快速做指令模型对齐的场景。

#### 🧪 练习题
```yaml
question: "ORPO 相比 DPO 的核心工程简化是什么？"
options:
  - "ORPO 删除了 chosen response，只训练 rejected response"
  - "ORPO 不需要冻结参考模型，而是在 SFT 损失中直接加入 odds ratio 偏好项"
  - "ORPO 必须先训练 reward model，再做 PPO"
  - "ORPO 只适用于无标签预训练数据"
answer: 1
explain: "ORPO 的目标是 L_SFT + λL_OR，偏好项只依赖当前模型对 chosen/rejected 的 odds ratio，不需要 DPO 中的参考模型。"
```

### 简单偏好优化 (SimPO)

```yaml
id: simpo
num: 9
name: 简单偏好优化 (SimPO)
full_name: 简单偏好优化 (SimPO)
year: '2024'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2405.14734
project_url: ''
category: direct_preference
motivation: 长度归一化奖励，去参考模型
```

#### 📝 一句话总结
SimPO 提出一种无需参考模型的直接偏好优化方法，用序列平均 log probability 作为隐式奖励，并在 Bradley-Terry 目标中加入目标奖励间隔，解决 DPO 奖励与生成时似然指标不一致、训练成本较高的问题。

#### 🎯 核心要点
- 参考模型移除：训练目标只依赖当前策略模型 `πθ`，不再需要同时加载 `πref`。
- 长度归一化奖励：用 response token 的平均 log probability 作为隐式奖励，缓解长回答天然累积更大 log probability 差异的问题。
- 目标奖励间隔：在偏好概率中加入 margin `γ`，要求 winning response 比 losing response 至少高出固定间隔。
- 与生成目标对齐：训练时优化的平均 token log likelihood 更接近推理时 greedy、beam search 或采样近似追求的生成准则。
- 经验基准覆盖 AlpacaEval 2、MT-Bench、Arena-Hard，并在 Mistral、Llama 3、Gemma 2 等 base 与 instruct 设置上比较 DPO、IPO、KTO、ORPO 等方法。

#### 🔬 深入细节
![SimPO 与 DPO 奖励形式对比](https://arxiv.org/html/2405.14734v3/x1.png)
*图：论文 Figure 1 展示 SimPO 与 DPO 的核心差异在奖励形式：DPO 使用相对参考模型的 log-ratio，SimPO 直接使用当前策略的长度归一化平均 log probability，并展示其在 AlpacaEval 2 与 Arena-Hard 上相对 DPO 的优势。*

```python
# SimPO 核心训练逻辑，省略 tokenizer/padding/optimizer 细节
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # 只前向当前策略模型，不再前向 reference model
    logp_w_tokens = policy.log_probs(x, y_w)      # shape: [B, len_w]
    logp_l_tokens = policy.log_probs(x, y_l)      # shape: [B, len_l]

    # 长度归一化隐式奖励：平均 token log probability
    reward_w = beta * logp_w_tokens.sum(dim=-1) / len(y_w)
    reward_l = beta * logp_l_tokens.sum(dim=-1) / len(y_l)

    # Bradley-Terry 偏好目标 + 目标奖励间隔 gamma
    logits = reward_w - reward_l - gamma
    loss = -log_sigmoid(logits).mean()

    loss.backward()
    optimizer.step()
    optimizer.zero_grad()
```

DPO 的出发点是把 RLHF 中“先学 reward model，再做 KL 正则化 RL”的流程改写成一个直接分类式目标。它的隐式奖励通常写作：

$$
r_{\mathrm{DPO}}(x,y)=\beta\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}+\beta\log Z(x)
$$

其中 `πref` 通常是 SFT 模型。这个形式的好处是稳定，但 SimPO 论文指出它有两个直接代价：训练时必须加载参考模型，显存和计算几乎增加一份；更重要的是，DPO 奖励衡量的是“相对参考模型提高了多少”，而推理时模型实际用来生成的是当前策略自己的 token likelihood。也就是说，DPO 可能把某个回答判为高奖励，只是因为它比参考模型更偏向该回答，并不代表当前模型在生成时真的更倾向产生它。

SimPO 的核心改动是把隐式奖励改成当前策略的平均 log probability：

$$
r_{\mathrm{SimPO}}(x,y)=\frac{\beta}{|y|}\sum_{t=1}^{|y|}\log \pi_\theta(y_t\mid x,y_{<t})
$$

这里的 `|y|` 是 response token 数。这个长度归一化不是装饰项，而是 SimPO 与普通序列 log probability 的关键区别：如果直接用整段 log probability，长回答会因为累加更多负 log probability 而被系统性压低；如果完全不考虑长度，又容易鼓励模型通过变长输出钻评测指标空子。平均 log probability 更接近解码时按 token 做局部选择的机制，因此论文称它更 aligned with generation likelihood。

在偏好学习层面，SimPO 仍然保留 Bradley-Terry 形式，但加入目标奖励间隔 `γ`：

$$
\mathcal{L}_{\mathrm{SimPO}}=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[\log\sigma\left(
\frac{\beta}{|y_w|}\log\pi_\theta(y_w\mid x)
-\frac{\beta}{|y_l|}\log\pi_\theta(y_l\mid x)
-\gamma
\right)\right]
$$

直觉上，普通 BT 目标只要求 `y_w` 的奖励大于 `y_l`；加入 `γ` 后，模型必须把 winning response 推到“明显更好”的区域，才会得到低损失。这相当于把偏好对从二分类边界附近推开，减少模型只学到微弱排序差异的情况。`β` 控制 log probability 差异的尺度，`γ` 控制 winning 与 losing 的最小分离度，两者共同决定训练信号强弱。

SimPO 与 ORPO、IPO、KTO 等参考模型较弱或无参考模型方法的区别在于，它不是额外设计一个 odds ratio 或替代偏好统计量，而是直接把“模型生成时自己最大化什么”拿来作为奖励。这样实现上非常轻量：一次 policy forward 就能得到 chosen/rejected 的 token log probability；没有 reference forward，也没有 reward model rollout。论文在 v3 中还讨论了必要时加入 SFT regularization 来防止灾难性遗忘，但主算法本身不依赖 KL reference 约束。

> 💡 关键：SimPO 的“简单”不是少写一个模型而已，而是把奖励定义从“相对参考模型的偏离”换成“当前模型对答案本身的平均生成倾向”。这个改动同时影响优化目标、显存成本、长度偏置和训练-推理一致性。

#### 🧪 练习题
```yaml
question: "SimPO 相比 DPO 最核心的奖励设计变化是什么？"
options:
  - "把奖励模型替换为更大的奖励模型"
  - "用当前策略的长度归一化平均 log probability 作为隐式奖励"
  - "把 Bradley-Terry 目标替换为交叉熵监督微调"
  - "只优化 winning response，完全忽略 rejected response"
answer: 1
explain: "SimPO 的核心是 reference-free reward：用当前策略对整段回答的平均 token log probability 表示奖励，并通过 margin 拉开 chosen 与 rejected。"
```

### Token级直接偏好优化 (TDPO)

```yaml
id: tdpo
num: 10
name: Token级直接偏好优化 (TDPO)
full_name: Token级直接偏好优化 (TDPO)
year: '2024'
org: ''
parent: dpo
paper_url: https://proceedings.mlr.press/v235/zeng24b.html
project_url: ''
category: token_multimodal
motivation: Token级前向KL约束保持多样性
```

#### 📝 一句话总结
TDPO 将 DPO 的整段回答级偏好优化改写为 token 级序列决策问题，在每个生成状态上引入 forward KL 约束，从而更细粒度地平衡偏好对齐与生成多样性。

#### 🎯 核心要点
- Token 级建模：把 response 生成视为自回归 MDP，每个 prefix state 下选择下一个 token action。
- Sequential KL 诊断：论文观察到 DPO 对 preferred 与 dispreferred responses 的 KL 增长不均衡，尤其 dispreferred 子集 KL 漂移更快。
- Forward KL 约束：在 token 分布层面约束 `D_KL(πref || πθ)`，缓解 reverse KL 的 mode-seeking 与多样性下降。
- Bradley-Terry token 化：通过 advantage/regret 形式把句级 BT 偏好概率连接到 token 级奖励差。
- 两个实用版本：`TDPO_1` 直接加入 token-level KL 差异项，`TDPO_2` 用系数 `α` 与 stop-gradient 改善梯度稳定性。
- 实验覆盖 IMDb 控制情感生成、Anthropic-HH 单轮对话、MT-Bench，并与 DPO、PPO-style RLHF 等基线比较。

#### 🔬 深入细节
> ⚠️ 元信息说明：任务 JSON 中的 `paper_url` 指向 PMLR `zeng24b`，该页实际是 tnGPS；TDPO 的官方 PMLR 条目为 `https://proceedings.mlr.press/v235/zeng24c.html`，arXiv 版本为 `https://arxiv.org/abs/2404.11999`。以下精读按 TDPO 官方论文正文整理，同时保留上方 YAML 与任务元信息一致。

![TDPO 损失函数对比](https://arxiv.org/html/2404.11999v2/x4.png)
*图：论文 Figure 2 对比 DPO、TDPO_1 与 TDPO_2 的损失结构。TDPO 在 DPO 的 log-ratio 偏好项之外，加入 preferred/dispreferred response 的 token 级 sequential KL 差异控制项。*

```python
# TDPO 训练伪代码，概括论文 Algorithm 1 与 Appendix B 实现
for batch in preference_loader:
    x, y_w, y_l = batch.prompt, batch.chosen, batch.rejected

    # policy 与 reference 都在 token 级输出词表分布
    pi_logits_w, pi_logits_l = policy(x, y_w), policy(x, y_l)
    ref_logits_w, ref_logits_l = reference(x, y_w), reference(x, y_l)

    # token log-ratio reward: log πθ(token|prefix) - log πref(token|prefix)
    delta_w = gather_logp(pi_logits_w, y_w) - gather_logp(ref_logits_w, y_w)
    delta_l = gather_logp(pi_logits_l, y_l) - gather_logp(ref_logits_l, y_l)

    # sequential forward KL: sum_t KL(πref(.|s_t) || πθ(.|s_t))
    seqkl_w = forward_kl(ref_logits_w, pi_logits_w).sum(dim=-1)
    seqkl_l = forward_kl(ref_logits_l, pi_logits_l).sum(dim=-1)

    if method == "TDPO_1":
        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - (seqkl_l - seqkl_w)
    else:  # TDPO_2
        value = delta_w.sum(dim=-1) - delta_l.sum(dim=-1) - alpha * (seqkl_l - stop_grad(seqkl_w))

    loss = -log_sigmoid(beta * value).mean()
    optimizer.step(loss)
```

DPO 把一个完整回答 `y` 当作 bandit arm，对偏好对 `(x, y_w, y_l)` 直接比较整段 log probability ratio。TDPO 的问题意识是：LLM 并不是一次性吐出整段回答，而是在状态 `s_t=(x,y_{<t})` 下逐 token 采样。因此，只在 response 级别控制 KL 会掩盖 token 轨迹中的漂移。论文 Figure 1 先做了一个诊断：DPO 训练过程中 preferred 与 dispreferred response 的 sequential KL 增长不同步，dispreferred 子集往往偏离 reference 更快，这意味着 DPO 虽然在总体偏好上变好，却可能以牺牲局部 token 分布稳定性和多样性为代价。

TDPO 先定义 token 级 log-ratio 奖励：

$$
\delta_t(y)=\log \pi_\theta(y_t\mid x,y_{<t})-\log \pi_{\mathrm{ref}}(y_t\mid x,y_{<t})
$$

这仍然继承了 DPO 的“当前策略相对参考策略”思想，但粒度从整段回答拆到每个 token。然后定义 sequential forward KL：

$$
\mathrm{SeqKL}(y)=\sum_{t=1}^{|y|}D_{\mathrm{KL}}\left(\pi_{\mathrm{ref}}(\cdot\mid x,y_{<t})\,\Vert\,\pi_\theta(\cdot\mid x,y_{<t})\right)
$$

forward KL 的方向很关键。DPO/RLHF 中常见的 reverse KL 更偏 mode-seeking，容易让模型集中到少数高奖励模式；forward KL 更强调覆盖 reference 分布中有概率的 token，因此对保持语言多样性更友好。TDPO 并不是简单把 KL 加到整段 loss，而是比较 preferred 与 dispreferred 两条轨迹上的 KL 差异，让优化知道哪条轨迹偏离得更多。

`TDPO_1` 可以写成如下形式：

$$
\mathcal{L}_{\mathrm{TDPO_1}}=-\mathbb{E}\left[\log\sigma\left(\beta\left(
\sum_t\delta_t(y_w)-\sum_t\delta_t(y_l)-\left(\mathrm{SeqKL}(y_l)-\mathrm{SeqKL}(y_w)\right)
\right)\right)\right]
$$

这个式子比 DPO 多了 `SeqKL(y_l)-SeqKL(y_w)`。如果 rejected response 的 KL 漂移过大，损失会惩罚这种“通过把坏回答推得很远来获得偏好差”的行为；如果 chosen response 需要适度偏离 reference 才能更好，则该项不会一刀切地禁止偏离。换句话说，TDPO 追求的不是让所有 token 都贴近 reference，而是让偏好改进与 KL 使用效率匹配。

`TDPO_2` 进一步引入系数 `α` 和 stop-gradient：

$$
\mathcal{L}_{\mathrm{TDPO_2}}=-\mathbb{E}\left[\log\sigma\left(\beta\left(
\sum_t\delta_t(y_w)-\sum_t\delta_t(y_l)-\alpha\left(\mathrm{SeqKL}(y_l)-\mathrm{sg}(\mathrm{SeqKL}(y_w))\right)
\right)\right)\right]
$$

这里 `sg` 表示 stop-gradient。直觉上，preferred response 的 KL 项可以作为比较基准，但不让其梯度直接牵引模型；训练主要通过 rejected response 的 KL 约束来抑制不必要漂移。`α` 则提供一个连续旋钮：较大时更保守、更多样，较小时更接近 DPO 的偏好拉开方式。论文实验表明 TDPO 能在 reward/KL frontier 上取得比 DPO 更好的折中。

> 💡 关键：TDPO 的创新不只是“按 token 求和”，而是把偏好优化中的奖励差、BT 概率和 KL 正则都放回自回归 token 轨迹里，让模型知道每个 prefix state 下的分布偏移是否值得。

#### 🧪 练习题
```yaml
question: "TDPO 为什么要引入 token 级 forward KL？"
options:
  - "为了完全移除 reference model"
  - "为了只训练回答的最后一个 token"
  - "为了在每个生成前缀上约束策略偏移，改善偏好对齐与多样性的折中"
  - "为了把偏好数据改成多标签分类数据"
answer: 2
explain: "TDPO 认为整段级 KL 难以控制自回归生成轨迹中的局部漂移，因此用 token 级 forward KL 约束每个 prefix 下的分布变化。"
```

### 自博弈对抗Critic (SPAC)

```yaml
id: spac
num: 11
name: 自博弈对抗Critic (SPAC)
full_name: 自博弈对抗Critic (SPAC)
year: '2024'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2406.04274
project_url: ''
category: direct_preference
motivation: 自博弈对抗Critic离线对齐
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

### 组相对策略优化 (GRPO)

```yaml
id: grpo
num: 12
name: 组相对策略优化 (GRPO)
full_name: 组相对策略优化 (GRPO)
year: '2025'
org: ''
parent: rlhf
paper_url: https://arxiv.org/abs/2501.12948
project_url: ''
category: rl_based
motivation: 组相对评分取代Critic模型
```

#### 📝 一句话总结
GRPO 用同一问题下多条候选回答的组内相对奖励来估计优势函数，解决 PPO 在大语言模型 RL 训练中必须额外训练同规模 Critic/Value Model 的高成本问题。它保留 PPO 的裁剪式稳定更新，同时把 baseline 从学习到的价值函数改为组内 reward 归一化，是 DeepSeek-R1/R1-Zero 进行大规模可验证奖励强化学习的核心优化器。

#### 🎯 核心要点
- 无 Critic 设计：不再训练与策略模型同规模的 Value Model，而用同一 prompt 的多条采样回答构成 group baseline。
- 组相对优势估计：对每个问题采样 \(G\) 个输出，用 \((r_i-\mathrm{mean}(\mathbf r))/\mathrm{std}(\mathbf r)\) 作为该输出所有 token 的优势信号。
- PPO 裁剪目标保留：仍使用新旧策略概率比和 \(\operatorname{clip}(\cdot,1-\epsilon,1+\epsilon)\) 抑制单步策略漂移。
- KL 正则独立进入目标函数：不把 KL 惩罚混入 reward，而是在优化目标中直接约束 \(\pi_\theta\) 与 reference policy 的距离。
- 适配可验证奖励 RL：DeepSeek-R1-Zero 使用规则型 accuracy reward 与 format reward，避免训练神经奖励模型带来的 reward hacking 和额外资源开销。
- 支持 outcome/process 两类监督：结果监督把归一化组奖励赋给整段输出，过程监督可在推理步骤级别分配奖励并回传到相关 token。

#### 🔬 深入细节
![PPO 与 GRPO 对比示意图](https://arxiv.org/html/2402.03300v3/x2.png)
*图：DeepSeekMath Figure 4 展示 PPO 与 GRPO 的关键差别：PPO 依赖 Value Model 估计 baseline，GRPO 改用同一问题多条回答的组内分数估计 baseline，从而省去 Critic。DeepSeek-R1 论文沿用该 GRPO 框架进行大规模推理 RL。*

GRPO 的直接动机来自 LLM 场景下 PPO 的资源瓶颈。传统 PPO 是 actor-critic 算法，除了策略模型 \(\pi_\theta\)，还需要训练价值函数 \(V_\psi\) 估计每个 token 位置的未来回报；当策略模型已经是数十亿到数千亿参数时，一个同规模 Critic 会显著增加显存、通信和优化成本。更麻烦的是，RLHF/推理 RL 中 reward 往往只在回答末尾出现，例如最终答案是否正确、格式是否满足 `<think>`/`<answer>`，这使得 token 级 value fitting 既稀疏又噪声较大。GRPO 的核心判断是：对于同一个问题，多条候选回答之间天然具有可比较性，因此可以用组内平均分作为 baseline，而不是额外学习一个价值网络。

其目标函数继承 PPO 的 clipped surrogate。对于问题 \(q\)，先从旧策略 \(\pi_{\theta_{old}}\) 采样 \(G\) 条输出 \(\{o_1,\ldots,o_G\}\)，对每条输出逐 token 优化：

$$
\begin{aligned}
\mathcal J_{GRPO}(\theta)
= \mathbb E\Bigg[\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}
\Bigg( &\min\Big[\rho_{i,t}(\theta)\hat A_{i,t},
\operatorname{clip}(\rho_{i,t}(\theta),1-\epsilon,1+\epsilon)\hat A_{i,t}\Big] \\
&-\beta D_{KL}(\pi_\theta\|\pi_{ref})\Bigg)\Bigg],
\end{aligned}
$$

其中

$$
\rho_{i,t}(\theta)=\frac{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}{\pi_{\theta_{old}}(o_{i,t}\mid q,o_{i,<t})}.
$$

优势函数不再来自 GAE + Value Model，而是来自组内 reward 标准化。若 \(\mathbf r=\{r_1,\ldots,r_G\}\)，结果监督版本令同一输出中所有 token 共享同一个优势：

$$
\hat A_{i,t}=\widetilde r_i=\frac{r_i-\operatorname{mean}(\mathbf r)}{\operatorname{std}(\mathbf r)}.
$$

这个式子体现了“组相对”的含义：绝对 reward 高不一定重要，重要的是该回答是否优于同一 prompt 下的其他回答。若某个样本得分高于组均值，所有生成它的 token 都被强化；低于组均值则被抑制。标准差归一化还能缓解不同 prompt reward 尺度不一致的问题，使数学题、代码题、格式题等不同任务的 reward 更容易混合训练。

KL 项的处理也是 GRPO 与早期 RLHF PPO 的差别之一。标准 PPO 常把 KL 惩罚作为每 token reward 的一部分，例如 \(r_t=r_\varphi-\beta\log(\pi_\theta/\pi_{ref})\)，这会把 reward shaping、优势估计和正则项耦合在一起。GRPO 论文把 KL 直接放进目标函数，并用正值估计器近似：

$$
D_{KL}(\pi_\theta\|\pi_{ref}) \approx
\frac{\pi_{ref}(o_{i,t}\mid q,o_{i,<t})}{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}
-\log\frac{\pi_{ref}(o_{i,t}\mid q,o_{i,<t})}{\pi_\theta(o_{i,t}\mid q,o_{i,<t})}-1.
$$

这样做的直觉是把“该回答相对组内其他回答是否更好”和“新策略是否偏离参考模型过远”分开处理。前者决定学习方向，后者限制分布漂移，避免模型为了拿到规则奖励而走向不可读、语言混杂或 reward hacking 的区域。

```python
# GRPO 核心训练伪代码
for iteration in range(num_iterations):
    old_policy = policy.snapshot()
    for prompts in dataloader:
        groups = []
        for q in prompts:
            outputs = old_policy.sample(q, n=G)       # 同一问题采样 G 个回答
            rewards = reward_fn(q, outputs)           # accuracy reward / format reward / reward model
            advantages = (rewards - rewards.mean()) / (rewards.std() + 1e-8)
            groups.append((q, outputs, advantages))

        for _ in range(grpo_epochs):
            loss = 0
            for q, outputs, advantages in groups:
                for i, output in enumerate(outputs):
                    for t, token in enumerate(output):
                        ratio = policy.prob(token, q, output[:t]) / old_policy.prob(token, q, output[:t])
                        clipped = clip(ratio, 1 - eps, 1 + eps)
                        surrogate = min(ratio * advantages[i], clipped * advantages[i])
                        kl = kl_estimator(policy, ref_policy, token, q, output[:t])
                        loss += -(surrogate - beta * kl)
            optimizer.step(loss)
```

在 DeepSeek-R1-Zero 中，GRPO 和规则奖励结合得很紧密。accuracy reward 根据数学答案、代码测试等可验证信号给分，format reward 要求模型把推理过程和答案分别放在指定标签中。论文明确避免使用 outcome/process 神经奖励模型，因为大规模 RL 中神经 RM 容易被策略利用并产生 reward hacking，同时还要反复重训。GRPO 正好适合这种设置：每个 prompt 采多条候选，规则奖励快速打分，组内归一化后即可更新策略。

与 PPO 相比，GRPO 的牺牲是 baseline 从“跨状态泛化的价值函数”变成了“当前 prompt 的采样统计量”。这会带来组大小 \(G\)、采样多样性和 reward 方差之间的权衡：\(G\) 太小，组均值/方差估计不稳定；\(G\) 太大，rollout 成本上升。但在 LLM 推理任务中，同一问题多采样本来就是常见做法，而且省掉 Critic 后总体工程复杂度显著下降，因此 GRPO 在 reasoning RL 中比标准 PPO 更容易扩展。

> 💡 关键：GRPO 并不是简单“去掉 Value Model”。它用同 prompt 多响应比较把偏好数据和可验证奖励的相对性质转化为 advantage，从而保留 PPO 稳定更新的同时，大幅降低 RLHF/RLVR 的训练资源。

#### 🧪 练习题
```yaml
question: "GRPO 为什么可以不训练 PPO 中常见的 Critic/Value Model？"
options:
  - "因为 GRPO 完全不需要优势函数"
  - "因为 GRPO 用同一 prompt 下多条回答的组内奖励均值和标准差估计优势"
  - "因为 GRPO 只做监督学习，不进行策略梯度更新"
  - "因为 GRPO 把 KL 正则全部删除了"
answer: 1
explain: "GRPO 仍然需要优势函数和策略梯度，但优势由组内相对 reward 计算，不再依赖额外训练的价值网络。"
```

### 强化Token优化 (RTO)

```yaml
id: rto
num: 13
name: 强化Token优化 (RTO)
full_name: 强化Token优化 (RTO)
year: '2025'
org: ''
parent: tdpo
paper_url: https://arxiv.org/abs/2505.11058
project_url: ''
category: token_multimodal
motivation: MDP建模提取Token级奖励
```

#### 📝 一句话总结
RTO 把 RLHF 从“整句只有一个最终奖励”的 bandit 问题改写成 token-level MDP，并用 DPO 模型与参考模型的逐 token 概率比提取密集奖励，再交给 PPO 优化。它解决了标准 PPO 只能依赖稀疏句级奖励、样本效率低且开源复现效果弱的问题，把 DPO 的离线偏好建模和 PPO 的在线策略改进连接起来。

#### 🎯 核心要点
- MDP 建模：状态 \(s_h\) 是 prompt 加已生成前缀，动作 \(a_h\) 是下一个 token，轨迹奖励按 token 累积。
- 两阶段框架：先从偏好数据学习 token-wise reward，再用 PPO 等 RL 算法最大化该密集奖励。
- DPO 提取隐式 token 奖励：用 \(\beta\log(\pi_{dpo}(a_h|s_h)/\pi_{ref}(a_h|s_h))\) 表示 token 对偏好的贡献。
- 与传统 PPO 区分：PPO 主要优化句级 reward model 的末端分数，RTO 把 DPO 产生的 token 信号作为 reward shaping 注入每一步。
- 理论目标：在 MDP 设定下证明 token-wise 框架相对 sentence-wise bandit 有更好的可识别性和样本效率，并给出近最优策略学习保证。
- 实验设定：基于 UltraFeedback 偏好数据，Llama-3-8B/SFT 初始化，在 AlpacaEval 2 与 Arena-Hard 上优于 PPO、DPO、R-DPO、SimPO、TDPO 等基线。

#### 🔬 深入细节
![RTO 流程图](https://arxiv.org/html/2404.18922v4/x1.png)
*图：RTO Figure 1。传统 RLHF 在 bandit 框架下用 PPO 优化句级奖励；RTO 在 MDP 框架下先用 DPO 导出 token-level reward，再用 PPO 强化这些逐 token 信号。*

RTO 的出发点是指出经典 RLHF 的建模粒度过粗。若把一次回答 \(y\) 看成一个 action，整个问题就是 contextual bandit：策略一次性输出完整句子，reward model 只给终端分数。这种建模忽略了自回归解码的序列结构，也无法回答“是哪几个 token 让回答变好或变坏”。对于长回答，尤其是对话、推理和代码场景，句级 reward 会让 credit assignment 变得困难，PPO 需要从稀疏、延迟、高方差的反馈中学习。

RTO 改用 token-level MDP：状态 \(s_h=(x,y_{<h})\) 表示 prompt 和当前已生成前缀，动作 \(a_h=y_h\) 表示下一个 token，转移函数只是把 token 追加到上下文。偏好概率可写为两条轨迹累计奖励的 Bradley-Terry 比较：

$$
\mathbb P(\tau^1\succ\tau^2)=\sigma\left(\sum_{h=1}^{H}r(s_h^1,a_h^1)-\sum_{h=1}^{H}r(s_h^2,a_h^2)\right).
$$

这个形式把“人更喜欢哪条回答”拆成了每个 token 的局部贡献之和。RTO 的关键洞察是：DPO 虽然从响应级偏好推导出来，但其最优策略与参考策略的 log-ratio 本身可以解释为隐式 reward。对于某个 token，DPO 模型给出的密集奖励为：

$$
r_{DPO}(s_h,a_h)=\beta_1\log\frac{\pi_{dpo}(a_h\mid s_h)}{\pi_{ref}(a_h\mid s_h)}.
$$

沿轨迹求和后得到

$$
\sum_{h=1}^{H}r_{DPO}(s_h,a_h)
=\beta_1\log\frac{\pi_{dpo}(y\mid x)}{\pi_{ref}(y\mid x)}.
$$

直觉上，如果 DPO 模型相比参考模型更愿意生成某个 token，那么该 token 更可能与偏好方向一致；如果 DPO 明显压低其概率，则该 token 可能是负贡献。这样，DPO 从“直接偏好优化算法”变成了“token reward estimator”。RTO 再把这些密集奖励接入 PPO，使策略能够在生成过程中逐步收到反馈，而不是等到回答结束才得到一个总分。

```python
# RTO Practical Version 的简化伪代码
# 输入：离线偏好数据 D、参考模型 pi_ref、DPO 算法、PPO trainer
pi_dpo = train_dpo(pi_ref, D)          # 用偏好对训练 DPO oracle
policy = pi_ref.copy()                 # PPO/RL 阶段的初始策略

for step in range(T):
    prompts = sample_prompts(D)
    rollouts = []
    for x in prompts:
        y = policy.generate(x)
        token_rewards = []
        for h, token in enumerate(y):
            state = (x, y[:h])
            dpo_reward = beta1 * log(pi_dpo.prob(token, state) / pi_ref.prob(token, state))
            kl_penalty = -beta2 * log(policy.prob(token, state) / pi_ref.prob(token, state))
            token_rewards.append(dpo_reward + kl_penalty)
        token_rewards[-1] += sentence_reward_model(x, y)  # 实践中可叠加句级 r_MLE
        rollouts.append((x, y, token_rewards))

    policy = ppo_update(policy, rollouts)                 # 用密集 token reward 更新策略
```

RTO 与“先 DPO 再 PPO”的简单串联不同。简单串联只是把 DPO 模型当成 PPO 的初始化点；RTO 是把 DPO 模型固定为 reward provider，让它在每个 token 位置给出 log-ratio 奖励。论文的实用版本还叠加一个句级 reward \(r_{MLE}(x,y)\)，用于保留传统 reward model 对整体质量的判断；DPO reward 的作用更像 reward shaping：它改变奖励在 token 维度上的分布，让 PPO 的 advantage 更容易定位到具体片段。论文的消融结论也强调，RTO 的收益主要来自这种 shaping，而不是简单用 DPO 隐式奖励替代句级 reward。

把 DPO 和 PPO放在一起看，RTO 的优势更清楚。DPO 是离线直接优化，它稳定、省资源，但更新受限于已有偏好对，不会在线探索策略生成的新分布；PPO 可以在线采样和改进策略，但如果 reward 只有句级终端分数，训练信号稀疏且实现敏感。RTO 用 DPO 学到的偏好方向构造 dense reward，再用 PPO 做在线策略改进，相当于让 DPO 提供局部地图，让 PPO 负责沿着这张地图继续搜索。

理论部分服务于同一个主张：LLM 解码天然是序列决策，不应被压缩为单步 bandit。MDP 视角可以区分不同前缀下同一 token 的贡献，也可以把偏好比较转化为轨迹累计 reward 的比较。只要 token reward 学得足够好，PPO/策略优化就不必从纯终端分数中反推所有 token 的责任，样本效率自然更好。实践结果与这个判断一致：论文在 AlpacaEval 2 和 Arena-Hard 上报告 RTO 相比 PPO 有明显提升，尤其体现了密集 token reward 对开放式对话生成的优化价值。

> ⚠️ 注意：RTO 不是把每个 token 都人工标注奖励，而是用 DPO 模型和参考模型的概率比自动估计 reward。它的质量取决于偏好数据、DPO 训练质量以及参考模型是否合适。

#### 🧪 练习题
```yaml
question: "RTO 中 DPO 模型的核心作用是什么？"
options:
  - "替代语言模型的 tokenizer"
  - "作为逐 token 隐式奖励估计器，为 PPO 提供密集 reward shaping"
  - "只负责在推理时重排序最终答案"
  - "删除 PPO 中的 KL 约束"
answer: 1
explain: "RTO 使用 DPO 模型相对参考模型的 token log-ratio 构造奖励，再用 PPO 对这些 token-level signals 进行策略优化。"
```

### 选择性偏好优化 (SePO)

```yaml
id: sepo
num: 14
name: 选择性偏好优化 (SePO)
full_name: 选择性偏好优化 (SePO)
year: '2025'
org: ''
parent: tdpo
paper_url: https://aclanthology.org/2025.emnlp-main.359/
project_url: ''
category: token_multimodal
motivation: 选择性优化关键Token降低成本
```

#### 📝 一句话总结
SePO 提出用 DPO 训练出的 oracle model 估计 token-level reward，只选择 chosen 回答中高贡献 token 和 rejected 回答中低贡献 token 来做偏好优化。它解决了 token-level alignment 全量优化噪声大、关键 token 选择昂贵的问题，用少量关键 token 保持甚至提升对齐效果。

#### 🎯 核心要点
- DPO 作为 token reward estimator：通过 oracle model 与 reference model 的 log-ratio 估计每个 token 的偏好贡献。
- 三阶段流程：训练 ref-oracle 模型对、对目标偏好数据打分并选择 key tokens、用 reference-free contrastive objective 训练目标 policy。
- 选择性监督：chosen response 选择 reward 最高的 top-\(k_w\) token，rejected response 选择 reward 最低的 top-\(k_l\) token。
- 低成本适配：oracle model 可用较小模型和中等规模数据训练，选择出的 token 子集可被多个更强 policy model 复用。
- 目标函数去 reference model 化：最终 policy 训练只对 selected tokens 的归一化 log-likelihood 做对比，不再在目标函数中显式调用 reference model。
- 实验结论：在 AlpacaEval 2、Arena-Hard、MT-Bench 等评测中，SePO 用约 30% key tokens 超过多种全量 token/response-level 偏好优化基线，并支持 weak-to-strong generalization。

#### 🔬 深入细节
![SePO 三阶段流程图](https://arxiv.org/html/2408.13518v2/x1.png)
*图：SePO Figure 2。流程包括：用 ref-oracle pair 参数化 token-level reward、在目标偏好数据中选择关键 token、只用 selected tokens 训练 policy model。ACL 正式版与 arXiv HTML 为同一论文内容。*

SePO 的问题意识非常具体：现有 token-level preference optimization 往往默认“所有 token 都值得优化”，但语言生成中的偏好贡献高度不均匀。一个 chosen response 中真正决定质量的可能是少数关键事实、推理步骤或格式 token；一个 rejected response 中真正该压低概率的也往往是少数错误、幻觉或不合规片段。全量 token 优化会把大量中性 token 也纳入梯度，既增加训练成本，也可能引入噪声和长度偏置。SePO 因此把核心任务改成：如何在只有 response-level preference 标注的情况下，便宜地找出 token-level key supervision。

论文首先把 LLM 解码形式化为 token-level MDP：状态 \(s_t\) 是 prompt 与当前前缀，动作 \(a_t\) 是下一个 token，轨迹 reward 可分解为 token reward 的和：

$$
r(q,\tau)=\sum_{t=1}^{T}\hat r(s_t,a_t).
$$

在这个假设下，DPO 训练得到的 oracle policy 与 reference policy 的概率比可作为 token reward 的估计：

$$
\hat r(s_t,a_t)\propto \log\frac{\pi^*(a_t\mid s_t)}{\pi_{ref}(a_t\mid s_t)}.
$$

SePO 的 oracle modeling 就是把这个结论落地。先用偏好数据训练 reference model \(\pi_{ref}\) 和 oracle model \(\pi_{ora}\)：reference 通常通过 SFT 得到，oracle 在 reference 基础上通过 DPO 学习偏好方向。随后，对任意目标样本 \((q,y)\)，每个 token 的分数是：

$$
s(y_i)=\log\frac{\pi_{ora}(y_i\mid q,y_{<i})}{\pi_{ref}(y_i\mid q,y_{<i})}.
$$

如果 \(s(y_i)\) 高，说明 oracle 相比 reference 更倾向生成该 token，它在 chosen response 中通常是正向贡献；如果 \(s(y_i)\) 低，说明 oracle 压低该 token，它在 rejected response 中通常是负向贡献。于是 SePO 对 chosen 选最高 \(k_w\%\)，对 rejected 选最低 \(k_l\%\)：

$$
\mathbb I_k^w(y_i)=
\begin{cases}
1,& s(y_i)\text{ ranks in highest }k\%\text{ in }y\\
0,& \text{otherwise}
\end{cases}
$$

rejected 的 \(\mathbb I_k^l\) 则把条件改成 lowest \(k\%\)。这一步是 SePO 降本的关键，因为之后训练 policy 时只需要对这些 selected tokens 求梯度。论文中常用的设定是选择约 30% key tokens；这比全量 token 少很多，但仍覆盖了偏好差异最集中的片段。

```python
# SePO 核心流程伪代码
# D_oracle: 用于训练 oracle 的偏好数据；D_target: 目标 policy 的偏好数据
pi_ref = train_sft(chosen_responses(D_oracle))
pi_ora = train_dpo(pi_ref, D_oracle)

selected_dataset = []
for q, y_w, y_l in D_target:
    scores_w = [log(pi_ora.prob(tok, q, y_w[:i]) / pi_ref.prob(tok, q, y_w[:i]))
                for i, tok in enumerate(y_w)]
    scores_l = [log(pi_ora.prob(tok, q, y_l[:i]) / pi_ref.prob(tok, q, y_l[:i]))
                for i, tok in enumerate(y_l)]

    I_w = top_k_mask(scores_w, ratio=k_w, largest=True)      # chosen: 最高 reward token
    I_l = top_k_mask(scores_l, ratio=k_l, largest=False)     # rejected: 最低 reward token
    selected_dataset.append((q, y_w, y_l, I_w, I_l))

for batch in selected_dataset:
    u_w = selected_logprob(policy, q, y_w, I_w, gamma)
    u_l = selected_logprob(policy, q, y_l, I_l, gamma)
    loss = -log_sigmoid(u_w - u_l - margin_lambda)
    optimizer.step(loss)
```

最终的 SePO 目标函数是一个只作用于 selected tokens 的对比式偏好目标：

$$
\mathcal L_{SePO}
=-\mathbb E_{(q,y_w,y_l)\sim\mathcal D}\log\sigma\left(
\hat u(q,y_w,\mathbb I^w_{k_w})-
\hat u(q,y_l,\mathbb I^l_{k_l})-\lambda
\right),
$$

其中

$$
\hat u(q,y,\mathbb I_k)=
\frac{\gamma}{|y|\cdot k\%}\sum_{i=1}^{|y|}\mathbb I_k(y_i)
\log\pi_\theta(y_i\mid q,y_{<i}).
$$

这个设计有两个细节值得注意。第一，\(\hat u\) 对选择比例和长度做归一化，避免“选更多 token”或“生成更长回答”天然获得更大 log-likelihood 总量。第二，目标函数形式接近 SimPO/contrastive preference optimization，但它的对比单元不是整句平均 log-prob，而是 oracle 挑出来的关键 token 子集，因此梯度更集中。

SePO 与 RTO/TDPO 的关系也很清楚。RTO 把 DPO log-ratio 作为 dense reward，再用 PPO 在线优化；TDPO 更直接地把偏好优化拆到 token 级。SePO 则进一步问：既然 token reward 有强弱之分，为什么还要优化所有 token？它用 oracle model 做一次离线 token selection，之后可以复用这个选择结果训练不同大小的 policy model。论文的 weak-to-strong 实验说明，小 oracle 选出的 key tokens 可以监督更强的 policy；这使 SePO 不只是一个训练目标，也是一种把弱监督信号提纯后迁移给强模型的数据处理框架。

> 💡 关键：SePO 的“选择性”不是随机裁剪训练 token，而是基于 DPO 隐式 reward 的有方向选择：强化 chosen 中最能解释偏好的 token，压低 rejected 中最能解释失败的 token。

#### 🧪 练习题
```yaml
question: "SePO 选择 rejected response 中 key tokens 的原则是什么？"
options:
  - "选择 oracle-reference log-ratio 最高的 token"
  - "随机选择固定比例 token"
  - "选择 oracle-reference log-ratio 最低的 token"
  - "只选择回答末尾的 EOS token"
answer: 2
explain: "SePO 认为 rejected 中 reward 最低的 token 最可能导致偏好失败，因此选择这些 token 来抑制目标 policy 的生成概率。"
```

### LLM医生 (LLMdoctor)

```yaml
id: llmdoctor
num: 15
name: LLM医生 (LLMdoctor)
full_name: LLM医生 (LLMdoctor)
year: '2026.01'
org: ''
parent: tdpo
paper_url: https://arxiv.org/abs/2601.10416
project_url: ''
category: token_multimodal
motivation: 流引导Token级测试时对齐
```

#### 📝 一句话总结
LLMdoctor 提出了一个 patient-doctor 式测试时对齐框架：先从冻结大模型自身的正负行为变体中抽取 token 级偏好奖励，再用 token-level flow-guided preference optimization (TFPO) 训练小型 doctor 模型，在推理时逐 token 引导大模型生成。它主要解决传统轨迹级奖励信号粗糙、采样开销大、以及小奖励模型容易把大模型能力上限“拉低”的问题。

#### 🎯 核心要点
- 三阶段框架：Token-Level Reward Acquisition → TFPO-Based Fine-Grained Preference Tuning → Online Alignment。
- Patient-doctor 结构：大规模 patient LLM 保持冻结，小规模 doctor 模型学习 token 级偏好流，并在推理时提供奖励引导。
- Token 级奖励来自同一个 patient 模型的 positive face 与 negative face 行为变体，而不是额外训练轨迹级 reward model。
- 用正负行为变体的 log-likelihood gap 衡量 token 的判别性，并用 sparsity threshold 只保留真正影响偏好的 token。
- TFPO 把偏好监督从完整 response 扩展到所有 subtrajectory，通过 Subtrajectory Balance 约束学习流一致性。
- 推理时用几何混合分布把 base distribution 与 doctor reward distribution 结合，可通过 \(\alpha\)、\(\beta\) 调整流畅性和偏好强度。
- 支持多维偏好控制：多个 doctor 或多个 reward head 的权重 \(\beta_i\) 可以在测试时动态调整，无需重训 patient。

#### 🔬 深入细节
![LLMdoctor 整体框架](https://ar5iv.labs.arxiv.org/html/2601.10416/assets/x2.png)
*图：LLMdoctor 的整体框架。大模型作为 patient 提供行为差异与最终生成能力，小模型作为 doctor 学习 token 级流引导信号并在测试时介入解码。*

LLMdoctor 的出发点是：很多测试时对齐方法虽然避免了重新微调大模型，但仍依赖轨迹级 reward。轨迹级 reward 只能告诉模型“整段回答好/不好”，无法说明哪些 token 真正贡献了 helpfulness、harmlessness 或礼貌性。论文指出，这会造成 reward-budget distortion：为了让偏好回答总分更高，模型可能把奖励机械地摊到大量中性词上，例如连接词或常见功能词，从而稀释真正关键 token 的信号。LLMdoctor 反过来让冻结的大模型自己暴露判别性：同一模型通过 prompt conditioning 形成 positive face 与 negative face，然后比较二者对每个 token 的条件概率。

Token 级奖励获取过程可以写成三步。给定偏好数据 \(\mathcal{D}=\{(x^{(i)}, y_+^{(i)}, y_-^{(i)})\}_{i=1}^N\)，对 response 中每个 token \(y_t\)，分别计算正向行为变体和负向行为变体的 log-probability：

$$
\ell_t^{\text{pos}}=\log \pi^{\text{pos}}(y_t\mid x,y_{<t}),\quad
\ell_t^{\text{neg}}=\log \pi^{\text{neg}}(y_t\mid x,y_{<t}).
$$

两者绝对差 \(\Delta_t=|\ell_t^{\text{pos}}-\ell_t^{\text{neg}}|\) 表示该 token 对“好行为/坏行为”区分的贡献。之后做长度归一化和平滑：

$$
\widehat{\Delta}_t = \frac{\Delta_t}{\operatorname{mean}_j(\Delta_j)+\varepsilon},\quad
S_t=\tanh\left(\frac{\widehat{\Delta}_t}{\tau}\right).
$$

最终 token reward 结合人类偏好标签的方向：

$$
r_t = \operatorname{sign}(y)\cdot S_t\cdot \mathbf{1}[S_t>\theta].
$$

这里 \(\operatorname{sign}(y)=+1\) 对应 preferred response，\(-1\) 对应 rejected response；\(\theta\) 是稀疏阈值。直觉上，LLMdoctor 并不要求每个 token 都背负奖励，而是只给能显著区分正负行为模式的 token 分配非零信号。论文的附录还从信息论角度解释了该指标：log-likelihood gap 与两个行为策略之间 KL divergence 的 token 级贡献相关，因此高 gap token 往往是最能区分 desired/undesired behavior 的位置。

有了 token reward 之后，doctor 模型不是简单做 token 分类，而是用 TFPO 学习“前缀流”。设前缀状态 \(s_t=(y_1,\dots,y_t)\)，doctor 的策略为 \(\hat{\pi}_\theta(y_{t+1}\mid s_t)\)，并带一个 value head \(V_\phi(s_t)\)。论文把状态流定义为：

$$
F(s_t)=Q(s_t)\cdot V_\phi(s_t),
$$

其中 \(Q(s_t)\) 是由前缀内 token reward 聚合得到的正权重。TFPO 借鉴 GFlowNet 的 Subtrajectory Balance：对任意子轨迹 \(s_m\to s_n\)，前向生成概率应与流比值匹配。在采用均匀 backward policy 后，约束为：

$$
Q(s_m)V_\phi(s_m)\prod_{k=m}^{n-1}\hat{\pi}_\theta(y_{k+1}\mid s_k)=Q(s_n)V_\phi(s_n).
$$

取对数后得到可训练的 SubTB loss：

$$
\mathcal{L}_{\text{SubTB}}
=\sum_{\tau\in\mathcal{D}_{pref}}\sum_{0\le m<n\le L_\tau}
\left(
\log\frac{Q(s_n)V_\phi(s_n)}{Q(s_m)V_\phi(s_m)}
-\sum_{k=m}^{n-1}\log\hat{\pi}_\theta(y_{k+1}\mid s_k)
\right)^2.
$$

该目标的关键不是只最大化最高奖励路径，而是让采样分布与 reward-proportional distribution 对齐。论文用 GFlowNet 的性质说明：当 SubTB loss 为 0 时，\(\pi_\theta(\tau)\propto R(\tau)\)，因此多个高质量轨迹都能保留概率质量，这比标准 RL 的 mode-seeking 目标更不容易牺牲多样性。

TFPO 还加入 value discrimination loss。若在同一前缀下 token \(y_w\) 比 \(y_l\) 更偏好，value head 需要拉开 margin：

$$
\mathcal{L}_{\text{value}}(V_\phi)=\max\left(0,\gamma-(V_\phi(s_t,y_w)-V_\phi(s_t,y_l))\right).
$$

整体训练目标为：

$$
\mathcal{L}_{\text{TFPO}}=\mathcal{L}_{\text{SubTB}}(\hat{\pi}_\theta,V_\phi)+\lambda\mathcal{L}_{\text{value}}(V_\phi).
$$

这使 doctor 不只是判断“当前 token 好不好”，还学习一个具有前瞻性的 token continuation flow：某个 token 的价值取决于它通向哪些后续子轨迹，而不是只看局部概率。

推理阶段，patient 仍是主生成模型，doctor 只作为 flow-guided reward model 输出每个候选 next token 的 preference log-probability。解码分布采用几何混合：

$$
\pi_{\text{decode}}(y_{t+1}\mid s_t)\propto
[\pi_{\text{base}}(y_{t+1}\mid s_t)]^{\alpha}
[\pi_r(y_{t+1}\mid s_t)]^{\beta}.
$$

\(\alpha\) 控制保留 patient 原始语言能力的程度，\(\beta\) 控制 doctor 的偏好引导强度。相比“生成多条完整回答再打分”的轨迹级方法，这里每步只需 patient 与 doctor 各一次前向即可获得候选 token 分布，因此更适合测试时对齐。多维偏好时，解码可扩展为 \(\prod_i[\pi_r^{(i)}]^{\beta_i}\)，从而在不重训大模型的情况下临时调节 helpfulness、harmlessness 等目标。

```python
# LLMdoctor / TFPO 简化伪代码
# 输入：preference dataset D={(x, y_plus, y_minus)}, frozen patient pi_sft, small doctor pi_theta

# 1. Token-level reward acquisition
for x, y_plus, y_minus in D:
    for y, label in [(y_plus, +1), (y_minus, -1)]:
        for t, token in enumerate(y):
            l_pos = logprob(pi_sft.with_prompt("positive face"), token, x, y[:t])
            l_neg = logprob(pi_sft.with_prompt("negative face"), token, x, y[:t])
            delta[t] = abs(l_pos - l_neg)
        S = tanh((delta / (mean(delta) + eps)) / tau)
        r = label * S * (S > theta)
        store_token_rewards(x, y, r)

# 2. Train doctor with token-level flow-guided preference optimization
for batch in reward_annotated_sequences:
    for trajectory in batch:
        compute_prefix_scores_Q_from_token_rewards(trajectory)
        for every subtrajectory s_m -> s_n:
            flow_ratio = log(Q[s_n] * V_phi[s_n] / (Q[s_m] * V_phi[s_m]))
            policy_logprob = sum(log pi_theta(y[k+1] | s_k) for k in range(m, n))
            L_subtb += (flow_ratio - policy_logprob) ** 2
        L_value += margin_ranking_loss(V_phi, preferred_tokens, rejected_tokens)
    update(theta, phi, L_subtb + lambda_ * L_value)

# 3. Online alignment
for decoding_step in generation:
    p_base = patient.next_token_distribution(prefix)
    p_reward = doctor.next_token_distribution(prefix)
    p_decode = normalize((p_base ** alpha) * (p_reward ** beta))
    token = sample_or_argmax(p_decode)
```

> 💡 关键：LLMdoctor 的“医生”不是替换大模型，而是学习一种 token 级偏好流，在每一步给 patient 的 next-token distribution 加偏好方向；大模型知识和语言能力仍主要来自 patient。

#### 🧪 练习题
```yaml
question: "LLMdoctor 为什么要用 positive face 与 negative face 的 log-likelihood gap 来构造 token 级奖励？"
options:
  - "为了让 doctor 模型复制 patient 的完整输出分布"
  - "为了识别真正区分好坏行为的 token，避免把轨迹级奖励平均摊到中性 token 上"
  - "为了减少 vocabulary size，使推理时只保留高频词"
  - "为了用 beam search 替代采样，提高解码速度"
answer: 1
explain: "log-likelihood gap 衡量同一 patient 在正负行为模式下对 token 的判别差异；再加稀疏阈值后，只强化真正影响偏好的 token。"
```

### 三角色自博弈RL (TriPlay-RL)

```yaml
id: triplay_rl
num: 16
name: 三角色自博弈RL (TriPlay-RL)
full_name: 三角色自博弈RL (TriPlay-RL)
year: '2026.01'
org: ''
parent: grpo
paper_url: https://arxiv.org/abs/2601.18292
project_url: ''
category: rl_based
motivation: 多角色自博弈安全对齐
```

#### 📝 一句话总结
TriPlay-RL 提出了由攻击者、守卫者和评估器组成的三角色闭环强化学习框架，通过交替更新 \(M_{\mathrm{Red}}\)、\(M_{\mathrm{Blue}}\)、\(M_{\mathrm{Eval}}\) 实现低人工标注成本的安全自博弈对齐。它解决了传统红队/防御训练角色孤立、攻击模式坍缩、评估标准静态且易被 reward hacking 的问题。

#### 🎯 核心要点
- 三角色闭环：\(M_{\mathrm{Red}}\) 生成 adversarial prompts，\(M_{\mathrm{Blue}}\) 生成安全响应，\(M_{\mathrm{Eval}}\) 对响应做细粒度评估。
- 三阶段交替更新：\(P_{\mathrm{Red}}\rightarrow P_{\mathrm{Blue}}\rightarrow P_{\mathrm{Eval}}\)，每个阶段只更新一个角色，其余角色作为环境或监督来源。
- 每个角色训练都采用 GRPO-based RLVR，使奖励可验证并避免强依赖人工偏好标注。
- 红队奖励由语义保持奖励、攻击成功奖励、多模型泛化攻击奖励和多样性惩罚组成。
- 蓝队采用三档响应评价：negative、rejective、positive，鼓励安全且有帮助的回答，而不是简单拒绝。
- 评估器通过多专家多数投票构造三分类数据，区分 unsafe response、simple refusal 和 useful guidance。
- 论文报告红队 adversarial effectiveness 提升约 20%-50%，蓝队 safety performance 提升约 10%-30%，同时保持 general reasoning capability。

#### 🔬 深入细节
![TriPlay-RL 三角色闭环](https://ar5iv.labs.arxiv.org/html/2601.18292/assets/x1.png)
*图：TriPlay-RL 的攻击者、守卫者、评估器闭环。红队产生攻击提示，蓝队响应，评估器给出奖励，三者交替进化。*

TriPlay-RL 的核心判断是：LLM 安全对齐不应只优化一个静态防御模型。现实中的攻击者会随着防御变化而调整策略，防御模型也需要从最新攻击中学习，而评估器如果固定不变，又会变成可被利用的 reward loophole。因此论文把安全训练拆成三个互相施压的角色：红队 \(M_{\mathrm{Red}}\) 负责把基础有害请求包装成更难防的 adversarial prompt；蓝队 \(M_{\mathrm{Blue}}\) 必须在这些攻击下给出安全、拒绝或建设性指导；评估器 \(M_{\mathrm{Eval}}\) 则不断学习更细粒度地区分 unsafe、simple refusal 与 safe-helpful response。

训练不是同时更新三个模型，而是交替阶段式更新：\(P_{\mathrm{Red}}\)、\(P_{\mathrm{Blue}}\)、\(P_{\mathrm{Eval}}\)。在 \(P_{\mathrm{Red}}\) 中，蓝队和评估器提供攻击反馈，红队通过 GRPO/RLVR 变强；在 \(P_{\mathrm{Blue}}\) 中，红队固定为最近一轮攻击分布，蓝队学习防御；在 \(P_{\mathrm{Eval}}\) 中，用红蓝对抗过程中产生的 \(\langle prompt,response\rangle\) 数据和多专家投票标签更新评估器。这种闭环的价值在于避免“离线安全集过拟合”：训练数据、攻击强度、评价边界都随迭代变化。

红队奖励函数设计得相对细。首先是 semantic reward，确保包装后的 adversarial prompt 仍保留原始请求的核心语义和攻击目标，避免红队为了得分生成偏题文本。其次是 diversity penalty，针对已成功攻击池 ASP 中的历史 prompts，分别用 Self-BLEU 和 embedding cosine similarity 惩罚重复模式：

$$
B_{\text{selfBLEU}}(x)=-\sum_{n=1}^{K}\operatorname{SelfBLEU}_{\mathcal{X}}(x,n),
$$

$$
B_{\text{Cos}}(x)=-\sum_{x'\in\mathcal{X}}\frac{\phi(x)\cdot\phi(x')}{\|\phi(x)\|^2\|\phi(x')\|^2}.
$$

论文再用非线性函数 \(y(x)=e^{kx}-1\) 放大高相似度惩罚，并组合为：

$$
P_{\text{div}}=w_{\text{B}}y(B_{\text{selfBLEU}}(x))+w_{\text{C}}y(B_{\text{Cos}}(x)).
$$

这相当于给红队加一个“不要只会同一种 jailbreak 模板”的约束。实验附录给出的典型参数是 \(w_B=2\)、\(w_C=4\)，n-gram 取 3、4、5。

为了让红队攻击具有跨模型泛化性，TriPlay-RL 不只攻击当前蓝队，还把 Llama、ChatGLM 等其他防御模型纳入奖励。红队总奖励写成：

$$
R_{\text{total}}=
\sum_{i=1}^{n}w_i\left[\sum_{r\in\{0,1,2\}}R_r\cdot\mathbf{1}_{[r]}\right]
+R_{\text{sem}}-P_{\text{div}}.
$$

其中 \(i\) 遍历不同 defense model，\(w_i\) 是模型权重，\(r\) 表示攻击结果类型。论文附录中 \(M_{blue}\) 权重为 0.6，Meta-Llama-3.1-8B-Instruct 和 GLM-4.6 各 0.2。这种多目标奖励避免红队只钻单个防御模型漏洞。

蓝队不是被训练成“看到风险就拒绝”的保守模型。论文采用三档评价标准：

$$
s=\begin{cases}
negative & \text{if } r \text{ contains safety risks},\\
rejective & \text{if } r \text{ is simple refusal},\\
positive & \text{if } r \text{ is safe and helpful}.
\end{cases}
$$

对应 reward 为：

$$
\operatorname{Reward}_i=\begin{cases}
-1 & \text{if } s_i=negative,\\
0 & \text{if } s_i=rejective,\\
1 & \text{if } s_i=positive.
\end{cases}
$$

这个设计很重要：简单拒绝只有 0 分，安全且有用才是正分。因此 \(M_{\mathrm{Blue}}\) 被鼓励在安全边界内提供 constructive guidance，而不是为了安全牺牲所有 utility。它直接对应论文的目标：提升安全能力同时尽量保持通用推理能力。

评估器 \(M_{\mathrm{Eval}}\) 是闭环稳定性的关键。若 evaluator 太弱，红队和蓝队都会学会利用其偏差；若 evaluator 只做二分类，蓝队可能退化成全拒绝。因此论文将评估器训练成三分类器，并使用多专家多数投票构造标签。安全专家先判断 safe/unsafe，utility experts 再把安全响应细分成 rejective 或 positive，最终得到 \(\langle prompt,response,C\rangle\)，其中 \(C\in\{negative,rejective,positive\}\)。这让 evaluator 的奖励信号与蓝队目标一致，也缓解单一 LLM judge 被 reward hacking 的问题。

```python
# TriPlay-RL 简化伪代码
# 三个模型：M_red attacker, M_blue defender, M_eval evaluator
# 每轮依次执行 P_red, P_blue, P_eval；每个阶段使用 GRPO/RLVR 更新当前角色

for iteration in range(num_iterations):
    # P_red: train attacker with fixed defender/evaluator
    for harmful_seed in seed_prompts:
        adv_prompt = M_red.wrap(harmful_seed)
        responses = [defense_model(adv_prompt) for defense_model in [M_blue, llama_target, glm_target]]
        eval_scores = [M_eval(adv_prompt, resp) for resp in responses]
        R_sem = semantic_judge(harmful_seed, adv_prompt)
        P_div = diversity_penalty(adv_prompt, attack_success_pool)
        R_red = weighted_attack_reward(eval_scores) + R_sem - P_div
        update_with_grpo(M_red, adv_prompt, R_red)
        store_prompt_response_pairs(adv_prompt, responses)

    # P_blue: train defender against newest red distribution
    for adv_prompt in sample_from_latest(M_red):
        response = M_blue(adv_prompt)
        label = M_eval.classify(adv_prompt, response)  # negative / rejective / positive
        R_blue = {-1: "negative", 0: "rejective", 1: "positive"}[label]
        update_with_grpo(M_blue, response, R_blue)

    # P_eval: refresh evaluator with multi-expert majority labels
    labeled_data = majority_vote_experts(collected_prompt_response_pairs)
    supervised_or_rl_update(M_eval, labeled_data)
```

> 💡 关键：TriPlay-RL 的“自博弈”不是二人零和游戏，而是三角色共同进化。红队提升攻击覆盖度，蓝队学习更稳健的安全有用响应，评估器随数据刷新评价标准，三者形成持续压力。

#### 🧪 练习题
```yaml
question: "TriPlay-RL 为什么要把蓝队响应分成 negative、rejective、positive 三档，而不是只判断 safe/unsafe？"
options:
  - "为了让红队生成更短的攻击提示"
  - "为了奖励安全且有帮助的回答，避免蓝队退化成简单拒绝模型"
  - "为了减少评估器训练数据量"
  - "为了让 GRPO 不再需要 KL 正则"
answer: 1
explain: "simple refusal 只得到 0 分，safe and helpful 才得到正分，因此蓝队被推动在安全边界内保持实用性。"
```

### 轻量对齐 (Light Alignment)

```yaml
id: light_alignment
num: 17
name: 轻量对齐 (Light Alignment)
full_name: 轻量对齐 (Light Alignment)
year: '2026.02'
org: ''
parent: grpo
paper_url: https://arxiv.org/abs/2602.02027
project_url: ''
category: rl_based
motivation: 单神经元安全专家自反射
```

#### 📝 一句话总结
Light Alignment 提出了 Neuron-Guided Safe Decoding (NGSD)：只训练同模型家族中最小规模的安全专家，并用单个神经元式门控在解码时按风险选择性触发安全 logit 修正。它解决了传统安全后训练成本高、推理时统一干预易损害 utility、以及轻量方法跨模型泛化差的问题。

#### 🎯 核心要点
- 方法名为 NGSD：Neuron-Guided Safe Decoding，是一种 decoding-time safety alignment 方法。
- 只训练小规模 safety expert，并迁移到同 tokenizer、同模型家族的更大 base model。
- Prompt-level self-reflection 在生成前对输入进行四维风险评分：severity、actionability、evasion、targeting。
- 风险分数决定固定安全强度 \(\alpha\)：高风险 \(r>5\) 取 0.9，低风险 \(r\le 5\) 取 0.1。
- 解码中计算 base model 与 expert model 的 next-token distribution 差异 \(I_t=\frac12\|p_b-p_e\|_1\)，作为即时风险信号。
- 单神经元门控累计历史风险：\(v\leftarrow(1-1/\tau)v+I_t\)，超过阈值才触发 SafeDecoding-style 修正。
- 触发时只在候选集合 \(C=\operatorname{TopK}(p_b)\cup\operatorname{TopK}(p_e)\) 上执行 \(\tilde{p}=p_b+\alpha(p_e-p_b)\)，未触发时完全按 base model 解码。

#### 🔬 深入细节
![NGSD 管线图](https://ar5iv.labs.arxiv.org/html/2602.02027/assets/x1.png)
*图：Neuron-Guided Safe Decoding 的整体流程。先做 prompt-level self-reflection 决定安全强度，再在解码过程中用单神经元门控选择性调用 safety expert。*

Light Alignment/NGSD 的基本立场是：安全对齐不一定要把大模型参数重新训练一遍，也不应在每个 token 上无差别地施加强安全约束。传统 post-training 方法如 RLHF/DPO 成本高且与目标模型绑定；一些 decoding-time 方法虽然不改参数，但常常需要模型专属 safety vector、复杂搜索或持续 logit 干预，容易造成 over-refusal 或 utility degradation。NGSD 将问题拆成两层：输入层面先判断“这次请求整体危险吗”，token 层面再判断“当前生成位置是否真的需要专家介入”。

第一层是 prompt-level self-reflection。模型在生成前只执行一次风险评估，输出四个 0-10 分的维度：severity \(S\)、actionability \(A\)、evasion \(E\)、targeting \(T\)。论文强调这些维度不是为某类攻击硬编码，而是试图捕捉跨攻击类型的风险属性。聚合方式是先对 \(P=\{A,E,T\}\) 降序排序，取最大两个 \(P_1,P_2\)，再计算：

$$
r=\max\left(S,\frac12S+\frac12\cdot\frac{P_1+P_2}{2}\right),\quad r\in[0,10].
$$

这里 severity 被赋予主导地位，因为高危主题即使没有强 actionability，也不应被低估；而 actionability、evasion、targeting 只取 top-2，是为了减少噪声维度对最终风险的干扰。之后 NGSD 将 \(\alpha\) 固定为：高风险 \(r>5\) 时 \(\alpha=0.9\)，低风险 \(r\le5\) 时 \(\alpha=0.1\)。与 SSD 这类周期性调整 \(\alpha\) 的方法相比，这样的 prompt-level 决策推理开销更低，也减少了超参数动态震荡。

第二层是 neuron-guided decoding。NGSD 在解码时同时计算 base model \(M_b\) 与 safety expert \(M_e\) 的 next-token distribution：

$$
p_b=\operatorname{softmax}(M_b(x,y_{<t})),\quad
p_e=\operatorname{softmax}(M_e(x,y_{<t})).
$$

两者差异用 \(\ell_1\) 距离的一半表示：

$$
I_t=\frac12\|p_b-p_e\|_1.
$$

直觉上，如果 safety expert 与 base model 对下一 token 分布非常一致，说明当前位置没有明显安全分歧；如果差异很大，则可能表示 base model 正朝专家认为不安全的区域移动。NGSD 不直接用 \(I_t\) 的瞬时值触发干预，而是将其输入一个单神经元式时间门控：

$$
v_t=\left(1-\frac1\tau\right)v_{t-1}+I_t,
$$

当 \(v_t\ge v_{th}\) 时发放 spike，触发安全修正并把膜电位重置；否则继续使用 base model 解码。这个设计能过滤单步噪声，又能对连续风险积累快速响应。

触发门控后，NGSD 不在全词表上粗暴替换分布，而是构造候选集合：

$$
C=\operatorname{TopK}(p_b)\cup\operatorname{TopK}(p_e).
$$

然后执行 SafeDecoding-style 修正：

$$
\tilde{p}(y)=p_b(y)+\alpha(p_e(y)-p_b(y)),\quad y\in C.
$$

当 \(\alpha\) 较大时，分布更靠近 safety expert；当 \(\alpha\) 较小时，base model 的原始能力占主导。未触发神经元门控时，NGSD 直接按 \(p_b\) 选择 token，不让专家影响正常生成。这就是论文所谓“balancing intrinsic model capabilities with external guidance”：模型自己的安全意识和语言能力不是被外部专家全程覆盖，而是在高风险 prompt、高风险 token 位置才被加强。

NGSD 的 safety expert 也体现“轻量对齐”。它选择同模型家族中最小规模模型做安全增强训练，原因是 tokenizer 和输出空间兼容，专家分布可以与更大模型的 next-token distribution 对齐。这样，部署大模型时不需要给每个 scale 单独做完整安全后训练，只需让小专家在解码时提供方向。论文实验覆盖 GCG、PAIR、AutoDAN、prefilling attack 等攻击，并报告 NGSD 在安全性、utility、false refusal 和效率上取得更好的折中；方法还包含一个工程性的 early stopping 模块，用于缓解强 logit 干预下可能出现的重复拒绝文本。

```python
# NGSD / Light Alignment 简化伪代码
# 输入：prompt x, base model M_b, lightweight expert M_e, max length M

# 1. Prompt-level self-reflection
S, A, E, T = risk_reflection(x)  # severity/actionability/evasion/targeting, each in [0, 10]
P1, P2 = top2([A, E, T])
r = max(S, 0.5 * S + 0.5 * ((P1 + P2) / 2))
r = clip(r, 0, 10)
alpha = 0.9 if r > 5 else 0.1

# 2. Neuron-guided decoding
v = v_reset
y = []
for t in range(M):
    p_b = softmax(M_b(x, y))
    p_e = softmax(M_e(x, y))
    I_t = 0.5 * l1_norm(p_b - p_e)
    v = (1 - 1 / tau) * v + I_t

    if v >= v_threshold:
        C = topk_tokens(p_b) | topk_tokens(p_e)
        p_tilde = p_b + alpha * (p_e - p_b)
        token = argmax_over(p_tilde, C)
        v = v_reset
    else:
        token = argmax(p_b)

    y.append(token)
    if token == EOS:
        break
return y
```

> ⚠️ 注意：NGSD 的关键不是“安全专家越强越好、介入越多越好”，而是只在 prompt 风险和 token 分布分歧共同指向风险时介入；这正是它降低 over-refusal、保留 utility 的主要机制。

#### 🧪 练习题
```yaml
question: "NGSD 中单神经元门控的主要作用是什么？"
options:
  - "把 base model 的所有 token 概率替换为 expert model 概率"
  - "累计 base 与 safety expert 的分布差异，只在持续风险超过阈值时触发安全修正"
  - "在训练阶段压缩模型参数，使模型变成 1B 参数"
  - "用 beam search 生成多个候选回答，再交给人工评估"
answer: 1
explain: "门控状态 v 会累积 \(I_t=\frac12\|p_b-p_e\|_1\)，超过阈值才执行 \(p_b+\alpha(p_e-p_b)\) 修正，否则保持 base model 原始解码。"
```

### f散度GRPO (f-GRPO)

```yaml
id: f_grpo
num: 18
name: f散度GRPO (f-GRPO)
full_name: f散度GRPO (f-GRPO)
year: '2026.02'
org: ''
parent: grpo
paper_url: https://arxiv.org/abs/2602.05946
project_url: ''
category: rl_based
motivation: 散度泛化的GRPO改进
```

#### 📝 一句话总结
f-GRPO 将 GRPO 的“组内相对优势更新”重新解释为奖励诱导的 aligned / unaligned 分布之间的 \(f\)-divergence 估计，从而把偏好对齐里的散度优化推广到只有标量奖励的 RLVR 场景。论文同时提出 f-HAL，把 on-policy 的 f-GRPO 与 off-policy 偏好监督相插值，用于在奖励模型不可靠时缓解 reward hacking。

#### 🎯 核心要点
- 将 preference alignment 中“chosen vs. rejected 分布的散度估计”推广到 RLVR 中“高于组均值奖励 vs. 低于组均值奖励”的分布估计。
- 每个 prompt 采样一组响应，用标准化 advantage 将响应分成 reward-aligned 与 reward-unaligned 两侧。
- 用截断 importance weighting 与 softmax reward weighting 估计 \(D_r^+\) 和 \(D_r^-\) 相对于旧策略采样分布的密度比。
- 用 \(f\)-divergence 的变分表示构造统一损失，可实例化为 Hellinger、JS、KL、Pearson、Reverse KL、Total Variation 等不同版本。
- f-GRPO 的核心差异不是简单替换 GRPO 的 advantage，而是把更新目标改成“分离奖励好样本和坏样本”的散度估计。
- f-HAL 通过 \(\lambda\mathcal{L}_{\mathrm{FDO}}+(1-\lambda)\mathcal{L}_{f\text{-}\mathrm{GRPO}}\) 融合偏好数据和 on-policy reward feedback。
- 理论结果给出 divergence estimation、alignment consistency 与期望奖励提升；与 GRPO 相比，canonical link 下的 f-GRPO 对低于均值的响应压制更强。

#### 🔬 深入细节
![f-GRPO divergence estimation framework](https://arxiv.org/html/2602.05946v3/nips_figs_tabs/figs/f-grpo_HQ.png)
*图：论文 Figure 1，将 RLVR、Preference Alignment 和 Hybrid Alignment 统一为 aligned / unaligned 分布之间的散度估计。*

```python
# f-GRPO / f-HAL 的核心训练逻辑，按论文 Algorithm 1 简化整理
for step in training_steps:
    prompts = sample_prompts(batch_size=B)
    old_policy = copy(policy)
    on_policy_grad = 0

    for x in prompts:
        ys = [old_policy.generate(x) for _ in range(G)]
        rewards = [reward_fn(x, y) for y in ys]
        adv = normalize(rewards)  # (r_i - mean(r)) / std(r)

        # above-average -> reward-aligned; below-average -> reward-unaligned
        w_pos = truncated_softmax_importance(rewards, adv > 0, old_policy)
        w_neg = truncated_softmax_importance([-r for r in rewards], adv < 0, old_policy)

        for y_i, a_i, wp_i, wn_i in zip(ys, adv, w_pos, w_neg):
            r_theta = beta * logprob_ratio(policy, ref_policy, x, y_i)
            if a_i > 0:
                psi = -wp_i * link_g(r_theta)
            else:
                psi =  wn_i * convex_conjugate_f_star(link_g(r_theta))
            on_policy_grad += a_i * grad(psi)

    off_policy_grad = fdo_gradient(preference_batch) if use_preference_data else 0
    grad_total = (1 - lambda_) * on_policy_grad + lambda_ * off_policy_grad
    policy.update(grad_total)
```

传统 GRPO 的出发点是：对同一个 prompt 采样 \(G\) 个候选回答，计算组内标准化优势 \(A_i\)，再提高正优势回答的概率、降低负优势回答的概率。它的隐含奖励可写为
$$
r_\theta(x,y)=\beta\log\frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)},
$$
组内优势常写成
$$
A_i=\frac{r(x,y_i)-\frac{1}{G}\sum_{j=1}^{G}r(x,y_j)}{\mathrm{std}(\{r(x,y_j)\}_{j=1}^{G})+\epsilon}.
$$
GRPO 直接把 \(A_i\) 当作策略梯度权重，因此它更像“按奖励相对大小做局部 reweighting”。f-GRPO 的关键改动是：不只问某个样本 advantage 有多大，而是先用 advantage 的符号定义两个分布，\(D_r^+\) 表示高于均值的 reward-aligned 响应，\(D_r^-\) 表示低于均值的 reward-unaligned 响应，然后优化二者的 \(f\)-divergence。

由于 RLVR 没有偏好数据里直接给出的 chosen / rejected 样本，论文用旧策略 \(\pi_{\theta_{\mathrm{old}}}\) 采样到的一组响应来做 importance sampling。直观上，正侧权重要偏向高奖励样本，负侧权重要偏向低奖励样本，同时还要校正这些样本来自旧策略而不是目标 aligned / unaligned 分布。可简化写成
$$
\hat w_i^+\propto \mathbf{1}\{A_i>0\}\frac{\operatorname{softmax}(r_1,\ldots,r_G)_i}{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)},\quad
\hat w_i^-\propto \mathbf{1}\{A_i<0\}\frac{\operatorname{softmax}(-r_1,\ldots,-r_G)_i}{\pi_{\theta_{\mathrm{old}}}(y_i\mid x)}.
$$
这里的 indicator 是“截断”的来源：正侧只从 above-average 样本估计，负侧只从 below-average 样本估计。这样做避免了把奖励中性的样本强行解释为偏好信号，也使更新更聚焦于区分好坏行为的样本。

有了 \(\hat w_i^+\) 与 \(\hat w_i^-\)，f-GRPO 把 preference alignment 中的 FDO 目标搬到 on-policy RL 中。对任意凸函数 \(f\)、共轭函数 \(f^*\) 和单调 link function \(g\)，局部项可写成
$$
\psi_{f,g}(r_\theta,A_i)=
\begin{cases}
-\hat w_i^+\,g(r_\theta(x,y_i)), & A_i>0,\\
\hat w_i^-\,f^*(g(r_\theta(x,y_i))), & A_i<0.
\end{cases}
$$
训练时再用 advantage 的幅度调节梯度尺度，得到与标准 on-policy RL 相近的优化动态。不同 \(f\) 选择对应不同的“分离形状”：例如 KL 更强调覆盖 aligned 分布，Reverse KL 更强调模式选择，Total Variation 更像最大化可分性边界。论文的价值在于给出一套统一 recipe，而不是只提出一个固定损失。

f-HAL 则面向奖励模型不完美的安全对齐场景。纯 on-policy RL 使用 learned reward model 时容易 reward hacking：模型找到奖励模型漏洞，却偏离真实人类偏好。f-HAL 将 off-policy preference supervision 当作锚点：
$$
\mathcal{L}_{f\text{-}\mathrm{HAL}}(\theta)=\lambda\mathcal{L}_{\mathrm{FDO}}(\theta)+(1-\lambda)\mathcal{L}_{f\text{-}\mathrm{GRPO}}(\theta).
$$
当 \(\lambda=0\) 时退化为 f-GRPO，当 \(\lambda=1\) 时退化为 FDO；中间值同时利用 reward feedback 的探索能力和偏好数据的稳定约束。论文将其解释为 aligned mixture 与 unaligned mixture 之间的散度估计，因此 hybrid 不是简单加 loss，而是在分布层面混合两类对齐信号。

与 GRPO 的差别可以用固定点直觉理解。未裁剪 GRPO 会按照标准化奖励对参考策略做指数 reweighting，因此低于均值的响应通常仍保留非零概率；f-GRPO 在 canonical link 条件下更接近“把质量集中到 above-average 响应集合”，对 below-average 响应的压制更尖锐。这个差别解释了论文在数学推理 RLVR 上看到的收益：模型不只是平滑地偏向高分样本，而是更明确地最大化 reward-aligned 与 reward-unaligned 行为之间的分离。

> 💡 关键：f-GRPO 的“f”不是装饰性超参数，而是决定 aligned / unaligned 两侧如何被拉开；f-HAL 的“hybrid”也不是普通多任务训练，而是把偏好分布与奖励诱导分布混合后再做散度估计。

#### 🧪 练习题
```yaml
question: "f-GRPO 相比标准 GRPO 的核心变化是什么？"
options:
  - "把所有奖励都替换为人工偏好标签"
  - "把组内优势更新解释并改造为 reward-aligned 与 reward-unaligned 分布之间的 f-divergence 估计"
  - "只增加 KL 惩罚系数以防止策略偏离参考模型"
  - "去掉 on-policy 采样，完全依赖离线数据训练"
answer: 1
explain: "f-GRPO 仍使用 on-policy 组采样，但用奖励诱导两侧分布并通过 f-divergence 变分目标优化二者分离；这比 GRPO 的简单 advantage reweighting 更结构化。"
```

### 蜂群数据选择 (BeeS)

```yaml
id: bees
num: 19
name: 蜂群数据选择 (BeeS)
full_name: 蜂群数据选择 (BeeS)
year: '2026.02'
org: ''
parent: dpo
paper_url: https://arxiv.org/abs/2502.06648
project_url: ''
category: direct_preference
motivation: 边际最大化数据选择改进DPO
```

#### 📝 一句话总结
BeeS 提出用“边际最大化 + 多源贝叶斯聚合”来筛选 DPO 偏好数据，解决噪声偏好样本导致的参数收缩和训练低效问题。它不是修改 DPO 损失本身，而是在训练前挑出外部奖励边际与隐式 DPO 边际都足够可信的高价值偏好对。

#### 🎯 核心要点
- 从理论上分析偏好标签噪声会造成 parameter shrinkage，使学到的奖励方向或策略更新向零收缩。
- 提出 margin-maximization principle：大边际偏好对更不容易被噪声翻转，也更能抵消噪声带来的收缩。
- 同时使用 external reward margin 与 implicit DPO reward margin，避免单一奖励模型在 OOD 偏好上误判。
- 用小模型在少量 seed data 上预先 DPO，低成本获得 in-distribution implicit reward signal。
- 将不同来源、不同尺度的 margin 投影到统一概率空间，再用 Bayes aggregation 得到偏好方向正确的联合置信度。
- 一次性 DPO 时选择最高聚合概率样本；迭代 DPO 时每轮生成候选后复用 BeeS 三步流程过滤在线数据。
- 实验覆盖 TL;DR、Anthropic HH、UltraFeedback、Llama-UltraFeedback、Mistral-UltraFeedback，并显示少量 BeeS 子集可超过全量 DPO。

#### 🔬 深入细节
![BeeS workflow](https://arxiv.org/html/2502.14560v4/x1.png)
*图：论文 Figure 1，BeeS 工作流：先做小规模 in-distribution pre-DPO，再计算多源 margin，最后通过贝叶斯聚合选择训练样本。*

```python
# BeeS: Bayesian Aggregation for Preference data Selection
# 输入：偏好数据 D={(x, y_w, y_l)}、外部奖励模型 r_ex、参考模型 pi_ref、小策略模型 pi_small
seed = random_sample(D, n_seed)
pi_theta = dpo_train(pi_small, seed)  # Step 1: in-distribution pre-DPO

scores = []
for x, y_w, y_l in D:
    # Step 2: 多源 margin 计算
    m_ex = r_ex(x, y_w) - r_ex(x, y_l)
    r_im_w = logprob(pi_theta, y_w, x) - logprob(pi_ref, y_w, x)
    r_im_l = logprob(pi_theta, y_l, x) - logprob(pi_ref, y_l, x)
    m_im = r_im_w - r_im_l

    # Step 3: 将 margin 投影为单源偏好概率，并做 Bayes aggregation
    p_ex = (clip(m_ex, L_ex, U_ex) - L_ex) / (U_ex - L_ex)
    p_im = (clip(m_im, L_im, U_im) - L_im) / (U_im - L_im)
    p_joint = (p_ex * p_im) / (p_ex * p_im + (1 - p_ex) * (1 - p_im))
    scores.append((p_joint, x, y_w, y_l))

D_train = top_k(scores, ratio=selection_ratio, key="p_joint")
policy = dpo_train(target_policy, D_train)
```

DPO 的标准目标把偏好对 \((x,y_w,y_l)\) 转成一个二分类式的 log-ratio 训练问题：
$$
\mathcal{L}_{\mathrm{DPO}}(\theta)=-\mathbb{E}\left[\log\sigma\left(\beta\left(\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}-\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}\right)\right)\right].
$$
这个公式隐含了一个假设：\(y_w\) 的确比 \(y_l\) 更符合偏好。BeeS 关注的问题是，如果偏好标签由人类、LLM judge 或 reward model 产生，其中可能混入外生噪声 \(\zeta\)，那么训练会不断收到互相冲突的梯度。论文用线性奖励模型 \(r(x,y)=\langle\phi(x,y),\omega^*\rangle\) 做分析，指出噪声会抵消真实 margin，使最优 \(\omega\) 向原点收缩，即学到的偏好方向变弱。

为了抵消这种 shrinkage，BeeS 选择大边际样本。直觉是：如果 \(r(x,y_w)-r(x,y_l)\) 很大，噪声必须非常强才会翻转偏好；如果 margin 接近零，则 chosen / rejected 可能只是偶然排序，DPO 会浪费梯度甚至学到错误方向。论文把这一点称作 parameter inflation：选择大 margin 样本会让模型更确信当前偏好方向，从而给出更明确的参数更新。但单一 margin 来源并不可靠，尤其外部 reward model 在新分布上可能 OOD，因此 BeeS 不只看一个奖励模型。

BeeS 的两个核心 margin 是 external margin 与 implicit margin：
$$
m_{\mathrm{ex}}=r_{\mathrm{ex}}(x,y_w)-r_{\mathrm{ex}}(x,y_l),
$$
$$
m_{\mathrm{im}}=\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}-\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}.
$$
external margin 来自独立奖励模型，能提供外部偏好判断；implicit margin 来自经过少量 DPO 后的小模型，能反映当前数据分布内的偏好结构。论文观察到不同外部/隐式 margin 之间相关性弱，而不同规模模型算出的 implicit margin 相关性较强，因此用小模型预训练估算 implicit margin 是成本可控的。

多源聚合是 BeeS 的“Bee”所在。每个 margin \(m^i\) 先通过 clipping 映射成偏好方向正确的单源概率：
$$
p_i=\mathbb{P}(y_w>y_l\mid m^i)=\frac{\mathrm{clip}(m^i,L,U)-L}{U-L}.
$$
在条件独立近似下，多个来源的联合偏好概率为
$$
\mathbb{P}(y_w>y_l\mid m^1,\ldots,m^K)=\frac{\prod_{i=1}^{K}p_i}{\prod_{i=1}^{K}p_i+\prod_{i=1}^{K}(1-p_i)}.
$$
这个公式体现了一个严格策略：只要某个来源给出低置信度，联合概率就会明显下降。因此 BeeS 会优先保留“多个评估视角都认为 chosen 明显优于 rejected”的偏好对，而不是只相信一个高分 reward model。

训练流程上，BeeS 与 DPO 是解耦的。它先在全量偏好数据上打分和排序，然后把 top subset 送给普通 DPO；因此它能直接叠加到现有 DPO、iterative DPO 或其他偏好优化管线中。论文实验显示，在 TL;DR、HH、UltraFeedback 等任务上，随机选少量数据不稳定，单独按 external margin 或 implicit margin 选也可能在某些数据集上失败；BeeS 的聚合概率更稳健，经常用 2% 到 10% 的数据达到甚至超过全量 DPO。这个结论的含义不是“数据越少越好”，而是偏好数据中存在大量低 margin 或冲突样本，直接全量训练会把这些噪声也放大。

> ⚠️ 注意：BeeS 不会修复错误的 DPO 目标，也不生成新偏好；它只负责在训练前提高偏好对的信噪比。如果所有 margin 来源都同向偏差，贝叶斯聚合仍可能筛出系统性错误样本。

#### 🧪 练习题
```yaml
question: "BeeS 为什么要同时聚合 external margin 和 implicit DPO margin？"
options:
  - "为了让 DPO 训练完全不需要参考模型"
  - "因为单一奖励来源可能 OOD 或噪声较大，多源一致的大边际样本更可能是真正高质量偏好对"
  - "为了把 pairwise preference 任务改成多分类任务"
  - "因为 external margin 只用于推理阶段，不能参与训练前筛选"
answer: 1
explain: "BeeS 的核心是用多源 margin 估计偏好方向的联合置信度；任一来源低置信会降低聚合概率，从而过滤掉噪声或分布外样本。"
```

### 双向DPO (BiDPO)

```yaml
id: bidpo
num: 20
name: 双向DPO (BiDPO)
full_name: 双向DPO (BiDPO)
year: '2026.02'
org: ''
parent: tdpo
paper_url: https://arxiv.org/abs/2602.10234
project_url: ''
category: token_multimodal
motivation: 双向Token级VLM偏好优化
```

#### 📝 一句话总结
BiDPO 针对 VLM 依赖语言先验、忽视细粒度视觉证据的问题，构造语义受控的最小对比图像对，并用正反两个方向的偏好优化和 token-level grounding 让模型同时识别正确与错误的图文-答案配对。它把 DPO 从“整句级偏好”推进到“视觉细节驱动的双向、token 级偏好监督”，用于降低多模态幻觉。

#### 🎯 核心要点
- 面向 vision-language models 的 hallucination 问题，尤其是模型凭语言先验回答而不看关键视觉细节。
- 自动识别问题中的 semantic focus，例如对象、属性、数量、空间关系或局部视觉线索。
- 基于 semantic focus 对图像做 targeted visual modification，构造最小但有判别力的 contrastive image pairs。
- 使用 CLIP-based similarity filtering 保证修改前后语义整体一致、局部变化可控，形成 BiDPO-data-12k 数据集。
- 双向偏好优化同时训练 forward direction 与 reverse direction，使模型学习“正确图像-答案配对优于错配”以及“反向错配也应被拒绝”。
- 引入 explicit token-level supervision 与 regularization，让答案中的关键 token 对齐到相应视觉证据。
- 在 AMBER、MMHalBench、ObjectHalBench 等幻觉基准上评估，并报告 7B 规模模型在 MMHalBench 上 hallucination rate 从 57.0% 降到 31.2%。

#### 🔬 深入细节
![BiDPO framework reconstruction](https://mermaid.ink/img/Zmxvd2NoYXJ0IExSCiAgUVtRdWVzdGlvbl0gLS0-IFNbU2VtYW50aWMgZm9jdXMgZXh0cmFjdG9yXQogIElbT3JpZ2luYWwgaW1hZ2VdIC0tPiBFW1RhcmdldGVkIHZpc3VhbCBlZGl0XQogIFMgLS0-IEUKICBFIC0tPiBQW01pbmltYWwgY29udHJhc3RpdmUgaW1hZ2UgcGFpcl0KICBQIC0tPiBDW0NMSVAgc2ltaWxhcml0eSBmaWx0ZXJdCiAgQyAtLT4gRFtCaURQTy1kYXRhLTEya10KICBEIC0tPiBGW0ZvcndhcmQgcHJlZmVyZW5jZTogY29ycmVjdCBwYWlyID4gbWlzbWF0Y2hlZCBwYWlyXQogIEQgLS0-IFJbUmV2ZXJzZSBwcmVmZXJlbmNlOiBlZGl0ZWQtY29ycmVjdCBwYWlyID4gb3JpZ2luYWwtbWlzbWF0Y2ggcGFpcl0KICBGIC0tPiBMW0JpZGlyZWN0aW9uYWwgRFBPIGxvc3NdCiAgUiAtLT4gTAogIEwgLS0-IFRbVG9rZW4tbGV2ZWwgZ3JvdW5kaW5nIHJlZ3VsYXJpemVyXQogIFQgLS0-IE1bVkxNIHdpdGggbG93ZXIgaGFsbHVjaW5hdGlvbl0K)
*图：根据 BiDPO 公开摘要、DOI 元数据与可检索方法描述复现的流程示意。TechRxiv PDF 对命令行访问返回 Cloudflare challenge，任务给定 arXiv 链接又对应无关论文，因此此处不用错误论文图。*

```python
# BiDPO 的核心流程，按公开论文摘要与方法描述简化整理
for sample in vqa_corpus:
    image, question, answer = sample.image, sample.question, sample.answer

    # 1. 找到问题真正依赖的视觉语义焦点
    focus = semantic_focus_extractor(question, answer)

    # 2. 生成最小视觉改动：只改变 focus 相关区域，保持其他语义稳定
    edited_image = targeted_visual_edit(image, focus)

    # 3. CLIP 过滤：整体仍相似，但局部语义差异足以影响答案
    if not clip_similarity_in_range(image, edited_image):
        continue

    # 4. 构造正反方向偏好对
    forward_pair = ((image, question, answer), (edited_image, question, answer))
    reverse_answer = answer_for_edited_image(question, edited_image)
    reverse_pair = ((edited_image, question, reverse_answer), (image, question, reverse_answer))

    # 5. 训练时同时优化双向 DPO 与 token-level grounding regularizer
    loss_f = dpo_loss(policy, reference, forward_pair)
    loss_r = dpo_loss(policy, reference, reverse_pair)
    loss_tok = token_grounding_loss(policy, image, question, answer, focus)
    loss = loss_f + loss_r + alpha * loss_tok
    policy.update(loss)
```

VLM 幻觉的根源之一是“答案 token 可以被语言先验解释，却没有被图像证据约束”。例如问题问图中物体颜色、数量或空间关系时，模型可能根据训练语料中的常见搭配回答，而不是检查局部视觉区域。普通 DPO 只告诉模型某个回答整体更好，不能保证模型关注了导致偏好差异的视觉 token。BiDPO 的动机是把偏好对构造成视觉最小对比：图像大部分保持一致，只修改问题所依赖的关键语义，从而让偏好信号集中到“看没看对视觉证据”上。

数据构造首先需要 semantic focus extraction。给定问题 \(q\) 和原始图像 \(I\)，算法识别答案依赖的局部概念 \(s\)，例如“红色杯子”的颜色、“三只狗”的数量、“左边的人”的空间位置。然后生成编辑图像 \(\tilde I\)，只对 \(s\) 做 targeted modification。CLIP similarity filtering 的作用是排除两类坏样本：一种是修改太小，模型不需要视觉辨别也能给同一答案；另一种是修改太大，整张图语义变了，偏好差异不再能归因到 semantic focus。

在优化目标上，BiDPO 可以看作多模态 DPO 的双向扩展。设 \((I,q,a^+)\) 是正确图像-问题-答案组合，\((\tilde I,q,a^-)\) 是由于视觉局部被改动而不再匹配的组合，单向 DPO 项可简化写成
$$
\mathcal{L}_{\mathrm{DPO}}^{\rightarrow}=-\log\sigma\left(\beta\left[\log\frac{\pi_\theta(a^+\mid I,q)}{\pi_{\mathrm{ref}}(a^+\mid I,q)}-\log\frac{\pi_\theta(a^-\mid \tilde I,q)}{\pi_{\mathrm{ref}}(a^-\mid \tilde I,q)}\right]\right).
$$
但只做 forward direction 仍可能让模型学到“原图答案比编辑图答案好”的浅层规律。BiDPO 额外加入 reverse direction：对编辑图像的正确答案 \(\tilde a^+\)，要求 \((\tilde I,q,\tilde a^+)\) 优于 \((I,q,\tilde a^+)\)。整体目标可写成
$$
\mathcal{L}_{\mathrm{BiDPO}}=\mathcal{L}_{\mathrm{DPO}}^{\rightarrow}+\mathcal{L}_{\mathrm{DPO}}^{\leftarrow}+\alpha\mathcal{L}_{\mathrm{token}}+\gamma\mathcal{R}_{\mathrm{reg}}.
$$
其中 \(\mathcal{L}_{\mathrm{token}}\) 表示 token-level supervision，\(\mathcal{R}_{\mathrm{reg}}\) 表示防止偏好优化过度破坏原模型能力的正则项。

Token-level supervision 是 BiDPO 区别于普通图文偏好优化的关键。整句级 DPO 只对完整答案打分，而 token-level 约束会关注答案中与视觉焦点直接相关的 token，例如颜色词、数量词、实体名或空间介词。可把它理解为对每个关键 token \(t\) 加一个 grounding mask \(m_t\)：
$$
\mathcal{L}_{\mathrm{token}}=\sum_{t=1}^{T}m_t\,\mathrm{CE}(z_t,\hat z_t)+\eta\,\mathrm{KL}(A_t\Vert M_s),
$$
其中 \(A_t\) 是模型在生成 token \(t\) 时的视觉注意或对齐分布，\(M_s\) 是 semantic focus 对应的视觉证据区域。这个公式是机制化写法：核心含义是，关键答案 token 不只要生成对，还要从对应图像区域获得支持。

双向优化带来的直接收益是降低“单向捷径”。如果只训练 \((I,a)\) 优于 \((\tilde I,a)\)，模型可能记住原图分布或问题模板；加入反向后，同一个 semantic focus 的两种状态都会被当作正例和负例出现，模型必须根据图像状态切换答案。换言之，BiDPO 把“不要幻觉”变成一个可判别任务：当局部视觉证据变化时，答案 token 必须随之变化；当局部证据没变化时，答案不应被无关背景扰动影响。

从与 TDPO / token-level DPO 的关系看，BiDPO 继承了“偏好信号不应只落在序列末端”的思想，但把 token 级别监督绑定到视觉证据。对 VLM 来说，偏好优化的失败常不是语言流畅性问题，而是视觉 grounding 问题；因此 BiDPO 的贡献在于同时控制数据构造、偏好方向和 token grounding。实验中使用 AMBER、MMHalBench、ObjectHalBench 等幻觉评测，公开摘要报告 MMHalBench hallucination rate 在 7B 模型上从 57.0% 降至 31.2%，说明这种最小视觉对比数据能显著提高模型对细粒度视觉线索的敏感度。

> 💡 关键：BiDPO 的“Bi”不是简单把 loss 乘二，而是让同一语义焦点的两个视觉状态互为正负样本；模型只有真正读取视觉证据，才能同时满足 forward 与 reverse preference。

#### 🧪 练习题
```yaml
question: "BiDPO 中双向偏好优化的主要目的是什么？"
options:
  - "让模型在训练时同时使用两个不同的语言分词器"
  - "让正确与错误的图像-答案配对在正反两个视觉状态下都被区分，减少依赖语言先验的幻觉"
  - "用 CLIP 完全替代 VLM 的视觉编码器"
  - "只提高答案长度，不改变视觉 grounding"
answer: 1
explain: "BiDPO 构造最小对比图像对，并在 forward 与 reverse 两个方向上训练偏好差异；这样模型必须根据局部视觉证据改变答案。"
```

### Token自适应屏障PO (TAB-PO)

```yaml
id: tab_po
num: 21
name: Token自适应屏障PO (TAB-PO)
full_name: Token自适应屏障PO (TAB-PO)
year: '2026.03'
org: ''
parent: tdpo
paper_url: https://arxiv.org/abs/2603.00025
project_url: ''
category: token_multimodal
motivation: 自适应屏障保护关键Token
```

#### 📝 一句话总结
TAB-PO 提出面向结构化生成的 Token-Adaptive Barrier Preference Optimization，用混淆感知 hard negative 和置信度门控的 token 级屏障保护低置信关键 token，解决 DPO 在低编辑距离 JSON/本体输出中梯度稀释与正确 token 被侵蚀的问题。

#### 🎯 核心要点
- 面向本体驱动结构化预测，输出通常是 schema-valid JSON，正确性由少量语义标签、证据 span、关系链接或共指 token 决定。
- 构造 confusion-aware preference pairs：利用专家歧义模式和 SFT 验证集错误混淆表，合成最小扰动且 schema-valid 的 rejected 输出。
- 识别 DPO 在低编辑距离偏好对中的两个失配：梯度被 JSON scaffolding 稀释，以及偏好 margin 增大但正确稀有 token 概率下降。
- 在 DPO 风格 reference-adjusted preference loss 上加入 confidence-gated token barrier，只对当前策略低置信的 preferred token 施加 SFT 锚定。
- 实验聚焦 PV-Miner 和 SciERC，报告 semantic label、textual grounding、relation、coreference 等结构化指标，TAB-PO 在关键结构维度上显著优于 SFT、序列级 DPO 和 token 级 DPO 变体。

#### 🔬 深入细节
![TAB-PO 结构化预测流程](https://arxiv.org/html/2603.00025v2/x1.png)
*图：TAB-PO pipeline。模型先通过 prompt engineering 与 SFT 学会合法结构化输出，再用 confusion-aware hard negatives 与 token-level barrier 修正残余本体错误。*

TAB-PO 的出发点不是普通开放式回答偏好，而是本体约束的结构化预测。例如信息抽取任务会要求模型输出固定字段、层级标签、证据片段和关系链接。preferred 与 rejected completion 往往共享绝大多数 JSON 括号、字段名、逗号和模板 token，只在少数 schema-defining token 上不同。标准 DPO 看到的是整段 completion 的相对 likelihood，因此会把更新信号分摊到大量无关 serialization token 上，这就是论文称为 gradient dilution 的现象。更棘手的是，DPO 只要求 preferred 相对 rejected 的整体 margin 变大，某些罕见但正确的 preferred 标签 token 仍可能因为优化耦合而概率下降，这就是 preferred-token erosion。

TAB-PO 先处理数据构造问题。给定输入 \(x\) 和 gold structured output \(Y^+\)，它不会随机采样一个语法错误的负例，而是从 SFT 模型在验证集上的混淆模式和专家定义的歧义模式出发，构造低分离度 hard negative \(Y^-\)。扰动类型包括替换语义标签、替换或缩短 grounding span、删除应有记录、插入多余但 schema-valid 的记录、修改 relation/coreference link 等。这样 rejected 输出仍然可解析、符合 ontology，但在一个关键结构决策上错误，优化信号就会集中到真实易错边界。

核心 preference 部分仍保留 DPO 的 reference-adjusted margin。设序列化 completion 为 \(Y_s\)，token 序列为 \(u=(u_1,\ldots,u_T)\)，当前策略 log-likelihood 写作：

$$
\mu_\theta(Y_s\mid x)=\sum_{t=1}^{T}\log p_\theta(u_t\mid x,u_{<t})
$$

以 SFT 模型作为固定 reference，preferred 与 rejected 的参考校正优势为：

$$
\Delta_\theta=
\big[\mu_\theta(Y_s^+\mid x)-\mu_{\mathrm{SFT}}(Y_s^+\mid x)\big]
-
\big[\mu_\theta(Y_s^-\mid x)-\mu_{\mathrm{SFT}}(Y_s^-\mid x)\big]
$$

对应偏好损失为 \(\mathcal{L}_{\mathrm{pref}}(\theta)=-\log\sigma(\beta\Delta_\theta)\)。这一步鼓励策略相对 SFT reference 更偏好正确结构，但单独使用仍可能出现 token erosion，因此 TAB-PO 在 preferred completion 上额外加入置信度门控屏障。

屏障项只在当前策略对 preferred token 低置信时激活。对 preferred token \(u_t^+\)，定义门控：

$$
g_t^\theta(x,u^+)=\mathbf{1}\{p_\theta(u_t^+\mid x,u_{<t}^+)<\tau\}
$$

preferred-token 的 supervised 锚定损失为 \(\ell_t^+(\theta)=-\log p_\theta(u_t^+\mid x,u_{<t}^+)\)，于是 barrier regularizer 为：

$$
\mathcal{L}_{\mathrm{barrier}}(\theta)=
\mathbb{E}_{\mathcal{D}_{\mathrm{pref}}}
\left[
\frac{\sum_{t=1}^{T^+} g_t^\theta(x,u^+)\ell_t^+(\theta)}
{\max(1,\sum_{t=1}^{T^+}g_t^\theta(x,u^+))}
\right]
$$

最终目标是：

$$
\mathcal{L}_{\mathrm{TAB\text{-}PO}}(\theta)=
\mathcal{L}_{\mathrm{pref}}(\theta)+\lambda\mathcal{L}_{\mathrm{barrier}}(\theta)
$$

这个设计的关键直觉是：confident token 继续由 preference loss 推动区分 preferred/rejected；低置信 preferred token 则被 SFT likelihood 拉回安全区间，避免正确但罕见的本体标签被牺牲。由于门控在每个 forward pass 内作为固定 mask 处理，梯度只通过 \(\ell_t^+\) 回传，屏障行为像一个局部修复项，而不是把整个 completion 重新做 SFT。

```python
# TAB-PO 简化伪代码
sft_model = freeze(theta_sft)
policy = init_from(theta_sft)
confusions = build_confusion_table(sft_validation_errors, expert_ambiguities)

for x, gold_struct in gold_records:
    y_pos = serialize(gold_struct)
    y_neg = make_schema_valid_negative(gold_struct, confusions)
    add_preference_pair(x, y_pos, y_neg)

for batch in preference_pairs:
    mu_pos = logprob(policy, batch.y_pos, batch.x)
    mu_neg = logprob(policy, batch.y_neg, batch.x)
    ref_pos = logprob(sft_model, batch.y_pos, batch.x)
    ref_neg = logprob(sft_model, batch.y_neg, batch.x)

    delta = (mu_pos - ref_pos) - (mu_neg - ref_neg)
    loss_pref = -logsigmoid(beta * delta)

    probs = token_probs(policy, batch.y_pos, batch.x)
    gate = (probs < tau).detach()
    token_nll = -log_token_probs(policy, batch.y_pos, batch.x)
    loss_barrier = (gate * token_nll).sum() / max(1, gate.sum())

    loss = loss_pref + lambda_barrier * loss_barrier
    update(policy, loss)
```

> 💡 关键：TAB-PO 的“token 自适应”不等于给所有 token 加权，而是只在 preferred token 低于置信阈值时启动屏障；这使它能保护语义标签、span、关系边等少数关键 token，同时不把 JSON 模板 token 当作同等重要的学习对象。

与 TDPO 等 token-level preference 方法相比，TAB-PO 的特殊性在于任务假设更强：输出是 ontology-constrained structured object，负例可以通过真实混淆表和专家规则构造，并且 preferred/rejected 的差异极小。TDPO 更关注 token 级 KL 分解和一般对齐稳定性，TI-DPO 等方法从模型归因推断 token 重要性；TAB-PO 则直接利用结构化任务中已知的 gold record、schema、relation rule 和错误混淆，显式把 preference signal 对准结构正确性的决策 token。

从训练流程看，TAB-PO 是 post-SFT 阶段，不需要在线 rollout、reward model 或 verifier。先用 prompt engineering 和 SFT 获得 schema-valid 输出能力，再从 SFT 的 residual errors 中生成 preference triples，最后用 \(\mathcal{L}_{\mathrm{pref}}\) 拉开正确/错误结构的相对 margin，用 \(\mathcal{L}_{\mathrm{barrier}}\) 防止低置信正确 token 被 DPO 更新冲掉。论文的诊断分析显示，TAB-PO 的 barrier activation 更集中在 critical schema tokens，gradient mass 也更偏向 semantic labels、grounded spans、relation labels 和 linking decisions，而不是 JSON scaffolding。

#### 🧪 练习题
```yaml
question: "TAB-PO 中 confidence-gated token barrier 的主要作用是什么？"
options:
  - "对所有 JSON token 施加相同的 SFT 损失，使输出格式更稳定"
  - "只在 preferred token 低置信时施加监督锚定，防止关键正确 token 概率被 DPO 侵蚀"
  - "用 reward model 给每个偏好样本动态调整 beta"
  - "通过采样多个 rollout 估计 group-relative advantage"
answer: 1
explain: "TAB-PO 的屏障项由 token 概率阈值触发，目标是保护低置信的 preferred schema token，同时保留 DPO 的 preferred-over-rejected margin 学习。"
```

### Token级策略优化 (TLPO)

```yaml
id: tlpo
num: 22
name: Token级策略优化 (TLPO)
full_name: Token级策略优化 (TLPO)
year: '2026.04'
org: ''
parent: tdpo
paper_url: https://arxiv.org/abs/2604.26553
project_url: ''
category: token_multimodal
motivation: Token级策略优化缓解语言混淆
```

#### 📝 一句话总结
TLPO 提出在语言混淆发生位置进行 token 级探索与 PPO 式策略更新，只惩罚会诱发错误语言的候选 token，从而缓解多语言 LLM 的 language confusion，同时尽量保留通用任务能力。

#### 🎯 核心要点
- 目标问题是 multilingual LLM 在目标语言提示下混入非目标语言 token，即 language confusion。
- 相比 SFT、DPO、ORPO、GRPO 等序列级方法，TLPO 只在错误位置更新策略，避免把整段正确上下文一起压低。
- 三步流程：检测 confusion point \(c\)，从 \(\pi_\theta(\cdot\mid x,y_{<c})\) 选 Top-N 候选 token，基于短 lookahead 判断候选 token 是否诱发语言混淆并给 reward。
- 使用 probability-ranked exploration，而不是随机采样候选 token；advantage 同时考虑候选 token 原始概率和 centered reward。
- 优化目标借鉴 PPO：候选 token 概率比裁剪、reference KL 正则、token-level advantage 共同约束局部策略更新。
- 实验覆盖 Llama、Qwen、Ministral、Gemma 等多语言模型和中/阿/韩/日等目标语言，评价 Response Pass Rate、Word Pass Rate 与下游任务 accuracy 的权衡。

#### 🔬 深入细节
![TLPO confusion point 检测](https://arxiv.org/html/2604.26553v1/x3.png)
![TLPO 候选 token 探索](https://arxiv.org/html/2604.26553v1/x4.png)
![TLPO advantage 计算](https://arxiv.org/html/2604.26553v1/x5.png)
*图：TLPO Figure 2 的三个阶段，依次是检测混淆点、在该位置取候选 token、为候选 token 计算 reward 和 advantage。*

TLPO 处理的是一个非常局部但常见的多语言对齐问题：模型整体知道如何回答问题，却在某个位置突然生成英语、乌克兰语或其他非目标语言 token。序列级 SFT 或 DPO 会把整段回答当作一个样本优化，虽然能提高语言一致性，但也容易牺牲原有知识和推理能力。TLPO 的基本判断是：如果错误只由少数 token 触发，那么优化也应该只发生在这些 token 的决策边界，而不是惩罚完整 response。

方法首先让当前策略 \(\pi_\theta\) 对 prompt \(x\) 生成 response \(y\)，再检测第一个或关键的 confusion point \(c\)。在这个位置之前的上下文 \((x,y_{<c})\) 被视为有效上下文，TLPO 不改写它；只在该上下文条件下查看 next-token 分布，并选择概率排名最高的 \(N\) 个候选 token：\(\mathcal{T}=\{t_i\}_{i=1}^{N}\)。这种 probability-ranked exploration 避免了大词表随机采样的低效，也使训练集中在模型本来就可能输出的 token 上。

每个候选 token 的 reward \(R(t_i)\) 来自短 lookahead。因为某些文字在 tokenizer 中可能由多个 token 组成，单看当前 token 未必能判断是否产生语言混淆，所以 TLPO 从 \(t_i\) 开始继续自回归生成很短的 \(k\) 个 token，论文实践中设 \(k=3\)，再 detokenize 检查该片段是否包含非目标语言。不会诱发混淆的 token 获得正向 reward，会诱发混淆的 token 获得负向 reward。这样，reward 是 token-conditioned 的局部信号，而不是整段 response 的粗粒度评分。

TLPO 先给出 token-level expected reward 目标：

$$
J_{\mathrm{TLPO}}(\theta)=
\mathbb{E}_{x\sim D, y\sim\pi_\theta(\cdot\mid x)}
\left[\frac{1}{N}\sum_{t_i\in\mathcal{T}}R(t_i)\right]
$$

实际优化时改写为 PPO 式 clipped objective。设候选 token 由旧策略 \(\pi_{\theta_{old}}\) 选出，概率比为
\(r_i(\theta)=\frac{\pi_\theta(t_i\mid x,y_{<c})}{\pi_{\theta_{old}}(t_i\mid x,y_{<c})}\)，则：

$$
J_{\mathrm{TLPO}}(\theta)=
\mathbb{E}\left[
\frac{1}{N}\sum_{t_i\in\mathcal{T}}
\left(
\min\left(r_i(\theta)A_i,\operatorname{clip}(r_i(\theta),1-\epsilon,1+\epsilon)A_i\right)
-\beta D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\theta_{ref}})
\right)
\right]
$$

advantage 不是简单的 \(R(t_i)-\bar{R}\)，而是乘上旧策略下的候选 token 概率：

$$
A_i=\frac{1}{Z}\pi_{\theta_{old}}(t_i\mid x,y_{<c})\big(R(t_i)-\mu\big)
$$

其中 \(\mu\) 是候选集合内的 probability-weighted average reward，\(Z\) 用于归一化，使所有候选 token 的 advantage 绝对值和保持稳定。这个设计有一个重要直觉：TLPO 想压低错误语言 token，但不希望把原模型已经学到的合理 token 排序彻底打乱。因此，高概率且有害的 token 会受到更强负 advantage；高概率且有效的 token 会被保留或增强；低概率 token 即便 reward 极端，也不会主导更新。

```python
# TLPO Algorithm 1 的简化伪代码
policy = init_from(reference_policy)

for step in range(M):
    batch = sample_prompts(D)
    local_training_items = []

    for x in batch:
        y = sample(policy, x)
        c = detect_confusion_point(y, target_language=x.target_language)
        if c is None:
            continue

        prefix = y[:c]
        T = top_n_tokens(policy.next_token_dist(x, prefix), N)
        rewards = []
        for t in T:
            lookahead = rollout(policy, x, prefix + [t], k=3)
            rewards.append(language_reward(t, lookahead, target_language=x.target_language))
        local_training_items.append((x, prefix, T, rewards))

    old_policy = freeze_copy(policy)
    for _ in range(p):
        objective = compute_tlpo_objective(policy, old_policy, reference_policy, local_training_items)
        policy.gradient_ascent(objective, lr=alpha)
```

> ⚠️ 注意：TLPO 的“token 级”不是把完整序列 loss 拆到每个 token，而是只对检测到的 confusion point 生成候选 token 集合，并只对这个局部决策点计算 reward、advantage 与 PPO 裁剪更新。

与 DPO/ORPO 的区别在于 credit assignment。DPO 需要 chosen/rejected 序列对，优化的是整段回答的相对 likelihood；如果回答只有一个 token 混入错误语言，DPO 仍会影响整段序列概率，可能压低大量本来正确的上下文 token。TLPO 则把问题转化为“在 \(c\) 位置选哪个 token”，通过候选 token reward 直接惩罚错误语言候选，保留周围上下文的生成能力。这也是论文强调它能在提高 Response Pass Rate 的同时减少 accuracy drop 的原因。

KL 项的作用是防止局部更新过度偏离初始 policy。论文采用与 GRPO 类似的无偏 KL 估计形式，对候选 token 位置计算 \(D_{\mathrm{KL}}(\pi_\theta\Vert\pi_{\theta_{ref}})\)，使策略既能压低混淆 token，又不会为了语言一致性把 next-token 分布推到不自然的形状。PPO 的 clip 机制则进一步限制单次更新幅度，避免某些负 reward token 被一次性打到过低概率而影响流畅性。

实验上，TLPO 的主指标不是单一 accuracy，而是语言一致性与能力保留的 Pareto 权衡。论文报告 Response Pass Rate 和 Word Pass Rate 来衡量回答是否保持目标语言，同时用 MIF、MMMLU、GPQA、ARC-C、BBH、MATH、GSM8K 等任务检查通用能力。在 English 作为 neutral category 的设定下，TLPO 在平均 RPR/WPR 上超过基线和 DPO/ORPO，同时平均 accuracy 接近原始模型；在更严格的 English 也算 confusion 的设定下，TLPO 仍取得最高平均 RPR，说明局部 token 更新比序列级强约束更稳。

#### 🧪 练习题
```yaml
question: "TLPO 为什么要使用短 lookahead 来评估候选 token 的 reward？"
options:
  - "因为 PPO 只能处理固定长度为 3 的 rollout"
  - "因为一个可读字符或语言片段可能由多个 tokenizer token 构成，单个 token 不足以判断语言混淆"
  - "因为 lookahead 可以替代 reference KL 项"
  - "因为 TLPO 需要生成完整回答后才能计算序列级 DPO loss"
answer: 1
explain: "论文用短 lookahead 解码候选 token 后续片段，再判断是否出现非目标语言，从而得到局部 token reward。"
```

### 多模态DPO (MM-DPO)

```yaml
id: mm_dpo
num: 23
name: 多模态DPO (MM-DPO)
full_name: 多模态DPO (MM-DPO)
year: '2026'
org: ''
parent: dpo
paper_url: https://mm-rlhf.github.io/
project_url: ''
category: token_multimodal
motivation: 动态奖励缩放多模态对齐
```

#### 📝 一句话总结
MM-DPO 将高质量多模态 reward model 的 reward margin 注入 DPO，把每个偏好对的更新强度动态缩放，从而让清晰、高置信的人类偏好样本对 MLLM 对齐产生更大影响，并降低低置信或噪声 pair 的训练干扰。

#### 🎯 核心要点
- MM-DPO 是 MM-RLHF 项目中的多模态对齐算法，建立在 120K 级人工标注多模态偏好比较数据和 critique-based reward model 之上。
- 相比传统 DPO 对所有 preference pairs 使用固定 \(\beta\)，MM-DPO 根据 reward margin \(\delta=r(y_w)-r(y_l)\) 动态调整更新强度。
- 对同一 query 的多个 ranked responses，MM-DPO 不只训练 hardest pair，而是枚举所有 rank 不同的有效比较对，保留更完整的排序信息。
- Dynamic Reward Scaling 使用有界函数把 reward margin 映射到 \([\beta_{ori},(1+w)\beta_{ori}]\)，避免高 margin 样本造成过激更新。
- 训练依赖 MM-RLHF-Reward-7B 提供可靠 reward signal；论文指出公开模型在该数据上的打分质量不足，直接用弱 reward 会影响动态缩放稳定性。
- 实验覆盖 10 个评估维度和 27 个 benchmark，项目页还提供 MM-RLHF-RewardBench 与 MM-RLHF-SafeBench 来评估 reward model 和安全对齐。

#### 🔬 深入细节
![MM-DPO 动态奖励缩放框架](https://mm-rlhf.github.io/static/images/mm_dpo.png)
*图：MM-DPO framework。Reward model 对 preferred/rejected response 打分，reward margin 控制 DPO 中的动态缩放项，使高置信 pair 获得更大更新强度。*

MM-DPO 的背景是多模态 LLM 对齐数据与 reward signal 的质量差异很大。同一个图像或视频 query 往往有多个模型回答，人工标注会给出排序、打分和原因。如果只取最难的 pair，很多有用的 ranking 信息会被丢弃；如果像传统 DPO 一样把所有 pair 等权处理，rank 差距很小、reward margin 很低的样本会和 rank 差距很大的高置信样本产生同样更新强度，训练效率和鲁棒性都会受影响。

MM-RLHF 项目先构造了大规模多模态偏好数据：从千万级多模态 instruction 来源中聚类、去重、采样，再用 GPT-4o、Qwen2-VL-72B 等强模型生成候选回答，最后由人工进行分数、排序和文本解释标注。为了让 reward signal 更可解释，论文训练了 critique-based reward model：模型先生成对回答的 critique，再基于 critique 给分。这一点很重要，因为 MM-DPO 的动态缩放直接依赖 reward margin；如果 reward model 自身排序不可靠，动态 \(\beta\) 会放大错误信号。

传统 DPO 的 pairwise loss 可以写作：

$$
\ell_{\mathrm{DPO}}(\theta)=
-\log\sigma\left(
\beta\left[
\log\frac{\pi_\theta(y_w\mid x)}{\pi_{ref}(y_w\mid x)}
-
\log\frac{\pi_\theta(y_l\mid x)}{\pi_{ref}(y_l\mid x)}
\right]
\right)
$$

其中 \(y_w\) 是 preferred response，\(y_l\) 是 rejected response，\(\beta\) 控制偏好 margin 的更新强度。传统 DPO 使用全局固定 \(\beta\)，默认所有 pair 的偏好确定性相同。MM-DPO 将 reward model 分数引入这个位置，先计算：

$$
\delta=r(y_w)-r(y_l)
$$

再用有界动态缩放函数：

$$
\beta(\delta)=\beta_{ori}\left(1+w(1-e^{-k\delta})\right)
$$

其中 \(k\) 控制 reward margin 到 scaling factor 的敏感度，\(w\) 控制动态修正强度。由于 \(1-e^{-k\delta}\in[0,1]\)，\(\beta(\delta)\) 被限制在 \([\beta_{ori},(1+w)\beta_{ori}]\)。直觉上，\(\delta\) 越大，reward model 越确信 \(y_w\) 明显优于 \(y_l\)，DPO 更新就应该更强；\(\delta\) 很小时，pair 可能只是细微差异或存在标注/模型不确定性，更新强度就接近默认值。

```python
# MM-DPO 动态奖励缩放伪代码
policy = init_from(sft_model)
reference = freeze_copy(sft_model)
reward_model = load_mm_rlhf_reward_7b()

for batch in mm_rlhf_queries:
    pairs = []
    for x, ranked_responses in batch:
        for y_w, y_l in all_pairs_with_different_rank(ranked_responses):
            score_w = reward_model.score(x, y_w)
            score_l = reward_model.score(x, y_l)
            delta = score_w - score_l
            beta_delta = beta_ori * (1 + w * (1 - exp(-k * delta)))
            beta_delta = clip(beta_delta, beta_ori, (1 + w) * beta_ori)
            pairs.append((x, y_w, y_l, beta_delta))

    loss = 0
    for x, y_w, y_l, beta_delta in pairs:
        margin = logprob(policy, y_w, x) - logprob(reference, y_w, x)
        margin -= logprob(policy, y_l, x) - logprob(reference, y_l, x)
        loss += -logsigmoid(beta_delta * margin)

    loss += lambda_sft * supervised_loss(policy, batch)
    update(policy, loss)
```

> 💡 关键：MM-DPO 不是替换 DPO 的 pairwise logistic 形式，而是替换固定 \(\beta\) 的假设。它把“这个偏好对有多可信、多值得学习”编码进 \(\beta(\delta)\)，让 reward margin 成为样本级训练强度。

与普通文本 DPO 相比，多模态场景的难点在于 response 质量维度更多，包括视觉感知、OCR、图表理解、视频理解、事实性、帮助性和安全性等。一个 response 可能在文本流畅性上很好，却在图像证据上犯错；另一个 response 可能短但更忠实。MM-RLHF 的 critique-based reward model 试图把这些细粒度评价转化为可用于训练的标量分数，并通过解释提升 reward 的可学习性。MM-DPO 则把这些分数差用于调节优化强度，而不是简单丢给 DPO 等权训练。

枚举所有有效比较对是 MM-DPO 的另一个关键点。假设一个 query 有四个回答，人工排序为 \(1>2>3>4\)，传统做法可能只选 \((1,4)\) 或若干 hardest pairs。MM-DPO 会把所有 rank 不同的组合都作为偏好 pair，这能让模型学习更完整的排序结构。不过，这也会引入大量小 margin pair，例如 \((2,3)\) 或 \((3,4)\)。动态奖励缩放正是为了解决这个副作用：大 margin pair 强更新，小 margin pair 弱更新，所有 pair 都能参与训练但不会等权噪声化。

论文附录还说明了实现稳定性：MM-DPO 训练中加入 SFT loss 作为常见稳定项，通过网格搜索选择 SFT loss 权重和学习率；视觉编码器保持冻结以稳定且高效训练；初始 \(\beta_{ori}\) 设置为较小默认值 0.1，因为训练中会动态调整。超参数 \(k\) 和 \(w\) 分别控制 reward margin 映射速度和动态修正幅度，默认 \(w=0.5,k=0.5\) 表现较好。这样做的目标是避免 outlier reward margin 导致 \(\beta\) 过大，从而维持训练稳定。

从结果解释看，MM-DPO 的贡献不只是“多模态版 DPO”。如果只把 MM-RLHF 数据配合传统 DPO 使用，模型已经能获得一定提升；如果再用隐式 reward 或不可靠动态策略，提升可能不稳定。MM-DPO 的有效性来自三者组合：高质量人工偏好数据提供比较对，critique-based reward model 提供可信 margin，bounded dynamic scaling 把 margin 转换成稳定的样本级学习率。项目页展示了对 conversation、hallucination、general、chart、OCR、math、multi-image、video、real-world 和 safety 等维度的广泛提升，并强调安全相关 unsafe behavior 明显下降。

#### 🧪 练习题
```yaml
question: "MM-DPO 中 Dynamic Reward Scaling 的核心目的是什么？"
options:
  - "根据 reward margin 调整每个偏好对的 DPO 更新强度，让高置信 pair 影响更大"
  - "用 reward model 直接替代语言模型生成最终答案"
  - "只保留 hardest pair，删除所有低 margin pair"
  - "把视觉编码器也纳入强化学习在线 rollout"
answer: 0
explain: "MM-DPO 先用 reward model 计算 preferred 与 rejected 的分数差，再把该 margin 映射成有界的动态 beta，用于调节 DPO loss。"
```

### 乐观Nash策略优化 (ONPO)

```yaml
id: onpo
num: 24
name: 乐观Nash策略优化 (ONPO)
full_name: 乐观Nash策略优化 (ONPO)
year: '2026'
org: ''
parent: dpo
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/eab6ea376caf12d786adbb0a090fb842-Abstract-Conference.html
project_url: ''
category: direct_preference
motivation: 乐观Nash策略在线对齐
```

#### 📝 一句话总结
ONPO 将 LLM 偏好对齐从 Bradley-Terry 标量奖励建模改写为一般偏好下的双人零和博弈，并用乐观在线镜像下降在自博弈中近似 Nash policy。它解决了传统奖励模型难以表达非传递/群体异质偏好的问题，同时把平均策略 duality gap 从常规自博弈 O(T^{-1/2}) 改进到 O(T^{-1})。

#### 🎯 核心要点
- 放弃 BT 模型假设，不再要求存在全局标量奖励函数 \(R^*(x,y)\)，而是直接使用二元偏好 oracle \(P(y_1 \succ y_2\mid x)\)
- 将偏好对齐定义为双人零和博弈：一个策略生成响应，另一个策略作为对手响应，收益是前者相对后者的期望胜率
- Nash policy 的目标是对任意对手至少不输，即在对称博弈中达到约 50% 的均衡胜率
- 使用 duality gap 衡量策略距离 Nash 均衡的程度，而不是只看单个 reward model 分数
- 在普通在线镜像下降基础上加入 optimistic predictor \(m_t=r_{t-1}\)，通过两步更新显式利用自博弈相邻轮次变化较小的结构
- 理论上证明平均策略的 duality gap 达到 \(O(T^{-1})\)，优于普通 OMD/INPO 类方法的 \(O(T^{-1/2})\)
- 实现上不需要显式估计整条策略分布上的 \(r_t(y)=P(y\succ\pi_t)\)，而是把在线采样响应对转成偏好数据集并最小化平方型直接偏好损失
- 实验主要在 AlpacaEval 2.0、Arena-Hard、MT-Bench 及通用能力基准上比较在线 DPO、SPPO、INPO 等方法

#### 🔬 深入细节
![ONPO 论文 Figure 1：学习率敏感性实验（NeurIPS 官方 PDF 原文）](https://proceedings.neurips.cc/paper_files/paper/2025/file/eab6ea376caf12d786adbb0a090fb842-Paper-Conference.pdf)
*图：ONPO 论文没有给出单独的架构总览图；官方 PDF 中的 Figure 1 展示学习率 \(\eta\) 变化下 ONPO 在 Arena-Hard 与 AlpacaEval 2.0 上的稳健性。方法流程可概括为“当前策略采样响应对 → 偏好 oracle 比较 → 更新辅助策略 \(\pi'_t\) → 乐观更新主策略 \(\pi_t\)”。*

```python
# ONPO 高层伪代码：用乐观 OMD 做在线 Nash 偏好对齐
initialize pi_prime = pi_sft          # auxiliary policy pi'_1
initialize pi = pi_sft                # policy pi_1

for t in range(1, T):
    # 1. 从当前策略采样成对回答，而不是训练单独 reward model
    pairs = sample_response_pairs(policy=pi, prompts=batch_prompts)

    # 2. 偏好 oracle / preference model 只返回二元偏好，形成 (winner, loser)
    D_t = []
    for y1, y2 in pairs:
        yw, yl = preference_oracle.compare(y1, y2)
        D_t.append((yw, yl))

    # 3. 先用本轮真实偏好更新 auxiliary policy pi'_{t+1}
    pi_prime_next = argmin_policy(
        mean((g_t(policy, yw, yl, anchor=pi_prime) - eta / 2) ** 2 for yw, yl in D_t)
    )

    # 4. 再用 pi'_{t+1} 作为近端锚点更新主策略 pi_{t+1}
    pi_next = argmin_policy(
        mean((g_next(policy, yw, yl, anchor=pi_prime_next) - eta / 2) ** 2 for yw, yl in D_t)
    )

    pi_prime, pi = pi_prime_next, pi_next

return pi  # 论文实现输出最后一轮策略 pi_T
```

ONPO 的出发点是：人类偏好未必能被一个标量奖励函数完整表示。BT 模型默认某个响应 \(y\) 有潜在奖励 \(R^*(x,y)\)，两两偏好由奖励差决定；这会隐含偏好传递性。但真实偏好可能存在循环，例如群体 A 偏好简洁、群体 B 偏好详细、群体 C 偏好安全保守，聚合后未必存在一个单调排序。ONPO 因此直接定义一般偏好 oracle：

$$
z \sim \mathrm{Ber}\left(P(y_1 \succ y_2\mid x)\right),
$$

其中 \(z=1\) 表示 \(y_1\) 优于 \(y_2\)。这一步把偏好学习从“给每个回答打分”改成“比较两个策略产出的回答”，为 Nash 学习提供了博弈视角。

在博弈形式中，两个策略 \(\pi_1,\pi_2\) 分别从同一个 prompt \(x\) 下采样回答，第一方收益定义为期望胜率：

$$
J(\pi_1,\pi_2)=\mathbb{E}_{x\sim d,\,y_1\sim\pi_1(\cdot\mid x),\,y_2\sim\pi_2(\cdot\mid x)}\left[P(y_1\succ y_2\mid x)\right].
$$

由于这是对称零和式比较，Nash policy \(\pi^*\) 的直觉是“任何其他策略都不能稳定击败它”。论文用 duality gap 度量近似程度：

$$
\mathrm{DualGap}(\pi)=\max_{\pi_1}J(\pi_1,\pi)-\min_{\pi_2}J(\pi,\pi_2).
$$

当 duality gap 为 0 时，策略达到 Nash 均衡；当它小于 \(\epsilon\) 时，可以称为 \(\epsilon\)-approximate Nash policy。

普通自博弈 OMD 的更新是让下一轮策略在“赢过当前策略”的收益和 KL 近端稳定性之间折中：

$$
\pi_{t+1}=\arg\max_\pi \langle \pi,r_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi_t),
$$

其中 \(r_t(y)=\mathbb{E}_{y'\sim\pi_t}[P(y\succ y')]\)。ONPO 的关键变化是把 optimistic OMD 引入这个自博弈过程：

$$
\pi_t=\arg\max_\pi \langle \pi,m_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi'_t),
$$

$$
\pi'_{t+1}=\arg\max_\pi \langle \pi,r_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi'_t).
$$

这里 \(m_t\) 是对本轮收益的预测。论文利用相邻策略变化小这一事实，直接取 \(m_t=r_{t-1}\)。直觉上，普通 OMD 是“看到本轮反馈后再走一步”，而乐观 OMD 是“先按上一轮反馈预测走一步，再用真实反馈校正辅助点”。在自博弈中，收益变化项 \(\lVert r_t-r_{t-1}\rVert_\infty^2\) 会被策略稳定项抵消，因此得到更快的 \(O(T^{-1})\) duality-gap 界。

工程实现的难点是 \(r_t(y)=P(y\succ\pi_t)\) 需要对整条策略分布求期望，直接估计昂贵。ONPO 通过闭式解的 log-ratio 条件把它改写成偏好对上的监督损失。令

$$
g_t(\pi,y,y')=\log\frac{\pi(y)}{\pi(y')}-\log\frac{\pi'_t(y)}{\pi'_t(y')},
$$

则可在采样得到的 winner/loser 数据 \((y_w,y_l)\sim D_t\) 上优化：

$$
\mathcal{L}_t(\pi)=\mathbb{E}_{(y_w,y_l)\sim D_t}\left[\left(g_t(\pi,y_w,y_l)-\frac{\eta}{2}\right)^2\right].
$$

这使 ONPO 与 DPO 类方法一样可以用常规语言模型 log-prob 训练，但数据是在线自博弈产生的，优化目标又来自 Nash/optimistic OMD。它和 DPO 的根本区别是：DPO 仍围绕固定偏好数据和隐式 BT reward 推导；ONPO 直接追求一般偏好博弈的均衡策略，尤其适合偏好非传递、偏好多群体混合或奖励模型排序不稳定的场景。

> 💡 关键：ONPO 的“乐观”不是更大的步长，而是把上一轮自博弈收益当作本轮预测器，使策略更新能利用博弈序列的平滑性；KL 项仍然用于近端稳定，但不再把目标函数本身改成 KL-regularized game。

#### 🧪 练习题
```yaml
question: "ONPO 相比普通自博弈 OMD 的核心改进是什么？"
options:
  - "把二元偏好重新拟合成单个 Bradley-Terry 奖励模型"
  - "用上一轮收益作为 optimistic predictor，并采用两步镜像下降更新"
  - "只在离线偏好数据上训练，不再进行在线采样"
  - "删除所有 KL 近端项以扩大策略更新幅度"
answer: 1
explain: "ONPO 的关键是 optimistic OMD：先用预测收益更新主策略，再用真实收益更新辅助策略，从而在自博弈中获得更快的 duality-gap 收敛。"
```
