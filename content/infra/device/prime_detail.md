### PRIME

```yaml
id: prime
name: PRIME
full_name: ReRAM存内计算架构 (Processing-in-ReRAM Architecture)
year: '2016'
org: UCSB
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001140
category: pim_cim
parent: —
motivation: ReRAM交叉阵列实现模拟矩阵乘法
```

#### 📝 一句话总结

PRIME 提出了在 ReRAM 主存内部直接执行神经网络矩阵向量乘的 PIM 架构，把一部分 ReRAM subarray 设计成可在“普通存储”和“NN 计算”之间切换的 Full Function subarray。它通过复用存储外围电路作为 DAC/ADC、正负权重双阵列和输入/权重组合方案，在较低面积开销下减少 CPU 与主存之间的大规模权重搬运。

#### 🎯 核心要点

- 将 ReRAM bank 划分为 Mem subarray、Buffer subarray 和 Full Function subarray 三类区域
- FF subarray 可在 memory mode 和 computation mode 间 morph，既能存储数据，也能执行 NN dot product
- 用 ReRAM crossbar 的欧姆定律与基尔霍夫电流汇聚实现模拟矩阵向量乘
- 修改 wordline driver、column multiplexer、sense amplifier 和 buffer connection，尽量复用原有存储外围电路
- 正权重和负权重分别存入两组 crossbar，column multiplexer 中的模拟减法器合成有符号结果
- 采用可重构 SA、ReLU 单元、sigmoid 单元和 4:1 max-pooling 单元支持 MLP/CNN 基本层
- 通过两个 3-bit 输入组合 6-bit 输入、两个 4-bit ReRAM cell 组合 8-bit 权重，缓解 ReRAM 精度不足
- 提供 Map_Topology、Program_Weight、Config_Datapath、Run、Post_Proc 等软件/硬件接口，并在编译期优化 NN 映射

#### 🔬 深入细节

##### 核心示意图

