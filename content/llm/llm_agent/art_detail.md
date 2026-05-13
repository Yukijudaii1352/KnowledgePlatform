### ART - Automatic Reasoning and Tool-use

```yaml
id: art
name: ART
full_name: "Automatic Reasoning and Tool-use for Large Language Models"
year: 2023
organization: "University of Washington, Microsoft Research, UC Irvine, Allen Institute for AI, Meta AI"
category: tool_use
parent: toolformer
```

## 📝 一句话总结

ART 提出了一个**无需微调**的框架，通过从**任务库**中自动检索多步推理示范，并在推理过程中**无缝调用外部工具**（搜索、代码生成/执行），实现了对新任务的零样本分解与工具使用，在 BigBench 和 MMLU 上大幅超越 few-shot 和 AutoCoT 基线。

## 🎯 核心要点

- **自动化推理分解**：ART 使用冻结的 LLM（InstructGPT），从预构建的任务库中检索相似任务的分解示范，自动为新任务生成结构化的多步推理程序，无需为每个任务手工编写 CoT prompt。

- **结构化程序语言 PeG**：所有推理步骤遵循统一的查询语言格式（`Qi: [tool] query` → `#i: answer` → `EOQ` → `Ans`），使得工具调用的暂停/恢复可以被自动解析，同时也比自由形式的 CoT 更能引导 LLM 进行结构化推理。

- **任务库 + 工具库的双库架构**：
  - **任务库**：包含 15 个 BigBench 任务的分解示范，按 5 个技能集群组织（算术、代码、搜索、字符串操作、CoT 推理）
  - **工具库**：包含搜索（SerpAPI）、代码生成（Codex）、代码执行（Python 环境）等外部工具，可由人类扩展

- **工具使用带来显著提升**：在测试任务上，启用工具比不启用平均提升 **+12.3%**，尤其在算术任务上提升巨大（+21.85%），因为代码执行能精确完成复杂计算。

- **人类反馈的低成本接入**：由于 ART 生成的是可解释的程序，人类可以直接编辑推理步骤（添加/删除/修正子步骤）或向工具库添加新工具（如字典查询 `lookup`），无需重新训练模型。在 12 个测试任务上，少量人类反馈使 ART 超越 GPT-3 最佳结果平均 **20%+**。

## 🔬 深入细节

### 整体架构

ART 的工作流程如下：

```
新任务输入
    ↓
[任务检索] 从任务库中选择相似任务的分解示范 (N=3个任务, 每个2个示范)
    ↓
[构建 Prompt] 将检索到的示范 + 新任务输入组成 prompt
    ↓
[LLM 生成] 冻结的 InstructGPT 逐步生成推理程序
    ↓ (遇到工具调用标记时暂停)
[工具执行] 调用对应工具 (search/codegen/codeexec)，将结果注入程序
    ↓ (恢复生成)
[继续生成] 直到生成 EOQ + 最终答案
```

### PeG 程序格式

每个任务实例的推理程序遵循以下结构化格式：

```
Task: [任务名称]
Input: [输入文本]
Q1: [search] 搜索查询内容
#1: 搜索返回的结果
Q2: [generate python code] 根据上一步结果生成代码
#2: import math; T=72.0; theta=35.0; Fx=T*math.cos(math.radians(theta))
Q3: [execute code] 执行代码获取 Fx 的值
#3: 58.9789
Q4: [arithmetic] 四舍五入到最近整数
#4: 59
Q5: [EOQ]
Ans: 59 N
```

关键设计：
- **子步骤查询** `Qi: [tool_name] query`：当 `tool_name` 匹配工具库中的工具时，暂停 LLM 生成，调用外部工具
- **子步骤答案** `#i: answer`：工具输出或 LLM 自身生成的中间结果
- **终止符** `EOQ` + `Ans`：标记程序结束和最终答案

### 任务库构建与检索

**任务库**包含 15 个 BigBench 任务，按技能聚类为 5 组：

| 集群 | 代表任务 | 主要工具 |
|------|---------|---------|
| 算术 (Arithmetic) | Elementary Math QA, Aqua-rat, GSM8K, Navigate | code gen + code exec |
| 代码 (Code) | Auto Debugging, Code Description | code gen |
| 搜索 (Search) | Anachronisms, Musique, Hindu Knowledge, Known Unknown | search |
| 字符串 (String) | K'th Letter Concatenation, Language Games, Date Understanding | code gen + code exec |
| 推理 (CoT) | Formal Fallacies, Hyperbation | 纯 LLM 推理 |

