### AutoAttack

```yaml
id: autoattack
name: AutoAttack
full_name: "自动对抗攻击集成 (Reliable Evaluation of Adversarial Robustness with an Ensemble of Diverse Parameter-free Attacks)"
year: 2020
org: "University of Tübingen"
paper_url: "https://arxiv.org/abs/2003.01690"
venue: "ICML 2020"
category: "trustworthy_learning"
parent: "—"
motivation: "提出无参数自适应攻击集成方法，解决对抗鲁棒性评估中因攻击参数调优不当导致防御方法被高估的问题"
```

#### 📝 一句话总结

AutoAttack 提出了一个完全无参数的对抗攻击集成框架，通过组合自适应步长 PGD（APGD）、尺度不变的 DLR 损失函数、FAB 攻击和 Square Attack 四种互补攻击，实现了对对抗鲁棒性的可靠且自动化评估，在 100+ 篇防御论文的模型上几乎全部降低了其声称的鲁棒精度。

#### 🎯 核心要点

- **APGD（Auto-PGD）**：自适应步长 PGD 攻击，基于检查点机制动态调整步长，无需手动调参
- **DLR 损失函数**：Difference of Logit Ratio，尺度和平移不变的替代损失，解决 CE loss 在接近决策边界时梯度消失问题
- **四攻击集成**：APGD-CE（无目标）→ APGD-T-DLR（有目标）→ FAB-T（有目标最小扰动）→ Square Attack（无梯度黑盒），逐步筛选未攻破样本
- **完全无参数**：所有超参数在所有数据集、模型、范数下固定不变，无需针对特定防御调优
- **有目标攻击优于无目标**：实验证明有目标版本在几乎所有情况下更强
- **大规模评估**：测试 50+ 模型来自 35+ 篇论文，除一篇外全部降低了报告的鲁棒精度，部分降幅超过 10%

#### 🔬 深入细节

