### NVLink/NVSwitch

```yaml
id: nvlink
name: NVLink/NVSwitch
full_name: NVLink高速互联 (NVLink/NVSwitch Interconnect)
year: '2016'
org: NVIDIA
paper_url: —
category: interconnect
parent: —
motivation: 私有高速协议支持数千GPU统一寻址
```

#### 📝 一句话总结

NVLink 提出了面向 NVIDIA GPU 的高带宽低延迟 scale-up 互联，解决 PCIe 在多 GPU 训练、推理、统一地址访问和频繁 collective 通信中的带宽瓶颈。NVSwitch 进一步把点到点 NVLink 扩展成交换式、近似非阻塞的全互联 GPU fabric，使 8 卡服务器到机架级 GPU 域都能以更稳定的带宽执行 AllReduce、all-to-all 和模型并行通信。

#### 🎯 核心要点

- NVLink 最早随 Pascal P100 时代进入数据中心 GPU 系统，用专用高速链路替代或补充 PCIe GPU-to-GPU 通信
- 链路语义面向 GPU load/store、peer memory access、CUDA UVA、NCCL collective 等软件栈，而不只是普通网卡报文
- 点到点 NVLink 可构建 mesh、hybrid cube mesh 等拓扑，但多 GPU 同时通信时每个 peer 的可用带宽会受连接数量和拓扑限制
- NVSwitch 是 NVLink fabric 的交换芯片，把多条 NVLink 端口接入 crossbar/packet switch，实现服务器内或机架内 GPU 全互联
- NVIDIA 官方资料给出 Hopper/HGX H100/H200 级系统中每 GPU 第四代 NVLink 最高 900 GB/s，8 GPU 搭配 NVSwitch 时任意 GPU 间可同时按该级别通信
- 后续 NVSwitch 加入 SHARP 类 in-network reduction/multicast 能力，减少 collective 操作在 GPU 端和链路上的重复数据移动
- 对大模型训练和推理尤其关键：tensor parallel、pipeline parallel、expert parallel、KV cache/activation 交换都依赖高带宽低延迟 GPU fabric

#### 🔬 深入细节

##### 核心示意图

