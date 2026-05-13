### 计划求解 (Plan-and-Solve)

```yaml
id: plan_and_solve
name: Plan-and-Solve
full_name: 计划求解 (Plan-and-Solve)
year: '2023'
org: 新加坡国立大学
paper_url: https://aclanthology.org/2023.acl-long.147/
category: planning
parent: cot
motivation: 先制定计划再逐步执行
```

#### 📝 一句话总结

Plan-and-Solve (PS) Prompting 提出用"先制定计划、再逐步执行"的提示策略替换 Zero-shot-CoT 的"Let's think step by step"，并通过附加细粒度指令（提取变量、关注计算）形成 PS+ 变体，在零样本设置下显著减少推理步骤遗漏和计算错误，性能媲美甚至超越少样本 CoT 方法。

#### 🎯 核心要点

- **两阶段零样本提示框架**：Step 1 生成包含计划与推理过程的文本，Step 2 提取最终答案
- **PS 提示**：将触发句从"Let's think step by step"替换为"Let's first understand the problem and devise a plan to solve the problem. Then, let's carry out the plan and solve the problem step by step"
- **PS+ 提示**：在 PS 基础上增加三条细粒度指令——"extract relevant variables and their corresponding numerals"、"calculate intermediate results"、"pay attention to calculation and commonsense"
- **三类错误分析**：系统识别 Zero-shot-CoT 的三大缺陷——计算错误 (7%)、推理步骤遗漏 (12%)、语义误解 (27%)
- **广泛评测**：覆盖 10 个数据集、3 类推理问题（算术推理、常识推理、符号推理），使用 GPT-3 (text-davinci-003) 作为骨干模型
- **核心结果**：PS+ 零样本在算术推理平均准确率 76.7%，超越 Zero-shot-CoT (70.4%) 和 Zero-shot-PoT (73.5%)，接近 8-shot Manual-CoT (77.6%)
- **与自一致性 (Self-Consistency) 兼容**：PS+ + SC 在 GSM8K 达 73.7%，SVAMP 达 84.4%

#### 🔬 深入细节

##### 问题背景与动机

Zero-shot-CoT 通过在提示末尾附加"Let's think step by step"来引导 LLM 生成推理链，虽然简单有效，但作者对 GSM8K 数据集上 100 个错误样本的分析揭示了三类系统性缺陷：

![Zero-shot-CoT 错误分析](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x1.png)
*图 1：Zero-shot-CoT 在 GSM8K 上的错误类型分布——计算错误 7%、步骤遗漏 12%、语义误解 27%*

其中，**步骤遗漏错误**（Missing-Step Error）是 PS 方法的主要攻克目标：当问题涉及多个推理步骤时，LLM 容易跳过中间步骤直接给出答案。作者认为，这是因为"Let's think step by step"缺乏对任务分解的显式引导。

##### 核心方法：Plan-and-Solve Prompting

![PS 与 Zero-shot-CoT 对比](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x2.png)
*图 2：(a) Zero-shot-CoT 与 (b) Plan-and-Solve 提示的输入输出对比*

PS Prompting 的核心思想极为简洁——将提示模板从：

> Q: [问题]. A: Let's think step by step.

替换为：

> Q: [问题]. A: Let's first understand the problem and **devise a plan** to solve the problem. Then, let's **carry out the plan** and solve the problem step by step.

这一改动引导 LLM 先将复杂问题分解为子任务（计划阶段），再按计划逐步执行（求解阶段），从而减少步骤遗漏。

##### PS+ 提示：细粒度指令增强

