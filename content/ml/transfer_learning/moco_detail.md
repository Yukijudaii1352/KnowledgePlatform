### MoCo — 动量对比学习

```yaml
id: moco
name: MoCo
full_name: 动量对比学习 (Momentum Contrast)
year: 2019
org: FAIR (Facebook AI Research)
paper_url: https://arxiv.org/abs/1911.05722
category: self_supervised
parent: —
motivation: 用动量更新的队列机制构建大规模负样本字典，解决对比学习中字典规模与一致性的矛盾
```

#### 📝 一句话总结

MoCo 提出以队列（queue）维护大规模动态负样本字典、以动量编码器（momentum encoder）保证字典键表示的一致性，将无监督视觉对比学习建模为字典查找问题，在多个下游检测/分割任务上首次超越 ImageNet 有监督预训练基线。

#### 🎯 核心要点

- **字典查找视角**：将对比学习统一为"编码查询 \(q\) 在字典 \(\{k_0, k_1, ...\}\) 中匹配正键"的范式
- **队列机制**：用 FIFO 队列存储最近 mini-batch 的键表示，字典大小（如 65536）与 batch size 解耦，可灵活扩展
- **动量编码器**：键编码器参数通过 \(\theta_k \leftarrow m\theta_k + (1-m)\theta_q\) 缓慢更新（\(m=0.999\)），保证队列中不同 batch 键表示的一致性
- **InfoNCE 对比损失**：以温度 \(\tau\) 控制分布锐度，正样本相似度最大化、负样本相似度最小化
- **Shuffling BN**：多 GPU 训练时打乱样本顺序送入键编码器的 BN 层，防止模型利用 BN 统计量作弊
- **迁移能力**：在 PASCAL VOC 和 COCO 的 7 个检测/分割任务上，MoCo 预训练超越 ImageNet 有监督预训练
- **通用框架**：后续 MoCo v2/v3 验证该框架可无缝集成更强的数据增强和 Transformer 骨干

#### 🔬 深入细节

##### 核心架构示意图

![MoCo 框架示意图](https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x1.png)

*图 1：MoCo 训练框架。编码查询 \(q\) 由查询编码器 \(f_q\) 生成，字典键由动量编码器 \(f_k\) 生成并存入队列。训练目标是让 \(q\) 与其正键 \(k_+\) 的相似度高于与所有负键的相似度。*

##### 三种对比学习机制对比

![三种对比机制对比](https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x2.png)

*图 2：(a) 端到端方法——字典大小受限于 batch size；(b) Memory Bank——字典大但键表示过时不一致；(c) MoCo——队列解耦字典大小，动量编码器保证一致性。*

##### 算法伪代码

```python
# MoCo 伪代码 (PyTorch 风格)
# f_q: 查询编码器 (梯度更新)
# f_k: 键编码器 (动量更新)
# queue: 负样本字典队列 [K, C]
# m: 动量系数 (0.999)
# tau: 温度参数 (0.07)

f_k.params = f_q.params  # 初始化键编码器

for x in loader:  # 一个 mini-batch 的图像
    x_q = aug(x)  # 查询增强视图
    x_k = aug(x)  # 键增强视图 (不同随机增强)
    
    q = f_q(x_q)  # 查询: [N, C], 归一化
    q = normalize(q, dim=1)
    
    with no_grad():  # 键编码器不回传梯度
        k = f_k(x_k)  # 键: [N, C], 归一化
        k = normalize(k, dim=1)
    
    # 正样本 logits: [N, 1]
    l_pos = bmm(q.view(N,1,C), k.view(N,C,1)).squeeze()  # N×1
    # 负样本 logits: [N, K]
    l_neg = mm(q, queue.T)  # N×K
    
    # InfoNCE 损失
    logits = cat([l_pos, l_neg], dim=1) / tau  # [N, K+1]
    labels = zeros(N)  # 正样本在第 0 列
    loss = CrossEntropyLoss(logits, labels)
    
    loss.backward()
    update(f_q.params)  # SGD 更新查询编码器
    
    # 动量更新键编码器
    f_k.params = m * f_k.params + (1 - m) * f_q.params
    
    # 更新队列: 入队当前 batch 键, 出队最旧 batch
    enqueue(queue, k)
    dequeue(queue)
```

##### 动机与背景

