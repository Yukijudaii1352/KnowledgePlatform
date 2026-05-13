### 深度集成 (Deep Ensembles)

```yaml
id: deep_ensembles
name: Deep Ensembles
full_name: "深度集成 (Deep Ensembles)"
year: 2017
org: DeepMind
paper_url: "https://arxiv.org/abs/1612.01474"
category: foundation
parent: "—"
motivation: "通过训练多个独立神经网络并组合预测，提供简单有效的不确定性估计方法，同时捕获认知不确定性和随机不确定性/方差"
```

#### 📝 一句话总结

Deep Ensembles 提出了一种非贝叶斯的预测不确定性估计方法：通过训练 M 个随机初始化的神经网络（各自输出均值和方差），并将集成预测视为均匀加权的高斯混合模型，结合对抗训练平滑预测分布，在回归和分类任务上实现了优于 MC-Dropout 等近似贝叶斯方法的不确定性估计质量。

#### 🎯 核心要点

- 三步简单配方：(1) 使用 proper scoring rule（NLL）作为训练准则；(2) 对抗训练平滑预测分布；(3) 训练 M 个独立网络组成集成
- 回归网络输出两个值：预测均值 \(\mu_\theta(\mathbf{x})\) 和预测方差 \(\sigma^2_\theta(\mathbf{x})\)，通过最小化负对数似然（NLL）联合优化
- 集成预测为均匀加权高斯混合模型，最终方差同时捕获**随机不确定性**（各模型预测方差的均值）和**认知不确定性**（各模型预测均值的方差）
- 对抗训练使用 FGSM 生成对抗样本，平滑训练数据 ε-邻域内的预测分布
- 随机初始化 + 随机数据打乱即可产生足够多样性，无需 bagging（bootstrap 反而损害性能）
- 推荐默认参数：M=5 个网络，ε=输入范围的 1%
- 在回归、分类、OOD 检测、ImageNet 规模任务上均优于或匹配 MC-Dropout

#### 🔬 深入细节

