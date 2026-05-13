### bnn_scale: 面向大规模贝叶斯神经网络的近端得分匹配变分推断

```yaml
id: bnn_scale
name: Proximal Score-Matching VI
full_name: 面向大规模贝叶斯神经网络的近端得分匹配变分推断 (Scaling Up Score-Based Variational Inference)
year: "2025"
org: Samsung AI Cambridge
paper_url: https://arxiv.org/abs/2502.05873
category: foundation
parent: "—"
motivation: 通过近端得分匹配目标替代传统ELBO优化，实现无需重参数化采样的可扩展BNN变分推断，首次将得分匹配VI扩展到ViT等大规模模型
```

#### 📝 一句话总结

提出近端得分匹配变分推断（Proximal Score-Matching VI）方法，通过将得分匹配损失与近端正则项结合，解决了传统得分匹配VI无法处理含噪mini-batch得分函数的根本瓶颈，首次将基于得分的变分推断扩展到ViT-L-32、ResNet-101等大规模贝叶斯神经网络。

#### 🎯 核心要点

- **近端得分匹配目标**：公式(7)将得分匹配损失与欧氏近端惩罚项结合，允许使用含噪的mini-batch后验得分函数，突破了原始得分匹配VI要求精确全数据集得分的限制
- **无需重参数化采样**：梯度估计器(公式9)仅需从旧分布 \(q_{\phi_{\text{old}}}\) 采样，避免了ADVI等方法中对重参数化技巧的依赖，天然支持离散变量和复杂变分族
- **欧氏范数近端惩罚**：用 \(\|\phi - \phi_{\text{old}}\|^2\) 替代原始理论中的 \(\text{Cov}(q)\) 加权范数，大幅降低计算复杂度，使方法可扩展到数百万参数
- **线性退火调度**：近端权重 \(\alpha_t = t/T\) 从弱到强线性增长，早期允许大步探索、后期收紧稳定收敛
- **支持高斯与Normalizing Flow变分族**：高斯族支持均值场和低秩协方差；NF族通过可逆变换建模复杂多模态后验
- **大规模实验验证**：首次在ViT-L-32（~307M参数）和ResNet-101上进行BNN推断，覆盖图像分类（Oxford-Pets、Flowers-102、Food-101、Stanford Cars）和时序预测（Koopa模型）

#### 🔬 深入细节

##### 动机与背景

贝叶斯神经网络（BNN）通过对网络权重建模后验分布来量化预测不确定性，但其核心挑战在于后验推断的计算可扩展性。变分推断（VI）是主流近似方法，传统上通过最大化证据下界（ELBO）实现：

$$\mathcal{L}(\phi) = \mathbb{E}_{q_\phi(\theta)}\left[\log p(\mathcal{D}|\theta)\right] - \text{KL}(q_\phi \| p(\theta))$$

然而，ELBO优化存在两个根本问题：
1. **重参数化依赖**：ADVI等方法需要通过重参数化技巧（reparameterization trick）将采样操作转化为确定性变换以计算梯度，这限制了变分族的选择（必须支持重参数化）
2. **KL散度计算**：对于复杂变分族（如Normalizing Flow），KL散度往往没有解析形式

**得分匹配VI**（Score-Matching VI）提供了一种替代路径：不优化ELBO，而是直接最小化变分分布与后验分布在得分函数（对数密度梯度）空间的Fisher散度：

$$\min_\phi \mathbb{E}_{q_\phi(\theta)}\left[\left\|\nabla_\theta \log q_\phi(\theta) - \nabla_\theta \log p(\theta|\mathcal{D})\right\|^2\right]$$

其优势在于：后验得分 \(\nabla_\theta \log p(\theta|\mathcal{D})\) 不含归一化常数（因为对 \(\theta\) 求导时常数消失），且无需重参数化采样。但**致命缺陷**是：该目标要求**精确的全数据集后验得分**，而实际训练中只能获得基于mini-batch的含噪估计。直接使用含噪得分会导致优化目标出现**不可消除的偏差项**，使得最终收敛到错误的分布。

> ⚠️ 注意：含噪得分的偏差来源于Fisher散度中的平方项——噪声的期望平方不等于期望的平方，即 \(\mathbb{E}[\|\epsilon\|^2] \neq \|\mathbb{E}[\epsilon]\|^2\)。这是一个根本性的统计问题，不能通过简单增大batch size解决。

##### 核心机制：近端得分匹配

本文的核心创新是引入**近端算子**（proximal operator）思想来解决含噪得分问题。在第 \(t\) 步迭代中，优化以下目标：

