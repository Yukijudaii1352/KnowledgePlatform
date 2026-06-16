### PaiNN — 极化原子相互作用神经网络 (Polarizable Atom Interaction Neural Network)

```yaml
id: painn
name: PaiNN
full_name: "极速旋转等变消息传递 (Polarizable Atom Interaction NN)"
year: "2021"
org: "TU Berlin"
paper_url: "https://proceedings.mlr.press/v139/schutt21a.html"
category: gnn_representation
parent: schnet
motivation: "极速旋转等变提升力场效率"
```

#### 📝 一句话总结

PaiNN 在 SchNet 式连续滤波消息传递上加入标量-向量双表示，用笛卡尔向量特征实现旋转等变消息传递，在保持 \(O(|\mathcal{N}|)\) 邻域复杂度的同时传播方向信息，并高效预测能量、力、偶极矩、极化率等标量与张量性质。

#### 🎯 核心要点

- **双表示设计**：每个原子同时维护不变标量特征 \(\mathbf{s}_i\) 与等变向量特征 \(\vec{\mathbf{v}}_i\)，标量负责非线性，向量负责方向
- **不使用球谐/CG 张量积**：相比 TFN/Cormorant 等球谐等变模型，PaiNN 在笛卡尔空间中用向量缩放、线性组合、内积实现等变
- **线性复杂度方向传播**：用邻居方向 \(\mathbf{r}_{ij}/\|\mathbf{r}_{ij}\|\) 和向量特征传播角度信息，避免显式角度枚举的 \(O(|\mathcal{N}|^2)\)
- **Message + Update 交替结构**：message block 在邻居间传播标量/向量信息，update block 在原子内耦合标量与向量通道
- **保守力预测**：力通常由能量梯度 \(\mathbf{F}_i=-\partial E/\partial \mathbf{r}_i\) 得到，保证力场保守，适合稳定分子动力学
- **张量性质输出**：用 gated equivariant block 构造偶极矩与极化率张量，可用于 IR/Raman 光谱模拟
- **效率优势**：约 600k 参数，小于 DimeNet++ 约 1.8M；QM9 随机 50 分子批次推理从 45 ms 降到 13 ms

#### 🔬 深入细节

##### 核心架构示意图

![PaiNN 架构图](https://ar5iv.labs.arxiv.org/html/2102.03150/assets/x5.png)
*图 2：PaiNN 完整架构、message block 与 update block。来源为 ar5iv 转换的 arXiv:2102.03150 论文图。*

![PaiNN 方向信息传播示意](https://ar5iv.labs.arxiv.org/html/2102.03150/assets/x4.png)
*图 1：角度消息与方向消息的区别；等变方向表示可以在小截断半径下传播远程方向信息。*

##### 算法伪代码

```python
# PaiNN 核心前向流程
def painn_forward(Z, R, edge_index):
    # 标量特征由元素嵌入初始化，向量特征初始为 0
    s = atom_embedding(Z)                 # [n_atoms, F]
    v = zeros(n_atoms, F, 3)              # [n_atoms, F, xyz]

    for _ in range(num_interactions):
        # Message block: 邻居间传播标量与方向
        ds_msg = zeros_like(s)
        dv_msg = zeros_like(v)
        for i, j in edge_index:
            rij = R[j] - R[i]
            d = norm(rij)
            unit = rij / d
            w_s, w_vv, w_vs = radial_filter(d)  # RBF + cutoff + MLP

            ds_msg[i] += phi_s(s[j]) * w_s
            dv_msg[i] += v[j] * phi_vv(s[j]) * w_vv
            dv_msg[i] += phi_vs(s[j]) * w_vs * unit

        s = s + ds_msg
        v = v + dv_msg

        # Update block: 原子内耦合标量与向量
        Uv = linear_U(v)
        Vv = linear_V(v)
        scale = update_mlp(concat(s, norm(Vv)))
        a_ss, a_sv, a_vv = split(scale)

        s = s + a_ss + a_sv * dot(Uv, Vv)
        v = v + a_vv * Uv

    E = sum(atomwise_energy_head(s))
    F = -grad(E, R)                       # 保守力
    return E, F
```

##### 动机与背景

SchNet 类分子 GNN 使用连续滤波卷积，消息依赖原子间距离 \(\|\mathbf{r}_{ij}\|\)，天然满足旋转不变性。但只使用距离会丢掉方向信息，模型需要依靠多层传播间接恢复角度、扭转等几何关系。DimeNet 通过显式角度消息增强表达力，但枚举角度通常随邻居数二次增长。

PaiNN 的出发点是：如果原子表示不仅有标量，还保留一组会随坐标一起旋转的向量特征，那么模型可以在线性邻域复杂度内传播方向信息。对于方向消息，有如下直觉关系：

$$
\left\|\sum_{j=1}^{N}\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}\right\|^2
= \sum_{j=1}^{N}\sum_{k=1}^{N}
\left\langle
\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|},
\frac{\mathbf{r}_{ik}}{\|\mathbf{r}_{ik}\|}
\right\rangle
=\sum_{j,k}\cos\alpha_{jik}
$$

