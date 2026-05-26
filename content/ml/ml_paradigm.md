---
domain: ml
topic_id: ml_paradigm
topic_name: 机器学习范式
page_icon: 🧠
page_title: 机器学习范式
page_subtitle: '{build_date} 版'
page_desc: 涵盖监督、无监督、半监督、自监督、强化学习五大核心范式的演化历程与前沿进展
hero_pills:
- 监督学习
- 无监督学习
- 半监督学习
- 自监督学习
- 强化学习
count_pill: '{count} 个算法'
categories:
  foundation:
    label: 奠基性算法
    color: '#4A90D9'
  core:
    label: 核心范式算法
    color: '#50C878'
  frontier:
    label: 前沿进展(2023-2026)
    color: '#FF6B6B'
---

## 领域综述

### 待补充：阶段性领域总结
请补充一篇纵观一段时间以来的总结性文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 最新进展综述

### 待补充：最近一个月最新动向
请补充最近一个月该领域最新动向的综述文档，建议使用 `!INCLUDE_RAW path/to/article.md` 引入人工筛选后的 Markdown。

## 算法演化关系

```yaml
nodes:
- id: kmeans
  x: 0
  y: 35
  category: foundation
- id: backprop
  x: 15
  y: 20
  category: foundation
- id: svm
  x: 25
  y: 20
  category: core
- id: pseudo_label
  x: 40
  y: 50
  category: foundation
- id: vae
  x: 42
  y: 35
  category: core
- id: dqn
  x: 45
  y: 80
  category: core
- id: ppo
  x: 52
  y: 80
  category: core
- id: bert
  x: 60
  y: 65
  category: core
- id: simclr
  x: 65
  y: 65
  category: core
- id: fixmatch
  x: 68
  y: 50
  category: core
- id: mae
  x: 75
  y: 65
  category: frontier
- id: ijepa
  x: 85
  y: 65
  category: frontier
- id: dpo
  x: 87
  y: 80
  category: frontier
- id: dinov3
  x: 95
  y: 65
  category: frontier
- id: grpo
  x: 100
  y: 80
  category: frontier
edges:
- from: pseudo_label
  to: fixmatch
  label: 一致性正则
- from: bert
  to: mae
  label: 视觉迁移
- from: mae
  to: ijepa
  label: 联合嵌入
- from: ijepa
  to: dinov3
  label: 规模扩展
- from: dqn
  to: ppo
  label: 策略梯度
- from: ppo
  to: dpo
  label: 偏好对齐
- from: dpo
  to: grpo
  label: 群体优化
- from: simclr
  to: mae
  label: 掩码学习
- from: backprop
  to: bert
  label: 深度学习
- from: vae
  to: simclr
  label: 表示学习
milestones:
- backprop
- bert
- ppo
- grpo
```

## 核心算法

### 反向传播

```yaml
id: backprop
num: 1
name: 反向传播
full_name: Backpropagation
year: '1986'
org: UCSD/CMU
parent: —
paper_url: https://www.nature.com/articles/323533a0
project_url: ''
category: foundation
motivation: 误差反向传播实现多层网络训练
```

#### 📝 一句话总结
Rumelhart、Hinton 与 Williams 提出了反向传播（Backpropagation）学习算法，通过链式法则将输出层误差逐层反向传播至隐藏层以计算梯度，首次实现了对多层神经网络的有效训练，使隐藏单元能够自动学习到有意义的内部表征，突破了感知机只能处理线性可分问题的根本局限。

#### 🎯 核心要点
- **广义 Delta 规则**：将单层感知机的 Delta 规则推广到多层网络，利用链式法则逐层计算误差梯度
- **隐藏层表征学习**：隐藏单元在训练过程中自动发现输入数据的内部特征表示，无需人工设计
- **可微激活函数**：采用 sigmoid（logistic）等连续可微非线性函数替代阶跃函数，使梯度可沿网络反向流动
- **梯度下降优化**：通过最小化输出层均方误差（MSE），沿负梯度方向迭代更新所有层的权重
- **前向传播 + 反向传播**：两阶段计算——前向计算各层激活值，反向传播误差信号并计算权重梯度
- **XOR 问题求解**：成功训练两层网络解决 XOR 等线性不可分问题，直接回应了 Minsky & Papert 对感知机的批评
- **分布式表征实验**：在家族关系推理、对称性检测等任务上展示了隐藏单元学习到的分布式编码

#### 🔬 深入细节
![反向传播算法示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Backpropagation-network.svg/400px-Backpropagation-network.svg.png)
*图：多层前馈神经网络中反向传播的信息流示意。前向传播（蓝色箭头）计算各层激活值，反向传播（红色箭头）将误差信号从输出层逐层回传至隐藏层，用于计算各权重的梯度。*

##### 算法伪代码

```python
# Backpropagation 算法伪代码
def backpropagation(network, X, Y, learning_rate, max_epochs):
    initialize_weights_randomly(network)
    
    for epoch in range(max_epochs):
        for (x, y) in zip(X, Y):
            # ===== 前向传播 =====
            a[0] = x  # 输入层激活值
            for l in range(1, L+1):  # 逐层计算
                z[l] = W[l] @ a[l-1] + b[l]       # 线性组合
                a[l] = sigmoid(z[l])                # 非线性激活
            
            # ===== 计算输出层误差 =====
            delta[L] = (a[L] - y) * sigmoid_derivative(z[L])
            
            # ===== 反向传播误差 =====
            for l in range(L-1, 0, -1):  # 从倒数第二层到第一层
                delta[l] = (W[l+1].T @ delta[l+1]) * sigmoid_derivative(z[l])
            
            # ===== 更新权重 =====
            for l in range(1, L+1):
                W[l] -= learning_rate * delta[l] @ a[l-1].T
                b[l] -= learning_rate * delta[l]
    
    return network
```

##### 动机与背景

20 世纪 60 年代，Rosenblatt 提出的感知机（Perceptron）展示了单层神经网络的学习能力，其收敛定理保证了对线性可分问题的求解。然而，1969 年 Minsky 与 Papert 在《Perceptrons》一书中严格证明了单层感知机无法解决 XOR 等线性不可分问题，并指出多层网络虽然理论上可以克服这一限制，但**缺乏有效的训练算法**。这一论断导致神经网络研究进入了长达十余年的低谷期（"AI 寒冬"的重要诱因之一）。

问题的核心在于：对于多层网络中的隐藏层，由于没有直接的"期望输出"作为监督信号，无法直接应用感知机的 Delta 规则来计算隐藏层权重的更新量。换言之，**信用分配问题（Credit Assignment Problem）**——如何将输出层的误差合理地归因到各隐藏层的各个权重——是多层网络训练的根本障碍。

> 💡 关键：反向传播的核心洞察是：虽然隐藏层没有直接的目标输出，但通过**链式法则（Chain Rule）**，可以将损失函数对输出层的梯度逐层向后传递，精确计算损失函数对网络中**每一个权重**的偏导数，从而实现端到端的梯度下降训练。

##### 核心机制：前向传播与反向传播

**网络结构**

论文考虑的是标准的多层前馈网络（Feedforward Network）。设网络共有 \(L\) 层（不计输入层），第 \(l\) 层有 \(n_l\) 个单元。每个单元 \(j\) 在第 \(l\) 层的计算过程为：

$$z_j^{(l)} = \sum_{i} w_{ji}^{(l)} \, a_i^{(l-1)} + b_j^{(l)}$$

$$a_j^{(l)} = f\!\left(z_j^{(l)}\right)$$

其中 \(w_{ji}^{(l)}\) 是第 \(l\) 层单元 \(j\) 与第 \(l-1\) 层单元 \(i\) 之间的连接权重，\(b_j^{(l)}\) 是偏置，\(f(\cdot)\) 是激活函数。

**Sigmoid 激活函数**

论文采用 logistic sigmoid 函数作为激活函数：

$$f(z) = \sigma(z) = \frac{1}{1 + e^{-z}}$$

其关键性质是导数可以用自身表示：

$$\sigma'(z) = \sigma(z)\,(1 - \sigma(z))$$

这一性质使得反向传播中的梯度计算极为高效——无需额外存储中间导数值，直接利用前向传播已经计算好的激活值即可。

> ⚠️ 注意：选择连续可微的激活函数是反向传播能够工作的前提条件。早期感知机使用的阶跃函数（Heaviside）在阈值处不可微，梯度为零或未定义，无法进行基于梯度的优化。

**损失函数**

对于单个训练样本 \((x, y)\)，损失函数定义为输出层的均方误差：

$$E = \frac{1}{2} \sum_{j=1}^{n_L} \left(y_j - a_j^{(L)}\right)^2$$

总损失为所有训练样本损失之和。目标是通过调整网络中所有权重 \(\{w_{ji}^{(l)}\}\) 来最小化 \(E\)。

**反向传播的梯度推导**

反向传播的核心是计算 \(\frac{\partial E}{\partial w_{ji}^{(l)}}\)。通过链式法则，定义第 \(l\) 层单元 \(j\) 的**误差信号**（或称"灵敏度"）：

$$\delta_j^{(l)} = \frac{\partial E}{\partial z_j^{(l)}}$$

对于**输出层**（\(l = L\)）：

$$\delta_j^{(L)} = \frac{\partial E}{\partial a_j^{(L)}} \cdot f'\!\left(z_j^{(L)}\right) = \left(a_j^{(L)} - y_j\right) \cdot \sigma'\!\left(z_j^{(L)}\right)$$

对于**隐藏层**（\(l < L\)），通过链式法则将后一层的误差信号反向传播：

$$\delta_j^{(l)} = f'\!\left(z_j^{(l)}\right) \sum_{k} w_{kj}^{(l+1)} \, \delta_k^{(l+1)}$$

这就是"反向传播"名称的由来——第 \(l\) 层的误差信号 \(\delta_j^{(l)}\) 是由第 \(l+1\) 层的误差信号 \(\delta_k^{(l+1)}\) 经权重 \(w_{kj}^{(l+1)}\) 加权求和后，再乘以当前层激活函数的导数得到的。

最终，权重的梯度为：

$$\frac{\partial E}{\partial w_{ji}^{(l)}} = \delta_j^{(l)} \cdot a_i^{(l-1)}$$

权重更新规则（梯度下降）：

$$\Delta w_{ji}^{(l)} = -\eta \, \frac{\partial E}{\partial w_{ji}^{(l)}} = -\eta \, \delta_j^{(l)} \, a_i^{(l-1)}$$

其中 \(\eta\) 为学习率。

> 💡 关键：反向传播的计算复杂度与前向传播相同，均为 \(O(W)\)（\(W\) 为网络总权重数）。这意味着计算所有权重的梯度只需要一次前向传播加一次反向传播，而非对每个权重单独进行有限差分近似（那将需要 \(O(W^2)\) 的计算量）。

##### 隐藏层表征的自动发现

论文最具影响力的贡献之一是展示了隐藏单元能够**自动学习有意义的内部表征**。在训练过程中，隐藏层的激活模式自发组织为对输入特征的分布式编码（Distributed Representation），而非由人工预先设计。

**XOR 问题**：论文展示了一个包含 2 个输入单元、2 个隐藏单元和 1 个输出单元的网络，经反向传播训练后成功学会了 XOR 函数。隐藏单元学到的表征将原本线性不可分的四个输入模式映射到了一个线性可分的新空间。

**家族关系任务**：论文设计了一个更复杂的实验——给定"A 是 B 的父亲"这样的关系三元组，训练网络预测关系。隐藏单元自动学习到了人物的国籍、辈分、性别等语义特征的分布式编码，尽管这些特征从未被显式提供。

**对称性检测**：网络被训练判断二进制输入模式是否关于中心对称。隐藏单元学会了将对称位置的输入进行配对比较。

##### 与此前方法的对比

| 特性 | 感知机 (Rosenblatt, 1962) | 反向传播 (Rumelhart et al., 1986) |
|------|--------------------------|----------------------------------|
| 网络层数 | 单层（输入→输出） | 任意多层（含隐藏层） |
| 激活函数 | 阶跃函数（不可微） | Sigmoid（连续可微） |
| 学习规则 | Delta 规则 | 广义 Delta 规则（链式法则） |
| 可解问题 | 仅线性可分 | 任意复杂决策边界（理论上） |
| 特征表示 | 人工设计 | 自动学习（隐藏层表征） |
| 信用分配 | 不需要（单层） | 通过误差反向传播解决 |

> 💡 关键：反向传播不仅是一个训练算法，更是一种**自动特征学习**的范式——它证明了多层网络可以通过端到端的梯度优化自动发现数据中的层次化特征表示，这一思想直接奠定了现代深度学习的理论基础。

##### 历史注记与后续影响

反向传播的思想并非 1986 年首次出现。1970 年 Linnainmaa 提出了自动微分的反向模式，1974 年 Werbos 在博士论文中将其应用于神经网络，1985 年 Le Cun 也独立提出了类似方法。然而，Rumelhart、Hinton 与 Williams 的 1986 年 Nature 论文通过清晰的阐述和令人信服的实验（尤其是隐藏层表征学习的演示），使反向传播被广泛接受，直接推动了神经网络研究的复兴（"连接主义"浪潮）。

反向传播至今仍是训练神经网络的核心算法。现代深度学习框架（PyTorch、TensorFlow）中的自动微分（Autograd）机制本质上是反向传播的工程化实现，结合了计算图、动态/静态图编译等优化技术，但核心的链式法则梯度传播原理与 1986 年论文完全一致。

#### 🧪 练习题
```yaml
question: "反向传播算法能够训练多层网络的关键前提条件是什么？"
options:
  - "使用足够多的隐藏层单元"
  - "采用连续可微的激活函数，使梯度可以通过链式法则逐层传播"
  - "使用交叉熵损失函数替代均方误差"
  - "训练数据必须是线性可分的"
answer: 1
explain: "反向传播依赖链式法则计算各层梯度，这要求激活函数连续可微。早期感知机使用不可微的阶跃函数，导致梯度无法回传，是多层网络无法训练的根本原因。论文采用 sigmoid 函数解决了这一问题。"
```

### SVM

```yaml
id: svm
num: 2
name: SVM
full_name: Support Vector Machine
year: '1995'
org: AT&T Bell Labs
parent: —
paper_url: https://link.springer.com/article/10.1007/BF00994018
project_url: ''
category: core
motivation: 核函数与最大间隔分类理论
```

#### 📝 一句话总结
SVM 提出了基于最大间隔（maximum margin）原理的分类方法，通过引入软间隔（soft margin）处理不可分数据，并利用核技巧（kernel trick）将线性分类器隐式映射到高维特征空间实现非线性决策面，在手写数字识别等任务上超越了当时的神经网络方法。

#### 🎯 核心要点
- **最大间隔超平面**：在所有能正确分类训练数据的超平面中，选择使两类之间几何间隔最大的唯一最优超平面
- **支持向量**：仅位于间隔边界上的少量训练样本（支持向量）决定最优超平面，其余样本不影响决策面
- **对偶问题与二次规划**：通过 Lagrange 对偶将原始约束优化转化为仅依赖样本内积的二次规划（QP）问题
- **软间隔分类器**：引入松弛变量 \(\xi_i\) 和惩罚参数 \(C\)，允许部分样本违反间隔约束，平衡间隔最大化与误分类最小化
- **核技巧（Kernel Trick）**：利用满足 Mercer 条件的核函数 \(K(\mathbf{u}, \mathbf{v})\) 替代内积，隐式在高维空间构造非线性决策面，无需显式计算特征映射
- **多种核函数**：支持多项式核 \(K(\mathbf{u},\mathbf{v})=({\mathbf{u} \cdot \mathbf{v}}+1)^d\)、径向基函数（RBF）核等，通过更换核函数即可实现不同类型的决策面
- **VC 维与结构风险最小化**：最大间隔原则等价于控制假设空间的 VC 维，天然实现了结构风险最小化（SRM），有效防止过拟合
- **实验验证**：在 USPS 手写数字数据集上，4 阶多项式核 SVM 达到 4.3% 错误率，优于当时最优的 5 层神经网络（5.1%）

