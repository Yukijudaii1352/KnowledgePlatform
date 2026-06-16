### GemNet: 几何消息传递网络

```yaml
id: gemnet
name: GemNet
full_name: 几何消息传递网络 (GemNet)
year: '2021'
org: TU Munich
paper_url: https://arxiv.org/abs/2106.08903
category: representation
parent: dimenet
motivation: 引入二面角和两步消息传递，成为3D图通用近似器
```

#### 📝 一句话总结

GemNet 从球面表示的通用近似理论出发，将其离散化为有向边嵌入上的两跳几何消息传递，把距离、键角和二面角统一纳入分子 GNN。相比 DimeNet 只显式使用三体角度，GemNet 进一步引入四元组交互、对称消息传递和高效双线性层，在 COLL、MD17 和 OC20 等分子动力学任务上显著降低力预测误差。

#### 🎯 核心要点

- **理论出发点**：证明球面表示足以近似对平移不变、对旋转/置换等变或不变的分子函数，再将球面方向离散为邻居原子方向
- **有向边嵌入**：用 \(\mathbf{m}_{ca}\) 表示“从原子 \(a\) 朝向原子 \(c\)”的方向嵌入，而不是只维护节点嵌入
- **两跳几何消息传递**：更新 \(\mathbf{m}_{ca}\) 时聚合 \(\mathbf{m}_{db}\)，路径 \(d \to b \to a \to c\) 形成四元组 \((c,a,b,d)\)
- **完整几何信息**：RBF 表示距离 \(x_{db}\)，CBF 表示距离-角度 \((x_{ba},\varphi_{abd})\)，SBF 表示距离-角度-二面角 \((x_{ca},\varphi_{cab},\theta_{cabd})\)
- **GemNet-Q / GemNet-T**：GemNet-Q 使用昂贵但表达力更强的四元组两跳消息传递；GemNet-T 去除两跳四元组交互，只保留较便宜的一跳几何交互
- **方差稳定缩放**：用固定 scaling factors 稳定跳连、SiLU、聚合和双线性层的激活方差，避免 batch/layer normalization 对分子回归的不利影响
- **力预测两种路线**：默认由 \(\mathbf{F}_a=-\partial E/\partial \mathbf{x}_a\) 保证守恒力场，也提出直接力预测变体以换取训练和推理速度

#### 🔬 深入细节

##### 核心架构示意

