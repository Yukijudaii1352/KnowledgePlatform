### 支持向量回归 (Support Vector Regression, SVR)

```yaml
id: svr
name: SVR
full_name: 支持向量回归 (Support Vector Regression)
year: '1996'
org: AT&T Bell Labs
paper_url: https://proceedings.neurips.cc/paper/1996/hash/d38901788c533e8286cb6400b40b386d-Abstract.html
category: regression
parent: svm
motivation: ε-不敏感损失实现稀疏核回归
```

#### 📝 一句话总结

SVR 将支持向量机的最大间隔思想推广到回归问题，通过引入 ε-不敏感损失函数构建一个围绕回归函数的"管道"（ε-tube），仅对落在管道外的样本施加惩罚，从而获得稀疏的核回归解。

#### 🎯 核心要点

- 提出 ε-不敏感损失函数（ε-insensitive loss）：预测误差在 ε 范围内不计损失，超出部分线性惩罚
- 原始优化问题：最小化 \(\frac{1}{2}\|w\|^2 + C\sum(\xi_i + \xi_i^*)\)，兼顾模型平坦性与拟合精度
- 对偶形式通过拉格朗日乘子推导，天然支持核技巧（Kernel Trick）实现非线性回归
- 稀疏性：仅 ε-tube 外的样本对应非零拉格朗日乘子，成为支持向量
- 超参数三元组 \((C, \varepsilon, \text{kernel})\) 控制模型复杂度与泛化能力
- 实验对比 Bagging（基于回归树的集成方法）和特征空间岭回归，SVR 在高维空间中优势显著
- 优化复杂度不依赖输入空间维度，仅依赖样本数量

#### 🔬 深入细节

![SVR ε-tube 示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Kernel_Machine.svg/600px-Kernel_Machine.svg.png)
*图：支持向量机/回归的核映射示意。SVR 在高维特征空间中构建 ε-tube，仅管道外的点（支持向量）参与决定回归函数。*

```python
# SVR 训练伪代码
# 输入: 训练集 {(x_i, y_i)}, 参数 C, ε, 核函数 K
# 输出: 回归函数 f(x)

# 1. 构建对偶优化问题
# maximize: -½ Σᵢ Σⱼ (αᵢ - αᵢ*)(αⱼ - αⱼ*) K(xᵢ, xⱼ)
#           - ε Σᵢ (αᵢ + αᵢ*) + Σᵢ yᵢ(αᵢ - αᵢ*)
# subject to: Σᵢ (αᵢ - αᵢ*) = 0
#             0 ≤ αᵢ, αᵢ* ≤ C

# 2. 求解二次规划 (QP) 得到 α, α*
alpha, alpha_star = solve_QP(K, y, C, epsilon)

# 3. 识别支持向量 (α_i > 0 或 α_i* > 0 的样本)
support_vectors = [(i, x_i) for i in range(n) if alpha[i] > 0 or alpha_star[i] > 0]

# 4. 计算偏置 b (利用 KKT 条件, 选取 0 < α_i < C 的样本)
b = y_s - sum((alpha[j] - alpha_star[j]) * K(x_j, x_s) for j in SV) - epsilon

# 5. 预测函数
def f(x):
    return sum((alpha[i] - alpha_star[i]) * K(x_i, x) for i in SV) + b
```

**动机与背景**

在 1996 年之前，回归问题的主流方法包括线性回归、岭回归、神经网络和回归树等。这些方法存在以下局限：

1. **线性回归/岭回归**：在原始空间中只能拟合线性关系，表达能力有限；
2. **神经网络**：虽然具有强大的非线性拟合能力，但容易过拟合，且缺乏统计学习理论的泛化保证；
3. **回归树/Bagging**：对高维数据效率低下，且预测函数不连续。

Vapnik 在 1995 年提出的统计学习理论（VC 理论）为结构风险最小化提供了理论框架。SVM 已在分类问题上取得了巨大成功，自然的问题是：**能否将最大间隔的思想推广到回归问题？** SVR 正是对这一问题的回答。

**核心机制：ε-不敏感损失函数**

SVR 的核心创新在于 ε-不敏感损失函数的设计：

$$L_\varepsilon(y, f(x)) = \max(0, |y - f(x)| - \varepsilon)$$

