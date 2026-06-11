### Harness-Bench: Harness 配置诊断基准 (Harness-Bench)

```yaml
id: harness_bench
name: Harness-Bench
full_name: Harness 配置诊断基准 (Harness-Bench)
year: '2026.05'
org: 北大/Qiyuan Tech
paper_url: https://arxiv.org/abs/2605.27922
category: evaluation
parent: ahe
motivation: 分离模型与harness配置效应
```

#### 📝 一句话总结
Harness-Bench 提出首个系统性诊断框架，通过在统一的106个沙盒任务、多模型后端和多harness配置的factorial矩阵（5194条轨迹）上评测，量化了agent执行层（harness）对性能的实质性影响——相同模型在不同harness下得分差距可达23.8分，并揭示了5类典型执行漂移失败模式，明确提出“agent性能应报告为model–harness配置层级的属性而非仅归因于基础模型”。

#### 🎯 核心要点
- 提出 **Harness-Bench** 诊断性benchmark，首次系统研究harness配置对agent端到端性能的影响
- 包含 **106个沙盒化任务**，覆盖8个workflow类别：软件工程(22)、数据分析(14)、工具/多模态操作(15)、知识检索(13)、办公通信(12)、垂直专业工作流(12)、长期自主/状态适应(11)、SRE/DevOps(7)
- 6个可配置harness（OpenClaw, NanoBot, Hermes, ZeroClaw, NullClaw, Moltis） × 8个模型后端，形成完整factorial矩阵，共计 **5,194条完整执行轨迹**
- 三维评分公式：**TaskScore = Security × Completion × Process**，其中Process = (Robustness + ToolUse + Consistency) / 3，Security为二值安全门控
- 发现可配置harness间最大性能差距 **23.8分**（NanoBot 76.2 vs OpenClaw 52.4），Codex（model-bound coding agent）作为参考基线达80.4
- 提出 **“执行对齐”(execution alignment)** 概念：衡量harness是否保持推理、workspace状态、工具action和evaluator检查条件之间的对应关系
- 归纳 **5类典型失败模式**：Contract/format(36.4%)、Tool/recovery(24.6%)、Evidence/grounding(14.6%)、Artifact commitment(11.1%)、State/continuation(9.3%)
- 发现更强模型后端跨harness方差更小，表明强模型对执行层差异更宽容

#### 🔬 深入细节
##### 1. 核心框架：Harness-Bench评估管道

