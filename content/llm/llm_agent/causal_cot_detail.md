### Causal CoT：因果思维链 (Causal CoT)
```yaml
id: causal_cot
name: Causal CoT
full_name: 因果思维链 (Causal CoT)
year: 2026
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/b7870bd43b2d133a1ed95582ae5d82a4-Abstract-Conference.html
category: frontier_2026
parent: cot
motivation: 因果充分性与必要性改进推理
```

#### 📝 一句话总结
Causal CoT 将 Pearl 式的必要且充分因果概率 PNS 引入 Chain-of-Thought 步骤筛选，通过反事实干预判断每个推理步骤是否真正影响最终答案。它解决了传统 CoT 同时存在的“推理不够充分”和“过度冗余”问题，把原始长链条重构为更短且仍能支撑正确答案的因果关键路径。

#### 🎯 核心要点
- 提出用 Probability of Necessity and Sufficiency (PNS) 评估 CoT 中单个步骤的因果贡献，而不是只看注意力、似然、消融准确率等相关性指标。
- 将 CoT 质量拆成两个目标：链级别 Probability of Sufficiency (PS) 保证推理链足以推出正确答案，节点级别 Probability of Necessity (PN) 判断某一步是否不可替代。
- 设计双层优化流程：先通过采样或重构提升整条链的充分性，再对每个步骤做反事实替换和 rollout，删除低 PNS 的冗余步骤。
- 框架包含 Base Model、Rollout Model、Answer Evaluator/Validator：前者生成初始 CoT，rollout 模型生成干预后的替代后续推理，验证器判断答案和逻辑是否仍成立。
- 支持 Direct Rollout、Prompt-Based Rollout、External Rollout 三类干预策略，用于产生与原步骤语义分离的替代步骤和后续链条。
- 输出的 compact CoT 可作为高质量示例用于 In-Context Learning，也可作为监督微调数据，让模型学习“必要且充分”的推理模式。
- 论文在 GSM-8k、MATH-500、AIME、CommonsenseQA 上评估推理效率和准确率，目标是在减少 token 和步骤数的同时保持或提升最终答案表现。

