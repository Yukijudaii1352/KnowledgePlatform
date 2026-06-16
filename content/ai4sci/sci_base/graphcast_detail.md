### GraphCast

```yaml
id: graphcast
name: GraphCast
full_name: GraphCast (GraphCast)
year: '2023'
org: DeepMind
paper_url: https://www.science.org/doi/10.1126/science.adi2336
category: materials_weather
parent: —
motivation: GNN球形网格建模大气动力学
```

#### 📝 一句话总结

GraphCast 提出了基于多尺度球面网格图神经网络的中期全球天气预报模型，用 encode-process-decode 消息传递直接学习 ERA5 中的天气状态演化，解决了经纬度网格模型难以兼顾球面几何、长程传播和高分辨率效率的问题。

#### 🎯 核心要点

- **球面图建模**：将规则经纬度天气场编码到由多级 icosahedral mesh 组成的球面图，避免普通二维网格在极区畸变
- **输入两帧天气状态**：使用当前时刻和 6 小时前状态作为输入，预测未来 6 小时的残差更新
- **227 个变量/层级组合**：覆盖 5 个地表变量和 6 个高空变量在 37 个压力层上的状态，每个变量位于 \(0.25^\circ\) 全球网格
- **Encode-process-decode GNN**：encoder 从经纬度网格映射到 mesh，processor 在 multi-mesh 上做 16 层非共享消息传递，decoder 再映射回经纬度网格
- **多尺度 multi-mesh**：由 icosahedron 逐级细分到第 6 级，最高分辨率包含 40,962 个节点，并保留不同尺度边以支持局部和长程信息传播
- **自回归 10 天预报**：单步输出 6 小时预报，滚动 40 步得到 10 天全球预报
- **多步训练损失**：训练中对多个自回归步的目标加权 MSE，逐步增加 rollout 长度，提高长时程稳定性
- **严谨业务对比**：在 2018 年及以后数据上与 ECMWF HRES 对比，论文报告 GraphCast 在 1380 个验证目标中的约 90% 优于 HRES

#### 🔬 深入细节

##### 架构总览

