### WDPO · Wasserstein直接偏好优化

```yaml
id: wdpo
name: WDPO
full_name: Wasserstein直接偏好优化 (Wasserstein DPO)
year: "2025.02"
org: Texas A&M / Tencent AI Lab / Google DeepMind
paper_url: https://arxiv.org/abs/2502.01930
category: frontier_2026
parent: dpo
motivation: Wasserstein鲁棒优化应对偏好分布漂移
```

#### 📝 一句话总结
WDPO 将标准 DPO 的经验风险最小化改写为 Wasserstein 不确定集上的最坏情况优化，使模型不再只对训练偏好分布拟合，而是在用户偏好发生分布漂移时仍保持较强的对齐鲁棒性。

#### 🎯 核心要点
- 针对 DPO 在真实部署中容易遭遇的 preference distribution shift，显式建模训练分布附近的一整个偏好分布集合
- 基于 distributionally robust optimization，把 DPO 目标从“最小化经验平均损失”改为“最小化 Wasserstein 球内的最坏情况损失”
- 给出两类鲁棒偏好优化方法：WDPO 和 KLDPO，其中 WDPO 使用 Wasserstein 不确定集
- 推导出 WDPO 的可训练近似：标准 DPO 损失加上一个输入梯度范数正则项，避免直接求解难优化的 min-max 问题
- 给出理论分析，包括 WDPO / KLDPO 的有限样本学习保证和参数收敛性质
- 在 Emotion Alignment、ArmoRM 多目标对齐和 OpenLLM Leaderboard 场景下，相比 vanilla DPO 在偏好漂移时更稳健

#### 🔬 深入细节

##### 1. 论文核心示意图

