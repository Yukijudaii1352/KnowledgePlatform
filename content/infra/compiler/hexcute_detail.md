### Hexcute: A Compiler Framework for Automating Layout Synthesis in GPU Programs

```yaml
id: hexcute
tags: [compiler, GPU, layout-synthesis, tensor-core, deep-learning]
authors: [Xiao Zhang, Yaoyao Ding, Bolin Sun, Yang Hu, Tatiana Shpeisman, Gennady Pekhimenko]
affiliations: [NVIDIA, University of Toronto, Vector Institute]
venue: CGO 2026 (IEEE/ACM International Symposium on Code Generation and Optimization)
date: 2026-01-31
doi: 10.1109/CGO68049.2026.11395194
pages: 630-643
urls:
  ieee: https://ieeexplore.ieee.org/document/11395194
  code: https://github.com/hexcute
```

#### 📝 一句话总结

Hexcute 是一个 GPU 编译器框架，通过将**张量布局合成**形式化为**约束规划问题**并使用**类型推断算法**自动求解，在保持对数据流和流水线显式控制的同时，自动化了 GPU 程序中最繁琐的布局设计过程，在 GEMM/Attention/MoE 等算子上达到与手写库（cuBLAS、FlashAttention）匹配的性能，同时大幅减少代码量。

---

#### 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | GPU 张量核心编程中，手动指定最优张量布局（tensor layout）需要大量编程工作；而高层语言（如 Triton）的编译器启发式方法在复杂算子上不可泛化 |
| **核心思路** | 将布局合成建模为约束规划问题，用类型推断驱动的深度优先搜索算法自动探索最优布局和指令选择 |
| **关键创新** | ① 基于函数组合（functional composition）的统一布局抽象 ② 将布局合成形式化为约束满足问题 ③ 类型推断驱动的自动布局求解器 ④ 显式数据流+流水线控制与自动布局合成的平衡 |
| **技术路线** | 在 Hidet 编译器上构建，继承 CuTe（CUTLASS 3.5）的布局代数，扩展为编译器自动化框架 |
| **主要结果** | GEMM/Attention 匹配 cuBLAS/FlashAttention；代码量比 CUTLASS 减少 1.27×-7.94×；混合类型 MoE 比 Triton 加速 6.46×；vLLM 端到端 DeepSeek-R1-AWQ 加速 2.60×，Mamba 模型加速 2.04× |
| **适用范围** | NVIDIA GPU（Tensor Core）上的深度学习算子编译，特别是 GEMM、Attention、MoE、Mamba 等 |

---

#### 🔬 深入细节

##### 1. 问题背景与动机

GPU 上深度学习算子的性能高度依赖于**张量布局（tensor layout）**——即数据如何在线程间并行化以及在内存层次（全局内存 → 共享内存 → 寄存器）中排列的映射函数。

现有方案的局限：

```
┌─────────────────────────────────────────────────────────────────┐
│                    GPU 编程框架光谱                               │
│                                                                 │
│  低层框架 (CUTLASS/Hidet)          高层语言 (Triton)              │
│  ┌──────────────────────┐         ┌──────────────────────┐      │
│  │ ✅ 表达力强            │         │ ✅ 编程简单            │      │
│  │ ✅ 显式控制布局/数据流  │         │ ❌ 启发式不可泛化      │      │
│  │ ❌ 手动指定布局繁琐    │         │ ❌ 复杂算子性能差      │      │
│  │ ❌ 代码量大            │         │ ❌ 隐式布局不可控      │      │
│  └──────────────────────┘         └──────────────────────┘      │
│                                                                 │
│                    ↓ Hexcute 的定位 ↓                            │
│            ┌──────────────────────────────┐                     │
│            │ ✅ 自动化布局合成              │                     │
│            │ ✅ 显式数据流 + 流水线控制     │                     │
│            │ ✅ 代码量少 + 性能匹配手写库   │                     │
│            └──────────────────────────────┘                     │
└─────────────────────────────────────────────────────────────────┘
```

##### 2. 布局代数（Layout Algebra）

Hexcute 继承并扩展了 CuTe（CUTLASS 3.5）的布局抽象。核心概念是 **TensorLayout**，由 `(shape, stride)` 对定义：

```
TensorLayout = (Shape, Stride)

示例: 一个 4×8 的行主序布局
  shape  = (4, 8)
  stride = (8, 1)
  
映射函数: index(i, j) = i × 8 + j × 1
```

布局通过**函数组合（functional composition）**构建复杂映射：

```
组合布局 (ComposedLayout):
  L_composed = L_outer ∘ L_inner
  
  其中:
  - L_inner: 逻辑坐标 → 中间坐标
  - L_outer: 中间坐标 → 物理地址
  
布局类型层次:
  LayoutBase
  ├── TensorLayout(shape, stride)     # 基础仿射布局
  ├── ComposedLayout(outer, inner)    # 函数组合
  ├── SwizzleLayout(base, swizzle)    # 异或交织 (bank conflict 消除)
  ├── ConcatLayout                    # 拼接
  ├── PermuteLayout                   # 置换
  └── ReshapeLayout                   # 重塑
```

