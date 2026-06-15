### ReasonFlux-PRM：面向长链推理轨迹的过程奖励模型

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

ReasonFlux-PRM 针对长链思考轨迹训练过程奖励模型，在每个推理步骤同时建模与最终答案的一致性、局部质量和相邻步骤连贯性。

#### 🎯 核心要点

- **核心问题**：传统 PRM 常面向短步骤或最终回答，难以评价 DeepSeek-R1 类模型产生的长思考轨迹。
- **轨迹感知**：奖励不只看单步正确性，还看中间步骤与最终响应、前后步骤之间的关系。
- **三类信号**：alignment、quality 和 coherence 共同形成步骤级监督。
- **使用场景**：支持离线数据筛选、在线策略优化和 Best-of-N 测试时扩展。
- **结果意义**：把过程奖励从“评价答案片段”推进到“评价完整推理流”。

#### 🔬 深入细节

![ReasonFlux-PRM method pipeline](https://arxiv.org/html/2506.18896v2/plots/method_pipeline.png)

*图源：arXiv HTML 论文方法图，展示 ReasonFlux-PRM 的轨迹奖励构造、训练和应用流程。*

```python
def train_reasonflux_prm(dataset):
    targets = []
    for x, trajectory, final_answer in dataset:
        steps = split_reasoning_steps(trajectory)
        final_units = split_final_answer(final_answer)
        for t, step in enumerate(steps):
            align = alignment_score(step, final_units)
            quality = expert_judge_score(x, steps[: t + 1], final_answer)
            coherence = contrastive_coherence(steps[t - 1], step) if t > 0 else 1.0
            reward = w1 * align + w2 * quality + w3 * coherence
            targets.append((x, steps[: t + 1], reward))
    prm = fit_reward_model(targets)
    return prm

def best_of_n(prm, model, question, n):
    candidates = [model.generate_with_trace(question) for _ in range(n)]
    return max(candidates, key=lambda c: prm.score(question, c.trace))
```

**方法动机**：长链推理模型的输出通常包含“思考轨迹 + 最终答案”，而传统 PRM 往往只对局部步骤或最终响应给分。ReasonFlux-PRM 把轨迹写成 $\tau=(s_1,\dots,s_T,y)$，目标是学习 $R_\phi(x,s_{\le t})$，使每个前缀都能被合理评价。

**奖励构造**：论文将步骤奖励拆为三部分：与最终答案的 alignment、步骤自身逻辑质量 quality、相邻步骤连贯性 coherence。可概括为 $r_t=\lambda_a r_t^{align}+\lambda_q r_t^{qual}+\lambda_c r_t^{coh}$，这比只标注“该步是否正确”更适合长轨迹。

**训练与应用**：ReasonFlux-PRM 用带轨迹的推理样本训练奖励模型，之后可在三个阶段使用：离线筛选更高质量 SFT 数据，在线强化学习中作为过程奖励，测试时对多个候选轨迹做 Best-of-N 选择。三种用法分别对应数据、训练和推理扩展。

**方法价值**：长链推理的错误常不是某一步孤立错误，而是前后目标漂移、局部推断与最终答案不一致或推理流断裂。轨迹感知 PRM 直接评价这些关系，因此更适合监督和筛选长 CoT 模型生成的复杂推理过程。

#### 🧪 练习题

```yaml
question: ReasonFlux-PRM 为什么要引入 coherence 奖励？
options:
  - A. 衡量相邻推理步骤之间是否连贯
  - B. 统计文件大小
  - C. 控制网页颜色
  - D. 删除最终答案
answer: A
explain: coherence 用于刻画推理流中前后步骤的连接质量，帮助发现长链推理中的断裂和漂移。
```
