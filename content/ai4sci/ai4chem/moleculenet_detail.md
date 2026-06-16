### MoleculeNet — 分子机器学习的标准化数据集与评估协议

```yaml
id: moleculenet
name: MoleculeNet
full_name: 分子性质预测基准 (MoleculeNet)
year: '2018'
org: Stanford University
paper_url: https://pubs.rsc.org/en/content/articlelanding/2018/sc/c7sc02664a
category: property
parent: —
motivation: 化学AI的ImageNet，多维度标准数据集
```

#### 📝 一句话总结

MoleculeNet 不是单个预测模型，而是为分子机器学习建立统一的数据集、划分方式、评价指标、特征化器和基线模型，使分子性质预测从“各算各的”变成可复现实验比较。

#### 🎯 核心要点

- **基准定位**：面向分子机器学习的 ImageNet 式基准，解决不同论文使用不同数据、split 和 metric 导致不可比较的问题
- **数据覆盖**：论文版本整理 17 个公开数据集、超过 70 万个化合物，覆盖量子力学、物理化学、生物物理和生理/毒理四类性质
- **统一入口**：所有数据集集成到 DeepChem 的 MolNet/`deepchem.molnet` 加载接口中，支持标准化下载、特征化、划分和变换
- **标准 split**：默认训练/验证/测试比例为 80/10/10，并提供 random、scaffold、stratified 和 time split
- **推荐 metric**：回归任务使用 MAE/RMSE，分类任务使用 ROC-AUC 或 PRC-AUC；高度类别不平衡任务更强调 PRC-AUC
- **特征化器集合**：实现 ECFP4、Coulomb Matrix、Grid Featurizer、Symmetry Function、Graph Convolution 和 Weave 等分子表示
- **基线模型集合**：比较 Logistic Regression、SVM/KRR、Random Forest、Gradient Boosting、Multitask Network、IRV、GraphConv、Weave、DAG、DTNN、ANI-1、MPNN 等方法
- **关键结论**：可学习图表示整体很强，但在小数据、强类别不平衡、量子力学和蛋白-配体任务中，物理感知特征和合适 split 往往比单纯换模型更重要

#### 🔬 深入细节

##### 图示与可访问来源