**Swizzle** 是一种关键的布局变换，通过对地址进行位级异或操作来消除共享内存的 bank conflict：

```
Swizzle(B, M, S):
  addr' = addr XOR ((addr >> B) & M) << S
  
  B: 基础位偏移
  M: 掩码
  S: 移位量
```

##### 3. 布局合成算法（Layout Synthesis）

Hexcute 的核心创新是将布局合成形式化为**约束规划问题**：

```
输入:
  - 计算图 (dataflow graph)
  - 硬件约束 (GPU 架构参数)
  - 用户指定的数据流和流水线策略

约束:
  C1: 内存对齐约束 (向量化加载/存储)
  C2: Tensor Core 指令布局约束 (MMA 操作数布局)
  C3: 共享内存 bank conflict 约束 (Swizzle)
  C4: 寄存器分配约束
  C5: 布局兼容性约束 (相邻操作间布局一致)

目标:
  找到满足所有约束的布局赋值 {L_i} 使得性能最优
```

求解算法采用**类型推断驱动的深度优先搜索**：

```python
# 伪代码: Hexcute 布局合成算法
def layout_synthesis(program_graph, hw_constraints):
    """
    类型推断驱动的布局合成
    
    将每个张量的布局视为"类型"，
    通过类型推断规则传播约束，
    用深度优先搜索探索可行解空间
    """
    # Step 1: 初始化 — 从已知布局开始
    # (如 Tensor Core MMA 指令的固定操作数布局)
    known_layouts = extract_fixed_layouts(program_graph)
    
    # Step 2: 类型推断 — 前向/后向传播布局约束
    for node in topological_order(program_graph):
        if node.layout is UNKNOWN:
            # 根据输入/输出的已知布局推断
            node.layout = infer_layout(
                node.op_type,
                node.inputs,
                hw_constraints
            )
    
    # Step 3: 约束求解 — 深度优先搜索
    def dfs_solve(unresolved_nodes):
        if not unresolved_nodes:
            return current_assignment  # 所有布局已确定
        
        node = select_next(unresolved_nodes)  # 选择下一个节点
        
        for candidate_layout in enumerate_candidates(node):
            if satisfies_constraints(candidate_layout, node):
                assign(node, candidate_layout)
                propagate_constraints(node)  # 传播到邻居
                
                result = dfs_solve(remaining(unresolved_nodes))
                if result is not None:
                    return result
                    
                backtrack(node)  # 回溯
        
        return None  # 无解
    
    # Step 4: 指令选择 — 根据布局选择最优指令
    select_instructions(program_graph)
    
    return program_graph
```

##### 4. 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                     Hexcute 编译流程                         │
│                                                             │
│  用户程序 (Python DSL)                                       │
│  ┌───────────────────────────────────────────┐              │
│  │ • 显式指定: 数据流 (dataflow)              │              │
│  │ • 显式指定: 流水线策略 (pipelining)         │              │
│  │ • 自动化:   布局 (layout) ← Hexcute 合成   │              │
│  └─────────────────┬─────────────────────────┘              │
│                    ↓                                        │
│  ┌─────────────────────────────────────────┐                │
│  │         布局合成引擎 (Layout Synthesizer) │                │
│  │  ┌──────────┐  ┌──────────┐  ┌────────┐ │                │
│  │  │约束提取   │→│类型推断   │→│DFS求解  │ │                │
│  │  │Constraint │  │Type      │  │Search  │ │                │
│  │  │Extraction │  │Inference │  │        │ │                │
│  │  └──────────┘  └──────────┘  └────────┘ │                │
│  └─────────────────┬───────────────────────┘                │
│                    ↓                                        │
│  ┌─────────────────────────────────────────┐                │
│  │         指令选择 + 代码生成               │                │
│  │  • MMA 指令映射                          │                │
│  │  • 内存操作 (LDG/STS/LDS) 生成           │                │
│  │  • Swizzle 模式选择                      │                │
│  │  • 寄存器分配                            │                │
│  └─────────────────┬───────────────────────┘                │
│                    ↓                                        │
│           CUDA PTX / SASS 代码                              │
└─────────────────────────────────────────────────────────────┘
```

##### 5. 关键设计决策

**为什么自动化布局而非数据流/流水线？**

GPU 程序的三大关键维度：
- **数据流（Dataflow）**：决定计算顺序和数据复用模式（如 GEMM 的分块策略）
- **流水线（Pipelining）**：决定计算与内存访问的重叠方式（如双缓冲、多级流水线）
- **布局（Layout）**：决定数据在内存层次中的排列方式

Hexcute 的关键洞察：
1. **数据流和流水线**对算法语义有直接影响，不同选择对应不同的算法变体，适合由程序员显式控制
2. **布局**更像是"实现细节"，给定数据流和流水线后，最优布局可以通过约束求解自动确定
3. 这种分离使得程序员只需关注高层算法设计，而将底层硬件适配交给编译器

**布局约束的来源：**

| 约束来源 | 约束类型 | 示例 |
|---------|---------|------|
| Tensor Core MMA | 操作数布局固定 | HMMA.16816 要求特定的线程-数据映射 |
| 全局内存加载 | 对齐 + 合并访问 | 128-bit 向量化加载需要地址对齐 |
| 共享内存 | Bank conflict 消除 | 需要 Swizzle 模式 |
| 寄存器文件 | 容量限制 | 每线程最大寄存器数 |
| 操作间传递 | 布局兼容性 | 生产者输出布局 = 消费者输入布局 |

##### 6. 实验评估

**基准测试平台：** NVIDIA GPU（推测为 H100/A100）

**GEMM 性能：**
- 与 cuBLAS 匹配（FP16、FP8 精度）
- 代码量比 CUTLASS 减少 1.27×-7.94×

**Attention 性能：**
- 与 FlashAttention 匹配
- 支持多种 Attention 变体

**混合类型 MoE（Mixture-of-Experts）：**
- 比 Triton 平均加速 6.46×
- 这是 Hexcute 优势最明显的场景，因为 MoE 的不规则数据流使 Triton 的启发式方法失效

**端到端 vLLM 推理：**

| 模型 | 加速比 |
|------|--------|
| DeepSeek-R1-AWQ | 2.60× |
| Mamba-based model | 2.04× |

**代码量对比（vs CUTLASS）：**

| 算子 | 代码减少倍数 |
|------|-------------|
| 最小 | 1.27× |
| 最大 | 7.94× |

##### 7. 与相关工作的对比

```
                    编程负担
                    高 ↑
                      │  CUTLASS/CuTe
                      │  (手动布局+数据流+流水线)
                      │
                      │      Hexcute ★
                      │      (手动数据流+流水线, 自动布局)
                      │
                      │          Triton
                      │          (全自动, 但复杂算子性能差)
                    低 ↓
                      ←─────────────────────→
                     低     性能/灵活性      高
