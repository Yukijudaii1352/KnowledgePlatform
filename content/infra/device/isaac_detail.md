### ISAAC

```yaml
id: isaac
name: ISAAC
full_name: 原位模拟计算加速器 (In-Situ Analog Arithmetic in Crossbars)
year: '2016'
org: Utah/HP Labs
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001139
category: pim_cim
parent: prime
motivation: 完整流水线架构平衡模拟计算与数字控制
```

#### 📝 一句话总结

ISAAC 提出了面向 CNN/DNN 推理的完整 ReRAM crossbar 加速器，将每层权重静态驻留在专属 crossbar 中，用 tile/IMA/eDRAM 组成跨层流水线，解决模拟存内点积难以扩展成整芯片系统的问题。它的核心贡献是把 in-situ analog dot product、ADC/DAC 位布局、有符号算术、层间缓冲和片上调度整合成可评估的完整架构。

#### 🎯 核心要点

- 采用 chip、tile、IMA、memristor crossbar 的层次结构，并用 c-mesh/总线连接 tile
- 每个 IMA 包含多个 128×128 crossbar、Sample-and-Hold、ADC、DAC、Input Register、Output Register 和 shift-and-add
- crossbar 同时存储 synaptic weights 并执行 analog dot product，减少权重搬运
- CNN 层被静态映射到不同 tile/IMA，输出一旦满足卷积窗口需求即可触发下一层，形成跨层 pipeline
- 用 eDRAM buffer 聚合相邻 pipeline stage 的输入/输出，降低完整层 materialization 的 buffer 需求
- 采用 bit-serial 输入：16-bit 输入按 1-bit 电压序列输入，降低 DAC 复杂度
- 采用 w-bit cell 分片、flipped weight encoding、unit column 和 bias 表示，降低 ADC 位宽并正确处理有符号权重
- 通过设计空间探索平衡 crossbar 存储/计算、ADC 数量、eDRAM buffer 和 tile 面积功耗

#### 🔬 深入细节

##### 核心示意图

