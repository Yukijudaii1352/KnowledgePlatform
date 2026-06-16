### GNO — 图神经算子 (Graph Neural Operator)

```yaml
id: gno
name: GNO
full_name: 图神经算子 (Graph Neural Operator)
year: '2020'
org: Caltech
paper_url: https://arxiv.org/abs/2003.03485
category: operators
parent: —
motivation: 基于GNN处理非结构化网格
```

#### 📝 一句话总结

GNO 首次把神经算子具体实现为图核网络：在物理域采样点上构图，用消息传递近似连续积分核，从而学习 PDE 参数函数到解函数的离散化不变映射。

#### 🎯 核心要点

- **神经算子概念实例化**：学习 Banach 函数空间之间的算子 \(\mathcal{F}: \mathcal{A}\to\mathcal{U}\)，而不是固定维度数组映射
- **Green's function 直觉**：把 PDE 解算子看作积分核 \(u(x)=\int_D G_a(x,y)f(y)\,dy\)，用神经网络核 \(\kappa_{\phi}\) 学习非局部影响
- **图消息传递积分**：将空间点作为节点，边特征为 \((x,y,a(x),a(y))\)，用邻域聚合近似积分算子
- **连续半径构图**：节点连接由物理空间球 \(B(x,r)\) 决定，而不是固定 kNN，因此网格细化时邻域随物理半径自然扩展
- **Nyström 近似**：训练时重复采样 \(m\ll K\) 个节点形成子图，将大图核积分近似为随机子图上的 Monte Carlo/Nyström 估计
- **支持非结构化网格**：点云、有限元网格、随机采样点都可作为图节点，查询新位置时可把新点加入图并连边
- **实验场景**：重点验证二阶椭圆 PDE/Darcy 型问题的跨分辨率泛化、半监督采样和与 FCN、PCA+NN、RBM 等方法的比较

#### 🔬 深入细节

##### 核心图示与来源说明

