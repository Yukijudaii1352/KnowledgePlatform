### 高斯过程回归 (Gaussian Processes for Regression)

```yaml
id: gpr
name: GPR
full_name: "高斯过程回归 (Gaussian Processes for Regression)"
year: "1995"
org: "University of Toronto"
paper_url: "https://proceedings.neurips.cc/paper/1995/hash/7cce53cf90577442771720a370c3c723-Abstract.html"
category: "foundation"
parent: "—"
motivation: "将高斯过程先验应用于回归问题，通过协方差函数参数化实现自动相关性确定和不确定性的定性估计"
```

#### 📝 一句话总结

GPR 将高斯过程先验直接应用于函数空间进行回归预测，通过参数化协方差函数实现自动相关性确定（ARD），并提供解析形式的预测均值与不确定性估计，为核方法回归奠定了基础。

#### 🎯 核心要点

- 非参数贝叶斯回归：对函数施加高斯过程先验，预测分布为解析高斯分布
- 预测公式：均值 \(k^T(x)K^{-1}t\)，方差 \(C(x,x) - k^T(x)K^{-1}k(x)\)
- 协方差函数设计：包含局部相关项（指数二次）、线性回归项和噪声项三部分
- 自动相关性确定（ARD）：每个输入维度独立的长度尺度参数 \(w_l\)，自动识别无关输入
- 超参数学习：最大似然估计（共轭梯度优化）和混合蒙特卡洛（HMC）两种方法
- 计算复杂度 \(O(n^3)\)：源于矩阵求逆操作
- 统一框架：将 ARMA 模型、样条平滑、kriging 等方法统一在高斯过程视角下

#### 🔬 深入细节

