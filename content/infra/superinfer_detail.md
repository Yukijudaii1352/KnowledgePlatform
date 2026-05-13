### SuperInfer — Token-Level KV Cache Scheduling for Long-Context LLM Inference

```yaml
id: superinfer
name: SuperInfer
full_name: "SuperInfer: Token-Level KV Cache Scheduling for Long-Context LLM Inference on Heterogeneous GPU-CPU Systems"
year: "2025"
org: "HKUST, HKUST(GZ), Tsinghua University"
paper_url: "https://arxiv.org/abs/2601.20309"
category: "inference_system"
parent: "—"
motivation: "通过 token 级 KV cache 调度与双向 PCIe 传输优化，在 GPU-CPU 异构系统上实现长上下文 LLM 推理的低延迟 KV cache offloading"
```

#### 📝 一句话总结

SuperInfer 提出了 **RotaSched**（基于 Virtual Loading Time 的 token 级 KV cache 旋转调度）和 **DuplexKV**（双向 PCIe 全双工传输引擎），解决了长上下文 LLM 推理中 KV cache offloading 到 CPU 内存时带宽利用率低、调度粒度粗的问题，在 TTFT SLO 达成率上提升高达 74.7%。

#### 🎯 核心要点

- **问题定义**：长上下文（128K+ tokens）场景下 KV cache 远超 GPU 显存容量，必须 offload 到 CPU 内存，但现有系统（vLLM 等）的 swap 带宽仅达理论 PCIe 带宽的 47%，导致 TTFT 严重劣化
- **RotaSched 调度器**：提出 Virtual Loading Time (VLT) 指标量化每个 token 的"虚拟加载时间"，并基于 Lowest VLT First (LVF) 策略在 attention 层间动态旋转 GPU/CPU 上的 KV cache 分配
- **DuplexKV 传输引擎**：通过 Eager Block Rotation、Block-First Memory Layout、Batched & Pipelined Transfer 三项技术，实现 PCIe Gen5 x16 上 ~181 GB/s 的双向全双工传输（理论峰值 192 GB/s 的 94%）
- **精度无损**：与纯 GPU 推理完全等价，不涉及任何 KV cache 近似或剪枝，保证输出一致性
- **端到端效果**：在 Llama-3.1-8B/70B 上，TTFT 提升 1.4×–2.1×，TTFT SLO 达成率提升最高 74.7%，TBT 不受影响

#### 🔬 深入细节

##### 系统总体架构

![SuperInfer 总体架构](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x7.png)
*图：SuperInfer 总体架构。RotaSched 在 attention 层间维护 GPU/CPU 上的 KV cache 分配并动态旋转，DuplexKV 负责高效的双向数据搬运。*

SuperInfer 的核心思想是将 LLM 推理中的 KV cache 管理类比为操作系统的虚拟内存管理：GPU 显存相当于物理内存，CPU 内存相当于磁盘/swap 空间，PCIe 总线相当于 I/O 通道。与 OS 的页面置换不同，SuperInfer 利用 LLM 推理的**确定性访问模式**（逐层顺序访问 KV cache）来实现精确的预调度，而非被动的缺页处理。

##### 动机与背景

**问题根源**：以 Llama-3.1-8B 为例，128K 上下文的 KV cache 约需 40 GB，远超单张 H200 的 141 GB 显存预算（模型权重本身已占用大量空间）。现有方案有两类：

1. **Waiting-First (WF)**：prefill 完成后一次性将所有 KV cache 从 CPU 加载到 GPU，再开始 decode。问题是加载延迟极高。
2. **Layer-First (LF)**：每层 attention 前按需加载该层的 KV cache。问题是加载与计算无法充分重叠。

> 💡 **关键洞察**：现有系统（如 vLLM）的 swap 机制仅使用**单向** PCIe 传输，实测带宽仅 ~90 GB/s，而 PCIe Gen5 x16 的理论双向带宽为 192 GB/s（每方向 64 GB/s，但全双工可达 128 GB/s × 2 方向）。SuperInfer 的核心突破在于同时利用上行和下行链路。

##### RotaSched：Token 级旋转调度

