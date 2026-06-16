### FuseFlow

```yaml
id: fuseflow
name: FuseFlow
full_name: 融合中心稀疏编译框架 (FuseFlow Fusion-Centric Compilation)
year: '2026'
org: Stanford/SambaNova
paper_url: https://asplos-conference.org/asplos2026/program/
category: hw_sw_codesign
parent: tvm
motivation: 以融合为中心的稀疏深度学习编译框架
```

#### 📝 一句话总结

FuseFlow 提出了面向稀疏深度学习和 streaming dataflow 硬件的融合中心编译框架，将 PyTorch 稀疏模型转换为可融合的 sparse dataflow graphs。它解决了现有稀疏 dataflow 编译器通常只能处理单个 sparse tensor expression、难以跨表达式融合整个 ML pipeline 的问题。

#### 🎯 核心要点

- 输入为 PyTorch 稀疏 ML 模型，经 MLIR Sparse/Linalg 方言降低为 SAMML/SAM 风格数据流表示
- 支持 general cross-expression fusion，把多个生产者-消费者 sparse Einsum 表达式合成更大的 fused sparse dataflow graph
- 用 partial order graph (POG) 同时表达局部 dataflow order、稀疏存储 mode order 和跨表达式依赖
- 引入 fusion table 作为降低 IR，延迟物化 SAM 节点并记录流之间的连接关系，便于生成 dataflow graph
- 支持 parallelization、dataflow ordering、sparsity blocking 和基于成本模型的 fusion heuristic
- 目标是可重构 dataflow 架构与周期精确模拟器，也可通过 Vitis HLS/FPGA 路径做硬件验证
- 评估覆盖 GCN、GraphSAGE、sparse autoencoder、GPT-3 BigBird block-sparse attention，显示 full fusion 并非总是最优

#### 🔬 深入细节

##### 核心示意图

