### ESM3

```yaml
id: esm3
name: ESM3
full_name: 进化尺度建模3 (Evolutionary Scale Modeling 3)
year: '2024'
org: EvolutionaryScale
paper_url: https://www.evolutionaryscale.ai/blog/esm3-release
category: protein_structure
parent: esm2
motivation: 98B参数序列-结构-功能协同生成
```

#### 📝 一句话总结

ESM3 提出了序列、结构、功能三轨离散 token 的生成式蛋白质语言模型，用统一 Transformer 同时补全三种模态，解决了 ESM-2 主要从序列学习表征、难以直接按结构和功能约束生成蛋白的问题。

#### 🎯 核心要点

- **三轨蛋白语言模型**：把 amino-acid sequence、3D structure 和 biological function 都转成离散 token track，在同一个 Transformer 中联合建模
- **生成式 masked language modeling**：训练时对序列、结构、功能 token 部分遮盖，目标是在上下文和其他模态条件下预测被遮盖位置
- **结构离散化**：用结构 tokenizer/VQ-VAE 将三维蛋白结构编码为结构 token，再由结构解码器把 token 还原为三维坐标
- **功能离散化**：用 InterPro、Gene Ontology 等注释的文本语义构造 per-residue function tokens，使模型能用功能关键词作为提示
- **任意模态条件生成**：推理时可输入部分序列、局部结构、功能关键词或它们的组合，模型通过迭代 unmask 生成缺失 track
- **规模化训练**：最大模型 98B 参数，官方说明训练使用约 \(1.07\times10^{24}\) FLOPs、2.78B proteins 和 771B unique tokens
- **合成数据增强**：由于实验结构和功能注释稀缺，训练集中加入大量预测结构和预测功能，扩展多模态监督覆盖面
- **可编程蛋白设计**：论文报告用多模态提示生成远离已知天然序列的荧光蛋白 esmGFP，序列身份约 58%，被解释为跨越超过 5 亿年自然演化距离
- **开放模型族**：Biohub/ESM3 公开了 1.4B 小模型权重和 API/SDK，7B 与 98B 模型通过平台访问或用于论文结果复现

#### 🔬 深入细节

##### 架构总览

