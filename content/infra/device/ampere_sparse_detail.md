### Ampere 2:4 Sparsity

```yaml
id: ampere_sparse
name: Ampere 2:4 Sparsity
full_name: 安培结构化稀疏架构 (Ampere Structured Sparsity)
year: '2020'
org: NVIDIA
paper_url: https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf
category: gpu_architecture
parent: volta_tensor_core
motivation: 硬件级2:4结构化稀疏与TF32格式
```

#### 📝 一句话总结

Ampere 在第三代 Tensor Core 中同时引入 TF32 和 2:4 结构化稀疏：前者让 FP32 训练无需大改代码即可走 Tensor Core，后者用“每 4 个权重保留 2 个”的规则稀疏换取可被硬件稳定解码的近 2 倍矩阵乘吞吐。它解决了非结构化剪枝虽稀疏但难以高效映射到 SIMD/SIMT 硬件的问题。

#### 🎯 核心要点

- TF32 使用与 FP32 相同的 8-bit exponent、较短的 10-bit mantissa，Tensor Core 内部乘法按 TF32 执行、累加保持 FP32
- 2:4 结构化稀疏要求权重在固定连续 4 元组内最多 2 个非零值，稀疏值和元数据一起送入 Sparse Tensor Core
- Sparse Tensor Core 跳过被剪掉的权重乘法，在满足数据类型、布局和对齐条件时，理论矩阵乘吞吐相对稠密 Tensor Core 接近翻倍
- 典型工作流是 dense pretrain 或加载预训练权重 → magnitude pruning 生成 2:4 mask → 带 mask 微调恢复精度 → 压缩编码推理
- 2:4 约束通常施加在 GEMM/Conv 权重矩阵的 reduction 维，必须和 cuSPARSELt/cuBLASLt 等库的布局约定一致
- 相比任意非结构化稀疏，2:4 牺牲一部分模式自由度，换来固定元数据宽度、规则访存和可预测的硬件调度

#### 🔬 深入细节

##### 核心示意图

![Ampere 2:4 结构化稀疏模式](https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png)
*图：NVIDIA Developer Blog 展示的 2:4 结构化稀疏模式；每个连续 4 元组中只有 2 个非零权重参与 Tensor Core 乘法，剩余位置由元数据编码。*

Ampere 的稀疏 Tensor Core 是一次典型的软硬件协同折中。非结构化剪枝可以在全矩阵中任意保留权重，算法自由度最高，但硬件必须处理变长索引、随机访存和线程间负载不均；块稀疏更规则，却可能因为粒度太粗而明显损失模型精度。2:4 模式把自由度限制在局部 4 元组内，使每个小组的非零数量固定，硬件只需读取两个数值和少量位置元数据，就能在 Tensor Core datapath 中跳过一半乘法。

2:4 约束可写成：

$$
\forall i,\quad
g_i=(w_{4i},w_{4i+1},w_{4i+2},w_{4i+3}),\quad
\|g_i\|_0\le 2
$$

推理时，压缩权重不再保存完整四元组，而是保存两个非零值 \(v_0,v_1\) 以及它们在四元组中的位置元数据 \(m_i\)。Sparse Tensor Core 根据 \(m_i\) 选择输入激活中对应的两项相乘并累加。因为每组都恰好对应固定数量的乘法，warp 内工作量可预测，调度器不需要处理任意稀疏矩阵中常见的行长不均问题。

##### 算法伪代码

```python
# Ampere 2:4 pruning + sparse Tensor Core inference 伪代码
def prune_2_4(weight):
    mask = zeros_like(weight)
    for row in range(weight.rows):
        for col in range(0, weight.cols, 4):
            group = weight[row, col:col+4]
            keep = topk(abs(group), k=2).indices
            mask[row, col + keep] = 1
    return weight * mask, mask

weight_sparse, mask = prune_2_4(weight_dense)
for step in finetune_steps:
    loss = model.forward(batch, weight=weight_sparse)
    loss.backward()
    weight_dense = optimizer.step(weight_dense)
    weight_sparse = weight_dense * mask  # 固定 2:4 结构恢复精度

values, metadata = encode_sparse_2_4(weight_sparse)
output = sparse_tensor_core_gemm(activation, values, metadata)
```

TF32 是 Ampere 另一条关键路径，它解决的是“用户不想重写 FP32 训练代码，但又想利用 Tensor Core”的迁移问题。TF32 保留 FP32 的指数范围，因此对溢出/下溢的行为更接近 FP32；同时缩短尾数，把乘法输入压到 Tensor Core 更适合的低精度格式。简化表示为：

$$
\mathrm{TF32}(x)=\mathrm{round}_{10\text{-bit mantissa}}(x),\quad
C \leftarrow C + \mathrm{TF32}(A)\times \mathrm{TF32}(B)
$$

这意味着 FP32 GEMM/Conv 在默认数学模式下可获得 Tensor Core 加速，但并不等价于完整 FP32 乘法。对数值特别敏感的迭代求解、科学计算或验证场景，开发者仍需要显式选择更严格的数学模式；而对大多数深度学习训练，FP32 累加和随机优化的容错性使 TF32 成为低成本加速选项。

2:4 稀疏的训练/部署收益并非无条件成立。首先，模型必须能承受固定模式剪枝：常见做法是按绝对值保留每个四元组中最大的两个权重，再进行若干 epoch 微调。其次，矩阵形状必须足够大且布局满足库约束，否则压缩、元数据读取和重排开销会抵消理论收益。最后，并不是所有算子都适合稀疏化，LayerNorm、Softmax、小 batch 小矩阵以及通信密集阶段通常不是 Sparse Tensor Core 的主要受益者。

从 Volta 到 Ampere 的变化，可以看作 Tensor Core 从“低精度矩阵乘硬件”扩展为“模型表示约束的执行硬件”。Volta 关心 FP16 输入和 FP32 累加；Ampere 进一步把 TF32 的用户透明性和 2:4 的压缩结构纳入 ISA/库路径。算法侧必须接受局部稀疏约束，硬件侧才能用固定元数据和规则 datapath 给出稳定吞吐。

> ⚠️ 注意：2:4 的“2 倍”主要指满足条件的矩阵乘吞吐上限；端到端模型速度还受非稀疏算子、内存带宽、batch size、kernel fusion 和数据布局转换影响。

#### 🧪 练习题

```yaml
question: "Ampere 2:4 结构化稀疏比任意非结构化稀疏更容易硬件加速的根本原因是什么？"
options:
  - "它完全不需要保存权重值"
  - "它让每个固定 4 元组的非零数量已知，硬件可用固定元数据和规则调度跳过乘法"
  - "它只适用于 CPU 上的标量矩阵乘"
  - "它会自动让所有模型精度高于稠密模型"
answer: 1
explain: "2:4 把非零位置限制在局部固定窗口内，Sparse Tensor Core 可以用少量元数据选择两项有效乘法，避免任意稀疏带来的不规则访存和负载不均。"
```
