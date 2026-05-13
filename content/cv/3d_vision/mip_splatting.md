### Mip-Splatting

```yaml
id: mip_splatting
name: Mip-Splatting
full_name: "Mip-Splatting: Alias-free 3D Gaussian Splatting"
year: 2024
org: Tsinghua University & University of Tübingen
paper_url: https://arxiv.org/abs/2311.16493
category: gaussian_splatting
parent: 3dgs
motivation: "通过引入3D平滑滤波器和2D Mip滤波器，从信号处理角度解决3D高斯泼溅在缩放时的走样问题"
```

#### 📝 一句话总结

Mip-Splatting 从信号处理的采样定理出发，提出 **3D 平滑滤波器**（约束高斯基元的最大频率以消除放大时的高频伪影）和 **2D Mip 滤波器**（用物理意义明确的盒式滤波近似替代 dilation 以消除缩小时的走样），系统性地解决了 3D Gaussian Splatting 在不同采样率下的走样问题。

#### 🎯 核心要点

- **问题诊断**：3DGS 的 dilation 机制引入尺度模糊性（scale ambiguity），导致放大时出现高频伪影（erosion），缩小时出现亮度异常
- **3D 平滑滤波器**：基于训练视图的 Nyquist 频率上限，对每个 3D 高斯基元施加低通约束 \(\Sigma_k + \frac{s}{\hat{\nu}_k} \mathbf{I}\)，防止学习到超出训练分辨率可表达范围的高频信号
- **2D Mip 滤波器**：用高斯近似像素级盒式滤波器，将 2D 协方差替换为 \(\Sigma^{2D}_k + s\mathbf{I}\)，并引入归一化因子 \(\sqrt{|\Sigma^{2D}_k| / |\Sigma^{2D}_k + s\mathbf{I}|}\) 正确衰减小高斯的贡献
- **与 EWA 滤波器的区别**：Mip 滤波器目标是精确近似单像素的盒式滤波，而 EWA 滤波器是经验性带宽限制（覆盖 3×3 像素区域），导致过度模糊
- **即插即用**：基于 3DGS 开源代码，使用相同的损失函数、密度控制策略和超参数，仅增加两个滤波模块
- **多尺度基准**：在 Blender 多尺度训练/测试中 PSNR 达 34.56（3DGS 仅 29.77）；单尺度训练多尺度测试中平均 PSNR 31.97（3DGS 仅 24.84）

#### 🔬 深入细节