![FuseFlow 融合形式示意](https://ar5iv.labs.arxiv.org/html/2511.04768/assets/x3.png)
*图：FuseFlow 论文 Figure 3 的 ar5iv 公开镜像，展示 pattern-based operator fusion、intra-expression iteration fusion 与 cross-expression fusion 等不同融合层次。论文系统总览在 arXiv HTML 中为内联 SVG，因此这里使用公开 PNG 形式的融合机制图。*

##### 算法伪代码

```python
# FuseFlow: cross-expression sparse dataflow compilation
def compile_with_fuseflow(torch_model, schedule):
    mlir = lower_pytorch_to_mlir_sparse_linalg(torch_model)
    expr_dag = extract_sparse_einsum_expressions(mlir)
    fusion_groups = choose_fusion_groups(expr_dag, schedule)
    samml_graphs = []

    for group in fusion_groups:
        pog = PartialOrderGraph()
        fused = FusedEinsum()

        for expr in topological_order(group):
            expr = rename_local_reduction_indices(expr)
            pog.add_edges(expr.storage_mode_order_constraints())
            pog.add_edges(expr.user_dataflow_order_constraints())
            fused.connect_producers_to_consumers(expr)
            pog.propagate_order_edges_from_new_connections(fused)

        if pog.has_cycle():
            fused.materialize_permuted_tensor_view()
            pog = rebuild_partial_order_graph(fused)

        for order in pog.valid_topological_orders():
            table = build_fusion_table(fused, order)
            graph = lower_table_to_samml_dataflow(table)
            graph = apply_parallelization_and_sparsity_blocking(graph, schedule)
            samml_graphs.append(graph)

    return emit_comal_or_hls(samml_graphs)
```

##### 方法机制解读

FuseFlow 的出发点是稀疏 ML 的效率瓶颈不只在单个 sparse matrix multiplication。GCN、GraphSAGE、BigBird attention、sparse autoencoder 这类模型由多个 sparse/dense tensor expression、非线性、mask、reshape 和中间张量组成。若每个表达式单独编译执行，系统需要频繁物化中间稀疏张量并反复扫描 coordinate stream；若盲目 full fusion，又可能引入重复计算或破坏稀疏存储的有序遍历。因此 FuseFlow 把“融合粒度”提升为编译器的中心问题。

它建立在 Sparse Abstract Machine (SAM) 之上。SAM 把稀疏张量表达为 coordinate、reference 和 value stream，并用 level scanner、intersect/union、repeater、ALU、reducer、level writer 等 primitive 组成数据流图。例如一个稀疏矩阵乘可写为：

$$
T^0_{ij}=\sum_k \hat{A}_{ik}X_{kj}
$$

在 dataflow 图中，\(\hat{A}\) 的 CSR/CSC 等存储格式会规定合法的 mode traversal order，计算表达式本身又规定 reduction 和 broadcast 的局部顺序。FuseFlow 的难点是：当多个表达式被融合后，同一个张量可能被不同消费者以不同索引顺序访问，简单做 index substitution 会产生与存储格式冲突的遍历。

为此，FuseFlow 使用 partial order graph (POG) 作为跨表达式融合的约束核心。可以把它看成索引变量上的有向图：

$$
G_{POG}=(V_I, E_{storage}\cup E_{dataflow}\cup E_{producer\rightarrow consumer})
$$

其中 \(V_I\) 是融合区域内的索引变量，\(E_{storage}\) 来自稀疏张量存储 mode order，\(E_{dataflow}\) 来自用户或局部表达式要求的遍历顺序，\(E_{producer\rightarrow consumer}\) 来自产生者和消费者之间的索引替换关系。若 POG 无环，拓扑序就是合法的全局 fused dataflow order；若出现环，说明某些张量视图无法用同一个顺序 concordantly traverse，FuseFlow 会为某个 use 物化 permuted tensor view 来打破冲突。

POG 解决“能否融合和以什么顺序融合”，fusion table 解决“如何降低到 dataflow graph”。传统 loop compiler 可以在语法树上移动循环，而 streaming dataflow compiler 需要决定每个 level scanner、repeater、joiner、reducer 和 writer 如何空间连接。Fusion table 用表格单元记录每个索引/操作对应的 stream component，可以引用尚未物化的节点，因此编译器在遍历 fused Einsum 时不必立即创建完整图。完成后，表格中的指针关系被展开为 SAMML graph，再交给 Comal simulator 或 HLS 路径。

融合不是越多越好。Full fusion 能减少中间张量写回和重复读取，提升 operational intensity；但在图神经网络中，把多层 sparse matmul 融成一个大表达式可能把共享中间结果变成重复计算，导致 FLOPs 增加。论文因此同时支持 unfused、partially fused 和 fully fused 配置，并用 heuristic 估计计算量和内存访问量来提前剪掉明显劣的方案。抽象地说，编译器在比较：

$$
Cost(F)=FLOPs(F)+\lambda\cdot Bytes(F)+\mu\cdot Reformat(F)
$$

其中 \(F\) 是某个 fusion group。对 GPT-3 BigBird block-sparse attention，full fusion 可带来显著加速；对 GCN/GraphSAGE，partial fusion 往往更合理，因为它保留层内融合带来的内存收益，同时避免跨层 full fusion 的重算。

与 TVM、TACO、MLIR SparseTensor 或早期 SAM 编译器相比，FuseFlow 的独特性在于它不是只为单个 sparse kernel 生成高效代码，而是把一个稀疏 ML 模型中的多个表达式整体纳入 dataflow 编译。它面向的是可重构 dataflow 架构：程序输出不是普通 CPU/GPU loop nest，而是 streaming operators 之间的空间连接和调度。论文还用周期精确 simulator，并与 Xilinx VU9P/AWS F1 上的 post-synthesis RTL 仿真对齐，说明 SAMML/Comal 路径不仅是抽象图优化，也能反映硬件趋势。

> ⚠️ 注意：FuseFlow 的“融合中心”不是简单把所有算子合并成一个 kernel，而是受稀疏存储顺序、数据流顺序和重算成本共同约束的 fusion design-space exploration。

#### 🧪 练习题

```yaml
question: "FuseFlow 中 partial order graph (POG) 的主要作用是什么？"
options:
  - "记录稀疏张量存储顺序、局部 dataflow 顺序和跨表达式依赖，判断融合后是否存在合法全局遍历顺序"
  - "把所有稀疏张量强制转换成 dense tensor，以便普通 GPU kernel 执行"
  - "只用于统计模型参数量，不参与代码生成"
  - "替代所有硬件模拟器，直接给出最终芯片面积"
answer: 0
explain: "POG 是 FuseFlow 跨表达式融合的约束图；若图无环，拓扑序给出合法 fused dataflow order，若有冲突则需要物化额外张量视图或改变融合方案。"
```
