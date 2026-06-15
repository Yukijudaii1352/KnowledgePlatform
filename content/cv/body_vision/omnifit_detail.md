### OmniFit

```yaml
id: omnifit
name: OmniFit
full_name: 全能拟合 (OmniFit)
year: '2026.04'
org: arXiv
paper_url: https://arxiv.org/abs/2604.21575
category: mesh
parent: pear
motivation: 尺度无关稠密地标预测统一处理穿衣人体
```

#### 📝 一句话总结

OmniFit 提出尺度无关的稠密人体地标预测框架，把全扫描、局部深度、RGB 辅助点云和尺度失真的 AI 生成资产统一转成 SMPL-X 拟合问题。它解决了穿衣人体资产来源多样、尺度未知和几何缺失时传统 3D body fitting 不稳定的问题。

#### 🎯 核心要点

- **多模态 body fitting**：统一处理 full scan、partial depth、multi-view/RGB-conditioned point cloud 和生成式 3D 资产。
- **Scale-agnostic dense landmarks**：不直接回归 SMPL-X 参数，而是先为表面点预测稠密身体地标。
- **条件 Transformer 解码器**：将输入表面点映射到标准人体模板上的 dense landmark 对应关系。
- **SMPL-X 后端拟合**：利用预测地标作为几何约束，再优化 SMPL-X 形状、姿态、平移和尺度。
- **图像适配器**：可插拔地引入 RGB 视觉线索，补偿局部深度或稀疏点云缺失的信息。
- **尺度预测器**：把真实或合成资产恢复到规范人体比例，缓解生成资产尺度失真。

#### 🔬 深入细节

##### 核心示意图

![OmniFit 稠密地标预测器](https://zcai0612.github.io/OmniFit/static/images/landmark_predictor.png)
*图：OmniFit 的核心 landmark predictor 将观测表面点映射到稠密人体地标，再用这些地标驱动 SMPL-X 拟合。*

##### 算法伪代码

```text
Algorithm: OmniFit dense landmark prediction and SMPL-X fitting
# OmniFit 多模态人体拟合流程
def omnifit(input_asset, rgb_images=None):
    points, features = normalize_and_sample_surface(input_asset)

    if rgb_images is not None:
        image_feat = image_adapter(rgb_images, points)
        features = fuse(features, image_feat)

    dense_landmarks = conditional_transformer_decoder(points, features)
    scale = scale_predictor(points, dense_landmarks)
    points_canonical = points * scale

    smplx_params = initialize_smplx()
    for _ in range(num_fit_iters):
        smplx_vertices, smplx_landmarks = SMPLX(smplx_params)
        loss = landmark_alignment_loss(smplx_landmarks, dense_landmarks)
        loss += surface_chamfer_loss(smplx_vertices, points_canonical)
        loss += pose_shape_regularization(smplx_params)
        smplx_params = optimize(loss)

    return SMPLX(smplx_params)
```

##### 动机与背景

传统 3D body fitting 往往假设输入是度量尺度正确的完整扫描，或者拥有足够多视角图像可做优化。现实资产更复杂：深度相机只看到人体局部，穿衣扫描表面与裸体 SMPL-X 模板差异很大，AI 生成 3D 角色常有整体尺度和身体比例漂移。直接最小化 Chamfer 距离时，衣服褶皱、裙摆、外套和缺失区域会把拟合拉偏。

OmniFit 的关键思想是先预测“人体语义对应关系”，再做参数拟合。稠密地标相当于告诉优化器：这个表面点大致对应人体模板上的哪个语义位置。这样即使输入带衣服或尺度未知，也能把优化目标从纯几何最近邻转为更稳定的语义对齐。

##### 稠密地标表示

设输入观测点云为 \(P=\{p_i\}_{i=1}^N\)，OmniFit 学习预测每个点对应的模板地标 \(l_i\) 或其在 SMPL-X canonical surface 上的位置：

$$
\hat{L}=f_\theta(P, F, c)
$$

其中 \(F\) 是点特征，\(c\) 可包含模态条件或图像特征。与稀疏关键点相比，dense landmarks 覆盖躯干、四肢、头部等大面积区域，对衣物和局部缺失更稳。与直接预测 SMPL-X 参数相比，地标是局部几何监督，泛化到新扫描设备或生成资产更自然。

##### 尺度无关拟合

尺度是 3D 资产拟合中的隐藏难点。若输入点云整体放大或缩小，SMPL-X 的形状参数会被迫解释尺度误差，造成体型异常。OmniFit 引入尺度预测器：

$$
\hat{s}=g_\phi(P,\hat{L}), \quad P'=\hat{s}P
$$

之后所有拟合都在规范尺度 \(P'\) 上执行。直觉上，尺度预测器把“这个资产到底多大”从“这个人是什么体型”中分离出来，避免把坐标单位错误误认为人体肥瘦或高矮。

##### SMPL-X 优化后端

最终拟合阶段仍使用显式 SMPL-X 参数：

$$
\min_{\theta,\beta,t}
\lambda_l \|\mathcal{L}(M_{\theta,\beta,t})-\hat{L}\|
+\lambda_s d_{\text{surf}}(M_{\theta,\beta,t},P')
+\lambda_r R(\theta,\beta)
$$

\(\mathcal{L}(M)\) 表示从 SMPL-X 网格提取对应地标，\(d_{\text{surf}}\) 是表面对齐项，\(R\) 是姿态和形状正则。地标项决定人体语义位置，表面项补充几何贴合，正则项避免在衣服外表面上过拟合。

> 💡 关键：OmniFit 不是把所有输入都强行转成同一种传感器数据，而是把它们都转成 dense landmarks 这种中间表示，再统一走 SMPL-X fitting。

##### 与传统方法的区别

优化式多视角拟合通常精度高但慢，而且依赖相机标定和尺度。学习式点云拟合速度快，但往往对输入模态和尺度假设敏感。OmniFit 用条件 Transformer 学习跨模态地标预测，再用可解释的 SMPL-X 优化收尾，兼顾泛化和几何可控性。论文报告其在日常服装和宽松服装场景相对已有方法有大幅误差下降，并在 CAPE、4D-DRESS 等基准上达到毫米级精度。

#### 🧪 练习题

```yaml
question: "OmniFit 为什么先预测稠密地标而不是直接回归 SMPL-X 参数？"
options:
  - "稠密地标能提供跨模态、尺度更稳的语义几何对应，再驱动 SMPL-X 拟合"
  - "稠密地标可以完全替代 SMPL-X，不需要后续优化"
  - "直接回归参数只能用于图像，不能用于点云"
  - "地标预测的唯一作用是降低模型参数量"
answer: 0
explain: "dense landmarks 将不同模态输入统一为人体模板上的语义对应关系，可缓解衣物、缺失和尺度失真对后端拟合的影响。"
```
