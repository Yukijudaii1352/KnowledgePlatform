### nnScaler

```yaml
id: nnscaler
name: nnScaler
full_name: nnScaler
year: '2024'
org: Microsoft
paper_url: https://arxiv.org/abs/2312.05009
category: training_platform
parent: alpa
motivation: 约束引导的并行策略生成
```

#### 📝 一句话总结

nnScaler 提出 constraint-guided parallelization plan generation，用 `op-trans`、`op-assign`、`op-order` 三个并行原语和用户约束构造可搜索的并行计划空间，解决固定 3D 并行或手写策略无法覆盖新模型高效训练计划的问题。

#### 🎯 核心要点

- 三个并行原语：`op-trans(op, algo, n)` 描述算子/张量变换，`op-assign(op, d)` 描述设备放置，`op-order(op1, op2)` 描述同设备无依赖算子的执行顺序
- 约束引导搜索：用专家约束把巨大搜索空间收缩到可搜索子空间，同时仍能表达 DP/TP/PP、Alpa 风格 staged SPMD 和新策略
- 新计划空间：为 SwinTransformer 的 co-shard、T5 大 embedding 跨全设备切分、AlphaFold2 的 3F1B 调度构造传统系统难表达的并行计划
- 搜索策略组合：先抽取 staged_spmd 子空间并复用 Alpa 搜索，再用 ILP 优化 partition/placement，最后用 Tessel/Z3 搜索 temporal order
- 编译正确性：vTensor-pTensor 用 mask 跟踪切分前后的数据 lineage，检测依赖、发现可能死锁的 cycle，并自动插入 split/chunk、send/recv、allgather、allreduce、alltoall
- PyTorch 落地：把单卡 PyTorch 模型转换为 Graph IR，应用计划后生成每个设备的 PyTorch 子图并用 `torchrun` 分布式执行

#### 🔬 深入细节

