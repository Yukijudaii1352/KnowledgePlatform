### SolAgent — Tool-Augmented Multi-Agent Framework for Automated Smart Contract Generation

```yaml
id: solagent
name: SolAgent
full_name: "SolAgent: Tool-Augmented Multi-Agent Framework for Automated Smart Contract Generation"
year: 2025
org: SJTU & ZJU (arXiv)
paper_url: https://arxiv.org/abs/2601.23009
category: frontier_2026
parent: ChatDev
motivation: 利用工具增强的多Agent框架自动生成Solidity智能合约代码
```

#### 📝 一句话总结

SolAgent 提出了一种工具增强的多 Agent 框架，通过 **Coding Agent + Refining Agent** 的双角色协作与 **Forge 编译器（正确性）+ Slither 静态分析器（安全性）** 的双循环迭代精炼机制，自动生成高质量 Solidity 智能合约代码，在自建基准 SolEval+ 上实现 64.39% 的 Pass@1，并将安全漏洞相比人工基线降低 39.77%。

#### 🎯 核心要点

- **双 Agent 架构**：Coding Agent 负责初始代码生成，Refining Agent 基于工具反馈迭代修复，两者通过共享消息历史协作
- **双循环精炼机制**：内循环使用 Forge 编译器检测编译错误与测试失败（功能正确性），外循环使用 Slither 静态分析器检测安全漏洞
- **文件系统工具集成**：Agent 可通过 `list_directory`、`read_file` 等工具探索项目结构、读取依赖文件，实现上下文感知的代码生成
- **动态停止策略**：三种终止条件——成功（编译+测试全通过）、停滞检测（连续 \(N=2\) 轮无改进）、振荡检测（代码相似度 \(\tau=0.9\)），最大 50 轮
- **工作流蒸馏（Workflow Distillation）**：将高质量 Agent 交互轨迹蒸馏到 Qwen3-8B，使用全参数微调（lr=2e-5, 3 epochs, 8×Ascend 910B2）
- **双源训练数据**：full-context 轨迹（tracker）+ compressed-context 轨迹（mix），配合前向/后向截断策略
- **SolEval+ 基准**：81 个 Solidity 文件、1188 个测试用例，源自真实开源项目，覆盖 DeFi、NFT、治理等场景
- **基线对比**：超越 GPT-5.1、Claude-Sonnet-4.5、Copilot、DeepCode、MetaGPT、Qwen-Agent 等 SOTA 方法

#### 🔬 深入细节

##### 核心框架图

![SolAgent 整体框架](https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x1.png)
*图 1：SolAgent 框架总览。左侧为 Coding Agent 生成初始代码，右侧为 Refining Agent 通过 Forge（内循环）和 Slither（外循环）迭代精炼，底部展示文件系统工具的上下文支持。*

