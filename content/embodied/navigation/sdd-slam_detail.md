### SDD-SLAM — 语义驱动动态SLAM (Semantic-Driven Dynamic SLAM)

```yaml
id: sdd-slam
name: SDD-SLAM
full_name: "语义驱动动态SLAM (Semantic-Driven Dynamic SLAM)"
year: "2025"
org: "IEEE RA-L"
paper_url: "https://ieeexplore.ieee.org/document/10966164"
category: "slam"
parent: "cg-slam"
motivation: "语义驱动动态场景高斯SLAM"
```

#### 📝 一句话总结

SDD-SLAM 将语义动态目标识别与 3D Gaussian Splatting SLAM 结合，在跟踪和建图中尽量只使用静态一致区域，解决动态物体干扰下位姿估计漂移和高斯地图污染的问题。

#### 🎯 核心要点

- **动态场景目标**：面向人员、车辆等动态物体会破坏静态世界假设的视觉 SLAM 场景
- **语义驱动筛选**：利用语义分割/检测先验区分潜在动态类别，并生成静态区域监督掩码
- **动态一致性检查**：结合观测与渲染地图的一致性识别真正运动区域，避免只按类别误删可用静态物体
- **静态区域跟踪**：位姿优化主要在静态掩码内计算 RGB-D/几何残差，降低动态前景对相机位姿的影响
- **静态地图更新**：mapping 时对动态区域降权、跳过或延迟更新，避免移动物体被固化成 3DGS 地图伪影
- **继承 3DGS 优势**：保留高斯显式表示的实时渲染和高保真地图能力
- **公开资料限制**：IEEE 页面可访问性有限，以下方法细节基于题目元信息、摘要索引和 3DGS 动态 SLAM 通用机制整理

#### 🔬 深入细节

![3DGS-SLAM 基线流水线示意](https://raw.githubusercontent.com/hjr37/open_access_assets/main/cg-slam/images/pipeline.png)
*图：SDD-SLAM 原论文图在当前环境中未能公开获取。这里用其父系 CG-SLAM 的 3DGS-SLAM 流水线说明基础结构；SDD-SLAM 的核心是在该类跟踪/建图流程中加入语义驱动动态区域筛选。*

```python
# SDD-SLAM 核心流程伪代码（基于公开摘要与动态 3DGS-SLAM 机制整理）
def sdd_slam(rgbd_stream):
    gaussians = initialize_static_gaussian_map(rgbd_stream[0])

    for frame in rgbd_stream:
        # 1. 语义先验：检测潜在动态类别
        semantic_mask = semantic_segment(frame.rgb)
        potential_dynamic = dynamic_category_mask(semantic_mask)

        # 2. 动态一致性：比较当前观测与静态地图渲染
        rgb_hat, depth_hat = render(gaussians, predicted_pose())
        residual_mask = photometric_geometric_inconsistency(
            frame.rgb, frame.depth, rgb_hat, depth_hat
        )
        dynamic_mask = refine_dynamic_mask(potential_dynamic, residual_mask)
        static_mask = invert(dynamic_mask)

        # 3. Tracking：只用静态区域优化相机位姿
        pose = optimize_pose(
            gaussians=gaussians,
            observation=frame,
            mask=static_mask,
        )

        # 4. Mapping：动态区域不写入或低权重写入
        map_loss = static_mask * render_loss(gaussians, frame, pose)
        gaussians = optimize_gaussian_map(gaussians, map_loss)
        suppress_gaussians_in_dynamic_regions(gaussians, dynamic_mask, pose)

    return gaussians
```

##### 动机与背景

大多数 3DGS-SLAM 系统默认世界静止：同一空间位置在不同帧中应该呈现一致颜色、深度和几何。如果画面中有人经过、车辆移动或机器人穿过拥挤区域，动态物体上的像素会同时破坏两件事：tracking 会把前景运动误解释成相机运动，mapping 会把移动物体写入静态高斯地图。

传统动态 SLAM 常用特征剔除或语义掩码过滤动态点。SDD-SLAM 的挑战更高，因为 3DGS-SLAM 是渲染驱动的：错误动态区域不只是几个特征点，而会通过可微渲染优化影响高斯位置、尺度、不透明度和颜色，造成漂浮高斯或重复物体。

##### 语义驱动动态掩码

SDD-SLAM 的“Semantic-Driven”强调用语义先验引导动态区域识别。给定输入帧，语义网络先给出每个像素的类别 \(y_t(p)\)。潜在动态类别集合 \(\mathcal{C}_{dyn}\) 可定义初始掩码：

$$
M^{prior}_t(p)=\mathbb{1}[y_t(p)\in\mathcal{C}_{dyn}]
$$

但语义类别并不等于运动状态：停着的车可以是静态背景，站着的人也可能暂时不动。因此系统还需要结合当前观测与已有静态地图渲染的残差：

$$
R_t(p)=\lambda_c\|I_t(p)-\hat{I}_t(p)\|_1+\lambda_d\|D_t(p)-\hat{D}_t(p)\|_1
$$

只有当语义先验和一致性残差共同指向异常时，像素才更可能被视为动态干扰。这能降低“按类别全删”的过度保守问题。

##### 静态区域位姿估计

动态掩码得到后，位姿优化只在静态区域计算残差：

$$
\mathcal{L}_{track}=
\sum_p (1-M^{dyn}_t(p))
\left(
\lambda_c\|I_t(p)-\hat{I}_t(p)\|_1
+\lambda_d\|D_t(p)-\hat{D}_t(p)\|_1
\right)
$$

这个设计的直觉很直接：SLAM 要估计的是相机相对静态世界的运动，动态物体不应该参与坐标系定义。把动态像素从 tracking loss 中剔除，能减少前景运动对相机位姿的错误拉动。

##### 动态区域建图抑制

mapping 阶段同样要避免动态物体污染 3DGS 地图。对于动态掩码覆盖区域，系统可以采用三类策略：不添加新高斯、降低已有高斯的不透明度或置信度、延迟到多帧确认静态后再更新。这样，高斯地图会趋向于表示长期静态背景，而不是把每一帧出现的行人都写成场景结构。

> ⚠️ 注意：由于 IEEE 原文和图在当前环境中未能展开，上述算法块保留为基于公开摘要、题名和父系 3DGS-SLAM 结构的精读整理；具体模块命名与阈值应以论文原文为准。

##### 与 CG-SLAM 的关系

CG-SLAM 解决的是静态 RGB-D 场景中 3D Gaussian field 的几何稳定性；SDD-SLAM 面向动态场景，在此类 3DGS-SLAM 框架上加入语义动态区域处理。可以把 CG-SLAM 看成“稳定的静态高斯场”，SDD-SLAM 则把“哪些像素可用于静态场优化”变成核心问题。

#### 🧪 练习题

```yaml
question: "SDD-SLAM 在动态场景中引入语义掩码的主要目的是什么？"
options:
  - "让所有动态类别都被永久写入地图"
  - "识别并降低动态区域在位姿估计和高斯建图中的影响"
  - "用语义标签替代相机位姿"
  - "只提升最终渲染图的颜色饱和度"
answer: 1
explain: "动态物体会破坏静态世界假设。语义驱动掩码帮助系统在 tracking 和 mapping 中重点使用静态一致区域，从而减少漂移和地图伪影。"
```
