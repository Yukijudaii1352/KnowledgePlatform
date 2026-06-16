### GraphCast

```yaml
id: graphcast
name: GraphCast
full_name: 图神经网络天气预报 (GraphCast)
year: '2023'
org: Google DeepMind
paper_url: https://www.science.org/doi/10.1126/science.adi2336
category: meteo_ai
parent: pangu_weather
motivation: GNN多尺度网格建模确定性预报基准
```

#### 📝 一句话总结

GraphCast 提出基于多尺度球面网格的 encode-process-decode 图神经网络，将 0.25° 全球天气状态映射到均匀 icosahedral multi-mesh 上做消息传递，解决了经纬度网格畸变、长程传播和高分辨率中期确定性预报的统一建模问题。

#### 🎯 核心要点

- **输入两帧天气状态**：用当前时刻和 6 小时前的 ERA5 状态预测未来 6 小时状态，再自回归滚动到 10 天
- **227 个预测变量组合**：每个网格点预测 5 个地表变量与 6 个大气变量在 37 个气压层上的组合
- **多图结构**：包含经纬度 grid nodes、球面 mesh nodes、Grid2Mesh 边、Mesh 边、Mesh2Grid 边三类信息通路
- **R=6 multi-mesh**：由正二十面体反复细分 6 次得到 40,962 个 mesh nodes，并保留所有细分层级的边以支持远距离通信
- **Encode-process-decode GNN**：encoder 将经纬度输入转到 mesh，processor 用 16 层不共享参数的 GNN 在 multi-mesh 上传播，decoder 再映射回经纬度网格
- **残差式输出**：decoder 预测相对最近输入状态的 residual update，降低直接预测绝对状态的难度
- **训练策略**：使用 1979-2017 年 ERA5，训练 rollout 长度从 1 步逐步增加到 12 步，以加固多步自回归稳定性
- **确定性基准突破**：论文在 2018 年测试中报告，GraphCast 在 1380 个验证目标中的约 90% 优于 ECMWF HRES

#### 🔬 深入细节

##### 图示与可访问来源

![GraphCast 模型示意图](https://ar5iv.labs.arxiv.org/html/2212.12794/assets/figures/schematic.png)
*图：GraphCast 的输入状态、6 小时预测、自回归 rollout、Grid2Mesh 编码、multi-mesh processor 与 Mesh2Grid 解码。开放详版见 arXiv/ar5iv: https://arxiv.org/abs/2212.12794；正式论文见 Science DOI。*

##### 问题背景：为什么天气预报需要图而不是普通网格网络

全球天气预报通常存储在经纬度网格上，但经纬度网格不是几何均匀的：赤道附近格点物理距离大，高纬度格点经向收缩，同样的卷积核或局部邻域在不同纬度代表不同物理尺度。Pangu-Weather 用 Earth-Specific Transformer 处理经纬度网格的位置偏差；GraphCast 采取另一条路线：把输入/输出仍放在业务友好的经纬度网格上，但内部计算放到近似均匀的球面三角 mesh。

GraphCast 的 mesh 来自正二十面体细分。第 6 层细分 mesh 有 40,962 个节点，远少于 \(721 \times 1440\) 的经纬度网格点数，因此 processor 可以在更紧凑且几何均匀的图上做消息传递。更关键的是，GraphCast 不只使用最细层 mesh 的短边，还保留从粗到细各层 mesh 的边，形成 multi-mesh。粗层边像长程捷径，细层边保留局地解析度，使 16 层 GNN 就能覆盖从天气尺度到行星尺度的传播。

##### 数据表示与图构造

一个天气状态 \(Y_t\) 包含：

$$
5 \text{ surface variables} + 6 \text{ atmospheric variables} \times 37 \text{ pressure levels}=227
$$

输入特征使用两个连续状态 \(Y_{t-6h}\)、\(Y_t\)，再加上不需要预测的 forcing 和 constants，例如太阳辐射、年内/日内周期、地形、海陆掩码和经纬度位置编码。模型学习：

$$
\hat{Y}_{t+6h}=Y_t+\Delta_{\theta}(Y_{t-6h},Y_t,F_t,C)
$$

其中 \(\Delta_{\theta}\) 是 GraphCast 预测的残差。图由三类边组成：

- **Grid2Mesh**：把每个经纬度格点附近的信息发送到球面 mesh 节点
- **Mesh**：在 multi-mesh 上做多尺度消息传递，包含不同长度的球面边
- **Mesh2Grid**：对每个经纬度格点找到其所在三角面，用相邻 3 个 mesh 节点解码回格点

##### GNN 消息传递机制

GraphCast 的基本模块是 interaction network。对有向边 \(i \rightarrow j\)，边特征 \(e_{ij}\) 和节点特征 \(h_i,h_j\) 先更新边，再聚合入边更新节点：

$$
e'_{ij}=\phi_e([e_{ij},h_i,h_j])
$$

$$
\bar{e}'_j=\sum_{i:(i,j)\in E}e'_{ij}
$$

$$
h'_j=\phi_v([h_j,\bar{e}'_j])
$$

