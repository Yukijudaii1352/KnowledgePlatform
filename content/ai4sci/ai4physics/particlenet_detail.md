### ParticleNet — 粒子网络 (ParticleNet)

```yaml
id: particlenet
name: ParticleNet
full_name: 粒子网络 (ParticleNet)
year: '2020'
org: Huilin Qu
paper_url: https://doi.org/10.1103/PhysRevD.101.056019
category: quantum_particle
parent: —
motivation: 粒子云动态图卷积提升喷注鉴别
```

#### 📝 一句话总结

ParticleNet 将高能物理喷注表示为无序的 constituent particle cloud，并用动态 kNN 图上的 EdgeConv 分层学习局部粒子关系，解决 jet image 稀疏、particle sequence 人为排序和 Deep Sets 全局聚合难以捕获局部子结构的问题。

#### 🎯 核心要点

- **表示方式**：把一个 jet 看成无序粒子集合，而不是图像、序列或树，天然贴合 permutation symmetry
- **核心算子**：使用 EdgeConv，在每个粒子的 \(k\) 个近邻上计算共享 MLP 边特征并做对称聚合
- **动态图更新**：第一层用 \((\Delta\eta,\Delta\phi)\) 作为坐标建图，后续层用 learned feature vectors 重新计算近邻
- **ParticleNet 架构**：3 个 EdgeConv block，\(k=16\)，通道分别为 \((64,64,64)\)、\((128,128,128)\)、\((256,256,256)\)
- **EdgeConv block 细节**：三层 MLP，每层 Linear + BatchNorm + ReLU，并加入 ResNet 风格 shortcut
- **分类头**：channel-wise global average pooling 聚合所有粒子，再接 256 维 FC、ReLU、dropout 0.1 和 softmax
- **轻量版本**：ParticleNet-Lite 使用 2 个 EdgeConv block，\(k=7\)，通道 \((32,32,32)\)、\((64,64,64)\)，计算量低近一个数量级
- **输入特征**：top tagging 使用前 100 个最高 \(p_T\) 粒子的 7 个运动学变量；quark-gluon tagging 可额外加入电荷和粒子 ID
- **基准结果**：在 top tagging 和 quark-gluon tagging 两个公开 benchmark 上超过 ResNeXt-50、P-CNN、PFN 等代表方法

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 DOI 指向 Phys. Rev. D 版本；可直接访问的 arXiv 版本为 https://arxiv.org/abs/1902.08570，代码仓库为 https://github.com/hqucms/ParticleNet。下图来自 ar5iv 渲染的论文架构图。

