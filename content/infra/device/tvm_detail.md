### TVM

```yaml
id: tvm
name: TVM
full_name: 张量虚拟机 (Tensor Virtual Machine)
year: '2018'
org: UW/AWS
paper_url: https://www.usenix.org/conference/osdi18/presentation/chen
category: hw_sw_codesign
parent: —
motivation: 自动调优编译器高效部署模型到多种硬件
```

#### 📝 一句话总结

TVM 提出了端到端深度学习优化编译栈，把计算图优化、张量表达式、硬件感知 schedule 原语和机器学习代价模型组合起来，解决模型部署到 CPU、GPU、移动端和定制加速器时需要反复手写高性能算子的难题。它将“如何生成最快 kernel”形式化为搜索问题，使同一模型能够针对不同硬件自动生成优化代码。

#### 🎯 核心要点

- 支持从 TensorFlow、MXNet、Keras、PyTorch、ONNX/CoreML 等前端导入模型计算图
- 图级 pass 覆盖算子融合、常量折叠、静态内存规划和数据布局重写
- Tensor Expression 用声明式索引公式描述计算语义，将“算什么”和“如何执行”解耦
- Schedule primitive 表达 tiling、reorder、vectorize、unroll、thread binding、cache read/write、tensorization 等硬件映射选择
- AutoTVM 使用机器学习代价模型与模拟退火搜索 schedule 空间，减少真实硬件测量次数
- RPC 设备池支持在目标硬件上编译、上传、运行和 profiling，闭环更新代价模型
- 论文在 server GPU、embedded GPU、embedded CPU 和 FPGA-style accelerator 上展示性能可移植性

#### 🔬 深入细节

##### 核心示意图

![TVM 端到端编译栈](https://ar5iv.labs.arxiv.org/html/1802.04799/assets/x2.png)
*图：TVM OSDI 2018 论文 Figure 2 的 ar5iv 镜像。模型先进入 computational graph，经 high-level graph rewriting，再进入 operator-level optimization/code generation，最后生成 LLVM IR、CUDA/OpenCL 或 accelerator backend 可部署模块。*

##### 算法伪代码

```python
# TVM 的图优化 + 自动调优编译流程
def tvm_compile(model, target, rpc_pool):
    graph = import_from_frontend(model)
    graph = infer_shape_and_type(graph)
    graph = graph_rewrite(graph, passes=[
        "operator_fusion",
        "constant_folding",
        "layout_transform",
        "static_memory_planning",
    ])

    lowered_ops = {}
    for fused_op in graph.fused_operators():
        te = lower_to_tensor_expression(fused_op)
        schedule_space = instantiate_schedule_template(te, target)
        best_schedule = autotune(te, schedule_space, rpc_pool)
        lowered_ops[fused_op] = codegen(te, best_schedule, target)

    return link_runtime_module(graph, lowered_ops, target)


def autotune(te, schedule_space, rpc_pool):
    measurements = []
    cost_model = MLBasedCostModel()
    states = random_initial_schedules(schedule_space)

    for round_id in range(NUM_ROUNDS):
        candidates = simulated_annealing(
            states,
            mutate=lambda s: tile_bind_cache_tensorize(s),
            score=lambda s: cost_model.predict(lower_to_loop_ast(te, s)),
        )
        batch = select_top_diverse(candidates)
        measurements += rpc_pool.measure(batch)  # 在真实设备上运行计时
        cost_model.fit(measurements)

    return min(measurements, key=lambda m: m.latency).schedule
```

##### 方法机制解读

TVM 的出发点是深度学习部署的“长尾硬件 + 长尾算子”问题。传统框架依赖 cuDNN、MKL、NNPACK 等厂商或社区手写库，一旦模型包含新算子、融合模式、低精度布局或新硬件后端，就需要重新写 kernel。TVM 选择把算子优化拆成两个层次：图层决定哪些节点应融合、布局如何传播、哪些中间张量可以省掉；算子层把融合后的计算表达为 Tensor Expression，再通过 schedule 搜索映射到具体硬件。

Tensor Expression 描述的是数学计算，而不是循环实现。例如矩阵乘法可以写成：

$$
C_{i,j}=\sum_{k=0}^{K-1} A_{i,k}\cdot B_{k,j}
$$

这个公式本身不规定 \(i,j,k\) 的循环顺序、tile 大小、GPU thread/block 绑定、shared memory 缓存或向量化方式。Schedule 才决定实现策略：可以把 \(i,j\) 切成 block tile，把 \(k\) 切成 reduction tile，把输入搬到 shared/local memory，把内层乘加 tensorize 到硬件矩阵指令。这样同一段 TE 可以生成 CPU 上的多线程 SIMD loop，也可以生成 CUDA/OpenCL kernel 或定制加速器指令流。

图级优化的价值在于制造更好的算子边界。若 `conv2d -> bias -> relu -> layout_transform` 分别执行，每个节点都要读写中间张量；融合后只需在寄存器或片上缓存中传递中间值。一个简化的内存流量收益可写成：

$$
\Delta \text{bytes}\approx\sum_{t\in \text{fused intermediates}}2\cdot \operatorname{size}(t)
$$

这里的 2 分别对应 producer 写中间结果和 consumer 读中间结果。TVM 还会根据目标后端选择 NCHW、NHWC、blocked layout 等布局，并尽量让相邻算子使用同一内部布局，避免重复转换。

自动调优是 TVM 最重要的机制。给定表达式 \(e\)、schedule 空间 \(\mathcal{S}_e\)、代码生成器 \(g(e,s)\) 和真实硬件代价函数 \(f\)，目标是：

$$
s^*=\arg\min_{s\in\mathcal{S}_e} f(g(e,s))
$$

难点在于 \(\mathcal{S}_e\) 可以非常大：tile 因子、循环重排、unroll、vectorize、thread binding、cache scope、tensorization 组合后达到百万甚至十亿级候选。TVM 不做穷举，而是从 lowered loop AST 抽取结构特征，用 XGBoost/TreeRNN 类模型预测候选 schedule 的性能，再用模拟退火生成高分候选，最后只把少量候选发送到真实硬件测量。真实测量再反过来训练代价模型，形成“预测-采样-测量-更新”的闭环。

与只做图优化的 XLA/Glow 相比，TVM 更强调算子级 schedule 搜索；与只依赖厂商库的部署栈相比，TVM 能覆盖库中不存在的新融合算子和新硬件。代价是它需要高质量 schedule template、测量预算和可靠 profiling 环境；如果没有调优，生成代码未必超过手写库。论文的长期影响在于把深度学习编译从“维护一堆特定算子实现”推进到“声明计算 + 搜索硬件映射”的范式，后续 Ansor、MetaSchedule、Relax 等系统都沿着这一方向演进。

> 💡 关键：TVM 的核心不是某一个固定优化，而是把图优化、张量 IR、硬件 schedule 和实机测量连成可自动搜索的编译闭环。

#### 🧪 练习题

```yaml
question: "TVM 将算子实现拆分为 Tensor Expression 和 Schedule 的主要目的是什么？"
options:
  - "让计算语义与硬件执行策略解耦，从而为不同目标自动搜索优化实现"
  - "强制所有深度学习模型只能在解释器中逐算子运行"
  - "取消图级优化，只保留前端模型格式转换"
  - "把所有卷积都替换为固定的 cuDNN 调用"
answer: 0
explain: "Tensor Expression 描述数学计算，Schedule 决定循环、缓存、线程和硬件 intrinsic 映射；二者分离后才能在不同硬件上搜索高性能实现。"
```
