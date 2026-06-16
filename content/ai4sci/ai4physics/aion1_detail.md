### AION-1 — 天文基础模型 (AION-1)

```yaml
id: aion1
name: AION-1
full_name: 天文基础模型 (AION-1)
year: '2026'
org: Flatiron Institute
paper_url: https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/
category: physics_constrained
parent: —
motivation: 31亿参数统一39种观测模态
```

#### 📝 一句话总结

AION-1 提出了面向天文学的 omnimodal foundation model：先把图像、光谱、测光和标量目录量统一离散成 token，再用 Transformer 编码器-解码器做跨模态 masked modeling，从而用一个冻结骨干处理缺失模态、多模态融合和跨模态生成。

#### 🎯 核心要点

- **39 种观测模态统一建模**：覆盖 Legacy Survey、HSC、SDSS、DESI、Gaia 的多波段图像、低/高分辨率光谱、测光、红移、形状、视差和天球坐标等数据
- **大规模预训练语料**：基于超过 2 亿个恒星、星系和类星体观测，数据量约百 TB 级，强调同一天体在不同巡天/仪器下的关联
- **两阶段架构**：Universal Tokenization of Diverse Data 将异构科学观测离散化；Multimodal Masked Modeling 学习任意已观测 token 到目标 token 的条件分布
- **模态特异 tokenizer**：图像、光谱、标量和标量场分别使用适配其物理形态的 tokenization，避免把不同仪器数据粗暴重采样到同一格式
- **Transformer encoder-decoder**：编码器接收任意模态组合，解码器通过 query token 预测被遮蔽模态，可用于表示学习和条件生成
- **模型规模族**：论文/项目释放从约 300M 到 3.1B 参数的 AION-1 变体，最大模型接近 31 亿参数
- **冻结骨干下游适配**：常用流程是冻结 encoder，对 mean pooling 或 attention pooling 的 embedding 加线性/MLP/CNN 小头
- **代表性任务**：星系/恒星物理参数估计、星系形态分类、强引力透镜检索、星系分割、红移估计、Gaia 到 DESI 的光谱超分辨率
- **来源追溯说明**：任务给出的 Simons Foundation 链接是新闻页；方法级细节主要来自论文 `https://arxiv.org/abs/2510.17960`、项目页 `https://polymathic-ai.org/blog/aion-1/` 和代码仓库 `https://github.com/PolymathicAI/AION`

#### 🔬 深入细节

##### 核心架构示意

