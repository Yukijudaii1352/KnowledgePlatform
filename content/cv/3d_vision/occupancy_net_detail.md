### Occupancy Networks

```yaml
id: occupancy_net
name: Occupancy Networks
full_name: 占用网络 (Occupancy Networks: Learning 3D Reconstruction in Function Space)
year: "2019"
org: Max Planck Institute for Intelligent Systems / University of Tübingen
paper_url: https://arxiv.org/abs/1812.03828
category: 3d_vision
parent: —
motivation: 通过学习连续占用函数实现任意分辨率的3D形状表示，突破离散体素和点云的分辨率限制
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