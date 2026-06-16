### GNS — 图网络模拟器 (Graph Network Simulators)

```yaml
id: gns
name: GNS
full_name: 图网络模拟器 (Graph Network Simulators)
year: '2020'
org: DeepMind
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
category: fluid_simulation
parent: —
motivation: 粒子图网络模拟流体与材料交互
```

#### 📝 一句话总结

GNS 将物理系统表示为粒子图，用 Encode-Process-Decode 图网络通过多轮消息传递预测每个粒子的动力学量，并用固定积分器滚动生成长时序仿真，解决了流体、颗粒、可变形材料和刚体交互难以用单一神经模拟器统一建模的问题。

#### 🎯 核心要点

- **粒子图状态表示**：节点是粒子，边连接空间半径内的相邻粒子，节点/边特征包含速度历史、材料类型、相对位移、距离等局部物理信息
- **Encode-Process-Decode 架构**：Encoder 将原始粒子图编码到潜空间，Processor 执行多轮 Graph Network 消息传递，Decoder 输出粒子加速度或动力学更新量
- **固定更新器滚动仿真**：网络只学习动力学模型 \(d_\theta\)，位置和速度由显式更新规则积分，训练一步预测，推理时递归 rollout
- **相对坐标归纳偏置**：使用相对位置和距离作为边特征，强化平移不变性，比绝对坐标编码更利于泛化
- **抗误差累积训练**：训练时向输入状态注入噪声，并调整目标加速度，让模型学会从 rollout 误差扰动中恢复
- **关键超参数**：论文默认使用 relative Encoder、10 轮消息传递、Processor 中不共享参数的 GN block，主要性能受消息传递步数和训练噪声影响
- **跨材料泛化**：在水、沙、黏性材料、多材料交互、外力扰动和更大粒子数场景上展示长时稳定 rollout

#### 🔬 深入细节

##### 核心架构示意图

