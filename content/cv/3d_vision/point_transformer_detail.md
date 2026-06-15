### Point Transformer

```yaml
id: point_transformer
name: Point Transformer
full_name: 点云Transformer (Point Transformer)
year: '2021'
org: Oxford
paper_url: https://arxiv.org/abs/2012.09164
category: point_cloud
parent: dgcnn
motivation: 向量自注意力机制建模长程依赖，刷新语义分割记录
```

#### 📝 一句话总结

Point Transformer 将 Transformer 的自注意力改造成适合无序点集的局部向量注意力层，通过相对位置编码和通道级注意力权重建模点云局部几何关系，解决了 PointNet/DGCNN 类方法对长程上下文和局部关系表达不足的问题。

#### 🎯 核心要点

- 点云专用自注意力层：在局部邻域内执行 self-attention，既保持点集置换不变性，又避免全局注意力在大规模点云上的高复杂度
- 向量注意力（Vector Attention）：每个邻域点输出一组通道级权重，而不是所有通道共享一个标量注意力
- 相对位置编码：将 \(p_i-p_j\) 注入注意力权重和 value 特征，使模型显式感知 3D 欧氏空间结构
- 编码器-解码器骨干：分类使用层级下采样编码，语义分割使用 U-Net 式上采样与跳跃连接恢复逐点预测
- 多任务验证：在 S3DIS Area 5、ModelNet40、ShapeNetPart 等基准上刷新当时结果，其中 S3DIS Area 5 达到 70.4% mIoU

#### 🔬 深入细节

![Point Transformer 层结构](https://ar5iv.labs.arxiv.org/html/2012.09164/assets/x2.png)
*图：Point Transformer layer。每个中心点只聚合局部邻域，注意力由 query-key 差值、相对位置编码和 MLP 共同生成。*

```python
# Point Transformer layer 伪代码
def point_transformer_layer(points, features, k):
    # points: (N, 3), features: (N, C)
    output = []
    for i in range(len(points)):
        nbrs = knn(points, i, k)
        q_i = phi(features[i])
        aggregated = 0
        for j in nbrs:
            rel_pos = points[i] - points[j]
            delta = mlp_pos(rel_pos)
            key = psi(features[j])
            value = alpha(features[j])
            # vector attention: 每个通道一组权重
            weight = softmax(gamma(q_i - key + delta), dim="neighbors")
            aggregated += weight * (value + delta)
        output.append(aggregated)
    return stack(output)
```

**动机与背景**

点云天然是无序集合，且点之间没有规则网格。PointNet 通过逐点 MLP 和对称池化解决置换不变性，但全局池化会丢失局部几何关系；DGCNN 用动态图卷积在邻域图上传播特征，但其聚合权重仍偏向局部边特征的固定函数。Transformer 的自注意力适合处理集合，但直接把 NLP/图像里的全局标量注意力搬到点云上会遇到两个问题：计算量随点数二次增长，以及不同特征通道被同一个标量权重调制，表达力不足。

Point Transformer 的核心判断是：点云理解需要“局部、几何感知、通道可分”的注意力。局部邻域让大场景可扩展；相对位置让注意力知道点间空间关系；向量注意力让不同通道可学习不同的几何响应，例如某些通道关注边界，另一些通道关注平面或语义上下文。

**核心机制：向量注意力**

标准标量注意力可写成：

$$
y_i=\sum_{x_j\in\mathcal{X}}\rho(\varphi(x_i)^T\psi(x_j)+\delta)\alpha(x_j)
$$

其中 \(\rho\) 通常是 softmax，输出是标量权重。Point Transformer 改用向量注意力：

$$
y_i=\sum_{x_j\in\mathcal{X}(i)}
\rho\left(\gamma\left(\varphi(x_i)-\psi(x_j)+\delta_{ij}\right)\right)
\odot\left(\alpha(x_j)+\delta_{ij}\right)
$$

\(\mathcal{X}(i)\) 是点 \(i\) 的局部邻域，\(\delta_{ij}=\theta(p_i-p_j)\) 是由相对坐标经过 MLP 得到的位置编码，\(\gamma\) 生成与特征通道同维度的注意力向量，\(\odot\) 表示逐通道相乘。直觉上，模型不是问“邻居 \(j\) 有多重要”，而是问“邻居 \(j\) 在每个特征通道上分别有多重要”。

> 💡 关键：Point Transformer 同时把 \(\delta_{ij}\) 加入 attention 分支和 value 分支。前者决定邻居权重，后者把几何偏移作为可聚合的内容，避免注意力只看语义特征而忽略空间关系。

**网络结构与数据流**

在语义分割中，网络采用类似 U-Net 的编码器-解码器。编码阶段通过 Transition Down 做采样和局部聚合，逐步减少点数并增加通道数；每个阶段堆叠 Point Transformer block 扩大有效感受野。解码阶段通过 Transition Up 将低分辨率语义特征插值回高分辨率点集，并与浅层特征拼接，最终得到每个输入点的类别概率。

分类任务只需要最终全局表示，因此网络在多级 Point Transformer block 后进行全局聚合和分类。分割任务则必须保留局部边界和细粒度几何，所以跳跃连接非常重要：深层特征提供上下文，浅层特征提供坐标邻域细节。

**与 DGCNN/PointNet++ 的区别**

DGCNN 的 EdgeConv 通过 \(h_\Theta(x_i, x_j-x_i)\) 显式编码边特征，并使用 max 聚合；PointNet++ 通过 Ball Query/FPS 构建层级局部区域，并在局部 PointNet 中池化。Point Transformer 保留了局部邻域的思想，但把固定池化替换为数据依赖的注意力聚合。相比 max pooling，它能根据输入内容动态分配邻居贡献；相比标量 attention，它能让不同通道学习不同几何模式。

**训练与推理流程**

训练时输入点坐标和可选颜色/法线特征，按层级采样形成多尺度点集，经过局部向量注意力聚合后输出分类或逐点语义标签。损失通常是交叉熵；在 S3DIS 等大场景中按块采样训练，推理时对场景块逐块预测再合并。该方法的主要代价在于 kNN/邻域构建和每层局部 attention，但由于注意力限制在邻域内，复杂度从全局 \(O(N^2)\) 降为近似 \(O(Nk)\)。

#### 🧪 练习题

```yaml
question: "Point Transformer 为什么采用向量注意力而不是传统标量注意力？"
options:
  - "为了完全取消相对位置编码"
  - "为了让不同特征通道拥有不同的邻域聚合权重"
  - "为了把全局注意力复杂度固定为 O(1)"
  - "为了只处理规则体素网格"
answer: 1
explain: "向量注意力输出通道级权重，可对不同几何/语义通道分别调制邻居贡献，比所有通道共享一个标量权重表达力更强。"
```
