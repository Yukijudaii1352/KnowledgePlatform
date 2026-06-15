### DeepSeekMoE: Towards Ultimate Expert Specialization in Mixture-of-Experts Language Models

```yaml
id: deepseek_moe
name: DeepSeekMoE
full_name: DeepSeekMoE / Ultimate Expert Specialization MoE
year: "2024"
org: DeepSeek-AI
paper_url: https://arxiv.org/abs/2401.06066
category: llm_base
parent: —
motivation: 通过细粒度专家分割与共享专家隔离实现MoE模型的终极专家专业化，以更低计算量达dense模型性能
```

#### 📝 一句话总结
DeepSeekMoE提出细粒度专家分割与共享专家隔离两大策略实现Mixture-of-Experts模型的终极专家专业化，2B/16B/145B三阶段验证以显著更低计算量达到dense模型相当性能。

#### 🎯 核心要点
- **细粒度专家分割(Fine-Grained Expert Segmentation)**：将传统N个专家细分为\\(mN\\)个小专家，每token激活\\(mK\\)个，大幅增加激活专家组合的灵活性（N=16, m=4时组合数从120增至44亿）
- **共享专家隔离(Shared Expert Isolation)**：固定\\(K_s\\)个专家为共享专家无条件参与所有token计算，捕获通用知识以减少路由专家间的知识冗余
- **两级负载均衡**：Expert-Level Balance Loss确保专家间token分配均衡；Device-Level Balance Loss确保跨设备计算负载均衡
- **三阶段规模验证**：2B（vs GShard 2.9B和dense baseline）、16B（vs LLaMA2 7B仅有40%计算量）、145B（vs DeepSeek 67B仅有28.5%计算量）
- 路由机制沿袭GShard的top-K门控，在细粒度化后调整为\\(mK\\)激活，并通过Softmax归一化计算路由权重

#### 🔬 深入细节

##### 架构总览

