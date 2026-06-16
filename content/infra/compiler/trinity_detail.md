### Trinity：Tile级等价饱和三维张量程序优化器

```yaml
id: trinity
name: Trinity
full_name: "Tile级等价饱和三维张量程序优化器 (Trinity)"
year: "2026"
org: KAIST/FuriosaAI
paper_url: https://ina.kaist.ac.kr/publications
category: tensor_ir
parent: ansor
motivation: Tile级等价饱和联合优化代数、内存与计算编排
```

#### 📝 一句话总结

Trinity 提出 tile 级等价饱和优化器，把代数等价、内存 I/O 和计算编排放进同一个可重写 IR 与 e-graph 搜索空间，解决图级优化和算子级调度分离导致的跨算子 tile 级优化缺失问题。

#### 🎯 核心要点

- **三维联合优化**：同时搜索 algebraic equivalence、memory I/O、compute orchestration，而不是先做图重写再交给算子调度器
- **Tile 级 IR**：把 `load`、`store`、`seq`、`loop`、`matmul`、`rsum`、`softmax` 等都表示为 tile 上的一等构造
- **状态 IR 上的等价饱和**：用 expression propagation、sequence canonicalization、semantic dependency check 让 e-graph 能安全处理显式内存和控制流
- **两遍提取算法**：先按 kernel 数提取 loop skeleton，再在固定执行上下文里按 FLOPs 提取 loop body，避免固定局部代价模型失效
- **自动发现 fully fused attention**：从朴素 Transformer 解码程序中自动把 QKV projection、reshape 和 attention 融入单 kernel
- **后端落地**：优化后的 Trinity IR 降到 Triton v3.4.0，最多提取 512 个候选并在真实硬件上 profiling 选择最优 kernel
- **性能结果**：论文在 Transformer 变体上报告相对 TensorRT 最高 2.09x、相对 TorchInductor 最高 2.35x、相对 Mirage 最高 3.07x 的加速

#### 🔬 深入细节

