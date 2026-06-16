### OSWorld: 操作系统世界 (OSWorld)
```yaml
id: osworld
name: OSWorld
full_name: 操作系统世界 (OSWorld)
year: "2025"
org: University of Hong Kong
paper_url: https://arxiv.org/abs/2404.07972
category: frontier_2026
parent: webarena
motivation: 操作系统任务评测超越人类基线
```

#### 📝 一句话总结
OSWorld 将智能体评测从网页扩展到真实操作系统和桌面应用，提出可初始化、可交互、可执行验证的计算机使用基准，用 369 个真实任务衡量多模态 Agent 是否能完成开放式电脑操作。

#### 🎯 核心要点
- 使用真实虚拟机环境评测 Agent，支持 Ubuntu、Windows、macOS 思路，主要基准覆盖真实桌面应用、网页应用、文件系统和跨应用工作流。
- 任务以自然语言指令给出，并配套初始状态配置、文件准备、窗口/应用启动、后处理和执行式评估脚本。
- 观察空间包含截图、accessibility tree 或二者组合；动作空间落到鼠标、键盘、快捷键、文本输入和命令式 GUI 操作。
- 数据集包含 369 个 Ubuntu 任务、302 个初始状态、134 个执行式评估函数，并额外提供 Windows 分析任务。
- 评价以最终环境状态和产物为准，而不是比较演示轨迹；可检查文件、应用状态、窗口内容、系统信息或云端/本地参考答案。
- 论文报告人类成功率 72.36%，最佳模型 12.24%，主要瓶颈是 GUI grounding、操作知识、长程规划和错误恢复；这与 YAML 中的 motivation 原文不同，正文按论文结果解释。

#### 🔬 深入细节

