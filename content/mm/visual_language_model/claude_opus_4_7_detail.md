### Claude Opus 4.7 — 高分辨率视觉与 xhigh effort 的 agentic 推理模型

```yaml
id: claude_opus_4_7
name: Claude Opus 4.7
year: '2026.04'
category: frontier_2026
institution: Anthropic
paper: —
motivation: xhigh深度推理模式
parent: —
description: 支持3.75MP高分辨率输入，引入"xhigh"深度推理模式，在OmniDocBench上达到87.7。
topic_id: visual_language_model
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/visual_language_model/claude_opus_4_7_detail.md
```

#### 📝 一句话总结

Claude Opus 4.7 是 Anthropic 面向长任务、代码 agent 和高分辨率视觉理解的 Opus 级模型，公开技术重点是 `xhigh` effort、更高视觉 token 上限、1M 上下文、严格指令跟随和更主动的自我验证。

#### 🎯 核心要点

- 官方发布时间：Anthropic 于 2026-04-16 发布 Claude Opus 4.7，定位为当时最强的 generally available model for complex reasoning and agentic coding。
- xhigh effort：新增 `xhigh` effort level，位于 `high` 与 `max` 之间，用于长时间 agentic/coding 任务；Claude Code 对所有计划默认提升到 `xhigh`。
- 高分辨率视觉：Claude Opus 4.7 是首个支持 high-resolution image support 的 Claude 模型，最大 native image resolution 为 2576 px 长边、4784 visual tokens。
- 3.75MP 含义：2576 px 长边在 4:3 附近约为 2576×1450 量级，接近 3.75MP；官方文档强调 4K 仍会下采样到 2576×1449。
- 长上下文与输出：迁移文档列出 Opus 4.7 支持 1M token context、128k max output、adaptive thinking、Files API、PDF、vision 和全套工具。
- 视觉/文档场景：官方发布页强调 dense screenshots、complex diagrams、document analysis、computer-use agents；视觉导航图显示高分辨率输入显著提升 ScreenSpot-Pro。
- 公开资料核验：输入 YAML 的 OmniDocBench 87.7 未在 Anthropic 官方发布页/vision docs 中直接出现；官方公开视觉相关指标包括 ScreenSpot-Pro、CharXiv Reasoning、OfficeQA Pro 等。

#### 🔬 深入细节

##### 官方示意图

![Claude Opus 4.7 visual navigation benchmark](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Fe97dffe5ee2a8764d5f122578f2ad8cde957070e-1920x1080.png&w=3840)
*图：Anthropic 官方 Claude Opus 4.7 发布页中的 ScreenSpot-Pro 视觉导航结果。高分辨率 Opus 4.7 相比低分辨率设置和 Opus 4.6 有明显提升。*

公开来源：Anthropic 发布页 `https://www.anthropic.com/news/claude-opus-4-7`；Claude migration guide `https://platform.claude.com/docs/en/about-claude/models/migration-guide`；Claude vision docs `https://platform.claude.com/docs/en/build-with-claude/vision`；Claude effort docs `https://platform.claude.com/docs/en/build-with-claude/effort`；Anthropic system cards index `https://www.anthropic.com/system-cards`。

##### xhigh + 高分辨率视觉流程伪代码

```python
# Claude Opus 4.7: high-resolution vision + adaptive thinking + effort control

def call_opus47_for_document_task(task, images, documents, tools):
    visual_blocks = []
    for image in images:
        # Opus 4.7 native high-res: up to 2576 px long edge / 4784 visual tokens
        resized = resize_preserve_aspect(image, max_long_edge=2576)
        visual_blocks.append({
            "type": "image",
            "data": resized,
            "coordinate_space": "resized_pixels",
        })

    request = {
        "model": "claude-opus-4-7",
        "thinking": {"type": "adaptive"},
        "output_config": {"effort": "xhigh"},
        "messages": [{
            "role": "user",
            "content": [
                {"type": "text", "text": task},
                *visual_blocks,
                *load_documents(documents),
            ],
        }],
        "tools": tools,
        "max_tokens": 128_000,
    }

    while True:
        response = claude.messages.create(**request)
        if response.stop_reason == "tool_use":
            tool_result = run_tool(response.tool_name, response.tool_input)
            request["messages"].append(format_tool_result(tool_result))
            continue
        return verify_and_format(response.text)
```

