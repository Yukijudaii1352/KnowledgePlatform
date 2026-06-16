### OpenAI规模定律 (Scaling Laws for Neural Language Models)
```yaml
id: kaplan_scaling
name: OpenAI Scaling Laws
full_name: OpenAI规模定律 (Scaling Laws for Neural Language Models)
year: "2020"
org: OpenAI
paper_url: https://arxiv.org/abs/2001.08361
category: scaling
parent: "—"
motivation: 幂律公式揭示模型性能与N/D/C关系
```

#### 📝 一句话总结
Kaplan Scaling Laws 提出用幂律统一描述 Transformer 语言模型损失与参数量 \(N\)、数据量 \(D\)、训练计算量 \(C\) 的关系，解决了“大模型训练预算如何分配”的经验预测问题。论文的核心结论是：性能主要由规模决定，架构形状影响较弱；在固定计算预算下，OpenAI 2020 的估计倾向于把更多新增计算投入模型参数，而不是把模型训练到完全收敛。

#### 🎯 核心要点
- 将语言模型交叉熵损失建模为参数量、数据量、计算量的幂律函数，覆盖多数量级实验范围。
- 实验对象是自回归 Transformer，主要在 WebText2 上以 1024-token 上下文训练并评估测试损失。
- 区分非 embedding 参数 \(N\)、数据 token 数 \(D\)、训练 compute \(C\)、最小 compute \(C_{\min}\)、临界 batch size \(B_{crit}\)。
- 提出单变量规模律：\(L(N)\)、\(L(D)\)、\(L(C_{\min})\) 均近似服从幂律下降。
- 提出联合模型-数据公式 \(L(N,D)\)，解释过拟合与数据不足时的收益递减。
- 发现模型形状如深度、宽度、attention heads 在合理范围内影响较弱，非 embedding 参数规模更关键。
- 得到固定 compute 下的分配建议：\(N\propto C_{\min}^{0.73}\)、\(B\propto C_{\min}^{0.24}\)、\(S\propto C_{\min}^{0.03}\)，数据需求约随 \(C^{0.27}\) 缓慢增长。
- 强调大模型更 sample-efficient，计算最优训练通常应早停，而不是把较小模型训练到收敛。

#### 🔬 深入细节

