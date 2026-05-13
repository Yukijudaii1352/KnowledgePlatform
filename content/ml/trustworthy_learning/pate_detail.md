### PATE

```yaml
id: pate
name: PATE
full_name: "教师集成的隐私聚合 (Private Aggregation of Teacher Ensembles)"
year: 2017
org: Google Brain
paper_url: "https://arxiv.org/abs/1610.05755"
category: foundation
parent: "—"
motivation: "通过教师集成的噪声投票聚合实现差分隐私的知识迁移"
```

#### 📝 一句话总结

PATE 提出了一种基于教师集成噪声投票的隐私保护知识迁移框架，通过将敏感数据分散训练多个教师模型并以差分隐私方式聚合其预测来训练学生模型，结合半监督学习大幅减少隐私预算消耗，实现了当时最优的隐私-效用权衡。

#### 🎯 核心要点

- 提出 PATE 框架：将敏感数据划分为不相交子集，分别训练 n 个教师模型，以黑盒方式聚合知识
- 噪声聚合机制：对教师投票计数添加 Laplace 噪声后取 argmax，实现差分隐私的标签输出
- 半监督学生训练（PATE-G）：利用 GAN 进行半监督学习，仅需少量教师标签即可训练高精度学生
- 改进的隐私分析：应用 moments accountant 技术实现数据依赖的紧致隐私界
- 模型无关性：对教师和学生的模型架构、损失函数、优化算法无任何限制，适用于任意深度学习模型
- 实验结果：MNIST 达到 \((2.04, 10^{-5})\)-DP / 98.00% 准确率；SVHN 达到 \((8.19, 10^{-6})\)-DP / 90.66% 准确率

#### 🔬 深入细节

