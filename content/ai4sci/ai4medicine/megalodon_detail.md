### Megalodon — 混合去噪扩散 (Megalodon)

```yaml
id: megalodon
name: Megalodon
full_name: 混合去噪扩散 (Megalodon)
year: '2026'
org: NVIDIA/CMU
paper_url: https://pubs.rsc.org/en/content/articlelanding/2026/dd/d5dd00289c
category: generation
parent: diffsbdd
motivation: 混合去噪提升有效生成49倍
```

#### 📝 一句话总结

Megalodon 提出一个面向 3D 分子生成的可扩展 Transformer 架构，把连续 3D 坐标与离散原子类型、键类型、形式电荷联合去噪，解决了许多几何生成模型“2D 图有效但 3D 构象质量差”的问题。它还把同一架构放到扩散与流匹配两种目标下比较，并通过混合时间噪声与自条件机制显著提升大分子有效生成和低能构象质量。

#### 🎯 核心要点

- **多模态分子表示**：同时生成坐标 \(X\)、原子类型 \(H\)、键类型 \(E\) 与形式电荷 \(C\)，而不是先生成点云再用 OpenBabel 推断化学键
- **融合式 Invariant Transformer**：把结构特征、原子特征、键特征分别嵌入后融合为 token，用多头注意力建模离散分子拓扑的全局依赖
- **轻量等变结构更新层**：Transformer 更新离散不变量，EGNN 距离更新与 cross-product 项更新 3D 坐标，使结构预测保持旋转/平移等变并增强手性相关几何表达
- **扩散与流匹配统一评估**：同一 Megalodon 架构分别训练为 diffusion 和 flow matching 版本，扩散版结构/能量更强，流匹配版推理步数更少、2D 稳定性更好
- **混合时间噪声设计**：连续坐标与离散图特征使用独立噪声时间 \(t_{\text{continuous}}\)、\(t_{\text{discrete}}\)，缓解传统单时间扩散中“前半程键特征几乎无信息”的训练浪费
- **自条件外层包装**：先预测一次 \(x_{\text{sc}}\)，再把它与当前噪声状态融合后第二次预测，提升训练收敛和 3D 分子生成稳定性
- **面向真实 3D 质量的评估**：除了 atom stability、molecule stability、RDKit validity，还加入键角/二面角分布、条件构象 RMSD、xTB 能量等更贴近物理的指标
- **大分子泛化提升**：40M 参数版本在大分子设置下相对强基线生成最多 49 倍更多有效分子，并得到 2-10 倍更低的结构能量

#### 🔬 深入细节

##### 模型架构总览

