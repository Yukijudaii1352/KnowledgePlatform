### 因果思维链 (Causal CoT)
```yaml
id: causal_cot
name: Causal-CoT
full_name: 因果思维链 (Causal CoT)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html
category: frontier_2026
parent: cot
motivation: 因果分析消除幻觉提升逻辑严密性
```

#### 📝 一句话总结
Causal-CoT 用因果充分性与必要性评估 CoT 中每个推理步骤的真实贡献，通过反事实 rollout 保留既能支撑答案又不可替代的步骤，从而压缩冗余推理并减少幻觉。

#### 🎯 核心要点
- 针对普通 CoT 的两类问题：步骤不足导致结论缺证据，步骤冗余导致过度推理与 token 浪费。
- 引入 Probability of Sufficiency (PS)、Probability of Necessity (PN) 和 Probability of Necessary and Sufficient Cause (PNS) 描述推理链与步骤的因果贡献。
- 先做 chain-level PS 判断整条 CoT 是否足以得到正确答案，再做 node-level PN/PNS 判断单个步骤是否不可替代。
- 通过 counterfactual intervention 替换或移除步骤，并让 rollout model 生成后续链条来估计该步骤的必要性。
- 用阈值 \(\alpha\) 剪枝低 PNS 步骤，得到 compact CoT，再用于 in-context learning 或 supervised fine-tuning。
- 论文在 GSM-8K、MATH-500、AIME、CommonsenseQA 等数学与常识推理基准上报告了更短推理链和更高/相近准确率。

#### 🔬 深入细节
![Causal-CoT 因果优化框架](https://arxiv.org/html/2506.09853v3/x3.png)
*图：Causal Optimization Framework for CoT Reasoning。初始 CoT 经 PS/PNS 评估、反事实干预和剪枝后形成 compact CoT，并用于 ICL 或 SFT。*

```python
# Sufficient and Necessary Optimization of CoT 伪代码
def causal_cot_optimize(S_init, q, y, alpha, rollout_model, validator, k):
    # PS: 先确认完整链条是否足以得到正确答案
    y_hat = rollout_answer(S_init, q)
    if y_hat != y:
        return S_init  # 单次运行不剪枝；实践中可重采样更充分的 CoT

    S_final = []
    S_current = list(S_init)

    for step_index, s_t in enumerate(S_current):
        prefix = S_final + S_current[len(S_final):step_index]

        # 对当前步骤做反事实替换/删除，再 rollout 后续步骤
        scores = []
        for _ in range(k):
            s_alt = generate_alternative(prefix, s_t)
            S_counterfactual = rollout_model.continue_chain(
                question=q,
                prefix=prefix + [s_alt],
            )
            # validator 判断反事实链是否仍能保持正确、连贯和逻辑完整
            scores.append(validator(S_counterfactual, answer=y))

        pns = 1.0 - sum(scores) / k
        if pns > alpha:
            S_final.append(s_t)   # 替换后会坏，说明原步骤必要，保留
        else:
            pass                  # 替换后仍可行，说明原步骤冗余，剪掉

    return S_final
```

普通 CoT 把推理过程写成线性文本，但线性文本无法保证每一步都真正支撑最终答案。论文把问题拆成两个因果标准：充分性要求整条推理链足以推出答案；必要性要求某个中间步骤一旦被替换或移除，答案或逻辑完整性就会受损。前者防止“跳步”，后者防止“过度解释”。

论文用 Pearl 因果框架重写这些概念。对推理链 \(S=(s_1,\dots,s_n)\)，PS 衡量把 \(S\) 作为干预插入后是否能把错误答案变为正确答案：
$$
\mathrm{PS}(S,q)=P(A_{\mathrm{do}(S)}=y\mid A\ne y,\bar{S},q).
$$
对具体步骤 \(s_t\)，PN 衡量把该步骤替换为错误或替代步骤 \(\bar{s}_t\)，并重新生成后续步骤 \(s'_{>t}\) 后，正确答案是否被破坏：
$$
\mathrm{PN}(S,s_t,q)=P(A_{\mathrm{do}(s_{<t},\bar{s}_t,s'_{>t})}\ne y\mid A=y,S,q).
$$
PNS 则关注“原链正确且反事实链错误”的联合事件：
$$
\mathrm{PNS}(S,s_t,q)=P(A_S=y,\;A_{S'}\ne y).
$$

直接最大化完整 PNS 很昂贵，因此方法采用两阶段近似。第一阶段把 chain-level PS 近似为二值：如果当前 CoT 产生正确答案，则 \(\mathrm{PS}=1\)，否则不对它做必要性剪枝，并可通过重复采样寻找更充分的链。第二阶段在 \(\mathrm{PS}=1\) 的链上逐节点估计 PN/PNS，只保留对正确推理有因果贡献的步骤。

PNS 的估计依赖反事实 rollout。对于每个步骤 \(s_t\)，系统构造一个与原步骤语义分离的替代步骤 \(\bar{s}_t\)，再让 rollout model 从前缀和替代步骤继续生成后续链 \(S^{(i)}\)。validation model \(V\) 不只检查最终答案，还检查推理是否连贯、逻辑是否完整。论文用 Monte Carlo 形式估计：
$$
\mathrm{PNS}(S,s_t,q)\approx 1-\frac{1}{k}\sum_{i=1}^{k}V(S^{(i)}).
$$
如果替换后大多数 rollout 仍然被验证为有效，说明原步骤不是必要条件，可以剪掉；如果替换后经常失败，原步骤的 PNS 高，应保留。

这与常见的 CoT 压缩不同。简单压缩通常按长度、困惑度或句子重要性删减文本，可能删掉对最终答案关键但表面不显著的步骤；Causal-CoT 则通过“干预后答案是否仍成立”来判断必要性。它也不同于 self-consistency：self-consistency 汇总多条链的答案，Causal-CoT 要重构一条更短、更因果忠实的链，并把这些 compact CoT 用作 ICL 示例或 SFT 数据。

> ⚠️ 注意：Causal-CoT 的收益依赖 validator 和 rollout model 的可靠性。如果验证器只看最终答案而忽略中间逻辑，PNS 会把“碰巧答对”的反事实链误判为有效，从而过度剪枝。

#### 🧪 练习题
```yaml
question: "Causal-CoT 中某个步骤的 PNS 高通常意味着什么？"
options:
  - "该步骤被反事实替换后推理更容易失败，因此它对正确答案具有必要贡献"
  - "该步骤越长越好，应无条件保留所有长步骤"
  - "该步骤与问题无关，可以直接删除"
  - "该步骤只提高输出格式，不影响推理结果"
answer: 0
explain: "PNS 近似为 1 减去反事实链仍有效的比例；值高说明替换后多数 rollout 不能维持正确和连贯推理。"
```
