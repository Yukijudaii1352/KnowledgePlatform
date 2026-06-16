### IgGM — 面向抗原的抗体序列-结构联合生成模型

```yaml
id: iggm
name: IgGM
full_name: IgGM (IgGM)
year: '2025.01'
org: ICLR
paper_url: https://openreview.net/forum?id=IgGM2025
category: other_bio
parent: —
motivation: 序列结构联合生成式抗体设计
```

#### 📝 一句话总结

IgGM 提出了一种面向给定抗原和框架区序列的抗体/纳米抗体生成模型，用 ESM-PPI 特征、Sgformer、IPA 预测模块和 consistency distillation 同时设计 CDR 序列与完整抗体-抗原复合物结构，解决现有共设计方法依赖已知抗体框架结构或模板的问题。

#### 🎯 核心要点

- **真实设计场景建模**：输入抗原结构与抗体 framework region 序列，输出 CDR 序列和完整 antibody-antigen complex 结构
- **联合生成序列与结构**：同时恢复离散氨基酸类别、连续平移坐标和 SO(3) 局部旋转，覆盖 sequence design 与 structure design
- **ESM-PPI 特征提取**：使用冻结的多链蛋白语言模型 ESM-PPI 提取抗原-抗体序列的跨链上下文特征
- **多级特征编码**：Inter-chain Feature Embedding、Structure Encoder 和 16 层 Sgformer 共同建模链身份、表位位置、单体表征和 pair 表征
- **IPA 预测模块**：8 层 Predict Module 用 Invariant Point Attention 迭代优化结构，并由 sequence head 输出 CDR 氨基酸分布
- **两阶段训练**：先训练结构预测，再加入 CDR 序列恢复；第二阶段混合训练 CDR H3、heavy-chain CDR 和 all-CDR 任务
- **扩散到一致性模型**：先训练扩散模型，再通过 consistency distillation 得到可单步或少步生成的模型
- **抗体与纳米抗体统一**：传统抗体重链/轻链和单域纳米抗体都可处理，纳米抗体视为只有重链的特例

#### 🔬 深入细节

##### 模型架构图与可访问来源

