### PropMolFlow — 性质引导分子流 (PropMolFlow)

```yaml
id: propmolflow
name: PropMolFlow
full_name: 性质引导分子流 (PropMolFlow)
year: '2026'
org: University of Florida
paper_url: https://www.drugtargetreview.com/news/152614/ai-model-generates-drug-molecules-10-times-faster/
category: generation
parent: targetdiff
motivation: 性质引导生成速度提升10倍
```

#### 📝 一句话总结

PropMolFlow 提出基于 geometry-complete SE(3)-equivariant flow matching 的性质引导 3D 分子生成方法，把目标性质编码成高维嵌入并注入原子标量特征，从而直接生成满足目标量子化学性质的分子。相比扩散式性质引导方法，它用更短的确定性流路径采样，在保持结构有效性的同时把推理步数从约 1000 步降到 100 步。

#### 🎯 核心要点

- **基于 FlowMol 的条件生成扩展**：从无条件 geometry-complete flow matching 扩展到 property-guided molecule generation
- **完整分子模态建模**：联合生成 3D 坐标 \(X\)、原子类型 \(A\)、形式电荷 \(C\) 与键阶 \(E\)，显式处理 bond order 和 charge
- **SE(3)-GVP 架构**：使用 geometric vector perceptron 更新节点标量、节点向量、坐标和边特征，保持旋转/平移等变并支持手性相关几何
- **性质嵌入机制**：把标量性质 \(k\) 经可选 Gaussian expansion 和 MLP 映射到与节点标量同维的 property embedding
- **五种融合操作**：系统比较 Concatenation、Sum、Multiply、Concatenate + Sum、Concatenate + Multiply，不同性质可选择不同最优嵌入方式
- **联合 flow matching 损失**：连续坐标用线性插值与终点预测损失，离散原子/电荷/键阶用带 mask token 的 CTMC 离散流匹配交叉熵
- **QM9 六性质评估**：针对 \(\alpha\)、\(\Delta\epsilon\)、\(\epsilon_{\text{HOMO}}\)、\(\epsilon_{\text{LUMO}}\)、\(\mu\)、\(C_v\) 进行条件生成
- **DFT 验证闭环**：不仅用 GVP/EGNN predictor 打分，还对筛选样本做 DFT 单点和结构弛豫，检查性质预测器偏差
- **采样速度提升**：ID 任务中使用 100 个 Euler 步，相比扩散基线 1000 步至少约 8 倍加速，并接近新闻报道所说的约 10 倍速度提升

#### 🔬 深入细节

##### 来源与方法图

任务给定链接是新闻页；可追溯到 Nature Computational Science 论文 *PropMolFlow: property-guided molecule generation with geometry-complete flow matching*，DOI 为 `10.1038/s43588-025-00946-y`，公开 arXiv 版本为 https://arxiv.org/html/2505.21469v4，代码仓库为 https://github.com/Liu-Group-UF/PropMolFlow。

