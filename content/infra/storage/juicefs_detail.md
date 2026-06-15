### JuiceFS

```yaml
id: juicefs
name: JuiceFS
full_name: JuiceFS云原生文件系统 (JuiceFS Cloud-Native File System)
year: '2021'
org: Juicedata
paper_url: https://github.com/juicedata/juicefs
category: distributed_fs
parent: —
motivation: S3后端+Redis元数据,云原生
```

#### 📝 一句话总结

JuiceFS 将 POSIX 文件系统拆成客户端、对象数据存储和外部元数据引擎三部分，用 S3/OSS/Ceph/MinIO 等保存数据块，用 Redis/MySQL/TiKV 等保存强一致元数据，形成云原生共享文件系统。

#### 🎯 核心要点

- JuiceFS Client 提供 FUSE、Hadoop Java SDK、Kubernetes CSI、S3 Gateway 等接口
- 数据持久化在对象存储或 HDFS，本地只做缓存和客户端逻辑
- 元数据引擎保存目录、权限、文件大小、chunk/slice/block 映射和锁
- 文件默认拆为 64 MiB Chunk，Chunk 内含 Slice，Slice 再拆为默认 4 MiB Block
- 通过元数据事务提供多客户端强一致可见性
- 适合云上大数据、AI 训练、Kubernetes 共享卷和对象存储 POSIX 化

#### 🔬 深入细节

![JuiceFS 架构图](https://github.com/juicedata/juicefs/raw/main/docs/en/images/juicefs-arch-new.png)
*图：JuiceFS Client 位于应用与元数据引擎、对象数据存储之间，向 POSIX、Hadoop、CSI 和 S3 Gateway 暴露统一访问接口。*

```python
# JuiceFS 写入与读取伪代码
def write(path, offset, data):
    inode = meta.txn_resolve(path)
    for chunk_id, slice_data in split_into_chunks(data, size=64 * MiB):
        blocks = split(slice_data, size=4 * MiB)
        object_keys = [put_object(block) for block in blocks]
        meta.txn_append_slice(inode, chunk_id, offset, object_keys)
    local_cache.update(path, offset, data)

def read(path, offset, length):
    inode = meta.lookup(path)
    layout = meta.get_chunk_slices(inode, offset, length)
    return assemble([cache.get(k) or object_store.get(k) for k in layout.block_keys])
```

JuiceFS 的动机是把对象存储的容量、耐久性和低成本接入到需要文件语义的应用中。对象存储原生 API 不擅长目录 rename、文件锁、随机写和 Hadoop/POSIX 生态，传统分布式文件系统又需要自建完整数据节点。JuiceFS 选择将“数据面”交给对象存储，将“元数据面”交给可选数据库引擎，客户端负责协议转换与缓存。

数据布局是性能和语义的关键。文件先按 64 MiB chunk 划分，写入时产生 slice，slice 再拆成固定 block 上传到对象存储。元数据记录这些映射，因此对象桶里看到的是一批按 key 命名的块，而不是原始文件路径。随机覆盖写通常不会原地改对象，而是追加新 slice 并更新元数据映射，后台再清理失效块。

一致性依赖元数据引擎事务。客户端读目录或文件布局时访问元数据引擎，确认提交后的修改会被其他挂载点立即看到；数据块上传则可以与本地缓存、预取和并发上传结合。一个简化成本模型是：

$$
T_{read}=T_{metadata}+T_{cache/object}+T_{assemble}
$$

热点数据命中本地缓存时 \(T_{cache/object}\) 很低；冷数据则主要受对象存储延迟和吞吐影响。

与 HDFS/CephFS 相比，JuiceFS 不自带一套数据存储集群，而是复用云对象存储和外部数据库，运维边界更云原生。代价是性能高度依赖元数据引擎和对象存储后端，极端小文件和高频元数据操作需要仔细调优 Redis/TiKV/MySQL、客户端缓存和预读策略。

#### 🧪 练习题

```yaml
question: "JuiceFS 为什么需要独立的元数据引擎？"
options:
  - "对象存储无法保存任何字节数据"
  - "POSIX 目录、权限、锁和 chunk/slice/block 映射需要强一致元数据事务"
  - "为了让所有数据块都只能保存在 Redis"
  - "为了禁用本地缓存"
answer: 1
explain: "JuiceFS 将数据块放入对象存储，但文件系统语义依赖目录树、inode、文件布局和锁等元数据，这些由 Redis/MySQL/TiKV 等元数据引擎维护。"
```
