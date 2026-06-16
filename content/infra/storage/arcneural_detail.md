### ArcNeural

```yaml
id: arcneural
name: ArcNeural
full_name: ArcNeural多模态数据库 (ArcNeural)
year: '2025'
org: 学术研究
paper_url: https://arxiv.org/abs/2506.09467
category: emerging
parent: —
motivation: 向量+图+文档统一存储
```

#### 📝 一句话总结

ArcNeural 提出一个面向 Gen-AI 应用的多模态数据库架构，把图、向量、文档/JSON 放在统一查询与存储体系中，并通过存算分离、MemEngine 和 HTAP 执行链路支持实时事务与分析。

#### 🎯 核心要点

- 多模态数据模型：在图数据基础上扩展 vector、document、JSON 等属性，面向 RAG、语义检索和企业知识应用
- 存算分离：存储节点通过 replay WAL checkpoint 持久化，计算层缓存 WAL，形成 Semi-Stateful compute
- 一致性机制：计算层 WAL 通过 multi-raft 协议实现高可用和一致性
- TP/AP 分离但统一接口：TP 层支持事务与多模态引擎，AP 组件按需 serverless 启动并把结果回流 TP
- 向量索引集成：查询语言引入 ARRAY/VECTOR 语法，优化器把 VertexScan 替换为 VertexVectorScan
- 向量存储两阶段：先通过 write-through 接入 ArcVector/Qdrant，后续把 Filterable HNSW 嵌入本地存储
- MemEngine 针对图拓扑缓存和属性 LRU 缓存，Adaptive Edge Collection 在 Vec 与 BTreeSet 间按度数切换
- MPP 查询执行：按 operator 属性拆分 DAG，分发到 partition leader 节点进行 push-based vectorized execution

#### 🔬 深入细节

