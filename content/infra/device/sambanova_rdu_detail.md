### SambaNova RDU

```yaml
id: sambanova_rdu
name: SambaNova RDU
full_name: SambaNova可重构数据流单元 (SambaNova Reconfigurable Dataflow Unit)
year: '2022'
org: SambaNova
paper_url: —
category: emerging_chips
parent: —
motivation: 三级存储架构应对万亿参数模型存储墙
```

#### 📝 一句话总结

SambaNova RDU 提出了可重构数据流处理器，把模型图空间映射到 PCU、PMU、RDN 和 AGCU 组成的片上数据流 fabric 上，并用 SRAM/HBM/DDR 三级存储缓解大模型和多专家系统的存储墙。它的关键不是把 GPU kernel 写得更强，而是让算子、缓冲、地址生成和跨芯片通信在硬件中形成可编译的流水线。

#### 🎯 核心要点

- 采用 Reconfigurable Dataflow Architecture，编译器将模型数据流图映射为片上 compute、memory 和 communication 网络
- RDU Tile 由 Pattern Compute Unit、Pattern Memory Unit、Reconfigurable Dataflow Network、Address Generation and Coalescing Unit 组成
- PCU 支持 systolic GEMM、SIMD 流式算子、归约、随机数、格式转换和尾部 element-wise 操作
- PMU 是软件管理的分布式 SRAM scratchpad，支持并发读写、复杂地址生成、predicate、bank 映射和数据重排
- RDN 提供 vector、scalar、control 三类片上网络，支持 multicast、many-to-one、sequence ID 重排和 credit-based flow control
- SN40L 公开论文描述的三级存储为 520 MiB 片上 PMU SRAM、64 GiB HBM、最高 1.5 TiB DDR DRAM
- HBM 作为高带宽权重/中间状态缓存，DDR 作为大容量模型仓库，使 Composition of Experts 等万亿参数系统可以在单节点快速切换专家
- SambaFlow 从 PyTorch/TensorFlow 图中抽取数据流图，做 fusion、placement、routing、memory allocation 和硬件/软件 kernel 调度

#### 🔬 深入细节

##### 核心示意图