##### 关键公式

Claude vision docs 说明图像按 \(28 \times 28\) patch 计为 visual tokens。给定图像宽高 \((W,H)\)，视觉 token 近似为：

$$
N_{\text{vis}} =
\left\lceil \frac{W'}{28} \right\rceil
\times
\left\lceil \frac{H'}{28} \right\rceil
$$

其中 \((W',H')\) 是按长边上限和 token 上限缩放后的尺寸。Opus 4.7 的上限可抽象为：

$$
\max(W', H') \le 2576,\quad N_{\text{vis}} \le 4784
$$

effort 控制可以看作在能力收益和 token/延迟成本之间选点：

$$
e^\* = \arg\max_{e \in \{\text{low}, \text{medium}, \text{high}, \text{xhigh}, \text{max}\}}
\left[
Q_{\text{task}}(e) - \lambda C_{\text{tokens}}(e) - \mu L(e)
\right]
$$

`xhigh` 的定位是让 \(Q_{\text{task}}\) 在长时程任务上接近 `max`，但成本和延迟低于无约束 `max`。

##### 方法解读

Claude Opus 4.7 的视觉改动可以理解为“提升模型实际看到的图像细节”，而不是简单放宽上传文件大小。早期 Claude 模型会把大图下采样到较低 native resolution，导致密集截图、小字号表格、坐标指向和复杂文档布局中的关键信息丢失。Opus 4.7 将 native 视觉上限提高到 2576 px 长边和 4784 visual tokens，使模型在 computer use、文档问答、图表解析和 UI 定位中保留更多局部线索。

这种高分辨率支持直接改变了坐标类任务的工程处理方式。vision docs 说明，当要求 Claude 输出点或 bounding boxes 时，最好使用模型实际看到的 resized image 坐标；migration guide 也强调 Opus 4.7 返回的 pointing/bounding-box coordinates 与实际图像像素 1:1 对齐，不需要额外 scale-factor conversion。对视觉语言模型而言，这意味着输出不只是语义描述，还可以稳定落到屏幕或文档页面的具体像素位置。

`xhigh` effort 是 Opus 4.7 的另一条主线。旧式 extended thinking 常通过手工 `budget_tokens` 控制推理预算；Opus 4.7 起迁移到 adaptive thinking + effort parameter。effort 不是严格 token 上限，而是模型在回答、工具调用参数和 thinking 中愿意投入多少 token 的行为信号。`xhigh` 介于 `high` 与 `max` 之间，特别面向 30 分钟以上的 coding/agentic 任务和百万级 token budget。

在长任务中，Opus 4.7 强调“自我验证”与严格指令跟随。发布页多次提到模型会在报告结果前设计验证方式，合作方反馈也集中在日志分析、代码修复、缺失数据如实报告、持续执行工具失败后的恢复等场景。这类能力不是单轮 VQA 可以覆盖的：模型需要保持任务状态、决定何时调用工具、检查中间产物，并在发现不一致时回滚或修正。

相较于只追求最高视觉 benchmark 的模型，Opus 4.7 的设计更偏向可控生产工作流。更高分辨率带来最多约 3 倍图像 token 成本，updated tokenizer 也可能让相同文本映射到 1.0-1.35 倍 token；因此 Anthropic 同时给出 effort、task budgets、downsampling 和迁移指南。实际使用时应把高分辨率视觉留给小字、UI、表格、图表和坐标敏感任务，而不是对所有图片无差别开启最高保真。

> 💡 关键：Opus 4.7 的 VLM 价值在于“看得更细 + 想得更久 + 更会验证”，三者合在一起才支撑文档、截图和代码 agent 的长时程任务。

#### 🧪 练习题

```yaml
question: "Claude Opus 4.7 的 high-resolution image support 最直接改善哪类任务？"
options:
  - "只包含纯文本的短问答"
  - "密集截图、文档布局、图表和坐标定位"
  - "无需视觉输入的随机文本续写"
  - "把所有图像都原样保存为训练数据"
answer: 1
explain: "官方文档强调 2576px 长边和 4784 visual tokens 主要服务 computer use、screenshot understanding、document analysis，以及需要坐标/小字细节的视觉任务。"
```
