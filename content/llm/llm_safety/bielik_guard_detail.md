### Bielik Guard: Efficient Polish Language Safety Classifiers

```yaml
id: bielik_guard
name: Bielik Guard
full_name: Bielik多语种护栏 (Bielik Multilingual Guard)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2603.02588
category: content_safety
parent: perspective
motivation: 多语种优化安全分类器
```

#### 📝 一句话总结

Bielik Guard 提出面向波兰语 LLM 应用的轻量安全分类器族，用社区标注的软标签数据训练 0.1B/0.5B RoBERTa 模型，在真实波兰语用户 prompt 上显著降低误报并保持较高精度。

#### 🎯 核心要点

- Manifest 中 `2603.02588` 实际指向 ExpGuard；Bielik Guard 公开论文为 `https://arxiv.org/abs/2602.07954`
- 两个模型规模：0.1B 基于 MMLW-RoBERTa-base，0.5B 基于 PKOBP/polish-roberta-8k
- 五类安全 taxonomy：Hate/Aggression、Vulgarities、Sexual Content、Crime、Self-Harm
- 社区标注 6,885 条波兰语文本，超过 60,000 个独立标注，平均每条 7-8 个评分
- 训练使用标注者比例作为 soft label，而非直接二值化，保留争议样本的不确定性
- 0.5B v1.1a 在 Sojka test set 上 F1 micro 0.791、F1 macro 0.785
- 0.1B v1.1 在 3,000 条真实波兰语用户 prompt 上 precision 77.65%、FPR 0.63%，优于同规模 HerBERT-PL-Guard

#### 🔬 深入细节

##### 示意图/图源

![Bielik Guard 官方项目图源](https://guard.bielik.ai/images/preview.png)
*图源：Bielik Guard/Sójka 官方项目页。模型页包括 `https://huggingface.co/speakleash/Bielik-Guard-0.1B-v1.1` 和 `https://huggingface.co/speakleash/Bielik-Guard-0.5B-v1.1`。*

##### 算法/流程伪代码

```python
# Bielik Guard training and inference
def train_bielik_guard(polish_texts, community_annotations, base_encoder):
    taxonomy = ["HATE", "VULGAR", "SEX", "CRIME", "SELF_HARM"]

    # 1. Convert community votes to soft labels
    dataset = []
    for text in polish_texts:
        votes = community_annotations[text]
        soft_label = [
            fraction_of_annotators(votes, category=c)
            for c in taxonomy
        ]
        dataset.append((text, soft_label))

    # 2. Add multi-label classification head
    model = RobertaEncoder(base_encoder)
    model.add_head(dropout=0.1, out_dim=len(taxonomy), activation="sigmoid")

    # 3. Fine-tune with BCE on soft labels
    for batch in make_batches(dataset, batch_size=32):
        logits = model(batch.text)
        loss = binary_cross_entropy_with_logits(logits, batch.soft_labels)
        model.update(loss, optimizer="AdamW", lr=2e-5, weight_decay=0.01)

    return model


def moderate(model, text, threshold=0.5):
    scores = sigmoid(model(text))
    labels = {cat: score for cat, score in scores.items() if score >= threshold}
    return {"unsafe": bool(labels), "categories": labels, "scores": scores}
```

##### 方法解读

Bielik Guard 的背景是波兰语应用缺少低延迟、可商用、误报率低的本地安全分类器。Llama Guard、Qwen3Guard 等多语种生成式 guard 模型覆盖语言广，但在波兰语真实用户流量上容易过度报警；HerBERT-PL-Guard 虽同为波兰语模型，但论文报告其真实 prompt precision 与 FPR 不如 Bielik Guard v1.1。

模型选择很务实：0.1B 版本采用 124M 参数 MMLW-RoBERTa-base，0.5B 版本采用 443M 参数 PKOBP/polish-roberta-8k。两者都不是生成式 LLM，而是 encoder + multi-label head：dropout 后接线性层输出 5 个 logits，再用 sigmoid 独立判定每个类别。这种架构牺牲了 prompt 可配置 taxonomy 的灵活性，但换来低成本、低延迟和更稳定的二分类决策。

数据方法是论文的重要贡献。团队通过社区平台收集波兰语文本标注，超过 1,500 名志愿者参与，6,885 条文本获得超过 60,000 个评分。训练时不把“60% 以上同意”立即变成硬标签，而是使用每个类别被标注者选择的比例作为 soft label。这样，明显有害文本接近 1，明显安全文本接近 0，争议文本保留在中间区间。

损失函数使用 BCE with soft labels：

$$
\mathcal{L}=-\sum_{c=1}^{5}\left[s_c\log p_c+(1-s_c)\log(1-p_c)\right]
$$

其中 \(s_c\) 是社区标注比例，\(p_c\) 是 sigmoid 后的类别概率。评估时，ground truth 按 60% annotator agreement 二值化，模型预测按 0.5 阈值二值化。论文也强调阈值可根据部署场景调整，特别是在生产系统中要控制误报率。

v1.1 的重点是校准 Crime 类阈值，减少 v1.0 对 crime-related 文本的过度反应。这个改动带来典型 precision-recall tradeoff：在 Gadzi Jezyk 这种 97.1% crime-related benchmark 上，部分 recall 下降，但真实用户 prompt 上 FPR 大幅降低。对生产护栏来说，误报会直接伤害可用性，所以 Bielik Guard 更偏向 conservative alert。

与生成式 guard 相比，Bielik Guard 的局限是 taxonomy 固定，不能像 Llama Guard 那样通过 prompt 换政策；论文也暂不覆盖 disinformation、jailbreak、copyright 等需要上下文或事实知识的类别。但对于波兰语内容安全的基础五类风险，它展示了小模型、本地数据和社区软标签在低资源语言护栏中的实际价值。

#### 🧪 练习题

```yaml
question: "Bielik Guard 训练中使用社区标注比例作为 soft label 的主要好处是什么？"
options:
  - "让模型不需要 sigmoid 输出"
  - "保留争议样本的不确定性，而不是过早二值化"
  - "自动把波兰语翻译成英语"
  - "使模型可以生成长文本回答"
answer: 1
explain: "软标签记录每个类别被多少标注者认为有害，能表达安全判断中的模糊和争议，训练信号比硬多数投票更细。"
```
