### FedMA — 联邦匹配平均 (Federated Matched Averaging)

```yaml
id: fedma
name: FedMA
full_name: "联邦匹配平均 (Federated Matched Averaging)"
year: 2020
org: "University of Wisconsin-Madison / IBM Research"
paper_url: "https://arxiv.org/abs/2002.06440"
category: foundation
parent: "—"
motivation: "利用神经网络排列不变性进行逐层匹配与平均，解决联邦学习中异构数据下的模型聚合问题"
```

#### 📝 一句话总结

FedMA 利用神经网络的**排列不变性**（permutation invariance），通过逐层匹配不同客户端模型中语义等价的神经元/通道后再平均，解决了 FedAvg 等坐标级平均方法在异构数据场景下聚合效果差的问题，同时支持全局模型大小的自适应调整。

#### 🎯 核心要点

- **排列不变性建模**：揭示 FC 层的神经元、CNN 的通道、LSTM 的隐状态存在排列不变性，直接坐标平均会混淆语义不同的单元
- **逐层匹配平均**：将模型聚合分解为逐层优化问题，每层独立求解最优排列矩阵后平均
- **BBP-MAP 求解器**：采用 Beta-Bernoulli Process 的 MAP 推断求解匹配问题，天然支持全局模型神经元数自适应增长
- **统一框架**：同一公式化覆盖 FC、CNN（VGG）、LSTM 三类主流架构
- **通信效率**：通信轮次等于网络层数（如 VGG-9 仅需 9 轮），远少于 FedAvg/FedProx 的数百轮
- **FedMA with Communication**：在一次性匹配基础上增加多轮通信迭代，进一步逼近集中式训练性能
- **数据偏差鲁棒性**：在有系统性数据偏差（如灰度偏差）的场景中，FedMA 甚至优于集中式全数据训练

#### 🔬 深入细节

##### 核心框架图

