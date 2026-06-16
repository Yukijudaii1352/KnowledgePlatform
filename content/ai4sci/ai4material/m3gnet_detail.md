### M3GNet — 三体图网络 (Multi-body Graph Network)

```yaml
id: m3gnet
name: M3GNet
full_name: 三体图网络 (Multi-body Graph Network)
year: '2022'
org: UCSD
paper_url: https://www.nature.com/articles/s43588-022-00349-3
category: mlip
parent: megnet
motivation: 通用势函数覆盖89种元素
```

#### 📝 一句话总结

M3GNet 把材料图网络扩展为显式包含三体角度信息、原子坐标和晶格矩阵的通用机器学习原子间势，在 89 种元素的大规模 Materials Project 弛豫数据上学习能量、力和应力，从而让结构弛豫、分子动力学和新材料筛选不必为每个化学体系重新拟合势函数。

#### 🎯 核心要点

- **位置增强材料图**：图表示为 \(\mathcal{G}=(\mathcal{V},\mathcal{E},\mathcal{X},[\mathbf{M},\mathbf{u}])\)，显式包含原子坐标 \(\mathcal{X}\) 和晶格矩阵 \(\mathbf{M}\)
- **三体 many-body block**：在 bond update 前计算 \(\theta_{jik}\) 等三体角度，把 atom \(i\) 周围完整键环境注入 \(\mathbf{e}_{ij}\)
- **平滑距离基函数**：键距离展开到连续基函数，并要求函数及一、二阶导数在 cutoff 边界平滑归零，保证力和应力连续
- **能量保守势函数**：readout 输出 atomic energy，求和得到总能量，再通过自动微分得到 \(\mathbf{f}=-\partial E/\partial\mathbf{x}\) 和 \(\boldsymbol{\sigma}=V^{-1}\partial E/\partial\boldsymbol{\epsilon}\)
- **EFS 联合训练**：通用势训练同时拟合 energy、force、stress，论文指出只用 energy 会导致力和应力误差不可用
- **覆盖 89 元素**：MPF.2021.2.8 数据集包含 62,783 个化合物的 187,687 个 ionic steps、约 1,687 万 force components 和 168.9 万 stress components
- **Materials discovery workflow**：用 M3GNet 弛豫约 3166 万个假想结构，筛出约 184.9 万个 \(E_{\text{hull-m}}<0.001\ \mathrm{eV/atom}\) 的候选
- **与 MEGNet 的关系**：继承 MEGNet 的材料图与状态更新思想，但为 IAP 增加坐标、晶格、三体交互和平滑可微约束

#### 🔬 深入细节

