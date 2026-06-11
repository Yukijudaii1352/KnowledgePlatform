### M2A: 双层混合多模态记忆代理 (M2A)

```yaml
id: m2a
name: M2A
full_name: 双层混合多模态记忆代理 (M2A)
year: '2026.02'
org: Peking University/Xi'an Jiaotong University
paper_url: https://arxiv.org/abs/2602.07624
category: multimodal
parent: mirix
motivation: 原始消息与语义记忆双层个性化
```

#### 📝 一句话总结
M2A 提出**可编辑的双层混合记忆架构**，通过 Semantic Store + Raw Message Store 双层存储配合 Tri-path Retrieval，让多模态 Agent 在跨会话长期交互中增量更新用户记忆，实现个性化精准回复。

#### 🎯 核心要点
- 提出**Dual-Layer Hybrid Memory Bank**：Semantic Store（高层语义观察 + evidence_id 桥接）与 Raw Message Store（不可变原始对话日志），通过 evidence_id 实现语义-原始双向溯源
- 设计 **Tri-Path Retrieval**：融合语义相似度（CLIP 多模态 embedding）、时间衰减权重、概念实体匹配三条检索路径，渐进式窄化检索范围
- 支持**可编辑记忆写回**：CREATE / DELETE / BOTH 三种增量更新操作，解决传统记忆系统（Yo'LLaVA / RAP-LLaVA / Mem0）记忆不可写回的痛点
- 采用 **Multi-Agent 架构**：ChatAgent 负责响应生成，MemoryManager 负责记忆提取、存储、更新，职责解耦
- 构建 **M2A-Bench 基准**：首个专为视觉个性化记忆设计的跨会话评估基准，覆盖 5 个维度
- 引入**一致性约束**：证据链一致性检查（Consistency Constraint），确保新增语义记忆与原始消息不矛盾

#### 🔬 深入细节
##### 整体架构

