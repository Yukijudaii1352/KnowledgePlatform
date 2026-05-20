### KTO: 前景理论优化 (Kahneman-Tversky Optimization)

```yaml
id: kto
name: KTO
full_name: 前景理论优化 (Kahneman-Tversky Optimization)
year: 2024.02
org: Stanford
paper_url: https://arxiv.org/abs/2402.01306
category: preference
parent: dpo
motivation: 仅需二元信号无需成对数据
```

#### 📝 一句话总结

KTO 将 Kahneman-Tversky 前景理论中的**价值函数**引入 LLM 对齐，定义了**人类感知损失函数 (HALOs)** 的理论框架，并提出仅需 **desirable/undesirable 二元信号**的 KTO 损失函数——直接最大化输出的**前景效用**而非偏好对数似然，从而摆脱对昂贵成对偏好数据的依赖。

#### 🎯 核心要点

- 提出 **HALOs (Human-Aware Loss Functions)** 的概念框架：对齐损失函数需满足前景理论中人类感知偏差（损失厌恶、边际递减敏感性）的特性和概率权重
- 定义 HALO 的两个充分条件：(1) 损失函数必须为**人类值函数**的非线性变换；(2) 概率需经**权重函数**扭曲
- 基于 Kahneman-Tversky 的**累积前景理论**推导出 KTO 损失函数：对各输出采用非对称效用评分，desirable 输出用增益区 (convex)，undesirable 输出用损失区 (concave, loss-averse)
- KTO **不需要偏好对**，仅需知道给定输入下某个输出是 desirable 还是 undesirable（二元信号）
- KTO 可直接处理二分类标注数据，极大降低数据采集成本（用户点赞/点踩、审核通过/驳回等）
- 在 1B~30B 参数量级匹配或超越 DPO 性能，即使将偏好数据拆成 2n 个二元样本后仍优于 DPO
- 支持**极端数据不平衡**：即使 desirable 样本仅剩 10%，KTO 仍能保持性能
- 当预训练模型足够好时，KTO 可**跳过 SFT** 直接对齐，而 DPO 无 SFT 则显著退化

#### 🔬 深入细节

##### 示意图

