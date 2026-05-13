### MoCo (Momentum Contrast for Unsupervised Visual Representation Learning)

```yaml
id: moco
name: MoCo
full_name: "动量对比学习 (Momentum Contrast for Unsupervised Visual Representation Learning)"
year: "2020"
org: "Facebook AI Research (FAIR)"
paper_url: "https://arxiv.org/abs/1911.05722"
category: "foundation"
parent: "—"
motivation: "通过动量更新的队列字典机制构建大规模一致性负样本库，突破对比学习中字典大小与一致性的矛盾"
```

#### 📝 一句话总结

MoCo 提出将对比学习中的负样本字典维护为一个**动态队列**，并通过**动量更新**的键编码器保持字典表示的一致性，从而在无监督视觉表征学习中构建了大规模且一致的负样本字典，在多个下游任务上超越了有监督预训练的表现。

#### 🎯 核心要点

- **字典即队列（Dictionary as a Queue）**：将负样本字典从 mini-batch 中解耦，以 FIFO 队列形式维护，支持远大于 batch size 的字典规模（如 65536）
- **动量编码器（Momentum Encoder）**：键编码器 \(f_k\) 通过动量更新 \(\theta_k \leftarrow m\theta_k + (1-m)\theta_q\) 缓慢演化（\(m=0.999\)），保证队列中不同 mini-batch 编码的键表示一致性
- **InfoNCE 对比损失**：将对比学习形式化为字典查找问题，使用温度缩放的交叉熵损失匹配 query 与正样本 key
- **三种对比机制对比**：系统分析了 end-to-end、memory bank、MoCo 三种机制在字典大小与一致性上的权衡
- **Shuffling BN**：通过在多 GPU 间打乱 key encoder 的样本顺序，防止 Batch Normalization 的信息泄漏
- **实例判别前置任务（Instance Discrimination）**：同一图像的两个随机增强视图构成正样本对
- **下游迁移超越监督学习**：在 PASCAL VOC 检测、COCO 检测/分割等 7 个下游任务上超越 ImageNet 有监督预训练

#### 🔬 深入细节

##### 核心框架图

![MoCo 框架示意图](https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x1.png)
*图 1：MoCo 通过将字典维护为队列、键编码器通过动量更新来训练视觉表征编码器。查询 q 与字典中的键通过对比损失进行匹配。*

