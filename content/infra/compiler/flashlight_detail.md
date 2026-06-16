### PyTorch编译器注意力扩展 (Flashlight)

```yaml
id: flashlight
name: Flashlight
full_name: PyTorch编译器注意力扩展 (Flashlight)
year: '2026'
org: Meta
paper_url: https://arxiv.org/abs/2511.03230
category: hardware_specific
parent: flash_attention
motivation: PyTorch编译器扩展支持多样注意力变体高效编译
```

#### 📝 一句话总结

Flashlight 把 FlashAttention 风格的分块、融合和在线 softmax 优化下沉到 PyTorch `torch.compile`/TorchInductor 编译器中，让用户用普通 PyTorch 写多样注意力变体，也能自动生成融合的高性能 Triton kernel。

#### 🎯 核心要点

- **编译器原生注意力优化**：不要求用户改写到固定 attention template，而是直接分析普通 PyTorch attention 程序
- **统一 Reduction IR**：把 GEMM、softmax reduction、矩阵乘链都放进统一的 p-dimension/r-dimension 抽象中，打破 GEMM 的 fusion boundary
- **结构融合与维度降级**：允许把 producer 的并行维度降级为 fused kernel 的 reduction 维度，用少量并行度换掉中间张量物化
- **代数化 reduction 变换**：识别 softmax 中 max 与 sum-exp 的代数关系，把两遍稳定 softmax 改写为一遍在线 softmax
- **面向 tile 的维度消除**：在 tile 级 loop bound 为 1 时消除小维度，继续融合 `softmax(QK^T)V` 这类跨 tile 计算
- **逻辑 grid 维度**：扩展 TorchInductor 的调度表达能力，使 tiled reduction 和后续 matmul 可以在同一 Triton kernel 中组织
- **支持超出 FlexAttention 模板的变体**：覆盖 differential attention、Evoformer row/column gated self-attention、IPA、RSA 等更复杂数据依赖模式

#### 🔬 深入细节

> ⚠️ 资料说明：输入 YAML 中的 `https://arxiv.org/abs/2511.03230` 当前指向一篇物理论文；Flashlight 的实际论文页面是 `https://arxiv.org/abs/2511.02043`，下面基于该论文与其 arXiv HTML 精读完成。

