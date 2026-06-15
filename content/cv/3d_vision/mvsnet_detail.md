### MVSNet

```yaml
id: mvsnet
name: MVSNet
full_name: 多视角立体网络 (MVSNet)
year: '2018'
org: HKUST
paper_url: https://arxiv.org/abs/1804.02505
category: reconstruction
parent: colmap
motivation: 深度学习驱动的多视角立体重建
```

#### 📝 一句话总结

MVSNet 提出端到端的多视角深度估计网络，通过可微单应性 warping 在参考相机视锥中构建 3D cost volume，再用 3D CNN 正则化和 soft argmin 回归深度图，解决传统 MVS 手工匹配和规则体素内存开销大的问题。

#### 🎯 核心要点

- **逐参考视图深度估计**：一次预测一个 reference image 的深度图，再通过深度融合得到点云
- **可微 homography warping**：根据相机内外参和候选深度平面，把 source view 特征投影到 reference frustum
- **variance-based cost metric**：用多视角特征方差聚合任意数量 source views，避免固定视角数限制
- **3D cost volume 正则化**：用 encoder-decoder 3D CNN 聚合空间和深度维上下文，输出深度概率体
- **soft argmin 深度回归**：对深度假设的概率分布求期望，得到连续深度估计
- **refinement network**：用参考图像和初始深度图细化边界区域
- **基准结果**：在 DTU 上训练评估，并在 Tanks and Temples 上展示无需微调的泛化能力

#### 🔬 深入细节

##### 核心示意图

![MVSNet 网络结构](https://ar5iv.labs.arxiv.org/html/1804.02505/assets/x1.png)
*图：MVSNet 先提取 2D 图像特征，再通过可微 homography warping 构建 reference frustum 上的 cost volume，经过 3D CNN 正则化后回归深度图，并用参考图像细化边界。*

##### 算法伪代码

```python
# MVSNet 单参考视图深度估计伪代码
def mvsnet(reference, sources, ref_cam, src_cams, depth_values):
    ref_feat = feature_net(reference)
    src_feats = [feature_net(img) for img in sources]

    warped_volumes = []
    for feat, src_cam in zip(src_feats, src_cams):
        planes = []
        for d in depth_values:
            H = homography(ref_cam, src_cam, depth=d)
            planes.append(warp(feat, H))
        warped_volumes.append(stack(planes, dim="depth"))

    ref_volume = repeat_along_depth(ref_feat, len(depth_values))
    all_volumes = [ref_volume] + warped_volumes
    cost_volume = variance(all_volumes, dim="view")

    prob_volume = softmax(cost_regularization_3dcnn(cost_volume), dim="depth")
    depth = sum(prob_volume[d] * depth_values[d] for d in range(len(depth_values)))
    confidence = probability_around_argmax(prob_volume)
    refined_depth = refinement_net(reference, depth)
    return refined_depth, confidence
```

##### 动机与背景

传统 MVS 依赖手工相似性度量、窗口匹配、传播和滤波。它们在 Lambertian 表面和纹理丰富区域表现很好，但遇到低纹理、反光、重复纹理或遮挡时容易失败。早期学习式 MVS 如 SurfaceNet/LSM 尝试在规则 3D 体素中做学习，但规则体素内存随空间分辨率立方增长，难以扩展到真实大场景。

MVSNet 的关键工程选择是把三维重建拆成“每个参考视图一张深度图”。深度图处在参考相机视锥中，分辨率是 \(H\times W\times D\)，比完整世界坐标体素更紧凑，也自然适配多视角图像投影。最终只需把多个参考视图的深度图做几何一致性筛选和融合，就能得到稠密点云。

##### 可微 homography warping

对参考视图像素 \(\mathbf{x}\) 和候选深度 \(d\)，MVSNet 将该点对应的 3D 点投影到第 \(i\) 个源视图。这个投影可写成深度相关单应矩阵：

$$
\mathbf{x}' \sim \mathbf{H}_i(d)\mathbf{x}
$$

论文给出的形式为：

$$
\mathbf{H}_{i}(d)=\mathbf{K}_{i}\mathbf{R}_{i}
\left(\mathbf{I}-\frac{(\mathbf{t}_{1}-\mathbf{t}_{i})\mathbf{n}_{1}^{T}}{d}\right)
\mathbf{R}_{1}^{T}\mathbf{K}_{1}^{T}
$$

直觉上，每个深度平面都定义了一次从 reference feature map 到 source feature map 的对齐。如果候选深度正确，多视图特征会在该深度平面上对齐；如果深度错误，特征方差会变大。

##### 多视图 cost volume

MVSNet 对所有 warped feature volume 计算方差：

$$
\mathbf{C}=\frac{1}{N}\sum_{i=1}^{N}(\mathbf{V}_i-\bar{\mathbf{V}})^2
$$

方差聚合有两个好处。第一，它对输入视角数量 \(N\) 不敏感，可以处理任意数量的 source views。第二，它直接度量多视图特征的一致性：真实表面深度处特征更一致，错误深度处特征分散。

随后 3D CNN 在 \((u,v,d)\) 三个维度上正则化 cost volume，把局部纹理、深度邻域和空间上下文结合起来。输出经 softmax 得到每个像素的深度概率分布 \(P(d)\)，再用 soft argmin/期望回归：

$$
\hat{d}=\sum_{j=1}^{D} d_j P(d_j)
$$

##### 训练与推理流程

训练阶段使用 DTU 数据集的多视角图像、相机参数和真实深度监督。损失通常为预测深度与真实深度的 \(L_1\)：

$$
\mathcal{L}=\sum_{\mathbf{x}\in \Omega}\left|\hat{d}(\mathbf{x})-d^*(\mathbf{x})\right|
$$

推理阶段对每张图选择若干邻近源视图，预测参考深度图和 confidence。后处理会基于 photometric confidence 与几何一致性过滤低质量深度，再把多个深度图反投影并融合成点云。

MVSNet 与 COLMAP 的关系可以理解为“学习式深度估计模块替代传统 PatchMatch MVS 的核心匹配过程”。COLMAP 仍常用于相机位姿和稀疏点初始化，而 MVSNet 用神经网络完成密集深度推断。

> 💡 关键：MVSNet 的突破不是单纯使用 CNN，而是把相机几何显式写进网络的 cost volume 构建过程，使网络既可端到端学习，又不丢掉多视角投影约束。

#### 🧪 练习题

```yaml
question: "MVSNet 为什么使用 variance-based cost metric 聚合多视角特征？"
options:
  - "为了让网络只能处理固定两个视角"
  - "为了用特征方差度量多视图一致性，并支持任意数量的 source views"
  - "为了避免使用相机内外参"
  - "为了直接输出三角网格"
answer: 1
explain: "正确深度处 warped features 应该一致，方差较小；方差聚合还能自然适配不同数量的输入视角。"
```
