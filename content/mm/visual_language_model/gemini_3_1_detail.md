### Gemini 3.1 Pro — 长上下文原生多模态推理模型

```yaml
id: gemini_3_1
name: Gemini 3.1 Pro
year: '2026.02'
category: native_multimodal
institution: Google
paper: —
motivation: 2M超长上下文多模态
parent: gemini
description: 支持2M超长上下文，实现音视频图文同步处理，在MMMU Pro上达到79%。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/gemini_3_1_detail.md
```

#### 📝 一句话总结

Gemini 3.1 Pro 是基于 Gemini 3 Pro 的原生多模态 reasoning model，把文本、图像、音频、视频、PDF 和代码库放入长上下文推理与工具执行流程，重点提升复杂问题求解、agentic coding 和跨模态综合能力。

#### 🎯 核心要点

- 官方 model card：Gemini 3.1 Pro 是 Gemini 3 系列的下一代版本，属于 highly capable, natively multimodal reasoning models。
- 模型依赖：Google DeepMind 明确说明 Gemini 3.1 Pro is based on Gemini 3 Pro，未公开参数量、训练细节或完整网络结构。
- 输入输出：官方 model card/API 文档列出输入支持文本、图像、音频、视频、PDF/代码，输出为文本，最大输出 64K tokens。
- 上下文核验：公开 model card 和 API 文档写的是 up to 1M / 1,048,576 input tokens；这与输入 YAML 中“2M超长上下文多模态”不一致，YAML 已按要求原样保留。
- 推理控制：Google Cloud 文档列出 improved token efficiency and thinking，并新增 `MEDIUM` thinking level，用于在成本、速度和性能之间折中。
- 工具与 agent：支持 Google Search grounding、code execution、function calling、structured output、context caching，并提供 `gemini-3.1-pro-preview-customtools` 端点优化 bash/custom tools 工作流。
- 评测：官方 blog 报告 ARC-AGI-2 verified 77.1%；model card 覆盖 reasoning、multimodal、agentic tool use、multilingual 和 long-context 等评估。

#### 🔬 深入细节

##### 官方示意图

![Gemini 3.1 Pro benchmark overview](https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/gemini_3-1-pro__benchmarks.gif)
*图：Google 官方 Gemini 3.1 Pro 发布页中的 benchmark 对比图，展示 3.1 Pro 相比 Gemini 3 Pro 在核心推理评测上的提升。*

公开来源：Gemini 3.1 Pro model card `https://deepmind.google/models/model-cards/gemini-3-1-pro/`；Gemini API model spec `https://ai.google.dev/gemini-api/docs/models/gemini-3.1-pro-preview`；Google Cloud Agent Platform spec `https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/3-1-pro`；Gemini 2.5 technical report `https://storage.googleapis.com/deepmind-media/gemini/gemini_v2_5_report.pdf`。

##### 多模态长上下文流程伪代码

```python
# Gemini 3.1 Pro: native multimodal long-context reasoning loop (公开资料抽象版)

def build_gemini31_prompt(task, files, code_repo, tools, thinking_level="MEDIUM"):
    context = []

    for item in files:
        if item.type == "text":
            context.append(encode_text(item.content))
        elif item.type == "image":
            context.append(encode_image(item.bytes, resolution_tokens=1120))
        elif item.type == "pdf":
            context.append(encode_pdf(item.bytes, resolution_tokens=560))
        elif item.type == "video":
            context.append(encode_video(item.bytes, tokens_per_frame=70))
        elif item.type == "audio":
            context.append(encode_audio(item.bytes))

    context.append(encode_code_index(code_repo))
    assert token_count(context) <= 1_048_576

    return {
        "model": "gemini-3.1-pro-preview",
        "input": [task, *context],
        "tools": select_tools(tools, task),
        "thinking_level": thinking_level,
    }

def solve_with_tools(request):
    while True:
        step = gemini.generate(request)
        if step.type == "function_call":
            result = run_tool(step.name, step.args)
            request["input"].append({"tool_result": result})
            continue
        if step.type == "code_execution":
            result = execute_python(step.code)
            request["input"].append({"code_result": result})
            continue
        return step.text
```

##### 关键公式

Gemini 3.1 Pro 的公开资料没有披露内部架构，可以用统一多模态 token 序列来抽象其接口行为。设文本、图像、音频、视频、PDF 和代码分别编码为：

