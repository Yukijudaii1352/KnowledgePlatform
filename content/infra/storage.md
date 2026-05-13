---
domain: infra
topic_id: storage
topic_name: AI存储系统
page_icon: "\U0001F4BE"
page_title: AI存储系统技术演进
page_subtitle: '{build_date}版'
page_desc: 从GFS奠基到大模型时代的存储优化——涵盖大规模训练数据存储、高速缓存、Checkpoint优化与分布式文件系统的技术演进
hero_pills:
- "\U0001F3F7️ AI Storage"
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

### 待定
待定。

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
GFS 的核心目标是：大规模廉价硬件上的可靠存储。

#### 🎯 核心要点
- 核心动机：大规模廉价硬件上的可靠存储
- 代表机构：Google

#### 🔬 深入细节
大规模廉价硬件上的可靠存储


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
HDFS 的核心目标是：GFS开源实现,批处理优化。

#### 🎯 核心要点
- 核心动机：GFS开源实现,批处理优化
- 演化来源：继承或改进自 gfs
- 代表机构：Apache

#### 🔬 深入细节
GFS开源实现,批处理优化


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
Colossus 的核心目标是：去中心化元数据,10EB+规模。

#### 🎯 核心要点
- 核心动机：去中心化元数据,10EB+规模
- 演化来源：继承或改进自 gfs
- 代表机构：Google

#### 🔬 深入细节
去中心化元数据,10EB+规模


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
Tectonic 的核心目标是：分层哈希分片,统一存储栈。

#### 🎯 核心要点
- 核心动机：分层哈希分片,统一存储栈
- 演化来源：继承或改进自 hdfs
- 代表机构：Meta

#### 🔬 深入细节
分层哈希分片,统一存储栈


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
Lustre 的核心目标是：HPC场景高并发I/O首选。

#### 🎯 核心要点
- 核心动机：HPC场景高并发I/O首选
- 代表机构：社区

#### 🔬 深入细节
HPC场景高并发I/O首选


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
Ceph 的核心目标是：统一块/文件/对象存储。

#### 🎯 核心要点
- 核心动机：统一块/文件/对象存储
- 代表机构：UCSC

#### 🔬 深入细节
统一块/文件/对象存储


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
GlusterFS 的核心目标是：无元数据服务器,线性扩展。

#### 🎯 核心要点
- 核心动机：无元数据服务器,线性扩展
- 代表机构：Red Hat

#### 🔬 深入细节
无元数据服务器,线性扩展


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
BeeGFS 的核心目标是：BeeOND临时FS,GPUDirect支持。

#### 🎯 核心要点
- 核心动机：BeeOND临时FS,GPUDirect支持
- 演化来源：继承或改进自 lustre
- 代表机构：ThinkParQ

#### 🔬 深入细节
BeeOND临时FS,GPUDirect支持


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
JuiceFS 的核心目标是：S3后端+Redis元数据,云原生。

#### 🎯 核心要点
- 核心动机：S3后端+Redis元数据,云原生
- 代表机构：Juicedata

#### 🔬 深入细节
S3后端+Redis元数据,云原生


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
FalconFS 的核心目标是：元数据负载均衡,DL管道优化。

#### 🎯 核心要点
- 核心动机：元数据负载均衡,DL管道优化
- 演化来源：继承或改进自 lustre
- 代表机构：学术研究

#### 🔬 深入细节
元数据负载均衡,DL管道优化


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
MinIO 的核心目标是：S3兼容高性能对象存储。

#### 🎯 核心要点
- 核心动机：S3兼容高性能对象存储
- 代表机构：MinIO

#### 🔬 深入细节
S3兼容高性能对象存储


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
Alluxio 的核心目标是：分布式缓存,存算分离桥梁。

#### 🎯 核心要点
- 核心动机：分布式缓存,存算分离桥梁
- 代表机构：UC Berkeley

#### 🔬 深入细节
分布式缓存,存算分离桥梁


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
DeepFreeze 将 HPC 领域成熟的多级异步检查点库 VELOC 引入深度学习训练，通过后台线程异步序列化与多级存储（本地 SSD → 共享 PFS）流水线化写入，在数百 GPU 规模下实现接近零开销的模型检查点，同时保证容错恢复能力。

