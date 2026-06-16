### EDM — 联合生成原子类型与 3D 坐标的 E(3) 等变扩散模型

```yaml
id: edm
name: EDM
full_name: 等变扩散模型 (EDM)
year: '2022'
org: University of Amsterdam
paper_url: https://arxiv.org/abs/2203.17003
category: generation
parent: geodiff
motivation: 原子类型与3D坐标联合等变生成
```

#### 📝 一句话总结

EDM 提出 E(3) Equivariant Diffusion Model，在同一个扩散过程中联合去噪连续 3D 坐标和离散原子特征，用 EGNN 保证欧氏变换等变，从而直接生成带 atom types 的 3D 分子。

#### 🎯 核心要点

- **无条件 3D 分子生成**：不只做给定图的构象生成，而是同时生成原子坐标、原子类型和电荷等节点特征
- **联合 latent 表示**：把每个分子表示为 \(z=(x,h)\)，其中 \(x\) 是 3D 坐标，\(h\) 是 atom type/charge 等特征
- **E(3) 等变扩散**：坐标对旋转、反射和平移等变，节点特征保持不变，生成似然不依赖绝对坐标系
- **零重心坐标子空间**：坐标噪声定义在 center-of-gravity 为 0 的线性子空间，解决平移不变分布无法归一化的问题
- **EGNN 去噪网络**：用全连接图上的 E(n) Equivariant Graph Neural Network 预测坐标和特征噪声
- **连续-离散统一训练**：连续坐标使用高斯扩散，类别特征使用 one-hot 加高斯扰动，并在 zeroth likelihood term 中还原为类别概率
- **显式 likelihood 分析**：给出坐标与离散特征共同存在时的 variational lower bound 和 likelihood 计算方式
- **可条件生成**：将目标性质 \(y\) 拼接到节点特征中，可生成满足指定量子化学性质的分子
- **实验优势**：在 QM9 上相较 E-NF 和 G-Schnet 获得更高 molecule stability，并能扩展到 GEOM-Drugs

#### 🔬 深入细节

##### 框架图与可访问来源

![EDM 旋转等变生成分布示意](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x1.png)
*图：EDM Figure 1。旋转输入分子只会旋转坐标部分，原子类型特征保持不变，模型似然保持一致。*

