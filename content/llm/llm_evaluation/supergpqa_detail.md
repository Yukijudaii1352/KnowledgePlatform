### SuperGPQA：覆盖 285 个研究生学科的大规模专业问答基准
```yaml
id: supergpqa
name: SuperGPQA
full_name: 超级研究生级问答 (SuperGPQA)
year: "2025"
org: ByteDance
paper_url: https://arxiv.org/abs/2501.12345
category: frontier_2026
parent: gpqa
motivation: 285学科26K问题大规模扩展
```

#### 📝 一句话总结
SuperGPQA 提出一个覆盖 13 个学科门类、72 个一级领域、285 个研究生级子学科的 26,529 题大规模专业基准，通过专家源筛选、众包转写和 Human-LLM 协同质检，解决了 GPQA/MMLU-Pro 对长尾专业知识覆盖不足的问题。

#### 🎯 核心要点
- 覆盖范围：26,529 道题，覆盖 13 个 discipline、72 个 field、285 个 graduate-level subfield，每个子学科至少约 50 题。
- 组织来源：ByteDance Seed 与 2077.AI 的 M-A-P 团队，官方项目页为 `https://supergpqa.github.io/`。
- 链接核对：任务 JSON 中的 `paper_url` 指向 arXiv:2501.12345，但该编号实际是天体物理论文；SuperGPQA 正确公开论文是 arXiv:2502.14739。
- 数据流程：Source Screening → Transcription → Quality Inspection 三阶段 Human-LLM 协作。
- 质量控制：规则检查、LLM 质检、专家复核三层过滤，重点发现格式错误、无效题、极端/否定式问题、多模态依赖、领域不相关、不可解和低区分度样本。
- 难度机制：用 SOTA LLM 的响应一致性和错误模式标记可疑题，专家可联网复查；易题会根据模型答题结果进一步裁剪以保持区分度。
- 评测发现：DeepSeek-R1 在论文版本中最高约 61.82%，说明当前强模型在长尾专业领域仍有显著提升空间。