![PATE 框架示意图](https://ar5iv.labs.arxiv.org/html/1610.05755v4/assets/figures/pate_framework.png)
*图：PATE 框架概览——教师在隐私数据上独立训练，通过噪声聚合为学生提供标签*

##### 算法伪代码

```python
# PATE 训练流程伪代码
# Phase 1: 教师训练
partition D_sensitive into D_1, D_2, ..., D_n  # n个不相交子集
for i in range(n):
    teacher_i = train_model(D_i)  # 独立训练每个教师

# Phase 2: 噪声聚合标注
def noisy_aggregate(x, teachers, gamma):
    """对输入x进行隐私保护的标签聚合"""
    votes = [teacher_i.predict(x) for teacher_i in teachers]
    n_j = count_votes_per_class(votes)  # n_j(x): 投票给类别j的教师数
    noisy_counts = [n_j[c] + Laplace(1/gamma) for c in classes]
    return argmax(noisy_counts)

# Phase 3: 学生半监督训练 (PATE-G)
D_public = unlabeled_public_data()
D_labeled = {(x, noisy_aggregate(x, teachers, gamma)) 
             for x in subset(D_public, k)}  # 仅标注k个样本
student = semi_supervised_GAN_train(D_labeled, D_public)
```

##### 动机与背景

机器学习模型会隐式记忆训练数据，攻击者可通过模型反演（model inversion）等手段恢复敏感训练样本。传统差分隐私方法（如 DP-SGD）需要对训练过程进行侵入式修改（裁剪梯度、添加噪声），且隐私界往往较松。Hamm et al. (2016) 提出了教师-学生知识迁移的隐私保护思路，但仅适用于凸损失的逻辑回归。PATE 的核心动机是：**设计一种模型无关的隐私保护学习框架，使得隐私保证不依赖于具体的学习算法**。

##### 核心机制

**1. 教师集成与数据划分**

将包含 \(N\) 条记录的敏感数据集 \(D\) 随机划分为 \(n\) 个不相交子集 \(D_1, D_2, \ldots, D_n\)，每个子集独立训练一个教师模型 \(T_i\)。由于每个教师仅接触 \(N/n\) 条数据，单个训练样本对最终输出的影响被天然稀释。

**2. 噪声聚合机制（Noisy Aggregation）**

对于输入 \(x\)，定义聚合预测为：

$$f(x) = \arg\max_j \left\{ n_j(x) + \text{Lap}\left(\frac{1}{\gamma}\right) \right\}$$

其中 \(n_j(x) = |\{i : T_i(x) = j\}|\) 是投票给类别 \(j\) 的教师数量，\(\text{Lap}(1/\gamma)\) 是尺度为 \(1/\gamma\) 的 Laplace 噪声。

> 💡 关键：每次聚合查询的隐私代价为 \(\varepsilon = \gamma\)（因为单个训练样本最多影响一个教师的投票，使得投票计数的全局敏感度为 1）。

**3. 半监督学生训练（PATE-G）**

为最小化隐私预算消耗，PATE 利用 Salimans et al. (2016) 的半监督 GAN 方法训练学生：
- 学生拥有大量公开无标签数据（MNIST: 9,000 样本；SVHN: 10,000 样本）
- 仅对其中少量样本（MNIST: 100；SVHN: 500-1,000）通过噪声聚合获取标签
- GAN 的判别器同时作为分类器，利用无标签数据学习数据分布，大幅减少对教师标签的依赖

**4. Moments Accountant 隐私分析**

传统组合定理对多次查询的隐私损失给出线性累加的松弛界。PATE 采用 Abadi et al. (2016) 的 moments accountant 技术，通过追踪隐私损失随机变量的对数矩生成函数获得更紧致的界：

$$\varepsilon = \min_\lambda \frac{1}{\lambda} \sum_{t=1}^{T} \alpha_t(\lambda) + \frac{\log(1/\delta)}{\lambda}$$

其中 \(\alpha_t(\lambda)\) 是第 \(t\) 次查询的 \(\lambda\)-阶矩界。

> 💡 关键：当教师高度一致（投票集中于某一类别）时，噪声几乎不改变输出，隐私损失极小。这种**数据依赖的隐私分析**使得实际隐私界远紧于最坏情况分析。

##### 与传统方法的区别

| 特性 | PATE | DP-SGD (Abadi et al. 2016) | Hamm et al. 2016 |
|------|------|---------------------------|-------------------|
| 模型限制 | 无（黑盒） | 需修改优化器 | 仅凸损失 |
| 隐私机制 | 输出扰动（投票噪声） | 梯度扰动 | 输出扰动 |
| 适用架构 | 任意DNN | 任意DNN | 逻辑回归 |
| MNIST 结果 | (2.04, 10⁻⁵) / 98% | (8, 10⁻⁵) / 97% | — |

PATE 的核心优势在于：(1) 完全黑盒，不需要了解模型内部结构；(2) 隐私保证来自聚合机制而非训练过程，因此对任何学习算法通用；(3) 通过半监督学习大幅减少查询次数，从而降低总隐私预算。

##### 实验配置

- **MNIST**：250 个教师，每个教师训练集约 240 样本；学生使用 9,000 公开样本 + 100 个噪声标签；Laplace 尺度 20（per-query ε=0.05）
- **SVHN**：250 个教师；学生使用 10,000 公开样本 + 500-1,000 个噪声标签
- 教师模型：标准 CNN；学生模型：半监督 GAN（improved-GAN）

#### 🧪 练习题

```yaml
question: "PATE 框架中，噪声聚合机制的全局敏感度为 1 的原因是什么？"
options:
  - "因为 Laplace 噪声的方差为 1"
  - "因为每条训练数据最多影响一个教师的投票，改变一个投票计数最多变化 1"
  - "因为教师模型的输出概率之和为 1"
  - "因为学生模型只查询一次教师集成"
answer: 1
explain: "敏感数据被划分为不相交子集，每条数据仅属于一个教师的训练集，因此添加或移除一条数据最多改变一个教师的预测，使得投票计数向量的 L1 敏感度为 1。"
```