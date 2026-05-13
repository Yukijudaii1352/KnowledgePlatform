### MoEBlaze

```yaml
id: moeblaze
name: MoEBlaze
full_name: "MoEBlaze: Efficient MoE Training on GPU through Kernel Co-Design"
year: "2025"
org: Meta
paper_url: "https://arxiv.org/abs/2601.05296"
category: system_optimization
parent: MegaBlocks
motivation: "通过index-based token dispatch和kernel融合设计，消除MoE训练中的routing buffer和中间activation内存开销，实现高达6.2×加速和4×内存节省"
```

#### 📝 一句话总结

MoEBlaze 提出了一种无需物化routing buffer的index-based token dispatch机制，并联合设计了SwiGLU fused kernel与activation checkpoint策略，彻底消除了MoE训练中token分发和FFN计算的内存瓶颈，在单H100 GPU上相比MegaBlocks实现最高6.2×训练加速和4×峰值activation内存缩减。

#### 🎯 核心要点

- **Index-based Token Dispatch**：用紧凑索引数据结构（expert_token_indices + expert_offsets + token_index_map）替代传统的全量routing buffer，避免物化 \(O(L \times E \times d)\) 的token副本
- **3步Atomic-free并行数据结构构建**：(1) 构建dense_token_map位图 → (2) 列方向warp归约计算expert_lengths → (3) tile-level scan生成location map，全程无原子操作、无全局排序
- **Fused SwiGLU Kernel**：将双GEMM（W₁, W₂投影）与SwiGLU epilogue融合为单kernel，输入X只加载一次，中间结果SiLU(a)在寄存器/shared memory中计算，仅写最终输出到global memory
- **Activation Checkpoint Co-design**：前向不保存SiLU中间结果，反向时廉价重计算（element-wise操作，memory-bound），节省大量activation存储
- **反向梯度融合**：backward中两分支梯度（∇W₁, ∇W₂）通过tiled reduction原地聚合，消除临时全局缓冲区
- **实验结果**：SiLU配置下1.4×–3.7×加速、最高3.6×内存减少；SwiGLU配置下2×–6.2×加速、最高4×内存减少

#### 🔬 深入细节

