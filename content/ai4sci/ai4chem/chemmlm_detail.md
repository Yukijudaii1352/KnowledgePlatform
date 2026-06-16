### ChemMLLM - 化学多模态大语言模型

```yaml
id: chemmlm
name: ChemMLLM
full_name: "化学多模态大语言模型 (ChemMLLM)"
year: "2026.01"
org: 上海人工智能实验室
paper_url: "https://arxiv.org/abs/2412.04112"
category: representation
parent: grover
motivation: "统一处理文本、SMILES和分子图像的多模态架构"
```

#### 📝 一句话总结

ChemMLLM 提出“图像 tokenizer - LLM - 图像 de-tokenizer”的化学多模态生成框架，将文本、SMILES 和二维分子图像统一为离散 token 序列，解决既有化学 LLM 多数只能理解图像、不能直接生成分子图像的问题。

#### 🎯 核心要点

- **来源限制说明**：输入 YAML 中的 `paper_url` 指向 arXiv:2412.04112，但该编号实际为光子神经网络论文；本文基于可访问的 ChemMLLM arXiv:2505.16326、GitHub 和 Cell Reports Physical Science 2026 版本信息整理
- **统一三模态表示**：文本、SMILES 和分子图像都被转换为 token 序列，送入同一个自回归 LLM
- **Mol-VQGAN 图像 tokenizer**：针对稀疏、线条化的二维分子结构图微调 VQGAN，避免自然图像 VQGAN 重构原子和键时失真
- **图像生成闭环**：模型不仅能 image-to-text / image-to-SMILES，还能 text-to-image、property-to-image 和 image-to-image 分子优化
- **五类多模态任务**：img2caption、img2property、img2smiles、property2img、img2img，覆盖理解、识别、设计和优化
- **两阶段训练**：先训练 Mol-VQGAN，再冻结 Mol-VQGAN 并用 Lumina-mGPT/Chameleon 风格框架对 LLM 做监督微调
- **化学有效性评估**：使用 BLEU、ROUGE、METEOR、MSE、MAE、Pearson、Tanimoto、valid rate、Increased LogP、diversity 等指标
- **实证优势**：在图像到 SMILES、图像性质预测、多目标图像生成和分子图像优化等任务上超过通用 MLLM 与化学专用 LLM 基线

#### 🔬 深入细节

