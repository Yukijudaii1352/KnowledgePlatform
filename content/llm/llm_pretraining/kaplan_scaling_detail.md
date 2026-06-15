### OpenAI Scaling Laws

```yaml
id: kaplan_scaling
name: OpenAI Scaling Laws
full_name: OpenAI规模定律 (Scaling Laws for Neural Language Models)
year: '2020'
org: OpenAI
paper_url: https://arxiv.org/abs/2001.08361
category: scaling
parent: —
motivation: 幂律公式揭示模型性能与N/D/C关系
```

#### 📝 一句话总结

OpenAI Scaling Laws 系统拟合了语言模型交叉熵损失与参数量 \(N\)、数据量 \(D\)、训练计算量 \(C\) 之间的幂律关系，说明模型性能可以在多个数量级上被平滑外推。它给出了固定计算预算下的资源分配原则：更大的模型更样本高效，早期结论倾向于用更大模型、较少数据并提前停止训练。

#### 🎯 核心要点

- 以 Transformer 语言模型为对象，跨越多个数量级训练规模拟合 \(N\)、\(D\)、\(C\) 与 loss 的关系
- 核心经验式：当其他因素不构成瓶颈时，测试损失分别随参数量、数据量和最优计算量呈幂律下降
- 训练计算近似为 \(C \approx 6ND\)，将模型规模、训练 token 数和 FLOPs 放在同一预算框架中
- 提出固定计算预算下的最优分配：Kaplan 结论认为应优先增大模型，并在未完全收敛前停止
- 观察到架构细节影响弱于总规模，宽度/深度比例等超参数在合理范围内不是主导因素
- 为后续 Chinchilla、数据受限规模定律、推理时缩放定律提供了基线公式和实验范式

#### 🔬 深入细节

![OpenAI Scaling Laws 总览图](https://ar5iv.labs.arxiv.org/html/2001.08361/assets/x1.png)
*图：论文 Figure 1，语言模型 loss 随模型参数量、数据量和训练计算量平滑下降，三者都需要协同扩展。*

```python
# OpenAI Scaling Laws 拟合与使用流程伪代码
def fit_openai_scaling_law(training_runs):
    # 每条 run 包含参数量 N、训练 token 数 D、计算量 C、验证 loss L
    clean = remove_bottlenecked_runs(training_runs)

    # 分别拟合单因素幂律，估计不可约 loss L_inf 和指数
    fit_N = fit_power_law(clean, x="N", y="loss", hold_non_bottleneck=True)
    fit_D = fit_power_law(clean, x="D", y="loss", hold_non_bottleneck=True)
    fit_C = fit_power_law(clean, x="C_min", y="loss", hold_non_bottleneck=True)

    # 在固定 FLOPs 下搜索最优 N 与 D
    best = None
    for N in candidate_model_sizes:
        D = compute_budget / (6 * N)
        predicted_loss = loss_model(N=N, D=D, fits=(fit_N, fit_D, fit_C))
        best = min_by_loss(best, (N, D, predicted_loss))
    return best
```

**动机与背景：把大模型训练从经验工程变成可预测外推。** 论文之前，大规模语言模型训练主要依赖少量昂贵实验和经验判断：该增加参数、增加数据，还是延长训练步数并不清楚。OpenAI 的做法是把许多不同规模的 Transformer 训练 run 放在同一坐标系中，度量 held-out cross-entropy loss，并检查在非瓶颈条件下 loss 是否与资源规模呈稳定的 log-log 线性关系。其核心发现是：只要没有被数据、模型或计算中的另一项卡住，loss 与规模之间的关系非常平滑，可以用于预测更大训练 run 的收益。

**核心机制：用幂律分解三个主要瓶颈。** 论文将测试损失写成近似的幂律形式：

$$
L(N) \approx \left(\frac{N_c}{N}\right)^{\alpha_N}, \quad
L(D) \approx \left(\frac{D_c}{D}\right)^{\alpha_D}, \quad
L(C_{\min}) \approx \left(\frac{C_c}{C_{\min}}\right)^{\alpha_C}
$$

这里 \(N\) 是非 embedding 参数量，\(D\) 是训练 token 数，\(C_{\min}\) 是达到给定 loss 所需的最小计算量。直觉是：当模型太小，更多数据无法完全转化为性能；当数据太少，模型会被数据瓶颈限制；当计算不足，训练尚未抵达对应规模的可达 loss。把三种瓶颈分别拟合后，就可以在固定预算 \(C \approx 6ND\) 下寻找最优 \(N,D\) 组合。

**训练流程与资源分配：大模型更样本高效。** Kaplan 论文的一个重要结论是，大模型在相同 loss 目标下需要更少训练样本，因此在固定计算预算下，最优策略不是把小模型训练到完全收敛，而是训练更大的模型并提前停止。论文给出的外推显示，最优数据量增长慢于计算量增长，常被概括为 \(D_{\text{opt}}\sim C^{0.27}\)、\(N_{\text{opt}}\sim C^{0.73}\)。这解释了当时“模型优先”的训练直觉，也直接影响了 GPT-3 时代的训练规划。

**与传统调参的区别：从单点 benchmark 转向曲线预测。** 传统模型比较常看某个固定训练预算下的最终指标，而规模定律关心的是一族训练 run 的趋势是否可外推。它的价值不只是解释已有实验，而是帮助在大训练之前估计“再投入 10 倍计算会换来多少 loss 改善”。不过该论文后续也被 Chinchilla 修正：Kaplan 数据中许多大模型训练 token 不足，导致它低估了数据规模的重要性。换言之，Kaplan 是规模定律范式的奠基版本，而不是最终的计算最优答案。

> 💡 关键：Kaplan 规模定律最重要的贡献不是某个具体指数，而是证明了语言模型 loss 在大范围内可被简单幂律预测，从而让大模型训练预算分配有了可量化依据。

#### 🧪 练习题

```yaml
question: "Kaplan Scaling Laws 在固定训练计算预算下给出的核心资源分配倾向是什么？"
options:
  - "优先训练小模型到完全收敛"
  - "优先增大模型规模，并在尚未完全收敛时停止训练"
  - "固定模型规模，只增加数据清洗强度"
  - "只增加 batch size，不改变参数量和数据量"
answer: 1
explain: "Kaplan 论文认为大模型更样本高效，因此固定 FLOPs 下应将更多计算分配给更大的模型，而不是把小模型训练到收敛。"
```
