### SciDFM：科学领域基础模型 (Scientific Domain Foundation Model)
```yaml
id: scidfm
name: SciDFM
full_name: 科学领域基础模型 (Scientific Domain Foundation Model)
year: '2024'
org: 复旦大学
paper_url: https://arxiv.org/abs/2401.12356
category: science_llm
parent: —
motivation: MoE架构科学大模型多领域专家
```

#### 📝 一句话总结
SciDFM 提出了一个从头训练的科学领域 MoE 大语言模型，用 8 专家、top-2 路由的稀疏 FFN 替代普通 Transformer FFN，并通过科学语料、分子/蛋白专用 token 与指令微调来补足通用 LLM 对化学分子和氨基酸序列的建模短板。

#### 🎯 核心要点
- MoE 架构：总参数约 18.2B、每次前向激活约 5.6B，26 层、隐藏维度 3200、上下文长度 8192、8 个专家且每个 token 选择 top-2 专家。
- 科学 token 设计：在 OpenLLaMA-3B BPE tokenizer 基础上，把化学原子和氨基酸字符作为独立 token，减少 SMILES 与蛋白序列被普通子词切碎的问题。
- 预训练数据：约 570B token 单轮语料，其中科学域约 300B、通用域约 270B；训练两轮后总计约 1.1T token。
- 指令微调数据：约 9.3M 条样本，覆盖数学、物理、生物、医学、化学与通用问答，并包含 Mol-Instructions、ChemDFM-sft 等分子/蛋白任务。
- 训练机制：AdamW、cosine learning-rate schedule、4M token macro batch、MoE auxiliary loss factor 0.02 与 expert capacity factor 1.0。
- 专家分析：论文用不同学科论文、分子 SMILES 与氨基酸序列统计专家选择向量，再用 t-SNE 展示专家路由会随学科/模态形成不同分布。
- 来源限制：任务给出的 `paper_url` 实际指向联邦学习论文；本文依据可追溯的 SciDFM 论文 `https://arxiv.org/abs/2409.18412` 和公开模型页 `https://huggingface.co/OpenDFM/SciDFM-MoE-A5.6B-v1.0` 撰写。