![Mip-Splatting 框架概览](https://arxiv.org/html/2311.16493v2/x1.png)
*图：Mip-Splatting 方法概览。左：3D 平滑滤波器基于训练视图的最大采样率约束高斯基元频率；右：2D Mip 滤波器在渲染时对投影后的 2D 高斯施加像素级低通滤波。*

##### 问题分析：3DGS 的 Dilation 与尺度模糊性

3D Gaussian Splatting 使用 3D 高斯基元表示场景，通过 Splatting 将其投影到 2D 图像平面进行可微渲染。原始 3DGS 在投影后的 2D 协方差矩阵上添加一个固定的 dilation 项（0.3 像素），以确保每个高斯至少覆盖一个像素，避免数值不稳定。

然而，论文指出 dilation 引入了**尺度模糊性**（scale ambiguity）：

$$
\mathcal{G}^{2D}_{k}(\mathbf{x})_{\text{dilation}} = e^{-\frac{1}{2}(\mathbf{x}-\mathbf{p}_k)^T (\boldsymbol{\Sigma}^{2D}_k + \epsilon \mathbf{I})^{-1} (\mathbf{x}-\mathbf{p}_k)}
$$

这个 dilation 项使得优化器无法区分一个"本身很小但被 dilation 放大"的高斯和一个"本身就是该大小"的高斯。具体而言：

- **放大（zoom-in）时**：小高斯在低分辨率训练时被 dilation 掩盖，放大后暴露出高频伪影（erosion effect）
- **缩小（zoom-out）时**：dilation 不随分辨率变化而缩放，导致小高斯在低分辨率下贡献过多能量，产生亮度异常

> 💡 关键：dilation 的根本问题在于它是一个**与采样率无关的固定偏移**，破坏了高斯基元的物理尺度信息。

##### 3D 平滑滤波器：约束最大可表达频率

论文从采样定理出发：对于一个 3D 高斯基元 \(k\)，其在训练集中被观测到的最大采样率决定了它能可靠表达的最高频率。

**采样间隔计算**：对于第 \(n\) 个训练视图，像素间隔映射到 3D 空间的采样间隔为：

$$
\hat{T}_n = \frac{d_n}{f_n}
$$

其中 \(d_n\) 是相机到高斯中心的距离，\(f_n\) 是焦距。

**最大采样率**：取所有训练视图中的最大值：

$$
\hat{\nu}_k = \max_n \frac{f_n}{d_n}
$$

**3D 低通滤波**：将高斯与一个方差为 \(\frac{1}{2\hat{\nu}_k}\) 的低通滤波器卷积，等价于增大协方差：

$$
\boldsymbol{\Sigma}_k^{\text{smooth}} = \boldsymbol{\Sigma}_k + \frac{s}{\hat{\nu}_k} \mathbf{I}
$$

其中 \(s\) 是一个超参数（论文中取 0.2）。这确保了当渲染分辨率高于训练分辨率时，高斯基元不会产生超出其可表达范围的高频细节。

> ⚠️ 注意：最大采样率 \(\hat{\nu}_k\) 每 100 次迭代重新计算一次以提高效率，而非每次迭代都计算。

##### 2D Mip 滤波器：物理意义明确的抗锯齿

在成像过程中，理想的像素值应是该像素区域内连续信号的积分，即与一个盒式滤波器（box filter）卷积。论文用高斯函数近似这个盒式滤波器：

$$
\mathcal{G}^{2D}_{k}(\mathbf{x})_{\text{mip}} = \sqrt{\frac{|\boldsymbol{\Sigma}^{2D}_k|}{|\boldsymbol{\Sigma}^{2D}_k + s\mathbf{I}|}} \cdot e^{-\frac{1}{2}(\mathbf{x}-\mathbf{p}_k)^T (\boldsymbol{\Sigma}^{2D}_k + s\mathbf{I})^{-1} (\mathbf{x}-\mathbf{p}_k)}
$$

其中 \(s\) 取 0.1（近似覆盖单个像素）。

**关键设计——归一化因子**：

$$
\sqrt{\frac{|\boldsymbol{\Sigma}^{2D}_k|}{|\boldsymbol{\Sigma}^{2D}_k + s\mathbf{I}|}}
$$

这个因子确保当高斯远小于一个像素时（即 \(\boldsymbol{\Sigma}^{2D}_k \to 0\)），其贡献被正确衰减至零。这与 dilation 的行为形成鲜明对比——dilation 会让极小的高斯仍然贡献完整的不透明度。

```python
# Mip-Splatting 核心伪代码
# 训练阶段
for iteration in range(30000):
    # 每 100 次迭代更新 3D 采样率
    if iteration % 100 == 0:
        for k in gaussians:
            nu_k = max(f_n / d_n(k) for n in training_views)
    
    # 3D 平滑滤波：约束高频
    for k in gaussians:
        Sigma_3d_smooth = Sigma_3d[k] + (s_3d / nu_k) * I_3x3  # s_3d = 0.2
    
    # Splatting 投影到 2D
    Sigma_2d = project(Sigma_3d_smooth)  # JW Sigma W^T J^T
    
    # 2D Mip 滤波：替代 dilation
    for k in gaussians:
        norm_factor = sqrt(det(Sigma_2d[k]) / det(Sigma_2d[k] + s_2d * I_2x2))  # s_2d = 0.1
        Sigma_2d_mip = Sigma_2d[k] + s_2d * I_2x2
        G_mip = norm_factor * gaussian(x, p_k, Sigma_2d_mip)
    
    # Alpha compositing 渲染
    C = sum(c_k * alpha_k * G_mip_k * prod(1 - alpha_j * G_mip_j) for j < k)
    
    # 标准 3DGS 损失
    loss = (1 - lambda) * L1(C, C_gt) + lambda * SSIM(C, C_gt)
    loss.backward()
```

##### 与 EWA Splatting 的对比

EWA（Elliptical Weighted Average）Splatting 同样在 2D 协方差上添加滤波器，但其设计目标和效果不同：

| 特性 | Mip-Splatting (2D Mip Filter) | EWA Splatting |
|------|-----|-----|
| 设计目标 | 近似单像素盒式滤波 | 限制频率信号带宽 |
| 滤波器大小 | 覆盖 ~1 像素 (\(s=0.1\)) | 覆盖 ~3×3 像素（单位协方差） |
| 归一化 | 有（正确衰减小高斯） | 无 |
| 缩小效果 | 清晰且无走样 | 过度模糊 |

##### 实验结果

**Blender 多尺度训练/测试**（Table 1）：

| 方法 | Full | 1/2 | 1/4 | 1/8 | Avg PSNR |
|------|------|-----|-----|-----|----------|
| 3DGS | 33.65 | 28.24 | 24.78 | 22.40 | 29.77 |
| 3DGS + EWA | 33.62 | 32.11 | 30.38 | 27.93 | 33.01 |
| Mip-NeRF | 35.74 | 35.38 | 33.90 | 33.01 | 34.51 |
| **Mip-Splatting** | **35.50** | **35.37** | **34.21** | **33.14** | **34.56** |

**Blender 单尺度训练→多尺度测试**（Table 2）：

| 方法 | Full | 1/2 | 1/4 | 1/8 | Avg PSNR |
|------|------|-----|-----|-----|----------|
| 3DGS | 33.33 | 26.95 | 21.38 | 17.69 | 24.84 |
| 3DGS + EWA | 33.51 | 31.66 | 27.82 | 24.63 | 29.40 |
| **Mip-Splatting** | **33.36** | **34.00** | **31.85** | **28.67** | **31.97** |

**MipNeRF 360 放大测试**（Table 5，训练 1× 测试至 8×）：

| 方法 | 1× | 2× | 4× | 8× | Avg PSNR |
|------|-----|-----|-----|-----|----------|
| 3DGS | 29.19 | 23.50 | 20.71 | 19.59 | 23.25 |
| 3DGS + EWA | 29.30 | 25.90 | 23.70 | 22.81 | 25.43 |
| **Mip-Splatting** | **29.39** | **27.39** | **26.47** | **26.22** | **27.37** |

**消融实验**表明：去除 3D 平滑滤波器导致放大时高频伪影（PSNR 从 27.37 降至 26.93）；去除 2D Mip 滤波器主要影响缩小质量（PSNR 降至 27.23）；同时去除两者会因密度控制机制产生过多小高斯导致 OOM。

#### 🧪 练习题

```yaml
question: "Mip-Splatting 中 2D Mip 滤波器的归一化因子 √(|Σ²ᴰ| / |Σ²ᴰ + sI|) 的主要作用是什么？"
options:
  - "加速渲染过程中的矩阵求逆运算"
  - "确保滤波后高斯的总能量守恒"
  - "当高斯投影远小于一个像素时正确衰减其贡献"
  - "将不同尺度的高斯归一化到相同的协方差范围"
answer: 2
explain: "当 Σ²ᴰ → 0（高斯远小于像素）时，归一化因子趋近于 0，正确地衰减了该高斯的贡献，避免了 dilation 中小高斯仍贡献完整不透明度的问题。"
```