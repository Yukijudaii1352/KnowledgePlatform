### E²GNN — 高效等变图神经网络 (Efficient Equivariant Graph NN)

```yaml
id: e2gnn
name: E²GNN
full_name: "高效等变图神经网络 (Efficient Equivariant Graph NN)"
year: "2025"
org: "多机构"
paper_url: "https://www.nature.com/articles/s41524-025-01535-3"
category: property_prediction
parent: equiformer
motivation: "平衡精度与效率的等变设计"
```

#### 📝 一句话总结

E²GNN 用每个原子的标量-向量双表示替代高阶球谐/张量积表示，并通过直接力预测与两体局域消息传递实现等变原子间势建模，解决了等变模型在精度与训练/推理效率之间难以兼顾的问题。

#### 🎯 核心要点

- **标量-向量双表示**：每个原子节点同时维护 \(F\) 个标量特征 \(\mathbf{x}_i\) 和 \(F\) 个三维向量特征 \(\vec{\mathbf{x}}_i\)，分别承载不变量与等变量信息
- **四阶段迭代结构**：每层依次执行 global message distributing、local message passing、local message updating、global message aggregating
- **轻量等变消息传递**：局域消息只依赖邻居标量、邻居向量、距离径向基与单位方向向量，避免 MACE、Equiformer 等高阶不可约表示中的昂贵张量积
- **新消息更新单元（NMU）**：用向量范数把等变信息转成不变量门控信号，再用线性组合更新标量和向量通道
- **全局标量/向量通信**：引入图级全局标量与全局向量，使浅层网络也能交换长程信息，缓解单纯堆深局域 GNN 的过平滑和梯度问题
- **能量可加、力直接预测**：总能量由原子能量求和得到，保证 extensivity；力由最终向量表示线性读出，跳过对能量的一阶/二阶求导
- **联合能量-力损失**：训练目标同时约束结构能量与每个原子三维力分量，在 OC20、MD17、ISO17 以及 LiPS/H₂O/CH₄ 分子动力学系统上评估
- **效率取舍清晰**：直接力预测显著提高训练和推理速度，但力场不严格能量守恒，MD 中通常需要恒温器控制温度漂移

#### 🔬 深入细节

##### 架构示意图

