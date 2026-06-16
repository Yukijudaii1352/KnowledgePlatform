### MeshGraphNets — 网格图网络 (Mesh Graph Networks)

```yaml
id: meshgraphnets
name: MeshGraphNets
full_name: 网格图网络 (Mesh Graph Networks)
year: '2020'
org: DeepMind
paper_url: https://arxiv.org/abs/2010.03409
category: fluid_simulation
parent: gns
motivation: 针对欧拉网格的非结构化图网络
```

#### 📝 一句话总结

MeshGraphNets 将 GNS 的消息传递思想从粒子半径图扩展到非结构化仿真网格：模型在网格边和额外世界空间边上传递消息，预测节点动力学与可选的重网格 sizing field，从而高效学习布料、结构力学和流体等网格化物理系统的长时仿真。

#### 🎯 核心要点

- **网格图而非粒子图**：节点对应网格顶点，mesh edges 表示离散计算拓扑，保留有限元/有限体积仿真中的局部邻接结构
- **额外 world edges**：对世界空间接近但网格拓扑上不相邻的节点加边，用于建模碰撞、自接触、障碍物交互等非局部物理关系
- **Encode-Process-Decode 主体**：节点、mesh edge、world edge 分别编码后，Processor 多轮消息传递更新潜变量，Decoder 输出领域相关的节点更新量
- **领域相关积分器**：布料输出加速度并二阶积分，结构力学输出速度和应力，流体输出动量/密度变化以及压力
- **学习自适应重网格**：另一个同构网络预测每个节点的 sizing tensor，泛化 remeshing 的领域启发式部分，再交给通用局部 remesher 调整网格分辨率
- **训练方式简洁**：使用一步监督的节点输出 MSE；若有 sizing labels，也对 sizing field 使用 MSE
- **实验证据广泛**：覆盖 FlagDynamic、SphereDynamic、DeformingPlate、CylinderFlow、Airfoil 等布料、结构和流体任务，推理速度比对应传统仿真器快 1-2 个数量级

#### 🔬 深入细节

##### 核心架构示意图

