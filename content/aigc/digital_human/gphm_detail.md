### 3D-GPHM — 用 3D Gaussian Splatting 构建参数化头部模型

```yaml
id: gphm
name: 3D-GPHM
full_name: "3D高斯参数化头部 (3D Gaussian Parametric Head Model)"
year: "2024"
org: "学术界"
paper_url: "https://link.springer.com/chapter/10.1007/978-3-031-72761-0_8"
category: "expression"
parent: "flame"
motivation: "3DGS表征的可动画化头部模型"
```

#### 📝 一句话总结

3D-GPHM 将 3D Gaussian Splatting 与身份/表情参数空间结合，构建可渲染、可拟合、可动画化的参数化头部模型，解决传统 mesh/SDF/NeRF 头模在细节质量、渲染速度和少样本重建上的折中问题。

#### 🎯 核心要点

- **Gaussian parametric head model**：以一组 3D 高斯椭球表示头部，并用 identity/expression latent 控制位置、形状和外观变化
- **实时高质量渲染**：继承 3DGS 的 splatting rasterization，渲染速度优于 NeRF 体渲染
- **形状与表情解耦**：身份 latent 控制个体外观和结构，expression/motion latent 控制动态表情
- **两阶段训练**：先训练 mesh-guided model，再迁移到 Gaussian model 并用 mesh 几何初始化高斯点，提升收敛稳定性
- **单目/少样本重建**：训练好参数先验后，可从 monocular video、few-shot image 甚至单图拟合头部 avatar
- **新增 GPHMv2 思路**：引入表达编码器、非面部运动编码器和 LivePortrait 生成的表达条件图，降低身份信息泄漏

#### 🔬 深入细节

##### 核心示意图

![GPHM method](https://arxiv.org/html/2407.15070/extracted/5944733/figures/method.jpg)
*图：GPHM/GPHMv2 将身份、表情和非面部运动条件映射到 3D Gaussian 属性，利用可微 splatting 训练并渲染高保真头部 avatar。*

##### 核心流程伪代码

```python
# GPHM 训练与拟合简化
def gphm_render(identity_code, expression_code, motion_code, camera):
    base_gaussians = canonical_gaussians()
    offsets = identity_mlp(identity_code) + expression_mlp(expression_code)
    dynamic = motion_mlp(motion_code)
    gaussians = update_gaussian_attributes(base_gaussians, offsets, dynamic)
    return gaussian_splatting_render(gaussians, camera)

# stage 1: mesh-guided warmup
train_mesh_guided_networks(multiview_images, landmarks)

# stage 2: initialize Gaussian points near learned mesh and train splatting model
initialize_gaussians_from_mesh()
for views in multiview_video:
    expr = expression_encoder(views.expression_condition)
    motion = non_face_motion_encoder(views.motion_condition)
    pred = gphm_render(identity_code, expr, motion, views.camera)
    loss = photometric_loss(pred, views.image)
    loss += landmark_loss(pred, views.landmarks)
    loss += regularize_gaussians()
    loss.backward()
```

##### 方法解读

传统参数化头模通常是 mesh 3DMM：低维、可控、可拟合，但毛发、耳朵、眼镜、皮肤细节和复杂外观不足。NeRF 类 head avatar 能渲染逼真图像，但体渲染慢，且几何一致性和动画控制不如显式参数模型。3D-GPHM 的核心判断是：3DGS 兼具显式点状几何和快速渲染，非常适合成为新一代参数化头模的底层表示。

每个 Gaussian 可包含位置 \(\mu\)、协方差 \(\Sigma\)、颜色/球谐系数 \(c\)、不透明度 \(\alpha\)。GPHM 不把这些属性完全自由优化成某个单人 avatar，而是让它们由低维参数驱动：

$$
G_i(\beta,\psi)=G_i^0+\Delta G_i^{id}(\beta)+\Delta G_i^{exp}(\psi)
$$

其中 \(\beta\) 是身份 latent，\(\psi\) 是表情 latent。这样模型既能保留 3DGS 的细节表达，又能像 FLAME 一样通过参数控制身份和表情。

训练高斯参数模型并不直接。3DGS 的点是无结构的，如果随机初始化，很容易出现点漂移、冗余、噪声和不稳定收敛。GPHM 因此采用两阶段策略：先用 mesh-guided model 学到大致头部几何，再把网络参数迁移到 Gaussian 模型，并把高斯点初始化在学到的表面附近。这个初始化比直接用 FLAME 模板更能覆盖头发和完整头部区域。

GPHMv2 进一步面向单目重建和跨身份 reenactment。它把表情、身份和非面部运动拆开编码，并用 LivePortrait 生成“同表情不同身份”的条件图，迫使 expression encoder 学表情而不是偷带身份外观。否则表达 latent 会泄漏头发、脸型、肤色等信息，跨身份驱动时目标 avatar 会被源身份污染。

与 FLAME 相比，GPHM 的优势是高频外观和完整头部渲染；与单人 3DGS avatar 相比，GPHM 的优势是有参数空间和先验，可少样本拟合、表达编辑和跨身份驱动。代价是训练数据和系统复杂度更高，而且泛化仍受训练身份、光照和发型分布限制。

> 💡 关键：GPHM 不是“给每个人训练一个 3DGS”，而是学习一个可由身份和表情 latent 控制的 Gaussian head prior。

#### 🧪 练习题

```yaml
question: "GPHM 为什么采用 mesh-guided 到 Gaussian 的两阶段训练？"
options:
  - "因为 3DGS 不能渲染彩色图像"
  - "因为随机训练无结构高斯点容易不稳定，mesh 引导能提供合理表面初始化"
  - "因为 FLAME 已经能表示所有头发细节"
  - "因为不需要任何多视角图像监督"
answer: 1
explain: "3D Gaussian 点属性自由度高，直接训练容易出现冗余和漂移。先学 mesh-guided 几何再初始化 Gaussian，可让高斯点靠近真实头部表面并稳定收敛。"
```
