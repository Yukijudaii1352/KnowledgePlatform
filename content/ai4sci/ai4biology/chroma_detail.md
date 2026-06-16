### Chroma — 可编程的蛋白质与蛋白复合物生成模型

```yaml
id: chroma
name: Chroma
full_name: "Chroma (Chroma)"
year: "2023.11"
org: "Generate Biomedicines"
paper_url: "https://www.nature.com/articles/s41586-023-06728-8"
category: protein_design
parent: "—"
motivation: "可编程生成复杂蛋白质对称体"
```

#### 📝 一句话总结

Chroma 提出了一个面向蛋白质和蛋白复合物的可编程生成模型，把相关聚合物扩散、亚二次复杂度随机图神经网络、all-atom 序列/侧链设计网络和可组合 conditioner 统一起来，使蛋白质设计可以在生成时通过对称性、子结构、形状、语义甚至文本条件进行 Bayesian inference。

#### 🎯 核心要点

- **联合结构-序列模型**：先用 backbone diffusion 生成蛋白质/复合物骨架，再用 design network 条件生成序列和侧链构象，形成 all-atom joint generative model
- **相关聚合物扩散**：前向过程不是独立高斯噪声，而是尊重链连接性和 radius-of-gyration 统计的 correlated diffusion，把天然结构逐渐变成 collapsed polymer ensemble
- **随机长程图神经网络**：使用受 fast N-body 方法启发的 random graph connectivity，在 \(O(N)\) 或 \(O(N\log N)\) 边上做长程推理，支持大蛋白和复合物
- **几何合成层**：网络预测 confidence-weighted inter-residue geometries，再由 equivariant geometry solver 求解全局一致三维结构
- **低温采样**：通过修改扩散采样过程，提高样本 likelihood / 设计质量，同时降低构象多样性
- **Diffusion-conditioner 框架**：把用户约束写成 hard constraints 或 soft penalties，组合到时间相关 posterior \(\log p_t(x|y)\) 中，无需为新任务重训模型
- **可组合条件类型**：支持 symmetry、fixed substructure、distance/contact、motif grafting、shape point cloud、CATH/语义分类器和自然语言 annotation guidance
- **实验验证**：论文实验表征 310 个设计，多个设计可表达、可折叠且具有良好生物物理性质；两套晶体结构与 Chroma 样本约 1.0 Å backbone RMSD

#### 🔬 深入细节

##### 方法示意图

![Chroma 方法总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-023-06728-8/MediaObjects/41586_2023_6728_Fig1_HTML.png)
*图：Nature 论文 Figure 1。Chroma 用 correlated polymer diffusion 生成 backbone，用随机图神经网络和几何求解器预测去噪结构，再用 design network 生成 all-atom complex；右侧展示 time-dependent prior 与 conditioner 组合成 posterior。来源：Nature / Springer Figure 1 公开图片直链。*

##### 算法伪代码

```python
# Chroma 条件生成伪代码
def chroma_sample(chain_lengths, conditioners=None, inverse_temperature=1.0, langevin_factor=0.0):
    """
    chain_lengths: 单链或多链复合物的长度设定
    conditioners: 可组合约束，如 Symmetry、Substructure、Shape、Semantic guidance
    inverse_temperature: 低温采样强度，越大越偏向高 likelihood / 低熵样本
    """
    # 1. 从 collapsed polymer prior 初始化 noisy backbone
    x_t = sample_collapsed_polymer(chain_lengths)

    for t in reversed_time_grid(1.0, 0.0):
        # 2. backbone denoiser 预测干净坐标
        x0_hat = backbone_denoiser(x_t, t)  # \hat{x}_theta(x_t, t)

        # 3. 将 denoiser 转换为 protein prior score
        score_prior = denoiser_to_score(x_t, x0_hat, t)

        # 4. 叠加可组合 conditioner 的梯度或投影
        score_cond = 0.0
        x_t = apply_hard_constraints(x_t, conditioners, t)
        for cond in conditioners or []:
            score_cond += cond.weight(t) * cond.gradient(x_t, t)

        # 5. 低温 / Langevin 调整后执行反向扩散步
        score = inverse_temperature * score_prior + score_cond
        x_t = reverse_diffusion_step(x_t, score, t, langevin_factor=langevin_factor)

    # 6. 给定 backbone 生成序列和侧链，得到 all-atom protein complex
    sequence, sidechains = design_network(x_t)
    return assemble_all_atom_complex(x_t, sequence, sidechains)
```

##### 动机与背景

蛋白质设计真正需要的是“生成满足任务要求且可折叠的分子”，而不是只生成一个看起来像蛋白质的 backbone。现有生成模型往往只能处理单链、小体系或固定条件；如果每遇到一种新约束都要重新训练模型，实际设计迭代会非常慢。Chroma 试图同时满足三个要求：建模完整蛋白复合物的结构与序列、计算随残基数近似线性或亚二次增长、在推理时接受多种条件组合。

Chroma 的设计把问题拆成两层：第一层学习天然 protein backbone 的强先验 \(p_\theta(x)\)，第二层在采样时把用户条件 \(y\) 作为 likelihood 或约束加进去，得到：

$$
\log p_t(x|y)
=
\log p_t(x)+\log p_t(y|x)+C_t
$$

如果有多个条件，则把它们写成可加的能量/对数似然项：

$$
\nabla_x\log p_t(x|y_1,\ldots,y_K)
\approx
\nabla_x\log p_t(x)
+
\sum_{k=1}^{K} w_k(t)\nabla_x\log p_t(y_k|x)
$$

这就是“可编程”的核心：模型参数不变，设计任务通过 conditioner 组合表达。

##### correlated polymer diffusion

