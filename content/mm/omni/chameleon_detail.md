### 变色龙模型 (Chameleon)

```yaml
id: chameleon
name: Chameleon
full_name: 变色龙模型 (Chameleon)
year: '2024'
org: Meta FAIR
paper_url: https://ai.meta.com/blog/meta-fair-research-new-release-june-2024/
category: autoregressive
parent: anygpt
motivation: 早期融合自回归统一架构
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/chameleon_detail.md
```

#### 📝 一句话总结

Chameleon 提出早期融合的 token-based 混合模态基础模型，把文本、图像和代码从输入开始就放进同一个离散序列，由一个自回归 Transformer 同时完成理解、图像生成和交错图文生成。它的贡献不仅是“图像 token 化”，还包括让 7B/34B 级别早期融合模型稳定训练的架构与优化配方。

#### 🎯 核心要点

- **早期融合 mixed-modal LM**：所有模态在进入 Transformer 前就被表示为离散 token，同一套权重处理文本 token、图像 token 和代码 token
- **图像 tokenizer**：将 \(512\times512\) 图像编码为 1024 个离散 token，图像 codebook size 为 8192
- **统一 BPE 词表**：训练 65,536 大小的 SentencePiece BPE 词表，其中包含 8192 个图像 codebook token
- **大规模混合预训练**：训练数据覆盖 2.9T text-only tokens、1.4B text-image pairs 产生的 1.5T tokens、以及 400B interleaved text-image tokens
- **自回归统一目标**：任意文本、图像、交错文档都被看作序列，统一最大化下一个 token 的条件似然
- **稳定训练配方**：QK-Norm 控制 attention softmax 输入范数，norm reordering 限制 FFN 范数增长，z-loss 约束最终 softmax 的 partition function
- **混合模态推理工程**：生成文本时逐 token streaming，生成图像时按固定大小 token block 解码，并用 token mask 限制当前模态的可选词表

#### 🔬 深入细节

##### 框架总览

