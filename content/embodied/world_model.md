---
domain: embodied
topic_id: world_model
topic_name: 世界模型
page_icon: "\U0001F30D"
page_title: 世界模型 算法总结
page_subtitle: '{build_date} 版'
page_desc: 从早期状态空间模型到生成式视频世界模型，涵盖物理世界建模、时空预测与基于模型的规划的完整演化历程。
hero_pills:
- 物理仿真
- 时空预测
count_pill: '{count} 个算法'
categories:
  ssm:
    label: 状态空间世界模型
    color: '#22a06b'
  predictive:
    label: 预测表征学习
    color: '#1f77b4'
  generative:
    label: 生成式世界模型
    color: '#ff7f0e'
  physics:
    label: 物理世界建模
    color: '#9467bd'
  planning:
    label: 基于模型的规划
    color: '#d62728'
  embodied:
    label: 具身智能应用
    color: '#17becf'
---

## 领域综述

### 待定
待定。

## 算法演化关系

```yaml
nodes:
- id: world_models
  x: 2018.03
  y: 0
  category: ssm
- id: planet
  x: 2019.06
  y: 0
  category: ssm
- id: dreamerv1
  x: 2019.12
  y: 0
  category: ssm
- id: dreamerv2
  x: 2020.1
  y: 0
  category: ssm
- id: dreamerv3
  x: 2023.01
  y: 0
  category: ssm
- id: dreamer4
  x: 2025.09
  y: 0
  category: ssm
- id: jepa
  x: 2022.06
  y: 1
  category: predictive
- id: ijepa
  x: 2023.06
  y: 1
  category: predictive
- id: vjepa
  x: 2024.04
  y: 1
  category: predictive
- id: vjepa2
  x: 2025.06
  y: 1
  category: predictive
- id: vjepa21
  x: 2026.02
  y: 1
  category: predictive
- id: videogpt
  x: 2021.04
  y: 2
  category: generative
- id: teco
  x: 2023.07
  y: 2
  category: generative
- id: gaia1
  x: 2023.1
  y: 2
  category: generative
- id: genie
  x: 2024.02
  y: 2
  category: generative
- id: sora
  x: 2024.02
  y: 2
  category: generative
- id: genie2
  x: 2024.12
  y: 2
  category: generative
- id: gaia3
  x: 2026.03
  y: 2
  category: generative
- id: deltaworld
  x: 2026.04
  y: 2
  category: generative
- id: worldreel
  x: 2026.03
  y: 2
  category: generative
- id: occsora
  x: 2026.02
  y: 2
  category: generative
- id: astra
  x: 2026.01
  y: 2
  category: generative
- id: interaction_networks
  x: 2016.12
  y: 3
  category: physics
- id: vin
  x: 2017.12
  y: 3
  category: physics
- id: hnn
  x: 2019.12
  y: 3
  category: physics
- id: lnn
  x: 2020.03
  y: 3
  category: physics
- id: gns
  x: 2020.07
  y: 3
  category: physics
- id: roboscape
  x: 2026.01
  y: 3
  category: physics
- id: newton
  x: 2026.03
  y: 3
  category: physics
- id: mbpo
  x: 2019.12
  y: 4
  category: planning
- id: simple
  x: 2020.04
  y: 4
  category: planning
- id: muzero
  x: 2020.12
  y: 4
  category: planning
- id: tdmpc
  x: 2022.06
  y: 4
  category: planning
- id: iris
  x: 2023.05
  y: 4
  category: planning
- id: tdmpc2
  x: 2024.05
  y: 4
  category: planning
- id: jumpy_wm
  x: 2026.02
  y: 4
  category: planning
- id: rlvr_world
  x: 2026.01
  y: 4
  category: planning
- id: unidrive_wm
  x: 2026.01
  y: 5
  category: embodied
- id: resim
  x: 2026.02
  y: 5
  category: embodied
- id: navthinker
  x: 2026.03
  y: 5
  category: embodied
- id: gen1
  x: 2026.04
  y: 5
  category: embodied
- id: xwam
  x: 2026.04
  y: 5
  category: embodied
- id: vagen
  x: 2026.03
  y: 5
  category: embodied
- id: mindjourney
  x: 2026.03
  y: 5
  category: embodied
- id: chatvla2
  x: 2026.03
  y: 5
  category: embodied
edges:
- from: world_models
  to: planet
  label: 引入RSSM
- from: planet
  to: dreamerv1
  label: 潜在想象
- from: dreamerv1
  to: dreamerv2
  label: 离散潜变量
- from: dreamerv2
  to: dreamerv3
  label: 跨域通用
- from: dreamerv3
  to: dreamer4
  label: 规模扩展
- from: jepa
  to: ijepa
  label: 图像掩码
- from: ijepa
  to: vjepa
  label: 视频扩展
- from: vjepa
  to: vjepa2
  label: 机器人规划
- from: vjepa2
  to: vjepa21
  label: 规模提升
- from: videogpt
  to: teco
  label: 时空一致
- from: videogpt
  to: gaia1
  label: 驾驶场景
- from: videogpt
  to: genie
  label: 交互环境
- from: videogpt
  to: sora
  label: 物理直觉
- from: genie
  to: genie2
  label: 3D实时
- from: gaia1
  to: gaia3
  label: 长尾场景
- from: genie2
  to: deltaworld
  label: 增量编码
- from: sora
  to: worldreel
  label: 几何一致
- from: sora
  to: occsora
  label: 占据栅格
- from: sora
  to: astra
  label: 自回归去噪
- from: interaction_networks
  to: vin
  label: 视觉输入
- from: interaction_networks
  to: hnn
  label: 能量守恒
- from: hnn
  to: lnn
  label: 约束系统
- from: vin
  to: gns
  label: GNN模拟
- from: gns
  to: roboscape
  label: 物理先验
- from: gns
  to: newton
  label: 物理引擎
- from: mbpo
  to: simple
  label: 样本效率
- from: mbpo
  to: muzero
  label: MCTS搜索
- from: muzero
  to: tdmpc
  label: TD+MPC
- from: muzero
  to: iris
  label: Trans建模
- from: tdmpc
  to: tdmpc2
  label: 可扩展性
- from: tdmpc2
  to: jumpy_wm
  label: 跳跃动力学
- from: iris
  to: rlvr_world
  label: RL微调
- from: gaia3
  to: unidrive_wm
  label: 统一架构
- from: gaia3
  to: resim
  label: 闭环仿真
- from: vjepa21
  to: navthinker
  label: 社交导航
- from: vjepa21
  to: gen1
  label: 通用操作
- from: vjepa21
  to: vagen
  label: VLM推理
- from: vjepa21
  to: mindjourney
  label: 空间推理
- from: vjepa21
  to: chatvla2
  label: 开放世界
- from: worldreel
  to: xwam
  label: 动作建模
- from: dreamerv3
  to: vjepa
  label: 预测表征
- from: jepa
  to: genie
  label: 生成架构
- from: gns
  to: roboscape
  label: 具身场景
- from: dreamerv3
  to: iris
  label: 世界模型RL
milestones:
- dreamerv3
- jepa
- genie2
```

## 核心算法

### World Models

```yaml
id: world_models
num: 1
name: World Models
full_name: 世界模型 (World Models)
year: '2018.03'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1803.10122
project_url: ''
category: ssm
motivation: 首次展示智能体可在自身生成的梦境中学习策略
```

#### 📝 一句话总结
World Models 的核心目标是：首次展示智能体可在自身生成的梦境中学习策略。

#### 🎯 核心要点
- 核心动机：首次展示智能体可在自身生成的梦境中学习策略
- 代表机构：Google Brain

#### 🔬 深入细节
首次展示智能体可在自身生成的梦境中学习策略


### PlaNet

```yaml
id: planet
num: 2
name: PlaNet
full_name: 深度规划网络 (Deep Planning Network)
year: '2019.06'
org: Google DeepMind
parent: world_models
paper_url: https://proceedings.mlr.press/v97/hafner19a.html
project_url: ''
category: ssm
motivation: 引入RSSM循环状态空间模型实现像素级规划
```

#### 📝 一句话总结
PlaNet 的核心目标是：引入RSSM循环状态空间模型实现像素级规划。

#### 🎯 核心要点
- 核心动机：引入RSSM循环状态空间模型实现像素级规划
- 演化来源：继承或改进自 world_models
- 代表机构：Google DeepMind

#### 🔬 深入细节
引入RSSM循环状态空间模型实现像素级规划


### DreamerV1

```yaml
id: dreamerv1
num: 3
name: DreamerV1
full_name: 梦想家V1 (Dream to Control)
year: '2019.12'
org: Google DeepMind
parent: planet
paper_url: https://arxiv.org/abs/1912.01603
project_url: ''
category: ssm
motivation: 通过潜在想象进行行为学习的Actor-Critic框架
```

#### 📝 一句话总结
DreamerV1 的核心目标是：通过潜在想象进行行为学习的Actor-Critic框架。

#### 🎯 核心要点
- 核心动机：通过潜在想象进行行为学习的Actor-Critic框架
- 演化来源：继承或改进自 planet
- 代表机构：Google DeepMind

#### 🔬 深入细节
通过潜在想象进行行为学习的Actor-Critic框架


### DreamerV2

```yaml
id: dreamerv2
num: 4
name: DreamerV2
full_name: 梦想家V2 (Mastering Atari)
year: '2020.10'
org: Google DeepMind
parent: dreamerv1
paper_url: https://arxiv.org/abs/2010.02193
project_url: ''
category: ssm
motivation: 引入离散潜在变量首次在Atari达到人类水平
```

#### 📝 一句话总结
DreamerV2 的核心目标是：引入离散潜在变量首次在Atari达到人类水平。

#### 🎯 核心要点
- 核心动机：引入离散潜在变量首次在Atari达到人类水平
- 演化来源：继承或改进自 dreamerv1
- 代表机构：Google DeepMind

#### 🔬 深入细节
引入离散潜在变量首次在Atari达到人类水平


### DreamerV3

```yaml
id: dreamerv3
num: 5
name: DreamerV3
full_name: 梦想家V3 (Mastering Diverse Domains)
year: '2023.01'
org: Google DeepMind
parent: dreamerv2
paper_url: https://arxiv.org/abs/2301.04104
project_url: ''
category: ssm
motivation: 固定超参数实现跨领域通用性首次在MC收集钻石
```