图像扩散常对每个像素加独立高斯噪声，但蛋白质 backbone 是一条或多条聚合物链，残基之间有链连接、空间折叠和半径统计。如果使用独立噪声，前向过程会快速破坏聚合物结构，使反向模型浪费大量容量学习最基础的链统计。

Chroma 因此使用相关噪声。简化写法为：

$$
x_t=\alpha_t x_0+\sigma_t \epsilon,\qquad
\epsilon\sim\mathcal{N}(0,\Sigma_{\mathrm{polymer}})
$$

其中 \(\Sigma_{\mathrm{polymer}}\) 不是对角矩阵，而是编码链内相关性、链长尺度和 collapsed polymer 的 radius-of-gyration 统计。随着 \(t\) 增大，天然结构被逐步变成随机但仍像聚合物的 collapsed ensemble；反向过程则学习从这个 ensemble 逐步恢复到真实 protein backbone。

网络以时间相关 denoiser 形式预测：

$$
\hat{x}_\theta(x_t,t)\approx\mathbb{E}[x_0|x_t]
$$

并由 denoiser 推导 score。这个做法让模型在每个时间步看到的 noisy structure 仍保留蛋白质链的宏观统计，降低了生成难度。

##### 随机图神经网络与几何求解器

完整蛋白复合物可能包含几千个 residues。如果像 AlphaFold 类模型那样维护全连接 pair 表征，复杂度至少 \(O(N^2)\)，对大体系不友好。Chroma 使用 random graph neural network：每个残基只连接局部邻居和一批随机长程边，连接统计借鉴 fast N-body / Barnes-Hut 思想，使模型能用 \(O(N)\) 或 \(O(N\log N)\) 边传递长程信息。

骨架网络不是直接一步输出所有原子坐标，而是预测带置信度的 inter-residue geometries，再通过 equivariant geometry solver 求一个全局一致结构。这样做的好处是把“神经网络预测局部/成对几何”和“几何层合成三维坐标”分离，既保留等变性，又能把噪声结构逐步合成为一致 backbone。

得到 backbone 后，Chroma 的 design network 在该 backbone 条件下生成序列与侧链构象。可把联合模型写成：

$$
p_\theta(x,s,\chi)
=
p_\theta(x)\,p_\theta(s,\chi|x)
$$

其中 \(x\) 是 backbone，\(s\) 是 amino-acid sequence，\(\chi\) 是侧链构象。这个分解也解释了为什么 Chroma 不只是 backbone generator，而是 all-atom protein complex generator。

##### Conditioner 框架

Chroma 的 conditioner 是一个可组合模块：输入当前结构、能量和 diffusion time，输出更新后的结构或能量项。几类典型 conditioner 包括：

- **SymmetryConditioner**：把复合物约束到 \(C_n,D_n,T,O,I\) 等对称群，并在采样过程中同步等价链/亚基
- **Substructure / Motif conditioner**：固定或 graft 指定子结构，让模型围绕功能片段外填充
- **Distance / contact conditioner**：对特定原子或残基对施加距离势
- **Shape conditioner**：让生成结构贴合点云或目标外形
- **Semantic conditioner**：用蛋白分类器或文本 annotation predictor 给出梯度，反向优化想要的类别/语义描述

这些 conditioner 可以同时使用，因为它们本质上都修改同一个时间相关 posterior。硬约束通常通过投影或状态更新实现，软约束通过能量梯度实现。

> 💡 **关键直觉**：Chroma 不把“设计目标”固定进模型权重，而是把目标变成采样时的能量函数。这样同一个 generative prior 可以服务许多不同设计任务。

##### 低温采样

Chroma 还引入低温采样，用更强的 prior score 把样本推向高 likelihood 区域。概念上可理解为：

$$
\nabla_x\log p_t^{(\lambda)}(x)
\approx
\lambda \nabla_x\log p_t(x),\qquad \lambda>1
$$

其中 \(\lambda\) 是 inverse temperature。较高 \(\lambda\) 会减少熵和多样性，但提升样本的局部质量、模型 likelihood 和后续 refolding 成功率。论文和官方 GitHub API 中也暴露了 `inverse_temperature`、`langevin_factor` 等采样超参数，用于在探索和质量之间调节。

##### 实验与意义

Chroma 论文报告了大规模无条件采样和条件采样：生成 100,000 个单链样本与 20,000 个复合物样本用于分析，并对 310 个蛋白进行实验表征。结果显示，样本具有天然蛋白相似的二级结构、contact order、radius-of-gyration 和 tertiary motif 使用模式；许多样本与 PDB 最近邻 TM-score 较低，说明不是简单记忆训练集。

实验上，Chroma 设计的多个蛋白可在 E. coli 中表达并显示折叠/热稳定性；两个晶体结构与生成模型约 1.0 Å backbone RMSD。更重要的是，Chroma 展示了“从生成可行结构”转向“编程分子性质”的工作方式：用户可以先声明对称性、形状、子结构或语义目标，模型在 protein prior 下自动补全可设计的结构与序列。

#### 🧪 练习题

```yaml
question: "Chroma 的 diffusion-conditioner 框架主要解决什么问题？"
options:
  - "把所有蛋白质都限制为单链 α 螺旋"
  - "在不重新训练生成模型的情况下，把对称性、子结构、形状和语义等约束组合到采样过程"
  - "用独立高斯噪声替代聚合物相关噪声"
  - "只生成 backbone，不生成序列和侧链"
answer: 1
explain: "Conditioner 将用户目标表示为 hard constraints 或 soft energy/likelihood，在每个扩散时间步与 protein prior 组合成 posterior，因此可以推理时组合新条件而无需重训模型。"
```
