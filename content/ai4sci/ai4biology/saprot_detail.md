### SaProt — 结构感知词汇增强的蛋白质语言模型

```yaml
id: saprot
name: SaProt
full_name: SaProt (Structure-aware Protein Language Model)
year: '2024.01'
org: Westlake University
paper_url: https://openreview.net/forum?id=1c42513b8895ab11fbbb5b7e8e6b6b02
category: protein_design
parent: —
motivation: 结构感知词汇增强语言模型
```

#### 📝 一句话总结

SaProt 提出 structure-aware vocabulary，把氨基酸 token 与 Foldseek 3Di 结构 token 合成为同一位置的结构感知 token，使标准 BERT/ESM 式蛋白语言模型在预训练阶段直接看到序列与三维局部结构信息。它用约 4000 万条蛋白序列-结构数据预训练通用 PLM，在突变效应、稳定性、PPI、金属结合、EC/GO 与定位等 10 类下游任务上系统优于只看序列的基线。

#### 🎯 核心要点

- **结构感知词表**：每个残基位置由氨基酸 \(a_i\) 与 Foldseek 3Di 结构状态 \(s_i\) 组合为 \(z_i=(a_i,s_i)\)，例如 `Md`、`Kp` 这类 AA+3Di token
- **一维化结构输入**：先用 Foldseek 将 3D 坐标编码为与残基等长的结构字母序列，再与氨基酸序列逐位笛卡尔积组合，避免在主干模型中加入复杂几何图网络
- **沿用 MLM 预训练范式**：在结构感知序列上做 masked language modeling，模型主体可复用 ESM/BERT 类 Transformer 编码器
- **大规模结构预训练**：官方论文/项目说明使用约 4000 万条 AlphaFold2 结构；650M 版本还提供 AF2 与 PDB 阶段化训练权重
- **下游任务覆盖广**：评估包括 ClinVar、ProteinGym、Thermostability、HumanPPI、Metal Ion Binding、EC、GO-MF/BP/CC、DeepLoc 等蛋白级和残基级任务
- **结构质量可控**：对 AlphaFold 低置信度区域可用 `#` 等未知/掩码结构 token 处理，避免把低可靠结构强行注入模型
- **工程优势**：把结构信息转为 token 后，推理和微调接口接近普通 PLM，可直接用于 embedding、突变效应预测、逆折叠和监督微调

#### 🔬 深入细节

##### 模型框架图

