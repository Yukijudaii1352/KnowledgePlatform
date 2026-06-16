### PQ — 乘积量化 (Product Quantization)

```yaml
id: pq
name: PQ
full_name: 乘积量化 (Product Quantization)
year: '2010'
org: INRIA
paper_url: https://ieeexplore.ieee.org/abstract/document/5432202/
category: vector_ann
parent: —
motivation: 子空间分解实现高压缩比
```

#### 📝 一句话总结

PQ 将高维向量拆成多个低维子空间，并分别用小码本量化每个子向量，从而用极短 code 近似表示原向量，解决大规模近邻搜索中原始向量存储和距离计算成本过高的问题。它用笛卡尔积构造指数级大码本，却只需训练和存储线性数量的子码本，是 IVFADC、Faiss IVFPQ 等向量检索系统的基础。

#### 🎯 核心要点

- 子空间分解：把 \(D\) 维向量切成 \(m\) 个互不重叠的 \(D/m\) 维子向量，每个子空间独立训练一个 k-means 子量化器
- 笛卡尔积码本：若每个子量化器有 \(k^\*\) 个 centroid，总组合码本大小为 \((k^\*)^m\)，但只需存储 \(m k^\*\) 个低维 centroid
- 短码表示：每个数据库向量只保存 \(m\) 个 centroid ID；常见 \(k^\*=256\) 时，每个子码只需 1 byte，\(m=8\) 即 8 byte/向量
- 距离查表：查询时预计算每个查询子向量到对应子码本 centroid 的距离表，再对数据库 code 查表求和
- ADC 优于 SDC：Asymmetric Distance Computation 保持查询向量不量化，只量化数据库向量，通常比查询和库向量都量化的 SDC 更准确
- IVFADC 扩展：先用粗量化器把库向量分桶，再对残差做 PQ 编码，查询时只扫描少量倒排列表，兼顾低内存和低延迟
- 标志性结果：论文在 SIFT/GIST 图像描述子和十亿级/二十亿级向量上验证了短码近似检索的可扩展性

#### 🔬 深入细节

