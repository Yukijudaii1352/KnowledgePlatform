### Pocket2Mol：口袋到分子生成

```yaml
id: pocket2mol
name: Pocket2Mol
full_name: 口袋到分子生成 (Pocket2Mol)
year: '2022'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2205.07249
category: generation
parent: e3_edm
motivation: 高效自回归3D生成
```

#### 📝 一句话总结

Pocket2Mol 提出了一种 E(3)-等变的自回归 3D 分子生成器，在给定蛋白结合口袋后逐原子生成配体的坐标、元素类型和化学键，解决了早期 3D 口袋生成方法只建模原子密度、依赖 MCMC 采样且容易产生不真实键连结构的问题。

#### 🎯 核心要点

- **口袋条件自回归生成**：每一步从当前分子片段和蛋白口袋联合图中选择 frontier/focal atom，再生成新原子的相对坐标、元素和键类型
- **E(3)-等变几何网络**：使用 scalar/vector 特征、GVP/GVL 模块和向量神经元，让坐标预测随输入旋转平移正确变换
- **可 tractable 的位置分布**：用 focal atom 的向量表示直接参数化高斯混合分布，避免在 3D 连续空间中用 MCMC 搜索新原子位置
- **联合预测化学键**：在生成新原子后同时预测其与已有分子原子的键类型，把 no-bond 作为一类，减少后处理补键导致的三元环、畸变苯环等偏差
- **局部几何注意力**：element-and-bond predictor 对新原子邻域做消息传递，并用带几何 bias 的 scalar/vector attention 建模键之间的相容性
- **训练方式**：随机 mask 真实配体中的一部分原子，让模型从未 mask 的片段和口袋恢复 frontier、坐标、元素和键
- **主要基准**：在 CrossDocked 数据集上优于 CVAE 和 AR 基线，平均 Vina score、QED、SA、Lipinski 和生成速度都有优势

#### 🔬 深入细节

