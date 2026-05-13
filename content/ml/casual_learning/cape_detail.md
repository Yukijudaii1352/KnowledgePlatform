### CAPE — 因果感知位置编码 (Causality-Aware Positional Encoding)

```yaml
id: cape
name: CAPE
full_name: "因果感知位置编码 (Causality-Aware Positional Encoding)"
year: "2024"
org: "NeurIPS 2024"
paper_url: "https://arxiv.org/abs/2410.16197"
category: "causal_learning"
parent: "—"
motivation: "为非序列因果特征设计位置编码，通过因果结构学习与双曲嵌入生成旋转位置编码，使Transformer能感知特征间的因果关系"
```

#### 📝 一句话总结

CAPE 提出了一种三步式因果感知位置编码框架：先从观测数据中学习因果DAG结构，再将因果关系嵌入双曲空间以编码因果强度与特异性，最后转换为旋转位置编码注入Transformer注意力机制，解决了非序列因果特征缺乏有效位置编码的问题。

#### 🎯 核心要点

- **三步框架**：Step I 因果结构学习（DAG发现）→ Step II 双曲空间嵌入（Poincaré球）→ Step III 旋转位置编码（RoPE形式）
- **因果结构学习**：基于NOTEARS的连续优化方法，通过DAG约束 \(h(\mathbf{A}) = \text{tr}(e^{\mathbf{A} \circ \mathbf{A}}) - M = 0\) 从数据中发现因果图
- **双曲嵌入的两个关键性质**：因果强度（causal strength）∝ 双曲距离的倒数；因果特异性（causal specificity）∝ 到原点的距离
- **对比学习 + PageRank正则化**：在双曲流形上通过RSGD优化，拉近因果相关节点、推远无关节点，同时用PageRank约束通用性节点靠近原点
- **旋转编码注入**：将Poincaré球嵌入转化为旋转矩阵形式，兼容线性自注意力
- **理论保证**：证明了因果距离衰减注意力、因果通用性衰减注意力、以及对位置扰动的鲁棒性三大性质
- **多组学验证**：在转录组学（scRNA-seq）、表观基因组学、蛋白质组学数据上验证，基因扰动预测MSE平均降低11.1%

#### 🔬 深入细节

