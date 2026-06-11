### Mem0: 可扩展长期记忆层 (Mem0)

```yaml
id: mem0
name: Mem0
full_name: 可扩展长期记忆层 (Mem0)
year: '2025.04'
org: Mem0 AI
paper_url: https://arxiv.org/abs/2504.19413
category: structured
parent: memorybank
motivation: 只抽取高价值记忆兼顾精度成本
```

#### 📝 一句话总结
Mem0 提出了一种可扩展的记忆中心架构，通过动态提取、整合和检索对话中的关键信息来突破 LLM 固定上下文窗口的限制；其图记忆增强版 Mem0^g 进一步用 Neo4j 图数据库捕获实体间的复杂关系，在 LOCOMO 长对话基准上相对 OpenAI 提升 26%（LLM-as-a-Judge），同时将 p95 延迟降低 91%、token 成本节省超 90%。

#### 🎯 核心要点
- **双阶段流水线架构**：Extraction 阶段从对话中提取事实/偏好/事件并去重合并；Update 阶段决定新增/修改/删除操作，保证记忆的时效性与一致性
- **两种记忆表示**：
  - Mem0：基于稠密向量的自然语言记忆存储，适合简单查询和高效检索
  - Mem0^g：基于 Neo4j 图数据库的关系记忆，显式建模实体间的时序、因果和语义关系
- **LOCOMO 基准全面评测**：10 段长对话（平均 600 轮/26000 tokens），覆盖 single-hop、multi-hop、temporal、open-domain 四类问题
- **对比 6 类基线**：记忆增强系统（A-Mem）、RAG（7 种 chunk 大小 × 2 种 k 值）、全上下文、开源记忆方案（LangMem）、商业平台（Zep、OpenAI）
- **核心指标**：LLM-as-a-Judge 评分（J）+ 传统指标（F1, BLEU-1, ROUGE-L）+ p50/p95 延迟
- **关键结果**：
  - Mem0 整体 J=66.88，Mem0^g J=68.44，均超 OpenAI(52.90) 和 Zep(65.99)
  - Mem0 p95 总延迟 1.44s vs 全上下文 17.12s（降 91%），token 量从 26031 降至 1764（降 93%）
  - Mem0^g 在 temporal reasoning 上大幅领先，验证图结构对时序关系的建模优势

#### 🔬 深入细节
##### 1. 问题背景与动机

LLM 的固定上下文窗口（即使扩展到 128K+ tokens）在多轮跨会话对话中仍面临根本性挑战：
- **信息遗忘**：超过窗口长度的历史对话被直接截断，导致前后不一致
- **成本线性增长**：全上下文模式下每轮推理需处理全部历史，token 成本随对话轮数线性增长
- **检索精度下降**：简单 RAG 在长对话中检索到的 chunk 缺乏结构化上下文，导致回答碎片化

Mem0 的核心理念是仿照人类记忆机制——我们不记住每一句话，而是提取、整合、更新"关键记忆"，并在需要时精准检索。

##### 2. 架构总览

![Mem0 系统架构图](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/mem0_pipeline.png)
*图 2：Mem0 的双阶段流水线架构——Extraction 阶段和 Update 阶段*

整个系统包含两个核心阶段：

**阶段一：Extraction（提取）**
```python
# Mem0 记忆提取伪代码
def extract_memories(conversation_turn, user_id):
    # 1. LLM 分析对话，提取结构化事实
    prompt = f"""
    Analyze the conversation and extract:
    - Facts about the user (preferences, attributes, experiences)
    - Events with timestamps
    - Relationships between entities
    Conversation: {conversation_turn}
    """
    extracted = LLM.extract(prompt, schema=MemorySchema)

    # 2. 去重与合并：与已有记忆做语义相似度匹配
    existing_memories = vector_db.search(
        query=extracted, user_id=user_id, top_k=5
    )

    # 3. 决定操作类型
    for fact in extracted:
        if similarity(fact, existing) > threshold:
            operation = "UPDATE" if conflict else "SKIP"
        else:
            operation = "ADD"
    return operations

**阶段二：Update（更新）**
LLM 根据提取结果和已有记忆，动态决定 ADD / UPDATE / DELETE 操作，避免冗余存储和过期信息污染。更新后的记忆以自然语言形式存入向量数据库（如 Qdrant/Chroma），同时可选写入 Neo4j 图数据库（Mem0^g 模式）。

##### 3. Mem0 vs Mem0^g 两种记忆表示

![Mem0^g 图记忆架构](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/mem0p_pipeline.png)
*图 3：Mem0^g 的图记忆架构——实体提取与关系更新阶段*

**Mem0（稠密记忆）**：
- 每条记忆是一个自然语言语句 + 向量嵌入
- 检索时用语义相似度 + 用户 ID 过滤
- 优点：简单高效，适合 factoid 类查询
- p50 搜索延迟仅 0.148s（全上下文为 9.87s）

**Mem0^g（图记忆）**：
- 底层使用 Neo4j 存储实体-关系三元组
- LLM 通过 function calling 将非结构化文本转化为结构化图数据
- 实体类型包括：Person, Event, Preference, Location, TimePoint 等
- 关系类型包括：PARTICIPATED_IN, PREFERS, OCCURRED_AT, BEFORE/AFTER 等
- 检索时走 Cypher 查询 + 语义搜索混合路径

```python
# Mem0^g 图记忆检索伪代码
def graph_retrieve(query, user_id, neo4j_driver, vector_db):
    # 1. LLM 解析查询意图，生成 Cypher
    cypher = LLM.generate_cypher(
        "Find memories about user's dietary preferences before March",
        schema=get_schema()
    )
    # 2. 执行图查询
    graph_results = neo4j_driver.run(cypher)

    # 3. 同时进行向量语义搜索
    semantic_results = vector_db.search(query, top_k=10)

    # 4. 融合两种结果
    return fusion_rank(graph_results, semantic_results)

