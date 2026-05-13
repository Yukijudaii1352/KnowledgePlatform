### DeepStack: 面向3D堆叠DRAM加速器的分布式LLM推理性能建模与设计空间探索

```yaml
id: deepstack_3d
name: DeepStack
full_name: "DeepStack: Performance Modeling and Design Space Exploration for Distributed 3D-Stacked Accelerators"
year: 2026
org: NVIDIA
paper_url: "https://arxiv.org/abs/2604.04750"
category: chiplet
parent: "—"
motivation: "为3D堆叠DRAM加速器构建端到端性能建模与DSE框架，联合搜索硬件架构与并行策略以优化LLM推理效率"
```

#### 📝 一句话总结

DeepStack 提出了面向 3D 堆叠 DRAM 加速器的端到端性能建模与设计空间探索（DSE）框架，通过事务感知的 3D DRAM 带宽建模、层次化片上网络（NoC）仿真、完整并行策略搜索（TP/EP/SP/CP/DP/PP）以及热-功耗协同约束，在 \(\sim 2.5 \times 10^{14}\) 的设计空间中高效搜索最优硬件-软件配置，相比基线实现最高 9.5× 的吞吐提升。

#### 🎯 核心要点

- **五层层次化硬件建模**：PE → Cluster（3D DRAM 堆叠）→ Die（L1 NoC）→ Chip（L2 UCIe）→ System（L3 Ethernet），覆盖从计算单元到多芯片集群的完整架构
- **事务感知 3D DRAM 带宽模型**：捕获四个关键效应——(i) 事务大小依赖带宽、(ii) Little's Law 缓冲约束、(iii) bank 并行度受限、(iv) bank 冲突，精确建模有效带宽与理论带宽的差距
- **双阶段网络建模**：Stage 1 构建逻辑流量矩阵（与拓扑无关），Stage 2 映射到物理拓扑并执行路由仿真，比 NS-3 快 \(10^5\)× 且误差仅 2.12%
- **完整并行策略搜索**：支持 TP × EP × SP × CP × DP × PP = N 的全维度搜索，允许不同模块（Attention/MoE/MLP）采用独立并行策略
- **Tile 级 Compute-Communication Overlap**：将算子拆分为 tile 粒度的流水线，通过 prologue-steady-epilogue 三阶段模型精确估计端到端延迟
- **热-功耗协同约束**：集成 1D 稳态热模型，将 DRAM 层数、功率密度与温度约束（85°C）纳入 DSE 循环
- **多阶段剪枝 DSE**：通过并行策略可行性检查、内存占用过滤、层次化 NoC 搜索等策略，将 \(\sim 2.5 \times 10^{14}\) 的搜索空间压缩至 512 核 CPU 上约 2 天可完成
- **关键设计洞察**：batch size 比 prefill/decode 区分更能决定最优架构；DRAM 堆叠层数存在倒 U 型曲线（>9 层有效带宽反而下降）；不完整的并行策略搜索会永久扭曲架构设计

#### 🔬 深入细节

##### 框架总览

![DeepStack 框架总览](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x1.png)
*图：DeepStack 框架总览。左侧为五层层次化硬件模型（PE→Cluster→Die→Chip→System），中间为系统级分布式推理建模（并行策略搜索 + 网络仿真 + overlap 建模），右侧为 DSE 引擎输出 Pareto 最优设计。*

DeepStack 的核心架构分为三个紧密耦合的子系统：

1. **芯片级 3D DRAM 性能建模**：在单个 Cluster（compute die + 3D DRAM 层）粒度上，精确建模计算吞吐、DRAM 有效带宽、面积分配和热约束。
2. **系统级分布式推理建模**：将多个 Cluster 组织为 Die → Chip → System 的层次化互连，建模完整的 LLM 推理流水线，包括并行策略、集合通信和 compute-comm overlap。
3. **DSE 引擎**：在硬件配置（SM 数量、DRAM 层数、NoC 拓扑/带宽）× 软件配置（并行策略）的联合空间中搜索 Pareto 最优解。

##### 3D DRAM 有效带宽建模

这是 DeepStack 最核心的技术贡献之一。传统建模工具假设 DRAM 带宽为常数，但 3D 堆叠 DRAM 的有效带宽受多个因素制约：

