### SchNet

```yaml
id: schnet
name: SchNet
full_name: 连续过滤器卷积网络 (Continuous-filter Convolutional NN)
year: '2017'
org: TU Berlin
paper_url: https://proceedings.neurips.cc/paper/2017/hash/303ed4c69846ab36c2904d3ba8573050-Abstract.html
category: gnn_representation
parent: —
motivation: 连续过滤器处理非网格原子位置
```

#### 📝 一句话总结

SchNet 提出 continuous-filter convolution，将卷积滤波器从固定网格推广到由原子间连续距离动态生成的滤波器，解决分子/材料原子位置不在规则网格上而又需要平滑、旋转不变能量面和能量守恒力场的问题。

#### 🎯 核心要点

- **连续过滤器卷积 cfconv**：滤波器 \(W(\mathbf{r}_i-\mathbf{r}_j)\) 由神经网络根据相对位置生成，而不是在图像网格上使用固定卷积核
- **原子类型 embedding**：每个原子以核电荷 \(Z_i\) 的可学习向量 \(\mathbf{a}_{Z_i}\) 初始化，避免手工构造分子指纹
- **距离径向基展开**：用 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|\) 和 Gaussian radial basis 作为 filter network 输入，从结构上保证能量旋转不变
- **三层 interaction blocks**：每个 block 通过 atom-wise layers、cfconv 和残差连接更新原子表示，逐步形成多体相互作用表示
- **原子能量分解与池化**：最终对每个原子预测能量贡献并求和得到分子总能量，天然支持不同原子数的体系
- **力由能量梯度得到**：\(\hat{\mathbf{F}}_i=-\partial\hat{E}/\partial\mathbf{r}_i\)，使预测力场能量守恒且随旋转等变
- **平滑激活函数**：使用 shifted softplus \(\operatorname{ssp}(x)=\ln(0.5e^x+0.5)\)，保证势能面和力损失所需的高阶可微性
- **基准覆盖三类难度**：QM9 平衡分子性质、MD17 单分子动力学构象、论文提出的 ISO17 同时包含化学组成和构象变化

#### 🔬 深入细节

##### 图示与可访问来源

