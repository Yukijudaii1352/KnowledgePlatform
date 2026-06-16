### MinIO

```yaml
id: minio
name: MinIO
full_name: MinIO对象存储 (MinIO Object Storage)
year: '2014'
org: MinIO
paper_url: https://min.io/
category: object_storage
parent: —
motivation: S3兼容高性能对象存储
```

#### 📝 一句话总结

MinIO 是高性能 S3 兼容对象存储，通过分布式 erasure set、Reed-Solomon 纠删码、quorum 读写、bitrot 校验和后台自愈，在通用服务器与云原生环境中提供面向 AI、数据湖和备份归档的对象存储底座。

#### 🎯 核心要点

- S3 兼容 API：面向 AWS SDK、Spark/Iceberg、lakehouse、备份系统、模型训练/推理管线提供对象原生接口
- 分布式 server pool：MinIO 将一组节点/磁盘自动划分为 erasure set，对象只在某个 erasure set 内切分和恢复
- Reed-Solomon 纠删码：每个对象被编码为 \(K\) 个数据分片和 \(M\) 个校验分片，满足阈值即可恢复
- Quorum 语义：PUT 尝试写所有 \(N=K+M\) 个分片，至少 \(K\) 个成功才返回；当 \(M=N/2\) 时写 quorum 使用 \(K+1\) 防 split-brain
- 强一致对象命名空间：对象 PUT/GET/DELETE/LIST 对客户端呈现已提交状态，不依赖最终一致目录缓存
- Bitrot protection：对象分片带 checksum，可检测静默数据损坏并在读/扫描时触发修复
- Self-healing：在读 quorum 存在时，用健康数据/校验分片重建丢失或损坏分片
- 设计边界清晰：专注对象存储，不提供 POSIX 文件系统或块设备接口，换取部署和性能模型简单

#### 🔬 深入细节