```python
# DeepStack 3D DRAM 有效带宽计算伪代码
def compute_effective_bandwidth(config, workload):
    # Step 1: 事务大小依赖带宽
    # 小事务无法填满 burst length，带宽利用率下降
    txn_size = workload.transaction_size
    burst_len = config.dram.burst_length
    bw_txn = config.dram.peak_bw * min(txn_size / burst_len, 1.0)
    
    # Step 2: Little's Law 缓冲约束
    # 有效带宽 ≤ buffer_entries × txn_size / latency
    # 需要足够的 outstanding requests 才能饱和带宽
    max_outstanding = config.l1_buffer_entries
    dram_latency = config.dram.access_latency  # ~ns级
    bw_littles = max_outstanding * txn_size / dram_latency
    
    # Step 3: Bank 并行度受限
    # 有效带宽 ≤ num_banks × bank_bandwidth
    bw_bank = config.dram.num_banks * config.dram.per_bank_bw
    
    # Step 4: Bank 冲突建模
    # 随机访问模式下，N个请求命中B个bank的冲突概率
    N_req = max_outstanding
    B_banks = config.dram.num_banks
    # 期望独立bank数 = B * (1 - (1-1/B)^N)
    effective_banks = B_banks * (1 - (1 - 1/B_banks)**N_req)
    bw_conflict = effective_banks * config.dram.per_bank_bw
    
    # 最终有效带宽 = 四个约束的最小值
    effective_bw = min(bw_txn, bw_littles, bw_bank, bw_conflict)
    return effective_bw
```

> 💡 **关键洞察**：理论带宽随 DRAM 层数线性增长，但有效带宽在约 9 层后出现倒 U 型下降。这是因为 Little's Law 约束了 outstanding requests 数量——当 DRAM 层数增加时，理论带宽增大，但 L1 缓冲区深度有限，无法产生足够的并发请求来饱和更高的带宽。

四个约束的数学表达：

$$BW_{\text{eff}} = \min\left( BW_{\text{txn}}, \; \frac{N_{\text{buf}} \cdot S_{\text{txn}}}{t_{\text{lat}}}, \; N_{\text{banks}} \cdot BW_{\text{bank}}, \; \mathbb{E}[B_{\text{active}}] \cdot BW_{\text{bank}} \right)$$

其中 \(\mathbb{E}[B_{\text{active}}] = B \cdot \left(1 - \left(1 - \frac{1}{B}\right)^N\right)\) 是 \(N\) 个请求在 \(B\) 个 bank 上的期望活跃 bank 数。

##### 双阶段网络建模

![网络建模双阶段](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x3.png)
*图：双阶段网络建模。Stage 1 从并行策略推导逻辑流量矩阵，Stage 2 将流量映射到物理拓扑执行路由仿真。*

**Stage 1: 逻辑流量矩阵构建**

给定并行策略（如 TP=4, EP=8），DeepStack 自动推导每个集合通信操作（AllReduce、AllGather、All-to-All 等）的流量矩阵 \(T \in \mathbb{R}^{N \times N}\)，其中 \(T_{ij}\) 表示节点 \(i\) 到节点 \(j\) 的数据传输量。

关键创新在于**并行策略到通信模式的自动映射**：
- **TP (Tensor Parallelism)**：在 Attention/MLP 层产生 AllReduce
- **EP (Expert Parallelism)**：在 MoE 层产生 All-to-All
- **SP (Sequence Parallelism)**：在 LayerNorm/Dropout 处产生 AllGather + ReduceScatter
- **CP (Context Parallelism)**：长序列分片产生 P2P 通信
- **PP (Pipeline Parallelism)**：跨 stage 的 P2P 传输 + pipeline bubble

DeepStack 允许不同模块采用独立并行策略（如 Attention 用 TP，MoE 用 EP），并自动插入必要的重分布集合通信。

**Stage 2: 物理拓扑映射与路由**

```python
# Stage 2 网络仿真伪代码
def simulate_network(traffic_matrix, topology, routing_algo):
    """
    将逻辑流量矩阵映射到物理拓扑，计算通信延迟
    支持三层层次化拓扑: L1(Cluster内) / L2(Die内) / L3(Chip间)
    """
    total_latency = 0
    for src, dst, data_size in traffic_matrix.entries():
        # 确定通信路径（跨越哪些层次）
        path = routing_algo.find_path(src, dst, topology)
        
        # 计算每一跳的延迟
        hop_latency = sum(hop.latency for hop in path.hops)
        
        # 计算传输延迟（考虑链路带宽和拥塞）
        transfer_time = data_size / path.bottleneck_bandwidth
        
        # 支持 ring / tree / direct 等集合通信算法
        total_latency = max(total_latency, hop_latency + transfer_time)
    
    return total_latency
```

