### Harness Engineering: Codex Harness 工程方法论 (Harness Engineering)

```yaml
id: openai_harness
name: Harness Engineering
full_name: Codex Harness 工程方法论 (Harness Engineering)
year: '2026.02'
org: OpenAI
paper_url: https://openai.com/index/harness-engineering/
category: runtime
parent: codex
motivation: 把环境设计与反馈闭环提升为方法论
```

#### 📝 一句话总结
Harness Engineering 提出了 AI 编程模型评估的系统化工程方法论，将评估从静态 Benchmark 范式转向以环境设计、任务支架和反馈闭环为核心的动态交互式评估体系，解决了传统编程 Benchmark 缺乏真实环境交互和迭代反馈的根本缺陷。

#### 🎯 核心要点
- 提出 **Harness（支架/夹具）** 概念：为每个编程任务构建独立、可复现的执行环境（Docker 沙箱），使模型能自主运行、测试和修正代码
- 三层评估架构：**Spec → Harness → Iteration**，将任务规格化、环境执行、迭代修正统一为闭环
- 引入 **Pass@k 指标的工程化扩展**：不只统计最终通过率，还追踪每次迭代的测试结果、错误类型和修复路径，形成多维能力画像
- 反馈闭环设计：将编译错误、运行时异常、测试失败等信号结构化地反馈给模型，模拟真实开发中的 debug 循环
- 与传统 Benchmark（HumanEval、MBPP）的根本对比：从"给题目→收代码→判对错"的静态模式，升级为"给需求→在真实环境中迭代→达到可工作状态"的动态模式
- 环境即接口（Environment as Interface）：通过统一的 harness 协议解耦任务定义与执行环境，支持任意编程语言和工具链的即插即用
- 提出任务难度分级：根据所需迭代轮次、依赖复杂度、环境配置难度将任务分为 L1–L4，指导模型能力评估