![Chameleon 早期融合混合模态架构](https://arxiv.org/html/2405.09818v1/x1.png)
*图：Chameleon 把图像和文本都表示为离散 token，在同一个自回归 Transformer 中进行混合模态预训练和交错图文生成。*

Chameleon 解决的是传统多模态系统“输入侧融合太晚、输出侧各自为政”的问题。Flamingo、LLaVA 等模型通常把图像编码成连续特征，再通过投影层接入 LLM；文本生成和图像生成也往往由不同模块负责。Chameleon 选择更激进的早期融合：图像在一开始就被量化成类似词的离散 token，Transformer 不再区分“视觉编码器特征”和“语言 token”，而是在同一个序列空间中学习跨模态依赖。

##### 核心流程伪代码

```python
# Chameleon mixed-modal 自回归训练流程
for document in mixed_modal_corpus:
    seq = []
    for segment in document:
        if segment.type in ["text", "code"]:
            seq.extend(bpe_tokenizer(segment.content))
        elif segment.type == "image":
            image_codes = image_tokenizer.encode(segment.image)  # 512x512 -> 1024 ids
            seq.extend(["<image_start>", *image_codes, "<image_end>"])

    logits = chameleon(seq[:-1])
    loss_ntp = cross_entropy(logits, seq[1:])

    # 稳定训练：z-loss 约束最终 softmax，QK-Norm 在 attention 内部控制范数
    z = logsumexp(logits, dim=-1)
    loss = loss_ntp + 1e-5 * mean(z ** 2)
    update(chameleon, loss)

# 交错生成时，模型可在文本 token 和图像 token block 之间切换
generated = autoregressive_decode(
    prompt_tokens,
    modality_masks={"text": text_vocab, "image": image_codebook},
)
```

##### 早期融合的本质是“同一序列，同一目标”

Chameleon 的训练目标可以写成标准语言模型负对数似然：

$$
\mathcal{L}_{\mathrm{AR}}
=-\sum_{t=1}^{T}\log p_\theta(s_t\mid s_{<t})
$$

不同之处在于 \(s_t\) 不再只来自文本词表，也可能来自图像 codebook。图像 tokenizer 将 \(512\times512\) 图像压缩为 1024 个 token，因此一次图像生成就是连续预测一个固定长度的图像 token block；图像理解则是先把图像 token 放进上下文，再预测后续文本 token。captioning、text-to-image、interleaved document generation 本质上只是同一个序列的不同排列。

这种设计让模型能生成真正交错的图文文档。例如回答中可以先写一段说明，再生成一张图，再继续解释下一张图。传统“LLM 调用外部图像生成器”的系统也能拼接出类似输出，但跨图像 token 与文本 token 的依赖并不在同一模型内部学习；Chameleon 则直接在 token 序列层面建模这些依赖。

##### 数据混合让模型同时保留语言能力和视觉生成能力

Chameleon 的预训练不是只用图文对。第一阶段包含大规模 text-only、text-image 和 text/image interleaved 数据：text-only 保持语言和代码能力，text-image pairs 支撑 captioning 与 text-to-image，interleaved web documents 则让模型学习长文档中的图文布局和跨段落依赖。对 text-to-image pair，论文还会把图像和文本顺序轮换，使同一类数据既能训练“看图说话”，也能训练“按文生图”。

如果只训练图文对，模型容易学成任务模型：输入 caption 输出图像，或输入图像输出 caption。Chameleon 的混合数据目标更接近“完整多模态文档建模”，这也是它和只接视觉编码器的 MLLM 的关键差别。

##### 稳定性是早期融合的主要技术难点

早期融合把不同熵、不同长度、不同分布的 token 放进同一个 softmax 系统，训练中会出现范数缓慢增长和后期 loss divergence。论文指出 softmax 的平移不变性会放大这个问题：

$$
\mathrm{softmax}(z)=\mathrm{softmax}(z+c)
$$

当所有模态共享参数时，不同模态可能通过增大激活或 logits 范数来“竞争”表示空间；在 bf16 有效表示范围之外，这会演化成不稳定训练。Chameleon 因此在 attention 内部使用 QK-Norm：

$$
\mathrm{Attention}(Q,K,V)
=\mathrm{softmax}\left(
\frac{\mathrm{LN}(Q)\mathrm{LN}(K)^\top}{\sqrt{d}}
\right)V
$$

QK-Norm 控制的是 attention softmax 的输入范数，但最终词表 softmax 仍可能发生 logit drift，所以还要加入 z-loss：

$$
Z=\sum_i e^{x_i},\quad
\mathcal{L}=\mathcal{L}_{\mathrm{AR}}+10^{-5}(\log Z)^2
$$

7B 模型还使用 dropout 辅助稳定，34B 模型则更依赖 norm reordering。34B 的 block 形式可概括为先执行 attention/FFN，再对分支输出做 normalization，从而限制 SwiGLU FFN 带来的范数增长：

$$
h=x+\mathrm{Norm}(\mathrm{Attention}(x)),\quad
y=h+\mathrm{Norm}(\mathrm{FFN}(h))
$$

##### 推理阶段要处理“变长文本”和“定长图像块”的冲突

Chameleon 是自回归模型，但文本和图像的解码形态不同。文本可以在任意位置停止，图像 token 通常对应固定大小的 block；生成文本时还要监控是否产生 image-start token，一旦进入图像生成区间，就需要 mask 掉非图像 token，只允许从图像 codebook 中采样。图像 block 结束后再切回文本词表。

这解释了 Chameleon 为什么需要专门的 mixed-modal inference pipeline。它不是简单地 `model.generate()` 到结束，而是每一步都要根据当前模态、边界 token 和词表 mask 控制解码。早期融合让模型能力统一，但工程上仍要尊重不同模态 detokenize 的结构差异。

> 💡 关键：Chameleon 证明了“从输入层就融合”的统一多模态 LM 可以规模化，但它也暴露了早期融合的核心代价：不同模态共享 softmax 和 Transformer 权重后，训练稳定性成为一等问题。

#### 🧪 练习题

```yaml
question: "Chameleon 中 QK-Norm 和 z-loss 的主要作用是什么？"
options:
  - "减少图像 tokenizer 的 codebook 大小"
  - "让图像 token 可以直接跳过 Transformer"
  - "缓解混合模态自回归训练中的范数增长和 softmax/logit drift"
  - "把自回归生成改成扩散生成"
answer: 2
explain: "早期融合会让不同模态共享 attention 和最终 softmax；QK-Norm 控制 attention 输入范数，z-loss 约束最终 softmax 的 partition function。"
```
