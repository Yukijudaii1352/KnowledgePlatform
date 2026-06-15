### VirtualHome

```yaml
id: virtualhome
name: "VirtualHome"
full_name: "虚拟家庭活动仿真 (VirtualHome)"
year: "2018"
org: "MIT"
paper_url: "https://arxiv.org/abs/1806.07011"
category: "interactive"
parent: "—"
motivation: "将家庭活动表示为可执行程序，训练逻辑理解"
```

#### 📝 一句话总结

VirtualHome 提出了把家庭活动表示为可执行程序的仿真框架，通过众包自然语言任务、程序化步骤和 Unity 家庭环境执行，解决复杂日常活动缺少明确可执行语义表示的问题。

#### 🎯 核心要点

- **活动即程序**：把 “make coffee”“watch TV” 等家庭任务转写为动作和对象参数组成的程序序列
- **众包知识库**：先收集自然语言活动描述，再用类似 Scratch 的图形界面让标注者补全可执行步骤
- **Unity3D 执行环境**：实现常见原子动作和交互，如 walk、grab、put、open、switch on/off、sit、stand up
- **程序到视频数据集**：用程序驱动虚拟人执行任务，并生成 RGB、深度、光流、姿态、分割和动作时间戳等监督信号
- **从语言/视频生成程序**：论文训练模型从自然语言描述或视频片段预测程序步骤
- **可执行性评估**：除 LCS 类似的程序匹配指标外，还关注生成程序是否能在模拟器中真正执行

#### 🔬 深入细节

![VirtualHome 总体流程](https://ar5iv.labs.arxiv.org/html/1806.07011/assets/x1.png)
*图：VirtualHome Figure 1。系统先众包家庭任务与程序，再在 VirtualHome/VirtualHouse 中执行程序，并训练从文本或视频生成程序的模型。*

```python
# VirtualHome 程序执行伪代码
description = "Get an empty glass. Take milk from refrigerator and pour it."
program = program_generator(description)

# 程序由动作和对象参数组成
# [WALK] <fridge> (1)
# [OPEN] <fridge> (1)
# [GRAB] <milk> (2)
# [POUR] <milk> (2) <glass> (3)

env = VirtualHome(scene="kitchen")
for step in program:
    action, objects = parse_step(step)
    if env.preconditions_satisfied(action, objects):
        env.execute(action, objects)
        record_video_frame_and_ground_truth()
    else:
        mark_program_not_executable()
        break
```

**动机与背景：自然语言活动描述不等于机器人可执行计划**

人类说“去看电视”时，可能省略拿遥控器、走到沙发、坐下、打开电视等常识步骤。机器人或虚拟智能体却需要完整、明确、可执行的动作序列。VirtualHome 的核心问题是：如何把日常家庭活动从模糊自然语言变成结构化程序，并在三维环境中执行和验证？

**核心机制：程序表示**

论文把每个时间步写成动作和对象参数的组合：

$$
\mathrm{step}_t =
[\mathrm{action}_t]\;
\langle \mathrm{object}_{t,1}\rangle(id_{t,1})\;...\;
\langle \mathrm{object}_{t,n}\rangle(id_{t,n})
$$

例如 `[GRAB] <remote_control> (1)` 或 `[PUTBACK] <milk> (2) <fridge> (1)`。这种表示比自然语言更严格：动作来自有限动作集合，对象绑定到场景中的实例 ID，执行前还要满足前置条件，例如物体可达、容器已打开、手上有可放置物等。

**数据收集：先语言，后程序**

VirtualHome 先让众包工作者写家庭活动描述，再让另一批标注者用图形化编程界面把描述翻译成程序。论文强调标注者需要补全“没有明说但执行所需”的步骤。这一点非常重要：数据集不只是把句子切分成动作，而是在收集家庭活动的可执行常识。

**训练/推理流程：文本/视频到程序**

从文本生成程序时，模型用 RNN 编码语言描述，再逐步预测程序 token。论文中的 reward/评分结合了最长公共子序列相似度和程序本身的合理性，可概括为：

$$
r(w^s, g) = r_{\mathrm{LCS}}(w^s, g) + 0.1 \cdot r_{\mathrm{sim}}(w^s)
$$

其中 \(w^s\) 是生成程序，\(g\) 是目标程序，\(r_{\mathrm{LCS}}\) 衡量步骤顺序相似，\(r_{\mathrm{sim}}\) 鼓励程序在模拟器中可执行。从视频生成程序时，论文把视频切成短片段，预测每段对应的动作-对象-对象指令，再由序列模型组合成完整程序。

**与传统活动识别的区别**

传统视频活动识别通常输出一个标签，如 “making coffee”。VirtualHome 则要求输出可执行过程：先走到哪里，打开什么，拿起什么，放到哪里。这使它更接近机器人任务规划和具身语言理解。它的局限也来自这里：可执行性依赖模拟器中已实现的动作和对象，真实家庭中丰富的动作细节会被抽象化。

> 💡 关键：VirtualHome 的核心不是“生成更逼真的家庭视频”，而是把家庭活动变成可执行、可验证、可学习的程序语义。

#### 🧪 练习题

```yaml
question: "VirtualHome 中“活动即程序”的主要优势是什么？"
options:
  - "把复杂家庭任务表示为明确的动作-对象序列，可在模拟器中执行和验证"
  - "只保留活动类别标签，删除步骤信息"
  - "避免使用任何三维环境"
  - "让模型只能从静态图片学习"
answer: 0
explain: "VirtualHome 的程序表示包含动作、对象和顺序，能驱动虚拟 agent 执行任务，并为语言/视频到计划提供监督。"
```
