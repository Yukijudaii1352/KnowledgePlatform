### TISA

```yaml
id: tisa
name: TISA
full_name: 三合一动态调度架构 (TISA Tri-in-One Dynamic Scheduling)
year: '2026'
org: ISCA
paper_url: https://www.eeworld.com.cn/mp/yixingzhineng/a114343.jspx
category: hw_sw_codesign
parent: —
motivation: 硬件调度器实时优化算力三合一动态分配
```

#### 📝 一句话总结

TISA 提出以 Tile 级虚拟指令语义、ACE 编译器和硬件 VISA 调度器组成的三位一体动态调度架构，解决 AI 加速器静态编译排程难以适配运行时带宽冲突、流水线空泡和异构单元负载波动的问题。

#### 🎯 核心要点

- Tile 级调度粒度：把大算子切成可独立依赖跟踪和资源分配的 Tile，而不是只在粗粒度算子或细粒度指令上调度
- VISA 语义接口：在指令中保留算子边界、依赖类型、资源意图、Tile 内存范围和冲突信息
- ACE 智能编译器：将上层模型/算子映射为带语义的 VISA 流，负责静态可确定部分的切分、依赖标注和初始优化
- 硬件 VISA 调度器：在运行时监控张量、向量和 DMA 等单元状态，动态重排可执行 Tile 并平衡资源
- 冲突感知执行：根据依赖 scoreboard、片上存储分区、DMA 压力和执行单元空闲度选择下一批 Tile
- 面向跨代兼容：通过虚拟指令隔离上层软件和底层硬件细节，让同一语义流适配不同加速器实现
- 公开报道评测：在 DeepSeek-R1、ResNet-50、BERT、GPT-J、LLaMA2、FlashAttention-3 等负载上相对基线达到 1.52-1.92x 加速，并优于强静态流水调度 1.14-1.63x

#### 🔬 深入细节

##### 公开图源与整体框架

