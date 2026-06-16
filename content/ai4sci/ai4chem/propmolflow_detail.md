### PropMolFlow — 物理启发多尺度流模型

```yaml
id: propmolflow
name: PropMolFlow
full_name: 物理启发多尺度流模型 (PropMolFlow)
year: '2026.04'
org: MIT
paper_url: https://www.earth.com/news/ai-predicts-how-molecules-react-in-the-lab-drug-discovery/
category: generation
parent: edm
motivation: 10倍速度提升，符合DFT物理约束
```

#### 📝 一句话总结

PropMolFlow 提出面向属性条件分子设计的 geometry-complete SE(3)-等变流匹配框架，把目标性质嵌入、原子类型、键阶、电荷和 3D 坐标放在同一个联合生成过程中学习。它解决了扩散模型属性引导采样慢、连续化离散化学特征不可靠和评估过度依赖代理回归器的问题，并用 DFT 验证生成分子的真实性质。

#### 🎯 核心要点

- 基于 FlowMol 风格的 geometry-complete flow matching，同时生成原子类型、键阶、电荷和三维坐标，而不是只生成点云
- 主干为 SE(3)-等变 GVP/GNN，能保留手性相关的旋转等变结构，比 E(3) 点云模型更适合区分手性分子
- 属性条件 \(k\) 先经过可选 Gaussian expansion，再经 MLP 得到属性嵌入 \(P=\phi_{\mathrm{prop}}(k)\)
- 研究五种属性嵌入交互方式：concatenate、sum、multiply、concatenate+sum、concatenate+multiply
- 训练和评估使用修正后的 QM9 SDF，修复大量键阶、电荷和闭壳层价电子配置不一致问题
- 条件属性覆盖 \(\alpha\)、HOMO-LUMO gap、HOMO、LUMO、\(\mu\)、\(C_v\) 六类 QM9 DFT 性质
- 推理用 Euler ODE 积分约 100 步，相比多步扩散采样显著更快；官方仓库也暴露 `n_timesteps` 控制采样步数
- 引入 DFT 复核、closed-shell ratio、修订后的 atomic/molecular stability，指出仅靠代理回归器和旧稳定性指标会高估生成质量
- worker 给出的链接实际指向 Reactome/HiTEA 新闻；可追溯论文为 arXiv:2505.21469 和 Nature Computational Science 2026，作者机构以 University of Florida / NYU 等为主，并非 YAML 中的 MIT

#### 🔬 深入细节

