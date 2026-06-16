### GFS

```yaml
id: gfs
name: GFS
full_name: 谷歌文件系统 (Google File System)
year: '2003'
org: Google
paper_url: https://research.google/pubs/pub51/
category: foundation
parent: —
motivation: 大规模廉价硬件上的可靠存储
```

#### 📝 一句话总结

GFS 提出了一套面向廉价机器、大文件、顺序读写和并发追加的分布式文件系统设计，用单 Master 管元数据、Chunkserver 存 chunk、副本和租约保证写入顺序，解决了 Google 批处理负载下可靠存储与高吞吐访问的问题。

#### 🎯 核心要点

- 单 Master 保存命名空间、文件到 chunk 的映射、chunk 副本位置和租约状态
- 文件被切成 64 MiB chunk，每个 chunk 默认三副本存储在多个 Chunkserver 上
- 客户端只向 Master 请求元数据，真实读写数据直接访问 Chunkserver
- Record Append 提供多客户端并发追加的原子语义，适合日志、队列和 MapReduce 中间结果
- Master 用 chunk lease 指定 primary replica，由 primary 给 mutation 排序，secondaries 按同样顺序执行
- 写入时数据流和控制流分离，数据沿 Chunkserver 链式 pipeline 传播，控制消息走 client -> primary -> secondaries
- Master 元数据常驻内存，命名空间和 file-to-chunk 映射通过 operation log 与 checkpoint 持久化
- Master 通过 heartbeat、版本号、重复制、垃圾回收、checksum 和再均衡维持副本健康
- 放松 POSIX 语义，要求应用用 append、checkpoint、自校验记录和去重适配一致性模型

#### 🔬 深入细节

