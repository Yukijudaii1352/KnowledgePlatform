### SGS-SLAM — 语义高斯泼溅SLAM (Semantic Gaussian Splatting SLAM)

```yaml
id: sgs-slam
name: SGS-SLAM
full_name: "语义高斯泼溅SLAM (Semantic Gaussian Splatting SLAM)"
year: "2024"
org: "ECCV 2024"
paper_url: "https://link.springer.com/chapter/10.1007/978-3-031-72751-1_10"
category: "slam"
parent: "orb-slam3"
motivation: "语义高斯泼溅多通道渲染"
```

#### 📝 一句话总结

SGS-SLAM 提出了首个基于 3D Gaussian Splatting 的语义视觉 SLAM 系统，通过 RGB、深度和语义通道的联合可微渲染优化，解决了 NeRF-SLAM 语义边界过平滑、渲染慢和物体级几何不清晰的问题。

#### 🎯 核心要点

- **多通道高斯表示**：每个 Gaussian 同时携带几何、颜色和语义颜色/标签通道，用同一 splatting 管线渲染 RGB、深度、语义图
- **语义特征损失**：把 2D 语义先验映射到 3D 场景，在 mapping loss 中联合优化，提升物体边缘和语义一致性
- **直接高斯渲染跟踪**：固定 3D Gaussian 地图，只优化当前相机位姿，使渲染图像、深度和语义与输入对齐
- **语义引导关键帧选择**：先用几何重叠筛选候选，再用语义 mIoU 去除语义重复视角，减少累积误差导致的错误重建
- **不确定性加权关键帧**：对较晚关键帧设置更高不确定性权重，缓解跟踪误差随时间累积对建图的影响
- **物体级编辑能力**：语义通道使系统能定位和操作特定物体高斯，作为下游场景编辑与对象级理解基础
- **实时渲染优势**：相比隐式 NeRF 体渲染，3DGS 的 rasterization 让语义、深度和颜色渲染更适合在线 SLAM

#### 🔬 深入细节

