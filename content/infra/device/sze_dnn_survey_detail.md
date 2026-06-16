### DNN硬件综述

```yaml
id: sze_dnn_survey
name: DNN硬件综述
full_name: 深度学习硬件加速综述 (Efficient Processing of DNNs Survey)
year: '2017'
org: MIT
paper_url: —
category: dataflow
parent: eyeriss
motivation: 定义数据流分类学权威综述DNN硬件加速
```

#### 📝 一句话总结

《Efficient Processing of Deep Neural Networks》系统化提出了理解 DNN 硬件效率的框架，用计算模式、存储层次、数据流分类、硬件平台和算法硬件协同优化来解释为什么数据移动通常比 MAC 本身更关键。它把 weight stationary、output stationary、no local reuse、row stationary 等 dataflow 放入统一 taxonomy，成为后续 DNN 加速器论文对比数据复用与能耗的常用基准。

#### 🎯 核心要点

- 将 DNN 计算拆解为 CONV、FC、activation、pooling、normalization 等基本层，并强调 CONV/FC 的 MAC 和数据移动主导成本
- 区分 CPU/GPU 等 temporal architecture 与 ASIC/FPGA 常见 spatial architecture，说明 PE 阵列和本地 scratchpad 对能效的意义
- 提出以存储层次为中心的数据流视角：DRAM、global buffer、NoC、PE RF 访问次数共同决定能耗
- 归纳 weight stationary、output stationary、no local reuse、row stationary 四类典型 accelerator dataflow
- 强调 row stationary 不是只固定某一类数据，而是同时优化 weight、activation、partial sum 在 RF/阵列内的复用
- 将量化、剪枝、压缩、紧凑网络结构归入 algorithm-hardware co-design，并讨论它们如何减少 MAC 数和数据搬运
- 给出硬件评估指标：吞吐、延迟、能耗、面积、成本、精度影响、batch size、外部内存流量和系统约束

#### 🔬 深入细节

##### 核心示意图

