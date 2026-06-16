### EquiformerV3: 高效、表达性与通用性的 SE(3) 等变图注意力 Transformer

```yaml
id: equiformerv3
name: EquiformerV3
full_name: 等变Transformer V3 (EquiformerV3)
year: '2026.04'
org: Atomic Architects
paper_url: https://arxiv.org/abs/2604.09130
category: catalyst
parent: equiformerv2
motivation: 5.9倍训练效率提升，SwiGLU-S²激活函数
```

#### 📝 一句话总结

EquiformerV3 在 EquiformerV2 基础上通过实现级融合、merged layer normalization、平滑 cutoff 注意力和 SwiGLU-\(S^2\) activation 同时提升训练效率、势能面平滑性与高阶表达力，使等变 Transformer 更适合 OC20、OMat24 和 Matbench Discovery 等大规模原子模拟任务。

#### 🎯 核心要点

- **实现优化带来 1.75× 加速**：将 \(SO(2)\) linear 中的排列矩阵融合进旋转矩阵 \(\widetilde{D}_{ij}=S D_{ij}\)，并修复动态 shape 以启用 `torch.compile()`
- **训练效率 5.9× 对比**：在与更深、更长训练的 EquiformerV2 对比时，EquiformerV3 达到相近 force MAE，同时按论文计算节省约 5.9× 训练时间
- **Equivariant merged layer normalization**：用所有 degree 共享的 merged RMS 归一化，进一步保留 \(L=0\) 与 \(L>0\) 之间的相对幅值
- **FFN 容量重新分配**：利用节点级 FFN 比边级 tensor product 便宜的特点，将 FFN hidden size 提高 4×，以较小训练开销增加模型容量
- **Smooth radius cutoff attention**：把 envelope function 同时放进 softmax 分子/分母和 value message，避免邻居进出 cutoff 时注意力权重突变
- **SwiGLU-\(S^2\) activation**：在球面网格上用标量 sigmoid 门控两个 grid feature 的乘法，引入 many-body 交互，同时减少保持严格等变所需的网格采样
- **面向平滑 PES 和高阶导数**：严格等变和平滑 cutoff 使模型更适合能量守恒模拟、梯度力、应力和热导率等依赖势能面高阶导数的任务
- **DeNS 辅助训练**：在直接预测训练中加入非平衡结构去噪任务，提高对扰动构型和材料弛豫工作流的泛化

#### 🔬 深入细节

