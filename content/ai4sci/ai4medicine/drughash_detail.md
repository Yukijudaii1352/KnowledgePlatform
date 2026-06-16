### DrugHash: Hashing Based Contrastive Learning for Virtual Screening

```yaml
id: drughash
name: DrugHash
full_name: 哈希加速筛选 (DrugHash)
year: '2025'
org: CUHK
paper_url: https://arxiv.org/abs/2501.12345
category: screening
parent: drugclip
motivation: 哈希加速对比学习筛选
```

#### 📝 一句话总结

DrugHash 在 DrugCLIP 的蛋白口袋-分子对比检索框架上加入跨模态二值哈希学习，把连续向量检索改造成汉明距离检索，解决十亿级分子库中连续嵌入存储大、排序慢的问题。

#### 🎯 核心要点

- 将虚拟筛选继续建模为跨模态检索：给定蛋白口袋查询，从候选分子库中按相似度排序返回可能结合的配体。
- 沿用 DrugCLIP/Uni-Mol 风格的蛋白口袋编码器和分子编码器，以 3D 原子类型与原子对距离作为输入。
- 在 CLIP 式双向 InfoNCE 对比损失之外，引入跨模态哈希正则，使蛋白和分子连续嵌入靠近各自的二值码。
- 训练阶段交替优化编码器参数与二值码：固定编码器时用 `sign` 得到二值码，固定二值码时反向传播更新编码器。
- 推理阶段把分子库预编码为二值向量，用汉明距离完成检索；论文报告相对连续向量检索可获得 32x 级别存储节省和 3.5x 级别加速。
- 来源说明：任务 YAML 中的 `2501.12345` 未对应到可访问 DrugHash 论文；本文依据可访问论文 `Hashing based Contrastive Learning for Virtual Screening`，arXiv:2407.19790 / AAAI 2025 页面整理。

#### 🔬 深入细节

##### 图示与来源

