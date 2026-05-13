### Randomized Smoothing

```yaml
id: rs
name: Randomized Smoothing
full_name: "随机平滑认证防御 (Certified Adversarial Robustness via Randomized Smoothing)"
year: 2019
org: CMU
paper_url: "https://arxiv.org/abs/1902.02918"
category: foundation
parent: "—"
motivation: "通过高斯噪声平滑将任意分类器转化为具有可证明L2鲁棒性的平滑分类器"
```

#### 📝 一句话总结

Randomized Smoothing 证明了对任意基分类器施加各向同性高斯噪声后取多数投票所得的平滑分类器，在 \(\ell_2\) 范数下具有紧的可认证鲁棒半径 \(R = \sigma \Phi^{-1}(\underline{p_A})\)，首次在 ImageNet 规模上实现了可证明的对抗鲁棒性。

#### 🎯 核心要点

- **平滑分类器定义**：\(g(x) = \arg\max_c \mathbb{P}(f(x+\varepsilon)=c)\)，其中 \(\varepsilon \sim \mathcal{N}(0, \sigma^2 I)\)
- **紧的 \(\ell_2\) 认证半径**：\(R = \sigma \Phi^{-1}(\underline{p_A})\)（二分类）；一般情况 \(R = \frac{\sigma}{2}[\Phi^{-1}(\underline{p_A}) - \Phi^{-1}(\overline{p_B})]\)
- **证明技术**：利用 Neyman-Pearson 引理构造最坏情况分类器，证明认证半径的紧性
- **Monte Carlo 认证算法**：通过采样 + Clopper-Pearson 置信区间估计 \(\underline{p_A}\)，给出概率性正确的认证
- **训练方法**：高斯数据增强（训练时对输入加 \(\mathcal{N}(0, \sigma^2 I)\) 噪声）
- **ImageNet 规模验证**：在 \(\ell_2 < 0.5\) 扰动下达到 49% certified top-1 accuracy

#### 🔬 深入细节

##### 核心示意图

