### SafeDPO

```yaml
id: safedpo
name: SafeDPO
full_name: 安全直接偏好优化
year: 2025
org: KAIST
paper_url: https://iclr.cc/virtual/2026/oral/23790
category: safety
parent: dpo
motivation: 通过重排偏好对实现安全约束优化，将Safe RLHF的三阶段流程（奖励模型+代价模型+PPO-Lagrangian）简化为仅需有用性偏好和安全标签的单阶段对齐
```

#### 📝 一句话总结

SafeDPO 将安全约束优化问题等价转化为对偏好数据的重排序操作，在标准 DPO 框架上实现**单阶段安全对齐**，无需额外训练奖励模型或代价模型，仅需有用性偏好数据和二值安全标签即可同时优化有用性与安全性。

#### 🎯 核心要点

- **安全约束→无约束等价变换**：定义修正奖励 \(r_c(x,y) = r(x,y)\) 若回答安全，否则 \(r_c(x,y) = -\infty\)，将带约束的安全优化问题（Eq.8）等价转化为标准无约束 RLHF 目标（Eq.11），理论上保证最优策略一致（Proposition 4.2）
- **数据需求大幅简化**：仅需有用性偏好对 \((y_w \succ y_l)\) 加上每个回答的**二值安全标签** \(h \in \{0, 1\}\)，完全不需要有害性偏好数据（Safe RLHF 需要），降低了标注成本和数据收集难度
- **偏好重排序变换 \(\mathcal{T}\)**：当不安全的回答被偏好于安全回答时（\(\tilde{h}_w > \tilde{h}_l\)），交换偏好顺序，确保安全回答始终被优先选择；对重排后的数据直接应用 DPO 损失即为 SafeDPO（Eq.14）
- **增强版 SafeDPO（Enhanced SafeDPO）**：在 DPO 损失的 sigmoid 内部添加偏移量 \(-(\tilde{h}_l - \tilde{h}_w)\Delta\)（\(\Delta \geq 0\)），进一步拉大安全与不安全回答的偏好差距，提升安全性；当 \(\Delta = 0\) 时退化为基础版
- **理论保证完备**：Proposition 4.3 证明变换 \(\mathcal{T}\) 下的 DPO 梯度是修正奖励下真实梯度的无偏估计；Proposition 4.4 证明 Enhanced SafeDPO 的最优解与基础版一致，\(\Delta\) 仅影响优化景观而不改变最优点
- **实验效果显著**：在 PKU-SafeRLHF-30K 数据集上，以 Alpaca-7B 为基座模型，SafeDPO 达到 97%（模型评估）/ 100%（GPT-4 评估）的安全率，同时保持较高的有用性得分，显著优于 Safe RLHF 等多阶段基线

#### 🔬 深入细节

