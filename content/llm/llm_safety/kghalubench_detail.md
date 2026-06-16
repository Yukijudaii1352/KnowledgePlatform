### KGHaluBench：知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)

```yaml
id: kghalubench
name: KGHaluBench
full_name: 知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)
year: "2026"
org: EACL
paper_url: https://aclanthology.org/2026.findings-acl.1/
category: hallucination
parent: factscore
motivation: 知识图谱自动化验证
```

#### 📝 一句话总结

KGHaluBench 提出用知识图谱动态生成多事实复合问题，并用实体级过滤与事实级校验自动验证 LLM 长答案，解决静态 QA/幻觉基准覆盖窄、难度不可控、只给单一幻觉率而难以解释幻觉来源的问题。它把幻觉拆成 breadth of knowledge 与 depth of knowledge 两类，使评测不仅能看模型答得准不准，还能判断模型是不认识实体，还是认识实体但记错细节。

> ⚠️ 资料校准：任务元信息中的 `paper_url` 指向 `2026.findings-acl.1`，与 KGHaluBench 不匹配；以下精读基于 ACL Anthology 实际页面 `https://aclanthology.org/2026.findings-eacl.206/` 与 arXiv HTML `https://arxiv.org/html/2602.19643v1`，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点

- 动态问题生成：从 Wikidata 等 KG 随机抽取 focal entity，再围绕该实体的一跳邻居和 relation-fact triple 生成开放式复合问题。
- 同时考察 breadth 与 depth：实体级是否对齐用于判断模型是否具备基础实体知识，事实级 triple 校验用于判断模型是否掌握具体细节。
- 三类输入属性：KG Triples 用于出题和事实验证，Entity Description 用于实体级语义对齐，Entity Statistics 用于估计实体流行度与题目难度。
- 难度建模：结合 entity popularity、entity type relevance、question complexity，用 sigmoid 生成问题难度 \(Q_d\)，再校准 weighted accuracy。
- 响应验证两阶段：Entity-Level Filter 先判定 aligned、hallucinated、abstained；只有 aligned response 进入 Fact-Level Check。
- 实体级过滤：结合语义相似度和 token overlap，并按 70:30 加权，过滤与 focal entity 概念不对齐的回答。
- 事实级校验：把 KG tuple 改写成自然语言事实句，再通过 NLI entailment、LLM entailment 与 expert decision filter 判断是否被回答正确表达。
- 新指标：\(W_a\) 按题目难度校准 accuracy，\(HaluBOK\) 衡量 breadth-of-knowledge 幻觉，\(HaluDOK\) 衡量 depth-of-knowledge 幻觉。
- 评测设置：论文实验使用约 25 个开源与闭源前沿模型，每个模型多轮回答 150 个动态问题并取均值。
- 关键发现：小模型更常在实体级失败，大模型能识别主题但仍会在具体事实上出错；高 abstention 可降低幻觉但会牺牲有用性。

#### 🔬 深入细节

