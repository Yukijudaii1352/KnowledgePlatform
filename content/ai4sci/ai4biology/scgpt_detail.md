### scGPT — 生成式单细胞多组学基础模型

```yaml
id: scgpt
name: scGPT
full_name: scGPT (scGPT)
year: '2024.02'
org: 多伦多大学
paper_url: https://www.nature.com/articles/s41592-024-02201-0
category: single_cell
parent: —
motivation: 生成式多组学集成与扰动预测
```

#### 📝 一句话总结

scGPT 将单细胞中的基因视为 token、表达值视为 token value，用生成式 Transformer 在 3,300 万级细胞图谱上预训练，解决单细胞任务中跨批次、跨模态和扰动场景缺少统一可迁移表征的问题。

#### 🎯 核心要点

- **基因-token Transformer**：每个细胞被表示为基因 token 序列，输入同时包含基因身份、表达值和可选条件 token（批次、模态、扰动等）
- **大规模预训练语料**：基于 CELLxGENE census 等来源的 3,300 万以上单细胞表达谱学习通用细胞和基因表征
- **生成式掩码建模**：随机隐藏部分基因表达值，训练模型根据已知表达和上下文恢复 masked gene expression
- **双层预测目标**：既通过 transformer hidden states 预测每个 masked gene 的表达，也通过 cell embedding + gene embedding 的 MVC decoder 强化细胞级表征
- **显式零值建模**：可输出基因为零表达的 Bernoulli 概率，适配 scRNA-seq 中大量 dropout/真实零值混合的稀疏特征
- **任务适配头**：支持细胞类型注释、批次校正、多组学整合、Perturb-seq 扰动预测和基因调控网络推断
- **注意力解释基因关系**：利用基因 token attention 分析潜在 gene-gene interaction，生成可用于 GRN 推断的边权
- **工程实现**：官方代码包含 `TransformerModel`、`ExprDecoder`、`MVCDecoder`、domain-specific batch norm、contrastive cell embedding 和 elastic cell similarity 等模块

#### 🔬 深入细节

##### 模型架构图与可访问来源

![scGPT 模型示意图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-024-02201-0/MediaObjects/41592_2024_2201_Fig1_HTML.png)
*图：Nature Methods Fig. 1。scGPT 先在大规模细胞图谱上生成式预训练，再针对注释、扰动、多组学整合和 GRN 推断等任务微调；输入由 gene token、expression value 和 condition token 共同组成。*

可访问来源：论文页面 https://www.nature.com/articles/s41592-024-02201-0；官方代码 https://github.com/bowang-lab/scGPT；API 文档 https://scgpt.readthedocs.io/en/latest/scgpt.model.html。Nature 页面只能公开显示摘要、图和数据/代码信息，方法细节同时参考官方代码与文档中的模型接口。

##### 算法伪代码

```python
# scGPT 预训练与任务适配伪代码
def pretrain_scgpt(cell_batches, model):
    for genes, expr_values, batch_labels in cell_batches:
        # genes: [B, L] gene ids, expr_values: [B, L] normalized/binned expression
        mask = sample_gene_mask(expr_values)
        input_values = expr_values.clone()
        input_values[mask] = MASK_VALUE

        # gene embedding + value embedding + optional batch/modality/perturbation condition
        out = model(
            src=genes,
            values=input_values,
            src_key_padding_mask=(genes == PAD),
            batch_labels=batch_labels,
            MVC=True,
            ECS=True,
        )

        # token-level expression reconstruction
        loss_gep = masked_mse(out["mlm_output"], expr_values, mask)

        # cell-embedding-conditioned masked value prediction
        loss_mvc = masked_mse(out["mvc_output"], expr_values, mask)

        # optional explicit zero probability for sparse scRNA-seq values
        loss_zero = bernoulli_nll(out.get("mlm_zero_probs"), expr_values > 0, mask)

        # optional embedding regularizers / task heads
        loss = loss_gep + loss_mvc + loss_zero + out.get("loss_ecs", 0.0)
        optimizer.step(loss)


def adapt_for_perturbation(control_cell, perturbation_tokens, pretrained_model):
    genes, values = tokenize_cell(control_cell)
    values = inject_perturbation_condition(values, perturbation_tokens)
    predicted_expr = pretrained_model.generate(
        cell_emb=encode_cell(control_cell),
        src=genes,
        values=values,
        gen_iters=K,
    )
    return predicted_expr
```

##### 动机与背景

单细胞 RNA-seq 数据天然像一个极稀疏的 cell-by-gene 矩阵：每个细胞只有一部分基因有非零表达，批次、测序平台、模态和扰动条件又会显著改变观测分布。传统流程通常为不同任务分别训练模型，例如注释用分类器、整合用 Harmony/scVI、扰动预测用 scGen/GEARS。这种分散式设计难以复用跨组织、跨实验积累的大规模先验。

scGPT 的核心思想是把“一个细胞中哪些基因表达到什么程度”转化为生成式建模问题。类似语言模型根据上下文恢复缺失词，scGPT 根据已观测基因表达、细胞上下文和条件 token 恢复 masked gene expression。这样得到的 hidden states 既能作为 gene-level 表征，也能池化为 cell-level embedding，用于不同下游任务。

##### 输入表示：基因身份、表达值与条件

给定一个细胞的基因集合 \(G=\{g_1,\ldots,g_L\}\) 和表达值 \(x=\{x_1,\ldots,x_L\}\)，scGPT 为每个位置构造 gene embedding 与 value embedding：

