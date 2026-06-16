### CANNs — 本构神经网络 (Constitutive Artificial Neural Networks)

```yaml
id: canns
name: CANNs
full_name: 本构神经网络 (Constitutive Artificial Neural Networks)
year: '2021'
org: ETH Zurich
paper_url: https://doi.org/10.1016/j.jcp.2020.109841
category: solid_mechanics
parent: —
motivation: 应变能密度嵌入确保本构稳定
```

#### 📝 一句话总结

CANNs 将超弹性材料的应变能密度 \(\Psi\) 作为神经网络输出，再通过连续介质力学关系自动微分得到应力，使模型在训练时直接尊重客观性、参考态零能量、结构张量和不可压缩约束等本构建模先验。

#### 🎯 核心要点

- **以能量为中心**：网络学习 \(\Psi(\mathbf{F}, \text{extra})\)，而不是直接黑箱拟合应力，第一 Piola-Kirchhoff 应力由 \( \mathbf{P}=\partial \Psi / \partial \mathbf{F} \) 生成
- **连续介质先验硬编码**：由变形梯度 \(\mathbf{F}\) 计算右 Cauchy-Green 张量 \(\mathbf{C}\)、广义结构张量 \(\mathbf{H}_r\)、广义不变量 \(I_r,J_r,I_3\)
- **支持各向同性与各向异性**：无偏好方向时退化为各向同性不变量网络；有额外微结构特征时，方向子网络和权重子网络生成偏好方向与结构张量权重
- **参考态归零**：用同一 \(\Psi\) 网络计算参考构型能量并相减，强制 \(\Psi(\mathbf{I})=0\)
- **不可压缩处理**：对不可压缩材料加入拉格朗日乘子项，从等容应力中扣除压力自由度，得到满足边界条件的 \(\mathbf{P}\)
- **训练目标简洁**：论文/代码示例用单轴曲线的 \(P_{11}\) 均方误差训练，但完整模型可输出 \(\Psi,\mathbf{P},\mathbf{S},\boldsymbol{\sigma}\)
- **多源信息融合**：能够同时利用应力-应变数据、材料理论先验和微结构/加工等额外特征，提高少数据下的泛化

#### 🔬 深入细节

##### 可访问来源与核心示意图

任务给出的 DOI `10.1016/j.jcp.2020.109841` 与公开 CANN 记录不一致；TUHH 机构库和官方代码仓库均指向 Journal of Computational Physics 429:110010，Publisher DOI 为 `10.1016/j.jcp.2020.110010`。本文方法解读以 TUHH 论文记录 https://tore.tuhh.de/entities/publication/33f32797-d1c3-452e-95a2-5e3709e4d1d7 和官方代码仓库 https://github.com/ConstitutiveANN/CANN 为可访问来源，同时保留上方 YAML 中的任务元信息不改动。

