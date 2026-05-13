### 联邦平均 (Federated Averaging, FedAvg)

```yaml
id: fedavg
name: FedAvg
full_name: 联邦平均 (Federated Averaging)
year: 2017
org: Google
paper_url: https://proceedings.mlr.press/v54/mcmahan17a.html
category: privacy
parent: dp_sgd
motivation: 数据不动模型动实现分布式协作学习
```

#### 📝 一句话总结

FedAvg 提出了联邦学习范式下的通信高效优化算法，通过让客户端执行多轮本地 SGD 后再聚合模型参数，相比朴素联邦 SGD 将通信轮次降低 10-100 倍，同时对非独立同分布（Non-IID）和不平衡数据保持鲁棒性。

#### 🎯 核心要点

- 提出联邦学习（Federated Learning）问题设定：数据分散在大量移动设备上，不可集中存储，具有 Non-IID、不平衡、大规模、通信受限四大特征
- 核心算法 FedAvg：客户端执行多个本地 epoch（E）的 SGD 训练，服务器按数据量加权平均聚合模型
- 三个关键超参数：客户端采样比例 \(C\)、本地训练轮数 \(E\)、本地 mini-batch 大小 \(B\)
- FedSGD 作为特殊情况：\(B = \infty, E = 1\) 等价于分布式梯度下降
- 共享初始化（Shared Initialization）是模型平均有效的关键前提
- 在 MNIST（2NN/CNN）、Shakespeare（LSTM）、CIFAR-10（CNN）及大规模社交网络语言模型上验证有效性
- 相比 FedSGD 实现 10-100× 通信效率提升，在 CIFAR-10 上相比标准 SGD 实现 50-64× 加速

#### 🔬 深入细节

