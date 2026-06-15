### OpenPose — 开放姿态 (OpenPose)

```yaml
id: openpose
name: OpenPose
full_name: 开放姿态 (OpenPose)
year: '2017'
org: CMU
paper_url: https://arxiv.org/abs/1611.08050
category: pose
parent: cpm
motivation: 提出PAFs实现自底向上多人实时检测
```

#### 📝 一句话总结

OpenPose 提出了 Part Affinity Fields (PAFs)，用像素级二维向量场显式编码肢体连接关系，解决多人场景中“检测到关键点以后属于谁”的关联问题。它把关键点热图与 PAF 放在同一个自底向上多阶段网络中联合预测，再用贪心二分匹配组装人体，从而在人数变化时仍能保持接近实时的多人姿态估计。

#### 🎯 核心要点

- 自底向上多人姿态估计：先在整图上检测所有人的关键点候选，再按肢体连接把候选点组合成人体实例
- Part Affinity Fields：为每一种肢体定义二维向量场，向量方向表示该肢体从一个端点指向另一个端点
- 双分支多阶段 CNN：一个分支预测关键点 confidence maps，另一个分支预测 PAFs，并在多个 stage 中迭代细化
- 中间监督：每个 stage 都对热图和 PAF 计算损失，缓解深层级联网络训练困难
- 肢体连接评分：沿两个候选关键点之间的线段采样 PAF，计算方向一致性积分作为连接置信度
- 贪心二分匹配：对每类肢体独立做匹配，避免同一关键点被多个同类肢体重复占用
- 运行时间弱依赖人数：主要 CNN 前向对整图执行一次，人数增加主要影响轻量级解析步骤
- COCO 2016 Keypoints Challenge 与 MPII Multi-Person 上取得当时领先结果，推动 OpenPose 成为开源多人姿态估计基线

#### 🔬 深入细节

##### 核心框架图