![CANN 完整模型图](https://raw.githubusercontent.com/ConstitutiveANN/CANN/master/output/GeneralizedMooneyRivlin/GeneralizedMooneyRivlin_modelGraph_Full.png)
*图：官方仓库输出的 Generalized Mooney-Rivlin 示例模型图。图中先由 \(\mathbf{F}\) 计算不变量，再经 \(\Psi\) 子网络得到应变能，最后用自动微分和连续介质公式生成应力。*

![CANN 示例拟合结果](https://raw.githubusercontent.com/ConstitutiveANN/CANN/master/output/GeneralizedMooneyRivlin/GeneralizedMooneyRivlin_result.png)
*图：官方仓库中 Generalized Mooney-Rivlin 数据的主曲线结果，用于展示 CANN 对应力-伸长曲线的拟合。*

##### 算法伪代码

```python
# CANN 超弹性本构建模伪代码
def build_generalized_invariants(F, extra=None):
    C = transpose(F) @ F
    I3 = det(C)

    if extra is None:
        # 各向同性: 只使用单位结构张量 H0 = I / 3
        H = [eye(3) / 3.0]
    else:
        # 各向异性: 由微结构/材料额外特征预测偏好方向和权重
        dirs = normalize(direction_net(extra))        # l_i
        L = [outer(l_i, l_i) for l_i in dirs]         # L_i = l_i \otimes l_i
        weights = normalize_sum(weight_net(extra))    # w_ri
        H = [sum(w_ri * L_i for i, L_i in enumerate([eye(3)/3] + L))
             for r in range(num_tensors)]

    I = [trace(C @ H_r) for H_r in H]
    J = [trace(cofactor(C) @ H_r) for H_r in H]
    return I, J, I3

def cann_forward(F, extra=None, incompressible=True):
    I, J, I3 = build_generalized_invariants(F, extra)
    I0, J0, I30 = build_generalized_invariants(eye(3), extra)

    psi = psi_net(I, J, I3, extra)
    psi_ref = psi_net(I0, J0, I30, extra)
    psi = psi - psi_ref                         # enforce Psi(reference)=0

    P_iso = autodiff_grad(psi, F)               # dPsi / dF
    if incompressible:
        P_ref = autodiff_grad(psi_ref, eye(3))
        pressure = P_ref[0, 0]
        P = P_iso - pressure * inverse(transpose(F))
    else:
        P = P_iso

    S = inverse(F) @ P
    sigma = (P @ transpose(F)) / det(F)
    return psi, P, S, sigma

for batch in stress_strain_data:
    _, P, _, _ = cann_forward(batch.F, batch.extra)
    loss = mean((P[:, 0, 0] - batch.P11_target) ** 2)
    optimizer.step(loss)
```

##### 方法机制解释

普通 ANN 做材料本构时，最直接的做法是把应变或变形梯度输入网络，让网络直接输出应力。这种做法虽然灵活，但会把客观性、参考构型、材料对称性、应力由能量导出等物理结构交给数据自己“学出来”。CANNs 的核心判断是：本构建模并不是任意函数逼近问题，超弹性材料的应力应该来自一个应变能势函数。因此网络先学习标量能量 \(\Psi\)，再由力学公式生成张量应力。

基本变形测度从变形梯度开始：

$$
\mathbf{C}=\mathbf{F}^{\mathsf{T}}\mathbf{F}, \qquad
I_3=\det(\mathbf{C}).
$$

对各向异性材料，CANN 不直接把所有张量分量丢给 MLP，而是构造结构张量。若方向子网络输出单位向量 \(\mathbf{l}_i\)，则

$$
\mathbf{L}_i=\mathbf{l}_i\otimes\mathbf{l}_i.
$$

再用权重子网络给出归一化权重 \(w_{ri}\)，形成广义结构张量：

$$
\mathbf{H}_r=\sum_i w_{ri}\mathbf{L}_i,
\qquad
\sum_i w_{ri}=1.
$$

这样网络不是随意编码“方向”，而是以材料结构张量进入不变量。对应广义不变量为：

$$
I_r=\operatorname{tr}(\mathbf{C}\mathbf{H}_r),
\qquad
J_r=\operatorname{tr}(\operatorname{cof}(\mathbf{C})\mathbf{H}_r).
$$

\(\Psi\) 子网络以 \(\{I_r\},\{J_r\},I_3\) 以及可选的额外材料特征为输入。官方实现中，\(\Psi\) 子网络对 \(I\) 与 \(J\) 分支使用 softplus 激活，再拼接并线性输出标量能量。参考态能量通过同一个网络在 \(\mathbf{F}=\mathbf{I}\) 上评估：

$$
\Psi_{\text{CANN}}(\mathbf{F})
=
\Psi_\theta(I,J,I_3,\text{extra})
-
\Psi_\theta(I_0,J_0,I_{3,0},\text{extra}).
$$

这一步很重要：它不依赖数据额外告诉模型“参考态能量为零”，而是在架构层面把 \(\Psi(\mathbf{I})=0\) 写进去。

随后应力由自动微分给出：

$$
\mathbf{P}_{\text{iso}}
=
\frac{\partial \Psi_{\text{CANN}}}{\partial \mathbf{F}}.
$$

对不可压缩材料，需要扣除压力型约束项。官方实现用参考构型的等容应力估计拉格朗日乘子 \(p\)，并构造：

$$
\mathbf{P}
=
\mathbf{P}_{\text{iso}}
-p\mathbf{F}^{-\mathsf{T}}.
$$

之后可以继续得到第二 Piola-Kirchhoff 应力与 Cauchy 应力：

$$
\mathbf{S}=\mathbf{F}^{-1}\mathbf{P},
\qquad
\boldsymbol{\sigma}
=
\frac{1}{J}\mathbf{P}\mathbf{F}^{\mathsf{T}},
\qquad
J=\det(\mathbf{F}).
$$

> 💡 关键：CANN 的“物理嵌入”不是简单给 loss 加正则项，而是改变函数参数化。网络只能通过应变能势函数、结构张量和不变量产生应力，因此输出空间天然比黑箱 ANN 更接近可接受本构模型。

训练时，论文/代码中的单轴示例只用 \(P_{11}\) 与目标曲线做 MSE：

$$
\mathcal{L}(\theta)
=
\frac{1}{N}\sum_{n=1}^N
\left(
P_{11,\theta}^{(n)}-P_{11,\text{data}}^{(n)}
\right)^2.
$$

这看起来只监督了一个应力分量，但因为 \(P_{11}\) 是从同一个 \(\Psi_\theta\) 自动微分而来，训练信号会反向更新整个能量网络。完整模型在推理时仍然能输出 \(\Psi,\mathbf{P},\mathbf{S},\boldsymbol{\sigma}\)，这比直接拟合某个加载路径上的标量应力更适合嵌入有限元材料点计算。

与普通材料网络相比，CANN 的优势来自三个层次。第一，输入层使用 \(\mathbf{C}\) 和不变量，降低了旋转坐标系变化带来的学习负担。第二，网络输出的是能量，保证应力与切线来自同一势函数，避免不同应力分量互相矛盾。第三，额外特征通过方向和权重子网络影响结构张量，使微结构信息能改变材料各向异性，而不是只作为普通标量标签拼到末端。

#### 🧪 练习题

```yaml
question: "CANNs 为什么先学习应变能密度 Psi，而不是直接输出应力张量？"
options:
  - "因为应变能是标量，训练速度一定比所有张量模型快"
  - "因为应力可由 Psi 对变形梯度自动微分得到，从架构上嵌入超弹性本构关系"
  - "因为这样可以完全不需要应力-应变训练数据"
  - "因为结构张量只能从应力张量计算，不能从变形梯度计算"
answer: 1
explain: "CANN 的核心是用 Psi 作为势函数并通过 P=dPsi/dF 生成应力，使模型满足能量一致的本构结构；它仍然需要数据训练 Psi 网络参数。"
```
