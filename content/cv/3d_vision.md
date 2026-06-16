---
domain: cv
topic_id: 3d_vision
topic_name: 3D视觉
page_icon: 🧊
page_title: 3D视觉技术演进图谱
page_subtitle: '{build_date} 版'
page_desc: 系统梳理从点云处理、NeRF神经辐射场到3D Gaussian Splatting的技术变革与2026最新前沿，涵盖神经渲染、三维重建的完整演化路径。
hero_pills:
- 🏷️ NeRF · 3DGS · Reconstruction
- 🏷️ Point Cloud · Neural Rendering
count_pill: '{count} 个算法'
categories:
  point_cloud:
    label: 点云理解
    color: '#22a06b'
  nerf:
    label: 神经辐射场
    color: '#5b63d3'
  gaussian_splatting:
    label: 高斯泼溅
    color: '#e8820c'
  reconstruction:
    label: 三维重建
    color: '#d32f2f'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/cv/3d_vision/overview/zhihu__Feed-Forward_3D综述：三维视觉如何「一步到位」__8eba9fbc/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/cv/3d_vision/latest/zhihu__CVPR_2026_3D_视觉前沿梳理：模型正在学会理解、生成和构建世界__f84c74ee/article.md

## 算法演化关系

```yaml
nodes:
- id: pointnet
  x: 150
  y: 80
  category: point_cloud
- id: pointnet_pp
  x: 150
  y: 140
  category: point_cloud
- id: dgcnn
  x: 280
  y: 80
  category: point_cloud
- id: point_transformer
  x: 420
  y: 80
  category: point_cloud
- id: tcs_net
  x: 650
  y: 60
  category: point_cloud
- id: lora_pointnet
  x: 650
  y: 140
  category: point_cloud
- id: nerf
  x: 320
  y: 280
  category: nerf
- id: mip_nerf
  x: 420
  y: 220
  category: nerf
- id: d_nerf
  x: 420
  y: 340
  category: nerf
- id: plenoxels
  x: 480
  y: 380
  category: nerf
- id: instant_ngp
  x: 480
  y: 280
  category: nerf
- id: mip_nerf_360
  x: 480
  y: 220
  category: nerf
- id: tensorf
  x: 480
  y: 340
  category: nerf
- id: zip_nerf
  x: 560
  y: 220
  category: nerf
- id: nerfstudio
  x: 560
  y: 340
  category: nerf
- id: ecc_nerf
  x: 620
  y: 200
  category: nerf
- id: efficient_lvsm
  x: 650
  y: 280
  category: nerf
- id: 3dgs
  x: 560
  y: 480
  category: gaussian_splatting
- id: mip_splatting
  x: 630
  y: 440
  category: gaussian_splatting
- id: gaussianpro
  x: 630
  y: 480
  category: gaussian_splatting
- id: langsplat
  x: 630
  y: 520
  category: gaussian_splatting
- id: thermal3d_gs
  x: 700
  y: 460
  category: gaussian_splatting
- id: usgs
  x: 700
  y: 520
  category: gaussian_splatting
- id: colmap
  x: 100
  y: 620
  category: reconstruction
- id: mvsnet
  x: 220
  y: 620
  category: reconstruction
- id: deepsdf
  x: 280
  y: 680
  category: reconstruction
- id: occupancy_net
  x: 280
  y: 720
  category: reconstruction
- id: convonet
  x: 360
  y: 720
  category: reconstruction
- id: neus
  x: 420
  y: 660
  category: reconstruction
- id: volsdf
  x: 420
  y: 700
  category: reconstruction
- id: deocc_1to3
  x: 650
  y: 660
  category: reconstruction
- id: ilspr
  x: 650
  y: 620
  category: reconstruction
edges:
- from: pointnet
  to: pointnet_pp
  label: 层级化
- from: pointnet_pp
  to: dgcnn
  label: 动态图
- from: dgcnn
  to: point_transformer
  label: Transformer
- from: point_transformer
  to: tcs_net
  label: 行业应用
- from: pointnet_pp
  to: lora_pointnet
  label: LoRA微调
- from: nerf
  to: mip_nerf
  label: 抗锯齿
- from: nerf
  to: d_nerf
  label: 动态化
- from: nerf
  to: plenoxels
  label: 显式化
- from: nerf
  to: instant_ngp
  label: 加速
- from: nerf
  to: tensorf
  label: 张量分解
- from: nerf
  to: nerfstudio
  label: 框架化
- from: mip_nerf
  to: mip_nerf_360
  label: 无界场景
- from: mip_nerf_360
  to: zip_nerf
  label: 融合加速
- from: mip_nerf
  to: ecc_nerf
  label: 椭圆锥投射
- from: nerf
  to: efficient_lvsm
  label: 前馈合成
- from: 3dgs
  to: mip_splatting
  label: 抗锯齿
- from: 3dgs
  to: gaussianpro
  label: 渐进优化
- from: 3dgs
  to: langsplat
  label: 语义嵌入
- from: 3dgs
  to: thermal3d_gs
  label: 多模态
- from: 3dgs
  to: usgs
  label: 稀疏视角
- from: colmap
  to: mvsnet
  label: 深度学习
- from: deepsdf
  to: occupancy_net
  label: 占用场
- from: occupancy_net
  to: convonet
  label: 卷积编码
- from: deepsdf
  to: neus
  label: 体渲染
- from: neus
  to: volsdf
  label: 几何约束
- from: neus
  to: deocc_1to3
  label: 扩散模型
- from: colmap
  to: ilspr
  label: 学习配准
milestones:
- pointnet
- nerf
- 3dgs
```

## 核心算法

### PointNet

```yaml
id: pointnet
num: 1
name: PointNet
full_name: 点云深度学习 (PointNet)
year: '2017'
org: Stanford
parent: —
paper_url: https://arxiv.org/abs/1612.00593
project_url: ''
category: point_cloud
motivation: 首次用深度学习直接处理无序点集，最大池化实现置换不变性
```

#### 📝 一句话总结
PointNet 提出了一种直接消费无序点云的深度学习架构，通过逐点 MLP 特征提取 + 对称函数（max pooling）聚合实现置换不变性，并引入空间变换网络（T-Net）对齐输入与特征空间，在 3D 分类、部件分割和场景语义分割任务上取得了当时的最优性能。

#### 🎯 核心要点
- **直接处理点云**：无需将点云转换为体素网格或多视图图像，避免了量化损失和计算冗余
- **对称函数实现置换不变性**：通过 max pooling 作为对称聚合函数，使网络输出与点的输入顺序无关
- **逐点 MLP + 全局特征**：对每个点独立施加共享权重的 MLP，再通过 max pooling 提取全局特征向量
- **空间变换网络（T-Net）**：学习输入空间（3×3）和特征空间（64×64）的仿射变换矩阵，实现几何对齐
- **正则化约束**：对特征空间变换矩阵施加正交约束 \(L_{reg} = \|I - AA^T\|_F^2\)，稳定高维变换的优化
- **局部-全局特征拼接**：分割任务中将逐点局部特征与全局特征拼接，为每个点提供全局上下文信息
- **理论保证**：证明了 PointNet 可以逼近任意连续集合函数，且 max pooling 定义的"临界点集"刻画了网络关注的形状骨架
- **三大任务验证**：ModelNet40 分类（89.2% 准确率）、ShapeNet 部件分割（83.7% mIoU）、S3DIS 场景语义分割（47.6% mIoU）

#### 🔬 深入细节
##### 核心架构示意图

