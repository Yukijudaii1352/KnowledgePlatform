### MemMachine: 保真记忆机 (MemMachine)

```yaml
id: memmachine
name: MemMachine
full_name: 保真记忆机 (MemMachine)
year: '2026.04'
org: MemVerge
paper_url: https://arxiv.org/abs/2604.04853
category: structured
parent: mem0
motivation: 保留整段对话轨迹减少抽取失真
```

#### 📝 一句话总结
MemMachine 提出一种 ground-truth-preserving agent memory：它把原始对话 episode 作为长期记忆真值层保存下来，只在必要时做 profile 抽取，并通过 contextualized retrieval 把“匹配到的句子”扩展成“带邻域上下文的 episode cluster”，从而减少传统抽取式记忆的失真和漏召回。

#### 🎯 核心要点
- **原始 episode 保真存储**：长期记忆不以“先抽事实再存”为默认路径，而是先保存 raw conversational episodes，把抽取误差从基础存储层挪开。
- **双层 episodic memory + profile memory**：系统同时维护 short-term working memory、persistent long-term episodic memory 和 semantic/profile memory。
- **句子级索引但 episode 级回忆**：长期记忆对 episode 做 sentence-level indexing，并保留 sentence 到 parent episode 的 provenance 映射。
- **Contextualized Retrieval**：先找 nucleus matches，再向前后扩展邻近 episode context 形成 episode clusters，缓解对话数据中“答案分散在相邻轮次”的 embedding dissimilarity 问题。
- **个性化支持**：profile memory 持续维护用户偏好、事实和行为模式，用于 personalization，而不是替代 episodic ground truth。
- **多跳检索代理**：对复杂查询，Retrieval Agent 在 direct retrieval、parallel decomposition、iterative chain-of-query 三类策略间路由，解决 single-shot vector retrieval 的 late binding 问题。
- **实验结果强调 accuracy-efficiency tradeoff**：LoCoMo 上总体得分 91.69%，LongMemEvalS 最优消融配置 93.0%，在 matched memory-mode comparison 中输入 token 约比 Mem0 少 80%。

