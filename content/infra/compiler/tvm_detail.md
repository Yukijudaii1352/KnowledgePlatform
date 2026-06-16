### TVM：端到端深度学习自动优化编译框架

```yaml
id: tvm
name: TVM
full_name: "端到端深度学习自动优化编译框架 (Tensor Virtual Machine)"
year: "2018"
org: UW
paper_url: https://www.usenix.org/conference/osdi18/presentation/chen
category: tensor_ir
parent: halide
motivation: "将编译优化转化为搜索问题，ML自动调优替代手工算子"
```

#### 📝 一句话总结

TVM 提出端到端深度学习编译栈，把图级优化、张量表达式、schedule 原语和机器学习代价模型组合起来，将算子实现优化转化为可搜索问题，从而在 CPU、GPU、移动 GPU 和 FPGA/ASIC 类加速器上自动生成接近或超过手工库的代码。

#### 🎯 核心要点

- **端到端编译栈**：从 TensorFlow、MXNet、PyTorch、Keras、ONNX/CoreML 等前端导入计算图，经过图重写、算子级代码生成、自动调优和 runtime 打包部署
- **图级优化**：执行 operator fusion、constant folding、静态内存规划、数据布局变换，减少中间张量和跨 layout copy
- **Tensor Expression**：用声明式索引公式描述算子计算语义，把“算什么”和“如何调度执行”解耦，继承并扩展 Halide 的 compute/schedule 思想
- **Schedule 原语扩展**：在 Halide loop transformation、thread binding、compute locality 基础上新增 GPU shared memory scope、tensorization、latency hiding 等深度学习硬件相关原语
- **自动搜索优化**：将调度配置 \(s\) 的选择建模为 \(\arg\min_{s\in\mathcal{S}} f(g(e,s))\)，用 ML 代价模型和模拟退火探索庞大 schedule 空间
- **学习型代价模型**：从 lowered loop AST 提取结构化特征或送入 TreeRNN/XGBoost，预测配置性能，减少真实硬件测量次数
- **RPC 设备池**：通过远程编译、上传、运行和 profiling，在嵌入式设备和多种硬件上自动收集测量数据
- **性能可移植性**：OSDI 论文在 server GPU、embedded GPU、embedded CPU 和 FPGA-style accelerator 上展示了跨平台部署能力

#### 🔬 深入细节

