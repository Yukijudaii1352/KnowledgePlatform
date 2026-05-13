### 梯度下降法 (Gradient Descent)

```yaml
id: gd
name: GD
full_name: 梯度下降法 (Gradient Descent)
year: '1847'
org: Cauchy
paper_url: https://arxiv.org/abs/1609.04747
category: convex
parent: —
motivation: 沿负梯度方向迭代搜索，一阶优化鼻祖
```

#### 📝 一句话总结

梯度下降法通过沿目标函数负梯度方向迭代更新参数，以最小化损失函数，是几乎所有现代优化算法的基石。其三大变体——批量梯度下降（Batch GD）、随机梯度下降（SGD）和小批量梯度下降（Mini-batch GD）——在计算效率与收敛稳定性之间提供了不同的权衡方案。

#### 🎯 核心要点

- **基本更新规则**：参数沿目标函数梯度的反方向以学习率 \(\eta\) 步长迭代更新：\(\theta \leftarrow \theta - \eta \nabla_\theta J(\theta)\)
- **三大变体**：Batch GD（全量数据计算梯度）、SGD（单样本计算梯度）、Mini-batch GD（小批量数据计算梯度）
- **收敛保证**：凸函数上 Batch GD 保证收敛到全局最优；非凸函数上收敛到局部最优
- **SGD 的噪声特性**：高方差更新带来的随机性有助于跳出局部最优，但也导致收敛过程中的剧烈震荡
- **四大核心挑战**：学习率选择困难、所有参数共享同一学习率、学习率调度需预定义、鞍点逃逸困难
- **后续改进方向**：动量（Momentum）、自适应学习率（Adagrad/RMSprop/Adam）、Nesterov 加速梯度等均在 GD 基础上发展而来

#### 🔬 深入细节

![各优化器在损失曲面等高线上的轨迹对比](https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/contours_evaluation_optimizers_final_frame.png)
*图 1：不同优化算法在损失函数等高线上的收敛轨迹对比。SGD（无动量）收敛路径曲折且缓慢，而自适应方法（Adagrad、RMSprop、Adam）能更快抵达最优点。*

