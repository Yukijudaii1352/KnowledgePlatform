### Conformal Prediction

```yaml
id: conformal_prediction
name: Conformal Prediction
full_name: 保形预测 (Conformal Prediction)
year: 2008
org: Rutgers University / Royal Holloway, University of London
paper_url: https://jmlr.org/papers/v9/shafer08a.html
category: foundation
parent: —
motivation: 基于可交换性假设构造具有有限样本有效性保证的预测区间，无需分布假设即可提供严格的覆盖率保证
```

#### 📝 一句话总结

Conformal Prediction 利用非一致性度量（nonconformity measure）和可交换性假设，为任意机器学习模型的预测构造具有精确有限样本覆盖率保证的预测区域，无需对数据分布做参数化假设。

#### 🎯 核心要点

- 基于**可交换性（exchangeability）**假设，比 i.i.d. 更弱，保证有限样本有效性
- 核心机制：**非一致性度量（nonconformity measure）** \\(A(B, z)\\) 量化样本相对于数据集的"异常程度"
- 通过 **p 值排名** 构造预测区域：\\(\Gamma_\varepsilon = \{z : p_z > \varepsilon\}\\)
- **有效性定理**：对任意可交换序列，\\(\Pr\{z_n \notin \Gamma_\varepsilon\} \leq \varepsilon\\)
- 可包装任意底层算法（最近邻、SVM、线性回归、神经网络等）为保形预测器
- **最优性**：在满足不变性、有效性、嵌套性三个条件的所有预测器中，保形预测器产生最小预测区域
- 分类问题输出标签子集，回归问题输出预测区间
- 关键概念：**置信度（confidence）** = \\(1-\varepsilon\\)，**可信度（credibility）** = 最大使 \\(\Gamma_\varepsilon = \emptyset\\) 的 \\(\varepsilon\\)

#### 🔬 深入细节

##### 核心框架示意

Conformal Prediction 的核心思想可以概括为以下流程：

```
训练数据 {z₁,...,zₙ₋₁} + 候选新样本 zₙ
         ↓
计算所有样本的非一致性分数 αᵢ = A({z₁,...,zₙ}\{zᵢ}, zᵢ)
         ↓
计算 p 值: p_z = #{i: αᵢ ≥ αₙ} / n
         ↓
构造预测区域: Γε = {z : p_z > ε}
         ↓
输出具有 (1-ε) 覆盖率保证的预测区域
```

##### 算法伪代码

```python
# Conformal Prediction Algorithm (Transductive)
def conformal_predict(z_train, x_new, A, epsilon, Y_space):
    """
    z_train: 训练样本 [(x1,y1), ..., (x_{n-1}, y_{n-1})]
    x_new: 新对象的特征
    A: 非一致性度量函数 A(bag, example) -> score
    epsilon: 显著性水平
    Y_space: 标签空间（分类为有限集，回归为实数区间网格）
    """
    prediction_region = []
    
    for y in Y_space:
        # Step 1: 假设新样本标签为 y
        z_n = (x_new, y)
        bag = z_train + [z_n]  # 所有 n 个样本
        
        # Step 2: 计算所有非一致性分数
        alphas = []
        for i in range(len(bag)):
            bag_without_i = bag[:i] + bag[i+1:]  # 去掉第 i 个
            alpha_i = A(bag_without_i, bag[i])
            alphas.append(alpha_i)
        
        # Step 3: 计算 p 值
        alpha_n = alphas[-1]  # 新样本的分数
        p_y = sum(1 for a in alphas if a >= alpha_n) / len(bag)
        
        # Step 4: 判断是否纳入预测区域
        if p_y > epsilon:
            prediction_region.append(y)
    
    return prediction_region
```

##### 动机与背景

传统统计预测区间（如 Fisher 的正态预测区间）依赖强分布假设（独立性 + 正态性）。当这些假设不成立时，覆盖率保证失效。Conformal Prediction 的核心动机是：

> 💡 **关键洞察**：能否在仅假设数据可交换（而非 i.i.d. 或正态）的条件下，为任意预测算法提供有限样本的覆盖率保证？

**可交换性**是比 i.i.d. 更弱的假设：随机变量序列 \\(z_1, \ldots, z_n\\) 是可交换的，当且仅当对任意排列 \\(\pi\\)，\\((z_{\pi(1)}, \ldots, z_{\pi(n)})\\) 与 \\((z_1, \ldots, z_n)\\) 同分布。i.i.d. 序列必然可交换，但可交换序列不必独立。

##### 核心机制详解

**1. 非一致性度量 (Nonconformity Measure)**

非一致性度量 \\(A(B, z)\\) 是一个函数，输入为一个样本袋 \\(B\\) 和一个样本 \\(z\\)，输出一个实数，衡量 \\(z\\) 相对于 \\(B\\) 的"不一致程度"。常见选择包括：

- **最近邻距离**：\\(A(B, z) = \min_{z' \in B} d(z, z')\\)
- **残差**（回归）：\\(A(B, (x,y)) = |y - \hat{f}_B(x)|\\)，其中 \\(\hat{f}_B\\) 是基于 \\(B\\) 训练的模型
- **到类均值距离**（分类）：\\(A(B, (x,y)) = |\bar{x}_{B,y} - x|\\)
- **SVM 分离带**：基于支持向量机分离超平面的位置给出分数

