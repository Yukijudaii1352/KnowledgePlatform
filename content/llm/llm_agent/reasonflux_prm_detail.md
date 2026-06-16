### ReasonFlux-PRM：推理流过程奖励 (ReasonFlux-PRM)
```yaml
id: reasonflux_prm
name: ReasonFlux-PRM
full_name: 推理流过程奖励 (ReasonFlux-PRM)
year: 2026
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/26618fb384d3873b8ef6ab292a69095b-Abstract-Conference.html
category: frontier_2026
parent: retroformer
motivation: 轨迹感知长链推理过程奖励模型
```

#### 📝 一句话总结
ReasonFlux-PRM 提出面向 trajectory-response 长链推理数据的过程奖励模型，用步骤级奖励和轨迹级奖励共同评估中间思考轨迹，而不只评价最终回答。它解决了传统 PRM 难以监督 DeepSeek-R1 等推理模型产生的冗长、分支、自我修正型 thinking trajectory 的问题，并可用于离线数据筛选、在线 RL 奖励和 Best-of-N 测试时扩展。

#### 🎯 核心要点
- 明确区分 thinking trajectory 与 final response：前者是长、松散、可能包含探索和自我修正的中间思考，后者是更规范的最终解答步骤。
- 指出传统 PRM 多训练在 final response 上，对 trajectory-response 数据存在格式错配和奖励校准不足，容易筛出低质量蒸馏数据。
- 提出 trajectory-aware PRM，将每个中间步骤的 alignment、quality、coherence 三类信号聚合为步骤级奖励。
- 提出 template-guided trajectory-level reward，用专家 LLM 抽取高层解题模板，再测试策略模型按模板重解题目的成功率，从全局策略层面评估轨迹价值。
- 使用联合训练目标同时拟合 step-level reward 和 final/trajectory-level reward，使奖励模型兼顾局部推理质量和整体解题策略。
- 支持三类使用场景：离线筛选高质量 SFT 数据，在线为 GRPO/PPO/REINFORCE 提供过程奖励，推理时用 reward-guided Best-of-N 选择候选答案。
- 论文训练 ReasonFlux-PRM-1.5B 与 ReasonFlux-PRM-7B，并在 AIME24、AIME25、MATH500、GPQA-Diamond 上报告 SFT、RL、test-time scaling 的增益。