#### 📝 一句话总结
DreamerV3 的核心目标是：固定超参数实现跨领域通用性首次在MC收集钻石。

#### 🎯 核心要点
- 核心动机：固定超参数实现跨领域通用性首次在MC收集钻石
- 演化来源：继承或改进自 dreamerv2
- 代表机构：Google DeepMind

#### 🔬 深入细节
固定超参数实现跨领域通用性首次在MC收集钻石


### Dreamer 4

```yaml
id: dreamer4
num: 6
name: Dreamer 4
full_name: 梦想家4 (Scalable World Models)
year: '2025.09'
org: Google DeepMind
parent: dreamerv3
paper_url: https://arxiv.org/abs/2509.24527
project_url: ''
category: ssm
motivation: 扩展模型规模增强长时程记忆与复杂任务想象
```

#### 📝 一句话总结
Dreamer 4 的核心目标是：扩展模型规模增强长时程记忆与复杂任务想象。

#### 🎯 核心要点
- 核心动机：扩展模型规模增强长时程记忆与复杂任务想象
- 演化来源：继承或改进自 dreamerv3
- 代表机构：Google DeepMind

#### 🔬 深入细节
扩展模型规模增强长时程记忆与复杂任务想象


### JEPA

```yaml
id: jepa
num: 7
name: JEPA
full_name: 联合嵌入预测架构 (Joint Embedding Predictive Architecture)
year: '2022.06'
org: Meta AI
parent: —
paper_url: https://openreview.net/forum?id=BZ5a_v_S_s
project_url: ''
category: predictive
motivation: 预测潜在表征而非像素避免建模噪声
```

#### 📝 一句话总结
JEPA 的核心目标是：预测潜在表征而非像素避免建模噪声。

#### 🎯 核心要点
- 核心动机：预测潜在表征而非像素避免建模噪声
- 代表机构：Meta AI

#### 🔬 深入细节
预测潜在表征而非像素避免建模噪声


### I-JEPA

```yaml
id: ijepa
num: 8
name: I-JEPA
full_name: 图像JEPA (Image-JEPA)
year: '2023.06'
org: Meta AI
parent: jepa
paper_url: https://arxiv.org/abs/2301.08243
project_url: ''
category: predictive
motivation: 通过掩码块预测学习强语义特征训练效率高
```

#### 📝 一句话总结
I-JEPA 的核心目标是：通过掩码块预测学习强语义特征训练效率高。

#### 🎯 核心要点
- 核心动机：通过掩码块预测学习强语义特征训练效率高
- 演化来源：继承或改进自 jepa
- 代表机构：Meta AI

#### 🔬 深入细节
通过掩码块预测学习强语义特征训练效率高


### V-JEPA

```yaml
id: vjepa
num: 9
name: V-JEPA
full_name: 视频JEPA (Video-JEPA)
year: '2024.04'
org: Meta AI
parent: ijepa
paper_url: https://arxiv.org/abs/2404.08471
project_url: ''
category: predictive
motivation: 扩展至视频域学习时空特征理解物理运动
```

#### 📝 一句话总结
V-JEPA 的核心目标是：扩展至视频域学习时空特征理解物理运动。

#### 🎯 核心要点
- 核心动机：扩展至视频域学习时空特征理解物理运动
- 演化来源：继承或改进自 ijepa
- 代表机构：Meta AI

#### 🔬 深入细节
扩展至视频域学习时空特征理解物理运动


### V-JEPA 2

```yaml
id: vjepa2
num: 10
name: V-JEPA 2
full_name: 视频JEPA 2 (V-JEPA 2)
year: '2025.06'
org: Meta AI
parent: vjepa
paper_url: https://arxiv.org/abs/2506.09985
project_url: ''
category: predictive
motivation: 增强时空推理应用于机器人规划任务
```

#### 📝 一句话总结
V-JEPA 2 的核心目标是：增强时空推理应用于机器人规划任务。

#### 🎯 核心要点
- 核心动机：增强时空推理应用于机器人规划任务
- 演化来源：继承或改进自 vjepa
- 代表机构：Meta AI

#### 🔬 深入细节
增强时空推理应用于机器人规划任务


### V-JEPA 2.1

```yaml
id: vjepa21
num: 11
name: V-JEPA 2.1
full_name: 视频JEPA 2.1 (Understanding Physical World)
year: '2026.02'
org: Meta AI
parent: vjepa2
paper_url: https://ai.meta.com/blog/v-jepa-2-1-physical-world/
project_url: ''
category: predictive
motivation: 扩展至20亿参数实现80%零样本抓取成功率
```

#### 📝 一句话总结
V-JEPA 2.1 的核心目标是：扩展至20亿参数实现80%零样本抓取成功率。

#### 🎯 核心要点
- 核心动机：扩展至20亿参数实现80%零样本抓取成功率
- 演化来源：继承或改进自 vjepa2
- 代表机构：Meta AI

#### 🔬 深入细节
扩展至20亿参数实现80%零样本抓取成功率


### VideoGPT

```yaml
id: videogpt
num: 12
name: VideoGPT
full_name: 视频GPT (VideoGPT)
year: '2021.04'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2104.10157
project_url: ''
category: generative
motivation: 利用VQ-VAE和Transformer自回归生成视频
```

#### 📝 一句话总结
VideoGPT 的核心目标是：利用VQ-VAE和Transformer自回归生成视频。

#### 🎯 核心要点
- 核心动机：利用VQ-VAE和Transformer自回归生成视频
- 代表机构：UC Berkeley

#### 🔬 深入细节
利用VQ-VAE和Transformer自回归生成视频


### TECO

```yaml
id: teco
num: 13
name: TECO
full_name: 时序一致Transformer (Temporally Consistent Transformer)
year: '2023.07'
org: Google Research
parent: videogpt
paper_url: http://proceedings.mlr.press/v202/yan23b.html
project_url: ''
category: generative
motivation: 弱瓶颈潜在表示解决长视频时空一致性
```

#### 📝 一句话总结
TECO 的核心目标是：弱瓶颈潜在表示解决长视频时空一致性。

#### 🎯 核心要点
- 核心动机：弱瓶颈潜在表示解决长视频时空一致性
- 演化来源：继承或改进自 videogpt
- 代表机构：Google Research

#### 🔬 深入细节
弱瓶颈潜在表示解决长视频时空一致性


### GAIA-1

```yaml
id: gaia1
num: 14
name: GAIA-1
full_name: 自动驾驶生成式AI (Generative AI for Autonomy)
year: '2023.10'
org: Wayve
parent: videogpt
paper_url: https://arxiv.org/abs/2309.17080
project_url: ''
category: generative
motivation: 9B参数模型预测驾驶场景理解交通规则
```

#### 📝 一句话总结
GAIA-1 的核心目标是：9B参数模型预测驾驶场景理解交通规则。

#### 🎯 核心要点
- 核心动机：9B参数模型预测驾驶场景理解交通规则
- 演化来源：继承或改进自 videogpt
- 代表机构：Wayve

#### 🔬 深入细节
9B参数模型预测驾驶场景理解交通规则


### Genie

```yaml
id: genie
num: 15
name: Genie
full_name: 精灵 (Generative Interactive Environments)
year: '2024.02'
org: Google DeepMind
parent: videogpt
paper_url: https://arxiv.org/abs/2402.15391
project_url: ''
category: generative
motivation: 从无标注视频学习生成式交互环境
```

#### 📝 一句话总结
Genie 的核心目标是：从无标注视频学习生成式交互环境。

#### 🎯 核心要点
- 核心动机：从无标注视频学习生成式交互环境
- 演化来源：继承或改进自 videogpt
- 代表机构：Google DeepMind

#### 🔬 深入细节
从无标注视频学习生成式交互环境


### Sora

```yaml
id: sora
num: 16
name: Sora
full_name: 空 (Sora)
year: '2024.02'
org: OpenAI
parent: videogpt
paper_url: https://openai.com/research/video-generation-models-as-world-simulators
project_url: ''
category: generative
motivation: 展现对重力碰撞等物理规律的直觉理解
```

#### 📝 一句话总结
Sora 的核心目标是：展现对重力碰撞等物理规律的直觉理解。

#### 🎯 核心要点
- 核心动机：展现对重力碰撞等物理规律的直觉理解
- 演化来源：继承或改进自 videogpt
- 代表机构：OpenAI

#### 🔬 深入细节
展现对重力碰撞等物理规律的直觉理解


### Genie 2

```yaml
id: genie2
num: 17
name: Genie 2
full_name: 精灵2 (Large-scale Foundation World Model)
year: '2024.12'
org: Google DeepMind
parent: genie
paper_url: https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/
project_url: ''
category: generative
motivation: 11B参数支持实时3D环境生成与交互
```

#### 📝 一句话总结
Genie 2 的核心目标是：11B参数支持实时3D环境生成与交互。

#### 🎯 核心要点
- 核心动机：11B参数支持实时3D环境生成与交互
- 演化来源：继承或改进自 genie
- 代表机构：Google DeepMind

#### 🔬 深入细节
11B参数支持实时3D环境生成与交互


### GAIA-3

```yaml
id: gaia3
num: 18
name: GAIA-3
full_name: 自动驾驶生成式AI 3 (GAIA-3)
year: '2026.03'
org: Wayve
parent: gaia1
paper_url: https://wayve.ai/news/series-d-funding-1-2-billion/
project_url: ''
category: generative
motivation: 生成极端长尾场景助力伦敦L4级测试
```

#### 📝 一句话总结
GAIA-3 的核心目标是：生成极端长尾场景助力伦敦L4级测试。

#### 🎯 核心要点
- 核心动机：生成极端长尾场景助力伦敦L4级测试
- 演化来源：继承或改进自 gaia1
- 代表机构：Wayve

#### 🔬 深入细节
生成极端长尾场景助力伦敦L4级测试


### DeltaWorld

```yaml
id: deltaworld
num: 19
name: DeltaWorld
full_name: 增量世界 (Efficient World Modeling with Delta Tokens)
year: '2026.04'
org: ETH Zurich
parent: genie2
paper_url: https://arxiv.org/abs/2604.04913
project_url: ''
category: generative
motivation: 仅编码帧间差异计算量降低2000倍
```