![DeepSeekMoE 架构图](https://ar5iv.labs.arxiv.org/html/2401.06066/assets/x1.png)
*图：DeepSeekMoE与传统MoE架构对比。左为GShard标准MoE（top-K选激活专家），中为细粒度分割（mN专家/mK激活），右为完整DeepSeekMoE（细粒度+共享专家隔离）*

##### 动机与背景

传统MoE架构（如GShard）虽以条件计算实现模型参数扩展而保持较低推理成本，但面临**专家专业化不足**的困境：每个专家难以获取非重叠且聚焦的知识，常出现知识冗余（多个专家学到类似分布）或知识混杂（单个专家被迫覆盖过多异质知识）。DeepSeekMoE以"终极专家专业化"为目标，通过结构设计而非训练技巧实现**灵活的激活专家组合**与**通用知识的集中捕获**。

##### 细粒度专家分割 (Fine-Grained Expert Segmentation)

标准MoE将一个FFN层扩展为N个专家网络，每个token通过门控网络选择top-K个专家激活。DeepSeekMoE将专家数量进一步细分：将N个标准专家**分解为\\(mN\\)个细粒度专家**，每个专家的隐层维度降低为原来的\\(1/m\\)，同时每token激活\\(mK\\)个专家以保持总参数量不变。

核心公式如下。

门控网络输出路由logits：

$$\mathbf{g}^t = \text{Softmax}(\mathbf{W}_g \mathbf{h}^t) \in \mathbb{R}^{mN}$$

其中\\(\mathbf{h}^t\\)为第t个token的隐状态，\\(\mathbf{W}_g\\)为门控权重矩阵。

Top-\\(mK\\)选择与权重计算：

$$\tilde{g}_i^t = \begin{cases} g_i^t, & i \in \text{TopK}(\mathbf{g}^t, mK) \\ 0, & \text{otherwise} \end{cases}$$

$$\tilde{\mathbf{g}}^t = \text{Softmax}(\tilde{\mathbf{g}}^t)$$

最终输出为所选专家输出的加权和：

$$\mathbf{o}^t = \sum_{i \in \text{TopK}(\mathbf{g}^t, mK)} \tilde{g}_i^t \cdot \text{FFN}_i(\mathbf{h}^t)$$

> 💡 关键：细粒度分割的核心优势在于**激活专家组合数呈指数级增长**。标准MoE从N选K的组合数为\\(\binom{N}{K}\\)；细粒度MoE从\\(mN\\)选\\(mK\\)的组合数为\\(\binom{mN}{mK}\\)。例如N=16、K=2、m=4时，组合数从\\(\binom{16}{2}=120\\)增至\\(\binom{64}{8}\approx 4.4\times10^9\\)，每个组合可针对特定输入模式更精准地激活相关知识。

##### 共享专家隔离 (Shared Expert Isolation)

细粒度分割虽扩大组合空间，但无法解决**跨专家知识冗余**问题：若多个专家学到相同的通用知识（如语法、常见词汇），则造成参数浪费。DeepSeekMoE引入\\(K_s\\)个**共享专家**，这些专家**不受门控网络选择**，对每个token无条件参与计算。

完整输出公式：

$$\mathbf{o}^t = \sum_{i=1}^{K_s} \text{FFN}_i^{\text{shared}}(\mathbf{h}^t) + \sum_{j \in \text{TopK}(\mathbf{g}^t, mK)} \tilde{g}_j^t \cdot \text{FFN}_j^{\text{routed}}(\mathbf{h}^t)$$

其中第一项为所有共享专家输出之和（无门控权重），第二项为路由专家的加权和。

> ⚠️ 注意：共享专家强制捕获所有token的公共模式，反向推动路由专家不得不学习**更专业化、非通用**的知识。这种"隔离"并非物理分离，而是通过训练目标的选择性压力实现——共享专家承担通用知识后，路由专家若再学通用特征会产生冗余并降低门控的信息增益，在梯度反向传播中被自然抑制。

##### 负载均衡损失 (Load Balance Loss)

MoE训练的一个关键挑战是**负载不均衡**：门控网络可能倾向将大量token路由至少数专家，导致其他专家几乎不被使用（"dead experts"）。DeepSeekMoE采用两级负载均衡：

**Expert-Level Balance Loss**：
$$\mathcal{L}_{\text{expBal}} = \alpha \cdot \sum_{i=1}^{mN} f_i \cdot P_i$$

其中\\(f_i = \frac{1}{T} \sum_{t=1}^{T} \mathbb{1}[\text{Token } t \text{ selects Expert } i]\\)为专家i的实际选择频率，\\(P_i = \frac{1}{T} \sum_{t=1}^{T} g_i^t\\)为专家i的平均路由概率，\\(\alpha\\)为平衡权重超参。该损失在\\(f_i\\)与\\(P_i\\)一致时最小，推动均匀路由。

**Device-Level Balance Loss**：
$$\mathcal{L}_{\text{devBal}} = \beta \cdot \sum_{d=1}^{D} f'_d \cdot P'_d$$

其中\\(f'_d\\)为设备d上所有专家的聚合选择频率，\\(P'_d\\)为设备d上专家的聚合路由概率。该损失确保跨设备计算量均衡，避免某设备成为瓶颈。

完整训练损失：
$$\mathcal{L}_{\text{total}} = \mathcal{L}_{\text{LM}} + \mathcal{L}_{\text{expBal}} + \mathcal{L}_{\text{devBal}}$$

##### 实验验证

DeepSeekMoE通过三阶段实验验证有效性：

- **2B规模**：DeepSeekMoE 2B在相同训练数据下达到GShard 2.9B（1.5倍专家参数+计算量）的相当性能，并接近同参数量的dense baseline（代表MoE性能理论上界）
- **16B规模**：在Open LLM Leaderboard上达到LLaMA2 7B的相当性能，**仅使用约40%的计算量**（激活参数约2.8B vs LLaMA2 7B）
- **145B规模**：验证了大规模下架构优势的持续性，以DeepSeek 67B的28.5%计算量（甚至可进一步降至18.2%）达到相当性能

##### 与GShard的关键区别

| 维度 | GShard | DeepSeekMoE |
|------|--------|-------------|
| 专家粒度 | N个标准专家 | mN个细粒度专家 |
| 激活方式 | top-K | top-mK |
| 组合灵活性 | \\(\binom{N}{K}\\) | \\(\binom{mN}{mK}\\)（指数级增长） |
| 共享专家 | 无 | \\(K_s\\)个固定激活 |
| 负载均衡 | Expert-Level | Expert-Level + Device-Level |

#### 🧪 练习题

```yaml
question: "DeepSeekMoE中共享专家隔离(Shared Expert Isolation)的主要目的是什么？"
options:
  - "增加模型的总参数量以提升性能"
  - "捕获所有token的通用知识，减少路由专家间的知识冗余"
  - "替代门控网络，直接选择最相关专家"
  - "仅在大规模模型（145B）中生效的加速策略"
answer: 1
explain: "共享专家对所有token无条件激活，强制捕获语法等通用知识，使路由专家被迫学习专业化、非重叠的知识，消除冗余。"
```