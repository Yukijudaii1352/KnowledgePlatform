### 计算最优训练法则 (Training Compute-Optimal Large Language Models)
```yaml
id: chinchilla_law
name: Chinchilla Laws
full_name: 计算最优训练法则 (Training Compute-Optimal Large Language Models)
year: "2022.03"
org: DeepMind
paper_url: https://arxiv.org/abs/2203.15556
category: scaling
parent: kaplan_scaling
motivation: 提出20:1数据参数比的计算最优原则
```

#### 📝 一句话总结
Chinchilla Laws 重新估计了固定训练 FLOPs 下参数量 \(N\) 与训练 token 数 \(D\) 的最优分配，指出当时许多大模型“参数过大、数据训练不足”。它提出 compute-optimal LLM 应大致等比例扩大参数和数据，经验上接近每个参数约 20 个训练 token 的原则。

#### 🎯 核心要点
- 用 400 多个语言模型实验重新估计 \(N_{opt}(C)\) 与 \(D_{opt}(C)\)，模型规模从约 70M 到 16B+ 参数，训练 token 从 5B 到 500B+。
- 明确优化目标：在 \(\mathrm{FLOPs}(N,D)=C\) 约束下最小化最终预训练损失 \(L(N,D)\)。
- 提出三种互相验证的方法：固定模型大小扫 token、IsoFLOP 曲线、参数化损失函数拟合。
- 参数化损失采用 \(\hat L(N,D)=E+A/N^\alpha+B/D^\beta\)，把模型容量不足和数据/优化不足分解为两个幂律项。
- 三种方法均得到接近等比例的 scaling：\(N_{opt}\propto C^{0.46\sim0.50}\)，\(D_{opt}\propto C^{0.50\sim0.54}\)。
- 与 Kaplan 2020 的 \(N\propto C^{0.73},D\propto C^{0.27}\) 明显不同，Chinchilla 大幅提高了训练数据的重要性。
- 用 Gopher 相同计算预算训练 70B Chinchilla、1.4T tokens，相比 280B Gopher 用 4 倍更少参数和约 4 倍更多数据取得更好下游性能。
- 给出现代预训练常用启发式：compute-optimal 模型大约训练 20 tokens/parameter。

#### 🔬 深入细节

![Chinchilla compute-optimal frontier](https://ar5iv.labs.arxiv.org/html/2203.15556/assets/x1.png)
*图：论文 Figure 1 对比三种方法预测的最优参数量与 FLOPs 关系，并标出 Chinchilla、Gopher、GPT-3、MT-NLG；三种方法都认为当时大模型普遍应更小但训练更久。*

```python
# Chinchilla Laws 的核心估计流程伪代码
runs = []
for N in model_sizes:                       # 约 70M 到 16B+ 参数
    for D in token_budgets:                 # 约 5B 到 500B+ tokens
        model = train_lm(params=N, tokens=D, lr_schedule="cosine_matched_to_D")
        runs.append({"N": N, "D": D, "C": flops(N, D), "loss": smoothed_train_loss(model)})

# Approach 1: 对每个 compute 预算，从训练曲线 envelope 中取最低 loss
frontier_1 = lower_envelope_over_training_curves(runs)
fit N_opt ~ C**a, D_opt ~ C**b

# Approach 2: 固定 FLOPs，扫描参数量，找到每条 IsoFLOP 曲线的 loss valley
for C in flops_budgets:
    candidates = [r for r in runs if close(r.C, C)]
    N_star = argmin_by_parabolic_fit(candidates, x="N", y="loss")
    D_star = C / (6 * N_star)
fit N_opt ~ C**a, D_opt ~ C**b

# Approach 3: 直接拟合参数化损失，再在 compute 约束下求闭式 frontier
fit E, A, B, alpha, beta in L_hat(N, D) = E + A/N**alpha + B/D**beta
for C in target_budgets:
    choose N, D to minimize L_hat(N, D) subject to C ≈ 6*N*D
```

Chinchilla 的问题设置非常直接：训练预算通常先由硬件数量和训练时长确定，因此真正要优化的是“同样 FLOPs 下该用多大模型、看多少 token”。论文将目标写成：

$$
N_{opt}(C),D_{opt}(C)=\operatorname*{argmin}_{N,D\ \text{s.t.}\ \mathrm{FLOPs}(N,D)=C} L(N,D)
$$

并使用常见近似 \(C\approx 6ND\)。这里 \(N\) 是参数量，\(D\) 是训练 token 数。相比 Kaplan，Chinchilla 的关键修正是让学习率 schedule 与训练 token 数匹配，并显式扫过更多 token budget；否则短训练阶段的 loss 会被高估，进而错误地认为“增加数据不如增加参数”。

三种估计方法分别从不同角度避免偏差。第一种方法把训练曲线视作连续函数，对每个 FLOPs 点取所有 run 中最低 loss 的 envelope，再拟合 \(N_{opt}\propto C^a\)、\(D_{opt}\propto C^b\)。第二种方法在固定 FLOPs 下改变模型大小，因为 \(D=C/(6N)\)，每条 IsoFLOP 曲线都会出现一个 U 形谷底：模型太小会容量不足，模型太大则 token 不够、训练不足。第三种方法直接拟合损失曲面：

$$
\hat L(N,D)=E+\frac{A}{N^\alpha}+\frac{B}{D^\beta}
$$

论文在附录中给出一组拟合值：\(E=1.69\)、\(A=406.4\)、\(B=410.7\)、\(\alpha=0.34\)、\(\beta=0.28\)。其中 \(E\) 可理解为理想生成过程的不可约熵，\(A/N^\alpha\) 是有限模型容量带来的 excess loss，\(B/D^\beta\) 是有限训练数据/优化步数带来的 excess loss。

在 \(C\approx 6ND\) 约束下，参数化公式可推出闭式最优 frontier：

$$
N_{opt}(C)=G\left(\frac{C}{6}\right)^a,
\quad
D_{opt}(C)=G^{-1}\left(\frac{C}{6}\right)^b
$$

$$
G=\left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)},
\quad
a=\frac{\beta}{\alpha+\beta},
\quad
b=\frac{\alpha}{\alpha+\beta}
$$