![DrugHash 架构图](https://arxiv.org/html/2407.19790v1/extracted/5760753/DrugHash.png)

*图：DrugHash 的双塔编码、对比学习和跨模态哈希目标。公开来源为 arXiv HTML: https://arxiv.org/html/2407.19790v1，论文页: https://arxiv.org/abs/2407.19790，AAAI 页面: https://ojs.aaai.org/index.php/AAAI/article/view/33873。*

##### 核心算法伪代码

```python
# DrugHash 训练与检索伪代码
# 输入: n 个蛋白口袋-分子复合物 {(p_k, m_k)}
# 编码器: E_p, E_m; 二值码长度 d; 温度 tau; 哈希权重 lambda_hash

for batch in dataloader:
    # 1. 双塔 3D 编码
    y_p = E_p(batch.pockets)      # shape: [B, d], real-valued
    y_m = E_m(batch.molecules)    # shape: [B, d], real-valued

    # 2. 固定当前编码器输出，生成二值目标码
    b_p = sign(y_p)               # elements in {-1, +1}
    b_m = sign(y_m)

    # 3. CLIP 式批内对比学习
    sim = cosine_similarity_matrix(y_p, y_m)
    loss_p = cross_entropy(sim / tau, labels=range(B))       # pocket -> molecule
    loss_m = cross_entropy(sim.T / tau, labels=range(B))     # molecule -> pocket
    loss_c = 0.5 * (loss_p + loss_m)

    # 4. 哈希正则：让连续嵌入靠近二值码
    loss_hash = mean_squared_error(y_p, b_p) + mean_squared_error(y_m, b_m)
    loss = loss_c + lambda_hash * loss_hash
    loss.backward()
    optimizer.step()

# 离线: 预编码候选分子库
mol_codes = {m_id: sign(E_m(mol)) for m_id, mol in molecular_library}

# 在线: 给定口袋，用汉明距离排序
query_code = sign(E_p(query_pocket))
scores = {m_id: -hamming_distance(query_code, code) for m_id, code in mol_codes.items()}
top_hits = sorted(scores, key=scores.get, reverse=True)[:k]
```

##### 方法机制

DrugHash 的出发点不是重新设计绑定能量函数，而是处理 DrugCLIP 之后仍然存在的工程瓶颈。DrugCLIP 已经把虚拟筛选从“每个蛋白-分子对跑一次模型/对接”改成“口袋向量和分子向量做检索”，但若每个分子保存 128 维浮点向量，十亿级数据库仍会带来 TB 级存储和大量浮点相似度排序。DrugHash 的关键判断是：筛选阶段更需要保序的近邻检索表示，而不一定需要完整浮点精度。

编码器部分保持与 DrugCLIP 接近：蛋白口袋和分子分别由预训练 Uni-Mol/SE(3) Transformer 编码。原子类型初始化 token 表示，原子对欧氏距离经高斯核形成 pair representation，并作为自注意力偏置参与更新：

$$
\mathbf{q}_{ij}^{l+1}
= \mathbf{q}_{ij}^{l}
+ \left\{
\frac{\mathbf{Q}_{i}^{l,h}(\mathbf{K}_{j}^{l,h})^\top}{\sqrt{d}}
\mid h \in [1,H]
\right\}
$$

$$
\mathrm{Attention}(\mathbf{Q}_i^{l,h}, \mathbf{K}_j^{l,h}, \mathbf{V}_j^{l,h})
=
\mathrm{softmax}\left(
\frac{\mathbf{Q}_{i}^{l,h}(\mathbf{K}_{j}^{l,h})^\top}{\sqrt{d}}
+ \mathbf{q}_{ij}^{l-1,h}
\right)\mathbf{V}_{j}^{l,h}
$$

对于一个 batch 中的配对复合物，蛋白和分子编码为：

$$
(\mathbf{y}_k^p,\mathbf{y}_k^m)=(E_p(p_k),E_m(m_k))
$$

对比学习仍使用双向 InfoNCE。相似度定义为余弦相似度：

$$
\mathrm{sim}(\mathbf{y}_i^p,\mathbf{y}_j^m)
=
\frac{\mathbf{y}_i^p(\mathbf{y}_j^m)^\top}
{\|\mathbf{y}_i^p\|\|\mathbf{y}_j^m\|}
$$

蛋白到分子方向和分子到蛋白方向分别要求 batch 对角线上的真实复合物配对得分最高：

$$
\mathcal{L}_k^p
=
-\frac{1}{n}\log
\frac{\exp(\mathrm{sim}(\mathbf{y}_k^p,\mathbf{y}_k^m)/\tau)}
{\sum_i \exp(\mathrm{sim}(\mathbf{y}_k^p,\mathbf{y}_i^m)/\tau)}
$$

$$
\mathcal{L}_k^m
=
-\frac{1}{n}\log
\frac{\exp(\mathrm{sim}(\mathbf{y}_k^p,\mathbf{y}_k^m)/\tau)}
{\sum_i \exp(\mathrm{sim}(\mathbf{y}_i^p,\mathbf{y}_k^m)/\tau)}
,\qquad
\mathcal{L}_c=\frac{1}{2}\sum_{k=1}^{n}(\mathcal{L}_k^p+\mathcal{L}_k^m)
$$

DrugHash 的新增部分是把连续输出推向二值码。对蛋白和分子分别定义二值码：

$$
\mathbf{b}_k^p,\mathbf{b}_k^m \in \{-1,1\}^d
$$

哈希损失是连续嵌入到二值码的均方距离：

$$
\mathcal{L}_{\mathrm{hash}}
=
\frac{1}{nd}
\sum_{k=1}^{n}
\left(
\|\mathbf{y}_k^p-\mathbf{b}_k^p\|_2^2
+
\|\mathbf{y}_k^m-\mathbf{b}_k^m\|_2^2
\right)
$$

总目标为：

$$
\mathcal{L}=\mathcal{L}_c+\lambda\mathcal{L}_{\mathrm{hash}}
$$

这个正则一方面解决 `sign` 二值化不可导的问题：训练时让实值向量自然贴近 \(-1/+1\) 的角点，推理时再取符号；另一方面也起到容量约束作用，降低连续向量过拟合训练复合物的风险。论文消融中，加入哈希项后验证损失和 BEDROC 曲线更稳定，这也是二值码不仅更省、更快，还可能提升泛化的原因。

推理时，DrugHash 将所有候选分子的编码离线转换为二值码：

$$
\mathbf{b}^{p}=\mathrm{sign}(E_p(p)),\qquad
B_{D_m}=\{\mathrm{sign}(E_m(m_1)),\mathrm{sign}(E_m(m_2)),\ldots\}
$$

随后把 \(-1/+1\) 码映射到 bit 表示，用汉明距离排序。相比浮点内积，二值码可以用位运算和 `popcount` 快速计算距离；相比 32-bit 浮点，1-bit 表示在同维度下理论存储压缩约 32 倍。对于 Enamine REAL 这类十亿级库，这种变化直接决定本地机器是否能承载候选库索引。

与传统对接方法相比，DrugHash 不搜索每个分子的结合构象，也不显式预测结合能；与 DrugCLIP 相比，它没有改变“对比表征 + 检索”的核心范式，而是把检索表示从连续向量改为端到端学习的二值码。它的边界也很清楚：二值化可能损失细粒度排序信息，论文使用 128/256/512 等码长实验说明码长越大通常准确率越高，但存储和检索成本也同步上升。

#### 🧪 练习题

```yaml
question: "DrugHash 中跨模态哈希损失的主要作用是什么？"
options:
  - "直接预测蛋白-分子的结合自由能"
  - "让连续蛋白/分子嵌入靠近二值码，从而支持汉明距离检索"
  - "生成新的分子 3D 构象用于数据增强"
  - "用监督分类器判断每个分子是否为活性分子"
answer: 1
explain: "DrugHash 保留双塔对比学习，但额外约束连续嵌入接近 {-1,+1} 二值码；推理时取 sign 后用汉明距离进行快速筛选。"
```
