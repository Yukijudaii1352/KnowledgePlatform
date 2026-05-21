### HY-Embodied

```yaml
id: hy_embodied
name: HY-Embodied
full_name: 混元具身基础模型 (HY-Embodied-0.5)
year: '2026.04'
org: Tencent Robotics X / HY Vision
paper_url: https://arxiv.org/abs/2604.07430
category: vlm_finetune
parent: univla
motivation: MoT与视觉潜在Token增强空间感知，并蒸馏2B边缘具身模型
```

#### 📝 一句话总结
HY-Embodied-0.5 提出了一套面向真实世界具身智能体的基础模型体系，通过 Mixture-of-Transformers、视觉潜在 Token、迭代式具身后训练和大到小 on-policy 蒸馏，同时提升空间感知、具身推理和边缘部署能力，并把强 VLM 能力有效迁移到真实机器人控制。

#### 🎯 核心要点
- 提出 **HY-Embodied-0.5** 系列：包含面向边缘部署的 **MoT-2B** 和面向复杂推理的 **MoE-A32B**
- 采用 **Mixture-of-Transformers (MoT)**，用模态专属的 QKV、FFN 和注意力机制解耦视觉与文本计算
- 引入 **visual latent tokens**，增强细粒度视觉表征，并强化视觉与语言之间的桥接
- 使用 **HY-ViT 2.0** 原生分辨率视觉编码器，支撑空间与具身任务所需的精细视觉感知
- 训练配方分为 **大规模 pre-training / mid-training / embodied post-training / on-policy distillation** 多阶段
- 具身后训练采用 **iterative self-evolution + reinforcement learning**，重点提升长链具身推理与规划
- 通过 **large-to-small on-policy distillation** 把 32B 大模型的推理与感知能力迁移给 2B 小模型
- 在 **22 个 benchmark** 上评估视觉感知、空间推理和具身理解，并进一步训练 VLA 在真实机器人任务上取得竞争力结果

#### 🔬 深入细节
##### 核心架构图

