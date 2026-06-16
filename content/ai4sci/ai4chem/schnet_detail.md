### SchNet: 连续滤波卷积网络

```yaml
id: schnet
name: SchNet
full_name: 连续滤波卷积网络 (SchNet)
year: '2017'
org: TU Berlin
paper_url: https://arxiv.org/abs/1706.08566
category: representation
parent: mpnn
motivation: 引入连续滤波器处理原子间距离信息
```

#### 📝 一句话总结

SchNet 提出了 continuous-filter convolution（cfconv），用由原子间连续距离生成的滤波器替代离散网格卷积，解决分子中原子坐标不规则、不能固定到像素网格的问题。它把分子能量写成原子贡献之和，并通过能量对坐标求负梯度得到守恒力场，成为早期 3D 分子图神经网络的重要基线。

#### 🎯 核心要点

- **连续滤波卷积**：滤波器 \(W(d_{ij})\) 由距离 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|_2\) 经径向基展开和小型 MLP 生成，而不是在固定格点上学习离散卷积核
- **交互块堆叠**：每层 interaction block 通过 atom-wise dense、cfconv、shifted softplus 和残差更新原子表示 \(\mathbf{x}_i^{(l)}\)
- **旋转/平移不变**：cfconv 只依赖相对距离，分子能量预测天然对全局旋转和平移不变
- **置换不变读出**：最终预测为 \(\hat{E}=\sum_i \hat{E}_i\)，对原子顺序置换不敏感，也支持不同大小分子
- **能量-力联合训练**：力由 \(\hat{\mathbf{F}}_i=-\nabla_{\mathbf{r}_i}\hat{E}\) 得到，联合能量和力监督可保证预测力是保守场
- **Gaussian 距离展开**：用多个高斯中心把标量距离映射成平滑径向特征，提升滤波器生成网络对距离变化的分辨率
- **基准覆盖化学与构象变化**：在 QM9、MD17 和论文新提出的 ISO17 上验证，覆盖平衡分子、单分子动力学轨迹和跨异构体构象变化

#### 🔬 深入细节

##### 核心架构示意