![SGS-SLAM 系统示意](https://arxiv.org/html/2402.03246v6/extracted/6021012/figures/abstract.png)
*图：SGS-SLAM 将 RGB-D 和 2D 语义先验输入到 Gaussian Splatting 表示中，通过多通道可微渲染联合优化外观、几何和语义。*

```python
# SGS-SLAM 核心流程伪代码
def sgs_slam(rgbd_stream, semantic_stream):
    gaussians = initialize_from_first_frame(rgbd_stream[0], semantic_stream[0])
    keyframes = []

    for frame, semantic in zip(rgbd_stream, semantic_stream):
        # 1. Tracking：冻结高斯，只优化当前相机位姿
        pose = constant_velocity_init()
        for _ in range(num_tracking_iters):
            rgb_hat, depth_hat, sem_hat, silhouette = render(gaussians, pose)
            loss = visible(silhouette) * (
                l_rgb(rgb_hat, frame.rgb)
                + l_depth(depth_hat, frame.depth)
                + l_semantic(sem_hat, semantic)
            )
            pose = update_pose(pose, loss)

        # 2. Keyframe：几何重叠 + 语义差异选择有价值视角
        if is_keyframe(frame, pose):
            keyframes.append((frame, semantic, pose))
        selected = semantic_guided_keyframe_selection(keyframes, frame, semantic)

        # 3. Mapping：冻结位姿，优化高斯颜色/深度/语义通道
        for kf in selected:
            rgb_hat, depth_hat, sem_hat, silhouette = render(gaussians, kf.pose)
            map_loss = l_rgb(rgb_hat, kf.rgb) + l_depth(depth_hat, kf.depth)
            map_loss += l_semantic(sem_hat, kf.semantic)
            gaussians = optimize_gaussians(gaussians, map_loss, weight=kf.uncertainty)

        # 4. 对低覆盖区域补充新高斯
        add_gaussians_where_silhouette_low(gaussians, frame, semantic, pose)

    return gaussians, keyframes
```

##### 动机与背景

NeRF 系列 SLAM 用 MLP 表示场景，具有连续表面和新视角合成能力，但在线 SLAM 中体渲染代价高，并且 MLP 容易把物体边界过度平滑。语义 SLAM 更需要清晰的对象边界，因为导航、操作和场景编辑都依赖“这个高斯属于哪类物体”而不是只看 RGB 逼真度。

SGS-SLAM 的关键观察是：3D Gaussian Splatting 的显式点状 primitives 可以直接增加新通道。标准 3DGS 渲染颜色和深度，SGS-SLAM 进一步给高斯增加语义通道，使语义图也通过前向 α-blending 被渲染出来，再与 2D 语义先验做监督。

##### 多通道 Gaussian 表示

每个高斯可写成：

$$
G_i=\{\mu_i, r_i, \alpha_i, c_i, s_i\}
$$

其中 \(\mu_i\) 是中心位置，\(r_i\) 是尺度或半径，\(\alpha_i\) 是不透明度，\(c_i\) 是 RGB 颜色，\(s_i\) 是语义颜色或语义编码。渲染时，系统将高斯投影到图像平面，并按深度从近到远做前向合成：

$$
\hat{C}(p)=\sum_i T_i(p)\alpha_i(p)c_i,\quad
\hat{S}(p)=\sum_i T_i(p)\alpha_i(p)s_i
$$

这里 \(T_i(p)=\prod_{j<i}(1-\alpha_j(p))\) 是前方高斯的透射率。RGB、深度和语义使用同一可微可见性结构，因此语义损失会影响高斯几何和可见性，不只是训练一个后处理分割器。

##### Tracking 与 Mapping 解耦

跟踪阶段固定 Gaussian 地图，只优化相机位姿。损失函数由可见区域上的 RGB、深度和语义残差组成：

$$
\mathcal{L}_{track} =
\lambda_c\mathcal{L}_{rgb}
+\lambda_d\mathcal{L}_{depth}
+\lambda_s\mathcal{L}_{sem}
$$

系统只在 silhouette 足够大的像素上计算残差，避免尚未重建区域给位姿优化提供错误梯度。mapping 阶段则固定关键帧位姿，优化 Gaussian 的位置、颜色、不透明度和语义通道，并在低覆盖区域添加新高斯。

##### 语义引导关键帧选择

普通 3DGS-SLAM 常按时间间隔或几何共视选择关键帧，容易反复优化语义高度重复的视角。SGS-SLAM 先估计当前帧与候选关键帧的几何 overlap，再计算语义图之间的 mIoU。若两个视角语义内容几乎相同，即便几何重叠高，也可能对优化贡献有限；系统更偏好几何相关但语义信息互补的关键帧。

这个机制的直觉是：建图不仅要“看见同一块墙”，还要从不同语义布局中理解物体边界。语义差异较大的关键帧能补充对象级几何，减少因早期位姿误差或局部过拟合造成的错误重建。

> 💡 关键：SGS-SLAM 把语义从后处理标签变成参与高斯优化的通道。语义损失反过来约束几何，提升物体级边界质量。

##### 与 SemGauss-SLAM 的区别

SGS-SLAM 更强调语义颜色/标签通道的多通道渲染和语义引导关键帧选择；后续 SemGauss-SLAM 则把语义表示进一步改为 DINOv2 语义特征 embedding，并提出 semantic-informed bundle adjustment。两者都属于 3DGS 语义 SLAM，但 SGS-SLAM 是把 3DGS 带入语义 SLAM 的早期代表。

#### 🧪 练习题

```yaml
question: "SGS-SLAM 中语义引导关键帧选择的核心作用是什么？"
options:
  - "只保留语义图完全相同的关键帧以减少噪声"
  - "结合几何重叠与语义差异，选择对物体级建图更有信息量的视角"
  - "用语义分割结果替代所有 RGB 和深度监督"
  - "把所有关键帧都转入长期记忆以降低显存"
answer: 1
explain: "SGS-SLAM 先筛选几何相关视角，再避免语义高度重复的关键帧，从而提升语义边界和对象级几何优化质量。"
```
