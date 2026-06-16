### RoseTTAFold

```yaml
id: rosettafold
name: RoseTTAFold
full_name: RoseTTAFold (RoseTTAFold)
year: '2021'
org: Baker Lab/UW
paper_url: https://www.science.org/doi/10.1126/science.abj8754
category: protein_structure
parent: —
motivation: 三轨网络同时处理序列距离坐标
```

#### 📝 一句话总结

RoseTTAFold 提出了同时在 1D 序列/MSA、2D 残基对距离图和 3D 坐标空间中推理的三轨网络，使蛋白质结构预测、实验结构解析辅助和蛋白复合物建模能够以较低计算成本快速完成。

#### 🎯 核心要点

- **三轨网络**：并行维护 1D sequence/MSA track、2D pair distance/orientation track 和 3D coordinate track
- **跨轨信息流**：1D、2D、3D 表示在网络主体中多次双向交换信息，而不是先完成二维预测再单独做三维折叠
- **SE(3)-equivariant 3D 推理**：3D track 使用等变注意力/Transformer 操作，使坐标更新对旋转和平移保持一致
- **两种结构生成路径**：pyRosetta 版本把预测的距离/取向分布转为 all-atom 模型；end-to-end 版本直接通过 SE(3) 层输出 backbone 坐标
- **不连续 crop 策略**：训练和推理中使用总长约 260 residues 的 discontinuous crops，再聚合 1D/2D 预测以减轻显存压力
- **快速推理**：论文报告在完成序列和模板搜索后，小于 400 residues 的蛋白可在单张 RTX2080 上约 10 分钟生成 backbone 坐标
- **盲测与应用**：在 CASP14 和 CAMEO 上接近或超过当时服务器方法，并用于分子置换、cryo-EM 建模和蛋白复合物预测
- **开放实现**：Baker Lab/RosettaCommons 发布官方代码和服务器，便于结构生物学社区复现、部署和扩展

#### 🔬 深入细节

##### 架构示意

