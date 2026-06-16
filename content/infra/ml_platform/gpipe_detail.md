### 流水线并行 (GPipe)

```yaml
id: gpipe
name: GPipe
full_name: 流水线并行 (GPipe)
year: '2019'
org: Google Brain
paper_url: https://arxiv.org/abs/1811.06965
category: training_platform
parent: tensorflow
motivation: 通过微批次实现流水线并行，开创性工作
```

#### 📝 一句话总结

GPipe 提出一种通用的 micro-batch pipeline parallelism：把顺序神经网络按层切成多个 stage 放到不同加速器上，再把一个 mini-batch 拆成多个 micro-batch 填充流水线。它在保持同步梯度更新语义的同时提高多设备利用率，并用 activation rematerialization 缓解巨型模型训练的显存压力。

#### 🎯 核心要点

- 将网络视为层序列，把连续层合并成 cell/stage，并把每个 stage 放到一个加速器上
- 使用 batch splitting：一个 mini-batch 被拆成多个 micro-batch，前向和反向跨 stage 流水执行
- 对一个 mini-batch 内所有 micro-batch 累积梯度，最后只做一次同步参数更新
- 避免 PipeDream 式异步流水线的 weight staleness，不需要维护多版本权重来校正梯度
- 通过 rematerialization/checkpointing 只保存分区边界激活，反向时重算 stage 内部激活以节省显存
- 分区目标是让各 stage 计算成本尽量均衡，减少流水线慢 stage 和 bubble overhead
- 跨设备通信只发生在 stage 边界传递激活/梯度，相比 SPMD 张量切分减少 all-reduce 类通信
- 论文验证了 557M 参数 AmoebaNet 和 6B 参数、128 层 multilingual Transformer 的可训练性与扩展性

#### 🔬 深入细节

![GPipe 流水线并行示意图](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/PipelineParallelism.png)
*图：GPipe 论文 Figure 2(c) 的 ar5iv 镜像。横轴是时间，纵向是不同设备；不同 micro-batch 的前向 \(F_{i,j}\) 与反向 \(B_{i,j}\) 在多个 stage 上交错执行，右侧统一做同步 Update，中间的空白区域就是 bubble。*

```python
# GPipe micro-batch 流水线训练伪代码
stages = partition_sequential_layers(model.layers, num_stages=K)
optimizers = [make_optimizer(stage.parameters()) for stage in stages]

for minibatch in loader:
    micros = split(minibatch, chunks=M)
    saved_outputs = []

    # 1. 前向流水：不同 stage 同时处理不同 micro-batch
    for micro_id, micro in enumerate(micros):
        x = micro
        for stage_id, stage in enumerate(stages):
            x = stage.forward(x, checkpoint_boundary=True)
            send_to_next_stage(stage_id, x)
        saved_outputs.append(x)

    # 2. 反向流水：反向传播时可重算 stage 内激活，减少前向缓存
    for micro_id in reversed(range(M)):
        grad = loss_grad(saved_outputs[micro_id])
        for stage_id in reversed(range(K)):
            grad = stages[stage_id].backward_with_rematerialization(grad)
            accumulate_gradients(stages[stage_id])

    # 3. 所有 micro-batch 梯度累积完成后，同步更新一次
    for opt in optimizers:
        opt.step()
        opt.zero_grad()
```

GPipe 针对的是“模型太大而单设备放不下，同时朴素模型并行又利用率很差”的问题。如果只把一个网络按层切到 4 个设备上，一个 batch 必须从 stage 0 依次经过 stage 3，任一时刻大多只有一个设备在工作；如果为了填满设备而让不同 stage 使用不同时间点的权重异步更新，又会产生 weight staleness。GPipe 的关键折中是：用 micro-batch 填满流水线，但更新仍按完整 mini-batch 同步发生。

形式化地，设模型是层序列 \(L_1,\dots,L_N\)，GPipe 将其划分为 \(K\) 个连续 cell：

$$
C_k = L_{a_k}\circ L_{a_k+1}\circ \cdots \circ L_{b_k},\quad k=1,\dots,K
$$

分区器的目标不是简单让层数相等，而是让每个 cell 的估计计算成本接近，即尽量减小 \(\operatorname{Var}(\operatorname{cost}(C_1),\dots,\operatorname{cost}(C_K))\)。原因很直接：流水线吞吐由最慢 stage 决定，某个 stage 过重会让其他设备等待，即使 micro-batch 数量足够也无法线性加速。

