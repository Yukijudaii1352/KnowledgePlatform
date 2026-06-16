### NVMe-oF

```yaml
id: nvmeof
name: NVMe-oF
full_name: NVMe over Fabrics (NVMe-oF)
year: '2016'
org: NVM Express
paper_url: https://nvmexpress.org/developers/nvme-of-specification/
category: emerging
parent: —
motivation: RDMA/TCP远程NVMe,DPU卸载
```

#### 📝 一句话总结

NVMe-oF 将本地 PCIe NVMe 的队列、命令集和控制器模型扩展到 RDMA、Fibre Channel、TCP 等网络 fabric 上，让主机以接近本地 NVMe 的语义访问远端 SSD 或存储系统。

#### 🎯 核心要点

- 2016 年 NVMe-oF 1.0 首次发布，将 NVMe 命令传输扩展到 Ethernet、Fibre Channel、InfiniBand 和 RDMA 等 fabric
- 保留 NVMe Base 的 Admin/I/O Command Sets、Submission Queue/Completion Queue 和 namespace/controller 抽象
- 引入 Fabrics Command Set：Connect、Disconnect、Property Get、Property Set、Authentication 等用于远程连接和控制器属性访问
- 用 capsules 承载命令和响应，用 SGL 描述数据缓冲区，替代 PCIe 本地 PRP/MMIO doorbell 依赖
- 支持三类传输模型：memory、message、message/memory；PCIe 属于 memory，FC/TCP 属于 message，RDMA 属于 message/memory
- Discovery Controller/Discovery Log 让主机发现可访问的 NVM subsystem、NQN、transport address 和多路径
- 每个 I/O Submission Queue 与 Completion Queue 一对一映射，最多支持 \(2^{16}-1\) 条 I/O 队列和每队列 \(2^{16}-1\) 个 outstanding commands
- 现代实现常把 target datapath 卸载到 SmartNIC/DPU，通过 RDMA zero-copy、TCP offload 或 SPDK poll-mode 降低 CPU 开销

#### 🔬 深入细节