![EDM 扩散与去噪流程](https://ar5iv.labs.arxiv.org/html/2203.17003/assets/x2.png)
*图：EDM Figure 2。从标准高斯噪声开始，逐步去噪得到 3D 坐标和原子特征。*

可访问来源：arXiv 论文 https://arxiv.org/abs/2203.17003；PMLR 论文页 https://proceedings.mlr.press/v162/hoogeboom22a.html；ar5iv HTML 图像页 https://ar5iv.labs.arxiv.org/html/2203.17003；官方实现 https://github.com/ehoogeboom/e3_diffusion_for_molecules。

##### 算法伪代码

```python
# EDM training and sampling for 3D molecule generation
def train_edm_step(molecule, edm, noise_schedule):
    x, h = molecule.coordinates, molecule.node_features  # h: atom type/charge
    x = x - x.mean(axis=0, keepdims=True)                # zero center of gravity
    z0 = concat(x, h)

    t = sample_uniform_time()
    alpha_t, sigma_t = noise_schedule(t)

    eps_x = sample_gaussian_like(x)
    eps_x = eps_x - eps_x.mean(axis=0, keepdims=True)
    eps_h = sample_gaussian_like(h)
    eps = concat(eps_x, eps_h)

    z_t = alpha_t * z0 + sigma_t * eps
    eps_hat = edm.egnn_dynamics(z_t, t)
    eps_hat.x = eps_hat.x - eps_hat.x.mean(axis=0, keepdims=True)

    loss = mean_squared_error(eps_hat, eps)
    loss.backward()
    optimizer.step()

def sample_edm(edm, n_atoms, T, noise_schedule):
    x_T = sample_gaussian(shape=(n_atoms, 3))
    x_T = x_T - x_T.mean(axis=0, keepdims=True)
    h_T = sample_gaussian(shape=(n_atoms, num_features))
    z_t = concat(x_T, h_T)

    for t in reversed(range(1, T + 1)):
        eps_hat = edm.egnn_dynamics(z_t, t)
        x0_hat, h0_hat = predict_clean_data(z_t, eps_hat, noise_schedule[t])
        z_t = sample_posterior(z_t, x0_hat, h0_hat, t)
        z_t.x = z_t.x - z_t.x.mean(axis=0, keepdims=True)

    atom_types = decode_categorical_features(z_t.h)
    coordinates = z_t.x
    return build_molecule(atom_types, coordinates)
```

##### 从构象生成到完整 3D 分子生成

GeoDiff 这类模型通常以分子图为条件，目标是为已有 2D graph 生成合理构象。EDM 的问题更进一步：分子图、原子类型和坐标都要生成。模型先从训练集的分子大小分布中采样原子数 \(N\)，再对 \(N\) 个点联合生成坐标 \(x\in\mathbb{R}^{N\times 3}\) 和节点特征 \(h\)。

这种设定要求模型同时满足两类约束：几何上，分子整体旋转、反射或平移不应改变概率；化学上，生成的 atom types 和距离应能推导出合理价态与键结构。EDM 的核心贡献就是把连续坐标和离散特征放入同一个扩散框架，并保持 E(3) 对称性。

##### 联合扩散过程

令 \(z=[x,h]\)。正向扩散把真实分子 \(z_0\) 扰动为 \(z_t\)：

$$
q(z_t\mid z_0)=\mathcal{N}(z_t;\alpha_t z_0,\sigma_t^2 I)
$$

坐标部分使用零重心子空间中的高斯分布：

$$
\sum_{i=1}^{N}x_i=0
$$

特征部分是普通高斯扰动。对 categorical atom type，EDM 不把类别当作任意整数，而是使用 one-hot 表示再加噪，这避免了“类别 1 比类别 4 更近”这种人为顺序偏置。

反向过程用神经网络预测噪声 \(\epsilon_\theta(z_t,t)\)，再得到干净样本估计：

$$
\hat{z}_0=\frac{z_t-\sigma_t\epsilon_\theta(z_t,t)}{\alpha_t}
$$

生成 transition 使用真实 posterior \(q(z_{t-1}\mid z_t,z_0)\) 的形式，只是把未知 \(z_0\) 替换成 \(\hat{z}_0\)：

$$
p_\theta(z_{t-1}\mid z_t)=q(z_{t-1}\mid z_t,\hat{z}_0)
$$

训练时常用简化噪声预测目标：

$$
\mathcal{L}_t=
\mathbb{E}_{z_0,\epsilon,t}
\left[
\left\|\epsilon-\epsilon_\theta(z_t,t)\right\|_2^2
\right]
$$

论文还给出带 SNR 权重的 variational objective，用于 likelihood 计算；实践中使用未加权 L2 目标有更好的样本质量。

##### EGNN dynamics 如何保证等变

EDM 的去噪网络基于 EGNN。对第 \(\ell\) 层，节点 \(i,j\) 的消息可写成：

$$
m_{ij}=\phi_e\left(h_i^\ell,h_j^\ell,\|x_i^\ell-x_j^\ell\|^2,a_{ij}\right)
$$

坐标更新为相对方向的加权和：

$$
x_i^{\ell+1}=x_i^\ell+\sum_{j\ne i}
\frac{x_i^\ell-x_j^\ell}{\|x_i^\ell-x_j^\ell\|+1}\phi_x(m_{ij})
$$

节点特征更新为：

$$
h_i^{\ell+1}=\phi_h\left(h_i^\ell,\sum_{j\ne i}m_{ij}\right)
$$

距离平方和节点特征不随旋转或平移改变，因此 \(m_{ij}\) 是不变量；坐标更新只由相对向量线性组合构成，因此输入坐标旋转时输出坐标也同样旋转。EDM 还把时间 \(t\) 拼接到节点特征，使同一 EGNN 能在不同噪声强度下预测对应去噪方向。

> 💡 关键：EDM 不是在固定体素网格上生成分子，也不需要给原子指定自回归顺序；它把分子作为无序点云处理，用等变网络承担几何归纳偏置。

##### 离散特征的 zeroth likelihood term

普通扩散模型常处理连续或有自然顺序的像素值。原子类型是 categorical，不能简单用整数距离衡量。EDM 对 atom type 使用 one-hot \(h\)，在接近 \(t=0\) 时计算每个类别对应 one-hot 区间的高斯积分，并归一化为类别概率：

$$
p(h_i=k\mid z_0)\propto
\int_{-1/2}^{1/2}
\mathcal{N}\left(u;\hat{h}_{0,i,k}-1,\sigma_0^2\right)du
\prod_{r\ne k}
\int_{-1/2}^{1/2}
\mathcal{N}\left(u;\hat{h}_{0,i,r},\sigma_0^2\right)du
$$

这个处理让“离散类别最终要落回 one-hot 顶点”成为 likelihood 的一部分，而不是只在采样后硬性 argmax。坐标部分则保留连续密度，并加入零重心子空间的归一化修正。

##### 条件生成与性质控制

EDM 可以扩展到条件生成。给定目标性质 \(y\)，训练目标变为：

$$
\mathcal{L}_{\text{cond}}=
\mathbb{E}\left[
\left\|\epsilon-\epsilon_\theta(z_t,t,y)\right\|_2^2
\right]
$$

实现上只需把 \(y\) 拼接到每个节点的输入特征。采样时先选择原子数和目标性质，再运行同样的反向扩散。论文在 QM9 上用 polarizability、HOMO、LUMO、gap、dipole 等性质验证，生成样本的目标性质误差优于与性质无关的 baseline。

##### 与 GeoDiff 和 normalizing flow 的区别

| 维度 | GeoDiff | E-NF / 等变 flow | EDM |
|------|---------|------------------|-----|
| 任务 | 给定分子图生成构象 | 3D 分子生成/密度建模 | 联合生成 atom features 与 3D 坐标 |
| 生成对象 | 坐标 \(C\) | 连续变量 | \(z=(x,h)\)，含坐标与类别特征 |
| 对称性 | SE(3) 等变 kernel | 等变可逆动力学 | E(3) 等变 denoising network |
| 训练成本 | 扩散噪声预测 | 需积分 ODE/flow likelihood | DDPM 式训练，较 flow 更易扩展 |
| 离散原子类型 | 通常由条件图给定 | 处理不自然 | one-hot 加噪 + categorical likelihood |

EDM 的关键影响是证明 3D 分子生成不必拆成“先生成图，再生成构象”两个模型；坐标和化学身份可以在一个等变扩散过程中共同出现。后续 GeoLDM、DiffDock、分子/材料等变扩散模型都沿用了这种“几何对称性 + diffusion”的设计路线。

#### 🧪 练习题

```yaml
question: "EDM 相比只做构象生成的 GeoDiff，最核心的扩展是什么？"
options:
  - "把分子固定到二维网格上生成"
  - "在同一扩散过程中联合生成 3D 坐标和原子类型等节点特征"
  - "完全取消神经网络，只使用 RDKit 力场优化"
  - "只预测分子的 SMILES 字符串，不处理坐标"
answer: 1
explain: "EDM 的 latent 是 z=(x,h)，其中 x 是连续 3D 坐标，h 是 atom type/charge 等特征；EGNN 去噪网络同时预测两部分噪声并保持 E(3) 等变。"
```
