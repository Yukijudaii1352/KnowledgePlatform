### SchNet

```yaml
id: schnet
name: SchNet
full_name: SchNet (SchNet)
year: '2018'
org: TU Berlin
paper_url: https://aip.scitation.org/doi/10.1063/1.5019779
category: neural_operator
parent: —
motivation: 连续卷积滤波器实现分子3D建模
```

#### 📝 一句话总结

SchNet 提出了基于连续滤波卷积的分子神经网络，用距离生成的连续卷积核建模任意三维原子位置，解决了离散网格卷积难以处理分子几何和势能面不连续的问题。

#### 🎯 核心要点

- **连续滤波卷积 cfconv**：用滤波器生成网络 \(W(r)\) 根据原子间相对位置或距离动态产生卷积权重
- **3D 分子几何输入**：模型直接使用核电荷 \(Z_i\) 与原子坐标 \(\mathbf{r}_i\)，不需要将分子栅格化为体素
- **旋转与平移约束**：能量只依赖原子间距离 \(d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|\)，保证能量预测旋转、平移不变
- **Interaction Block**：多个残差交互模块逐步更新原子表示，捕捉从局部径向环境到复杂多体相互作用的层级信息
- **径向基展开**：将距离展开为 Gaussian RBF 后送入滤波器网络，减少初始滤波器相关性并改善训练
- **能量-力联合建模**：通过 \(\mathbf{F}_i=-\partial E/\partial \mathbf{r}_i\) 从能量模型导出守恒力场
- **平滑激活函数**：使用 shifted softplus，使势能面对坐标可微且足够平滑，适合力的梯度训练
- **多基准验证**：在 QM9、MD17、ISO17 上评估分子组成变化、构象变化以及二者结合的泛化能力

#### 🔬 深入细节

##### 架构总览

