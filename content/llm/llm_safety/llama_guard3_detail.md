### Llama Guard 3: 多模态对话安全分类器

```yaml
id: llama_guard3
name: Llama Guard 3
full_name: Llama Guard 3
year: '2024'
org: Meta
paper_url: https://arxiv.org/abs/2312.06674
category: content_safety
parent: llama_guard
motivation: 多模态安全过滤分类
```

#### 📝 一句话总结

Llama Guard 3 把“安全策略文本 + 对话上下文 + 图像”统一交给视觉语言模型判别，输出 `safe/unsafe` 以及违规类别，从而在多模态输入和模型回复两个位置都做安全过滤。

#### 🎯 核心要点

- **判别对象**：既可做 prompt classification，判断用户图文请求是否有害；也可做 response classification，判断模型图文对话中的回复是否违规。
- **模型形态**：以 Llama 3.2 11B Vision 为底座做监督微调，输入安全策略、角色、对话文本和图像，输出安全标签与类别。
- **安全 taxonomy**：采用 MLCommons 风险分类，覆盖暴力、性内容、危险活动、欺诈、隐私、自残等 13 类风险。
- **实践结论**：单独过滤 prompt 容易被对抗文本或对抗图像绕过；论文建议 prompt 过滤和 response 过滤同时启用。
- **边界限制**：主要面向英语、多模态对话和单图场景，不应被当作通用纯图像安全模型或所有语言场景的最终裁决器。

#### 🔬 深入细节

![Llama Guard 3 Vision 框架图](https://arxiv.org/html/2411.10414v1/extracted/6003144/figures/llama_guard_3_11B_vision_figure.png)

图源：Meta 的 Llama Guard 3 Vision 公开论文页面。manifest 中的 `paper_url` 指向 Llama Guard 系列早期论文；多模态 Llama Guard 3 Vision 的公开页面用于补足图示和方法细节。

```text
Algorithm: Llama Guard 3 style multimodal safety classification
Input:
  taxonomy T, safety policy P
  conversation C = [(role_i, text_i, optional image_i)]
  mode in {prompt_classification, response_classification}
Output:
  label in {safe, unsafe}, violated_categories

1. Serialize P and T as natural-language safety instructions.
2. Select the target span:
   - prompt mode: user multimodal message
   - response mode: assistant response under the same context
3. Render text turns and image tokens into the vision-language model input.
4. Generate a compact classification answer:
   first token: safe or unsafe
   following tokens: category ids when unsafe
5. Optionally calibrate with token probabilities or deployment threshold.
6. If unsafe, block, route to review, or ask the application model to refuse.
```

Llama Guard 3 的核心不是给每个风险类别单独训练一个传统分类器，而是把安全规范写进模型输入，让模型按“阅读政策后判案”的方式输出标签。这样做的好处是策略文本可以较自然地表达复杂边界，例如同样出现武器、医学或自残词汇时，教育、新闻、紧急求助和明确执行伤害之间需要不同判定。

多模态版本把图像也纳入判别。prompt classification 关注用户是否正在用图片和文字组合提出危险请求；response classification 则关注助手最终回复是否真的泄露了危险步骤、隐私或其他受限内容。论文的一个重要经验是，输入端过滤对对抗扰动更敏感，因为攻击者只要让守卫误判请求为安全即可；输出端过滤要看到模型实际说了什么，通常更贴近最终风险。

训练数据采用人工与合成混合构建。公开论文描述了 prompt-image 对和 prompt-response-image 样本两条数据线，并用统一 taxonomy 标注安全类别。监督微调让模型学习生成 `safe`、`unsafe` 与类别编号，而不是输出长篇解释，这降低了部署解析成本，也便于与网关、日志和审计系统集成。

从系统设计看，Llama Guard 3 更适合作为“安全网关中的一个判别节点”，而不是唯一防线。实际部署通常还需要上游策略路由、下游人工复核、敏感场景白名单以及异常日志分析。尤其在多语言、多图、视频或领域专有内容中，需要重新评估阈值和错误类型。

#### 🧪 练习题

1. 为什么 response classification 往往比只做 prompt classification 更能覆盖最终风险？
2. 如果应用需要支持中文和多图输入，你会优先补哪些评测集？
3. 如何把 Llama Guard 3 的类别输出接入产品侧的不同处置策略？
