### ReRAM MLC CIM

```yaml
id: reram_mlc_cim
name: ReRAM MLC CIM
full_name: 多级ReRAM存内计算宏 (MLC ReRAM Compute-in-Memory Macro)
year: '2026'
org: ISSCC
paper_url: https://ieeexplore.ieee.org/abstract/document/11409297/
category: pim_cim
parent: rram_cim_survey
motivation: MLC ReRAM CIM支持多架构推理
```

#### 📝 一句话总结

ReRAM MLC CIM 提出了一个 22nm、96Mb 的非线性多级 ReRAM CIM 宏，面向 Mamba、Transformer 和 CNN 等不同模型提供可重构计算模式，并在 ISSCC 2026 公开材料中报告 BF16 模式 50.6-90.2TFLOPS/W 与 10 年保持条件下更低精度损失。它的核心是把 MLC ReRAM 的高密度非易失存储、非线性电导级映射和数字/模拟协同累加结合起来，提升多架构边缘推理能效。

#### 🎯 核心要点

- 采用 22nm、96Mb MLC ReRAM CIM 宏，容量远高于许多早期 kb/Mb 级 ReRAM-CIM 原型
- ISSCC 2026 Advance Program 将其列为 Paper 30.3，题名为 50.6-to-90.2TFLOPS/W Non-Linear MLC ReRAM CIM Macro
- 公开 Press Kit 描述其支持 reconfigurable compute modes，目标覆盖 Mamba、Transformer 和 CNN
- 使用非线性 MLC ReRAM 编码多级权重/数值，减少单权重需要的 cell 数量和跨阵列 bit-slicing 开销
- 高保持能力是核心卖点，公开材料称 10 年保持条件下 accuracy loss 降低 79.17%
- 报告 BF16 模式 50.6-90.2TFLOPS/W，说明其不只是 INT-only 宏，而面向更宽动态范围的 AI 推理格式
- 设计重点从单一 CNN 卷积扩展到 attention、state-space/Mamba 与卷积混合负载，强调多数据流适配

#### 🔬 深入细节

##### 核心示意图

