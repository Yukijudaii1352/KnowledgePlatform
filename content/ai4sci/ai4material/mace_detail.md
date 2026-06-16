### MACE — 高阶等变消息传递 (Multi-Atomic Cluster Expansion)

```yaml
id: mace
name: MACE
full_name: 高阶等变消息传递 (Multi-Atomic Cluster Expansion)
year: '2022'
org: Cambridge
paper_url: https://proceedings.neurips.cc/paper/2022/hash/4a36c3c51af11ed9f34615b81edb5bbc-Abstract-Conference.html
category: mlip
parent: gemnet
motivation: 高阶等变消息实现近DFT精度
```

#### 📝 一句话总结

MACE 把 Atomic Cluster Expansion 的高体阶基函数与 E(3)/O(3) 等变消息传递结合起来，用高阶对称张量积一次性构造多体消息，解决传统二体 MPNN 需要堆很多层才能表达复杂原子环境的问题。

#### 🎯 核心要点

- **高体阶消息传递**：消息从二体扩展到 \((\nu+1)\)-body，四体消息通常只需约两层 message passing 即可达到高精度
- **ACE + MPNN 结合**：用 ACE 式多体完备基构造局域环境，同时保留神经网络消息传递的可学习性和灵活性
- **O(3) 等变特征**：内部特征按球谐阶数 \(L\) 变换，标量能量保持旋转不变，向量/张量信息在消息中保持等变
- **Clebsch-Gordan 张量积**：通过广义 Clebsch-Gordan 系数对 \(A\)-features 做张量积与对称化，避免显式枚举所有 triplets/quadruplets
- **系统可收敛表达**：提高 correlation order \(\nu\)、球谐阶数 \(L\) 和通道数可系统提升多体相互作用表达能力
- **能量-力联合训练**：readout 输出原子 site energy，总能量求和，力由 \(-\partial \hat{E}/\partial r\) 得到
- **训练和推理效率**：相比需要 4-6 层的等变 MPNN，MACE 用更少层数达到相近或更好精度，利于并行化
- **基准表现**：论文在 rMD17、3BPA、AcAc 等分子力场基准上达到或超过当时 SOTA，并展示更陡的学习曲线

#### 🔬 深入细节