![MoleculeNet 数据集任务层级](https://pubs.rsc.org/image/article/2018/sc/c7sc02664a/c7sc02664a-f2_hi-res.gif)
*图：MoleculeNet Figure 2。不同数据集覆盖从原子/分子量子性质到药物体内影响的多层级分子性质。*

可访问来源：RSC Open Access 论文页 https://pubs.rsc.org/en/content/articlelanding/2018/sc/c7sc02664a；arXiv 页面 https://arxiv.org/abs/1703.00564；RSC Figure 1 图像 https://pubs.rsc.org/image/article/2018/sc/c7sc02664a/c7sc02664a-f1_hi-res.gif。

##### 算法伪代码

```python
# MoleculeNet-style benchmark protocol
def run_moleculenet_benchmark(dataset_name, featurizer, splitter, model, metric):
    # 1. Load curated molecules and task labels
    tasks, raw_dataset, transformers = molnet_load(dataset_name)

    # 2. Convert SMILES / coordinates / protein-ligand structures to model inputs
    X = featurizer.featurize(raw_dataset.molecules)
    y = raw_dataset.labels
    masks = raw_dataset.label_masks

    # 3. Split by a protocol appropriate for chemistry
    train, valid, test = splitter.train_valid_test_split(
        X, y, masks, frac_train=0.8, frac_valid=0.1, frac_test=0.1
    )

    # 4. Fit hyperparameters on validation set only
    best_model = None
    best_valid = -float("inf")
    for params in hyperparameter_grid(model):
        candidate = model(**params)
        candidate.fit(train)
        score = evaluate(candidate, valid, metric, transformers)
        if score > best_valid:
            best_valid = score
            best_model = candidate

    # 5. Report final held-out test score with the recommended metric
    test_score = evaluate(best_model, test, metric, transformers)
    return test_score
```

##### 为什么需要 MoleculeNet

化学机器学习的难点不是只有模型结构。分子数据通常昂贵、稀疏、异质，而且任务跨度很大：QM9 预测量子化学性质，ESOL 预测水溶解度，PDBbind 预测蛋白-配体亲和力，Tox21/ToxCast/ClinTox 预测毒理或临床风险。如果每篇论文只挑自己方便的数据子集、随机划分和评价指标，模型间结论很容易互相矛盾。

MoleculeNet 的核心贡献是把评估协议显式化。一个数据集被定义为：

$$
\mathcal{D}=\{(x_i, y_i, m_i)\}_{i=1}^{N}
$$

其中 \(x_i\) 是分子结构或复合物结构，\(y_i\) 是单任务或多任务标签，\(m_i\) 是标签是否缺失的 mask。标准划分为：

$$
\mathcal{D}=\mathcal{D}_{train}\cup\mathcal{D}_{valid}\cup\mathcal{D}_{test},\quad
|\mathcal{D}_{train}|:|\mathcal{D}_{valid}|:|\mathcal{D}_{test}|=8:1:1
$$

训练集用于拟合参数，验证集用于调超参数，测试集只用于最终报告。这个约束看似普通，但对分子任务非常重要，因为随机划分会把相似骨架分子同时放进训练和测试，夸大泛化能力。

##### Split：化学泛化比随机泛化更难

MoleculeNet 提供多种 split：

- **Random split**：随机划分样本，适合快速 sanity check，但可能泄漏相似 scaffold
- **Scaffold split**：按 Bemis-Murcko scaffold 分组，让结构骨架不同的分子进入不同集合，更接近药物发现中的 scaffold hopping
- **Stratified split**：在 QM7 等回归任务中按标签排序后均匀抽样，使各集合覆盖相似标签范围
- **Time split**：在 PDBbind 等带时间信息的数据中，用旧数据训练、新数据测试，模拟真实模型部署

Scaffold split 是 MoleculeNet 对后续分子图学习影响最大的实践之一。许多模型在 random split 上差距不大，但在 scaffold split 上性能明显下降，这说明模型未必学到了可迁移的化学规律。

##### Metric：类别不平衡时 PRC-AUC 更敏感

回归任务常用 MAE 和 RMSE：

$$
\mathrm{MAE}=\frac{1}{N}\sum_{i=1}^{N}|\hat{y}_i-y_i|
$$

$$
\mathrm{RMSE}=\sqrt{\frac{1}{N}\sum_{i=1}^{N}(\hat{y}_i-y_i)^2}
$$

分类任务常用 ROC-AUC 和 PRC-AUC。ROC 曲线横轴使用假阳性率：

$$
\mathrm{FPR}=\frac{FP}{FP+TN}
$$

PR 曲线使用 precision：

$$
\mathrm{Precision}=\frac{TP}{TP+FP}
$$

当阳性样本极少时，少量假阳性会显著拉低 precision，但对 FPR 的影响可能不明显。因此 MoleculeNet 建议对正例率很低的虚拟筛选类任务使用 PRC-AUC，对其他分类任务使用 ROC-AUC。这一点避免了模型在高度不平衡任务上“看起来 AUC 很高，但真正命中很少”的问题。

##### Featurization：同一任务可以比较固定特征和可学习表示

MoleculeNet 将分子表示也纳入基准，而不是只比较模型。典型特征包括：

- **ECFP4**：把以原子为中心的局部子结构迭代扩展后 hash 成固定长度二进制指纹
- **Coulomb Matrix**：用核电荷和原子间距离编码 3D 分子，适合量子化学任务
- **Grid Featurizer**：为蛋白-配体复合物构建空间网格，编码氢键、盐桥和 SPLIF 等相互作用
- **Symmetry Function**：用径向和角向对称函数描述局部原子环境，强调平移、旋转和置换不变性
- **Graph Convolution / Weave**：把原子作为节点、键或原子对作为边/对特征，支持图神经网络端到端学习

Coulomb Matrix 的核心定义是：

$$
M_{IJ}=
\begin{cases}
0.5 Z_I^{2.4}, & I=J \\
\frac{Z_I Z_J}{\|R_I-R_J\|}, & I\ne J
\end{cases}
$$

它天然对平移和旋转不变，但不自动对原子编号置换不变，因此论文还讨论了随机排序和展开等处理。这个例子说明 MoleculeNet 关注的是完整评估链路：表示选择、模型选择、split 和 metric 都会影响结论。

##### 基线模型与主要发现

MoleculeNet 同时评估传统方法和图模型。传统方法包括 Logistic Regression、SVM/KRR、Random Forest、Gradient Boosting、Multitask Network 和 IRV；图模型包括 Graph Convolution、Weave、DAG、DTNN、ANI-1 和 MPNN。这样做的好处是避免把“新模型变强”误判为“新特征、split 或调参变强”。

论文结论具有长期影响：可学习表示通常是强基线，尤其在有足够数据的分子性质预测中表现突出；但在数据稀缺、类别高度不平衡、量子力学和蛋白-配体结构任务中，物理先验特征、3D 几何和恰当指标仍然非常关键。换句话说，MoleculeNet 并没有宣称图神经网络总是赢，而是把“什么时候赢、在哪种 split 上赢、用什么 metric 赢”变成可检验问题。

##### 与普通数据库的区别

PubChem、ChEMBL、PDBbind 等数据库主要服务检索和知识沉淀；MoleculeNet 则服务机器学习评估。它要求每个任务都有明确输入、标签、推荐 split、推荐 metric、基线实现和可复现实验脚本。这个规范后来成为分子预训练、图神经网络、分子 Transformer 和 ADMET 预测论文的共同参照系。

> 💡 关键：MoleculeNet 的贡献不是“收集了很多分子”，而是规定了如何公平地用这些分子比较算法。

#### 🧪 练习题

```yaml
question: "为什么 MoleculeNet 在药物发现类任务中强调 scaffold split？"
options:
  - "它可以让训练和测试分子共享更多相同骨架，从而提高测试分数"
  - "它按分子骨架划分数据，更能检验模型对新化学骨架的泛化能力"
  - "它只适用于量子化学数据集，不适用于分类任务"
  - "它会自动把所有缺失标签补全"
answer: 1
explain: "Scaffold split 将结构骨架相似的分子分到同一集合，减少训练/测试间的相似性泄漏，因此比随机划分更接近真实药物发现中的新骨架预测。"
```
