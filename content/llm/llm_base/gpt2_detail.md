### GPT-2: Language Models are Unsupervised Multitask Learners

```yaml
id: gpt2
name: GPT-2
full_name: Language Models are Unsupervised Multitask Learners
year: 2019
org: OpenAI
paper_url: https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf
category: autoregressive
parent: GPT
motivation: 规模化语言模型实现无监督多任务零样本迁移，证明"规模即能力"
```

#### 📝 一句话总结
GPT-2 首次系统性地验证了一个颠覆性假设：**将语言模型规模和数据量扩展到足够大后（1.5B 参数 / 40GB WebText），模型无需任何微调即可通过自然语言 prompt 在多项 NLP 任务上实现零样本迁移**，效果甚至超越当时的有监督 SOTA——这一发现直接揭示了"规模化（scale）"是通向通用语言智能的关键路径，并奠定了 GPT-3、ChatGPT 等后续革命的范式基础。

#### 🎯 核心要点

- **范式创新**：提出"语言模型即无监督多任务学习器"——将所有 NLP 任务统一建模为条件概率 \\(p(output\|input)\\)，任务规格以自然语言形式嵌入上下文，无需任何下游标注数据或参数更新
- **数据质量驱动**：构建 WebText 数据集（约 800 万文档、40GB），通过 Reddit 用户外链（≥3 karma）作为隐含质量信号进行筛选，远优于 Common Crawl 等粗爬数据
- **四规模模型族**：发布 117M（对标 GPT-1）/ 345M / 762M / 1542M（1.5B）四种规格，上下文窗口统一 1024 tokens，系统研究容量-性能关系
- **架构微创新**：Transformer decoder-only 架构上将 Layer Normalization 移至**每个子块输入端**（pre-norm），并在最终 block 后追加额外 LN，显著改善深层训练稳定性
- **BPE 分词**：采用改进的 Byte-Pair Encoding，vocab size = 50257，禁止跨字符类别合并，实现字符级全覆盖与词级语义密度的平衡，无 `<unk>` token
- **零样本评估覆盖 8 基准**：包括阅读理解（CoQA）、翻译（WMT-14 En-Fr/En-De）、摘要（CNN/Daily Mail）、问答（Natural Questions）、语言建模（PTB/WikiText-2/LAMBADA/Children's Book Test）
- **惊人结果**：1.5B 模型在 7/8 任务上零样本达到或超越当时特定任务 SOTA；Children's Book Test 上超越人类水平；性能与规模呈平滑幂律关系（\\(r>0.93\\)）
- **生成能力**：可生成连贯长文本，但存在重复、事实错误、主题漂移等局限性——模型仍显著欠拟合 WebText，容量远未饱和

#### 🔬 深入细节

##### 1. 核心机制图

*图 1：GPT-2 将翻译、阅读理解、摘要等任务统一建模为条件语言生成。训练阶段仅执行标准自回归语言建模；零样本推理时，通过自然语言 prompt（如 "Translate to French: ... =>"）隐式指定任务类型和期望输出格式。*

具体而言：
- **训练时**：`p(下一个token | 前文所有token)`，语料中天然包含"任务描述→答案"的文本片段
- **推理时**：`p(答案 | 任务描述 + 输入)`，模型根据上下文自动推断任务模式
- **关键洞察**：不需要显式的"任务 ID"或"输出层切换"——条件分布的变化全部由 token 序列的统计规律驱动

##### 2. 算法伪代码