![MoEBlaze系统架构图](https://arxiv.org/html/2601.05296v1/x1.png)
*图：MoEBlaze整体架构——左侧为传统MoE需要物化routing buffer的流程，右侧为MoEBlaze通过index-based dispatch直接在fused kernel中按需gather token的设计*

##### 算法伪代码

```python
# MoEBlaze Fused SwiGLU MoE Forward
def fused_forward(X, W1, W2, W3, expert_token_indices, expert_offsets):
    # X: [L, d] 原始token（不物化routing buffer）
    # Step 1: Fused双GEMM + SwiGLU epilogue（单kernel）
    for expert_e in parallel:
        # 通过index直接gather该expert的token
        token_ids = expert_token_indices[expert_offsets[e]:expert_offsets[e+1]]
        x_e = X[token_ids]  # 按需加载，无需预分配buffer
        a = x_e @ W1[e]     # 第一投影
        b = x_e @ W2[e]     # 第二投影（与a共享X的一次加载）
        y_swi = SiLU(a) * b # SiLU在寄存器中计算，不写回global memory
    # Step 2: 第二层投影
    Y_out = y_swi @ W3[e]
    # 保存 A, B 用于backward（不保存SiLU(A)）
    save_for_backward(A, B, Y_swi)
    return Y_out

# Backward: 重计算SiLU + 融合梯度聚合
def fused_backward(grad_Y, W1, W2, W3, A, B):
    grad_swi = grad_Y @ W3.T
    S_recomp = SiLU(A)           # 重计算，避免存储
    grad_A = grad_swi * B * SiLU_grad(A)
    grad_B = grad_swi * S_recomp
    # 融合计算 ∇W1, ∇W2（tiled reduction，无临时buffer）
    grad_W1, grad_W2 = fused_bwd_w(X, grad_A, grad_B)
    grad_X = fused_bwd_x(grad_A @ W1.T, grad_B @ W2.T)  # 原地聚合
    return grad_W1, grad_W2, grad_X
```

##### 动机与背景

传统MoE训练系统（如MegaBlocks）在token routing阶段需要将每个token复制到其被分配的expert对应的buffer中，形成一个形状为 \([L \times k, d]\) 的routing buffer。对于典型的大规模训练配置（L=65536 tokens, E=64 experts, k=4, d=7168），这个buffer的内存开销高达 **~94 GB**，几乎等于FFN本身的activation存储（~98 GB）。这种"先复制再计算"的范式导致：

1. **内存墙**：routing buffer + FFN activation的双重开销使得GPU显存成为训练规模的硬约束
2. **带宽浪费**：token数据被多次读写global memory（scatter到buffer → 读取计算 → gather回原位置）
3. **kernel启动开销**：排序-based的dispatch需要多次kernel launch（radix sort多pass + segmented scan + index recovery）

> 💡 关键洞察：token的物理数据无需移动——只要kernel知道"哪些token属于哪个expert"（通过索引），就可以在计算时按需gather，完全消除routing buffer。

##### 核心机制：Index-based Token Dispatch

MoEBlaze的核心数据结构包含三个紧凑数组：

1. **expert_token_indices** \(\in \mathbb{Z}^{L \times k}\)：按expert连续排列的token ID序列
2. **expert_offsets** \(\in \mathbb{Z}^{E+1}\)：每个expert在上述数组中的起始偏移（前缀和）
3. **token_index_map** \(\in \mathbb{Z}^{L \times k}\)：每个token在expert_token_indices中的位置，用于backward时的scatter

这三个数组的总内存仅为 \(O(L \times k + E)\) 个整数（几十MB级别），相比routing buffer的 \(O(L \times k \times d)\) 浮点数（几十GB级别）减少了约 \(d/4 \approx 1800\) 倍。

##### 3步Atomic-free数据结构构建

传统方法使用全局排序（radix sort）来构建token-to-expert映射，需要多次global memory pass，复杂度高。MoEBlaze提出的3步方法完全避免原子操作和全局排序：

**Step 1 - Build Dense Token-Expert Map**：分配 \(L \times E\) 的dense bitmap，每个warp处理一组token行，将 `dense_token_map[i, e_{i,k}] = i` 写入。由于每个token的expert ID唯一，保证无intra-warp冲突。

**Step 2 - Compute Expert Lengths**：每个CTA负责一个expert（一列），通过warp-level reduction统计非零entry数量，得到 `expert_lengths`，再做prefix sum得到 `expert_offsets`。

**Step 3 - Route Indices to Gates**：每个CTA处理一个expert列，先做tile-level exclusive scan得到CTA-local位置，再加上全局 `expert_offsets` 得到最终写入位置。最后一个简单parallel kernel将token ID写入 `expert_token_indices` 的对应位置——完全无冲突。

> ⚠️ 注意：虽然Step 1分配了 \(L \times E\) 的dense map（看似很大），但这是临时的整数数组，且在构建完成后即可释放，远小于传统routing buffer的浮点tensor。

##### Fused Kernel与Activation Checkpoint协同设计

对于SwiGLU激活函数 \(\text{SwiGLU}(x; W_1, W_2) = \text{SiLU}(xW_1) \cdot (xW_2)\)，传统实现需要物化5个中间tensor：\(a, b, \sigma(a), \text{SiLU}(a), \text{SiLU}(a) \odot b\)。

MoEBlaze的融合策略：

$$\text{Forward: } X \xrightarrow{\text{load once}} \begin{cases} a = XW_1 \\ b = XW_2 \end{cases} \xrightarrow{\text{in-register}} \text{SiLU}(a) \odot b \xrightarrow{\text{write}} Y_{\text{swi}}$$

- **前向**：X只从global memory加载一次，双GEMM同时流水计算，SiLU在寄存器/shared memory中完成，仅最终结果写回
- **保存**：只保存 \(A, B\)（两个GEMM输出），**不保存** \(\text{SiLU}(A)\)
- **反向**：重计算 \(\text{SiLU}(A)\)（element-wise操作，计算代价极低，且是memory-bound操作，重计算几乎免费）

这种设计将activation存储从5个tensor减少到2个，同时消除了多次global memory读写。

##### 与传统方法的区别

| 特性 | MegaBlocks | MoEBlaze |
|------|-----------|----------|
| Token Dispatch | 物化routing buffer \(O(Lkd)\) | Index-only \(O(Lk)\) 整数 |
| 数据结构构建 | 全局radix sort（多pass） | 3步atomic-free并行构建 |
| GEMM执行 | 分离kernel，多次读写X | Fused kernel，X加载一次 |
| Activation存储 | 保存所有中间结果 | 仅保存A,B，重计算SiLU |
| 内存开销 | routing buffer + 5个activation | 索引 + 2个activation |

#### 🧪 练习题

```yaml
question: "MoEBlaze相比传统MoE训练系统，最核心的内存节省来源是什么？"
options:
  - "使用更小的expert FFN隐藏维度"
  - "消除routing buffer，用紧凑索引替代token物化复制"
  - "减少expert数量以降低参数量"
  - "使用混合精度训练减少每个参数的存储"
answer: 1
explain: "MoEBlaze的核心创新是用O(Lk)的整数索引替代O(Lkd)的浮点routing buffer，避免了token的物理复制，配合fused kernel在计算时按需gather token数据。"
```