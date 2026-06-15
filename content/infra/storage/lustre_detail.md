### Lustre

```yaml
id: lustre
name: Lustre
full_name: Lustre并行文件系统 (Lustre Parallel File System)
year: '2003'
org: 社区
paper_url: https://dl.acm.org/doi/abs/10.1145/3736583
category: distributed_fs
parent: —
motivation: HPC场景高并发I/O首选
```

#### 📝 一句话总结

Lustre 通过将元数据服务和对象数据服务分离，并把大文件条带化到多个 Object Storage Target 上，为 HPC 和大型训练集群提供 POSIX 兼容的高并发共享文件系统。

#### 🎯 核心要点

- Client 暴露 POSIX 文件系统接口，应用无需显式感知底层对象条带
- MDS/MDT 处理目录、inode、权限、文件布局等元数据
- OSS/OST 存储文件数据对象，多个 OST 并行承载一个大文件的条带
- MGS 保存全局配置，Lustre 网络层支持高速互连和多种传输
- 可通过 stripe count、stripe size、pool 等参数适配大文件和并发作业
- 常以 HA building block 部署，MDS/OSS 结合共享存储或故障转移提升可用性

#### 🔬 深入细节

**核心示意图说明**：Lustre 官方 Wiki 将系统拆为 Client、MDS/MDT、OSS/OST 和 MGS 四类组件，并强调文件系统可随 OSS/OST building block 线性扩展。ACM 任务链接为综述/论文页，稳定方法说明可参考 https://wiki.lustre.org/Introduction_to_Lustre。

```text
Application
  -> Lustre Client
     |-- namespace RPC --> MDS -> MDT
     `-- parallel I/O --> OSS0 -> OST0
                       --> OSS1 -> OST1
                       --> OSSN -> OSTN
MGS: cluster configuration registry
```

```python
# Lustre 条带化写入伪代码
def write_file(path, data, stripe_count, stripe_size):
    layout = mds.create(path, stripe_count=stripe_count, stripe_size=stripe_size)
    for logical_offset, chunk in split(data, stripe_size):
        stripe_id = (logical_offset // stripe_size) % stripe_count
        ost = layout.osts[stripe_id]
        object_offset = compute_object_offset(logical_offset, stripe_count, stripe_size)
        ost.write(layout.object_id[stripe_id], object_offset, chunk)
    mds.commit_size(path, len(data))
```

Lustre 的动机来自 HPC：许多计算节点需要同时读写同一个全局命名空间，单个 NFS 服务器或单机文件系统无法提供足够的聚合带宽。Lustre 保留 POSIX 接口，让 MPI-IO、检查点、科学模拟和训练数据加载可以像访问本地文件一样访问集群存储，但内部把元数据与数据路径分离。

数据并行性的关键是条带化。一个大文件可以被拆成固定大小的 stripes，并轮转写入多个 OST。若 stripe_count 为 \(n\)，理想情况下单文件吞吐近似为：

$$
BW_{file}\approx \sum_{i=1}^{n} BW_{OST_i}
$$

这让单个大检查点或大数据文件不再受限于一块磁盘或一个存储节点。不过，过高的 stripe_count 会增加元数据和锁管理开销，小文件反而不适合跨太多 OST。

元数据路径由 MDS/MDT 承担，目录遍历、create、unlink、chmod 等操作不会走 OST。现代 Lustre 支持 DNE 等分布式命名空间能力，以缓解单 MDT 热点。数据路径则由客户端直接向多个 OSS 发起并行 I/O，这与 GFS/HDFS 的“元数据控制、数据直连”一脉相承，但 Lustre 更强调 POSIX 兼容与低延迟并发。

与 HDFS 不同，Lustre 面向在线 HPC 作业而非批处理数据本地性。HDFS 倾向把计算调度到数据所在节点，Lustre 则提供一个高性能共享存储层，让计算节点通过高速网络并行访问远端 OST。代价是集群设计和调优更复杂，需要根据应用 I/O 模式配置 stripe、OST pool、锁和 HA。

#### 🧪 练习题

```yaml
question: "Lustre 对大文件高吞吐最核心的机制是什么？"
options:
  - "将所有数据集中写入一个 MDS"
  - "把文件数据按 stripe 分散到多个 OST 并由客户端并行访问"
  - "只允许单个客户端访问一个文件"
  - "用 NameNode 调度计算到本地磁盘"
answer: 1
explain: "Lustre 将元数据与数据分离，并把文件对象条带化到多个 OST，使单文件和多客户端 I/O 可以叠加多个存储目标的带宽。"
```
