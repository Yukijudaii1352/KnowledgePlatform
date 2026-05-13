### Trinity: Three-Dimensional Tensor Program Optimization via Tile-level Equality Saturation

```yaml
标题: "Trinity: Three-Dimensional Tensor Program Optimization via Tile-level Equality Saturation"
作者: Jaehyeong Park, Byeongho Kim, Geonwoo Kim, Soojin Hwang, Jongse Park (KAIST & FuriosaAI)
机构: KAIST, FuriosaAI
会议: ASPLOS 2026
链接: https://doi.org/10.1145/3669940.3707261
代码: https://github.com/kaist-ina/Trinity-AE
关键词: tensor program optimization, equality saturation, tile-level IR, operator fusion, compiler
```

---

## 📝 一句话总结

Trinity 提出首个基于 **tile 级等价饱和(equality saturation)** 的张量程序优化器，将代数等价、内存 I/O 和计算编排三个维度的优化统一到同一搜索空间，在 H100 上相比 TensorRT 实现最高 2.09× 加速，并自动发现了超越手工优化 FlashAttention 的全融合注意力内核。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 现有优化器将图级代数优化与算子级 tiling/并行化分离处理，无法发现跨算子的 tile 级联合优化（如 FlashAttention 需要同时改变代数结构和内存布局） |
| **关键洞察** | 代数等价、内存 I/O、计算编排三者深度耦合——改变代数结构可解锁新的融合机会，融合决策又影响内存放置和并行策略 |
| **方法** | 设计 tile 级 IR（tile 为一等公民），定义覆盖三个维度的重写规则，通过 equality saturation 在 e-graph 中紧凑表示 >10^17 个等价程序，两遍提取算法高效选出最优实现 |
| **核心贡献** | (1) 首个 tile 级等价饱和框架；(2) 自动发现 fully fused attention（QKV投影+reshape+attention 单内核）；(3) 比 TensorRT 快 1.10–2.09×，比 Mirage 快 1.04–3.07×，比 FlashInfer 快 1.35× |
| **局限** | 依赖 Triton 后端（无法利用 FA3 的硬件特性如 warp-specialization）；编译时间 203–1459s；当前仅支持单 GPU |

---

## 🔬 深入细节

### 1. 问题动机：三维优化的耦合困境

现有张量程序优化器分为两类，各有致命缺陷：

```
┌─────────────────────────────────────────────────────────────┐
│              现有优化器的分层架构（存在优化盲区）              │
│                                                             │
│  ┌──────────────────┐     ┌──────────────────┐              │
│  │  图级优化器       │     │  算子级优化器     │              │
│  │  (TASO, Mirage,   │────▶│  (TVM, Triton,   │              │
│  │   FlashTensor)    │     │   Halide)        │              │
│  │                   │     │                   │              │
│  │  • 代数等价变换   │     │  • Tiling 策略    │              │
│  │  • 算子融合决策   │     │  • 并行化映射     │              │
│  │  • 数据布局选择   │     │  • 内存层次放置   │              │
│  └──────────────────┘     └──────────────────┘              │
│           ↑                        ↑                         │
│     以完整张量为粒度          以单个算子为边界                │
│     看不到 tile 级机会        看不到跨算子机会                │
│                                                             │
│  ══════════════════════════════════════════════════          │
│  FlashAttention 的优化需要同时：                              │
│    ① 代数变换（分配律拆分 softmax 累加器）                   │
│    ② 循环融合（将 QK^T、softmax、×V 合入一个循环）           │
│    ③ 内存放置（中间结果留在 SRAM 而非写回 HBM）              │
│  → 任何单一维度的优化器都无法发现此变换！                      │
└─────────────────────────────────────────────────────────────┘
```

**Mirage** 尝试联合优化但采用穷举搜索，面对超过 11 个算子的程序就必须手动分区，丧失跨分区优化机会。**FlashTensor** 只做图级代数重写，无法触及 tile 级变换。

### 2. Trinity IR：Tile 作为一等公民

Trinity 的核心创新是设计了一套 **tile 级中间表示**，将 tile（而非完整张量）作为基本操作单元，从而在同一 IR 中统一表达三个优化维度：

