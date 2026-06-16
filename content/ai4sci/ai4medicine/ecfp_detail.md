### ECFP — 扩展连接指纹

```yaml
id: ecfp
name: ECFP
full_name: 扩展连接指纹 (ECFP)
year: '2010'
org: Accelrys
paper_url: https://pubs.acs.org/doi/10.1021/ci100050t
category: screening
parent: —
motivation: 扩展连接指纹编码分子子结构
```

#### 📝 一句话总结

ECFP 提出了一种基于 Morgan 圆形邻域扩展的分子指纹算法，通过迭代哈希每个原子的局部环境，把分子图编码为可快速比较的子结构特征集合，解决了虚拟筛选和 QSAR 中分子结构表示稀疏、可解释且高效的问题。

#### 🎯 核心要点

- **圆形拓扑指纹**：每个特征对应以某个原子为中心、给定半径内的 circular atom neighborhood
- **Morgan 算法变体**：不追求唯一原子编号，而是在固定迭代轮数内保留每一轮产生的 atom identifier
- **三阶段生成流程**：初始原子标识符分配 → 邻域迭代更新/哈希 → 重复特征去重或计数保留
- **可配置原子不变量**：常用原子序数、重原子邻居数、氢数、形式电荷、环成员关系，也可加入同位素、手性或药效团类别
- **ECFP 命名按直径**：ECFP4 表示最大直径 4、半径 2；ECFP6 表示最大直径 6、半径 3
- **两类输出表示**：稀疏整数 identifier 集合保留可解释性，固定长度 bit vector 便于 Tanimoto 相似度与机器学习输入
- **哈希折叠会碰撞**：将无限/超大虚拟 bit string 折叠到 1024/2048 位时可能让不同子结构落到同一 bit
- **FCFP 变体**：Functional-Class Fingerprints 用氢键供体/受体、芳香性、正负电荷等功能类别替代具体元素，增强药效团层面的泛化
- **典型用途**：高通量筛选命中分析、配体相似性搜索、化合物聚类、QSAR/QSPR、ADMET 预测和分子机器学习 baseline

#### 🔬 深入细节

