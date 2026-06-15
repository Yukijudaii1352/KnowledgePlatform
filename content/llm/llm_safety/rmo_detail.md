### RMO: Reward Margin Optimization

```yaml
id: rmo
name: RMO
full_name: 重塑奖励边际 (Reshaping Reward Margin)
year: '2026.01'
org: AAAI
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
category: alignment
parent: safe_rlhf
motivation: 重塑奖励边际提升扩展性
```

#### 📝 一句话总结

RMO 提出 Reward Margin Optimization，把偏好对的“奖励边际分布”作为可优化对象，通过数据去噪、批次重排和边际放大来增强 DPO/SimPO 等偏好优化算法的监督信号。

#### 🎯 核心要点

- 三段式框架：Dual Denoising Filtering → Batch Margin Diversification → Pairwise Margin Amplification
- 用 base model 与 proxy model 的边际变化识别噪声偏好对，删除负边际且训练后继续恶化的样本
- 对仍然边际过小的样本按平滑概率下采样，降低含糊偏好对对训练的干扰
- 构造高方差训练 batch，让每个 batch 同时包含容易、困难和中等边际样本，提升梯度信号多样性
- 在 DPO 损失外加入边际正则项，显式惩罚低于全局中位边际的样本对
- 兼容 DPO、SimPO 等偏好优化目标，不依赖额外奖励模型推理管线
- 论文在 Anthropic HH、UltraFeedback 等偏好数据上报告对 LC win rate 和 raw win rate 的稳定提升

#### 🔬 深入细节

##### 示意图/图源

