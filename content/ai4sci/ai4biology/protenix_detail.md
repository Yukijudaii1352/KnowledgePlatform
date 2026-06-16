### Protenix-v1 — 面向全生物分子结构预测的开源 AlphaFold3 级复现

```yaml
id: protenix
name: Protenix-v1
full_name: Protenix-v1 (Protenix-v1)
year: '2026.02'
org: ByteDance
paper_url: https://www.biorxiv.org/content/10.1101/2026.02.09.637214v1
category: protein_structure
parent: alphafold3
motivation: 开源复现精度全面超越AF3
```

#### 📝 一句话总结

Protenix-v1 是 ByteDance Seed 发布的全开源 biomolecular structure prediction 模型，以 AlphaFold3 风格的 Pairformer + diffusion 架构为基础，在匹配训练 cutoff、模型规模和推理预算的设置下达到或超过 AF3 级表现，并补齐模板、RNA MSA、训练代码与评测工具链。

#### 🎯 核心要点

- **AlphaFold3 级开源复现**：目标是复现 AF3 的全原子复合物预测能力，支持蛋白、DNA、RNA、小分子配体和多分子相互作用
- **v1 基座模型**：官方 README 将 `protenix_base_default_v1.0.0` 标为 v1 基座，368M 参数，训练数据 cutoff 为 2021-09-30，与 AF3 对齐
- **核心结构模块**：沿用 AF3 范式，由输入特征/MSA/template 表征、Pairformer 表征学习、扩散式全原子坐标生成和 confidence head 组成
- **v1 新能力**：相对早期 Protenix 版本加入 protein template integration、RNA MSA support，并改善训练动态与 inference-time performance
- **推理时扩展**：增加 diffusion seeds/samples 能在抗体-抗原等困难任务上带来近似 log-linear 质量提升，形成计算预算与准确率之间的可控旋钮
- **评测协议改进**：引入 common-intersection、bootstrapping、PXMeter/year-stratified benchmarks，避免不同模型失败样本不一致造成的排行榜偏差
- **来源校正**：任务给定 bioRxiv URL 不可访问；官方 GitHub 和论文引用指向 `https://www.biorxiv.org/content/10.64898/2026.02.05.703733v1`

#### 🔬 深入细节

##### 官方图示与来源