![CAPE 框架总览](https://arxiv.org/abs/2410.16197)
*图：CAPE 三步框架示意 — (a) 从观测数据学习因果DAG；(b) 在双曲空间中嵌入因果结构；(c) 转换为旋转位置编码注入Transformer。（来源：论文 Figure 1）*

##### 算法伪代码

```python
# CAPE 核心流程伪代码
# === Step I: 因果结构学习 ===
# 输入: 观测数据 X ∈ R^{N×M}, 特征集 V = {v1,...,vM}
A = initialize_adjacency(M)  # 邻接矩阵
for iteration in range(max_iter):
    # 最小化结构方程残差 + DAG约束
    loss_structure = sum(||x_j - f_j(x_pa(j))||^2 for j in V)
    loss_dag = tr(exp(A ⊙ A)) - M  # NOTEARS DAG约束 h(A)=0
    loss = loss_structure + lambda_dag * loss_dag + lambda_sparse * ||A||_1
    A = augmented_lagrangian_step(A, loss)

# === Step II: 双曲空间嵌入 ===
# 在 Hyperboloid H^d 上优化位置编码
P = initialize_on_hyperboloid(M, d)  # {p_v1,...,p_vM} ∈ H^d
for iteration in range(max_iter):
    # 对比学习: 拉近因果相关对, 推远无关对
    L_con = contrastive_loss(P, A, k_hop=2)
    # PageRank正则: 通用节点靠近原点
    pi = compute_pagerank(A)
    L_reg = sum(pi[j] * d_hyperbolic(P[j], origin) for j in V)
    L_H = L_con + lambda_g * L_reg
    # Riemannian SGD 更新
    P = rsgd_update(P, L_H, learning_rate=eta)

# 映射到 Poincaré 球: H^d → B^d
E = diffeomorphism_to_poincare(P)  # {e_v1,...,e_vM} ∈ B^d

# === Step III: 旋转位置编码 ===
# 将 Poincaré 球嵌入转为旋转矩阵
for each feature pair (vm, vn):
    R_q = rotation_matrix(e_vm)  # 查询旋转
    R_k = rotation_matrix(e_vn)  # 键旋转
    q_vm = R_q @ W_q @ embedding(vm)
    k_vn = R_k @ W_k @ embedding(vn)
    attention(vm, vn) = softmax(q_vm^T @ k_vn / sqrt(d))
```

##### 动机与背景

传统Transformer的位置编码（如正弦编码、RoPE）假设输入token具有天然的序列顺序（如文本中的词序、图像中的像素位置）。然而，在许多科学和医学领域（如基因组学、蛋白质组学），特征（如基因、蛋白质）之间**没有固有的序列顺序**，但存在复杂的**因果关系**。例如，转录因子调控下游基因表达，形成有向无环图（DAG）结构。

现有方法要么忽略位置编码（丢失结构信息），要么使用随机/可训练的位置编码（无法捕获因果语义），导致Transformer在这类数据上的表现受限。CAPE的核心洞察是：**因果关系本身就是一种"位置"信息**——它定义了特征之间的相对关系和层次结构。

##### 核心机制详解

**Step I：因果结构学习（Causal Structure Learning）**

CAPE采用基于NOTEARS框架的连续优化方法从观测数据中发现因果DAG。核心思想是将离散的DAG搜索问题转化为连续优化问题：

$$\min_{\mathbf{A}} \sum_{j=1}^{M} \mathcal{L}(v_j, \mathbf{A}_{\cdot j}) + \lambda_s \|\mathbf{A}\|_1 \quad \text{s.t.} \quad h(\mathbf{A}) = 0$$

其中DAG约束 \(h(\mathbf{A}) = \text{tr}(e^{\mathbf{A} \circ \mathbf{A}}) - M\) 确保学到的图无环。结构方程模型 \(v_j = f_j(\mathbf{A}_{\cdot j} \circ \mathbf{v}_{\setminus j}) + \epsilon_j\) 允许非线性因果关系，\(f_j\) 由MLP参数化。通过增广拉格朗日方法求解此约束优化问题。

> 💡 关键：DAG约束的巧妙之处在于 \(\text{tr}(e^{\mathbf{A} \circ \mathbf{A}}) = \sum_{k=0}^{\infty} \text{tr}((\mathbf{A} \circ \mathbf{A})^k)/k!\)，当且仅当图无环时等于 \(M\)（因为无环图的邻接矩阵幂次迹为零）。

**Step II：双曲空间嵌入**

学到因果DAG后，CAPE将其嵌入双曲空间（具体为Hyperboloid模型 \(\mathbb{H}^d\)）。选择双曲空间的原因是：

1. **树状结构的天然表示**：双曲空间可视为离散树的连续类比，DAG的层次结构自然适配
2. **指数增长的容量**：双曲空间的体积随半径指数增长，能高效表示宽泛的层次关系

嵌入需满足两个关键性质：

- **因果强度**：\(\sigma(v_m, v_n) \propto 1/d_l(p_{v_m}, p_{v_n})\) — 因果关系越强的特征对，双曲距离越近
- **因果特异性**：\(\ell(v_m) \propto d_l(p_{v_m}, p_o)\) — 越特异（影响范围小）的特征离原点越远

通过对比学习损失 \(\mathcal{L}_{\text{con}}\) 实现因果强度编码，通过PageRank正则化 \(\Omega\) 实现因果特异性编码：

$$\mathcal{L}_H = \frac{1}{M}\sum_{j=1}^{M} \mathcal{L}_{\text{con}}(p_{v_j}) + \lambda_g \Omega(p_{v_j})$$

其中 \(\Omega(p_{v_m}) = \pi_{v_m} \cdot d_l(p_{v_m}, p_o)\)，\(\pi_{v_m}\) 是PageRank值（因果通用性越高的节点PageRank越大），迫使通用节点靠近原点。

> ⚠️ 注意：优化在黎曼流形上进行（RSGD），需要将欧几里得梯度转换为黎曼梯度，再通过指数映射投影回流形。

**Step III：旋转位置编码**

优化后的Hyperboloid嵌入通过微分同胚映射到Poincaré球 \(\mathbb{B}^d\)，然后转换为旋转形式。对于查询和键：

$$q^i_{v_m} = I_q(v^i_m, e_{v_m}), \quad k^i_{v_n} = I_k(v^i_n, e_{v_n})$$

注入函数 \(I_q, I_k\) 将Poincaré球坐标转化为旋转角度，使得注意力分数的内积自然编码了位置差异：

$$\langle q^i_{v_m}, k^i_{v_n} \rangle = \mathcal{A}(v^i_m, v^i_n, \gamma(e_{v_m}, e_{v_n}))$$

其中 \(\gamma(e_{v_m}, e_{v_n})\) 是由两个位置编码的差异决定的旋转角度函数。

##### 理论性质

论文证明了三个重要理论保证：

1. **因果距离衰减**（Prop. 4.1）：注意力分数 \(\mathcal{A}\) 被上下界 \(\mathcal{A}^+, \mathcal{A}^-\) 约束，随因果距离 \(d_p(e_{v_m}, e_{v_n}) \to +\infty\) 两界收敛，注意力变化范围缩小
2. **因果通用性衰减**（Prop. 4.2）：因果通用性 \(\psi_{v_m} \to 1\) 时，上界单调递减、下界单调递增，注意力趋于均匀分布
3. **鲁棒性**（Prop. 4.3）：对位置编码的高斯扰动，注意力分数保持可区分性、无偏性和渐近收敛性

##### 与传统方法的区别

| 方法 | 适用场景 | 编码内容 | 因果感知 |
|------|---------|---------|---------|
| 正弦位置编码 | 序列数据 | 绝对位置 | ❌ |
| RoPE | 序列数据 | 相对位置 | ❌ |
| 可训练相对编码 | 非序列数据 | 学习到的相对关系 | ❌ |
| **CAPE** | **非序列因果数据** | **因果强度+特异性** | **✅** |

CAPE的独特优势在于：(1) 不依赖预定义的特征顺序；(2) 编码了因果语义而非任意位置；(3) 旋转形式兼容线性注意力；(4) 具有理论保证的注意力行为。

#### 🧪 练习题

```yaml
question: "CAPE 在双曲空间嵌入中，PageRank正则化项的主要作用是什么？"
options:
  - "加速对比学习的收敛速度"
  - "确保因果通用性高的节点（如根节点）嵌入靠近原点，编码因果特异性"
  - "防止所有节点嵌入坍缩到同一点"
  - "约束嵌入向量的范数不超过1"
answer: 1
explain: "PageRank值大的节点（出度多、因果影响广泛的通用节点）被正则化项更强地惩罚其到原点的距离，迫使它们靠近原点，从而编码因果特异性——通用节点近原点，特异节点远离原点。"
```