```
┌──────────────────────────────────────────────────────────┐
│                    Trinity IR 语法                         │
├──────────────────────────────────────────────────────────┤
│ 张量声明:                                                 │
│   (input name shape dtype)    — 输入张量                  │
│   (output name shape dtype)   — 输出张量                  │
│   (var name shape dtype)      — 中间变量张量              │
│                                                          │
│ 索引操作 (tile 为核心):                                   │
│   (tile tensor dim offset size)  — 提取 tile 切片        │
│   (full_tile tensor dim)         — 沿某维度的完整切片     │
│   (elem loop_var)                — 循环变量的标量索引      │
│                                                          │
│ 内存操作:                                                 │
│   (load src indices)     — 从张量加载 tile               │
│   (store dst indices val) — 将 tile 写入张量             │
│                                                          │
│ 计算操作:                                                 │
│   (matmul A B)  (rsum X)  (softmax X)                    │
│   (+ A B) (* A B) (/ A B) (exp X) (log X) ...           │
│                                                          │
│ 控制流:                                                   │
│   (seq stmt1 stmt2)                  — 顺序执行           │
│   (loop start end step var body)     — 循环（tile 迭代）  │
└──────────────────────────────────────────────────────────┘
```

**关键设计决策**：
- **Tile 索引**直接编码 tiling 策略——`(tile X 0 (elem n) 128)` 表示沿维度 0 以步长 128 提取 tile
- **循环结构**直接编码并行化——最外层并行循环的边界即为 kernel 边界
- **Load/Store**直接编码内存层次——同一 kernel 内的中间结果自动放置在片上 SRAM，跨 kernel 则写回 HBM

这样，一个 Trinity IR 程序同时确定了代数结构、tiling 方案、融合策略和内存放置。

### 3. 重写规则：覆盖三个维度

Trinity 定义了两类重写规则：

**循环变换规则（6 条）**——控制内存 I/O 和计算编排：

```
规则 1: 循环融合 (Loop Fusion)
  (seq (loop s e t v body1) (loop s e t v body2))
  ⟹ (loop s e t v (seq body1 body2))
  条件: 无跨迭代依赖

规则 2: 循环裂变 (Loop Fission) — 融合的逆变换

规则 3: 循环不变量外提 (LICM)
  (loop s e t v (seq invariant_stmt body))
  ⟹ (seq invariant_stmt (loop s e t v body))
  条件: invariant_stmt 不依赖循环变量 v

规则 4: 循环插入 (Loop Insertion)
  stmt ⟹ (loop s e t v stmt)
  条件: stmt 不依赖 v（为后续融合创造机会）

规则 5: 代数因式提取 (Algebraic Factoring in Loop Body)
  (loop ... (seq (store acc (op (load acc) x))  body))
  ⟹ (seq (loop ... body) (op_outer acc))
  效果: 消除循环携带依赖，解锁融合

规则 6: 迭代空间重索引 (Iteration-space Reindexing)
  融合迭代次数相同但变量名不同的循环
```

**代数等价规则（31 条）**——来自先前工作（TASO、Mirage），包括矩阵乘法分配律、softmax 分解、转置传播等。

### 4. 等价饱和引擎：三大可扩展性技术

直接对 tile 级 IR 应用 equality saturation 会导致 e-graph 爆炸。Trinity 提出三项关键技术：

```
┌──────────────────────────────────────────────────────────┐
│            Trinity 等价饱和的三大技术                       │
│                                                          │
│  ① 表达式传播 (Expression Propagation)                    │
│     问题: load/store 切断了数据流，阻碍跨算子重写匹配      │
│     方案: 将 store 的值表达式传播到对应 load 处，          │
│           使 e-graph 能"看穿"内存操作发现代数等价          │
│     例: store(X, val) ... load(X)                        │
│         → load(X) 的 e-class 中加入 val 的符号表达式      │
│                                                          │
│  ② 序列规范化 (Sequence Canonicalization)                 │
│     问题: N 条语句的 seq 有 Catalan(N) 种结合方式，       │
│           导致 e-graph 指数膨胀                            │
│     方案: 强制右结合规范形式                               │
│       (seq (seq a b) c) ⟹ (seq a (seq b c))             │
│     效果: 将 O(4^n/n^1.5) 降为 O(n)                      │
│                                                          │
│  ③ 语义依赖检查 (Semantic Dependency Checks)              │
│     问题: 循环融合等规则需要验证无数据依赖冲突             │
│     方案: 通过 e-class analysis 维护每个节点的              │
│           读集合(read set)和写集合(write set)，            │
│           检查别名关系判断融合安全性                        │
│     实现: 增量式分析，随 e-graph 生长自动更新              │
└──────────────────────────────────────────────────────────┘
```

### 5. 两遍提取算法

传统 equality saturation 使用单遍 ILP 提取最优程序，但 Trinity 的搜索空间高达 10^21，单遍 ILP 不可行。Trinity 设计了两遍提取：

