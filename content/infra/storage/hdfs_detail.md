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

HDFS 将 GFS 的单 NameNode、块副本和客户端直连数据节点思想开源化，并围绕 Hadoop/MapReduce 的大文件顺序扫描、写一次读多次和计算靠近数据进行工程化。

#### 🎯 核心要点

- NameNode 管理目录树、权限、block 映射、副本位置和 DataNode 心跳
- DataNode 存储真实 block，周期性向 NameNode 上报 block report
- 默认三副本的机架感知放置策略兼顾写入成本、容错和本地读取
- 支持 write-once-read-many、append/truncate，而非任意位置高频更新
- 客户端写入采用 pipeline replication，读路径选择最近副本
- 生态接口包括 FS shell、Java API、libhdfs、WebHDFS 和 Hadoop 计算本地性

#### 🔬 深入细节

![HDFS 架构图](https://hadoop.apache.org/docs/stable/hadoop-project-dist/hadoop-hdfs/images/hdfsarchitecture.png)
*图：HDFS NameNode 处理元数据和 block 操作，DataNode 存储块副本，客户端读写数据时直接与 DataNode 交互。*

```python
# HDFS block 写入与恢复伪代码
def create(path, stream):
    inode = namenode.create_file(path)
    while data := stream.next_block():
        targets = namenode.choose_replicas(path, replication=3)
        # pipeline: client -> DN1 -> DN2 -> DN3
        pipeline_write(data, targets)
        namenode.commit_block(inode, block_id(data), targets)

def handle_datanode_failure(dead_dn):
    lost = namenode.blocks_on(dead_dn)
    for block in lost:
        if live_replica_count(block) < desired_replication(block):
            src = choose_live_replica(block)
            dst = choose_new_target(block)
            copy_replica(src, dst, block)
```

HDFS 的背景假设非常明确：硬件故障是常态，文件通常很大，应用以批处理和流式访问为主，低延迟交互不是第一目标。因此 HDFS 放宽部分 POSIX 要求，强调高吞吐、顺序访问和“移动计算比移动数据便宜”。MapReduce 调度器可以利用 block 位置信息，把任务尽量调到持有数据副本的节点或同机架节点上。

NameNode 是系统的元数据核心。它将文件拆为 block，并维护每个 block 的副本集合；DataNode 只负责本地磁盘上的 block 文件和校验。一个读请求通常先向 NameNode 获取 block 位置，再按网络拓扑选择最近副本读取。写请求则先获取目标 DataNode 列表，客户端将数据包写入第一个 DataNode，后者继续转发给下一个，形成流水线复制。

默认三副本策略体现了 HDFS 的工程权衡：若写入方本身是 DataNode，第一个副本放本机，第二个副本放远端机架，第三个副本放在远端机架的另一台机器。这样比“三个副本都跨不同机架”少一次跨机架写流量，同时仍可容忍节点和机架级故障。

与 GFS 相比，HDFS 更深地绑定 Hadoop 生态，并逐渐补齐 HA NameNode、Federation、Erasure Coding、快照、加密和多存储介质策略。它的弱点也来自同一个设计：NameNode 内存限制和小文件元数据压力会制约规模，因此后续系统如 Tectonic、Colossus 会把元数据拆成可水平扩展服务。

#### 🧪 练习题

```yaml
question: "HDFS 默认三副本机架感知策略的主要目的是什么？"
options:
  - "强制三个副本都在同一台机器以减少网络开销"
  - "在可靠性与跨机架写入成本之间折中"
  - "让 NameNode 不再需要保存 block 位置"
  - "让所有读取都必须跨机架进行"
answer: 1
explain: "默认策略通常在本地或同机架放一个副本，在远端机架放两个副本，减少跨机架写流量，同时保留机架故障下的数据可用性。"
```
