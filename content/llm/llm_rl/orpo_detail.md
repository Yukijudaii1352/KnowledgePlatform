
### ORPO: Odds Ratio Preference Optimization

#### 📝 一句话总结

ORPO 提出了一种**无参考模型（reference-free）的单阶段偏好对齐方法**，将监督微调（SFT）和偏好对齐统一到单个训练阶段中，通过引入基于**胜率比（odds ratio）**的惩罚项 $\mathcal{L}_{\text{OR}}$ 直接区分 chosen 和 rejected 响应，消除了 RLHF/DPO 对参考模型和额外偏好对齐阶段的需求，在 $\leq 7$B 规模模型上以更少的计算开销超越了 SFT、RLHF 和 DPO。

#### 🎯 核心要点

- **单阶段训练**：将监督微调（SFT）和偏好对齐合并为一个训练过程，无需 SFT warm-up + 独立的偏好对齐阶段
- **无参考模型**：不需要 reference model（对比 DPO 需要冻结的参考策略），减少 50% 的前向传播开销（每次 batch 只需一次前向）
- **Odds Ratio 惩罚**：使用 $\text{odds}_\theta(y|x) = \frac{P_\theta(y|x)}{1 - P_\theta(y|x)}$ 而非概率比（probability ratio）来计算偏好损失，胜率比对不偏好响应的区分更温和，避免过度抑制
- **核心发现**：SFT 阶段 chosen 和 rejected 的 log probability 会**同步上升**，因此仅靠 SFT 的 NLL loss 无法区分偏好，需要额外信号
- **统一损失函数**：$\mathcal{L}_{\text{ORPO}} = \mathcal{L}_{\text{SFT}} + \lambda \cdot \mathcal{L}_{\text{OR}}$，其中 $\mathcal{L}_{\text{OR}} = -\log\sigma\left(\log\frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}\right)$
- **实验验证**：OPT (125M/350M/1.3B)、Phi-2 (2.7B)、Llama-2 (7B)、Mistral (7B) 上训练，在 AlpacaEval 2.0 上 Mistral-ORPO-$\beta$ 达 12.20%，MT-Bench 达 7.32，超越更大规模的 Zephyr-$\beta$ (7B)

#### 🔬 深入细节

##### 1. 动机：SFT 阶段的困境

传统偏好对齐（RLHF → DPO）的两阶段流程：
1. **SFT**：用 chosen 响应的 NLL loss 微调模型，适应指令格式
2. **偏好对齐**：用 chosen vs rejected 偏好对训练奖励信号

ORPO 的作者通过实验发现：在 SFT 阶段，**chosen 和 rejected 响应的 log probability 会同时上升**（Figure 3），这意味着 SFT 虽然提升了模型在目标领域的生成能力，但并不能区分优劣响应。因此需要额外的偏好对齐阶段。

![Figure 2: 对齐方法对比](https://arxiv.org/html/2403.07691v2/figures/fig2.png)
*图：ORPO 与传统对齐方法的对比。ORPO 将 SFT 和偏好对齐统一为单阶段训练，无需参考模型。*

##### 2. 核心机制：Odds Ratio

ORPO 的核心创新在于用 **odds ratio（胜率比）**替代 probability ratio（概率比）来衡量 chosen vs rejected 响应的差异：

$$\text{odds}_\theta(y|x) = \frac{P_\theta(y|x)}{1 - P_\theta(y|x)}$$

$$\text{OR}_\theta(y_w, y_l) = \frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}$$

为什么用 odds ratio 而非 probability ratio（如 DPO 所用）？原因有二：

- **分布更宽**：在相同输入概率对 $(X_1, X_2)$ 下，$\log\text{OR}(X_2|X_1)$ 的分布范围远宽于 $\log\text{PR}(X_2|X_1)$（Figure 6）。当 loss 通过 log-sigmoid 函数最小化时，probability ratio 需要更极端的区分度才能降低 loss，这会**过度抑制** disfavored 响应的 logits
- **温和区分**：在 SFT + 偏好对齐联合训练的场景下，模型尚未适应目标领域，odds ratio 的温和区分避免了过早、过度地惩罚 rejected 响应中的有效 token

![Figure 6: log PR vs log OR 分布](https://arxiv.org/html/2403.07691v2/figures/fig6.png)
*图：log Probability Ratio（含不同β）和 log Odds Ratio 的采样分布对比。log OR 分布范围更宽，区分更温和。*

##### 3. 损失函数

ORPO 的完整训练目标：

$$\mathcal{L}_{\text{ORPO}} = \mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}}\left[\mathcal{L}_{\text{SFT}}(x, y_w) + \lambda \cdot \mathcal{L}_{\text{OR}}(x, y_w, y_l)\right]$$

其中：
- **SFT Loss**：仅有 chosen 响应的标准交叉熵
  $$\mathcal{L}_{\text{SFT}} = -\frac{1}{|y_w|}\sum_{t=1}^{|y_w|} \log P_\theta(y_w^{(t)} | x, y_w^{(<t)})$$

