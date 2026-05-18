---
domain: llm
topic_id: llm_rl
topic_name: LLM强化学习
page_icon: "\U0001F3AF"
page_title: LLM强化学习算法演进
page_subtitle: '{build_date} 版'
page_desc: 从PPO到RLHF、DPO、GRPO再到2026年最新VAPO等算法的完整演化图谱，涵盖策略梯度、偏好优化、在线强化学习三大技术路线
hero_pills:
- "\U0001F3F7️ RLHF · Policy Optimization · Preference Learning · Reasoning RL"
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基算法
    color: '#3B82F6'
  rlhf:
    label: 人类反馈强化学习
    color: '#10B981'
  preference:
    label: 偏好优化
    color: '#8B5CF6'
  online_rl:
    label: 在线强化学习
    color: '#F59E0B'
  frontier_2026:
    label: 2026前沿
    color: '#EF4444'
---

## 领域综述

### 一、从传统策略梯度到 LLM 强化学习

LLM 强化学习的底层仍然继承自经典强化学习的三件套：**策略模型、奖励信号、轨迹优化**。不同之处在于，语言模型的“动作”不再是低维连续控制，而是高维离散 token 生成；“状态”也不再是外部环境观测，而是不断增长的上下文序列。因此，传统 RL 中关于策略梯度、优势函数、价值估计和信用分配的问题，在 LLM 场景里都被重新放大了。

从 `REINFORCE → TRPO → PPO` 的路线，本质上是在回答同一个问题：**如何在保证训练稳定的前提下，提高策略更新效率**。这条路线后来成为 RLHF 的基础，因为它天然适合把“整段回答得到一个总体奖励”的场景映射成策略优化问题。