![PRIME 架构总览](https://mdpi-res.com/make/make-04-00004/article_deploy/html/images/make-04-00004-g019-550.jpg)
*图：MDPI 综述中转载并标注的 PRIME 架构总览，来源说明为 adapted from PRIME ISCA 2016 论文；图中展示 Mem/FF/Buffer subarray、ReRAM crossbar、WDD、column mux、SA、connection 和 controller。*

##### 算法伪代码

```python
# PRIME: 将一个神经网络层映射到 ReRAM FF subarray 并执行
def run_prime_layer(layer, input_addr, output_addr):
    mats = compiler.map_topology(layer.weights, target="FF_subarrays")
    controller.issue("prog/comp/mem", mats, mode="program")
    controller.program_weight(mats.positive, positive(layer.weights))
    controller.program_weight(mats.negative, negative(layer.weights))

    controller.issue("prog/comp/mem", mats, mode="compute")
    controller.issue("input_source", mats, source="buffer")

    for tile in stream_input_tiles(input_addr):
        controller.issue("fetch", mem_addr=tile, buf_addr="buffer")
        controller.issue("load", buf_addr="buffer", ff_addr=mats.inputs)

        i_pos = reram_crossbar_mvm(voltage=tile, conductance=mats.positive)
        i_neg = reram_crossbar_mvm(voltage=tile, conductance=mats.negative)
        analog = sigmoid_or_bypass(i_pos - i_neg)
        digital = sense_amplifier_convert(analog, precision_bits=layer.output_bits)

        controller.issue("store", ff_addr=digital, buf_addr="buffer")
        controller.issue("commit", buf_addr="buffer", mem_addr=output_addr)

    controller.issue("prog/comp/mem", mats, mode="memory")
```

##### 方法机制解读

PRIME 要解决的是神经网络加速中的双重数据搬运问题：传统协处理器需要从主存读取输入和大量 synaptic weights，再把输出写回主存；即使专用 NPU 有本地 SRAM/eDRAM，主存到处理器的数据移动仍然很昂贵。PRIME 反过来让“主存阵列本身”承担计算。ReRAM crossbar 原本就是二维电阻阵列，给 wordline 施加输入电压后，每个 cell 的电导表示权重，bitline 端汇聚出的电流自然等于一列权重与输入向量的点积。

其基本模拟计算可写成：

$$
I_j = \sum_i V_i G_{i,j}
$$

其中 \(V_i\) 是第 \(i\) 条 wordline 的输入电压，\(G_{i,j}\) 是 ReRAM cell 的电导，\(I_j\) 是第 \(j\) 条 bitline 的输出电流。若把输入 \(a_i\) 映射到电压、权重 \(w_{i,j}\) 映射到电导，ReRAM crossbar 就在一次阵列读操作中完成多个神经元的 matrix-vector multiplication。后续 sigmoid、ReLU、pooling 或 ADC 转换由外围电路完成。

PRIME 的 bank 组织有三类 subarray。Mem subarray 与普通 ReRAM 主存类似，只负责存储；FF subarray 是可变形区域，memory mode 下像普通内存，computation mode 下执行 NN 计算；Buffer subarray 靠近 FF subarray，用来缓存输入/输出并通过私有端口与 FF 通信。切换到 computation mode 前，系统先把 FF 中原有数据迁移到 Mem 区，再把训练好的权重写入 FF；计算结束后，controller 重新配置外围电路让 FF 回到 memory mode。

外围电路复用是 PRIME 降低面积开销的关键。传统模拟神经网络阵列需要 DAC 将数字输入转为电压、ADC 将 bitline 电流转为数字输出。PRIME 观察到 ReRAM 主存本来就有 wordline driver 和 sense amplifier，因此对它们做增强：wordline driver 提供多级电压源，column multiplexer 增加模拟减法与 sigmoid 路径，SA 变为可重构多精度转换器并加入 ReLU/max-pool 支持。这样 FF subarray 的计算能力来自局部电路修改，而不是在内存旁边放完整处理器。

有符号权重通过正负阵列实现。由于单个 ReRAM conductance 只能提供非负电流，PRIME 将权重拆为：

$$
W = W^+ - W^-, \quad
W^+_{i,j}=\max(W_{i,j},0), \quad
W^-_{i,j}=\max(-W_{i,j},0)
$$

两组 crossbar 分别产生 \(I^+_j\) 和 \(I^-_j\)，column multiplexer 中的 subtraction unit 输出 \(I^+_j-I^-_j\)。这使 PRIME 支持正负 synaptic weights，但代价是存储和部分外围电路需要成对配置。

精度是 ReRAM 模拟计算最脆弱的部分。论文假设实用工艺下输入电压可提供 3-bit、ReRAM cell 可提供 4-bit 权重、输出目标约 6-bit。为得到更高等效精度，PRIME 把一个输入拆成 high/low 两个 3-bit 部分，把一个权重拆成 high/low 两个 4-bit cell。完整乘积被分成 HH、HL、LH、LL 四项：

$$
R_{\text{full}} =
2^{(P_w+P_{in})/2} R_{HH}
+2^{P_w/2} R_{HL}
+2^{P_{in}/2} R_{LH}
+R_{LL}
$$

随后通过可重构 SA 选择高位、在 precision control circuit 中移位累加。这个方案的直觉是：不要要求单个 ReRAM cell 或单次 ADC 转换覆盖全部动态范围，而是用多次低精度模拟 dot product 加数字移位累加逼近高精度结果。

PRIME 的软件接口把这种硬件暴露为神经网络映射流程。小网络可复制到同一个 mat 的不同区域提高利用率；中等网络被 split-merge 到多个 mat；大网络跨 bank 映射，通过 bank-level parallelism 和 inter-bank communication 形成流水。它与后续 ISAAC 的区别在于：PRIME 保留“主存可变形”的目标，即没有 NN 任务时 FF subarray 可以释放为主存容量；ISAAC 则更像专用 CNN 推理加速器，crossbar 通常被静态分配给各层形成流水。

> 💡 关键：PRIME 的创新不是单纯使用 ReRAM 做点积，而是把 ReRAM 主存的一部分变成可切换计算资源，并让外围电路、buffer、controller、编译器一起支撑 NN 层执行。

#### 🧪 练习题

```yaml
question: "PRIME 中 Full Function subarray 的核心作用是什么？"
options:
  - "在普通存储和神经网络计算之间切换，利用 ReRAM crossbar 执行矩阵向量乘"
  - "只作为 CPU cache，不能参与计算"
  - "只保存操作系统页表，避免所有模拟电路"
  - "替代所有 Mem subarray，使整块主存永久处于计算模式"
answer: 0
explain: "FF subarray 是 PRIME 的 morphable 区域；它在 memory mode 下存储数据，在 computation mode 下通过 ReRAM crossbar 和修改后的外围电路执行 NN 计算。"
```