#### 🔬 深入细节
![Harness Engineering 示意图](https://images.ctfassets.net/kftzwdyauwt9/1Gu58eNlqDEuITmbqJDmq9/1e2e62f7e15fb16d2da0da5407240564/fig_1__codex_drives_the_app_.png?fm=webp&q=90&w=3840)
*图：Harness Engineering 的核心框架或系统示意。*

##### 核心框架示意

```
┌─────────────────────────────────────────────────────┐
│                    Harness 框架                       │
│  ┌──────────┐    ┌──────────────┐    ┌────────────┐ │
│  │   Spec   │ →  │   Harness    │ →  │  Feedback  │ │
│  │ (任务规格) │    │ (执行环境+工具) │    │  (结果/错误) │ │
│  └──────────┘    └──────────────┘    └────────────┘ │
│       ↑                                    │         │
│       └──────────  Model Iteration ←───────┘         │
│            (模型根据反馈修正代码)                        │
└─────────────────────────────────────────────────────┘
```

*图：Harness Engineering 的核心闭环——模型在 harness 环境中执行代码、获取反馈、迭代修正*

##### 动机与背景

传统编程模型评估（如 HumanEval、MBPP）存在以下根本性局限：

1. **输入/输出匹配模式陷阱**：模型只需生成符合预期输出的代码，不涉及真实执行环境的交互。一个在 HumanEval 上 Pass@1 达到 90% 的模型，在真实项目中可能因无法处理依赖安装、环境配置、运行时错误而完全失效。

2. **缺失迭代能力评估**：真实编程中，开发者的核心技能并非"一次写对"，而是"根据错误信息定位并修复"。传统 Benchmark 只评估一次生成的能力，完全忽略了 debug 闭环。

3. **环境不可复现**：每个评测方的运行环境不同，导致模型能力不可直接对比。同一个模型在 A 的评测中得到 80%，在 B 的环境可能因 Python 版本、依赖库差异降至 50%。

OpenAI Codex 团队在 2026 年初的工程实践中发现，模型在真实软件开发任务中的表现与 Benchmark 分数之间存在显著 gap。这一洞察驱动了 Harness Engineering 方法论的提出——核心思想是：**评估环境本身应成为第一等公民（first-class citizen），而非可忽略的外部因素**。

##### 核心机制：Spec → Harness → Feedback Loop

Harness Engineering 的核心流程可概括为三个阶段：

**Phase 1 — Spec（任务规格化）**

每个任务被定义为一个标准化的 Spec 文件（YAML/JSON），包含：

- `task_description`：用自然语言描述的需求
- `environment`：所需运行时（Python 3.12 / Node.js 22 / Rust 等）、依赖文件列表（`requirements.txt`、`Cargo.toml`）和系统级依赖
- `setup_commands`：环境初始化命令序列（如 `pip install -e .`、`npm install`）
- `test_suite`：一个或多个可执行的测试脚本，用于判定任务是否完成
- `timeout`：单次执行的时间上限
- `max_iterations`：模型被允许的最大修正轮次

> 💡 关键：Spec 文件本身是版本控制、可分享、可复现的最小单元。任何一个任务 Spec 拉取后即可在任一机器上重建相同评估环境。

**Phase 2 — Harness（执行支架）**

Harness 是一个轻量级的编排层（orchestration layer），负责：

1. **环境构建**：根据 Spec 创建隔离的 Docker 容器或 sandbox，安装指定依赖
2. **工具注入**：为模型提供一组可调用的工具（执行 shell 命令、读写文件、查看 diff、运行测试等），模型通过工具调用的方式与环境交互
3. **状态追踪**：记录每一次模型动作（代码修改 / 命令执行 / 测试运行）及其结果，形成完整的交互轨迹

Harness 的设计哲学是"**给模型一个真实的终端，而非一个评测员的打分表**"。其伪代码逻辑如下：

```python
def run_harness(spec, model, max_iterations):
    env = create_environment(spec.environment)
    env.setup(spec.setup_commands)
    
    trajectory = []
    for i in range(max_iterations):
        # 模型观察当前环境状态和任务描述
        observation = {
            "task": spec.task_description,
            "files": env.list_files(),
            "last_output": trajectory[-1].output if trajectory else None,
            "test_results": env.run_tests(spec.test_suite)
        }
        
        # 模型决定下一步动作：修改文件 / 执行命令 / 提交
        action = model.generate(observation)
        
        # 在真实环境中执行动作
        result = env.execute(action)
        trajectory.append({"iteration": i, "action": action, "result": result})
        
        # 检查是否通过全部测试
        if result.all_tests_passed:
            return {"status": "success", "trajectory": trajectory}
    
    return {"status": "failure", "trajectory": trajectory}
```

**Phase 3 — Feedback Loop（反馈闭环）**

反馈闭环是 Harness Engineering 区别于传统评估的最关键创新。它将环境执行产生的结果结构化，分为三个层次反馈给模型：

| 层级 | 反馈类型 | 示例 | 模型应对 |
|------|---------|------|---------|
| L1 | 语法/编译错误 | `SyntaxError: invalid syntax at line 42` | 直接修正语法 |
| L2 | 运行时错误/测试失败 | `AssertionError: expected 42, got 0` | 分析逻辑错误，修正实现 |
| L3 | 环境/依赖问题 | `ModuleNotFoundError: No module named 'torch'` | 修改依赖配置或更换实现方案 |

每一层的反馈都附带**上下文快照**（当前文件清单、最近命令的输出、测试失败的具体 diff），使模型能像人类开发者一样在 IDE 中工作。

##### 与传统方法的根本区别

传统编程 Benchmark 的评估流水线是单向的：

```
题目 → 模型生成代码 → 静态分析/单元测试 → 通过/不通过
```

Harness Engineering 将其转变为双向交互闭环：

```
Spec → [模型 ↔ Harness环境] × N次迭代 → 最终判定
```

具体的差异化体现在：

1. **从"一次生成"到"N 次迭代"**：评估的不再是模型的"一次性正确率"，而是在有限步数内"达成目标的能力"
2. **从"纯文本"到"真实执行"**：模型可以看到代码的真实执行结果，包括 stdout、stderr、文件系统变化
3. **从"封闭题目"到"开放环境"**：Spec 只定义目标和约束，模型可以选择任意实现路径，包括添加新文件、安装新依赖、甚至修改测试（如果 Spec 允许）
4. **全轨迹可审计**：每一次交互都被完整记录，评估者可以不仅是看最终是否通过，还能分析模型的 debug 策略、错误处理模式、迭代效率等细粒度能力指标

##### 任务难度分级 (L1–L4)

Harness Engineering 提出了一套基于经验的任务难度分级系统：

| 等级 | 典型迭代次数 | 特征 | 示例任务 |
|------|------------|------|---------|
| L1 | ≤3 | 单文件、无外部依赖、纯逻辑实现 | 实现一个排序算法 |
| L2 | 4–8 | 多文件、少量标准库依赖 | 构建一个 REST API 端点 |
| L3 | 9–20 | 多模块、需要第三方依赖、涉及环境配置 | 搭建一个带数据库的 Web 服务 |
| L4 | >20 | 全栈项目、复杂依赖链、需要架构设计 | 从零实现一个微服务系统并部署 |

> ⚠️ 注意：L4 任务在实际评估中极少出现（模型通常需要数十轮迭代才能完成），目前主要用于衡量模型的长期自主工作能力（long-horizon autonomy）。

##### 对 AI 编程能力评估的影响

Harness Engineering 的提出标志着 AI 编程评估从"考试模式"向"工作模式"的范式转变。其核心贡献在于：

1. **生态建设**：团队同时开源了一套标准 Harness Spec 集合（涵盖 Python、JS/TS、Rust 等语言的数百个任务）和 Harness Runner 的参考实现，使社区可以在此基础上扩展
2. **评估信度提升**：因为环境完全由 Spec 控制，不同机构、不同时间评测的结果具有真正可比性（消除了"我的环境没装某个库导致失败"的噪声）
3. **能力画像细化**：通过分析 trajectory，可以分别评估模型的代码生成能力、错误诊断能力、自修复能力、工具使用能力等独立维度

#### 🧪 练习题
```yaml
question: "Harness Engineering 相比传统编程 Benchmark（如 HumanEval）最根本的变革是什么？"
options:
  - "使用更难的编程题目"
  - "从静态的一次性代码生成评估，转变为在真实环境中进行多轮交互迭代的闭环评估"
  - "改用 Docker 容器运行评测"
  - "增加了 Pass@k 指标的统计维度"
answer: 1
explain: "Harness Engineering 的核心创新在于将评估从单向的'给题→生成→判分'升级为'在真实环境中反复迭代、根据反馈修正'的闭环，这是与传统 Benchmark 最本质的区别。Docker 只是实现手段之一，Pass@k 扩展是具体指标层面，都不构成范式层面的变革。"
```
