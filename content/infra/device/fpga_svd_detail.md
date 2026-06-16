### SVD-FPGA

```yaml
id: fpga_svd
name: SVD-FPGA
full_name: SVD压缩FPGA加速 (SVD-based FPGA Acceleration)
year: '2016'
org: Tsinghua
paper_url: —
category: fpga
parent: —
motivation: 基于SVD压缩的FPGA定制化量化推理
```

#### 📝 一句话总结

SVD-FPGA 对应清华 FPGA 2016 的 VGG16-SVD 嵌入式 FPGA 加速思路：用 SVD 压缩全连接层权重、动态定点量化降低数据位宽，并设计统一卷积/全连接计算引擎解决大 CNN 在嵌入式 FPGA 上的计算和带宽瓶颈。

#### 🎯 核心要点

- 面向完整 CNN 推理：不仅加速 CONV 层，也覆盖 FC、pooling、非线性和最终分类流程
- 复杂度分析：CONV 层计算密集，FC 层参数和带宽密集，二者需要不同优化策略
- SVD 压缩 FC 层：将大权重矩阵低秩分解为两个较小矩阵，减少全连接层存储与 DDR 读取
- 动态精度量化：为不同层/特征图选择定点小数位，降低位宽同时控制 VGG16/VGG16-SVD 精度损失
- 统一 PE/Convolver：用同一卷积器结构支持 CONV 和 FC 的乘累加，减少额外硬件
- 数据布局优化：为 CONV/FC 分别重排外部存储，增加 DMA burst 长度，提高 DDR 带宽利用率
- 公开结果：VGG16-SVD 在 Xilinx Zynq ZC706 上端到端运行，报道结果为 4.45 fps、Top-5 86.66%，16-bit 量化下全网络约 137 GOP/s

#### 🔬 深入细节

##### 核心架构图