![SafeDPO Pipeline](https://ar5iv.labs.arxiv.org/html/2505.20065/assets/x1.png)

```
算法: SafeDPO / Enhanced SafeDPO
────────────────────────────────────────────
输入: 
  - 有用性偏好数据集 D = {(x, y_w, y_l, h_w, h_l)}
    其中 y_w ≻ y_l 表示有用性偏好, h ∈ {0,1} 为安全标签(1=安全)
  - 参考策略 π_ref
  - 超参数 β > 0, Δ ≥ 0

步骤 1: 计算安全指示量
  对每个样本: h̃_w = 1 - h_w,  h̃_l = 1 - h_l
  (h̃ = 0 表示安全, h̃ = 1 表示不安全)

步骤 2: 偏好重排序 (变换 T)
  对每个样本 (x, y_w, y_l):
    if h̃_w > h̃_l:           // 被偏好的回答不安全, 未被偏好的安全
      交换: (y_w, y_l) ← (y_l, y_w)   // 强制安全回答被偏好
      交换: (h̃_w, h̃_l) ← (h̃_l, h̃_w)

步骤 3: 计算 Enhanced SafeDPO 损失
  对每个样本计算:
    u = β·[log π_θ(y_w|x)/π_ref(y_w|x) - log π_θ(y_l|x)/π_ref(y_l|x)]
    offset = -(h̃_l - h̃_w) · Δ
    L = -log σ(u + offset)
  总损失 = 所有样本的 L 的均值

步骤 4: 梯度下降优化 π_θ
  使用标准优化器最小化总损失

输出: 安全对齐后的策略 π_θ
────────────────────────────────────────────
注: Δ = 0 时退化为基础 SafeDPO (Eq.14)
    offset 仅在 h̃_l ≠ h̃_w 时非零
```

**问题建模与修正奖励函数。** SafeDPO 的核心洞察来自对安全约束优化问题的重新建模。标准的安全 RLHF 目标是一个带约束的优化问题：

$$\max_\pi \mathbb{E}_{x \sim \mathcal{D}_\mathcal{X}} \mathbb{E}_{y \sim \pi(\cdot|x)} [r(x,y)] - \beta \, \text{KL}[\pi \| \pi_{\text{ref}}], \quad \text{s.t.} \quad c(x,y) \leq 0$$

其中 \(r(x,y)\) 是奖励函数，\(c(x,y)\) 是代价函数（正值表示不安全）。Safe RLHF 通过 Lagrangian 方法求解此问题，需要分别训练奖励模型和代价模型，再用 PPO-Lagrangian 优化策略，流程复杂且不稳定。SafeDPO 的关键创新在于定义**修正奖励函数** \(r_c(x,y)\)：当回答安全时 \(r_c = r\)，当回答不安全时 \(r_c = -\infty\)。Proposition 4.2 严格证明了在此修正奖励下的无约束优化问题与原始带约束问题具有相同的最优解集合，从而将安全约束"编码"进了奖励函数本身。

**偏好重排序变换 \(\mathcal{T}\) 与 SafeDPO 损失。** 将修正奖励 \(r_c\) 代入 DPO 的 Bradley-Terry 偏好模型后，可以推导出修正奖励下的偏好概率。关键观察是：如果 \(y_w\) 不安全而 \(y_l\) 安全，则在修正奖励下 \(y_l\) 应当被偏好（因为 \(r_c(x, y_w) = -\infty\)）。这自然导出了变换 \(\mathcal{T}\) 的定义——当 \(\tilde{h}_w > \tilde{h}_l\) 时交换偏好顺序。对变换后的数据集 \(\mathcal{T}(\mathcal{D})\) 应用标准 DPO 损失即得到 SafeDPO 的训练目标：

$$\mathcal{L}_{\text{SafeDPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w', y_l') \sim \mathcal{T}(\mathcal{D})} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w'|x)}{\pi_{\text{ref}}(y_w'|x)} - \beta \log \frac{\pi_\theta(y_l'|x)}{\pi_{\text{ref}}(y_l'|x)} \right) \right]$$

其中 \((y_w', y_l')\) 是经过变换 \(\mathcal{T}\) 重排后的偏好对。Proposition 4.3 进一步证明此损失的梯度是修正奖励下真实 DPO 梯度的无偏估计量，保证了优化的正确性。

**Enhanced SafeDPO 与超参数 \(\Delta\) 的作用。** 基础 SafeDPO 虽然理论上正确，但在有限数据下可能对安全性的强调不够。Enhanced SafeDPO 通过在 sigmoid 函数内部引入偏移量来解决这一问题：

$$\mathcal{L}_{\text{E-SafeDPO}} = -\mathbb{E} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w'|x)}{\pi_{\text{ref}}(y_w'|x)} - \beta \log \frac{\pi_\theta(y_l'|x)}{\pi_{\text{ref}}(y_l'|x)} - (\tilde{h}_l - \tilde{h}_w)\Delta \right) \right]$$

当被拒绝的回答不安全（\(\tilde{h}_l = 1, \tilde{h}_w = 0\)）时，偏移量为 \(-\Delta < 0\)，使得 sigmoid 的输入更小，产生更大的梯度，从而更强烈地惩罚不安全回答。Proposition 4.4 证明了无论 \(\Delta\) 取何值，Enhanced SafeDPO 的全局最优解与基础版完全一致——\(\Delta\) 仅改变损失景观的形状（使安全相关样本的梯度更陡峭），而不改变最优点的位置。实验中 \(\Delta \in \{0, 2, 5, 10, 20\}\) 的测试表明性能对 \(\Delta\) 的选择相当鲁棒，\(\Delta = 10\) 通常是较好的默认值。在 PKU-SafeRLHF-30K 数据集上，SafeDPO 以 Alpaca-7B（基于 LLaMA-2-7B）为基座，在安全率上达到 97-100%，同时有用性得分优于或持平 Safe RLHF、SACPO 等需要多阶段训练的基线方法。

#### 🧪 练习题

```yaml
question: "SafeDPO 的偏好重排序变换 T 在什么条件下会交换偏好对的顺序？"
options:
  A: "当两个回答都不安全时"
  B: "当被偏好的回答不安全而未被偏好的回答安全时"
  C: "当两个回答的有用性得分相近时"
  D: "当被偏好的回答安全而未被偏好的回答不安全时"
answer: B
explanation: "变换 T 的条件是 h̃_w > h̃_l，即被偏好的回答 y_w 不安全（h̃_w=1）而未被偏好的回答 y_l 安全（h̃_l=0）。此时交换顺序使安全回答被偏好，将安全约束编码进偏好数据中。当两个回答安全性相同时不交换。"
```