![双循环精炼流程](https://ar5iv.labs.arxiv.org/html/2601.23009/assets/x2.png)
*图 2：双循环精炼机制的详细流程，展示内循环（编译+测试）与外循环（安全分析）的交互关系。*

##### 算法伪代码

```python
# SolAgent 双循环精炼核心流程
def solagent_generate(task_spec, project_context):
    # Phase 1: Coding Agent 生成初始代码
    code = coding_agent.generate(task_spec, project_context)
    
    # Phase 2: Refining Agent 迭代精炼
    for round in range(MAX_ROUNDS):  # MAX_ROUNDS = 50
        # 内循环: Forge 编译器反馈
        compile_result = forge.compile(code)
        if not compile_result.success:
            code = refining_agent.fix(code, compile_result.errors)
            continue
        
        test_result = forge.test(code)
        if not test_result.all_passed:
            code = refining_agent.fix(code, test_result.failures)
            # 停滞检测: 连续 N=2 轮无改进则跳出内循环
            if stagnation_detected(N=2):
                break
            # 振荡检测: 代码相似度 > τ=0.9 则终止
            if oscillation_detected(tau=0.9):
                break
            continue
        
        # 外循环: Slither 安全分析
        vulns = slither.analyze(code)
        if vulns:
            code = refining_agent.fix_security(code, vulns)
            continue
        
        return code  # 成功: 编译通过 + 测试通过 + 无漏洞
    
    return best_code  # 返回历史最优版本
```

##### 动机与背景

智能合约是区块链生态的核心基础设施，一旦部署便不可更改，因此对代码的**功能正确性**和**安全性**有极高要求。2024 年因智能合约漏洞导致的经济损失超过 23 亿美元。然而，现有 LLM 在 Solidity 代码生成上面临三大挑战：

1. **编译失败率高**：vanilla LLM 的编译通过率仅 30%-45%，远低于实际可用标准
2. **安全漏洞频发**：单次生成无法保证代码免受重入攻击、整数溢出等常见漏洞
3. **上下文缺失**：智能合约通常依赖复杂的项目结构（接口、库、继承关系），单文件生成缺乏依赖信息

现有的 Agent 框架（如 MetaGPT、Qwen-Agent）虽然引入了多步推理，但缺乏针对智能合约领域的专用工具链集成，无法有效利用编译器和安全分析器的反馈信号。

##### 核心机制详解

**1. 双 Agent 角色分工**

SolAgent 采用两个专门化的 Agent：

- **Coding Agent**：接收任务规范（自然语言描述 + 函数签名 + 依赖信息），生成初始 Solidity 代码。该 Agent 配备文件系统工具，可主动探索项目结构以获取必要的上下文信息。
- **Refining Agent**：接收 Coding Agent 的输出及工具反馈（编译错误、测试失败、安全漏洞报告），迭代修复代码。两个 Agent 共享消息历史，确保修复过程的连贯性。

> 💡 **关键设计**：与 ChatDev 等框架中 Agent 间的"对话式"协作不同，SolAgent 的两个 Agent 通过**工具反馈信号**驱动协作，形成"生成-检测-修复"的闭环。

**2. 双循环精炼机制**

这是 SolAgent 的核心创新，将迭代精炼分为两个嵌套循环：

- **内循环（Forge Compiler Loop）**：使用 Foundry 的 Forge 工具链进行编译和测试。每轮将编译错误信息或测试失败的详细日志反馈给 Refining Agent。消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（Claude-Sonnet-4.5），证明这是最关键的组件。

- **外循环（Slither Security Loop）**：当内循环达到功能正确性后，使用 Slither 静态分析器扫描安全漏洞。检测到的漏洞（如重入攻击、未检查的外部调用等）被反馈给 Refining Agent 进行安全加固。在 Min-Vuln 轮次分析中，Slither 反馈使漏洞减少 23%-35%。

**3. 动态停止策略**

为避免无效的反复修改，SolAgent 设计了三种智能终止条件：

$$\text{Stop} = \begin{cases} \text{Success} & \text{if compile} \land \text{all\_tests\_pass} \\ \text{Stagnation} & \text{if } \Delta\text{pass\_rate} = 0 \text{ for } N=2 \text{ consecutive rounds} \\ \text{Oscillation} & \text{if } \text{sim}(code_t, code_{t-k}) > \tau = 0.9 \end{cases}$$

其中代码相似度使用字符级别的比较。最大迭代轮数设为 50 轮，实际平均约 5-6 轮即可收敛。

**4. 文件系统工具**

Agent 被赋予以下工具能力：
- `list_directory(path)`：列出项目目录结构
- `read_file(path)`：读取依赖文件内容（接口定义、基类实现等）

这使 Agent 能够自主发现并解析项目依赖关系，而非依赖人工提供的上下文。消融实验显示，移除工具后 GPT-5.1 的 Pass@1 从 54.71% 降至 31.73%。

**5. 工作流蒸馏**

SolAgent 提出将成功的 Agent 交互轨迹蒸馏到小模型中：

- **数据构造**：从 SolAgent 运行轨迹中提取两类数据——(1) tracker 数据保留完整上下文（包含工具调用和反馈），(2) mix 数据压缩上下文（仅保留关键决策点）
- **截断策略**：v1 保留前 4K tokens（学习推理过程），v2 保留后 4K tokens（学习最终代码输出）
- **训练配置**：Qwen3-8B 全参数微调，学习率 2e-5，3 个 epoch，8×Ascend 910B2 NPU
- **部署**：使用 vLLM 部署，启用 YaRN RoPE scaling 支持 128K 上下文窗口

蒸馏后的 8B 模型（SolAgent-tracker-v2）编译率从 5.88% 提升至 17.65%，Pass@1 从 0.33% 提升至 1.31%，达到了 4 倍大小的 Qwen3-32B 的同等水平。

##### 与传统方法的区别

| 维度 | Vanilla LLM | 通用 Agent (MetaGPT等) | SolAgent |
|------|------------|----------------------|----------|
| 编译率 | 30%-45% | 28%-46% | **90%-95%** |
| 安全检测 | 无 | 无 | Slither 集成 |
| 依赖解析 | 无 | 有限 | 文件系统工具 |
| 迭代精炼 | 无 | 通用反馈 | **领域专用双循环** |
| 停止策略 | 单次 | 固定轮数 | **动态停止** |

> ⚠️ **注意**：SolAgent 的 gas 效率在部分场景下略逊于基线（均值比率 1.0-2.4），这是因为双循环精炼优先保证正确性和安全性，而非 gas 优化。但修剪均值（Trim5%）接近 1.0，表明大多数情况下 gas 效率合理。

##### 实验结果摘要

**功能正确性（RQ-1）**：

| 方法 | 模型 | 编译率 | Pass@1 |
|------|------|--------|--------|
| Vanilla LLM | Claude-Sonnet-4.5 | 39.51% | 25.59% |
| Qwen-Agent | Claude-Sonnet-4.5 | 45.68% | 28.37% |
| **SolAgent** | **Claude-Sonnet-4.5** | **95.06%** | **64.39%** |
| **SolAgent** | **GPT-5-Mini** | **90.12%** | **56.65%** |
| **SolAgent** | **GPT-5.1** | **91.36%** | **54.71%** |

**安全性**：SolAgent 生成的代码漏洞数相比人工基线减少 39.77%（Claude-Sonnet-4.5），相比 vanilla LLM 减少更为显著。

**消融实验（RQ-2）**：
- 移除 Forge 反馈：Pass@1 降幅 38%+（最关键组件）
- 移除 Slither 反馈：Min-Vuln 轮漏洞增加 23%-35%
- 移除文件工具：Pass@1 降幅 7%-23%

#### 🧪 练习题

```yaml
question: "SolAgent 的双循环精炼机制中，哪个组件对功能正确性（Pass@1）的影响最大？"
options:
  - "Slither 静态安全分析器反馈"
  - "Forge 编译器与测试反馈"
  - "文件系统工具（依赖解析）"
  - "动态停止策略（停滞与振荡检测）"
answer: 1
explain: "消融实验表明，移除 Forge 反馈后 Pass@1 从 64.39% 骤降至 26.18%（降幅超 38%），是对功能正确性影响最大的单一组件。Forge 提供的编译错误和测试失败信息是迭代修复的核心驱动信号。"
```