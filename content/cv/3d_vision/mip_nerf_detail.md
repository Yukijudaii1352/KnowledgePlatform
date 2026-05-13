### Mip-NeRF: 多尺度抗锯齿神经辐射场

```yaml
id: mip_nerf
name: Mip-NeRF
full_name: "Mip-NeRF: A Multiscale Representation for Anti-Aliasing Neural Radiance Fields"
year: 2021
organization: Google
paper_url: https://arxiv.org/abs/2103.13415
category: nerf
parent: nerf
motivation: 用圆锥台采样替代射线点采样，结合集成位置编码(IPE)解决NeRF在多尺度渲染时的走样问题
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

1. **概念题：** 为什么Mip-NeRF中沿射线方向的高斯均值 $\mu_t$ 不等于锥台的几何中心 $(t_0+t_1)/2$？这个偏移的物理含义是什么？

2. **推导题：** 给定位置编码 $\gamma(x) = \sin(\omega x)$，其中 $x \sim \mathcal{N}(\mu, \sigma^2)$，请推导 $\mathbb{E}[\sin(\omega x)]$ 的闭式解，并解释为什么结果中包含 $\exp(-\frac{1}{2}\omega^2\sigma^2)$ 项。

3. **设计题：** 如果要将Mip-NeRF扩展到处理运动模糊（即曝光时间内相机移动），你会如何修改锥台的高斯参数化？需要在哪个维度上增加方差？

4. **分析题：** 在Mip-NeRF的单MLP训练中，为什么coarse损失的权重 $\lambda$ 设为0.1而非1.0？如果设为1.0会出现什么问题？如果设为0（完全去掉coarse损失）又会怎样？