![AutoAttack 步长调度与攻击对比](https://ar5iv.labs.arxiv.org/html/2003.01690/assets/x1.png)
*图：APGD 的自适应步长调度机制——在检查点处根据优化进展动态减半步长，相比固定步长策略更有效地探索对抗空间*

##### 算法伪代码

```python
# AutoAttack 整体流程
def AutoAttack(model, x, y, epsilon, norm='Linf'):
    # 初始化：所有测试样本
    remaining = set(range(len(x)))
    
    # 第1步：APGD-CE（无目标，CE损失）
    adv = APGD(model, x[remaining], y[remaining], loss='CE', targeted=False)
    remaining -= successfully_attacked(adv)
    
    # 第2步：APGD-T-DLR（有目标，DLR损失，9个目标类）
    adv = APGD(model, x[remaining], y[remaining], loss='DLR', targeted=True, n_target=9)
    remaining -= successfully_attacked(adv)
    
    # 第3步：FAB-T（有目标，最小扰动攻击）
    adv = FAB(model, x[remaining], y[remaining], targeted=True, n_target=9)
    remaining -= successfully_attacked(adv)
    
    # 第4步：Square Attack（黑盒，5000次查询）
    adv = SquareAttack(model, x[remaining], y[remaining], queries=5000)
    remaining -= successfully_attacked(adv)
    
    robust_accuracy = len(remaining) / len(x)
    return robust_accuracy

# APGD 核心算法
def APGD(model, x, y, loss, targeted, N_iter=100):
    eta = 2 * epsilon  # 初始步长
    x_adv = x + uniform(-epsilon, epsilon)  # 随机初始化
    x_best = x_adv
    f_best = loss(model(x_adv), y)
    
    # 检查点序列: w_0=0, w_1=0.22, w_{j+1}=w_j+max(w_j-w_{j-1}-0.03, 0.06)
    checkpoints = compute_checkpoints(N_iter)
    
    for i in range(1, N_iter):
        # 带动量的梯度步
        grad = compute_gradient(loss, model, x_adv, y)
        z = x_adv + eta * sign(grad)  # 梯度步
        x_adv = x_adv + alpha * (z - x_adv) + (1-alpha) * (x_adv - x_prev)  # 动量, α=0.75
        x_adv = project(x_adv, x, epsilon)  # 投影回 ε-球
        
        # 更新最优
        if loss(model(x_adv), y) > f_best:
            x_best = x_adv; f_best = loss(model(x_adv), y)
        
        # 检查点处判断是否减半步长
        if i in checkpoints:
            condition1 = (improving_steps / interval) < rho  # ρ=0.75
            condition2 = (f_best == f_best_at_last_checkpoint) and (no_halving_since_last)
            if condition1 or condition2:
                eta = eta / 2
                x_adv = x_best  # 从最优点重启
    
    return x_best
```

##### 动机与背景

对抗鲁棒性评估的核心挑战在于：**防御方法的鲁棒精度高度依赖于攻击的强度**。现有评估存在两个系统性问题：

1. **参数敏感性**：标准 PGD 攻击的步长 \(\eta\) 需要针对每个模型仔细调优。步长过大导致振荡，过小导致收敛缓慢，而大多数论文仅使用固定步长（如 \(\eta = \epsilon/4\)）。
2. **损失函数局限性**：交叉熵损失在样本已被正确分类且置信度高时梯度有效，但在接近决策边界时梯度趋于零，导致攻击停滞。
3. **单一攻击不足**：不同攻击方法对不同防御机制的有效性差异巨大，单一攻击无法可靠评估所有防御。

> ⚠️ 注意：论文发现许多声称具有高鲁棒性的防御方法，实际上只是因为评估攻击不够强而被高估，部分方法的实际鲁棒精度比报告值低 30% 以上。

##### 核心机制一：APGD 自适应步长

APGD 的核心创新是**基于优化进展自动调整步长**，无需预设步长衰减策略。

**步长初始化**：设初始步长为 \(\eta^{(0)} = 2\epsilon\)（即扰动预算的两倍），这是一个故意设置的较大值，确保初期能快速探索。

**动量更新**：每步更新融合梯度方向和动量：

$$x^{(k+1)} = \Pi_{S}(x^{(k)} + \eta^{(k)} \cdot \text{sign}(\nabla f(x^{(k)})))$$

实际实现中加入动量项（\(\alpha = 0.75\)）：

$$z^{(k+1)} = \Pi_S\left(x^{(k)} + \eta^{(k)} \cdot \text{sign}(\nabla f(x^{(k)}))\right)$$
$$x^{(k+1)} = \Pi_S\left(x^{(k)} + \alpha(z^{(k+1)} - x^{(k)}) + (1-\alpha)(x^{(k)} - x^{(k-1)})\right)$$

**检查点调度**：在预定义的检查点 \(w_j\) 处评估优化进展。检查点序列为：

$$w_0 = 0, \quad w_1 = 0.22, \quad w_{j+1} = w_j + \max(w_j - w_{j-1} - 0.03, \; 0.06)$$

在每个检查点，若满足以下任一条件则将步长减半：
1. 从上一检查点到当前，损失函数改善的步数占比 < \(\rho = 0.75\)
2. 损失函数最优值未改善，且自上一检查点以来步长未被减半

> 💡 关键：条件 1 检测"步长过大导致振荡"（改善比例低说明很多步在做无用功）；条件 2 检测"步长过小导致停滞"（无改善但也没减过步长，说明需要更精细搜索）。减半后从当前最优点重启，避免在次优区域浪费迭代。

##### 核心机制二：DLR 损失函数

交叉熵损失 \(f_{CE}(x) = -\log p_y(x)\) 的问题在于它依赖于 softmax 输出的绝对尺度。当 logits 被缩放时，梯度方向不变但大小改变，且在决策边界附近梯度消失。

DLR（Difference of Logit Ratio）损失定义为：

$$f_{DLR}(x) = -\frac{z_y - \max_{i \neq y} z_i}{z_{\pi_1} - z_{\pi_3}}$$

其中 \(z_y\) 是真实类别的 logit，\(\pi\) 是 logits 的降序排列，\(z_{\pi_1}\) 是最大 logit，\(z_{\pi_3}\) 是第三大 logit。

**设计直觉**：
- **分子** \(z_y - \max_{i \neq y} z_i\)：衡量正确类别与最强竞争类别的差距（攻击目标是使其为负）
- **分母** \(z_{\pi_1} - z_{\pi_3}\)：提供尺度归一化，使损失对 logits 的线性变换不变

> 💡 关键：DLR 损失是**尺度不变和平移不变**的——对 logits 做 \(z \to az + b\) 变换不改变 DLR 值。这使得攻击对不同模型架构（可能输出不同量级的 logits）具有一致的行为。

**有目标版本**：

$$f_{T-DLR}(x) = -\frac{z_y - z_t}{z_{\pi_1} - z_{\pi_3}}$$

其中 \(t\) 是指定的目标类别。有目标攻击依次尝试按模型预测概率排序的前 9 个非真实类别作为目标。

##### 核心机制三：攻击集成策略

AutoAttack 的四个组件提供**互补的攻击能力**：

| 攻击 | 类型 | 特点 | 作用 |
|------|------|------|------|
| APGD-CE | 白盒/无目标 | 自适应步长 + CE损失 | 快速筛选易攻破样本 |
| APGD-T-DLR | 白盒/有目标 | 自适应步长 + DLR损失 | 攻破梯度遮蔽防御 |
| FAB-T | 白盒/有目标 | 最小化扰动范数 | 找到更紧的对抗样本 |
| Square Attack | 黑盒/无目标 | 随机搜索，无梯度 | 攻破梯度遮蔽/混淆梯度 |

**顺序执行逻辑**：每个攻击只处理前序攻击未攻破的样本，逐步缩小"幸存"样本集。这既节省计算又确保多样性覆盖。

**为什么需要黑盒攻击**：某些防御（如随机化防御、梯度遮蔽）会使白盒攻击的梯度信息不可靠。Square Attack 完全不依赖梯度，仅通过模型输出分数进行随机搜索，能有效绕过这类防御。

##### 实验关键发现

论文在 CIFAR-10、CIFAR-100、MNIST、ImageNet 上测试了 50+ 个防御模型：

- **全面降低鲁棒精度**：除 1 篇论文外，AutoAttack 在所有模型上的攻击效果均优于原论文报告的最强攻击
- **典型案例**：
  - Kim & Wang (2020)：报告鲁棒精度远高于实际，APGD-T-DLR 将其从 ~48% 降至 ~36%（\(l_\infty\), \(\epsilon=8/255\)）
  - Grathwohl et al. (2020) JEM：报告 47.6% 鲁棒精度，AutoAttack 降至 9.92%（降幅 37.7%）
- **有目标攻击一致更强**：在几乎所有模型上，APGD-T-DLR 优于 APGD-DLR（无目标），差距最大达 12.48%

##### 与传统方法的区别

| 特性 | 标准 PGD | AutoAttack |
|------|----------|------------|
| 步长 | 固定，需手动调 | 自适应，自动调整 |
| 损失函数 | CE 或 CW | CE + DLR（互补） |
| 攻击模式 | 通常仅无目标 | 无目标 + 有目标 |
| 梯度依赖 | 完全依赖 | 白盒 + 黑盒互补 |
| 参数调优 | 每个模型需调 | 完全固定 |
| 评估可靠性 | 可能高估防御 | 接近真实下界 |

#### 🧪 练习题

```yaml
question: "AutoAttack 中 APGD 在检查点处减半步长的条件是什么？"
options:
  - "当损失函数值连续下降时"
  - "当改善步数占比低于阈值 ρ，或最优值未改善且步长未被减半过"
  - "每隔固定迭代次数自动减半"
  - "当梯度范数小于预设阈值时"
answer: 1
explain: "APGD 在检查点处检查两个条件：(1) 改善步数比例 < ρ=0.75（说明振荡），或 (2) 最优值未改善且自上次检查点以来未减半（说明停滞）。满足任一条件则减半步长并从最优点重启。"
```