#### 🎯 核心要点
- **HPC 检查点技术迁移至 DL**：将 VELOC（Very Low Overhead Checkpointing System）的多级异步检查点机制适配到 TensorFlow/PyTorch 等深度学习框架，填补 DL 训练中高效容错的空白
- **异步流水线架构**：检查点操作被分解为三个可重叠阶段——（1）内存快照（snapshot）、（2）本地持久化（local persist）、（3）远程刷写（remote flush），各阶段通过后台线程与训练计算并行执行
- **多级存储层次**：Level-0 为节点本地内存/SSD 的快速检查点，Level-1 为跨节点到共享并行文件系统（PFS）的持久检查点，两级频率可独立配置以平衡开销与恢复粒度
- **透明框架集成**：通过 TensorFlow 的 `SessionRunHook` 和 PyTorch 的回调机制，在每个 epoch/N 步后自动触发异步检查点，无需修改用户训练代码
- **增量与差分检查点**：利用 hash 比较检测模型参数变化量，仅序列化发生变化的张量分片，显著减少写入数据量（尤其在微调场景下）
- **可扩展至数百节点**：实验表明在 256 个 GPU（64 节点 × 4 GPU）上训练 ResNet-50/VGG-16 等模型时，检查点开销低于训练时间的 2%，接近理想的零开销目标

#### 🔬 深入细节
```
┌─────────────────────────────────────────────────────────┐
│                    Training Process                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │ Forward  │→ │ Backward │→ │ Param    │  ← 训练主循环 │
│  │ Pass     │  │ Pass     │  │ Update   │              │
│  └──────────┘  └──────────┘  └────┬─────┘              │
│                                    │ 每N步触发           │
│                              ┌─────▼──────┐             │
│                              │  Snapshot   │ ← 内存拷贝  │
│                              │ (memcpy)    │   ~ms级     │
│                              └─────┬───────┘             │
│ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┼ ─ ─ ─ 异步边界 ─ ─ │
│                              ┌─────▼───────┐             │
│  Background                  │ Local SSD   │ ← Level-0  │
│  Thread                      │ Persist     │   异步写入  │
│                              └─────┬───────┘             │
│                              ┌─────▼───────┐             │
│  VELOC                       │ Remote PFS  │ ← Level-1  │
│  Active Backend              │ Flush       │   后台刷写  │
│                              └─────────────┘             │
└─────────────────────────────────────────────────────────┘
```
*图：DeepFreeze 异步检查点流水线。训练主循环仅承担内存快照的微小开销，本地持久化和远程刷写由后台线程/VELOC 守护进程异步完成。*

```python
# DeepFreeze 异步检查点核心流程伪代码

class DeepFreezeCheckpointer:
    def __init__(self, veloc_config, ckpt_interval, local_path, pfs_path):
        """
        veloc_config: VELOC 配置文件路径（指定 scratch/persistent 路径、线程数等）
        ckpt_interval: 每隔多少步触发一次检查点
        local_path: 本地 SSD 路径（Level-0）
        pfs_path: 共享 PFS 路径（Level-1）
        """
        self.veloc_client = VELOC.init(MPI_COMM_WORLD, veloc_config)
        self.interval = ckpt_interval
        self.snapshot_buffer = {}   # 双缓冲：训练用 + 快照用
        self.prev_hashes = {}       # 上一次检查点的张量 hash（用于增量检测）

    def on_step_end(self, step, model):
        if step % self.interval != 0:
            return  # 非检查点步，直接返回

        # ===== 阶段1: 内存快照（同步，阻塞训练，但极快） =====
        for name, param in model.named_parameters():
            current_hash = fast_hash(param.data)
            if current_hash != self.prev_hashes.get(name):
                # 仅拷贝发生变化的参数（增量检查点）
                self.snapshot_buffer[name] = param.data.cpu().clone()
                self.prev_hashes[name] = current_hash

        # ===== 阶段2+3: 异步持久化（非阻塞） =====
        # VELOC 在后台完成: snapshot_buffer → 本地SSD → PFS
        self.veloc_client.checkpoint_async(
            name=f"model_step_{step}",
            data=self.snapshot_buffer
        )
        # 训练立即继续，不等待 I/O 完成

    def restore(self, model, version=-1):
        """从最新可用检查点恢复"""
        # VELOC 自动选择最新完整检查点（优先本地SSD，回退到PFS）
        ckpt_data = self.veloc_client.restart(version)
        for name, param in model.named_parameters():
            if name in ckpt_data:
                param.data.copy_(ckpt_data[name])


# ===== TensorFlow 集成示例 =====
class DeepFreezeHook(tf.estimator.SessionRunHook):
    """通过 TF SessionRunHook 透明集成"""
    def after_run(self, run_context, run_values):
        self.global_step += 1
        self.checkpointer.on_step_end(self.global_step, self.model)

# ===== PyTorch 集成示例 =====
# 在训练循环中：
for epoch in range(num_epochs):
    for batch in dataloader:
        loss = model(batch)
        loss.backward()
        optimizer.step()
        deepfreeze_ckpt.on_step_end(global_step, model)  # 一行集成
```

