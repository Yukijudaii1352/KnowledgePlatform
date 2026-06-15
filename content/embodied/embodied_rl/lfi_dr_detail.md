### LFI-DR — 似然无关推理域随机化 (Likelihood-Free Inference DR)

```yaml
id: lfi_dr
name: LFI-DR
full_name: 似然无关推理域随机化 (Likelihood-Free Inference DR)
year: '2026'
org: Edinburgh
paper_url: https://arxiv.org/abs/2602.05678
category: sim2real
parent: domain_rand
motivation: 似然无关推理计算物理参数后验
```

#### 📝 一句话总结

LFI-DR 将域随机化从手工设定参数范围推进到后验推断：用真实系统观测和仿真 rollout 的差异，通过似然无关推理估计物理参数分布，再从该后验中随机化训练策略。给定 `paper_url` 实际指向核物理论文而非该算法，以下解读基于 YAML 元信息、Domain Randomization 背景和 sim-to-real 中 likelihood-free / simulation-based inference 的通用方法组织。

#### 🎯 核心要点

- **依据限制**：`https://arxiv.org/abs/2602.05678` 标题为 “Three-body Effect in Short-range Correlations”，与 LFI-DR 元信息不匹配，未能获取匹配论文原文或原图
- **后验式域随机化**：将物理参数 \(\phi\) 视为随机变量，目标是估计 \(p(\phi|x_{\mathrm{real}})\)，而不是固定均匀随机化范围
- **似然无关推理**：当 \(p(x|\phi)\) 无法解析时，用仿真器采样 \(\phi\sim p(\phi)\)、\(x_{\mathrm{sim}}\sim \mathrm{Sim}(\phi)\)，再用距离/分类器/密度比学习近似后验
- **参数闭环更新**：真实轨迹进入推断器，推断器输出后验，策略在后验覆盖的仿真环境中训练，再部署收集新真实轨迹
- **降低无效随机化**：相比宽范围 Domain Randomization，后验集中在真实系统可能参数上，提高样本效率并减少过度保守
- **适用对象**：摩擦、质量、阻尼、执行器延迟、接触刚度、传感器噪声等难以直接测量但可在仿真器中参数化的因素
- **风险点**：后验质量依赖 summary statistics、仿真器结构误差和真实数据覆盖；若仿真器缺少关键物理项，后验会自信但错误

#### 🔬 深入细节

##### 概念示意图

![LFI-DR 概念流程图](https://placehold.co/1200x480/png?text=LFI-DR+Posterior+Domain+Randomization)

*图：给定 URL 未提供匹配论文原图，上图为结构占位。LFI-DR 的核心流程可概括为：真实轨迹 → 似然无关参数后验 → 后验域随机化 → 策略训练 → 真实部署反馈。*

##### 算法伪代码

```python
# LFI-DR conceptual pipeline
prior = p_phi()                         # 物理参数先验：质量、摩擦、延迟等
posterior = prior

for round in range(num_rounds):
    # 1. 用当前后验随机化仿真，生成参数-轨迹样本
    sim_data = []
    for k in range(num_simulations):
        phi = sample(posterior)
        traj = simulator.rollout(policy=current_policy, physics=phi)
        sim_data.append((phi, summary(traj)))

    # 2. 通过 likelihood-free inference 拟合 p(phi | summary(real))
    inference_model.fit(sim_data)
    z_real = summary(real_robot_rollouts())
    posterior = inference_model.condition(z_real)

    # 3. 用后验分布进行域随机化训练
    for update in range(policy_updates):
        phi = sample(posterior)
        batch = simulator.rollout(policy=current_policy, physics=phi)
        current_policy = rl_update(current_policy, batch)
```

##### 动机与背景

经典 Domain Randomization 的核心假设是：只要随机化范围足够宽，真实世界就会落在仿真训练分布里。但这个假设在接触丰富的机器人任务中代价很高。摩擦、软接触、执行器延迟等参数若随机得过窄，策略无法迁移；随机得过宽，训练分布包含大量不可能的物理世界，策略会变得保守且学习效率低。

LFI-DR 的动机是把“随机化范围怎么选”变成统计推断问题。设真实观测为 \(x_{\mathrm{real}}\)，仿真物理参数为 \(\phi\)，理想目标是：

$$
p(\phi|x_{\mathrm{real}})\propto p(x_{\mathrm{real}}|\phi)p(\phi)
$$

难点在于 \(p(x|\phi)\) 通常不可写出：仿真器可以前向生成轨迹，却不会返回轨迹的解析似然。似然无关推理（Likelihood-Free Inference，也常称 simulation-based inference）正适合这种“能采样、不能写似然”的场景。

一种简单形式是 ABC（Approximate Bayesian Computation）：从先验采样 \(\phi\)，仿真得到 \(x_{\mathrm{sim}}\)，如果摘要统计距离 \(d(S(x_{\mathrm{sim}}),S(x_{\mathrm{real}}))<\epsilon\)，就接受该 \(\phi\)。更现代的做法会训练条件密度估计器、神经后验估计器或分类器密度比模型，使推断器输出连续后验而不是只接受/拒绝样本。

后验式随机化的关键收益在于把训练分布从人工大盒子变成数据约束分布：

$$
\phi \sim q(\phi|x_{\mathrm{real}}), \qquad
\pi^*=\arg\max_\pi \mathbb{E}_{\phi\sim q}\left[J_{\mathrm{sim}}(\pi;\phi)\right]
$$

其中 \(q\) 是 LFI 得到的近似后验。若真实系统信息足够，\(q\) 会比原始先验更集中，策略不必在大量无关物理配置上浪费能力；若信息不足，后验仍保留不确定性，训练仍具备鲁棒性。

> 💡 关键：LFI-DR 不是“用真实数据拟合一个单点仿真参数”，而是拟合参数后验。后验的不确定性本身就是域随机化分布。

##### 与传统 Domain Randomization 的区别

| 维度 | 传统 DR | LFI-DR |
|---|---|---|
| 参数分布 | 人工设定，多为均匀分布 | 由真实观测推断后验 |
| 真实数据使用 | 可为零样本，也可只用于验证 | 直接用于更新随机化分布 |
| 主要风险 | 范围过宽/过窄 | 后验受摘要统计和仿真偏差影响 |
| 策略训练 | 在固定随机化分布上训练 | 可随真实部署数据迭代收缩或修正 |

在具身强化学习中，这类方法特别适合“可观测轨迹很少但仿真可大量采样”的设置。它把真实系统辨识和策略鲁棒训练合并为一个闭环：先推断真实世界可能在哪些物理参数区域，再把策略训练集中到这些区域。

##### 依据限制说明

由于清单中的 `paper_url` 与算法名称、机构和动机不匹配，无法确认 LFI-DR 是否已有公开论文、原始公式或实验设置。本文中的公式和伪代码是基于 YAML 元信息和 sim-to-real 中 LFI/SBI + Domain Randomization 的标准范式抽象，不能替代原文细节。

#### 🧪 练习题

```yaml
question: "LFI-DR 相比普通域随机化最核心的变化是什么？"
options:
  - "完全取消仿真训练"
  - "用真实观测推断物理参数后验，并从后验中随机化训练"
  - "只随机化视觉纹理，不随机化动力学"
  - "把策略优化从强化学习换成监督学习"
answer: 1
explain: "LFI-DR 的核心是通过似然无关推理得到 p(φ|x_real)，再把该后验作为域随机化分布，从而减少手工范围选择带来的偏差。"
```
