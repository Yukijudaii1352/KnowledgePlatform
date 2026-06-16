### Cambricon ISA

```yaml
id: cambricon_isa
name: Cambricon ISA
full_name: 寒武纪神经网络指令集 (Cambricon Instruction Set Architecture)
year: '2016'
org: ICT-CAS
paper_url: https://dl.acm.org/doi/abs/10.1145/3007787.3001179
category: npu_asic
parent: dadiannao
motivation: 首个神经网络指令集架构标准化AI芯片编程
```

#### 📝 一句话总结

Cambricon ISA 提出了面向神经网络的专用指令集，把矩阵、向量、非线性函数和显式数据搬运提升为硬件可见的一等操作。它解决了固定功能神经网络加速器可编程性弱、通用 CPU/GPU 指令又过细的问题，为后续 NPU 形成“专用数据路径 + 可编程 ISA”的设计范式。

#### 🎯 核心要点

- 定义面向神经网络的 load-store ISA，包含控制、数据传输、算术和逻辑四类指令
- 以标量、向量、矩阵三类操作数覆盖全连接、卷积、池化、归一化、激活和循环网络等常见算子
- 使用片上 scratchpad 显式承载向量/矩阵数据，避免把大张量塞进传统通用寄存器文件
- 引入 MMV、VMM、MADD、VMUL、VEXP、VDIV、VGTM 等高层张量指令，提高代码密度
- 基于 DaDianNao 风格 NPU 数据路径实现原型，在有限硬件开销下支持更多神经网络类型
- 与 x86、MIPS、GPGPU 和固定功能加速器相比，重点优化神经网络程序的表达效率和能效

#### 🔬 深入细节

##### 核心示意图

![Cambricon 指令类型概览](https://raw.githubusercontent.com/BirenResearch/AIChip_Paper_List/master/notes/ISCA/media/d4faf39bcbf649cb328087e03f3cbd4a.png)
*图：Cambricon 论文中指令类别的公开摘录图，来源为 BirenResearch/AIChip_Paper_List 对 ISCA 2016 论文的公开笔记镜像。*

##### 算法伪代码

```asm
# Cambricon 风格的神经网络层执行伪代码
LOAD.V   v_x,  [input_addr]       # 从主存搬运激活向量到片上向量缓冲
LOAD.M   m_w,  [weight_addr]      # 从主存搬运权重矩阵到片上矩阵缓冲
MMV      v_y,  m_w, v_x           # v_y = W x
VADD     v_y,  v_y, v_bias        # v_y = v_y + b
VEXP     v_t,  -v_y               # sigmoid/tanh/softmax 等非线性可拆为向量函数
VADD.S   v_t,  v_t, 1.0
VDIV     v_y,  1.0, v_t
STORE.V  [output_addr], v_y
```

Cambricon 的出发点不是重新发明神经网络算法，而是重新定义“机器指令应该暴露到什么粒度”。传统 RISC/CPU 指令以标量加减乘除和内存访问为中心，表达一个全连接层或卷积层时需要大量循环、地址计算和微小算术指令；固定功能加速器如早期 DaDianNao 又把数据路径固化在少数网络形态上，遇到新层类型或新模型拓扑时扩展困难。Cambricon 把神经网络中的核心张量模式直接抽象成 ISA 指令，使编译器可以把层级计算映射到稳定的硬件原语上。

论文的核心机制是“通用控制 + 专用张量操作数”。Cambricon 仍采用 load-store 风格：只有数据传输指令访问主存，计算指令只操作片上寄存器或 scratchpad 中的标量、向量、矩阵对象。全连接层可写成：

$$y=f(Wx+b)$$

其中 \(W\) 是矩阵，\(x\)、\(b\)、\(y\) 是向量。Cambricon 用一次矩阵-向量指令完成主计算，再用向量加法和向量非线性函数完成后处理；这比把每个乘加拆成标量指令有更高代码密度，也让硬件调度器能清楚看到数据复用机会。

片上存储是 Cambricon 与传统向量机的重要区别。神经网络参数和激活往往远大于通用寄存器文件，因此 Cambricon 不把所有向量/矩阵都设计成固定数量的硬寄存器，而是用显式 scratchpad 和地址化对象承载大块张量。这样做牺牲了一部分缓存透明性，但让编译器可以精确安排搬运、复用和覆盖写入，符合 NPU 上“访存能耗远高于乘加”的约束。

逻辑指令用于表达神经网络里常被忽视但非常重要的非线性和选择操作。例如池化或 ReLU 类操作本质上是逐元素比较：

$$z_i=\max(x_i, y_i)$$

在普通 ISA 上，这通常需要比较、分支或掩码组合；Cambricon 用向量比较/选择类指令直接表示，减少控制流开销，也更适合 SIMD/Tensor datapath 执行。反向传播里的外积更新也能自然映射到矩阵操作：

$$\Delta W=\eta \cdot \delta x^\top,\qquad W \leftarrow W-\Delta W$$

因此它不只服务推理，还为训练中的梯度传播和权重更新留下了指令表达空间。

与 DaDianNao 这样的固定数据路径相比，Cambricon 的优势在于把“神经网络共同结构”抽象为 ISA，而不是把某个网络结构写死在电路里。硬件仍可以保留矩阵乘阵列、向量函数单元、DMA 和片上缓冲等 NPU 组件，但软件通过指令序列组合它们。这个折中正是后续 AI 芯片常见路线：底层数据路径高度专用，上层通过图编译器或算子编译器生成设备 ISA。

#### 🧪 练习题

```yaml
question: "Cambricon ISA 相比传统通用 ISA 的核心优势是什么？"
options:
  - "把神经网络常见的矩阵、向量和非线性操作提升为硬件可见指令"
  - "完全取消片上存储，所有张量都直接放在主存中计算"
  - "只支持单一固定神经网络，换模型必须重新设计芯片"
  - "用更多标量分支指令替代矩阵乘指令"
answer: 0
explain: "Cambricon 的关键是用神经网络专用指令提高表达密度和硬件可调度性，同时保留比固定功能加速器更好的可编程性。"
```
