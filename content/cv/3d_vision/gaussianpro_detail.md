### GaussianPro

```yaml
id: gaussianpro
name: GaussianPro
full_name: 渐进式高斯优化 (GaussianPro)
year: '2024'
org: ICML
paper_url: https://openreview.net/forum?id=lQ3SEBH1gF
category: gaussian_splatting
parent: 3dgs
motivation: 渐进式传播策略优化高斯密度分布
```

#### 📝 一句话总结

GaussianPro 将经典 MVS 的传播和 patch matching 引入 3DGS 密度控制，用已重建区域的深度/法线渐进式生成新高斯，并通过平面约束正则高斯形状，解决 SfM 稀疏初始化在低纹理大场景中导致的高斯分布不足问题。

#### 🎯 核心要点

- 针对 3DGS 初始化依赖：低纹理道路、墙面等区域 SfM 点少，原始 clone/split 难以从无点区域生长出正确高斯
- 混合几何表示：将 3D 高斯渲染为 2D depth map 和 normal map，利用图像网格上的结构化邻域传播几何
- Progressive Gaussian Propagation：通过 patch matching 将可靠深度/法线从已建模区域传播到欠建模区域
- 几何过滤与选择：使用多视图一致性过滤传播结果，并根据渲染深度与过滤深度差异选择需新增高斯的像素
- 平面约束优化：用传播法线监督渲染法线，并用 scale regularization 鼓励高斯变扁贴合表面
- 大场景收益明显：在 Waymo 数据集上相对 3DGS 提升约 1.15 dB PSNR，同时保持实时渲染速度

#### 🔬 深入细节

![GaussianPro 渐进式传播流程](https://ar5iv.labs.arxiv.org/html/2402.14650/assets/x2.png)
*图：GaussianPro 的 Progressive Propagation。由当前高斯渲染 depth/normal，patch matching 传播几何，经一致性过滤后反投影生成新高斯。*

```python
# GaussianPro 训练伪代码
gaussians = initialize_3dgs_from_sfm()

for it in range(num_iters):
    image, depth, normal = render_rgb_depth_normal(gaussians, camera)
    loss = image_reconstruction_loss(image, target)

    if it % propagation_interval == 0:
        # 1. 在 2D 图像空间传播局部平面
        prop_depth, prop_normal = patch_match_propagation(
            rendered_depth=depth,
            rendered_normal=normal,
            reference_view=camera,
            neighbor_views=select_neighbors(camera),
        )

        # 2. 几何一致性过滤
        filt_depth, filt_normal, valid = multiview_filter(prop_depth, prop_normal)

        # 3. 找到现有高斯未能解释的区域并新增高斯
        mask = abs(filt_depth - depth) / depth > sigma
        new_points = backproject(mask, filt_depth, filt_normal, camera)
        gaussians.add(initialize_gaussians(new_points, normals=filt_normal))

    # 4. 平面约束
    loss += beta * normal_consistency(rendered_normal, filt_normal, valid)
    loss += gamma * min_scale_regularization(gaussians)
    loss.backward()
    optimizer.step()
```

**动机与背景**

原始 3DGS 从 SfM 稀疏点云初始化，再根据梯度 clone/split 高斯。这个策略在纹理丰富区域有效，因为 SfM 已经提供了点，图像重建梯度也能指示哪里需要更密的 primitive。但大规模驾驶场景中存在大量低纹理表面，例如道路、墙体、天空边界附近的平面结构，SfM 往往没有足够点。没有初始高斯，就很难通过局部 split/clone 补出来。

GaussianPro 的关键思想是借鉴 MVS：不要只在 3D 高斯集合内部做局部密度控制，而是把当前几何投影到 2D 图像空间，在规则像素网格上做深度/法线传播。2D 空间有天然邻域结构，适合从已建模区域向欠建模区域传播平面假设。

**混合几何表示**

对每个高斯，深度来自高斯中心投影到当前相机坐标系的 \(z_i\)。法线由协方差最短轴近似，因为优化后的表面高斯通常会变扁：

$$
n_i = R_i[r,:],\qquad r=\arg\min([s_1,s_2,s_3])
$$

然后像渲染颜色一样用 alpha blending 渲染 depth map 和 normal map。这样，离散无序的 3D 高斯被转换为结构化的 2D 几何图，便于后续 patch matching。

**渐进式传播与 patch matching**

每个像素的深度和法线可定义一个局部平面。对像素 \(p\)，论文从邻域像素选择多个平面候选，并用单应性把参考视图像素映射到邻近视图：

$$
H=K\left(W_{\text{rel}}-\frac{t_{\text{rel}}n_{k_l}^{T}}{d_{k_l}}\right)K^{-1}
$$

候选平面的优劣通过 NCC 颜色一致性评估。最一致的候选用于更新该像素的深度和法线。重复若干轮后，可靠几何可以从已有高斯覆盖区域传播到低纹理或缺失区域。

> 💡 关键：GaussianPro 新增高斯的位置不是随机 clone/split 出来的，而是由多视图 patch matching 估计出的 depth/normal 反投影得到，因此更容易落在真实表面上。

**几何过滤与新增高斯**

传播结果可能有误，因此需要多视图几何一致性检查。过滤后，GaussianPro 比较过滤深度与当前渲染深度的相对差异：

$$
\frac{|\bar{D}(p)-\hat{D}(p)|}{\hat{D}(p)}>\sigma
$$

满足阈值的区域说明现有高斯未能准确解释该表面，于是将这些像素按过滤深度和法线反投影回 3D，并初始化为新高斯加入优化。随着训练进行，新增高斯会继续被渲染、传播和优化，形成渐进式密度补全。

**平面约束优化**

3DGS 的图像损失并不直接约束高斯形状，可能出现高斯漂浮、朝向混乱或不贴合平面。GaussianPro 引入法线一致性：

$$
\mathcal{L}_{normal}=\sum_{p\in\mathcal{Q}}\|\hat{N}(p)-\bar{N}(p)\|_1+
\left|1-\hat{N}(p)^T\bar{N}(p)\right|
$$

并加入最小尺度正则 \(\mathcal{L}_{scale}\)，鼓励高斯沿法线方向变薄：

$$
\mathcal{L}_{planar}=\beta\mathcal{L}_{normal}+\gamma\mathcal{L}_{scale}
$$

最终训练损失为 3DGS 图像重建损失加上平面约束。论文设置传播周期为固定迭代间隔，例如每 50 次迭代触发一次传播。

**与 3DGS 的区别**

3DGS 的密度控制是局部、梯度驱动、基于已有高斯的；GaussianPro 的密度控制是几何传播驱动的，可以在现有高斯不足的区域生成新 primitive。它特别适合低纹理大场景，因为这些区域图像梯度弱但几何连续性强，MVS 式传播正好能利用这种连续性。

#### 🧪 练习题

```yaml
question: "GaussianPro 为什么要把 3D 高斯渲染成 depth/normal map 后再做传播？"
options:
  - "因为 2D 图像空间有规则邻域，便于用 patch matching 从可靠区域向欠建模区域传播几何"
  - "因为 3DGS 无法渲染 RGB 图像"
  - "因为这样可以完全取消相机参数"
  - "因为所有高斯都必须变成球形"
answer: 0
explain: "3D 高斯集合拓扑不规则，不便直接搜索表面邻域；投影到 2D depth/normal map 后可使用 MVS 的平面传播和多视图一致性来生成新高斯。"
```
