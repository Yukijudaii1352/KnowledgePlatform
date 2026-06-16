### ESMFold — 蛋白质语言模型驱动的端到端单序列折叠

```yaml
id: esmfold
name: ESMFold
full_name: ESMFold (ESMFold)
year: '2023.03'
org: Meta AI
paper_url: https://www.science.org/doi/10.1126/science.ade2574
category: protein_structure
parent: —
motivation: 蛋白质语言模型端到端单序列预测
```

#### 📝 一句话总结

ESMFold 将预训练蛋白质语言模型 ESM-2 与 AlphaFold2 风格 folding trunk、structure module 连接成端到端结构预测器，直接从单条蛋白序列预测原子级三维结构，解决了 MSA 搜索慢、低同源序列难以预测和宏基因组规模结构注释不可扩展的问题。

#### 🎯 核心要点

- **ESM-2 表征作为进化先验**：ESM-2 用 masked language modeling 在大规模蛋白序列上预训练，使结构、接触和功能信息在序列表征中涌现
- **发布版 ESMFold 使用 3B ESM-2**：官方 `esmfold_v0/v1` 使用 3B 参数 ESM-2 和 48 个 folding trunk block；ESM-2 系列本身最大扩展到 15B 参数
- **无需 MSA/模板**：推理只需要单条序列，省去同源搜索和模板搜索，支持浏览器、API 和批量 FASTA 推理
- **Folding trunk**：48 个 triangular self-attention block 同时维护 sequence representation \(s_i\) 与 pair representation \(z_{ij}\)，通过 Pair2Seq、Seq2Pair 和 triangle updates 交换信息
- **Structure module**：8 个 AlphaFold2 风格 IPA block 把 trunk 表征解码为 backbone 与 side-chain 原子坐标
- **Recycling 与置信度**：最多 4 次 recycle；输出 pLDDT、pTM、distogram 等头，PDB 的 B-factor 可直接保存 pLDDT
- **ESM Metagenomic Atlas**：Meta 用 ESMFold 批量预测 6 亿级宏基因组蛋白结构，展示了单序列模型在结构组学规模上的吞吐优势
- **性能定位**：通常比完整 MSA 版 AlphaFold2 更快、对突变更敏感；在同源丰富目标上可能低于 AF2，但在单序列/低同源场景比“去掉 MSA 的 AF2”更有针对性

#### 🔬 深入细节

##### 架构图与来源说明