$$\mathcal{L}_t(\phi) = \mathbb{E}_{q_{\phi_{\text{old}}}(\theta)}\left[\left\|\nabla_\theta \log q_\phi(\theta) - s_{\text{noisy}}(\theta)\right\|^2\right] + \frac{\alpha_t}{2}\|\phi - \phi_{\text{old}}\|^2 \quad \text{...(7)}$$

其中：
- \(s_{\text{noisy}}(\theta) = \nabla_\theta \log p(\theta) + \frac{N}{|\mathcal{B}|}\sum_{n \in \mathcal{B}} \nabla_\theta \log p(y_n|x_n, \theta)\) 是基于mini-batch \(\mathcal{B}\) 的含噪后验得分
- \(\phi_{\text{old}}\) 是上一步的变分参数
- \(\alpha_t > 0\) 是近端惩罚权重
- 期望在**旧分布** \(q_{\phi_{\text{old}}}\) 下计算（而非当前分布）

> 💡 关键直觉：近端惩罚项 \(\frac{\alpha_t}{2}\|\phi - \phi_{\text{old}}\|^2\) 起到"锚定"作用——即使当前mini-batch的得分估计有噪声偏差，参数也不会偏离上一步太远。随着迭代推进，噪声的影响被逐步平均掉，类似于随机近端点算法在凸优化中的收敛保证。

**关键设计选择**：

1. **欧氏范数替代协方差范数**：原始理论（Barp et al., 2018）建议使用 \(\|\phi - \phi_{\text{old}}\|_{\text{Cov}(q)}^2\) 作为近端惩罚，但计算协方差矩阵的代价为 \(O(d^2)\)（\(d\) 为参数维度），对大规模BNN不可行。本文证明使用简单的欧氏范数 \(\|\phi - \phi_{\text{old}}\|^2\) 同样有效，将计算复杂度降至 \(O(d)\)。

2. **线性退火调度**：设 \(\alpha_t = t/T\)（\(T\) 为总迭代步数），早期 \(\alpha_t\) 小，允许参数大幅更新以快速探索；后期 \(\alpha_t\) 大，收紧约束以稳定收敛。

3. **旧分布采样**：期望在 \(q_{\phi_{\text{old}}}\) 下计算而非 \(q_\phi\)，这意味着采样操作与当前参数 \(\phi\) 无关，因此**无需重参数化技巧**即可计算梯度。

##### 无偏梯度估计器

对目标函数(7)关于 \(\phi\) 求梯度，得到：

$$\nabla_\phi \mathcal{L}_t = \mathbb{E}_{q_{\phi_{\text{old}}}}\left[2\left(\nabla_\theta \log q_\phi(\theta) - s_{\text{noisy}}(\theta)\right) \cdot \nabla_\phi \nabla_\theta \log q_\phi(\theta)\right] + \alpha_t(\phi - \phi_{\text{old}}) \quad \text{...(9)}$$

> 💡 关键：由于采样分布 \(q_{\phi_{\text{old}}}\) 不依赖于 \(\phi\)，梯度算子可以直接移入期望内部（无需处理分布对参数的依赖），这使得梯度估计是**无偏的**。这是相对于标准得分匹配VI的根本优势。

实际计算中，通过从 \(q_{\phi_{\text{old}}}\) 抽取 \(S\) 个样本进行蒙特卡洛近似：

$$\nabla_\phi \mathcal{L}_t \approx \frac{2}{S}\sum_{s=1}^{S}\left(\nabla_\theta \log q_\phi(\theta^{(s)}) - s_{\text{noisy}}(\theta^{(s)})\right) \cdot \nabla_\phi \nabla_\theta \log q_\phi(\theta^{(s)}) + \alpha_t(\phi - \phi_{\text{old}})$$

##### 算法伪代码

```python
# Algorithm 1: Proximal Score-Matching VI for BNN
# 输入: 数据集 D, 先验 p(θ), 总迭代步数 T, 采样数 S, 学习率 η

初始化变分参数 φ (例如: μ=0, log_σ=0 for Gaussian)
for t = 1 to T:
    φ_old = φ.detach()          # 冻结旧参数
    α_t = t / T                  # 线性退火权重
    
    # 从旧分布采样
    θ_samples = sample(q_{φ_old}, S)   # S个样本, 无需重参数化
    
    # 计算mini-batch含噪后验得分
    B = random_minibatch(D)
    s_noisy = ∇_θ log p(θ) + (N/|B|) * Σ_{n∈B} ∇_θ log p(y_n|x_n, θ)
    
    # 计算得分匹配损失 + 近端惩罚
    score_q = ∇_θ log q_φ(θ_samples)    # 变分得分
    L_match = mean(||score_q - s_noisy||²)
    L_prox = (α_t / 2) * ||φ - φ_old||²
    L_total = L_match + L_prox
    
    # 梯度更新
    φ = φ - η * ∇_φ L_total
```

