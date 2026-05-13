### FedAvg — 联邦平均 (Federated Averaging)

```yaml
id: fedavg
name: FedAvg
full_name: 联邦平均 (Federated Averaging)
year: "2016"
org: Google
paper_url: https://arxiv.org/abs/1602.05629
category: foundation
parent: —
motivation: 通过在客户端进行多轮本地SGD更新再聚合，大幅降低联邦学习的通信轮次需求
```

#### 📝 一句话总结

FedAvg 提出在每轮通信中让各客户端执行多步本地 SGD 更新后再进行加权平均聚合，相比每轮仅做一步梯度的 FedSGD，将通信轮次降低 10–100×，使联邦学习在移动设备等通信受限场景下变得实用。

#### 🎯 核心要点

- 提出 **Federated Learning** 问题设定：数据留在设备端，模型在中心服务器聚合，解决隐私与通信瓶颈
- 核心算法 **FedAvg**：每轮随机选取 \(C\) 比例客户端，各自用本地数据执行 \(E\) 个 epoch、batch size 为 \(B\) 的 SGD，再将模型参数按数据量加权平均
- **FedSGD** 作为特例：当 \(E=1, B=\infty\) 时退化为分布式全批量梯度下降
- 关键发现：增大本地计算量（减小 \(B\)、增大 \(E\)）可显著减少通信轮次，但过大的 \(E\) 在 Non-IID 数据上可能导致发散
- 实验覆盖 5 种模型架构：MLP、两种 CNN、字符级 LSTM、大规模词级 LSTM
- 验证了在 IID 和 pathological Non-IID 数据划分下的有效性

#### 🔬 深入细节

![FedAvg 参数平均损失曲面](https://ar5iv.labs.arxiv.org/html/1602.05629/assets/x1.png)
*图：对两个独立训练的 MNIST 模型进行参数平均后的损失变化。当从同一随机初始化出发时（右），平均后的模型损失接近两个端点，说明参数平均在共享初始化条件下是可行的聚合策略。*

```python
# FedAvg 算法伪代码 (Algorithm 1)
# 服务器端执行：
def ServerUpdate():
    w = initialize_global_model()
    for each round t = 1, 2, ...:
        S_t = random_sample(clients, fraction=C)
        for each client k in S_t (in parallel):
            w_k = ClientUpdate(k, w)
        # 加权平均聚合
        w = sum(n_k / n * w_k for k in S_t)
    return w

# 客户端 k 执行：
def ClientUpdate(k, w):
    B = split_local_data_into_batches(P_k, batch_size=B)
    for epoch in range(E):
        for batch b in B:
            w = w - η * gradient(loss(w, b))
    return w
```

**动机与背景**

传统分布式 SGD（如数据中心内的同步/异步 SGD）假设数据可以在节点间自由 shuffle，通信带宽高且延迟低。然而在移动设备场景下，用户数据因隐私原因不能上传至服务器，且移动网络带宽有限（上行尤其慢）、设备可用性不稳定。这要求学习算法必须**最小化通信轮次**，同时容忍 Non-IID 的数据分布和不平衡的数据量。此前的朴素方法 FedSGD 每轮仅让客户端计算一个梯度就上传，通信效率极低。

**核心机制：本地多步 SGD + 加权聚合**

FedAvg 的关键洞察是：与其每轮只做一步梯度计算，不如让客户端在本地多跑几轮 SGD，再把最终模型参数发回服务器做加权平均。具体地，全局优化目标为：

$$f(w) = \sum_{k=1}^{K} \frac{n_k}{n} F_k(w), \quad F_k(w) = \frac{1}{n_k}\sum_{i \in \mathcal{P}_k} \ell(x_i, y_i; w)$$

其中 \(\mathcal{P}_k\) 是客户端 \(k\) 的本地数据集，\(n_k = |\mathcal{P}_k|\)。FedSGD 的聚合为：

$$w_{t+1} \leftarrow w_t - \eta \sum_{k=1}^{K} \frac{n_k}{n} \nabla F_k(w_t)$$

当 \(\eta\) 固定时，这等价于对各客户端执行一步 SGD 后的模型做加权平均。FedAvg 将此推广为**多步本地更新**：每个客户端从全局模型 \(w_t\) 出发，用本地数据跑 \(E\) 个 epoch（每 epoch 遍历 \(\lceil n_k/B \rceil\) 个 mini-batch），得到 \(w_k^{t+1}\)，服务器再聚合：

$$w_{t+1} \leftarrow \sum_{k \in S_t} \frac{n_k}{n} w_k^{t+1}$$

三个关键超参数控制计算-通信权衡：
- \(C\)：每轮参与的客户端比例（如 \(C=0.1\) 表示 10% 客户端参与）
- \(B\)：本地 mini-batch 大小（\(B=\infty\) 退化为全批量）
- \(E\)：本地训练 epoch 数

> 💡 关键：增大 \(E\) 或减小 \(B\) 都会增加每轮的本地计算量，从而减少达到目标精度所需的通信轮次。但这并非无限有效——过大的 \(E\) 会使各客户端模型偏离过远，尤其在 Non-IID 数据下可能导致聚合后性能下降。

**参数平均的可行性与共享初始化**

一个自然的疑问是：独立训练的神经网络参数平均后是否还有意义？论文通过实验（Figure 1）表明，如果两个模型从**相同的随机初始化**出发分别训练，它们的参数平均后的损失接近各自的损失，说明它们收敛到了同一个损失盆地。这为 FedAvg 提供了直觉支撑——每轮通信重置了共享起点，各客户端的本地更新不会偏离太远。

**与传统分布式 SGD 的关键区别**

| 维度 | 数据中心分布式 SGD | FedAvg |
|------|-------------------|--------|
| 数据分布 | IID（随机 shuffle） | Non-IID、不平衡 |
| 通信频率 | 每 1 步或几步 | 每 \(E\) 个 epoch |
| 参与者 | 全部节点 | 随机子集（\(C\) 比例） |
| 通信瓶颈 | 带宽充足 | 上行带宽有限 |
| 隐私 | 数据可集中 | 数据永不离开设备 |

FedAvg 在 MNIST CNN 上仅需 FedSGD 通信轮次的 1/23 即可达到相同精度，在大规模 LSTM 上也展现出 23× 的通信效率提升。

**局限与未来方向**

论文指出 FedAvg 在极端 Non-IID 场景下可能不稳定，后续工作可结合差分隐私（DP）和安全多方计算（Secure Aggregation）提供更强的隐私保障。这些技术天然适配 FedAvg 的同步聚合范式。

#### 🧪 练习题

```yaml
question: "在 FedAvg 中，当设置 E=1 且 B=∞（全批量）时，算法等价于什么？"
options:
  - "标准的单机 SGD"
  - "分布式异步 SGD"
  - "FedSGD（每轮一步全批量梯度聚合）"
  - "本地 Adam 优化器"
answer: 2
explain: "当 E=1 且 B=∞ 时，每个客户端仅在全部本地数据上计算一次梯度，服务器加权平均后更新全局模型，这正是 FedSGD 的定义。"
```