![Row Stationary 二维卷积复用](https://ar5iv.labs.arxiv.org/html/1703.09039/assets/x39.png)
*图 1：综述论文 Figure 28 的 ar5iv 公开镜像，展示 Row Stationary dataflow 如何在二维 PE 阵列内复用 filter row、input row 和 partial sum。*

![不同 dataflow 的能耗分解](https://ar5iv.labs.arxiv.org/html/1703.09039/assets/x44.png)
*图 2：综述论文 Figure 33(a) 的 ar5iv 公开镜像，对比 AlexNet CONV 层中不同 dataflow 在各级存储和 ALU 上的能耗分解。*

##### 算法伪代码

```python
# 综述中 dataflow/mapper 思想的简化形式：枚举映射，最小化各级数据移动能耗
def choose_energy_efficient_dataflow(layer, hardware):
    candidates = []
    for dataflow in ["weight_stationary", "output_stationary", "no_local_reuse", "row_stationary"]:
        for tile in enumerate_legal_tiles(layer, hardware):
            for loop_order in enumerate_loop_orders(layer):
                access = estimate_access_counts(
                    layer=layer,
                    tile=tile,
                    loop_order=loop_order,
                    dataflow=dataflow,
                    memory_levels=["DRAM", "global_buffer", "NoC", "RF"]
                )
                energy = access["MAC"] * hardware.energy["MAC"]
                for level in ["DRAM", "global_buffer", "NoC", "RF"]:
                    energy += access[level] * hardware.energy[level]
                candidates.append((energy, dataflow, tile, loop_order))

    return min(candidates, key=lambda item: item[0])
```

##### 方法机制解读

这篇综述的核心贡献不是提出单个新芯片，而是把 DNN 加速器的设计问题归纳成可比较的系统框架。DNN 的主算子通常可以写成卷积或矩阵乘：

$$
O[n,m,e,f]=\sum_{c,r,s}I[n,c,e+r,f+s]\cdot W[m,c,r,s]
$$

从纯计算看，这只是大量规则 MAC；但硬件效率取决于每个 \(I\)、\(W\)、partial sum 被从哪个存储层读写多少次。论文强调一次 DRAM 访问的能耗可能比一次小位宽 MAC 高几个数量级，因此“减少数据移动”往往比“增加 MAC 峰值”更重要。

综述将 DNN 硬件分为 temporal 与 spatial 两种思路。CPU/GPU 倾向用集中控制、cache、SIMD/SIMT 和大量线程隐藏延迟；ASIC/FPGA 加速器更常用 spatial PE 阵列，让数据在 PE 间直接流动，并用 RF 或 scratchpad 显式保存复用数据。二者不是简单优劣关系：GPU 灵活、生态强，适合训练和多模型部署；专用加速器则能把控制、取指、缓存一致性等通用开销换成更低能耗的数据通路。

dataflow taxonomy 的重点是回答“什么数据停在哪里”。Weight stationary 让权重尽量留在 PE RF，适合权重复用高的场景，但 activation 和 partial sum 可能需要更多移动；output stationary 让 partial sum 留在本地直到归约完成，减少部分和读写；no local reuse 将更多面积给 global buffer，牺牲 PE RF 复用来降低 DRAM 流量；row stationary 尝试同时复用 filter row、input row 和 partial sum，把总体访问能耗降到最低。可用一个统一能耗模型表达：

$$
E_{\text{layer}}=N_{\text{MAC}}E_{\text{MAC}}+\sum_{l\in L}\left(N_l^I+N_l^W+N_l^P\right)E_l
$$

其中 \(L\) 包括 DRAM、global buffer、NoC、RF，\(N_l^I,N_l^W,N_l^P\) 分别是 activation、weight、partial sum 在第 \(l\) 层存储/互联上的访问次数。

Row stationary 的直觉是让一个 PE 负责一段一维卷积：filter row 留在 RF，滑动窗口中的 input activation 在相邻输出之间复用，partial sum 也在本地累加。然后二维 PE 阵列把多个 row、channel、filter 和 feature map 组合起来，扩展到完整 CONV。相比只优化某一类数据的 WS/OS，RS 牺牲一点局部最优，换取三类数据总能耗的平衡；图中的能耗分解也说明 RS 在 CONV 层总能耗上通常更低。

综述还把算法侧优化纳入同一个能耗框架。低精度量化减少每次 MAC 和每次搬运的 bit 数；剪枝减少非零权重和有效 MAC；压缩减少存储和带宽，但会引入索引、解码和负载均衡开销；紧凑网络结构如 bottleneck、depthwise convolution 会减少名义 MAC，却也可能降低复用机会，让 NoC 和 mapper 更难保持 PE 利用率。后续 Eyeriss v2、SCNN、TPU、NVDLA 等工作都可以放回这个坐标系中分析。

评估方法也是该综述的价值所在。只报告 GOPS 或 TOPS 不足以说明效率，因为 batch size、外部 DRAM 流量、片上 SRAM 大小、工艺节点、精度、稀疏度、准确率损失都会改变结论。更合理的比较要同时给出：

$$
\text{throughput},\quad \text{latency},\quad \frac{\text{inferences}}{\text{J}},\quad \frac{\text{ops}}{\text{W}},\quad \text{area efficiency}
$$

并说明这些指标是在什么模型、输入尺寸、batch、数值精度和内存系统下得到的。

> 💡 关键：这篇综述定义的不是“哪个 dataflow 永远最好”，而是“用数据移动和存储层次解释为什么某个 dataflow 在某类模型和硬件约束下更好”。

#### 🧪 练习题

```yaml
question: "在 Sze 等人的 DNN 硬件综述中，为什么 dataflow 是评估加速器能效的核心？"
options:
  - "因为 dataflow 决定 weight、activation、partial sum 在各级存储和 NoC 中移动多少次"
  - "因为 dataflow 只决定神经网络的训练准确率，不影响硬件能耗"
  - "因为所有 dataflow 都会产生完全相同的 DRAM 访问次数"
  - "因为只要峰值 TOPS 足够高，存储层次可以忽略"
answer: 0
explain: "DNN 的能耗常由数据移动主导；dataflow 决定三类数据如何在 DRAM、global buffer、NoC 和 RF 间复用与搬运。"
```
