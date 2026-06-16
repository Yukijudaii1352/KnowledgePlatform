### ToolACE：工具调用王牌 (ToolACE)

```yaml
id: toolace
name: ToolACE
full_name: 工具调用王牌 (ToolACE)
year: 2025
org: 浙江大学
paper_url: https://proceedings.iclr.cc/paper_files/paper/2025/hash/663865ea167425c6c562cb0b6bcf76c7-Abstract-Conference.html
category: tool_use
parent: toolllm
motivation: 自动化数据合成提升函数调用准确率
```

#### 📝 一句话总结
ToolACE 提出一个面向 LLM 函数调用训练的数据合成与验证流水线，通过工具自进化、能力自适应对话生成和双层校验，解决真实工具调用数据难收集、合成数据覆盖不足且错误率高的问题。

#### 🎯 核心要点
- 三模块流水线：Tool Self-evolution Synthesis (TSS)、Self-Guided Dialog Generation (SDG)、Dual-Layer Validation Process (DLV)。
- 大规模 API 池：论文构建了 26,507 个多领域、多约束、多参数形态的 API，用于提升工具多样性。
- TSS 三步：Speciation 建 API context tree，Adaptation 为每个 API 采样领域和功能复杂度，Evolution 递归改写 API 定义并扩充参数、约束与返回值。
- SDG 多智能体生成：user agent、assistant agent、tool agent 角色扮演生成单工具、并行工具、依赖工具和非工具使用对话。
- 自引导复杂度：用待微调模型自身的 loss 判断样本是否过易或过难，再动态调节用户 query 的复杂度。
- 多格式泛化：将工具定义和调用转换为 JSON、YAML、XML、Markdown、自然语言等格式，降低模型对单一 schema 的过拟合。
- DLV 双层验证：规则层检查 API 名、必填参数、参数格式、对话结构；模型层检查幻觉、语义一致性和工具返回是否匹配 API 定义。

#### 🔬 深入细节

