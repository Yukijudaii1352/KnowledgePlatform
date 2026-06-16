### 高效推理引擎 (Efficient Inference Engine)

```yaml
id: eie
name: EIE
full_name: 高效推理引擎 (Efficient Inference Engine)
year: '2016'
org: Stanford
paper_url: —
category: efficiency
parent: deep_compression
motivation: 首个针对压缩稀疏模型的专用硬件加速器
```

#### 📝 一句话总结

EIE 提出了直接在 Deep Compression 生成的稀疏、权重共享模型上执行推理的专用硬件，解决了通用 CPU/GPU 难以高效处理相对索引、码本查表和不规则稀疏访存的问题。它把模型放入片上 SRAM，并用 PE 阵列、非零激活广播和压缩 CSC 读出机制加速全连接层的稀疏矩阵向量乘。

#### 🎯 核心要点

- 面向 Deep Compression 输出：剪枝后的稀疏权重、4-bit 权重共享索引、相对行索引共同构成硬件直接读取的压缩模型
- 计算核心是 FC 层稀疏矩阵向量乘：只处理非零权重和 ReLU 后的非零输入激活，跳过零激活对应的整列
- PE 阵列并行化：每个 PE 保存矩阵的一组交错列/行切片，局部累加输出激活，降低跨 PE 通信
- Leading Non-zero Detection (LNZD) 树：从各 PE 的激活队列中选择下一个非零输入，并通过 H-tree 广播给所有 PE
- 间接权重查表：稀疏矩阵条目只保存权重码本索引和相对行偏移，算术单元查表恢复 16-bit 定点权重后执行 MAC
- 片上 SRAM 优先：压缩后 AlexNet、VGG 等 FC 权重可驻留片上，避免高能耗 DRAM 访问
- 关键收益叠加：片上 SRAM、权重稀疏、权重共享和零激活跳过分别贡献能耗/吞吐提升

#### 🔬 深入细节

##### 核心示意图