![TISA 论文公开截图](https://www.gsi24.com/ueditor/php/upload/image/20260401/1775027433477604.png)
*图：芯师爷公开报道中嵌入的《Dynamic Scheduling for AI Accelerators via TISA》论文首页截图。正式论文 PDF 尚未公开，图中摘要与公开报道共同给出 TISA 的语义保留编译、Tile 级指令集和运行时调度器三件套。*

TISA 的关键不是把所有调度都搬到硬件里，而是重新划分编译器与硬件的职责。传统静态编译会在编译期固定算子分块、DMA 顺序、Tensor/Vector 单元的重叠关系；一旦运行时出现带宽回压、cache/bank 冲突、热降频或模型分支差异，硬件只能按原计划等待。TISA 则让编译器输出“带语义的待调度任务”，硬件根据实时状态决定哪些 Tile 先执行、哪些 Tile 暂停、哪些 DMA 与计算可以重叠。

##### 动态调度伪代码

```python
# TISA/VISA 风格的 Tile 级硬件调度器伪代码
ready_queue = []
scoreboard = DependencyScoreboard()
resource_state = ResourceMonitor(["tensor", "vector", "dma", "sram_bank"])

for visa_inst in ace_compiler.lower(model_graph):
    tile = decode_tile_semantics(visa_inst)
    scoreboard.register(tile.id, tile.dependencies)
    if scoreboard.is_ready(tile.id):
        ready_queue.append(tile)

while not scoreboard.all_done():
    resource_state.sample_runtime_status()

    candidates = [
        tile for tile in ready_queue
        if scoreboard.is_ready(tile.id)
        and resource_state.can_reserve(tile.required_units, tile.memory_range)
        and not resource_state.has_bank_conflict(tile.memory_range)
    ]

    selected = max(candidates, key=lambda t: schedule_score(t, resource_state))
    resource_state.reserve(selected.required_units, selected.memory_range)
    dispatch_to_hardware(selected)

    finished = collect_completed_tiles()
    for tile in finished:
        resource_state.release(tile.required_units, tile.memory_range)
        scoreboard.mark_done(tile.id)
        ready_queue.extend(scoreboard.newly_ready_successors(tile.id))
```

##### 机制拆解

静态调度的主要假设是“编译时看到的执行时间和资源压力接近运行时真实情况”。这个假设在 AI 加速器上越来越弱：大模型算子被切成大量 Tile 后，DMA 传输、片上 SRAM 分区、Tensor Core/Vector Core 协同和同步屏障会互相影响。一个 Tile 的有效开始时间可以写成：

$$
t_{\mathrm{start}}(i)=\max\left(t_{\mathrm{dep}}(i), t_{\mathrm{unit}}(r_i), t_{\mathrm{mem}}(m_i)\right)
$$

其中 \(t_{\mathrm{dep}}\) 来自前驱依赖，\(t_{\mathrm{unit}}\) 是所需计算单元下一次可用时间，\(t_{\mathrm{mem}}\) 是内存分区或 DMA 通路可用时间。静态方案在编译期估计这些值，TISA 的硬件调度器则在每个调度窗口内重新读取这些状态，因此能把本来等待的 Tile 换成另一个已满足依赖且资源不冲突的 Tile。

Tile 级 VISA 是 TISA 能动态调度的前提。若编译器只输出底层指令流，硬件看到的是 load、mma、store 等低层动作，难以判断“这个动作属于哪个算子、依赖哪个 Tile、可否和另一个 DMA 重排”。VISA 在降级后仍保留语义字段，例如：

$$
\mathrm{VISA\_tile}=\langle op,\ deps,\ resource,\ mem\_range,\ priority,\ shape\rangle
$$

这些字段相当于编译器和硬件之间的调度契约：编译器承诺依赖和边界是正确的，硬件承诺在不破坏依赖与内存一致性的前提下重排执行。这样既避免纯软件运行时调度的微秒级开销，也避免完全静态排程对运行时波动无能为力。

硬件 VISA 调度器的核心是“就绪性 + 资源匹配 + 冲突规避”。一个 Tile 能被发射需要满足：

$$
\mathrm{ready}(i)=
\left(\bigwedge_{j\in Pred(i)} done(j)\right)
\land available(r_i)
\land no\_conflict(m_i)
$$

在多个 Tile 同时 ready 时，调度器可以使用近似启发式评分而不是复杂全局搜索：

$$
\mathrm{score}(i)=
\alpha\cdot criticality(i)
\beta\cdot wait(i)
-\gamma\cdot conflict(i)
-\delta\cdot dma\_pressure(i)
$$

这里 \(criticality\) 表示关键路径权重，\(wait\) 表示等待时间，\(conflict\) 与 \(dma\_pressure\) 分别惩罚片上存储冲突和搬运拥塞。硬件实现通常会把这些指标简化为计数器、位图和优先级比较器，使调度决策保持在纳秒级。

与 GPU 的 warp 调度相比，TISA 的粒度更粗且语义更高。warp 调度擅长在 CUDA Core 内部隐藏指令延迟，但它通常不能跨 DMA、Tensor、Vector 等单元协调一个算子的整体流水；TISA 把 Tile 当作跨单元协同对象，目标是让搬运、矩阵计算、向量后处理和同步在更大的窗口里重叠。公开报道给出的 FlashAttention-3 场景尤其能体现这一点，因为注意力算子同时受矩阵乘吞吐、片上块缓存和 softmax/归一化后处理影响，单纯优化某一个内核片段并不能消除流水线空泡。

> 💡 关键：TISA 的“动态”不是放弃编译器优化，而是让编译器保留足够语义，把静态可知的依赖交给硬件在运行时快速重排。

#### 🧪 练习题

```yaml
question: "TISA 选择 Tile 级 VISA 作为软硬件接口的主要原因是什么？"
options:
  - "让硬件完全忽略编译器生成的依赖关系"
  - "在保留算子语义和依赖信息的同时，让硬件能按运行时资源状态重排 Tile"
  - "把所有 CNN 卷积都改写成 FFT 卷积"
  - "只优化 CPU 侧线程调度，不改变加速器内部执行"
answer: 1
explain: "Tile 级 VISA 保留依赖、资源和内存范围等语义，使硬件调度器能在不破坏正确性的前提下根据实时状态动态发射 Tile。"
```
