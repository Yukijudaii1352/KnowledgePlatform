### GraphCMR — 图卷积网格回归 (Graph Convolutional Mesh Regression)

```yaml
id: graphcmr
name: GraphCMR
full_name: 图卷积网格回归 (Graph Convolutional Mesh Regression)
year: '2019'
org: 宾夕法尼亚大学
paper_url: http://openaccess.thecvf.com/content_CVPR_2019/html/Kolotouros_Convolutional_Mesh_Regression_for_Single-Image_Human_Shape_Reconstruction_CVPR_2019_paper.html
category: mesh
parent: hmr
motivation: 利用图卷积直接在网格顶点上回归
```

#### 📝 一句话总结

GraphCMR 提出在 SMPL 模板网格拓扑上使用 Graph-CNN 直接回归人体 mesh 顶点坐标，避免把图像特征强行映射到非线性的 SMPL 参数空间。它把 CNN 图像特征附加到网格顶点，再通过图卷积传播局部几何信息，实现单图人体形状重建。

#### 🎯 核心要点

- 直接网格回归：输出 3D 顶点位置，而不是只回归 \(\theta,\beta\) 参数
- 利用 SMPL 拓扑：把人体模板 mesh 视为图，顶点为节点，边为网格邻接关系
- Graph-CNN 编码局部几何：相邻顶点通过图卷积交换特征，保留人体表面空间结构
- 图像特征附加到顶点：CNN 全局图像特征复制到每个模板顶点，与顶点坐标拼接作为图输入
- 可选参数化恢复：从预测 mesh 再回归 SMPL 参数，兼顾非参数化精度和 SMPL 兼容性
- 支持多种输入表示：RGB 图像、人体分割、DensePose 等特征都可作为图像证据
- 多任务损失：使用顶点、3D 关节、2D 重投影等监督训练
- 相比 HMR：把输出空间从 SMPL 参数改为 mesh 顶点，减少参数空间非线性带来的学习难度

#### 🔬 深入细节

##### 模型架构图

![GraphCMR 模型架构](https://www.nikoskolot.com/projects/cmr/files/model_architecture.jpg)
*图：GraphCMR 官方项目图。CNN 编码输入图像，图像特征被附加到人体模板网格顶点上，再由 Graph-CNN 直接回归变形后的 3D mesh。*

##### 算法伪代码

```python
# GraphCMR 前向传播伪代码
def graphcmr_forward(image, template_mesh, adjacency):
    image_feat = resnet_encoder(image)  # 全局图像特征

    node_features = []
    for vertex in template_mesh.vertices:
        node_features.append(concat(vertex.xyz, image_feat))
    X = stack(node_features)  # [N, 3 + F]

    A_hat = normalize_adjacency(adjacency + identity())
    for block in graph_residual_blocks:
        X = block(X, A_hat)

    vertices_3d = linear_head(X)          # [N, 3]
    camera = camera_head(global_pool(X))  # weak-perspective camera

    joints_3d = smpl_joint_regressor(vertices_3d)
    joints_2d = project(joints_3d, camera)
    smpl_params = optional_param_regressor(vertices_3d)
    return vertices_3d, joints_3d, joints_2d, smpl_params
```

##### 动机与背景

HMR 类方法直接回归 SMPL 参数，输出维度较低，但参数空间并不好学。姿态常用轴角或旋转表示，形状和姿态耦合到最终 mesh 后是高度非线性的：参数上的小误差可能导致远端顶点大幅偏移；反过来，视觉上相似的 mesh 也可能对应不同参数组合。

GraphCMR 的观点是：既然最终目标是恢复人体表面，不如直接预测顶点坐标。直接顶点回归的问题是维度很高，如果用全连接层把所有顶点当成普通向量，会丢失 mesh 局部结构。图卷积正好提供了折中：输出是非参数化顶点，但网络结构显式利用 SMPL 模板的邻接关系。

##### 图卷积机制

给定顶点特征矩阵 \(X \in \mathbb{R}^{N\times F}\) 和归一化邻接矩阵 \(\tilde{A}\)，GraphCMR 使用的图卷积可写为：

$$
Y=\tilde{A}XW
$$

其中：

$$
\tilde{A}=D^{-\frac{1}{2}}(A+I)D^{-\frac{1}{2}}
$$

\(A\) 是 mesh 邻接矩阵，\(I\) 表示自连接，\(W\) 是可学习线性变换。这个公式的直觉很简单：每个顶点的新特征来自自身和邻居顶点的聚合，然后经过线性投影。堆叠多层后，信息可以沿人体表面传播到更远区域。

##### 从图像到网格

GraphCMR 先用 CNN 提取全局图像特征，再把该特征复制到每个顶点，与模板顶点坐标拼接。这样每个顶点都知道两类信息：自己在人体模板上的空间位置，以及整张图像的视觉上下文。图卷积层随后让不同身体部位在固定拓扑上逐步交换信息，最后每个顶点输出自己的 3D 坐标。

这种设计比全连接直接回归 mesh 更合理：全连接没有局部性先验，容易把人体表面看成无结构长向量；Graph-CNN 则天然编码“手腕顶点与前臂顶点相邻，和脚踝顶点不相邻”这样的结构知识。

##### 损失函数

GraphCMR 可使用多种监督信号。若有 ground-truth mesh，使用顶点 L1/L2 损失：

$$
\mathcal{L}_{V}=\|V-\hat{V}\|_1
$$

通过 SMPL 关节回归器从顶点得到 3D 关节：

$$
J=R_JV
$$

再计算 3D 关节损失和 2D 重投影损失：

$$
\mathcal{L}_{J3D}=\|R_JV-R_J\hat{V}\|_1
$$

$$
\mathcal{L}_{J2D}=\|\Pi(R_JV)-j^{2D}\|_1
$$

如果需要 SMPL 参数输出，可以额外训练一个从预测顶点到 \((\theta,\beta)\) 的回归器。这说明非参数化 mesh 仍包含足够信息恢复参数化表示。

##### 与 HMR/SPIN 的区别

HMR 和 SPIN 主要在 SMPL 参数空间学习，优势是输出低维且天然合法；GraphCMR 在顶点空间学习，优势是目标更接近最终几何误差，避免参数空间强非线性。代价是输出维度更高，需要图结构先验和更复杂的 mesh 损失来稳定训练。

> 💡 关键：GraphCMR 并没有抛弃 SMPL，而是保留 SMPL 的拓扑，把 SMPL 从“参数生成器”改用为“图结构模板”。这让模型既能直接预测顶点，又不失人体网格的固定结构。

#### 🧪 练习题

```yaml
question: "GraphCMR 为什么使用图卷积而不是普通全连接层直接回归所有顶点？"
options:
  - "图卷积可以利用 SMPL 网格邻接关系，让相邻顶点共享局部几何信息"
  - "图卷积会自动生成 2D 人体检测框"
  - "全连接层无法输出浮点数"
  - "图卷积不需要任何训练数据"
answer: 0
explain: "人体 mesh 是有固定拓扑的图结构，图卷积显式利用顶点邻接关系，比把所有顶点展平成无结构向量更符合几何先验。"
```
