### Alluxio

```yaml
id: alluxio
name: Alluxio
full_name: Alluxio数据编排层 (Alluxio Data Orchestration)
year: '2014'
org: UC Berkeley
paper_url: https://www.alluxio.io/
category: object_storage
parent: —
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
