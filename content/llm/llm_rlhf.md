---
domain: llm
topic_id: llm_rlhf
topic_name: LLM人类偏好对齐
page_icon: "\U0001F3AF"
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

### 待定
待定。

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
基于人类反馈的强化学习 (RLHF) 的核心目标是：三阶段流程，PPO+奖励模型对齐。

#### 🎯 核心要点
- 核心动机：三阶段流程，PPO+奖励模型对齐

#### 🔬 深入细节
三阶段流程，PPO+奖励模型对齐


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
InstructGPT 的核心目标是：RLHF工业化，指令遵循能力突破。

#### 🎯 核心要点
- 核心动机：RLHF工业化，指令遵循能力突破
- 演化来源：继承或改进自 rlhf

#### 🔬 深入细节
RLHF工业化，指令遵循能力突破


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
宪法AI (Constitutional AI) 的核心目标是：宪法原则驱动的自我修订机制。

#### 🎯 核心要点
- 核心动机：宪法原则驱动的自我修订机制
- 演化来源：继承或改进自 rlhf

#### 🔬 深入细节
宪法原则驱动的自我修订机制


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
基于AI反馈的强化学习 (RLAIF) 的核心目标是：AI反馈替代人工偏好标注。

#### 🎯 核心要点
- 核心动机：AI反馈替代人工偏好标注
- 演化来源：继承或改进自 constitutional_ai

#### 🔬 深入细节
AI反馈替代人工偏好标注


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
直接偏好优化 (DPO) 的核心目标是：去除奖励模型，直接偏好分类优化。

#### 🎯 核心要点
- 核心动机：去除奖励模型，直接偏好分类优化
- 演化来源：继承或改进自 rlhf

#### 🔬 深入细节
去除奖励模型，直接偏好分类优化


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
身份偏好优化 (IPO) 的核心目标是：MSE正则化解决DPO过拟合。

#### 🎯 核心要点
- 核心动机：MSE正则化解决DPO过拟合
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
MSE正则化解决DPO过拟合


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
Kahneman-Tversky优化 (KTO) 的核心目标是：前景理论，仅需二元好坏反馈。

#### 🎯 核心要点
- 核心动机：前景理论，仅需二元好坏反馈
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
前景理论，仅需二元好坏反馈


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
比值比偏好优化 (ORPO) 的核心目标是：单阶段对齐，无需参考模型。

#### 🎯 核心要点
- 核心动机：单阶段对齐，无需参考模型
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
单阶段对齐，无需参考模型


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
简单偏好优化 (SimPO) 的核心目标是：长度归一化奖励，去参考模型。

#### 🎯 核心要点
- 核心动机：长度归一化奖励，去参考模型
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
长度归一化奖励，去参考模型


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
Token级直接偏好优化 (TDPO) 的核心目标是：Token级前向KL约束保持多样性。

#### 🎯 核心要点
- 核心动机：Token级前向KL约束保持多样性
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
Token级前向KL约束保持多样性


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
自博弈对抗Critic (SPAC) 的核心目标是：自博弈对抗Critic离线对齐。

#### 🎯 核心要点
- 核心动机：自博弈对抗Critic离线对齐
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
自博弈对抗Critic离线对齐


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
组相对策略优化 (GRPO) 的核心目标是：组相对评分取代Critic模型。

#### 🎯 核心要点
- 核心动机：组相对评分取代Critic模型
- 演化来源：继承或改进自 rlhf

#### 🔬 深入细节
组相对评分取代Critic模型


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
强化Token优化 (RTO) 的核心目标是：MDP建模提取Token级奖励。

#### 🎯 核心要点
- 核心动机：MDP建模提取Token级奖励
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
MDP建模提取Token级奖励


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
选择性偏好优化 (SePO) 的核心目标是：选择性优化关键Token降低成本。

#### 🎯 核心要点
- 核心动机：选择性优化关键Token降低成本
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
选择性优化关键Token降低成本


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
LLM医生 (LLMdoctor) 的核心目标是：流引导Token级测试时对齐。

#### 🎯 核心要点
- 核心动机：流引导Token级测试时对齐
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
流引导Token级测试时对齐


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
三角色自博弈RL (TriPlay-RL) 的核心目标是：多角色自博弈安全对齐。

#### 🎯 核心要点
- 核心动机：多角色自博弈安全对齐
- 演化来源：继承或改进自 grpo

#### 🔬 深入细节
多角色自博弈安全对齐


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
轻量对齐 (Light Alignment) 的核心目标是：单神经元安全专家自反射。

#### 🎯 核心要点
- 核心动机：单神经元安全专家自反射
- 演化来源：继承或改进自 grpo

#### 🔬 深入细节
单神经元安全专家自反射


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
f散度GRPO (f-GRPO) 的核心目标是：散度泛化的GRPO改进。

#### 🎯 核心要点
- 核心动机：散度泛化的GRPO改进
- 演化来源：继承或改进自 grpo

#### 🔬 深入细节
散度泛化的GRPO改进


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
蜂群数据选择 (BeeS) 的核心目标是：边际最大化数据选择改进DPO。

#### 🎯 核心要点
- 核心动机：边际最大化数据选择改进DPO
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
边际最大化数据选择改进DPO


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
双向DPO (BiDPO) 的核心目标是：双向Token级VLM偏好优化。

#### 🎯 核心要点
- 核心动机：双向Token级VLM偏好优化
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
双向Token级VLM偏好优化


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
Token自适应屏障PO (TAB-PO) 的核心目标是：自适应屏障保护关键Token。

#### 🎯 核心要点
- 核心动机：自适应屏障保护关键Token
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
自适应屏障保护关键Token


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
Token级策略优化 (TLPO) 的核心目标是：Token级策略优化缓解语言混淆。

#### 🎯 核心要点
- 核心动机：Token级策略优化缓解语言混淆
- 演化来源：继承或改进自 tdpo

#### 🔬 深入细节
Token级策略优化缓解语言混淆


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
多模态DPO (MM-DPO) 的核心目标是：动态奖励缩放多模态对齐。

#### 🎯 核心要点
- 核心动机：动态奖励缩放多模态对齐
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
动态奖励缩放多模态对齐


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
乐观Nash策略优化 (ONPO) 的核心目标是：乐观Nash策略在线对齐。

#### 🎯 核心要点
- 核心动机：乐观Nash策略在线对齐
- 演化来源：继承或改进自 dpo

#### 🔬 深入细节
乐观Nash策略在线对齐
