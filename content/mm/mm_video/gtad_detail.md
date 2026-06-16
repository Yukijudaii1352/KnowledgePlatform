### G-TAD - 图时序检测 (Graph TAD)
```yaml
id: gtad
name: G-TAD
full_name: 图时序检测 (Graph TAD)
year: '2019'
org: PKU
paper_url: http://openaccess.thecvf.com/content_ICCV_2019/html/Zeng_Graph_Convolutional_Networks_for_Temporal_Action_Localization_ICCV_2019_paper.html
category: localization
parent: bmn
motivation: 图卷积建模提案间关系
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/gtad_detail.md
```

#### 📝 一句话总结
该条目的论文实际提出的是 P-GCN：把 temporal proposals 建成图节点，用 contextual edges 和 surrounding edges 显式建模 proposal-proposal 关系，再用 GCN 同时改进动作分类、完整性判断和边界回归。它解决了传统两阶段定位方法逐 proposal 独立处理、无法利用相邻/重叠候选段上下文的问题。

#### 🎯 核心要点
- 将每个 action proposal 表示为图节点 \(v_i\)，proposal 之间的时间关系表示为边 \(e_{ij}\)。
- 构造两类边：contextual edges 连接高 tIoU 重叠 proposal，surrounding edges 连接不重叠但时间距离近的 proposal。
- 在 proposal graph 上执行 GCN 消息传递，使每个 proposal 聚合邻域 proposal 的上下文和相关动作线索。
- 使用两个 GCN 分支：原始 proposal feature 用于动作类别预测，扩展 proposal feature 用于边界回归与 completeness 预测。
- 邻接矩阵边权可由 proposal 特征余弦相似度计算，并可映射到 embedding 空间后再计算相似度。
- 训练时采用 GraphSAGE 风格的邻域采样降低上千 proposal 带来的计算和显存开销。
- 实验在 THUMOS14 和 ActivityNet v1.3 上验证，论文报告 THUMOS14 tIoU=0.5 的 mAP 达到 49.1%。