![EIE 面向压缩 DNN 的推理流程](https://ar5iv.labs.arxiv.org/html/1602.01528/assets/x1.png)
*图 1：EIE 论文公开 ar5iv 版本中的总体流程图，展示压缩深度网络模型进入专用推理引擎执行机器学习应用。论文公开版本见 https://arxiv.org/abs/1602.01528。*

![EIE LNZD 节点与处理单元架构](https://ar5iv.labs.arxiv.org/html/1602.01528/assets/x4.png)
*图 2：EIE 论文 Figure 4，左侧是 Leading Non-zero Detection 节点，右侧是 Processing Element。图源为 ar5iv 对论文图的公开转换。*

##### 算法伪代码

```python
# EIE 稀疏 FC 层推理伪代码：y = f(Wx + b)
# W 使用 interleaved CSC；每个条目保存 (relative_row, weight_code)

for pe in PE_array:
    pe.output_acc[:] = bias_slice(pe)
    pe.activation_queue = collect_nonzero_inputs(x_slice(pe))

while any(pe.activation_queue.not_empty() for pe in PE_array):
    # LNZD tree 选择全局下一个非零输入激活，并广播给所有 PE
    col, x_col = leading_nonzero_detect_and_broadcast(PE_array)

    for pe in PE_array:
        start, end = pe.pointer_sram[col], pe.pointer_sram[col + 1]
        row = 0
        for ptr in range(start, end):
            rel_row, weight_code = pe.sparse_sram[ptr]
            row += rel_row

            # 4-bit 码本索引恢复 16-bit 定点权重
            w = pe.codebook[weight_code]
            pe.output_acc[row] += w * x_col

for pe in PE_array:
    y_slice = relu_or_layer_activation(pe.output_acc)
    write_next_layer_activations(pe, y_slice)
```

##### 动机与背景

Deep Compression 已经把大规模 DNN 的全连接层压缩到可以放入片上 SRAM 的规模，但这并不自动等价于高效推理。压缩模型带来三类通用处理器不擅长的模式：矩阵变稀疏后访存不连续，行索引变成相对偏移后需要逐项累加，权重共享又把每个权重变成码本索引，需要额外查表。CPU/GPU 的 SIMD/SIMT 执行更喜欢规则、连续、批量的矩阵乘；当 batch size 为 1 的实时推理需要执行稀疏 GEMV 时，线程负载不均和索引开销会吞掉大量理论收益。

EIE 的目标不是重新提出压缩算法，而是把压缩后的表示变成硬件原生数据格式。对一个全连接层，核心计算仍是：

$$
y = f(Wx + b)
$$

其中 \(W\) 是剪枝后的稀疏矩阵，\(x\) 是上一层 ReLU 后的激活向量，\(b\) 是偏置。因为 ReLU 会产生大量零激活，若 \(x_j = 0\)，则整列 \(W_{:,j}\) 对输出没有贡献；EIE 通过非零激活检测只广播 \(x_j \ne 0\) 的列索引，让所有 PE 跳过零激活列对应的稀疏权重读出。

##### 压缩表示与 PE 数据流

EIE 使用适配硬件的交错 CSC 表示。普通 CSC 对每列保存非零值和行索引；EIE 将非零值替换为 4-bit 权重码本索引，并将行号改为相对偏移：

$$
\text{entry}_k = (\Delta r_k,\; c_k), \qquad
w_k = \mathrm{codebook}[c_k]
$$

这里 \(\Delta r_k\) 是相对上一个非零位置的行偏移，\(c_k\) 是共享权重码本索引。一个稀疏矩阵 SRAM 条目可由 4-bit 行偏移和 4-bit 权重索引组成，算术单元读取后先累加得到目标输出行，再查表恢复定点权重。若两个相邻非零之间距离超过偏移字段可表示范围，则插入 padding zero 来延续相对索引；这会带来少量冗余计算，但让硬件条目保持固定宽度。

PE 阵列采用交错切分而不是简单块切分，目的是让每个 PE 看到的非零分布更均衡。每个 PE 保存自己负责的权重切片、指针数组、权重码本和本地输出累加器。广播到来的非零激活 \((j, x_j)\) 会触发所有 PE 读取自己切片中第 \(j\) 列的非零条目，各 PE 独立完成 \(w_{ij}x_j\) 并累加到本地输出寄存器。这样，输入激活广播是全局通信，输出累加保持局部，避免每个乘加都跨 PE 汇总。

##### LNZD、队列与零激活跳过

EIE 的 Leading Non-zero Detection 树解决的是“谁来提供下一个非零激活”的调度问题。每个 PE 维护激活队列，局部记录自己持有的非零输入；树形 LNZD 节点从子节点候选中选出下一项，再由根节点通过 H-tree 广播给所有 PE。这个结构让非零激活发现和广播的线长随 PE 数量扩展得更平滑，也避免中央控制器逐一扫描完整激活向量。

零激活跳过的收益可用稀疏矩阵向量乘的工作量表达。稠密 FC 层需要约 \(mn\) 次乘加；若权重非零率为 \(\rho_W\)，激活非零率为 \(\rho_x\)，理想有效乘加约为：

$$
\mathrm{MAC}_{\mathrm{EIE}} \approx \rho_W \rho_x mn
$$

这解释了为什么 EIE 特别适合 batch size 为 1 的延迟敏感推理：没有大 batch 来摊薄稀疏索引开销时，直接避免无效列和无效权重访问比把稀疏矩阵转回稠密计算更有效。论文报告中，片上 SRAM、稀疏性、权重共享和零激活跳过是相互叠加的能效来源。

##### 与通用 CPU/GPU 和传统加速器的区别

CPU 上的稀疏 BLAS 通常要处理通用 CSR/CSC，格式灵活但每个非零都携带较高索引开销；GPU 的 cuSPARSE 更依赖大规模并行和规则行长度，面对 FC 层单样本 GEMV 时容易出现线程束内负载不均。EIE 把格式约束收紧到压缩 DNN 的固定场景：4-bit 码本、相对索引、列指针、本地输出寄存器和固定宽 SRAM 读出，使索引处理成为流水线的一部分。

与只做稠密矩阵乘的早期 DNN 加速器相比，EIE 的核心创新是“不解压再计算”。如果先把压缩权重恢复成稠密矩阵，就会重新引入 DRAM/SRAM 容量和带宽压力；EIE 则在压缩域中读取码本索引和偏移，边解码边乘加。代价是硬件更专用，主要覆盖剪枝加权重共享后的 FC/GEMV 型工作负载；收益是在当时的实时推理场景中获得远高于通用处理器的能效。

> 💡 关键：EIE 的价值来自算法表示和硬件数据通路共同设计。Deep Compression 负责让模型小而稀疏，EIE 负责让“小而稀疏”不再变成通用硬件上的不规则执行负担。

#### 🧪 练习题

```yaml
question: "EIE 为什么要用 Leading Non-zero Detection (LNZD) 树？"
options:
  - "在每个 PE 内训练新的权重码本"
  - "从分布式激活队列中选择非零输入并广播，跳过 ReLU 产生的零激活列"
  - "把 4-bit 权重索引恢复成 32-bit 浮点权重"
  - "将全连接层转换成卷积层以复用 Winograd 算法"
answer: 1
explain: "LNZD 树负责发现并广播下一个非零输入激活，使 PE 阵列只读取该列的稀疏权重；零激活对应的整列计算可以直接跳过。"
```