![PropMolFlow 方法总览](https://arxiv.org/html/2505.21469v4/x1.png)
*图：PropMolFlow 的整体方法。分子图包含节点标量特征、节点坐标和边键阶；目标性质经 Gaussian expansion 与 MLP 形成 property embedding，再通过五种交互方式之一注入节点标量特征；联合 flow matching 同时更新坐标、原子类型、电荷和键阶。*

##### 算法核心流程

```python
# PropMolFlow 条件 flow matching 训练伪代码
for molecule, target_property in qm9_loader:
    X1, A1, C1, E1 = molecule.coords, molecule.atom_types, molecule.charges, molecule.bond_orders
    k = target_property

    # 1. 性质编码：可选 Gaussian expansion + MLP
    if use_gaussian_expansion:
        gk = gaussian_expand(k, centers, width)
    else:
        gk = k
    P = property_mlp(gk)

    # 2. 构造连续与离散中间状态
    t = uniform(0, 1)
    X0 = sample_standard_gaussian_like(X1)
    X_t = (1 - t) * X0 + t * X1
    A_t = mask_or_data_interpolant(A1, t)
    C_t = mask_or_data_interpolant(C1, t)
    E_t = mask_or_data_interpolant(E1, t)

    # 3. 将性质嵌入注入节点标量特征
    node_scalar = combine([A_t, C_t], P, mode="sum/multiply/concat/concat_sum/concat_multiply")
    graph_t = fully_connected_graph(X_t, node_scalar, E_t)

    # 4. SE(3)-GVP denoiser 预测终点模态
    X_hat, A_logits, C_logits, E_logits = gvp_denoiser(graph_t, t)

    # 5. 联合损失：坐标回归 + 离散交叉熵
    L_X = norm(X_hat - X1)
    L_A = cross_entropy(A_logits, A1)
    L_C = cross_entropy(C_logits, C1)
    L_E = cross_entropy(E_logits, E1)
    loss = 3.0 * L_X + 0.4 * L_A + 1.0 * L_C + 2.0 * L_E

    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 推理：给定目标性质和原子数，用 100 步 Euler 积分生成分子
state = initialize_masked_discrete_and_gaussian_coords(num_atoms)
for t in torch.linspace(0, 1, 100):
    pred = gvp_denoiser(condition_with_property(state, k), t)
    state = euler_flow_update_or_ctmc_step(state, pred, t)
return filter_by_stability_rdkit_posebusters_closed_shell(state)
```

##### 动机与背景

性质引导分子生成希望“先给需求，再找结构”：例如给定极化率、HOMO-LUMO gap、偶极矩或热容，让模型直接生成符合目标性质的 3D 分子。此前扩散模型在条件生成上表现强，但推理需要很多随机反向步；无条件 flow matching 采样更快，却还没有充分解决 property-guided 3D 分子生成。

PropMolFlow 的核心思路是把 FlowMol 的 geometry-complete SE(3) 流匹配变成条件模型：不把性质只粗暴拼接到输入，而是先把标量性质变成与节点标量同维的嵌入，再让它与原子类型/电荷特征发生可选的加法、乘法或拼接交互。这样性质约束可以在每个 GVP 更新块中影响图结构和坐标演化。

##### 联合 flow matching 目标

PropMolFlow 把分子表示为：

$$
M = (X, A, C, E)
$$

其中 \(X\) 是连续原子坐标，\(A\) 是原子类型，\(C\) 是形式电荷，\(E\) 是键阶。整体目标是学习条件分布：

$$
p_1(M \mid k)
$$

其中 \(k\) 是目标性质。对连续坐标，采用线性 interpolant：

$$
X_t = \alpha_t X_0 + \beta_t X_1,
\qquad \alpha_t = 1-t,\quad \beta_t=t
$$

噪声端 \(X_0\) 来自标准高斯：

$$
p_0(X)=\prod_{i=1}^{N}\mathcal{N}(X_0^i\mid \mathbf{0}, I_3)
$$

模型直接预测终点坐标 \(\hat{X}_{1|t}^{\theta}\)，坐标损失为：

$$
\mathcal{L}_{X}
= \mathbb{E}_{t,p_t(X_t|X_0,X_1),\pi(X_0,X_1)}
\left[\lVert \hat{X}_{1|t}^{\theta}-X_1\rVert\right]
$$

其中 \(\pi(X_0,X_1)\) 是 optimal transport coupling，用来减少随机初态和数据样本之间的交叉路径。

##### 离散模态：CTMC + mask token

原子类型、电荷和键阶是离散变量，PropMolFlow 使用 continuous-time Markov chain (CTMC) 离散流匹配。以原子类型为例，状态空间增加一个 mask token \(M\)，条件路径为：

$$
p_t(A_t^i \mid A_0,A_1)
= \alpha_t \delta(A_t^i,A_1^i)
+ \beta_t \delta(A_t^i,M)
$$

离散训练目标是交叉熵：

$$
\mathcal{L}_{\text{CE}}
= \mathbb{E}_{t,p_{t|1}(x_t|z),p_z}
\left[-\log p_{1|t}^{\theta}(x_1^i\mid x_t)\right]
$$

最终四个模态加权：

$$
\mathcal{L}
= \eta_X\mathcal{L}_X
+ \eta_A\mathcal{L}_A
+ \eta_C\mathcal{L}_C
+ \eta_E\mathcal{L}_E
$$

论文采用：

$$
(\eta_X,\eta_A,\eta_C,\eta_E)=(3.0,0.4,1.0,2.0)
$$

这个权重体现了坐标和键阶对结构有效性的高影响，同时仍保留原子类型和形式电荷的离散监督。

##### 性质嵌入与五种融合方式

给定标量性质值 \(\tau_k\)，模型先构造 property embedding：

$$
P = \phi_{\text{prop}}(k)
$$

如果启用 Gaussian expansion，则先把标量展开成多个高斯基函数响应：

$$
f_k =
\phi_{\text{GE}}
\left(
\left[
\exp\left(
-\frac{(\tau_k-(\tau_{\min}+n_g d))^2}{2d^2}
\right)
\right]_{0\le n_g \le (\tau_{\max}-\tau_{\min})/d}
\right)
$$

然后把 \(P\) 与节点标量特征 \([A_t,C_t]\) 交互。五种候选包括：

- **Concatenation**：\(\varphi_\theta([A_t,C_t]\oplus P)\)
- **Sum**：\([A_t,C_t]+P\)
- **Multiply**：\([A_t,C_t]\odot(\sigma(P)+0.5)\)，乘子限制在 \([0.5,1.5]\)
- **Concatenate + Sum**：先拼接映射回原维度，再加到节点标量
- **Concatenate + Multiply**：先拼接映射回原维度，再作为乘性门控

因为性质嵌入只作用在节点标量特征上，坐标向量不被直接破坏，所以 SE(3) 等变性仍由 GVP 主干保持。

##### GVP 结构更新

每个节点包含坐标 \(x_i\in\mathbb{R}^3\)、标量特征 \(s_i=[a_i:c_i]\) 和向量特征 \(v_i\in\mathbb{R}^{c\times 3}\)。每个 update block 依次做消息生成、节点更新、坐标更新和边更新。一个简化写法是：

$$
m_{i\to j}^{(s)},m_{i\to j}^{(v)}
= \psi_M\left(
[s_i^{(\ell)}:e_{ij}^{(\ell)}:d_{ij}^{(\ell)}],
\left[v_i:\frac{x_i^{(\ell)}-x_j^{(\ell)}}{d_{ij}^{(\ell)}}\right]
\right)
$$

$$
x_i^{(\ell+1)}
= x_i^{(\ell)}
+ \psi_P(s_i^{(\ell+1)},v_i^{(\ell+1)})
$$

$$
e_{ij}^{(\ell+1)}
= \text{LN}\left(
e_{ij}^{(\ell)}
+ \text{MLP}(s_i^{(\ell+1)},s_j^{(\ell+1)},d_{ij}^{(\ell+1)})
\right)
$$

GVP 中的 vector cross-product 让模型不是 E(3) reflection-equivariant，而是 SE(3)-equivariant，因此能表达镜像不等价的手性信息。

##### 数据、评估与 DFT 校验

PropMolFlow 在修正后的 QM9 SDF 上训练，显式包含氢原子、键阶和形式电荷。作者发现原始分发版本中约 3 万个分子存在键阶或电荷不一致问题，因此重新修正为 charge-neutral、closed-shell、valency-consistent 数据，并拆分为训练、验证、测试以及与生成器 disjoint 的性质预测器训练集。

条件生成评估覆盖六个 QM9 量子化学性质：极化率 \(\alpha\)、HOMO-LUMO gap \(\Delta\epsilon\)、HOMO 能量 \(\epsilon_{\text{HOMO}}\)、LUMO 能量 \(\epsilon_{\text{LUMO}}\)、偶极矩 \(\mu\)、热容 \(C_v\)。论文同时比较 EEGSDE、EquiFM、GeoLDM、GCDM、JODO 等基线。PropMolFlow 在 \(\alpha\) 与 \(\Delta\epsilon\) 上取得最低 MAE，在其他性质上与 JODO 等强基线接近，同时在 molecule stability、RDKit validity、PoseBusters validity 等结构指标上表现强。

速度方面，PropMolFlow 推理使用 100 个 Euler 步，而扩散基线通常使用 1000 步；论文报告相对 diffusion-based models 至少约 8 倍加速，相对 EquiFM 近 2 倍加速。新闻报道的“约 10 倍更快”可理解为这一数量级的采样步数/墙钟速度优势。

> ⚠️ **注意：** 性质指标不能只信同构架 predictor。论文专门用 Gaussian 16、B3LYP/6-31G(2df,p) 做 DFT 单点和结构弛豫，对比 Target、GVP 和 DFT，指出某些性质尤其对几何弛豫敏感。这是 PropMolFlow 相比许多只报告 predictor MAE 的工作更严谨的地方。

##### 局限性

PropMolFlow 当前主要在 QM9 小分子上验证，最多 9 个重原子，离真实药物发现中的大分子、蛋白口袋条件和 ADMET 目标仍有距离。它支持单性质条件生成，多性质联合虽概念上直接，但性质相关性和权重冲突还没有系统解决。最后，flow matching 虽然比扩散快，但仍需多步 ODE/CTMC 积分；若要进一步提速，需要能跨越概率路径的 flow map 或蒸馏方法。

#### 🧪 练习题

```yaml
question: "PropMolFlow 中 Gaussian expansion 的主要作用是什么？"
options:
  - "把 3D 坐标转换成 2D 分子图"
  - "把标量目标性质映射为平滑的高维表示，使性质条件更容易与节点标量特征交互"
  - "在生成后过滤掉所有无效分子"
  - "用随机噪声替代形式电荷和键阶"
answer: 1
explain: "Gaussian expansion 用多个中心不同的高斯基函数编码目标性质，再经 MLP 得到 property embedding，比直接拼接单个标量更能表达性质值的局部差异。"
```
