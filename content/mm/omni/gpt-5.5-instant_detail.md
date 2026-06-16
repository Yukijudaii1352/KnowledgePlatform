### GPT-5.5即时全模态 (GPT-5.5 Instant)
```yaml
id: gpt-5.5-instant
name: GPT-5.5 Instant
full_name: GPT-5.5即时全模态 (GPT-5.5 Instant)
year: '2026'
org: OpenAI
paper_url: https://openai.com/gpt-5-5
category: frontier_2026
parent: gpt-4o
motivation: 低延迟全模态推理
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/gpt-5.5-instant_detail.md
```

#### 📝 一句话总结
GPT-5.5 Instant 是 OpenAI 面向 ChatGPT 默认交互的低延迟 Instant 模型，把文本、图像、个性化上下文、工具/搜索决策和安全监控统一到快速响应路径中，解决高频日常问答在准确性、简洁性、视觉理解和延迟之间的取舍问题。

#### 🎯 核心要点
- 默认 Instant 模型：OpenAI 发布页说明 GPT-5.5 Instant 从 2026-05-05 起替代 GPT-5.3 Instant 成为 ChatGPT 默认模型，并通过 API `chat-latest` 暴露最新 Instant 快照。
- 多模态输入：OpenAI API 文档显示 `chat-latest` 支持文本和图像输入、文本输出；音频和视频在该模型接口中不作为原生输入输出能力开放。
- 低延迟推理路径：System Card 说明 GPT-5.5 Instant 在部署时使用低 reasoning effort，而能力评估可在更高 effort 下测上限。
- 事实性增强：官方发布页报告相较 GPT-5.3 Instant，高风险提示中的 hallucinated claims 减少 52.5%，用户标记困难对话中的 inaccurate claims 减少 37.3%。
- 自适应工具使用：发布页强调它更会判断何时使用 web search，API 文档也把 GPT-5.5 系列定位为支持 hosted tools、tool search、prompt caching 等生产功能。
- 个性化上下文：发布页强调回答可更好利用历史聊天和连接数据，同时为 Free/Go 等层级提供不同范围的个性化 rollout。
- 安全栈升级：System Card 将 GPT-5.5 Instant 作为首个在 Cybersecurity 与 Biological/Chemical Preparedness 中按 High capability 处理的 Instant 模型，并启用相应监控和缓解。