**动机与背景：DL 训练容错的困境**

大规模深度学习训练作业通常运行数天至数周，使用数百甚至数千个 GPU。在此规模下，硬件故障（GPU 显存错误、节点宕机、网络中断）几乎是必然事件。传统的 DL 检查点方案（如 TensorFlow 的 `tf.train.Saver`、PyTorch 的 `torch.save`）采用同步方式：训练暂停 → 所有进程将模型参数序列化到共享文件系统 → 训练恢复。这种方式存在三个严重问题：

1. **I/O 风暴**：数百个进程同时向共享 PFS 写入 GB 级检查点，造成严重的 I/O 竞争，PFS 带宽成为瓶颈
2. **训练停顿**：同步写入期间所有 GPU 空闲等待，检查点频率越高，训练吞吐量损失越大
3. **恢复粒度粗糙**：为降低开销而降低检查点频率，导致故障后需要重新计算大量已完成的训练步

与此同时，HPC 社区在科学计算应用的容错方面已积累了数十年经验。VELOC 是 ANL 开发的多级检查点库，支持异步 I/O、本地/远程多级存储、增量检查点等高级特性，在 HPC 应用中已证明可实现接近零开销的检查点。DeepFreeze 的核心洞察是：**DL 训练的检查点模式（周期性保存固定大小的参数张量）与 HPC 科学模拟的检查点模式高度相似，可以直接复用 VELOC 的成熟机制**。

> 💡 关键洞察：DL 检查点的本质是周期性地持久化一组固定结构的浮点数组（模型参数），这与 HPC 模拟中保存物理场数据的模式完全一致——VELOC 的异步多级机制可以无缝迁移。

**核心机制：VELOC 多级异步检查点**

DeepFreeze 的技术核心是 VELOC 的两级检查点架构：

**Level-0（本地快速检查点）**：每个计算节点将检查点数据写入节点本地的 NVMe SSD 或 RAM disk。由于是本地 I/O，不存在网络竞争，写入带宽可达数 GB/s。本地检查点可以高频执行（如每 100 步），提供细粒度的恢复点。但本地检查点在节点故障时会丢失，因此仅能应对进程级故障（如 OOM、软件 bug）。

**Level-1（远程持久检查点）**：VELOC 的 Active Backend 守护进程在后台将本地检查点异步刷写到共享 PFS（如 Lustre、GPFS）。远程检查点频率较低（如每 1000 步或每个 epoch），但提供跨节点的持久容错能力。关键在于，刷写过程完全在后台进行，不阻塞训练。

$$T_{\text{overhead}} = T_{\text{snapshot}} = O(\text{model\_size} / \text{memcpy\_bandwidth})$$

$$T_{\text{snapshot}} \ll T_{\text{training\_step}} \Rightarrow \text{overhead} \approx 0$$

对于典型的 ResNet-50 模型（~100 MB 参数），内存快照仅需约 10 ms（假设 10 GB/s memcpy 带宽），而单步训练时间通常为 200-500 ms，因此快照开销不到训练时间的 5%。对于更大的模型，DeepFreeze 采用增量快照策略，通过 hash 比较仅拷贝变化的参数，进一步降低开销。

**VELOC Active Backend 架构**

VELOC 采用客户端-守护进程（client-daemon）分离架构：

- **Client Library**（嵌入训练进程）：负责内存快照和本地 SSD 写入，提供 `checkpoint_begin/mem_protect/checkpoint_end` 等 API
- **Active Backend Daemon**（独立进程，每节点一个）：监听本地检查点完成事件，异步执行远程刷写、数据压缩、EC 编码（Erasure Coding）等后台任务
- **通信机制**：Client 和 Daemon 通过 UNIX domain socket + 共享内存通信，零拷贝传递检查点数据引用

