### 选择性偏好优化 (SePO)

```yaml
id: sepo
full_name: 选择性偏好优化 (SePO)
year: "2025"
paper_url: https://aclanthology.org/2025.emnlp-main.359/
motivation: 选择性优化关键Token降低成本
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
SePO 提出用 DPO 训练出的 oracle model 估计 token-level reward，只选择 chosen 回答中高贡献 token 和 rejected 回答中低贡献 token 来做偏好优化。它解决了 token-level alignment 全量优化噪声大、关键 token 选择昂贵的问题，用少量关键 token 保持甚至提升对齐效果。

#### 🎯 核心要点
- DPO 作为 token reward estimator：通过 oracle model 与 reference model 的 log-ratio 估计每个 token 的偏好贡献。
- 三阶段流程：训练 ref-oracle 模型对、对目标偏好数据打分并选择 key tokens、用 reference-free contrastive objective 训练目标 policy。
- 选择性监督：chosen response 选择 reward 最高的 top-\(k_w\) token，rejected response 选择 reward 最低的 top-\(k_l\) token。
- 低成本适配：oracle model 可用较小模型和中等规模数据训练，选择出的 token 子集可被多个更强 policy model 复用。
- 目标函数去 reference model 化：最终 policy 训练只对 selected tokens 的归一化 log-likelihood 做对比，不再在目标函数中显式调用 reference model。
- 实验结论：在 AlpacaEval 2、Arena-Hard、MT-Bench 等评测中，SePO 用约 30% key tokens 超过多种全量 token/response-level 偏好优化基线，并支持 weak-to-strong generalization。

#### 🔬 深入细节

![SePO 三阶段流程图](https://arxiv.org/html/2408.13518v2/x1.png)
*图：SePO Figure 2。流程包括：用 ref-oracle pair 参数化 token-level reward、在目标偏好数据中选择关键 token、只用 selected tokens 训练 policy model。ACL 正式版与 arXiv HTML 为同一论文内容。*

SePO 的问题意识非常具体：现有 token-level preference optimization 往往默认“所有 token 都值得优化”，但语言生成中的偏好贡献高度不均匀。一个 chosen response 中真正决定质量的可能是少数关键事实、推理步骤或格式 token；一个 rejected response 中真正该压低概率的也往往是少数错误、幻觉或不合规片段。全量 token 优化会把大量中性 token 也纳入梯度，既增加训练成本，也可能引入噪声和长度偏置。SePO 因此把核心任务改成：如何在只有 response-level preference 标注的情况下，便宜地找出 token-level key supervision。

论文首先把 LLM 解码形式化为 token-level MDP：状态 \(s_t\) 是 prompt 与当前前缀，动作 \(a_t\) 是下一个 token，轨迹 reward 可分解为 token reward 的和：

$$
r(q,\tau)=\sum_{t=1}^{T}\hat r(s_t,a_t).
$$

在这个假设下，DPO 训练得到的 oracle policy 与 reference policy 的概率比可作为 token reward 的估计：

$$
\hat r(s_t,a_t)\propto \log\frac{\pi^*(a_t\mid s_t)}{\pi_{ref}(a_t\mid s_t)}.
$$

SePO 的 oracle modeling 就是把这个结论落地。先用偏好数据训练 reference model \(\pi_{ref}\) 和 oracle model \(\pi_{ora}\)：reference 通常通过 SFT 得到，oracle 在 reference 基础上通过 DPO 学习偏好方向。随后，对任意目标样本 \((q,y)\)，每个 token 的分数是：

$$
s(y_i)=\log\frac{\pi_{ora}(y_i\mid q,y_{<i})}{\pi_{ref}(y_i\mid q,y_{<i})}.
$$

如果 \(s(y_i)\) 高，说明 oracle 相比 reference 更倾向生成该 token，它在 chosen response 中通常是正向贡献；如果 \(s(y_i)\) 低，说明 oracle 压低该 token，它在 rejected response 中通常是负向贡献。于是 SePO 对 chosen 选最高 \(k_w\%\)，对 rejected 选最低 \(k_l\%\)：

$$
\mathbb I_k^w(y_i)=
\begin{cases}
1,& s(y_i)\text{ ranks in highest }k\%\text{ in }y\\
0,& \text{otherwise}
\end{cases}
$$

rejected 的 \(\mathbb I_k^l\) 则把条件改成 lowest \(k\%\)。这一步是 SePO 降本的关键，因为之后训练 policy 时只需要对这些 selected tokens 求梯度。论文中常用的设定是选择约 30% key tokens；这比全量 token 少很多，但仍覆盖了偏好差异最集中的片段。

```python
# SePO 核心流程伪代码
# D_oracle: 用于训练 oracle 的偏好数据；D_target: 目标 policy 的偏好数据
pi_ref = train_sft(chosen_responses(D_oracle))
pi_ora = train_dpo(pi_ref, D_oracle)