#### 🔬 深入细节
![P-GCN framework for temporal action localization](https://ar5iv.labs.arxiv.org/html/1909.03252/assets/x2.png)
*图：P-GCN 将 proposal 实例化为图节点，建立 proposal 间边，并用两个 GCN 分支输出类别、完整性和边界回归结果。*

```python
# P-GCN training flow
for video in dataset:
    proposals = proposal_generator(video)  # e.g. BSN/TAG proposals
    x = extract_i3d_features(proposals)
    x_ext = extract_i3d_features(extend_each_proposal(proposals, ratio=0.5))

    # 1. 建图：节点是 proposals，边来自重叠关系和近邻关系
    graph = Graph()
    for pi in proposals:
        graph.add_node(pi)
    for pi, pj in all_pairs(proposals):
        if tIoU(pi, pj) > theta_ctx:
            graph.add_edge(pi, pj, type="contextual")
        elif tIoU(pi, pj) == 0 and temporal_distance(pi, pj) < theta_sur:
            graph.add_edge(pi, pj, type="surrounding")

    A = cosine_adjacency(graph, features=x)

    # 2. 训练时采样邻居，测试时使用完整邻接
    for layer in range(K):
        for pi in proposals:
            neigh = sample_neighbors(graph.neighbors(pi), Ns)
            x[pi] = aggregate_with_self(x[pi], x[neigh], A[pi, neigh])
            x_ext[pi] = aggregate_with_self(x_ext[pi], x_ext[neigh], A[pi, neigh])

    # 3. 两个 GCN 分支分别服务分类与定位
    cls_logits = FC1(GCN1(x, graph))
    boundary_offsets = FC2(GCN2(x_ext, graph))
    completeness = FC3(GCN2(x_ext, graph))

    loss = cross_entropy(cls_logits, labels) \
         + smooth_l1(boundary_offsets, target_offsets) \
         + hinge_loss(completeness, complete_labels)
    optimize(loss)
```

传统两阶段 temporal action localization 通常先生成 proposal，再对每个 proposal 独立提取特征并预测类别/边界。这种做法忽略了一个事实：同一个动作实例往往对应多个高度重叠的 proposal，它们分别覆盖动作的开始、中段或结束；附近的不同 proposal 也可能提供场景和动作上下文。P-GCN 的核心判断是：proposal 不是孤立样本，而是一组有结构关系的候选片段。

论文将一个视频内的 proposal 集合写成：

$$
\mathcal{P}=\{\mathbf{p}_i\mid \mathbf{p}_i=(\mathbf{x}_i,(t_{i,s},t_{i,e}))\}_{i=1}^{N}
$$

其中 \(\mathbf{x}_i\) 是 proposal 特征，\((t_{i,s},t_{i,e})\) 是时间边界。图 \(\mathcal{G}(\mathcal{P},\mathcal{E})\) 的节点就是 proposal，边分成两类。第一类 contextual edge 用 tIoU 衡量重叠关系：

$$
r(\mathbf{p}_i,\mathbf{p}_j)=tIoU(\mathbf{p}_i,\mathbf{p}_j)=\frac{I(\mathbf{p}_i,\mathbf{p}_j)}{U(\mathbf{p}_i,\mathbf{p}_j)}
$$

若 \(r(\mathbf{p}_i,\mathbf{p}_j)>\theta_{ctx}\)，则两者连接。这样，高度重叠的 proposal 可以共享对同一动作实例不同部分的观察，帮助分类和边界修正。

第二类 surrounding edge 针对不重叠但时间相近的 proposal。论文先要求 \(r(\mathbf{p}_i,\mathbf{p}_j)=0\)，再计算归一化时间距离：

$$
d(\mathbf{p}_i,\mathbf{p}_j)=\frac{|c_i-c_j|}{U(\mathbf{p}_i,\mathbf{p}_j)}
$$

其中 \(c_i\) 和 \(c_j\) 是两个 proposal 的中心坐标；若 \(d(\mathbf{p}_i,\mathbf{p}_j)<\theta_{sur}\)，则建立 surrounding edge。这类边允许背景片段或相邻动作片段向当前 proposal 传递场景线索，避免模型只盯着局部片段本身。

在图构造完成后，P-GCN 使用标准图卷积更新所有 proposal 表示：

$$
\mathbf{X}^{(k)}=\mathbf{A}\mathbf{X}^{(k-1)}\mathbf{W}^{(k)}
$$

其中 \(\mathbf{A}\) 是邻接矩阵，\(\mathbf{X}^{(0)}\in\mathbb{R}^{N\times d}\) 是输入 proposal 特征。边权可以用 proposal 特征的余弦相似度给出：

$$
A_{ij}=\frac{\mathbf{x}_i^T\mathbf{x}_j}{\|\mathbf{x}_i\|_2\cdot\|\mathbf{x}_j\|_2}
$$

最后一层还会把隐藏特征与原始输入拼接：

$$
\mathbf{X}^{(K)} := \mathbf{X}^{(K)} \| \mathbf{X}^{(0)}
$$

这相当于在图消息传递后的上下文表示中保留 proposal 自身的局部证据，降低过度平滑的风险。

模型输出拆成两个 GCN 分支。第一个分支使用原始 proposal 特征预测动作类别：

$$
\{\hat{y}_i\}_{i=1}^{N}=\operatorname{softmax}(FC_1(GCN_1(\{\mathbf{x}_i\}_{i=1}^{N},\mathcal{G})))
$$

第二个分支使用扩展 proposal feature \(\mathbf{x}'_i\)：每个 proposal 左右各扩展半个自身长度后提取特征，用来预测边界回归和 completeness：

$$
\{(\hat{t}_{i,s},\hat{t}_{i,e})\}_{i=1}^{N}=FC_2(GCN_2(\{\mathbf{x}'_i\}_{i=1}^{N},\mathcal{G}))
$$

$$
\{\hat{c}_i\}_{i=1}^{N}=FC_3(GCN_2(\{\mathbf{x}'_i\}_{i=1}^{N},\mathcal{G}))
$$

completeness 的作用是识别“分类分数很高但只覆盖动作一部分”的 proposal，避免 mAP 排序时把不完整片段排在完整片段前面。

计算效率上，一个视频可能有上千个 proposal，直接完整图卷积会带来 \(N^2\) 级别的边处理负担。论文采用 GraphSAGE 式邻域采样训练，每层只采样 \(N_s\) 个邻居：

$$
\mathbf{x}_i^{(k)}=
\left(\frac{1}{N_s}\sum_{j=1}^{N_s}A_{ij}\mathbf{x}_j^{(k-1)}+\mathbf{x}_i^{(k-1)}\right)\mathbf{W}^{(k)}
$$

测试时则不采样，使用完整邻接图。训练损失由类别交叉熵、completeness hinge loss 和边界回归 smooth \(L_1\) loss 组成；测试时 RGB/Flow 两路结果融合，最终分数由分类分数和 completeness 分数相乘，再经 NMS 得到每类动作检测结果。

> 💡 关键：P-GCN 的“图”不是把视频帧连起来，而是把 proposal 连起来；它建模的是候选片段之间的重叠、邻近和上下文关系，因此特别适合作为 BSN/BMN 这类 proposal generator 之后的关系推理模块。

#### 🧪 练习题
```yaml
question: "P-GCN 中 contextual edges 与 surrounding edges 的区别是什么？"
options:
  - "前者连接高度重叠 proposal，后者连接不重叠但时间距离近的 proposal"
  - "前者只用于 RGB 流，后者只用于 Flow 流"
  - "前者负责边界回归，后者负责 Soft-NMS"
  - "前者连接视频帧，后者连接动作类别"
answer: 0
explain: "contextual edges 基于 tIoU 连接重叠 proposal，用于共享同一动作实例的上下文；surrounding edges 连接相邻但不重叠 proposal，用于传递附近动作或背景线索。"
```
