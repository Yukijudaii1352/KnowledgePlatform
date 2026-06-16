### AION-1：AION-1 (AION-1)
```yaml
id: aion1
name: AION-1
full_name: AION-1 (AION-1)
year: '2025'
org: Polymathic AI
paper_url: https://polymathic-ai.org/news/aion-1
category: unified_foundation
parent: —
motivation: 十亿参数多模态天文学基础模型
```

#### 📝 一句话总结
AION-1 提出了面向天文学的多模态基础模型族，把图像、光谱和标量观测统一离散为 token，再用 Transformer encoder-decoder 做跨模态 masked modeling，从而学习可用于检索、参数估计和条件生成的天体级通用表示。

#### 🎯 核心要点
- 数据模态：整合 39 类天文数据模态，包括多波段图像、光谱、光度、红移、Gaia BP/RP 系数、天体形态和其他标量属性。
- 两阶段结构：先用模态专用 tokenizer 把异构观测离散化，再用统一 Transformer 对跨模态 token 序列做 masked prediction。
- 训练目标：借鉴 4M multimodal masked modeling，从所有可用模态中采样 observed tokens 与 target tokens，最大化 \(p_\theta(x^{tgt}\mid x^{obs})\)。
- 模型规模：AION-1-B/L/XL 分别约 300M、800M、3B 参数，XL 已达到十亿参数级多模态天文学基础模型。
- 早期融合：同一个 encoder 处理图像、光谱与标量 token；多模态输入只需拼接 token，不需要额外 late-fusion 模块。
- 下游使用：常把 encoder 冻结为特征提取器，再训练轻量 head 做星系性质估计、恒星参数估计、形态分类和稀有天体检索。
- 来源说明：任务给出的是官方新闻/项目页；本文同时依据官方博客 `https://polymathic-ai.org/blog/aion-1/`、论文 `https://arxiv.org/abs/2510.17960` 和 HTML `https://arxiv.org/html/2510.17960v1` 撰写。

#### 🔬 深入细节
##### 图示与来源
![AION-1 多模态框架](https://arxiv.org/html/2510.17960v1/figures/aion.png)
*图：AION-1 论文 Figure 1，展示多类天文观测先经专用 tokenizer 统一成 token，再进入多模态 masked modeling 框架。*

可访问来源：官方博客为 `https://polymathic-ai.org/blog/aion-1/`，论文 HTML 为 `https://arxiv.org/html/2510.17960v1`，代码入口为 `https://github.com/PolymathicAI/AION/`。

##### 机制拆解
AION-1 面对的是天文学中非常典型的异构观测问题：同一个天体可能同时有 Legacy Survey 或 HSC 图像、SDSS/DESI 光谱、Gaia 低分辨率系数、光度、红移和形态参数。传统做法通常为每个 survey、每种任务分别训练模型；AION-1 则把所有观测变成统一 token 序列，使模型学习“不同观测其实描述同一个物理对象”的联合分布。

第一阶段是 tokenization。图像、光谱、标量和 scalar field 不能直接共用原始数值空间，因此 AION-1 为每类数据设计专用 tokenizer。标量 tokenization 尤其强调分布自适应：先用训练集经验 CDF 把原始标量 \(x\) 映射到近似标准正态空间，再做有限级别量化。可概括为：

$$
z=\Phi^{-1}(\hat{F}(x))
$$

其中 \(\hat{F}\) 是经验 CDF，\(\Phi^{-1}\) 是标准正态分布的逆 CDF。这样长尾标量在量化空间中不会把大量概率质量挤在少数 bins 里。

第二阶段是 multimodal masked modeling。设一个训练样本的可用模态 token 序列为：

$$
\mathbf{X}=\{\mathbf{x}_1,\ldots,\mathbf{x}_M\}
$$

训练时从全部 token 池中采样两个不相交子集：observed tokens \(\mathbf{x}^{obs}\) 作为 encoder 输入，target tokens \(\mathbf{x}^{tgt}\) 作为 decoder 查询目标。目标函数为：

$$
\mathcal{L}_{\mathrm{4M}}(\theta)
=-\sum_{t=1}^{N}\log p_\theta(\mathbf{x}_t^{tgt}\mid \mathbf{x}_t^{obs})
$$

这使 AION-1 既学习同模态重建，也学习跨模态转换。例如给定低分辨率 Gaia BP/RP 系数预测高分辨率 DESI 光谱，或给定图像 token 预测标量属性 token。

AION-1 的 encoder 输入 embedding 同时包含 token value、模态/来源标识和位置：

$$
\mathbf{e}_{t}^{(\mathrm{enc})}
=\mathrm{Embed}_{i}(x_t^i)+\mathbf{m}_i+\mathbf{p}_t
$$

decoder 查询 token 不包含待预测值，只告诉模型“要预测哪个模态、哪个位置”：

$$
\mathbf{e}_{t}^{(\mathrm{dec})}
=\mathbf{m}_i+\mathbf{p}_t
$$

这里 \(\mathbf{m}_i\) 不只是数据类型标识，还包含来源/仪器信息；两个图像即便都是 image modality，只要来自不同 survey，也会使用不同的 modality embedding。这一点对天文学很重要，因为仪器、分辨率、噪声和选择函数本身携带观测先验。

##### 训练与推理伪代码
```python
# AION-1 multimodal masked modeling
for object_record in astronomy_loader:
    token_pool = []
    for modality in available_modalities(object_record):
        tokenizer = tokenizer_registry[modality]
        tokens = tokenizer.encode(object_record[modality])
        token_pool.extend(add_modality_and_position_metadata(tokens, modality))

    observed = sample_input_tokens(token_pool, budget=256)
    targets = sample_target_tokens(token_pool - observed, budget=128)

    enc = transformer_encoder(embed_value_modality_position(observed))
    dec_query = embed_modality_position_only(targets)
    logits = transformer_decoder(dec_query, cross_attend_to=enc)

    loss = cross_entropy(logits, targets.values)
    loss.backward()
    optimizer.step()
```

下游阶段通常不重新训练整个基础模型，而是冻结 encoder 并抽取对象级 embedding。论文给出两类 pooling：平均池化以及带可学习 query/key/value 的 attentive pooling。多模态输入只需把各模态 token 拼接后送入同一 encoder，表示中已经包含预训练阶段学到的跨模态关系。对于小样本科学任务，这种流程比端到端监督模型更省标注，也更容易把研究者的校准集和选择函数纳入轻量 head。

> 💡 关键：AION-1 的核心不是单个更强的图像模型或光谱模型，而是把天文学观测统一成“可相互预测的 token 语言”，让模型学习同一物理天体在不同仪器和模态下的联合表示。

#### 🧪 练习题
```yaml
question: "AION-1 的 multimodal masked modeling 为什么适合异构天文数据？"
options:
  - "它把不同模态都离散成 token，并训练模型根据可见模态预测被遮盖模态"
  - "它要求所有 survey 使用完全相同的图像分辨率和噪声模型"
  - "它只训练图像分类器，不处理光谱和标量"
  - "它在推理时必须为每个下游任务重新预训练基础模型"
answer: 0
explain: "AION-1 通过模态专用 tokenizer 和跨模态遮盖预测，把图像、光谱和标量放进统一 token 空间，适合处理观测来源复杂的天文学数据。"
```
