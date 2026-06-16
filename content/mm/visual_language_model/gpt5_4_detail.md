### GPT-5.4 — 1M 上下文的原生计算机使用多模态模型

```yaml
id: gpt5_4
name: GPT-5.4
year: '2026.03'
category: native_multimodal
institution: OpenAI
paper: —
motivation: 原生统一架构+1M上下文
parent: gemini
description: 原生统一架构支持1M上下文，强化计算机交互能力，在MMMU Pro上达到75%。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/gpt5_4_detail.md
```

#### 📝 一句话总结

GPT-5.4 没有公开论文，公开资料显示它把文本、图像/截图、长上下文、工具搜索和计算机操作放进同一个 agentic reasoning 工作流，重点解决长任务中“看见界面、选择工具、执行动作、验证结果”的闭环问题。

#### 🎯 核心要点

- 官方发布信息：OpenAI 于 2026-03-05 发布 GPT-5.4，覆盖 ChatGPT、API 和 Codex，定位为面向专业工作的 frontier model。
- 原生计算机使用：OpenAI 将 GPT-5.4 描述为首个具备原生 state-of-the-art computer-use 能力的通用模型，可基于截图发出鼠标/键盘动作，也可写代码操作应用。
- 1M 长上下文：Codex 和 API 中支持 up to 1M tokens context，用于长文档、代码库、计划-执行-验证链路和跨工具任务。
- 工具搜索：不把所有工具 schema 一次性塞进上下文，而是让模型在大工具生态中按需发现和加载工具，降低上下文占用。
- 视觉/交互评测：官方发布页报告 OSWorld-Verified 75.0%、WebArena-Verified 67.3%、Online-Mind2Web 92.8%，强调屏幕理解和浏览器/桌面操作。
- 安全卡片：GPT-5.4 Thinking system card 将其作为 GPT-5 系列 reasoning model 讨论，并说明其首次在通用模型上实现 High cybersecurity capability mitigation。
- 公开资料核验：输入描述中的 “MMMU Pro 75%” 未在 GPT-5.4 主发布页中出现；OpenAI 后续 GPT-5.4 mini/nano 发布页给出的 GPT-5.4 xhigh 为 MMMUPro 81.2、MMMUPro w/ Python 81.5，可能对应不同时间或 harness。

#### 🔬 深入细节

##### 官方示意图

