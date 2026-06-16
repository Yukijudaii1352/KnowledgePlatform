### NVFP4: NVIDIA FP4 (NVFP4)

```yaml
id: nvfp4
name: NVFP4
full_name: NVIDIA FP4 (NVFP4)
year: '2026'
org: NVIDIA
paper_url: https://developer.nvidia.com/blog/nvfp4-blackwell-inference/
category: quantize
parent: smoothquant
motivation: E2M1双层微缩放实现硬件原生FP4推理
```

#### 📝 一句话总结

NVFP4 是 NVIDIA Blackwell Tensor Core 原生支持的 4-bit 浮点推理格式，用 E2M1 数值、16 元素 FP8 微块缩放和 FP32 张量级缩放解决 FP4 动态范围窄、量化误差大的问题。

#### 🎯 核心要点

- 数值本体是 E2M1 FP4：1 位符号、2 位指数、1 位尾数，典型可表示约 \([-6,6]\) 的离散值
- 每 16 个 FP4 值共享一个 E4M3 FP8 per-block scale，相比 MXFP4 的 32 值块和 E8M0 幂次缩放更细粒度
- 每个张量额外使用 FP32 per-tensor scale，把整体分布拉到 FP8 scale 容易表达的范围
- Blackwell 第五代 Tensor Core 可在硬件中处理 microscaled FP4 分组、动态缩放和 4-bit 矩阵运算
- 存储开销约为 4-bit 值加每 16 值一个 FP8 scale，即约 4.5 bit/value，再加一个很小的张量级 FP32 scale
- 官方资料给出 DeepSeek-R1-0528 从 FP8 量化到 NVFP4 后多项评测约 1% 以内精度差异，同时相对 FP16 显著降低模型内存

#### 🔬 深入细节

![NVFP4 双层缩放结构](https://developer-blogs.nvidia.com/wp-content/uploads/2025/06/nvfp4-two-level-scaling.gif)
*图：NVFP4 的 E2M1 FP4 值、16 值 E4M3 FP8 微块 scale 和 FP32 张量级 scale。图片来源：NVIDIA Technical Blog “Introducing NVFP4 for Efficient and Accurate Low-Precision Inference”。*

```python
# NVFP4-style quantization/dequantization sketch
# x: one tensor to be quantized for inference
# block_size = 16 in NVFP4
def quantize_nvfp4(x):
    tensor_scale = choose_fp32_tensor_scale(x)
    x_scaled = x / tensor_scale
    packed_values, block_scales = [], []

    for block in x_scaled.flatten().split(16):
        # FP8 E4M3 scale can represent fractional, non-power-of-two scales.
        s = quantize_to_e4m3(max_abs(block) / fp4_e2m1_max)
        q = quantize_to_e2m1(block / s)      # each q is 4-bit E2M1
        packed_values.append(pack_4bit(q))
        block_scales.append(s)

    return packed_values, block_scales, tensor_scale

def dequantize_nvfp4(q, block_scale, tensor_scale):
    # Effective value used by GEMM kernels
    return tensor_scale * block_scale * dequantize_e2m1(q)
```

NVFP4 针对的核心矛盾是：FP4 足够省带宽和算力，但 4 bit 的表达空间太小，若只给整个张量一个 scale，离群值会迫使大量普通值被挤到很粗的网格上；若使用 INT4，动态范围又不如浮点指数自然。NVFP4 保留 E2M1 的微型浮点结构，让每个值本身有符号、指数和尾数，再用微块 scale 处理局部分布，从而把“格式动态范围”和“张量局部尺度”拆开。

E2M1 的值可以写成近似形式：

$$
x_q=(-1)^s\cdot 2^e\cdot (1+m/2)
$$

其中 \(s\) 是符号位，\(e\) 由 2 位指数编码，\(m\) 是 1 位尾数。因为只有 1 位尾数，E2M1 的数值网格很稀疏；NVIDIA 官方示例中正数侧包含 \(0,0.5,1,1.5,2,3,4,6\) 等离散值。真正让它可用于 LLM 推理的是缩放：对第 \(b\) 个 16 元素微块，重建值可表达为：

$$
\hat{x}_{b,k}=S_{\text{tensor}}\cdot S_b^{\mathrm{E4M3}}\cdot q_{b,k}^{\mathrm{E2M1}}
$$

这里 \(S_b^{\mathrm{E4M3}}\) 是每 16 个值共享的 FP8 scale，\(S_{\text{tensor}}\) 是每张量 FP32 scale。若只看单层微块，官方博客也用 \(x=x_q\times s\) 解释：4-bit 编码值 \(x_q\) 负责相对形状，高精度 scale \(s\) 负责局部幅度。

![NVFP4 与 MXFP4 缩放精度对比](https://developer-blogs.nvidia.com/wp-content/uploads/2025/06/quantization-precision-power-of-two-fractional-scaling-comparison.png)
*图：MXFP4 的 E8M0 scale 只能贴到 2 的幂，NVFP4 的 E4M3 scale 可用分数缩放更贴近原始块分布。图片来源：NVIDIA Technical Blog。*

与 MXFP4 相比，NVFP4 的两个变化都围绕降低量化误差：第一，block size 从 32 缩到 16，使一个共享 scale 覆盖的数值范围更局部；第二，scale 从 E8M0 幂次缩放换成 E4M3 FP8 缩放，允许非 \(2^n\) 的分数尺度。NVIDIA 的示意图显示，同一组输入用 E8M0 会被迫贴到较粗的幂次尺度，而 E4M3 能选择更接近原始分布的 scale。代价是需要第二层 FP32 scale 调整整体范围，因为 E4M3 scale 自身的可表示范围比 E8M0 更窄。

推理部署时，NVFP4 通常作为 PTQ/QAT 或框架导出的目标格式：模型优化器先决定哪些线性层、权重、激活或 KV cache 使用 NVFP4，哪些敏感层保留更高精度；随后按张量和 16 值微块生成 scale 与 packed FP4 权重；运行时 TensorRT-LLM、vLLM 等后端在 Blackwell 上调用支持 NVFP4 的 GEMM/attention kernel。因为硬件直接理解 microscaled FP4，scale 应用不需要退回通用 FP16 反量化路径。

NVFP4 和 SmoothQuant 的层次不同。SmoothQuant 是算法层的 W8A8 平滑策略，通过把激活离群值迁移到权重侧来降低 INT8 量化难度；NVFP4 是 Blackwell 上的数值格式与硬件执行路径，目标是在 4 bit 下仍保留足够动态范围。实际系统可以组合两类思想：先用校准、平滑、敏感层回退等策略降低分布难度，再落到 NVFP4 的双层 microscaling 表示。

> ⚠️ 注意：NVFP4 不是“任意模型无损压成 4 bit”。它依赖校准/量化流程、层选择和 Blackwell 原生 kernel；在非 Blackwell 硬件上，NVFP4 格式本身不等于真实吞吐收益。

#### 🧪 练习题

```yaml
question: "NVFP4 相比 MXFP4 降低量化误差的关键设计是什么？"
options:
  - "16 元素微块使用 E4M3 FP8 scale，并叠加 FP32 张量级 scale"
  - "把所有权重都转换为无符号 INT8"
  - "只保留注意力层，删除 MLP 层"
  - "使用 Hessian 逆恢复被量化的权重"
answer: 0
explain: "NVFP4 用更小的 16 值块和可表示分数尺度的 E4M3 FP8 scale 拟合局部分布，再用 FP32 张量级 scale 补足整体范围。"
```
