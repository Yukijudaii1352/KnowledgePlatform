### NeMo Guardrails: NeMo护栏 (NeMo Guardrails)

```yaml
id: nemo_guard
name: NeMo Guardrails
full_name: NeMo护栏 (NeMo Guardrails)
year: "2023"
org: NVIDIA
paper_url: https://www.nvidia.com/en-us/about-nvidia/press-releases/2023/nvidia-nemo-guardrails-open-source-software-to-help-developers-guide-ai-chatbots/
category: content_safety
parent: —
motivation: 对话边界定义框架
```

#### 📝 一句话总结

NeMo Guardrails 提出了一套运行时可编程护栏框架，用 Colang 对话流和 guardrails runtime 在应用与 LLM 之间插入可解释的输入、对话、检索、执行和输出控制，解决模型内置对齐难以按业务场景快速改写的问题。

#### 🎯 核心要点

- 采用 runtime proxy 架构：应用代码不直接调用 LLM，而是先经过 Guardrails runtime，再由 runtime 决定是否调用模型、工具或预定义回复。
- 用 Colang 描述 rails：把用户 canonical form、bot canonical form、dialogue flow、自定义 action 和上下文状态组织成可执行对话规则。
- Topical rails 使用三阶段链式推理：生成用户 canonical form，匹配或生成下一步 flow，基于下一步生成 bot message。
- Execution rails 支持 Python 自定义动作，可实现事实核查、幻觉检测、输入/输出 moderation、工具调用约束等安全机制。
- 官方库抽象五类护栏：input rails、dialog rails、retrieval rails、execution rails、output rails，分别拦截用户输入、对话状态、RAG 检索片段、工具执行和模型输出。
- 通过 KNN/vector search 检索与当前输入相似的 canonical form、guardrail flow 和输出示例，为 few-shot prompting 提供动态上下文。
- 与 RLHF、SFT 等 embedded rails 不同，NeMo Guardrails 的规则在运行时生效，独立于底层 LLM，可解释、可版本化、可按应用快速调整。
- 论文评估显示，同时使用 input 与 output moderation rails 比单独使用任一 rail 更稳健；事实核查和幻觉 rail 也以 LLM-as-verifier 方式补充普通生成流程。

#### 🔬 深入细节

