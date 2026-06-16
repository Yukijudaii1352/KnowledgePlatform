### HelixADMET — 螺旋ADMET预测 (HelixADMET)

```yaml
id: helixadmet
name: HelixADMET
full_name: 螺旋ADMET预测 (HelixADMET)
year: '2025'
org: Baidu Research
paper_url: https://arxiv.org/abs/2501.09876
category: admet
parent: admetlab
motivation: 自监督学习精度提升4%
```

#### 📝 一句话总结

HelixADMET 提出一个面向 ADMET 端点的三阶段迁移学习系统，用 2000 万无标注分子自监督预训练 GNN，再通过多任务监督学习和单端点微调提升对未见分子骨架的泛化能力。任务给定的 `paper_url` 未能对应到 HelixADMET 正文；本文方法依据可访问论文 `https://arxiv.org/abs/2205.08055` 和 OUP 论文图源。

#### 🎯 核心要点

- 三阶段训练框架：Stage 1 自监督预训练、Stage 2 多任务监督迁移、Stage 3 每个 ADMET 端点单独微调
- 大规模无标注数据：从 ZINC15 drug-like 子集抽取约 2000 万分子，用于学习通用化学图表示
- 三类自监督任务：局部子图的节点/边掩码恢复、键长/键角几何预测、ECFP/MACCS 分子指纹预测
- 多任务监督迁移：同时训练理化/ADMET 端点和辅助生物活性任务，扩大监督信号并缓解单端点标注稀缺
- 独立端点微调：Stage 3 复制 backbone 和 head，学习率降低 10 倍，减少多任务干扰并保留预训练知识
- 模型骨架组合：主模型使用 LiteGEM 与 GINE+ 图神经网络，系统中也保留 Random Forest 作为传统指纹模型补充
- 端点覆盖全面：系统提供 52 个 ADMET 相关端点，覆盖理化性质、药物化学、吸收、分布、代谢、排泄和毒性
- 泛化提升明确：论文报告在可比端点上相对已有 ADMET 系统整体提升约 4%，三阶段框架在 scaffold split 下平均 AUC 从 0.767 提升到 0.817

#### 🔬 深入细节

##### 图示与来源

