### ChatDev：聊天驱动开发 (ChatDev)

```yaml
id: chatdev
name: ChatDev
full_name: 聊天驱动开发 (ChatDev)
year: 2023
org: 清华大学
paper_url: https://arxiv.org/abs/2307.07924
category: multi_agent
parent: camel
motivation: 多Agent模拟软件公司开发流程
```

#### 📝 一句话总结
ChatDev 提出一个由 LLM 扮演软件公司成员的多 Agent 开发框架，用“聊天链”把设计、编码、测试、文档生成拆成可检查的双人协作子任务，从而缓解单次生成完整软件时的代码幻觉与缺少交叉验证问题。

#### 🎯 核心要点
- 构建虚拟软件公司：CEO、CPO、CTO、Programmer、Reviewer、Tester、Art Designer 等角色分别承担需求分析、架构、编码、审查、测试和文档工作。
- 遵循瀑布式四阶段流程：Designing、Coding、Testing、Documenting，每个阶段继续拆成若干 atomic chats。
- 提出 Chat Chain：每个节点是一个明确子任务，由 instructor 与 assistant 两个角色通过多轮对话达成共识并输出结构化决策。
- 使用角色专门化、记忆流、自反思和通信协议，让 Agent 在上下文内持续推进任务并在结束条件未触发时总结结论。
- 在编码和测试阶段提出 Thought Instruction，通过角色翻转先识别未实现方法或错误原因，再把具体修复思路注入给 Programmer。
- 使用版本演化与 Git 风格代码管理，只保留最新代码版本给后续角色，减少长代码上下文造成的冗余与幻觉传播。

#### 🔬 深入细节
![ChatDev 聊天链架构](https://ar5iv.labs.arxiv.org/html/2307.07924/assets/figures/chat_chain.png)
*图：ChatDev 的 Chat Chain 把软件开发过程拆成阶段级与聊天级组件，每个 atomic chat 由两个角色围绕一个明确产物协作完成。*

ChatDev 的问题切入点不是“让一个 LLM 一步写完软件”，而是模拟真实软件公司把问题分解给不同岗位。论文指出，直接让 LLM 生成完整系统容易出现未实现函数、缺失依赖、潜在 bug、需求理解偏移等代码幻觉；更关键的是，单 Agent 缺少人类开发中常见的交叉检查。ChatDev 因此把软件开发过程组织为一个有顺序的通信程序：先由 CEO/CPO/CTO 做需求与技术决策，再由 CTO/Programmer/Designer 生成代码和界面资源，接着由 Reviewer/Tester/Programmer 做静态审查和动态调试，最后生成依赖说明与用户手册。

Chat Chain 是核心抽象。可以把第 \(k\) 个聊天节点写成 \(c_k=(r_k^I,r_k^A,g_k,p_k,\tau_k)\)，其中 \(r_k^I\) 是发起指令的 instructor 角色，\(r_k^A\) 是执行与回应的 assistant 角色，\(g_k\) 是子任务目标，\(p_k\) 是输出协议，\(\tau_k\) 是终止条件。每轮对话维护记忆流：

$$
M_t = \{(I_1,A_1,D_1), (I_2,A_2,D_2), \ldots, (I_t,A_t,D_t)\},
$$

其中 \(I_t\) 是 instructor 消息，\(A_t\) 是 assistant 回复，\(D_t\) 是从对话中抽取出的决策或中间产物。下一轮 instructor 依据 \(M_t\) 继续发出指令，assistant 再结合角色提示和历史消息生成回应。这个机制的直觉是：LLM 的上下文窗口不仅保存聊天文本，还保存“已达成的开发决策”，使后续角色不必重新推断需求。

```python
# ChatDev 核心流程伪代码
software = {}
chat_chain = [
    ("CEO", "CPO", "decide_modality"),
    ("CEO", "CTO", "choose_language"),
    ("CTO", "Programmer", "implement_code"),
    ("Designer", "Programmer", "create_gui_assets"),
    ("Programmer", "Reviewer", "static_review"),
    ("Tester", "Programmer", "dynamic_debug"),
    ("CTO", "Programmer", "write_requirements"),
    ("CEO", "CPO", "write_manual"),
]

for instructor, assistant, task in chat_chain:
    memory = []
    while not protocol_is_satisfied(memory, task):
        instruction = instruct(instructor, task, memory, software)
        reply = respond(assistant, instruction, memory, software)
        decision = extract_decision(reply, task)
        memory.append((instruction, reply, decision))
        if consensus_without_protocol(memory):
            decision = self_reflect(assistant, memory)
            memory.append(("self_reflection", decision, decision))
    software = update_artifacts(software, decision)
```

![ChatDev 思维指令机制](https://ar5iv.labs.arxiv.org/html/2307.07924/assets/figures/naive_instruction.png)
*图：Thought Instruction 用“先询问具体缺口，再切回原角色修复”的方式减少泛泛指令导致的代码幻觉。*

Thought Instruction 是 ChatDev 相比普通角色扮演对话更像工程流程的地方。普通指令如“实现所有未实现方法”过于宽泛，Programmer 可能会补错接口、误改已完成代码，甚至引入不存在的依赖。ChatDev 让角色先翻转：例如 CTO 暂时询问 Programmer “当前哪些方法还未实现”，或 Tester 先要求 Programmer 解释解释器报错；得到更具体的故障定位后，再切回原来的 instructor 角色，把“只实现某几个方法”“根据某条 traceback 修改某个文件”这类精确思路写入指令。形式化地看，它把一次模糊更新 \(\Delta code = f(\text{generic instruction})\) 改写为两步：

$$
z = \text{Diagnose}(M_t, code, feedback), \quad \Delta code = \text{Patch}(z, code),
$$

其中 \(z\) 是由对话显式产生的诊断信息。这样做的价值不在于让 LLM 更强，而是让 LLM 的错误空间被收窄到一个具体的修复目标上。

编码阶段还引入 Code Management 与 Version Evolution。因为代码片段长、历史版本多，直接把所有版本塞进上下文会污染后续判断；ChatDev 只让角色看到最新代码版本，并把每次修改视为版本递增。Reviewer 的静态调试用于发现潜在漏洞，Tester 的动态调试则执行程序并把解释器反馈转化为可操作修改建议。二者结合相当于把软件质量控制拆成两个闭环：

$$
code_{v+1}=\text{Programmer}(code_v, review\_feedback, test\_feedback),
$$

直到通信协议、运行反馈或最大尝试次数满足终止条件。

与 CAMEL 这类固定双 Agent 角色扮演相比，ChatDev 的创新不只是“更多 Agent”，而是把 Agent 对话绑定到软件工程阶段、产物协议和跨阶段依赖上。每个 atomic chat 的输出都会成为后续 chat 的输入，例如需求模态和编程语言会约束编码阶段，测试反馈会约束代码修复，最终代码与依赖会约束文档生成。它的局限也来自这种设计：流程高度依赖预设角色和任务链，适合小型软件自动生成，但对需求频繁变更、大规模代码库理解和长期维护仍需要更强的状态管理与人类干预。

#### 🧪 练习题
```yaml
question: "ChatDev 中 Thought Instruction 的主要作用是什么？"
options:
  - "让所有 Agent 共享同一个系统提示，减少提示词成本"
  - "通过角色翻转先定位具体缺口或错误原因，再生成更精确的修复指令"
  - "把瀑布式流程改成完全并行开发流程"
  - "用奖励模型替代代码执行器来评估程序正确性"
answer: 1
explain: "Thought Instruction 先显式提取未实现方法或报错原因，再把诊断结果写入指令，避免泛泛修复造成新的代码幻觉。"
```