![SchNet 架构与 continuous-filter convolution](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 的整体架构、interaction block 和 filter-generating network。开放 HTML 来源见 https://ar5iv.labs.arxiv.org/html/1706.08566；arXiv 论文见 https://arxiv.org/abs/1706.08566；NeurIPS 页面见 https://proceedings.neurips.cc/paper/2017/hash/303ed4c69846ab36c2904d3ba8573050-Abstract.html。*

##### 问题背景：为什么普通卷积不适合原子体系

图像卷积假设信号在规则像素网格上，卷积核的每个权重对应固定相对偏移。但分子中的原子坐标是连续的三维点集，原子数可变，原子之间没有规则网格。若把原子密度插值到三维体素网格，会引入分辨率选择、插值误差和巨大稀疏体积；若只使用离散键类型或 one-hot 距离 bin，则势能面可能不连续，不适合几何优化和分子动力学。

SchNet 的核心是把“卷积核查表”改成“滤波器生成函数”。给定任意两个原子的相对位置，filter network 直接生成用于消息传递的连续滤波器权重。原子轻微移动时，距离和滤波器权重也连续变化，因此能量预测是平滑的。

##### Continuous-filter convolution 公式

设第 \(l\) 层有 \(n\) 个对象/原子的表示：

$$
X^l=(\mathbf{x}_1^l,\ldots,\mathbf{x}_n^l),\qquad
\mathbf{x}_i^l\in\mathbb{R}^{F}
$$

原子位置为：

$$
R=(\mathbf{r}_1,\ldots,\mathbf{r}_n),\qquad
\mathbf{r}_i\in\mathbb{R}^{3}
$$

连续过滤器卷积定义为：

$$
\mathbf{x}_{i}^{l+1}
=
(X^l * W^l)_i
=
\sum_j \mathbf{x}_j^l \circ W^l(\mathbf{r}_i-\mathbf{r}_j)
$$

\(\circ\) 表示逐通道乘法。与普通图消息传递相比，边权不是离散 bond type，而是由连续坐标差输入的 \(W^l\) 动态产生。为了保持旋转不变，SchNet 实际使用原子间距离：

$$
d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|
$$

再用 Gaussian radial basis 展开：

$$
e_k(d_{ij})=
\exp\left(-\gamma\|d_{ij}-\mu_k\|^2\right)
$$

论文设置 \(0\text{\AA}\leq \mu_k\leq 30\text{\AA}\)，间隔 \(0.1\text{\AA}\)，\(\gamma=10\)。这相当于把连续距离投影到平滑的径向基特征上，让 filter network 更容易学习不同距离范围的相互作用。

##### SchNet 架构：从原子 embedding 到总能量

每个原子以核电荷 embedding 初始化：

$$
\mathbf{x}_i^0=\mathbf{a}_{Z_i}
$$

然后通过多个 interaction block。一个 block 可以概括为：

$$
\mathbf{x}_i^{l+1}=\mathbf{x}_i^l+\mathbf{v}_i^l
$$

\(\mathbf{v}_i^l\) 由 atom-wise layer、cfconv、shifted softplus 和后续 atom-wise layers 计算。atom-wise layer 是对每个原子共享参数的全连接层：

$$
\mathbf{x}_i^{l+1}=W^l\mathbf{x}_i^l+\mathbf{b}^l
$$

共享参数保证模型对原子编号置换不敏感；cfconv 汇聚邻居几何信息；残差连接让多层相互作用能稳定训练。经过 interaction blocks 后，SchNet 为每个原子预测能量贡献 \(\hat{E}_i\)，总能量由求和得到：

$$
\hat{E}=\sum_{i=1}^{n}\hat{E}_i
$$

这种分解让模型可以处理不同大小的分子，也符合量子化学中能量可看作局部环境贡献聚合的建模直觉。

##### 力场训练：由能量梯度保证守恒

分子动力学需要力，而力与势能的物理关系是：

$$
\mathbf{F}_{i}(\mathbf{r}_1,\ldots,\mathbf{r}_n)
=
-
\frac{\partial E}{\partial \mathbf{r}_{i}}
(\mathbf{r}_1,\ldots,\mathbf{r}_n)
$$

SchNet 不单独输出任意力向量，而是对预测能量求负梯度：

$$
\hat{\mathbf{F}}_{i}
=
-
\frac{\partial \hat{E}}{\partial \mathbf{r}_{i}}
(Z_1,\ldots,Z_n,\mathbf{r}_1,\ldots,\mathbf{r}_n)
$$

这样得到的力场天然是保守力场，不会出现沿闭合路径做功导致能量凭空增加的情况。由于 \(\hat{E}\) 使用距离构造而旋转不变，\(\hat{\mathbf{F}}_i\) 会随坐标旋转而等变。

训练时同时纳入能量和力：

$$
\ell(\hat{E},(E,\mathbf{F}_1,\ldots,\mathbf{F}_n))
=
\rho\|E-\hat{E}\|^2
+
\frac{1}{n}\sum_{i=1}^{n}
\left\|
\mathbf{F}_i
-
\left(
-
\frac{\partial \hat{E}}{\partial \mathbf{R}_i}
\right)
\right\|^2
$$

论文实验使用 \(\rho=0.01\) 来平衡能量和力的尺度。为了让力损失可优化，模型需要对位置至少二阶可微，因此 SchNet 使用 shifted softplus：

$$
\operatorname{ssp}(x)=\ln(0.5e^x+0.5)
$$

它比 ReLU 更适合势能面建模，因为 ReLU 的导数不连续会传导到力预测。

##### 伪代码：SchNet 前向与训练

```python
# SchNet 的核心前向与能量-力联合训练
def schnet_energy(Z, R):
    # Z: 原子核电荷/元素类型, R: 原子坐标 [n, 3]
    x = atom_embedding[Z]  # x_i^0 = a_Zi

    for block in interaction_blocks:
        # 距离矩阵保证旋转不变
        d = pairwise_distances(R)  # d_ij = ||r_i - r_j||
        rbf = gaussian_rbf(d, centers=mu, gamma=10)

        # filter network 生成连续滤波器 W(d_ij)
        W = block.filter_network(rbf)

        # cfconv: 按距离生成的滤波器聚合邻居表示
        message = sum_over_neighbors(x[:, None, :] * W)

        # atom-wise layers + shifted softplus + residual
        v = block.atomwise_after(block.atomwise_before(message))
        x = x + v

    atom_energy = energy_head(x)
    return atom_energy.sum()


def train_step(batch):
    Z, R, E_true, F_true = batch
    R.requires_grad_(True)

    E_pred = schnet_energy(Z, R)
    F_pred = -grad(E_pred, R)  # 能量守恒力场

    loss_E = (E_true - E_pred).pow(2)
    loss_F = ((F_true - F_pred).pow(2).sum(dim=-1)).mean()
    loss = rho * loss_E + loss_F
    optimizer.step(loss)
```

##### 与 DTNN、MPNN、手工指纹的差异

DTNN 已经把分子看作原子间相互作用系统，但 SchNet 明确把这种相互作用写成 continuous-filter convolution，使任意位置点集上的卷积成为可复用构件。传统分子图网络常依赖离散键类型、one-hot 边标签或距离 bin，这对平衡分子性质预测足够，但在分子动力学轨迹上会暴露势能面不连续问题。

SchNet 的创新在于把几何连续性、旋转/平移/置换对称性和能量-力物理关系放进同一个神经网络势里。它不是事后约束力守恒，而是从能量标量出发自动微分得到力；也不是把三维结构体素化，而是在原子坐标原生空间直接建模。

##### 为什么 ISO17 重要

QM9 主要是平衡构型，检验化学组成泛化；MD17 是单分子的构象轨迹，检验势能面局部形状；ISO17 同时包含不同同分异构体和非平衡构象，要求模型同时泛化化学组成和几何构象。论文显示加入力监督能提升 ISO17 泛化，这说明力标签不仅帮助拟合某个分子的局部轨迹，也能给表示学习提供更强的几何梯度信息。

> 💡 关键：SchNet 的“连续过滤器”不是普通 attention 权重，而是把距离连续映射到通道级滤波器，使原子移动的微小变化能平滑地反映到能量与力上。

#### 🧪 练习题

```yaml
question: "SchNet 为什么通过能量的负梯度来得到力，而不是让网络直接输出力？"
options:
  - "为了减少原子类型 embedding 的数量"
  - "为了保证预测力场与势能一致，天然满足能量守恒，并让力在旋转坐标时等变"
  - "为了避免使用原子间距离"
  - "为了把分子坐标固定到规则图像网格上"
answer: 1
explain: "力定义为势能对坐标的负梯度。SchNet 先预测旋转不变的能量，再自动微分得到力，因此力场是保守的，并与分子几何变换保持一致。"
```