#### 🔬 深入细节
![MemMachine 架构图](https://ar5iv.labs.arxiv.org/html/2604.04853/assets/x1.png)
*图：MemMachine 采用 client-server 架构，对外暴露 REST / Python SDK / MCP 接口；内部把 episodic memory、profile memory 与存储层解耦。*

```python
# MemMachine 的核心流程（按论文整理）
def ingest(message, meta):
    ep = Episode(
        text=message,
        producer=meta.producer,
        timestamp=meta.timestamp,
        session_id=meta.session_id,
        metadata=meta.custom,
    )
    raw_store.append(ep)
    stm.push(ep)
    if stm.over_budget():
        archived = stm.flush_to_ltm()
        for old_ep in archived:
            for sent in sentence_split(old_ep.text):
                ltm_index.add(sent, episode_id=old_ep.id, metadata=old_ep.metadata)
    profile_memory.extract_and_update(ep)

def recall(query):
    near_ctx = stm.lookup(query)
    nucleus = vector_search(query, ltm_index, top_k=k)
    clusters = expand_with_neighboring_episodes(nucleus, window=w)
    profile = profile_memory.search(query)
    return format_context(near_ctx, clusters, profile)
```

##### 1. 动机：传统抽取式长期记忆的根本问题是“先失真，再检索”
论文开宗明义地批评了当前很多 agent memory 系统的默认设计：消息进来以后，系统立即调用 LLM 做 extraction、aggregation、update、delete，然后只把抽取后的结果存下来。这样做的代价是两层的。第一，成本高，因为每次写入都依赖 LLM；第二，风险更大，因为一旦抽取错了，系统长期保存的就不是原始事实，而是被模型加工过的版本。

MemMachine 的回答很直接：把 raw episodes 作为 ground truth 层保存下来。这样，episodic memory 负责回答“当时到底发生了什么”，profile memory 再负责回答“用户总体偏好是什么”。两层职责分开，才能同时兼顾 factual continuity 和 personalization。

##### 2. 架构：STM、LTM 和 Profile Memory 各管一层
论文中的系统架构是一个典型的 client-server memory service。Agent 通过 REST API、Python SDK 或 MCP server 调用 MemMachine；服务端内部维护两条主线：

- **Short-Term Memory (STM)**：保存最近 episode，直接为当前会话提供近程上下文。
- **Long-Term Episodic Memory (LTM)**：当内容超出 STM 窗口后，把历史 episode 送入长期层，并做 sentence-level indexing。
- **Profile Memory**：从对话中抽取稳定的用户画像、偏好和事实，用于个性化回答。

长期层的一个关键实现细节是：索引的粒度是句子，但真值的粒度仍然是 episode。论文明确强调 sentence extraction、metadata augmentation、relational mapping 和 embedding generation 四步。也就是说，检索是细粒度的，回忆仍然可以追溯到完整来源。

##### 3. Contextualized Retrieval：不是只取匹配句，而是取“句子周围的对话邻域”
这是 MemMachine 最核心的技术点。对话数据和普通文档不同，很多问题的答案并不集中在一条句子里，而是分散在相邻轮次。例如用户先说背景，再在下一轮补充例外条件；如果只取 top-k matching sentences，很容易把语义上相关但分布在相邻 turn 的证据切断。

MemMachine 因此采用 **contextualized retrieval**：先找到 nucleus matches，再把这些 nucleus 所属 episode 的邻近上下文一并扩展成 episode clusters。这样做的好处是：

- 保留原始叙事链，不把答案切成孤立句子；
- 减少 conversational embedding dissimilarity 带来的漏召回；
- 在不把整段历史灌回上下文的前提下，恢复足够多的局部真值。

> 💡 关键：MemMachine 不是“直接检索整段大块文本”，而是“句子级命中，episode 级恢复”。

##### 4. Multi-hop Retrieval Agent：为什么单次向量检索不够
论文进一步指出，多跳问题存在 **late binding problem**。像“Acme 的 CEO 的配偶现在在哪家公司工作”这种查询，后续检索 hop 依赖前一跳解析出来的中间实体；因此单个 embedding 无法一次性覆盖完整依赖链。

为此，MemMachine 在长期记忆模块里引入 Retrieval Agent，把查询路由到三类策略：

- **Direct retrieval**：适合单跳或证据集中的问题；
- **Parallel decomposition**：把查询拆成可并行求解的子问题；
- **Iterative chain-of-query**：逐跳生成下一轮检索查询，解决晚绑定依赖。

这部分不是基础记忆层本身，但它说明 MemMachine 不是只做“存和搜”，而是把 retrieval planning 也纳入内存系统设计。

##### 5. 结果怎么读：检索侧优化比写入侧优化更重要
论文在 LongMemEvalS 上做了系统消融，比较 sentence chunking、query bias correction、context formatting、retrieval depth、search prompt design 和 answer-model selection 六个维度。最重要的发现是：**retrieval-stage optimizations 的收益明显大于 ingestion-stage changes**。

具体来说，retrieval depth tuning 带来 +4.2%，context formatting +2.0%，search prompt design +1.8%，query bias correction +1.4%，都高于 sentence chunking 的 +0.8%。这说明当 ground truth 已经被保留下来后，系统性能更取决于“怎么把对的记忆取回来并组织给模型看”，而不是“写入时如何激进压缩”。

##### 6. 与 Mem0 的差异
Mem0 的代表性思路是“只保留高价值 facts”，而 MemMachine 的代表性思路是“保留原始 episodic ground truth，把抽象和个性化放到 profile 层”。因此两者的 tradeoff 不一样：

- **Mem0** 更偏记忆压缩与结构化抽取；
- **MemMachine** 更偏真值保留与检索恢复；
- **在 matched memory-mode comparison 中**，MemMachine 报告输入 token 约比 Mem0 少 80%，说明“保真”不必然意味着“更贵”，前提是检索与上下文组织做得足够好。

#### 🧪 练习题
```yaml
question: "MemMachine 的 Contextualized Retrieval 为什么不是只返回 top-k 匹配句子？"
options:
  - "因为它完全不做向量检索，只靠 profile memory 回答"
  - "因为对话答案常分散在相邻 turn 中，命中的 nucleus 句需要扩展成带邻域上下文的 episode cluster"
  - "因为论文要求每次都把整段历史会话重新注入上下文"
  - "因为它把所有长期记忆都改写成固定长度摘要后再返回"
answer: 1
explain: "MemMachine 先做句子级命中，再恢复邻近 episode 上下文；这样既保留原始对话真值链，又避免只取孤立句子导致的信息断裂。"
```
