### Zero Bubble Pipeline Parallelism

```yaml
id: zero_bubble
name: Zero Bubble PP
full_name: 零气泡流水线并行 (Zero Bubble Pipeline Parallelism)
year: 2024
org: Peking University / Sea AI Lab
paper_url: https://arxiv.org/abs/2401.10241
category: infra/distributed_training
parent: pipeline_parallelism
motivation: 将反向传播拆分为输入梯度(B)和参数梯度(W)两个独立计算，通过灵活调度W填充流水线气泡，实现接近零气泡的流水线并行
```

#### 📝 一句话总结

Zero Bubble PP 将反向传播拆分为输入梯度计算(B)和参数梯度计算(W)两个阶段，利用 W 对后续微批次无数据依赖的特性将其灵活调度以填充流水线气泡，并设计自动调度算法（启发式+ILP）在给定内存约束下搜索最优调度方案，在 GPT-3 类模型上实现了相比 1F1B 高达 23%（同等内存）和 31%（2倍内存）的吞吐提升。

#### 🎯 核心要点

- **核心洞察**：反向传播可拆分为 B（计算输入梯度，有跨阶段依赖）和 W（计算参数梯度，无跨阶段依赖），W 可自由调度填充气泡
- **ZB-H1 手工调度**：与 1F1B 相同峰值内存（\(p \cdot M_B\)），气泡从 \((p-1)T_F\) 降至 \((p-1)(T_F - T_W)/3\)
- **ZB-H2 手工调度**：峰值内存 \((2p-1)M_B\)，理论零气泡（当 \(T_F = T_B = T_W\)）
- **ZB-V 调度**：V 形模型分块策略，在 1F1B 同等内存下实现接近零气泡
- **自动调度算法**：启发式 + ILP 联合优化，输入 \(T_F, T_B, T_W, T_{\text{comm}}\) 和内存限制，自动搜索最优调度
- **Optimizer 同步绕过**：用 post-validation 策略替代传统 all-reduce 同步（梯度裁剪/NaN检查），保持零气泡可行性
- **实验验证**：1.5B-28.3B 模型，ZB-1p（同内存）提升 9%-23%，ZB-2p（2倍内存）提升 15%-31%，气泡率降至 <1%

#### 🔬 深入细节

##### 核心示意图

![Zero Bubble Pipeline Schedules](https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x3.png)
*图：上方为 ZB-H1 调度（同 1F1B 内存，气泡减至 1/3），下方为 ZB-H2 调度（零气泡，内存翻倍）。绿色=Forward(F)，蓝色=Backward-input(B)，红色=Backward-weight(W)。*

![1F1B Baseline](https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x2.png)
*图：传统 1F1B 调度基线，存在 \((p-1)\) 个 forward 时间的气泡。*

##### 算法伪代码

```python
# Zero Bubble 启发式调度算法核心逻辑
def zero_bubble_schedule(p, m, T_F, T_B, T_W, T_comm, M_limit):
    """
    p: pipeline stages, m: microbatches
    T_F/T_B/T_W: forward/backward-input/backward-weight time
    T_comm: communication time, M_limit: activation memory limit
    """
    # Phase 1: Warm-up - 在内存限制内尽可能多调度 F
    for stage_i in range(p):
        schedule_F_passes_until(memory_limit_or_first_B_ready)
    
    # Phase 2: Steady state - 1F-1B 交替，W 填充气泡
    while F_and_B_remaining:
        schedule_one_F()
        schedule_one_B()
        if bubble_gap >= T_W:
            schedule_one_W()  # 用 W 填充气泡
        if memory_limit_hit:
            schedule_W_to_free_memory()
    
    # Phase 3: Cool-down - 调度剩余 W
    schedule_all_remaining_W()
    
    # 可选：用 ILP 进一步优化
    return optimize_with_ILP(initial_schedule)
```

##### 方法详解

**1. 动机与背景**

流水线并行（Pipeline Parallelism）是大模型训练的关键并行策略之一。传统的 1F1B（One Forward One Backward）调度中，每个流水线阶段在稳态时交替执行一个 forward 和一个 backward，但在 warm-up 和 cool-down 阶段存在不可避免的"气泡"（idle time）。对于 \(p\) 个流水线阶段和 \(m\) 个微批次，1F1B 的气泡比例为：

$$\text{Bubble ratio} = \frac{(p-1) \cdot T_F}{m \cdot (T_F + T_B + T_W)}$$

当 \(m\) 不够大时（如 \(m = 3p\)），气泡率可达 20%-30%，严重影响训练效率。

**2. 核心机制：B-W 拆分**

论文的关键洞察在于反向传播的计算可以被拆分为两个独立的部分：

- **B（Backward-Input）**：计算输入的梯度 \(\frac{\partial L}{\partial x}\)，用于传递给上一层（跨阶段依赖）
- **W（Backward-Weight）**：计算参数的梯度 \(\frac{\partial L}{\partial W}\)，仅用于本地参数更新（无跨阶段依赖）

> 💡 **关键洞察**：W 的执行时机不影响其他阶段的计算，因此可以被延迟调度到任何气泡位置，只要在 optimizer step 之前完成即可。

