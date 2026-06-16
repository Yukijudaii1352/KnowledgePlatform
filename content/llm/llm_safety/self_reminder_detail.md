### Self-Reminder：自我提醒
```yaml
id: "self_reminder"
name: "Self-Reminder"
full_name: "自我提醒 (Self-Reminder)"
year: "2023"
org: "Academic"
paper_url: "https://www.nature.com/articles/s42256-023-00765-8"
category: "jailbreak"
parent: "—"
motivation: "系统提示词防御指令"
```

#### 📝 一句话总结
Self-Reminder 提出 system-mode self-reminder：在系统层把用户查询包裹在责任提醒中，让模型在生成前后都显式回到“负责任助手”模式；论文在构造的 jailbreak 数据集上将 ChatGPT 的攻击成功率从 67.21% 降到 19.34%，且不需要重新训练模型。

#### 🎯 核心要点
- 方法灵感来自心理学中的 self-reminder：用外部提示帮助主体维持目标、规则和自我控制。
- 防御形式是系统提示词包装：在用户查询外层加入责任提醒，而不是修改用户原文或训练模型参数。
- 关键设计是 system-mode：提醒位于比用户 jailbreak 更外层的系统上下文，试图抢占对话“当前模式”的优先级。
- 论文构造 540 个 jailbreak 样本，由 54 个有效 jailbreak prompt 和 10 类 malicious instructions 组合而成。
- 恶意指令分为 misinformation 和 toxic 两类，用于评估不同危害场景下的攻击成功率。
- 评估使用 ChatGPT API gpt-3.5-turbo-0301 重复 5 次，平均 ASR 从 67.21±1.28% 降至 19.34±0.37%。
- 论文还检查了常规任务副作用、adaptive attacks、prefix/suffix-only ablation 和不同提醒语气，证明简单提示防御有效但并非完备。

#### 🔬 深入细节
![System-Mode Self-Reminder 示意图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig1_HTML.png)
*图：Nature Machine Intelligence 论文 Figure 1，对比无 jailbreak、有 jailbreak、以及用 system-mode self-reminder 包裹用户查询后的响应差异。*

Self-Reminder 的问题设定很直接：许多 jailbreak 并不是攻击模型权重，而是在上下文里诱导模型切换到一个不受控角色，例如要求模型忘记安全规则、扮演另一个代理、禁止道歉或禁止拒绝。作者认为，既然 jailbreak 能通过 prompt 把模型推入某种“模式”，防御也可以在更外层显式设定一个安全模式，让模型在处理用户输入时不断提醒自己是负责任的助手。

形式化地，设用户原始查询为 \(q\)，攻击者插入的 jailbreak 上下文为 \(j\)，模型为 \(M\)。无防御时，模型看到的输入近似为：

$$
x_{attack} = j \oplus q
$$

Self-Reminder 定义一个包装函数 \(D(\cdot)\)，把用户侧内容嵌入系统层责任提醒中：

$$
x_{defended} = D(j \oplus q) = r_{pre} \oplus \langle user\ query: j \oplus q \rangle \oplus r_{post}
$$

其中 \(r_{pre}\) 和 \(r_{post}\) 不是普通聊天内容，而是提醒模型保持负责任行为、避免有害或误导性输出的系统级约束。这个设计的核心不是关键词过滤，而是利用聊天模型对 system prompt 和外层上下文的服从倾向，让安全目标在注意力竞争中比用户注入的角色设定更显著。

```python
# System-Mode Self-Reminder 防御伪代码
# 使用概念化模板，避免复刻论文中的完整可执行提示词

def build_self_reminder_prompt(user_query):
    pre_reminder = (
        "System: operate as a responsible assistant; "
        "avoid harmful or misleading content; answer the enclosed request responsibly."
    )
    post_reminder = (
        "System reminder: keep the same responsible mode when producing the final answer."
    )
    return f"{pre_reminder}\n<UserQuery>\n{user_query}\n</UserQuery>\n{post_reminder}"

def safe_chat(user_query, model):
    defended_input = build_self_reminder_prompt(user_query)
    response = model.generate(defended_input)
    return response
```