该方法相比 NS-3 的离散事件仿真实现了 \(\sim 10^5 \times\) 加速（0.1s vs 3h），同时保持 2.12%（Switch）和 1.62%（Torus）的加权误差。

##### Tile 级 Compute-Communication Overlap

DeepStack 将每个算子（如 GEMM）拆分为多个 tile，实现计算与通信的流水线重叠：

$$T_{\text{e2e}} = T_{\text{prologue}} + (K-2) \cdot \max(T_{\text{comp}}^{\text{tile}}, T_{\text{comm}}^{\text{tile}}) + T_{\text{epilogue}}$$

其中 \(K\) 是 tile 数量，prologue 是第一个 tile 的通信时间（尚无计算可重叠），epilogue 是最后一个 tile 的计算时间（尚无通信可重叠），中间的 steady state 阶段取计算和通信的最大值。

> ⚠️ **注意**：overlap 的有效性取决于 tile 粒度的选择。tile 太大则流水线级数太少，overlap 不充分；tile 太小则启动开销占比增大。DeepStack 在 DSE 中搜索最优 tile 大小。

##### 完整并行策略搜索

DeepStack 支持的并行策略空间为：

$$\text{TP} \times \text{EP} \times \text{SP} \times \text{CP} \times \text{DP} \times \text{PP} = N$$

其中 \(N\) 为总设备数。关键设计决策包括：

| 并行维度 | 通信模式 | 适用场景 | 通信量 |
|---------|---------|---------|-------|
| TP | AllReduce | 小 batch，低延迟需求 | \(O(2 \cdot \frac{p-1}{p} \cdot M)\) |
| EP | All-to-All | MoE 模型，大 batch | \(O(2 \cdot \frac{p-1}{p} \cdot \text{tokens} \cdot d)\) |
| SP | AllGather + ReduceScatter | 长序列 | \(O(\frac{p-1}{p} \cdot M)\) |
| CP | P2P Ring | 超长上下文 | \(O(\text{seq\_len} \cdot d / p)\) |
| PP | P2P + Bubble | 大模型分层 | \(O(\text{hidden} \cdot \text{micro\_bs})\) |
| DP | AllReduce (gradients) | 大 batch | \(O(2 \cdot \frac{p-1}{p} \cdot |\theta|)\) |

> 💡 **关键发现**：最优并行策略随 batch size 剧烈变化。小 batch 时 TP 主导（隐藏延迟），大 batch 时 PP 和 EP 更优（摊薄 bubble 和通信开销）。对于 MoE 模型，EP 在大 batch 下贡献最大增益（DeepSeek-V3 上 5.03× 提升）。

##### DSE 多阶段剪枝策略

```python
# DeepStack DSE 多阶段剪枝伪代码
def design_space_exploration(models, area_budget, thermal_limit):
    """
    搜索空间 ~2.5×10^14，通过四阶段剪枝降至可行规模
    """
    candidates = generate_all_configs()  # 硬件 × 并行策略
    
    # Stage 1: 并行策略可行性 (剪枝 ~80%)
    # 例: TP=1, DP=1 在给定batch下不可行
    candidates = [c for c in candidates if is_parallel_feasible(c)]
    
    # Stage 2: 内存占用检查 (剪枝 ~50%)
    # 权重 + KV cache + 峰值激活 ≤ DRAM容量 × 0.9
    candidates = [c for c in candidates 
                  if memory_footprint(c) <= c.dram_capacity * 0.9]
    
    # Stage 3: 层次化 NoC 搜索
    # 先搜基础架构+堆叠配置，取 top 5%
    top_arch = sorted(candidates, key=evaluate)[:len(candidates)*0.05]
    # 再搜 NoC 延迟，取 top 5%
    top_noc = sorted(top_arch, key=evaluate_noc)[:len(top_arch)*0.05]
    # 最后逐层带宽微调
    final = fine_tune_bandwidth(top_noc)
    
    # Stage 4: 热约束过滤
    final = [c for c in final if thermal_check(c) <= thermal_limit]
    
    return pareto_frontier(final)
```

