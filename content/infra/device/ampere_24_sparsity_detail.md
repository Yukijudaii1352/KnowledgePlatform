### 安培2:4稀疏硬件 (Ampere 2:4 Structured Sparsity)

```yaml
id: ampere_24_sparsity
name: Ampere 2:4 Sparsity HW
full_name: 安培2:4稀疏硬件 (Ampere 2:4 Structured Sparsity)
year: '2020'
org: NVIDIA
paper_url: https://www.nvidia.com/content/dam/en-zz/Solutions/Data-Center/nvidia-ampere-architecture-whitepaper.pdf
category: efficiency
parent: ampere_sparse
motivation: Ampere架构原生2:4结构化稀疏硬件支持
```

#### 📝 一句话总结

Ampere 2:4 Structured Sparsity 在第三代 Tensor Core 中加入 Sparse MMA 路径，要求每 4 个连续权重中至少 2 个为零，从而用少量元数据跳过一半乘法。它解决了任意非结构化稀疏难以在 GPU Tensor Core 上规则调度的问题，以局部结构约束换取接近 2 倍的矩阵乘吞吐上限。

#### 🎯 核心要点

- 硬件约束是 2:4 结构化稀疏：每个连续 4 元组保留最多 2 个非零权重，形成固定 50% 稀疏率
- Sparse Tensor Core/Sparse MMA 跳过零权重对应乘法，只处理压缩后的非零值和位置元数据
- 数据格式由 values + metadata 组成：values 保存两个非零权重，metadata 编码它们在 4 元组中的位置
- 典型部署流程：稠密训练或加载预训练模型 → 按 2:4 规则剪枝 → 固定 mask 微调恢复精度 → 压缩权重 → TensorRT/cuSPARSELt 推理
- 适合 GEMM 和卷积中的大矩阵乘路径，尤其是 FC、1x1 conv、Transformer FFN/投影层等权重主导算子
- 相比非结构化稀疏牺牲模式自由度，但换来固定工作量、规则访存和 Tensor Core 原生指令支持
- 端到端加速受非稀疏算子、矩阵尺寸、数据类型、布局转换、batch size 和内存带宽共同限制

#### 🔬 深入细节

##### 核心示意图

![Ampere 2:4 结构化稀疏模式与压缩](https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/2-4-structured-sparsity-pattern.png)
*图 1：NVIDIA 技术博客展示的 2:4 结构化稀疏模式；每 4 个连续值中至少 2 个为零，压缩后只保存非零值和索引元数据。白皮书中的 Sparse MMA 章节给出同一硬件机制。*