![KTO vs 传统方法数据需求对比](https://ar5iv.labs.arxiv.org/html/2402.01306/assets/images/fig1.png)
*图：KTO 与传统 RLHF/DPO 的数据需求对比。传统方法需要昂贵的成对偏好数据 (x, y_w, y_l)，而 KTO 仅需知道每个输出是"好"还是"坏"的二元信号，数据来源更丰富、成本更低。*

##### 算法伪代码

```python
# KTO 损失函数（简化版）
def kto_loss(pi_theta, pi_ref, x, y, label, lambda_D, lambda_U, beta):
    """
    x: 输入提示
    y: 模型生成的输出
    label: 1 表示 desirable (好), 0 表示 undesirable (坏)
    """
    # 对数概率比
    log_ratio = pi_theta.log_prob(y|x) - pi_ref.log_prob(y|x)
    r = beta * log_ratio  # 隐式奖励
    
    if label == 1:  # Desirable 输出 → 增益区
        # 前景理论值函数 v(x) = x^α (x ≥ 0), convex gain
        v = r ** alpha  
        # KTO 目标: 最大化期望效用 - KL 惩罚
        loss = -lambda_D * sigma_gain(v - z_ref)  # z_ref 为参考点
    else:  # Undesirable 输出 → 损失区
        # v(x) = -λ * |x|^α (x < 0), concave + 损失厌恶 (λ > 1)
        v = -lambda_loss * (-r) ** alpha
        loss = -lambda_U * sigma_loss(z_ref - v)
    
    return loss
```

##### 方法详解

**1. 动机：偏好数据的获取瓶颈**

传统对齐方法（RLHF、DPO）的核心痛点在于**成对偏好数据**的获取成本极高。每个训练样本需要标注员对同一 prompt 的两个输出进行偏好比较 (x, y_w, y_l)。这种数据不仅昂贵、缓慢，而且在生产环境中难以规模化。相比之下，**二元信号**（如点赞/点踩、通过/拒绝）在真实世界中无处不在、便宜且快速。

KTO 的核心洞察是：**如果损失函数本身具备正确的人类感知偏差（前景理论），那么二元信号就足够了，不需要显式的成对偏好比较。**

**2. HALO 理论框架**

作者首先定义了一类称为 HALO 的损失函数。前景理论（Kahneman & Tversky, 1979/1992）揭示了人类决策的两大特征：

- **价值函数**：相对于参考点，人类对损失比收益更敏感（损失厌恶，λ ≈ 2.25），且对收益呈 concave（风险规避），对损失呈 convex（风险寻求）
- **概率权重函数**：人类倾向于高估小概率事件、低估中大概率事件

HALO 的**充分条件**：
- 损失函数可表达为 $$\ell(r) = -u(r)$$ 形式，其中 $$u(\cdot)$$ 须为满足前景理论特性的**人类效用函数**
- 概率通过逆 S 形权重函数 $$w(p)$$ 进行扭曲

作者证明 DPO、PPO、SLiC 等流行方法都隐式满足 HALO 条件，这解释了它们成功的原因——**和使用的数据无关，而是损失函数本身捕捉了人类偏好结构**。

> 💡 **关键洞察**：既然 HALOs 的有效性来自其函数形式而非数据形式，完全可以用更弱的监督信号（二元标签）来驱动它。

**3. KTO 损失函数推导**

KTO 直接基于 **Tversky & Kahneman (1992)** 的累积前景理论。传统 RLHF/DPO 最大化 **Bradley-Terry 偏好模型中隐含的对数似然**，而 KTO 最大化**每个独立输出的前景理论效用**。

具体地，对于输入 $$x$$ 和输出 $$y$$，定义隐式奖励：
\[
r_{\theta}(x, y) = \beta \log \frac{\pi_{\theta}(y|x)}{\pi_{\text{ref}}(y|x)}
\]

前景理论值函数（参数化版本）：
\[
v(r) = \begin{cases}
r^{\alpha} & r \geq 0 \quad \text{(收益区)}\\
-\lambda |r|^{\alpha} & r < 0 \quad \text{(损失区，λ>1 引入损失厌恶)}
\end{cases}
\]

KTO 损失：
\[
\mathcal{L}_{\text{KTO}} = \mathbb{E}_{(x,y_{\text{good}})\sim\mathcal{D}}\left[
\lambda_D \cdot \sigma\left(\beta \log\frac{\pi_\theta(y_{\text{good}}|x)}{\pi_{\text{ref}}(y_{\text{good}}|x)} - z_0\right)
\right]
\]
\[
+ \mathbb{E}_{(x,y_{\text{bad}})\sim\mathcal{D}}\left[
\lambda_U \cdot \sigma\left(z_0 - \beta \log\frac{\pi_\theta(y_{\text{bad}}|x)}{\pi_{\text{ref}}(y_{\text{bad}}|x)}\right)
\right]
\]

其中 $$z_0$$ 是学习到的参考点，$$\lambda_D, \lambda_U$$ 平衡两类样本的权重。

> ⚠️ **与 DPO 的关键区别**：DPO 的损失要求同一 prompt 的 **一对** 输出同时出现在一个 batch 中进行对比。而 KTO 每个样本**独立计算效用**，batch 内不需要对 prompt 做配对约束——这使得数据组织、shuffling、分布式训练都更灵活。

**4. 训练与推理流程**

- **数据准备**：收集 (x, y, label) 三元组，label ∈ {desirable, undesirable}。数据来源：任何带有二元反馈的信号源（点赞/点踩、人工审批、规则筛选等）
- **训练**：与 DPO 相同的前向传播结构（同时计算 π_θ 和 π_ref 的 log prob），但 KTO 每步迭代在 batch 内独立计算各样本效用后聚合
- **推理**：仅使用 π_θ（Policy Model），与标准 LLM 解码完全一致
- **超参数**：β（温度系数）、λ_D / λ_U（desirable/undesirable 样本权重）、α（值函数曲率参数）、λ（损失厌恶系数），论文推荐 λ_D = λ_U = 1.0 作为默认

**5. 实验结果亮点**

- 在 1B/7B/13B/30B 四个规模上，KTO 匹配或超越 DPO（使用相同数据源时）
- **反直觉发现**：将 DPO 的 n 对偏好数据拆成 2n 个独立二元样本喂给 KTO，效果反而更好——说明"较弱监督 + 更强归纳偏置 > 较强监督 + 较弱归纳偏置"
- 极端数据不平衡下 KTO 鲁棒：desirable 样本仅剩 10% 时仍保持性能
- 可跳过 SFT 直接训练（预训练模型足够好时），而 DPO 无 SFT 效果显著下降

#### 🧪 练习题

```yaml
question: "KTO 损失函数相比 DPO 最核心的优势是什么？"
options:
  - "使用了更复杂的 Transformer 架构"
  - "仅需 binary (desirable/undesirable) 标签，无需成对偏好数据"
  - "需要更大的训练 batch size"
  - "引入了对抗训练机制"
answer: 1
explain: "KTO 基于前景理论值函数直接将二元信号转化为效用最大化问题，摆脱了 DPO 对成对偏好数据 (y_w, y_l) 的依赖，大幅降低数据采集成本。"
```