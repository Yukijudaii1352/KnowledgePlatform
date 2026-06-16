### RoseTTAFold — 三轨网络同步推理序列、距离与三维坐标

```yaml
id: rosettafold
name: RoseTTAFold
full_name: RoseTTAFold (RoseTTAFold)
year: '2021.07'
org: Baker Lab
paper_url: https://www.science.org/doi/10.1126/science.abj8754
category: protein_structure
parent: —
motivation: 三轨网络同步迭代序列距离坐标
```

#### 📝 一句话总结

RoseTTAFold 提出三轨神经网络，在 1D MSA/序列表征、2D 残基对距离与取向表征、3D 坐标表征之间反复传递信息，使结构预测不再只在最后阶段才接触三维坐标，并能快速生成单体和蛋白复合物模型。

#### 🎯 核心要点

- **三轨架构**：并行维护 1D sequence/MSA track、2D distance/orientation track、3D coordinate track
- **跨轨信息流**：1D、2D、3D 表征在网络内部多次交换，使序列共变、残基对几何和原子坐标同步约束彼此
- **SE(3)-equivariant 结构更新**：3D track 使用等变注意力更新骨架坐标，保证旋转和平移下几何关系一致
- **两种输出模式**：pyRosetta 版本用预测距离/取向分布生成全原子模型；end-to-end 版本直接输出骨架坐标
- **不连续裁剪策略**：训练和推理中使用两段不连续序列片段组成的 crop，降低显存压力并保留长程互作信息
- **质量估计与实验建模**：输出逐残基误差/质量估计，可辅助 X-ray 分子置换和 cryo-EM 模型搭建
- **复合物预测能力**：可把两条或多条链作为带 chain break 的输入，直接预测复合物构象，绕过先建单体再刚体 docking 的传统流程
- **开放可用**：通过 Robetta server、GitHub 和 Zenodo 发布模型与代码，加速社区复现和下游设计

#### 🔬 深入细节

##### 模型架构图与可访问来源

![RoseTTAFold 三轨网络架构与性能](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/99d8/7612213/a047a0a660ce/EMS140725-f001.jpg)
*图：Science/PMC Fig. 1。RoseTTAFold 同时更新 1D、2D、3D 三条信息轨道，并在 CASP14 与 CAMEO 基准上展示自动化预测性能。*

可访问来源：Science DOI https://www.science.org/doi/10.1126/science.abj8754；PMC XML 与图像 https://europepmc.org/article/pmc/7612213；IPD PDF https://www.ipd.uw.edu/wp-content/uploads/2021/07/Baek_etal_Science2021_RoseTTAFold.pdf；代码 https://github.com/RosettaCommons/RoseTTAFold。

##### 算法伪代码

```python
# RoseTTAFold 简化流程：1D/2D/3D 三轨同步更新
def rosettafold_predict(sequences, templates=None):
    msa = build_or_pair_msa(sequences)
    crops = make_discontinuous_crops(sequences, total_len=260)

    crop_outputs = []
    for crop in crops:
        M = init_msa_track(msa, crop)          # 1D / MSA representation
        P = init_pair_track(msa, templates)    # 2D distance/orientation representation
        X = init_backbone_frames(crop)         # 3D coordinate representation

        for block in three_track_blocks:
            M = msa_attention(M, pair_bias=P)
            P = pair_update_from_msa(P, M)
            P = pair_attention_and_triangle_update(P)
            X = se3_equivariant_update(X, M, P)
            P = pair_update_from_coordinates(P, X)

        crop_outputs.append({
            "pair_logits": predict_dist_orient(P),
            "coords": predict_backbone(X),
            "lddt": predict_local_quality(M, P, X),
        })

    merged = merge_crop_predictions(crop_outputs)
    if use_pyrosetta:
        return pyrosetta_build_all_atom(merged["pair_logits"])
    return build_backbone_model(merged["coords"], merged["lddt"])
```

##### 动机与背景

RoseTTAFold 出现时，AlphaFold 2 在 CASP14 已展示巨大优势，但完整方法尚未发表。Baker Lab 从公开报告中提炼出关键方向：直接使用 MSA 而非预处理共变矩阵、用注意力替代纯二维卷积、让 1D 与 2D 表征反复交流、用等变网络处理三维坐标、尽可能端到端训练。

RoseTTAFold 的设计重点是进一步把三维坐标提前放入网络主体，而不是只在最后结构模块中处理。论文把这一点称为 1D、2D、3D 三轨：1D track 负责序列/MSA 上下文，2D track 负责残基对距离和取向，3D track 负责当前结构坐标。三条轨道之间有多条连接，模型可以一边更新共变信息，一边调整 pair 几何，一边修正三维骨架。

##### 三轨表征与跨轨更新

可以把 RoseTTAFold 的状态抽象为：