![MinIO erasure set 分片分布图](https://docs.min.io/aistor/operations/core-concepts/images/erasure-coding-erasure-set-shard-distribution.svg)
*图源：MinIO AIStor 官方 Erasure Coding 文档。对象在 erasure set 内被拆为 data shards 与 parity shards，并跨磁盘/节点分布。*

![MinIO read quorum 图](https://docs.min.io/aistor/operations/core-concepts/images/erasure-coding-shard-read-quorum.svg)
*图源：MinIO AIStor 官方 Erasure Coding 文档。只要保持读 quorum，系统可用剩余分片重建并返回对象。*

```python
# MinIO 风格对象 PUT/GET 伪代码，抽象自官方 erasure coding 和 quorum 语义
def put_object(bucket, key, payload, storage_class):
    erasure_set = route_to_erasure_set(bucket, key)
    K, M = choose_data_and_parity(erasure_set.size, storage_class)
    shards = reed_solomon_encode(payload, data=K, parity=M)
    checksums = [checksum(shard) for shard in shards]

    acks = parallel_write_all_drives(
        erasure_set.drives,
        shards,
        metadata={"bucket": bucket, "key": key, "K": K, "M": M, "checksums": checksums},
    )
    write_quorum = K + 1 if M * 2 == erasure_set.size else K
    if acks < write_quorum:
        abort_incomplete_object(bucket, key)
        raise WriteQuorumLost()
    commit_object_namespace(bucket, key)

def get_object(bucket, key):
    erasure_set = route_to_erasure_set(bucket, key)
    meta = read_quorum_metadata(erasure_set, bucket, key)
    shards = parallel_read_available(erasure_set.drives, meta)
    valid = [s for s in shards if verify_checksum(s)]
    if len(valid) < meta.K:
        raise ReadQuorumLost()
    payload = reed_solomon_decode(valid, data=meta.K, parity=meta.M)
    schedule_heal_for_missing_or_corrupt_shards(meta, valid)
    return payload
```

MinIO 的设计假设是：现代数据平台越来越以对象而非共享 POSIX 文件为基本单位。AI 训练样本、模型权重、Parquet/Iceberg 表文件、日志归档和备份快照都天然适合 immutable object + key namespace。S3 API 的优势是生态广、语义简单、跨语言 SDK 成熟；缺点是没有 POSIX 随机写和目录 rename。MinIO 因此不试图把对象存储伪装成完整文件系统，而是在对象层把可靠性、吞吐和一致性做强。

分布式 MinIO 的基本容错单元是 erasure set。官方文档说明，server pool 内的磁盘会被划分成同大小 erasure set；每次对象写入在一个 erasure set 内生成 \(K\) 个 data shards 和 \(M\) 个 parity shards：

$$
N=K+M
$$

其中 \(N\) 是 erasure set stripe size。\(K\) 个数据分片足以重建对象，\(M\) 个校验分片提供故障容忍。可用容量近似为：

$$
usable\_ratio=\frac{K}{K+M}
$$

例如 16 盘 erasure set、`EC:4` 时，常见直觉是 12 个数据分片加 4 个校验分片，可用比例约 75%，并能容忍若干磁盘/节点故障而不丢对象。

PUT 路径的重点是“尝试写全部分片，但 quorum 决定成功”。MinIO 官方文档强调，\(K\) 是成功阈值，不是实际写入分片数；每个 PUT 会生成所有 \(N\) 个分片并并行写到 erasure set 的各驱动器，只有足够多驱动器确认后才对客户端返回成功。如果 parity 正好等于 erasure set 的一半，则写 quorum 使用 \(K+1\)，避免网络分区时两个半区各自接受同一对象的不同写入。这是对象存储层面的 split-brain 防护。

GET 路径首先读取对象元数据 quorum，再读取可用分片并校验 checksum。只要达到 \(K\) 个有效分片，就可以通过 Reed-Solomon 解码恢复原始对象；如果某些分片缺失或 checksum 不匹配，读请求仍可成功，并把缺失/损坏分片交给 healing 流程修复。简化可写为：

$$
available\_valid\_shards \ge K \Rightarrow object\_readable
$$

这也是纠删码相比三副本的重要差异：系统不是选择某个完整副本读取，而是从多个分片中重建对象。

Bitrot protection 处理的是磁盘没有显式报错但数据位腐坏的情况。MinIO 对分片维护校验信息，读取或后台扫描时发现 checksum 不匹配，就可以把该 shard 标记为损坏；只要 read quorum 还在，就用其他健康 shard 重新计算并写回损坏 shard。后台 scanner/heal、生命周期管理、复制和对象锁等机制共同构成对象生命周期控制，但核心可靠性仍来自“纠删码 + checksum + quorum + heal”这条链。

MinIO 与 Ceph RGW、HDFS、JuiceFS 的差异在边界。Ceph 是通用分布式存储平台，可同时提供对象、块和文件接口；HDFS/JuiceFS 提供文件系统语义，适合 Hadoop/POSIX 风格任务；MinIO 专注 S3 对象接口，不承担目录树强语义和随机写抽象。这使它很适合高吞吐对象 PUT/GET、lakehouse 表文件和 AI 数据集，但若应用强依赖 POSIX rename、文件锁、mmap 或小文件逐路径遍历，通常需要在应用层打包、使用表格式，或叠加其他文件系统层。

从性能角度看，MinIO 的吞吐来自对象级并行：客户端并发请求、服务端多节点、多磁盘并行分片写入，以及 Reed-Solomon 编码的 CPU 优化。对象大小越接近顺序流式读写，越能摊薄元数据和编码成本；大量极小对象会放大 per-object 元数据、TLS、请求调度和磁盘小 I/O 成本。生产部署通常要同时关注 erasure set 大小、节点/磁盘故障域、对象大小分布、网络带宽、parity 策略和跨站复制策略。

#### 🧪 练习题

```yaml
question: "MinIO 在 erasure coding 中为什么 PUT 时尝试写所有 N 个分片，而不是只写 K 个分片？"
options:
  - "因为 K 只是成功阈值，写满 N 个分片能保留设计的校验冗余并支持后续故障自愈"
  - "因为 Reed-Solomon 编码不需要 parity shard"
  - "因为只写 K 个分片可以避免所有网络 I/O"
  - "因为 MinIO 的对象必须同时写入 POSIX 文件系统目录"
answer: 0
explain: "官方文档说明 K 是 quorum 阈值而非写入数量；PUT 会生成并并行写入 K 个数据分片和 M 个校验分片，达到 quorum 才提交，完整冗余用于容错和修复。"
```
