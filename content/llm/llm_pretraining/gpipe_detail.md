### GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)

```yaml
id: gpipe
name: GPipe
full_name: "GPipe (GPipe: Easy Scaling with Micro-Batch Pipeline)"
year: "2019"
org: Google
paper_url: "https://arxiv.org/abs/1811.06965"
category: distributed
parent: "—"
motivation: "流水线并行微批次切分"
```

#### 📝 一句话总结

GPipe 提出了一套面向任意顺序神经网络的流水线模型并行方法，通过把 mini-batch 切成 micro-batch 并在多个加速器上的模型分区之间同步流水执行，解决单卡显存无法容纳大模型以及朴素模型并行设备利用率低的问题。

#### 🎯 核心要点

- 将可表示为层序列的网络切成多个连续 cell，每个 cell 放到一个 accelerator 上执行。
- 使用 micro-batch pipeline：把一个 mini-batch 切成多个 micro-batch，让不同分区同时处理不同 micro-batch。
- 采用同步 mini-batch 梯度下降：所有 micro-batch 的梯度累积完以后再统一更新参数，避免异步流水线的 weight staleness。
- 在分区边界自动插入通信，只传递 activation tensor 和反向梯度，通信量主要由边界张量决定。
- 使用 rematerialization / recomputation 降低激活显存，前向只保留边界激活，反向时在分区内部重算中间激活。
- 通过基于计算代价的分区策略平衡每个 cell 的耗时，减少流水线 bubble 和 load imbalance。
- 实验展示了 557M 参数 AmoebaNet 在 ImageNet-2012 上达到 84.4% top-1，以及 128 层、6B 参数 multilingual Transformer 覆盖 103 种语言。

#### 🔬 深入细节

