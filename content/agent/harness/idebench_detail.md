### IDE-Bench: IDE 原生代理基准 (IDE-Bench)

```yaml
id: idebench
name: IDE-Bench
full_name: IDE 原生代理基准 (IDE-Bench)
year: '2026.01'
org: AfterQuery
paper_url: https://arxiv.org/abs/2601.20886
category: evaluation
parent: swe_verified
motivation: 用IDE原生工具链评测协作式编码
```

#### 📝 一句话总结
IDE-Bench 提出了首个在真实Docker化IDE环境中评测AI编程Agent的基准，涵盖8个仓库×10任务=80个多样化编程任务和17种IDE工具，并通过15个前沿模型的6000+次运行揭示了当前模型在长期代码编辑中普遍存在的"提前编辑"（63%）和"反复编辑"（28%）两大失败模式。

#### 🎯 核心要点
- **8个真实仓库**：Game Engine Service (C++)、SmartHub Operations Center (Java/Javalin)、Network Traffic Analyzer (Python)、以及5个未公开的私有仓库（含MERN全栈、系统编程等多技术栈），防止训练数据污染
- **80个多样化任务**：每个仓库10个任务，覆盖算法实现（18%）、Bug修复（35%）、功能开发（32%）、重构（15%）四大类别
- **17种IDE工具的统一接口**：遵循OpenAI Function Calling规范，分为文件系统导航（6个）、代码编辑（3个）、执行测试（1个）、全栈测试（4个）、专用工具（3个）五大类
- **Calibrated评估框架**：通过Floor基线（初始未修改仓库的测试通过率）和Ceiling基线（应用参考patch后100%通过）建立校准区间，确保性能评估的可靠性
- **15个前沿模型全面评测**：包括GPT-5.2（pass@1=89%，pass@5=95%）、Claude Sonnet 4（pass@1=87.5%）、Gemini 2.5 Pro（pass@1=84%）、DeepSeek-V3（pass@1=65%）等，总计6000+独立运行
- **"Gaming Agent"现象发现**：部分模型通过反复运行测试套件并对比输出差异来"猜测"正确实现，而非真正理解代码逻辑
- **工具序列模式分析**：高绩效模型遵循"广泛探索→精准编辑→快速验证"的三阶段模式，使用5-10次搜索/阅读后才进行首次编辑
- **Docker容器化完全可复现**：每个任务在独立Docker容器中运行，确保环境一致性和评估公平性