> ⚠️ 注意：非一致性度量的选择决定了预测区域的**效率**（大小），但不影响**有效性**（覆盖率保证）。任何非一致性度量都能保证覆盖率。

**2. p 值计算与有效性保证**

给定 \\(n\\) 个样本（包括假设的新样本），计算非一致性分数 \\(\alpha_1, \ldots, \alpha_n\\)，新样本的 p 值为：

$$p_y = \frac{\#\{i = 1, \ldots, n \mid \alpha_i \geq \alpha_n\}}{n}$$

**有效性定理**：若 \\(z_1, \ldots, z_n\\) 可交换，则对任意 \\(\varepsilon \in (0,1)\\)：

$$\Pr\{p_{y_n} \leq \varepsilon\} \leq \varepsilon$$

等价地：

$$\Pr\{z_n \in \Gamma_\varepsilon(z_1, \ldots, z_{n-1})\} \geq 1 - \varepsilon$$

**证明直觉**：可交换性意味着 \\((\alpha_1, \ldots, \alpha_n)\\) 也是可交换的。因此 \\(\alpha_n\\) 在所有分数中排名最高的概率至多为 \\(1/n\\)，排名在前 \\(k\\) 的概率至多为 \\(k/n\\)。当 \\(p_y \leq \varepsilon\\) 时，意味着 \\(\alpha_n\\) 的排名在前 \\(\lfloor n\varepsilon \rfloor\\) 位，概率不超过 \\(\varepsilon\\)。

**3. 预测区域的构造**

- **分类问题**：对标签空间 \\(\mathcal{Y}\\) 中的每个标签 \\(y\\) 计算 \\(p_y\\)，预测区域为 \\(\Gamma_\varepsilon = \{y : p_y > \varepsilon\}\\)
- **回归问题**：对实数轴上的候选值计算 \\(p_y\\)，预测区域通常为一个区间

对于分类，自然的报告方式是：
- **置信度**：最大的 \\(1-\varepsilon\\) 使得 \\(\Gamma_\varepsilon\\) 为单一标签
- **可信度**：最大的 \\(\varepsilon\\) 使得 \\(\Gamma_\varepsilon = \emptyset\\)（低可信度表示新样本对该方法来说是异常的）

**4. 最优性定理**

设 \\(\gamma\\) 是满足以下三个条件的任意区域预测器：
1. **不变性**：预测不依赖训练样本的排列顺序
2. **有效性**：\\(\Pr\{z_n \in \gamma_\varepsilon\} \geq 1-\varepsilon\\) 对所有可交换分布成立
3. **嵌套性**：\\(\varepsilon_1 \geq \varepsilon_2 \Rightarrow \gamma_{\varepsilon_1} \subseteq \gamma_{\varepsilon_2}\\)

则存在非一致性度量 \\(A\\) 使得保形预测器 \\(\gamma^A\\) 满足 \\(\gamma^A_\varepsilon(B) \subseteq \gamma_\varepsilon(B)\\) 对所有 \\(B\\) 和 \\(\varepsilon\\) 成立。

> 💡 **直觉**：保形预测器在满足有效性的所有预测器中产生最紧的预测区域——它是最优的。

##### 与传统方法的对比

| 特性 | Fisher 预测区间 | Conformal Prediction |
|------|----------------|---------------------|
| 分布假设 | 正态 + 独立 | 仅可交换性 |
| 有效性 | 渐近/精确（需假设成立） | 有限样本精确 |
| 适用模型 | 线性模型 | 任意模型 |
| 计算代价 | 低 | 较高（需遍历标签空间） |
| 预测区域形状 | 固定（区间） | 自适应（可为任意集合） |

##### 实际应用示例

论文通过 Edgar Anderson 的鸢尾花数据集展示了三种非一致性度量的效果：

1. **最近邻**：\\(A(B,(x,y)) = \min_{(x',y') \in B, y'=y} |x-x'|\\)
   - 96% 置信度预测 versicolor，可信度 32%
   
2. **到类均值距离**：\\(A(B,(x,y)) = |\bar{x}_{B,y} - x|\\)
   - 96% 置信度预测 versicolor，可信度仅 8%

3. **SVM 分离带**：基于最优分离区间的位置
   - 92% 置信度预测 versicolor，可信度 100%

三种方法的有效性保证相同，但效率（预测区域大小）和可信度不同，体现了非一致性度量选择的重要性。

#### 🧪 练习题

```yaml
question: "Conformal Prediction 的有效性保证依赖于以下哪个假设？"
options:
  - "数据服从正态分布"
  - "数据是独立同分布的"
  - "数据序列是可交换的"
  - "模型的预测误差有界"
answer: 2
explain: "Conformal Prediction 的覆盖率保证仅需要数据序列的可交换性（exchangeability），这比 i.i.d. 更弱的假设。可交换性保证了非一致性分数的对称性，从而使 p 值均匀分布。"
```