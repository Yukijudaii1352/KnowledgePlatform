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

TPU v1 是 Google 面向数据中心推理的专用矩阵处理器，用 8-bit 整数 256×256 脉动阵列和大容量片上缓冲替代通用 CPU/GPU 执行 DNN 推理。它解决了在线服务中神经网络推理吞吐和能效不足的问题，在受控精度和固定数据流下获得数量级能效提升。

#### 🎯 核心要点

- 采用 256×256 Matrix Multiply Unit，一次完成大规模 INT8 乘累加
- 使用 systolic array 数据流，让权重和激活在阵列中规律移动以提高复用
- 片上 Unified Buffer 保存激活，中间结果尽量避免频繁访问外部内存
- 作为 PCIe 协处理器接入服务器，CPU 负责调度，TPU 执行神经网络算子
- 面向推理而非训练，重点优化低延迟、高吞吐和数据中心能效
- 论文报告相对 CPU/GPU 在多类生产 DNN 上获得显著性能/瓦特优势

#### 🔬 深入细节

##### 核心示意图

![TPU v1 芯片框图](https://ar5iv.labs.arxiv.org/html/1704.04760/assets/x1.png)
*图：TPU v1 体系结构框图，核心是矩阵乘单元、Unified Buffer、Accumulator 和主机接口。*

##### 算法伪代码

```python
# TPU v1 推理数据流伪代码
for layer in neural_network:
    activations = load_from_unified_buffer(layer.input)
    weights = stream_weights_from_memory(layer.weights)
    partial = systolic_array_int8_matmul(activations, weights)
    output = apply_activation_and_quantize(partial)
    store_to_unified_buffer(output)
```

TPU v1 的核心判断是：Google 生产环境中的推理工作负载以矩阵乘、卷积和全连接层为主，且可以接受 8-bit 量化。与其用通用 CPU/GPU 支持大量不常用控制流，不如把面积和功耗集中到固定矩阵乘阵列、片上缓冲和简单控制逻辑上。

脉动阵列的直觉是让数据像节拍一样在处理单元之间流动。权重和激活进入阵列后，每个单元完成乘加并把部分数据传给相邻单元。这样同一数据在片上被复用很多次，减少昂贵的内存访问。公式上核心仍是矩阵乘：

$$Y_{i,j}=\sum_k X_{i,k}W_{k,j}$$

TPU v1 不是独立服务器 CPU，而是 PCIe 加速卡。主机 CPU 负责应用逻辑、请求批处理和指令发射，TPU 执行神经网络图中的核心张量计算。这样的协处理器模式降低了部署难度，也让 Google 可以把 TPU 快速接入现有数据中心服务。

与 GPU 相比，TPU v1 的通用性更低，但控制更简单、数据流更稳定、能效更高。它标志着 AI 硬件从“用通用并行处理器跑神经网络”转向“为神经网络主算子定制数据路径”，后续 TPU v2/v3/v4 再把这个思路扩展到训练和大规模互联。

#### 🧪 练习题

```yaml
question: "TPU v1 为什么选择 8-bit 整数量化和脉动阵列？"
options:
  - "为了提高推理能效并让矩阵乘数据复用更规则"
  - "为了支持任意 CPU 操作系统内核"
  - "为了让模型训练必须使用 FP64"
  - "为了取消片上缓冲区"
answer: 0
explain: "推理对 INT8 友好，脉动阵列能高效执行矩阵乘并减少内存访问，因此性能/瓦特显著提升。"
```