![HelixADMET 三阶段训练框架](https://oup.silverchair-cdn.com/oup/backfile/Content_public/Journal/bioinformatics/38/13/10.1093_bioinformatics_btac342/2/m_btac342f2.jpeg?Expires=2147483647&Key-Pair-Id=APKAIE5G5CRDK6RD3PGA&Signature=RI7l4~mIjJ4HwaGkY8x-~Qt6YqFhqzP7qPHeHGVKnau-sWpbsh4r9AxlIoIGQ~1W85iUye5cj6UTuUynMkYjsbJ5c7g3UI-PrRvx5P6F8isSXj2Ie5PX~Qwy3grXyObOnVEPwqTX7~eoOtheq-pDOHHQs0fajQR95F7XAdw-dmZDRrV4stIoRjqnLPjZQMy1t-RsVUgiL~I4VxnTgcCa9dYJrpfUaal2eUjK-pEGEaecMhJG-BQLU9hPugzZlWDJV8U~VjixVwPIIFG14FHENW8sp2wu7moRPW~vlhJktU~JzyF2GOKJe9DtyaZwv3LJHT9lP65EsFEfVi3AOF-Wkg__)
*图：HelixADMET 的核心框架。前两阶段共享 GNN backbone，并在自监督任务和监督任务之间迁移知识；第三阶段为每个端点复制独立模型做单任务微调。*

##### 核心流程伪代码

```python
# HelixADMET 三阶段训练伪代码
backbone = GNNBackbone(model="LiteGEM or GINE+")

# Stage 1: self-supervised pretraining on about 20M unlabeled molecules
for graph in zinc15_unlabeled_loader:
    h = backbone(mask_subgraph(graph))
    loss_node_edge = CE(atom_head(h), masked_atoms) + CE(bond_head(h), masked_bonds)
    loss_geom = CE(length_head(h), bin(bond_lengths)) + CE(angle_head(h), bin(bond_angles))
    loss_fp = BCE(fingerprint_head(h), concat(ecfp_bits, maccs_bits))
    optimize(backbone, loss_node_edge + loss_geom + loss_fp)

# Stage 2: multitask supervised transfer with auxiliary bioactivity tasks
for batch in mixed_labeled_loader:
    h = backbone(batch.graph)
    supervised_losses = []
    for task in batch.available_tasks:
        pred = task_heads[task](h)
        supervised_losses.append(task_loss(pred, batch.labels[task]))
    ssl_loss = optional_ssl_loss(backbone, batch.graph)
    optimize([backbone, task_heads], mean(supervised_losses) + ssl_loss)

# Stage 3: endpoint-specific fine-tuning
endpoint_models = {}
for endpoint in admet_endpoints:
    model = copy(backbone)
    head = copy(task_heads[endpoint])
    for batch in endpoint_loader(endpoint):
        pred = head(model(batch.graph))
        loss = task_loss(pred, batch.label)
        optimize([model, head], loss, lr=stage2_lr / 10)
    endpoint_models[endpoint] = (model, head)
```

##### 关键损失函数

HelixADMET 的图表示把分子写成 \(G=(V,E)\)，原子为节点、化学键为边。节点/边级 SSL 先随机掩码局部子图，再恢复被隐藏的原子和键属性：

$$
\mathcal{L}_{\text{mask}}
= \sum_{v \in V_m}\mathrm{CE}(\hat{x}_v,x_v)
+ \sum_{e \in E_m}\mathrm{CE}(\hat{x}_e,x_e)
$$

几何级 SSL 把 RDKit 生成的键长和键角离散成 bins，让 2D GNN 在预训练阶段吸收部分 3D 构象规律：

$$
\mathcal{L}_{\text{geom}}
= \sum_{(i,j)\in E}\mathrm{CE}(\hat{b}_{ij},\mathrm{bin}(d_{ij}))
+ \sum_{(i,j,k)}\mathrm{CE}(\hat{a}_{ijk},\mathrm{bin}(\theta_{ijk}))
$$

图级 SSL 预测传统化学指纹，把专家定义的局部结构和官能团知识压进图表示：

$$
\mathcal{L}_{\text{fp}}
= \mathrm{BCE}(\hat{\mathbf{f}}_{\text{ECFP}},\mathbf{f}_{\text{ECFP}})
+ \mathrm{BCE}(\hat{\mathbf{f}}_{\text{MACCS}},\mathbf{f}_{\text{MACCS}})
$$

监督阶段则按任务类型选择分类或回归损失。对分类端点使用二元交叉熵，对连续端点使用均方误差，并在可用任务集合 \(\mathcal{T}\) 上做多任务平均：

$$
\mathcal{L}_{\text{sup}}
= \frac{1}{|\mathcal{T}|}\sum_{t\in\mathcal{T}}
\begin{cases}
\mathrm{BCE}(\hat{y}_t,y_t), & t\text{ is classification}\\
\mathrm{MSE}(\hat{y}_t,y_t), & t\text{ is regression}
\end{cases}
$$

##### 方法机制

HelixADMET 针对的是 ADMET 预测中的两个常见问题：单个端点标注数据少，以及训练集和候选药物之间经常存在 scaffold shift。传统 QSAR 或单任务 ML 模型常能在随机划分上表现不错，但遇到训练集中没有出现过的骨架时泛化下降。HelixADMET 通过先在无标注大规模化学空间上学习，再把相关 ADMET 与生物活性任务联合训练，试图让模型在端点标注稀缺时仍拥有更稳定的分子表示。

Stage 1 的三层次 SSL 设计互补。节点/边掩码类似分子图版的 BERT MLM，迫使模型从局部上下文恢复化学类型；几何预测让模型学习键长、键角等物理约束；指纹预测则把 ECFP 与 MACCS 这类人工化学知识作为软标签注入。这样做的直觉是：ADMET 端点往往由局部官能团、整体理化性质和空间构象共同决定，单一掩码任务不足以覆盖全部因素。

Stage 2 的多任务监督迁移是性能提升的主要来源之一。ADMET 端点之间存在相关性，例如膜通透性、logP、P-gp 相关端点和 BBBP 都受分子极性、尺寸、氢键特征影响；CYP 抑制/底物任务也与代谢稳定性相关。共享 backbone 可以让小样本端点从数据更充足的辅助生物活性任务中借到统计强度。

Stage 3 反过来拆开模型，给每个端点单独微调。这一步避免一个端点的梯度继续干扰另一个端点，尤其适合 ADMET 里标签噪声、实验协议和物种来源差异较大的任务。学习率降低 10 倍是为了在任务适配和知识保持之间取平衡，避免单端点小数据把前两阶段学到的通用表示快速冲掉。

论文消融显示，完整 Stage 1+2+3 在 random split 下平均 AUC 为 0.887，而只做 Stage 3 为 0.850；在更难的 scaffold split 下，完整框架为 0.817，只做 Stage 3 为 0.767。这说明方法的价值主要不在记忆相似分子，而在提升对新骨架候选药物的稳健性。

> 💡 关键：HelixADMET 不是单一新 GNN 层的论文，而是把大规模自监督、多任务监督迁移、端点级微调和在线系统封装到 ADMET 场景中的工程化方法。

#### 🧪 练习题

```yaml
question: "HelixADMET 为什么要在多任务监督训练之后再做单端点微调？"
options:
  - "为了把所有端点的预测头合并成一个分类器"
  - "为了消除 SMILES tokenization 带来的语法歧义"
  - "为了让每个端点学习任务特异信息，并降低其他端点梯度的干扰"
  - "为了在推理阶段重新生成 3D 构象"
answer: 2
explain: "Stage 2 共享 backbone 有利于迁移相关任务知识，但 ADMET 端点存在实验协议和标签分布差异。Stage 3 独立微调每个端点，并使用更低学习率保留预训练知识。"
```
