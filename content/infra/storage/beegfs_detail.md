### BeeGFS

```yaml
id: beegfs
name: BeeGFS
full_name: BeeGFS并行文件系统 (BeeGFS Parallel File System)
year: '2014'
org: ThinkParQ
paper_url: https://www.beegfs.io/docs/
category: distributed_fs
parent: lustre
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
