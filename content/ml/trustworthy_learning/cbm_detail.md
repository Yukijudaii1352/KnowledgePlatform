### CBM — 概念瓶颈模型 (Concept Bottleneck Models)

```yaml
id: cbm
name: CBM
full_name: 概念瓶颈模型 (Concept Bottleneck Models)
year: 2020
org: Stanford
paper_url: https://proceedings.mlr.press/v119/koh20a.html
category: foundation
parent: —
motivation: 通过概念瓶颈层实现可解释预测与人机交互干预
```

#### 📝 一句话总结

CBM 提出在神经网络中间层强制对齐人类可理解的高层概念（如"骨刺"、"翅膀颜色"），使模型预测完全通过概念瓶颈层传递，从而实现可解释性和测试时人工干预纠错，在保持任务精度的同时支持人机协作。

#### 🎯 核心要点

- **概念瓶颈架构**：模型分为 \(g: x \to \hat{c}\)（输入→概念）和 \(f: \hat{c} \to \hat{y}\)（概念→目标）两阶段，预测完全通过概念层传递
- **四种训练策略**：Independent（独立训练 f 和 g）、Sequential（先训 g 再训 f）、Joint（联合优化加权损失）、Standard（忽略概念的端到端基线）
- **测试时概念干预**：领域专家可在推理时修正错误概念预测，显著提升任务精度（如 OAI 上干预 2 个概念即可将 RMSE 从 >0.4 降至 ≈0.3）
- **概念精度优于事后探测**：瓶颈模型的概念精度显著高于对标准模型做线性探测（CUB 上 F1: 0.92 vs 0.77）
- **鲁棒性优势**：当概念与虚假相关（如背景）解耦时，瓶颈模型对分布偏移更鲁棒
- **两个应用场景**：膝关节骨关节炎 X 光分级（OAI, k=10 概念）和细粒度鸟类识别（CUB, k=112 概念, 200 类）

#### 🔬 深入细节

