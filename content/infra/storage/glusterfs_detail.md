### GlusterFS

```yaml
id: glusterfs
name: GlusterFS
full_name: GlusterFS分布式文件系统 (GlusterFS)
year: '2006'
org: Red Hat
paper_url: https://www.gluster.org/
category: distributed_fs
parent: —
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

**核心示意图说明**：Gluster 官方页面说明其由普通硬件构建可扩展网络文件系统，架构核心是客户端 translator 栈、volume 配置和一组 brick。官方首页未提供稳定的架构图直链，下面给出结构化重构。

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
