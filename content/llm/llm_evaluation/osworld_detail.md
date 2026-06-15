### OSWorld：真实操作系统中的多模态 Agent 评测

```yaml
id: osworld
name: OSWorld
full_name: 操作系统世界 (OSWorld)
year: '2025'
org: University of Hong Kong
paper_url: https://arxiv.org/abs/2404.07972
category: frontier_2026
parent: webarena
motivation: 操作系统任务评测超越人类基线
```

#### 📝 一句话总结

OSWorld 提出了一个可扩展的真实电脑环境，用虚拟机、桌面应用、网页应用、文件系统和执行式验证脚本评测多模态 Agent 完成开放式操作系统任务的能力。

#### 🎯 核心要点

- 面向真实电脑操作，而不是单一网页或移动应用；支持 Ubuntu，并在论文/项目中讨论 Windows、macOS 扩展
- 每个任务由自然语言指令、初始状态配置、环境设置脚本、Agent 交互、后处理和执行式评测函数组成
- 基准包含 369 个 Ubuntu 任务，覆盖真实 web/desktop apps、OS 文件 I/O、跨应用 workflow，并附加 43 个 Windows 分析任务
- 任务统计包括 101 个多应用 workflow、268 个单应用任务、302 个初始状态和 134 个执行式评测脚本
- 观察可包含截图和 accessibility tree，动作对应鼠标、键盘、文本输入、快捷键等真实桌面操作
- 环境以虚拟机为核心，可重置、可并行、可 headless 运行，支持从中间状态启动复杂任务
- 评测不依赖人工判分，而是通过文件内容、应用状态、数据库/页面状态等执行式脚本检查最终结果
- 原论文显示人类完成率 72.36%，当时最佳模型仅 12.24%，主要瓶颈是 GUI grounding 和操作知识

#### 🔬 深入细节

![OSWorld 任务与环境总览](https://os-world.github.io/static/images/task_demonstration.png)
*图：OSWorld 官方项目页展示的任务与评测闭环。Agent 接收截图或 accessibility tree，输出鼠标/键盘动作，在虚拟机中的真实应用上执行，最终由执行式评测脚本判定。*

![OSWorld 环境基础设施](https://os-world.github.io/static/images/env.png)
*图：OSWorld 的配置文件驱动任务初始化、Agent 交互、后处理、信息获取和最终评测。*

```python
# OSWorld 评测流程伪代码
def evaluate_osworld(agent, task_config, vm_pool, max_steps=100):
    vm = vm_pool.acquire(task_config.os_image)
    vm.restore_snapshot(task_config.base_snapshot)

    run_setup(vm, task_config.initial_state_setup)
    history = []

    for step in range(max_steps):
        observation = vm.observe(types=["screenshot", "accessibility_tree"])
        action = agent.act(task_config.instruction, observation, history)

        if action.name == "done":
            break

        vm.execute_mouse_keyboard(action)
        history.append((observation, action))

    run_postprocess(vm, task_config.postprocess)
    evidence = task_config.retrieve_state(vm)
    score = task_config.evaluator(evidence)

    vm.reset_or_dispose()
    return score
```

OSWorld 的背景是：WebArena 已经把 Agent 放进真实网页环境，但大量“电脑助手”任务发生在浏览器之外，例如处理电子表格、修改本地文件、操作 IDE、查看图片、运行终端命令、跨多个桌面应用搬运信息。此前 GUI/Agent 基准常常局限于单应用、静态截图、录制轨迹或不可控线上环境，难以评估开放式电脑任务。因此 OSWorld 把“可控可复现的整台电脑”作为环境单位。

它的核心抽象是用配置文件描述一个任务生命周期：先把虚拟机恢复到指定快照，再执行初始化脚本创建文件、打开应用、登录账户或布置任务材料；Agent 在真实桌面中循环观察和操作；结束后运行后处理与状态提取；最后执行评测脚本判断任务是否完成。这样，每个样例不仅有题目文本，还有可重放的初始状态和可自动验证的成功条件。

从交互机制看，OSWorld 要求 Agent 解决两个比网页更难的问题。第一是 GUI grounding：模型需要把自然语言目标映射到屏幕坐标、按钮、菜单项、窗口和文件路径。第二是 operational knowledge：模型必须知道真实软件怎么用，例如 LibreOffice 如何筛选表格、VS Code 如何运行项目、文件管理器如何移动目录、浏览器和桌面应用之间如何切换。

评测设计延续了 WebArena 的“功能正确性”思想，但验证对象更广。一个任务可能检查电子表格的单元格、生成文件的内容、代码运行结果、应用设置、浏览器页面状态或本地文件系统结构。执行式脚本使评测可以接受多种操作路径：只要最后工作簿、文件或应用状态满足要求，就算成功，而不要求 Agent 逐步复现人类操作。

论文的结果说明真实 OS 任务比单轮问答或静态 GUI grounding 难得多。即使是具备视觉输入的 LLM/VLM Agent，也容易在窗口切换、菜单层级、拖拽、滚动、隐含软件知识和错误恢复上失败。OSWorld 因而更像一个面向“通用电脑使用能力”的压力测试，而不只是网页导航基准的扩展版。

> ⚠️ 注意：OSWorld 项目页在 2025-07-28 宣布了 OSWorld-Verified 升级和新 leaderboard；本文档的元信息按 manifest 保持不变，方法解读聚焦原始 OSWorld 论文和项目公开说明。

#### 🧪 练习题

```yaml
question: "OSWorld 中每个任务为什么需要初始状态配置和执行式评测脚本？"
options:
  - "为了让 Agent 可以跳过真实桌面交互"
  - "为了把开放式电脑任务变成可复现、可自动判分的环境实例"
  - "为了只测试模型的文本问答能力"
  - "为了避免使用虚拟机"
answer: 1
explain: "初始状态配置保证每次评测从同一电脑状态开始；执行式脚本检查最终文件、应用或系统状态，使复杂桌面任务可以自动、可复现地评分。"
```
