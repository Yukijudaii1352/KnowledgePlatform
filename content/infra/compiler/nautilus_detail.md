### Nautilus

```yaml
id: nautilus
name: Nautilus
full_name: "Nautilus: 数学到内核的全自动张量编译器 (A Math-to-Kernel Tensor Compiler)"
year: "2025"
org: "UIUC (University of Illinois Urbana-Champaign)"
paper_url: "https://arxiv.org/abs/2604.14825"
category: "compiler"
parent: "—"
motivation: "从代数规范自动生成FlashAttention级别的高性能GPU内核，消除手工编写注意力内核的需求"
```

#### 📝 一句话总结

Nautilus 提出了一种三层 IR 逐级降低的全自动张量编译器架构，通过自动调度器（支持高级算子融合与滚动更新优化）和代数表达式重写，从数学规范自动生成匹敌甚至超越 FlashAttention-3 的高性能 GPU 注意力内核，在 NVIDIA GH200 上实现 1.22× 加速（对比 FlashAttn-2），在 RTX 5090 上实现 1.42× 加速（对比 PyTorch SDPA）。

#### 🎯 核心要点

- **三层 IR 逐级降低架构**：Scalar IR → VR-tile IR（新提出）→ MA-tile IR，实现从标量数学表达到 SIMD 瓦片代码的渐进式编译
- **Block Graph 表示**：融合数据依赖图与 AST 的混合图结构，精确追踪计算语句间的依赖关系，支撑调度决策
- **自动调度器（Auto-Scheduler）**：支持双层分块（bi-level tiling）、经典融合与滚动更新融合（rolling update，源自 Neptune）、数据局部化（共享内存/寄存器 + 重物化）、正则化等优化
- **VR-tile IR 上的代数表达式重写**：支持循环不变量外提（constant hoisting）、`exp → exp2` 转换、跨迭代除法-乘法消除等代数优化
- **多后端自适应**：同时支持 Triton、Tawa、TileLang 三种瓦片编译后端，自动选择最优后端
- **自动调优器（Auto-Tuner）**：基于 TVM MetaSchedule 的进化搜索 + 学习代价模型，每个配置仅需 256 次测量
- **覆盖 5 个主流模型**：ViT 1.2B、Llama2 7B、Qwen2 7B、Qwen3 8B、GLM-4 9B，支持 FP16/FP8 精度
- **数值稳定性**：与 FlashAttention（Tri-Dao）和 FlexAttention 数值误差相当（RMS 绝对误差 ~4.96×10⁻⁵）

#### 🔬 深入细节

##### 系统架构总览