![SN40L RDU Tile 结构图](https://arxiv.org/html/2405.07518v1/x7.png)
*图：SambaNova SN40L 论文 Figure 6 的公开 arxiv HTML 图片，展示 RDU Tile 中 PMU、PCU、AGCU 与 RDN switch 的网格组织。*

![Samba-CoE 在 SN40L 上的三级存储流程](https://arxiv.org/html/2405.07518v1/x10.png)
*图：SambaNova SN40L 论文 Figure 9，router 权重常驻 HBM，expert 权重常驻 DDR，并按需从 DDR 拷入 HBM 的 expert region。*

##### 算法伪代码

```python
# SambaNova RDU: 从模型图到可执行数据流流水线的简化流程
graph = sambaflow.import_graph(framework_model)
dataflow = sambaflow.fuse_ops(graph, allow_arbitrary_access_patterns=True)

for tensor in dataflow.tensors:
    if tensor.is_hot_stage_buffer():
        tensor.place(memory="PMU_SRAM")
    elif tensor.has_temporal_reuse():
        tensor.place(memory="HBM")
    else:
        tensor.place(memory="DDR")

for op in dataflow.ops:
    if op.kind in {"gemm", "conv"}:
        op.map_to(units="PCU", mode="systolic")
    elif op.kind in {"elementwise", "reduction", "format_convert"}:
        op.map_to(units="PCU", mode="SIMD_or_tail")
    op.attach_stage_buffers(units="PMU")

routes = place_and_route(dataflow, fabric="RDN",
                         patterns=["one_to_many", "many_to_one", "transpose", "pipeline"])

for request in inference_stream:
    expert = router(request)
    if expert.weights.location == "DDR":
        agcu_dma(src="DDR", dst="HBM", tensor=expert.weights)
    launch_dataflow_kernel(routes, inputs=request, weights=expert.weights)
```

##### 方法机制解读

SambaNova RDU 的出发点是把深度学习图看成长期存在的数据流，而不是一串独立 kernel。传统 CPU/GPU 的执行模型通常是 kernel-by-kernel：每个算子从 HBM/DRAM 读输入，计算后把中间结果写回，再由下一个 kernel 重新读出。对小 batch、专家模型、FFT/transpose/element-wise 混合图等低 operational intensity 场景，这种模式会把大量时间和能耗花在中间张量 materialization 上。RDU 则把多个算子映射成空间流水线，让 tile 级输入沿着 PCU、PMU 和 RDN 流动。

可以用 operational intensity 描述这个差异：

$$
I=\frac{\text{useful operations}}{\text{bytes moved from off-chip memory}}
$$

如果融合不足，中间张量频繁写回 HBM，分母会迅速变大，算子即使有足够 FLOPS 也会被带宽限制。SambaNova 的 streaming dataflow 将 stage buffer 放入 PMU，把 transpose、fan-out、fan-in、reduction 等访问模式编码成片上路由和地址生成，从而提升 \(I\)。SN40L 论文给出的 Monarch FFT 示例中，完全空间融合的 operational intensity 明显高于无融合和局部融合，这正是 RDU 面向低强度算子的优势来源。

PCU 是计算核心，但它不是一个固定矩阵乘阵列。SN40L 的 PCU datapath 分为 header、body、tail：body 可配置为 output-stationary systolic array 来跑 GEMM，也可配置成多级 SIMD pipeline 来跑 element-wise、多维 tensor 操作和归约；tail 负责特殊函数、随机数、stochastic rounding 和格式转换。一个算子可跨多个 PCU 做 data parallel、tensor parallel 或 pipeline parallel，多个算子也能串成同一个数据流 kernel。

PMU 解决的是“数据在哪里、以什么顺序进出”的问题。它不是透明缓存，而是程序员/编译器管理的 SRAM scratchpad，带有地址生成 ALU、predicate、bank 映射和 data alignment 单元。对转置类模式，PMU 可以把写入布局和读取布局分离；对一个逻辑 tensor 跨多个 PMU 的情况，PMU 通过地址范围、predicate 和 bank bits 做 interleaving。这样，复杂访问模式不必退回 HBM 中转，而是可以留在片上作为流水线 stage buffer。

RDN 是使这些单元组合成图的片上网络。它有 vector、scalar、control 三类 fabric：vector 传输 tensor 数据，scalar 传输地址和元数据，control 传输 loop done 等控制 token。many-to-one 场景中，不同 PCU/PMU 输出可能乱序到达，SN40L 使用 sequence ID 将逻辑顺序编码到 packet 中，再由接收 PMU 计算写地址完成重排。其抽象可以写成：

$$
\text{PMU\_addr} = f(\text{sequence\_id},\ \text{tile\_index},\ \text{loop\_counter})
$$

三级存储是 RDU 应对万亿参数模型的核心。片上 PMU SRAM 存放最热的 stage buffer 和局部中间结果；HBM 提供高带宽，适合当前执行专家或频繁复用权重；DDR 提供大容量，保存大量专家模型或长上下文数据。对 Composition of Experts，单个请求只激活少数专家，因此系统需要的是“快速切换当前专家”，而不是把所有专家都常驻 HBM。可抽象为：

$$
T_{\text{CoE}} = T_{\text{route}} + T_{\text{DDR}\rightarrow\text{HBM}}(\text{expert}) + T_{\text{dataflow\_execute}}
$$

RDU 的 DDR-to-HBM 路径和软件管理内存分配目标，就是压低第二项；streaming dataflow 的目标则是压低第三项，并减少中间张量对 HBM 的反复读写。

与 GPU 相比，RDU 的优势来自可编译的空间数据流和更大的本地模型容量；代价是编译、place-and-route、静态调度和硬件资源匹配更复杂。GPU 的 SIMT 模型在大 GEMM 和高度规则的 dense batch 上非常强，但跨 SM 的任意通信和复杂融合通常要通过 shared cache/HBM 或手写 kernel 完成。RDU 把通信本身也变成编译目标：算子不仅被安排到计算单元，边上的 tensor 流、重排、广播和背压也被安排到硬件 fabric。

> 💡 关键：SambaNova RDU 的“三级存储”不是普通缓存层次，而是配合数据流编译器使用的模型承载策略：SRAM 保流水线、HBM 保热专家、DDR 保大模型集合。

#### 🧪 练习题

```yaml
question: "SambaNova RDU 用三级存储架构解决大模型存储墙时，各层最核心的分工是什么？"
options:
  - "PMU SRAM 保存片上 stage buffer，HBM 保存高带宽热数据，DDR 保存大容量模型/专家集合"
  - "所有权重都必须常驻 PCU 寄存器，DDR 只用于操作系统日志"
  - "HBM 只负责控制流，PMU SRAM 只负责网络通信，DDR 只负责矩阵乘"
  - "三级存储完全由硬件透明缓存替换，编译器不参与数据放置"
answer: 0
explain: "RDU 的内存层次是软件管理和编译器感知的：PMU SRAM 服务片上流水，HBM 提供当前工作集带宽，DDR 提供大模型容量。"
```