![MACE 层数与误差对比图](https://ar5iv.labs.arxiv.org/html/2206.07697/assets/x1.png)
*图：MACE、NequIP、BOTNet 在 3BPA 数据集上的能量/力误差随 message passing 层数变化。论文主文没有单独给出架构框图；其架构由第 4 节公式与附录 tensor contraction algorithm 描述。公开图源来自 arXiv:2206.07697 的 ar5iv HTML。*

##### 算法伪代码

```python
# MACE force field forward pass 伪代码
graph = build_neighbor_graph(atoms, cutoff=r_max)
h = embed_species(atomic_numbers)  # scalar node features

for t in range(num_layers):
    # 1. construct equivariant two-body A-features from radial basis and spherical harmonics
    for atom_i in graph.nodes:
        A_i = 0
        for atom_j in neighbors(atom_i):
            r_ji, rhat_ji = relative_geometry(atom_j, atom_i)
            A_i += radial_mlp(r_ji) * spherical_harmonics(rhat_ji) * linear(h[atom_j])

        # 2. symmetrized tensor products build higher-order B-features
        B_i = []
        for nu in range(1, max_correlation_order + 1):
            B_i.append(clebsch_gordan_symmetrize(tensor_power(A_i, nu)))

        # 3. element-conditioned linear combination gives message
        m_i = sum(element_weight(Z_i, nu, L) @ B_i[nu] for nu in orders)

        # 4. residual equivariant update
        h_next[atom_i] = linear_message(m_i) + residual_by_species(Z_i, h[atom_i])
    h = h_next

# 5. invariant readout to site energies; forces are conservative gradients
E_atoms = [readout_invariant_scalar(h_i) for h_i in h]
E_total = sum(E_atoms)
forces = -grad(E_total, positions)
loss = lambda_E * mse(E_total, E_ref) + lambda_F * mse(forces, F_ref)
```

##### 从二体消息到高体阶消息

普通 MPNN 的一层消息大多依赖中心原子 \(i\) 和一个邻居 \(j\)，因此是二体交互。要表达更高体阶相互作用，传统做法要么堆更多层，让信息通过多跳传播间接组合；要么显式枚举角度、三元组甚至四元组，计算成本很高。MACE 的核心想法是直接把消息写成层级 body-order expansion：

$$
\mathbf{m}_i^{(t)}
= \sum_j \mathbf{u}_1(\sigma_i^{(t)};\sigma_j^{(t)})
+ \sum_{j_1,j_2}\mathbf{u}_2(\sigma_i^{(t)};\sigma_{j_1}^{(t)},\sigma_{j_2}^{(t)})
+ \cdots
+ \sum_{j_1,\ldots,j_\nu}
\mathbf{u}_\nu(\sigma_i^{(t)};\sigma_{j_1}^{(t)},\ldots,\sigma_{j_\nu}^{(t)})
$$

其中 \(\nu\) 是 maximum correlation order，消息的状态体阶为 \(\nu+1\)。论文特意允许 \(j_1=j_2\) 这样的 self-interaction，使求和可以转化为张量积结构，而不是显式枚举所有互异邻居组合。

##### A-features：等变二体基

每层先从邻居构造 \(A\)-features。它们通过径向基、球谐函数和上一层节点特征耦合得到：

$$
A_{i,k l_3 m_3}^{(t)}
=
\sum_{l_1m_1,l_2m_2}
C_{l_1m_1,l_2m_2}^{l_3m_3}
\sum_{j\in\mathcal{N}(i)}
R_{k l_1l_2l_3}^{(t)}(r_{ji})
Y_{l_1}^{m_1}(\hat{\mathbf{r}}_{ji})
\sum_{\tilde{k}}W_{k\tilde{k}l_2}^{(t)}
h_{j,\tilde{k}l_2m_2}^{(t)}
$$

这里 \(Y_l^m\) 携带方向信息，\(C\) 是 Clebsch-Gordan 系数，保证结果按正确的 \(O(3)\) 表示变换。第一层中 \(h_j\) 只是元素 embedding，因此公式可简化为：

$$
A_{i,k l_1m_1}^{(1)}
= \sum_{j\in\mathcal{N}(i)}
R_{k l_1}^{(1)}(r_{ji})
Y_{l_1}^{m_1}(\hat{\mathbf{r}}_{ji})
W_{kz_j}^{(1)}
$$

直觉上，\(A_i\) 是“带方向的邻居密度展开”：它已经聚合了所有邻居，但仍保留球谐阶数和通道维度，后续可以组合成多体项。

##### B-features：张量积与对称化

MACE 的关键操作是从 \(A\)-features 构造高阶 \(B\)-features：

$$
\mathbf{B}_{i,\eta_\nu kLM}^{(t)}
= \sum_{\mathbf{l}\mathbf{m}}
\mathcal{C}_{\eta_\nu,\mathbf{l}\mathbf{m}}^{LM}
\prod_{\xi=1}^{\nu}
\sum_{\tilde{k}}
w_{k\tilde{k}l_\xi}^{(t)}
A_{i,\tilde{k}l_\xi m_\xi}^{(t)}
$$

\(\mathcal{C}^{LM}_{\eta_\nu}\) 是广义 Clebsch-Gordan coupling coefficient，负责把多个球谐表示耦合成目标等变阶数 \(L\)。\(\eta_\nu\) 枚举能耦合到同一 \(L\) 的不同路径。由于这些 coupling 系数非常稀疏且可预计算，MACE 不需要显式遍历所有三元组/四元组，也能得到高体阶信息。

然后消息是这些多体基的线性组合：

$$
m_{i,kLM}^{(t)}
= \sum_\nu\sum_{\eta_\nu}
W_{z_i kL,\eta_\nu}^{(t)}
\mathbf{B}_{i,\eta_\nu kLM}^{(t)}
$$

其中权重依赖接收原子元素 \(z_i\) 和消息对称阶数 \(L\)。这使 MACE 同时具备元素条件化、等变性和高体阶表达。

##### 更新、读出与训练损失

MACE 的节点更新是线性 message update 加 species-dependent residual：

$$
h_{i,kLM}^{(t+1)}
= \sum_{\tilde{k}}W_{kL,\tilde{k}}^{(t)}m_{i,\tilde{k}LM}
+ \sum_{\tilde{k}}W_{z_i kL,\tilde{k}}^{(t)}h_{i,\tilde{k}LM}^{(t)}
$$

readout 只使用 \(L=0,M=0\) 的不变标量特征，保证 site energy 不随旋转改变：

$$
E_i = E_i^{(0)}+E_i^{(1)}+\cdots+E_i^{(T)}
$$

$$
E_i^{(t)} =
\begin{cases}
\sum_{\tilde{k}}W_{\text{readout},\tilde{k}}^{(t)}h_{i,\tilde{k}00}^{(t)}, & t<T \\
\mathrm{MLP}_{\text{readout}}^{(t)}(\{h_{i,k00}^{(t)}\}_k), & t=T
\end{cases}
$$

总能量为 \(\hat{E}=\sum_i E_i\)，力由能量梯度给出。论文训练损失为：

$$
\mathcal{L}
= \frac{\lambda_E}{B}\sum_b^B(\hat{E}_b-E_b)^2
+ \frac{\lambda_F}{3BN}\sum_{i=1}^{B\cdot N}\sum_{\alpha=1}^{3}
\left(-\frac{\partial\hat{E}}{\partial r_{i,\alpha}}-F_{i,\alpha}\right)^2
$$

其中 \(\lambda_E=1\)、\(\lambda_F=1000\)。大力权重的直觉是：分子动力学和结构弛豫直接依赖力，能量误差小但力场不准仍然不可用。

##### 与 GemNet/NequIP 的区别

GemNet、DimeNet 类模型通过角度和方向消息增强几何表达，但高阶关系仍常依赖显式角度组合或多层传播。NequIP 等等变 MPNN 通过等变特征提高数据效率，但二体消息往往需要更多层来逐步扩大表达体阶和感受野。MACE 把“提高体阶”和“增加层数”解耦：单层消息内部已经通过对称张量积构造多体项，因此两层模型就能覆盖很强的局域环境表达。

> 💡 关键：MACE 的高精度不只是因为使用等变性，而是因为它把高体阶多项式基直接嵌入消息构造；等变性负责正确的旋转/反射变换，多体张量积负责表达复杂局域相互作用。

#### 🧪 练习题

```yaml
question: "MACE 相比普通二体 MPNN 的核心结构优势是什么？"
options:
  - "用随机森林替代神经网络 readout"
  - "通过 Clebsch-Gordan 对称张量积直接构造高体阶等变消息，减少对堆叠多层的依赖"
  - "完全不使用原子间距离"
  - "只预测力而不预测能量"
answer: 1
explain: "MACE 先构造 A-features，再通过对称张量积得到高阶 B-features，使一层消息就包含多体环境信息，并保持 O(3) 等变性。"
```