![ISAAC 架构总览](https://mdpi-res.com/make/make-04-00004/article_deploy/html/images/make-04-00004-g020-550.jpg)
*图：MDPI 综述中转载并标注的 ISAAC 架构总览，来源说明为 adapted from ISAAC ISCA 2016 论文；图中展示 chip、tile、IMA、crossbar、DAC/ADC、S+H、OR/IR 等层次。*

##### 算法伪代码

```python
# ISAAC: 推理时的跨层流水与 IMA 内 bit-serial 模拟点积
def isaac_inference(network, image):
    schedule = offline_map_layers_to_tiles(network)
    load_weights_to_crossbars(schedule)        # 运行前编程 ReRAM 权重
    load_control_vectors(schedule)             # FSM 静态调度路由和缓冲

    tile_buffer[schedule.first_layer].write(image)

    while not final_output_ready():
        for stage in pipeline_stages(schedule):
            if stage.input_buffer.has_required_window():
                x16 = stage.input_buffer.read_window()
                output_reg = 0

                for bit in range(16):
                    row_voltage = extract_bit(x16, bit)  # 1-bit DAC 即可
                    currents = stage.crossbars.read(row_voltage)
                    sampled = sample_and_hold(currents)
                    partial = adc_convert(sampled)
                    output_reg += shift(partial, bit)

                output_reg = fix_signed_and_flipped_columns(output_reg)
                y = sigmoid_or_relu(output_reg)
                y = optional_max_pool(y)
                next_stage_buffer(stage).write(y)

    return io_interface.read_final_output()
```

##### 方法机制解读

ISAAC 与 PRIME 使用同一类物理基础：给 crossbar 行输入电压，列端汇聚电流完成点积。对一个 \(R\) 行 crossbar，第 \(j\) 列输出为：

$$
I_j=\sum_{i=0}^{R-1} V_i G_{i,j}
$$

这等价于一批神经元共享输入向量、各自使用不同权重列并行完成 matrix-vector multiplication。ISAAC 的问题意识比“能不能算点积”更系统：真正的 CNN 推理还需要层间数据传递、卷积窗口复用、pooling/activation、ADC/DAC、符号数、片上网络和跨层吞吐平衡。

ISAAC 的 hierarchy 是 chip → tile → IMA → crossbar。tile 内有 eDRAM buffer、多个 IMA、shift-and-add、sigmoid、max-pool 和输出寄存器；IMA 内有 crossbar、input register、output register、S&H、ADC/DAC 与局部 shift-and-add。权重在推理前写入 memristor cell，运行时不频繁重编程。这一点直接决定了 ISAAC 的数据流：一个 crossbar 一旦存了某层某组神经元的权重，就专门服务这层，而不是像 DaDianNao 的 NFU 那样每层轮流换权重。

跨层 pipeline 是 ISAAC 的第一项核心架构创新。DaDianNao 一次集中处理一层，所有 NFU 为当前层服务，层结束后再切到下一层；ISAAC 则把不同层分配到不同 tile/IMA。对于卷积层，只要上一层产生了足够填满当前卷积窗口的输出，当前层就可以开始计算，不必等待上一层完整 feature map materialize。若输入 feature map 宽度为 \(N_y\)、卷积核宽度为 \(K_y\)，流水化可近似把层间 buffer 需求降低到原来的：

$$
\frac{K_y}{N_y}
$$

这让更多面积留给 crossbar compute，而不是大 eDRAM buffer。

IMA 内部的流水解决 ADC/DAC 开销。朴素方案会要求 16-bit DAC、极高精度 ReRAM cell 和超过 16-bit 的 ADC，成本和噪声都不可接受。ISAAC 改为 bit-serial input：16-bit 输入 \(a_i\) 被拆为 16 个二进制 bit，在 16 个周期内依次输入，使用近似 1-bit DAC。第 \(b\) 个周期的 crossbar 只计算该 bit 与权重的部分和，再由数字 shift-and-add 累积：

$$
\sum_i a_i w_i =
\sum_{b=0}^{15} 2^b \left(\sum_i a_{i,b}w_i\right)
$$

这样把高精度乘法拆成多次低精度模拟读和低成本数字累加，牺牲周期数换取更可实现的 DAC/ADC。

权重也被分片存储。论文的设计探索中，16-bit fixed-point 权重由多个 \(w\)-bit memristor cell 表示，常用甜点是 \(w=2\)。如果 crossbar 有 \(R\) 行、输入一次提供 \(v\) bit、电导 cell 提供 \(w\) bit，ADC 理论位宽大致为：

$$
A=\log_2(R)+v+w
$$

当 \(v=1\) 或 \(w=1\) 时可少一位。由于 ADC 功耗/面积随位宽上升很快，ISAAC 又引入 flipped weight encoding：如果一列权重总量过大，就存储 \(\bar{W}=2^w-1-W\)，保证最大输入下输出 MSB 为 0，从而降低 ADC 分辨率需求。转换回原值时使用额外 unit column 计算输入和：

$$
\sum_i a_i \bar{W}_i =
(2^w-1)\sum_i a_i - \sum_i a_i W_i
$$

符号算术同样需要额外设计。输入采用 two's complement，最高位周期执行 shift-and-subtract；权重则使用带 bias 的无符号表示，因为单个 memristor bitline 只能加电流，很难直接表达负贡献。若 16-bit 权重用偏置 \(B=2^{15}\) 表示，crossbar 先计算带偏置权重的点积，再用 unit column 得到输入中 1 的数量并减去相应 bias。这样 flipped encoding 的校正和 signed bias 的校正都能在数字后处理路径中合并。

ISAAC 与 PRIME 的关系可以理解为“从可变形主存到专用流水推理机”。PRIME 强调 FF subarray 在内存/计算之间切换，适合把 ReRAM 主存扩展为 PIM；ISAAC 接受 crossbar 难以在线重编程的现实，把权重静态铺到多层 pipeline 中，用更多 crossbar 复制瓶颈层权重来平衡吞吐。其局限也来自这里：对 batch 太小、动态控制流、LRN/复杂归一化或需要频繁训练更新的场景，深流水和静态映射会产生气泡、重编程成本和功能覆盖问题。

> 💡 关键：ISAAC 的贡献是完整系统化。它不只证明 ReRAM 能做模拟点积，还把 analog compute 与数字控制、缓冲、位串行精度、ADC 优化和跨层 pipeline 组合成可跑 CNN 推理的架构。

#### 🧪 练习题

```yaml
question: "ISAAC 为什么采用 16-bit 输入的 bit-serial 方式，而不是一次性用 16-bit DAC 输入？"
options:
  - "用多个低精度模拟读和数字 shift-and-add 替代高成本高噪声的 16-bit DAC/ADC 路径"
  - "因为 ReRAM crossbar 只能执行布尔 AND，不能做点积"
  - "为了让所有权重每个周期都重新写入 ReRAM"
  - "为了取消所有 eDRAM buffer 和层间流水"
answer: 0
explain: "bit-serial 输入把高精度乘法拆成 16 个低精度周期，显著降低 DAC/ADC 复杂度，并用数字移位累加恢复 16-bit fixed-point 结果。"
```
