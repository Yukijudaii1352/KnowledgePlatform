### SWE-bench: 软件工程问题基准 (SWE-bench)

```yaml
id: swebench
name: SWE-bench
full_name: 软件工程问题基准 (SWE-bench)
year: '2023.10'
org: Princeton
paper_url: https://arxiv.org/abs/2310.06770
category: evaluation
parent: agentbench
motivation: 用真实GitHub issue评测代码代理
```

#### 📝 一句话总结
> SWE-bench 提出了一个基于真实 GitHub 仓库 issue 的代码修复基准，包含 2294 个任务实例覆盖 12 个流行 Python 仓库，通过执行式单元测试验证模型生成的代码补丁，揭示了当前最强大模型（Claude 2）在 oracle 检索设置下也仅能解决 4.8% 的问题，同时开源了面向代码修复微调的 SWE-Llama 模型系列。

#### 🎯 核心要点
- **基准规模与范围**：2294 个任务实例，来自 12 个 GitHub 仓库（django、scikit-learn、matplotlib、sympy、pytest、requests、flask、sphinx、pylint、astropy、xarray、seaborn），时间跨度约 6 年
- **任务形式**：给定 issue 描述文本 + 完整代码库，要求模型生成补丁（patch）文件来解决 issue 描述的问题
- **评估方法**：执行式验证（execution-based evaluation）——在代码库中应用模型生成的补丁后运行相关单元测试，测试通过即视为解决
- **检索设置对比**：两种上下文提供方式——(1) oracle 检索（直接提供 gold patch 所涉及文件的完整内容）(2) BM25 检索（基于 issue 文本自动检索相关文件）
- **主要结果**：Claude 2 在 oracle 设置下解决率 4.8%，BM25 下仅 1.96%；GPT-4 分别为 1.63%（25% 随机子集）和 0.82%；Code Llama 在 oracle 下仅 0.2%
- **SWE-Llama 微调模型**：基于 Code Llama 在 SWE-bench 训练集上微调，SWE-Llama 13b 在 oracle 下达 4.0%（约等于 Claude 2），BM25 下仅 0.7%，揭示了对上下文分布偏移的敏感性
- **关键发现**：模型生成的补丁通常比 gold patch 短一半以上，倾向于只编辑单个文件，且生成的代码更简单、不充分利用第三方库或代码库结构
- **开源贡献**：完整基准、评估框架、训练数据、SWE-Llama 模型权重全部开源

