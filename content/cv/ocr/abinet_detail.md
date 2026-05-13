### ABINet — 自治双向迭代网络 (Autonomous Bidirectional Iterative Network)

```yaml
id: abinet
name: ABINet
full_name: 自治双向迭代网络 (Autonomous Bidirectional Iterative Network)
year: '2021'
org: University of Science and Technology of China
paper_url: https://arxiv.org/abs/2103.06495
category: recognition
parent: master
motivation: 显式语言模型增强识别
```

#### 📝 一句话总结

ABINet 提出将视觉模型与语言模型显式解耦（自治），并设计双向完形填空网络（BCN）和迭代纠正机制，解决了传统隐式语言建模能力有限、单向表示信息不足、噪声输入影响预测的三大问题，在场景文字识别中实现了 SOTA 性能。

#### 🎯 核心要点

- **自治策略（Autonomous）**：阻断视觉模型到语言模型的梯度流（BGF），强制语言模型独立学习语言知识，可单独预训练
- **双向完形填空网络（BCN）**：通过注意力掩码实现真正的双向特征表示，信息量是单向模型集成的 2 倍
- **迭代纠正（Iterative Correction）**：语言模型多轮执行，逐步修正视觉预测中的噪声，同时缓解长度不对齐问题
- **门控融合机制**：使用门控单元对齐并融合视觉特征与语言特征
- **半监督集成自训练**：基于迭代预测的集成结果过滤高质量伪标签，利用无标注数据提升性能
- **视觉模型**：ResNet backbone + Transformer 序列建模 + 位置注意力并行解码

#### 🔬 深入细节

![ABINet 整体架构图](https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x2.png)
*图：ABINet 整体架构示意图。视觉模型（VM）、语言模型（LM/BCN）和融合模块（Fusion）协同工作，支持迭代纠正。*

![自治语言模型对比](https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x1.png)
*图：(a) 传统耦合式语言模型 vs (b) ABINet 的自治式语言模型，梯度流在输入处被阻断。*

##### 算法伪代码

```python
# ABINet 迭代推理流程
def abinet_inference(image, M=3):
    # 1. 视觉模型：提取视觉特征并生成初始字符概率
    F_b = Transformer(ResNet(image))          # 骨干特征 [H/4, W/4, C]
    F_v = PositionAttention(Q=pos_enc, K=F_b, V=F_b)  # 视觉特征 [T, C]
    P_v = Linear(F_v)                          # 视觉预测 [T, c]
    
    y = P_v  # 初始输入为视觉预测概率
    for i in range(M):  # 迭代纠正
        # 2. 语言模型（BCN）：双向完形填空
        y_detached = stop_gradient(y)          # 阻断梯度（自治）
        F_l = BCN(y_detached)                  # 语言特征 [T, C]
        
        # 3. 门控融合
        G = sigmoid(concat(F_v, F_l) @ W_f)   # 门控权重 [T, C]
        F_f = G * F_v + (1 - G) * F_l         # 融合特征
        y = Linear(F_f)                        # 更新预测概率
    
    return y  # 最终识别结果
```

##### 动机与背景

场景文字识别（STR）中，语言知识对于处理模糊、遮挡等低质量图像至关重要。然而，现有方法存在三个根本性限制：

1. **隐式语言建模**：传统注意力解码器（如 RNN/Transformer decoder）将语言建模隐含在序列解码中，模型实际学到的语言知识不可控且有限。
2. **单向特征表示**：大多数方法采用从左到右的自回归解码，或简单集成两个单向模型。从信息论角度，单向表示平均只能利用 \(\frac{1}{2}H_{\bm{y}}\) 的上下文信息。
3. **噪声输入问题**：并行 Transformer 的输入来自视觉预测的近似值，错误预测会作为噪声传播到语言模型，降低纠正能力。

> 💡 关键洞察：人类阅读是自治的（视觉与语言独立学习）、双向的（利用前后文推理）、迭代的（反复确认修正），ABINet 的设计正是模拟这三个特性。

##### 核心机制详解

**1. 自治策略（Autonomous）**

ABINet 的核心设计哲学是将语言模型视为一个独立的"拼写纠正器"。具体实现：

- 语言模型的输入是字符概率向量（而非隐层特征），使其可解释且可替换
- 在输入处阻断梯度回传（Block Gradient Flow, BGF），确保 LM 不依赖视觉信号学习
- LM 可以在纯文本数据上独立预训练，直接复用 NLP 社区的进展

这使得视觉模型和语言模型各自专注于自己的任务：VM 负责"看"，LM 负责"读"。

**2. 双向完形填空网络（BCN）**

BCN 是一个 \(L\) 层 Transformer decoder 变体，其核心创新在于注意力掩码设计：

$$\mathbf{M}_{ij} = \begin{cases} 0, & i \neq j \\ -\infty, & i = j \end{cases}$$

