### PREVALENT
```yaml
id: prevalent
name: PREVALENT
full_name: 预训练视觉语言导航 (PREVALENT)
year: '2020'
org: Microsoft
paper_url: https://arxiv.org/abs/2002.10638
category: vln
parent: envdrop
motivation: 大规模图像-文本-动作预训练范式
```

#### 📝 一句话总结
PREVALENT 提出 VLN 的预训练-微调范式，把指令、全景视觉状态和下一步动作组织成 image-text-action triplet，通过 masked language modeling 和 action prediction 预训练可迁移的导航视觉语言表征。

#### 🎯 核心要点
- **范式转变**：从在单个 R2R 任务上训练策略网络，转向先预训练通用 VLN 编码器，再迁移到 R2R、CVDN、HANNA 等导航任务。
- **三元组数据**：每个时间步被拆成 \((\boldsymbol{x},\boldsymbol{s}_t,\boldsymbol{a}_t)\)，即指令文本、当前 36-view 全景状态和专家下一动作。
- **大规模合成数据**：原始 R2R 只有约 104K step-level 样本，论文用 speaker 在 Matterport3D 最短路上生成约 6482K 新样本，使预训练规模可行。
- **双目标预训练**：image-attended masked language modeling 让语言恢复依赖视觉证据；action prediction 让融合表征直接服务导航决策。
- **可插拔迁移**：预训练编码器可作为下游 VLN 模型的初始化或特征模块，在 unseen 环境和跨任务迁移中降低过拟合。