![PropMolFlow 方法总览](https://arxiv.org/html/2505.21469v3/x1.png)
*图：PropMolFlow 的属性嵌入、联合流匹配和五种属性-图交互方式。分子图包含节点标量特征、三维坐标和边/键特征；属性条件通过 Gaussian expansion 与 MLP 进入生成主干。*

##### 算法伪代码

```python
# PropMolFlow: property-guided geometry-complete flow matching
def property_embedding(k, use_gaussian=True):
    if use_gaussian:
        z = [exp(-((k - c_m) ** 2) / (2 * sigma ** 2)) for c_m in centers]
    else:
        z = normalize(k)
    return mlp_prop(z)

def train_propmolflow(qm9_molecules):
    for mol in qm9_molecules:
        G1 = encode_geometry_complete_graph(
            atom_types=mol.atom_types,
            charges=mol.charges,
            bond_orders=mol.bond_orders,
            positions=mol.positions,
        )
        k = mol.target_property
        P = property_embedding(k)

        G0 = sample_base_graph_like(G1)      # base distribution over modalities
        t = uniform(0.0, 1.0)
        Gt = interpolate_multimodal(G0, G1, t)

        pred = se3_gvp_denoiser(Gt, t, P)
        loss_pos = mse(pred.positions, G1.positions)
        loss_atom = cross_entropy(pred.atom_types, G1.atom_types)
        loss_charge = cross_entropy(pred.charges, G1.charges)
        loss_bond = cross_entropy(pred.bond_orders, G1.bond_orders)
        update(weighted_sum(loss_pos, loss_atom, loss_charge, loss_bond))

def sample_propmolflow(target_property, n_steps=100):
    P = property_embedding(target_property)
    G = sample_base_graph_with_atom_count()
    for t in linspace(0.0, 1.0, n_steps):
        dG = se3_gvp_velocity_or_denoiser(G, t, P)
        G = euler_update_joint_modalities(G, dG)
    return decode_valid_molecule(G)
```

##### 关键公式

属性值 \(k\) 的 Gaussian expansion 将一个标量映射成多个基函数响应：

$$
\gamma_m(k)=\exp\left(-\frac{(k-c_m)^2}{2\sigma^2}\right),\quad
P=\phi_{\mathrm{prop}}(\gamma_1(k),\ldots,\gamma_M(k))
$$

随后 \(P\) 与节点标量特征 \(h_i\) 交互，例如：

$$
h_i'=\varphi_\theta([h_i, P]),\quad
h_i'=h_i+P,\quad
h_i'=h_i\odot P
$$

流匹配的连续部分可写成从基分布 \(x_0\) 到真实分子坐标 \(x_1\) 的概率路径，并学习速度场：

$$
\frac{d x_t}{dt}=v_\theta(x_t,t,P),\quad x_{t=0}\sim p_0,\quad x_{t=1}\sim p_{\mathrm{data}}
$$

端点式训练也可理解为让网络从中间状态预测最终状态：

$$
\mathcal{L}_{\mathrm{pos}}
=\mathbb{E}_{t,x_0,x_1,k}\left\|\hat x_1^\theta(x_t,t,P)-x_1\right\|_2^2
$$

离散模态如原子类型、键阶和电荷使用连续时间 Markov 链/离散流匹配对应的交叉熵：

$$
\mathcal{L}_{\mathrm{disc}}
=-\mathbb{E}\sum_{m\in\{\mathrm{atom,bond,charge}\}}
\log p_\theta(z_1^{(m)}\mid z_t,t,P)
$$

总损失是多模态加权和：

$$
\mathcal{L}
=\lambda_x\mathcal{L}_{\mathrm{pos}}
+\lambda_a\mathcal{L}_{\mathrm{atom}}
+\lambda_b\mathcal{L}_{\mathrm{bond}}
+\lambda_c\mathcal{L}_{\mathrm{charge}}
$$

##### 方法机制解释

PropMolFlow 的核心动机不是单纯“让分子更像 QM9”，而是让生成模型能按目标物理化学属性定向采样。早期 EDM/GeoDiff/EquiFM 一类模型证明了 3D 等变生成很有效，但属性条件通常只是把一个标量拼到节点特征上；同时，许多模型把原子类型和键阶当连续变量处理，最后再离散化，容易产生价态、电荷或闭壳层不一致的问题。

geometry-complete 表示解决的是“生成对象不完整”的问题。一个可用分子不仅需要坐标，还需要原子类型、键阶和电荷；对于药物设计或量化性质预测，键阶和电荷错误会直接改变电子结构。PropMolFlow 把这些模态放进同一个流匹配过程中联合去噪，因此模型可以在坐标调整、键阶选择和电荷配置之间共享信息。

属性嵌入模块解决的是条件信号太弱的问题。标量 \(k\) 直接拼接到每个节点上时，模型只看到一个线性尺度上的数；Gaussian expansion 则把目标值变成一组局部基函数响应，让模型更容易区分“接近训练分布中心的目标”和“边界或低密度区域的目标”。论文系统比较不同属性和任务中 Gaussian expansion 是否有帮助，而不是假设一种条件注入方式对所有属性都最优。

流匹配带来的速度优势来自推理路径更短。扩散模型通常需要很多噪声步逐步反演，而 PropMolFlow 在推理时用 ODE 积分学习到的速度场，论文和官方仓库均展示用约 100 个 Euler 步即可采样。对于属性搜索任务，这一点很重要，因为研究者通常要批量生成数千到上万个候选分子，再用代理模型、DFT 或实验继续筛选。

论文特别强调评估不能只看代理 GVP 回归器。生成分子可能没有完全弛豫，代理回归器在训练分布外可能给出过乐观结果；因此作者对 10,773 个生成分子做 DFT 复核，并提出 closed-shell ratio 与修订稳定性指标，过滤 open-shell 或价态-电荷不一致结构。这个评估设计与 YAML 中“符合 DFT 物理约束”的动机相吻合，但它更准确地说是“用 DFT 验证和修订指标约束评估”，而非模型内部显式求解 DFT。

> ⚠️ 来源限制：任务给出的 Earth.com 链接对应的是另一项 Cambridge/Pfizer Reactome/HiTEA 新闻；PropMolFlow 的可访问论文与官方仓库均指向 arXiv:2505.21469、Nature Computational Science DOI 10.1038/s43588-025-00946-y 和 GitHub `Liu-Group-UF/PropMolFlow`。本文保留 YAML 元信息不改，但方法解读以这些可追溯来源为准。

#### 🧪 练习题

```yaml
question: "PropMolFlow 中 Gaussian expansion 的主要作用是什么？"
options:
  - "把 3D 坐标投影成 2D 分子图"
  - "把目标属性标量变成更丰富的局部基函数表示，便于与节点特征交互"
  - "在采样后用规则删除所有非法价态"
  - "完全替代 SE(3)-等变 GNN 主干"
answer: 1
explain: "Gaussian expansion 将目标属性映射到多个基函数响应，再经 MLP 得到属性嵌入，使条件信号比直接拼接单个标量更可表达。"
```
