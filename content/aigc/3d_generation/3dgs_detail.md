### 3D-GS（3D高斯泼溅, 3D Gaussian Splatting）论文精读
```yaml
id: 3dgs
name: 3D-GS
full_name: 3D高斯泼溅 (3D Gaussian Splatting)
year: 2023
organization: INRIA
paper_url: https://arxiv.org/abs/2308.04079
category: representation
parent: instant_ngp
motivation: 显式高斯实现100+FPS实时渲染
```

#### 📝 一句话总结
3D Gaussian Splatting 用一组可优化的各向异性 3D 高斯替代逐点 MLP 体渲染，并通过可微 tile-based splatting 实现高质量、实时级的新视角渲染。

#### 🎯 核心要点
- **表示对象**：每个 primitive 是带中心、协方差、不透明度和球谐颜色的 3D 高斯，而不是隐式 MLP 或规则体素。
- **渲染方式**：把 3D 高斯投影成屏幕空间 2D 椭圆，按深度排序后 alpha compositing。
- **优化策略**：从 SfM 点云初始化，训练中根据梯度和尺度进行 clone/split/prune，实现自适应密度控制。
- **影响**：把高质量 radiance field 渲染从离线推向实时，成为后续 3D 编辑、动态场景和生成式 3D 的基础表示。

#### 🔬 深入细节
**核心示意图/框架图**

![3D Gaussian Splatting method overview](https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x2.png)

3DGS 的每个高斯可写为：

$$
G(\mathbf{x})=\exp\left(-\frac{1}{2}(\mathbf{x}-\boldsymbol{\mu})^\top\Sigma^{-1}(\mathbf{x}-\boldsymbol{\mu})\right),
$$

其中协方差用旋转 $R$ 和尺度 $S$ 参数化为 $\Sigma=RSS^\top R^\top$，以保证半正定。颜色常用球谐系数表达方向相关外观，不透明度 $\alpha$ 控制该高斯对像素的贡献。

渲染时，高斯经相机投影近似为 2D 协方差：

$$
\Sigma' = J W \Sigma W^\top J^\top,
$$

其中 $W$ 是视图变换，$J$ 是投影雅可比。对每个 tile 收集可能覆盖的高斯，按深度排序，再执行前向 alpha compositing。

**算法伪代码**

```python
gaussians = initialize_from_sfm_points(point_cloud)
for step in training_steps:
    camera, target = sample_view()
    visible = project_gaussians_to_tiles(gaussians, camera)
    pred = rasterize_sorted_gaussian_splats(visible, camera)

    loss = l1(pred, target) + lambda_dssim * dssim(pred, target)
    update_gaussian_params(loss)

    if step % densify_interval == 0:
        clone_high_gradient_small_gaussians(gaussians)
        split_high_gradient_large_gaussians(gaussians)
        prune_low_opacity_or_huge_gaussians(gaussians)
```

3DGS 的关键不只是“用高斯”，而是把表示、初始化、优化和光栅化合成一个闭环。SfM 点云给出合理的初始几何位置；高斯的各向异性尺度让一个 primitive 能覆盖面片状结构；自适应 densification 在欠拟合区域增加容量；tile-based renderer 让 GPU 可以高效处理大量 splat。

相比 NeRF，3DGS 避免了沿射线密集采样，也不需要对每个采样点跑 MLP，因此渲染速度数量级提升。但它的显式 primitive 也带来新问题：高斯可能变得过大、过细或漂浮，边缘处可能出现半透明晕影。后续 HGS、2DGS、MCMC densification 等工作大多围绕这些 artifact 和几何一致性继续改进。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "3DGS 为什么能比 NeRF 渲染快很多？"
    answer: "它把高斯直接投影到屏幕并光栅化，避免沿每条射线做大量采样和 MLP 查询。"
  - type: formula
    prompt: "3D 高斯投影到屏幕空间时协方差近似如何计算？"
    answer: "Sigma' = J W Sigma W^T J^T，其中 W 是视图变换，J 是投影雅可比。"
  - type: analysis
    prompt: "densification 中 clone 和 split 分别适合什么情况？"
    answer: "小而高梯度的高斯适合 clone 增加局部容量；大而高梯度的高斯适合 split 细分结构。"
```
