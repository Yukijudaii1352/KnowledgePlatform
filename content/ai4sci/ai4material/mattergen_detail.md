### MatterGen — 材料生成模型 (Matter Generator)

```yaml
id: mattergen
name: MatterGen
full_name: 材料生成模型 (Matter Generator)
year: '2025'
org: Microsoft
paper_url: https://www.nature.com/articles/s41586-023-06735-9
category: structure_prediction
parent: diffcsp
motivation: 目标性质逆向设计生成
```

#### 📝 一句话总结

MatterGen 提出面向无机晶体的联合扩散生成模型，同时去噪原子类型、周期坐标和晶格，并通过 adapter 微调与 classifier-free guidance 实现化学组成、空间群、带隙、体模量、磁密度等目标性质的逆向设计。

#### 🎯 核心要点

- **三路晶体扩散**：对原子类型 \(\mathbf{A}\)、分数坐标 \(\mathbf{X}\) 和晶格 \(\mathbf{L}\) 分别定义适配其几何结构的 corruption process
- **周期坐标建模**：坐标扩散使用 wrapped Normal，保证分数坐标在周期边界 \([0,1)^3\) 上连续去噪
- **晶格去噪**：晶格扩散在对称晶格矩阵子空间中进行，噪声极限接近具有训练集平均原子密度的立方晶格分布
- **离散元素扩散**：原子类型使用 D3PM 式 categorical diffusion，把元素逐步腐化到 masked state，再学习反向元素分布
- **等变 score 网络**：采用 SE(3)-equivariant GNN 预测坐标 score、晶格 score 和原子类型 logits，减少模型自行学习物理对称性的负担
- **adapter 条件微调**：在预训练 base model 的消息传递层注入 property embedding，少量标注数据即可学习条件 score
- **classifier-free guidance**：同时学习有条件与无条件 score，采样时用 guidance factor 放大目标性质条件
- **大规模预训练数据**：base model 使用 Alex-MP-20，包含约 607,684 个稳定、20 原子以内的无机晶体结构
- **多目标设计**：支持化学体系、空间群、磁密度、带隙、体模量以及低供应链风险磁体等单目标和联合约束

#### 🔬 深入细节

