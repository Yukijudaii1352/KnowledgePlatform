### GPUDirect Storage (GDS)

```yaml
id: gds
name: GPUDirect Storage
full_name: GPUDirect Storage
year: 2020
org: NVIDIA
paper_url: https://docs.nvidia.com/gpudirect-storage/
category: object_storage
parent: —
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