> 💡 关键设计：Mem0^g 不是替代 Mem0，而是增强——图记忆天然擅长时序推理（BEFORE/AFTER 链）和关系跳转（multi-hop），而稠密记忆在语义匹配上更灵活。

##### 4. 实验设计与关键结果

**数据集 — LOCOMO**：
- 10 段长对话，每段约 600 轮，平均 26000 tokens
- 每段附带约 200 个问答对，分 4 类：
  - **Single-hop**：单跳事实检索（"Alice 的生日是什么时候？"）
  - **Multi-hop**：需要综合多条记忆（"Alice 和 Bob 第一次见面时去了哪家餐厅？"）
  - **Temporal**：涉及时序关系（"Alice 换工作之前住在哪个城市？"）
  - **Open-domain**：需要外部知识（"Alice 最喜欢的乐队成立于哪一年？"）

**关键指标 — LLM-as-a-Judge (J)**：
传统指标（F1, BLEU-1, ROUGE-L）基于词重叠，无法衡量事实正确性。例如 ground truth 是 "Alice was born in March"，模型输出 "Alice is born in July"——词重叠极高但完全错误。J 指标用 GPT-4 从 relevance、factual accuracy、completeness 三个维度 1-100 打分，取整体均值。

![延迟分析](https://arxiv.org/html/2504.19413v1/extracted/6393986/figures/latency_total.png)
*图 4：不同记忆方法的总延迟对比（p50/p95，秒）*

**核心发现**：
1. **Mem0 在 single-hop 上最优**（稠密自然语言记忆 + 精准检索），p95 总延迟仅 1.44s
2. **Mem0^g 在 temporal 上大幅领先**——显式时序边（BEFORE/AFTER）显著提升时间推理
3. **全上下文模型 J=72.90 最高但代价巨大**（p95=17.12s，每查询 26031 tokens）；Mem0^g 的 J=68.44 仅低约 6%，但延迟降 85%、token 降 86%
4. **RAG 在高 chunk_size + 低 k 时效果急剧下降**（chunk 4096+k=1 时 J=36.84），说明"塞更多不相关上下文"适得其反
5. **LangMem 延迟异常高**（p50=17.99s），因其记忆操作涉及多次 LLM 调用

##### 5. 技术亮点与设计哲学

**去重合并机制**：
传统记忆系统对重复信息简单追加，导致记忆膨胀。Mem0 用 LLM 判断新信息与已有记忆的语义关系——相同则 SKIP，更新则 UPDATE，冲突则保留最新并标记旧记忆过期。

**操作原子性**：
ADD/UPDATE/DELETE 三元操作模型确保记忆状态的一致性。论文附录 B 的 Algorithm 1 详细描述了 UPDATE 操作的完整流程：搜索候选 → 冲突检测 → 决议生成 → 执行写操作。

**记忆分层**：
Mem0 区分"核心事实"（如用户饮食偏好）和"情境信息"（如某次聊天的具体措辞），前者持久化存储，后者可随时间衰减——模仿人类的长期/短期记忆分工。

> ⚠️ 注意：Mem0^g 在 multi-hop 上并未如预期超越 Mem0——论文分析认为图结构的额外导航开销抵消了关系建模优势，这提示"更结构化 ≠ 更适合所有场景"。

#### 🧪 练习题
```yaml
question: "Mem0^g 的图记忆相比于 Mem0 的稠密记忆，在 LOCOMO 实验中哪类问题上优势最显著？"
options:
  - "Single-hop 问题，因为图查询比向量搜索更快"
  - "Multi-hop 问题，因为图结构天然支持关系跳转"
  - "Temporal 问题，因为时序边（BEFORE/AFTER）显式建模时间线"
  - "Open-domain 问题，因为图数据库可以存储外部知识"
answer: 2
explain: "论文实验显示 Mem0^g 在 temporal reasoning 上大幅领先，得益于图结构中 BEFORE/AFTER 时序边的显式建模；而在 multi-hop 上图结构的导航开销反而抵消了关系优势。"
```
