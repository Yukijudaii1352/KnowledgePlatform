### ART - 自动推理与工具使用 (Automatic Reasoning and Tool-use)

```yaml
id: art
name: ART
full_name: 自动推理与工具使用 (Automatic Reasoning and Tool-use)
year: 2023
org: 华盛顿大学/AI2
paper_url: https://arxiv.org/abs/2303.09014
category: tool_use
parent: toolformer
motivation: 自动选择多步推理示例与工具调用
```

#### 📝 一句话总结

ART 提出一种无需微调的自动多步推理与工具使用框架：给定新任务，它从任务库检索相似的推理程序示例，引导冻结 LLM 生成可解析的步骤，并在遇到工具调用时暂停生成、执行工具、再继续推理。它解决了 CoT 和早期工具使用方法依赖人工任务级 prompt、工具脚本或模型微调的问题。

#### 🎯 核心要点

- 使用冻结 InstructGPT 作为主推理模型，不训练模型参数，靠任务库中的跨任务示例迁移分解模式和工具调用模式。
- 构建任务库：从 BigBench 选取 15 个种子任务，覆盖 Arithmetic、Code、Search、Free-form reasoning、String Operations 五类技能，每个任务写少量程序式分解示例。
- 提出 PeG 风格的结构化程序格式：`Qi: [tool] query`、`#i: answer`、`Qj: [EOQ]`、`Ans:`，让 LLM 输出既像 CoT 又能被解析器拦截执行。
- 引入工具库：包括 SerpAPI 搜索、Codex 生成 Python 代码、Python 环境执行代码；工具输出会被插回当前程序上下文。
- 提供两种任务检索策略：有少量标注样本时按五个技能簇做验证选择；无分解监督时用 LLM 判断任务对相似度并排序。
- 支持人类反馈：用户可直接编辑错误程序、添加分解示例或实现新工具，而不需要重新训练 LLM。
- 在 BigBench 未见任务上平均超过 few-shot 6.9 个百分点、超过 AutoCoT 24.6 个百分点；在 MMLU 子集上分别超过 few-shot 14.6 个百分点、超过 AutoCoT 23.7 个百分点。
- 工具调用贡献显著：测试任务中工具使用版 ART 比无工具版平均高 16.7 个百分点，算术类任务尤其受益于代码执行的确定性计算。

#### 🔬 深入细节