![ChemMLLM 总体架构](https://arxiv.org/html/2505.16326v2/x2.png)
*图：ChemMLLM 的 Mol-VQGAN 图像 tokenizer/de-tokenizer、SMILES/text tokenizer、自回归训练与推理流程。*

##### 算法伪代码

```python
# ChemMLLM 两阶段训练与推理伪代码
def train_mol_vqgan(molecule_images):
    E, G, codebook, D = init_from_chameleon_vqgan()
    for x in molecule_images:
        z_cont = E(x)
        z_q = nearest_codebook_vector(z_cont, codebook)
        x_hat = G(z_q)
        loss = vqvae_loss(x, x_hat, z_cont, z_q)
        loss += lambda_1 * perceptual_loss(x, x_hat)
        loss += lambda_2 * gan_loss(D, x, x_hat)
        update(E, G, codebook, D, loss)
    return E, G, codebook

def train_chemmllm(samples, mol_vqgan, text_tokenizer, llm):
    freeze(mol_vqgan)
    for sample in samples:
        image_tokens = mol_vqgan.encode(sample.image) if sample.has_image else []
        text_tokens = text_tokenizer.encode(sample.text_or_smiles)
        target_tokens = encode_output(sample.output, mol_vqgan, text_tokenizer)
        sequence = concat(prompt_tokens, image_tokens, text_tokens, target_tokens)
        loss = next_token_cross_entropy(llm, sequence) + z_loss(llm.logits)
        update(llm, loss)

def infer(prompt):
    seq = tokenize_prompt(prompt)
    generated = autoregressive_decode(llm, seq)
    if generated.contains_image_tokens():
        return mol_vqgan.decode(generated.image_tokens)
    return text_tokenizer.decode(generated.text_tokens)
```

##### 动机与背景

化学信息天然是多模态的：论文和实验记录中有自然语言描述，数据库中有 SMILES，化学家日常交流中又大量使用二维分子结构图。此前的化学 LLM 往往只能处理文本或 SMILES；一些化学视觉语言模型可以把分子图像作为输入，但输出仍然主要是文本，缺少直接生成分子图像的能力。

ChemMLLM 的设计目标是将分子图像也变成“语言式 token”。这样，图像理解和图像生成都可以被改写为同一个 next-token prediction 问题，而不需要为每个任务单独构造 CNN、GNN 或扩散模型。

##### Mol-VQGAN：把分子图像离散化

二维分子图像和自然图像差异很大：背景大面积空白，信息主要集中在细线、原子字符、键型和环结构上。自然图像 tokenizer 在这里容易把键线弄断、把原子字符模糊化，导致生成结果化学不可读。ChemMLLM 因此微调了一个面向分子图像的 Mol-VQGAN。

给定图像 \(x \in \mathbb{R}^{H \times W \times 3}\)，编码器得到连续特征：

$$
\hat{z} = E(x), \quad \hat{z} \in \mathbb{R}^{h \times w \times n_z}
$$

然后对每个空间位置做向量量化，选择最近的 codebook 向量：

$$
z_q = \mathbf{q}(\hat{z})
  = \arg\min_{z_k \in Z}\|\hat{z}_{ij} - z_k\|
$$

解码器从离散 latent 重建图像：

$$
\hat{x} = G(z_q) = G(\mathbf{q}(E(x)))
$$

Mol-VQGAN 的训练目标结合了 VQVAE 重构、感知损失和对抗损失：

$$
\min_{E,G,Z}\max_D
\left[
\mathcal{L}_{vqvae}(E,G,Z)
+ \lambda_1 \mathcal{L}_{perceptual}(E,G,Z)
+ \lambda_2 \mathcal{L}_{GAN}(\{E,G,Z\},D)
\right]
$$

其中 \(\mathcal{L}_{vqvae}\) 包含图像重构误差、codebook 误差和 commitment 误差；\(\mathcal{L}_{perceptual}\) 用高层视觉特征约束分子图像清晰度；\(\mathcal{L}_{GAN}\) 通过 patch discriminator 让重构的原子、键和局部结构更像真实分子图。

##### LLM 统一建模文本、SMILES 和图像

SMILES 直接通过文本 tokenizer 映射成 token 序列；分子图像通过 Mol-VQGAN 映射成 image token 序列。ChemMLLM 将两类 token 拼接成统一序列：

$$
s_i \in S = \{S_I, S_T\}
$$

其中 \(S_I\) 是图像 token，\(S_T\) 是文本或 SMILES token。LLM 使用标准自回归 next-token objective：

$$
\mathcal{L}_{LLM}
= -\sum_{i=1}^{L}\log p_\theta(s_i \mid s_1,\ldots,s_{i-1})
+ \lambda\sum_k\left(\log \sum_{j=1}^{V}\exp(z_{k,j})\right)^2
$$

第二项是 z-loss，用于缓解 logits shift，提高大模型微调稳定性。推理时，如果模型输出文本 token，就直接解码为 caption、性质值或 SMILES；如果输出图像 token，就交给 Mol-VQGAN de-tokenizer 还原为二维分子结构图。

> 💡 关键：ChemMLLM 不是给 LLM 外接一个“只读”的视觉编码器，而是让图像输入和图像输出都进入同一个离散 token 空间，从而支持 any-to-any 式化学任务。

##### 五类任务如何统一

| 任务 | 输入 | 输出 | 主要能力 |
|---|---|---|---|
| img2caption | 分子图像 + 指令 | 文本 | 读图并解释结构、来源、功能或用途 |
| img2property | 分子图像 + 指令 | 文本数值 | 从二维结构图估计 MW、LogP、TPSA、Hbd、Hba、Rb、QED |
| img2smiles | 分子图像 + 指令 | SMILES | 分子结构识别与符号化 |
| property2img | 属性约束文本 | 分子图像 | 按多目标性质生成分子结构图 |
| img2img | 原分子图像 + 优化指令 | 新分子图像 | 保持相似性并提升目标性质，如 LogP |

所有任务的本质都是给定前缀 token，预测后续 token。区别只在于 token 的模态和评价指标不同。

##### 与 GROVER 等分子表示模型的区别

GROVER 以分子图为核心，在图 Transformer 上做自监督预训练，目标是提升分子性质预测表示；ChemMLLM 则以 LLM 为核心，把 SMILES、文本和分子图像都变成语言式 token，目标是支持化学问答、识别、设计和图像生成的统一交互。

| 维度 | GROVER | ChemMLLM |
|---|---|---|
| 核心输入 | 分子图 | 文本、SMILES、二维分子图像 |
| 主干 | 图 Transformer | 自回归多模态 LLM |
| 预训练任务 | 节点/边上下文、官能团预测 | 多任务监督微调 + 图像 tokenizer 训练 |
| 输出形式 | 表示向量或性质预测 | 文本、SMILES、分子图像 |
| 关键能力 | 分子表示学习 | 化学多模态理解与生成 |

ChemMLLM 的风险也来自这个设计：二维分子图像的生成质量并不等价于化学有效性，仍需要 RDKit 解析、Tanimoto 相似度、valid rate 和性质计算来过滤。换言之，Mol-VQGAN 解决的是“能否画清楚”，LLM 还必须学习“画出的结构是否有效且满足目标”。

#### 🧪 练习题

```yaml
question: "ChemMLLM 为什么要训练 Mol-VQGAN，而不是直接使用自然图像 VQGAN？"
options:
  - "自然图像 VQGAN 参数太少，不能处理任何图片"
  - "分子图像稀疏且由原子字符和键线组成，普通 VQGAN 容易重构失真"
  - "SMILES 不能被文本 tokenizer 编码"
  - "Mol-VQGAN 用来替代所有语言模型参数"
answer: 1
explain: "分子图像的关键信息是细线、环和原子符号，微小失真会导致化学结构错误，因此需要面向分子图像微调的 tokenizer/de-tokenizer。"
```
