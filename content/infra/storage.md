---
domain: infra
topic_id: storage
topic_name: AI存储系统
page_icon: 💾
page_title: AI存储系统技术演进
page_subtitle: '{build_date}版'
page_desc: 从GFS奠基到大模型时代的存储优化——涵盖大规模训练数据存储、高速缓存、Checkpoint优化与分布式文件系统的技术演进
hero_pills:
- 🏷️ AI Storage
- Checkpoint
- Distributed FS
- Data Loading
count_pill: '{count}个算法'
categories:
  foundation:
    label: 奠基系统
    color: '#4A90D9'
  distributed_fs:
    label: 分布式文件系统
    color: '#50C878'
  object_storage:
    label: 对象与云原生存储
    color: '#9B59B6'
  checkpoint:
    label: 检查点优化
    color: '#E74C3C'
  cache:
    label: 高速缓存与数据加载
    color: '#F39C12'
  emerging:
    label: 2026前沿技术
    color: '#1ABC9C'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/storage/overview/zhihu__FAST_2002–2026：AI_时代来了，存储系统的问题变了吗？__97f2fa59/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/infra/storage/latest/zhihu__《ASP-DAC_2026-Storage_system_and_memory_architectu__629cf547/article.md

## 算法演化关系

```yaml
nodes:
- id: gfs
  x: 0
  y: 10
  category: foundation
- id: hdfs
  x: 13
  y: 10
  category: foundation
- id: colossus
  x: 30
  y: 15
  category: foundation
- id: tectonic
  x: 78
  y: 10
  category: foundation
- id: lustre
  x: 0
  y: 30
  category: distributed_fs
- id: ceph
  x: 13
  y: 35
  category: distributed_fs
- id: glusterfs
  x: 13
  y: 25
  category: distributed_fs
- id: beegfs
  x: 48
  y: 30
  category: distributed_fs
- id: juicefs
  x: 78
  y: 35
  category: distributed_fs
- id: falconfs
  x: 96
  y: 30
  category: distributed_fs
- id: minio
  x: 48
  y: 50
  category: object_storage
- id: alluxio
  x: 48
  y: 55
  category: object_storage
- id: gds
  x: 74
  y: 50
  category: object_storage
- id: deepfreeze
  x: 74
  y: 75
  category: checkpoint
- id: checkfreq
  x: 78
  y: 70
  category: checkpoint
- id: checknrun
  x: 87
  y: 75
  category: checkpoint
- id: bytecheckpoint
  x: 96
  y: 70
  category: checkpoint
- id: universal_ckpt
  x: 96
  y: 65
  category: checkpoint
- id: dali
  x: 65
  y: 90
  category: cache
- id: aistore
  x: 70
  y: 85
  category: cache
- id: quiver
  x: 74
  y: 90
  category: cache
- id: baleen
  x: 91
  y: 90
  category: cache
- id: cedar
  x: 91
  y: 85
  category: cache
- id: modyn
  x: 96
  y: 85
  category: cache
- id: nvmeof
  x: 57
  y: 95
  category: emerging
- id: learned_index
  x: 65
  y: 95
  category: emerging
- id: cxl
  x: 70
  y: 95
  category: emerging
- id: arcneural
  x: 96
  y: 95
  category: emerging
edges:
- from: gfs
  to: hdfs
  label: 开源实现
- from: gfs
  to: colossus
  label: 去中心化
- from: hdfs
  to: tectonic
  label: 统一栈
- from: lustre
  to: beegfs
  label: 临时FS
- from: lustre
  to: falconfs
  label: DL优化
- from: hdfs
  to: juicefs
  label: 云原生
- from: hdfs
  to: minio
  label: S3兼容
- from: hdfs
  to: alluxio
  label: 数据编排
- from: minio
  to: gds
  label: GPU直连
- from: checkfreq
  to: checknrun
  label: 差异化
- from: checkfreq
  to: bytecheckpoint
  label: 大模型
- from: bytecheckpoint
  to: universal_ckpt
  label: 原子化
- from: quiver
  to: baleen
  label: ML驱动
- from: dali
  to: cedar
  label: 统一管道
- from: cedar
  to: modyn
  label: 动态数据
- from: gfs
  to: lustre
  label: HPC并行
- from: hdfs
  to: checkfreq
  label: 检查点
- from: alluxio
  to: quiver
  label: AI缓存
- from: gds
  to: dali
  label: GPU加速
- from: beegfs
  to: gds
  label: GPUDirect
- from: tectonic
  to: bytecheckpoint
  label: 大规模
- from: juicefs
  to: arcneural
  label: 多模态
- from: learned_index
  to: arcneural
  label: ML索引
- from: nvmeof
  to: cxl
  label: 内存扩展
milestones:
- gfs
- quiver
- bytecheckpoint
```

## 核心算法

### GFS

```yaml
id: gfs
num: 1
name: GFS
full_name: 谷歌文件系统 (Google File System)
year: '2003'
org: Google
parent: —
paper_url: https://research.google/pubs/pub51/
project_url: ''
category: foundation
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

### HDFS

```yaml
id: hdfs
num: 2
name: HDFS
full_name: Hadoop分布式文件系统 (Hadoop Distributed File System)
year: '2006'
org: Apache
parent: gfs
paper_url: https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html
project_url: ''
category: foundation
motivation: GFS开源实现,批处理优化
```

#### 📝 一句话总结
HDFS 将 GFS 的单主元数据、固定大小数据块、副本复制和客户端直连数据节点思想做成开源 Hadoop 存储层，解决廉价机器集群上大文件批处理的高吞吐与容错问题。

#### 🎯 核心要点
- 单 NameNode 管理命名空间、权限、文件到 block 的映射、block 副本位置和副本修复决策
- 多 DataNode 存储真实 block 文件，周期性向 NameNode 发送 heartbeat 与 block report
- 文件被切分为可配置大小的 block，block 副本数可在文件创建时指定并可后续调整
- 默认三副本机架感知放置策略在本地/同机架写入成本、跨机架容灾和读取带宽之间折中
- 客户端读写数据不经过 NameNode：读路径选择最近副本，写路径采用 DataNode pipeline replication
- 采用 write-once-read-many 与单写者模型，支持 append/truncate，但不优化任意位置高频更新
- 通过 EditLog、FsImage、SafeMode、checksum、re-replication 和 balancer 维持元数据与数据可靠性
- 为 Hadoop/MapReduce 暴露 block locality，使调度器可将计算移动到数据所在节点或同机架节点

#### 🔬 深入细节
![HDFS 架构图](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/images/hdfsarchitecture.png)
*图源：Apache Hadoop HDFS Architecture。NameNode 处理 metadata/block ops，DataNode 存储 blocks，客户端数据读写直接访问 DataNode。*

![HDFS block 副本图](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/images/hdfsdatanodes.png)
*图源：Apache Hadoop HDFS Architecture。NameNode 记录文件、复制因子、block id 与 DataNode 副本位置。*

```python
# HDFS 写入、读取与副本修复的核心流程伪代码
def hdfs_create(path, byte_stream, replication=3):
    inode = namenode.create(path, replication=replication)
    for block_bytes in split_into_blocks(byte_stream):
        targets = namenode.choose_targets(
            writer=client.host,
            replication=replication,
            policy="rack-aware",
        )
        # 客户端只向 pipeline 头节点发送 packet；DN1 再转发给 DN2，DN2 再转发给 DN3
        pipeline = open_pipeline(targets)
        for packet in packetize(block_bytes):
            pipeline.write(packet)
            pipeline.wait_ack_from_all_live_nodes()
        namenode.commit_block(inode, block_id(block_bytes), targets)
    namenode.close(inode)

def hdfs_read(path):
    for block in namenode.get_block_locations(path):
        replicas = sort_by_network_distance(block.replicas, client.host)
        for replica in replicas:
            try:
                yield datanode_read(replica, block.offset, verify_checksum=True)
                break
            except ChecksumError:
                namenode.report_bad_block(replica)

def namenode_repair_loop():
    for dn in datanodes:
        if heartbeat_timed_out(dn):
            mark_dead(dn)
            for block in blocks_previously_on(dn):
                if live_replica_count(block) < desired_replication(block):
                    src = choose_live_replica(block)
                    dst = choose_new_target(block, avoid_existing_racks=True)
                    schedule_replication(src, dst, block)
```

HDFS 的设计前提是“故障常态化”和“大文件流式访问”。官方文档明确把硬件失败、Streaming Data Access、Large Data Sets、Simple Coherency Model 和“Moving Computation is Cheaper than Moving Data”列为核心假设：集群可以有成百上千台廉价机器，任意时刻都可能有磁盘、节点或网络失败；典型文件是 GB 到 TB 级；应用更关心高吞吐扫描而非交互式低延迟。因此 HDFS 牺牲一部分 POSIX 语义，采用写一次读多次、单写者、顺序追加的模型，让一致性协议和锁管理足够简单。

NameNode 是 HDFS 的控制面。它保存目录树、权限、配额、文件长度、block 列表和 block 到 DataNode 的映射，所有 namespace 变更都会写入 EditLog，FsImage 则保存元数据快照。DataNode 是数据面，负责本地 block 文件、校验和文件、读写服务和副本创建/删除。这个分离带来一个关键性质：用户数据不流经 NameNode，NameNode 只参与寻址与调度；一旦客户端拿到 block locations，数据吞吐由多个 DataNode 并行承担。

写路径体现了 HDFS 对吞吐和容错的折中。客户端向 NameNode 请求一个新 block 的目标节点列表，随后建立 `client -> DN1 -> DN2 -> DN3` 的 pipeline。每个 packet 沿 pipeline 前推，并由下游节点反向 ACK；如果中间 DataNode 失败，客户端会切换到缩短后的 pipeline，并让 NameNode 稍后补足副本。这个机制把网络复制与磁盘写入重叠起来，理想写入吞吐近似受限于 pipeline 中最慢一段：

$$
BW_{write} \approx \min(BW_{client,DN1}, BW_{DN1,DN2}, BW_{DN2,DN3}, BW_{disk})
$$

默认三副本机架感知策略不是简单地把三个副本放到三个不同机架。常见写入场景下，第一个副本放写入方本机或同机架节点，第二个副本放远端机架，第三个副本放在同一个远端机架的另一台机器。这样少一次跨机架复制，写入成本更低，同时仍能容忍单节点失败和多数机架内局部故障；若只考虑独立节点故障且单副本失败概率为 \(p\)，三副本同时丢失概率可粗略写成：

$$
P_{loss} \approx p^3
$$

实际系统还要处理机架、电源、交换机等相关故障，所以 rack-aware placement 比单纯增加副本数更重要。

读路径则利用副本位置优化延迟和跨机架带宽。客户端先从 NameNode 获取每个 block 的副本列表，再按网络距离排序，优先选择本机、同机架、同数据中心的副本。若读取时 checksum 校验失败，客户端可以切换到其他副本，并向 NameNode 报告坏块。这个策略让 HDFS 与 MapReduce 调度形成闭环：调度器知道 block 位置信息后，可优先把 map task 调度到持有副本的机器，减少大规模扫描时的数据搬运。

HDFS 的可靠性由多条后台机制共同维护。DataNode heartbeat 说明节点仍存活，block report 让 NameNode 重建“哪些节点持有哪些 block”的视图；NameNode 启动进入 SafeMode，等待足够多 block 达到最小副本数后再开始复制；re-replication 修复低副本 block；balancer 在磁盘利用率不均时搬迁副本；checksum 发现静默损坏。后来的 HA NameNode、Federation、快照、透明加密、Erasure Coding 和存储介质策略都是在这个核心架构上继续扩展，但单 NameNode 内存、小文件元数据压力和强 Hadoop 生态绑定仍是它与 Tectonic、Colossus 等后续系统的主要差异。

#### 🧪 练习题
```yaml
question: "HDFS 为什么让客户端拿到 block 位置后直接访问 DataNode，而不是让所有数据流经 NameNode？"
options:
  - "为了让 NameNode 保存每个 block 的完整数据内容"
  - "为了避免 NameNode 成为数据吞吐瓶颈，并让多个 DataNode 并行承载 I/O"
  - "为了取消 block report 和 heartbeat"
  - "为了禁止 MapReduce 使用数据本地性"
answer: 1
explain: "NameNode 是元数据控制面，数据面由 DataNode 承担。客户端直连 DataNode 能避免主节点承载大流量，并让读取、写入和复制按 block 并行扩展。"
```

### Colossus

```yaml
id: colossus
num: 3
name: Colossus
full_name: 谷歌下一代文件系统 (Google Colossus)
year: '2010'
org: Google
parent: gfs
paper_url: https://cloud.google.com/blog/products/storage-data-transfer/a-peek-behind-colossus-googles-file-system
project_url: ''
category: foundation
motivation: 去中心化元数据,10EB+规模
```

#### 📝 一句话总结
Colossus 是 GFS 的下一代实现，将单 Master 元数据演进为由 Curator 和 Bigtable 支撑的分布式控制面，并把 RAID/编码等策略下沉到客户端库，以支撑 Google 统一存储栈的超大规模。

#### 🎯 核心要点
- 以 Colossus、Spanner、Borg 作为 Google Cloud 存储服务的底层基础设施
- 使用分布式元数据模型，Curator 服务横向扩展处理文件创建和元数据操作
- 元数据存入 Bigtable，突破 GFS 单 Master 元数据容量和可用性上限
- 客户端库承担复杂逻辑，包括软件 RAID、编码选择、重试和数据路径编排
- 数据流直接在客户端与 D File Server 之间传输，减少网络跳数
- Custodian 后台服务负责磁盘均衡、RAID 重建、耐久性和效率维护

#### 🔬 深入细节
![Colossus 控制面架构](https://storage.googleapis.com/gweb-cloudblog-publish/images/Colossus_control_plane.max-2000x2000.jpg)
*图：Colossus 控制面由客户端库、Curator、Bigtable 元数据数据库、D File Server 和 Custodian 后台管理服务组成。*

```python
# Colossus 风格的元数据与数据路径伪代码
def open_file(path, policy):
    curator = route_to_curator(path)
    layout = curator.read_metadata_from_bigtable(path)
    return ClientHandle(layout, policy)

def write(handle, data):
    stripes = client_library.encode(data, policy=handle.policy)
    targets = client_library.place(stripes, handle.layout)
    for shard, d_server in zip(stripes, targets):
        d_server.put(shard)
    curator_commit_metadata(handle.path, targets, checksum(stripes))

def background_maintenance():
    for damaged in custodians.scan_under_replicated_or_unbalanced():
        repair_or_rebalance(damaged)
```

Colossus 的核心动机是 GFS 在 Google 搜索和云服务规模增长后的元数据瓶颈。GFS 用单 Master 简化系统，但单点内存容量、故障域和元数据 QPS 终会限制集群规模。Colossus 将元数据拆成可横向扩展的 Curator 层，并把持久元数据放入 Bigtable，使元数据容量相对最大 GFS 集群提升两个数量级以上。

它的另一个关键变化是“胖客户端”。客户端库不只是转发读写请求，还根据工作负载选择数据编码、软件 RAID、重试和恢复策略。这样同一套底层文件系统可以支撑 Cloud Storage、Filestore、数据库和内部训练数据等不同需求。面向顺序吞吐的服务可以选择更高空间效率的编码，面向低延迟写入的服务可以选择复制或更轻量的确认路径。

数据面仍延续 GFS 的控制/数据分离：Curator 管控制面，真实数据在客户端和 D File Server 之间直接传输。若把一次读写拆成元数据与数据两部分，系统优化目标可以写成：

$$
T_{op}=T_{metadata}(Curator, Bigtable)+T_{data}(Client, DServer)
$$

Colossus 通过横向扩展降低 \(T_{metadata}\) 的排队风险，通过直连 D File Server 降低 \(T_{data}\) 的网络跳数。

与 HDFS/GFS 相比，Colossus 更像一个统一存储内核而不是单一文件系统产品。Curator、Bigtable、Custodian 和客户端库共同把一致性、放置、重建、均衡、编码策略分离开来，允许不同上层服务组合不同策略。这也解释了任务元信息中的“去中心化元数据,10EB+规模”：核心不是换了 block 大小，而是让元数据、数据面和后台维护都可以独立扩容。

#### 🧪 练习题
```yaml
question: "Colossus 相比 GFS 最关键的扩展性变化是什么？"
options:
  - "取消所有元数据，只保留对象数据"
  - "将单 Master 元数据改为 Curator + Bigtable 的分布式元数据服务"
  - "让所有数据必须经过 Spanner 转发"
  - "只支持单一复制策略，不再支持编码"
answer: 1
explain: "Colossus 通过 Curator 横向扩展元数据控制面，并将元数据存储在 Bigtable 中，解决了 GFS 单 Master 在容量和可用性上的限制。"
```

### Tectonic

```yaml
id: tectonic
num: 4
name: Tectonic
full_name: Meta统一文件系统 (Meta Tectonic)
year: '2021'
org: Meta
parent: hdfs
paper_url: https://www.usenix.org/conference/fast21/presentation/pan
project_url: ''
category: foundation
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

### Lustre

```yaml
id: lustre
num: 5
name: Lustre
full_name: Lustre并行文件系统 (Lustre Parallel File System)
year: '2003'
org: 社区
parent: —
paper_url: https://dl.acm.org/doi/abs/10.1145/3736583
project_url: ''
category: distributed_fs
motivation: HPC场景高并发I/O首选
```

#### 📝 一句话总结
Lustre 通过分离元数据服务与对象数据服务，并将文件数据条带化到多个 OST 上，为 HPC、科学计算和大规模训练集群提供 POSIX 兼容的高并发共享文件系统。

#### 🎯 核心要点
- Lustre Client 挂载后向应用暴露单一全局命名空间和 POSIX 文件接口
- MDS/MDT 处理目录、权限、文件布局、open/close/create/unlink/rename 等元数据操作
- OSS/OST 存储文件数据对象，客户端拿到 layout 后直接向多个 OST 并行读写
- MGS/MGT 保存集群与文件系统配置，客户端和服务器启动时从 MGS 获取配置日志
- LNet 支持 Ethernet、InfiniBand、Omni-Path、RDMA、routing 和 multi-rail 等高速互连能力
- Normal/RAID0 layout 使用 stripe count 与 stripe size 将大文件轮转分布到多个 OST
- DNE、striped directory、PFL、DoM、SEL、FLR 等机制扩展元数据和文件布局能力
- 不在 Lustre 服务器间默认复制用户数据，通常依赖 RAID/ZFS、共享存储和 HA building block 提供可靠性
- 面向在线并行 I/O，而非 HDFS 式数据本地性批处理，核心目标是聚合带宽和多客户端共享访问