![Deep Ensembles 方法示意图](https://arxiv.org/html/1612.01474v3/extracted/figures/ensemble_diagram.png)
*图：Deep Ensembles 训练与预测流程示意——M 个独立网络各自输出预测分布，集成后得到混合分布*

##### 算法伪代码

```python
# Deep Ensembles 训练与预测伪代码 (Algorithm 1)
M = 5  # 集成网络数量
epsilon = 0.01 * input_range  # 对抗扰动幅度

# === 训练阶段 ===
for m in range(M):
    theta_m = random_init()  # 随机初始化参数
    for epoch in range(num_epochs):
        for x_batch, y_batch in shuffle(dataset):
            # 计算原始损失
            loss_orig = NLL(theta_m, x_batch, y_batch)
            # 生成对抗样本 (FGSM)
            x_adv = x_batch + epsilon * sign(grad(loss_orig, x_batch))
            # 对抗训练损失
            loss_adv = NLL(theta_m, x_adv, y_batch)
            # 联合优化
            optimize(theta_m, loss_orig + loss_adv)

# === 预测阶段（回归） ===
def predict(x):
    mu_list, sigma2_list = [], []
    for m in range(M):
        mu_m, sigma2_m = network_m(x)  # 每个网络输出均值和方差
        mu_list.append(mu_m)
        sigma2_list.append(sigma2_m)
    # 混合分布的均值和方差
    mu_star = mean(mu_list)
    sigma2_star = mean([s + m**2 for s, m in zip(sigma2_list, mu_list)]) - mu_star**2
    return mu_star, sigma2_star
```

##### 动机与背景

深度学习模型通常只输出点估计，缺乏对预测不确定性的量化。在安全关键应用（自动驾驶、医疗诊断）中，模型需要"知道自己不知道什么"。传统的不确定性估计方法主要依赖贝叶斯神经网络（BNN），但 BNN 面临以下困难：

1. **计算开销大**：精确后验推断不可行，变分推断（VI）需要额外参数和复杂实现
2. **先验选择困难**：权重空间的先验难以解释，对结果影响大
3. **扩展性差**：MCMC 方法难以应用于大规模网络

MC-Dropout 虽然简化了实现，但其理论基础（作为变分推断的近似）存在争议，且性能受限于 dropout 率的选择。

Deep Ensembles 提出了一种**非贝叶斯**替代方案：利用神经网络损失函数的多模态性质，通过不同随机初始化训练多个网络，自然地探索参数空间中的不同模式，从而捕获模型不确定性。

##### 核心机制一：Proper Scoring Rule 训练

论文的第一个关键洞察是：训练准则本身应当鼓励校准的不确定性估计。**Proper scoring rule** 是满足以下性质的评分函数：当且仅当预测分布等于真实分布时，期望得分最大化。

对于回归问题，网络输出预测均值 \(\mu_\theta(\mathbf{x})\) 和方差 \(\sigma^2_\theta(\mathbf{x})\)（通过 softplus 保证正性），训练目标为最小化负对数似然：

$$-\log p_\theta(y_n|\mathbf{x}_n) = \frac{\log \sigma^2_\theta(\mathbf{x})}{2} + \frac{(y - \mu_\theta(\mathbf{x}))^2}{2\sigma^2_\theta(\mathbf{x})} + \text{constant}$$

> 💡 关键：与传统 MSE 不同，NLL 损失让网络**自适应地学习每个输入的预测方差**。当模型对某个预测不确定时，它可以增大 \(\sigma^2\) 来降低惩罚——但 \(\log \sigma^2\) 项又防止方差无限增大。这形成了一个自然的校准机制。

对于分类问题，softmax 交叉熵损失本身就是 proper scoring rule（由 Gibbs 不等式保证）。

##### 核心机制二：对抗训练平滑预测分布

论文的第二个创新是将对抗训练重新解释为**预测分布平滑**的手段。使用 FGSM（Fast Gradient Sign Method）生成对抗样本：

$$\mathbf{x}' = \mathbf{x} + \epsilon \cdot \text{sign}(\nabla_\mathbf{x} \ell(\theta, \mathbf{x}, y))$$

训练时同时最小化原始样本和对抗样本上的损失：

$$\mathcal{L} = \ell(\theta_m, \mathbf{x}, y) + \ell(\theta_m, \mathbf{x}', y)$$

> 💡 关键：对抗训练的直觉是——它迫使网络在训练样本的 ε-邻域内保持平滑的预测分布。理想情况下应沿所有 \(2^D\) 个方向平滑，但计算上不可行；FGSM 选择损失增长最快的方向，是最高效的平滑策略。

##### 核心机制三：集成组合

M 个独立训练的网络组成均匀加权混合模型：

$$p(y|\mathbf{x}) = \frac{1}{M}\sum_{m=1}^{M} p_{\theta_m}(y|\mathbf{x})$$

对于回归任务，每个网络输出高斯分布 \(\mathcal{N}(\mu_{\theta_m}(\mathbf{x}), \sigma^2_{\theta_m}(\mathbf{x}))\)，集成预测近似为单个高斯分布：

$$\mu_*(\mathbf{x}) = \frac{1}{M}\sum_m \mu_{\theta_m}(\mathbf{x})$$

$$\sigma^2_*(\mathbf{x}) = \frac{1}{M}\sum_m \left(\sigma^2_{\theta_m}(\mathbf{x}) + \mu^2_{\theta_m}(\mathbf{x})\right) - \mu^2_*(\mathbf{x})$$

> ⚠️ 注意：最终方差 \(\sigma^2_*\) 可以分解为两部分：
> - **随机不确定性（Aleatoric）**：\(\frac{1}{M}\sum_m \sigma^2_{\theta_m}(\mathbf{x})\)，即各网络预测方差的均值，反映数据本身的噪声
> - **认知不确定性（Epistemic）**：\(\frac{1}{M}\sum_m \mu^2_{\theta_m}(\mathbf{x}) - \mu^2_*(\mathbf{x})\)，即各网络预测均值的方差，反映模型对预测的分歧

这种分解使得 Deep Ensembles 能够区分"数据本身就有噪声"和"模型不确定该怎么预测"两种不同类型的不确定性。

##### 与传统方法的区别

| 特性 | MC-Dropout | 变分推断 (VI) | Deep Ensembles |
|------|-----------|--------------|----------------|
| 理论基础 | 近似变分推断 | 贝叶斯推断 | 非贝叶斯（频率学派） |
| 实现复杂度 | 低 | 高 | 低 |
| 额外参数 | 无 | 2× | M× 模型 |
| 并行性 | 差（顺序采样） | 差 | 优（完全并行） |
| 超参数 | dropout 率 | 先验、变分族 | M, ε |
| 多模态探索 | 单模态附近 | 单模态附近 | 多模态 |

Deep Ensembles 的核心优势在于：(1) 实现极其简单，只需对标准训练流程做最小修改；(2) 天然适合分布式计算；(3) 通过不同随机初始化自然探索损失函数的多个局部最优，比单模态近似方法更好地捕获模型不确定性。

#### 🧪 练习题

```yaml
question: "Deep Ensembles 中集成预测方差公式 σ²*(x) = M⁻¹Σ(σ²_θm + μ²_θm) - μ²* 的物理含义是什么？"
options:
  - "仅捕获数据噪声（随机不确定性）"
  - "仅捕获模型分歧（认知不确定性）"
  - "同时捕获随机不确定性（各网络方差均值）和认知不确定性（各网络均值的方差）"
  - "是各网络方差的简单平均"
answer: 2
explain: "方差公式展开后包含两项：M⁻¹Σσ²_θm 对应随机不确定性（数据噪声），M⁻¹Σμ²_θm - μ²* 对应认知不确定性（模型间预测均值的分歧），两者之和即为总预测不确定性。"
```