![CBM 概念瓶颈模型架构示意图](https://proceedings.mlr.press/v119/koh20a/koh20a-Figure1-1.png)
*图：概念瓶颈模型在两个任务上的示意。上方为骨关节炎 X 光分级（输入→临床概念→KLG 等级），下方为鸟类识别（输入→视觉属性→物种）。*

##### 动机与背景

深度学习模型虽然在医学影像、细粒度识别等任务上表现优异，但其"黑箱"特性严重限制了在高风险场景中的部署。现有可解释性方法（如 TCAV、Network Dissection）主要做**事后分析**——从已训练好的模型中探测概念，但这种方式：
1. 概念精度较低（线性探测难以准确恢复概念）
2. 无法支持干预（即使找到与概念相关的神经元组合，也不清楚如何修改激活来改变单一概念的预测）

CBM 的核心洞察是：如果任务本身就是通过一组标准概念来定义的（如"骨关节炎由骨刺、关节间隙变窄等标志判定"），那么直接将这些概念作为模型的中间表示，既能保证可解释性，又能支持人工干预。

##### 模型形式化

给定输入 \(x \in \mathbb{R}^d\)，目标 \(y \in \mathbb{R}\)，概念向量 \(c \in \mathbb{R}^k\)，CBM 定义为：

$$\hat{y} = f(g(x)), \quad \text{其中} \quad \hat{c} = g(x) \in \mathbb{R}^k$$

模型的预测完全通过概念瓶颈 \(\hat{c}\) 传递。训练时同时优化概念损失和任务损失。

**四种训练变体的损失函数：**

1. **Independent**：分别独立优化
$$\hat{g} = \arg\min_g \sum_{i,j} L_{C_j}(g_j(x^{(i)}); c_j^{(i)}), \quad \hat{f} = \arg\min_f \sum_i L_Y(f(c^{(i)}); y^{(i)})$$

> 💡 关键：Independent 的 \(f\) 在训练时使用**真实概念** \(c\)，但测试时使用**预测概念** \(\hat{c}\)，存在 train-test mismatch。

2. **Sequential**：先训练 \(\hat{g}\)，再用 \(\hat{g}(x)\) 的输出训练 \(\hat{f}\)，消除了 mismatch。

3. **Joint**：联合优化加权目标
$$\hat{f}, \hat{g} = \arg\min_{f,g} \sum_i \left[ L_Y(f(g(x^{(i)})); y^{(i)}) + \lambda \sum_j L_{C_j}(g_j(x^{(i)}); c_j^{(i)}) \right]$$

> ⚠️ 注意：\(\lambda\) 控制概念精度与任务精度的权衡。\(\lambda \to 0\) 退化为 Standard 模型，\(\lambda \to \infty\) 等价于 Sequential。

4. **Standard**：忽略概念，直接端到端优化 \(L_Y\)。

##### 实现方式

将标准深度网络（如 Inception-v3）的某一层调整为 \(k\) 个神经元，使其与概念数量匹配。对于分类任务，\(g(x)\) 输出概念 logits \(\hat{\ell} \in \mathbb{R}^k\)，通过 sigmoid 转为概率：\(P(\hat{c}_j = 1) = \sigma(\hat{\ell}_j)\)。

```python
# CBM 概念瓶颈模型伪代码
class ConceptBottleneckModel:
    def __init__(self, backbone, n_concepts, n_classes):
        self.g = nn.Sequential(backbone, nn.Linear(hidden_dim, n_concepts))  # x → c
        self.f = nn.Linear(n_concepts, n_classes)  # c → y

    def forward(self, x):
        c_hat = self.g(x)           # 概念预测（logits）
        y_hat = self.f(c_hat)       # 任务预测
        return y_hat, c_hat

    def intervene(self, x, concept_idx, true_value):
        """测试时干预：将指定概念替换为真实值"""
        c_hat = self.g(x)
        c_hat[concept_idx] = true_value  # 人工修正
        y_hat = self.f(c_hat)
        return y_hat

# Joint 训练
for x, y, c in dataloader:
    y_hat, c_hat = model(x)
    loss = L_Y(y_hat, y) + lambda_ * sum(L_Cj(c_hat_j, c_j) for j in range(k))
    loss.backward()
    optimizer.step()
```

##### 测试时概念干预

CBM 的核心优势在于支持**测试时干预**（test-time intervention）：领域专家可以检查模型的概念预测，修正错误的概念，观察最终预测如何变化。

干预机制：
- **OAI 任务**：直接将预测概念 \(\hat{c}_j\) 替换为真实值 \(c_j\)（概念为连续有序变量）
- **CUB 任务**：按概念组（如"翅膀颜色"包含 15 个二值属性）进行干预，使用 CDF 匹配将二值概念组转换为单一有序值

实验结果表明：
- OAI 上干预仅 2 个概念（共 10 个），RMSE 从 >0.4 降至 ≈0.3
- CUB 上干预约 8 个概念组（共 28 组），错误率从 ≈0.24 降至 ≈0.05
- Independent 模型在所有概念被替换时表现最好（因为 \(f\) 直接在真实概念上训练）
- 概念精度与干预效果高度相关：概念精度越高，干预收益越大

> 💡 关键：干预使得"单个放射科医生 + CBM"可能超越"单独的放射科医生"或"单独的模型"，实现真正的人机协作。

##### 与事后解释方法的对比

| 特性 | CBM（概念瓶颈） | Post-hoc 探测（如 TCAV） |
|------|----------------|------------------------|
| 概念精度 | 高（OAI: r=0.84, CUB: F1=0.92） | 低（OAI: r=0.72, CUB: F1=0.77） |
| 支持干预 | ✅ 直接修改瓶颈层 | ❌ 无法清晰修改激活 |
| 训练要求 | 需要概念标注 | 仅需训练后的探测数据 |
| 任务精度 | 略有损失（Joint 接近 Standard） | 不影响原模型 |

##### 鲁棒性实验

在构造的 CUB 背景偏移实验中（训练时每个鸟类物种与特定背景绑定，测试时打乱），Standard 模型严重依赖虚假背景特征导致性能崩溃，而 CBM 由于概念（如翅膀颜色）在多个物种间共享、跨越多种背景，因此对背景偏移更鲁棒。

#### 🧪 练习题

```yaml
question: "在 CBM 的 Independent 训练策略中，c→y 模型 f 在训练时使用什么作为输入？"
options:
  - "模型 g 对训练集的概念预测 ĉ = g(x)"
  - "真实概念标注 c"
  - "联合优化得到的概念 logits"
  - "经过 sigmoid 归一化的概念概率"
answer: 1
explain: "Independent 策略中 f 独立训练，直接使用真实概念 c 作为输入，而非 g 的预测。这导致测试时存在 train-test mismatch，因为测试时 f 接收的是 g(x) 的预测而非真实值。"
```