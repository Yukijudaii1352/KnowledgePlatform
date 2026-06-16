### MatterGen: 面向无机晶体逆向设计的扩散生成模型

```yaml
id: mattergen
name: MatterGen
full_name: MatterGen (MatterGen)
year: '2025'
org: Microsoft Research
paper_url: https://www.microsoft.com/en-us/research/blog/mattergen-a-generative-model-for-inorganic-materials-design/
category: materials_weather
parent: —
motivation: 扩散生成满足属性约束的晶体
```

#### 📝 一句话总结

MatterGen 提出了一个面向无机晶体的扩散生成模型，联合去噪原子类型、周期坐标和晶格向量，从随机结构直接生成稳定且新颖的晶体。它进一步通过 adapter 微调和 classifier-free guidance 支持化学体系、空间群、带隙、体模量、磁密度等属性约束，推动材料发现从“筛选已知候选”转向“按目标生成候选”。

#### 🎯 核心要点

- 晶体表示：将一个周期晶体表示为 atom types \(A\)、fractional coordinates \(X\) 和 lattice \(L\)，扩散过程同时作用于三者。
- 定制扩散过程：坐标噪声尊重周期边界，晶格噪声趋向物理上合理的平均密度分布，元素类型在离散类别空间中被 mask/腐蚀。
- 等变 score network：对 \(A, X, L\) 同时预测反向去噪方向，坐标与晶格分量保持对平移、旋转和周期性的合理归纳偏置。
- 两阶段训练：先在大规模稳定晶体结构上预训练通用生成器，再对带属性标签的小数据集插入 adapter 进行条件微调。
- 条件生成能力：支持化学组成、空间群、磁密度、带隙、体模量、供应链风险等单属性或多属性目标。
- 评价指标：论文用稳定、唯一、新颖（SUN）比例、DFT relaxation 后 RMSD、energy above hull 等指标衡量生成质量。
- 实验验证：Nature 论文报告其生成结构相对先前模型更可能同时稳定且新颖，并合成验证了一个生成结构的目标性质。

#### 🔬 深入细节

##### 1. 图示与来源

![MatterGen 扩散生成流程](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-025-08628-5/MediaObjects/41586_2025_8628_Fig1_HTML.png)

*图：MatterGen 的晶体扩散流程。正向过程腐蚀 \(A, X, L\)，反向过程用等变 score network 去噪；条件微调时通过 adapter 注入属性标签。*

可访问来源包括 Nature 正文 `https://www.nature.com/articles/s41586-025-08628-5`、arXiv 页面 `https://arxiv.org/abs/2312.03687`、Microsoft Research 博客 `https://www.microsoft.com/en-us/research/blog/mattergen-a-new-paradigm-of-materials-design-with-generative-ai/` 和官方仓库 `https://github.com/microsoft/mattergen`。任务给出的链接是 Microsoft Research 新闻/博客页；本文以 Nature 论文方法段落为主，并用官方仓库补充可运行流程。

##### 2. 晶体扩散对象：同时生成元素、坐标和晶格

一个晶体的基本生成单元可写作：

$$
C = (A, X, L)
$$

其中 \(A\in\{1,\ldots,K\}^n\) 是 \(n\) 个原子的元素类别，\(X\in[0,1)^{n\times 3}\) 是周期晶胞内的分数坐标，\(L\in\mathbb{R}^{3\times 3}\) 是晶格向量矩阵。图像扩散只需要处理连续像素，而晶体必须同时满足三类约束：元素是离散类别，坐标在周期边界上等价，晶格要有物理可行的尺度与形状。

MatterGen 的正向腐蚀过程把三部分推向简单噪声分布：

$$
q(C_t|C_0)
= q(A_t|A_0)\,q(X_t|X_0,L_0)\,q(L_t|L_0)
$$

可直观理解为：元素逐步变成不确定/掩码类别，分数坐标在周期空间中加入 wrapped noise，晶格逐渐靠近由训练集平均原子密度诱导的随机晶胞分布。

##### 3. 训练目标：学习反向去噪 score

反向生成从随机晶体 \(C_T\) 开始，逐步预测 \(C_{t-1}\)。模型参数 \(\theta\) 输出三类去噪信号：

