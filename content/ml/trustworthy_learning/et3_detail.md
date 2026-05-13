### ET3

```yaml
id: et3
name: ET3
full_name: 能量引导测试时防御 (Energy-guided Test-Time Defense)
year: '2026'
org: arXiv
paper_url: https://arxiv.org/abs/2603.26984
category: robustness
parent: autoattack
motivation: 无需重训练即可提升VLM对抗鲁棒性
```

#### 📝 一句话总结

ET3 提出了一种基于能量最小化的轻量级测试时变换防御方法，通过在推理阶段对输入图像施加梯度下降来降低分类器的能量函数值，无需任何额外训练即可显著提升 CLIP 零样本分类和大型视觉语言模型（LVLMs）的对抗鲁棒性。

#### 🎯 核心要点

- 提出 Energy-Guided Test-Time Transformation (ET3)：一种 training-free 的测试时防御，通过最小化输入样本的能量函数来增强对抗鲁棒性
- 能量函数定义为分类器输出 logits 的负 LogSumExp，将判别式分类器重新解释为能量模型（EBM）
- 防御机制：在 \(\ell_2\) 球约束内，通过多步梯度下降迭代最小化能量，将对抗样本拉回正确分类区域
- 扩展至 CLIP 零样本分类：使用 ImageNet-21K 代理标签计算图像-文本相似度作为 logits，进而计算能量
- 扩展至 LVLMs（如 LLaVA）：仅对 CLIP 视觉编码器的输入进行能量优化，优化后的图像直接传递给 VLM，无需接触 VLM 本身
- 理论保证：在局部线性假设和能量梯度比率条件下，证明 ET3 变换可使正确类别的 logit 超过错误类别
- 超参数极简：仅需步长 \(\alpha\)、步数 \(T=2\) 和防御半径 \(\epsilon\)，在 14 个数据集上平均提升鲁棒精度 +8 个百分点
- 在 defense-aware 自适应攻击下仍保持显著增益（平均 +7 个百分点）

#### 🔬 深入细节

