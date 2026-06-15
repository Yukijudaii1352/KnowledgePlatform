### T²缩放定律

```yaml
id: t2_scaling
name: T²缩放定律
full_name: T²缩放定律 (Train-to-Test Scaling Laws)
year: '2026'
org: 多机构
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
category: scaling
parent: chinchilla_law
motivation: 推理最优的过度训练策略
```

#### 📝 一句话总结

T²（Train-to-Test）缩放定律把预训练规模 \(N,D\) 和测试时采样次数 \(k\) 放到同一个端到端计算预算里联合优化，解决了 Chinchilla 只考虑训练 FLOPs、不考虑部署推理成本的问题。结论是：当推理时需要 repeated sampling 或 pass@k 时，计算最优模型会明显转向“小模型、更多训练 token、更多测试样本”的过度训练区域。

#### 🎯 核心要点

- manifest 给出的 `paper_url` 是 scaling laws 综述页；方法细节可由公开论文 *Test-Time Scaling Makes Overtraining Compute-Optimal* 补足
- 将训练预算 \(6ND\) 与推理预算 \(2Nk\) 联合建模，优化变量从 Chinchilla 的 \(N,D\) 扩展到 \(N,D,k\)
- 用 pass@k / repeated sampling 描述测试时缩放：同一个模型生成多个候选答案，成功率随 \(k\) 上升
- 发现纳入推理成本后，计算最优前沿显著偏离 20 tokens/parameter，进入更小模型、更高 tokens/parameter 的过度训练区
- 在 8 个下游任务和大量小模型训练实验上验证预测，额外训练的过度训练模型优于仅按预训练 loss 规划的模型
- 结果在后训练阶段仍有意义，说明推理成本应进入现代 LLM 的训练决策

#### 🔬 深入细节

![Train-to-Test Scaling 主图](https://ar5iv.labs.arxiv.org/html/2604.01411/assets/x1.png)
*图：T² 论文主图，展示将训练和测试时采样联合考虑后，计算最优区域向过度训练小模型移动。*

```python
# T² 端到端计算预算优化伪代码
def train_to_test_scaling(total_budget, query_count):
    best = None
    for N in candidate_model_sizes:
        for D in candidate_training_tokens:
            train_cost = 6 * N * D
            if train_cost >= total_budget:
                continue

            # 剩余预算用于测试时 repeated sampling
            max_k = int((total_budget - train_cost) / (query_count * 2 * N))
            for k in range(1, max_k + 1):
                base_acc = predict_single_sample_accuracy(N, D)
                pass_at_k = 1 - (1 - base_acc) ** k
                score = utility(pass_at_k, cost=train_cost + query_count * 2 * N * k)
                best = max_by_score(best, {"N": N, "D": D, "k": k, "score": score})
    return best
```

**动机与背景：Chinchilla 只优化训练，不优化服务期总成本。** Chinchilla 的预算约束是 \(C_{\text{train}}\approx 6ND\)，适合规划一次预训练 run。但现代 LLM 的许多能力来自测试时扩展：多次采样、best-of-N、自一致性投票、代码/数学任务的 pass@k，以及更复杂的推理搜索。部署时，如果一个模型要被调用很多次，推理成本会累计到训练成本同一量级，甚至更高。T² 的核心问题是：如果未来使用模型时还要花大量 inference FLOPs，预训练时还应按 20:1 训练吗？

**核心机制：把 \(N,D,k\) 放进同一个优化问题。** T² 将端到端预算写成训练成本加推理成本：

$$
B \approx 6ND + Q \cdot 2Nk
$$

其中 \(Q\) 是预计查询数，\(k\) 是每题采样次数。大模型提高单次采样质量，但每次采样更贵；小模型单次质量较低，但可以用相同预算采更多次。若任务指标接近 pass@k：

$$
\text{pass@}k = 1 - (1-p(N,D))^k
$$

那么最佳选择不一定是单次最强模型，而可能是一个训练更充分的小模型配合更大的 \(k\)。这正是 T² 所说的 train-to-test tradeoff。

**方法流程：先拟合预训练到任务表现，再联立测试时缩放。** 论文使用两类建模路线交叉验证：一类先建模 \(N,D\) 对任务 loss 的影响，再映射到测试表现；另一类直接建模任务准确率或 pass@k 对 \(N,D,k\) 的响应。随后在固定总预算下搜索最优组合，并额外训练落在预测最优区域的过度训练模型。实验结论一致：当推理采样成为预算的一部分时，传统 Chinchilla 前沿会选择过大的模型和过少的训练 token。

**与传统预训练规模定律的区别：过度训练从“浪费”变成“部署最优”。** 在只看训练 loss 的视角下，小模型训练远超 20 tokens/parameter 可能被认为不经济，因为继续训练的 loss 回报递减。但若这个小模型未来要被多次采样，降低每次推理成本会带来复利：更小的 \(N\) 让同样预算支持更大的 \(k\)，更多训练 token 又提高每个样本的基础质量。T² 因此把“过度训练”重新定义为在端到端预算下合理的资源转移。

> 💡 关键：T² 的核心不是说所有模型都应该更小，而是说如果任务依赖测试时缩放，训练规划必须提前纳入预计推理次数和采样策略。

#### 🧪 练习题

```yaml
question: "T² 缩放定律为什么会偏向过度训练的小模型？"
options:
  - "小模型的单次输出一定比大模型更准确"
  - "小模型推理更便宜，可在同一端到端预算下支持更多采样次数 k"
  - "过度训练可以消除所有数据噪声"
  - "T² 假设训练计算不占预算"
answer: 1
explain: "T² 同时计算训练和推理成本；当 pass@k 重要时，较小但训练更充分的模型可用更低推理成本换取更多采样。"
```