#### 🔬 深入细节
![SuperGPQA 官方概览图](https://supergpqa.github.io/assets/overview-9WOdluUF.png)
*图：SuperGPQA 官方项目页概览，展示其作为跨 285 个研究生级学科的综合评测基准。*

```python
# SuperGPQA 数据构造与过滤伪代码
candidate_questions = []

# 1. Source Screening: 只允许专家选择可信来源
for subfield in graduate_subfields_285:
    sources = expert_collect_credible_sources(subfield)
    for raw in sources:
        if raw.has_solution_or_expert_verified_answer:
            candidate_questions.append({"raw": raw, "subfield": subfield})

# 2. Transcription: 众包标注者把原题转成英文多选题
for item in candidate_questions:
    q = translate_to_academic_english(item.raw)
    q = convert_to_multiple_choice(q)
    q = standardize_statement_combination_questions(q)
    q = add_region_specific_context_if_needed(q)
    q.difficulty = annotator_estimate_difficulty(q)
    q.reliability = annotator_estimate_reliability(q)

# 3. Quality Inspection: 规则 + LLM + 专家协同质检
for q in candidate_questions:
    if rule_based_precheck_fails(q):
        discard(q)
        continue

    model_outputs = [m.solve_and_tag(q) for m in sota_llms]
    tags = llm_quality_checks(q, model_outputs)
    suspicious = (
        tags.invalid or tags.negative_extreme or tags.multimodal or
        tags.field_irrelevant or tags.incomplete or
        many_models_choose_same_wrong_option(model_outputs) or
        too_many_models_solve_correctly(model_outputs)
    )

    if suspicious:
        q = expert_review_with_web_access(q, min_minutes=30)

    if is_reliable_and_discriminative(q):
        SuperGPQA.append(q)
```

SuperGPQA 针对的是现有专业能力评测的覆盖缺口。GPQA 只有数百道高难 Google-proof 问题，MMLU-Pro 有 12K 级题量但仍偏向较常见学科；而现实专业知识包含大量长尾领域，例如轻工、农业、服务业相关专业、军事、林业工程、传统医学、音乐学、图书情报等。SuperGPQA 的基本假设是：若 benchmark 只覆盖数学、物理、计算机和少数常见学科，就无法判断模型是否真正接近“广义专业能力”。

论文把数据构造拆成三阶段。第一阶段 Source Screening 由专家完成，专家定义为已拥有或正在攻读 PhD 的人员。作者早期曾让众包标注者自己找题源，但发现他们难以判断高专业门槛题源的可信度，导致大量题被专家认为过易或不可靠。因此最终流程要求专家提供可信原题来源和截图，优先级从“带解答的教材例题”到“专家认为正确的仅答案题”逐级下降。这个阶段的核心不是生成题，而是建立可追溯的专业来源。

第二阶段 Transcription 由众包标注者把原题转写为可统一评测的英文多选题。具体操作包括把非英文题翻译成学术英语，把非选择题改写成选择题，补充地区限定信息，并标准化“判断若干陈述哪些正确/错误”的组合题。后者很重要，因为组合题如果直接让 LLM 生成干扰项，很容易出现多个选项等价正确、选项覆盖不完整或符号混乱。论文中的机制是先抽取陈述，再设计不同陈述组合，使选项空间可控。

第三阶段 Quality Inspection 是 SuperGPQA 与普通众包题库最大的区别。规则检查先过滤明显格式错误，例如缺少答案、选项不规范、题干无法独立理解等。随后多个 SOTA LLM 对候选题生成回答和质量标签，检查维度包括 validity、negative and extreme inquiry detection、multimodal exclusion、field relevance evaluation、completeness assessment，以及基于模型响应的 discrimination tagging。可疑题再交给专家联网复核，论文称专家在复查单题时平均投入超过 30 分钟。

LLM 在质检中不是被当作最终裁判，而是作为“可疑模式探测器”。一个关键经验是：如果多个强模型选择同一个错误选项，这道题往往高度可疑，可能因为网上练习站点存在错误解析，而 LLM 在预训练或检索式记忆中复现了同样错误。这个现象反过来帮助标注团队发现原始题源或解析的问题。可用一个风险分数表达：

$$
\mathrm{risk}(q)=\alpha\cdot\mathbf{1}[\text{formatError}\ + \beta\cdot\mathbf{1}[\text{sameWrong}(q)] + \gamma\cdot\mathbf{1}[\text{lowRelevance}(q)] + \delta\cdot\mathbf{1}[\text{tooEasy}(q)]
$$

其中 \(\text{sameWrong}(q)\) 表示多个模型集中选择同一错误项，\(\text{tooEasy}(q)\) 表示强模型普遍答对、区分度不足。实际论文不以这个公式实现系统，但它概括了三类筛选信号：形式有效性、答案可靠性、模型区分度。

统计上，SuperGPQA 最终包含 26,529 题，平均每题 9.67 个选项，平均题干长度约 58.42 tokens，平均选项长度约 12.64 tokens。学科分布呈 STEM-heavy：Science 9,838 题、Engineering 7,892 题、Medicine 2,755 题，占比较高。作者解释这不是预设偏置，而是严格质检后自然保留下来的结果，因为 STEM 题更容易获得可验证推理链和唯一答案。非 STEM 学科题量较少，但仍被保留用于检测模型在文学、历史、哲学、法律、管理等专业场景下的能力边界。

难度设计不是只靠人工主观标注。论文把题按 easy / middle / hard 划分，并报告约 42.33% 题目需要数学计算或形式推理，其中 Science 和 Engineering 的计算比例更高。强模型在 hard split 上下降明显，例如 DeepSeek-R1 在 easy 和 middle 上约 63 分，但 hard 约 56.87；较弱模型下降更剧烈。这种分层说明 SuperGPQA 既能测试知识面，也能测试模型在复杂推理、公式应用和专业约束下的稳定性。

评测协议上，reasoning models 和 chat models 使用 zero-shot，base models 使用类似 MMLU-Pro 的 five-shot。设基准题集为 \(Q\)，每题有子学科 \(s(q)\)、选项集合 \(O_q\)、正确答案 \(a_q\)，模型 \(M\) 的总体 sample accuracy 为：

$$
\mathrm{Acc}_{sample}(M)=\frac{1}{|Q|}\sum_{q\in Q}\mathbf{1}[E(M(q,O_q,s(q)))=a_q]
$$

论文还报告按 subfield、field、discipline 聚合的成绩，以避免某些大类题量过多主导总体分数。这个处理对 SuperGPQA 尤其重要，因为 285 个子学科题量虽有下限，但大类之间天然不均衡；只看 sample average 可能高估模型在题量大的工程/科学方向上的优势，低估长尾领域短板。

与 GPQA 相比，SuperGPQA 的创新不只是“更多题”。GPQA 强调少量专家难题和防搜索污染，SuperGPQA 强调学科体系覆盖、规模化标注管理和 Human-LLM 协同过滤。与 MMLU-Pro 相比，SuperGPQA 的学科粒度更细，从 14 大类扩展到 285 子学科，并特别补充现实职业专业中的长尾知识。它更像一个专业能力地图，而不是单一高难考试。

> ⚠️ 注意：任务清单中的 arXiv:2501.12345 与 SuperGPQA 不匹配；本解读保留元信息中的原始 `paper_url`，但正文事实依据 SuperGPQA 官方论文 arXiv:2502.14739 和官方项目页。若上游数据需要修正，应把 `paper_url` 改为 `https://arxiv.org/abs/2502.14739`。

#### 🧪 练习题
```yaml
question: "SuperGPQA 的 Human-LLM 协同质检中，为什么多个强模型选择同一个错误选项会被视为高风险信号？"
options:
  - "因为这说明题目一定太简单，应直接保留"
  - "因为这可能暴露原始题源或网上解析存在错误，模型复现了同一错误模式，需要专家复核"
  - "因为模型一致错误可以自动确定正确答案"
  - "因为这种题不需要人工检查"
answer: 1
explain: "论文指出多个 SOTA LLM 同错往往意味着题源或网络解析可能有问题，不能直接信任模型多数意见，必须进入专家复核。"
```
