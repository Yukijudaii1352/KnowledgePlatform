### DYNAMI-CAL GraphNet

```yaml
id: momentum_gnn
name: DYNAMI-CAL GraphNet
full_name: 动态守恒律图神经网络 (Dynamical Conservation Laws in Graph Neural Networks)
year: 2025
org: MIT / Brown University
paper_url: https://www.nature.com/articles/s41467-025-67802-5
category: physics_constrained
parent: egnn
motivation: 通过牛顿第三定律约束边消息实现严格动量守恒，解决等变GNN的动量漂移
```

#### 📝 一句话总结

DYNAMI-CAL GraphNet 提出了一种物理约束的等变图神经网络，通过在边局部参考系中解码反对称力与力矩（\(\vec{F}_{ij}=-\vec{F}_{ji}\), \(\vec{A}_{ij}=-\vec{A}_{ji}\)），从架构层面严格保证线性动量和角动量守恒，解决了现有等变 GNN（如 EGNN、GMN）因消息不对称导致的动量漂移问题，并在颗粒碰撞、N 体动力学、人体运动、蛋白质分子动力学等六类任务上展现了卓越的长程稳定性与外推能力。

#### 🎯 核心要点

- **边局部参考系**：为每条边 \(ij\) 构建三个正交基向量 \(\vec{a}_{ij}, \vec{b}_{ij}, \vec{c}_{ij}\)，满足 SO(3) 等变、T(3) 不变、节点交换反对称
- **反对称力解码**：力 \(\vec{F}_{ij} = \sum_k \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[k] \cdot \text{basis}_k\)，由于基向量反对称，自动满足牛顿第三定律 \(\vec{F}_{ij} = -\vec{F}_{ji}\)，严格保守线性动量
- **反对称力矩解码**：角动量交互向量 \(\vec{A}_{ij} = -\vec{A}_{ji}\)，通过分离轨道分量得到自旋力矩，严格保守总角动量（轨道 + 自旋）
- **时空消息传递**：边嵌入通过 skip 连接跨时间步传递记忆，结合隐式 Euler 积分实现时空一致性
- **Ghost 节点边界建模**：通过反射生成 ghost 节点处理无网格边界，无需重新训练即可适配不同几何形状
- **六类基准验证**：颗粒 6-DoF 碰撞、动量守恒测试、旋转 hopper 外推（60→2073 球、平面→曲面）、约束 N 体、人体运动预测、蛋白质分子动力学

#### 🔬 深入细节

##### 核心架构示意图

![DYNAMI-CAL GraphNet 架构总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-67802-5/MediaObjects/41467_2025_67802_Fig1_HTML.png)

*图：DYNAMI-CAL GraphNet 的完整流程——从图构建、边局部参考系、反对称力/力矩解码到节点状态更新。核心创新在于边消息的物理约束设计，确保牛顿第三定律在架构层面被严格满足。*

##### 算法伪代码

```python
# DYNAMI-CAL GraphNet 单步前向传播
def forward(graph_t, edge_memory_prev):
    # === 1. 编码 ===
    h_i = φ_node(node_features_i)          # 节点标量嵌入
    
    # === 2. 边局部参考系构建 ===
    for edge (i, j) in graph:
        d_ij = r_j - r_i                    # 位移向量
        v_ij = v_j - v_i                    # 相对速度
        a_ij = d_ij / ||d_ij||              # 第一基向量（沿连线）
        c_ij = d_ij × v_ij                  # 第三基向量（叉积）
        c_ij = c_ij / ||c_ij||
        b_ij = c_ij × a_ij                  # 第二基向量（右手系）
        # 关键性质: a_ij = -a_ji, b_ij = -b_ji, c_ij = -c_ji
    
    # === 3. 边嵌入 + 时空消息传递 ===
    for edge (i, j):
        inv_features = [||d_ij||, d_ij·v_ij, ...]  # 不变量特征
        ε_ij = φ_edge(h_i, h_j, inv_features)
        ε_ij = ε_ij + skip_connection(edge_memory_prev[i,j])  # 时间记忆
        ε'_ij = MLP_interaction(ε_ij)       # 交互嵌入
    
    # === 4. 反对称力解码（线性动量守恒）===
    for edge (i, j):
        coeffs_f = ψ_ef(ε'_ij)              # 3个标量系数
        F_ij = coeffs_f[0]*a_ij + coeffs_f[1]*b_ij + coeffs_f[2]*c_ij
        # 自动满足 F_ij = -F_ji（因基向量反对称）
    
    # === 5. 反对称力矩解码（角动量守恒）===
    for edge (i, j):
        coeffs_a = ψ_ea(ε'_ij)              # 3个标量系数
        A_ij = coeffs_a[0]*a_ij + coeffs_a[1]*b_ij + coeffs_a[2]*c_ij
        # A_ij = -A_ji（总角动量交互反对称）
        
        # 对称参考点
        w_i, w_j = ψ_n1(h_i), ψ_n1(h_j)
        r0_ij = (w_i * r_i + w_j * r_j) / (w_i + w_j)  # r0_ij = r0_ji
        
        # 分离自旋力矩
        λ_ij = ψ_el(ε'_ij)                  # 稳定性标量
        M_ij = A_ij - (r_j - r0_ij) × F_ij * λ_ij  # I_j·Δω_j
    
    # === 6. 聚合 + 节点更新 ===
    for node i:
        ΔF_total = Σ_j F_ij                 # 合力
        ΔM_total = Σ_j M_ij                 # 合力矩
        Δv_i = ψ_n2(h_i) * ΔF_total         # 1/m_i · ΣF
        Δω_i = ψ_n3(h_i) * ΔM_total         # 1/I_i · ΣM
        Δv_ext = ψ_n4(h_i)                  # 外力（如重力）
        
        v_new = v_i + Δv_i + Δv_ext
        ω_new = ω_i + Δω_i
        x_new = x_i + (v_i + v_new)/2 * Δt  # 梯形积分
    
    return graph_t+1, edge_memory_current
```

