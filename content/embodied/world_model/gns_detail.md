### 图网络模拟器 (Learning to Simulate)

```yaml
id: gns
name: GNS
full_name: 图网络模拟器 (Learning to Simulate)
year: "2020.07"
org: DeepMind
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
category: physics
parent: vin
motivation: 利用GNN模拟流体刚体可变形材料
```

#### 📝 一句话总结

GNS 将复杂物理系统表示为粒子图，用 encode-process-decode 图网络通过多轮消息传递预测粒子加速度，并用噪声扰动训练缓解 rollout 误差累积，解决学习型模拟器难以统一模拟流体、刚体和可变形材料的问题。

#### 🎯 核心要点

- **粒子图表示**：每个粒子是节点，局部邻域内粒子关系是边，边随 rollout 动态重建
- **Encode-Process-Decode**：编码粒子/边特征，多轮 GN message passing，再解码为每粒子加速度
- **Euler update**：模型预测 \(\hat{a}_t\)，由固定积分器更新速度和位置
- **相对位置归纳偏置**：边特征使用相对位移和距离，提升空间平移泛化
- **训练噪声注入**：向输入速度加入 random-walk noise，让模型适应自身 rollout 产生的偏差
- **跨材料统一模拟**：覆盖 Water、Sand、Goop、MultiMaterial、WaterRamps 等流体/颗粒/黏塑材料
- **尺度泛化**：训练单步、测试长 rollout，并可泛化到更多粒子和更大场景

#### 🔬 深入细节

![GNS 复杂材料模拟](https://ar5iv.labs.arxiv.org/html/2002.09405/assets/x1.png)
*图：GNS 在 Water-3D、Goop-3D、Sand-3D 等粒子系统上生成长时程 rollout。*

##### 算法伪代码

```python
# Graph Network-based Simulator
def gns_step(particles, velocity_history, globals):
    # 1. 动态构图：连接半径内粒子
    edges = radius_graph(particles.positions, radius=R)

    # 2. Encoder：节点/边特征编码到 latent graph
    node_feat = concat(particles.positions, velocity_history, particles.material, globals)
    edge_feat = relative_displacement_and_distance(edges, particles.positions)
    graph = encode_nodes_edges(node_feat, edge_feat)

    # 3. Processor：M 轮消息传递
    for _ in range(M):
        graph = graph_network_block(graph)      # edge update + node update + residual

    # 4. Decoder：输出每粒子加速度
    accel = decode_node_acceleration(graph.nodes)

    # 5. 固定积分器更新
    new_velocity = particles.velocity + accel * dt
    new_position = particles.position + new_velocity * dt
    return new_position, new_velocity

for pair in sampled_trajectory_pairs:
    noisy_input = add_random_walk_noise(pair.input)
    accel_pred = gns_step(noisy_input)
    loss = mse(normalize(accel_pred), normalize(pair.target_accel))
    update(loss)
```

##### 动机与背景

传统物理模拟器通常需要针对材料类型和场景手工设计：流体、沙子、黏塑性材料、刚体交互往往使用不同方程或求解器。学习型模拟器希望直接从轨迹数据中学习动力学，但标准端到端网络难以处理数千到数万个粒子的高维状态。

GNS 的关键观察是：粒子模拟本身就可以看作图上的局部消息传递。粒子只与半径内邻居强交互，压力、碰撞、摩擦和材料约束都可以由局部边消息逐步传播。

##### 模型框架

GNS 将状态 \(S_t\) 表示为粒子集合，学习动力学函数：

$$
\hat{a}_t = f_{\theta}(S_t)
$$

再用固定 update procedure 预测下一状态：

$$
v_{t+1} = v_t + \hat{a}_t \Delta t
$$

$$
x_{t+1} = x_t + v_{t+1} \Delta t
$$

与直接预测位置不同，预测加速度让模型更接近物理求解器中的“计算动力学信息 + 积分更新”分工。

##### Encode-Process-Decode 图网络

Encoder 将粒子状态和边属性映射为 latent graph：

$$
G^0 = E(S_t)
$$

Processor 执行 \(M\) 轮消息传递：

$$
G^{m+1} = P_m(G^m)
$$

Decoder 从最终节点 latent 输出加速度：

$$
\hat{a}_i = D(G^M_i)
$$

论文发现 message-passing steps 是长期性能的关键超参数，因为多轮传递允许局部约束沿粒子邻域传播，从而模拟更长程的物理影响。

##### 训练噪声与 rollout 稳定性

GNS 训练用单步监督，但测试要自回归 rollout 上百到上千步。若训练输入总是真实状态，模型从未见过自己预测带来的小误差，rollout 时会快速偏离分布。论文用 random-walk noise 污染输入速度，并相应调整位置，使训练分布更接近 rollout 分布：

$$
\tilde{v}_t = v_t + \eta_t
$$

$$
\mathcal{L} = \|\hat{a}_{\theta}(\tilde{S}_t) - a_t\|_2^2
$$

这个技巧与 DAgger/数据增强思想类似，是 GNS 长时程稳定的主要因素之一。

##### 与 IN/VIN 的区别

IN 更像一般对象关系推理框架，VIN 解决从像素得到对象状态的问题；GNS 则专门面向大规模粒子物理，把图构建、message passing、加速度预测和积分更新组织成可扩展模拟器。它能在训练时几千粒子、测试时更多粒子的情形下运行，并覆盖多种材料。

> 💡 关键：GNS 的“物理先验”不来自显式方程，而来自粒子局部相互作用、共享消息函数、相对坐标和固定积分器这些结构选择。

#### 🧪 练习题

```yaml
question: "GNS 中训练时向输入速度加入 random-walk noise 的目的是什么？"
options:
  - "让图的节点数量减少"
  - "让模型在训练时见到类似 rollout 误差的扰动，从而减轻长期误差累积"
  - "把连续粒子状态离散成 codebook"
  - "替代图网络中的消息传递"
answer: 1
explain: "GNS 测试时会反复喂入自己的预测，输入会带偏差；训练噪声让模型提前适应这种分布偏移，提高长 rollout 稳定性。"
```