![高斯过程回归预测示意图](https://proceedings.neurips.cc/paper/1995/file/7cce53cf90577442771720a370c3c723-Paper.pdf)
*图：论文 Figure 1 展示了 GP 预测的核心思想——通过训练点的观测值对联合高斯分布进行条件化，得到测试点的预测分布（含均值和不确定性）。*

> 💡 **核心直觉**：高斯过程回归的本质是：假设任意有限个点的函数值服从联合高斯分布，观测到训练数据后，通过条件化（conditioning）得到测试点的后验预测分布。

```python
# GPR 预测伪代码
def gpr_predict(X_train, t_train, x_test, covariance_fn, theta):
    """
    高斯过程回归预测
    X_train: 训练输入 (n, d)
    t_train: 训练目标 (n,)
    x_test: 测试输入
    covariance_fn: 协方差函数 C(x_i, x_j; theta)
    theta: 超参数 (v0, v1, w1,...,wd, a0, a1)
    """
    n = len(X_train)
    
    # 构建训练集协方差矩阵 K (n x n)
    K = [[covariance_fn(X_train[i], X_train[j], theta) 
          for j in range(n)] for i in range(n)]
    
    # 构建测试点与训练集的交叉协方差向量 k(x)
    k_x = [covariance_fn(x_test, X_train[i], theta) for i in range(n)]
    
    # 预测均值: k^T(x) @ K^{-1} @ t
    K_inv_t = solve(K, t_train)  # O(n^3)
    mean = dot(k_x, K_inv_t)
    
    # 预测方差: C(x,x) - k^T(x) @ K^{-1} @ k(x)
    K_inv_k = solve(K, k_x)
    variance = covariance_fn(x_test, x_test, theta) - dot(k_x, K_inv_k)
    
    return mean, variance

# 超参数优化 (最大似然)
def optimize_hyperparameters(X_train, t_train, covariance_fn, theta_init):
    """
    最大化对数边际似然:
    log p(t|X,theta) = -1/2 log|K| - 1/2 t^T K^{-1} t - n/2 log(2π)
    """
    def neg_log_likelihood(theta):
        K = build_K(X_train, covariance_fn, theta)
        return 0.5 * log_det(K) + 0.5 * dot(t, solve(K, t)) + n/2 * log(2*pi)
    
    # 使用共轭梯度法优化
    theta_opt = conjugate_gradient(neg_log_likelihood, theta_init)
    return theta_opt
```

**1. 动机与背景**

传统的回归方法（如神经网络）面临两个核心问题：（1）模型选择困难——需要确定网络结构、隐藏单元数等；（2）难以提供可靠的预测不确定性估计。虽然贝叶斯神经网络（如 Neal 1994 的工作）通过对权重积分可以解决这些问题，但计算上需要复杂的 MCMC 采样。

Williams 和 Rasmussen 提出了一种更直接的方法：既然贝叶斯神经网络在无限宽度极限下等价于高斯过程（Neal 1994），为什么不直接在函数空间上指定高斯过程先验？这样可以：
- 避免模型选择问题（非参数方法）
- 获得解析形式的预测分布
- 自然地提供不确定性估计

**2. 核心机制：高斯过程预测**

给定训练数据 \(\{(x^{(i)}, t^{(i)})\}_{i=1}^n\)，假设目标值由真实函数加噪声生成：\(t^{(i)} = y(x^{(i)}) + \epsilon\)，其中 \(\epsilon \sim \mathcal{N}(0, v_1)\)。

对函数 \(y(\cdot)\) 施加均值为零的高斯过程先验，其完全由协方差函数 \(C(x, x')\) 确定。对于任意测试点 \(x\)，预测分布为高斯分布：

$$\mu(x) = \mathbf{k}^T(x) K^{-1} \mathbf{t}$$

$$\sigma^2(x) = C(x, x) - \mathbf{k}^T(x) K^{-1} \mathbf{k}(x)$$

其中：
- \(\mathbf{k}(x) = (C(x, x^{(1)}), \ldots, C(x, x^{(n)}))^T\) 是测试点与所有训练点的协方差向量
- \(K_{ij} = C(x^{(i)}, x^{(j)})\) 是训练集的协方差矩阵
- \(\mathbf{t} = (t^{(1)}, \ldots, t^{(n)})^T\) 是训练目标向量

> 💡 **关键直觉**：预测均值是训练目标值的线性加权组合，权重由测试点与训练点的"相似度"（协方差）决定。预测方差反映了先验不确定性减去由训练数据提供的信息量。

**3. 协方差函数设计与 ARD**

论文提出的协方差函数包含三个组成部分：

$$C(x^{(i)}, x^{(j)}) = v_0 \exp\left\{-\frac{1}{2} \sum_{l=1}^d w_l (x_l^{(i)} - x_l^{(j)})^2\right\} + a_0 + a_1 \sum_{l=1}^d x_l^{(i)} x_l^{(j)} + v_1 \delta_{ij}$$

各部分的作用：
- **局部相关项**（第一项）：输入空间中距离近的点具有高度相关的输出。每个维度有独立的长度尺度参数 \(w_l\)——这就是**自动相关性确定（ARD）**的核心：如果某个输入维度无关，对应的 \(w_l\) 会趋近于零，模型自动忽略该维度。\(v_0\) 控制局部相关的整体尺度。
- **线性回归项**（\(a_0 + a_1 \sum x_l^{(i)} x_l^{(j)}\)）：提供全局线性趋势建模能力。
- **噪声项**（\(v_1 \delta_{ij}\)）：建模观测噪声方差。

> ⚠️ **注意**：超参数定义为对应变量的对数（因为它们是正的尺度参数），即 \(\theta = (\log v_0, \log v_1, \log w_1, \ldots, \log w_d, \log a_0, \log a_1)\)。

**4. 超参数学习**

论文提出两种超参数学习方法：

**方法一：最大似然估计（ML）**

对数边际似然为：

$$\ell = -\frac{1}{2} \log \det K - \frac{1}{2} \mathbf{t}^T K^{-1} \mathbf{t} - \frac{n}{2} \log 2\pi$$

使用共轭梯度法最大化 \(\ell\)。对数似然对超参数的梯度可以解析计算：

$$\frac{\partial \ell}{\partial \theta_i} = -\frac{1}{2} \text{tr}\left(K^{-1} \frac{\partial K}{\partial \theta_i}\right) + \frac{1}{2} \mathbf{t}^T K^{-1} \frac{\partial K}{\partial \theta_i} K^{-1} \mathbf{t}$$

**方法二：混合蒙特卡洛（HMC）**

为了避免 ML 可能陷入局部最优，论文采用 HMC 对超参数的后验分布进行采样。HMC 引入辅助动量变量，利用哈密顿动力学进行高效采样：
- 使用 leapfrog 积分器模拟动力学轨迹
- 窗口化 HMC：在轨迹的一个窗口内随机选择接受状态
- 动量持续性（persistence = 0.95）：减缓动量变化速度，避免随机游走

最终预测分布是 200 个高斯分布的混合（对应 200 组采样的超参数值）。

**5. 与传统方法的区别**

| 方法 | 特点 | 局限 |
|------|------|------|
| 参数化神经网络 | 需选择结构，点估计 | 模型选择困难，无不确定性 |
| 贝叶斯神经网络 | 权重积分，MCMC | 计算昂贵，收敛诊断困难 |
| 样条平滑 | 特定正则化器 | 仅在 2m > d 时有效 |
| **GPR** | **非参数，解析预测** | **\(O(n^3)\) 复杂度** |

GPR 的核心优势在于：
1. 预测分布有解析形式（无需 MCMC 采样预测）
2. 自然提供校准的不确定性估计
3. ARD 机制自动进行特征选择
4. 统一了多种经典回归方法（样条、kriging、ARMA）

**6. 实验验证**

在 Neal 的机器人手臂问题上（200 训练/200 测试），GPR 取得了与贝叶斯神经网络可比的性能：
- GPR（2输入）：测试误差 1.126
- GPR（6输入，含噪声/无关输入）：测试误差 1.138
- Neal 的贝叶斯神经网络（2输入）：1.094

关键发现：在 6 输入实验中，GPR 通过 ARD 成功识别出无关输入（对应的 \(w_l\) 值很小），性能几乎不受影响，验证了自动相关性确定的有效性。

#### 🧪 练习题

```yaml
question: "在高斯过程回归中，协方差函数中每个输入维度的长度尺度参数 w_l 的作用是什么？"
options:
  - "控制预测分布的均值大小"
  - "实现自动相关性确定（ARD），当 w_l 趋近零时模型忽略该维度"
  - "决定训练数据的噪声方差"
  - "控制矩阵求逆的数值稳定性"
answer: 1
explain: "w_l 是每个输入维度的独立长度尺度参数，当某维度无关时 w_l→0，使该维度对协方差无贡献，从而实现自动特征选择（ARD）。"
```