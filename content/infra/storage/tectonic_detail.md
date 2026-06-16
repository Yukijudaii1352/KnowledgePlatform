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

Tectonic 提出一个 exabyte 级、多租户、数据中心内统一文件系统，用分层哈希分片元数据、扁平 Chunk Store 和客户端驱动策略替代 Meta 过去的多套专用存储。

#### 🎯 核心要点

- 单个 Tectonic 集群可服务一个数据中心内多个 exabyte 级租户与任意大小 namespace
- 元数据被拆成 Name、File、Block 多层，每层映射到 ZippyDB/RocksDB/Paxos 组成的可扩展 KV 存储
- 每个元数据层按 key 哈希分片，避免 HDFS 单 NameNode 与目录局部热点限制整体容量
- Chunk Store 是扁平数据层，只保存 chunk，不理解文件、目录、租户和 block 高级语义
- Client Library 编排 Metadata Store 与 Chunk Store RPC，并在 chunk 粒度执行复制、RS 编码、hedged write 和 append
- 支持单写者语义，通过 write token 简化并发写一致性，复杂多写者语义交给上层租户实现
- 通过 TrafficGroup 与 TrafficClass 管理 IOPS、metadata QPS 等瞬时资源，实现多租户隔离与资源回收
- 后台无状态服务负责垃圾回收、block repair/scan、rebalancing、rack drain、disk inventory 和健康检查
- 按租户/调用选择耐久性策略：blob 偏低延迟追加，data warehouse 偏全 block RS 编码和批量吞吐

#### 🔬 深入细节