$$
s_\theta(C_t,t,c)
= \left(s_\theta^A, s_\theta^X, s_\theta^L\right)
$$

其中 \(c\) 是可选属性条件。训练损失可以概括为离散类别交叉熵与连续 score matching 的组合：

$$
\mathcal{L}
= \mathbb{E}_{t,C_0,C_t}
\left[
\lambda_A \operatorname{CE}(A_0, p_\theta(A_0|C_t,t,c))
+ \lambda_X \left\|s_\theta^X - \nabla_{X_t}\log q(X_t|X_0)\right\|_2^2
+ \lambda_L \left\|s_\theta^L - \nabla_{L_t}\log q(L_t|L_0)\right\|_2^2
\right]
$$

这里的重点不在公式符号本身，而在归纳偏置：坐标和晶格的输出必须与晶体几何等变，元素预测必须与周期结构中各原子的局部环境一致。

##### 4. Adapter 微调与属性引导

基础模型先学习“什么样的无机晶体像稳定材料”。当要生成满足某个属性的材料时，MatterGen 不从头训练大模型，而是在 score network 的层中插入 adapter，并用带标签的小数据集微调。对目标属性 \(c\)，推理时可使用 classifier-free guidance：

$$
s_{\text{guided}}(C_t,t,c)
= (1+\gamma)s_\theta(C_t,t,c)
- \gamma s_\theta(C_t,t,\varnothing)
$$

\(\gamma\) 越大，生成越贴近属性目标，但也可能牺牲多样性和结构真实性。官方仓库的生成命令中 `--diffusion_guidance_factor` 就对应这个引导强度。

##### 5. 核心算法伪代码

```python
# MatterGen base pretraining
for crystal in stable_structure_loader:
    A0, X0, L0 = crystal.atom_types, crystal.frac_coords, crystal.lattice
    t = sample_diffusion_time()
    At = corrupt_atom_types(A0, t)
    Xt = wrapped_coordinate_noise(X0, L0, t)
    Lt = lattice_noise(L0, t)

    pred = equivariant_score_network(At, Xt, Lt, t, condition=None)
    loss = atom_ce(pred.A, A0) + coord_score_loss(pred.X, X0) + lattice_score_loss(pred.L, L0)
    loss.backward()
    optimizer.step()

# Property-conditioned generation
C = sample_random_crystal_prior()
for t in reversed(diffusion_schedule):
    s_cond = model(C, t, condition={"bulk_modulus": 400.0})
    s_uncond = model(C, t, condition=None)
    score = (1 + gamma) * s_cond - gamma * s_uncond
    C = reverse_diffusion_step(C, score, t)

return decode_to_cif(C)
```

##### 6. 为什么它比筛选式材料发现更直接

筛选式流程从已知数据库或规则生成候选开始，再用 DFT/MLFF 过滤。其瓶颈是候选空间被“已知材料附近”强烈限制，目标属性也只能在候选集合内优化。MatterGen 反过来从目标约束出发，在连续的晶体结构空间中采样，生成后再用 MatterSim、DFT、结构匹配和 convex hull 评价进行验证。

论文中的 SUN 指标体现了这个逻辑：stable 表示能量接近凸包，unique 表示样本之间不重复，novel 表示不与参考数据库结构匹配。只有三者同时满足，生成结果才可能成为值得进一步计算或实验验证的候选。

##### 7. 局限与使用注意

MatterGen 输出的是候选结构，不是实验成功的保证。高体模量、磁密度或带隙等属性还需要更精确的 DFT、热力学稳定性、动力学稳定性、可合成路径和实验条件验证。官方仓库也提醒，快速评估可用 MatterSim 等 MLFF，但发表级结论仍应使用更严格的 DFT 或实验复核。

#### 🧪 练习题

```yaml
question: "MatterGen 相比普通图像扩散模型最关键的定制点是什么？"
options:
  - "只生成材料名称，不生成结构"
  - "同时对原子类型、周期坐标和晶格向量进行扩散/去噪，并保持晶体几何约束"
  - "把晶体结构渲染成二维图片后做图像生成"
  - "只用强化学习搜索 Materials Project 数据库"
answer: 1
explain: "晶体生成必须处理离散元素、周期坐标和晶格几何，MatterGen 的扩散过程和等变 score network 都是围绕这三个对象设计的。"
```