也就是说，先聚合方向向量，再通过内积或范数收缩回标量时，角度信息会自然出现；而方向聚合本身只需要遍历邻居一次。

##### 等变表示规则

PaiNN 把原子 \(i\) 的隐藏状态写成标量特征 \(\mathbf{s}_i\in\mathbb{R}^{F}\) 和向量特征 \(\vec{\mathbf{v}}_i\in\mathbb{R}^{F\times 3}\)。旋转矩阵 \(R\) 作用于空间维度时，标量保持不变，向量必须满足：

$$
\vec{\mathbf{f}}(R\vec{\mathbf{x}})=R\vec{\mathbf{f}}(\vec{\mathbf{x}})
$$

为了保持这个性质，PaiNN 只对标量通道使用普通 MLP/SiLU 非线性；向量通道只做线性组合、标量缩放、范数、内积等不会破坏等变性的操作。相比基于球谐函数和 Clebsch-Gordan 系数的等变模型，这种笛卡尔向量设计更简单、推理更快，也更适合需要百万步调用的分子动力学。

##### Message Block：邻居间传播方向

标量消息沿用 SchNet 的 continuous-filter convolution：

$$
\Delta \mathbf{s}_i^m
= \sum_j \boldsymbol{\phi}_s(\mathbf{s}_j)\circ \mathcal{W}_s(\|\mathbf{r}_{ij}\|)
$$

其中 \(\mathcal{W}_s\) 是由径向基函数和余弦截断构成的距离滤波器，\(\circ\) 是逐特征乘法。

向量消息包含两项：

$$
\Delta \vec{\mathbf{v}}_i^m
= \sum_j \vec{\mathbf{v}}_j\circ \boldsymbol{\phi}_{vv}(\mathbf{s}_j)\circ \mathcal{W}_{vv}(\|\mathbf{r}_{ij}\|)
+ \sum_j \boldsymbol{\phi}_{vs}(\mathbf{s}_j)\circ \mathcal{W}'_{vs}(\|\mathbf{r}_{ij}\|)
\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

第一项把已有向量特征从邻居传播过来，第二项从标量特征和相对方向生成新的向量特征。论文指出第二项可看成不变径向滤波器梯度的形式：

$$
\nabla \mathcal{W}_{vs}(\|\mathbf{r}_{ij}\|)
= \mathcal{W}'_{vs}(\|\mathbf{r}_{ij}\|)\frac{\mathbf{r}_{ij}}{\|\mathbf{r}_{ij}\|}
$$

这也是 PaiNN 名称中 polarizable 的直觉来源：原子的局域表示像可极化的多极矩，标量类似局域电荷，向量类似局域偶极。

##### Update Block：原子内耦合标量与向量

消息聚合后，PaiNN 在每个原子内部用 update block 混合 \(\mathbf{s}_i\) 和 \(\vec{\mathbf{v}}_i\)。标量残差为：

$$
\Delta \mathbf{s}_i^u
= \mathbf{a}_{ss}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)
+ \mathbf{a}_{sv}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)
\left\langle \mathbf{U}\vec{\mathbf{v}}_i,\mathbf{V}\vec{\mathbf{v}}_i \right\rangle
$$

向量残差为：

