### AHE: 自动演化编码 Harness (Agentic Harness Engineering)

```yaml
id: ahe
name: AHE
full_name: 自动演化编码 Harness (Agentic Harness Engineering)
year: '2026.04'
org: 复旦/北大/Qiji Zhifeng
paper_url: https://arxiv.org/abs/2604.25850
category: optimization
parent: meta_harness
motivation: 用可观测闭环自动进化编码harness
```

#### 📝 一句话总结
AHE 提出了一种智能体驱动的启发式进化框架，通过**三支柱闭环**（组件空间、Rollout 经验、编辑决策）让三个角色智能体（Evolve / Explore / Exploit）自动迭代改进 LLM Agent 的 7 类启发式组件，在 Terminal-Bench 2 上将纯 Bash 种子从 69.7% 提升至 77.0%，无需人工干预。

#### 🎯 核心要点
- 首次将 LLM Agent 的启发式组件调优形式化为自动化闭环进化问题，替代手工试错
- 三支柱闭环架构：**Components**（7 类可编辑启发式）→ **Rollout Experience**（执行轨迹可观测）→ **Edit Decisions**（结构化编辑决策）
- 三个角色 Agent 协同：**Evolve**（诊断建议编辑）→ **Exploit**（验证编辑是否修复目标任务）→ **Explore**（检验编辑是否破坏其他任务）
- 覆盖 7 类启发式组件类型：system prompt、bash tool、python tool、memory、sandbox policy、stop condition、perplexity filter
- 10 轮迭代从空组件种子起步，在 89 个 Terminal-Bench 2 任务上取得 77.0% 的 Pass@1
- 跨模型迁移能力：GPT-5.4 进化的 workspace 迁移至 GPT-5.1 达 74.2%，迁移至 Sonnet 4.5 达 73.4%
- 自预测校准：Evolve 模型在"修复预测"任务上精度 ~0.60、回归预测精度 ~0.92