![SVD-FPGA PE 结构](https://i-blog.csdnimg.cn/blog_migrate/6d25fd82d8817b25c048663af2c289da.png)
*图：公开论文笔记中转载的 FPGA 2016 论文 PE 结构图。PE 包含 Convolver Complex、Adder Tree、Non-Linearity、Pooling、Bias Shift 和 Data Shift，体现了用统一数据通路支持卷积、全连接和动态量化后处理的设计。*

![VGG 系列层计算量与权重分布](https://i-blog.csdnimg.cn/blog_migrate/4005aa045027cc1828e89e1112109716.png)
*图：公开论文笔记中转载的复杂度分析图。上图显示卷积层主导 GOP，下图显示 FC6 等全连接层主导权重数量，这正是 SVD 压缩 FC 层的动机。*

##### 算法伪代码

```python
# SVD 压缩 + 动态定点量化 + FPGA 映射伪代码
model = load_trained_vgg16()

# 1. 对全连接层做低秩分解
for layer in model.fc_layers:
    W = layer.weight_matrix                  # shape: [out_dim, in_dim]
    U, S, Vt = svd(W)
    r = choose_rank(U, S, Vt, accuracy_budget)
    layer.replace_with_two_fc(
        W1=diag(S[:r]) @ Vt[:r, :],          # in_dim -> r
        W2=U[:, :r],                         # r -> out_dim
    )

# 2. 为每层搜索定点格式
for layer in model.layers:
    candidates = []
    for fl in possible_fractional_lengths(layer):
        q_weight = fixed_point(layer.weight, word_bits=16, frac_bits=fl.weight)
        q_act = simulate_activation_quant(layer, frac_bits=fl.activation)
        candidates.append((fl, validation_error(q_weight, q_act)))
    layer.quant_config = min(candidates, key=lambda x: x[1])[0]

# 3. 生成 FPGA 数据布局与指令
for layer in model.layers:
    tiles = tile_layer(layer, Tr, Tc, Ti, To)
    arrange_ddr_for_long_burst(tiles, layer.type)
    emit_instruction(layer, tiles, layer.quant_config)

run_on_fpga(pe_array, dma_engine, instruction_stream)
```

##### 方法机制解读

这项工作的起点是嵌入式 FPGA 无法直接容纳完整 VGG16。VGG16 的卷积层承担大部分计算，但全连接层拥有大量权重，外部 DDR 读取会成为端到端延迟和能耗瓶颈。对卷积层，最重要的是让 PE 阵列持续工作；对 FC 层，最重要的是减少权重矩阵大小并提高 burst 读取效率。因此论文把优化分成两条线：CONV 用并行卷积器和 tiling 提高计算吞吐，FC 用 SVD 与数据重排降低带宽压力。

SVD 压缩基于低秩近似。给定全连接层：

$$
y = W x + b,\quad W\in \mathbb{R}^{m\times n}
$$

对 \(W\) 做奇异值分解：

$$
W = U\Sigma V^T
$$

只保留前 \(r\) 个奇异值，可得到近似：

$$
W \approx U_r\Sigma_r V_r^T
$$

原本一次 \(m\times n\) 矩阵向量乘变成两次较小矩阵向量乘：

$$
z = \Sigma_r V_r^T x,\quad y = U_r z + b
$$

参数量从 \(mn\) 降为 \(r(m+n)\)。当 \(r \ll \min(m,n)\) 时，FC 层权重读取和乘加量都会显著下降。公开解读中提到该方法可使 FC 权重内存占用大幅减少，从而让 VGG16-SVD 更适合嵌入式 FPGA 端到端部署。

动态定点量化解决的是“低位宽但不明显掉精度”的问题。固定点数可写为：

$$
\hat{x}=\mathrm{clip}\left(\mathrm{round}(x\cdot 2^{FL}), -2^{WL-1}, 2^{WL-1}-1\right)
$$

其中 \(WL\) 是总位宽，\(FL\) 是小数位。若 \(FL\) 太小，小数精度不足；若 \(FL\) 太大，整数范围不足，容易溢出。论文的动态精度流程会按层分析权重和激活范围，为不同层选择合适的 \(FL\)，并在 PE 中用 Bias Shift 与 Data Shift 对偏置和输出做对应移位。这样硬件仍使用规整的定点乘加，软件/编译阶段负责每层的缩放配置。

PE 设计体现了“统一计算引擎”的取舍。Convolver Complex 通过 line buffer 和窗口选择器高效处理卷积；在 FC 层中，矩阵向量乘也能被映射到同一乘加阵列，只是输入/权重的数据供给和复用模式不同。这样做避免为 FC 单独放置大规模矩阵乘硬件，但 FC 的利用率会更受带宽限制，因此论文进一步为 FC 权重设计特殊外部存储布局，尽量把短小离散访问合并成长 burst。

从端到端系统看，CPU/PS 负责准备图像、模型参数、DMA buffer descriptor 和控制指令，FPGA/PL 负责执行计算密集部分。DMA 将输入 Tile、权重 Tile 和指令送入片上 buffer，控制器解码指令后驱动 PE、池化、非线性和移位模块。该设计与只报告卷积层 GOP/s 的早期 FPGA-CNN 工作不同，它强调完整 VGG16-SVD 网络在真实板卡上的端到端吞吐，因此 FC 层压缩和数据布局优化与卷积 PE 同等重要。

> 💡 关键：SVD-FPGA 的核心不是单独使用 SVD，而是把低秩压缩、逐层定点量化、统一 PE 和 DDR 数据布局一起做成可落地的端到端推理系统。

#### 🧪 练习题

```yaml
question: "SVD-FPGA 中对全连接层做 SVD 低秩分解的主要目的是什么？"
options:
  - "增加全连接层参数量以提升过拟合能力"
  - "把一个大权重矩阵近似成两个小矩阵，降低 FC 层存储和带宽压力"
  - "将所有卷积核替换为 FFT 频域卷积"
  - "让 FPGA 只运行 Softmax，其他层交给 CPU"
answer: 1
explain: "全连接层权重矩阵通常很大，SVD 保留主要奇异值后可用两个低秩矩阵近似原矩阵，使参数量从 mn 降到 r(m+n)，显著减少外部内存访问。"
```
