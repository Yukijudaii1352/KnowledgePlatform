### Intel 18A CIM

```yaml
id: intel_18a_cim
name: Intel 18A CIM
full_name: Intel 18A数字存内计算加速器 (Intel 18A Digital CIM Accelerator)
year: '2026'
org: Intel
paper_url: https://ieeexplore.ieee.org/abstract/document/11409207/
category: pim_cim
parent: rram_cim_survey
motivation: 18A工艺147TOPS/W数字CIM加速器
```

#### 📝 一句话总结

Intel 18A CIM 提出了一个在 Intel 18A 工艺上实现的全可综合数字存内计算加速器，支持 INT8×INT8 与 zero-point quantization，在 ISSCC 2026 公开指标中达到 147TOPS/W、250TOPS/mm²，并以标准数字设计流程降低 CIM 宏从研究原型走向先进节点集成的门槛。

#### 🎯 核心要点

- 采用 fully synthesizable digital CIM 路线，避免模拟 CIM 对定制 bitcell、ADC 和工艺敏感校准的强依赖
- 支持 INT8×INT8 点积，并显式支持 zero-point quantization，适配常见非对称量化模型
- ISSCC 2026 Advance Program/Press Kit 披露其在 Intel 18A 技术上实现 147TOPS/W 与 250TOPS/mm²
- 公开材料给出的运行点包含 2.62GHz、25°C 条件，强调先进节点下的高频数字可实现性
- 使用数字位线/近存逻辑完成局部乘加，把 SRAM/寄存器阵列附近的数据复用转化为低搬移能耗
- 相比 RRAM/模拟 CIM，核心取舍是牺牲部分阵列级模拟密度，换取可验证、可综合、可迁移和量化友好的实现
- 对 Transformer/CNN 常见 INT8 推理有直接意义，因为 zero-point 修正避免了非对称量化在硬件中退化为额外大规模乘法

#### 🔬 深入细节

##### 核心示意图

![Intel 18A 芯片公开图](https://newsroom.intel.com/wp-content/uploads/2026/05/18A-Full-Chip-22-Angle-Flat-1920x1080-1.jpg)
*图：Intel Newsroom 公开的 18A 芯片静态图。IEEE 论文页面未提供可公开嵌入的架构图直链，因此这里使用 Intel 官方 18A 相关芯片图作为工艺背景；下文的 CIM 数据流根据 ISSCC 2026 题名、摘要条目和公开指标整理。*

##### 算法伪代码

```python
# INT8×INT8 zero-point digital CIM 点积的核心逻辑
def digital_cim_int8_dot(a_u8, w_u8, zp_a, zp_w, scale_a, scale_w, scale_y):
    # a_u8 与 w_u8 是量化后的激活和权重，zp_* 是非对称量化零点。
    # 数字 CIM 宏通常在存储阵列附近并行产生局部乘积/部分和。
    raw_sum = 0
    sum_a = 0
    sum_w = 0

    for tile in tiles(a_u8, w_u8):
        pp = cim_local_multiply_accumulate(tile.a, tile.w)
        raw_sum += pp                    # Σ a_q * w_q
        sum_a += local_sum(tile.a)        # Σ a_q
        sum_w += local_sum(tile.w)        # Σ w_q

    n = len(a_u8)
    corrected = raw_sum - zp_w * sum_a - zp_a * sum_w + n * zp_a * zp_w
    y_float = corrected * scale_a * scale_w
    return requantize(y_float, scale_y)
```

##### 方法机制解读

这个工作的关键词是“digital CIM”和“fully synthesizable”。传统 SRAM-CIM 往往修改 6T/8T bitcell 或使用模拟位线电荷共享，能效很高但对工艺、电压、版图和 sense margin 很敏感；Intel 18A CIM 则更接近标准数字宏：在存储阵列附近布置可综合乘加逻辑，让 EDA flow、时序收敛、DFT、形式验证和先进节点迁移尽量沿用数字 SoC 方法。对工业团队来说，这个工程属性和 TOPS/W 一样重要。

INT8 非对称量化是该论文题名中最值得关注的算法接口。常见量化把实数表示为：

$$
x \approx s_x(q_x-z_x), \quad w \approx s_w(q_w-z_w)
$$

因此点积不是简单的 \(\sum q_xq_w\)，而是：

$$
\sum_i x_iw_i \approx s_xs_w\left(\sum_i q_{x,i}q_{w,i}-z_w\sum_iq_{x,i}-z_x\sum_iq_{w,i}+nz_xz_w\right)
$$

如果硬件只支持对称量化，就需要模型侧牺牲精度或软件插入额外修正；Intel 18A CIM 把 zero-point 项纳入加速器数据通路，意味着局部 CIM 只需高吞吐产生 raw dot-product，同时配套行/列求和和常数修正即可得到非对称量化结果。

全数字 CIM 的能效来自局部性，而不是模拟物理乘法。权重或激活在近存阵列中被重复使用，局部 MAC tree/bit-serial datapath 直接在阵列边缘累加，减少宽向量在 SRAM、寄存器文件和全局互连之间的往返。与普通 systolic array 相比，它把一部分乘加贴近存储，降低每次访问的线长和开关电容；与 RRAM-CIM 相比，它不需要把电导精确映射为权重，也不需要高分辨率 ADC。

147TOPS/W 与 250TOPS/mm² 的公开指标说明 18A 节点给数字 CIM 带来了两个收益：更高晶体管密度提升面积效率，更高频率和低电压运行空间提升能效。ISSCC Press Kit 中还提到该类 18A digital-CIM 运行在 2.62GHz、25°C 条件下，这表明设计目标不是低速近阈值实验宏，而是可在先进 CMOS 中以高频闭合时序的推理加速单元。

局限也很明确。数字 CIM 没有 RRAM 交叉阵列那种“一个电导就是一个乘法器”的密度优势，存储密度仍受 SRAM/触发器/局部逻辑约束；同时 INT8 支持并不自动覆盖 BF16、FP8 或稀疏动态数据流。因此它更适合作为先进节点 SoC 中可规模化复制的 INT8 推理 tile，而不是替代所有 AI 数值格式的通用阵列。

> 💡 关键：Intel 18A CIM 的价值在于把 CIM 从“高能效但难量产验证的定制宏”推进到“可综合、可验证、可迁移的先进节点数字加速器”。

#### 🧪 练习题

```yaml
question: "Intel 18A 数字 CIM 支持 zero-point quantization 的主要硬件意义是什么？"
options:
  - "完全取消所有乘加运算"
  - "让非对称 INT8 量化的零点修正可在 CIM 数据通路中完成，避免额外软件/外围修正成为瓶颈"
  - "把 INT8 权重改写为模拟 RRAM 电导"
  - "只支持二值神经网络"
answer: 1
explain: "非对称量化点积包含 raw sum、输入和、权重和以及常数项；硬件支持 zero-point 后，INT8 模型可以更直接映射到 CIM 宏。"
```
