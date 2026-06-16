### EuroLLM-22B：面向 35 种语言的开放多语言基座模型

```yaml
id: eurollm22b
name: EuroLLM-22B
full_name: 欧洲多语言基础模型 (EuroLLM-22B)
year: "2026.02"
org: Unbabel / EU consortium
paper_url: https://arxiv.org/abs/2602.05879
category: frontier_2026
parent: qwen25
motivation: 面向35种欧洲语言从零训练
```

#### 📝 一句话总结

EuroLLM-22B 从零预训练一个 22.639B 参数的开放多语言 Transformer，面向 24 种欧盟官方语言和 11 种额外语言，解决开放大模型中欧洲语言覆盖不足、训练流程不透明的问题。它的核心不是新算子，而是把多语言 tokenizer、分层数据过滤、三阶段约 4T token 预训练、32K 上下文扩展和 EuroBlocks 指令微调整合成一条可复现的欧洲语言基座模型流水线。

#### 🎯 核心要点

- 目标语言覆盖：24 种欧盟官方语言，加上 Arabic、Catalan、Chinese、Galician、Hindi、Japanese、Korean、Norwegian、Russian、Turkish、Ukrainian，共 35 种目标语言。
- 模型架构：54 层 decoder-only Transformer，embedding size 6144，FFN hidden size 16384，48 个 attention heads，8 个 GQA KV heads，RMSNorm、SwiGLU、RoPE，BPE 词表 128K。
- 参数与上下文：总参数 22.639B，非 embedding 参数 21.067B，最终序列长度 32768；相较 9B 版本，22B 在最后阶段把上下文从 4K 扩到 32K，并将 RoPE \(\theta\) 从 \(10^4\) 调到 \(10^6\)。
- 三阶段预训练：约 4T tokens；第一阶段 3.6T tokens，10% 线性 warmup 到 \(1.5 \times 10^{-4}\) 后保持；随后 400B tokens 退火到峰值的 10%，最后阶段继续衰减到 0。
- 数据质量课程：EuroWeb 将多语言网页数据按 EuroFilter 质量分数分成三个 tier，越靠后的训练阶段采样越高质量数据，并在后期加入更多代码、数学、合成数学、文档级平行语料和长上下文书籍/代码数据。
- 平行与翻译数据过滤：对 xx→en / en→xx 平行语料使用 Bifixer 去重，并用 Bicleaner 与 CometKiwi-22 阈值过滤低质量句对。
- 合成数学增强：第三阶段加入约 170 万条由 Qwen-2.5 系列生成和改写的数学样本，并用 Qwen2.5-32B-Instruct 作为 judge 保留高分答案。
- 后训练：使用新版 EuroBlocks-SFT-2512 构建约 1060 万多语言指令样本，移除显式 reasoning trace，进行 5 epoch SFT，得到 EuroLLM-22B-Instruct。
- 开放资源：发布 base / instruct 模型、EuroWeb 预训练数据、EuroBlocks 指令数据、Megatron-LM 预训练 fork 和评测代码。

#### 🔬 深入细节

