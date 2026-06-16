### FPGA-CNN综述

```yaml
id: fpga_cnn_survey
name: FPGA-CNN综述
full_name: FPGA加速CNN综述 (FPGA-based CNN Acceleration Survey)
year: '2017'
org: NUDT
paper_url: —
category: fpga
parent: —
motivation: 系统总结FPGA在CNN加速中的关键优化技术
```

#### 📝 一句话总结

FPGA-CNN 综述系统总结了 CNN 推理在 FPGA 上的算法压缩、低精度量化、循环展开/流水、片上缓存和数据流调度方法，核心目标是在有限 DSP、BRAM 和外部带宽下获得高吞吐与高能效。

#### 🎯 核心要点

- CNN 计算热点：CONV 层主导乘累加计算量，FC 层和大模型参数主导存储与带宽压力
- FPGA 设计优势：可定制数据通路、低精度算术、片上 SRAM 显式管理和深流水结构
- 性能模型：吞吐由峰值并行度、工作频率、资源利用率和存储供给共同决定
- 模型压缩：定点量化、二值/三值网络、剪枝稀疏化和低秩分解降低计算与访存
- 计算结构：PE 阵列、加法树、滑动窗口 line buffer、脉动/数据流架构用于提高数据复用
- 存储优化：tiling、double buffering、BRAM 分区、权重/激活重排和长 burst 访问降低 DDR 瓶颈
- 自动化工具流：从 Caffe/TensorFlow/中间表示到 HLS/RTL 的编译映射和设计空间搜索

#### 🔬 深入细节

##### 综述图与系统抽象

![FPGA 神经网络加速器典型结构](https://ar5iv.labs.arxiv.org/html/1712.08934/assets/x2.png)
*图：公开 ar5iv 镜像中的 FPGA 神经网络加速器典型结构。给定条目没有论文 URL，因此这里采用同时期公开综述图作为框架图；NUDT 综述也从通用芯片、专用加速器、计算结构、存储结构和数据流角度总结神经网络硬件加速。*

![CNN 加速中的运算与参数分布](https://ar5iv.labs.arxiv.org/html/1712.08934/assets/x1.png)
*图：CONV 与 FC 层在典型网络中的计算/参数占比。CONV 通常贡献绝大部分运算，FC 往往贡献大量权重，因此 FPGA-CNN 加速必须同时处理计算并行和存储带宽。*

##### 设计空间搜索伪代码

```python
# FPGA-CNN 加速器设计空间搜索伪代码
best = None

for bit_w in [16, 8, 4, 2, 1]:
    model_q = quantize_model(model, weight_bits=bit_w, act_bits=bit_w)
    if accuracy_drop(model_q, calib_set) > max_drop:
        continue

    for tile in candidate_tiles(model_q):          # Tr, Tc, Ti, To
        for parallel in candidate_parallelism():   # PE_num, SIMD, unroll factors
            resource = estimate_resource(tile, parallel, bit_w)
            if resource.DSP > fpga.DSP or resource.BRAM > fpga.BRAM:
                continue

            bw = estimate_ddr_bandwidth(tile, parallel, model_q)
            if bw > fpga.ddr_bandwidth:
                continue

            latency = estimate_latency(model_q, tile, parallel, bw)
            energy = estimate_energy(model_q, tile, parallel, bw)
            score = throughput(model_q, latency) / energy

            if best is None or score > best.score:
                best = Design(bit_w, tile, parallel, latency, energy, score)

emit_hls_or_rtl(best)
generate_weight_layout(best)
generate_runtime_instructions(best)
```

##### 方法机制解读

CNN 在 FPGA 上的基本矛盾是“可用并行度很高，但片上资源和外部带宽有限”。标准卷积层的乘加量可写为：

$$
Ops_{\mathrm{conv}}=H_o W_o C_o C_i K_h K_w
$$

如果直接逐元素从 DDR 读取输入、权重和输出，计算阵列会被访存拖住。因此 FPGA 设计通常把输入特征图、权重块和输出部分和切成 Tile，在 BRAM 中复用。常见分块参数为 \((T_r,T_c,T_i,T_o)\)，分别对应输出空间、输入通道和输出通道的并行/缓存范围。合理的 tiling 会让一次读入的输入窗口服务多个输出通道，一次读入的权重服务多个输出像素。

性能模型可以从峰值并行度与利用率理解。若 PE 数为 \(N_{PE}\)，每个 PE 每周期执行 \(M\) 个 MAC，频率为 \(f\)，平均利用率为 \(U\)，则运行时吞吐近似为：

$$
P_{\mathrm{run}}=2\cdot f\cdot N_{PE}\cdot M\cdot U
$$

其中系数 2 表示一次 MAC 计为一次乘法和一次加法。提高 \(N_{PE}\) 需要更多 DSP/LUT，提高 \(M\) 往往依赖低精度乘法或 bit-serial 结构，提高 \(U\) 则依赖调度与存储系统。很多设计峰值很高但 \(U\) 不足，是因为 DMA、BRAM bank 冲突或层间同步让 PE 阵列等待。

量化是 FPGA-CNN 最直接的软硬协同手段。把 FP32 权重/激活改成 INT16、INT8、INT4 甚至二值，可以同时降低三类成本：乘法器面积、BRAM/DDR 带宽、片上互连宽度。线性定点量化通常表示为：

$$
x_q=\mathrm{clip}\left(\mathrm{round}\left(\frac{x}{s}\right)+z,\ q_{\min},q_{\max}\right)
$$

其中 \(s\) 是 scale，\(z\) 是 zero point 或定点偏移。对于早期 FPGA 论文，常见做法是逐层选择 fractional length，让每层动态范围尽量覆盖激活分布；对精度敏感层保留更高 bit，对中间层压低 bit。二值网络进一步把乘法替换为 XNOR-popcount，但通常需要专门训练以补偿精度损失。

存储系统通常比计算阵列更决定上限。NUDT 综述强调神经网络加速器需要从存储结构和数据流角度减少数据搬移；在 FPGA 上这具体表现为 line buffer、input/output buffer、weight buffer、double buffering 和外部数据布局重排。一次高效的卷积流水会让 DMA 读取下一块数据的同时，PE 阵列计算当前块，输出部分和保存在 BRAM 或 accumulator 中，避免每个中间值频繁写回 DDR。

与 GPU 相比，FPGA 的频率较低、开发成本更高，但它能把数据类型、缓冲深度、并行因子和控制逻辑定制到目标网络；与 ASIC 相比，FPGA 能快速跟随 CNN 结构变化，但能效和面积效率仍受可重构逻辑开销限制。因此 FPGA-CNN 综述的核心结论不是“固定一种最佳架构”，而是把优化空间拆成模型压缩、算子映射、PE 数据流、存储布局和自动化编译五个层次，并用约束搜索找到某个网络和板卡上的平衡点。

> 💡 关键：FPGA-CNN 加速的难点不只是“多放 PE”，而是让 PE、BRAM、DDR burst、量化精度和网络分块同时匹配。

#### 🧪 练习题

```yaml
question: "在 FPGA-CNN 加速器中，tiling 和片上缓存的主要作用是什么？"
options:
  - "增加模型参数量以提高准确率"
  - "把卷积全部转换成 CPU 串行执行"
  - "提高输入、权重和部分和的数据复用，降低 DDR 带宽压力"
  - "强制所有层使用 FP64 浮点数"
answer: 2
explain: "FPGA 的外部带宽有限，tiling 将特征图和权重分块放入 BRAM，使同一数据被多个 PE 或多个输出位置复用，从而提高吞吐和能效。"
```