##### 实验验证与关键结果

**建模精度**：
- 对比 Cadence Palladium 周期精确仿真：误差 < 5%
- 对比 8×H100 Triton-Distributed 内核：平均误差 3.97%（AllGather GEMM）
- 对比 8×B200 vLLM 端到端推理：MAPE 12.18%
- 对比 ASTRA-sim NS-3 后端：误差 2.12%（Switch）/ 1.62%（Torus），速度提升 \(10^5\)×

**性能提升（消融实验，DeepSeek-V3 decode）**：

| 步骤 | 技术 | STPS (BS=4) | STPS (BS=1024) |
|-----|------|------------|----------------|
| 1 | 基线 (ASTRA-sim: DP/TP/PP) | 177.1 | 5,729 |
| 2 | + 完整并行策略 (EP/SP/CP) | 256.4 (+45%) | 21,252 (+271%) |
| 3 | + 模块级灵活并行 | 256.4 (—) | 24,488 (+15%) |
| 4 | + 芯片架构搜索 | 314.2 (+23%) | 31,350 (+28%) |
| 5 | + Compute-Comm Overlap | 340.5 (+8%) | 38,061 (+21%) |
| 6 | + DRAM 层数 DSE | 493.3 (+45%) | 51,095 (+34%) |
| 7 | + NoC DSE | 494.1 (+0.2%) | 54,280 (+6.2%) |
| — | **总加速比** | **2.8×** | **9.5×** |

##### 核心设计洞察

![DRAM层数与有效带宽的倒U型关系](https://ar5iv.labs.arxiv.org/html/2604.04750/assets/x5.png)
*图：随 DRAM 堆叠层数增加，理论带宽线性增长，但有效带宽在约 9 层后下降（倒 U 型曲线），原因是 Little's Law 缓冲约束。*

**洞察 1：Batch size 比 prefill/decode 更能决定最优架构**

传统 PD 解耦（prefill-decode disaggregation）将推理分为两个阶段分别优化。DeepStack 的 DSE 揭示了更本质的划分：
- **大 batch prefill**：浅堆叠（2 层），最大化计算面积
- **小 batch prefill + 大 batch decode**：中等堆叠（6-7 层），平衡计算与带宽
- **小 batch decode**：深堆叠（~9 层），最大化带宽

这意味着**batch-size-aware 硬件解耦**可能比 PD 解耦更有效。

**洞察 2：不完整的并行策略搜索会永久扭曲硬件设计**

消融实验表明，移除 EP 维度不仅降低吞吐，还导致 DSE 收敛到完全不同的芯片设计：
- 有 EP：ep=32, tp=4, 7 层堆叠, 6 个 SM
- 无 EP：tp=16, pp=8, 8 层堆叠, 5 个 SM（触及功耗墙）

> ⚠️ **警告**：这种硅片级的设计偏差无法通过后期软件调优弥补，强调了在流片前进行完整硬件-软件协同搜索的必要性。

**洞察 3：能效最优与吞吐最优需要根本不同的架构**

吞吐最优设计最大化连接层数以饱和带宽，而能效最优设计倾向于更多堆叠但更少连接（空闲）层，通过更大的片上缓冲和改进的数据复用来补偿带宽损失，功率密度降低 10-48%，tokens/J 提升 3-24%。

#### 🧪 练习题

```yaml
question: "DeepStack 发现 3D 堆叠 DRAM 的有效带宽在超过约 9 层后反而下降，主要原因是什么？"
options:
  - "DRAM 层数增加导致热阻过高，必须降频运行"
  - "TSV 数量有限，物理连接带宽无法线性扩展"
  - "Little's Law 约束下，有限的缓冲区深度无法产生足够的并发请求来饱和更高的理论带宽"
  - "bank 冲突概率随层数增加而急剧上升"
answer: 2
explain: "根据 Little's Law，有效带宽 ≤ buffer_entries × txn_size / latency。当 DRAM 层数增加使理论带宽超过此上限时，L1 缓冲区深度成为瓶颈，无法维持足够的 outstanding requests 来饱和带宽，导致有效带宽出现倒 U 型下降。"
```