![OSWorld 任务与环境框架图](https://os-world.github.io/static/images/task_demonstration.png)
*图：OSWorld 用任务指令、初始状态配置、真实虚拟机、截图/a11y 观察、鼠标键盘动作和执行式评估构成完整电脑使用闭环。*

![OSWorld 环境基础设施](https://os-world.github.io/static/images/env.png)
*图：OSWorld 环境通过配置文件管理任务初始化、Agent 交互、后处理、文件/信息获取和评价函数执行。*

```python
# OSWorld 评测闭环伪代码
for example in osworld_examples:
    vm = DesktopEnv(provider="vmware_or_cloud")
    vm.reset_to_snapshot(example.base_snapshot)
    setup_interpreter.run(example.config)          # 下载文件、打开应用、调整窗口等

    history = []
    for t in range(max_steps):
        obs = vm.observe(types=["screenshot", "accessibility_tree"])
        action = agent.predict(example.instruction, obs, history)

        if action in ["DONE", "FAIL"]:
            break

        vm.execute(action)                         # click/type/hotkey/drag/shell 等
        history.append((obs, action))

    evaluator.postprocess(example.evaluator.postconfig)
    result = evaluator.collect(example.evaluator.result)
    expected = evaluator.collect(example.evaluator.expected)
    score = evaluator.func(result, expected, options=example.evaluator.options)
    log(example.id, score)
```

OSWorld 的动机来自一个比 WebArena 更宽的缺口：真实“电脑使用”不只是在浏览器里点链接，还包括打开本地文件、编辑表格、处理图片、写代码、控制播放器、设置系统选项、跨应用复制信息等。许多旧基准要么没有交互环境，要么局限于单个应用或预录轨迹，无法测试 Agent 对任意应用的通用操作能力。OSWorld 因此把任务定义在真实操作系统状态上，而不是静态网页或脚本模拟器上。

可以把 OSWorld 的任务看作 POMDP：完整桌面、文件系统、应用内部状态和后台进程构成隐藏状态 \(s_t\)，Agent 只观察到截图和/或 accessibility tree \(o_t\)，再输出鼠标键盘动作 \(a_t\)。由于动作会真正改变 VM，状态转移由操作系统和应用本身实现，而不是人工写死的模拟转移。

$$
\tau=(o_0,a_0,o_1,a_1,\dots,o_T),\quad s_{t+1}=T_{\text{OS/App}}(s_t,a_t)
$$

$$
R_i=\text{Eval}_i(s_T,\text{files},\text{windows},\text{logs})\in[0,1],\quad
\text{SuccessRate}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}[R_i=1]
$$

OSWorld 最重要的工程设计是“任务配置 + 执行式评估”。每个任务不仅有自然语言指令，还包含初始状态配置，例如下载指定文件到桌面、打开 LibreOffice 表格、启动浏览器并登录、调整窗口大小或执行预处理命令。这样同一个任务可以从一致的中间状态开始，避免让 Agent 把时间浪费在无关登录或环境准备上，同时保证不同模型比较公平。

```yaml
# 简化的 OSWorld 任务结构示意
instruction: "Update the bookkeeping sheet with recent transactions."
config:
  - type: download
    parameters:
      files:
        - path: /home/user/Desktop/bookkeeping.xlsx
          url: https://...
  - type: open
    parameters:
      path: /home/user/Desktop/bookkeeping.xlsx
evaluator:
  postconfig:
    - type: activate_window
      parameters:
        window_name: bookkeeping.xlsx - LibreOffice Calc
  result:
    type: vm_file
    path: /home/user/Desktop/bookkeeping.xlsx
  expected:
    type: cloud_file
    path: https://.../gold.xlsx
  func: compare_table
```

评价函数不是人工看录像，而是直接读取执行结果。例如表格任务可以把 VM 内的 `.xlsx` 文件取出并与 gold 文件比较；代码任务可以运行程序或检查文件；系统任务可以读取配置、日志或窗口状态；跨应用任务则可能同时检查多个产物。这种机制把“是否真的完成”变成可复现的程序判断，也允许部分任务给出小数分，而不是只有二元成功失败。

OSWorld 的观察/动作接口也比网页基准更困难。网页里元素通常有 DOM 或 accessibility 语义，桌面应用则可能存在不可访问控件、画布渲染区域、复杂菜单、弹窗遮挡和多窗口布局变化。截图提供视觉线索但需要模型定位像素，accessibility tree 提供结构但可能缺失或与视觉布局不一致。因此论文中的模型常在 GUI grounding 上失败：知道应该点击哪个按钮，却无法准确把语义目标映射到屏幕坐标或可操作对象。

```python
# Agent 输出动作示例，底层可映射到 pyautogui 或 VM 控制接口
click(x=482, y=315, button="left")
hotkey("ctrl", "s")
typewrite("=SUM(C2:C8)")
drag(start=(710, 420), end=(710, 520))
press("enter")
```

与 WebArena 相比，OSWorld 的创新不是单纯“更多任务”，而是把评测环境抽象成可扩展的真实电脑平台。WebArena 已经证明真实网站和功能正确性很重要；OSWorld 进一步引入桌面应用、OS 文件 I/O、多应用流程和可并行运行的虚拟机基础设施。其任务分布覆盖 Office、Daily、Professional、Workflow、OS 等类别，其中多应用工作流约占 27.4%，正好对应人类电脑使用中最常见、也最难被单应用基准覆盖的场景。

> ⚠️ 注意：OSWorld 论文结果并不表示模型超过人类。论文报告人类约 72.36% 成功率，而最佳模型仅约 12.24%，结论是当前多模态 Agent 与可靠电脑助手仍有巨大差距。

OSWorld 对后续 Agent 研究的价值在于暴露了网页之外的能力瓶颈：长程任务中需要记住目标约束，遇到弹窗或错误状态时需要恢复，跨应用时需要维护中间数据，并且要具备具体软件操作知识。一个能在聊天中解释“如何更新表格”的模型，不一定能在 LibreOffice 中找到单元格、从图片票据读取金额、填入正确列、保存文件并通过评估脚本。OSWorld 正是把这种“知道”和“做到”的差距量化出来。

#### 🧪 练习题
```yaml
question: "OSWorld 相比网页型基准的关键扩展是什么？"
options:
  - "只把网页任务改写成更多选择题"
  - "在真实虚拟机和桌面应用中执行任务，并用脚本检查最终系统状态或文件产物"
  - "取消了截图和 accessibility tree，只评测纯文本回答"
  - "要求模型复现人类演示轨迹中的每一次鼠标移动"
answer: 1
explain: "OSWorld 的核心是可初始化的真实电脑环境和执行式评价，任务完成与否由文件、应用状态、窗口信息等实际结果决定。"
```
