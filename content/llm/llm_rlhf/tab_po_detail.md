### Token自适应屏障PO (TAB-PO)

```yaml
id: tab_po
full_name: Token自适应屏障PO (TAB-PO)
year: '2026.03'
paper_url: https://arxiv.org/abs/2603.00025
motivation: 自适应屏障保护关键Token
parent: tdpo
category: token_multimodal
```

#### 📝 一句话总结
TAB-PO 面向结构化生成中的低编辑距离偏好对，在 DPO 偏好损失上加入置信度门控的 token-level barrier，保护低置信但正确的 schema 关键 token 不被序列级梯度稀释或侵蚀。

#### 🎯 核心要点
- 适用场景是 ontology-driven structured prediction，preferred/rejected JSON 往往只差少数标签、span 或关系 token。
- 先用混淆感知策略构造 hard negatives，使偏好对反映真实验证集错误和专家定义的歧义模式。
- 标准 DPO 在低编辑距离结构化输出上会出现 gradient dilution 与 preferred-token erosion。
- TAB-PO 对 preferred completion 中低置信 token 启动 barrier，额外施加 supervised restoration。
- 最终目标为 \( \mathcal{L}_{\mathrm{TAB\text{-}PO}}=\mathcal{L}_{\mathrm{pref}}+\lambda\mathcal{L}_{\mathrm{barrier}} \)。

#### 🔬 深入细节
![TAB-PO pipeline](https://arxiv.org/html/2603.00025v2/x1.png)
*图：TAB-PO 结合模块化 prompt/SFT、混淆感知 hard negative 和 token-level adaptive barrier。*

```python
# TAB-PO 简化伪代码
for x, y_pos, y_neg in confusion_aware_pairs:
    pref_loss = reference_adjusted_preference_loss(
        policy=theta,
        reference=ref,
        chosen=y_pos,
        rejected=y_neg,
        prompt=x,
    )

    gated_losses = []
    for t, token in enumerate(tokenize(y_pos)):
        confidence = policy.prob(token, context=(x, y_pos[:t]))
        gate = 1 if log(confidence) < log(tau) else 0
        if gate:
            gated_losses.append(-log(confidence))

    barrier = mean(gated_losses) if gated_losses else 0.0
    loss = pref_loss + lambda_barrier * barrier
    update(policy, loss)
```

TAB-PO 的问题背景与开放式聊天不同。结构化抽取任务中，chosen 和 rejected 输出可能共享绝大多数 JSON scaffold、字段名和标点，只在一个实体类型、关系标签或证据 span token 上不同。普通 DPO 把整条 completion 当成一个偏好对象，梯度会分散到大量非关键 token，真正决定 F1 的 schema token 反而得不到足够保护。

论文把这种失败拆成两个机制：gradient dilution 表示更新质量被非关键序列 token 稀释；preferred-token erosion 表示 DPO 虽然提高了 chosen 相对 rejected 的整体 margin，却可能降低某些罕见正确 token 的绝对概率。对结构化任务来说，一个正确关系标签概率下降就可能让整个记录失败。

TAB-PO 的 barrier 是置信度门控的监督恢复项。给定 preferred token 序列 \(u^+=\mathrm{Tok}(Y_s^+)\)，门控定义为 \(g_t^\theta(x,u^+)=\mathbb{I}[\log p_\theta(u_t^+|x,u^+_{<t})<\log\tau]\)。只有模型当前对正确 token 不够自信时，才额外加入该 token 的负对数似然。

最终损失把 reference-adjusted preference loss 与 barrier 相加：\(\mathcal{L}_{\mathrm{TAB\text{-}PO}}(\theta)=\mathcal{L}_{\mathrm{pref}}(\theta)+\lambda\mathcal{L}_{\mathrm{barrier}}(\theta)\)。当没有 token 被 gate 命中时，barrier 为零；这避免把 TAB-PO 退化成整条 chosen 的 SFT，也让方法更专注于关键 token 修复。

> 💡 关键：TAB-PO 不只是 token-level DPO，它显式保护 preferred token 的绝对概率，解决标准 DPO “相对 margin 变好但正确 token 变弱”的结构化生成风险。

#### 🧪 练习题
```yaml
question: "TAB-PO 的 barrier 何时激活？"
options:
  - "当 rejected response 比 chosen response 更长时"
  - "当 preferred token 在当前 policy 下概率低于阈值时"
  - "当所有 JSON 标点都生成正确时"
  - "当 reference model 不可用时"
answer: 1
explain: "TAB-PO 用置信度门控，只对低置信 preferred token 加入恢复项，避免无差别 SFT。"
```