```python
# ==========================================
# GPT-2 训练与零样本推理完整流程
# ==========================================

# --- 数据预处理 ---
def build_webtext():
    """
    从 Reddit 出链网页构建 WebText
    过滤条件：
      - 链接来自 ≥3 karma 的 Reddit 帖子
      - 提取正文 (dragnet + newspaper3k)
      - 去重 (MinHash LSH)
      - 移除所有 Wikipedia 文档 (防止测试集污染)
    """
    documents = []
    for link in reddit_outlinks:
        if link.karma < 3:
            continue
        html = fetch(link.url)
        text = extract_content(html)  # 正文提取
        if len(text) > 100:
            documents.append(text)

    documents = deduplicate(documents)      # MinHash LSH 去重
    documents = remove_wikipedia(documents)  # 防污染
    return documents  # ~800万文档, ~40GB

# --- 分词 ---
class GPT2BPE:
    """
    改进的 Byte-Pair Encoding
    vocab_size = 50257
    关键改进：禁止跨字符类别合并
      字母类 / 数字类 / 标点类 分别处理
      避免半字符半标点的混乱 token
    """
    def encode(self, text):
        # 返回 token id 序列
        pass

    def decode(self, tokens):
        # 返回原始字符串
        pass

# --- 模型定义 ---
class GPT2Block(nn.Module):
    """
    Pre-norm Transformer Decoder Block
    GPT-2 的关键架构创新：LN 移到输入侧
    """
    def __init__(self, d_model, n_heads):
        self.ln_1 = LayerNorm(d_model)         # 注意力前 LN
        self.attn = MaskedMultiHeadAttention(
            d_model, n_heads
        )                                     # 因果自注意力
        self.ln_2 = LayerNorm(d_model)         # FFN前 LN
        self.ffn = FFN(d_model * 4, d_model)  # GELU 激活

    def forward(self, x):
        # Pre-norm + residual
        a = self.attn(self.ln_1(x))  # 先 norm 再 attention
        x = x + a                      # residual

        f = self.ffn(self.ln_2(x))   # 先 norm 再 FFN
        x = x + f                      # residual
        return x

class GPT2(nn.Module):
    """
    GPT-2 完整模型
    规格 (1.5B):
      n_layers=48, d_model=1600, n_heads=25
      context_len=1024, vocab_size=50257
    """
    def __init__(self, config):
        self.token_emb = nn.Embedding(
            config.vocab_size, config.d_model
        )
        self.pos_emb = nn.Parameter(
            torch.randn(config.context_len, config.d_model)
        )
        self.blocks = nn.ModuleList([
            GPT2Block(config.d_model, config.n_heads)
            for _ in range(config.n_layers)
        ])
        self.final_ln = LayerNorm(config.d_model)  # 额外最终 LN
        self.lm_head = nn.Linear(
            config.d_model, config.vocab_size
        )

    def forward(self, input_ids):
        x = self.token_emb(input_ids) + self.pos_emb[:input_ids.size(1)]
        for block in self.blocks:
            x = block(x)
        x = self.final_ln(x)
        logits = self.lm_head(x)  # [B, T, vocab_size]
        return logits

# --- 训练 ---
def train_gpt2():
    model = GPT2(config_1542M)   # 1.5B 规格

    # 优化器配置
    optimizer = AdamW(
        model.parameters(),
        lr=0.0,                   # 通过 scheduler 控制
        betas=(0.9, 0.999),
        eps=1e-8,
        weight_decay=0.01
    )

    # 学习率调度：cosine, 2000 step warmup
    scheduler = CosineAnnealingLR(
        optimizer,
        T_max=1_000_000,          # 100万 steps
        warmup_steps=2000
    )

    # 主循环
    for step, batch in enumerate(dataloader):
        # batch: input_ids [512, 1024]  # batch_size=512
        logits = model(batch)                    # [512, 1024, 50257]

        # 标准语言模型损失：预测下一个 token
        loss = F.cross_entropy(
            logits[:, :-1].reshape(-1, 50257),   # 预测位置 1..T
            batch[:, 1:].reshape(-1)              # 目标位置 1..T
        )

        loss.backward()
        grad_norm = clip_grad_norm_(model.parameters(), 1.0)
        optimizer.step()
        scheduler.step()
        optimizer.zero_grad()

        if step % 1000 == 0:
            print(f"Step {step}: loss={loss.item():.4f}, "
                  f"lr={scheduler.get_lr()[0]:.2e}")

# --- 零样本推理 ---
def zero_shot_inference(model, task_description, input_text):
    """
    零样本执行下游任务 - 核心创新点

    参数:
      model: 预训练好的 GPT-2
      task_description: 自然语言任务描述
      input_text: 具体输入

    示例:
      task_description = "Translate to French:"
      input_text = "Hello world"

    拼接后 prompt:
      "Translate to French: Hello world =>"

    模型自回归生成，期望输出 "Bonjour le monde"
    """
    # 构建完整 prompt
    prompt = f"{task_description} {input_text} =>"
    input_ids = bpe_tokenizer.encode(prompt)

    # 自回归生成
    generated = []
    context = torch.tensor([input_ids])

    for _ in range(100):  # 最大生成长度
        with torch.no_grad():
            logits = model(context)         # [1, len, 50257]
            next_logits = logits[0, -1, :]  # 取最后一个位置

            # Top-k 采样 (k=40)
            top_k_values, top_k_indices = torch.topk(
                next_logits, k=40
            )
            probs = F.softmax(top_k_values / temperature, dim=-1)
            next_token = top_k_indices[
                torch.multinomial(probs, 1)
            ]

            generated.append(next_token.item())
            context = torch.cat([
                context,
                next_token.unsqueeze(0).unsqueeze(0)
            ], dim=1)

            # 遇到结束标记则停止
            if next_token == eos_token_id:
                break

    return bpe_tokenizer.decode(generated)


# --- 任务示例 ---
def example_zero_shot_tasks(model):
    """GPT-2 零样本执行各类 NLP 任务"""

    tasks = {
        "翻译": {
            "prompt": "Translate to French: Hello, how are you? =>",
            "expected": "Bonjour, comment allez-vous?"
        },
        "阅读理解": {
            "prompt": (
                "Passage: Paris is the capital of France. "
                "It has a population of 2.1 million. "
                "\nQuestion: What is the capital of France?\n"
                "Answer:"
            ),
            "expected": "Paris"
        },
        "摘要": {
            "prompt": (
                "Article: [很长的新闻文章内容...]\n\n"
                "TL;DR:"
            ),
            "expected": "[简洁摘要]"
        },
        "问答": {
            "prompt": "Q: Who wrote the play Romeo and Juliet?\nA:",
            "expected": "William Shakespeare"
        }
    }

    for name, task in tasks.items():
        result = zero_shot_inference(model, "", task["prompt"])
        print(f"任务 {name}: {result}")
```

