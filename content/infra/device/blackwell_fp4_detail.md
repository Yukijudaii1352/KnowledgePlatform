### Blackwell FP4

```yaml
id: blackwell_fp4
name: Blackwell FP4
full_name: Blackwell FP4架构 (Blackwell FP4 Architecture)
year: '2025'
org: NVIDIA
paper_url: https://arxiv.org/abs/2507.10789
category: gpu_architecture
parent: hopper_fp8
motivation: FP4精度与专用解压引擎优化万亿参数模型
```

#### 📝 一句话总结

Blackwell FP4 的核心贡献是把 Tensor Core 的低精度路径从 Hopper 的 FP8 扩展到 FP4/FP6，并用微块缩放、专用矩阵指令与软件栈协同降低大模型推理和训练的显存/带宽压力。它解决的不是“简单把数值截成 4 bit”，而是在 4 bit 表示能力极弱的条件下，让缩放、反量化、矩阵乘和高精度累加在硬件路径中形成可用闭环。

#### 🎯 核心要点

- arXiv 论文《Dissecting the NVIDIA Blackwell Architecture with Microbenchmarks》用 RTX 5080 的 GB203 与 Hopper H100 PCIe 的 GH100 做微架构对比，覆盖 SM 执行单元、缓存、Tensor Core、功耗和 Transformer 推理案例
- Blackwell 第五代 Tensor Core 新增 FP4、FP6、FP8 等低精度 MMA 数据路径；论文观测到 CUDA/PTX 低精度矩阵指令会落到 QMMA/OMMA 等 SASS 指令
- FP4 的常用 E2M1 只有符号位、2 位指数和 1 位尾数，必须配合 micro-block scaling 才能覆盖 Transformer 权重和激活的局部动态范围
- NVFP4 相比 MXFP4 使用更细粒度的 16 元素块和 FP8 E4M3 scale，并可叠加 per-tensor FP32 scale，核心重构关系为 \(x \approx q_{E2M1}\times s_{block}\times s_{tensor}\)
- 论文实测显示 Blackwell 在低精度 Tensor Core 路径上更偏向高 ILP、少 warp 也能保持较好调度效率，而 Hopper 依赖更深的并发和缓冲来填满执行单元
- NVIDIA 官方 Blackwell 文档中的 Decompression Engine 主要服务 LZ4/Snappy/Deflate 等数据分析压缩格式；FP4 权重的解包/缩放更准确地理解为 Tensor Core/Transformer Engine 低精度数据路径的一部分
- 对万亿参数模型，FP4 的实际收益来自“容量、带宽、算力密度”三者同时下降成本：权重和部分中间张量更小，HBM 读写更少，Tensor Core 每周期可完成更多低精度乘加

#### 🔬 深入细节

##### 核心示意图

