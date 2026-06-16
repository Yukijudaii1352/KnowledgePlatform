### HDFS

```yaml
id: hdfs
name: HDFS
full_name: Hadoop分布式文件系统 (Hadoop Distributed File System)
year: '2006'
org: Apache
paper_url: https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html
category: foundation
parent: gfs
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
