### T5

```yaml
id: t5
name: T5
full_name: 文本到文本迁移 Transformer (Text-to-Text Transfer Transformer)
year: '2019.10'
org: Google Research
paper_url: https://arxiv.org/abs/1910.10683
category: architecture
parent: transformer
motivation: 所有任务转成文本生成
```

#### 📝 一句话总结
T5 提出了 Text-to-Text Transfer Transformer，把分类、翻译、摘要、问答、回归等 NLP 任务全部改写成“输入文本 -> 输出文本”的条件生成问题，并用 C4、span corruption 和系统性消融总结了预训练迁移的工程准则。

#### 🎯 核心要点
- 统一 text-to-text 接口：所有任务的输入和输出都是字符串，分类标签也作为文本生成。
- 使用任务前缀：如 `translate English to German:`、`summarize:`、`cola sentence:`，用输入 token 显式指定任务。
- 采用 encoder-decoder Transformer：encoder 双向理解输入，decoder 自回归生成目标文本。
- 构建 C4 语料：从 Common Crawl 中清洗出大规模英文网页文本，去除模板、短文本、代码、非英文和重复内容。
- 预训练目标为 span corruption：随机遮盖连续片段，用 sentinel token 替换输入，并让 decoder 生成被遮盖片段。
- 系统比较架构和目标：评估 encoder-decoder、decoder-only、prefix LM、MLM、deshuffling、span corruption 等选择。
- 使用相对位置偏置和 AdaFactor 等工程设置，支撑从小模型到 11B 参数模型的扩展。

#### 🔬 深入细节
![T5 text-to-text 框架示意](https://ar5iv.labs.arxiv.org/html/1910.10683/assets/x1.png)
*图：T5 将翻译、问答、分类等任务统一为输入文本到目标文本的生成过程。*

```python
# T5 的 text-to-text 训练流程
def format_example(task, raw_example):
    if task == "translation":
        x = "translate English to German: " + raw_example.english
        y = raw_example.german
    elif task == "classification":
        x = "sst2 sentence: " + raw_example.sentence
        y = "positive" if raw_example.label == 1 else "negative"
    elif task == "summarization":
        x = "summarize: " + raw_example.article
        y = raw_example.summary
    return x, y

def span_corrupt(tokens, noise_density=0.15, mean_span_len=3):
    spans = sample_spans(tokens, noise_density, mean_span_len)
    corrupted, target = [], []
    cursor = 0
    for i, (start, end) in enumerate(spans):
        sentinel = f"<extra_id_{i}>"
        corrupted += tokens[cursor:start] + [sentinel]
        target += [sentinel] + tokens[start:end]
        cursor = end
    corrupted += tokens[cursor:]
    target += [f"<extra_id_{len(spans)}>"]
    return corrupted, target

for text in C4:
    x, y = span_corrupt(tokenize(text))
    logits = t5_encoder_decoder(input_ids=x, decoder_input_ids=shift_right(y))
    loss = cross_entropy(logits, y)
    update(model, loss)
```

T5 的出发点是接口统一。在 BERT、GPT 和许多早期迁移学习系统中，不同任务常需要不同的输出层：分类用 softmax head，抽取式问答预测 span 起止位置，生成任务使用 decoder。T5 把这些差异压到数据格式里，模型始终学习同一个条件概率：

$$
p_\theta(y \mid x)=\prod_{t=1}^{|y|}p_\theta(y_t \mid y_{<t}, x)
$$

其中 \(x\) 是带任务前缀的输入文本，\(y\) 是目标文本。分类任务输出 `"entailment"` 或 `"positive"`，回归任务输出数字字符串，翻译和摘要则输出目标句子或摘要。这样做让预训练、微调和推理都使用同一套最大似然训练目标。

论文的另一个关键贡献是 C4。Common Crawl 原始文本规模巨大，但充满重复、导航栏、代码、非自然语言和低质量页面。T5 通过启发式清洗保留自然英文文本，例如要求句子终止符、过滤短页面、去掉包含特定脏词列表的页面、去掉含代码特征的页面，并做三句片段级去重。C4 的意义不是“越大越好”，而是为可复现的大规模预训练提供更干净的网页语料。

T5 最终采用 span corruption，而不是简单逐 token MLM。输入中连续片段被替换成 `<extra_id_0>`、`<extra_id_1>` 等 sentinel token；decoder 的目标序列则按顺序生成每个 sentinel 后面的原始片段。例如原句中的两个片段被遮盖后，输入只保留上下文和哨兵标记，输出只包含被遮盖内容。这比完整语言建模更省 decoder 计算，也比独立 token MLM 更强调长程语义恢复。

架构选择上，T5 的实验显示 encoder-decoder 是 text-to-text 迁移中最稳健的结构。encoder 可以双向读取完整输入，适合理解前提、问题、文章或待翻译句子；decoder 只在目标端做因果生成。相比 decoder-only LM，它不需要把输入和输出串在同一条单向序列里绕路建模；相比 encoder-only，它天然支持开放式文本生成。

T5 也把“任务说明”变成了模型输入的一部分。前缀的具体措辞被当作超参数，但论文发现合理前缀已经足够稳定。这一思想直接连接到后来的指令微调和 prompt 范式：任务控制不再是模型外部的分支逻辑，而是数据样本本身的一段文本。

> 💡 关键：T5 的价值不只是一个模型名，而是一套把 NLP 任务统一成生成问题的可复现实验框架。

#### 🧪 练习题
```yaml
question: "T5 的 span corruption 与 BERT 式 MLM 的核心区别是什么？"
options:
  - "T5 只遮盖标点，BERT 只遮盖名词"
  - "T5 遮盖连续片段并让 decoder 生成这些片段"
  - "T5 不使用 Transformer"
  - "T5 只训练分类 head"
answer: 1
explain: "T5 使用 sentinel token 替换连续 span，目标端生成被遮盖片段；这与 BERT 常见的独立 token 恢复不同。"
```