#### 🔬 深入细节
![SVM 最大间隔分类示意图](https://upload.wikimedia.org/wikipedia/commons/7/72/SVM_margin.png)
*图：SVM 最大间隔分类器示意。实线为最优超平面，虚线为间隔边界，间隔边界上的样本即为支持向量（用圆圈标出）。SVM 的目标是最大化两条虚线之间的距离（margin）。*

##### 算法伪代码

```python
# SVM 训练与预测伪代码（对偶形式 + 核函数）
def svm_train(X, y, C, kernel_fn):
    """
    X: 训练样本 (n × d)
    y: 标签 ∈ {-1, +1} (n,)
    C: 软间隔惩罚参数
    kernel_fn: 核函数 K(u, v)
    """
    n = len(X)
    
    # Step 1: 构造核矩阵
    D = [[y[i] * y[j] * kernel_fn(X[i], X[j]) for j in range(n)] for i in range(n)]
    
    # Step 2: 求解对偶二次规划问题
    #   maximize  W(α) = Σα_i - (1/2) Σ α_i α_j y_i y_j K(x_i, x_j)
    #   subject to: 0 ≤ α_i ≤ C,  Σ α_i y_i = 0
    alpha = solve_qp(D, y, C)
    
    # Step 3: 提取支持向量 (α_i > 0)
    support_vectors = [(X[i], y[i], alpha[i]) for i in range(n) if alpha[i] > 0]
    
    # Step 4: 计算偏置 b（利用 0 < α_i < C 的支持向量）
    b = compute_bias(support_vectors, kernel_fn)
    
    return support_vectors, b

def svm_predict(x, support_vectors, b, kernel_fn):
    # 决策函数: f(x) = Σ y_i α_i K(x, x_i) + b
    score = sum(y_i * alpha_i * kernel_fn(x, x_i) for x_i, y_i, alpha_i in support_vectors)
    return sign(score + b)
```

##### 动机与背景

传统的感知机（Perceptron）算法虽然能找到一个将两类数据分开的超平面，但这样的超平面并不唯一——存在无穷多个可行解，且不同解的泛化能力差异巨大。Vapnik 和 Chervonenkis 的统计学习理论指出，分类器的泛化误差不仅取决于训练误差，还取决于假设空间的复杂度（VC 维）。一个自然的问题是：**能否找到一个具有最优泛化保证的超平面？**

论文的核心洞察是：在所有正确分类训练数据的超平面中，**几何间隔最大的超平面具有最小的 VC 维**，从而拥有最优的泛化能力上界。这就是"最大间隔"原则的理论基础。此外，现实数据往往线性不可分，论文进一步提出了两个关键扩展：（1）软间隔允许部分误分类以换取更大的间隔；（2）核技巧将输入空间非线性映射到高维特征空间，使得原本不可分的数据在新空间中变得线性可分。

##### 核心机制：最优超平面与对偶问题

给定训练集 \(\{(\mathbf{x}_i, y_i)\}_{i=1}^{\ell}\)，其中 \(y_i \in \{-1, +1\}\)，超平面 \(\mathbf{w} \cdot \mathbf{x} + b = 0\) 将两类分开。最优超平面的构造等价于以下约束优化问题：

$$
\min_{\mathbf{w}, b} \frac{1}{2} \|\mathbf{w}\|^2 \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1, \quad i = 1, \ldots, \ell
$$

约束条件要求所有样本到超平面的函数间隔至少为 1，而目标函数最小化 \(\|\mathbf{w}\|^2\) 等价于最大化几何间隔 \(\rho = \frac{2}{\|\mathbf{w}\|}\)。通过引入 Lagrange 乘子 \(\alpha_i \geq 0\)，可以将原始问题转化为对偶问题：

$$
\max_{\boldsymbol{\alpha}} W(\boldsymbol{\alpha}) = \sum_{i=1}^{\ell} \alpha_i - \frac{1}{2} \sum_{i,j=1}^{\ell} \alpha_i \alpha_j y_i y_j (\mathbf{x}_i \cdot \mathbf{x}_j)
$$

$$
\text{s.t.} \quad \alpha_i \geq 0, \quad \sum_{i=1}^{\ell} \alpha_i y_i = 0
$$

对偶问题的关键优势在于：（1）约束更简单（非负约束 + 一个等式约束）；（2）目标函数仅依赖样本之间的**内积** \(\mathbf{x}_i \cdot \mathbf{x}_j\)，这为后续的核技巧奠定了基础。在最优解中，只有满足 \(y_i(\mathbf{w} \cdot \mathbf{x}_i + b) = 1\) 的样本对应 \(\alpha_i > 0\)，这些样本就是**支持向量**。最优权重向量可表示为支持向量的线性组合：\(\mathbf{w}_0 = \sum_{i=1}^{\ell} \alpha_i y_i \mathbf{x}_i\)。

> 💡 **关键直觉**：最优超平面完全由少数支持向量决定，与训练集大小无关。这意味着 SVM 天然具有稀疏性，预测时只需计算新样本与支持向量的内积。

##### 软间隔分类器

当训练数据线性不可分时，不存在满足所有约束的超平面。论文引入松弛变量 \(\xi_i \geq 0\) 放松约束，并通过惩罚参数 \(C\) 控制误分类代价：

$$
\min_{\mathbf{w}, b, \boldsymbol{\xi}} \frac{1}{2} \|\mathbf{w}\|^2 + C \sum_{i=1}^{\ell} \xi_i \quad \text{s.t.} \quad y_i(\mathbf{w} \cdot \mathbf{x}_i + b) \geq 1 - \xi_i, \quad \xi_i \geq 0
$$

当 \(\xi_i = 0\) 时样本被正确分类且在间隔外；\(0 < \xi_i < 1\) 时样本在间隔内但仍被正确分类；\(\xi_i \geq 1\) 时样本被误分类。参数 \(C\) 控制间隔最大化与误分类惩罚之间的权衡：\(C\) 越大越倾向于零训练误差（硬间隔），\(C\) 越小越倾向于更大间隔（容忍更多误分类）。

对偶形式中，软间隔仅在约束上增加了上界：\(0 \leq \alpha_i \leq C\)，其余形式与硬间隔完全一致。论文还讨论了使用 \(F(u) = u^2\) 的二次惩罚变体，此时对偶目标函数增加一个正则项 \(\frac{\alpha_{\max}}{C}\)，保证解的唯一性。

##### 核技巧与非线性扩展

SVM 最深刻的创新在于**核技巧**。设 \(\phi: \mathbb{R}^n \to \mathbb{R}^N\) 是将输入映射到高维特征空间的变换，则在特征空间中构造线性分类器等价于在输入空间中构造非线性分类器。由于对偶问题和决策函数都只依赖内积 \(\phi(\mathbf{x}_i) \cdot \phi(\mathbf{x}_j)\)，只要存在核函数 \(K(\mathbf{u}, \mathbf{v}) = \phi(\mathbf{u}) \cdot \phi(\mathbf{v})\) 可以直接计算，就无需显式构造 \(\phi\)。

根据 **Mercer 定理**，任何满足正定条件的对称函数都可以作为合法的核函数：

$$
\iint K(\mathbf{u}, \mathbf{v}) g(\mathbf{u}) g(\mathbf{v}) \, d\mathbf{u} \, d\mathbf{v} \geq 0, \quad \forall g \in L^2
$$

论文中使用的核函数包括：

| 核函数 | 表达式 | 对应特征空间 |
|--------|--------|-------------|
| 多项式核 | \(K(\mathbf{u},\mathbf{v}) = (\mathbf{u} \cdot \mathbf{v} + 1)^d\) | \(d\) 阶多项式的所有单项式 |
| RBF 核 | \(K(\mathbf{u},\mathbf{v}) = \exp\left(-\frac{\|\mathbf{u}-\mathbf{v}\|^2}{2\sigma^2}\right)\) | 无穷维 Hilbert 空间 |

决策函数变为：

$$
f(\mathbf{x}) = \text{sign}\left(\sum_{i=1}^{\ell} y_i \alpha_i K(\mathbf{x}, \mathbf{x}_i) + b\right)
$$

> ⚠️ **注意**：核技巧的计算复杂度与特征空间维度 \(N\) 无关，仅与训练样本数 \(\ell\) 相关。例如 7 阶多项式核对应 \(\sim 10^{16}\) 维特征空间，但核函数计算仅需 \(O(n)\) 时间（\(n\) 为输入维度）。

##### 与传统方法的对比

论文在 USPS 手写数字数据集（7300 训练 / 2000 测试，16×16 像素）上进行了系统实验。使用多项式核 \(d=1\) 到 \(d=7\)，结果显示：线性 SVM 错误率 12.0%，2 阶多项式降至 4.7%，4 阶以上稳定在 ~4.3%，最优为 6 阶的 4.2%。作为对比，当时最优的 5 层特殊架构神经网络（LeNet1）错误率为 5.1%，标准两层神经网络为 6.6%，决策树（CART/C4.5）为 16-17%。

值得注意的是，随着多项式阶数从 3 增加到 7，特征空间维度从 \(10^6\) 增长到 \(10^{16}\)，但支持向量数量仅从 148 增加到 190（增长 28%），且测试错误率几乎不变。这有力地验证了 SVM 通过最大间隔原则控制 VC 维、抵抗过拟合的理论预测——即使在极高维特征空间中，SVM 的泛化能力仍由支持向量数量（而非特征维度）决定。

#### 🧪 练习题
```yaml
question: "SVM 中核技巧（Kernel Trick）的本质作用是什么？"
options:
  - "降低训练数据的维度以加速计算"
  - "通过核函数隐式计算高维特征空间中的内积，避免显式构造特征映射"
  - "将非凸优化问题转化为凸优化问题"
  - "自动选择最优的惩罚参数 C"
answer: 1
explain: "核技巧利用满足 Mercer 条件的核函数 K(u,v) = φ(u)·φ(v) 直接计算高维特征空间中的内积，无需显式计算映射 φ，从而以输入空间的计算代价实现高维（甚至无穷维）特征空间中的线性分类。"
```

### K-means

```yaml
id: kmeans
num: 3
name: K-means
full_name: K-means Clustering
year: '1967'
org: Bell Labs
parent: —
paper_url: '-'
project_url: ''
category: foundation
motivation: 迭代优化最小化簇内方差
```

#### 📝 一句话总结
K-means 提出了一种基于迭代优化的聚类方法，通过交替执行"分配样本到最近质心"和"更新质心为簇均值"两步，最小化簇内平方误差和（Within-Cluster Sum of Squares），成为无监督学习中最经典、应用最广泛的聚类算法。

#### 🎯 核心要点
- **迭代两步法**：交替执行 Assignment（分配）和 Update（更新）两步直至收敛
- **目标函数**：最小化簇内平方误差和（WCSS / Inertia），即所有样本到其所属质心的欧氏距离平方之和
- **Lloyd 算法**：1957 年由 Stuart Lloyd 在 Bell Labs 提出的标准迭代求解过程（1982 年正式发表）
- **MacQueen 命名**：1967 年 James MacQueen 正式提出 "K-means" 术语，并给出在线更新变体
- **收敛保证**：每次迭代目标函数单调不增，有限步内必收敛至局部最优
- **初始化敏感**：结果强依赖初始质心选择，催生了 K-means++、多次随机重启等改进策略
- **时间复杂度**：单次迭代 \(O(nKd)\)，其中 \(n\) 为样本数、\(K\) 为簇数、\(d\) 为特征维度
- **适用假设**：隐含假设簇为凸形、各向同性（球状），且各簇大小相近

#### 🔬 深入细节
![K-means 迭代过程示意图](https://upload.wikimedia.org/wikipedia/commons/e/ea/K-means_convergence.gif)
*图：K-means 算法在二维数据上的迭代收敛过程。不同颜色表示不同簇的分配结果，"×"标记为质心位置，随迭代逐步稳定。*

##### 算法伪代码

```python
# K-means (Lloyd's Algorithm) 伪代码
def kmeans(X, K, max_iter=100):
    # Step 0: 随机初始化 K 个质心
    centroids = random_select(X, K)
    
    for t in range(max_iter):
        # Step 1: Assignment — 将每个样本分配到最近的质心
        clusters = {}
        for x_i in X:
            k_star = argmin_k ||x_i - centroids[k]||^2
            clusters[k_star].append(x_i)
        
        # Step 2: Update — 重新计算每个簇的质心
        new_centroids = []
        for k in range(K):
            new_centroids[k] = mean(clusters[k])
        
        # Step 3: 收敛判断
        if centroids == new_centroids:
            break
        centroids = new_centroids
    
    return centroids, clusters
```

##### 动机与背景

在无监督学习场景中，核心任务之一是将 \(n\) 个数据点划分为 \(K\) 个互不相交的组（簇），使得组内样本尽可能相似、组间样本尽可能不同。这一问题在信号处理（矢量量化）、数据压缩、模式识别等领域有广泛需求。

最优划分问题本身是 NP-hard 的——穷举所有可能的划分方案数量随 \(n\) 和 \(K\) 指数增长（Stirling 数第二类）。因此，需要一种高效的近似算法。1957 年，Bell Labs 的 Stuart Lloyd 在脉冲编码调制（PCM）的量化问题中提出了迭代交替优化的思路：固定量化边界更新量化点，固定量化点更新边界。这一思想被推广为通用的聚类算法，即 K-means 的标准求解过程（Lloyd's Algorithm）。1967 年，MacQueen 在伯克利研讨会上正式引入 "K-means" 这一术语，并提出了一种在线（逐样本）更新质心的变体。

> 💡 关键：K-means 的本质是用**坐标下降 / 交替优化**的策略，将一个 NP-hard 的组合优化问题转化为两个交替求解的凸子问题，从而在多项式时间内获得局部最优解。

##### 核心机制：目标函数与两步迭代

**目标函数（WCSS）**

K-means 的优化目标是最小化簇内平方误差和（Within-Cluster Sum of Squares）：

$$J = \sum_{k=1}^{K} \sum_{x_i \in C_k} \|x_i - \mu_k\|^2$$

其中 \(C_k\) 表示第 \(k\) 个簇的样本集合，\(\mu_k = \frac{1}{|C_k|}\sum_{x_i \in C_k} x_i\) 是第 \(k\) 个簇的质心（均值向量）。

这个目标函数同时关于**分配方案** \(\{C_k\}\) 和**质心位置** \(\{\mu_k\}\) 进行优化，是一个混合离散-连续优化问题。K-means 通过将其拆分为两个子问题交替求解：

**Step 1 — Assignment（E-step 类比）**

固定质心 \(\{\mu_k\}\)，对每个样本 \(x_i\) 求解最优分配：

$$c_i = \arg\min_{k \in \{1, \ldots, K\}} \|x_i - \mu_k\|^2$$

即将每个样本分配到距离最近的质心所在簇。这一步的几何解释是：以各质心为中心构建 **Voronoi 划分**，每个样本归属于其所在 Voronoi 区域对应的簇。

**Step 2 — Update（M-step 类比）**

固定分配方案 \(\{C_k\}\)，对每个簇求解最优质心：

$$\mu_k = \frac{1}{|C_k|} \sum_{x_i \in C_k} x_i$$

对 \(\mu_k\) 求导令其为零即可得到：簇内样本的算术均值是使簇内平方误差最小的唯一最优解。这也是 "K-**means**" 名称的由来。

> 💡 关键：每一步都在另一个变量固定时求解当前变量的全局最优，因此目标函数 \(J\) 在每次迭代中**单调不增**。又因为有限样本的划分方案数有限，算法必在有限步内收敛。

##### 收敛性与局部最优

K-means 的收敛性可以严格证明：

1. **单调性**：Assignment 步不增加 \(J\)（每个样本选最近质心），Update 步不增加 \(J\)（均值最小化平方误差）
2. **有限性**：\(n\) 个样本分成 \(K\) 组的方案数有限（至多 \(K^n\) 种）
3. **结论**：算法必在有限步内终止于一个不动点

然而，K-means **不保证收敛到全局最优**。目标函数 \(J\) 是非凸的，存在大量局部极小值。最终结果高度依赖初始质心的选择。

**实践中的应对策略：**

- **多次随机重启**：运行多次取 \(J\) 最小的结果（scikit-learn 默认 `n_init=10`）
- **K-means++ 初始化**（Arthur & Vassilvitskii, 2007）：按照与已选质心距离的平方成正比的概率依次选取初始质心，保证 \(O(\log K)\) 的近似比
- **Mini-batch K-means**：每次迭代仅使用一个小批量样本更新质心，适用于大规模数据

##### 与 EM 算法的关系

K-means 可以视为**高斯混合模型（GMM）在特殊假设下的极限情形**：

| 特性 | K-means | GMM (EM) |
|------|---------|----------|
| 分配方式 | 硬分配（0/1） | 软分配（概率） |
| 簇形状 | 球状（各向同性） | 任意椭球 |
| 协方差假设 | \(\sigma^2 I\)，\(\sigma \to 0\) | 每簇独立协方差矩阵 |
| 目标函数 | WCSS | 对数似然 |
| 更新规则 | 算术均值 | 加权均值 |

当 GMM 中所有分量共享相同的球形协方差 \(\Sigma_k = \sigma^2 I\)，且令 \(\sigma \to 0\) 时，EM 算法的软分配退化为硬分配，恢复为 K-means。因此，K-means 本质上隐含了**各簇为等方差球形高斯分布**的假设。

> ⚠️ 注意：当数据中的簇呈现非球形（如条带状、环形）、大小差异显著或密度不均匀时，K-means 的表现会显著下降。此时应考虑 DBSCAN、谱聚类、GMM 等替代方法。

##### 超参数 K 的选择

K-means 需要预先指定簇数 \(K\)，常用的选择方法包括：

- **肘部法则（Elbow Method）**：绘制 \(J\) 随 \(K\) 的变化曲线，选取"肘部"拐点处的 \(K\)
- **轮廓系数（Silhouette Score）**：衡量样本与自身簇的紧密度 vs. 与最近邻簇的分离度，取使平均轮廓系数最大的 \(K\)
- **Gap Statistic**：比较实际数据的 \(J\) 与均匀分布参考数据的 \(J\) 之差
- **信息准则**：BIC / AIC（在 GMM 框架下）

##### 计算复杂度与可扩展性

| 操作 | 复杂度 |
|------|--------|
| 单次迭代 | \(O(nKd)\) |
| 总体（\(T\) 次迭代） | \(O(TnKd)\) |
| K-means++ 初始化 | \(O(nKd)\) |
| Mini-batch 单次迭代 | \(O(bKd)\)，\(b\) 为批量大小 |

K-means 的线性时间复杂度使其能够轻松处理百万级样本。结合 KD-tree 或 Ball-tree 加速最近质心搜索，可进一步提升效率。在分布式环境下，Assignment 步天然可并行，使 K-means 成为 MapReduce 等框架中最早被实现的机器学习算法之一。

##### 经典变体与扩展

- **K-medoids (PAM)**：使用实际样本点而非均值作为簇中心，对离群点更鲁棒
- **K-means++**：改进初始化策略，理论保证近似比 \(O(\log K)\)
- **Mini-batch K-means**：随机采样小批量更新，适用于大规模在线场景
- **Bisecting K-means**：层次化二分策略，自顶向下递归二分最大簇
- **Kernel K-means**：通过核函数映射到高维空间，处理非线性可分的簇结构
- **Fuzzy C-means**：引入模糊隶属度，允许样本以不同概率属于多个簇

#### 🧪 练习题
```yaml
question: "K-means 算法在每次迭代中目标函数 J 的变化特性是什么？"
options:
  - "J 严格单调递减，直到收敛到全局最优"
  - "J 单调不增，最终收敛到局部最优（不动点）"
  - "J 可能先增后减，最终收敛到全局最优"
  - "J 的变化不确定，取决于数据分布"
answer: 1
explain: "Assignment 和 Update 两步各自不增加 J，因此 J 单调不增；但由于目标函数非凸，算法只保证收敛到局部最优而非全局最优。"
```

### VAE

```yaml
id: vae
num: 4
name: VAE
full_name: Variational Autoencoder
year: '2014'
org: U Amsterdam
parent: —
paper_url: https://arxiv.org/abs/1312.6114
project_url: ''
category: core
motivation: 变分推断框架的生成模型
```

#### 📝 一句话总结
VAE 提出了一种基于变分推断的深度生成模型框架，通过**重参数化技巧（Reparameterization Trick）**使得含连续隐变量的有向概率模型可以用随机梯度下降端到端训练，同时联合优化生成模型参数 \(\boldsymbol{\theta}\) 和识别模型（编码器）参数 \(\boldsymbol{\phi}\)，奠定了现代深度生成模型的基础。

#### 🎯 核心要点
- **变分下界（ELBO）**：将不可解的边际似然 \(\log p_{\boldsymbol{\theta}}(\mathbf{x})\) 转化为可优化的证据下界（Evidence Lower Bound），作为训练目标
- **重参数化技巧**：将随机采样 \(\mathbf{z} \sim q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 改写为确定性变换 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)，\(\boldsymbol{\epsilon} \sim \mathcal{N}(0, I)\)，使梯度可以通过采样操作反向传播
- **编码器-解码器架构**：编码器 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 近似不可解的后验分布，解码器 \(p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\) 从隐变量生成数据
- **SGVB 估计器**：Stochastic Gradient Variational Bayes 估计器，通过蒙特卡洛采样对 ELBO 进行无偏估计
- **AEVB 算法**：Auto-Encoding Variational Bayes 算法，将摊销推断（amortized inference）与 SGVB 结合，避免逐样本迭代推断
- **KL 散度正则项可解析计算**：当先验和后验均为高斯分布时，KL 散度项有闭式解，无需蒙特卡洛估计
- **实验验证**：在 MNIST 和 Frey Face 数据集上验证了模型的生成能力和隐空间表征质量

#### 🔬 深入细节
##### 核心框架示意图

![VAE 概率图模型](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x1.png)
*图 1：VAE 的有向概率图模型。实线表示生成模型 \(p_{\boldsymbol{\theta}}(\mathbf{z})p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\)，虚线表示变分近似 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})\) 对不可解后验 \(p_{\boldsymbol{\theta}}(\mathbf{z}|\mathbf{x})\) 的逼近。变分参数 \(\boldsymbol{\phi}\) 与生成模型参数 \(\boldsymbol{\theta}\) 联合学习。*

