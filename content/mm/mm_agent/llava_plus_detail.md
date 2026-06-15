### LLaVA-Plus

```yaml
id: llava_plus
name: LLaVA-Plus
full_name: "LLaVA增强版 (LLaVA-Plus)"
year: "2023"
org: "UW-Madison"
paper_url: "https://arxiv.org/abs/2311.05437"
category: "framework"
parent: "mm_react"
motivation: "维护外部视觉工具库实现动态Agent"
```

#### 📝 一句话总结

LLaVA-Plus 提出了一种让开源大多模态模型学会使用外部视觉工具的多模态 Agent，解决了纯 prompt 工具链不稳定、纯端到端 LMM 难以覆盖大量专用视觉技能的问题。它通过技能仓库和视觉指令微调，让 LLaVA 能主动选择、调用并组合工具结果完成复杂任务。

#### 🎯 核心要点

- 在 LLaVA 基础上加入 skill repository，包含多种预训练视觉与视觉语言工具
- 让 LMM 承担工具 planner 角色，直接基于用户图像和指令决定是否调用工具
- 训练数据覆盖视觉理解、生成、外部知识检索和多工具组合
- 使用 ChatGPT/GPT-4 辅助构造多模态 tool-use instruction-following 数据
- 提出 user-oriented dialogue 与 skill-oriented dialogue 的统一表示
- 推理包含四步：用户输入 → LLaVA-Plus 发起工具请求 → 工具执行 → LLaVA-Plus 综合工具结果回答
- 相比 MM-ReAct 纯 prompt 编排，LLaVA-Plus 通过视觉指令微调把工具选择能力内化到开源 LMM 中

#### 🔬 深入细节

##### 框架总览

![LLaVA-Plus 四步工具管线](https://ar5iv.labs.arxiv.org/html/2311.05437/assets/x2.png)
*图：LLaVA-Plus 的四步流程。模型接收图像和指令后，可以发起 skill-oriented dialogue 调用工具，再整合工具输出生成最终回答。*

##### 算法流程

```python
# LLaVA-Plus tool-use 推理伪代码
image_query, text_query = user_input
dialogue_state = []

while True:
    model_output = llava_plus(
        image=image_query,
        text=text_query,
        history=dialogue_state,
        skill_specs=skill_repository_schema,
    )

    if model_output.type == "tool_call":
        tool = skill_repository[model_output.tool_name]
        tool_result = tool(image_query, **model_output.arguments)
        dialogue_state.append({
            "request": model_output,
            "observation": serialize(tool_result),
        })
    else:
        final_answer = model_output.answer
        break
```

##### 方法细节

LLaVA-Plus 的问题意识来自两类路线的缺口。端到端 LMM 通过图文预训练和指令微调获得通用视觉理解能力，但很难把分割、OCR、检测、生成、知识检索等大量专门技能都塞进一个模型权重中。工具链方案如 MM-ReAct 可以调用外部模型，但主要依赖 prompt engineering，工具选择不稳定，且 LLM 在规划时未必真正利用图像特征。

LLaVA-Plus 的折中方案是“Plug and Learn to Use Skills”：把外部视觉模型组织成 skill repository，同时用多模态指令微调训练 LLaVA 学会何时调用这些工具。也就是说，工具能力仍然保留在外部专家中，但工具选择、参数生成和结果整合能力被训练进 LMM。

论文把对话分成两类。第一类是 user-oriented dialogue，模型直接回答用户问题：

$$
({\bf I}_q, {\bf X}_q) \rightarrow {\bf X}_{answer}
$$

第二类是 skill-oriented dialogue，模型先生成工具请求，再根据工具返回结果继续回答：

$$
({\bf I}_q, {\bf X}_q) \rightarrow {\bf X}_{skill}
\rightarrow {\bf O}_{skill}
\rightarrow {\bf X}_{answer}
$$

其中 \({\bf I}_q\) 是用户图像，\({\bf X}_q\) 是文本指令，\({\bf X}_{skill}\) 是工具调用描述，\({\bf O}_{skill}\) 是工具输出。关键差异是：LLaVA-Plus 在整个会话中始终保留原始图像输入，而不是只在工具调用时临时把图像交给外部专家。这让模型在规划阶段也能结合视觉上下文。

训练数据由多种工具使用样例构成，包括 grounding、tagging、caption、OCR、分割、图像生成和外部知识检索等。作者利用 ChatGPT/GPT-4 生成或整理 instruction-following 样例，使模型学习“用户意图 → 工具选择 → 参数组织 → 结果综合”的完整链路。推理时有两种使用方式：All Tools 预先调用多种工具作为外部知识，Fly 则按需动态调用相关工具以节省成本。

与 MM-ReAct 相比，LLaVA-Plus 的核心提升在于 planner 本身是多模态的。MM-ReAct 的 ChatGPT 只能看到文本化图像路径和工具描述，LLaVA-Plus 则直接看到图像，并通过训练学会把视觉内容与工具选择对齐。这对于需要细粒度视觉定位、OCR 或分割的任务尤其重要。

工程上，LLaVA-Plus 可以通过 FastChat 服务部署，web server 接收用户请求，model worker 运行 LMM，tool worker 运行技能仓库，controller 协调模型和工具。这个结构使新工具可以继续插入：为新工具收集相应 instruction-following 数据，再做指令微调即可扩展模型能力。

> 💡 关键：LLaVA-Plus 不是把所有视觉技能都重新训练进 LLaVA，而是训练 LLaVA 作为多模态 planner 去“会用工具”。

#### 🧪 练习题

```yaml
question: "LLaVA-Plus 相比 MM-ReAct 的关键区别是什么？"
options:
  - "LLaVA-Plus 完全不使用外部工具"
  - "LLaVA-Plus 只支持文本输入，不支持图像"
  - "LLaVA-Plus 通过视觉指令微调让多模态模型学习工具选择和组合，而不是只靠 prompt 编排"
  - "LLaVA-Plus 将所有工具输出丢弃，只保留模型原始回答"
answer: 2
explain: "MM-ReAct 主要依赖文本 LLM 和 prompt 规则调用工具；LLaVA-Plus 则让开源 LMM 在图像上下文中学习 tool-use dialogue，更稳定地选择、调用和整合工具。"
```
