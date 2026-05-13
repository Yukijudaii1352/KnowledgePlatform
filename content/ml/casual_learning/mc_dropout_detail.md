### MC Dropout — 蒙特卡洛 Dropout (Monte Carlo Dropout)

```yaml
id: mc_dropout
name: MC Dropout
full_name: "蒙特卡洛 Dropout (Monte Carlo Dropout)"
year: 2016
org: University of Cambridge
paper_url: "https://arxiv.org/abs/1506.02142"
category: foundation
parent: "—"
motivation: "将 Dropout 解释为贝叶斯近似"
```

#### 📝 一句话总结

MC Dropout 证明了在深度神经网络中使用 Dropout 训练等价于深度高斯过程的近似变分推断，从而只需在测试时保持 Dropout 并执行多次随机前向传播即可获得模型的预测不确定性估计。

#### 🎯 核心要点

- **理论等价性**：证明 Dropout 训练目标函数等价于最小化变分分布 $q(\boldsymbol{\omega})$ 与深度高斯过程后验 $p(\boldsymbol{\omega}|\mathbf{X},\mathbf{Y})$ 之间的 KL 散度
- **变分分布设计**：每层权重矩阵 $\mathbf{W}_i = \mathbf{M}_i \cdot \text{diag}(\mathbf{z}_i)$，其中 $\mathbf{z}_i \sim \text{Bernoulli}(p_i)$ 为随机 Dropout 掩码
- **MC 采样估计不确定性**：测试时执行 $T$ 次带 Dropout 的前向传播，用样本均值和方差近似预测分布的前两阶矩
- **预测方差分解**：总不确定性 = 模型不确定性（认知不确定性）+ 固有噪声（偶然不确定性），其中 $\tau^{-1}$ 为数据噪声精度
- **零额外成本**：无需修改已有 Dropout 网络结构或重新训练，仅需在推理时保持 Dropout 开启
- **广泛适用性**：适用于任意深度网络架构（全连接、CNN 等），支持回归与分类任务的不确定性量化
- **实验验证**：在 CO₂ 浓度回归外推、MNIST 分类、强化学习探索等任务上验证了不确定性估计的有效性

#### 🔬 深入细节