![M3GNet many-body graph potential 示意图](https://ar5iv.labs.arxiv.org/html/2202.02450/assets/x1.png)
*图：M3GNet 从 position-included graph 出发，经过 featurization、many-body-to-bond、graph convolution 和 readout，输出能量并由自动微分得到力与应力。公开图源来自 arXiv:2202.02450 的 ar5iv HTML。*

##### 算法伪代码

```python
# M3GNet universal interatomic potential 伪代码
graph = build_periodic_graph(structure, radial_cutoff=5.0)
V = embed_atomic_numbers(Z, dim=64)
E0 = smooth_distance_basis(pair_distances)  # derivatives vanish at cutoff
triplets = enumerate_triplets(center=i, cutoff=4.0)
u = optional_state_vector

for block in range(3):
    # many-body to bond: use angles around center atom i to update bond e_ij
    for (i, j) in graph.edges:
        env = 0
        for k in neighbors(i, exclude=j):
            theta_jik = angle(edge(i, j), edge(i, k))
            env += bessel_spherical_basis(r_ik, theta_jik) * gate(V[k])
        E[i, j] = E[i, j] + gated_mlp(env)

    # graph convolution: update bonds, atoms, and optional global state
    for (i, j) in graph.edges:
        E[i, j] = E[i, j] + phi_e(concat(V[i], V[j], E[i, j], u)) @ E0[i, j]
    for i in graph.nodes:
        V[i] = V[i] + sum(phi_e_prime(concat(V[i], V[j], E[i, j], u)) @ E0[i, j]
                         for j in neighbors(i))
    u = update_state(mean(V), u)

atomic_energy = gated_mlp_readout(V)
E_total = sum(atomic_energy)
forces = -grad(E_total, atomic_positions)
stress = grad(E_total, strain) / volume

loss = huber(E_per_atom, E_dft_per_atom)
loss += w_f * huber(forces, forces_dft)
loss += w_sigma * huber(stress, stress_dft)
```

##### 为什么普通材料 GNN 不够做 IAP

CGCNN、MEGNet 等图网络主要面向性质预测，常把边表示为截断半径内的距离展开，再做消息传递和池化。这对 formation energy、band gap 等标量性质有效，但直接作为势函数会遇到两个问题。第一，势函数需要对坐标和晶格连续可微，否则力、声子、MD 会出现不稳定。第二，局域化学环境不只由 pair distance 决定，角度和多体相互作用对晶体稳定性很关键。

M3GNet 因此把图定义为：

$$
\mathcal{G}=(\mathcal{V},\mathcal{E},\mathcal{X},[\mathbf{M},\mathbf{u}])
$$

其中 \(\mathcal{V}\) 是原子特征，\(\mathcal{E}\) 是键特征，\(\mathcal{X}\) 是原子坐标，\(\mathbf{M}\) 是晶格矩阵，\(\mathbf{u}\) 是可选全局状态。坐标和晶格进入图表示后，模型不仅能预测标量能量，也能通过能量对几何变量的导数给出物理量。

##### 三体 many-body to bond

设 \(\mathcal{N}_i\) 是中心原子 \(i\) 的邻居集合。M3GNet 先用 \(n\)-body 思路更新 bond \(\mathbf{e}_{ij}\)：

$$
\tilde{\mathbf{e}}_{ij}
= \sum_{k_1,\ldots,k_{n-2}\in\mathcal{N}_i/j}
\phi_n(\mathbf{e}_{ij},\mathbf{r}_{ij},\mathbf{v}_{j},
\mathbf{r}_{ik_1},\ldots,\mathbf{v}_{k_{n-2}})
$$

论文聚焦 \(n=3\)，即三体 M3GNet。令 \(\theta_{jik}\) 为 \(\mathbf{e}_{ij}\) 与 \(\mathbf{e}_{ik}\) 的夹角，三体角度项用 spherical Bessel 与 spherical harmonics 展开：

$$
\tilde{\mathbf{e}}_{ij}
= \sum_k
j_l\left(z_{ln}\frac{r_{ik}}{r_c}\right)
Y_l^0(\theta_{jik})
\odot \sigma(\mathbf{W}_v\mathbf{v}_k+\mathbf{b}_v)
f_c(r_{ij})f_c(r_{ik})
$$

$$
\mathbf{e}'_{ij}
= \mathbf{e}_{ij}
+ g(\tilde{\mathbf{W}}_2\tilde{\mathbf{e}}_{ij}+\tilde{\mathbf{b}}_2)
\odot
\sigma(\tilde{\mathbf{W}}_1\tilde{\mathbf{e}}_{ij}+\tilde{\mathbf{b}}_1)
$$

这里 \(f_c(r)=1-6(r/r_c)^5+15(r/r_c)^4-10(r/r_c)^3\) 是平滑 cutoff，\(g(x)=x\sigma(x)\) 是 swish-like gate。直觉上，\(\mathbf{e}_{ij}\) 不再只代表一条边的距离，而是吸收了中心原子 \(i\) 周围其他邻居 \(k\) 构成的角环境。

##### 图卷积、readout 与物理量

三体更新后，M3GNet 继续做 bond、atom、state 更新：

$$
\mathbf{e}'_{ij}
= \mathbf{e}_{ij}
+ \phi_e(\mathbf{v}_i\oplus\mathbf{v}_j\oplus\mathbf{e}_{ij}\oplus\mathbf{u})
\mathbf{W}_e^0\mathbf{e}_{ij}^0
$$

$$
\mathbf{v}'_i
= \mathbf{v}_i
+ \sum_j
\phi'_e(\mathbf{v}_i\oplus\mathbf{v}_j\oplus\mathbf{e}'_{ij}\oplus\mathbf{u})
\mathbf{W}_e^{0'}\mathbf{e}_{ij}^0
$$

$$
\mathbf{u}'
= g\left(\mathbf{W}_2^u g\left(\mathbf{W}_1^u
\left(\frac{1}{N_v}\sum_i^{N_v}\mathbf{v}_i\oplus\mathbf{u}\right)
+\mathbf{b}_1^u\right)+\mathbf{b}_2^u\right)
$$

最后 readout 不是直接预测力，而是预测原子能量并求和：

$$
E = \sum_i E_i
$$

力和应力来自能量导数：

$$
\mathbf{f} = -\frac{\partial E}{\partial \mathbf{x}}, \qquad
\boldsymbol{\sigma}=V^{-1}\frac{\partial E}{\partial\boldsymbol{\epsilon}}
$$

这让模型保持能量守恒：力场不是独立回归出来的一组向量，而是同一个势能面的梯度。

##### EFS 训练目标

通用 IAP 使用 Huber loss 联合训练能量、力和应力：

$$
L = \ell(e,e_D)
+ w_f\ell(\mathbf{f},\mathbf{f}_D)
+ w_{\sigma}\ell(\boldsymbol{\sigma},\boldsymbol{\sigma}_D)
$$

其中 \(e\) 是 energy per atom，\(\ell\) 是 Huber loss，\(D\) 表示 DFT 标签。论文在 MPF.2021.2.8 训练中使用 \(w_f=1\)、\(w_{\sigma}=0.1\)。在训练前还会用线性回归拟合元素参考能：

$$
E_{\text{ref}} = \sum_i c_i E_i
$$

再从总能量中扣除参考项，以降低不同元素组成带来的能量尺度差异。最终 M3GNet-EFS 在测试集上达到约 \(0.035\ \mathrm{eV/atom}\) energy MAE、\(0.072\ \mathrm{eV/\AA}\) force MAE 和 \(0.41\ \mathrm{GPa}\) stress MAE。

##### 与 MEGNet 和传统势函数的区别

MEGNet 的全局状态向量适合多性质预测，但它本身不保证作为 IAP 所需的几何连续性。M3GNet 保留材料图框架，同时加入三体角度、平滑 cutoff、坐标/晶格自微分和 EFS 损失。与 EAM、MEAM、MTP 等传统或局域 ML 势相比，M3GNet 的元素以 learnable embedding 进入节点特征，避免为每个元素组合单独扩大参数表，因此能覆盖 89 种元素和多组分晶体。

> 💡 关键：M3GNet 的“通用性”来自两个条件同时成立：训练数据覆盖足够多的 Materials Project 弛豫轨迹，模型结构又把能量、力、应力绑定到同一个可微势能面。

#### 🧪 练习题

```yaml
question: "M3GNet 作为通用原子间势时，为什么要同时训练能量、力和应力？"
options:
  - "因为只训练能量会使元素 embedding 失效"
  - "因为力和应力是结构弛豫、声子和晶格变化所需的导数信息，只用能量会放大导数误差"
  - "因为应力标签可以替代所有原子坐标"
  - "因为 Huber loss 不能用于单一目标"
answer: 1
explain: "M3GNet 的力和应力来自能量导数；如果训练只约束能量，导数误差会被放大，难以用于弛豫和动力学。"
```
