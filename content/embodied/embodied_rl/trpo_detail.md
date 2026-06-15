### TRPO — 信任域策略优化 (Trust Region Policy Optimization)

```yaml
id: trpo
name: TRPO
full_name: 信任域策略优化 (Trust Region Policy Optimization)
year: '2015'
org: UC Berkeley
paper_url: https://arxiv.org/abs/1502.05477
category: foundation
parent: —
motivation: KL散度约束保证策略单调改进
```

#### 📝 一句话总结

TRPO 提出用 KL 散度信任域约束策略更新，在最大化策略梯度替代目标的同时限制新旧策略距离，解决大步更新导致策略性能崩溃的问题。它把自然策略梯度、保守策略迭代和深度神经网络策略优化连接起来，成为后续 PPO 等算法的直接基础。

#### 🎯 核心要点

- **单调改进下界**：从 \(L_{\pi_{\text{old}}}(\pi)\) 的局部替代目标出发，用 KL 距离惩罚给出策略改进下界
- **信任域约束**：将理论上的最大 KL 约束近似为采样状态上的平均 KL 约束 \(\bar{D}_{\mathrm{KL}}(\pi_{\text{old}}\|\pi_\theta)\le \delta\)
- **重要性采样替代目标**：用旧策略采集轨迹，通过 \(\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)}A_{\theta_{\text{old}}}(s,a)\) 估计新策略收益
- **共轭梯度求解**：用 Fisher 信息矩阵的 Hessian-vector product 近似自然梯度方向，不显式构造大矩阵
- **线搜索防崩溃**：沿近似方向回溯搜索，确保替代目标提升且 KL 约束满足
- **两种采样方案**：Single Path 可直接用于真实系统；Vine 需要仿真器可重置到中间状态，以更低方差估计优势
- **实验覆盖广**：在 MuJoCo 机器人运动和 Atari 图像输入任务中验证了稳定性与较少超参数调节需求

#### 🔬 深入细节

##### 方法示意图

![TRPO single-path 采样示意](https://ar5iv.labs.arxiv.org/html/1502.05477/assets/x1.png)
![TRPO vine 采样示意](https://ar5iv.labs.arxiv.org/html/1502.05477/assets/x2.png)

*图：TRPO 论文 Figure 1 的两种采样方式。Single Path 直接沿旧策略生成轨迹；Vine 从主干轨迹的若干状态分支 rollout，用更多局部动作评估降低方差。*

##### 算法伪代码

```python
# Trust Region Policy Optimization
theta = initialize_policy()

while not converged:
    trajectories = rollout(policy=pi(theta_old))
    advantages = estimate_advantage(trajectories)

    # 重要性采样替代目标
    def surrogate(theta):
        ratio = pi(theta, a, s) / pi(theta_old, a, s)
        return mean(ratio * advantages)

    # 平均 KL 约束的二阶近似：0.5 * step.T @ F @ step <= delta
    g = grad(surrogate(theta_old))
    step_dir = conjugate_gradient(Fisher_vector_product, g)
    step_size = sqrt(2 * delta / (step_dir.T @ F @ step_dir))

    # 回溯线搜索：同时检查 surrogate 改进和 KL 约束
    for scale in [1.0, 0.5, 0.25, 0.125]:
        theta_new = theta_old + scale * step_size * step_dir
        if surrogate(theta_new) > surrogate(theta_old) and mean_kl(theta_old, theta_new) <= delta:
            theta_old = theta_new
            break
```

##### 动机与背景

标准策略梯度只告诉我们“朝哪个方向提高期望回报”，但没有给出“走多远才安全”。在深度策略网络中，参数空间的一小步可能让动作分布发生大变化；如果新策略把概率质量移动到优势估计不可靠的动作上，性能会突然下降。TRPO 的核心问题就是：如何在利用梯度样本效率的同时，为每次策略更新设置一个可计算的安全边界。

论文从保守策略迭代出发，把新策略真实性能 \(\eta(\tilde{\pi})\) 下界写成局部替代目标减去策略距离惩罚：

$$
\eta(\tilde{\pi}) \ge L_{\pi}(\tilde{\pi}) - C D_{\mathrm{KL}}^{\max}(\pi,\tilde{\pi})
$$

其中 \(L_\pi(\tilde{\pi})\) 使用旧策略访问分布和旧策略优势函数来近似新策略收益。这个式子的直觉是：只要新策略在旧策略附近，状态分布变化带来的误差可由 KL 距离控制；因此最大化替代目标并限制 KL，就能避免过大的策略漂移。

实际算法不能对所有状态施加最大 KL 约束，所以 TRPO 将其近似为样本上的平均 KL：

$$
\max_\theta L_{\theta_{\text{old}}}(\theta)
\quad \text{s.t.} \quad
\bar{D}_{\mathrm{KL}}^{\rho_{\theta_{\text{old}}}}(\theta_{\text{old}},\theta)\le \delta
$$

替代目标进一步用旧策略采样得到：

$$
L_{\theta_{\text{old}}}(\theta)
=
\mathbb{E}_{s,a\sim\pi_{\theta_{\text{old}}}}
\left[
\frac{\pi_\theta(a|s)}{\pi_{\theta_{\text{old}}}(a|s)}
A_{\theta_{\text{old}}}(s,a)
\right]
$$

求解时，TRPO 对目标做一阶近似、对 KL 做二阶近似，得到接近自然梯度的方向 \(s\approx F^{-1}g\)。这里 \(F\) 是由平均 KL 的 Hessian 给出的 Fisher 信息矩阵。由于神经网络参数很多，论文使用共轭梯度，只需要计算 Fisher-vector product，而不显式保存 \(F\)。

最后的线搜索是工程稳定性的关键。二阶近似只在局部成立，如果直接走满理论步长，非线性网络可能仍然违反 KL 约束或降低替代目标。因此 TRPO 会逐步缩短步长，直到真实 mini-batch 估计下的替代目标提升且平均 KL 小于 \(\delta\)。这也是它比普通自然梯度更稳的原因。

> 💡 关键：TRPO 不是简单“加 KL 正则”，而是把 KL 放进硬约束，并在每次更新后显式检查。这个设计用计算开销换来了策略更新幅度的可控性。

##### 与传统策略梯度的区别

| 方法 | 更新约束 | 样本复用 | 主要风险 |
|---|---|---|---|
| Vanilla Policy Gradient | 学习率隐式控制 | 低 | 学习率敏感，容易震荡 |
| Natural Policy Gradient | Fisher 度量下缩放梯度 | 低 | 步长仍需手调 |
| TRPO | 平均 KL 信任域硬约束 | 中 | 实现复杂，共轭梯度和线搜索开销较高 |

TRPO 的优势在于把“步长”从参数空间转移到策略分布空间。对于机器人控制，动作分布变化比参数范数更接近真实行为变化，因此 KL 信任域比普通学习率更有意义。

#### 🧪 练习题

```yaml
question: "TRPO 中 KL 散度约束的主要作用是什么？"
options:
  - "减少策略网络参数量"
  - "限制新旧策略分布差异，避免单次更新过大"
  - "替代优势函数估计"
  - "让算法变成完全 off-policy"
answer: 1
explain: "TRPO 最大化替代目标时显式约束平均 KL，使新策略保持在旧策略附近，从而让局部近似更可靠并减少性能崩溃。"
```
