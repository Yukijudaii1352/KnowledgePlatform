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

GFS 提出了一套面向廉价机器、大文件、顺序读写和追加写的分布式文件系统设计，用单 Master 管元数据、Chunkserver 存数据、客户端直连数据节点来获得高吞吐和故障恢复能力。

#### 🎯 核心要点

- 单 Master 保存命名空间、文件到 chunk 的映射、chunk 副本位置和租约状态
- 文件被切成 64 MiB chunk，每个 chunk 默认三副本存储在多个 Chunkserver 上
- 客户端只向 Master 请求元数据，真实读写数据直接访问 Chunkserver
- Record Append 提供多客户端并发追加的原子语义，适合日志、队列和 MapReduce 中间结果
- Master 通过 heartbeat、租约、重复制、垃圾回收和再均衡维持副本健康
- 放松 POSIX 语义，换取简单一致性模型和面向批处理的数据吞吐

#### 🔬 深入细节

**核心示意图说明**：官方 PDF 的 Figure 1 展示了 Application/GFS client、GFS master 与多个 GFS chunkserver 的控制流和数据流。该图没有稳定的独立图片直链，官方论文入口为 https://research.google/pubs/pub51/，下面用文本重构其核心结构。

```text
Application -> GFS client --metadata--> GFS master
                         <--handle, replicas--
GFS client  --chunk data read/write--> Chunkserver replicas
Master      --heartbeat, lease, GC-->  Chunkservers
```

```python
# GFS 读路径与追加写伪代码
def read(path, offset, length):
    chunk_index = offset // CHUNK_SIZE_64MB
    handle, replicas = master.lookup(path, chunk_index)
    server = choose_nearest(replicas)
    return server.read(handle, offset % CHUNK_SIZE_64MB, length)

def record_append(path, data):
    handle, primary, secondaries = master.get_lease_holder(path)
    for s in [primary] + secondaries:
        s.push_temp_data(data)
    serial = primary.assign_append_order(handle, len(data))
    for s in secondaries:
        s.apply_append(serial)
    primary.commit(serial)
```

GFS 的设计动机来自 Google 当时的数据处理负载：文件通常是数百 MB 到 GB 级，访问模式以大规模顺序读、顺序追加和少量随机读为主，单次请求延迟并不是首要目标。传统分布式文件系统强调通用 POSIX 语义和缓存一致性，但这会让 Master、缓存和锁协议复杂化。GFS 选择放松一致性，避免客户端数据缓存，把优化重点放在持续带宽、故障恢复和应用协同上。

核心机制是将控制面和数据面分离。Master 持有全局元数据，因此可以做副本放置、chunk 迁移、垃圾回收和租约分配；但它不承载文件数据流量，客户端拿到 chunk handle 和副本位置后直接与 Chunkserver 通信。读操作的地址换算可写成：

$$
chunk\_index=\left\lfloor\frac{offset}{64MiB}\right\rfloor,\quad chunk\_offset=offset\bmod 64MiB
$$

写入路径中，Master 为某个 chunk 选择 primary replica 并授予租约。客户端先把数据推送到所有副本，primary 决定变更顺序，再让 secondary 按同样顺序执行，从而保证一个 chunk 内的修改顺序一致。Record Append 更进一步，让系统选择实际追加偏移，应用只关心每条记录至少原子写入一次；失败时可能产生 padding 或重复记录，应用通过记录校验处理。

与传统文件系统相比，GFS 的关键取舍是“让应用适配存储语义”。它不试图支持高频小文件随机更新，而是为搜索索引构建、日志收集、批处理和多生产者追加优化。单 Master 不是简单瓶颈，因为元数据常驻内存、客户端缓存元数据、数据流不经过 Master；但这也决定了后续 Colossus 需要通过分布式元数据继续扩展。

#### 🧪 练习题

```yaml
question: "GFS 为什么让客户端直接访问 Chunkserver，而不是让所有数据经过 Master？"
options:
  - "为了让 Master 可以缓存所有文件数据"
  - "为了把 Master 限制在元数据控制面，避免其成为数据带宽瓶颈"
  - "为了完全避免副本一致性协议"
  - "为了让每个文件只能有一个客户端访问"
answer: 1
explain: "Master 保存命名空间和 chunk 位置信息，客户端拿到元数据后直接访问 Chunkserver，数据面不经过 Master，系统才能在大量客户端下保持高聚合吞吐。"
```