![Randomized Smoothing 示意图](https://ar5iv.labs.arxiv.org/html/1902.02918/assets/figures/illustration.png)
*图：左侧为基分类器 f 的决策区域（不同颜色），虚线为高斯分布 \(\mathcal{N}(x, \sigma^2 I)\) 的等高线；右侧为 \(f(\mathcal{N}(x, \sigma^2 I))\) 的类别概率分布，\(\underline{p_A}\) 为 top class 的概率下界，\(\overline{p_B}\) 为 runner-up class 的概率上界。*

##### 算法伪代码

```python
# Algorithm 1: Predict & Certify

def Predict(f, sigma, x, n, alpha):
    """评估平滑分类器 g(x)"""
    counts = SampleUnderNoise(f, x, n, sigma)
    c_A, c_B = top_two_classes(counts)
    n_A, n_B = counts[c_A], counts[c_B]
    if BinomPValue(n_A, n_A + n_B, 0.5) <= alpha:
        return c_A
    else:
        return ABSTAIN

def Certify(f, sigma, x, n0, n, alpha):
    """认证平滑分类器在 x 处的鲁棒半径"""
    # Step 1: 用少量样本确定 top class
    counts0 = SampleUnderNoise(f, x, n0, sigma)
    c_A = argmax(counts0)
    
    # Step 2: 用大量样本估计 p_A 的下界
    counts = SampleUnderNoise(f, x, n, sigma)
    p_A_lower = LowerConfBound(counts[c_A], n, 1 - alpha)  # Clopper-Pearson
    
    if p_A_lower > 0.5:
        radius = sigma * Phi_inv(p_A_lower)
        return c_A, radius
    else:
        return ABSTAIN, 0.0
```

##### 动机与背景

对抗样本问题是深度学习安全性的核心挑战：微小的输入扰动可导致分类器产生错误预测。**可证明防御（certified defense）** 旨在为分类器提供数学上的鲁棒性保证——即在给定扰动范围内，分类结果不会改变。

此前的可证明防御方法（如基于 SDP 松弛、区间传播、线性松弛等）虽然在小规模数据集上可行，但由于需要分析网络的具体结构，**无法扩展到 ImageNet 等大规模任务**。Randomized Smoothing 的核心优势在于：它是 **模型无关的（model-agnostic）**——无需知道基分类器 \(f\) 的内部结构，只需能够查询其输出即可。

##### 核心机制：平滑分类器与认证半径

**定义**：给定基分类器 \(f: \mathbb{R}^d \to \mathcal{Y}\) 和噪声标准差 \(\sigma\)，平滑分类器定义为：

$$g(x) = \arg\max_{c \in \mathcal{Y}} \mathbb{P}_{\varepsilon \sim \mathcal{N}(0, \sigma^2 I)}[f(x + \varepsilon) = c]$$

直觉上，\(g(x)\) 返回的是在 \(x\) 的高斯邻域内 \(f\) 最频繁预测的类别。

**Theorem 1（核心定理）**：设 \(c_A = g(x)\)，且：

$$p_A = \mathbb{P}(f(x+\varepsilon) = c_A) \geq \underline{p_A} > \overline{p_B} \geq \max_{c \neq c_A} \mathbb{P}(f(x+\varepsilon) = c)$$

则对所有满足 \(\|\delta\|_2 < R\) 的扰动 \(\delta\)，有 \(g(x+\delta) = c_A\)，其中：

$$R = \frac{\sigma}{2}\left[\Phi^{-1}(\underline{p_A}) - \Phi^{-1}(\overline{p_B})\right]$$

在二分类情况下（\(\overline{p_B} = 1 - \underline{p_A}\)），简化为：

$$R = \sigma \Phi^{-1}(\underline{p_A})$$

> 💡 **关键直觉**：\(\sigma\) 越大，认证半径越大，但基分类器在噪声下的准确率越低——存在 accuracy-robustness trade-off。

##### 证明思路：Neyman-Pearson 引理

证明的核心思想是寻找"最坏情况"基分类器。固定扰动 \(\delta\)，问题变为：

> 在所有满足 \(\mathbb{P}(f(x+\varepsilon)=c_A) \geq \underline{p_A}\) 的分类器 \(f\) 中，哪一个使得 \(\mathbb{P}(f(x+\delta+\varepsilon)=c_A)\) 最小？

由 **Neyman-Pearson 引理**，最坏情况分类器 \(f^*\) 是一个线性分类器，其决策边界垂直于扰动方向 \(\delta\)：

$$f^*(x') = \begin{cases} c_A & \text{if } \delta^T(x'-x) \leq \sigma\|\delta\|_2 \Phi^{-1}(\underline{p_A}) \\ c_B & \text{otherwise} \end{cases}$$

该最坏情况分类器将 \(\mathcal{N}(x+\delta, \sigma^2 I)\) 分类为 \(c_A\) 的概率为：

$$\Phi\left(\Phi^{-1}(\underline{p_A}) - \frac{\|\delta\|_2}{\sigma}\right)$$

要保证此概率 \(> 1/2\)，解得 \(\|\delta\|_2 < \sigma \Phi^{-1}(\underline{p_A})\)。

> ⚠️ **注意**：该认证半径是**紧的（tight）**——存在满足约束的分类器恰好在半径边界处失效，因此无法进一步改进。

##### 统计认证：Monte Carlo 估计

实际中 \(p_A\) 未知，需通过采样估计。Certify 算法的流程：

1. **采样**：抽取 \(n\) 个高斯噪声样本 \(\varepsilon_i \sim \mathcal{N}(0, \sigma^2 I)\)，统计 \(f(x+\varepsilon_i) = c_A\) 的次数 \(n_A\)
2. **置信下界**：用 Clopper-Pearson 方法计算 \(p_A\) 的 \((1-\alpha)\) 单侧置信下界 \(\underline{p_A}\)
3. **计算半径**：\(R = \sigma \Phi^{-1}(\underline{p_A})\)

> 💡 **概率保证**：以至少 \(1-\alpha\) 的概率，返回的半径是正确的（即在该半径内分类确实不变）。

##### 训练方法

论文发现最有效的训练方法是简单的**高斯数据增强**：

$$\min_\theta \mathbb{E}_{(x,y)\sim\mathcal{D}} \mathbb{E}_{\varepsilon \sim \mathcal{N}(0, \sigma^2 I)} [\ell(f_\theta(x + \varepsilon), y)]$$

即在标准训练中，每个 mini-batch 的输入都加上与认证时相同方差的高斯噪声。这比对抗训练简单得多，且在 ImageNet 上可行。

##### 与先前工作的对比

| 方法 | 认证范数 | 可扩展性 | 认证紧性 |
|------|---------|---------|---------|
| SDP 松弛 | \(\ell_\infty\) | 小网络 | 松 |
| 区间传播 (IBP) | \(\ell_\infty\) | 中等 | 松 |
| Lecuyer et al. (PixelDP) | \(\ell_2\) | ImageNet | 松（Rényi 散度） |
| Li et al. | \(\ell_2\) | ImageNet | 松（信息论） |
| **本文 (Cohen et al.)** | \(\ell_2\) | **ImageNet** | **紧** |

本文的关键改进：Lecuyer et al. 和 Li et al. 也使用了随机平滑框架，但它们的认证半径是松的（基于 Rényi 散度或互信息的界）。本文通过 Neyman-Pearson 引理直接推导出紧的认证半径，在相同条件下给出更大的认证区域。

#### 🧪 练习题

```yaml
question: "Randomized Smoothing 中，增大噪声标准差 σ 会产生什么效果？"
options:
  - "认证半径增大，且基分类器准确率不受影响"
  - "认证半径增大，但基分类器在噪声下的准确率降低"
  - "认证半径减小，但基分类器准确率提升"
  - "认证半径和准确率都不受影响，仅影响采样次数"
answer: 1
explain: "R = σΦ⁻¹(p_A)，σ 增大使半径公式中的系数增大，但同时噪声更强导致 p_A 降低，存在 accuracy-robustness trade-off。"
```