![PointNet Architecture](https://raw.githubusercontent.com/charlesq34/pointnet/master/doc/pointnet.jpg)
*图：PointNet 网络架构。上半部分为分类网络，下半部分为分割网络。输入点云经过 Input Transform（T-Net）对齐后，通过共享 MLP 提取逐点特征，再经 Feature Transform 对齐特征空间，最终通过 max pooling 聚合为全局特征向量。分割网络将全局特征与逐点局部特征拼接后预测每个点的类别。*

##### 算法伪代码

```python
# PointNet 前向传播伪代码
def pointnet_forward(points, task="classification"):
    """
    points: (B, N, 3)  — B个样本，每个N个点，每点3维坐标
    """
    # === 阶段1：输入空间对齐 ===
    T_input = TNet3x3(points)          # 学习 3×3 变换矩阵
    points = points @ T_input          # (B, N, 3) 对齐后的点云

    # === 阶段2：逐点特征提取（低维） ===
    feat = SharedMLP(points, [64, 64]) # (B, N, 64) 共享权重MLP

    # === 阶段3：特征空间对齐 ===
    T_feat = TNet64x64(feat)           # 学习 64×64 变换矩阵
    feat = feat @ T_feat               # (B, N, 64) 对齐后的特征
    point_feat = feat                  # 保存逐点特征（分割用）

    # === 阶段4：逐点特征提取（高维） ===
    feat = SharedMLP(feat, [64, 128, 1024])  # (B, N, 1024)

    # === 阶段5：对称聚合 ===
    global_feat = MaxPool(feat, dim=1) # (B, 1024) 全局特征

    if task == "classification":
        # === 分类头 ===
        out = MLP(global_feat, [512, 256, K])  # K个类别
        return out

    elif task == "segmentation":
        # === 分割头：局部+全局特征拼接 ===
        global_expanded = global_feat.expand(B, N, 1024)  # (B, N, 1024)
        combined = concat(point_feat, global_expanded)     # (B, N, 1088)
        out = SharedMLP(combined, [512, 256, 128, M])      # M个部件类别
        return out
```

##### 方法细节

**动机与背景**

3D 点云是激光雷达、深度相机等传感器的原始输出格式，每个点云是 \(\mathbb{R}^3\) 中的无序点集。在 PointNet 之前，主流方法需要将点云预处理为规则结构：(1) **体素化**方法（如 VoxNet、3D ShapeNets）将点云离散化为 3D 网格，但体素分辨率受限于 \(O(n^3)\) 的内存开销，且大量体素为空导致计算浪费；(2) **多视图方法**（如 MVCNN）将 3D 物体渲染为多角度 2D 图像再用 CNN 处理，但丢失了 3D 几何信息且依赖视角选择。PointNet 的核心动机是：**能否设计一个直接以点集为输入的深度网络，同时满足点集的数学性质？**

点云作为集合具有三个关键性质需要网络尊重：
1. **无序性（Permutation Invariance）**：\(N\) 个点的 \(N!\) 种排列应产生相同输出
2. **点间交互**：点不是孤立的，邻近点形成有意义的局部结构
3. **变换不变性**：整体刚性变换（旋转、平移）不应改变识别结果

> 💡 关键：PointNet 的核心洞察是——对称函数是处理无序集合的自然选择。如果 \(f(x_1, ..., x_n) = f(x_{\pi(1)}, ..., x_{\pi(n)})\) 对任意排列 \(\pi\) 成立，则 \(f\) 天然满足置换不变性。

**核心机制：对称函数与 Max Pooling**

PointNet 将网络设计为如下形式：

$$f(\{x_1, ..., x_n\}) \approx g(h(x_1), h(x_2), ..., h(x_n))$$

其中 \(h: \mathbb{R}^3 \to \mathbb{R}^K\) 是逐点特征映射（由共享权重的 MLP 实现），\(g: \mathbb{R}^K \times ... \times \mathbb{R}^K \to \mathbb{R}^K\) 是对称聚合函数。论文通过实验比较了多种对称函数候选：

| 对称函数 | ModelNet40 准确率 |
|---------|-----------------|
| Max Pooling | **89.2%** |
| Average Pooling | 85.7% |
| Attention-based Weighted Sum | 87.1% |

Max pooling 表现最优，因为它能有效捕获每个特征维度上的"最显著激活"，相当于在高维特征空间中选取最具判别力的点。

> ⚠️ 注意：这里的 max pooling 是对 \(N\) 个点取逐通道最大值，而非空间卷积中的下采样操作。它将 \((B, N, K)\) 的特征张量压缩为 \((B, K)\) 的全局描述子。

**空间变换网络（T-Net）**

为实现几何变换不变性，PointNet 引入了两个微型子网络（T-Net）来预测仿射变换矩阵：

1. **输入变换**：预测 \(3 \times 3\) 矩阵，对输入点云进行规范化对齐（类似于将物体旋转到标准姿态）
2. **特征变换**：预测 \(64 \times 64\) 矩阵，对中间特征进行对齐

T-Net 本身也是一个小型 PointNet：逐点 MLP → max pooling → 全连接层 → 输出变换矩阵。

由于 \(64 \times 64\) 的特征变换矩阵参数空间巨大，优化困难，论文添加了正交正则化损失：

$$L_{reg} = \|I - AA^T\|_F^2$$

其中 \(A\) 是预测的特征变换矩阵。这一约束鼓励变换接近正交变换（旋转），避免特征空间被过度扭曲。实验表明加入此正则化可将分类准确率提升约 2%。

**分割网络：局部与全局特征融合**

对于逐点预测任务（部件分割、语义分割），仅有全局特征不足以区分不同点的语义。PointNet 的解决方案是将全局特征向量复制 \(N\) 份，与每个点的局部特征（64维）拼接，形成 \(1088\) 维的逐点特征：

$$\text{per\_point\_feat}_i = [h_{local}(x_i); \; g_{global}(\{x_1,...,x_n\})]$$

这种设计使每个点同时感知自身的局部几何和整体形状上下文。拼接后的特征再经过共享 MLP 输出每个点的分类结果。

**理论分析：逼近能力与临界点集**

论文提供了两个重要的理论结果：

1. **万能逼近定理**：PointNet（在足够宽的 MLP 下）可以任意精度逼近 Hausdorff 距离下的任意连续集合函数。这意味着 max pooling + MLP 的组合在理论上不会损失表达能力。

2. **临界点集（Critical Point Set）**：对于给定输入 \(S\)，max pooling 的输出仅由一个子集 \(C_S \subseteq S\) 决定，其中 \(|C_S| \leq K\)（\(K\) 为特征维度，如 1024）。这意味着：
   - 网络学会了从点云中提取"骨架点"来表示形状
   - 添加或删除非临界点不会改变网络输出（鲁棒性来源）
   - 临界点集可视化显示网络关注物体的边缘和关键结构

> 💡 关键：临界点集理论解释了 PointNet 对噪声和离群点的鲁棒性——只要关键骨架点未被破坏，网络输出保持稳定。实验显示，随机丢弃 50% 的点仅导致准确率下降不到 4%。

**与传统方法的对比**

| 特性 | 体素方法 | 多视图方法 | PointNet |
|------|---------|-----------|----------|
| 输入格式 | 3D 网格 | 2D 图像集 | 原始点集 |
| 信息损失 | 量化损失 | 视角依赖 | 无 |
| 计算复杂度 | \(O(n^3)\) | 多次 CNN 前向 | \(O(nK)\) |
| 置换不变性 | 天然（网格固定） | 不适用 | 对称函数保证 |
| 可扩展性 | 受限于分辨率 | 受限于视角数 | 线性于点数 |

PointNet 的推理速度极快（1M 点/秒），且模型参数量远小于体素方法，使其适合实时应用场景。

#### 🧪 练习题
```yaml
question: "PointNet 使用 max pooling 作为对称函数的主要原因是什么？"
options:
  - "max pooling 计算速度最快，能显著减少推理时间"
  - "max pooling 能捕获每个特征维度上最显著的激活，且天然满足置换不变性"
  - "max pooling 能保留所有点的完整信息，不丢失任何细节"
  - "max pooling 是唯一满足置换不变性的聚合操作"
answer: 1
explain: "max pooling 对输入顺序不敏感（对称函数），同时实验表明它比 average pooling 和 attention sum 更能捕获判别性特征。它并非唯一的对称函数，但在实践中效果最好。"
```

### PointNet++

```yaml
id: pointnet_pp
num: 2
name: PointNet++
full_name: 层级点云网络 (PointNet++)
year: '2017'
org: Stanford
parent: pointnet
paper_url: https://arxiv.org/abs/1706.02413
project_url: ''
category: point_cloud
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

### DGCNN

```yaml
id: dgcnn
num: 3
name: DGCNN
full_name: 动态图卷积网络 (Dynamic Graph CNN)
year: '2019'
org: MIT
parent: pointnet_pp
paper_url: https://arxiv.org/abs/1801.07829
project_url: ''
category: point_cloud
motivation: 动态构建k近邻图，EdgeConv捕获局部几何关系
```

#### 📝 一句话总结
DGCNN 提出了 EdgeConv 算子，在点云特征空间中动态构建 k-NN 图并通过边特征聚合捕获局部几何结构，解决了 PointNet 等方法忽略点间局部关系的问题，在分类、部件分割和语义分割任务上均取得了优异性能。

#### 🎯 核心要点
- **EdgeConv 算子**：对每个点 \(x_i\) 及其 k 近邻 \(x_j\)，构造边特征 \(h_\Theta(x_i, x_j - x_i)\)，再通过 channel-wise max pooling 聚合，同时编码全局位置（\(x_i\)）和局部几何（\(x_j - x_i\)）
- **动态图更新**：每层在特征空间（而非输入空间）重新计算 k-NN 图，使感受野随层数增长可覆盖整个点云，同时保持稀疏连接
- **网络架构**：分类网络使用 4 层 EdgeConv + 全局 max pooling + MLP 分类器；分割网络通过 shortcut 拼接各层 EdgeConv 输出和全局特征，实现逐点预测
- **置换不变性**：EdgeConv 中的 max 聚合函数是对称函数，保证了对点云输入顺序的不变性
- **空间变换网络**：使用 3×3 变换矩阵将输入点云对齐到规范空间
- **高效性**：模型仅 21MB、前向推理 27.2ms，比 PointNet++ 快约 7 倍且精度更高

#### 🔬 深入细节
##### 核心架构示意图

![DGCNN 架构图](https://ar5iv.labs.arxiv.org/html/1801.07829v2/assets/x3.png)
*图：DGCNN 网络架构。上分支为分类网络（4 层 EdgeConv → 全局 max pool → MLP），下分支为分割网络（3 层 EdgeConv + shortcut 拼接 → 逐点 MLP）。*

![EdgeConv 计算过程](https://ar5iv.labs.arxiv.org/html/1801.07829v2/assets/x2.png)
*图：EdgeConv 的计算过程。左侧为点云中的局部 k-NN 图构建，右侧为边特征计算与聚合。*

##### 算法伪代码

```python
# DGCNN EdgeConv 核心逻辑
def edge_conv(x, k):
    """
    x: (B, N, F) 点特征
    k: 近邻数
    """
    # Step 1: 在特征空间构建动态 k-NN 图
    dist = pairwise_distance(x)                    # (B, N, N)
    idx = dist.topk(k, largest=False)              # (B, N, k)
    
    # Step 2: 构造边特征
    x_i = x.unsqueeze(2).repeat(1, 1, k, 1)       # (B, N, k, F) 中心点
    x_j = gather(x, idx)                           # (B, N, k, F) 近邻点
    edge_feat = concat(x_i, x_j - x_i, dim=-1)    # (B, N, k, 2F)
    
    # Step 3: 共享 MLP + 聚合
    out = mlp(edge_feat)                           # (B, N, k, F')
    out = out.max(dim=2)                           # (B, N, F') channel-wise max
    return out

# 分类网络完整流程
def dgcnn_cls(point_cloud):
    x = spatial_transform(point_cloud)  # 3×3 变换对齐
    x1 = edge_conv(x, k=20)            # EdgeConv1: 3 → 64
    x2 = edge_conv(x1, k=20)           # EdgeConv2: 64 → 64
    x3 = edge_conv(x2, k=20)           # EdgeConv3: 64 → 128
    x4 = edge_conv(x3, k=20)           # EdgeConv4: 128 → 256
    x = concat(x1, x2, x3, x4)        # 拼接: 512
    x = mlp_1024(x)                    # 共享 FC: 512 → 1024
    x = global_max_pool(x)             # 全局聚合: (B, 1024)
    x = classifier_mlp(x)             # MLP: 1024 → 512 → 256 → num_classes
    return x
```

##### 动机与背景

**问题**：PointNet 开创性地实现了直接在点云上学习的深度网络，但其核心操作——逐点 MLP + 全局 max pooling——本质上将每个点独立处理，**完全忽略了点与点之间的局部几何关系**。虽然 PointNet++ 通过分层采样和分组引入了局部结构，但其图结构在输入空间中固定构建，无法随特征演化而自适应调整。

**传统方法的缺陷**：
1. 体素化方法（VoxNet、3DShapeNets）将点云离散化为规则网格，引入量化误差且计算量随分辨率立方增长
2. 基于图的方法（ECC、MoNet）使用固定的输入空间图，无法捕获语义层面的邻域关系
3. PointNet 的全局聚合丢失了精细的局部几何信息

##### 核心机制：EdgeConv

EdgeConv 的设计灵感来源于图神经网络中的消息传递机制，但做了两个关键创新：

**1. 边特征的"中心化"设计**

对于中心点 \(x_i\) 和邻居点 \(x_j\)，边特征定义为：

$$e_{ij} = h_\Theta(x_i, x_j - x_i)$$

其中 \(x_j - x_i\) 编码了**局部几何结构**（类似于法向量、曲率等微分几何量），而 \(x_i\) 保留了**全局位置信息**。具体实现为：

$$e_{ij} = \text{ReLU}(\theta \cdot (x_j - x_i) + \phi \cdot x_i)$$

其中 \(\theta, \phi\) 为可学习参数矩阵。这种设计使得 EdgeConv 既能感知局部形状（通过 \(x_j - x_i\)），又不丢失全局坐标（通过 \(x_i\)）。

> 💡 **关键直觉**：\(x_j - x_i\) 可以理解为从中心点到邻居的"方向向量"，它编码了局部 patch 的几何形态。这类似于图像中的卷积核捕获局部纹理模式。

**2. 聚合函数**

对每个点 \(x_i\)，其更新后的特征为所有邻居边特征的 channel-wise max pooling：

$$x_i' = \max_{j \in \mathcal{N}(i)} e_{ij}$$

选择 max 而非 sum/mean 的原因是：max 是对称函数，保证了置换不变性；同时 max 更擅长捕获最显著的局部特征。

##### 动态图：从空间邻域到语义邻域

DGCNN 最核心的创新在于**每层重新计算 k-NN 图**：

$$\mathcal{G}^{(l)} = \text{kNN}(F^{(l)})$$

其中 \(F^{(l)}\) 是第 \(l\) 层的特征表示。这意味着：

- **第 1 层**：图基于 3D 坐标构建，邻居是空间上的近邻
- **深层**：图基于学到的高维特征构建，邻居是**语义上的近邻**

> 💡 **关键洞察**：论文 Figure 1 展示了一个飞机点云的例子——在深层特征空间中，机翼尖端的点与另一侧机翼尖端的点成为"邻居"，尽管它们在 3D 空间中相距很远。这说明动态图成功捕获了语义级别的相似性。

**感受野分析**：虽然每层只连接 k 个近邻（稀疏），但由于图在每层重建，信息可以通过不同层的不同邻域传播。论文证明经过 \(n\) 层后，理论感受野可以覆盖整个点云（直径级别），同时保持计算的稀疏性。

##### 网络架构细节

**分类网络**：
1. 输入空间变换（T-Net 估计 3×3 矩阵）
2. 4 层 EdgeConv，通道数分别为 64, 64, 128, 256
3. 拼接 4 层输出 → 共享 FC(1024) → 全局 max pooling
4. 分类 MLP：1024 → 512 → 256 → num_classes（含 BN、Dropout=0.5）

**分割网络**：
1. 3 层 EdgeConv + 共享 FC(1024)
2. 全局 max pooling 得到全局描述符
3. 将全局描述符复制 N 份，与各层 EdgeConv 的逐点输出拼接
4. 逐点 MLP：256 → 256 → 128 → num_parts

**训练配置**：SGD + Cosine Annealing，初始学习率 0.1，momentum 0.9，batch size 32，k=20。

##### 实验结果

| 任务 | 数据集 | 指标 | DGCNN | PointNet | PointNet++ | 备注 |
|------|--------|------|-------|----------|------------|------|
| 分类 | ModelNet40 | Overall Acc. | **92.9%** | 89.2% | 90.7% | 1024 点 |
| 分类 | ModelNet40 | Overall Acc. | **93.5%** | - | - | 2048 点 |
| 部件分割 | ShapeNet Part | mIoU | **85.2%** | 83.7% | 85.1% | 16 类 50 部件 |
| 语义分割 | S3DIS | mIoU | **56.1%** | 47.6% | - | 6-fold CV |
| 语义分割 | S3DIS | Overall Acc. | **84.1%** | 78.5% | - | 6-fold CV |

**消融实验**（ModelNet40, 1024 点）：
- 基线（无中心化、固定图）：91.7%
- +中心化（\(x_j - x_i\)）：92.2%（+0.5%）
- +动态图重建：92.9%（+0.7%）
- +2048 点：93.5%（+0.6%）

**模型效率**：21MB 模型大小，27.2ms 前向推理时间，比 PointNet++（163.2ms）快约 **7 倍**。

##### 与传统方法的核心区别

| 特性 | PointNet | PointNet++ | DGCNN |
|------|----------|------------|-------|
| 局部结构 | ❌ 无 | ✅ 固定空间分组 | ✅ 动态特征空间图 |
| 图结构 | 无图 | 固定层级 | **每层动态更新** |
| 邻域定义 | 全局 | 欧氏空间球查询 | **特征空间 k-NN** |
| 感受野 | 全局（一步） | 逐层扩大 | 动态扩展至全局 |
| 边特征 | 无 | 无（点特征） | **\(h(x_i, x_j-x_i)\)** |

#### 🧪 练习题
```yaml
question: "DGCNN 中动态图更新机制的核心优势是什么？"
options:
  - "减少了 k-NN 计算的时间复杂度"
  - "使邻域关系从空间近邻演化为语义近邻，扩大有效感受野"
  - "保证了图的连通性，避免孤立点"
  - "使模型参数量显著减少"
answer: 1
explain: "动态图在每层特征空间中重建 k-NN，使得深层的邻居不再局限于空间距离近的点，而是语义相似的点（如飞机两侧机翼），从而在保持稀疏连接的同时实现全局感受野。"
```

### Point Transformer

```yaml
id: point_transformer
num: 4
name: Point Transformer
full_name: 点云Transformer (Point Transformer)
year: '2021'
org: Oxford
parent: dgcnn
paper_url: https://arxiv.org/abs/2012.09164
project_url: ''
category: point_cloud
motivation: 向量自注意力机制建模长程依赖，刷新语义分割记录
```

#### 📝 一句话总结
Point Transformer 将 Transformer 的自注意力改造成适合无序点集的局部向量注意力层，通过相对位置编码和通道级注意力权重建模点云局部几何关系，解决了 PointNet/DGCNN 类方法对长程上下文和局部关系表达不足的问题。

#### 🎯 核心要点
- 点云专用自注意力层：在局部邻域内执行 self-attention，既保持点集置换不变性，又避免全局注意力在大规模点云上的高复杂度
- 向量注意力（Vector Attention）：每个邻域点输出一组通道级权重，而不是所有通道共享一个标量注意力
- 相对位置编码：将 \(p_i-p_j\) 注入注意力权重和 value 特征，使模型显式感知 3D 欧氏空间结构
- 编码器-解码器骨干：分类使用层级下采样编码，语义分割使用 U-Net 式上采样与跳跃连接恢复逐点预测
- 多任务验证：在 S3DIS Area 5、ModelNet40、ShapeNetPart 等基准上刷新当时结果，其中 S3DIS Area 5 达到 70.4% mIoU

#### 🔬 深入细节
![Point Transformer 层结构](https://ar5iv.labs.arxiv.org/html/2012.09164/assets/x2.png)
*图：Point Transformer layer。每个中心点只聚合局部邻域，注意力由 query-key 差值、相对位置编码和 MLP 共同生成。*

```python
# Point Transformer layer 伪代码
def point_transformer_layer(points, features, k):
    # points: (N, 3), features: (N, C)
    output = []
    for i in range(len(points)):
        nbrs = knn(points, i, k)
        q_i = phi(features[i])
        aggregated = 0
        for j in nbrs:
            rel_pos = points[i] - points[j]
            delta = mlp_pos(rel_pos)
            key = psi(features[j])
            value = alpha(features[j])
            # vector attention: 每个通道一组权重
            weight = softmax(gamma(q_i - key + delta), dim="neighbors")
            aggregated += weight * (value + delta)
        output.append(aggregated)
    return stack(output)
```

**动机与背景**

点云天然是无序集合，且点之间没有规则网格。PointNet 通过逐点 MLP 和对称池化解决置换不变性，但全局池化会丢失局部几何关系；DGCNN 用动态图卷积在邻域图上传播特征，但其聚合权重仍偏向局部边特征的固定函数。Transformer 的自注意力适合处理集合，但直接把 NLP/图像里的全局标量注意力搬到点云上会遇到两个问题：计算量随点数二次增长，以及不同特征通道被同一个标量权重调制，表达力不足。

Point Transformer 的核心判断是：点云理解需要“局部、几何感知、通道可分”的注意力。局部邻域让大场景可扩展；相对位置让注意力知道点间空间关系；向量注意力让不同通道可学习不同的几何响应，例如某些通道关注边界，另一些通道关注平面或语义上下文。

**核心机制：向量注意力**

标准标量注意力可写成：

$$
y_i=\sum_{x_j\in\mathcal{X}}\rho(\varphi(x_i)^T\psi(x_j)+\delta)\alpha(x_j)
$$

其中 \(\rho\) 通常是 softmax，输出是标量权重。Point Transformer 改用向量注意力：

$$
y_i=\sum_{x_j\in\mathcal{X}(i)}
\rho\left(\gamma\left(\varphi(x_i)-\psi(x_j)+\delta_{ij}\right)\right)
\odot\left(\alpha(x_j)+\delta_{ij}\right)
$$

\(\mathcal{X}(i)\) 是点 \(i\) 的局部邻域，\(\delta_{ij}=\theta(p_i-p_j)\) 是由相对坐标经过 MLP 得到的位置编码，\(\gamma\) 生成与特征通道同维度的注意力向量，\(\odot\) 表示逐通道相乘。直觉上，模型不是问“邻居 \(j\) 有多重要”，而是问“邻居 \(j\) 在每个特征通道上分别有多重要”。

> 💡 关键：Point Transformer 同时把 \(\delta_{ij}\) 加入 attention 分支和 value 分支。前者决定邻居权重，后者把几何偏移作为可聚合的内容，避免注意力只看语义特征而忽略空间关系。

**网络结构与数据流**

在语义分割中，网络采用类似 U-Net 的编码器-解码器。编码阶段通过 Transition Down 做采样和局部聚合，逐步减少点数并增加通道数；每个阶段堆叠 Point Transformer block 扩大有效感受野。解码阶段通过 Transition Up 将低分辨率语义特征插值回高分辨率点集，并与浅层特征拼接，最终得到每个输入点的类别概率。

分类任务只需要最终全局表示，因此网络在多级 Point Transformer block 后进行全局聚合和分类。分割任务则必须保留局部边界和细粒度几何，所以跳跃连接非常重要：深层特征提供上下文，浅层特征提供坐标邻域细节。

**与 DGCNN/PointNet++ 的区别**

DGCNN 的 EdgeConv 通过 \(h_\Theta(x_i, x_j-x_i)\) 显式编码边特征，并使用 max 聚合；PointNet++ 通过 Ball Query/FPS 构建层级局部区域，并在局部 PointNet 中池化。Point Transformer 保留了局部邻域的思想，但把固定池化替换为数据依赖的注意力聚合。相比 max pooling，它能根据输入内容动态分配邻居贡献；相比标量 attention，它能让不同通道学习不同几何模式。

**训练与推理流程**

训练时输入点坐标和可选颜色/法线特征，按层级采样形成多尺度点集，经过局部向量注意力聚合后输出分类或逐点语义标签。损失通常是交叉熵；在 S3DIS 等大场景中按块采样训练，推理时对场景块逐块预测再合并。该方法的主要代价在于 kNN/邻域构建和每层局部 attention，但由于注意力限制在邻域内，复杂度从全局 \(O(N^2)\) 降为近似 \(O(Nk)\)。

#### 🧪 练习题
```yaml
question: "Point Transformer 为什么采用向量注意力而不是传统标量注意力？"
options:
  - "为了完全取消相对位置编码"
  - "为了让不同特征通道拥有不同的邻域聚合权重"
  - "为了把全局注意力复杂度固定为 O(1)"
  - "为了只处理规则体素网格"
answer: 1
explain: "向量注意力输出通道级权重，可对不同几何/语义通道分别调制邻居贡献，比所有通道共享一个标量权重表达力更强。"
```

### TCS-Net

```yaml
id: tcs_net
num: 5
name: TCS-Net
full_name: 隧道施工安全监测网络 (TCS-Net)
year: '2026'
org: Springer
parent: point_transformer
paper_url: https://link.springer.com/article/10.1007/s10921-025-01293-8
project_url: ''
category: point_cloud
motivation: 面向极端环境的鲁棒点云分割，应用于隧道安全监测
```

#### 📝 一句话总结
TCS-Net 面向在建隧道的复杂、遮挡、低纹理点云，提出由空间注意力、InvResMLP、特征传播和 KD-tree Gaussian 上采样组成的点云语义分割网络，解决通用室内/室外点云模型难以直接适配隧道安全监测的问题。

#### 🎯 核心要点
- 构建 3D Tunnel 数据集：手持激光扫描获得超过 6000 万点，覆盖掌子面、仰拱、中心隔墙、台车、初支、管线、地面等 8 类结构
- 多模块融合框架：MLP 预编码后进入 Set Abstraction、SelfAttention、InvResMLP 和多级 Feature Propagation
- 空间注意力模块：通过 query/key/value 关系强化远距离结构依赖，适配隧道中重复、遮挡、狭长的几何形态
- InvResMLP：借鉴倒残差思想扩展再压缩通道，提高特征表达同时控制计算量
- KD-tree Gaussian 上采样 + 通道注意力：在解码阶段更稳健地恢复稠密点特征，减少普通插值在稀疏/遮挡区域的误差
- 优化训练策略：结合 AdamW、cosine decay、label smoothing 提升鲁棒性，报告 mIoU 94.38%、OA 98.23%

#### 🔬 深入细节
![TCS-Net 网络结构](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs10921-025-01293-8/MediaObjects/10921_2025_1293_Fig7_HTML.png)
*图：TCS-Net 网络总览。编码侧融合 Set Abstraction、SelfAttention 与 InvResMLP，解码侧通过多级 Feature Propagation 与 KD-Gaussian 上采样恢复逐点标签。*

```python
# TCS-Net 训练/推理伪代码
def tcs_net(points, feats):
    x = mlp_embed(concat(points, feats))          # [N, 32]
    skip0 = x

    # 编码器：逐级下采样并增强局部/全局上下文
    p1, x1 = set_abstraction(points, x, n=1024, c=64)
    x1 = spatial_self_attention(x1)

    p2, x2 = set_abstraction(p1, x1, n=256, c=128)
    x2 = inv_res_mlp(x2)

    p3, x3 = set_abstraction(p2, x2, n=64, c=256)
    x3 = inv_res_mlp(x3)

    p4, x4 = set_abstraction(p3, x3, n=16, c=512)
    x4 = inv_res_mlp(x4)

    # 解码器：特征传播 + KD-tree Gaussian 上采样
    y3 = feature_propagation(p4, p3, x4, x3)
    y2 = feature_propagation(p3, p2, y3, x2)
    y1 = feature_propagation(p2, p1, y2, x1)
    y0 = kd_gaussian_upsample(p1, points, y1)
    y0 = channel_attention(y0, skip0)

    logits = linear_classifier(y0)
    return logits
```

**动机与背景**

隧道施工点云和标准室内数据集差异很大：空间狭长、结构重复、粉尘和设备遮挡多，且掌子面、台车、初支、管线等类别高度工程化。PointNet++/Point Transformer 这类通用模型虽然能处理无序点集，但在此类极端环境中容易受局部缺失、点密度变化和类别边界不清影响。TCS-Net 的目标不是单纯追求通用点云榜单，而是服务无损检测和施工安全监测中的结构级分割。

**核心机制：空间注意力与 InvResMLP**

论文中的 SelfAttention 模块使用典型的 query/key/value 形式，对输入特征 \(F\in\mathbb{R}^{C\times H\times W}\) 生成注意力矩阵：

$$
A=\operatorname{softmax}(Q^TK), \qquad F' = V A
$$

在点云语义分割里，这一步的直觉是让远处但结构相关的点互相通信。例如隧道拱架、中心隔墙和初支沿纵向重复出现，单看局部邻域可能混淆类别；注意力可以让相似结构的上下文参与判别。

InvResMLP 则承担轻量化特征增强的角色。它先用 MLP 将通道扩展到更高维空间，在高维空间中学习非线性组合，再投影回目标维度并通过残差连接稳定训练：

$$
Y = X + W_2\,\sigma(W_1 X)
$$

这种“扩展-压缩”的倒残差设计适合点云网络：它比堆叠大注意力层更省计算，但能补足纯 Set Abstraction 的表达能力。

**KD-tree Gaussian 上采样与通道注意力**

常规 Feature Propagation 多使用最近邻或反距离加权插值：

$$
f(x)=\frac{\sum_{i=1}^{k} w_i f_i}{\sum_{i=1}^{k} w_i},\quad w_i=\frac{1}{d(x,x_i)^2+\epsilon}
$$

TCS-Net 在恢复原始点分辨率时引入 KD-tree 邻域检索和 Gaussian 权重，等价于让近邻贡献按空间距离平滑衰减：

$$
w_i=\exp\left(-\frac{\|x-x_i\|^2}{2\sigma^2}\right)
$$

这对隧道点云很重要：遮挡或扫描角度造成局部稀疏时，硬最近邻容易把台车、管线、地面等边界处的语义错误传播；Gaussian 权重能更连续地融合邻域信息。通道注意力进一步学习哪些通道对当前类别更可靠，降低噪声特征的影响。

> 💡 关键：TCS-Net 的设计重点是“工程场景鲁棒性”。它把 Point Transformer 的上下文建模思想缩进到可训练、可部署的点云分割流水线中，而不是追求全局大注意力。

**训练策略与输出**

训练时，模型以带标签的隧道点云块为输入，输出每个点的 8 类结构标签。损失使用带 label smoothing 的交叉熵，优化器采用 AdamW 并配合 cosine learning-rate decay。label smoothing 可缓解人工标注边界不确定导致的过拟合；AdamW 的权重衰减有助于提高跨隧道段泛化能力。

**与 Point Transformer 的区别**

Point Transformer 更像通用点云 backbone，核心贡献是局部向量注意力层；TCS-Net 则是面向在建隧道的应用网络。它保留注意力建模上下文的思想，但把重点放在数据集、轻量化特征增强、鲁棒上采样和工程类别恢复上。换言之，Point Transformer 解决“点云如何做 Transformer”，TCS-Net 解决“复杂隧道点云如何稳定分割成可监测结构”。

#### 🧪 练习题
```yaml
question: "TCS-Net 中 KD-tree Gaussian 上采样的主要作用是什么？"
options:
  - "把点云转换为规则 2D 图像"
  - "在解码阶段以距离相关权重恢复稠密点特征"
  - "完全替代所有 Set Abstraction 层"
  - "只用于减少类别数量"
answer: 1
explain: "KD-tree 用于快速检索空间邻域，Gaussian 权重根据距离平滑融合邻居特征，可在稀疏和遮挡区域更稳健地恢复逐点语义。"
```

### LoRA-PointNet++

```yaml
id: lora_pointnet
num: 6
name: LoRA-PointNet++
full_name: LoRA增强点云分割 (LoRA-PointNet++)
year: '2026'
org: ISPRS
parent: pointnet_pp
paper_url: https://www.sciencedirect.com/science/article/pii/S2667393226000050
project_url: ''
category: point_cloud
motivation: 引入LoRA微调技术实现高效跨领域点云适配
```

#### 📝 一句话总结
LoRA-PointNet++ 将低秩适配器插入 PointNet++ 的 Set Abstraction 与 Feature Propagation MLP 中，只训练少量低秩参数来完成跨域和增量类别适配，解决全量微调在航空 LiDAR 语义分割中参数开销大、灾难性遗忘强的问题。

#### 🎯 核心要点
- 参数高效微调：冻结预训练 PointNet++ 主干权重，仅训练低秩矩阵 \(A,B\) 形成 \(\Delta W=BA\)
- 插入位置明确：在编码器 Set Abstraction 的 MLP 和解码器 Feature Propagation 的 MLP 中加入 LoRA 分支
- 面向真实部署场景：评估 domain adaptation 和 novel classes incremental learning 两类任务
- 数据集覆盖航空 LiDAR：使用 TerLiDAR 与 DALES 等大规模点云子集，TerLiDAR 覆盖西班牙 Catalonia Ter River 沿线 51.4 km²、约 6.92 亿彩色点
- 抗遗忘能力：相比全量微调，对旧类别保持更好，尤其改善欠代表类别和新域类别
- 参数效率显著：报告在训练参数减少 73.4% 的情况下超过或接近全量微调，并在 DALES 上提升约 2.7 mIoU

#### 🔬 深入细节
![LoRA-PointNet++ 插入位置](https://ars.els-cdn.com/content/image/1-s2.0-S2667393226000050-gr2_lrg.jpg)
*图：LoRA-enabled PointNet++。橙色模块表示可训练 LoRA 分支，分别插入编码器 Set Abstraction 与解码器 Feature Propagation 的 MLP 权重。*

```python
# LoRA-PointNet++ 微调伪代码
class LoRALinear:
    def __init__(self, pretrained_weight, rank, alpha):
        self.W = freeze(pretrained_weight)
        self.A = trainable_matrix(rank, pretrained_weight.in_dim)
        self.B = trainable_matrix(pretrained_weight.out_dim, rank)
        self.scale = alpha / rank

    def __call__(self, x):
        return x @ self.W.T + self.scale * (x @ self.A.T @ self.B.T)

def finetune_lora_pointnetpp(batch):
    points, labels = batch
    logits = pointnetpp_with_lora(points)
    loss = cross_entropy(logits, labels)
    # 只更新 A、B 和可选分类头；预训练主干保持冻结
    loss.backward(parameters=["lora_A", "lora_B", "classifier"])
    optimizer.step()
```

**动机与背景**

航空 LiDAR 语义分割经常面对两个现实问题：一是采集平台、区域地貌、点密度、传感器通道不同导致 domain shift；二是国家测绘或城市治理任务会不断新增类别，旧模型需要增量学习。传统做法是全量微调 PointNet++，但全量更新会带来较高显存/训练成本，也容易在新域上过拟合并遗忘旧类别。

LoRA 的核心思想是：预训练权重 \(W_0\) 不动，只学习一个低秩增量：

$$
W = W_0 + \Delta W,\qquad \Delta W = \frac{\alpha}{r}BA
$$

其中 \(A\in\mathbb{R}^{r\times d_{\text{in}}}\)、\(B\in\mathbb{R}^{d_{\text{out}}\times r}\)，秩 \(r\) 远小于原始通道维度。这样模型仍然保留预训练 PointNet++ 的通用几何能力，新域知识通过低秩分支注入。

**为什么适合 PointNet++**

PointNet++ 的主要可学习参数集中在局部 PointNet/MLP 中。Set Abstraction 负责从局部邻域提取层级几何特征，Feature Propagation 负责把深层语义插值回原始点。LoRA-PointNet++ 将适配器放在这两类 MLP 上，等价于同时调整“局部几何编码方式”和“语义上采样方式”，但不破坏采样、分组和插值这些结构性归纳偏置。

> 💡 关键：LoRA 并不是替换 PointNet++，而是在已有线性/MLP 权重旁边增加一个低秩旁路。推理时 \(\Delta W\) 可以并回 \(W_0\)，几乎不增加推理延迟。

**训练流程**

训练前先准备一个在源域上预训练的 PointNet++。适配新城市、新传感器或新增类别时，冻结主干权重，只训练 LoRA 矩阵和必要的分类头。若是增量类别学习，分类头会扩展到新类别数，同时旧类别的主干表示尽量保持稳定；若是跨域适配，则分类空间不变，但 LoRA 学习新域的点密度、颜色/强度分布和地物形态偏移。

损失仍是逐点交叉熵：

$$
\mathcal{L}=-\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{C}y_{ic}\log p_{ic}
$$

LoRA 只改变 \(p_{ic}\) 的特征生成路径，不改变 PointNet++ 的置换不变性和层级局部建模方式。

**与全量微调的区别**

全量微调会更新所有 MLP 权重，容量更大但也更容易把旧域知识覆盖掉；LoRA 将更新限制在低秩子空间中，相当于给模型一个受控的“域偏移补偿器”。这解释了论文中观察到的抗灾难性遗忘现象：旧知识主要保存在冻结权重里，新知识由低秩增量承载。

**适用边界**

LoRA-PointNet++ 最适合“源域和目标域有共享几何结构，但分布发生偏移”的场景，例如不同城市航空 LiDAR、不同测绘批次、少量新类别加入。如果目标域类别体系完全不同，或点特征模态大幅变化，单纯低秩适配可能不足，需要解冻更多层或结合自监督预训练。

#### 🧪 练习题
```yaml
question: "LoRA-PointNet++ 相比全量微调的核心优势是什么？"
options:
  - "完全取消 PointNet++ 的 Set Abstraction"
  - "冻结主干权重，只用低秩增量适配新域，从而减少训练参数并缓解遗忘"
  - "把点云强制转换为 2D 图像后训练 CNN"
  - "只适用于单个物体分类，不能做语义分割"
answer: 1
explain: "LoRA 学习低秩矩阵 A、B 形成权重增量，保留预训练主干知识，同时用少量参数适配新域或新增类别。"
```

### NeRF

```yaml
id: nerf
num: 7
name: NeRF
full_name: 神经辐射场 (Neural Radiance Fields)
year: '2020'
org: UC Berkeley
parent: —
paper_url: https://arxiv.org/abs/2003.08934
project_url: ''
category: nerf
motivation: 5D神经隐式表示+体渲染，开启神经渲染新时代
```

#### 📝 一句话总结
NeRF 将静态场景表示为一个连续的 5D 神经辐射场函数 \(F_\Theta: (\mathbf{x}, \mathbf{d}) \to (\mathbf{c}, \sigma)\)，通过 MLP 将空间位置和观察方向映射为颜色与体密度，再沿相机光线进行可微体渲染积分生成像素颜色，仅需多视角 2D 图像监督即可重建出高保真的 3D 场景表示，在新视角合成任务上大幅超越先前方法。

#### 🎯 核心要点
- **连续隐式场景表示**：用 MLP 将 5D 坐标 \((\mathbf{x}, \mathbf{d})\) 映射为体密度 \(\sigma\) 和视角相关颜色 \(\mathbf{c}\)，无需离散化体素或网格存储
- **经典体渲染积分**：沿光线对颜色和密度进行数值积分，\(\hat{C}(\mathbf{r}) = \sum_i T_i (1 - \exp(-\sigma_i \delta_i)) \mathbf{c}_i\)，天然可微，支持端到端优化
- **位置编码（Positional Encoding）**：将低维输入映射到高维傅里叶特征空间 \(\gamma(p) = (\sin(2^k\pi p), \cos(2^k\pi p))_{k=0}^{L-1}\)，使 MLP 能学习高频细节（位置 \(L=10\)，方向 \(L=4\)）
- **层次化体采样（Hierarchical Sampling）**：先用粗网络（64 个均匀采样点）估计密度分布，再用逆变换采样在高密度区域追加 128 个精细采样点，大幅提升渲染效率和质量
- **视角相关外观建模**：密度 \(\sigma\) 仅依赖位置（保证几何一致性），颜色 \(\mathbf{c}\) 同时依赖位置和方向（建模高光、反射等视角相关效果）
- **MLP 架构设计**：8 层 256 通道全连接网络，第 5 层引入跳跃连接重新注入位置编码，最后一层拼接方向编码输出 RGB
- **仅需 2D 监督**：训练数据为多视角图像及对应相机位姿，损失函数为渲染像素与真实像素的 MSE，无需 3D 监督
- **SOTA 新视角合成**：在合成数据集上 PSNR 达 31.01 dB，真实场景达 26.50 dB，显著超越 SRN、LLFF、NV 等先前方法

#### 🔬 深入细节
##### 核心架构示意图

![NeRF Pipeline](https://raw.githubusercontent.com/bmild/nerf/master/imgs/pipeline.jpg)
*图：NeRF 整体流程。(a) 沿相机光线采样 5D 坐标（位置 + 方向）；(b) 将坐标输入 MLP 输出颜色和密度；(c) 通过体渲染积分将光线上所有采样点的颜色和密度合成为最终像素颜色；(d) 渲染损失反向传播优化 MLP 权重。位置编码将低维输入映射到高频空间，层次采样策略使用粗-精两阶段提升效率。*

##### 算法伪代码

```python
# NeRF 训练与渲染伪代码
def nerf_train_step(images, poses, focal, model_coarse, model_fine):
    """
    images: (N_img, H, W, 3)  — 多视角训练图像
    poses: (N_img, 4, 4)      — 对应相机位姿（camera-to-world）
    focal: 焦距
    model_coarse, model_fine: 粗/精 MLP 网络
    """
    # === 阶段1：随机选取光线 ===
    img_idx = random_choice(N_img)                    # 随机选一张图
    pixels = random_sample(H * W, N_rays=4096)        # 随机选 4096 条光线
    rays_o, rays_d = get_rays(poses[img_idx], focal)  # 光线原点和方向
    target_rgb = images[img_idx][pixels]               # 真实像素颜色

    # === 阶段2：粗网络 — 均匀分层采样 ===
    t_coarse = stratified_sample(near=2, far=6, N_c=64)  # 64 个分层采样点
    pts_coarse = rays_o + rays_d * t_coarse               # (N_rays, 64, 3)

    # 位置编码
    encoded_pos = positional_encoding(pts_coarse, L=10)   # (N_rays, 64, 63)
    encoded_dir = positional_encoding(rays_d, L=4)        # (N_rays, 27)

    # MLP 前向
    rgb_c, sigma_c = model_coarse(encoded_pos, encoded_dir)  # 颜色和密度

    # 体渲染
    C_coarse = volume_render(rgb_c, sigma_c, t_coarse)    # (N_rays, 3)

    # === 阶段3：精细网络 — 基于密度的重要性采样 ===
    weights = compute_weights(sigma_c, t_coarse)           # 粗网络权重分布
    t_fine = inverse_transform_sample(weights, N_f=128)    # 128 个重要性采样点
    t_all = sort(concat(t_coarse, t_fine))                 # 合并排序: 192 个点
    pts_fine = rays_o + rays_d * t_all

    encoded_pos_f = positional_encoding(pts_fine, L=10)
    rgb_f, sigma_f = model_fine(encoded_pos_f, encoded_dir)
    C_fine = volume_render(rgb_f, sigma_f, t_all)          # (N_rays, 3)

    # === 阶段4：计算损失 ===
    loss = MSE(C_coarse, target_rgb) + MSE(C_fine, target_rgb)
    loss.backward()
    optimizer.step()  # Adam, lr: 5e-4 → 5e-5 指数衰减


def volume_render(rgb, sigma, t_vals):
    """经典体渲染离散化近似"""
    deltas = t_vals[..., 1:] - t_vals[..., :-1]           # 相邻采样点间距
    alpha = 1 - exp(-sigma * deltas)                       # 不透明度
    T = cumprod(1 - alpha, dim=-1)                         # 累积透射率
    # T_i = exp(-Σ_{j<i} σ_j δ_j)
    weights = T * alpha                                     # 合成权重 w_i
    C = sum(weights * rgb, dim=-2)                         # 加权颜色求和
    return C


def positional_encoding(x, L):
    """傅里叶位置编码：将低维输入映射到 2L 维高频特征"""
    # γ(p) = (p, sin(2^0 πp), cos(2^0 πp), ..., sin(2^{L-1} πp), cos(2^{L-1} πp))
    freqs = [2**k * pi for k in range(L)]
    encoded = [x]
    for freq in freqs:
        encoded.append(sin(freq * x))
        encoded.append(cos(freq * x))
    return concat(encoded, dim=-1)  # 输入d维 → 输出d(2L+1)维
```

##### 方法细节

**动机与背景**

新视角合成（Novel View Synthesis）是计算机视觉和图形学的核心问题：给定一组已知视角的图像，生成任意新视角的逼真图像。在 NeRF 之前，主流方法面临根本性限制：(1) **离散体素方法**（如 Neural Volumes）将场景存储在 3D 体素网格中，分辨率受限于 \(O(n^3)\) 的内存开销，难以表示精细细节；(2) **基于网格/点云的方法**需要显式几何重建，对复杂拓扑和半透明物体处理困难；(3) **基于图像的渲染**（如 LLFF）通过插值已有视角生成新视角，但在大视角变化时产生严重伪影。

NeRF 的核心洞察是：**用一个连续的神经网络隐式编码整个场景的辐射场，结合物理上有意义的体渲染方程，可以在不显式重建几何的情况下实现照片级真实感的新视角合成。**

> 💡 关键：NeRF 的革命性在于将"场景表示"问题转化为"函数逼近"问题——场景的全部几何和外观信息被压缩进 MLP 的权重中，而非存储在显式的数据结构里。

**核心表示：5D 神经辐射场**

NeRF 将场景建模为一个连续的 5D 向量值函数：

$$F_\Theta: (\mathbf{x}, \mathbf{d}) \to (\mathbf{c}, \sigma)$$

其中 \(\mathbf{x} = (x, y, z)\) 是 3D 空间位置，\(\mathbf{d} = (\theta, \phi)\) 是 2D 观察方向（用 3D 单位向量表示），\(\mathbf{c} = (r, g, b)\) 是发射颜色，\(\sigma\) 是体积密度（可理解为光线在该点被截断的微分概率）。

这一设计有两个关键约束：
1. **密度 \(\sigma\) 仅依赖位置 \(\mathbf{x}\)**：保证场景几何在不同视角下一致，不会出现"从不同角度看形状不同"的问题
2. **颜色 \(\mathbf{c}\) 依赖位置和方向 \((\mathbf{x}, \mathbf{d})\)**：建模视角相关的外观效果，如镜面高光、金属反射等

> ⚠️ 注意：密度与方向无关是 NeRF 能生成多视角一致几何的关键。如果密度也依赖方向，优化可能收敛到"每个视角一个不同的几何"的退化解。

**体渲染方程**

给定相机光线 \(\mathbf{r}(t) = \mathbf{o} + t\mathbf{d}\)（\(\mathbf{o}\) 为相机原点，\(\mathbf{d}\) 为光线方向），该光线的期望颜色由经典体渲染积分给出：

$$C(\mathbf{r}) = \int_{t_n}^{t_f} T(t) \cdot \sigma(\mathbf{r}(t)) \cdot \mathbf{c}(\mathbf{r}(t), \mathbf{d}) \, dt$$

其中累积透射率 \(T(t) = \exp\left(-\int_{t_n}^{t} \sigma(\mathbf{r}(s)) \, ds\right)\) 表示光线从 \(t_n\) 到 \(t\) 未被遮挡的概率。

实际计算中，使用数值求积离散化：

$$\hat{C}(\mathbf{r}) = \sum_{i=1}^{N} T_i \left(1 - \exp(-\sigma_i \delta_i)\right) \mathbf{c}_i, \quad T_i = \exp\left(-\sum_{j=1}^{i-1} \sigma_j \delta_j\right)$$

其中 \(\delta_i = t_{i+1} - t_i\) 是相邻采样点间距。令 \(\alpha_i = 1 - \exp(-\sigma_i \delta_i)\) 为不透明度，则权重 \(w_i = T_i \alpha_i\) 的物理含义是"光线在第 \(i\) 个采样点首次被吸收的概率"。

> 💡 关键：这一离散化公式与传统 alpha compositing（前到后合成）完全等价，且对 \(\sigma\) 和 \(\mathbf{c}\) 都是可微的，使得渲染损失可以直接反向传播到 MLP 权重。

**位置编码：让 MLP 看见高频信号**

直接将低维坐标 \((x, y, z, d_x, d_y, d_z)\) 输入 MLP 会导致网络严重偏向学习低频函数（这一现象被称为"频谱偏置"，spectral bias），无法重建纹理细节和锐利边缘。NeRF 引入位置编码将输入映射到高维空间：

$$\gamma(p) = \left(\sin(2^0 \pi p), \cos(2^0 \pi p), \sin(2^1 \pi p), \cos(2^1 \pi p), \ldots, \sin(2^{L-1} \pi p), \cos(2^{L-1} \pi p)\right)$$

对位置坐标 \(\mathbf{x}\) 使用 \(L = 10\)（3 维 → 60 维），对方向 \(\mathbf{d}\) 使用 \(L = 4\)（3 维 → 24 维）。加上原始输入，位置编码后的维度分别为 63 和 27。

| 配置 | 位置编码 | 方向编码 | PSNR (合成) |
|------|---------|---------|------------|
| 无编码 | — | — | 22.26 |
| 仅位置编码 | L=10 | — | 29.03 |
| 完整编码 | L=10 | L=4 | **31.01** |

> ⚠️ 注意：位置编码的频率呈指数增长 \(2^0, 2^1, \ldots, 2^{L-1}\)，这使得网络能同时捕获从粗糙几何到精细纹理的多尺度信息。\(L\) 的选择需要权衡：太小则丢失高频细节，太大则可能过拟合噪声。

**MLP 网络架构**

NeRF 的 MLP 采用精心设计的架构来分离几何和外观：

```
输入: γ(x) [63维]
  ↓
FC(256) + ReLU × 4 层
  ↓
FC(256) + ReLU ← 跳跃连接：拼接 γ(x) [第5层重新注入位置编码]
  ↓
FC(256) + ReLU × 3 层
  ↓
├→ FC(1) → σ (密度，无激活函数，用 ReLU 保证非负)
└→ FC(256) → 256维特征
      ↓
      拼接 γ(d) [27维]
      ↓
      FC(128) + ReLU
      ↓
      FC(3) + Sigmoid → c (RGB颜色，值域[0,1])
```

这一设计的关键点：
- **跳跃连接**在第 5 层重新注入位置编码，缓解深层网络中位置信息的衰减
- **密度 \(\sigma\) 在颜色之前输出**，确保几何不依赖观察方向
- **方向信息仅在最后阶段注入**，且只经过一个浅层网络（128 维），限制视角相关效果的复杂度，防止过拟合

**层次化体采样策略**

均匀采样在空白区域浪费大量计算。NeRF 采用粗-精两阶段采样：

**第一阶段（粗采样）**：在光线的 \([t_n, t_f]\) 区间内均匀分层采样 \(N_c = 64\) 个点：

$$t_i \sim \mathcal{U}\left[t_n + \frac{i-1}{N_c}(t_f - t_n), \; t_n + \frac{i}{N_c}(t_f - t_n)\right]$$

分层采样（stratified sampling）在每个区间内加入随机扰动，既保证覆盖整个区间，又引入随机性避免混叠。

**第二阶段（精细采样）**：利用粗网络的输出权重 \(\hat{w}_i = T_i(1 - \exp(-\sigma_i \delta_i))\) 构建分段常数 PDF，通过逆变换采样（inverse transform sampling）额外采样 \(N_f = 128\) 个点。这些点集中在粗网络认为"有物体"的区域。最终将 \(N_c + N_f = 192\) 个点合并排序后送入精细网络。

> 💡 关键：粗网络和精细网络是两个独立的 MLP，共享相同的架构但参数不同。粗网络的作用类似于"注意力机制"——告诉精细网络应该关注光线上的哪些区域。这种设计使得精细网络的采样点集中在表面附近，大幅提升了渲染质量。

**训练细节**

| 参数 | 值 |
|------|-----|
| 优化器 | Adam (\(\beta_1=0.9, \beta_2=0.999\)) |
| 学习率 | \(5 \times 10^{-4}\) → \(5 \times 10^{-5}\)（指数衰减） |
| 每批光线数 | 4096 条 |
| 粗采样点数 \(N_c\) | 64 |
| 精细采样点数 \(N_f\) | 128 |
| MLP 层数/宽度 | 8 层 / 256 通道 |
| 训练迭代次数 | 100k-300k（约 1-2 天，单 NVIDIA V100） |
| 损失函数 | \(\mathcal{L} = \sum_{\mathbf{r}} \left[\|\hat{C}_c(\mathbf{r}) - C(\mathbf{r})\|_2^2 + \|\hat{C}_f(\mathbf{r}) - C(\mathbf{r})\|_2^2\right]\) |

损失函数同时监督粗网络和精细网络的渲染结果，确保粗网络也能学到合理的密度分布（否则精细采样的引导会失效）。

**与先前方法的对比**

| 特性 | Neural Volumes | SRN | LLFF | NeRF |
|------|---------------|-----|------|------|
| 场景表示 | 离散体素网格 | 连续隐式（LSTM） | 多平面图像 | 连续辐射场 |
| 分辨率限制 | 受体素分辨率限制 | 无 | 受平面数限制 | 无 |
| 视角相关效果 | 有限 | 无 | 有限 | 完整建模 |
| 合成场景 PSNR | 26.05 | 22.26 | 24.88 | **31.01** |
| 真实场景 PSNR | — | 22.84 | 24.13 | **26.50** |
| 训练数据 | 多视角图像 | 多视角图像 | 多视角图像 | 多视角图像 |

NeRF 在所有指标（PSNR、SSIM、LPIPS）上均大幅领先，特别是在合成场景上 PSNR 提升超过 5 dB，对应视觉质量的显著飞跃。

**局限性与后续发展**

NeRF 的主要局限包括：(1) **训练和渲染速度慢**——每个场景需要独立训练 1-2 天，渲染一帧需要数十秒；(2) **仅支持静态场景**——无法处理动态物体；(3) **需要精确相机位姿**——依赖 COLMAP 等 SfM 工具预处理；(4) **每个场景一个网络**——无法泛化到未见场景。这些局限催生了大量后续工作：Instant-NGP（哈希编码加速）、D-NeRF（动态场景）、NeRF--（联合优化位姿）、pixelNeRF（泛化到新场景）、3D Gaussian Splatting（显式表示加速）等。

#### 🧪 练习题
```yaml
question: "NeRF 中位置编码（Positional Encoding）的主要作用是什么？"
options:
  - "将 3D 坐标归一化到 [0,1] 范围，加速网络收敛"
  - "将低维输入映射到高维傅里叶特征空间，使 MLP 能学习高频几何和纹理细节"
  - "对输入坐标进行数据增强，防止过拟合"
  - "将世界坐标转换为相机坐标系，统一不同视角的输入"
answer: 1
explain: "MLP 存在频谱偏置（spectral bias），倾向于学习低频函数。位置编码通过 sin/cos 函数将低维坐标映射到高维空间，使网络能够表示高频变化。实验表明，去掉位置编码后 PSNR 从 31.01 降至 22.26，损失巨大。"
```

### Mip-NeRF

```yaml
id: mip_nerf
num: 8
name: Mip-NeRF
full_name: 多尺度抗锯齿NeRF (Mip-NeRF)
year: '2021'
org: Google
parent: nerf
paper_url: https://arxiv.org/abs/2103.13415
project_url: ''
category: nerf
motivation: 圆锥台采样+集成位置编码解决多尺度走样问题
```

#### 📝 一句话总结
Mip-NeRF将NeRF的射线点采样替换为圆锥台体积采样，通过多元高斯近似锥台并推导集成位置编码(IPE)的闭式解，使单个MLP能感知尺度信息，在多尺度场景上将误差降低60%，同时模型更小(50%)更快(7%)。

#### 🎯 核心要点
- **圆锥追踪(Cone Tracing):** 每个像素发射一个圆锥而非射线，沿锥体切分为锥台(conical frustum)，每个锥台代表一个3D体积区域而非无穷小的点，天然编码了像素的空间尺度信息
- **高斯近似锥台:** 用多元高斯 $\mathcal{N}(\boldsymbol{\mu}, \boldsymbol{\Sigma})$ 近似每个锥台的位置/尺度分布，其中均值和协方差由锥台的射线参数 $(t_0, t_1)$ 和锥体半径 $\dot{r}$ 解析计算得到
- **集成位置编码(IPE):** 对高斯区域内的位置编码求期望 $\mathbb{E}[\gamma(\mathbf{x})]$，利用傅里叶特征的性质得到闭式解：$\sin/\cos$ 分量乘以高斯衰减因子 $\exp(-\frac{1}{2}\text{diag}(\mathbf{P}\boldsymbol{\Sigma}\mathbf{P}^T))$，高频分量在大尺度区域自动衰减
- **单MLP架构:** 将NeRF的coarse+fine两个MLP合并为一个，用 $\lambda=0.1$ 加权coarse损失，模型参数减半(612K vs 1191K)且训练更快
- **多尺度一致性:** 同一模型在不同分辨率下渲染质量一致，在多尺度Blender数据集上平均误差比NeRF降低60%

#### 🔬 深入细节
##### 📊 核心图示

![Mip-NeRF Pipeline](https://ar5iv.labs.arxiv.org/html/2103.13415/assets/figures/overview.png)

**图示说明：** (a) NeRF沿射线采样离散点并用位置编码(PE)；(b) Mip-NeRF沿圆锥采样锥台，用多元高斯近似后计算集成位置编码(IPE)，IPE是PE在锥台体积上的期望值。

##### 🔧 伪代码

```python
def mip_nerf_render(ray_origin, ray_dir, pixel_radius, t_vals, MLP):
    """Mip-NeRF 单条光线渲染流程"""
    # 1. 圆锥追踪：计算每个锥台的高斯参数
    gaussians = []
    for i in range(len(t_vals) - 1):
        t0, t1 = t_vals[i], t_vals[i+1]
        # 沿射线方向的均值和方差
        mu_t = (t0 + t1) / 2 + (2*t0*t1) / (3*(t0+t1))  # 非简单中点!
        sigma_t2 = (t1-t0)**2/12 - (4/15)*((t1-t0)**4) / (t0+t1)**2
        # 垂直射线方向的方差(由像素半径决定尺度)
        sigma_r2 = pixel_radius**2 * (t0**2 + t0*t1 + t1**2) / 3
        # 转换到世界坐标: μ = o + μ_t·d, Σ = σ_t²(dd^T) + σ_r²(I - dd^T/||d||²)
        mu = ray_origin + mu_t * ray_dir
        Sigma = sigma_t2 * outer(ray_dir, ray_dir) + \
                sigma_r2 * (eye(3) - outer(ray_dir, ray_dir) / dot(ray_dir, ray_dir))
        gaussians.append((mu, Sigma))
    
    # 2. 集成位置编码(IPE)
    features = []
    for mu, Sigma in gaussians:
        # P = 位置编码频率矩阵 [2^0, 2^1, ..., 2^(L-1)] × I_3
        P_mu = P @ mu                          # 频率缩放后的均值
        P_Sigma_PT_diag = diag(P @ Sigma @ P.T)  # 频率缩放后的方差对角线
        # IPE = [sin(Pμ)·exp(-½σ²), cos(Pμ)·exp(-½σ²)]
        gamma_mu = concat([sin(P_mu) * exp(-0.5 * P_Sigma_PT_diag),
                           cos(P_mu) * exp(-0.5 * P_Sigma_PT_diag)])
        features.append(gamma_mu)
    
    # 3. 单MLP预测颜色和密度
    colors, densities = MLP(features, ray_dir)
    
    # 4. 体渲染合成
    rgb = volume_render(colors, densities, t_vals)
    return rgb

def train_step(rays, gt_colors, MLP):
    """训练：coarse+fine共享单MLP"""
    # Coarse: 均匀分层采样128个点
    t_coarse = stratified_sample(128)
    rgb_c, weights_c = render(rays, t_coarse, MLP)
    
    # Fine: 根据coarse权重重要性采样128个点
    weights_modified = blur_and_resample(weights_c)  # 权重平滑防空洞
    t_fine = inverse_transform_sample(weights_modified, 128)
    rgb_f, _ = render(rays, t_fine, MLP)
    
    # 损失: λ·L_coarse + L_fine (λ=0.1)
    loss = 0.1 * mse(rgb_c, gt_colors) + mse(rgb_f, gt_colors)
    return loss
```

##### 📐 方法详解

**1. 从射线到圆锥：为什么需要体积采样？**

NeRF将每个像素视为一条无穷细的射线，沿射线采样离散点。这在单一分辨率下工作良好，但当场景在不同距离/分辨率下观察时，同一个3D点在近处像素中只占很小面积，在远处像素中却可能覆盖大面积——NeRF无法区分这两种情况，导致严重走样。

Mip-NeRF的解决方案是让每个像素发射一个圆锥（锥角由像素大小决定），将锥体沿深度切分为锥台。每个锥台是一个3D体积，其大小天然编码了"这个像素在该深度处覆盖多大的空间范围"。

**2. 高斯近似的精妙之处**

锥台的精确积分难以处理，论文用多元高斯近似。关键细节：
- 沿射线方向的均值 $\mu_t$ **不是**简单的 $(t_0+t_1)/2$，而是加了修正项 $\frac{2t_0 t_1}{3(t_0+t_1)}$，因为锥台体积沿深度增大，质心偏向远端
- 垂直方向的方差 $\sigma_r^2$ 与像素半径 $\dot{r}$ 成正比——这是尺度信息进入模型的关键通道
- 世界坐标下的协方差矩阵 $\boldsymbol{\Sigma}$ 是秩2的（沿射线+垂直射线两个方向），但通过对角化近似可高效计算

**3. IPE的物理直觉**

位置编码 $\gamma(\mathbf{x}) = [\sin(2^l \mathbf{x}), \cos(2^l \mathbf{x})]$ 中，高频分量 $2^l$ 对微小位移敏感。当对一个高斯区域求期望时：
- 如果区域很小（近处/高分辨率）：$\sigma$ 小 → $\exp(-\frac{1}{2}\sigma^2) \approx 1$ → 保留所有频率
- 如果区域很大（远处/低分辨率）：$\sigma$ 大 → 高频的 $\exp(-\frac{1}{2}(2^l)^2\sigma^2) \approx 0$ → 自动抑制高频

这实现了**连续的、自适应的低通滤波**，等价于对辐射场做了mipmap式的预滤波。

**4. 单MLP的设计动机**

NeRF用两个MLP是因为coarse网络只需粗略估计密度分布用于引导采样，不需要精确。但Mip-NeRF中，IPE本身就编码了尺度——coarse采样的大锥台和fine采样的小锥台产生不同的IPE特征，单个MLP可以根据输入特征自动区分粗细级别。损失中 $\lambda=0.1$ 降低coarse权重，避免粗采样的不精确目标干扰fine预测。

##### 📈 关键实验结果

| 方法 | 多尺度Blender Avg↓ | 参数量 | 训练时间 |
|------|-------------------|--------|---------|
| NeRF | 0.0288 | 1,191K | 3.05h |
| Mip-NeRF | **0.0114** | **612K** | **2.84h** |
| Mip-NeRF w/o IPE | 0.0186 | 612K | 2.79h |
| Mip-NeRF w/o Single MLP | 0.0115 | 1,191K | 3.40h |

- 多尺度Blender：误差降低 **60%**（0.0288→0.0114）
- 原始单尺度Blender：误差降低 **17%**
- 模型参数减半，训练快7%
- 超采样NeRF(128rays/pixel)可达类似质量但慢 **22倍**

#### 🧪 练习题
```yaml
1. **概念题：** 为什么Mip-NeRF中沿射线方向的高斯均值 $\mu_t$ 不等于锥台的几何中心 $(t_0+t_1)/2$？这个偏移的物理含义是什么？

2. **推导题：** 给定位置编码 $\gamma(x) = \sin(\omega x)$，其中 $x \sim \mathcal{N}(\mu, \sigma^2)$，请推导 $\mathbb{E}[\sin(\omega x)]$ 的闭式解，并解释为什么结果中包含 $\exp(-\frac{1}{2}\omega^2\sigma^2)$ 项。

3. **设计题：** 如果要将Mip-NeRF扩展到处理运动模糊（即曝光时间内相机移动），你会如何修改锥台的高斯参数化？需要在哪个维度上增加方差？

4. **分析题：** 在Mip-NeRF的单MLP训练中，为什么coarse损失的权重 $\lambda$ 设为0.1而非1.0？如果设为1.0会出现什么问题？如果设为0（完全去掉coarse损失）又会怎样？
```

### D-NeRF

```yaml
id: d_nerf
num: 9
name: D-NeRF
full_name: 动态神经辐射场 (Dynamic NeRF)
year: '2021'
org: UNC
parent: nerf
paper_url: https://arxiv.org/abs/2011.13961
project_url: ''
category: nerf
motivation: 扩展时间维度建模动态场景的形变与运动
```

#### 📝 一句话总结
D-NeRF 提出将动态场景分解为**规范空间表示**与**时变形变场**两个模块，仅需单目移动相机拍摄的稀疏图像即可端到端学习动态场景的神经辐射场，实现任意时刻、任意视角的新视角合成。

#### 🎯 核心要点
- **双网络架构**：形变网络 \(\Psi_t\) 学习时变位移场，规范网络 \(\Psi_x\) 学习规范空间的体密度与颜色
- **6D 神经辐射场**：将 NeRF 的 5D 输入 \((x,y,z,\theta,\phi)\) 扩展为 6D \((x,y,z,\theta,\phi,t)\)，引入时间维度
- **规范空间分解**：所有时刻的场景通过位移场映射到统一的规范配置（\(t=0\)），实现几何与外观的共享表示
- **端到端训练**：仅需 RGB 图像和相机位姿，无需 3D 先验、深度监督或多视角同步采集
- **课程学习策略**：按时间戳排序逐步引入训练图像，提升形变网络收敛稳定性
- **位置编码**：对空间坐标 \(L=10\)、视角方向和时间 \(L=4\) 分别应用 Fourier 位置编码
- **8 个动态场景基准**：构建包含关节运动、人体运动、弹跳球等多种形变类型的合成数据集

#### 🔬 深入细节
##### 框架总览

![D-NeRF 流水线示意图](https://ar5iv.labs.arxiv.org/html/2011.13961/assets/figures/pipeline.png)
*图：D-NeRF 整体流水线。输入为带时间戳的 3D 点 \((\mathbf{x}, t)\)，形变网络输出位移 \(\Delta\mathbf{x}\)，将点映射到规范空间后由规范网络预测颜色和密度。*

![D-NeRF 网络架构](https://ar5iv.labs.arxiv.org/html/2011.13961/assets/figures/model.png)
*图：D-NeRF 的双网络架构细节。左侧为形变网络 \(\Psi_t\)，右侧为规范网络 \(\Psi_x\)，均为 8 层 MLP。*

##### 算法伪代码

```python
# D-NeRF 训练流程伪代码
# 两个网络：Ψ_t (形变网络), Ψ_x (规范网络)

for iteration in range(800_000):
    # 1. 采样：随机选取一张图像及其时间戳 t 和相机位姿 T_t
    image_t, t, T_t = sample_training_image()
    
    # 2. 光线采样：从该相机投射 N_s=4096 条光线
    rays = cast_rays(T_t, num_rays=4096)
    
    # 3. 对每条光线上的采样点 x(h) = o + h*d：
    for ray in rays:
        points = stratified_sample(ray, num_samples=64)  # 分层采样
        
        # 4. 形变网络：将观测空间的点映射到规范空间
        if t != 0:
            delta_x = Ψ_t(encode(x), encode(t))  # 预测位移
            p = x + delta_x                        # 规范空间坐标
        else:
            p = x  # t=0 即为规范空间
        
        # 5. 规范网络：预测规范空间的密度和颜色
        color, sigma = Ψ_x(encode(p), encode(d))
    
    # 6. 体渲染：沿光线积分得到像素颜色
    C_pred = volume_rendering(colors, sigmas, deltas)
    
    # 7. 损失：MSE
    loss = MSE(C_pred, C_gt)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

NeRF 在静态场景的新视角合成中取得了突破性成果，但其假设场景在所有图像中保持不变，无法处理包含运动或形变的动态场景。现实世界中大量场景是动态的——人体运动、物体交互、柔性物体变形等。

此前处理动态场景的方法通常需要：(1) 多相机同步采集系统；(2) 预计算的 3D 先验（如模板网格、骨骼）；(3) 同一时刻的多视角观测。这些约束严重限制了实际应用。

D-NeRF 的核心洞察是：**动态场景可以分解为一个共享的规范几何表示和一组时变的形变场**。这一思想借鉴了传统计算机视觉中 Shape-from-Template 的理念，但完全在隐式神经表示框架下实现。

##### 核心机制

**1. 形变网络 \(\Psi_t\)：时变位移场**

形变网络接收空间坐标 \(\mathbf{x}\) 和时间 \(t\) 的位置编码，输出 3D 位移向量 \(\Delta\mathbf{x}\)：

$$\Psi_t(\mathbf{x}, t) = \begin{cases} \Delta\mathbf{x}, & \text{if } t \neq 0 \\ \mathbf{0}, & \text{if } t = 0 \end{cases}$$

这里选择 \(t=0\) 作为规范时刻，意味着 \(t=0\) 时形变为零，网络无需学习恒等映射。形变网络的输出不施加非线性激活，允许任意方向和大小的位移。

> 💡 **关键**：形变网络将每个时刻的 3D 点映射回规范空间，而非反向映射。这使得体渲染时可以直接在规范空间查询密度和颜色。

**2. 规范网络 \(\Psi_x\)：共享场景表示**

规范网络与标准 NeRF 结构相同，接收规范空间坐标 \(\mathbf{p}\) 和视角方向 \(\mathbf{d}\) 的位置编码，输出 RGB 颜色 \(\mathbf{c}\) 和体密度 \(\sigma\)：

$$[\mathbf{c}(\mathbf{p}, \mathbf{d}),\; \sigma(\mathbf{p})] = \Psi_x(\mathbf{p}, \mathbf{d})$$

颜色和密度分别通过 sigmoid 激活输出。所有时刻共享同一个规范网络，这是 D-NeRF 能够从稀疏观测中学习的关键——不同时刻的图像虽然形变不同，但都为同一个规范表示提供监督信号。

**3. 体渲染方程**

给定相机光线 \(\mathbf{x}(h) = \mathbf{o} + h\mathbf{d}\)，像素颜色通过修改后的体渲染积分计算：

$$C(p, t) = \int_{h_n}^{h_f} \mathcal{T}(h, t)\, \sigma(\mathbf{p}(h,t))\, \mathbf{c}(\mathbf{p}(h,t), \mathbf{d})\, dh$$

其中 \(\mathbf{p}(h,t) = \mathbf{x}(h) + \Psi_t(\mathbf{x}(h), t)\) 是经形变网络映射后的规范空间坐标，\(\mathcal{T}(h,t) = \exp\left(-\int_{h_n}^{h} \sigma(\mathbf{p}(s,t))\, ds\right)\) 是累积透射率。

> ⚠️ **注意**：密度 \(\sigma\) 和颜色 \(\mathbf{c}\) 均在**规范空间**中计算，而非观测空间。这意味着形变网络必须学习准确的点对应关系。

**4. 训练损失与优化**

训练损失为渲染像素与真实像素之间的均方误差：

$$\mathcal{L} = \frac{1}{N_s} \sum_{i=1}^{N_s} \left\| \hat{C}(p,t) - C'(p,t) \right\|_2^2$$

两个网络同时端到端优化，使用 Adam 优化器（学习率 \(5 \times 10^{-4}\)，指数衰减至 \(5 \times 10^{-5}\)）。

**5. 课程学习策略**

为提升收敛性，训练图像按时间戳排序，逐步引入更大形变的图像。这使得网络先学习小形变，再逐步扩展到大形变，避免了形变网络在训练初期因大位移而产生的不稳定。

##### 与传统方法的区别

| 特性 | NeRF | T-NeRF（直接 6D 输入） | D-NeRF |
|------|------|----------------------|--------|
| 输入维度 | 5D \((x,y,z,\theta,\phi)\) | 6D \((x,y,z,\theta,\phi,t)\) | 6D（分解为形变+规范） |
| 动态场景 | ❌ | ✅ 但无显式形变建模 | ✅ 显式形变场 |
| 规范空间 | — | 无 | 有（共享几何表示） |
| 形变可视化 | — | 不可解释 | 可提取位移场 |

T-NeRF 是将时间直接作为额外输入维度的朴素扩展，但缺乏规范空间的归纳偏置，导致网络需要为每个时刻独立学习几何和外观，数据效率低。D-NeRF 通过规范空间分解，使所有时刻共享几何先验，显著提升了稀疏观测下的重建质量。

实验结果表明，D-NeRF 在 8 个动态场景上的 PSNR 普遍优于 NeRF（提升 5-15 dB）和 T-NeRF（提升 1-3 dB），尤其在大形变场景（如 Hell Warrior、Hook）中优势更为明显。

#### 🧪 练习题
```yaml
question: "D-NeRF 中形变网络 Ψ_t 在 t=0 时的输出是什么？"
options:
  - "与其他时刻相同的位移向量 Δx"
  - "零向量（强制为规范空间）"
  - "单位矩阵表示的刚体变换"
  - "由网络自由学习的任意值"
answer: 1
explain: "D-NeRF 将 t=0 设为规范时刻，强制 Ψ_t(x, 0) = 0，使得规范空间即为 t=0 时的场景状态，网络无需学习恒等映射。"
```

### Plenoxels

```yaml
id: plenoxels
num: 10
name: Plenoxels
full_name: 稀疏体素辐射场 (Plenoxels)
year: '2022'
org: UC Berkeley
parent: nerf
paper_url: https://arxiv.org/abs/2112.05131
project_url: ''
category: nerf
motivation: 稀疏体素+球谐函数，无需神经网络实现快速优化
```

#### 📝 一句话总结
Plenoxels 用可直接优化的稀疏体素网格存储密度和球谐颜色系数，去掉 NeRF 的 MLP 后仍用可微体渲染监督训练，从而将辐射场重建从“训练神经网络”转化为“优化显式体素参数”。

#### 🎯 核心要点
- 无神经网络辐射场：每个稀疏体素直接保存 density 与 spherical harmonics 系数
- 三线性插值：沿射线采样时从相邻体素插值得到连续空间中的密度和颜色系数
- 球谐视角相关颜色：用 SH 基函数表达随观察方向变化的外观，而不是通过 MLP 输入 view direction
- 可微体渲染优化：使用与 NeRF 类似的 alpha compositing 和图像重建 MSE 进行端到端优化
- 正则化与剪枝：使用 total variation 正则、稀疏化、coarse-to-fine 分辨率提升和空体素剪枝
- 速度优势：在标准新视角合成任务中以接近 NeRF 的质量实现约两个数量级更快的优化

#### 🔬 深入细节
![Plenoxels 稀疏体素辐射场流程](https://ar5iv.labs.arxiv.org/html/2112.05131/assets/x2.png)
*图：Plenoxels 总览。稀疏体素网格存储密度和球谐系数，射线采样时插值查询，再用可微体渲染和 TV 正则直接优化体素参数。*

```python
# Plenoxels 核心优化伪代码
grid = SparseVoxelGrid(resolution=initial_res)
grid.init_density_and_sh()

for stage in coarse_to_fine_schedule:
    grid.upsample_if_needed(stage.resolution)
    grid.prune_empty_voxels(threshold=stage.prune_threshold)

    for rays, target_rgb in dataloader:
        rgb_pred = []
        for ray in rays:
            samples = march_ray(ray, grid.bounds)
            colors, sigmas, deltas = [], [], []
            for x, d, delta in samples:
                sigma, sh_coeff = grid.trilinear_lookup(x)
                color = eval_spherical_harmonics(sh_coeff, d)
                colors.append(color); sigmas.append(sigma); deltas.append(delta)
            rgb_pred.append(volume_render(colors, sigmas, deltas))

        loss = mse(rgb_pred, target_rgb) + lambda_tv * total_variation(grid)
        loss.backward()
        optimizer.step(grid.parameters())
```

**动机与背景**

NeRF 证明了从多视角图像优化连续辐射场可以得到高质量新视角合成，但它把场景表示压进 MLP：每个采样点都要前向网络，训练和渲染都慢。Plenoxels 的问题意识很直接：如果目标只是表示一个已知场景，是否真的需要神经网络作为隐式函数？答案是否定的。用显式稀疏网格存参数，同样可以通过可微体渲染从图像监督中优化出来。

Plenoxel 是 plenoptic volume element 的缩写。每个体素不只是 occupancy，而是一个小的辐射场单元，包含密度 \(\sigma\) 和颜色的球谐系数 \(\mathbf{k}\)。对任意位置 \(x\)，通过三线性插值得到局部参数；对任意方向 \(d\)，通过球谐基函数恢复颜色：

$$
c(x,d)=\sum_{\ell=0}^{L}\sum_{m=-\ell}^{\ell} k_{\ell m}(x)Y_{\ell m}(d)
$$

**体渲染公式**

Plenoxels 保留 NeRF 的体渲染合成。沿射线 \(r(t)=o+td\) 采样后，离散颜色为：

$$
\hat{C}(r)=\sum_i T_i\left(1-\exp(-\sigma_i\Delta_i)\right)c_i
$$

$$
T_i=\exp\left(-\sum_{j<i}\sigma_j\Delta_j\right)
$$

这里 \(\sigma_i\) 与 \(c_i\) 来自体素插值和球谐求值，而不是 MLP。由于所有步骤可微，图像重建误差可以直接反传到体素密度和 SH 系数。

**正则化为什么重要**

显式网格的自由度很高，如果只用训练图像 MSE，容易在空域、遮挡边界和少视角区域产生噪声。Plenoxels 使用 total variation 正则鼓励相邻体素参数平滑：

$$
\mathcal{L}_{TV}=\sum_{v}\sum_{u\in\mathcal{N}(v)}\|\theta_v-\theta_u\|_1
$$

其中 \(\theta_v\) 表示体素的密度或颜色系数。TV 正则相当于把逆问题中的先验显式写出来：真实场景局部通常连续，孤立噪声体素应被抑制。

> 💡 关键：Plenoxels 的贡献不只是“用体素代替 MLP”，而是证明高质量辐射场可以由显式参数、可微渲染、正则化和优化器这四个经典逆问题组件组合出来。

**粗到细优化与剪枝**

为了在单 GPU 上处理高分辨率体素，Plenoxels 采用 coarse-to-fine 训练。先在低分辨率网格上学到粗几何和颜色，再逐步上采样到高分辨率。优化过程中会剪掉密度低或贡献小的体素，避免在空空间浪费显存和计算。这样既保持显式表示的速度，又控制了体素网格的内存膨胀。

**与 NeRF 的区别**

NeRF 的优势是连续函数表达紧凑、泛化性强；Plenoxels 的优势是场景特定优化速度快、参数查询简单、可解释性更强。NeRF 通过网络权重隐式存储几何和外观，Plenoxels 则把它们显式放在空间网格中。对于离线重建一个固定场景，显式网格可以更直接地利用 GPU 并显著缩短优化时间。

#### 🧪 练习题
```yaml
question: "Plenoxels 为什么不需要 MLP 也能表示视角相关颜色？"
options:
  - "它完全忽略观察方向"
  - "它在每个体素中存储球谐系数，并用观察方向的球谐基函数求颜色"
  - "它只渲染灰度图像"
  - "它把所有相机姿态固定为同一个方向"
answer: 1
explain: "Plenoxels 在体素中保存 SH 系数，颜色由系数与方向相关的球谐基函数组合得到，因此无需通过 MLP 输入 view direction。"
```

### Instant-NGP

```yaml
id: instant_ngp
num: 11
name: Instant-NGP
full_name: 即时神经图形基元 (Instant-NGP)
year: '2022'
org: NVIDIA
parent: nerf
paper_url: https://arxiv.org/abs/2201.05989
project_url: ''
category: nerf
motivation: 多分辨率哈希编码将训练时间从数天缩短至数秒
```

#### 📝 一句话总结
Instant-NGP 提出多分辨率哈希编码，用可训练哈希表特征替代传统 Fourier 位置编码，并结合小型全融合 CUDA MLP 与 occupancy grid 跳空采样，将 NeRF 等神经图形基元的训练从小时/天级压缩到秒级。

#### 🎯 核心要点
- 多分辨率哈希编码：在 \(L\) 个空间分辨率上查询可训练特征表，拼接后送入小 MLP
- 哈希表压缩存储：每层最多保存 \(T\) 个特征向量，利用哈希碰撞换取固定显存上限
- 线性插值保持连续性：对输入坐标周围体素顶点的哈希特征做多线性插值
- 碰撞由优化自动消解：不同空间点共享哈希槽时，重要区域会通过梯度主导该槽的特征
- 全融合 MLP：使用 tiny-cuda-nn 风格的 fully-fused CUDA kernel，降低内存访问和 kernel launch 开销
- occupancy grid 加速 NeRF：维护多尺度占用网格，跳过空空间和已不透明区域后的无效采样
- 通用神经图形基元：同一编码用于 gigapixel image、SDF、Neural Radiance Caching 和 NeRF

#### 🔬 深入细节
![Instant-NGP 多分辨率哈希编码](https://docs.nerf.studio/_images/hash_figure.png)
*图：多分辨率哈希编码流程。对输入坐标在多个分辨率网格中定位顶点，哈希查表、插值、拼接，再送入小 MLP 预测密度与颜色。*

```python
# Instant-NGP hash encoding 伪代码
def hash_encode(x, levels, table_size, feature_dim):
    encoded = []
    for l in range(levels):
        N_l = resolution_at_level(l)
        x_l = x * N_l
        corners = voxel_corners(floor(x_l))
        weights = x_l - floor(x_l)

        feats = []
        for corner in corners:
            idx = spatial_hash(corner) % table_size
            feats.append(theta[l][idx])  # trainable F-dim vector

        encoded.append(multilinear_interpolate(feats, weights))
    return concat(encoded)

def nerf_query(x, direction):
    y = concat(hash_encode(x, L, T, F), sh_encode(direction))
    sigma, rgb = tiny_fused_mlp(y)
    return sigma, rgb

def train_step(rays):
    # occupancy grid 跳过空空间
    samples = ray_march_with_occupancy_grid(rays)
    colors = volume_render([nerf_query(x, d) for x, d in samples])
    loss = mse(colors, target_pixels)
    loss.backward()  # 梯度回传到 MLP 和哈希表特征
```

**动机与背景**

原始 NeRF 的瓶颈有两个：一是 Fourier 位置编码后需要较大的 MLP 才能表示高频细节，二是每条射线会在大量空空间里采样并多次调用网络。Instant-NGP 的思路是把“记忆场景细节”的负担从 MLP 转移到可训练空间数据结构中，让 MLP 变小、查询变快、训练更并行。

多分辨率哈希编码把输入坐标 \(x\) 映射到多个网格层级。第 \(l\) 层分辨率通常按指数增长：

$$
N_l=\left\lfloor N_{\min}\,b^l\right\rfloor,\qquad
b=\exp\left(\frac{\log N_{\max}-\log N_{\min}}{L-1}\right)
$$

低分辨率层学习大尺度结构，高分辨率层学习细节。与 dense grid 不同，每层只分配固定大小的哈希表，因此内存是 \(O(LTF)\)，不会随最高分辨率三次方爆炸。

**哈希函数与碰撞**

论文使用空间哈希：

$$
h(\mathbf{x})=\left(\bigoplus_{i=1}^{d}x_i\pi_i\right)\bmod T
$$

其中 \(\oplus\) 是按位 XOR，\(\pi_i\) 是不同的大素数。一个体素顶点的整数坐标被映射到哈希表索引，再查出可训练特征向量。由于 \(T\) 有限，碰撞不可避免；Instant-NGP 不显式解决碰撞，而是让优化过程自动分配容量。多分辨率结构也会缓解碰撞：同一对点即使在某一层冲突，在其他层通常不会完全冲突。

> 💡 关键：哈希编码的表达力主要来自“可训练特征表 + 多分辨率插值”，小 MLP 更像局部特征解码器，而不是独自承担整场景记忆。

**NeRF 中的渲染加速**

在 NeRF 任务中，Instant-NGP 还维护 occupancy grid。训练过程中根据当前密度估计更新占用状态，ray marching 时跳过空体素；当射线累积不透明度已经足够高时，也可以停止后续采样。这直接减少 MLP 查询次数。哈希编码降低单次查询成本，occupancy grid 降低查询数量，两者相乘形成数量级加速。

**训练/推理流程**

每个采样点先被 hash encoding 编码为空间特征；观察方向通常用球谐编码；二者拼接后输入小型 MLP 输出 \(\sigma\) 和 RGB。体渲染仍使用 NeRF 的 alpha compositing：

$$
C(r)=\sum_i T_i(1-\exp(-\sigma_i\Delta_i))c_i
$$

训练目标仍是渲染颜色和真实像素之间的 MSE。也就是说，Instant-NGP 没有改变 NeRF 的成像模型，而是彻底优化了场景参数化和 GPU 执行路径。

**与 NeRF/Plenoxels 的区别**

NeRF 是纯隐式 MLP，紧凑但慢；Plenoxels 是显式稀疏体素，快但更依赖网格容量；Instant-NGP 位于二者之间。它用哈希网格显式存储可训练特征，用小 MLP 解码连续函数，因此兼顾高频表示能力、固定内存和快速优化。

#### 🧪 练习题
```yaml
question: "Instant-NGP 的多分辨率哈希编码为什么能显著减少训练时间？"
options:
  - "它删除了体渲染公式"
  - "它用可训练哈希特征表承担大部分空间记忆，使 MLP 更小且查询更快"
  - "它要求所有场景必须是单色"
  - "它只在 CPU 上执行插值"
answer: 1
explain: "哈希表特征提供高容量空间编码，小 MLP 只需解码特征；再结合 occupancy grid 和 CUDA 融合实现，训练和渲染都大幅加速。"
```

### Mip-NeRF 360

```yaml
id: mip_nerf_360
num: 12
name: Mip-NeRF 360
full_name: 无界场景NeRF (Mip-NeRF 360)
year: '2022'
org: Google
parent: mip_nerf
paper_url: https://arxiv.org/abs/2111.12077
project_url: ''
category: nerf
motivation: 场景收缩技术处理无界大规模场景
```

#### 📝 一句话总结
Mip-NeRF 360 提出场景收缩（scene contraction）、基于 proposal MLP 的在线蒸馏采样策略和区间距离正则化器，将 mip-NeRF 从有界前向场景扩展到无界 360° 真实世界场景，相比 mip-NeRF 实现 57% 的均方误差降低。

#### 🎯 核心要点
- **场景收缩函数 contract(x)**：将无界三维空间连续映射到半径为 2 的球内，近处保持线性、远处非线性压缩
- **Proposal-based 在线蒸馏**：使用轻量 proposal MLP（4 层 256 units）预测密度权重，通过 2 轮重采样指导大型 NeRF MLP（8 层 1024 units）的采样分配
- **Distortion 正则化器 \(\mathcal{L}_{\text{dist}}\)**：惩罚射线区间权重的分散分布，消除 floater 伪影和背景坍塌
- **视差采样（disparity sampling）**：在归一化射线距离 \([0,1]\) 上线性采样，等价于在欧氏距离上按视差采样，使近处分辨率更高
- **新数据集**：9 个无界 360° 场景（5 室外 + 4 室内），用于评估无界场景重建
- **性能**：PSNR 27.69 / SSIM 0.792，训练时间 6.89 小时（TPU v2×32），显著优于 NeRF++、SVS 等方法

#### 🔬 深入细节
![Mip-NeRF 360 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.12077/assets/figures/bmipnerf_sketch.png)
*图：Mip-NeRF 360 整体框架。左侧为 proposal MLP 进行多轮采样细化，右侧为 NeRF MLP 基于最终采样点渲染颜色和密度。*

##### 算法伪代码

```python
# Mip-NeRF 360 训练流程伪代码
def train_step(ray, image_pixel):
    # 1. 初始采样：在归一化射线距离 [0,1] 上均匀采样
    t = linspace(0, 1, N=64)  # 视差空间均匀采样
    
    # 2. Proposal 采样（2轮）
    for k in range(2):
        # 对采样区间应用场景收缩 contract(x)
        gaussians = compute_contracted_gaussians(ray, t)
        # Proposal MLP 预测密度权重
        w_hat = proposal_mlp(gaussians)  # 4层, 256 units
        # 基于权重重采样（逆CDF）
        t = resample(t, w_hat, N=64)
    
    # 3. NeRF MLP 渲染
    gaussians = compute_contracted_gaussians(ray, t)
    rgb, density = nerf_mlp(gaussians)  # 8层, 1024 units
    w = compute_weights(density, t)
    color = sum(w * rgb)
    
    # 4. 计算损失
    L_recon = ||color - image_pixel||^2
    L_prop = sum(HistogramLoss(w.detach(), w_hat_k) for k in rounds)
    L_dist = distortion_loss(w, t)
    loss = L_recon + 0.01 * L_prop + 0.01 * L_dist
    return loss
```

##### 动机与背景

原始 NeRF 和 mip-NeRF 假设场景被包含在一个有界体积内，相机朝向同一方向（前向场景）。当面对真实世界的 360° 场景时，场景在所有方向上都可能无限延伸，这带来三个核心挑战：

1. **参数化问题**：无界场景无法直接用有限坐标表示，位置编码的频率无法覆盖无限范围
2. **采样效率问题**：mip-NeRF 的分层采样（coarse-to-fine）在无界场景中效率极低，因为大量采样点浪费在空白区域
3. **几何歧义问题**：缺乏约束时，模型倾向于在相机附近产生半透明 "floater" 伪影，或将远处内容坍塌到单一平面

##### 核心机制一：场景收缩（Scene Contraction）

为解决无界空间的参数化问题，论文提出收缩函数 \(\text{contract}(\mathbf{x})\)：

$$
\text{contract}(\mathbf{x}) = \begin{cases} \mathbf{x} & \|\mathbf{x}\| \leq 1 \\ \left(2 - \frac{1}{\|\mathbf{x}\|}\right) \frac{\mathbf{x}}{\|\mathbf{x}\|} & \|\mathbf{x}\| > 1 \end{cases}
$$

> 💡 关键：该函数将单位球内的点保持不变（保留近处细节），将球外无限远的点压缩到半径 \([1, 2)\) 的壳层中。函数连续且在边界处一阶导数连续，避免了 NeRF++ 中内外两个 MLP 边界处的不连续问题。

收缩后，mip-NeRF 的集成位置编码（IPE）可以直接应用于收缩空间中的高斯分布。论文通过一阶泰勒展开将收缩前的高斯近似映射为收缩后的高斯：

$$
\boldsymbol{\mu}_{\text{contract}} = \text{contract}(\boldsymbol{\mu}), \quad \boldsymbol{\Sigma}_{\text{contract}} = \mathbf{J}_f \boldsymbol{\Sigma} \mathbf{J}_f^T
$$

其中 \(\mathbf{J}_f\) 是收缩函数在 \(\boldsymbol{\mu}\) 处的雅可比矩阵。

##### 核心机制二：Proposal-based 在线蒸馏

传统 mip-NeRF 使用 "coarse" 和 "fine" 两个同等大小的 MLP，coarse MLP 在所有尺度上都计算完整的颜色输出，效率低下。Mip-NeRF 360 将此替换为一个高效的蒸馏框架：

**Proposal MLP**（轻量级，4 层 256 units）：
- 仅输出体积密度（无颜色），计算成本极低
- 经过 2 轮迭代采样，每轮 64 个样本
- 其权重分布通过 \(\mathcal{L}_{\text{prop}}\) 被约束为 NeRF MLP 权重的上界

**NeRF MLP**（高容量，8 层 1024 units）：
- 仅在最终采样点上评估，输出完整的颜色和密度
- 使用 128 个最终采样点

Proposal 损失使用直方图上界约束：

$$
\mathcal{L}_{\text{prop}} = \frac{1}{|\hat{\mathbf{t}}|} \sum_j \max\left(0,\; \hat{w}_j - \text{bound}(\mathbf{w}, \mathbf{t}, \hat{T}_j)\right)^2
$$

其中 \(\text{bound}(\mathbf{w}, \mathbf{t}, \hat{T}_j)\) 计算 NeRF MLP 权重在 proposal 区间 \(\hat{T}_j\) 上的上界。

> ⚠️ 注意：NeRF MLP 的权重在计算 \(\mathcal{L}_{\text{prop}}\) 时被 stop-gradient，确保梯度仅流向 proposal MLP，避免 NeRF MLP 为了降低 proposal loss 而退化。

##### 核心机制三：Distortion 正则化

为消除 floater 伪影和背景坍塌，论文设计了一个基于射线区间的正则化器：

$$
\mathcal{L}_{\text{dist}}(\mathbf{s}, \mathbf{w}) = \sum_{i,j} w_i w_j \left| \frac{s_i + s_{i+1}}{2} - \frac{s_j + s_{j+1}}{2} \right| + \frac{1}{3}\sum_i w_i^2 (s_{i+1} - s_i)
$$

其中 \(\mathbf{s}\) 是归一化射线距离，\(\mathbf{w}\) 是渲染权重。

> 💡 关键：第一项惩罚权重分散在多个不同位置（消除 floater），第二项惩罚单个区间内的权重过大（鼓励紧凑分布）。该正则化器等价于最小化权重分布与 delta 函数之间的加权距离，直觉上鼓励每条射线的密度集中在单一表面上。

![Distortion 正则化效果](https://ar5iv.labs.arxiv.org/html/2111.12077/assets/figures/distortion/360_bicycle_002_dist.png)
*图：使用 distortion 正则化后的深度图更加干净，floater 伪影被有效消除。*

##### 与传统方法的区别

| 特性 | mip-NeRF | NeRF++ | Mip-NeRF 360 |
|------|----------|--------|--------------|
| 场景范围 | 有界 | 无界（双MLP） | 无界（单MLP + 收缩） |
| 采样策略 | Coarse-to-fine（同等MLP） | 分层采样 | Proposal蒸馏（轻→重） |
| 正则化 | 无 | 无 | Distortion loss |
| 边界连续性 | N/A | 内外MLP边界不连续 | 收缩函数保证连续 |
| 训练时间 | 3.17h | 9.45h | 6.89h |
| PSNR（360数据集） | 24.04 | 25.11 | **27.69** |

消融实验（bicycle 场景）证实了各组件的必要性：
- 移除 \(\mathcal{L}_{\text{prop}}\) 显著降低性能（proposal MLP 无监督）
- 移除 \(\mathcal{L}_{\text{dist}}\) 不影响指标但产生 floater 伪影
- 使用单一大 MLP 替代 proposal + NeRF 双 MLP 不降低精度但训练慢 3×
- 移除场景收缩降低精度和速度

#### 🧪 练习题
```yaml
question: "Mip-NeRF 360 中场景收缩函数 contract(x) 对单位球内的点如何处理？"
options:
  - "按距离成比例压缩到更小的球内"
  - "保持不变，即 contract(x) = x"
  - "映射到球面上的对应方向"
  - "通过对数变换进行非线性压缩"
answer: 1
explain: "contract(x) 对 ||x|| ≤ 1 的点保持恒等映射，仅对球外的点进行非线性压缩到 [1,2) 壳层，从而保留近处场景的细节精度。"
```

### TensoRF

```yaml
id: tensorf
num: 13
name: TensoRF
full_name: 张量分解辐射场 (TensoRF)
year: '2022'
org: UCSD
parent: nerf
paper_url: https://arxiv.org/abs/2203.09517
project_url: ''
category: nerf
motivation: 张量分解建模4D场景，平衡质量与效率
```

#### 📝 一句话总结
TensoRF 将辐射场建模为 4D 张量（3D 空间 × 外观通道），提出经典 CP 分解和新颖的向量-矩阵（VM）分解两种因子化方案，以 \(O(N)\) 至 \(O(N^2)\) 的存储复杂度替代 \(O(N^3)\) 的密集体素网格，在渲染质量、训练速度和模型大小三方面全面超越 NeRF 及同期体素方法。

#### 🎯 核心要点
- **张量建模视角**：将辐射场视为 3D 体素网格上的张量，将场景重建转化为张量分解（因子化）问题
- **CP 分解**：将 3D 张量分解为向量外积之和 \(\mathcal{T} = \sum_r \mathbf{v}_r^1 \circ \mathbf{v}_r^2 \circ \mathbf{v}_r^3\)，存储复杂度 \(O(3RN)\)，模型极小（< 4MB）
- **VM 分解（核心创新）**：将 3D 张量分解为向量-矩阵外积之和，沿三个坐标平面展开 \(\mathcal{T} = \sum_r \mathbf{v}_r^X \circ \mathbf{M}_r^{YZ} + \mathbf{v}_r^Y \circ \mathbf{M}_r^{XZ} + \mathbf{v}_r^Z \circ \mathbf{M}_r^{XY}\)，存储复杂度 \(O(3RN^2)\)，质量-效率最优
- **几何-外观分离**：密度场 \(\mathcal{G}_\sigma\) 用 3D 张量建模，外观场 \(\mathcal{G}_c\) 用 4D 张量建模（额外维度为外观特征通道），外观通过特征向量字典 \(\mathbf{B}\) 和轻量解码器 \(S\)（MLP 或球谐函数）渲染
- **由粗到细训练**：从低分辨率（128³）开始，逐步上采样因子分量至目标分辨率（300³–640³），加速收敛并避免局部最优
- **L1 + TV 正则化**：L1 稀疏正则鼓励紧凑表示，全变分（TV）正则平滑因子分量
- **高效实现**：纯 PyTorch 实现，无需自定义 CUDA 核，单 V100 GPU 训练 10–30 分钟

#### 🔬 深入细节
##### 核心框架图

![TensoRF VM 分解示意图](https://github.com/apchenstu/TensoRF/raw/main/imgs/pipeline.png)
*图：TensoRF 将辐射场张量分解为向量和矩阵因子的组合。左侧为 CP 分解（纯向量外积），右侧为 VM 分解（向量-矩阵外积），VM 分解在三个坐标平面上分别展开，兼顾表达能力与紧凑性。*

##### 算法伪代码

```python
# TensoRF 训练伪代码（VM 分解版本）
# 初始化：低分辨率 N₀ = 128 的向量和矩阵因子
v_X, v_Y, v_Z = init_vectors(R, N0)       # 1D 向量因子
M_YZ, M_XZ, M_XY = init_matrices(R, N0)   # 2D 矩阵因子
b = init_appearance_basis(R_c)              # 外观字典向量
S = MLP(27+3, 128, 3)                      # 外观解码器（或 SH）

for step in range(30000):
    rays = sample_rays(batch=4096)
    
    for each sample point x = (x, y, z) along ray:
        # --- 密度计算 (Eq.7) ---
        # 对每个分量 r，用线性插值采样向量值，双线性插值采样矩阵值
        sigma = sum(v_X_r(x) * M_YZ_r(y,z) + 
                    v_Y_r(y) * M_XZ_r(x,z) + 
                    v_Z_r(z) * M_XY_r(x,y)  for r in range(R_sigma))
        sigma = relu(sigma)
        
        # --- 外观计算 (Eq.8) ---
        features = concat([v_X_r(x) * M_YZ_r(y,z),
                          v_Y_r(y) * M_XZ_r(x,z),
                          v_Z_r(z) * M_XY_r(x,y)] for r in range(R_c))
        appearance = features @ B  # 乘以外观字典矩阵
        color = S(appearance, view_dir)  # MLP 解码，输入含视角方向
    
    # --- 体渲染 ---
    C = volume_rendering(sigma, color)  # 标准 alpha 合成
    
    # --- 损失与优化 ---
    loss = MSE(C, C_gt) + λ₁ * L1(factors) + λ_TV * TV(factors)
    optimizer.step(loss)  # Adam, lr=0.02 (factors), lr=0.001 (MLP)
    
    # --- 由粗到细上采样 ---
    if step in [2000, 3000, 4000, 5500, 7000]:
        upsample_factors(v_X, v_Y, v_Z, M_YZ, M_XZ, M_XY)
```

##### 动机与背景

NeRF 开创性地用 MLP 隐式表示辐射场，但训练需数小时、渲染需数秒，核心瓶颈在于 MLP 的逐点查询效率极低。后续工作如 Plenoxels、DVGO 采用显式体素网格加速，但密集体素的 \(O(N^3)\) 存储开销巨大（数百 MB 至 GB 级），严重限制了分辨率上限和实际部署。

> 💡 **关键洞察**：自然场景的辐射场具有高度的结构化冗余——大部分空间是空的或平滑的。张量分解恰好是利用这种低秩结构的数学工具。

TensoRF 的核心思路是：**不直接存储密集体素，而是将其分解为少量低维因子的组合**，从而在保持甚至提升表达能力的同时，将存储从 \(O(N^3)\) 降至 \(O(N)\)（CP）或 \(O(N^2)\)（VM）。

##### CP 分解：极致紧凑

经典的 CP（CANDECOMP/PARAFAC）分解将一个 3D 张量表示为 \(R\) 个秩一分量之和：

$$\mathcal{T} = \sum_{r=1}^{R} \mathbf{v}_r^1 \circ \mathbf{v}_r^2 \circ \mathbf{v}_r^3$$

其中 \(\mathbf{v}_r^i \in \mathbb{R}^{N}\) 是沿第 \(i\) 个轴的向量，\(\circ\) 表示外积。任意位置 \((x,y,z)\) 的值通过三线性插值从三个向量中采样后相乘得到：

$$\mathcal{T}(x,y,z) = \sum_{r=1}^{R} v_r^1(x) \cdot v_r^2(y) \cdot v_r^3(z)$$

**存储复杂度**：\(3RN\)，即 \(O(N)\)。当 \(R=384, N=300\) 时，仅需约 **3.9 MB**。

> ⚠️ **局限**：CP 分解的每个分量是严格的秩一张量（三个方向完全可分离），表达能力有限。要达到高质量需要大量分量（\(R \geq 384\)），且优化过程中容易出现数值不稳定。

##### VM 分解：质量-效率最优解（核心贡献）

TensoRF 提出的 **向量-矩阵（Vector-Matrix, VM）分解** 是本文最重要的创新。它将 3D 张量分解为向量与矩阵的外积之和，沿三个坐标平面分别展开：

$$\mathcal{T} = \sum_{r=1}^{R_1} \mathbf{v}_r^X \circ \mathbf{M}_r^{Y,Z} + \sum_{r=1}^{R_2} \mathbf{v}_r^Y \circ \mathbf{M}_r^{X,Z} + \sum_{r=1}^{R_3} \mathbf{v}_r^Z \circ \mathbf{M}_r^{X,Y}$$

其中 \(\mathbf{v}_r^X \in \mathbb{R}^{N}\) 是沿 X 轴的向量，\(\mathbf{M}_r^{Y,Z} \in \mathbb{R}^{N \times N}\) 是 YZ 平面上的矩阵。任意位置的值为：

$$\mathcal{T}(x,y,z) = \sum_r v_r^X(x) \cdot M_r^{YZ}(y,z) + \sum_r v_r^Y(y) \cdot M_r^{XZ}(x,z) + \sum_r v_r^Z(z) \cdot M_r^{XY}(x,y)$$

**存储复杂度**：\(3R(N + N^2) \approx 3RN^2\)，即 \(O(N^2)\)。

> 💡 **为什么 VM 优于 CP？** VM 分解中每个分量包含一个 2D 矩阵，能够直接编码一个平面上的复杂纹理和几何细节，而 CP 的秩一分量只能表示沿三轴可分离的模式。因此 VM 用少量分量（\(R=48\) 或 \(R=192\)）即可达到甚至超越 CP 需要 \(R=384\) 才能达到的质量。

> 💡 **与 EG3D Tri-plane 的关系**：EG3D 的三平面表示可以看作 VM 分解的特例——当所有向量因子退化为常数 1 时，VM 分解退化为三个平面特征图的叠加，即 tri-plane。TensoRF 的向量因子为每个平面提供了沿法线方向的调制能力，表达力更强。

> 💡 **数学背景**：VM 分解是 Block Term Decomposition (BTD) 的一个特例，其中每个 block 的秩被限制为 \((L_1, L_2, 1)\) 或其排列形式。

##### 4D 辐射场的因子化

辐射场包含密度 \(\sigma\) 和颜色 \(\mathbf{c}\)，TensoRF 将它们分别建模：

**密度场** \(\mathcal{G}_\sigma\)：纯 3D 张量，直接用 VM（或 CP）分解，每个采样点的密度为所有分量之和经 ReLU 激活：

$$\sigma(\mathbf{x}) = \text{ReLU}\left(\sum_{r} v_r^X(x) \cdot M_r^{YZ}(y,z) + \cdots \right)$$

**外观场** \(\mathcal{G}_c\)：4D 张量（3D 空间 × \(P\) 维外观特征通道）。第四维通过额外的外观字典向量 \(\mathbf{b}_r \in \mathbb{R}^P\) 编码：

$$\mathcal{G}_c(\mathbf{x}) = \sum_r \left[ v_r^X(x) \cdot M_r^{YZ}(y,z) \right] \cdot \mathbf{b}_r^T + \cdots$$

等价地，将所有 \(\mathbf{b}_r\) 排列为矩阵 \(\mathbf{B} \in \mathbb{R}^{3R_c \times P}\)，外观特征为：

$$\mathbf{f}(\mathbf{x}) = \mathbf{B}^T \cdot \left[\text{concat of all component values at } \mathbf{x}\right]$$

最终颜色由解码函数 \(S\) 得到：\(\mathbf{c} = S(\mathbf{f}, \mathbf{d})\)，其中 \(\mathbf{d}\) 是视角方向。\(S\) 可以是：
- **球谐函数（SH）**：无需额外网络，速度最快
- **小型 MLP**：2 层、128 隐藏单元，质量更高（默认选择）

##### 高效采样与渲染

TensoRF 的一个关键优势是**因子分量的采样可以利用硬件加速的纹理插值**：
- 向量因子 \(\mathbf{v}\)：1D 线性插值
- 矩阵因子 \(\mathbf{M}\)：2D 双线性插值

这些操作在 GPU 上极为高效，且天然支持连续坐标查询（无需离散化到网格顶点）。

体渲染采用标准的 alpha 合成公式：

$$\hat{C}(\mathbf{r}) = \sum_{i=1}^{K} T_i \cdot \alpha_i \cdot \mathbf{c}_i, \quad T_i = \prod_{j=1}^{i-1}(1-\alpha_j), \quad \alpha_i = 1 - e^{-\sigma_i \delta_i}$$

##### 训练策略

**损失函数**：

$$\mathcal{L} = \|\hat{C} - C_{gt}\|_2^2 + \lambda_1 \sum_{m} \|\mathcal{A}_m\|_1 + \lambda_{TV} \sum_{m} \text{TV}(\mathcal{A}_m)$$

其中 \(\mathcal{A}_m\) 是所有因子分量（向量和矩阵），L1 正则鼓励稀疏性，TV 正则鼓励空间平滑。

**由粗到细（Coarse-to-Fine）**：
- 初始分辨率 \(N_0 = 128^3\)
- 在训练步 2000、3000、4000、5500、7000 处对因子分量进行上采样（向量用线性插值，矩阵用双线性插值）
- 最终分辨率根据配置为 \(300^3\)（合成场景）或 \(640^3\)（真实场景）

**优化器**：Adam，因子分量学习率 0.02，MLP 学习率 0.001，batch size 4096 rays。

##### 实验结果

| 方法 | PSNR (dB) ↑ | 训练时间 | 模型大小 |
|------|-------------|---------|---------|
| NeRF | 31.01 | ~35 h | 5 MB |
| Plenoxels | 31.71 | ~11 min | 778 MB |
| DVGO | 31.95 | ~15 min | 612 MB |
| **TensoRF-CP-384** | **31.56** | **~25 min** | **3.9 MB** |
| **TensoRF-VM-48** | **32.39** | **~13.8 min** | **18.9 MB** |
| **TensoRF-VM-192** | **33.14** | **~17 min** | **71.8 MB** |

*表：Synthetic-NeRF 数据集上的对比（单 V100 GPU）*

> 💡 **关键结论**：
> - VM-192 以 33.14 dB 大幅领先所有方法，训练仅需 17 分钟
> - CP-384 以不到 4 MB 的模型大小达到与 NeRF 相当的质量，存储效率提升 **150×**（对比 Plenoxels）
> - VM-48 在仅 18.9 MB 的情况下超越 DVGO（612 MB），存储效率提升 **32×**
> - 在 LLFF 真实前向场景和 Tanks and Temples 360° 场景上同样表现优异

##### 与相关方法的对比

| 特性 | NeRF | Plenoxels/DVGO | TensoRF |
|------|------|----------------|---------|
| 表示方式 | 纯 MLP | 密集体素网格 | 张量因子分解 |
| 存储复杂度 | \(O(1)\)（固定网络） | \(O(N^3)\) | \(O(N)\) 或 \(O(N^2)\) |
| 训练速度 | 数小时 | 数分钟 | 数分钟 |
| 渲染质量 | 基准 | 略优于 NeRF | 显著优于 NeRF |
| 自定义 CUDA | 否 | 是 | **否**（纯 PyTorch） |

#### 🧪 练习题
```yaml
question: "TensoRF 的 VM（向量-矩阵）分解相比 CP 分解的核心优势是什么？"
options:
  - "VM 分解的存储复杂度更低"
  - "VM 分解的每个分量包含 2D 矩阵，能直接编码平面上的复杂模式，表达能力更强"
  - "VM 分解不需要正则化"
  - "VM 分解可以避免体渲染中的 alpha 合成计算"
answer: 1
explain: "VM 分解用向量-矩阵外积替代 CP 的纯向量外积，矩阵因子能直接捕获 2D 平面上的纹理和几何细节，因此用更少的分量即可达到更高质量。VM 的存储复杂度 O(N²) 实际上高于 CP 的 O(N)，但质量-效率的综合权衡更优。"
```

### Zip-NeRF

```yaml
id: zip_nerf
num: 14
name: Zip-NeRF
full_name: 融合抗锯齿与加速NeRF (Zip-NeRF)
year: '2023'
org: Google
parent: mip_nerf_360
paper_url: https://arxiv.org/abs/2304.06706
project_url: ''
category: nerf
motivation: 融合Mip-NeRF抗锯齿与网格加速技术
```

#### 📝 一句话总结
Zip-NeRF 提出了一套将 mip-NeRF 360 的抗锯齿能力与 Instant NGP 的哈希网格加速相结合的技术方案，通过多采样预滤波、特征降权和抗锯齿 interlevel loss 三大核心机制，在质量上超越 mip-NeRF 360（RMSE 降低 11%）的同时实现 24 倍训练加速。

#### 🎯 核心要点
- **问题定义**：mip-NeRF 360 质量好但训练极慢（48h）；Instant NGP 训练快（\~6min）但存在严重锯齿伪影，两者无法简单组合
- **多采样抗锯齿（Multisampling）**：用 6 个六边形排列的子采样点将各向异性锥体截锥近似为多个各向同性 3D 高斯，使其兼容 iNGP 的哈希网格查询
- **特征降权机制（Downweighting）**：通过 erf 函数构造权重因子 \(\omega\)，抑制超出采样分辨率的高频特征，防止"超分辨率"伪影
- **抗锯齿 Interlevel Loss**：将阶梯函数模糊为分段线性函数后再计算 proposal 监督损失，消除沿光线方向的 z-aliasing
- **幂变换距离归一化**：提出 \(\mathcal{P}(x, \lambda)\) 平滑插值线性/对数/逆距离变换，替代 mip-NeRF 360 的分段归一化
- **归一化权重衰减**：对哈希网格各层级施加 \(\sum_\ell \mathrm{mean}(V_\ell^2)\) 形式的正则化，粗尺度惩罚远大于细尺度
- **性能**：360 数据集 PSNR 28.54（vs mip-NeRF 360 的 27.57），训练 0.9h vs 21.7h；多尺度 360 数据集粗尺度误差降低 55%–77%

#### 🔬 深入细节
![Zip-NeRF 多采样抗锯齿示意图](https://ar5iv.labs.arxiv.org/html/2304.06706/assets/x3.png)
*图：Zip-NeRF 的多采样策略——将锥体截锥（conical frustum）分解为 6 个六边形排列的各向同性 3D 高斯，每个高斯可直接查询 iNGP 的哈希网格*

##### 算法伪代码

```python
# Zip-NeRF 单条光线渲染核心流程
def render_ray(ray_origin, ray_dir, pixel_radius):
    # 1. Proposal 采样（两轮，每轮 64 个样本）
    for round in [1, 2]:
        intervals = proposal_network.sample(ray)
    
    # 2. 对每个区间进行多采样
    for interval in final_intervals:  # 32 个最终采样区间
        mu, sigma = compute_gaussian(interval)  # 锥体截锥 → 高斯
        
        # 六边形 6 点多采样
        samples = hexagonal_pattern(mu_xy, pixel_radius)  # 6 个子点
        features = []
        for s in samples:
            mu_s = [s.x, s.y, mu.z]
            sigma_s = diag(sigma_xy/2, sigma_xy/2, sigma_z)  # 各向同性化
            
            # 查询 iNGP 哈希网格
            feat = hash_grid.query(mu_s, sigma_s)
            
            # 特征降权：抑制超分辨率特征
            omega = 0.5 * (1 - erf(sigma_s / sqrt(2)))
            feat = feat * omega
            features.append(feat)
        
        # 平均多采样特征
        avg_feat = mean(features)
        color, density = mlp(avg_feat)
    
    # 3. 体渲染合成像素颜色
    pixel_color = volume_rendering(colors, densities, intervals)
    
    # 4. 抗锯齿 interlevel loss
    blurred_weights = blur_stepfun(nerf_weights, pulse_width=r)
    loss_prop = antialiased_interlevel_loss(blurred_weights, proposal_weights)
    
    return pixel_color, loss_prop
```

##### 动机与背景

神经辐射场（NeRF）的两大主流方向存在根本矛盾：

1. **mip-NeRF 360** 通过对锥体截锥进行积分编码（IPE）实现了优秀的抗锯齿能力，但依赖大型 MLP，训练一个场景需要 48 小时；
2. **Instant NGP (iNGP)** 使用多分辨率哈希网格将训练加速到分钟级，但其点采样（point sampling）方式天然缺乏抗锯齿能力，在多尺度场景中产生严重伪影。

两者无法简单组合的根本原因在于：mip-NeRF 360 的 IPE 编码要求各向异性高斯输入，而 iNGP 的三线性插值只能处理各向同性查询。Zip-NeRF 的核心贡献就是设计了一套桥接方案。

##### 核心机制一：多采样预滤波（Multisampling Prefiltering）

> 💡 关键：将一个各向异性的锥体截锥分解为多个各向同性的 3D 高斯，使其兼容哈希网格的三线性插值。

mip-NeRF 将像素对应的光线建模为锥体，沿光线的每个采样区间是一个锥体截锥（conical frustum），其对应的 3D 高斯具有各向异性的协方差矩阵：

$$\Sigma = \begin{pmatrix} \sigma_{xy}^2 & 0 & 0 \\ 0 & \sigma_{xy}^2 & 0 \\ 0 & 0 & \sigma_z^2 \end{pmatrix}$$

其中 \(\sigma_{xy}\) 由像素宽度和距离决定，\(\sigma_z\) 由区间长度决定，两者通常差异很大。

Zip-NeRF 的解决方案是在垂直于光线的平面上放置 **6 个六边形排列的子采样点**，每个子点对应一个各向同性高斯 \(\mathcal{N}(\mu_j, \frac{\sigma_{xy}}{2} I)\)。这 6 个高斯的混合近似了原始各向异性高斯在 xy 平面上的分布。每个各向同性高斯可以直接通过 iNGP 的三线性插值查询，最终取平均得到该区间的特征。

六边形采样点的坐标为：

$$\mathbf{p}_j = \mu_{xy} + \sigma_{xy} \cdot \begin{pmatrix} \cos(2\pi j/6) \\ \sin(2\pi j/6) \end{pmatrix}, \quad j = 0, 1, \ldots, 5$$

> ⚠️ 注意：这里的 6 点六边形模式不是随意选择的——消融实验表明它优于随机采样和 Unscented Transform 等替代方案，且计算开销可控（6 次哈希查询 vs 单次）。

##### 核心机制二：特征降权（Feature Downweighting）

> 💡 关键：即使多采样解决了 xy 平面的抗锯齿，沿 z 轴仍然可能查询到超出采样分辨率的高频特征。降权机制通过软阈值抑制这些特征。

iNGP 的哈希网格包含从粗到细的多个分辨率层级。当采样高斯的标准差 \(\sigma\) 大于某个层级的体素尺寸时，该层级的特征属于"超分辨率"——它编码了比当前采样区间更精细的细节，使用这些特征会导致锯齿。

Zip-NeRF 为每个层级 \(\ell\) 计算降权因子：

$$\omega(\sigma, \ell) = \frac{1}{2}\left(1 - \mathrm{erf}\left(\frac{\sigma}{\sqrt{2} \cdot v_\ell}\right)\right)$$

其中 \(v_\ell\) 是第 \(\ell\) 层的体素尺寸。当 \(\sigma \gg v_\ell\)（高斯远大于体素）时，\(\omega \to 0\)，该层特征被完全抑制；当 \(\sigma \ll v_\ell\)（高斯远小于体素）时，\(\omega \to 1\)，特征完整保留。这个权重被逐元素乘到特征向量上，并作为额外输入拼接到 MLP 中。

##### 核心机制三：抗锯齿 Interlevel Loss

> 💡 关键：mip-NeRF 360 的 proposal 监督损失在光线方向上存在 z-aliasing——当场景内容在相邻采样区间之间移动时，阶梯函数权重会突变，导致梯度不连续。

传统 interlevel loss 直接比较 NeRF 输出的权重直方图 \((\mathbf{s}, \mathbf{w})\) 和 proposal 网络的权重直方图 \((\hat{\mathbf{s}}, \hat{\mathbf{w}})\)。问题在于：当场景表面恰好位于某个区间边界时，微小的位移会导致权重从一个 bin 跳到相邻 bin，产生不连续的梯度信号。

Zip-NeRF 的解决方案分三步：

1. **模糊阶梯函数**：将 NeRF 权重直方图与宽度为 \(r\) 的矩形脉冲卷积，得到分段线性的连续函数
2. **重采样**：将模糊后的分布重采样到 proposal 网络的区间端点上，得到 \(\mathbf{w}^{\hat{\mathbf{s}}}\)
3. **计算损失**：

$$\mathcal{L}_{\mathrm{prop}} = \sum_i \frac{1}{\hat{w}_i} \max(0, \cancel{\nabla}(w_i^{\hat{\mathbf{s}}}) - \hat{w}_i)^2$$

其中 \(\cancel{\nabla}\) 表示 stop-gradient。这是一个半二次卡方损失，模糊操作确保了损失对光线方向平移的平滑性。

##### 距离归一化与正则化

**幂变换**：Zip-NeRF 提出了新的距离归一化函数：

$$\mathcal{P}(x, \lambda) = \frac{|\lambda - 1|}{\lambda}\left(\left(\frac{x}{|\lambda - 1|} + 1\right)^\lambda - 1\right)$$

取 \(g(x) = \mathcal{P}(2x, -1.5)\)，在原点附近为线性（无需调节近平面），远处介于逆距离和逆平方距离之间。这替代了 mip-NeRF 360 的分段归一化，后者在抗锯齿 loss 下会导致灾难性失败。

**归一化权重衰减**：对哈希网格施加 \(\sum_\ell \mathrm{mean}(V_\ell^2)\)，而非简单的 \(\sum_\ell \sum_i V_{\ell,i}^2\)。由于粗层级参数远少于细层级，取 mean 后粗层级的惩罚强度相对更大，有效防止粗尺度过拟合。消融实验显示此技巧带来约 1 dB PSNR 提升。

##### 与传统方法的区别

| 特性 | mip-NeRF 360 | Instant NGP | Zip-NeRF |
|------|-------------|-------------|----------|
| 场景表示 | 大型 MLP | 多分辨率哈希网格 | 哈希网格 + 小 MLP |
| 抗锯齿 | IPE 编码（各向异性） | 无 | 多采样 + 降权 + 抗锯齿 loss |
| 训练时间 | ~48h | ~6min | ~54min |
| 360 PSNR | 27.57 | 25.68 | **28.54** |
| 多尺度能力 | 良好 | 差 | **最优** |

Zip-NeRF 的核心洞察是：**不需要让哈希网格本身支持各向异性查询，而是通过外部的多采样和降权机制在查询之前完成预滤波**，从而在不修改 iNGP 核心数据结构的前提下实现抗锯齿。

#### 🧪 练习题
```yaml
question: "Zip-NeRF 使用六边形多采样的主要目的是什么？"
options:
  - "增加训练数据量以防止过拟合"
  - "将各向异性锥体截锥分解为多个各向同性高斯，使其兼容哈希网格的三线性插值"
  - "提高哈希网格的分辨率以捕获更多细节"
  - "替代体渲染中的数值积分以加速推理"
answer: 1
explain: "iNGP 的三线性插值只能处理各向同性查询，而 mip-NeRF 的锥体截锥是各向异性的。六边形多采样将一个各向异性高斯近似为 6 个各向同性高斯的混合，从而桥接两种表示。"
```

### Nerfstudio

```yaml
id: nerfstudio
num: 15
name: Nerfstudio
full_name: NeRF模块化框架 (Nerfstudio)
year: '2023'
org: UC Berkeley
parent: nerf
paper_url: https://arxiv.org/abs/2302.04264
project_url: ''
category: nerf
motivation: 模块化开发框架加速NeRF研究与应用落地
```

#### 📝 一句话总结
Nerfstudio 提出了一个端到端的模块化 NeRF 开发框架，通过统一的 API 设计、实时 Web 可视化和即插即用的组件架构，大幅降低了 NeRF 方法的开发和使用门槛；同时提出了融合多篇前沿工作优点的 Nerfacto 方法，在效率与质量间取得了优秀平衡。

#### 🎯 核心要点
- **模块化框架设计**：将 NeRF pipeline 拆解为 DataParser → DataManager → Model → Field 四层抽象，各层可独立替换
- **Nerfacto 方法**：融合 MipNeRF-360（Proposal Network + Scene Contraction）、Instant-NGP（Hash Encoding）、NeRF-W（Appearance Embedding）、Ref-NeRF（Predicted Normals）等多篇工作的优点
- **实时 Web Viewer**：基于 WebSocket + WebRTC 的浏览器端实时渲染可视化，支持远程 GPU 训练监控
- **分段采样策略**：近处均匀采样 + 远处递增步长采样 + 两级 Proposal Network 重要性采样（256→96→48 samples）
- **L∞ 场景收缩**：将无界场景压缩到 [-2,2]³ 立方体，比 MipNeRF-360 的 L² 球形收缩更适配 Hash Grid
- **Nerfstudio Dataset**：10 个真实世界 360° 捕获场景，用于方法开发和评估
- **几何导出**：支持点云、TSDF、纹理网格等多种格式导出

#### 🔬 深入细节
![Nerfstudio 框架总览](https://ar5iv.labs.arxiv.org/html/2302.04264/assets/x1.png)
*图：Nerfstudio 框架总览。展示了从数据输入到模型训练、可视化的完整 pipeline，以及各模块间的交互关系。*

##### 算法框架与核心流程

```python
# Nerfacto 训练伪代码
for iteration in range(num_iterations):
    # 1. DataManager 生成训练数据
    ray_bundle, ground_truth = data_manager.next_train(iteration)
    
    # 2. 相机位姿优化 (SE(3) transformation)
    ray_bundle = pose_optimizer.apply(ray_bundle)
    
    # 3. 分段采样: 近处均匀 + 远处递增步长
    samples = piecewise_sampler(ray_bundle, n=256)
    
    # 4. 两级 Proposal Network 重要性采样
    samples = proposal_network_1(samples)  # 256 → 96
    samples = proposal_network_2(samples)  # 96 → 48
    
    # 5. L∞ 场景收缩
    contracted_samples = scene_contraction_linf(samples)
    
    # 6. Hash Encoding + MLP 查询颜色和密度
    rgb, density = nerfacto_field(contracted_samples, appearance_embed)
    
    # 7. 体渲染
    rendered_image = volume_rendering(rgb, density)
    
    # 8. 损失计算与优化
    loss = photometric_loss(rendered_image, ground_truth)
    loss += proposal_loss + interlevel_loss
    optimizer.step(loss)
```

##### 动机与背景

NeRF 自 2020 年提出以来，已衍生出数百篇后续工作，但各方法的代码库彼此独立、接口不统一，导致：
1. **复现困难**：每篇论文使用不同的数据格式、训练流程和评估协议
2. **组合创新受阻**：无法方便地将不同论文的组件（如采样策略、编码方式）混合使用
3. **应用落地门槛高**：从真实数据采集到最终渲染缺乏端到端工具链

Nerfstudio 的核心设计哲学是**模块化与可组合性**，通过清晰的抽象层次让研究者可以只修改感兴趣的组件，而复用其余部分。

##### 模块化架构设计

Nerfstudio 的 pipeline 由以下核心抽象组成：

**1. DataParser & DataManager**

DataParser 负责将不同来源（COLMAP、Polycam、Record3D 等）的数据统一为标准格式。DataManager 在训练时负责生成 RayBundle（光线束），包含光线的 origin \(\mathbf{o}\)、direction \(\mathbf{d}\) 以及相关元数据。

**2. Model 层**

Model 是最核心的抽象，定义了从 RayBundle 到渲染输出的完整流程。它包含：
- **Sampler**：沿光线生成采样点
- **Field**：神经场查询（输入坐标，输出颜色/密度）
- **Renderer**：体渲染积分
- **Loss**：损失函数计算

**3. Field 层**

Field 将空间坐标映射为场属性。Nerfacto 的 Field 使用 Instant-NGP 的多分辨率 Hash Encoding：

$$\mathbf{f}(\mathbf{x}) = \text{MLP}\left(\bigoplus_{l=1}^{L} \text{HashGrid}_l(\mathbf{x})\right)$$

其中 \(\bigoplus\) 表示各层级特征的拼接，每个 HashGrid 在不同分辨率下对空间进行编码。

##### Nerfacto 方法详解

Nerfacto 是 Nerfstudio 的默认推荐方法，融合了多篇前沿工作的核心技术：

**采样策略（来自 MipNeRF-360）**

采用两级 Proposal Network 进行重要性采样。Proposal Network 是轻量级的密度场（使用小型 fused MLP + Hash Encoding），用于预测光线上哪些区域包含物体表面：

$$\hat{w}_i = \frac{T_i \cdot (1 - \exp(-\sigma_i \delta_i))}{\sum_j T_j \cdot (1 - \exp(-\sigma_j \delta_j))}$$

其中 \(T_i = \exp(-\sum_{j<i} \sigma_j \delta_j)\) 是透射率。Proposal Network 通过 interlevel loss 与主网络对齐。

> 💡 关键：两级 Proposal Network 将采样点从 256 个逐步精炼到 48 个，集中在物体表面附近，大幅提升计算效率。

**L∞ 场景收缩**

对于无界场景，Nerfacto 使用 L∞ 范数收缩（而非 MipNeRF-360 的 L² 范数），将无限空间映射到 \([-2, 2]^3\) 的立方体：

$$\text{contract}(\mathbf{x}) = \begin{cases} \mathbf{x} & \text{if } \|\mathbf{x}\|_\infty \leq 1 \\ \left(2 - \frac{1}{\|\mathbf{x}\|_\infty}\right) \frac{\mathbf{x}}{\|\mathbf{x}\|_\infty} & \text{otherwise} \end{cases}$$

> 💡 关键：立方体收缩比球形收缩更好地对齐了 Hash Grid 的体素结构，避免了角落区域的容量浪费。

**外观嵌入（来自 NeRF-W）**

为每张训练图像学习一个外观嵌入向量 \(\ell_i\)，用于处理不同图像间的曝光/白平衡差异：

$$\mathbf{c} = \text{MLP}(\mathbf{f}(\mathbf{x}), \mathbf{d}, \ell_i)$$

**相机位姿优化（来自 NeRF--）**

为每个训练相机学习一个 SE(3) 残差变换，补偿 COLMAP 估计的位姿误差。

##### 实时 Web Viewer

Nerfstudio 的 Viewer 采用 Client-Server 架构：
- **Server 端**（GPU 机器）：运行训练，接收相机位姿，渲染图像
- **Client 端**（浏览器）：ReactJS + ThreeJS 实现，通过 WebSocket 传输相机位姿，通过 WebRTC 接收视频流

自适应分辨率机制：相机快速移动时降低渲染分辨率以保持流畅帧率，静止时提升分辨率获得高质量画面。

##### 实验结果与对比

在 MipNeRF-360 数据集上的对比（7 个场景平均）：

| 方法 | PSNR↑ | SSIM↑ | LPIPS↓ | 训练时间 |
|------|-------|-------|--------|----------|
| MipNeRF-360 | 29.23 | 0.844 | 0.207 | 数小时 (32-core TPU) |
| Nerfacto (70K iter) | 27.98 | 0.800 | 0.291 | ~30 min (RTX A5000) |
| Nerfacto (5K iter) | 25.38 | 0.688 | 0.390 | ~2 min |

> ⚠️ 注意：Nerfacto 优先考虑效率和通用性而非在特定 benchmark 上的极致指标。消融实验表明，去除外观嵌入虽提升 PSNR 但会产生 floater 伪影，说明量化指标不能完全反映视觉质量。

##### 与现有方法的区别

| 特性 | Nerfstudio | Instant-NGP | MipNeRF-360 | NeRFAcc |
|------|-----------|-------------|-------------|---------|
| 模块化设计 | ✅ 完整抽象层 | ❌ 单体实现 | ❌ 单体实现 | 部分 |
| 实时可视化 | ✅ Web-based | ✅ 本地 GUI | ❌ | ❌ |
| 真实数据支持 | ✅ 端到端 | 部分 | 部分 | ❌ |
| 语言 | Python/PyTorch | CUDA | JAX | Python/PyTorch |
| 可扩展性 | ✅ 插件式 | ❌ | ❌ | 部分 |

#### 🧪 练习题
```yaml
question: "Nerfacto 使用 L∞ 范数场景收缩而非 MipNeRF-360 的 L² 范数收缩，主要原因是什么？"
options:
  - "L∞ 收缩计算速度更快"
  - "L∞ 收缩到立方体，更好地对齐 Hash Grid 的体素结构"
  - "L∞ 收缩能保留更多远处细节"
  - "L∞ 收缩不需要归一化操作"
answer: 1
explain: "Hash Encoding 使用规则的体素网格存储特征，L∞ 收缩将空间映射为立方体，与体素网格的几何形状天然对齐，避免了球形收缩在立方体角落造成的容量浪费。"
```

### ECC-NeRF

```yaml
id: ecc_nerf
num: 16
name: ECC-NeRF
full_name: 椭圆锥投射NeRF (ECC-NeRF)
year: '2025'
org: IEEE
parent: mip_nerf
paper_url: https://ieeexplore.ieee.org/document/11016927/
project_url: ''
category: nerf
motivation: 椭圆锥投射技术支持多样化相机模型的抗锯齿
```

#### 📝 一句话总结
ECC-NeRF 将 Mip-NeRF/Zip-NeRF 中的圆锥投射推广为由相机投影模型诱导的椭圆锥投射，针对针孔、鱼眼、全景等相机的非各向同性像素足迹构建更准确的抗锯齿 NeRF 表示。

#### 🎯 核心要点
- 问题重定义：真实相机的像素光束通常不是标准圆锥，而会被投影模型扭曲为大小和形状不同的椭圆锥
- 多相机模型支持：推导针孔、鱼眼、全景相机下的 elliptic cone models
- 与 Mip-NeRF 集成：将圆锥台高斯近似替换为椭圆锥台高斯，保留集成位置编码 IPE 框架
- 与 Zip-NeRF 集成：把 anisotropic pixel footprint 注入 grid-based anti-aliasing 表示，提升多尺度细节
- 计算开销小：主要改变采样区域的协方差建模，不需要额外大网络
- 目标场景明确：面向多样相机模型的新视角合成，减少锯齿、模糊和尺度不一致

#### 🔬 深入细节
![椭圆锥几何示意](https://upload.wikimedia.org/wikipedia/commons/9/9b/Elliptical_Cone_Quadric.Png)
*图：椭圆锥几何示意。ECC-NeRF 建模的是由相机投影诱导的各向异性像素光束；IEEE 页面未暴露稳定论文图直链，因此这里使用公开椭圆锥图说明核心几何对象。*

```python
# ECC-NeRF 椭圆锥投射伪代码
def ecc_frustum_gaussian(camera_model, pixel, t0, t1):
    # 1. 根据相机模型计算该像素对应的中心射线和局部投影雅可比
    ray_dir = camera_model.unproject(pixel)
    J = camera_model.local_unprojection_jacobian(pixel)

    # 2. 将像素面积从图像平面传播到射线垂直平面，得到椭圆截面
    Sigma_pixel = pixel_covariance()          # e.g. box filter approximation
    Sigma_ellipse = J @ Sigma_pixel @ J.T     # anisotropic footprint

    # 3. 沿深度区间 [t0, t1] 近似为椭圆锥台高斯
    mu_t, sigma_t2 = frustum_depth_moments(t0, t1)
    Sigma_radial = scale_by_depth(Sigma_ellipse, t0, t1)
    mu = ray_origin + mu_t * ray_dir
    Sigma = sigma_t2 * outer(ray_dir, ray_dir) + lift_to_3d(Sigma_radial, ray_dir)

    return mu, Sigma

def ecc_nerf_query(camera, pixel, bins):
    encoded = []
    for t0, t1 in bins:
        mu, Sigma = ecc_frustum_gaussian(camera.model, pixel, t0, t1)
        encoded.append(integrated_positional_encoding(mu, Sigma))
    return nerf_mlp(encoded)
```

**动机与背景**

Mip-NeRF 通过 cone casting 解决 NeRF 点采样造成的走样：一个像素不再是一条无限细射线，而是在空间中覆盖一个圆锥台区域，并用高斯近似该区域后计算 IPE。这个假设对理想针孔模型中心区域较合理，但现实相机并不总产生各向同性圆形 footprint。鱼眼、全景、强畸变镜头以及图像边缘区域都会让一个像素对应的 3D 光束呈现明显方向性。

ECC-NeRF 的核心观察是：抗锯齿的本质不是“必须用圆锥”，而是“必须准确描述一个像素在 3D 中覆盖的面积”。当面积是椭圆而不是圆时，继续用圆锥会把不同方向的频率混在一起，可能在一个方向过度模糊，在另一个方向仍然走样。

**从圆锥到椭圆锥**

Mip-NeRF 的圆锥台高斯通常可以理解为：

$$
\Sigma = \sigma_t^2 dd^T + \sigma_r^2(I-dd^T)
$$

其中 \(d\) 是射线方向，\(\sigma_t^2\) 描述沿射线的深度方差，\(\sigma_r^2\) 是垂直方向的各向同性半径方差。ECC-NeRF 将垂直方向替换为由相机模型导出的各向异性协方差：

$$
\Sigma = \sigma_t^2 dd^T + E
\begin{bmatrix}
\sigma_a^2 & 0 \\
0 & \sigma_b^2
\end{bmatrix}
E^T
$$

这里 \(E=[e_1,e_2]\) 是垂直于射线的局部正交基，\(\sigma_a,\sigma_b\) 是椭圆长短轴尺度。若 \(\sigma_a=\sigma_b\)，该表达退化为 Mip-NeRF 的圆锥模型。

**相机模型如何进入**

对任意相机投影/反投影函数 \(\pi^{-1}\)，像素邻域的微小扰动可通过雅可比传播：

$$
\Sigma_{\text{ray}} \approx J_{\pi^{-1}}\,\Sigma_{\text{pixel}}\,J_{\pi^{-1}}^T
$$

这一步把图像平面中的一个像素盒式滤波区域映射到 3D 射线邻域。针孔相机在图像边缘、鱼眼相机在大视场区域、全景相机在经纬映射中都会产生不同的 \(J_{\pi^{-1}}\)，因此椭圆轴长和方向随像素位置变化。

> 💡 关键：ECC-NeRF 的“ECC”不是换一个网络，而是把采样区域的几何从圆形低通滤波改成相机感知的椭圆低通滤波。

**与 Mip-NeRF/Zip-NeRF 的结合**

在 Mip-NeRF 中，椭圆锥台仍可近似为高斯 \(\mathcal{N}(\mu,\Sigma)\)，随后 IPE 使用同一类闭式形式：

$$
\mathbb{E}_{x\sim\mathcal{N}(\mu,\Sigma)}[\sin(Px)]
= \sin(P\mu)\odot\exp\left(-\frac{1}{2}\operatorname{diag}(P\Sigma P^T)\right)
$$

差别在于 \(\Sigma\) 不再是径向各向同性。高频衰减会随方向不同而不同，更贴近真实像素 footprint。集成到 Zip-NeRF 时，同样思想用于 grid feature 的抗锯齿采样，帮助 grid-based NeRF 避免在非圆形 footprint 下产生方向性 aliasing。

**与传统 Mip-NeRF 的区别**

Mip-NeRF 假设同一深度处像素覆盖近似圆盘；ECC-NeRF 假设覆盖区域是椭圆，并由具体 camera model 决定。前者是相机无关的尺度感知，后者是相机感知的各向异性尺度建模。因此 ECC-NeRF 更适合多相机、广角、全景和畸变明显的数据采集设置。

#### 🧪 练习题
```yaml
question: "ECC-NeRF 相比 Mip-NeRF 的关键改动是什么？"
options:
  - "把 NeRF 的体渲染公式替换为 2D 卷积"
  - "把圆锥像素光束推广为由相机模型诱导的椭圆锥光束"
  - "取消集成位置编码 IPE"
  - "只支持正交相机"
answer: 1
explain: "ECC-NeRF 认为真实相机像素 footprint 常是各向异性的椭圆区域，因此用椭圆锥台高斯替代 Mip-NeRF 的圆锥台高斯。"
```

### Efficient-LVSM

```yaml
id: efficient_lvsm
num: 17
name: Efficient-LVSM
full_name: 高效大视角合成模型 (Efficient-LVSM)
year: '2026'
org: arXiv
parent: nerf
paper_url: https://arxiv.org/abs/2602.06478
project_url: ''
category: nerf
motivation: 解耦共精炼注意力机制提升前馈视角合成速度
```

#### 📝 一句话总结
Efficient-LVSM 提出解耦双流（Input Encoder + Target Decoder）共精炼架构，将 LVSM 中 \(O(N^2M)\) 的全注意力复杂度降至 \(O(NM + N)\)，在场景级和物体级新视角合成任务上取得 SOTA 质量的同时，训练收敛速度提升 2 倍、推理延迟降低 4.4 倍。

#### 🎯 核心要点
- **解耦双流架构**：将单体 Transformer 拆分为 Input Encoder（视图内自注意力）和 Target Decoder（自注意力 + 交叉注意力），消除输入-目标间的二次复杂度瓶颈
- **逐层共精炼机制（Co-Refinement）**：每层 Encoder 输出直接送入同层 Decoder 做交叉注意力，实现多尺度特征逐层融合，比单纯交叉注意力提升 2.07 dB
- **REPA 蒸馏**：引入 DINOv3 预训练特征对齐（Smooth L1 损失），对双流架构带来 +0.8 dB 增益（对原始 LVSM 仅 +0.16 dB）
- **KV-Cache 增量推理**：双流解耦天然支持 KV 缓存，新增输入视图只需编码一次并追加缓存，增量推理开销近乎恒定
- **复杂度分析**：注意力复杂度从 LVSM Dec-Only 的 \(O(N^2M)\) 降至 \(O(NM + N)\)，16 个输入视图时推理速度提升 14.9×
- **SOTA 结果**：RealEstate10K 达 29.86 dB（res-512），Objaverse/GSO 达 32.92 dB，ABO 达 32.65 dB，均超越 LVSM Dec-Only

#### 🔬 深入细节
##### 核心架构示意图

![Efficient-LVSM 架构总览](https://arxiv.org/html/2602.06478v1/extracted/6230191/figures/method_v6.png)
*图：Efficient-LVSM 双流共精炼架构。左侧 Input Encoder 对各输入视图独立做 intra-view self-attention；右侧 Target Decoder 先做 self-attention 再通过 cross-attention 从 Encoder 特征中提取信息。每层 Encoder 的输出直接桥接到同层 Decoder，实现逐层共精炼。*

##### 算法伪代码

```python
# Efficient-LVSM 前向推理伪代码
# 输入: source_images [N, H, W, 3], target_plücker [M, H, W, 6]
# 输出: rendered_images [M, H, W, 3]

# Step 1: Tokenization
S = patchify(concat(source_images, source_plücker))  # [N, P, D]  P=patches per view
T = patchify(target_plücker)                          # [M, P, D]

# Step 2: L-layer Co-Refinement
for l in range(L):
    # Input Encoder: intra-view self-attention (each view independently)
    for i in range(N):
        S[i] = self_attn_layer_l(S[i])               # O(P²) per view, O(NP²) total
    
    # Target Decoder: self-attention then cross-attention
    T = self_attn_layer_l(T)                          # O((MP)²) = O(M²P²)
    T = cross_attn_layer_l(Q=T, KV=concat(S))         # O(MP × NP) = O(NMP²)
    
    # Optional: REPA distillation alignment (training only)
    if training:
        loss_repa += smooth_l1(mlp(S), dinov3(source_images))
        loss_repa += smooth_l1(mlp(T), dinov3(target_images))

# Step 3: Decode to pixels
rendered = detokenize(T)  # [M, H, W, 3]

# KV-Cache for incremental inference:
# When new source view N+1 arrives:
#   S_new = encode(source_image_N+1)  # only encode new view
#   cache.append(S_new)               # append to KV cache
#   T = decode(T, cache)              # reuse all cached KV
```

##### 动机与背景

LVSM（Large View Synthesis Model）首次证明了纯 Transformer 架构在新视角合成（NVS）任务上的有效性，无需显式 3D 表征（如 NeRF 或 3D Gaussian Splatting），仅通过注意力机制在潜空间中隐式完成多视图到新视图的映射。然而，LVSM 的核心瓶颈在于其**单体注意力设计**：

- **LVSM Decoder-Only**：将所有 \(N\) 个输入视图和 \(M\) 个目标视图的 token 拼接后做全局自注意力，复杂度为 \(O((N+M)^2 P^2)\)，即 \(O(N^2M)\) 量级，随视图数量二次增长
- **LVSM Encoder-Decoder**：虽然分离了编码和解码，但 Encoder 仍对所有输入视图做全局注意力 \(O(N^2P^2)\)，且缺乏逐层信息传递

> 💡 **关键洞察**：论文通过系统分析发现，LVSM 中不同视图间的注意力模式呈现明显的**稀疏性**——输入视图之间的 cross-view attention 权重远低于 intra-view attention。这意味着全局注意力中大量计算浪费在了低信息量的跨视图交互上。

##### 核心机制：解耦双流共精炼

**1. Input Encoder（视图内自注意力）**

Encoder 对每个输入视图独立处理，仅在视图内部做自注意力：

$$\hat{\mathbf{S}}_i^{(l)} = \text{SelfAttn}^{(l)}(\mathbf{S}_i^{(l-1)}), \quad i = 1, \ldots, N$$

每个视图有 \(P\) 个 patch token，单视图自注意力复杂度为 \(O(P^2)\)，\(N\) 个视图总计 \(O(NP^2)\)。相比 LVSM 的 \(O(N^2P^2)\)，这是从二次到线性的降低。

**2. Target Decoder（自注意力 + 交叉注意力）**

Decoder 对目标视图 token 先做自注意力（捕获目标视图间的空间关系），再通过交叉注意力从 Encoder 特征中提取 3D 信息：

$$\mathbf{T}^{(l)} = \text{CrossAttn}^{(l)}\big(\text{SelfAttn}^{(l)}(\mathbf{T}^{(l-1)}),\; \text{Concat}(\hat{\mathbf{S}}_1^{(l)}, \ldots, \hat{\mathbf{S}}_N^{(l)})\big)$$

交叉注意力中，Query 来自目标 token（\(MP\) 个），Key/Value 来自所有输入 token（\(NP\) 个），复杂度为 \(O(NMP^2)\)。

**3. 逐层共精炼（Co-Refinement）**

> ⚠️ **关键创新**：与传统 Encoder-Decoder 仅在最后一层传递特征不同，Efficient-LVSM 在**每一层**都将 Encoder 的输出桥接到 Decoder。

这一设计的直觉是：浅层特征包含低级纹理和边缘信息，深层特征包含高级语义信息。逐层桥接确保 Decoder 能在每个抽象层级上获取输入视图的信息，实现从细粒度结构到全局语义的渐进式特征融合。消融实验证实，co-refinement 比仅在最后一层交叉注意力提升了 **2.07 dB**（24.18→26.25 PSNR）。

**4. 总体复杂度对比**

| 模型 | Encoder 复杂度 | Decoder 复杂度 | 总复杂度 |
|------|---------------|---------------|---------|
| LVSM Dec-Only | — | \(O((N+M)^2P^2)\) | \(O(N^2M)\) |
| LVSM Enc-Dec | \(O(N^2P^2)\) | \(O(M^2P^2 + NMP^2)\) | \(O(N^2 + NM)\) |
| **Efficient-LVSM** | \(O(NP^2)\) | \(O(M^2P^2 + NMP^2)\) | **\(O(NM + N)\)** |

当 \(N \gg M\)（多输入少目标的典型场景），Efficient-LVSM 的优势尤为显著。

##### REPA 蒸馏：利用预训练视觉先验加速收敛

论文引入 REPA（REPresentation Alignment）蒸馏策略，将 DINOv3 预训练编码器的特征作为监督信号，对齐 Encoder 和 Decoder 中间层的特征表示：

$$\mathcal{L}_{\text{REPA}} = \frac{1}{N}\sum_{i=1}^{N} \text{sim}\big(f(\mathbf{I}), h_\phi(\mathbf{X}_k)\big)$$

其中 \(f\) 是冻结的 DINOv3 编码器，\(h_\phi\) 是可学习的 MLP 投影层（3 层），\(\mathbf{X}_k\) 可以是 Encoder 或 Decoder 的中间特征。

> 💡 **关键发现**：REPA 对 Efficient-LVSM 的增益（+0.8 dB）远大于对原始 LVSM 的增益（+0.16 dB）。论文推测这是因为 LVSM 的全局自注意力将不同视图的特征纠缠在一起，难以与单视图预训练特征对齐；而 Efficient-LVSM 的解耦设计使得 Encoder 特征天然保持视图独立性，更适合蒸馏。

REPA 的最佳配置（通过消融确定）：
- **损失函数**：Smooth L1（优于 L2 和 Cosine，因为绝对近似优于相对近似）
- **蒸馏目标**：同时对输入和目标 token 蒸馏（比单独蒸馏任一方更好）
- **DINOv3 源层**：第 8 层（中间层优于最终层，与 DINOv3 特征分析文献一致）
- **推理时丢弃**：预训练编码器和 MLP 投影层仅在训练时使用，推理时完全丢弃，零额外开销

##### 训练与推理流程

**训练损失**：总损失为像素重建损失与 REPA 蒸馏损失的加权和：

$$\mathcal{L} = \mathcal{L}_{\text{recon}} + \lambda \mathcal{L}_{\text{REPA}}$$

**模型配置**：
- Patch size: \(8 \times 8\)
- Transformer: 24 层（12 层 Encoder + 12 层 Decoder）
- Hidden dimension: 1024
- 参数量: 199M

**推理优化 — KV-Cache**：
- 首次推理：编码所有 \(N\) 个输入视图，缓存 KV
- 新增目标视图：直接复用缓存，仅需运行 Decoder
- 新增输入视图：仅编码新视图并追加缓存，无需重新处理已有视图
- 增量推理开销近乎恒定，适用于交互式 3D 应用

##### 与传统方法的对比

| 维度 | 优化式方法 (NeRF) | 高斯泼溅 (3DGS) | 扩散模型 | LVSM | **Efficient-LVSM** |
|------|-----------------|----------------|---------|------|-------------------|
| 3D 表征 | 显式/隐式 | 显式高斯 | 无 | 无（潜空间） | 无（潜空间） |
| 推理速度 | 慢（需优化） | 快 | 极慢 | 中等 | **快（24.78ms）** |
| 多视图扩展性 | 差 | 中等 | 差 | 差（二次） | **好（线性）** |
| 渲染质量 | 高 | 高 | 中等 | 高 | **最高** |
| 增量推理 | 不支持 | 不支持 | 不支持 | 不支持 | **支持** |

##### 实验结果亮点

**场景级（RealEstate10K）**：
- Res-512: **29.86 dB** PSNR / 0.905 SSIM，超越 LVSM Dec-Only（29.53 dB）
- 推理延迟仅 24.78ms，GFLOPS 仅 1325（LVSM Dec-Only 为 8523）

**物体级（Objaverse → GSO/ABO）**：
- GSO Res-512: **32.92 dB** / 0.973 SSIM / 0.021 LPIPS
- ABO Res-512: **32.65 dB** / 0.951 SSIM / 0.042 LPIPS
- 全面超越 LVSM Dec-Only 和 GS-LRM

**效率**：
- 16 个输入视图时推理速度比 LVSM Dec-Only 快 **14.9×**，内存减少 **50%**
- 训练收敛速度提升 **2×**（达到 LVSM 最终性能仅需一半 GPU 时间）
- 零样本泛化：未经多视图训练即可受益于更多输入视图

#### 🧪 练习题
```yaml
question: "Efficient-LVSM 的 Input Encoder 采用何种注意力机制来降低复杂度？"
options:
  - "所有输入视图之间的全局自注意力（cross-view self-attention）"
  - "仅在每个输入视图内部做自注意力（intra-view self-attention）"
  - "输入视图与目标视图之间的交叉注意力（cross-attention）"
  - "基于局部窗口的稀疏注意力（window attention）"
answer: 1
explain: "Efficient-LVSM 的 Input Encoder 对每个输入视图独立做 intra-view self-attention，避免了视图间的二次复杂度，将 Encoder 复杂度从 O(N²P²) 降至 O(NP²)。"
```

### 3DGS

```yaml
id: 3dgs
num: 18
name: 3DGS
full_name: 3D高斯泼溅 (3D Gaussian Splatting)
year: '2023'
org: Inria
parent: —
paper_url: https://arxiv.org/abs/2308.04079
project_url: ''
category: gaussian_splatting
motivation: 显式高斯基元+平铺光栅化实现实时高质量渲染
```

#### 📝 一句话总结
3D Gaussian Splatting 用一组可优化的各向异性 3D 高斯显式表示辐射场，并通过可微的 tile-based splatting 光栅化实现高质量实时新视角合成，解决 NeRF 类方法训练/渲染慢的问题。

#### 🎯 核心要点
- 显式 3D 高斯表示：每个 primitive 包含位置、各向异性协方差、不透明度和球谐颜色系数
- 从 SfM 点云初始化：利用 COLMAP 等相机标定输出的稀疏点作为初始高斯中心
- 协方差可优化：用旋转 \(R\) 和缩放 \(S\) 参数化 \(\Sigma=RSS^TR^T\)，保证半正定并表达各向异性几何
- 交替优化与密度控制：根据视图空间梯度 clone/split 高斯，并剪枝低不透明度或无效高斯
- 可微 tile-based rasterizer：按屏幕 tile 分配、排序并 alpha-blending 高斯，避免逐射线 MLP 查询
- 实时渲染：在 1080p 新视角合成中达到实时级帧率，同时保持接近或超过当时高质量 NeRF 方法的视觉质量

#### 🔬 深入细节
![3D Gaussian Splatting 优化与渲染流程](https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x2.png)
*图：3DGS 从 SfM 稀疏点云初始化高斯，交替执行参数优化和密度控制，最终用 tile-based renderer 实时渲染。*

```python
# 3D Gaussian Splatting 训练伪代码
gaussians = initialize_from_sfm_points(points)

for it in range(num_iters):
    cam, target = sample_training_view()

    # 1. 投影 3D 高斯到屏幕空间
    splats = []
    for g in gaussians:
        Sigma3d = g.R @ g.S @ g.S.T @ g.R.T
        mean2d, Sigma2d = project_gaussian(g.mu, Sigma3d, cam)
        color = eval_spherical_harmonics(g.sh, cam.view_dir(g.mu))
        splats.append((mean2d, Sigma2d, g.opacity, color, depth(g, cam)))

    # 2. tile 分桶、按深度排序、alpha blending
    image = tile_rasterize_and_blend(splats)

    # 3. 图像损失反传到位置、协方差、不透明度、SH
    loss = (1 - lam) * l1(image, target) + lam * dssim(image, target)
    loss.backward()
    optimizer.step()

    # 4. 自适应密度控制
    if it % densify_interval == 0:
        gaussians = clone_or_split_high_gradient_gaussians(gaussians)
        gaussians = prune_low_opacity_gaussians(gaussians)
```

**动机与背景**

NeRF 用 MLP 表示连续辐射场，质量高但渲染需要沿每条射线大量采样并多次前向网络。Instant-NGP、Plenoxels 等方法大幅加速了训练或渲染，但在开放大场景中仍存在质量、速度、显存之间的取舍。3DGS 的关键转向是：放弃逐射线体采样，改用可直接光栅化的显式 primitive。

每个 3D 高斯定义为：

$$
G(x)=\exp\left(-\frac{1}{2}(x-\mu)^T\Sigma^{-1}(x-\mu)\right)
$$

协方差用 \(R,S\) 参数化：

$$
\Sigma=RSS^TR^T
$$

其中 \(R\) 控制朝向，\(S\) 控制三轴尺度。优化后，高斯会自然变成贴合表面的扁长椭球，从而用较少 primitive 表示复杂几何。

**从 3D 高斯到 2D splat**

渲染时，3D 高斯通过相机投影到图像平面。局部线性化投影的 2D 协方差为：

$$
\Sigma' = J W \Sigma W^T J^T
$$

其中 \(W\) 是世界到相机变换，\(J\) 是投影雅可比。投影后的 2D 椭圆高斯覆盖若干像素，像素颜色通过按深度排序的 alpha blending 得到：

$$
C=\sum_{i\in\mathcal{N}} c_i\alpha_i\prod_{j=1}^{i-1}(1-\alpha_j)
$$

这里 \(c_i\) 来自球谐颜色系数，\(\alpha_i\) 由不透明度和 2D 高斯权重共同决定。

> 💡 关键：3DGS 保留了体渲染中“透明度累积”的成像直觉，但把昂贵的 ray marching 改成 GPU 友好的 splat rasterization。

**密度控制为什么必要**

SfM 点云通常稀疏且不均匀，如果只优化初始高斯，纹理丰富但几何复杂的区域会欠拟合；如果无约束增加高斯，显存和渲染开销会失控。3DGS 通过视图空间梯度识别需要更多表达能力的区域：小高斯可 clone，过大的高斯可 split；低不透明度或贡献小的高斯被 prune。这个交替过程让高斯数量随场景复杂度自适应增长。

**tile-based rasterizer**

直接对每个像素遍历所有高斯不可行。3DGS 先计算每个高斯覆盖的屏幕 tile，将高斯实例化到对应 tile，再按 tile 和深度排序。每个 tile 内并行执行前向 alpha blending；反向传播时记录/重构累积透明度，使颜色损失可以回传到高斯参数。由于这条路径高度适合 GPU，训练和实时浏览都显著加速。

**与 NeRF 系列的区别**

NeRF 是隐式连续函数，表达紧凑但查询昂贵；3DGS 是显式 primitive 集合，内存更大但渲染极快。NeRF 的质量依赖采样策略和 MLP 容量，3DGS 的质量依赖初始化、密度控制和高斯几何约束。后续大量 Gaussian Splatting 工作基本都围绕抗锯齿、几何正则、压缩、动态场景和语义编辑扩展这一显式表示。

#### 🧪 练习题
```yaml
question: "3DGS 能实现实时渲染的核心原因是什么？"
options:
  - "它仍然对每条射线执行大 MLP 查询"
  - "它把场景表示为可投影的显式 3D 高斯，并用 tile-based rasterizer 进行 splatting"
  - "它只渲染低分辨率灰度图"
  - "它完全不需要相机位姿"
answer: 1
explain: "3D 高斯可直接投影为 2D 椭圆 splat，GPU tile 分桶、排序和 alpha blending 比 NeRF 的逐点 MLP 查询快得多。"
```

### Mip-Splatting

```yaml
id: mip_splatting
num: 19
name: Mip-Splatting
full_name: 抗锯齿高斯泼溅 (Mip-Splatting)
year: '2024'
org: Tsinghua
parent: 3dgs
paper_url: https://arxiv.org/abs/2311.16493
project_url: ''
category: gaussian_splatting
motivation: 3D平滑滤波器解决缩放时的走样问题
```

#### 📝 一句话总结
Mip-Splatting 从采样定理分析 3DGS 的多尺度走样问题，提出 3D smoothing filter 约束高斯最高频率，并用 2D Mip filter 替代固定 dilation，使 Gaussian Splatting 在放大和缩小时都更接近无锯齿渲染。

#### 🎯 核心要点
- 问题诊断：原始 3DGS 缺少 3D 频率约束，且屏幕空间 dilation 会引入尺度模糊
- 3D smoothing filter：根据训练视图诱导的最大采样率限制高斯最小尺度，减少放大时的高频伪影
- 2D Mip filter：用近似像素盒式滤波的 2D 高斯滤波替代 dilation，缓解缩小时的 aliasing 和亮度膨胀
- 归一化因子：对滤波后的 2D 高斯贡献做能量校正，使远小于像素的高斯不会贡献过多不透明度
- 即插即用：保持 3DGS 的优化损失、密度控制和显式高斯框架，只修改滤波与投影处理
- 多尺度评估：在单尺度训练、多尺度测试和改变焦距/距离的场景中显著优于原始 3DGS 与 EWA 变体

#### 🔬 深入细节
![Mip-Splatting 走样问题](https://ar5iv.labs.arxiv.org/html/2311.16493/assets/x1.png)
*图：原始 3DGS 的 dilation 和缺少 3D 频率约束会在改变采样率时产生膨胀、侵蚀和高频伪影。*

![Mip-Splatting 采样率约束](https://ar5iv.labs.arxiv.org/html/2311.16493/assets/x2.png)
*图：3D smoothing filter 使用训练视图中的最大采样率约束高斯基元，避免学习超出观测采样能力的高频结构。*

```python
# Mip-Splatting 核心伪代码
for iteration in range(num_iters):
    if iteration % update_interval == 0:
        for g in gaussians:
            # 训练视图中该高斯被观察到的最大采样率
            g.nu_hat = max(camera.focal / distance(camera, g.mu)
                           for camera in training_cameras)

    rendered = []
    for g in gaussians:
        # 1. 3D smoothing: 限制三维高频
        Sigma3d = g.covariance + (s3d / g.nu_hat) * eye(3)

        # 2. 投影为 2D Gaussian
        mean2d, Sigma2d = project_gaussian(g.mu, Sigma3d, camera)

        # 3. 2D Mip filter: 近似像素盒式滤波并做能量校正
        Sigma_mip = Sigma2d + s2d * eye(2)
        amp = sqrt(det(Sigma2d) / det(Sigma_mip))
        splat = amp * gaussian_2d(pixel_grid, mean2d, Sigma_mip)
        rendered.append(alpha_blend(g.color, g.opacity, splat))

    loss = reconstruction_loss(rendered, target)
    loss.backward()
    optimizer.step()
```

**动机与背景**

3DGS 在训练和测试分辨率接近时表现很好，但当焦距、相机距离或渲染分辨率变化时会出现强伪影。论文指出根因有两个：一是 3D 高斯可以在训练视图不可分辨的尺度上收缩，学到超过采样上限的高频信号；二是原始 3DGS 为了稳定优化，在 2D 协方差上添加固定 dilation，使极小高斯在屏幕上仍覆盖像素并贡献不透明度。

固定 dilation 的渲染形式可理解为：

$$
\Sigma^{2D}_{\text{dilated}}=\Sigma^{2D}+\epsilon I
$$

这会造成尺度模糊：一个真实很小但被 dilation 放大的高斯，与一个本来就较大的高斯在训练分辨率下可能渲染相似；当视角缩放变化时，二者行为不同，于是产生 erosion、过亮或锯齿。

**3D smoothing filter**

Mip-Splatting 根据训练视图估计每个高斯能被可靠观测到的最大采样率：

$$
\hat{\nu}_k=\max_n \frac{f_n}{d_{n,k}}
$$

其中 \(f_n\) 是第 \(n\) 个相机焦距，\(d_{n,k}\) 是相机到第 \(k\) 个高斯的距离。采样率越高，允许的高斯越小；采样率越低，必须施加更强平滑。实际做法是在 3D 协方差上加一个各向同性平滑项：

$$
\Sigma^{3D}_{k,\text{smooth}}=\Sigma^{3D}_{k}+\frac{s}{\hat{\nu}_k}I
$$

这相当于对三维场景做低通滤波，使模型不再把训练图像无法支持的细节编码成退化的小高斯。

**2D Mip filter**

真实像素值是连续图像在一个像素面积上的积分，即盒式滤波。Mip-Splatting 用 2D Gaussian 近似该像素盒式滤波：

$$
G_{\text{mip}}(x)=
\sqrt{\frac{|\Sigma^{2D}|}{|\Sigma^{2D}+sI|}}
\exp\left(-\frac{1}{2}(x-\mu)^T(\Sigma^{2D}+sI)^{-1}(x-\mu)\right)
$$

归一化因子非常关键。当投影高斯远小于一个像素时，\(|\Sigma^{2D}|\to 0\)，该因子趋近 0，高斯贡献被正确衰减；而 dilation 会让它仍像一个完整 splat 一样贡献能量。

> 💡 关键：3D smoothing 主要解决 zoom-in 时暴露出的三维高频伪影；2D Mip filter 主要解决 zoom-out 时屏幕采样不足造成的 aliasing 和亮度错误。

**与 EWA/原始 3DGS 的区别**

EWA splatting 也会在屏幕空间做滤波，但其滤波范围更偏经验性，容易过度模糊。Mip filter 的目标是近似单像素盒式滤波，并通过归一化处理小高斯能量，因此在清晰度和抗锯齿之间更平衡。相比原始 3DGS，Mip-Splatting 没有改变高斯表示本身，而是让训练和渲染遵守采样率约束。

**训练与推理流程**

训练时周期性更新每个高斯的 \(\hat{\nu}_k\)，随后在投影前使用 3D smoothing；渲染时使用 2D Mip filter 替代 dilation。损失仍采用 3DGS 的图像重建损失，密度控制策略也基本保持。因此它可以视为 3DGS 的抗锯齿补丁，而不是新的场景表示范式。

#### 🧪 练习题
```yaml
question: "Mip-Splatting 中 2D Mip filter 的归一化因子主要解决什么问题？"
options:
  - "让所有高斯拥有相同颜色"
  - "当投影高斯远小于像素时正确衰减其贡献，避免 dilation 带来的亮度膨胀"
  - "完全跳过高斯深度排序"
  - "把 3D 高斯改成三角网格"
answer: 1
explain: "归一化因子随 |Σ²ᴰ| 变小而趋近 0，使小于像素的高斯不会像 dilation 那样贡献过多不透明度。"
```

### GaussianPro

```yaml
id: gaussianpro
num: 20
name: GaussianPro
full_name: 渐进式高斯优化 (GaussianPro)
year: '2024'
org: ICML
parent: 3dgs
paper_url: https://openreview.net/forum?id=lQ3SEBH1gF
project_url: ''
category: gaussian_splatting
motivation: 渐进式传播策略优化高斯密度分布
```

#### 📝 一句话总结
GaussianPro 将经典 MVS 的传播和 patch matching 引入 3DGS 密度控制，用已重建区域的深度/法线渐进式生成新高斯，并通过平面约束正则高斯形状，解决 SfM 稀疏初始化在低纹理大场景中导致的高斯分布不足问题。

#### 🎯 核心要点
- 针对 3DGS 初始化依赖：低纹理道路、墙面等区域 SfM 点少，原始 clone/split 难以从无点区域生长出正确高斯
- 混合几何表示：将 3D 高斯渲染为 2D depth map 和 normal map，利用图像网格上的结构化邻域传播几何
- Progressive Gaussian Propagation：通过 patch matching 将可靠深度/法线从已建模区域传播到欠建模区域
- 几何过滤与选择：使用多视图一致性过滤传播结果，并根据渲染深度与过滤深度差异选择需新增高斯的像素
- 平面约束优化：用传播法线监督渲染法线，并用 scale regularization 鼓励高斯变扁贴合表面
- 大场景收益明显：在 Waymo 数据集上相对 3DGS 提升约 1.15 dB PSNR，同时保持实时渲染速度

#### 🔬 深入细节
![GaussianPro 渐进式传播流程](https://ar5iv.labs.arxiv.org/html/2402.14650/assets/x2.png)
*图：GaussianPro 的 Progressive Propagation。由当前高斯渲染 depth/normal，patch matching 传播几何，经一致性过滤后反投影生成新高斯。*

```python
# GaussianPro 训练伪代码
gaussians = initialize_3dgs_from_sfm()

for it in range(num_iters):
    image, depth, normal = render_rgb_depth_normal(gaussians, camera)
    loss = image_reconstruction_loss(image, target)

    if it % propagation_interval == 0:
        # 1. 在 2D 图像空间传播局部平面
        prop_depth, prop_normal = patch_match_propagation(
            rendered_depth=depth,
            rendered_normal=normal,
            reference_view=camera,
            neighbor_views=select_neighbors(camera),
        )

        # 2. 几何一致性过滤
        filt_depth, filt_normal, valid = multiview_filter(prop_depth, prop_normal)

        # 3. 找到现有高斯未能解释的区域并新增高斯
        mask = abs(filt_depth - depth) / depth > sigma
        new_points = backproject(mask, filt_depth, filt_normal, camera)
        gaussians.add(initialize_gaussians(new_points, normals=filt_normal))

    # 4. 平面约束
    loss += beta * normal_consistency(rendered_normal, filt_normal, valid)
    loss += gamma * min_scale_regularization(gaussians)
    loss.backward()
    optimizer.step()
```

**动机与背景**

原始 3DGS 从 SfM 稀疏点云初始化，再根据梯度 clone/split 高斯。这个策略在纹理丰富区域有效，因为 SfM 已经提供了点，图像重建梯度也能指示哪里需要更密的 primitive。但大规模驾驶场景中存在大量低纹理表面，例如道路、墙体、天空边界附近的平面结构，SfM 往往没有足够点。没有初始高斯，就很难通过局部 split/clone 补出来。

GaussianPro 的关键思想是借鉴 MVS：不要只在 3D 高斯集合内部做局部密度控制，而是把当前几何投影到 2D 图像空间，在规则像素网格上做深度/法线传播。2D 空间有天然邻域结构，适合从已建模区域向欠建模区域传播平面假设。

**混合几何表示**

对每个高斯，深度来自高斯中心投影到当前相机坐标系的 \(z_i\)。法线由协方差最短轴近似，因为优化后的表面高斯通常会变扁：

$$
n_i = R_i[r,:],\qquad r=\arg\min([s_1,s_2,s_3])
$$

然后像渲染颜色一样用 alpha blending 渲染 depth map 和 normal map。这样，离散无序的 3D 高斯被转换为结构化的 2D 几何图，便于后续 patch matching。

**渐进式传播与 patch matching**

每个像素的深度和法线可定义一个局部平面。对像素 \(p\)，论文从邻域像素选择多个平面候选，并用单应性把参考视图像素映射到邻近视图：

$$
H=K\left(W_{\text{rel}}-\frac{t_{\text{rel}}n_{k_l}^{T}}{d_{k_l}}\right)K^{-1}
$$

候选平面的优劣通过 NCC 颜色一致性评估。最一致的候选用于更新该像素的深度和法线。重复若干轮后，可靠几何可以从已有高斯覆盖区域传播到低纹理或缺失区域。

> 💡 关键：GaussianPro 新增高斯的位置不是随机 clone/split 出来的，而是由多视图 patch matching 估计出的 depth/normal 反投影得到，因此更容易落在真实表面上。

**几何过滤与新增高斯**

传播结果可能有误，因此需要多视图几何一致性检查。过滤后，GaussianPro 比较过滤深度与当前渲染深度的相对差异：

$$
\frac{|\bar{D}(p)-\hat{D}(p)|}{\hat{D}(p)}>\sigma
$$

满足阈值的区域说明现有高斯未能准确解释该表面，于是将这些像素按过滤深度和法线反投影回 3D，并初始化为新高斯加入优化。随着训练进行，新增高斯会继续被渲染、传播和优化，形成渐进式密度补全。

**平面约束优化**

3DGS 的图像损失并不直接约束高斯形状，可能出现高斯漂浮、朝向混乱或不贴合平面。GaussianPro 引入法线一致性：

$$
\mathcal{L}_{normal}=\sum_{p\in\mathcal{Q}}\|\hat{N}(p)-\bar{N}(p)\|_1+
\left|1-\hat{N}(p)^T\bar{N}(p)\right|
$$

并加入最小尺度正则 \(\mathcal{L}_{scale}\)，鼓励高斯沿法线方向变薄：

$$
\mathcal{L}_{planar}=\beta\mathcal{L}_{normal}+\gamma\mathcal{L}_{scale}
$$

最终训练损失为 3DGS 图像重建损失加上平面约束。论文设置传播周期为固定迭代间隔，例如每 50 次迭代触发一次传播。

**与 3DGS 的区别**

3DGS 的密度控制是局部、梯度驱动、基于已有高斯的；GaussianPro 的密度控制是几何传播驱动的，可以在现有高斯不足的区域生成新 primitive。它特别适合低纹理大场景，因为这些区域图像梯度弱但几何连续性强，MVS 式传播正好能利用这种连续性。

#### 🧪 练习题
```yaml
question: "GaussianPro 为什么要把 3D 高斯渲染成 depth/normal map 后再做传播？"
options:
  - "因为 2D 图像空间有规则邻域，便于用 patch matching 从可靠区域向欠建模区域传播几何"
  - "因为 3DGS 无法渲染 RGB 图像"
  - "因为这样可以完全取消相机参数"
  - "因为所有高斯都必须变成球形"
answer: 0
explain: "3D 高斯集合拓扑不规则，不便直接搜索表面邻域；投影到 2D depth/normal map 后可使用 MVS 的平面传播和多视图一致性来生成新高斯。"
```

### LangSplat

```yaml
id: langsplat
num: 21
name: LangSplat
full_name: 语言高斯泼溅 (LangSplat)
year: '2024'
org: NTU
parent: 3dgs
paper_url: https://arxiv.org/abs/2312.16084
project_url: ''
category: gaussian_splatting
motivation: 语言特征嵌入高斯点云实现语义级3D理解
```

#### 📝 一句话总结
LangSplat 提出将 CLIP 语言特征蒸馏到 3D Gaussian Splatting 中，用带语言嵌入的高斯点云构建可实时查询的 3D language field，解决 NeRF 语言场渲染慢、边界模糊和多尺度查询低效的问题。

#### 🎯 核心要点
- **语言高斯表示**：在每个 3D Gaussian 上附加多层级语言特征，使显式高斯点云同时承载外观、几何和开放词表语义
- **SAM 层级语义监督**：利用 SAM 对每张训练图像生成 subpart、part、whole 三个语义层级的 mask，再对每个 mask 提取 CLIP embedding
- **场景级语言自编码器**：将 512 维 CLIP 特征压缩到场景特定的低维 latent，降低显式高斯存储和 splatting 渲染成本
- **两阶段训练**：先训练或加载 RGB 3DGS，再固定高斯几何与不透明度，仅优化语言 latent 特征
- **tile-based feature splatting**：复用 3DGS 的瓦片光栅化，把语言特征像颜色一样 alpha 合成到视图平面
- **开放词表查询**：渲染语言 latent 后用 decoder 还原 CLIP 空间，并与任意文本 query 的 CLIP embedding 计算相关性
- **效率优势**：论文报告在 1440×1080 分辨率下相对 LERF 获得约 199× 的查询/渲染加速

#### 🔬 深入细节
##### 核心示意图

![LangSplat 语言场可视化](https://langsplat.github.io/static/images/teaser.png)
*图：LangSplat 官方项目页 teaser。图中对比了 LERF 与 LangSplat 学到的 3D 语言特征；LangSplat 的特征边界更贴近物体轮廓，体现了 SAM mask 监督和显式高斯语言特征的作用。*

##### 算法伪代码

```python
# LangSplat 训练与查询伪代码
def train_langsplat(images, cameras, pretrained_3dgs):
    gaussians = load_rgb_gaussians(pretrained_3dgs)
    freeze_geometry_opacity_color(gaussians)

    clip_features = []
    for image in images:
        masks_by_level = SAM(image, levels=["subpart", "part", "whole"])
        for level, masks in masks_by_level.items():
            for mask in filter_redundant_masks(masks):
                feat = CLIP_image_encoder(crop_or_mask(image, mask))
                assign_feature_to_pixels(level, mask, feat)
                clip_features.append(feat)

    autoencoder = train_scene_autoencoder(
        clip_features,
        loss="L1 + cosine",
        latent_dim=3,
    )

    for step in range(30000):
        view = sample_training_view(images, cameras)
        target_latent = autoencoder.encode(pixel_clip_features(view))
        rendered_latent = splat_language_features(gaussians, view.camera)
        loss = distance(rendered_latent, target_latent)
        update_only_language_features(gaussians, loss)

    return gaussians, autoencoder.decoder


def open_vocab_query(gaussians, decoder, camera, text):
    latent_map = splat_language_features(gaussians, camera)
    clip_map = decoder(latent_map)
    text_feat = CLIP_text_encoder(text)
    relevancy = cosine_similarity(clip_map, text_feat)
    return threshold_or_argmax(relevancy)
```

##### 动机与背景

LERF 等早期 3D language field 方法通常把 CLIP/DINO 特征蒸馏进 NeRF。这个路线能支持开放词表查询，但它要沿光线密集采样并体渲染特征，查询时还常要在多个尺度上重复渲染，所以高分辨率交互很慢。更关键的是，CLIP 本身是图像级或区域级对齐模型，不是像素级模型；用中心 crop 的多尺度 CLIP 特征监督 3D 点，会让同一个点在“物体整体、部件、子部件”之间语义混淆，边界也容易被背景和邻近物体污染。

LangSplat 的核心判断是：3DGS 已经把场景显式表示为可实时 rasterize 的高斯集合，那么语言场也不必继续依赖 NeRF 的隐式体渲染。论文把每个高斯扩展为语言高斯，让高斯携带语言 latent \(\mathbf{l}_i^s\)，其中 \(s\) 表示 SAM 定义的语义层级。渲染时语言特征与 RGB 一样按可见性和不透明度合成：

$$
\mathbf{L}^s(p)=\sum_{i\in \mathcal{N}(p)} T_i \alpha_i \mathbf{l}_i^s,\quad
T_i=\prod_{j<i}(1-\alpha_j)
$$

这里 \(\mathcal{N}(p)\) 是覆盖像素 \(p\) 的高斯集合，\(\alpha_i\) 是投影后高斯的不透明度贡献。直觉上，语言特征不再通过 MLP 对每个采样点查询，而是被显式绑定在高斯 primitive 上，依靠 3DGS 的排序和 alpha compositing 得到像素级语义图。

##### SAM 层级语义与 CLIP 特征

论文用 SAM 的 mask 层级来替代手工 crop 尺度。对输入图像中的网格点提示，SAM 可以生成不同粒度的 mask：subpart、part、whole。LangSplat 对每个层级分别去重、过滤低质量 mask，然后对 mask 区域提取 CLIP 图像特征，并把该特征赋给 mask 内像素：

$$
\mathbf{f}^s(p)=E_{\text{CLIP}}\left(I \odot M^s(p)\right)
$$

这一步解决了两个问题。第一，mask 边界来自 SAM，不是方形 crop，因此像素监督更贴近物体轮廓。第二，层级由 SAM 显式给出，查询时只需要在少数语义层级上比较相关性，而不是像 LERF 那样密集搜索很多物理尺度。

##### 场景级自编码器

直接让每个高斯学习 512 维 CLIP embedding 会让显存、缓存和 rasterizer 带宽迅速膨胀。LangSplat 观察到单个场景里的语义区域远少于 CLIP 训练时覆盖的开放世界分布，因此可以训练一个场景级 autoencoder：

$$
\mathbf{z}=E_{\phi}(\mathbf{f}_{\text{CLIP}}),\quad
\hat{\mathbf{f}}_{\text{CLIP}}=D_{\psi}(\mathbf{z})
$$

$$
\mathcal{L}_{\text{AE}}=
\|\hat{\mathbf{f}}_{\text{CLIP}}-\mathbf{f}_{\text{CLIP}}\|_1+
\lambda\left(1-\cos(\hat{\mathbf{f}}_{\text{CLIP}},\mathbf{f}_{\text{CLIP}})\right)
$$

论文实现中将 CLIP 特征压缩到 3 维 latent，这不仅节省内存，也让 latent 可直接作为 RGB-like 通道可视化。训练语言高斯时，目标不再是原始 CLIP 向量，而是 autoencoder encoder 输出的低维 latent；推理时再用 decoder 回到 CLIP 空间，与文本 embedding 计算余弦相似度。

##### 训练与查询流程

LangSplat 通常不从零开始同时优化几何和语言，而是先使用标准 3DGS 获得高质量 RGB 高斯。随后固定高斯中心、协方差、不透明度等几何/外观参数，只优化语言 latent。这样做可以把语义学习限制在已有几何支架上，减少语言监督噪声对几何的破坏。

开放词表查询时，给定文本 \(q\)，使用 CLIP text encoder 得到 \(\mathbf{t}_q\)。模型对目标相机渲染三个层级的语言图，decoder 还原为 CLIP 特征图 \(\hat{\mathbf{F}}^s\)，再计算 relevancy：

$$
R^s(p,q)=\cos\left(\hat{\mathbf{F}}^s(p), \mathbf{t}_q\right)
$$

定位任务取相关性最高的 3D/2D 位置，分割任务对相关性图阈值化或选取最大响应区域。由于底层是 splatting，整个查询过程接近普通 3DGS 渲染，远快于多尺度 NeRF feature rendering。

> 💡 关键：LangSplat 的贡献不是“把 CLIP 特征塞进 3DGS”这么简单，而是同时处理了三件事：用 SAM 给出边界清晰的层级监督，用自编码器控制显式特征维度，用 3DGS rasterizer 保持高分辨率实时查询。

#### 🧪 练习题
```yaml
question: "LangSplat 使用场景级语言自编码器的主要目的是什么？"
options:
  - "把 RGB 图像压缩成低分辨率训练图"
  - "把高维 CLIP 特征压缩成场景特定低维 latent，降低显式高斯语言特征的存储和渲染成本"
  - "替代 SAM 完成图像分割"
  - "在没有相机位姿时估计 3DGS 的初始点云"
answer: 1
explain: "LangSplat 显式地为大量高斯存储语言特征，直接使用 512 维 CLIP 特征代价很高；场景级 autoencoder 利用单场景语义分布稀疏性，将特征压缩后再 splat。"
```

### Thermal3D-GS

```yaml
id: thermal3d_gs
num: 22
name: Thermal3D-GS
full_name: 热红外3D高斯 (Thermal3D-GS)
year: '2026'
org: IEEE
parent: 3dgs
paper_url: https://ieeexplore.ieee.org/abstract/document/11393601/
project_url: ''
category: gaussian_splatting
motivation: 物理驱动的热红外建模扩展至多物理模态
```

#### 📝 一句话总结
Thermal3D-GS 首次将热红外成像的物理先验（大气传输衰减与热传导效应）引入 3D Gaussian Splatting 框架，通过大气传输场（ATF）消除纤维状浮点伪影、热传导模块（TCM）修复模糊边缘，并结合不连续性损失增强温度一致性，在自建的 TI-NVS 数据集上实现了热红外新视角合成 PSNR 提升 3dB 以上的 SOTA 结果。

#### 🎯 核心要点
- **首个热红外 NVS 数据集 TI-NVS**：包含 9 个场景（室内 3 + 室外 3 + 无人机 3），每场景 6 台相机、约 120 张热红外图像，涵盖多样温度分布与拍摄条件
- **大气传输场 ATF**：基于 Bouguer-Lambert-Beer 定律，用 MLP 网络解耦几何与大气衰减系数 \((\mu_{abs}, \mu_{sca}, d)\)，消除因大气吸收/散射导致的纤维状浮点伪影（floaters）
- **热传导模块 TCM**：基于傅里叶热传导定律推导 2D 热传导方程 \(\frac{\partial u}{\partial t} = \alpha \Delta u\)，用 CNN 学习像素级热扩散系数 \(\alpha\)，通过残差机制修复热传导引起的边缘模糊
- **不连续性损失 \(\mathcal{L}_{dis}\)**：利用 Harris 角点检测响应加权 L1 损失，引导模型关注温度不连续区域，增强对异常区域的鲁棒性
- **总损失函数**：\(\mathcal{L}_{total} = \lambda_{dis}\mathcal{L}_{dis} + \lambda\mathcal{L}_{D\text{-}SSIM} + (1-\lambda_{dis}-\lambda)\mathcal{L}_1\)，其中 \(\lambda_{dis} = \lambda = 0.2\)
- **实验结果**：平均 PSNR 35.04 / SSIM 0.955 / LPIPS 0.187，较 3D-GS 基线分别提升 +3.03dB / +0.019 / -0.019

#### 🔬 深入细节
![Thermal3D-GS 框架总览](https://arxiv.org/html/2409.08042v1/x2.png)
*图：Thermal3D-GS 整体框架。左侧为 3D-GS 基础渲染管线，中间黄色框为大气传输场（ATF）对球谐系数的衰减优化，右侧蓝色框为热传导模块（TCM）对渲染图像的边缘修复，底部为不连续性损失约束。*

##### 动机与背景

热红外成像与可见光成像存在本质差异：热红外图像记录的是物体表面的热辐射强度而非反射光，其成像过程受到两个独特物理效应的显著影响：

1. **大气传输衰减**：热辐射在传播过程中被大气中的水蒸气、CO₂ 等温室气体吸收，同时被氮气、氧气分子和云粒子散射，导致辐射强度随传播距离衰减。这种衰减在不同空间位置和时间点各不相同（受温度、湿度等环境因素影响），使得 3D-GS 学习到错误的 3D 高斯（floaters）来补偿衰减差异。

2. **热传导效应**：高温物体通过分子振动向周围介质传热，导致物体边缘温度场发生扩散。在热红外图像中表现为边缘模糊，且不同视角下模糊程度不同。3D-GS 在多视角优化中会对这些不一致的边缘取"平均"，进一步加剧模糊。

传统的 3D-GS 和 NeRF 方法未考虑这些热红外特有的物理效应，直接应用会产生严重的浮点伪影和边缘模糊。

##### 核心机制一：大气传输场（ATF）

ATF 的物理基础是 **Bouguer-Lambert-Beer 定律**，描述辐射在介质中的指数衰减：

$$I = I_0 \cdot e^{\mu(\lambda) \cdot d}$$

其中 \(I_0\) 为初始辐射强度，\(\mu = \mu_{abs} + \mu_{sca}\) 为介质衰减系数（吸收 + 散射），\(d\) 为传播距离。

**关键设计思路**：将衰减效应与几何解耦。每个 3D 高斯代表空间中一小块连续区域，共享均匀的衰减系数。ATF 使用一个 8 层、256 维隐藏层的 MLP 网络，输入为位置编码后的 3D 高斯位置 \(\gamma(x)\) 和归一化拍摄时间 \(\gamma(t)\)（\(L=10\) 频率），输出衰减参数：

$$(\mu_{abs}, \mu_{sca}, d) = \mathscr{F}_{ATF}(\gamma(x), \gamma(t))$$

衰减后的球谐系数为：

$$SH = SH_0 \cdot e^{(\mu_{abs} + \mu_{sca}) \cdot d}$$

> 💡 **关键直觉**：引入时间维度 \(t\) 是因为大气条件（温度、湿度）随时间变化，不同帧的衰减系数不同。初始化时 \(\mu_{abs} = \mu_{sca} = 0, d = 1\)，即无衰减状态，让网络从零学习衰减量。

##### 核心机制二：热传导模块（TCM）

TCM 的物理基础是 **傅里叶热传导定律**。在 2D 温度场中，热传导方程为：

$$\frac{\partial u}{\partial t} = \alpha \Delta u = \frac{k}{c\rho}\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2}\right)$$

其中 \(u(t,x,y)\) 为温度分布，\(\alpha = k/(c\rho)\) 为热扩散系数，\(k\) 为热传导系数，\(c\) 为比热容，\(\rho\) 为密度。

该方程表明：热传导对热成像的影响由常数 \(\alpha\) 和温度场的二阶微分（拉普拉斯算子）共同决定。

**关键设计思路**：由于 \(\alpha\) 在不同像素位置具有异质性（不同材质的热扩散系数不同），传统物理方法难以精确建模。TCM 采用深度学习方法：

```python
# TCM 热传导模块伪代码
def TCM(rendered_image):
    # 1. 提取二阶梯度特征（模拟拉普拉斯算子）
    grad_x2 = second_order_gradient_x(rendered_image)
    grad_y2 = second_order_gradient_y(rendered_image)
    laplacian_features = concat(grad_x2, grad_y2)
    
    # 2. 用 3 层 CNN 融合原图与梯度信息
    # 学习像素级 α 并生成残差修正
    fused = concat(rendered_image, laplacian_features)  # [2n, H, W]
    residual = conv_block_1(fused)   # [2n] -> [n]
    residual = conv_block_2(residual) # [n] -> [n]
    residual = conv_block_3(residual) # [n] -> [n]
    
    # 3. 残差添加修复热传导引起的边缘模糊
    refined_image = rendered_image + residual
    return refined_image
```

> 💡 **关键直觉**：TCM 本质上是在学习一个像素级的"热传导逆过程"——已知渲染图像是热传导后的模糊结果，通过学习二阶梯度与原图的关系来恢复清晰边缘。

##### 核心机制三：不连续性损失

热红外图像中，物体表面温度通常平滑连续变化。图像中出现的"角点"（温度突变）更可能是模型学习错误的标志。基于此观察，利用 **Harris 角点检测**构建不连续性损失：

$$\mathcal{L}_{dis} = \frac{R}{R_{max}} \cdot \max\left(1 - \frac{i}{iter_t}, 0\right) \cdot \mathcal{L}_1$$

其中：
- \(R = \det(M) - k \cdot (\text{trace}(M))^2\) 为 Harris 角点响应函数
- \(R/R_{max}\) 为归一化角点响应，表示该像素是角点的概率
- \(\max(1 - i/iter_t, 0)\) 为训练迭代衰减因子（\(iter_t = 5000\)），使该损失在训练早期起主导作用
- \(\mathcal{L}_1\) 为生成图像与真值的绝对误差

> ⚠️ **注意**：衰减因子的设计意味着不连续性损失仅在前 5000 次迭代中生效，之后完全衰减为 0。这是因为训练早期模型容易产生大量伪影角点，需要额外约束；后期模型已基本收敛，过多约束反而限制细节学习。

##### 训练流程

1. **输入**：多视角热红外图像 + SfM 点云初始化
2. **3D-GS 渲染**：标准高斯光栅化得到初始渲染图像和球谐系数 \(SH_0\)
3. **ATF 优化**：MLP 网络根据高斯位置和时间预测衰减系数，修正 \(SH_0 \to SH\)
4. **重新渲染**：使用修正后的球谐系数进行光栅化
5. **TCM 精修**：CNN 对渲染图像进行边缘修复
6. **损失计算**：\(\mathcal{L}_{total} = 0.2\mathcal{L}_{dis} + 0.2\mathcal{L}_{D\text{-}SSIM} + 0.6\mathcal{L}_1\)
7. **优化**：Adam 优化器，3D 高斯和 TCM 共享学习率，ATF 学习率从 \(8 \times 10^{-4}\) 指数衰减到 \(1.6 \times 10^{-6}\)，共 30,000 次迭代

##### 与传统方法的对比

| 方法 | 处理大气衰减 | 处理热传导 | 温度一致性 | Avg PSNR |
|------|:-----------:|:---------:|:---------:|:--------:|
| Plenoxels | ✗ | ✗ | ✗ | 23.28 |
| InstantNGP-Big | ✗ | ✗ | ✗ | 24.91 |
| 3D-GS (30k) | ✗ | ✗ | ✗ | 32.01 |
| **Thermal3D-GS** | **ATF** | **TCM** | **\(\mathcal{L}_{dis}\)** | **35.04** |

消融实验表明：ATF 主要消除纤维状浮点伪影（floaters），TCM 主要修复模糊边缘，不连续性损失提升整体鲁棒性。三个模块协同工作，缺一不可。

#### 🧪 练习题
```yaml
question: "Thermal3D-GS 中大气传输场（ATF）的 MLP 网络输入包含哪些信息？"
options:
  - "仅 3D 高斯的位置编码 γ(x)"
  - "3D 高斯的位置编码 γ(x) 和归一化拍摄时间 γ(t)"
  - "渲染图像的像素坐标和温度值"
  - "3D 高斯的球谐系数 SH 和不透明度 α"
answer: 1
explain: "ATF 网络输入为位置编码后的 3D 高斯空间位置 γ(x) 和归一化拍摄时间 γ(t)，因为大气衰减系数同时取决于空间位置（不同区域的大气成分不同）和时间（温度、湿度等环境条件随时间变化）。"
```

### USGS

```yaml
id: usgs
num: 23
name: USGS
full_name: 稀疏视角高斯泼溅 (USGS)
year: '2026'
org: arXiv
parent: 3dgs
paper_url: https://arxiv.org/abs/2601.xxxxx
project_url: ''
category: gaussian_splatting
motivation: 正则化技术优化稀疏视角下的重建质量
```

#### 📝 一句话总结
USGS 指向 “Enhancing sparse view synthesis with unseen viewpoint regularization in 3D Gaussian splatting”，核心思想是在 3DGS 的稀疏视角训练中引入未见视角正则，缓解少量输入视角导致的过拟合、几何漂移和新视角伪影。

#### 🎯 核心要点
- **稀疏视角 3DGS 问题**：标准 3DGS 依赖密集相机覆盖，少视角下高斯容易只拟合训练视图而无法泛化到未见视角
- **未见视角正则**：围绕训练相机或场景包围盒采样虚拟视角，在这些视角上约束渲染结果的几何/外观一致性
- **面向泛化的优化目标**：训练损失不只包含输入视图 photometric loss，还加入未见视角上的平滑、深度、结构或跨视角一致性项
- **兼容 3DGS 管线**：保留高斯中心、协方差、不透明度、球谐颜色和 densification/pruning 机制，只在优化中增强监督
- **针对稀疏退化**：重点抑制浮动高斯、过大高斯椭球、背景雾化、纹理粘连和新视角空洞等少视角常见问题
- **公开元信息修正**：用户给定 arXiv 链接为占位符；可检索到的正式记录是 Pattern Recognition 170:112087，DOI 10.1016/j.patcog.2025.112087

#### 🔬 深入细节
##### 核心示意图

![3DGS 基底流程图](https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x1.png)
*图：3D Gaussian Splatting 原始方法的公开示意图。USGS 的论文链接目前是占位符，公开全文图不可稳定访问；这里用 3DGS 基底流程说明其插入位置：USGS 仍优化显式高斯集合，但在训练视图之外加入未见视角正则。*

##### 算法伪代码

```python
# USGS 风格的未见视角正则化训练伪代码
def train_usgs_sparse(images, cameras, sparse_colmap_points):
    gaussians = initialize_from_sparse_points(sparse_colmap_points)

    for step in range(num_steps):
        cam_gt, image_gt = sample_training_view(cameras, images)
        render_gt = render_3dgs(gaussians, cam_gt)
        photo_loss = l1_ssim(render_gt.rgb, image_gt)

        # 在训练相机附近或相机轨迹间插值采样未见视角
        cam_unseen = sample_unseen_view(cameras, mode="interpolate_or_perturb")
        render_unseen = render_3dgs(gaussians, cam_unseen)

        # 正则项的公开细节有限，这里按“unseen viewpoint regularization”的核心整理
        depth_reg = local_depth_smoothness(render_unseen.depth)
        opacity_reg = suppress_floating_opacity(render_unseen.alpha)
        consistency_reg = cross_view_consistency(
            render_unseen,
            nearest_training_views=cameras,
        )

        loss = photo_loss \
             + lambda_d * depth_reg \
             + lambda_o * opacity_reg \
             + lambda_c * consistency_reg

        update_gaussians(gaussians, loss)

        if should_densify(step):
            densify_and_prune_with_sparse_view_guards(gaussians)

    return gaussians
```

##### 动机与背景

3DGS 在密集输入视角下表现很好，因为每个高斯 primitive 能被多个视角反复约束：中心位置由多视角几何收敛，协方差由投影误差塑形，不透明度和颜色由多视角 photometric loss 共同修正。稀疏视角下这些条件不成立。某个高斯可能只在一两张训练图中可见，优化器只需要让训练图像素误差下降，就能把高斯放到错误深度或拉成过大的椭球；从训练相机看似乎正确，换到未见视角就出现雾状漂浮物、破碎几何或背景纹理粘到前景上。

USGS 的标题把关键设计写得很直接：用 unseen viewpoint regularization 增强 sparse view synthesis。也就是说，训练时不要只问“在已有相机上是否重建得像”，还要问“从没有图像监督的邻近视角看是否仍像一个合理的 3D 场景”。这类方法的核心不是替换 3DGS 表示，而是在优化目标中加入未见视角上的几何和外观约束。

##### 3DGS 基础目标

标准 3DGS 把场景表示为高斯集合：

$$
G_i=\{\boldsymbol{\mu}_i,\mathbf{\Sigma}_i,\alpha_i,\mathbf{c}_i\}
$$

渲染到像素 \(p\) 时，按深度排序进行 alpha compositing：

$$
C(p)=\sum_{i\in \mathcal{N}(p)} T_i \alpha_i \mathbf{c}_i,\quad
T_i=\prod_{j<i}(1-\alpha_j)
$$

密集视角训练通常优化：

$$
\mathcal{L}_{\text{photo}}=(1-\lambda)\|I-\hat{I}\|_1+\lambda \mathcal{L}_{\text{D-SSIM}}
$$

稀疏视角下，仅靠 \(\mathcal{L}_{\text{photo}}\) 是欠约束的。USGS 类方法会扩展为：

$$
\mathcal{L}=
\mathcal{L}_{\text{photo}}+
\lambda_u\mathcal{L}_{\text{unseen}}+
\lambda_g\mathcal{L}_{\text{geometry}}
$$

其中 \(\mathcal{L}_{\text{unseen}}\) 在虚拟相机上计算，用来惩罚不稳定的未见视角渲染；\(\mathcal{L}_{\text{geometry}}\) 通常约束深度平滑、法向一致、局部尺度或 opacity 分布。由于公开全文不可访问，具体项名和公式应以正式论文为准；这里给出的是与题名和 3DGS 稀疏视角问题一致的机制解读。

##### 未见视角正则的直觉

未见视角可以由相机插值、邻近训练视角扰动、围绕场景中心的小幅轨道采样等方式生成。虽然这些视角没有真实 RGB 标签，但它们仍能产生自监督约束。例如，一个合理表面在相邻虚拟视角下的深度应该局部连续；同一个 3D 高斯投影到两个相近视角时，外观和 alpha 分布不应剧烈跳变；背景区域不应被高 opacity 的漂浮高斯覆盖。

可以把 USGS 看成给 3DGS 增加“反过拟合压力”。训练视图 photometric loss 会推动模型解释已有像素，未见视角正则则阻止模型用只对训练视图成立的投机几何来解释像素。二者平衡后，高斯更倾向于落在真实表面附近，而不是漂浮在相机前方或被拉成过大的半透明面片。

##### 与其他稀疏 3DGS 方法的区别

不少稀疏 3DGS 方法依赖外部深度估计、双模型 co-regularization、dropout、语义先验或扩散模型生成伪视图。USGS 的题名强调 unseen viewpoint regularization，因此重点更像是“从训练视图之外增加约束”，而不是完全依赖额外传感器或生成模型。它的优势是工程上容易接入现有 3DGS 优化循环：渲染虚拟视角、计算正则、反向传播即可。

> ⚠️ 注意：用户给定的 `https://arxiv.org/abs/2601.xxxxx` 明显是占位符。本文档保留输入 YAML 以满足交付规范；正文方法细节基于可检索 DOI 元信息、题名和稀疏视角 3DGS 的公开技术背景整理，不把未公开公式伪装成已核验论文原文。

#### 🧪 练习题
```yaml
question: "USGS 中“未见视角正则”的核心作用是什么？"
options:
  - "让 3DGS 只优化训练图像的 RGB 重建误差"
  - "在没有真实图像监督的虚拟视角上约束几何和渲染一致性，减少稀疏视角过拟合"
  - "把所有高斯替换为 NeRF MLP"
  - "用文本提示生成 3D 物体"
answer: 1
explain: "稀疏视角下训练图像误差不足以约束真实几何；未见视角正则通过虚拟相机检查渲染稳定性，使高斯分布更符合可泛化的 3D 结构。"
```

### COLMAP

```yaml
id: colmap
num: 24
name: COLMAP
full_name: 增量式运动恢复结构 (COLMAP)
year: '2016'
org: ETH Zurich
parent: —
paper_url: https://colmap.github.io/
project_url: ''
category: reconstruction
motivation: 增量式SfM成为三维重建的工业标准工具
```

#### 📝 一句话总结
COLMAP 提出了一套完整的增量式 Structure-from-Motion 流水线，通过**场景图增强**、**鲁棒的下一最佳视图选择**、**鲁棒三角化**、**迭代式 Bundle Adjustment** 和**冗余视图挖掘**五大改进，系统性地解决了增量式 SfM 在鲁棒性、完整性和可扩展性上的核心挑战，成为三维重建领域事实上的工业标准工具。

#### 🎯 核心要点
- **增量式 SfM 完整流水线**：对应搜索（特征提取→匹配→几何验证）和增量重建（初始化→图像注册→三角化→BA→滤波）两大阶段
- **场景图增强**：多模型几何验证（同时拟合 F/H/E/H+E），检测并剔除 WTF（水印/时间戳/边框）导致的虚假匹配
- **下一最佳视图（NBV）选择**：基于多分辨率网格的评分函数，同时优化可见 3D 点数量和空间分布均匀性，避免退化配置
- **鲁棒三角化**：RANSAC 采样 + 递归恢复多 inlier 集合，结合角度约束和正深度约束，最大化三角化成功率
- **迭代式 BA + 重三角化 + 滤波**：每次注册后执行局部/全局 BA，交替进行重三角化和观测滤波，持续优化模型
- **冗余视图挖掘**：基于可见性向量聚类高重叠相机，将组内相机参数化为单一相机，大幅加速大规模 BA
- **使用 SIFT 特征 + Ceres Solver**，支持自标定（焦距、径向畸变等）

#### 🔬 深入细节
##### 总体框架

![COLMAP SfM Pipeline](colmap_pipeline.png)
*图 1：COLMAP 增量式 SfM 流水线总览（论文 Figure 1）。左侧为对应搜索阶段（特征提取、匹配、几何验证），右侧为增量重建阶段（初始化、注册、三角化、BA、滤波的迭代循环）。*

> 💡 **关键直觉**：增量式 SfM 的核心思想是"逐步生长"——从一对初始图像开始重建，每次选择最优的下一张图像加入模型，通过三角化扩展 3D 点云，再用 Bundle Adjustment 全局优化。COLMAP 的贡献在于让这个过程的每一步都更加鲁棒和高效。

##### 算法伪代码

```python
# COLMAP 增量式 SfM 核心流程
def incremental_sfm(images, features, matches):
    # === 阶段一：对应搜索 ===
    scene_graph = build_scene_graph(images, features, matches)
    scene_graph = geometric_verification(scene_graph)  # 多模型: F/H/E
    scene_graph = filter_wtf(scene_graph)               # 剔除水印/时间戳匹配

    # === 阶段二：增量重建 ===
    # 1. 初始化：选择最佳图像对
    (img_i, img_j) = select_initial_pair(scene_graph)   # 多 inlier + 足够基线
    model = initialize(img_i, img_j)                     # 两视图重建

    # 2. 迭代注册
    while has_unregistered_images():
        img_next = next_best_view(model, scene_graph)    # 多分辨率网格评分
        pose = register_image(img_next, model)           # PnP + RANSAC
        
        triangulate_new_points(model, img_next)          # 鲁棒三角化
        
        # 3. 迭代优化
        bundle_adjustment(model, local=True)             # 局部 BA
        if should_global_ba():
            re_triangulate(model)                        # 重三角化
            filter_observations(model)                   # 滤波
            bundle_adjustment(model, local=False)        # 全局 BA
    
    return model
```

##### 动机与背景

增量式 SfM 是从无序图像集合恢复相机位姿和稀疏 3D 结构的经典方法。尽管此前已有 Bundler、VisualSFM 等工具，但它们在以下方面存在显著不足：

1. **鲁棒性不足**：初始化失败、退化配置（如纯旋转运动）、错误匹配累积等问题频繁导致重建失败
2. **完整性不够**：许多图像无法成功注册，三角化的 3D 点不够密集
3. **可扩展性差**：随着图像数量增长，Bundle Adjustment 的计算开销急剧增加

COLMAP 针对这三个核心挑战，在 SfM 流水线的每个关键环节都提出了改进方案。

##### 核心机制一：场景图增强

传统方法仅使用基础矩阵 \(F\) 进行几何验证。COLMAP 提出**多模型几何验证**策略：

对每对图像同时估计多种几何模型：
- **基础矩阵 \(F\)**：适用于一般运动
- **单应矩阵 \(H\)**：适用于纯旋转或平面场景
- **本质矩阵 \(E\)**：已标定相机的一般运动
- **混合模型 \(H + E\)**：部分平面 + 一般运动

通过 GRIC（Geometric Robust Information Criterion）选择最优模型，避免将纯旋转运动误判为有平移的情况。

> ⚠️ **注意**：纯旋转运动下基线为零，三角化会产生无穷远点。正确识别这种退化配置对于避免灾难性的初始化失败至关重要。

此外，COLMAP 引入 **WTF 检测**（Watermarks, Timestamps, Frames）：互联网照片中常见的水印、时间戳和相框会导致大量虚假匹配。通过分析匹配点的空间分布模式（WTF 匹配通常集中在图像边缘的固定区域），自动检测并剔除这类干扰。

##### 核心机制二：下一最佳视图选择

NBV 选择决定了增量重建的顺序，直接影响重建质量。COLMAP 的评分函数同时考虑**数量**和**分布**：

$$S(I_i) = \sum_{l=1}^{L} 2^{L-l} \cdot N_l(I_i)$$

其中 \(L\) 是网格分辨率层数，\(N_l(I_i)\) 是在第 \(l\) 层网格中至少包含一个可见 3D 点的网格单元数。

> 💡 **关键**：这个多分辨率设计的巧妙之处在于——高分辨率层（大 \(l\)）的权重低，鼓励点的数量；低分辨率层（小 \(l\)）的权重高，鼓励点的空间均匀分布。这样既避免了选择只能看到少量点的图像，也避免了选择所有点都聚集在一小块区域的图像（后者会导致 PnP 求解的数值不稳定）。

##### 核心机制三：鲁棒三角化

传统三角化方法对每对观测只尝试一次，失败则放弃。COLMAP 提出**RANSAC + 递归多点恢复**策略：

1. 对一个 3D 点的所有观测，用 RANSAC 采样两个观测进行三角化
2. 验证三角化结果需满足：
   - **充分三角化角度**：两条射线的夹角 \(\alpha\) 需满足：

$$\alpha > \alpha_{\min}$$

   - **正深度约束**：点在两个相机前方
   - **重投影误差约束**：误差小于阈值
3. 找到最大一致集后，**递归地**对剩余观测继续三角化，恢复可能被 RANSAC 遗漏的其他有效 inlier 子集

> 💡 **关键**：递归恢复机制的价值在于——同一个特征轨迹（track）中可能混入了错误匹配，传统方法会因为这些 outlier 而整体失败。COLMAP 通过 RANSAC 隔离 outlier，并递归尝试恢复所有可能的有效三角化，最大化 3D 点的产出。

##### 核心机制四：迭代式 Bundle Adjustment

Bundle Adjustment 是 SfM 的核心优化步骤，最小化所有观测的重投影误差：

$$E = \sum_{j} \rho_j \left( \left\| \pi(P_c, X_k) - x_j \right\|_2^2 \right)$$

其中 \(\pi\) 是投影函数，\(P_c \in SE(3)\) 是相机位姿，\(X_k \in \mathbb{R}^3\) 是 3D 点坐标，\(x_j\) 是 2D 观测，\(\rho_j\) 是 Cauchy 鲁棒核函数（抑制 outlier 的影响）。

COLMAP 的关键创新是将 BA 与**重三角化**和**观测滤波**交替执行：

1. **局部 BA**：每次注册新图像后，仅优化新图像及其邻域的参数
2. **全局 BA**：定期优化所有参数，同时自标定相机内参（焦距 \(f\)、主点 \((c_x, c_y)\)、径向畸变 \(k_1, k_2\)）
3. **重三角化**：BA 优化后相机参数更准确，之前失败的三角化可能成功，同时合并重叠的 3D 点
4. **观测滤波**：剔除重投影误差过大或三角化角度不足的观测，防止错误累积

> ⚠️ **注意**：BA 使用 Ceres Solver 求解，利用 Schur 补（先消去 3D 点参数，求解相机参数的 reduced camera system）来高效处理稀疏结构。

##### 核心机制五：冗余视图挖掘

对于大规模场景（数千张图像），全局 BA 的计算开销是主要瓶颈。COLMAP 观察到：

1. 增量扩展通常是局部的，大部分场景在最新扩展后未受影响
2. 互联网照片集合中存在大量冗余视角

基于此，COLMAP 将未受影响的图像聚类为高重叠组。两张图像 \(a\) 和 \(b\) 的重叠度定义为：

$$V_{ab} = \frac{\|v_a \wedge v_b\|}{\|v_a \vee v_b\|}$$

其中 \(v_i \in \{0,1\}^{N_X}\) 是图像 \(i\) 的二值可见性向量。组内所有相机被参数化为一个公共的组坐标系 \(G_r \in SE(3)\)，组内各相机相对于组坐标系的位姿 \(P_c\) 固定不变。分组后的 BA 目标函数为：

$$E_g = \sum_j \rho_j \left( \left\| \pi_g(G_r, P_c, X_k) - x_j \right\|_2^2 \right)$$

其中投影矩阵为 \(P_{cr} = P_c G_r\)，即组内相机位姿与组位姿的级联。

> 💡 **关键**：这种分组策略将 BA 中的相机参数数量从 \(N\) 降低到 \(N_G + N_{\text{affected}}\)（组数 + 受影响的独立相机数），在保持精度的同时大幅提升了计算效率。

##### 与传统方法的对比

| 特性 | Bundler | VisualSFM | COLMAP |
|------|---------|-----------|--------|
| 几何验证 | 仅 \(F\) | 仅 \(F\) | 多模型 \(F/H/E\) |
| NBV 选择 | 仅点数量 | 仅点数量 | 数量 + 分布均匀性 |
| 三角化 | 单次尝试 | 单次尝试 | RANSAC + 递归恢复 |
| BA 策略 | 全局 BA | 局部 BA | 迭代 BA + 重三角化 + 滤波 |
| 冗余处理 | 无 | 无 | 视图分组加速 |
| 完整性 | 低 | 中 | 高（注册率最高） |

实验表明，COLMAP 在多个基准数据集上实现了最高的图像注册率和最密集的 3D 点云，同时保持了最低的重投影误差（通常 < 1 像素）。在包含 1000+ 张图像的大规模场景中，冗余视图挖掘带来了显著的加速效果。

#### 🧪 练习题
```yaml
question: "COLMAP 的下一最佳视图（NBV）选择评分函数使用多分辨率网格的主要目的是什么？"
options:
  - "加快评分计算速度"
  - "同时优化可见3D点的数量和空间分布均匀性"
  - "检测并剔除水印和时间戳导致的虚假匹配"
  - "减少 Bundle Adjustment 的计算开销"
answer: 1
explain: "多分辨率网格评分函数通过低分辨率层赋予高权重来鼓励空间均匀分布，通过高分辨率层计数来鼓励点的数量，从而避免选择退化配置的视图。"
```

### MVSNet

```yaml
id: mvsnet
num: 25
name: MVSNet
full_name: 多视角立体网络 (MVSNet)
year: '2018'
org: HKUST
parent: colmap
paper_url: https://arxiv.org/abs/1804.02505
project_url: ''
category: reconstruction
motivation: 深度学习驱动的多视角立体重建
```

#### 📝 一句话总结
MVSNet 提出端到端的多视角深度估计网络，通过可微单应性 warping 在参考相机视锥中构建 3D cost volume，再用 3D CNN 正则化和 soft argmin 回归深度图，解决传统 MVS 手工匹配和规则体素内存开销大的问题。

#### 🎯 核心要点
- **逐参考视图深度估计**：一次预测一个 reference image 的深度图，再通过深度融合得到点云
- **可微 homography warping**：根据相机内外参和候选深度平面，把 source view 特征投影到 reference frustum
- **variance-based cost metric**：用多视角特征方差聚合任意数量 source views，避免固定视角数限制
- **3D cost volume 正则化**：用 encoder-decoder 3D CNN 聚合空间和深度维上下文，输出深度概率体
- **soft argmin 深度回归**：对深度假设的概率分布求期望，得到连续深度估计
- **refinement network**：用参考图像和初始深度图细化边界区域
- **基准结果**：在 DTU 上训练评估，并在 Tanks and Temples 上展示无需微调的泛化能力

#### 🔬 深入细节
##### 核心示意图

![MVSNet 网络结构](https://ar5iv.labs.arxiv.org/html/1804.02505/assets/x1.png)
*图：MVSNet 先提取 2D 图像特征，再通过可微 homography warping 构建 reference frustum 上的 cost volume，经过 3D CNN 正则化后回归深度图，并用参考图像细化边界。*

##### 算法伪代码

```python
# MVSNet 单参考视图深度估计伪代码
def mvsnet(reference, sources, ref_cam, src_cams, depth_values):
    ref_feat = feature_net(reference)
    src_feats = [feature_net(img) for img in sources]

    warped_volumes = []
    for feat, src_cam in zip(src_feats, src_cams):
        planes = []
        for d in depth_values:
            H = homography(ref_cam, src_cam, depth=d)
            planes.append(warp(feat, H))
        warped_volumes.append(stack(planes, dim="depth"))

    ref_volume = repeat_along_depth(ref_feat, len(depth_values))
    all_volumes = [ref_volume] + warped_volumes
    cost_volume = variance(all_volumes, dim="view")

    prob_volume = softmax(cost_regularization_3dcnn(cost_volume), dim="depth")
    depth = sum(prob_volume[d] * depth_values[d] for d in range(len(depth_values)))
    confidence = probability_around_argmax(prob_volume)
    refined_depth = refinement_net(reference, depth)
    return refined_depth, confidence
```

##### 动机与背景

传统 MVS 依赖手工相似性度量、窗口匹配、传播和滤波。它们在 Lambertian 表面和纹理丰富区域表现很好，但遇到低纹理、反光、重复纹理或遮挡时容易失败。早期学习式 MVS 如 SurfaceNet/LSM 尝试在规则 3D 体素中做学习，但规则体素内存随空间分辨率立方增长，难以扩展到真实大场景。

MVSNet 的关键工程选择是把三维重建拆成“每个参考视图一张深度图”。深度图处在参考相机视锥中，分辨率是 \(H\times W\times D\)，比完整世界坐标体素更紧凑，也自然适配多视角图像投影。最终只需把多个参考视图的深度图做几何一致性筛选和融合，就能得到稠密点云。

##### 可微 homography warping

对参考视图像素 \(\mathbf{x}\) 和候选深度 \(d\)，MVSNet 将该点对应的 3D 点投影到第 \(i\) 个源视图。这个投影可写成深度相关单应矩阵：

$$
\mathbf{x}' \sim \mathbf{H}_i(d)\mathbf{x}
$$

论文给出的形式为：

$$
\mathbf{H}_{i}(d)=\mathbf{K}_{i}\mathbf{R}_{i}
\left(\mathbf{I}-\frac{(\mathbf{t}_{1}-\mathbf{t}_{i})\mathbf{n}_{1}^{T}}{d}\right)
\mathbf{R}_{1}^{T}\mathbf{K}_{1}^{T}
$$

直觉上，每个深度平面都定义了一次从 reference feature map 到 source feature map 的对齐。如果候选深度正确，多视图特征会在该深度平面上对齐；如果深度错误，特征方差会变大。

##### 多视图 cost volume

MVSNet 对所有 warped feature volume 计算方差：

$$
\mathbf{C}=\frac{1}{N}\sum_{i=1}^{N}(\mathbf{V}_i-\bar{\mathbf{V}})^2
$$

方差聚合有两个好处。第一，它对输入视角数量 \(N\) 不敏感，可以处理任意数量的 source views。第二，它直接度量多视图特征的一致性：真实表面深度处特征更一致，错误深度处特征分散。

随后 3D CNN 在 \((u,v,d)\) 三个维度上正则化 cost volume，把局部纹理、深度邻域和空间上下文结合起来。输出经 softmax 得到每个像素的深度概率分布 \(P(d)\)，再用 soft argmin/期望回归：

$$
\hat{d}=\sum_{j=1}^{D} d_j P(d_j)
$$

##### 训练与推理流程

训练阶段使用 DTU 数据集的多视角图像、相机参数和真实深度监督。损失通常为预测深度与真实深度的 \(L_1\)：

$$
\mathcal{L}=\sum_{\mathbf{x}\in \Omega}\left|\hat{d}(\mathbf{x})-d^*(\mathbf{x})\right|
$$

推理阶段对每张图选择若干邻近源视图，预测参考深度图和 confidence。后处理会基于 photometric confidence 与几何一致性过滤低质量深度，再把多个深度图反投影并融合成点云。

MVSNet 与 COLMAP 的关系可以理解为“学习式深度估计模块替代传统 PatchMatch MVS 的核心匹配过程”。COLMAP 仍常用于相机位姿和稀疏点初始化，而 MVSNet 用神经网络完成密集深度推断。

> 💡 关键：MVSNet 的突破不是单纯使用 CNN，而是把相机几何显式写进网络的 cost volume 构建过程，使网络既可端到端学习，又不丢掉多视角投影约束。

#### 🧪 练习题
```yaml
question: "MVSNet 为什么使用 variance-based cost metric 聚合多视角特征？"
options:
  - "为了让网络只能处理固定两个视角"
  - "为了用特征方差度量多视图一致性，并支持任意数量的 source views"
  - "为了避免使用相机内外参"
  - "为了直接输出三角网格"
answer: 1
explain: "正确深度处 warped features 应该一致，方差较小；方差聚合还能自然适配不同数量的输入视角。"
```

### DeepSDF

```yaml
id: deepsdf
num: 26
name: DeepSDF
full_name: 深度符号距离场 (DeepSDF)
year: '2019'
org: UW
parent: —
paper_url: https://arxiv.org/abs/1901.05103
project_url: ''
category: reconstruction
motivation: 连续SDF+自解码器架构开创神经隐式表示
```

#### 📝 一句话总结
DeepSDF 提出用深度神经网络直接回归连续的签名距离函数（Signed Distance Function），并设计了 auto-decoder 架构联合优化形状潜码与网络参数，实现了高质量的三维形状表示、重建与生成，开创了神经隐式三维表示这一研究方向。

#### 🎯 核心要点
- **连续隐式表示**：用神经网络 \(f_\theta(\mathbf{z}, \mathbf{x}) \to s\) 将三维点映射为签名距离值，取代离散体素/点云/网格表示
- **Clamped L1 损失**：对 SDF 值进行截断（\(\delta = 0.1\)），聚焦表面附近区域的精确重建
- **Auto-Decoder 架构**：摒弃编码器，直接将潜码 \(\mathbf{z}_i\) 作为可优化参数，与网络权重 \(\theta\) 联合训练
- **MAP 推理**：固定训练好的 \(\theta\) 后，通过梯度下降优化潜码 \(\hat{\mathbf{z}}\) 来表示新形状
- **高斯先验正则**：对潜码施加零均值球形高斯先验 \(\frac{1}{\sigma^2}\|\mathbf{z}\|_2^2\)，约束潜空间紧凑性
- **网络结构**：8 层全连接网络（512 维），第 4 层 skip connection，weight normalization，tanh 输出
- **数据集与评估**：在 ShapeNet 上进行已知形状表示、未知形状重建、部分形状补全、形状采样四项实验，对比 OGN、AtlasNet、3D-EPN

#### 🔬 深入细节
##### 核心框架图

![DeepSDF 框架概览](https://ar5iv.labs.arxiv.org/html/1901.05103/assets/x1.png)
*图：DeepSDF 将三维形状表示为连续的签名距离函数。左侧展示 SDF 的连续场表示，右侧展示从潜空间中不同潜码解码出的形状。*

![DeepSDF 网络架构与 Auto-Decoder 训练流程](https://ar5iv.labs.arxiv.org/html/1901.05103/assets/x2.png)
*图：DeepSDF 的三种使用模式——单形状推理、auto-decoder 训练、auto-decoder 推理（MAP 估计）。*

##### 算法伪代码

```python
# ===== 训练阶段 (Auto-Decoder) =====
# 初始化
theta = init_network_params()          # 8层FC网络参数
Z = {z_i ~ N(0, 0.01²I) for i in 1..N}  # N个形状的潜码

for epoch in range(num_epochs):
    for shape_i, samples_Xi in dataloader:
        z_i = Z[shape_i]                # 取出该形状的潜码
        for (x_j, s_j) in samples_Xi:   # 采样的(点, SDF值)对
            s_pred = f_theta(z_i, x_j)  # 网络前向
            loss_j = |clamp(s_pred, δ) - clamp(s_j, δ)|  # Clamped L1
        
        loss = sum(loss_j) + (1/σ²) * ||z_i||²  # 加正则项
        loss.backward()                 # 同时更新 theta 和 z_i
        optimizer.step()

# ===== 推理阶段 (MAP Estimation) =====
theta = freeze(theta)                  # 固定网络参数
z_hat = torch.zeros(latent_dim, requires_grad=True)

for step in range(inference_steps):
    loss = sum(|clamp(f_theta(z_hat, x_j), δ) - clamp(s_j, δ)|) \
           + (1/σ²) * ||z_hat||²
    loss.backward()                    # 仅更新 z_hat
    optimizer_z.step()

mesh = marching_cubes(lambda x: f_theta(z_hat, x))  # 提取零等值面
```

##### 动机与背景

传统三维形状表示方法——体素网格、点云、三角网格——均为**离散表示**，存在固有局限：

1. **体素网格**：内存随分辨率立方增长（\(O(n^3)\)），难以表示精细几何细节
2. **点云**：缺乏拓扑连接信息，无法直接定义封闭表面
3. **网格**：拓扑固定，难以处理亏格变化的形状

DeepSDF 的核心洞察是：**签名距离函数（SDF）本身是一个连续函数**，可以用神经网络来参数化。SDF 在物体内部为负、外部为正、表面为零，其零等值面天然定义了封闭的物体表面。这种表示具有**任意分辨率**、**天然封闭性**和**紧凑参数量**的优势。

##### 核心机制：从单一 SDF 到形状空间

**（1）单一形状的 SDF 回归**

对于单个形状，DeepSDF 训练一个网络 \(f_\theta\) 直接拟合其 SDF：

$$f_\theta(\mathbf{x}) = s, \quad \mathbf{x} \in \mathbb{R}^3, \; s \in \mathbb{R}$$

训练数据为从形状表面附近采样的点对集合 \(X = \{(\mathbf{x}_j, s_j)\}\)，其中 \(s_j\) 是点 \(\mathbf{x}_j\) 的真实 SDF 值。

> 💡 **关键设计——Clamped L1 Loss**：远离表面的点的 SDF 值对重建质量影响不大，因此对 SDF 值进行截断：

$$\mathcal{L}(\hat{s}, s) = |\text{clamp}(\hat{s}, \delta) - \text{clamp}(s, \delta)|, \quad \text{clamp}(x, \delta) = \min(\delta, \max(-\delta, x))$$

其中 \(\delta = 0.1\)。这使网络集中学习表面附近（\(|s| < \delta\)）的精确距离值，而非浪费容量在远处区域。

**（2）条件化形状空间（Coded DeepSDF）**

为了用**一个网络表示多个形状**，引入形状潜码 \(\mathbf{z}_i \in \mathbb{R}^{256}\)，网络变为条件模型：

$$f_\theta(\mathbf{z}_i, \mathbf{x}_j) \approx \text{SDF}^i(\mathbf{x}_j)$$

潜码 \(\mathbf{z}_i\) 与查询点 \(\mathbf{x}_j\) 拼接后输入网络。不同的 \(\mathbf{z}_i\) 对应不同的形状，网络学习了一个**连续的形状嵌入空间**。

**（3）Auto-Decoder 架构**

与 VAE 等编码器-解码器架构不同，DeepSDF 采用 **auto-decoder**：

- **无编码器**：潜码 \(\mathbf{z}_i\) 不由编码器生成，而是作为**自由参数**直接优化
- **联合训练**：网络参数 \(\theta\) 和所有潜码 \(\{\mathbf{z}_i\}_{i=1}^N\) 同时通过反向传播更新

训练目标（最大化后验概率的等价最小化形式）：

$$\arg\min_{\theta, \{\mathbf{z}_i\}_{i=1}^N} \sum_{i=1}^{N} \left( \sum_{j=1}^{K} \mathcal{L}(f_\theta(\mathbf{z}_i, \mathbf{x}_j), s_j) + \frac{1}{\sigma^2} \|\mathbf{z}_i\|_2^2 \right)$$

> ⚠️ **正则项的作用**：\(\frac{1}{\sigma^2}\|\mathbf{z}_i\|_2^2\) 来自零均值高斯先验 \(p(\mathbf{z}_i) = \mathcal{N}(\mathbf{0}, \sigma^2 \mathbf{I})\)。它防止潜码发散，确保潜空间紧凑且平滑，使得插值和采样有意义。

**（4）MAP 推理：表示新形状**

训练完成后固定 \(\theta\)，对新形状 \(X\)（可以是完整或部分观测），通过梯度下降优化潜码：

$$\hat{\mathbf{z}} = \arg\min_{\mathbf{z}} \sum_{(\mathbf{x}_j, \mathbf{s}_j) \in X} \mathcal{L}(f_\theta(\mathbf{z}, \mathbf{x}_j), s_j) + \frac{1}{\sigma^2}\|\mathbf{z}\|_2^2$$

这一过程类似测试时优化（test-time optimization），通常只需数百步即可收敛。最终通过 Marching Cubes 算法从 \(f_\theta(\hat{\mathbf{z}}, \cdot)\) 提取零等值面得到网格。

##### 网络架构细节

- **8 层全连接网络**，每层 512 维隐藏单元
- **Skip connection**：在第 4 层重新注入输入（\(\mathbf{z}\) 和 \(\mathbf{x}\) 的拼接），缓解梯度消失
- **激活函数**：隐藏层 ReLU，输出层 tanh（将输出约束在 \([-1, 1]\)）
- **Weight normalization**：替代 batch normalization，稳定训练
- **Dropout**：用于正则化
- **优化器**：Adam，学习率 \(5 \times 10^{-4}\)（网络）和 \(10^{-3}\)（潜码），每 500 epoch 衰减一半
- **潜码维度**：单类别 256 维，多类别 256 维

##### 与传统方法的对比

| 特性 | 体素方法 (OGN) | 网格方法 (AtlasNet) | **DeepSDF** |
|------|----------------|---------------------|-------------|
| 表示类型 | 离散体素 | 参数化表面片 | 连续隐式函数 |
| 分辨率 | 固定（如 \(64^3\)） | 固定采样点数 | **任意精度** |
| 拓扑约束 | 无 | 固定模板拓扑 | **无限制** |
| 内存效率 | \(O(n^3)\) | 中等 | **紧凑（仅网络参数+潜码）** |
| 表面封闭性 | 不保证 | 不保证 | **天然封闭** |
| 已知形状 CD（×10³） | 0.167 | 0.157 | **0.084** |

##### 实验结果

在 ShapeNet 数据集上的四项实验均验证了 DeepSDF 的优越性：

1. **已知形状表示**（Table 2）：DeepSDF 的 Chamfer Distance（0.084）远优于 OGN（0.167）和 AtlasNet（0.157），表明连续 SDF 表示的高保真度
2. **未知形状重建**（Table 3）：在 chair/plane/sofa 等类别上，DeepSDF 的 CD 中位数（0.072/0.036/0.088）大幅优于 AtlasNet-25（0.276/0.065/0.311）
3. **部分形状补全**：利用深度图作为部分观测，DeepSDF 在 CD 和 mesh accuracy 上均优于 3D-EPN
4. **形状采样与插值**：在潜空间中采样或插值可生成平滑、合理的新形状，证明学到的潜空间具有良好结构

#### 🧪 练习题
```yaml
question: "DeepSDF 的 auto-decoder 架构与传统 auto-encoder 的关键区别是什么？"
options:
  - "auto-decoder 使用更深的解码器网络"
  - "auto-decoder 没有编码器，潜码作为自由参数直接优化"
  - "auto-decoder 使用变分推断来估计潜码分布"
  - "auto-decoder 在推理时不需要优化任何参数"
answer: 1
explain: "Auto-decoder 摒弃了编码器，将每个形状的潜码 z_i 视为可学习参数，在训练时与网络参数联合优化；推理时通过 MAP 估计优化新形状的潜码。这避免了编码器的信息瓶颈，且训练更简单。"
```

### Occupancy Networks

```yaml
id: occupancy_net
num: 27
name: Occupancy Networks
full_name: 占用网络 (Occupancy Networks)
year: '2019'
org: MPI
parent: deepsdf
paper_url: https://arxiv.org/abs/1812.03828
project_url: ''
category: reconstruction
motivation: 占用概率场学习连续几何表示
```

#### 📝 一句话总结
Occupancy Networks 提出将3D形状表示为连续的占用函数 \(f_\theta(p, x): \mathbb{R}^3 \to [0,1]\)，通过神经网络学习空间中任意点的占用概率，实现了不受分辨率限制的高质量3D重建与生成。

#### 🎯 核心要点
- **连续隐式表示**：将3D形状建模为连续决策边界 \(\{p \in \mathbb{R}^3 \mid f_\theta(p,x) = \tau\}\)，突破体素/点云/网格的离散分辨率瓶颈
- **统一框架**：支持单图3D重建、点云补全、体素超分辨率、无条件生成等多种任务
- **多种编码器**：图像输入用 ResNet-18，点云用 PointNet，体素用 3D CNN，通过条件批归一化（CBN）注入条件信息
- **网络架构**：5 层全连接 ResNet + 条件批归一化（CBN），将条件编码 \(c(x)\) 注入每层归一化参数
- **MISE 推理算法**：多分辨率等值面提取，从粗到细的八叉树式细分 + Marching Cubes，初始分辨率 \(32^3\)
- **Mesh 精修**：利用梯度信息（Double-Backpropagation）对提取的网格进行后处理优化
- **VAE 生成模型**：引入编码器 \(g_\psi\) 学习先验分布，通过 ELBO 目标训练实现无条件3D形状生成
- **ShapeNet 基准**：单图重建 IoU 达 0.571，法线一致性 0.834，均优于 3D-R2N2、Pixel2Mesh、AtlasNet 等基线

#### 🔬 深入细节
##### 核心框架图

![Occupancy Networks 概念对比图](https://ar5iv.labs.arxiv.org/html/1812.03828/assets/x1.png)
*图：(a) 体素 (b) 点云 (c) 网格 三种离散表示 vs. (d) Occupancy Networks 的连续函数表示。ONet 将3D形状表示为连续决策边界，可在任意分辨率下提取表面。*

![离散 vs 连续表示的质量对比](https://ar5iv.labs.arxiv.org/html/1812.03828/assets/img/iou_voxelization.png)
*图：体素表示的 IoU 随分辨率增长（蓝色实线）与 ONet 连续表示（橙色实线）的对比。ONet 以固定参数量实现高 IoU，而体素参数量随分辨率立方增长。*

##### 算法伪代码

```python
# Occupancy Networks 训练与推理流程

# === 训练阶段 ===
# 输入: 观测 x (图像/点云/体素), 3D点集 {p_j}, 占用标签 {o_j}
for batch in dataloader:
    x, points, occupancies = batch
    # 1. 编码条件信息
    c = encoder(x)                    # ResNet-18 / PointNet / 3D-CNN
    # 2. 对查询点预测占用概率
    p_hat = occupancy_net(points, c)  # 5层ResNet + CBN(c)
    # 3. 二元交叉熵损失
    loss = BCE(p_hat, occupancies)
    loss.backward()
    optimizer.step()

# === MISE 推理阶段 ===
# 1. 在初始分辨率 32^3 的网格上评估占用值
grid = evaluate_occupancy(initial_grid_32, c)
# 2. 标记活跃体素（同时包含占用和非占用点的体素）
for resolution in [32, 64, 128, ...target]:
    active_voxels = find_active_voxels(grid)
    # 3. 将活跃体素细分为 8 个子体素
    grid = subdivide_and_evaluate(active_voxels, c)
# 4. 在最终分辨率上运行 Marching Cubes
mesh = marching_cubes(grid, threshold=tau)  # tau=0.2
# 5. 网格简化 + 梯度精修
mesh = simplify(mesh)
mesh = refine_with_gradients(mesh, occupancy_net, c)
```

##### 动机与背景

传统3D表示方法面临根本性的分辨率-内存权衡困境：

- **体素（Voxels）**：将空间离散化为规则网格，内存需求随分辨率立方增长（\(O(n^3)\)），\(128^3\) 的体素就需要约 200 万个值，且大部分空间是空的
- **点云（Point Clouds）**：缺乏拓扑连接信息，无法直接表示表面，不适合需要水密网格的应用
- **网格（Meshes）**：需要预定义拓扑模板（如 Pixel2Mesh 基于椭球变形），难以处理任意拓扑

> 💡 **关键洞察**：3D形状的表面本质上是连续的2D流形，用离散表示必然引入量化误差。Occupancy Networks 将表示问题转化为学习一个连续函数，从根本上解除了分辨率限制。

##### 核心机制：连续占用函数

Occupancy Networks 的核心思想是学习一个函数：

$$f_\theta: \mathbb{R}^3 \times \mathcal{X} \to [0, 1]$$

其中 \(p \in \mathbb{R}^3\) 是查询点坐标，\(x \in \mathcal{X}\) 是条件输入（图像、点云等）。函数输出 \(f_\theta(p, x)\) 表示点 \(p\) 被物体占据的概率。3D形状的表面即为该函数的等值面：

$$\mathcal{S} = \{p \in \mathbb{R}^3 \mid f_\theta(p, x) = \tau\}$$

其中 \(\tau\) 为阈值（实验中 \(\tau = 0.2\)）。

**训练目标**：对每个训练样本，从3D空间中采样点 \(\{p_j\}_{j=1}^K\)，已知其真实占用标签 \(o_j \in \{0, 1\}\)，使用二元交叉熵（BCE）损失：

$$\mathcal{L}(\theta, \psi) = \sum_{j=1}^{K} \text{BCE}\big(f_\theta(p_j, x), o_j\big)$$

> ⚠️ **注意**：采样策略对训练至关重要。论文在物体边界框内均匀采样，并在表面附近增加采样密度，以确保网络能精确学习表面位置。

##### 网络架构：ResNet + 条件批归一化

占用网络采用 **5 层全连接 ResNet** 结构，每个残差块包含两个全连接层。条件信息通过 **条件批归一化（Conditional Batch Normalization, CBN）** 注入：

$$\text{CBN}(h; c) = \gamma(c) \cdot \frac{h - \mu}{\sigma} + \beta(c)$$

其中 \(h\) 是隐层特征，\(\mu, \sigma\) 是批统计量，\(\gamma(c)\) 和 \(\beta(c)\) 是由条件编码 \(c = \text{encoder}(x)\) 通过线性映射生成的缩放和偏移参数。

这种设计的优势在于：
1. **解耦**：查询点坐标和条件信息通过不同路径处理，点坐标直接输入网络，条件通过归一化层调制
2. **灵活性**：更换编码器即可适配不同输入模态（图像→ResNet-18，点云→PointNet，体素→3D CNN）
3. **高效性**：可以批量查询大量点的占用值，因为条件编码只需计算一次

##### MISE：多分辨率等值面提取

推理时需要从连续占用函数中提取显式网格。直接在高分辨率网格上评估所有点计算量巨大，论文提出 **Multiresolution IsoSurface Extraction (MISE)** 算法：

1. **初始化**：在 \(32^3\) 的粗网格上评估所有顶点的占用值
2. **标记活跃体素**：找出同时包含占用点（\(\geq \tau\)）和非占用点（\(< \tau\)）的体素——这些体素可能包含表面
3. **细分**：将每个活跃体素细分为 8 个子体素，评估新引入的网格点
4. **迭代**：重复步骤 2-3 直到达到目标分辨率
5. **Marching Cubes**：在最终分辨率上运行 Marching Cubes 提取等值面

> 💡 **关键**：MISE 本质上是一种八叉树加速策略，只在表面附近进行精细评估，大幅减少了网络前向传播次数。

提取的初始网格还可通过梯度信息进一步精修。对网格面上采样的点 \(p_k\)，最小化：

$$\sum_{k=1}^{K}\left(f_\theta(p_k, x) - \tau\right)^2 + \lambda\left\|\frac{\nabla_p f_\theta(p_k, x)}{\|\nabla_p f_\theta(p_k, x)\|} - n(p_k)\right\|^2$$

第一项将表面点推向等值面，第二项对齐梯度方向与网格法线。这利用了 Double-Backpropagation 技术高效计算二阶梯度。

##### VAE 生成模型

对于无条件3D形状生成，论文引入变分自编码器框架：

- **编码器** \(g_\psi\)：将3D形状编码为潜在分布 \(q_\psi(z|x)\)
- **解码器**：占用网络 \(f_\theta(p, z)\) 以潜在码 \(z\) 为条件
- **训练目标**（ELBO）：

$$\mathcal{L}_{\text{gen}}(\theta, \psi) = \sum_{j=1}^{K} \text{BCE}\big(f_\theta(p_j, z), o_j\big) + \text{KL}\big(q_\psi(z|x) \| p_0(z)\big)$$

其中 \(p_0(z)\) 为标准正态先验。生成时从 \(p_0(z)\) 采样 \(z\)，再通过占用网络和 MISE 生成网格。

##### 与传统方法的对比

| 特性 | 体素方法 (3D-R2N2) | 点云 (PSGN) | 网格变形 (Pixel2Mesh) | **ONet (本文)** |
|------|-------------------|-------------|---------------------|----------------|
| 分辨率 | 固定（\(32^3\)） | 固定点数 | 固定拓扑 | **任意分辨率** |
| 内存 | \(O(n^3)\) | \(O(n)\) | \(O(V+E)\) | **固定（~6M参数）** |
| 拓扑 | 任意 | 无拓扑 | 受模板限制 | **任意** |
| 表面质量 | 阶梯状 | 无表面 | 平滑但受限 | **平滑连续** |
| Mean IoU ↑ | 0.493 | — | 0.480 | **0.571** |
| Normal Consistency ↑ | 0.695 | — | 0.772 | **0.834** |

#### 🧪 练习题
```yaml
question: "Occupancy Networks 使用什么机制将条件输入（如图像编码）注入到占用预测网络中？"
options:
  - "将条件编码与查询点坐标拼接后输入网络"
  - "通过条件批归一化（CBN）调制网络各层的归一化参数"
  - "使用注意力机制在查询点和条件特征之间建立关联"
  - "将条件编码作为网络最后一层的额外输入"
answer: 1
explain: "ONet 使用条件批归一化（CBN），由条件编码 c(x) 生成每层的缩放参数 γ(c) 和偏移参数 β(c)，从而在不改变网络输入的情况下调制各层特征。"
```

### ConvONet

```yaml
id: convonet
num: 28
name: ConvONet
full_name: 卷积占用网络 (ConvONet)
year: '2020'
org: MPI
parent: occupancy_net
paper_url: https://arxiv.org/abs/2003.04618
project_url: ''
category: reconstruction
motivation: 卷积编码器提升局部特征表达能力
```

#### 📝 一句话总结
ConvONet 将 Occupancy Networks 的全局 latent code 替换为卷积特征场，在查询点处插值局部 2D/3D 特征并预测占用概率，使连续隐式重建能保留局部细节并扩展到大规模室内场景。

#### 🎯 核心要点
- **卷积隐式表示**：用 CNN/PointNet 编码输入点云或体素，生成规则 2D plane 或 3D grid 特征
- **局部特征查询**：对任意 3D 查询点 \(\mathbf{p}\)，在特征平面/体素网格上双线性或三线性插值得到 \(\psi(\mathbf{p},\mathbf{x})\)
- **占用解码器**：MLP/ResNet decoder 接收查询点坐标和局部特征，输出 \(f_\theta(\mathbf{p},\psi)\in[0,1]\)
- **三平面表示**：用 \(xy\)、\(xz\)、\(yz\) 三个 canonical planes 平衡内存和表达力
- **体素网格表示**：在小物体上可用 3D grid 捕获更完整的空间局部性
- **可扩展场景重建**：通过 fully convolutional/sliding-window 思想处理 Matterport3D、ScanNet 等大场景
- **继承 ONet 优点**：仍通过连续占用函数和 MISE/Marching Cubes 提取任意分辨率表面

#### 🔬 深入细节
##### 核心示意图

![ConvONet 局部特征表示](https://ar5iv.labs.arxiv.org/html/2003.04618/assets/x2.png)
*图：ConvONet 相比原始 Occupancy Network 的关键变化：不再只用一个全局形状 latent，而是在 3D 位置处查询卷积特征，使隐式函数同时依赖输入观测和局部空间位置。*

##### 算法伪代码

```python
# ConvONet 训练和网格提取伪代码
def train_convonet(observation, query_points, occupancies):
    # observation 可以是点云、低分辨率体素或局部场景块
    feature_maps = convolutional_encoder(observation)

    predictions = []
    for p in query_points:
        local_feats = []
        for grid_or_plane in feature_maps:
            local_feats.append(interpolate(grid_or_plane, project(p)))
        psi = concatenate(local_feats)
        predictions.append(occupancy_decoder(p, psi))

    loss = binary_cross_entropy(predictions, occupancies)
    update_network(loss)


def reconstruct(feature_maps, resolution):
    def occ_fn(p):
        psi = interpolate_multiscale_features(feature_maps, p)
        return occupancy_decoder(p, psi)

    active_grid = MISE(occ_fn, initial_resolution=32, target_resolution=resolution)
    mesh = marching_cubes(active_grid, threshold=0.5)
    return mesh
```

##### 动机与背景

Occupancy Networks 用一个条件编码 \(c(\mathbf{x})\) 表示整个输入，再让 decoder 判断任意点 \(\mathbf{p}\) 是否被占用。这种连续隐式表示突破了体素分辨率限制，但全局 latent 容易成为瓶颈：局部几何细节、重复结构和大场景中的空间平移关系都被压缩到一个向量里，decoder 难以知道“这个查询点附近具体观测到了什么”。

ConvONet 的核心思想是把隐式函数从

$$
f_\theta(\mathbf{p}, c)
$$

改为

$$
f_\theta(\mathbf{p}, \psi(\mathbf{p}, \mathbf{x}))
$$

其中 \(\psi(\mathbf{p},\mathbf{x})\) 是在查询点附近提取的卷积特征。这样，占用预测不再只由全局形状向量决定，而是由局部观测和坐标共同决定。

##### 特征场设计

论文系统比较了多种特征场。2D plane 表示把 3D 点投影到 canonical plane，例如 \(xy\)、\(xz\)、\(yz\)，并在对应特征图上双线性插值。三平面组合常写作：

$$
\psi(\mathbf{p},\mathbf{x})=
\psi_{xy}(p_x,p_y)\oplus
\psi_{xz}(p_x,p_z)\oplus
\psi_{yz}(p_y,p_z)
$$

3D grid 表示则在体素特征网格上三线性插值：

$$
\psi(\mathbf{p},\mathbf{x})=\text{trilinear}(\mathbf{F},\mathbf{p})
$$

三平面更省内存，适合大场景；3D grid 的空间表达更直接，适合对象级重建或较小场景。二者都引入了卷积网络的平移等变归纳偏置，使模型能把局部几何模式复用到不同空间位置。

##### 占用解码与训练目标

给定查询点 \(\mathbf{p}\) 和局部特征 \(\psi\)，decoder 输出占用概率：

$$
o = f_\theta(\mathbf{p}, \psi) \in [0,1]
$$

训练时在空间中采样点并使用二元交叉熵：

$$
\mathcal{L}=-\sum_i
\left[
o_i^*\log f_\theta(\mathbf{p}_i,\psi_i)
(1-o_i^*)\log(1-f_\theta(\mathbf{p}_i,\psi_i))
\right]
$$

由于 \(f_\theta\) 是连续函数，推理时可在任意分辨率上查询，占用等值面通过 MISE 加速采样，再用 Marching Cubes 提取网格。

##### 与 Occupancy Networks 的区别

原始 ONet 的强项是连续拓扑自由表示，但它缺少局部结构归纳偏置；ConvONet 则把 CNN 的局部性、平移等变和层级特征注入隐式表示。对局部细节丰富的椅子、桌子、室内墙面和多房间结构，ConvONet 能保持更锋利的边界和更完整的结构。

在大场景上，ConvONet 可以按空间块或 fully convolutional 方式编码输入点云，让同一个 decoder 在不同区域共享参数。这是它能从单物体扩展到 Matterport3D/ScanNet 室内场景的关键。

> 💡 关键：ConvONet 的本质是“局部条件化的隐式函数”。连续隐式函数负责任意分辨率表面，卷积特征场负责把观测中的局部几何证据送到正确的查询位置。

#### 🧪 练习题
```yaml
question: "ConvONet 相比原始 Occupancy Networks 的关键改进是什么？"
options:
  - "只使用更深的全连接 MLP"
  - "在查询点处插值卷积特征，使占用预测依赖局部观测而非单一全局 latent"
  - "取消连续隐式函数，改用固定分辨率体素输出"
  - "只重建二维图像轮廓"
answer: 1
explain: "ConvONet 保留连续占用函数，但把条件信息组织为空间特征场，在每个查询点提取局部特征，因此细节和大场景扩展性更好。"
```

### NeuS

```yaml
id: neus
num: 29
name: NeuS
full_name: 神经隐式表面 (NeuS)
year: '2021'
org: Zhejiang Univ
parent: deepsdf
paper_url: https://arxiv.org/abs/2106.10689
project_url: ''
category: reconstruction
motivation: 无偏体渲染+SDF实现高精度表面提取
```

#### 📝 一句话总结
NeuS 用神经 SDF 的零水平集表示表面，并提出一阶无偏的 SDF 体渲染权重，把 NeRF 的鲁棒优化和 SDF 的精确表面约束结合起来，实现无需前景 mask 也能高质量多视角表面重建。

#### 🎯 核心要点
- **SDF 几何表示**：用 \(f_\theta(\mathbf{x})\) 表示 signed distance，表面为 \(f_\theta(\mathbf{x})=0\)
- **颜色网络**：用 \(c_\phi(\mathbf{x},\mathbf{v},\mathbf{n},\mathbf{z})\) 建模视角相关颜色
- **SDF 诱导密度/权重**：从 SDF 的 sigmoid 分布构造体渲染 opacity，避免普通 density field 表面阈值任意的问题
- **一阶无偏权重**：设计让光线与零水平集交点附近贡献最大，减小 naive SDF-density 体渲染的几何偏差
- **遮挡感知**：前方表面获得更大权重，处理多表面穿越和自遮挡
- **Eikonal 正则**：约束 \(\|\nabla f_\theta(\mathbf{x})\|_2\approx 1\)，保持 SDF 的距离函数性质
- **多视角 RGB 监督**：通过可微体渲染最小化渲染图像与输入图像差异，并用 Marching Cubes 提取零水平集网格

#### 🔬 深入细节
##### 核心示意图

![NeuS 无偏权重示意](https://ar5iv.labs.arxiv.org/html/2106.10689/assets/x2.png)
*图：NeuS 论文 Figure 2，对比 naive SDF-density 体渲染的权重偏差与 NeuS 的无偏权重函数。NeuS 希望最大权重落在 SDF 零水平集与相机光线的交点处。*

##### 算法伪代码

```python
# NeuS 训练伪代码
def train_neus(images, cameras, sdf_net, color_net):
    for step in range(num_steps):
        rays = sample_rays(images, cameras)
        pts, deltas = sample_points_on_rays(rays)

        sdf = sdf_net(pts)                         # f(x)
        gradients = grad(sdf, pts)                 # normal = ∇f(x)
        colors = color_net(pts, rays.dirs, gradients)

        # NeuS 根据相邻采样点 SDF 的 sigmoid CDF 构造 alpha
        cdf = sigmoid(inv_s * sdf)
        alpha = neus_alpha_from_adjacent_cdf(cdf)
        weights = alpha * cumulative_transmittance(alpha)
        rgb = sum(weights * colors, dim="samples")

        photo_loss = l1(rgb, rays.target_rgb)
        eikonal_loss = ((norm(gradients) - 1.0) ** 2).mean()
        loss = photo_loss + lambda_eik * eikonal_loss
        update_networks(loss)

    mesh = marching_cubes(lambda x: sdf_net(x), level=0.0)
    return mesh
```

##### 动机与背景

NeRF 的 volume density 很适合优化新视角合成，但它不是严格几何表面。渲染质量高不等于能从任意 density threshold 提取出干净 mesh。IDR/DVR 等神经隐式表面方法直接用 SDF 或 occupancy 做 surface rendering，表面清晰，但梯度只来自射线与表面的局部交点，优化更容易陷入局部最小值，并常依赖前景 mask。

NeuS 的目标是兼得二者优势：几何上用 SDF 的零水平集表示精确表面，优化上用 volume rendering 让一条光线上的多个采样点都能获得梯度。问题是，直接把 SDF 转成密度再套 NeRF 公式会产生系统性偏差：最大渲染权重不一定落在真实零水平集处，重建表面会沿光线方向偏移。

##### SDF 与颜色场

NeuS 用两个网络表示场景：

$$
f_\theta:\mathbb{R}^3\rightarrow \mathbb{R}
$$

$$
c_\phi:\mathbb{R}^3\times \mathbb{S}^2\times \mathbb{R}^3\times \mathbb{R}^m
\rightarrow \mathbb{R}^3
$$

其中 \(f_\theta(\mathbf{x})\) 是 SDF，\(\nabla f_\theta(\mathbf{x})\) 可作为法向；颜色网络接收点位置、视角方向、法向和几何特征，用于建模材质和视角相关外观。

##### 无偏体渲染权重

NeuS 用 sigmoid CDF \(\Phi_s(f)=(1+e^{-sf})^{-1}\) 描述 SDF 到概率的转换，其中 \(s\) 控制表面附近分布的尖锐程度。对相邻采样点 \(\mathbf{x}_i,\mathbf{x}_{i+1}\)，离散 opacity 可写成类似：

$$
\alpha_i=
\max\left(
\frac{\Phi_s(f(\mathbf{x}_i))-\Phi_s(f(\mathbf{x}_{i+1}))}
{\Phi_s(f(\mathbf{x}_i))},0
\right)
$$

随后仍按前向 alpha compositing 得到权重：

$$
w_i=\alpha_i\prod_{j<i}(1-\alpha_j)
$$

直觉上，当光线从物体外部进入内部时，SDF 从正变负，\(\Phi_s(f)\) 会快速下降；这个下降量对应光线在该区间命中表面的概率。NeuS 的推导保证在 SDF 一阶近似下，权重峰值位于零水平集附近，从而减少表面偏移。

##### 训练损失与表面提取

NeuS 的 RGB 重建损失来自体渲染颜色：

$$
\hat{C}(\mathbf{r})=\sum_i w_i c_i
$$

$$
\mathcal{L}_{\text{color}}=\sum_{\mathbf{r}}\|\hat{C}(\mathbf{r})-C(\mathbf{r})\|_1
$$

同时加入 Eikonal 正则：

$$
\mathcal{L}_{\text{eik}}=
\mathbb{E}_{\mathbf{x}}\left(\|\nabla f_\theta(\mathbf{x})\|_2-1\right)^2
$$

Eikonal 项保证 \(f_\theta\) 更像真实距离函数，而不仅是任意符号场。训练完成后，用 Marching Cubes 在 \(f_\theta(\mathbf{x})=0\) 上提取 mesh。

##### 与 NeRF、IDR 的区别

相对 NeRF，NeuS 的几何由 SDF 直接约束，表面阈值固定为零水平集，不需要在 density field 中猜阈值。相对 IDR/DVR，NeuS 使用体渲染获得更稳定的多点梯度传播，对自遮挡、薄结构和复杂拓扑更鲁棒，并且可以在没有前景 mask 的设置下工作。

> 💡 关键：NeuS 不是简单的“SDF + NeRF”。真正关键是重新设计 SDF 到 alpha 权重的映射，让体渲染优化不会把表面系统性推离零水平集。

#### 🧪 练习题
```yaml
question: "NeuS 中一阶无偏权重设计主要解决什么问题？"
options:
  - "减少网络参数量"
  - "避免 naive SDF-density 体渲染导致最大权重偏离真实零水平集"
  - "让模型完全不需要相机位姿"
  - "把 SDF 改成离散体素"
answer: 1
explain: "NeuS 观察到直接用 SDF 构造密度会产生几何偏差，因此通过相邻 SDF 的 sigmoid CDF 构造 opacity，使权重峰值在一阶近似下对齐表面。"
```

### VolSDF

```yaml
id: volsdf
num: 30
name: VolSDF
full_name: 体密度SDF (VolSDF)
year: '2021'
org: Weizmann
parent: neus
paper_url: https://arxiv.org/abs/2106.12052
project_url: ''
category: reconstruction
motivation: 体密度与SDF几何约束融合提升重建质量
```

#### 📝 一句话总结
VolSDF 将体渲染中的 volume density 定义为 SDF 经 Laplace CDF 变换后的函数，并推导 opacity 近似误差界来指导采样，从而把 NeRF 的可微体渲染与隐式表面的几何约束结合起来。

#### 🎯 核心要点
- **密度由 SDF 决定**：不再学习任意 density，而是令 \(\sigma(\mathbf{x})=\alpha\Psi_\beta(-d_\Omega(\mathbf{x}))\)
- **Laplace CDF 变换**：用可学习的 \(\alpha,\beta\) 控制表面附近密度厚度和强度
- **零水平集表面**：最终几何从 SDF 的 \(d_\Omega(\mathbf{x})=0\) 提取，不依赖 density threshold
- **误差界采样**：推导体渲染 opacity 近似误差上界，据此自适应增加采样点
- **形状/外观解耦**：SDF 控制 density/geometry，radiance network 控制颜色，有利于交换几何与外观
- **无需前景 mask 的重建能力**：在 DTU、BlendedMVS 等多视角数据上获得更高质量几何
- **Eikonal 正则**：约束 SDF 梯度范数接近 1，保持隐式距离场性质

#### 🔬 深入细节
##### 核心示意图

![VolSDF 方法示意](https://ar5iv.labs.arxiv.org/html/2106.12052/assets/figures/teaser.jpg)
*图：VolSDF 将输入多视角图像用于学习 radiance field，同时把 volume density 绑定到 SDF。几何从 SDF 零水平集提取，渲染仍使用体渲染积分。*

##### 算法伪代码

```python
# VolSDF 训练伪代码
def train_volsdf(images, cameras, sdf_net, radiance_net):
    for step in range(num_steps):
        rays = sample_rays(images, cameras)

        # 根据 opacity 误差界自适应采样
        intervals = init_uniform_intervals(rays)
        while opacity_error_bound(intervals, sdf_net) > eps:
            intervals = upsample_intervals(intervals, sdf_net)

        pts, deltas = sample_from_intervals(intervals)
        sdf = sdf_net(pts)
        sigma = alpha * laplace_cdf(-sdf, beta)
        rgb_samples = radiance_net(pts, rays.dirs)

        weights = volume_rendering_weights(sigma, deltas)
        rgb = sum(weights * rgb_samples, dim="samples")

        photo_loss = l1(rgb, rays.target_rgb)
        eikonal_loss = ((norm(grad(sdf, pts)) - 1.0) ** 2).mean()
        loss = photo_loss + lambda_eik * eikonal_loss
        update_networks(loss)

    return marching_cubes(lambda x: sdf_net(x), level=0.0)
```

##### 动机与背景

NeRF 把几何隐含在任意 density field 中，渲染效果可以很好，但提取几何时必须选择 density threshold。这个阈值没有明确物理或几何意义，所以网格常出现噪声、厚壳和浮动物。另一方面，IDR 等 surface rendering 方法使用隐式表面，几何清晰，但优化需要更强初始化和 mask，复杂遮挡下梯度传播不如体渲染稳定。

VolSDF 的思路是：保留体渲染训练的稳定性，但不要让 density 自由漂移。它先学习一个 SDF \(d_\Omega(\mathbf{x})\)，再把 density 定义为 SDF 的确定函数。这样，density 的高值自然集中在表面附近，几何提取也直接取 SDF 零水平集。

##### SDF 到 density 的变换

VolSDF 使用 Laplace 分布的 CDF \(\Psi_\beta\)：

$$
\sigma(\mathbf{x}) = \alpha \Psi_\beta(-d_\Omega(\mathbf{x}))
$$

其中 \(d_\Omega(\mathbf{x})<0\) 表示物体内部，\(d_\Omega(\mathbf{x})>0\) 表示外部。\(\beta\) 控制表面过渡带的宽度，\(\alpha\) 控制 density 强度。直觉上，越靠近或进入物体内部，density 越高；远离表面时 density 变低或趋于饱和，从而把渲染的吸收事件集中到表面附近。

体渲染颜色仍为：

$$
\hat{C}(\mathbf{r})=
\int_0^\infty T(t)\sigma(\mathbf{x}(t))\mathbf{c}(\mathbf{x}(t),\mathbf{v})dt
$$

$$
T(t)=\exp\left(-\int_0^t \sigma(\mathbf{x}(s))ds\right)
$$

这使 VolSDF 与 NeRF 一样可以用 RGB photometric loss 端到端训练。

##### 误差界采样

体渲染需要沿每条光线离散采样。采样过少会让表面附近的 density 峰值被漏掉，采样过多又会拖慢训练。VolSDF 的重要贡献是利用 SDF 的 Lipschitz/距离函数性质推导 opacity 近似误差上界，并用这个上界指导自适应采样。

流程上，模型先在光线上粗采样，估计每个区间的误差上界；如果某些区间误差仍大，就在这些区间继续细分或重采样，直到 bound 低于阈值。相比 NeRF 的固定粗细两阶段采样，VolSDF 的采样与当前 SDF 几何直接相关，更容易把样本集中在表面附近。

##### 损失函数与表面提取

VolSDF 的主要训练目标包括 RGB 重建项和 Eikonal 项：

$$
\mathcal{L}=
\mathcal{L}_{\text{rgb}}+
\lambda \mathbb{E}_{\mathbf{x}}
\left(\|\nabla d_\Omega(\mathbf{x})\|_2-1\right)^2
$$

如果数据提供 foreground mask，也可以加入 mask loss；但方法的核心并不依赖 mask。训练结束后，网格由 Marching Cubes 从 \(d_\Omega(\mathbf{x})=0\) 提取。

##### 与 NeuS 的关系

VolSDF 和 NeuS 几乎同时提出，目标相近：用 SDF 约束体渲染几何。差异在于 VolSDF 显式把 density 定义为 SDF 的 Laplace CDF 变换，并强调 opacity 误差界和自适应采样；NeuS 更强调重新推导一阶无偏的 alpha/weight 公式，避免 SDF-density 的表面偏差。二者共同推动了 neural implicit surface reconstruction 从 NeRF density field 向 SDF-constrained volume rendering 转变。

> 💡 关键：VolSDF 的核心是把“任意密度场”变成“由 SDF 决定的密度场”。几何不再是渲染副产物，而是直接控制渲染概率的主变量。

#### 🧪 练习题
```yaml
question: "VolSDF 为什么要把 volume density 定义为 SDF 的 Laplace CDF 变换？"
options:
  - "为了完全取消体渲染"
  - "为了让密度受几何 SDF 约束，使表面附近贡献集中，并可从零水平集提取几何"
  - "为了只支持单视角输入"
  - "为了避免使用任何神经网络"
answer: 1
explain: "VolSDF 将 density 绑定到 SDF，使体渲染优化具有明确几何归纳偏置；最终表面取 SDF=0，而不是任意 density threshold。"
```

### Deocc-1-to-3

```yaml
id: deocc_1to3
num: 31
name: Deocc-1-to-3
full_name: 单图3D去遮挡 (Deocc-1-to-3)
year: '2026'
org: AAAI
parent: neus
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/37820
project_url: ''
category: reconstruction
motivation: 自监督多视角扩散模型11秒完成遮挡图像3D重建
```

#### 📝 一句话总结
DeOcc-1-to-3 提出一个单张遮挡图像到多视角去遮挡图像的自监督扩散框架，直接生成六个结构一致的新视角，再接入 InstantMesh 等 3D 重建模块完成遮挡物体的完整 3D 重建。

#### 🎯 核心要点
- **遮挡感知多视角生成**：输入单张 partially occluded image，输出六张去遮挡且结构一致的新视角图像
- **基于 Zero123++**：不修改原始多视角扩散模型架构，通过 full fine-tuning 学会补全与新视角合成
- **自监督训练数据**：从 Pix2Gestalt 的完整/遮挡图像对构造训练样本，无需人工 3D 标注
- **伪多视角监督**：对完整图像用冻结多视角生成模型产生六视角 pseudo ground truth，用遮挡图像作为学生输入
- **统一去遮挡与视角合成**：避免先 2D inpainting 再 3D reconstruction 的误差累积
- **下游兼容**：生成的六视角结果可直接输入 InstantMesh 等 mesh-based reconstruction pipeline
- **Occ-LVIS benchmark**：提出遮挡感知重建基准，覆盖不同遮挡程度、类别和 mask 模式

#### 🔬 深入细节
##### 核心示意图

![DeOcc-1-to-3 框架](https://arxiv.org/html/2506.21544v1/x2.png)
*图：DeOcc-1-to-3 论文 Figure 2。顶部构造遮挡图像与完整图像的伪多视角监督，中间全量微调多视角扩散模型，底部把预测六视角图像送入 3D reconstruction module。*

##### 算法伪代码

```python
# DeOcc-1-to-3 自监督训练与推理伪代码
def build_training_pair(full_image, occlusion_mask, frozen_mv_model):
    occluded = apply_occlusion(full_image, occlusion_mask)
    pseudo_views = frozen_mv_model.generate_six_views(full_image)
    return occluded, pseudo_views


def train_deocc(student_mv_model, pix2gestalt_pairs):
    for full_image, mask in pix2gestalt_pairs:
        I_occ, target_views = build_training_pair(
            full_image, mask, frozen_mv_model=teacher_zero123pp
        )
        noisy_latent, noise, t = diffusion_forward(target_views)
        pred_noise = student_mv_model(noisy_latent, t, condition=I_occ)
        loss = ((noise - pred_noise) ** 2).mean()
        update(student_mv_model, loss)


def reconstruct_from_occluded_image(model, I_occ):
    six_views = model.generate_six_views(I_occ)
    mesh = InstantMesh(six_views)
    return mesh
```

##### 动机与背景

单图 3D 重建已经受益于 Zero-1-to-3、Zero123++、MVDream、InstantMesh 等多视角生成与快速重建模型。这些模型通常假设输入物体可见完整；现实图像里物体常被其他物体、边界、手部或环境遮挡。一旦输入缺失局部结构，普通多视角扩散模型会把遮挡物当成目标的一部分，或在不同视角中对不可见区域产生互相矛盾的幻觉，最终导致 mesh 破碎、背面错误或法向异常。

一个自然方案是先做 2D amodal inpainting，再做多视角生成。但 DeOcc-1-to-3 指出这个两阶段方案存在结构性问题：2D 修补不保证 3D 多视角一致，生成模型不知道哪些区域是高不确定性的补全部分，两个阶段无法联合优化，错误会向 3D 重建传播。

##### 自监督训练构造

DeOcc-1-to-3 用自监督方式构造训练目标。设完整图像为 \(I_{\text{full}}\)，随机遮挡后得到 \(I_{\text{occ}}\)。冻结的多视角教师模型 \(G\) 对完整图像生成六视角伪监督：

$$
\langle I_{\text{occ}}, G(I_{\text{full}})\rangle
$$

学生模型输入 \(I_{\text{occ}}\)，目标是预测与 \(G(I_{\text{full}})\) 一致的六视角结果。这样模型学到的不是“补一张图”，而是在遮挡输入条件下恢复一组结构一致的 3D-aware views。

##### 扩散模型目标

论文基于 Zero123++ 的六视角 tiled output，使用标准 denoising objective。给定输入图像 \(I_{\text{input}}\)、噪声 latent \(x_t\)、噪声 \(\epsilon\) 和时间步 \(t\)，训练损失为：

$$
\mathcal{L}_{\text{denoise}}=
\mathbb{E}_{x_0,\epsilon,t}
\left[
\|\epsilon-\epsilon_\theta(x_t,t\mid I_{\text{input}})\|^2
\right]
$$

在 DeOcc-1-to-3 中，\(I_{\text{input}}\) 是遮挡图像，\(x_0\) 对应完整图像经教师模型生成的六视角拼图。由于不改架构，模型能力主要来自 fine-tuning 数据分布：它学会把遮挡区域解释为缺失结构，并在六个预定义相机位姿上生成一致补全。

##### 3D 重建集成

推理时，模型从单张遮挡图像直接输出六张 novel views，视角配置继承 Zero123++ 的固定六视角设计，例如两个 elevation 组合与六个 azimuth 方向。随后这些图像被送入 InstantMesh 等重建器，恢复 mesh 和法向。这个过程把难点从“直接从遮挡图回归 3D”转化为“先生成一致多视角去遮挡观测，再用成熟多视角重建模块恢复 3D”。

用户元信息提到 11 秒完成遮挡图像 3D 重建，可理解为模型设计面向快速推理：生成固定数量视角，避免 SDS 式逐场景长时间优化。实际速度取决于 GPU、扩散采样步数和下游重建器配置。

##### Occ-LVIS 基准

论文还提出 Occ-LVIS benchmark，用于衡量遮挡场景下的重建质量。它覆盖不同遮挡比例、物体类别和 mask 形态，使方法不只在干净单物体输入上比较，而是面向真实遮挡分布评估。指标可包括新视角图像质量、3D 几何距离、法向一致性或下游 mesh 完整度。

> 💡 关键：DeOcc-1-to-3 的核心是把 2D amodal completion 和 multi-view generation 合并成一个扩散任务，让模型在生成时同时考虑“补全什么”和“从其他视角看是否一致”。

#### 🧪 练习题
```yaml
question: "DeOcc-1-to-3 为什么不采用“先 2D inpainting，再 3D 重建”的两阶段方案？"
options:
  - "因为 2D inpainting 无法输出 RGB 图像"
  - "因为两阶段方案缺乏多视角一致性，补全误差会传递到视角生成和 3D 重建"
  - "因为扩散模型不能处理遮挡图像"
  - "因为 InstantMesh 只能接收单张图像"
answer: 1
explain: "DeOcc-1-to-3 将去遮挡和多视角生成联合微调，目标是一次输出结构一致的六视角结果，避免 2D 补全与 3D 推理脱节。"
```

### iLSPR

```yaml
id: ilspr
num: 32
name: iLSPR
full_name: 学习型场景点云配准 (iLSPR)
year: '2026'
org: Elsevier
parent: colmap
paper_url: https://www.sciencedirect.com/science/article/pii/S0736584525002583
project_url: ''
category: reconstruction
motivation: 提升机器人在智能制造环境中的空间感知能力
```

#### 📝 一句话总结
iLSPR 提出面向智能制造的学习型场景点云配准框架，通过 MF-RPMN、几何基元数据生成和工业 CAD 模型库，把传感器采集的局部点云与高保真工件模型自动对齐，提升机器人对生产场景中物体位姿的空间感知精度。

#### 🎯 核心要点
- **工业场景对象配准**：从 RGB-D/深度相机采集的场景点云中分割工件点云，并与 CAD 模型点云配准
- **MF-RPMN 网络**：Multi-Feature Robust Point Matching Network 同时利用原始几何和深度特征，学习鲁棒点匹配
- **GPDG 数据生成**：Geometric-Primitive-based Data Generation 用机械设计常见几何基元合成训练点云，缓解工业数据稀缺
- **数字模型库**：收集生产线目标对象的高保真 CAD/STL 模型，作为配准源模型和场景重建资产
- **ISOPR 数据集**：在 NVIDIA Isaac Sim 中构建 Industrial Scene Object Point-cloud Registration benchmark，共 2000 个测试样本
- **真实系统验证**：在机器人制造系统中验证，可用于工件位姿估计和数字化场景重建
- **公开性能**：作者新闻稿报告 translational MAE 0.004、rotational MAE 0.297，相比 RPMNet 分别提升 20.0% 和 25.2%

#### 🔬 深入细节
##### 核心示意图

![iLSPR 工业场景点云配准流程](https://raw.githubusercontent.com/macs-lab/iLSPR-inspection/main/Images/iLSPR.png)
*图：iLSPR 官方仓库 Figure 1。机器人系统由机械臂、工件、平台和 RGB-D 相机组成；系统采集场景点云，分割出工件局部点云，再将对应 CAD 模型注册到场景中。*

##### 算法伪代码

```python
# iLSPR 推理与训练数据生成伪代码
def generate_gpdg_training_data(geometric_primitives, cad_library):
    samples = []
    for cad in cad_library:
        primitive_composition = decompose_or_augment(cad, geometric_primitives)
        for pose in random_poses():
            full_model = sample_surface_points(primitive_composition)
            partial_scan = simulate_depth_camera(full_model, pose)
            samples.append((partial_scan, full_model, pose.R, pose.t))
    return samples


def train_mf_rpmn(samples):
    for det_points, gt_points, R_gt, t_gt in samples:
        det_feat = point_feature_encoder(det_points)
        gt_feat = point_feature_encoder(gt_points)
        matches = robust_matching(det_points, gt_points, det_feat, gt_feat)
        R_pred, t_pred = solve_rigid_transform(matches)
        loss = pose_loss(R_pred, t_pred, R_gt, t_gt) + matching_loss(matches)
        update_network(loss)


def infer_ilspr(scene_point_cloud, cad_library, mf_rpmn):
    object_points = segment_by_predefined_bbox(scene_point_cloud)
    best_model = select_candidate_model(object_points, cad_library)
    R, t = mf_rpmn.register(object_points, best_model.point_cloud)
    reconstructed_scene = place_cad_model(best_model, R, t)
    return reconstructed_scene, R, t
```

##### 动机与背景

智能制造中的空间感知与通用三维重建不同。通用 SfM/MVS 或 SLAM 更关注场景整体几何是否完整，而工业机器人更关心目标工件的精确位置和姿态，误差往往要达到毫米级或接近毫米级才能服务抓取、装配、检测和加工。与此同时，工业数据通常少、对象类别由生产线决定，真实标注昂贵，普通点云配准方法容易在局部观测、遮挡和传感器噪声下失稳。

iLSPR 把问题定义为 scene point-cloud registration：运行时相机看到的是包含平台、机械臂、工件和背景的场景点云，系统先依据预定义区域或检测模块取出工件局部点云，再把高保真 CAD 模型对齐到该局部观测。输出的刚体变换 \((\mathbf{R},\mathbf{t})\) 既是工件位姿，也可用于将 CAD 模型放回数字场景。

##### MF-RPMN：多特征鲁棒匹配

点云刚体配准的目标是找到：

$$
\mathbf{P}_{gt}=\mathbf{R}\mathbf{P}_{det}+\mathbf{t}
$$

其中 \(\mathbf{P}_{det}\) 是传感器检测到的局部点云，\(\mathbf{P}_{gt}\) 是 CAD 模型采样点云。传统 ICP 对初值敏感，RPMNet/DCP 等学习方法在通用对象上有效，但工业零件常存在对称、孔洞、薄壁和局部可见问题。MF-RPMN 的设计动机是同时利用原始点坐标、法向等几何信息和网络学习到的深层特征，获得更稳健的点匹配。

在配准网络中，匹配矩阵可理解为：

$$
\mathbf{M}_{ij}=\text{softmatch}\left(
\phi(\mathbf{p}_i^{det}),\phi(\mathbf{p}_j^{gt}),
\mathbf{p}_i^{det},\mathbf{p}_j^{gt}
\right)
$$

随后根据软对应估计刚体变换，常见做法是加权 Procrustes/SVD。iLSPR 的公开摘要强调 MF-RPMN 同时学习 raw data 和 deep features，这正是为了解决局部扫描与完整 CAD 之间的分布差异。

##### GPDG：几何基元数据生成

工业 CAD 零件通常由基础几何体通过拉伸、旋转、布尔运算等组合而成。GPDG 利用这种先验，用三角/四角/多边形棱柱、棱锥、圆柱、圆锥、球等几何基元合成或增强部件点云。相比单纯在 ModelNet40/ABC 上训练，这种数据更贴近机械零件的结构规则，也能低成本生成大量带精确位姿标签的配准样本。

GPDG 的价值不只是“造数据”，而是把机械设计中的形状归纳偏置注入学习过程。网络见到更多孔、边、平面、柱面和对称结构组合后，在真实生产线零件上更容易形成可迁移的匹配特征。

##### ISOPR 数据集

iLSPR 官方仓库公开了 ISOPR 数据集说明。数据在 Isaac Sim 中模拟工业场景，包含 UR10 机械臂、半封闭平台、固定深度相机和工件。深度相机分辨率为 640×480，水平视场角 30°。工件从数字模型库中选择，随机平移范围约 \([-0.2m,0.2m]\)，随机旋转范围约 \([-45^\circ,45^\circ]\)。

每个样本包含 CAD ground-truth 点云及法向、检测点云及法向、旋转矩阵 \(\mathbf{R}\) 和平移向量 \(\mathbf{t}\)。数据共 5 个 pkl 文件，每个 400 个样本，总计 2000 个测试样本。这个设置比通用点云 benchmark 更接近“传感器看到局部工件，系统需要恢复 CAD 模型位姿”的工业任务。

##### 与 COLMAP/传统重建的区别

COLMAP 通过图像匹配、SfM、MVS 重建静态场景，适合从多视角照片恢复稀疏/稠密几何；iLSPR 面向的是已知工业对象模型与单次/少次传感器观测之间的精确刚体注册。它不试图从零恢复所有几何，而是利用 CAD 模型库把“识别并对齐工件”作为核心任务。

> 💡 关键：iLSPR 的优势来自任务设定清晰：工业目标对象是已知 CAD 模型，难点不是开放世界重建，而是在有限、噪声、局部观测下把正确模型以高精度放到正确位置。

#### 🧪 练习题
```yaml
question: "iLSPR 中 GPDG 的主要作用是什么？"
options:
  - "把 RGB 图像转换为文本描述"
  - "利用机械几何基元生成传感器风格训练点云，缓解工业配准数据稀缺"
  - "替代刚体变换求解"
  - "将点云渲染成新视角图像"
answer: 1
explain: "GPDG 基于机械零件常见几何基元合成训练数据，使 MF-RPMN 在缺少大量真实标注时仍能学习工业对象的配准特征。"
```