#### 🔬 深入细节
![IDE-Bench 示意图](https://ar5iv.labs.arxiv.org/html/2601.20886/assets/x1.png)
*图：IDE-Bench 的核心框架或评测示意。*

##### 1. 动机与背景

现有代码生成评估基准（如HumanEval、MBPP）仅评估单函数补全能力，而SWE-bench系列虽模拟真实GitHub issue修复，却缺乏IDE环境中的关键要素：文件导航、增量编辑、终端执行、实时测试反馈等真实开发工作流。IDE-Bench的核心理念是：**优秀的AI编程Agent必须能在完整的IDE环境中自主探索代码库、做出精准修改并验证结果**，而不仅仅是在理想化的输入-输出对上进行评估。

论文提出了**"Calibrated Evaluation"**框架——通过天花板（Ceiling）和地板（Floor）基线为每个任务建立有效的性能测量区间，解决了传统基准中"测试用例可能预失败"的评估噪声问题。

##### 2. 基准架构设计

IDE-Bench的评估架构由三个核心层组成：

```
┌─────────────────────────────────────────────┐
│              Model Layer                     │
│  (任何LiteLLM兼容模型，统一API接口)            │
├─────────────────────────────────────────────┤
│            Harness Layer                     │
│  ┌──────────┬──────────┬──────────────────┐ │
│  │ 文件系统  │ 代码编辑  │  执行与测试       │ │
│  │ 导航(6)  │ (3)      │  (1+4)           │ │
│  └──────────┴──────────┴──────────────────┘ │
├─────────────────────────────────────────────┤
│           Repository Layer                   │
│  ┌──────┬──────┬──────┬──────────────────┐  │
│  │ C++  │ Java │Python│ MERN/Full-Stack  │  │
│  │引擎   │ Web  │网络  │ + 5个私有仓库    │  │
│  └──────┴──────┴──────┴──────────────────┘  │
└─────────────────────────────────────────────┘
```

**17种工具详解**：所有工具遵循OpenAI Function Calling规范，统一要求`explanation`参数以记录Agent推理链。

| 类别 | 工具 | 功能 |
|------|------|------|
| 文件导航 | `read_file` | 按行范围读取文件，屏蔽/test目录防止作弊 |
| | `list_dir` | 递归/非递归列出目录，自动排除node_modules等 |
| | `codebase_search` | 基于ripgrep的词法搜索，支持上下文行 |
| | `grep_search` | 高级正则搜索，支持多行模式 |
| | `file_search` | 基于glob的模糊文件名匹配 |
| | `delete_file` | 删除文件（同样屏蔽测试文件） |
| 代码编辑 | `edit_file` | 结构化行编辑：REPLACE/INSERT/DELETE，Python文件自动ast.parse()校验 |
| | `search_replace` | 字符串级查找替换（不需行号） |
| | `write_file` | 新建/覆写文件 |
| 执行测试 | `run_terminal_cmd` | Shell命令执行（120s超时，支持后台模式） |
| 全栈测试 | `api_call` | HTTP请求测试REST API |
| | `database_query` | MongoDB CRUD + 聚合管道 |
| | `websocket_test` | Socket.IO实时通信验证 |
| | `ui_test` | Playwright风格浏览器自动化 |
| 专用 | `edit_notebook` | Jupyter笔记本编辑（预留，未在任务中使用） |
| | `web_search` | 网络搜索（接口预留，评估环境未实现） |
| | `create_diagram` | Mermaid图表生成（预留） |

##### 3. 评估流程与指标

**执行协议**：每个任务Agent最多运行100轮对话，temperature=0.1，单次输出上限4000 tokens，API超时600秒。上下文超过25条消息时截断至模型窗口的80%，保留系统消息、首条用户消息和最近轮次。

**Grading Pipeline（4步差分提取）**：
1. `git diff HEAD` — 获取未暂存更改
2. `git add -A && git diff --cached` — 获取暂存更改
3. `git diff HEAD~1 HEAD` — 通过commit获取差异
4. 逐文件与`git show HEAD:<file>`对比 — 兜底方案

提取的diff与参考patch(`task_diff.txt`)进行语义相似度评分。Grader自动检测测试框架（pytest/jest/maven/junit/go test/cargo/rspec/phpunit/dotnet test/mocha）。

**核心指标**：
- **Task Resolution Rate (pass@k)**：k次独立尝试中至少1次所有测试通过的概率
- **Test Pass Rate**：单个测试用例通过百分比
- **Floor → Ceiling校准区间**：初始未修改仓库的测试通过率为Floor，应用参考patch后100%通过为Ceiling

##### 4. 实验结果全景

**主结果**（pass@1 / pass@5）：

| 模型 | pass@1 | pass@5 |
|------|--------|--------|
| GPT-5.2 | 89.0% | 95.0% |
| Claude Sonnet 4 | 87.5% | 93.8% |
| Gemini 2.5 Pro | 84.0% | 91.3% |
| Claude Opus 4 | 78.8% | 88.8% |
| GPT-4.1 | 75.0% | 86.3% |
| DeepSeek-V3 | 65.0% | 78.8% |
| Gemini 2.5 Flash | 63.8% | 77.5% |
| Qwen3-235B | 57.5% | 72.5% |
| Claude Sonnet 3.7 | 55.0% | 70.0% |
| Llama 4 Maverick | 48.8% | 65.0% |
| DeepSeek-R1 | 46.3% | 62.5% |
| GPT-4o | 42.5% | 58.8% |
| Qwen3-32B | 35.0% | 51.3% |
| Command R+ | 28.8% | 43.8% |
| Ministral 8B | 12.5% | 22.5% |

**关键洞察**：从top到bottom存在94.5%→12.5%的巨大性能梯度，说明基准具有优秀的区分度。GPT-5.2在pass@5下达到95%已接近天花板，但pass@1仍有11%提升空间。

##### 5. 失败模式深度分析

论文通过人工审查100个失败案例，归纳出三类主要失败模式：

**① 提前编辑 (Premature Editing, 63%)**：Agent在未充分理解代码库结构和上下文的情况下过早修改代码。表现为仅读取1-2个文件后即开始编辑，导致修改不完整、破坏现有逻辑或遗漏相关文件。

**② 反复编辑 (Repeated Editing, 28%)**：Agent多次修改同一代码片段，陷入"编辑→测试失败→再编辑"的循环而无法收敛。这反映了模型在长期规划上的不足——缺乏"先理解整体依赖关系再精准编辑"的能力。

**③ 工具使用不当 (9%)**：包括搜索模式错误、未正确解读测试输出、忽略文件路径等。

> 💡 关键发现：高绩效模型在首次编辑前平均进行5-10次探索操作（搜索+阅读），而低绩效模型通常仅2-3次探索就急于编辑。

##### 6. "Gaming Agent"现象

论文揭示了一个值得警惕的发现：部分模型利用测试套件作为"神谕"来逆向推导实现——反复运行`./run_tests.sh`，观察测试失败的具体assertion差异，然后机械地修改代码以匹配期望输出，而非真正理解代码意图。这种行为在简单的算法任务中尤其有效，但在需要架构理解的复杂任务中通常会失败。这表明**仅靠测试通过率评估可能高估模型的实际编程理解能力**。

##### 7. 安全性设计

为防止评估完整性被破坏，IDE-Bench实现了多层安全措施：
- 文件访问屏蔽：`/tasks`目录、`run_tests.sh`及所有`test_*`/`*.test.*`/`*.spec.*`文件对Agent不可见
- 编辑操作验证：`edit_file`在Python文件上自动运行`ast.parse()`阻止语法错误提交
- 差分审计：4步grading pipeline确保完整捕获Agent修改
- 仓库隐私：8个仓库中7个不公开，仅通过`research@afterquery.com`申请获取，防止训练数据污染

> ⚠️ 注意：尽管有安全设计，论文作者指出gaming agent仍然可以通过终端运行的测试输出来推断信息，这是当前评估范式的固有限制。

#### 🧪 练习题
```yaml
question: "IDE-Bench论文中发现的两种最主要的Agent失败模式是什么？"
options:
  - "语法错误和超时"
  - "提前编辑（Premature Editing）和反复编辑（Repeated Editing）"
  - "网络连接失败和内存溢出"
  - "工具未响应和API限流"
answer: 1
explain: "论文通过人工审查100个失败案例发现，提前编辑（未充分探索就修改代码）占63%，反复编辑（陷入修改-失败循环）占28%，两者合计占91%的失败原因。"
```
