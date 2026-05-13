### K-means Clustering

```yaml
id: kmeans
name: K-means
full_name: K-means Clustering
year: '1967'
org: Bell Labs
paper_url: '-'
category: foundation
parent: —
motivation: 迭代优化最小化簇内方差
```

#### 📝 一句话总结

K-means 提出了一种基于迭代优化的聚类方法，通过交替执行"分配样本到最近质心"和"更新质心为簇均值"两步，最小化簇内平方误差和（Within-Cluster Sum of Squares），成为无监督学习中最经典、应用最广泛的聚类算法。

#### 🎯 核心要点

- **迭代两步法**：交替执行 Assignment（分配）和 Update（更新）两步直至收敛
- **目标函数**：最小化簇内平方误差和（WCSS / Inertia），即所有样本到其所属质心的欧氏距离平方之和
- **Lloyd 算法**：1957 年由 Stuart Lloyd 在 Bell Labs 提出的标准迭代求解过程（1982 年正式发表）
- **MacQueen 命名**：1967 年 James MacQueen 正式提出 "K-means" 术语，并给出在线更新变体
- **收敛保证**：每次迭代目标函数单调不增，有限步内必收敛至局部最优
- **初始化敏感**：结果强依赖初始质心选择，催生了 K-means++、多次随机重启等改进策略
- **时间复杂度**：单次迭代 \(O(nKd)\)，其中 \(n\) 为样本数、\(K\) 为簇数、\(d\) 为特征维度
- **适用假设**：隐含假设簇为凸形、各向同性（球状），且各簇大小相近

#### 🔬 深入细节