对于 Transformer 中的 MLP 层 \(Y = \text{GeLU}(XA) \cdot B\)：
- Forward: 计算并保存激活值
- B: 利用保存的激活值计算 \(\frac{\partial L}{\partial X}\)（需要传给上一层）
- W: 利用保存的激活值计算 \(\frac{\partial L}{\partial A}\) 和 \(\frac{\partial L}{\partial B}\)（仅本地使用）

**3. 手工调度方案**

**ZB-H1**（同内存方案）：
- 峰值激活内存：\(p \cdot M_B\)（与 1F1B 相同）
- 稳态模式：1F-1B-1W
- 气泡大小：\(\frac{(p-1)(T_B + T_W - T_F)}{3}\)（当 \(T_F \approx T_B \approx T_W\) 时接近零）

**ZB-H2**（零气泡方案）：
- 峰值激活内存：\((2p-1) \cdot M_B\)
- 稳态模式：先 warm-up 更多 F，再 1F-1B 交替，W 全部延迟到末尾
- 当 \(T_F = T_B = T_W\) 时理论零气泡

**4. 自动调度算法**

手工调度假设 \(T_F = T_B = T_W\) 且忽略通信时间，实际中这些假设不成立。自动调度算法解决：

- **启发式算法**：贪心策略，warm-up 阶段尽量多 F，稳态 1F-1B-1W，用 W 填充所有可用气泡
- **ILP 精确求解**：将调度问题建模为整数线性规划，用求解器找全局最优
- **组合策略**：启发式解作为 ILP 初始解，进一步优化

**5. Optimizer 同步绕过**

传统 PP 在 optimizer step 需要跨阶段 all-reduce（梯度裁剪的全局范数、混合精度的 NaN/INF 检查），这会破坏流水线的平行四边形结构。论文提出 **post-validation** 策略：

$$\text{Strategy: } \begin{cases} \text{先用本地梯度范数裁剪并更新参数} \\ \text{下一轮 forward 前验证上一轮的全局范数} \\ \text{若不一致则回滚并重新计算} \end{cases}$$

> ⚠️ **注意**：实验表明回滚概率极低（<1/1000 iterations），对收敛无影响，且 loss 曲线与标准 1F1B bit-to-bit 一致。

**6. ZB-V：内存高效的零气泡调度**

![ZB-2p Schedule Visualization](https://ar5iv.labs.arxiv.org/html/2401.10241/assets/x6.png)
*图：ZB-2p 自动搜索的调度方案（上）与实际 profiling 执行（下），几乎无气泡。*

ZB-2p 虽然气泡率 <1%，但内存翻倍。ZB-V 通过 V 形模型分块解决此问题：
- 将模型分为 \(2p\) 个 chunk，每个 worker 分配 2 个 chunk（一前一后）
- 例如 4 阶段 16 层：Worker 1 负责 Layer 1-2 和 Layer 15-16
- 前向和反向都从同一 worker 发起，无需等待最后一个 worker
- 峰值内存 \(p \cdot M_B\)（与 1F1B 相同），但气泡率接近 ZB-H2

**7. 与传统方法的对比**

| 方法 | 气泡率 (p=8, m=24) | 峰值内存 | 通信开销 |
|------|-------------------|---------|---------|
| 1F1B | 24.3% | \(p \cdot M_B\) | 基线 |
| 1F1B-I (Interleaved) | 10.6% | 更高 | \(p\times\) 通信 |
| ZB-H1 / ZB-1p | 15.9% | \(p \cdot M_B\) | 基线 |
| ZB-H2 | 10.8% | \((2p-1) \cdot M_B\) | 基线 |
| ZB-2p | **0.4%** | \(2p \cdot M_B\) | 基线 |
| ZB-V | ~7% | \(p \cdot M_B\) | 2× 通信 |

> 💡 **核心优势**：ZB 系列方法不增加通信量（不像 Interleaved 1F1B 需要更多跨节点通信），在多节点场景优势更明显。

##### 实验结果

在 1.5B-28.3B GPT-3 类模型上（8-32 NVIDIA A100 80G GPUs）：
- **ZB-2p** vs 1F1B：吞吐提升 15%-31%，内存增加约 2x
- **ZB-1p** vs 1F1B：吞吐提升 9%-23%，内存基本相同
- **ZB-1p** vs 1F1B-I：多节点场景下 ZB-1p 明显优于 1F1B-I（无额外通信开销）
- **ZB-V** vs 1F1B：同等内存下吞吐提升 15%-25%
- 正确性验证：固定随机种子，ZB-1p/ZB-2p 与 1F1B 的 loss 逐 iteration **bit-to-bit 一致**

#### 🧪 练习题

```yaml
question: "Zero Bubble PP 将反向传播拆分为 B 和 W 两部分，W 可以被灵活调度的根本原因是什么？"
options:
  - "W 的计算量比 B 小，可以忽略不计"
  - "W 只计算参数梯度，不产生需要传递给其他流水线阶段的数据依赖"
  - "W 可以与 Forward 计算完全重叠执行"
  - "W 不需要使用保存的激活值，因此可以在任意时刻执行"
answer: 1
explain: "W 计算的是参数梯度 ∂L/∂W，仅用于本地 optimizer 更新，不需要传递给上游阶段，因此没有跨阶段数据依赖，可以延迟到任何空闲时段执行。"
```