![VLT 可视化](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x9.png)
*图：Virtual Loading Time (VLT) 可视化。时间偏移量表示：token 在 GPU 上被需要的时刻与其实际可用时刻之间的差值。*

**Virtual Loading Time (VLT)** 是 RotaSched 的核心指标。对于每个 token \(t\) 在第 \(l\) 层的 VLT 定义为：

$$\text{VLT}(t, l) = T_{\text{offset}}(t, l) + T_{\text{transfer}}(t)$$

其中：
- \(T_{\text{offset}}(t, l)\) 是 token \(t\) 在第 \(l\) 层 attention 计算开始前的时间偏移量。如果 token 已在 GPU 上，偏移为 0；如果在 CPU 上，偏移为从当前时刻到第 \(l\) 层开始执行的预估时间。
- \(T_{\text{transfer}}(t)\) 是将该 token 的 KV cache 从 CPU 传输到 GPU（或反向）的时间。

VLT 越小，表示该 token 越"紧急"——要么即将被需要，要么传输代价很低。

**Lowest VLT First (LVF) 调度算法** 基于 VLT 进行四步旋转：

![LVF 调度示意](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x11.png)
*图：LVF 调度算法演示。①②③④ 分别对应四个步骤。*

```python
# LVF 调度算法伪代码
def lvf_schedule(tokens, gpu_budget, current_layer):
    # Step 1: 计算所有 token 的 VLT
    for t in tokens:
        t.vlt = compute_vlt(t, current_layer)
    
    # Step 2: 按 VLT 升序排序
    sorted_tokens = sort_by_vlt(tokens)  # VLT 最小的排在前面
    
    # Step 3: 分配 GPU 预算
    gpu_tokens = sorted_tokens[:gpu_budget]   # VLT 最小的留在/加载到 GPU
    cpu_tokens = sorted_tokens[gpu_budget:]   # 其余 offload 到 CPU
    
    # Step 4: 执行旋转传输
    to_load = [t for t in gpu_tokens if t.location == 'CPU']   # 需要从 CPU → GPU
    to_offload = [t for t in cpu_tokens if t.location == 'GPU'] # 需要从 GPU → CPU
    
    # 关键：load 和 offload 同时进行（DuplexKV 双向传输）
    duplex_transfer(to_load, to_offload)
    
    # 执行当前层的 attention 计算（仅对 GPU 上的 token）
    attention_compute(gpu_tokens, current_layer)
```

> ⚠️ **注意**：LVF 的关键创新在于**旋转**——不是简单地把所有 KV cache 加载到 GPU，而是在每层 attention 之间动态调整哪些 token 在 GPU、哪些在 CPU。被 offload 的 token 不是被丢弃，而是在后续层可能被重新加载。这保证了精度完全无损。

**与传统方法的区别**：
- vLLM 的 swap 机制是**请求级**的粗粒度调度（整个请求的 KV cache 一起 swap），SuperInfer 是 **token 级**的细粒度调度
- 传统方法使用单向传输（先 offload 再 load，或只 load），SuperInfer 通过 DuplexKV 实现 load 和 offload **同时**进行
- 传统方法的调度是静态的（WF 或 LF），SuperInfer 基于 VLT 动态决策

##### DuplexKV：双向全双工传输引擎

DuplexKV 解决的核心问题是：如何在 PCIe 总线上同时进行 GPU→CPU 和 CPU→GPU 的 KV cache 传输，并最大化带宽利用率。

**技术一：Eager Block Rotation（急切块旋转）**

![Eager Block Rotation](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x14.png)
*图：左图展示了 swap-in 和 swap-out 使用同一 CUDA stream 时的数据竞争问题；右图展示了 Eager Block Rotation 如何通过提前释放 GPU block 来避免竞争。*

在旋转调度中，一个 GPU block 被 offload 后，其空间需要被新加载的 token 占用。如果 offload 和 load 在同一 CUDA stream 上串行执行，则无法实现双向并行。Eager Block Rotation 的做法是：

