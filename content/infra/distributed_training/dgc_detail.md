### Deep Gradient Compression: 深度梯度压缩

```yaml
id: dgc
name: Deep Gradient Compression
full_name: 深度梯度压缩 (Deep Gradient Compression)
year: '2018'
org: Tsinghua/MIT
paper_url: https://arxiv.org/abs/1712.01887
category: comm
parent: —
motivation: 动量校正+局部梯度裁剪99.9%压缩率
```

#### 📝 一句话总结

Deep Gradient Compression 通过 Top-k 梯度稀疏化配合动量校正、局部梯度裁剪、动量因子掩码和 warm-up，在不明显损失精度的情况下将分布式 SGD 的梯度通信压缩到 0.1% 量级。

#### 🎯 核心要点

- 发现分布式训练中绝大部分梯度通信是冗余的，只传输绝对值最大的少量梯度即可保持训练效果。
- 使用 residual accumulation/error feedback，把未发送的小梯度留在本地累积，避免长期偏置。
- Momentum correction 让动量先在本地累积再参与稀疏选择，修正“只压缩裸梯度”破坏动量轨迹的问题。
- Local gradient clipping 在压缩前裁剪本地梯度，降低个别 worker 的异常大梯度对 Top-k 选择的影响。
- Momentum factor masking 清除已发送坐标上的动量残留，配合 warm-up 从低压缩率逐渐过渡到 99.9% 稀疏。

#### 🔬 深入细节

##### 核心示意图

![DGC 梯度压缩效果概览](https://ar5iv.labs.arxiv.org/html/1712.01887/assets/x1.png)
*图：DGC 通过极高稀疏率显著降低每轮需要传输的梯度数据量。*

##### 算法伪代码

```python
# Deep Gradient Compression on each worker
for step in range(T):
    g = backward(model, batch)
    g = local_gradient_clip(g, clip_norm)

    # momentum correction: momentum is accumulated before sparsification
    u = momentum * u + g
    v = v + u                       # residual / gradient accumulation

    mask = abs(v) >= topk_threshold(abs(v), k)
    sparse_update = v[mask]
    all_reduce_sparse(mask, sparse_update)

    # clear transmitted coordinates, keep unsent residuals
    v[mask] = 0
    u[mask] = 0                     # momentum factor masking
    optimizer_apply(aggregated_sparse_update)
```

##### 方法解释

朴素 Top-k 梯度压缩的问题是收敛容易掉点。若每轮只发送最大的 \(k\) 个坐标，其余梯度被直接丢弃，优化方向会系统性偏向“短期大幅变化”的参数。DGC 保留本地残差 \(v_t\)，未发送的坐标继续累积，直到其幅度足够大再发送。这相当于 error feedback：

$$
v_t = v_{t-1} + g_t,\quad \Delta_t = \mathrm{TopK}(v_t),\quad v_t \leftarrow v_t - \Delta_t
$$

动量校正进一步解决 momentum SGD 的特殊问题。标准动量为 \(u_t = m u_{t-1}+g_t\)，如果先稀疏化 \(g_t\) 再更新动量，未发送坐标的动量会被破坏。DGC 先在本地计算完整动量，再对动量累积量做 Top-k，这让稀疏更新更接近未压缩 SGD 的轨迹。

局部梯度裁剪和 momentum factor masking 是稳定性补丁。前者防止单个 worker 的异常 batch 产生过大的稀疏坐标，后者在某坐标已经发送后清除该坐标的动量项，避免同一方向的旧动量在下一轮重复触发发送。Warm-up 则从较低压缩率逐步提高到目标稀疏率，使训练早期还未稳定的表示不会被过强压缩扰动。

> ⚠️ 注意：DGC 的通信省的是带宽，不是完全消除同步。每轮仍要交换稀疏索引和值，并且各 worker 的 Top-k 索引可能不同，因此实现通常比 dense all-reduce 更复杂。

##### 与传统方法的区别

梯度量化方法降低每个坐标的 bit 数，DGC 则减少坐标数量；参数服务器式稀疏更新容易受中心节点瓶颈影响，DGC 面向数据并行训练的梯度交换过程；随机丢弃梯度虽然便宜，但没有 Top-k 的重要性选择。DGC 的贡献在于把 Top-k 稀疏化与优化器状态修正结合，使 270x 到 600x 压缩率在 CNN、RNN 和语言模型任务上仍能维持精度。

#### 🧪 练习题

```yaml
question: "DGC 中 momentum factor masking 的作用是什么？"
options:
  - "把所有未发送梯度立即置零"
  - "在坐标被发送后清除该坐标动量，避免旧动量重复触发稀疏更新"
  - "将稀疏梯度转换成 8-bit 表示"
  - "动态改变 pipeline stage 数量"
answer: 1
explain: "DGC 对已发送坐标清除动量残留，使后续 Top-k 选择不会被已经应用过的旧动量主导。"
```