![M2A对比Yo'LLaVA/RAP-LLaVA](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x1.png)
*图1：M2A 与 Yo'LLaVA / RAP-LLaVA 的记忆架构对比 — M2A 统一记忆库支持增量写回*

![M2A多Agent架构总览](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x2.png)
*图2：多 Agent 架构总览 — ChatAgent + MemoryManager + Dual-Layer Hybrid Memory*

##### Dual-Layer Hybrid Memory Bank

M2A 的核心创新是将记忆存储拆分为两层：

| 层 | 存储内容 | 索引方式 |
|----|----------|----------|
| **Semantic Store** | 高层次语义观察 + evidence_ids | CLIP 多模态 embedding（文本+图像联合编码） |
| **Raw Message Store** | 不可变原始对话日志（文本+图片） | 消息 ID 范围 |

两层通过 `evidence_id` 实现桥接：每条 semantic memory 记录其证据来源的消息 ID 列表，使高层语义可以**溯源**回原始对话。这解决了传统系统（如 Mem0）仅存 summary 导致对话细节丢失的问题。

> 💡 关键：Semantic Store 是**可编辑的**（支持 CRUD），Raw Message Store 是**只追加的**（append-only，一旦写入不可修改），保证了可追溯性。

##### Tri-Path Retrieval

给定查询 \( q \)，Tri-path 检索分数为三路径加权融合：

$$
S(q, m) = \alpha \cdot S_{sem}(q, m) + \beta \cdot S_{time}(q, m) + \gamma \cdot S_{concept}(q, m)
$$

其中：
- \( S_{sem} \)：语义相似度，使用 CLIP 多模态 embedding 计算 cosine 相似度
- \( S_{time} \)：时间衰减加权，指数衰减函数 \( e^{-\lambda t} \) 赋予近期记忆更高权重
- \( S_{concept} \)：概念实体匹配得分，通过 NER 提取查询中的实体并与 semantic memory 中的概念标签匹配
- 超参约束 \( \alpha + \beta + \gamma = 1 \)

检索采用**渐进式窄化策略**：先通过语义路径召回 Top-K 候选，再结合时间权重和概念匹配进行重排序，最终返回 Top-N 结果。相比单一向量检索，命中率显著提升。

> ⚠️ 注意：Tri-path 的权重是**可配置的全局超参**，而非自适应学习参数。作者通过网格搜索确定最优配置。

##### Memory Update 机制

M2A 支持三种记忆更新操作：

1. **CREATE**：从新对话中提取新的语义观察，经 Consistency Constraint 校验后写入 Semantic Store
2. **DELETE**：发现记忆过时或矛盾时，删除对应 semantic memory 条目（Raw Message Store 不变）
3. **BOTH**：先 CREATE 新记忆再 DELETE 旧记忆，实现记忆替换

更新流程由 MemoryManager 触发：MemoryManager 分析 ChatAgent 的多模态对话历史，提取用户隐含偏好/事实，进行一致性检查后执行增量写回。

##### 损失函数与一致性约束

M2A 引入一致性约束（Consistency Constraint）确保记忆更新不引入矛盾：

$$
\mathcal{L}_{consistency} = -\log P(\text{consistent} \mid m_{new}, M_{existing})
$$

其中 \( m_{new} \) 为新增语义记忆，\( M_{existing} \) 为已有记忆集合。通过一个专门的 Consistency Checker 子模块判断新记忆是否与已有记忆冲突，若冲突则触发 DELETE 或拒绝 CREATE。

##### 核心算法流程（伪代码）

由于论文中算法以示意图呈现（Figure 3-5），以下根据 §4 的 Method 描述整理核心流程：

```python
# M2A Memory Retrieval + Update 核心流程
def m2a_pipeline(query, memory_bank):
    # Step 1: Tri-Path Retrieval
    sem_scores = cosine_sim(CLIP_embed(query), memory_bank.semantic_store.embeddings)
    time_scores = exp(-lambda * (now - memory_bank.semantic_store.timestamps))
    concept_scores = entity_match(extract_entities(query), memory_bank.semantic_store.concepts)
    
    S = alpha * sem_scores + beta * time_scores + gamma * concept_scores
    top_k_memories = argsort(S)[-K:]  # 渐进式窄化
    
    # Step 2: 桥接原始消息
    evidence_msgs = [memory_bank.raw_store[mid] for m in top_k_memories for mid in m.evidence_ids]
    
    # Step 3: ChatAgent 生成回复
    response = llm.generate(query, context=top_k_memories + evidence_msgs)
    
    # Step 4: MemoryManager 更新（异步触发）
    new_obs = extract_semantic_observations(conversation_history)
    for obs in new_obs:
        if consistency_check(obs, memory_bank.semantic_store):
            if conflict_exist(obs, memory_bank.semantic_store):
                memory_bank.semantic_store.delete(conflict_entry)  # DELETE
            memory_bank.semantic_store.create(obs, evidence_ids=obs.source_ids)  # CREATE
    return response
```

![Tri-Path检索示意图](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x3.png)
*图3：Tri-Path Retrieval 的三条检索路径示意 — 语义+时间+概念融合*

![Memory Update流程](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x4.png)
*图4：MemoryManager 的增量更新流程 — CREATE / DELETE / BOTH*

![M2A-Bench评估维度](https://ar5iv.labs.arxiv.org/html/2602.07624/assets/x5.png)
*图5：M2A-Bench 的五个评估维度与示例*

##### 与传统方法的区别

| 方法 | 记忆存储 | 可编辑性 | 检索方式 | 语义-原始桥接 |
|------|---------|---------|---------|-------------|
| Yo'LLaVA | Concept tokens 冻存 | ❌ 不可写回 | 单一路径 | ❌ 无 |
| RAP-LLaVA | 固定 profile | ❌ 不可更新 | 无检索 | ❌ 无 |
| Mem0 | Summary 向量存储 | ❌ 仅追加 | 单向量检索 | ❌ 无 |
| **M2A** | **双层混合** | ✅ CREATE/DELETE/BOTH | **Tri-Path** | ✅ evidence_id |

##### 实验亮点

- 在 M2A-Bench 的 5 个维度（Preference Recall、Fact Accuracy、Personalization、Consistency、Efficiency）上全面超越 Yo'LLaVA、RAP-LLaVA、Mem0
- 消融实验验证：去掉任意一条检索路径均导致 Recall 下降 > 5%
- 长会话（> 20 轮）场景下，M2A 的记忆召回率保持稳定，而基线方法显著退化

#### 🧪 练习题
```yaml
question: "M2A 的 Dual-Layer Hybrid Memory 中，Semantic Store 和 Raw Message Store 之间通过什么机制实现桥接？"
options:
  - "消息时间戳对齐"
  - "evidence_id 列表"
  - "共享的 CLIP embedding 空间"
  - "统一的记忆 ID 自增序列"
answer: 1
explain: "每条 semantic memory 记录其证据来源的消息 ID 列表（evidence_ids），通过该字段索引 Raw Message Store 中的原始消息，实现语义-原始双向溯源。"
```