![ART 自动推理与工具使用框架图](https://www.promptingguide.ai/_next/static/media/ART.3b30f615.png)
*图：ART 从任务库选择相似程序示例，让冻结 LLM 写出新任务的推理程序，并在搜索、代码生成、代码执行等工具调用处暂停生成。图源为 Prompt Engineering Guide 对论文 Fig.1 的公开复刻，原图来自 ART 论文。*

```python
def solve_with_art(task_description, task_input, task_library, tool_library, llm):
    # 1. 从任务库检索 N=3 个相似任务，每个任务取 2 个程序示例
    demos = retrieve_related_programs(
        task_description=task_description,
        task_library=task_library,
        num_tasks=3,
        demos_per_task=2,
    )
    prompt = build_prompt(demos, task_description, task_input)
    program = ""

    # 2. 让冻结 LLM 逐步生成 PeG 风格程序
    while not contains_eoq(program):
        partial = llm.generate_until_next_subtask(prompt + program)
        program += partial

        step = parse_latest_query(program)  # 例如 Q2: [generate python code] ...
        if step.tool_name in tool_library:
            # 3. 命中工具名时暂停 LLM，执行工具并写回 #i
            tool_output = tool_library[step.tool_name](step.argument, program)
            program += format_tool_answer(step.index, tool_output)
        else:
            # 4. 非工具子步骤由 LLM 继续补全
            program += llm.generate_step_answer(prompt + program)

    return parse_final_answer(program)  # Ans: ...
```

ART 的核心动机是把“会推理”和“会调用工具”从手工 prompt 工程里抽出来。传统 CoT prompt 往往需要人为给目标任务写推理示例；ReAct、Self-Ask、PAL、PoT 等工具增强方法虽然能调用搜索或代码，但常要求开发者针对任务写固定交互脚本；Toolformer 这类方法还需要用工具调用数据微调模型。ART 的选择更轻量：冻结 LLM，只维护一个任务库和一个工具库，让新任务通过检索到的相似程序示例学会如何分解、何时调用工具。

任务库不是普通的 few-shot 输入输出对，而是“程序示例”。每个程序由输入节点、若干 `(query, answer)` 子步骤节点和最终答案节点组成，例如 `Q1: [search] ...` 后跟 `#1: ...`，最后用 `[EOQ]` 结束。这种格式的价值有两层：一是给模型强约束的推理骨架，减少自由文本 CoT 的漂移；二是让运行时可以可靠解析工具符号，一旦生成 `[search]`、`[generate python code]` 或 `[execute code]`，系统就知道应该暂停 LLM 并执行外部模块。

工具调用采用“暂停-执行-注入-恢复”的闭环。搜索工具把 LLM 生成的 query 送入 SerpAPI，并优先抽取 answer box 或前两个结果片段；代码生成工具把 LLM 的自然语言指令作为 Python 注释交给 Codex；代码执行工具把上一步得到的代码片段放进 Python 环境执行，并把变量值或运行结果写回程序。这样，LLM 负责拆题和组织中间变量，外部工具负责知识检索或精确计算，减少纯语言模型在算术、符号操作和事实查询上的错误。

检索策略决定了 ART 如何把“旧任务的程序”迁移到“新任务”。如果目标任务有大约 50 个输入输出标注，ART 会遍历五个技能簇，在 held-out 样本上选表现最好的簇来构建 prompt；如果没有这样的验证集，则用 LLM 对“目标任务-库中任务”做 Similar / Not similar 判断，并按 `log P(Similar) - log P(Not similar)` 排序。论文默认 prompt 取 3 个种子任务、每个任务 2 个程序示例，形成一个多任务、程序式 in-context prompt。

人类反馈在 ART 中是符号级、即时生效的。用户可以直接把错误程序中的子步骤改掉、补上缺失步骤，或实现一个新工具并在任务库里演示它的用法；下一次检索到这些程序时，模型就会看到更好的分解范式。论文展示了在物理题中补充单位处理、在 word unscramble 中加入 `lookup` 工具等案例。这与 RLHF 不同：ART 不更新模型参数，反馈的作用面主要来自任务库和工具库的可复用性，但成本低、可解释、调试路径短。

从结果看，ART 的主要收益并不只来自“多写几步”。在任务库内部，即使关掉工具，结构化程序格式也比 AutoCoT 平均高约 8 个百分点；打开工具后，库内任务平均比 AutoCoT 高 17.17 个百分点。对未见 BigBench 任务，工具被调用约 89% 的实例，并贡献了相当比例的提升；算术类任务提升最大，因为把问题转成代码执行可以避免 LLM 手算出错。局限也很明确：代码生成一旦出错会级联影响后续步骤，搜索片段仍需 LLM 抽取和推理，任务库覆盖不足时检索到的程序示例会变弱。

> 💡 关键：ART 把 prompt 从“为每个任务手写推理链”升级为“维护可检索、可执行、可编辑的程序库”，因此它更像一种轻量级的工具增强推理运行时，而不是单纯的 CoT 模板。

#### 🧪 练习题

```yaml
question: "ART 使用 PeG 风格程序格式的最核心目的是什么？"
options:
  - "把冻结 LLM 微调成专门的工具调用模型"
  - "让推理步骤可解析，从而在工具调用处暂停生成并注入外部结果"
  - "减少任务库中示例的数量到零"
  - "保证搜索工具返回的片段一定是正确答案"
answer: 1
explain: "PeG 格式把子任务、工具名、参数和输出写成可解析节点，系统才能可靠拦截 `[search]` 等符号并执行工具。ART 不微调 LLM，也不能保证搜索结果天然正确。"
```
