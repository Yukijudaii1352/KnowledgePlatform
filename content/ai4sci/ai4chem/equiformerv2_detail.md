### EquiformerV2: 面向高阶表示的等变 Transformer

```yaml
id: equiformerv2
name: EquiformerV2
full_name: 等变Transformer V2 (EquiformerV2)
year: '2023'
org: Atomic Architects
paper_url: https://arxiv.org/abs/2306.12059
category: catalyst
parent: gemnet_oc
motivation: SE(3)等变图注意力，OC20 SOTA性能
```

#### 📝 一句话总结

EquiformerV2 在 Equiformer 的 SE(3)/E(3) 等变图注意力框架中引入 eSCN 高效卷积、attention re-normalization、separable \(S^2\) activation 和 separable layer normalization，使等变 Transformer 能在 OC20 上使用更高阶 irreps 表示并刷新能量/力预测性能。

#### 🎯 核心要点

- **高阶等变表示扩展**：用 eSCN convolution 替换传统 \(SO(3)\) tensor product，使 \(L_{\max}\) 可扩展到 6 或 8，以捕获更高角分辨率的局部几何
- **等变图注意力保留 Transformer 结构**：节点特征是 irreps feature，边消息通过旋转到局部边坐标系、\(SO(2)\) linear、再旋回全局坐标系实现等变传播
- **Attention re-normalization**：在注意力 logits 的非线性和 softmax 前额外加入 LN，稳定高阶表示带来的输入尺度变化
- **Separable \(S^2\) activation**：将标量 \(L=0\) 与高阶 \(L>0\) 通道分开激活，避免直接 \(S^2\) activation 的梯度不稳定，同时比 gate activation 更能混合不同 degree
- **Separable Layer Normalization**：标量通道使用标准 LN，高阶通道共享 RMS 归一化，保留不同高阶 degree 之间的相对幅值
- **统一能量/力输出**：能量通过节点标量读出并求和，力可以由 degree-1 等变输出直接预测，也可用于后续 AdsorbML 弛豫流程
- **OC20/OC22 数据效率**：论文报告在 OC20 上相对既有 SOTA 最高约 9% force、4% energy 改进，并在 AdsorbML 中减少约 2 倍 DFT 计算需求

#### 🔬 深入细节

