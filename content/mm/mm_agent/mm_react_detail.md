### MM-ReAct

```yaml
id: mm_react
name: MM-ReAct
full_name: "多模态推理行动 (MM-ReAct)"
year: "2023"
org: "Microsoft"
paper_url: "https://arxiv.org/abs/2303.11381"
category: "framework"
parent: "—"
motivation: "将ReAct推理框架扩展到多模态场景"
```

#### 📝 一句话总结

MM-ReAct 提出了一种无需训练的多模态 ReAct 框架，让 ChatGPT 通过文本协议调用一组视觉专家模型，解决纯文本 LLM 无法直接处理图像、视频和空间信息的问题。它把图片路径、坐标和视觉专家输出都文本化，使 LLM 能在多轮推理中规划、调用工具并整合观察结果。

#### 🎯 核心要点

- 将 ReAct 的 “Thought → Action → Observation” 模式扩展到多模态视觉理解任务
- 使用 ChatGPT 作为高层控制器，视觉专家模型作为外部工具池
- 用文件路径或 URL 作为图像/视频占位符，让文本 LLM 可以在对话中引用非文本输入
- 通过 prompt 注入每个视觉专家的能力、输入参数、输出格式和 few-shot 示例
- 使用 watchword 与正则表达式解析 ChatGPT 的工具调用请求，并将工具输出序列化为文本 observation
- 支持多图推理、OCR/图表/表格理解、目标检测、空间坐标理解、视频摘要、开放概念识别等任务
- 与联合微调式多模态模型不同，MM-ReAct 强调可插拔、训练免费、工具可升级的系统范式

#### 🔬 深入细节

##### 框架总览

![MM-ReAct 流程图](https://ar5iv.labs.arxiv.org/html/2303.11381/assets/x2.png)
*图：MM-ReAct 的单轮工具调用流程。ChatGPT 生成 action request，系统解析后调用视觉专家，专家输出被文本化为 observation 再反馈给 ChatGPT。*

##### 算法流程

```python
# MM-ReAct 多模态推理行动伪代码
history = []
vision_experts = {
    "Caption": caption_model,
    "OCR": ocr_model,
    "Detection": detector,
    "Segmentation": segmenter,
    "VideoSummary": video_model,
}

while not done:
    prompt = build_prompt(
        user_query=user_query,
        file_paths=uploaded_images_or_videos,
        tool_descriptions=expert_specs,
        history=history,
    )

    response = chatgpt(prompt)

    if contains_watchword(response):  # 例如 "Assistant, ..."
        expert_name, file_path, args = regex_parse(response)
        raw_result = vision_experts[expert_name](file_path, **args)
        observation = serialize_to_text(raw_result)
        history.append((response, observation))
    else:
        final_answer = response
        done = True
```

##### 方法细节

MM-ReAct 面对的核心限制是：ChatGPT 这类 LLM 在当时只能接收文本输入，而高级视觉任务需要理解图像、视频、空间坐标和视觉对象关系。传统做法是训练一个端到端多模态模型，但这需要大量图文数据和模型改造。MM-ReAct 选择系统组合路线：让 LLM 不直接“看图”，而是规划何时调用合适的视觉专家，并把专家结果转成文本继续推理。

非文本输入的表示方式非常朴素：直接把图像或视频的文件路径写进 prompt。路径本身不包含视觉语义，但它给 LLM 一个可引用的句柄。例如用户上传 `receipt_1.jpg`，ChatGPT 可以生成对 OCR 工具的请求并指明这个文件路径。系统看到工具调用请求后实际执行 OCR，再把识别出的文字返回给 ChatGPT。

MM-ReAct 的协议来自 ReAct：

$$
\text{LLM}: \text{Thought} \rightarrow \text{Action Request}
$$

$$
\text{System}: \text{Action Execution} \rightarrow \text{Observation}
$$

LLM 每轮先写出推理过程，再决定是否调用视觉专家。如果需要工具，输出中包含特定 watchword。系统用正则表达式解析专家名称、文件路径和参数，执行工具后把结果转成自然语言或结构化文本。例如检测模型输出边界框时，会序列化为 `<object name, x1, y1, x2, y2>`，并附上坐标含义说明。

这种“文本化视觉观察”的好处是最大化复用 LLM 的推理能力。LLM 不需要读像素，只要能读懂专家返回的文字、坐标、OCR 文本或 caption，就可以继续进行多步组合推理。例如多张发票求和可以先逐张调用 OCR，再用 LLM 做数值汇总；图表问答可以先 OCR 或检测关键区域，再进行逻辑推理。

MM-ReAct 与 Visual ChatGPT、ViperGPT 等同期系统的差异在于定位。Visual ChatGPT 更偏图像生成和编辑工具链，ViperGPT 通常生成一次性 Python 程序，而 MM-ReAct 更强调多轮对话式视觉理解和工具观察回流。它不要求对 LLM 或视觉专家做联合训练，因此工具池可以持续替换或扩展。

局限也很明确：prompt 中要手动写入工具说明，专家数量受上下文窗口限制；所有视觉信息都要被压缩为文本，细粒度视觉结构可能丢失；系统依赖正则解析和 prompt 约定，鲁棒性不如原生多模态模型。但作为多模态 Agent 的早期框架，它清晰展示了“LLM 负责规划，专家负责感知”的可行范式。

> 💡 关键：MM-ReAct 不是让 ChatGPT 直接理解图像，而是给 ChatGPT 一个可调用、可观察、可迭代的视觉工具接口。

#### 🧪 练习题

```yaml
question: "MM-ReAct 中，图像文件路径在 prompt 中的主要作用是什么？"
options:
  - "直接把图像像素编码进 ChatGPT 的词表"
  - "作为非文本输入的占位符，使 ChatGPT 能指定哪个文件应交给视觉专家处理"
  - "替代所有视觉专家模型"
  - "只用于保存最终答案的缓存地址"
answer: 1
explain: "ChatGPT 不能直接读取像素，但可以在文本中引用文件路径。系统解析路径后调用相应视觉专家，并把专家输出文本化为 observation。"
```
