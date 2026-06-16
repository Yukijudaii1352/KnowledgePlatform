### Llama Guard 3: Llama Guard 3

```yaml
id: llama_guard3
name: Llama Guard 3
full_name: Llama Guard 3
year: "2024"
org: Meta
paper_url: https://arxiv.org/abs/2312.06674
category: content_safety
parent: llama_guard
motivation: 多模态安全过滤分类
```

#### 📝 一句话总结

Llama Guard 3 将 Llama Guard 的“LLM-as-safety-classifier”范式扩展到 Llama 3.1/3.2 体系，尤其通过 Llama Guard 3 Vision 支持图文输入与文本输出的安全分类，解决多模态对话中 prompt 和 response 需要按可配置风险分类实时过滤的问题。

#### 🎯 核心要点

- 继承 Llama Guard 论文的输入/输出双任务设计：同一个模型可根据指令分类用户 prompt，也可分类 AI agent response。
- 将安全分类建模为 instruction-following generation，输出第一行是 `safe` 或 `unsafe`，若 unsafe 则第二行列出违反的风险类别。
- Llama Guard 3 文本模型面向 Llama 3.1 能力，对齐 MLCommons 标准化风险 taxonomy，并支持多语言文本分类与工具调用安全场景。
- Llama Guard 3 11B Vision 基于 Llama 3.2 11B Vision 微调，支持包含图像和文本的 prompt，以及这些 prompt 对应的文本 response 分类。
- 风险 taxonomy 采用 13 个 MLCommons hazard：Violent Crimes、Non-Violent Crimes、Sex-Related Crimes、Child Sexual Exploitation、Defamation、Specialized Advice、Privacy、Intellectual Property、Indiscriminate Weapons、Hate、Suicide & Self-Harm、Sexual Content、Elections。
- 多模态任务的四个输入要素是 guidelines、classification type、conversation（含图片、用户轮次和 agent 轮次）以及固定输出格式。
- Vision 版本训练集结合人类创建的 prompt-image 对、内部 Llama 生成的良性/违规 response、jailbreak 诱导样本，以及人类或 Llama 3.1 405B 标签。
- 论文报告 Vision 版本在内部 benchmark 上 response classification F1 达 0.938、FPR 为 0.016，优于 GPT-4o 与 GPT-4o mini 的 zero-shot judge 设置。
- 官方提示格式增加 `<|image|>` token，并要求用 `<BEGIN UNSAFE CONTENT CATEGORIES>` 与 `<BEGIN CONVERSATION>` 明确划分安全策略和对话内容。

#### 🔬 深入细节