![FedAvg 框架示意图](https://production-media.paperswithcode.com/methods/fedavg.png)
*图：FedAvg 联邦学习框架——服务器协调多个客户端进行本地训练与全局聚合*

```python
# FedAvg 算法伪代码 (Algorithm 1)
# === 服务器端 ===
def server_execute():
    w = initialize_global_model()
    for each_round t = 1, 2, ...:
        m = max(C * K, 1)  # C: 客户端采样比例, K: 总客户端数
        S_t = random_sample(m, clients)  # 随机选取 m 个客户端
        for each client k in S_t (in parallel):
            w_k = client_update(k, w)
        # 加权平均聚合
        w = sum(n_k / n * w_k for k in S_t)  # n_k: 客户端k数据量, n: 总数据量

# === 客户端 k ===
def client_update(k, w):
    B_k = split(P_k, batch_size=B)  # 将本地数据分为大小为B的batch
    for epoch in range(E):           # 本地训练E个epoch
        for batch b in B_k:
            w = w - η * gradient(loss(w, b))  # 本地SGD更新
    return w
```

**动机与背景**

传统分布式机器学习假设数据可集中存储在数据中心，通过数据并行加速训练。然而现实中，大量有价值的训练数据产生于用户移动设备（手机、平板），出于隐私保护、法规合规和通信成本考虑，这些数据不应也不能上传至中心服务器。FedAvg 提出的联邦学习范式直接在数据产生的设备上进行模型训练，仅传输模型更新，从根本上解决了数据隐私与分布式学习的矛盾。

联邦学习面临的核心挑战包括：
1. **Non-IID 数据**：每个用户的本地数据反映其个人使用习惯，不代表全局分布
2. **不平衡性**：不同用户产生的数据量差异巨大
3. **大规模参与者**：客户端数量远超每个客户端的数据量
4. **通信瓶颈**：上行带宽有限（通常 1MB/s 或更低），通信成本远高于计算成本

**核心机制**

FedAvg 的核心思想是**增加本地计算量来换取通信效率**。具体而言，算法通过两个维度增加本地计算：

1. **增大本地 epoch 数 \(E\)**：每个客户端在本地数据上训练多个完整 epoch，而非仅计算一次梯度
2. **减小 mini-batch 大小 \(B\)**：更小的 batch 意味着每个 epoch 内更多的梯度更新步骤

服务器端的聚合采用加权平均：

$$w_{t+1} = \sum_{k=1}^{K} \frac{n_k}{n} w_{t+1}^k$$

其中 \(n_k\) 为客户端 \(k\) 的本地数据量，\(n = \sum_k n_k\) 为参与聚合的总数据量。这一加权方式等价于对全局损失函数的无偏估计：

$$f(w) = \sum_{k=1}^{K} \frac{n_k}{n} F_k(w), \quad F_k(w) = \frac{1}{n_k} \sum_{i \in \mathcal{P}_k} f_i(w)$$

> 💡 关键：当 \(B = \infty\)（即使用全部本地数据作为一个 batch）且 \(E = 1\) 时，FedAvg 退化为 FedSGD——每个客户端仅计算一次全量梯度，服务器聚合后等价于集中式 SGD 的一步更新。

**为什么模型平均有效？**

论文通过实验（Figure 1）揭示了一个关键洞察：**共享初始化使得模型平均有效**。从相同初始点出发的两个模型，即使在不同数据子集上训练，其参数空间中的路径足够接近，使得简单的参数平均能产生有意义的模型。这与随机初始化的模型平均形成鲜明对比——后者由于参数置换对称性（permutation symmetry），平均后的模型性能极差。

> ⚠️ 注意：当本地训练轮数 \(E\) 过大时，各客户端模型可能偏离过远（client drift），导致聚合后模型质量下降甚至发散。论文建议在实践中适当衰减本地计算量。

**训练流程与通信模式**

每一轮通信的流程为：
1. 服务器选取 \(\lceil C \cdot K \rceil\) 个客户端（\(C\) 为采样比例）
2. 服务器将当前全局模型 \(w_t\) 下发给选中的客户端
3. 各客户端并行执行本地 SGD 训练（\(E\) 个 epoch，batch 大小为 \(B\)）
4. 客户端将更新后的模型 \(w_{t+1}^k\) 上传至服务器
5. 服务器执行加权平均得到新的全局模型 \(w_{t+1}\)

每轮的通信量为 \(O(|w|)\)（模型参数量），与本地计算量 \(E \cdot \lceil n_k / B \rceil\) 无关，因此增加本地计算不增加通信开销。

**与传统方法的区别**

| 方法 | 本地计算 | 通信轮次 | 数据假设 |
|------|---------|---------|---------|
| 并行 SGD (同步) | 1 次梯度计算 | 每步通信 | IID 划分 |
| FedSGD | 1 次全量梯度 | 每步通信 | 允许 Non-IID |
| **FedAvg** | **E 个 epoch** | **大幅减少** | **允许 Non-IID** |
| ADMM/DANE | 求解子问题 | 较少 | 凸优化假设 |

FedAvg 的关键优势在于：(1) 无需凸性假设，直接适用于深度网络；(2) 实现极其简单，仅需标准 SGD 加参数平均；(3) 通信效率提升显著且稳定。

**实验验证**

在 CIFAR-10 上，FedAvg（\(C=0.1, E=5, B=50\)）仅需 2000 轮通信即达到 85% 测试精度，而标准 SGD 需要 197,500 次 mini-batch 更新，FedSGD 在相同精度目标下也需要数倍于 FedAvg 的通信轮次。在大规模社交网络下一词预测任务（50 万+客户端）上，FedAvg 同样展现出优于 FedSGD 的收敛速度和最终精度。

#### 🧪 练习题

```yaml
question: "FedAvg 相比 FedSGD 实现通信效率提升的核心机制是什么？"
options:
  - "使用更高效的梯度压缩算法减少每轮传输数据量"
  - "增加客户端本地训练轮数(E>1)，减少达到目标精度所需的通信轮次"
  - "采用异步通信模式避免等待慢客户端"
  - "使用动量优化器加速服务器端模型聚合"
answer: 1
explain: "FedAvg 的核心创新是让客户端执行多个本地 epoch（E>1）的 SGD 训练后再通信，用增加本地计算换取通信轮次的大幅减少，而每轮传输的数据量（完整模型参数）并未改变。"
```