![GPT-5.4 电子表格能力示例](https://images.ctfassets.net/kftzwdyauwt9/6HIfga5zjofGwccjVeZA2e/fcca68f123b1110c7b4f275caa2d3669/Spreadsheet_-_desktop_-_light.png?fm=webp&q=90&w=3840)
*图：OpenAI GPT-5.4 发布页中的 spreadsheet 输出对比示例。它不是网络架构图，但能代表 GPT-5.4 面向“可视化文档/表格 + 操作执行 + 结果产物”的产品化能力边界。*

公开来源：OpenAI GPT-5.4 发布页 `https://openai.com/index/introducing-gpt-5-4/`；GPT-5.4 Thinking System Card `https://openai.com/index/gpt-5-4-thinking-system-card/`；GPT-5.4 mini/nano benchmark 页 `https://openai.com/index/introducing-gpt-5-4-mini-and-nano/`。

##### Agentic computer-use 流程伪代码

```python
# GPT-5.4: long-context multimodal computer-use loop (公开资料抽象版)

def run_gpt54_agent(task, long_context, tool_catalog, computer):
    memory = load_project_memory()
    trace = []

    while not solved(task, trace):
        # 1. 原生多模态观察：文本、文件、截图、历史轨迹共同进入上下文
        screenshot = computer.capture_screen()
        state = build_context(
            task=task,
            text_context=long_context,
            image_context=screenshot,
            memory=memory,
            action_trace=trace,
        )

        # 2. 工具搜索：只在需要时加载候选工具的详细 schema
        tool_query = model.decide_tool_need(state)
        tools = tool_search(tool_catalog, tool_query) if tool_query else []

        # 3. 推理与行动：输出自然语言、代码、函数调用或鼠标/键盘动作
        action = model.plan_and_act(state, tools=tools, effort="xhigh")
        observation = execute(action, computer=computer, tools=tools)
        trace.append((action, observation))

        # 4. 验证：检查 UI 状态、文件产物、测试结果或用户约束
        verdict = model.verify(task, trace, observation)
        if verdict.needs_repair:
            trace.append(("repair_note", verdict.feedback))
            continue

        update_memory(memory, task, trace)
        return model.final_answer(task, trace)
```

##### 关键公式

可以把公开能力抽象成“多模态状态到动作”的策略模型。给定任务 \(g\)、文本/代码上下文 \(X\)、截图或图像 \(I_t\)、可用工具集合 \(\mathcal{T}\)、历史轨迹 \(H_t\)，模型在第 \(t\) 步的状态为：

$$
s_t = [g;\, X_{\le 1M};\, E_{\text{img}}(I_t);\, E_{\text{tool}}(\mathcal{T}_t);\, H_t]
$$

动作可以是文本 token、函数调用、代码片段或 GUI 操作：

$$
a_t \sim \pi_\theta(a \mid s_t), \quad
a_t \in \{\text{text}, \text{tool\_call}, \text{code}, \text{mouse/key}\}
$$

对长任务，单步正确率不够，目标更接近带成本约束的闭环效用：

$$
\max_\theta \; \mathbb{E}\left[
R_{\text{task}} + \beta R_{\text{verify}}
- \lambda_{\text{tok}} C_{\text{tokens}}
- \lambda_{\text{err}} C_{\text{tool-errors}}
\right]
$$

这里 \(R_{\text{verify}}\) 表示模型主动检查输出、运行测试、读取界面状态后的收益；\(C_{\text{tokens}}\) 和 \(C_{\text{tool-errors}}\) 对应 OpenAI 强调的 token-efficient reasoning 与更可靠工具使用。

##### 方法解读

GPT-5.4 的关键不是单独“能看图”，而是把视觉理解放进可行动的环境循环。传统 VLM 通常把图像转成答案，例如描述图表或回答视觉问答；GPT-5.4 的公开定位更接近 UI agent：它需要读取截图中的按钮、表格、错误提示、浏览器状态，再把视觉判断转化为鼠标、键盘、Playwright 代码或 API 工具调用。OSWorld-Verified、WebArena-Verified 和 Online-Mind2Web 这类 benchmark 衡量的正是这种“看见界面后完成任务”的能力。

1M 上下文的价值也不只是一次塞入更多 token。长上下文让模型能同时保留任务说明、项目文件、网页材料、历史操作轨迹和验证日志，但如果每一步都把无关信息完整重读，成本和干扰都会上升。因此 GPT-5.4 与 tool search 的组合更像一个上下文调度系统：长上下文负责保留全局任务状态，工具搜索负责在需要时展开局部工具说明，验证步骤负责把执行结果写回轨迹。

从视觉语言模型角度看，GPT-5.4 的“原生统一架构”应谨慎理解为公开能力层面的统一，而不是已公开的网络结构。OpenAI 没有披露参数量、视觉编码器结构、训练数据规模或是否使用特定 MoE 路由；可验证的事实是同一模型接口能处理文本、图像输入、工具调用、代码执行和计算机控制。与 CLIP/BLIP 这类图文对齐模型相比，它的输出空间从“答案 token”扩展到了“可执行动作 token”。

工具搜索是 GPT-5.4 面向真实生产环境的另一个核心机制。大型 agent 系统可能有成百上千个 connector、MCP server、内部函数和文件工具，直接把所有 schema 放进 prompt 会消耗上下文并引入选择噪声。按需检索工具 schema 相当于把 \(p(a_t \mid s_t)\) 分解为先选工具子空间、再生成调用参数，降低无关工具对推理的干扰，也让长任务中的工具集合可以动态变化。

安全卡片说明 GPT-5.4 Thinking 延续 GPT-5 系列的安全评估，并把高能力网络安全风险作为部署重点之一。这一点对 computer-use 模型尤其重要：一旦模型能操作浏览器、文件系统和软件，风险不再局限于生成文本，而包括自动化执行、凭据处理、越权访问和高影响代码操作。因此实际部署时，模型能力必须与权限边界、用户确认、沙箱、审计日志和工具级策略一起设计。

> 💡 关键：GPT-5.4 的方法贡献更像“多模态推理模型 + 工具搜索 + 计算机使用环境 + 长上下文记忆”的系统级整合，而不是一篇公开论文中可复现的单一网络模块。

#### 🧪 练习题

```yaml
question: "从公开资料看，GPT-5.4 相比传统图文问答 VLM 的核心变化是什么？"
options:
  - "只把图像编码器换成更大的 CNN"
  - "把视觉理解接入工具调用和计算机操作闭环"
  - "只支持离线图像分类，不处理文本"
  - "完全依赖外部 OCR，模型本身不看截图"
answer: 1
explain: "GPT-5.4 的公开重点是原生 computer-use、1M 上下文和工具搜索；模型需要根据截图和任务上下文执行动作并验证结果，而不只是回答图像问题。"
```