![GraphCast 模型示意图](https://ar5iv.labs.arxiv.org/html/2212.12794/assets/figures/schematic.png)
*图：GraphCast 论文 Fig. 1 的 arXiv HTML 图像资源，展示从经纬度网格输入到 multi-mesh 编码、GNN processor、解码回网格以及自回归滚动预报的流程。*

Science 正式论文地址为 `https://www.science.org/doi/10.1126/science.adi2336`；可访问的 arXiv 版本为 `https://arxiv.org/abs/2212.12794`，图像直链来自 ar5iv 渲染页面。

##### 核心流程伪代码

```python
# GraphCast 6 小时步长预报的高层伪代码
def graphcast_step(state_t_minus_6h, state_t):
    # state: lat-lon grid, 包含 surface + pressure-level variables
    grid_features = normalize(concat([state_t_minus_6h, state_t]))

    # Encoder: grid -> multi-mesh
    mesh_nodes = initialize_mesh_nodes()
    mesh_edges = build_multiscale_icosahedral_edges()
    mesh_nodes = grid_to_mesh_gnn(grid_features, mesh_nodes)

    # Processor: multi-mesh message passing
    for layer in range(16):
        messages = []
        for edge in mesh_edges:
            msg = edge_mlp(mesh_nodes[edge.src], mesh_nodes[edge.dst], edge.attr)
            messages.append((edge.dst, msg))
        mesh_nodes = node_mlp(mesh_nodes, aggregate(messages))

    # Decoder: multi-mesh -> grid
    residual_norm = mesh_to_grid_gnn(mesh_nodes, grid_points=state_t.grid)
    residual = denormalize_residual(residual_norm)
    return state_t + residual

def rollout_10_days(state_minus_6h, state_0):
    states = [state_minus_6h, state_0]
    for _ in range(40):  # 40 * 6 h = 10 days
        states.append(graphcast_step(states[-2], states[-1]))
    return states[-40:]
```

##### 动机：为什么从经纬度图像转向球面图

全球天气发生在球面上，但常见气象数据以经纬度矩形网格存储。在这种投影下，赤道附近网格近似均匀，高纬度网格却在物理距离上被挤压；同样的 \(3 \times 3\) 邻域在不同纬度覆盖的真实面积不同，极点附近还存在拓扑奇异性。二维 CNN 或 Transformer 可以学习这种偏差，但没有天然的球面归纳偏置。

GraphCast 的解决方案是保留经纬度网格作为输入/输出接口，但在网络内部转到球面 multi-mesh 图。mesh 由正二十面体不断细分并投影到球面，第 6 级最高分辨率包含 40,962 个节点。multi-mesh 保留从低分辨率到高分辨率的边集合，形成一张扁平层级图：短边传播局地天气结构，长边让信号在少量消息传递层内跨区域流动。

> 💡 关键：GraphCast 并不是把每个经纬度点都当作图节点，而是把规则网格数据编码到更均匀的球面 mesh，在 mesh 上学习大气动力学，再解码回业务需要的经纬度字段。

##### Encode-process-decode 消息传递

GraphCast 的架构可以抽象为：

$$
\hat{\mathbf{x}}_{t+6h}
=
\mathbf{x}_t
+
D_\theta
\left(
P_\theta^{(16)}
\left(
E_\theta(\mathbf{x}_{t-6h},\mathbf{x}_t)
\right)
\right)
$$

其中 \(E_\theta\) 是 grid-to-mesh encoder，\(P_\theta^{(16)}\) 是 16 层 processor，\(D_\theta\) 是 mesh-to-grid decoder。模型输出的是归一化残差，最后加到当前状态 \(\mathbf{x}_t\) 上，而不是直接预测完整天气场。这符合天气状态短时间演化的连续性：6 小时后的大气场通常可视作当前状态加一个有限变化量。

一层图网络的典型计算为：

$$
\mathbf{e}'_{ij}
=
\phi_e(\mathbf{h}_i,\mathbf{h}_j,\mathbf{e}_{ij})
$$

$$
\bar{\mathbf{m}}_j
=
\sum_{i:(i,j)\in \mathcal{E}} \mathbf{e}'_{ij}
$$

$$
\mathbf{h}'_j
=
\phi_v(\mathbf{h}_j,\bar{\mathbf{m}}_j)
$$

这里 \(\mathbf{h}_i\) 是 mesh node 特征，\(\mathbf{e}_{ij}\) 是相对位置、边长等 edge 特征，\(\phi_e\) 和 \(\phi_v\) 是 MLP。多层堆叠后，局地风温湿压变化可以沿边传播到下游区域，类似数值模式中信息随动力系统推进，但传播规则由数据学习。

##### 训练目标与自回归稳定性

GraphCast 使用 ERA5 1979-2017 年数据训练，并在 2018 年以后评估。每个训练样本包含两个输入状态 \((\mathbf{x}_{t-6h}, \mathbf{x}_t)\) 和未来状态。训练时模型不是只优化单步误差，而是在若干自回归步上累积损失，且训练过程中逐步把 rollout 长度增加到 12 步，即 3 天。这使模型在训练时暴露于自己的预测分布，减轻推理时滚动 40 步的分布漂移。

简化后的损失可写成：

$$
\mathcal{L}(\theta)
=
\frac{1}{K}
\sum_{k=1}^{K}
\sum_{v,\ell,i}
w_{v,\ell}\,a_i
\left\|
\hat{x}^{v,\ell}_{t+6k,i}
-
x^{v,\ell}_{t+6k,i}
\right\|_2^2
$$

其中 \(K\) 是训练 rollout 步数，\(v\) 是变量，\(\ell\) 是压力层，\(i\) 是网格点，\(a_i\) 表示面积/纬度权重，\(w_{v,\ell}\) 表示变量和垂直层权重。使用 MSE 会鼓励模型在不确定性较大的长 lead time 输出更平滑的场，这也是论文讨论的局限之一：确定性 GraphCast 的不确定性表达主要体现为模糊，而不是显式概率分布。

##### 变量表示与数据流

GraphCast 建模的单个天气状态包含 5 个地表变量：2 米温度、10 米 u/v 风、海平面气压、总降水；还包含 6 个高空变量在 37 个压力层上的值：温度、u/v 风、位势、比湿、垂直速度。因此每个网格点最多有 \(5 + 6 \times 37 = 227\) 个变量/层级组合。论文的主要 scorecard 评估其中一组业务关键变量和压力层。

数据流可拆成三段。第一段，encoder 用 grid-to-mesh 边把经纬度局部区域的信息聚合到最近的 mesh node。第二段，processor 在 multi-mesh 上同步更新节点特征；因为不同尺度的边同时存在，消息既能沿细 mesh 捕捉局部梯度，也能通过粗尺度边快速跨区域传播。第三段，decoder 用 mesh-to-grid 边把处理后的节点信息插值/映射回每个经纬度网格点，并输出 6 小时残差。

##### 与 Pangu-Weather 和传统 NWP 的区别

与传统 NWP 相比，GraphCast 不显式求解 Navier-Stokes 方程、热力学方程或物理参数化方案，而是学习状态转移算子：

$$
F_\theta:
(\mathbf{x}_{t-6h},\mathbf{x}_t)
\mapsto
\Delta \mathbf{x}_{t \to t+6h}
$$

这样做的优势是推理极快，并能直接从几十年再分析数据中吸收统计规律；代价是物理守恒、可解释参数化和概率不确定性需要额外设计。与 Pangu-Weather 的 Transformer 经纬度体不同，GraphCast 的内部表示是球面多尺度图，天然更接近全球大气的几何结构。与 FourCastNet 等频域模型相比，GraphCast 的 message passing 让局地边界、球面邻接和多尺度传播在同一图结构中表达。

论文对评估公平性也做了细致控制。GraphCast 以 ERA5 输入和 ERA5 目标训练，而 HRES 业务预报与 ERA5 的资料同化窗口不同；因此论文构造了 HRES-fc0 等对齐方式，避免某一方使用未来观测信息。这个细节说明 GraphCast 的贡献不只是模型结构，也包括把机器学习天气预报放入接近业务标准的验证框架中。

#### 🧪 练习题

```yaml
question: "GraphCast 使用 multi-mesh 图结构的核心目的是什么？"
options:
  - "把所有压力层压缩成一个标量，降低输出维度"
  - "在更均匀的球面网格上进行多尺度消息传递，同时保持经纬度网格输入输出"
  - "完全避免自回归推理，一次前向直接输出全年天气"
  - "只对热带地区建模，忽略高纬度区域"
answer: 1
explain: "GraphCast 将经纬度场编码到由多级 icosahedral mesh 构成的球面图，在图上进行局地和长程消息传递，再解码回经纬度网格。"
```
