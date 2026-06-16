### RhoFold — RNA-FM 驱动的端到端 RNA 三维结构预测

```yaml
id: rhofold
name: RhoFold
full_name: RhoFold (RhoFold)
year: '2022.11'
org: Shen Lab
paper_url: https://www.biorxiv.org/content/10.1101/2022.11.28.518224v1
category: other_bio
parent: —
motivation: Transformer实现RNA三维结构预测
```

#### 📝 一句话总结

RhoFold 是一个面向 RNA 三维结构预测的端到端深度学习模型，用 RNA-FM、MSA/E2Eformer 和 IPA 结构模块从序列直接生成全原子 RNA 坐标，重点解决传统 FARFAR2 等采样式 de novo 方法慢、且 RNA 结构数据稀缺导致深度模型难训练的问题。

#### 🎯 核心要点

- **端到端 RNA 3D 预测**：从 RNA 序列、MSA 和 RNA-FM 表征直接输出主链框架、碱基框架、扭转角和全原子坐标
- **RNA-FM 预训练特征**：利用在约 2300 万条非冗余 RNA 序列上训练的 RNA foundation model 缓解 PDB RNA 三维结构稀缺
- **E2Eformer 表征学习**：借鉴 AlphaFold 的 Evoformer，用 4 层注意力模块共同更新 MSA 表征和 residue-pair 表征
- **RNA 专用结构模块**：不直接预测不规则的碱基框架，而是预测 backbone main frame \((C4', C1', N1/N9)\) 与扭转角 \(\alpha,\beta,\gamma,\omega\)
- **IPA 几何注意力**：用 Invariant Point Attention 预测每个核苷酸局部框架，使结构更新对全局旋转和平移保持一致
- **二级结构辅助训练**：在 2D pair loss 和 3D base-pair constraint 中引入二级结构监督，强制模型学习碱基配对几何
- **自蒸馏扩充数据**：用二级结构标签筛选高置信伪三维结构，将 PDB 数据和蒸馏数据混合训练
- **快速推理**：论文报告平均推理约 0.14 秒，不做采样即可产生有效 RNA 结构，远快于 FARFAR2 的大规模 decoy 采样

#### 🔬 深入细节

##### 模型架构图与可访问来源