自然语言处理中，GPT 和 BERT 等无监督预训练方法已取得巨大成功，其核心在于离散的 token 空间天然适合构建字典（词表）。然而在计算机视觉中，信号是连续的高维像素，缺乏类似的结构化字典。对比学习试图在特征空间中构建"字典"来弥补这一差距，但面临两个核心矛盾：

1. **字典要大**：负样本越多，对比损失对连续高维空间的采样越充分，表示质量越好
2. **字典要一致**：字典中的键应由相同或相似的编码器生成，否则查询无法与键进行有意义的比较

传统端到端方法（如 SimCLR 的前身 InstDisc）受限于 GPU 显存，batch size 即字典大小；Memory Bank 虽可存储全数据集表示，但键表示来自不同训练阶段的编码器，一致性差。

##### 核心机制详解

**1. 队列（Queue）作为字典**

MoCo 的核心洞察是：字典不必局限于当前 mini-batch。通过维护一个 FIFO 队列，最新编码的 batch 入队，最旧的 batch 出队：

$$\text{Queue} = [k^{(t)}, k^{(t-1)}, ..., k^{(t-K/N+1)}]$$

其中 \(K\) 为队列总大小，\(N\) 为 batch size。这使得字典大小可以远大于 batch size（论文中 \(K=65536\)，而 batch size 仅为 256）。

> 💡 关键：队列的 FIFO 特性保证了字典中的键来自最近的编码器状态，而非任意历史时刻，这比 Memory Bank 的随机采样更一致。

**2. 动量编码器（Momentum Encoder）**

即使使用队列，如果键编码器每步都大幅更新，队列中较早入队的键仍会与当前编码器不一致。MoCo 通过动量更新解决此问题：

$$\theta_k \leftarrow m \cdot \theta_k + (1-m) \cdot \theta_q, \quad m \in [0, 1)$$

当 \(m=0.999\) 时，键编码器的参数变化极为缓慢——需要约 1000 步才能将查询编码器的更新完全传播到键编码器。这意味着队列中跨越数十个 batch 的键表示仍然近似来自同一编码器。

> ⚠️ 注意：论文实验表明 \(m=0.999\) 远优于 \(m=0.9\)（后者相当于 10 步就完全更新，一致性不足），也优于 \(m=0\)（即直接复制查询编码器，等价于端到端方法）。

**3. InfoNCE 对比损失**

给定查询 \(q\)、正键 \(k_+\)（来自同一图像的不同增强）和 \(K\) 个负键，损失函数为：

$$\mathcal{L}_q = -\log \frac{\exp(q \cdot k_+ / \tau)}{\exp(q \cdot k_+ / \tau) + \sum_{i=0}^{K-1} \exp(q \cdot k_i^- / \tau)}$$

这本质上是一个 \((K+1)\)-way softmax 分类器，将正样本对从 \(K\) 个负样本中区分出来。温度 \(\tau=0.07\) 使分布更尖锐，迫使模型学习更细粒度的区分能力。

**4. Shuffling BN 技巧**

Batch Normalization 会在一个 batch 内计算统计量，如果查询和键来自同一 batch 的 BN，模型可能通过 BN 泄漏的统计信息找到"捷径"。MoCo 在多 GPU 环境下，对键编码器的输入进行跨 GPU shuffle，使每个 GPU 上键的 BN 统计量与查询无关，消除信息泄漏。

##### 与传统方法的区别

| 方法 | 字典大小 | 一致性 | 额外显存 |
|------|---------|--------|---------|
| 端到端 (SimCLR 等) | = batch size | ✅ 完全一致 | 需超大 batch (4096+) |
| Memory Bank | = 数据集大小 | ❌ 键来自不同 epoch | 存储全部表示 |
| **MoCo** | 可调（如 65536） | ✅ 动量保证近似一致 | 仅队列 + 额外编码器 |

MoCo 的优势在于：(1) 不需要超大 batch size 和多节点同步（8 GPU 即可训练）；(2) 字典大小灵活可调，不受硬件限制；(3) 动量机制提供了比 Memory Bank 更好的一致性保证。

#### 🧪 练习题

```yaml
question: "MoCo 使用动量更新键编码器（m=0.999）的主要目的是什么？"
options:
  - "加速键编码器的收敛速度"
  - "保证队列中不同时刻编码的键表示具有一致性"
  - "减少键编码器的参数量以节省显存"
  - "防止查询编码器过拟合训练数据"
answer: 1
explain: "动量系数 m=0.999 使键编码器参数变化极为缓慢，确保队列中跨越多个 batch 的键近似来自同一编码器，维持字典的一致性。"
```