#### 🔬 深入细节
![SWE-bench 示意图](https://ar5iv.labs.arxiv.org/html/2310.06770/assets/x1.png)
*图：SWE-bench 的核心框架或评测示意。*

##### 1. 任务构建流程

SWE-bench 的任务实例构建遵循完整的 open-source 协作流水线：

```
PyPI Top 5000 → Top 100 → 筛选有许可证的 GitHub 仓库
→ 收集所有PR → 筛选Merged+关联Issue+引入新测试的PR
→ 提取 base commit（修复前代码库状态）+ issue文本（问题描述）
→ 分离 test patch（测试用例）+ gold patch（实际修复方案）
→ 执行式验证（确保gold patch通过测试，未修改代码库时测试失败）
```

**关键设计选择**：
- **与现有基准的区别**：不同于 HumanEval（单函数补全，~175 tokens 上下文）或 Defects4J（Java 单语句 bug），SWE-bench 要求模型在数万行代码上下文中定位并修复 bug，上下文长度中位数约为 110K tokens
- **issue 文本处理**：聚合 PR 关联的所有 issue 的标题、正文及在 PR 首次提交时间戳之前的评论，避免泄露解决方案信息
- **补丁验证的两阶段检查**：(1) 未修改代码库时，必须至少有一项测试失败（确认 bug 真实存在）；(2) 应用 gold patch 后，所有相关测试必须通过

##### 2. 评估框架

模型生成的补丁通过 `git apply` 应用到代码库后，运行事先提取的测试用例：

- **通过标准**：所有测试通过（`before → fail` 且 `after → pass`）
- **评测指标**：成功率（resolved rate）= 通过的实例数 / 总实例数
- **过滤机制**：仅统计用户仓库运行成功的实例（不同模型的评分基于各自成功运行的任务子集，所有主实验基于 2294 个实例中至少一种设置下通过的实例）

##### 3. 检索策略

两种上下文检索策略对比如下：

| 策略 | 方式 | 上下文大小 | 结果（Claude 2） |
|------|------|-----------|------------------|
| **Oracle** | 直接提供 gold patch 编辑过的所有文件的完整内容 | 平均 ~6000 行 | 4.8% |
| **BM25** | 基于 issue 文本 + 代码库所有文件内容检索 Top-K | 平均 ~8000 行 | 1.96% |

Oracle 设置虽然提供了"作弊"级别的文件定位线索，但即使在此设置下顶级模型表现也极低，说明主要瓶颈不在检索而在于代码理解与编辑能力。

##### 4. SWE-Llama 训练

- **基础模型**：Code Llama 7b 和 13b（Rozière et al. 2023）
- **训练数据**：从 SWE-bench 训练集中选取 19183 个补丁文件，每条训练样本包含 [issue 描述, 代码库上下文, 目标补丁]
- **训练配置**：LoRA 微调（Hu et al. 2022），Flash Attention（Dao et al. 2022），Deepspeed Ulysses（Jacobs et al. 2023）支持长序列
- **关键发现**：SWE-Llama 13b oracle 性能 (4.0%) 接近 Claude 2 (4.8%)，但在 BM25 下骤降至 0.7%，说明微调模型对上下文分布偏移极为敏感——模型在训练时学会了编辑上下文中的每个文件，而在 BM25 设置下许多检索到的文件实际上不需要修改

##### 5. 深度分析发现

| 现象 | 数据证据 |
|------|----------|
| 模型倾向短编辑 | 模型生成补丁平均总行数 30.1 vs gold patch 74.5 行 |
| 单文件编辑倾向 | 模型几乎所有成功补丁仅编辑 1 个文件 vs gold patch 平均 1.7 个文件 |
| 不利用代码库结构 | 模型倾向写"原始 Python 代码"，不使用第三方库或项目已有工具函数 |
| "贪婪"修复策略 | 模型精确解决表面问题，缺乏 gold patch 中的结构性改进和预防性修复 |
| 生成补丁比生成全文件容易 | Claude 2 生成全文件仅 2.2% vs 生成补丁 4.8%（oracle 设置） |
| 难度与时间无关 | 2023 年前后的 issue 解决率无明显差异，排除模型"背诵"嫌疑 |

##### 6. 案例分析（sphinx-doc__sphinx-8713）

- **问题**：Sphinx 文档生成器的 napoleon 扩展在 `napoleon_use_param=True` 时未正确格式化 "Other Parameters" 文档关键字
- **Gold patch**：修改 `_parse_other_parameters_section` 函数，先检查配置设置，再复制 `_parse_parameters_section` 的行为
- **模型方案**：编辑了正确的函数，但错误地假设 `napoleon_use_param` 始终为 True，导致在配置为 False 的测试中失败
- **暴露问题**：模型可以定位相关代码，但缺乏对配置条件的细粒度推理能力

##### 7. 数据集特性统计

- **仓库覆盖**：12 个仓库涵盖 Web 框架（django、flask）、数据科学（scikit-learn、matplotlib、sympy、xarray、seaborn）、测试工具（pytest）、HTTP 库（requests）、文档工具（sphinx）、代码检查（pylint）、天文学（astropy）
- **实例分布**：django (917)、sympy (487)、matplotlib (254)、sphinx (229)、scikit-learn (131) 等
- **测试粒度**：每个实例平均包含 3-5 个新增测试函数，涵盖不同测试风格（unittest、pytest）
- **时间跨度**：PR 创建时间从 2017 年至 2023 年 6 月

##### 8. 局限性与未来方向

- 当前仅支持 Python 语言，计划扩展到更多编程语言
- 实验仅建立最简单直接的基线方法，鼓励未来探索 agent-based 方法、更大规模微调、与程序分析工具结合
- 仅依赖执行式测试不足以保证补丁质量——模型生成往往不如人类编写的方案全面、高效或可读

#### 🧪 练习题
```yaml
question: "SWE-bench 中设置 oracle 检索与 BM25 检索对比，最主要是为了区分哪两类能力瓶颈？"
options:
  - "代码生成速度与测试执行速度"
  - "文件定位/检索能力与真正的代码理解编辑能力"
  - "监督微调能力与强化学习能力"
  - "单文件补丁与多文件补丁的磁盘占用差异"
answer: 1
explain: "Oracle 直接给出 gold patch 涉及文件，几乎消掉文件检索问题；若此时成绩仍低，就说明更深的瓶颈在代码理解、条件推理与补丁编辑，而不仅是找错文件。"
```