![MC Dropout 不确定性估计示意图](https://ar5iv.labs.arxiv.org/html/1506.02142/assets/figs/exp1/co2_standard_dropout_relu.png)
*图：标准 Dropout（权重平均）在 CO₂ 数据集上的预测。红色为观测数据，蓝色为预测均值±两倍标准差。MC Dropout 能提供更合理的不确定性估计。*

##### 动机与背景

深度学习模型在实际部署中面临一个关键问题：**模型无法表达"我不确定"**。传统神经网络只输出点估计，无法区分高置信度预测和低置信度预测。这在安全关键领域（自动驾驶、医疗诊断）中尤为危险。

贝叶斯方法可以自然地量化不确定性，但传统贝叶斯神经网络（BNN）面临以下困难：
1. 后验分布 $p(\boldsymbol{\omega}|\mathbf{X},\mathbf{Y})$ 无法解析求解
2. 变分推断方法计算代价高，需要额外的变分参数
3. 难以扩展到现代大规模深度网络

Gal & Ghahramani 的核心洞察是：**Dropout 本身就是一种变分推断**，无需额外工作即可获得不确定性。

##### 核心理论推导

**Step 1: 定义变分分布**

对于 $L$ 层神经网络，定义每层权重的变分分布：

$$\mathbf{W}_i = \mathbf{M}_i \cdot \text{diag}([\mathbf{z}_{i,j}]_{j=1}^{K_i}), \quad \mathbf{z}_{i,j} \sim \text{Bernoulli}(p_i)$$

其中 $\mathbf{M}_i$ 是待优化的变分参数（即网络权重），$\mathbf{z}_{i,j}$ 是 Bernoulli 随机变量，$p_i$ 是保留概率。这正是 Dropout 的数学表达。

**Step 2: 变分目标函数**

最小化 KL 散度等价于最大化证据下界（ELBO）：

$$\mathcal{L}_{\text{VI}} = -\int q(\boldsymbol{\omega}) \log p(\mathbf{Y}|\mathbf{X}, \boldsymbol{\omega}) \, d\boldsymbol{\omega} + \text{KL}(q(\boldsymbol{\omega}) \| p(\boldsymbol{\omega}))$$

对第一项用单样本 Monte Carlo 估计，对 KL 项进行近似，得到：

$$\hat{\mathcal{L}}_{\text{VI}} \propto \frac{1}{N} \sum_{n=1}^{N} E(\mathbf{y}_n, \hat{\mathbf{y}}_n) + \sum_{i=1}^{L} \left( \frac{p_i l^2}{2} \|\mathbf{M}_i\|_2^2 + \frac{l^2}{2} \|\mathbf{m}_i\|_2^2 \right)$$

> 💡 **关键洞察**：上式与带 L2 正则化的 Dropout 训练目标函数形式完全相同！其中 $l$ 为先验长度尺度，$E$ 为损失函数（回归用 MSE，分类用交叉熵）。

**Step 3: 预测不确定性的获取**

训练完成后，近似预测分布为：

$$q(\mathbf{y}^*|\mathbf{x}^*) = \int p(\mathbf{y}^*|\mathbf{x}^*, \boldsymbol{\omega}) \, q(\boldsymbol{\omega}) \, d\boldsymbol{\omega}$$

通过 $T$ 次随机前向传播进行矩匹配估计：

**预测均值**：
$$\mathbb{E}_{q(\mathbf{y}^*|\mathbf{x}^*)}[\mathbf{y}^*] \approx \frac{1}{T} \sum_{t=1}^{T} \hat{\mathbf{y}}^*(\mathbf{x}^*, \mathbf{W}_1^t, \ldots, \mathbf{W}_L^t)$$

**预测方差**：
$$\text{Var}_{q(\mathbf{y}^*|\mathbf{x}^*)}(\mathbf{y}^*) \approx \tau^{-1}\mathbf{I}_D + \frac{1}{T}\sum_{t=1}^{T} \hat{\mathbf{y}}^{*T} \hat{\mathbf{y}}^* - \mathbb{E}[\mathbf{y}^*]^T \mathbb{E}[\mathbf{y}^*]$$

其中 $\tau = \frac{l^2 p}{2N\lambda}$，$\lambda$ 为权重衰减系数，$p$ 为 Dropout 保留概率。

> ⚠️ 注意：$\tau^{-1}$ 项对应数据固有噪声（偶然不确定性），后两项之差对应模型不确定性（认知不确定性）。

##### 算法伪代码

```python
# MC Dropout 不确定性估计
def mc_dropout_predict(model, x, T=100, dropout_rate=0.5):
    """
    model: 已用 Dropout 训练好的神经网络
    x: 测试输入
    T: Monte Carlo 采样次数
    """
    model.train()  # 保持 Dropout 激活（关键！）
    
    predictions = []
    for t in range(T):
        # 每次前向传播使用不同的随机 Dropout 掩码
        y_hat = model(x)  # Dropout 随机丢弃不同神经元
        predictions.append(y_hat)
    
    predictions = stack(predictions)  # shape: [T, batch, output_dim]
    
    # 预测均值
    predictive_mean = predictions.mean(dim=0)
    
    # 预测方差（模型不确定性）
    predictive_variance = predictions.var(dim=0)
    
    # 总不确定性 = 模型不确定性 + 数据噪声 (tau^{-1})
    # tau = l^2 * p / (2 * N * weight_decay)
    
    return predictive_mean, predictive_variance
```

##### 与传统方法的对比

| 方法 | 额外参数 | 训练成本 | 推理成本 | 适用架构 |
|------|----------|----------|----------|----------|
| 精确贝叶斯推断 | 无 | 不可行 | 不可行 | 小型网络 |
| 变分贝叶斯 (Bayes by Backprop) | 2× | 2× | 1× | 全连接 |
| 深度集成 (Deep Ensembles) | M× | M× | M× | 任意 |
| **MC Dropout** | **0** | **0** | **T×前向** | **任意** |

MC Dropout 的核心优势在于：
1. **零额外训练成本**：利用已有 Dropout 训练即可
2. **零额外参数**：不需要学习额外的方差参数
3. **实现极简**：只需在推理时保持 `model.train()` 模式
4. **理论保证**：有严格的变分推断理论支撑

##### 实验验证

论文在三个场景验证了 MC Dropout 的有效性：

1. **回归外推**（CO₂ 浓度预测）：MC Dropout 在数据稀疏区域给出更大的不确定性，而标准 Dropout 权重平均无法表达不确定性
2. **分类任务**（MNIST）：对旋转/模糊的数字，MC Dropout 输出高不确定性，可用于拒绝不可靠预测
3. **强化学习探索**：利用不确定性指导 Thompson 采样，实现更高效的探索-利用平衡

在回归基准测试中，MC Dropout 在预测对数似然和 RMSE 指标上均达到或超过当时的最优方法。

#### 🧪 练习题

```yaml
question: "MC Dropout 在测试时获取不确定性估计的关键操作是什么？"
options:
  - "关闭 Dropout 并使用权重缩放"
  - "保持 Dropout 开启，执行多次随机前向传播并计算预测方差"
  - "在每层添加额外的方差输出头"
  - "使用贝叶斯优化调整 Dropout 概率"
answer: 1
explain: "MC Dropout 的核心是在测试时保持 Dropout 激活，通过 T 次随机前向传播采样近似预测分布，用样本方差估计模型不确定性。这与标准做法（测试时关闭 Dropout）恰好相反。"
```