##### 方法深入解析

**1. 动机与背景：等变 GNN 的动量漂移问题**

现有等变 GNN（如 EGNN、GMN、ClofNet）虽然保证了 SE(3) 等变性，但**不保证动量守恒**。根本原因在于：这些模型的边消息 \(m_{ij} \neq m_{ji}\)（或虽然力等变但不反对称），导致节点 \(i\) 对 \(j\) 施加的"力"与 \(j\) 对 \(i\) 的"力"不满足牛顿第三定律。在长程自回归推理中，这种微小的不对称性会累积，造成系统总动量漂移，最终导致物理不一致甚至轨迹发散。

> 💡 **关键洞察**：等变性（输出随输入旋转而旋转）≠ 守恒性（系统总量不变）。DYNAMI-CAL GraphNet 的核心贡献是**在保持等变性的同时，从架构层面强制守恒**。

**2. 核心机制一：边局部参考系**

对每条边 \(ij\)，利用位移向量 \(\vec{d}_{ij} = \vec{r}_j - \vec{r}_i\) 和相对速度 \(\vec{v}_{ij} = \vec{v}_j - \vec{v}_i\) 构建正交基：

$$\vec{a}_{ij} = \frac{\vec{d}_{ij}}{\|\vec{d}_{ij}\|}, \quad \vec{c}_{ij} = \frac{\vec{d}_{ij} \times \vec{v}_{ij}}{\|\vec{d}_{ij} \times \vec{v}_{ij}\|}, \quad \vec{b}_{ij} = \vec{c}_{ij} \times \vec{a}_{ij}$$

这组基向量具有三个关键性质：
- **SO(3) 等变**：全局旋转 \(R\) 作用时，\(\vec{a}_{ij} \to R\vec{a}_{ij}\)
- **T(3) 不变**：平移不改变相对位移和相对速度
- **节点交换反对称**：\(\vec{a}_{ij} = -\vec{a}_{ji}\)，\(\vec{b}_{ij} = -\vec{b}_{ji}\)，\(\vec{c}_{ij} = -\vec{c}_{ji}\)

> ⚠️ **注意**：反对称性是守恒的关键——当 \(\vec{d}_{ij}\) 变为 \(\vec{d}_{ji} = -\vec{d}_{ij}\) 时，叉积 \(\vec{d}_{ji} \times \vec{v}_{ji} = (-\vec{d}_{ij}) \times (-\vec{v}_{ij}) = \vec{d}_{ij} \times \vec{v}_{ij}\)，但归一化后 \(\vec{a}_{ji} = -\vec{a}_{ij}\)，进而 \(\vec{b}_{ji} = \vec{c}_{ji} \times \vec{a}_{ji} = (-\vec{c}_{ij}) \times (-\vec{a}_{ij}) = ... = -\vec{b}_{ij}\)。

**3. 核心机制二：反对称力与线性动量守恒**

力通过不变标量系数调制反对称基向量来解码：

$$\vec{F}_{ij} = \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[0] \cdot \vec{a}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[1] \cdot \vec{b}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[2] \cdot \vec{c}_{ij}$$