1. 将待 offload 的 GPU block **立即标记为可用**（eager release）
2. 在一个独立的 CUDA stream 上启动 GPU→CPU 的 offload
3. 同时在另一个 CUDA stream 上启动 CPU→GPU 的 load，直接写入刚释放的 block
4. 通过 CUDA event 同步确保数据一致性

**技术二：Block-First Memory Layout（块优先内存布局）**

![Block-First Layout](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x15.png)
*图：Block-First 布局使得同一 block 的不同层 segment 在内存中连续，减少 DMA 传输次数。*

传统 PagedAttention 的内存布局是 **layer-first**：同一层的所有 block 连续存放。这意味着传输一个 block 的完整 KV cache（跨所有层）需要多次小粒度 DMA 操作。

Block-First Layout 将同一 block 的所有层的 KV cache segment 连续存放在内存中。这样传输一个完整 block 只需**一次大粒度 DMA 操作**，显著减少了 CUDA kernel launch 开销和 PCIe 事务数。

> 💡 **关键**：实测表明，当 segment 大小 < 64 KB 时，kernel launch 时间（~10 μs）甚至超过实际传输时间。Block-First Layout 将多个小 segment 合并为一次大传输，消除了这一瓶颈。

**技术三：Batched & Pipelined Transfer（批量流水线传输）**

即使使用 Block-First Layout，仍需传输多个 block。SuperInfer 将多个 block 的传输请求**批量提交**到 CUDA stream，并在 load stream 和 offload stream 之间形成**流水线**：

$$\text{Effective BW} \approx \text{BW}_{\text{load}} + \text{BW}_{\text{offload}} \approx 2 \times \text{BW}_{\text{unidirectional}}$$

实测在 H200 (PCIe Gen5 x16) 上，DuplexKV 达到 ~181 GB/s 的双向聚合带宽，是 vLLM swap 机制（~90 GB/s 单向）的 **2 倍**。

##### 执行流程对比

![执行流程对比](https://ar5iv.labs.arxiv.org/html/2601.20309/assets/x16.png)
*图：vLLM（上）与 SuperInfer（下）的执行流程对比。SuperInfer 通过旋转调度和双向传输，将 KV cache 搬运与 attention 计算深度重叠。*

**vLLM 的执行流程**：
1. Prefill 阶段在 GPU 上完成
2. 将 KV cache swap-out 到 CPU（单向，阻塞）
3. Decode 时逐步 swap-in（单向，与计算串行）

**SuperInfer 的执行流程**：
1. Prefill 阶段在 GPU 上完成
2. 每层 attention 前，RotaSched 根据 VLT 决定旋转方案
3. DuplexKV 同时执行 load 和 offload（双向并行）
4. Attention 计算仅在 GPU 上的 token 子集上执行
5. 层间持续旋转，确保每层都能访问到所需的 KV cache

##### 实验结果亮点

- **TTFT**：在 Llama-3.1-8B (128K context) 上，SuperInfer 的 TTFT 比 vLLM 降低 1.4×–2.1×
- **SLO 达成率**：TTFT SLO 达成率提升最高 74.7%（从 ~20% 提升到 ~95%）
- **带宽利用率**：DuplexKV 在 PCIe Gen5 x16 上达到 181 GB/s（理论 192 GB/s 的 94%）
- **精度**：与纯 GPU 推理输出完全一致（bit-exact），无任何近似
- **TBT 不受影响**：decode 阶段的 Time Between Tokens 保持不变

#### 🧪 练习题

```yaml
question: "SuperInfer 的 DuplexKV 引擎相比 vLLM 的 swap 机制，带宽提升的根本原因是什么？"
options:
  - "使用了更高效的数据压缩算法减少传输量"
  - "同时利用 PCIe 上行和下行链路实现双向全双工传输"
  - "通过 KV cache 剪枝减少了需要传输的数据量"
  - "使用 NVLink 替代 PCIe 实现更高带宽"
answer: 1
explain: "DuplexKV 的核心创新是通过 Eager Block Rotation + 双 CUDA stream 同时进行 GPU→CPU offload 和 CPU→GPU load，充分利用 PCIe 的全双工特性，将有效带宽从单向 ~90 GB/s 提升到双向 ~181 GB/s。"
```