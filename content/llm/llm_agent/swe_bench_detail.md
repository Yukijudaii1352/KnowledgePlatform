### SWE-bench: Can Language Models Resolve Real-World GitHub Issues?

```yaml
id: swe_bench
name: SWE-bench
full_name: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?"
year: 2024
org: Princeton University
paper_url: https://arxiv.org/abs/2310.06770
category: benchmark
parent: —
motivation: 首个基于真实GitHub issue的软件工程问题解决能力评测
```

#### 📝 一句话总结

SWE-bench 提出了一个基于真实 GitHub issue 和 pull request 的软件工程基准测试，包含来自 12 个主流 Python 仓库的 2,294 个任务实例，用于评估语言模型在真实代码库中定位并修复 bug 的能力，揭示了当前最强模型（Claude 2）仅能解决 4.80% 的问题，凸显了实际软件工程任务的巨大挑战。

#### 🎯 核心要点

- **真实世界基准**：从 12 个高星 Python 开源仓库（Django、scikit-learn、sympy、Flask 等）中收集 2,294 个经过严格筛选的 issue-PR 对，每个任务都有可执行的单元测试验证
- **三阶段自动化构建流水线**：Repo Selection → Attribute-based Filtering → Execution-based Filtering，确保每个任务实例具备可复现的测试环境和明确的 fail-to-pass 测试用例
- **任务定义**：给定 issue 描述文本和对应代码库快照，模型需生成一个能通过所有相关测试的代码补丁（patch）
- **评估框架**：基于 fail-to-pass（修复目标测试）和 pass-to-pass（不破坏已有功能）两类测试的执行结果进行自动化评判
- **SWE-Llama 微调模型**：基于 CodeLlama（7B/13B）使用 LoRA 在 19,000 个来自 37 个非重叠仓库的 issue-PR 对上微调，显著优于基础模型
- **多种检索策略**：BM25 和 Oracle 两种上下文检索方式，探索不同信息量对模型性能的影响
- **关键发现**：所有模型在该基准上表现极差，最佳结果为 Claude 2 在 Oracle 检索下的 4.80%，说明真实软件工程问题远超当前 LLM 能力

#### 🔬 深入细节

![SWE-bench 总览示意图](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x1.png)
*图：SWE-bench 构建与评估流程总览。左侧展示从 GitHub 仓库中自动化收集和筛选任务实例的三阶段流水线，右侧展示模型接收 issue 文本和代码上下文后生成补丁并通过测试验证的评估流程。*

##### 动机与背景

现有代码生成基准（如 HumanEval、MBPP、APPS）主要评估模型在**独立函数级别**的代码生成能力，任务通常是根据自然语言描述从零编写一个短函数。然而，真实的软件工程工作远不止于此——开发者需要在**大规模代码库**中理解跨文件依赖关系、定位 bug 根因、设计符合项目风格的修复方案，并确保修改不会引入新的回归问题。SWE-bench 正是为了填补这一评估空白而设计的。

与传统基准不同，SWE-bench 的每个任务都来自**真实的开源项目**，issue 描述由真实用户撰写（可能包含 bug 报告、功能请求、代码片段、错误堆栈等），解决方案涉及对一个或多个文件的修改。这使得 SWE-bench 能够评估模型在以下方面的综合能力：代码理解、bug 定位、跨文件编辑、测试意识以及对项目规范的遵循。

##### 三阶段构建流水线

SWE-bench 的数据收集采用了一个精心设计的三阶段自动化流水线：

**Stage I — 仓库选择（Repo Selection）**：从 GitHub 上筛选使用广泛、维护活跃、测试覆盖良好的 Python 仓库。最终选定 12 个仓库，涵盖 Web 框架（Django、Flask）、科学计算（scikit-learn、sympy、matplotlib）、开发工具（pylint、pytest）等多个领域。

**Stage II — 属性过滤（Attribute-based Filtering）**：对每个仓库中的 pull request 进行初步筛选，要求：(1) PR 必须关联至少一个 issue；(2) PR 必须修改至少一个测试文件（确保有可验证的测试）；(3) PR 已被合并到主分支。这一步将候选数量从数万缩减到数千。

**Stage III — 执行过滤（Execution-based Filtering）**：这是最关键的一步。对每个候选 PR，系统会：
1. 检出 PR 合并前的代码库版本（base commit）
2. 应用 PR 中的测试文件修改（但不应用源代码修改）
3. 运行测试套件，识别出**fail-to-pass 测试**（在 base commit 上失败、在合并后通过的测试）和 **pass-to-pass 测试**（始终通过的测试）
4. 仅保留至少有一个 fail-to-pass 测试的实例

这种执行级验证确保了每个任务实例都有明确的"正确性标准"——模型生成的补丁必须让 fail-to-pass 测试通过，同时不破坏 pass-to-pass 测试。

![SWE-bench 数据分布](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x2.png)
*图：SWE-bench 任务实例的统计分布，包括 issue 描述长度、代码库规模、需要编辑的文件/函数/行数等维度。*

##### 任务形式化与评估机制