![Ampere 结构化稀疏基础训练流程](https://developer-blogs.nvidia.com/wp-content/uploads/2023/06/basic-training-recipe.png)
*图 2：NVIDIA 技术博客给出的基础训练 recipe：先训练稠密模型，再剪成 2:4 稀疏模式，并在保持 mask 的情况下重训练/微调恢复精度。*

##### 算法伪代码

```python
# Ampere 2:4 pruning + Sparse MMA 推理伪代码
def make_2_4_sparse(weight, group_axis=-1):
    sparse = zeros_like(weight)
    metadata = []

    for group in iterate_contiguous_groups(weight, size=4, axis=group_axis):
        keep = topk(abs(group.values), k=2).indices
        sparse[group.positions[keep]] = group.values[keep]
        metadata.append(encode_positions_2_of_4(keep))

    return sparse, metadata

# 1. 稠密训练或加载预训练权重
weight_dense = train_or_load_dense_model()

# 2. 生成 2:4 mask，并在微调中保持该结构
weight_sparse, meta = make_2_4_sparse(weight_dense)
mask = weight_sparse != 0
for batch in finetune_data:
    loss = model(batch, weights=weight_sparse)
    loss.backward()
    weight_dense = optimizer.step(weight_dense)
    weight_sparse = weight_dense * mask

# 3. 部署：压缩 values + metadata，调用 Sparse Tensor Core 路径
values, metadata = compress_2_4(weight_sparse)
output = sparse_mma(activation_dense, values, metadata)
```

##### 2:4 约束为什么适合硬件

任意非结构化稀疏只规定“哪些权重为零”，不规定零的位置。算法上它最灵活，但硬件执行必须面对可变长度索引、随机访存和线程负载不均：有些行可能有很多非零，有些行几乎没有非零。Tensor Core 的强项是固定形状矩阵块上的高吞吐 MMA；如果每个小块的有效乘法数量不固定，调度和数据供给都会变复杂。

Ampere 的 2:4 规则把稀疏自由度限制在很小的局部窗口中：

$$
\forall g_i=(w_{4i},w_{4i+1},w_{4i+2},w_{4i+3}),\qquad
\|g_i\|_0 \le 2
$$

因此每个 4 元组最多只有两个权重参与乘法。硬件可以把权重压缩为两个 value 加一个固定宽度 metadata，Sparse MMA 根据 metadata 从 dense activation 中选择对应元素相乘。由于每个组的非零数量固定，warp 内工作量和数据读取节奏可预测，这正是它比通用稀疏格式更容易进入 Tensor Core 数据通路的原因。

##### Sparse MMA 的计算模型

白皮书描述的 Sparse MMA 可以看成把矩阵 \(A\) 的 2:4 稀疏权重块与稠密矩阵 \(B\) 相乘。稠密 MMA 会对完整 \(16\times 8\times 16\) 形状执行乘加；Sparse MMA 识别 \(A\) 中满足 50% 结构化稀疏的零值，只对非零权重和 \(B\) 的对应元素执行乘加，从而把有效乘法数量减半。

对单个 4 元组，稠密点积片段为：

$$
s = \sum_{k=0}^{3} w_k x_k
$$

若 metadata 表示保留位置集合 \(P \subset \{0,1,2,3\}\)，且 \(|P|=2\)，Sparse Tensor Core 实际执行：

$$
s_{\mathrm{sparse}} = \sum_{k\in P} w_k x_k
$$

这不是近似跳过任意小值，而是模型权重已经被剪枝并微调后，零权重被视为结构的一部分。硬件只保证对满足格式的矩阵乘更快；能否保持精度取决于剪枝和恢复训练。

##### 训练、压缩与部署流程

基础 recipe 通常先训练稠密模型，再在目标层按每 4 个权重保留绝对值最大的 2 个生成 mask。随后微调时保持 mask 不变：被剪掉的位置持续为 0，保留位置继续学习以吸收精度损失。这个流程可写成：

$$
W_{\mathrm{sparse}} = W \odot M,\qquad
M_g = \mathrm{Top2Mask}(|W_g|)
$$

其中 \(W_g\) 是某个 4 元组，\(M_g\) 只在绝对值最大的两个位置取 1。对更敏感的模型，可以使用 progressive sparsity：先达到较低稀疏率并微调，再逐步推进到 2:4 的 50% 稀疏，让模型有更多机会重新分配信息。

部署时，框架或库需要确认权重布局、数据类型和维度对齐满足 Sparse Tensor Core 要求。TensorRT 可以在构建 engine 时启用 sparse weights；cuSPARSELt 则提供结构化矩阵描述、剪枝检查、压缩和 matmul plan。实际加速通常出现在足够大的 GEMM/Conv 上；若矩阵太小，metadata 解码、压缩转换或 kernel launch 开销可能抵消 Sparse MMA 的理论 2 倍收益。

##### 与传统稀疏和块稀疏的区别

非结构化稀疏在精度上通常更友好，因为它可以在全局任意位置保留重要权重；但在 GPU 上，非零分布不规则会破坏 coalesced memory access 和 Tensor Core 块级执行。块稀疏把矩阵切成大块，整块保留或删除，硬件更规则，但粒度太粗时容易剪掉有用连接。2:4 位于两者之间：局部窗口很小，精度损失比大块稀疏更容易恢复；每组非零数固定，硬件又比任意稀疏更容易解码。

> 💡 关键：Ampere 2:4 稀疏不是“看到零就自动加速”的通用压缩，而是要求模型权重提前满足特定局部模式；只有 values、metadata、矩阵布局和 Sparse MMA 指令路径全部匹配时，硬件吞吐优势才会出现。

#### 🧪 练习题

```yaml
question: "Ampere 2:4 结构化稀疏能被 Sparse Tensor Core 高效执行的关键条件是什么？"
options:
  - "每个连续 4 个权重中至少 2 个为零，并保存非零值的位置元数据"
  - "所有权重都必须变成 0"
  - "矩阵必须使用 32-bit 浮点且不能压缩"
  - "只要模型中任意位置存在零值就会自动获得 2 倍端到端加速"
answer: 0
explain: "Sparse Tensor Core 依赖固定 2:4 模式和 metadata 来选择有效乘法；任意零值或不满足布局的数据无法直接走该硬件路径。"
```
