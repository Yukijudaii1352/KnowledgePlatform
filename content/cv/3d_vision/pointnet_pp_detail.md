### PointNet++

```yaml
id: pointnet_pp
name: PointNet++
full_name: 层级点云网络 (PointNet++)
year: '2017'
org: Stanford
paper_url: https://arxiv.org/abs/1706.02413
category: point_cloud
parent: pointnet
motivation: 引入层级结构捕获局部几何特征，提升细粒度理解能力
```

#### 📝 一句话总结

PointNet++ 在 PointNet 基础上引入层级化的集合抽象（Set Abstraction）结构，通过在嵌套的局部区域上递归地应用 PointNet 来捕获多尺度局部几何特征，并提出密度自适应层（MSG/MRG）解决非均匀采样问题，显著提升了点云细粒度理解能力。

#### 🎯 核心要点

- 层级化集合抽象（Set Abstraction）：由 Sampling 层（FPS）、Grouping 层（Ball Query）和 PointNet 层三部分组成，逐级下采样并提取局部特征
- 最远点采样（Farthest Point Sampling, FPS）：相比随机采样，能更均匀地覆盖整个点集，生成数据依赖的感受野
- Ball Query 分组：以固定半径球查询邻域点，保证固定的区域尺度，比 kNN 更具空间泛化性
- 局部坐标归一化：将邻域点坐标转换为相对质心的局部坐标系，捕获点间相对关系
- 多尺度分组（MSG）：对同一质心使用多个不同半径的球查询，拼接多尺度特征，配合随机输入丢弃（Random Input Dropout）训练
- 多分辨率分组（MRG）：拼接低层抽象特征与原始点直接编码特征，计算效率更高
- 特征传播（Feature Propagation）：通过反距离加权插值 + 跳跃连接 + Unit PointNet 实现上采样，用于逐点分割任务
- 在 ModelNet40（分类）和 ScanNet（语义分割）等基准上显著超越当时 SOTA

#### 🔬 深入细节

