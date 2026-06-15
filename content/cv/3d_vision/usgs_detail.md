### USGS

```yaml
id: usgs
name: USGS
full_name: 稀疏视角高斯泼溅 (USGS)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2601.xxxxx
category: gaussian_splatting
parent: 3dgs
motivation: 正则化技术优化稀疏视角下的重建质量
```

#### 📝 一句话总结

USGS 指向 “Enhancing sparse view synthesis with unseen viewpoint regularization in 3D Gaussian splatting”，核心思想是在 3DGS 的稀疏视角训练中引入未见视角正则，缓解少量输入视角导致的过拟合、几何漂移和新视角伪影。

#### 🎯 核心要点

- **稀疏视角 3DGS 问题**：标准 3DGS 依赖密集相机覆盖，少视角下高斯容易只拟合训练视图而无法泛化到未见视角
- **未见视角正则**：围绕训练相机或场景包围盒采样虚拟视角，在这些视角上约束渲染结果的几何/外观一致性
- **面向泛化的优化目标**：训练损失不只包含输入视图 photometric loss，还加入未见视角上的平滑、深度、结构或跨视角一致性项
- **兼容 3DGS 管线**：保留高斯中心、协方差、不透明度、球谐颜色和 densification/pruning 机制，只在优化中增强监督
- **针对稀疏退化**：重点抑制浮动高斯、过大高斯椭球、背景雾化、纹理粘连和新视角空洞等少视角常见问题
- **公开元信息修正**：用户给定 arXiv 链接为占位符；可检索到的正式记录是 Pattern Recognition 170:112087，DOI 10.1016/j.patcog.2025.112087

#### 🔬 深入细节

##### 核心示意图