![ET3 框架示意图](https://arxiv.org/html/2603.26984v2/x2.png)
*图：ET3 防御框架。①对输入图像 x 添加小扰动 z（通过最小化相对于 ImageNet-21K 代理类别的能量优化得到），实现鲁棒零样本分类；②优化后的图像直接传递给 VLM，利用视觉编码器的内部表示提升 VLM 鲁棒性，VLM 本身不参与优化。*

```python
# ET3 防御伪代码
def ET3_defense(x, f_theta, epsilon, alpha, T, labels):
    """
    x: 输入图像 (可能含对抗扰动)
    f_theta: 预训练分类器/CLIP视觉编码器
    epsilon: 防御半径 (ℓ2 约束)
    alpha: 步长
    T: 迭代步数 (默认 T=2)
    labels: 代理标签集 (如 ImageNet-21K)
    """
    x_tilde = x.clone()
    for t in range(T):
        # 计算 logits (分类器输出或 CLIP 图文相似度)
        logits = f_theta(x_tilde, labels)  # shape: [K]
        # 计算能量: E(x) = -log(sum_k exp(logits_k))
        energy = -torch.logsumexp(logits, dim=-1)
        # 梯度下降最小化能量
        grad = torch.autograd.grad(energy, x_tilde)[0]
        x_tilde = x_tilde - alpha * grad
        # 投影回 ℓ2 球 B_epsilon(x)
        delta = x_tilde - x
        delta = delta * min(1, epsilon / delta.norm(2))
        x_tilde = x + delta
    return x_tilde  # 防御后的图像
```

**动机与背景**

大型视觉语言模型（LVLMs）如 LLaVA、Qwen-VL 等虽然在多模态推理上表现出色，但其视觉编码器（通常基于 CLIP）极易受到对抗扰动攻击。传统防御方法主要依赖对抗训练（AT），但 AT 需要昂贵的重训练，且在面对未见过的攻击时泛化能力有限。测试时防御（如对抗净化、随机平滑）虽然无需重训练，但往往依赖额外的生成模型或带来巨大的推理开销。

> 💡 关键：ET3 的核心洞察是——标准 softmax 分类器本身可以被视为能量模型（EBM），其 logits 直接定义了能量景观。对抗攻击将样本推向高能量区域（低置信度），而 ET3 通过梯度下降将样本拉回低能量区域（高置信度），无需任何辅助模型。

**核心机制：能量定义与优化**

给定 K 类分类器 \(f_\theta: \mathbb{R}^d \to \mathbb{R}^K\)，ET3 将能量定义为输出 logits 的负 LogSumExp：

$$E(\mathbf{x}) = -\log\left(\sum_{k=1}^{K} \exp\left(f_\theta(\mathbf{x})_k\right)\right)$$

这一定义来源于 EBM 理论：能量越低，表明模型对该输入的"感知置信度"越高。对抗扰动会增大能量（降低置信度），而 ET3 通过以下迭代将能量最小化：

$$\mathbf{x}^{(t)} = \Pi_{\mathcal{B}_\epsilon(\mathbf{x})}\left(\mathbf{x}^{(t-1)} - \alpha \nabla_{\mathbf{x}} E\left(\mathbf{x}^{(t-1)}\right)\right)$$

其中 \(\Pi_{\mathcal{B}_\epsilon(\mathbf{x})}(\cdot)\) 为到 \(\ell_2\) 球的投影，确保防御扰动不超过预算 \(\epsilon\)。

> ⚠️ 注意：ET3 的防御方向与对抗攻击方向本质相反——攻击是最大化损失（增大能量），防御是最小化能量。但 ET3 并非简单的"反向攻击"，因为它优化的是 LogSumExp（所有类别的综合能量），而非针对特定类别的损失。

**能量梯度的直觉解释**

能量对输入的梯度可以展开为：

$$\nabla_{\mathbf{x}} E(\mathbf{x}) = -\text{softmax}(f_\theta(\mathbf{x}))^\top \nabla_{\mathbf{x}} f_\theta(\mathbf{x}) = -\sum_{k=1}^{K} e_k \mathbf{g}_k$$

其中 \(e_k = \text{softmax}(f_\theta(\mathbf{x}))_k\) 是第 k 类的 softmax 概率，\(\mathbf{g}_k = \nabla_{\mathbf{x}} f_\theta(\mathbf{x})_k\) 是第 k 类 logit 对输入的梯度。这意味着 ET3 的更新方向是所有类别梯度的概率加权和——高置信度类别的梯度贡献更大，自然地引导图像向正确分类方向移动。

**扩展至 CLIP 和 VLMs**

对于 CLIP 零样本分类，logits 定义为图像嵌入与文本嵌入的余弦相似度。ET3 使用 ImageNet-21K 的约 21,000 个类别名称作为代理标签集来计算能量，而非仅使用目标任务的少量类别。这种"宽泛标签集"策略使得能量景观更加平滑，防御效果更好。

对于 LVLMs（如 LLaVA），ET3 仅优化 CLIP 视觉编码器的输入图像，优化后的图像直接传递给完整的 VLM 管线。由于 VLM 不参与梯度计算，ET3 的计算开销极低（仅需 2 步 CLIP 前向/反向传播）。

**理论保证**

论文证明了在以下两个条件下，单步 ET3 变换可保证正确分类：

1. **局部线性**：分类器在防御邻域 \(\mathcal{B}_\epsilon(\mathbf{x})\) 内近似线性
2. **梯度比率条件**：正确类别的能量梯度范数显著大于错误类别，即 \(C\|e_{\hat{y}_t}\mathbf{g}_{\hat{y}_t}\| < \|e_{y_t}\mathbf{g}_{y_t}\|\)

> 💡 关键：对抗训练隐式地诱导了更平滑的能量景观和更大的局部线性半径，这正是 ET3 在鲁棒模型（TeCoA、FARE）上效果更好的理论解释。

**与传统方法的区别**

| 方法 | 需要额外模型 | 需要重训练 | 计算开销 | 可扩展至 VLM |
|------|:---:|:---:|:---:|:---:|
| 对抗训练 (AT) | ✗ | ✓ | 高（训练时） | 困难 |
| 对抗净化 (Diffusion) | ✓ | ✓ | 极高 | 困难 |
| 随机平滑 (RS) | ✗ | ✗ | 高（多次采样） | 可行 |
| TPT/R-TPT | ✗ | 部分 | 中（prompt tuning） | 有限 |
| **ET3** | **✗** | **✗** | **极低（2步梯度）** | **✓** |

ET3 在 14 个零样本分类基准上平均提升鲁棒精度 +8~+11 个百分点，在 LLaVA 图像描述和 VQA 任务上平均提升 +12~+16 个 CIDEr/准确率点（defense-unaware），在自适应攻击下仍保持 +7 个百分点的增益。

#### 🧪 练习题

```yaml
question: "ET3 防御中能量函数 E(x) 的定义是什么？"
options:
  - "交叉熵损失函数的负值"
  - "输出 logits 的负 LogSumExp"
  - "输入图像像素值的 L2 范数"
  - "softmax 概率的熵"
answer: 1
explain: "ET3 将能量定义为 E(x) = -log(Σ_k exp(f_θ(x)_k))，即 logits 的负 LogSumExp，源自将判别式分类器重新解释为能量模型的理论框架。"
```