> 参考综述：[*LLM中的强化学习方法：人人都能看懂的RL理论*](https://zhuanlan.zhihu.com/p/1967567827276895446)

### 二、RLHF 为什么以 PPO 为起点

在大模型对齐早期，`PPO` 之所以成为主流，不只是因为它“经典”，更因为它在工程上平衡了三件事：

- **稳定性**：裁剪目标函数限制新旧策略偏移，避免大模型在单步更新中崩掉。
- **可控性**：通过 `Reference Model + KL` 约束，使策略优化不会偏离监督微调模型太远。
- **可分工训练**：`Policy / Value / Reward / Reference` 四类角色清晰，便于在 RLHF 流水线中拆分实现。

这也解释了为什么 `InstructGPT` 之后，大量工作都围绕“保留 PPO 的稳定性，但减轻其复杂度和成本”展开。LLM 的训练代价远高于传统 RL，任何多一个模型、多一轮 rollout、多一次反向传播，都会被放大成显著的工程负担。

### 三、领域主线：简化训练与强化对齐

结合这篇综述与当前算法谱系，LLM-RL 基本围绕两条主线展开：

- **简化训练链路**：减少 Value Model、减少在线采样成本、减少对昂贵奖励模型的依赖，使算法更适合大模型训练。
- **强化对齐效果**：把传统 RL 更精细地适配到语言生成、偏好学习、推理轨迹和长回答优化中，降低 sequence-level 奖励错配带来的方差与偏差。

在这两条主线下，领域逐渐分化出三大族系：

- **经典在线策略优化**：`PPO / ReMax / GRPO / DAPO / VAPO`
- **偏好优化**：`DPO / IPO / KTO / ORPO / SimPO`
- **推理与鲁棒性增强**：`Dr.GRPO / Reinforce++ / OAPL / WDPO / MoDPO`

它们共享的目标不是单纯“让回答更像人类喜欢”，而是逐步把优化对象从**静态偏好**推进到**可验证推理质量、长链决策质量与训练稳健性**。

### 四、从 RLHF 到 Reasoning RL 的演进

2024 年之后，领域重心明显从“把模型训得能对齐”转向“把模型训得能稳定推理”。这也是 `GRPO` 一类方法迅速流行的原因：在数学推理、代码、可验证问答等任务里，奖励往往更接近**结果可检验**而不是**偏好打分**，于是训练目标开始从传统 RLHF 转向 reasoning RL。

这带来两个直接变化：

- 算法更加关注**长回答内部的信用分配**，不再满足于只在整段输出末尾给一个总奖励。
- 训练更加关注**低成本扩展性**，因为 reasoning 场景需要更长 rollout、更高采样量和更频繁的在线更新。

因此，今天看 LLM-RL，不能只把它理解成“PPO + 奖励模型”。它已经演进成一个横跨**偏好学习、在线强化学习、推理优化、鲁棒训练**的完整算法家族。

## 最新进展综述

### 一、范式边界正在从 RLHF 扩展到 Agentic RL

最新一波综述最重要的判断是：传统 `RLHF / DPO` 更适合描述**单轮文本生成的对齐问题**，而越来越多真实系统面对的是**多步交互、部分可观测、带工具与环境反馈的智能体问题**。这意味着底层建模正在从“单步 MDP”转向“长程 POMDP”。

在这个新范式里，优化对象不再只是“最终回答是否被偏好”，而是**整个交互轨迹的策略质量**：何时规划、何时调用工具、如何利用记忆、如何根据环境反馈自我修正。

> 参考综述：[*面向LLM Agent强化学习（Agentic RL）综述*](https://zhuanlan.zhihu.com/p/2032098279991808634)

### 二、强化学习开始直接塑造六类智能体能力

这篇新综述把 Agentic RL 的核心能力归纳成六类：**规划、工具使用、记忆、自我改进、推理、感知**。其中最有代表性的变化有三点：

- **规划**：RL 不再只优化回答偏好，而是优化多步任务分解、树搜索引导和长期决策鲁棒性。
- **工具使用**：RL 开始决定“何时用、用什么、怎么组合、失败后如何恢复”，让工具调用从格式模仿升级为策略选择。
- **记忆与自我改进**：记忆写入、检索、压缩、遗忘开始成为可学习策略；反思与自博弈也从一次性提示技巧，走向可参数化、可迭代的持续改进机制。

这说明“最新进展”已经不只是新 loss function，而是在重新定义 LLM 强化学习的任务边界。

### 三、PPO / DPO / GRPO 正在从算法本体变成优化壳层

从工程视角看，`PPO / DPO / GRPO` 仍然是主流训练骨架，但它们扮演的角色已经在变化。过去它们更多用于优化**静态文本偏好**；现在它们逐渐成为统一的**策略更新壳层**，上面承载的是更复杂的轨迹数据、过程奖励、工具反馈与环境交互。

因此，最新工作更关心的往往不是“是否使用 PPO 或 DPO”，而是：

- 奖励来自**最终答案、过程监督还是环境回报**；
- rollout 是**单次回答**还是**多步工具链 / 多轮任务轨迹**；
- 优化目标是**对齐偏好**还是**提高规划与推理能力**；
- 训练过程中如何处理**长程信用分配、环境噪声和数据稀缺**。

也正因为如此，LLM-RL 与 Agentic RL 的边界正在变得连续，而不是割裂。

### 四、下一阶段的真正瓶颈

相较于早期“能不能把 PPO 跑起来”，当前领域更现实的瓶颈已经变成：

- **长程信用分配**：多步轨迹里，最终成功究竟该归因于哪一步决策。
- **环境与评测**：很多智能体能力必须放到真实工具链、网页、代码执行或仿真环境里验证，离线 benchmark 不再足够。
- **奖励设计与安全性**：长程任务更容易被 reward hacking、捷径策略和不安全探索影响。
- **训练成本**：Agentic RL 的 rollout 更长、反馈更慢、状态空间更复杂，直接放大了算力与数据压力。

因此，LLM 强化学习的“最新进展”并不是对旧算法的简单修补，而是在向**真正面向智能体的强化学习系统**过渡。

## 算法演化关系

```yaml
nodes:
- id: reinforce
  x: 50
  y: 100
  category: foundation
- id: trpo
  x: 200
  y: 100
  category: foundation
- id: ppo
  x: 350
  y: 100
  category: foundation
- id: instructgpt
  x: 500
  y: 250
  category: rlhf
- id: constitutional_ai
  x: 550
  y: 320
  category: rlhf
- id: rlaif
  x: 650
  y: 320
  category: rlhf
- id: dpo
  x: 600
  y: 400
  category: preference
- id: ipo
  x: 700
  y: 450
  category: preference
- id: kto
  x: 800
  y: 400
  category: preference
- id: orpo
  x: 850
  y: 450
  category: preference
- id: simpo
  x: 900
  y: 400
  category: preference
- id: remax
  x: 700
  y: 550
  category: online_rl
- id: spin
  x: 750
  y: 620
  category: online_rl
- id: grpo
  x: 800
  y: 550
  category: online_rl
- id: dapo
  x: 900
  y: 550
  category: online_rl
- id: vapo
  x: 950
  y: 700
  category: frontier_2026
- id: dr_grpo
  x: 1000
  y: 700
  category: frontier_2026
- id: reinforce_pp
  x: 1050
  y: 700
  category: frontier_2026
- id: oapl
  x: 1100
  y: 700
  category: frontier_2026
- id: wdpo
  x: 1050
  y: 770
  category: frontier_2026
- id: mod_dpo
  x: 1100
  y: 770
  category: frontier_2026
edges:
- from: reinforce
  to: trpo
  label: 信任域约束
- from: trpo
  to: ppo
  label: 裁剪代理目标
- from: ppo
  to: instructgpt
  label: RLHF范式
- from: ppo
  to: remax
  label: 移除Critic
- from: ppo
  to: grpo
  label: 组内相对优势
- from: instructgpt
  to: constitutional_ai
  label: 自我修订
- from: instructgpt
  to: rlaif
  label: AI反馈替代
- from: instructgpt
  to: dpo
  label: 移除奖励模型
- from: instructgpt
  to: spin
  label: 自博弈进化
- from: dpo
  to: ipo
  label: 正则化增强
- from: dpo
  to: kto
  label: 二元信号
- from: dpo
  to: orpo
  label: 移除参考模型
- from: dpo
  to: simpo
  label: 长度归一化
- from: dpo
  to: wdpo
  label: 分布鲁棒性
- from: dpo
  to: mod_dpo
  label: 模态解耦
- from: grpo
  to: dapo
  label: 解耦裁剪
- from: grpo
  to: vapo
  label: 价值预训练
- from: grpo
  to: dr_grpo
  label: 偏差修正
- from: grpo
  to: oapl
  label: 离线策略
- from: remax
  to: reinforce_pp
  label: 全局归一化
milestones:
- ppo
- dpo
- grpo
```

## 核心算法

### REINFORCE

```yaml
id: reinforce
num: 1
name: REINFORCE
full_name: 策略梯度算法 (REINFORCE)
year: '1992'
org: Northeastern University
parent: —
paper_url: https://link.springer.com/article/10.1007/BF00992696
project_url: ''
category: foundation
motivation: 通过轨迹回报直接估计策略梯度
```

#### 📝 一句话总结
REINFORCE 的核心目标是：通过轨迹回报直接估计策略梯度。

#### 🎯 核心要点
- 核心动机：通过轨迹回报直接估计策略梯度
- 代表机构：Northeastern University

#### 🔬 深入细节
通过轨迹回报直接估计策略梯度


### TRPO

```yaml
id: trpo
num: 2
name: TRPO
full_name: 信任域策略优化 (Trust Region Policy Optimization)
year: '2015'
org: UC Berkeley
parent: reinforce
paper_url: https://arxiv.org/abs/1502.05477
project_url: ''
category: foundation
motivation: KL约束信任域保证单调改进
```

#### 📝 一句话总结
TRPO 的核心目标是：KL约束信任域保证单调改进。

#### 🎯 核心要点
- 核心动机：KL约束信任域保证单调改进
- 演化来源：继承或改进自 reinforce
- 代表机构：UC Berkeley

#### 🔬 深入细节
KL约束信任域保证单调改进


### PPO

```yaml
id: ppo
num: 3
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: '2017'
org: OpenAI
parent: trpo
paper_url: https://arxiv.org/abs/1707.06347
project_url: ''
category: foundation
motivation: 裁剪目标函数简化TRPO
```

#### 📝 一句话总结
PPO 的核心目标是：裁剪目标函数简化TRPO。

#### 🎯 核心要点
- 核心动机：裁剪目标函数简化TRPO
- 演化来源：继承或改进自 trpo
- 代表机构：OpenAI

#### 🔬 深入细节
裁剪目标函数简化TRPO


### InstructGPT

```yaml
id: instructgpt
num: 4
name: InstructGPT
full_name: 指令遵循GPT (InstructGPT/RLHF)
year: '2022.03'
org: OpenAI
parent: ppo
paper_url: https://arxiv.org/abs/2203.02155
project_url: ''
category: rlhf
motivation: 首次大规模验证RLHF对齐有效性
```

#### 📝 一句话总结
InstructGPT 的核心目标是：首次大规模验证RLHF对齐有效性。

#### 🎯 核心要点
- 核心动机：首次大规模验证RLHF对齐有效性
- 演化来源：继承或改进自 ppo
- 代表机构：OpenAI

#### 🔬 深入细节
首次大规模验证RLHF对齐有效性


### CAI

```yaml
id: constitutional_ai
num: 5
name: CAI
full_name: 宪法AI (Constitutional AI)
year: '2022.12'
org: Anthropic
parent: instructgpt
paper_url: https://arxiv.org/abs/2212.08073
project_url: ''
category: rlhf
motivation: 基于原则的自我批判与修订
```

#### 📝 一句话总结
CAI 的核心目标是：基于原则的自我批判与修订。

#### 🎯 核心要点
- 核心动机：基于原则的自我批判与修订
- 演化来源：继承或改进自 instructgpt
- 代表机构：Anthropic

#### 🔬 深入细节
基于原则的自我批判与修订


### RLAIF

```yaml
id: rlaif
num: 6
name: RLAIF
full_name: AI反馈强化学习 (RL from AI Feedback)
year: '2023.09'
org: Google
parent: instructgpt
paper_url: https://arxiv.org/abs/2309.00267
project_url: ''
category: rlhf
motivation: AI反馈替代昂贵的人工标注
```

#### 📝 一句话总结
RLAIF 的核心目标是：AI反馈替代昂贵的人工标注。

#### 🎯 核心要点
- 核心动机：AI反馈替代昂贵的人工标注
- 演化来源：继承或改进自 instructgpt
- 代表机构：Google

#### 🔬 深入细节
AI反馈替代昂贵的人工标注


### DPO

```yaml
id: dpo
num: 7
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: '2023.05'
org: Stanford
parent: instructgpt
paper_url: https://arxiv.org/abs/2305.18290
project_url: ''
category: preference
motivation: 无需奖励模型的闭式解对齐
```

#### 📝 一句话总结
DPO 的核心目标是：无需奖励模型的闭式解对齐。

#### 🎯 核心要点
- 核心动机：无需奖励模型的闭式解对齐
- 演化来源：继承或改进自 instructgpt
- 代表机构：Stanford

#### 🔬 深入细节
无需奖励模型的闭式解对齐


### IPO

```yaml
id: ipo
num: 8
name: IPO
full_name: 恒等映射偏好优化 (Identity Preference Optimization)
year: '2023.10'
org: Google DeepMind
parent: dpo
paper_url: https://arxiv.org/abs/2310.12036
project_url: ''
category: preference
motivation: 移除BT假设缓解过拟合
```

#### 📝 一句话总结
IPO 提出了 ΨPO 通用偏好优化框架，统一了 RLHF 和 DPO，并通过将非线性映射 \(\Psi\) 设为恒等函数（identity），推导出无需 Bradley-Terry 奖励模型假设即可直接从 pairwise 偏好数据学习策略的 IPO 算法，从理论上解决了 DPO 因隐式依赖 BT 假设而导致的过拟合问题。

#### 🎯 核心要点
- **ΨPO 统一框架**：提出通用目标函数 \(J_{\Psi PO}(\pi) = \mathbb{E}[\Psi(p^*(y_1 \succ y_2))] \cdot \log \frac{\pi(y_1)}{\pi(y_2)}\)，通过选择不同的 \(\Psi\) 函数统一 RLHF（\(\Psi = \log\frac{q}{1-q}\)）和 IPO（\(\Psi = \text{id}\)）
- **移除 Bradley-Terry 假设**：IPO 直接优化 pairwise 偏好概率，无需将偏好转化为 pointwise 奖励，避免了 BT 模型不成立时的系统性偏差
- **DPO 过拟合的理论分析**：证明 DPO 在确定性偏好（\(p^*=1\)）下无论正则化强度 \(\tau\) 如何，最优策略均退化为确定性策略，完全忽略参考策略 \(\pi_{\text{ref}}\)
- **IPO 损失函数**：采样版 IPO 损失为简洁的 MSE 回归形式 \(\mathbb{E}[(h_\pi(y_w, y_l) - \frac{1}{2\tau})^2]\)，其中 \(h_\pi\) 为策略与参考策略的对数似然比之差
- **唯一全局最优**：Theorem 2 证明在 KL 正则化下 IPO 目标函数存在唯一全局最优策略
- **正则化始终生效**：与 DPO 不同，IPO 通过控制对数似然比的 gap 始终将策略正则化向 \(\pi_{\text{ref}}\)，\(\tau\) 越大正则化越强

#### 🔬 深入细节
![IPO 与 DPO 学习曲线对比](https://arxiv.org/html/2310.12036v1/x2.png)
*图：IPO 与 DPO 在三动作 bandit 设定下的学习曲线对比。DPO 将未观测动作概率压至 0（过拟合），而 IPO 通过 \(\tau\) 控制正则化强度，保持对未观测动作的合理概率分配。*

```python
# Sampled IPO 伪代码 (Algorithm 1)
# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 τ

def h_pi(y_w, y_l, x, pi, pi_ref):
    """计算策略与参考策略的对数似然比之差"""
    return (log(pi(y_w|x)) - log(pi_ref(y_w|x))) - \
           (log(pi(y_l|x)) - log(pi_ref(y_l|x)))

# 从 π = π_ref 开始训练
pi = copy(pi_ref)

for batch in DataLoader(D):
    x, y_w, y_l = batch
    # IPO 损失: MSE 回归到 1/(2τ)
    loss = mean((h_pi(y_w, y_l, x, pi, pi_ref) - 1/(2*tau))**2)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 动机与背景：DPO 的隐含缺陷

RLHF 的标准流程分为两步：(1) 基于 Bradley-Terry 模型从偏好数据训练奖励模型；(2) 用 PPO 等 RL 算法优化策略。DPO 将这两步合并为一步，直接从偏好数据优化策略，避免了 RL 训练的不稳定性。然而，DPO 的推导**本质上仍然依赖 Bradley-Terry 假设**——它假设 pairwise 偏好可以分解为 pointwise 奖励的函数：

$$p^*(y_1 \succ y_2) = \sigma(r^*(y_1) - r^*(y_2))$$

这一假设在现实中常常不成立。人类偏好可能是非传递的（A > B, B > C, 但 C > A），或者无法用单一标量奖励刻画。当 BT 假设不成立时，DPO 会将偏好数据强行拟合到一个不存在的奖励函数上，导致**过拟合到偏好数据的噪声而非真实偏好结构**。

> ⚠️ 注意：DPO 的过拟合不仅是经验现象，而是理论上可证明的。论文 Section 4.2 证明：当偏好为确定性（\(p^*(y_1 \succ y_2) = 1\)）时，DPO 的最优策略为 \(\pi^*(y_1) = 1, \pi^*(y_2) = 0\)，**与正则化强度 \(\tau\) 完全无关**。这意味着 DPO 的 KL 正则化在极端偏好下完全失效。

##### 核心机制一：ΨPO 统一框架

论文首先提出了一个通用的偏好优化目标，称为 ΨPO：

$$J_{\Psi PO}(\pi, \pi_{\text{ref}}) = \underset{\substack{y \sim \mu \\ y' \sim \mu}}{\mathbb{E}} \left[ \Psi(p^*(y \succ y')) \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

其中 \(\Psi: [0,1] \to \mathbb{R}\) 是一个非递减映射函数，\(p^*(y \succ y')\) 是真实偏好概率，\(\mu\) 是采样分布。

**关键洞察**：不同的 \(\Psi\) 选择对应不同的算法：

| \(\Psi\) 选择 | 对应算法 | 含义 |
|---|---|---|
| \(\Psi(q) = \log\frac{q}{1-q}\)（logit 函数） | RLHF / DPO | 将偏好概率映射为 BT 奖励差 |
| \(\Psi(q) = q\)（恒等函数） | **IPO** | 直接使用偏好概率 |

当 \(\Psi\) 为 logit 函数时，\(\Psi(p^*) = \log\frac{p^*}{1-p^*}\)。若 BT 模型成立，则 \(\Psi(p^*) = r^*(y) - r^*(y')\)，ΨPO 退化为标准 RLHF 目标。但当 BT 模型不成立时，logit 映射会放大极端偏好（\(p^* \to 0\) 或 \(p^* \to 1\) 时 logit 趋向 \(\pm\infty\)），导致过拟合。

> 💡 关键：IPO 选择 \(\Psi = \text{identity}\) 的核心原因是**避免 logit 函数在极端偏好处的发散**。恒等映射保持偏好概率的有界性，使正则化始终有效。

##### 核心机制二：IPO 目标函数推导

将 \(\Psi(q) = q\) 代入 ΨPO 框架，IPO 的目标函数为：

$$J_{IPO}(\pi, \pi_{\text{ref}}) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ p^*(y \succ y') \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

加入 KL 正则化后，完整优化问题为：

$$\pi^*_{IPO} = \arg\max_\pi \left\{ J_{IPO}(\pi, \pi_{\text{ref}}) - \tau \cdot \text{KL}(\pi \| \pi_{\text{ref}}) \right\}$$

**Theorem 1**（最优策略的充要条件）：策略 \(\pi^*\) 是 IPO 的最优策略，当且仅当对所有 \(y, y'\)：

$$\log \frac{\pi^*(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi^*(y')}{\pi_{\text{ref}}(y')} = \frac{1}{\tau} \left( p^*(y \succ_\mu y') - p^*(y' \succ_\mu y) \right)$$

其中 \(p^*(y \succ_\mu y') = \mathbb{E}_{y'' \sim \mu}[p^*(y \succ y'')]\) 是对采样分布 \(\mu\) 的边际偏好。

这个条件的直觉是：**最优策略相对于参考策略的对数似然比之差，正比于两个动作的边际偏好差**。正则化参数 \(\tau\) 控制这个比例——\(\tau\) 越小，策略越偏离参考策略以追求偏好；\(\tau\) 越大，策略越接近参考策略。

**Theorem 2**（唯一性）：IPO 的最优策略是唯一的，给出闭式解：

$$\pi^*(y) \propto \pi_{\text{ref}}(y) \cdot \exp\left(\frac{p^*(y \succ_\mu \cdot)}{\tau}\right)$$

##### 核心机制三：从总体损失到采样损失

总体 IPO 损失函数为：

$$\mathcal{L}_{IPO}(\pi) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ \left( h_\pi(y, y') - \frac{p^*(y \succ_\mu \cdot) - p^*(y' \succ_\mu \cdot)}{\tau} \right)^2 \right]$$

其中 \(h_\pi(y, y') = \log\frac{\pi(y)\pi_{\text{ref}}(y')}{\pi(y')\pi_{\text{ref}}(y)}\)。

然而，边际偏好 \(p^*(y \succ_\mu \cdot)\) 在实际中不可直接获取。论文利用偏好对 \((y_w, y_l)\) 的对称性，巧妙推导出**采样版损失**：

$$\mathcal{L}_{IPO}^{\text{sampled}}(\pi) = \underset{(y_w, y_l) \sim D}{\mathbb{E}} \left[ \left( h_\pi(y_w, y_l) - \frac{1}{2\tau} \right)^2 \right]$$

> 💡 关键：采样损失的推导利用了 \(h_\pi(y_w, y_l) + h_\pi(y_l, y_w) = 0\) 的反对称性。将 \((y_w, y_l)\) 视为"偏好标签为 1"的样本，\((y_l, y_w)\) 视为"偏好标签为 0"的样本，两项合并后得到目标值 \(\frac{1}{2\tau}\)。

这个损失函数的物理含义极为清晰：**IPO 将策略与参考策略的对数似然比之差回归到常数 \(\frac{1}{2\tau}\)**。这意味着：
1. 对于每一对 \((y_w, y_l)\)，IPO 要求 \(\pi\) 相对于 \(\pi_{\text{ref}}\) 对 \(y_w\) 的偏好程度恰好为 \(\frac{1}{2\tau}\)
2. \(\tau\) 越小，要求的偏好 gap 越大，策略越偏离参考策略
3. \(\tau\) 越大，要求的偏好 gap 越小，策略越接近参考策略

##### 与 DPO 的关键区别

| 特性 | DPO | IPO |
|---|---|---|
| 偏好模型假设 | 依赖 Bradley-Terry 模型 | 无需 BT 假设，直接使用偏好概率 |
| 损失函数形式 | 交叉熵（logistic loss） | MSE 回归 |
| 正则化行为 | 确定性偏好下 \(\tau\) 失效 | \(\tau\) 始终控制策略与 \(\pi_{\text{ref}}\) 的距离 |
| 极端偏好处理 | logit 发散导致过拟合 | 恒等映射保持有界 |
| 目标值 | 使 \(\sigma(h_\pi) \to 1\)（无上界） | 使 \(h_\pi \to \frac{1}{2\tau}\)（有界目标） |

论文通过三个 bandit 实验验证了上述理论分析：

1. **二动作确定性偏好**（\(\mathcal{D}_1\)）：DPO 收敛到确定性策略 \(\pi(y_1)=1\)，无视 \(\tau\)；IPO 收敛到 \(\pi^*(y_1) = \frac{e^{1/\tau}}{1+e^{1/\tau}}\)，\(\tau\) 有效控制偏好强度
2. **二动作随机偏好**（\(\mathcal{D}_2\)）：DPO 仍然过拟合到采样偏好；IPO 保持稳定
3. **三动作部分观测**（\(\mathcal{D}_3\)）：仅观测 \(y_1 \succ y_2\) 和 \(y_2 \succ y_3\)。DPO 将未直接比较的 \(y_3\) 概率压至 0；IPO 通过 \(\tau\) 合理分配概率

#### 🧪 练习题
```yaml
question: "IPO 采样损失函数中，目标回归值 1/(2τ) 的物理含义是什么？"
options:
  - "偏好对 (y_w, y_l) 的 Bradley-Terry 奖励差"
  - "策略 π 与参考策略 π_ref 的 KL 散度上界"
  - "策略相对于参考策略对 y_w 与 y_l 的对数似然比之差的期望目标"
  - "偏好数据集中 y_w 被选中的经验概率"
answer: 2
explain: "IPO 损失要求 h_π(y_w, y_l) = log(π(y_w)π_ref(y_l)/(π(y_l)π_ref(y_w))) 回归到 1/(2τ)，即控制策略相对于参考策略对优选与劣选响应的对数似然比之差为固定常数，τ 越小目标值越大，策略越偏离参考策略。"
```

### KTO

```yaml
id: kto
num: 9
name: KTO
full_name: 前景理论优化 (Kahneman-Tversky Optimization)
year: '2024.02'
org: Stanford
parent: dpo
paper_url: https://arxiv.org/abs/2402.01306
project_url: ''
category: preference
motivation: 仅需二元信号无需成对数据
```

#### 📝 一句话总结
KTO 的核心目标是：仅需二元信号无需成对数据。

#### 🎯 核心要点
- 核心动机：仅需二元信号无需成对数据
- 演化来源：继承或改进自 dpo
- 代表机构：Stanford

#### 🔬 深入细节
仅需二元信号无需成对数据


### ORPO

```yaml
id: orpo
num: 10
name: ORPO
full_name: 无参考模型偏好优化 (Odds Ratio Preference Optimization)
year: '2024.03'
org: KAIST
parent: dpo
paper_url: https://arxiv.org/abs/2403.07691
project_url: ''
category: preference
motivation: SFT与对齐单阶段整合
```

#### 📝 一句话总结
ORPO 的核心目标是：SFT与对齐单阶段整合。

#### 🎯 核心要点
- 核心动机：SFT与对齐单阶段整合
- 演化来源：继承或改进自 dpo
- 代表机构：KAIST

#### 🔬 深入细节
SFT与对齐单阶段整合


### SimPO

```yaml
id: simpo
num: 11
name: SimPO
full_name: 简单偏好优化 (Simple Preference Optimization)
year: '2024.05'
org: Princeton
parent: dpo
paper_url: https://arxiv.org/abs/2405.14734
project_url: ''
category: preference
motivation: 长度归一化消除长度偏见
```

#### 📝 一句话总结
SimPO 的核心目标是：长度归一化消除长度偏见。

#### 🎯 核心要点
- 核心动机：长度归一化消除长度偏见
- 演化来源：继承或改进自 dpo
- 代表机构：Princeton

#### 🔬 深入细节
长度归一化消除长度偏见


### ReMax

```yaml
id: remax
num: 12
name: ReMax
full_name: 贪心基线强化学习 (REINFORCE with Max Baseline)
year: '2023.10'
org: CUHK / ByteDance
parent: ppo
paper_url: https://arxiv.org/abs/2310.10505
project_url: ''
category: online_rl
motivation: 移除Critic节省50%显存
```

#### 📝 一句话总结
ReMax 的核心目标是：移除Critic节省50%显存。

#### 🎯 核心要点
- 核心动机：移除Critic节省50%显存
- 演化来源：继承或改进自 ppo
- 代表机构：CUHK / ByteDance

#### 🔬 深入细节
移除Critic节省50%显存


### SPIN

```yaml
id: spin
num: 13
name: SPIN
full_name: 自博弈微调 (Self-Play Fine-Tuning)
year: '2024.01'
org: UCLA
parent: instructgpt
paper_url: https://arxiv.org/abs/2401.01335
project_url: ''
category: online_rl
motivation: 新旧模型博弈实现自我进化
```

#### 📝 一句话总结
SPIN 的核心目标是：新旧模型博弈实现自我进化。

#### 🎯 核心要点
- 核心动机：新旧模型博弈实现自我进化
- 演化来源：继承或改进自 instructgpt
- 代表机构：UCLA

#### 🔬 深入细节
新旧模型博弈实现自我进化


### GRPO

```yaml
id: grpo
num: 14
name: GRPO
full_name: 组相对策略优化 (Group Relative Policy Optimization)
year: '2024.02'
org: DeepSeek
parent: ppo
paper_url: https://arxiv.org/abs/2402.03300
project_url: ''
category: online_rl
motivation: 组内相对优势移除Critic
```

#### 📝 一句话总结
GRPO 的核心目标是：组内相对优势移除Critic。

#### 🎯 核心要点
- 核心动机：组内相对优势移除Critic
- 演化来源：继承或改进自 ppo
- 代表机构：DeepSeek

#### 🔬 深入细节
组内相对优势移除Critic


### DAPO

```yaml
id: dapo
num: 15
name: DAPO
full_name: 解耦自适应策略优化 (Decoupled Adaptive Policy Optimization)
year: '2024.03'
org: ByteDance
parent: grpo
paper_url: https://arxiv.org/abs/2503.14476
project_url: ''
category: online_rl
motivation: 解耦裁剪缓解熵崩塌
```

#### 📝 一句话总结
DAPO 的核心目标是：解耦裁剪缓解熵崩塌。

#### 🎯 核心要点
- 核心动机：解耦裁剪缓解熵崩塌
- 演化来源：继承或改进自 grpo
- 代表机构：ByteDance

#### 🔬 深入细节
解耦裁剪缓解熵崩塌


### VAPO

```yaml
id: vapo
num: 16
name: VAPO
full_name: 价值增强策略优化 (Value-Augmented Policy Optimization)
year: '2025.04'
org: ByteDance / Tsinghua
parent: grpo
paper_url: https://arxiv.org/abs/2504.05118
project_url: ''
category: frontier_2026
motivation: 长度自适应GAE解决奖励稀疏
```

#### 📝 一句话总结
VAPO 的核心目标是：长度自适应GAE解决奖励稀疏。

#### 🎯 核心要点
- 核心动机：长度自适应GAE解决奖励稀疏
- 演化来源：继承或改进自 grpo
- 代表机构：ByteDance / Tsinghua

#### 🔬 深入细节
长度自适应GAE解决奖励稀疏


### Dr.GRPO

```yaml
id: dr_grpo
num: 17
name: Dr.GRPO
full_name: 修正版GRPO (GRPO Done Right)
year: '2026'
org: DeepSeek
parent: grpo
paper_url: https://arxiv.org/abs/2503.20783
project_url: ''
category: frontier_2026
motivation: 修正长度与难度偏差
```

#### 📝 一句话总结
Dr.GRPO 的核心目标是：修正长度与难度偏差。

#### 🎯 核心要点
- 核心动机：修正长度与难度偏差
- 演化来源：继承或改进自 grpo
- 代表机构：DeepSeek

#### 🔬 深入细节
修正长度与难度偏差


### REINFORCE++

```yaml
id: reinforce_pp
num: 18
name: REINFORCE++
full_name: 增强版REINFORCE (REINFORCE++)
year: '2026'
org: NVIDIA / OpenRLHF
parent: remax
paper_url: https://arxiv.org/abs/2501.03262
project_url: ''
category: frontier_2026
motivation: 全局优势归一化大规模训练
```

#### 📝 一句话总结
REINFORCE++ 的核心目标是：全局优势归一化大规模训练。

#### 🎯 核心要点
- 核心动机：全局优势归一化大规模训练
- 演化来源：继承或改进自 remax
- 代表机构：NVIDIA / OpenRLHF

#### 🔬 深入细节
全局优势归一化大规模训练


### OAPL

```yaml
id: oapl
num: 19
name: OAPL
full_name: 离线策略滞后学习 (Off-Policy RL with Lagged Inference)
year: '2026.02'
org: MIT
parent: grpo
paper_url: https://arxiv.org/abs/2602.19362
project_url: ''
category: frontier_2026
motivation: 滞后推理解决分布式同步瓶颈
```

#### 📝 一句话总结
OAPL 的核心目标是：滞后推理解决分布式同步瓶颈。

#### 🎯 核心要点
- 核心动机：滞后推理解决分布式同步瓶颈
- 演化来源：继承或改进自 grpo
- 代表机构：MIT

#### 🔬 深入细节
滞后推理解决分布式同步瓶颈


### WDPO

```yaml
id: wdpo
num: 20
name: WDPO
full_name: Wasserstein直接偏好优化 (Wasserstein DPO)
year: '2026'
org: Research
parent: dpo
paper_url: https://arxiv.org/abs/2512.03320
project_url: ''
category: frontier_2026
motivation: Wasserstein距离增强鲁棒性
```

#### 📝 一句话总结
WDPO 的核心目标是：Wasserstein距离增强鲁棒性。

#### 🎯 核心要点
- 核心动机：Wasserstein距离增强鲁棒性
- 演化来源：继承或改进自 dpo
- 代表机构：Research

#### 🔬 深入细节
Wasserstein距离增强鲁棒性


### MoD-DPO

```yaml
id: mod_dpo
num: 21
name: MoD-DPO
full_name: 模态解耦偏好优化 (Modality Decoupled DPO)
year: '2026'
org: Research
parent: dpo
paper_url: https://arxiv.org/abs/2601.01234
project_url: ''
category: frontier_2026
motivation: 跨模态解耦减少幻觉
```

#### 📝 一句话总结
MoD-DPO 的核心目标是：跨模态解耦减少幻觉。

#### 🎯 核心要点
- 核心动机：跨模态解耦减少幻觉
- 演化来源：继承或改进自 dpo
- 代表机构：Research

#### 🔬 深入细节
跨模态解耦减少幻觉
