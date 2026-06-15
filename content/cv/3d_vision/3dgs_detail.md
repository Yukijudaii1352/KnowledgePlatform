### 3DGS

```yaml
id: 3dgs
name: 3DGS
full_name: 3D高斯泼溅 (3D Gaussian Splatting)
year: '2023'
org: Inria
paper_url: https://arxiv.org/abs/2308.04079
category: gaussian_splatting
parent: —
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