![GNS Encode-Process-Decode 架构图](https://ar5iv.labs.arxiv.org/html/2002.09405/assets/x2.png)
*图：GNS 从当前粒子状态构造图，Encoder 生成潜在节点/边特征，Processor 多轮消息传递，Decoder 提取动力学信息，再由固定更新器得到下一状态。图像来自 arXiv 论文的 ar5iv HTML 转换。*

##### 算法伪代码

```python
# GNS 单步训练与 rollout 伪代码
def build_particle_graph(state, radius):
    nodes = make_node_features(
        positions=state.positions,
        velocity_history=state.velocity_history,
        particle_type=state.material_type,
        boundary_features=state.boundary_features,
    )
    edges = []
    for i, j in radius_neighbors(state.positions, radius):
        rel = state.positions[j] - state.positions[i]
        edges.append({
            "sender": j,
            "receiver": i,
            "features": concat(rel, norm(rel)),
        })
    return Graph(nodes=nodes, edges=edges)

def gns_forward(state):
    graph = build_particle_graph(state, radius=R)
    graph = encoder(graph)  # raw features -> latent nodes/edges

    for m in range(num_message_passing_steps):  # paper default: 10
        graph = graph_network_block[m](graph)   # edge update, aggregate, node update

    accel = decoder(graph.nodes)  # per-particle acceleration or dynamics info
    next_velocity = state.velocity + accel * dt
    next_position = state.position + next_velocity * dt
    return next_position, next_velocity, accel

for batch in trajectories:
    noisy_state, target_accel = corrupt_inputs_and_adjust_target(batch)
    _, _, pred_accel = gns_forward(noisy_state)
    loss = mean_squared_error(normalize(pred_accel), normalize(target_accel))
    optimizer.step(loss)

# inference: recursively feed predictions back as the next state
state = initial_state
for t in range(num_rollout_steps):
    state.position, state.velocity, _ = gns_forward(state)
```

##### 方法机制解释

GNS 的建模对象不是规则网格上的场，而是一组随时间运动的粒子。令时刻 \(t\) 的系统状态为 \(X_t=\{(\mathbf{p}_i^t,\mathbf{v}_i^t,c_i)\}_{i=1}^N\)，其中 \(\mathbf{p}_i\) 是位置，\(\mathbf{v}_i\) 是速度或速度历史，\(c_i\) 是粒子类型/材料标签。模型先按空间半径 \(R\) 构造邻接边：

$$
E_t=\{(i,j): \|\mathbf{p}_i^t-\mathbf{p}_j^t\|\le R,\ i\ne j\}.
$$

边特征使用相对位移和距离：

$$
\mathbf{e}_{ij}^{raw}=
\left[\mathbf{p}_j^t-\mathbf{p}_i^t,\ \|\mathbf{p}_j^t-\mathbf{p}_i^t\|\right],
$$

这使模型更像学习局部物理相互作用律，而不是记住全局坐标。粒子数、容器大小或初始形状变化时，只要局部相互作用分布相近，消息传递模型仍可复用。

GNS 的核心是 Graph Network 消息传递。Encoder 先把原始节点/边特征映射到潜空间：

$$
\mathbf{v}_i^0=\phi_v^{enc}(\mathbf{x}_i),\qquad
\mathbf{e}_{ij}^0=\phi_e^{enc}(\mathbf{e}_{ij}^{raw}).
$$

Processor 执行 \(M\) 轮消息传递。每轮先更新边消息，再按接收节点聚合，最后更新节点：

$$
\mathbf{e}_{ij}^{m+1}=
\phi_e^m(\mathbf{e}_{ij}^{m},\mathbf{v}_i^m,\mathbf{v}_j^m),
\qquad
\bar{\mathbf{e}}_i^{m+1}=\sum_{j:(i,j)\in E}\mathbf{e}_{ij}^{m+1},
$$

$$
\mathbf{v}_i^{m+1}=
\phi_v^m(\mathbf{v}_i^m,\bar{\mathbf{e}}_i^{m+1}).
$$

经过多轮传播后，节点隐状态包含了局部邻域内更远范围的信息。Decoder 将最终节点状态映射为动力学量，通常可理解为加速度 \(\hat{\mathbf{a}}_i^t\)。再用固定更新器积分：

$$
\hat{\mathbf{v}}_i^{t+1}=\mathbf{v}_i^t+\Delta t\,\hat{\mathbf{a}}_i^t,\qquad
\hat{\mathbf{p}}_i^{t+1}=\mathbf{p}_i^t+\Delta t\,\hat{\mathbf{v}}_i^{t+1}.
$$

训练目标是一阶监督，但模型部署时会递归滚动很多步。若只做干净输入的一步 MSE，推理时前一步微小误差会把输入推离训练分布，误差会快速累积。论文的关键实践是向输入位置和速度注入噪声，同时把目标加速度调整为“能纠正噪声后的目标”。简化写法为：

$$
\mathcal{L}_{GNS}=
\frac{1}{N}\sum_{i=1}^{N}
\left\|
\frac{\hat{\mathbf{a}}_i-\mathbf{a}_i}{\sigma_a}
\right\|_2^2,
$$

其中 \(\mathbf{a}_i\) 是由相邻真实帧反推的目标加速度，\(\sigma_a\) 是训练集统计量。噪声增强让模型在 rollout 中遇到偏离真实轨迹的小扰动时学会回到合理动力学流形。

> 💡 关键：GNS 的“物理先验”不是硬编码 Navier-Stokes 或 MPM 方程，而是把状态组织成局部交互图，并通过相对坐标消息传递学习可复用的局部动力学。

论文结果显示，GNS 能在单步训练后生成数千步合理 rollout，并可从训练中的几千粒子扩展到测试时更多粒子和更长轨迹。消融实验表明，消息传递步数越多通常越能捕捉长程复杂交互；relative Encoder 明显优于 absolute Encoder；输入噪声存在最佳中间范围，太小无法抗 rollout 误差，太大会损害单步预测。

#### 🧪 练习题

```yaml
question: "GNS 训练时向输入状态加入噪声的主要目的是什么？"
options:
  - "让模型输出更随机，从而生成更多样的视频"
  - "模拟 rollout 中的状态偏差，使模型学会纠正误差累积"
  - "减少图中边的数量，降低计算复杂度"
  - "替代消息传递步骤，直接扩大感受野"
answer: 1
explain: "GNS 推理时递归使用自身预测，误差会把状态带离训练分布；训练噪声配合调整后的目标加速度，使模型在小扰动下仍能预测回到合理轨迹的动力学更新。"
```