![Tectonic 架构图](https://static1.juicefs.com/images/gfs-3.original.png)
*图源：JuiceFS 博客转载 FAST'21 论文 Figure 2。图中 Client Library 编排 Metadata Store 与 Chunk Store，Metadata Store 内含 Name/File/Block 层和 Key-value Store，后台服务多为无状态组件。*

![Tectonic 分层元数据表](https://static1.juicefs.com/images/9_yPwUz0W.original.png)
*图源：JuiceFS 博客转载 FAST'21 论文 Table 1。Name、File、Block 层分别按目录、文件、block 等内部 ID 分片。*

```python
# Tectonic 客户端驱动写入伪代码：文件语义在 Client Library 中拼装
def tectonic_append(namespace, path, data, policy):
    file_id = metadata.name_layer.lookup(namespace, path)
    token = metadata.file_layer.acquire_write_token(file_id)

    for block_id, block_bytes in split_into_blocks(data):
        if policy.durability == "rs":
            # 论文示例包含 RS(9, 6)：9 个数据 chunk + 6 个校验 chunk
            chunks = reed_solomon_encode(block_bytes, data_chunks=policy.r, parity_chunks=policy.k)
        else:
            chunks = replicate(block_bytes, copies=policy.replication)

        candidate_nodes = metadata.block_layer.reserve_nodes(
            block_id=block_id,
            count=len(chunks) + policy.extra_reservations,
            fault_domains="rack-aware",
            traffic_group=policy.traffic_group,
        )
        winners = hedged_put_to_first_successes(chunks, candidate_nodes, quorum=policy.commit_quorum)
        metadata.block_layer.commit(block_id, winners, token=token)
        metadata.file_layer.append_block(file_id, block_id, token=token)

    metadata.file_layer.close(file_id, token=token)
```

Tectonic 的直接背景是 Meta 存储系统的碎片化。论文描述了 blob storage 分布在 Haystack 与 f4，data warehouse 分布在多个 HDFS 实例中；这些系统各自围绕 IOPS、容量、延迟和吞吐做专门优化，但也造成资源“搁浅”：Haystack 可能缺 IOPS 但剩容量，f4 可能缺容量但剩 I/O，HDFS 集群又受单实例容量和运维边界影响。Tectonic 的目标不是给每个业务再建一个新文件系统，而是把整个数据中心的存储池统一起来，使多个租户共享容量、磁盘带宽和后台运维能力。

架构上，Tectonic 把文件系统拆成三条清晰路径。Client Library 暴露类似 HDFS 的层次文件 API 和 append-only 语义，但它不是一个薄客户端，而是实际的操作编排者：它查元数据、选择耐久性策略、对 block 做复制或 RS 编码、直接向 storage node 写 chunk，并在成功后更新元数据。Metadata Store 负责命名、文件属性、block 到 chunk/disk 的映射；Chunk Store 只提供 `get/put/append/delete/list/scan` 等对象式 chunk 操作。这个分离让数据面可以线性扩展，也让不同租户可以在客户端侧选择不同读写策略。

元数据分层是 Tectonic 相对 HDFS 的关键升级。HDFS 的目录树、文件状态和 block mapping 都集中在 NameNode 内存中；Tectonic 则把元数据拆成 Name 层、File 层和 Block 层，再把每层键空间放进线性一致、可复制、可迁移分片的 KV 存储。分片规则可抽象为：

$$
shard(key) = hash(key) \bmod N
$$

Name 层用 `(dir_id, filename)` 或 `(dir_id, subdirname)` 找到文件/子目录内部 ID，File 层用 `(file_id, block_id)` 找 block 列表，Block 层用 `block_id` 找 chunk 所在 disk。哈希分片牺牲了一些目录范围局部性，但它能把大目录、热点文件和连续 ID 造成的负载扩散到多分片，从而服务 exabyte 级容量和十亿级文件数量。

Chunk Store 的“扁平”设计同样重要。storage node 不知道一个 chunk 属于哪个文件，也不决定它的复制或编码方式；它只把 chunk 存成本地 XFS 文件，并用本地磁盘、SSD 元数据/热数据缓存和公平调度处理实际 I/O。耐久性提升到 block 层，由客户端和元数据共同表达。例如 RS 编码的空间开销为：

$$
overhead_{RS(r,k)}=\frac{r+k}{r}
$$

论文中的 RS(9,6) 对应 \(15/9 \approx 1.67\) 倍存储开销，低于三副本的 \(3.0\) 倍，但修复和读取会产生更复杂的 CPU、网络和尾延迟成本。Tectonic 允许按 block 或调用选择复制/RS 策略，本质上是在容量成本、写入延迟、读取延迟和修复开销之间做租户级权衡。

一致性方面，Tectonic 避免支持任意多写者文件语义，而是采用单写者和 write token。一个 writer 打开文件后获得 token，后续追加和元数据更新都必须带 token；若第二个 writer 获取新 token，旧 writer 的开放 block 会被 seal。这样客户端可以并行写多个 chunk、做 hedged write、先写数据再提交 block metadata，而不必在数据路径上引入复杂的分布式写锁。代价是上层如果需要多写者日志或数据库语义，必须在租户服务中再实现串行化。

多租户隔离不是按每个应用单独管理，而是按 TrafficGroup 聚合应用。论文指出一个集群大约服务十个租户，但租户内部有数百应用；如果按租户隔离太粗，后台流量会影响前台请求，如果按应用隔离又过于复杂。TrafficGroup 将相似延迟和资源需求的应用放在一起，再用 Gold/Silver/Bronze TrafficClass 决定剩余资源优先级。可把瞬时资源分配理解为：

$$
allocation = guaranteed\_quota + borrowed\_surplus(TrafficClass)
$$

这让 Tectonic 在共享资源利用率和业务隔离之间取得折中。

与 GFS/HDFS 相比，Tectonic 的创新不只是“更大的 HDFS”。它把单主元数据替换为分层哈希分片的 KV 架构，把数据节点降级为不懂文件语义的 chunk 存储，把高级策略上移到客户端库，再用后台无状态服务持续修复真实状态与元数据状态之间的偏差。这套设计让一个系统能同时承载 blob、warehouse 和其他大规模租户，但也引入新的代价：元数据路径可能比本地 NameNode 更长，跨分片操作无法依赖全局事务，租户接入 Tectonic 需要理解并配置更多客户端策略。

#### 🧪 练习题

```yaml
question: "Tectonic 为什么把文件系统元数据拆成 Name、File、Block 多层并哈希分片到 KV Store？"
options:
  - "为了让 Chunk Store 保存完整目录树"
  - "为了让所有 rename 都自动成为跨分片强事务"
  - "为了让元数据容量和 QPS 水平扩展，并减少目录或单租户热点"
  - "为了取消客户端库对读写流程的编排"
answer: 2
explain: "Tectonic 的 exabyte 级目标要求元数据不能集中在单 NameNode。分层降低每层职责，哈希分片把负载扩散到多个 KV shard，但跨分片事务能力也因此受限。"
```
