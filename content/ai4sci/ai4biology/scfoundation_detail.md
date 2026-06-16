### scFoundation — 面向约 2 万基因的单细胞转录组基础模型

```yaml
id: scfoundation
name: scFoundation
full_name: scFoundation (scFoundation)
year: '2024.06'
org: 清华大学
paper_url: https://www.nature.com/articles/s41592-024-02305-7
category: single_cell
parent: —
motivation: 1亿参数最大规模单细胞模型
```

#### 📝 一句话总结

scFoundation 基于 xTrimoGene 的非对称 Transformer-like encoder-decoder，在 5,000 万以上人类单细胞转录组上预训练约 1 亿参数模型，解决全基因、连续表达值和测序深度差异下大规模单细胞表征学习的效率与泛化问题。

#### 🎯 核心要点

- **大规模覆盖**：模型约 100M 参数，覆盖约 20,000 个基因，预训练数据超过 50 million human single-cell transcriptomic profiles
- **xTrimoGene 主干**：采用非对称 encoder-decoder，encoder 只处理非零且未 mask 的高信息 token，decoder 处理全基因输出
- **稀疏性加速**：利用 scRNA-seq 约 90% 零值的特性，避免在 encoder 中对大量零表达基因做二次 attention
- **连续表达嵌入**：通过 auto-discretization/value embedding 将连续 expression scalar 映射到高维表示，避免粗糙整数分箱损失表达强度信息
- **RDA 预训练任务**：read-depth-aware modeling 用 target total count \(T\) 与 source total count \(S\) 连接不同测序深度的同一细胞表达
- **回归式 masked modeling**：预测 masked gene expression 的连续值，主要用 MSE 而不是多类别交叉熵
- **双粒度输出**：encoder 输出可池化为 cell embedding，decoder 输出 gene-level context embedding，用于药物响应、扰动预测、注释和 gene module inference
- **免微调读深增强**：通过设置推理时的 \(T>S\)，模型可把低 read-depth 输入映射到更高 read-depth 的表达估计

#### 🔬 深入细节

##### 模型架构图与可访问来源

![scFoundation 预训练框架图](https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41592-024-02305-7/MediaObjects/41592_2024_2305_Fig1_HTML.png)
*图：Nature Methods Fig. 1。scFoundation 采集大规模人类单细胞数据，使用 RDA 任务预训练；预训练流程包含 Bayesian downsampling、mask、非零 token encoder、全基因 decoder、cell embedding pooling 和 masked regression loss。*

可访问来源：论文页面 https://www.nature.com/articles/s41592-024-02305-7；官方代码 https://github.com/biomap-research/scFoundation；xTrimoGene 架构论文 https://arxiv.org/html/2311.15156v2。Nature 页面公开摘要、图和数据/代码信息；具体主干机制可追溯到 xTrimoGene 论文和官方仓库。

##### 算法伪代码

```python
# scFoundation / xTrimoGene RDA 预训练伪代码
def pretrain_scfoundation(raw_counts, model):
    # raw_counts: [B, G] full-gene expression, G ~= 20,000
    x_raw = normalize_and_log1p(raw_counts)

    # RDA: 构造低 read-depth source input
    x_source = hierarchical_bayesian_downsample(x_raw)
    T = total_count(x_raw)       # target read depth indicator
    S = total_count(x_source)    # source read depth indicator

    mask = biased_mask_zero_and_nonzero_positions(x_source)
    x_input = x_source.clone()
    x_input[mask] = MASK_VALUE

    # encoder 只看非零且未 mask 的 token，附加 T/S 指示符
    visible_idx = (x_input != 0) & (~mask)
    enc_tokens = make_gene_value_tokens(x_input, visible_idx, extra=[T, S])
    enc_h = transformer_encoder(enc_tokens)

    # decoder 接收 encoder output、zero embeddings、mask embeddings，恢复全基因
    dec_tokens = extend_to_full_gene_length(enc_h, mask, zero_positions=(x_input == 0))
    gene_context = performer_decoder(dec_tokens)
    x_hat = shared_mlp(gene_context)

    loss = mse(x_hat[mask], x_raw[mask])
    optimizer.step(loss)


def enhance_low_depth_cell(low_depth_counts, target_depth, model):
    x = normalize_and_log1p(low_depth_counts)
    S = total_count(x)
    T = target_depth
    return model.predict(x, T=T, S=S)  # no fine-tuning read-depth enhancement
```

