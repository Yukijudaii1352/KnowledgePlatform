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

Hopper Transformer Engine 把 FP8 作为 Tensor Core 训练/推理格式引入 Transformer 主路径，并用 E4M3/E5M2 双格式与动态 scaling 管理不同张量的数值范围。它解决了大模型 GEMM 占比高、显存带宽紧张、但纯低精度训练容易失稳的问题。

#### 🎯 核心要点

- 第四代 Tensor Core 支持 FP8、FP16、BF16、TF32、FP64 等格式，FP8 路径重点服务 Transformer 中的 QKV、MLP 和投影 GEMM
- FP8 包含 E4M3 与 E5M2 两种编码：E4M3 精度更高、动态范围较小，E5M2 动态范围更大、尾数更少
- Transformer Engine 在层级跟踪 activation/weight/gradient 的 amax 历史，并据此维护 scale，把真实张量映射到 FP8 可表示区间
- FP8 通常用于 GEMM 输入和部分缓存，累加、归一化、softmax、优化器状态等数值敏感环节保留 BF16/FP16/FP32
- NVIDIA Transformer Engine 软件栈通过 recipe、amax history、delayed scaling、cuBLASLt kernel 和框架集成隐藏大部分量化细节
- 相比 Ampere 的 TF32/2:4，Hopper FP8 更依赖运行时统计和自动精度策略，是硬件 Tensor Core 与训练框架协同控制的低精度方案

#### 🔬 深入细节

##### 核心示意图

![NVIDIA Hopper FP8 格式与 Tensor Core 数据通路](https://developer-blogs.nvidia.com/wp-content/uploads/2022/03/New-Hopper-FP8-Precisions-625x340.jpg)
*图：NVIDIA Developer Blog 中的 Hopper FP8 格式和 Tensor Core 数据通路示意；E4M3/E5M2 输入可在 Tensor Core 中乘加并累加到 FP32 或 FP16。*

FP8 的挑战不是“把 FP16 缩短一半”这么简单。Transformer 中权重、激活、注意力 logits、MLP 中间值和反向梯度的分布差异很大，而且训练过程中还会随 step 漂移。若使用固定全局量化尺度，某些层会溢出，另一些层又会把大量小值舍入为零。Hopper 的 Transformer Engine 因此把 FP8 做成动态系统：硬件提供 FP8 Tensor Core，软件持续统计 amax，框架按 recipe 决定哪些张量降到 FP8、哪些保持高精度。

E4M3 与 E5M2 对应两种数值取舍。E4M3 用 4 位 exponent、3 位 mantissa，表示精度相对更好，适合前向传播中的权重和激活；E5M2 用 5 位 exponent、2 位 mantissa，动态范围更宽，适合反向传播中分布跨度更大的梯度。可用直觉公式表示：

$$
\text{E4M3}: 1\text{ sign}+4\text{ exponent}+3\text{ mantissa},\quad
\text{E5M2}: 1\text{ sign}+5\text{ exponent}+2\text{ mantissa}
$$

Transformer Engine 的 scaling 机制通常围绕 amax history 工作。设某个张量最近窗口内的最大绝对值为 \(\operatorname{amax}\)，FP8 格式的最大可表示有限值为 \(F_{\max}\)，则缩放因子可以抽象为：

$$
s=\frac{F_{\max}}{\operatorname{amax}\cdot 2^{m}},\quad
q=Q_{\mathrm{FP8}}(x\cdot s),\quad
\hat{x}=q/s
$$

其中 \(m\) 是 margin，\(Q_{\mathrm{FP8}}\) 是舍入到 E4M3 或 E5M2 的量化算子。这个公式表达了核心直觉：先把当前张量按 scale 放进 FP8 可表示范围，再在 GEMM 前以 FP8 参与 Tensor Core 计算，必要时在输出或后续算子处反量化/转换回更高精度。

##### 算法伪代码

```python
# Hopper Transformer Engine FP8 delayed scaling 伪代码
for layer in transformer.layers:
    # 1. 根据历史 amax 更新下一次使用的 scale
    x_amax = max_abs(layer.input)
    w_amax = max_abs(layer.weight)
    layer.x_history.push(x_amax)
    layer.w_history.push(w_amax)
    x_scale = fp8_max("E4M3") / (max(layer.x_history) * 2**margin)
    w_scale = fp8_max("E4M3") / (max(layer.w_history) * 2**margin)

    # 2. 前向 GEMM：权重和激活多用 E4M3，累加保持高精度
    x_fp8 = quantize(layer.input * x_scale, format="E4M3")
    w_fp8 = quantize(layer.weight * w_scale, format="E4M3")
    y = tensor_core_gemm(x_fp8, w_fp8, accumulate="FP16/BF16")

    # 3. 反向 GEMM：梯度常用动态范围更大的 E5M2
    if training:
        dy_amax = max_abs(layer.grad_output)
        dy_scale = fp8_max("E5M2") / (dy_amax * 2**margin)
        dy_fp8 = quantize(layer.grad_output * dy_scale, format="E5M2")
        dx, dw = tensor_core_backward_gemm(dy_fp8, x_fp8, w_fp8)
```

实际训练并不会把整张计算图都改成 FP8。矩阵乘是 Transformer 的算力和带宽大头，所以最值得压低精度；LayerNorm、Softmax、残差加法、优化器状态和部分归约对数值误差更敏感，通常保留 BF16/FP16/FP32。这样的混合策略让 FP8 主要承担“高吞吐可容错”的部分，把“误差会被放大”的部分留给更高精度。

Hopper 的 FP8 路径与 Ampere 的 TF32 有本质区别。TF32 主要是对 FP32 GEMM 的输入舍入，使用体验接近透明；FP8 则需要明确的量化尺度、格式选择和 amax 统计，否则 8 bit 表示范围很容易失控。也因此，Transformer Engine 不只是硬件单元名称，更是一套跨 Tensor Core、cuBLASLt、框架模块和训练 recipe 的自动精度控制机制。

在推理中，FP8 的价值还包括显存容量和带宽。大语言模型的权重和 KV/中间激活占用巨大，FP8 能减少读写量并提高批处理吞吐；但推理也要决定哪些层可 FP8、输出 logits 是否保留更高精度、是否需要校准集确定 scale。对训练而言，FP8 通常与 BF16 optimizer state、梯度缩放、分布式通信压缩等系统技巧一起出现，端到端收益取决于 GEMM 占比、序列长度、并行策略和 kernel fusion。

> 💡 关键：Hopper FP8 的核心不是单个 8-bit 格式，而是“按张量统计范围、按阶段选择格式、按算子保留高精度”的动态混合精度闭环。

#### 🧪 练习题

```yaml
question: "Hopper Transformer Engine 为什么需要动态 scale，而不是固定一个全局 FP8 缩放因子？"
options:
  - "因为不同层、不同张量和不同训练阶段的数值范围差异很大，固定 scale 容易溢出或下溢"
  - "因为 FP8 Tensor Core 只能执行整数加法"
  - "因为 E4M3 和 E5M2 都没有 exponent 位"
  - "因为动态 scale 会删除所有 LayerNorm 计算"
answer: 0
explain: "FP8 表示范围有限，Transformer Engine 通过 amax history 和 scale 把每个张量映射到合适区间，从而在吞吐和训练稳定性之间折中。"
```