![重参数化技巧示意](https://ar5iv.labs.arxiv.org/html/1312.6114/assets/x2.png)
*图 2：重参数化技巧的计算图对比。左图为普通采样（梯度无法回传），右图为重参数化后的计算图（梯度可通过确定性路径反向传播）。*

##### 算法伪代码

```python
# AEVB (Auto-Encoding Variational Bayes) 算法
# 输入: 数据集 X, 编码器网络 encoder_φ, 解码器网络 decoder_θ

initialize θ, φ randomly
while not converged:
    X_M = sample_minibatch(X, M)          # 采样 mini-batch
    for x in X_M:
        # 编码: 得到后验近似的参数
        μ, log_σ² = encoder_φ(x)
        
        # 重参数化采样
        ε ~ N(0, I)
        z = μ + σ ⊙ ε                     # σ = exp(0.5 * log_σ²)
        
        # 解码: 计算重构
        x_recon = decoder_θ(z)
    
    # 计算 ELBO 损失 (取负作为最小化目标)
    L = -E[log p_θ(x|z)]                  # 重构损失
        + D_KL(q_φ(z|x) || p(z))          # KL 正则项
    
    g = ∇_{θ,φ} L                         # 计算梯度
    θ, φ = update(θ, φ, g)                # SGD / Adam 更新
    
return θ, φ
```

##### 动机与背景

**核心问题**：在含连续隐变量的有向概率模型中，如何高效地进行后验推断和参数学习？

传统变分贝叶斯（VB）方法依赖**均场近似（mean-field approximation）**，要求变分下界中的期望有解析解，这在一般情况下是不可能的。而 MCMC 方法虽然理论上可行，但计算代价过高，无法扩展到大规模数据集。

VAE 的核心洞察是：通过引入一个**参数化的推断网络**（编码器）来摊销推断成本，并利用**重参数化技巧**使得整个系统可以用标准的随机梯度下降进行端到端优化。

##### 核心机制：ELBO 推导

对于数据点 \(\mathbf{x}\)，其边际对数似然可以分解为：

$$\log p_{\boldsymbol{\theta}}(\mathbf{x}) = D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p_{\boldsymbol{\theta}}(\mathbf{z}|\mathbf{x})) + \mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x})$$

其中第一项是变分后验与真实后验之间的 KL 散度（非负），第二项即为**证据下界（ELBO）**：

$$\mathcal{L}(\boldsymbol{\theta}, \boldsymbol{\phi}; \mathbf{x}) = \mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\log p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})] - D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p_{\boldsymbol{\theta}}(\mathbf{z}))$$

> 💡 **关键直觉**：ELBO 由两部分组成——第一项是**重构项**，鼓励解码器从隐变量准确还原输入；第二项是 **KL 正则项**，约束编码器输出的后验分布接近先验 \(p(\mathbf{z}) = \mathcal{N}(0, I)\)，防止隐空间退化并确保生成时可以从先验采样。

由于 KL 散度非负，ELBO 是边际似然的下界：\(\mathcal{L} \leq \log p_{\boldsymbol{\theta}}(\mathbf{x})\)。最大化 ELBO 等价于同时最大化似然并最小化变分后验与真实后验的差距。

##### 核心机制：重参数化技巧

ELBO 中的期望 \(\mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[\cdot]\) 需要对 \(\mathbf{z}\) 采样来估计，但直接从 \(q_{\boldsymbol{\phi}}\) 采样会导致梯度无法对 \(\boldsymbol{\phi}\) 反向传播（采样操作不可微）。

**重参数化技巧**的核心思想是将随机变量 \(\mathbf{z}\) 表示为一个关于辅助噪声变量 \(\boldsymbol{\epsilon}\) 的确定性函数：

$$\mathbf{z} = g_{\boldsymbol{\phi}}(\boldsymbol{\epsilon}, \mathbf{x}) = \boldsymbol{\mu}_{\boldsymbol{\phi}}(\mathbf{x}) + \boldsymbol{\sigma}_{\boldsymbol{\phi}}(\mathbf{x}) \odot \boldsymbol{\epsilon}, \quad \boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})$$

这样，期望从对 \(q_{\boldsymbol{\phi}}\) 的积分变为对 \(p(\boldsymbol{\epsilon})\) 的积分：

$$\mathbb{E}_{q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x})}[f(\mathbf{z})] = \mathbb{E}_{p(\boldsymbol{\epsilon})}[f(g_{\boldsymbol{\phi}}(\boldsymbol{\epsilon}, \mathbf{x}))]$$

> 💡 **关键直觉**：随机性被"外包"给了与参数无关的噪声 \(\boldsymbol{\epsilon}\)，而 \(\mathbf{z}\) 关于 \(\boldsymbol{\phi}\) 的依赖变成了确定性的、可微的，从而可以用标准反向传播计算梯度。

##### 高斯情形下的 KL 散度闭式解

当编码器输出高斯分布 \(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) = \mathcal{N}(\boldsymbol{\mu}, \text{diag}(\boldsymbol{\sigma}^2))\)，先验为标准正态 \(p(\mathbf{z}) = \mathcal{N}(0, \mathbf{I})\) 时，KL 散度有解析解：

$$D_{KL}(q_{\boldsymbol{\phi}}(\mathbf{z}|\mathbf{x}) \| p(\mathbf{z})) = -\frac{1}{2} \sum_{j=1}^{J} \left(1 + \log \sigma_j^2 - \mu_j^2 - \sigma_j^2\right)$$

其中 \(J\) 是隐变量维度。这避免了对 KL 项的蒙特卡洛估计，降低了方差。

##### 训练与推理流程

**训练阶段**：
1. 输入 \(\mathbf{x}\)，编码器输出 \(\boldsymbol{\mu}, \log \boldsymbol{\sigma}^2\)
2. 采样 \(\boldsymbol{\epsilon} \sim \mathcal{N}(0, \mathbf{I})\)，计算 \(\mathbf{z} = \boldsymbol{\mu} + \boldsymbol{\sigma} \odot \boldsymbol{\epsilon}\)
3. 解码器从 \(\mathbf{z}\) 重构 \(\hat{\mathbf{x}}\)
4. 计算损失 = 重构损失 + KL 散度，反向传播更新 \(\boldsymbol{\theta}, \boldsymbol{\phi}\)

**生成（推理）阶段**：
1. 从先验采样 \(\mathbf{z} \sim \mathcal{N}(0, \mathbf{I})\)
2. 通过解码器生成 \(\mathbf{x} = p_{\boldsymbol{\theta}}(\mathbf{x}|\mathbf{z})\)

##### 与传统方法的区别

| 方法 | 推断方式 | 可扩展性 | 端到端训练 |
|------|---------|---------|-----------|
| 均场变分推断 | 需要解析期望 | 受限于共轭性 | ❌ |
| MCMC | 迭代采样 | 计算代价高 | ❌ |
| Wake-Sleep | 两阶段交替 | 中等 | 部分 |
| **VAE (AEVB)** | **摊销推断 + 重参数化** | **可扩展到大数据** | **✅** |

> ⚠️ **注意**：VAE 的 ELBO 目标存在一个已知问题——**后验坍缩（posterior collapse）**，即编码器可能退化为先验，隐变量不携带有用信息。这在后续工作（如 β-VAE、δ-VAE）中被广泛研究。

#### 🧪 练习题
```yaml
question: "VAE 中重参数化技巧的核心作用是什么？"
options:
  - "将离散隐变量转化为连续隐变量"
  - "将采样操作的随机性与可学习参数解耦，使梯度可以反向传播"
  - "减少隐变量的维度以降低计算复杂度"
  - "使先验分布从高斯变为更灵活的分布族"
answer: 1
explain: "重参数化技巧将 z = μ + σ⊙ε，把随机性转移到与参数无关的噪声 ε 上，使得 z 关于编码器参数 φ 的梯度可以通过确定性路径反向传播。"
```

### Pseudo-labeling

```yaml
id: pseudo_label
num: 5
name: Pseudo-labeling
full_name: Pseudo-labeling
year: '2013'
org: NYU
parent: —
paper_url: '-'
project_url: ''
category: foundation
motivation: 高置信度预测作为伪标签
```

#### 📝 一句话总结
Pseudo-Label 提出将神经网络对无标签数据的**最高置信度预测类别**直接作为伪标签，与有标签数据联合训练，以一种极其简洁的方式实现半监督学习，并从理论上证明该方法等价于**熵正则化（Entropy Regularization）**，鼓励决策边界穿过数据低密度区域。

#### 🎯 核心要点
- **伪标签定义**：取模型对无标签样本预测概率最大的类别作为"硬"伪标签 \(\hat{y}_i = \arg\max_c f_c(x_i; \theta)\)
- **联合损失函数**：有标签数据的交叉熵损失 + 加权的无标签数据伪标签交叉熵损失，权重 \(\alpha(t)\) 随训练进程递增
- **熵最小化等价性**：使用伪标签训练等价于最小化无标签数据上的条件熵 \(H(Y|X)\)，与低密度分离假设（Low-Density Separation）一致
- **课程式权重调度**：无监督损失权重 \(\alpha(t)\) 从 0 逐渐增大，避免训练初期不可靠伪标签干扰模型
- **去噪自编码器预训练**：利用 Denoising Autoencoder 进行逐层无监督预训练，提供更好的初始化
- **Dropout 正则化**：微调阶段使用 Dropout 防止过拟合，与伪标签机制协同提升泛化能力
- **实验验证**：在 MNIST 数据集上，使用仅 100–3000 个有标签样本 + 60000 个无标签样本，显著超越纯监督基线

#### 🔬 深入细节
##### 核心框架示意图

由于本文发表于 ICML 2013 Workshop（非 arxiv 托管），无公开可访问的原始图片直链。以下用文本示意描述论文核心框架：

```
┌─────────────────────────────────────────────────────┐
│              Pseudo-Label 训练框架                     │
│                                                       │
│  有标签数据 (x_i, y_i)          无标签数据 x_j         │
│         │                            │                │
│         ▼                            ▼                │
│   ┌──────────────────────────────────────┐           │
│   │        共享神经网络 f(·; θ)           │           │
│   └──────────────────────────────────────┘           │
│         │                            │                │
│         ▼                            ▼                │
│   softmax 输出                  softmax 输出          │
│   p(y|x_i; θ)                  p(y|x_j; θ)          │
│         │                            │                │
│         ▼                            ▼                │
│   交叉熵损失 L_s              伪标签: ŷ_j = argmax p  │
│   (与真实标签 y_i)             交叉熵损失 L_u          │
│         │                     (与伪标签 ŷ_j)          │
│         │                            │                │
│         ▼                            ▼                │
│              L = L_s + α(t) · L_u                     │
│                      │                                │
│                      ▼                                │
│               反向传播更新 θ                            │
└─────────────────────────────────────────────────────┘
```
*图：Pseudo-Label 训练框架。有标签数据使用真实标签计算监督损失，无标签数据使用模型自身的最高置信度预测作为伪标签计算无监督损失，两者加权求和后联合优化网络参数。*

##### 算法伪代码

```python
# Pseudo-Label 半监督训练算法
# 输入: 有标签数据集 D_L = {(x_i, y_i)}, 无标签数据集 D_U = {x_j}
# 输入: 网络 f(·; θ), 最大无监督权重 α_f, 预热轮数 T1, T2

# 第一阶段: 去噪自编码器逐层预训练
for each layer l in network:
    pretrain_denoising_autoencoder(layer_l, D_L ∪ D_U)

# 第二阶段: 带 Pseudo-Label 的微调
initialize θ from pretrained weights
for epoch t in range(num_epochs):
    # 计算当前无监督损失权重 (课程式调度)
    if t < T1:
        α = 0
    elif t < T2:
        α = α_f * (t - T1) / (T2 - T1)
    else:
        α = α_f
    
    for (x_labeled, y_true), x_unlabeled in zip(D_L, D_U):
        # 前向传播
        p_l = softmax(f(x_labeled; θ))    # 有标签样本预测
        p_u = softmax(f(x_unlabeled; θ))  # 无标签样本预测
        
        # 生成伪标签 (硬标签, 取 argmax)
        ŷ = argmax(p_u)
        
        # 计算联合损失
        L_s = CrossEntropy(p_l, y_true)    # 监督损失
        L_u = CrossEntropy(p_u, ŷ)         # 伪标签损失
        L = L_s + α * L_u                  # 总损失
        
        # 反向传播 (使用 Dropout)
        backward(L)
        update(θ)

return θ
```

##### 动机与背景

**核心问题**：在深度神经网络训练中，如何利用大量无标签数据来提升模型性能，尤其是在有标签数据极度稀缺的场景下？

2013 年前后，深度学习在监督学习领域取得了突破性进展，但其成功严重依赖大规模标注数据。在实际应用中，标注数据的获取成本高昂，而无标签数据则相对廉价且丰富。传统的半监督学习方法（如 Transductive SVM、图方法）在浅层模型上已有成熟研究，但如何将半监督学习与深度神经网络有效结合仍是开放问题。

此前的工作主要通过**无监督预训练**（如 Stacked Denoising Autoencoders、DBN）来利用无标签数据学习好的特征表示，但预训练和微调是分离的两个阶段，无标签数据在微调阶段未被直接利用。

Dong-Hyun Lee 提出的 Pseudo-Label 方法的核心洞察是：**可以在训练过程中直接将网络对无标签数据的高置信度预测当作"真实标签"来使用**，从而在微调阶段也能持续利用无标签数据。这一思想极其简洁，几乎不增加任何实现复杂度，却能带来显著的性能提升。

##### 核心机制：伪标签与联合损失

Pseudo-Label 方法的核心是构造一个同时利用有标签和无标签数据的联合损失函数。