**检索策略**（两种）：
1. **Held-out 验证**：遍历所有 5 个集群，在约 50 个标注样本上选择表现最好的集群
2. **LLM 相似度排序**：用 few-shot prompt 让 LLM 判断任务对的相似度，按 log P("Similar")/P("Not similar") 排序

### 工具库

| 工具 | 实现 | 输入 | 输出处理 |
|------|------|------|---------|
| Search | SerpAPI (Google Search) | `Qi: [search]` 后的查询文本 | 提取 answer box 或 top-2 搜索结果片段 |
| Code Generation | Codex (code-davinci-002) | `Qi: [generate python code]` 后的指令（作为 Python 注释传入） | 生成的代码片段追加到程序中 |
| Code Execution | Python 虚拟环境 | 上一步生成的代码片段 `#(i-1)` | 执行结果（变量值）注入程序 |

### 实验结果

**主要发现**：

| 对比维度 | BigBench 库内任务 | BigBench 测试任务 | MMLU |
|---------|------------------|------------------|------|
| ART vs Few-shot | **+14.9%** | **+10.8%** | **+8.6%** |
| ART vs AutoCoT | **+17.17%** | **+22%** | 显著优势 |
| 工具使用增益 | **+7.91%** | **+12.3%** | - |

**关键数据点**：
- 在 **算术任务** 上工具使用增益最大：GSM8K 从 53.4%（无工具）→ 71.0%（有工具），Aqua-rat 从 36.29% → 54.20%
- 工具在约 **95%** 的测试实例中被调用
- ART 在 **32/34** BigBench 任务和 **全部** MMLU 任务上匹配或超越 AutoCoT
- **人类反馈**效果：在 12 个测试任务上，少量编辑（添加步骤/修正代码/新增工具）使 ART 超越 GPT-3 最佳结果平均 **20%+**

**与 GPT-3 Best 对比**：
- 在库内任务中，ART 在 5/8 个有对比数据的任务上更强或持平
- 在测试任务中，ART 在算术/搜索任务上表现突出，但在需要精细代码编辑的任务（如 Language Games、Code Description）上仍有差距

### 与相关工作的对比

| 特性 | CoT | AutoCoT | Toolformer | **ART** |
|------|-----|---------|------------|---------|
| 多步推理 | ✓ | ✓ | | ✓ |
| 低监督需求 | | ✓ | ✓ | ✓ |
| 工具使用 | | | ✓ | ✓ |
| 可扩展库 | | | | ✓ |
| 跨任务迁移 | | ✓ | ✓ | ✓ |
| 人类反馈 | ✓ | | | ✓ |

**ART 的独特优势**：同时具备跨任务迁移、可扩展工具库、人类反馈接入三大特性，且不需要微调 LLM。

### 局限性

1. **代码生成错误的级联效应**：代码生成（Codex）的错误会导致后续步骤全部出错，在 Language Games、Code Description 等任务上表现不佳
2. **依赖 LLM 能力**：ART 的性能上限受限于底层 LLM（InstructGPT）的推理能力
3. **任务库覆盖范围**：当前仅覆盖 5 个技能集群，对于超出这些集群的任务类型，检索到的示范可能不够相关
4. **搜索工具的不稳定性**：搜索结果随时间变化，可能影响可复现性

## 🧪 练习题

**Q1**：ART 使用 PeG 结构化程序格式而非自由形式的 CoT，这带来了哪些具体优势？如果将 PeG 替换为自由形式的自然语言推理链，你预期会在哪些方面产生性能下降？

> **提示**：考虑三个方面——(1) 工具调用的自动解析与暂停/恢复机制；(2) 结构化格式对 LLM 推理质量的引导作用（实验中 ART w/o tools 已经比 AutoCoT 高 8%）；(3) 人类反馈的可操作性（编辑结构化步骤 vs 编辑自由文本）。

**Q2**：论文中 ART 在算术任务上的工具使用增益（+21.85%）远大于搜索任务上的增益（+4.0%），请分析可能的原因，并思考如何提升搜索工具的增益。

> **提示**：算术任务中代码执行提供了**确定性的精确计算**，而搜索工具返回的是**非结构化文本片段**，LLM 仍需从中提取和推理。可以考虑改进搜索结果的后处理（如结构化提取）、使用更精准的知识库 API 替代通用搜索等。

**Q3**：ART 的人类反馈机制（编辑程序 + 扩展工具库）与 RLHF（如 InstructGPT 的训练方式）有什么本质区别？各自的优劣是什么？

> **提示**：ART 的反馈是**符号级别的即时编辑**（修改推理步骤/添加工具），无需重新训练，但只影响被编辑的特定任务示范；RLHF 是**参数级别的全局优化**，能泛化到更多场景，但需要大量标注数据和计算资源。思考两者是否可以互补。