```
Node 0                          Node 1
┌──────────────────┐            ┌──────────────────┐
│ Training Process │            │ Training Process │
│ ┌──────────────┐ │            │ ┌──────────────┐ │
│ │ VELOC Client │ │            │ │ VELOC Client │ │
│ └──────┬───────┘ │            │ └──────┬───────┘ │
│        │ unix    │            │        │ unix    │
│        │ socket  │            │        │ socket  │
│ ┌──────▼───────┐ │            │ ┌──────▼───────┐ │
│ │ VELOC Active │ │            │ │ VELOC Active │ │
│ │ Backend      │ │            │ │ Backend      │ │
│ └──────┬───────┘ │            │ └──────┬───────┘ │
│        │         │            │        │         │
│  ┌─────▼─────┐   │            │  ┌─────▼─────┐   │
│  │ Local SSD │   │            │  │ Local SSD │   │
│  └───────────┘   │            │  └───────────┘   │
└────────┼─────────┘            └────────┼─────────┘
         │          Async Flush          │
         └──────────┐  ┌────────────────┘
                    ▼  ▼
            ┌───────────────┐
            │  Shared PFS   │
            │ (Lustre/GPFS) │
            └───────────────┘
```
*图：VELOC 多级架构。每个节点上的 Active Backend 守护进程独立地将本地 SSD 检查点异步刷写到共享 PFS，避免 I/O 风暴。*

**增量检查点与差分压缩**

DeepFreeze 利用 DL 训练的特殊性质进行优化：在训练后期，模型参数的变化量逐渐减小（梯度趋近于零）。通过对每个参数张量计算轻量级 hash（如 xxHash），DeepFreeze 可以快速检测哪些张量自上次检查点以来发生了变化，仅序列化和写入变化的部分。在微调（fine-tuning）场景下，通常只有少量层的参数发生显著变化，增量检查点可将写入量减少 50-90%。

此外，VELOC 支持可选的 LZ4 压缩，对浮点参数数据通常可获得 1.5-2x 的压缩比，进一步减少 I/O 量。

**实验评估关键结果**

论文在 ANL 的 Theta 超级计算机（Intel KNL 节点）和配备 NVIDIA GPU 的集群上进行了评估：

| 配置 | 模型 | 检查点大小 | 同步开销 | DeepFreeze 开销 |
|------|------|-----------|---------|----------------|
| 64 节点 | ResNet-50 | ~100 MB | 15-30s/ckpt | < 0.5s（快照） |
| 128 节点 | VGG-16 | ~550 MB | 45-90s/ckpt | < 2s（快照） |
| 256 GPU | ResNet-152 | ~240 MB | 30-60s/ckpt | < 1s（快照） |

- 在 256 GPU 规模下，同步检查点（直接写 PFS）的开销占训练时间的 10-25%，而 DeepFreeze 的开销低于 2%
- 随着节点数增加，同步方案的 I/O 竞争加剧导致开销超线性增长，而 DeepFreeze 的开销几乎不随规模变化（因为本地 SSD 写入无竞争）
- 增量检查点在微调场景下将写入量减少了 60-80%
- 恢复时间：从本地 SSD 恢复（Level-0）仅需数秒，从 PFS 恢复（Level-1）需要 10-30 秒

**与传统方法的对比**

| 维度 | 同步检查点 (tf.train.Saver) | DeepFreeze (VELOC) |
|------|---------------------------|-------------------|
| I/O 模式 | 同步阻塞，所有进程同时写 PFS | 异步流水线，本地 SSD + 后台刷写 |
| 训练停顿 | 每次检查点停顿数十秒 | 仅内存快照 ~ms 级停顿 |
| I/O 竞争 | 严重（N 个进程争抢 PFS 带宽） | 无（本地 SSD 写入） |
| 可扩展性 | 差（开销随节点数超线性增长） | 好（开销几乎不随规模变化） |
| 检查点频率 | 低（开销大，不敢频繁做） | 高（开销小，可每 100 步做一次） |
| 容错级别 | 仅 PFS 持久化 | 双级：本地 SSD（快）+ PFS（持久） |
| 增量支持 | 无（每次全量写入） | 有（hash 检测 + 差分写入） |
| 框架集成 | 原生但低效 | Hook/回调透明集成 |

> ⚠️ 局限性：DeepFreeze 依赖节点本地 SSD 作为 Level-0 存储，在无本地存储的云环境中需要退化为纯 PFS 模式。此外，VELOC 的 Active Backend 守护进程需要额外的系统资源（CPU 核心、内存），在资源紧张的环境中可能与训练进程竞争。