![RoseTTAFold 三轨网络示意](https://science.sciencemag.org/content/sci/early/2021/07/19/science.abj8754/F1.large.jpg)
*图：Science 论文 Fig. 1，展示 RoseTTAFold 的 1D、2D、3D 三轨架构及 CASP/CAMEO 性能。若该 Science 图片直链受访问策略限制，可使用 Baker Lab 提供的论文 PDF 核对同一图：https://www.ipd.uw.edu/wp-content/uploads/2021/07/Baek_etal_Science2021_RoseTTAFold.pdf 。*

##### 核心流程伪代码

```python
# RoseTTAFold 高层推理流程
def rosettafold(sequence):
    msa = build_msa(sequence)
    templates = search_templates(sequence)

    crops = make_discontinuous_crops(sequence, total_len=260)
    all_pair_logits, all_1d_features = [], []

    for crop in crops:
        S = embed_1d_track(msa, crop)              # sequence/MSA features
        P = embed_2d_track(msa, templates, crop)   # distance/orientation pair features
        X = init_3d_track(crop)                    # backbone frames or coarse coordinates

        for block in range(num_three_track_blocks):
            S = sequence_attention(S, pair_bias=P)
            P = update_pair_from_sequence(S, P)
            X = se3_equivariant_update(X, S, P)
            P = update_pair_from_coordinates(P, X)
            S = update_sequence_from_structure(S, X)

        all_1d_features.append(project_to_full_sequence(S, crop))
        all_pair_logits.append(project_to_full_pairs(P, crop))

    pair_logits = average_over_crops(all_pair_logits)
    features_1d = average_over_crops(all_1d_features)

    if use_pyrosetta:
        restraints = convert_logits_to_rosetta_restraints(pair_logits)
        return pyrosetta_fold(sequence, restraints, templates)
    else:
        return final_se3_backbone_decoder(features_1d, pair_logits)
```

##### 动机：为什么要把坐标作为第三条主干？

AlphaFold2 在 CASP14 中展示的思路启发了 Baker Lab：MSA 原始信息、attention、两轨交互、SE(3) 坐标细化和端到端训练都很关键。RoseTTAFold 的问题意识是，若 3D 坐标只在最后阶段出现，网络主体的大部分推理仍停留在 1D/2D 表示中，坐标几何对早期 residue-pair 表示的反馈不足。

RoseTTAFold 因此把 3D track 提前放进主网络。1D track 处理序列和 MSA 的残基上下文；2D track 表示残基对距离、接触和取向；3D track 持有当前结构坐标或骨架框架。三条轨道反复通信，使模型在每一层都能同时问三个问题：这个残基在进化上像什么？它和其他残基的距离/取向应当是什么？这些关系能否形成合理三维构型？

##### 三轨信息如何互相约束

2D pair track 可以作为 1D attention 的 bias，让序列表示在关注远距离残基时利用当前 pair 几何判断；1D track 的更新又能通过外积或投影产生新的 pair 信息，类似从 MSA 共变模式中提取残基对证据。3D track 则通过 SE(3)-equivariant 模块把 pair 信息落实到坐标，并把坐标派生的距离/方向反馈回 2D track。

如果把 \(S_i\) 表示为残基 \(i\) 的 1D 特征，\(P_{ij}\) 表示残基对特征，\(X_i\in\mathbb{R}^3\) 表示当前坐标，一个简化更新可写为：

$$
S_i' = \text{Attn}_{j}(S_i, S_j; P_{ij})
$$

$$
P_{ij}' = P_{ij} + f_{pair}(S_i', S_j', \|X_i-X_j\|)
$$

$$
X_i' = X_i + f_{SE(3)}(S_i', \{P_{ij}'\}_{j}, \{X_j-X_i\}_{j})
$$

这里 \(f_{SE(3)}\) 必须满足旋转/平移等变：若输入坐标整体旋转平移，输出坐标应以同样方式变换。这保证模型学习的是相对几何而不是任意全局坐标。

##### 损失与结构生成

RoseTTAFold 的监督信号可从两个层面理解。第一层是 2D 几何分布：预测残基间距离 \(d_{ij}\) 以及 backbone 取向角 \(\omega_{ij}, \theta_{ij}, \phi_{ij}\)。这类目标通常使用离散 bin 的交叉熵：

$$
\mathcal{L}_{geom}
= \text{CE}(\hat{p}(d_{ij}), d_{ij})
+ \text{CE}(\hat{p}(\omega_{ij}), \omega_{ij})
+ \text{CE}(\hat{p}(\theta_{ij}), \theta_{ij})
+ \text{CE}(\hat{p}(\phi_{ij}), \phi_{ij})
$$

第二层是 3D 坐标和质量评估。end-to-end 版本通过 SE(3)-equivariant 输出 backbone 坐标，并回传坐标级损失；pyRosetta 版本则把距离/取向分布转换为约束势能，与 Rosetta 物理能量一起优化 all-atom 模型：

$$
E_{total}
= E_{Rosetta}
+ \sum_{i,j} w^d_{ij}[-\log \hat{p}(d_{ij})]
+ \sum_{i,j,a} w^a_{ij}[-\log \hat{p}(a_{ij})]
$$

其中 \(a\) 表示取向角类别。pyRosetta 路径计算更慢但能生成侧链完整的 all-atom 模型，并且对较长蛋白的 GPU 显存要求较低；end-to-end 路径更快，适合服务器化和大规模筛选。

##### Crop、聚合与显存权衡

三轨网络参数多、三维轨道显存开销大，论文没有直接把所有大蛋白完整送入训练，而是使用 discontinuous crops：每个 crop 由两个不连续序列片段组成，总长度约 260 residues。这样既能覆盖长程接触，又能把训练样本控制在可承受大小。

推理时，多个 crop 产生的 1D 特征和 2D 距离/取向预测会投回全长蛋白并平均，再进入 pyRosetta 或最终 SE(3) 解码器。这个设计的直觉是：不同区域最有用的 MSA 序列可能不同，局部 crop 允许模型更专注地利用相关同源序列，同时通过全局聚合恢复整条链的结构约束。

##### 与 AlphaFold 2 和 trRosetta 的区别

trRosetta 主要预测 residue-residue distance/orientation，再交给 Rosetta 优化；RoseTTAFold 继承了这种可解释的几何约束输出，但把三维等变推理纳入网络主体。AlphaFold 2 的 Evoformer 和 Structure Module 在精度上更强，尤其配合 recycling、FAPE、自蒸馏和更大模型训练；RoseTTAFold 的特点是以三轨架构更直接地让坐标早期参与推理，并以开放代码和较低推理成本快速服务结构生物学应用。

> ⚠️ 来源说明：Science 页面和早期 sciencemag 图片直链可能因访问策略在部分环境下触发防护；本文方法细节同时依据 Baker Lab 可访问 PDF、Science DOI 元信息和 RosettaCommons 官方实现说明核对。

#### 🧪 练习题

```yaml
question: "RoseTTAFold 相比两轨蛋白结构预测网络的关键设计是什么？"
options:
  - "完全取消 MSA，只使用单条氨基酸序列"
  - "把 1D 序列、2D 残基对和 3D 坐标作为三条轨道，在网络主体中反复交换信息"
  - "只使用 Rosetta 能量函数，不使用深度学习"
  - "先预测所有侧链原子，再推断 backbone"
answer: 1
explain: "RoseTTAFold 的核心是三轨网络：序列/MSA、距离/取向图和三维坐标同步更新，使坐标几何能够在早期层就约束序列与残基对表示。"
```