![Pocket2Mol 生成流程](https://arxiv.org/html/2205.07249v2/x1.png)
*图 1：Pocket2Mol 的逐原子生成流程。左侧为蛋白口袋，右侧为当前分子片段；模型反复选择 frontier/focal atom、采样新原子位置、预测元素和键，直到没有 frontier。*

![Pocket2Mol 键预测模块](https://arxiv.org/html/2205.07249v2/x2.png)
*图 2：element-and-bond predictor 的局部消息传递和注意力结构，用于预测新原子类型及其与已有原子的键类型。*

```python
# Pocket2Mol 自回归采样伪代码
protein_atoms = load_pocket_atoms()
mol = empty_fragment()

while True:
    h_scalar, h_vector = equivariant_encoder(protein_atoms, mol)

    if mol.is_empty():
        frontier = predict_protein_frontier(h_scalar, h_vector, radius=4.0)
    else:
        frontier = predict_molecule_frontier(h_scalar, h_vector, mol)

    if frontier.is_empty():
        break

    focal = sample(frontier)
    delta_x = sample_gmm(position_predictor(h_scalar[focal], h_vector[focal]))
    x_new = coord(focal) + delta_x

    local_neighbors = knn(protein_atoms + mol.atoms, x_new)
    atom_type = sample(element_predictor(x_new, local_neighbors))
    bonds = sample_bond_types(bond_predictor(x_new, mol.atoms, local_neighbors))

    if valid_valence(atom_type, bonds):
        mol.add_atom(atom_type, x_new, bonds)
```

**动机与问题设定**

Pocket2Mol 处理的是结构基础药物设计中的条件生成问题：输入蛋白质 3D 结合口袋 \(P=\{(a_i,\mathbf{x}_i)\}_{i=1}^{N_p}\)，输出一个小分子图 \(M=(V,E,\mathbf{X})\)，其中既要有合理的 3D 坐标，也要有化学上合理的元素和键。此前方法常见两类缺陷：SMILES/2D 图方法无法保证生成物真的适配 3D 口袋；3D 原子密度方法虽然能生成坐标，却往往忽略键类型，最后依赖 OpenBabel 等工具补键，容易产生不真实的小环或畸变芳香环。

Pocket2Mol 的核心选择是把 3D 生成拆成一个局部自回归过程。当前已生成片段中的 frontier atom 表示仍可向外连接的位置；focal atom 是本轮选中的连接点；新原子坐标以 focal atom 为局部参考生成。这样模型不必一次性在整个口袋中预测完整分子，而是在局部几何和化学约束都相对清楚的条件下扩展分子。

**E(3)-等变编码器**

模型把蛋白口袋原子和当前分子片段合并成 KNN 图。节点包含原子元素、氨基酸类型、骨架/侧链标记、分子/蛋白标记、价键计数等 scalar 特征；边包含 RBF 编码距离、键类型、是否有价键等 scalar 特征；同时节点保留坐标向量，边保留单位方向向量作为 vector 特征。编码器用 GVP/GVL 风格的消息传递同时更新 scalar 和 vector 表示。

等变性要求如果输入坐标做旋转平移 \(\mathbf{x}'=R\mathbf{x}+\mathbf{t}\)，模型输出的相对坐标也应按同样旋转变化：

$$
f_{\theta}(R\mathbf{X}+\mathbf{t}) = R f_{\theta}(\mathbf{X})
$$

由于位置预测器直接使用 vector hidden state 生成相对坐标，Pocket2Mol 不需要人为构造局部球坐标系，也不需要通过采样距离约束再求解三维位置。

**四类预测头与损失函数**

frontier predictor 对每个候选原子输出是否还能扩展的概率：

$$
p_i^{\text{frontier}}=\sigma(\mathrm{GVMLP}(\mathbf{h}_i))
$$

position predictor 以 focal atom 的表示为输入，输出新原子相对位移的高斯混合分布：

$$
p(\Delta \mathbf{x}\mid f)=\sum_{k=1}^{K}\pi_k(f)\,
\mathcal{N}\left(\Delta \mathbf{x};\boldsymbol{\mu}_k(f),\operatorname{diag}(\boldsymbol{\sigma}_k^2(f))\right)
$$

element-and-bond predictor 先在新位置附近收集 KNN 邻居，为新原子构造局部表示，再预测元素类别；同时对新原子与已有分子原子的边做分类，类别包括单键、双键、三键、芳香键和 no-bond。键预测注意力中的几何 bias 用来表达“两个键是否能同时存在”的局部相容性，例如一个原子已形成双键后，其剩余价态会限制其他键。

训练时随机 mask 配体原子，未 mask 且连接到 mask 部分的原子作为 frontier，模型恢复被 mask 原子的坐标、元素和键。总体损失是四个监督项之和：

$$
\mathcal{L}=
\mathcal{L}_{\text{frontier}}
+\mathcal{L}_{\text{pos}}
+\mathcal{L}_{\text{element}}
+\mathcal{L}_{\text{bond}}
$$

其中 \(\mathcal{L}_{\text{frontier}}\) 是二元交叉熵，\(\mathcal{L}_{\text{pos}}\) 是真实相对坐标在 GMM 下的负对数似然，元素和键分别使用交叉熵。为了让模型学会“这里不该放原子”，元素分类还加入 Nothing 类，并从环境空间采样负位置。

**与密度采样方法的区别**

AR 基线先学习口袋条件下的 3D 原子密度，再用 MCMC 在连续空间寻找可能位置；Pocket2Mol 则让等变网络直接输出相对坐标分布，因此采样速度明显更快。论文在 CrossDocked 上报告生成 100 个有效分子时，Pocket2Mol 平均约 2503 秒，AR 约 19659 秒，速度差主要来自避免 MCMC 反复探索 3D 空间。

更重要的是，Pocket2Mol 在生成坐标的同时生成键。论文的子结构分析指出，CVAE/AR 容易产生过多三元环或畸变环结构；Pocket2Mol 的环大小分布、键角和二面角分布更接近真实数据。这说明对结构基础生成而言，Vina/QED 等标量指标不足以判断分子是否可化学解释，必须同时约束生成过程中的键连结构。

> 💡 关键：Pocket2Mol 的“高效”不是简单减少步骤，而是把连续 3D 位置搜索变成 focal atom 条件下的显式概率预测，同时把化学键放进生成循环，减少后处理误差。

#### 🧪 练习题

```yaml
question: "Pocket2Mol 为什么能比依赖 MCMC 的自回归 3D 生成方法更快？"
options:
  - "它完全不生成 3D 坐标，只输出 SMILES"
  - "它用 focal atom 的等变向量表示直接参数化新原子相对坐标分布"
  - "它固定所有分子的键长和键角，不需要神经网络预测"
  - "它只在训练集分子中检索最相似配体"
answer: 1
explain: "Pocket2Mol 的位置预测器输出相对坐标的高斯混合分布，可直接采样新原子位置；这避免了在连续 3D 空间中用 MCMC 反复搜索。"
```