![EuroLLM-22B 三阶段学习率调度](https://arxiv.org/html/2602.05879v1/figures/scheduler.png)

*图：论文 Figure 1 展示 EuroLLM-22B 的三阶段学习率调度，先 warmup 与 hold，再在更高质量数据阶段逐步 anneal / decay。*

```python
# EuroLLM-22B 训练流水线伪代码
languages = official_eu_languages_24 + additional_languages_11

def build_euroweb(raw_web_documents):
    tiered_docs = {1: [], 2: [], 3: []}
    for doc in raw_web_documents:
        lang = language_id(doc)
        if lang not in languages:
            continue
        if not heuristic_filter(doc):       # 长度、lorem ipsum、javascript、符号比例、大写比例等
            continue
        if is_duplicate(doc):
            continue
        score = EuroFilter(doc)             # 0 到 5 的教育质量分数
        tier = assign_quality_tier(score)   # 后期训练使用更高质量 tier
        tiered_docs[tier].append(doc)
    return tiered_docs

def train_eurollm22b(model, euroweb, parallel_data, code_math_data):
    # Phase 1: 3.6T tokens，低到中等质量覆盖，建立通用语言能力
    lr = linear_warmup(max_lr=1.5e-4, warmup_ratio=0.10)
    for batch in sample_mix(euroweb[1], parallel_data, code_math_data, tokens="3.6T"):
        loss = cross_entropy(model(batch.input), batch.target)
        update(model, loss, lr)

    # Phase 2: 400B tokens，采样更高质量数据并把学习率降到峰值 10%
    for batch in sample_mix(euroweb[2], parallel_data, code_math_data, tokens="400B"):
        lr = linear_anneal(start=1.5e-4, end=1.5e-5)
        update(model, cross_entropy(model(batch.input), batch.target), lr)

    # Phase 3: 32K 上下文扩展，高质量数据、数学/代码、长文档数据占比提高
    model.rope_theta = 1e6
    model.max_seq_len = 32768
    for batch in sample_mix(euroweb[3], long_context_books_code(), synthetic_math(), tokens="final"):
        lr = decay_to_zero()
        update(model, cross_entropy(model(batch.input), batch.target), lr)

    return supervised_finetune(model, EuroBlocks_SFT_2512, epochs=5, max_len=32768)
```

EuroLLM-22B 的动机是非常工程化的：多数开放权重大模型虽然具备一定多语言能力，但训练数据、过滤规则和后训练配方往往不透明，而且英语和少数高资源语言占据主导。论文把“服务欧洲语言”落到两个可操作约束上：一是 tokenizer 和预训练语料必须原生覆盖 24 种欧盟官方语言及 11 种额外语言；二是模型、数据和代码要开放，方便研究者复现或审计。这里的“从零训练”很关键，它不是把一个英语优先模型继续训成多语言模型，而是在 128K BPE 词表、数据混合和训练日程上直接面向多语言分布设计。

架构层面，EuroLLM-22B 选择了稳健的 dense decoder-only Transformer，而不是引入 MoE 或实验性 attention。22B 版本使用 54 层、6144 hidden size、16384 FFN hidden size、48 attention heads 和 8 KV heads 的 GQA；激活函数是 SwiGLU，归一化是 RMSNorm，位置编码是 RoPE。语言建模目标仍是标准自回归交叉熵：

$$
\mathcal{L}_{\mathrm{LM}}(\theta) = - \sum_{t=1}^{T} \log p_\theta(x_t \mid x_{<t})
$$

因此论文的主要贡献不在损失函数，而在训练系统和数据配方：在可控参数规模下，让模型同时学习通用推理、翻译、指令跟随和欧洲多语言表达。

数据流水线是 EuroLLM-22B 最重要的机制。英语数据来自 FineWeb-edu 与 Nemotron-CC 的高质量 split；德语、西班牙语、法语、意大利语等高资源语言从 RedPajama-Data-v2 收集，并用 KenLM 困惑度和启发式规则过滤；其他语言聚合 HPLT、MADLAD-400、CulturaX、mC4，再做去重、语言识别、困惑度过滤和同样的启发式清洗。EuroFilter 把多语言网页样本打成 0 到 5 的质量分，22B 版本把这些样本分为三个 tier，让模型在训练后期更多看到高质量内容，这相当于把数据质量本身做成 curriculum。

训练日程和数据 curriculum 是绑定的。第一阶段用 3.6T tokens 做大覆盖学习，学习率先 10% 线性 warmup 到 \(1.5 \times 10^{-4}\) 并保持；第二阶段用 400B tokens 退火到峰值的 10%；最后阶段继续衰减到 0，同时引入最高质量 tier、更多数学/代码、合成数学和长上下文数据。32K 上下文扩展也放在最后阶段完成：模型最大序列长度从 4K 调到 32K，并把 RoPE 的 \(\theta\) 从 \(10^4\) 增至 \(10^6\)。论文还特别加入 60B tokens 的长上下文数据，书籍和代码各半，让长上下文能力不是只靠位置编码缩放硬外推。

后训练使用新版 EuroBlocks。作者从多个公开指令数据源出发，用更强开放模型重新生成回答，再用 Skywork-Gemma2-27B 选择更优响应，加入 Hermes-3、Tulu-3、Nemotron V1/V2 等来源，并移除结构化 reasoning trace，形成非 reasoning 的多语言指令-回复语料。SFT 只在 target tokens 上计算 loss，训练 5 个 epoch，最大上下文 32768，使用 bfloat16、sequence packing、cosine learning rate 和 Liger-Kernel 优化算子。评测时，非翻译任务用多个高能力 judge 聚合判断，翻译任务用 COMET-22；论文结论是 22B 在 fully open European baselines 中表现最强，并且在只有约 4T 预训练 token 的情况下接近更大规模欧洲模型。

> 💡 关键：EuroLLM-22B 的“算法”更像一条可审计的多语言模型生产线：语言覆盖、质量分层、学习率阶段、上下文扩展和指令数据重建共同决定效果，单独看 Transformer 结构反而不是创新重点。

#### 🧪 练习题

```yaml
question: "EuroLLM-22B 将多语言网页数据按质量分成三个 tier 的主要目的是什么？"
options:
  - "让模型后期更多看到高质量多语言数据，配合学习率衰减提升收敛质量"
  - "把所有低资源语言样本完全丢弃，只保留英语和高资源语言"
  - "用 MoE router 自动选择不同语言专家"
  - "在推理时动态切换不同 tokenizer"
answer: 0
explain: "论文使用 EuroFilter 给多语言网页样本打分，并把数据划分到三个训练阶段，后期保留更高质量数据；这是一种数据质量 curriculum，而不是 MoE 或推理时机制。"
```
