### DimeNet

```yaml
id: dimenet
name: DimeNet
full_name: 定向消息传递网络 (Directional Message Passing NN)
year: '2020'
org: TU Munich
paper_url: https://arxiv.org/abs/2003.03123
category: neural_operator
parent: schnet
motivation: 定向消息传递融入键角信息
```

#### 📝 一句话总结

DimeNet 提出把分子图中的边消息而非原子节点作为核心表示，并在消息更新中显式引入键长和键角，从而让 GNN 直接建模分子的方向性相互作用和角势能项。

#### 🎯 核心要点

- **消息嵌入替代节点嵌入**：为有向原子对 \(j \to i\) 建立消息 \(\mathbf{m}_{ji}\)，节点表示由入边消息求和得到
- **方向性消息传递**：更新 \(\mathbf{m}_{ji}\) 时聚合 \(k \to j\) 的邻接消息，并使用夹角 \(\alpha_{(kj,ji)}\) 调制交互
- **键长 + 键角联合表示**：用 2D spherical Fourier-Bessel basis 表示 \((d_{kj}, \alpha_{(kj,ji)})\)，而不是只使用 pairwise distance
- **物理启发的正交基**：用 spherical Bessel functions 和 spherical harmonics 替代常见 Gaussian RBF，减少径向基数量并提升参数效率
- **物理对称性**：预测对原子排列、平移、旋转和反演保持不变；由能量梯度得到的力满足旋转等变性
- **连续可微设计**：使用 Swish 激活和 envelope cutoff，使能量函数二阶连续可微，适合分子动力学中的力预测
- **结构模块清晰**：Embedding block 生成初始消息，多个 Interaction block 做定向传递，Output block 汇总每层原子贡献
- **基准性能**：在 QM9 与 MD17 上优于 SchNet 等距离型 GNN，论文报告在 MD17 平均提升 76%、QM9 平均提升 31%

#### 🔬 深入细节

##### 架构与来源