##### 变分族设计

**高斯变分族**：对于 \(q_\phi(\theta) = \mathcal{N}(\theta; \mu, \Sigma)\)，变分得分有解析形式：

$$\nabla_\theta \log q_\phi(\theta) = -\Sigma^{-1}(\theta - \mu)$$

支持两种协方差参数化：
- **均值场**（Mean-Field）：\(\Sigma = \text{diag}(\sigma_1^2, \ldots, \sigma_d^2)\)，参数量 \(O(d)\)
- **低秩**（Low-Rank）：\(\Sigma = DD^\top + \text{diag}(\sigma^2)\)，其中 \(D \in \mathbb{R}^{d \times r}\)，参数量 \(O(dr)\)

对于均值场情况，\(\nabla_\phi \nabla_\theta \log q_\phi(\theta)\) 的计算非常高效：
- 对 \(\mu\)：\(\nabla_\mu \nabla_\theta \log q = -\text{diag}(1/\sigma^2)\)
- 对 \(\log\sigma\)：\(\nabla_{\log\sigma} \nabla_\theta \log q = \text{diag}(2(\theta-\mu)/\sigma^2)\)

**Normalizing Flow变分族**：通过可逆变换 \(\theta = f_\psi(\epsilon)\)（\(\epsilon \sim \mathcal{N}(0,I)\)）建模复杂后验。变分得分通过链式法则计算：

$$\nabla_\theta \log q(\theta) = -J_f^{-\top}\epsilon - \nabla_\theta \log|\det J_f|$$

其中 \(J_f = \partial f / \partial \epsilon\) 是Jacobian矩阵。本文采用RealNVP架构实现高效的Jacobian计算。

##### 与传统方法的对比

| 特性 | ADVI (ELBO) | GSM (得分匹配) | 本文方法 |
|------|------------|---------------|---------|
| 含噪mini-batch得分 | ✅ (天然支持) | ❌ (产生偏差) | ✅ (近端修正) |
| 需要重参数化 | ✅ | ❌ | ❌ |
| 支持NF变分族 | 需计算KL | ✅ | ✅ |
| 大规模BNN | ✅ | ❌ (需全数据) | ✅ |
| 不确定性估计质量 | 一般 | 理论更优 | 理论更优 |

> 💡 关键优势：本文方法同时继承了得分匹配VI的理论优势（无需重参数化、支持复杂变分族）和ELBO方法的实用性（支持mini-batch训练），是两者的"最佳结合"。

##### 实验结果概览

**大规模图像分类**：在Oxford-Pets、Flowers-102、Food-101、Stanford Cars四个数据集上，使用预训练ViT-L-32和ResNet-101作为骨干网络进行BNN微调：

- **ViT-L-32**（~307M参数）：本文方法在所有数据集上均达到或超过ADVI和GSM的分类精度，同时提供更好的不确定性校准（ECE指标）
- **ResNet-101**：类似趋势，本文方法在精度和校准上均表现优异
- 与确定性微调（MAP估计）相比，BNN方法在校准误差上有显著改善

**时序预测**：在exchange_rate和weather数据集上使用Koopa模型，本文方法在MSE和MAE指标上优于ADVI和GSM基线。

**Normalizing Flow实验**：在合成高斯和高斯混合模型（GMM）目标分布上，NF变分族版本能准确捕获多模态后验结构，显著优于高斯变分族。

**计算效率**：与ADVI相比，本文方法每步计算开销略高（约1.2-1.5倍），但收敛速度相当；与需要全数据集的GSM相比，本文方法在大数据集上具有数量级的速度优势。

#### 🧪 练习题

```yaml
question: "近端得分匹配VI中，为什么从旧分布q_{φ_old}而非当前分布q_φ采样？"
options:
  - "旧分布的采样质量更高"
  - "从旧分布采样使得梯度估计无需重参数化技巧，且保证无偏性"
  - "当前分布尚未收敛，采样不稳定"
  - "为了减少每步的计算开销"
answer: 1
explain: "由于采样分布q_{φ_old}不依赖当前参数φ，梯度算子可直接移入期望内部，无需处理分布对参数的依赖（即无需重参数化），从而得到无偏的梯度估计器。"
```