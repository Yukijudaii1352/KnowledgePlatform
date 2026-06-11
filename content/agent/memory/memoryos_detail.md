### MemoryOS: 记忆操作系统 (Memory OS of AI Agent)

```yaml
id: memoryos
name: MemoryOS
full_name: 记忆操作系统 (Memory OS of AI Agent)
year: '2025.06'
org: BUPT/Tencent AI Lab
paper_url: https://arxiv.org/abs/2506.06326
category: management
parent: memgpt
motivation: 分层迁移短中长期记忆统一管理
```

#### 📝 一句话总结
MemoryOS 借鉴操作系统的分层存储思想，把 agent 记忆组织成短期、中期、长期三层，并围绕存储、更新、检索、生成四个模块建立一套动态迁移机制，从而在长对话里同时兼顾记忆容量、检索效率与个性化一致性。

#### 🎯 核心要点
- 明确提出 Memory Operating System 视角：不是单次检索补丁，而是一套持续运行的 memory stack
- 三层存储结构：short-term memory、mid-term memory、long-term personal memory
- 四个核心模块：Memory Storage、Memory Updating、Memory Retrieval、Memory Generation
- 短期到中期的更新采用 dialogue-chain 风格的 FIFO 迁移，中期到长期采用 segmented page organization
- 通过动态迁移避免“全量历史都塞进 prompt”与“只做一次性摘要”的两端问题
- 在 LoCoMo 上，论文报告相对 baseline 在 GPT-4o-mini 上平均 F1 提升 49.11%，BLEU-1 提升 46.18%
- 重点强调 personalized long conversation：不仅回答事实，更要跨轮次保持用户画像、偏好和上下文连续性

#### 🔬 深入细节
![MemoryOS 总体架构](https://ar5iv.labs.arxiv.org/html/2506.06326/assets/x1.png)
*图：MemoryOS 将记忆划分为存储、更新、检索、生成四个模块，并在 STM / MTM / LPM 三层之间做动态迁移。*

```python
# MemoryOS 的层级迁移逻辑（按论文方法概括）
def memory_os_step(query, stm, mtm, lpm):
    stm.append(query)
    if stm.is_full():
        mtm.ingest(stm.compact_as_dialogue_chain())
        stm.evict_oldest()
    if mtm.has_stable_profile_signal():
        page = mtm.segment_into_page()
        lpm.merge(page)
    evidence = retrieve_from_layers(query, stm, mtm, lpm)
    return generate_response(query, evidence)
```

MemoryOS 的思路很像把 agent 的记忆系统按“存储层级”重新设计一遍。论文认为，许多现有方法要么把完整历史都堆进上下文，要么只做一次性摘要/RAG，结果要么上下文爆炸，要么远距离个性信息被压掉。

在结构上，MemoryOS 用 STM、MTM、LPM 三层承接不同时间尺度的信息。STM 保存最活跃的局部对话；MTM 沉淀已离开当前窗口但仍可能复用的片段；LPM 存储用户画像、稳定偏好与可长期复用的个人知识。

真正关键在于层间迁移。短期到中期遵循 dialogue-chain-based FIFO，中期到长期采用 segmented page organization。这样既控制了写入成本，也避免把瞬时噪声永久固化。

因此 MemoryOS 不是简单“再加一层 memory database”，而是在 agent 侧定义了一套分层、分工、分阶段迁移的操作系统式协议。

> 💡 关键：MemoryOS 的创新点不是某个单独检索算法，而是把 memory 看成会流动、会迁移的层级系统。

> ⚠️ 注意：如果迁移阈值或分页策略设错，长期层同样会被低价值信息污染。

#### 🧪 练习题
```yaml
question: MemoryOS 中把信息从 mid-term memory 进一步迁移到 long-term personal memory 的主要目的是什么？
options:
- 降低 tokenizer 速度开销
- 把稳定、可复用的个性知识沉淀成长期记忆
- 确保所有历史对话都能原样保留
- 替代 response generation 模块
answer: 1
explain: LPM 的职责是保存长期有效的用户画像与偏好，而不是机械地保留所有中期内容。
```
