### LFR — 学习公平表示 (Learning Fair Representations)

```yaml
id: lfr
name: LFR
full_name: 学习公平表示 (Learning Fair Representations)
year: '2013'
org: University of Toronto
paper_url: https://www.cs.toronto.edu/~toni/Papers/icml-final.pdf
category: fairness
parent: —
motivation: 通过学习中间表示同时实现群体公平与个体公平，使任意下游分类器均可公平决策
```

#### 📝 一句话总结

LFR 提出将个体数据映射到一组可学习原型（prototypes）的概率分布上，通过联合优化统计平等约束、重构误差和分类损失，学习一种"去敏感化"的中间表示，使得该表示既保留有用信息又抹除受保护属性信息，从而让任意下游分类器在此表示上自动实现公平决策。

#### 🎯 核心要点

- **原型映射机制**：将每个个体通过 softmax 概率映射到 K 个可学习原型上，形成中间表示向量 \(\{M_{n,k}\}_{k=1}^K\)
- **三项联合目标函数**：\(L = A_z \cdot L_z + A_x \cdot L_x + A_y \cdot L_y\)，分别对应公平性、信息保留和分类准确性
- **统计平等约束（\(L_z\)）**：强制受保护组与非受保护组在每个原型上的平均映射概率相等
- **重构损失（\(L_x\)）**：确保中间表示保留除受保护属性外的尽可能多的信息
- **分类损失（\(L_y\)）**：通过原型到标签的线性映射保证预测准确性
- **可学习距离度量**：为每个特征维度引入权重 \(\alpha_i\)，且受保护组/非受保护组使用不同权重 \(\alpha^+, \alpha^-\)
- **可组合性**：学到的表示可作为黑盒接口，任何分类器在此表示上均自动公平
- **实验数据集**：German Credit、Heritage Health Prize、Communities and Crime

#### 🔬 深入细节

```python
# LFR 核心算法伪代码
import numpy as np

def lfr_objective(X, S, Y, V, W, alpha_plus, alpha_minus, Az, Ax, Ay):
    """
    X: 输入数据 (N, D)
    S: 受保护属性 (N,), 0/1
    Y: 标签 (N,)
    V: 原型位置 (K, D)
    W: 原型分类权重 (K,), 值在[0,1]
    alpha_plus, alpha_minus: 特征权重 (D,)
    """
    N, D = X.shape
    K = V.shape[0]
    
    # Step 1: 计算映射概率 M_{n,k}
    M = np.zeros((N, K))
    for n in range(N):
        alpha = alpha_plus if S[n] == 1 else alpha_minus
        for k in range(K):
            dist = np.sum(alpha * (X[n] - V[k])**2)
            M[n, k] = np.exp(-dist)
        M[n] /= M[n].sum()  # softmax 归一化
    
    # Step 2: 统计平等损失 Lz
    M_plus = M[S == 1].mean(axis=0)   # 受保护组平均映射
    M_minus = M[S == 0].mean(axis=0)  # 非受保护组平均映射
    Lz = np.abs(M_plus - M_minus).sum()
    
    # Step 3: 重构损失 Lx
    X_hat = M @ V  # 重构: x_hat_n = sum_k M_{n,k} * v_k
    Lx = np.sum((X - X_hat)**2)
    
    # Step 4: 分类损失 Ly (交叉熵)
    Y_hat = M @ W  # 预测: y_hat_n = sum_k M_{n,k} * w_k
    Y_hat = np.clip(Y_hat, 1e-7, 1-1e-7)
    Ly = -np.sum(Y * np.log(Y_hat) + (1-Y) * np.log(1-Y_hat))
    
    # 总损失
    L = Az * Lz + Ax * Lx + Ay * Ly
    return L
```

##### 动机与背景

传统公平分类方法主要分为两类：**数据篡改策略**（修改训练标签使正标签在两组中比例相等）和**正则化策略**（在分类目标中加入歧视度惩罚项）。这些方法存在根本局限：

1. 数据篡改方法是临时性的（ad hoc），无法保证对新数据的泛化；
2. 正则化方法与特定分类器绑定，无法组合使用；
3. 两者都未考虑**个体公平**——即相似个体应获得相似待遇。

Dwork et al. (2011) 首次提出通过中间表示实现公平的框架，但其假设距离度量已知且不可学习，也无法泛化到新数据。LFR 正是为解决这些问题而提出。

##### 核心机制详解

**1. 原型映射（Prototype Mapping）**