![Kaplan Scaling Laws Figure 1](https://ar5iv.labs.arxiv.org/html/2001.08361/assets/x1.png)
*图：论文 Figure 1 展示测试损失随训练 compute、数据集大小、非 embedding 参数量平滑下降，并可被幂律拟合。*

```python
# Kaplan Scaling Laws 的经验拟合流程伪代码
runs = []
for N in model_sizes:                  # 非 embedding 参数量，从小模型到十亿级模型
    for D in dataset_sizes:            # WebText2 子集 token 数
        for schedule in train_settings:
            model = Transformer(params=N, context=1024)
            curve = train_autoregressive_lm(model, tokens=D, schedule=schedule)
            runs.append({"N": N, "D": D, "C": estimate_flops(curve), "loss": test_loss(curve)})

# 1. 在数据充足时拟合 L(N)
fit_power_law(x=[r.N for r in converged_large_data_runs], y=[r.loss for r in runs])

# 2. 在模型足够大、早停时拟合 L(D)
fit_power_law(x=[r.D for r in dataset_limited_runs], y=[r.loss for r in runs])

# 3. 在每个 compute 预算下取最优模型，拟合 L(C_min)
frontier = lower_envelope(runs, key="C", value="loss")
fit_power_law(x=[p.C_min for p in frontier], y=[p.loss for p in frontier])

# 4. 用联合公式预测过拟合边界和 compute-optimal 分配
for C_budget in budgets:
    choose N, batch_size, steps to minimize predicted_loss(N, D, C_budget)
```

论文的出发点不是提出一个新网络结构，而是把语言模型训练看成一个可预测的工程系统。作者把性能指标固定为自回归语言模型的 token 平均交叉熵 \(L\)，把模型规模固定为不含词表和位置 embedding 的参数量 \(N\)，把数据规模固定为训练语料 token 数 \(D\)，再用近似 \(C\approx 6NBS\) 估计非 embedding 训练计算量。这样做的关键好处是消除 embedding 参数、context 相关项、深宽比例等二阶因素，让不同深度和宽度的 Transformer 能落到同一条主趋势线上。

单变量规模律是整篇论文的入口。在其他因素不成为瓶颈时，测试损失可写成：

$$
L(N)=\left(\frac{N_c}{N}\right)^{\alpha_N},\quad \alpha_N\approx 0.076,\quad N_c\approx 8.8\times 10^{13}
$$

$$
L(D)=\left(\frac{D_c}{D}\right)^{\alpha_D},\quad \alpha_D\approx 0.095,\quad D_c\approx 5.4\times 10^{13}
$$

$$
L(C_{\min})=\left(\frac{C_c^{\min}}{C_{\min}}\right)^{\alpha_C^{\min}},\quad \alpha_C^{\min}\approx 0.050,\quad C_c^{\min}\approx 3.1\times 10^8\ \text{PF-days}
$$

这些指数都很小，直觉上意味着 scale 的收益稳定但有强烈边际递减：参数、数据或 compute 翻倍时，loss 只会按一个小指数下降。论文重要的工程价值也来自这里：如果早期训练曲线已经落在幂律上，就可以外推更大模型或更长训练后的损失，而不必完整训练所有候选模型。

为了刻画“模型太大但数据不够”或“数据很多但模型太小”的瓶颈，论文把 \(L(N)\) 和 \(L(D)\) 合成联合公式：

$$
L(N,D)=\left[\left(\frac{N_c}{N}\right)^{\alpha_N/\alpha_D}+\frac{D_c}{D}\right]^{\alpha_D}
$$

当 \(D\to\infty\) 时，第二项消失，公式退化为模型受限的 \(L(N)\)；当 \(N\to\infty\) 时，第一项消失，公式退化为数据受限的 \(L(D)\)。这也是“过拟合程度主要由 \(N^{0.74}/D\) 之类比例控制”的来源：因为 \(\alpha_N/\alpha_D\approx 0.8\)，模型变大时数据也要增长，但可低于线性增长。

训练动态部分进一步说明，大模型并不只是最终 loss 更低，它们在达到同一 loss 时需要更少样本。论文用临界 batch size \(B_{crit}\) 和最小训练步数 \(S_{\min}\) 描述时间与计算效率的折中：batch 太小会浪费并行性，batch 太大会出现收益递减。由学习曲线公式和 \(B_{crit}\) 公式推导，固定 compute 下最优策略近似满足：

$$
N\propto C_{\min}^{0.73},\quad B\propto C_{\min}^{0.24},\quad S\propto C_{\min}^{0.03},\quad D=B\cdot S\propto C_{\min}^{0.27}
$$

这组指数后来成为 Chinchilla 论文重点修正的对象。Kaplan 结论认为新增预算主要应扩大模型，数据和串行训练步数增长较慢，因此会得到“训练很大的模型但远未收敛”的计算最优方案。它在 2020 年极大推动了大模型预训练的可预测化，但也因为实验中 token 数和学习率 schedule 的处理方式，低估了增加训练 token 的价值。

与传统调参经验相比，这篇论文的创新在于把“大模型越大越好”转化为可用于预算规划的幂律方程。传统做法往往只比较几个模型大小的最终指标，无法回答“给定 10 倍 compute 应该增大模型、数据还是训练步数”。Kaplan Scaling Laws 给出的答案虽然后来被 Chinchilla 修正，但它奠定了 scaling-law 研究的基本语言：先拟合 loss surface，再沿 compute 约束求最优 frontier。

> 💡 关键：Kaplan Scaling Laws 的贡献不是某个单独公式，而是证明 LLM 预训练损失在 \(N,D,C\) 上具有稳定、可外推的幂律结构，从而让“大规模训练”从经验赌博变成预算优化问题。

#### 🧪 练习题
```yaml
question: "Kaplan Scaling Laws 中，固定 compute 下最核心的预算分配结论是什么？"
options:
  - "主要增加模型参数，并较早停止训练，而不是把小模型训练到完全收敛"
  - "主要增加训练 epoch，模型参数保持不变"
  - "只要增大 batch size，模型大小和数据量都不重要"
  - "embedding 参数数量比非 embedding 参数更能预测损失"
answer: 0
explain: "论文推导出 N 随 compute 的指数约为 0.73，远高于训练步数的约 0.03，因此其计算最优建议偏向训练更大的模型并早停。"
```