![FedMA 收敛性能对比](https://ar5iv.labs.arxiv.org/html/2002.06440/assets/x1.png)
*图1：FedMA 与 FedAvg、FedProx 在有限通信轮次下的性能对比。(a) 同质数据划分；(b) 异质数据划分。FedMA 在 LeNet/VGG-9/LSTM 上均显著优于基线。*

##### 问题动机：为什么不能直接平均？

在联邦学习中，各客户端独立训练模型后需要在服务器端聚合。FedAvg 直接对模型参数做坐标级加权平均：

$$W_{\text{global}} = \frac{1}{J}\sum_{j=1}^{J} W_j$$

然而，神经网络存在**排列不变性**——对于单隐层 FC 网络 \(\hat{y} = xW_1W_2\)，任意排列矩阵 \(\Pi\) 满足：

$$\hat{y} = x(W_1\Pi)(\Pi^T W_2) = xW_1W_2$$

即隐层神经元的顺序可以任意交换而不改变网络功能。不同客户端独立训练后，相同功能的神经元可能处于不同位置，直接平均会将功能不同的神经元混合，导致聚合模型性能严重退化。

> 💡 **关键直觉**：FedMA 的核心思想是"先对齐，再平均"——找到各客户端模型中语义等价的神经元对应关系，对齐后再聚合。

##### 匹配平均的数学公式化

给定 \(J\) 个客户端的第 \(n\) 层权重 \(\{W_{j,n}\}_{j=1}^J\)，FedMA 求解以下优化问题：

$$\min_{\{\Pi_j\}, W_n} \sum_{j=1}^{J} \|W_{j,n}\Pi_j - W_n\|_F^2 \tag{Eq.2}$$

其中 \(\Pi_j\) 是排列矩阵，\(W_n\) 是全局权重。这本质上是一个**赋值问题**（assignment problem）：找到最优排列使局部模型对齐到全局模型。

对于深层网络，排列在相邻层之间耦合。设第 \(n\) 层的前向传播为：

$$x_n = \sigma(x_{n-1}\Pi_{n-1}^T W_n \Pi_n) \tag{Eq.4}$$

直接联合优化所有层的排列是 NP-hard 的。FedMA 采用**递归策略**：假设已知 \(\{\Pi_{j,n-1}\}\)，将 \(\Pi_{j,n-1}^T W_{j,n}\) 代入 Eq.2 求解 \(\{\Pi_{j,n}\}\)，然后逐层推进。

##### 对不同架构的适配

**FC 层**：匹配对象是神经元（行/列向量），排列矩阵作用于权重矩阵的列。

**CNN 层**：匹配对象是**通道**（channel）。卷积权重 \(W \in \mathbb{R}^{C^{in} \times w \times h \times C^{out}}\)，排列作用于输出通道维度：

$$\text{Conv}(x, W[:,:,:,\Pi(\cdot)]) \text{ 等价于对输出 feature map 做通道重排}$$

**LSTM 层**：隐状态的排列不变性体现在 gates 的权重矩阵中。对 input/forget/output/cell gate 的权重统一施加相同排列。

##### BBP-MAP 求解器

FedMA 使用 **Beta-Bernoulli Process MAP**（BBP-MAP）求解 Eq.2。关键优势：

1. **自适应模型大小**：全局模型的神经元数 \(K\) 不需要预设，BBP 的非参贝叶斯先验允许 \(K\) 根据数据自动确定
2. **匹配+新增**：如果某个局部神经元与所有全局神经元都不匹配，BBP-MAP 会为其创建新的全局神经元，实现模型容量增长
3. **高效求解**：利用匈牙利算法（Hungarian method）在多项式时间内求解赋值子问题

##### 算法伪代码

```python
# Algorithm 1: Federated Matched Averaging (FedMA)
# Input: J clients的N层网络权重 {W_{j,1}, ..., W_{j,N}} for j=1..J
# Output: 全局权重 {W_1, ..., W_N}

for n in range(1, N+1):          # 逐层处理
    if n < N:                     # 非最后一层
        # 1. 调用BBP-MAP求解匹配
        {Π_j} = BBP_MAP({W_{j,n}})  # 求解Eq.2得到排列矩阵
        
        # 2. 对齐后平均得到全局权重
        W_n = (1/J) * sum(W_{j,n} @ Π_j.T for j in range(J))
        
        # 3. 将排列传播到下一层 & 重新训练
        for j in range(J):
            W_{j,n+1} = Π_j @ W_{j,n+1}  # 排列下一层输入维度
            fine_tune({W_{j,n+1}, ..., W_{j,N}}, freeze=W_n)
    else:                         # 最后一层（分类层）
        # 按类别标签加权平均
        W_N = sum(p_{jk} * W_{jl,N} for k, j)
```

> ⚠️ **注意**：FedMA 的通信轮次恰好等于网络层数 \(N\)。对于 VGG-9 仅需 9 轮通信，而 FedAvg 通常需要数百轮。

##### FedMA with Communication（多轮迭代版本）

一次性 FedMA 在异构数据下仍有性能差距。**FedMA with Communication** 在每轮匹配后：
1. 客户端接收匹配后的全局模型
2. 基于上轮匹配结果重建本地模型（保持原始大小，如 VGG-9）
3. 在本地数据上继续训练
4. 再次执行 FedMA 匹配

这种方式保持全局模型紧凑，同时通过多轮迭代逐步提升性能。

##### 与 FedAvg/FedProx 的关键区别

| 特性 | FedAvg | FedProx | FedMA |
|------|--------|---------|-------|
| 聚合方式 | 坐标级加权平均 | 坐标级加权平均 + 近端项 | 匹配对齐后平均 |
| 处理排列不变性 | ❌ | ❌ | ✅ |
| 通信轮次 | 数百轮 | 数百轮 | = 层数（一次性）|
| 模型大小自适应 | ❌ | ❌ | ✅（BBP非参先验）|
| 异构数据鲁棒性 | 差 | 中等 | 强 |

##### 实验结果亮点

![FedMA with Communication 收敛曲线](https://ar5iv.labs.arxiv.org/html/2002.06440/assets/x4.png)
*图2：FedMA with Communication 在 VGG-9/CIFAR-10 和 LSTM/Shakespeare 上的收敛曲线，按消息大小和通信轮次两种度量均优于 FedAvg/FedProx。*

- **CIFAR-10 (VGG-9, 16 clients, 异构)**：FedMA 达到 87.53% 准确率，FedAvg 86.29%，FedProx 85.32%
- **Shakespeare (LSTM, 66 clients)**：FedMA 达到 49.07%，FedAvg 46.63%，FedProx 45.83%
- **通信效率**：FedMA 在相同消息传输量下收敛速度显著更快
- **本地训练轮次**：更多本地训练对 FedMA 有利（模型质量更高），但对 FedAvg 有害（加剧 client drift）
- **数据偏差**：在 CIFAR-10 灰度偏差实验中，FedMA 优于集中式全数据训练

#### 🧪 练习题

```yaml
question: "FedMA 采用逐层匹配而非联合优化所有层排列的主要原因是什么？"
options:
  - "逐层匹配可以减少通信开销"
  - "联合优化所有层的排列矩阵是 NP-hard 问题，计算上不可行"
  - "逐层匹配可以支持不同层使用不同的激活函数"
  - "联合优化会导致全局模型过大"
answer: 1
explain: "相邻层的排列矩阵相互耦合，联合优化是 NP-hard 的组合优化问题。FedMA 通过递归策略（已知上一层排列后求解当前层）将其分解为多个可解的赋值子问题。"
```