![3DGS 基底流程图](https://ar5iv.labs.arxiv.org/html/2308.04079/assets/x1.png)
*图：3D Gaussian Splatting 原始方法的公开示意图。USGS 的论文链接目前是占位符，公开全文图不可稳定访问；这里用 3DGS 基底流程说明其插入位置：USGS 仍优化显式高斯集合，但在训练视图之外加入未见视角正则。*

##### 算法伪代码

```python
# USGS 风格的未见视角正则化训练伪代码
def train_usgs_sparse(images, cameras, sparse_colmap_points):
    gaussians = initialize_from_sparse_points(sparse_colmap_points)

    for step in range(num_steps):
        cam_gt, image_gt = sample_training_view(cameras, images)
        render_gt = render_3dgs(gaussians, cam_gt)
        photo_loss = l1_ssim(render_gt.rgb, image_gt)

        # 在训练相机附近或相机轨迹间插值采样未见视角
        cam_unseen = sample_unseen_view(cameras, mode="interpolate_or_perturb")
        render_unseen = render_3dgs(gaussians, cam_unseen)

        # 正则项的公开细节有限，这里按“unseen viewpoint regularization”的核心整理
        depth_reg = local_depth_smoothness(render_unseen.depth)
        opacity_reg = suppress_floating_opacity(render_unseen.alpha)
        consistency_reg = cross_view_consistency(
            render_unseen,
            nearest_training_views=cameras,
        )

        loss = photo_loss \
             + lambda_d * depth_reg \
             + lambda_o * opacity_reg \
             + lambda_c * consistency_reg

        update_gaussians(gaussians, loss)

        if should_densify(step):
            densify_and_prune_with_sparse_view_guards(gaussians)

    return gaussians
```

##### 动机与背景

3DGS 在密集输入视角下表现很好，因为每个高斯 primitive 能被多个视角反复约束：中心位置由多视角几何收敛，协方差由投影误差塑形，不透明度和颜色由多视角 photometric loss 共同修正。稀疏视角下这些条件不成立。某个高斯可能只在一两张训练图中可见，优化器只需要让训练图像素误差下降，就能把高斯放到错误深度或拉成过大的椭球；从训练相机看似乎正确，换到未见视角就出现雾状漂浮物、破碎几何或背景纹理粘到前景上。

USGS 的标题把关键设计写得很直接：用 unseen viewpoint regularization 增强 sparse view synthesis。也就是说，训练时不要只问“在已有相机上是否重建得像”，还要问“从没有图像监督的邻近视角看是否仍像一个合理的 3D 场景”。这类方法的核心不是替换 3DGS 表示，而是在优化目标中加入未见视角上的几何和外观约束。

##### 3DGS 基础目标

标准 3DGS 把场景表示为高斯集合：

$$
G_i=\{\boldsymbol{\mu}_i,\mathbf{\Sigma}_i,\alpha_i,\mathbf{c}_i\}
$$

渲染到像素 \(p\) 时，按深度排序进行 alpha compositing：

$$
C(p)=\sum_{i\in \mathcal{N}(p)} T_i \alpha_i \mathbf{c}_i,\quad
T_i=\prod_{j<i}(1-\alpha_j)
$$

密集视角训练通常优化：

$$
\mathcal{L}_{\text{photo}}=(1-\lambda)\|I-\hat{I}\|_1+\lambda \mathcal{L}_{\text{D-SSIM}}
$$

稀疏视角下，仅靠 \(\mathcal{L}_{\text{photo}}\) 是欠约束的。USGS 类方法会扩展为：

$$
\mathcal{L}=
\mathcal{L}_{\text{photo}}+
\lambda_u\mathcal{L}_{\text{unseen}}+
\lambda_g\mathcal{L}_{\text{geometry}}
$$

其中 \(\mathcal{L}_{\text{unseen}}\) 在虚拟相机上计算，用来惩罚不稳定的未见视角渲染；\(\mathcal{L}_{\text{geometry}}\) 通常约束深度平滑、法向一致、局部尺度或 opacity 分布。由于公开全文不可访问，具体项名和公式应以正式论文为准；这里给出的是与题名和 3DGS 稀疏视角问题一致的机制解读。

##### 未见视角正则的直觉

未见视角可以由相机插值、邻近训练视角扰动、围绕场景中心的小幅轨道采样等方式生成。虽然这些视角没有真实 RGB 标签，但它们仍能产生自监督约束。例如，一个合理表面在相邻虚拟视角下的深度应该局部连续；同一个 3D 高斯投影到两个相近视角时，外观和 alpha 分布不应剧烈跳变；背景区域不应被高 opacity 的漂浮高斯覆盖。

可以把 USGS 看成给 3DGS 增加“反过拟合压力”。训练视图 photometric loss 会推动模型解释已有像素，未见视角正则则阻止模型用只对训练视图成立的投机几何来解释像素。二者平衡后，高斯更倾向于落在真实表面附近，而不是漂浮在相机前方或被拉成过大的半透明面片。

##### 与其他稀疏 3DGS 方法的区别

不少稀疏 3DGS 方法依赖外部深度估计、双模型 co-regularization、dropout、语义先验或扩散模型生成伪视图。USGS 的题名强调 unseen viewpoint regularization，因此重点更像是“从训练视图之外增加约束”，而不是完全依赖额外传感器或生成模型。它的优势是工程上容易接入现有 3DGS 优化循环：渲染虚拟视角、计算正则、反向传播即可。

> ⚠️ 注意：用户给定的 `https://arxiv.org/abs/2601.xxxxx` 明显是占位符。本文档保留输入 YAML 以满足交付规范；正文方法细节基于可检索 DOI 元信息、题名和稀疏视角 3DGS 的公开技术背景整理，不把未公开公式伪装成已核验论文原文。

#### 🧪 练习题

```yaml
question: "USGS 中“未见视角正则”的核心作用是什么？"
options:
  - "让 3DGS 只优化训练图像的 RGB 重建误差"
  - "在没有真实图像监督的虚拟视角上约束几何和渲染一致性，减少稀疏视角过拟合"
  - "把所有高斯替换为 NeRF MLP"
  - "用文本提示生成 3D 物体"
answer: 1
explain: "稀疏视角下训练图像误差不足以约束真实几何；未见视角正则通过虚拟相机检查渲染稳定性，使高斯分布更符合可泛化的 3D 结构。"
```
