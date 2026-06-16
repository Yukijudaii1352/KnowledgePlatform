### CXL

```yaml
id: cxl
name: CXL
full_name: 计算快速链接 (Compute Express Link)
year: '2024'
org: CXL Consortium
paper_url: https://dl.acm.org/doi/abs/10.1145/3669900
category: interconnect
parent: —
motivation: 基于PCIe 5.0的缓存一致性开放互联标准
```

#### 📝 一句话总结

CXL 提出了运行在 PCIe 物理层之上的开放一致性互联标准，用 CXL.io、CXL.cache 和 CXL.mem 三类协议把 CPU、加速器、SmartNIC、内存扩展器和持久化内存接入同一可缓存、可 load/store 的系统地址空间。它解决了传统 PCIe 设备需要 DMA 拷贝、软件维护一致性和内存资源孤岛化的问题，是数据中心内存扩展、内存池化和异构加速的重要基础。

#### 🎯 核心要点

- 复用 PCIe 5.0 物理/电气层和链路训练生态，同时在其上动态复用 CXL.io、CXL.cache、CXL.mem
- CXL.io 提供设备发现、配置、寄存器访问、中断、DMA 和虚拟化等 PCIe 类语义
- CXL.cache 允许设备一致性地访问并缓存主机内存，适合 SmartNIC、PGAS NIC 和无本地主存的加速器
- CXL.mem 允许主机以 load/store 方式访问设备附加内存，适合内存扩展、内存层级和持久化内存
- 三类设备模型：Type 1 使用 CXL.io + CXL.cache，Type 2 使用三种协议，Type 3 使用 CXL.io + CXL.mem
- CXL 2.0 引入交换、设备分区和内存池化，CXL 3.0/3.1 进一步扩展到 fabric、PBR 路由、共享内存和点到点访问
- CPU host 通常承担全局一致性管理，降低设备侧实现完整处理器一致性协议的复杂度

#### 🔬 深入细节

##### 核心示意图

