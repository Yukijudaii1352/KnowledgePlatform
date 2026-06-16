### Token自适应屏障PO (TAB-PO)

```yaml
id: tab_po
full_name: "Token自适应屏障PO (TAB-PO)"
year: "2026.03"
paper_url: "https://arxiv.org/abs/2603.00025"
motivation: "自适应屏障保护关键Token"
parent: "tdpo"
category: "token_multimodal"
```

#### 📝 一句话总结

TAB-PO 提出面向结构化生成的 Token-Adaptive Barrier Preference Optimization，用混淆感知 hard negative 和置信度门控的 token 级屏障保护低置信关键 token，解决 DPO 在低编辑距离 JSON/本体输出中梯度稀释与正确 token 被侵蚀的问题。

#### 🎯 核心要点

- 面向本体驱动结构化预测，输出通常是 schema-valid JSON，正确性由少量语义标签、证据 span、关系链接或共指 token 决定。
- 构造 confusion-aware preference pairs：利用专家歧义模式和 SFT 验证集错误混淆表，合成最小扰动且 schema-valid 的 rejected 输出。
- 识别 DPO 在低编辑距离偏好对中的两个失配：梯度被 JSON scaffolding 稀释，以及偏好 margin 增大但正确稀有 token 概率下降。
- 在 DPO 风格 reference-adjusted preference loss 上加入 confidence-gated token barrier，只对当前策略低置信的 preferred token 施加 SFT 锚定。
- 实验聚焦 PV-Miner 和 SciERC，报告 semantic label、textual grounding、relation、coreference 等结构化指标，TAB-PO 在关键结构维度上显著优于 SFT、序列级 DPO 和 token 级 DPO 变体。

#### 🔬 深入细节