![NeMo Guardrails runtime 架构图](https://ar5iv.labs.arxiv.org/html/2310.10501/assets/emnlp2023-latex/figures/guardrails-architecture.png)
*图：NeMo Guardrails 作为应用与 LLM 服务之间的 runtime 层，内部执行 canonical form 生成、KNN 示例检索、guardrail flow 匹配/生成、Colang flow 执行和最终输出生成。*

```python
# NeMo Guardrails 推理路径伪代码
class GuardedConversation:
    def __init__(self, config):
        self.flows = load_colang_flows(config.rails_co)
        self.actions = load_python_actions(config.actions_py)
        self.vector_index = build_index(self.flows.canonical_forms,
                                        self.flows.dialog_flows,
                                        self.flows.bot_outputs)
        self.state = RuntimeState()

    def generate(self, user_message):
        # 1. input rails: 先检查或改写用户输入
        for rail in self.config.input_rails:
            result = rail.run(user_message, self.state)
            if result.blocked:
                return result.safe_response
            user_message = result.message

        # 2. topical/dialog rails: 把原始话语映射为 canonical form
        examples = self.vector_index.nearest(user_message, k=3)
        canonical_user = llm_generate_canonical_form(user_message, examples, self.state)

        # 3. Colang runtime 决定下一步：命中预定义 flow，或让 LLM 生成兼容的 next step
        next_steps = self.match_or_generate_next_steps(canonical_user)
        events = self.execute_colang_flow(next_steps, self.state)

        # 4. execution rails: flow 中可调用工具、事实核查、moderation 等 action
        for event in events:
            if event.type == "action_call":
                action_result = self.actions[event.name](**event.kwargs)
                self.state.update(action_result)

        # 5. 生成候选回复，再经过 output rails
        draft = llm_generate_bot_message(self.state, next_steps)
        for rail in self.config.output_rails:
            result = rail.run(draft, self.state)
            if result.blocked:
                return result.safe_response
            draft = result.message
        return draft
```

NeMo Guardrails 的核心动机是把“安全与可控”从模型权重中解耦出来。模型对齐、RLHF 或系统提示可以提供一般性的安全边界，但它们通常难以表达复杂业务流程，例如某个客服机器人必须先认证再查询订单、某个金融助手只能在检索证据支撑下回答、某个医疗应用必须在不确定时转人工。NeMo 的做法是把 LLM 看成可调用的生成器，把应用约束放在一个 dialogue-manager-like runtime 中执行。

Colang 是这个框架的关键抽象。它把自然语言意图写成 canonical form，把多轮对话策略写成 flow，把工具和检查器写成 action。与传统 NLU 系统中固定 intent 分类器不同，canonical form 可以由 LLM 生成，不必完全封闭在预定义标签集合里；但它又会被开发者定义的 canonical examples 和 flows 约束。于是系统同时保留了 LLM 的泛化能力和对话管理器的可控状态机能力。

Topical rails 的三阶段机制可以形式化为：

$$
c_t = f_\theta\big(\mathrm{Prompt}_{\mathrm{canon}}(h_t, \mathrm{KNN}(x_t, \mathcal{E}))\big)
$$

$$
s_t = R_{\mathrm{Colang}}(c_t, \mathcal{F}, \mathrm{state}_t)
$$

$$
y_t = f_\theta\big(\mathrm{Prompt}_{\mathrm{bot}}(h_t, s_t, \mathrm{state}_t)\big)
$$

其中 \(x_t\) 是用户输入，\(h_t\) 是对话历史，\(\mathcal{E}\) 是 canonical/form 示例库，\(\mathcal{F}\) 是 Colang flow 集合，\(R_{\mathrm{Colang}}\) 是运行时解释器，\(s_t\) 是下一步动作或 bot canonical form。直觉上，第一步把自然语言归一化为“当前用户在做什么”，第二步用规则和状态决定“机器人接下来应该做什么”，第三步才让 LLM 负责“怎么自然地说出来”。

Execution rails 扩展了 topical rails 的控制范围。事实核查 rail 把 RAG 场景转为 entailment 判断：给定 evidence 与 bot response，要求 LLM 判断 response 是否由 evidence 支撑；若不支撑，系统可以拒答、降级或要求重新生成。幻觉 rail 则借鉴 self-consistency：对同一问题采样多个候选答案，再检查候选之间是否一致；如果高温采样得到的回答彼此冲突，说明模型可能在无证据编造。Moderation rails 则在输入进入主对话系统前、输出返回用户前分别检查，形成前后两道闸门。

从工程角度看，NeMo Guardrails 的优势是可组合。一个配置目录可以同时包含 `config.yml`、`rails.co`、`actions.py` 和知识库设置；`config.yml` 选择模型和启用哪些 rails，`rails.co` 写对话规则，`actions.py` 写需要外部 API 或自定义逻辑的动作。由于 Guardrails runtime 是 async-first，实际部署时可包装 OpenAI、Llama、Falcon、Vicuna、LangChain chain 或工具服务，而不是绑定单一模型提供商。

与单纯系统提示相比，NeMo Guardrails 的区别在于它不只“告诉模型要遵守规则”，还在运行时执行规则。系统提示如果被 prompt injection 诱导，模型可能忽略约束；Colang flow 和 execution rail 则可以在模型前后检查、阻断、改写或调用外部判别器。与完全传统的任务型对话系统相比，NeMo 又不要求人工穷举所有 intent 和 response，而是让 LLM 在 canonical form 和 next step 层面补足泛化能力。

代价也很明确：三阶段链式 prompting 会带来额外延迟和成本，论文限制部分指出通常接近普通单次生成调用的 3 倍，因为 canonical form、next step、bot message 依赖顺序执行，难以简单 batch。安全 rail 也不是完美替代模型对齐；更合理的部署方式是把 programmable rails 与 embedded rails 叠加使用，用运行时规则覆盖业务边界，用模型对齐处理基础安全能力。

> 💡 关键：NeMo Guardrails 的“算法”不是一个单独分类器，而是一个可解释的运行时控制系统，把 LLM 生成、向量检索、Colang 状态机和外部动作统一编排成可审计的对话安全层。

#### 🧪 练习题

```yaml
question: "NeMo Guardrails 中 Colang flow 的核心作用是什么？"
options:
  - "替代所有底层大语言模型参数"
  - "把开发者定义的对话规则、canonical form 和动作组织成 runtime 可执行的护栏"
  - "只用于压缩 RAG 检索文档"
  - "把用户输入直接翻译成 SQL 查询"
answer: 1
explain: "Colang 是 NeMo Guardrails 的规则建模语言，runtime 解释这些 flow 来决定下一步对话、工具调用和安全控制。"
```