$$
M \in \mathbb{R}^{N_{\mathrm{msa}}\times L\times c_m},\quad
P \in \mathbb{R}^{L\times L\times c_p},\quad
X \in \mathbb{R}^{L\times 3\times c_x}
$$

其中 \(M\) 存储 MSA/序列信息，\(P\) 存储残基对距离与取向信息，\(X\) 存储骨架原子或残基框架坐标。一个三轨 block 的关键计算可以概括为：

$$
\begin{aligned}
M' &= \mathrm{MSAAttention}(M; P) \\
P' &= P + f_{\mathrm{MSA}\rightarrow\mathrm{pair}}(M') + f_{\mathrm{2D}}(P) \\
X' &= \mathrm{SE3Transformer}(X; M', P') \\
P'' &= P' + f_{\mathrm{coord}\rightarrow\mathrm{pair}}(X')
\end{aligned}
$$

> 💡 关键：2D pair track 不是三维结构之前的最终输出，而是贯穿全网络的工作记忆；3D 坐标也不是最后才生成，而是在中间层就参与约束 1D/2D 表征。

##### 训练目标与关键计算

RoseTTAFold 是多任务训练。pyRosetta 版本关注残基对距离/取向分布，end-to-end 版本还训练坐标输出和局部质量估计。可概括为：

$$
\mathcal{L} =
\mathcal{L}_{\mathrm{dist/orient}}^{\mathrm{CE}}
+ \lambda_{\mathrm{coord}}\mathcal{L}_{\mathrm{coord}}
+ \lambda_{\mathrm{quality}}\mathcal{L}_{\mathrm{lDDT}}
+ \lambda_{\mathrm{geom}}\mathcal{L}_{\mathrm{geometry}}
$$

其中距离/取向项通常是离散分箱交叉熵：

$$
\mathcal{L}_{\mathrm{dist/orient}}^{\mathrm{CE}}
= -\sum_{i<j}\sum_b y_{ij,b}\log p_{ij,b}
$$

坐标项约束预测骨架与真实结构对齐后的几何误差；质量项训练模型输出逐残基可信度，便于在分子置换或 cryo-EM 建模中给高可信区域更高权重。论文还报告了 end-to-end 版本和 pyRosetta 版本的取舍：前者速度快、可直接输出骨架；后者显存需求低一些并能通过 Rosetta 生成全原子侧链模型，但需要额外 CPU 建模时间。

##### 不连续 crop 与推理流程

三轨网络显存成本高，论文没有直接在大蛋白全长上训练最大模型，而是把输入切成两个不连续序列片段，总长度约 260 个残基。这样做不仅节省显存，也让模型在一个 crop 中看到远距离片段之间的相互作用。推理时对多个 crop 的 1D/2D 预测进行合并和平均，再生成最终结构。

对于单体预测，RoseTTAFold 可以走两条路径：一是把平均后的距离/取向分布送入 pyRosetta 生成全原子模型；二是把表征送入最终 SE(3)-equivariant 层直接生成骨架坐标。对于复合物预测，模型把多条链作为带 chain break 的输入，并使用 paired MSA 中的共进化信息推断链间摆放。

##### 与 AlphaFold 2 和 trRosetta 的区别

trRosetta 主要预测距离和取向，然后依赖 Rosetta 约束优化；AlphaFold 2 公开论文中的结构模块在 Evoformer 之后集中生成三维结构。RoseTTAFold 的差异在于把三维轨道更早、更频繁地放入主干网络，让坐标状态反过来影响 pair 表征和 MSA 注意力。

这种设计带来两个实际优势。第一，结构生物学应用中，RoseTTAFold 预测模型足以帮助解决多个 X-ray 分子置换和 cryo-EM 建模问题；第二，网络可以自然处理 chain break，因此能从多个蛋白序列直接输出复合物模型，避免“先预测单体、再刚体 docking、最后局部松弛”的长流程。

##### 结果与限制

RoseTTAFold 在 CASP14 目标上明显优于 Baker Lab 先前的两轨模型和 trRosetta 系列，在 CAMEO 中也超过多个公开服务器。论文同时承认其 CASP14 精度仍低于 AlphaFold 2，原因可能包括模型规模、显存限制、损失设计和推理采样强度。它的价值不只是刷新精度，而是证明高精度蛋白质结构预测可以由开放学术团队实现，并且三轨思想后来成为 RFdiffusion 等蛋白质设计模型的重要基础。

#### 🧪 练习题

```yaml
question: "RoseTTAFold 的“三轨”架构主要指什么？"
options:
  - "同时训练三个完全独立的模型并投票"
  - "在 1D 序列/MSA、2D 残基对几何和 3D 坐标表征之间反复交换信息"
  - "分别预测蛋白质、RNA 和小分子结构"
  - "只用三次 Rosetta 松弛来提升结构质量"
answer: 1
explain: "RoseTTAFold 的核心是 1D、2D、3D 三类表征在网络内部同步更新，使序列共变、距离/取向和坐标几何相互约束。"
```