![Trinity 三维联合优化流程示意](https://quickchart.io/graphviz?format=png&graph=digraph%20G%20%7B%20rankdir%3DLR%3B%20graph%20%5Bbgcolor%3D%22white%22%5D%3B%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23eef6ff%22%2C%20color%3D%22%23406080%22%2C%20fontname%3D%22Arial%22%5D%3B%20edge%20%5Bcolor%3D%22%23406080%22%5D%3B%20Input%20%5Blabel%3D%22Tensor%20program%22%5D%3B%20IR%20%5Blabel%3D%22Tile-level%20IR%0Aloads%2Fstores%20%2B%20loops%20%2B%20tile%20ops%22%5D%3B%20Sat%20%5Blabel%3D%22E-graph%20saturation%0Arewrite%20algebra%20%2B%20memory%20%2B%20orchestration%22%5D%3B%20Ext%20%5Blabel%3D%22Two-pass%20extraction%0Aloop%20skeleton%20then%20loop%20body%22%5D%3B%20Kern%20%5Blabel%3D%22Triton%20kernels%0Ahardware%20profiling%22%5D%3B%20Input%20-%3E%20IR%20-%3E%20Sat%20-%3E%20Ext%20-%3E%20Kern%3B%20%7D)
*图：根据 Trinity 论文 Figure 1 的“三维优化空间”和论文系统流程重绘。官方论文 PDF 图源：`https://ina.kaist.ac.kr/assets/bibliography/Trinity.pdf`。*

```python
# Trinity 两遍提取算法的简化伪代码
def two_pass_extract(egraph, top_k):
    semi_programs = []
    max_kernel = 0

    # Pass 1: 只选择 seq/loop 等 loop-structure 节点
    # 代价用 outermost parallel loop 数量近似 kernel 数。
    while len(semi_programs) < top_k:
        semi_programs.extend(extract_loop_structure(
            egraph=egraph,
            eclass=egraph.root,
            max_kernel=max_kernel,
        ))
        max_kernel += 1

    # Pass 2: loop skeleton 已固定，执行上下文也固定
    # 此时可用 greedy extraction 选择 FLOPs per compute unit 最小的 loop body。
    candidates = []
    for skeleton in semi_programs[:top_k]:
        body = greedy_extract_body(egraph, skeleton, cost="min_flops_per_unit")
        candidates.append(assemble_program(skeleton, body))

    return profile_on_hardware(lower_to_triton(candidates))
```

##### 1. 为什么要把优化粒度降到 tile

传统张量编译器通常拆成两层：图级优化器决定算子融合和代数重写，算子级调度器决定 tiling、parallelization 和 cache placement。这个接口看似清晰，但会丢掉 FlashAttention 这类优化真正依赖的信息：online softmax 不是单纯的代数公式变化，也不是单纯的 kernel fusion，而是同时改变 softmax 的计算顺序、把 \(Q,K,V\) tile 和 running statistics 留在片上内存、并让 key tile 的顺序循环与 query/head 维度的并行调度协调起来。论文把这一点总结成三个耦合维度：

$$
\text{program choice} =
(\text{algebraic equivalence},\ \text{memory I/O},\ \text{compute orchestration})
$$

只优化其中一个维度会过早承诺。例如图级系统可以看到 \(\operatorname{softmax}(QK^T)V\)，但看不到中间 tile 是否能留在 SRAM；算子调度器能选择 tile size，却通常不能把 QKV projection 的循环和 attention 循环重排到同一个 kernel。Trinity 的核心判断是：tile 是硬件实际执行和内存复用的单位，因此 IR 必须在 tile 层同时暴露计算、内存和控制流。

##### 2. Trinity IR 如何让三维优化都变成 rewrite

Trinity IR 的 tensor declaration 区分 `input`、`output` 和 `variable`：前两者对应全局内存读写，`variable` 是可能在片上或片外的中间 tile。索引表达式用 `tile n`、`full_tile`、`elem n` 等表示 tile 切片和循环变量；内存操作显式写成 `(load tensor idx)` 与 `(store tensor value idx)`；计算操作包括 `matmul`、`rsum`、elementwise op、reshape 类 op；控制流是 `(seq op1 op2)` 和 `(loop start end tile_n n body)`。一个 Trinity 程序因此不仅描述“算什么”，也描述“什么时候加载/存储 tile”和“哪些 tile 操作在同一个循环或 kernel 里执行”。

举例说，一个被写回 HBM 的中间张量和一个在同一 kernel 内复用的中间 tile，在传统图 IR 里可能都是边上的 tensor；在 Trinity IR 里二者的差异由 `store` 和后续 `load` 是否跨 loop/kernel 体现。kernel 边界由外层 parallel loop 决定，memory placement 则按 load/store 的 loop 关系推导：跨 loop 或输入/输出张量走 off-chip，其余中间值尽量保留在 on-chip。这样，循环融合不只是减少 launch，也会改变内存放置；代数 factoring 不只是少算 FLOPs，也可能消除 loop-carried dependency，从而解锁进一步 fusion。

##### 3. 状态 IR 上做 equality saturation 的三个保护

普通 equality saturation 假设表达式近似纯函数式，而 Trinity IR 有 `seq`、`load`、`store`。第一个问题是代数结构被内存操作切断：`store A (* 7 3)` 后再 `load A`，e-graph 看不到 `(/ (* 7 3) 7)` 这样的连续子树。Trinity 用 expression propagation 记录 store 写入的符号表达式，并把后续同 tile 的 load 补上等价表达式，让代数规则可以跨显式内存边界匹配。

第二个问题是 `seq` 的结合方式会造成指数膨胀。若任意使用 `(seq (seq a b) c)` 与 `(seq a (seq b c))`，同一串语句会有大量括号形态，e-graph 为了匹配交换和重排规则会保存大量冗余等价类。Trinity 强制把 sequence 规范化成右结合形式：

$$
\operatorname{seq}(\operatorname{seq}(a,b),c)
\Rightarrow
\operatorname{seq}(a,\operatorname{seq}(b,c))
$$

第三个问题是正确性。loop fusion、loop insertion、store/load reorder 都必须避免跨迭代 RAW/WAW hazard。Trinity 用 egg 的 e-class analysis 给每个 e-class 维护 read/write region、alias、shape 和 loop-variable 依赖摘要，规则触发前先检查语义谓词。这样，代数规则仍按 tile value 的等价处理，涉及状态的规则则由依赖分析约束。

##### 4. 两遍提取解决上下文相关代价

传统 e-graph extraction 会给每个 e-node 一个固定成本，然后用 greedy 或 ILP 选总代价最小的表达式。Trinity 的 tile IR 不满足这个假设：同一个 `load` 如果在同一个 kernel 内复用，代价接近片上访问；如果跨 kernel，则意味着 HBM 读写。同一个 `+` 如果处在顺序 loop 内，会按迭代次数重复；如果处在并行 loop 内，单计算单元成本又完全不同。

因此 Trinity 先提取 loop skeleton。第一遍只关心 `seq`、`loop` 这类决定 kernel 边界的结构，用 outermost loop 数量估计 kernel count，得到若干 kernel 数少的 semi-expression。第二遍在 loop skeleton 固定后，执行上下文已知，再按每个计算单元 FLOPs 选择 loop body。最后所有候选被降到 Triton 并在目标 GPU 上 profiling。这个流程牺牲了一点全局最优保证，但把 \(>10^{17}\) 级别的等价程序空间压到可落地的候选集合。

##### 5. Fully fused attention 的机制

Trinity 的关键 case study 是从朴素解码 Transformer 自动发现 fully fused attention。朴素程序先做 QKV projection 和 reshape，再执行 attention。Trinity 首先在 attention 内融合 logit 和 reduce-sum；然后用分配律把依赖 accumulator 的除法移出矩阵乘循环；接着用 algebraic factoring 把 division 完全 hoist 到内层 \(p\)-loop 外，从而消除阻止 fusion 的 loop-carried dependency。这个阶段已经能重发现 FlashAttention 式 online softmax。

更进一步，Trinity 把 QKV projection 和 reshape 也纳入同一循环结构。最后它利用 iteration-space reindexing 识别 `(loop 0 4096 128 n)` 与按 head 展开的循环在迭代次数上等价，把 `elem h` 对齐成 `elem n`，于是 QKV projection、reshape、attention 的 tile 数据流可以合成单 kernel。直觉上，Trinity 不再先为所有 head 物化 \(Q,K,V\)，而是按 head/tile 产生 \(Q,K,V\) 后立即流入 attention，避免写回中间张量和等待所有 head 完成。

> 💡 关键：Trinity 的贡献不只是“用 e-graph 搜索更多 rewrite”，而是把 tile 内存行为和 loop/kernel 边界也放进 rewrite 对象中，使代数变化能反过来改变可融合性和内存放置。

#### 🧪 练习题

```yaml
question: "Trinity 为什么不能直接使用传统 e-graph 的固定 e-node 成本提取最优程序？"
options:
  - "因为 Trinity IR 不包含任何纯代数表达式"
  - "因为 tile 操作的代价依赖 loop/kernel 上下文，例如同一个 load 可能是片上复用也可能是 HBM 访问"
  - "因为 equality saturation 只能处理 CPU 程序，不能处理 GPU 程序"
  - "因为 Triton 后端不支持 profiling"
answer: 1
explain: "Trinity 的 load/store、loop 和计算节点成本都受 kernel 边界、并行映射和内存放置影响，所以先固定 loop skeleton，再提取 loop body。"
```
