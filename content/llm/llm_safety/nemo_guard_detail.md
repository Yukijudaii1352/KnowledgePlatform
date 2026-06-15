### NeMo Guardrails：NeMo护栏 (NeMo Guardrails)
```yaml
id: nemo_guard
name: NeMo Guardrails
full_name: NeMo护栏 (NeMo Guardrails)
year: '2023'
org: NVIDIA
paper_url: https://www.nvidia.com/en-us/about-nvidia/press-releases/2023/nvidia-nemo-guardrails-open-source-software-to-help-developers-guide-ai-chatbots/
category: content_safety
parent: —
motivation: 对话边界定义框架
```

#### 📝 一句话总结
NeMo Guardrails 是面向 LLM 应用的可编程对话护栏框架，用 Colang 规则、动作和运行时拦截输入、对话流、检索、工具执行与输出。

#### 🎯 核心要点
- 不是单一模型算法，而是 LLM 应用运行时框架，位于用户、应用工具和底座模型之间。
- 使用 Colang 定义可解释的对话流、拒答规则、工具调用边界和响应约束。
- 支持 input rails、dialog rails、retrieval rails、execution rails、output rails 等多类护栏。
- 可将规则、检索、动作函数和外部 moderation 模型组合到同一个对话管理层。
- 适合企业场景中把安全策略、品牌边界和工具权限从模型权重中抽离出来做工程化治理。

#### 🔬 深入细节
![NeMo Guardrails 可编程护栏](https://raw.githubusercontent.com/NVIDIA-NeMo/Guardrails/develop/docs/_static/images/programmable_guardrails.png)
*图：NeMo Guardrails 官方文档中的 programmable guardrails 示意图。*

```python
# NeMo Guardrails 应用流程简化伪代码
config = load_guardrails_config("config.yml", "rails.co", "actions.py")
runtime = GuardrailsRuntime(config)

def handle_user_turn(user_message, conversation_state):
    input_decision = runtime.run_input_rails(user_message, conversation_state)
    if input_decision.blocked:
        return input_decision.safe_response

    canonical_intent = runtime.canonicalize_user_message(user_message)
    next_step = runtime.run_dialog_rails(canonical_intent, conversation_state)

    if next_step.needs_retrieval:
        docs = retriever.search(next_step.query)
        docs = runtime.run_retrieval_rails(docs)

    if next_step.needs_action:
        action_result = runtime.run_execution_rails(next_step.action)

    draft = llm.generate(next_step, docs, action_result)
    return runtime.run_output_rails(draft, conversation_state)
```

NeMo Guardrails 的动机是应用级安全不能完全交给底座模型。一个客服、金融或企业知识库助手不仅要“回答安全”，还要遵守业务流程、工具权限、检索范围、品牌语气和合规规则。把这些规则全部塞进 prompt 难以维护，写成可编程护栏更可审计。

框架的关键抽象是 rails。Input rails 在用户消息进入模型前执行，可以做注入检测、敏感意图拦截或格式检查；dialog rails 管理对话状态和下一步动作；retrieval rails 控制哪些文档可进入上下文；execution rails 限制工具调用；output rails 在最终回复前检查安全和格式。

Colang 提供了声明式对话流表达方式。开发者可以写“当用户请求某类受限操作时，触发某个安全回复或人工升级动作”，而不是期待模型每次都从自然语言 prompt 中推断业务规则。动作函数则负责连接 Python 代码、API、数据库或外部分类器。

与 CAI、DPO、Safe RLHF 这类训练方法不同，NeMo Guardrails 是推理时治理层。它不能替代模型对齐，但能把策略执行显式化，并把失败面从“模型是否记得规则”转移到“运行时是否正确匹配规则和动作”。在实际系统中，两者通常需要一起使用。

#### 🧪 练习题
```yaml
question: "NeMo Guardrails 的主要定位是什么？"
options:
  - "一种替代 tokenizer 的压缩算法"
  - "一种训练奖励模型的方法"
  - "位于 LLM 应用运行时的可编程对话护栏框架"
  - "只用于图像生成的数据集"
answer: 2
explain: "NeMo Guardrails 通过 Colang、rails 和 actions 在推理时管理输入、对话、检索、工具和输出边界。"
```