![ParticleNet 与 ParticleNet-Lite 架构](https://ar5iv.labs.arxiv.org/html/1902.08570/assets/x2.png)
*图：ParticleNet 由多个 EdgeConv block、全局平均池化和全连接分类头组成；ParticleNet-Lite 减少 block、邻居数和通道数以降低计算量。*

![EdgeConv block 结构](https://ar5iv.labs.arxiv.org/html/1902.08570/assets/x1.png)
*图：EdgeConv block 先按坐标或 learned feature 建立 kNN 图，再从近邻构造 edge features，经共享 MLP 和对称聚合得到新粒子特征。*

##### 算法伪代码

```python
# ParticleNet / EdgeConv 训练伪代码

def edge_conv_block(coords, features, k, channels):
    # coords: 用于 kNN 的坐标，首层通常是 (delta_eta, delta_phi)
    # features: 每个粒子的输入或隐藏特征
    neighbors = knn(coords, k=k)  # shape: [num_particles, k]
    edge_outputs = []

    for i in range(num_particles):
        messages = []
        for j in neighbors[i]:
            edge_feature = concat(features[i], features[j] - features[i])
            messages.append(shared_mlp(edge_feature, channels))
        # 论文使用 mean 聚合，而不是原始 DGCNN 中常用的 max
        edge_outputs.append(mean(messages, axis=0))

    out = batch_norm_relu(edge_outputs)
    out = out + shortcut_projection(features)
    return out

def particlenet(particles):
    coords = particles[["delta_eta", "delta_phi"]]
    features = particles[input_features]

    features = edge_conv_block(coords, features, k=16, channels=(64, 64, 64))
    coords = features
    features = edge_conv_block(coords, features, k=16, channels=(128, 128, 128))
    coords = features
    features = edge_conv_block(coords, features, k=16, channels=(256, 256, 256))

    jet_feature = global_average_pool(features, axis="particles")
    hidden = relu(linear(jet_feature, 256))
    hidden = dropout(hidden, p=0.1)
    logits = linear(hidden, num_classes=2)
    return softmax(logits)

for batch in dataloader:
    logits = particlenet(batch.particles)
    loss = cross_entropy(logits, batch.labels)
    adamw_update(loss, weight_decay=1e-4, one_cycle_lr=True)
```

##### Jet 为什么适合 particle cloud

喷注是 LHC 中高能 parton 强子化后形成的一簇粒子。传统 jet image 把 \((\eta,\phi)\) 平面离散成像素，但一个 jet 往往只有 \(O(10)\) 到 \(O(100)\) 个粒子，而图像需要 \(O(1000)\) 个像素，绝大多数像素为空。particle sequence 则要按 \(p_T\) 等规则排序，可粒子集合本身没有物理上的固定顺序，人工顺序可能让模型学习到无关偏置。

ParticleNet 的选择是把 jet 写成

$$
J=\{x_1,x_2,\ldots,x_N\},
$$

其中 \(x_i\) 是第 \(i\) 个粒子的特征向量，包括 \(\Delta\eta,\Delta\phi,\log p_T,\log E,\log(p_T/p_T^{jet}),\log(E/E^{jet}),\Delta R\)，在有 PID 信息时再加电荷和粒子类型 one-hot。这个表示保留原始粒子级信息，又要求网络对输入顺序不敏感。

##### EdgeConv 的关键计算

EdgeConv 先把粒子云变成 kNN 图。对每个中心粒子 \(x_i\)，找到 \(k\) 个近邻 \(x_{i_j}\)，然后计算

$$
\mathbf{x}'_i
=
\operatorname*{\square}_{j=1}^{k}
\mathbf{h}_{\Theta}(\mathbf{x}_i,\mathbf{x}_{i_j}),
$$

其中 \(\square\) 是 channel-wise 对称聚合。论文采用 mean 聚合：

$$
\mathbf{x}'_i
=
\frac{1}{k}\sum_{j=1}^{k}
\bar{\mathbf{h}}_{\Theta}
(\mathbf{x}_i,\mathbf{x}_{i_j}-\mathbf{x}_i).
$$

把邻居特征写成差分 \(\mathbf{x}_{i_j}-\mathbf{x}_i\) 的直觉是让网络同时看到“中心粒子是什么”和“邻居相对中心有什么局部结构”。共享 MLP 保证同一种局部模式可在所有粒子位置复用；mean 聚合保证近邻顺序不会改变输出。

##### 动态图带来的层次建模

第一层 kNN 用物理空间中的 \(\Delta\eta,\Delta\phi\) 计算距离，捕获局部角向结构。经过一层 EdgeConv 后，每个粒子已经拥有局部上下文特征；后续层再用这些 learned feature 作为坐标重新建图，使“邻居”不再只是几何上近，也可以是在判别任务中语义相近。这个动态更新正是 DGCNN 思想在 jet tagging 中的移植。

> 💡 关键：ParticleNet 的 permutation symmetry 不是把所有粒子直接求和，而是在局部图卷积后再做全局池化，因此既尊重无序集合，又保留多 prong、软辐射、局部能量分布等判别信息。

##### 训练目标与 benchmark

分类目标是标准交叉熵：

$$
\mathcal{L}_{CE}
=
-\frac{1}{B}\sum_{b=1}^{B}
\sum_{c=1}^{C}
y_{bc}\log \hat{p}_{bc}.
$$

论文用 AdamW 和 one-cycle learning-rate schedule 训练。top tagging benchmark 中，每个 jet 最多取 100 个最高 \(p_T\) constituent，训练/验证/测试划分为 1.2M/400k/400k；ParticleNet 的 AUC 为 0.9858，30% signal efficiency 下背景拒绝 \(1/\varepsilon_b=1615\pm93\)，显著高于 PFN、P-CNN 和 ResNeXt-50。quark-gluon tagging 中，加入 PID 的 ParticleNet AUC 达 0.9116，背景拒绝也优于 PID 版本的 PFN 和 P-CNN。

##### 与其他 jet 表示的区别

| 方法 | 输入结构 | 优点 | 主要缺陷 |
|------|----------|------|----------|
| Jet image + CNN | 稀疏 \((\eta,\phi)\) 网格 | 可直接使用成熟 CNN | 粒子信息合并困难，像素稀疏 |
| Particle sequence + RNN/1D CNN | 按 \(p_T\) 排序的序列 | 使用粒子级特征 | 人为顺序不符合物理对称性 |
| PFN / Deep Sets | 无序集合全局聚合 | 严格集合建模，速度快 | 局部邻域结构利用不足 |
| ParticleNet | 动态粒子图 | 同时建模无序集合和局部结构 | EdgeConv 计算比 PFN 更重 |

ParticleNet 的工程权衡很清楚：它用动态图卷积换取更强的局部结构表达，因此标准版推理更慢；ParticleNet-Lite 则保留主要建模思想，把参数量降到 26k，在速度和精度之间取得更适合在线应用的平衡。

#### 🧪 练习题

```yaml
question: "ParticleNet 使用动态 EdgeConv 的主要目的是什么？"
options:
  - "把 jet 转成固定大小图像以便使用 2D CNN"
  - "按 p_T 给粒子排序，让 RNN 能顺序处理"
  - "在无序粒子云上学习局部邻域关系，并随层数用 learned features 更新 kNN 图"
  - "只对所有粒子特征做一次全局求和以保证 permutation invariance"
answer: 2
explain: "ParticleNet 先在粒子云上构建 kNN 图，再用 EdgeConv 学习局部结构；后续层根据隐藏特征重建图，使邻域关系可以随任务学习。"
```