![SaProt structure-aware vocabulary](https://github.com/westlake-repl/SaProt/raw/main/figures/pipeline.png)
*图：SaProt 官方仓库给出的 pipeline。左侧用 Foldseek 将每个残基的三维环境编码为 3Di 结构状态，中间构造 AA+3Di 的结构感知词表，右侧使用 BERT/ESM 式 Transformer 做 MLM 预训练与任务预测。*

论文主入口在 OpenReview（ICLR 2024 spotlight），官方实现和模型说明在 `https://github.com/westlake-repl/SaProt`；如果原始任务中的 OpenReview 短链不可访问，可用官方仓库链接的 OpenReview 页面和 bioRxiv 版本交叉核对方法。

##### 算法伪代码

```python
# SaProt 预训练数据构造与 MLM 训练伪代码
def build_structure_aware_sequence(protein):
    aa_seq = protein.sequence                 # A_1, ..., A_L
    structure = protein.coords_or_af2_model   # backbone / full-atom structure

    # Foldseek 3Di: 把每个残基的局部三维几何映射为离散结构字母
    struct_seq = foldseek_3di(structure)      # s_1, ..., s_L

    tokens = []
    for aa, st, conf in zip(aa_seq, struct_seq, protein.confidence):
        if conf is not None and conf < 70:
            st = "#"                          # 低置信度结构区域用未知结构状态
        tokens.append(combine(aa, st))        # 例如 "Md"、"Kp"
    return tokens


def pretrain_saprot(dataset, model):
    for protein in dataset:
        z = build_structure_aware_sequence(protein)
        mask_positions = sample_mask_positions(z)
        z_masked = replace_with_mask_tokens(z, mask_positions)

        logits = model(z_masked)              # Transformer encoder
        loss = 0.0
        for i in mask_positions:
            loss += cross_entropy(logits[i], target=z[i])
        optimizer.step(loss)
```

##### 关键公式与训练目标

SaProt 的核心不是发明新的 Transformer，而是改变输入 token 的语义。给定长度为 \(L\) 的蛋白，氨基酸序列为 \(\mathbf{a}=(a_1,\ldots,a_L)\)，Foldseek 结构字母序列为 \(\mathbf{s}=(s_1,\ldots,s_L)\)，结构感知 token 序列定义为：

$$
z_i = a_i \otimes s_i,\quad \mathbf{z}=(z_1,\ldots,z_L)
$$

其中 \(\otimes\) 表示把同一残基位置的 residue token 与 structure token 合成为一个新词表元素。若残基结构未知或预测置信度低，可令 \(s_i=\#\)，让模型显式知道该位置没有可靠结构信息。

预训练仍采用 masked language modeling：

$$
\mathcal{L}_{\text{MLM}}
= - \sum_{i\in \mathcal{M}}
\log p_\theta(z_i \mid \mathbf{z}_{\setminus \mathcal{M}})
$$

直觉上，模型在恢复被遮蔽 token 时必须同时解释“这个位置应是什么氨基酸”和“它处在什么局部结构环境”。这比只预测氨基酸更强，因为同一个氨基酸在螺旋、折叠核心、表面 loop 或结合界面中的统计规律不同。

##### 方法机制拆解

传统蛋白语言模型只把蛋白看成 20 种氨基酸构成的序列，优势是数据量大、训练稳定、可迁移，但缺点是三维结构只以隐式形式存在于进化统计中。SaProt 的出发点是：AlphaFold2 之后已经有海量预测结构，若能把结构转成离散 token，就可以把结构信息直接并入语言模型预训练，而不必为每个任务重新搭建 SE(3) 网络或图神经网络。

Foldseek 的 3Di 编码在这里起到“结构分词器”的作用。它把每个残基周围的局部几何关系压缩成一个离散状态，使蛋白结构变成与原序列等长的一维结构序列。SaProt 随后取氨基酸词表与结构词表的笛卡尔积，构成结构感知词表。这样做的关键好处是：Transformer 的输入长度不变，位置对齐天然成立，注意力层可直接学习“某个序列片段在某种结构环境中”的上下文依赖。

与把几何距离矩阵加入 attention bias 的方法相比，SaProt 的结构注入更轻量：结构信息在 embedding 层就进入模型，不需要在每层维护 \(L\times L\) 的几何 pair 表征。与纯 GNN 结构编码器相比，它更容易继承蛋白语言模型的大规模预训练经验，也更容易接入 Hugging Face/ESM 生态。代价是 3Di token 是离散摘要，不能保留完整原子坐标，因此它更适合作为通用表征模型，而不是替代精细结构预测或分子动力学。

在下游使用时，SaProt 可按任务接不同 head。蛋白级任务通常取 `[CLS]` 或平均池化表示，残基级任务直接使用每个位置的 hidden state；突变效应预测可比较野生型与突变型结构感知序列的 masked likelihood 或 pseudo-log-likelihood：

$$
\Delta S
= \log p_\theta(z_i^{\text{mut}}\mid \mathbf{z}_{\setminus i})
- \log p_\theta(z_i^{\text{wt}}\mid \mathbf{z}_{\setminus i})
$$

若突变导致局部结构未知，可以只替换氨基酸并保留或屏蔽结构 token；这也是 SaProt 在实际使用中需要注意的地方：高质量结构输入通常带来收益，但低质量结构会把错误几何先验注入模型。

> 💡 关键：SaProt 的创新在于把“结构是否参与语言建模”提前到词表层解决。模型不需要知道三维坐标的全部细节，却能在预训练中持续看到结构状态，从而学习更接近功能与稳定性的蛋白表征。

#### 🧪 练习题

```yaml
question: "SaProt 的 structure-aware vocabulary 主要解决了什么问题？"
options:
  - "把蛋白质序列长度压缩到原来的十分之一"
  - "在不改变 Transformer 主体范式的情况下，把每个残基的局部结构状态并入语言模型 token"
  - "用扩散模型直接生成蛋白质三维坐标"
  - "用监督标签替代 masked language modeling"
answer: 1
explain: "SaProt 先用 Foldseek 得到与残基等长的 3Di 结构序列，再把氨基酸和结构状态组合成 AA+3Di token，使标准 MLM 训练直接利用结构信息。"
```