![EquiformerV3 架构](https://arxiv.org/html/2604.09130v1/figure/equiformer_v3.png)
*图：EquiformerV3 架构。论文 Figure 1 标出实现融合、attention、embedding、FFN 和 SwiGLU-\(S^2\) 等改动。*

![SwiGLU-S2 激活](https://arxiv.org/html/2604.09130v1/figure/swiglu_s2_activation_v2.png)
*图：gate activation、\(S^2\) activation 和 SwiGLU-\(S^2\) activation 对比。SwiGLU-\(S^2\) 在球面 grid feature 上同时使用标量非线性门控和乘法交互。*

##### 从 EquiformerV2 到 V3 的核心问题

EquiformerV2 证明了高阶等变 Transformer 在 OC20 上有效，但仍有三个限制。第一，eSCN/\(SO(2)\) 操作的实现中存在重复排列和动态图开销，训练成本高。第二，直接预测单点能量/力的模型不一定生成光滑势能面；当原子跨过 cutoff 半径时，如果邻居集合变化导致 softmax 分母突变，能量和力可能不连续。第三，V2 的 \(S^2\) activation 虽然更强，但直接对球面 grid 施加非线性会引入高频成分，保持严格等变需要较密的采样网格。

EquiformerV3 的设计目标是同时处理这三类问题：把软件路径变快，把注意力变平滑，把激活函数变得既有更高 body-order 表达力又更容易保持严格等变。

##### 软件优化：融合冗余操作

EquiformerV2 的 eSCN 卷积对每条边先用旋转矩阵 \(D_{ij}\) 将特征转到边坐标系，再用 \(SO(2)\) linear。原实现中还需要排列矩阵 \(S\) 调整 degree/order 的存储顺序。EquiformerV3 直接预融合：

$$
\widetilde{D}_{ij}=S\cdot D_{ij}
$$

$$
SO(2)\_\mathrm{Linear}(S\cdot(D_{ij}x))
= SO(2)\_\mathrm{Linear}((S\cdot D_{ij})x)
= SO(2)\_\mathrm{Linear}(\widetilde{D}_{ij}x)
$$

这样所有后续 \(SO(2)\) linear 都不再显式执行排列。再配合预计算常量张量、为 scatter 指定输出 shape 等改动，模型可以使用 `torch.compile()`，论文报告在 OC20 训练中实现约 1.75× 加速且精度保持一致。

##### Merged layer normalization

V2 的 separable LN 分开处理标量和高阶通道，而 V3 进一步把所有 degree 的 RMS 合并成一个共享分母。设输入 irreps 特征为 \(x\in\mathbb{R}^{(L_{\max}+1)^2\times C}\)，先计算每个 degree 的 RMS：

$$
\sigma^{(0)}=
\sqrt{\frac{1}{C}\sum_{i=1}^{C}(x^{(0)}_{0,i}-\mu^{(0)})^2}
$$

$$
\sigma^{(L)}=
\sqrt{\frac{1}{C}\sum_{i=1}^{C}\frac{1}{2L+1}
\sum_{m=-L}^{L}(x^{(L)}_{m,i})^2}
$$

再合并：

$$
\sigma =
\sqrt{\frac{1}{L_{\max}+1}\sum_{L=0}^{L_{\max}}(\sigma^{(L)})^2}
$$

输出为：

$$
y^{(0)}=\gamma^{(0)}\circ\frac{x^{(0)}-\mu^{(0)}}{\sigma}+\beta^{(0)},\quad
y^{(L)}=\gamma^{(L)}\circ\frac{x^{(L)}}{\sigma}
$$

这比逐 degree 归一化更少破坏 degree 间相对大小，也比 V2 的二分归一化更统一。

##### 平滑 cutoff 注意力

普通注意力权重为：

$$
a_{ij}=
\frac{\exp(z_{ij})}{\sum_{k\in\mathcal{N}(i)}\exp(z_{ik})}
$$

如果只在最终 message 上乘 envelope，当某个邻居进入或离开 cutoff，softmax 分母仍会突变。EquiformerV3 将 envelope 放进注意力归一化本身：

$$
a_{ij}
=
\frac{\mathrm{env}(\|\vec{r}_{ij}\|)\exp(z_{ij})}
{\sum_{k\in\mathcal{N}(i)}\mathrm{env}(\|\vec{r}_{ik}\|)\exp(z_{ik})}
$$

$$
m_{ij}=a_{ij}\times
\left(\mathrm{env}(\|\vec{r}_{ij}\|)\cdot v_{ij}\right)
$$

这样当距离接近 cutoff 时，对 softmax 分子、分母和值向量的贡献都会连续衰减到 0。对单点 S2EF MAE 来说收益可能不显著，但对能量守恒模拟、力的梯度一致性和 Matbench Discovery 中的声子/热导率高阶导数更关键。

##### SwiGLU-\(S^2\) activation

\(S^2\) activation 将 irreps 投影到单位球面、在 grid 上施加非线性，再投影回 irreps：

$$
x^{grid}(\phi,\theta)
=
\sum_{L=0}^{L_{\max}}\sum_{m=-L}^{L}
Y^{(L)}_m(\phi,\theta)x^{(L)}_m
$$

$$
y^{(L)}_m
=
\int_0^{2\pi}\int_0^\pi
y^{grid}(\phi,\theta)Y^{(L)}_m(\phi,\theta)\sin\theta\,d\theta\,d\phi
$$

V3 的新点是把快速 tensor product 的思想融入激活：两个 irreps 投影到球面后，grid feature 的逐点乘法等价于 irreps 空间中的一类 self tensor product：

$$
z^{grid}(\phi,\theta)=x_1^{grid}(\phi,\theta)\odot x_2^{grid}(\phi,\theta)
$$

论文提出的 SwiGLU-\(S^2\) 写作：

$$
\mathrm{SwiGLU}\text{-}S^2(x_{\mathrm{scalar}},x_1^{grid},x_2^{grid})
=
\sigma(x_{\mathrm{scalar}})\cdot x_1^{grid}\odot x_2^{grid}
$$

其中 \(\sigma(\cdot)\) 是 sigmoid，非线性只作用在标量门控上，grid feature 本身只做双线性乘法。这有两点好处：乘法引入 many-body/self tensor product 交互，提高理论表达力；标量非线性避免向球面 grid 注入高频成分，因此在 \(L_{\max}=6\) 时可以把 attention 的 grid 点数从 V2 的 \(18\times18=324\) 降到 \(8\times20=160\)，仍保持严格等变。

##### 前向传播伪代码

```python
# EquiformerV3 block 的核心路径
def equiformerv3_block(x, positions, edge_index):
    out = zeros_like(x)
    for i, j in edge_index:
        r_ij = positions[j] - positions[i]
        env = smooth_envelope(norm(r_ij))

        # 1. 融合排列后的旋转矩阵
        D_tilde = fused_permuted_rotation(r_ij)  # S @ D_ij
        h = D_tilde @ concat(x[i], x[j])

        # 2. SO(2) linear 得到 attention scalar 与 irreps value 输入
        f_scalar, f_irreps = split(so2_linear_1(h))
        z_ij = attn_linear(leaky_relu(layer_norm(f_scalar)))

        # 3. smooth cutoff softmax：env 同时进入分子和分母
        a_ij = smooth_cutoff_softmax(z_ij, env, center=i)

        # 4. SwiGLU-S2 value：标量门控 + grid feature 乘法
        x_scalar, x_grid_1, x_grid_2 = prepare_s2_features(f_irreps)
        v_grid = sigmoid(x_scalar) * x_grid_1 * x_grid_2
        v_irreps = from_sphere(v_grid)
        v_irreps = so2_linear_2(v_irreps)

        # 5. value message 也乘 envelope，再旋回全局坐标系
        m_ij = inverse(D_tilde) @ (a_ij * env * v_irreps)
        out[i] += m_ij

    x = x + out
    x = equivariant_merged_layer_norm(x)
    x = x + ffn_with_swiglu_s2(x, hidden_multiplier=4)
    return x
```

##### DeNS 与直接/梯度训练

V3 继续区分 direct prediction 和 gradient prediction：direct 直接预测力/应力，训练快且适合大规模预训练；gradient 通过能量对坐标/晶胞求导得到力/应力，更符合保守势能面。论文在 OMat24 和 Matbench Discovery 中采用 direct pre-training + gradient fine-tuning，并在 direct 阶段加入 DeNS 辅助任务，让模型从非平衡扰动结构中恢复噪声方向。

> 💡 关键：V3 的“通用性”不是只看 OC20 单点 MAE，而是让同一个等变 Transformer 同时适应催化吸附、材料非平衡结构、结构弛豫、热导率等需要平滑 PES 与高阶导数的任务。

##### 实验数字如何理解

在 OC20 S2EF-2M 消融中，V3 从 EquiformerV2 baseline 的 energy 296 meV、force 21.23 meV/Å、270 H100 GPU-hours 出发；改为预测 total energy 后 force 降到 19.73；实现优化把训练时间降到 154 GPU-hours；merged LN、FFN hidden 扩大、smooth cutoff 和 SwiGLU-\(S^2\) 后达到 energy 201 meV、force 18.15 meV/Å、171 GPU-hours。论文进一步与更深、训练更久的 V2 设置比较，给出约 \(270/171\times1.5\times2.5\approx5.9\) 倍训练时间节省。

这说明 EquiformerV3 的进步不是单一 trick：软件优化降低成本，merged LN 和 FFN 调参改善优化，smooth cutoff 改善物理连续性，SwiGLU-\(S^2\) 同时增加表达力并降低等变采样成本。几项改动组合后，才得到更好的精度-速度-物理一致性权衡。

#### 🧪 练习题

```yaml
question: "EquiformerV3 的 SwiGLU-S² activation 相比 EquiformerV2 的普通 S² activation，关键优势是什么？"
options:
  - "完全取消等变约束，从而提升速度"
  - "用标量非线性门控和 grid feature 乘法引入 many-body 交互，同时减少保持严格等变所需的球面采样"
  - "只改变数据集切分，不改变模型结构"
  - "将所有力预测改为随机采样"
answer: 1
explain: "SwiGLU-S² 的乘法等价于一类 self tensor product，可提升 body-order 表达力；非线性只作用于标量门控，避免 grid 上高频误差，从而降低严格等变所需采样成本。"
```