##### 动机与背景

单细胞基础模型面临三个工程和建模矛盾。第一，人类常用基因列表接近 20,000，如果像 BERT 一样把所有基因都送入 full attention，单细胞图谱规模下计算不可承受。第二，scRNA-seq 极稀疏，许多零值是低表达或 dropout，把这些零 token 与高信息非零 token 等价处理会浪费大量算力。第三，表达值是连续计数/归一化值，简单离散成整数或类别会丢失“表达值相近意味着状态相近”的连续语义。

scFoundation 继承并扩展 xTrimoGene 的设计：用一个重 encoder、轻 decoder 的非对称结构，让昂贵的 Transformer encoder 只处理信息密度高的非零非 mask 基因；再由更轻的 decoder 合并 zero/mask token，输出全基因表达预测。这样既能覆盖约 2 万基因，又能把预训练扩展到 5,000 万以上细胞。

##### 非对称 encoder-decoder：为稀疏矩阵定制

对一个细胞的表达向量 \(x\in\mathbb{R}^{G}\)，先随机 mask 一部分零和非零位置。令可见非零位置集合为：

$$
\mathcal{V}=\{j\mid x_j>0,\ j\notin\mathcal{M}\}
$$

encoder 输入只包含 \(\mathcal{V}\) 中的 token。每个 token 由 gene embedding 和 value embedding 相加：

$$
h_j^{(0)} = E_{\mathrm{gene}}(j)+E_{\mathrm{value}}(x_j),\quad j\in\mathcal{V}
$$

然后用标准 multi-head self-attention 得到上下文表示：

$$
H_{\mathcal{V}}=\mathrm{TransformerEncoder}\left(\{h_j^{(0)}:j\in\mathcal{V}\}\right)
$$

decoder 阶段再把 encoder output、zero embedding 和 mask embedding 扩展回全基因长度：

$$
\tilde{H}_{1:G}=\mathrm{Merge}(H_{\mathcal{V}}, E_{\mathrm{zero}}, E_{\mathrm{mask}}, E_{\mathrm{gene}})
$$

随后使用较轻的 Performer decoder：

$$
Z_{1:G}=\mathrm{PerformerDecoder}(\tilde{H}_{1:G}),\quad \hat{x}_{1:G}=\mathrm{MLP}(Z_{1:G})
$$

这种非对称设计的直觉是：高容量 encoder 专注于真实观测到的表达上下文，轻量 decoder 负责把上下文广播到全基因空间并完成 masked regression。

##### 连续表达值的 auto-discretization

scFoundation/xTrimoGene 不把表达值简单四舍五入为离散类别，而是学习一个从连续标量到 embedding 的软映射。可抽象为：

$$
\alpha(x)=\mathrm{softmax}(W_2\,\sigma(W_1x))
$$

$$
E_{\mathrm{value}}(x)=\sum_{b=1}^{B}\alpha_b(x)\,v_b
$$

其中 \(v_b\) 是可学习 bin embedding，\(\alpha_b(x)\) 是表达值 \(x\) 对第 \(b\) 个 bin 的软权重。这样相近表达值会得到相近的 embedding 组合，远离表达值则对应明显不同的权重分布。相比硬分箱，这更适合保留连续表达强度信息。

##### RDA：read-depth-aware masked modeling

Nature 版本 scFoundation 的关键预训练任务是 RDA。它先从原始表达 \(x^{\mathrm{raw}}\) 构造一个低 read-depth 或未改变的 source 输入 \(x^{\mathrm{src}}\)，再把两个 total count 指示符输入模型：

$$
T=\sum_j x^{\mathrm{raw}}_j,\quad S=\sum_j x^{\mathrm{src}}_j
$$

其中 \(T\) 是 target read depth，\(S\) 是 source read depth。模型输入可写成：

