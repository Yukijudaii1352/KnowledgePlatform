### Long-Running Harness: 长时运行智能体 harness (Effective Harnesses for Long-Running Agents)

```yaml
id: claude_longrun
name: Long-Running Harness
full_name: 长时运行智能体 harness (Effective Harnesses for Long-Running Agents)
year: '2025.11'
org: Anthropic
paper_url: https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents
category: runtime
parent: —
motivation: 让代理跨多个上下文窗口持续推进
```

#### 📝 一句话总结
Anthropic 提出了一种双阶段的长时运行 Agent harness 设计——Initializer Agent 负责搭建结构化环境（feature list、进度日志、初始化脚本），Coding Agent 每次会话读取状态、选取单个 feature 增量实现、结束时提交干净 commit——解决了 agent 跨多个上下文窗口时出现的一次性冲关和过早宣布完成两大失败模式。

#### 🎯 核心要点
- **双角色分工**：Initializer Agent 仅在首次运行时设置环境基座，Coding Agent 在每次会话中增量推进
- **feature_list.json**：结构化的端到端 feature 描述文件，将高层 prompt 分解为可逐一实现的子任务
- **claude-progress.txt**：持久化进度日志，记录每次会话的完成情况，实现跨窗口交接
- **init.sh**：一键启动开发服务器的脚本，消除每次会话重新摸索运行方式的成本
- **Git 纪律**：每次会话结束时必须提交干净的 commit，确保下一轮从一个可构建、无未追踪 bug 的状态开始
- **自验证机制**：Coding Agent 在标记 feature 为"done"前必须经过自测试，防止过早宣告完成
- **四种失败模式的系统化解法**：一次性实现、环境脏乱、过早完成、启动摸索，均有对应的 Initializer/Coding Agent 行为对策
- **compaction 之外的补充**：指出仅靠上下文压缩不足以解决长程问题，必须辅以结构化交接产物

