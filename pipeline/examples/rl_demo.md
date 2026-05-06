---
domain: llm
topic_id: rl_demo
topic_name: 强化学习 Demo (示例编译)

page_icon: "🎯"
page_title: "大模型 RL 算法总结"
page_subtitle: "{build_date} 版"
page_desc: "最小示例文档 —— 用来演示 pipeline 如何把一篇结构化 markdown 文档编译为一个完整的二级标签页。"
hero_pills:
  - "📅 2026 年 3 月"
  - "🏷️ RLVR · Policy Optimization"
count_pill: "{count} 个算法"

image_base: "../../assets/images/rl/大模型 RL 算法总结（2026.03版）  -"

categories:
  foundation:  { label: "奠基算法", color: "#22a06b" }
  core:        { label: "核心改进", color: "#5b63d3" }
  specialized: { label: "特化优化", color: "#e8820c" }
---

## 领域综述

### 一、从 RLHF 到 RLVR：大模型强化学习的范式演进

强化学习（RL）在大语言模型（LLM）训练中的应用经历了三个关键阶段。**第一阶段（2017–2022）** 以 OpenAI 的 PPO 算法为核心，确立了 RLHF 的标准流程：训练奖励模型 → Rollout → 优势估计 → 策略优化。**第二阶段（2023）** 以 DPO 为代表，提出绕过奖励建模的离线偏好优化。**第三阶段（2024 至今）** 由 DeepSeek 的 GRPO 引领，从 RLHF 向 RLVR 范式转变。

### 二、后 GRPO 时代的挑战

GRPO 虽然简化了 PPO 的流程，但自身也暴露出系统性问题：

- **训练稳定性**：存在熵坍塌、梯度消失、截断样本噪声
- **优势估计偏差**：长度归一化与标准差归一化引入偏差
- **长度控制**：模型为获取奖励会生成冗长推理链

### 三、发展趋势

纵观 RLVR 的发展脉络，可以清晰看到几个趋势：从复杂到简洁、从通用到精细、从硬约束到软约束。

## 算法演化关系

```yaml
nodes:
  - { id: ppo,  x: 150, y: 80,  category: foundation }
  - { id: dpo,  x: 60,  y: 220, category: foundation }
  - { id: grpo, x: 330, y: 220, category: core }
  - { id: dapo, x: 240, y: 360, category: specialized }

edges:
  - { from: ppo,  to: dpo,  label: "简化流程" }
  - { from: ppo,  to: grpo, label: "移除 Value Model" }
  - { from: grpo, to: dapo, label: "解决不稳定" }

milestones: [ppo, grpo]
```

## 核心算法

### PPO · 近端策略优化

```yaml
id: ppo
num: 1
name: PPO
full_name: "近端策略优化 (Proximal Policy Optimization)"
year: "2017"
org: OpenAI
parent: "—"
paper_url: "https://arxiv.org/abs/1707.06347"
project_url: "https://openai.com/index/openai-baselines-ppo/"
category: foundation
motivation: "用裁剪目标函数约束策略更新幅度，RLHF 奠基算法"
```

#### 📝 一句话总结
PPO 是 RLHF 的代表算法，核心创新是用裁剪目标函数来约束策略更新幅度，以低成本实现稳定高效的训练。

#### 🎯 核心要点
- 涉及 4 个模型：Policy、Value、Reward、Reference
- 4 个流程：Reward Modeling → Rollout → Evaluation → Optimization
- 裁剪机制限制新旧策略概率比，防止过大更新
- KL 散度约束 Reference 与 Policy 差异

#### 🔬 深入细节

##### PPO 的目标函数

$$J_{PPO}(\theta) = \mathbb{E}\left[\min\left(\frac{\pi_\theta}{\pi_{\text{old}}} A,\; \text{clip}(\cdot, 1-\epsilon, 1+\epsilon) A\right)\right]$$

##### 4 个模型的分工
- **Policy Model**：目标训练模型，执行动作
- **Value Model**：估计状态价值 \(V_t\)，配合 GAE
- **Reward Model**：在 sequence-level 打分
- **Reference Model**：冻结 SFT 模型，KL 约束分布漂移

> 💡 裁剪机制的本质是"信任域"的一阶近似：当 ratio 超出 \([1-\epsilon, 1+\epsilon]\) 时忽略其梯度。

#### 🧪 练习题
```yaml
question: "PPO 中裁剪机制的核心目的是什么？"
options:
  - "加速训练收敛速度"
  - "限制新旧策略的概率比，防止更新幅度过大"
  - "减少 GPU 内存占用"
  - "增加探索多样性"
answer: 1
explain: "裁剪机制限制 ratio 在 [1-ε, 1+ε] 范围内，保证训练稳定性，是 PPO 相比 TRPO 的关键简化。"
```

### DPO · 直接偏好优化