![Flashlight 编译器扩展示意](https://arxiv.org/html/2511.02043v4/content/figure/flashlight_overview.png)
*图：Flashlight 在 `torch.compile`/TorchInductor 中加入结构融合、语义融合、维度降级、代数变换和 tile-aware 维度消除，最终生成融合 Triton kernel。来源：论文 Figure 1。*

```python
# Flashlight 编译与融合流程伪代码
def compile_with_flashlight(py_attention_fn, example_inputs):
    # 1. PyTorch 程序捕获
    fx_graph = torchdynamo_trace(py_attention_fn, example_inputs)
    ir = torchinductor_lower_to_loop_ir(fx_graph)

    # 2. 统一 reduction IR：GEMM 也表示为 reduction
    for node in ir.nodes:
        node.sketch = classify_dims(node)  # [(P0, P1, ...), (R0, R1, ...)]
        if is_matmul(node):
            # C[m,n] = sum_k A[m,k] * B[k,n]
            node.parallel_dims = [m, n]
            node.reduction_dims = [k]

    # 3. 全局图重写，顺序可组合
    changed = True
    while changed:
        changed = False
        changed |= structural_fusion_with_dimension_demotion(ir)
        changed |= semantic_fusion_with_algebraic_rewrite(ir)
        changed |= tiling_aware_dimension_elimination(ir)
        changed |= introduce_logical_grid_dims(ir)

    # 4. 后端调度与代码生成
    schedule = tile_and_schedule(ir)
    triton_kernel = emit_triton(schedule)
    return triton_kernel

def online_softmax_update(m, s, x):
    # 一遍 reduction 中同时维护 running max 与 running sum
    m_new = max(m, x)
    s_new = s * exp(m - m_new) + exp(x - m_new)
    return m_new, s_new
```

**动机与背景：FlexAttention 解决了模板内的注意力变体，但没有解决“任意 PyTorch 代码自动变快”的问题。** FlashAttention 证明了手写 fused kernel 可以把 attention 的中间矩阵留在片上内存，但它主要面向标准 attention。FlexAttention 进一步提供 `score_mod`/`mask_mod` 风格的模板，让 causal、sliding window、ALiBi、softcap 等模式更容易生成高性能 kernel；问题是用户必须把算法表达成模板接受的形式。Flashlight 的目标更激进：研究者继续写普通 PyTorch，例如先构造 mask、再调用 attention，或者组合两个 attention head 做 differential attention，编译器自动发现可融合子图并生成 FlashAttention 式 kernel。

**统一 Reduction IR 是第一步：把 GEMM 从“特殊库调用”拉回可融合图。** TorchInductor 原本会把矩阵乘交给高性能 Triton template、ATen 或 cuBLAS，这保证了单个 GEMM 很快，却也形成了优化边界：`QK^T` 的输出必须先成为一个独立张量，后续 softmax、mask、乘 `V` 很难继续深度融合。Flashlight 把矩阵乘也表示成 reduction：

$$
C_{mn}=\sum_k A_{mk}B_{kn}.
$$

这里 \(m,n\) 是可并行的 p-dimensions，\(k\) 是需要累加的 r-dimension。这样，GEMM、row max、sum-exp、第二个 GEMM 都共享同一类 loop-level 语义，编译器才能在同一个 IR 中讨论“哪些维度外层并行、哪些维度内层 reduction、哪些 producer/consumer 可以合并”。

**结构融合的关键是维度降级。** 若一个 producer 的输出维度在 consumer 中变成 reduction 维度，传统“相同 loop sketch 才能融合”的规则会失败。Flashlight 允许把 producer 的某个 p-dimension 转成 fused kernel 的 r-dimension：

$$
[(P_{\text{common}},P_{\text{producer}}),(\cdots)]
\;\Longrightarrow\;
[(P_{\text{common}}),(P_{\text{producer}},\cdots)].
$$

直觉是：并行 loop 也可以顺序执行。把它放进内层 reduction 后，producer 的中间结果不再写 HBM，而是在寄存器或片上局部存储中立即被 consumer 消费。对 attention 来说，这能先把 `QK^T` 与 softmax 的 `max` reduction 粘在一起，虽然牺牲了一部分 producer 并行度，却省掉了大矩阵物化和 kernel 间读写。

**语义融合负责把两遍稳定 softmax 改写成在线 softmax。** 稳定 softmax 通常先求整行最大值 \(m_{\text{final}}\)，再计算：

$$
\mathrm{softmax}(x_i)=\frac{\exp(x_i-m_{\text{final}})}{\sum_j \exp(x_j-m_{\text{final}})}.
$$

这看起来必须两遍扫描，因为第二遍依赖第一遍的最终最大值。Flashlight 利用指数函数的同态性质 \(\exp(x-y)=\exp(x)/\exp(y)\)，把“依赖最终最大值”改成“依赖 running max 并在 max 变化时重缩放”。若旧统计量为 \((m_{\text{old}}, s_{\text{old}})\)，新元素或新 tile 的最大值导致 \(m_{\text{new}}>m_{\text{old}}\)，则旧和式修正为：

$$
s_{\text{new}}
=s_{\text{old}}\exp(m_{\text{old}}-m_{\text{new}})
+\sum_{x\in \text{new tile}}\exp(x-m_{\text{new}}).
$$

这样 max reduction 与 sum-exp reduction 可以合并成单遍 loop，进一步为 `softmax(QK^T)` 的整块融合铺路。

**tile-aware 维度消除让 `softmax(QK^T)V` 继续融合。** GPU kernel 实际不是逐元素执行，而是按 tile 组织。某个维度 \(D\) 被 tile size \(B_D\) 分块后，tile 级 loop bound 是 \(\lceil D/B_D\rceil\)。如果 \(B_D \ge |D|\)，这个维度在 tile 级只迭代一次，可以作为“可消除小维度”处理。Flashlight 借此把前一阶段 softmax 的 tile 输出直接交给后一阶段 `@ V`，不需要把每个 tile 的概率矩阵落到 HBM。逻辑 grid 维度则给 TorchInductor 一个更灵活的方式表达这些 tile 级调度，而不把所有维度都绑死在物理 CUDA/Triton grid 上。

**与传统方法的差异在于优化边界。** 手写 FlashAttention 把算法和 kernel 人工耦合；FlexAttention 把一批常见变体抽象为模板；Flashlight 把“发现 attention 子图、证明 reduction 可改写、决定维度是否降级、生成 fused tiled kernel”变成编译器问题。它不保证每个变体都比专门手写 kernel 快，因为过度融合可能增加寄存器压力或降低并行度；但它显著降低了新注意力变体从 PyTorch 原型到高性能实现的工程门槛。

#### 🧪 练习题

```yaml
question: "Flashlight 能把稳定 softmax 的两遍 reduction 融合成单遍在线 softmax，主要依赖什么性质？"
options:
  - "矩阵乘法满足交换律"
  - "指数函数可把加减关系转成乘除重缩放关系"
  - "Triton kernel 必须使用固定 tile size"
  - "FlexAttention 的 block_mask 可以缓存"
answer: 1
explain: "当 running max 改变时，旧的 sum-exp 可以乘以 exp(m_old-m_new) 重新归一化，因此 max 与 sum-exp 能在同一遍扫描中维护。"
```
