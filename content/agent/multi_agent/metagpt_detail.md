### MetaGPT: 元编程协作框架 (MetaGPT)

```yaml
id: metagpt
name: MetaGPT
full_name: 元编程协作框架 (MetaGPT)
year: '2023.08'
org: DeepWisdom
paper_url: https://arxiv.org/abs/2308.00352
category: organization
parent: chatdev
motivation: 把SOP编码进多角色流水线
```

#### 📝 一句话总结
MetaGPT 提出了一种基于 SOP（标准操作流程）的多智能体元编程框架，将 LLM 智能体组织为模拟软件公司的角色分工流水线，通过结构化通信与可执行反馈机制，显著提升了端到端软件开发的代码质量和可执行性。

#### 🎯 核心要点
- 提出 **SOP 驱动的多智能体协作框架**：将软件开发流程分解为产品经理、架构师、项目经理、工程师和 QA 工程师 5 个角色的标准化协作流水线
- **结构化通信机制**：设计共享消息池（Message Pool）与订阅发布（Publish-Subscribe）模式，每个角色发布结构化文档（PRD、设计文档、任务列表、代码、测试报告），减少通信信息损失
- **可执行反馈（Executable Feedback）**：QA 角色在运行时执行生成的代码并反馈错误信息，形成迭代自优化闭环，Pass@1 提升 4.2%~5.4%
- 构建 **SoftwareDev 数据集**：包含 70 个多样化软件开发任务，涵盖游戏开发、网页应用、算法实现等场景
- 在 HumanEval、MBPP 和 SoftwareDev 等多个基准上取得 **SOTA 表现**，可执行性评分从 2.0 提升至 3.75，人工修订成本从 2.25 降至 0.83

#### 🔬 深入细节
![MetaGPT 整体框架图](https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/1-metagpt_overall_update.png)

*图：MetaGPT 框架总览——5 个角色（Product Manager、Architect、Project Manager、Engineer、QA Engineer）通过共享消息池进行结构化通信，遵循 SOP 流程完成端到端软件开发。*

##### 动机与背景

传统基于 LLM 的多智能体系统（如 AutoGPT、LangChain、AgentVerse、ChatDev）虽然展现了通用问题求解能力，但在复杂系统开发中存在两个核心瓶颈：

1. **缺乏需求系统化分解能力**：从模糊的自然语言需求到可执行的代码，需要结构化的中间表示（需求文档、设计文档、接口定义），现有方法跳过了这些关键步骤，导致生成的代码偏离预期。
2. **通信信息损失**：多智能体间的自然语言通信存在模糊性和信息衰减，随着流程推进，需求理解偏差逐步放大。

MetaGPT 的核心洞察是：**人类软件公司的成功离不开 SOP（标准操作流程）**。通过将软件工程的最佳实践（需求分析→系统设计→任务拆分→编码→测试）固化为智能体的工作流，并强制输出结构化中间文档，可以大幅提升 LLM 生成代码的质量。

##### 核心机制：SOP 驱动的多角色流水线

MetaGPT 模拟了一家软件公司的角色分工，每位智能体承担特定职责，按 SOP 顺序协作：

**角色 1：产品经理（Product Manager）**
- 输入：用户自然语言需求
- 输出：**PRD（Product Requirement Document）**，包含产品目标、用户故事、功能需求、约束条件
- 使用结构化模板确保需求完整，避免歧义

**角色 2：架构师（Architect）**
- 输入：PRD
- 输出：**系统设计文档（Design Document）**，包含系统架构、模块划分、接口定义、数据流图
- 将抽象需求转化为具体的技术方案和类/函数设计

**角色 3：项目经理（Project Manager）**
- 输入：设计文档
- 输出：**任务列表（Task List）**，将设计拆分为可独立实现的子任务，分配优先级和依赖关系

**角色 4：工程师（Engineer）**
- 输入：任务列表 + 设计文档
- 输出：**代码（Code）**，基于分配的任务和接口规范编写可执行代码

**角色 5：QA 工程师（QA Engineer）**
- 输入：代码 + PRD
- 输出：**测试报告（Test Report）**，通过实际执行代码发现错误（如 ImportError、SyntaxError、运行时异常），将错误信息反馈给工程师修正

![MetaGPT 详细工作流](https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/3-metagpt_details.jpg)

*图：MetaGPT 详细角色分工与数据流——每个角色接收上游结构化输出并生成下游文档，形成完整的文档链。*

##### 结构化通信：消息池与订阅机制

MetaGPT 的关键创新在于**通信方式的结构化**。传统多智能体系统使用自由文本通信，信息在传递中逐渐模糊。MetaGPT 采用：

