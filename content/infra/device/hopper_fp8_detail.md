### Hopper FP8

```yaml
id: hopper_fp8
name: Hopper FP8
full_name: Hopper FP8变换引擎 (Hopper Transformer Engine)
year: '2022'
org: NVIDIA
paper_url: https://www.nvidia.com/en-us/data-center/hopper-architecture/
category: gpu_architecture
parent: ampere_sparse
motivation: Transformer Engine支持FP8动态精度
```

#### 📝 一句话总结

Hopper Transformer Engine 将 FP8 引入 Tensor Core 训练和推理，并通过动态选择 E4M3/E5M2 与缩放因子管理不同张量的数值范围。它针对 Transformer 中矩阵乘占比高、激活/梯度分布变化大的问题，在吞吐、显存和训练稳定性之间取得平衡。

#### 🎯 核心要点

- 第四代 Tensor Core 支持 FP8、FP16、BF16、TF32、FP64 等多种格式
- Transformer Engine 在层级上自动选择 FP8 或更高精度，并维护 per-tensor/per-channel scale
- E4M3 适合前向激活和权重，E5M2 动态范围更大，常用于反向梯度
- FP8 降低显存带宽和存储压力，特别适合大模型 attention 与 MLP GEMM
- 软件栈通过 cuBLASLt、Transformer Engine 库和框架集成隐藏大部分量化细节
- Hopper 同时引入 TMA、DPX、NVLink/NVSwitch 改进，支撑大模型训练系统化加速

#### 🔬 深入细节

##### 核心示意图

![Hopper Transformer Engine FP8 动态精度示意](https://placehold.co/900x420/png?text=Hopper+Transformer+Engine+FP8+E4M3+E5M2)
*图：基于 NVIDIA Hopper 官方架构资料整理的 Transformer Engine 示意；不同张量在 FP8 与高精度格式之间动态切换。*

##### 算法伪代码

```python
# Transformer Engine 动态 FP8 伪代码
for layer in transformer.layers:
    x_scale = update_amax_and_scale(layer.input)
    w_scale = update_amax_and_scale(layer.weight)

    x_fp8 = quantize(layer.input, format="E4M3", scale=x_scale)
    w_fp8 = quantize(layer.weight, format="E4M3", scale=w_scale)
    y = tensor_core_gemm_fp8(x_fp8, w_fp8, accumulate="FP16/BF16")

    if backward:
        grad_fp8 = quantize(layer.grad, format="E5M2", scale=grad_scale)
        compute_weight_update(grad_fp8)
```

FP8 的难点不在于把比特数从 16 降到 8，而在于如何避免数值范围和舍入误差破坏训练。Transformer 的权重、激活、注意力分数和梯度分布差异很大，同一格式无法覆盖所有张量。Hopper 通过 Transformer Engine 记录张量历史最大值并更新 scale，把真实值映射到 FP8 可表示范围内。

E4M3 和 E5M2 体现了两类需求。E4M3 有更多 mantissa 位，精度相对更好，适合前向的权重和激活；E5M2 指数范围更大，适合反向传播中动态范围更宽的梯度。硬件支持两者，软件根据张量类型和统计信息选择格式，这比静态全局量化更稳健。

在训练流程中，FP8 通常只用于高吞吐矩阵乘的输入和部分缓存表示，累加、归一化、softmax、优化器状态等仍保持 BF16/FP16/FP32。这样设计的直觉是：把最耗算力和带宽的 GEMM 压到 FP8，同时把数值敏感环节留给高精度，从而避免“全模型低精度”带来的不稳定。

与 Ampere 的 TF32/2:4 相比，Hopper FP8 更接近软硬件闭环：硬件提供 FP8 Tensor Core，库跟踪 amax 和 scale，框架在 Transformer 层级插入 cast 和 recipe。用户看到的是更高吞吐和更低显存占用，底层实际执行的是持续的动态量化控制。

#### 🧪 练习题

```yaml
question: "Hopper Transformer Engine 为什么需要动态缩放因子？"
options:
  - "为了让 FP8 张量覆盖不同层和不同训练阶段的数值范围"
  - "为了把所有矩阵乘改成整数加法"
  - "为了删除 LayerNorm"
  - "为了避免使用 Tensor Core"
answer: 0
explain: "FP8 表示范围有限，动态 scale 根据张量 amax 调整量化区间，减少溢出和下溢。"
```