![Llama Guard 3 Vision response classification 示例图](https://arxiv.org/html/2411.10414v1/extracted/6003144/figures/llama_guard_3_11B_vision_figure.png)
*图：Llama Guard 3 Vision 将图像、用户消息、模型回答和风险分类规则放入同一个指令化 prompt，输出 safe/unsafe 以及违反的 MLCommons hazard 类别。*

```python
# Llama Guard 3 / Llama Guard 3 Vision 推理伪代码
MLCOMMONS_CATEGORIES = [
    "S1 Violent Crimes", "S2 Non-Violent Crimes", "S3 Sex-Related Crimes",
    "S4 Child Sexual Exploitation", "S5 Defamation", "S6 Specialized Advice",
    "S7 Privacy", "S8 Intellectual Property", "S9 Indiscriminate Weapons",
    "S10 Hate", "S11 Suicide & Self-Harm", "S12 Sexual Content", "S13 Elections",
]

def build_guard_prompt(role, user_messages, agent_messages=None, image=None):
    prompt = "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n"
    if image is not None:
        prompt += "<|image|> "
    prompt += f"Task: Check if there is unsafe content in '{role}' messages "
    prompt += "according to our safety policy with the below categories.\n"
    prompt += "<BEGIN UNSAFE CONTENT CATEGORIES>\n"
    prompt += render_categories(MLCOMMONS_CATEGORIES)
    prompt += "<END UNSAFE CONTENT CATEGORIES>\n"
    prompt += "<BEGIN CONVERSATION>\n"
    prompt += render_conversation(user_messages, agent_messages)
    prompt += "<END CONVERSATION>\n"
    prompt += f"Provide your safety assessment for ONLY THE LAST {role}.\n"
    prompt += "First line: safe or unsafe. If unsafe, second line: violated categories."
    prompt += "<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
    return prompt

def guardrail_decision(model, role, user_messages, agent_messages=None, image=None):
    prompt = build_guard_prompt(role, user_messages, agent_messages, image)
    output = model.generate(prompt, image=image, max_new_tokens=32)
    label, categories = parse_guard_output(output)
    if label == "unsafe":
        return {"allow": False, "violations": categories}
    return {"allow": True, "violations": []}
```

Llama Guard 的基础论文把安全过滤从传统小型分类器改造成 instruction-tuned LLM 分类器。它的关键判断是：内容安全并不只是“这句话有没有毒性”，还要区分用户是否在索取危险信息、模型是否给出了危险帮助、以及开发者当前采用哪套 policy。把 taxonomy 和 guidelines 放进 prompt 之后，模型就可以按不同规则进行 zero-shot、few-shot 或进一步 fine-tuning，而不必为每套政策训练完全独立的固定分类器。

Llama Guard 3 沿用这个范式，但把 taxonomy 换成更标准化、更细粒度的 MLCommons hazard。对文本模型来说，它覆盖 Llama 3.1 时代常见的多语言、搜索、代码解释器工具使用等安全需求；对 Vision 模型来说，它进一步加入图像理解。官方文档明确区分：Llama Guard 3 11B Vision 不是纯图片审核器，而是评估“图像 + 文本 prompt”或“图像上下文下的文本 response”在对话任务中的安全性。这一点很重要，因为同一张图像是否危险，往往取决于用户问题和模型回答。

从输入结构看，Llama Guard 3 Vision 的分类任务由四个部分组成。第一是 guidelines，也就是当前启用的风险类别及描述；第二是 classification type，说明要判断 User 还是 Agent；第三是 conversation，包含图片、用户轮次和模型轮次；第四是 output format，强制生成 `safe`/`unsafe` 与类别列表。这个结构把策略、对象、上下文和输出协议全部显式化，降低了“模型不知道该按什么标准判断”的歧义。

可以把其生成式分类目标写成：

$$
p_\theta(o_{1:m}\mid G, T, H, I) = \prod_{j=1}^{m} p_\theta(o_j\mid o_{<j}, G, T, H, I)
$$

其中 \(G\) 是安全指南和类别描述，\(T\) 是 prompt classification 或 response classification，\(H\) 是对话历史，\(I\) 是可选图像，\(o_{1:m}\) 是模型输出的安全判定文本。实际部署时，第一 token 或第一行决定二分类标签：

$$
\hat{y}=\begin{cases}
\mathrm{unsafe}, & p_\theta(\texttt{unsafe}\mid G,T,H,I) > p_\theta(\texttt{safe}\mid G,T,H,I) \\
\mathrm{safe}, & \text{otherwise}
\end{cases}
$$

如果 \(\hat{y}=\mathrm{unsafe}\)，后续 token 生成的类别如 `S10`、`S11` 就提供多标签解释。与普通 softmax 分类头相比，这种方案牺牲了一些固定接口的简洁性，但换来策略可写入 prompt、类别可裁剪、输出格式可解释的灵活性。

训练上，Llama Guard 3 Vision 不是只拿文本版数据硬迁移。论文描述的训练集包含 22,500 个 prompt-image 标注样本，以及 40,034 个 prompt-response-image 标注样本；其中 response 可由内部 Llama 模型生成，违规样本通过 jailbreak 技术诱导得到，标签由人类或 Llama 3.1 405B 提供。模型在 Llama 3.2 11B Vision 上做监督微调，序列长度 8192，训练 3600 步，每个 prompt 只含一张图像，图像编码器会将输入重采样成多个视觉块。

数据增强延续了 Llama Guard 的思想。训练时会随机丢弃未被违反的类别，使模型学会“只按 prompt 中包含的类别判断”；还会打乱类别索引，并同步修改目标输出，避免模型死记 `S10` 永远等于某个固定自然语言类别。这对实际部署很关键，因为不同应用可能删掉某些类别、改写类别描述、或者只关心少数高风险类别。

论文报告 prompt classification 明显比 response classification 难。原因是多模态 prompt 往往含有指代歧义，例如文本说“怎么买这个”而图像中有多个物体时，安全性取决于用户指的是什么；而 response classification 可以直接检查 agent 是否给出了违规帮助。因此 Vision 论文建议在许多场景中优先使用 response classification，它在内部 benchmark 中取得更高 F1 和更低 false positive rate。实际系统通常会同时部署输入检查与输出检查，但应理解二者错误模式不同。

与 NeMo Guardrails 这类 runtime orchestration 相比，Llama Guard 3 更像一个可插拔的安全判别模型。它不负责管理复杂对话流程，也不执行工具，但能作为 input rail 或 output rail 使用：用户输入先送 Llama Guard 3 判定，若 unsafe 则拒绝或改写；模型生成后再送 Llama Guard 3 判定，若 unsafe 则阻断、重写或升级到人工审核。对于多模态助手，Vision 版本的价值在于它能看到图片上下文，避免文本-only moderation 漏掉图像触发的风险。

> ⚠️ 注意：Llama Guard 3 Vision 的定位不是通用图像审核，也不是绝对安全判官；它是对话安全分类器，最适合在图文对话系统里与系统提示、模型对齐、工具权限控制和日志审计一起使用。

#### 🧪 练习题

```yaml
question: "Llama Guard 3 Vision 相比文本版 Llama Guard 的关键扩展是什么？"
options:
  - "只检测图片是否清晰，不处理文本"
  - "把图像、用户/模型对话和安全 taxonomy 一起输入，分类 prompt 或 response 是否安全"
  - "取消 taxonomy，只输出自然语言解释"
  - "替代所有业务侧 guardrails runtime"
answer: 1
explain: "Llama Guard 3 Vision 基于 Llama 3.2 11B Vision 微调，支持图文上下文下的输入和输出安全分类，并输出 safe/unsafe 及违反类别。"
```