![Harness-Bench评估管道概览](https://arxiv.org/html/2605.27922v1/x1.png)
*图1：Harness-Bench评估管道。每个任务在沙盒中实例化，由model–harness配置执行。系统记录artifacts、traces、usage statistics和validator outputs，最终合成综合诊断分数。*

Harness-Bench将Agent定义为 **Agent = Model + Harness**。评估管道分为三阶段：

1. **Setup**：渲染task specification，构建runtime环境，初始化fresh sandbox
2. **Execution**：配置好的agent在budget和workspace约束下尝试完成任务，记录所有模型请求/响应、tool calls、workspace变更
3. **Judge**：evaluator检查final workspace状态和execution evidence，agent无法访问reference artifacts、hidden answers和evaluator scripts

每个run产生四类证据：final workspace state、execution trace、usage statistics、validator outputs。

##### 2. 评分公式与指标体系

核心评分采用乘法聚合：

$$
\text{TaskScore}_i = \text{Security}_i \cdot \text{Completion}_i \cdot \text{Process}_i
$$

其中：
- **Security** ∈ {0, 1}：binary gate，任何显式权限/安全违规（未授权访问、秘钥泄露、禁止操作）直接归零
- **Completion**：task-specific deterministic validator或rubric-based judgment
- **Process** = (Robustness + ToolUse + Consistency) / 3：
  - **Robustness**：agent是否正确处理tool或环境故障
  - **ToolUse**：工具选择和应用的适当性
  - **Consistency**：actions、observations、中间状态和最终输出与workspace状态和用户约束的一致性

> 💡 关键：乘法公式设计极为保守——需同时满足任务完成、无安全违规、可靠执行行为三者才能获得高分。Process分数通过外部LLM judge（claude-sonnet-4.6）从重构trace中评估。

##### 3. 任务套件设计：四原则筛选

所有106个任务需满足四个纳入标准：
- **Realism**：反映真实的用户workflow
- **Solvability**：可使用提供的沙盒资源完成
- **Oracle-checkability**：成功可由确定性检查或指定rubric验证
- **Integrity**：agent无法通过读取隐藏答案、修改protected fixtures或绕过约束来获得credit

任务完全本地化、沙盒化执行，避免了依赖live services带来的benchmark drift问题。

##### 4. 实验设计与核心发现

**Factorial矩阵控制变量**（Table 1）：

| 因素 | 处理方式 |
|------|---------|
| Task prompt/fixtures | 每个task固定 |
| 初始沙盒状态 | 每个task固定 |
| Budget/timeout/evaluator | 每个task固定 |
| 模型后端 | Factorial矩阵中变化 |
| Harness配置 | Factorial矩阵中变化 |
| Prompting/action格式 | 各harness原生 |
| Tool接口/状态策略 | 各harness原生 |
| Retry/recovery行为 | 各harness原生 |

**主要结果**（Table 2聚合）：
- NanoBot得分最高(76.2)，OpenClaw最低(52.4)，**差距23.8分**
- Codex（GPT-5.4底层，model-bound coding agent）达80.4，但作为专门化系统的参考基线
- **更强模型后端跨harness方差更低**：表明强模型对prompting、tool interfaces、state management差异更宽容
- Token/turn用量不能单独解释性能：NanoBot用68.7K tokens达76.2，NullClaw用175.1K tokens仅64.4

##### 5. 执行对齐与失败模式分析

论文提出关键概念**执行对齐（execution alignment）**：衡量harness保持以下几点之间对应关系的程度——
1. agent的推理(reasoning)
2. 观察到的workspace状态
3. 通过工具执行的动作
4. evaluator检查的条件

**5类典型失败症状及出现率**（Table 3）：
- **Contract/format** (36.4%)：schema或output-contract违规——malformed JSON、缺失ledger行、不完整manifest
- **Tool/recovery** (24.6%)：工具错误或blocked commands后无有效恢复或计划修订
- **Evidence/grounding** (14.6%)：不完整source coverage，伴随无支撑声明或缺失验证
- **Artifact commitment** (11.1%)：有合理推理但未提交required outputs或workspace artifacts
- **State/continuation** (9.3%)：在中断或多轮任务中无法保存持久进度或可靠恢复

> ⚠️ 注意：这些失败发生在"语义合理性"和"机器可验证输出"的边界——agent可能看似理解任务，但在执行层面与oracle可验证的条件脱节。

##### 6. 与传统Benchmark的关系

区别于SWE-bench、AgentBench等outcome-grounded benchmark，Harness-Bench的独特贡献在于**将harness从背景条件提升为第一类研究变量**。它不要求所有系统统一内部policy或runtime，每个harness保持原生行为，从而在共享外部条件下衡量**配置层级**的诊断性差异，而非因果分解单个机制。

```python
for task in benchmark:
    env.reset(task)
    result = agent.run(env.observe())
    metrics.record(validate(result, env))
```

#### 🧪 练习题
```yaml
question: "Harness-Bench评分公式中Security gate的作用是什么？"
options:
  - "衡量agent的token使用效率"
  - "作为二值门控，任何安全/权限违规直接使总分归零"
  - "计算Process子项中的Consistency分数"
  - "仅在Completion分数不达标时触发惩罚"
answer: 1
explain: "Security ∈ {0,1}是乘法公式中的二值门控——一旦发生未授权访问、秘钥泄露或禁止操作等安全违规，无论Completion和Process分数多高，TaskScore直接归零。"
```
