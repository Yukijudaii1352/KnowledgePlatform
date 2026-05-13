### NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis

```yaml
id: nerf
name: NeRF
full_name: "NeRF: Representing Scenes as Neural Radiance Fields for View Synthesis"
year: 2020
org: UC Berkeley / Google Research / UC San Diego
paper_url: https://arxiv.org/abs/2003.08934
category: 3d_vision
parent: "—"
motivation: "用 MLP 隐式表示连续 5D 辐射场（位置+视角→颜色+密度），结合经典体渲染实现照片级新视角合成，开启神经渲染新时代"
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