![ECFP 生成过程](https://docs.chemaxon.com/latest/images/download/attachments/1806333/ecfp_generation.png)
*图：ECFP 从一个分子出发，分别生成 diameter 0、2、4 的原子中心邻域，并将每个邻域映射为整数 identifier。来源：Chemaxon ECFP 文档。*

![ECFP bit folding](https://docs.chemaxon.com/latest/images/download/attachments/1806333/ecfp_folding.png)
*图：ECFP 的 identifier list 可以通过哈希函数折叠成固定长度二进制向量；折叠会带来 bit collision。来源：Chemaxon ECFP 文档。*

原论文为 Rogers 和 Hahn 的 *Extended-Connectivity Fingerprints*，ACS DOI 为 `https://pubs.acs.org/doi/10.1021/ci100050t`；若 ACS 页面不可直接访问，可用 PubMed 摘要 `https://pubmed.ncbi.nlm.nih.gov/20426451/` 或公开教学 PDF `https://files.batistalab.com/teaching/attachments/chem584/ci100050t.pdf` 核对方法描述。

```python
# ECFP / Morgan circular fingerprint 简化伪代码
def ecfp(mol, radius=2, n_bits=2048, use_counts=False):
    # 1. 初始原子 identifier：由局部原子不变量哈希得到
    ids = {}
    for atom in mol.atoms:
        invariants = (
            atom.atomic_number,
            atom.heavy_neighbor_count,
            atom.hydrogen_count,
            atom.formal_charge,
            atom.is_in_ring,
            atom.chirality_tag,      # 可选
        )
        ids[atom] = hash32(invariants)

    feature_multiset = []
    feature_multiset.extend(ids.values())  # diameter 0 / radius 0

    # 2. 每轮把邻居 identifier 和键类型合并，扩大一个 bond 的感知半径
    for r in range(1, radius + 1):
        new_ids = {}
        for atom in mol.atoms:
            neighborhood = [(ids[atom], "center")]
            for bond, nbr in sorted(atom.neighbor_bonds(),
                                    key=lambda x: (ids[x[1]], x[0].bond_order)):
                neighborhood.append((ids[nbr], bond.bond_order, bond.is_aromatic))
            new_ids[atom] = hash32(tuple(neighborhood))

        ids = new_ids
        feature_multiset.extend(ids.values())

    # 3. 去重或保留计数；再折叠到固定长度 bit vector
    if use_counts:
        sparse_features = Counter(feature_multiset)
    else:
        sparse_features = set(feature_multiset)

    bits = [0] * n_bits
    for feature_id in sparse_features:
        bits[feature_id % n_bits] = 1
    return bits, sparse_features
```

**动机：把分子图变成适合筛选和学习的特征集合**

传统子结构 key 指纹依赖预定义片段表，例如“是否有某个芳香环模式”“是否有某个官能团”。这类方法计算快，但只能识别设计者预先列出的模式，面对新颖结构或细微取代差异时表达能力有限。ECFP 的核心思路是让分子自己产生特征：每个非氢原子都作为中心，不断向外收集邻域信息，形成不同半径的局部子结构 identifier。这样得到的特征不是人工词表，而是由分子图拓扑和原子属性自动生成。

**与 Morgan canonicalization 的关系**

ECFP 源自 Morgan 算法，但目的不同。Morgan canonicalization 的目标是通过迭代更新原子标识符，最终给分子产生稳定唯一编号；中间结果通常会被丢弃。ECFP 则恰好保留这些中间结果，因为半径 0、1、2、3 的 atom identifier 分别对应越来越大的局部化学环境。原论文把这种差异概括为：ECFP 在预设迭代次数后停止，并把初始与每轮 identifier 收集成 fingerprint set。

**初始 atom identifier：局部原子不变量**

第一步给每个非氢原子分配整数 identifier。这个 identifier 不是随机编号，而是原子局部属性的哈希，例如：

$$
h_i^{(0)}
= H\left(Z_i,\; d_i,\; H_i,\; q_i,\; r_i,\; \chi_i\right)
$$

其中 \(Z_i\) 是原子序数，\(d_i\) 是重原子邻居数或连接度，\(H_i\) 是连接氢数，\(q_i\) 是形式电荷，\(r_i\) 表示是否在环上，\(\chi_i\) 是可选手性标记。不同实现的默认不变量略有差异，但原则一致：把局部化学身份编码进一个可比较的整数。

**迭代更新：局部消息传递式的哈希**

第 \(k\) 轮中，原子 \(i\) 收集上一轮自己的 identifier、所有邻居的 identifier 以及连接键类型，并按确定性规则排序后哈希：

$$
h_i^{(k)}
= H\left(h_i^{(k-1)},\;\mathrm{sort}\left\{
\left(h_j^{(k-1)}, b_{ij}\right): j\in\mathcal{N}(i)
\right\}\right)
$$

这个公式很像固定权重、不可学习的消息传递 GNN：每轮把邻居信息聚合到中心原子，半径扩大一个 bond。不同之处在于 ECFP 使用离散哈希而非神经网络参数，目标是产生稳定、快速、可解释的结构特征。

**半径、直径与 ECFP4/ECFP6**

化学文献常用 ECFP4、ECFP6 这样的名字，其中数字表示最大直径而不是半径。ECFP4 对应半径 2，捕捉中心原子两跳内的子结构；ECFP6 对应半径 3，包含更大局部环境。半径越大，结构表达越细，但特征数更多、碰撞概率更高，也更容易过拟合小数据集。

**从 identifier set 到 bit vector**

自然的 ECFP 表示是可变长度整数集合：

$$
F(m)=\bigcup_{k=0}^{R}\left\{h_i^{(k)}: i\in V(m)\right\}
$$

为了输入传统机器学习模型或快速相似性搜索，常把它折叠到长度 \(L\) 的二进制向量：

$$
b_j = \mathbb{I}\left[\exists f\in F(m),\; j = f \bmod L\right]
$$

这种固定长度表示便于存储和批量计算，但 \(f\bmod L\) 会导致碰撞：两个不同子结构可能落到同一 bit。常见 \(L\) 为 1024 或 2048；若任务需要解释具体子结构，保留 sparse identifier list 或 count vector 通常更稳妥。

**相似度计算：Tanimoto/Jaccard**

虚拟筛选中，ECFP 最常用 Tanimoto 相似度比较两个分子：

$$
T(A,B)=\frac{|A\cap B|}{|A|+|B|-|A\cap B|}
$$

若使用 bit vector，则 \(|A\cap B|\) 对应两个 bitset 同时为 1 的位数。直觉上，两个分子共享越多局部圆形子结构，Tanimoto 越高。ECFP 的优势是这些共享特征能定位回原子中心邻域，因此比许多黑盒分子向量更容易解释 SAR。

**为什么 ECFP 适合活性建模**

ECFP 特征表示的是“精确的氢填充子结构”，不仅记录某个模式存在，也隐含某些位置没有额外取代。Rogers 和 Hahn 特别强调这一点：对于活性分析，缺少一个取代基有时和存在一个官能团同样重要。与用于子结构预筛的 path-based fingerprint 相比，ECFP 更偏向结构-活性关系建模，而不是保证 query substructure 的包含关系。

**局限性**

ECFP 不显式编码三维构象、构象柔性和蛋白环境，因此对构象决定的结合模式、立体位阻和诱导契合能力有限。哈希折叠会降低可解释性，bit collision 也会给小维度指纹带来噪声。现代 GNN 可以学习任务相关的连续表示，但 ECFP 仍然是药物发现中强基线，因为它便宜、稳定、无需训练，并且在中小规模数据上经常表现很好。

#### 🧪 练习题

```yaml
question: "ECFP 与标准 Morgan 原子编号算法最关键的区别是什么？"
options:
  - "ECFP 只使用三维坐标，不使用分子图拓扑"
  - "ECFP 保留每轮迭代产生的局部 atom identifier，并在固定半径后停止"
  - "ECFP 必须依赖人工预定义的子结构词表"
  - "ECFP 只能表示蛋白质，不能表示小分子"
answer: 1
explain: "Morgan canonicalization 追求最终唯一编号并丢弃中间值；ECFP 则把每一轮局部邻域 identifier 收集为分子指纹特征。"
```