对于有标签数据集 \(\mathcal{D}_L = \{(x_i, y_i)\}_{i=1}^{n}\) 和无标签数据集 \(\mathcal{D}_U = \{x_j\}_{j=1}^{n'}\)，总损失定义为：

$$L = \frac{1}{n} \sum_{i=1}^{n} \sum_{c=1}^{C} y_i^c \log f_c(x_i; \theta) + \alpha(t) \cdot \frac{1}{n'} \sum_{j=1}^{n'} \sum_{c=1}^{C} \hat{y}_j^c \log f_c(x_j; \theta)$$

其中：
- \(C\) 是类别数，\(f_c(x; \theta)\) 是 softmax 输出的第 \(c\) 类概率
- \(y_i^c\) 是有标签样本的 one-hot 真实标签
- \(\hat{y}_j^c\) 是无标签样本的**伪标签**，定义为 one-hot 向量：

$$\hat{y}_j^c = \begin{cases} 1 & \text{if } c = \arg\max_{c'} f_{c'}(x_j; \theta) \\ 0 & \text{otherwise} \end{cases}$$

- \(\alpha(t)\) 是随训练轮次 \(t\) 变化的无监督损失权重

> 💡 **关键直觉**：伪标签本质上是一种"自训练（Self-Training）"策略——模型用自己的预测来教自己。当模型对某个无标签样本的预测置信度很高时，这个预测很可能是正确的，因此可以当作额外的训练信号。即使部分伪标签是错误的，只要正确的伪标签占多数，网络仍然能从中受益。

##### 核心机制：熵正则化等价性

论文的一个重要理论贡献是证明了 Pseudo-Label 方法等价于**熵正则化（Entropy Regularization）**。

无标签数据上的伪标签交叉熵损失可以改写为：

$$L_u = -\frac{1}{n'} \sum_{j=1}^{n'} \sum_{c=1}^{C} \hat{y}_j^c \log f_c(x_j; \theta)$$

由于 \(\hat{y}_j\) 是 one-hot 向量（取 argmax），这等价于：

$$L_u = -\frac{1}{n'} \sum_{j=1}^{n'} \log \max_c f_c(x_j; \theta) = -\frac{1}{n'} \sum_{j=1}^{n'} \max_c \log f_c(x_j; \theta)$$

最小化此项会鼓励模型对无标签数据产生**低熵（高置信度）**的预测分布。这与显式最小化条件熵的效果一致：

$$H(Y|X) = -\mathbb{E}_{x} \left[ \sum_{c=1}^{C} p(y=c|x) \log p(y=c|x) \right]$$

> 💡 **关键直觉**：熵最小化背后的假设是**低密度分离假设（Low-Density Separation Assumption）**——类别的决策边界应该穿过数据分布的低密度区域。最小化无标签数据上的预测熵，等价于迫使模型对每个无标签样本给出更确定的分类，从而将决策边界推离数据密集区域。这是半监督学习中**聚类假设（Cluster Assumption）**的直接体现。

##### 核心机制：课程式权重调度

伪标签的质量高度依赖于当前模型的预测能力。在训练初期，模型尚未充分学习，其预测不可靠，此时大量使用伪标签会引入噪声甚至导致训练崩溃。因此，论文提出了一种**课程式（Curriculum-like）权重调度策略**：

$$\alpha(t) = \begin{cases} 0 & \text{if } t < T_1 \\ \frac{\alpha_f \cdot (t - T_1)}{T_2 - T_1} & \text{if } T_1 \leq t < T_2 \\ \alpha_f & \text{if } t \geq T_2 \end{cases}$$

其中 \(T_1\) 是预热期（仅使用有标签数据训练），\(T_2\) 是权重达到最大值 \(\alpha_f\) 的时刻。

> ⚠️ **注意**：\(\alpha(t)\) 的选择对最终性能影响很大。如果 \(\alpha_f\) 过大，错误伪标签的噪声会主导训练；如果过小，无标签数据的利用不充分。论文中通过实验调优，在 MNIST 上使用 \(\alpha_f = 3\)，\(T_1 = 100\)，\(T_2 = 600\)。

##### 训练流程

论文采用两阶段训练流程：

**第一阶段——去噪自编码器预训练**：
1. 使用全部数据（有标签 + 无标签，忽略标签）逐层训练 Denoising Autoencoder
2. 每层学习到的权重作为对应网络层的初始化
3. 这一步利用无标签数据学习通用的特征表示

**第二阶段——Pseudo-Label 微调**：
1. 用预训练权重初始化网络
2. 在每个 mini-batch 中，同时采样有标签和无标签数据
3. 前向传播计算所有样本的 softmax 输出
4. 对无标签样本取 argmax 生成伪标签
5. 计算联合损失 \(L = L_s + \alpha(t) \cdot L_u\)
6. 使用带 Dropout 的 SGD 进行反向传播和参数更新

##### 与传统方法的区别

| 方法 | 核心思想 | 无标签数据利用方式 | 实现复杂度 | 与深度学习兼容性 |
|------|---------|------------------|-----------|----------------|
| Transductive SVM | 最大间隔 + 低密度分离 | 优化决策边界位置 | 高（需解凸优化） | ❌ 不适用 |
| 图半监督方法 | 标签传播 | 构建相似度图传播标签 | 中（需构图） | ❌ 不易扩展 |
| 去噪自编码器预训练 | 无监督特征学习 | 仅用于预训练阶段 | 低 | ✅ 但微调时未用 |
| **Pseudo-Label** | **自训练 + 熵正则化** | **微调阶段持续利用** | **极低** | **✅ 原生兼容** |

> 💡 **关键优势**：Pseudo-Label 的最大优势在于其**极简性**——不需要修改网络架构，不需要额外的模型组件，只需在标准训练循环中加入几行代码即可实现。这使得它可以与任何深度学习架构和训练技巧（如 Dropout、Batch Normalization 等）无缝结合。这一思想后来深刻影响了 FixMatch、MixMatch、UDA 等现代半监督学习方法。

#### 🧪 练习题
```yaml
question: "Pseudo-Label 方法在理论上等价于以下哪种正则化技术？"
options:
  - "L2 权重衰减正则化"
  - "条件熵最小化（Entropy Regularization）"
  - "Dropout 随机失活正则化"
  - "数据增强正则化"
answer: 1
explain: "论文证明，使用 argmax 伪标签对无标签数据计算交叉熵损失，等价于最小化模型在无标签数据上的条件熵 H(Y|X)，鼓励决策边界穿过低密度区域，符合半监督学习的低密度分离假设。"
```

### FixMatch

```yaml
id: fixmatch
num: 6
name: FixMatch
full_name: FixMatch
year: '2020'
org: Google
parent: pseudo_label
paper_url: https://proceedings.neurips.cc/paper/2020/hash/06964dce9addb1c5cb5d6e3d9838f733-Abstract.html
project_url: ''
category: core
motivation: 弱增强伪标签+强增强一致性
```

#### 📝 一句话总结
FixMatch 将伪标签（Pseudo-Labeling）与一致性正则化（Consistency Regularization）两大半监督学习技术极简地统一：对弱增强的无标签图像生成高置信度伪标签，再要求模型对同一图像的强增强版本预测出相同标签，以极简的设计在多个基准上取得了当时的最优性能。

#### 🎯 核心要点
- **两大经典技术的极简融合**：将伪标签（硬标签 + 置信度阈值过滤）与一致性正则化（弱增强 vs 强增强）合二为一
- **弱-强增强分离**：弱增强（随机翻转 + 平移）用于生成可靠的伪标签，强增强（RandAugment / CTAugment + Cutout）用于一致性训练
- **置信度阈值过滤**：仅当模型对弱增强图像的最大类别概率 \(\geq \tau\)（默认 0.95）时才保留伪标签，自然形成课程学习效果
- **无需损失权重退火**：不同于 UDA / ReMixMatch 需要逐步增大无标签损失权重，阈值机制本身在训练早期自动过滤大部分样本
- **统一超参数**：在 CIFAR-10/100、SVHN、STL-10 上使用完全相同的超参数集（\(\lambda_u=1, \eta=0.03, \tau=0.95, \mu=7, B=64\)）
- **极端低标签性能**：CIFAR-10 仅用 40 个标签（每类 4 个）即达到 88.61% 准确率；仅用 10 个标签（每类 1 个）可达约 78% 准确率
- **网络与优化**：使用 WideResNet + SGD（带动量）+ 余弦学习率衰减 + 权重衰减 + EMA 参数

#### 🔬 深入细节
![FixMatch 核心流程图](https://raw.githubusercontent.com/google-research/fixmatch/master/media/FixMatch%20diagram.png)
*图：FixMatch 流程示意。对无标签图像进行弱增强后送入模型获取预测（红框），当最大类别概率超过阈值（虚线）时将预测转为 one-hot 伪标签；同时对同一图像进行强增强后送入模型获取预测，通过交叉熵损失使强增强预测匹配伪标签。*

##### 算法伪代码

```python
# FixMatch 核心算法伪代码
# 输入: 标签数据 X = {(x_b, p_b)}, 无标签数据 U = {u_b}
# 超参数: τ (置信度阈值), λ_u (无标签损失权重), µ (无标签/标签批次比)

for each training step:
    # ===== 有监督损失 =====
    for x_b, p_b in labeled_batch(B):
        x_weak = weak_augment(x_b)           # 随机翻转 + 平移
        ℓ_s = CrossEntropy(p_b, model(x_weak))
    
    # ===== 无监督损失 =====
    for u_b in unlabeled_batch(µ * B):
        # 步骤 1: 用弱增强生成伪标签
        q_b = model(weak_augment(u_b))        # 模型对弱增强的预测
        q_hat = one_hot(argmax(q_b))          # 转为硬伪标签
        
        # 步骤 2: 置信度过滤
        mask_b = 1 if max(q_b) >= τ else 0    # 仅保留高置信度
        
        # 步骤 3: 用强增强计算一致性损失
        p_strong = model(strong_augment(u_b))  # 模型对强增强的预测
        ℓ_u += mask_b * CrossEntropy(q_hat, p_strong)
    
    # ===== 总损失 =====
    loss = ℓ_s + λ_u * ℓ_u
    optimizer.step(loss)
```

##### 动机与背景

半监督学习（SSL）旨在利用大量无标签数据提升模型性能，缓解标注数据稀缺的问题。在 FixMatch 之前，SSL 领域的两大主流技术路线分别是：

1. **伪标签（Pseudo-Labeling / Self-Training）**：用模型自身的预测作为无标签数据的"硬"标签进行训练，通常配合置信度阈值过滤低质量预测。其本质是一种熵最小化，鼓励模型在无标签数据上产生高置信度（低熵）预测。

2. **一致性正则化（Consistency Regularization）**：基于"模型对同一输入的不同扰动应产生相似预测"的假设，通过最小化不同扰动版本之间预测的差异来利用无标签数据。代表方法包括 Π-Model、Mean Teacher、UDA 等。

在 FixMatch 之前，最先进的方法如 MixMatch、UDA 和 ReMixMatch 虽然取得了优异性能，但引入了越来越多的复杂组件：温度锐化（sharpening）、分布对齐（Distribution Alignment）、MixUp 数据混合、自监督旋转损失、训练信号退火（Training Signal Annealing）等。这些组件增加了超参数数量和调参难度。

> 💡 关键：FixMatch 的核心洞察是——将伪标签和一致性正则化通过**弱-强增强分离**自然地统一起来：弱增强保证伪标签的质量（因为扰动小，预测更可靠），强增强提供足够的扰动使一致性约束具有实际意义（迫使模型学习对强变换不变的特征）。这一设计使得许多额外组件变得不必要。

##### 核心机制：弱-强增强 + 置信度伪标签

**损失函数设计**

FixMatch 的总损失由有监督损失 \(\ell_s\) 和无监督损失 \(\ell_u\) 两部分组成：

$$\mathcal{L} = \ell_s + \lambda_u \, \ell_u$$

**有监督损失**是标准的交叉熵损失，作用于弱增强的标签数据：

$$\ell_s = \frac{1}{B} \sum_{b=1}^{B} \mathrm{H}\!\left(p_b,\; p_m\!\left(y \mid \alpha(x_b)\right)\right)$$

其中 \(\alpha(\cdot)\) 为弱增强，\(p_b\) 为 one-hot 真实标签，\(B\) 为标签批次大小。

**无监督损失**是 FixMatch 的核心，结合了伪标签和一致性正则化：

$$\ell_u = \frac{1}{\mu B} \sum_{b=1}^{\mu B} \mathbb{1}\!\left(\max(q_b) \geq \tau\right) \cdot \mathrm{H}\!\left(\hat{q}_b,\; p_m\!\left(y \mid \mathcal{A}(u_b)\right)\right)$$

其中：
- \(q_b = p_m(y \mid \alpha(u_b))\) 是模型对**弱增强**无标签图像的预测分布
- \(\hat{q}_b = \text{argmax}(q_b)\) 是将预测转为 one-hot 的**硬伪标签**
- \(\mathcal{A}(\cdot)\) 为**强增强**
- \(\tau\) 为置信度阈值（默认 0.95）
- \(\mu\) 为无标签与标签批次大小的比值（默认 7）

> ⚠️ 注意：与标准伪标签方法（eq. 2）的关键区别在于——伪标签基于**弱增强**图像生成，而损失作用于**强增强**图像的预测。这引入了一致性正则化的效果，是 FixMatch 成功的关键。

**弱增强与强增强**

- **弱增强 \(\alpha(\cdot)\)**：仅包含随机水平翻转（50% 概率，SVHN 除外）和随机平移（上下左右最多 12.5%）。这种轻微扰动保证了模型预测的可靠性，从而生成高质量伪标签。

- **强增强 \(\mathcal{A}(\cdot)\)**：使用 RandAugment 或 CTAugment（均基于 AutoAugment 的变换库），随后叠加 Cutout。RandAugment 从预定义范围随机采样所有变换的强度；CTAugment 在线学习各变换的合适强度。这些强增强会产生严重失真的图像，迫使模型学习语义不变的特征。

**置信度阈值的课程学习效应**

训练初期，模型预测不确定，大部分无标签样本的 \(\max(q_b) < \tau\)，因此无监督损失的有效样本很少。随着训练推进，模型逐渐变得自信，越来越多样本通过阈值过滤。这自然形成了一种**课程学习（Curriculum Learning）**效果——从简单（高置信度）样本逐步过渡到困难样本——无需像 UDA 或 MixMatch 那样显式设计损失权重的退火策略。

##### 训练与优化细节

FixMatch 在所有数据集（除 ImageNet 外）上使用**完全相同的超参数**：

| 超参数 | 符号 | 值 |
|--------|------|----|
| 无标签损失权重 | \(\lambda_u\) | 1 |
| 学习率 | \(\eta\) | 0.03 |
| SGD 动量 | \(\beta\) | 0.9 |
| 置信度阈值 | \(\tau\) | 0.95 |
| 无标签批次倍数 | \(\mu\) | 7 |
| 标签批次大小 | \(B\) | 64 |
| 总训练步数 | \(K\) | \(2^{20}\) |

其他关键设计选择：
- **优化器**：SGD + 动量（优于 Adam）
- **学习率调度**：余弦衰减 \(\eta \cos\!\left(\frac{7\pi k}{16K}\right)\)
- **正则化**：权重衰减（weight decay）
- **参数平均**：使用模型参数的指数移动平均（EMA）报告最终性能
- **网络架构**：WideResNet-28-2（CIFAR-10/SVHN，1.5M 参数）、WRN-28-8（CIFAR-100）、WRN-37-2（STL-10）、ResNet-50（ImageNet）

##### 与先前方法的对比

| 方法 | 伪标签增强 | 预测增强 | 标签后处理 | 额外组件 |
|------|-----------|---------|-----------|---------|
| Π-Model | 弱 | 弱 | 无 | — |
| Mean Teacher | 弱 | 弱 | 无 | EMA 教师 |
| UDA | 弱 | 强 | 锐化 | 训练信号退火 |
| MixMatch | 弱 | 弱 | 锐化 | MixUp、多次增强平均 |
| ReMixMatch | 弱 | 强 | 锐化 | 分布对齐、旋转损失、MixUp |
| **FixMatch** | **弱** | **强** | **伪标签** | **无** |

FixMatch 可以被视为 UDA 和 ReMixMatch 的大幅简化版本：移除了锐化（sharpening）、训练信号退火、分布对齐、自监督旋转损失等组件，仅保留弱-强增强一致性和置信度阈值伪标签这两个核心要素。尽管如此，FixMatch 在 CIFAR-10（250 标签：5.07% 错误率 vs ReMixMatch 5.44%）、SVHN（250 标签：2.48% vs 2.92%）等基准上均取得了更优或可比的性能。

> 💡 关键：FixMatch 的成功表明，在半监督学习中，**数据增强的质量**（弱-强分离策略）和**伪标签的过滤机制**（高置信度阈值）是最关键的因素，而许多复杂的附加组件并非必要。

#### 🧪 练习题
```yaml
question: "FixMatch 中伪标签是基于哪种增强方式的模型预测生成的？"
options:
  - "强增强（如 RandAugment + Cutout）"
  - "弱增强（如随机翻转 + 平移）"
  - "无增强的原始图像"
  - "弱增强和强增强预测的平均"
answer: 1
explain: "FixMatch 使用弱增强图像的模型预测生成伪标签（保证预测可靠性），然后将该伪标签作为强增强图像预测的训练目标，从而实现一致性正则化。"
```

### BERT

```yaml
id: bert
num: 7
name: BERT
full_name: Bidirectional Encoder Representations from Transformers
year: '2019'
org: Google
parent: —
paper_url: https://aclanthology.org/N19-1423/
project_url: ''
category: core
motivation: 掩码语言模型实现双向理解
```

#### 📝 一句话总结
BERT 提出了基于掩码语言模型（MLM）和下一句预测（NSP）的双向 Transformer 预训练方法，首次实现了在所有层同时利用左右上下文的深度双向语言表示，在 11 项 NLP 任务上刷新了当时的最优结果。

#### 🎯 核心要点
- **双向 Transformer 编码器架构**：BASE（L=12, H=768, A=12, 110M 参数）和 LARGE（L=24, H=1024, A=16, 340M 参数）两种规格
- **掩码语言模型（MLM）**：随机遮蔽 15% 的输入 token（80% 替换为 `[MASK]`、10% 替换为随机词、10% 保持不变），通过预测被遮蔽的词实现真正的双向预训练
- **下一句预测（NSP）**：二分类任务判断两个句子是否连续，增强模型对句间关系的理解
- **统一的输入表示**：Token Embedding + Segment Embedding + Position Embedding 三者相加，使用 WordPiece 分词（30K 词表）
- **预训练-微调范式**：预训练阶段在大规模无标注语料（BooksCorpus 800M + Wikipedia 2500M 词）上学习通用表示，微调阶段仅需添加一个输出层即可适配各类下游任务
- **广泛的任务适配能力**：通过不同的输入格式和输出层设计，统一处理分类、序列标注、阅读理解等多种任务类型
- **Feature-based 用法**：提取预训练模型的隐藏层特征（拼接最后 4 层效果最佳），可作为固定特征用于下游模型

#### 🔬 深入细节
![BERT 预训练与微调总览](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x1.png)
*图 1：BERT 的预训练与微调框架。预训练阶段通过 MLM 和 NSP 两个任务联合训练，微调阶段针对不同下游任务使用相同的预训练模型，仅调整输入输出格式。*

![BERT 输入表示](https://ar5iv.labs.arxiv.org/html/1810.04805/assets/x2.png)
*图 2：BERT 的输入表示。每个 token 的输入嵌入由 Token Embedding、Segment Embedding 和 Position Embedding 三者相加得到。*

```python
# BERT 预训练伪代码
# 阶段一：构造训练样本
for document in corpus:
    for (sent_A, sent_B) in sample_sentence_pairs(document):
        # 50% 概率 B 是 A 的真实下一句，50% 概率随机采样
        label_NSP = "IsNext" if is_real_next(sent_A, sent_B) else "NotNext"
        tokens = ["[CLS]"] + tokenize(sent_A) + ["[SEP]"] + tokenize(sent_B) + ["[SEP]"]
        
        # MLM：随机选择 15% 的 token 进行遮蔽
        masked_positions = random_select(tokens, ratio=0.15)
        for pos in masked_positions:
            r = random()
            if r < 0.8:
                tokens[pos] = "[MASK]"       # 80% 替换为 [MASK]
            elif r < 0.9:
                tokens[pos] = random_token()  # 10% 替换为随机词
            # else: 10% 保持不变
        
        yield tokens, masked_positions, original_tokens, label_NSP

# 阶段二：模型前向与损失计算
for batch in dataloader:
    # 输入嵌入 = Token Emb + Segment Emb + Position Emb
    H = TransformerEncoder(input_embeddings)  # [batch, seq_len, hidden]
    
    # MLM 损失：对被遮蔽位置预测原始 token
    mlm_logits = MLMHead(H[masked_positions])  # 线性层 + GELU + LayerNorm + 投影
    L_MLM = CrossEntropy(mlm_logits, original_tokens)
    
    # NSP 损失：使用 [CLS] 的表示进行二分类
    cls_repr = H[:, 0, :]  # [CLS] 对应的隐藏状态
    L_NSP = CrossEntropy(NSPHead(cls_repr), nsp_labels)
    
    # 总损失
    loss = L_MLM + L_NSP
    loss.backward()
    optimizer.step()
```

**动机与背景：为什么需要双向预训练？**

在 BERT 之前，语言模型预训练主要有两种范式：一是以 ELMo 为代表的特征提取方法，它分别训练前向和后向 LSTM 后拼接，但两个方向的模型是独立训练的，无法在每一层同时利用双向上下文；二是以 OpenAI GPT 为代表的微调方法，它使用单向（从左到右）Transformer 解码器，虽然可以端到端微调，但受限于自回归目标函数，每个 token 只能看到其左侧的上下文。BERT 的核心洞察在于：**许多 NLP 任务（如问答、自然语言推理）本质上需要对整个句子的双向理解**，而非单向的序列生成。然而，标准的双向语言模型在训练时会产生"信息泄露"问题——每个词可以间接"看到自己"。BERT 通过掩码语言模型（MLM）巧妙地解决了这一矛盾：随机遮蔽输入中的部分 token，让模型根据双向上下文预测被遮蔽的词，从而在不泄露信息的前提下实现真正的深度双向预训练。

**核心机制：MLM 的遮蔽策略与 NSP 任务设计**

MLM 的遮蔽策略经过精心设计以缓解预训练与微调之间的不匹配问题。如果所有被选中的 token 都替换为 `[MASK]`，那么微调时模型将永远不会看到 `[MASK]` 标记，导致分布偏移。因此 BERT 采用了 80/10/10 的混合策略：80% 替换为 `[MASK]`（提供主要的训练信号），10% 替换为随机词（迫使模型不能简单依赖输入是否为 `[MASK]` 来判断是否需要预测），10% 保持不变（使表示偏向实际观察到的词）。由于随机替换仅占所有 token 的 1.5%（15% × 10%），对模型的语言理解能力几乎没有损害。MLM 的损失函数为标准的交叉熵：

$$\mathcal{L}_{\text{MLM}} = -\sum_{i \in \mathcal{M}} \log P(x_i \mid \mathbf{x}_{\backslash \mathcal{M}})$$

其中 \(\mathcal{M}\) 为被遮蔽位置的集合，\(\mathbf{x}_{\backslash \mathcal{M}}\) 为遮蔽后的输入序列。NSP 任务则利用 `[CLS]` 位置的隐藏状态 \(\mathbf{C}\) 进行二分类，损失为 \(\mathcal{L}_{\text{NSP}} = -\log P(\text{IsNext} \mid \mathbf{C})\)。预训练的总损失为两者之和。消融实验表明，去除 NSP 任务后，QNLI 准确率下降 3.5 个百分点，MNLI 下降 0.5 个百分点，SQuAD F1 下降 0.6 个百分点，证实了 NSP 对句间关系建模的重要性。

**微调流程：统一架构适配多种任务**

BERT 的微调设计极为简洁。对于不同类型的下游任务，只需调整输入格式和输出层：（1）**句对分类**（如 MNLI、QQP）：输入为 `[CLS] 句子A [SEP] 句子B [SEP]`，取 `[CLS]` 的表示 \(\mathbf{C} \in \mathbb{R}^H\) 通过分类层 \(P = \text{softmax}(\mathbf{C} W^T)\) 预测标签，其中 \(W \in \mathbb{R}^{K \times H}\)；（2）**单句分类**（如 SST-2）：输入为 `[CLS] 句子 [SEP]`，同样使用 \(\mathbf{C}\) 分类；（3）**阅读理解**（如 SQuAD）：输入为 `[CLS] 问题 [SEP] 段落 [SEP]`，引入起始向量 \(\mathbf{S}\) 和结束向量 \(\mathbf{E}\)，答案起始位置的概率为 \(P_i^{\text{start}} = \frac{e^{\mathbf{S} \cdot \mathbf{T}_i}}{\sum_j e^{\mathbf{S} \cdot \mathbf{T}_j}}\)，结束位置类似；（4）**序列标注**（如 NER）：对每个 token 的表示 \(\mathbf{T}_i\) 进行分类。微调时所有参数端到端更新，典型超参数为：batch size 16/32，学习率 2e-5/3e-5/5e-5，训练 2-4 个 epoch，dropout 0.1。

**预训练配置与计算资源**

预训练数据为 BooksCorpus（800M 词）和英文 Wikipedia（2,500M 词，仅文本），合计约 33 亿词。训练使用 batch size 256（128K tokens/batch），共 1M 步（约 40 个 epoch）。优化器为 Adam（lr=1e-4, \(\beta_1=0.9\), \(\beta_2=0.999\)），L2 权重衰减 0.01，前 10K 步线性 warmup 后线性衰减。为加速训练，90% 的步数使用序列长度 128，最后 10% 使用序列长度 512 以学习长距离位置编码。BERT\_BASE 在 4 个 Cloud TPU（16 芯片）上训练 4 天，BERT\_LARGE 在 16 个 Cloud TPU（64 芯片）上训练 4 天。

**与 GPT 和 ELMo 的关键对比**

| 维度 | BERT | OpenAI GPT | ELMo |
|------|------|-----------|------|
| 架构 | 双向 Transformer 编码器 | 单向 Transformer 解码器 | 双向 LSTM（独立训练） |
| 预训练目标 | MLM + NSP | 从左到右语言模型 | 从左到右 + 从右到左语言模型 |
| 双向性 | 每层联合双向 | 仅左向 | 拼接两个单向（浅层融合） |
| 下游适配 | 微调所有参数 | 微调所有参数 | 特征提取（冻结参数） |
| 特殊标记 | `[CLS]`/`[SEP]` 在预训练时引入 | `[CLS]`/`[SEP]` 仅在微调时引入 | 无 |
| 训练数据 | 3.3B 词 | 800M 词 | 1B 词 |

> 💡 **关键洞察**：消融实验显示，将 BERT 退化为从左到右模型（LTR & No NSP）后，MRPC 准确率从 86.7% 暴跌至 77.5%，SQuAD F1 从 88.5% 降至 77.8%，即使在其上添加 BiLSTM 也仅恢复到 84.9%，远不及预训练双向模型。这证明了**深度双向预训练**（而非浅层拼接）是 BERT 成功的核心因素。

> 💡 **模型规模效应**：BERT 首次证明了即使在极小的数据集（如 MRPC 仅 3,600 条样本）上，更大的预训练模型也能带来持续的性能提升，打破了此前"大模型需要大数据"的认知。从 3 层到 24 层，MNLI 准确率从 77.9% 稳步提升至 86.6%。

#### 🧪 练习题
```yaml
question: "BERT 在 MLM 预训练中对被选中的 15% token 采用的遮蔽策略是什么？"
options:
  - "100% 替换为 [MASK]"
  - "80% 替换为 [MASK]，10% 替换为随机词，10% 保持不变"
  - "50% 替换为 [MASK]，50% 保持不变"
  - "90% 替换为 [MASK]，10% 替换为随机词"
answer: 1
explain: "BERT 采用 80/10/10 的混合遮蔽策略：80% 替换为 [MASK] 提供训练信号，10% 替换为随机词防止模型仅依赖 [MASK] 标记，10% 保持不变使表示偏向真实词。这种设计缓解了预训练与微调之间 [MASK] 标记不存在的分布偏移问题。"
```

```yaml
question: "以下关于 BERT 与 OpenAI GPT 的对比，哪项描述是正确的？"
options:
  - "GPT 使用双向 Transformer，BERT 使用单向 Transformer"
  - "BERT 和 GPT 都在预训练阶段引入 [CLS] 和 [SEP] 标记"
  - "BERT 使用掩码语言模型实现双向预训练，GPT 使用从左到右的语言模型"
  - "GPT 的预训练数据量大于 BERT"
answer: 2
explain: "BERT 通过 MLM 在每一层联合利用左右上下文实现深度双向预训练，而 GPT 使用标准的从左到右自回归语言模型，每个 token 只能看到左侧上下文。此外，GPT 仅使用 800M 词的 BooksCorpus，而 BERT 使用 3.3B 词（BooksCorpus + Wikipedia）。"
```

### SimCLR

```yaml
id: simclr
num: 8
name: SimCLR
full_name: Simple Contrastive Learning of Representations
year: '2020'
org: Google
parent: —
paper_url: https://arxiv.org/abs/2002.05709
project_url: ''
category: core
motivation: 对比学习框架强调大批量训练
```

#### 📝 一句话总结
SimCLR 用“同一图像的两种随机增强视图互相接近、不同图像的视图彼此远离”这一极简对比学习目标，统一了数据增强、编码器、投影头和 NT-Xent 损失四个组件，在不使用 memory bank 或动量编码器的前提下，把视觉自监督学习推到接近监督预训练的水平。它的真正贡献不只是提出一个 loss，而是系统揭示了强增强、非线性投影头、大 batch 和长训练在对比学习中的决定性作用。

#### 🎯 核心要点
- 双视图对比框架：对同一张图像独立采样两次增强，形成正样本对，其余样本都作为负样本
- 三类关键增强：随机裁剪并缩放、随机颜色扰动、随机高斯模糊；其中裁剪 + 颜色扰动的组合最关键
- 编码器 + 投影头：用 ResNet 提取表示 \(h\)，再用一层隐藏层的 MLP 投影到 \(z\) 空间计算对比损失
- NT-Xent 损失：在归一化嵌入上做温度缩放 softmax，使正对相似度高、负对相似度低
- 大 batch 训练：不使用 memory bank，而是直接依赖大 batch 在批内提供大量负样本
- 训练后丢弃投影头：下游任务使用编码器输出的 \(h\)，而不是训练损失所在的 \(z\)
- 系统性消融：论文明确证明投影头、温度参数、增强策略、batch size 和训练轮数都会显著影响效果

#### 🔬 深入细节
##### 核心示意图

![SimCLR 框架图](https://1.bp.blogspot.com/-LpvCxgNepEI/Xo4axqZpoNI/AAAAAAAAFpE/NKjDKOQSnVEdq-gHUCDtl88LaUczNX_pACLcBGAsYHQ/s400/image2.png)
*图：Google Research 博客给出的 SimCLR 框架示意。每个样本经过两次随机增强，送入共享的编码器 \(f(\cdot)\) 和投影头 \(g(\cdot)\)，在投影空间最大化正样本对一致性。*

##### 算法伪代码

```python
# SimCLR
for minibatch in dataloader:                # {x_k}_{k=1}^N
    z_list = []
    h_list = []

    for x in minibatch:
        x_i = augment(x)                    # random crop + color distort + blur
        x_j = augment(x)

        h_i = encoder(x_i)                  # ResNet representation
        h_j = encoder(x_j)
        z_i = projector(h_i)                # MLP projection head
        z_j = projector(h_j)

        h_list.extend([h_i, h_j])
        z_list.extend([normalize(z_i), normalize(z_j)])

    loss = 0.0
    for i, j in positive_pairs(z_list):
        numerator = exp(sim(z_list[i], z_list[j]) / tau)
        denominator = sum(
            exp(sim(z_list[i], z_list[k]) / tau)
            for k in range(len(z_list)) if k != i
        )
        loss += -log(numerator / denominator)

    loss /= len(z_list)
    optimize(loss)

# downstream 只保留 encoder，丢弃 projector
```

##### 动机与背景

在 SimCLR 之前，视觉自监督学习已经有不少对比学习方法，但大多依赖 memory bank、专门的网络结构、复杂的采样策略，或者需要额外的动量编码器。SimCLR 的目标非常明确：把这类方法压缩成一个“任何人都能在标准图像分类 pipeline 里复用”的最小框架，同时搞清楚到底是什么因素真正让对比学习有效。

论文把问题拆成四个模块：数据增强、编码器、投影头、对比损失。其核心观点是，视觉自监督学习的 supervision 不来自标签，而来自“你如何构造两个应该相似的视图”。换句话说，增强策略本身就是任务定义。如果任务定义得太简单，模型就会学到捷径而不是语义表示。

##### 核心机制 1：两视图正样本与批内负样本

给定一张原图 \(x\)，SimCLR 从增强分布 \(\mathcal{T}\) 中独立采样两次变换，得到 \(\tilde{x}_i\) 和 \(\tilde{x}_j\)，把它们视为一个正样本对。一个 batch 中原本有 \(N\) 张图，因此会生成 \(2N\) 个增强样本。对任意一个 anchor \(i\)，除去与它匹配的正样本 \(j\) 外，其余 \(2N-2\) 个样本都被当作负样本。

编码器 \(f(\cdot)\) 输出表示 \(h\)，投影头 \(g(\cdot)\) 把 \(h\) 映射到对比空间中的 \(z\)。论文明确写出，投影头是一个含单个隐藏层的 MLP：

$$
z_i = g(h_i) = W^{(2)} \sigma\!\left(W^{(1)} h_i\right).
$$

这个设计看似简单，但它是 SimCLR 的关键发现之一：在 \(z\) 上做对比学习，比直接在 \(h\) 上做效果明显更好，而真正适合下游任务的表示反而往往是投影前的 \(h\)。

##### 核心机制 2：NT-Xent 对比损失

SimCLR 使用归一化温度缩放交叉熵损失（NT-Xent）。对正样本对 \((i,j)\)，单项损失为：

$$
\ell_{i,j} =
- \log
\frac{
\exp(\mathrm{sim}(z_i, z_j)/\tau)
}{
\sum_{k=1}^{2N}\mathbf{1}[k \neq i]\exp(\mathrm{sim}(z_i, z_k)/\tau)
},
$$

其中 \(\mathrm{sim}(u,v)=\frac{u^\top v}{\|u\|\|v\|}\) 是余弦相似度，\(\tau\) 是温度参数。最终损失会对 batch 中所有正样本对的两个方向同时求平均。

这个式子的本质，是把“识别与 anchor 匹配的那个视图”写成一个 \(2N-1\) 类 softmax 分类问题。温度 \(\tau\) 控制 softmax 的尖锐程度：温度太高，正负样本区分不明显；温度太低，训练会过于极端、数值不稳定。论文的系统实验表明，归一化嵌入加合适温度，对性能影响非常大。

##### 为什么增强组合这么重要

论文最有价值的结论之一，是“强增强不是锦上添花，而是任务本身”。如果只有随机裁剪而没有颜色扰动，不同 crop 之间的颜色直方图可能高度相似，模型就能靠颜色统计这一浅层线索完成匹配，而不必真正理解语义内容。随机颜色扰动和高斯模糊，恰好是用来破坏这些捷径的。

因此 SimCLR 的强大不在于发明了一个复杂结构，而在于把自监督任务定义得足够难且足够合理：模型必须在外观、颜色、局部视野都变化的情况下，仍然识别“这两张图其实来自同一个对象/场景”。这迫使它学习可迁移的语义表示，而不是低层像素模式。

> 💡 关键：SimCLR 证明了视觉对比学习里最重要的不是“多一个模块”，而是“如何构造不让模型走捷径的正样本任务”。

##### 大 batch、长训练与无 memory bank 设计

SimCLR 不使用 memory bank，而是直接把 batch 做大。论文在方法部分明确指出，batch size 可以从 256 一直扩到 8192；当 \(N=8192\) 时，每个正样本对会天然拥有 \(16382\) 个批内负样本。这让实现更简洁，也使损失定义保持端到端一致。

这种设计的代价是训练资源需求高，因此论文配套使用了 LARS 优化器和更长训练周期。实验表明，对比学习从更大的模型、更大的 batch、更长的训练里得到的收益，往往比监督学习更明显。最终，SimCLR 在 ImageNet 线性评估上达到 76.5% top-1，首次把纯自监督视觉表示拉到接近监督 ResNet-50 的水平。

#### 🧪 练习题
```yaml
question: "为什么 SimCLR 要在编码器表示 h 之后再接一个投影头 g(h) 来计算对比损失？"
options:
  - "因为投影头负责生成图像增强后的新像素"
  - "因为在投影空间 z 上做对比学习更有效，同时能让下游使用的 h 保留更多有用信息"
  - "因为投影头可以把对比学习变成生成模型"
  - "因为没有投影头就无法构造正样本对"
answer: 1
explain: "论文的关键消融发现之一就是：在 z 上优化对比损失比直接在 h 上优化更好，而下游任务常常更适合使用投影前的表示 h。"
```

### MAE

```yaml
id: mae
num: 9
name: MAE
full_name: Masked Autoencoder
year: '2022'
org: Meta
parent: bert
paper_url: https://openaccess.thecvf.com/content/CVPR2022/html/He_Masked_Autoencoders_Are_Scalable_Vision_Learners_CVPR_2022_paper.html
project_url: ''
category: frontier
motivation: 通过重建像素学习视觉特征
```

#### 📝 一句话总结
MAE 提出了一种非对称编码器-解码器架构的掩码自编码器，通过随机遮蔽 75% 的图像 patch 并重建缺失像素来学习视觉表征，将 BERT 式自监督预训练成功迁移到计算机视觉领域，在 ImageNet-1K 上以 vanilla ViT-Huge 达到 87.8% 的最优精度。

#### 🎯 核心要点
- **非对称编码器-解码器架构**：编码器仅处理可见 patch（约 25%），解码器轻量化（计算量不到编码器的 10%），大幅降低预训练计算开销
- **高遮蔽比率（75%）**：远高于 NLP 中 BERT 的 15%，消除图像冗余信息，迫使模型学习高层语义而非局部插值
- **像素级重建目标**：直接预测被遮蔽 patch 的像素值，使用 MSE 损失，仅在遮蔽区域计算损失，无需额外的 tokenizer（如 dVAE）
- **高效实现**：通过 shuffle/unshuffle 操作避免稀疏运算，编码器仅处理 25% token，训练速度比 BEiT 快 3.5 倍以上
- **强大的可扩展性**：模型从 ViT-Base 到 ViT-Huge 持续提升，ViT-H 在 ImageNet-1K 达到 87.8%，超越所有仅用 IN1K 数据的方法
- **优秀的迁移能力**：在目标检测（COCO）、语义分割（ADE20K）等下游任务上均取得显著提升

#### 🔬 深入细节
##### 核心架构示意图

![MAE 架构示意图](https://ar5iv.labs.arxiv.org/html/2111.06377/assets/x1.png)
*图：MAE 预训练架构。输入图像被随机遮蔽 75% 的 patch，编码器仅处理可见 patch，解码器接收编码后的可见 patch 与 mask token 的完整序列并重建原始图像像素。预训练完成后丢弃解码器，仅用编码器进行下游识别任务。*

##### 算法伪代码

```python
# MAE 预训练伪代码
def mae_pretrain(image, mask_ratio=0.75):
    # 1. Patch Embedding
    patches = patchify(image)                    # [N, patch_size^2 * 3]
    tokens = linear_proj(patches) + pos_embed    # [N, D]
    
    # 2. Random Masking (shuffle-based)
    shuffled_indices = random_permutation(N)
    num_visible = int(N * (1 - mask_ratio))      # e.g., 25% of 196 = 49
    visible_tokens = tokens[shuffled_indices[:num_visible]]   # [49, D]
    
    # 3. Encoder (only visible tokens)
    encoded = encoder(visible_tokens)            # [49, D] — 标准 ViT
    
    # 4. Decoder (full set)
    mask_tokens = repeat(learnable_mask_token, N - num_visible)
    full_tokens = concat(encoded, mask_tokens)   # [196, D_dec]
    full_tokens = unshuffle(full_tokens) + decoder_pos_embed
    decoded = decoder(full_tokens)               # [196, patch_size^2 * 3]
    
    # 5. Loss (only on masked patches)
    loss = MSE(decoded[masked_indices], patches[masked_indices])
    return loss
```

##### 动机与背景

BERT 在 NLP 领域通过掩码语言建模（Masked Language Modeling）取得了巨大成功，自然引发了一个问题：**能否将同样的自监督范式迁移到计算机视觉？** 然而，视觉与语言之间存在三个关键差异：

1. **架构差异**：CNN 难以自然地引入 mask token 和位置编码等"指示符"，直到 Vision Transformer（ViT）的出现才消除了这一障碍。
2. **信息密度差异**：语言是高度语义化、信息密集的，而图像具有大量空间冗余——相邻像素高度相关。因此，在视觉中需要远高于 NLP 的遮蔽比率（75% vs. 15%）才能构造有意义的预测任务。
3. **解码器角色差异**：在 NLP 中，解码器只需预测离散的词 token（语义丰富）；而在视觉中，解码器需要重建像素（语义层次较低），编码器与解码器的语义抽象层级存在显著差距。

> 💡 关键：正是这三个差异的深刻理解，驱动了 MAE 中非对称架构和高遮蔽比率两个核心设计决策。

##### 核心机制详解

**1. 随机遮蔽策略（Random Masking）**

MAE 将输入图像划分为不重叠的 patch（遵循 ViT 的 \(16 \times 16\) 划分），然后以均匀分布无放回地随机采样，遮蔽其中 75% 的 patch。

高遮蔽比率的设计意图是：
- **消除冗余**：图像中相邻 patch 高度相关，低遮蔽比率下模型可以通过简单插值完成重建，无法学到高层语义
- **避免中心偏差**：均匀随机采样确保遮蔽分布无空间偏置
- **提升效率**：仅 25% 的 token 进入编码器，大幅减少计算量

**2. 非对称编码器-解码器（Asymmetric Encoder-Decoder）**

这是 MAE 最核心的架构创新：

- **编码器**：标准 ViT，但**仅处理可见的 25% patch token**。遮蔽的 patch 被完全移除（而非用 mask token 替代），这意味着编码器的计算量仅为全量的 \(\sim\)25%。编码器可以是任意大容量模型（ViT-Base/Large/Huge）。

- **解码器**：轻量级 Transformer，接收编码后的可见 token 与共享的可学习 mask token 拼接而成的完整序列。解码器的宽度和深度远小于编码器（默认配置下计算量不到编码器的 10%）。解码器仅在预训练阶段使用，下游任务中被丢弃。

> ⚠️ 注意：编码器不使用 mask token 是 MAE 效率的关键。如果将 mask token 也送入编码器（如 BEiT），编码器需要处理全部 196 个 token，计算量增加约 3.7 倍。论文实验验证了这一设计使训练加速 3× 以上且不损失精度。

**3. 重建目标与损失函数**

MAE 的重建目标是被遮蔽 patch 的**原始像素值**。损失函数为均方误差（MSE）：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| \hat{x}_i - x_i \|^2$$

其中 \(\mathcal{M}\) 为被遮蔽 patch 的索引集合，\(\hat{x}_i\) 为解码器对第 \(i\) 个 patch 的像素预测，\(x_i\) 为原始像素值。

论文还研究了一种变体：对每个 patch 的像素值进行归一化（减均值除标准差）后作为重建目标，发现这种 **per-patch normalization** 能进一步提升表征质量。

> 💡 关键：与 BEiT 需要先训练一个 dVAE tokenizer 将图像转为离散 token 不同，MAE 直接重建像素，方案更简洁，且实验表明像素重建在 MAE 框架下反而优于 token 预测。

**4. 高效实现（Shuffle-based）**

MAE 的实现巧妙地避免了稀疏运算：

1. 对所有 patch token 进行随机 shuffle
2. 取前 25% 作为可见 token 送入编码器
3. 编码后，将 mask token 追加到编码输出后
4. 对完整序列执行 unshuffle（逆置换）恢复原始位置顺序
5. 加上位置编码后送入解码器

这一过程仅需标准的索引操作，无需任何稀疏矩阵运算，额外开销可忽略不计。

##### 与传统方法的区别

| 特性 | MAE | BEiT | iGPT |
|------|-----|------|------|
| 重建目标 | 像素值 | 离散视觉 token（dVAE） | 像素值（低分辨率） |
| 是否需要额外 tokenizer | ❌ | ✅（dVAE 预训练） | ❌ |
| 编码器输入 | 仅可见 patch（25%） | 全部 patch（含 mask token） | 全部像素 |
| 遮蔽比率 | 75% | 40% | — |
| 训练效率 | 高（3.5× faster than BEiT） | 较低 | 极低（像素级自回归） |
| ViT-H ImageNet-1K | **87.8%** | 86.3%* | — |

MAE 的核心优势在于**简洁性与可扩展性**：无需额外预训练步骤，架构设计使得大模型训练高效可行，且随模型规模增大持续获得收益。

#### 🧪 练习题
```yaml
question: "MAE 为什么采用 75% 的高遮蔽比率，而非 BERT 中常用的 15%？"
options:
  - "为了减少训练数据量，节省存储空间"
  - "因为图像具有高空间冗余，低遮蔽比率下模型可通过局部插值完成重建，无法学到高层语义"
  - "为了与 BEiT 的遮蔽比率保持一致"
  - "因为 ViT 的注意力机制要求输入序列尽可能短"
answer: 1
explain: "图像的空间冗余远高于文本，相邻 patch 高度相关。若遮蔽比率过低，模型仅需简单插值即可重建，无法被迫学习高层语义特征。75% 的高遮蔽比率消除了这种捷径，构造了有意义的自监督任务。"
```

### I-JEPA

```yaml
id: ijepa
num: 10
name: I-JEPA
full_name: Image Joint-Embedding Predictive Architecture
year: '2023'
org: Meta
parent: mae
paper_url: https://openaccess.thecvf.com/content/CVPR2023/html/Assran_Self-Supervised_Learning_From_Images_With_a_Joint-Embedding_Predictive_Architecture_CVPR_2023_paper.html
project_url: ''
category: frontier
motivation: 联合嵌入预测架构非生成式学习
```

#### 📝 一句话总结
I-JEPA 提出了一种联合嵌入预测架构，通过在**表示空间**（而非像素空间）预测被掩码图像块的语义表示，结合精心设计的 multi-block masking 策略，在不使用任何手工数据增强的前提下学习到高质量的语义图像表示，同时保留了局部细节特征。

#### 🎯 核心要点
- **JEPA 范式**：区别于联合嵌入架构（JEA，如对比学习）和生成式架构（如 MAE），提出第三条路线——在抽象表示空间进行预测，避免像素级重建的冗余和手工增强的先验偏置
- **三组件架构**：Context Encoder（ViT）编码可见上下文 → Predictor（窄 ViT）以位置 mask token 为条件预测目标表示 → Target Encoder（EMA 更新）提供预测目标
- **Multi-block masking 策略**：采样 4 个较小 target block（scale 0.15–0.2）+ 1 个较大 context block（scale 0.85–1.0），上下文与目标无重叠，迫使模型学习语义级预测
- **无需手工数据增强**：不依赖随机裁剪、颜色抖动等视图增强，避免引入任务特定偏置，具有更好的通用性和跨模态迁移潜力
- **高效可扩展**：ViT-H/14 在 16 块 A100 上仅需 72 小时即可完成预训练；比 MAE 收敛快约 5 倍，比 iBOT 计算开销显著更低

#### 🔬 深入细节
##### 动机与背景

自监督视觉表示学习主要有两大范式：

1. **不变性方法**（Invariance-based）：如 DINO、iBOT、SimCLR，通过手工数据增强构造同一图像的多个视图，训练编码器产生相似嵌入。这类方法能学到高语义表示，但引入了**强先验偏置**——例如颜色抖动使模型对颜色不变，这对需要颜色信息的下游任务（如深度估计）是有害的。
2. **生成式方法**（Generative）：如 MAE、BEiT，通过掩码并重建像素/token 来学习表示。这类方法先验知识需求少，但由于在**像素空间**重建，模型被迫建模大量低级细节（纹理、精确边缘），导致学到的表示语义层次较低，线性探测性能不佳。

> 💡 **关键洞察**：I-JEPA 的核心思想来自 Yann LeCun 提出的 JEPA 框架——预测应发生在**抽象表示空间**，而非输入空间。这样 target encoder 可以自主学习滤除不相关的像素级细节，使预测目标天然具有更高的语义抽象度。

##### 架构总览

![I-JEPA 方法示意图](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x5.png)
*图：I-JEPA 方法总览。Context encoder 编码可见 patch，Predictor 以位置 mask token 为条件预测 target block 的表示，Target encoder（EMA）提供预测目标。*

I-JEPA 包含三个核心组件：

| 组件 | 架构 | 作用 | 更新方式 |
|------|------|------|----------|
| **Context Encoder** \(f_\theta\) | ViT（完整宽度） | 编码可见的 context patch 序列 | 梯度反传 |
| **Predictor** \(g_\phi\) | 窄 ViT（宽度远小于 encoder） | 以 context 表示 + 位置 mask token 为输入，预测 target 位置的表示 | 梯度反传 |
| **Target Encoder** \(\bar{f}_\theta\) | 与 Context Encoder 同架构 | 编码 target patch 序列，提供预测目标 | **EMA**（指数移动平均） |

> ⚠️ **关键设计**：Predictor 使用的是**窄 ViT**（hidden dimension 远小于 encoder），这是为了防止 predictor 过于强大而导致 context encoder 不需要学习有意义的表示（即防止表示坍塌的一种隐式约束）。

##### 三大架构范式对比

![联合嵌入架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x2.png)
*图 (a)：联合嵌入架构（JEA）——直接比较两个视图的嵌入相似度*

![生成式架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x3.png)
*图 (b)：生成式架构——在像素/token 空间重建输入*

![JEPA 架构](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x4.png)
*图 (c)：JEPA 架构——在表示空间预测目标嵌入*

三者的核心区别在于：
- **JEA**：需要手工增强构造视图对，通过对比/聚类等方式防止坍塌，学到的表示对增强操作不变
- **生成式**：在输入空间重建，无需增强但被迫建模低级细节
- **JEPA**：在表示空间预测，target encoder 自动学习抽象掉不相关细节，无需增强也能学到语义表示

##### Multi-block Masking 策略

![Masking 策略](https://ar5iv.labs.arxiv.org/html/2301.08243/assets/x6.png)
*图：Multi-block masking 策略示意。左：采样多个 target block；右：context block 为 target 的补集。*

masking 策略是 I-JEPA 的另一核心设计，直接决定了表示的语义层次：

**采样过程**：
1. 采样 **4 个 target block**：scale ∈ (0.15, 0.2)，aspect ratio ∈ (0.75, 1.5)
2. 采样 **1 个 context block**：scale ∈ (0.85, 1.0)，aspect ratio = 1
3. 从 context block 中**移除**与任何 target block 重叠的 patch
4. Context encoder 仅处理剩余的 context patch

> 💡 **为什么 multi-block 有效？** 关键在于两点：(a) target block 的 scale 足够大（语义级），使预测任务需要高层理解；(b) context 是空间分散的（移除了 target 区域），迫使模型利用远距离语义信息进行预测，而非简单的局部外推。

**Ablation 验证**（ViT-B/16, 300 epochs, 1% ImageNet linear probe）：

| Masking 策略 | Target 数量 | Context 比例 | Top-1 |
|-------------|------------|-------------|-------|
| **multi-block**（本文） | 4 | 0.25 | **54.2** |
| rasterized（四象限） | 3 | 0.25 | 15.5 |
| block（单大块） | 1 | 0.40 | 20.2 |
| random（随机 patch） | 1 | 0.40 | 17.6 |

Multi-block 策略以巨大优势胜出，验证了"多个语义级 target + 空间分散 context"的设计合理性。

##### 损失函数

I-JEPA 使用简单的 **L2 损失**在表示空间计算预测误差：

$$\mathcal{L} = \frac{1}{|\mathcal{B}|} \sum_{x \in \mathcal{B}} \sum_{i=1}^{M} \left\| s_{\bar{\theta}}(x, B_i^y) - g_\phi\left(s_\theta(x, B^x),\, \text{pos}(B_i^y)\right) \right\|_2^2$$

其中：
- \(s_\theta(x, B^x)\)：context encoder 对可见 patch 集合 \(B^x\) 的输出
- \(s_{\bar{\theta}}(x, B_i^y)\)：target encoder 对第 \(i\) 个 target block \(B_i^y\) 的输出
- \(g_\phi(\cdot, \text{pos}(B_i^y))\)：predictor 以 context 表示和目标位置编码为输入的预测
- \(M=4\)：target block 数量

**Target encoder 的 EMA 更新**：

$$\bar{\theta} \leftarrow \alpha \cdot \bar{\theta} + (1 - \alpha) \cdot \theta$$

EMA 系数 \(\alpha\) 从 0.996 线性增加到 1.0，确保 target encoder 缓慢演化，提供稳定的预测目标。

> ⚠️ **表示空间 vs 像素空间的关键对比**：当将损失改为在像素空间计算时（即 target 为原始像素而非 encoder 输出），ViT-L/16 在 1% ImageNet 线性探测上从 **66.9%** 暴跌至 **40.7%**，充分证明了表示空间预测的核心价值。

##### 算法伪代码

```python
# I-JEPA 训练伪代码
for images in dataloader:
    # 1. Multi-block masking
    target_blocks = sample_target_blocks(N=4, scale=(0.15, 0.2), ar=(0.75, 1.5))
    context_block = sample_context_block(scale=(0.85, 1.0))
    context_patches = remove_overlap(context_block, target_blocks)
    
    # 2. Target encoder (no gradient)
    with torch.no_grad():
        target_reps = [target_encoder(images, block) for block in target_blocks]
    
    # 3. Context encoder + Predictor
    context_rep = context_encoder(images, context_patches)  # ViT forward
    pred_reps = [predictor(context_rep, pos_tokens(block)) for block in target_blocks]
    
    # 4. L2 loss in representation space
    loss = sum(F.mse_loss(pred, target) for pred, target in zip(pred_reps, target_reps))
    
    # 5. Update context encoder & predictor via gradient
    loss.backward()
    optimizer.step()
    
    # 6. EMA update target encoder
    ema_update(target_encoder, context_encoder, momentum=alpha)
    alpha = linear_schedule(alpha, start=0.996, end=1.0)
```

##### 效率与可扩展性

I-JEPA 的计算效率优势来自两个方面：

1. **收敛速度快**：虽然 target encoder 的前向传播引入约 7% 的额外开销（相比 MAE），但 I-JEPA 仅需约 **1/5 的训练 epoch** 即可达到相同性能，整体计算量大幅节省
2. **无需多视图处理**：不变性方法（如 iBOT）需要对每张图像生成多个增强视图并分别前向传播，而 I-JEPA 仅处理一张图像的不同 patch 子集

具体数据：
- ViT-H/14 + I-JEPA：**16 × A100, <72 小时**
- ViT-H/14 + I-JEPA 的总 GPU 时间 **< ViT-S/16 + iBOT**（即 I-JEPA 的巨型模型比 iBOT 的小模型还省算力）
- 相比 MAE，I-JEPA 在 1% ImageNet 半监督评估中达到相同性能所需 GPU 小时约为 **1/5**

##### 主要实验结果

**ImageNet 线性探测与半监督**（1% labels）：

| 方法 | 架构 | 增强 | Linear Top-1 | 1% Semi Top-1 |
|------|------|------|-------------|---------------|
| MAE | ViT-H/14 | ✗ | 77.3 | 66.2 |
| data2vec | ViT-L/16 | ✗ | 81.6 | — |
| **I-JEPA** | **ViT-H/14** | **✗** | **87.5** | **72.3** |
| DINO | ViT-B/8 | ✓ | 84.9 | — |
| iBOT | ViT-L/16 | ✓ | 88.3 | — |

**低级任务（线性探测）**：

| 方法 | Clevr/Count | Clevr/Dist |
|------|------------|------------|
| DINO | 86.6 | 53.4 |
| iBOT | 85.7 | 62.8 |
| **I-JEPA** | **86.7** | **72.4** |

I-JEPA 在深度预测任务上大幅超越不变性方法（72.4 vs 62.8），证明其在保留局部空间信息方面的优势——这正是不变性方法因过度增强而丢失的信息。

#### 🧪 练习题
```yaml
question: "I-JEPA 相比 MAE 的核心区别是什么？"
options:
  - "使用更大的 ViT 模型架构"
  - "在表示空间而非像素空间进行掩码预测"
  - "使用了更多的手工数据增强策略"
  - "采用了对比学习的损失函数"
answer: 1
explain: "I-JEPA 的核心创新在于将预测目标从像素空间转移到由 target encoder 产生的抽象表示空间，使模型无需重建低级细节即可学习语义特征。ablation 显示像素空间预测性能从 66.9% 暴跌至 40.7%。"
```

### DINOv3

```yaml
id: dinov3
num: 11
name: DINOv3
full_name: Self-Distillation with No Labels v3
year: '2025'
org: Meta AI Research
parent: ijepa
paper_url: https://arxiv.org/abs/2508.10104
project_url: ''
category: frontier
motivation: Gram锚定缓解长训练下稠密特征退化
```

#### 📝 一句话总结
DINOv3 将 DINO 风格自监督训练扩展到 7B 级视觉骨干，并提出 Gram anchoring 来专门修复“大模型 + 长训练”下稠密特征图逐步退化的问题，使一个冻结的自监督视觉编码器同时在全局识别和密集预测任务上达到新的通用基础模型水准。随后它再通过高分辨率适配和多学生蒸馏，把 7B teacher 的能力压缩到一整套可部署的 ViT 家族中。

#### 🎯 核心要点
- 7B 级自监督 teacher：基于 DINOv2 / iBOT 路线继续放大模型和数据规模，构建 ViT-7B 主干
- 数据与训练扩展：使用大规模无标签“background”数据，并混入少量专门数据；主训练阶段采用常数超参数训练 1M iterations
- Gram anchoring：对学生 patch 特征的 Gram 矩阵施加约束，直接抑制长训练过程中 dense feature map 的退化
- Gram teacher 机制：选取较早、稠密特征质量更好的 teacher 作为 Gram teacher，并每 10k iter 刷新一次
- 精炼阶段目标：在 DINO、iBOT、Koleo 项之外加入 \(L_{\text{Gram}}\)，专门修复局部特征质量
- 高分辨率后适配：增加 mixed-resolution 高分辨率阶段，使模型在 4K 级输入上仍保持稳定 dense features
- 多学生蒸馏：从 7B teacher 并行蒸馏出 ViT-S/B/L/S+/H+ 等多个学生模型，兼顾效果与部署成本

#### 🔬 深入细节
##### 核心示意图

![DINOv3 多学生蒸馏流程图](https://ar5iv.labs.arxiv.org/html/2508.10104/assets/x18.png)
*图：论文 Figure 12 展示的 multi-student distillation。DINOv3 先训练出 7B teacher，再共享 teacher inference，把知识并行蒸馏到多个不同规模的学生模型。*

##### 算法伪代码

```python
# DINOv3 training pipeline (condensed)

# Stage 1: large-scale self-distillation pretraining
teacher = EMA(student_init())
student = student_init()
for step in range(1_000_000):
    views = sample_global_and_local_crops(batch)
    loss_dino = dino_global_loss(student, teacher, views.global_crops)
    loss_ibot = ibot_patch_loss(student, teacher, views)
    loss_koleo = koleo_regularizer(student, views.global_crops)
    loss = w_d * loss_dino + loss_ibot + w_dkl * loss_koleo
    optimize(student, loss)
    update_ema(teacher, student)

# Stage 2: refinement with Gram anchoring
gram_teacher = snapshot_of_early_teacher()
for step in range(refinement_steps):
    X_s = l2_normalized_patch_features(student, global_crops_only=True)
    X_g = l2_normalized_patch_features(gram_teacher, global_crops_only=True)
    loss_gram = frobenius_norm(X_s @ X_s.T - X_g @ X_g.T) ** 2
    loss_ref = w_d * loss_dino + loss_ibot + w_dkl * loss_koleo + w_gram * loss_gram
    optimize(student, loss_ref)
    update_ema(teacher, student)
    if step % 10_000 == 0:
        gram_teacher = copy(teacher)

# Stage 3: high-resolution adaptation
train_with_mixed_resolutions(student, teacher, use_gram=True)

# Stage 4: distillation to practical backbones
for student_model in [vit_s, vit_b, vit_l, vit_s_plus, vit_h_plus]:
    distill_from_teacher(vit_7b_teacher, student_model)
```

##### 动机与背景

DINOv2 已经证明了自监督视觉模型可以作为强大的通用编码器，但论文指出，继续单纯扩大模型规模和训练时长时，会出现一个之前没有被真正解决的问题：**全局识别能力继续上涨，但局部 patch 特征会逐渐变脏，dense feature map 在长训练后退化**。这意味着模型在分类、检索等全局任务上更强了，却可能在分割、跟踪、匹配等依赖局部空间一致性的任务上变差。

DINOv3 的核心目标，就是不再把“全局语义”和“局部稠密特征”视为天然兼容，而是明确承认两者会冲突，并为 dense features 单独设计修复机制。论文把这一问题概括为：大规模 SSL 模型需要成为真正的 frozen universal visual encoder，就不能只看 ImageNet linear probe，而必须保证 patch-level consistency 也能在长训练中维持住。

##### 7B 基础模型：先把 DINO 路线扩到极限

在基础架构上，DINOv3 并没有抛弃 DINOv2，而是沿着这条路继续做大。论文先构建了一个 7B 参数的 ViT teacher，引入 axial RoPE 等现代位置编码设计，并改掉 DINOv2 中多段 cosine schedule 的做法，转而采用**常数超参数训练 1M iterations**。这一步的目的很明确：先证明在超大无标签数据上，自监督 teacher 本身可以继续扩展。

但作者紧接着就发现，单纯扩展虽然能继续提高 global representation，却会让 dense features 恶化。论文在多处可视化里展示了这个现象：patch token 之间的局部相似性随着训练推进变得越来越噪，说明模型在“看懂整张图”和“保留局部空间结构”之间发生了失衡。

##### Gram anchoring：不直接锁特征，而是锁特征之间的关系

DINOv3 最核心的创新是 Gram anchoring。作者不是直接要求学生 patch 特征去逼近某个旧 teacher 的特征向量，而是约束它们的 **Gram matrix**，也就是 patch 之间两两点积组成的相似性结构。记学生和 Gram teacher 的 L2 归一化局部特征分别为 \(X_S, X_G \in \mathbb{R}^{P \times d}\)，则：

$$
L_{\text{Gram}} =
\left\|
X_S X_S^\top - X_G X_G^\top
\right\|_F^2.
$$

这个设计的直觉非常强。若直接约束特征向量本身，学生会被强行锁死在旧表示上，不利于继续提升全局语义能力；而约束 Gram matrix 则只要求“局部 patch 之间的相对关系别崩”，允许具体特征坐标继续移动。换句话说，DINOv3 锁住的是 dense representation 的几何结构，而不是每个 token 的绝对数值。

论文进一步说明，Gram loss 只施加在 global crops 上，并且出于效率考虑，不是在一开始就用，而是**主训练完成 1M iterations 之后**才进入 refinement step。更关键的是，Gram teacher 不是固定死的，而是从早期 teacher 开始，在 refinement 阶段每隔 10k iterations 更新一次，使其逐步对齐当前 EMA teacher，但始终保留“局部特征更稳定”的参考作用。

##### 精炼阶段与高分辨率适配

Gram anchoring 并不是单独训练，而是被加进 refinement objective 中：

$$
L_{\text{Ref}} =
w_D L_{\text{DINO}} + L_{\text{iBOT}} + w_{DKL} D_{\text{Koleo}} + w_{\text{Gram}} L_{\text{Gram}}.
$$

这里最关键的是，它没有替换掉原本的 DINO / iBOT 自监督目标，而是在保持全局语义学习的同时，额外补上对 dense feature structure 的约束。论文观察到，加入 Gram objective 后，iBOT loss 会更快下降，说明 Gram anchoring 其实也在间接稳住 patch-level 学习过程。

在此基础上，DINOv3 还额外做了 high-resolution adaptation。作者指出，很多真实应用并不是在 \(224\) 或 \(518\) 分辨率下工作，而是需要 1K、2K 甚至 4K 输入。因此 DINOv3 在后处理阶段继续用 mixed-resolution global/local crops 训练，并继续使用 Gram anchoring，以保证模型在超高分辨率下仍能保持干净的局部特征图。这一点对分割、跟踪、匹配这类 dense tasks 很关键。

> 💡 关键：DINOv3 的本质不是“再做一个更大的 DINO”，而是明确把 dense feature degeneration 当成独立问题，并用 Gram matrix 约束专门修复它。

##### 多学生蒸馏：把 7B teacher 变成可用的模型家族

仅有 7B teacher 还不够实用，因此论文最后一步是蒸馏。它把 7B teacher 作为固定教师，蒸馏到多个 ViT 学生中，并设计了 **single-teacher / multi-student** 并行蒸馏流程：先在全局组共享 teacher inference，再把结果 all-gather 到各学生组分别训练。这样做的好处是 teacher 推理成本被多学生共享，新增学生主要只增加自己的训练成本，整体效率明显高于串行蒸馏。

最终，DINOv3 不只是一个大模型，而是一整套视觉基础模型家族。论文报告显示，冻结 backbone 即可在 COCO detection、ADE20K segmentation、DAVIS tracking 等任务上达到或超过当时专门设计的强基线，这也是它和“只会做图像分类的 SSL 模型”之间最本质的差别。

#### 🧪 练习题
```yaml
question: "DINOv3 中 Gram anchoring 的直接作用对象是什么？"
options:
  - "图像像素重建误差"
  - "学生与教师 patch 特征两两相似性构成的 Gram 矩阵"
  - "分类头的 softmax 概率"
  - "文本与图像的跨模态对齐分数"
answer: 1
explain: "DINOv3 不是直接对齐 patch 特征向量本身，而是约束学生和 Gram teacher 的 Gram matrix，从而稳住局部特征的关系结构并缓解 dense feature 退化。"
```

### DQN

```yaml
id: dqn
num: 12
name: DQN
full_name: Deep Q-Network
year: '2015'
org: DeepMind
parent: —
paper_url: https://www.nature.com/articles/nature14236
project_url: ''
category: core
motivation: 深度Q网络实现人类水平游戏
```

#### 📝 一句话总结
DQN 将卷积神经网络、经验回放和目标网络结合到 Q-learning 中，把 Atari 原始像素直接映射为各动作的 \(Q\) 值，首次在统一架构和固定超参数下实现了跨 49 个游戏的人类水平强化学习控制。2015 年 Nature 版本在 2013 年 workshop 论文基础上补全了目标网络、稳定化训练细节与大规模评测，奠定了深度强化学习的标准范式。

#### 🎯 核心要点
- 端到端像素控制：输入为 \(84 \times 84 \times 4\) 的连续帧堆叠，输出为每个合法动作的 \(Q\) 值
- 卷积 Q 网络：3 层卷积 + 1 层 512 维全连接 + 动作线性输出层，用表示学习替代手工特征
- 经验回放：把转移样本写入 replay memory，并从中均匀随机采样 mini-batch，打破时间相关性
- 目标网络：每隔 \(C\) 步复制一次在线网络参数，用冻结的 \(\hat{Q}\) 生成 bootstrap target，降低目标漂移
- 奖励裁剪：训练时把正奖励裁成 \(+1\)、负奖励裁成 \(-1\)，统一不同游戏的 reward scale
- 误差裁剪：把 TD 误差裁到 \([-1, 1]\) 之外时转成绝对值型梯度，提升优化稳定性
- 最小先验知识：同一网络结构、同一学习算法、同一超参数直接迁移到 49 个 Atari 游戏

#### 🔬 深入细节
##### 核心示意图

![DQN 卷积 Q 网络结构图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fnature14236/MediaObjects/41586_2015_BFnature14236_Fig1_HTML.jpg)
*图：Nature 2015 论文中的 DQN 网络结构。输入是预处理后的 \(84 \times 84 \times 4\) 图像堆叠，经过 3 层卷积和 2 层全连接后，一次前向传播直接输出所有动作的 \(Q\) 值。*

##### 算法伪代码

```python
# DQN with experience replay and target network
replay = ReplayBuffer(capacity=N)
Q = ConvQNetwork()
Q_target = copy(Q)

for episode in range(M):
    s = env.reset()
    phi = preprocess_and_stack(s)  # 84x84x4

    for t in range(T):
        if random() < epsilon:
            a = random_action()
        else:
            a = argmax_a(Q(phi)[a])

        s_next, r, done = env.step(a)
        phi_next = preprocess_and_stack(s_next)
        replay.add(phi, a, r, phi_next, done)

        batch = replay.sample(batch_size)
        targets = []
        for phi_j, a_j, r_j, phi_next_j, done_j in batch:
            if done_j:
                y_j = r_j
            else:
                y_j = r_j + gamma * max(Q_target(phi_next_j))
            targets.append(y_j)

        loss = mean((targets - Q(batch.phi, batch.a)) ** 2)
        optimize(loss)

        if step % C == 0:
            Q_target.load_state_dict(Q.state_dict())

        phi = phi_next
        if done:
            break
```

##### 动机与背景

传统 Q-learning 在低维状态空间中可以直接维护 \(Q(s, a)\) 表，但在 Atari 这类高维视觉任务中，状态是 \(210 \times 160\) 的原始 RGB 图像，既无法枚举，也无法依赖手工特征稳定泛化。DQN 的核心目标，就是让一个卷积网络同时承担“状态表示学习”和“动作价值估计”两件事，把强化学习第一次真正推进到大规模视觉控制场景。

但一旦把非线性神经网络塞进 Q-learning，训练立刻会变得不稳定。原因主要有三类：第一，连续时间步样本高度相关，违反了 SGD 假设的近似独立同分布；第二，网络一更新，策略就变，数据分布也跟着漂移；第三，bootstrap target 本身依赖当前网络，容易出现“自己追自己”的震荡。这三点正是 DQN 要解决的核心工程难题。

##### 核心机制 1：把 Q-learning 写成可微目标

论文将动作价值函数参数化为 \(Q(s, a; \theta)\)，并把单步 TD 更新改写为最小化平方 Bellman 误差：

$$
L_i(\theta_i) =
\mathbb{E}_{(s,a,r,s') \sim U(D)}
\left[
\left(y_i - Q(s, a; \theta_i)\right)^2
\right],
$$

其中 target 为

$$
y_i =
\begin{cases}
r, & s' \text{ 为终止状态} \\
r + \gamma \max_{a'} \hat{Q}(s', a'; \theta_i^-), & \text{否则}
\end{cases}
$$

这里最关键的变化有两个。第一，不再对每个状态动作单独更新，而是用卷积网络一次性输出所有动作的价值，从而能对视觉输入做泛化。第二，target 中使用冻结的目标网络 \(\hat{Q}\)，而不是直接用当前在线网络 \(Q\)。这让优化目标在若干步内近似固定，显著缓解了 bootstrap 造成的正反馈震荡。

##### 核心机制 2：经验回放与目标网络如何稳定训练

经验回放（experience replay）是 DQN 的第一根支柱。算法把每一步转移 \((s_t, a_t, r_t, s_{t+1})\) 存进 replay memory，并从中均匀随机抽样 mini-batch。这样做的作用不是“为了复用数据”这么简单，更重要的是把高度相邻、强相关的在线轨迹打散，从而让梯度估计更接近独立采样。论文明确指出，这既提升了样本效率，也降低了更新方差。

目标网络（target network）是第二根支柱。论文做法是每隔 \(C\) 步把在线网络参数复制给目标网络一次，在这 \(C\) 步里都用旧参数产生 target。直觉上，这相当于给 Bellman target 增加一个时间延迟，让“被优化的函数”和“定义优化目标的函数”不要在同一时间尺度上一起快速漂移。DQN 后续所有重要分支，包括 Double DQN、Rainbow、Dueling DQN，几乎都保留了这个机制。

##### 输入处理、网络结构与训练细节

输入端也有一套非常关键的预处理。论文先对当前帧和前一帧做逐像素最大值，以消除 Atari 精灵闪烁；再抽取亮度通道并缩放到 \(84 \times 84\)；最后堆叠最近 \(m=4\) 帧，构造近似马尔可夫状态。这样做的核心原因是单帧图像无法表达速度与运动方向，而 4 帧堆叠可以把短时动态信息显式编码进去。

网络本身采用标准而高效的卷积结构：第一层 32 个 \(8 \times 8\) 卷积核、stride 4；第二层 64 个 \(4 \times 4\) 卷积核、stride 2；第三层 64 个 \(3 \times 3\) 卷积核、stride 1；随后是 512 维全连接层和动作输出层。训练时还加入了两个常被忽略但很重要的稳定化技巧：一是 reward clipping，把所有正奖励压成 \(+1\)、负奖励压成 \(-1\)；二是 TD error clipping，把过大的平方误差梯度切换到绝对值型梯度区间，本质上类似后来的 Huber loss 思路。

> 💡 关键：DQN 的真正突破不只是“用 CNN 近似 \(Q\) 函数”，而是同时用 replay memory 和 target network 解决了深度网络进入 bootstrap RL 后最致命的分布漂移与目标漂移问题。

##### 与此前方法的区别

在 DQN 之前，强化学习与深度学习的结合通常停留在“先学特征，再做 RL”或者“小网络 + 小任务”的阶段。DQN 直接把原始像素作为输入，用统一网络结构学习多种 Atari 游戏策略，证明了深度表示学习可以和时序差分学习结合并规模化工作。它把强化学习从依赖手工状态设计的阶段，推进到依赖表示学习的阶段，这也是后来 AlphaGo、MuZero、Decision Transformer、RLHF 一系列路线的基础前提。

#### 🧪 练习题
```yaml
question: "DQN 中引入目标网络（target network）的主要作用是什么？"
options:
  - "增加动作空间大小，使网络能处理更多动作"
  - "让输入从单帧图像变为四帧堆叠"
  - "延迟 bootstrap target 的变化，减少训练震荡和发散"
  - "把离策略学习改成在策略学习"
answer: 2
explain: "目标网络在若干步内保持冻结，用旧参数生成 y_j，从而避免在线网络更新后 target 同步剧烈漂移，这是 DQN 稳定训练的关键机制之一。"
```

### PPO

```yaml
id: ppo
num: 13
name: PPO
full_name: Proximal Policy Optimization
year: '2017'
org: OpenAI
parent: dqn
paper_url: https://arxiv.org/abs/1707.06347
project_url: ''
category: core
motivation: 裁剪目标函数约束策略更新
```

#### 📝 一句话总结
PPO 用裁剪 surrogate objective 把“策略更新不要走太大步”直接写进目标函数里，使策略梯度方法能够在同一批 on-policy 数据上做多轮 mini-batch 优化，同时避免像 vanilla policy gradient 那样一更新就把策略推崩。它保留了 TRPO 的“近端更新”思想，但只需要一阶优化，因此很快成为强化学习和 RLHF 中最常用的策略优化算法。

#### 🎯 核心要点
- 裁剪目标函数：核心目标 \(L^{\text{CLIP}}\) 用 \(\min(\cdot,\cdot)\) 和 \(\mathrm{clip}(\cdot)\) 限制新旧策略概率比偏离 1 太远
- 概率比重参数化：通过 \(r_t(\theta)=\frac{\pi_\theta(a_t|s_t)}{\pi_{\theta_{\text{old}}}(a_t|s_t)}\) 直接衡量策略更新幅度
- 多 epoch 数据复用：同一批采样轨迹可以做多轮 mini-batch SGD / Adam 更新，显著提升样本效率
- Actor-Critic 风格：策略网络负责行动，价值函数用于估计优势函数，实践里通常配合 GAE 使用
- 两类 PPO 变体：论文同时讨论 KL-penalty 版和 clip 版，实验结论是 clip 版更稳、更简单
- 兼顾简单与稳定：避免 TRPO 的二阶近似、共轭梯度和复杂约束求解，同时仍能抑制破坏性大更新
- 广泛适配：在 MuJoCo 连续控制和 Atari 离散控制上都表现强势，后来也被 RLHF 直接复用

#### 🔬 深入细节
##### 核心示意图

![PPO 裁剪目标曲线（按论文 Figure 1 重绘）](data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%22900%22%20height%3D%22340%22%20viewBox%3D%220%200%20900%20340%22%3E%0A%3Cstyle%3E%0Atext%7Bfont-family%3AArial%2Csans-serif%3Bfill%3A%23222%7D%20.axis%7Bstroke%3A%23444%3Bstroke-width%3A2%7D%20.guide%7Bstroke%3A%23bbb%3Bstroke-dasharray%3A6%206%7D%20.line1%7Bstroke%3A%232b6cb0%3Bstroke-width%3A4%3Bfill%3Anone%7D%20.line2%7Bstroke%3A%23e67e22%3Bstroke-width%3A4%3Bfill%3Anone%7D%20.title%7Bfont-size%3A22px%3Bfont-weight%3A700%7D%20.label%7Bfont-size%3A16px%7D%20.small%7Bfont-size%3A14px%3Bfill%3A%23555%7D%0A%3C/style%3E%0A%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22white%22/%3E%0A%3Ctext%20x%3D%22450%22%20y%3D%2230%22%20text-anchor%3D%22middle%22%20class%3D%22title%22%3EPPO%20clipped%20surrogate%20objective%20%28adapted%20from%20Figure%201%29%3C/text%3E%0A%3Cg%20transform%3D%22translate%2860%2C60%29%22%3E%0A%20%20%3Ctext%20x%3D%22180%22%20y%3D%22-10%22%20text-anchor%3D%22middle%22%20class%3D%22label%22%3EAdvantage%20%26gt%3B%200%3C/text%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%22340%22%20y2%3D%22220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%220%22%20y2%3D%2220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%2280%22%20y1%3D%2220%22%20x2%3D%2280%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22160%22%20y1%3D%2220%22%20x2%3D%22160%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22240%22%20y1%3D%2220%22%20x2%3D%22240%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%20220%20L160%20120%20L340%2020%22%20class%3D%22line1%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%20220%20L160%20120%20L240%2070%20L340%2070%22%20class%3D%22line2%22/%3E%0A%20%20%3Ctext%20x%3D%220%22%20y%3D%22245%22%20class%3D%22small%22%3E0%3C/text%3E%3Ctext%20x%3D%22153%22%20y%3D%22245%22%20class%3D%22small%22%3E1%3C/text%3E%3Ctext%20x%3D%22225%22%20y%3D%22245%22%20class%3D%22small%22%3E1%2B%CE%B5%3C/text%3E%0A%20%20%3Ctext%20x%3D%22280%22%20y%3D%22100%22%20class%3D%22small%22%3Eclip%20upper%20bound%3C/text%3E%0A%20%20%3Ctext%20x%3D%22250%22%20y%3D%2235%22%20class%3D%22small%22%3Er%C2%B7%C3%82%3C/text%3E%0A%20%20%3Ctext%20x%3D%22300%22%20y%3D%2265%22%20class%3D%22small%22%3Emin%28r%C2%B7%C3%82%2C%20clip%28r%29%C2%B7%C3%82%29%3C/text%3E%0A%3C/g%3E%0A%3Cg%20transform%3D%22translate%28500%2C60%29%22%3E%0A%20%20%3Ctext%20x%3D%22180%22%20y%3D%22-10%22%20text-anchor%3D%22middle%22%20class%3D%22label%22%3EAdvantage%20%26lt%3B%200%3C/text%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%22340%22%20y2%3D%22220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%220%22%20y1%3D%22220%22%20x2%3D%220%22%20y2%3D%2220%22%20class%3D%22axis%22/%3E%0A%20%20%3Cline%20x1%3D%2280%22%20y1%3D%2220%22%20x2%3D%2280%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22160%22%20y1%3D%2220%22%20x2%3D%22160%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cline%20x1%3D%22240%22%20y1%3D%2220%22%20x2%3D%22240%22%20y2%3D%22220%22%20class%3D%22guide%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%2020%20L160%20120%20L340%20220%22%20class%3D%22line1%22/%3E%0A%20%20%3Cpath%20d%3D%22M0%2070%20L80%2070%20L160%20120%20L340%20220%22%20class%3D%22line2%22/%3E%0A%20%20%3Ctext%20x%3D%220%22%20y%3D%22245%22%20class%3D%22small%22%3E0%3C/text%3E%3Ctext%20x%3D%2265%22%20y%3D%22245%22%20class%3D%22small%22%3E1-%CE%B5%3C/text%3E%3Ctext%20x%3D%22153%22%20y%3D%22245%22%20class%3D%22small%22%3E1%3C/text%3E%0A%20%20%3Ctext%20x%3D%225%22%20y%3D%2295%22%20class%3D%22small%22%3Eclip%20lower%20bound%3C/text%3E%0A%20%20%3Ctext%20x%3D%2220%22%20y%3D%2235%22%20class%3D%22small%22%3Emin%28r%C2%B7%C3%82%2C%20clip%28r%29%C2%B7%C3%82%29%3C/text%3E%0A%20%20%3Ctext%20x%3D%22270%22%20y%3D%22200%22%20class%3D%22small%22%3Er%C2%B7%C3%82%3C/text%3E%0A%3C/g%3E%0A%3C/svg%3E)
*图：论文 Figure 1 的核心思想重绘。横轴是新旧策略概率比 \(r_t(\theta)\)，纵轴是单步 surrogate term；当优势为正时，超过 \(1+\epsilon\) 的继续放大不再被奖励，当优势为负时，低于 \(1-\epsilon\) 的继续减小也不再被奖励。*

##### 算法伪代码

```python
# PPO, actor-critic style
for iteration in range(num_iterations):
    trajectories = []
    for actor in range(N):
        traj = rollout(policy_old, env, T)
        traj.advantages = compute_gae(traj, value_fn, gamma, lam)
        traj.returns = traj.advantages + value_fn(traj.states)
        trajectories.append(traj)

    batch = merge(trajectories)

    for epoch in range(K):
        for minibatch in random_minibatches(batch, size=M):
            ratio = exp(
                log_prob(policy, minibatch.actions, minibatch.states)
                - log_prob(policy_old, minibatch.actions, minibatch.states)
            )
            unclipped = ratio * minibatch.advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * minibatch.advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mean((value_fn(minibatch.states) - minibatch.returns) ** 2)
            entropy_bonus = mean(entropy(policy, minibatch.states))

            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus
            optimize(loss)

    policy_old.load_state_dict(policy.state_dict())
```

##### 动机与背景

PPO 的直接背景是：vanilla policy gradient 虽然简单，但步长一大就容易把策略更新推得太远；TRPO 虽然能通过信赖域约束抑制大更新，但它需要二阶近似、共轭梯度和复杂的 KL 约束求解，工程实现与扩展性都不理想。PPO 想解决的是同一个问题: 如何保留“每次策略别变太猛”这一核心思想，同时把优化过程重新写回标准的一阶 mini-batch 训练形式。

论文最重要的操作，是把“更新不要太大”从外部约束改写成内部目标。它不再直接求解受约束优化，而是对旧策略 \(\pi_{\theta_{\text{old}}}\) 采样得到的数据，构造一个只依赖概率比的 surrogate objective。这样就能像监督学习一样，在固定 batch 上做多轮梯度更新，而不是每用一次样本就必须重新采样。

##### 核心机制：裁剪 surrogate objective

定义新旧策略对同一动作的概率比：

$$
r_t(\theta) =
\frac{\pi_\theta(a_t \mid s_t)}
{\pi_{\theta_{\text{old}}}(a_t \mid s_t)}.
$$

如果优势函数 \(\hat{A}_t > 0\)，说明动作 \(a_t\) 比 baseline 更好，那么增大它的概率是合理的；如果 \(\hat{A}_t < 0\)，说明这是个坏动作，那么应该减小其概率。问题在于，如果完全按照 \(r_t(\theta)\hat{A}_t\) 优化，概率比可能被推得过大或过小，导致策略一步跳出“可信区域”。

PPO 的 clip 版目标写成：

$$
L^{\text{CLIP}}(\theta)=
\hat{\mathbb{E}}_t
\left[
\min\left(
r_t(\theta)\hat{A}_t,\;
\mathrm{clip}(r_t(\theta), 1-\epsilon, 1+\epsilon)\hat{A}_t
\right)
\right].
$$

这个式子的直觉非常重要。对于好动作（\(\hat{A}_t > 0\)），一旦 \(r_t(\theta)\) 超过 \(1+\epsilon\)，目标就不再继续奖励更大的概率提升；对于坏动作（\(\hat{A}_t < 0\)），一旦 \(r_t(\theta)\) 低于 \(1-\epsilon\)，目标也不再鼓励继续把概率压得更低。也就是说，PPO 不是“硬性禁止”越界，而是让越界之后的进一步更新失去收益，从目标函数层面自然抑制策略爆冲。

> 💡 关键：PPO 的裁剪并不是把参数直接截断，而是把“继续远离旧策略”的收益截断。这样一来，优化器仍然是普通的一阶方法，但目标本身已经带有“近端更新”的偏好。

##### 为什么 PPO 能重复利用同一批 on-policy 数据

在普通策略梯度里，同一批样本如果反复优化，策略可能很快偏离采样时的分布，导致估计失真。PPO 用概率比 \(r_t(\theta)\) 显式建模“当前策略相对旧策略变了多少”，再用 clip 约束这种偏移，于是同一批轨迹可以安全地进行多轮 epoch 的 mini-batch SGD。论文的 Algorithm 1 正是：先 rollout 收集 \(N \times T\) 个时间步，再对 surrogate loss 做 \(K\) 轮优化。

实际实现中，PPO 通常采用 actor-critic 结构。策略网络负责输出动作分布，价值网络负责估计 \(V(s)\)，并通过 GAE 计算优势函数 \(\hat{A}_t\)。虽然论文的核心创新在 policy loss，但价值损失和熵正则也常和它一起联合优化，这就是后来工程实践里最常见的 PPO 形式。

##### 与 TRPO、KL-penalty 版 PPO 的区别

TRPO 的思想是通过 KL 约束让每步更新都在信赖域内，但它优化复杂，和参数共享、噪声结构、超大模型并不总是兼容。PPO 论文也讨论了 KL-penalty 版本，即在目标里显式加入 KL 惩罚项并自适应调整系数，但实验结论是 clip 版往往更直接、更稳、更好调。它本质上用一个“悲观下界”近似替代了严格的 trust region 约束。

从历史位置看，PPO 是强化学习工程化的分水岭。它没有重新定义策略梯度，只是在 objective 上做了一个极其高效的改写，却因此大幅改善了稳定性、复用率与可实现性。后来的 RLHF 之所以大规模采用 PPO，也是因为这个结构天然适合“先采样，再在固定 batch 上多轮优化”的训练范式。

#### 🧪 练习题
```yaml
question: "PPO 的 clipped objective 最核心的作用是什么？"
options:
  - "让算法可以直接使用离策略 replay buffer"
  - "把优势函数替换成状态价值函数"
  - "在目标函数层面抑制新策略相对旧策略的过大偏移"
  - "把随机策略变成确定性策略"
answer: 2
explain: "PPO 通过对概率比 r_t(θ) 的收益进行裁剪，阻止策略继续从“已经够大的更新”中获益，从而在一阶优化框架内实现近端更新。"
```

### DPO

```yaml
id: dpo
num: 14
name: DPO
full_name: Direct Preference Optimization
year: '2023'
org: Stanford
parent: ppo
paper_url: https://arxiv.org/abs/2305.18290
project_url: ''
category: frontier
motivation: 无需奖励模型的偏好对齐
```

#### 📝 一句话总结
DPO 的核心目标是：无需奖励模型的偏好对齐。

#### 🎯 核心要点
- 核心动机：无需奖励模型的偏好对齐
- 演化来源：继承或改进自 ppo
- 代表机构：Stanford

#### 🔬 深入细节
无需奖励模型的偏好对齐


### GRPO

```yaml
id: grpo
num: 15
name: GRPO
full_name: Group Relative Policy Optimization
year: '2026'
org: DeepSeek
parent: dpo
paper_url: https://arxiv.org/abs/2603.06623
project_url: ''
category: frontier
motivation: 组内相对奖励提升训练稳定性
```

#### 📝 一句话总结
GRPO 提出了一种无需价值模型（Critic-free）的策略优化方法，通过对同一问题采样一组输出并利用组内相对奖励归一化来估计优势函数，在大幅降低训练资源开销的同时实现了与 PPO 相当甚至更优的数学推理性能。

#### 🎯 核心要点
- **去除 Value Model**：不再需要与 Policy Model 同等规模的价值网络，显著降低显存和计算开销
- **组内采样与相对排名**：对每个问题采样 \(G\) 个输出，利用组内奖励的均值和标准差进行归一化，替代 GAE 优势估计
- **PPO-style 裁剪目标函数**：保留 PPO 的 clip 机制约束策略更新幅度，确保训练稳定性
- **序列级 KL 散度正则化**：将 KL 惩罚从 token 级移至序列级，直接加入损失函数而非嵌入奖励
- **支持 Outcome 与 Process 两种监督模式**：Outcome Supervision 在输出末尾给出单一奖励，Process Supervision 在每个推理步骤末尾给出奖励
- **迭代式 RL 训练**：采用在线迭代策略，每轮更新参考模型并持续训练奖励模型，防止奖励 hacking
- **在 DeepSeekMath 7B 上验证**：数学推理基准（GSM8K、MATH、CMATH 等）上超越同规模甚至更大模型

#### 🔬 深入细节
##### 核心示意图

![PPO 与 GRPO 对比示意图](https://ar5iv.labs.arxiv.org/html/2402.03300v2/assets/x4.png)
*图：PPO 需要额外的 Value Model 通过 GAE 估计优势函数；GRPO 去除 Value Model，直接从组内采样的多个输出的相对奖励中估计优势，大幅减少训练资源。*

##### 算法伪代码

```
Algorithm: GRPO (Group Relative Policy Optimization)
────────────────────────────────────────────────────
Input: 奖励模型 r_φ, 任务提示集 D, 超参数 ε, β, μ

1. 初始化策略模型 π_θ ← π_θ_init
2. for iteration = 1, ..., I do
3.     更新参考模型 π_ref ← π_θ
4.     for step = 1, ..., M do
5.         采样 batch D_b ⊂ D
6.         更新旧策略 π_θ_old ← π_θ
7.         对每个问题 q ∈ D_b，采样 G 个输出:
              {o_1, ..., o_G} ~ π_θ_old(·|q)
8.         计算每个输出的奖励: {r_1, ..., r_G} = r_φ(q, o_i)
9.         组内归一化: Â_i = (r_i - mean(r)) / std(r)
10.        for GRPO iteration = 1, ..., μ do
11.            最大化 GRPO 目标函数更新 π_θ
12.        更新奖励模型 r_φ (replay mechanism)
13. Output: π_θ
```

##### 动机与背景

**PPO 在 LLM 场景下的痛点：** 标准 PPO 算法在 RLHF 中需要维护四个模型——Policy Model、Value Model、Reward Model 和 Reference Model。其中 Value Model 通常与 Policy Model 同等规模，这带来了巨大的显存和计算负担。更关键的是，在 LLM 场景下，奖励模型通常只在最后一个 token 处给出奖励分数，这使得训练一个在每个 token 位置都准确的 Value Model 变得困难且低效。

> 💡 **关键洞察**：既然 LLM 的奖励通常是序列级别的（只在输出末尾给出），那么是否可以完全绕过 token 级别的价值估计，直接利用多个完整输出之间的相对比较来估计优势？

##### 核心机制：从 PPO 到 GRPO

**PPO 的目标函数**回顾：

$$\mathcal{J}_{\text{PPO}}(\theta) = \mathbb{E}\left[\frac{1}{|o|}\sum_{t=1}^{|o|}\min\left(\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}A_t,\;\text{clip}\left(\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\theta_{\text{old}}}(o_t|q,o_{<t})}, 1-\varepsilon, 1+\varepsilon\right)A_t\right)\right]$$

其中优势 \(A_t\) 通过 GAE（Generalized Advantage Estimation）基于 Value Model \(V_\psi\) 计算。

**GRPO 的核心改进**在于用组内相对奖励替代 GAE：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}\left[\frac{1}{G}\sum_{i=1}^{G}\frac{1}{|o_i|}\sum_{t=1}^{|o_i|}\min\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}\hat{A}_{i,t},\;\text{clip}\left(\frac{\pi_\theta(o_{i,t}|q,o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t}|q,o_{i,<t})}, 1-\varepsilon, 1+\varepsilon\right)\hat{A}_{i,t}\right) - \beta\;\mathbb{D}_{\text{KL}}\left(\pi_\theta \| \pi_{\text{ref}}\right)\right]$$

其中 KL 散度项为序列级别的估计：

$$\mathbb{D}_{\text{KL}}\left(\pi_\theta \| \pi_{\text{ref}}\right) = \frac{\pi_{\text{ref}}(o_{i,t}|q,o_{i,<t})}{\pi_\theta(o_{i,t}|q,o_{i,<t})} - \log\frac{\pi_{\text{ref}}(o_{i,t}|q,o_{i,<t})}{\pi_\theta(o_{i,t}|q,o_{i,<t})} - 1$$

##### 优势函数的组内归一化

这是 GRPO 最核心的设计。对于每个问题 \(q\)，从旧策略 \(\pi_{\theta_{\text{old}}}\) 中采样 \(G\) 个输出 \(\{o_1, o_2, \cdots, o_G\}\)，然后由奖励模型打分得到 \(\mathbf{r} = \{r_1, r_2, \cdots, r_G\}\)。

**Outcome Supervision** 模式下，每个输出的所有 token 共享同一个归一化后的优势值：

$$\hat{A}_{i,t} = \tilde{r}_i = \frac{r_i - \text{mean}(\mathbf{r})}{\text{std}(\mathbf{r})}$$

> 💡 **直觉理解**：这本质上是一种"相对评分"——不关心绝对奖励值的高低，只关心同一组内谁比谁好。如果一个输出的奖励高于组内平均，它获得正优势（被鼓励）；低于平均则获得负优势（被抑制）。标准差归一化确保了优势值的尺度稳定。

**Process Supervision** 模式下，过程奖励模型对每个推理步骤末尾给出奖励，归一化在所有步骤的奖励上进行：

$$\tilde{r}_i^{\text{index}(j)} = \frac{r_i^{\text{index}(j)} - \text{mean}(\mathbf{R})}{\text{std}(\mathbf{R})}$$

每个 token 的优势值设为其所在推理步骤末尾的归一化奖励。

##### KL 散度约束的设计变化

与 PPO 不同，GRPO 将 KL 散度惩罚从嵌入奖励中移出，直接作为损失函数的正则项。PPO 中 KL 惩罚是 token 级别地加入奖励信号：

$$r_t = r_\varphi(q, o_{\leq t}) - \beta \log\frac{\pi_\theta(o_t|q,o_{<t})}{\pi_{\text{ref}}(o_t|q,o_{<t})}$$

而 GRPO 采用序列级 KL 散度，直接减去 \(\beta \cdot \mathbb{D}_{\text{KL}}\)。这种设计更加简洁，且避免了 KL 惩罚对优势估计的干扰。

> ⚠️ **注意**：GRPO 使用的 KL 散度采用了非对称形式 \(\frac{p}{q} - \log\frac{p}{q} - 1\)，这是 KL 散度的一种无偏估计，相比直接用 \(\log\frac{p}{q}\) 具有更好的数值稳定性。

##### 迭代式训练与奖励模型更新

GRPO 采用迭代式在线 RL 训练策略：

1. **外循环**（Iteration）：每轮开始时将当前策略模型同步为参考模型 \(\pi_{\text{ref}} \leftarrow \pi_\theta\)
2. **内循环**（Step）：在每个 step 中，采样 batch → 生成 G 个输出 → 计算奖励 → 多次 GRPO 更新
3. **奖励模型持续训练**：通过 replay 机制持续更新奖励模型，防止策略模型"欺骗"固定的奖励模型（reward hacking）

##### 与传统方法的关键区别

| 特性 | PPO | GRPO |
|------|-----|------|
| Value Model | 需要（与 Policy 同规模） | **不需要** |
| 优势估计 | GAE（基于 Value Model） | **组内相对奖励归一化** |
| KL 惩罚位置 | 嵌入 token 级奖励 | **序列级损失正则项** |
| 采样策略 | 每个问题 1 个输出 | **每个问题 G 个输出** |
| 训练资源 | 4 个模型同时加载 | **3 个模型（省去 Value Model）** |
| 奖励模型 | 固定 | **可迭代更新** |

GRPO 的设计哲学是：**利用同一问题的多个输出之间的相对比较来替代绝对的价值估计**，这在 LLM 的序列级奖励场景下既自然又高效。

#### 🧪 练习题
```yaml
question: "GRPO 相比 PPO 最核心的改进是什么？"
options:
  - "使用更大的学习率加速收敛"
  - "去除 Value Model，通过组内采样输出的相对奖励归一化来估计优势函数"
  - "引入更复杂的奖励模型提升奖励精度"
  - "将策略梯度替换为进化策略以避免梯度消失"
answer: 1
explain: "GRPO 的核心创新是去除 Value Model，对每个问题采样 G 个输出，利用组内奖励的均值和标准差归一化作为优势估计，大幅降低训练资源同时保持性能。"
```