![PQ 子空间训练示意](https://mccormickml.com/assets/ProductQuantizer/kmeans_clustering.png)
*图：Product Quantization 的子空间训练过程示意。高维向量被切成多个子向量，每个子空间独立运行 k-means 得到子码本，数据库向量最终保存各子空间最近 centroid 的编号。*

```python
# Product Quantization 训练、编码与 ADC 查询伪代码
def train_pq(train_vectors, m, k_star=256):
    # train_vectors: [n, D], D must be divisible by m
    D = train_vectors.shape[1]
    d_sub = D // m
    codebooks = []
    for j in range(m):
        sub_vectors = train_vectors[:, j*d_sub:(j+1)*d_sub]
        centroids = kmeans(sub_vectors, k=k_star)
        codebooks.append(centroids)
    return codebooks

def encode_pq(x, codebooks):
    codes = []
    for j, centroids in enumerate(codebooks):
        x_j = slice_subvector(x, j)
        codes.append(argmin_l2(x_j, centroids))  # one byte if k_star=256
    return codes

def adc_distance(query, code, codebooks):
    # query is not quantized: asymmetric distance computation
    dist = 0.0
    for j, centroid_id in enumerate(code):
        q_j = slice_subvector(query, j)
        c_j = codebooks[j][centroid_id]
        dist += squared_l2(q_j, c_j)
    return dist

def search(query, database_codes, codebooks, top_k):
    # 先构建 m x k_star 查找表，再扫描短码
    tables = build_distance_tables(query, codebooks)
    heap = TopK(top_k)
    for vector_id, code in database_codes:
        d = sum(tables[j][code[j]] for j in range(len(codebooks)))
        heap.push(d, vector_id)
    return heap.items()
```

PQ 的出发点是高维近邻搜索的两个成本同时爆炸：存储 \(N\) 个 \(D\) 维 float32 向量需要 \(4ND\) 字节，暴力搜索每个查询还要计算 \(N\) 次 \(D\) 维距离。传统矢量量化可以把向量替换成最近 centroid 的编号，但要在高维空间获得低失真，需要极大的码本；例如想用 64 bit code 表示 \(2^{64}\) 个可能 centroid，直接训练和存储这个码本完全不可行。PQ 的关键是把一个不可训练的巨大码本写成多个小码本的笛卡尔积。

形式化地，把向量 \(x\in\mathbb{R}^D\) 分成 \(m\) 个子向量：

$$
x = [x^{(1)},x^{(2)},\ldots,x^{(m)}],\qquad x^{(j)}\in\mathbb{R}^{D/m}
$$

每个子空间有一个量化器 \(q_j\)，对应码本 \(C_j=\{c_{j,1},\ldots,c_{j,k^\*}\}\)。整体 product quantizer 是：

$$
q(x)=\left[q_1(x^{(1)}),q_2(x^{(2)}),\ldots,q_m(x^{(m)})\right]
$$

其隐含总码本为：

$$
C = C_1\times C_2\times\cdots\times C_m,\qquad |C|=(k^\*)^m
$$

这就是 PQ 的压缩杠杆：若 \(m=8,k^\*=256\)，总组合数是 \(256^8=2^{64}\)，但训练时只需要 8 次 256 类低维 k-means，存储时只保存 \(8\times256\) 个低维 centroid。一个 128 维 float32 SIFT 向量原本占 512 byte；PQ 用 \(m=8\) 且每个子码 8 bit 时，只需 8 byte，不含 ID 时压缩 64 倍。

由于子空间正交切分，重构误差可以分解为各子空间误差之和：

$$
\lVert x-q(x)\rVert^2
=\sum_{j=1}^{m}\lVert x^{(j)}-q_j(x^{(j)})\rVert^2
$$

因此每个子码本可以独立训练。这个独立性让 PQ 很高效，但也带来一个假设：原始坐标切分后，各子空间的方差和相关性要相对均衡。如果某几个维度携带大部分方差，平均切分会让部分子码本承担过多信息，量化误差上升；这也是后续 OPQ 通过旋转/学习投影来优化 PQ 前空间分解的原因。

搜索时，PQ 的核心不是先解压所有向量，而是查表求近似距离。对查询 \(x\) 和数据库向量 \(y\) 的 PQ code \((i_1,\ldots,i_m)\)，ADC 距离为：

$$
d_{\mathrm{ADC}}(x,y)^2
= \lVert x-q(y)\rVert^2
= \sum_{j=1}^{m}\lVert x^{(j)}-c_{j,i_j}\rVert^2
$$

实现中先为查询构建 \(m\) 张长度 \(k^\*\) 的表：

$$
T_j[\ell]=\lVert x^{(j)}-c_{j,\ell}\rVert^2
$$

然后每个数据库向量只需读取 \(m\) 个 byte code，并累加 \(T_j[i_j]\)。这把每向量的距离计算从 \(D\) 次浮点差平方，变成 \(m\) 次查表加法，实际瓶颈也从大规模浮点向量读取转为紧凑 code 的顺序扫描。

> 💡 关键：PQ 不是降低向量维度，而是把连续向量替换成离散码字组合。压缩后的 code 本身没有几何意义，距离必须通过码本查表解释。

论文区分了 SDC 和 ADC。SDC（Symmetric Distance Computation）把查询也量化，计算 \(\lVert q(x)-q(y)\rVert\)，可以进一步用 centroid-centroid 表加速，但查询量化会额外引入误差。ADC 保持查询为原始 float 向量，只量化数据库向量，因此估计的是 \(\lVert x-q(y)\rVert\)，通常召回更好。实际向量数据库和 Faiss 的 IVFPQ 默认思路也更接近 ADC：查询即时建表，库端长期保存 PQ code。

PQ 单独使用时仍然要扫描全部数据库 code，只是每个距离便宜很多。论文进一步把它和倒排文件结合为 IVFADC：先训练粗量化器 \(q_c\)，把数据库向量 \(y\) 分配到最近 coarse centroid；再对残差 \(r(y)=y-q_c(y)\) 做 PQ 编码。查询 \(x\) 时只访问最近的 \(w\) 个 coarse cell，对每个 cell 使用查询残差 \(x-c\) 与库中残差 PQ code 做 ADC 查表。近似式为：

$$
y \approx q_c(y)+q_p(y-q_c(y)),\qquad
\lVert x-y\rVert^2 \approx
\lVert x-q_c(y)-q_p(y-q_c(y))\rVert^2
$$

这种“粗分桶 + 残差 PQ”的组合解决了 PQ 的两层问题：倒排文件减少候选数，残差编码降低量化范围和失真，ADC 查表降低每个候选的排序成本。代价是引入更多参数，例如 coarse centroid 数、查询探测的 cell 数 \(w\)、子空间数 \(m\)、每个子码本大小 \(k^\*\)，它们共同决定召回率、延迟和内存占用。

从算法谱系看，PQ 处在“压缩驱动 ANN”的核心位置。它不像 HNSW 主要依赖图导航减少访问点数量，也不像 LSH 依赖随机哈希碰撞；PQ 的第一目标是让数据库常驻内存并让距离估计足够便宜。大规模系统常把 PQ 与 IVF、HNSW、重排序结合：先用索引结构召回候选，再用 PQ 距离快速排序，最后可选读取原始向量做精排。这个分层设计正是现代十亿级向量检索的常见工程形态。

#### 🧪 练习题

```yaml
question: "PQ 相比直接训练一个巨大高维码本的核心优势是什么？"
options:
  - "通过多个低维子码本的笛卡尔积获得指数级组合容量，但训练和存储成本只随子码本数量线性增长"
  - "完全避免任何量化误差"
  - "不需要计算查询向量和码本 centroid 的距离"
  - "只能用于二维向量，因此实现更简单"
answer: 0
explain: "PQ 将高维空间拆成多个子空间，每个子空间只训练小码本；整体码本是子码本的笛卡尔积，因此能用很少 centroid 表达大量组合码字。"
```
