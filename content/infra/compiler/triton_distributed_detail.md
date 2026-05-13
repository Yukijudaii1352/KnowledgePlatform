### Triton-Distributed — 分布式AI系统重叠内核编译器

```yaml
id: triton_distributed
name: Triton-Distributed
full_name: "分布式AI系统通信-计算重叠内核编译器 (Triton-Distributed: Programming Distributed Systems with the Triton Compiler)"
year: 2026
org: Community (ByteDance Seed, Tsinghua University, etc.)
paper_url: "https://arxiv.org/abs/2504.19442"
category: tensor_ir
parent: triton
motivation: "原生通信-计算重叠优化，64卡44x加速"
```

#### 📝 一句话总结

Triton-Distributed 将 OpenSHMEM 单边通信原语原生集成到 Triton 编译器中，提出 MPMD 编程模型（对称内存 + 信号交换 + 异步任务），使开发者仅用数百行 Python 代码即可编写计算-通信重叠内核，在 Nvidia/AMD GPU 上覆盖 AllGather、ReduceScatter、AllToAll 等 12 种分布式算子，性能达到或超越 FLUX、DeepEP 等手写 CUDA 实现。

#### 🎯 核心要点

- **首个原生支持通信-计算重叠的编译器**：在 Triton 编译栈中集成分布式通信能力，覆盖 13 项重叠优化技术（对比 FLUX 缺 4 项、NCCL 缺 7 项）
- **MPMD 编程模型**：基于三个核心概念——对称内存（Symmetric Memory）、信号交换（Signal Exchange）、异步任务（Async-Tasks），将通信与计算统一在 Python 级 DSL 中
- **OpenSHMEM 单边通信标准**：采用 `put/get/signal_set/signal_wait` 等 PGAS 原语，避免传统 MPI 双边通信的同步开销
- **拓扑感知 Tile Swizzle**：针对 Nvidia NVSwitch 和 AMD 全网格拓扑设计不同的 tile 调度策略，最大化互联带宽利用率
- **低延迟协议（LL Protocol）**：利用 `multimem_st` 广播指令和 8 字节原子 store/load 实现 \(\mu s\) 级 AllGather，适用于推理场景
- **跨平台支持**：同一编程模型同时支持 Nvidia H800 和 AMD MI308X GPU，编译栈通过 bitcode 库适配不同后端
- **12 种优化内核**：涵盖 AG+GEMM、GEMM+RS、AG+MoE、MoE+RS、FlashDecode+AG、AllToAll 的节点内/跨节点变体，最高达 44.97× 加速（vs NCCL/RCCL）

#### 🔬 深入细节

##### 1. 问题背景与动机

在大规模分布式 AI 训练和推理中，计算（GEMM、Attention 等）与通信（AllGather、ReduceScatter、AllToAll）的重叠是提升端到端性能的关键。然而，现有方案存在以下问题：

| 方案 | 问题 |
|------|------|
| PyTorch + NCCL | 计算与通信完全串行，无重叠 |
| FLUX (手写 CUDA) | 高性能但代码量巨大、难以维护、仅支持 Nvidia |
| DeepEP | 数千行 CUDA 实现 AllToAll，极难移植 |
| TileLink | 编译器方案但不支持跨节点通信 |

> 💡 **核心洞察**：通信-计算重叠需要在**编译器层面**原生支持，而非在应用层手动拼接。Triton-Distributed 是首个将分布式通信作为一等公民集成到 tile-level 编译器中的系统。

##### 2. 系统架构与编译栈

