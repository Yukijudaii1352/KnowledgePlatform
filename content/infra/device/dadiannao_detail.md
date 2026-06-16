### DaDianNao

```yaml
id: dadiannao
name: DaDianNao
full_name: 大电脑多核架构 (DaDianNao Multi-chip Architecture)
year: '2014'
org: ICT-CAS/Inria
paper_url: —
category: npu_asic
parent: diannao
motivation: eDRAM片上存储消除外部DRAM访问压力
```

#### 📝 一句话总结

DaDianNao 在 DianNao 的单核 NPU 基础上提出多芯片机器学习超级计算机，把大量 eDRAM 直接放到计算节点内保存突触权重，用近存计算和节点间广播/归约缓解大模型的外部 DRAM 带宽瓶颈。

#### 🎯 核心要点

- MICRO 2014 论文《DaDianNao: A Machine-Learning Supercomputer》把 DianNao 扩展为多节点系统，目标是让大规模神经网络权重常驻片上 eDRAM
- 每个 node 包含 16 个 tile、一个中央 eDRAM 模块和片上 fat-tree；每个 tile 由 NFU、NBin/NBout 和多个 eDRAM bank 组成
- 论文给出的典型 node 容量为 16 个 tile × 2 MB eDRAM 加中央 4 MB eDRAM，约 36 MB，用来分布式保存 synapses
- 计算模式从“权重流入计算核”变为“神经元流过保存权重的计算节点”，显著降低外部 DRAM 访问
- 节点间通过高速链路组成 2D mesh，采用 computing-and-forwarding，让输出神经元/部分和在节点间边传输边累加
- 支持推理和训练路径，NFU 数据路径可配置为分类层、卷积层、归一化层和反向传播中的向量/矩阵运算

#### 🔬 深入细节

##### 核心示意图

![DaDianNao node 与 tile 架构图](https://zhifeiding.github.io/assets/images/cambricon/7.png)
*图：DaDianNao 节点和 tile 的组织结构，展示 NFU、NBin/NBout、eDRAM bank、central eDRAM 和片上互联；图片为公开论文学习笔记对原论文图的转载，原始设计来自 MICRO 2014 论文，PDF 可见：https://www.eecg.utoronto.ca/~moshovos/000/lib/exe/fetch.php?media=wiki%3Aaca2017%3Adadiannao.pdf。*

##### 算法伪代码

```python
# DaDianNao: 权重常驻各节点 eDRAM，输入神经元在节点间广播，输出部分和逐步累加
for layer in network.layers:
    partition_synapses_across_nodes(layer.weights, nodes)
    broadcast(layer.input_neurons, to=nodes)

    for node in nodes_in_mesh_order:
        for tile in node.tiles:
            x = tile.NBin.load(layer.input_neurons)
            w = tile.eDRAM.read_synapse_partition()
            partial = tile.NFU.compute(w, x)       # 局部矩阵-向量/卷积块
            tile.NBout.accumulate(partial)

        node_sum = node.fat_tree_reduce(tile.NBout)
        forward_to_next_node(node_sum)             # computing-and-forwarding

    layer.output_neurons = apply_activation(global_reduce(nodes))
```

DaDianNao 解决的是 DianNao 放大后的核心矛盾：单核 NFU 已经能高速消耗权重，但如果每个周期都从外部 DRAM 喂入 16×16 个 16-bit synapse，带宽需求会极高。论文指出高吞吐 NFU 对突触带宽的需求达到数百 GB/s 量级，通用内存系统难以低功耗满足。因此 DaDianNao 反过来让权重尽量不移动，把 synapses 分散放入每个 tile 附近的 eDRAM。

对一个全连接层，DianNao 式计算仍是：

$$
y_n = f\left(\sum_i w_{n,i}x_i\right)
$$

DaDianNao 把权重按节点和 tile 切分后，输出变成分布式部分和：

$$
y_n =
f\left(
\sum_{m=0}^{M-1}
\sum_{i \in \mathcal{P}_m}
w_{n,i}^{(m)}x_i
\right)
$$

其中 \(\mathcal{P}_m\) 是第 \(m\) 个节点保存的输入/权重分片。这样移动的是 \(x_i\) 和 partial sum，而不是庞大的 \(w_{n,i}\)。当权重可复用多次时，这个转置的数据流显著降低了主存压力。

eDRAM 是架构权衡的中心。它比 SRAM 密度高，适合在芯片上放几十 MB 的突触，但读写延迟、刷新和破坏性读出比 SRAM 更复杂。DaDianNao 因此把 eDRAM 分散成多个 bank，并靠 tile 本地 NFU 消耗相邻权重，减少长距离片上走线。一个典型 node 的存储容量可表示为：

$$
C_{\text{node}} = 16 \times 2\ \text{MB} + 4\ \text{MB}
 = 36\ \text{MB}
$$

多节点互联承担的是神经元和 partial sum 的移动。论文中的 machine 由多个 node 通过二维 mesh 连接，node 内部用 fat-tree 汇聚 tile 结果。computing-and-forwarding 的直觉是：一个节点收到输入神经元后立即计算本地权重贡献，并把结果继续传给下一个节点，而不是等待所有节点同步完成后再集中规约。这减少了全局 barrier，也让通信和计算重叠。

与 GPU 或 CPU 集群相比，DaDianNao 的优势来自“内存位置”而不是单纯增加乘法器。通用处理器通常让权重驻留在 DRAM/HBM，再通过 cache hierarchy 进入算术单元；DaDianNao 把权重放到每个 tile 旁边，让高复用 synapses 的访问能耗接近片上存储访问。代价是灵活性下降：模型必须被映射到固定 tile/eDRAM 容量和 mesh 传输模式上，稀疏、不规则或超出片上容量的网络会削弱优势。

训练支持体现了它不是只做前向推理。反向传播中的梯度计算本质上仍是矩阵-向量/矩阵-矩阵式累加，只是数据流方向和写回对象不同；DaDianNao 通过 NFU 可配置流水和 eDRAM 写回支持权重更新。但从现代视角看，DaDianNao 更像“近存 NPU 集群”的早期原型：它预见了后来 HBM、片上 SRAM、wafer-scale engine 和 AI ASIC 都在追求的同一原则，即让权重和计算尽量物理靠近。

> 💡 关键：DaDianNao 的核心不是把 DianNao 简单复制 16 份，而是改变数据流方向，让权重静止、神经元移动，从系统层面压低最昂贵的外部访存。

#### 🧪 练习题

```yaml
question: "DaDianNao 相比 DianNao 最核心的架构变化是什么？"
options:
  - "把大量突触权重保存在节点内 eDRAM，让神经元和部分和在节点间流动"
  - "完全取消片上存储，所有权重每周期从 DRAM 读取"
  - "把神经网络计算改成 CPU 标量指令"
  - "只支持非线性激活函数，不支持矩阵乘法"
answer: 0
explain: "DaDianNao 的主要创新是权重常驻近计算 eDRAM，减少外部 DRAM 带宽和能耗；节点间主要移动输入神经元和输出部分和。"
```
