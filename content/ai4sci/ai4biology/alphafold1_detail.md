### AlphaFold 1 — 用深度学习势能折叠蛋白质结构

```yaml
id: alphafold1
name: AlphaFold 1
full_name: AlphaFold 1 (AlphaFold 1)
year: '2020.01'
org: Google DeepMind
paper_url: https://www.nature.com/articles/s41586-019-1923-7
category: protein_structure
parent: —
motivation: 深度残差网络预测距离直方图
```

#### 📝 一句话总结

AlphaFold 1 提出用深度残差网络预测残基对距离直方图和骨架扭转角分布，再把这些概率分布转换为可微的蛋白质特异性势能并用梯度下降折叠结构，解决了传统接触图和片段采样信息量不足、搜索成本高的问题。

#### 🎯 核心要点

- **距离直方图而非二值接触图**：对每个残基对预测 \(C_\beta\) 距离的完整概率分布，保留近、中、远距离约束和不确定性
- **深度二维残差卷积网络**：以序列特征、MSA profile、共进化/Potts 特征为输入，在 \(L \times L\) 残基对网格上预测 distogram
- **骨架扭转角预测**：同时预测每个残基的 \(\phi,\psi\) 分布，为从角度空间生成三维骨架提供局部构象先验
- **概率到势能的转换**：把预测距离分布除以参考态分布，构造类似势均力的蛋白质特异性势能
- **可微结构优化**：直接优化扭转角，反复执行梯度下降和 noisy restarts，最后可用 Rosetta/物理约束做松弛
- **CASP13 突破**：在 free-modelling 域中 24/43 个达到 TM-score \(\ge 0.7\)，明显高于下一名的 14/43
- **承上启下**：仍是“预测约束 + 优化”的两阶段范式，但把结构预测从手工势能/采样推进到深度学习概率势能

#### 🔬 深入细节

##### 框架图与可访问来源