![Triton-Distributed 编译栈](https://arxiv.org/html/2504.19442v1/x2.png)
*图：Triton-Distributed 编译流程——从 Python DSL 到多后端 GPU 代码*

编译流程分为四层：

1. **Python DSL 层**：用户使用 `@triton.jit` 装饰器编写内核，调用 `tl.extra.cuda.experimental_device_tensormap_create2d` 等通信原语
2. **Triton IR 层**：通信原语被 lower 为 Triton IR 中的 `ExternElementwiseOp`
3. **LLVM IR 层**：通信原语通过链接预编译的 **bitcode 库**（包含 NVSHMEM/ROC_SHMEM 实现）转化为设备特定的 LLVM IR
4. **后端代码生成**：LLVM IR 编译为 PTX（Nvidia）或 AMDGCN（AMD）

> ⚠️ **关键设计**：通信原语不在 Triton IR 层做特殊处理，而是通过 bitcode 库在 LLVM IR 层链接，这使得添加新原语只需扩展 bitcode 库，无需修改编译器前端。

##### 3. MPMD 编程模型的三个核心概念

```python
# === 核心概念 1: 对称内存 (Symmetric Memory) ===
# 所有 rank 分配相同虚拟地址的共享内存区域
T = symm_alloc(size)          # 每个 rank 分配对称内存
remote_ptr = remote_ptr(T, r) # 获取 rank r 上 T 的远程指针
# 可直接读写远程 rank 的内存，无需对端参与

# === 核心概念 2: 信号交换 (Signal Exchange) ===
S = symm_alloc(signal_size)   # 信号也存储在对称内存中
set_signal(S + rank)          # 设置本地信号（通知数据就绪）
wait_signal(S + r)            # 等待远程 rank 的信号
# 信号机制实现生产者-消费者同步

# === 核心概念 3: 异步任务 (Async-Tasks) ===
# 不同 threadblock 映射到不同角色
if BLOCK_ID < num_comm_blocks:
    # 通信任务：负责数据搬运
    comm_task(...)
else:
    # 计算任务：负责 GEMM 等计算
    compute_task(...)
# 通信和计算在硬件上空间并行执行
```

> 💡 **MPMD vs SPMD**：传统 Triton 采用 SPMD（所有 threadblock 执行相同程序），Triton-Distributed 采用 MPMD（不同 threadblock 可执行不同程序），这是实现通信-计算重叠的关键——通信 threadblock 和计算 threadblock 可以并行工作。

##### 4. 通信原语体系

Triton-Distributed 的通信原语分为两类：

**OpenSHMEM 标准原语**（可移植）：

| 原语 | 功能 |
|------|------|
| `shmem_put` / `shmem_get` | 单边远程写/读 |
| `shmem_signal_set` / `shmem_signal_wait` | 信号设置/等待 |
| `shmem_barrier_all` | 全局屏障同步 |
| `shmem_fence` | 内存栅栏 |

**非标准原语**（平台特定，高性能）：

| 原语 | 功能 | 用途 |
|------|------|------|
| `consume_token` | 无副作用的数据依赖 | 建立编译器可见的依赖链 |
| `notify` | 轻量级通知 | 替代重量级 barrier |
| `multimem_st` | NVLink 广播写 | 1.5μs 内广播到节点内所有 rank |
| `atomic_add` | 远程原子加 | ReduceScatter 中的远程归约 |

##### 5. AllGather 的 Push 与 Pull 模式

```python
# ===== Push 模式 AllGather (Algorithm 1) =====
# 每个 rank 主动将本地数据推送到所有其他 rank
def allgather_push(T, S, L, RANK, WORLD_SIZE):
    # 1. 将本地数据 L 复制到对称内存 T 的对应位置
    T[RANK * L.size : (RANK+1) * L.size] = L
    set_signal(S[RANK])           # 通知本地数据就绪
    barrier_all()                  # 确保所有 rank 可见

    # 2. 将本地数据推送到每个远程 rank
    for r in range(WORLD_SIZE):
        if r != RANK:
            remote_buf = remote_ptr(T, r) + RANK * L.size
            remote_buf[:] = L              # 单边写入远程内存
            set_signal(S[r] + RANK)        # 通知远程 rank

# ===== Pull 模式 AllGather (Algorithm 2) =====
# 每个 rank 主动从所有其他 rank 拉取数据
def allgather_pull(T, S, L, RANK, WORLD_SIZE):
    T[RANK * L.size : (RANK+1) * L.size] = L
    set_signal(S[RANK])
    barrier_all()

    for r in range(WORLD_SIZE):
        if r != RANK:
            remote_buf = remote_ptr(T, r) + r * L.size
            local_dst = T + r * L.size
            local_dst[:] = remote_buf[:]   # 从远程拉取
            set_signal(S[r])
```

> 💡 **Push vs Pull 权衡**：Push 模式省去同步开销但数据到达顺序不可控；Pull 模式需要 barrier 确保远程数据就绪但可精确控制读取顺序。实际选择取决于下游计算是否需要特定数据顺序。

##### 6. 低延迟 AllGather（推理场景）

推理场景中消息尺寸小，传播延迟是主要瓶颈。论文提出两项关键优化：

**Multimem 广播**：利用 Nvidia PTX 的 `multimem_st` 指令，一次写操作即可将数据广播到节点内所有 rank，耗时约 1.5μs（vs 循环 P2P 最差 1.5μs × 多跳）。

**LL（Low-Latency）协议**：利用 GPU 8 字节 store/load 的跨 rank 原子性，将数据和标志位打包在 8 字节中一起发送：

$$\text{LL\_packet} = [\underbrace{\text{data}}_{\text{4 bytes}} \| \underbrace{\text{flag}}_{\text{4 bytes}}]$$

接收端通过自旋锁检查 flag 是否等于期望值来判断数据是否到达，避免了额外的信号操作开销。

> ⚠️ **LL 协议的代价**：消息大小翻倍（因为 flag 占一半空间），因此仅适用于小消息场景。大消息仍使用标准 OpenSHMEM 原语。

##### 7. 拓扑感知 Tile Swizzle 策略

Tile Swizzle 是控制 threadblock 到 tile 坐标映射顺序的优化，直接影响通信-计算重叠效率。

**Nvidia H800（NVSwitch 拓扑）**：任意两个 GPU 间带宽均为 200 GB/s，因此每步只需从一个 rank 拉取数据即可达到峰值带宽。Swizzle 策略为：每个 rank 从不同起始位置开始计算，逐步轮转拉取下一个 rank 的数据。

**AMD MI308X（全网格拓扑）**：每条链路仅 50 GB/s，需要同时从所有 7 个 rank 拉取数据才能达到聚合带宽 350 GB/s。Swizzle 策略为：将每个 chunk 进一步切分为 sub-chunk，每步同时从所有 rank 拉取一组 sub-chunk。

```
Nvidia Swizzle (4 ranks):
  Step 1: Rank0→本地, Rank1→从Rank0拉, Rank2→从Rank1拉, Rank3→从Rank2拉
  Step 2: Rank0→从Rank3拉, Rank1→本地, Rank2→从Rank0拉, Rank3→从Rank1拉
  ...（轮转）

AMD Swizzle (4 ranks, 从 Rank0 视角):
  Step 1: 同时从 Rank1/2/3 拉取 sub-chunk_0
  Step 2: 同时从 Rank1/2/3 拉取 sub-chunk_1
  ...（并行拉取）
```

##### 8. 跨节点 GEMM+ReduceScatter 重叠

跨节点 GEMM+RS 是最复杂的重叠场景，分解为三个流水线阶段：

$$\text{GEMM+RS}_{\text{inter}} = \underbrace{\text{GEMM}}_{\text{Stage 1}} \rightarrow \underbrace{\text{Intra-Scatter}}_{\text{Stage 2}} \rightarrow \underbrace{\text{Inter-Reduce}}_{\text{Stage 3}}$$

1. **Stage 1 (GEMM)**：计算产生 tile 级输出
2. **Stage 2 (Intra-node Scatter)**：通过 NVLink 将 tile 数据分发到节点内其他 rank（每个 rank 执行 7 次远程写 + 1 次本地拷贝，重复 2 次对应 2 个节点）
3. **Stage 3 (Inter-node Reduce)**：通过 IB 网络进行跨节点归约

Swizzle 设计的关键是将 Stage 2 的本地拷贝步骤放在末尾，使得远程传输可以与计算最大程度重叠。

##### 9. 性能评估

在 H800 和 MI308X GPU 集群上的关键性能数据：

| 内核 | 硬件 | 对比基线 | 加速比 |
|------|------|----------|--------|
| AG+GEMM-inter | 16×H800 | PyTorch+NCCL | 1.33× |
| GEMM+RS-inter | 16×H800 | PyTorch+NCCL | 1.42× |
| AG+MoE-inter | 16×H800 | PyTorch+NCCL | **26.50×** |
| MoE+RS-inter | 16×H800 | PyTorch+NCCL | 5.16× |
| AllToAll Dispatch | 8-64×H800 | DeepEP | 1.18× |
| AllToAll Combine | 8-64×H800 | DeepEP | 1.44× |
| AG+GEMM-intra | 8×MI308X | PyTorch+RCCL | 1.09× |
| GEMM+RS-intra | 8×MI308X | PyTorch+RCCL | 1.16× |
| Low-latency AG (PCIe) | 8×L20 | NCCL | **3.11×** |
| Low-latency AG (PCIe) | 16×L20 | NVSHMEM-64bit | 1.31× |

> 💡 **开发效率对比**：AllToAll 内核仅用数百行 Python 代码实现，而 DeepEP 需要数千行 CUDA 代码，且 Triton-Distributed 版本性能持平甚至更优。

##### 10. 与现有方案的重叠能力对比

论文定义了 13 项重叠优化技术，各方案覆盖情况：

| 优化技术 | Triton-Distributed | FLUX | NCCL | TileLink |
|----------|:--:|:--:|:--:|:--:|
| Intra-node Swizzle | ✅ | ✅ | ❌ | ✅ |
| Inter-node Swizzle | ✅ | ✅ | ❌ | ❌ |
| NUMA Swizzle | ✅ | ❌ | ❌ | ❌ |
| Copy Engine | ✅ | ✅ | ✅ | ✅ |
| High-BW Link | ✅ | ✅ | ✅ | ✅ |
| Network Comm | ✅ | ✅ | ✅ | ❌ |
| PCIe Comm | ✅ | ❌ | ✅ | ❌ |
| OpenSHMEM | ✅ | ❌ | ❌ | ❌ |
| Low-latency Protocol | ✅ | ❌ | ❌ | ❌ |
| Multimem | ✅ | ✅ | ❌ | ❌ |
| Fusion | ✅ | ✅ | ❌ | ✅ |
| CodeGen | ✅ | ❌ | ❌ | ✅ |
| Nvidia + AMD | ✅ | ❌ | ❌ | ❌ |
| **覆盖数** | **13/13** | **9/13** | **6/13** | **6/13** |

#### 🧪 练习题

```yaml
question: "Triton-Distributed 在 AMD MI308X GPU 上的 AllGather GEMM Swizzle 策略与 Nvidia H800 的关键区别是什么？"
options:
  - "AMD 使用 Push 模式而 Nvidia 使用 Pull 模式"
  - "AMD 每步只从一个 rank 拉取数据以避免链路冲突"
  - "AMD 每步同时从所有 rank 拉取 sub-chunk 以充分利用聚合带宽"
  - "AMD 不需要 Swizzle 优化因为全网格拓扑天然均衡"
answer: 2
explain: "AMD MI308X 采用全网格拓扑，每条链路仅 50 GB/s，需同时利用所有 7 条链路（聚合 350 GB/s）才能达到峰值带宽，因此每步需从所有 rank 并行拉取 sub-chunk；而 Nvidia H800 通过 NVSwitch 任意两卡间即可达 200 GB/s 峰值，每步只需从一个 rank 拉取即可。"
```