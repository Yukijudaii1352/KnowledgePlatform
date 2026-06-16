### Ceph

```yaml
id: ceph
name: Ceph
full_name: Ceph统一存储系统 (Ceph Unified Storage)
year: '2006'
org: UCSC
paper_url: https://ceph.io/en/news/blog/2006/ceph-a-scalable-high-performance-distributed-file-system/
category: distributed_fs
parent: —
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
