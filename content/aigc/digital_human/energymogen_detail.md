### EnergyMoGen
```yaml
id: energymogen
name: EnergyMoGen
full_name: "能量基组合运动生成 (Compositional Human Motion with EBM)"
year: "2025"
org: "CVPR 2025"
paper_url: "https://arxiv.org/abs/2405.03456"
category: body_motion
parent: mdm
motivation: "EBM潜在扩散组合运动生成"
```

#### 📝 一句话总结
EnergyMoGen 从能量模型视角重写 latent motion diffusion，用 latent-aware 与 semantic-aware 两类 EBM 组合多个文本概念，并通过 Synergistic Energy Fusion 同时缓解语义错配、脚滑和动作抖动。

#### 🎯 核心要点
- Latent-aware EBM：把扩散模型的去噪分布视作 latent 空间中的能量项，支持多个扩散模型/条件的 conjunction 与 negation。
- Semantic-aware EBM：基于 cross-attention 构造语义能量，对文本 embedding 做自适应梯度下降，增强多概念 prompt 的可组合性。
- Synergistic Energy Fusion：融合 latent-aware、semantic-aware 和 multi-concept generation 的分布，减少文本错配和运动失真。
- 新操作：不仅支持“概念 A and 概念 B”，还支持“概念 A but not 概念 B”的 negation 组合。
- 资料限制：manifest 中 `2405.03456` 与 EnergyMoGen 题名不匹配；本文使用公开论文 `https://arxiv.org/abs/2412.14706` 和项目页图源。

#### 🔬 深入细节
##### 核心示意图/框架图
![EnergyMoGen framework](https://jiro-zhang.github.io/EnergyMoGen/static/images/Framework.png)
*图：EnergyMoGen 框架。方法从 latent-aware 和 semantic-aware 两条能量谱系组合动作概念，并用 SEF 融合。*

##### 核心流程伪代码
```python
# EnergyMoGen compositional sampling
def compose_motion(prompts, negative_prompts=None):
    z = randn_latent()
    text_embeds = text_encoder(prompts)
    neg_embeds = text_encoder(negative_prompts or [])

    for t in reversed(diffusion_steps):
        # latent-aware energy: combine denoising scores
        scores = [diffusion_score(z, t, e) for e in text_embeds]
        neg_scores = [diffusion_score(z, t, e) for e in neg_embeds]
        score_latent = sum(scores) - sum(neg_scores)

        # semantic-aware energy: update text embeddings by attention energy gradient
        energy = cross_attention_energy(z, text_embeds)
        text_embeds = text_embeds - gamma * grad(energy, text_embeds)
        score_semantic = diffusion_score(z, t, fuse(text_embeds))

        score = synergistic_energy_fusion(score_latent, score_semantic)
        z = denoise_step(z, t, score)
    return motion_decoder(z)
```

##### 方法解读
组合运动生成的难点是“多个语义同时成立”。例如“左手挥动，同时向前走，并且不要跳跃”要求模型在时间、身体部位和语义层面组合多个约束。普通 text-to-motion diffusion 通常把整句 prompt 编成一个条件向量，容易只满足最显著概念，或把多个动作混成不自然的平均动作。

EnergyMoGen 用 EBM 语言描述这个问题。能量模型定义：
$$
p_\theta(X)=\frac{\exp(-E_\theta(X))}{Z(\theta)}.
$$
低能量代表更符合目标概念的运动。能量的可加性让组合变得自然：conjunction 可近似为多个能量相加，negation 可通过提高某个概念对应区域的能量来排斥它。

Latent-aware EBM 将扩散模型的 score/去噪方向看成 latent 分布的能量梯度。多个 prompt 对应多个条件 score，组合时对这些 score 做加权加减。直觉上，每个 score 都在告诉 latent “朝满足这个概念的方向移动”，conjunction 就是同时听多个方向，negation 则从不想要的概念方向移开。

Semantic-aware EBM 则从 cross-attention 入手。多概念 prompt 的文本 embedding 可能在注意力中竞争或错位，论文对 attention energy 求梯度并自适应更新文本 embedding，使模型更清楚哪个概念应该约束哪个身体部位或时间片段。这个机制能提升语义覆盖，但单独使用可能引入脚滑和抖动。

Synergistic Energy Fusion 是平衡器：latent-aware 组合语义稳定但可能文本错配，semantic-aware 组合更灵活但可能运动失真。SEF 将两者的分布和 multi-concept generation 结果融合，保留复杂概念组合能力，同时约束物理连续性和足部接触。

#### 🧪 练习题
```yaml
question: "EnergyMoGen 中 negation 组合的直觉是什么？"
options:
  - "删除所有文本条件，只做无条件生成"
  - "把不想要概念对应的能量方向从组合 score 中排斥出去"
  - "只训练一个更大的 VAE"
  - "把所有动作裁剪成同一长度"
answer: 1
explain: "在能量视角下，conjunction 组合低能量区域，negation 则提高或减去不希望概念的吸引方向，使采样远离该概念。"
```