```yaml
id: dpo
num: 2
name: DPO
full_name: "直接偏好优化 (Direct Preference Optimization)"
year: "2023.05"
org: Stanford
parent: PPO
paper_url: "https://arxiv.org/abs/2305.18290"
category: foundation
motivation: "简化 PPO 的 4 模型 4 流程，直接在偏好对上优化"
```

#### 📝 一句话总结
DPO 通过分类损失直接在偏好对上优化策略，绕过奖励建模。

#### 🎯 核心要点
- Reward-Free：绕过奖励建模
- 2 模型：Policy + Reference
- 离线方式，利用预先收集的 pairwise 比较数据
- 参考模型起到隐式奖励函数的作用

#### 🔬 深入细节

$$\mathcal{L}_{\text{DPO}} = -\mathbb{E}\left[\log\sigma\left(\beta\log\frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta\log\frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

对偏好结果 \(y_w\) 提升概率，对非偏好结果 \(y_l\) 降低概率。

### GRPO · 组相对策略优化

```yaml
id: grpo
num: 3
name: GRPO
full_name: "组相对策略优化 (Group Relative Policy Optimization)"
year: "2024.02"
org: DeepSeek
parent: PPO
paper_url: "https://arxiv.org/abs/2402.03300"
project_url: "https://github.com/deepseek-ai/DeepSeek-Math"
category: core
motivation: "移除 Value Model，用 Group 间 reward 比较定义优势值"
```

#### 📝 一句话总结
GRPO 移除 PPO 中的 Value Model，采用组内采样的相对奖励来定义优势函数，显著降低推理开销。

#### 🎯 核心要点
- 移除 Value Model，从 4 模型减至 3 模型
- 对每个问题采样一组输出 \(\{o_1,...,o_G\}\)，组内归一化计算优势
- 优势公式：\(\hat{A}_i = \frac{r_i - \text{mean}}{\text{std}}\)
- 仍保持 PPO 形式的裁剪目标
- 适用于 Solution-Level Reward 场景（如数学推理）

#### 🔬 深入细节

##### 相对 PPO 的核心改动
移除 Value Model，用 Group 间的 reward 比较来定义优势值。

$$\hat{A}_i = \frac{r_i - \text{mean}(\{r_1,\cdots,r_G\})}{\text{std}(\{r_1,\cdots,r_G\})}$$

##### GRPO 目标函数
$$\mathcal{J}_{\text{GRPO}} = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^G\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}\min\left(r_{i,t}\hat{A}_{i,t},\;\text{clip}(r_{i,t}, 1-\epsilon, 1+\epsilon)\hat{A}_{i,t}\right) - \beta\mathbb{D}_{KL}\right]$$

#### 🧪 练习题
```yaml
question: "GRPO 移除 Value Model 后如何估计优势函数？"
options:
  - "使用 GAE"
  - "直接把 reward 当优势"
  - "在 Group 内对 reward 进行归一化：(r - mean) / std"
  - "使用 Monte Carlo 回报估计"
answer: 2
explain: "GRPO 对每个问题采样一组输出，使用组内 mean/std 归一化来估计优势，用 Group 间相对比较替代 Value Model 的绝对估计。"
```

### DAPO · 动态采样策略优化

```yaml
id: dapo
num: 4
name: DAPO
full_name: "动态采样策略优化 (Dynamic Sampling Policy Optimization)"
year: "2025.03"
org: ByteDance
parent: GRPO
paper_url: "https://arxiv.org/abs/2503.14476"
project_url: "https://dapo-sia.github.io/"
category: specialized
motivation: "解决 GRPO 的熵坍塌、梯度消失、截断样本噪声三大问题"
```

#### 📝 一句话总结
DAPO 针对 GRPO 的三大问题提出系统性解决方案：Clip-Higher、动态采样、Token-Level 损失、过长奖励塑造。

#### 🎯 核心要点
- Clip-Higher：不对称截断，提高上界缓解熵坍塌
- Dynamic Sampling：保证每组 reward 不全为 0 或 1
- Token-Level 损失：分母改为所有 token 总数
- Overlong Reward Shaping：过长样本过滤 + 软惩罚
- 消融实验表明每项改进都独立有效

#### 🔬 深入细节

##### GRPO 三大问题
- **熵坍塌**：策略熵训练初期急剧下降
- **梯度消失**：全对/全错组 advantage 为 0
- **截断奖励噪声**：被截断回答本应正确却拿不到奖励

##### DAPO 目标函数
$$\mathcal{J}_{\text{DAPO}} = \mathbb{E}\left[\frac{1}{\sum_i|o_i|}\sum_i\sum_t \min\left(r_{i,t}\hat{A}_{i,t}, \text{clip}(r_{i,t}, 1-\epsilon_{\text{low}}, 1+\epsilon_{\text{high}})\hat{A}_{i,t}\right)\right]$$

> ⚠️ 注意 Clip-Higher 中 \(\epsilon_{\text{high}} > \epsilon_{\text{low}}\)，这是不对称裁剪的关键。