![Protenix-v1 FoldBench 与 inference-time scaling 结果](https://raw.githubusercontent.com/bytedance/Protenix/main/assets/protenix_base_default_v1.0.0_metrics.png)
*图：Protenix-v1 官方 README 中的 FoldBench-Corrected 与 inference-time scaling 结果。技术报告没有单独导出架构总图，方法机制需结合 v1 技术报告、2024 Protenix 方法报告和源码说明解读。*

v1 技术报告的可访问官方路径是 `https://github.com/bytedance/Protenix/blob/main/docs/PTX_V1_Technical_Report_202602042356.pdf`，README 给出的 citation DOI 为 `10.64898/2026.02.05.703733`。bioRxiv 页面在当前环境触发访问限制，因此正文方法级解读主要基于官方 GitHub README、v1 技术报告 PDF、2024 Protenix 方法报告和可访问的 ResearchGate 文本镜像。

##### 算法伪代码

```python
# Protenix-v1 / AF3-style biomolecular structure prediction
def protenix_predict(input_json, num_seeds=5, samples_per_seed=5, recycles=10):
    # 1. 解析多分子输入：protein / RNA / DNA / ligand / ions / covalent bonds
    features = featurize_biomolecular_complex(input_json)
    msa = build_msa(features.protein_sequences)
    rna_msa = build_rna_msa(features.rna_sequences)      # v1 support
    templates = search_or_load_protein_templates(features)  # v1 support

    predictions = []
    for seed in range(num_seeds):
        # 2. 推理时随机性：MSA subsampling、dropout、diffusion trajectory
        sampled_msa = subsample_msa(msa, max_rows=random_int(1, 16384))
        pair, single = input_embedder(features, sampled_msa, rna_msa, templates)

        # 3. recycle + Pairformer 表征学习
        for _ in range(recycles):
            pair, single = pairformer_stack(pair, single)

        # 4. diffusion module：从噪声原子坐标迭代去噪
        for sample in range(samples_per_seed):
            x = gaussian_atom_positions(features.atom_layout)
            for t in diffusion_schedule(reverse=True):
                x_denoised = diffusion_transformer(x, t, pair, single, features)
                x = diffusion_update(x, x_denoised, t)

            # 5. confidence head 估计 pLDDT / PAE / pTM / ipTM 等并排序
            confidence = confidence_head(x, pair, single)
            predictions.append((x, confidence))

    return rank_by_confidence(predictions)
```

##### 动机与背景

AlphaFold3 把结构预测从蛋白单链扩展到蛋白、核酸、小分子配体、离子和修饰的全生物分子复合物，但最初并未完整开放训练代码、权重和预处理流水线。Protenix 的定位是“可训练、可复现、可扩展”的 AF3 级开源基座，让研究者不仅能跑推理，还能检查数据处理、模型实现、评测协议和训练细节。

Protenix-v1 的贡献不只是一次模型权重更新。v1 报告强调三件事：在严格对齐 AF3 的训练 cutoff、模型规模和推理预算下达到或超过 AF3 级表现；通过更多 samples/seeds 展示 inference-time scaling；并指出既有 FoldBench 等评测存在模型失败样本覆盖不一致、方差未充分报告的问题，因此用 common intersection 和 bootstrapping 做更稳健比较。

##### AF3 风格架构机制

Protenix 继承 AF3 的核心抽象：先把输入分子系统离散成 token 和 atom features，再学习 single representation 与 pair representation，最后用扩散模型生成全原子坐标。Pairformer 负责在 \(N \times N\) pair 表征中积累“哪些 token 应该接近、以何种方式相互作用”的结构假设，diffusion module 则把这个结构假设解析为三维原子坐标。

Pairformer 的一个简化表达是：

$$
(s, z) \leftarrow \text{Pairformer}(s, z)
$$

其中 \(s_i\) 是 token \(i\) 的 single 表征，\(z_{ij}\) 是 token 对 \((i,j)\) 的 pair 表征。pair stack 通过 triangle updates / triangle attention 保持几何一致性，single stack 通过 pair-biased attention 让单点表征感知成对关系：

$$
\text{Attention}_{ij} \propto \frac{q_i^\top k_j}{\sqrt{d}} + b(z_{ij})
$$

直觉上，pair 表征提供结构先验偏置：如果 Pairformer 认为两个 token 之间存在强相互作用，扩散 Transformer 在坐标去噪时会更倾向于把它们放在合理距离和取向上。

##### 扩散坐标生成与损失

全原子坐标扩散可写成从噪声坐标 \(x_t\) 预测去噪坐标 \(\hat{x}_0\) 或噪声项。简化训练目标为：

$$
\mathcal{L}_{\text{diff}} =
\mathbb{E}_{x_0,t,\epsilon}
\left[
w(t)\left\|x_0 - f_\theta(x_t,t,s,z)\right\|_2^2
\lambda_{\text{bond}}\mathcal{L}_{\text{bond}}
\lambda_{\text{dist}}\mathcal{L}_{\text{distogram}}
\lambda_{\text{conf}}\mathcal{L}_{\text{confidence}}
\right]
$$

2024 Protenix 方法报告列出了一些对 AF3 补充材料的实现校正，例如 diffusion ODE 更新中应使用 \(x_{\text{noisy}}-x_{\text{denoised}}\)，diffusion Transformer block 的 AttentionPairBias 需要 residual connection，diffusion loss 的 per-sample weighting 也按 EDM 形式修正。报告还说明 Protenix 对 confidence head 加入 LayerNorm 和额外线性层，因为完全照 AF3 描述实现时 confidence loss 收敛较差。

##### v1 相比早期 Protenix 的改动

v1 报告说明 Protenix-v1 加入更完整的数据处理和输入特征，包括 RNA MSA support、protein template integration、expanded disorder-focused distillation 和 MGnify large-scale monomer distillation。这些补充使 v1 更接近 AF3 训练数据构成，也解释了为什么 v1 在蛋白-蛋白、抗体-抗原、蛋白-核酸等多模态任务上比早期 open-source baseline 更稳定。

推理配置方面，v1 报告采用与 AF3 对齐的扩散推理超参：通常 5 random seeds，每个 seed 生成 5 diffusion samples，recycles 固定为 10；报告中的 Protenix-v1 还用 20 seeds bootstrapping 估计方差。随机性来自 MSA subsampling、pair embedding dropout 和扩散采样轨迹。对困难目标，提高 seed/sample 数量会提升 selected prediction 质量：

$$
\text{quality} \approx a + b \log(\text{number of samples})
$$

这就是 inference-time scaling 的含义：模型本身不变，只用更多采样预算扩大候选集合，再由 confidence head 选择更可信结构。

##### 与 AlphaFold3 和其他开源模型的区别

Protenix-v1 与 AF3 的方法范式接近，但开放性不同：Protenix 发布代码、权重、训练/推理文档、MSA/template pipeline 和评测工具，允许社区复现与微调。与 Boltz-1、Chai-1、HelixFold3 等开源或开放模型相比，v1 报告强调在相同 cutoff、规模和推理预算下比较，并在 FoldBench common intersection、PXM-2024/2025、PXM-22to25-Ligand/Antibody 等基准上报告更细分的结果。

需要谨慎的是，YAML 中“全面超越 AF3”是动机描述，不应机械理解为每个子任务都优于 AF3。v1 报告显示 Protenix-v1 在 protein-protein 和 antibody-antigen 等接口任务上很强，但 AlphaFold3 在部分 protein-ligand、protein-DNA docking 指标上仍保留优势。更准确的结论是：Protenix-v1 是首批在公平预算下达到 AF3 级别、且完全开放训练和推理栈的模型之一。

#### 🧪 练习题

```yaml
question: "Protenix-v1 中 inference-time scaling 的核心含义是什么？"
options:
  - "增加训练集 cutoff 年份，使模型看到更多未来结构"
  - "固定模型参数，通过更多 diffusion seeds/samples 生成候选并用 confidence head 选择更优结构"
  - "把 Pairformer 全部替换成蛋白语言模型以减少 MSA 搜索"
  - "只预测蛋白单链，删除配体和核酸分支以提高准确率"
answer: 1
explain: "v1 报告强调在抗体-抗原等困难任务上，增加采样预算能持续提高选中结构质量；模型参数不变，额外成本来自更多扩散采样和排序。"
```