![SchNet 架构图](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 架构总览。左侧是原子嵌入与多层 interaction block，中间展示 interaction block 内部，右侧展示由距离特征生成连续滤波器的 cfconv。图源为 ar5iv 对 arXiv:1706.08566 的 HTML 渲染。*

##### 算法伪代码

```python
# SchNet 前向传播与能量/力训练核心逻辑
def schnet_forward(atom_numbers, positions, cutoff, n_interactions):
    # 1. 原子类型嵌入
    x = embedding(atom_numbers)  # x_i^(0)

    # 2. 构建距离邻接，SchNet 只使用距离而非角度或二面角
    pairs = [(i, j) for i != j if norm(positions[i] - positions[j]) < cutoff]
    d_ij = {pair: norm(positions[pair[0]] - positions[pair[1]]) for pair in pairs}

    # 3. 多层交互块
    for l in range(n_interactions):
        messages = zeros_like(x)
        for i, j in pairs:
            rbf = gaussian_rbf(d_ij[(i, j)])          # e_k(d_ij)
            filt = filter_network_l(rbf)              # W_l(d_ij)
            messages[i] += dense_in_l(x[j]) * filt    # cfconv 聚合
        x = x + dense_out_l(shifted_softplus(messages))

    # 4. 原子能量读出并求和
    atomic_energy = readout_mlp(x)  # E_i
    energy = atomic_energy.sum()
    return energy

def training_step(atom_numbers, positions, target_energy, target_forces):
    pred_energy = schnet_forward(atom_numbers, positions, cutoff=5.0, n_interactions=6)
    pred_forces = -grad(pred_energy, positions)
    loss = rho * mse(pred_energy, target_energy)
    loss += (1 - rho) / (3 * len(atom_numbers)) * mse(pred_forces, target_forces)
    return loss
```

##### 动机与背景：为什么不能直接用普通卷积？

图像卷积的核心假设是数据位于规则网格上，同一个滤波器可以在像素平面平移复用。分子结构不满足这个条件：原子位置是 \(\mathbb{R}^3\) 中的任意点，距离连续变化，且分子整体旋转和平移不应改变能量。若把空间粗暴离散化到体素网格，会引入分辨率误差；若只用离散邻接矩阵，又会丢失决定量子相互作用强弱的连续距离信息。

SchNet 的解决方式是把卷积核从“离散格点上的参数表”改成“距离的连续函数”。对每一对原子 \(i,j\)，模型先计算距离 \(d_{ij}\)，再用滤波器生成网络产生 \(W(d_{ij})\)。这样，两个原子只要距离有细微变化，卷积权重也会平滑变化，因此适合分子动力学轨迹中的连续构象变化。

##### 核心机制：continuous-filter convolution

连续滤波卷积可写为：

$$
\mathbf{x}_i' = \sum_{j \in \mathcal{N}(i)} \mathbf{x}_j \odot W(d_{ij})
$$

其中 \(\mathbf{x}_j\) 是邻居原子的隐藏表示，\(\odot\) 是逐元素乘法，\(W(d_{ij})\) 是由距离生成的通道级滤波器。为了让小型 MLP 更容易学习距离函数，SchNet 先把距离投影到 Gaussian radial basis：

$$
e_k(d_{ij})=\exp\left[-\gamma(d_{ij}-\mu_k)^2\right], \quad k=1,\ldots,K
$$

然后经两层 dense 网络和 shifted softplus 生成滤波器：

$$
W(d_{ij})=\operatorname{MLP}_{\theta}\left([e_1(d_{ij}),\ldots,e_K(d_{ij})]\right),
\qquad
\operatorname{ssp}(x)=\ln(0.5e^x+0.5)
$$

> 💡 关键：SchNet 并没有显式输入键类型、键角或二面角；它让多个 interaction block 通过距离调制的邻居聚合逐步形成高阶原子环境表示。

##### 交互块与读出

每个 interaction block 都是残差形式：先对原子表示做 atom-wise 变换，再通过 cfconv 聚合邻域几何信息，最后再经过 atom-wise 非线性层回写到 \(\mathbf{x}_i\)。这种结构的好处是把“跨原子交互”和“单原子通道混合”拆开，前者由距离滤波器控制，后者由普通全连接层控制。

分子级能量采用原子贡献求和：

$$
\hat{E}(Z,R)=\sum_{i=1}^{N}\hat{E}_i(\mathbf{x}_i^{(T)})
$$

求和读出带来两个重要性质：第一，原子排列顺序改变不会改变 \(\hat{E}\)；第二，模型可以自然处理不同原子数的分子。对需要原子力的数据集，SchNet 不单独训练一个力头，而是令：

$$
\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{r}_i}
$$

这使得预测力来自同一个势能面，满足能量守恒约束。联合训练损失通常写成：

$$
\mathcal{L}
= \rho\left\|E-\hat{E}\right\|_2^2
+ \frac{1-\rho}{3N}\sum_{i=1}^{N}\left\|\mathbf{F}_i-\hat{\mathbf{F}}_i\right\|_2^2
$$

##### 与 MPNN 和后续 3D GNN 的区别

从消息传递视角看，SchNet 是一种边特征由距离连续生成的 MPNN：消息不仅取决于邻居表示，也取决于两原子的 3D 距离。相较于早期只使用二维分子图拓扑的 MPNN，它能区分同一拓扑下的不同构象；相较于 DimeNet、GemNet 等后续方法，它没有显式建模键角和二面角，因此表达复杂方向性相互作用时需要更多层通过距离间接推断。

这也解释了 SchNet 的历史地位：它把“分子是连续 3D 点云”这一事实引入可微消息传递框架，奠定了后续 3D 分子表示模型的接口形式，即输入原子序数 \(Z\) 和坐标 \(R\)，输出能量、性质或力。

#### 🧪 练习题

```yaml
question: "SchNet 中 continuous-filter convolution 的主要作用是什么？"
options:
  - "把分子坐标离散化成 3D 体素图像后使用普通 CNN"
  - "根据原子间连续距离生成卷积滤波器，使消息传递能平滑感知 3D 几何"
  - "显式计算所有键角和二面角作为输入特征"
  - "只根据原子类型预测分子性质，不使用坐标"
answer: 1
explain: "SchNet 的 cfconv 由距离 d_ij 生成滤波器 W(d_ij)，避免固定网格离散化，并让能量随原子坐标连续变化。"
```
