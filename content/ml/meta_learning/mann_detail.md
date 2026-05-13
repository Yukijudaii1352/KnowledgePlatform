### 记忆增强神经网络 (Memory-Augmented Neural Networks)

```yaml
id: mann
name: MANN
full_name: "记忆增强神经网络 (Memory-Augmented Neural Networks)"
year: 2016
org: Google DeepMind
paper_url: "http://proceedings.mlr.press/v48/santoro16.html"
category: foundation
parent: "—"
motivation: "将NTM外部记忆引入元学习，实现快速存取新类别信息"
```

#### 📝 一句话总结

MANN 将神经图灵机（NTM）的外部记忆机制引入元学习框架，通过 LRUA（Least Recently Used Access）写入策略实现对新类别信息的快速绑定与稳定存储，使模型仅需少量样本即可完成分类与回归任务。

#### 🎯 核心要点

- 基于 NTM 外部记忆架构，使用可微分的读写头实现端到端训练
- 提出 LRUA（Least Recently Used Access）写入机制，替代 NTM 原始的基于内容/位置的写入方式
- 基于余弦相似度的内容寻址读取机制，实现快速类别检索
- 元学习 episode 设计：标签时序偏移 \((x_t, y_{t-1})\)，迫使网络利用外部记忆而非短路记忆
- 每个 episode 内类别标签随机打乱，防止网络记忆固定的类别-标签映射
- 在 Omniglot 少样本分类任务上显著超越 LSTM 和传统 NTM
- 在高斯过程回归任务上展示了快速函数逼近能力

#### 🔬 深入细节

