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

JuiceFS 将 POSIX 文件系统拆成客户端、对象数据存储和外部元数据引擎三层，用 S3/OSS/Ceph/MinIO 等对象存储承载数据块，用 Redis/MySQL/TiKV/PostgreSQL 等保存强一致元数据，解决云上对象存储缺少文件语义的问题。

#### 🎯 核心要点

- 三层架构：JuiceFS Client 负责文件系统协议与缓存，Object Storage/HDFS 保存数据块，Metadata Engine 保存 inode、目录树、锁和 chunk/slice/block 映射
- 多接口接入：同一命名空间可通过 FUSE/POSIX、Hadoop Java SDK、Kubernetes CSI Driver、S3 Gateway、WebDAV 等方式访问
- 数据布局：文件按最大 64 MiB Chunk 定位，写入生成 Slice，Slice 再拆成默认最大 4 MiB Block 上传对象存储
- 写入模型：随机覆盖通常不是原地改对象，而是追加新 slice 并通过元数据映射决定读取时的最新可见数据
- 一致性模型：依赖元数据引擎事务提供 close-to-open consistency、原子 rename 和跨客户端元数据可见性
- 性能路径：客户端通过本地磁盘/内存缓存、预读、并发上传、异步 compaction、碎片整理降低对象存储延迟影响
- 运维取舍：复用云对象存储的容量与耐久性，但性能高度受元数据引擎、对象存储延迟和小文件/元数据热点影响

#### 🔬 深入细节

