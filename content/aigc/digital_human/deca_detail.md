### DECA — 在 FLAME 上学习可动画化的细节人脸

```yaml
id: deca
name: DECA
full_name: "可动画化细节人脸 (Learning Animatable Detailed 3D Face)"
year: "2021"
org: "MPI-IS"
paper_url: "https://arxiv.org/abs/2012.04012"
category: "expression"
parent: "flame"
motivation: "FLAME基础上增加细节置换"
```

#### 📝 一句话总结

DECA 在 FLAME 的低维可动画化头脸模型上增加 UV 位移细节解码器，从单张野外图像同时恢复稳定的粗几何、表情和可随表情变化的皱纹细节。

#### 🎯 核心要点

- **粗到细两阶段表征**：粗层用 FLAME 估计身份、表情、姿态、相机、反照率和光照；细层用 UV displacement map 补充皱纹和皮肤细节
- **可动画化细节**：细节解码器不仅依赖个人 detail code，还依赖表情，使皱纹可随表情变化
- **野外单图训练**：使用 differentiable rendering，把 landmark、photometric、identity、regularization 等损失组合起来训练
- **detail consistency**：同一身份不同表情的高频细节应共享身份相关部分，同时允许表情相关皱纹变化
- **FLAME 兼容**：输出仍保持 FLAME 参数接口，方便后续表情编辑、重定向和 talking head 驱动
- **弱监督优势**：不需要每张训练图都有高精 3D scan 标注，可从 2D 图像学习细节先验

#### 🔬 深入细节

##### 核心示意图

![DECA teaser](https://ar5iv.labs.arxiv.org/html/2012.04012/assets/images/teaser/deca_teaser_solid_lines2.png)
*图：DECA 从单张图像估计 FLAME 粗模型，并在 UV 空间生成可动画化细节位移。*

##### 核心流程伪代码

```python
# DECA 单图重建与训练简化
def deca_forward(image):
    coarse = coarse_encoder(image)
    beta, psi, theta, cam, albedo, lighting = unpack(coarse)
    flame_vertices = FLAME(beta, psi, theta)

    detail_code = detail_encoder(image)
    uv_disp = detail_decoder(detail_code, expression=psi, pose=theta)
    detailed_vertices = apply_uv_displacement(flame_vertices, uv_disp)

    rendered = differentiable_render(detailed_vertices, albedo, lighting, cam)
    return rendered, flame_vertices, detailed_vertices, uv_disp

for batch in images:
    rendered, coarse_mesh, detail_mesh, uv_disp = deca_forward(batch)
    loss = landmark_loss(rendered, batch)
    loss += photometric_loss(rendered, batch)
    loss += identity_loss(rendered, batch)
    loss += regularize_flame_and_detail(coarse_mesh, uv_disp)
    loss += detail_consistency_loss(batch)
    loss.backward()
```

##### 方法解读

FLAME 能稳定表达身份、表情和头部姿态，但它的网格是低频统计模型，无法表达额头纹、法令纹、眼角皱纹、嘴唇褶皱等高频几何。直接把这些细节烘焙到身份形状里会导致不可动画：一张皱眉图像的皱纹会在所有表情下都存在。DECA 的核心是把“可控粗模型”和“表情相关细节”分离。

粗层仍由 FLAME 给出：

$$
M_c = M_{\text{FLAME}}(\beta,\psi,\theta)
$$

其中 \(\beta\) 控制身份，\(\psi\) 控制表情，\(\theta\) 控制头颈和下颌姿态。粗层还估计相机 \(c\)、albedo \(\alpha\) 和 spherical harmonics lighting \(l\)，用于可微渲染和图像重建损失。

细层在 UV 空间预测 displacement map：

$$
D = F_d(z_d,\psi,\theta)
$$

这里 \(z_d\) 是从图像编码出的身份相关细节 latent，\(\psi,\theta\) 提供当前表情和姿态条件。将 \(D\) 沿法线方向施加到 FLAME 表面，就得到详细几何。UV 空间的好处是拓扑固定、方便卷积解码，也便于把细节贴回可动画化网格。

训练的难点是没有大规模“单图到高精细节 3D”的监督。DECA 用 differentiable rendering 把几何投影回图像，通过 2D landmark、光度误差、感知/身份特征和正则项训练。同时，detail consistency 约束同一身份在不同表情下的细节编码保持一致，避免网络把表情皱纹错误吸收到身份 detail code 中。

DECA 与普通 3D face reconstruction 的区别在于“细节可被重新驱动”。推理时保留 \(z_d\)，改变 \(\psi\) 就能生成同一身份在不同表情下合理变化的皱纹，而不是固定贴一张高频 bump map。这也是它被大量 avatar、talking head 和 face reenactment 方法采用的原因。

> 💡 关键：DECA 并不是替代 FLAME，而是在 FLAME 稳定参数空间上学习一个表情条件的高频位移层。

#### 🧪 练习题

```yaml
question: "DECA 为什么让细节解码器同时依赖 detail code 和表情参数？"
options:
  - "为了减少 FLAME 顶点数量"
  - "为了让身份相关皮肤细节稳定，同时让皱纹等高频细节随表情变化"
  - "为了完全不需要可微渲染"
  - "为了把 3D 模型转换成 2D 关键点"
answer: 1
explain: "如果细节只由身份 code 决定，皱纹会变成静态贴图；加入表情条件后，细节位移可以随笑、皱眉、张嘴等动作变化。"
```