这意味着每个位置可以看到**所有其他位置**的信息，但**看不到自身**——这正是完形填空（cloze）的思想。与 BERT 的 MLM 不同，BCN 无需逐个 mask 再分别推理，而是通过注意力掩码一次并行完成所有位置的双向预测。

![BCN 架构](https://ar5iv.labs.arxiv.org/html/2103.06495/assets/x4.png)
*图：BCN 语言模型架构。字符概率向量通过线性映射后作为 K/V，位置编码作为 Q，注意力掩码阻止自身信息泄露。*

注意力计算：

$$\mathbf{F}_{mha} = \text{softmax}\left(\frac{\mathbf{Q}\mathbf{K}^{\mathsf{T}}}{\sqrt{C}} + \mathbf{M}\right)\mathbf{V}$$

其中 \(\mathbf{K}_i = \mathbf{V}_i = P(y_i)\mathbf{W}_l\)，即每个位置的 Key/Value 来自该位置的字符概率分布经线性变换。

> ⚠️ 注意：BCN 中**没有自注意力**（self-attention），避免了跨时间步的信息泄露。Q 在第一层为位置编码，后续层为上一层输出。

**3. 迭代纠正（Iterative Correction）**

语言模型被执行 \(M\) 次（实验中 \(M=3\)）：
- 第 1 次迭代：输入为视觉模型的预测概率 \(\bm{y}_{i=1} = P_v\)
- 第 \(i \geq 2\) 次迭代：输入为上一轮融合模型的输出概率

这种设计的优势：
- 每轮纠正后的预测更准确，下一轮 LM 获得更干净的输入
- 逐步修正文本长度预测（缓解 padding mask 导致的长度不对齐问题）
- 实验表明 3 次迭代即可收敛，额外迭代收益递减

**4. 门控融合**

视觉特征和语言特征来自不同模态，通过门控机制进行自适应融合：

$$\mathbf{G} = \sigma([\mathbf{F}_v, \mathbf{F}_l]\mathbf{W}_f)$$
$$\mathbf{F}_f = \mathbf{G} \odot \mathbf{F}_v + (1 - \mathbf{G}) \odot \mathbf{F}_l$$

其中 \(\mathbf{W}_f \in \mathbb{R}^{2C \times C}\)，\(\sigma\) 为 sigmoid 函数。门控值自适应决定每个特征维度上视觉与语言的贡献比例。

##### 训练策略

**监督训练**采用多任务损失：

$$\mathcal{L} = \lambda_v \mathcal{L}_v + \frac{\lambda_l}{M}\sum_{i=1}^{M}\mathcal{L}_l^i + \frac{1}{M}\sum_{i=1}^{M}\mathcal{L}_f^i$$

其中 \(\mathcal{L}_v\)、\(\mathcal{L}_l\)、\(\mathcal{L}_f\) 分别是视觉、语言、融合分支的交叉熵损失。对每次迭代的语言和融合损失取平均。

**半监督自训练**利用迭代预测的集成进行伪标签过滤：

$$\mathcal{C} = \min_{1 \leq t \leq T} e^{\mathbb{E}[\log P(y_t)]}, \quad P(y_t) = \max_{1 \leq m \leq M} P_m(y_t)$$

只有当文本实例的最小字符置信度 \(\mathcal{C}\) 超过阈值 \(Q\) 时，才将其作为伪标签加入训练。

##### 与传统方法的区别

| 特性 | 传统隐式 LM（如 SRN） | ABINet |
|------|----------------------|--------|
| 语言建模方式 | 隐式（嵌入解码器中） | 显式（独立模块） |
| 梯度流 | 视觉→语言贯通 | 阻断（BGF） |
| 方向性 | 单向或双单向集成 | 真正双向（BCN） |
| 噪声处理 | 单次预测 | 迭代纠正 |
| 可预训练性 | 不支持独立预训练 | 支持纯文本预训练 |
| 可替换性 | LM 与 VM 耦合 | LM 可独立替换升级 |

#### 🧪 练习题

```yaml
question: "ABINet 中双向完形填空网络（BCN）实现双向建模的核心机制是什么？"
options:
  - "使用两个独立的单向 Transformer 分别建模左到右和右到左，再拼接"
  - "采用 BERT 的 [MASK] token 逐位置替换后分别推理"
  - "通过注意力掩码阻止每个位置看到自身信息，从而并行实现双向上下文建模"
  - "使用双向 LSTM 对字符序列进行编码"
answer: 2
explain: "BCN 通过设置注意力掩码 M_ij（i=j 时为 -∞，否则为 0），使每个位置能看到所有其他位置但看不到自身，一次前向传播即可并行完成所有位置的双向预测，避免了 BERT MLM 需要 n 次推理的低效问题。"
```