![IgGM 模型框架](https://raw.githubusercontent.com/TencentAI4S/IgGM/master/docs/IgGM.png)
*图：IgGM 官方仓库中的模型示意。模型从带噪抗体序列/结构与抗原输入出发，经 ESM-PPI、跨链特征嵌入、结构编码、Sgformer 和 Predict Module，输出设计序列与复合物结构。*

可访问来源：OpenReview 论文页 https://openreview.net/forum?id=zmmfsJpYcq；PDF https://openreview.net/pdf?id=zmmfsJpYcq；官方代码与示意图 https://github.com/TencentAI4S/IgGM。

##### 算法伪代码

```python
# IgGM 多步采样的简化形式
def iggm_design(antigen_seq, antigen_coords, framework_seq, epitope_mask, steps=10):
    # 1. 初始化抗体 CDR 序列与结构噪声
    s = random_amino_acids(masked_cdr_positions(framework_seq), alphabet=20)
    x = sample_translation_noise()          # R^3
    r = sample_uniform_SO3()                # residue frame orientation

    # 2. 条件信息：抗原结构、表位、框架区序列
    condition = {
        "antigen_seq": antigen_seq,
        "antigen_coords": antigen_coords,
        "framework_seq": framework_seq,
        "epitope_mask": epitope_mask,
    }

    # 3. consistency model: 可单步，也可少步细化
    for tau in decreasing_time_grid(steps):
        esm_features = frozen_ESM_PPI(merge_sequences(s, framework_seq, antigen_seq))
        single, pair = inter_chain_embed(esm_features, condition)
        pair = structure_encoder(pair, x, r, epitope_mask)

        for block in range(16):
            single, pair = sgformer_block(single, pair)  # attention + OPM + triangle updates

        for block in range(8):
            single, x, r = IPA_predict_module(single, pair, x, r)

        s = sequence_head(single).argmax(dim=-1)         # CDR amino-acid categories
        s, x, r = add_noise_for_next_step(s, x, r, tau)  # multi-step refinement

    return assemble_complex(s, x, r, antigen_coords)
```

##### 问题设定：为什么需要 IgGM

很多抗体共设计方法假设已有抗体-抗原复合物结构，或至少已有 framework region 的结构模板，然后只改 CDR。实际项目中，新抗原对应的候选抗体结构往往未知；工程上更常见的是选取具有良好理化性质的框架区序列，再要求模型设计能结合指定表位的 CDR，并预测结合后的整体构象。

IgGM 因此把问题定义为：给定抗原 \(R_A(S_A, X_A)\)、抗体框架区序列 \(S_F\) 和表位信息，设计 CDR 序列 \(S_C\)，同时预测抗体全部 backbone 坐标 \(X_C, X_F\) 以及与抗原的复合物摆放：

$$
p_\theta(S_C, X_C, X_F \mid S_F, S_A, X_A, \text{epitope})
$$

这种定义比“只设计 CDR H3 序列”更接近真实抗体发现流程，因为模型必须同时处理三个耦合问题：CDR 氨基酸组成、CDR/框架区三维构象、以及抗体相对抗原表位的 docking pose。

##### 网络结构：ESM-PPI、Sgformer 与 Predict Module

IgGM 的第一层是冻结的 ESM-PPI。相比普通单链蛋白语言模型，ESM-PPI 被用于多链蛋白复合物场景，能够提供跨链上下文特征。冻结它的好处是减少训练成本并保留预训练学到的序列-结构先验，后续模块只需学习抗体设计任务中的条件生成映射。

随后，Inter-chain Feature Embedding Module 注入链身份、残基位置和表位标记；Structure Encoder 根据当前带噪结构计算 residue-pair 空间特征，并将距离信息离散化为 pair representation。Sgformer 由 16 个 block 构成，更新 single representation 和 pair representation，机制包括：

$$
S \leftarrow \mathrm{SeqAttentionWithPairBias}(S, Z), \quad
Z \leftarrow Z + \mathrm{OuterProductMean}(S)
$$

以及 triangle update / triangle self-attention。triangle 模块的直觉与 AlphaFold 类似：如果 \(i-k\) 和 \(k-j\) 的关系已知，则 \(i-j\) 的界面几何也应被约束。对抗体设计而言，这尤其重要，因为 CDR 与抗原表位的局部接触必须和整条重链/轻链的摆放一致。

最后，8 层 Predict Module 负责生成结构和序列。结构部分使用 Invariant Point Attention：

$$
\alpha_{ij} \propto \exp\left(
\frac{q_i^\top k_j}{\sqrt{d}} + b_{ij}
- \lambda\|T_i q_i^{point} - T_j k_j^{point}\|^2
\right)
$$

这里 \(T_i\) 是第 \(i\) 个残基的局部刚体框架。IPA 让模型在三维空间中更新结构，同时保持对全局旋转和平移的不变性；sequence head 则把 single representation 投影到 20 类氨基酸概率，完成 CDR 序列恢复。

##### 训练目标：结构、序列和界面同时约束

IgGM 先训练结构组件，再加入序列设计。第一阶段保留真实序列信息，仅训练结构恢复：

$$
\mathcal{L} =
\mathcal{L}_{geo} + \mathcal{L}_{Frame} + \mathcal{L}_{iFrame} + 0.02\mathcal{L}_{viol}
$$

第二阶段加入 CDR 序列恢复：

$$
\mathcal{L} =
\mathcal{L}_{srcv}
+ \mathcal{L}_{geo}
+ \mathcal{L}_{Frame}
+ \mathcal{L}_{iFrame}
+ 0.02\mathcal{L}_{viol}
$$

其中序列恢复是 masked CDR 位置上的 cross entropy：

$$
\mathcal{L}_{srcv} =
-\frac{1}{|\mathcal{D}|}\sum_{i\in \mathcal{D}}\sum_{c=1}^{20} y_i^c\log p_i^c
$$

\(\mathcal{L}_{geo}\) 用 trRosetta 风格的辅助头预测残基对距离和角度，包括 \(D_{ij}, \Omega_{ij}, \Theta_{ij}, \Phi_{ij}\)，并用交叉熵监督 pair 表征：

$$
\mathcal{L}_{geo} =
\sum_{ij} CE(\mathrm{logits}^d_{ij};D_{ij})
+ CE(\mathrm{logits}^{\omega}_{ij};\Omega_{ij})
+ CE(\mathrm{logits}^{\theta}_{ij};\Theta_{ij})
+ CE(\mathrm{logits}^{\phi}_{ij};\Phi_{ij})
$$

\(\mathcal{L}_{Frame}\) 是 residue frame MSE，比较预测和真实残基局部框架的平移与旋转：

$$
d_{Frame}(x,\hat{x}) =
\sqrt{\frac{1}{L}\sum_{l=1}^{L}\left(
w_t\min(\|z_l-\hat{z}_l\|^2,d_{clamp})+
w_r\|I_3-\hat{r}_l^\top r_l\|_F^2
\right)}
$$

\(\mathcal{L}_{iFrame}\) 只在 interface/contact residues 上计算类似距离，使模型更关注抗体-抗原结合界面的相对姿态；\(\mathcal{L}_{viol}\) 则惩罚错误键长、键角和非键合原子碰撞。多链场景中，重链末端与轻链首端之间没有肽键，因此该处不会被错误地施加 peptide bond 惩罚。

##### 扩散过程与 consistency distillation

IgGM 同时处理离散序列和连续结构，所以 forward noise 也分三类：氨基酸序列用离散扩散，\(C_\alpha\) 平移坐标用高斯扩散，残基方向用 SO(3) 扩散。离散序列的转移可写为：

$$
q(s_t \mid s_{t-1}) = \mathrm{Cat}(s_t; p=s_{t-1}Q_t)
$$

连续坐标的边缘分布为：

$$
p(x_t \mid x_0) = \mathcal{N}(x_t;\sqrt{\bar{\alpha}_t}x_0,(1-\bar{\alpha}_t)I)
$$

模型先学习从带噪 \((s_t,x_t)\) 恢复干净 \((s_0,x_0)\)。随后用 consistency distillation 训练一个一致性函数 \(f_\theta(z_t,t)\)，让相邻时间点沿 PF-ODE 轨迹映射到相同干净样本：

$$
\mathcal{L}_{CD}(\theta,\theta^-;\Psi)=
\mathbb{E}_{z,c,n}\left[
d\left(
f_\theta(z_{t_{n+1}},c,t_{n+1}),
f_{\theta^-}(\hat{z}^{\Psi}_{t_n},c,t_n)
\right)
\right]
$$

这使 IgGM 可以单步生成，也可以用少量步数进一步稳定结构。论文采用 10 步作为质量和速度的折中，并用 DockQ 作为候选筛选指标，因为 DockQ 同时反映界面接触和复合物姿态质量。

##### 训练数据与实验信号

训练集来自 SAbDab，按时间切分：截至 2022 年底的实验结构用于训练；2023 年下半年的低相似样本构成测试集，包含 60 个传统抗体复合物和 27 个纳米抗体复合物。评估指标包括 CDR 氨基酸恢复率 AAR、CDR backbone RMSD、整体 TM-score/lDDT、界面 DockQ、iRMS、LRMS 和 DockQ>0.23 的 success rate。

在抗体 de novo 设计中，IgGM 在 all-CDR 设计上相较 DiffAb、MEAN、dyMEAN 获得更高 AAR 和更好的界面指标；论文报告 H3 AAR 为 0.360，DockQ 为 0.246，SR 为 0.433。若用 AlphaFold 3 结构初始化，DockQ 提升到 0.326，SR 提升到 0.627，说明 IgGM 可以利用更强的初始结构作为 refinement/generation 起点。

##### 与已有抗体设计方法的区别

| 维度 | MEAN / DiffAb / dyMEAN 等 | IgGM |
|------|---------------------------|------|
| 输入假设 | 常依赖已知抗体结构、模板或固定框架构象 | 只需抗原结构、表位和框架区序列即可生成完整结构 |
| 设计范围 | 常聚焦 CDR H3 或给定结构上的局部 CDR | 可设计 CDR H3、heavy-chain CDR 或 all CDRs |
| 结构生成 | 部分方法只生成局部结构或依赖外部 docking | 直接输出抗体-抗原复合物结构 |
| 生成模型 | 扩散或图生成，但多步采样成本较高 | diffusion 预训练 + consistency distillation，支持单步/少步生成 |
| 纳米抗体 | 通常需要专门模型或适配 | 纳米抗体作为单重链场景统一处理 |

> ⚠️ 注意：IgGM 的评价仍主要是 in silico 指标。论文也明确指出，计算筛选与湿实验亲和力/特异性之间仍有差距，未来需要更强的 discriminator 或实验验证闭环。

#### 🧪 练习题

```yaml
question: "IgGM 相比许多既有抗体共设计方法，最贴近真实应用场景的关键设定是什么？"
options:
  - "只预测抗原序列，不处理抗体结构"
  - "给定抗原结构和抗体框架区序列，同时生成 CDR 序列与完整抗体-抗原复合物结构"
  - "要求用户先提供实验解析的抗体-抗原复合物结构"
  - "只优化已经存在抗体的单个点突变"
answer: 1
explain: "IgGM 的问题设定是假设框架区结构未知，只给框架区序列和抗原/表位条件；模型需要同时完成 CDR 序列设计、抗体整体结构预测和复合物 docking pose 生成。"
```
