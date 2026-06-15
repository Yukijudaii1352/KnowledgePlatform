### Perspective API: 面向评论内容的机器学习毒性评分

```yaml
id: perspective
name: Perspective API
full_name: Perspective API
year: '2017'
org: Google
paper_url: https://www.perspectiveapi.com/
category: content_safety
parent: —
motivation: 机器学习毒性评分
```

#### 📝 一句话总结

Perspective API 将一段文本映射为多个安全属性分数，例如 toxicity、insult、threat 和 identity attack，帮助评论区或对话系统按阈值做排序、提示、限流或人工审核。

#### 🎯 核心要点

- **输出形式**：API 返回每个请求属性的 `summaryScore.value`，通常解释为模型认为文本匹配该属性的强度分数。
- **常见属性**：TOXICITY、SEVERE_TOXICITY、IDENTITY_ATTACK、INSULT、PROFANITY、THREAT 等。
- **产品定位**：Perspective 是风险评分器，不是完整的社区治理政策；业务方需要自行设定阈值、申诉和人工复核流程。
- **优势场景**：大规模评论流排序、实时提示、低成本预筛选，以及给审核员提供优先级。
- **注意事项**：毒性模型容易受语境、方言、引用、反讽和身份词影响，因此阈值应结合社区目标和公平性评估调整。

#### 🔬 深入细节

![Perspective 模型卡评估图](https://raw.githubusercontent.com/conversationai/perspectiveapi/main/model-cards/auc_wipd.png)

图源：Perspective API 官方 GitHub model cards，用于展示模型评估和公平性相关分析。

```text
Algorithm: Perspective style moderation scoring
Input:
  text comment x
  requested attributes A = {TOXICITY, INSULT, THREAT, ...}
  moderation policy thresholds tau_a
Output:
  scores s_a and product action

1. Normalize and tokenize x according to the deployed text model.
2. For each attribute a in A:
     compute score s_a = model_a(x), where s_a is in [0, 1].
3. Return API response with summaryScore for each attribute.
4. Product layer applies rules:
     if s_THREAT > tau_THREAT: send to urgent review
     else if s_TOXICITY > tau_hide: collapse or queue
     else if s_TOXICITY > tau_warn: show author warning
     else: publish normally
5. Store feedback and moderation outcomes for later calibration.
```

Perspective 的方法可以理解为“属性化内容评分”。它不直接回答“这条评论是否应该删除”，而是回答“这条评论像不像某类不良内容”。这种拆分让同一个模型服务能够支持不同社区：新闻评论区可能选择更高的删除阈值，游戏聊天可能更重视实时限流，教育产品则可能把高分内容优先送人工复核。

模型训练依赖大量带有人类标注的评论样本。对于每个属性，标注者判断文本是否包含攻击、侮辱、威胁或其他模式，分类模型学习从文本特征到属性分数的映射。生产系统通常还会提供反馈接口，让平台把误报、漏报和人工处置结果回流到评估和后续模型迭代中。

阈值是 Perspective 落地的关键。较低阈值能捕获更多问题评论，但会增加误伤，尤其是身份词、引用脏话、讨论歧视议题或受害者自述时；较高阈值更保守，但可能放过隐晦攻击。成熟部署会分属性设置阈值，并把“隐藏”“折叠”“提示作者修改”“人工审核”拆成不同动作。

从 LLM 安全角度看，Perspective 代表了早期但仍实用的“外部文本风险评分器”范式。它不能理解完整多轮对话意图，也不适合判断复杂越狱链条；但在日志清洗、用户生成内容预筛、开放评论风险热度监控等环节，仍是很典型的轻量安全组件。

#### 🧪 练习题

1. 为什么 Perspective 的分数不应被直接等同于“必须删除”的政策决定？
2. 给一个青少年社区设计 TOXICITY、THREAT、IDENTITY_ATTACK 三个阈值时，需要哪些验证集？
3. 如何发现并缓解模型对身份词的系统性误报？
