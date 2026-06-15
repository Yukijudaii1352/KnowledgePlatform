### HY-Embodied-0.5 — 混元具身0.5 (HY-Embodied Foundation Model)

```yaml
id: hy_embodied
name: HY-Embodied-0.5
full_name: 混元具身0.5 (HY-Embodied Foundation Model)
year: '2026'
org: Tencent
paper_url: https://arxiv.org/abs/2604.07430
category: world_model
parent: dreamerv3
motivation: 混合Transformer在线策略蒸馏
```

#### 📝 一句话总结

HY-Embodied-0.5 提出面向真实具身智能体的视觉语言基础模型族，通过原生分辨率视觉编码器、Mixture-of-Transformers、视觉 latent tokens、大规模具身数据和迭代后训练，解决通用 VLM 在空间感知、时间理解和具身推理上不足的问题。其 MoT-2B 变体面向边缘部署，进一步扩展成 VLA 后在真实双臂机器人任务中展示了可迁移控制能力。

#### 🎯 核心要点

- **HY-ViT 2.0**：轻量原生分辨率视觉编码器，支持任意比例输入，并通过蒸馏和重构监督保留细粒度视觉信息
- **Mixture-of-Transformers**：为视觉 token 和文本 token 使用部分非共享 QKV/FFN 与不同 attention 机制，提高视觉建模能力且减少语言能力退化
- **视觉 latent tokens**：在视觉序列末尾追加专用 latent tokens，桥接视觉 full attention 和语言 causal attention
- **100M+ 训练样本**：数据覆盖基础感知、空间感知、具身感知、推理与规划，并包含真实机器人数据和高质量 reasoning 数据
- **迭代后训练**：冷启动数据、rejection sampling SFT 和 RL 交替提升 thinking 能力
- **大到小在线蒸馏**：把大模型能力迁移到小模型，提升 2B 边缘变体的具身推理表现
- **22 项评测**：覆盖视觉感知、空间推理和具身理解，MoT-2B 在同规模模型中表现领先，MoE-A32B 对比前沿 VLM 也有竞争力
- **真实机器人 VLA**：在 MoT-2B 上扩展 Action Expert，先用 5K 小时 UMI 数据微调，再用 300-700 条真实演示适配具体任务

#### 🔬 深入细节

##### MoT 架构示意图

