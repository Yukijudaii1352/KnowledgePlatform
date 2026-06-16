### Perspective API：机器学习毒性评分
```yaml
id: perspective
name: Perspective API
full_name: Perspective API
year: "2017"
org: Google
paper_url: https://www.perspectiveapi.com/
category: content_safety
parent: —
motivation: 机器学习毒性评分
```

#### 📝 一句话总结
Perspective API 将用户评论映射为一组可解释的内容安全属性概率分数，解决了开放评论区中人工审核难以实时覆盖的问题。它的核心贡献不是“自动裁决”，而是把毒性、侮辱、威胁等主观感知标签转化为可供作者反馈、审核排序和读者过滤使用的机器学习信号。

#### 🎯 核心要点
- 提供 `AnalyzeComment` 风格的在线评分接口，把评论文本和 `requestedAttributes` 转换为 `summaryScore` 与可选 `spanScores`。
- 主属性是 `TOXICITY`，含义是粗鲁、不尊重或不合理且可能让人离开讨论的评论。
- 常见属性包括 `TOXICITY`、`SEVERE_TOXICITY`、`IDENTITY_ATTACK`、`INSULT`、`PROFANITY`、`THREAT`、`SEXUALLY_EXPLICIT` 等。
- 早期英语 TOXICITY 模型卡描述其使用在线论坛评论、Wikipedia 与 New York Times 评论等数据，并用众包标签训练。
- 模型卡给出的早期架构是基于 GloVe 词向量微调的 CNN 文本分类器，输出属性级概率分数。
- 产品设计强调 human-in-the-loop：用于审核优先级、实时作者反馈和评论排序，不建议作为全自动封禁或人格判断系统。
- 分数表示“人类标注者会如何感知该评论”的概率型估计，不等同于危害严重程度，也不应脱离社区语境直接设阈值。
- 模型卡包含 subgroup AUC、BPSN AUC、BNSP AUC 等偏差评估，用来检查身份词相关的误报和漏报风险。

#### 🔬 深入细节
![Perspective API 官方图标](https://raw.githubusercontent.com/conversationai/perspectiveapi/master/img/perspective_icon-2020.png)
*图：Perspective API 官方开源文档中的图标。官方站点不是传统论文页面，因此这里将其作为远程视觉锚点，并在下文把 API 的模型流水线展开为可复现的算法视图。*

```python
# Perspective API 毒性评分流水线（抽象版）
def analyze_comment(comment, requested_attributes, community_policy):
    text = normalize_unicode_and_whitespace(comment)
    tokens = tokenize(text)

    scores = {}
    spans = {}
    for attr in requested_attributes:
        # 早期模型卡描述：GloVe embeddings + CNN classifier
        token_vecs = glove_embedding(tokens, finetuned=True)
        features = cnn_pooling(token_vecs)
        score = sigmoid(linear_head[attr](features))
        scores[attr] = score

        # 如果启用 span scoring，对局部片段重复同类评分
        spans[attr] = score_text_spans(text, attr)

    actions = []
    for attr, score in scores.items():
        if score >= community_policy[attr].review_threshold:
            actions.append((attr, "send_to_human_review"))
        elif score >= community_policy[attr].feedback_threshold:
            actions.append((attr, "show_author_feedback"))

    return {
        "attributeScores": {
            attr: {
                "summaryScore": {"value": scores[attr], "type": "PROBABILITY"},
                "spanScores": spans[attr],
            }
            for attr in requested_attributes
        },
        "recommendedActions": actions,
    }
```

Perspective 的输入是一个评论片段，而不是完整用户画像。对每个安全属性 \(a\)，模型学习一个从文本 \(x\) 到概率分数的映射：

$$
s_a(x)=P_\theta(y_a=1\mid x)
$$

其中 \(y_a\) 表示众包标注者是否会把评论判为该属性，例如 toxic、insult 或 threat。这个公式的关键是“感知概率”而不是“客观严重度”：\(s_{\text{TOXICITY}}=0.8\) 更接近“相当多标注者会认为它 toxic”，而不是“这句话的危害强度为 80%”。因此 Perspective 更适合作为排序、预警和辅助审核信号，而不是直接替代社区规则或法律判断。

早期 TOXICITY 模型卡描述的分类器可以抽象成 CNN 文本分类流程。给定词向量序列 \(E=[e_1,\ldots,e_n]\)，卷积核在不同窗口上提取局部 n-gram 模式：

$$
h_{i,k}=\phi(W_k E_{i:i+k-1}+b_k)
$$

随后使用池化得到整句特征 \(c=\operatorname{pool}(h)\)，再用属性头输出概率：

$$
s_a=\sigma(w_a^\top c+b_a)
$$

这类结构适合 2017 年的在线生产环境：推理成本低、延迟小、能被封装成 API，同时通过微调词向量适应评论区中的侮辱、威胁、身份攻击等语言模式。它的弱点也很明确：局部模式可能误读讽刺、引用、反歧视讨论或身份词上下文，所以模型卡特别强调偏差评估和人工兜底。

API 返回层面通常包含 `summaryScore` 和 `spanScores` 两类信号。`summaryScore` 是整条评论的总体属性概率，用于审核队列排序或作者提示；`spanScores` 则把文本切成局部片段，帮助产品解释“哪一段触发了模型”。在产品策略上可以设置两个阈值：较低阈值触发作者端软反馈，较高阈值进入人工审核，而不是直接删除：

$$
\operatorname{action}(x,a)=
\begin{cases}
\text{human\_review}, & s_a(x)\ge \tau_{review} \\
\text{author\_feedback}, & \tau_{feedback}\le s_a(x)<\tau_{review} \\
\text{allow}, & s_a(x)<\tau_{feedback}
\end{cases}
$$

> 💡 关键：Perspective 的算法价值在于把内容安全问题转换为可校准、可排序、可审计的概率信号，而不是给出不可申诉的最终判决。

与关键词黑名单相比，Perspective 能学习组合语义。例如同样包含脏词的评论，可能是辱骂、引用、玩笑或自我描述；CNN 特征比简单关键词更能捕捉上下文窗口。与人工全量审核相比，Perspective 的优势是实时、规模化和成本低，适合在评论提交前给作者提示，或在高流量社区中把审核资源集中到高风险评论。与端到端自动 moderation 相比，它保留了社区策略层：不同社区可按自身风险偏好选择属性和阈值。

模型卡中的偏差评估是该方法不可分割的一部分。Subgroup AUC 衡量包含某个身份词的样本内部分类能力；BPSN AUC 关注“非毒性身份词评论被误判为 toxic”的风险；BNSP AUC 关注“包含身份词的 toxic 评论被漏判”的风险。这说明 Perspective 的方法论不只是训练一个分类器，还包括持续检查模型是否把身份词本身当作毒性线索。对于 LLM 安全评估而言，这一点尤其重要：如果把 Perspective 分数当作奖励或评测指标，需要意识到它携带标注语境、模型版本和偏差评估边界。

#### 🧪 练习题
```yaml
question: "Perspective API 的 toxicity 分数最准确的解释是什么？"
options:
  - "评论危害严重程度的绝对百分比"
  - "模型估计人类标注者会把评论感知为 toxic 的概率"
  - "是否必须自动删除评论的硬规则"
  - "用户长期人格或信誉的评分"
answer: 1
explain: "Perspective 的分数是属性级概率信号，用于辅助审核、排序或反馈；官方模型卡也强调不要把它用于全自动 moderation 或人格判断。"
```