#### 📝 一句话总结
DeltaWorld 的核心目标是：仅编码帧间差异计算量降低2000倍。

#### 🎯 核心要点
- 核心动机：仅编码帧间差异计算量降低2000倍
- 演化来源：继承或改进自 genie2
- 代表机构：ETH Zurich

#### 🔬 深入细节
仅编码帧间差异计算量降低2000倍


### WorldReel

```yaml
id: worldreel
num: 20
name: WorldReel
full_name: 世界卷轴 (4D Video via Consistent Geometry)
year: '2026.03'
org: SenseTime
parent: sora
paper_url: https://arxiv.org/abs/2603.worldreel
project_url: ''
category: generative
motivation: 几何一致性建模解决视频生成幻觉问题
```

#### 📝 一句话总结
WorldReel 的核心目标是：几何一致性建模解决视频生成幻觉问题。

#### 🎯 核心要点
- 核心动机：几何一致性建模解决视频生成幻觉问题
- 演化来源：继承或改进自 sora
- 代表机构：SenseTime

#### 🔬 深入细节
几何一致性建模解决视频生成幻觉问题


### OccSora

```yaml
id: occsora
num: 21
name: OccSora
full_name: 占据空 (4D Occupancy Generation)
year: '2026.02'
org: Tsinghua University
parent: sora
paper_url: https://ieeexplore.ieee.org/abstract/document/11511396/
project_url: ''
category: generative
motivation: 利用4D占据栅格提供几何稳定环境
```

#### 📝 一句话总结
OccSora 的核心目标是：利用4D占据栅格提供几何稳定环境。

#### 🎯 核心要点
- 核心动机：利用4D占据栅格提供几何稳定环境
- 演化来源：继承或改进自 sora
- 代表机构：Tsinghua University

#### 🔬 深入细节
利用4D占据栅格提供几何稳定环境


### Astra

```yaml
id: astra
num: 22
name: Astra
full_name: 星辰 (Autoregressive Denoising World Model)
year: '2026.01'
org: Tsinghua/Kuaishou
parent: sora
paper_url: https://arxiv.org/abs/2512.08931
project_url: ''
category: generative
motivation: 自回归流与扩散去噪确保长时序物理连贯
```

#### 📝 一句话总结
Astra 的核心目标是：自回归流与扩散去噪确保长时序物理连贯。

#### 🎯 核心要点
- 核心动机：自回归流与扩散去噪确保长时序物理连贯
- 演化来源：继承或改进自 sora
- 代表机构：Tsinghua/Kuaishou

#### 🔬 深入细节
自回归流与扩散去噪确保长时序物理连贯


### IN

```yaml
id: interaction_networks
num: 23
name: IN
full_name: 交互网络 (Interaction Networks)
year: '2016.12'
org: DeepMind
parent: —
paper_url: https://proceedings.neurips.cc/paper/2016/hash/3147da8ab4a0437c15ef51a5cc7f2dc4-Abstract.html
project_url: ''
category: physics
motivation: 通过对象关系图建模实现物理系统推理
```

#### 📝 一句话总结
IN 的核心目标是：通过对象关系图建模实现物理系统推理。

#### 🎯 核心要点
- 核心动机：通过对象关系图建模实现物理系统推理
- 代表机构：DeepMind

#### 🔬 深入细节
通过对象关系图建模实现物理系统推理


### VIN

```yaml
id: vin
num: 24
name: VIN
full_name: 视觉交互网络 (Visual Interaction Networks)
year: '2017.12'
org: DeepMind
parent: interaction_networks
paper_url: https://proceedings.neurips.cc/paper/7040-visual-interaction-networks
project_url: ''
category: physics
motivation: 从原始视频中学习物理模拟器
```

#### 📝 一句话总结
VIN 的核心目标是：从原始视频中学习物理模拟器。

#### 🎯 核心要点
- 核心动机：从原始视频中学习物理模拟器
- 演化来源：继承或改进自 interaction_networks
- 代表机构：DeepMind

#### 🔬 深入细节
从原始视频中学习物理模拟器


### HNN

```yaml
id: hnn
num: 25
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: '2019.12'
org: Google Brain
parent: interaction_networks
paper_url: https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html
project_url: ''
category: physics
motivation: 引入哈密顿力学确保能量守恒
```

#### 📝 一句话总结
HNN 的核心目标是：引入哈密顿力学确保能量守恒。

#### 🎯 核心要点
- 核心动机：引入哈密顿力学确保能量守恒
- 演化来源：继承或改进自 interaction_networks
- 代表机构：Google Brain

#### 🔬 深入细节
引入哈密顿力学确保能量守恒


### LNN

```yaml
id: lnn
num: 26
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: '2020.03'
org: MIT
parent: hnn
paper_url: https://arxiv.org/abs/2003.04630
project_url: ''
category: physics
motivation: 基于拉格朗日力学处理复杂约束系统
```

#### 📝 一句话总结
LNN 提出用神经网络直接参数化拉格朗日量 \(L(q, \dot{q})\)，通过欧拉-拉格朗日方程推导运动方程，解决了哈密顿神经网络 (HNN) 必须依赖正则坐标的限制，使物理先验神经网络能够处理任意坐标系下的复杂约束系统。

#### 🎯 核心要点
- **拉格朗日参数化**：用神经网络学习系统的拉格朗日量 \(L(q, \dot{q})\)，而非直接学习动力学映射
- **任意坐标兼容**：不要求正则坐标 \((q, p)\)，可直接使用广义坐标 \((q, \dot{q})\)，适用范围远超 HNN
- **欧拉-拉格朗日约束**：通过 \(\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0\) 将物理守恒律硬编码进网络结构
- **二阶自动微分**：利用深度学习框架的自动微分计算 Hessian \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 及混合偏导数
- **拉格朗日图网络 (LGN)**：将方法扩展到 PDE 系统，通过图网络对拉格朗日密度求和建模连续场
- **实验验证**：在双摆、相对论粒子、1D 波动方程三个任务上展示了长时程能量守恒与坐标无关性优势

#### 🔬 深入细节
![LNN 核心框架图](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png)
*图：LNN 核心思想示意。物理学家用拉格朗日量描述双摆等物理系统的动力学（黑色）。普通神经网络在长时间预测中因误差累积而失败（红色），而 LNN 通过学习拉格朗日量并利用物理约束推导运动方程，实现精确的长期预测（蓝色）。*

##### 算法伪代码

```python
# Lagrangian Neural Network 前向推理
# 输入: 广义坐标 q, 广义速度 q_dot
# 输出: 广义加速度 q_ddot

def lnn_forward(q, q_dot, lagrangian_nn):
    """通过欧拉-拉格朗日方程计算加速度"""
    # 1. 神经网络预测拉格朗日量
    L = lagrangian_nn(q, q_dot)  # L: scalar
    
    # 2. 计算所需的偏导数（自动微分）
    dL_dq = grad(L, q)           # ∂L/∂q
    dL_dq_dot = grad(L, q_dot)   # ∂L/∂q̇
    
    # 3. 计算 Hessian 和混合偏导
    H = jacobian(dL_dq_dot, q_dot)  # ∂²L/∂q̇² (Hessian)
    J = jacobian(dL_dq_dot, q)      # ∂²L/∂q∂q̇ (混合项)
    
    # 4. 通过欧拉-拉格朗日方程求解加速度
    # q̈ = H⁻¹ [∂L/∂q - (∂²L/∂q∂q̇) q̇]
    q_ddot = solve(H, dL_dq - J @ q_dot)
    
    return q_ddot

# 训练循环
for (q, q_dot, q_ddot_true) in dataset:
    q_ddot_pred = lnn_forward(q, q_dot, lagrangian_nn)
    loss = MSE(q_ddot_pred, q_ddot_true)
    optimizer.step(loss)
```

##### 动机与背景

物理系统的动力学建模是科学计算的核心问题。传统方法直接用神经网络拟合状态到状态的映射 \(\dot{x} = f_\theta(x)\)，虽然短期预测准确，但由于缺乏物理约束，长时间积分后会严重违反能量守恒等基本物理定律。

**哈密顿神经网络 (HNN)** 率先引入物理先验，通过学习哈密顿量 \(H(q, p)\) 并利用哈密顿方程 \(\dot{q} = \frac{\partial H}{\partial p},\ \dot{p} = -\frac{\partial H}{\partial q}\) 来保证能量守恒。然而 HNN 有一个关键限制：**它要求输入必须是正则坐标 \((q, p)\)**，其中 \(p\) 是正则动量。在许多实际问题中（如机器人关节角度、传感器读数），我们获得的是广义坐标和广义速度 \((q, \dot{q})\)，而非正则动量。从 \(\dot{q}\) 到 \(p\) 的转换本身就需要知道系统的拉格朗日量，形成了鸡生蛋的困境。

> 💡 **关键洞察**：拉格朗日力学与哈密顿力学在物理上等价，但拉格朗日形式直接使用 \((q, \dot{q})\) 作为状态变量，天然兼容任意广义坐标，无需正则变换。

##### 核心机制：欧拉-拉格朗日方程驱动的神经网络

LNN 的核心思想极为优雅：用一个神经网络 \(\mathcal{L}_\theta\) 参数化拉格朗日量，然后通过经典力学的欧拉-拉格朗日方程自动推导出运动方程。

**拉格朗日量**定义为动能减去势能：

$$L(q, \dot{q}) = T(\dot{q}) - V(q)$$

**欧拉-拉格朗日方程**给出系统的运动方程：

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0$$

将全导数展开，可以得到加速度的显式表达：

$$\ddot{q} = \left(\frac{\partial^2 L}{\partial \dot{q}^2}\right)^{-1} \left[\frac{\partial L}{\partial q} - \left(\frac{\partial^2 L}{\partial q \partial \dot{q}}\right) \dot{q}\right]$$

这个公式是 LNN 的核心计算步骤。其中：
- \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 是拉格朗日量对广义速度的 **Hessian 矩阵**，对应系统的广义质量矩阵
- \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\) 是**混合偏导数**，捕捉坐标与速度之间的耦合（如科里奥利力）
- \(\frac{\partial L}{\partial q}\) 包含广义力的信息

> ⚠️ **注意**：Hessian 矩阵 \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 必须可逆。对于合理的物理系统，这等价于要求广义质量矩阵正定，这在物理上总是成立的。