#### 🔬 深入细节
![Lustre 文件系统架构图](https://wiki.lustre.org/images/thumb/a/a3/Lustre_File_System_Overview_%28DNE%29_lowres_v1.png/512px-Lustre_File_System_Overview_%28DNE%29_lowres_v1.png)
*图源：Lustre Wiki Introduction to Lustre。图中客户端经 LNet 访问 MGS、MDS/MDT 与多个 OSS/OST，体现元数据与数据服务分离。*

![Lustre 文件条带化图](https://wiki.lustre.org/images/thumb/1/16/File_striping.png/500px-File_striping.png)
*图源：Lustre Wiki Understanding Lustre Internals。文件可按 stripe count/stripe size 轮转分布到多个 OST，以并行叠加吞吐。*

```python
# Lustre 典型 open/write/read 流程伪代码
def lustre_open_for_write(path, stripe_count, stripe_size, ost_pool=None):
    # create/open 等命名空间操作走 MDS/MDT
    fid = mds.create_or_lookup(path)
    layout = mds.allocate_layout(
        fid=fid,
        stripe_count=stripe_count,
        stripe_size=stripe_size,
        ost_pool=ost_pool,
    )
    return fid, layout

def lustre_write(fid, layout, offset, data):
    # 客户端根据 layout 直接向 OSS/OST 发 RPC；MDS 不参与数据面 I/O
    for logical_offset, chunk in split_by_stripe(offset, data, layout.stripe_size):
        stripe_no = logical_offset // layout.stripe_size
        ost_index = stripe_no % layout.stripe_count
        object_offset = (stripe_no // layout.stripe_count) * layout.stripe_size
        object_offset += logical_offset % layout.stripe_size
        osc = client.osc_for(layout.osts[ost_index])
        osc.write(layout.object_fids[ost_index], object_offset, chunk)

def lustre_read(fid, layout, offset, length):
    for request in plan_parallel_extents(layout, offset, length):
        yield client.osc_for(request.ost).read(request.object_fid, request.object_offset, request.size)
```

Lustre 的核心动机来自 HPC 的共享并行 I/O：成百上千个计算节点需要在同一命名空间中读写输入数据、检查点、模拟结果和中间文件。NFS 或单机文件服务器会在元数据、网络和磁盘层都形成瓶颈；HDFS 虽然能吞吐大文件，但它偏向批处理数据本地性和弱 POSIX 语义。Lustre 的选择是保留应用熟悉的 POSIX 接口，把复杂性放到客户端、MDS、OSS、锁和高速网络协议里，让 MPI-IO、科学模拟、AI 训练数据加载器无需改成对象存储模型。

组件分工是 Lustre 的第一层扩展性来源。MDS 通过 MDT 保存 namespace metadata、权限、文件布局扩展属性和目录信息；OSS 通过 OST 保存用户文件内容对应的数据对象；MGS 保存配置。客户端挂载后会同时拥有 MDC 与多个 OSC：MDC 面向 MDT 发元数据 RPC，OSC 面向 OST 发读写 RPC。打开文件时，MDS 返回 Layout EA，里面包含 stripe 参数、OST 列表和对象 FID；之后数据路径直接从客户端到 OST，避免 MDS 参与每次 read/write。

条带化是 Lustre 大文件吞吐的核心机制。若 `stripe_size = S`、`stripe_count = C`，逻辑偏移 \(x\) 会映射到：

$$
ost(x)=\left\lfloor \frac{x}{S} \right\rfloor \bmod C
$$

对应对象内偏移近似为：

$$
obj\_off(x)=\left\lfloor \frac{x}{S\cdot C} \right\rfloor S + (x \bmod S)
$$

因此，一个大文件可以同时落在多个 OST 上，理想吞吐接近这些 OST 可用带宽之和：

$$
BW_{file}\approx \sum_{i=1}^{C} BW_{OST_i}
$$

这对 TB 级检查点、顺序扫描和并行写出很有效；但对大量小文件或随机元数据密集工作负载，过大的 `stripe_count` 会增加对象数、锁数量和布局管理成本，反而降低效率。

Lustre 的 POSIX 兼容依赖客户端缓存与分布式锁管理。客户端可缓存 metadata 和 file extent，但在并发读写、truncate、rename 等操作中必须通过锁保持一致视图。对象数据锁通常按 extent 授权：多个客户端可以持有不重叠写锁或共享读锁，从而允许同一文件不同区域并行 I/O。这个设计与 HDFS 单写者模型完全不同，换来更强的通用文件系统语义，也带来更复杂的锁撤销、恢复和尾延迟问题。

元数据扩展是 Lustre 现代化的另一个重点。早期单 MDT 容易在 `create/stat/unlink/readdir` 密集场景中成为瓶颈；DNE 允许一个文件系统包含多个 MDT，Remote Directories 可把子树放到不同 MDT，Striped Directories 可用哈希方式把一个大目录分布到多个 MDT。直觉上，文件数据用 OST 条带扩展，目录项元数据则用 MDT 分布扩展，两者分别解决“单大文件吞吐”和“单大目录元数据 QPS”的不同瓶颈。

可靠性上，Lustre 与 HDFS/Tectonic 有明显差异。HDFS 默认通过跨节点 block 副本提供容错；Tectonic 可按 block 使用复制或 RS 编码；Lustre 通常不在文件系统层自动把用户数据复制到多个 OSS，而是依赖 RAID、ZFS、共享存储、双控/多控磁盘柜和 HA failover。一个典型 building block 会让两台服务器连接同一组 MDT/OST，故障时由存活节点接管 target。这样做减少数据路径复制开销，保留 HPC 所需吞吐，但要求存储硬件、网络和运维配置更专业。

与 HDFS 相比，Lustre 的“计算靠近数据”不是核心假设。HPC 集群通常把计算节点视为无状态客户端，通过 InfiniBand/RDMA 等高速网络访问远端共享存储；任务调度器不需要知道每个文件块在哪台计算节点本地，因为数据本来就服务于全局共享。它的优势是 POSIX、并行读写和聚合带宽，代价是部署调优复杂，需要根据应用 I/O 模式设置 stripe、OST pool、目录分布、客户端缓存、锁策略和 HA 拓扑。

#### 🧪 练习题
```yaml
question: "Lustre 中 stripe count 和 stripe size 主要控制什么？"
options:
  - "NameNode 的 block report 周期"
  - "一个文件的数据如何按固定大小片段轮转分布到多个 OST"
  - "TrafficGroup 的资源借用优先级"
  - "MGS 是否保存用户文件内容"
answer: 1
explain: "stripe size 决定每段连续数据大小，stripe count 决定参与承载该文件的 OST 数量；客户端据此把不同偏移映射到不同 OST 并行访问。"
```

### Ceph

```yaml
id: ceph
num: 6
name: Ceph
full_name: Ceph统一存储系统 (Ceph Unified Storage)
year: '2006'
org: UCSC
parent: —
paper_url: https://ceph.io/en/news/blog/2006/ceph-a-scalable-high-performance-distributed-file-system/
project_url: ''
category: distributed_fs
motivation: 统一块/文件/对象存储
```

#### 📝 一句话总结
Ceph 用 RADOS 对象存储和 CRUSH 去中心化放置算法作为统一底座，在其上提供对象、块和文件接口，解决传统中心化元数据/分配表在 PB 级动态集群中的扩展与恢复问题。

#### 🎯 核心要点
- RADOS 是底层可靠对象存储，OSD 负责对象读写、复制、恢复和状态上报
- CRUSH 通过集群拓扑和规则计算对象位置，避免中心化分配表
- Monitor 维护集群 map 和仲裁，客户端和 OSD 根据 map 独立计算放置
- CephFS 使用动态 MDS 集群处理文件元数据，数据仍写入 RADOS 对象
- RBD、RGW、CephFS 分别提供块、S3/Swift 对象和 POSIX 文件接口
- Placement Group 把大量对象聚合成恢复和迁移单位，降低管理复杂度

#### 🔬 深入细节
![Ceph RADOS 统一存储栈](https://ceph.io/assets/bitmaps/information-stack.png)
*图：Ceph 官方 Technology 页面给出的 RADOS-based Ceph Stack，展示 LIBRADOS、RGW、RBD、CephFS 都建立在 RADOS 之上。来源：https://ceph.io/en/discover/technology/*

![Ceph PG 到 OSD 的 CRUSH 映射](https://docs.ceph.com/en/quincy/_images/ditaa-45f879e97a08c72aa96aa7c7b94f465611ff941b.png)
*图：Ceph 文档中的对象、Placement Group 与 OSD 映射示意。来源：https://docs.ceph.com/en/quincy/architecture/*

**核心示意图说明**：OSDI 2006 论文 Figure 1 展示客户端、Metadata Cluster 和 Object Storage Cluster：客户端元数据请求访问 MDS，文件 I/O 直接访问 OSD。由于论文 PDF 中的 Figure 1 没有稳定图片直链，这里使用 Ceph 官方技术页和官方文档图补足同一架构关系；官方论文 PDF 可访问 https://ceph.io/assets/pdfs/weil-ceph-osdi06.pdf。

```text
Ceph client
  |-- metadata ops --> MDS cluster (CephFS only)
  |-- object I/O ----> OSD cluster (RADOS)
  |-- cluster map <--- Monitors
CRUSH(object, pool, map) -> placement group -> acting OSD set
```

```python
# Ceph/RADOS 对象定位和写入伪代码
def put(pool, object_id, data):
    osd_map = monitors.get_latest_osd_map()
    pg = hash(object_id) % pool.pg_num
    acting_set = crush_choose(pg, osd_map, pool.replication_rule)
    primary = acting_set[0]
    primary.write_and_replicate(object_id, data, acting_set[1:])

def recover(failed_osd):
    osd_map.mark_out(failed_osd)
    for pg in affected_pgs(failed_osd):
        new_set = crush_choose(pg, osd_map, pg.rule)
        backfill_missing_objects(pg, new_set)
```

Ceph 的出发点是去掉可扩展性最差的“中心分配表”。传统对象或文件系统常由一个中心组件记录对象到磁盘的位置，规模扩大后该组件会成为性能瓶颈和恢复瓶颈。Ceph 让客户端、OSD 都持有同一份集群 map，并用 CRUSH 函数计算位置：

$$
placement = CRUSH(hash(object), cluster\_map, rule)
$$

只要输入 map 一致，各方就能得到同样的目标 OSD 集合，无需查询中心目录。

RADOS 将可靠性逻辑分布到 OSD。每个对象属于某个 Placement Group，PG 再映射到一组 OSD；primary OSD 负责序列化写入并复制到 secondary。节点故障时，Monitor 更新 OSD map，CRUSH 重新计算受影响 PG 的 acting set，OSD 之间执行 backfill 和 recovery。这种设计把恢复工作分散到大量节点，而不是由一个 Master 调度所有数据迁移。

Ceph 的统一存储来自“对象底座 + 多接口”。RBD 把块设备切成对象，RGW 把 S3/Swift API 映射到 RADOS 对象，CephFS 用 MDS 管目录和 inode，但文件数据仍存为 RADOS 对象。这样块、文件、对象共享同一套复制、纠删码、快照和恢复机制。

与 GFS/HDFS 相比，Ceph 的数据放置更去中心化，客户端可以直接计算对象位置；与 Lustre 相比，Ceph 更强调通用云存储接口和自动恢复，通常牺牲一部分极致 HPC 调优空间换取统一性和自管理能力。

#### 🧪 练习题
```yaml
question: "Ceph 中 CRUSH 算法的主要作用是什么？"
options:
  - "压缩对象数据以减少存储空间"
  - "根据集群拓扑和规则计算对象应放置到哪些 OSD，避免中心化查表"
  - "把 POSIX 元数据全部存入客户端缓存"
  - "让所有写入绕过 primary OSD"
answer: 1
explain: "CRUSH 使用对象哈希、集群 map 和放置规则确定 OSD 集合，客户端与 OSD 都可独立计算位置，这是 Ceph 去中心化扩展的基础。"
```

### GlusterFS

```yaml
id: glusterfs
num: 7
name: GlusterFS
full_name: GlusterFS分布式文件系统 (GlusterFS)
year: '2006'
org: Red Hat
parent: —
paper_url: https://www.gluster.org/
project_url: ''
category: distributed_fs
motivation: 无元数据服务器,线性扩展
```

#### 📝 一句话总结
GlusterFS 提出一种无集中元数据服务器的可扩展网络文件系统，把多个普通服务器上的 brick 组合成 volume，并通过客户端侧 translator 栈完成定位、复制、条带化和自愈。

#### 🎯 核心要点
- 以 brick 作为基本存储单元，brick 通常是服务器上的一个目录
- Volume 可以是 distributed、replicated、dispersed、striped 或组合形态
- 使用 Elastic Hash/DHT 将文件名映射到 brick，避免中心元数据节点
- 客户端通过 FUSE/native client 挂载，数据路径直接访问承载 brick 的节点
- Replicate/disperse translator 提供副本、仲裁、自愈和纠删码能力
- 适合云存储、媒体、日志和带宽密集型任务，不擅长极端小文件元数据热点

#### 🔬 深入细节
![Red Hat Gluster Storage 架构](https://access.redhat.com/webassets/avalon/d/Red_Hat_Storage-3.1-Administration_Guide-en-US/images/667b8206666b18dbed70d300c3e2710c/RH_Gluster_Storage_diagrams_334434_0415_JCS_5.png)
*图：Red Hat Gluster Storage 文档中的架构图，展示用户/管理员访问、虚拟 volume/brick 和物理 server/disk 的对应关系。来源：https://docs.redhat.com/en/documentation/red_hat_gluster_storage/3.1/html/administration_guide/chap-red_hat_storage_architecture_and_concepts*

**核心示意图说明**：Gluster 官方页面说明其由普通硬件构建可扩展网络文件系统，架构核心是客户端 translator 栈、volume 配置和一组 brick。Gluster 官方项目页未提供稳定的架构图直链，因此这里使用 Red Hat 官方 Gluster Storage 文档图，并在下面用结构化文本展开 translator 数据路径。

```text
Application -> FUSE / libgfapi client
               translator stack
               |-- DHT: hash(path) -> subvolume
               |-- AFR/EC: replica or dispersed placement
               `-- protocol/client -> storage servers
ServerA:/brick1  ServerB:/brick2  ServerC:/brick3 ...
```

```python
# GlusterFS DHT + 副本写入伪代码
def lookup(path, volume):
    hashed = hash(parent_dir(path), basename(path))
    subvol = volume.dht.choose_subvolume(hashed)
    return subvol.lookup(path)

def write(path, data, volume):
    subvol = volume.dht.choose_subvolume(hash_name(path))
    if subvol.type == "replicate":
        results = [brick.write(path, data) for brick in subvol.replicas]
        require_quorum(results)
    elif subvol.type == "disperse":
        shards = erasure_encode(data, k=subvol.k, m=subvol.m)
        for brick, shard in zip(subvol.bricks, shards):
            brick.write(path, shard)
```

GlusterFS 的设计目标是把扩容做成“加服务器、加 brick、重新均衡”这样简单的操作，而不是部署一套中心化元数据服务。它用 translator 栈把复杂逻辑放在客户端侧：DHT translator 根据路径或文件名哈希决定文件落在哪个子卷，replicate translator 负责多副本一致性，disperse translator 负责纠删码，io-cache/write-behind 等 translator 处理性能优化。

无元数据服务器的好处是线性扩展和故障域简单。对于一个文件的定位，客户端可以通过 volume 配置和哈希函数推导目标 brick：

$$
brick = DHT(hash(parent, name), volume\_layout)
$$

这避免了每次 lookup 都访问中心目录服务。但代价也很明显：rename、目录扫描、rebalance 和小文件工作负载会触发更多跨 brick 操作，系统需要 linkfile、自愈和后台 rebalance 来修正布局变化后的不一致。

写入路径随 volume 类型变化。Distributed volume 只把不同文件分散到不同 brick，单文件不一定并行；Replicated volume 同步写多个副本，提高可用性；Dispersed volume 使用纠删码降低容量开销，但读改写和小对象成本更高。生产环境常把 distributed 与 replicated/dispersed 组合，既扩容量又提供故障恢复。

与 Ceph 相比，GlusterFS 更“文件系统直觉”：brick 就是普通目录，运维和调试较直观；但它的全局一致性、自动放置和恢复能力不如 RADOS/CRUSH 那样强。与 Lustre 相比，GlusterFS 更易部署在通用服务器上，极致并行 I/O 和元数据规模调优则不是它的强项。

#### 🧪 练习题
```yaml
question: "GlusterFS 无元数据服务器设计的核心依赖是什么？"
options:
  - "每个文件都复制到所有 brick"
  - "客户端根据 volume 布局和哈希/translator 栈推导文件位置"
  - "所有 lookup 都必须请求单个 NameNode"
  - "只支持对象 API，不支持文件目录"
answer: 1
explain: "GlusterFS 通过客户端 translator 栈和 DHT 哈希定位文件，避免集中元数据服务，从而更容易随 brick 数量扩展。"
```

### BeeGFS

```yaml
id: beegfs
num: 8
name: BeeGFS
full_name: BeeGFS并行文件系统 (BeeGFS Parallel File System)
year: '2014'
org: ThinkParQ
parent: lustre
paper_url: https://www.beegfs.io/docs/
project_url: ''
category: distributed_fs
motivation: BeeOND临时FS,GPUDirect支持
```

#### 📝 一句话总结
BeeGFS 是面向 HPC/AI 的并行文件系统，通过管理、元数据、存储和客户端服务解耦，提供较轻量的条带化共享文件系统，并用 BeeOND 与 GPUDirect Storage 支撑临时高速训练数据路径。

#### 🎯 核心要点
- 组件包括 Management service、Metadata service、Storage service 和 Client
- 文件数据可条带化到多个 storage target，提升单文件和并发吞吐
- Metadata service 可分布到多台服务器，目录项和文件元数据独立扩展
- BeeOND 可在作业运行期间把计算节点本地 SSD/RAM 聚合成临时并行文件系统
- 支持 RDMA、多网卡 multirail 和 NVIDIA GPUDirect Storage
- 常用于 HPC scratch、AI 数据加载、检查点和共享高吞吐工作目录

#### 🔬 深入细节
![BeeGFS 系统架构](https://doc.beegfs.io/latest/_images/beegfs_architecture.png)
*图：BeeGFS 官方文档中的 System Architecture，展示 Management、Metadata、Storage、Client 等服务及并行访问关系。来源：https://doc.beegfs.io/latest/architecture/overview.html*

**核心示意图说明**：BeeGFS 文档将系统拆为管理服务、元数据服务、存储服务和客户端；BeeOND 文档强调按作业创建临时 BeeGFS 实例，GDS 文档说明 BeeGFS client 和 storage service 可直接参与 GPU/RDMA 数据路径。稳定文档入口为 https://www.beegfs.io/docs/。

```text
BeeGFS Client
  |-- config/discovery --> Management service
  |-- namespace ops ----> Metadata services
  `-- striped I/O -----> Storage services -> targets

BeeOND: job nodes' local SSD/RAM -> temporary BeeGFS mount -> destroyed after job
GDS: NVMe/RDMA NIC -> BeeGFS -> GPU memory path
```

```python
# BeeGFS 条带化与 BeeOND 生命周期伪代码
def submit_job(nodes):
    beeond = start_beeond(nodes, storage="local_ssd")
    stage_in_parallel(source="/global/data", target=beeond.mount)
    run_training(data_dir=beeond.mount)
    stage_out_parallel(source=beeond.mount + "/outputs", target="/global/results")
    stop_beeond(beeond)

def striped_write(path, data, pattern):
    targets = metadata.get_stripe_targets(path, pattern)
    for i, chunk in enumerate(split(data, pattern.chunk_size)):
        targets[i % len(targets)].write(path, object_offset(i), chunk)
```

BeeGFS 与 Lustre 都强调并行文件 I/O，但 BeeGFS 的工程目标更偏向部署简洁、客户端友好和弹性配置。Management service 负责服务发现和配置，Metadata service 管目录和 inode 信息，Storage service 管真实数据 target，Client 将这些服务组合成一个 POSIX 挂载点。应用看见的是普通文件系统，内部则通过条带化把大文件 I/O 分摊到多个 target。

BeeOND 是 BeeGFS 的重要差异点。许多 HPC/AI 作业只在运行期间需要高速 scratch 空间，作业结束后中间文件即可丢弃。BeeOND 让调度器在分配到的计算节点上启动临时 BeeGFS，把节点本地 SSD、HDD 甚至 RAM disk 聚合成一个共享并行命名空间。这样既减少对全局并行文件系统的干扰，也让作业独享本地介质的 IOPS。

AI 训练场景下，BeeGFS 还强调 RDMA 和 GDS。若硬件满足 NVIDIA GPUDirect Storage 要求，数据可以在 BeeGFS 客户端、RDMA NIC 和 GPU 显存之间减少 CPU bounce buffer：

$$
T_{input}=T_{storage}+T_{network}+T_{decode/copy}
$$

GDS/RDMA 的价值在于压低 \(T_{network}\) 和 \(T_{decode/copy}\) 中 CPU 参与的数据搬运部分，使 GPU 更少等待输入。

与 Lustre 相比，BeeGFS 通常更容易在中小规模集群和临时工作目录中部署；与 GlusterFS 相比，它更明确面向 HPC 并行 I/O，提供条带化、RDMA 和作业级临时文件系统能力。它仍需要根据小文件、大文件、元数据密集程度调整条带和元数据服务布局。

#### 🧪 练习题
```yaml
question: "BeeOND 的主要用途是什么？"
options:
  - "把所有训练数据永久迁移到对象存储"
  - "在作业运行期间聚合计算节点本地盘，创建临时共享并行文件系统"
  - "替代 BeeGFS 的元数据服务"
  - "只用于备份 Management service"
answer: 1
explain: "BeeOND 会按作业启动临时 BeeGFS 实例，利用计算节点本地 SSD/RAM 提供高速 scratch 空间，作业结束后可停止并释放资源。"
```

### JuiceFS

```yaml
id: juicefs
num: 9
name: JuiceFS
full_name: JuiceFS云原生文件系统 (JuiceFS Cloud-Native File System)
year: '2021'
org: Juicedata
parent: —
paper_url: https://github.com/juicedata/juicefs
project_url: ''
category: distributed_fs
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

### FalconFS

```yaml
id: falconfs
num: 10
name: FalconFS
full_name: FalconFS深度学习文件系统 (FalconFS)
year: '2025'
org: 学术研究
parent: lustre
paper_url: https://arxiv.org/abs/2507.10367
project_url: ''
category: distributed_fs
motivation: 元数据负载均衡,DL管道优化
```

#### 📝 一句话总结
FalconFS 提出面向大规模深度学习流水线的无状态客户端分布式文件系统，通过服务端路径解析、混合元数据索引、懒命名空间复制、并发请求合并和 VFS shortcut，解决海量小文件训练/标注负载中的 lookup 放大和元数据节点瞬时倾斜问题。

#### 🎯 核心要点
- 目标场景：自动驾驶等 DL pipeline 中数百 PB、数千亿小文件、十亿级目录和批量随机遍历/按目录突发访问
- 核心架构：Client Module、MNode、Coordinator、File Store；客户端尽量无状态，MNode 承担路径解析和元数据执行
- 服务端路径解析：客户端不逐级 lookup 每个路径组件，而是向 MNode 发送完整路径，由服务端检查存在性、权限和最终操作
- Hybrid Metadata Indexing：常见情况使用文件名哈希分散同目录文件，必要时回退到目录拆分或权限感知映射以控制负载与语义
- Lazy Namespace Replication：按访问需要复制目录命名空间片段，避免全量复制成本，同时让热点目录可被更多 MNode 服务
- Concurrent Request Merging：MNode 后端 worker 按请求类型和共享路径前缀合并操作，减少重复加锁、WAL 和数据库访问
- VFS shortcut：在 Linux VFS 中对中间目录返回临时属性，最后一个路径组件触发完整远程 lookup，从而保持 POSIX 路径使用方式
- 实验结论：论文报告 FalconFS 对小文件读写最高提升 5.72 倍，对 DL 训练吞吐/运行时间相关指标最高提升 12.81 倍

#### 🔬 深入细节
![FalconFS 架构图](https://arxiv.org/html/2507.10367v2/x6.png)
*图源：arXiv HTML 论文 Figure 5。FalconFS 由 Client Module、MNode、Coordinator 和 File Store 组成，重点把元数据路径解析推到服务端。*

![FalconFS 混合元数据索引图](https://arxiv.org/html/2507.10367v2/x7.png)
*图源：arXiv HTML 论文 Figure 6。Hybrid Metadata Indexing 将同目录文件分散到多个 MNode，并处理哈希不均和权限语义。*

```python
# FalconFS open/create 元数据路径伪代码，抽象自论文的 server-side path resolution
def client_open(path, flags, cred):
    # VFS shortcut 让中间路径组件在客户端快速通过，最终组件携带完整路径发给 MNode
    request = {
        "op": "open",
        "full_path": path,
        "flags": flags,
        "credential": cred,
    }
    target = coordinator.route(path)
    return target.resolve_and_execute(request)

def mnode_resolve_and_execute(req):
    components = split_path(req.full_path)
    ns_view = lazy_namespace_replica.ensure_prefix(components)
    locks = lock_manager.acquire_shared_prefix_locks(components)
    try:
        parent, name = server_side_permission_walk(ns_view, components, req.credential)
        shard = hybrid_index.route(parent_inode=parent.inode, filename=name)
        return shard.execute_file_operation(parent, name, req.op, req.flags)
    finally:
        lock_manager.release(locks)

def mnode_worker_loop(queue):
    while True:
        batch = queue.pop_many(timeout_us=MERGE_WINDOW)
        merged = coalesce_by_common_prefix_and_op(batch)
        for group in merged:
            with acquire_prefix_locks_once(group.paths):
                wal.append(group.intent)
                db.apply(group.operations)
```

论文从生产 DL pipeline 的访问模式出发。自动驾驶训练/标注数据包含图片、点云、标注和中间结果，大量对象只有 KiB 到 MiB 级，且多数小于 256 KiB；目录按时间戳、车辆、传感器等维度组织，形成极大的目录树。训练阶段常随机遍历文件，每个 epoch 对每个文件访问一次；标注/推理阶段又会按目录批量读写。传统 DFS 在这种负载下经常不是数据盘带宽先满，而是每次 `open("/a/b/c")` 触发 `/`、`a`、`b`、`c` 多级 lookup、权限检查、客户端缓存失效和 MDS RPC，形成 lookup tax。

FalconFS 的第一性设计是“客户端无状态化”。CephFS/Lustre 等系统通常假设客户端元数据缓存能摊薄路径解析开销，但 DL 训练的目录工作集巨大且随机，客户端缓存要么装不下末级目录，要么消耗本应留给数据增强和 dataloader 的 CPU/内存。FalconFS 让客户端发送完整路径，把路径解析、权限检查和操作执行集中到 MNode：

$$
N_{rpc}^{classic}\approx depth(path)+N_{miss},\quad N_{rpc}^{FalconFS}\approx 1
$$

这个公式表达的是 RPC 形态的变化，而不是说服务端没有检查成本。服务端仍要完整检查路径存在性和权限，但它可以在同一 MNode 或协作 MNode 内批量处理、共享前缀锁和利用更全局的目录索引。

Hybrid Metadata Indexing 处理的是同目录突发访问导致的瞬时倾斜。许多 DFS 会把同目录文件的元数据放在相同或相邻 MDS 上，批量读取一个大目录时会把单个 MDS 打满。FalconFS 在常见情况下用文件名哈希把同一目录下的文件 inode 分散到多个 MNode，使同目录 burst 可以并行处理。若简单哈希导致不均，系统可使用 fallback；若权限、目录操作或一致性要求需要保留目录级语义，则通过额外索引与协调逻辑维持正确性。直观上，单目录 burst 的元数据服务时间从单点排队变成多点并行：

$$
T_{burst}\approx \max_i \frac{Q_i}{\mu_i} + T_{coord}
$$

其中 \(Q_i\) 是分配到第 \(i\) 个 MNode 的请求数，\(\mu_i\) 是该节点处理能力；哈希与负载均衡的目标是压低最大队列长度。

Lazy Namespace Replication 解决“要分散负载就要复制命名空间，但全量复制太贵”的矛盾。若每个 MNode 都复制全量目录树，内存和更新同步成本会随目录规模爆炸；若完全不复制，路径前缀和热点目录又会集中到少数节点。FalconFS 只在访问驱动下复制必要的 namespace prefix，并在目录创建、删除、rename、权限变化时维护相应的一致性协议。这样大多数冷目录不产生复制成本，热点路径则能在多个 MNode 上解析。

Concurrent Request Merging 利用了 DL 负载的批量性。Dataloader 或标注任务常在短时间内提交许多同类型请求，且路径有共同前缀。MNode 的 worker 从队列中取一批请求后，可以合并共享路径前缀，减少重复锁获取、WAL 追加和数据库 round trip。论文 Figure 8 给出的直觉是：多个 create 操作原本各自走目录链并分别加锁，合并后共享前缀只处理一次。该机制不是简单的客户端 batch API，而是在服务端 opportunistic 地利用队列中的自然并发。

VFS shortcut 是工程落地层。Linux VFS 默认逐组件调用 lookup，若直接改应用或训练框架成本很高。FalconFS 在客户端模块中对中间目录 lookup 返回“可通过检查的临时属性”，到最后一个路径组件时再把完整路径交给 MNode 进行真实检查和操作。正确性依赖 MNode 重新执行全部权限和路径校验，因此 fake attribute 不代表真正跳过安全检查。论文也指出其限制：符号链接和嵌套挂载需要特殊处理。

与 Lustre/CephFS 相比，FalconFS 的创新点不在数据块放置或副本协议，而在元数据路径。它承认 DL pipeline 的瓶颈常是路径解析、目录热点和客户端资源预算，于是把元数据智能从客户端缓存转移到服务端全局调度。这个选择牺牲了传统客户端缓存命中时的极低延迟，但换来随机大工作集、小文件 burst 和多训练作业并发时更稳定的 MNode 负载。

#### 🧪 练习题
```yaml
question: "FalconFS 为什么要采用服务端路径解析而不是依赖客户端元数据缓存？"
options:
  - "因为 DL 训练的大目录随机遍历会使客户端缓存命中不足，并造成多级 lookup RPC 放大"
  - "因为服务端路径解析可以取消所有权限检查"
  - "因为文件数据必须全部保存在元数据节点内存中"
  - "因为 VFS shortcut 要求应用改写为专用 API"
answer: 0
explain: "论文指出 DL 负载的目录工作集巨大且客户端资源紧张，客户端缓存难以覆盖末级目录；服务端解析能把多级 lookup 压缩为完整路径请求，并结合索引、复制和请求合并降低元数据瓶颈。"
```

### MinIO

```yaml
id: minio
num: 11
name: MinIO
full_name: MinIO对象存储 (MinIO Object Storage)
year: '2014'
org: MinIO
parent: —
paper_url: https://min.io/
project_url: ''
category: object_storage
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

### Alluxio

```yaml
id: alluxio
num: 12
name: Alluxio
full_name: Alluxio数据编排层 (Alluxio Data Orchestration)
year: '2014'
org: UC Berkeley
parent: —
paper_url: https://www.alluxio.io/
project_url: ''
category: object_storage
motivation: 分布式缓存,存算分离桥梁
```

#### 📝 一句话总结
Alluxio 源自 UC Berkeley AMPLab 的 Tachyon，把分布式缓存、统一命名空间和底层存储桥接放在计算框架与持久存储之间，解决存算分离场景下远端对象/文件存储访问慢、重复搬运和数据本地性差的问题。

#### 🎯 核心要点
- 作为数据访问层而不是最终持久层，位于 Spark、Trino、PyTorch、TensorFlow、Ray 等计算框架与 S3、HDFS、Azure Blob、GCS、NFS 等 UFS 之间
- 通过统一命名空间把多个异构底层存储挂载成一个逻辑文件系统，隐藏应用与具体存储连接器的耦合
- 采用 Master/Worker/Client 架构：Master 管元数据和块位置，Worker 管本地内存/SSD/HDD 缓存，Client 负责读写路径选择
- 读路径区分 local cache hit、remote cache hit、cache miss 和 cache skip，优先从本地或 Alluxio Worker 读取，首次 miss 再访问底层存储
- Tachyon 论文的关键思想是用 lineage 替代同步复制来保护内存写入，避免每次写都受网络/磁盘复制瓶颈约束
- 现代 Alluxio 面向 AI/分析工作负载扩展了分布式缓存、元数据缓存、POSIX/S3/Python 等接口，用近计算缓存减少 GPU/CPU 等待

#### 🔬 深入细节
![Alluxio 官方架构图](https://429832656-files.gitbook.io/~/files/v0/b/gitbook-x-prod.appspot.com/o/spaces%2Fa6idTiZLDDmLlCSSJnL8%2Fuploads%2Fgit-blob-e692c274a07041ab373aef604d0a174c32b135b2%2Farchitecture-overview-simple-docs.png?alt=media)
*图：Alluxio 官方文档的 Architecture Overview。它展示了 Application/Client、Leading/Standby Masters、Workers、Job Workers 与多个 Under Store 之间的关系。*

```python
# Alluxio 读路径与缓存放置伪代码
def read_file(path, offset, length, read_type="CACHE"):
    inode = master.lookup(path)                  # 元数据与 block 映射在 master
    block = inode.block_at(offset)
    workers = master.get_block_locations(block)

    if local_worker in workers:
        return local_worker.short_circuit_read(block, offset, length)

    if workers:
        src = choose_nearest_worker(workers)
        data = src.remote_read(block, offset, length)
        if read_type == "CACHE" and local_worker:
            local_worker.cache_async(block, data)
        return data

    # cache miss：由 worker 访问 under file system，并按策略把完整 block 放入 Alluxio
    ufs_uri = master.resolve_ufs_uri(path)
    data = local_worker.read_from_ufs(ufs_uri, block, offset, length)
    if read_type == "CACHE":
        local_worker.cache_async(block, data)
    return data


def write_file(path, bytes_iter, write_type="ASYNC_THROUGH"):
    master.create_inode(path)
    for block in split_blocks(bytes_iter):
        local_worker.write_cache(block)
        if write_type == "CACHE_THROUGH":
            local_worker.write_ufs_sync(block)
        elif write_type == "ASYNC_THROUGH":
            job_master.enqueue_persist(block)
        elif write_type == "MUST_CACHE":
            master.mark_not_persisted(block)
```

Alluxio 的直接动机来自大数据与机器学习中的存算分离。持久数据通常在对象存储、HDFS、NAS 或跨区域数据湖中，计算集群则弹性扩缩容并反复运行训练、查询、特征生成等作业。若每个作业都先复制数据到本地，冷启动和存储浪费很高；若每次都直接读远端对象存储，训练 dataloader、Spark stage 或 Trino scan 会被远端延迟、API 限流和跨区带宽拖慢。Alluxio 的做法是在计算侧维护共享缓存，让第一次访问承担远端代价，后续访问尽量命中本地或集群网络内的 Worker。

Alluxio 的核心不是“再造一个对象存储”，而是建立一个虚拟数据访问层。Master 只处理命名空间、inode、block location、worker 容量和 journal，不转发大块数据；Worker 才负责读写本地 RAM/SSD/HDD 层级，并在 cache miss 时访问 UFS。这个分工让数据路径可以绕过中心节点，近计算 Worker 可通过 short-circuit read 直接从本机文件系统或 domain socket 返回数据。平均读取延迟可以粗略写成：

$$
T_{\text{read}} =
p_l T_{\text{local}} +
p_r T_{\text{remote-worker}} +
(1-p_l-p_r)T_{\text{ufs}}
$$

其中 \(p_l\) 是本地命中率，\(p_r\) 是远端 Worker 命中率。Alluxio 的优化目标就是提高 \(p_l+p_r\)，并让 \(T_{\text{local}}\) 与 \(T_{\text{remote-worker}}\) 明显小于 \(T_{\text{ufs}}\)。对于 AI 训练，这意味着把数据集预加载到 GPU 节点附近的 NVMe Worker、保持 epoch 间热数据不被淘汰，并避免每个 worker 进程重复从对象存储下载同一批样本。

Tachyon 论文中的 lineage 机制解释了 Alluxio 早期“内存速度写入”的设计取向。传统分布式缓存或内存文件系统为了容错，常在写路径同步复制多份数据，写入延迟受网络与磁盘限制。Tachyon 则把产生文件的计算 lineage 保存到存储层：输出先写入内存，若某个 worker 丢失未持久化数据，系统可按 lineage 重新执行对应框架任务来再生数据。它用 checkpointing algorithm 约束 lineage 链过长导致的恢复成本，并记录输入文件、输出文件、重算程序、配置和 wide/narrow dependency 等元数据。这个思想适合临时中间结果和可重算数据，代价是要求上层框架能够提供足够的重算语义。

现代 Alluxio 的工程重点进一步转向数据编排。统一命名空间允许用户把 `s3://bucket/a`、`hdfs://cluster/b` 或 NFS 目录挂载到同一 Alluxio 路径下，应用只面对 Alluxio API、HDFS API、S3 API 或 POSIX/FUSE 接口。读路径中的异步缓存避免用户请求等待完整 block 回填，写路径则可在 `MUST_CACHE`、`CACHE_THROUGH`、`ASYNC_THROUGH`、`THROUGH` 间选择性能与持久性的权衡。例如 `ASYNC_THROUGH` 先写 Alluxio，再由后台任务持久化到 UFS，延迟接近缓存写，但在持久化完成前需要副本策略来降低节点故障造成的数据丢失风险。

与 HDFS、Ceph、MinIO、JuiceFS 等系统相比，Alluxio 的边界很清楚：它依赖 UFS 作为 source of truth，主要提供近计算缓存、跨存储命名空间和协议桥接。HDFS/Ceph/MinIO 更关注持久存储自身的数据放置、复制和一致性；JuiceFS 更像完整云原生文件系统，把元数据服务和对象存储组合成持久文件系统语义。Alluxio 的优势出现在多框架反复读取共享数据、远端存储慢或贵、计算节点离数据源较远的场景；如果工作负载基本一次性顺序扫描且没有重复访问，缓存收益就会下降。

> 💡 关键：Alluxio 的设计目标是把“数据在哪里、怎样连接、是否已缓存”从应用中抽离出来，让计算框架以统一路径访问数据，并让热数据自然停留在离计算更近的 Worker 上。

#### 🧪 练习题
```yaml
question: "Alluxio 在存算分离架构中的核心作用是什么？"
options:
  - "替代底层对象存储，成为唯一持久数据源"
  - "在计算框架与持久存储之间提供统一命名空间和分布式缓存"
  - "只负责训练模型的梯度压缩"
  - "把所有数据强制复制到每个客户端进程本地"
answer: 1
explain: "Alluxio 通常不接管最终持久化，而是桥接计算与 UFS，通过命名空间、缓存和协议适配减少远端数据访问开销。"
```

### GPUDirect Storage

```yaml
id: gds
num: 13
name: GPUDirect Storage
full_name: NVIDIA GPUDirect存储 (GPUDirect Storage)
year: '2020'
org: NVIDIA
parent: —
paper_url: https://developer.nvidia.com/gpudirect-storage
project_url: ''
category: object_storage
motivation: 绕过CPU直达GPU,降低50%延迟
```

#### 📝 一句话总结
GPUDirect Storage (GDS) 通过在存储设备与 GPU 显存之间建立直接 DMA 数据通路，绕过 CPU 内存的 bounce buffer 中转，将 GPU IO 带宽提升至接近 PCIe 线速，同时降低约 50% 的端到端延迟并释放 CPU 资源，是 NVIDIA GPU 直接存储访问的核心基础设施。

#### 🎯 核心要点
- **DMA 直通路径**：数据从 NVMe/NIC/RAID 控制器经 PCIe 交换机直接 DMA 到 GPU BAR1 显存区域，完全绕过 CPU 系统内存的 bounce buffer
- **cuFile API 体系**：提供类 POSIX 的 `cuFileRead`/`cuFileWrite`（同步）、`cuFileBatchIOSubmit`（批处理异步）、`cuFileReadAsync`/`cuFileWriteAsync`（CUDA Stream 异步）三层 API
- **软件栈四层架构**：用户态 `libcufile.so` → 内核态 `nvidia-fs.ko` → Linux VFS → 存储驱动（NVMe/NFS/分布式文件系统）
- **智能路径选择**：libcufile 根据文件系统类型、硬件拓扑和 BAR1 大小，动态选择 GDS 直通模式或兼容模式（fallback 到 CPU bounce buffer）
- **动态缓冲路由**：按优先级选择 NVLink 对端 GPU 内存 → 本地 GPU 内存 → 系统内存 → PCIe P2P 作为 staging buffer
- **GPU BAR1 透明分块**：当传输大小超过 BAR1 aperture 时，自动分块传输并通过 GPU 内部 copy engine 搬运到目标 buffer，对应用透明
- **广泛生态支持**：兼容 ext4/XFS/NFS、VAST/WekaFS/DDN EXAScaler/NetApp 等 20+ 分布式文件系统，以及 NVMe-oF、InfiniBand RDMA 等远程存储协议

#### 🔬 深入细节
![GDS 架构示意图：传统路径 vs GDS 直通路径](https://docs.nvidia.com/gpudirect-storage/design-guide/graphics/design-guide-image-4-updated.png)
*图：左侧为传统 CPU bounce buffer 路径（存储→CPU 内存→GPU），右侧为 GDS 直通路径（存储→GPU），数据绕过 CPU 内存直接到达 GPU 显存。来源：NVIDIA GPUDirect Storage Design Guide Figure 4.1*

![GDS 软件栈与数据流](https://docs.nvidia.com/gpudirect-storage/overview-guide/graphics/gds-image5-updated.png)
*图：GDS 完整软件栈——应用通过 cuFile API 调用 libcufile.so，经 nvidia-fs.ko 内核驱动与 VFS 交互，最终由存储驱动的 DMA 引擎直接访问 GPU 内存。来源：NVIDIA GPUDirect Storage Overview Guide Figure 1.1*

```python
# GDS cuFile API 核心使用流程伪代码
import cufile  # libcufile.so 绑定

# 1. 初始化 GDS 驱动
cufile.driver_open()

# 2. 打开文件并注册 cuFile 句柄
fd = os.open("/mnt/nvme/data.bin", os.O_RDONLY | os.O_DIRECT)
cf_handle = cufile.handle_register(fd)

# 3. 分配 GPU 显存（必须使用 cudaMalloc，非 cudaMallocManaged）
gpu_buf = cuda.mem_alloc(buffer_size)

# 4. 注册 GPU buffer 用于 DMA（可选，提升性能）
cufile.buf_register(gpu_buf, buffer_size)

# 5a. 同步读取：存储 → GPU 显存（类似 pread + O_DIRECT）
bytes_read = cufile.read(cf_handle, gpu_buf, buffer_size, file_offset=0, buf_offset=0)

# 5b. 异步批处理读取（类似 Linux AIO）
io_batch = cufile.batch_io_setup(num_entries=8)
for i in range(8):
    cufile.batch_io_submit(io_batch, cf_handle, gpu_buf[i], size[i], offset[i], READ)
cufile.batch_io_get_status(io_batch)  # 轮询完成状态

# 5c. CUDA Stream 异步读取（CUDA 12.2+）
stream = cuda.Stream()
cufile.read_async(cf_handle, gpu_buf, buffer_size, file_offset, buf_offset, stream)
stream.synchronize()

# 6. 清理
cufile.buf_deregister(gpu_buf)
cufile.handle_deregister(cf_handle)
os.close(fd)
cufile.driver_close()
```

**动机与背景：CPU bounce buffer 的瓶颈**

在传统 GPU 计算工作流中，数据从存储到 GPU 的路径必须经过 CPU 系统内存作为中转站（bounce buffer）。具体流程为：存储设备通过 DMA 将数据写入 CPU 内存的 page cache，然后 CPU 再通过 PCIe 将数据从系统内存复制到 GPU 显存。这一路径存在三重开销：（1）数据在 PCIe 总线上被传输两次（存储→CPU、CPU→GPU），带宽利用率减半；（2）CPU 必须参与数据搬运，消耗宝贵的计算资源；（3）page cache 管理、内存分配和上下文切换引入额外延迟。随着 AI 训练数据集规模从 TB 级增长到 PB 级，IO 成为 GPU 利用率的主要瓶颈——GPU 空闲等待数据的时间占比显著增加。

> 💡 关键：GDS 的核心洞察是——既然 PCIe 协议本身支持任意两个端点之间的点对点通信，为什么不让存储控制器的 DMA 引擎直接将数据写入 GPU 的 BAR1 内存映射区域？

**核心机制：DMA 直通与 nvidia-fs.ko 回调架构**

GDS 的技术实现围绕两个关键组件展开。在用户态，`libcufile.so` 提供 cuFile API 并负责智能路径决策：它检查目标文件所在的文件系统是否支持 GDS、当前 GPU 的 BAR1 大小是否足够、PCIe 拓扑是否允许直通等条件，然后选择最优传输路径。在内核态，`nvidia-fs.ko` 驱动注册了一组 DMA 回调函数（`nvfs_is_gpu_page`、`nvfs_dma_map_sg`），这些回调被存储驱动在执行 DMA 时调用。

工作流程如下：应用调用 `cuFileRead` → `libcufile.so` 将 GPU 虚拟地址转换为代理 CPU 系统内存地址 → 通过 IOCTL 传递给 `nvidia-fs.ko` → 内核驱动调用 VFS 发起 IO 请求 → 存储驱动（如 NVMe）在设置 DMA 时调用 `nvfs_is_gpu_page` 检测目标地址是否为 GPU 内存 → 若是，调用 `nvfs_dma_map_sg` 获取 GPU 物理地址（通过 BAR1 映射）→ DMA 引擎直接将数据写入 GPU 显存 → 完成回调通知 `nvidia-fs.ko` → 返回用户态。

$$\text{传统延迟} = T_{\text{storage→CPU}} + T_{\text{CPU→GPU}} + T_{\text{CPU overhead}}$$

$$\text{GDS延迟} = T_{\text{storage→GPU}} \approx \frac{T_{\text{传统延迟}}}{2}$$

当传输大小超过 GPU BAR1 aperture 时，GDS 自动将大传输分块（chunking），使用 GPU 内部的 staging buffer 和 copy engine 完成搬运，整个过程对应用完全透明。选择更大 BAR1 的 GPU（如数据中心级 A100/H100）可减少此类开销。

**PCIe 拓扑优化与性能最大化**

GDS 的性能收益高度依赖 PCIe 拓扑结构。在理想配置中，NIC/NVMe 与 GPU 连接在同一 PCIe 交换机下，数据无需经过 CPU root complex，可达到 PCIe 链路的理论带宽上限。例如，在 HGX 系统中，Gen4 CPU 的 PCIe 树带宽上限为 25 GB/s，但 A100 GPU 和 CX6 NIC 均支持 50 GB/s——通过 PCIe 交换机实现 GDS 直通可突破 CPU 瓶颈，将带宽翻倍至 50 GB/s。

对于本地存储场景，至少需要 4 块 x4 PCIe NVMe 驱动器才能饱和一条 x16 PCIe 链路。GDS 还支持 NVMe-oF（NVMe over Fabrics）和 InfiniBand RDMA 远程存储，通过 `libcufile_rdma.so` 实现用户态 RDMA 直接到 GPU 的数据传输，适用于分布式训练场景。

> ⚠️ 注意：GDS 要求 GPU 内存通过 `cudaMalloc` 分配（pinned memory），不支持 `cudaMallocManaged`（统一内存）或 `malloc`（CPU 内存）。这是因为 DMA 引擎需要固定的物理地址映射，而 managed memory 的页面可能被操作系统迁移。

**与传统方法的对比**

| 维度 | 传统 CPU bounce buffer | GPUDirect Storage |
|------|----------------------|-------------------|
| 数据路径 | 存储 → CPU 内存 → GPU | 存储 → GPU（直通） |
| PCIe 带宽利用 | 数据传输两次，带宽减半 | 单次传输，接近线速 |
| CPU 开销 | 高（参与数据搬运） | 低（仅控制面） |
| 延迟 | 高（双跳 + page cache） | 低（约降低 50%） |
| 系统内存占用 | 需要 bounce buffer | 不需要 |
| API | POSIX read/write + cudaMemcpy | cuFileRead/cuFileWrite（一步完成） |
| 异步支持 | 需手动管理 | 原生 Batch IO + CUDA Stream |

#### 🧪 练习题
```yaml
question: "GPUDirect Storage 绕过 CPU bounce buffer 的关键内核机制是什么？"
options:
  - "修改 Linux 内核的 VFS 层，使其原生支持 GPU 地址空间"
  - "nvidia-fs.ko 注册 DMA 回调函数，存储驱动在 DMA 时查询 GPU 物理地址并直接写入"
  - "将 GPU 显存映射为 CPU 的 NUMA 节点，复用现有 page cache 机制"
  - "在用户态通过 DPDK 绕过内核直接操作 NVMe 控制器"
answer: 1
explain: "nvidia-fs.ko 通过注册 nvfs_is_gpu_page 和 nvfs_dma_map_sg 等回调函数，使存储驱动在执行 DMA 时能识别 GPU 地址并获取对应的 BAR1 物理地址，从而将数据直接 DMA 到 GPU 显存，无需修改 Linux 内核核心。"
```

### DeepFreeze

```yaml
id: deepfreeze
num: 14
name: DeepFreeze
full_name: DeepFreeze异步检查点 (DeepFreeze)
year: '2020'
org: ANL
parent: —
paper_url: https://ieeexplore.ieee.org/document/9139779
project_url: ''
category: checkpoint
motivation: VELOC多级持久化,HPC异步I/O
```

#### 📝 一句话总结
DeepFreeze 把 ANL 的 VELOC 异步多级检查点运行时接入 Keras/TensorFlow 数据并行训练，通过轻量序列化、权重分片和执行图内抽取来降低检查点阻塞时间，解决默认 HDF5 同步保存模型权重在 HPC 文件系统上扩展性差的问题。

#### 🎯 核心要点
- 面向同步数据并行深度学习，利用每个 batch 结束后各 rank 权重一致这一安全点做检查点
- 用 Keras callback 封装检查点模块，用户只需把 callback 加入 `model.fit` 的 callbacks 列表
- 对比四类方案：`Keras-Default`、`VELOC-Single`、`VELOC-Sharded`、`VELOC-Opt`
- `VELOC-Single` 将权重取为 numpy arrays 后用 VELOC 本地序列化，并由 VELOC 后台异步刷到 Lustre 等外部存储
- `VELOC-Sharded` 让每个 rank 只保存每个权重数组的一段 slice，分摊序列化和持久化负载
- `VELOC-Opt` 把张量抽取和切片嵌入 TensorFlow execution graph，仅把序列化保留在阻塞路径中
- 实验在 CANDLE-NT3 与 ResNet-50 上显示，VELOC-Opt 相比 Keras 默认方案显著降低 blocking phase 和 runtime overhead

#### 🔬 深入细节
![VELOC 架构图](https://ar5iv.labs.arxiv.org/html/2103.02131/assets/x1.png)
*图：VELOC 论文的 Figure 1，展示 VeloC Client、VeloC Engine/Backend、多级存储与异步模式。DeepFreeze 的 Figure 4 基于该 VELOC runtime 构建；这里使用 ar5iv 公开图片 URL 作为 VELOC 架构来源。*

```python
# DeepFreeze / VELOC-Opt 核心流程伪代码
class DeepFreezeCallback(keras.callbacks.Callback):
    def __init__(self, veloc, rank, nranks, checkpoint_every):
        self.veloc = veloc
        self.rank = rank
        self.nranks = nranks
        self.interval = checkpoint_every

    def on_train_batch_end(self, batch, logs=None):
        if batch % self.interval != 0:
            return

        # batch 结束是同步数据并行的安全点：各 replica 权重已通过 all-reduce 对齐
        shards = []
        for tensor in self.model.trainable_weights:
            # VELOC-Opt 将 tensor -> contiguous bytes / slice 的抽取放入 TF graph
            local_slice = graph_extract_slice(
                tensor,
                shard_id=self.rank,
                shard_count=self.nranks,
            )
            shards.append(serialize_contiguous(local_slice))

        # 阻塞路径只等待本地序列化；外部 PFS flush 由 VELOC 后台异步完成
        ckpt_id = f"batch_{batch}_rank_{self.rank}"
        self.veloc.checkpoint_begin(ckpt_id)
        for i, shard in enumerate(shards):
            self.veloc.mem_protect(name=f"w{i}", buffer=shard)
        self.veloc.checkpoint_end()

        # VELOC active backend: local checkpoint -> partner/erasure coding -> PFS
```

DeepFreeze 的问题背景是深度学习训练越来越依赖大型集群和同步数据并行，但常见框架里的检查点机制很朴素。Keras 默认做法是在 callback 中调用 `model.save_weights(ckpt_file)`，用 HDF5 把 rank 0 的模型权重写到外部文件系统。虽然同步数据并行在 batch 结束时各 replica 的权重一致，理论上一个 rank 保存就够了，但这个 rank 会在下一批训练中落后，最终其他 rank 在同步点等待它，阻塞时间会放大成整体训练开销。HPC 环境里的 Lustre/PFS 又不擅长大量小 I/O 和频繁同步写，因此默认方案难以支持高频检查点。

DeepFreeze 的基本拆解是把“从框架张量拿到权重数组”和“把字节写到持久存储”分开看。`VELOC-Single` 仍然由一个 rank 调用 `model.get_weights()` 拿到 numpy arrays 并序列化，但写外部存储由 VELOC 异步后台完成；因此相对 Keras 默认方案，它隐藏了远端 flush，却没有消除张量抽取和本地序列化的阻塞。`VELOC-Sharded` 进一步让每个 rank 保存所有权重数组的一个 slice，理论上把总 checkpoint size 平摊到 \(N\) 个 rank：

$$
S_{\text{rank}} \approx \frac{S_{\text{model}}}{N}, \qquad
T_{\text{serialize, rank}} \approx \frac{S_{\text{model}}}{N \cdot B_{\text{local}}}
$$

不过论文也指出，ResNet-50 这类模型包含许多小 tensor，切片操作本身会产生不可忽略的准备开销，因此简单 sharding 不一定线性受益。

`VELOC-Opt` 是论文最核心的优化。它不在 callback 中额外开一个 Python/TensorFlow 上下文去把 tensor 转 numpy 再切片，而是把抽取、切片等操作嵌入 TensorFlow execution graph。这样训练执行图在正常流中准备好每个 rank 的本地 shard，callback 阻塞路径主要剩下把连续字节交给 VELOC Python binding 的序列化动作。论文把评价指标分成 preparation phase、blocking phase 和 runtime overhead：preparation 衡量张量抽取/切片，blocking 衡量 callback 阻塞训练的时间，runtime overhead 衡量整个训练组的端到端放慢。这个分解很重要，因为异步 I/O 只能隐藏远端写入，若张量抽取仍在关键路径上，训练仍会停顿。

VELOC 负责的是检查点运行时而非深度学习语义。它提供 client API、checkpoint begin/end、内存保护、本地存储、多级持久化、异步 backend、partner replication 或 erasure coding 等能力。DeepFreeze 的贡献在于把 DNN 权重结构映射成 VELOC 能高效处理的连续字节数组，并利用数据并行 rank 之间的对称性切分工作。对外部存储而言，多个 rank 各自写本地 shard，再由 VELOC 后台迁移到 Lustre，能避免 rank 0 单点写入和同步 HDF5 小 I/O 风暴。

从机制上看，DeepFreeze 的总开销可拆成：

$$
T_{\text{ckpt}} =
T_{\text{extract}} +
T_{\text{slice}} +
T_{\text{serialize}} +
T_{\text{local-write}} +
T_{\text{async-flush}}
$$

Keras 默认方案几乎把这些全部放在阻塞路径；`VELOC-Single` 隐藏 \(T_{\text{async-flush}}\)；`VELOC-Sharded` 降低单 rank 数据量但增加切片准备；`VELOC-Opt` 试图把 \(T_{\text{extract}}+T_{\text{slice}}\) 移出 callback 阻塞路径，只留下更小的 \(T_{\text{serialize}}\)。因此论文报告的优势不是“检查点不存在了”，而是阻塞路径被压缩，外部 I/O 被异步化，规模增加时 Keras 默认方案的集中写瓶颈更明显。

与 CheckFreq 这类训练系统相比，DeepFreeze 更偏 HPC I/O runtime 适配：它没有重点讨论数据迭代器恢复、GPU 内存快照或自动频率调节，而是围绕 VELOC 多级持久化、rank 分片和执行图增强来降低检查点保存开销。它的适用边界也因此清晰：当训练框架能暴露权重张量、训练在同步点有一致状态、集群有本地存储和外部 PFS 时，DeepFreeze 能以很小训练代码改动获得异步检查点收益；若训练状态包含复杂 optimizer/sharded state，或者需要恢复 dataloader 随机状态，还必须额外纳入这些状态。

> 💡 关键：DeepFreeze 的“异步”并不等于所有工作都免费，它把远端持久化交给 VELOC 后台，并通过 graph-level extraction 缩短训练必须等待的那一小段同步窗口。

#### 🧪 练习题
```yaml
question: "DeepFreeze 中 VELOC-Opt 相比 VELOC-Sharded 的关键改进是什么？"
options:
  - "只保存 rank 0 的 HDF5 文件，避免所有 rank 参与"
  - "把张量抽取和切片嵌入 TensorFlow execution graph，减少 callback 阻塞路径"
  - "删除外部持久化，只把权重留在 GPU 显存"
  - "通过降低模型精度来减少训练计算量"
answer: 1
explain: "VELOC-Opt 仍使用分片和 VELOC 异步持久化，但把原本在 callback 中阻塞执行的 tensor extraction/slicing 移入执行图，从而降低 blocking phase。"
```

### CheckFreq

```yaml
id: checkfreq
num: 15
name: CheckFreq
full_name: CheckFreq动态检查点 (CheckFreq)
year: '2021'
org: MSR
parent: —
paper_url: https://www.usenix.org/conference/fast21/presentation/mohan
project_url: ''
category: checkpoint
motivation: 两阶段机制,3.5%开销秒级恢复
```

#### 📝 一句话总结
CheckFreq 提出自动、迭代级、细粒度 DNN 检查点框架，通过两阶段流水线检查点、可恢复数据迭代器和动态频率调节，在把运行时开销限制在约 3.5% 内的同时，把故障恢复损失从 epoch 级小时缩短到秒级。

#### 🎯 核心要点
- 将 DNN 检查点粒度从 epoch boundary 降到 iteration boundary，降低抢占、节点故障或进程失败后的重算 GPU 时间
- 检查点机制拆成 `snapshot()` 与 `persist()` 两阶段：先捕获一致内存快照，再异步写入持久存储
- 利用 DNN 迭代结构，把第 \(i\) 次迭代后的 snapshot 与第 \(i+1\) 次迭代的 forward/backward 重叠，只在下一次 weight update 前同步
- 当 GPU 有空闲显存时优先做 GPU-side snapshot，再异步拷到 CPU/磁盘；显存不足时退回 CPU-side snapshot
- 可恢复数据迭代器保存 epoch id 和已处理样本数，用确定性 shuffle 恢复随机顺序，保证每个 epoch 每个样本恰好使用一次
- 在线 profiling 根据迭代时间、weight update 时间、snapshot 时间、checkpoint size、磁盘吞吐和显存余量计算初始频率
- adaptive rate tuning 根据实际运行时反馈重新调整 checkpoint interval，确保开销不超过用户给定阈值 \(p\)
- PyTorch 可插拔实现基于 DALI 数据管线，只需少量训练脚本改动，并用 `torch.save()` + `fsync()` 保证持久化

#### 🔬 深入细节
![CheckFreq 训练架构图](https://img-blog.csdnimg.cn/direct/4bf1fbe3362242f9b675d3275835b475.png)
*图：CheckFreq 论文 Figure 3 的公开转存图。原始来源为 USENIX FAST'21 论文/幻灯片，图中包含 Iterator、Policy、Snapshot、Persist 和反馈回路。*

```python
# CheckFreq 机制与策略伪代码
class CheckFreqIterator:
    def __init__(self, dataset, model, optimizer, target_overhead_p):
        self.epoch = 0
        self.items_seen = 0
        self.k = None
        self.p = target_overhead_p
        self.inflight = None

    def profile_and_choose_k(self):
        Ti = profile_iteration_time()
        Tw = profile_weight_update_time()
        Tg = profile_gpu_snapshot_time()
        Tc = profile_cpu_snapshot_time()
        Ts = profile_persist_time()
        free_mem, total_mem = profile_gpu_memory()
        ckpt_size = estimate_checkpoint_size()

        snapshot_cost = Tg if free_mem >= ckpt_size else Tc
        visible_cost = max(0, snapshot_cost - (Ti - Tw)) + max(0, Ts - Ti)
        self.k = ceil(visible_cost / (self.p * Ti))

    def maybe_checkpoint(self, step, model, optimizer):
        if self.k is None:
            self.profile_and_choose_k()
        if step % self.k != 0:
            return

        if self.inflight and not self.inflight.done():
            self.inflight.wait()          # 保证任意时刻最多一个未完成 checkpoint

        state = {
            "model": snapshot(model),     # 与下一轮 forward/backward 流水线化
            "optimizer": snapshot(optimizer),
            "iterator": {"epoch": self.epoch, "items_seen": self.items_seen},
        }
        self.inflight = background_persist(state, fsync=True)

    def restore(self, checkpoint):
        load_model_and_optimizer(checkpoint)
        self.epoch = checkpoint["iterator"]["epoch"]
        self.items_seen = checkpoint["iterator"]["items_seen"]
        reseed_shuffle(epoch=self.epoch)
        skip_to(self.items_seen)
```

CheckFreq 的出发点是传统 DNN 容错策略的粒度太粗。很多训练脚本只在 epoch 结束保存模型，而现代 ImageNet/BERT 级训练中一个 epoch 可能持续数小时；作业被抢占或节点失败后，只能从上一个 epoch checkpoint 恢复，中间 GPU 计算全部浪费。若每个 epoch 有 \(n\) 次 iteration、单次耗时 \(T_i\)，epoch boundary checkpoint 的平均恢复损失近似为：

$$
R_{\text{avg,epoch}} \approx \frac{nT_i}{2}, \qquad
R_{\max,\text{epoch}} \approx nT_i
$$

CheckFreq 改为每 \(k\) 次 iteration 做一次 checkpoint，若系统保证最多只回滚一个完成 checkpoint，则恢复损失变为：

$$
R_{\max,\text{CheckFreq}} \le kT_i + T_{\text{restore}}
$$

因此核心问题变成：如何让 \(k\) 足够小，同时不让频繁 checkpoint 把训练拖慢。

两阶段 checkpoint 是 CheckFreq 的机制核心。传统同步 checkpoint 把模型状态复制、序列化和写盘全部放在训练关键路径，GPU 必须等待 CPU/磁盘完成。CheckFreq 将其拆成 `snapshot()` 和 `persist()`：`snapshot()` 捕获模型状态、optimizer 状态和 iterator 状态的一致副本；`persist()` 在后台把副本写到磁盘。关键观察是 DNN iteration 的状态修改位置很集中：forward/backward 主要读模型参数并计算梯度，真正改变 learnable parameters 的是 weight update。于是第 \(i\) 次 weight update 后开始的 snapshot 可以与第 \(i+1\) 次 forward/backward 重叠，只要在第 \(i+1\) 次 weight update 前确保 snapshot 完成，就不会混入下一次迭代的部分更新。

这个同步边界可以写成机制约束：

$$
\text{snapshot}_i.\text{finish} \le \text{weight\_update}_{i+1}.\text{start}
$$

若 snapshot 在下一次 weight update 前没完成，训练短暂停等；若完成了，checkpoint stall 基本被 forward/backward 计算隐藏。`persist()` 阶段也被后台化，但 CheckFreq 不允许无限堆积持久化任务：当策略准备发起下一个 checkpoint 时，如果上一个 persist 仍未完成，训练会等待它完成。这样保证任意时刻最多一个 in-flight checkpoint，故障时不会因为连续放弃未完成 checkpoint 而回滚到很旧状态。

CheckFreq 还利用 GPU snapshot 降低复制成本。如果 GPU 显存有足够余量，它先在 GPU 内存中复制模型状态，因为 GPU 内部复制远快于 GPU-to-CPU 传输；随后再异步把快照搬到 CPU 并写盘。如果显存不足，则直接做 CPU-side snapshot。这个选择会影响策略中的可见开销：当 snapshot 完全被 forward/backward 覆盖时，用户几乎只看到很小 stall；当 snapshot 或 persist 超过可覆盖窗口时，超出的部分必须通过增大 \(k\) 来摊薄。

频率策略不是固定经验值，而是在线 profiling + adaptive tuning。论文的 Algorithm 1 接收 \(T_i,T_w,T_c,T_g,T_s,m,M,M_{\max},p\) 等输入，其中 \(T_i\) 是 iteration time，\(T_w\) 是 weight update time，\(T_c/T_g\) 分别是 CPU/GPU snapshot 成本，\(T_s\) 代表持久化相关成本，\(m/M/M_{\max}\) 刻画显存可用性，\(p\) 是用户允许的开销比例。直觉上，若一次 checkpoint 的可见成本为 \(C_{\text{visible}}\)，为了把均摊开销限制在 \(p\) 内，需要：

$$
k \ge \left\lceil \frac{C_{\text{visible}}}{pT_i} \right\rceil
$$

论文举例说明：若 checkpoint 成本和 iteration 都是 1 个时间单位，阈值 \(p=5\%\)，则应每 20 次 iteration checkpoint 一次。运行中若其他作业共享存储导致写入变慢，iterator 会观察实际 checkpoint interval 的运行时间，并重新计算 \(k\)，这就是 adaptive rate tuning。

正确恢复还要求 dataloader 状态可恢复。若训练中断后只恢复模型参数，而数据迭代器重新随机 shuffle，可能在同一 epoch 重复或跳过样本，破坏“每个 epoch 每个样本恰好一次”的训练数据不变式。CheckFreq 的轻量 iterator 对每个 epoch 使用由 epoch id 派生的随机种子，checkpoint 时只保存 epoch id 和已消费的数据项数量；恢复时重建同一 shuffle 序列并跳到对应位置。这样不需要持久化整个预取队列或 DALI operator graph，状态很小，且随机裁剪/变换的顺序可确定恢复。

与 DeepFreeze 相比，CheckFreq 更完整地覆盖训练系统语义：它不只优化模型权重写入，还把 iterator、checkpoint frequency、GPU/CPU snapshot 选择和反馈控制纳入一个闭环。与单纯异步 `torch.save()` 相比，CheckFreq 的优势在于严格控制一致性边界和回滚界限；与 epoch checkpoint 相比，它牺牲少量持续开销，换取故障后少量 iteration 级恢复成本。论文在多个模型、存储后端和 GPU 代际上的结论是：CheckFreq 能把恢复时间从小时级降到秒级，并把运行时开销控制在 3.5% 以内。

> ⚠️ 注意：CheckFreq 的频繁 checkpoint 并不是“越频繁越好”。若 \(k\) 过小，snapshot/persist 无法被计算覆盖，训练吞吐会下降；若 \(k\) 过大，故障恢复损失又接近 epoch checkpoint。它的算法价值正在于自动寻找满足开销上限的最短间隔。

#### 🧪 练习题
```yaml
question: "CheckFreq 为什么要把 checkpoint 拆成 snapshot() 和 persist() 两阶段？"
options:
  - "为了让模型参数不再需要持久化到磁盘"
  - "为了先捕获一致内存快照，再把写盘放到后台并与训练计算重叠"
  - "为了把所有 checkpoint 都推迟到 epoch 结束"
  - "为了只保存 dataloader 状态而不保存模型状态"
answer: 1
explain: "snapshot() 负责在正确同步边界捕获一致状态，persist() 负责异步写入持久存储；两者分离后，CheckFreq 可以把大部分 checkpoint 成本与后续训练迭代重叠。"
```

### Check-N-Run

```yaml
id: checknrun
num: 16
name: Check-N-Run
full_name: Check-N-Run差异检查点 (Check-N-Run)
year: '2022'
org: Meta
parent: checkfreq
paper_url: https://www.usenix.org/conference/nsdi22/presentation/eisenman
project_url: ''
category: checkpoint
motivation: 差异化+量化,4-13倍压缩
```

#### 📝 一句话总结
Check-N-Run 提出面向超大规模推荐模型训练的差异检查点系统，用 embedding table 的稀疏更新特性只保存变化行，再用低比特量化压缩检查点，从而缓解远程存储写带宽、网络带宽和容量瓶颈。

#### 🎯 核心要点
- 差异检查点：追踪训练间隔内被访问和更新的 embedding 行，只持久化修改部分而不是每次写全量模型
- 量化检查点：对检查点中的浮点 embedding 向量做 2/3/4/8 bit 量化，论文报告量化单项可带来 4-13 倍检查点压缩
- 默认策略：Intermittent Differential 在连续增量与重置全量基线之间动态切换，兼顾写入带宽和长期存储容量
- 低开销追踪：每个 GPU/分片维护 bit-vector，在 embedding lookup 路径上标记被修改行，并与训练通信重叠
- 训练解耦：GPU 只在复制快照到 CPU 时短暂停顿，差异计算、量化和远程写入在 CPU 后台流水化执行
- 精度约束：量化只作用于持久化检查点，训练仍使用全精度参数；位宽依据预期恢复次数选择，超出故障预期时回退到更高位宽
- 端到端效果：在 Meta/Facebook 生产推荐模型上减少 6-17 倍写带宽和 2.5-8 倍存储容量，目标是将精度影响控制在业务可接受的 0.01% 以内

#### 🔬 深入细节
![Check-N-Run 高层数据流图](https://www.usenix.org/system/files/nsdi22-paper-eisenman.pdf#page=4)
*图：Check-N-Run 训练、Reader、Trainer 与远程 checkpoint storage 的数据流。图片来源为 USENIX NSDI 2022 官方论文 PDF 第 4 页 Figure 2。*

```python
# Check-N-Run: differential checkpoint + adaptive quantization

def train_step(batch, model, modified_bits):
    sparse_ids = batch.embedding_indices
    for table_id, row_ids in sparse_ids.items():
        for row_id in row_ids:
            modified_bits[table_id][row_id] = 1
    loss = model.forward_backward_update(batch)
    return loss

def create_checkpoint(model, modified_bits, baseline, expected_restarts):
    snapshot = copy_gpu_state_to_cpu(model)  # short trainer stall

    if should_reset_baseline(baseline, modified_bits):
        diff = snapshot                      # full baseline checkpoint
        baseline = snapshot
        reset(modified_bits)
    else:
        diff = {}
        for table_id, bits in modified_bits.items():
            rows = bits.nonzero()
            diff[table_id] = snapshot.embedding_tables[table_id][rows]

    bit_width = select_bit_width(expected_restarts)
    for chunk in stream_chunks(diff):
        if bit_width <= 4:
            encoded = adaptive_asymmetric_quantize(chunk, bit_width)
        else:
            encoded = asymmetric_quantize(chunk, bit_width)
        write_remote_storage(encoded)

def should_reset_baseline(baseline, modified_bits):
    # Reset when keeping more incrementals is no longer cheaper than a new baseline.
    return estimated_future_incremental_cost(modified_bits) >= estimated_new_baseline_cost(baseline)
```

推荐模型与普通 dense DNN 的关键差异在于参数访问模式。Dense 网络每个 step 通常会对几乎所有权重产生梯度，而 DLRM 类推荐模型的大头是 embedding table，单表可以有海量行，但一个 batch 只访问其中很少一部分 ID。论文指出 embedding table 可占模型大小的 99% 以上，因此全量 checkpoint 的绝大部分成本来自 sparse layer；另一方面，在一个 checkpoint 间隔内未被访问的 embedding 行与上次 checkpoint 完全一致。这让“保存变化行”比通用压缩更有效，因为通用压缩面对训练后的浮点数高熵分布，只能获得很有限的压缩。

差异检查点的机制可以写成集合形式。设第 \(t\) 次快照的完整参数为 \(W_t\)，其中 embedding 行集合为 \(R\)，本轮被更新行集合为 \(M_t \subset R\)。全量 checkpoint 保存 \(W_t\)，而差异 checkpoint 保存：

$$
\Delta_t = \{(r, W_t[r]) \mid r \in M_t\}
$$

恢复时从最近的基线 \(B_k\) 开始，按时间顺序 replay 后续差异：

$$
W_t[r] =
\begin{cases}
\Delta_j[r], & r \in M_j \text{ 且 } j=\max\{i \le t \mid r \in M_i\}\\
B_k[r], & r \notin \bigcup_{i=k+1}^{t} M_i
\end{cases}
$$

这种设计的难点不是公式，而是生命周期策略。One-shot Differential 只保留一个基线和“相对基线的变化”，恢复简单，但变化集合会持续膨胀。Consecutive Incremental 每次只写最近间隔变化，单次写带宽最低，但恢复需要读取一串历史差异，存储和恢复链路越来越长。Intermittent Differential 则用历史大小估计何时重置全量基线：当继续积累增量的长期成本接近或超过新建基线成本时，系统写一个新基线并清空 bit-vector，让后续差异重新变小。

量化解决的是“即使只保存变化行，变化行本身仍是 FP32 浮点向量”的问题。朴素对称量化假设范围关于 0 对称，容易浪费码点；非对称量化用每个向量或分块的 \(x_{\min}, x_{\max}\) 覆盖实际范围，公式为：

$$
q(x)=\operatorname{round}\left(\frac{x-x_{\min}}{x_{\max}-x_{\min}}(2^b-1)\right)
$$

$$
\hat{x}=x_{\min}+\frac{q(x)}{2^b-1}(x_{\max}-x_{\min})
$$

但 embedding 向量常有 outlier，极值会拉大量化区间，让大多数元素分辨率下降。Check-N-Run 的 adaptive asymmetric quantization 通过贪心收缩 \(x_{\min}\) 或 \(x_{\max}\) 来寻找更小的重构误差：每一步比较“去掉左侧一小段”和“去掉右侧一小段”后的 L2 error，选择误差更小的方向，并限制最多收缩到原范围的一定比例。这比 K-means 量化便宜得多，又能避免少数 outlier 统治码本。

位宽选择体现了系统论文里的工程约束：checkpoint 量化误差只有在故障恢复后才进入后续训练状态。如果一次训练几乎不恢复，2 bit 可能足够；如果训练期间多次从量化 checkpoint 恢复，误差会累积，就要升到 3/4/8 bit。可以将累计误差风险粗略理解为：

$$
E_{\text{total}} \approx n_{\text{restart}} \cdot E_q(b)
$$

其中 \(E_q(b)\) 随位宽 \(b\) 增大而下降，而 \(n_{\text{restart}}\) 来自集群故障概率估计。Check-N-Run 因此不是固定压缩率系统，而是在“预期恢复次数、允许精度损失、写入成本”之间动态选择量化策略。

实现上，Check-N-Run 继承了 CheckFreq 式的 snapshot/persist 解耦思想，但利用推荐模型的稀疏更新做得更细。训练进程只需要在 checkpoint 触发时把 GPU 状态复制到 CPU pinned memory；随后训练继续，CPU 后台进程负责读取 bit-vector、组织差异块、量化并上传远程存储。Reader 状态也必须和 Trainer 状态一起记录，否则恢复后可能重复消费或跳过训练样本。最终，系统把原本阻塞训练和压垮远程存储的全量写入，拆成短暂停顿加后台流水线。

#### 🧪 练习题
```yaml
question: "Check-N-Run 为什么特别适合推荐模型而不是任意 dense DNN？"
options:
  - "推荐模型不需要保存 optimizer state"
  - "推荐模型 embedding table 巨大且每个训练间隔只更新其中一部分行"
  - "推荐模型 checkpoint 可以完全丢弃 dense MLP 参数"
  - "推荐模型的浮点参数可被通用压缩算法无损压到很小"
answer: 1
explain: "Check-N-Run 的核心收益来自 sparse embedding 的稀疏更新：未访问行与旧 checkpoint 相同，只需保存变化行；dense DNN 通常每步都会更新大部分参数。"
```

### ByteCheckpoint

```yaml
id: bytecheckpoint
num: 17
name: ByteCheckpoint
full_name: 字节检查点系统 (ByteCheckpoint)
year: '2025'
org: ByteDance
parent: checkfreq
paper_url: https://www.usenix.org/conference/nsdi25/presentation/wan-borui
project_url: ''
category: checkpoint
motivation: 10TB/s带宽,统一大模型检查点
```

#### 📝 一句话总结
ByteCheckpoint 提出一套面向大模型全生命周期的统一 checkpoint 系统，用与并行策略解耦的 shard metadata、load-time resharding 和全栈 I/O 优化，让不同训练框架、并行配置和存储后端都能共享同一保存/加载工作流。

#### 🎯 核心要点
- 统一 API：提供 `bytecheckpoint.save` 和 `bytecheckpoint.load`，屏蔽 Megatron-LM、FSDP、DDP 等框架差异
- 并行无关表示：用 FQN、global shape、ShardMeta、BasicMeta、ByteMeta 和全局 metadata 文件描述张量分片
- Load-time resharding：加载时根据目标并行配置查询 metadata 并生成读取计划，不需要离线 resharding job
- Dataloader resharding：区分 replicated state 与 sharded state，避免恢复时丢样本或重复训练已消费数据
- 计划优化：Worst-Fit 负载均衡、冗余读取消除、plan/metadata 缓存，把规划开销从每次 checkpoint 变成一次性成本
- 异步 pipeline：保存时流水化 D2H copy、序列化和上传；加载时流水化读取、反序列化、H2D copy 和 GPU 间通信
- 存储与通信优化：对 HDFS 做多线程随机读、分片写后 metadata concat，并优化大规模 collective barrier
- 生产规模：论文报告支撑 405B LFM 在 8960 GPU 上训练，I/O 吞吐达到 10TB/s 量级，并显著降低 checkpoint stall

#### 🔬 深入细节
![ByteCheckpoint 系统架构](https://arxiv.org/html/2407.20143v4/x4.png)
*图：ByteCheckpoint 架构图，来自 arXiv HTML Figure 4。API 层、Planner 层、Execution Engine 和 Storage I/O 层相互解耦，使同一 workflow 可覆盖不同训练框架与存储后端。*

```python
# ByteCheckpoint load-time resharding workflow

def save(states, path, framework, storage_backend):
    local_plan = Planner(framework).make_local_save_plan(states)
    global_plan = coordinator.gather_and_balance(local_plan, policy="worst_fit")
    metadata = build_global_metadata(global_plan)  # BasicMeta + ShardMeta + ByteMeta
    cache_plan_and_metadata_if_stable(global_plan, metadata)
    Engine(storage_backend).async_save_pipeline(global_plan, metadata)

def load(states, path, target_parallelism, framework, storage_backend):
    metadata = read_global_metadata(path)
    local_plan = []
    for tensor in states.model_and_optimizer_tensors():
        target_shards = Planner(framework).target_shards(tensor, target_parallelism)
        for shard in target_shards:
            segments = metadata.TensorShardToBasicByteMap.query(
                fqn=tensor.fqn,
                offsets=shard.nD_offsets,
                lengths=shard.nD_lengths,
            )
            local_plan.append((tensor, shard, segments))

    optimized_plan = coordinator.eliminate_redundant_reads(local_plan)
    Engine(storage_backend).async_load_pipeline(optimized_plan)
    async_collective_barrier()  # integrity guarantee for distributed load
```

ByteCheckpoint 的出发点是：大模型开发不是“一个训练任务周期性保存 checkpoint”这么简单。预训练、长上下文继续训练、SFT、Reward Modeling、PPO/DPO、自动评测和跨阶段迁移都会消费中间 checkpoint，而且每个阶段可能使用不同 GPU 数量、并行度、框架和存储系统。传统做法需要离线 resharding 脚本：先下载旧 checkpoint，按新并行配置重排，再上传新 checkpoint，训练或评测任务只能等待这个额外 job 完成。ByteCheckpoint 的核心判断是，checkpoint 文件格式不能绑定某一次训练的 rank 划分，而要保存足够的全局位置元数据，让加载端按目标并行配置直接取数。

它对模型和 optimizer state 的抽象围绕张量全局坐标展开。每个张量由 fully qualified name \(fqn\) 唯一标识，并有未分片前的 global shape。某个 rank 保存的分片用如下元组描述：

$$
\text{ShardMeta}=(fqn,\ nD\_offsets,\ nD\_lengths)
$$

其中 \(nD\_offsets\) 表示该分片在原始多维张量中的起始坐标，\(nD\_lengths\) 表示每一维长度。实际落盘位置再由：

$$
\text{ByteMeta}=(file\_id,\ byte\_offset,\ byte\_length)
$$

记录。全局 metadata 文件把 `ShardMeta + BasicMeta + ByteMeta` 连接成 `TensorShardToBasicByteMap`，加载时只要目标 shard 与某些已保存 shard 在全局坐标空间相交，就能按 byte range 读出所需片段。

这种表示让 load-time resharding 成为一次空间区间查询。设保存时的分片集合为 \(\mathcal{S}_{old}\)，目标并行策略下 rank \(r\) 需要的分片为 \(s_{new}^{(r)}\)，加载计划本质是：

$$
\text{ReadPlan}(r)=\{(s, s \cap s_{new}^{(r)}) \mid s \in \mathcal{S}_{old},\ s \cap s_{new}^{(r)} \ne \varnothing\}
$$

也就是说，ByteCheckpoint 不需要先重写成一个新 checkpoint；目标 worker 只读自己需要的旧 checkpoint 片段，并在内存中拼回目标 shard。这对评测和跨阶段迁移尤其关键，因为同一个原始 checkpoint 可以被多个下游任务复用。

Dataloader state 是另一个容易被低估的细节。模型权重能按张量坐标重排，但 dataloader 还包含 RNG、global step、token buffer、数据源 offset 等训练进度状态。ByteCheckpoint 将 dataloader state 分为 replicated state 和 sharded state：前者如数据源路径、采样比例，只由 rank 0 保存即可；后者如 token buffer 和数据检索 offset，按 I/O worker 单独保存。并行度变化时，token buffer 需要 split 或 merge，否则恢复后可能重复训练已经进入 buffer 的样本，或丢弃尚未形成 micro-batch 的 token。

性能优化分三层。第一层在 Planner：保存时用 Worst-Fit 按 tensor shard size 平衡保存负载，避免只让第一个 DP group 写所有 replicated state；加载时在 DP group 内消除冗余读取，一个 worker 从存储读入后通过 GPU interconnect/collective 转发给同组其他 worker。第二层在 Engine：保存 pipeline 将 D2H copy、序列化和上传分离，用 pinned CPU memory pool 与 ping-pong buffer 减少训练停顿；加载 pipeline 并行执行文件读取、反序列化、H2D copy 和 All-to-All。第三层在存储系统：HDFS 读取利用 offset random read 做多线程下载，写入则把大文件拆成多个 sub-file 并发写，最后用 metadata concat 合并。

ByteCheckpoint 与 Check-N-Run 的重点不同。Check-N-Run 主要减少推荐模型 checkpoint 的“数据量”，尤其是稀疏 embedding 的差异化与量化；ByteCheckpoint 主要解决大模型训练平台里的“表示与调度统一性”：同一个 checkpoint 能被不同并行策略、框架和存储后端高效加载。它不依赖某种模型稀疏性，而是通过 metadata 让 checkpoint 从 rank-local dump 变成可查询的全局张量片段数据库。

#### 🧪 练习题
```yaml
question: "ByteCheckpoint 实现 load-time resharding 的关键元数据是什么？"
options:
  - "只保存每个 rank 的本地文件名，不保存张量位置"
  - "用 ShardMeta 描述张量分片在全局张量中的偏移和长度，并用 ByteMeta 描述落盘字节范围"
  - "把所有 checkpoint 先合并成单个全量模型文件"
  - "只记录 GPU 拓扑，不记录 tensor shard 信息"
answer: 1
explain: "ByteCheckpoint 的全局 metadata 将 FQN、ShardMeta、BasicMeta 和 ByteMeta 关联起来，加载端可按目标并行配置查询需要读取的旧分片字节范围。"
```

### Universal Checkpointing

```yaml
id: universal_ckpt
num: 18
name: Universal Checkpointing
full_name: 原子检查点系统 (Universal Checkpointing)
year: '2025'
org: 学术研究
parent: bytecheckpoint
paper_url: https://www.usenix.org/conference/atc25/presentation/lian
project_url: ''
category: checkpoint
motivation: 原子结构,动态并行策略
```

#### 📝 一句话总结
Universal Checkpointing (UCP) 提出 atomic checkpoint 与 pattern-based reconfiguration，把分布式 checkpoint 从具体并行策略和硬件 rank 划分中解耦，使大规模训练能在故障、弹性资源或阶段切换后用不同并行策略继续运行。

#### 🎯 核心要点
- Atomic checkpoint：以参数为中心保存 consolidated weight 和 optimizer state，不携带 rank id、padding 或源并行策略细节
- Reconfigurable parallelism：支持从 Source 并行策略 \(P_{src}\) 到 Target 并行策略 \(P_{tgt}\) 的自动转换
- Pattern set：用 Unique、Replicate、Partial、Shard-V、Shard-H、Shard-Hy、Shard-NC 等模式覆盖常见张量分片形态
- Pattern-aware operators：用 Extract、Union、StripPad、UcpInfo、Save、Load 将源分布式 checkpoint 转为 atomic checkpoint，再映射到目标 rank
- 数据类型处理：atomic checkpoint 中 weight/optimizer values 保持 FP32，同时支持恢复到 FP32、FP16、BF16 等训练格式
- 高效转换：nested parallel reconfiguration 将转换建模为 MapReduce，并按参数大小做负载均衡
- 冗余加载优化：同一 DP group 内避免重复从存储读相同 atomic files，转而读一次后用 GPU 间通信分发
- Lazy invocation：正常保存路径不做重排，只有 \(P_{src}\ne P_{tgt}\) 或硬件配置变化时才触发 reconfiguration

#### 🔬 深入细节
![Universal Checkpointing 系统设计总览](https://arxiv.org/html/2406.18820v3/x2.png)
*图：UCP 系统设计总览，来自 arXiv HTML Figure 2。UCP 从 Source 并行策略经过 atomic checkpoint 和 pattern-based reconfiguration pipeline 映射到 Target 并行策略。*

```python
# Universal Checkpointing: pattern-based reconfiguration

def convert_to_atomic(distributed_ckpts, source_parallelism):
    fragments_by_param = defaultdict(list)

    for ckpt_file in distributed_ckpts:
        for fragment in Extract(ckpt_file, source_parallelism):
            pattern = infer_pattern(fragment)  # Unique, Replicate, Shard-V, ...
            fragments_by_param[fragment.fqn].append((pattern, fragment))

    atomic = {}
    for fqn, fragments in fragments_by_param.items():
        merged = Union(pattern_aware_group(fragments))
        merged = StripPad(merged)
        atomic[fqn] = {
            "model.pt": merged.weight_fp32,
            "adam_m.pt": merged.adam_m_fp32,
            "adam_v.pt": merged.adam_v_fp32,
        }
    return atomic

def load_to_target(atomic, target_parallelism):
    mapping = UcpInfo(atomic, target_parallelism)
    for rank in target_parallelism.ranks:
        for layer in mapping.layers_for(rank):
            tensors = Load(atomic, mapping[rank][layer])
            place_on_gpu(rank, tensors)
            release_cpu_buffers(tensors)
```

UCP 解决的问题与 ByteCheckpoint 相近，但抽象更“参数中心”。已有分布式 checkpoint 常是 rank-local snapshot：ZeRO-3 会把参数和 optimizer state 展平后按 data parallel rank 切开；tensor parallel 会按列或行切矩阵；pipeline parallel 则按层分配到不同 stage。这些文件能高效保存，但与源并行策略、rank 数和 padding 规则强绑定。训练如果因为故障减少 GPU、因为弹性资源增加 GPU、或从 ZeRO/TP/PP 组合切到另一种 3D parallelism，工程师往往要写成对的转换脚本。

Atomic checkpoint 是 UCP 的统一中间表示。对一个参数 \(p\)，UCP 不保存“rank 3 拥有什么”，而保存“这个参数的完整逻辑状态是什么”。以 Adam 为例，一个参数目录可包含：

$$
A(p)=\{\text{model.pt}_{fp32},\ \text{adam\_m.pt}_{fp32},\ \text{adam\_v.pt}_{fp32}\}
$$

这里的 `model.pt` 是 FP32 权重，`adam_m.pt` 和 `adam_v.pt` 是 Adam 一阶、二阶矩。atomic checkpoint 比 rank-local checkpoint 更细粒度，也不包含源并行产生的 rank id、分片 padding 或临时 layout。这样它可以作为不同并行策略之间的 common interchange format。

Pattern-based reconfiguration 负责把“各种源 checkpoint”自动归一到 atomic checkpoint。UCP 观察到复杂并行策略虽然实现不同，但张量分片模式可归纳为有限集合：Unique 表示某参数只属于一个 checkpoint，例如 pipeline stage 独占层；Replicate 表示多个 rank 都保存相同参数；Shard-V/Shard-H 表示沿列或行切分；Shard-Hy 表示多维切分；Shard-NC 表示非连续或不规则切分，可覆盖 MoE fused weight、GQA 等新结构。转换过程用模式推断决定如何 Extract 片段，再用 Union 按模式合并。

这个过程可以抽象成从源并行到目标并行的两段映射：

$$
C_{atomic}=U(P_{src}, C_{distributed})
$$

$$
C_{target}=L(P_{tgt}, C_{atomic})
$$

其中 \(U\) 包含 Extract、Union、StripPad 和 Save，\(L\) 包含 UcpInfo 与 Load。这样新增一个目标并行策略时，不需要实现从所有旧策略到它的 \(N\) 个转换器，只需让目标策略能从 atomic checkpoint 生成自己的 rank-to-tensor mapping。

UCP 的设计保留了高效保存路径。直接在每次保存时合并全量参数会拖慢训练，并且 1T 参数级模型可能没有单机内存容纳 consolidated model state。UCP 因此采用 lazy invocation：正常训练仍按原分布式 checkpoint 方式保存；只有当恢复时发现 \(P_{src}\ne P_{tgt}\)、GPU 数变化或硬件配置变化，才触发 atomic conversion。论文报告这种 lazy 设计使正常 checkpoint saving 不增加关键路径开销。

真正触发转换时，UCP 用 nested parallel reconfiguration 控制成本。它把转换看作 MapReduce：mapper 读取源 checkpoint 并 Extract 参数片段，shuffler 按参数名发送片段，reducer 根据 pattern 合并成 atomic checkpoint。参数大小差异极大，例如 embedding 矩阵可能远大于 LayerNorm bias，因此 master 先按 `numel` 做组间负载均衡，再在每个 worker 内用多 CPU core 并行处理。这个两级并行避免了一个 worker 处理大参数、其他 worker 空等的 straggler 问题。

加载端还有一个 I/O 关键优化：同一 DP group 内很多 rank 需要相同或部分相同的 model state。朴素实现会让每个 rank 都从持久化存储读取同一 atomic file，放大存储带宽压力。UCP 将读取任务在 DP group 内均分，每个 rank 只读一部分 atomic files 到 CPU/GPU，再通过 all-gather 或类似 collective 分发给同组 rank。并且加载按 layer-by-layer 执行，单层放到 GPU 后释放 CPU buffer，把峰值 CPU 内存从“完整 checkpoint 大小”降到“单层状态大小”附近。

与 ByteCheckpoint 相比，UCP 更强调“任何源并行到任何目标并行”的通用转换语言和模式体系；ByteCheckpoint 更强调工业平台中多框架、多存储后端和 load-time byte-range 查询的工程化统一。两者都把 checkpoint 从 rank-local 文件提升到可重排的逻辑表示，但 UCP 的 atomic checkpoint 是更明确的中间格式，尤其适合 ZeRO、TP、PP、SP、MoE/GQA 等混合并行策略之间的弹性切换。

#### 🧪 练习题
```yaml
question: "UCP 采用 lazy reconfiguration invocation 的主要原因是什么？"
options:
  - "每次保存时都合并 atomic checkpoint 会拖慢正常训练，并可能需要过高内存"
  - "atomic checkpoint 只能用于推理，不能用于训练恢复"
  - "UCP 不支持源并行和目标并行不同的情况"
  - "lazy invocation 会降低 checkpoint 文件大小到原来的 1/10"
answer: 0
explain: "UCP 保持正常分布式保存路径不变，只在并行策略或硬件配置变化时触发转换，避免把昂贵的 consolidation 放入训练关键路径。"
```

### DALI

```yaml
id: dali
num: 19
name: DALI
full_name: NVIDIA数据加载库 (NVIDIA DALI)
year: '2018'
org: NVIDIA
parent: —
paper_url: https://developer.nvidia.com/dali
project_url: ''
category: cache
motivation: GPU预处理,消除CPU瓶颈
```

#### 📝 一句话总结
DALI 提出了一套 GPU 加速的数据加载与预处理流水线，把解码、裁剪、缩放、归一化、随机增强等输入管线操作从深度学习框架的 CPU dataloader 中解耦出来，解决多 GPU 训练中 GPU 等待 CPU 预处理的瓶颈。

#### 🎯 核心要点
- **图式化 Pipeline**：用 `Pipeline` 封装符号化数据处理图，节点由 reader、decoder、random generator、augmentation operator 与输出 `DataNode` 组成
- **CPU/Mixed/GPU 三阶段执行**：`cpu` 负责读取和轻量处理，`mixed` 负责 CPU 输入到 GPU 输出的混合算子（典型是 JPEG 解码），`gpu` 负责 GPU 上的后续增强
- **异步预取队列**：通过 `exec_async`、`exec_pipelined` 与 `prefetch_queue_depth` 提前准备 batch，隐藏预处理延迟
- **批处理与框架适配**：统一以 batch 为调度单位，并提供 PyTorch、TensorFlow、MXNet、PaddlePaddle 等迭代器接口
- **格式和数据源抽象**：支持文件目录、LMDB、RecordIO、TFRecord、WebDataset、ExternalSource 等多种输入形式，降低数据格式与框架绑定
- **可调设备放置**：同一增强图中可显式选择 CPU、Mixed 或 GPU backend，在 GPU 占用、CPU/GPU 比例和吞吐之间做工程权衡

#### 🔬 深入细节
![DALI 在训练/推理输入流水线中的位置](https://developer-blogs.nvidia.com/wp-content/uploads/2021/10/RAPIDSData_Pic2-625x278.png)
*图：DALI 将输入数据、解码、GPU 加速增强和框架训练/推理连接起来。来源：NVIDIA Technical Blog, Rapid Data Pre-Processing with NVIDIA DALI*

![DALI CPU/Mixed/GPU 分阶段流水线](https://developer-blogs.nvidia.com/wp-content/uploads/2021/10/GPU-Accelerated_Pic4-625x171.png)
*图：一个典型图像管线中，Loader 在 CPU，Decode 使用 Mixed backend，Resize/Augment 在 GPU。来源：NVIDIA Technical Blog, Figure 3*

```python
# DALI 核心流水线伪代码：读取 -> mixed 解码 -> GPU 增强 -> 框架迭代
from nvidia.dali import fn, pipeline_def
from nvidia.dali.plugin.pytorch import DALIGenericIterator

@pipeline_def(batch_size=256, num_threads=8, device_id=0,
              exec_pipelined=True, exec_async=True,
              prefetch_queue_depth=2)
def imagenet_train_pipeline(data_dir):
    encoded, labels = fn.readers.file(file_root=data_dir,
                                      random_shuffle=True,
                                      name="Reader")
    images = fn.decoders.image_random_crop(encoded, device="mixed")
    images = fn.resize(images, resize_x=256, resize_y=256, device="gpu")
    mirror = fn.random.coin_flip(probability=0.5)
    images = fn.crop_mirror_normalize(
        images,
        crop_h=224,
        crop_w=224,
        mean=[0.485 * 255, 0.456 * 255, 0.406 * 255],
        std=[0.229 * 255, 0.224 * 255, 0.225 * 255],
        mirror=mirror,
        device="gpu",
    )
    return images, labels.gpu()

pipe = imagenet_train_pipeline(data_dir="/imagenet")
pipe.build()
loader = DALIGenericIterator([pipe], ["data", "label"], reader_name="Reader")

for batch in loader:
    x = batch[0]["data"]
    y = batch[0]["label"]
    loss = model_step(x, y)
```

**动机与背景：CPU dataloader 成为 GPU 训练的长尾瓶颈**

传统训练管线通常由框架 dataloader 在 CPU 上完成文件读取、JPEG/PNG 解码、随机裁剪、颜色扰动、resize、layout 转换和归一化，然后再把结果拷贝到 GPU。早期模型的 GPU 计算时间远大于输入预处理时间，这条路径还能被训练计算掩盖；但 Volta/Ampere 之后 Tensor Core 显著提高吞吐，多 GPU 服务器能在很短时间内消耗一个 batch，输入管线反而变成关键路径。DALI 的设计目标不是“缓存某个 batch”，而是把输入处理改成可调度、可并行、可异步预取的执行图，让 GPU 不再等待 CPU 串行增强。

**核心机制：Pipeline 是静态图，运行时按设备阶段调度**

DALI 的中心对象是 `Pipeline`。用户用 Python 定义图，但图在 `build()` 时被构造，后续迭代不再执行 Python 控制流，而是执行已知的 operator graph。每个 operator 根据输入和 `device` 参数被放到 `cpu`、`mixed` 或 `gpu` backend：`cpu` 节点产生 CPU TensorList；`mixed` 节点接收 CPU 输入并产生 GPU 输出，典型是硬件友好的图像解码；`gpu` 节点继续处理 GPU TensorList。这个划分的关键价值是减少不必要的 CPU/GPU 往返，尤其 DALI 不鼓励 GPU 到 CPU 的反向传输，因为那会重新引入同步和 PCIe 开销。

$$
T_{\text{native}} \approx T_{\text{read}} + T_{\text{decode}} + T_{\text{augment}} + T_{\text{H2D}} + T_{\text{train}}
$$

在 DALI 的流水线中，不同 batch 的阶段可以重叠执行，稳定状态下单步时间更接近最慢阶段而不是所有阶段之和：

$$
T_{\text{DALI}} \approx \max(T_{\text{cpu-stage}}, T_{\text{mixed-stage}}, T_{\text{gpu-stage}}, T_{\text{train}})
$$

> 💡 关键：DALI 的“GPU 预处理”不是简单把所有算子搬到 GPU，而是把输入图拆成 CPU/Mixed/GPU 阶段并异步流水化；最优设备放置取决于模型 GPU 占用率、CPU 核数、解码格式和增强复杂度。

**异步预取：把不稳定的预处理时间移出训练关键路径**

训练迭代通常要求每一步拿到一个完整 batch；如果某个 batch 的图像尺寸、压缩率或增强分支导致预处理变慢，GPU 就会空等。DALI 通过预取队列提前计算未来 batch，`prefetch_queue_depth=2` 表示运行时尽量让后续两个 batch 保持 ready 或 in-flight。预取队列可把单个慢 batch 的抖动吸收掉，使框架迭代器看到的是稳定的 `next()` 输出。其直觉可以写成：

$$
Q_{t+1} = \min(Q_{\max}, Q_t + r_{\text{prep}} - r_{\text{train}})
$$

当平均预处理速率 \(r_{\text{prep}}\) 不低于训练消耗速率 \(r_{\text{train}}\)，队列就能维持非空，GPU 利用率由模型计算决定；当 \(r_{\text{prep}}\) 长期落后，队列耗尽，输入管线仍会暴露为瓶颈。DALI 因此也提供性能调优面：增加 `num_threads`、把 decode 改为 `mixed`、把几何/颜色增强放到 GPU、调整 batch size 或队列深度。

**与框架内置 dataloader 的区别**

框架 dataloader 往往以 Python worker、多进程队列和 CPU 库为核心，不同框架对图像/音频格式、随机增强、数据 layout 的实现不完全一致。DALI 把这些操作抽象为独立算子库和执行引擎，同一条 pipeline 可以通过不同插件接入 PyTorch、TensorFlow、MXNet 或 PaddlePaddle。对工程系统而言，这带来两个直接收益：第一，数据预处理逻辑可移植，不随训练框架重写；第二，调度器能看到整条输入图，因而可以做 batch 级内存复用、阶段并行和异步执行，而不是被 Python iterator 的黑盒边界限制。

**缓存视角下的意义：缓存的是预处理能力与就绪 batch，而不是静态样本**

把 DALI 放在 storage/cache 分类下理解，重点是它缓解了“数据已在本地或对象存储中，但 GPU 仍拿不到可训练 tensor”的问题。普通文件缓存只减少读盘或远程读取时间，不能消除解码和增强成本；DALI 的预取队列则缓存已经完成或正在完成的 batch，Mixed/GPU 算子把可复用的硬件解码和增强能力并入输入路径。对于随机增强较重的训练，这比缓存原始 JPEG 更接近训练真正需要的对象：形状、layout、dtype 和归一化都已满足模型输入约束的 tensor batch。

#### 🧪 练习题
```yaml
question: "DALI 中 Mixed backend 的核心作用是什么？"
options:
  - "把 GPU TensorList 强制拷回 CPU，方便 Python 后处理"
  - "接收 CPU 输入并产生 GPU 输出，典型用于图像解码等跨设备阶段"
  - "只负责在多个训练进程之间共享文件系统缓存"
  - "替代深度学习模型的前向传播计算"
answer: 1
explain: "Mixed backend 位于 CPU 读取和 GPU 增强之间，适合 JPEG 解码这类从 CPU encoded bytes 到 GPU decoded tensor 的阶段，避免后续增强再走 CPU 路径。"
```

### AIStore

```yaml
id: aistore
num: 20
name: AIStore
full_name: NVIDIA AIStore (AIStore)
year: '2019'
org: NVIDIA
parent: —
paper_url: https://aiatscale.org/
project_url: ''
category: cache
motivation: 集成ETL,存储节点直接数据增强
```

#### 📝 一句话总结
AIStore 提出面向 AI 工作负载的弹性对象存储与快速数据层，把对象存储、远端 bucket 缓存、批量预取、分布式 reshuffling 和存储节点侧 ETL 结合起来，解决大规模训练中数据读取、格式转换和增强远离数据导致的吞吐瓶颈。

#### 🎯 核心要点
- **Proxy/Target 双角色架构**：proxy 负责前端 API、控制面和 cluster map，target 负责本地磁盘上的对象数据
- **线性扩展目标**：对象通过一致性/HRW 类策略均衡分布到 target，本地磁盘聚合为横向扩展对象命名空间
- **Fast tier 模式**：可部署在 S3、GCS、Azure Blob、OCI 等远端后端前面，通过 cold GET 和 batch prefetch 形成热数据层
- **存储侧 ETL**：用户 transformation container 与 target 同置，支持 inline GET 变换和 offline bucket-to-bucket 变换
- **AI 数据集重排**：dSort/iShard 将小文件或原始样本重组为训练友好的 shard，减少小文件 IOPS 与随机读开销
- **数据保护和校验**：提供端到端 checksum、N-way mirroring、erasure coding 与 self-healing，但 EC 不进入读写 fast path
- **多协议与工具链**：提供原生 API、S3 兼容 API、CLI、Go/Python SDK、PyTorch/TensorFlow 集成和 get-batch 训练批读取

#### 🔬 深入细节
![AIStore 高层架构图](https://files.buildwithfern.com/aistore.docs.buildwithfern.com/aistore/704f52e9f375d6e4dee9aae87072a51cb3adf4b4e066f3993d2a5826fb3f7b0e/pages/images/cluster-block-v3.26.png)
*图：AIS cluster 聚合任意数量的 proxy 与 target，对前端提供原生/S3/API/SDK，对后端连接 S3、GCS、OCI、Azure Blob 或其他 AIS cluster。来源：NVIDIA AIStore In-depth Overview*

![AIStore ETL 存储侧变换](https://files.buildwithfern.com/aistore.docs.buildwithfern.com/aistore/29c18ca1b57638d9fc60567413d14a3392db2fb9c7a4d1269d3bb89dc2a3e591/pages/images/etl-v3.3.png)
*图：ETL container 在 AIS target 侧与数据同置，TensorFlow/PyTorch 训练流可以通过 REST/YAML API 获取 inline transformation 的结果。来源：NVIDIA AIStore In-depth Overview*

```python
# AIStore 训练数据访问与存储侧 ETL 伪代码
class AISCluster:
    def get_object(self, bucket, key, etl=None):
        target = hrw_select_target(bucket, key, self.cluster_map.targets)

        if not target.has_valid_object(bucket, key):
            # Fast tier: cold GET from remote backend, then cache in AIS target
            obj = remote_backend.get(bucket, key)
            target.put(bucket, key, obj, checksum=obj.crc32c)

        obj = target.read(bucket, key)

        if etl is None:
            return obj

        # Inline ETL: transformation pod runs close to target-local data
        transformed = target.etl_runtime[etl].transform(obj)
        return transformed

def prefetch_training_range(bucket, keys):
    for key in keys:
        submit_background_xaction("prefetch", bucket=bucket, key=key)

def offline_etl(src_bucket, dst_bucket, etl_name):
    for target in cluster.targets:
        for key in target.local_keys(src_bucket):
            y = target.etl_runtime[etl_name].transform(target.read(src_bucket, key))
            target.put(dst_bucket, key, y)
```

**动机与背景：AI 数据不只是“存下来”，还要以训练友好的形态被持续消费**

大规模训练通常面对两个同时存在的问题：一是数据集巨大，远端对象存储可靠但延迟和出口带宽有限；二是原始数据往往不是模型直接可用的 batch，例如小文件图像需要 decode/resize，音频需要重采样，文本或 WebDataset shard 需要解包、过滤和重新排序。传统分布式文件系统强调 POSIX 语义或通用块/文件抽象，而 AIStore 选择对象语义加 AI 数据路径优化：让应用保留对 shard 边界、样本格式和变换逻辑的控制，存储层负责把数据靠近 GPU 集群、均衡到磁盘、并在 target 侧并行处理。

**核心架构：proxy 做控制面，target 做数据面**

AIS cluster 有两类节点。Proxy（gateway）是前端入口，处理原生 API/S3 API/SDK/CLI 请求、维护 cluster map、做认证和重定向；Target 是真正持有对象的存储节点，管理 mountpath、本地文件系统和对象校验。读写路径尽量避免中心化元数据服务，目标对象位置由 bucket/key 和 cluster map 计算得出：

$$
target(o) = \arg\max_{t \in T} H(o, t)
$$

这里 \(H(o,t)\) 可理解为对对象和 target 的 rendezvous/HRW 打分。加入或移除 target 时，只需要迁移受影响 key 空间的一部分对象；稳定状态下，每个 target 承担大约 \(1/|T|\) 的 namespace。聚合吞吐近似为所有 target 磁盘和网络能力之和：

$$
BW_{\text{cluster}} \approx \sum_{i=1}^{N} BW_{\text{target}_i}
$$

> 💡 关键：AIStore 的扩展点是 target 本地磁盘和数据面并行，不是让所有请求穿过单个 metadata server；proxy 主要是入口和控制面。

**Fast tier：cold GET、prefetch 与本地热数据层**

当 AIS 部署在 S3/GCS/Azure Blob/OCI 前面时，它可以作为 fast tier。第一次 GET 如果本地 target 没有对象、checksum 不正确或版本过旧，就执行 cold GET 从远端后端拉取，然后在 AIS 中保留副本；后续 GET 直接由 AIS target 服务。训练开始前也可根据 manifest、range 或对象列表触发 batch prefetch，让后台 xaction 提前填充热数据。这个模式把远端对象存储从每步训练的关键路径挪到后台和 cache miss 路径中：

$$
T_{\text{get}} =
\begin{cases}
T_{\text{local-target}}, & \text{cache hit in AIS} \\
T_{\text{remote-backend}} + T_{\text{fill}}, & \text{cold GET}
\end{cases}
$$

对多 epoch 训练而言，第一轮可能负责填充热层，后续 epoch 主要受本地 target 聚合带宽约束。与普通 HTTP cache 不同，AIS 同时保留对象存储语义、bucket 配置、校验、远端版本感知和训练工具链，因此更像“可持久化的 AI 数据平面”。

**存储侧 ETL：把变换移动到数据所在的 target**

AIStore 的 ETL 是它区别于通用对象存储的关键设计。用户将 transformation 逻辑封装成容器或脚本，由 AIS 在 Kubernetes/target 环境中运行。Inline ETL 在每次 GET 时即时变换并返回结果，适合动态参数、轻量增强或推理前处理；Offline ETL 类似带变换的 bucket copy，把源 bucket 的对象批量处理后写入目标 bucket，适合长期复用的格式转换。这样可以把大量 I/O 密集型预处理限制在存储集群内部，避免“读到客户端、处理、再写回”的双倍网络成本：

$$
Cost_{\text{client-ETL}} \approx R_{\text{src}\to\text{client}} + C_{\text{transform}} + W_{\text{client}\to\text{dst}}
$$

$$
Cost_{\text{AIS-ETL}} \approx R_{\text{target-local}} + C_{\text{target-transform}} + W_{\text{target-local/dst}}
$$

当变换与数据同置且每个 target 并行处理本地对象时，端到端时间由最慢 target 的分片决定，而不是由单客户端或单预处理节点决定。对训练数据增强来说，这意味着可以在存储节点直接执行解码、重采样、格式转换、过滤、压缩格式重写等工作，再把训练真正需要的样本流交给 PyTorch WebDataset 或 TensorFlow Dataset。

**dSort/iShard：不要在存储层盲目切块，而是生成训练友好的 shard**

AIStore 文档强调，AI 数据集常常已经按应用语义预分片；存储系统不应强行把对象切成需要复杂全局元数据重组的小块。相反，AIS 提供 dSort/iShard 这类数据集转换能力：把大量小文件或原始目录转成 tar/zip/tar-lz4 等 shard，并可按 key 或内容排序。其目标不是最大化小文件 IOPS，而是把样本组织成后续训练容易顺序读取、批量读取和随机打散的格式。对于 GPU 训练，这通常比优化单个小文件 lookup 更有效，因为数据加载器需要的是连续的样本批，而不是 POSIX 目录树本身。

**可靠性权衡：checksum 和冗余存在，但 fast path 仍优先性能**

AIS 为对象维护端到端 checksum，支持 N-way mirroring 和 erasure coding，并能在检测损坏时 self-heal。值得注意的是，文档明确指出 EC 的哲学是 recovery，EC 不参与 fast path；AIS 总是保留 HRW 位置上的完整副本，以免每次读取都要做纠删码重构。这个取舍符合训练场景：高吞吐、低尾延迟的热路径优先，冗余和恢复能力作为后台或异常路径保障数据可靠性。

#### 🧪 练习题
```yaml
question: "AIStore 将 ETL container 放在 target 侧运行的主要收益是什么？"
options:
  - "让 proxy 保存所有对象内容，减少 target 数量"
  - "把数据变换靠近本地对象执行，减少客户端往返和远端读写放大"
  - "强制所有数据集都按固定块大小切分"
  - "用 erasure coding 替代所有对象读取"
answer: 1
explain: "Target 侧 ETL 让变换在数据所在节点并行执行，inline 或 offline 结果可直接服务训练或写回 bucket，避免把原始数据搬到客户端再处理。"
```

### Quiver

```yaml
id: quiver
num: 21
name: Quiver
full_name: Quiver知情缓存 (Quiver)
year: '2020'
org: Microsoft
parent: —
paper_url: https://www.usenix.org/conference/fast20/presentation/kumar
project_url: ''
category: cache
motivation: 内容哈希+可替代命中,跨作业重用
```

#### 📝 一句话总结
Quiver 提出面向深度学习训练的知情分布式缓存，利用内容哈希能力、可替代 cache hit、协作 miss 处理和收益感知分配，在多作业/多用户共享数据集时避免小缓存随机访问抖动并提升远端训练数据读取吞吐。

#### 🎯 核心要点
- **内容寻址安全共享**：缓存 key 不是文件名或 offset，而是数据项内容哈希；digest file 中的 hash 也充当访问 capability
- **可替代 cache hit**：训练 epoch 只要求随机且不重复地消费样本，不要求固定顺序；miss 时可返回缓存中尚未使用的替代样本
- **小缓存抗抖动**：当缓存只容纳 10%/20% 数据集时，Quiver 通过扩大候选 lookup 和替代命中避免 LRU 式随机访问 thrashing
- **协作 miss 处理**：多个同数据集作业随机拉取不同 miss，写入共享缓存后彼此复用，减少远端对象存储重复读取
- **收益感知 cache placement**：通过测量 cache hit 与 forced miss 的 mini-batch 时间，优先把容量分配给最受 I/O 影响的作业/数据集
- **与 PyTorch 数据层协同**：扩展 Dataset/DataLoader/Sampler，客户端运行在训练进程地址空间，cache server 以容器形式跑在 GPU VM 本地 SSD 上
- **实验结果**：论文在 48 GPU Azure 集群上显示，Quiver 可将部分 DLT 作业加速最高约 3.8x，并把混合工作负载集群吞吐提升最高约 2.1x

#### 🔬 深入细节
![Quiver 论文 Figure 1：架构图](https://www.usenix.org/system/files/fast20-kumar.pdf#page=5)
*图：Quiver cache server 运行在各 GPU VM 的独立容器中，Quiver client 集成在 DLT 作业内，cache miss 从用户云存储读取，数据集以内容哈希分片到多个 cache server。来源：USENIX FAST '20 官方论文 PDF Figure 1*

![Quiver 官方演示 slides：Architecture of Quiver](https://www.usenix.org/sites/default/files/conference/protected-files/fast20_slides_kumar.pdf#page=27)
*图：官方演示稿中的 Quiver client/server/cache manager 架构。来源：USENIX FAST '20 Open Access slides*

```python
# Quiver Algorithm 1 的简化伪代码：可替代命中 + 协作 miss
g_chunk_index = -1

def get_batch(size, dataset_id, job_id):
    # 1. 为一个 batch 随机多看一些尚未使用的候选样本
    pending = get_pending_indices(size * 10)
    hits = cache.lookup(content_hash(i) for i in pending)

    if len(hits) >= size:
        return pick_and_mark_used(hits, size)

    # 2. 命中不够时，先使用已有命中，再进入当前缓存 chunk
    result = pick_and_mark_used(hits, len(hits))

    global g_chunk_index
    if g_chunk_index < 0:
        g_chunk_index = cache_manager.current_chunk(dataset_id)

    checked = 0
    while checked < total_chunks(dataset_id):
        cache.inform_using_chunk(job_id, dataset_id, g_chunk_index)

        need = size - len(result)
        candidates = get_random_unused_indices(g_chunk_index, need)

        if not candidates:
            cache.inform_done_using_chunk(job_id, dataset_id, g_chunk_index)
        else:
            # 每个作业随机抓取一部分 miss，随后写入共享缓存
            fetched = remote_store.fetch(candidates)
            cache.insert({content_hash(x): x for x in fetched})
            result.extend(pick_and_mark_used(fetched, min(need, len(fetched))))

        if len(result) == size:
            return result

        g_chunk_index = (g_chunk_index + 1) % total_chunks(dataset_id)
        checked += 1

    return result
```

**动机与背景：云上 DLT 的远端对象存储和本地 SSD 都不完美**

Quiver 针对的是云 GPU VM 上的深度学习训练：训练数据可靠地放在 Azure Blob、S3 等远端对象存储中，GPU VM 有本地 SSD，但 VM 可能迁移、抢占或重启，本地 SSD 只是 soft state。多组超参搜索或团队内多作业常常读取同一数据集，每个作业又以不同随机顺序做 50-100 个 epoch。全量缓存很有效，但 ImageNet 全量、OpenImages、YouTube-8M 等数据集可能超过单机 SSD；部分缓存叠加随机访问会让 LRU 反复换入换出，缓存命中率低且远端带宽被多个作业重复消耗。

**内容哈希：同时解决跨用户复用和访问隔离**

Quiver 的缓存 key 是数据内容哈希，例如：

$$
k = H(\text{data item})
$$

每个用户为自己拥有的数据集生成 digest file，条目形如 `<content_hash, file_location>`。如果两个用户各自有 ImageNet 副本，文件路径和云账号不同，但相同样本的内容哈希相同，因此可以复用同一缓存对象。安全性来自 capability 思路：训练作业只有在 digest file 中持有某个 hash，才会向 cache server 请求该内容；由于哈希空间稀疏且抗碰撞，用户不能凭空猜出未授权数据的合法 hash。这样 Quiver 不需要把不同用户的文件命名空间合并，也能在 cache 层复用相同内容。

**可替代命中：训练 I/O 请求不是数据库查询**

Quiver 的关键观察是：一个 epoch 的正确性只要求每个样本被消费一次、每个 mini-batch 是随机样本集合，不要求“第 \(t\) 次请求必须返回原随机排列中的第 \(t\) 个文件”。因此，当 sampler 想拿 \(k\) 个样本时，可以多查 \(m\) 个候选，只要从缓存中拿到 \(k\) 个未使用样本即可。若缓存覆盖数据集比例为 \(c\)，随机看 \(m\) 个候选的期望命中数是：

$$
\mathbb{E}[\text{hits}] = c \cdot m
$$

要得到 batch size \(k\) 的命中，令 \(m \approx k/c\)。例如缓存只有 10% 数据时，查看约 \(10k\) 个候选就期望得到 \(k\) 个可替代命中。普通缓存面对随机 permutation 会不断 miss；Quiver 则把“必须命中特定对象”放宽为“命中任何尚未使用且保持随机性的对象”，因此小缓存也能贡献接近 cache-hit 的训练步。

> 💡 关键：Quiver 改变的是数据加载器和缓存之间的契约，不改变训练样本分布；论文在 ResNet50/ImageNet 和 DeepSpeech2/LibriSpeech 上验证了 chunked/substitutable sampling 不显著影响最终精度。

**协作 miss：让多个作业自然分摊远端读取**

多作业读同一数据集时，传统方案会让每个作业各自从远端对象存储读取相同 miss。Quiver 利用每个作业随机 permutation 不同这一事实：当 cache miss 发生时，各作业随机抓取不同子集并插入共享 cache；随后再次 lookup 时，不只命中自己刚插入的数据，也会命中其他作业刚插入的数据。这个过程不需要中心化调度每个 miss，因为随机化本身就把 miss 分散到不同作业。远端读取次数从“每作业一遍”趋近于“跨作业合计一遍”：

$$
R_{\text{baseline}} \approx J \cdot |D|,\qquad
R_{\text{quiver}} \approx |D| + \epsilon
$$

其中 \(J\) 是同数据集作业数，\(\epsilon\) 是重复抓取和时序错位带来的额外读取。对超参搜索这类多作业工作负载，这直接缓解远端 blob/store 的出口带宽瓶颈。

**容量管理：从“命中率最高”转向“节省 GPU 时间最多”**

Quiver 不把缓存空间平均分给所有数据集，而是测量每个作业对缓存的敏感性。Cache manager 会短暂强制某个作业 miss，得到 miss 下的平均 mini-batch 时间 \(t_i^m\)，再对比 hit 下时间 \(t_i^h\)，定义收益：

$$
b_i = \frac{t_i^m}{t_i^h}
$$

如果作业占用 \(n_i\) 个 GPU，则缓存该作业数据能节省的 GPU 资源可估为：

$$
g_i = b_i \cdot n_i
$$

同一数据集 \(D_k\) 被多个作业访问时，总收益为：

$$
G_{D_k} = \sum_{i \in Jobs(D_k)} g_i
$$

Cache manager 在固定容量 \(S\) 下按 benefit/cost 比贪心选择：全量缓存某数据集、缓存双缓冲 chunk 以启用协作 miss，或完全不缓存。这个策略避免把宝贵 SSD 空间浪费在计算时间远大于 I/O 时间、即使 miss 也不拖慢 GPU 的作业上。

**与传统缓存的区别**

| 维度 | 通用 LRU/文件缓存 | Quiver |
|------|------------------|--------|
| key | 文件名、路径、offset | 内容哈希 |
| 命中语义 | 必须命中特定请求对象 | 可返回随机且未使用的替代对象 |
| 多用户复用 | 受命名空间和权限隔离限制 | digest hash 作为 capability，内容相同即可复用 |
| 小缓存行为 | 随机 epoch 下容易 thrash | 候选扩大 + chunk 双缓冲避免 thrash |
| 多作业 miss | 多个作业重复拉取相同远端对象 | 随机 miss 分摊，插入后互相命中 |
| 目标函数 | 命中率或最近访问 | mini-batch 时间和 GPU 资源收益 |

#### 🧪 练习题
```yaml
question: "Quiver 的可替代 cache hit 为什么能让小缓存仍然有效？"
options:
  - "它要求训练作业固定使用同一个样本顺序"
  - "它把所有样本压缩成同一个文件，消除随机访问"
  - "它利用 mini-batch 只需随机且不重复样本的性质，可用缓存中的未使用样本替代特定 miss"
  - "它完全跳过 cache miss 对应的训练样本并减少 epoch 大小"
answer: 2
explain: "DLT epoch 不要求精确文件顺序；只要样本随机且每轮不重复，Quiver 就能从缓存中返回替代样本，从而避免部分缓存被随机访问模式击穿。"
```

### Baleen

```yaml
id: baleen
num: 22
name: Baleen
full_name: Baleen ML缓存 (Baleen)
year: '2024'
org: CMU
parent: quiver
paper_url: https://www.usenix.org/conference/fast24/presentation/wong
project_url: ''
category: cache
motivation: ML驱动准入与预取决策
```

#### 📝 一句话总结
Baleen 提出基于 `episodes` 缓存驻留模型的 ML 准入与预取协同策略，解决 flash cache 在写入耐久约束下难以同时降低后端硬盘峰值负载和写放大的问题。

#### 🎯 核心要点
- **面向 flash cache 的端到端目标**：不直接优化 IO hit rate 或 byte hit rate，而优化 Disk-head Time，用 HDD seek 与读带宽共同衡量后端负载
- **episodes 驻留模型**：把同一 block 在一次缓存驻留期内可能命中的访问聚合为一个 episode，用于离线打标、收益估计和预取范围学习
- **OPT 近似教师策略**：按 `DT saved / episode size` 为 episode 打分，在 flash write budget 内选择最值得写入的 episode，生成监督学习标签
- **ML admission**：将 miss 上的准入建模为二分类，使用请求元数据和最近 1-6 小时访问计数等特征训练 GBM/LightGBM 模型
- **ML prefetching**：拆成 `ML-Range` 和 `ML-When` 两个子问题，前者预测应预取的 segment 范围，后者判断预取收益是否超过风险阈值
- **系统集成边界清晰**：CacheLib 负责 segment 级准入与缓存，bulk storage/Tectonic 侧在发现 miss 后执行跨 segment 预取
- **评估结果**：在 7 个 Meta Tectonic traces 上，Baleen 默认写入率下比最佳基线平均降低 12% Peak Disk-head Time；Baleen-TCO 通过选择写入率降低约 17% 估算 TCO

#### 🔬 深入细节
![Baleen 架构图](https://chameleoncloud.org/media/filer_public/e5/ee/e5ee9cb2-0f19-4da8-b630-ee5718b11e0b/image6.png)
*图：Baleen 的离线训练与在线部署架构。训练 trace 被转换为 episodes 后用于训练 admission policy 与 prefetcher；部署时 admission policy 在 CacheLib 中决定是否写入 flash，prefetching 在 bulk storage/Tectonic 请求路径中扩展后端读取范围。来源：Chameleon 官方 Baleen 博客 Figure 3。*

![Baleen episodes 模型](https://chameleoncloud.org/media/filer_public/6b/27/6b2722fc-dede-4c0d-8c68-0590f0eebdb7/image3.png)
*图：episodes 通过访问间隔和平均 eviction age 把访问流切分为缓存驻留期。来源：Chameleon 官方 Baleen 博客 Figure 2。*

```python
# Baleen 的离线训练与在线决策伪代码
def build_episodes(trace, eviction_age):
    episodes = []
    for block_id, accesses in group_by_block(trace):
        cur = []
        for access in sorted(accesses, key=lambda x: x.time):
            if cur and access.time - cur[-1].time > eviction_age:
                episodes.append(cur)
                cur = []
            cur.append(access)
        if cur:
            episodes.append(cur)
    return episodes

def train_baleen(trace, target_flash_write_rate):
    assumed_ea = hours(2)
    while True:
        episodes = build_episodes(trace.train_day, assumed_ea)
        for ep in episodes:
            ep.score = disk_head_time_saved(ep) / segment_span_size(ep)

        opt_admitted = choose_top_episodes_under_write_budget(
            episodes, target_flash_write_rate
        )
        admission_model = train_gbm_classifier(
            features=first_k_access_features(episodes, k=6),
            labels=[ep in opt_admitted for ep in episodes],
        )
        range_model = train_regressors_to_predict_opt_range(opt_admitted)
        when_model = train_prefetch_benefit_classifier(opt_admitted, epsilon_ms=5)

        stats = simulate_cachelib(trace.train_day, admission_model, range_model, when_model)
        if close(stats.avg_eviction_age, assumed_ea):
            return admission_model, range_model, when_model, stats.threshold
        assumed_ea = stats.avg_eviction_age

def serve_request(req, cache, models):
    hit_segments, miss_segments = cache.lookup(req.block_id, req.segment_range)
    if not miss_segments:
        return cache.read(req)

    if models.admission.predict(req.features) > models.threshold:
        cache.admit(req.block_id, miss_segments)

    if models.when.predict(req.features) and any(hit_segments):
        start, end = models.range.predict(req.features)
        extra = segments_between(start, end) - hit_segments - miss_segments
        backend_read(req.block_id, miss_segments | extra)
        cache.admit(req.block_id, extra)
    else:
        backend_read(req.block_id, miss_segments)
```

**动机与背景：flash cache 的核心矛盾不是容量，而是写入预算。** 在 bulk storage 中，HDD 提供低成本大容量，但随机 IO 能力有限；flash cache 能吸收热点访问，却受 SSD endurance 限制。若每次 miss 都写入 flash，论文中的 traces 最高可达到几十个 drive-writes-per-day，远超常见 3 DWPD 假设，导致 SSD 寿命被压缩到数月级。因此准入策略必须回答：一次 flash write 是否能在未来节省足够多的 HDD disk-head time。Baleen 的关键取舍是把 flash write 当成稀缺预算，而不是把 cache hit 当成唯一目标。

**Disk-head Time 是 Baleen 的系统目标函数。** 对一次后端 IO，Baleen 用 seek 固定成本和按字节读取成本组合衡量 HDD 资源消耗：

$$
DT_i = t_{\mathrm{seek}} + n_i \cdot t_{\mathrm{read}}
$$

对一个时间窗口，后端利用率可写成：

$$
Util_{DT} =
\frac{\sum_i DT_i}{DT_{\mathrm{provisioned}}}
=
\frac{Fetches_{IO}\cdot t_{\mathrm{seek}} + Fetches_{Bytes}\cdot t_{\mathrm{read}}}{DT_{\mathrm{provisioned}}}
$$

这比 IO miss rate 更稳健，因为两个访问序列可能有相同 miss 数，却读取完全不同的字节量；也比 byte miss rate 更完整，因为小随机 IO 的 seek 成本会主导 HDD 负载。Baleen 训练模型时围绕 DT saved 构造标签，避免出现“命中率提高但后端峰值负载变差”的错配。

**episodes 把难以训练的在线缓存问题转成可监督学习的问题。** 传统访问流中的每次决策相互影响：一次准入会改变未来 hit/miss、eviction age 和写入预算。Baleen 用 LRU 的平均 eviction age 近似缓存驻留期，把同一 block 中相邻访问间隔不超过 eviction age 的访问归为一个 episode。episode 的收益是若在开头准入可节省的 DT，成本是需要写入的 segment 范围大小。这样，准入决策可以近似看成对 episode 的选择：

$$
Score(E)=\frac{DT_{\mathrm{saved}}(E)}{Size(E)}
$$

OPT 先离线生成 episodes，再按上述分数排序，并在 flash write budget 内选择前若干个 episode。这个 OPT 不是线上可实现的真最优，因为它看到了未来 trace，但它给 Baleen 生成了可解释的监督标签：某个 miss 所属 episode 是否值得准入。

**ML admission 的设计重点是边界样本，而不是热门样本。** 论文将准入建模为二分类：miss 的特征输入 GBM，输出概率超过阈值则写入 flash。特征包括请求来源元数据（namespace、user、temporary/permanent 标签）以及最近 1-6 小时 block/segment 访问计数。训练时只取每个 episode 的前 6 次访问，避免大热门 episode 产生过多训练样本并掩盖“只有少量未来命中但总体数量很多”的边界 episode。阈值不是固定超参，而是通过在线 simulator 反复调整，使最终模拟的 flash write rate 达到目标预算。

**预取被拆成 what 和 when 两个模型。** 当某次 miss 已经必须访问 HDD 时，系统可以扩大读取范围，顺便把未来可能访问的 segment 写入 flash。问题在于预取错误同时浪费 HDD DT、flash write 和 cache space。Baleen 先用 `OPT-Range` 定义一个 episode 内覆盖所有未来访问的最小 segment 范围，再训练两个回归器预测 `ML-Range` 的 start/end；随后用 `ML-When` 判断预取是否值得做。论文中的收益判定可以概括为：

$$
PFBenefit^{OPT}_{eps} = DT^{NoPrefetch}_{eps} - DT^{OPT\text{-}Range}_{eps}
$$

$$
PFBenefit^{ML}_{eps} =
\begin{cases}
0, & \text{if underfetch}\\
PFBenefit^{OPT}_{eps} - OF, & \text{otherwise}
\end{cases}
$$

$$
MLWhen(eps)=PFBenefit^{ML}_{eps}>\epsilon
$$

其中 `underfetch` 表示预测范围未覆盖 OPT-Range，`OF` 是额外 segment 带来的 overfetch DT 成本，\(\epsilon\) 是保守阈值，用来抵消未知的 cache space 与写入机会成本。

**与传统策略的区别在于协同和可解释性。** CoinFlip 只用概率控制写入率，RejectX 只按历史出现次数过滤 one-hit-wonder，CacheLib-ML 类方法容易把模型训练目标放在单次访问命中或分类准确率上。Baleen 的不同点是：先用 episodes 把一次写入的完整生命周期显式化，再让 admission 与 prefetch 共享同一收益模型，并用 DT/TCO 而不是中间命中指标做优化目标。因此它不是简单“给缓存加一个模型”，而是把缓存控制面重写为一个可离线验证、可在线模拟、可在生产 CacheLib 路径中部署的 ML-for-systems 流程。

#### 🧪 练习题
```yaml
question: "Baleen 为什么引入 episodes，而不是直接用每次访问的 hit/miss 训练准入模型？"
options:
  - "episodes 可以把一次写入在整个缓存驻留期内的收益和成本绑定起来，生成更接近准入决策的监督标签"
  - "episodes 主要用于压缩图片数据，减少训练 trace 的存储空间"
  - "episodes 让 CacheLib 不再需要 eviction policy"
  - "episodes 只用于替代 GBM 模型中的特征归一化"
answer: 0
explain: "flash 准入的成本在写入时一次性发生，收益却分布在后续多个访问上；episodes 把这些访问聚合为一次驻留期，使 OPT 打分和 ML 标签更贴近真实准入决策。"
```

### cedar

```yaml
id: cedar
num: 23
name: cedar
full_name: cedar统一数据管道 (cedar)
year: '2024'
org: 学术研究
parent: dali
paper_url: https://arxiv.org/abs/2401.08895
project_url: ''
category: cache
motivation: 统一ML输入管道优化框架
```

#### 📝 一句话总结
cedar 提出统一的 ML 输入数据管道编程与优化框架，用 Feature/Pipe 抽象描述任意训练数据流，并由优化器自动组合 offloading、caching、prefetching、fusion、reordering 和动态缩放来提升训练输入吞吐。

#### 🎯 核心要点
- **统一编程模型**：用 `Feature` 表示逻辑数据流，用无状态 `Pipe` 表示 map/filter/batch/shuffle/UDF 等操作，支持 PyTorch、TensorFlow 和任意 Python 库
- **Source 与 DataSet 解耦**：Feature 不绑定物理数据源，Source 封装原始 dataset，DataSet 对训练框架暴露可迭代接口
- **语义约束显式化**：用户可标记 operator dependency、fixed operator 和 random operator，使 optimizer 能安全地重排和缓存
- **Optimization interface**：通过 `register`、`fuse`、`update_dfg`、`assign` 等接口插入 cache/prefetch/fused Pipe 并改写数据流图
- **Execution interface**：用 Driver、Variant、shard、mutate、scale 将 Pipe 映射到本地 Python 进程、分布式 worker 或框架专用 runtime
- **查询优化器式搜索**：按 reordering、caching、fusion/offloading、prefetching/sharding 的 pass 逐步枚举、打分和剪枝
- **动态资源缩放**：Client 运行时根据 prefetch buffer 和 per-Pipe metrics 找瓶颈，扩缩 offloaded Variant 的并行度以匹配训练吞吐需求
- **实验收益**：论文在 8 条多领域 pipeline 上相对 tf.data、tf.data service、Ray Data、PyTorch DataLoader 获得最高 1.87x 到 10.65x 性能提升

#### 🔬 深入细节
![cedar 框架总览](https://arxiv.org/html/2401.08895v2/x3.png)
*图：cedar block diagram，展示用户定义 Feature/Source/Backend 后，cedar DataSet、Optimizer、Client、Driver 与 Metadata Store 如何协同优化并执行输入管道。来源：arXiv HTML Figure 7。*

![cedar Feature API](https://arxiv.org/html/2401.08895v2/extracted/5367901/figures/img/api.png)
*图：cedar Feature API 示例，展示 Pipe 组合、dependency 标注与 random operator 标注。来源：arXiv HTML Figure 8。*

```python
# cedar 优化与执行主流程伪代码
def build_dataset(source, feature, backends, framework):
    graph = parse_feature_to_logical_dfg(feature, source)
    stats = profile_if_needed(graph, backends)

    # 1. 静态优化：像数据库查询优化器一样逐 pass 搜索
    plans = [graph]
    plans = choose_best_reordering(plans, stats, respect_dependencies=True)
    plans = choose_best_cache_location(plans, stats, forbid_after_random=True)
    plans = choose_best_fusion_and_offloading(plans, backends, stats)
    plan = insert_prefetch_and_choose_shards(best(plans), stats)

    return CedarDataSet(plan, backends, framework)

def train_loop(dataset, model):
    client = dataset.create_client()
    drivers = client.shard(dataset.plan.num_shards)
    for pipe, variant in dataset.plan.assignments:
        pipe.mutate(variant)
        pipe.scale(dataset.plan.initial_parallelism(pipe))

    for batch in client:
        model.step(batch)
        client.trace_runtime_stats()
        client.scaler.maybe_adjust()

def scaler_step(client):
    if client.output_prefetch_buffer_is_full():
        pipe = random_non_base_pipe()
        pipe.scale_down_or_mutate_to_base()
        return

    bottleneck = client.find_pipe_with_smallest_prefetch_buffer()
    if bottleneck is None:
        bottleneck = client.find_base_pipe_with_largest_profiled_latency()
    bottleneck.mutate_to_best_variant_if_needed()
    bottleneck.scale_up_until_throughput_plateaus()
```

**动机与背景：ML 输入管道的瓶颈来自“优化碎片化”。** 现代训练作业不是简单读取文件后喂给 GPU，而是持续执行 decode、parse、shuffle、filter、augmentation、tokenize、batch 等在线转换。传统 Spark/Beam 适合离线批处理，tf.data、PyTorch DataLoader、Ray Data 等各自提供部分优化，却通常绑定特定框架、特定 backend 或少量优化策略。更难的是，Python UDF 与随机增强具有语义约束：例如随机 crop 后缓存会破坏每个 epoch 的随机性，把 size-reducing crop 提前可能降低计算量，但只有在语义允许时才能重排。cedar 的目标是把这些优化机会统一放入一个可扩展 optimizer，而不是让用户手工拼凑。

**核心抽象是逻辑 Feature 与物理执行分离。** `Feature` 是由 `Pipe` 组成的逻辑 DAG，每个 Pipe 是无状态转换，可表示 one-to-one 的 map、many-to-one 的 batch、one-to-many 的 file reader，也可以 zip/unzip 形成非线性图。`Source` 封装物理数据集并发出 raw samples；训练代码只迭代 `DataSet`，无需知道某个 Pipe 是在本地 Python 进程、Ray worker、Kubernetes worker 还是框架 runtime 中执行。这个分离使 optimizer 能在同一个逻辑 pipeline 上尝试不同 physical plan。

**语义提示让优化器能安全改写黑盒 UDF。** cedar 不试图完全静态理解 Python 函数，而是要求用户提供轻量 hint。若 Pipe B 必须依赖 Pipe A，则通过 tag 与 `depends_on` 表达；若某个 Pipe 位置不能动，则 `fix()`；若某个 Pipe 是随机增强，则标记 random，optimizer 不会在其下游插入缓存。形式上，优化器搜索的计划必须满足用户约束：

$$
G^*=\arg\min_{G\in\mathcal{G}}\sum_{p\in G} cost(p),
\quad \mathrm{s.t.}\;G\;\mathrm{satisfies\;user\;constraints}
$$

这条约束是 cedar 与普通“自动调参”的关键区别：它不是只追吞吐，而是在不破坏训练数据语义的前提下改写数据流。

**静态优化 pass 像数据库查询优化器。** cedar 先 profile baseline plan，收集每个 Pipe 的平均 latency、输入/输出 sample size，以及某个 Pipe offload 到某个 Variant 后的 DataSet 吞吐。基础 cost 用 Pipe latency 在端到端 latency 中的占比表示：

$$
cost_{base}(p)=
\frac{lat_{base}(p)}{\sum_{i\in G_{base}}lat_{base}(i)}
\cdot \frac{1}{tput_{base}}
$$

reordering pass 根据每个 Pipe 的 size scaling factor \(S(p)=size_{out}(p)/size_{in}(p)\) 估计换序后的输入大小，并偏好把 crop/filter 这类降采样或缩小样本的操作前移：

$$
cost_R(p)=
\frac{size_{in,R}(p)}{size_{in,base}(p)}\cdot cost_{base}(p)
$$

caching pass 枚举允许的缓存位置，将 cache 之前的 exclusive ancestors 计算成本置零，同时加入读缓存的 IO 成本。fusion/offloading pass 枚举 Pipe 到 Variant 的分配并融合相邻可融合 Pipe，offloading 收益用 Amdahl's Law 从整体吞吐反推 Pipe 局部收益。最后 prefetching/sharding pass 在 offloaded Variant 后和输出端插入 prefetch Pipe，并选择 Driver 数量。

**动态缩放负责“刚好够用”，避免为了吞吐长期过度占资源。** 静态计划给出高吞吐结构，但训练实际需求会随 GPU、batch size、数据增强和后台资源波动。每个 Client 本地运行 Scaler：若输出 prefetch buffer 长期高于阈值，说明输入管道不是瓶颈，就随机挑一个非 base Variant 降并行度，必要时 mutate 回 base Variant；若 buffer 不足，则先找 offloaded Pipe 中 buffer 最小的瓶颈 Pipe 扩并行度，或者在所有已回退到 base 的候选中挑 profile latency 最大者重新 offload。论文选择这种 hill-climbing，是因为 Pipe 并行度对整体 throughput 通常呈凹形收益，扩到 plateau 后再加资源收益很低。

**容错与 exactly-once 通过 sample UUID 实现。** Source 给每个训练样本打 UUID，Client 追踪已返回样本；聚合 Pipe 会传播其输入 ID 集，filter 会传播空 DataSample。故障发生时，由于 Pipe 无状态，Client 可要求 Source 重新发出指定 sample ID 并重算下游结果；若重复 ID 到达，Client 不返回重复样本。对训练而言，这避免了故障恢复后样本重复或丢失造成收敛偏差。

**与传统输入系统相比，cedar 的定位更接近“ML 数据管道查询优化器”。** PyTorch DataLoader 主要解决本地多进程加载，tf.data/service 偏 TensorFlow 图和服务化执行，Ray Data 提供分布式数据处理但不系统组合随机性约束、缓存位置、operator reordering 与 framework-specific Variant。cedar 将这些作为同一搜索空间中的计划选择问题，并通过接口把新增 backend 或新增 optimization pass 接入 optimizer，从而解决“每个系统只会一种优化”的碎片化问题。

#### 🧪 练习题
```yaml
question: "cedar 为什么需要用户显式标注 random operator 和 dependency？"
options:
  - "为了让优化器在缓存和重排时不破坏训练数据语义，同时仍能搜索更多合法计划"
  - "为了把所有 Python UDF 编译成 SQL 查询"
  - "为了强制所有 Pipe 都只能在本地单进程执行"
  - "为了避免 DataSet 支持 PyTorch"
answer: 0
explain: "ML 输入管道含有黑盒 UDF 和随机增强，优化器无法可靠自动推断语义；轻量标注让 cedar 可以安全地排除非法缓存和重排，同时保留自动优化空间。"
```

### Modyn

```yaml
id: modyn
num: 24
name: Modyn
full_name: Modyn数据流水线平台 (Modyn)
year: '2025'
org: 学术研究
parent: cedar
paper_url: https://arxiv.org/abs/2312.06254
project_url: ''
category: cache
motivation: 动态数据集,端到端训练优化
```

#### 📝 一句话总结
Modyn 提出面向持续增长数据集的端到端 ML pipeline orchestrator，用触发策略和数据选择策略声明“何时训练、训练哪些样本”，并通过 sample-level 数据管理、预取与并行读取保持接近顺序读取的训练吞吐。

#### 🎯 核心要点
- **动态数据集 pipeline 抽象**：把持续到来的样本流、触发训练、数据选择、训练配置、模型存储和评估统一为可声明 pipeline
- **触发策略**：支持按样本数量、时间、性能退化和数据漂移触发 retraining，避免固定周期全量重训
- **数据选择策略**：把 presampling 与 downsampling 分离，支持 uniform/class-balanced/trigger-balanced、RS2、loss、DLIS、uncertainty、CRAIG、GradMatch 等策略
- **Composite model 评价**：把一个 pipeline 生命周期内训练出的多个模型映射到统一 evaluation intervals，公平比较不同触发/选择策略
- **模块化分布式架构**：Supervisor、Selector、Storage、Trainer Server、Model Storage、Evaluator 通过 gRPC/FTP 协同
- **高吞吐 sample-level retrieval**：OnlineDataset、TriggerSampleStorage、C++ Storage、partition buffer、prefetch threads 和 gRPC streaming 共同减少随机样本读取 stalls
- **模型快照管理**：Model Storage 支持 full model 与 incremental delta 策略，类似视频编码中的 I-frame/P-frame
- **实验定位**：论文展示 Modyn 在推荐系统和视觉 workloads 中可用 sample-level 数据选择达到接近本地顺序读取的吞吐，并支持策略准确率/成本分析

#### 🔬 深入细节
![Modyn 系统架构](https://ar5iv.labs.arxiv.org/html/2312.06254/assets/img/modyn_sys.svg)
*图：Modyn 系统架构。数据源进入 Storage，Supervisor 根据 trigger policy 编排 pipeline，Selector 生成 trigger training set，Trainer 拉取样本并训练，Model Storage 保存模型，Evaluator 评估模型序列。来源：ar5iv 渲染的 arXiv 论文 Figure 3。*

![Modyn OnlineDataset 架构](https://ar5iv.labs.arxiv.org/html/2312.06254/assets/img/dataloading.svg)
*图：OnlineDataset 通过 worker、partition buffer、prefetching threads、Selector 与 Storage gRPC 请求，把 sample-level key list 转换为训练 batch。来源：ar5iv 渲染的 arXiv 论文 Figure 6。*

```python
# Modyn 持续训练 pipeline 伪代码
class ModynPipelineExecutor:
    def run(self, stream):
        for batch in stream:  # S_t = (s_1, ..., s_n)
            sample_keys = storage.ingest(batch)
            supervisor.notify_new_samples(sample_keys)

            trigger_points = trigger_policy.decide(batch, pipeline_state)
            for trigger in trigger_points:
                # 1. Selector 生成第 r 次 trigger 的训练集合
                window = selector.data_window(trigger, policy.window)
                presampled = selector.presample(window)
                tss_path = trigger_sample_storage.write_partitions(presampled)

                # 2. Trainer 使用 OnlineDataset 按 key 拉取样本
                dataset = OnlineDataset(
                    trigger_sample_storage=tss_path,
                    selector=selector,
                    storage=storage,
                    partition_buffer_size=B,
                    prefetch_threads=P,
                )
                model = model_storage.load_previous_if_needed()
                trained_model = trainer.train(model, dataset, downsampler=policy.downsampler)

                # 3. 保存并评估
                model_id = model_storage.store(trained_model, incremental=True)
                evaluator.evaluate(model_id, interval_generation_fn)

class OnlineDatasetWorker:
    def prefetch_loop(self):
        while has_more_partitions():
            keys = selector.get_partition_keys(worker_id, partition_id)
            # Storage 将任意 key set 按文件分组并并行读 payload
            for payload in storage.stream_payloads(keys):
                partition_buffer.put(payload)

    def __iter__(self):
        while training:
            payload = partition_buffer.get()
            tensor = bytes_parser(payload.bytes)
            tensor = apply_transformations(tensor)
            yield tensor, payload.label, payload.weight
```

**动机与背景：真实 ML 数据不是静态 benchmark，而是不断增长的时间序列。** 生产模型的数据来自点击流、传感器、日志或用户内容，分布会随时间漂移；模型需要吸收新数据，但每来一批数据就从头全量重训成本不可接受。训练成本可粗略写成：

$$
Cost(P)\propto \sum_{r=1}^{R_P} |D_r|\cdot C_{\mathrm{train}}(m_r)
$$

其中 \(R_P\) 是 pipeline 生命周期内触发训练次数，\(D_r\) 是第 \(r\) 次触发选择出的训练集。Modyn 的核心问题因此被拆成两维：triggering policy 决定何时训练，data selection policy 决定训练哪些样本。相比只记录实验的 MLFlow/W&B 或只支持固定工作流的部分平台，Modyn 直接把这两个策略作为系统一等公民。

**Modyn 对动态 pipeline 做形式化建模。** 数据流在离散时间进入，批次为 \(S_t=(s_1,\ldots,s_{n_t})\)。触发策略可以表示为：

$$
\pi:\mathcal{P}(S)\rightarrow \bigcup_{n=0}^{\infty}\mathcal{P}([1,\ldots,n])
$$

它对每个到来的 batch 输出哪些样本位置触发新训练。若样本 \(s_k\in S_t\) 导致第 \(r\) 次 trigger，系统已观察到的数据为：

$$
D^{tot}_r=\{s_i\in S_t\mid i\le k\}\cup\bigcup_{t'<t} set(S_{t'})
$$

数据选择策略则是一个赋权函数：

$$
\xi_r:D^{tot}_r\rightarrow \mathbb{R}^{|D^{tot}_r|}
$$

权重大于 0 的样本进入第 \(r\) 次 trigger training set \(D_r\)，权重还可在反向传播时乘到梯度上。这套定义让“全量重训”“只用新增数据 fine-tune”“混合旧数据防遗忘”“只选高 loss 样本”等策略都能落在同一抽象下。

**Composite model 解决不同 retraining 策略的公平评价。** 一个 pipeline 会训练出模型序列 \(M_P=(m_1,\ldots,m_R)\)，不同触发策略得到的模型时间戳不同，不能只看最后一个模型或用各自训练区间评价。Modyn 先定义统一 evaluation intervals \(\varphi\)，再定义 composite model 映射：

$$
\mu_P:\varphi\rightarrow M_P
$$

例如 currently-active composite model 会把每个评价窗口映射到该窗口 anchor 之前最近完成训练的模型：

$$
\mu^{active}_P(\varphi_i)=
\arg\max_{m_x\in M_P}\{t^e_x\mid t^e_x\le \tau^a_i\}
$$

这样，不同 pipeline 可以在同一时间窗口序列上比较 accuracy、ROC-AUC、训练成本和系统吞吐，避免“训练越频繁就评价窗口越短”带来的偏差。

**系统架构按职责拆分，热路径用 C++ 保吞吐。** Supervisor 负责接收 CLI 提交的 pipeline，并以 PipelineExecutor 状态机执行触发逻辑；Selector 负责 presampling 状态和 trigger training set 生成；Trainer Server 启动通用训练循环，支持 PyTorch、mixed precision、learning-rate scheduler 和在线 featurization；Storage 管理样本元数据与 payload 读取；Model Storage 保存 full model 或 incremental delta；Evaluator 对每个模型执行滑动/滚动窗口评估。论文实现中，数据抓取热路径放在 C++，策略接口保留 Python，兼顾研究扩展性和运行效率。

**Selector 把 presampling 与 downsampling 分层。** Presampling 在训练前选择候选样本，可在线或离线执行；例如 class-balanced、uniform、trigger-balanced、混合旧数据等策略可在 Selector 中维护状态。Downsampling 需要 forward pass 信息，因此发生在 Trainer 中，例如 loss sampling、DLIS、uncertainty、CRAIG、GradMatch。Modyn 还区分 sample-then-batch 与 batch-then-sample 模式：前者先为所有样本建立选择状态再训练，后者对 batch 做 forward 后挑子集并累积成反向传播 batch。这个设计让研究者只实现策略逻辑，不必重写存储、调度和训练循环。

**Fast Data Retrieval 是 Modyn 的系统核心。** 数据选择输出的是任意 sample keys，而不是连续文件范围；若逐 key 同步读取，GPU 会被随机 IO 和网络往返拖空。Modyn 先用 TriggerSampleStorage 将固定 trigger training set 按 partition 写入本地二进制文件，避免每个 epoch 都查数据库。OnlineDataset 的每个 PyTorch worker 拿到各 partition 的份额后，启动多个 prefetching threads：先向 Selector/TSS 拉 key list，再向 Storage 以 gRPC streaming 拉 payload。worker 主线程只要 buffer 中已有 payload，就立即执行 bytes parser 和 transformations 并产出 tensor，不等待整个 partition 下载完成。

**Storage 把任意 key set 重排为高效文件读取。** Storage 用 Postgres 追踪 sample ID、label、source file 和文件内位置，底层 FileSystemWrapper 抽象本地文件或未来的 S3，FileWrapper 抽象 CSV、定长 binary、单样本图片等格式。收到一组 keys 后，Storage 会把 key list 切成多个部分并行处理；每个线程查询元数据后按 source file 分组，批量实例化 FileWrapper，从文件中提取样本并填入 send buffer，buffer 满或文件读完就流式返回给 worker。对推荐系统常见的定长 binary 数据，BinaryFileWrapper 使用避免整文件加载的 `std::ifstream` 与端序优化解析，减少内存复制。

**与 cedar 的关系是层级不同。** cedar 关注单次训练作业内部的输入管道优化：operator 如何重排、缓存、offload、prefetch。Modyn 关注动态数据集上的 pipeline 生命周期：何时触发训练、选择哪些历史样本、如何调度训练、如何保存模型和评价模型序列。Modyn 的 OnlineDataset 同样使用预取和并行读取，但服务于 sample-level data selection；cedar 的 optimizer 则服务于通用数据变换图的自动物理计划选择。

#### 🧪 练习题
```yaml
question: "Modyn 中 TriggerSampleStorage (TSS) 的主要作用是什么？"
options:
  - "把每次 trigger 固定下来的训练样本 key/weight 按 partition 持久化，供 Trainer worker 快速并行读取"
  - "替代 Model Storage 保存完整 PyTorch 模型参数"
  - "在 GPU 显存中缓存所有样本 payload"
  - "根据 validation accuracy 自动选择学习率"
answer: 0
explain: "数据选择产生的是任意 sample key 集合；TSS 将其按固定 partition 写入高效二进制格式，OnlineDataset worker 可并行取 key 并预取 payload，减少训练期数据 stalls。"
```

### Learned Index

```yaml
id: learned_index
num: 25
name: Learned Index
full_name: 学习索引 (Learned Index)
year: '2018'
org: Google
parent: —
paper_url: https://dl.acm.org/doi/10.1145/3183713.3196909
project_url: ''
category: emerging
motivation: ML替代B+树,查询加速
```

#### 📝 一句话总结
Learned Index 将范围索引、哈希索引和存在性索引重新表述为“学习数据分布的模型”，用小型神经网络/线性模型预测键的位置或成员关系，并用误差边界与局部搜索保留索引语义。

#### 🎯 核心要点
- 核心观察：B-Tree 可视为从 key 到有序数组位置的回归模型，Bloom Filter 可视为二分类模型
- 范围索引建模为 CDF 估计：模型预测 \(P(Y \le k)\)，再映射为数组位置
- 提出 Recursive Model Index (RMI)：多阶段模型按预测结果路由到下一阶段专家模型
- LIF 框架将训练好的 TensorFlow 模型抽取权重并生成轻量 C++ 推理代码，避免在线使用 TensorFlow
- Hybrid Index 在误差过大时用 B-Tree 替换末层模型，给最坏情况查询提供传统索引兜底
- 搜索阶段存储每个末层模型的 min/max error，用 model-biased binary search 或 quaternary search 修正预测误差
- 论文在只读内存分析场景下展示学习索引可比 cache-optimized B-Tree 更快且占用更少内存，但写密集、分布漂移和磁盘分页仍是开放问题

#### 🔬 深入细节
![B-Tree 与 Learned Index 对比](https://ar5iv.labs.arxiv.org/html/1712.01208/assets/x1.png)
*图：论文 Figure 1 展示 B-Tree 与 learned index 都把 key 映射到数据位置；学习索引用模型预测位置，再在误差窗口内查找。来源：arXiv/ar5iv 论文图。*

![RMI 分阶段专家模型](https://ar5iv.labs.arxiv.org/html/1712.01208/assets/x3.png)
*图：论文 Figure 3 展示 Recursive Model Index，上一阶段模型的输出直接选择下一阶段模型，末阶段输出最终位置。来源：arXiv/ar5iv 论文图。*

```python
# Recursive Model Index 查询伪代码
def lookup(key, rmi, sorted_keys):
    model_id = 0
    pred = 0
    for stage in range(len(rmi.stages)):
        model = rmi.stages[stage][model_id]
        pred = model.predict(key)
        if stage + 1 < len(rmi.stages):
            next_width = len(rmi.stages[stage + 1])
            model_id = clamp(int(pred / len(sorted_keys) * next_width), 0, next_width - 1)

    leaf = rmi.stages[-1][model_id]
    lo = max(0, int(pred - leaf.max_under_error))
    hi = min(len(sorted_keys) - 1, int(pred + leaf.max_over_error))
    return lower_bound(sorted_keys, key, lo, hi)
```

学习索引的第一步是把“索引结构”变成“预测问题”。对一个按 key 排序的数组，范围索引要找的是第一个大于等于查询键 \(k\) 的位置。论文指出这等价于学习经验 CDF：

$$
\hat{p}(k) = N \cdot \hat{F}(k)
$$

其中 \(N\) 是记录数，\(\hat{F}(k)\) 是模型估计的“键小于等于 \(k\)”的比例。B-Tree 实际上也在近似这个 CDF，只是它用分支节点分段缩小范围；学习索引用线性模型、神经网络或混合模型直接拟合分布形状。如果数据分布接近线性，位置预测甚至可以退化成一次乘加。

RMI 解决的是单个模型“最后一公里”精度不足的问题。一个模型很容易把 1 亿条记录缩小到几千条范围，但要精确到几十条可能需要更复杂的网络，反而失去速度优势。RMI 用顶层模型学习全局 CDF，再把预测值映射到下一层模型编号，让下层专家只拟合局部子分布：

$$
j_{i+1} = \left\lfloor \frac{M_{i,j_i}(k)}{N} \cdot m_{i+1} \right\rfloor
$$

其中 \(M_{i,j_i}\) 是第 \(i\) 层第 \(j_i\) 个模型，\(m_{i+1}\) 是下一层模型数量。它像树一样逐步缩小数据区域，但阶段之间没有传统树查找中的比较循环，模型输出直接成为下一层路由。

学习索引不能只追求平均误差，因为数据库索引必须能找到正确记录。论文的做法是在训练后对每个末层模型跑一遍训练键，记录最大低估和高估误差：

$$
window(k) = [\hat{p}(k) - \epsilon_{under},\ \hat{p}(k) + \epsilon_{over}]
$$

查询时只在这个窗口里做 `lower_bound`、biased binary search 或 quaternary search。这样模型负责把搜索空间从全表压缩到一个很小的局部窗口，传统搜索负责恢复精确语义。若某个局部分布太难学习，Hybrid Index 会把该末层模型替换为 B-Tree，使最坏情况退化为传统索引而不是错误返回。

与 B+Tree 的关键差别在于成本结构。B+Tree 查询主要是分支判断和随机访存，缓存未命中会带来几十到上百个 cycle；学习索引主要是小模型推理和紧邻位置的局部搜索，适合 SIMD、批量推理和未来 ML 加速器。代价是它更依赖数据分布稳定性：只读或 append-heavy 的时间戳、地理位置等索引很适合；频繁中间插入、强分布漂移、多页磁盘布局则需要 delta index、重训练、分页感知模型或传统索引兜底。

> 💡 关键：Learned Index 不是“用神经网络硬替 B+Tree”，而是把可学习的分布形状交给模型，把必须保证正确性的部分交给误差边界、局部搜索和混合索引。

#### 🧪 练习题
```yaml
question: "RMI 在 Learned Index 中主要解决什么问题？"
options:
  - "让每次查询都必须遍历所有模型以提高准确率"
  - "用多阶段专家模型先拟合全局分布再拟合局部子分布，降低最后一公里误差"
  - "把所有键随机打散以适配哈希表"
  - "完全取消误差边界和局部搜索"
answer: 1
explain: "RMI 让上层模型负责粗粒度定位，下层模型只学习局部区域，因此能以较小模型成本获得更窄的搜索窗口。"
```

### NVMe-oF

```yaml
id: nvmeof
num: 26
name: NVMe-oF
full_name: NVMe over Fabrics (NVMe-oF)
year: '2016'
org: NVM Express
parent: —
paper_url: https://nvmexpress.org/developers/nvme-of-specification/
project_url: ''
category: emerging
motivation: RDMA/TCP远程NVMe,DPU卸载
```

#### 📝 一句话总结
NVMe-oF 将本地 PCIe NVMe 的队列、命令集和控制器模型扩展到 RDMA、Fibre Channel、TCP 等网络 fabric 上，让主机以接近本地 NVMe 的语义访问远端 SSD 或存储系统。

#### 🎯 核心要点
- 2016 年 NVMe-oF 1.0 首次发布，将 NVMe 命令传输扩展到 Ethernet、Fibre Channel、InfiniBand 和 RDMA 等 fabric
- 保留 NVMe Base 的 Admin/I/O Command Sets、Submission Queue/Completion Queue 和 namespace/controller 抽象
- 引入 Fabrics Command Set：Connect、Disconnect、Property Get、Property Set、Authentication 等用于远程连接和控制器属性访问
- 用 capsules 承载命令和响应，用 SGL 描述数据缓冲区，替代 PCIe 本地 PRP/MMIO doorbell 依赖
- 支持三类传输模型：memory、message、message/memory；PCIe 属于 memory，FC/TCP 属于 message，RDMA 属于 message/memory
- Discovery Controller/Discovery Log 让主机发现可访问的 NVM subsystem、NQN、transport address 和多路径
- 每个 I/O Submission Queue 与 Completion Queue 一对一映射，最多支持 \(2^{16}-1\) 条 I/O 队列和每队列 \(2^{16}-1\) 个 outstanding commands
- 现代实现常把 target datapath 卸载到 SmartNIC/DPU，通过 RDMA zero-copy、TCP offload 或 SPDK poll-mode 降低 CPU 开销

#### 🔬 深入细节
![NVMe transport models](https://infohub.delltechnologies.com/static/media/9198938f-8c47-5a0e-82d9-6db6a62cd3f7/DAM-d11da6ca-bf33-4378-b76c-5e1173bfe7af/out/7179.008.png)
*图：NVMe transport 类型：PCIe 使用共享内存模型，FC/TCP 使用消息模型，RDMA 使用消息/内存混合模型。图片来源：Dell Technologies InfoHub；协议依据为 NVM Express NVMe-oF 规格。*

```python
# NVMe-oF 主机侧连接与 I/O 伪代码
def nvmeof_mount(traddr, host_nqn):
    discovery = connect_discovery_controller(traddr, host_nqn)
    entries = discovery.get_log_page("Discovery Log")

    for entry in entries:
        admin_q = fabrics_connect(
            nqn=entry.subsystem_nqn,
            trtype=entry.transport_type,
            traddr=entry.transport_address,
            qid=0,              # Admin Queue
        )
        admin_q.property_set("CC.EN", 1)
        namespaces = admin_q.identify_namespaces()

        io_queues = []
        for qid in range(1, choose_queue_count()):
            io_queues.append(fabrics_connect(entry.subsystem_nqn, entry.transport_type, entry.transport_address, qid))

        return NvmeRemoteController(admin_q, io_queues, namespaces)

def submit_read(ctrl, nsid, lba, nblocks, host_buffer):
    q = pick_io_queue()
    capsule = NvmeCommandCapsule(opcode="READ", nsid=nsid, lba=lba, nblocks=nblocks, sgl=host_buffer)
    q.submit(capsule)
    return q.poll_completion(capsule.command_id)
```

NVMe-oF 的设计目标不是发明新的块协议，而是把 NVMe Base 里的低延迟队列模型跨越 PCIe 边界。主机仍然面对 namespace、controller、Admin/I/O command 等 NVMe 概念；差异在于原先依赖 PCIe MMIO 寄存器、doorbell 和本地内存地址的部分，被抽象成 fabric 上可传输的属性、capsule 和 SGL。一个端到端远程读的延迟可拆成：

$$
T_{read} = T_{host\_queue} + T_{transport} + T_{target\_queue} + T_{ssd} + T_{completion}
$$

协议优化的重点是让 \(T_{transport}\)、\(T_{target\_queue}\) 和 \(T_{completion}\) 尽量小，同时保留 NVMe 本地多队列并行性。

连接流程由 Discovery 和 Connect 驱动。主机先连接 Discovery Controller，读取 Discovery Log，得到目标 subsystem 的 NQN、transport type、address、service id 等信息；随后对目标 subsystem 发起 Fabrics Connect。Admin Queue 的 Connect 建立 host 与 controller 的 association，I/O Queue 的 Connect 建立数据面队列。由于 fabric 不再使用 PCIe 的 Create I/O Submission Queue / Create I/O Completion Queue 命令，队列创建语义被转移到 Fabrics Connect/Disconnect。

数据传输靠 capsule 和 SGL。命令 capsule 至少包含 64B SQE，响应 capsule 至少包含 16B CQE；小数据可以随 capsule 走，大数据则由 SGL 指向 host 或 target 的缓冲区。对 RDMA 这类 message/memory transport，命令/响应用消息传递，数据可通过 RDMA read/write 直接搬运，减少拷贝和 CPU 介入；对 TCP，命令与数据封装在可靠 TCP 字节流中，部署门槛低但需要更强的软件或 NIC offload 来控制 CPU 开销。

NVMe-oF 与本地 NVMe 有几处关键差异。首先，I/O SQ 和 CQ 一对一映射，不支持多个 SQ 共享一个 CQ；其次，fabric 环境没有由 NVMe 控制器直接产生的 PCIe interrupt，主机 fabric interface 负责通知；再次，NVMe-oF 不支持 PRP，Admin、I/O 和 Fabrics commands 都要求使用 SGL。其并行能力仍可用队列规模表达：

$$
Q_{max} = 2^{16} - 1,\qquad D_{max} = 2^{16} - 1
$$

其中 \(Q_{max}\) 是每控制器最大 I/O 队列数，\(D_{max}\) 是单队列最大 outstanding command 数。实际系统会按 CPU 核、NIC 队列、target poller 和 SSD 并发度选择远小于上限的队列数。

从系统角度看，NVMe-oF 把“本地盘”变成可池化、可多路径的远程块设备。存储阵列可以把多个 SSD 暴露为 NVM subsystem，多个 host 通过不同 controller 访问 namespace，配合 ANA/multipath 做路径选择与故障切换。DPU/SmartNIC 卸载的价值也来自这里：让 Connect、queue pair、RDMA/TCP 数据搬运、加密和 target poller 尽量靠近网卡执行，主机 CPU 保留给应用。

> ⚠️ 注意：NVMe-oF 提供远程块访问语义，不自动解决分布式一致性、文件系统共享写入或应用级事务；多主机共享 namespace 时仍需要 reservation、集群文件系统或上层协调。

#### 🧪 练习题
```yaml
question: "NVMe-oF 为什么需要 Fabrics Connect 命令？"
options:
  - "因为远程 fabric 不使用 PCIe 的队列创建和 MMIO doorbell 机制，需要用协议命令建立 Admin/I/O 队列关联"
  - "因为 NVMe-oF 取消了 NVMe Admin Command Set"
  - "因为 TCP 无法保证字节流可靠传输"
  - "因为所有 NVMe-oF 数据都必须经过文件系统缓存"
answer: 0
explain: "NVMe-oF 保留 NVMe 队列模型，但远程连接不能依赖 PCIe 本地寄存器，因此用 Fabrics Connect/Disconnect 建立和删除控制器队列关联。"
```

### CXL Memory

```yaml
id: cxl
num: 27
name: CXL Memory
full_name: CXL内存扩展 (Compute Express Link)
year: '2019'
org: Intel联盟
parent: —
paper_url: https://www.computeexpresslink.org/
project_url: ''
category: emerging
motivation: 内存池化,利用率50%→85%
```

#### 📝 一句话总结
CXL（Compute Express Link）是基于 PCIe 物理层的开放互连标准，通过定义 CXL.io/CXL.cache/CXL.mem 三种子协议实现 CPU 与外部设备间的缓存一致性内存访问，核心目标是实现**内存解耦与池化**，将数据中心内存利用率从约 50% 提升至 85% 以上。

#### 🎯 核心要点
- **三种子协议**：CXL.io（I/O 语义，兼容 PCIe）、CXL.cache（设备缓存主机内存，保持一致性）、CXL.mem（主机访问设备端内存）
- **三类设备模型**：Type 1（加速器，无设备内存）、Type 2（带内存的加速器，如 GPU/FPGA）、Type 3（纯内存扩展器，池化核心）
- **内存池化（Memory Pooling）**：CXL 2.0 引入交换机与多主机共享内存池，动态分配内存容量
- **动态容量设备（DCD）**：CXL 3.0 引入，允许内存设备向主机动态暴露/回收内存区域
- **缓存一致性**：硬件级别保证 CPU 缓存与 CXL 设备内存之间的数据一致性，无需软件干预
- **多版本演进**：CXL 1.0/1.1（2019）→ CXL 2.0（2020，交换/池化）→ CXL 3.0（2022，Fabric/多级交换）→ CXL 3.1（2023，增强安全与 DCD）
- **性能特征**：CXL 内存延迟约为本地 DDR 的 2-3 倍（额外 ~100-200ns），带宽可达本地 DDR 的 45-83%（取决于实现）

#### 🔬 深入细节
##### 架构总览

![CXL Type 3 内存扩展架构](https://ar5iv.labs.arxiv.org/html/2411.02282/assets/x1.png)
*图：通过 CXL Type 3 设备实现内存扩展——CPU 经由 CXL 链路访问外部 DRAM，扩展系统内存容量（来源：CXL-DMSim, arXiv:2411.02282）*

![CXL 内存访问延迟分解](https://ar5iv.labs.arxiv.org/html/2411.02282/assets/x5.png)
*图：CXL 内存访问请求从 CPU 到 CXL 设备的端到端延迟分解（来源：CXL-DMSim, arXiv:2411.02282）*

CXL 构建于 PCIe 的物理层和电气层之上，复用了 PCIe 的链路训练、信号编码（如 PCIe 5.0 的 32 GT/s、PCIe 6.0 的 64 GT/s PAM4）等基础设施。在此之上，CXL 定义了三种协议，通过 **Flex Bus** 机制在同一物理链路上动态复用：

```
┌─────────────────────────────────────────────┐
│              CXL Transaction Layer           │
│  ┌───────────┬──────────────┬─────────────┐  │
│  │  CXL.io   │  CXL.cache   │  CXL.mem    │  │
│  │ (PCIe TLP)│ (D2H Req/Rsp)│(M2S/S2M Msg)│  │
│  └───────────┴──────────────┴─────────────┘  │
├─────────────────────────────────────────────┤
│           CXL Link Layer (ARB/MUX)          │
├─────────────────────────────────────────────┤
│         PCIe Physical Layer (PHY)            │
│        (PCIe 5.0 / 6.0 Electrical)          │
└─────────────────────────────────────────────┘
```

##### 三种子协议详解

**CXL.io** 是对标准 PCIe 协议的兼容层，提供设备发现、配置、中断、DMA 等传统 I/O 功能。所有 CXL 设备都必须支持 CXL.io，它是设备初始化和管理的基础通道。

**CXL.cache** 允许 CXL 设备缓存主机内存中的数据，并通过硬件一致性协议保证缓存与主机内存的一致性。其消息流分为：
- **D2H Request**（Device-to-Host）：设备向主机发起读/写请求
- **H2D Response**（Host-to-Device）：主机返回数据或确认
- **H2D Snoop**：主机对设备缓存发起窥探，确保一致性

> 💡 关键：CXL.cache 使得加速器（如 SmartNIC、FPGA）可以直接缓存主机内存数据，避免了传统 PCIe DMA 的高延迟拷贝开销。

**CXL.mem** 是内存扩展的核心协议，允许主机 CPU 以 load/store 语义直接访问 CXL 设备上的内存（HDM, Host-managed Device Memory）。其消息流分为：
- **M2S Request/Data**（Master-to-Subordinate）：主机向设备发起内存读写
- **S2M Response/Data**（Subordinate-to-Master）：设备返回数据

内存访问的地址映射通过 **HDM Decoder** 完成，主机 BIOS/固件在启动时将 CXL 设备内存映射到系统物理地址空间，操作系统可将其作为 NUMA 节点管理。

##### 三类设备模型

| 设备类型 | 支持协议 | 典型应用 | 示例 |
|---------|---------|---------|------|
| Type 1 | CXL.io + CXL.cache | 无本地内存的加速器 | SmartNIC、加密引擎 |
| Type 2 | CXL.io + CXL.cache + CXL.mem | 带内存的加速器 | GPU、FPGA、AI 加速器 |
| Type 3 | CXL.io + CXL.mem | 纯内存扩展 | 内存扩展器、持久内存 |

> ⚠️ 注意：Type 3 设备是内存池化的核心载体。它不具备计算能力，仅提供大容量内存，通过 CXL.mem 协议供主机访问。

##### 内存池化机制（CXL 2.0+）

内存池化是 CXL 最具变革性的特性。传统服务器中，每台主机的内存是独占的——即使某些主机内存利用率仅 30%，其他主机也无法借用，导致数据中心整体内存利用率通常仅约 **50%**。

CXL 2.0 引入了 **CXL Switch**，允许多台主机通过交换机连接到共享的 Type 3 内存设备池：

```
   ┌──────┐  ┌──────┐  ┌──────┐
   │Host 0│  │Host 1│  │Host 2│
   └──┬───┘  └──┬───┘  └──┬───┘
      │         │         │
   ┌──┴─────────┴─────────┴──┐
   │       CXL Switch         │
   └──┬─────────┬─────────┬──┘
      │         │         │
   ┌──┴───┐ ┌──┴───┐ ┌──┴───┐
   │Mem   │ │Mem   │ │Mem   │
   │Dev 0 │ │Dev 1 │ │Dev 2 │
   └──────┘ └──────┘ └──────┘
   ← CXL Memory Pool →
```

池化的核心工作流程：

1. **FM（Fabric Manager）** 是池化系统的控制平面，负责管理内存分配策略
2. 主机通过 FM 请求内存容量，FM 在内存池中分配相应区域
3. FM 配置 CXL Switch 的 HDM Decoder，将分配的内存区域映射到请求主机的物理地址空间
4. 主机通过 CXL.mem 协议直接以 load/store 访问分配到的远端内存
5. 当主机释放内存时，FM 回收并可重新分配给其他主机

> 💡 关键：通过动态分配，内存池化可将数据中心内存利用率从 ~50% 提升至 **~85%**，显著降低 TCO（总拥有成本）。

##### 动态容量设备（DCD, CXL 3.0）

CXL 3.0 进一步引入了 **Dynamic Capacity Device (DCD)**，允许内存设备主动向主机通知容量变化：

$$
\text{Capacity}_{effective}(t) = \sum_{r \in \text{Regions}} \text{Extent}_{allocated}(r, t)
$$

DCD 通过 **Dynamic Capacity Event** 机制工作：
- 设备可以向主机发送 **Add Capacity** 事件，动态扩展可用内存
- 设备也可以发送 **Release Capacity** 请求，回收之前分配的内存区域
- 主机通过 **Mailbox Command** 响应这些事件

这使得内存管理更加灵活，支持超额分配（oversubscription）等高级策略。

##### 性能模型与延迟分析

CXL 内存访问的端到端延迟可分解为：

$$
T_{CXL} = T_{CPU\_uncore} + T_{CXL\_controller} + T_{link} + T_{switch} + T_{device\_controller} + T_{media}
$$

其中各组成部分的典型值（基于实测数据）：

| 组件 | 延迟贡献 | 说明 |
|------|---------|------|
| \(T_{CPU\_uncore}\) | ~20-40ns | CPU 内部 CXL 根端口处理 |
| \(T_{CXL\_controller}\) | ~10-20ns | CXL 协议编解码 |
| \(T_{link}\) | ~5-10ns | PCIe 物理链路传输 |
| \(T_{switch}\) | ~30-50ns | CXL 交换机转发（若有） |
| \(T_{device\_controller}\) | ~20-40ns | 设备端 CXL 控制器 |
| \(T_{media}\) | ~50-80ns | DRAM 介质访问 |

实测结果表明：
- **无交换机直连**：CXL 内存延迟约为本地 DDR 的 **~2.18x**（ASIC 实现）至 **~2.88x**（FPGA 实现）
- **带宽**：CXL-ASIC 可达本地 DDR 带宽的 **82-83%**，CXL-FPGA 约为 **45-69%**
- 对于内存密集型应用（如 KV 数据库），在本地内存受限时，CXL 扩展内存可带来最高 **23x** 的性能提升

##### 与传统内存扩展方案对比

| 特性 | 本地 DDR | NUMA 远端 | RDMA | CXL Memory |
|------|---------|----------|------|------------|
| 访问语义 | load/store | load/store | verb-based | load/store |
| 缓存一致性 | 硬件保证 | 硬件保证 | 软件管理 | 硬件保证 |
| 额外延迟 | 基准 | ~50-100ns | ~1-2μs | ~100-200ns |
| 池化支持 | ❌ | ❌ | ✅（复杂） | ✅（原生） |
| 软件修改 | 无 | 最小 | 大量 | 最小（NUMA 兼容） |
| 容量扩展 | 受限于 DIMM 槽位 | 受限于节点数 | 灵活 | 灵活 |

> 💡 关键：CXL 的核心优势在于**保持 load/store 语义和硬件缓存一致性的同时实现内存池化**，这是 RDMA 等方案无法做到的。应用程序几乎无需修改即可使用 CXL 扩展内存。

##### 版本演进路线

- **CXL 1.0/1.1（2019）**：奠定三协议基础，支持单主机-单设备直连，基于 PCIe 5.0
- **CXL 2.0（2020）**：引入 CXL Switch 和内存池化，支持多主机共享内存，单级交换
- **CXL 3.0（2022）**：支持多级交换（Fabric）、增强一致性（Back-Invalidate Snoop）、DCD、PCIe 6.0（64 GT/s）、Global Fabric Attached Memory (GFAM)
- **CXL 3.1（2023）**：增强安全性（TSP, Trust Security Protocol）、端口隧道、改进的 DCD 管理

##### 生态与产业现状

CXL 联盟成员超过 190 家，包括 Intel、AMD、ARM、Samsung、SK Hynix、Micron、Meta、Google、Microsoft 等。已有多款商用产品：
- **Samsung CXL Memory Expander**（CMM-D/CMM-H）：基于 DDR5 的 Type 3 设备
- **SK Hynix CXL DRAM**：支持 CXL 2.0 的内存模块
- **Micron CZ120**：CXL 2.0 内存扩展器
- **Astera Labs Leo**：CXL 智能内存控制器
- **Montage Technology**：CXL 交换芯片

#### 🧪 练习题
```yaml
question: "CXL 内存池化的核心优势相比 RDMA 远程内存方案是什么？"
options:
  - "CXL 的网络带宽更高"
  - "CXL 保持 load/store 语义和硬件缓存一致性，应用几乎无需修改"
  - "CXL 的延迟比 RDMA 低一个数量级"
  - "CXL 支持更多的编程语言"
answer: 1
explain: "CXL 通过硬件级缓存一致性协议（CXL.mem）让主机以标准 load/store 指令访问远端内存，操作系统将其视为 NUMA 节点，应用程序几乎无需修改；而 RDMA 需要使用专用 verb API，需大量改造应用。"
```

### ArcNeural

```yaml
id: arcneural
num: 28
name: ArcNeural
full_name: ArcNeural多模态数据库 (ArcNeural)
year: '2025'
org: 学术研究
parent: —
paper_url: https://arxiv.org/abs/2506.09467
project_url: ''
category: emerging
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