#### 🧪 练习题
```yaml
question: "DeepFreeze 实现接近零检查点开销的关键设计是什么？"
options:
  - "使用 GPU Direct RDMA 将模型参数直接从 GPU 显存写入远程存储"
  - "将检查点分解为同步内存快照和异步本地/远程持久化两个阶段，训练仅等待快照完成"
  - "通过模型并行将检查点数据分散到多个节点，每个节点只写自身分片"
  - "利用 NVMe over Fabrics 协议绕过文件系统直接写入存储设备"
answer: 1
explain: "DeepFreeze 的核心设计是将检查点操作分解为三个流水线阶段：（1）同步内存快照（memcpy，~ms级）、（2）异步本地 SSD 持久化、（3）异步远程 PFS 刷写。训练进程仅需等待极快的内存快照完成，后续 I/O 由 VELOC 后台线程/守护进程异步执行，因此检查点开销接近于内存拷贝时间，远小于训练步时间。"
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
CheckFreq 的核心目标是：两阶段机制,3.5%开销秒级恢复。

#### 🎯 核心要点
- 核心动机：两阶段机制,3.5%开销秒级恢复
- 代表机构：MSR

#### 🔬 深入细节
两阶段机制,3.5%开销秒级恢复


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
Check-N-Run 利用嵌入表的稀疏更新特性，结合差异检查点（仅存储修改过的嵌入向量）和自适应非对称量化（FP32→2-8bit），将 Facebook 生产环境中 TB 级推荐模型的检查点写入带宽降低 6-17×、存储容量降低 2.5-8×，且精度损失低于 0.01%。

#### 🎯 核心要点
- **问题背景**：Facebook 推荐模型 embedding table 占模型 >99%，单模型达 TB 级，标准压缩（Zstandard）仅 ~7% 压缩率
- **核心洞察**：30 分钟训练间隔内仅 ~26% 嵌入向量被修改；即使训练 110 亿样本后也仅 52% 被访问过
- **差异检查点**：三种策略——One-shot、Consecutive incremental、Intermittent differential（默认），仅存储修改过的向量
- **量化压缩**：对称/非对称/K-means/自适应非对称四种方案，最终采用自适应非对称量化（≤4bit）+ 朴素非对称（8bit）
- **动态 bit-width 选择**：根据预期故障恢复次数自动选择量化位宽（1次→2bit，≤3次→3bit，≤20次→4bit，>20次→8bit）
- **解耦架构**：GPU→CPU 快照仅需 ~7s（<0.4% 训练开销），量化+存储在 CPU 后台流水线执行
- **修改追踪**：per-GPU bit-vector 在前向传播中与 AlltoAll 通信重叠更新，<1% 开销，<0.05% 内存
- **总体效果**：写入带宽降低 6-17×，存储容量降低 2.5-8×，精度损失 <0.01%

#### 🔬 深入细节
**系统架构总览：**

```
┌─────────────────────────────────────────────────────────┐
│                   Check-N-Run 架构                       │
│                                                          │
│  ┌──────────────┐    Snapshot     ┌──────────────────┐  │
│  │  GPU Training │───(~7s stall)──▶│  CPU Background   │  │
│  │  (continues)  │                │  Processing       │  │
│  └──────────────┘                │                    │  │
│                                   │  ┌──────────────┐ │  │
│  ┌──────────────┐                │  │ Diff Engine   │ │  │
│  │  Bit-Vector   │──tracking───▶ │  │ (bit-vector   │ │  │
│  │  Tracker      │               │  │  comparison)  │ │  │
│  └──────────────┘                │  └──────┬───────┘ │  │
│                                   │         ▼         │  │
│  ┌──────────────┐                │  ┌──────────────┐ │  │
│  │  Controller   │──sync batch──▶│  │ Quantizer    │ │  │
│  │  (reader-     │   count       │  │ (adaptive    │ │  │
│  │   trainer)    │               │  │  asymmetric) │ │  │
│  └──────────────┘                │  └──────┬───────┘ │  │
│                                   │         ▼         │  │
│                                   │  ┌──────────────┐ │  │
│                                   │  │ Pipelined    │ │  │
│                                   │  │ Storage Write│ │  │
│                                   │  └──────────────┘ │  │
│                                   └──────────────────┘  │
└─────────────────────────────────────────────────────────┘
```
*图：Check-N-Run 系统架构。训练仅在 GPU→CPU 快照时短暂停顿（~7s），差异计算、量化和存储写入均在 CPU 后台流水线执行。*

**差异检查点伪代码：**

```python
# Check-N-Run 差异检查点 + 量化 核心流程

