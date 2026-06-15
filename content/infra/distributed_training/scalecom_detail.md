### ScaleCom: 可扩展通信压缩

```yaml
id: scalecom
name: ScaleCom
full_name: 可扩展通信压缩 (ScaleCom)
year: '2020'
org: IBM
paper_url: https://arxiv.org/abs/2004.13334
category: comm
parent: gradient_sparsification
motivation: 可扩展稀疏梯度压缩框架
```

#### 📝 一句话总结

ScaleCom 提出循环本地 Top-k（CLT-k）和低通滤波残差更新，使稀疏梯度压缩可以兼容 all-reduce，并解决 worker 数增加时稀疏索引发散导致的通信量线性膨胀。

#### 🎯 核心要点

- 任务中的 `paper_url` 指向的 arXiv 条目与 ScaleCom 不匹配；本文基于 ScaleCom 真实论文页 `https://arxiv.org/abs/2104.11125` 和旧路径参考完成，YAML 保持任务元信息不变。
- 现有 Top-k 每个 worker 选择不同索引，聚合后非零坐标数随 worker 数 \(n\) 增长，无法高效使用 all-reduce。
- CLT-k 每轮选择一个 leader，由 leader 的 Top-k 索引广播给所有 worker，使所有 worker 在同一稀疏 mask 上通信。
- 低通滤波器对 error feedback memory 做指数衰减，降低大 batch/大学习率下残差噪声累积。
- 在视觉、语言、语音任务中报告 65-400x 压缩率，最多 64 learners 和 8-12x 更大 batch 下无显著精度损失。

#### 🔬 深入细节

##### 核心示意图

![ScaleCom 梯度堆积与 CLT-k 思路](https://ar5iv.labs.arxiv.org/html/2104.11125/assets/intro.png)
*图：ScaleCom 说明传统 Top-k 的 gradient build-up，以及使用统一稀疏索引后可兼容 all-reduce 的思路。*

##### 算法伪代码

```python
# ScaleCom / CLT-k on worker i
for t in range(T):
    grad = backward(model, batch_i)
    p_i = memory_i + grad

    leader = t % world_size
    if rank == leader:
        index = topk_indices(abs(p_i), k)
    index = broadcast(index, src=leader)

    sparse_i = gather(p_i, index)              # all workers use the same coordinates
    sparse_avg = all_reduce_sum(sparse_i) / world_size

    residual = p_i
    residual[index] = 0
    memory_i = (1 - beta) * memory_i + beta * residual
    optimizer_step(index, sparse_avg)
```

##### 方法解释

标准 Top-k 稀疏化在小规模下有效，但在大规模 all-reduce 场景会出现 gradient build-up。假设每个 worker 发送 \(k\) 个坐标，如果索引集合彼此不同，聚合后的非零坐标接近 \(nk\)，通信量随 worker 数线性增长。更麻烦的是，NCCL all-reduce 假设每个 rank 的张量布局一致，而不同稀疏索引会让通信退化成 gather/scatter 风格。

CLT-k 的核心是牺牲一点本地最优性，换取全局通信可扩展性。第 \(t\) 轮选择 \(t \bmod n\) 的 worker 做 leader，leader 根据自己的残差累积向量选出 Top-k 索引 \(I_t\)，所有 worker 都只发送这些坐标上的值。由于 mask 固定，压缩算子与求和可交换：

$$
\frac{1}{n}\sum_{i=1}^{n} C_{I_t}(p_i)=C_{I_t}\left(\frac{1}{n}\sum_{i=1}^{n}p_i\right)
$$

这样 sparse values 可以直接 all-reduce，通信复杂度近似与 worker 数无关。论文依赖的直觉是大 batch 同步训练中不同 worker 的梯度分布相似，leader 的 Top-k 对其他 worker 也有足够代表性。

低通滤波器处理另一个系统性问题：大 batch 训练常配合学习率线性放大，残差 memory 中会积累更多噪声。ScaleCom 不使用标准 \(m_{t+1}=p_t-C(p_t)\)，而是：

$$
m_{t+1}=(1-\beta)m_t+\beta(p_t-C_{I_t}(p_t))
$$

其中 \(\beta<1\) 会衰减历史残差，降低 worker 间 memory 发散。若 \(\beta=1\)，它退化为标准 error feedback。

> 💡 关键：ScaleCom 的目标不是选择“每个 worker 自己最重要的 k 个坐标”，而是选择“全体 worker 能以 all-reduce 高效同步的一组共同坐标”。

##### 与 DGC/Top-k 的区别

DGC 强调保持压缩后 SGD 精度，主要处理动量和 warm-up；ScaleCom 进一步关注大规模通信原语可扩展性。传统 Top-k 的通信集合随 worker 数膨胀，ScaleCom 通过 leader 统一索引把稀疏通信重新变成 all-reduce 友好的 dense-on-index 形式，适合在现有高性能 collective 后端上实现。

#### 🧪 练习题

```yaml
question: "ScaleCom 中 CLT-k 为什么能兼容 all-reduce？"
options:
  - "所有 worker 使用 leader 广播的同一组 Top-k 索引，稀疏张量布局一致"
  - "每个 worker 随机选择不同坐标以增加探索"
  - "它完全取消了 error feedback"
  - "它把梯度压缩为 1-bit 符号"
answer: 0
explain: "统一索引让各 rank 发送相同位置的值，压缩与求和可交换，因此可使用 all-reduce。"
```