selected_dataset = []
for q, y_w, y_l in D_target:
    scores_w = [log(pi_ora.prob(tok, q, y_w[:i]) / pi_ref.prob(tok, q, y_w[:i]))
                for i, tok in enumerate(y_w)]
    scores_l = [log(pi_ora.prob(tok, q, y_l[:i]) / pi_ref.prob(tok, q, y_l[:i]))
                for i, tok in enumerate(y_l)]

    I_w = top_k_mask(scores_w, ratio=k_w, largest=True)      # chosen: 最高 reward token
    I_l = top_k_mask(scores_l, ratio=k_l, largest=False)     # rejected: 最低 reward token
    selected_dataset.append((q, y_w, y_l, I_w, I_l))

for batch in selected_dataset:
    u_w = selected_logprob(policy, q, y_w, I_w, gamma)
    u_l = selected_logprob(policy, q, y_l, I_l, gamma)
    loss = -log_sigmoid(u_w - u_l - margin_lambda)
    optimizer.step(loss)
```

最终的 SePO 目标函数是一个只作用于 selected tokens 的对比式偏好目标：

$$
\mathcal L_{SePO}
=-\mathbb E_{(q,y_w,y_l)\sim\mathcal D}\log\sigma\left(
\hat u(q,y_w,\mathbb I^w_{k_w})-
\hat u(q,y_l,\mathbb I^l_{k_l})-\lambda
\right),
$$

其中

$$
\hat u(q,y,\mathbb I_k)=
\frac{\gamma}{|y|\cdot k\%}\sum_{i=1}^{|y|}\mathbb I_k(y_i)
\log\pi_\theta(y_i\mid q,y_{<i}).
$$

这个设计有两个细节值得注意。第一，\(\hat u\) 对选择比例和长度做归一化，避免“选更多 token”或“生成更长回答”天然获得更大 log-likelihood 总量。第二，目标函数形式接近 SimPO/contrastive preference optimization，但它的对比单元不是整句平均 log-prob，而是 oracle 挑出来的关键 token 子集，因此梯度更集中。

SePO 与 RTO/TDPO 的关系也很清楚。RTO 把 DPO log-ratio 作为 dense reward，再用 PPO 在线优化；TDPO 更直接地把偏好优化拆到 token 级。SePO 则进一步问：既然 token reward 有强弱之分，为什么还要优化所有 token？它用 oracle model 做一次离线 token selection，之后可以复用这个选择结果训练不同大小的 policy model。论文的 weak-to-strong 实验说明，小 oracle 选出的 key tokens 可以监督更强的 policy；这使 SePO 不只是一个训练目标，也是一种把弱监督信号提纯后迁移给强模型的数据处理框架。

> 💡 关键：SePO 的“选择性”不是随机裁剪训练 token，而是基于 DPO 隐式 reward 的有方向选择：强化 chosen 中最能解释偏好的 token，压低 rejected 中最能解释失败的 token。

#### 🧪 练习题
```yaml
question: "SePO 选择 rejected response 中 key tokens 的原则是什么？"
options:
  - "选择 oracle-reference log-ratio 最高的 token"
  - "随机选择固定比例 token"
  - "选择 oracle-reference log-ratio 最低的 token"
  - "只选择回答末尾的 EOS token"
answer: 2
explain: "SePO 认为 rejected 中 reward 最低的 token 最可能导致偏好失败，因此选择这些 token 来抑制目标 policy 的生成概率。"
```