##### 自动微分的关键作用

LNN 的实现高度依赖现代深度学习框架的**自动微分**能力。具体来说，需要计算：

1. **一阶梯度** \(\frac{\partial L}{\partial q}\) 和 \(\frac{\partial L}{\partial \dot{q}}\)：标准反向传播
2. **二阶导数** \(\frac{\partial^2 L}{\partial \dot{q}^2}\)：对一阶梯度再次求导（Hessian）
3. **混合二阶导数** \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\)：交叉偏导数

这些高阶导数在 JAX 等框架中可以通过嵌套的 `grad` 和 `jacobian` 调用高效计算。论文使用 JAX 实现，利用其函数式自动微分特性。

##### 与 HNN 的核心区别

| 特性 | HNN | LNN |
|------|-----|-----|
| 学习目标 | 哈密顿量 \(H(q, p)\) | 拉格朗日量 \(L(q, \dot{q})\) |
| 输入坐标 | 正则坐标 \((q, p)\) | 任意广义坐标 \((q, \dot{q})\) |
| 运动方程 | 哈密顿方程（一阶ODE） | 欧拉-拉格朗日方程（二阶ODE） |
| 坐标限制 | 必须正则变换 | **无限制** |
| 约束系统 | 困难 | 自然处理 |
| 计算代价 | 一阶导数 | 二阶导数（Hessian） |

> 💡 **关键优势**：在相对论粒子实验中，HNN 在非正则坐标下完全失败（轨迹发散），而 LNN 在同样的任意坐标下仍能准确学习动力学。这验证了坐标无关性是 LNN 的核心优势。

##### 拉格朗日图网络：扩展到 PDE 系统

论文进一步提出了**拉格朗日图网络 (Lagrangian Graph Networks, LGN)**，将 LNN 的思想扩展到偏微分方程（PDE）描述的连续系统。

核心思想是将连续场离散化为图上的节点，每个节点的**拉格朗日密度** \(\mathcal{L}_i\) 由其局部邻域决定：

$$L_{\text{total}} = \sum_i \mathcal{L}_\theta(q_i, \dot{q}_i, q_{\mathcal{N}(i)})$$

其中 \(\mathcal{N}(i)\) 是节点 \(i\) 的邻居集合。这种设计使得 LNN 可以建模波动方程等连续物理系统，同时保持平移不变性和守恒律。

![双摆实验结果](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png)
*图：双摆任务实验结果对比。LNN 和基线模型在短期动力学建模上表现相似，但在能量守恒方面 LNN 显著优于无物理先验的基线。*

![相对论粒子实验](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x4.png)
*图：相对论粒子任务。(a) HNN 在非正则坐标下失败；(b) HNN 在正则坐标下成功；(c) LNN 在任意坐标下均成功，验证了坐标无关性优势。*

#### 🧪 练习题
```yaml
question: "与哈密顿神经网络 (HNN) 相比，拉格朗日神经网络 (LNN) 的核心优势是什么？"
options:
  - "训练速度更快，因为只需一阶导数"
  - "能够在任意广义坐标下工作，无需正则坐标变换"
  - "网络参数量更少，更容易收敛"
  - "可以直接预测系统能量，无需积分"
answer: 1
explain: "LNN 基于拉格朗日力学，直接使用广义坐标 (q, q̇) 作为输入，而 HNN 要求正则坐标 (q, p)。这使得 LNN 能处理无法轻易获得正则动量的复杂约束系统。"
```

### GNS

```yaml
id: gns
num: 27
name: GNS
full_name: 图网络模拟器 (Learning to Simulate)
year: '2020.07'
org: DeepMind
parent: vin
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
project_url: ''
category: physics
motivation: 利用GNN模拟流体刚体可变形材料
```

#### 📝 一句话总结
GNS 的核心目标是：利用GNN模拟流体刚体可变形材料。

#### 🎯 核心要点
- 核心动机：利用GNN模拟流体刚体可变形材料
- 演化来源：继承或改进自 vin
- 代表机构：DeepMind

#### 🔬 深入细节
利用GNN模拟流体刚体可变形材料


### Roboscape

```yaml
id: roboscape
num: 28
name: Roboscape
full_name: 机器人场景 (Physics-informed Embodied World Model)
year: '2026.01'
org: Tsinghua University
parent: gns
paper_url: https://arxiv.org/abs/2601.roboscape
project_url: ''
category: physics
motivation: 引入物理先验提升机器人场景预测准确性
```

#### 📝 一句话总结
Roboscape 的核心目标是：引入物理先验提升机器人场景预测准确性。

#### 🎯 核心要点
- 核心动机：引入物理先验提升机器人场景预测准确性
- 演化来源：继承或改进自 gns
- 代表机构：Tsinghua University

#### 🔬 深入细节
引入物理先验提升机器人场景预测准确性


### Newton 1.0

```yaml
id: newton
num: 29
name: Newton 1.0
full_name: 牛顿物理引擎 (Newton Physics Engine)
year: '2026.03'
org: NVIDIA
parent: gns
paper_url: https://blogs.nvidia.com/blog/2026/04/gtc26-robots/
project_url: ''
category: physics
motivation: 开源物理引擎实现精确刚体流体动力学
```

#### 📝 一句话总结
Newton 1.0 的核心目标是：开源物理引擎实现精确刚体流体动力学。

#### 🎯 核心要点
- 核心动机：开源物理引擎实现精确刚体流体动力学
- 演化来源：继承或改进自 gns
- 代表机构：NVIDIA

#### 🔬 深入细节
开源物理引擎实现精确刚体流体动力学


### MBPO

```yaml
id: mbpo
num: 30
name: MBPO
full_name: 基于模型的策略优化 (Model-Based Policy Optimization)
year: '2019.12'
org: UC Berkeley
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/5faf461eff3099671ad63c6f3f094f7f-Abstract.html
project_url: ''
category: planning
motivation: 短步长模型生成数据极大提升样本效率
```

#### 📝 一句话总结
MBPO 提出从真实数据状态出发、利用学习到的动力学模型进行短步长分支 rollout 来生成训练数据，并给出了基于模型误差和 rollout 长度的单调改进理论保证，在连续控制任务上实现了比无模型方法快一个数量级的样本效率，同时保持了相当的渐近性能。

#### 🎯 核心要点
- **分支 rollout 机制**：从真实经验回放池中采样状态，用学习到的模型执行 \(k\) 步短 rollout，而非从初始状态分布开始长 rollout，有效控制模型误差累积
- **单调改进理论保证**：Theorem 4.1 给出模型下策略回报与真实回报的下界关系；Theorem 4.2 证明分支 rollout 的误差随 \(k\) 线性增长而非随 \(1/(1-\gamma)\) 二次增长
- **概率集成模型**：使用多个概率神经网络（输出高斯分布的均值和方差）组成的集成模型作为动力学模型，同时捕获认知不确定性和随机不确定性
- **高梯度更新比**：短 rollout 生成的大量模型数据使得每个真实环境步可执行 20–40 次策略梯度更新（远高于纯无模型方法的稳定上限）
- **基于 SAC 的策略优化**：在模型生成数据上使用 Soft Actor-Critic 进行策略学习，继承其最大熵框架的探索优势
- **模型泛化分析**：实验表明训练数据越多，模型对策略分布偏移的敏感度越低（\(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 递减），为使用更长 rollout 提供了实践依据

#### 🔬 深入细节
##### 动机与背景

基于模型的强化学习（MBRL）通过学习环境动力学模型来提升样本效率，但长期以来面临一个核心困境：**模型误差在多步预测中会指数级累积**，导致策略在模型中被"利用"（model exploitation），学到的策略在真实环境中表现很差。

传统的 Dyna 风格方法从初始状态分布开始做完整 episode 的模型 rollout，误差随 horizon 长度急剧放大。而纯无模型方法（如 SAC、PPO）虽然渐近性能好，但需要大量真实交互样本。MBPO 的核心问题是：**能否找到一种"恰到好处"的模型使用方式，既利用模型提升效率，又不被模型误差拖累？**

##### 理论框架：单调改进下界

MBPO 的理论基础建立在策略改进下界之上。首先定义关键符号：

- \(\eta[\pi]\)：策略 \(\pi\) 在**真实环境**中的期望回报
- \(\hat{\eta}[\pi]\)：策略 \(\pi\) 在**学习到的模型**中的期望回报
- \(\epsilon_m = \max_t \mathbb{E}_{s \sim \pi_t} [D_{\mathrm{TV}}(p(s'|s,a) \| \hat{p}(s'|s,a))]\)：模型误差（TV 距离）
- \(\epsilon_\pi = \max_t \mathbb{E}_{s \sim d_{\pi_D}^t} [D_{\mathrm{TV}}(\pi \| \pi_D)]\)：策略偏移

**Theorem 4.1（模型下的单调改进）**：

$$\eta[\pi] \geq \hat{\eta}[\pi] - C(\epsilon_m, \epsilon_\pi)$$

其中惩罚项 \(C\) 同时依赖模型误差 \(\epsilon_m\) 和策略偏移 \(\epsilon_\pi\)。这意味着：只要模型足够准确且策略更新幅度受控，在模型中改进策略就能保证在真实环境中也改进。

> 💡 **关键直觉**：该 bound 将"信任模型的程度"量化为两个可控量——模型精度和策略变化幅度。

**Theorem 4.2（分支 rollout 的更紧下界）**：

对于从真实数据分布 \(d_{\pi_D}\) 出发、在模型中执行 \(k\) 步的分支 rollout：

$$\eta[\pi] \geq \hat{\eta}_k^{\mathrm{branch}}[\pi] - 2r_{\max}\left[\frac{\gamma^{k+1}\epsilon_\pi}{(1-\gamma)^2} + \frac{\gamma^k + 2}{1-\gamma}\epsilon_\pi + \frac{k}{1-\gamma}(\epsilon_m + 2\epsilon_\pi)\right]$$

> ⚠️ **注意**：bound 中有两个竞争因素——随 \(k\) 指数衰减的项（来自真实数据的"锚定"效应）和随 \(k\) 线性增长的项（模型误差累积）。这意味着存在一个最优的 rollout 长度 \(k^*\)，在理论上平衡了模型利用与误差控制。

##### 模型泛化的实证分析

理论 bound 在字面意义上取最大值时 \(k=0\)（即完全不用模型），这是因为分析对模型泛化能力做了最悲观的假设。论文通过实验发现：

![模型泛化分析](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x1.png)
*图 1：(a) 模型误差随策略偏移的变化——训练数据越多，误差增长越慢；(b) 模型误差对策略偏移的局部导数 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi\) 随训练数据量递减，说明模型泛化能力随数据增加而增强。*