![RRAM 混合精度 CIM 框架示意](https://ar5iv.labs.arxiv.org/html/2601.21737/assets/x1.png)
*图：公开 ar5iv 镜像中的 RRAM 混合精度训练/编译框架图，用于说明 RRAM-CIM 在有限 cell/input bit-width 下需要量化、切片和编译协同。ISSCC 2026 论文图未提供稳定公开直链，因此这里使用同年度公开 RRAM-CIM 机制图作为补充。*

##### 算法伪代码

```python
# 非线性 MLC ReRAM CIM 中一次 BF16/INT 混合精度矩阵乘的抽象流程
def mlc_reram_cim_layer(x, weights, mode):
    # mode 可对应 CNN 卷积、Transformer GEMM/attention projection、Mamba selective scan projection 等。
    fmt = select_compute_format(mode)       # e.g. INT, BF16-like block format
    x_tiles = activation_quantize_and_slice(x, fmt)
    mapped = nonlinear_mlc_weight_map(weights, fmt)

    outputs = []
    for tile in schedule_tiles(x_tiles, mapped, mode):
        analog_psum = 0
        for cell_plane in tile.mlc_planes:
            # 非线性 MLC level 不是理想等间距，需要查表或校准系数补偿。
            v_rows = encode_input_bits(tile.x_bits)
            i_cols = reram_crossbar_read(cell_plane.G_level, v_rows)
            analog_psum += adc_with_level_calibration(i_cols, cell_plane.level_lut)

        y_tile = digital_shift_add(analog_psum, tile.exponent_or_bit_position)
        outputs.append(apply_retention_compensation(y_tile, mapped.retention_model))

    return assemble_tiles(outputs, mode.output_shape)
```

##### 方法机制解读

MLC ReRAM 的直接收益是密度。若每个 cell 只能表示 1 bit，8-bit 权重需要多个 cell plane 和多次读取；MLC cell 可以用多个稳定电导级表示更多信息，从而减少阵列面积、读周期和数字移位累加压力。理想情况下，一个 \(L\)-level cell 可表示 \(\log_2 L\) bit，权重切片次数从 \(B_w\) 降到约 \(B_w/\log_2 L\)：

$$
N_{\text{read}} \propto \left\lceil \frac{B_w}{\log_2 L} \right\rceil \cdot B_x
$$

但 MLC ReRAM 的难点是电导级常常非线性、非等距，并且会随时间漂移。题名中特意写出 Non-Linear MLC，说明设计不是假设 cell level 完美均匀，而是把非线性作为映射对象处理。权重 \(w\) 不一定直接映射到线性 level \(k\)，而是选择最接近目标权重贡献的电导组合：

$$
k^*=\arg\min_k \left|w-\alpha(G_k-G_{\text{ref}})\right|
$$

其中 \(G_k\) 是第 \(k\) 个 MLC 电导级，\(\alpha\) 是阵列到数字输出的标定比例。通过 level-aware mapping、查表校准和数字残差补偿，可以把器件非线性转化为可管理的量化误差。

“High-Retention”是这类宏能否实用的分水岭。边缘设备希望模型写入后长期保持，不希望频繁刷新或重新写验证；但 ReRAM 电导会受时间、温度和读扰动影响。若保持漂移 \(\Delta G(t)\) 直接进入点积，输出误差近似为：

$$
\Delta y_j(t)=\sum_i x_i \Delta G_{i,j}(t)
$$

因此宏级设计需要同时做器件级稳定窗口、写入 verify、保守 level 间隔、漂移感知量化和推理时补偿。公开 Press Kit 中提到 10 年保持条件下 accuracy loss 降低 79.17%，说明该设计把长期保持作为架构指标，而不是只报告刚写入后的峰值能效。

支持 Mamba、Transformer、CNN 的意义在于数据流可重构。CNN 主要需要局部卷积和权重复用；Transformer 需要大 GEMM、QKV 投影和 attention 前后线性层；Mamba/SSM 类模型则包含输入投影、状态更新和逐 token scan，其访存和矩阵形状与标准 CNN 不同。一个固定卷积数据流的 CIM 宏难以高效覆盖这些负载，因此该设计强调 reconfigurable compute modes，让阵列切分、输入广播、部分和归并和输出重排能按模型类型调整。

BF16 能效指标也值得注意。BF16 的指数位保留了较宽动态范围，适合精度敏感层，但在 CIM 中实现通常需要指数对齐、尾数乘加或分块缩放。合理的做法不是在阵列里完整模拟浮点乘法，而是把 mantissa/块缩放映射为多次定点 CIM 读，把 exponent/scale 放到数字域处理。这解释了为什么输出单位是 TFLOPS/W，同时仍然离不开数字移位、scale 和校准逻辑。

> ⚠️ 注意：MLC ReRAM 的高密度不是免费收益；如果 level 漂移、非线性和 ADC 分辨率导致重读/重写/校准开销过高，系统级能效会明显低于阵列级估计。

#### 🧪 练习题

```yaml
question: "MLC ReRAM CIM 相比 SLC ReRAM CIM 的主要优势和额外挑战是什么？"
options:
  - "优势是每个 cell 可承载更多权重信息；挑战是多级电导非线性、漂移和保持误差更难校准"
  - "优势是完全不需要 ADC；挑战是无法存储权重"
  - "优势是只能运行 CNN；挑战是不能表示正权重"
  - "优势是所有电导级天然等间距且永不漂移；挑战是面积变大"
answer: 0
explain: "MLC 提高密度并减少 bit-slicing，但多级电导的非线性、随机写入和长期保持漂移会放大点积误差，需要映射、verify 和补偿机制。"
```