- **共享消息池（Shared Message Pool）**：所有角色向消息池发布结构化消息（JSON/YAML 格式的文档），替代自然语言对话
- **订阅-发布模式（Publish-Subscribe）**：每个角色根据 SOP 定义，只订阅其上游角色的输出消息，过滤无关信息
- **结构化文档格式**：PRD、设计文档、任务列表、代码、测试报告均有固定模式，包含明确的字段和类型定义

![消息共享机制](https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/2-message_sharing.jpg)

*图：MetaGPT 的消息共享与订阅机制示意——角色通过结构化消息而非自然语言进行通信。*

> 💡 **关键设计**：结构化通信不仅减少信息损失，还使得中间产物（PRD、设计文档）对人类可读，便于人工审查和修订。这与纯端到端的"需求→代码"黑盒方案形成鲜明对比。

##### 可执行反馈机制

MetaGPT 引入了**运行时反馈闭环**，由 QA 角色在代码生成后立即执行并收集错误：

```python
# MetaGPT 可执行反馈核心流程（简化伪代码）
def executable_feedback_loop(engineer_output, qa_agent):
    code = engineer_output.code
    max_iterations = 3
    
    for iteration in range(max_iterations):
        # 1. QA 执行代码并捕获错误
        test_result = qa_agent.run_code(code)
        
        if test_result.success:
            break  # 通过测试
        
        # 2. 将错误信息反馈给工程师
        feedback = {
            "error_type": test_result.error_type,
            "error_message": test_result.error_message,
            "traceback": test_result.traceback
        }
        
        # 3. 工程师基于反馈修订代码
        code = engineer.revise_code(
            original_code=code,
            feedback=feedback,
            design_doc=upstream_design,
            prd=upstream_prd
        )
    
    return code, test_result
```

> ⚠️ **注意**：可执行反馈是一个轻量级机制，聚焦于**运行时错误**（即代码能否跑通）而非功能正确性。实验表明，仅此机制即带来显著提升：HumanEval Pass@1 提升 4.2%，MBPP Pass@1 提升 5.4%，可执行性评分从 3.67 升至 3.75，人工修订成本从 2.25 降至 0.83。

##### 与传统方法的区别

| 维度 | AutoGPT / LangChain | ChatDev | **MetaGPT** |
|------|---------------------|---------|-------------|
| 角色分工 | 单一 Agent | 多角色流水线 | 多角色 + **SOP 标准化** |
| 通信方式 | 自由文本 / 函数调用 | 自然语言对话 | **结构化文档 + 消息池** |
| 中间产物 | 无 | 有限 | **PRD→设计→任务→代码→测试** |
| 反馈机制 | 无 | 无 | **可执行反馈迭代** |
| 可执行性 | 1/4 | 2/4 | **3/4**（Flappy Bird） |

![象限对比图](https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/6-quadrant_chart.png)

*图：MetaGPT 与基线方法的象限对比，展示 MetaGPT 在代码质量和可执行性上的综合优势。*

![软件任务示例](https://ar5iv.labs.arxiv.org/html/2308.00352/assets/imgs/5-softwaredev_tasks.jpg)

*图：SoftwareDev 数据集中的典型任务——2048 游戏、Brick Breaker 游戏、Flappy Bird 游戏。*

##### 关键实验发现

- **Table 4（可执行性对比）**：在 Flappy Bird 任务上，MetaGPT 评分 3（"largely satisfying expected workflow"），ChatDev 评分 2（"executable code"），其余方法评分 1（"complete failure"）
- **可执行反馈贡献**：加入反馈后，可执行性从 3.67→3.75，人工修订成本从 2.25→0.83
- **通用性验证**：HumanEval Pass@1 提升 4.2%，MBPP Pass@1 提升 5.4%
- **附录 Table 6**：无反馈的纯 MetaGPT 在 70 个任务上仍可生成平均数百行代码，验证 SOP 框架本身的有效性

#### 🧪 练习题
```yaml
question: "MetaGPT 中'可执行反馈（Executable Feedback）'机制的核心作用是什么？"
options:
  - "自动生成完整的 PRD 文档和系统设计图"
  - "在运行时执行生成代码并反馈错误，驱动迭代修订直到代码可运行"
  - "通过强化学习训练工程师 Agent 的代码生成策略"
  - "将自然语言需求直接编译为可执行二进制文件"
answer: 1
explain: "可执行反馈由 QA Agent 在运行时执行代码，捕获 ImportError/SyntaxError/运行时异常并反馈给 Engineer 修订，聚焦于提升代码可运行性（而非功能正确性校对）。"
```