![三种对比学习机制对比](https://ar5iv.labs.arxiv.org/html/1911.05722/assets/x2.png)
*图 2：三种对比损失机制对比——(a) end-to-end：字典大小受限于 mini-batch；(b) memory bank：字典大但一致性差；(c) MoCo：通过队列+动量实现大字典与高一致性的统一。*

##### 算法伪代码

```python
# MoCo 伪代码 (PyTorch 风格)
# f_q, f_k: 查询编码器和键编码器
# queue: 字典队列，维度 CxK (C=特征维度, K=队列大小)
# m: 动量系数 (默认 0.999)
# t: 温度参数 (默认 0.07)

f_k.params = f_q.params  # 初始化：键编码器参数拷贝自查询编码器

for x in loader:  # 遍历每个 mini-batch
    x_q = aug(x)   # 随机数据增强版本 1
    x_k = aug(x)   # 随机数据增强版本 2

    q = f_q.forward(x_q)  # 查询向量: NxC
    k = f_k.forward(x_k)  # 键向量: NxC
    k = k.detach()         # 键编码器不参与梯度回传

    # 正样本 logits: Nx1
    l_pos = bmm(q.view(N,1,C), k.view(N,C,1))
    # 负样本 logits: NxK (从队列中获取)
    l_neg = mm(q.view(N,C), queue.view(C,K))
    # 拼接 logits: Nx(1+K)
    logits = cat([l_pos, l_neg], dim=1)

    # InfoNCE 对比损失 (正样本在第 0 位)
    labels = zeros(N)
    loss = CrossEntropyLoss(logits / t, labels)

    # 仅更新查询编码器
    loss.backward()
    update(f_q.params)

    # 动量更新键编码器
    f_k.params = m * f_k.params + (1 - m) * f_q.params

    # 更新队列：入队当前 mini-batch，出队最早的 mini-batch
    enqueue(queue, k)
    dequeue(queue)
```

##### 方法详解

**1. 动机与背景：对比学习的字典困境**

无监督视觉表征学习的核心思路是将对比学习视为**字典查找（dictionary look-up）**问题：给定一个编码后的查询 \(q\)，需要在一组编码后的键 \(\{k_0, k_1, k_2, \ldots\}\) 中找到与 \(q\) 匹配的正样本键 \(k_+\)。好的视觉表征需要一个满足两个条件的字典：

1. **足够大**：覆盖丰富的负样本，使对比信号更有区分力
2. **一致性好**：字典中所有键应由相似（或相同）的编码器生成，否则键之间不可比

然而，此前的两种主流方法各有缺陷：
- **端到端（End-to-end）方法**：字典大小 = mini-batch 大小，受限于 GPU 显存，通常只有几百到几千
- **Memory Bank 方法**：虽然字典可以覆盖整个数据集，但每个样本的表示在上次被访问时更新，导致字典中的键来自训练过程中差异巨大的编码器版本，一致性极差

> 💡 **关键洞察**：MoCo 的核心贡献在于同时解决了"大字典"和"高一致性"这对矛盾——用队列解耦字典大小，用动量更新保证一致性。

**2. 核心机制一：字典即队列（Dictionary as a Queue）**

MoCo 将负样本字典维护为一个**先进先出（FIFO）队列**：
- 每个 mini-batch 的编码键被**入队（enqueue）**到字典末尾
- 最早的 mini-batch 被**出队（dequeue）**移除
- 队列大小 \(K\) 是一个独立的超参数，与 mini-batch 大小完全解耦

这意味着即使 batch size 只有 256，字典大小也可以设为 65536（论文默认值），提供了 256 倍的负样本数量。同时，移除最旧的 mini-batch 也是有益的，因为它们的编码键与当前编码器差异最大。

**3. 核心机制二：动量更新（Momentum Update）**

使用队列带来了一个新问题：队列中的键由不同时刻的编码器生成，无法通过反向传播统一更新。简单地将键编码器 \(f_k\) 直接拷贝为查询编码器 \(f_q\) 效果很差，因为编码器快速变化导致键表示不一致。

MoCo 提出**动量更新**策略：

$$\theta_k \leftarrow m \cdot \theta_k + (1-m) \cdot \theta_q$$

其中 \(m \in [0,1)\) 是动量系数。只有查询编码器 \(\theta_q\) 通过梯度下降更新，键编码器 \(\theta_k\) 则通过指数移动平均（EMA）缓慢跟随。

> ⚠️ **注意**：论文发现 \(m=0.999\) 远优于 \(m=0.9\)，说明键编码器必须**极其缓慢**地演化。这保证了队列中不同时刻编码的键之间差异很小，维持了字典的一致性。

**4. 对比损失函数：InfoNCE**

MoCo 使用 InfoNCE 作为对比损失函数，将其形式化为 \((K+1)\) 路 softmax 分类：

$$\mathcal{L}_q = -\log \frac{\exp(q \cdot k_+ / \tau)}{\sum_{i=0}^{K} \exp(q \cdot k_i / \tau)}$$

其中：
- \(q\) 是查询编码器输出的查询向量
- \(k_+\) 是唯一的正样本键（同一图像的不同增强视图）
- \(k_i\) 包含 1 个正样本和 \(K\) 个负样本（来自队列）
- \(\tau\) 是温度参数（默认 0.07），控制分布的锐度

**5. 前置任务与技术细节**

- **实例判别**：同一图像的两个随机增强版本构成正样本对，不同图像为负样本
- **编码器架构**：标准 ResNet，最后全连接层输出 128 维向量，经 L2 归一化
- **数据增强**：224×224 随机裁剪 + 随机颜色抖动 + 随机水平翻转 + 随机灰度转换
- **Shuffling BN**：为防止 Batch Normalization 在 batch 内泄漏信息（模型可通过 BN 统计量"作弊"），MoCo 在多 GPU 训练时对键编码器的输入样本顺序进行跨 GPU 打乱，确保计算 query 和其正样本 key 的 BN 统计量来自不同子集

**6. 与传统方法的关键区别**

| 特性 | End-to-end | Memory Bank | MoCo |
|------|-----------|-------------|------|
| 字典大小 | = batch size（受限） | = 数据集大小（极大） | = 队列大小（灵活可调） |
| 一致性 | 高（同一编码器） | 低（跨 epoch 编码器） | 高（动量编码器缓慢演化） |
| 反向传播 | 通过所有样本 | 无（采样表示） | 仅通过查询编码器 |
| 内存效率 | 低（大 batch 需大显存） | 低（存储所有样本表示） | 高（仅维护队列） |
| 可扩展性 | 受限 | 受限于数据集大小 | 可扩展至十亿级数据 |

> 💡 **核心创新总结**：MoCo 的 queue + momentum 设计是一个优雅的工程-算法协同方案——队列提供了大规模负样本，动量更新保证了这些负样本的表示质量，两者缺一不可。

#### 🧪 练习题

```yaml
question: "MoCo 中动量系数 m 设为 0.999 而非 0.9 的主要原因是什么？"
options:
  - "更大的动量可以加速训练收敛"
  - "更大的动量使键编码器缓慢演化，保证队列中键表示的一致性"
  - "更大的动量可以增大字典队列的容量"
  - "更大的动量可以减少 GPU 显存占用"
answer: 1
explain: "动量系数越接近 1，键编码器参数变化越慢，使得队列中不同 mini-batch 编码的键之间差异更小，从而保持字典的一致性。实验表明 m=0.999 远优于 m=0.9。"
```