#### 🔬 深入细节
![PREVALENT 预训练与微调范式](https://ar5iv.labs.arxiv.org/html/2002.10638/assets/x1.png)

*图：PREVALENT 先在 image-text-action triplets 上预训练，再迁移到 R2R、CVDN 和 HANNA 三类 VLN 下游任务。*

PREVALENT 的核心问题意识是：VLN 任务同时需要语言理解、视觉定位和动作选择，但标注轨迹远少于 BERT 或通用视觉语言预训练所需的数据规模。传统 VLN 方法通常为 R2R 设计一个策略网络，再通过 speaker 或 dropout 做任务内增强；PREVALENT 则把“先学通用导航表征，再微调策略”变成主线。

预训练样本来自轨迹的时间步切分。给定专家轨迹 \(\boldsymbol{\tau}=(\boldsymbol{s}_1,\boldsymbol{a}_1,\ldots,\boldsymbol{s}_T,\boldsymbol{a}_T)\) 和指令 \(\boldsymbol{x}\)，每个时间步形成一个 triplet \((\boldsymbol{x},\boldsymbol{s}_t,\boldsymbol{a}_t)\)。基础行为克隆目标可写成：

$$
\max_\theta \mathcal{L}_\theta(\boldsymbol{\tau},\boldsymbol{x})
=\log \pi_\theta(\boldsymbol{\tau}\mid \boldsymbol{x})
=\sum_{t=1}^{T}\log \pi_\theta(\boldsymbol{a}_t\mid \boldsymbol{s}_t,\boldsymbol{x}).
$$

视觉输入沿用全景动作空间：每个状态 \(\boldsymbol{s}_t=[s_1,\ldots,s_{36}]\) 包含 12 个水平朝向和 3 个俯仰角的 36 张视图。每个 view 的 embedding 由 CNN 图像特征、方向特征和位置/类型信息映射到 Transformer 维度。论文没有直接用 Faster R-CNN 区域特征，因为 36-view 全景中逐视角提 region 代价很高，且 VLN 更需要面向方向和动作的全景表示。

模型结构是 BERT 风格的多模态编码器：文本 token 进入 text Transformer，视觉 token 进入 vision Transformer，再通过 cross-modal Transformer 融合。论文中的配置示例为 \(L_{\text{text}}=9\)、\(L_{\text{vision}}=1\)、\(L_{\text{cross}}=3\)，最终跨模态输出记为：

$$
\boldsymbol{z}=\boldsymbol{h}_{L_{\text{cross}}}.
$$

\(\boldsymbol{z}\) 既包含指令 token 的上下文表示，也包含被视觉状态校准过的 `[CLS]`/动作相关表示，可作为下游导航模型的初始化表征。

第一个预训练目标是 image-attended masked language modeling。随机 mask 指令中的词，模型要在当前全景状态条件下恢复原 token：

$$
\mathcal{L}_{\mathrm{MLM}}
=-\sum_{i\in\mathcal{M}}\log p_\theta(x_i\mid \boldsymbol{x}_{\backslash \mathcal{M}},\boldsymbol{s}_t).
$$

与普通 BERT 的区别在于，恢复词不仅依赖句法上下文，还应利用视觉状态。例如“turn [MASK] at the stairs”在看到候选方向和楼梯位置时更容易被恢复为 right 或 left。这迫使文本表示吸收导航场景证据。

第二个预训练目标是 action prediction，论文也记为 \(\mathcal{L}_{\text{PA}}\)。模型基于融合后的图文状态预测专家下一动作：

$$
\mathcal{L}_{\mathrm{PA}}
=-\log p_\theta(\boldsymbol{a}_t\mid \boldsymbol{x},\boldsymbol{s}_t),\qquad
\mathcal{L}_{\mathrm{pre}}=\mathcal{L}_{\mathrm{MLM}}+\mathcal{L}_{\mathrm{PA}}.
$$

这个目标是 PREVALENT 区别于通用图文匹配预训练的关键。普通 VLP 只要求图像和文字语义匹配，而 VLN 需要知道“当前状态下该往哪走”；把动作预测纳入预训练，相当于把语言 grounding 直接连接到导航决策。

```python
def prevalent_pretrain(human_r2r, matterport_routes, speaker):
    human_triplets = trajectory_to_triplets(human_r2r)  # about 104K samples

    synthetic_pairs = []
    for route in matterport_routes:
        instruction = speaker.generate(route)
        synthetic_pairs.append((route, instruction))
    synthetic_triplets = trajectory_to_triplets(synthetic_pairs)  # about 6482K samples

    encoder = VLNTransformer(text_layers=9, vision_layers=1, cross_layers=3)

    for instruction, state_36_views, expert_action in batch(
        human_triplets + synthetic_triplets
    ):
        masked_instruction, masked_positions = mask_words(instruction)
        fused = encoder(masked_instruction, state_36_views)

        loss_mlm = predict_masked_words(fused, instruction, masked_positions)
        loss_pa = predict_next_action(fused, expert_action)
        update(encoder, loss_mlm + loss_pa)

    return encoder  # used to initialize/fine-tune downstream VLN agents
```

大规模合成数据是 PREVALENT 能工作的前提。论文指出 R2R 原始 step-level 样本量约 104K，比语言或视觉语言预训练常见规模小一个数量级；因此先训练 speaker，再在 Matterport3D Simulator 中收集大量最短路线并生成指令，得到约 6482K 新样本。也就是说，PREVALENT 不是抛弃 Speaker-Follower，而是把 speaker 从“任务内增强器”升级为“预训练语料生成器”。

相对 EnvDrop，PREVALENT 的改进方向也不同。EnvDrop 主要通过视觉特征扰动提升单任务 unseen 泛化；PREVALENT 则学习一个可迁移的图文动作编码器，让下游任务从更好的初始化开始。它的局限是预训练样本多为单步 triplet，对完整历史、已完成子目标和长程记忆建模不足；后续 VLN-BERT、HAMT 等方法继续沿着历史状态建模方向推进。

#### 🧪 练习题
```yaml
question: "PREVALENT 为什么要在预训练中加入 action prediction，而不只做图文匹配或 MLM？"
options:
  - "因为 VLN 的目标是生成更长的自然语言指令"
  - "因为 action prediction 把视觉语言对齐直接约束到下一步导航决策上"
  - "因为它可以完全替代下游微调"
  - "因为它能避免使用全景视觉输入"
answer: 1
explain: "VLN 不只需要判断图文是否相关，还要在当前状态下选择动作；action prediction 让融合表征学习与导航策略相关的对齐。"
```