由于边嵌入 \(\boldsymbol{\epsilon}'_{ij}\) 仅依赖不变量（距离、内积等），对称边 \(ij\) 和 \(ji\) 产生相同的标量系数，但基向量反号，因此：

$$\vec{F}_{ij} = -\vec{F}_{ji} \quad \Longrightarrow \quad \sum_{i} \Delta \vec{p}_i = \sum_{i} \sum_{j \in \mathcal{N}(i)} \vec{F}_{ij} = 0$$

这就是牛顿第三定律的架构级实现，**无需任何正则化或后处理**即可严格保证线性动量守恒。

**4. 核心机制三：角动量守恒的力矩解码**

角动量守恒更为复杂，因为总角动量 = 轨道角动量 + 自旋角动量。论文定义边 \(ij\) 的总角动量交互向量：

$$\vec{A}_{ij} = I_i(\vec{\omega}_i^{t+\Delta t} - \vec{\omega}_i^t) + (\vec{r}_i - \vec{r}_0) \times m_i(\vec{v}_i^{t+\Delta t} - \vec{v}_i^t)$$

同样通过反对称基向量解码，确保 \(\vec{A}_{ij} = -\vec{A}_{ji}\)。然后通过对称参考点 \(\vec{r}_{0_{ij}}\) 分离自旋分量：

$$I_j \cdot \Delta\vec{\omega}_j = \vec{A}_{ij} - (\vec{r}_j - \vec{r}_{0_{ij}}) \times \vec{F}_{ij} \cdot \lambda_{ij}$$

其中 \(\vec{r}_{0_{ij}} = \frac{\psi_{n1}(h_i) \cdot \vec{r}_i + \psi_{n1}(h_j) \cdot \vec{r}_j}{\psi_{n1}(h_i) + \psi_{n1}(h_j)}\) 在节点交换下保持不变（\(\vec{r}_{0_{ij}} = \vec{r}_{0_{ji}}\)），\(\lambda_{ij}\) 是稳定性标量，防止微小噪声力产生不合理的大力矩。

**5. 时空消息传递与边记忆**

传统 GNN 每步独立处理图，丢失了时间连贯性。DYNAMI-CAL GraphNet 通过 **skip 连接**将上一时间步的边嵌入传递到当前步：

$$\boldsymbol{\epsilon}_{ij}^{(t)} = \phi_{\text{edge}}(\text{features}_{ij}^{(t)}) + W_{\text{skip}} \cdot \boldsymbol{\epsilon}_{ij}^{(t-1)}$$

这使得模型能够捕捉碰撞前后的时间相关性，类似于 RNN 的隐状态但作用在边上。配合隐式 Euler 积分（使用更新后的速度计算位移），提高了数值稳定性。

**6. Ghost 节点：无网格边界处理**

对于边界（如墙壁），论文提出将每个靠近边界的粒子关于边界面反射，生成 ghost 节点。Ghost 节点继承边界属性（如零速度、边界标识符），与原始粒子之间建立边连接。这种方法：
- 无需显式编码边界几何
- 可推广到任意形状（平面、曲面）
- 训练时用平面墙，测试时可直接迁移到旋转圆柱 hopper

**7. 与 EGNN/GMN 的关键区别**

| 特性 | EGNN | GMN | DYNAMI-CAL GraphNet |
|------|------|-----|---------------------|
| 等变性 | E(n) | E(n) | SE(3) |
| 消息对称性 | \(m_{ij} \neq m_{ji}\) | \(m_{ij} \neq m_{ji}\) | \(\vec{F}_{ij} = -\vec{F}_{ji}\) |
| 线性动量守恒 | ✗ | ✗ | ✓（严格） |
| 角动量守恒 | ✗ | ✗ | ✓（严格） |
| 旋转动力学 | 不支持 | 不支持 | 6-DoF（平动+转动） |
| 时间记忆 | 无 | 无 | 边 skip 连接 |

> 💡 **为什么 EGNN 不守恒？** EGNN 的位置更新 \(\vec{x}_i' = \vec{x}_i + \sum_j (\vec{x}_i - \vec{x}_j) \phi(m_{ij})\) 中，\(\phi(m_{ij})\) 是标量但 \(m_{ij} \neq m_{ji}\)（因为消息聚合依赖节点特征），所以 \(i\) 对 \(j\) 的"推力"与 \(j\) 对 \(i\) 的不等，总动量不守恒。

**8. 实验亮点**

- **旋转 hopper 外推**：仅用 60 球 + 平面墙训练，成功预测 2073 球 + 旋转曲面墙的 16000 步演化，GNS 在早期即发散
- **动量守恒验证**：两球斜碰实验中，DYNAMI-CAL GraphNet 精确保守所有分量的线性和角动量，GNS 和 EGNN 均出现明显漂移
- **蛋白质 MD**：在 NPT 系综（300K, 1 bar）条件下准确预测蛋白质构象动力学

#### 🧪 练习题

```yaml
question: "DYNAMI-CAL GraphNet 如何从架构层面保证牛顿第三定律 F_ij = -F_ji？"
options:
  - "在损失函数中添加 ||F_ij + F_ji||² 正则化项"
  - "使用节点交换反对称的边局部基向量，乘以对称的标量系数来解码力"
  - "对每条边的消息取平均值 (m_ij + m_ji)/2 作为对称消息"
  - "在后处理阶段将力投影到反对称子空间"
answer: 1
explain: "DYNAMI-CAL GraphNet 构建的边局部参考系基向量满足 a_ij=-a_ji, b_ij=-b_ji, c_ij=-c_ji，而标量系数由不变量嵌入产生（ij 和 ji 相同），因此力 F_ij = Σ coeff_k · basis_k 自动满足 F_ij = -F_ji，无需正则化或后处理。"
```