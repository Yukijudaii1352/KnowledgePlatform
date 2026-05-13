### TopoNTK — 拓扑神经切线核

```yaml
id: topo_ntk
name: TopoNTK
full_name: "拓扑神经切线核 (Topological Neural Tangent Kernel)"
year: "2025"
org: "UC Santa Barbara"
paper_url: "https://arxiv.org/abs/2605.01110"
category: "kernel_method"
parent: "NTK / Graph NTK"
motivation: "将NTK从图扩展到单纯复形，通过Hodge消息传递捕获高阶拓扑结构（三角形、环路），实现对边信号的谱分析与可解释学习"
```

#### 📝 一句话总结

TopoNTK 将无限宽度神经切线核从图推广到单纯复形，通过 Hodge 消息传递算子（融合下/上 Hodge Laplacian）在边特征上递归构建核矩阵，从而捕获三角形等高阶拓扑结构，并提供基于 Hodge 分解的谱学习动力学分析。

#### 🎯 核心要点

- **核心架构**：在边（1-单纯形）上定义 Hodge 消息传递网络，传播算子 \(P = \gamma I + \alpha L_\downarrow + \beta L_\uparrow\) 融合残差、共享顶点（下邻接）和填充三角形（上邻接）三个通道
- **NTK 递归**：协方差 \(\Sigma^{(\ell+1)} = P_X \Phi(\Sigma^{(\ell)}) P_Y^\top\)，切线核 \(\Theta^{(\ell+1)} = \Theta^{(\ell)} \odot \dot\Phi(\Sigma^{(\ell)}) + \Sigma^{(\ell+1)}\) 逐层累积
- **表达力分离**（Proposition 1）：TopoNTK 对三角形填充敏感，而图 NTK 在固定 1-骨架上不变——高阶结构带来严格表达力增益
- **Hodge 保持性**（Proposition 2）：传播算子保持 Hodge 分解 \(C_1 = \mathcal{E} \oplus \mathcal{H} \oplus \mathcal{C}\)（精确/调和/余精确），\(L_\uparrow\) 仅作用于余精确分量，\(L_\downarrow\) 仅作用于精确分量
- **谱学习动力学**（Theorem 1）：核梯度流下各本征模独立学习，速率由对应核特征值 \(\kappa_j\) 决定
- **稳定性**（Theorem 2）：固定 1-骨架下三角形扰动引起的核变化 Lipschitz 连续，预测误差以 \(O(\|L_\uparrow - L'_\uparrow\| / \lambda)\) 缩放
- **实验验证**：合成任务（三角形检测、Hodge 分量恢复、谱偏差、稳定性）+ DBLP 高阶链接预测

#### 🔬 深入细节

##### 示意图

![TopoNTK 框架总览](https://arxiv.org/html/2605.01110v1/x1.png)
*图：TopoNTK 框架。左：单纯复形上的边信号与 Hodge Laplacian；中：Hodge 消息传递层结构；右：NTK 递归与谱分析。*

##### 算法伪代码

```python
# TopoNTK 核矩阵计算伪代码
def compute_topo_ntk(X, Y, L, gamma, alpha, beta):
    """
    X, Y: 两个单纯复形
    L: 网络深度
    gamma, alpha, beta: Hodge 传播参数
    """
    # 构建传播算子
    P_X = gamma * I + alpha * L_down(X) + beta * L_up(X)
    P_Y = gamma * I + alpha * L_down(Y) + beta * L_up(Y)
    
    # 初始化：边特征协方差
    Sigma = sigma_w^2 * P_X @ P_Y.T + sigma_b^2  # Σ^(0)
    Theta = Sigma.copy()  # Θ^(0)
    
    for ell in range(1, L+1):
        # 激活函数协方差映射 (ReLU arc-cosine kernel)
        Phi_Sigma = activation_covariance(Sigma)      # Φ(Σ^(ℓ-1))
        Phi_dot_Sigma = activation_derivative_cov(Sigma)  # Φ̇(Σ^(ℓ-1))
        
        # 协方差递归
        Sigma_new = sigma_w^2 * P_X @ Phi_Sigma @ P_Y.T + sigma_b^2
        
        # 切线核递归
        Theta = Theta * Phi_dot_Sigma + Sigma_new
        
        # 传播
        Theta = P_X @ Theta @ P_Y.T
        Sigma = Sigma_new
    
    return Theta  # 最终 TopoNTK 矩阵 K(X, Y)
```

##### 方法详解

**1. 动机与背景**

传统图神经网络（GNN）及其对应的 Graph NTK 仅建模节点间的成对关系，无法捕获高阶拓扑结构。例如，三个人两两合作（三角形）与三个人仅两两认识（开放三元组）在图上不可区分，但在社交网络、协作网络中具有本质不同的语义。单纯复形（Simplicial Complex）通过 \(k\)-单纯形显式编码这种高阶关系，而 Hodge Laplacian 提供了在这些结构上进行信号处理的数学工具。

> 💡 关键：TopoNTK 的核心洞察是——将 NTK 的无限宽度分析从图扩展到单纯复形，可以获得一个**封闭形式的、可解释的核**，它同时具备高阶拓扑感知能力和 NTK 的理论优势（确定性、谱可分析性）。

**2. 单纯复形与 Hodge Laplacian**

给定一个单纯复形 \(X\)，其 1-阶 Hodge Laplacian 定义为：

$$L_1 = L_\downarrow + L_\uparrow = B_1^\top B_1 + B_2 B_2^\top$$

其中 \(B_1\) 是节点-边关联矩阵（\(|V| \times |E|\)），\(B_2\) 是边-三角形关联矩阵（\(|E| \times |T|\)）。

- **下 Laplacian** \(L_\downarrow = B_1^\top B_1\)：编码共享顶点的边之间的邻接关系
- **上 Laplacian** \(L_\uparrow = B_2 B_2^\top\)：编码共同参与三角形的边之间的邻接关系

Hodge 分解将边信号空间分解为三个正交子空间：

$$C_1(X) = \underbrace{\text{im}(B_1^\top)}_{\mathcal{E}\text{ (精确)}} \oplus \underbrace{\ker(L_1)}_{\mathcal{H}\text{ (调和)}} \oplus \underbrace{\text{im}(B_2)}_{\mathcal{C}\text{ (余精确)}}$$

> ⚠️ 注意：调和分量 \(\mathcal{H}\) 的维数等于第一 Betti 数 \(\beta_1\)，即单纯复形中独立环路的数量——这是纯粹的拓扑不变量。

**3. Hodge 消息传递与传播算子**

TopoNTK 的核心构建块是 Hodge 消息传递层。对于边特征 \(h \in \mathbb{R}^{|E|}\)，单层传播为：

$$h^{(\ell+1)} = \sigma\left(P \cdot h^{(\ell)} \cdot W^{(\ell)}\right), \quad P = \gamma I + \alpha L_\downarrow + \beta L_\uparrow$$

三个通道的物理含义：
- \(\gamma I\)（残差通道）：保留自身边特征，确保调和分量不被消除
- \(\alpha L_\downarrow\)（下通道）：聚合共享端点的邻居边信息
- \(\beta L_\uparrow\)（上通道）：聚合共同参与三角形的邻居边信息

**4. NTK 递归构建**

在无限宽度极限下，网络参数随机初始化后的核函数收敛到确定性 TopoNTK。对于两个单纯复形 \(X, Y\)，核递归为：

$$\Sigma^{(\ell+1)}(X, Y) = \sigma_w^2 \cdot P_X \cdot \Phi\left(\Sigma^{(\ell)}(X, Y)\right) \cdot P_Y^\top + \sigma_b^2$$

$$\Theta^{(\ell+1)}(X, Y) = P_X \left[\Theta^{(\ell)} \odot \dot\Phi\left(\Sigma^{(\ell)}\right)\right] P_Y^\top + \Sigma^{(\ell+1)}$$

其中 \(\Phi\) 是 ReLU 激活对应的 arc-cosine 核映射：

$$\Phi(\Sigma) = \frac{1}{2\pi}\left(\sqrt{\text{diag}(\Sigma)\text{diag}(\Sigma)^\top - \Sigma^2} + \Sigma \cdot (\pi - \arccos(\hat\Sigma))\right)$$

最终 TopoNTK 矩阵 \(K(X, Y) = \Theta^{(L)}(X, Y)\) 是一个 \(|E_X| \times |E_Y|\) 的矩阵。

**5. 关键理论性质**

*表达力分离*：考虑两个单纯复形 \(X, X'\) 具有相同的 1-骨架但不同的三角形集合。Graph NTK 对两者给出相同的核矩阵，但 TopoNTK 通过 \(L_\uparrow\) 的差异可以区分它们：

$$K_X \neq K_{X'} \quad \text{当且仅当} \quad L_\uparrow(X) \neq L_\uparrow(X')$$

*Hodge 保持性*：传播算子 \(P\) 保持 Hodge 分解的三个子空间不变。特别地：
- \(L_\uparrow\) 在精确子空间 \(\mathcal{E}\) 上为零
- \(L_\downarrow\) 在余精确子空间 \(\mathcal{C}\) 上为零
- 两者在调和子空间 \(\mathcal{H}\) 上均为零

这意味着下通道专门增强精确分量的学习，上通道专门增强余精确分量的学习。

*谱学习动力学*：在核梯度流下，目标信号 \(y\) 的各本征分量独立指数衰减：

$$f_t = \sum_j (1 - e^{-\kappa_j t}) \langle y, u_j \rangle u_j$$

大特征值 \(\kappa_j\) 对应的模式学习更快，形成谱偏差。实验发现调和模式通常对应较小特征值，意味着全局拓扑结构学习较慢。

**6. 与传统方法的对比**

| 方法 | 信号域 | 高阶感知 | 理论保证 | 可解释性 |
|------|--------|----------|----------|----------|
| Graph NTK | 节点 | ❌ | 收敛+泛化 | 谱分析 |
| GNN (finite) | 节点 | ❌ | 有限 | 有限 |
| MPSN/SNN | 边/面 | ✅ | 无 NTK 分析 | 有限 |
| **TopoNTK** | **边** | **✅** | **收敛+Hodge谱** | **Hodge分解** |

**7. 实验亮点**

- **三角形检测**：在固定 1-骨架上，仅改变三角形填充概率。TopoNTK（含上通道）完美区分，Graph NTK 完全失败
- **Hodge 分量恢复**：下通道 (\(\alpha > 0\)) 改善精确分量恢复，上通道 (\(\beta > 0\)) 改善余精确分量恢复，验证理论预测
- **DBLP 高阶链接预测**：预测三人合著关系（三角形闭合），TopoNTK 的 AUC 达 0.76，显著优于 Graph NTK (0.62) 和随机基线 (0.50)

#### 🧪 练习题

```yaml
question: "TopoNTK 相比 Graph NTK 的核心表达力优势来源于什么？"
options:
  - "使用了更深的网络层数"
  - "通过上 Hodge Laplacian L↑ 编码三角形（2-单纯形）填充信息"
  - "采用了更复杂的激活函数"
  - "在节点特征上使用了注意力机制"
answer: 1
explain: "TopoNTK 的传播算子包含 βL↑ 项，L↑ = B₂B₂ᵀ 编码了哪些边共同参与三角形。Graph NTK 仅有 L↓ 对应的边邻接信息，对固定 1-骨架上的三角形变化完全不敏感。"
```