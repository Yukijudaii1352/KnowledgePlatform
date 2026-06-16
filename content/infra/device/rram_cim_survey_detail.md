### RRAM-CIM Survey

```yaml
id: rram_cim_survey
name: RRAM-CIM Survey
full_name: RRAM存算一体综述 (RRAM-based CIM Survey)
year: '2021'
org: ASU
paper_url: —
category: pim_cim
parent: isaac
motivation: 系统综述从器件到架构的CIM技术演进
```

#### 📝 一句话总结

RRAM-CIM Survey 系统梳理了 RRAM 从非易失存储单元、交叉阵列向量-矩阵乘、外围 ADC/DAC、可靠性校正到推理/训练架构的完整技术链，解释了为什么 RRAM 适合把神经网络中最昂贵的数据搬移转化为阵列内欧姆定律和基尔霍夫电流求和。它的核心贡献不是提出单个宏单元，而是给出从器件非理想到系统架构取舍的设计坐标系。

#### 🎯 核心要点

- 以 RRAM 交叉阵列为核心，利用单元电导 \(G\) 表示权重、输入电压 \(V\) 表示激活，直接产生电流和 \(I=VG\)
- 覆盖推理、片上训练和在线学习三类场景，强调训练比推理更依赖写入耐久、写验证和误差补偿
- 将 RRAM-CIM 的瓶颈归纳为 ADC/DAC 能耗、阵列 IR drop、器件变异、读噪声、写随机性、保持特性和有限多比特精度
- 比较全模拟、模拟-数字混合、位串行数字外围和架构级调度等不同实现路线
- 强调映射策略：权重切片、正负权重差分对、bit-slicing、tile 分块和跨阵列累加共同决定吞吐与精度
- 指出系统级收益来自减少 DRAM 往返，但外围电路和数据重排可能吞掉阵列内计算的理论能效
- 将 RRAM-CIM 放在 PIM/CIM 演进链条中，作为 ISAAC、PRIME、PipeLayer、NeuroSim 等架构工作的共同器件基础

#### 🔬 深入细节

##### 核心示意图

![RRAM CIM 芯片层次示意](https://ar5iv.labs.arxiv.org/html/2208.04992/assets/x1.png)
*图：公开 ar5iv 镜像中的 NeuRRAM RRAM-CIM 芯片示意图，用作 RRAM-CIM Survey 的机制图补充。2021 综述原文图未提供稳定公开直链，这里采用同领域公开论文图展示 RRAM 交叉阵列、外围电路与系统任务的层次关系。*

##### 算法伪代码

```python
# RRAM-CIM 中一次量化矩阵乘的典型执行流程
def rram_cim_mvm(x_int, w_int, crossbar, adc_bits, slice_bits):
    # w_int 被预先映射到多个 RRAM 电导阵列；正负权重通常拆到差分阵列。
    partial_sums = []

    for bit_group in bit_slice(x_int, width=slice_bits):
        # DAC/字线驱动把数字激活切片转换为电压脉冲。
        v_rows = dac_encode(bit_group)

        # 阵列内欧姆定律和列电流求和完成模拟 MAC。
        i_cols_pos = crossbar.G_pos @ v_rows
        i_cols_neg = crossbar.G_neg @ v_rows
        i_cols = i_cols_pos - i_cols_neg

        # ADC 把列电流量化；随后数字域执行移位累加。
        y_slice = adc_quantize(i_cols, bits=adc_bits)
        partial_sums.append(shift_by_input_bit_position(y_slice, bit_group))

    y = digital_accumulate(partial_sums)
    return calibrate_with_scale_and_zero_point(y)
```

##### 方法机制解读

RRAM-CIM 的基本动机是绕开冯诺依曼架构中“权重反复从存储器搬到 MAC 单元”的能耗墙。对 DNN 层 \(y = Wx\) 来说，传统加速器把权重 \(W\) 从 SRAM/DRAM 读出，再在数字 MAC 阵列中乘加；RRAM-CIM 则把 \(W\) 固定为阵列电导 \(G\)，把输入 \(x\) 编码成字线电压 \(V\)，列线电流天然给出向量-矩阵乘：

$$
I_j=\sum_i V_iG_{i,j}
$$

这个公式揭示了 RRAM-CIM 的优势和代价。优势是乘法由器件导通完成、加法由列线电流叠加完成，阵列内部几乎没有显式数据搬移；代价是 \(V\)、\(G\)、\(I\) 都是模拟量，最终仍要通过 DAC/ADC 与数字系统交互。因此综述强调，不能只看交叉阵列的理想 TOPS/W，必须把输入编码、ADC 采样、移位累加、buffer 访问和片上网络一起纳入能效账本。

权重映射通常需要多层切片。第一层是符号映射：由于 RRAM 电导非负，正负权重常被拆成 \(G^+\) 与 \(G^-\)，输出取电流差。第二层是多比特映射：单个 RRAM 单元可提供有限电导级，或者用多个 1-bit/2-bit cell 组合成高精度权重。第三层是阵列切分：大矩阵必须拆成多个 sub-array，避免长线 IR drop、寄生电容和 ADC 负载过大。数字端再按权重 bit 位和输入 bit 位做移位累加：

$$
y_j \approx \sum_{b_x}\sum_{b_w}2^{b_x+b_w}\operatorname{ADC}\left(\sum_i V_i^{(b_x)}G_{i,j}^{(b_w)}\right)
$$

可靠性是 RRAM-CIM 区别于 SRAM-CIM 的关键。RRAM 的电导不是一次写入后永久精确不变，而会受 cycle-to-cycle variation、device-to-device variation、retention drift、read disturb、温度和写入脉冲随机性影响。推理可以通过离线训练感知噪声、写验证、校准表和冗余映射来容忍误差；训练则更困难，因为反向传播需要频繁更新权重，写耐久和模拟更新线性度会直接影响收敛。因此综述把“从 inference 到 training”视为难度递进，而不是同一阵列简单复用。

外围 ADC/DAC 决定了许多设计取舍。高分辨率 ADC 能提高输出精度，但能耗和面积随 bit 数快速增加；低分辨率 ADC 则需要更多 bit-serial 周期或算法侧量化补偿。架构设计因此常在并行度和精度之间折中：让阵列一次产生粗粒度部分和，再在数字域校正、重标定和累加。这也解释了为什么后续 RRAM-CIM 芯片常采用混合信号方案，而不是追求完全模拟神经网络。

从系统角度看，RRAM-CIM 真正适合的是权重驻留、数据复用高、容错性强的边缘推理和部分在线学习任务。大型模型训练仍受写入能耗、耐久、精度和调度复杂度制约；但 RRAM 的非易失性、密度和多级电导让它在 instant-on 设备、稀疏模型、低功耗传感器侧 AI 和异构 PIM 系统中有独特价值。

> 💡 关键：RRAM-CIM 的“计算”发生在器件物理层，但可用系统必须同时解决模拟误差、数字重构、模型量化和编译映射四个问题。

#### 🧪 练习题

```yaml
question: "RRAM-CIM 中 ADC/DAC 外围电路为什么经常成为系统瓶颈？"
options:
  - "因为 RRAM 阵列不能保存权重"
  - "因为阵列内 MAC 很轻量，但模拟电压/电流必须与数字系统转换，转换精度越高能耗和面积越大"
  - "因为所有 RRAM 单元只能表示 32-bit 浮点数"
  - "因为列电流无法根据欧姆定律求和"
answer: 1
explain: "RRAM 交叉阵列可高效产生模拟部分和，但输入电压生成和输出电流量化需要 DAC/ADC；这些外围电路常决定整体能效、面积和精度。"
```