```python
# 伪代码: Trinity 两遍提取算法

def extract_optimal_program(egraph):
    # ═══ Pass 1: 提取循环结构（最小化 kernel 数量）═══
    # 目标: 确定循环嵌套和 kernel 边界
    # 策略: 贪心选择融合度最高的循环结构
    
    loop_structure = extract_loop_skeleton(
        egraph,
        objective = minimize(num_kernels),  # 减少 kernel 数 → 减少 launch 开销
        constraints = [no_cyclic_dependencies]
    )
    
    # ═══ Pass 2: 填充循环体（最小化每个计算单元的 FLOPs）═══
    # 目标: 在已确定的循环结构内选择最优计算表达式
    # 策略: 对每个 e-class 独立选择 FLOP 最少的表达式
    
    candidates = []
    for each compute_unit in loop_structure:
        best_expr = select_min_flops(
            egraph,
            compute_unit.eclass,
            context = loop_structure
        )
        candidates.append(best_expr)
    
    # 生成多个候选程序（最多 512 个），交由 profiler 选择
    return generate_candidates(loop_structure, candidates, max=512)


def generate_kernel_code(program):
    """从 Trinity IR 生成 Triton GPU 代码"""
    for each outermost_parallel_loop in program:
        # 每个最外层并行循环 → 一个 GPU kernel
        kernel = new TritonKernel()
        
        for tensor in intermediate_tensors:
            if used_within_same_kernel(tensor):
                tensor.placement = SRAM      # 片上存储
            else:
                tensor.placement = HBM       # 片外存储
        
        kernel.code = lower_to_triton_v3_4(loop_body)
        emit(kernel)
```

### 6. 案例研究：Fully Fused Attention 的自动发现

Trinity 最引人注目的成果是自动发现了 **fully fused attention**——将 QKV 投影、reshape 和完整注意力计算融合为单个 GPU kernel：

```
原始实现（4+ 个 kernel）:
═══════════════════════════
Kernel 1: Q = X @ W_Q          ← 矩阵乘法
Kernel 2: K = X @ W_K          ← 矩阵乘法  
Kernel 3: V = X @ W_V          ← 矩阵乘法
Kernel 4: reshape Q,K,V        ← 按 head 重排
Kernel 5: FlashAttention(Q,K,V) ← 注意力计算

Trinity 优化后（1 个 kernel）:
═══════════════════════════════
Kernel 1: for each head h:
            Q_h = X[tile] @ W_Q[h_slice]    ← 按 head 计算 QKV
            K_h = X[tile] @ W_K[h_slice]
            V_h = X[tile] @ W_V[h_slice]
            O_h = FlashAttn(Q_h, K_h, V_h)  ← 立即执行注意力
            
优化步骤:
  (a) 初始 IR → 多个独立循环
  (b) 循环融合 + 分配律 → 合并 logit 计算和 reduce_sum
  (c) 代数因式提取 → 消除 accm 的循环携带依赖
  (d) 循环融合 → 整个注意力合入单个 h-loop（= FlashAttention）
  (e) 循环融合 → QKV 投影 + reshape 合入同一循环
  (f) 迭代空间重索引 → (loop 0 4096 128 n) ≡ (loop 0 32 1 h)
      统一循环变量后完成最终融合
```

**关键洞察**：步骤 (e)-(f) 超越了 FlashAttention 的优化范围。传统方法先计算所有 head 的 Q/K/V 再逐 head 做注意力，而 Trinity 发现可以逐 head 流水线执行 QKV 投影 + 注意力，消除了：
1. 等待所有 head QKV 完成的同步屏障
2. 中间张量 Q/K/V 写回 HBM 的内存开销
3. 多次 kernel launch 的调度开销

### 7. 实验结果

**推理延迟对比**（H100, LLaMA3-8B 配置, 归一化到 TensorRT）：

| 模型变体 | vs TensorRT | vs TorchInductor | vs Mirage | vs FlashInfer |
|----------|-------------|-------------------|-----------|---------------|
| Vanilla  | **1.71×** | ~2.0× | **3.07×** | **1.35×** |
| Pre-Norm | **1.43×** | ~1.8× | **1.40×** | N/A (不支持) |
| QK-Norm  | **1.63×** | ~1.9× | ~1.5× | N/A |
| KeyFormer| **1.29×** | ~1.6× | ~1.3× | N/A |
| RoCo     | **1.37×** | ~1.7× | ~1.4× | N/A |
| SwiGLU   | **1.10×** | ~1.2× | ~1.1× | N/A |

**编译时间对比**（Table 2）：