SWE-bench 的任务被形式化定义为：给定一个 issue 文本描述 \(I\) 和代码库快照 \(C\)（对应 base commit），模型需要生成一个补丁 \(P\)，使得将 \(P\) 应用到 \(C\) 后，所有 fail-to-pass 测试通过且所有 pass-to-pass 测试保持通过。

评估指标为 **% Resolved**，即成功解决的任务实例占总数的百分比。一个任务被视为"解决"当且仅当：

$$\text{Resolved}(P) = \mathbb{1}\left[\text{F2P}(C \oplus P) = \text{PASS} \wedge \text{P2P}(C \oplus P) = \text{PASS}\right]$$

其中 \(\text{F2P}\) 和 \(\text{P2P}\) 分别表示 fail-to-pass 和 pass-to-pass 测试集的执行结果。

论文探索了两种上下文检索策略来为模型提供相关代码：
- **BM25 检索**：使用 issue 文本作为查询，对代码库中的文件/函数进行 BM25 检索，选取最相关的代码片段
- **Oracle 检索**：直接提供 gold patch 中涉及的文件内容（上界参考）

同时探索了两种输出格式：
- **Patch 格式**：模型直接生成 unified diff 格式的补丁
- **Full File 格式**：模型输出完整的修改后文件

```python
# SWE-bench 评估流程伪代码
def evaluate_instance(model, issue_text, codebase, tests):
    # Step 1: 检索相关代码上下文
    context = retrieve_context(issue_text, codebase)  # BM25 or Oracle
    
    # Step 2: 构造 prompt（issue + context）
    prompt = format_prompt(issue_text, context)
    
    # Step 3: 模型生成补丁
    patch = model.generate(prompt)
    
    # Step 4: 应用补丁到代码库
    patched_codebase = apply_patch(codebase, patch)
    
    # Step 5: 运行测试验证
    f2p_result = run_tests(patched_codebase, tests['fail_to_pass'])
    p2p_result = run_tests(patched_codebase, tests['pass_to_pass'])
    
    return f2p_result == PASS and p2p_result == PASS
```

##### SWE-Llama 微调策略

为了建立更强的基线，作者基于 CodeLlama（7B 和 13B）使用 LoRA 进行了微调，得到 SWE-Llama 系列模型。训练数据来自 37 个与 SWE-bench 测试集**无重叠**的 Python 仓库，共收集约 19,000 个 issue-PR 对。

微调采用标准的指令跟随格式：输入为 issue 描述 + 检索到的代码上下文，输出为对应的 gold patch。使用 LoRA（rank=64, alpha=16）在 4 个 A100 GPU 上训练 2 个 epoch。

> 💡 关键：SWE-Llama 13B 在 BM25 检索下达到 1.00% 的解决率，虽然绝对值不高，但相比基础 CodeLlama 13B 的 0.70% 有显著提升，证明了领域微调的价值。

##### 实验结果与关键发现

论文对多个模型进行了系统评估，核心结果如下：

| 模型 | BM25 检索 (% Resolved) | Oracle 检索 (% Resolved) |
|------|----------------------|------------------------|
| Claude 2 | 1.96% | **4.80%** |
| GPT-4 | 0.17% | 1.74% |
| ChatGPT-3.5 | 0.52% | 0.70% |
| SWE-Llama 13B | 1.00% | 3.00% |
| SWE-Llama 7B | 0.70% | 2.22% |
| CodeLlama 13B | 0.70% | 1.22% |

**关键发现**：

1. **整体表现极差**：即使是最强的 Claude 2 在 Oracle 检索（已知需要修改哪些文件）下也仅解决 4.80% 的问题，说明真实软件工程任务对当前 LLM 构成巨大挑战。

2. **上下文检索至关重要**：Oracle 检索相比 BM25 检索带来显著提升（Claude 2: 1.96% → 4.80%），表明**定位正确的代码文件**本身就是一个核心难点。

3. **Patch 格式优于 Full File 格式**：直接生成 diff 补丁比输出完整文件效果更好，因为后者需要模型精确复制大量未修改的代码。

4. **难度与上下文长度正相关**：需要更多代码上下文的任务（涉及更多文件、更长函数）解决率更低，模型倾向于只解决需要少量局部修改的简单问题。

5. **模型生成的补丁偏简单**：成功解决的任务通常只涉及 1 个文件、少量行的修改，而 SWE-bench 中许多任务需要跨文件的复杂编辑。

> ⚠️ 注意：SWE-bench 的难度不仅来自代码生成本身，更来自于**理解模糊的 issue 描述**、**在大型代码库中定位问题**、以及**生成符合项目规范的完整修复方案**这一综合挑战。

#### 🧪 练习题

```yaml
question: "SWE-bench 评估流程中，一个任务实例被判定为'已解决'的条件是什么？"
options:
  - "模型生成的补丁能够成功应用到代码库上"
  - "模型生成的补丁使 fail-to-pass 测试通过，且 pass-to-pass 测试保持通过"
  - "模型生成的补丁与 gold patch 完全一致"
  - "模型生成的补丁通过了代码审查（code review）"
answer: 1
explain: "SWE-bench 采用执行级评估，要求补丁同时满足两个条件：让原本失败的测试通过（fail-to-pass），且不破坏原本通过的测试（pass-to-pass），而非要求与标准答案完全匹配。"
```