- **OR Loss**（核心创新）：基于 log odds ratio 的偏好损失
  $$\mathcal{L}_{\text{OR}} = -\log\sigma\left(\log\frac{\text{odds}_\theta(y_w|x)}{\text{odds}_\theta(y_l|x)}\right)$$
  其中 $\sigma$ 是 sigmoid 函数。最小化此 loss 等价于**最大化 chosen 响应对 rejected 响应的胜率比**。

- **$\lambda$**：平衡 SFT 和偏好对齐的权重，通常设为 $\lambda = 0.1$

##### 4. 训练流程伪代码

```python
# ORPO 训练循环
for batch in dataloader:
    x, y_w, y_l = batch  # 输入、chosen 响应、rejected 响应
    
    # 单次前向传播（无 reference model）
    logits_w = model(x, y_w)  # chosen 响应的 logits
    logits_l = model(x, y_l)  # rejected 响应的 logits（可选共享编码）
    
    # 1. SFT Loss：仅 chosen 序列的 NLL
    loss_sft = cross_entropy(logits_w, y_w)  # 逐 token 平均
    
    # 2. OR Loss：odds ratio 偏好损失
    logp_w = log_softmax(logits_w).gather(y_w).sum() / len(y_w)  # 序列级 log prob
    logp_l = log_softmax(logits_l).gather(y_l).sum() / len(y_l)
    
    odds_w = logp_w - log(1 - exp(logp_w) + eps)  # log odds
    odds_l = logp_l - log(1 - exp(logp_l) + eps)
    
    loss_or = -log_sigmoid(odds_w - odds_l)  # log sigmoid(log OR)
    
    # 3. 总损失
    loss = loss_sft + lambda * loss_or
    
    loss.backward()
    optimizer.step()
```

##### 5. 与传统方法的对比

| 方法 | 阶段数 | 参考模型 | 损失函数组成 | 前向传播次数/batch |
|------|--------|----------|-------------|-------------------|
| SFT | 1 | — | $\mathcal{L}_{\text{NLL}}$ | 1 |
| RLHF (PPO) | 2–3 | $\pi_{\text{ref}}$ | $\mathcal{L}_{\text{NLL}} + \mathcal{L}_{\text{PPO}}$ | 2 (actor + ref) |
| DPO | 2 | $\pi_{\text{ref}}$ | $\mathcal{L}_{\text{DPO}}$ | 2 (policy + ref) |
| **ORPO** | **1** | **—** | $\mathcal{L}_{\text{SFT}} + \lambda\mathcal{L}_{\text{OR}}$ | **1** |

ORPO 的核心优势：
- 消除参考模型，内存占用减半
- 单阶段训练，无需 SFT checkpoint 保存/加载
- odds ratio 在 SFT 阶段提供适度的偏好信号，避免 probability ratio 的过度惩罚

##### 6. 关键实验结果

- **AlpacaEval 2.0**：Mistral-ORPO-$\alpha$ (7B) 达 11.33%，Mistral-ORPO-$\beta$ (7B) 达 **12.20%**，超越 Zephyr-$\beta$ (7B, 10.99%) 和 Llama-2-Chat (70B)
- **MT-Bench**：Mistral-ORPO 系列达 7.23–7.32，与 GPT-3.5-turbo (7.94) 差距缩小
- **跨尺度一致**：ORPO 在 OPT 125M → 1.3B 和 Phi-2 2.7B 上均一致优于 SFT 和 DPO（Table 2）
- **Reward 分布**：ORPO 的奖励分布比 RLHF（SFT+PPO）更集中且向右偏移（Figure 5），表明更稳定的偏好优化

#### 🧪 练习题

1. **Odds Ratio vs Probability Ratio**：假设 $P_\theta(y_w|x)=0.6$ 和 $P_\theta(y_l|x)=0.4$，分别计算 probability ratio 和 odds ratio，并讨论当 $P_\theta(y_l|x) \to 0$ 时两者的行为差异。

2. **Loss 梯度推导**：推导 $\mathcal{L}_{\text{OR}}$ 对 $\log P_\theta(y_w|x)$ 和 $\log P_\theta(y_l|x)$ 的梯度，解释 ORPO 如何同时提升 chosen 概率并抑制 rejected 概率。

3. **为什么不能只用 SFT？** 基于 Figure 3 的发现（chosen 和 rejected log prob 在 SFT 中同步上升），论证为什么仅靠 SFT 无法完成偏好对齐。

4. **$\lambda$ 的敏感性**：如果 $\lambda$ 设置过大（如 $\lambda=1.0$），会如何影响模型在 SFT 目标上的表现？试从 odds ratio 的分布特性（Figure 6）分析。

5. **扩展实验设计**：ORPO 目前仅在 $\leq 7$B 模型上验证。设计一个实验方案来评估 ORPO 在 70B+ 规模模型上的有效性，包括预期的挑战和评估指标。