$$
\mathrm{input} = [x^{\mathrm{src}}, T, S]
$$

在 masked positions \(\mathcal{M}\) 上预测原始表达：

$$
\mathcal{L}_{\mathrm{RDA}}
=
\frac{1}{|\mathcal{M}|}
\sum_{j\in\mathcal{M}}
\left(\hat{x}_j - x^{\mathrm{raw}}_j\right)^2
$$

如果 \(x^{\mathrm{src}}\) 是 downsampled profile，模型就被迫学习如何从低测序深度恢复高测序深度表达；如果 \(x^{\mathrm{src}}=x^{\mathrm{raw}}\)，任务退化为常规 masked expression recovery。RDA 因此同时学习 gene co-expression 关系和 read-depth 变化下的表达映射。

> 💡 关键：推理时可以设置 \(T>S\)，让模型在不微调的情况下执行 read-depth enhancement；这不是普通 MLM 自然具备的能力，而是 RDA 训练目标显式赋予的。

##### mask 策略与零值监督

由于零值占比远高于非零值，如果按同一概率随机 mask，模型可能学会“预测零”就能获得低误差。xTrimoGene/scFoundation 使用偏置 mask，使零和非零位置的监督更平衡：

$$
P(j\in\mathcal{M}\mid x_j>0) > P(j\in\mathcal{M}\mid x_j=0)
$$

同时仍保留一部分零值监督，因为某些零确实代表生物学上的极低表达。这个策略让模型既不会被零 token 主导，也不会完全忽略零表达对细胞状态的意义。

##### 下游使用：cell embedding 与 gene context embedding

预训练后，scFoundation 有两类常用输出。第一，encoder output 可通过 pooling 得到 cell embedding：

$$
z_{\mathrm{cell}}=\mathrm{Pool}(H_{\mathcal{V}})
$$

用于细胞聚类、细胞类型注释、批次/跨数据集映射、bulk 或 single-cell drug response prediction。第二，decoder 输出 \(Z_{1:G}\) 是 gene-level context embeddings，可用于 perturbation prediction 和 gene module inference。例如接入 GEARS 时，可用 scFoundation 的上下文 gene embedding 替代或增强原始表达输入，提高扰动后 top differential expressed genes 的预测质量。

##### 与 scBERT/scGPT 等模型的区别

| 维度 | scBERT / 常规 encoder-only | scGPT | scFoundation |
|------|-----------------------------|-------|--------------|
| token 粒度 | gene | gene + condition | gene + value + T/S |
| 主体结构 | full/efficient encoder | Transformer encoder + generation heads | 重 encoder + 轻 Performer decoder |
| 稀疏性处理 | 多数仍处理长基因序列 | 可按任务裁剪 gene set | encoder 过滤零和 mask token |
| 表达目标 | masked classification/regression | generative masked value prediction | RDA masked regression |
| 读深建模 | 通常隐式 | 主要通过数据/条件适配 | 显式输入 target/source total counts |
| 典型输出 | cell embedding | cell/gene embedding 与生成表达 | cell embedding 与 gene context embedding |

scFoundation 的优势在于规模和全基因覆盖：它不依赖只选 HVG 来降低输入维度，而是通过架构利用稀疏性来扩展到约 20,000 基因。代价是模型机制比简单 encoder 更复杂，且 RDA 的读深增强能力依赖训练时 downsampling 分布与目标数据测序机制是否匹配。因此在新平台、新物种或非标准计数矩阵上使用时，仍应检查归一化、基因列表映射和 \(T/S\) 设置。

#### 🧪 练习题

```yaml
question: "scFoundation 的 RDA 预训练任务相比普通 masked expression recovery 多建模了什么信息？"
options:
  - "只建模蛋白质三维坐标"
  - "显式加入 target/source total count，让模型学习不同 read depth 之间的表达映射"
  - "完全删除零表达基因，不再预测 masked values"
  - "把每个细胞当作图像像素进行卷积"
answer: 1
explain: "RDA 使用 T 和 S 表示目标与输入测序深度，训练模型从 masked/低深度输入恢复原始表达，因此可服务于免微调 read-depth enhancement。"
```