#### 🔬 深入细节
![Long-Running Harness 示意图](https://www.anthropic.com/_next/image?q=75&url=https%3A%2F%2Fwww-cdn.anthropic.com%2Fimages%2F4zrzovbb%2Fwebsite%2Ff94c2257964fb2d623f1e81f874977ebfc0986bc-1920x1080.gif&w=3840)
*图：Long-Running Harness 的核心框架或系统示意。*

##### 动机与背景

AI Agent 面临的核心矛盾：复杂任务（如构建 claude.ai 克隆体）需要跨越多个上下文窗口才能完成，但每个新的会话窗口天然没有前序记忆。这类似于软件工程中的"轮班制"——如果每个接班的工程师都不了解前序进度，项目将举步维艰。Anthropic 发现，即使使用 Claude Agent SDK 的自带 compaction 机制，前沿模型 Opus 4.5 在多个上下文窗口中仍无法构建出一个生产级 web app，暴露出 compaction 的局限性。

##### 两大失败模式

**模式一：一次性冲关（One-shot attempt）**  
Agent 试图在单个窗口中完成整个项目，导致上下文耗尽时 feature 只实现了一半，且无文档说明。下一轮 agent 面对半成品不得不猜测前序工作，大量时间浪费在修复基础功能上。

**模式二：过早宣布完成（Premature declaration of done）**  
在项目后期，部分 feature 已建成后，某个 agent 实例环顾四周，看到已有进展，便宣告任务完成，不再继续推进剩余需求。

##### 两阶段解决方案

###### Initializer Agent（初始化 Agent）

仅在首次运行时激活，负责将高层需求转化为结构化的可执行环境：

1. **feature_list.json** — 将输入 spec 解析为结构化 JSON，每个条目包含端到端的 feature 描述文本。这相当于将"build a clone of claude.ai"分解为"实现聊天功能""实现暗色主题切换""实现对话历史加载"等可操作子任务。
2. **claude-progress.txt** — 初始化空的进度日志，格式为后续 agent 提供统一的记录模板。
3. **初始化 Git 仓库 + 首次 commit** — 确保环境从零开始被版本化追踪。
4. **init.sh** — 编写一个可直接启动开发服务器并运行基础检查的脚本，这是后续 agent 每次进入新会话时的"一键就绪"入口。

###### Coding Agent（编码 Agent）

每次新会话启动时运行，遵循严格的"读取-选择-实现-提交"循环：

```
每次 Coding Agent 会话的标准流程：
1. pwd（确认工作目录）
2. read claude-progress.txt（了解历史进度）
3. read feature_list.json（查看剩余 feature）
4. git log --oneline -20（检查最近变更）
5. bash init.sh（启动开发服务器）
6. 手动测试基础功能验证服务器正常
7. 从 feature_list.json 中选取一个未完成的 feature
8. 实现该 feature
9. 自验证通过后，git commit + 更新 claude-progress.txt
10. 退出，环境保持在可构建的干净状态
```

关键的设计理念是"**离开时保持干净（leave a clean state）**"——每次会话结束时，代码应处于适合合并到 main 分支的状态：无重大 bug，代码整洁且有文档，开发者可直接开始新 feature 而不需先清理无关混乱。

##### 四种失败模式与对策

Anthropic 在文中以表格形式总结了四种常见失败模式及其系统化解决方案：

| 失败模式 | Initializer Agent 对策 | Coding Agent 对策 |
|---------|----------------------|-------------------|
| **过早宣告完成** | 创建 feature_list.json 结构化 feature 清单 | 每次会话开始时读取 feature list，仅选择**一个** feature 开始工作 |
| **环境遗留 bug / 无文档** | 初始化 git repo 和 progress 文件 | 会话开始时读取 progress 和 git log，运行基本测试；结束时 commit + 更新 progress |
| **feature 标记为完成但实际未通过** | 创建 feature_list.json | **自验证所有 feature**，仅在仔细测试后标记为"passing" |
| **每次花时间摸索如何运行 app** | 编写 init.sh 脚本 | 会话开始时运行 init.sh |

##### 与传统方法的区别

对比单纯的 compaction 循环方案，Anthropic 的方案核心差异在于**引入结构化交接产物**作为跨窗口的持久化记忆。compaction 是对上下文窗口的"压缩摘要"，但摘要不可避免地丢失信息，且无法传递"运行状态"（开发服务器是否启动、当前分支状态等）。而 feature list + progress log + git history + init.sh 构成的四件套，本质上是一种**外化的工作记忆**，使得每个新 agent 实例进入窗口时，能像人类工程师一样通过日志和脚本快速"加载上下文"。

##### 未来方向

- **多 Agent 架构**：是否应由专门的测试 Agent、QA Agent、代码清理 Agent 分别负责子任务，而非依赖单一通用编码 Agent？
- **跨领域泛化**：当前方案为全栈 Web 开发优化，如何将 feature list + progress log 模式适配到科研计算、金融建模等长程任务中？

> 💡 关键：该方案的核心洞察是将人类软件工程的最佳实践——**任务分解、进度日志、一脚本启动、干净提交**——结构化地注入 agent harness 中，使 agent 的行为模式从"一次性大瀑布"转为"持续增量交付"。

#### 🧪 练习题
```yaml
question: "Anthropic 长时运行 Agent harness 中，Initializer Agent 的核心职责是什么？"
options:
  - "在每次会话中选取一个 feature 进行增量实现"
  - "负责自验证所有 feature 并标记完成状态"
  - "将高层需求分解为 feature_list.json、建立进度日志、编写 init.sh 等初始化环境"
  - "每次会话结束时压缩上下文并传递给下一个 agent"
answer: 2
explain: "Initializer Agent 仅在首次运行时工作，将 prompt 转化为结构化环境（feature list、progress log、init.sh），为后续 Coding Agent 的持续增量交付提供基座。"
```