##### 3. 动机与背景

在 GPT-2 (2019) 之前，NLP 领域的主导范式是 **"预训练 + 有监督微调"**（如 GPT-1、BERT、ELMo）。这种范式的核心痛点是：

| 痛点 | 具体表现 | 代价 |
|------|----------|------|
| **标注依赖** | 每个新任务需数千到数十万标注样本 | 标注成本高、时间长 |
| **泛化脆弱** | 微调模型易过拟合训练分布的虚假统计相关性 | 分布偏移时性能骤降 |
| **任务碎片化** | 不同任务需不同输出层和损失函数 | 无法形成统一框架 |
| **能力局限** | 模型仅学会"如何适配特定任务"，而非"如何理解任务本身" | 跨任务迁移困难 |

GPT-2 的核心洞察是颠覆性的：**如果语料中包含 "Translate to French: Hello -> Bonjour" 这样的自然文本片段，那么足够大的语言模型就能从这些隐式示例中学会"翻译"这一概念——无需任何显式监督信号。** 这本质上是将"任务学习"归约为"语境条件概率建模"。

数学上，传统范式把每个任务建模为 \\(p*{task}(y|x)\\)（需要单独训练），而 GPT-2 将其统一为 \\(p(y|x, task\\_context)\\)，其中 \\(task\\_context\\) 是以自然语言描述的，因此可以泛化到训练时未见过的任务组合。

##### 4. 核心机制详解

**4.1 统一条件概率框架——"一切皆生成"**

GPT-2 的根本创新在于将所有 NLP 任务统一为同一数学形式：

$$p(output|input) = \prod_{i=1}^{n} p(token_i|token*{<i}, input)$$

其中 \\(input\\) 是拼接后的上下文字符串，包含：
- **任务规格**：以自然语言描述（如 `"Translate to French:"`）
- **具体内容**：需要处理的实际输入（如 `"Hello world"`）
- **格式标记**：提示模型开始输出的符号（如 `"=>"` 或 `"\\nA:"`）

这意味着：
1. **训练时**：模型仅需最大化 \\(p(下一个token|前文)\\)，语料中的各种任务示例被隐式学习
2. **推理时**：用户通过选择合适的 prompt 前缀来"激活"模型内部学到的对应能力
3. **无需架构修改**：同一模型可以在翻译、问答、摘要间自由切换，只需改变输入文本
4. **无需参数更新**：零样本——模型权重在预训练后完全冻结

**4.2 架构细节：Pre-norm Transformer Decoder**

GPT-2 基于 GPT-1 的 decoder-only Transformer，但做了关键改进：

```
GPT-1 (Post-norm):
  x → Attention(x) → LayerNorm(x + a) → FFN(x) → LayerNorm(x + f)

GPT-2 (Pre-norm):
  x → LayerNorm(x) → Attention(x) → x + a  → LayerNorm(x) → FFN(x) → x + f
```

**Pre-norm 的优势**：
- 梯度流动更顺畅：LN 在残差路径之前，避免梯度在深层被压缩
- 训练更稳定：允许更大学习率，减少对 warmup 的依赖
- 收敛更快：实验表明 pre-norm 在大规模模型中表现更好