![EquiformerV2 总体架构](https://arxiv.org/html/2306.12059v3/extracted/5453842/figures/equiformer_v2.png)
*图：EquiformerV2 总览。红色部分标出相对 Equiformer 的修改：eSCN/\(SO(2)\) convolution、attention re-normalization、edge-degree embedding 变化和 separable \(S^2\) FFN。*

![EquiformerV2 激活与归一化](https://arxiv.org/html/2306.12059v3/extracted/5453842/figures/activation.png)
*图：gate activation、\(S^2\) activation 与 separable \(S^2\) activation 的差异。*

##### 动机与背景

Equiformer 的核心思想是把 Transformer 的注意力和 FFN 替换成等变版本，使每个原子节点维护从 \(L=0\) 到 \(L_{\max}\) 的 irreps 特征。\(L=0\) 是旋转不变的标量，\(L=1\) 类似向量，高阶 \(L\) 则编码更细的角向变化。对力预测而言，高阶角信息很重要，因为原子力对局部几何方向高度敏感。

问题在于传统 \(SO(3)\) tensor product 的复杂度随 \(L_{\max}\) 快速上升。原始 Equiformer 在 OC20 这类大规模体系上难以使用很高的 \(L_{\max}\)，导致表达力受限。EquiformerV2 的主线就是：保留 Equiformer 的注意力式消息传递，同时用 eSCN 的高效 \(SO(2)\) 计算方式降低高阶 irreps 的成本。

##### eSCN 卷积如何替代昂贵 tensor product

传统等变卷积要把输入 irreps 与相对位置的球谐函数做 Clebsch-Gordan tensor product。eSCN 的思路是先把边方向 \(\vec{r}_{ij}\) 旋转到固定轴，此时许多 spherical harmonic 分量变稀疏，复杂的 \(SO(3)\) 交互可以降为沿 order \(m\) 的 \(SO(2)\) linear 操作。

对边 \((i,j)\)，EquiformerV2 的消息计算可以抽象为：

$$
\tilde{x}_{ij} = D_{ij}[x_i \Vert x_j]
$$

$$
f_{ij} = SO(2)\text{-Linear}(\tilde{x}_{ij} \odot \phi_r(\|\vec{r}_{ij}\|))
$$

其中 \(D_{ij}\) 是由边方向确定的旋转矩阵，\(\phi_r\) 是由距离径向基经 MLP 得到的边距离嵌入。得到的 \(f_{ij}\) 被拆成标量部分 \(f_{ij}^{(0)}\) 和高阶 irreps 部分 \(f_{ij}^{(L)}\)，分别用于注意力权重和值向量。

##### Attention re-normalization

高阶 \(L_{\max}\) 增大后，计算注意力 logits 的输入通道数也随之增大，直接进入 LeakyReLU 和 softmax 会导致尺度不稳。EquiformerV2 在 \(f_{ij}^{(0)}\) 上加入一层 LN：

$$
z_{ij} = w_a^\top \mathrm{LeakyReLU}(\mathrm{LN}(f_{ij}^{(0)}))
$$

$$
a_{ij} = \mathrm{softmax}_j(z_{ij})
= \frac{\exp(z_{ij})}{\sum_{k\in\mathcal{N}(i)}\exp(z_{ik})}
$$

注意力消息随后写为：

$$
m_{ij} = D_{ij}^{-1}(a_{ij} \cdot v_{ij})
$$

这里 \(v_{ij}\) 是经过 separable \(S^2\) activation 和第二个 \(SO(2)\) linear 得到的等变值向量。旋转回原坐标系的步骤保证输出随输入旋转而等变。

##### Separable \(S^2\) activation

gate activation 只用标量门控高阶 irreps，主要是 \(L=0\) 对 \(L>0\) 的调制；当模型使用 \(L_{\max}=6/8\) 时，这种激活对高阶之间的混合不足。\(S^2\) activation 则先把 irreps 投影到球面采样网格，在网格上施加普通非线性，再投影回 irreps：

$$
y = G^{-1}(F(G(x)))
$$

其中 \(G\) 表示 ToSphere，\(G^{-1}\) 表示 FromSphere。直接替换为 \(S^2\) activation 会产生大梯度和训练不稳定，因此 EquiformerV2 做了分离设计：一部分 \(L=0\) 标量直接经过 SiLU，另一部分 \(L=0\) 与 \(L>0\) 一起进入 \(S^2\) activation，最后拼接输出并丢弃辅助标量分支。这保留了高阶混合能力，又避免了直接 \(S^2\) 非线性的优化问题。

##### Separable Layer Normalization

原始等变 LN 对每个 degree 独立归一化，容易抹掉不同 degree 之间的相对强弱。EquiformerV2 改为：

$$
y^{(0)} = \gamma^{(0)} \circ \frac{x^{(0)}-\mu^{(0)}}{\sigma^{(0)}} + \beta^{(0)}
$$

$$
y^{(L)} = \gamma^{(L)} \circ \frac{x^{(L)}}{\sigma^{(L>0)}} \quad (L>0)
$$

$$
\sigma^{(L>0)} =
\sqrt{\frac{1}{L_{\max}}\sum_{L=1}^{L_{\max}}(\sigma^{(L)})^2}
$$

这意味着所有高阶 degree 共享一个 RMS 分母，而不是各自被拉到同一尺度。直觉上，模型可以保留“哪个角频率更重要”的信息。

##### 前向传播伪代码

```python
# EquiformerV2 单个 Transformer block 的核心逻辑
def equiformerv2_block(x, positions, edge_index):
    messages = []
    for i, j in edge_index:
        r_ij = positions[j] - positions[i]
        D_ij = rotation_to_edge_frame(r_ij)
        radial = radial_mlp(gaussian_rbf(norm(r_ij)))

        # 1. 旋转到边坐标系并用 SO(2) linear 替代 SO(3) tensor product
        h_ij = concat(x[i], x[j])
        h_local = D_ij @ h_ij
        f_ij = so2_linear_1(h_local * radial)

        # 2. 标量部分计算注意力权重
        f_scalar, f_irreps = split_scalar_and_irreps(f_ij)
        z_ij = attn_linear(leaky_relu(layer_norm(f_scalar)))
        a_ij = neighborhood_softmax(z_ij, center=i)

        # 3. 高阶部分计算 value，并旋回全局坐标系
        v_ij = separable_s2_activation(f_irreps)
        v_ij = so2_linear_2(v_ij)
        m_ij = inverse(D_ij) @ (a_ij * v_ij)
        messages.append((i, m_ij))

    x = x + aggregate(messages)
    x = separable_layer_norm(x)
    x = x + ffn_with_separable_s2(x)
    return x
```

##### 与 GemNet-OC 的差异

GemNet-OC 的强项是几何消息传递工程化：距离、角度、二面角、多层级邻居图和 OC20 特化优化。EquiformerV2 则把注意力机制与群表示结合起来，让节点内部显式维护可旋转的高阶 irreps 通道。它不需要手工枚举所有二面角路径，而是通过高阶等变表示和 \(SO(2)\) 消息传递学习角向响应。

> 💡 关键：EquiformerV2 的性能并不是“把 eSCN 放进 Equiformer”自动得到的。论文消融显示，单纯使用 eSCN 高阶卷积并不能优于 eSCN 基线；attention re-normalization、separable \(S^2\) activation 和 separable LN 是让高阶表示真正可训练、可利用的必要组件。

##### 训练和应用意义

在 OC20 S2EF-2M 消融中，EquiformerV2 的 force MAE 随 \(L_{\max}\)、训练 epoch 和 Transformer block 数增加而稳定下降，说明高阶表示确实提供了有效角信息。更重要的是，EquiformerV2 在 AdsorbML 这类工作流中可以减少 DFT 单点确认次数：模型越能准确排序和弛豫候选吸附构型，越少需要昂贵 DFT 去修正错误局部极小值。

#### 🧪 练习题

```yaml
question: "EquiformerV2 中 separable S² activation 的主要作用是什么？"
options:
  - "完全移除所有高阶 irreps，只保留标量特征"
  - "在避免直接 S² activation 训练不稳定的同时，加强不同 degree 等变特征之间的非线性混合"
  - "把原子图转换成 SMILES 字符串再训练 Transformer"
  - "只改变输出层，不影响注意力和 FFN"
answer: 1
explain: "直接 S² activation 更有表达力但在 Equiformer 中会出现大梯度和不收敛。separable 设计把标量与高阶路径分开处理，使高阶混合可训练。"
```