实验表明模型误差对策略偏移的敏感度可以用线性近似：

$$\hat{\epsilon}_{m'}(\epsilon_\pi) \approx \epsilon_m + \epsilon_\pi \cdot \frac{\mathrm{d}\epsilon_{m'}}{\mathrm{d}\epsilon_\pi}$$

当 \(\mathrm{d}\epsilon_{m'}/\mathrm{d}\epsilon_\pi < 2\) 时（实验中训练数据充足时成立），这比理论中悲观的 \(\epsilon_m + 2\epsilon_\pi\) 上界更紧，使得更长的 rollout 在实践中变得可行。

##### 算法：实用 MBPO

```python
# Algorithm 2: Model-Based Policy Optimization (MBPO)
初始化策略 π_φ, 环境回放池 D_env, 模型回放池 D_model
for N epochs:
    # 1. 训练动力学模型
    在 D_env 上通过最大似然训练模型集成 p_θ

    for E environment steps:
        # 2. 真实环境交互
        用 π_φ 在环境中执行动作, 将 (s, a, r, s') 加入 D_env

        # 3. 模型分支 rollout
        for M model rollouts:
            从 D_env 中均匀采样状态 s_t
            从 s_t 出发, 用 π_φ 在模型 p_θ 中执行 k 步 rollout
            将生成的 (s, a, r, s') 加入 D_model

        # 4. 策略优化（高更新比）
        for G gradient updates:  # G = 20~40, 远高于无模型方法
            φ ← φ - λ_π · ∇̂_φ J_π(φ, D_model)
```

> 💡 **关键设计**：即使 rollout 长度 \(k\) 很短（甚至 \(k=1\)），通过执行大量（\(M\) 次）短 rollout，仍可生成足够多的模型数据来支撑高频策略更新。这是 MBPO 能做到每个环境步 20–40 次梯度更新的关键。

##### 核心机制详解

**1. 概率集成动力学模型**

模型由 \(B\) 个独立的概率神经网络组成（论文中 \(B=7\)，每次 rollout 随机选 5 个），每个网络输出下一状态的高斯分布参数：

$$\hat{p}_{\theta_b}(s_{t+1} | s_t, a_t) = \mathcal{N}(\mu_{\theta_b}(s_t, a_t),\; \Sigma_{\theta_b}(s_t, a_t))$$

- **随机不确定性**（aleatoric）：由每个网络输出的方差 \(\Sigma_{\theta_b}\) 捕获
- **认知不确定性**（epistemic）：由集成中不同网络预测的分歧捕获

训练损失为负对数似然：

$$\mathcal{L}(\theta_b) = -\sum_{(s,a,s') \in \mathcal{D}_{\text{env}}} \log \hat{p}_{\theta_b}(s' | s, a)$$

**2. 分支 rollout 与数据混合**

与传统 Dyna 从初始状态分布 rollout 不同，MBPO 从 \(\mathcal{D}_{\text{env}}\) 中均匀采样真实状态作为 rollout 起点。这保证了：
- rollout 起始状态分布接近真实策略的状态访问分布
- 短步长 rollout 的状态不会偏离真实分布太远
- 模型只需在真实数据附近的局部区域保持准确

**3. 与传统方法的关键区别**

| 方法 | rollout 起点 | rollout 长度 | 数据用途 |
|------|------------|-------------|---------|
| Dyna / SLBO | 初始状态分布 | 完整 episode | 策略训练 |
| MVE / STEVE | 真实数据 | 短 | 值函数目标改进 |
| **MBPO** | **真实数据** | **短（1–15步）** | **策略训练** |

MBPO 结合了两个优势：从真实数据出发（控制分布偏移）+ 用模型数据直接训练策略（比仅改进值目标更充分利用模型）。

##### 实验结果

![训练曲线](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x2.png)
*图 2：MBPO 与五个基线在 MuJoCo 连续控制任务上的学习曲线。MBPO 在 Ant 任务上 30 万步达到 SAC 300 万步的性能，样本效率提升约 10 倍。*

关键实验发现：

- **样本效率**：MBPO 在所有任务上比 SAC 快约 10 倍，在 Hopper 和 Walker2d 上分别仅需 14 分钟和 40 分钟的等效实时仿真
- **渐近性能**：与最优无模型方法（SAC）相当，远超纯模型方法（PETS 在高维 Ant 任务上失败）
- **消融实验**：
  - 仅提高无模型 SAC 的梯度更新比（不用模型数据）无法匹配 MBPO，证明模型数据确实有帮助
  - 固定 \(k=1\) 的单步 rollout 已能获得大部分收益，验证了理论分析中"短 rollout 最优"的结论
  - 模型足够准确支持 200 步 rollout，但用于策略优化时短 rollout 效果更好；500 步 rollout 则误差过大

![消融实验](https://ar5iv.labs.arxiv.org/html/1906.08253/assets/x3.png)
*图 3：消融实验——无模型高更新比、不同 rollout 长度、值展开对比。单步 rollout 提供了一个难以超越的强基线。*

#### 🧪 练习题
```yaml
question: "MBPO 中分支 rollout 从哪里采样起始状态？"
options:
  - "从环境的初始状态分布中采样"
  - "从真实经验回放池中均匀采样已访问过的状态"
  - "从模型生成的虚拟状态中采样"
  - "从当前策略的在线轨迹末端状态采样"
answer: 1
explain: "MBPO 的核心设计是从真实经验回放池 D_env 中均匀采样状态作为模型 rollout 的起点（Algorithm 2 第 7 行），这保证了 rollout 起始分布接近真实数据分布，从而控制模型误差累积。"
```

### SimPLe

```yaml
id: simple
num: 31
name: SimPLe
full_name: 模拟策略学习 (Simulated Policy Learning)
year: '2020.04'
org: Google Research
parent: mbpo
paper_url: https://arxiv.org/abs/1903.00374
project_url: ''
category: planning
motivation: 在Atari 100k展示极高样本效率
```

#### 📝 一句话总结
SimPLe 的核心目标是：在Atari 100k展示极高样本效率。

#### 🎯 核心要点
- 核心动机：在Atari 100k展示极高样本效率
- 演化来源：继承或改进自 mbpo
- 代表机构：Google Research

#### 🔬 深入细节
在Atari 100k展示极高样本效率


### MuZero

```yaml
id: muzero
num: 32
name: MuZero
full_name: 无模型零 (MuZero)
year: '2020.12'
org: DeepMind
parent: mbpo
paper_url: https://www.nature.com/articles/s41586-020-03051-4
project_url: ''
category: planning
motivation: 学习对价值奖励策略有用的潜在动力学
```

#### 📝 一句话总结
MuZero 的核心目标是：学习对价值奖励策略有用的潜在动力学。

#### 🎯 核心要点
- 核心动机：学习对价值奖励策略有用的潜在动力学
- 演化来源：继承或改进自 mbpo
- 代表机构：DeepMind

#### 🔬 深入细节
学习对价值奖励策略有用的潜在动力学


### TD-MPC

```yaml
id: tdmpc
num: 33
name: TD-MPC
full_name: 时序差分模型预测控制 (TD-MPC)
year: '2022.06'
org: UC San Diego
parent: muzero
paper_url: https://arxiv.org/abs/2203.04955
project_url: ''
category: planning
motivation: 结合TD学习与MPC无需显式重建损失
```

#### 📝 一句话总结
TD-MPC 的核心目标是：结合TD学习与MPC无需显式重建损失。

#### 🎯 核心要点
- 核心动机：结合TD学习与MPC无需显式重建损失
- 演化来源：继承或改进自 muzero
- 代表机构：UC San Diego

#### 🔬 深入细节
结合TD学习与MPC无需显式重建损失


### IRIS

```yaml
id: iris
num: 34
name: IRIS
full_name: 内部语音想象 (Imagination with auto-Regression)
year: '2023.05'
org: Google DeepMind
parent: muzero
paper_url: https://openreview.net/forum?id=vhFu1Acb0xb
project_url: ''
category: planning
motivation: Transformer作为世界模型2小时达人类水平
```

#### 📝 一句话总结
IRIS 的核心目标是：Transformer作为世界模型2小时达人类水平。

#### 🎯 核心要点
- 核心动机：Transformer作为世界模型2小时达人类水平
- 演化来源：继承或改进自 muzero
- 代表机构：Google DeepMind

#### 🔬 深入细节
Transformer作为世界模型2小时达人类水平


### TD-MPC2

```yaml
id: tdmpc2
num: 35
name: TD-MPC2
full_name: 时序差分模型预测控制2 (TD-MPC2)
year: '2024.05'
org: UC San Diego
parent: tdmpc
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/cf73d57b6dcda32b293df7c2d5341f49-Abstract-Conference.html
project_url: ''
category: planning
motivation: 可扩展鲁棒的连续控制世界模型
```

#### 📝 一句话总结
TD-MPC2 的核心目标是：可扩展鲁棒的连续控制世界模型。

#### 🎯 核心要点
- 核心动机：可扩展鲁棒的连续控制世界模型
- 演化来源：继承或改进自 tdmpc
- 代表机构：UC San Diego

#### 🔬 深入细节
可扩展鲁棒的连续控制世界模型


### Jumpy WM

```yaml
id: jumpy_wm
num: 36
name: Jumpy WM
full_name: 跳跃式世界模型 (Compositional Planning with Jumpy WM)
year: '2026.02'
org: DeepMind
parent: tdmpc2
paper_url: https://icml.cc/Conferences/2026
project_url: ''
category: planning
motivation: 跳跃式动力学解决长程规划误差累积
```

#### 📝 一句话总结
Jumpy WM 的核心目标是：跳跃式动力学解决长程规划误差累积。

#### 🎯 核心要点
- 核心动机：跳跃式动力学解决长程规划误差累积
- 演化来源：继承或改进自 tdmpc2
- 代表机构：DeepMind

#### 🔬 深入细节
跳跃式动力学解决长程规划误差累积


### RLVR-World

```yaml
id: rlvr_world
num: 37
name: RLVR-World
full_name: RL微调世界模型 (Training World Models with RL)
year: '2026.01'
org: Tsinghua University
parent: iris
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/4ec03ed08a3fcb59e1c815b5598beff1-Abstract-Datasets_and_Benchmarks_Track.html
project_url: ''
category: planning
motivation: 利用RL微调提升多步预测因果连贯性
```

#### 📝 一句话总结
RLVR-World 的核心目标是：利用RL微调提升多步预测因果连贯性。

#### 🎯 核心要点
- 核心动机：利用RL微调提升多步预测因果连贯性
- 演化来源：继承或改进自 iris
- 代表机构：Tsinghua University

#### 🔬 深入细节
利用RL微调提升多步预测因果连贯性


### UniDrive-WM

```yaml
id: unidrive_wm
num: 38
name: UniDrive-WM
full_name: 统一驾驶世界模型 (Unified Driving World Model)
year: '2026.01'
org: UC Berkeley
parent: gaia3
paper_url: https://arxiv.org/abs/2601.04453
project_url: ''
category: embodied
motivation: 统一理解规划生成支持多摄像头一致性
```

#### 📝 一句话总结
UniDrive-WM 的核心目标是：统一理解规划生成支持多摄像头一致性。

#### 🎯 核心要点
- 核心动机：统一理解规划生成支持多摄像头一致性
- 演化来源：继承或改进自 gaia3
- 代表机构：UC Berkeley

#### 🔬 深入细节
统一理解规划生成支持多摄像头一致性


### ReSim

```yaml
id: resim
num: 39
name: ReSim
full_name: 可靠仿真 (Reliable World Simulation)
year: '2026.02'
org: University of Tübingen
parent: gaia3
paper_url: https://proceedings.neurips.cc/paper/2026/resim
project_url: ''
category: embodied
motivation: 丰富驾驶日志生成高保真闭环仿真环境
```

#### 📝 一句话总结
ReSim 的核心目标是：丰富驾驶日志生成高保真闭环仿真环境。

#### 🎯 核心要点
- 核心动机：丰富驾驶日志生成高保真闭环仿真环境
- 演化来源：继承或改进自 gaia3
- 代表机构：University of Tübingen

#### 🔬 深入细节
丰富驾驶日志生成高保真闭环仿真环境


### NavThinker

```yaml
id: navthinker
num: 40
name: NavThinker
full_name: 导航思考者 (Social Navigation via World Models)
year: '2026.03'
org: Zhejiang University
parent: vjepa21
paper_url: https://arxiv.org/abs/2603.15359
project_url: ''
category: embodied
motivation: 深度特征空间前瞻思考降低碰撞率
```

#### 📝 一句话总结
NavThinker 的核心目标是：深度特征空间前瞻思考降低碰撞率。

#### 🎯 核心要点
- 核心动机：深度特征空间前瞻思考降低碰撞率
- 演化来源：继承或改进自 vjepa21
- 代表机构：Zhejiang University

#### 🔬 深入细节
深度特征空间前瞻思考降低碰撞率


### GEN-1

```yaml
id: gen1
num: 41
name: GEN-1
full_name: 通用具身模型1 (Scaling Embodied Foundation Models)
year: '2026.04'
org: Generalist AI
parent: vjepa21
paper_url: https://generalistai.com/blog/apr-02-2026-gen-1-scaling-embodied-foundation-models-to-mastery/
project_url: ''
category: embodied
motivation: 原生交互基础模型任务成功率达99%
```

#### 📝 一句话总结
GEN-1 通过在 50 万小时真实世界交互数据上大规模预训练（不含机器人数据），结合后训练、强化学习与推理时技术（Harmonic Reasoning），使具身基础模型首次在多项灵巧操作任务上达到 99% 成功率、约 3 倍于 SOTA 的完成速度，并展现出训练分布外的即兴恢复能力，仅需约 1 小时机器人数据即可适配新任务。

#### 🎯 核心要点
- **Scaling Law 延续**：延续 GEN-0 发现的机器人学习 Scaling Law，通过进一步扩大数据（50 万+ 小时）和计算规模，将性能从"演示级"推至"商用级"
- **精通三要素定义**：提出 Mastery = Reliability（可靠性 99%+）+ Speed（~3× SOTA）+ Improvisation（即兴恢复智能），作为具身模型评估框架
- **无机器人数据预训练**：基础模型完全使用低成本可穿戴设备采集的人类活动数据预训练，无需遥操作或仿真数据
- **极致数据效率**：每个任务仅需约 1 小时机器人数据微调；相比 GEN-0 可用 10× 更少的任务数据达到同等性能
- **系统级创新**：涵盖预训练效率提升、后训练技术、经验学习（RL）、多模态人类引导、推理时 Harmonic Reasoning 等多项技术
- **6 项任务验证**：汽车零件分拣、T 恤折叠、扫地机器人维修、积木打包、纸箱折叠、手机包装，均达到 99%+ 成功率
- **速度突破**：纸箱折叠 12.1 秒（SOTA 34 秒，2.8× 提速）；手机包装 15.5 秒（2.8× 提速）
- **即兴恢复行为**：模型展现训练分布外的创造性恢复策略（重新抓取、利用外部灵巧性、双手协作等）
- **对齐问题前瞻**：指出具身模型的涌现行为既是优势也是风险，需要发展具身 AI 对齐方法

#### 🔬 深入细节
##### 核心框架示意

> ⚠️ 注意：GEN-1 以技术博客形式发布，未提供传统论文中的模型架构图。以下基于文中描述整理其系统框架。

```
┌─────────────────────────────────────────────────────────┐
│                    GEN-1 系统架构                         │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │ 预训练数据引擎 │    │  任务适配数据  │                   │
│  │ 50万+小时     │    │  ~1小时/任务   │                   │
│  │ 可穿戴设备    │    │  机器人数据    │                   │
│  │ (无机器人数据) │    │              │                   │
│  └──────┬───────┘    └──────┬───────┘                   │
│         │                   │                           │
│         ▼                   ▼                           │
│  ┌──────────────────────────────────┐                   │
│  │     大规模多模态基础模型           │                   │
│  │  (预训练 → 后训练 → RL微调)       │                   │
│  └──────────────┬───────────────────┘                   │
│                 │                                       │
│                 ▼                                       │
│  ┌──────────────────────────────────┐                   │
│  │     推理时系统 (Harmonic Reasoning)│                   │
│  │  + 多模态人类引导                  │                   │
│  │  + 实时动作输出                    │                   │
│  └──────────────┬───────────────────┘                   │
│                 │                                       │
│                 ▼                                       │
│         实时机器人控制                                    │
│   (可靠性 99% | 速度 3× | 即兴恢复)                      │
└─────────────────────────────────────────────────────────┘
```

##### 性能对比伪代码

```python
# GEN-1 训练与部署流程概览
# Phase 1: 预训练（无机器人数据）
pretrain_data = collect_wearable_data(hours=500_000)  # 可穿戴设备采集人类活动
foundation_model = pretrain(
    data=pretrain_data,
    modality="multimodal",  # 视觉 + 本体感觉 + 语言
    robot_data=None  # 关键：预训练不使用任何机器人数据
)

# Phase 2: 后训练 + RL
model = post_train(foundation_model, techniques=[
    "compute_efficiency_optimization",  # 预训练计算效率曲线偏移
    "reinforcement_learning",           # 从经验中学习
    "multimodal_human_guidance",        # 多模态人类引导
])

# Phase 3: 任务适配（仅需 ~1 小时机器人数据）
for task in ["box_folding", "phone_packing", "tshirt_folding", ...]:
    task_data = collect_robot_data(task, hours=1)  # 极少量任务数据
    task_model = finetune(model, task_data)
    # GEN-1: 10x less data than GEN-0 for comparable performance

# Phase 4: 推理时增强
deployed_model = apply_inference_techniques(
    task_model,
    harmonic_reasoning=True,  # 新型推理时技术
    real_time=True            # 实时动作输出
)

# 结果对比
# Task          | No Pretrain | GEN-0 | GEN-1
# Vacuum Repair |     2%      |  50%  |  99%
# Box Folding   |    13%      |  81%  |  99%
# Phone Packing |    42%      |  62%  |  99%
# Average       |    19%      |  64%  |  99%
```

##### 动机与背景

GEN-1 的核心动机源于具身基础模型从"可演示"到"可商用"的跨越需求。此前的 GEN-0 首次证明了机器人学习中 Scaling Law 的存在——随着预训练数据和计算量的增加，所有零样本任务的性能同步提升。然而，GEN-0 的平均成功率仅为 64%，远未达到商业部署的门槛。

这一进程与大语言模型（LLM）的发展轨迹高度平行：GPT-2 展示了多任务学习的可扩展路径但难以商用，GPT-3 通过规模扩展使 Scaling Law 延续并在特定任务（如广告文案）上实现经济价值。类似地，GEN-1 通过进一步扩展 GEN-0 的基础，使简单物理任务首次跨越商用性能阈值。

> 💡 关键洞察：GEN-1 的预训练数据完全来自人类佩戴低成本可穿戴设备进行日常活动的记录，而非昂贵的遥操作数据或仿真数据。这提供了一个存在性证明——无需大规模遥操作或仿真数据集，仅通过人类活动预训练即可达到高水平的任务精通。

##### 核心机制：精通（Mastery）三要素

GEN-1 将"精通"定义为三个维度的综合：

**1. 可靠性（Reliability）**

传统工业机器人通过精确控制和严格约束环境实现可靠性，但这种方式无法泛化。端到端机器人学习模型长期以来难以达到高可靠性。GEN-1 在 6 项任务上实现了 99%+ 的成功率：

| 任务 | 无预训练 | GEN-0 | GEN-1 | 连续成功次数 |
|------|---------|-------|-------|------------|
| 汽车零件分拣 | — | — | 99%+ | 50+ (1小时) |
| T恤折叠 | — | — | 99%+ | 86次连续 |
| 扫地机维修 | 2% | 50% | 99% | 200+次连续 |
| 积木打包 | — | — | 99%+ | 1800+次连续 |
| 纸箱折叠 | 13% | 81% | 99% | 200+次连续 |
| 手机包装 | 42% | 62% | 99% | 100+次连续 |

**2. 速度（Speed）**

速度提升并非简单加快电机转速。随着速度增加，世界不再是准静态的：速度项增大、摩擦动力学变化、运动模糊加剧，对精度、反应性和推理提出更高要求。GEN-1 的速度突破来自多个因素：

- **经验学习（RL）**：模型通过强化学习自主发现更快的完成策略
- **Harmonic Reasoning**：新型推理时技术，优化实时决策
- **预训练数据优势**：可穿戴设备采集的数据包含人类以自然速度完成各种任务的记录，相比遥操作数据更流畅、更快速（遥操作受限于力反馈缺失、延迟和视野问题）

具体速度对比：
- 纸箱折叠：GEN-1 12.1 秒 vs SOTA 34 秒（GEN-0 和 π₀ 在相同纸箱上均约 34 秒），**2.8× 提速**
- 手机包装：GEN-1 15.5 秒 vs GEN-0，**2.8× 提速**

> 💡 关键：GEN-1 的任务完成速度可以超过演示数据中的速度，说明模型通过 RL 学会了比人类示范更高效的策略。

**3. 即兴恢复智能（Improvisational Intelligence）**

这是 GEN-1 最具突破性的能力维度。在非结构化环境中，机器人必须能够创造性地即兴解决意外情况。GEN-1 展现的训练分布外恢复行为包括：

- 垫圈被碰落后：可选择放下重新抓取、部分插入缝隙利用外部灵巧性重新抓取、或使用另一只手进行双手协作重新抓取
- 大型可变形物体出现异常构型时：模型自主找到恢复路径
- 这些行为直接贡献于从意外长尾事件中恢复

正如 William James（现代心理学奠基人）所述：**智能是通过不同手段达到相同目标的能力**。即兴恢复智能不仅使机器人能在非结构化环境中工作，还反过来提升了通用模型的可靠性和速度。

##### 数据引擎与预训练范式

GEN-1 的数据策略是其核心竞争优势之一：

```
传统方法:  遥操作数据(昂贵/难扩展) → 任务特定模型 → 窄泛化
GEN-1方法: 可穿戴设备数据(低成本/可扩展) → 通用基础模型 → 少量机器人数据微调
```

- **预训练数据**：50 万+ 小时高保真物理交互数据，来自人类佩戴可穿戴设备进行数百万种活动
- **预训练中无机器人数据**：模型在适配新任务时，同时首次适配该机器人形态和该任务
- **任务适配**：仅需约 1 小时机器人数据
- **数据效率提升**：GEN-1 可用 GEN-0 的 1/10 任务数据达到同等性能

> ⚠️ 注意：此前超过 90% 成功率的通用机器人模型依赖大规模遥操作数据集，成本高且难以扩展。GEN-1 证明了基于可穿戴设备的预训练路线可以达到更高性能，这对整个领域的数据采集范式具有重要启示。

##### 系统级设计

GEN-1 不仅是一个模型，更准确地说是一个**系统**。类似于前沿 LLM 聊天机器人和 API，系统级组件在推理和模型调用层面显著提升了性能：

1. **预训练效率**：通过计算效率曲线偏移（shifting the curve），在相同计算量下获得更高的预训练智能
2. **后训练技术**：包括理论 RL 基础和多模态人类引导
3. **推理时技术**：Harmonic Reasoning——一种新型分页注意力机制，支持实时推理
4. **分布式训练基础设施**：重新设计以支持 PB 级物理交互数据作为一等公民
5. **硬件协同**：设计新硬件，在新地理区域部署数千个机器人手以获取多样化物理活动数据

##### 与相关工作的对比

| 维度 | 传统工业机器人 | PaLM-E / RT-2 (VLA) | π₀ | GEN-0 | **GEN-1** |
|------|-------------|---------------------|-----|-------|-----------|
| 泛化能力 | 极低（硬编码） | 中等 | 中等 | 高 | **高** |
| 可靠性 | 高（受限环境） | 低-中 | 中 | 64% | **99%** |
| 速度 | 高（受限任务） | 慢 | ~34s(折箱) | ~34s(折箱) | **~12s(折箱)** |
| 即兴能力 | 无 | 有限 | 有限 | 有限 | **显著** |
| 数据需求 | 编程 | 大量遥操作 | 大量遥操作 | ~10h/任务 | **~1h/任务** |
| 预训练数据 | 无 | 互联网数据 | 遥操作 | 可穿戴设备 | **可穿戴设备(50万h)** |

##### 局限性与展望

GEN-1 并非没有局限：
- 并非所有尝试的任务都能达到 99%+ 成功率
- 某些任务在实际部署中可能需要更高的成功率或速度
- 当前主要验证的是"简单物理任务"的精通

但 Scaling Law 的延续意味着：每一代新模型都将解锁更多更复杂任务的精通能力。此外，GEN-1 提出了具身 AI 对齐的前瞻性思考——随着模型能力增强，涌现行为（如未经训练的恢复动作）既是优势也可能是风险，需要发展精确引导模型行为的对齐方法。

#### 🧪 练习题
```yaml
question: "GEN-1 的预训练数据主要来源是什么？"
options:
  - "大规模机器人遥操作数据"
  - "物理仿真环境生成的合成数据"
  - "人类佩戴低成本可穿戴设备采集的活动数据"
  - "互联网视频和图像数据"
answer: 2
explain: "GEN-1 的预训练数据完全来自人类佩戴可穿戴设备进行日常活动的记录（50万+小时），不包含任何机器人数据。这是其核心创新之一，证明了无需昂贵的遥操作数据即可达到高水平任务精通。"
```

### X-WAM

```yaml
id: xwam
num: 42
name: X-WAM
full_name: 统一4D世界动作建模 (Unified 4D World Action Modeling)
year: '2026.04'
org: Stanford/NVIDIA
parent: worldreel
paper_url: https://arxiv.org/abs/2604.26694v2
project_url: ''
category: embodied
motivation: 统一4D合成与动作执行异步噪声采样
```

#### 📝 一句话总结
X-WAM 的核心目标是：统一4D合成与动作执行异步噪声采样。

#### 🎯 核心要点
- 核心动机：统一4D合成与动作执行异步噪声采样
- 演化来源：继承或改进自 worldreel
- 代表机构：Stanford/NVIDIA

#### 🔬 深入细节
统一4D合成与动作执行异步噪声采样


### Vagen

```yaml
id: vagen
num: 43
name: Vagen
full_name: 视觉智能体生成 (Reinforcing World Model Reasoning)
year: '2026.03'
org: Peking University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/fc6688d75adde86b9df910769c1d02e3-Abstract-Conference.html
project_url: ''
category: embodied
motivation: 显式视觉状态推理强化VLM世界建模
```

#### 📝 一句话总结
VAGEN 提出将 VLM 智能体训练为显式的世界模型（World Model），通过状态估计（State Estimation）和转移预测（Transition Modeling）两种推理策略增强多轮视觉决策能力，并设计了 WorldModeling Reward 与 Bi-Level GAE 机制实现细粒度的奖励塑形与信用分配，在 Qwen2.5-VL-3B 上超越 GPT-5 等大规模闭源模型。

#### 🎯 核心要点
- **POMDP 建模**：将多轮视觉智能体任务形式化为部分可观测马尔可夫决策过程，每轮接收图像观测并输出动作
- **5 种推理策略**：NoThink、FreeThink、StateEstimation、TransitionModeling、WorldModeling（前两者组合），通过结构化 `<think>` 标签控制推理内容
- **VAGEN-Base 训练框架**：基于 PPO 的多轮 RL 训练，关键创新为 Observation Token Masking——将图像 token 排除在策略梯度之外
- **WorldModeling Reward**：利用 LLM-as-a-Judge 评估智能体的状态估计与转移预测质量，提供密集的推理质量奖励信号
- **Bi-Level GAE**：两层优势估计机制——先在 turn 级别用 \(\gamma_{\text{turn}}\) 计算每轮优势，再在 token 级别用 \(\gamma_{\text{token}}\) 向回传播，解决稀疏奖励下的信用分配问题
- **视觉状态表征研究**：对比自然语言、符号化、结构化三种表征格式，发现最优格式依赖于任务特性
- **6 个评测环境**：Sokoban、FrozenLake、PrimitiveSkill（4 子任务）、Navigation（2 子任务）、SVG Reconstruction，覆盖规划、操控、导航、推理
- **VAGEN-Full（3B）得分 0.82**，超越 GPT-5（0.75）、Claude 4.5 Sonnet（0.64）等闭源模型

#### 🔬 深入细节
##### 框架总览

![VAGEN 框架总览与五种推理策略](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x1.png)
*图 1：VAGEN 框架。左侧展示多轮交互流程（观测→推理→动作→环境反馈），右侧展示五种推理策略的结构化输出格式。WorldModeling 策略同时包含 `<observation>`（状态估计）和 `<prediction>`（转移预测）字段。*

![VAGEN-Base 多轮 RL 训练流程](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x2.png)
*图 2：VAGEN-Base 训练流程。智能体在环境中执行多轮交互生成轨迹，通过 PPO 优化策略，其中 Observation Token Masking 确保只对动作 token 计算策略梯度。*

![Bi-Level GAE 与 Token-Level GAE 对比](https://ar5iv.labs.arxiv.org/html/2510.16907/assets/x3.png)
*图 3：标准 Token-Level GAE（左）将稀疏的终端奖励逐 token 回传；Bi-Level GAE（右）先在 turn 级别分配奖励（紫色箭头），再在 token 级别传播（橙色箭头），实现层次化信用分配。*

##### 算法伪代码

```python
# VAGEN-Full 多轮 RL 训练框架伪代码
def vagen_full_training(env, policy_vlm, critic, llm_judge):
    for iteration in range(N_iterations):
        # === Rollout 阶段 ===
        trajectories = []
        for episode in range(batch_size):
            obs = env.reset()  # 初始图像观测
            trajectory = []
            for turn in range(max_turns):
                # 智能体生成结构化输出：<think><observation>...</observation><prediction>...</prediction>...</think><answer>action</answer>
                response = policy_vlm.generate(obs, strategy="WorldModeling")
                action = parse_action(response)
                obs_belief = parse_observation(response)   # 状态估计 ŝ_t
                pred_belief = parse_prediction(response)   # 转移预测 ŝ_{t+1}
                
                next_obs, task_reward, done = env.step(action)
                
                # WorldModeling Reward: LLM-as-Judge 评估推理质量
                gt_state = env.get_ground_truth_state()
                gt_next_state = env.get_ground_truth_state()
                r_reason = β_s * judge_match(obs_belief, gt_state) \
                         + β_w * judge_match(pred_belief, gt_next_state)
                
                r_turn = r_reason + r_format + task_reward
                trajectory.append((obs, response, action, r_turn, next_obs))
                obs = next_obs
                if done: break
            trajectories.append(trajectory)
        
        # === Bi-Level GAE 优势估计 ===
        for traj in trajectories:
            # 第一层：Turn-Level GAE
            turn_advantages = compute_turn_gae(
                rewards=[t.r_turn for t in traj],
                values=critic.evaluate(traj),
                gamma=gamma_turn, lambda_=lambda_turn
            )
            # 第二层：Token-Level GAE（以 turn advantage 初始化末尾 token）
            token_advantages = []
            for t, turn_adv in enumerate(turn_advantages):
                token_advs = compute_token_gae(
                    kl_penalties=compute_kl(traj[t].response),
                    values=critic.token_values(traj[t]),
                    gamma=gamma_token, lambda_=lambda_token,
                    terminal_advantage=turn_adv  # 关键：用 turn 级优势初始化
                )
                token_advantages.extend(token_advs)
        
        # === PPO 优化（带 Observation Token Masking）===
        for epoch in range(K_epochs):
            # 仅对 action tokens 计算策略梯度，mask 掉 observation tokens
            ratio = policy_vlm.prob(actions) / old_policy.prob(actions)
            clipped = clip(ratio, 1-ε, 1+ε)
            loss = -min(ratio * token_advantages, clipped * token_advantages)
            loss = loss * action_token_mask  # Observation Token Masking
            policy_vlm.update(loss)
```

##### 方法详解

**1. 动机与问题定义：多轮视觉智能体的推理瓶颈**

当前 VLM（视觉语言模型）在单轮视觉问答任务上表现出色，但在需要多轮交互的智能体任务中（如推箱子、机器人操控、迷宫导航）表现显著下降。论文将这一问题归因于两个核心缺陷：（1）VLM 缺乏对视觉状态的显式推理能力——它们不会主动"描述当前看到了什么"以及"执行动作后世界会变成什么样"；（2）现有 RL 训练方法（如 GRPO、标准 PPO）无法有效处理多轮交互中的信用分配问题——稀疏的终端奖励难以指导中间每一步的决策质量。

VAGEN 的核心洞察是：**让 VLM 像世界模型一样思考**。具体来说，在每轮决策前，智能体需要显式地完成两项推理任务：**状态估计**（State Estimation，用自然语言描述当前观测到的环境状态 \(\hat{s}_t\)）和**转移预测**（Transition Modeling，预测执行动作后环境将变成什么状态 \(\hat{s}_{t+1}\)）。这种设计受到认知科学中"内部世界模型"概念的启发——人类在行动前会在脑中模拟动作的后果。

**2. 核心机制：结构化推理策略与 VAGEN-Base**

论文设计了 5 种推理策略来系统性地研究不同推理深度的影响。所有策略都通过结构化的 XML 标签控制输出格式：

- **NoThink**：直接输出动作，不进行任何推理（`<answer>action</answer>`）
- **FreeThink**：在 `<think>` 标签中自由推理，类似 Chain-of-Thought
- **StateEstimation**：在 `<think>` 中必须包含 `<observation>` 字段，描述当前视觉状态
- **TransitionModeling**：在 `<think>` 中必须包含 `<prediction>` 字段，预测下一状态
- **WorldModeling**：同时包含 `<observation>` 和 `<prediction>`，完整的世界建模

> 💡 **关键发现**：StateEstimation 在导航任务中表现最佳（理解当前位置是关键），TransitionModeling 在操控任务中表现最佳（预测物体运动是关键），而 WorldModeling 在所有任务上都表现稳定且最优。

VAGEN-Base 的训练框架基于 PPO，但引入了一个关键创新——**Observation Token Masking**。在多轮交互中，轨迹由交替出现的观测 token（图像编码）和动作 token（模型生成）组成。由于观测 token 不是由智能体策略生成的，对其计算策略梯度在理论上是错误的，且冗长的观测序列会主导梯度权重分布。因此，VAGEN 在计算 PPO 损失时将所有观测 token 的 mask 设为 0，仅对动作 token 进行优化。

**3. WorldModeling Reward：基于 LLM 裁判的推理质量奖励**

为了监督智能体的世界建模推理质量，VAGEN 引入了 WorldModeling Reward。其核心思路是：从环境中获取真实状态信息（如 Sokoban 中玩家/箱子/目标的 2D 坐标），然后评估智能体在 `<observation>` 和 `<prediction>` 中的描述与真实状态的匹配程度。

论文最初尝试使用 CLIP 计算图文相似度作为奖励，但发现 CLIP 对细粒度的空间和几何细节不够敏感。最终采用 **LLM-as-a-Judge** 方案：将智能体的推理文本和真实状态文本一起输入 LLM，由 LLM 直接判断匹配程度（二元判断或提取结构化信息后进行 F1 评分）。每轮的推理奖励定义为：

$$r^{\text{reason}}_t = \beta_s \cdot \mathcal{I}_{\text{SE}}(\hat{s}_t, s_t) + \beta_w \cdot \mathcal{I}_{\text{TM}}(\hat{s}_{t+1}, s_{t+1})$$

其中 \(\mathcal{I}\) 为匹配得分函数，\(\beta_s, \beta_w\) 为奖励系数（默认均为 0.5）。

**4. Bi-Level GAE：层次化信用分配**

标准 GAE 在多轮交互中面临严重的信用分配问题：稀疏的终端奖励需要跨越数十个 turn、数百个 token 进行回传，信号极度衰减。VAGEN 提出 **Bi-Level GAE**，将优势估计分解为两个层次：

**Turn 级别**（外层）：将每轮的复合奖励 \(r_t = r^{\text{reason}}_t + r^{\text{format}}_t + R(s_t, a_t)\) 作为该轮的即时奖励，使用 critic 在每轮动作末尾的价值估计计算 TD 误差：

$$\delta^{\text{turn}}_t = r_t + \gamma_{\text{turn}} V_\phi(\bar{\tau}_{\leq a_{t+1}}) - V_\phi(\bar{\tau}_{\leq a_t})$$

然后通过标准 GAE 递推计算 turn 级优势：\(A^{\text{turn}}_t = \delta^{\text{turn}}_t + \gamma_{\text{turn}} \lambda_{\text{turn}} A^{\text{turn}}_{t+1}\)。

**Token 级别**（内层）：在每个 turn 内部，以 KL 惩罚作为 token 级奖励，计算 token 级 TD 误差和优势。**关键连接**：每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势 \(A^{\text{turn}}_t\)，从而将 turn 级别的反馈注入 token 级别并向前传播。

> ⚠️ **与传统方法的区别**：Vanilla PPO 不做 observation masking 导致训练失败；GRPO 因场景变化导致轨迹多样性过高，需要不可承受的样本量；Turn-level PPO 对同一 turn 内所有 token 使用均匀优势估计，无法区分各 token 的贡献。Bi-Level GAE 同时解决了这三个问题。

**5. 消融实验与关键发现**

消融实验揭示了两个组件的互补性：Bi-Level GAE 单独使用时提升显著但不稳定（对奖励稀疏性和准确性敏感）；WorldModeling Reward 单独使用时一致性提升但受限于粗粒度的轨迹级信用分配。两者结合的 VAGEN-Full 在所有任务上都是最稳定且表现最优的方法。特别值得注意的是，在 PrimitiveSkill 任务上，VAGEN-Base 和 VAGEN-Full 的训练准确率相近，但 VAGEN-Full 的测试准确率显著更高，表明世界建模推理增强了泛化能力。

#### 🧪 练习题
```yaml
question: "VAGEN 中 Bi-Level GAE 的 token 级优势估计是如何与 turn 级优势关联的？"
options:
  - "将所有 turn 级优势求平均后作为每个 token 的优势"
  - "每个 turn 最后一个 token 的优势被初始化为该 turn 的 turn 级优势，然后向前传播"
  - "token 级优势独立计算，与 turn 级优势相加得到最终优势"
  - "使用 turn 级优势对 token 级优势进行归一化"
answer: 1
explain: "Bi-Level GAE 的关键连接机制是将每个 turn 最后一个 action token 的优势初始化为预先计算好的 turn 级优势 A^turn_t，然后通过 token 级 GAE 的反向递推将该信号传播到 turn 内所有 token，实现层次化的信用分配。"
```

### MindJourney

```yaml
id: mindjourney
num: 44
name: MindJourney
full_name: 心智旅程 (Test-time Scaling with World Models)
year: '2026.03'
org: Shanghai Jiao Tong University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper/2026/mindjourney
project_url: ''
category: embodied
motivation: 推理阶段利用世界模型增强空间推理
```

#### 📝 一句话总结
MindJourney 的核心目标是：推理阶段利用世界模型增强空间推理。

#### 🎯 核心要点
- 核心动机：推理阶段利用世界模型增强空间推理
- 演化来源：继承或改进自 vjepa21
- 代表机构：Shanghai Jiao Tong University

#### 🔬 深入细节
推理阶段利用世界模型增强空间推理


### ChatVLA-2

```yaml
id: chatvla2
num: 45
name: ChatVLA-2
full_name: 对话视觉语言动作2 (Open-world Reasoning VLA)
year: '2026.03'
org: Fudan University
parent: vjepa21
paper_url: https://proceedings.neurips.cc/paper/2026/chatvla2
project_url: ''
category: embodied
motivation: 保留VLM能力扩展开放世界具身推理
```

#### 📝 一句话总结
ChatVLA-2 的核心目标是：保留VLM能力扩展开放世界具身推理。

#### 🎯 核心要点
- 核心动机：保留VLM能力扩展开放世界具身推理
- 演化来源：继承或改进自 vjepa21
- 代表机构：Fudan University

#### 🔬 深入细节
保留VLM能力扩展开放世界具身推理
