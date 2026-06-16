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