![E²GNN 总体架构图](https://media.springernature.com/lw1200/springer-static/image/art%3A10.1038%2Fs41524-025-01535-3/MediaObjects/41524_2025_1535_Fig2_HTML.png)
*图：E²GNN Figure 2。模型在每一层中执行全局消息分发、局域消息传递、局域消息更新和全局消息聚合；图源为 npj Computational Materials 论文公开图片。*

##### 算法伪代码

```python
# E²GNN 核心流程伪代码
graph = build_3d_interaction_graph(atoms, positions, cutoff_D, max_neighbors_N)

# 初始化：标量来自原子序数嵌入，向量从零开始
x = atom_embedding(Z)                   # shape: [num_atoms, F]
v = zeros(num_atoms, F, 3)              # vector channels
x_g = trainable_global_scalar(F)
v_g = zeros(F, 3)

for layer in range(T):
    # 1. global message distributing
    for i in graph.nodes:
        x[i] = mlp(concat(x[i], x_g)) + x[i]
        v[i] = linear(v[i] + v_g) + v[i]

    # 2. local message passing
    m_x = zeros_like(x)
    m_v = zeros_like(v)
    for i in graph.nodes:
        for j in graph.neighbors(i):
            r_ji = positions[i] - positions[j]
            d = norm(r_ji)
            direction = r_ji / d
            gate_h = radial_h(d)
            gate_u = radial_u(d)
            gate_v = radial_v(d)

            m_x[i] += (W_h @ x[j]) * gate_h
            m_v[i] += (W_u @ x[j]) * gate_u * v[j]
            m_v[i] += (W_v @ x[j]) * gate_v * direction

    # 3. local message updating / NMU
    for i in graph.nodes:
        inv_from_vec = norm(V @ m_v[i])
        z = concat(m_x[i], inv_from_vec)
        x[i] = W_s @ z + tanh(W_g @ z) * m_x[i]
        v[i] = (W_h_update @ z) * (U @ m_v[i])

    # 4. global message aggregating
    x_g = mlp(concat(mean(x), x_g)) + x_g
    v_g = linear(mean(v) + v_g) + v_g

atom_energy = mlp_energy(x)             # scalar head
energy = atom_energy.sum()
forces = linear_force(v)                # direct vector readout
loss = alpha * abs(energy - energy_label) + beta * mae(forces, force_labels)
```

##### 动机与背景

机器学习原子间势要同时预测能量和力。能量应对平移、旋转、反射保持不变；力作为三维向量，在旋转结构时也应按同样方式旋转。传统不变量模型只用距离、角度或二面角编码几何，效率高但方向信息利用有限；高阶等变模型用球谐函数、Clebsch-Gordan 张量积和不可约表示显式保存方向信息，精度强但计算开销大。

E²GNN 的设计目标是保留等变性的主要收益，同时把表示压到最低复杂度：只维护标量和普通三维向量，不使用 \(l \ge 2\) 的高阶张量通道。节点初始状态为：

$$
\mathbf{x}_i^{(0)}=E(z_i)\in\mathbb{R}^{F},\qquad
\vec{\mathbf{x}}_i^{(0)}=\vec{\mathbf{0}}\in\mathbb{R}^{F\times 3}
$$

其中 \(z_i\) 是原子序数，\(E\) 是可学习嵌入。标量通道不会随旋转改变，向量通道随旋转一起变换，因此只要消息函数由距离、标量门控和单位方向向量组成，就可以保持 E(3) 等变。

##### 局域消息传递：用两体力直觉构造向量消息

在第 \(t\) 层，原子 \(i\) 从截断半径内的邻居 \(j\) 聚合标量消息：

$$
\mathbf{m}_i
=\sum_{v_j\in\mathcal{N}(v_i)}
(W_h\mathbf{x}_j^{(t)})\circ
\lambda_h(\|\vec{\mathbf{r}}_{ji}\|)
$$

向量消息由两部分组成：

$$
\vec{\mathbf{m}}_i
=\sum_{v_j\in\mathcal{N}(v_i)}
(W_u\mathbf{x}_j^{(t)})\circ\lambda_u(\|\vec{\mathbf{r}}_{ji}\|)\circ\vec{\mathbf{x}}_j^{(t)}
+(W_v\mathbf{x}_j^{(t)})\circ\lambda_v(\|\vec{\mathbf{r}}_{ji}\|)\circ
\frac{\vec{\mathbf{r}}_{ji}}{\|\vec{\mathbf{r}}_{ji}\|}
$$

第一项传播上一层已经学到的方向特征；第二项像一个可学习的两体力分解：\((W_v\mathbf{x}_j)\lambda_v(d_{ji})\) 给出强度，\(\vec{\mathbf{r}}_{ji}/\|\vec{\mathbf{r}}_{ji}\|\) 给出方向。因为距离是旋转不变标量、单位方向是等变向量，整体消息在旋转下仍按向量方式变换。

> 💡 关键：E²GNN 不显式枚举角度、二面角或高阶球谐通道，而是让多层标量-向量交互逐步学习几何对称信息。

##### NMU：让向量信息安全地控制标量更新

局域消息更新阶段把 \(\mathbf{m}_i\) 和 \(\vec{\mathbf{m}}_i\) 汇合。向量不能直接加到标量里，否则会破坏旋转对称性；E²GNN 先取线性变换后向量的范数，把方向特征转成不变量：

$$
\mathbf{x}_i^{(t+1)}
=W_s(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)
+\tanh\left(W_g(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)\right)\mathbf{m}_i
$$

$$
\vec{\mathbf{x}}_i^{(t+1)}
=\left(W_h(\mathbf{m}_i\oplus\|V\vec{\mathbf{m}}_i\|)\right)
\circ\left(U\vec{\mathbf{m}}_i\right)
$$

直觉上，\(\|V\vec{\mathbf{m}}_i\|\) 告诉标量通道“周围方向模式有多强”，但不暴露坐标系方向；向量更新则用标量门控缩放向量线性组合，从而保持等变性。

##### 全局通信与输出头

单纯局域 GNN 需要堆很多层才能让远距离原子互相影响，但深层会带来过平滑和训练不稳定。E²GNN 引入图级全局标量 \(\mathbf{x}_{\mathcal{G}}\) 与全局向量 \(\vec{\mathbf{x}}_{\mathcal{G}}\)。每层开始前把全局状态分发到节点，每层结束后再用节点均值更新全局状态：

$$
\mathbf{x}_{\mathcal{G}}^{(t+1)}
=\phi\left(\frac{1}{|\mathcal{G}|}\sum_{v_i\in\mathcal{G}}\mathbf{x}_i^{(t)}
\oplus \mathbf{x}_{\mathcal{G}}^{(t)}\right)+\mathbf{x}_{\mathcal{G}}^{(t)}
$$

最终能量由原子标量读出后求和：

$$
e=\sum_{v_i\in\mathcal{G}} e_i,\qquad e_i=\phi(\mathbf{x}_i^{(T)})
$$

力由最终向量通道直接线性读出：

$$
\vec{\mathbf{F}}_i=W_f\vec{\mathbf{x}}_i^{(T)}
$$

这种设计省去了 \(\vec{\mathbf{F}}_i=-\nabla_{\vec{\mathbf{r}}_i}E\) 的反向求导成本，尤其避免了训练力损失时对能量梯度再求参数梯度的二阶开销。代价是直接预测的力不自动满足能量守恒，因此论文在讨论中也指出 MD 场景通常需要恒温器。

##### 训练目标与传统方法对比

论文使用能量和力的加权 L1 损失：

$$
\mathcal{L}
=\frac{1}{N}\sum_{n=1}^{N}\left(
\alpha |e_n-e_n^l|
+\beta\frac{1}{3M}\sum_{m=1}^{M}\sum_{k=1}^{3}
|\vec{\mathbf{F}}_{nmk}-\vec{\mathbf{F}}_{nmk}^{\,l}|
\right)
$$

其中 \(N\) 是样本数，\(M\) 是每个结构的原子数，\(\alpha,\beta\) 控制能量与力的权重。与 Equiformer/MACE 这类高阶等变模型相比，E²GNN 的表达能力来自“标量门控 + 向量传播 + 全局节点”，而不是昂贵的高阶张量路径；与 SchNet/CGCNN 这类标量不变量模型相比，它能直接在中间层保存方向响应，因而更自然地预测力。

#### 🧪 练习题

```yaml
question: "E²GNN 为什么可以在不用高阶球谐张量的情况下保持等变性？"
options:
  - "因为它只预测标量能量，不预测力"
  - "因为它用距离作为标量门控、用单位方向向量承载方向变化，并让向量通道随旋转同步变换"
  - "因为它把所有原子坐标先旋转到同一个标准方向"
  - "因为全局节点会消除所有方向信息"
answer: 1
explain: "距离和向量范数是不变量，单位方向和向量通道是等变量；用标量门控缩放等变向量不会破坏 E(3) 等变性。"
```
