### TPU v1

```yaml
id: tpu_v1
name: TPU v1
full_name: 张量处理单元v1 (Tensor Processing Unit v1)
year: '2017'
org: Google
paper_url: https://arxiv.org/abs/1704.04760
category: tpu
parent: —
motivation: 8位整数脉动阵列实现推理能效比提升15-30倍
```

#### 📝 一句话总结

TPU v1 提出了面向数据中心神经网络推理的专用 ASIC，用 8-bit 整数 256×256 脉动阵列、大容量片上 Unified Buffer 和确定性执行模型解决 CPU/GPU 在在线推理中吞吐、延迟与能效不足的问题。它把数据中心生产 DNN 中最重的矩阵乘压到固定数据通路上，论文报告相对同期 CPU/GPU 获得约 15-30 倍性能优势和更高性能/瓦特。

#### 🎯 核心要点

- 采用 65,536 个 8-bit MAC 组成的 256×256 Matrix Multiply Unit，峰值约 92 TOPS
- 使用 28 MiB 软件管理 Unified Buffer 和 4 MiB Accumulator，减少外部 DRAM 访问
- 以 PCIe 加速卡接入服务器，主机 CPU 负责应用逻辑、批处理和 TPU 指令发射
- 面向推理而非训练，重点优化 99 分位延迟、吞吐和数据中心能效
- 使用脉动阵列固定数据流复用权重与激活，降低通用 CPU/GPU 的控制和缓存开销
- 支持 TensorFlow 编译出的 CISC 风格 TPU 指令，包括矩阵乘、激活、归一化和数据搬运
- 在 Google 生产 MLP、CNN、LSTM 推理负载上验证，覆盖当时大部分数据中心 NN 推理需求

#### 🔬 深入细节

##### 核心示意图

![TPU v1 芯片框图](https://ar5iv.labs.arxiv.org/html/1704.04760/assets/x1.png)
*图：TPU v1 论文 Figure 1 的公开 ar5iv 镜像。图中 Matrix Multiply Unit、Unified Buffer、Accumulator、Weight FIFO 和 PCIe Host Interface 构成推理数据通路。*

##### 算法伪代码

```python
# TPU v1 上一次量化推理的核心数据流
program = tensorflow_graph_to_tpu_instructions(model_graph)

for request_batch in online_service:
    host_cpu.enqueue(program, request_batch)

    for op in program:
        if op.kind == "load_activations":
            unified_buffer.write(op.dst, host_or_dram_read(op.src))

        elif op.kind == "matrix_multiply":
            # 权重流式进入 Weight FIFO，激活来自 Unified Buffer。
            acc = zeros_tile(dtype="int32")
            for k_tile in op.k_tiles:
                a_int8 = unified_buffer.read(op.activation_tile(k_tile))
                w_int8 = weight_fifo.stream(op.weight_tile(k_tile))
                acc += systolic_256x256_mac(a_int8, w_int8)
            accumulator.write(op.dst, acc)

        elif op.kind == "activate_and_quantize":
            y = activation(accumulator.read(op.src), op.activation)
            y_int8 = clamp(round(y * op.output_scale), -128, 127)
            unified_buffer.write(op.dst, y_int8)

    host_cpu.return_response(unified_buffer.read(program.output))
```

##### 方法机制解读

TPU v1 的出发点不是“让所有程序都更快”，而是服务 Google 数据中心中形态高度集中的神经网络推理。论文观察到生产模型主要由矩阵乘、卷积展开后的矩阵乘、逐元素激活和少量归一化组成，且推理通常可以通过校准和量化使用 8-bit 整数。这样，芯片不必保留乱序执行、复杂缓存层次、多线程调度等通用处理器机制，而可以把面积和功耗集中给矩阵乘阵列、片上 SRAM 和简单可预测的控制流。

核心算子仍然是矩阵乘。给定量化激活 \(X_q\) 和量化权重 \(W_q\)，TPU v1 在阵列中计算 32-bit 部分和：

$$
Y_{i,j}^{int32}=\sum_k X_{q,i,k}W_{q,k,j}
$$

随后再通过缩放、激活函数和饱和裁剪把结果写回 8-bit 或中间精度缓冲。量化带来的收益有两层：第一，8-bit 乘法器面积和能耗远低于 FP32 乘法器，因此相同面积内能放下 65,536 个 MAC；第二，激活和权重带宽下降，Unified Buffer 能容纳更多中间数据，减少外部内存往返。

脉动阵列的关键是数据复用。权重从一侧或上方按节拍流入，激活从另一个方向流入，每个处理单元只做乘加并把数据传给邻居。大矩阵会被分块到 256×256 tile，阵列填满之后以稳定流水方式输出部分和。相比 GPU 的 SIMT 执行，TPU v1 的单个处理单元功能简单、控制开销低、数据搬运路径固定；代价是灵活性较弱，只有当模型能被编译成规则张量算子时才能充分利用硬件。

Unified Buffer 是 v1 能效的另一个核心。外部 DRAM 访问比片上 SRAM 访问昂贵得多，如果每层都把激活写回主存再读出，矩阵阵列会被内存带宽限制。TPU v1 因此使用软件管理的 28 MiB 片上缓冲保存输入激活和中间结果，编译器显式安排数据何时搬入、何时复用、何时写回。这个设计类似 scratchpad，不追求透明缓存命中率，而追求可预测延迟和可控数据流。

从系统形态看，TPU v1 是 PCIe 协处理器。CPU 仍处理 RPC、模型选择、特征处理、业务逻辑和批处理，TPU 只执行神经网络图中的重算子。这样的边界让 TPU 可以快速部署到现有数据中心服务器中，也解释了它为什么强调 99 分位延迟：在线服务关注尾延迟，确定性硬件流水比依赖缓存和动态调度的通用处理器更容易给出稳定响应时间。

与 CPU/GPU 的区别可以概括为公式中的性能/瓦特分母也被优化了：

$$
\operatorname{efficiency}=\frac{\operatorname{useful\ neural\ network\ ops}}{\operatorname{power}\times \operatorname{time}}
$$

CPU 擅长复杂控制和低延迟单线程，GPU 擅长更通用的数据并行，而 TPU v1 把“有用操作”限定到推理主路径中的 INT8 张量算子，并减少指令调度、寄存器文件、缓存一致性和图形管线等非目标开销。因此它在推理上能获得数量级能效提升，但不适合训练所需的反向传播、动态范围更宽的梯度累加和大规模芯片间同步，这也直接推动了后续 TPU v2/v3 训练版引入 bfloat16、HBM 和 Pod 互连。

> 💡 关键：TPU v1 的创新不只是“有一个大矩阵乘单元”，而是把数值格式、片上存储、编译器调度、协处理器接口和在线服务延迟目标一起收窄到推理场景。

#### 🧪 练习题

```yaml
question: "TPU v1 使用 8-bit 脉动阵列和软件管理 Unified Buffer 的主要目的是什么？"
options:
  - "把推理中的矩阵乘固定到高复用、低控制开销的数据通路上，并减少外部内存访问"
  - "提高通用操作系统内核和分支密集型代码的执行速度"
  - "让训练梯度必须使用 FP64 精度累加"
  - "用透明缓存替代编译器的数据搬运规划"
answer: 0
explain: "TPU v1 面向数据中心推理，INT8 脉动阵列提升矩阵乘吞吐和能效，Unified Buffer 通过显式管理中间激活降低 DRAM 流量。"
```