![JuiceFS 官方架构图](https://juicefs.com/docs/assets/images/juicefs-arch-35dea5fb3800c27ff2bce37ae97d6ff2.svg)
*图源：JuiceFS 官方 Architecture 文档。Client 位于应用协议与后端存储之间，分别连接 metadata engine 和 data storage。*

![JuiceFS 文件切分图](https://juicefs.com/docs/assets/images/how-juicefs-stores-files-853a3b7c28513773cc2105d3a4ff63fa.svg)
*图源：JuiceFS 官方 Architecture 文档。文件被映射为 chunk、slice、block，原始文件名和目录结构不直接出现在对象桶中。*

```python
# JuiceFS 写入/读取路径伪代码，抽象自官方 chunk-slice-block 设计
CHUNK_SIZE = 64 * MiB
BLOCK_SIZE = 4 * MiB

def write(path, offset, data):
    inode = meta.txn_lookup_or_create_inode(path)
    for chunk_id, chunk_offset, chunk_bytes in split_by_file_offset(data, offset, CHUNK_SIZE):
        slice_id = meta.alloc_slice(inode, chunk_id, chunk_offset, len(chunk_bytes))
        object_keys = []
        for block_index, block in enumerate(split(chunk_bytes, BLOCK_SIZE)):
            key = object_store.put(block)
            object_keys.append((block_index, key, checksum(block)))
        # flush/close 时提交 slice 到元数据；覆盖写通过新 slice 遮蔽旧 slice
        meta.txn_commit_slice(inode, chunk_id, slice_id, chunk_offset, object_keys)
    cache.write_through_or_buffer(path, offset, data)

def read(path, offset, length):
    inode = meta.lookup(path)
    chunk_views = meta.resolve_visible_slices(inode, offset, length)
    blocks = []
    for block_ref in chunk_views.visible_block_refs():
        blocks.append(cache.get(block_ref.key) or object_store.get(block_ref.key))
    return assemble_latest_bytes(blocks, offset, length)
```

JuiceFS 的核心动机不是重新实现一套完整存储集群，而是把云对象存储“包装”为共享文件系统。对象存储有容量弹性、耐久性和低运维成本，但缺少 POSIX 目录树、原子 rename、文件锁、随机写、Hadoop 文件接口等语义。JuiceFS 因此把数据面和元数据面解耦：对象存储只保存不可理解的 block 对象，元数据引擎保存 inode、目录项、权限、时间戳、引用计数、锁、session 以及文件到对象 block 的映射。这种拆分使客户端可以在本地实现 FUSE/SDK/CSI/S3 Gateway，而后端数据仍由 S3 兼容系统负责持久化。

文件布局是 JuiceFS 性能模型的关键。给定文件偏移 \(o\)，客户端先定位 chunk：

$$
chunk\_id=\left\lfloor\frac{o}{64\,MiB}\right\rfloor,\quad chunk\_off=o\bmod 64\,MiB
$$

Chunk 只是逻辑定位单元，真正写入会形成 slice；slice 表示一次连续写入，不能跨 chunk。Flush 时 slice 继续拆为 block，默认最大 4 MiB，以便多线程并发上传对象存储并复用客户端缓存。这样做的直接好处是大文件顺序写能保持高吞吐，小范围覆盖写也不需要重写整个 64 MiB chunk；代价是多次覆盖会形成重叠 slice，需要读取路径按“最新写入覆盖旧写入”的规则解析可见区间。

读取时，客户端先查元数据而不是直接按文件名去对象桶取文件。对象桶中通常只有 `chunks/` 下的编号对象，无法从对象名还原原始文件树。一次读请求的延迟可近似拆为：

$$
T_{read}=T_{meta\_lookup}+T_{cache\_miss}\cdot T_{object}+T_{assemble}
$$

当工作集命中本地缓存或预读缓存时，\(T_{object}\) 被显著削弱；冷读、小文件、随机读则更依赖元数据引擎和对象存储的尾延迟。JuiceFS 因此把缓存、预读、并发下载、block checksum 和后台 compaction 放在客户端侧，让对象存储保持简单的 PUT/GET 语义。

一致性主要由元数据引擎的事务能力承担。官方说明中，JuiceFS 提供 close-to-open consistency：一个客户端写入并关闭文件后，其他客户端后续 open/read 可以看到已提交结果；rename 等元数据操作由后端事务保证原子性。这里的“强一致”不是说对象存储对目录语义有感知，而是元数据提交点定义了文件系统可见状态。常见写入流程是先上传或准备 block，再以事务方式提交 slice 映射；如果元数据未提交，孤儿 block 可由后台回收逻辑清理。

碎片问题是该设计的主要副作用。若同一 chunk 内反复小范围覆盖，slice 数量会增长，读取必须在多个重叠 slice 中选择每个字节范围的最新版本，元数据和对象访问都会变重。JuiceFS 会评估文件碎片并异步 compaction，把同一 chunk 内的有效 slice 合并成更少对象块。可以把碎片读放大写成：

$$
amp_{read}\approx \frac{\#visible\_slices+\#overlapped\_slices}{\#logical\_ranges}
$$

当 \(amp_{read}\) 升高时，系统需要更多元数据解析和 block 拼接；compaction 用额外后台 I/O 换取后续读路径稳定。

与 HDFS/CephFS/Lustre 不同，JuiceFS 不要求自建一组数据节点来承载所有文件数据，也不把块设备或对象守护进程纳入文件系统本身。它更像是“POSIX 元数据层 + 对象存储数据层 + 客户端缓存层”的组合。优势是部署云原生、可直接吃到对象存储容量和跨云生态；风险是元数据引擎成为强一致路径上的关键依赖，小文件风暴、目录热点、Redis 内存上限、TiKV/MySQL 事务延迟和对象存储限流都会直接反映到文件系统性能。

#### 🧪 练习题

```yaml
question: "JuiceFS 为什么将文件拆成 chunk、slice 和 block 三层？"
options:
  - "为了让对象桶直接按原始文件路径保存完整文件"
  - "为了用 chunk 定位文件偏移、用 slice 表示连续写入、用 block 作为对象存储和缓存的物理单元"
  - "为了绕过所有元数据事务，只依赖对象存储列表操作"
  - "为了让每次随机写都重写整个对象桶"
answer: 1
explain: "Chunk 负责逻辑定位，slice 记录一次连续写入，block 是最终上传对象存储的固定大小数据单元；元数据引擎维护这些映射并提供文件语义。"
```