![AlphaFold 1 系统与残差网络示意图](https://media.springernature.com/full/springer-static/esm/art%3A10.1038%2Fs41586-019-1923-7/MediaObjects/41586_2019_1923_Fig5_ESM.jpg)
*图：Nature Extended Data Fig. 1。整体流程从序列和 MSA 特征出发，经深度 ResNet 预测距离/扭转角分布，再构造势能并用梯度下降生成结构。*

可访问来源：论文页面 https://www.nature.com/articles/s41586-019-1923-7；Nature 图像直链见上；可访问 PDF 版本包括 https://discovery.ucl.ac.uk/10089234/1/343019_3_art_0_py4t4l_convrt.pdf。

##### 算法伪代码

```python
# AlphaFold 1 核心流程：distogram -> potential -> gradient descent
def alphafold1_predict(sequence):
    msa = build_msa(sequence, tools=["HHblits", "PSI-BLAST"])
    one_d_features = make_sequence_and_profile_features(sequence, msa)
    two_d_features = make_pair_features(msa)  # covariation / Potts / sequence separation

    # Deep ResNet 在残基对矩阵上输出概率分布
    p_dist = distogram_resnet(one_d_features, two_d_features)  # [L, L, 64 bins]
    p_torsion = torsion_head(one_d_features, two_d_features)   # per-residue phi/psi

    candidates = []
    for restart in range(num_noisy_restarts):
        phi, psi = sample_initial_torsions(p_torsion)
        for step in range(num_gradient_steps):
            coords = build_backbone_from_torsions(sequence, phi, psi)
            loss = distance_potential(coords, p_dist)
            loss += torsion_potential(phi, psi, p_torsion)
            loss += vdw_and_chain_geometry_penalties(coords)
            phi, psi = optimizer_step([phi, psi], loss)
        candidates.append(relax_and_score(coords))

    return select_lowest_potential(candidates)
```

##### 动机与背景

AlphaFold 1 面对的是 CASP13 时代的典型瓶颈：共进化方法已经能预测“两个残基是否接触”，但二值接触图只告诉模型距离是否小于某个阈值，无法表达“应该是 6Å、10Å 还是 18Å”，也无法表达预测不确定性。传统 Rosetta 片段组装和模拟退火需要大量采样，尤其在长链、少同源序列或多域蛋白上容易搜索失败。

AlphaFold 1 的关键选择是把结构问题拆成两步：先学习高维几何约束，再用可微优化实现这些约束。论文中的 distogram 是全距离分布而非单个距离点估计；如果某个残基对存在多峰或不确定性，分布会把这种信息保留下来，后续势能优化时不会被一个错误的硬约束绑死。

##### 深度残差网络预测 distogram

网络输入由一维特征和二维特征拼接而成。一维特征包括氨基酸类型、profile、二级结构相关信息等；二维特征包括残基间序列距离、MSA 诱导的协方差/共进化信号。对每个残基对 \((i,j)\)，网络输出离散距离分布：

$$
p_{ij,b} = P(d_{ij} \in \text{bin}_b \mid S, \mathrm{MSA}(S)), \quad b=1,\ldots,B
$$

训练目标是对真实结构中的 \(C_\beta\) 距离分箱做交叉熵：

$$
\mathcal{L}_{\mathrm{dist}} =
-\sum_{i<j}\sum_{b=1}^{B} y_{ij,b}\log p_{ij,b}
$$

其中 \(y_{ij,b}\) 是真实距离所在分箱的 one-hot 标签。公开方法描述中给出的最终模型使用 64 个距离分箱覆盖约 2-22Å 的范围；深度残差块和膨胀卷积让远距离残基对的信息可以在二维矩阵中快速传播。

##### 从概率分布构造势能

单纯最大化每个残基对的预测概率会偏向背景距离分布，因此 AlphaFold 1 引入参考态 \(p^{\mathrm{ref}}_{s,b}\)，其中 \(s=|i-j|\) 表示序列间隔。距离势能可理解为预测分布相对参考态的对数似然比：

$$
V_{\mathrm{dist}}(X)
= -\sum_{i<j}
\log \frac{
p_{ij}(b(d_{ij}(X)) \mid S,\mathrm{MSA})
}{
p^{\mathrm{ref}}_{|i-j|}(b(d_{ij}(X)))
}
$$

完整优化目标还包含扭转角势能和物理排斥项：

$$
V(X,\phi,\psi)
= V_{\mathrm{dist}}(X)
+ \lambda_{\mathrm{tor}}V_{\mathrm{tor}}(\phi,\psi)
+ \lambda_{\mathrm{vdw}}V_{\mathrm{vdw}}(X)
$$

> 💡 关键：这里的势能不是从原子物理一项项手写出来的，而是由神经网络对“这条序列应该呈现什么几何关系”的概率判断转换而来。深度学习负责给出全局几何约束，优化器负责找到满足这些约束的三维构象。

##### 结构生成与传统方法的区别

AlphaFold 1 在扭转角空间中构建骨架，使用梯度下降降低 \(V\)。因为从 \(\phi,\psi\) 到原子坐标是可微的，距离误差可以反传到角度变量。noisy restarts 的作用是缓解非凸优化：不同初始角度会探索不同折叠路径，最终选择势能最低或综合评分最好的候选结构。

与 trRosetta 等同代方法相比，AlphaFold 1 的距离分布更直接地提供了“应当相距多远”的软约束；与传统 Rosetta 相比，它不再主要依赖片段库和手工统计势，而是用 PDB/MSA 数据训练出的网络生成蛋白质特异性势能。它仍不是 AlphaFold 2 那种端到端坐标网络，但已经证明了“深度网络预测全局几何 + 可微优化”可以显著优于接触图驱动的采样流程。

##### 局限性

AlphaFold 1 的三维结构不是网络一次性输出，而是经过后处理优化得到；距离预测、扭转角预测和最终坐标之间存在目标错配。它也没有 AlphaFold 2 的等变结构模块、recycling 和端到端 FAPE 训练，因此局部原子级几何、结构置信度和长程多域装配仍有明显短板。

#### 🧪 练习题

```yaml
question: "AlphaFold 1 为什么要预测距离直方图而不是只预测接触图？"
options:
  - "距离直方图能表达残基对距离的完整概率分布和不确定性，给势能优化提供更丰富约束"
  - "距离直方图可以完全避免使用多序列比对"
  - "距离直方图让网络不再需要训练标签"
  - "距离直方图只用于可视化，对结构优化没有影响"
answer: 0
explain: "接触图通常只表示是否小于某个阈值；distogram 保留距离分箱概率和不确定性，能被转换为蛋白质特异性势能来指导梯度下降。"
```