$$
h_i^{(0)} = E_{\mathrm{gene}}(g_i) + E_{\mathrm{value}}(x_i) + E_{\mathrm{cond}}(c_i)
$$

其中 \(c_i\) 可表示批次、模态、扰动条件等任务相关信息。官方实现中 value encoder 可以是连续数值投影或分箱类别嵌入；当使用 batch label 或 domain-specific batch norm 时，模型还能把批次信息显式传入编码器或 decoder，从而服务于批次校正和 reference mapping。

Transformer 编码后得到每个 gene token 的上下文表示：

$$
H = \mathrm{TransformerEncoder}(h^{(0)}, \mathrm{padding\ mask})
$$

细胞向量 \(z_{\mathrm{cell}}\) 通常由 `[CLS]`、池化或加权池化得到。直觉上，gene token hidden state 保存“这个基因在当前细胞状态下的上下文”，cell embedding 保存“整个表达谱的细胞状态”。

##### 生成式掩码恢复与表达损失

预训练时，模型随机遮盖一部分表达值，只保留 gene identity 和未遮盖表达上下文。主要表达预测头对 masked 位置输出 \(\hat{x}_i\)，使用 masked MSE：

$$
\mathcal{L}_{\mathrm{GEP}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left(\hat{x}_i-x_i\right)^2
$$

scRNA-seq 的零值有两种来源：真实低表达和测序 dropout。scGPT 的实现可额外预测非零概率 \(p_i^{0}\)，用 Bernoulli 负对数似然建模该位置是否表达：

$$
\mathcal{L}_{\mathrm{zero}}
=
-\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\log \mathrm{Bernoulli}\left(\mathbb{1}[x_i>0];p_i^{0}\right)
$$

> 💡 关键：这里预测的是连续或分箱后的表达值，而不是只预测“哪个基因出现”。这保留了 scRNA-seq 中表达强弱对细胞状态的贡献。

##### MVC：用细胞向量反推基因表达

除了 token-level decoder，scGPT 还包含 masked value prediction for cell embedding，也就是 MVC decoder。它以 cell embedding 与 gene embedding 为输入，要求单个细胞向量也能恢复 masked gene expression：

$$
\hat{x}_{i}^{\mathrm{MVC}}
=
f_{\mathrm{mvc}}(z_{\mathrm{cell}}, e_{g_i})
$$

对应损失为：

$$
\mathcal{L}_{\mathrm{MVC}}
=
\frac{1}{|\mathcal{M}|}
\sum_{i\in\mathcal{M}}
\left(\hat{x}_{i}^{\mathrm{MVC}}-x_i\right)^2
$$

这个目标让 cell embedding 不只是分类或聚类用的低维摘要，而必须携带足够信息来重构基因表达模式。对下游任务而言，这能提高细胞表示的可迁移性：同一个 embedding 可接分类头、整合目标、扰动预测头或检索式 reference mapping。

##### 训练/推理流程与下游任务

预训练阶段使用大量未标注细胞，优化表达恢复、MVC 和可选零值目标。微调时，模型保持相同的 tokenization 和 Transformer 主体，替换或增加任务 head：细胞类型注释接分类器；批次整合加入 batch/domain 约束；多组学整合通过 modality condition token 对齐 RNA、ATAC 或 protein；扰动预测则把 perturbation condition 注入输入，让模型生成扰动后的表达谱。

在 Perturb-seq 任务中，输入可理解为“控制细胞表达 + 目标扰动条件”，输出是扰动后基因表达：

$$
\hat{x}^{\mathrm{pert}}
=
f_{\theta}(x^{\mathrm{ctrl}}, c_{\mathrm{pert}})
$$

训练目标仍可写成被观测扰动表达和预测表达之间的回归误差：

$$
\mathcal{L}_{\mathrm{pert}}
=
\frac{1}{|\Omega|}
\sum_{j\in\Omega}
\left(\hat{x}^{\mathrm{pert}}_j-x^{\mathrm{pert}}_j\right)^2
$$

##### 与传统单细胞模型的区别

| 维度 | 传统任务模型 | scGPT |
|------|--------------|-------|
| 输入单位 | 通常是固定 HVG 表达矩阵 | gene token + expression value + condition token |
| 训练范式 | 每个任务单独训练 | 大规模生成式预训练后适配 |
| 输出表征 | 多为 cell embedding | cell embedding、gene embedding、表达生成结果 |
| 稀疏性处理 | 归一化、HVG、VAE 分布假设 | masked expression recovery + explicit zero probability |
| 多任务能力 | 注释、整合、扰动常分离 | 同一主干覆盖注释、整合、扰动、GRN |

scGPT 的实际价值在于把多个单细胞分析任务压到一个共享模型接口中：模型不只判断细胞类型，还能在条件变化后生成表达响应，并用注意力和 gene embeddings 给出基因关系线索。不过它也继承了单细胞 foundation model 的共同风险：预训练语料偏差、批次标签泄漏、zero-shot 泛化能力和注意力解释的生物学可信度都需要在具体数据集上重新验证。

#### 🧪 练习题

```yaml
question: "scGPT 中 MVC decoder 的主要作用是什么？"
options:
  - "只把细胞类型标签映射成 one-hot 编码"
  - "用 cell embedding 和 gene embedding 预测 masked gene expression，迫使细胞向量保留可重构的表达信息"
  - "把 RNA 序列翻译成蛋白质序列"
  - "删除所有零表达基因以减少词表大小"
answer: 1
explain: "MVC 让单个 cell embedding 也能恢复被遮盖的表达值，因此增强了细胞级表征对下游注释、整合和扰动任务的可迁移性。"
```