![RhoFold / E2Efold-3D 总体流程](https://ar5iv.labs.arxiv.org/html/2207.01586/assets/figures/overview.png)
*图：arXiv HTML 中的 Figure 1。该工作原名 E2Efold-3D，官方代码仓库说明其后续更名为 RhoFold；bioRxiv 原链接当前返回 Cloudflare 403，因此这里采用可访问的 arXiv HTML 与官方仓库作为来源。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2207.01586；arXiv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2207.01586；官方仓库 https://github.com/ml4bio/RhoFold。

##### 算法伪代码

```python
# RhoFold / E2Efold-3D 简化推理流程
def rhofold_predict(rna_sequence):
    # 1. 构建序列特征
    msa = search_rna_homologs(rna_sequence)          # Infernal / rMSA, Rfam + RNAcentral
    msa_repr = linear_embed(one_hot(msa))
    fm_repr = RNA_FM.encode(rna_sequence)            # 预训练 RNA foundation model

    # 2. E2Eformer 更新单体和 pair 表征
    single_repr, pair_repr = combine(msa_repr, fm_repr)
    prev_backbone = None
    while not plddt_converged():
        if prev_backbone is not None:
            pair_repr += encode_previous_geometry(prev_backbone)
        for block in range(4):
            single_repr = row_col_gated_attention(single_repr, pair_repr)
            pair_repr = update_pair_from_msa(single_repr, pair_repr)

        # 3. Structure module: IPA + RNA 专用几何参数化
        main_frame = IPA_predict_frame(single_repr, pair_repr)  # C4', C1', N1/N9
        torsions = predict_torsions(single_repr)                # alpha,beta,gamma,omega
        coords = reconstruct_full_atoms(main_frame, torsions)
        plddt = predict_lddt(single_repr, pair_repr)
        prev_backbone = main_frame

    # 4. 可选 AMBER restrained minimization 去除碰撞
    return amber_relax(coords), plddt
```

##### 动机与背景

RNA 三维结构对 RNA 靶向药物、核酸器件和核酶机制研究很关键，但 RNA-only 结构在 PDB 中占比很低，且 RNA 的构象异质性、柔性和 NMR 信号重叠使实验解析更困难。传统 de novo 方法如 FARFAR2、3dRNA、SimRNA 主要依靠物理/知识势能和大规模采样；它们可以生成 decoy，但耗时长，而且排序最优 decoy 本身也困难。

RhoFold 的核心选择是把 RNA folding 写成一个完全可微的坐标预测问题。这样，模型不再先采样大量候选再打分，而是让序列、MSA、二级结构和三维坐标误差共同反向传播到同一个网络中。对 RNA 来说，这比简单照搬蛋白结构预测更难，因为 RNA 的折叠主要受碱基配对和核糖-磷酸骨架构象共同驱动，而可用三维训练样本约只有千级。

##### 输入特征与 E2Eformer

模型同时使用两类信息。第一类是 MSA 共进化信息：通过 Infernal/rMSA 从 Rfam 与 RNAcentral 搜索同源序列，编码为 MSA 表征；第二类是 RNA-FM 的语言模型表征，它来自大规模未标注 RNA 序列预训练，提供不依赖结构标签的上下文先验。两类特征合并后进入 E2Eformer。

E2Eformer 与 AlphaFold Evoformer 的作用相似：维护序列表征 \(M\) 和 residue-pair 表征 \(Z\)，并通过 gated row/column attention、transition 与 pair 更新反复交换信息。直观上，\(M\) 负责记录每个核苷酸在同源序列中的上下文，\(Z_{ij}\) 负责记录第 \(i,j\) 个核苷酸之间的几何关系。二级结构预测头也接在 pair 表征上，让模型在进入 3D 坐标阶段前先学会哪些位置可能形成碱基配对。

##### RNA 专用结构参数化

直接预测 RNA 碱基框架会遇到收敛问题，因为嘌呤/嘧啶碱基原子模式不同、局部几何不如蛋白主链规则。RhoFold 改为预测 backbone main frame：

$$
F_i = (C4'_i, C1'_i, N_i), \quad N_i \in \{N1, N9\}
$$

再预测四个关键扭转角 \(\alpha,\beta,\gamma,\omega\)，由 main frame 与扭转角重建 base frame 和全原子坐标。这个设计把不规则碱基几何转化为更稳定的局部框架和角度预测问题，同时仍能通过碱基配对约束回到 RNA 的生物物理结构。

结构模块使用 Invariant Point Attention。若第 \(i\) 个残基的局部刚体变换为 \(T_i\)，IPA 的几何项可概括为：

$$
\alpha_{ij} \propto \exp\left(
\frac{q_i^\top k_j}{\sqrt{d}} + b_{ij}
- \lambda \sum_p \|T_i q_{i,p}^{point} - T_j k_{j,p}^{point}\|^2
\right)
$$

这里 \(b_{ij}\) 来自 pair 表征。由于所有点都通过局部框架映射到全局空间，整体旋转或平移不会改变相对几何，因此模型学习的是结构本身而不是坐标系。

##### 损失函数与二级结构约束

RhoFold 的训练目标分为 1D、2D、3D 三层：

$$
\mathcal{L} =
\mathcal{L}_{mlm}
+0.3\mathcal{L}_{dis}
+0.1\mathcal{L}_{ss}
+0.03\mathcal{L}_{clash}
+2\mathcal{L}_{FAPE}
+0.1\mathcal{L}_{ss3d}
+0.01\mathcal{L}_{plDDT}
$$

- \(\mathcal{L}_{mlm}\)：随机 mask 约 5% MSA token，重建序列以学习共进化特征
- \(\mathcal{L}_{dis}\)：预测 \(P\)、\(C4'\)、\(N\) 等原子间距离分箱，用 cross entropy 监督 pair 表征
- \(\mathcal{L}_{ss}\)：预测二级结构矩阵 \(C\in\{0,1\}^{L\times L}\)，其中 \(C_{ij}=1\) 表示形成碱基对
- \(\mathcal{L}_{FAPE}\)：Frame Aligned Point Error，在局部框架中比较预测坐标和真实坐标，天然忽略全局刚体变换
- \(\mathcal{L}_{ss3d}\)：把二级结构约束直接放进 3D 坐标，惩罚应配对碱基的伪原子距离过远
- \(\mathcal{L}_{clash}\)：惩罚非键合原子过近，减少立体碰撞
- \(\mathcal{L}_{plDDT}\)：训练置信度头，使 pLDDT 能估计局部结构质量

其中 3D 二级结构约束可写成：

$$
\mathcal{L}_{ss3d} =
\sum_{(m,n)\in \text{base pairs}}
\max\left(\hat{d}^{m,n}_{ij} - d^{m,n}_{ij} - \tau, 0\right)
$$

它的直觉是：如果二级结构认为 \(m,n\) 应形成碱基对，那么碱基局部框架中的若干伪原子距离必须满足配对几何，不能只在 2D contact map 上预测正确。

##### 自蒸馏、recycling 与推理

RhoFold 先用 PDB RNA 三维结构训练，再在有二级结构标注的大规模数据上生成伪三维标签，并用二级结构一致性筛选高置信样本。最终训练时混合约 25% PDB 数据和 75% 自蒸馏数据，使模型既保留真实坐标监督，又从大量 RNA 二级结构样本中学习更广的折叠模式。

Recycling 则把上一轮结构预测反馈给 E2Eformer。第一轮通常形成粗略二级结构和空间摆放，后续轮次用上一次的 backbone frame 修正长程接触、局部冲突和碱基配对几何。论文报告 pLDDT 与真实 lDDT 有较强相关性，说明模型的置信度头可用于过滤低可靠区域。

##### 与传统 RNA folding 方法的区别

| 维度 | FARFAR2 / 3dRNA / SimRNA | RhoFold |
|------|--------------------------|---------|
| 核心范式 | 采样大量候选结构，再用能量或打分函数筛选 | 单个可微网络直接输出坐标 |
| 输入信息 | 序列、二级结构、片段库或物理约束 | 序列、MSA、RNA-FM、二级结构辅助监督 |
| 速度 | 需要大量 decoy 采样，单目标可达数千秒 | 论文报告平均约 0.14 秒生成结构 |
| 几何建模 | 手工势能和局部片段组合 | IPA、局部框架、FAPE、base-pair 3D constraint |
| 主要瓶颈 | 采样成本高、decoy 排序难 | 训练数据少，对长 RNA 和复杂 RNA 复合体仍有限 |

> 💡 关键：RhoFold 的贡献不是简单把 Transformer 用到 RNA 上，而是用 RNA-FM、自蒸馏、二级结构约束和 RNA 专用局部框架共同解决“RNA 3D 数据太少但必须直接预测坐标”的问题。

#### 🧪 练习题

```yaml
question: "RhoFold 为什么不直接预测 RNA 碱基框架，而是预测 backbone main frame 与扭转角？"
options:
  - "因为 RNA 不存在碱基配对，只需要预测磷酸骨架"
  - "因为碱基局部原子模式较不规则，直接预测 base frame 收敛困难；用 main frame 加扭转角更稳定且可重建全原子坐标"
  - "因为 RNA-FM 只能输出扭转角，不能输出坐标"
  - "因为 FARFAR2 已经提供了所有碱基坐标，不需要模型预测"
answer: 1
explain: "论文方法部分说明，直接预测 nucleobase base frame 会因不规则结构模式出现收敛问题；RhoFold 用 C4'/C1'/N1或N9 主框架和扭转角完成更稳定的几何参数化。"
```