#### 🔬 深入细节
![ReasonFlux-PRM 方法设计](https://arxiv.org/html/2506.18896v2/plots/method_pipeline.png)
*图：ReasonFlux-PRM 的整体方法。模型在 trajectory-response 数据上学习步骤级和轨迹级奖励，再服务于离线数据筛选、在线策略优化和测试时 Best-of-N 选择。*

```python
# ReasonFlux-PRM training and usage, simplified from the paper

def train_reasonflux_prm(dataset, prm, verifier_llm, policy, encoder):
    for x, trajectory, final_response in dataset:
        step_targets = []
        response_steps = split_steps(final_response)

        for t, step in enumerate(trajectory):
            r_align = max_cosine(encoder(step), [encoder(a) for a in response_steps])
            r_quality = verifier_llm.judge_step_quality(x, trajectory[:t+1], final_response)
            r_coherence = contrastive_coherence(
                prev_step=trajectory[t-1] if t > 0 else x,
                current_step=step,
                negatives=sample_unrelated_steps(dataset),
                encoder=encoder,
            )
            weights = softmax([r_align, r_quality, r_coherence])
            r_step = weights[0] * r_align + weights[1] * r_quality + weights[2] * r_coherence
            step_targets.append(r_step)

        template = verifier_llm.extract_reasoning_template(x, trajectory, final_response)
        candidates = [policy.generate(x, template) for _ in range(N)]
        r_final = mean([is_correct(c) for c in candidates])

        prm.update_mse(
            predicted_step_rewards=prm.score_steps(x, trajectory, final_response),
            target_step_rewards=step_targets,
            predicted_final_reward=prm.score_trajectory(x, trajectory, final_response),
            target_final_reward=r_final,
        )


def offline_select(prm, traces, alpha=0.8, top_k=1000):
    scores = []
    for x, trajectory, final_response in traces:
        step_rewards = prm.score_steps(x, trajectory, final_response)
        final_reward = prm.score_trajectory(x, trajectory, final_response)
        score = mean(step_rewards) + alpha * final_reward
        scores.append((score, x, trajectory, final_response))
    return top_k_by_score(scores, top_k)
```

ReasonFlux-PRM 的核心背景是长链推理数据形态发生了变化。传统 PRM 通常假设输入是“问题 + 结构清晰的最终 CoT 回答”，然后给最终回答中的每一步打分。但 DeepSeek-R1、OpenAI-o1 类推理模型常输出 trajectory-response：先有很长的 thinking trajectory，里面包含试探、分支、反思、回退和冗余，再给出一个相对整洁的 final response。小模型蒸馏和后训练越来越依赖这类数据，问题是传统 PRM 并不知道中间 thinking trajectory 应如何评分。论文的预实验发现，用现有 PRM 直接给轨迹打分时，不同来源轨迹的得分分布重叠严重，用这些分数筛出的数据还可能不如人工精选数据。

论文把一个样本表示成 \((x,y)\)，其中 \(x\) 是题目，\(y=s\oplus a\) 是 thinking trajectory \(s=(s_1,\ldots,s_T)\) 与 final response \(a=(a_1,\ldots,a_M)\) 的拼接。标准 PRM 的目标是学习打分函数 \(R_\phi\)，让每个步骤的预测奖励接近参考奖励：

$$
\min_{\phi}\sum_{(x,y)\in\mathcal{D}}\sum_{t=1}^{T}\mathcal{L}\left(R_{\phi}(s_t\mid x,s_{<t},a), r_t\right)
$$

ReasonFlux-PRM 的不同之处在于重新构造 \(r_t\)。它不把 final response 的格式当作唯一标准，而是为 thinking trajectory 设计三个互补信号：alignment、quality、coherence。Alignment 衡量中间步骤与最终回答步骤的语义相关性，可抽象为：

$$
r_t^{\mathrm{ali}}=\max_j \cos(\Phi(s_t),\Phi(a_j))
$$

其中 \(\Phi\) 是预训练编码器。这个信号能惩罚完全跑题的中间思考，但如果只看 alignment，会误伤有用的探索步骤，因为一些中间探索不一定和最终答案措辞相似。因此论文再用强专家模型作为 judge 产生 quality score：

$$
r_t^{\mathrm{qua}}=J_{\mathrm{LLM}}(x,s_{\le t},a)
$$

这个分数关注步骤正确性、内部一致性、是否朝最终解推进。第三个 coherence score 用对比式互信息思想衡量相邻步骤是否连贯：

$$
r_t^{\mathrm{coh}}=\log\frac{\exp(\mathrm{sim}(\Phi(s_{t-1}),\Phi(s_t))/\tau)}{\sum_{s'\in\mathcal{N}}\exp(\mathrm{sim}(\Phi(s_{t-1}),\Phi(s'))/\tau)}
$$

其中 \(\mathcal{N}\) 是来自无关轨迹的负样本，\(\tau\) 是温度。这个项的直觉是：好的 thinking trajectory 不一定短，但相邻步骤应该语义和逻辑连续，而不是突然跳题。

三个步骤级信号用 softmax 自适应聚合：

$$
r_t^{\mathrm{step}}=\sum_{k\in\{\mathrm{ali},\mathrm{qua},\mathrm{coh}\}}\mathrm{softmax}(r_t^{\mathrm{ali}},r_t^{\mathrm{qua}},r_t^{\mathrm{coh}})_k\cdot r_t^k
$$

这比固定加权更稳，因为不同题目和不同阶段的轨迹可能依赖不同信号。例如早期探索步骤可能 alignment 低但 quality 高；最后收束步骤可能 alignment 和 coherence 都高。softmax 聚合让奖励模型在局部层面保留这种差异。