![KGHaluBench 总体框架](https://arxiv.org/html/2602.19643v1/Figures/KGHaluBench_Framework6.png)
*图：KGHaluBench Figure 1，总体流程包括 Question Generation Module 与 Response Verification Module。*

KGHaluBench 的出发点是传统幻觉基准的两个不足。第一，静态 QA 数据集会过时，且覆盖的实体、主题、时间范围有限；模型可能因为见过题目或记住常见实体而取得虚高分数。第二，很多基准只给一个 accuracy 或 hallucination rate，无法解释模型为什么错：它到底完全不认识这个实体，还是知道实体但记错了某个关系？KGHaluBench 用 KG 动态采样实体和事实，使题目覆盖更广，再用分层验证区分 surface-level entity mismatch 与 fine-grained factual error。

Question Generation Module 的核心是 focal entity。系统先从 KG 批量采样实体，记录实体 ID 与 type，并按预定义有效类型过滤；类型还按 KG 频率分为 Very Common、Common、Uncommon，以避免评测被“人名、国家、城市”等高频类型垄断。选定 focal entity 后，系统抽取它的一跳邻居形成子图，从中筛选可用于出题的 relation-fact pairs。图像、官网、given name 等不适合构造挑战性问题的关系会被过滤；若有效关系不足三个，则丢弃该实体并继续采样。

KGHaluBench 每题通常选三个 relation-fact triples，要求模型先给出实体概览，再回答这些具体事实。这种 compound question 同时激活模型的实体背景知识与细节知识。为了支持验证，系统还取 Entity Description 作为实体级对齐基准，并收集 Entity Statistics 估计 popularity：page views、site links、linked entities、external IDs、wiki token count、statements、references 等。直觉上，越热门、连接越多、描述越丰富的实体，越可能出现在模型训练语料中，也越容易回答。

```python
# KGHaluBench：KG 动态出题与两级验证的简化伪代码
kg = WikidataSnapshot()
while need_more_questions:
    entity = sample_focal_entity(kg, prefer_balanced_entity_types=True)
    triples = filter_valid_relation_fact_pairs(kg.one_hop_subgraph(entity))
    if len(triples) < 3:
        continue

    selected = random_select(triples, k=3)
    description = fetch_entity_description(entity)
    stats = collect_entity_statistics(entity)
    q_complexity = estimate_question_complexity(selected)
    e_popularity = estimate_entity_popularity(stats, entity.type)
    q_difficulty = sigmoid(q_complexity, e_popularity)

    question = build_compound_question(entity, selected)
    response = llm.answer(question)

    entity_label = entity_level_filter(response, description)
    if entity_label == "abstained":
        score = 1
    elif entity_label == "hallucinated":
        score = 0
    else:
        facts = verbalize_triples(entity, selected)
        score = 0
        for fact in facts:
            if fact_level_check(response, fact):
                score += 1

    update_metrics(score, q_difficulty, entity_label)
```

问题难度 \(Q_d\) 是 KGHaluBench 的关键机制。论文受 Item Response Theory 启发，用 sigmoid 把问题复杂度与实体流行度合成为连续难度值：

$$
Q_d = \frac{1}{1 + e^{-\alpha(Q_{Avg}-EP_{Norm})}}
$$

其中 \(Q_{Avg}\) 表示三个关系对应的问题复杂度均值，\(EP_{Norm}\) 是 min-max 归一化后的实体流行度，\(\alpha\) 控制 sigmoid 陡峭程度。这个公式的直觉是：同样复杂的问题，如果实体很流行，难度应下降；如果实体冷门，即使关系形式不复杂，也可能难。用连续难度而非离散难度档位，可以让不同随机抽样批次之间的 accuracy 更可比。

Response Verification Module 先做 Entity-Level Filter。它把回答分成 aligned、hallucinated、abstained 三类：如果模型拒答、承认不知道或无法识别实体，则记为 abstained 并给部分信用；如果回答试图回答但与实体描述在概念上不匹配，则判为实体级幻觉；只有与实体描述对齐的回答才进入事实级校验。实体级相似度结合 embedding cosine similarity 与 token overlap，并按 70:30 加权，强调语义对齐而非表面词匹配。

![KGHaluBench 事实验证流程](https://arxiv.org/html/2602.19643v1/Figures/fact_pipeline_vert2.png)
*图：KGHaluBench Figure 4，事实级验证流水线使用 NLI、LLM entailment 与专家决策过滤器。*

Fact-Level Check 针对每个 relation 独立判断，最多每个回答 3 分。系统先把结构化 tuple，即 entity name、entity type、relation、tense indicator、fact，转写成自然语言事实句。然后进入 NLI Entailment Filter：若 NLI 判断回答蕴含该事实，则该事实正确；若 contradiction 或 neutral，则交给 LLM Entailment Filter 复核。LLM filter 以 fact-checking assistant 角色判断事实是否被明确陈述、被矛盾或未提及；当 LLM 与 NLI 冲突时，再进入 Expert Decision Filter 做二选一仲裁。这个多级设计平衡了速度、可解释性和复杂事实判断能力。

KGHaluBench 的主指标是 weighted accuracy：

$$
W_a = Accuracy \cdot \frac{Q_d}{Avg(Q_d)}
$$

这里 \(Accuracy\) 来自正确事实与合理 abstention 得分，\(Avg(Q_d)\) 是评测中平均题目难度。若某次抽样比平均更难，则同样 accuracy 会被上调；若抽样更容易，则会被下调。这个设计避免动态采样引入“这批题刚好简单/困难”的随机偏差。

幻觉率被拆成两类：

$$
HaluBOK = \frac{|Entity\ Hallucinations|}{|Total\ Responses|-|Abstentions|}
$$

$$
HaluDOK = \frac{|Incorrect\ Facts|}{Maximum\ Attainable\ Score}
$$

\(HaluBOK\) 是 breadth of knowledge 幻觉率，反映模型是否连 focal entity 的基本概念都没对齐；\(HaluDOK\) 是 depth of knowledge 幻觉率，反映模型已经理解实体主题但在具体 relation-fact 上出错。这个拆分比单一 hallucination rate 更可解释。例如小模型可能 \(HaluBOK\) 很高，说明它常把冷门实体答成别的对象；大模型 \(HaluBOK\) 降低后仍有 \(HaluDOK\)，说明它知道讨论谁，但细节记忆不可靠。

与 FactScore 相比，KGHaluBench 继承了“把长答案拆成事实并验证”的思想，但它的事实不是从回答中自由抽取后再找证据，而是由 KG 预先给出可验证 relation-fact triples。这样做牺牲了一部分开放性，却换来自动出题、自动验题、难度估计和幻觉来源分解。与普通 KGQA 相比，KGHaluBench 不只要求短答案命中实体或关系，而是要求模型生成一段围绕实体的自然语言回答，并在概念层与事实层都可验证。

论文结果显示，KGHaluBench 对当前模型仍有足够难度，GPT-5 的 weighted accuracy 也未接近满分。更重要的是，模型规模变大后 \(HaluBOK\) 下降明显，说明大模型更少“完全认错实体”；但 \(HaluDOK\) 下降较慢，说明精确事实仍是难点。abstention 结果也揭示了评测权衡：合理拒答能降低幻觉，但过度拒答会损害有用性，因此论文强调 constructive abstention，即在不知道时给出如何寻找可靠信息的帮助，而不只是拒绝。

#### 🧪 练习题

```yaml
question: "KGHaluBench 中 HaluBOK 与 HaluDOK 的主要区别是什么？"
options:
  - "HaluBOK 衡量实体级基础知识幻觉，HaluDOK 衡量事实级细节知识幻觉"
  - "HaluBOK 只用于闭源模型，HaluDOK 只用于开源模型"
  - "HaluBOK 是训练损失，HaluDOK 是推理延迟"
  - "二者完全等价，只是不同论文版本中的命名"
answer: 0
explain: "HaluBOK 来自 entity-level filter，反映模型是否认识并对齐 focal entity；HaluDOK 来自 fact-level check，反映具体 KG triples 是否回答正确。"
```