![TVM 系统总览](https://ar5iv.labs.arxiv.org/html/1802.04799/assets/x2.png)
*图：TVM 端到端编译栈。模型从多种前端进入计算图，图级优化后进入 operator-level optimization，再生成目标硬件代码并打包到 runtime module。来源：论文 Figure 2*

```python
# TVM 端到端优化伪代码：图优化 + 张量程序自动调优
def tvm_compile(model, target, hardware_pool):
    graph = import_from_frontend(model)                 # TensorFlow / PyTorch / ONNX / CoreML ...
    graph = infer_shapes_and_types(graph)

    graph = rewrite_graph(graph, passes=[
        "operator_fusion",
        "constant_folding",
        "layout_transform",
        "static_memory_plan",
    ])

    tuned_kernels = {}
    for fused_op in graph.fused_operators():
        te = lower_to_tensor_expression(fused_op)       # declarative compute
        schedule_space = instantiate_schedule_template(te, target)
        tuned_kernels[fused_op] = autotune(te, schedule_space, target, hardware_pool)

    graph_json, lib, params = build_runtime_module(graph, tuned_kernels, target)
    return RuntimeModule(graph_json, lib, params)


def autotune(te, schedule_space, target, hardware_pool):
    dataset = []
    cost_model = MLBasedCostModel()
    states = initialize_random_walks(schedule_space)

    for round_id in range(MAX_ROUNDS):
        candidates = []
        for state in states:
            candidate = parallel_simulated_annealing(
                state,
                neighbor=lambda s: mutate_tile_bind_cache_tensorize(s),
                score=lambda s: cost_model.predict(lower_to_loop_ast(te, s)),
            )
            candidates.append(candidate)

        batch = select_top_and_diverse(candidates, cost_model)
        measurements = hardware_pool.rpc_measure(batch, target)
        dataset.extend(measurements)
        cost_model.fit(dataset)

    return min(dataset, key=lambda item: item.latency).schedule
```

##### 1. 动机：为什么单靠厂商算子库不够

深度学习部署面临的硬件范围很宽：server GPU、移动 CPU/GPU、FPGA、ASIC、TPU-like accelerator。传统框架通常把图级执行交给框架，把算子级优化交给 cuDNN/MKL/厂商库；这在常规卷积上有效，但对新模型、新算子组合、低精度变体、融合算子和新硬件很难扩展。一个融合后的 `conv2d + bias + relu + layout_transform` 可能没有现成库函数；如果不融合，性能受内存访问拖累；如果融合，又需要为每个硬件手写 kernel。TVM 的核心判断是：算子实现不应该是固定库条目，而应该由可组合 schedule 原语生成，并通过自动搜索为硬件选择最优实例。

##### 2. 计算图优化：先制造更好的算子边界

TVM 前端先把模型导入为计算图，图中节点是张量算子，边是数据依赖。图级 pass 的目标是减少后续 operator-level optimization 的负担并暴露更高收益的融合单元。论文把算子分为 injective、reduction、complex-out-fusable、opaque 四类，并给出通用融合规则：多个 injective 可融合；reduction 可以和输入侧 injective 融合；conv2d 这类复杂算子可以融合输出侧逐元素操作；opaque 算子作为边界。融合直接减少中间张量物化：

$$
\text{bytes}_{\text{saved}} \approx \sum_{t\in \text{intermediates}} 2\cdot \text{size}(t)
$$

其中一次是 producer 写中间结果，一次是 consumer 读中间结果。图层还负责数据布局变换：如果后端更偏好 tiled layout 或 channel-blocked layout，TVM 会在图中插入必要 layout transform，并尽量让相邻算子使用同一内部布局，避免重复转换。

##### 3. Tensor Expression 与 Schedule：继承 Halide，但面向深度学习硬件扩展

TVM 的 Tensor Expression 描述“每个输出元素如何计算”，不规定循环顺序、tile 大小、thread 绑定或缓存层级。例如矩阵乘法可写成：

$$
C_{i,j}=\sum_{k=0}^{K-1} A_{i,k}\cdot B_{k,j}
$$

Schedule 则决定如何把这个公式映射到硬件。一个 schedule 可以先 tile \(i,j,k\)，再 reorder 循环，把外层绑定到 GPU block/thread，把局部 tile 缓存在 shared memory，把内层 reduce tensorize 到硬件矩阵指令，最后插入 double buffering 或 latency hiding。TVM 对 Halide 的关键扩展在于：深度学习硬件的“基本指令”不总是标量或 SIMD，而可能是张量级 intrinsic；加速器还常要求编译器显式管理 SRAM、DMA 和流水线依赖。因此 TVM 把 tensorization、memory scope、latency hiding 作为 schedule primitive，使同一个 TE 公式可以生成 CPU loop、CUDA/OpenCL kernel 或 FPGA accelerator microcode。

##### 4. 自动调优：把 schedule 选择转为搜索问题

给定表达式 \(e\)、schedule 空间 \(\mathcal{S}_e\)、代码生成器 \(g(e,s)\) 和真实硬件代价 \(f(\cdot)\)，TVM 的优化目标是：

$$
s^*=\arg\min_{s\in\mathcal{S}_e} f(g(e,s))
$$

难点是 \(\mathcal{S}_e\) 可能巨大：tile 因子、循环顺序、unroll、vectorize、parallel、cache read/write、thread binding、tensorization 组合后轻易达到百万到十亿级配置。黑盒穷举不可行，手写解析代价模型又很难覆盖不同硬件。TVM 因此采用“测量少量真实样本 + 训练代价模型 + 用模型指导探索”的闭环。模型输入不是高层算子名，而是 lowered loop AST 的结构特征，例如每层循环访问的内存大小、reuse、stride、并行度、向量化信息；输出是延迟或相对排序。模拟退火在 schedule 空间中随机游走，倾向接受预测更快的邻居，同时保留一定探索能力。

##### 5. 代价模型与 RPC 设备池：让优化真正落到硬件

TVM 的自动调优不是只跑静态模型，而是在目标硬件上编译、上传、执行和计时。RPC 设备池让主机可以交叉编译嵌入式设备模块，把候选 kernel 上传到 Raspberry Pi、Mali GPU、FPGA board 或 GPU 机器，收集真实延迟后更新训练集。代价模型的一个简化目标可以写成 pairwise ranking：

$$
\mathcal{L}_{\text{rank}}=\sum_{(i,j): y_i<y_j}\max(0,\hat{y}_i-\hat{y}_j+\gamma)
$$

其中 \(y_i\) 是真实测量延迟，\(\hat{y}_i\) 是模型预测。排序损失的直觉是：自动调优只需要找到更快的 schedule，不一定要精确预测毫秒值。这个思想后来在 AutoTVM/Ansor/MetaSchedule 中继续演化为更系统的搜索策略和任务级调优数据库。

##### 6. 与 XLA、Glow 和手工库的差异

XLA 的强项是 HLO 全图优化和生产级后端流水线；Glow 的强项是 graph lowering、两级 IR 和推理内存规划；TVM 的独特位置在于把“算子如何实现”显式暴露给 schedule 搜索。相比厂商库，TVM 不依赖预先枚举的 fused kernel，能为新算子组合生成代码；相比只做图优化的编译器，TVM 可以深入循环、线程、缓存和硬件 intrinsic 层。代价是 TVM 的性能高度依赖 schedule template、搜索预算和测量质量；如果没有 auto-tuning，TVM 可能不如高度手工调优库。论文的贡献正是把这些工程步骤系统化为端到端自动优化框架。

> 💡 **关键**：TVM 把深度学习编译拆成“图级选择融合边界”和“算子级搜索实现方式”两个耦合问题。图优化决定要生成哪些 fused op，自动调优决定每个 fused op 在目标硬件上如何跑得最快。

#### 🧪 练习题

```yaml
question: "TVM 相比依赖 cuDNN/MKL 等手工算子库的框架，最核心的优势是什么？"
options:
  - "完全不需要进行图级优化"
  - "用 Tensor Expression 和 schedule 搜索为新算子/融合算子自动生成目标硬件代码"
  - "只支持 NVIDIA GPU，因此优化空间更小"
  - "把所有模型都转换成解释执行的 Python 循环"
answer: 1
explain: "TVM 将算子计算和调度分离，并用 ML 代价模型搜索 schedule，因此可以为厂商库没有覆盖的新算子组合和新硬件后端生成优化实现。"
```