![MeshGraphNets 架构图](https://ar5iv.labs.arxiv.org/html/2010.03409/assets/x1.png)
*图：MeshGraphNets 在 SphereDynamic 任务上的 Encode-Process-Decode 流程。Encoder 将当前网格转成图并加入 world edges，Processor 沿 mesh/world edges 多轮消息传递，Decoder 输出节点加速度并通过积分器得到下一网格。*

![MeshGraphNets 实验域](https://ar5iv.labs.arxiv.org/html/2010.03409/assets/x2.png)
*图：论文使用布料、结构力学、绕圆柱不可压流和翼型可压流等不同网格仿真域验证同一框架。*

##### 算法伪代码

```python
# MeshGraphNets 前向与自适应重网格伪代码
def build_mesh_graph(mesh, fields, node_types):
    nodes = make_node_features(
        mesh_position=mesh.reference_position,
        world_position=mesh.current_position,
        physical_fields=fields,
        node_type=node_types,
        history=estimate_velocity_history(mesh),
    )

    mesh_edges = []
    for i, j in mesh.topological_edges:
        mesh_edges.append(edge_features(i, j, kind="mesh"))

    world_edges = []
    for i, j in close_in_world_space(mesh.current_position):
        if not mesh.are_topological_neighbors(i, j):
            world_edges.append(edge_features(i, j, kind="world"))

    return MultiEdgeGraph(nodes, mesh_edges=mesh_edges, world_edges=world_edges)

def meshgraphnet_step(mesh, fields):
    graph = build_mesh_graph(mesh, fields, node_types=mesh.node_types)
    graph = encoder(graph)

    for k in range(num_processor_blocks):  # paper uses 15 as a good tradeoff
        graph.mesh_edges = mesh_edge_update[k](graph.mesh_edges, graph.nodes)
        graph.world_edges = world_edge_update[k](graph.world_edges, graph.nodes)
        graph.nodes = node_update[k](
            graph.nodes,
            aggregate(graph.mesh_edges),
            aggregate(graph.world_edges),
        )

    dynamics = dynamics_decoder(graph.nodes)
    next_mesh, next_fields = integrate_domain_specific(mesh, fields, dynamics)

    if use_learned_remeshing:
        sizing_tensor = sizing_decoder(graph.nodes)
        next_mesh = generic_remesher(next_mesh, sizing_tensor)

    return next_mesh, next_fields

for batch in simulator_trajectories:
    pred = meshgraphnet_step(batch.mesh_t, batch.fields_t)
    loss_dyn = mean_squared_error(pred.node_targets, batch.node_targets_t1)
    loss_size = mean_squared_error(pred.sizing, batch.sizing_labels) if has_sizing else 0
    optimizer.step(loss_dyn + loss_size)
```

##### 方法机制解释

GNS 把物理系统看成粒子集合，而许多工程仿真天然运行在网格上：有限元结构、布料三角网格、绕物体流动的非结构化 CFD 网格等。网格不仅给出“哪些点在空间上接近”，还携带离散化拓扑和材料静止构型。MeshGraphNets 的关键改动是把图的边分为两类：

$$
G=(V,E_m,E_w),
$$

其中 \(E_m\) 是网格拓扑边，表示离散 PDE/力学方程中的局部邻接；\(E_w\) 是 world-space edge，连接当前物理空间中距离近但网格上不相邻的节点，用于碰撞、自接触、障碍物影响等。

对 mesh edge，边特征通常包含参考/mesh 空间相对位置、当前 world 空间相对位置及距离；对 world edge，则强调当前空间相对几何关系：

$$
\mathbf{e}^{m}_{ij}=
\left[\mathbf{x}^{mesh}_j-\mathbf{x}^{mesh}_i,\ 
\|\mathbf{x}^{mesh}_j-\mathbf{x}^{mesh}_i\|,\ 
\mathbf{x}^{world}_j-\mathbf{x}^{world}_i,\ 
\|\mathbf{x}^{world}_j-\mathbf{x}^{world}_i\|\right].
$$

Processor 与 GNS 类似，但分别更新不同边集并在节点上聚合：

$$
\mathbf{e}_{ij}^{m,k+1}=\phi_m^k(\mathbf{e}_{ij}^{m,k},\mathbf{v}_i^k,\mathbf{v}_j^k),
\qquad
\mathbf{e}_{ij}^{w,k+1}=\phi_w^k(\mathbf{e}_{ij}^{w,k},\mathbf{v}_i^k,\mathbf{v}_j^k),
$$

$$
\mathbf{v}_i^{k+1}=
\phi_v^k\left(
\mathbf{v}_i^k,
\sum_{j:(i,j)\in E_m}\mathbf{e}_{ij}^{m,k+1},
\sum_{j:(i,j)\in E_w}\mathbf{e}_{ij}^{w,k+1}
\right).
$$

Decoder 的输出不是固定语义，而是随物理域变化。布料是二阶动力学，Decoder 输出加速度：

$$
\hat{\mathbf{v}}^{t+1}_i=\mathbf{v}^t_i+\Delta t\,\hat{\mathbf{a}}^t_i,\qquad
\hat{\mathbf{x}}^{t+1}_i=\mathbf{x}^t_i+\Delta t\,\hat{\mathbf{v}}^{t+1}_i.
$$

不可压流的 CylinderFlow 在固定欧拉网格上预测动量变化 \(\Delta\mathbf{m}\) 和压力 \(p\)；Airfoil 可压流预测动量、密度变化和压力；DeformingPlate 预测拉格朗日速度和 von-Mises 应力。这种“共享图网络骨架 + 领域相关输出头/积分器”的设计，让同一方法覆盖多类 PDE 离散系统。

训练目标是一阶监督：

$$
\mathcal{L}_{dyn}=
\frac{1}{|V|}\sum_{i\in V}
\left\|\hat{\mathbf{y}}_i-\mathbf{y}_i\right\|_2^2,
$$

其中 \(\mathbf{y}_i\) 是该领域定义的节点目标，如加速度、速度、动量变化、密度变化或压力。推理时模型递归 rollout，论文报告即使只做 next-step 训练，长时滚动也能保持稳定。

MeshGraphNets 的另一项重要机制是学习动态重网格。传统自适应 remeshing 通常包含两部分：判断哪里需要更细/更粗的 resolution，以及执行具体 split/collapse 的局部网格操作。论文把前者学习成每节点 sizing field，后者交给通用 remesher：

$$
\hat{\mathbf{S}}_i = \psi_s(\mathbf{v}_i^K),\qquad
\mathcal{L}_{size}=
\frac{1}{|V|}\sum_i \|\hat{\mathbf{S}}_i-\mathbf{S}_i\|_2^2.
$$

在 rollout 中，模型同时预测下一步状态和 sizing tensor，再调用 \(M_{t+1}=\mathrm{Remesh}(\hat{M}_{t+1},\hat{S})\)。这样可以在布料褶皱或流场边界层处自动增加分辨率，而不需要把具体物理域的启发式 remesher 放进神经网络循环。

> 💡 关键：MeshGraphNets 相比 GNS 的本质提升是“尊重网格”。mesh edges 保留材料/离散化拓扑，world edges 捕捉接触与近场相互作用；二者结合比单纯半径粒子图或规则 CNN 网格更适合非结构化、可变分辨率仿真。

论文消融显示，mesh-space 信息和沿 mesh edge 的消息传递对布料等有静止构型的系统尤其重要；只用 GNS 式世界空间半径图容易在布料任务中发散。与 U-Net 等规则网格基线相比，MeshGraphNets 能在翼型尾流等小尺度区域保持非结构网格的局部分辨率优势。

#### 🧪 练习题

```yaml
question: "MeshGraphNets 为什么同时使用 mesh edges 和 world edges？"
options:
  - "mesh edges 用于可视化，world edges 只用于减少显存"
  - "mesh edges 保留网格拓扑和材料静止结构，world edges 捕捉空间接近导致的碰撞或接触"
  - "两类边完全等价，只是为了增加模型参数量"
  - "world edges 替代积分器，mesh edges 替代损失函数"
answer: 1
explain: "mesh edges 表示仿真网格上的离散邻接关系，适合传播局部 PDE/材料信息；world edges 连接当前空间中接近但拓扑不相邻的点，用于自接触、障碍物交互等非局部效应。"
```