# === 1. 修改追踪（每个训练 iteration，与 AlltoAll 重叠） ===
def track_modifications(embedding_lookup_indices, bit_vector):
    """在前向传播中标记被访问/修改的嵌入向量"""
    for idx in embedding_lookup_indices:
        bit_vector[idx] = 1  # O(1) per access, overlapped with AlltoAll comm

# === 2. Intermittent Differential 策略（默认） ===
def should_take_full_baseline(interval_i, cumulative_sizes, incremental_size):
    """判断是否需要重置基线：当累积差异 ≥ 增量检查点总和时"""
    full_cost = 1 + sum(cumulative_sizes[:interval_i])  # 全量 + 历史增量
    incremental_cost = (interval_i + 1) * incremental_size  # 继续增量的成本
    return full_cost <= incremental_cost

# === 3. 检查点创建主流程 ===
def create_checkpoint(model, bit_vector, baseline, interval_i):
    # Step 1: GPU → CPU snapshot (training stalls ~7s)
    snapshot = copy_gpu_to_pinned_cpu(model.state_dict())
    # Training resumes immediately after snapshot

    # Step 2: Background - compute differential
    if should_take_full_baseline(interval_i, ...):
        checkpoint_data = snapshot  # Full baseline
        bit_vector.reset()
    else:
        modified_indices = bit_vector.get_set_bits()
        checkpoint_data = {idx: snapshot[idx] for idx in modified_indices}

    # Step 3: Background - quantize (chunk-by-chunk, pipelined with storage write)
    bit_width = select_bit_width(expected_failures)  # 动态选择: 2/3/4/8 bit
    for chunk in split_into_chunks(checkpoint_data):
        if bit_width <= 4:
            quantized = adaptive_asymmetric_quantize(chunk, bit_width)
        else:
            quantized = asymmetric_quantize(chunk, bit_width)
        write_to_remote_storage(quantized)  # Pipelined with next chunk quantization

# === 4. 自适应非对称量化 ===
def adaptive_asymmetric_quantize(vector, n_bits, num_bins=25, ratio=0.6):
    """贪心搜索最优 xmin, xmax 以最小化 L2 误差"""
    xmin, xmax = vector.min(), vector.max()
    original_range = xmax - xmin
    step_size = original_range / num_bins
    best_error, best_xmin, best_xmax = float('inf'), xmin, xmax

    while (xmax - xmin) > ratio * original_range:
        # 尝试两个方向的收缩
        error_shrink_min = l2_error(quantize(vector, xmin + step_size, xmax, n_bits), vector)
        error_shrink_max = l2_error(quantize(vector, xmin, xmax - step_size, n_bits), vector)

        if error_shrink_min < error_shrink_max:
            xmin += step_size
            if error_shrink_min < best_error:
                best_error, best_xmin, best_xmax = error_shrink_min, xmin, xmax
        else:
            xmax -= step_size
            if error_shrink_max < best_error:
                best_error, best_xmin, best_xmax = error_shrink_max, xmin, xmax

    return uniform_quantize(vector, best_xmin, best_xmax, n_bits)
