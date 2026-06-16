### PhysicsNeMo-v2 — NVIDIA PhysicsNeMo v2.0

```yaml
id: physicsnemo_v2
name: PhysicsNeMo-v2
full_name: NVIDIA PhysicsNeMo v2.0
year: '2026'
org: NVIDIA
paper_url: https://github.com/NVIDIA/physicsnemo/releases
category: acceleration
parent: modulus
motivation: PyTorch原生架构GNN速度提升2倍
```

#### 📝 一句话总结

PhysicsNeMo v2.0 不是单篇论文算法，而是 NVIDIA 将 Modulus/PhysicsNeMo 演进为 PyTorch 原生、模块化、可扩展 SciML 工具栈的一次核心重构；它通过标准化模型、数据管线、网格库、分布式与 GNN 后端，把 MeshGraphNet/GraphCast 等物理代理模型训练流程更紧密地接入 PyTorch 生态。

#### 🎯 核心要点

- **框架级重构**：v2.0 将 `physicsnemo.models.Module`、`Meta` 迁入 `physicsnemo.core`，将层级组件集中到 `physicsnemo.nn`，减少循环导入并提升可组合性
- **PyTorch 原生体验**：新增 PyTorch-like 的 `physicsnemo.nn`、`physicsnemo.nn.functional`、`physicsnemo.datapipes`、`physicsnemo.mesh` 等包，降低与外部 PyTorch 代码混用的成本
- **GPU 数据与网格栈**：`physicsnemo.datapipes` 面向高分辨率 SciML 数据加载，`physicsnemo.mesh` 提供 GPU 加速的 simplex mesh、点云、图和场数据处理
- **GNN 物理代理模型**：官方文档覆盖 MeshGraphNet、GraphCast、X-MeshGraphNet、Hybrid MeshGraphNet 等，重点服务不规则网格、瞬态动力学和大规模分布式图
- **PyG 迁移路线**：后续文档将 PyTorch Geometric 作为推荐 GNN 后端；官方 release notes 报告 MeshGraphNet 在大网格、fp16/bf16 下有 1.5-2x 性能优化
- **分布式与大规模图**：通过图分区、halo regions、Domain Parallelism、ShardTensor、FSDP 等机制扩展到超大网格和多 GPU/多节点训练
- **来源限制**：该条目的 `paper_url` 是发布页而非论文；以下解读基于 NVIDIA GitHub release、v2.0 migration guide、官方文档和 GNN 示例，而不是 peer-reviewed paper

#### 🔬 深入细节

##### 核心架构示意

