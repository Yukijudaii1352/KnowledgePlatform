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

MinIO 是高性能 S3 兼容对象存储，通过分布式 erasure coding、强一致对象命名空间、bitrot 校验和自愈机制，在通用硬件上提供云原生 AI/数据湖对象存储底座。

#### 🎯 核心要点

- 提供 S3 API 兼容接口，适配 PyTorch、Iceberg、Spark、lakehouse 和云原生工具链
- 分布式部署由多个 server pool 和 erasure set 组成，数据和校验分片跨磁盘/节点放置
- Erasure coding 在容量效率与故障容忍之间折中，替代简单三副本
- 对象写入采用 quorum 语义，读写后对客户端呈现强一致结果
- bitrot protection 使用校验和检测静默数据损坏，自愈后台修复缺失或损坏分片
- 面向 AIStor/AI 数据基础设施强调高吞吐、扁平命名空间和对象原生生态

#### 🔬 深入细节

**核心示意图说明**：MinIO 产品页强调 S3 兼容、高吞吐、exabyte scale 和 AI 生态；官方架构图直链随站点版本变化，以下按公开设计重构其分布式对象路径。

```text
S3 Client / SDK
  -> MinIO server pool
     -> erasure set
        |-- disk/node shard 0..k-1
        `-- parity shard 0..m-1
Background: scanner, heal, lifecycle, replication, object lock
```

```python
# MinIO 风格对象 PUT/GET 伪代码
def put_object(bucket, key, bytes):
    erasure_set = route(bucket, key)
    data_shards, parity_shards = erasure_encode(bytes, k, m)
    writes = parallel_write(erasure_set.disks, data_shards + parity_shards)
    require_write_quorum(writes)
    commit_xl_metadata(bucket, key, checksum(bytes), layout=(k, m))

def get_object(bucket, key):
    meta = read_quorum_metadata(bucket, key)
    shards = parallel_read_available(meta.layout)
    verify_checksums(shards)
    return erasure_decode(shards, meta.layout)
```

MinIO 的基本判断是：现代 AI 和数据湖越来越以对象为中心，而不是以 POSIX 共享文件系统为中心。对象存储的优势在于 API 简洁、命名空间扁平、天然适合多租户和跨区域复制；劣势是追加、随机写和目录语义弱。MinIO 选择完整兼容 S3 API，把可靠性和高吞吐放在对象层解决。

分布式 MinIO 的关键是 erasure set。对象写入时被切分为 \(k\) 个数据分片和 \(m\) 个校验分片，分散到不同磁盘或节点；只要可用分片数达到阈值，就能恢复对象：

$$
usable\_capacity \approx \frac{k}{k+m},\quad tolerate \le m\ \text{shard failures}
$$

相比三副本，纠删码显著降低容量开销；相比单机 RAID，分片跨节点放置能容忍更大故障域。

一致性通过对象级元数据和 quorum 写入实现。客户端 PUT 只有在足够多分片和元数据提交成功后才返回；GET 读取元数据 quorum，选择可用分片并校验 checksum。后台 scanner/heal 会发现缺失、过期或损坏分片，用健康分片重建，bitrot 校验用于检测磁盘静默损坏。

与 Ceph RGW 相比，MinIO 的系统边界更窄：专注 S3 对象，不同时提供 CephFS/RBD 这类通用块文件接口，因此部署和性能模型更直接。与 HDFS/JuiceFS 相比，它不是 POSIX 文件系统，而是对象原生存储，更适合模型权重、训练样本对象、lakehouse 表文件和归档数据。

#### 🧪 练习题

```yaml
question: "MinIO 使用 erasure coding 的主要目的是什么？"
options:
  - "让每个对象只能存在一个磁盘上"
  - "在较低容量开销下提供多磁盘/多节点故障容忍"
  - "把 S3 API 转换成 POSIX rename"
  - "禁止后台自愈"
answer: 1
explain: "对象被切为数据分片和校验分片，满足阈值即可恢复，相比三副本可用更低容量开销获得容错能力。"
```