```

**方法深入解读：**

**1. 动机与问题分析——为什么传统压缩对推荐模型无效？**

Facebook 的推荐模型（如 DLRM）核心由巨大的嵌入表（embedding table）构成，单个模型可达数 TB。这些嵌入表将稀疏的类别特征（如用户 ID、商品 ID）映射为稠密向量。在分布式训练中，嵌入表按行分片到不同 GPU（模型并行），而 MLP 层则数据并行。每 30 分钟需要做一次检查点以防故障，但 TB 级数据的写入对存储带宽和容量造成巨大压力。

传统通用压缩（如 Zstandard）对嵌入表几乎无效——因为嵌入向量是经过训练的浮点数，本质上是高熵数据，不存在通用压缩可利用的重复模式。实测仅获得 ~7% 的压缩率。然而，Check-N-Run 发现了一个关键特性：**嵌入表的更新是极度稀疏的**。在 30 分钟的训练间隔内，仅约 26% 的嵌入向量被修改（因为大部分用户/商品在短时间内不会出现在训练数据中）。即使训练了 110 亿个样本，也仅有 52% 的嵌入向量被访问过。这一洞察为差异检查点提供了理论基础。

> 💡 **关键洞察**：嵌入表的稀疏访问模式意味着大部分检查点数据与上一次完全相同——只需存储"变化的部分"即可大幅减少数据量。

**2. 差异检查点——三种策略的权衡与 Intermittent Differential 的设计智慧**

Check-N-Run 提出三种差异检查点策略，核心权衡是**写入带宽 vs 存储容量 vs 恢复复杂度**：

- **One-shot Differential**：保存一个完整基线 + 自基线以来所有修改的向量。优点是恢复简单（基线 + 最新差异），但差异会随时间单调增长，最终趋近全量。
- **Consecutive Incremental**：每次仅保存上一个间隔内修改的向量。写入带宽最优且稳定（每次 ~26%），但恢复需要读取所有历史检查点，且存储容量线性增长（11 个间隔后达 4× 模型大小）。适合在线学习（online training）场景，因为在线学习不需要回溯到很早的检查点。
- **Intermittent Differential（默认）**：结合前两者优点。使用历史预测器动态决定何时重置基线。判断条件为：当创建新全量基线的总成本 \(F_c = 1 + S_1 + ... + S_i\) 不超过继续增量的成本 \(I_c = (i+1) \cdot S_i\) 时，触发全量基线重置。实验中，该策略在第 8 个间隔自动触发重置，将存储容量控制在合理范围内。

修改追踪的实现非常精巧：每个 GPU 维护一个 bit-vector，在前向传播的嵌入查找阶段标记被访问的索引。由于嵌入查找与 AlltoAll 通信天然重叠（GPU 在等待远程嵌入返回时有空闲周期），追踪操作几乎不产生额外开销（<1% 训练吞吐量下降，<0.05% 内存开销）。

> ⚠️ **注意**：差异检查点本身不引入任何精度损失——所有被修改的数据都被完整保留。精度损失仅来自量化步骤。

**3. 自适应非对称量化——为什么比朴素方法好，又如何避免 K-means 的计算爆炸？**

量化是 Check-N-Run 的第二个压缩维度。核心思想是将 FP32 嵌入向量量化为低位整数。朴素的对称量化（以 0 为中心）效果不佳，因为嵌入向量的值分布通常不关于 0 对称。非对称量化（使用实际的 \(x_{min}\) 和 \(x_{max}\)）更好，但仍有问题：如果向量中存在少数极端值（outlier），它们会拉大量化范围，导致大部分正常值的量化精度下降。

K-means 非均匀量化理论上最优（为每个聚类中心分配一个量化值），但对 TB 级检查点需要 48 小时——完全不可行。Check-N-Run 的自适应非对称量化通过贪心搜索找到最优的 \(x_{min}\) 和 \(x_{max}\)：将原始范围分成 `num_bins` 个步长，每步尝试从两端收缩范围，选择 ℓ2 误差更小的方向。`ratio` 参数控制搜索范围（如 0.6 表示只搜索原始范围的 60%）。实验表明，25 bins + ratio=0.6 即可达到接近 K-means 的精度，而延迟仅为 K-means 的千分之一。

量化参数的自动选择也很巧妙：Check-N-Run 仅对检查点的 0.001% 进行采样量化，即可准确估计最优的 `num_bins` 和 `ratio` 参数，避免了全量搜索的开销。

$$
F_Q(x, x_{min}, x_{max}, n) = \text{round}\left(\frac{x - x_{min}}{x_{max} - x_{min}} \cdot (2^n - 1)\right) \cdot \frac{x_{max} - x_{min}}{2^n - 1} + x_{min}
$$

**4. 动态 bit-width 选择与端到端流水线**

量化误差在多次从检查点恢复时会累积。Check-N-Run 根据集群故障概率 \(p\)（从故障日志计算）估计训练期间的预期恢复次数，动态选择量化位宽：2-bit 允许 1 次恢复，3-bit 允许 3 次，4-bit 允许 20 次，8-bit 允许 100+ 次。如果实际故障超过预期，系统自动回退到 8-bit。

端到端流水线设计确保量化不阻塞训练：GPU→CPU 快照（~7s）是唯一的训练停顿点。之后，CPU 进程将检查点分块（chunk），每个 chunk 独立量化后立即写入远程存储，同时下一个 chunk 开始量化。由于远程存储写入通常是瓶颈，量化延迟被完全隐藏。

Reader-Trainer 同步机制解决了一个微妙问题：数据读取器（reader）需要知道每个检查点间隔内精确处理了多少个 batch，以便恢复时从正确位置继续。Check-N-Run 通过控制器在每个间隔结束时记录精确的 batch 计数，消除了"in-flight"数据的歧义。

#### 🧪 练习题
```yaml
question: "Check-N-Run 默认采用 Intermittent Differential 而非 Consecutive Incremental 策略的主要原因是什么？"
options:
  - "Consecutive Incremental 的写入带宽更高"
  - "Consecutive Incremental 需要保留所有历史检查点，存储容量线性增长"
  - "Consecutive Incremental 无法追踪嵌入向量的修改"
  - "Consecutive Incremental 会引入量化精度损失"