仅有步骤级奖励仍不够，因为一个轨迹的高层解题策略可能比单步措辞更重要。ReasonFlux-PRM 因此引入 template-guided trajectory-level reward：专家 LLM 先从完整输出 \(y\) 中抽取高层推理模板 \(T\)，然后策略模型在给定 \((x,T)\) 的条件下重新生成 \(N\) 个解答：

$$
y^{(1)},\ldots,y^{(N)}\sim\pi_\theta(\cdot\mid x,T)
$$

轨迹级奖励定义为这些候选答案的平均正确率：

$$
r^{\mathrm{final}}=\frac{1}{N}\sum_{j=1}^{N}\mathbf{1}[y^{(j)}\ \text{is correct}]
$$

如果一个轨迹能抽象出可复用的解题模板，并且其他生成过程按该模板也能解对题目，说明它不仅局部步骤像样，而且全局策略有效。这个设计把“思考轨迹是否有蒸馏价值”从文字表面对齐提升到策略可迁移性。

最终训练目标同时拟合步骤级和轨迹级监督：

$$
\mathcal{L}_{\mathrm{total}}=\lambda_{\mathrm{step}}\frac{1}{T}\sum_{t=1}^{T}\mathcal{L}_{\mathrm{step}}\left(R_{\phi}(s_t\mid x,s_{<t},a),r_t^{\mathrm{step}}\right)+\lambda_{\mathrm{final}}\mathcal{L}_{\mathrm{final}}\left(R_{\phi}(x,y),r^{\mathrm{final}}\right)
$$

论文采用 MSE 作为实践损失，\(\lambda_{\mathrm{step}}\) 和 \(\lambda_{\mathrm{final}}\) 控制局部与全局监督的权重。这个联合目标使 ReasonFlux-PRM 能输出两类分数：每一步的细粒度过程分数，以及整条 trajectory-response 的全局价值分数。

在离线数据筛选中，ReasonFlux-PRM 对每条轨迹计算聚合分数：

$$
\hat r=\frac{1}{T}\sum_{t=1}^{T}\hat r_t^{\mathrm{step}}+\alpha\hat r^{\mathrm{final}}
$$

然后取 top-K 作为小模型 SFT 数据。在线 RL 中，它把这个 PRM 分数并入 GRPO 的奖励，例如抽象地写成 \(r_{\mathrm{total}}=r_{\mathrm{rule}}+\beta\hat r\)，再做组归一化 advantage 和策略更新。测试时，它对同一问题的多个候选输出逐个打分，选择 \(\hat r\) 最高的候选作为 Best-of-N 结果。

> 💡 关键：ReasonFlux-PRM 的奖励对象不是“最终答案的一串整洁步骤”，而是“中间思考轨迹 + 最终回答”的整体。它承认长链推理会有探索和修正，因此用 alignment、quality、coherence、template transfer 四种视角共同判断轨迹是否值得学习。

论文报告了两个规模版本：ReasonFlux-PRM-1.5B 面向资源受限部署，ReasonFlux-PRM-7B 用于主要实验。训练数据来自公开 trajectory-response 推理轨迹并构造成约 10k 高质量样本，实验涉及 AIME24、AIME25、MATH500、GPQA-Diamond。相对于 Qwen2.5-Math-PRM 等强基线，ReasonFlux-PRM 的优势不是单一准确率数字，而是同一个奖励模型能跨 SFT 数据选择、RL 过程奖励、推理时选择三个阶段复用，形成从数据到训练再到推理的统一评价信号。

#### 🧪 练习题
```yaml
question: "ReasonFlux-PRM 为什么要同时使用步骤级奖励和轨迹级奖励？"
options:
  - "步骤级奖励衡量局部推理质量，轨迹级奖励衡量高层解题策略是否可复用"
  - "轨迹级奖励只用于减少模型参数量"
  - "步骤级奖励用于图像输入，轨迹级奖励用于文本输入"
  - "两者完全等价，只是为了增加训练损失项数量"
answer: 0
explain: "ReasonFlux-PRM 面向 trajectory-response 数据，既要判断每一步是否正确连贯，也要判断整条思考策略能否迁移并导向正确答案。"
```