![Blackwell 与 Hopper 低精度 Tensor Core 吞吐对比](https://arxiv.org/html/2507.10789v2/extracted/6641483/Content/images/blackwellXhopper_throughput_avg.png)
*图：arXiv 2507.10789v2 Figure 4，展示 GB203 与 GH100 在不同低精度格式和 warp 数下的 Tensor Core 吞吐。来源为 arXiv HTML 图片直链。*

##### 算法伪代码

```python
# NVFP4 / Blackwell Tensor Core 推理路径的简化逻辑
def quantize_nvfp4(tensor, block_size=16):
    q_blocks, scales = [], []
    s_tensor = choose_global_fp32_scale(tensor)
    normalized = tensor / s_tensor

    for block in split_consecutive(normalized, block_size):
        # FP8 E4M3 scale 比 MXFP4 的 E8M0 scale 更能贴合局部分布
        s_block = choose_fp8_e4m3_scale(block)
        q = round_to_e2m1_fp4(block / s_block, stochastic=False)
        q_blocks.append(pack_4bit(q))
        scales.append(s_block)

    return q_blocks, scales, s_tensor

def blackwell_fp4_matmul(a_fp4, b_fp4, sa, sb, sga, sgb):
    acc = zeros(dtype="fp32")
    for k_block in reduction_blocks(a_fp4, b_fp4):
        # 解包、局部 scale 应用和 MMA 贴近 Tensor Core 输入路径完成
        a = unpack_e2m1(a_fp4[k_block]) * sa[k_block] * sga
        b = unpack_e2m1(b_fp4[k_block]) * sb[k_block] * sgb
        acc += tensor_core_mma(a, b, accumulate="fp32")
    return cast_for_next_layer(acc, dtype="bf16/fp8")
```

FP4 的难点首先是数值格式本身。以 E2M1 为例，4 bit 需要同时编码符号、指数和尾数，可表达的离散值很少，直接把 FP16/BF16 权重量化为 FP4 会让离群通道被截断，注意力层和 MLP 层的误差会快速累积。因此 Blackwell FP4 不是单一格式，而是“低比特值 + 缩放元数据 + 高精度累加”的组合；其基本重构可写成：

$$
x \approx q_{E2M1}\cdot s_{block}\cdot s_{tensor},\qquad q_{E2M1}\in[-6,6]
$$

NVFP4 的关键是把缩放粒度做小。MXFP4 通常为 32 个值共享一个粗粒度 scale，而 NVFP4 使用 16 个值共享一个 FP8 E4M3 scale，使每个微块都能贴合局部最大值和分布形状。块越小，量化误差越低，但 scale 元数据、加载对齐和反量化逻辑越复杂；Blackwell 的价值就在于让这些操作由 Tensor Core 相关数据路径吸收，而不是把开销外溢到普通 CUDA core。

从矩阵乘角度看，低精度收益只有在 reduction 维度连续、scale 加载可复用、MMA tile 与 packed FP4 布局匹配时才能兑现。论文在 PTX 层用 `mma.sync.aligned.kind::f8f6f4` 这类指令族测试 E2M1、E3M2、E2M3、E4M3、E5M2 等格式，并观察生成的 SASS 指令。这个结果说明 Blackwell 的 FP4 支持不是库层面的模拟，而是已经进入第五代 Tensor Core 指令映射，只是软件栈在不同格式和 block scaling 组合上仍有演进空间。

论文的吞吐/延迟图还揭示了调度层面的差异：GB203 在低精度 Tensor Core 测试中可用更高的指令级并行度弥补较少 warp 的并发，表现为吞吐随 ILP 提升更平滑；GH100 则更依赖大量活跃 warp 和更深的缓冲来隐藏延迟。这对 kernel 作者很重要：Blackwell FP4 kernel 不应只照搬 Hopper FP8 的 tile 和流水配置，而要同时调优 packed 数据布局、shared memory staging、scale 预取和独立 MMA 指令数量。

对 LLM 推理来说，FP4 主要缓解 decode 阶段的内存墙。一个近似性能模型是：

$$
T_{token}\approx \max\left(\frac{F_{layer}}{P_{TC,FP4}},\frac{B_{weights}+B_{kv}+B_{scale}}{BW_{HBM}}\right)
$$

当 batch 较小、每 token 需要读取大量权重时，第二项通常主导；FP4 把权重字节数降到 FP16 的四分之一、FP8 的二分之一，但会额外引入 scale 元数据和解包路径。Blackwell 的微缩放 Tensor Core、Transformer Engine、TensorRT-LLM/NeMo 支持，目标就是让减少的 HBM 流量大于新增的 scale 与转换成本，从而提升吞吐和能效。

> 💡 关键：`motivation` 中的“专用解压引擎”需要区分两类含义。Blackwell 官方 Decompression Engine 是面向数据库/数据分析压缩格式的硬件模块；FP4 模型权重的“解压”更准确是 packed FP4 解包、scale 应用和 Tensor Core MMA 输入转换。二者都在减少数据移动成本，但服务对象和数据路径不同。

资料来源：arXiv 论文 https://arxiv.org/abs/2507.10789；NVIDIA Blackwell 架构页面 https://www.nvidia.com/en-us/data-center/technologies/blackwell-architecture/；NVIDIA NVFP4 技术博客 https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/；Transformer Engine 文档 https://docs.nvidia.com/deeplearning/transformer-engine/user-guide/examples/fp8_primer.html。

#### 🧪 练习题

```yaml
question: "Blackwell FP4/NVFP4 中 micro-block scale 的主要目的是什么？"
options:
  - "让少量 FP4 编码值匹配局部张量动态范围，降低量化误差"
  - "把所有 Tensor Core 运算改成 CPU 解压缩"
  - "完全取消 FP32/BF16 累加"
  - "只用于提升 PCIe 主机到设备拷贝速度"
answer: 0
explain: "FP4 可表达值很少，16 元素等细粒度 block scale 能把局部数值范围映射到 E2M1 网格；没有这个缩放机制，4 bit 量化误差会显著破坏模型质量。"
```