论文的数据集构造是理解结果的关键。作者从公开 jailbreak prompt 来源中收集候选，去除需要人工交互或攻击成功率过低的样本，最终保留 54 个有效 jailbreak prompt；再设计 10 个 malicious instructions，覆盖 misinformation 与 toxic 两组任务。两者笛卡尔积形成 540 个评测样本。这样设计能区分“越狱模板是否强”和“具体恶意目标是否容易触发拒答”：有些恶意目标包含明显危险词，更容易被模型识别；有些 jailbreak prompt 会显式要求不要提醒安全规范，因此更难防。

评价指标是 Attack Success Rate (ASR)，可写为：

$$
\mathrm{ASR}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\mathrm{Judge}(M(x_i))=\mathrm{unsafe\ success}\right]
$$

为了减少人工标注成本，补充材料描述了半自动判定流程：一类方法利用 watermark 式检测，另一类方法用 ChatGPT 作为分类器判断回复是否包含对应有害内容；两者一致时直接采用，不一致时人工复核。这个流程不是 Self-Reminder 本身的一部分，但它让 540 样本、5 次重复的 ASR 评估更可操作。

![不同场景下 ASR 分布](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig3_HTML.png)
*图：论文 Figure 3，展示 Self-Reminder 在常规 jailbreak、adaptive attack、消融和不同模型版本等场景下的 ASR 变化。*

Self-Reminder 与 Perplexity Filter 这类输入检测不同。Perplexity Filter 尝试识别“这个输入像不像攻击”，而 Self-Reminder 假设攻击可能已经进入上下文，于是改变模型处理上下文的方式。它也不同于 RLHF 或安全微调，因为没有更新参数；部署成本接近一次 prompt 包装。这使它很适合作为产品侧快速防御，但也带来局限：如果底层模型对 system prompt 层级不敏感，或者攻击者能构造强 adaptive prompt 去反制提醒，防御效果会下降。

论文还关注副作用。一个糟糕的系统提醒可能让模型过度拒答，或者在普通任务上不断输出安全废话。作者因此在 GLUE、摘要、翻译、问答等常规任务上比较 ChatGPT 与 ChatGPT + Self-Reminder，观察到整体能力没有明显崩塌，但输出风格可能更偏解释性和谨慎。实际应用中，这意味着 reminder 文案需要面向业务调参：安全敏感场景可以更强硬，创作或开发者工具则需要降低过度拒答。

> 💡 关键：Self-Reminder 的有效性来自“外层模式设定”而非“识别所有坏 prompt”。它不需要知道用户用了哪一种 DAN、JailBreak、AIM 或其他角色扮演模板，只要系统层提醒能在生成时保持更高优先级，就可能把模型拉回安全轨道。

从工程角度看，Self-Reminder 最适合与其他防线组合。输入侧可以先做异常检测和意图分类；模型调用时用 system-mode reminder 固定责任模式；输出侧再做安全分类和必要的拒答重写。若只依赖 Self-Reminder，攻击者可以尝试更长上下文、间接指令、多轮诱导或工具调用绕行。若把它放在多层防御中，它的优势是实现简单、延迟低、无需训练数据，并且能覆盖一部分自然语言角色扮演越狱。

#### 🧪 练习题
```yaml
question: "Self-Reminder 区别于普通关键词过滤的核心在哪里？"
options:
  - "它通过重新训练模型删除有害知识"
  - "它在系统层包装用户查询，提醒模型保持负责任模式"
  - "它只允许英文 prompt 进入模型"
  - "它用 perplexity 阈值拦截异常 token 序列"
answer: 1
explain: "Self-Reminder 不依赖关键词或困惑度检测，而是在更外层的系统上下文中加入责任提醒，让模型处理用户输入时维持安全模式。"
```