因为 \(\alpha\) 与 \(\beta\) 接近，\(a\) 与 \(b\) 都接近 0.5。论文 Table 2 中三种方法的指数分别约为：Approach 1 为 \((0.50,0.50)\)，Approach 2 为 \((0.49,0.51)\)，Approach 3 为 \((0.46,0.54)\)。这与 Kaplan 的 \((0.73,0.27)\) 形成鲜明对比，也解释了为什么 GPT-3、Gopher、MT-NLG 这类约 300B token 训练的大模型在 Chinchilla 视角下是 undertrained。

最有说服力的验证是 Chinchilla 本身。DeepMind 用与 Gopher 近似相同的计算预算，不训练 280B 参数模型，而是训练 70B 参数模型并使用 1.4T tokens。也就是说，它把预算从“更多参数”转移到“更多 token”。结果 Chinchilla 在许多语言建模、阅读理解、MMLU、BIG-bench 等评测上系统性超过 Gopher，同时参数量更小，推理和微调成本也更低。这个实验把 scaling law 从拟合曲线变成了可操作训练策略。

从机制上看，Chinchilla 的直觉是平衡两种 excess loss。如果模型太小，\(A/N^\alpha\) 是瓶颈；如果模型太大但 token 太少，\(B/D^\beta\) 是瓶颈。compute-optimal 点不是最大模型，也不是最多 token，而是在二者边际收益相当的位置。经验上的 20 tokens/parameter 并不是硬编码常数，而是这些拟合参数、FLOPs 近似和当时数据分布共同导出的可用规则。

> 💡 关键：Chinchilla Laws 的工程影响在于把“更大模型”改写为“参数和数据同步扩张”，直接改变了后续 LLM 预训练的预算规划、数据工程优先级和 overtraining 策略。

#### 🧪 练习题
```yaml
question: "Chinchilla Laws 相比 Kaplan Scaling Laws 的主要修正是什么？"
options:
  - "认为参数量和训练 token 数应随 compute 近似等比例增长"
  - "认为 embedding 参数应计入主要规模律"
  - "认为训练数据越少越能提升泛化"
  - "认为固定 300B token 对所有模型都是 compute-optimal"
answer: 0
explain: "Chinchilla 的三种估计方法都得到接近 0.5/0.5 的参数与数据 scaling 指数，说明许多旧模型参数过大、训练 token 不足。"
```