![HY-Embodied-0.5 MoT 架构](https://arxiv.org/html/2604.07430v1/x2.png)

*图：HY-Embodied-0.5 的 Mixture-of-Transformers 为视觉和文本 token 分配不同计算路径，并通过视觉 latent tokens 强化跨模态连接。*

##### 算法伪代码

```python
# HY-Embodied-0.5 训练与部署流程抽象

# 1. Perception-centric pretraining
train HY_ViT_2_0 with native-resolution images
distill visual encoder from stronger internal vision model
add reconstruction/discrete-code supervision to preserve visual detail

# 2. Multimodal foundation model training
initialize LLM backbone
insert Mixture-of-Transformers layers:
    text tokens -> original QKV/FFN + causal attention
    visual tokens -> vision-specific QKV/FFN + visual/full attention
append visual latent tokens after visual sequence
train on 100M+ perception, spatial, embodied, reasoning/planning samples

# 3. Iterative embodied post-training
for round in iterative_training:
    train on cold-start reasoning data
    sample candidate responses / reasoning traces
    apply rejection sampling SFT
    apply RL to improve thinking and embodied reasoning

# 4. Large-to-small on-policy distillation
teacher = HY_Embodied_large
student = HY_Embodied_MoT_2B
collect on-policy teacher/student trajectories
distill reasoning and embodied responses into student

# 5. VLA robot control adaptation
extend MoT-2B with Action Expert
finetune on 5K hours UMI data
SFT on 300-700 real-robot demonstrations per task
deploy on dual-arm robot with head/wrist cameras
```

##### 动机与背景

通用 VLM 通常擅长图文问答和常识推理，但真实具身任务要求更细的能力：识别物体可操作部位、理解三维空间关系、跟踪时间变化、预测动作后果，并最终服务于机器人控制。单纯扩大通用 VLM 规模并不一定提升这些能力，因为训练数据和架构计算路径没有专门面向具身视觉。

HY-Embodied-0.5 的第一层改进是视觉侧。HY-ViT 2.0 面向原生分辨率输入，避免强行缩放造成小物体、距离和局部接触区域丢失。论文还训练更大视觉模型产生离散视觉表示，用于监督视觉 token，从而在接入语言模型时保留更多可 grounding 的细节。

##### Mixture-of-Transformers 与视觉 latent tokens

标准 VLM 常把视觉 token 投影到 LLM embedding 后与文本 token 混合处理，视觉训练过重时可能损伤语言能力。HY-Embodied-0.5 使用 MoT：复制或分离部分 QKV/FFN 参数，让视觉 token 走更适合视觉建模的路径，文本 token 保持原语言路径。

可抽象为：

$$y_i =
\begin{cases}
\operatorname{Block}_{vision}(x_i), & x_i \in \mathcal{V} \\
\operatorname{Block}_{text}(x_i), & x_i \in \mathcal{T}
\end{cases}$$

视觉 latent tokens 则类似跨模态寄存器：它们从视觉 full attention 中聚合关键空间区域，再被语言 causal attention 读取。论文的注意力可视化显示，这些 token 会关注物体部位、空间关系和动作相关区域，因此能把“看见什么”更稳定地转成“如何推理/操作”。

##### 后训练与蒸馏

HY-Embodied-0.5 的后训练不是一次性 SFT。它使用少量冷启动数据建立推理格式，再通过 iterative RL 和 rejection sampling SFT 提升 thinking 能力。大模型探索出的高质量推理和答案，再通过 large-to-small on-policy distillation 迁移给 MoT-2B，使小模型在边缘部署预算下仍保留较强具身能力。

这个流程与 Dreamer/RWML 的“世界模型”概念不同：HY-Embodied-0.5 不是学习一个显式环境动力学模型再在其中 rollout，而是把空间、时间、计划和动作相关知识压进 VLM/VLA 基础模型。它更像具身 agent 的感知-推理底座，可被下游控制头或 Action Expert 接入。

##### 机器人控制部署

论文在 MoT-2B 基础上扩展 Action Expert 得到 VLA 模型。训练先用 5K 小时 UMI 数据进行通用操作微调，再用每个真实任务 300-700 条演示做 SFT。评测在双臂 Xtrainer、头部和腕部相机设置下进行，任务包括 Precision Plug-in Packing、Tableware Stacking 和 Mug Hanging。

这种部署流程体现了 HY-Embodied-0.5 的定位：大规模视觉语言预训练提供空间和任务理解，具身后训练提升推理与规划，少量真实机器人数据完成 embodiment-specific 适配。与纯 RL 世界模型相比，它更依赖监督/后训练与蒸馏；与通用 VLM 相比，它在架构和数据上明确为物理世界 grounding 优化。

> 💡 关键：HY-Embodied-0.5 的核心贡献是把 VLM 改造成具身基础模型，而不是只在通用 VLM 外面接一个机器人控制头。

#### 🧪 练习题

```yaml
question: "HY-Embodied-0.5 中 Mixture-of-Transformers 的主要作用是什么？"
options:
  - "让视觉 token 和文本 token 使用更适配各自模态的计算路径，提升视觉建模同时减少语言能力退化"
  - "把所有视觉输入压缩成一个固定文本 token"
  - "替代真实机器人数据采集"
  - "只用于减少模型文件大小，与性能无关"
answer: 0
explain: "MoT 为视觉和文本 token 引入模态自适应计算，视觉分支增强空间和视觉建模，文本分支保留语言能力，是 HY-Embodied-0.5 的关键架构设计。"
```
