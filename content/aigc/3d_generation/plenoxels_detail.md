### Plenoxels（光场体素, Plenoxels）论文精读
```yaml
id: plenoxels
name: Plenoxels
full_name: 光场体素 (Plenoxels)
year: 2022
organization: UC Berkeley
paper_url: https://arxiv.org/abs/2112.05131
category: representation
parent: nerf
motivation: 稀疏体素+球谐函数无需神经网络
```

#### 📝 一句话总结
Plenoxels 证明了 NeRF 式新视角合成不一定需要 MLP：用稀疏体素直接存密度和球谐颜色系数，也能通过可微体渲染从多视角图像优化出高质量辐射场。

#### 🎯 核心要点
- **显式表示**：每个活跃体素存储密度 $\sigma$ 和 spherical harmonics 颜色系数，查询时三线性插值。
- **无需神经网络**：优化变量就是体素参数，避免大量 MLP 前向查询，训练速度显著提高。
- **正则化关键**：总变分（TV）等空间正则约束密度和颜色系数，防止体素噪声和漂浮伪影。
- **取舍**：速度快、可解释性强，但内存随空间分辨率增长，对大场景和连续细节的压缩能力弱于神经编码。

#### 🔬 深入细节
**核心示意图/框架图**

![Plenoxels sparse voxel radiance field](https://ar5iv.labs.arxiv.org/html/2112.05131/assets/x1.png)

Plenoxels 的“Plenoptic Voxels”把辐射场拆成两个显式表：密度网格和颜色基函数系数网格。给定空间点 $\mathbf{x}$，先在稀疏体素结构中插值得到 $\sigma(\mathbf{x})$ 和一组球谐系数 $\mathbf{k}_{lm}(\mathbf{x})$；给定方向 $\mathbf{d}$，颜色由球谐基展开：

$$
\mathbf{c}(\mathbf{x},\mathbf{d})=\sum_{l=0}^{L}\sum_{m=-l}^{l}\mathbf{k}_{lm}(\mathbf{x})Y_{lm}(\mathbf{d}).
$$

这样，视角相关外观由方向基函数表达，空间变化由体素参数表达。渲染仍然使用 NeRF 同款 alpha compositing，因此训练损失可以保持为像素重建误差。

**算法伪代码**

```python
initialize_sparse_voxels()
for step in training_steps:
    rays, target = sample_rays(images, poses)
    samples = sample_points_along_rays(rays)

    sigma = trilinear_interpolate(density_grid, samples.xyz)
    sh_coef = trilinear_interpolate(sh_grid, samples.xyz)
    rgb = evaluate_spherical_harmonics(sh_coef, samples.viewdir)
    pred = volume_render(sigma, rgb, samples.depth)

    loss = mse(pred, target)
    loss += lambda_tv * total_variation(density_grid, sh_grid)
    loss += lambda_sparsity * sparsity_regularizer(density_grid)
    update_voxel_values(loss)
    prune_low_density_voxels()
```

Plenoxels 的重要意义在于把“NeRF 的效果”与“必须使用神经网络”解耦。NeRF 的核心其实是可微体渲染和多视角监督，MLP 只是其中一种连续函数参数化。Plenoxels 用显式网格换来更直接的优化：梯度更新落在局部体素上，因此收敛快；但也更依赖网格分辨率和剪枝策略。

正则化是这篇论文能工作的关键。没有 TV 约束时，显式体素很容易把每个训练视角的误差记成孤立噪声；TV 让相邻体素的密度和颜色系数平滑变化，稀疏正则推动空区域密度变小。它也提示后续方法：显式结构需要强约束，隐式结构则把一部分平滑性藏在网络架构和编码中。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "Plenoxels 为什么不需要 MLP 也能表达视角相关颜色？"
    answer: "它在体素中存储球谐函数系数，颜色由观察方向上的球谐基展开得到。"
  - type: tradeoff
    prompt: "Plenoxels 相比 NeRF 的主要速度优势来自哪里？"
    answer: "查询变成体素插值和球谐求值，不需要大量 MLP 前向计算。"
  - type: regularization
    prompt: "TV 正则在 Plenoxels 中起什么作用？"
    answer: "约束相邻体素参数平滑，减少噪声、漂浮密度和过拟合训练视角。"
```
