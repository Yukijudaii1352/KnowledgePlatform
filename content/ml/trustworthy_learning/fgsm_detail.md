### FGSM — 快速梯度符号法 (Fast Gradient Sign Method)

```yaml
id: fgsm
name: FGSM
full_name: 快速梯度符号法 (Fast Gradient Sign Method)
year: '2015'
org: Google
paper_url: https://arxiv.org/abs/1412.6572
category: robustness
parent: —
motivation: 首次揭示梯度方向单步扰动即可欺骗模型
```

#### 📝 一句话总结

FGSM 基于"神经网络的线性特性是对抗脆弱性的根本原因"这一洞察，提出沿损失函数梯度符号方向施加单步 \(\epsilon\)-幅度扰动即可高效生成对抗样本，并据此设计了对抗训练正则化方法提升模型鲁棒性。

#### 🎯 核心要点

- **线性假说**：高维空间中，即使每维扰动极小（\(\|\eta\|_\infty < \epsilon\)），线性模型的激活变化可达 \(\epsilon \cdot m \cdot n\)，随维度线性增长
- **FGSM 攻击公式**：\(\eta = \epsilon \cdot \text{sign}(\nabla_x J(\theta, x, y))\)，单步、闭式、仅需一次反向传播
- **对抗训练目标**：\(\tilde{J} = \alpha J(\theta, x, y) + (1-\alpha) J(\theta, x + \epsilon \cdot \text{sign}(\nabla_x J))\)，持续用当前模型生成对抗样本进行数据增强
- **跨模型迁移性**：不同架构、不同训练集的模型对同一对抗样本均易受骗，支持线性假说的普适性
- **实验验证**：MNIST 上 \(\epsilon=0.25\) 使 softmax 分类器错误率达 99.9%；对抗训练将 maxout 网络测试误差从 0.94% 降至 0.78%
- **与非线性防御对比**：通用正则化（Dropout、预训练）无法有效防御对抗样本，RBF 网络等非线性模型族可抵抗但难以训练

#### 🔬 深入细节