#### 🔬 深入细节
![AHE 性能总览图](https://ar5iv.org/html/2604.25850/assets/x1.png)
*图 1：AHE 将纯 Bash 种子进化为超越所有人工设计和自进化基线，三个角色 Agent 共享一个基础模型（GPT-5.4 high）*

![AHE 三支柱闭环架构](https://ar5iv.org/html/2604.25850/assets/x2.png)
*图 2：AHE 流水线将三个可观测表面连接为一个闭环——组件、Rollout 经验、编辑决策各自呈现为结构化文本表面，驱动迭代进化*

##### 动机与背景

传统 LLM Agent 的性能高度依赖启发式组件（如 system prompt、工具定义、sandbox 策略等）的质量，但这些组件的设计完全依赖人工经验和反复试错。随着 Agent 复杂度增加，组件空间呈组合爆炸，手工调优成为严重瓶颈。AHE 的核心洞察是：**启发式组件的设计空间虽然庞大，但其质量可以通过执行反馈（Rollout）被自动评估，而编辑决策可以被结构化表达**——这三个"可观测表面"构成了自动化进化的基础。

##### 核心机制：三支柱闭环

AHE 将 Agent 进化形式化为在三个结构化文本表面上的闭环迭代：

1. **组件表面（Component Surface）**：Agent 的完整配置，包含 7 类可编辑启发式组件。每类组件由结构化 YAML/文本块表示，Evolve 智能体可以对任意组件子集进行增删改操作。

2. **Rollout 经验表面（Rollout Experience Surface）**：每次任务执行后产生的完整轨迹——包括 Agent 的推理链（chain-of-thought）、工具调用序列、工具输出、最终结果（成功/失败/错误类型）。Explore 智能体通过分析失败 Rollout 来发现回归问题。

3. **编辑决策表面（Edit Decision Surface）**：Evolve 智能体观察 Rollout 经验后生成的结构化编辑提案。每个编辑包含：目标组件路径、操作类型（add/modify/delete）、旧内容片段、新内容片段、编辑理由。这一结构化设计使编辑可追溯、可回滚。

##### 三个角色智能体

- **Evolve（进化者）**：核心决策者。接收多轮 Rollout 经验作为输入，诊断失败原因，生成结构化编辑提案。Evolve 需要同时考虑"修复当前问题"和"避免引入回归"之间的平衡。

- **Exploit（利用者）**：验证编辑是否有效修复了目标失败案例。在应用编辑前后的 Agent 配置上分别运行失败任务，对比结果。如果修复成功，编辑进入候选池。

- **Explore（探索者）**：检验编辑是否引入回归。在全部 89 个任务上运行应用编辑后的 Agent，检测是否有原本成功的任务变失败。这一角色解决了进化中的"灾难性遗忘"问题——修复一个任务不应破坏其他任务。

三者共享同一个基础模型（GPT-5.4 high），通过不同的 system prompt 区分角色。这种设计简洁而有效：单个强大模型在不同上下文中扮演不同角色，无需训练多个专用模型。

##### 七类可编辑启发式组件

AHE 的组件空间覆盖了 LLM Agent 的七个关键维度：

| 组件类型 | 说明 | 示例 |
|---------|------|------|
| system prompt | Agent 顶层指令 | 角色定义、约束条件、输出格式要求 |
| bash tool | Shell 命令工具定义 | 可用命令列表、参数规范、安全限制 |
| python tool | Python 执行工具定义 | 可用库列表、执行超时、内存限制 |
| memory | 记忆/上下文管理策略 | 滑动窗口大小、摘要触发条件、关键信息提取规则 |
| sandbox policy | 沙箱安全策略 | 网络访问权限、文件系统限制、进程隔离规则 |
| stop condition | 停止条件 | 最大步数、输出验证规则、循环检测阈值 |
| perplexity filter | 困惑度过滤器 | 低质量输出的检测与截断阈值 |

所有组件初始化为空（bash-only 种子），AHE 在 10 轮迭代中自主发现并添加有效组件。

##### 训练/进化流程

每轮迭代包含以下步骤：

1. **Rollout 阶段**：在当前 Agent 配置下，对所有 89 个 Terminal-Bench 2 任务各运行 k 次（k=4），收集成功/失败信息及完整轨迹。

2. **Evolve 阶段**：将失败案例的 Rollout 经验（最多 3 个代表性案例）提交给 Evolve 智能体，生成编辑提案。Evolve 同时进行自预测——对每项编辑预测其修复效果和可能的回归影响。

3. **Exploit 阶段**：对每个编辑提案，在目标失败任务上重新运行（应用编辑后配置），验证修复效果。

4. **Explore 阶段**：将通过 Exploit 验证的编辑应用到 Agent 配置，在全部任务上运行，检测回归。如果净收益为正（修复数 > 新引入失败数），接受编辑；否则回滚。

5. **更新组件表面**：将接受的编辑合并到组件配置中，进入下一轮迭代。

##### 与传统方法的区别

- **vs 手工调优**：AHE 消除人工试错，在 10 轮迭代内发现人类难以搜到的组件组合。实验显示所有手工设计的基线 Agent 均被超越。

- **vs 自进化基线**：AHE 的三支柱闭环设计（特别是 Explore 角色的回归检测）使其进化稳定性远超简单的"用 LLM 改 prompt"方法。自我改进基线在 Terminal-Bench 2 上的改进幅度（~2-3%）远低于 AHE（~7.3%）。

- **vs Learned Optimizer**：AHE 无需训练元学习器或优化器网络，完全通过 LLM 的上下文推理能力实现进化，避免了大量训练数据和计算开销。

##### 关键实验结果

- **主结果**：10 轮进化，Pass@1 从 69.7%（bash-only seed）提升至 77.0%（+7.3 个百分点），超越所有基线。
- **跨模型迁移**：GPT-5.4 进化的 workspace 直接迁移至 GPT-5.1（74.2%）和 Sonnet 4.5（73.4%），证明进化的组件具有模型通用性，而非过拟合到特定模型。
- **自预测能力**：Evolve 模型对修复预测的精度约 0.60（较保守），对回归预测的精度约 0.92（高度准确），表明模型能较准确地预判编辑是否会引入副作用。

![跨模型迁移结果](https://ar5iv.org/html/2604.25850/assets/x3.png)
*图 3：跨模型迁移——AHE workspace 在 GPT-5.4 上进化后，在其他基础模型上重新评估的结果*

![自预测精度](https://ar5iv.org/html/2604.25850/assets/x4.png)
*图 4：Evolve 模型在 9 轮评估中的自预测精度和召回率变化趋势*

##### Ablation 分析

- **去除 Explore**：回归率显著上升，净提升大幅缩水，验证了 Explore 在防止灾难性遗忘中的关键作用。
- **去除 Exploit**：编辑质量下降，许多"看起来合理"的编辑在实际执行中无效，Exploit 的过滤作用不可或缺。
- **减少 Rollout 次数**：k=1 时进化几乎停滞，k=4 显著优于 k=2，说明充分的执行反馈对诊断和修复至关重要。
- **组件类型消融**：7 类组件各有贡献，其中 system prompt 和 sandbox policy 的贡献最大，但单独进化任何一类都不及全组件联合进化。

##### 伪代码：AHE 核心循环

```python
# AHE 核心进化循环
workspace = initialize_empty_components()  # 空组件种子
for round in range(1, R+1):  # R=10
    # 1. Rollout: 在所有任务上执行
    rollouts = run_all_tasks(workspace, tasks, k=4)
    
    # 2. Evolve: 诊断失败并生成编辑
    failures = [r for r in rollouts if not r.success]
    edits = evolve_agent.diagnose_and_propose(failures[:3])
    
    # 3. Exploit: 验证编辑修复效果
    for edit in edits:
        if exploit_agent.verify_fix(workspace, edit, edit.target_task):
            validated_edits.append(edit)
    
    # 4. Explore: 检测回归
    new_workspace = apply_edits(workspace, validated_edits)
    new_rollouts = run_all_tasks(new_workspace, tasks, k=1)
    regressions = detect_regressions(rollouts, new_rollouts)
    
    # 5. 条件接受
    if net_gain(validated_edits, regressions) > 0:
        workspace = new_workspace  # 接受进化
    else:
        continue  # 回滚，保持原配置
```

> 💡 **关键设计**：三支柱闭环的核心优势在于"可观测性"——组件的每次变更、每次执行的轨迹、每次编辑的决策都有结构化记录，使进化过程完全可审计、可回滚、可解释。

> ⚠️ **注意**：AHE 的有效性依赖于基础模型的多轮推理能力。在当前实验中使用 GPT-5.4 high，较弱模型可能在诊断失败和预测回归时表现不佳，导致进化效率降低。

#### 🧪 练习题
```yaml
question: "AHE 中 Explore 角色的主要作用是什么？"
options:
  - "生成启发式组件的编辑提案"
  - "验证编辑是否修复了目标任务"
  - "检测编辑是否在其他任务上引入回归"
  - "收集所有任务的 Rollout 经验"
answer: 2
explain: "Explore 在全部任务上运行应用编辑后的 Agent，检测原本成功的任务是否变失败，防止进化中的灾难性遗忘。"
```