$$
\Delta \vec{\mathbf{v}}_i^u
= \mathbf{a}_{vv}\left(\mathbf{s}_i,\|\mathbf{V}\vec{\mathbf{v}}_i\|\right)\mathbf{U}\vec{\mathbf{v}}_i
$$

这里 \(\mathbf{U},\mathbf{V}\) 是特征维上的线性映射。向量范数与内积被收缩为标量，可安全地送入 MLP；MLP 输出的标量再去缩放向量，因此等变性仍然成立。

##### 张量性质与光谱模拟

对于标量能量，PaiNN 和 Behler-Parrinello/SchNet 一样使用原子贡献求和：

$$
E=\sum_{i=1}^{N}\epsilon(\mathbf{s}_i)
$$

对于力，论文在 MD17 等任务中使用能量负梯度：

$$
\mathbf{F}_i=-\frac{\partial E}{\partial \mathbf{r}_i}
$$

这样得到的力场是保守的，对分子动力学稳定性很重要。

对于张量输出，PaiNN 使用 gated equivariant block 构造秩 \(M\) 的张量：

$$
T=\sum_{i=1}^{N}\sum_{k=1}^{R}\lambda(\mathbf{s}_i)\,
\vec{\nu}(\vec{\mathbf{v}}_i)_{k,1}\otimes\cdots\otimes
\vec{\nu}(\vec{\mathbf{v}}_i)_{k,M}
$$

偶极矩可以写成局域偶极与局域电荷贡献之和：

$$
\boldsymbol{\mu}
= \sum_{i=1}^{N}\boldsymbol{\mu}_{\mathrm{atom}}(\vec{\mathbf{v}}_i)
+ q_{\mathrm{atom}}(\mathbf{s}_i)\mathbf{r}_i
$$

极化率张量则可写成：

$$
\boldsymbol{\alpha}
= \sum_{i=1}^{N}\alpha_0(\mathbf{s}_i)I_3
+ \vec{\nu}(\vec{\mathbf{v}}_i)\otimes\mathbf{r}_i
+ \mathbf{r}_i\otimes\vec{\nu}(\vec{\mathbf{v}}_i)
$$

这些张量输出被用于红外与 Raman 光谱模拟。论文报告乙醇单步电子结构计算约 140 秒，而 PaiNN 在 V100 上约 14 ms；阿司匹林从估计 25 年的参考模拟时间降到约 1 小时量级，体现了 4-5 个数量级的加速。

##### 实验结果与消融

在 QM9 上，PaiNN 对 12 个目标性质中的 6 个达到 SOTA，对另外 2 个与 DimeNet++ 接近；偶极矩 MAE 达到 0.012 D。它的参数量约 600k，明显小于 DimeNet++ 的约 1.8M，并且随机 50 个 QM9 分子的推理时间从 DimeNet++ 参考实现的 45 ms 降至 13 ms。

在 MD17 上，论文强调小样本设置：每个分子轨迹只用 950 个训练结构和 50 个验证结构。PaiNN 在仅用力训练时 14 个 energy/force 目标中有 12 个达到最低 MAE；在能量+力联合训练时也与 FCHL19 等核方法接近，说明等变神经网络可以同时兼顾小样本效率与大数据可扩展性。

消融实验在 aspirin MD 轨迹上验证了向量特征的作用：去掉 update 中的向量内积项、去掉 message 中的向量传播项都会增加误差；完全移除向量特征后，即使增加标量通道保持参数量，力 MAE 也从约 0.371 kcal/mol/Å 上升到 1.194 kcal/mol/Å。这个结果说明 PaiNN 的优势不仅来自参数量，而来自对方向信息的等变传播。

#### 🧪 练习题

```yaml
question: "PaiNN 为什么可以比显式角度消息更高效地传播几何方向信息？"
options:
  - "它完全不使用原子坐标，只使用元素编号"
  - "它用等变向量特征和邻居方向传播信息，复杂度随邻居数线性增长，而角度可由向量内积隐式恢复"
  - "它把所有分子转换成固定大小的二维图像"
  - "它直接预测所有键角标签作为监督信号"
answer: 1
explain: "PaiNN 的向量消息包含相对方向 r_ij/||r_ij||，聚合后通过范数或内积可以恢复角度信息，因此避免显式枚举所有邻居对的 O(|N|^2) 角度消息。"
```
