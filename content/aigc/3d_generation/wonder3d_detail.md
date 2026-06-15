### Wonder3D：跨域扩散生成一致多视图
```yaml
id: wonder3d
name: Wonder3D
full_name: 神奇3D (Wonder3D)
year: "2024"
org: HKU
paper_url: https://arxiv.org/abs/2310.15008
category: feed_forward
parent: mvdream
motivation: 跨域扩散生成一致多视图
```

#### 📝 一句话总结
Wonder3D 提出用跨域扩散模型同时生成多视图 RGB 图和法线图，解决单图到 3D 中多视图外观、几何不一致的问题。它把 2D 扩散先验转化为一致的多视图监督，再通过法线融合和重建模块得到可用 3D 资产。

#### 🎯 核心要点
- 双域输出：同一扩散过程同时预测多视图颜色图与多视图法线图。
- 跨域注意力：让 RGB 分支和 normal 分支共享结构信息，减少纹理与几何错位。
- 多视图一致性：固定一组正交或环绕相机视角，生成可直接用于重建的视图集合。
- 单图条件控制：输入参考图提供物体身份、轮廓和纹理风格，扩散模型补全不可见面。
- 下游重建：把多视图 RGB/normal 作为监督，优化神经表面或网格纹理，得到可渲染 3D 资产。

#### 🔬 深入细节
![Wonder3D 框架图](https://www.xxlong.site/Wonder3D/assets/pipeline.png)
*图：Wonder3D 项目页给出的整体流程，从单张输入图生成一致多视图 RGB/normal，再进行 3D 重建。*

```python
# Wonder3D 核心流程伪代码
image = load_reference_image()
views = sample_fixed_cameras(num_views=6)

# 1. 多视图跨域扩散
rgb_views, normal_views = cross_domain_diffusion(
    condition=image,
    cameras=views,
    domains=["rgb", "normal"],
)

# 2. 用法线约束几何，用 RGB 约束外观
surface = initialize_implicit_surface()
for step in range(num_reconstruction_steps):
    rendered_rgb, rendered_normal = render(surface, views)
    loss = l1(rendered_rgb, rgb_views) + lambda_n * normal_loss(rendered_normal, normal_views)
    surface.update(loss)

mesh = extract_mesh(surface)
texture = bake_texture(mesh, rgb_views)
```

Wonder3D 的动机来自单图 3D 生成中的两个典型失败：第一，扩散模型逐视角生成时会把同一物体的不同侧面画成不同实例；第二，只依靠 RGB 监督重建时，几何会被纹理误导，出现凹凸不一致、背面塌陷或轮廓漂移。它把问题拆成“先生成一致多视图观测，再重建 3D”，避免直接在 3D 空间用 2D 分数蒸馏慢速优化。

核心设计是跨域扩散。模型不是单独生成颜色图，而是把颜色域 \(I_v\) 与法线域 \(N_v\) 作为两个互补输出：颜色负责身份和材质，法线负责几何朝向。跨域注意力让两个域之间交换中间特征，使颜色边界、局部部件和法线结构互相校正。直观地说，法线分支告诉 RGB 分支“这个部件应该转到哪里”，RGB 分支告诉法线分支“这个区域属于哪个语义部件”。

多视图一致性通常通过固定相机集合实现。给定输入图 \(I_0\) 和视角集合 \(\{c_v\}_{v=1}^{V}\)，扩散网络学习条件分布：

$$
p_{\theta}(\{I_v, N_v\}_{v=1}^{V} \mid I_0, \{c_v\}_{v=1}^{V})
$$

与只生成单视角图像相比，这个联合分布把不同视角放在同一次 denoising 过程中建模，因此同一 token/注意力上下文可以跨视角传播，减少“每张图都合理但合在一起不成立”的问题。

重建阶段把生成结果转为显式或隐式 3D。颜色损失约束表面纹理，法线损失约束局部几何方向：

$$
\mathcal{L}=\sum_v \|R_{\text{rgb}}(S,c_v)-I_v\|_1+
\lambda_n\sum_v \|R_{\text{normal}}(S,c_v)-N_v\|_1
$$

> 💡 关键：Wonder3D 的核心不是提出新的 3D 表示，而是用“RGB + normal 的一致多视图生成”给后端重建提供更可靠的观测。

相对 MVDream 这类多视图扩散方法，Wonder3D 更强调跨域几何信号。MVDream 主要解决多视图外观一致性，Wonder3D 则把法线作为显式中间监督，让几何重建不必完全从 RGB 中推断表面朝向。这也是它能在单图条件下减少背面扭曲和细节漂移的主要原因。

#### 🧪 练习题
```yaml
question: "Wonder3D 为什么同时生成 RGB 图和法线图？"
options:
  - "为了把生成速度降低到可交互级别"
  - "为了让外观与几何互相约束，提高多视图重建一致性"
  - "为了避免使用任何 3D 重建模块"
  - "为了只训练一个纯文本到图像模型"
answer: 1
explain: "RGB 提供纹理和语义，法线提供表面朝向；二者通过跨域注意力协同，能显著减少多视图几何和外观不一致。"
```
