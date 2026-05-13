### SHAP — SHapley Additive exPlanations

```yaml
id: shap
name: SHAP
full_name: "SHapley Additive exPlanations"
year: "2017"
org: "University of Washington"
paper_url: "https://arxiv.org/abs/1705.07874"
category: "trustworthy_learning"
parent: "—"
motivation: "基于 Shapley 值统一六种可解释性方法，为任意模型预测提供具有理论保证的特征归因"
```

#### 📝 一句话总结

SHAP 提出"加性特征归因方法"统一框架，证明 Shapley 值是唯一同时满足局部准确性、缺失性和一致性三条公理的解，并给出 Kernel SHAP（模型无关）和 Deep SHAP（深度网络专用）等高效近似算法，为任意黑盒模型的单样本预测提供具有博弈论保证的特征重要性解释。

#### 🎯 核心要点

- 定义"加性特征归因方法"类（Definition 1）：解释模型 \(g(z') = \phi_0 + \sum_{i=1}^{M} \phi_i z'_i\)，统一 LIME、DeepLIFT、LRP、Shapley regression values、Shapley sampling values、QII 六种方法
- 唯一性定理（Theorem 1）：在加性特征归因框架下，同时满足 Local Accuracy、Missingness、Consistency 三条性质的解唯一，即 Shapley 值
- SHAP 值定义：\(\phi_i = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(M-|S|-1)!}{M!} [f_x(S \cup \{i\}) - f_x(S)]\)，其中 \(f_x(S) = E[f(x) | x_S]\)
- Kernel SHAP（Theorem 2）：证明 LIME 框架在特定核函数 \(\pi_{x'}(z') = \frac{M-1}{\binom{M}{|z'|}|z'|(M-|z'|)}\)、平方损失、零正则化下恢复精确 Shapley 值
- Deep SHAP：利用 DeepLIFT 反向传播规则递归组合各层 SHAP 值，实现深度网络的高效近似归因
- 模型特定方法：Linear SHAP（\(\phi_i = w_i(x_i - E[x_i])\)）、Max SHAP（\(O(M^2)\) 复杂度）、Low-Order SHAP（低阶交互近似）

#### 🔬 深入细节

![SHAP 核心框架：Shapley 核权重与 Deep SHAP 组合规则](https://ar5iv.labs.arxiv.org/html/1705.07874/assets/x2.png)
*图：(A) Shapley 核权重按联盟大小对称分布，与启发式核显著不同；(B) Deep SHAP 利用网络组合结构递归反向传播 SHAP 值*

**算法伪代码 — Kernel SHAP 估计流程：**

```python
# Kernel SHAP: 通过加权线性回归估计 SHAP 值
def kernel_shap(f, x, M, num_samples):
    """
    f: 原始模型
    x: 待解释样本
    M: 特征数量
    num_samples: 采样联盟数
    """
    phi_0 = E[f(x)]  # 基线值（模型在训练集上的期望输出）
    
    # 1. 采样二值向量 z' ∈ {0,1}^M（排除全0和全1）
    Z = sample_coalitions(M, num_samples)
    
    # 2. 对每个 z'，构造映射样本 h_x(z') 并计算模型输出
    y = []
    weights = []
    for z_prime in Z:
        x_masked = map_to_original(z_prime, x)  # 缺失特征用条件期望填充
        y.append(f(x_masked))
        # Shapley 核权重
        s = sum(z_prime)
        w = (M - 1) / (comb(M, s) * s * (M - s))
        weights.append(w)
    
    # 3. 加权最小二乘回归求解 φ
    # min_φ Σ_z' π(z') [f(h_x(z')) - (φ_0 + Σ φ_i z'_i)]²
    phi = weighted_linear_regression(Z, y, weights)
    
    return phi  # φ_1, ..., φ_M 即为各特征的 SHAP 值
```

##### 动机与背景

随着机器学习模型复杂度不断提升（深度网络、集成方法等），模型预测的可解释性成为关键需求。2017 年前已有多种解释方法被独立提出——LIME 通过局部线性近似解释、DeepLIFT/LRP 通过反向传播归因、Shapley regression values 通过博弈论分配——但这些方法之间缺乏统一的理论联系，用户难以判断何种方法更优、各方法的理论保证是什么。

SHAP 的核心动机是：**能否找到一个统一框架，将这些方法纳入同一类别，并从公理化角度确定最优解？**

##### 加性特征归因方法的统一框架

SHAP 首先定义了"加性特征归因方法"（Additive Feature Attribution Methods）：

$$g(z') = \phi_0 + \sum_{i=1}^{M} \phi_i z'_i, \quad z' \in \{0,1\}^M$$

其中 \(z'\) 是简化输入空间中的二值向量，\(z'_i = 1\) 表示第 \(i\) 个特征"存在"，\(\phi_i \in \mathbb{R}\) 是第 \(i\) 个特征的归因值。论文证明 LIME、DeepLIFT、LRP、Shapley regression values、Shapley sampling values 和 QII 都属于此类。

> 💡 关键：这一统一视角揭示了看似不同的方法实际上都在求解同一形式的线性解释模型，区别仅在于如何确定 \(\phi_i\) 的值。

##### 三条公理与唯一性定理

论文提出三条期望性质：

1. **Local Accuracy（局部准确性）**：解释模型在原始输入处的输出等于原模型输出：
$$f(x) = g(x') = \phi_0 + \sum_{i=1}^{M} \phi_i$$

2. **Missingness（缺失性）**：缺失的特征不应有归因值：
$$x'_i = 0 \Rightarrow \phi_i = 0$$

3. **Consistency（一致性）**：若某特征在新模型中的边际贡献不低于旧模型，则其归因值不应降低：
$$f'_x(S \cup \{i\}) - f'_x(S) \geq f_x(S \cup \{i\}) - f_x(S), \forall S \subseteq F \setminus \{i\} \Rightarrow \phi_i(f', x) \geq \phi_i(f, x)$$

**Theorem 1** 证明：在加性特征归因方法类中，同时满足以上三条性质的解唯一，即 Shapley 值：

$$\phi_i(f, x) = \sum_{S \subseteq F \setminus \{i\}} \frac{|S|!(M - |S| - 1)!}{M!} \left[ f_x(S \cup \{i\}) - f_x(S) \right]$$

其中 \(f_x(S) = E[f(x) | x_S]\) 表示给定特征子集 \(S\) 的值后模型输出的条件期望。

> ⚠️ 注意：精确计算 SHAP 值需要遍历所有 \(2^M\) 个特征子集，复杂度为 \(O(2^M)\)，因此实际应用中必须使用近似方法。

##### Kernel SHAP：将 LIME 与 Shapley 值统一

Kernel SHAP 是论文最重要的算法贡献之一。它证明（Theorem 2）：当 LIME 的三个自由参数取特定值时，其解恰好等于 Shapley 值：

- **损失函数**：平方损失 \(L(f, g, \pi_{x'}) = \sum_{z'} \pi_{x'}(z') [f(h_x(z')) - g(z')]^2\)
- **核函数**：Shapley 核 \(\pi_{x'}(z') = \frac{(M-1)}{\binom{M}{|z'|} \cdot |z'| \cdot (M - |z'|)}\)
- **正则化**：\(\Omega = 0\)

Shapley 核的直觉是：**越接近全空或全满的联盟（\(|z'|\) 接近 0 或 \(M\)）权重越大**，因为这些联盟提供了关于单个特征边际贡献最清晰的信息。这与 LIME 原始使用的指数核或余弦核形成鲜明对比。

在实践中，Kernel SHAP 通过采样联盟子集并求解加权最小二乘问题来近似 SHAP 值，既保留了 LIME 的模型无关性，又获得了 Shapley 值的理论保证。

##### Deep SHAP：深度网络的组合近似

对于深度神经网络，Kernel SHAP 的采样效率不够高。Deep SHAP 利用网络的层次组合结构，将整体 SHAP 值分解为各组件 SHAP 值的递归组合：

$$m_{x_j f_3} = \frac{\phi_i(f_3, x)}{x_j - E[x_j]}$$

$$m_{y_i f_3} = \sum_{j=1}^{2} m_{y_i f_j} \cdot m_{x_j f_3} \quad \text{(链式法则)}$$

$$\phi_i(f_3, y) \approx m_{y_i f_3} \cdot (y_i - E[y_i]) \quad \text{(线性近似)}$$

Deep SHAP 的核心思想是：
1. 对网络中每个简单组件（线性层、激活函数、max pooling）解析计算局部 SHAP 值
2. 利用 DeepLIFT 风格的反向传播规则将各层的乘子（multiplier）递归组合
3. 最终得到输入特征对输出的 SHAP 值近似

> 💡 关键：与原始 DeepLIFT 不同，Deep SHAP 不需要启发式选择线性化规则，而是从各组件的 Shapley 值推导出有效的线性化方式。例如对 max 函数，Deep SHAP 的归因优于 DeepLIFT 的启发式规则。

##### 与传统方法的对比

| 方法 | 理论保证 | 模型依赖 | 计算复杂度 | 统一框架 |
|------|----------|----------|------------|----------|
| LIME | 无公理保证 | 模型无关 | 中等 | ✗ |
| DeepLIFT | 满足 Local Accuracy + Missingness | 深度网络 | 快 | ✗ |
| Shapley regression | 满足全部三条 | 模型无关 | \(O(2^M)\) | ✗ |
| **Kernel SHAP** | **满足全部三条** | **模型无关** | **可控采样** | **✓** |
| **Deep SHAP** | **近似满足三条** | **深度网络** | **快（反向传播）** | **✓** |

实验表明：(1) Kernel SHAP 在保持理论保证的同时，计算效率优于经典 Shapley sampling；(2) Deep SHAP 在 MNIST 数字识别任务上的归因质量优于原始 DeepLIFT，通过遮蔽实验验证了更好的 Shapley 近似带来更准确的特征重要性排序。

#### 🧪 练习题

```yaml
question: "SHAP 框架中 Theorem 1 证明 Shapley 值是唯一解所依赖的三条性质是什么？"
options:
  - "Local Accuracy、Missingness、Linearity"
  - "Local Accuracy、Missingness、Consistency"
  - "Completeness、Symmetry、Consistency"
  - "Efficiency、Dummy、Additivity"
answer: 1
explain: "Theorem 1 证明在加性特征归因方法类中，同时满足 Local Accuracy（解释模型在原输入处等于原模型输出）、Missingness（缺失特征归因为零）和 Consistency（边际贡献不减则归因不减）三条性质的唯一解是 Shapley 值。选项 C/D 是经典 Shapley 值的博弈论公理，但论文重新表述为更适合机器学习场景的三条等价性质。"
```