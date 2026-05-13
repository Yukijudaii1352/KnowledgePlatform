### ENAS — 高效神经架构搜索

```yaml
id: enas
name: ENAS
full_name: "高效神经架构搜索 (Efficient Neural Architecture Search via Parameter Sharing)"
year: 2018
org: "Google Brain"
paper_url: "https://arxiv.org/abs/1802.03268"
category: "automl"
parent: "NAS"
motivation: "通过强制所有子模型共享参数，将NAS搜索成本从450 GPU-days降至单GPU半天，降低1000倍"
```

#### 📝 一句话总结

ENAS 提出让所有候选子模型在一个共享的超网络（over-parameterized DAG）中共享权重，通过 LSTM 控制器采样子图并用 REINFORCE 优化架构分布，将神经架构搜索的计算成本从数百 GPU-days 降低到单 GPU 不到 16 小时，同时保持与 NAS 相当的搜索质量。

#### 🎯 核心要点

- **权重共享超网络**：将整个搜索空间表示为一个有向无环图（DAG），所有子架构是该 DAG 的子图，共享对应边上的权重参数
- **LSTM 控制器**：100 隐藏单元的 LSTM，通过 softmax 分类器自回归地采样架构决策（激活函数、连接关系、操作类型）
- **两阶段交替训练**：(1) 固定控制器参数 \(\theta\)，用标准 SGD 在训练集上更新共享权重 \(\omega\)；(2) 固定 \(\omega\)，用 REINFORCE 在验证集上更新 \(\theta\)
- **三种搜索空间**：RNN cell 设计、CNN 宏观层级搜索（macro search）、CNN 微观 cell 搜索（micro search）
- **实验结果**：PTB 语言模型 test perplexity 55.8；CIFAR-10 test error 2.89%；搜索耗时单 GPU < 16 小时（比 NAS 快 1000×）
- **搜索空间规模**：RNN cell 空间 \(\sim 10^{15}\) 种架构，CNN macro 空间 \(\sim 1.6 \times 10^{29}\) 种架构

#### 🔬 深入细节

##### 核心思想：参数共享的搜索空间

![ENAS 搜索空间示意图](https://ar5iv.labs.arxiv.org/html/1802.03268/assets/x1.png)
*图：左侧为完整的共享参数 DAG，右侧的红色子图为控制器采样出的一个子架构。所有子架构共享 DAG 中对应边的权重。*

ENAS 的核心洞察是：NAS 中不同子模型之间存在大量参数重叠，传统 NAS 每次从头训练子模型造成了巨大浪费。ENAS 将整个搜索空间编码为一个**超网络（supergraph）**——一个包含所有可能连接的有向无环图。每个子架构对应该 DAG 的一个子图，其权重直接从超网络中继承，无需重新训练。

> 💡 关键：权重共享使得评估一个子架构的代价从"训练至收敛"降低到"单次前向传播 + 验证集评估"。

##### 控制器设计与采样过程

控制器是一个带有 100 个隐藏单元的 LSTM。对于不同的搜索空间，控制器的采样策略不同：

**RNN Cell 搜索**：给定 \(N\) 个计算节点，控制器依次为节点 \(j\)（\(j = 2, \ldots, N\)）做两个决策：
1. 选择前驱节点索引 \(i < j\)（决定信息来源）
2. 选择激活函数（tanh, ReLU, sigmoid, identity）

**CNN Macro 搜索**：对于第 \(l\) 层，控制器决定：
1. 使用哪种卷积操作（3×3, 5×5, depthwise-separable 等）
2. 与哪些之前的层建立跳跃连接（逐层二分类决策）

**CNN Micro/Cell 搜索**：对于 cell 内的每个节点 \(j\)，控制器采样：
1. 两个输入节点索引
2. 对应两个输入的操作类型（identity, 3×3/5×5 separable conv, 3×3 avg/max pool）

```python
# ENAS 控制器采样伪代码 (RNN Cell)
def sample_rnn_cell(controller_lstm, N_nodes):
    """采样一个 RNN cell 架构"""
    decisions = []
    h = initial_hidden_state
    
    for node_j in range(2, N_nodes + 1):
        # 决策1: 选择前驱节点
        h, logit_prev = controller_lstm(h)
        prev_node = softmax_sample(logit_prev[:node_j])  # 只能选 < j 的节点
        
        # 决策2: 选择激活函数
        h, logit_act = controller_lstm(h)
        activation = softmax_sample(logit_act)  # {tanh, relu, sigmoid, identity}
        
        decisions.append((prev_node, activation))
    
    return decisions  # 定义了完整的 cell 拓扑
```

##### 训练流程

ENAS 采用**两阶段交替优化**：

**阶段一：训练共享权重 \(\omega\)**

固定控制器参数 \(\theta\)，在整个训练集上用 SGD 优化：

$$\omega^* = \arg\min_\omega \mathbb{E}_{m \sim \pi(m;\theta)} \left[ \mathcal{L}(m; \omega) \right]$$

实际操作中，采用蒙特卡洛近似：采样一个架构 \(m\)，计算其在一个 mini-batch 上的梯度 \(\nabla_\omega \mathcal{L}(m; \omega)\)，然后更新 \(\omega\)。

**阶段二：训练控制器 \(\theta\)**

固定共享权重 \(\omega\)，在验证集上用 REINFORCE 优化控制器：

$$\nabla_\theta J(\theta) = \mathbb{E}_{m \sim \pi(m;\theta)} \left[ \nabla_\theta \log P(m;\theta) \cdot (R(m) - b) \right]$$

其中：
- \(R(m)\) 是架构 \(m\) 在验证集上的奖励（如 perplexity 的倒数或准确率）
- \(b\) 是基线（baseline），使用之前奖励的指数移动平均

> ⚠️ 注意：两阶段使用**不同的数据集**——共享权重在训练集上优化，控制器在验证集上优化。这避免了控制器过拟合训练集。

##### 与 NAS 的核心区别

| 维度 | NAS (Zoph & Le, 2017) | ENAS |
|------|----------------------|------|
| 子模型训练 | 每个从头训练至收敛 | 共享权重，无需重新训练 |
| 评估代价 | 数小时/模型 | 单次前向传播 |
| 总搜索时间 | 450 GPU-days (800 GPUs) | < 16 hours (1 GPU) |
| 控制器优化 | REINFORCE | REINFORCE（相同） |
| 搜索质量 | PTB ppl: 62.4 | PTB ppl: 55.8 |

ENAS 的关键创新在于**将"训练子模型"这一瓶颈完全消除**。NAS 中控制器每采样一个架构就需要花费数小时训练该模型以获得奖励信号；而 ENAS 中，由于权重已在超网络中预训练好，评估只需一次前向传播即可得到验证集性能。

##### 搜索完成后的处理

搜索结束后，ENAS 从控制器中采样多个架构，选择验证集上表现最好的一个，然后**从头开始训练**该架构（不使用共享权重）。这是因为共享权重虽然足以区分好坏架构，但并非每个子模型的最优权重。

#### 🧪 练习题

```yaml
question: "ENAS 相比原始 NAS 实现 1000 倍加速的核心机制是什么？"
options:
  - "使用更高效的强化学习算法替代 REINFORCE"
  - "强制所有候选子模型共享参数，避免从头训练每个子模型"
  - "缩小搜索空间，减少候选架构数量"
  - "使用知识蒸馏加速子模型训练"
answer: 1
explain: "ENAS 的核心贡献是参数共享——所有子架构共享超网络中的权重，评估子模型只需一次前向传播而非从头训练至收敛，从而将搜索成本降低约 1000 倍。"
```