![Megalodon 架构示意图](https://arxiv.org/html/2505.18392v1/x1.png)
*图：Megalodon 的核心架构。分子被拆为 3D 坐标、原子类型、键类型和形式电荷；各模态分别嵌入后送入融合式 Invariant Transformer，离散头预测原子/键/电荷，结构头通过 EGNN 层更新坐标并细化键。任务给定 RSC 链接可访问到论文页面；更完整的方法图与公式可见 arXiv HTML: https://arxiv.org/html/2505.18392v1。*

##### 算法核心流程

```python
# Megalodon 联合连续/离散去噪伪代码
for batch in geom_drugs_loader:
    X, H, E, C = batch.coords, batch.atom_types, batch.bond_types, batch.charges

    # 1. 连续坐标与离散拓扑使用独立噪声时间
    t_x = sample_time_distribution()
    t_g = sample_time_distribution()

    X_t = continuous_noise(X, t_x)          # Gaussian diffusion 或 FM interpolant
    H_t = discrete_noise(H, t_g)            # atom type D3PM / DFM
    E_t = discrete_noise(E, t_g)            # bond type D3PM / DFM
    C_t = discrete_noise(C, t_g)            # formal charge D3PM / DFM

    # 2. 自条件：先粗预测，再把预测残差注入输入
    with torch.no_grad():
        M_sc = megalodon(X_t, H_t, E_t, C_t, t_x, t_g)
    X_in, H_in, E_in, C_in = residual_self_condition((X_t, H_t, E_t, C_t), M_sc)

    # 3. 融合式 Transformer 更新离散表示，EGNN 结构层更新坐标
    X_pred, H_logits, E_logits, C_logits = megalodon(X_in, H_in, E_in, C_in, t_x, t_g)

    # 4. 联合连续与离散目标
    loss_x = mse_or_flow_loss(X_pred, X, t_x)
    loss_h = cross_entropy(H_logits, H)
    loss_e = cross_entropy(E_logits, E)
    loss_c = cross_entropy(C_logits, C)
    loss = w_x * loss_x + w_h * loss_h + w_e * loss_e + w_c * loss_c

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 推理：从噪声坐标和离散先验开始，迭代反向去噪或解 ODE
M_t = sample_prior(num_atoms)
for step in reverse_schedule:
    M_t = megalodon_reverse_update(M_t, step)
return sanitize_and_evaluate(M_t)
```

##### 动机与背景

3D 分子生成不是普通图生成：模型必须同时给出化学拓扑和三维构象。早期 3D 扩散模型常把原子坐标与原子类型作为主要生成对象，再依赖 OpenBabel 等工具从几何距离推断键；这会把模型错误、后处理偏差和评估偏差混在一起。后续方法开始直接生成键，但很多架构仍更偏几何消息传递，离散拓扑的长程组合模式建模不足，导致小分子指标不错、大分子或低能构象质量下降。

Megalodon 的判断是：3D 分子生成的难点不是单纯“坐标去噪”，而是 **连续几何与离散化学图之间要互相校正**。原子类型和键决定可行局部几何，几何距离和角度又反过来帮助判断键/电荷是否合理。因此它用 Transformer 主干处理离散不变量，用等变层处理坐标，把两个部分反复耦合。

##### 架构机制：Transformer 管拓扑，EGNN 管结构

每个分子记为：

$$
\mathbf{M} = (X, H, E, C)
$$

其中 \(X \in \mathbb{R}^{N \times 3}\) 是原子坐标，\(H\) 是原子类型，\(E\) 是键类型邻接张量，\(C\) 是形式电荷。Megalodon 先分别嵌入结构特征、原子特征、键特征和电荷特征，再聚合为 Transformer token。融合式 Invariant Transformer 负责全局注意力：

$$
Z' = \text{MHA}(\text{AdaLN}(Z, t)) + Z
$$

这里 \(t\) 是噪声时间嵌入，AdaLN 让同一网络在不同噪声强度下改变归一化尺度和偏置。离散模态通过 MLP head 输出原子/键/电荷 logits；坐标不是由普通 MLP 直接回归，而是交给结构层更新：

$$
x_i^{\ell+1}
= x_i^{\ell}
+ \sum_{j \ne i} (x_i^{\ell}-x_j^{\ell}) \, \phi_d(h_i, h_j, e_{ij}, d_{ij})
+ \sum_{j,k} \big((x_i-x_j) \times (x_i-x_k)\big)\phi_c(\cdot)
$$

第一项类似 EGNN 的距离加权更新，天然保持平移/旋转等变；cross-product 项提供方向性几何信号，对三维构象、二面角和手性相关结构更有帮助。论文强调这个 cross-product 对性能很关键。

##### 训练目标：连续坐标 + 离散图的共同去噪

连续坐标可以用扩散或流匹配来训练。用统一插值写法表示：

$$
X_t = \alpha_t X_0 + \beta_t X_1
$$

其中 \(X_0\) 是噪声样本，\(X_1\) 是真实数据。扩散版本使用余弦噪声日程和 DDPM 风格目标；流匹配版本学习把噪声分布推到数据分布的向量场，常写作预测终点或速度：

$$
\mathcal{L}_{X}
= \mathbb{E}_{t, X_t}\left[\lVert \hat{X}_{1|t} - X_1\rVert_2^2\right]
$$

离散原子、键和电荷则用 D3PM/离散流匹配的交叉熵目标：

$$
\mathcal{L}_{\text{disc}}
= \mathcal{L}_{H}^{\text{CE}}
+ \mathcal{L}_{E}^{\text{CE}}
+ \mathcal{L}_{C}^{\text{CE}}
$$

总损失可概括为：

$$
\mathcal{L}
= \lambda_X \mathcal{L}_{X}
+ \lambda_H \mathcal{L}_{H}^{\text{CE}}
+ \lambda_E \mathcal{L}_{E}^{\text{CE}}
+ \lambda_C \mathcal{L}_{C}^{\text{CE}}
$$

> 💡 **关键：** Megalodon 的“混合”不是把两种模型简单串联，而是在同一反向生成过程中同时更新坐标和拓扑，并允许两类模态使用不同噪声时间，使模型学会“给定较清晰拓扑补结构”或“给定较清晰结构补拓扑”等更多互补场景。

##### 为什么要分离连续时间和离散时间

论文指出，若坐标和离散图共用单一时间变量，采用数据先验的扩散目标会出现一个反直觉现象：在相当一部分时间区间里，键预测几乎总是“无键”，离散边特征对结构学习没有提供有效信息。只有当坐标误差已经很低时，键准确率才突然上升。这会削弱 2D 拓扑对 3D 结构的引导。

Megalodon 因此采样两个时间：

$$
t_{\text{continuous}} \sim p(t), \qquad
t_{\text{discrete}} \sim p(t)
$$

并分别用于坐标插值和离散 noising。这样训练集中会出现更多组合：清晰拓扑 + 噪声坐标、噪声拓扑 + 清晰坐标、两者都中等噪声等。模型不能只依赖某一个模态，而必须学习跨模态补全。

##### 自条件机制

Megalodon 使用外层 wrapper 做 self-conditioning：

$$
\begin{aligned}
x_{\text{sc}} &= \text{model}(x_t) \\
x_t' &= \text{MLP}([x_{\text{sc}}, x_t]) + x_t \\
x_{\text{pred}} &= \text{model}(x_t')
\end{aligned}
$$

对于 3D 分子，self-conditioning 分别作用在 \(X,H,E,C\) 上：结构分量用无偏置线性层，离散分量使用 raw logits 而不是 one-hot 结果。直觉上，第一次预测提供“模型认为最终分子大概在哪里”的草图，第二次预测再利用草图修正细节。

##### 与 DiffSBDD/传统 3D 扩散模型的区别

传统基于扩散的 3D 分子生成通常强调等变 GNN 如何从噪声坐标恢复分子，离散拓扑要么被弱化，要么依赖后处理。Megalodon 的区别有三点：

- 它把离散拓扑当作一等公民，用 Transformer 建模原子/键/电荷的全局依赖
- 它在一个框架下同时比较 diffusion 与 flow matching，避免“架构变了、目标也变了”导致的归因不清
- 它引入更偏物理的结构评估，尤其是能量和条件构象任务，而不只看 RDKit validity 或 atom stability

实验上，论文报告 Megalodon 在 GEOM-Drugs 上提升 2D/3D 质量；40M 参数模型在大分子生成时相对先前最佳模型可产生最多 49 倍更多有效大分子，并且结构能量低 2-10 倍。Megalodon Quick/flow 类设置则展示了减少采样步数后的吞吐优势，说明该架构不仅能提升质量，也能配合更快的流式采样。

##### 局限性

Megalodon 仍然保留全连接边特征，因此边存储和注意力相关计算会随原子数快速增长；大分子扩展仍受内存与二次/更高阶边建模成本限制。论文也承认 3D 分子生成基准本身仍不完善，特别是药物发现真正关心的可合成性、靶标结合、溶解性和毒性并未被这个无条件生成任务完全覆盖。

#### 🧪 练习题

```yaml
question: "Megalodon 为什么要为连续坐标和离散图特征采样不同的噪声时间？"
options:
  - "为了让模型在推理时完全跳过离散键预测"
  - "为了增加跨模态噪声组合，使拓扑和几何能互相补全，而不是被单一时间日程绑定"
  - "为了把所有离散变量转换成连续坐标后统一回归"
  - "为了避免使用任何等变神经网络层"
answer: 1
explain: "单一时间日程会让某些阶段的键特征几乎没有信息；分离时间后，模型会见到清晰拓扑配噪声坐标等多种组合，从而学习连续几何和离散拓扑的相互约束。"
```