![PointNet++ 层级特征学习架构](https://ar5iv.labs.arxiv.org/html/1706.02413/assets/x2.png)
*图：PointNet++ 层级特征学习架构示意图。左侧为 Set Abstraction 编码器（逐级下采样），右侧为 Feature Propagation 解码器（逐级上采样用于分割），顶部为分类头。*

![多尺度分组与多分辨率分组](https://ar5iv.labs.arxiv.org/html/1706.02413/assets/x3.png)
*图：(a) 多尺度分组 MSG——对同一质心使用不同半径的球查询并拼接特征；(b) 多分辨率分组 MRG——拼接低层抽象特征与原始点直接编码特征。*

```python
# PointNet++ Set Abstraction 伪代码
def set_abstraction(points, features, n_centroids, radius, K, mlp):
    """
    points: (N, 3) 输入点坐标
    features: (N, C) 输入点特征
    n_centroids: 采样质心数 N'
    radius: Ball Query 半径
    K: 每个球内最大点数
    mlp: 局部 PointNet 的 MLP 层
    """
    # 1. Sampling: 最远点采样选取 N' 个质心
    centroids = farthest_point_sampling(points, n_centroids)  # (N', 3)

    # 2. Grouping: Ball Query 查找每个质心半径内的邻域点
    groups = ball_query(points, centroids, radius, K)  # (N', K, 3+C)

    # 3. 局部坐标归一化
    groups[:, :, :3] -= centroids.unsqueeze(1)  # 转为相对坐标

    # 4. PointNet: 对每个局部区域独立应用 MLP + MaxPool
    local_features = mlp(groups)          # (N', K, C')
    new_features = max_pool(local_features, dim=1)  # (N', C')

    return centroids, new_features
```

**动机与背景**

PointNet 开创性地直接处理无序点集，通过逐点 MLP + 全局 Max Pooling 实现置换不变性。然而，其设计本质上将每个点独立编码后直接聚合为全局特征，**完全忽略了度量空间中的局部结构信息**。这导致：
1. 无法捕获细粒度的局部几何模式（如边缘、角点、曲面变化）
2. 对复杂场景的泛化能力受限——CNN 的成功恰恰源于其层级化的局部感受野设计

PointNet++ 的核心思想是：**像 CNN 逐层扩大感受野一样，在点云上构建层级结构，从小尺度局部特征逐步抽象到大尺度全局特征**。

**核心机制：Set Abstraction 层**

每个 Set Abstraction（SA）层包含三个子层：

1. **Sampling 层**：使用迭代最远点采样（FPS）从 \(N\) 个输入点中选取 \(N'\) 个质心。FPS 保证质心在空间中均匀分布，生成数据依赖的感受野中心，优于随机采样和固定网格扫描。

2. **Grouping 层**：对每个质心执行 Ball Query，找到半径 \(r\) 内的所有邻域点（上限 \(K\) 个）。输出形状为 \(N' \times K \times (d+C)\)。Ball Query 相比 kNN 的优势在于保证固定的空间尺度，使学到的局部特征在不同位置间更具泛化性。

3. **PointNet 层**：将邻域点坐标转换为相对质心的局部坐标：

$$x_i^{(j)} = x_i^{(j)} - \hat{x}^{(j)}$$

然后对每个局部区域独立应用共享 MLP + Max Pooling，输出 \(N' \times (d + C')\) 的抽象特征。

> 💡 关键：局部坐标归一化使网络学习的是**相对几何关系**而非绝对位置，这是捕获局部结构的关键设计。

**密度自适应：MSG 与 MRG**

真实点云（如激光雷达扫描）存在严重的密度不均匀问题——近处密集、远处稀疏。固定单一尺度的 Ball Query 面临两难：
- 小半径：在稀疏区域采样点不足，特征不可靠
- 大半径：在密集区域丢失细节

**多尺度分组（MSG）**：对同一组质心使用多个不同半径 \(\{r_1, r_2, r_3\}\) 的 Ball Query，分别通过独立的 PointNet 提取特征后拼接：

$$f_{\text{MSG}} = [f_{r_1}; f_{r_2}; f_{r_3}]$$

配合**随机输入丢弃（Random Input Dropout）**训练策略：每个训练样本以 \(\theta \sim \text{Uniform}[0, 0.95]\) 的概率随机丢弃点，迫使网络学习在不同密度下自适应地加权多尺度特征。

**多分辨率分组（MRG）**：为降低 MSG 在底层的计算开销，MRG 将每个区域的特征表示为两个向量的拼接：
- 向量 1：由低层 SA 层抽象得到的子区域特征（高分辨率，但在稀疏区域不可靠）
- 向量 2：直接对该区域所有原始点应用单个 PointNet（低分辨率，但在稀疏区域更鲁棒）

网络自动学习根据局部密度对两者加权。

> ⚠️ 注意：MSG 精度更高但计算量大（每个质心需多次 Ball Query + PointNet），MRG 是计算效率与精度的折中方案。

**特征传播（Feature Propagation）用于分割**

分类任务只需最终全局特征，但逐点分割需要恢复到原始分辨率。PointNet++ 采用层级化上采样策略：

1. **反距离加权插值**：将 \(N_l\) 个点的特征插值到 \(N_{l-1}\) 个点（\(N_l \leq N_{l-1}\)），使用 \(k=3\) 近邻的反距离加权：

$$f^{(j)}(x) = \frac{\sum_{i=1}^{k} w_i(x) \cdot f_i^{(j)}}{\sum_{i=1}^{k} w_i(x)}, \quad w_i(x) = \frac{1}{d(x, x_i)^2}$$

2. **跳跃连接（Skip Link）**：将插值特征与对应 SA 层的编码特征拼接
3. **Unit PointNet**：对拼接后的特征应用共享全连接层（类似 1×1 卷积）更新每个点的特征

该过程逐层重复直到恢复原始点数。

**与 PointNet 的核心区别**

| 特性 | PointNet | PointNet++ |
|------|----------|------------|
| 特征聚合 | 单次全局 Max Pooling | 层级化局部→全局 |
| 局部结构 | 不捕获 | 通过 Ball Query + 局部 PointNet 捕获 |
| 感受野 | 全局（所有点） | 逐层扩大（类似 CNN） |
| 密度适应 | 无 | MSG / MRG + Random Dropout |
| 分割方式 | 全局特征拼接逐点特征 | 层级上采样 + 跳跃连接 |

#### 🧪 练习题

```yaml
question: "PointNet++ 中 Set Abstraction 层的 Sampling 步骤使用什么算法选取质心？"
options:
  - "随机采样 (Random Sampling)"
  - "体素下采样 (Voxel Downsampling)"
  - "最远点采样 (Farthest Point Sampling)"
  - "均匀网格采样 (Uniform Grid Sampling)"
answer: 2
explain: "FPS 迭代选取距已选点集最远的点作为新质心，保证质心在空间中均匀覆盖整个点集，生成数据依赖的感受野，优于随机采样。"
```