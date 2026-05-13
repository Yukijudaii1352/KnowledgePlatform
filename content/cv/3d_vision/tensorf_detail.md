### TensoRF — Tensorial Radiance Fields

```yaml
id: tensorf
name: TensoRF
full_name: "张量辐射场 (Tensorial Radiance Fields)"
year: 2022
org: "UCSD / Adobe Research / University of Tübingen / ShanghaiTech"
paper_url: "https://arxiv.org/abs/2203.09517"
category: "3d_vision"
parent: "NeRF"
motivation: "将辐射场建模为张量分解问题，用CP和VM分解实现紧凑高效的场景表示，平衡质量与效率"
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