![CXL 动态复用协议与主机一致性逻辑](https://static.wixstatic.com/media/0c1418_50aaa73344844a6780e3a5e238e20e03~mv2.png/v1/fill/w_740%2Ch_333%2Cal_c%2Cq_85%2Cusm_0.66_1.00_0.01%2Cenc_auto/0c1418_50aaa73344844a6780e3a5e238e20e03~mv2.png)
*图：CXL Consortium 官方博客中的协议示意图。图中 CXL.io、Cache、Memory 在 PCIe/CXL 逻辑 PHY 上动态复用，主机侧的 coherence and memory logic 负责协调 CPU cache、host memory 与设备内存。*

##### 协议流程伪代码

```python
# CXL 设备枚举、HDM 映射与一致性访问的简化流程
def boot_cxl_system(root_ports):
    for port in root_ports:
        dev = cxl_io_enumerate(port)             # CXL.io: PCIe-like discovery/config
        if dev.type in {"type2", "type3"}:
            hdm_range = program_hdm_decoder(dev) # Host-managed Device Memory
            os_numa_add_memory(hdm_range, latency_class="cxl")
        if dev.type in {"type1", "type2"}:
            enable_cxl_cache_coherence(dev)


def cpu_load(address):
    if address in local_dram_range:
        return host_memory_controller.read(address)

    if address in cxl_hdm_decoder:
        line = host_coherence_agent.lookup(address)
        if line.is_dirty_in_cpu_cache():
            line = writeback_or_forward(line)
        # CXL.mem: 主机向设备内存发送 64B cache-line 粒度读请求
        return cxl_mem_read(address, size=64)


def device_read_host_memory(device, address, mode):
    req = "RdShared" if mode == "read_only" else "RdOwn"
    send_cxl_cache_request(device, req, address)  # CXL.cache: 设备作为请求方
    host_coherence_agent.snoop_cpu_caches(address)
    go, data = host_return_go_and_data(address)
    device.cache.fill(address, data, state=go.cache_state)
```

##### 方法机制解读

CXL 的核心动机来自两个同时出现的瓶颈：一方面，CPU 封装和主板走线限制了 DDR 通道数量，服务器核心数和模型规模继续增长时，本地 DRAM 容量/带宽难以线性扩展；另一方面，GPU、FPGA、SmartNIC 和存储设备各自带有本地内存，传统 PCIe 只能通过 DMA 或 MMIO 交换数据，数据在 host DRAM、device memory 和软件缓冲区之间反复拷贝。一旦 CPU cache 中还有旧副本，设备写入 host memory 还要依靠驱动、IOMMU、pin page、flush/invalidate 等软件路径维护一致性，延迟和复杂度都很高。

CXL 的第一层设计是“借 PCIe 的物理生态，但替换关键语义”。CXL.io 基本保留 PCIe 的枚举、配置和 I/O 能力，保证设备能像 PCIe endpoint 一样被发现和管理；CXL.cache 和 CXL.mem 则走更低延迟的 cache-line 语义。可以把一次地址访问的路由抽象为：

$$
\operatorname{route}(a)=
\begin{cases}
\text{DDR/host memory controller}, & a\in A_{\text{local}} \\
\text{CXL.mem endpoint}, & a\in A_{\text{HDM}} \\
\text{CXL.cache request to host}, & a\in A_{\text{host}}\land requester=\text{device}
\end{cases}
$$

其中 \(A_{\text{HDM}}\) 是 host-managed device memory，由 HDM decoder 把 host physical address 的某些区间映射到 Type 2/Type 3 设备。对软件而言，这段空间可以被 NUMA、内存热插拔或 tiered memory 策略管理；对硬件而言，访问会被转换成 CXL.mem 事务并在设备内存控制器上完成。

CXL.cache 解决的是设备访问 host memory 时的一致性问题。设备发起 `RdShared`、`RdOwn` 或写回类请求后，主机一致性代理负责 snoop CPU cache、处理脏行转移，并返回 `GO` 许可与数据。设备不需要实现完整 CPU-to-CPU coherence mesh，只需要遵守 CXL 定义的通道、credit 和状态转换。这种不对称一致性很关键：host 仍是 coherence home，设备得到受控的 cache 能力，因此 SmartNIC 可以直接读取主机队列，FPGA 可以直接消费主机缓冲区，避免传统 DMA 路径中的 staging copy。

CXL.mem 则让主机把设备内存当成可寻址内存层级。一个 Type 3 内存扩展器没有设备 cache，只暴露 DDR、PMem 或其他介质；CPU 访问其地址时，host cache miss 会转成 CXL.mem read/write。访问成本可以粗略写成：

$$
T_{\text{CXL load}}\approx T_{\text{LLC miss}}+T_{\text{serdes}}+T_{\text{switch}}+T_{\text{device controller}}+T_{\text{media}}
$$

它通常高于本地 DRAM，但远低于 SSD/page fault 级路径；同时 CXL x8/x16 链路能提供接近内存通道量级的带宽。系统软件的关键任务因此不是“所有页面都放 CXL”，而是根据热度、带宽和容量需求把冷页、大模型权重、内存池或共享缓冲放到合适的 CXL tier。

三类设备模型把协议组合和系统职责固定下来。Type 1 只有 CXL.cache，典型是无 host-visible 本地内存的 SmartNIC；Type 2 同时有 cache 和 memory，典型是带 HBM/DDR 的 GPU、FPGA 或专用加速器，主机可通过 CXL.mem 放置输入，设备可通过 CXL.cache 访问 host 缓冲；Type 3 只暴露内存，是内存扩展和池化的主力。CXL 2.0 的 switch、logical device 和 pooling 让多个 host 可以分区使用一组内存设备；CXL 3.0/3.1 的 fabric 和 PBR 则进一步把单机扩展推向 rack/pod 级共享内存。

> 💡 关键：CXL 不是“更快的 PCIe DMA”，而是把外设内存和外设 cache 纳入主机一致性与地址管理体系，使数据移动从显式拷贝变成 cache-line 粒度的 load/store 与 coherence 事务。

#### 🧪 练习题

```yaml
question: "CXL.cache 和 CXL.mem 的核心区别是什么？"
options:
  - "CXL.cache 让设备一致性访问并缓存主机内存，CXL.mem 让主机访问设备附加内存"
  - "CXL.cache 只负责设备枚举，CXL.mem 只负责中断投递"
  - "CXL.cache 替代 PCIe 物理层，CXL.mem 替代 DDR 颗粒协议"
  - "CXL.cache 只能用于 Type 3 内存扩展器，CXL.mem 只能用于 SmartNIC"
answer: 0
explain: "CXL.cache 的请求方通常是设备，用于访问 host memory；CXL.mem 的请求方通常是 host，用于访问 host-managed device memory。"
```