![ESM3 多轨 Transformer 架构](https://github.com/Biohub/esm/raw/main/_assets/esm3_diagram.png)
*图：Biohub/ESM 官方 README 中的 ESM3 架构图，展示 sequence、structure、SS8、SASA、function 等 token track 经逐位置 embedding 求和后进入 Transformer，并为每个 track 输出 logits。*

可访问来源：任务给出的官方发布页是 `https://www.evolutionaryscale.ai/blog/esm3-release`；论文正式版本为 Science DOI `https://www.science.org/doi/10.1126/science.ads0018`；开源使用说明与架构图在 `https://github.com/Biohub/esm/blob/main/_assets/ESM3_README.md`。bioRxiv/Science 全文在部分环境下可能受访问限制，因此这里的方法级细节主要基于官方发布页、可访问的官方 README、论文摘要和开源实现说明。

##### 核心流程伪代码

```python
# ESM3 训练与生成的抽象伪代码
def train_esm3(protein_batch):
    losses = []
    for protein in protein_batch:
        seq_tokens = tokenize_amino_acids(protein.sequence)
        struct_tokens = structure_vqvae.encode(protein.coordinates)
        func_tokens = tokenize_function_annotations(
            interpro=protein.interpro_terms,
            go_terms=protein.go_terms,
        )

        tracks = {
            "sequence": seq_tokens,
            "structure": struct_tokens,
            "function": func_tokens,
            "ss8": tokenize_secondary_structure(protein.coordinates),
            "sasa": discretize_sasa(protein.coordinates),
        }
        corrupted, mask_index = partially_mask_tracks(tracks)
        logits = transformer(sum_positionwise_embeddings(corrupted))

        losses.append(sum_cross_entropy(logits, tracks, mask_index))

    optimizer.step(mean(losses))


def generate_with_esm3(prompt_tracks, target_track, num_steps):
    tracks = fill_missing_positions_with_mask(prompt_tracks)
    for step in range(num_steps):
        logits = model(tracks)
        positions = choose_masked_positions_to_unmask(step, tracks)
        sampled_tokens = sample(logits[target_track][positions])
        tracks[target_track][positions] = sampled_tokens
    return decode_tracks(tracks)
```

##### 为什么要把结构和功能也写成“语言”

ESM-2 已经证明，仅用蛋白质序列训练大模型，也能学到大量结构和功能信息。但序列语言模型的生成约束仍然间接：如果用户想要“某个活性位点几何形状”或“某类水解酶功能”，模型只能通过序列统计去猜。ESM3 的核心转变是把结构和功能也显式变成 token，使提示空间从一条氨基酸序列扩展为多轨蛋白程序。

在输入端，序列 token 表示氨基酸；结构 token 表示局部三维构象；功能 token 表示来自 InterPro/GO 等注释的语义。多个 track 在同一 residue 位置上分别查 embedding，然后逐位置求和，得到 Transformer 的输入表示。这样，一个位置的隐藏状态同时携带“这里是什么氨基酸”“这里应处于什么局部结构”“这里承担什么功能”的条件。

##### 多轨 masked language modeling

ESM3 的训练目标可以写成多模态遮盖重建。设模态集合为 \(\mathcal{M}\)，包括 sequence、structure、function 以及辅助结构属性；第 \(m\) 个 track 的第 \(i\) 个真实 token 为 \(y_{m,i}\)，被遮盖集合为 \(\Omega_m\)。模型在被破坏的多轨输入 \(\tilde{Y}\) 上预测原始 token：

$$
\mathcal{L}_{ESM3}
=
\sum_{m \in \mathcal{M}} \lambda_m
\sum_{i \in \Omega_m}
\operatorname{CE}\left(
y_{m,i},
p_\theta(y_{m,i}\mid \tilde{Y})
\right)
$$

这个目标的直觉很直接：如果 structure track 被遮盖，模型要从序列和功能推断结构；如果 sequence track 被遮盖，模型要做受结构/功能约束的 inverse folding；如果 function track 被遮盖，模型要从序列和结构推断功能。统一目标让同一个模型可以在不同任务之间共享表示。

> 💡 关键：ESM3 不是先训练一个序列模型，再外挂结构预测头；它把多种蛋白属性都离散成 token，从预训练开始就学习它们之间的条件分布。

##### 结构 token：用离散瓶颈处理三维几何

蛋白结构本来是连续坐标，直接放入普通 Transformer 会遇到旋转平移等变性、坐标噪声和长度扩展问题。ESM3 采用结构 tokenizer，把三维结构编码到离散 token 空间，再让语言模型处理这些 token。开源说明与相关论文材料显示，结构输出头会产生结构 token logits，结构解码器再把 token 序列重建为坐标。

这种做法牺牲了一部分连续几何精度，但换来两个好处。第一，结构可以和序列、功能一样走大规模 token 语言建模路线，训练和采样都更统一。第二，结构 token 是可遮盖、可补全、可提示的：用户可以固定某个 motif 的结构 token，让模型生成兼容该局部几何的其余序列和结构。

##### 功能 token：从注释文本到 residue-level 条件

功能注释天然不是单一类别，而是来自 InterPro、GO term、关键词和层级关系的稀疏文本语义。ESM3 将这些功能描述压缩成 per-residue 的离散 function tokens，使功能提示能进入同一 Transformer。官方发布页强调，模型可以用功能关键词参与提示，例如用 \(\alpha/\beta\) hydrolase 这样的功能/折叠提示来生成 PETase 活性位点支架。

功能 token 的意义在于把“我要一种有某类功能的蛋白”转成模型可条件化的离散输入。传统 protein language model 通常只能无条件采样或用后验筛选；ESM3 则能在生成时直接给定功能轨道，让模型在采样过程中同时满足序列合理性、结构可折叠性和功能语义。

##### 迭代 unmask：从提示到可控生成

ESM3 的生成不是一次性从左到右输出，而是类似 masked diffusion 的迭代补全。初始时，未知位置填 `<mask>`；每一步模型对所有 track 输出 logits；采样器选择一部分位置解除遮盖，并把采样 token 写回输入。重复若干步后，目标 track 全部被补齐。

这种采样方式适合蛋白设计，因为约束通常不是前缀式的。用户可能固定中间一段活性位点、几处远距离接触、一个功能关键词和若干已知残基。自回归模型必须人为排列生成顺序，而 ESM3 可以把这些条件放在任意位置，让 Transformer 在全局上下文中补全其余部分。

##### 与 ESM-2 的区别

ESM-2 是大规模蛋白质序列语言模型，擅长从序列中提取进化表征，并可服务结构预测、突变效应预测和功能分类。ESM3 继承了“生物序列可语言建模”的路线，但目标从表征学习扩展到多模态生成：它同时建模 \(p(\text{sequence}, \text{structure}, \text{function})\)，并允许任意条件分布 \(p(\text{missing tracks}\mid\text{prompt tracks})\) 的近似采样。

因此，ESM3 更像一个蛋白质设计引擎。它的能力不只体现在预测结构或注释功能，而是可以把“给定功能和几何约束，生成新序列并返回结构”变成统一推理过程。最大 98B 模型带来的收益也主要体现在复杂组合提示响应、远离天然序列的可行蛋白生成和跨模态一致性上。

#### 🧪 练习题

```yaml
question: "ESM3 能用同一个模型做序列补全、结构生成和功能条件设计的根本原因是什么？"
options:
  - "它把序列、结构和功能都表示为离散 token track，并用 masked language modeling 联合预测被遮盖位置"
  - "它只训练了一个比 ESM-2 更大的氨基酸序列自回归模型"
  - "它在推理阶段调用 AlphaFold 3 作为唯一结构模块"
  - "它用人工规则枚举所有可能的蛋白突变"
answer: 0
explain: "ESM3 的关键是多轨离散化与联合遮盖重建目标；结构和功能不再只是后处理标签，而是和序列一起进入 Transformer 的输入输出空间。"
```