\(\phi_e\) 和 \(\phi_v\) 是 MLP。encoder 在 Grid2Mesh 二部图上执行一次这类消息传递，将经纬度场压到 mesh；processor 在 multi-mesh 上执行 16 层消息传递；decoder 在 Mesh2Grid 二部图上执行一次消息传递，输出回 \(721 \times 1440\) 网格。

> 💡 关键：GraphCast 的“多尺度”不是用多分辨率图像金字塔，而是把不同细分层级的 icosahedral mesh 边合并到同一 processor 图里，让短边和长边在每一层同时参与消息传递。

##### 伪代码：GraphCast 前向与 rollout

```python
# GraphCast 的核心推理流程
def graphcast_step(y_prev, y_now, forcing, constants, graph):
    # y_prev/y_now: 经纬度网格上的天气状态
    grid_features = normalize(concat(y_prev, y_now, forcing, constants))

    # 1. Encoder: grid -> mesh
    grid_h = grid_node_mlp(grid_features)
    mesh_h = mesh_node_mlp(graph.mesh_node_features)
    g2m_e = edge_mlp(graph.grid2mesh_edge_features)
    mesh_h = interaction_network(
        senders=grid_h,
        receivers=mesh_h,
        edges=g2m_e,
        edge_index=graph.grid2mesh_edges,
    )

    # 2. Processor: multi-mesh message passing
    mesh_edges = edge_mlp(graph.mesh_edge_features)
    for layer in range(16):
        mesh_h, mesh_edges = mesh_gnn_layers[layer](
            nodes=mesh_h,
            edges=mesh_edges,
            edge_index=graph.multimesh_edges,
        )

    # 3. Decoder: mesh -> grid, predict residual update
    m2g_e = edge_mlp(graph.mesh2grid_edge_features)
    delta_grid = mesh2grid_decoder(mesh_h, grid_h, m2g_e, graph.mesh2grid_edges)
    return denormalize_residual(delta_grid) + y_now


def rollout_10_days(y_minus_6h, y_0, forcings, constants, graph):
    preds = []
    prev, now = y_minus_6h, y_0
    for k in range(40):  # 10天，每步6小时
        next_state = graphcast_step(prev, now, forcings[k], constants, graph)
        preds.append(next_state)
        prev, now = now, next_state
    return preds
```

##### 训练目标：多步加权 MSE

训练时 GraphCast 不只优化单步预测，而是在自回归展开后的多个 lead time 上计算误差。一个简化写法为：

$$
\mathcal{L}(\theta)=
\sum_{k=1}^{K}
\sum_{v \in \mathcal{V}}
\sum_{\ell \in \mathcal{L}_v}
\sum_{g \in \mathcal{G}}
w_k\,w_v\,w_{\ell}\,w_{\operatorname{lat}(g)}
\left\|
\hat{Y}^{v,\ell}_{t+6k}(g)-Y^{v,\ell}_{t+6k}(g)
\right\|_2^2
$$

其中 \(K\) 在训练过程中从 1 逐步增加到 12，对应从 6 小时到 3 天的 rollout。纬度权重修正经纬度网格面积差异，变量和垂直层权重避免某些量纲或层级支配损失。多步训练让模型适应“输入包含自己前一步预测”的部署状态，这对 10 天 rollout 尤其重要。

##### 为什么 residual output 有用

天气状态的绝对值包含强季节性、地理位置和气候均值，而 6 小时变化量更接近“动力增量”。GraphCast 让 decoder 预测 \(\Delta Y\)，再加回最近状态：

$$
\hat{Y}_{t+6h}=Y_t+\widehat{\Delta Y}_{t\rightarrow t+6h}
$$

这降低了学习难度，也更符合数值预报中“从初值积分一个小时间步”的思想。forcing 和 constants 则提供外部边界条件：例如太阳辐射与日周期影响温度和对流，地形与海陆掩码影响近地面风和降水。

##### 与 FourCastNet、Pangu-Weather 的差异

FourCastNet 在规则经纬度 patch 上用傅里叶域做全局混合，优势是推理快、结构简洁；Pangu-Weather 用 3D Earth-Specific Transformer 直接处理三维气压层结构；GraphCast 的核心优势是几何表示，把球面物理空间显式编码为 multi-mesh graph。它不是在二维图像上“假装地球是平面”，而是在 processor 内部让信息沿球面网格传播。

这也解释了 GraphCast 在热带气旋路径、大气河和极端温度等任务中的强表现：这些现象既有局地结构，也受大尺度环流控制。multi-mesh 的长短边同时存在，使模型在有限消息传递层数内兼顾局地和远程交互。

#### 🧪 练习题

```yaml
question: "GraphCast 中 multi-mesh 的核心作用是什么？"
options:
  - "把所有天气变量压缩成一个标量"
  - "在近似均匀的球面图上同时提供局地短边和跨尺度长边，提升消息传递效率"
  - "替代 ERA5 数据中的时间维度"
  - "让模型只预测地表变量，不预测气压层变量"
answer: 1
explain: "multi-mesh 合并了多个 icosahedral 细分层级的边，使 processor 能用较少 GNN 层传播局地和长程信息，这是 GraphCast 区别于普通经纬度网格网络的关键。"
```
