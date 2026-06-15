### CG-SLAM — 一致性高斯场SLAM (Consistent Gaussian Field SLAM)

```yaml
id: cg-slam
name: CG-SLAM
full_name: "一致性高斯场SLAM (Consistent Gaussian Field SLAM)"
year: "2024"
org: "ECCV 2024"
paper_url: "https://link.springer.com/chapter/10.1007/978-3-031-72698-9_6"
category: "slam"
parent: "orb-slam3"
motivation: "不确定性感知一致3DGS建图"
```

#### 📝 一句话总结

CG-SLAM 提出面向 RGB-D SLAM 的一致性、不确定性感知 3D Gaussian 场，通过深度不确定性建模、尺度正则、深度一致性损失和 GPU 加速位姿求导，解决了直接套用 3DGS 到在线 SLAM 时几何不稳定和跟踪效率不足的问题。

#### 🎯 核心要点

- **不确定性感知高斯场**：为渲染图像和 Gaussian primitives 建模深度不确定性，筛除不稳定或低价值高斯
- **α 深度与 median depth 对齐**：约束体渲染深度和主导高斯深度一致，使高斯更贴合真实表面
- **尺度正则化**：抑制过度各向异性高斯，减少边缘处箭头状伪影和过拟合
- **SLAM 专用 CUDA rasterizer**：分析 3DGS 对相机位姿的导数，构建适合跟踪和建图解耦的 GPU 框架
- **低不确定性跟踪**：跟踪时优先使用稳定、信息量高的高斯，提升位姿优化速度和鲁棒性
- **滑动窗口 BA**：结合当前帧、最近关键帧和 NetVLAD 共视关键帧，联合优化位姿和场景表示
- **多数据集验证**：在 Replica、TUM RGB-D、ScanNet 上评估定位、重建、渲染和运行效率

#### 🔬 深入细节

