### AlphaFold 2 — 端到端注意力网络实现原子级蛋白质结构预测

```yaml
id: alphafold2
name: AlphaFold 2
full_name: AlphaFold 2 (AlphaFold 2)
year: '2021.07'
org: Google DeepMind
paper_url: https://www.nature.com/articles/s41586-021-03819-2
category: protein_structure
parent: alphafold1
motivation: Evoformer注意力机制革新结构预测
```

#### 📝 一句话总结

AlphaFold 2 重新设计了 AlphaFold，将 MSA、模板、残基对几何和三维结构统一到端到端可训练的 Evoformer + Structure Module 架构中，用等变注意力和 FAPE 损失直接预测原子坐标，在 CASP14 中把蛋白质结构预测推进到接近实验精度。

#### 🎯 核心要点

- **端到端坐标预测**：从序列、MSA 和模板直接输出三维结构，不再依赖 AlphaFold 1 的 distogram 后处理优化作为核心流程
- **Evoformer 主干**：维护 MSA representation 与 pair representation，通过行/列注意力、外积均值、三角乘法和三角注意力反复交换信息
- **Structure Module**：使用 Invariant Point Attention (IPA) 在三维局部坐标系中更新残基刚体框架，保持全局旋转/平移等变性
- **Recycling 迭代细化**：把上一次预测的结构和表征反馈回网络，多轮修正长程相互作用和域间摆放
- **FAPE 核心损失**：用 frame-aligned point error 比较局部坐标系下的预测原子位置，使网络关注残基取向和局部几何
- **多任务辅助训练**：包含 distogram、masked MSA、pLDDT、side-chain、violation、pTM 等目标，提升表征质量和置信度估计
- **自蒸馏扩展数据**：利用未标注 Uniclust 序列的预测结构参与训练，缓解 PDB 实验结构数量有限的问题
- **置信度输出**：pLDDT 和 pTM 让用户能判断局部结构和整体拓扑是否可信

#### 🔬 深入细节

##### 模型架构图与可访问来源

![AlphaFold 2 Evoformer 与结构模块示意图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_Fig3_HTML.png)
*图：Nature Fig. 3。上半部分是 Evoformer 中 MSA/pair 表征的交替更新；下半部分是 Structure Module，用 IPA 从单残基表征和 pair 表征预测骨架框架、扭转角和原子位置。*

可访问来源：论文页面 https://www.nature.com/articles/s41586-021-03819-2；补充方法入口 https://static-content.springer.com/esm/art%3A10.1038%2Fs41586-021-03819-2/MediaObjects/41586_2021_3819_MOESM1_ESM.pdf；官方图像直链见上。

##### 算法伪代码

```python
# AlphaFold 2 简化推理流程
def alphafold2_predict(sequence):
    msa = search_genetic_databases(sequence)
    templates = search_structure_database(sequence)

    msa_repr = embed_msa(msa)                 # [N_msa, L, c_m]
    pair_repr = embed_pair(sequence, templates)  # [L, L, c_z]
    prev_structure = None

    for recycle in range(num_recycles):
        if prev_structure is not None:
            pair_repr += encode_prev_distogram(prev_structure)
            msa_repr[0] += encode_prev_single(prev_structure)

        for block in range(48):  # paper model uses a deep Evoformer stack
            msa_repr = row_attention_with_pair_bias(msa_repr, pair_repr)
            msa_repr = column_attention(msa_repr)
            pair_repr += outer_product_mean(msa_repr)
            pair_repr = triangle_multiplication(pair_repr)
            pair_repr = triangle_attention(pair_repr)

        single_repr = extract_query_sequence(msa_repr)
        prev_structure = structure_module(single_repr, pair_repr)  # IPA + torsions

    relaxed = amber_relax(prev_structure)
    confidence = predict_plddt_and_ptm(single_repr, pair_repr)
    return relaxed, confidence
```

##### 动机与背景

AlphaFold 1 已经证明深度网络能把 MSA 中的进化信号转化为距离约束，但它仍是两阶段系统：网络预测 distogram，优化器再寻找满足约束的结构。这个设计的问题是，网络训练目标并不直接等于最终三维结构质量；后处理优化也很难把局部原子几何、残基取向和全局拓扑统一起来。

AlphaFold 2 的核心突破是让网络自己学习“如何从序列/MSA 推理三维结构”。Evoformer 不只预测距离图，而是在 MSA 表征和 pair 表征之间反复传递信息；Structure Module 则把这些表征转成残基刚体框架和原子坐标。这样，最终坐标误差可以反向传播到 MSA 注意力和 pair 更新，训练目标与推理目标更一致。

##### Evoformer：MSA 与 pair 表征的双通路推理

Evoformer 同时维护两类状态：

$$
M \in \mathbb{R}^{N_{\mathrm{msa}}\times L\times c_m}, \quad
Z \in \mathbb{R}^{L\times L\times c_z}
$$

\(M\) 表示 MSA 中每条同源序列的残基上下文，\(Z\) 表示残基对之间的几何关系。行注意力让每条 MSA 序列内部沿残基维度交流，列注意力让同一位置的不同同源序列交流；外积均值把 MSA 中的共变模式写入 pair 表征：