**额外最终 LN**：在最后一个 Transformer block 后追加一层 LayerNorm，使得输出嵌入的尺度更稳定，有助于下游语言建模头的训练。

**完整架构栈（1.5B 模型）**：
```
Input Tokens
  │
  ├─ Token Embedding (vocab_size=50257, d_model=1600)
  └─ Positional Embedding (max_len=1024, d_model=1600)
      │
      ├─ LayerNorm
      ├─ [ GPT2Block ] × 48  ← pre-norm, residual
      │    ├─ LN → Masked Multi-Head Attn(25 heads) → (+residual)
      │    └─ LN → FFN(d_ff=6400, GELU) → (+residual)
      ├─ LayerNorm (终结)
      └─ Linear(1600, 50257) → Softmax → 下一个 token 概率分布
```

**4.3 BPE 分词——字符与词的平衡术**

GPT-2 使用的 Byte-Pair Encoding 有以下特点：

| 特性 | 说明 | 意义 |
|------|------|------|
| Vocab size | 50257 | 足够表达丰富语义 |
| 基础单元 | 字节（bytes） | 覆盖所有 Unicode 字符 |
| 合并策略 | **禁止跨类别合并** | 字母/数字/标点独立处理 |
| `<unk>` 处理 | **无 `<unk>` token** | 所有输入均可编码 |
| 英文效率 | ~0.7 词/token | 3-4× 压缩率 |

**改进 BPE 的关键设计**：标准 BPE 会生成 `the.` 这样混合词与标点的 token，导致泛化能力下降。GPT-2 强制 BPE 不在字母、数字、标点三种类别间合并，保证了 token 的语义纯净性。

**4.4 WebText——数据质量即是模型质量**

| 维度 | 详情 |
|------|------|
| **来源** | Reddit 上获得 ≥3 karma 的帖子所引用的外部链接 |
| **规模** | ~800 万文档，去重后 ~40 GB 纯文本 |
| **筛选逻辑** | Reddit 点赞隐含人类质量判断——高赞帖子的链接通常更优质 |
| **正文提取** | 使用 dragnet + newspaper3k 提取主体内容 |
| **去重** | MinHash Locality-Sensitive Hashing (LSH) 去重 |
| **防污染** | 显式移除所有 Wikipedia 内容（因 Wikipedia 常作为下游测试数据） |
| **质量对比** | 远优于 Common Crawl 等全量爬虫数据，更干净、更连贯 |

**4.5 四种模型规格与训练细节**

| 参数量 | 层数 | d_model | 注意力头数 | d_ff | 参数量 |
|--------|------|---------|-----------|------|--------|
| 117M | 12 | 768 | 12 | 3072 | ~117M |
| 345M | 24 | 1024 | 16 | 4096 | ~345M |
| 762M | 36 | 1280 | 20 | 5120 | ~762M |
| **1542M** | **48** | **1600** | **25** | **6400** | **~1542M** |

**训练超参数**：
- 优化器：Adam（\\(\beta_1=0.9, \beta_2=0.999, \epsilon=10^{-8}\\)），学习率 0→max→0 余弦调度
- Warmup：2000 steps，从 0 线性升温
- Batch size：512 个样本/step
- 训练步数：100 万 steps（约 100 个 epoch over WebText）
- 序列长度：1024 tokens
- Dropout：0.1（正则化）
- 权重初始化：\\(\mathcal{N}(0, 0.02)\\)，残差层按 \\(1/\sqrt{层数}\\) 缩放

##### 5. 零样本评估结果

GPT-2 在 8 个 NLP 基准上进行零样本评估，核心发现如下：

**5.1 语言建模任务**

| 数据集 | 117M | 345M | 762M | 1542M | 此前 SOTA |
|--------|------|------|------|-------|-----------|
| Penn Treebank (PPL) | 35.76 | - | - | **18.34** | 37.7 |
| WikiText-2 (PPL) | 29.85 | - | - | **13.72** | 47.3 |
| LAMBADA (PPL) | 36.18 | 16.87 | 10.65 | **8.63** | 36.1 |
| LAMBADA (Acc%) | 56.72 | 61.73 | 64.34 | **66.68** | 56.25 |
| Children's Book Test (Acc%) | - | - | - | **93.30%** | 85.7% (人类) |

> 🔥 **LAMBADA 困惑度从 36.18 降至 8.63（降低 76%），准确率提升 10 个百分点**

**5.2 下游任务零样本**