![TAB-PO 结构化预测流程](https://arxiv.org/html/2603.00025v2/x1.png)
*图：TAB-PO pipeline。模型先通过 prompt engineering 与 SFT 学会合法结构化输出，再用 confusion-aware hard negatives 与 token-level barrier 修正残余本体错误。*

TAB-PO 的出发点不是普通开放式回答偏好，而是本体约束的结构化预测。例如信息抽取任务会要求模型输出固定字段、层级标签、证据片段和关系链接。preferred 与 rejected completion 往往共享绝大多数 JSON 括号、字段名、逗号和模板 token，只在少数 schema-defining token 上不同。标准 DPO 看到的是整段 completion 的相对 likelihood，因此会把更新信号分摊到大量无关 serialization token 上，这就是论文称为 gradient dilution 的现象。更棘手的是，DPO 只要求 preferred 相对 rejected 的整体 margin 变大，某些罕见但正确的 preferred 标签 token 仍可能因为优化耦合而概率下降，这就是 preferred-token erosion。

TAB-PO 先处理数据构造问题。给定输入 \(x\) 和 gold structured output \(Y^+\)，它不会随机采样一个语法错误的负例，而是从 SFT 模型在验证集上的混淆模式和专家定义的歧义模式出发，构造低分离度 hard negative \(Y^-\)。扰动类型包括替换语义标签、替换或缩短 grounding span、删除应有记录、插入多余但 schema-valid 的记录、修改 relation/coreference link 等。这样 rejected 输出仍然可解析、符合 ontology，但在一个关键结构决策上错误，优化信号就会集中到真实易错边界。

核心 preference 部分仍保留 DPO 的 reference-adjusted margin。设序列化 completion 为 \(Y_s\)，token 序列为 \(u=(u_1,\ldots,u_T)\)，当前策略 log-likelihood 写作：

$$
\mu_\theta(Y_s\mid x)=\sum_{t=1}^{T}\log p_\theta(u_t\mid x,u_{<t})
$$

以 SFT 模型作为固定 reference，preferred 与 rejected 的参考校正优势为：

$$
\Delta_\theta=
\big[\mu_\theta(Y_s^+\mid x)-\mu_{\mathrm{SFT}}(Y_s^+\mid x)\big]
-
\big[\mu_\theta(Y_s^-\mid x)-\mu_{\mathrm{SFT}}(Y_s^-\mid x)\big]
$$

对应偏好损失为 \(\mathcal{L}_{\mathrm{pref}}(\theta)=-\log\sigma(\beta\Delta_\theta)\)。这一步鼓励策略相对 SFT reference 更偏好正确结构，但单独使用仍可能出现 token erosion，因此 TAB-PO 在 preferred completion 上额外加入置信度门控屏障。

屏障项只在当前策略对 preferred token 低置信时激活。对 preferred token \(u_t^+\)，定义门控：

$$
g_t^\theta(x,u^+)=\mathbf{1}\{p_\theta(u_t^+\mid x,u_{<t}^+)<\tau\}
$$

preferred-token 的 supervised 锚定损失为 \(\ell_t^+(\theta)=-\log p_\theta(u_t^+\mid x,u_{<t}^+)\)，于是 barrier regularizer 为：

$$
\mathcal{L}_{\mathrm{barrier}}(\theta)=
\mathbb{E}_{\mathcal{D}_{\mathrm{pref}}}
\left[
\frac{\sum_{t=1}^{T^+} g_t^\theta(x,u^+)\ell_t^+(\theta)}
{\max(1,\sum_{t=1}^{T^+}g_t^\theta(x,u^+))}
\right]
$$

最终目标是：

$$
\mathcal{L}_{\mathrm{TAB\text{-}PO}}(\theta)=
\mathcal{L}_{\mathrm{pref}}(\theta)+\lambda\mathcal{L}_{\mathrm{barrier}}(\theta)
$$

这个设计的关键直觉是：confident token 继续由 preference loss 推动区分 preferred/rejected；低置信 preferred token 则被 SFT likelihood 拉回安全区间，避免正确但罕见的本体标签被牺牲。由于门控在每个 forward pass 内作为固定 mask 处理，梯度只通过 \(\ell_t^+\) 回传，屏障行为像一个局部修复项，而不是把整个 completion 重新做 SFT。

```python
# TAB-PO 简化伪代码
sft_model = freeze(theta_sft)
policy = init_from(theta_sft)
confusions = build_confusion_table(sft_validation_errors, expert_ambiguities)

for x, gold_struct in gold_records:
    y_pos = serialize(gold_struct)
    y_neg = make_schema_valid_negative(gold_struct, confusions)
    add_preference_pair(x, y_pos, y_neg)

for batch in preference_pairs:
    mu_pos = logprob(policy, batch.y_pos, batch.x)
    mu_neg = logprob(policy, batch.y_neg, batch.x)
    ref_pos = logprob(sft_model, batch.y_pos, batch.x)
    ref_neg = logprob(sft_model, batch.y_neg, batch.x)

    delta = (mu_pos - ref_pos) - (mu_neg - ref_neg)
    loss_pref = -logsigmoid(beta * delta)

    probs = token_probs(policy, batch.y_pos, batch.x)
    gate = (probs < tau).detach()
    token_nll = -log_token_probs(policy, batch.y_pos, batch.x)
    loss_barrier = (gate * token_nll).sum() / max(1, gate.sum())

    loss = loss_pref + lambda_barrier * loss_barrier
    update(policy, loss)
```

> 💡 关键：TAB-PO 的“token 自适应”不等于给所有 token 加权，而是只在 preferred token 低于置信阈值时启动屏障；这使它能保护语义标签、span、关系边等少数关键 token，同时不把 JSON 模板 token 当作同等重要的学习对象。

与 TDPO 等 token-level preference 方法相比，TAB-PO 的特殊性在于任务假设更强：输出是 ontology-constrained structured object，负例可以通过真实混淆表和专家规则构造，并且 preferred/rejected 的差异极小。TDPO 更关注 token 级 KL 分解和一般对齐稳定性，TI-DPO 等方法从模型归因推断 token 重要性；TAB-PO 则直接利用结构化任务中已知的 gold record、schema、relation rule 和错误混淆，显式把 preference signal 对准结构正确性的决策 token。

从训练流程看，TAB-PO 是 post-SFT 阶段，不需要在线 rollout、reward model 或 verifier。先用 prompt engineering 和 SFT 获得 schema-valid 输出能力，再从 SFT 的 residual errors 中生成 preference triples，最后用 \(\mathcal{L}_{\mathrm{pref}}\) 拉开正确/错误结构的相对 margin，用 \(\mathcal{L}_{\mathrm{barrier}}\) 防止低置信正确 token 被 DPO 更新冲掉。论文的诊断分析显示，TAB-PO 的 barrier activation 更集中在 critical schema tokens，gradient mass 也更偏向 semantic labels、grounded spans、relation labels 和 linking decisions，而不是 JSON scaffolding。

#### 🧪 练习题

```yaml
question: "TAB-PO 中 confidence-gated token barrier 的主要作用是什么？"
options:
  - "对所有 JSON token 施加相同的 SFT 损失，使输出格式更稳定"
  - "只在 preferred token 低置信时施加监督锚定，防止关键正确 token 概率被 DPO 侵蚀"
  - "用 reward model 给每个偏好样本动态调整 beta"
  - "通过采样多个 rollout 估计 group-relative advantage"
answer: 1
explain: "TAB-PO 的屏障项由 token 概率阈值触发，目标是保护低置信的 preferred schema token，同时保留 DPO 的 preferred-over-rejected margin 学习。"
```