![SchNet 架构与连续滤波卷积示意图](https://ar5iv.labs.arxiv.org/html/1706.08566/assets/x2.png)
*图：SchNet 总体架构、interaction block 与 cfconv/filter-generating network。来源为论文 ar5iv 页面 Figure 2。*

论文来源：AIP/JCP DOI https://aip.scitation.org/doi/10.1063/1.5019779；arXiv 版本 https://arxiv.org/abs/1706.08566；可读 HTML 与图示来源 https://ar5iv.labs.arxiv.org/html/1706.08566。

传统 CNN 假设输入在规则网格上，例如图像像素或音频采样点；分子却是由不规则三维坐标中的原子组成。如果先把原子放进体素网格，会引入分辨率、插值和旋转处理问题。SchNet 的核心做法是把卷积核从离散张量推广为连续函数：卷积权重不是固定查表，而是由原子之间的连续距离生成。

对第 \(l\) 层，原子 \(i\) 的表示记为 \(\mathbf{x}_i^l \in \mathbb{R}^F\)。初始表示来自核电荷嵌入：

$$\mathbf{x}_i^0 = \mathbf{a}_{Z_i}$$

其中 \(\mathbf{a}_{Z_i}\) 是元素类型 \(Z_i\) 的可学习 embedding。SchNet 不使用原子编号，因此天然满足原子排列不变性的要求。

##### 连续滤波卷积

SchNet 的 interatomic continuous-filter convolution 可以写作：

$$\mathbf{x}_i^{l+1} = \sum_{j=1}^{n} \mathbf{x}_j^l \circ W^l(\mathbf{r}_i - \mathbf{r}_j)$$

其中 \(\circ\) 是逐通道乘法，\(W^l(\cdot)\) 是由神经网络参数化的连续滤波器。为了让能量预测对旋转不变，论文实际使用距离：

$$d_{ij}=\|\mathbf{r}_i-\mathbf{r}_j\|$$

$$\mathbf{x}_i^{l+1} = \sum_{j=1}^{n} \mathbf{x}_j^l \circ W^l(d_{ij})$$

这样如果整个分子被平移或旋转，所有 \(d_{ij}\) 不变，能量输出也不变。力是能量对坐标的负梯度，因此会随坐标旋转而等变。

距离先通过 Gaussian radial basis function 展开：

$$e_k(d_{ij}) = \exp\!\left(-\gamma(d_{ij}-\mu_k)^2\right), \quad k=1,\ldots,K$$

再输入两层 dense 网络和 shifted softplus 得到滤波器：

$$W^l(d_{ij}) = \mathrm{MLP}^l([e_1(d_{ij}),\ldots,e_K(d_{ij})])$$

RBF 展开相当于给连续距离提供一组平滑“刻度”，让滤波器网络更容易区分短程、中程和长程相互作用。

##### 核心算法伪代码

```python
# SchNet forward pass for molecular energy and forces
def schnet_forward(Z, R, num_interactions=3):
    # Z: nuclear charges, R: atom coordinates
    x = atom_embedding(Z)
    D = pairwise_distances(R)  # D[i, j] = ||R_i - R_j||
    rbf = gaussian_rbf_expand(D)

    for block in range(num_interactions):
        z = atomwise_dense[block][0](x)
        filters = filter_mlp[block](rbf)
        v = sum_over_neighbors(z[j] * filters[:, j] for j in atoms)
        v = atomwise_dense[block][1](shifted_softplus(v))
        x = x + v  # residual interaction update

    atom_energies = atomwise_output(x)
    energy = atom_energies.sum()
    forces = -grad(energy, R)
    return energy, forces
```

##### Interaction Block 如何形成多体表示

一个 interaction block 由 atom-wise dense、cfconv、atom-wise dense 以及残差连接组成。Atom-wise layer 对每个原子独立使用同一组权重：

$$\mathbf{y}_i = W\mathbf{x}_i + \mathbf{b}$$

这种共享保证模型对分子大小可扩展，也不会依赖原子编号。cfconv 将周围原子的距离调制信息聚合到中心原子；后续 atom-wise 层重新组合通道。残差形式可以表示为：

$$\mathbf{x}_i^{l+1} = \mathbf{x}_i^l + \mathcal{I}^l_i(\{\mathbf{x}_j^l, d_{ij}\}_{j=1}^{n})$$

多层 interaction block 的直觉是：第一层主要学习局部径向环境，后续层在已经更新过的原子表示上继续传播信息，从而逐渐形成复杂多体相互作用。虽然滤波器只显式依赖两两距离，但连续多轮交互可以表达更高阶的化学环境。

##### 能量预测与守恒力场

SchNet 将总能量写成原子贡献之和：

$$\hat{E} = \sum_i \hat{E}_i$$

这个设计同时满足分子大小可变和原子排列不变。更重要的是，力不由单独网络直接输出，而是由能量对坐标求导得到：

$$\hat{\mathbf{F}}_i = -\frac{\partial \hat{E}}{\partial \mathbf{r}_i}$$

由于力来自同一个标量势能，模型预测的力场天然是能量守恒的。训练时可单独训练能量，也可联合训练能量与力：

$$\mathcal{L}
= \rho\,\|\hat{E}-E\|_2^2
+ \frac{1-\rho}{3N}\sum_{i=1}^{N}\|\hat{\mathbf{F}}_i-\mathbf{F}_i\|_2^2$$

其中 \(\rho\) 控制能量和力的权重。联合训练虽然需要对能量模型求梯度，计算成本更高，但在分子动力学数据上能显著提升数据效率和泛化。

##### 为什么需要 shifted softplus

SchNet 需要对坐标至少二阶可微：训练力损失时，力本身是一阶梯度，优化参数时还要对力误差反传。ReLU 这类分段线性激活会带来不光滑点，不适合平滑势能面。论文使用 shifted softplus：

$$\mathrm{ssp}(x)=\ln(0.5e^x+0.5)$$

它在 \(x=0\) 附近有平滑行为，且满足 \(\mathrm{ssp}(0)=0\)，有助于稳定训练。这个细节体现了 SchNet 面向物理建模的核心约束：不仅要预测数值，还要让预测随坐标变化得合理、连续、可导。

##### 与 MPNN/DTNN/离散卷积的区别

MPNN 可以使用键类型或距离分桶作为边特征，但分桶会使势能面对坐标产生不连续变化，难以用于力场。DTNN 已经使用原子距离建模相互作用，但 SchNet 用连续滤波卷积将这一思想系统化为更接近 CNN 的可扩展架构，并用 interaction block 与原子能量分解实现端到端能量/力预测。

SchNet 的贡献可以概括为：把“卷积核”从固定网格上的离散权重变成距离条件化的连续函数。这样它既保留了卷积的局部共享归纳偏置，又能处理分子中任意位置、任意数量的原子。

> 💡 关键：SchNet 的几何约束来自“只用距离生成滤波器”。这同时带来平移/旋转不变的能量、旋转等变的力，以及可以随原子坐标平滑变化的势能面。

#### 🧪 练习题

```yaml
question: "SchNet 使用原子间距离生成连续滤波器的最直接好处是什么？"
options:
  - "让能量预测对整体旋转和平移保持不变，并避免离散网格带来的不连续性"
  - "让模型完全不需要反向传播即可训练"
  - "强制所有分子的原子数量必须相同"
  - "把分子图转换成 SMILES 字符串后再建模"
answer: 0
explain: "距离在整体旋转和平移下不变；连续滤波器随距离平滑变化，因此比离散网格或距离分桶更适合能量和力的建模。"
```