![CG-SLAM 系统流水线](https://raw.githubusercontent.com/hjr37/open_access_assets/main/cg-slam/images/pipeline.png)
*图：CG-SLAM 官方项目页流水线。RGB-D 序列被构造成带不确定性的 3D Gaussian field，渲染 RGB、深度、opacity 和 uncertainty，用于 mapping 与 tracking。*

```python
# CG-SLAM 核心流程伪代码
def cg_slam(rgbd_stream):
    gaussians = initialize_dense_gaussians(rgbd_stream[0])
    keyframes = []

    for frame in rgbd_stream:
        # 1. Tracking：只用低不确定性区域优化当前位姿
        pose = constant_velocity_init()
        for _ in range(track_iters):
            rgb_hat, depth_hat, opacity, uncertainty = render_uncertain_gs(gaussians, pose)
            mask = select_low_uncertainty_pixels(opacity, uncertainty)
            loss = mask * (rgb_loss(rgb_hat, frame.rgb) + depth_loss(depth_hat, frame.depth))
            pose = optimize_pose_lie_algebra(pose, loss)

        # 2. Mapping：优化高斯并更新不确定性
        if should_add_keyframe(frame, pose):
            keyframes.append((frame, pose))
            add_gaussians_on_unobserved_pixels(gaussians, frame, pose)

        for kf in select_mapping_window(keyframes):
            rgb_hat, depth_ab, depth_med, opacity, uncertainty = render_all(gaussians, kf.pose)
            map_loss = rgb_loss(rgb_hat, kf.rgb)
            map_loss += depth_loss(depth_ab, kf.depth)
            map_loss += median_depth_alignment(depth_ab, depth_med)
            map_loss += scale_regularization(gaussians)
            gaussians = optimize_gaussians(gaussians, map_loss)

        # 3. 剪除或降低高不确定性高斯的不透明度
        update_gaussian_uncertainty(gaussians, keyframes)
        suppress_unreliable_gaussians(gaussians)

        # 4. 滑动窗口 BA 降低累计误差
        sliding_bundle_adjustment(gaussians, keyframes)

    return gaussians, keyframes
```

##### 动机与背景

3D Gaussian Splatting 的渲染非常快，但它最初服务于离线新视角合成，不天然保证几何可用于相机跟踪。高斯可以通过各向异性尺度和不透明度过拟合训练视角，看起来 RGB 很好，却不一定贴在真实表面上；一旦相机从新视角跟踪，这些漂浮或拉伸的 primitives 会给位姿优化错误梯度。

CG-SLAM 的目标是把 3DGS 改造成“SLAM 可用”的场景表示。它保留 3DGS 的快速 rasterization，但增加几何稳定性约束和不确定性机制，让地图不仅能渲染，还能支撑连续位姿估计。

##### 一致性 Gaussian 场

标准 3DGS 通过前向 α-blending 渲染颜色和深度：

$$
\hat{C}(p)=\sum_i T_i(p)\alpha_i(p)c_i,\quad
\hat{D}_{ab}(p)=\sum_i T_i(p)\alpha_i(p)d_i
$$

其中 \(\hat{D}_{ab}\) 是 alpha-blending depth。CG-SLAM 进一步渲染 median depth \(\hat{D}_{med}\)，即累计透射率第一次达到阈值时主导高斯的深度。若 \(\hat{D}_{ab}\) 与 \(\hat{D}_{med}\) 差异大，说明一个像素的深度由多个不一致高斯混合而来，几何表面不集中。

因此 mapping loss 会加入深度一致性项：

$$
\mathcal{L}_{align}=\left\|\hat{D}_{ab}-\hat{D}_{med}\right\|_1
$$

这个损失迫使主要贡献高斯靠近传感器观测深度，减少“看似颜色正确、实际几何漂浮”的情况。

##### 不确定性建模

CG-SLAM 把深度观测误差传播成 uncertainty map，并进一步给每个 Gaussian primitive 估计不确定性。一个高斯的不确定性来自它在多个关键帧中的 dominated pixels：如果这个高斯主导的像素深度与传感器深度长期不一致，它就不是可靠几何。

高不确定性的高斯不会立刻被删除，而是先降低不透明度，让优化有机会修正；若持续不可靠，再被剪枝。跟踪阶段则优先使用低不确定性像素和低不确定性高斯，避免用伪影去估计相机运动。

##### 尺度正则与各向异性控制

3DGS 的各向异性高斯很容易拉成长条来拟合训练图像边缘，但这种长条在新视角下会产生几何伪影。CG-SLAM 用 scale regularization 控制尺度比例：

$$
\mathcal{L}_{iso}=\sum_i \left\|\frac{\max(s_i)}{\min(s_i)}-\eta\right\|_+
$$

公式表达的是直觉：允许高斯有一定各向异性，但不能无限拉伸。这样既保留 3DGS 对表面的拟合能力，又减少不稳定 primitives 对 tracking 的破坏。

##### 跟踪、建图与滑动 BA

CG-SLAM 用 Lie algebra 表示位姿增量，在固定 Gaussian 场上直接优化相机位姿。建图阶段则固定或联合优化关键帧窗口内的高斯参数。滑动 BA 选取最近关键帧、当前帧和 NetVLAD 检索出的共视关键帧，共同降低累计误差。

> ⚠️ 注意：CG-SLAM 的重点不是加入语义，而是让 3DGS 在几何上足够稳定。后续 SDD-SLAM、GTS-SLAM 等方法往往把它作为 3DGS-SLAM 的几何基线，再加入动态语义或多传感器耦合。

#### 🧪 练习题

```yaml
question: "CG-SLAM 中深度不确定性模型的主要作用是什么？"
options:
  - "为每个高斯随机分配语义类别"
  - "识别并降低不可靠高斯对跟踪和建图优化的影响"
  - "把 RGB-D 输入转换为纯文本导航指令"
  - "完全替代深度传感器"
answer: 1
explain: "CG-SLAM 根据高斯主导像素与真实深度的偏差估计不确定性，跟踪时优先使用低不确定性区域，并在建图时抑制或剪枝不稳定高斯。"
```