![ArcNeural 系统总览](https://arxiv.org/html/2506.09467v1/extracted/6531813/arc-overview.jpg)
*图：ArcNeural 论文 Figure 1，展示存算分离、多模态引擎、TP/AP 和存储后端的总体关系。来源：arXiv HTML 论文图片。*

![ArcNeural MemEngine](https://arxiv.org/html/2506.09467v1/extracted/6531813/MemoryEngine.png)
*图：ArcNeural 论文 Figure 3，展示 MemEngine 中图拓扑、属性与边集合的内存组织。来源：arXiv HTML 论文图片。*

```python
# ArcNeural 多模态写入、checkpoint 与向量查询伪代码
def upsert_vertex(txn, vertex_id, attrs, embedding):
    txn.wal.append(("UPSERT_VERTEX", vertex_id, attrs, embedding))
    mem_engine.apply_vertex(vertex_id, attrs)
    if embedding is not None:
        # 第一阶段 write-through 到 ArcVector/Qdrant；第二阶段可写入本地 Filterable HNSW
        vector_store.upsert(collection=vertex_label(vertex_id), key=vertex_id, vector=embedding, payload=attrs)
    raft_group.replicate(txn.wal.tail())

def checkpoint():
    for log_record in wal.replay_since(last_checkpoint):
        storage_node.apply(log_record)       # RocksDB / TiKV / object storage
        if contains_vector(log_record):
            vector_store.bulk_upsert(log_record.vector_batch)
    last_checkpoint = wal.offset()

def vector_graph_query(query_vector, scalar_filter, graph_pattern, top_k):
    plan = parse_cypher_with_vector(graph_pattern)
    plan.replace("VertexScan", "VertexVectorScan")
    candidates = vector_store.search_hnsw(query_vector, filter=scalar_filter, top_k=top_k)
    return mem_engine.expand_graph(candidates, graph_pattern)
```

ArcNeural 的核心背景是 Gen-AI 应用通常同时需要三类访问：向量相似度检索用于 RAG 召回，图遍历用于关系推理和可解释路径，文档/JSON 用于保留半结构化上下文。传统做法往往把向量库、图数据库、文档库拼在一起，带来跨系统事务、同步延迟和查询编排复杂度。ArcNeural 选择以图为骨架，把向量和文档作为一等属性纳入统一查询语言。

存储层采用“log as a database”的思路。TP 计算节点先把变更写入 WAL，并通过 multi-raft 复制保证多数派持久；存储节点周期性 replay WAL 生成 checkpoint。这样计算层不是完全无状态，而是缓存近期 WAL 形成 Semi-Stateful 设计，既能快速处理实时更新，又能让底层存储替换为 RocksDB、TiKV 或对象存储。可以把有效状态写成：

$$
State(t) = Checkpoint(t_0) + \sum_{i=t_0+1}^{t} WAL_i
$$

其中 checkpoint 提供可恢复基线，WAL 增量提供实时性和故障恢复窗口。

向量索引集成分为语法层和存储层。语法层增加 `ARRAY` 和 `VECTOR` 类型，优化器在发现向量索引查询时把普通 `VertexScan` 改写成 `VertexVectorScan`，该算子返回 vertex key 与 similarity score。存储层第一阶段采用 write-through，把向量 CRUD 委托给 ArcVector/Qdrant；第二阶段计划把 Filterable HNSW 本地化，HNSW 图用 MMAP 存储，payload 和属性过滤信息用 RocksDB 存储。相似度可用余弦或内积表达：

$$
sim(q, v) = \frac{q \cdot v}{\lVert q \rVert_2 \lVert v \rVert_2}
$$

查询时先由 HNSW 取近邻候选，再把候选 vertex 交给图执行器做边扩展、属性过滤和路径匹配。

MemEngine 处理图数据库最典型的随机访问问题：拓扑遍历频繁读取边集合，而属性读取具有冷热分布。论文将图数据分为 topology data 和 attribute data，前者尽量常驻内存，后者用 LRU 缓存。Adaptive Edge Collection 针对现实图中的度数偏斜：低度点用连续 `Vec` 存边，缓存友好且内存开销低；超过阈值后切换为 `BTreeSet`，更适合高连接 super node 的插入、删除和查找。

$$
EdgeStore(v)=
\begin{cases}
Vec(edges_v), & deg(v) \le 128 \\
BTreeSet(edges_v), & deg(v) > 128
\end{cases}
$$

这个阈值借鉴 Redis Set 的实现直觉：让多数低度点保持紧凑表示，同时不给少数高度点带来线性扫描成本。

TP/AP 设计上，ArcNeural 没有把所有能力塞进一个常驻 HTAP 进程，而是让 AP 节点按需从资源池启动。TP 层解析 Cypher 扩展语法并做语义判断，若查询需要图分析或批处理，就把算子拆分为 MPP DAG，分发到 partition leader 进行 push-based vectorized execution；AP 结果再回写 TP，用于后续更新或查询。这样设计适合企业 AI 场景中的混合负载：日常写入和检索需要低延迟，批量图分析和特征计算需要弹性资源。

> ⚠️ 注意：论文中 Related Work、Benchmarking、Industrial Applications 等部分仍有未展开或占位描述，因此 ArcNeural 更像系统架构论文/技术报告；可采信的重点是其模块设计、算子改写、MemEngine 与向量索引集成路径，而不是尚未完整展开的实验结论。

#### 🧪 练习题

```yaml
question: "ArcNeural 中 VertexVectorScan 的作用是什么？"
options:
  - "把图数据库中的所有边强制落盘"
  - "在需要向量索引时替换普通 VertexScan，返回候选顶点及相似度分数"
  - "只负责 Raft 日志复制，不参与查询执行"
  - "将所有 JSON 文档转换为 BTreeSet"
answer: 1
explain: "论文描述优化器在向量索引查询中用 VertexVectorScan 替代 VertexScan，使向量近邻搜索结果能进入后续图查询执行。"
```