answer: 1
explain: "Consecutive Incremental 虽然每次写入量最小且稳定，但恢复需要读取所有历史检查点，导致存储容量快速增长（11个间隔后达4×模型大小），而 Intermittent Differential 通过动态重置基线将存储控制在合理范围。"
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
ByteCheckpoint 的核心目标是：10TB/s带宽,统一大模型检查点。

#### 🎯 核心要点
- 核心动机：10TB/s带宽,统一大模型检查点
- 演化来源：继承或改进自 checkfreq
- 代表机构：ByteDance

#### 🔬 深入细节
10TB/s带宽,统一大模型检查点


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
Universal Checkpointing 的核心目标是：原子结构,动态并行策略。

#### 🎯 核心要点
- 核心动机：原子结构,动态并行策略
- 演化来源：继承或改进自 bytecheckpoint
- 代表机构：学术研究

#### 🔬 深入细节
原子结构,动态并行策略


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
DALI 的核心目标是：GPU预处理,消除CPU瓶颈。

#### 🎯 核心要点
- 核心动机：GPU预处理,消除CPU瓶颈
- 代表机构：NVIDIA

#### 🔬 深入细节
GPU预处理,消除CPU瓶颈


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
AIStore 的核心目标是：集成ETL,存储节点直接数据增强。

#### 🎯 核心要点
- 核心动机：集成ETL,存储节点直接数据增强
- 代表机构：NVIDIA

#### 🔬 深入细节
集成ETL,存储节点直接数据增强


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
Quiver 的核心目标是：内容哈希+可替代命中,跨作业重用。

#### 🎯 核心要点
- 核心动机：内容哈希+可替代命中,跨作业重用
- 代表机构：Microsoft

#### 🔬 深入细节
内容哈希+可替代命中,跨作业重用


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
Baleen 的核心目标是：ML驱动准入与预取决策。

#### 🎯 核心要点
- 核心动机：ML驱动准入与预取决策
- 演化来源：继承或改进自 quiver
- 代表机构：CMU

#### 🔬 深入细节
ML驱动准入与预取决策


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
cedar 的核心目标是：统一ML输入管道优化框架。

#### 🎯 核心要点
- 核心动机：统一ML输入管道优化框架
- 演化来源：继承或改进自 dali
- 代表机构：学术研究

#### 🔬 深入细节
统一ML输入管道优化框架


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
Modyn 的核心目标是：动态数据集,端到端训练优化。

#### 🎯 核心要点
- 核心动机：动态数据集,端到端训练优化
- 演化来源：继承或改进自 cedar
- 代表机构：学术研究

#### 🔬 深入细节
动态数据集,端到端训练优化


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
Learned Index 的核心目标是：ML替代B+树,查询加速。

#### 🎯 核心要点
- 核心动机：ML替代B+树,查询加速
- 代表机构：Google

#### 🔬 深入细节
ML替代B+树,查询加速


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
NVMe-oF 的核心目标是：RDMA/TCP远程NVMe,DPU卸载。

#### 🎯 核心要点
- 核心动机：RDMA/TCP远程NVMe,DPU卸载
- 代表机构：NVM Express

#### 🔬 深入细节
RDMA/TCP远程NVMe,DPU卸载


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
ArcNeural 的核心目标是：向量+图+文档统一存储。

#### 🎯 核心要点
- 核心动机：向量+图+文档统一存储
- 代表机构：学术研究

#### 🔬 深入细节
向量+图+文档统一存储