$$
Z = [E_{\text{text}}(X), E_{\text{img}}(I), E_{\text{audio}}(A), E_{\text{video}}(V), E_{\text{pdf}}(D), E_{\text{code}}(C)]
$$

在最大输入长度约束下：

$$
|Z| \le 1{,}048{,}576
$$

模型按自回归方式生成答案或工具调用：

$$
p_\theta(Y \mid Z, \mathcal{T}, e)
= \prod_{t=1}^{m} p_\theta(y_t \mid y_{<t}, Z, \mathcal{T}, e)
$$

其中 \(\mathcal{T}\) 是可用工具集合，\(e \in \{\text{LOW}, \text{MEDIUM}, \text{HIGH}\}\) 可理解为 thinking level。实际系统要优化的是质量、成本和延迟的折中：

$$
U(e) = Q(e) - \lambda C_{\text{tokens}}(e) - \mu L_{\text{latency}}(e)
$$

`MEDIUM` thinking level 的意义就是在 \(Q\)、token 成本和延迟之间给开发者多一个可控点。

##### 方法解读

Gemini 3.1 Pro 的核心定位是“基于 Gemini 3 Pro 的多模态推理增强版”，而不是公开可复现的新结构论文。model card 只说明它是 Gemini 3 系列的 natively multimodal reasoning model，并把详细架构指向 Gemini 3 Pro model card；因此精读时应避免假设具体参数量、MoE 规模或视觉编码器实现。可验证的技术主线是：多模态输入、长上下文、thinking 控制、工具调用和 agentic 工作流在同一模型接口中协同。

长上下文在 Gemini 3.1 Pro 中服务于“跨来源综合”，而不仅是长文摘要。Google Cloud 文档列出它可处理文本、代码、图像、音频、视频、PDF，甚至整个代码库；同时给出每类媒体的工程限制，例如视频约 45 分钟含音频、音频约 8.4 小时或 up to 1M tokens、PDF 和图像各自有 resolution token 设置。这意味着模型面对的是异质证据池，需要在同一推理链里把时间序列、页面布局、视觉区域和代码符号关系对齐。

thinking level 是 Gemini 3.1 Pro 相比普通多模态模型更偏“推理系统”的信号。固定推理深度会让简单请求浪费 token，也会让困难任务推理不足；`LOW/MEDIUM/HIGH` 这样的控制把 test-time compute 暴露给开发者，使应用可以按任务风险选择预算。比如批量分类可以低 effort，文档审查和复杂代码修改可用 medium/high，并结合 code execution 或 search grounding 做验证。

custom tools endpoint 说明 Gemini 3.1 Pro 的 agentic 能力不仅依赖模型本体，还依赖工具选择分布的校准。普通函数调用只要求模型生成合法参数；代码库任务还要求模型优先选择 `view_file`、`search_code`、bash 等局部检索/执行工具。专门的 customtools 端点相当于把工具先验调向工程 agent 场景，让模型在“读文件、定位符号、执行命令、修复错误”的循环中更稳定。

与 Gemini 2.5 technical report 中的方向一致，Gemini 3.1 Pro 延续了“原生多模态 + 长上下文 + tool use + thinking”的路线。差别在于 3.1 Pro 作为 2026 年的产品模型，把这些能力更明确地暴露为 API/Agent Platform 规格：输入类型、token 上限、thinking level、code execution、function calling、Google Search grounding 和 context caching 都成为开发者可编排的接口，而不只是论文 benchmark 中的能力描述。

> ⚠️ 注意：本条 YAML 的 “2M超长上下文” 与 2026-06-15 Google Cloud 文档、Gemini 3.1 Pro model card 的公开 1M/1,048,576 token 上限不一致；正文方法解读按公开官方文档写作。

#### 🧪 练习题

```yaml
question: "Gemini 3.1 Pro 的 `MEDIUM` thinking level 主要解决什么工程问题？"
options:
  - "让模型只能处理图像，不能处理文本"
  - "在推理质量、token 成本和延迟之间提供中间档控制"
  - "把最大上下文从 1M 降到 8K"
  - "关闭所有工具调用以减少系统复杂度"
answer: 1
explain: "官方文档将 MEDIUM 描述为 expanded thinking level 的一部分，用于优化 cost、performance 和 speed 的 trade-off。"
```
