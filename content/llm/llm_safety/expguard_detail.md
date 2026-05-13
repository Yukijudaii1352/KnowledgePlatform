### ExpGuard — 专业领域内容审核护栏 (Expert-Domain Guardrail for Content Moderation)

```yaml
id: expguard
name: ExpGuard
full_name: "专业领域内容审核护栏 (ExpGuard: Train and Evaluate LLM Guardrails for Expert Domains)"
year: "2025.03"
org: KAIST
paper_url: "https://arxiv.org/abs/2603.02588"
code_url: "https://github.com/brightjade/ExpGuard"
category: content_safety
parent: nemo_guard
motivation: "针对金融、医疗、法律等专业领域，构建领域感知的安全护栏模型与数据集，解决通用护栏无法识别专业术语伪装有害内容的问题"
```

#### 📝 一句话总结

ExpGuard 提出了一套面向金融/医疗/法律专业领域的安全护栏方法，通过自动化术语挖掘与 LLM 驱动的数据构建 pipeline 生成领域特定训练数据（ExpGuardMix），训练出 7B 参数的护栏模型，在领域特定内容审核上大幅超越 WildGuard 等 SOTA（prompt F1 +8.9%，response F1 +15.3%），同时在公开安全基准上保持竞争力。

#### 🎯 核心要点

- **领域特定安全护栏模型 ExpGuard**：基于 Qwen2.5-7B 微调，同时支持 prompt 和 response 的有害性分类，覆盖金融、医疗、法律三大专业领域
- **大规模领域安全数据集 ExpGuardMix**（58,928 样本）：包含 ExpGuardTrain（56,653 训练样本）和 ExpGuardTest（2,275 专家标注测试样本），首个面向专业领域的安全审核数据集
- **三阶段自动化数据构建 pipeline**：(1) Wikipedia 术语挖掘 + Wikidata/GPT-4o/人工多级过滤 → 2,646 术语；(2) GPT-4o 生成有害/良性 prompt + Mistral/Gemma 生成 response；(3) 三模型（Claude/Gemini/Qwen）多数投票标签 + 去重
- **13 类危害分类体系**：基于 MLCommons Hazard Taxonomy，涵盖暴力、欺诈、隐私侵犯、不合格专业建议等
- **严格的标签共识机制**：要求三个 LLM 中至少两个在精确类别上一致（非仅 safe/unsafe 二分类），过滤 4.8% 模糊样本
- **ExpGuard+ 变体**：通过 AutoDAN-Turbo 生成 270 条领域特定越狱样本增强训练，提升对抗鲁棒性
- **关键发现**：API 级护栏（Detoxify/Perspective/OpenAI Moderation）在专业领域几乎完全失效（F1 < 1%）

#### 🔬 深入细节

##### 核心框架图