![FGSM 对抗样本示例（Panda → Gibbon）](https://ar5iv.labs.arxiv.org/html/1412.6572/assets/panda_577.png)
*图：对 GoogLeNet 施加 FGSM 扰动（ε=0.007），"panda"（57.7% 置信度）被误分类为"gibbon"（99.3% 置信度），扰动对人眼不可见。*

```python
# FGSM 攻击伪代码
import torch

def fgsm_attack(model, x, y, epsilon, loss_fn):
    """
    model: 目标分类器
    x: 原始输入 (requires_grad=True)
    y: 真实标签
    epsilon: 扰动幅度上界
    """
    x.requires_grad = True
    output = model(x)
    loss = loss_fn(output, y)
    loss.backward()
    
    # 核心：取梯度符号方向，乘以 epsilon
    perturbation = epsilon * x.grad.sign()
    x_adv = x + perturbation
    x_adv = torch.clamp(x_adv, 0, 1)  # 保持有效像素范围
    return x_adv
```

##### 动机与背景

Szegedy et al. (2014) 首次发现神经网络存在对抗样本现象——对输入施加人眼不可察觉的微小扰动即可使模型高置信度误分类。早期解释将此归因于深度网络的"极端非线性"和"过拟合"。Goodfellow et al. 在本文中推翻了这一假说，提出了更为简洁有力的**线性假说**：正是神经网络中大量线性组件（ReLU、LSTM、maxout 等分段线性激活）的累积效应导致了对抗脆弱性。

##### 核心机制：线性假说与 FGSM 推导

考虑权重向量 \(\mathbf{w}\) 与对抗输入 \(\tilde{x} = x + \eta\) 的点积：

$$\mathbf{w}^\top \tilde{x} = \mathbf{w}^\top x + \mathbf{w}^\top \eta$$

在 \(\|\eta\|_\infty \leq \epsilon\) 约束下，为最大化 \(\mathbf{w}^\top \eta\)，最优解为 \(\eta = \epsilon \cdot \text{sign}(\mathbf{w})\)。此时激活增量为 \(\epsilon \cdot m \cdot n\)（\(m\) 为权重均值绝对值，\(n\) 为输入维度）。

> 💡 **关键直觉**：扰动的 \(L_\infty\) 范数不随维度增长，但其对输出的影响随维度**线性增长**。这就是为什么在高维图像空间（如 MNIST 的 784 维、ImageNet 的 150528 维）中，极微小的逐像素扰动就能产生巨大的输出偏移。

将此思想推广到非线性神经网络：对损失函数 \(J(\theta, x, y)\) 在当前参数 \(\theta\) 处做一阶泰勒展开，最大化损失的最优 \(L_\infty\) 扰动即为：

$$\eta = \epsilon \cdot \text{sign}\left(\nabla_x J(\theta, x, y)\right)$$

这就是 **Fast Gradient Sign Method (FGSM)**。其计算仅需一次前向传播 + 一次反向传播，复杂度与训练一步相当。

##### 对抗训练：从攻击到防御

基于 FGSM 的高效性，作者提出将对抗样本纳入训练过程。修改后的目标函数为：

$$\tilde{J}(\theta, x, y) = \alpha \cdot J(\theta, x, y) + (1 - \alpha) \cdot J\left(\theta, x + \epsilon \cdot \text{sign}(\nabla_x J(\theta, x, y)), y\right)$$

其中 \(\alpha = 0.5\)。这一方法的关键优势在于：
1. **在线生成**：每步训练时用当前模型参数实时生成对抗样本，避免使用过时的攻击
2. **计算高效**：仅增加一次前向+反向传播的开销
3. **正则化效果**：等价于对模型施加局部 Lipschitz 约束，鼓励损失函数在输入邻域内平滑

> ⚠️ **注意**：作者发现对抗训练需要更大容量的模型（1600 units/layer vs 原始 240），且应使用**对抗验证集误差**而非标准验证集误差进行早停。

##### 与传统方法的区别

| 方面 | 传统解释 | FGSM 论文观点 |
|------|----------|---------------|
| 对抗脆弱性根因 | 非线性 + 过拟合 | 线性特性在高维空间的累积 |
| 攻击方法 | L-BFGS 优化（Szegedy 2014），计算昂贵 | 单步梯度符号，闭式解 |
| 防御策略 | Dropout、权重衰减等通用正则 | 对抗训练（直接在扰动样本上优化） |
| 迁移性解释 | 无 | 不同模型学到相似的线性函数，梯度方向一致 |

##### 实验关键发现

- **攻击效果**：MNIST 上 \(\epsilon=0.25\)，softmax 错误率 99.9%，maxout 错误率 89.4%；CIFAR-10 上 \(\epsilon=0.1\)，卷积 maxout 错误率 87.15%
- **对抗训练收益**：MNIST 测试误差从 0.94% → 0.78%（当时 permutation-invariant MNIST SOTA）
- **鲁棒性提升**：对抗训练后模型在 FGSM 攻击下错误率从 89.4% 降至 17.9%
- **RBF 网络**：天然抵抗 FGSM（因其高度非线性），但在干净数据上精度较低（1.6% vs 0.78%）

#### 🧪 练习题

```yaml
question: "FGSM 论文认为神经网络易受对抗攻击的根本原因是什么？"
options:
  - "模型参数过多导致严重过拟合"
  - "深度网络的高度非线性使输出对微小输入变化极度敏感"
  - "高维空间中线性行为的累积效应使微小扰动产生巨大输出偏移"
  - "训练数据不足导致决策边界不稳定"
answer: 2
explain: "论文核心论点是线性假说：在 n 维空间中，L∞ 约束下的最优扰动通过 sign(w) 使激活增量达 ε·m·n，随维度线性增长，这是对抗脆弱性的根源。"
```