![RMO 论文 Figure 1/2 图源：高方差与低方差 reward margin batch 对训练曲线和胜率的影响](https://ojs.aaai.org/index.php/AAAI/article/view/40565/44526)
*图源：AAAI 官方 PDF 中 Figure 1/2 展示了同一数据集在不同 batch margin 方差划分下的 loss 和 win-rate 差异。Manifest 中 DOI 不可直接对应到公开页面，正文采用同题 AAAI 官方页面与 PDF 补足：`https://ojs.aaai.org/index.php/AAAI/article/view/40565`。*

##### 算法/流程伪代码

```python
# Reward Margin Optimization (RMO)
def train_rmo(D_train, model, ref_model, proxy_model, batch_size, epochs,
              tau, gamma, lambda_reg, alpha):
    # 1. Dual Denoising Filtering
    kept = []
    for sample in D_train:
        x, y_pos, y_neg = sample
        delta_base = margin(model, x, y_pos, y_neg, ref_model)
        delta_proxy = margin(proxy_model, x, y_pos, y_neg, ref_model)

        # 负边际且训练后更差：认为偏好标注或样本质量不可靠
        if delta_base < 0 and delta_proxy < delta_base:
            continue

        # 小边际样本概率保留，降低含糊偏好对权重
        p_keep = 0.5 * (1 - tanh((abs(delta_proxy) - tau) / gamma))
        if bernoulli(p_keep):
            kept.append((sample, delta_proxy))

    # 2. Batch Margin Diversification
    for _ in range(epochs):
        batches = stratified_batches_by_margin(kept, batch_size)
        batches = local_swap_maximize_intra_batch_variance(batches)

        # 3. Pairwise Margin Amplification
        global_median = median([m for _, m in kept])
        for batch in batches:
            loss = 0
            for (x, y_pos, y_neg), _ in batch:
                delta = logprob(model, x, y_pos) - logprob(model, x, y_neg)
                loss_dpo = dpo_loss(model, ref_model, x, y_pos, y_neg)
                loss_reg = lambda_reg * sigmoid((global_median - delta) / alpha)
                loss += loss_dpo + loss_reg
            model.update(loss / len(batch))
    return model
```

##### 方法解读

RMO 的出发点是：偏好优化并不只取决于“偏好标签是否正确”，还取决于 preferred response 与 rejected response 之间的 reward margin 分布是否有足够清晰、稳定、丰富的监督信号。DPO 把语言模型自身的 log-probability ratio 解释为隐式奖励，但标准 DPO 不会显式管理边际分布；如果大量样本边际接近 0，模型看到的是含糊信号，如果 batch 内边际高度相似，梯度又缺少层次。

论文把偏好对边际定义为：

$$
\Delta r(x; y^+, y^-) = r(x, y^+) - r(x, y^-)
$$

当 \(\Delta r\) 很大且为正时，偏好信号清晰；接近 0 时，preferred 与 rejected 很难区分；为负时，模型评分和人类偏好方向相反。RMO 的第一步 Dual Denoising Filtering 用 base model 与 proxy model 训练前后的边际变化过滤样本：若 \(\delta_i^{base} < 0\) 且 \(\delta_i^{proxy} < \delta_i^{base}\)，说明训练后样本仍朝错误方向恶化，可能是噪声偏好或矛盾标注，直接移除。

第二步 Small Margin Downsampling 针对没有被删除但边际仍很小的样本。论文使用平滑保留概率：

$$
P_{sample}(x_i)=0.5\left[1-\tanh\left(\frac{x_i-\tau}{\gamma}\right)\right],\quad x_i=|\delta_i^{proxy}|
$$

直觉上，小边际样本更可能是“谁更好都说不清”的偏好对，保留太多会稀释训练信号；但完全删除又可能丢掉有价值的困难样本。因此 RMO 采用概率下采样，把数据清理做成软决策。

Batch Margin Diversification 解决的是 batch 级别的信息密度问题。RMO 先按 reward margin 排序，再用交错方式初始化 batch，使每个 batch 都覆盖低、中、高边际样本；随后随机交换不同 batch 中的样本，只接受能提高 batch 内边际方差总和的交换：

$$
\max_{B_1,\ldots,B_n}\sum_{j=1}^{n}\mathrm{Var}_{i\in B_j}[\delta_i]
$$

这相当于避免“全是容易样本”或“全是模糊样本”的 batch。论文 Figure 1/2 显示，高方差 batch 能让 loss 曲线更稳定，并提升 length-controlled win rate 与 raw win rate。

Pairwise Margin Amplification 则直接改训练目标。论文指出在只考虑 \(y^+\) 与 \(y^-\) 两个候选且均匀采样时，reward variance 与边际平方成正比：

$$
\mathrm{Var}_{y\sim Uniform(y^+,y^-)}[r_{RM}(x,y)] = \frac{1}{4}\left(\Delta r(x;y^+,y^-)\right)^2
$$

因此放大 pairwise margin 可以提升模型区分 preferred/rejected 的能力。RMO 在 DPO 外加入：

$$
L_{reg} = \lambda_{reg}\cdot \sigma\left(\frac{\tilde{\delta}-\delta}{\alpha}\right),\quad
L_{total}=L_{DPO}+L_{reg}
$$

其中 \(\tilde{\delta}\) 是全局中位边际。若某个样本的当前边际低于中位数，正则项更大，推动模型扩大该偏好对的区分度。与 PPO-Lagrangian 或显式 reward model 方法不同，RMO 不改变偏好优化主框架，只在数据、batch 和损失三处重塑边际分布，所以可作为 DPO/SimPO 一类方法的增强层。

#### 🧪 练习题

```yaml
question: "RMO 中 Pairwise Margin Amplification 的主要目的是什么？"
options:
  - "减少训练样本数量以提升训练速度"
  - "显式扩大 preferred 与 rejected response 的隐式奖励边际"
  - "用人工标注替换 proxy model 的评分"
  - "把 DPO 改造成 PPO-Lagrangian"
answer: 1
explain: "该模块在 DPO 损失外加入低边际惩罚项，使低于全局中位边际的偏好对获得更强梯度，从而提升模型区分偏好响应和非偏好响应的能力。"
```
