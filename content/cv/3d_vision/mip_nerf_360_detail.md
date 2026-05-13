### Mip-NeRF 360

```yaml
id: mip_nerf_360
name: "Mip-NeRF 360"
full_name: "Mip-NeRF 360: Unbounded Anti-Aliased Neural Radiance Fields"
year: "2022"
org: "Google"
paper_url: "https://arxiv.org/abs/2111.12077"
category: "foundation"
parent: "mip_nerf"
motivation: "通过场景收缩、在线蒸馏和基于区间的正则化，将 mip-NeRF 扩展到无界 360° 场景，解决 NeRF 难以处理无界大规模场景"
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