![NVMe transport models](https://infohub.delltechnologies.com/static/media/9198938f-8c47-5a0e-82d9-6db6a62cd3f7/DAM-d11da6ca-bf33-4378-b76c-5e1173bfe7af/out/7179.008.png)
*图：NVMe transport 类型：PCIe 使用共享内存模型，FC/TCP 使用消息模型，RDMA 使用消息/内存混合模型。图片来源：Dell Technologies InfoHub；协议依据为 NVM Express NVMe-oF 规格。*

```python
# NVMe-oF 主机侧连接与 I/O 伪代码
def nvmeof_mount(traddr, host_nqn):
    discovery = connect_discovery_controller(traddr, host_nqn)
    entries = discovery.get_log_page("Discovery Log")

    for entry in entries:
        admin_q = fabrics_connect(
            nqn=entry.subsystem_nqn,
            trtype=entry.transport_type,
            traddr=entry.transport_address,
            qid=0,              # Admin Queue
        )
        admin_q.property_set("CC.EN", 1)
        namespaces = admin_q.identify_namespaces()

        io_queues = []
        for qid in range(1, choose_queue_count()):
            io_queues.append(fabrics_connect(entry.subsystem_nqn, entry.transport_type, entry.transport_address, qid))

        return NvmeRemoteController(admin_q, io_queues, namespaces)

def submit_read(ctrl, nsid, lba, nblocks, host_buffer):
    q = pick_io_queue()
    capsule = NvmeCommandCapsule(opcode="READ", nsid=nsid, lba=lba, nblocks=nblocks, sgl=host_buffer)
    q.submit(capsule)
    return q.poll_completion(capsule.command_id)
```

NVMe-oF 的设计目标不是发明新的块协议，而是把 NVMe Base 里的低延迟队列模型跨越 PCIe 边界。主机仍然面对 namespace、controller、Admin/I/O command 等 NVMe 概念；差异在于原先依赖 PCIe MMIO 寄存器、doorbell 和本地内存地址的部分，被抽象成 fabric 上可传输的属性、capsule 和 SGL。一个端到端远程读的延迟可拆成：

$$
T_{read} = T_{host\_queue} + T_{transport} + T_{target\_queue} + T_{ssd} + T_{completion}
$$

协议优化的重点是让 \(T_{transport}\)、\(T_{target\_queue}\) 和 \(T_{completion}\) 尽量小，同时保留 NVMe 本地多队列并行性。

连接流程由 Discovery 和 Connect 驱动。主机先连接 Discovery Controller，读取 Discovery Log，得到目标 subsystem 的 NQN、transport type、address、service id 等信息；随后对目标 subsystem 发起 Fabrics Connect。Admin Queue 的 Connect 建立 host 与 controller 的 association，I/O Queue 的 Connect 建立数据面队列。由于 fabric 不再使用 PCIe 的 Create I/O Submission Queue / Create I/O Completion Queue 命令，队列创建语义被转移到 Fabrics Connect/Disconnect。

数据传输靠 capsule 和 SGL。命令 capsule 至少包含 64B SQE，响应 capsule 至少包含 16B CQE；小数据可以随 capsule 走，大数据则由 SGL 指向 host 或 target 的缓冲区。对 RDMA 这类 message/memory transport，命令/响应用消息传递，数据可通过 RDMA read/write 直接搬运，减少拷贝和 CPU 介入；对 TCP，命令与数据封装在可靠 TCP 字节流中，部署门槛低但需要更强的软件或 NIC offload 来控制 CPU 开销。

NVMe-oF 与本地 NVMe 有几处关键差异。首先，I/O SQ 和 CQ 一对一映射，不支持多个 SQ 共享一个 CQ；其次，fabric 环境没有由 NVMe 控制器直接产生的 PCIe interrupt，主机 fabric interface 负责通知；再次，NVMe-oF 不支持 PRP，Admin、I/O 和 Fabrics commands 都要求使用 SGL。其并行能力仍可用队列规模表达：

$$
Q_{max} = 2^{16} - 1,\qquad D_{max} = 2^{16} - 1
$$

其中 \(Q_{max}\) 是每控制器最大 I/O 队列数，\(D_{max}\) 是单队列最大 outstanding command 数。实际系统会按 CPU 核、NIC 队列、target poller 和 SSD 并发度选择远小于上限的队列数。

从系统角度看，NVMe-oF 把“本地盘”变成可池化、可多路径的远程块设备。存储阵列可以把多个 SSD 暴露为 NVM subsystem，多个 host 通过不同 controller 访问 namespace，配合 ANA/multipath 做路径选择与故障切换。DPU/SmartNIC 卸载的价值也来自这里：让 Connect、queue pair、RDMA/TCP 数据搬运、加密和 target poller 尽量靠近网卡执行，主机 CPU 保留给应用。

> ⚠️ 注意：NVMe-oF 提供远程块访问语义，不自动解决分布式一致性、文件系统共享写入或应用级事务；多主机共享 namespace 时仍需要 reservation、集群文件系统或上层协调。

#### 🧪 练习题

```yaml
question: "NVMe-oF 为什么需要 Fabrics Connect 命令？"
options:
  - "因为远程 fabric 不使用 PCIe 的队列创建和 MMIO doorbell 机制，需要用协议命令建立 Admin/I/O 队列关联"
  - "因为 NVMe-oF 取消了 NVMe Admin Command Set"
  - "因为 TCP 无法保证字节流可靠传输"
  - "因为所有 NVMe-oF 数据都必须经过文件系统缓存"
answer: 0
explain: "NVMe-oF 保留 NVMe 队列模型，但远程连接不能依赖 PCIe 本地寄存器，因此用 Fabrics Connect/Disconnect 建立和删除控制器队列关联。"
```
