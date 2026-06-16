### ESM-2

```yaml
id: esm2
name: ESM-2
full_name: 进化尺度建模2 (Evolutionary Scale Modeling 2)
year: '2022'
org: Meta AI
paper_url: https://www.science.org/doi/10.1126/science.ade2574
category: protein_structure
parent: —
motivation: 150亿参数蛋白质语言模型无需MSA
```

#### 📝 一句话总结

ESM-2 将 BERT 式蛋白质语言模型扩展到 150 亿参数，使单条氨基酸序列的上下文表示中涌现出可用于原子级结构预测的进化与几何信息；ESMFold 在此基础上训练折叠头，绕过 MSA 和模板搜索，实现高通量单序列结构预测。

#### 🎯 核心要点

- **大规模蛋白质语言模型**：ESM-2 以 Transformer 编码器建模蛋白质序列，模型族从 8M 扩展到 15B 参数
- **自监督预训练**：使用 masked language modeling，从大量天然蛋白序列中学习残基上下文、保守性和长程依赖
- **无需 MSA 推理**：ESMFold 直接从 primary sequence 预测结构，不需要 AlphaFold/RoseTTAFold 常用的多序列比对和模板搜索
- **三模块折叠架构**：ESM-2 stem 产生残基表示，folding trunk 迭代更新序列与 pairwise 表示，structure module 输出全原子坐标
- **序列-结构桥接**：语言模型每层隐藏状态被组合成 per-residue embedding，并初始化或调制 residue-pair 表示
- **AlphaFold 式几何模块**：folding trunk 维护 \(s_i\) 和 \(z_{ij}\)，通过三角更新、轴向注意力和结构模块把关系图转成 3D 构象
- **置信度输出**：预测结构同时给出 pLDDT、pTM、PAE 等可靠性信号，便于筛选高置信结构
- **超大规模应用**：论文用该能力构建 ESM Metagenomic Atlas，预测超过 6.17 亿条宏基因组蛋白序列，其中超过 2.25 亿条为高置信预测

#### 🔬 深入细节

##### 架构总览