![GFS Architecture](https://www.0xkishan.com/blogs/gfs/gfs_architecture.png)
*图：GFS 架构图，来自公开论文解读页 0xkishan，对 Google 论文 Figure 1 的 Application/GFS client、GFS master、GFS chunkserver、控制流和数据流关系做了可访问图片重绘；官方论文入口为 https://research.google/pubs/pub51/。*

```text
Application -> GFS client --metadata--> GFS master
                         <--handle, replicas--
GFS client  --chunk data read/write--> Chunkserver replicas
Master      --heartbeat, lease, GC-->  Chunkservers
```

```python
# GFS read / write / record append 伪代码
def read(path, offset, length):
    chunk_index = offset // CHUNK_SIZE_64MB
    handle, replicas = master.lookup(path, chunk_index)
    server = choose_nearest(replicas)
    return server.read(handle, offset % CHUNK_SIZE_64MB, length)

def write(path, offset, data):
    chunk_index = offset // CHUNK_SIZE_64MB
    handle, primary, secondaries = master.get_lease_holder(path, chunk_index)
    for s in [primary] + secondaries:
        s.buffer(data)                       # data flow: push to all replicas
    serial = primary.assign_serial(handle)   # control flow: primary orders mutation
    primary.apply(handle, offset, data, serial)
    for s in secondaries:
        s.apply(handle, offset, data, serial)
    return primary.ack_when_all_done(serial)

def record_append(path, record):
    handle, primary, secondaries = master.get_last_chunk_lease(path)
    for s in [primary] + secondaries:
        s.buffer(record)
    offset = primary.choose_append_offset(handle, len(record))
    if offset + len(record) > CHUNK_SIZE_64MB:
        primary.pad_to_chunk_boundary(handle)
        return retry_on_next_chunk(path, record)
    primary.append(handle, offset, record)
    for s in secondaries:
        s.append(handle, offset, record)
    return offset
```

GFS 的出发点不是做一个通用 POSIX 文件系统，而是服务 Google 当时的大规模数据处理负载。论文明确假设硬件故障是常态，文件通常是数百 MB 到 GB 级，访问模式主要是大规模顺序读、顺序追加和少量随机读；高持续带宽比单次低延迟更重要。这个工作负载决定了 GFS 的关键取舍：牺牲一部分通用文件系统语义，换取简单的控制面、可恢复的副本机制和高吞吐数据面。

架构上，单 Master 负责全局元数据：命名空间、访问控制、file-to-chunk 映射、chunk 位置、lease、垃圾回收、迁移和再复制。数据不经过 Master，文件内容被切成 64 MiB chunk，每个 chunk 有不可变的 64-bit handle，默认三个副本存储为 Chunkserver 本地 Linux 文件。读路径只把 Master 当目录服务：客户端把应用的文件名和字节偏移转成 chunk index，向 Master 取 handle 和 replica locations，然后直接找最近的 Chunkserver 读数据。地址换算可以写成：

$$
\mathrm{chunk\_index}=\left\lfloor\frac{\mathrm{offset}}{64\mathrm{MiB}}\right\rfloor,\quad
\mathrm{chunk\_offset}=\mathrm{offset}\bmod 64\mathrm{MiB}
$$

64 MiB chunk 远大于传统文件系统 block，这不是偶然。大 chunk 减少客户端访问 Master 的次数，因为顺序读写同一个 chunk 只需第一次查位置；它也降低了 Master 内存元数据规模，并让客户端可以和 Chunkserver 维持较长 TCP 连接。代价是小文件可能形成热点，论文也记录了早期 batch-queue 可执行文件单 chunk 被大量机器同时读取导致热点，解决办法是提高复制因子和错峰启动。

写入路径的关键是 lease 与 mutation order。Master 为某个 chunk 的一个副本授予 lease，这个副本成为 primary；primary 给所有 mutation 分配连续 serial number，secondary replicas 按同样顺序应用，因此同一 chunk 内副本可以保持一致的 mutation 顺序。写入时数据流和控制流分离：客户端先把数据推到所有副本的缓存，随后向 primary 发送写请求；primary 排序后通知 secondaries 应用，最后汇总 ACK。数据还会按网络拓扑在 Chunkserver 间链式 pipeline 传播，以尽量用满每台机器的出带宽。

Record Append 是 GFS 面向 Google 应用最重要的语义扩展。传统 write 由客户端指定 offset，多客户端并发写同一区域会交错；Record Append 只让客户端提交 record，实际 offset 由 primary 选择。若当前 chunk 剩余空间不足，primary 先填充到 chunk 边界并让客户端重试下一个 chunk；若成功，则所有副本在同一 offset 写入该 record。语义是“至少一次原子追加”：成功返回的 record 作为连续字节序列写入，但失败重试可能产生 padding、重复记录或不一致间隙。

这也解释了 GFS 的一致性模型为什么需要应用配合。论文并不追求所有副本任意时刻 bytewise identical，而是让应用使用 append 而非覆盖写，周期性 checkpoint，并在 record 中携带 checksum、唯一 ID 等自校验信息。读者只处理已定义区域，丢弃 padding 和坏 record，必要时按 ID 去重。换句话说，GFS 把复杂的强一致随机更新问题转化为“存储系统提供高吞吐追加，应用层处理少量重复和校验”。

Master 的单点设计看起来冒险，但它通过控制面瘦身降低瓶颈风险。元数据常驻内存，每个 64 MiB chunk 的 Master 元数据少于 64 字节；客户端缓存 chunk 位置；真实数据流绕开 Master。命名空间和 file-to-chunk 映射通过 operation log 持久化并复制到远端，checkpoint 加速恢复；chunk locations 不持久化，因为 Chunkserver 本身才是“我有哪些 chunk”的权威来源，Master 启动或节点加入时重新询问即可。

故障恢复围绕“副本最终健康”展开。Master 通过 HeartBeat 发现 Chunkserver 状态，使用版本号排除错过 mutation 的 stale replicas，通过 re-replication 补齐副本数，用 garbage collection 清理孤儿 chunk，并靠 checksum 发现磁盘损坏。与传统分布式文件系统相比，GFS 的创新不在某个单独算法，而是在一整套面向批处理负载的工程取舍：单 Master 简化全局决策，大 chunk 降低元数据压力，数据面直连保证吞吐，Record Append 把并发生产者写入变成系统原语。

#### 🧪 练习题

```yaml
question: "GFS 为什么让客户端直接访问 Chunkserver，而不是让所有文件数据经过 Master？"
options:
  - "为了让 Master 可以缓存所有文件数据"
  - "为了把 Master 限制在元数据控制面，避免其成为数据带宽瓶颈"
  - "为了完全避免副本一致性协议"
  - "为了让每个文件只能有一个客户端访问"
answer: 1
explain: "Master 保存命名空间和 chunk 位置信息，客户端拿到元数据后直接访问 Chunkserver，数据面不经过 Master，系统才能在大量客户端下保持高聚合吞吐。"
```