![nnScaler 并行原语的时空调度抽象](https://www.microsoft.com/en-us/research/wp-content/uploads/2024/09/nnscaler-1-1024x483.jpg)
*图：Microsoft Research 官方文章 Figure 1，展示 DNN 数据流图、算子切分和 spatial-temporal schedule。*

![nnScaler 文档中的并行化流程](https://nnscaler.readthedocs.io/en/latest/_images/nnScaler_flow.png)
*图：nnScaler 官方文档流程图，展示从单卡 DNN model program 到多设备 parallel execution 的编译路径。*

```python
# nnScaler 论文 Algorithm 1 风格的计划搜索与编译伪代码
def generate_parallel_plan(model, devices, user_constraints):
    G = trace_to_graph_ir(model)  # PyTorch -> Graph IR

    C_trans, C_assign, C_order = build_space_with_primitives(
        G,
        primitives=[
            "op-trans(op, algo, n)",
            "op-assign(op, device)",
            "op-order(op1, op2)",
        ],
        constraints=user_constraints,
    )

    # 1. 在能复用现有搜索器的子空间内先搜索
    G_sub, C_sub_trans, C_sub_assign = GetSubSpace(G, C_trans, C_assign)
    C_new_trans, C_new_assign = Alpa(G_sub, C_sub_trans, C_sub_assign)

    # 2. 收缩剩余空间，并用 ILP 找到全图 partition/placement
    C_trans, C_assign = ShrinkSpace(C_trans, C_new_trans, C_assign, C_new_assign)
    final_trans, final_assign = ILP(
        G,
        C_trans,
        C_assign,
        objective="minimize max_d(Comp_d + Comm_d)",
    )

    # 3. 搜索同设备上无依赖算子的 temporal order
    final_order = Tessel(G, final_trans, final_assign, C_order)

    # 4. 编译计划：应用原语、检查依赖、插入通信、生成每卡 PyTorch 代码
    dist_ir = apply_primitives(G, final_trans, final_assign, final_order)
    dist_ir = materialize_dependencies_with_vtensor_ptensor(dist_ir)
    dist_ir = insert_collectives_and_send_recv(dist_ir)
    return lower_to_pytorch_per_device(dist_ir)
```

nnScaler 的问题设定是：大模型训练的并行计划不仅要决定“张量怎么切”，还要决定“切完的算子放在哪些 GPU 上”和“同一 GPU 上多个可交换算子按什么顺序跑”。Megatron-LM、DeepSpeed 这类系统把高效但有限的 3D 并行模式工程化；Alpa 扩大了自动搜索空间，但仍依赖预定义的层级空间。nnScaler 的观点是，固定搜索空间会排除很多对新模型很关键的计划，例如某些大 activation 算子可以让多个分片共享同一 GPU 顺序执行来减少通信，或者 T5 这类模型的大 embedding 表占显存多但计算少，应该跨全设备切分而不是独占某个 pipeline stage。

三类原语是整个系统的最小表达单元：

$$
\text{op-trans}(op, algo, n): op \rightarrow \{op_1,\dots,op_n\}
$$

$$
\text{op-assign}(op_i, d): op_i \mapsto d,\quad d \in D
$$

$$
\text{op-order}(op_i, op_j): op_i \prec op_j
$$

其中 `op-trans` 负责把一个算子按 batch、hidden、head、sequence 等维度切成子算子，也可以扩展为 recompute 或 swap 等变换；`op-assign` 负责把子算子映射到设备；`op-order` 则只约束没有数据依赖但共享设备的算子顺序。约束把这些原语的参数固定或限制到一个集合。例如 data/tensor parallel 可表达为“均匀切成 \(|D|\) 份，且每个 sub-op 放在不同设备上”；1F1B pipeline 可表达为对 forward/backward micro-batch 的一组 `op-order` 约束；AlphaFold2 的 3F1B 则用新的 `op-order` 约束交错三个 forward pass 和一个 backward pass。

搜索目标并不是穷举全部计划，而是逐步缩小空间。论文的 partition/placement 目标可写成：

$$
\min \max_{d \in D}\left\{\text{Comp}_d + \text{Comm}_d\right\}
$$

这里 \(\text{Comp}_d\) 是设备 \(d\) 上被分配算子的计算时间，\(\text{Comm}_d\) 是由分片和跨设备数据依赖引入的通信时间。这个问题可归约为整数线性规划，天然难解；nnScaler 的关键是让专家约束先把空间切小，再复用已有搜索器。对 staged SPMD 子空间，它可以调用 Alpa 类搜索；对剩余约束，它用 ILP 求 final transformation/assignment；对 temporal order，它调用 Tessel，把每个 sub-graph 分配到整数 time slot，并用 Z3 枚举不违反依赖的顺序。也就是说，nnScaler 的贡献不是单独发明一个新搜索器，而是让不同搜索策略能在统一原语/约束接口下组合。

编译正确性由 vTensor-pTensor 负责。pTensor 表示原始逻辑模型中的张量，vTensor 表示应用并行原语后某个算子实际访问的张量片段；每个 vTensor 记录自己对应 pTensor 的 mask。两个 vTensor 是否存在数据依赖，可以通过它们是否来自同一 pTensor 且 mask 是否相交判断：

$$
\text{dep}(v_i, v_j) \Longleftrightarrow p(v_i)=p(v_j)\ \land\ \text{mask}(v_i)\cap\text{mask}(v_j)\neq\emptyset
$$

这种 lineage 追踪让 nnScaler 可以在切分和重排后重新构造数据流图，发现可能导致 deadlock 的 cycle，并在 materialization 阶段插入具体数据操作。如果 producer 和 consumer 在同设备，可能只需要 `torch.split` 或 `torch.chunk`；如果跨设备，先插入 send/recv；如果多个 vTensor 的访问模式构成常见 collective，系统会用 allgather、allreduce 或 alltoall 替换点对点通信，以获得更好的通信效率。

从工程角度看，nnScaler 把“模型代码”和“并行计划代码”解耦。模型开发者可以继续写单 GPU PyTorch，系统专家用约束描述计划空间；Graph IR 生成后，nnScaler 应用计划、插入通信、把每个设备的子图降回 PyTorch 代码文件，再由 `torchrun` 并行执行。论文报告其在 SwinTransformer、T5、AlphaFold2 等模型上发现传统 DeepSpeed、Megatron-LM、Alpa 搜索空间之外的计划，最高获得 3.5 倍训练加速；官方文档也强调它的定位是把单卡 DNN 程序编译为可在多 GPU 上并行运行的程序。

> ⚠️ 注意：给定元信息中的 arXiv URL `2312.05009` 与 nnScaler 论文不匹配；本文细节依据官方 USENIX OSDI 2024 论文、Microsoft Research 官方文章和 nnScaler 官方文档完成。

#### 🧪 练习题

```yaml
question: "nnScaler 中 vTensor-pTensor 抽象的主要作用是什么？"
options:
  - "跟踪算子切分后的张量 lineage 和 mask，用于依赖检查、死锁避免与通信插入"
  - "把所有张量永久复制到每张 GPU 上"
  - "替代 PyTorch 的自动求导数学规则"
  - "只用于记录实验日志"
answer: 0
explain: "pTensor 表示原始逻辑张量，vTensor 表示切分后的访问片段；mask 相交关系让系统能重建数据依赖并选择 send/recv 或 collective 通信。"
```
