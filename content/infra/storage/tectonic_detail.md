### Tectonic

```yaml
id: tectonic
name: Tectonic
full_name: Meta统一文件系统 (Meta Tectonic)
year: '2021'
org: Meta
paper_url: https://www.usenix.org/conference/fast21/presentation/pan
category: foundation
parent: hdfs
motivation: 分层哈希分片,统一存储栈
```

#### 📝 一句话总结

Tectonic 将 Meta 过去面向 blob、数据仓库等业务的多个专用存储系统统一为 exabyte 级多租户文件系统，通过分层哈希分片元数据、扁平 Chunk Store 和客户端驱动策略实现规模、隔离和业务可定制性。

#### 🎯 核心要点

- 一个 Tectonic 集群可服务单数据中心内多个 exabyte 级租户和多个命名空间
- 元数据拆成 Name、File、Block 等层，并按哈希分片到可扩展 KV 存储
- Chunk Store 是扁平对象层，存储节点只处理 get、put、append、delete 等 chunk 操作
- 客户端库把文件 API 翻译成 Metadata Store 与 Chunk Store 的 RPC 编排
- 支持租户特定策略：blob 用低延迟复制追加，warehouse 用 Reed-Solomon 编码提升效率
- 通过 traffic group 管理多租户隔离，后台服务处理修复、垃圾回收、均衡和健康检查

#### 🔬 深入细节

**核心示意图说明**：论文 Figure 2 展示 Tectonic 架构：Client Library 调用 Metadata Store 和 Chunk Store，Metadata Store 之下是 KV store 与 Name/File/Block 层，后台服务多为无状态组件。USENIX PDF 地址为 https://www.usenix.org/system/files/fast21-pan.pdf。

```text
Client Library
  |-- metadata RPC --> Metadata Store -> KV Store
  |                    |-- Name layer
  |                    |-- File layer
  |                    `-- Block layer
  |-- data RPC ------> Chunk Store -> storage nodes
  `-- policies ------> replication / RS encoding / traffic groups
Background services: repair, GC, rebalance, health, stat
```

```python
# Tectonic 写入计划伪代码
def write(namespace, path, data, tenant_policy):
    name_id = metadata.name_layer.resolve_or_create(namespace, path)
    block_plan = client.plan_blocks(data, tenant_policy)
    for block in block_plan:
        chunks = encode_or_replicate(block, tenant_policy.durability)
        placements = choose_fault_domains(chunks)
        for chunk, node in zip(chunks, placements):
            chunk_store.put(node, chunk)
        metadata.block_layer.commit(name_id, block.id, placements)
    metadata.file_layer.update_size_and_epoch(name_id)
```

Tectonic 的问题背景是 Meta 的存储“星座化”：blob 有 Haystack/f4，数据仓库有多个 HDFS 集群，不同系统分别按 IOPS、容量或吞吐峰值过度配置，资源无法互相借用。Tectonic 的目标不是做一个小型 HDFS 替代品，而是把数据中心级存储统一成一个多租户文件系统，让热 blob、冷 blob、仓库数据和 AI 训练数据共享同一套容量与 I/O 池。

扩展性来自元数据分层与哈希分片。HDFS 的 NameNode 把命名空间和 block 映射集中在一台机器上，Tectonic 把 Name、File、Block 等逻辑层拆开，并将每层键空间哈希分片到可扩展 KV 后端。哈希分片牺牲了一部分范围扫描便利性，但能避免大目录、热点租户或顺序 key 带来的单分片过载。

数据层故意保持扁平。Chunk Store 不理解文件、block 或租户高级语义，只负责本地 chunk 的读写和删除；文件语义由客户端库和元数据层拼装。这样的分离使租户可以独立选择耐久性策略：

$$
cost_{tenant}=capacity\_overhead + io\_amplification + latency
$$

Blob 小写入关注延迟，可以先复制追加再后台编码；warehouse 大写入关注空间和批处理吞吐，可以直接 RS 编码。

与 GFS/HDFS 相比，Tectonic 的创新点在“统一但不一刀切”。它把规模问题交给哈希分片元数据和扁平对象层，把性能隔离简化为少量 traffic group，把业务差异留给客户端策略。这让一个系统能替代多套专用存储，同时接近专用系统性能。

#### 🧪 练习题

```yaml
question: "Tectonic 为什么将元数据拆成多层并使用哈希分片？"
options:
  - "为了让所有文件只能顺序扫描"
  - "为了避免单 NameNode/单分片成为 exabyte 级集群的元数据瓶颈"
  - "为了取消客户端库中的策略逻辑"
  - "为了让 Chunk Store 保存完整目录树"
answer: 1
explain: "分层元数据降低单层复杂度，哈希分片使每层能水平扩展并减少热点，这是 Tectonic 取代多套 HDFS/专用系统的关键。"
```