![ESMFold 三模块架构示意图](https://folding.baulab.info/images/paper/esmfold_architecture.png)
*图：ESMFold 将输入序列送入 ESM-2 语言模型，再由 folding trunk 和 structure module 生成三维坐标。该图来自可访问的 ESMFold 机制分析页面，概括了 Lin et al. Science 论文中的 ESMFold 三模块结构。*

来源说明：正式论文 DOI 为 https://www.science.org/doi/10.1126/science.ade2574；当前环境中 Science 正文和 bioRxiv 图片受浏览器校验限制。摘要和元数据通过 NCBI E-utilities 可访问：https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=36927031&retmode=xml；模型、权重和用法参考 Meta 官方仓库 https://github.com/facebookresearch/esm；ESMFold 模块字段参考 Hugging Face 文档 https://huggingface.co/docs/transformers/en/model_doc/esm。

ESM-2 的基本观察是：蛋白质序列像自然语言一样存在强上下文约束，但约束来源不是语法，而是进化选择和三维折叠。一个残基能否出现在某个位置，取决于远处残基、疏水核心、二硫键、二级结构和功能位点等因素。大规模 masked language modeling 迫使模型从单序列语料中恢复这些约束，随着参数和数据规模增大，注意力和隐藏状态中会出现可用于接触图、二级结构和全原子折叠的信号。

##### ESM-2 预训练目标

给定蛋白质序列 \(a=(a_1,\ldots,a_L)\)，随机选择 mask 集合 \(\mathcal{M}\)，用 Transformer 编码被遮蔽后的序列。训练目标是预测被遮蔽位置的氨基酸：

$$\mathcal{L}_{\mathrm{MLM}}=-\sum_{i\in\mathcal{M}}\log p_\theta(a_i\mid a_{\setminus \mathcal{M}})$$

与普通文本 BERT 类似，模型输出每个位置的上下文化表示 \(h_i^l\)。不同的是，蛋白质词表较小，序列长度可达数百到数千，长程依赖具有明确结构含义：空间上接近的残基可能在线性序列上相距很远，语言模型必须通过注意力捕捉这种非局部耦合。

##### 核心算法伪代码

```python
# Simplified ESM-2 pretraining and ESMFold inference
def pretrain_esm2(batch_sequences):
    tokens, mask_positions, labels = mask_amino_acids(batch_sequences)
    hidden_states = esm2_transformer(tokens, return_all_layers=True)
    logits = lm_head(hidden_states[-1])
    loss = cross_entropy(logits[mask_positions], labels[mask_positions])
    update_esm2(loss)

def esmfold_infer(sequence):
    layer_states = esm2(sequence, return_all_layers=True)
    s = learned_layer_mix(layer_states)      # per-residue representation s_i
    z = init_pair_representation(sequence)   # pair representation z_ij

    for block in folding_trunk:
        s, z = block.update_sequence_and_pairs(s, z)

    coords, frames, angles = structure_module(s, z)
    confidence = confidence_heads(s, z, coords)
    return coords, confidence
```

##### 从语言模型到折叠模型

ESMFold 不是重新训练一个从零开始的结构网络，而是把 ESM-2 当作序列知识的 stem。一个常见抽象写法是把各层隐藏状态做可学习加权：

$$s_i^{0}=\sum_{\ell=0}^{L_{\mathrm{LM}}}\alpha_\ell h_{i}^{\ell}$$

其中 \(\alpha_\ell\) 是训练得到的层权重，\(s_i^0\) 是每个残基的初始序列表示。pairwise 表示 \(z_{ij}\) 可由相对位置编码、序列表示组合和 trunk 内部更新逐步形成：

$$z_{ij}^{0}=E(i-j)+g(s_i^0,s_j^0)$$

folding trunk 同时维护两类状态：每个残基的 \(s_i\)，以及每对残基的 \(z_{ij}\)。这很接近 AlphaFold2 Evoformer 的思想，但输入信息来源不同：AlphaFold2 主要从 MSA 和模板中获得进化共变信息，ESMFold 让大语言模型在单序列上下文中提供这种信息。

##### Folding trunk 的机制

folding trunk 的作用是把“序列语义”变成“几何蓝图”。序列表示 \(s_i\) 通过自注意力交换全局上下文，pairwise 表示 \(z_{ij}\) 通过三角乘法更新、三角注意力和行列注意力传播残基对关系。简化地看，每个 block 在做：

$$s^{k+1}, z^{k+1}=T_k(s^k,z^k)$$

其中 \(z_{ij}\) 越到后层越像距离图、接触图和相对构象约束。structure module 再把最终 \(s,z\) 转换为刚体框架、扭转角和原子坐标：

$$\hat{X}=\mathrm{StructureModule}(s^K,z^K)$$

模型还输出 distogram logits、pLDDT、pTM 和 predicted aligned error 等置信度信号。它们帮助区分“模型知道怎么折”的区域和天然无序或低置信区域。

##### 损失函数与监督信号

预训练阶段只需要序列，不需要结构标签；折叠阶段需要 PDB 等结构监督。可以把 ESMFold 的训练目标概括为：

$$\mathcal{L}=\mathcal{L}_{\mathrm{coord}}+\lambda_d\mathcal{L}_{\mathrm{distogram}}+\lambda_c\mathcal{L}_{\mathrm{confidence}}+\lambda_{\mathrm{aux}}\mathcal{L}_{\mathrm{aux}}$$

其中 \(\mathcal{L}_{\mathrm{coord}}\) 约束预测坐标或局部框架与真实结构一致，\(\mathcal{L}_{\mathrm{distogram}}\) 用残基对距离分箱交叉熵训练 \(z_{ij}\)，\(\mathcal{L}_{\mathrm{confidence}}\) 训练 pLDDT/pTM/PAE 等置信度头。这个表达式是方法级简化，具体权重和结构模块细节以原论文和实现为准。

##### 为什么“无需 MSA”重要

MSA 的核心价值是提供进化共变：如果两个残基在进化中协同突变，它们很可能空间接近或功能耦合。但构建 MSA 要查询大型序列数据库，速度慢，对孤儿蛋白、低同源蛋白和大规模宏基因组扫描尤其昂贵。ESM-2 把这种统计规律压缩进模型参数，使推理时只需输入一条序列。

这带来两个直接后果：第一，单条蛋白结构预测速度大幅提升，适合高通量筛选；第二，模型可以预测缺乏丰富同源序列的蛋白，但置信度仍取决于训练分布和序列本身是否给出足够折叠线索。论文报告的 ESM Metagenomic Atlas 正是利用这一点，对超过 6.17 亿宏基因组蛋白进行结构预测。

##### 与 AlphaFold2/RoseTTAFold 的区别

AlphaFold2 的 Evoformer 显式处理 MSA representation 和 pair representation，强依赖外部数据库搜索；RoseTTAFold 通过三轨网络同步处理序列、距离和坐标。ESMFold 的主要取舍是把 MSA 查询替换为大规模语言模型参数：牺牲部分依赖显式同源证据的精度上限，换取端到端单序列推理速度和部署简洁性。

> 💡 关键：ESM-2 本身是蛋白质语言模型，ESMFold 是把 ESM-2 表征转成结构的折叠系统。它的突破不只是“更大的 Transformer”，而是证明大规模序列预训练能在没有 MSA 的情况下提供足够强的结构先验。

#### 🧪 练习题

```yaml
question: "ESMFold 相比 AlphaFold2 推理流程的核心差异是什么？"
options:
  - "ESMFold 完全不使用神经网络，只做物理能量最小化"
  - "ESMFold 直接从单条序列和 ESM-2 表征预测结构，不需要推理时构建 MSA 或模板搜索"
  - "ESMFold 只预测二级结构，不输出原子坐标"
  - "ESMFold 必须为每个蛋白重新训练一个专用模型"
answer: 1
explain: "ESMFold 用预训练 ESM-2 表征替代推理时的外部同源序列搜索，再由 folding trunk 和 structure module 输出三维结构。"
```