![GemNet NeurIPS 官方 Poster](https://neurips.cc/media/PosterPDFs/NeurIPS%202021/35cf8659cfcb13224cbd47863a34fc58_E70pQCX.png?t=1638466681.9316065)
*图：NeurIPS 2021 官方 poster，包含 GemNet 的理论路线、几何消息传递、架构块和实验结果。论文源码中的 `figures/architecture_main.tex` 也给出同一架构细节；arXiv 未提供稳定的 HTML 图片直链，因此这里使用 NeurIPS 官方 poster 图源。*

```
原子序数 z, 坐标 X
   │
   ├─ 计算邻居方向与几何基:
   │   RBF(x_db), CBF(x_ba, phi_abd), SBF(x_ca, phi_cab, theta_cabd)
   │
   ├─ Embedding: 初始化原子嵌入 h_a 与有向边嵌入 m_ca
   │
   ├─ ×L Interaction Blocks
   │     ├─ Q-MP: 四元组两跳消息 m_db -> m_ca
   │     ├─ T-MP: 三元组/一跳角度消息
   │     ├─ Atom self-interaction: 聚合边嵌入更新 h_a
   │     └─ Residual + variance scaling
   │
   └─ 输出能量 E；力 F = -grad_X E 或直接方向力头
```

##### 算法伪代码

```python
# GemNet-Q 单个前向传播的核心逻辑
def gemnet_forward(atom_numbers, positions, cutoff_emb, cutoff_int, n_blocks):
    # 1. 构建嵌入图和交互图
    emb_edges = [(c, a) for c != a if dist(c, a) < cutoff_emb]
    int_edges = [(b, a) for b != a if dist(b, a) < cutoff_int]

    # 2. 初始化原子与有向边嵌入
    h_a = atom_embedding(atom_numbers)
    m_ca = edge_embedding(atom_numbers, emb_edges, positions)

    # 3. 预计算几何基函数
    rbf = RBF(dist(d, b))                         # 二体距离
    cbf = CBF(dist(b, a), angle(a, b, d))         # 三体角度
    sbf = SBF(dist(c, a), angle(c, a, b),
              dihedral(c, a, b, d))              # 四体二面角

    for l in range(n_blocks):
        # Q-MP: 两跳几何消息传递，四元组 c-a-b-d
        delta_m = zeros_like(m_ca)
        for c, a in emb_edges:
            for b in neighbors_int(a):
                for d in neighbors_emb(b):
                    if all_distinct(c, a, b, d):
                        filt = bilinear(sbf[c,a,b,d], cbf[b,a,d], rbf[d,b])
                        delta_m[c,a] += filt @ m_ca[d,b]

        # T-MP: 较便宜的一跳几何消息，类似 DimeNet 的角度交互
        delta_m += triplet_message_passing(m_ca, cbf, rbf)

        # 原子自交互：边 -> 原子 -> 边
        h_a = h_a + atom_update(aggregate_edges_to_atoms(m_ca))
        m_ca = scaled_residual(m_ca, delta_m, h_a)

    energy = sum(readout_atom_energy(h_a, m_ca))
    forces = -grad(energy, positions)
    return energy, forces
```

##### 从球面通用近似到边消息传递

GemNet 的理论起点不是简单“再加一个角度特征”，而是先考虑每个原子上的球面函数表示。对于原子 \(a\)，如果方向 \(\hat{\mathbf{r}}\in S^2\) 上维护一个表示 \(H_a(\hat{\mathbf{r}})\)，那么全局旋转只会旋转球面函数的方向坐标，不会破坏相对几何。论文证明，基于球面表示的网络可以近似分子中需要的平移不变、旋转和置换等变函数。

实际计算不可能在连续球面上积分，因此 GemNet 把球面方向采样为邻居原子方向。于是 \(H_a(\hat{\mathbf{x}}_{ca})\) 就变成有向边嵌入 \(\mathbf{m}_{ca}\)：它不是普通的“边 \(c,a\) 特征”，而是原子 \(a\) 在朝向 \(c\) 的方向上的局部表示。

##### 核心机制：两跳几何消息传递

GemNet 更新 \(\mathbf{m}_{ca}\) 时，考虑另一个方向嵌入 \(\mathbf{m}_{db}\) 如何通过交互边 \(b \to a\) 影响它。四个原子 \(c,a,b,d\) 共同定义了距离、两个角度和一个二面角：

$$
\tilde{\mathbf{m}}_{ca}
= \sum_{\substack{b\in\mathcal{N}^{\text{int}}_a\setminus\{c\}\\
d\in\mathcal{N}^{\text{emb}}_b\setminus\{a,c\}}}
\mathcal{F}(x_{db},x_{ba},x_{ca},\varphi_{abd},\varphi_{cab},\theta_{cabd})
\;\mathbf{m}_{db}
$$

论文中将 \(\mathcal{F}\) 拆成三类基函数，再用线性/双线性层组合：

$$
\tilde{e}_{\text{RBF},n}(x_{db})
= \sqrt{\frac{2}{c_{\text{emb}}}}
\frac{\sin(\frac{n\pi}{c_{\text{emb}}}x_{db})}{x_{db}}
$$

$$
\tilde{e}_{\text{CBF},ln}(x_{ba},\varphi_{abd})
=
\sqrt{\frac{2}{c_{\text{int}}^3j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c_{\text{int}}}x_{ba}\right)Y_{l0}(\varphi_{abd})
$$

$$
\tilde{e}_{\text{SBF},lmn}(x_{ca},\varphi_{cab},\theta_{cabd})
=
\sqrt{\frac{2}{c_{\text{emb}}^3j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c_{\text{emb}}}x_{ca}\right)Y_{lm}(\varphi_{cab},\theta_{cabd})
$$

> 💡 关键：DimeNet 的方向消息传递主要使用距离和键角；GemNet 的 Q-MP 通过四元组引入二面角，使模型能区分更复杂的非平面构象和分子动力学状态。

##### Q-MP、T-MP 与复杂度权衡

四元组两跳消息传递的复杂度约为：

$$
\mathcal{O}(n k_{\text{int}} k_{\text{emb}}^2)
$$

其中 \(k_{\text{int}}\) 是交互邻居数，\(k_{\text{emb}}\) 是方向嵌入邻居数。这比 DimeNet 式三元组消息更贵，因此论文同时提出两类模型：GemNet-Q 保留 Q-MP，表达力更强；GemNet-T 删除两跳四元组交互，只保留 T-MP、原子自交互等较便宜模块，复杂度约为 \(\mathcal{O}(n k_{\text{emb}}^2)\)。

实验现象也符合这个设计：在单个分子构象变化相对简单的 MD17 上，GemNet-T 可接近 GemNet-Q；在 COLL 这种覆盖更多碰撞和非平面动态的任务上，GemNet-Q 的两跳消息优势更明显。这说明二面角和两跳路径不是“免费提升”，而是在几何复杂度足够高时更有价值。

##### 方差缩放与力预测

分子势能模型通常不适合直接套用 batch normalization：一个 batch 里不同分子/原子之间的统计相关会干扰物理回归；layer normalization 又会抹平不同距离尺度下本该存在的交互强弱差异。GemNet 因此采用固定缩放因子稳定激活方差，例如跳连：

$$
y = \frac{x + f(x)}{\sqrt{2}}
$$

SiLU 非线性、聚合和双线性层也使用预估 scaling factors，让初始化时各层方差大体稳定。

力预测方面，默认路线仍然是能量梯度：

$$
\mathbf{F}_a = -\frac{\partial E}{\partial \mathbf{x}_a}
$$

它保证保守力场，适合分子动力学稳定模拟。论文也利用等变向量分解提出直接力预测：为每条方向嵌入预测一个标量强度，再沿对应方向求和：

$$
\hat{\mathbf{F}}_a
= \sum_{c\neq a} s_{ca}\,\frac{\mathbf{x}_c-\mathbf{x}_a}{\|\mathbf{x}_c-\mathbf{x}_a\|_2}
$$

直接预测更快，但在小分子动力学数据上通常牺牲精度；在更大规模 OC20 任务上，直接力变体的速度和优化优势更明显。

#### 🧪 练习题

```yaml
question: "GemNet-Q 相比 DimeNet 的关键几何增强是什么？"
options:
  - "完全去掉坐标，只使用 2D 分子图拓扑"
  - "使用四元组两跳消息传递，引入二面角信息更新有向边嵌入"
  - "把所有原子坐标投影到固定 3D 体素网格"
  - "只扩大模型层数，不改变几何特征"
answer: 1
explain: "GemNet-Q 通过 c-a-b-d 四元组在有向边嵌入之间做两跳消息传递，显式利用距离、角度和二面角，因此比只用三体角度的 DimeNet 表达力更强。"
```