![K-means 迭代过程示意图](https://upload.wikimedia.org/wikipedia/commons/e/ea/K-means_convergence.gif)
*图：K-means 算法在二维数据上的迭代收敛过程。不同颜色表示不同簇的分配结果，"×"标记为质心位置，随迭代逐步稳定。*

##### 算法伪代码

```python
# K-means (Lloyd's Algorithm) 伪代码
def kmeans(X, K, max_iter=100):
    # Step 0: 随机初始化 K 个质心
    centroids = random_select(X, K)
    
    for t in range(max_iter):
        # Step 1: Assignment — 将每个样本分配到最近的质心
        clusters = {}
        for x_i in X:
            k_star = argmin_k ||x_i - centroids[k]||^2
            clusters[k_star].append(x_i)
        
        # Step 2: Update — 重新计算每个簇的质心
        new_centroids = []
        for k in range(K):
            new_centroids[k] = mean(clusters[k])
        
        # Step 3: 收敛判断
        if centroids == new_centroids:
            break
        centroids = new_centroids
    
    return centroids, clusters
```

##### 动机与背景

在无监督学习场景中，核心任务之一是将 \(n\) 个数据点划分为 \(K\) 个互不相交的组（簇），使得组内样本尽可能相似、组间样本尽可能不同。这一问题在信号处理（矢量量化）、数据压缩、模式识别等领域有广泛需求。

最优划分问题本身是 NP-hard 的——穷举所有可能的划分方案数量随 \(n\) 和 \(K\) 指数增长（Stirling 数第二类）。因此，需要一种高效的近似算法。1957 年，Bell Labs 的 Stuart Lloyd 在脉冲编码调制（PCM）的量化问题中提出了迭代交替优化的思路：固定量化边界更新量化点，固定量化点更新边界。这一思想被推广为通用的聚类算法，即 K-means 的标准求解过程（Lloyd's Algorithm）。1967 年，MacQueen 在伯克利研讨会上正式引入 "K-means" 这一术语，并提出了一种在线（逐样本）更新质心的变体。

> 💡 关键：K-means 的本质是用**坐标下降 / 交替优化**的策略，将一个 NP-hard 的组合优化问题转化为两个交替求解的凸子问题，从而在多项式时间内获得局部最优解。

##### 核心机制：目标函数与两步迭代

**目标函数（WCSS）**

K-means 的优化目标是最小化簇内平方误差和（Within-Cluster Sum of Squares）：

$$J = \sum_{k=1}^{K} \sum_{x_i \in C_k} \|x_i - \mu_k\|^2$$

其中 \(C_k\) 表示第 \(k\) 个簇的样本集合，\(\mu_k = \frac{1}{|C_k|}\sum_{x_i \in C_k} x_i\) 是第 \(k\) 个簇的质心（均值向量）。

这个目标函数同时关于**分配方案** \(\{C_k\}\) 和**质心位置** \(\{\mu_k\}\) 进行优化，是一个混合离散-连续优化问题。K-means 通过将其拆分为两个子问题交替求解：

**Step 1 — Assignment（E-step 类比）**

固定质心 \(\{\mu_k\}\)，对每个样本 \(x_i\) 求解最优分配：

$$c_i = \arg\min_{k \in \{1, \ldots, K\}} \|x_i - \mu_k\|^2$$

即将每个样本分配到距离最近的质心所在簇。这一步的几何解释是：以各质心为中心构建 **Voronoi 划分**，每个样本归属于其所在 Voronoi 区域对应的簇。

**Step 2 — Update（M-step 类比）**

固定分配方案 \(\{C_k\}\)，对每个簇求解最优质心：

$$\mu_k = \frac{1}{|C_k|} \sum_{x_i \in C_k} x_i$$

对 \(\mu_k\) 求导令其为零即可得到：簇内样本的算术均值是使簇内平方误差最小的唯一最优解。这也是 "K-**means**" 名称的由来。

> 💡 关键：每一步都在另一个变量固定时求解当前变量的全局最优，因此目标函数 \(J\) 在每次迭代中**单调不增**。又因为有限样本的划分方案数有限，算法必在有限步内收敛。

##### 收敛性与局部最优

K-means 的收敛性可以严格证明：

1. **单调性**：Assignment 步不增加 \(J\)（每个样本选最近质心），Update 步不增加 \(J\)（均值最小化平方误差）
2. **有限性**：\(n\) 个样本分成 \(K\) 组的方案数有限（至多 \(K^n\) 种）
3. **结论**：算法必在有限步内终止于一个不动点

然而，K-means **不保证收敛到全局最优**。目标函数 \(J\) 是非凸的，存在大量局部极小值。最终结果高度依赖初始质心的选择。

**实践中的应对策略：**

- **多次随机重启**：运行多次取 \(J\) 最小的结果（scikit-learn 默认 `n_init=10`）
- **K-means++ 初始化**（Arthur & Vassilvitskii, 2007）：按照与已选质心距离的平方成正比的概率依次选取初始质心，保证 \(O(\log K)\) 的近似比
- **Mini-batch K-means**：每次迭代仅使用一个小批量样本更新质心，适用于大规模数据

##### 与 EM 算法的关系

K-means 可以视为**高斯混合模型（GMM）在特殊假设下的极限情形**：

| 特性 | K-means | GMM (EM) |
|------|---------|----------|
| 分配方式 | 硬分配（0/1） | 软分配（概率） |
| 簇形状 | 球状（各向同性） | 任意椭球 |
| 协方差假设 | \(\sigma^2 I\)，\(\sigma \to 0\) | 每簇独立协方差矩阵 |
| 目标函数 | WCSS | 对数似然 |
| 更新规则 | 算术均值 | 加权均值 |

当 GMM 中所有分量共享相同的球形协方差 \(\Sigma_k = \sigma^2 I\)，且令 \(\sigma \to 0\) 时，EM 算法的软分配退化为硬分配，恢复为 K-means。因此，K-means 本质上隐含了**各簇为等方差球形高斯分布**的假设。

> ⚠️ 注意：当数据中的簇呈现非球形（如条带状、环形）、大小差异显著或密度不均匀时，K-means 的表现会显著下降。此时应考虑 DBSCAN、谱聚类、GMM 等替代方法。

##### 超参数 K 的选择

K-means 需要预先指定簇数 \(K\)，常用的选择方法包括：

- **肘部法则（Elbow Method）**：绘制 \(J\) 随 \(K\) 的变化曲线，选取"肘部"拐点处的 \(K\)
- **轮廓系数（Silhouette Score）**：衡量样本与自身簇的紧密度 vs. 与最近邻簇的分离度，取使平均轮廓系数最大的 \(K\)
- **Gap Statistic**：比较实际数据的 \(J\) 与均匀分布参考数据的 \(J\) 之差
- **信息准则**：BIC / AIC（在 GMM 框架下）

##### 计算复杂度与可扩展性

| 操作 | 复杂度 |
|------|--------|
| 单次迭代 | \(O(nKd)\) |
| 总体（\(T\) 次迭代） | \(O(TnKd)\) |
| K-means++ 初始化 | \(O(nKd)\) |
| Mini-batch 单次迭代 | \(O(bKd)\)，\(b\) 为批量大小 |

K-means 的线性时间复杂度使其能够轻松处理百万级样本。结合 KD-tree 或 Ball-tree 加速最近质心搜索，可进一步提升效率。在分布式环境下，Assignment 步天然可并行，使 K-means 成为 MapReduce 等框架中最早被实现的机器学习算法之一。

##### 经典变体与扩展

- **K-medoids (PAM)**：使用实际样本点而非均值作为簇中心，对离群点更鲁棒
- **K-means++**：改进初始化策略，理论保证近似比 \(O(\log K)\)
- **Mini-batch K-means**：随机采样小批量更新，适用于大规模在线场景
- **Bisecting K-means**：层次化二分策略，自顶向下递归二分最大簇
- **Kernel K-means**：通过核函数映射到高维空间，处理非线性可分的簇结构
- **Fuzzy C-means**：引入模糊隶属度，允许样本以不同概率属于多个簇

#### 🧪 练习题

```yaml
question: "K-means 算法在每次迭代中目标函数 J 的变化特性是什么？"
options:
  - "J 严格单调递减，直到收敛到全局最优"
  - "J 单调不增，最终收敛到局部最优（不动点）"
  - "J 可能先增后减，最终收敛到全局最优"
  - "J 的变化不确定，取决于数据分布"
answer: 1
explain: "Assignment 和 Update 两步各自不增加 J，因此 J 单调不增；但由于目标函数非凸，算法只保证收敛到局部最优而非全局最优。"
```