![GNO 低分辨率训练到高分辨率评估示意图](https://ar5iv.labs.arxiv.org/html/2003.03485/assets/Figs/uai_16to241.png)
*图：Graph Kernel Network 在 \(16\times16\) 网格训练，并在 \(241\times241\) 网格上评估椭圆 PDE 解。该图来自 ar5iv 对 arXiv:2003.03485 源文件 `Figs/uai_16to241.png` 的公开渲染。*

##### 算法伪代码

```python
# Graph Neural Operator / Graph Kernel Network 伪代码
def build_graph(points, a_values, radius):
    edges = []
    for i, x in enumerate(points):
        for j, y in enumerate(points):
            if distance(x, y) <= radius:
                edge_feature = concat(x, y, a_values[i], a_values[j])
                edges.append((i, j, edge_feature))
    return edges

def gno_forward(points, a_values, a_smooth, grad_a_smooth, edges):
    # 初始特征包含坐标、系数、平滑系数及其梯度
    v = P(concat(points, a_values, a_smooth, grad_a_smooth)) + p

    for t in range(T):
        messages = zeros_like(v)
        degree = zeros(num_nodes)

        for i, j, e_ij in edges:
            K_ij = kernel_mlp_phi(e_ij)              # R^{2(d+1)} -> R^{n x n}
            messages[i] += K_ij @ v[j]
            degree[i] += 1

        messages = messages / clamp(degree, min=1)
        v = relu(W @ v + messages)

    u_pred = Q(v) + q                                # 投影回标量/向量解
    return u_pred

for a, u in training_pairs:
    for repeat in range(l):                          # Nyström 重采样
        sub_points = sample_nodes(points, m)
        sub_graph = build_graph(sub_points, a[sub_points], radius=r)
        pred = gno_forward(sub_points, a[sub_points], ..., sub_graph)
        loss = mse(normalize(pred), normalize(u[sub_points]))
        loss.backward()
        optimizer.step()
```

##### 动机与背景

标准 CNN surrogate 需要固定网格，输入和输出维度随分辨率改变而改变；PINN/Neural-FEM 虽然网格无关，但通常为每个新的 PDE 参数实例重新优化一个网络。GNO 试图在两者之间取一个函数空间视角：模型参数 \(\theta\) 定义在连续域上的积分核中，离散网格只是数值近似这个积分核的采样方式。

论文以参数化椭圆 PDE 为典型问题：

$$
-\nabla\cdot(a(x)\nabla u(x))=f(x),\quad x\in D,\qquad u(x)=0,\quad x\in\partial D.
$$

对固定 \(a\)，如果存在 Green's function \(G_a(x,y)\)，解可写作：

$$
u(x)=\int_D G_a(x,y)f(y)\,dy.
$$

GNO 的核心思想是用可学习核 \(\kappa_{\phi}(x,y,a(x),a(y))\) 替代未知的 Green's function/积分核，并通过图上的消息传递来近似积分。

##### 核心机制：从积分核到消息传递

连续形式的图核网络更新为：

$$
v_{t+1}(x)=\sigma\left(Wv_t(x)+
\int_{B(x,r)}\kappa_{\phi}(x,y,a(x),a(y))v_t(y)\,dy\right).
$$

其中 \(v_t(x)\in\mathbb{R}^n\) 是第 \(t\) 层隐藏函数，\(W\) 是点态线性变换，\(\kappa_{\phi}\) 是一个 MLP 输出的 \(n\times n\) 矩阵。积分域限制在 \(B(x,r)\) 有两个目的：降低计算量，并利用椭圆算子 Green's function 的影响随距离衰减这一先验。

离散到图 \(G=(V,E)\) 后，上式成为平均聚合消息传递：

$$
v_{t+1}(x_i)=\sigma\left(
Wv_t(x_i)+\frac{1}{|N(x_i)|}\sum_{x_j\in N(x_i)}
\kappa_{\phi}(e_{ij})v_t(x_j)
\right),
$$

$$
e_{ij}=(x_i,x_j,a(x_i),a(x_j)).
$$

> 💡 关键：边是按连续物理半径 \(r\) 定义的。网格越细，球 \(B(x,r)\) 内节点越多，但半径本身不变，因此模型学习的是物理域上的核，而不是某个固定像素邻域。

##### 初始化、训练与 Nyström 采样

实际模型先把输入节点特征 lift 到隐藏通道：

$$
v_0(x)=P(x,a(x),a_{\epsilon}(x),\nabla a_{\epsilon}(x))+p,
$$

其中 \(a_{\epsilon}\) 是高斯平滑后的系数，\(\nabla a_{\epsilon}\) 帮助网络捕获材料界面、系数跳变等局部结构。经过 \(T\) 次消息传递后，输出层为：

$$
u_{\theta}(x)=Qv_T(x)+q.
$$

直接在 \(K\) 个节点上使用半径图仍可能产生接近 \(O(K^2)\) 的边数。论文因此使用随机 Nyström 近似：每个训练样本重复 \(l\) 次，每次采样 \(m\) 个节点形成子图，用这些子图近似完整核积分。训练复杂度变为约 \(O(lm^2)\)，论文报告 \(l=4, m=200\) 在 \(421^2\) 级别网格上已可工作。测试时若需要整张网格，可将目标网格分块成子图并分别评估。

##### 与 FNO、CNN 和传统降阶方法的区别

| 方法 | 表示对象 | 网格适应性 | 非局部建模 | 主要代价 |
|------|----------|------------|------------|----------|
| FCN/CNN | 固定数组映射 | 弱，常需固定分辨率 | 依赖多层局部卷积 | 跨网格泛化弱 |
| RBM/PCA+NN | 低维基/潜空间 | 对同一离散网格效果好 | 基函数全局 | 通常需要固定训练网格或 PDE 知识 |
| GNO | 连续积分核的图近似 | 强，可用非结构化节点 | 消息传递近似核积分 | 边数和采样策略敏感 |
| FNO | 傅里叶域卷积核 | 规则网格上强 | FFT 全局卷积 | 标准 FFT 不适合任意网格 |

GNO 是 FNO 的重要前身：它证明了“同一组参数在不同离散化之间共享”的神经算子路线可行，并自然支持非结构化网格；但它的全局/半全局核需要图边来承载，计算和存储随边数增长较快。FNO 后续用 FFT 替代图消息传递，在规则网格上显著提高效率；Geo-FNO 又把 FNO 通过几何变形扩展到一般几何。

#### 🧪 练习题

```yaml
question: "GNO 中按物理半径 B(x,r) 构图，而不是固定每个节点的 k 个最近邻，主要是为了什么？"
options:
  - "让邻域定义与连续物理域一致，从而在网格细化时保持同一个积分核解释"
  - "保证每个节点的度完全相同，便于使用批归一化"
  - "避免使用节点坐标，只依赖 PDE 系数 a(x)"
  - "把图消息传递退化成标准 3x3 卷积"
answer: 0
explain: "GNO 要近似连续积分算子，半径 r 定义在物理空间中，网格变细时邻域节点数自然增加但物理支持域不变，因此有利于跨分辨率泛化。"
```