![HY-Embodied-0.5 MoT 架构总览](https://arxiv.org/html/2604.07430v1/x2.png)
*图：HY-Embodied-0.5 的 Mixture-of-Transformers 架构。论文把视觉与语言 Token 的主干计算显式解耦，同时通过视觉潜在 Token 和混合优化目标重新把多模态语义绑定起来。*

##### 训练流程图

![HY-Embodied-0.5 训练流程](https://arxiv.org/html/2604.07430v1/x5.png)
*图：训练管线示意。模型先通过大规模预训练建立多模态与空间感知基础，再通过具身后训练强化推理，最后做大模型到边缘模型的 on-policy 蒸馏。*

##### 核心伪代码

```python
# HY-Embodied-0.5 simplified training recipe
# x_v: visual tokens, x_t: text tokens

z_v = HYViT2(x_v)                               # native-resolution visual encoder
z_v = append_visual_latents(z_v)                # add visual latent tokens

h_v = visual_blocks(z_v)                        # modality-specific visual path
h_t = text_blocks(x_t)                          # modality-specific language path
h = cross_modal_fuse(h_v, h_t)                  # mixed optimization aligns modalities

# stage 1/2: pre-training + mid-training
loss_mm = loss_next_token(h) + loss_visual_aux(h_v)
update(loss_mm)

# stage 3: embodied post-training
for iteration in range(K):
    reasoning_traces = self_evolve(h)
    loss_post = sft_loss(reasoning_traces) + rl_loss(reasoning_traces)
    update(loss_post)

# stage 4: large-to-small distillation
teacher_action = large_model.rollout(obs, instruction)
student_action = small_model.rollout(obs, instruction)
loss_distill = on_policy_distill(student_action, teacher_action)
update(loss_distill)
```

##### 动机与背景

很多通用 VLM 已经具备强视觉语义理解能力，但把它们直接拿来做具身智能仍然会遇到两个短板。第一，具身任务比网页问答或图文理解更依赖精细的空间关系、时序变化和交互可供性，普通多模态预训练并不会天然学到这些能力。第二，真实机器人部署要求同时兼顾强推理和低延迟，这意味着单一的大模型路线很难既做复杂具身推理，又稳定落到边缘控制系统。

HY-Embodied-0.5 的做法是把问题拆开处理。论文先承认“具身感知”和“语言推理”虽然相关，但在计算模式上并不完全相同，因此不再强行让所有 Token 走一套完全共享的 Transformer，而是给视觉和文本保留不同的主干计算路径。然后再通过专门设计的 latent token 和训练目标，把这些被解耦的表征重新拉回同一个具身语义空间。这是它相对普通统一式 VLM 的第一个关键转向。

第二个转向体现在训练流程上。论文并不满足于预训练阶段得到一个“会看会说”的模型，而是额外设计了具身后训练阶段，让模型学会更长链条的空间推断、预测、交互与规划。最后，再通过 on-policy 蒸馏把这些高阶能力压缩给小模型，使 2B 级别模型能进入真实部署场景。这说明 HY-Embodied-0.5 从一开始就不是单篇论文里常见的“只做模型结构创新”，而是一套面向真实 agent 的完整基础模型配方。

> 💡 关键：HY-Embodied-0.5 的核心不是单点技巧，而是“模态解耦的感知主干 + 具身导向的后训练 + 大到小蒸馏”三段式协同设计。

##### 核心机制一：Mixture-of-Transformers 与视觉潜在 Token

论文提出的 MoT 可以理解为“在同一个序列里保留多模态协同，但不要求视觉和文本完全共享内部算子”。传统统一式 Transformer 往往对所有 Token 采用同一组 QKV 投影、同一类 FFN 和同一注意力模式；HY-Embodied 则针对视觉分支保留更适合强感知建模的专属路径。直觉上，这样做可以减轻一个常见冲突：大量视觉训练虽然能提高感知精度，却可能拖累语言能力，而完全共享参数又会让两种模态彼此牵制。

如果把视觉 Token 记为 \(x_v\)，文本 Token 记为 \(x_t\)，那么模型的核心思想可以抽象成：

$$
h_v = f_v(x_v; \theta_v), \qquad h_t = f_t(x_t; \theta_t)
$$

其中 \(f_v\) 和 \(f_t\) 对应模态自适应的 Transformer 路径。随后模型再通过跨模态融合层把两者对齐：

$$
h = g(h_v, h_t)
$$

这里的重点不是公式本身，而是参数不再完全共享。视觉和语言仍然处于同一总体模型里，但中间计算过程被显式“专业化”了。

在这个框架上，论文又加入了 **visual latent tokens**。这些 Token 不是原始图像 patch，也不是自然语言词元，而是一组附加在视觉序列尾部的潜在表征，用来吸收高阶空间信息并加强视觉到语言的迁移。可以把它理解为一组专门为“具身理解”服务的视觉寄存器。它们通过额外监督学习哪些局部目标、接触关系和空间区域最值得被语言侧读取，从而改善细粒度感知。

> ⚠️ 注意：MoT 的重点不是简单扩大容量，而是避免“为了视觉训练牺牲语言”或“为了统一建模牺牲细粒度感知”这类多模态基础模型中的结构性矛盾。

##### 核心机制二：具身后训练与迭代式自演化推理

HY-Embodied-0.5 的另一条主线是后训练阶段。论文认为，仅靠大规模多模态预训练，模型虽然能识别图像内容，但不一定能在复杂场景里完成“观察环境 -> 推断可操作性 -> 规划交互步骤 -> 预测动作后果”这一整条推理链。因此作者单独设计了 embodied post-training，用迭代式自演化和强化学习进一步塑造推理能力。

这一步的直觉是：先让模型生成具身推理轨迹，再用后续轮次的训练去不断修正这些轨迹。论文把这种过程称为 **iterative self-evolution**。从训练视角看，它不是一次性监督模型输出答案，而是反复优化中间思考、空间分析和行动决策，使模型逐步形成更稳健的长链推理能力。其目标可以粗略写成：

$$
\mathcal{L}_{\text{post}} = \mathcal{L}_{\text{SFT}} + \lambda \mathcal{L}_{\text{RL}}
$$

其中 \(\mathcal{L}_{\text{SFT}}\) 负责把高质量具身轨迹教给模型，\(\mathcal{L}_{\text{RL}}\) 则进一步按照奖励信号偏置那些更符合空间、交互与任务完成要求的推理路径。

和传统“多模态模型加一点机器人数据微调”相比，这里的差异在于后训练目标更明确地面向 **具身 reasoning**。论文给出的例子强调模型会显式分析空间关系、物体状态、操作顺序与可供性，而不是仅靠语言先验猜测答案。也因此，它在空间和具身 benchmark 上的提升，不是单纯来自更多数据，而是来自更接近 agent 工作方式的训练范式。

##### 核心机制三：Large-to-Small On-Policy Distillation 与真实机器人控制

如果只有 32B 级别大模型表现好，这个体系仍然很难真正部署。HY-Embodied-0.5 的第三个关键设计是 **large-to-small on-policy distillation**。做法不是离线地把大模型 logits 蒸给小模型，而是让教师模型在真实 rollout 或近似真实策略分布下给出行为，再让学生模型在同一策略环境里学习这些行为。这样蒸馏出的不是孤立 token 分布，而是与交互过程一致的具身策略偏好。

从形式上，可以把它理解为最小化大小模型在同一状态分布上的策略差异：

$$
\mathcal{L}_{\text{distill}} = \mathbb{E}_{(o, a^T) \sim \pi_T}\left[\ell\big(\pi_S(o), a^T\big)\right]
$$

其中 \(\pi_T\) 是教师策略，\(\pi_S\) 是学生策略，\(o\) 是观测，\(a^T\) 是教师在 on-policy rollout 中产生的动作或决策。关键在于数据分布随教师策略而动，而不是只在静态离线语料上拟合。

论文最终把这种 VLM 基础能力迁移到 VLA 训练里，并在真实双臂机器人任务上评估了插接包装、餐具堆叠和杯子悬挂等任务。Figure 13 展示了真实世界 setup 与成功率统计，说明作者并不是停留在 benchmark 分数层面，而是验证了模型能否支撑真实控制链路。对 VLA 页面而言，这一点尤其重要，因为 HY-Embodied-0.5 更像“给机器人控制提供高质量认知底座”的上游 foundation model，而不是只做网页式多模态问答的通用 VLM。

##### 机器人结果图

![HY-Embodied-0.5 真实机器人评测](https://arxiv.org/html/2604.07430v1/x13.png)
*图：真实双臂平台上的任务设置与成功率结果。论文用同一批真实演示数据微调 VLA，并与 \(\pi_0\)、\(\pi_{0.5}\) 等基线比较。*

#### 🧪 练习题

```yaml
question: "HY-Embodied-0.5 中 Mixture-of-Transformers 的主要作用是什么？"
options:
  - "把所有视觉和语言 Token 强制共享同一套 QKV 与 FFN，以减少参数量"
  - "将视觉和文本 Token 分别交给模态专属计算路径处理，再通过跨模态机制重新对齐"
  - "仅用于把 32B 模型压缩成 2B 模型，与感知能力无关"
  - "把 VLA 的连续动作离散化成文本 Token，方便自回归解码"
answer: 1
explain: "MoT 的核心是模态自适应计算。它不是单纯做压缩，而是通过视觉和语言的专属 Transformer 路径减轻共享参数冲突，再借助潜在 Token 和融合训练保持多模态对齐。"
```