![各优化器在鞍点处的行为](https://ar5iv.labs.arxiv.org/html/1609.04747/assets/images/saddle_point_evaluation_optimizers_frame.png)
*图 2：不同优化算法在鞍点处的逃逸行为。SGD 在鞍点附近几乎停滞，而自适应学习率方法能迅速沿负曲率方向逃逸。*

##### 算法伪代码

```python
# === Batch Gradient Descent ===
for epoch in range(nb_epochs):
    gradient = evaluate_gradient(loss_function, full_dataset, params)
    params = params - learning_rate * gradient

# === Stochastic Gradient Descent (SGD) ===
for epoch in range(nb_epochs):
    np.random.shuffle(data)
    for sample in data:
        gradient = evaluate_gradient(loss_function, sample, params)
        params = params - learning_rate * gradient

# === Mini-batch Gradient Descent ===
for epoch in range(nb_epochs):
    np.random.shuffle(data)
    for batch in get_batches(data, batch_size=64):
        gradient = evaluate_gradient(loss_function, batch, params)
        params = params - learning_rate * gradient
```

##### 动机与背景

梯度下降法的思想最早由 Cauchy 于 1847 年提出：对于一个可微的目标函数 \(J(\theta)\)，其在某点处下降最快的方向就是该点负梯度方向 \(-\nabla_\theta J(\theta)\)。这一简洁而深刻的数学直觉构成了几乎所有一阶优化方法的理论基础。

在深度学习时代，梯度下降法成为训练神经网络的标准范式。然而，原始的批量梯度下降在面对大规模数据集时存在严重的计算瓶颈——每次参数更新都需要遍历整个训练集来计算梯度，这在数据量达到百万甚至十亿级别时几乎不可行。

##### 核心机制：三大变体

**1. 批量梯度下降 (Batch GD)**

对整个训练集计算梯度后进行一次参数更新：

$$\theta = \theta - \eta \cdot \nabla_\theta J(\theta)$$

> 💡 **关键**：Batch GD 在凸优化问题上保证收敛到全局最优，在非凸问题上收敛到局部最优。但其计算代价与数据集大小成正比，且无法进行在线学习。

**2. 随机梯度下降 (SGD)**

对每个训练样本 \((x^{(i)}, y^{(i)})\) 单独计算梯度并更新参数：

$$\theta = \theta - \eta \cdot \nabla_\theta J(\theta; x^{(i)}; y^{(i)})$$

SGD 的核心特征是**高方差更新**：由于每次仅基于单个样本估计梯度，更新方向存在显著噪声。这种噪声是一把双刃剑：

- **优势**：随机波动使优化轨迹能够跳出浅层局部最优，探索更广阔的参数空间
- **劣势**：即使接近最优解，仍会持续震荡，难以精确收敛

> ⚠️ **注意**：理论上，当学习率按特定调度（如 \(\eta_t \propto 1/t\)）逐步衰减时，SGD 的收敛行为与 Batch GD 等价。

**3. 小批量梯度下降 (Mini-batch GD)**

对大小为 \(n\) 的小批量数据计算梯度：

$$\theta = \theta - \eta \cdot \nabla_\theta J(\theta; x^{(i:i+n)}; y^{(i:i+n)})$$

Mini-batch GD 结合了前两者的优势：
- 相比 SGD，**降低了参数更新的方差**，使收敛过程更稳定
- 相比 Batch GD，**充分利用了矩阵运算的并行加速**，现代 GPU/TPU 对批量矩阵运算有极高的吞吐率
- 常用批量大小为 50–256，这也是深度学习实践中最常用的训练方式

> 💡 **关键**：在实际使用中，"SGD" 一词通常指代 Mini-batch GD，而非严格意义上的单样本随机梯度下降。

##### 梯度下降面临的核心挑战

论文系统总结了原始梯度下降法的四大核心挑战，这些挑战也正是后续所有改进算法的出发点：

**挑战 1：学习率选择困难**
- 学习率 \(\eta\) 过小 → 收敛极慢，训练时间不可接受
- 学习率 \(\eta\) 过大 → 损失函数在最优值附近震荡甚至发散

**挑战 2：学习率调度的局限性**
- 预定义的退火策略（如阶梯衰减、指数衰减）无法自适应地根据数据特征调整，需要大量人工调参

**挑战 3：所有参数共享同一学习率**
- 对于稀疏数据，高频特征和低频特征的梯度量级差异巨大。理想情况下，低频特征应使用更大的学习率以加速学习，但标准 GD 无法做到这一点

**挑战 4：鞍点问题**
- 在高维非凸优化中，鞍点（某些维度上升、某些维度下降的点）远比局部最优更常见。鞍点周围梯度接近零，SGD 在此几乎停滞不前

##### 与后续方法的关系

梯度下降法的这些挑战直接催生了一系列改进算法：

| 挑战 | 改进方法 | 核心思路 |
|------|---------|---------|
| 收敛震荡 | Momentum | 引入动量项 \(v_t = \gamma v_{t-1} + \eta \nabla_\theta J(\theta)\)，累积历史梯度方向 |
| 前瞻性不足 | Nesterov AG | 在动量方向上"先走一步"再计算梯度，提供预见性修正 |
| 统一学习率 | Adagrad | 为每个参数维护独立的累积梯度平方和，自动缩放学习率 |
| 学习率单调递减 | RMSprop / Adadelta | 使用梯度平方的指数移动平均替代累积和，避免学习率趋于零 |
| 综合优化 | Adam | 结合一阶矩（动量）与二阶矩（自适应学习率），并加入偏差修正 |

> 💡 **关键**：所有这些方法的参数更新核心仍然是 \(\theta \leftarrow \theta - \Delta\theta\)，区别仅在于 \(\Delta\theta\) 的计算方式。梯度下降法提供了这一统一框架。

#### 🧪 练习题

```yaml
question: "以下关于梯度下降三大变体的描述，哪一项是正确的？"
options:
  - "Batch GD 每次仅使用一个样本计算梯度，因此速度最快"
  - "SGD 的高方差更新只有负面影响，会严重阻碍收敛"
  - "Mini-batch GD 通过对小批量数据计算梯度，在收敛稳定性和计算效率之间取得平衡"
  - "三种变体在凸优化问题上的收敛速度完全相同"
answer: 2
explain: "Mini-batch GD 结合了 Batch GD 的低方差和 SGD 的高效率，通过小批量梯度估计在稳定性与速度之间取得最佳平衡，是深度学习实践中最常用的训练方式。"
```