$$
Z_{ij} \leftarrow Z_{ij} + \mathrm{Linear}\left(
\frac{1}{N_{\mathrm{msa}}}\sum_s M_{s,i} \otimes M_{s,j}
\right)
$$

pair 表征随后通过三角乘法和三角注意力更新。直觉上，残基 \(i,j,k\) 构成三角形，如果 \(i\) 与 \(k\)、\(k\) 与 \(j\) 的关系已知，那么 \(i\) 与 \(j\) 的距离和取向也应受到约束。这比二维卷积更适合表达蛋白质几何中的闭环一致性。

##### Structure Module 与 IPA

Structure Module 为每个残基维护一个局部刚体框架 \(T_i=(R_i,t_i)\)，并预测骨架点和侧链扭转角。Invariant Point Attention 的注意力打分同时考虑标量表征、pair bias 和三维点在全局空间中的距离：

$$
\alpha_{ij} \propto
\exp\left(
\frac{q_i^\top k_j}{\sqrt{d}}
+ b_{ij}
- \gamma \sum_p
\left\|T_i q_{i,p}^{\mathrm{point}} - T_j k_{j,p}^{\mathrm{point}}\right\|^2
\right)
$$

因为三维点都通过各自残基框架 \(T_i,T_j\) 变换到全局空间，整体结构旋转或平移不会改变相对几何关系。这使网络可以自然处理“同一个蛋白质在不同坐标系下应是同一个结构”的约束。

##### FAPE 损失与辅助目标

AlphaFold 2 的核心结构损失是 frame-aligned point error。它把预测原子点和真实原子点分别放到同一个残基局部框架中比较：

$$
\mathcal{L}_{\mathrm{FAPE}} =
\frac{1}{N_fN_a}\sum_{k=1}^{N_f}\sum_{i=1}^{N_a}
\min\left(
\left\|
T_k^{-1}x_i - \hat{T}_k^{-1}\hat{x}_i
\right\|,
d_{\mathrm{clamp}}
\right)
$$

这里 \(T_k\) 与 \(\hat{T}_k\) 分别是真实和预测的第 \(k\) 个残基框架，\(x_i\) 与 \(\hat{x}_i\) 是真实和预测原子坐标。FAPE 的好处是同时惩罚位置和取向错误，又不会要求整条链一次性全局对齐。

训练目标可概括为多任务加权和：

$$
\mathcal{L} =
w_{\mathrm{FAPE}}\mathcal{L}_{\mathrm{FAPE}}
+ w_{\mathrm{dist}}\mathcal{L}_{\mathrm{distogram}}
+ w_{\mathrm{msa}}\mathcal{L}_{\mathrm{masked\ MSA}}
+ w_{\mathrm{lddt}}\mathcal{L}_{\mathrm{pLDDT}}
+ w_{\mathrm{viol}}\mathcal{L}_{\mathrm{violation}}
+ \cdots
$$

> 💡 关键：FAPE 让坐标预测成为训练主目标；masked MSA 和 distogram 等辅助目标则迫使 Evoformer 保留进化和几何信息，避免网络只在最后结构模块中“临时拼结构”。

##### Recycling 与置信度

Recycling 把一次预测得到的结构、pair 信息和单序列表征反馈给同一网络，相当于让模型反复审阅自己的答案。第一轮可能先形成局部二级结构和粗略拓扑，后续轮次再修正域间相对位置、长程接触和局部冲突。论文表明 recycling 以较小训练成本显著提升准确率。

模型还输出 pLDDT 和 pTM。pLDDT 是逐残基局部置信度，适合判断某段 loop 或结构域是否可信；pTM 更关注整体拓扑和域间关系。最终 Amber relaxation 主要用于消除键长、键角、碰撞等立体化学问题，而不是大幅改变网络预测的拓扑。

##### 与 AlphaFold 1 的关键区别

| 维度 | AlphaFold 1 | AlphaFold 2 |
|------|-------------|-------------|
| 核心范式 | 预测距离/角度分布，再优化势能 | 端到端从表征预测坐标 |
| 主干网络 | 二维残差卷积网络 | Evoformer 注意力网络 |
| 几何建模 | distogram + 扭转角势能 | IPA 等变结构模块 |
| 训练目标 | 距离/角度交叉熵为主 | FAPE 坐标损失 + 多任务辅助 |
| 迭代方式 | noisy restarts 和外部优化 | recycling 网络内迭代 |
| 置信度 | 主要依赖后验评分 | pLDDT/pTM 内置输出 |

#### 🧪 练习题

```yaml
question: "AlphaFold 2 中 Evoformer 的核心作用是什么？"
options:
  - "只负责把最终结构交给 Amber 做能量最小化"
  - "在 MSA 表征和残基对表征之间反复交换信息，形成可供结构模块使用的几何推理状态"
  - "把蛋白质序列直接翻译成 PDB 文件，不使用多序列比对"
  - "用传统二维卷积替代所有注意力模块"
answer: 1
explain: "Evoformer 同时更新 MSA representation 和 pair representation，并通过外积均值、三角更新和注意力捕获共进化与几何一致性，这是结构模块能准确预测坐标的基础。"
```