![WDPO 偏好分布漂移示意图](https://arxiv.org/html/2502.01930v4/x1.png)

*图：论文 Figure 1。训练阶段主要观察到偏好模型 P1，于是普通 DPO 会偏向 Completion 1；但测试用户偏好更接近 P2 时，Completion 2 才是更优答案。WDPO 的目标是在一整个不确定集上做最坏情况优化，而不是只拟合单一训练分布。*

##### 2. 核心训练伪代码

```python
# WDPO 的可训练近似版本
# z = (prompt, chosen, rejected)

for batch in dataloader:
    # 1. 计算标准 DPO 损失
    loss_dpo = dpo_loss(pi_theta, pi_ref, batch)

    # 2. 计算对样本扰动敏感度的梯度正则
    grad_norm_sq = 0.0
    for z in batch:
        l_z = single_pair_dpo_loss(pi_theta, pi_ref, z)
        grad_z = grad_wrt_sample_representation(l_z, z)
        grad_norm_sq += norm(grad_z, 2) ** 2
    reg = rho_o * sqrt(grad_norm_sq / len(batch))

    # 3. 构造近似 WDPO 损失
    loss_wdpo = loss_dpo + reg

    optimizer.step(loss_wdpo)
```

##### 3. 动机：DPO 为什么会在真实用户上失效

WDPO 解决的问题不是“偏好标签噪声”本身，而是更系统性的 **偏好分布漂移**。标准 DPO 假设训练集中 observed preference pairs 就能代表部署阶段的真实用户偏好，因此它最小化的是训练分布上的平均损失。但论文指出，这个假设在现实里通常不成立：不同地区、群体、文化背景、语言表达和时间阶段的用户，对“哪个回答更好”的判断本来就可能不同。

这意味着，普通 DPO 其实在做一种脆弱的经验拟合。它会把训练数据里占多数的偏好模式学得很强，却未必能覆盖测试环境下出现的新偏好结构。论文 Figure 1 的例子非常直观：如果训练人群偏向偏好模型 P1，那么非鲁棒 DPO 会系统性偏向 Completion 1；一旦部署到更偏向 P2 的用户群体，模型就会显著失配。

因此，WDPO 的核心思想不是继续问“训练数据上哪个回答更优”，而是问：**如果真实偏好分布在训练分布附近发生偏移，当前策略还能不能维持对齐？** 这就把问题从经验风险最小化，推进到了 distributionally robust optimization 的框架。

##### 4. 核心机制：在 Wasserstein 不确定集上做最坏情况 DPO

论文先定义一个围绕名义分布 \( \mathsf{P}^{o} \) 的不确定集：

$$
\mathcal{P}(\rho;\mathsf{P}^{o})
\coloneqq
\left\{
\mathsf{P}\in\mathcal{P}(\mathcal{Z})
\;:\;
D(\mathsf{P},\mathsf{P}^{o}) \le \rho
\right\},
$$

其中 \(D(\cdot,\cdot)\) 可以取 Wasserstein 距离或 KL 散度；对 WDPO 而言，这里使用的是 Wasserstein 球。与普通 DPO 直接优化训练分布上的期望损失不同，WDPO 优化的是：

$$
\mathcal{L}_{\mathrm{WDPO}}(\theta)

=
\sup_{\mathsf{P}\in \mathcal{P}(\rho;\mathsf{P}^{o})}
\mathbb{E}_{z\sim\mathsf{P}}
\bigl[l(z;\theta)\bigr].
$$

这相当于引入一个“对手分布”：它会在距离训练分布不太远的范围内，专门寻找那些最容易让当前策略出错的偏好重加权方式。模型训练的目标，则是把这些最坏情况也一起压下去。

从直觉上看，普通 DPO 优化的是“平均正确”，而 WDPO 优化的是“即使用户偏好轻微换了分布，也不要立刻崩”。这使它天然更适合部署环境，因为它不再把训练分布当成唯一真相，而是把它视为一个中心点。

> 💡 关键：WDPO 鲁棒的不是单个 chosen / rejected 样本，而是样本背后的“偏好分布本身”。这比做样本级加权更强，因为它直接针对 deployment-time preference shift。

##### 5. 难点与近似：为什么最终会变成“DPO + 梯度正则”

直接求解上述 Wasserstein min-max 目标在大模型训练中并不现实。原因很简单：最坏情况分布 \( \mathsf{P} \) 本身不是一个显式参数化对象，我们只拥有来自名义训练分布 \( \mathsf{P}^{o}_{n} \) 的数据，而没有从不确定集内部其他分布采样的能力。因此，不能像常见 GAN 或对抗训练那样直接对“分布参数”做交替梯度下降。

论文给出的关键工程化结果，是把 WDPO 推成一个一阶可训练近似。最终的近似目标写成：

$$
\mathcal{L}^{\mathrm{W}}(\theta;\mathcal{D})
\coloneqq
\mathcal{L}^{\mathrm{DPO}}(\pi_\theta;\mathcal{D})
+
\mathcal{R}(\pi_\theta;\mathcal{D}),
$$

其中附加正则项为：

$$
\mathcal{R}(\pi_\theta;\mathcal{D})
=
\rho_o
\left(
\mathbb{E}_{z\sim\mathcal{D}}
\left\|
\nabla_z l(z;\theta)
\right\|_2^2
\right)^{1/2}.
$$

这个式子意义很强：如果某个样本 \(z\) 发生轻微分布扰动，就会让损失 \(l(z;\theta)\) 大幅波动，那么对应的 \(\|\nabla_z l(z;\theta)\|_2\) 就会很大，模型会被额外惩罚。于是 WDPO 逼迫模型学习一种“对局部分布变化不那么敏感”的偏好判别边界。

换句话说：
- DPO 关心的是 chosen 和 rejected 的相对 log-prob margin；
- WDPO 额外关心的是，这个 margin 对训练样本分布附近的小扰动是否过于脆弱。

这让 WDPO 看起来像“在 DPO 上加平滑项”，但本质上它对应的是 Wasserstein 球上的分布鲁棒优化，不是简单的经验 trick。

> ⚠️ 注意：这个正则不是对模型参数梯度做裁剪，而是对样本扰动敏感度做控制。它约束的是“偏好边界的局部稳定性”，不是常规意义的优化稳定技巧。

##### 6. 与标准 DPO 的本质区别

标准 DPO 仍然是一个经验风险最小化方法。它在给定的训练偏好对 \((x, y_w, y_l)\) 上优化：

$$
\mathcal{L}_{\mathrm{DPO}}
=
-\mathbb{E}
\left[
\log \sigma\left(
\beta \log \frac{\pi_\theta(y_w|x)}{\pi_{\mathrm{ref}}(y_w|x)}
-
\beta \log \frac{\pi_\theta(y_l|x)}{\pi_{\mathrm{ref}}(y_l|x)}
\right)
\right].
$$

这个目标默认训练偏好分布就是最终分布，因此它对 OOD preference shift 极其敏感。WDPO 没有改掉 DPO 的配对偏好形式，而是在其外层再套一层“对分布扰动求最坏情况”的约束。这样保留了 DPO 的高效训练结构，同时把鲁棒性引入到了目标层。

所以 WDPO 在演化脉络中的价值，不是提出了新的偏好标签形式，也不是改了 chosen/rejected 的比较方式，而是第一次比较系统地把 **distributional robustness** 接入 DPO 对齐。

##### 7. 实验设定与论文结论

论文做了三类实验，核心都围绕“训练时和测试时偏好目标不一致”：

- **Emotion Alignment**：在 Emotion 数据集上把 anger / fear 等目标按不同混合系数组合，训练和测试使用不同混合系数，显式制造 preference shift；
- **ArmoRM Multi-objective Alignment**：在 HelpSteer2 prompt 上用 ArmoRM 生成多目标偏好，再在未参与训练的 reward objective 上测试泛化；
- **OpenLLM Leaderboard**：将鲁棒对齐后的模型放到更广泛能力基准上，观察对齐鲁棒性是否牺牲通用能力。

论文报告表明，WDPO 和 KLDPO 在这些偏好漂移场景下都比 vanilla DPO 更稳，尤其是在训练偏好与评估偏好不一致时退化更慢。作者还给出理论结论：对于 log-linear policy，WDPO / KLDPO 的鲁棒参数学习具有有限样本保证，收敛速度达到 \(O(n^{-1/4})\) 量级。这一点让 WDPO 不只是经验上“看起来更稳”，而是有明确的统计学习支撑。

#### 🧪 练习题
```yaml
question: "WDPO 相比标准 DPO 的最核心变化是什么？"
options:
  - "把 chosen / rejected 二元偏好改成了多分类标签"
  - "完全移除了参考模型，只保留奖励回归"
  - "把 DPO 的经验风险最小化改成了 Wasserstein 不确定集上的最坏情况优化"
  - "仅通过增大学习率让模型更快适应分布变化"
answer: 2
explain: "WDPO 的核心不是改标签形式，而是在训练分布附近引入 Wasserstein 不确定集，对最坏情况偏好分布做鲁棒优化，从而缓解 preference shift。"
```