#### 🔬 深入细节
##### 图示与来源
![SciDFM 专家选择 t-SNE 可视化](https://arxiv.org/html/2409.18412v3/extracted/5994215/tsne.png)
*图：SciDFM 论文 Figure 1，展示数学、物理、化学、生物文本以及分子/蛋白序列在 MoE 专家选择统计上的 t-SNE 分布。论文没有给出单独的模型架构总览图，因此这里使用作者提供的专家行为分析图作为核心机制证据。*

可访问来源：SciDFM 的 arXiv HTML 为 `https://arxiv.org/html/2409.18412v3`；任务中的 `https://arxiv.org/abs/2401.12356` 不是 SciDFM 论文，正文按实际论文校正。

##### 机制拆解
SciDFM 的基础仍是 decoder-only Transformer，并沿用 LLaMA 系列常见改动：RMSNorm、RoPE 与 SwiGLU。关键差异在于把原本每层中的 dense FFN 替换为 MoE 层。对每个 token 的隐藏状态 \(x\)，门控网络产生专家概率：

$$
p=\mathrm{Softmax}(xW_g),\qquad S=\mathrm{TopK}(p, k=2)
$$

MoE 输出可写成：

$$
\mathrm{MoE}(x)=\sum_{i\in S} p_i E_i(x)
$$

其中 \(E_i\) 是第 \(i\) 个专家 FFN。直觉上，注意力层仍负责跨 token 交互，而 MoE FFN 负责把 token 映射到少量更适合的专家子网络；top-2 路由让计算量接近 5.6B 激活参数，同时保留 18.2B 总容量。训练时还加入负载均衡辅助项，避免少数专家长期被过度使用：

$$
\mathcal{L}_{\mathrm{train}}
=-\sum_t \log p_\theta(x_t\mid x_{<t})
+\lambda \mathcal{L}_{\mathrm{aux}}
$$

SciDFM 的 tokenizer 是另一个方法核心。普通 BPE 对 SMILES 或氨基酸序列可能把一个化学原子、括号、键符号或残基拆到不稳定的子词边界；SciDFM 把化学原子和 20 类氨基酸字符作为独立 token，并使用特殊标识区分科学符号和自然语言文本。例如 `C(C(=O)O)N` 会按原子、括号和键相关符号切分，蛋白序列 `MIRLGAPQTL` 则按残基逐字符切分。这样做的效果不是显式建模 3D 结构，而是让语言模型至少在序列层面看到稳定的科学符号单元。

论文还提出了一种专家选择分析方式。设第 \(i\) 层 MoE gate 对长度为 \(l\) 的文本输出 \(g_i\)，专家数为 \(e\)，该层的专家选择摘要为：

$$
e_i=\mathrm{Softmax}\left(\sum_{j=1}^{l} g_i[j,:]\right)\in\mathbb{R}^{e}
$$

把所有 \(N\) 个 MoE 层的摘要拼接为：

$$
E_T=\mathrm{Concat}([e_1,e_2,\dots,e_N])\in\mathbb{R}^{Ne}
$$

这相当于把一段文本或序列投影成“它倾向使用哪些专家”的指纹。论文对数学、物理、化学、生物论文以及分子/蛋白序列分别采样后发现，学科文本在专家选择空间中出现聚类，分子和蛋白序列又与普通学科论文明显分离，说明 MoE 路由确实学习到了不同科学数据类型的差异。

##### 训练与推理伪代码
```python
# SciDFM pretraining: decoder-only LM with top-2 MoE FFN
for batch in science_and_general_corpus:
    tokens = scientific_tokenizer(batch)  # text, SMILES, amino-acid sequences
    hidden = embed(tokens)

    aux_loss = 0.0
    for layer in transformer_layers:
        hidden = hidden + self_attention(layer.norm1(hidden))

        x = layer.norm2(hidden)
        gate_prob = softmax(x @ layer.gate_weight)
        expert_ids = topk(gate_prob, k=2)
        moe_out = 0
        for expert_id in expert_ids:
            moe_out += gate_prob[expert_id] * layer.experts[expert_id](x)
        hidden = hidden + moe_out
        aux_loss += load_balance_loss(gate_prob, expert_ids)

    lm_loss = cross_entropy(next_token_head(hidden), tokens.shift_left())
    loss = lm_loss + 0.02 * aux_loss
    loss.backward()
    optimizer.step()
```

推理阶段没有额外检索或工具调用：输入文本、SMILES 或蛋白序列先经科学 tokenizer 编码，再经过同一组 MoE Transformer 层；每个 token 的 gate 动态选择两个专家，因此同一个模型能在数学推理、医学问答、分子属性描述和蛋白功能描述之间共享底层表示，同时保留一定的专家分工。

> 💡 关键：SciDFM 的贡献不是提出新的注意力机制，而是把“科学语料 + 科学符号 tokenizer + 稀疏 MoE 容量”组合成一个通用科学 LLM，并用专家选择分析证明不同科学域会触发不同路由模式。

#### 🧪 练习题
```yaml
question: "SciDFM 使用 MoE 层替代普通 FFN 的主要目的是什么？"
options:
  - "让每个 token 动态路由到少量专家，在增加总参数容量的同时控制激活计算量"
  - "完全移除注意力层，只依赖专家网络完成序列建模"
  - "把分子 3D 坐标直接编码进模型结构"
  - "用检索数据库替代预训练语料"
answer: 0
explain: "SciDFM 的 MoE 层通过 top-2 gate 激活少数专家，使模型拥有更大的总容量，但每次前向只计算部分专家。"
```