LFR 定义 K 个原型 \(\{v_k\}_{k=1}^K\)，每个原型是与输入同维度的向量。个体 \(x_n\) 到原型 \(v_k\) 的映射概率通过带权距离的 softmax 计算：

$$M_{n,k} = P(Z=k|x_n) = \frac{\exp(-d(x_n, v_k))}{\sum_{j=1}^K \exp(-d(x_n, v_j))}$$

其中距离函数为加权欧氏距离：

$$d(x_n, v_k) = \sum_{i=1}^D \alpha_i (x_{ni} - v_{ki})^2$$

> 💡 关键：向量 \(\{M_{n,k}\}_{k=1}^K\) 即为个体 \(x_n\) 的"公平表示"——它是一个 K 维概率分布，编码了个体信息但抹除了受保护属性。

**2. 统计平等约束（Statistical Parity）**

公平性通过强制两组在原型空间中的分布相同来实现：

$$L_z = \sum_{k=1}^K |M_k^+ - M_k^-|$$

其中 \(M_k^+ = \frac{1}{|X_0^+|}\sum_{n \in X_0^+} M_{n,k}\) 是受保护组映射到原型 k 的平均概率。

> ⚠️ 注意：当 \(L_z \to 0\) 时，可以证明 \(Z\) 与 \(S\) 之间的互信息趋近于零，即表示中不包含关于受保护属性的信息。

**3. 重构损失（Information Preservation）**

为确保表示不丢失有用信息，LFR 要求从原型表示能重构原始输入：

$$L_x = \sum_{n=1}^N \|x_n - \hat{x}_n\|^2, \quad \hat{x}_n = \sum_{k=1}^K M_{n,k} \cdot v_k$$

这使得模型类似于一个带公平约束的自编码器，原型充当"码本"角色。

**4. 分类损失（Classification Accuracy）**

每个原型学习一个分类概率 \(w_k \in [0,1]\)，个体的预测通过边际化获得：

$$\hat{y}_n = \sum_{k=1}^K M_{n,k} \cdot w_k$$

分类损失为标准交叉熵（公式 10）。

> 💡 关键性质：当统计平等约束满足时，由于 \(\hat{y}_n\) 是 \(M_n\) 和 \(w\) 的线性函数，可以证明两组的平均预测概率自动相等，即分类决策也满足公平性。

**5. 分组距离度量学习**

LFR 为受保护组和非受保护组分别学习特征权重 \(\alpha^+\) 和 \(\alpha^-\)，这解决了 Dwork et al. 提出的"反转问题"（inversion problem）——不同群体中不同特征可能具有不同的预测意义。

##### 训练与推理流程

**训练阶段**：使用 L-BFGS 或梯度下降联合优化所有参数 \(\{v_k, w_k, \alpha^+, \alpha^-\}\)，最小化总目标 \(L = A_z L_z + A_x L_x + A_y L_y\)。超参数 \(A_z, A_x, A_y\) 控制三个目标之间的权衡。

**推理阶段**：对新个体 \(x_{new}\)，先计算其到各原型的映射概率 \(M_{new}\)，然后：
- 公平表示：直接使用 \(M_{new}\) 作为特征输入任意下游分类器；
- 直接预测：\(\hat{y}_{new} = \sum_k M_{new,k} \cdot w_k\)。

##### 与传统方法的区别

| 特性 | 数据篡改方法 | 正则化方法 | LFR |
|------|------------|-----------|-----|
| 可泛化到新数据 | ✗ | ✓ | ✓ |
| 与分类器解耦 | ✗ | ✗ | ✓ |
| 个体公平 | ✗ | ✗ | ✓（相似输入→相似表示） |
| 学习距离度量 | — | — | ✓ |
| 群体公平 | ✓ | ✓ | ✓ |

LFR 的核心优势在于**可组合性**：一旦学到公平表示，任何下游分类器都可以在此表示上训练，无需额外公平约束，实现了"公平即服务"的理念。

#### 🧪 练习题

```yaml
question: "LFR 模型中，统计平等约束 Lz 的直接优化目标是什么？"
options:
  - "最小化受保护组与非受保护组的分类准确率差异"
  - "最小化两组在每个原型上的平均映射概率之差的绝对值之和"
  - "最大化中间表示与受保护属性之间的互信息"
  - "最小化两组输入数据的特征分布差异"
answer: 1
explain: "Lz = Σk |M+k - M-k|，直接最小化两组在每个原型上平均映射概率的差异，间接使表示与受保护属性的互信息趋零。"
```