#### 🔬 深入细节
![GPT-5.5 Instant 图像输入示例](https://images.ctfassets.net/kftzwdyauwt9/5bsfu8NcoBRFtPBIKqg3fv/ec6e143175189cee14e35a02f69e4e11/algebra.jpeg?fm=webp&q=90&w=640)
*图：OpenAI 在 GPT-5.5 Instant 发布页中用于对比视觉/数学纠错能力的手写代数图片。官方没有公开模型内部架构图，因此这里使用官方多模态输入示例，并在下文给出系统级抽象。*

```python
# GPT-5.5 Instant 的公开资料级系统抽象
def gpt55_instant_respond(user_turn, chat_state, personalization, tools):
    # 1. 汇聚 ChatGPT 默认模型可见上下文：文本、图像、历史偏好和可用工具
    context = pack_context(
        text=user_turn.text,
        images=user_turn.images,        # API chat-latest: text/image input
        history=chat_state,
        personalization=personalization,
        system_policy=current_policy(),
    )

    # 2. Instant 路径优先低延迟；必要时选择搜索/工具，而不是无条件长思考
    effort = "low"                     # System Card: deployed at low reasoning effort
    action = decide_action(context, tools, budget="interactive_latency")

    evidence = []
    if action.needs_web_search:
        evidence.append(tools.web_search(action.query))
    if action.needs_file_or_connector:
        evidence.append(tools.retrieve(action.source))

    # 3. 多模态条件生成，并在输出前后运行安全/事实性/策略监控
    draft = model.generate(
        context=context,
        evidence=evidence,
        reasoning_effort=effort,
        output_modality="text",
        verbosity="concise",
    )
    return safety_and_quality_stack(draft, context, high_capability_safeguards=True)
```

GPT-5.5 Instant 的“架构”公开信息更接近产品化系统描述，而不是论文中的逐层网络图。可确定的是：它是 ChatGPT 的默认 Instant 路径，API 的 `chat-latest` 指向当前 ChatGPT Instant 快照；公开 API 能力为文本和图像输入、文本输出，并支持 Responses/Chat Completions 等端点。与 GPT-4o 的端到端音频-视觉-文本 omni 叙事不同，GPT-5.5 Instant 的公开材料没有宣称在该接口上提供原生音频输出，因此这里的“全模态”应理解为 ChatGPT 交互系统中的多模态输入、上下文个性化和工具增强，而不是已披露的任意模态到任意模态生成器。

一个保守的形式化抽象是把用户文本、图像、对话状态、个性化记忆和检索证据都并入条件上下文：

$$
c = \operatorname{Pack}(x_{\mathrm{text}}, x_{\mathrm{image}}, h_{\mathrm{chat}}, m_{\mathrm{personal}}, e_{\mathrm{tool}}, s_{\mathrm{policy}})
$$

模型随后以自回归方式生成文本：

$$
p_{\theta}(y_{1:T}\mid c, r)=\prod_{t=1}^{T}p_{\theta}(y_t\mid y_{<t}, c, r)
$$

其中 \(r\) 是 reasoning effort 或等价的推理预算控制。OpenAI 的最新模型指南说明 GPT-5.5 支持从 none/low/medium/high/xhigh 的 effort 选择，而 System Card 明确 GPT-5.5 Instant 在生产部署中使用低 effort；这解释了 Instant 的产品定位：在大多数日常场景中用更少推理 token 和更短路径获得足够可靠的答案，把更深推理留给 Thinking/Pro 或显式高 effort 工作流。

工具使用是 GPT-5.5 Instant 相比普通聊天模型更重要的推理环节。发布页强调它更会判断何时使用 web search；开发者文档也把 GPT-5.5 系列放在支持 hosted tools、tool search、prompt caching 和长上下文生产工作流的模型族中。可以把即时推理视为带成本约束的动作选择：

$$
a^*=\arg\max_{a\in\{\mathrm{answer},\mathrm{search},\mathrm{retrieve},\mathrm{tool}\}}
\mathbb{E}[U(y,x,a)]-\lambda C_{\mathrm{latency}}(a)-\mu C_{\mathrm{risk}}(a)
$$

如果问题可由当前上下文回答，模型直接生成；如果问题依赖最新事实或外部资料，它应选择搜索或检索。这个目标解释了为什么低延迟模型不应只是“小模型”：它必须在交互预算内做出是否调用工具、引用哪些证据、何时停止的决策，否则会在事实性和响应速度之间来回牺牲。

视觉路径上，官方例子展示 GPT-5.5 Instant 对手写代数过程进行纠错。该能力可抽象为先把图片编码为视觉 token，再与文本提示共同进入语言推理上下文：

$$
z_{\mathrm{vision}}=V_{\psi}(I),\qquad
c=[E(x_{\mathrm{text}}); z_{\mathrm{vision}}; h_{\mathrm{chat}}; m_{\mathrm{personal}}]
$$

在代数例子中，模型不只是 OCR 出公式，而是要验证每一步变形：平方、展开、移项、判别式、定义域约束和回代。视觉 token 提供手写内容，语言推理负责把它转化为可检查的符号链。这个组合也是 Instant 模型最常见的多模态用法：用户上传截图、照片、表格或作业，模型在较低延迟下给出纠错和解释。

训练公开信息主要来自 System Card。OpenAI 披露 GPT-5.5 Instant 使用多样化数据训练，包括公开互联网信息、第三方合作数据、用户或人类训练者/研究者提供或生成的信息；数据处理包含质量过滤、个人信息减少和安全分类器。后训练目标可以概括为有用性、事实性、简洁性、个性化、安全性和工具使用能力的联合优化：

$$
\mathcal{L}=
\mathcal{L}_{\mathrm{next\ token}}
+\lambda_{\mathrm{inst}}\mathcal{L}_{\mathrm{instruction}}
+\lambda_{\mathrm{pref}}\mathcal{L}_{\mathrm{preference}}
+\lambda_{\mathrm{fact}}\mathcal{L}_{\mathrm{factuality}}
+\lambda_{\mathrm{safety}}\mathcal{L}_{\mathrm{safety}}
+\lambda_{\mathrm{tool}}\mathcal{L}_{\mathrm{tool}}
$$

事实性改进是 GPT-5.5 Instant 发布页最明确的质量信号：相较 GPT-5.3 Instant，在医学、法律、金融等高风险提示上幻觉声明减少 52.5%，在用户标记为事实错误的困难对话上不准确声明减少 37.3%。这说明训练和评测重点不是单纯“回答更多”，而是减少错误断言、在需要外部信息时更主动使用搜索，并用更短、更清晰的答案降低用户筛选成本。

安全方面，System Card 把 GPT-5.5 Instant 放进更严格的 Preparedness 框架：这是首个在生物/化学和网络安全类别按 High capability 处理的 Instant 模型。生产系统因此不只依赖模型权重里的拒答行为，还包括自动监控、actor-level enforcement、安全控制、系统级缓解，以及对越狱、prompt injection、健康、幻觉、公平性和高风险能力的持续评估。对一个默认模型来说，这些系统级保护是架构的一部分，因为它决定了哪些输入可进入高风险路径、哪些输出会被中断或改写。

与 GPT-4o 相比，GPT-5.5 Instant 的公开定位发生了偏移：GPT-4o 的核心贡献是端到端 omni 低延迟交互，尤其是音频实时性；GPT-5.5 Instant 的核心贡献是把“默认日常模型”做得更可靠、更会用上下文、更会选择搜索、回答更短，同时保留图像理解和工具增强。它不是公开论文里可复现的单一网络结构，而是一个面向海量 ChatGPT 默认流量的低延迟多模态推理系统。

> ⚠️ 注意：OpenAI 未公开 GPT-5.5 Instant 的参数规模、tokenizer、视觉编码器、训练配比或精确路由器结构；上面的公式和伪代码用于把官方发布页、System Card 与 API 文档中的行为约束形式化，不代表未披露内部实现。

#### 🧪 练习题
```yaml
question: "GPT-5.5 Instant 的公开资料中，最能体现其 Instant 路径设计的是哪一项？"
options:
  - "它在 chat-latest 中提供原生音频输入和音频输出"
  - "它作为 ChatGPT 默认模型，用低 reasoning effort、图像/文本输入、工具/搜索决策和安全监控支撑快速回答"
  - "它取消所有个性化上下文，只依赖固定系统提示"
  - "它只用于离线长任务，不面向 ChatGPT 默认交互"
answer: 1
explain: "OpenAI 发布页和 System Card 将 GPT-5.5 Instant 定位为默认 Instant 模型；API 文档显示 chat-latest 支持文本/图像输入和文本输出，System Card 说明生产部署使用低 reasoning effort。"
```