这个损失函数的直觉是：**如果预测值与真实值的偏差不超过 ε，则认为预测是"足够好的"，不施加任何惩罚。** 只有当误差超过 ε 时，才按超出部分的大小线性惩罚。这与 Huber 损失不同——Huber 损失在零点附近是二次的，而 ε-不敏感损失在 \([-\varepsilon, \varepsilon]\) 区间内完全为零。

> 💡 关键：ε-tube 的宽度直接决定了模型的稀疏性。ε 越大，落在管道内的样本越多，支持向量越少，模型越简单但可能欠拟合。

**原始优化问题**

对于线性回归函数 \(f(x) = \langle w, x \rangle + b\)，SVR 的原始优化问题为：

$$\min_{w, b, \xi, \xi^*} \frac{1}{2}\|w\|^2 + C \sum_{i=1}^{n}(\xi_i + \xi_i^*)$$

$$\text{s.t.} \quad y_i - \langle w, x_i \rangle - b \leq \varepsilon + \xi_i$$
$$\langle w, x_i \rangle + b - y_i \leq \varepsilon + \xi_i^*$$
$$\xi_i, \xi_i^* \geq 0$$

其中：
- \(\frac{1}{2}\|w\|^2\) 是正则化项，控制函数的平坦程度（复杂度）；
- \(C\) 是正则化参数，平衡模型复杂度与训练误差；
- \(\xi_i, \xi_i^*\) 是松弛变量，分别对应上方和下方超出 ε-tube 的偏差。

**对偶形式与核技巧**

通过引入拉格朗日乘子 \(\alpha_i, \alpha_i^*\)，利用 KKT 条件推导对偶问题：

$$\max_{\alpha, \alpha^*} -\frac{1}{2}\sum_{i,j}(\alpha_i - \alpha_i^*)(\alpha_j - \alpha_j^*)\langle x_i, x_j \rangle - \varepsilon\sum_i(\alpha_i + \alpha_i^*) + \sum_i y_i(\alpha_i - \alpha_i^*)$$

$$\text{s.t.} \quad \sum_i(\alpha_i - \alpha_i^*) = 0, \quad 0 \leq \alpha_i, \alpha_i^* \leq C$$

关键观察：对偶问题中，输入数据仅以内积 \(\langle x_i, x_j \rangle\) 的形式出现。因此可以用核函数 \(K(x_i, x_j) = \langle \Phi(x_i), \Phi(x_j) \rangle\) 替换内积，实现非线性回归而无需显式计算高维映射。常用核函数包括：
- 高斯 RBF 核：\(K(x, x') = \exp(-\gamma\|x - x'\|^2)\)
- 多项式核：\(K(x, x') = (\langle x, x' \rangle + c)^d\)

最终回归函数为：

$$f(x) = \sum_{i=1}^{n}(\alpha_i - \alpha_i^*) K(x_i, x) + b$$

> ⚠️ 注意：由 KKT 条件，当 \(|y_i - f(x_i)| < \varepsilon\) 时，\(\alpha_i = \alpha_i^* = 0\)。这意味着 ε-tube 内部的样本对回归函数没有任何贡献——这正是 SVR 稀疏性的来源。

**与传统方法的区别**

| 特性 | SVR | 岭回归 | 神经网络 | 回归树 |
|------|-----|--------|----------|--------|
| 非线性能力 | 核技巧 | 需手动特征工程 | 隐层激活 | 分段常数 |
| 稀疏性 | ✓（仅支持向量） | ✗（所有样本） | ✗ | ✗ |
| 泛化理论 | VC 维/结构风险最小化 | 偏差-方差权衡 | 经验性 | 经验性 |
| 高维适应性 | 优秀（不依赖维度） | 需正则化 | 需大量数据 | 维度灾难 |
| 解的唯一性 | ✓（凸优化） | ✓ | ✗（非凸） | ✗ |

论文实验表明，SVR 在高维输入空间中表现尤为突出，因为其优化过程的复杂度不依赖于输入空间维度，而仅取决于样本数量和支持向量数量。

#### 🧪 练习题

```yaml
question: "SVR 中 ε-不敏感损失函数的核心作用是什么？"
options:
  - "将回归问题转化为分类问题"
  - "对预测误差在 ε 范围内的样本不施加惩罚，从而获得稀疏解"
  - "通过 ε 参数控制核函数的带宽"
  - "限制权重向量的范数不超过 ε"
answer: 1
explain: "ε-不敏感损失使得 ε-tube 内的样本对应的拉格朗日乘子为零，不参与回归函数的构建，从而实现稀疏的支持向量表示。"
```