![Nautilus 系统架构图](https://arxiv.org/html/2604.14825v1/x1.png)
*图：Nautilus 编译流程——从 TVM TE 数学规范出发，经过 Block Graph 构建、自动调度、三层 IR 逐级降低，最终生成多后端 GPU 内核*

Nautilus 的输入是 TVM Tensor Expression (TE) 格式的数学规范，描述注意力算子的纯代数语义（如 softmax、矩阵乘法的组合）。编译器首先构建 **Block Graph**，然后由 **自动调度器** 在 Block Graph 上搜索最优调度策略，接着通过 **三层 IR 逐级降低** 生成最终的 GPU 内核代码。

##### Block Graph：混合依赖-AST 图

Block Graph 是 Nautilus 的核心中间表示之一，它将传统的数据依赖图与抽象语法树（AST）结合为统一结构：

- **节点**：每个节点代表一个计算语句（compute statement），对应一个张量的定义
- **边**：既表示数据依赖关系（哪个张量被哪个计算消费），也保留 AST 的层次结构信息
- **作用**：为自动调度器提供精确的依赖分析基础，支持融合决策和分块策略

##### 自动调度器（Auto-Scheduler）

自动调度器是 Nautilus 的核心创新之一，包含四个关键调度原语：

**1. 双层分块（Bi-level Tiling）**

将计算空间划分为两级瓦片：外层瓦片映射到 GPU 的线程块（thread block），内层瓦片映射到 warp 级别。分块大小是可调参数，由自动调优器搜索。

```python
# 双层分块伪代码
for block_tile in outer_tiles:        # 映射到 GPU thread blocks
    for warp_tile in inner_tiles:      # 映射到 warps
        compute(block_tile, warp_tile)
```

**2. 算子融合（Operator Fusion）**

支持两种融合策略：
- **经典融合**：将多个算子合并到同一个内核中执行，减少全局内存读写
- **滚动更新融合（Rolling Update）**：源自 Neptune 的高级融合策略，允许在线（online）计算模式——在注意力计算中，softmax 的归一化因子随着 KV 序列的迭代逐步更新，而非等待所有数据就绪后一次性计算

> 💡 关键：滚动更新融合是 Nautilus 能自动发现 FlashAttention 风格内核的核心机制。FlashAttention 的核心思想正是通过在线 softmax 避免将完整的注意力矩阵写入全局内存。

**3. 数据局部化（Data Localization）**

将频繁访问的数据从全局内存提升到更快的存储层次：
- **共享内存（Shared Memory）**：线程块内共享的片上缓存
- **寄存器（Registers）**：每个线程私有的最快存储
- **重物化（Rematerialization）**：当寄存器/共享内存不足时，选择重新计算而非缓存某些中间结果

**4. 正则化（Regularization）**

确保生成的调度方案符合下游瓦片后端（Triton/Tawa/TileLang）的约束条件，例如瓦片大小必须是 2 的幂、warp 数量限制等。

##### 三层 IR 逐级降低

Nautilus 的编译管线通过三层 IR 实现从高层数学语义到底层 GPU 代码的渐进式转换：

**Scalar IR（标量 IR）**

最高层表示，直接对应数学公式。每个元素独立计算，没有瓦片或并行化的概念：

```python
# Scalar IR 示例：注意力计算
for i in range(N):
    for j in range(N):
        S[i][j] = sum(Q[i][k] * K[j][k] for k in range(d))
    m[i] = max(S[i][j] for j in range(N))
    for j in range(N):
        P[i][j] = exp(S[i][j] - m[i])
    l[i] = sum(P[i][j] for j in range(N))
    for j in range(d):
        O[i][j] = sum(P[i][k] * V[k][j] for k in range(N)) / l[i]
```

**VR-tile IR（虚拟寄存器瓦片 IR）——核心创新**

Nautilus 新提出的中间表示，类似于编译器中的 `mem2reg` 变换。关键特性：
- 引入 **for-loop 表达式**：将循环体内的计算表示为带有归约语义的表达式
- 支持 **代数表达式重写**：在瓦片级别应用代数优化规则
- 作为 Scalar IR 和 MA-tile IR 之间的桥梁

VR-tile IR 上的表达式重写规则包括：

$$\text{exp}(x) \rightarrow \text{exp2}(x \cdot \log_2 e)$$

$$\frac{a}{b} \cdot b \rightarrow a \quad \text{（跨迭代除法-乘法消除）}$$

$$\text{loop-invariant hoisting: } \forall i.\, f(c) \rightarrow c' = f(c);\, \forall i.\, c'$$

> 💡 关键：VR-tile IR 的设计使得 Nautilus 能在瓦片级别执行传统编译器在标量级别才能做的代数优化，这是其超越手写内核的关键能力之一。

**MA-tile IR（内存感知瓦片 IR）**

最低层表示，直接对应 SIMD 瓦片操作。MA-tile IR 是 Triton、Tawa、TileLang 等瓦片语言的超集：
- 显式表示共享内存和寄存器的数据放置
- 包含流水线（pipelining）和异步拷贝等硬件特性
- 可直接翻译为任一后端的代码

##### 多后端代码生成

Nautilus 支持三种瓦片编译后端，并自动选择性能最优的：

| 后端 | 特点 | 适用场景 |
|------|------|----------|
| **Triton** | OpenAI 开发，生态成熟 | 通用场景 |
| **Tawa** | 支持 Hopper/Blackwell TMA 指令 | 长序列、新硬件 |
| **TileLang** | 基于 TVM，灵活性高 | 短序列、小 batch |

自动调优器会为每种后端分别搜索最优参数，最终选择延迟最低的方案。

##### 自动调优器（Auto-Tuner）

基于 TVM MetaSchedule 框架的进化搜索策略：
- **搜索空间**：瓦片大小、warp 数量、流水线级数、后端选择等
- **代价模型**：学习型代价模型预筛选候选方案
- **测量**：每个配置编译并实际运行 256 次取中位数
- **时间开销**：自动调度搜索通常 < 1 分钟（得益于激进剪枝），自动调优 < 10 分钟

##### 实验评估

**硬件平台**：NVIDIA GH200（Hopper 架构）和 NVIDIA RTX 5090（Blackwell 架构）

**端到端模型性能（FP16 注意力层延迟）**：

| 平台 | 对比 FlashAttn-2 | 对比 PyTorch SDPA | 对比 FlexAttn | 对比 Tawa |
|------|-----------------|-------------------|---------------|-----------|
| GH200 FP16 | **1.22×** | **1.23×** | **1.13×** | **1.05×** |
| GH200 FP8 | — | — | **1.16×** | **1.20×** |
| RTX 5090 FP16 | **1.26×** | **1.42×** | **1.16×** | **1.01×** |

**关键发现**：
- ViT 模型获益最大（GH200 上对 SDPA 加速达 1.54×），因为 ViT 的注意力配置（少层、少头、小隐藏维度）不被基线系统充分优化
- FP8 精度下优势更大，因为 Nautilus 能自动调整流水线级数（1-4 级）适配不同序列长度
- 在 RTX 5090 长序列场景下，滚动更新优化提供了显著加速

**消融实验**（Global Attention, seq_len=256, GH200）：

| 配置 | 延迟 (μs) | 相对完整系统 |
|------|-----------|-------------|
| Nautilus 完整系统 | **7.43** | 1.00× |
| 去除自动调优 | 9.09 | 0.82× |
| 去除自动调优 + 表达式重写 | 9.45 | 0.79× |
| 去除自动调度 | 10.93 | 0.68× |

> ⚠️ 注意：自动调度器贡献了最大的性能提升（去除后延迟增加 47%），表明高层调度决策比底层参数调优更为关键。

**数值稳定性**（使用 Qwen2.5 真实输入，FP64 参考实现）：

| 方法 | 平均 RMS 绝对误差 |
|------|-------------------|
| Nautilus | 4.96×10⁻⁵ |
| Tri-Dao Attention | 4.90×10⁻⁵ |
| FlexAttention | 5.02×10⁻⁵ |

Nautilus 的数值误差与手写库相当，验证了其代数重写的正确性。

##### 与相关工作的对比

- **vs. Neptune**：Neptune 受限于 Triton 后端的代码生成质量（在 Hopper/Blackwell 上仅达 Tawa/TileLang 的 0.5-0.8×），Nautilus 通过多后端支持克服了这一瓶颈
- **vs. Mirage**：Mirage 是超优化器，搜索可能产生语义不等价的变换（需概率正确性检验），Nautilus 保证变换的正确性
- **vs. Flashlight**：Flashlight 绑定 PyTorch TorchInductor + Triton，优化有限；Nautilus 提供完整的三层优化管线
- **vs. 手写库（cuDNN, FlashInfer）**：Nautilus 在大多数配置下匹配或超越手写库性能

#### 🧪 练习题

```yaml
question: "Nautilus 的 VR-tile IR 在编译管线中的核心作用是什么？"
options:
  - "直接生成 GPU PTX 汇编代码"
  - "作为标量 IR 和瓦片 IR 之间的桥梁，支持瓦片级别的代数表达式重写"
  - "管理 GPU 共享内存的分配和释放"
  - "实现多 GPU 之间的通信调度"
answer: 1
explain: "VR-tile IR 是 Nautilus 新提出的中间表示，位于 Scalar IR 和 MA-tile IR 之间，其核心创新在于引入 for-loop 表达式，使得代数优化规则（如常量外提、exp→exp2 转换、跨迭代除法消除）能在瓦片级别执行。"
```