![NVSwitch 与点到点互联带宽对比](https://developer-blogs.nvidia.com/wp-content/uploads/2024/08/gpu-to-gpu-bandwidth-nvswitch-comparison-b.png)
*图 1：NVIDIA Technical Blog 官方图，比较 8 GPU 点到点互联与通过 NVSwitch 形成全互联 fabric 的 GPU-to-GPU 带宽差异。*

##### 算法伪代码

```python
# NVLink/NVSwitch 上执行一次大张量 AllReduce 的抽象伪代码
def allreduce_tensor(tensor_shards, gpus, fabric):
    if fabric.kind == "nvswitch":
        # 交换式 fabric：每个 GPU 把分片送入 NVSwitch，交换芯片按目标 GPU 或
        # collective group 转发；支持 SHARP 的系统可在网络中做部分归约。
        for phase in ["reduce_scatter", "all_gather"]:
            for gpu in gpus:
                for chunk in tensor_shards[gpu].chunks:
                    route = fabric.crossbar_route(src=gpu, dst=chunk.owner)
                    if fabric.supports_sharp and phase == "reduce_scatter":
                        route.switch_reduce(op="sum", data=chunk)
                    else:
                        route.forward(data=chunk)
            fabric.barrier()
    else:
        # 点到点 NVLink/PCIe 拓扑：通常由 NCCL 选择 ring/tree，
        # 总带宽会受最慢边、hop 数和链路共享影响。
        rings = build_topology_aware_rings(gpus, fabric.links)
        for ring in rings:
            ring_reduce_scatter(tensor_shards, ring)
            ring_all_gather(tensor_shards, ring)
```

##### 方法机制解读

NVLink 的动机来自多 GPU 系统的通信密度。深度学习训练中的数据并行需要频繁 AllReduce 梯度，模型并行需要跨 GPU 传 activation、attention KV、专家路由或分片矩阵乘结果。若通信走 PCIe，GPU 计算吞吐增长后很容易出现“算得快、等数据”的情况。通信时间的下界可以粗略写成：

$$
T_{\text{comm}}\ge \frac{S}{B_{\text{effective}}}+T_{\text{latency}}
$$

其中 \(S\) 是传输字节数，\(B_{\text{effective}}\) 是拓扑、链路共享、协议效率共同决定的有效带宽。NVLink 的第一目标就是显著提高 GPU-to-GPU 的 \(B_{\text{effective}}\)，并降低主机 CPU/PCIe root complex 介入带来的路径开销。

点到点 NVLink 已经比 PCIe 更适合 GPU peer access，但当 GPU 数量增加时，全互联点线连接会迅速变复杂。以每 GPU 总连接带宽 \(B\)、节点数 \(N\) 粗略估算，如果没有交换结构且要给 \(N-1\) 个 peer 分配专用连接，单 peer 带宽容易退化为：

$$
B_{\text{peer,p2p}}\approx \frac{B}{N-1}
$$

这也是 NVIDIA 官方博客在 8 GPU 示例中强调的问题：点到点设计下每个 peer 的带宽会被拆分，而 NVSwitch 设计可以让每个 GPU 与任意其他 GPU 以完整 NVLink 级带宽通信。NVSwitch 的价值不是“又多了一根线”，而是把链路组织成交换式 fabric，降低拓扑对通信模式的限制。

从硬件看，NVSwitch 类似专为 NVLink 协议和 GPU 语义定制的高带宽交换芯片。GPU 的 NVLink 端口接入 switch，switch 内部 crossbar/路由逻辑把来自某个 GPU 的 flit 或 packet 转发到目标 GPU 端口。与普通以太网交换不同，NVSwitch 的设计目标是 scale-up：低延迟、短距离、高带宽、GPU 内存语义、NCCL collective 友好，而不是跨数据中心的长距离通用网络。

对 collective 来说，NVSwitch 改变的是拥塞和 hop 结构。传统 ring AllReduce 的理想通信量约为：

$$
T_{\text{ring}}\approx 2\cdot\frac{N-1}{N}\cdot\frac{S}{B_{\text{link}}}
$$

但实际 \(B_{\text{link}}\) 会被拓扑瓶颈、链路共享和并发流量拉低。NVSwitch 提供更均匀的 all-to-all 带宽后，NCCL 可以选择更高效的 ring/tree/channel 组合；在支持 SHARP 的后续 NVSwitch 中，部分 reduction 或 multicast 还能下沉到网络内部，减少 GPU 反复读写同一通信缓冲区。

软件层面，NVLink/NVSwitch 的收益通过 CUDA peer access、Unified Virtual Addressing、NCCL、NVSHMEM、UCX 和深度学习框架体现。应用通常不直接操作 switch，而是声明张量分片、通信组或 collective；库根据拓扑发现结果选择路径。大模型中的 tensor parallel 矩阵乘常需要每层交换 partial result，MoE 的 expert parallel 会产生 all-to-all token dispatch，推理服务还会在 batch、KV cache 和 pipeline stage 之间移动大量状态；这些模式都比传统数据并行更依赖高质量 scale-up fabric。

NVLink/NVSwitch 的演进也说明 GPU 系统瓶颈从单卡算力扩展到了机架内通信。官方资料中 Hopper 级第四代 NVLink 为每 GPU 900 GB/s，HGX H100/H200 使用 NVSwitch 形成 8 GPU 全互联；更新的 NVLink Switch 产品页继续把带宽和 GPU domain 扩展到 Blackwell、Rubin 级机架系统。虽然不同代际的链路数、带宽和 GPU 域规模不同，核心机制始终一致：用专用协议和交换结构把多 GPU 组织成一个高带宽、低延迟、通信模式更接近共享加速器的计算域。

> 💡 关键：NVLink 解决“GPU 之间怎么高速直连”，NVSwitch 解决“很多 GPU 如何同时互相高速通信且不被点到点拓扑拖慢”。

#### 🧪 练习题

```yaml
question: "NVSwitch 相比纯点到点 NVLink 拓扑的主要优势是什么？"
options:
  - "通过交换式 fabric 提供更均匀的全互联带宽，减少多 GPU 同时通信时的链路拆分和拓扑瓶颈"
  - "把 GPU 的矩阵乘单元替换成 CPU SIMD 单元"
  - "让所有通信都必须绕过 CUDA 和 NCCL，由用户手写交换机路由表"
  - "只提升单 GPU HBM 容量，不影响 GPU-to-GPU 通信"
answer: 0
explain: "点到点拓扑在 GPU 数增加时容易出现 per-peer 带宽下降和路径受限；NVSwitch 用专用交换芯片把 NVLink 端口组织成更接近非阻塞的 all-to-all fabric。"
```