batch splitting 是 GPipe 的核心算法。令 mini-batch \(B\) 被拆成 \(M\) 个 micro-batch \(B_1,\dots,B_M\)。第一个 micro-batch 进入 stage 1 后，stage 0 可以立刻处理第二个 micro-batch；当流水线填满时，多个设备同时处理不同 micro-batch 的不同 stage。一次 pipeline sweep 的直觉利用率可近似看作：

$$
U \approx \frac{M}{M+K-1}
$$

其中 \(K-1\) 对应填充和排空流水线带来的 bubble。这个式子不是 GPipe 的优化目标本身，但很好地解释了论文观察：当 micro-batch 数 \(M\) 相对 stage 数 \(K\) 足够大时，bubble overhead 被摊薄；当 \(M=1\) 时就退化为朴素顺序模型并行，几乎没有流水线并发。

同步梯度更新保证了 GPipe 的训练语义接近普通 mini-batch SGD。对参数 \(\theta\)，每个 micro-batch 产生梯度 \(g_j=\nabla_\theta \ell(f_\theta(B_j))\)，GPipe 累积后再更新：

$$
g=\frac{1}{M}\sum_{j=1}^{M} g_j,\quad
\theta \leftarrow \theta-\eta g
$$

关键是所有 \(g_j\) 都基于同一版 \(\theta\) 的前向/反向计算。这样 GPipe 避免了异步流水线中常见的权重版本错位，也不需要像一些异步 pipeline 系统一样在每个设备上保存多份历史权重。代价是一次 mini-batch 的 update 要等所有 micro-batch 完成，吞吐来自流水线并发而不是异步参数更新。

显存方面，GPipe 结合 rematerialization。普通反向传播需要保存每层前向激活；当模型很深且 batch 很大时，激活内存会迅速超过设备限制。GPipe 只在 stage 边界保存必要激活，在反向时重算 stage 内部前向，从计算换内存。直觉上，若每个 stage 有 \(N/K\) 层、micro-batch 大小是 \(B/M\)，则每个设备需要常驻的中间激活随 micro-batch 缩小而下降；这就是为什么 batch splitting 与 rematerialization 必须一起看，而不是只把 batch 切小。

与 SPMD/tensor model parallelism 相比，GPipe 不把单个矩阵乘或卷积的张量维度切到多设备上，因此跨设备通信主要是 stage 边界的 activation 和 gradient，而不是每层大量 all-reduce 或 halo exchange。这让 GPipe 在没有高速互连时也能工作得相对稳健。与 PipeDream 类异步 pipeline 相比，GPipe 的优点是优化更稳定、权重一致性简单；缺点是只适合能表达为主要顺序层序列的网络，并且要求单层本身能放进一个加速器，BatchNorm 这类跨 batch 统计也需要额外处理 micro-batch 与 mini-batch 统计之间的差异。

论文实验展示的是“通用基础设施”的价值，而不是某个架构专用 trick。GPipe 让 AmoebaNet 在 ImageNet 上扩到 557M 参数并达到强结果，也让 128 层、6B 参数 multilingual Transformer 在 100 多种语言任务上训练成为可能。更重要的启发是：当模型深度天然形成层序列时，流水线并行可以与数据并行叠加，成为后来大模型训练系统中 pipeline parallelism、activation checkpointing 和 micro-batch scheduling 的基础组成。

> 💡 关键：GPipe 的本质是用 micro-batch 并发隐藏按层模型并行的设备空闲时间，同时用同步梯度更新保持训练语义稳定。

#### 🧪 练习题

```yaml
question: "GPipe 为什么选择在所有 micro-batch 完成后再统一更新参数？"
options:
  - "为了让每个 micro-batch 的梯度基于同一版权重，避免流水线异步更新带来的 weight staleness"
  - "为了完全取消反向传播，只运行前向推理"
  - "为了让每个 stage 持有模型的完整副本"
  - "为了把跨设备通信变成每层 all-reduce"
answer: 0
explain: "GPipe 通过累积一个 mini-batch 内所有 micro-batch 的梯度并同步更新，保持与普通 mini-batch SGD 接近的语义。"
```