![ToolACE 总体框架图](https://arxiv.org/html/2409.00920v1/x1.png)
*图：ToolACE 整体框架，由 TSS 工具自进化、SDG 自引导对话生成和 DLV 双层校验组成。*

ToolACE 的问题设定非常具体：函数调用能力不是单靠通用指令数据就能学好，模型需要看到大量“工具描述 → 用户意图 → 参数抽取 → 调用执行 → 结果整合”的样本。但真实 API 对话难以规模化收集和标注，普通合成方法又容易出现工具覆盖窄、参数不合法、调用和用户意图不一致等问题。ToolACE 因此把数据生产拆成“先造足够多样的工具，再围绕工具生成合适难度的对话，最后用可执行约束验证”的流水线。

第一步 TSS 负责扩展工具空间。论文从预训练语料中的 API 文档、产品说明、用户手册等材料出发，抽取应用领域与功能，形成 API context tree。可以把这棵树理解成工具能力的 taxonomy：根节点是大领域，例如 finance、health、transport；下层节点是更细粒度功能，例如 get stock price、book appointment、track shipment。生成某个 API 时，系统从树中采样子树，让 API 获得不同覆盖范围和功能组合。

TSS 的三个子步骤分别控制“从哪里来、复杂到什么程度、如何继续变化”。Speciation 建立领域和功能树，保证工具覆盖不局限在少数热门 API；Adaptation 为每个 API 指定领域和多样性水平，例如只覆盖单一节点的简单 API，或覆盖多个子功能的复杂 API；Evolution 则用 LLM 根据当前子树和示例 API 生成新定义，并通过添加功能、参数、约束、返回字段、嵌套类型等方式持续变异。这个过程最终形成了论文报告的 26,507 个 API 池。

```python
# ToolACE 数据合成核心伪代码：TSS + SDG + DLV

def toolace_pipeline(raw_api_docs, target_llm):
    # 1. TSS: 从预训练/公开文档构造 API context tree
    context_tree = build_api_context_tree(raw_api_docs)
    api_pool = []
    template_buffer = seed_api_templates()

    for domain_subtree in sample_subtrees(context_tree):
        api_template = sample(template_buffer)
        api = frontier_llm.synthesize_api(
            domain=domain_subtree.domain,
            functionalities=domain_subtree.nodes,
            template=api_template,
            constraints=["parameter types", "required fields", "return schema"],
        )
        api = evolve_api(api, mutations=[
            "add_parameter", "change_type", "add_constraint",
            "expand_return_schema", "add_nested_structure",
        ])
        if rule_check_api_definition(api):
            api_pool.append(api)
            template_buffer.update(distill_template(api))

    # 2. SDG: 根据目标模型能力生成合适难度的工具对话
    dialogs = []
    for _ in range(num_samples):
        tools = sample_same_domain_tools(api_pool)
        dialog = []
        while not finished(dialog):
            query = user_agent.generate_or_complicate(dialog, tools)
            action_candidates = [assistant_agent.act(query, tools) for _ in range(k)]
            action = majority_vote(action_candidates)  # self-consistency
            tool_result = tool_agent.execute_or_simulate(action, tools)
            dialog.extend([query, action, tool_result])

            loss = target_llm_loss(target_llm, dialog)
            if loss < lower_bound:
                user_agent.increase_complexity()
            elif loss > upper_bound:
                user_agent.decrease_complexity()

        dialogs.append(format_generalization(dialog, formats=["json", "yaml", "xml", "markdown"]))

    # 3. DLV: 规则校验 + 模型校验
    verified = []
    for sample in dialogs:
        if not rule_verifier(sample):
            continue
        if not model_verifier(sample, checks=["hallucination", "consistency", "tool_response"]):
            continue
        verified.append(sample)

    return verified
```

SDG 的关键不是“随便让 LLM 编对话”，而是让生成数据贴近待训练模型的最近发展区。论文观察到：候选 API 越多、实际调用 API 越多、用户 query 与 API 描述越不相似，样本通常越难。ToolACE 用目标 LLM 对样本的 loss 作为复杂度信号。一个可实现的表达是：

$$
\mathcal{L}(x,y;M)=-\frac{1}{|y|}\sum_{t=1}^{|y|}\log p_M(y_t\mid x,y_{<t})
$$

其中 \(x\) 包含系统指令、工具列表、对话历史，\(y\) 是应生成的函数调用或 assistant 响应。若目标模型已经低 loss 正确生成，说明样本太简单；若微调后仍高 loss，说明样本可能超出当前能力。SDG 据此维护一个合适复杂度区间 \([\tau_{low},\tau_{high}]\)，并通过 user agent 调节 query：太简单就增加 API 数量、并行/依赖关系或语义绕写；太难就减少工具数量或让意图更贴近 API 描述。

多智能体生成是 ToolACE 保证数据结构完整的核心机制。User agent 负责提出需求或补充信息，assistant agent 负责判断是否调用工具、调用哪个工具、填哪些参数、是否需要追问，tool agent 负责模拟 API executor 返回结果。论文中特别强调 assistant action 的 self-consistency：同一状态下生成多个候选动作，只有决策一致时才采用。这比单次采样更稳，因为函数调用数据中一个错参数或错工具名都会污染监督信号。

ToolACE 还显式覆盖四类对话：single function call、parallel function call、dependent function call 和 non-tool-use dialogs。这个设计非常重要，因为真实 agent 既要知道“该调用哪个工具”，也要知道“何时不该调用工具”。例如用户信息不足时应追问；工具列表无关时应拒绝或普通回答；多个城市天气查询可并行；先查航班再订票则是依赖调用。缺少这些负例和结构差异，模型容易学成“看见工具就调用”。

DLV 利用了函数调用数据的可验证性。规则层可以确定性检查 API 名是否在 tool list 中、必填参数是否齐全、参数类型和 regex pattern 是否符合 schema、对话 role 顺序是否正确、tool response 是否有对应调用。模型层再处理规则难以覆盖的语义问题：参数值是否凭空捏造、assistant 最终回答是否满足用户约束、模拟工具返回是否符合 API 定义含义。相比一般聊天数据，工具调用样本有更强结构，因此 ToolACE 能把验证做成流水线而不是纯人工抽查。

> 💡 关键：ToolACE 的贡献不是单个新模型结构，而是“数据生产系统”。它把 API 多样性、query 复杂度、格式泛化和可验证性同时纳入合成闭环，让小参数模型也能通过高质量函数调用数据获得强工具能力。

#### 🧪 练习题
```yaml
question: "ToolACE 用目标 LLM 的 loss 指导数据生成复杂度，主要是为了解决什么问题？"
options:
  - "让所有样本都尽可能复杂，从而最大化训练难度"
  - "让生成样本处在目标模型可学习但尚未掌握的难度区间"
  - "完全替代规则校验层，避免写 schema 检查规则"
  - "减少 API 池数量，防止工具覆盖过大"
answer: 1
explain: "ToolACE 借鉴最近发展区思想：太简单的样本贡献小，太难的样本学不会，因此用 loss 动态调节 query 和工具调用复杂度。"
```