#### 🔬 深入细节
![Causal CoT 因果优化框架](https://arxiv.org/html/2506.09853v3/x3.png)
*图：Causal CoT 的因果优化框架。模型先生成可能冗余的初始 CoT，再对步骤做反事实替换和 rollout，用 PNS 选择保留的必要步骤，最后形成 compact CoT。*

```python
# Causal CoT: PNS-guided reconstruction of a reasoning chain

def optimize_causal_cot(question, initial_cot, gold_answer, threshold=0.5, rollouts=8):
    steps = split_into_steps(initial_cot)

    # 1. Chain-level sufficiency: the whole chain must support the answer.
    if answer_evaluator(question, steps) != gold_answer:
        return resample_or_repair_cot(question, gold_answer)

    compact = []
    prefix = []
    for step in steps:
        counterfactual_failures = 0

        # 2. Node-level necessity: replace this step and see whether correctness breaks.
        for _ in range(rollouts):
            alt_step = rollout_model.replace_step(
                question=question,
                prefix=prefix,
                original_step=step,
                require_semantic_disjointness=True,
            )
            alt_suffix = rollout_model.continue_reasoning(question, prefix + [alt_step])
            alt_chain = prefix + [alt_step] + alt_suffix
            alt_answer = answer_evaluator(question, alt_chain)
            counterfactual_failures += int(alt_answer != gold_answer)

        pns = counterfactual_failures / rollouts
        if pns >= threshold:
            compact.append(step)
            prefix.append(step)
        # else: the answer survives replacement, so the step is treated as redundant.

    return compact
```

Causal CoT 的出发点是：传统 CoT 的“长”不等于“可靠”。一条推理链可能包含三种状态：其一是足以推出答案但有大量无用步骤，即 sufficient but unnecessary；其二是某些局部步骤看似关键，但整条链还缺少必要推导，即 necessary but insufficient；其三才是论文想要的 sufficient and necessary，即每一步都对答案成立有实际贡献，且整条链足以支撑结论。已有压缩 CoT 或关键步骤识别方法常用相关性信号，例如 token 似然、注意力权重、删除某句后的准确率变化。这些信号能说明“看起来相关”，但不能说明“如果这个步骤被替换，答案是否会因果性改变”。论文因此把问题重新表述为步骤级因果归因。

论文先把 CoT 看成从问题到中间步骤再到答案的生成过程。给定问题 \(Q=q\)、步骤 \(S=(s_1,\ldots,s_n)\)、答案 \(A=a\)，CoT 的答案概率可写成：

$$
P(A=a\mid Q=q)\propto \int P(a\mid s_1,\ldots,s_n,q)\prod_{i=1}^{n}P(s_i\mid s_{<i},q)\,dS
$$

这个式子强调最终答案不是只由最后一句产生，而是由整条推理轨迹共同决定。Causal CoT 在这个轨迹上定义三类因果量。链级充分性 PS 衡量“如果插入这条推理链，原本错误或不完整的回答是否会变正确”：

$$
PS(S,q)=P(A_{\mathrm{do}(S)}=y\mid A\ne y,\bar S,q)
$$

节点级必要性 PN 衡量“如果把某个步骤 \(s_t\) 换成错误或语义分离的替代步骤，并让模型从该处继续 rollout，原本正确答案是否会失效”：

$$
PN(S,s_t,q)=P(A_{\mathrm{do}(s_{<t},\bar{s}_t,s'_{>t})}\ne y\mid A=y,S,q)
$$

最终的 PNS 则把“原链正确”和“反事实链错误”合在一起：

$$
PNS(S,s_t,q)=P(A_S=y, A_{S'}\ne y)
$$

直觉上，如果替换 \(s_t\) 以后答案经常仍然正确，那么这个步骤并不必要；如果替换后答案经常崩掉，且原链本身能推出正确答案，那么它就是 compact CoT 应保留的因果关键节点。实践中，论文用 Monte Carlo rollout 近似这个概率：

$$
\widehat{PNS}(s_t)=\frac{1}{K}\sum_{k=1}^{K}\mathbf{1}[V(q,S_{t}^{(k)})\ne y]
$$

其中 \(S_t^{(k)}\) 是第 \(k\) 次把 \(s_t\) 替换后生成的反事实链，\(V\) 是答案评估器或验证器。这个估计式的含义很直接：替换该步骤后越容易导致答案错误，说明原步骤越必要。

算法流程采用双层优化。第一层先检查整条初始 CoT 是否具有充分性，如果完整链都不能得到正确答案，直接做重采样或修复，因为对一条不充分链做“必要性剪枝”没有意义。第二层在链充分的前提下，按步骤执行反事实干预：移除或替换当前步骤，要求替代步骤与原步骤语义分离，再让 rollout 模型基于新前缀生成后续推理。验证器不仅检查最终答案是否等于 \(y\)，还可检查链条是否逻辑连贯。低于阈值的步骤被剪掉，高于阈值的步骤进入 compact CoT。

> 💡 关键：Causal CoT 不是简单让推理更短，而是用“答案是否因替换该步骤而改变”来定义短链条中每一步的必要性。短只是结果，因果必要性才是筛选准则。

这套方法和普通 CoT 压缩的差别在于，压缩方法往往把 token 数作为目标，容易删掉当前表述中不显眼但逻辑上不可缺的桥接步骤。Causal CoT 先要求 PS，再估计 PN，因此不会为了短而短。若一个步骤看似啰嗦，但替换后 rollout 经常让模型走向错误答案，它仍会被保留；若一个步骤措辞很长但被替换后答案不变，它会被判为冗余。论文进一步把 PNS 优化后的 CoT 用作 ICL 示例和 SFT 数据，使模型在生成时倾向输出“少而关键”的推理路径。

从训练和推理角度看，Causal CoT 更像一个数据重构器或推理示例优化器，而不是改动 Transformer 架构。它可以套在不同基础模型上：base model 负责原始答案与评分，rollout model 负责产生反事实后续链，external rollout 还可以用更强模型生成替代路径。论文在 Qwen 与 DeepSeek 系列上验证这种模型无关性，并用 token 长度、步骤数、最终答案准确率与平均 PNS 共同评估。核心收益是把“推理效率”与“推理忠实性”绑定起来，让缩短链条不再只依赖启发式摘要，而有明确的因果检验。

#### 🧪 练习题
```yaml
question: "Causal CoT 中 PNS 估计的核心作用是什么？"
options:
  - "衡量某个步骤被反事实替换后，正确答案是否会失效"
  - "计算每个 token 的语言模型困惑度"
  - "让模型生成更多不同风格的长 CoT"
  - "把所有中间步骤压缩成一个关键词"
answer: 0
explain: "PNS 关注原链正确且替换某一步后答案错误的概率，用来判断该步骤是否既充分又必要。"
```