![OpenPose 整体流程](https://ar5iv.labs.arxiv.org/html/1611.08050/assets/x2.png)
*图：OpenPose 先用双分支 CNN 同时预测关键点热图和 PAF，再通过解析步骤把关键点候选连接成每个人的骨架。*

##### 算法伪代码

```python
# OpenPose 推理流程伪代码
def openpose_inference(image):
    features = vgg_backbone(image)

    # 多阶段联合细化：S 是关键点热图，L 是 PAF 向量场
    S, L = None, None
    for stage in range(T):
        S = confidence_branch(features, S, L)  # J 个关键点热图
        L = affinity_branch(features, S, L)    # C 个肢体的 2D 向量场

    keypoint_candidates = non_max_suppression(S)

    limb_edges = []
    for limb_type in skeleton_edges:
        scored_pairs = []
        for a in keypoint_candidates[limb_type.src]:
            for b in keypoint_candidates[limb_type.dst]:
                score = paf_line_integral(L[limb_type], a, b)
                if score > threshold:
                    scored_pairs.append((a, b, score))
        limb_edges += greedy_bipartite_matching(scored_pairs)

    persons = assemble_skeletons(limb_edges)
    return persons
```

##### 动机与背景

多人 2D 姿态估计的难点不只是“每个关节点在哪里”，还包括“每个关节点属于哪个人”。传统 top-down 方法先做人检测，再对每个框做单人姿态估计；这种方案在拥挤场景中依赖检测框质量，而且计算量随人数近似线性增长。早期 bottom-up 方法可以先找全图关键点，但通常用距离、角度或图模型做后处理，容易在遮挡、交叉手臂、多人接触时把不同人的肢体连错。

OpenPose 的关键判断是：连接关系本身也应该由网络从图像中学习，而不是只靠几何后处理。PAF 把“某个像素是否位于某条肢体上，以及该肢体指向哪里”编码成密集向量场。这样两个候选关键点之间是否属于同一条真实肢体，可以通过沿线段采样 PAF 来验证，而不只是看两点距离是否合理。

##### PAF 表示与连接评分

对第 \(c\) 类肢体，若一个像素 \(\mathbf{p}\) 落在某个人该肢体的窄带区域内，PAF 的监督向量定义为从起点关键点 \(\mathbf{x}_{j_1}\) 指向终点关键点 \(\mathbf{x}_{j_2}\) 的单位向量：

$$
\mathbf{v}_c = \frac{\mathbf{x}_{j_2} - \mathbf{x}_{j_1}}{\|\mathbf{x}_{j_2} - \mathbf{x}_{j_1}\|_2}
$$

若 \(\mathbf{p}\) 不在该肢体区域内，则监督为零向量。多人重叠时，同一像素可能被多个人的同类肢体覆盖，论文采用平均向量作为监督：

$$
\mathbf{L}_c^*(\mathbf{p}) = \frac{1}{n_c(\mathbf{p})}\sum_k \mathbf{L}_{c,k}^*(\mathbf{p})
$$

推理时，两个候选点 \(\mathbf{d}_{j_1}\) 和 \(\mathbf{d}_{j_2}\) 的连接得分是 PAF 与候选连线方向的一维积分：

$$
E = \int_{u=0}^{1}\mathbf{L}_c(\mathbf{p}(u)) \cdot \frac{\mathbf{d}_{j_2}-\mathbf{d}_{j_1}}{\|\mathbf{d}_{j_2}-\mathbf{d}_{j_1}\|_2}\,du
$$

其中 \(\mathbf{p}(u)=(1-u)\mathbf{d}_{j_1}+u\mathbf{d}_{j_2}\)。直觉上，如果这两个点真属于同一个人的同一条肢体，连线上的 PAF 应该持续指向同一方向；如果是跨人误连，点之间即使距离近，向量场也不会稳定支持这条连接。

##### 网络训练与损失

OpenPose 继承 CPM 的顺序预测思想，但每个 stage 同时输出关键点热图 \(\mathbf{S}^t\) 和 PAF \(\mathbf{L}^t\)。每个 stage 都有监督损失：

$$
f_S^t = \sum_j\sum_{\mathbf{p}} W(\mathbf{p})\|\mathbf{S}_j^t(\mathbf{p})-\mathbf{S}_j^*(\mathbf{p})\|_2^2
$$

$$
f_L^t = \sum_c\sum_{\mathbf{p}} W(\mathbf{p})\|\mathbf{L}_c^t(\mathbf{p})-\mathbf{L}_c^*(\mathbf{p})\|_2^2
$$

这里 \(W(\mathbf{p})\) 是 mask，用来忽略未标注人体区域，避免把未标注人的真实关键点错误当成负样本。总损失是所有 stage 的热图损失与 PAF 损失之和。中间监督使每个阶段都学习有意义的预测，后续 stage 再利用上一阶段的输出和图像特征修正漏检、错检和连接歧义。

##### 解析流程与复杂度

解析阶段对每种肢体类型独立构建二分图：左侧是该肢体起点候选，右侧是终点候选，边权是 PAF 线积分得分。论文用贪心匹配近似最大权匹配，再把所有肢体边合并成完整人体骨架。由于人体骨架图并不复杂，且 PAF 已经提供强连接证据，贪心方法足以取得高质量结果。

与 top-down 方法相比，OpenPose 的 CNN 对整张图只运行一次，因此主体计算不随人数线性增长。人数增加会带来更多候选点和边，但解析开销远小于网络前向。这也是 OpenPose 能在多人拥挤场景中保持实用速度的核心原因。

> 💡 关键：OpenPose 的创新不是单纯换了一个网络，而是把“关键点检测”和“人体实例关联”都变成密集预测问题，让后处理从启发式几何判断变成受图像证据约束的匹配问题。

##### 与 CPM/top-down 方法的区别

CPM 主要解决单人或候选框内的关键点定位问题，输出的是关键点热图；OpenPose 在此基础上增加 PAF 分支，让网络直接学习肢体归属关系。top-down 方法依赖检测框和逐人推理，优势是单人定位精细，缺点是拥挤、遮挡、框重叠时错误会级联；OpenPose 的 bottom-up 设计天然适合多人场景，尤其适合人数未知、人体相互遮挡的图像。

#### 🧪 练习题

```yaml
question: "OpenPose 中 PAF 的核心作用是什么？"
options:
  - "把输入图像压缩成更小的特征图以提升速度"
  - "用二维向量场编码肢体方向和连接关系，辅助把关键点分配给对应人体"
  - "替代关键点热图，直接输出每个人的完整骨架坐标"
  - "对人体检测框做非极大值抑制"
answer: 1
explain: "PAF 在肢体区域内预测方向向量，候选关键点之间的连接可通过线积分评分，因此能判断两个关键点是否属于同一人的同一条肢体。"
```
