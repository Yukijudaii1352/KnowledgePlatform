### Chinchilla Laws

```yaml
id: chinchilla_law
name: Chinchilla Laws
full_name: 计算最优训练法则 (Training Compute-Optimal Large Language Models)
year: '2022.03'
org: DeepMind
paper_url: https://arxiv.org/abs/2203.15556
category: scaling
parent: kaplan_scaling
motivation: "提出20:1数据参数比的计算最优原则"
```

#### 📝 一句话总结

Chinchilla Laws 重新拟合了固定计算预算下参数量 \(N\) 与训练 token 数 \(D\) 的最优比例，指出当时许多大模型参数过多、数据过少。它提出计算最优训练应让模型参数和训练数据近似同比例扩展，经验上约为每个参数 20 个训练 token。

#### 🎯 核心要点

- 训练并分析 400 多个语言模型，参数规模从千万级到百亿级，训练 token 覆盖数十亿到数千亿
- 修正 Kaplan 的“模型优先”结论，认为计算最优时参数量 \(N\) 和训练 token 数 \(D\) 应近似等比例增长
- 给出经典损失形式 \(L(N,D)=E + A/N^\alpha + B/D^\beta\)，并在 \(C \approx 6ND\) 约束下求最优
- 提出广泛传播的 20 tokens/parameter 经验法则，例如 70B 参数模型应训练约 1.4T tokens
- 训练 70B Chinchilla，在相似训练计算下优于 280B Gopher，同时推理成本显著更低
- 将规模定律从“越大参数越好”转向“参数、数据、计算共同最优”的训练规划

#### 🔬 深入细节

![Chinchilla 计算最优缩放图](https://ar5iv.labs.arxiv.org/html/2203.15556/assets/x1.png)
*图：Chinchilla 论文主图，展示不同计算预算下模型大小和训练 token 数的计算最优关系。*

```python
# Chinchilla 计算最优训练规划伪代码
def chinchilla_plan(compute_budget):
    # 1. 基于一组小规模训练实验拟合 loss(N, D)
    params = fit_loss_model(
        formula="L = E + A / N**alpha + B / D**beta",
        runs=language_model_runs,
    )

    # 2. 在 C ~= 6ND 的约束下搜索最优参数量和 token 数
    best = None
    for N in candidate_parameter_counts:
        D = compute_budget / (6 * N)
        loss = params.E + params.A / N**params.alpha + params.B / D**params.beta
        best = min_by_loss(best, {"N": N, "D": D, "loss": loss})

    # 3. 工程近似：D / N 约为 20
    return best
```

**动机与背景：为什么 Kaplan 结论需要修正？** Kaplan 规模定律在 2020 年给出了强有力的可预测性证据，但它的实验分布中大量模型训练 token 相对不足，导致外推时更偏向增大参数量。DeepMind 观察到，Gopher、GPT-3、MT-NLG 等模型在 Chinchilla 视角下都属于“undertrained”：参数很大，但训练数据不足。问题不是这些模型不够大，而是在给定 FLOPs 下，过多计算被花在参数上，数据项成为更强瓶颈。

**核心机制：把 loss 显式拆成参数瓶颈和数据瓶颈。** Chinchilla 使用如下参数化损失：

$$
L(N,D)=E+\frac{A}{N^\alpha}+\frac{B}{D^\beta}
$$

其中 \(E\) 表示不可约损失，\(A/N^\alpha\) 是模型容量不足造成的误差，\(B/D^\beta\) 是训练数据不足造成的误差。训练计算约束为：

$$
C \approx 6ND
$$

在固定 \(C\) 下，如果 \(N\) 过大则 \(D\) 变小，数据误差项上升；如果 \(D\) 过大则 \(N\) 变小，容量误差项上升。Chinchilla 的拟合结果显示二者最优时应更平衡：计算预算翻倍时，参数量和训练 token 数都应大致翻倍。

**方法流程：三种估计方式交叉验证。** 论文不是只用一个公式拟合，而是使用三条互相校验的路线：固定模型大小、改变训练 token 数；固定 FLOPs、扫描不同 \(N,D\) 配比形成 IsoFLOP 曲线；直接拟合参数化 loss。三种方法都指向同一个结论：最优模型比当时主流模型更小，但训练 token 多得多。最终的 Chinchilla 模型选择 70B 参数和约 1.4T token，对应约 20 tokens/parameter。

**与 Kaplan 的区别：模型规模不是唯一优先项。** Kaplan 认为大模型样本效率更高，因此固定计算下应倾向于更大模型、较少数据和提前停止；Chinchilla 则指出这种配置在现代训练规模下会留下大量数据收益。它的实际影响很大：后续 LLaMA、Mistral、Gemma 等开放模型都采用“小于同代最大参数量、训练更多 token”的路线。推理上也有优势：70B Chinchilla 能在相似训练 FLOPs 下超过 280B Gopher，但部署成本只相当于后者一小部分。

> 💡 关键：Chinchilla 的 20:1 不是自然常数，而是基于当时数据、架构、优化器和目标函数的经验近似；真正重要的是“固定训练计算下要同时扩大参数和数据”。

#### 🧪 练习题

```yaml
question: "Chinchilla Laws 相比 Kaplan Scaling Laws 的核心修正是什么？"
options:
  - "认为参数量越大越好，训练 token 可以继续减少"
  - "认为计算最优训练需要更平衡地扩展参数量和训练 token 数"
  - "认为数据清洗比模型规模更重要，因此不需要规模定律"
  - "认为推理计算应完全替代预训练计算"
answer: 1
explain: "Chinchilla 通过新的 IsoFLOP 与参数化拟合发现，当时大模型普遍数据不足，固定计算下应增加训练 token 并使用相对更小的模型。"
```
