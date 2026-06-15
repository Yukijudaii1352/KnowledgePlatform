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

NVFP4 是 NVIDIA Blackwell 上的硬件原生 FP4 推理格式，使用 E2M1 4-bit 数值和双层微缩放，在极低精度下兼顾动态范围、吞吐和量化稳定性。

#### 🎯 核心要点

- 数据本体使用 FP4 E2M1 格式，适配 Blackwell Tensor Core
- 以小 block 为单位使用低精度 micro-scale 管理局部范围
- 再配合更高精度全局/张量 scale 形成双层缩放
- 目标是在权重、激活或 KV 场景中获得高吞吐低内存
- 官方技术资料强调 Blackwell inference 的硬件原生 FP4 路线

#### 🔬 深入细节

![NVFP4 核心示意图](https://developer-blogs.nvidia.com/wp-content/uploads/2025/01/nvidia-tensorrt-llm-kv-cache-event-api-scalable-implementation.png)
*图：NVIDIA 官方技术博客图示例；NVFP4 具体资料来自 NVIDIA Blackwell inference 官方博客，核心格式用下方伪代码说明。*

```python
# NVFP4-style two-level scaling
for block in tensor.blocks(size=16):
    local_scale = quantize_e4m3(max_abs(block) / fp4_max)
    fp4_values = quantize_e2m1(block / (global_scale * local_scale))
    store(fp4_values, local_scale)
store(global_scale)

x_hat = global_scale * local_scale * dequant_e2m1(fp4_values)
```

##### 动机与背景

FP8 已经能加速许多推理，但更大模型和更长上下文继续推动 4-bit 计算。INT4 动态范围有限，普通 FP4 若没有良好缩放又会受 outlier 影响。NVFP4 试图让 4-bit 成为硬件友好的浮点推理格式。

##### 核心机制

E2M1 用 2 位指数、1 位尾数和符号位表示 FP4 值，提供比纯 INT4 更自然的动态范围。微缩放按小 block 调整数值范围，全局 scale 再校准整体尺度，降低单一 scale 对 outlier 的敏感性。

##### 训练/推理流程

量化时按小块计算 local scale，并把值映射到 E2M1；推理时 Tensor Core 使用 FP4 数据和 scale 恢复有效乘加尺度。框架层通常由 TensorRT-LLM/Transformer Engine 等管理格式转换。

##### 与传统方法的区别

SmoothQuant 是算法层 W8A8 平滑，NVFP4 是硬件格式和缩放体系。它的价值取决于 Blackwell 原生 FP4 Tensor Core 能否把低 bit 表示转化为实际吞吐。

#### 🧪 练习题

```yaml
question: "NVFP4 的数据本体格式是什么？"
options:
  - "E2M1 FP4"
  - "FP64"
  - "ASCII 字符"
  - "JPEG 像素"
answer: 0
explain: "NVFP4 使用 4-bit E2M1 浮点值，并通过双层缩放提升稳定性。"
```
