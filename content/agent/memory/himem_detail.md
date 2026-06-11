### HiMem: 分层长期记忆 (HiMem)

```yaml
id: himem
name: HiMem
full_name: 分层长期记忆 (HiMem)
year: '2026.01'
org: Macau University of Science and Technology
paper_url: https://arxiv.org/abs/2601.06377
category: structured
parent: a_mem
motivation: 连接事件层与笔记层并支持重整固
```

#### 📝 一句话总结
HiMem 提出受认知心理学启发的双层长期记忆架构——Episode Memory（原始对话片段）与 Note Memory（精炼结构化知识），配合 Best-Effort 分层检索和冲突感知记忆重巩固机制，实现 LLM Agent 在长程对话中的自适应记忆构建与自我进化，在 LOCOMO 基准上取得 80.71 GPT-Score。

#### 🎯 核心要点
- **双层分层架构**：Episode Memory 保留细粒度对话事件（chunk级），Note Memory 存储抽象结构化知识（用户画像、偏好、事实、关系），两层通过语义链接形成层次化关联。
- **Dual-Channel 智能分段**：Speaker Channel（说话人切换边界）+ Topic Channel（语义主题边界），通过双向交叉注意力融合，解决传统固定窗口分段的语义割裂问题。
- **多阶段知识提取**：从 Episode 中提取主题摘要、用户画像（Profile）、用户偏好（Preference）、关系记忆，并映射到统一对齐空间，使用对比学习维护跨 Episode 语义一致性。
- **Best-Effort 分层检索**：优先检索 Note Memory（高效），仅当 LLM 判定证据不足时才回溯 Episode Memory（完整），在效率与召回间取得最优平衡。
- **冲突感知自进化**：检测新旧知识冲突，执行 Insert/Update/Delete 三操作，无需离线批处理即可在线记忆更新，Note Memory 质量从 ~48 GPT-Score 提升至 80+。

#### 🔬 深入细节
##### 1. 整体架构：构建–检索–自进化三阶段闭环

![Figure 1: HiMem Architecture Overview](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x1.png)

HiMem 的架构（Figure 1）由三个阶段构成闭环：

**阶段 A：记忆构建**。原始对话经 Dual-Channel Segmenter 切分为语义连贯的 Episode 块（保留说话人身份和主题边界），每个 Episode 随后进入多阶段提取管线，生成四种结构化知识——主题摘要、用户画像、用户偏好、关系记忆。最关键的是 Knowledge Alignment 模块：所有知识被映射到 Profile / Preference / Fact 三个统一对齐空间，通过对比学习损失 $\mathcal{L}_{\text{align}} = -\log \frac{\exp(\text{sim}(z, z^+)/\tau)}{\sum_{z^-} \exp(\text{sim}(z, z^-)/\tau)}$ 确保不同 Episode 提取的相似概念在向量空间中的表示一致。

**阶段 B：记忆检索**。支持 Hybrid Retrieval（同时检索 Note + Episode 并融合排序）和 Best-Effort Retrieval（先 Note 后按需回溯 Episode），使用 dense embedding + 稀疏 BM25 的混合检索器。

**阶段 C：记忆自进化**。在检索过程中当从 Episode 补充的信息与 Note 已有知识冲突时，触发 Reconsolidation：通过 RAG 评估冲突程度，执行 Insert（新增）、Update（覆写）、Delete（移除）。

##### 2. Best-Effort 分层检索与冲突感知重巩固

以下是基于论文提炼的 Best-Effort Retrieval 完整伪代码：

```python
def best_effort_retrieve(query, note_memory, episode_memory, llm, threshold=0.7):
    """
    HiMem Best-Effort 分层检索 + 冲突感知重巩固
    
    Args:
        query: 用户查询
        note_memory: Note Memory 索引（结构化知识条目 + dense embeddings）
        episode_memory: Episode Memory 索引（原始对话 chunk + embeddings）
        llm: 大语言模型（用于评估证据充分性 + 冲突检测 + 回答生成）
        threshold: LLM 证据充分性评分阈值
    
    Returns:
        Tuple[answer, updated_note_memory]: 生成的回答和更新后的 Note Memory
    """
    # Step 1: 混合向量编码（dense + sparse BM25）
    q_dense, q_sparse = encode_query(query)
    
    # Step 2: 优先检索 Note Memory（高效层）
    note_candidates = note_memory.search(
        q_dense, top_k=5, fusion_weight=0.7  # dense:sparse = 7:3
    )
    
    # Step 3: LLM 评估证据充分性
    sufficiency_score = llm.evaluate_sufficiency(
        query=query,
        evidence=[n.text for n in note_candidates]
    )
    
    if sufficiency_score >= threshold:
        # 证据充分 → 基于 Note 生成回答
        return llm.generate(query, note_candidates), note_memory
    
    # Step 4: 证据不足 → 回溯 Episode Memory
    episode_candidates = episode_memory.search(
        q_dense, top_k=10, fusion_weight=0.6  # Episode 层 sparse 权重更高
    )
    
    # Step 5: 冲突检测
    conflicts = detect_conflicts(
        note_evidence=[n.text for n in note_candidates],
        episode_evidence=[e.text for e in episode_candidates],
        llm=llm
    )
    
    # Step 6: RAG-based 重巩固
    for conflict in conflicts:
        if conflict.type == "MISSING" and conflict.evidence_strength > 0.8:
            # Insert: 新知识完全缺失
            new_note = llm.extract_note(conflict.episode_context)
            note_memory.insert(new_note, align_to_spaces(new_note, 
                profile_space, preference_space, fact_space))
        
        elif conflict.type == "UPDATE" and conflict.semantic_overlap > 0.6:
            # Update: 部分重叠但细节更新
            old_note = conflict.note_entry
            merged = llm.merge_knowledge(old_note, conflict.episode_context)
            note_memory.update(old_note.id, merged, 
                realign_to_spaces(merged, profile_space, preference_space, fact_space))
        
        elif conflict.type == "CONTRADICT" and conflict.contradiction_score > 0.9:
            # Delete: 旧知识已被明确否定
            note_memory.delete(conflict.note_entry.id)
    
    # 生成最终回答
    merged_evidence = merge_evidence(note_candidates, episode_candidates, conflicts)
    return llm.generate(query, merged_evidence), note_memory
```

