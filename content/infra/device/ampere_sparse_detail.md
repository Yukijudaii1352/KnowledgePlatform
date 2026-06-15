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

Ampere 引入第三代 Tensor Core、TF32 格式和 2:4 结构化稀疏，使 GPU 能在保持稠密编程体验的同时跳过一半权重乘法。它解决了非结构化稀疏难以高效映射硬件的问题，用固定稀疏模式换取可预测的压缩、索引和吞吐提升。

#### 🎯 核心要点

- TF32 在 FP32 输入上使用 8-bit exponent 和 10-bit mantissa，兼顾易用性与 Tensor Core 吞吐
- 2:4 结构化稀疏要求每连续 4 个权重保留 2 个非零值，硬件用元数据选择有效乘法
- Sparse Tensor Core 理论上可在合格矩阵乘中获得接近 2× 的计算吞吐提升
- 训练/部署通常采用 prune → fine-tune → sparse inference 的流程恢复精度
- 稀疏模式与矩阵布局绑定，只有满足对齐和数据类型约束的 GEMM/Conv 才能触发加速
- 与非结构化剪枝相比，2:4 更容易被固定硬件 datapath 解码和调度

#### 🔬 深入细节

##### 核心示意图

![Ampere 2:4 结构化稀疏示意](https://placehold.co/900x420/png?text=Ampere+2+of+4+Structured+Sparsity+Tensor+Core)
*图：基于 NVIDIA Ampere 架构白皮书整理的 2:4 稀疏示意；每 4 个权重只保留 2 个，并用少量元数据记录位置。*

##### 算法伪代码

```python
# 2:4 结构化剪枝和稀疏 Tensor Core 推理伪代码
for group in weight.reshape(-1, 4):
    keep = topk_indices(abs(group), k=2)
    mask = zeros(4)
    mask[keep] = 1
    group *= mask

model = finetune(model, sparse_mask=fixed_mask)
compressed_weight, metadata = encode_2_4(weight)
output = sparse_tensor_core_gemm(input, compressed_weight, metadata)
```

Ampere 的 2:4 稀疏设计抓住了稀疏硬件的核心矛盾：完全任意的非零位置虽然压缩率高，但会带来不规则访存、负载不均和索引开销；完全块稀疏虽然规则，但精度损失可能更大。2:4 是介于二者之间的结构化约束，固定局部窗口内的非零数量，让硬件可以用简单元数据选择有效乘法。

TF32 是 Ampere 面向训练易用性的另一项关键变化。用户仍以 FP32 张量调用 GEMM/Conv，Tensor Core 内部把乘法输入按 TF32 处理，并进行 FP32 累加。这样许多模型无需显式改成 FP16/BF16 就能获得 Tensor Core 加速，但对数值敏感的计算仍可选择关闭 TF32 或使用更高精度。

2:4 稀疏的实际收益取决于模型能否在固定稀疏模式下保持精度。常见流程是先对预训练权重分组剪枝，保留每组绝对值最大的两个权重，再带着固定 mask 微调。对卷积和全连接层，这能把权重乘法数减少约一半；对 attention 或小矩阵场景，元数据、布局转换和 kernel 调度开销可能削弱理论收益。

与 Volta Tensor Core 相比，Ampere 不只是支持更多精度格式，而是开始把“模型压缩约束”纳入硬件 ISA。它说明硬件加速和模型稀疏化必须协同设计：算法侧给出规则稀疏，硬件侧提供专用解码与矩阵乘路径，编译库负责确保数据布局满足触发条件。

#### 🧪 练习题

```yaml
question: "Ampere 2:4 稀疏为什么比任意非结构化稀疏更容易硬件加速？"
options:
  - "因为它完全不需要存储权重"
  - "因为每个固定窗口的非零数量已知，硬件解码和调度更规则"
  - "因为它只适用于 CPU 标量代码"
  - "因为它会自动提高模型精度"
answer: 1
explain: "2:4 固定每 4 个权重保留 2 个，非零分布受约束，Sparse Tensor Core 可用少量元数据高效选择乘法。"
```