```

| 框架 | 布局 | 数据流 | 流水线 | 复杂算子支持 |
|------|------|--------|--------|-------------|
| CUTLASS/CuTe | 手动 | 手动 | 手动 | ✅ 优秀 |
| Triton | 自动(启发式) | 自动(启发式) | 自动(启发式) | ❌ 受限 |
| **Hexcute** | **自动(约束求解)** | 手动 | 手动 | **✅ 优秀** |

---

#### 🧪 练习题

**Q1（理解题）：** Hexcute 为什么选择自动化布局合成而非数据流或流水线？请从"约束可形式化程度"和"对算法语义的影响"两个角度分析。

<details>
<summary>参考答案</summary>

布局的约束主要来自硬件（Tensor Core 指令格式、内存对齐、bank conflict），这些约束是**确定性的、可形式化的**，适合用约束规划求解。而数据流和流水线的选择直接影响算法的**计算顺序和数据复用模式**（如 FlashAttention 的在线 softmax 需要特定的分块数据流），不同选择对应不同的算法变体，难以用统一的自动化方法覆盖所有场景。因此，Hexcute 选择了一个务实的折中：将可形式化的布局交给编译器，将需要算法洞察的数据流和流水线留给程序员。
</details>

**Q2（分析题）：** 为什么 Hexcute 在混合类型 MoE 算子上相比 Triton 有 6.46× 的巨大加速优势？

<details>
<summary>参考答案</summary>

MoE 算子的特殊性在于：(1) 不同专家可能使用不同的数据类型（混合精度），导致布局需求异构；(2) 动态路由使得数据流不规则，不同 token 被分配到不同专家；(3) 需要高效的 gather/scatter 操作。Triton 的编译器启发式方法假设规则的数据流模式，在面对 MoE 的不规则性时生成次优代码。而 Hexcute 允许程序员显式指定 MoE 的不规则数据流和流水线策略，同时自动合成适配混合类型的最优布局，充分发挥了"显式控制+自动布局"的优势。
</details>

**Q3（设计题）：** 如果要将 Hexcute 的布局合成方法扩展到支持 AMD GPU（CDNA 架构），需要修改哪些约束？请列举至少 3 个需要适配的硬件差异。

<details>
<summary>参考答案</summary>

需要适配的硬件差异包括：
1. **矩阵核心指令布局**：AMD 的 MFMA（Matrix Fused Multiply-Add）指令与 NVIDIA 的 HMMA 有不同的操作数布局要求（线程-数据映射不同）
2. **共享内存（LDS）bank 结构**：AMD GPU 的 LDS 有 32 个 bank，每个 bank 4 字节宽，与 NVIDIA 的共享内存 bank 结构不同，Swizzle 模式需要重新设计
3. **向量寄存器文件**：AMD 使用 VGPR（Vector General Purpose Register）和 SGPR（Scalar GPR）的分离架构，寄存器布局约束不同
4. **内存合并访问规则**：AMD 的全局内存访问合并规则与 NVIDIA 不同，影响全局内存加载的布局约束
5. **Wave 大小**：AMD 使用 wavefront（64 线程）而非 warp（32 线程），线程级布局映射需要调整
</details>