**Table 2 消融实验**揭示了分层检索和自进化的互补效应：

| 配置 | Average GPT-Score | Average F1 | 下降幅度 |
|------|-------------------|------------|----------|
| HiMem (完整) | **80.71** | 34.95 | — |
| w/o Hierarchical Retrieval | 71.75 | 30.94 | -8.96 |
| w/o Self-Evolution | 68.27 | 29.75 | -12.44 |
| w/o Both | 66.65 | 28.69 | -14.06 |

去除分层检索导致 8.96 分下降，去除自进化导致 12.44 分下降，两者叠加并非简单相加（-14.06），表明两个机制存在正的交互增益——分层检索提供更精准的冲突发现目标，自进化则利用这些发现持续提升知识质量。

##### 3. Knowledge Alignment 消融的关键发现

![Figure 2: Self-Evolution Effects](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x2.png)

**Table 3** 揭示了 Knowledge Alignment 对不同记忆层的非对称影响：

| 记忆层 | 配置 | GPT-Score | 变化 | 分析 |
|--------|------|-----------|------|------|
| Note Memory | w/ Alignment | 63.44 | — | 对齐使结构化知识的语义一致性显著提升 |
| Note Memory | w/o Alignment | 57.51 | **-5.93** ⬇ | 信息密度越高，越依赖统一对齐空间 |
| Episode Memory | w/ Alignment | 78.12 | — | 原始对话中隐式信息丰富 |
| Episode Memory | w/o Alignment | 79.63 | **+1.51** ⬆ | 语义融合过程反而稀释了原始上下文中的隐含线索 |

这一发现极其深刻：**结构化程度越强、信息密度越高的记忆形式，越需要统一的对齐空间来维护语义一致性**。Episode Memory 作为原始对话片段，其蕴含的微妙线索（如语气暗示、上下文隐喻）可能在强制语义对齐过程中被"平均化"而丢失——这提示记忆系统设计应考虑"信息密度–对齐强度"的权衡曲线，而非一刀切地对所有层施加同等强度的语义对齐。

##### 4. 主实验与效率分析

![Figure 3: Memory System Taxonomy](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x3.png)

Figure 3 从 Memory Form–Memory Organization–Memory Operation 三个维度对现有系统进行分类，HiMem 是唯一在三维度均维持非退化设计的系统。

**LOCOMO 基准主结果（Table 1）**：

| 问题类型 | HiMem GPT-Score | 次优方法 | 领先幅度 |
|----------|-----------------|----------|----------|
| Single Hop | **89.22** | 89.02 (Episode w/o KA) | +0.20 |
| Multi Hop | **70.92** | 65.25 | **+5.67** 🔥 |
| Temporal | **74.77** | 67.39 | **+7.38** 🔥 |
| Open Domain | **54.86** | 50.35 | +4.51 |

HiMem 在 Multi Hop 和 Temporal 推理上优势尤为显著（+5~7 分），这正是分层架构+冲突感知更新的价值所在——多跳问题需要跨多个 Note/Episode 的信息整合，时间推理需要精确的版本历史跟踪，两者都高度依赖记忆重巩固机制对知识时效性的维护。

![Figure 4: Efficiency vs Top-k](https://ar5iv.labs.arxiv.org/html/2601.06377/assets/x4.png)

**效率（Figure 4）**：HiMem 的平均检索延迟 < 0.5s，显著优于纯 RAG 方法（1–3s）。Best-Effort 策略使约 70% 的查询仅需 Note Memory 检索即可完成，避免了昂贵的 Episode 层回溯。

#### 🧪 练习题
```yaml
question: "HiMem 的 Best-Effort Retrieval 为什么先查 Note Memory，再在证据不足时回溯 Episode Memory？"
options:
  - "因为 Episode Memory 不能被向量检索"
  - "因为 Note Memory 更抽象、更便宜，足够时可直接回答，不足时再下钻到高保真的 Episode 证据"
  - "因为 HiMem 只允许每次查询访问一种记忆层"
  - "因为 Episode Memory 只用于训练阶段，不参与推理"
answer: 1
explain: "Best-Effort Retrieval 的设计目标是兼顾效率与保真：优先用 Note Memory 低成本命中，若证据不足再回溯 Episode Memory 补足细节与时序真值。"
```