| 任务 | 指标 | 117M | 1542M | 当时 SOTA | 备注 |
|------|------|------|-------|-----------|------|
| CoQA (阅读理解) | F1 | 27.1 | **55.5** | 89.0 (有监督) | 零样本回答 |
| WMT-14 En→Fr | BLEU | 8.3 | **11.5** | 41.2 | 直出翻译 |
| WMT-14 En→De | BLEU | 4.9 | **7.3** | 34.8 | 德语更弱 |
| CNN/DM (摘要) | ROUGE-1 | 18.0 | **22.3** | 39.6 | 零样本摘要 |
| Natural Questions | F1 | 1.2 | **4.1** | - | 开放域QA |

**关键结论**：
1. **幂律增长**：所有任务上模型性能随参数量平稳增长，无饱和迹象
2. **容量远未耗尽**：1.5B 模型在 WebText 上仍欠拟合——训练 loss 和验证 loss 之间仍有显著差距
3. **困惑度强预测下游性能**：在同一数据集上，语言建模困惑度与零样本下游性能的相关系数 \\(r>0.93\\)
4. **翻译不对称**：英→法 BLEU (11.5) 显著优于英→德 (7.3)，因为 WebText 中法语内容更多
5. **摘要的涌现**：模型能直接输出文章摘要，只需在文末加 `TL;DR:` 标记

##### 6. 局限性分析

GPT-2 论文坦率地讨论了以下局限性：

| 局限 | 表现 | 原因 |
|------|------|------|
| **重复生成** | 长文本中出现循环短语 | 缺乏全局规划机制 |
| **事实错误** | 生成内容与事实不符 | 仅从统计模式学习，无知识校验 |
| **主题漂移** | 生成逐渐偏离原始主题 | 注意力在长上下文中衰减 |
| **世界知识不完整** | 对专业知识、冷门事实表现差 | 训练数据覆盖不均 |
| **抽象推理薄弱** | 逻辑推理、数学计算能力有限 | 纯语言建模目标的局限 |
| **生成不可控** | 无法精确控制输出风格/立场 | 仅靠 prompt 引导，无条件控制 |

##### 7. 与传统方法的系统对比

| 维度 | 传统范式 (GPT-1/BERT) | GPT-2 |
|------|----------------------|-------|
| **学习范式** | 预训练 → 有监督微调 | **预训练 → 零样本** |
| **下游数据** | 每任务需数千标注样本 | **零标注** |
| **任务建模** | 每个任务独立建模 | **统一条件语言生成** |
| **模型规模** | GPT-1: 117M; BERT: 340M | 最高 1542M (12.8× GPT-1) |
| **数据规模** | BooksCorpus (4.6GB) | WebText (~40GB, 8.7×) |
| **数据质量** | 书籍语料 | Reddit 外链 (社群筛选) |
| **LN 策略** | Post-norm | **Pre-norm** |
| **分词** | BPE+空格 | **改进 BPE（禁跨类合并）** |
| **上下文窗口** | 512 tokens | 1024 tokens (2×) |
| **泛化方式** | 微调适配 | **prompt 激活** |
| **根本哲学** | "学会适应任务" | **"学会理解任务"** |

GPT-2 的核心贡献**不在于架构的颠覆性创新**，而在于系统性地验证了一个深刻的假设：**当语言模型足够大、数据足够丰富时，许多 NLP 能力会作为语言建模的副产品"涌现"出来**——这一洞见直接催生了 GPT-3、InstructGPT、ChatGPT 等后续变革，并将 NLP 研究的主流方向从"精巧的任务特定设计"扭转到"规模 + 数据 + prompt 工程"。

#### 🧪 练习题

```yaml
question: "GPT-2 如何在不进行任何微调的情况下执行翻译任务？"
options:
  - "通过在预训练阶段混合了翻译任务的标注数据"
  - "将翻译任务视为条件语言生成，用自然语言提示 p(target|source, 'Translate to...') 激活模型内部学到的翻译能力"
  - "使用特定语言的 task token 在模型内部切换翻译模式"
  - "通过强化学习对模型输出进行自校准以提升翻译质量"
answer: 1
explain: "GPT-2 将一切 NLP 任务统一建模为条件概率 p(output|input)。翻译时，只需拼接 'Translate to French: 英文句子 =>' 的 prompt，模型根据训练语料中见过的类似模式自回归生成法文译文，无需任何参数更新或任务特定组件。"
```

---

*论文链接：https://d4mucfpksywv.cloudfront.net/better-language-models/language_models_are_unsupervised_multitask_learners.pdf*

*Radford, Alec, et al. "Language models are unsupervised multitask learners." OpenAI blog 1.8 (2019): 9.*
