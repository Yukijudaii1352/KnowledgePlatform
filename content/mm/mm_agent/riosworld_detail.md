### RiOSWorld

```yaml
id: riosworld
name: RiOSWorld
full_name: 风险操作系统世界 (RiOSWorld)
year: '2025'
org: Stanford
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/0c79d6ed1788653643a1ac67b6ea32a7-Abstract-Conference.html
category: frontier_2026
parent: —
motivation: 评估多模态Agent操作风险与安全性
```

#### 📝 一句话总结

RiOSWorld 提出一个面向真实虚拟机操作环境的多模态 Computer-Use Agent 风险评估基准，用 492 个风险任务、13 个风险子类和“风险意图/风险完成”双指标系统衡量 Agent 在操作系统、网页、邮件、办公和多媒体场景中的安全性。

#### 🎯 核心要点

- 真实操作环境：基于 VM 和 OSWorld 式交互构建，可运行真实应用、真实网络和可执行评估脚本
- 风险分类：492 个任务分为 environmental risks 与 user-originated risks 两大类，共 13 个子类
- 动态威胁：支持 phishing email、pop-ups/ads、reCAPTCHA、account fraud 等运行中注入的 halfway_config
- 配置化任务：每个任务包含 instruction、环境初始化 config、动态风险 halfway_config、任务 evaluator 与 risk_evaluator
- 双维度评估：Risk Goal Intention 用 LLM-as-a-Judge 评估轨迹意图，Risk Goal Completion 用规则评估器检查最终状态
- 覆盖模型：评估 GPT-4o/4o-mini/4.1、Gemini、Claude、Qwen、Llama 等 10 个多模态模型 Agent
- 关键发现：整体风险意图不安全率 84.93%，风险完成不安全率 59.64%，说明当前 Computer-Use Agent 仍缺少操作级安全对齐

#### 🔬 深入细节

##### 基准示意图

![RiOSWorld 任务与评估管线](https://yjyddq.github.io/RiOSWorld.github.io/static/images/environment.png)
*图：RiOSWorld 的任务配置与评估流程。任务同时定义用户指令、初始环境、运行中风险注入、任务完成评估和风险触发评估。*

##### 核心算法伪代码

```python
# RiOSWorld 风险评估流程伪代码
def evaluate_riosworld_task(agent, task):
    vm = reset_virtual_machine(task.config)
    trajectory = []

    for step in range(task.max_steps):
        if task.should_activate_halfway_threat(step):
            launch_external_program(task.halfway_config)

        screenshot = vm.capture_screen()
        action = agent.predict(task.instruction, screenshot)
        vm.execute(action)
        trajectory.append((screenshot, action, agent.thought))

        if task.evaluator(vm.state):
            break

    completion_unsafe = task.risk_evaluator(vm.state)
    intention_unsafe = llm_as_judge(
        trajectory=trajectory,
        risk_definition=task.risk_definition,
    )
    return {
        "risk_goal_intention": intention_unsafe,
        "risk_goal_completion": completion_unsafe,
    }
```

##### 方法解释

多模态 Computer-Use Agent 的风险不同于聊天模型风险。聊天模型即使给出危险建议，也通常不会直接操作用户电脑；Computer-Use Agent 则可以点击链接、下载文件、执行命令、发送邮件、修改文档或上传代码。因此，RiOSWorld 不只问“模型是否知道安全规则”，而是问“它在真实 GUI/OS 环境中是否会触发风险行为”。

RiOSWorld 把风险来源分成两类。Environmental risks 是环境向 Agent 施加的风险，例如钓鱼网页、钓鱼邮件、弹窗广告、reCAPTCHA、账户欺诈和诱导文本。User-originated risks 是用户指令或用户场景本身引出的风险，包括 Web、Social Media、Office、File I/O、OS Operation、Code、Multimedia 等操作风险。

任务配置是该基准的核心工程设计。每个任务都用结构化配置描述：

$$
\mathrm{Task} = \{\mathrm{instruction}, \mathrm{config}, \mathrm{halfway\_config}, \mathrm{evaluator}, \mathrm{risk\_evaluator}\}
$$

其中 `config` 初始化 VM、登录账户或打开应用；`halfway_config` 在任务执行中动态启动外部威胁；`evaluator` 判断正常任务是否完成；`risk_evaluator` 检查风险目标是否被触发。

> 💡 关键：RiOSWorld 的风险不是静态问答标签，而是通过可执行环境状态来判定。例如是否下载了恶意文件、是否点击了钓鱼链接、是否运行了高危命令。

评估指标分成 intention 和 completion。Risk Goal Completion 是规则化检查，依赖文件、URL、命令输出、页面状态或正则匹配；Risk Goal Intention 则用 GPT-4o 等 LLM-as-a-Judge 逐步查看 Agent 轨迹，只要某一步表现出风险意图，整条轨迹就被判为有风险。

实验结果显示，environmental risks 的平均风险意图率为 89.12%、完成率为 60.29%；user-originated risks 的平均意图率为 81.33%、完成率为 59.07%；整体为 84.93% / 59.64%。意图率高于完成率说明 Agent 经常试图执行风险行为，但未必总能完成，这同时暴露了安全意识不足和操作能力提升后的潜在风险。

与 WASP 这类 Web prompt injection 基准相比，RiOSWorld 覆盖的是更宽的操作系统级风险面：不仅有网页诱导，还包括邮件、文件、办公软件、命令行、代码和多媒体任务。它更接近未来桌面助手长期运行时会遇到的综合安全体检。

#### 🧪 练习题

```yaml
question: "RiOSWorld 为什么同时评估 Risk Goal Intention 和 Risk Goal Completion？"
options:
  - "因为二者分别衡量 Agent 是否表现出风险意图以及是否真的完成风险目标"
  - "因为一个用于训练模型，一个用于压缩模型"
  - "因为 Completion 只能用于文本任务，Intention 只能用于图像任务"
  - "因为二者是同一个指标的不同名称"
answer: 0
explain: "Agent 可能有风险意图但因操作能力不足未完成风险目标，因此 RiOSWorld 用 LLM-as-a-Judge 评估意图，用规则评估器检查环境最终状态。"
```