![MatterGen 无机材料生成流程](https://ar5iv.labs.arxiv.org/html/2312.03687/assets/x1.png)
*图：MatterGen 的总体流程。模型从随机晶体出发，反向去噪原子类型、坐标和晶格；预训练 score network 后，通过 adapter 注入目标性质条件。公开图源来自 arXiv:2312.03687 的 ar5iv HTML。*

> ⚠️ 来源说明：任务 YAML 中的 `paper_url` 指向 `s41586-023-06735-9`，该链接不是 MatterGen 论文。MatterGen 的实际 Nature 论文为 `https://www.nature.com/articles/s41586-025-08628-5`，可访问预印本为 `https://arxiv.org/abs/2312.03687`，本文方法细节依据 arXiv 版本和官方 Microsoft MatterGen 仓库。

##### 算法伪代码

```python
# MatterGen 训练与条件生成伪代码
base_data = load_stable_crystals("Alex-MP-20")  # A, X, L

for step in pretraining_steps:
    A0, X0, L0 = sample(base_data)
    t = sample_diffusion_step()
    At = categorical_corrupt(A0, t)        # atom type diffusion
    Xt = wrapped_normal_corrupt(X0, t, Lt) # periodic coordinate diffusion
    Lt = symmetric_lattice_corrupt(L0, t)  # lattice diffusion

    pred_coord_score, pred_lattice_score, pred_type_logits = score_net(At, Xt, Lt, t)
    loss = lambda_coord * score_loss(pred_coord_score, true_coord_score)
    loss += lambda_cell * score_loss(pred_lattice_score, true_lattice_score)
    loss += lambda_types * d3pm_type_loss(pred_type_logits, A0, At, t)
    update(score_net, loss)

for property_task in labeled_tasks:
    add_adapters(score_net, property_embedding=property_task.label_encoder)
    fine_tune_with_same_diffusion_loss(score_net, property_task.labeled_crystals)

def generate(condition, gamma=2.0):
    A, X, L = sample_noise_limit()
    for t in reversed(range(1, T + 1)):
        s_cond = score_net(A, X, L, t, condition)
        s_uncond = score_net(A, X, L, t, condition=None)
        s_guided = gamma * s_cond + (1 - gamma) * s_uncond
        A, X, L = reverse_diffusion_step(A, X, L, s_guided, t)
        X, L = langevin_corrector(X, L, s_guided)
    return decode_crystal(A, X, L)
```

##### 晶体表示与三路扩散

MatterGen 把一个晶体写成：

$$
\mathbf{M} = (\mathbf{A}, \mathbf{X}, \mathbf{L})
$$

其中 \(\mathbf{A}\) 是 unit cell 内每个原子的元素类型，\(\mathbf{X}\in[0,1)^{3\times n}\) 是分数坐标，\(\mathbf{L}\in\mathbb{R}^{3\times 3}\) 是晶格矩阵。分数坐标与笛卡尔坐标的关系为：

$$
\mathbf{R} = \mathbf{L}\mathbf{X}, \qquad \mathbf{X} = \mathbf{L}^{-1}\mathbf{R}
$$

普通图像扩散只需要给像素加高斯噪声，但晶体同时有离散元素、周期坐标和可变晶格。MatterGen 因此把前向扩散分解为：

$$
q(\mathbf{M}_{t+1}\mid\mathbf{M}_t)
= q(\mathbf{A}_{t+1}\mid\mathbf{A}_t)\,
q(\mathbf{X}_{t+1}\mid\mathbf{X}_t)\,
q(\mathbf{L}_{t+1}\mid\mathbf{L}_t)
$$

坐标部分使用 wrapped Normal：

$$
\mathcal{N}_{W}(\bar{\mathbf{x}};\mathbf{x},\sigma^2\mathbf{I})
= \sum_{\mathbf{k}\in\mathbb{Z}^3}
\mathcal{N}(\bar{\mathbf{x}};\mathbf{x}-\mathbf{k},\sigma^2\mathbf{I})
$$

这个设计的直觉是，\(\mathbf{x}=0.99\) 与 \(\mathbf{x}=0.01\) 在周期晶胞里相邻，而普通高斯会错误地把它们看作相距很远。wrapped Normal 把整数平移后的概率叠加起来，使扩散过程尊重周期边界。

##### 训练目标

score network 需要同时预测坐标 score、晶格 score 和原子类型反向分布。总损失写作：

$$
L = \lambda_{\text{coord}}L_{\text{coord}}
+ \lambda_{\text{cell}}L_{\text{cell}}
+ \lambda_{\text{types}}L_{\text{types}}
$$

其中坐标和晶格损失是 score matching：

$$
L_{\text{coord}}
= \sum_{t=1}^{T}\sigma_t(n)^2
\mathbb{E}\left[
\left\|s_{\mathbf{X},\theta}(\mathbf{M}_t,t)
- \nabla_{\mathbf{X}_t}\log q(\mathbf{X}_t\mid\mathbf{X}_0)\right\|_2^2
\right]
$$

$$
L_{\text{cell}}
= \sum_{t=1}^{T}(1-\bar{\alpha}_t)\sigma_t(n)^2
\mathbb{E}\left[
\left\|s_{\mathbf{L},\theta}(\mathbf{M}_t,t)
- \nabla_{\mathbf{L}_t}\log q(\mathbf{L}_t\mid\mathbf{L}_0)\right\|_2^2
\right]
$$

原子类型是离散变量，使用 D3PM 的变分项加 cross-entropy：

$$
L_{\text{types}}
\approx
\mathbb{E}\left[
\mathrm{KL}\big(q(\mathbf{A}_{t-1}\mid\mathbf{A}_t,\mathbf{A}_0)
\|p_{\theta}(\mathbf{A}_{t-1}\mid\mathbf{M}_t)\big)
-\lambda_{\text{CE}}\log p_{\theta}(\mathbf{A}_0\mid\mathbf{M}_t,t)
\right]
$$

论文实现中 base model 使用 \(\lambda_{\text{coord}}=0.1\)，\(\lambda_{\text{cell}}=\lambda_{\text{types}}=1\)，并采用 \(\lambda_{\text{CE}}=0.01\)。这体现了一个关键取舍：坐标和晶格是连续 score matching，元素类型则更像 masked categorical recovery。

##### adapter 与条件生成

MatterGen 不为每个性质从头训练扩散模型，而是在预训练 score network 的每个消息传递层前加入 adapter。给定性质 embedding \(\mathbf{g}\) 和第 \(L\) 层节点表示 \(\mathbf{H}^{(L)}_j\)，adapter 的形式可概括为：

$$
\mathbf{H}'^{(L)}_j
= \mathbf{H}^{(L)}_j
+ f_{\text{mixin}}^{(L)}\left(
f_{\text{adapter}}^{(L)}(\mathbf{g})
\right)\cdot\mathbb{I}(\text{property is not null})
$$

其中 mix-in 层零初始化，所以微调刚开始时模型仍等价于无条件 base model。这一点很重要：稳定晶体生成能力来自大规模无标签结构预训练，少量标注性质只负责把分布推向目标区域，而不是重新学习“什么是合理晶体”。

采样时采用 classifier-free guidance。连续变量的 guided score 可写为：

$$
s_{\text{guided}}(\mathbf{M}_t,c)
= \gamma s_{\theta}(\mathbf{M}_t,c,t)
+ (1-\gamma)s_{\theta}(\mathbf{M}_t,\varnothing,t)
$$

论文条件生成实验采用 \(\gamma=2\)。当需要联合约束多个性质时，模型把多个性质 embedding 同时输入 adapter，例如同时要求高磁密度和低 HHI 供应链风险分数。

##### 与 DiffCSP/CDVAE 的区别

DiffCSP 已经把扩散用于晶体结构预测，但 MatterGen 的目标更接近通用逆向设计：它不只在固定组成下生成坐标或结构，而是联合生成元素、坐标和晶格，并可以用 property labels 调控整个反向扩散轨迹。与只做筛选的流程相比，MatterGen 直接在目标性质条件下采样候选结构，能更高效地探索尾部分布，例如高体模量、目标带隙或低供应链风险磁体。

> 💡 关键：MatterGen 的核心不是“把文本条件塞进扩散模型”，而是为晶体的三种变量类型分别设计物理一致的噪声极限，再用 adapter 把少量性质标注转化为条件 score。

#### 🧪 练习题

```yaml
question: "MatterGen 为什么不能直接对晶体分数坐标使用普通高斯扩散？"
options:
  - "因为分数坐标是离散变量，只能用交叉熵训练"
  - "因为分数坐标存在周期边界，0 和 1 附近的位置在物理上相邻"
  - "因为晶格矩阵必须被固定为单位矩阵"
  - "因为 classifier-free guidance 只能处理整数坐标"
answer: 1
explain: "晶体分数坐标定义在周期晶胞中，普通高斯会破坏边界连续性；wrapped Normal 通过整数平移求和来尊重周期结构。"
```
