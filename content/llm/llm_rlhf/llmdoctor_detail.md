### LLM医生 (LLMdoctor)

```yaml
id: llmdoctor
full_name: "LLM医生 (LLMdoctor)"
year: "2026.01"
paper_url: "https://arxiv.org/abs/2601.10416"
motivation: "流引导Token级测试时对齐"
parent: "tdpo"
category: "token_multimodal"
```

#### 📝 一句话总结

LLMdoctor 提出了一个 patient-doctor 式测试时对齐框架：先从冻结大模型自身的正负行为变体中抽取 token 级偏好奖励，再用 token-level flow-guided preference optimization (TFPO) 训练小型 doctor 模型，在推理时逐 token 引导大模型生成。它主要解决传统轨迹级奖励信号粗糙、采样开销大、以及小奖励模型容易把大模型能力上限“拉低”的问题。

#### 🎯 核心要点

- 三阶段框架：Token-Level Reward Acquisition → TFPO-Based Fine-Grained Preference Tuning → Online Alignment。
- Patient-doctor 结构：大规模 patient LLM 保持冻结，小规模 doctor 模型学习 token 级偏好流，并在推理时提供奖励引导。
- Token 级奖励来自同一个 patient 模型的 positive face 与 negative face 行为变体，而不是额外训练轨迹级 reward model。
- 用正负行为变体的 log-likelihood gap 衡量 token 的判别性，并用 sparsity threshold 只保留真正影响偏好的 token。
- TFPO 把偏好监督从完整 response 扩展到所有 subtrajectory，通过 Subtrajectory Balance 约束学习流一致性。
- 推理时用几何混合分布把 base distribution 与 doctor reward distribution 结合，可通过 \(\alpha\)、\(\beta\) 调整流畅性和偏好强度。
- 支持多维偏好控制：多个 doctor 或多个 reward head 的权重 \(\beta_i\) 可以在测试时动态调整，无需重训 patient。

#### 🔬 深入细节