![PS 与 PS+ 对比](https://ar5iv.labs.arxiv.org/html/2305.04091/assets/x3.png)
*图 3：(a) PS Prompting 与 (b) PS+ Prompting 的对比——PS+ 通过附加指令显著提升推理质量*

PS+ 在 PS 的基础上添加了三条关键指令：

1. **"extract relevant variables and their corresponding numerals"**——强制 LLM 提取问题中的关键变量和数值，避免遗漏重要信息
2. **"calculate intermediate results"**——要求 LLM 显式计算中间结果，而非跳步推理
3. **"pay attention to calculation and commonsense"**——提醒 LLM 注意计算准确性和常识一致性

完整的 PS+ 提示模板为：

```text
Q: [问题]. A: Let's first understand the problem, extract relevant variables
and their corresponding numerals, and make a plan. Then, let's carry out
the plan, calculate intermediate variables (pay attention to correct
numerical calculation and commonsense), solve the problem step by step,
and show the answer.
```

##### 两步推理流程伪代码

```python
# Plan-and-Solve (PS+) 两步推理流程
def plan_and_solve_plus(question, llm):
    # Step 1: 推理生成
    prompt_step1 = f"Q: {question}. A: Let's first understand the problem, "
                   f"extract relevant variables and their corresponding numerals, "
                   f"and make a plan. Then, let's carry out the plan, "
                   f"calculate intermediate variables (pay attention to correct "
                   f"numerical calculation and commonsense), solve the problem "
                   f"step by step, and show the answer."
    reasoning_text = llm.generate(prompt_step1, temperature=0)  # 贪心解码

    # Step 2: 答案提取
    prompt_step2 = prompt_step1 + reasoning_text + \
                   "\nTherefore, the answer (arabic numerals) is"
    answer = llm.generate(prompt_step2, temperature=0)
    return answer
```

> 💡 **关键设计**：与 Zero-shot-CoT 完全一致的两步框架（生成 + 提取），仅修改 Step 1 的触发句，无需任何示例、无需额外模型或工具，实现即插即用。

##### 实验结果与分析

**算术推理（6 个数据集）**：

| 方法 | MultiArith | GSM8K | AddSub | AQuA | SingleEq | SVAMP | 平均 |
|------|-----------|-------|--------|------|----------|-------|------|
| Zero-shot-CoT | 83.8 | 56.4 | 85.3 | 38.9 | 88.1 | 69.9 | 70.4 |
| Zero-shot-PoT | 92.2 | 57.0 | 85.1 | 43.9 | 91.7 | 70.8 | 73.5 |
| **Zero-shot-PS** | 87.2 | 58.2 | 88.1 | 42.5 | 89.2 | 72.0 | 72.9 |
| **Zero-shot-PS+** | **91.8** | **59.3** | **92.2** | **46.0** | **94.7** | **75.7** | **76.7** |
| 8-shot Manual-CoT | 93.6 | 58.4 | 91.6 | 48.4 | 93.5 | 80.3 | 77.6 |

PS+ 在所有算术数据集上均大幅超越 Zero-shot-CoT（平均 +6.3%），在 5/6 个数据集上超越 Zero-shot-PoT，且与 8-shot Manual-CoT 仅差 0.9%。

**常识推理**：PS+ 在 CommonsenseQA 上达 71.9%（vs CoT 65.2%），StrategyQA 上达 65.4%（vs CoT 63.8%）。

**符号推理**：PS+ 在 Last Letter 上达 75.2%，甚至超越 8-shot Manual-CoT（70.6%）。

##### 错误类型消融分析

| 方法 | 计算错误 | 步骤遗漏 | 语义误解 |
|------|---------|---------|---------|
| Zero-shot-CoT | 7% | 12% | 27% |
| Zero-shot-PS | 7% | 10% | 26% |
| Zero-shot-PS+ | **5%** | **7%** | 27% |

> ⚠️ **局限性**：PS+ 有效减少了计算错误（7%→5%）和步骤遗漏（12%→7%），但对语义误解错误（27%）几乎无改善——这类错误源于 LLM 自身的理解能力上限，难以仅通过提示工程解决。

##### 提示设计的关键发现

作者通过 6 种不同触发句的对比实验（Table 5）揭示了重要规律：

- 单独使用"extract variables"指令（Prompt 3）反而导致性能下降（GSM8K: 50.5% vs 56.4%），因为缺少计划制定的引导
- **"devise a plan + carry out the plan"是性能提升的核心驱动力**（Prompt 5: GSM8K 58.2%）
- 在计划框架上叠加细粒度指令才能获得最佳效果（Prompt 6/PS+: GSM8K 59.3%）

相关性分析进一步证实：生成文本中包含变量定义和推理计划与计算错误、步骤遗漏呈**负相关**，验证了 PS+ 的设计直觉。

##### 与传统方法的核心区别

| 维度 | Zero-shot-CoT | Plan-and-Solve (PS+) |
|------|--------------|---------------------|
| 触发策略 | 单一指令"think step by step" | 结构化指令：计划→提取变量→执行→计算 |
| 任务分解 | 隐式依赖 LLM 自发分解 | 显式要求 LLM 先制定计划 |
| 计算引导 | 无 | 明确要求提取数值、计算中间结果 |
| 示例需求 | 零样本 | 零样本（无需人工示例） |
| 额外工具 | 无 | 无（纯提示方法） |

#### 🧪 练习题

```yaml
question: "Plan-and-Solve Prompting 相比 Zero-shot-CoT 最核心的改进是什么？"
options:
  - "使用更大的语言模型来提升推理能力"
  - "在提示中加入少量人工标注的推理示例"
  - "将触发句替换为先制定计划再逐步执行的结构化指令"
  - "引入外部 Python 解释器执行计算"
answer: 2
explain: "PS Prompting 的核心创新是将'Let's think step by step'替换为包含'devise a plan'和'carry out the plan'的结构化触发句，引导 LLM 先分解任务再逐步求解，无需示例或外部工具。"
```