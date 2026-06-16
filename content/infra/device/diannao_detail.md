### DianNao

```yaml
id: diannao
name: DianNao
full_name: 电脑深度学习加速器 (DianNao Accelerator)
year: '2014'
org: ICT-CAS/Inria
paper_url: —
category: npu_asic
parent: —
motivation: 首个DL专用加速器解决片上访存瓶颈
```

#### 📝 一句话总结

DianNao 提出了面向神经网络基本层的专用小面积加速器，用片上输入/输出/权重缓冲和 16×16 神经功能单元替代通用 SIMD 的缓存层级，解决早期深度学习推理中外部访存远重于计算的问题。

#### 🎯 核心要点

- ASPLOS 2014 论文《DianNao: A Small-Footprint High-Throughput Accelerator for Ubiquitous Machine-Learning》提出第一代 DianNao 架构
- 核心计算单元 NFU 包含乘法树、加法树和非线性函数近似三段流水，可在每周期计算 16 个输出神经元对 16 个输入的贡献
- 片上存储分成 NBin、NBout 和 SB：分别缓存输入神经元、输出/部分和、突触权重，减少对外部 DRAM 的往返访问
- 采用 16-bit 定点数据路径，论文报告精度损失很小，但面积、功耗和 SRAM 带宽压力显著低于 32-bit 浮点方案
- 编程模型围绕 layer-by-layer 执行：DMA 预取权重和输入块，NFU 计算局部 partial sum，NBout 累加后写回
- 论文在 65nm 下报告约 3.02 mm²、485 mW，并相对 SIMD-like 基线取得数量级性能和能效提升

#### 🔬 深入细节

##### 核心示意图

![DianNao 加速器结构图](https://zhifeiding.github.io/assets/images/cambricon/2.png)
*图：DianNao 架构示意，展示 NBin、NBout、SB、DMA 和 NFU 的连接关系；图片为公开论文学习笔记对原论文图的转载，原始设计来自 ASPLOS 2014 论文，PDF 可见：https://users.cs.duke.edu/~lkw34/papers/diannao-asplos2014.pdf。*

##### 算法伪代码

```python
# DianNao 对一个全连接/卷积展开后的神经网络层执行 16x16 分块
Tn = 16   # 每次计算 16 个输出神经元
Ti = 16   # 每次读取 16 个输入神经元

for out_block in range(0, num_outputs, Tn):
    NBout.clear(out_block)                         # 输出部分和缓冲
    for in_block in range(0, num_inputs, Ti):
        NBin.load(input_neurons[in_block:in_block + Ti])
        SB.load(weights[out_block:out_block + Tn,
                        in_block:in_block + Ti])

        # NFU-1: 16x16 乘法；NFU-2: 按输出累加；NFU-3: 非线性近似
        partial = matvec_16x16(SB, NBin)
        NBout.accumulate(out_block, partial)

    output[out_block:out_block + Tn] = activation(NBout.read(out_block))
```

DianNao 的目标是把神经网络层中最规则的运算抽象出来：对一组输入神经元 \(x_i\) 和突触权重 \(w_{n,i}\)，计算输出神经元：

$$
y_n = f\left(\sum_i w_{n,i}x_i\right)
$$

传统 CPU/GPU 通过通用 cache 体系搬运这些数据，但早期 CNN/MLP 的权重和中间激活远大于寄存器文件，DRAM 能耗和带宽成为主瓶颈。DianNao 直接把输入神经元、权重、输出部分和拆成三个片上 buffer，使访问模式从“靠 cache 猜测复用”变成“由硬件控制器按神经网络块显式搬运”。

NFU 是论文的核心。它每周期接收 16 个输入神经元和一组 16×16 权重，先产生 256 个乘积，再按 16 个输出通道分别做规约，最后用分段线性插值近似 sigmoid 等非线性函数。若把一次乘法和一次加法都计为操作，则每周期理论操作数近似为：

$$
Ops_{\text{cycle}} = 16 \times 16\ \text{mul}
 + 16 \times (16-1)\ \text{add} = 496
$$

论文中约 0.98 GHz 的频率对应数百 GOP/s 级峰值，这解释了为什么一个很小的 ASIC 能超过通用 SIMD 基线：它不是用更多控制逻辑取胜，而是把数据路径固定为神经网络最常见的 16×16 矩阵-向量块。

片上 buffer 的分工也很关键。NBin 保存输入神经元，SB 保存当前块权重，NBout 保存输出 partial sum。对全连接层，一个输入块会被 16 个输出神经元复用；对卷积层，同一窗口数据会在多个 filter 上复用。DianNao 的控制器利用这种复用顺序安排 DMA，把外部访存压缩到“每个块加载一次、计算多次”的节奏。

非线性函数没有用昂贵的通用函数单元。NFU-3 采用分段线性插值：

$$
f(x) \approx a_j x + b_j,\quad x \in [l_j, r_j)
$$

其中区间 \(j\) 由输入范围决定，\(a_j,b_j\) 存在小表里。这种设计牺牲了极少数值精度，但把 sigmoid/tanh 等激活变成一次乘加和查表，更符合小面积、低功耗的目标。

与后来的 DaDianNao、TPU、NVDLA 相比，DianNao 的局限也明显：它仍假设权重和激活可以分块流入一个单核加速器，外部内存仍是全局资源；当模型参数继续增大时，SB 不可能容纳足够多权重，DRAM 带宽会再次成为瓶颈。这正是 DaDianNao 后续选择把大量 eDRAM 放到计算节点附近的原因。

> 💡 关键：DianNao 的贡献不是某个新的神经网络算子，而是把神经网络层的计算公式硬化成“显式片上缓冲 + 固定 16×16 数据路径 + 低成本非线性”的 NPU 原型。

#### 🧪 练习题

```yaml
question: "DianNao 为什么把片上存储拆成 NBin、NBout 和 SB？"
options:
  - "为了让输入、输出部分和、权重分别按不同复用模式缓存，减少外部 DRAM 访问"
  - "为了模拟 CPU 的多级 cache 替换策略"
  - "为了把所有训练数据永久保存在片上"
  - "为了让每个输出神经元只能使用一个输入神经元"
answer: 0
explain: "神经网络层中输入、权重和输出部分和的生命周期不同，分离缓冲可以显式调度 DMA 和复用，避免通用 cache 无法稳定捕捉的访问模式。"
```