![AION-1 数据 tokenization、Transformer 与下游任务总览](https://raw.githubusercontent.com/PolymathicAI/AION/main/assets/aion.png)
*图：AION-1 先把图像、光谱、分割图和物理参数转换为离散 token，再通过统一 Transformer encoder-decoder 建模，最后把 encoder embedding 或 decoder 生成能力用于回归、分割和检索等任务。*

##### 算法伪代码

```python
# AION-1 预训练与下游使用伪代码

for object_id in astronomical_objects:
    raw_modalities = load_available_observations(
        object_id,
        surveys=["Legacy", "HSC", "SDSS", "DESI", "Gaia"],
    )

    token_stream = []
    for modality, raw_value in raw_modalities.items():
        tokenizer = tokenizer_registry[modality]
        z = tokenizer.encode(raw_value)             # image/spectrum/scalar -> discrete tokens
        token_stream.extend(add_modality_and_position(z, modality))

    observed, target = sample_observed_and_target_tokens(token_stream)
    h = transformer_encoder(observed)
    logits = transformer_decoder(query_tokens(target), h)
    loss = cross_entropy(logits, target.token_ids)
    update(loss)

# 下游任务：冻结 encoder，只训练轻量 probe/head
tokens = encode_available_modalities(new_object)
hidden = frozen_aion_encoder(tokens)
embedding = mean_pool(hidden)                       # 或 attentive pooling
prediction = task_head(embedding)
```

##### 任务背景：天文数据不是普通多模态数据

天文学的难点不是简单的“图像 + 文本”融合，而是同一个物理天体会被不同巡天、望远镜、滤波器、曝光深度和光谱分辨率观察到。传统做法通常为每个任务和每个数据源训练专用模型，例如图像形态分类用 CNN、光谱参数估计用 1D 网络、测光红移用树模型或小型 MLP。这种拆分会造成两个问题：一是缺失模态时很难复用模型，二是跨仪器的物理关联无法在一个共享表示中积累。

AION-1 的方法选择不是把所有数据强行投到连续向量后拼接，而是先离散化为 token。对第 \(m\) 个模态在位置 \(t\) 的 token \(z_{m,t}\)，编码器输入可抽象为：

$$
e_{m,t}
= \mathrm{Embed}_m(z_{m,t}) + a_m + p_t,
$$

其中 \(\mathrm{Embed}_m\) 是模态特异 token embedding，\(a_m\) 是模态/来源 embedding，\(p_t\) 是位置 embedding。AION-1 特别强调 provenance：来自不同仪器的图像即使同属 image，也使用不同模态/来源 embedding，让模型感知分辨率、噪声和巡天选择函数差异。

##### Universal Tokenization：把异构观测变成同一种建模对象

图像和标量场可使用类似 VQ/FSQ autoencoder 的离散瓶颈；光谱 tokenizer 需要保留波长网格、通量和噪声信息；标量目录量则可先做经验 CDF 映射和 Gaussianization，再量化到固定 codebook。一个简化的标量 tokenization 可写成：

$$
s = \Phi^{-1}(\hat{F}(x)),
\qquad
q = \arg\min_k |s-c_k|,
$$

其中 \(\hat{F}\) 是该物理量在训练集上的经验分布，\(\Phi^{-1}\) 是标准正态逆 CDF，\(c_k\) 是固定量化中心。这样做的直觉是：红移、通量、视差等标量常有长尾，直接等宽分桶会浪费 token；在概率空间分桶能让每个 bin 获得更均衡的样本量。

##### Multimodal Masked Modeling：学习任意模态到任意模态的条件关系

给定一个天体的全部可用 token 集合 \(X\)，训练时随机抽取已观测集合 \(O\) 和目标集合 \(T\)。编码器只看 \(O\)，解码器接收目标位置/模态 query，但不接收目标 token 的真实值：

$$
q_{m,t}=a_m+p_t.
$$

训练目标是最大化目标 token 的条件似然，等价于最小化交叉熵：

$$
\mathcal{L}_{\mathrm{M3}}(\theta)
=
-\sum_{(m,t)\in T}
\log p_{\theta}\!\left(
z_{m,t}\mid
\{z_{i,j}:(i,j)\in O\},
\{q_{m,t}:(m,t)\in T\}
\right).
$$

这个目标比传统 contrastive image-spectrum 对齐更灵活：它不要求每个样本拥有完整模态，也不只学习配对模态之间的相似度，而是直接训练“给定任意一组观测，预测另一组观测 token”的能力。因此 AION-1 可以用 Legacy 图像 + 测光预测红移，也可以用 Gaia 低分辨率光谱条件生成 DESI 高分辨率光谱样本。

##### 推理方式：冻结 embedding 与条件生成

做回归或分类时，AION-1 通常丢弃 decoder，冻结 encoder，把任意模态组合的 token 序列编码成 contextualized hidden states \(H_1,\ldots,H_N\)。最简单的对象级 embedding 是 mean pooling：

$$
h_{\mathrm{mean}}=\frac{1}{N}\sum_{t=1}^{N}H_t.
$$

更强的任务适配可用 attention pooling：

$$
\alpha_t=\mathrm{softmax}(q^\top W_k H_t),
\qquad
h_{\mathrm{attn}}=\sum_t \alpha_t W_v H_t.
$$

这解释了 AION-1 的工程价值：同一个 encoder 可接收只有测光的对象、只有图像的对象，或图像+光谱+标量的组合；下游只需训练小型 head，而不必为每种缺失模式设计单独融合网络。

条件生成时，decoder 对目标模态的离散 token 给出分类分布，再用对应 tokenizer 的 decoder 还原到图像、光谱或标量空间。论文展示了红移 posterior 样本和 Gaia 到 DESI 的光谱超分辨率，但也提醒：当前迭代揭示式采样给出的更应理解为 plausible samples，不应直接当作严格校准的高维联合后验。

##### 与传统天文模型的区别

| 方法 | 输入假设 | 学习目标 | 下游迁移方式 | 局限 |
|------|----------|----------|--------------|------|
| 单任务监督模型 | 固定模态、固定任务 | 标签监督损失 | 重新训练或微调整网 | 数据需求高，跨巡天复用弱 |
| Contrastive 多模态模型 | 通常依赖成对模态 | 对比学习对齐 embedding | 取相似度或冻结特征 | 难以预测任意缺失模态 |
| AION-1 | 任意可用模态组合 | 跨模态 masked token prediction | 冻结 encoder + 小 head，或 decoder 条件生成 | tokenization 会丢失部分连续信息，预训练选择函数会影响后验 |

> 💡 关键：AION-1 的“物理约束”不来自显式 PDE，而来自大规模真实观测的跨仪器、跨模态一致性；模型通过预测同一天体的不同观测来学习天体物理结构。

##### 实用限制

AION-1 的统一性依赖 tokenizer 质量。离散化会压缩连续信息，尤其对弱谱线、小尺度形态或极端稀有目标可能有损失。预训练数据来自特定巡天和质量筛选，其 embedding 会继承选择函数偏差；在科学测量中仍需要代表性校准集、误差评估和外推检测。对生成任务，decoder 输出的 token 分布不能自动保证物理量之间的联合校准，因此更适合做候选生成、缺失模态补全和表示学习，而不是替代完整的统计推断流程。

#### 🧪 练习题

```yaml
question: "AION-1 相比传统 image-spectrum contrastive 模型的核心优势是什么？"
options:
  - "只训练图像 encoder，因此推理更快"
  - "通过跨模态 masked token prediction 支持任意观测组合到任意目标模态的预测"
  - "完全不需要 tokenizer，直接拼接所有原始数据"
  - "显式求解天体动力学 PDE，因此不需要观测数据"
answer: 1
explain: "AION-1 将多种观测离散成 token，并随机选择 observed/target token 做条件预测，因此天然适配缺失模态、多模态融合和跨模态生成。"
```