![DimeNet 官方架构图](https://raw.githubusercontent.com/gasteigerjo/dimenet/master/architecture.svg)
*图：DimeNet 官方实现仓库中的架构图，展示 Embedding、Interaction、Output 三类模块如何围绕有向消息工作。论文源包中的 Figure 4 为 TikZ 源文件 `figures/model.tex`，官方 raw SVG 更适合 Markdown 直接嵌入。*

![2D spherical Fourier-Bessel basis](https://ar5iv.labs.arxiv.org/html/2003.03123/assets/figures/sbf.png)
*图：论文源包中的 2D spherical Fourier-Bessel basis，用于联合编码距离 \(d\) 与角度 \(\alpha\)。*

传统分子 GNN 通常把原子作为节点，边特征主要是原子间距离 \(d_{ij}\)。这种做法天然满足平移和旋转不变性，但会丢失方向信息：两个局部邻域如果具有相同键长但角度排列不同，距离型消息传递很难直接区分。DimeNet 的核心判断是，分子势能不仅包含键长项，还包含角度项和扭转项；如果模型只看 pairwise distance，就需要通过多层间接组合才能学到角势能。

DimeNet 因此把表示对象从原子节点转为有向边消息。消息 \(\mathbf{m}_{ji}\) 表示从原子 \(j\) 指向原子 \(i\) 的方向性信息；当整个分子旋转时，这些方向随分子一起旋转，因此相对角度保持不变。模型最终只使用距离和夹角这类不变量参与计算，从而保证预测能量对整体旋转、平移和反演不变。

##### 从普通 GNN 到定向消息传递

普通分子 GNN 的节点更新可写为：

$$
\mathbf{h}_i^{(l+1)}
=
f_{\text{update}}\left(
\mathbf{h}_i^{(l)},
\sum_{j \in \mathcal{N}_i}
f_{\text{int}}\left(\mathbf{h}_j^{(l)}, \mathbf{e}_{(ij)}^{(l)}\right)
\right)
$$

其中边特征 \(\mathbf{e}_{(ij)}\) 多数只依赖距离 \(d_{ij}\)。DimeNet 改为更新有向消息：

$$
\mathbf{m}_{ji}^{(l+1)}
=
f_{\text{update}}\left(
\mathbf{m}_{ji}^{(l)},
\sum_{k \in \mathcal{N}_j \setminus \{i\}}
f_{\text{int}}\left(
\mathbf{m}_{kj}^{(l)},
\mathbf{e}_{\text{RBF}}^{(ji)},
\mathbf{a}_{\text{SBF}}^{(kj,ji)}
\right)
\right)
$$

这里 \(\mathbf{e}_{\text{RBF}}^{(ji)}\) 表示当前边 \(j \to i\) 的径向距离，\(\mathbf{a}_{\text{SBF}}^{(kj,ji)}\) 联合表示 incoming edge \(k \to j\) 的距离 \(d_{kj}\) 与两条有向边之间的夹角 \(\alpha_{(kj,ji)} = \angle x_k x_j x_i\)。

> 💡 关键：DimeNet 的消息更新类似 belief propagation。更新 \(j \to i\) 时，模型查看所有进入 \(j\) 的其他消息 \(k \to j\)，并用 \((k,j,i)\) 三元组中的角度控制信息如何流动。

##### 物理启发的 Fourier-Bessel 表示

DimeNet 不直接把原始距离和角度喂给 MLP，而是用正交基展开。对距离和角度的联合表示，论文从球坐标下的 Helmholtz 方程出发，得到 spherical Bessel functions \(j_l\) 与 spherical harmonics \(Y_l^m\)。在只保留 \(m=0\) 的情况下，2D spherical Fourier-Bessel basis 为：

$$
\tilde{a}_{\text{SBF},ln}(d,\alpha)
=
\sqrt{\frac{2}{c^3 j_{l+1}^2(z_{ln})}}
j_l\left(\frac{z_{ln}}{c}d\right)Y_l^0(\alpha)
$$

其中 \(c\) 是 cutoff，\(z_{ln}\) 是 \(l\) 阶 Bessel 函数的第 \(n\) 个根。单独的径向距离基可写为：

$$
\tilde{e}_{\text{RBF},n}(d)
=
\sqrt{\frac{2}{c}}
\frac{\sin\left(\frac{n\pi}{c}d\right)}{d}
$$

这比 Gaussian RBF 更有结构：基函数在目标区间上近似正交，频率上界可控，减少冗余参数。论文指出 \(N_{\text{RBF}}\) 可以显著小于 SchNet/PhysNet 中常见的大量 Gaussian basis。

为了让模型适合分子动力学，DimeNet 在 cutoff 处乘上 envelope function，让函数值及一、二阶导数平滑趋近 0：

$$
u(d)
=
1
- \frac{(p+1)(p+2)}{2}d^p
+ p(p+2)d^{p+1}
- \frac{p(p+1)}{2}d^{p+2}
$$

##### 模块级流程

```python
# DimeNet 定向消息传递伪代码
def dimenet_forward(atom_types, positions):
    edges = radius_graph(positions, cutoff=c)
    distances = compute_pairwise_distances(edges, positions)
    angles = compute_triplet_angles(edges, positions)  # k -> j -> i

    rbf = radial_bessel_basis(distances)
    sbf = spherical_bessel_basis(distances, angles)

    # Embedding block: 为每条有向边 j -> i 生成初始消息
    m = {}
    for (j, i) in edges:
        m[j, i] = swish(linear(concat(embed(atom_types[j]),
                                      embed(atom_types[i]),
                                      rbf[j, i])))

    outputs = []
    outputs.append(output_block(m, rbf))

    for layer in range(num_interaction_blocks):
        new_m = {}
        for (j, i) in edges:
            incoming = []
            for k in neighbors(j):
                if k == i:
                    continue
                incoming.append(interaction(m[k, j], rbf[j, i], sbf[k, j, i]))
            new_m[j, i] = update(m[j, i], sum(incoming))
        m = new_m
        outputs.append(output_block(m, rbf))

    return sum(outputs)  # 分子性质或能量
```

Output block 会把每层消息按接收原子求和：

$$
\mathbf{h}_i = \sum_{j \in \mathcal{N}_i}\mathbf{m}_{ji}
$$

再经 MLP 得到原子级贡献 \(t_i^{(l)}\)，最终预测为：

$$
t = \sum_i \sum_l t_i^{(l)}
$$

这种逐原子求和保证了对原子排列的置换不变性。

##### 力预测与损失函数

DimeNet 可以预测分子标量能量 \(f_\theta(\mathbf{X}, \mathbf{z})\)，再通过坐标梯度得到保守力场：

$$
\mathbf{F}_i(\mathbf{X}, \mathbf{z})
=
-
\frac{\partial}{\partial \mathbf{x}_i}
f_\theta(\mathbf{X}, \mathbf{z})
$$

在 MD17 这类同时有能量和力标签的数据上，论文使用能量误差与力误差联合训练：

$$
\mathcal{L}_{\text{MD}}(\mathbf{X}, \mathbf{z})
=
\left|f_\theta(\mathbf{X}, \mathbf{z})-\hat{t}\right|
+
\frac{\rho}{3N}
\sum_{i=1}^{N}\sum_{\alpha=1}^{3}
\left|
-
\frac{\partial f_\theta(\mathbf{X}, \mathbf{z})}{\partial x_{i\alpha}}
-
\hat{F}_{i\alpha}
\right|
$$

这里 \(\rho\) 控制力损失权重。由于力来自能量的梯度，模型需要至少二阶连续可微；这就是 DimeNet 使用 Swish、平滑 cutoff 和连续基函数的原因。

##### 与 SchNet 的核心差异

SchNet 主要通过连续滤波卷积建模距离依赖，已经能处理 3D 坐标和分子性质预测，但它的消息通常仍以节点和 pairwise distance 为中心。DimeNet 则显式构建三元组 \((k,j,i)\)，让消息 \(k \to j\) 通过角度影响消息 \(j \to i\)。这相当于把经典经验势中的角度项直接放进 GNN 的归纳偏置中，因此在量子化学性质和力预测任务上更具样本效率。

#### 🧪 练习题

```yaml
question: "DimeNet 为什么要更新有向边消息 m_ji，而不是只更新原子节点 h_i？"
options:
  - "因为有向边消息可以携带方向信息，并在三元组 k-j-i 中显式利用键角"
  - "因为节点表示无法用于任何分子性质预测"
  - "因为有向边消息会破坏旋转不变性，从而提升模型容量"
  - "因为 DimeNet 不使用原子坐标，只使用 SMILES 字符串"
answer: 0
explain: "DimeNet 的核心是让消息与空间方向关联；更新 m_ji 时聚合 k->j 的消息并使用夹角调制交互，因此能直接建模角势能项。"
```