![GPipe micro-batch pipeline 示意图](https://ar5iv.labs.arxiv.org/html/1811.06965/assets/PipelineParallelism.png)
*图：论文 Figure 2(c) 的流水线并行面板。横向表示时间，不同颜色表示不同模型分区，`F` 是 forward，`B` 是 backward，中央空白是 pipeline bubble。*

GPipe 的出发点不是为某一种网络手写并行规则，而是抓住一个更通用的结构：许多深度网络都可以看成有序层序列。设模型由层 \(L_1, L_2, \dots, L_N\) 组成，GPipe 把连续层合并成 \(K\) 个 cell：\(C_1, C_2, \dots, C_K\)，并把第 \(k\) 个 cell 放在第 \(k\) 个加速器上。对第 \(m\) 个 micro-batch，其前向传播可以写成：

$$
h_k^{(m)} = C_k(h_{k-1}^{(m)}; \theta_k), \quad k=1,\dots,K
$$

朴素模型并行会让设备按层串行等待：第 2 个分区必须等第 1 个分区完成同一个 batch 的前向，第 1 个分区处理完后又空闲，反向时也类似。GPipe 的关键改动是把原 mini-batch \(B\) 切成 \(M\) 个 micro-batch \(B^{(1)},\dots,B^{(M)}\)。当 \(C_2\) 在处理 \(B^{(1)}\) 的前向时，\(C_1\) 可以立即处理 \(B^{(2)}\)，于是设备利用率显著提高。pipeline 的近似利用率常被理解为 \(\frac{M}{M+K-1}\)：分区数 \(K\) 越多，启动和排空阶段的 bubble 越大；micro-batch 数 \(M\) 越多，bubble 被摊薄得越充分。

```python
# GPipe 训练一步的核心逻辑，省略具体调度队列和通信实现
partitions = partition_sequential_layers(model.layers, num_cells=K, balance_by_cost=True)
micro_batches = split(minibatch, chunks=M)

# 1. 流水线前向：不同 cell 同时处理不同 micro-batch
for clock in range(M + K - 1):
    for k in range(K):
        m = clock - k
        if 0 <= m < M:
            h[k + 1][m] = partitions[k].forward(h[k][m])

# 2. 计算每个 micro-batch 的 loss
loss = sum(loss_fn(h[K][m], target[m]) for m in range(M)) / M

# 3. 反向流水线：按相反方向传回梯度，并对每个分区累积梯度
for clock in range(M + K - 1):
    for k in reversed(range(K)):
        m = clock - (K - 1 - k)
        if 0 <= m < M:
            grad_h[k][m], grad_theta[k] += partitions[k].backward(grad_h[k + 1][m])

# 4. 同步更新：所有 micro-batch 都完成后才更新一次
optimizer.step(accumulated_gradients=grad_theta)
optimizer.zero_grad()
```

同步更新是 GPipe 与一些异步 pipeline 方法的关键差异。对一个 mini-batch 的目标函数可写为：

$$
\mathcal{L}(\theta)=\frac{1}{M}\sum_{m=1}^{M}\ell\left(C_K\circ C_{K-1}\circ\cdots\circ C_1(x^{(m)}), y^{(m)}\right)
$$

GPipe 在所有 micro-batch 的梯度 \(\nabla_\theta \ell_m\) 累积后执行一次参数更新：

$$
\theta \leftarrow \theta - \eta \cdot \frac{1}{M}\sum_{m=1}^{M}\nabla_\theta \ell_m
$$

因此，同一个 mini-batch 内所有 micro-batch 都看到同一版本的参数。这样做牺牲了部分调度自由度，但换来与普通 mini-batch SGD 一致的更新语义；增加分区数或 micro-batch 数不会改变数学上的 batch gradient，只改变执行计划。这一点对于大模型预训练很重要，因为训练稳定性通常比单步吞吐更敏感。

显存优化来自 rematerialization。若每个分区在前向时缓存所有层的中间激活，activation memory 会随着分区内层数和 micro-batch 数增长。GPipe 只保存分区边界上的 activation；反向传播到某个 cell 时，再重新执行该 cell 的局部前向来恢复内部中间值，然后计算梯度。这相当于用额外计算换显存。对超大 Transformer 或 AmoebaNet，这个折中非常实用：重算增加的 FLOPs 通常小于因模型能跨卡放大而获得的收益。

GPipe 的通信也被限制在 cell 边界。第 \(k\) 个设备只需把 \(h_k^{(m)}\) 发送给第 \(k+1\) 个设备，并在反向时接收 \(\partial \mathcal{L}/\partial h_k^{(m)}\)。相比张量并行在层内频繁 all-reduce，GPipe 的通信模式更像点到点 activation 传递，容易与数据并行组合：每个数据并行副本内部做 GPipe，副本之间再同步参数梯度。

> 💡 关键：GPipe 的核心不是“把模型切开”这一件事，而是“切模型 + 切 batch + 同步累积 + 激活重算”四件事共同成立。只切模型会产生严重空闲；只切 batch 不解决单卡显存；只做流水线但异步更新会引入 staleness；只做重算则无法提升多设备利用率。

与传统数据并行相比，GPipe 解决的是单个模型无法放进一张卡的问题，而不是单纯扩大 batch 吞吐。与朴素模型并行相比，它利用 micro-batch 让多个分区同时工作。与 Mesh-TensorFlow 一类更通用的张量切分框架相比，GPipe 的假设更简单：模型可按层顺序切分即可，因此实现门槛低，但对非顺序结构、分区不均衡、跨层跳连较复杂的模型需要更仔细的 partition function。

#### 🧪 练习题

```yaml
question: "GPipe 为什么要等所有 micro-batch 的梯度累积完以后再更新参数？"
options:
  - "为了让每个 micro-batch 使用不同参数，从而增加随机性"
  - "为了保持与普通 mini-batch SGD 一致的同步梯度语义，避免同一 batch 内参数陈旧"
  - "为了减少 forward pass 的计算量"
  - "为了把所有通信都替换为广播操作"
answer: 1
explain: "GPipe 的同步更新让一个 mini-batch 内的所有 micro-batch 基于同一参数版本计算梯度，最后统一更新，避免异步 pipeline 中常见的 stale weight 问题。"
```