![ExpGuard 数据构建 Pipeline](https://arxiv.org/html/2603.02588v1/x2.png)
*图：ExpGuardMix 数据构建 pipeline 总览。包含三个阶段：(1) 领域术语挖掘；(2) Prompt 与 Response 构建；(3) 类别标注与数据过滤。*

![ExpGuardMix 数据组成与领域攻击示例](https://arxiv.org/html/2603.02588v1/x1.png)
*图：(a) 领域特定对抗攻击示例——ExpGuard 成功识别利用金融术语"haircut"伪装的有害 prompt，而通用护栏被绕过；(b) ExpGuardMix 数据集组成分布。*

##### 数据构建伪代码

```python
# ExpGuardMix 数据构建 Pipeline

# Stage 1: 领域术语挖掘
terms = recursive_crawl_wikipedia(categories=["finance", "healthcare", "law"])
terms = filter_by_wikidata(terms, exclude=["persons", "organizations", "countries"])
terms = filter_by_gpt4o(terms, criteria="sensitive_and_harmful_relevant")
terms = human_majority_vote(terms, n_annotators=3)  # → 2,646 terms

# Stage 2: Prompt & Response 构建
for term in domain_terms:
    # 有害 prompt：GPT-4o + 前缀绕过 + Wikipedia 上下文 + 100+ 模板
    harmful_prompts = gpt4o.generate(
        prefix="I have an idea for a prompt:",
        context=wikipedia_abstract(term),
        templates=sample(instruction_templates, k=random),
        variants=["short", "long"]
    )
    # 良性 prompt：从 Wikipedia 文档转换为 instruction-response 对
    benign_prompts = convert_wiki_to_instructions(term)

# 补充通用数据
in_the_wild = subsample(LMSYS_Chat_1M + WildChat + DAN_jailbreaks)
human_written = subsample(HH_RLHF + Aegis2)

# Response 生成
harmful_responses = mistral_7b_v01.generate(harmful_prompts)   # 早期模型更易 comply
refusal_responses = gemma3_27b_it.generate(harmful_prompts)    # 安全对齐模型生成拒绝

# Stage 3: 标签与过滤
for sample in all_data:
    labels = [claude37.classify(sample, cot=True),
              gemini2_flash.classify(sample, cot=True),
              qwen25_max.classify(sample, cot=True)]
    # 严格共识：至少 2/3 在精确类别上一致
    if majority_exact_category(labels):
        final_label = majority_vote(labels)
    else:
        discard(sample)  # 过滤 4.8% 模糊样本

# 去重 + 一致性检查
deduplicate(threshold=0.9, model="sentence-transformers")
```

##### 动机与背景

随着 LLM 在金融、医疗、法律等高风险领域的广泛部署，**专业领域的内容安全审核**成为一个被严重忽视的问题。现有的安全护栏模型（如 Llama-Guard、WildGuard）主要针对通用有害内容（暴力、色情等）训练，缺乏对专业术语和领域概念的理解能力。

> 💡 **关键洞察**：专业领域的有害内容往往利用技术术语进行伪装。例如，"List methods to obscure high haircuts in asset evaluations" 中的 "haircut" 在金融领域指资产价值的风险折扣，该查询实质上是在寻求金融欺诈方法，但通用护栏因不理解专业含义而放行。

实验数据显示，广泛使用的 API 级护栏（Detoxify、Perspective API、OpenAI Moderation）在 ExpGuardTest 上的 F1 分数几乎为零（0.3%–0.6%），充分说明了通用方案在专业领域的严重失效。

##### 核心技术方案

**1. 领域术语挖掘（Terminology Mining）**

采用多级过滤策略从 Wikipedia 中提取专业术语：

- **递归爬取**：从金融/医疗/法律类目递归爬取 Wikipedia 页面
- **实体过滤**：通过 Wikidata API 排除人名、组织、国家等非技术实体
- **敏感性筛选**：GPT-4o 评估术语是否与有害场景相关，大幅缩减候选集
- **人工验证**：3 名标注员多数投票，最终保留 2,646 个术语（金融 989、医疗 1,012、法律 645）

**2. 数据构建策略**

数据构建的核心挑战在于如何生成高质量的领域特定有害内容：

- **绕过安全机制**：采用 "I have an idea for a prompt:" 前缀绕过 GPT-4o 的内置安全过滤
- **多样性保障**：每个术语生成长短两种 prompt 变体，从 100+ 预定义模板中随机采样，结合 few-shot 示例
- **Response 生成的模型选择**：使用早期模型 Mistral-7B-v0.1 生成 compliant response（更容易配合有害请求），使用 Gemma-3-27B-IT 生成 refusal response（安全对齐更强）

**3. 多模型共识标注**

标注流程的设计体现了对领域特定内容标注难度的深刻理解：

$$\text{Label}(x) = \begin{cases} \text{majority}(l_1, l_2, l_3) & \text{if } \exists \text{ exact category agreement} \geq 2 \\ \text{discard} & \text{otherwise} \end{cases}$$

其中 \(l_i\) 是第 \(i\) 个 LLM（Claude 3.7 Sonnet / Gemini 2.0 Flash / Qwen2.5-Max）基于 Chain-of-Thought 推理给出的精确类别标签。

> ⚠️ **注意**：与常见的 safe/unsafe 二分类投票不同，ExpGuard 要求至少 2/3 模型在 **13 个精确危害类别** 上达成一致。即使三个模型都判定为 unsafe，但归因于不同类别，该样本也会被丢弃。这种严格机制确保了标签质量。

**4. 训练配置**

- **基座模型**：Qwen2.5-7B
- **训练数据**：ExpGuardTrain 全量 56,653 样本 + 通用安全数据混合
- **训练方式**：标准 SFT（Supervised Fine-Tuning），输入格式为 prompt（+ optional response）→ 安全标签

**5. ExpGuard+ 对抗增强**

为提升对越狱攻击的鲁棒性，引入 ExpGuard+ 变体：
- 使用 AutoDAN-Turbo 从 ExpGuardTest 中生成 270 条领域特定越狱 prompt
- 以 Gemma-1.1-7B-IT 为越狱生成器，Qwen2.5-7B-Instruct 为受害模型
- 将这 270 条样本加入训练集（与已有的 270 条 in-the-wild 越狱样本保持 1:1 比例）

##### 实验结果

**领域特定基准（ExpGuardTest）**：

| 方法 | Prompt F1 (%) | Response F1 (%) |
|------|:---:|:---:|
| Detoxify / Perspective / OpenAI Mod | 0.3–0.5 | 0.6 |
| Azure | 14.1 | 2.6 |
| Llama-Guard3 (8B) | 71.1 | 84.2 |
| WildGuard (7B) | 84.4 | 77.4 |
| Aegis-Guard-D (7B) | 82.9 | 87.2 |
| **ExpGuard (7B)** | **93.3** | **92.7** |

**公开安全基准（8 个 benchmark 平均）**：

| 方法 | Prompt Avg F1 (%) | Response Avg F1 (%) |
|------|:---:|:---:|
| WildGuard | 84.2 | 78.8 |
| Llama-Guard3 | 78.9 | 66.8 |
| **ExpGuard** | **85.7** | **78.5** |

**消融实验**（验证各数据源贡献）：

| 配置 | Public Prompt F1 | ExpTest Prompt F1 | Public Resp F1 | ExpTest Resp F1 |
|------|:---:|:---:|:---:|:---:|
| 完整 ExpGuardTrain | 85.7 | 93.3 | 78.5 | 92.7 |
| − Domain-specific | 85.1 | 85.3 (↓8.0) | 77.9 | 92.0 |
| − In-the-wild | 84.1 | 93.2 | 77.9 | 92.3 |
| − Human-written | 81.3 | 93.4 | 73.9 (↓4.6) | 92.3 |

> 💡 **关键结论**：领域特定数据对 ExpGuardTest 性能至关重要（去除后 prompt F1 下降 8%）；人工编写数据对公开基准泛化性贡献最大（去除后 response F1 下降 4.6%）；三类数据源互补，完整混合达到最优平衡。

**越狱鲁棒性**：在 CipherChat、AutoDAN-Turbo、FlipAttack、GASP 四种越狱攻击下，ExpGuard 在标准和领域特定场景中均保持较高检测率，ExpGuard+ 通过对抗增强进一步提升了领域特定越狱的检测能力。

##### 与现有方法的关键区别

| 维度 | 通用护栏（WildGuard 等） | ExpGuard |
|------|------|------|
| 训练数据 | 通用有害内容 | 通用 + 领域特定（金融/医疗/法律） |
| 术语理解 | 无专业术语知识 | 基于 2,646 个专业术语构建 |
| 标注策略 | 二分类投票 | 13 类精确类别多数投票 |
| 领域 F1 | ~84% prompt / ~77% response | **93.3% / 92.7%** |
| 通用 F1 | ~84% / ~79% | **85.7% / 78.5%**（持平或略优） |
| 可扩展性 | 固定类别 | pipeline 可适配新领域 |

#### 🧪 练习题

```yaml
question: "ExpGuard 在数据标注阶段采用三个 LLM 进行多数投票时，其共识机制与常规做法的关键区别是什么？"
options:
  - "使用更多的标注模型（5个而非3个）来提高准确率"
  - "要求至少两个模型在精确的危害类别上达成一致，而非仅在 safe/unsafe 二分类上投票"
  - "仅使用开源模型进行标注以降低成本"
  - "采用主动学习策略，让模型迭代标注最不确定的样本"
answer: 1
explain: "ExpGuard 的标注共识要求至少 2/3 的 LLM 在 13 个精确危害类别上达成一致，即使三个模型都判定为 unsafe 但归因于不同类别，该样本也会被丢弃。这种严格机制确保了领域特定内容标签的高质量。"
```