![MANN 任务设置与记忆交互示意图](https://arxiv.org/html/1605.06065v2/extracted/figures/fig1.png)
*图：MANN 元学习任务设置。每个时间步输入 \((x_t, y_{t-1})\)，模型需利用外部记忆在首次见到标签后立即绑定，并在后续呈现时正确分类。*

##### 算法伪代码

```python
# MANN with LRUA - 核心训练流程
for episode in episodes:
    # 初始化外部记忆矩阵 M (N×M), 使用权重 w_u, w_r, w_w
    M = zeros(N, memory_size)
    w_u = zeros(N)  # usage weights
    w_r = zeros(N)  # read weights
    w_w = zeros(N)  # write weights
    
    # 随机打乱类别标签映射
    label_mapping = random_permutation(classes)
    
    for t in range(episode_length):
        # 输入: (x_t, y_{t-1}) — 标签时序偏移
        input_t = concatenate(x[t], y[t-1])
        
        # 控制器生成 key 向量 k_t
        k_t = controller(input_t)
        
        # === READ: 基于余弦相似度的内容寻址 ===
        w_r[t](i) = softmax(cosine(k_t, M[t](i)))
        r_t = sum(w_r[t](i) * M[t](i))  # 读取向量
        
        # === WRITE: LRUA 机制 ===
        # 更新使用权重
        w_u[t] = gamma * w_u[t-1] + w_r[t] + w_w[t]
        # 找最少使用的 n 个位置
        w_lu[t](i) = 1 if w_u[t](i) <= n-th_smallest(w_u[t])
        # 插值决定写入位置
        w_w[t] = sigma(alpha) * w_r[t-1] + (1 - sigma(alpha)) * w_lu[t-1]
        # 写入前先擦除最少使用位置
        M[t](i) = M[t-1](i) * (1 - w_w[t](i))  # 擦除
        M[t](i) = M[t](i) + w_w[t](i) * k_t     # 写入
        
        # 输出预测
        y_pred = output_layer(controller_state, r_t)
        loss += cross_entropy(y_pred, y[t])
```

##### 动机与背景

传统深度学习模型依赖大量标注数据进行梯度下降优化，面对新类别时需要重新训练，且容易发生灾难性遗忘。人类则能通过少量示例快速学习新概念。元学习（meta-learning）旨在让模型"学会学习"——在多个任务上训练后，能快速适应新任务。

MANN 的核心洞察是：**外部记忆可以作为快速绑定新信息的载体**。与需要多次梯度更新才能编码新知识的网络权重不同，外部记忆允许在单步内写入新信息并在后续步骤中精确检索。这正是少样本学习所需要的能力。

##### 核心机制详解

**1. 内容寻址读取（Content-Based Reading）**

控制器网络（LSTM）在每个时间步生成一个 key 向量 \(k_t\)，通过余弦相似度与记忆矩阵中的每一行进行比较：

$$K(k_t, M_t(i)) = \frac{k_t \cdot M_t(i)}{\|k_t\| \cdot \|M_t(i)\|}$$

读取权重通过 softmax 归一化：

$$w_t^r(i) = \frac{\exp(K(k_t, M_t(i)))}{\sum_j \exp(K(k_t, M_t(j)))}$$

最终读取向量为记忆行的加权和：

$$r_t = \sum_i w_t^r(i) \cdot M_t(i)$$

> 💡 关键：余弦相似度使得即使只见过一次某类样本，只要控制器能生成相似的 key，就能精确检索到对应的记忆内容。

**2. LRUA 写入机制（Least Recently Used Access）**

这是本文最核心的创新。NTM 原始的写入机制基于内容寻址和位置偏移，对于元学习场景存在两个问题：(1) 新类别信息可能覆盖旧的有用记忆；(2) 缺乏明确的记忆管理策略。

LRUA 通过追踪记忆使用频率来决定写入位置：

**使用权重更新：**

$$w_t^u = \gamma \cdot w_{t-1}^u + w_t^r + w_t^w$$

其中 \(\gamma\) 为衰减因子，确保近期使用的记忆有更高的使用权重。

**最少使用位置：**

$$w_t^{lu}(i) = \begin{cases} 1 & \text{if } w_t^u(i) \leq m(w_t^u, n) \\ 0 & \text{otherwise} \end{cases}$$

其中 \(m(w_t^u, n)\) 是使用权重的第 \(n\) 小值。

**写入权重的插值策略：**

$$w_t^w = \sigma(\alpha) \cdot w_{t-1}^r + (1 - \sigma(\alpha)) \cdot w_{t-1}^{lu}$$

其中 \(\alpha\) 是可学习的标量参数，\(\sigma\) 为 sigmoid 函数。

> ⚠️ 注意：这个插值设计非常精妙——当 \(\sigma(\alpha) \to 1\) 时，新信息写入最近读取的位置（更新已有记忆）；当 \(\sigma(\alpha) \to 0\) 时，新信息写入最少使用的位置（分配新记忆槽）。网络可以学习在这两种策略之间动态切换。

**3. 元学习 Episode 设计**

训练时的关键设计是**标签时序偏移**：在时间步 \(t\)，模型接收当前样本 \(x_t\) 和上一步的标签 \(y_{t-1}\)。这意味着：

- 模型首次看到某类样本时，尚不知道其标签
- 下一步收到标签后，必须将其与记忆中的表征绑定
- 再次看到同类样本时，需要从记忆中检索正确标签

$$\text{Input}_t = (x_t, y_{t-1}), \quad \text{Target}_t = y_t$$

此外，每个 episode 中类别到标签的映射随机打乱，确保模型不能简单记忆"类别A总是标签0"，而必须真正利用外部记忆进行在线绑定。

##### 与传统方法的对比

| 方法 | 新类别适应 | 记忆机制 | 写入策略 |
|------|-----------|---------|---------|
| 标准 LSTM | 需多次梯度更新 | 仅隐状态（有限容量） | 无显式管理 |
| 原始 NTM | 单步写入 | 外部记忆矩阵 | 内容+位置寻址 |
| **MANN (本文)** | **单步写入** | **外部记忆矩阵** | **LRUA（使用频率驱动）** |

MANN 相比原始 NTM 的关键优势在于：LRUA 确保新信息优先写入不再需要的记忆槽，避免覆盖仍有用的旧信息，同时保留了更新已有记忆的能力。

##### 实验结果

在 Omniglot 少样本分类任务中：
- **5-way 分类**：MANN 在第 2 次呈现时达到 82.8% 准确率，第 5 次达到 94.9%，第 10 次达到 98.1%
- **15-way 分类**：第 2 次 67.7%，第 5 次 84.4%，第 10 次 90.2%
- 显著优于 LSTM（5-way 第 2 次仅 59.9%）和原始 NTM（5-way 第 2 次 64.4%）

在高斯过程回归任务中，MANN 能在仅 3-4 个观测点后快速逼近目标函数，展示了超越分类的通用元学习能力。

#### 🧪 练习题

```yaml
question: "MANN 中 LRUA 写入机制的写入权重 w_w 是如何确定的？"
options:
  - "完全基于内容相似度寻址，写入与 key 最相似的位置"
  - "在最近读取位置和最少使用位置之间进行可学习的插值"
  - "随机选择一个空闲的记忆槽进行写入"
  - "按照固定的循环顺序依次写入每个记忆位置"
answer: 1
explain: "LRUA 通过 σ(α)·w_r + (1-σ(α))·w_lu 在最近读取位置（更新旧记忆）和最少使用位置（分配新记忆）之间插值，α 为可学习参数，使网络能自适应地选择写入策略。"
```