![LLMdoctor 整体框架](https://ar5iv.labs.arxiv.org/html/2601.10416/assets/x2.png)
*图：LLMdoctor 的整体框架。大模型作为 patient 提供行为差异与最终生成能力，小模型作为 doctor 学习 token 级流引导信号并在测试时介入解码。*

LLMdoctor 的出发点是：很多测试时对齐方法虽然避免了重新微调大模型，但仍依赖轨迹级 reward。轨迹级 reward 只能告诉模型“整段回答好/不好”，无法说明哪些 token 真正贡献了 helpfulness、harmlessness 或礼貌性。论文指出，这会造成 reward-budget distortion：为了让偏好回答总分更高，模型可能把奖励机械地摊到大量中性词上，例如连接词或常见功能词，从而稀释真正关键 token 的信号。LLMdoctor 反过来让冻结的大模型自己暴露判别性：同一模型通过 prompt conditioning 形成 positive face 与 negative face，然后比较二者对每个 token 的条件概率。

Token 级奖励获取过程可以写成三步。给定偏好数据 \(\mathcal{D}=\{(x^{(i)}, y_+^{(i)}, y_-^{(i)})\}_{i=1}^N\)，对 response 中每个 token \(y_t\)，分别计算正向行为变体和负向行为变体的 log-probability：

$$
\ell_t^{\text{pos}}=\log \pi^{\text{pos}}(y_t\mid x,y_{<t}),\quad
\ell_t^{\text{neg}}=\log \pi^{\text{neg}}(y_t\mid x,y_{<t}).
$$

两者绝对差 \(\Delta_t=|\ell_t^{\text{pos}}-\ell_t^{\text{neg}}|\) 表示该 token 对“好行为/坏行为”区分的贡献。之后做长度归一化和平滑：

$$
\widehat{\Delta}_t = \frac{\Delta_t}{\operatorname{mean}_j(\Delta_j)+\varepsilon},\quad
S_t=\tanh\left(\frac{\widehat{\Delta}_t}{\tau}\right).
$$

最终 token reward 结合人类偏好标签的方向：

$$
r_t = \operatorname{sign}(y)\cdot S_t\cdot \mathbf{1}[S_t>\theta].
$$

这里 \(\operatorname{sign}(y)=+1\) 对应 preferred response，\(-1\) 对应 rejected response；\(\theta\) 是稀疏阈值。直觉上，LLMdoctor 并不要求每个 token 都背负奖励，而是只给能显著区分正负行为模式的 token 分配非零信号。论文的附录还从信息论角度解释了该指标：log-likelihood gap 与两个行为策略之间 KL divergence 的 token 级贡献相关，因此高 gap token 往往是最能区分 desired/undesired behavior 的位置。

有了 token reward 之后，doctor 模型不是简单做 token 分类，而是用 TFPO 学习“前缀流”。设前缀状态 \(s_t=(y_1,\dots,y_t)\)，doctor 的策略为 \(\hat{\pi}_\theta(y_{t+1}\mid s_t)\)，并带一个 value head \(V_\phi(s_t)\)。论文把状态流定义为：

$$
F(s_t)=Q(s_t)\cdot V_\phi(s_t),
$$

其中 \(Q(s_t)\) 是由前缀内 token reward 聚合得到的正权重。TFPO 借鉴 GFlowNet 的 Subtrajectory Balance：对任意子轨迹 \(s_m\to s_n\)，前向生成概率应与流比值匹配。在采用均匀 backward policy 后，约束为：

$$
Q(s_m)V_\phi(s_m)\prod_{k=m}^{n-1}\hat{\pi}_\theta(y_{k+1}\mid s_k)=Q(s_n)V_\phi(s_n).
$$

取对数后得到可训练的 SubTB loss：

$$
\mathcal{L}_{\text{SubTB}}
=\sum_{\tau\in\mathcal{D}_{pref}}\sum_{0\le m<n\le L_\tau}
\left(
\log\frac{Q(s_n)V_\phi(s_n)}{Q(s_m)V_\phi(s_m)}
-\sum_{k=m}^{n-1}\log\hat{\pi}_\theta(y_{k+1}\mid s_k)
\right)^2.
$$

该目标的关键不是只最大化最高奖励路径，而是让采样分布与 reward-proportional distribution 对齐。论文用 GFlowNet 的性质说明：当 SubTB loss 为 0 时，\(\pi_\theta(\tau)\propto R(\tau)\)，因此多个高质量轨迹都能保留概率质量，这比标准 RL 的 mode-seeking 目标更不容易牺牲多样性。

TFPO 还加入 value discrimination loss。若在同一前缀下 token \(y_w\) 比 \(y_l\) 更偏好，value head 需要拉开 margin：

$$
\mathcal{L}_{\text{value}}(V_\phi)=\max\left(0,\gamma-(V_\phi(s_t,y_w)-V_\phi(s_t,y_l))\right).
$$

整体训练目标为：

$$
\mathcal{L}_{\text{TFPO}}=\mathcal{L}_{\text{SubTB}}(\hat{\pi}_\theta,V_\phi)+\lambda\mathcal{L}_{\text{value}}(V_\phi).
$$

这使 doctor 不只是判断“当前 token 好不好”，还学习一个具有前瞻性的 token continuation flow：某个 token 的价值取决于它通向哪些后续子轨迹，而不是只看局部概率。

推理阶段，patient 仍是主生成模型，doctor 只作为 flow-guided reward model 输出每个候选 next token 的 preference log-probability。解码分布采用几何混合：

$$
\pi_{\text{decode}}(y_{t+1}\mid s_t)\propto
[\pi_{\text{base}}(y_{t+1}\mid s_t)]^{\alpha}
[\pi_r(y_{t+1}\mid s_t)]^{\beta}.
$$

\(\alpha\) 控制保留 patient 原始语言能力的程度，\(\beta\) 控制 doctor 的偏好引导强度。相比“生成多条完整回答再打分”的轨迹级方法，这里每步只需 patient 与 doctor 各一次前向即可获得候选 token 分布，因此更适合测试时对齐。多维偏好时，解码可扩展为 \(\prod_i[\pi_r^{(i)}]^{\beta_i}\)，从而在不重训大模型的情况下临时调节 helpfulness、harmlessness 等目标。

```python
# LLMdoctor / TFPO 简化伪代码
# 输入：preference dataset D={(x, y_plus, y_minus)}, frozen patient pi_sft, small doctor pi_theta

# 1. Token-level reward acquisition
for x, y_plus, y_minus in D:
    for y, label in [(y_plus, +1), (y_minus, -1)]:
        for t, token in enumerate(y):
            l_pos = logprob(pi_sft.with_prompt("positive face"), token, x, y[:t])
            l_neg = logprob(pi_sft.with_prompt("negative face"), token, x, y[:t])
            delta[t] = abs(l_pos - l_neg)
        S = tanh((delta / (mean(delta) + eps)) / tau)
        r = label * S * (S > theta)
        store_token_rewards(x, y, r)

# 2. Train doctor with token-level flow-guided preference optimization
for batch in reward_annotated_sequences:
    for trajectory in batch:
        compute_prefix_scores_Q_from_token_rewards(trajectory)
        for every subtrajectory s_m -> s_n:
            flow_ratio = log(Q[s_n] * V_phi[s_n] / (Q[s_m] * V_phi[s_m]))
            policy_logprob = sum(log pi_theta(y[k+1] | s_k) for k in range(m, n))
            L_subtb += (flow_ratio - policy_logprob) ** 2
        L_value += margin_ranking_loss(V_phi, preferred_tokens, rejected_tokens)
    update(theta, phi, L_subtb + lambda_ * L_value)

# 3. Online alignment
for decoding_step in generation:
    p_base = patient.next_token_distribution(prefix)
    p_reward = doctor.next_token_distribution(prefix)
    p_decode = normalize((p_base ** alpha) * (p_reward ** beta))
    token = sample_or_argmax(p_decode)
```

> 💡 关键：LLMdoctor 的“医生”不是替换大模型，而是学习一种 token 级偏好流，在每一步给 patient 的 next-token distribution 加偏好方向；大模型知识和语言能力仍主要来自 patient。

#### 🧪 练习题

```yaml
question: "LLMdoctor 为什么要用 positive face 与 negative face 的 log-likelihood gap 来构造 token 级奖励？"
options:
  - "为了让 doctor 模型复制 patient 的完整输出分布"
  - "为了识别真正区分好坏行为的 token，避免把轨迹级奖励平均摊到中性 token 上"
  - "为了减少 vocabulary size，使推理时只保留高频词"
  - "为了用 beam search 替代采样，提高解码速度"
answer: 1
explain: "log-likelihood gap 衡量同一 patient 在正负行为模式下对 token 的判别差异；再加稀疏阈值后，只强化真正影响偏好的 token。"
```