![ESMFold 架构示意图](https://arxiv.org/html/2602.06020v2/Figures/esmfold_architecture.png)
*图：ESMFold 架构示意。ESM-2 编码单条氨基酸序列，folding trunk 迭代更新 sequence/pair 表征，structure module 将其转换为三维坐标。该图来自可访问的 arXiv HTML 版本，标注为改编自 Lin et al., 2023。*

来源说明：任务给出的 Science DOI 页面在当前环境会触发 Cloudflare 校验；本文交叉参考 Meta 官方博客、`facebookresearch/esm` 官方仓库 README 与源码、以及可访问的 arXiv 架构说明。官方源码显示 `esmfold_v0` 是论文实验版本，使用 3B ESM-2 与 48 个 folding blocks；`trunk.py` 显示 sequence state 维度 1024、pairwise state 维度 128、structure module 8 blocks、max recycles 为 4。

##### 推理伪代码

```python
# ESMFold 推理流程伪代码
def esmfold_predict(sequence, num_recycles=4, chunk_size=None):
    """
    sequence: 单条蛋白质序列；多链可用 ':' 分隔
    chunk_size: 可选 axial attention chunk，用更慢速度换取更低显存
    """
    # 1. ESM-2 编码序列；语言模型参数冻结
    tokens = tokenize(sequence)
    esm_layers, esm_attentions = ESM2_3B(tokens)

    # 2. 学习加权汇聚不同 ESM 层，并投影成 trunk 的 sequence/pair 表征
    s = layer_weighted_sum(esm_layers)      # [L, C_s]
    z = init_pair_representation(
        esm_attentions=esm_attentions,
        relative_position=sequence_indices(sequence),
    )                                      # [L, L, C_z]

    recycle_s = zeros_like(s)
    recycle_z = zeros_like(z)
    recycle_dist = zeros([len(sequence), len(sequence)])

    for r in range(num_recycles):
        # 3. 回收上一轮输出的 sequence、pair 与 distogram 信息
        s_in = s + norm(recycle_s)
        z_in = z + norm(recycle_z) + distogram_embedding(recycle_dist)

        # 4. 48 个 folding trunk blocks
        for block in range(48):
            pair_bias = Pair2Seq(z_in)              # pair -> attention bias
            s_in = SequenceSelfAttention(s_in, pair_bias)
            z_in = z_in + Seq2Pair(s_in)            # sequence -> pair
            z_in = TriangleMultiplication(z_in)
            z_in = TriangleAttention(z_in, chunk_size=chunk_size)

        # 5. 8 个 IPA structure module blocks 输出坐标
        coords, states = StructureModule8(s_in, z_in)

        recycle_s, recycle_z = s_in, z_in
        recycle_dist = pseudo_beta_distogram(coords)

    # 6. 置信度与辅助头
    plddt = LDDTHead(states)
    ptm = PTMHead(z_in)
    distogram = DistogramHead(z_in)
    return coords, plddt, ptm, distogram
```

##### 从 masked language modeling 到结构先验

ESM-2 的预训练目标是 BERT 风格的 masked language modeling：随机遮蔽部分氨基酸，让模型根据上下文恢复原 token。

$$
\mathcal{L}_{\mathrm{MLM}}
= - \sum_{i \in \mathcal{M}} \log p_\theta(s_i \mid s_{\setminus \mathcal{M}})
$$

这个目标本身没有显式三维坐标，但蛋白序列中存在强烈的结构约束：远距离残基若在空间中接触，其氨基酸类型会共同受到折叠稳定性、疏水核心、电荷互补和功能位点约束。大规模 MLM 迫使 ESM-2 学到这些统计规律，因此 ESM-2 的内部 attention 和 hidden states 可以携带接触、二级结构甚至折叠类别信息。

ESMFold 的关键选择是：不再把 PLM 只当作额外 embedding，而是直接把它作为结构预测器的主输入。官方实现中，ESM 层输出经过可学习权重组合：

$$
s_i^{(0)} = W_s\left(\sum_{\ell=0}^{L_{\mathrm{ESM}}} \alpha_\ell h_{i}^{(\ell)}\right)
$$

pair representation 则由相对位置、ESM attention maps 或 learned positional embedding 初始化：

$$
z_{ij}^{(0)} = W_z a_{ij} + \phi(i-j)
$$

其中 \(s_i\) 是每个残基的 sequence representation，\(z_{ij}\) 是残基对表示。

##### Folding trunk：把序列信息写入距离图

ESMFold 的 folding trunk 是 AlphaFold2 Evoformer 的单序列化版本。它没有 MSA 维度，因此每个 block 的核心任务变成：在 sequence representation 和 pair representation 之间来回传递信息。

sequence update 使用 pair bias 调制自注意力：

$$
\mathrm{Attn}_{ij}^{h}
= \mathrm{softmax}_j\left(
\frac{q_i^h \cdot k_j^h}{\sqrt{d}}
+ b^h(z_{ij})
\right)
$$

这里 \(b^h(z_{ij})\) 来自 pair representation。直觉上，如果 \(z_{ij}\) 已经认为两个残基可能接触，sequence attention 就会更容易让这两个位置交换信息。

pair update 则把 sequence 信息写回残基对空间：

$$
z_{ij} \leftarrow z_{ij}
+ W_o\left[
W_a s_i \odot W_b s_j,\;
W_c s_i - W_d s_j
\right]
+ \mathrm{TriangleUpdate}(z) 
$$

其中 \(\odot\) 是逐元素乘法。随后 triangular multiplicative update 和 triangular attention 会通过第三个残基 \(k\) 调整 \(i,j\) 的关系，这类似在隐空间中维护距离图的三角一致性。

> 💡 关键：ESMFold 的结构决策主要发生在 folding trunk，而不是最后的坐标头。后续可解释性研究也发现，早期 trunk block 更像在把残基身份、电荷等生化信息写入 pair space，晚期 block 更像在形成距离和接触几何。

##### Structure module 与训练目标

Folding trunk 输出的 \(s,z\) 被送入 AlphaFold2 风格的 structure module。IPA（Invariant Point Attention）在每个残基的局部框架中进行几何注意力，逐步更新刚体姿态和原子位置。最终模型输出每个残基最多 14 个原子坐标，并通过 OpenFold/AlphaFold 系的 heads 给出 pLDDT、pTM 和 distogram。

训练损失可以概括为：

$$
\mathcal{L}
= \lambda_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ \lambda_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ \lambda_{\mathrm{pLDDT}}\mathcal{L}_{\mathrm{pLDDT}}
+ \lambda_{\mathrm{LM}}\mathcal{L}_{\mathrm{LM}}
$$

其中：

- \(\mathcal{L}_{\mathrm{FAPE}}\)：在局部 frame 下比较预测原子与真实原子位置，训练结构模块的坐标几何；
- \(\mathcal{L}_{\mathrm{distogram}}\)：监督 \(z_{ij}\) 对残基距离分桶的预测；
- \(\mathcal{L}_{\mathrm{pLDDT}}\)：让置信度头预测局部结构质量；
- \(\mathcal{L}_{\mathrm{LM}}\)：保留语言模型式 token 预测约束，使序列表征不丢失氨基酸语义。

##### 为什么 ESMFold 能做宏基因组规模预测

完整 AlphaFold2 管线的慢点不只是神经网络本身，还包括 MSA 和模板搜索。对于上亿条宏基因组序列，逐条搜索同源数据库会成为系统瓶颈。ESMFold 的输入是单序列，因此可以把大量序列直接按长度 batch 到 GPU 上推理；官方 CLI 还支持 `--max-tokens-per-batch` 和 `--chunk-size`，在吞吐和显存之间做工程折中。

Meta 官方博客称这种语言模型折叠方法相对当时主流结构预测方法最高可达 60x 速度提升，并用于生成 6 亿级 ESM Metagenomic Atlas。这个结果的意义在于：很多宏基因组蛋白缺少人工注释和同源结构，ESMFold 提供了一个可以先“看见结构空间”的高通量入口。

##### 与 OmegaFold 和 AlphaFold2 的关系

ESMFold 与 OmegaFold 同属单序列 PLM-based folding，但 ESMFold 更直接沿用 AlphaFold/OpenFold 的 folding trunk 与 structure module 设计；OmegaFold 则强调自研 OmegaPLM 与 GeoFormer 的几何平滑。与 AlphaFold2 相比，ESMFold 牺牲了显式 MSA 协同进化信号，换取了速度、部署简洁性和对低同源序列的可用性。

| 维度 | AlphaFold2 | ESMFold |
|------|------------|---------|
| 输入 | MSA + templates + sequence | single sequence |
| 进化信息 | 在线同源序列协同突变 | ESM-2 预训练参数 |
| 主干 | Evoformer | 48-block folding trunk |
| 坐标模块 | IPA structure module | IPA structure module |
| 典型优势 | 高同源目标精度最高 | 快速、可批量、低同源友好 |
| 典型短板 | MSA 搜索重 | 对复杂多链/配体不是原生目标 |

#### 🧪 练习题

```yaml
question: "ESMFold 相比完整 AlphaFold2 管线最核心的输入差异是什么？"
options:
  - "ESMFold 使用 RNA 序列而不是蛋白序列"
  - "ESMFold 不依赖 MSA/模板搜索，而是用 ESM-2 的单序列表征驱动 folding trunk"
  - "ESMFold 只输出二级结构，不输出三维坐标"
  - "ESMFold 使用物理分子动力学模拟替代神经网络"
answer: 1
explain: "ESMFold 的核心是用预训练 ESM-2 从单条序列产生结构相关表征，再通过 folding trunk 和 structure module 输出原子坐标，因此省去了 AlphaFold2 中昂贵的 MSA/模板搜索。"
```