| Benchmark | 搜索空间大小 | Trinity (饱和/提取/profiling) | Mirage |
|-----------|-------------|-------------------------------|--------|
| SwiGLU-FFN | 2×10^12 | 10s / 30s / 226s = **266s** | 348s (1.3×) |
| Vanilla | 2×10^17 | 7s / 54s / 142s = **203s** | 7741s (38.1×) |
| QK-Norm | 4×10^17 | 10s / 167s / 198s = **375s** | 4039s (10.7×) |
| Pre-Norm | 10^20 | 14s / 922s / 226s = **1162s** | 8678s (7.5×) |
| RoCo | 2×10^20 | 60s / 592s / 58s = **710s** | 16062s (22.6×) |
| KeyFormer | 10^21 | 49s / 1305s / 105s = **1459s** | 15963s (10.9×) |

**自动硬件适配**：Trinity 为不同 GPU（H100/A100/RTX4090/RTX5090）自动发现不同的最优 kernel，无需手动调优。例如 KeyFormer 在 5 种 GPU × 2 种模型配置下发现了 8 种不同的最优 kernel。

**关键发现**：
- FlashInfer 只支持 Vanilla transformer，无法处理 Pre-Norm/QK-Norm/KeyFormer/RoCo 等变体——凸显了手工优化无法覆盖日益多样的模型架构
- Trinity 基于 Triton 生成代码，未利用 FA3 的 warp-specialization 等硬件特性，仍然超越了 FlashInfer 的 FlashAttention3 实现
- Mirage 无法处理超过 11 个算子的未分区程序，而 Trinity 成功优化了 22 个算子的 RoCo

---

## 🧪 练习题

### Q1（理解题）
Trinity 的 tile 级 IR 如何同时编码代数等价、内存 I/O 和计算编排三个优化维度？请分别举例说明 IR 中哪些构造对应哪个维度。

<details><summary>参考答案</summary>

- **代数等价**：计算操作节点（如 `matmul`、`softmax`、`+`、`*`）的代数重写规则，例如分配律 `(matmul (+ A B) C) ⟹ (+ (matmul A C) (matmul B C))`
- **内存 I/O**：`load`/`store` 操作和 `tile` 索引编码了数据的内存访问模式；同一 kernel 内的中间张量自动放置在 SRAM，跨 kernel 则写回 HBM
- **计算编排**：`loop` 结构编码了 tiling 策略（步长=tile 大小）和并行化（最外层循环=kernel 边界）；`seq` 编码了执行顺序

三者耦合的例子：循环融合（计算编排）改变了中间张量的生命周期（内存 I/O），而代数因式提取（代数等价）消除循环携带依赖后才能进行融合（计算编排）。
</details>

### Q2（分析题）
为什么 Mirage 的穷举搜索在面对超过 11 个算子的程序时必须进行分区，而 Trinity 的 equality saturation 可以处理 22 个算子的程序？请从搜索空间表示的角度分析。

<details><summary>参考答案</summary>

Mirage 使用穷举枚举，搜索空间随算子数量指数增长（每个算子有多种等价实现 × 融合组合），11 个算子时已不可承受。分区后各分区独立优化，丢失跨分区优化机会。

Trinity 使用 e-graph 紧凑表示等价程序集合。例如 Vanilla transformer 的 2×10^17 个等价程序仅需 434 个 e-class 和 2058 个 e-node 表示——因为 e-graph 天然共享公共子表达式。加上三项可扩展性技术（表达式传播避免冗余节点、序列规范化防止结合爆炸、增量式依赖分析），Trinity 的 e-graph 增长保持可控。两遍提取算法进一步将 NP-hard 的全局提取分解为两个可处理的子问题。
</details>

### Q3（扩展题）
Trinity 当前的 fully fused attention 优化仅覆盖了 QKV 投影到注意力输出的范围。如果要将输出投影（O @ W_O）也融合进同一 kernel，会面临哪些挑战？Trinity 的框架是否有潜力解决？

<details><summary>参考答案</summary>

主要挑战：
1. **数据依赖**：输出投影 `O @ W_O` 需要所有 head 的注意力输出拼接后才能执行（跨 head 的 reduce），这与当前逐 head 流水线执行的策略冲突
2. **Tile 大小不匹配**：注意力按 head 维度 tiling（每次处理一个 head），而输出投影需要沿 hidden dimension tiling，迭代空间不同
3. **片上内存压力**：融合后需要在 SRAM 中同时保存 QKV tile、注意力中间结果和输出投影的权重 tile

Trinity 的框架有潜力解决：迭代空间重索引规则可以对齐不同的 tiling 策略；代数因式提取可能消除跨 head 依赖；但需要扩展 IR 支持更灵活的 tile 大小选择和片上内存容量约束建模。
</details>