![PhysicsNeMo 大规模图分区与 halo region](https://docs.nvidia.com/physicsnemo/latest/_images/mesh_with_halo_regions.png)
*图：PhysicsNeMo 文档中的大规模图分区和 halo region 示意。它体现了 PhysicsNeMo 面向大网格 GNN 时的核心工程问题：把不规则 mesh 切分到多个设备，同时保留跨分区消息传递所需的邻域。*

![MeshGraphNet 瞬态涡街预测示例](https://docs.nvidia.com/physicsnemo/latest/_images/vortex_shedding.gif)
*图：PhysicsNeMo 的 MeshGraphNet 涡街示例，展示模型在不规则二维三角网格上进行自回归瞬态预测。*

可访问来源说明：NVIDIA 的 v2.0 发布页位于 https://github.com/NVIDIA/physicsnemo/releases/tag/v2.0.0 ，迁移指南位于 https://github.com/NVIDIA/physicsnemo/blob/main/v2.0-MIGRATION-GUIDE.md ，GNN/PyG 相关文档见 https://docs.nvidia.com/physicsnemo/latest/resources/dgl_to_pyg_migration.html 和 https://docs.nvidia.com/physicsnemo/latest/user-guide/model_architectures.html 。性能描述中的 1.5-2x MeshGraphNet 优化来自官方 release notes: https://docs.nvidia.com/physicsnemo/latest/release-notes/index.html 。

##### 算法伪代码

```python
# PhysicsNeMo v2 风格的 MeshGraphNet/PyG 训练流程伪代码
# 输入: 不规则 mesh 时间序列、节点类型、边几何特征、目标物理场
# 输出: 可自回归 rollout 的物理代理模型

model = MeshGraphNet(
    node_in_dim=velocity_dim + node_type_dim,
    edge_in_dim=relative_position_dim + distance_dim,
    hidden_dim=128,
    num_message_passing_layers=15,
)

for batch in physicsnemo_datapipe:
    graph = build_pyg_graph(
        x=batch.node_features,          # u_t, v_t, node type
        edge_index=batch.edge_index,    # bidirectional mesh connectivity
        edge_attr=batch.edge_features,  # dx, dy, ||d||
    )

    pred_next = model(graph)            # predict u_{t+1}, v_{t+1}, p_{t+1}
    data_loss = mean_squared_error(pred_next, batch.target_next)

    if physics_guided:
        residual = physics_informer(pred_next, batch.geometry)
        loss = data_loss + lambda_phys * mean(residual**2)
    else:
        loss = data_loss

    loss.backward()
    optimizer.step()
    optimizer.zero_grad()

def rollout(initial_state, graph, steps):
    state = initial_state
    for _ in range(steps):
        state = model(graph.with_node_state(state))
    return state
```

##### GNN 核心计算

PhysicsNeMo 中最典型的 GNN 物理代理模型是 MeshGraphNet。它把数值仿真的 mesh 看成图 \(G=(V,E)\)：节点 \(v\in V\) 存储速度、压力、节点类型等物理量，边 \((u,v)\in E\) 存储相对坐标和距离等几何关系。一次消息传递可写为：

$$
h_v^{0}=\phi_v(x_v),\qquad h_{uv}^{0}=\phi_e(e_{uv})
$$

$$
m_{uv}^{k}=\psi_e^k\left(h_u^k,h_v^k,h_{uv}^k\right),\qquad
\bar{m}_v^k=\sum_{u:(u,v)\in E}m_{uv}^k
$$

$$
h_v^{k+1}=\psi_v^k\left(h_v^k,\bar{m}_v^k\right),\qquad
\hat{y}_{t+1,v}=\psi_{\mathrm{dec}}(h_v^K)
$$

训练目标通常是下一步物理场的监督损失：

$$
\mathcal{L}_{\mathrm{data}}
=\frac{1}{|V|}\sum_{v\in V}
\left\|\hat{y}_{t+1,v}-y_{t+1,v}\right\|_2^2
$$

若结合 PhysicsNeMo Sym/PhysicsInformer，也可以把 PDE 残差作为物理项加入：

$$
\mathcal{L}
=\mathcal{L}_{\mathrm{data}}
\lambda_{\mathrm{phys}}
\frac{1}{N_f}\sum_{i=1}^{N_f}
\left\|\mathcal{R}\left(\hat{u}_\theta;x_i,t_i\right)\right\|_2^2
$$

这里的关键并不是发明新的 GNN 公式，而是把 GNN、数据加载、mesh 表示、分布式并行、checkpoint、物理残差和 mixed precision 训练放进同一个 PyTorch 组合式框架中。

##### v2.0 为什么重要

PhysicsNeMo v2.0 的核心变化是工程抽象的重新划分。旧版 Modulus/PhysicsNeMo 中，模型、layers、utils、launch、checkpoint、domain parallel 等能力分布较散，迁移指南明确把公共模型基类迁到 `physicsnemo.core`，把可复用层迁到 `physicsnemo.nn`，把模型专用工具放回对应模型目录。这会减少用户在定制模型时碰到的隐式依赖和循环导入问题。

第二个变化是把科学计算中的输入表示统一到 PyTorch 张量生态。`physicsnemo.mesh` 用 `Mesh(points, cells, point_data, cell_data, global_data)` 表示二维/三维 simplex mesh、点云和图，所有几何与场数据可随 `.to("cuda")` 一起移动。对 GNN 来说，这意味着 mesh 到 graph、graph 到 batch、batch 到分布式训练的路径更短。

第三个变化是 GNN 后端从 DGL 逐步转向 PyTorch Geometric。官方 PyG 迁移文档说明：当输入图是 `torch_geometric.data.Data` 时使用 PyG backend；当输入仍是 `dgl.DGLGraph` 时保持兼容。这样既避免一次性破坏旧 checkpoint 和 dataset，又为后续 PyG 的 kernel、loader、ClusterData、k-hop subgraph 等生态优化留出空间。

##### 与传统 Modulus/单模型脚本的区别

传统单模型脚本通常把数据读取、mesh 预处理、模型定义、训练循环和分布式逻辑写在一起。PhysicsNeMo v2.0 把这些拆成稳定模块：DataPipes 负责数据，Mesh 负责几何和场，`physicsnemo.models`/`physicsnemo.nn` 负责模型和层，`physicsnemo.utils.checkpoint` 负责 checkpoint，Domain Parallelism 和 ShardTensor 负责超大图或超大张量切分。

这种拆分对 AI4Science 的价值在于可替换性。用户可以保留 MeshGraphNet 的 message passing 主体，替换 PyG graph 构造；也可以保留训练 recipe，替换模型为 Transolver、FNO 或 DoMINO；还可以把纯数据监督损失换成带 PDE residual 的 physics-guided loss。

##### 性能机制

任务元信息中的“GNN 速度提升 2 倍”对应官方 release notes 中 MeshGraphNet/GNN 的性能优化描述：在大于 200k nodes 的 mesh 上，fp16/bf16 场景报告 1.5-2x speedup。方法层面可以拆成三类来源：

- **后端切换**：PyG 图对象、loader 和稀疏操作更贴近 PyTorch 生态，可减少 DGL/PyTorch 之间的数据与 API 摩擦
- **精度与 kernel 优化**：fp16/bf16 mixed precision 让 message passing 中的 MLP 和 aggregation 更好利用 Tensor Core
- **大图并行**：graph partitioning 与 halo regions 在保持邻域消息的同时降低单卡显存压力，适配多 GPU 训练

> 💡 关键：PhysicsNeMo v2.0 的算法价值主要体现在“可组合的 SciML 基础设施”。它不是替代 MeshGraphNet、FNO 或 PINN 的单一算法，而是把这些模型变成更容易在真实工程网格、大规模数据和 PyTorch 训练栈中复用的模块。

#### 🧪 练习题

```yaml
question: "PhysicsNeMo v2.0 对 GNN 物理代理模型最直接的工程价值是什么？"
options:
  - "把所有 PDE 都改写成解析解"
  - "通过 PyTorch 原生模块、PyG 后端、DataPipes 和 Mesh 工具降低大规模 GNN 训练与部署成本"
  - "删除 MeshGraphNet 的 message passing 层，只保留 MLP"
  - "只支持规则网格上的 CNN 模型"
answer: 1
explain: "PhysicsNeMo v2.0 是框架级重构，重点在 PyTorch 原生组合、GNN/PyG 迁移、GPU 数据管线和 mesh/分布式工具，而不是改变 PDE 的数学形式。"
```
