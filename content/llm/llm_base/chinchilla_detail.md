### Chinchilla：计算最优语言模型
```yaml
id: chinchilla
name: Chinchilla
full_name: "计算最优语言模型 (Training Compute-Optimal LLMs)"
year: "2022.03"
org: "DeepMind"
paper_url: "https://arxiv.org/abs/2203.15556"
category: "autoregressive"
parent: "gpt3"
motivation: "数据参数等比计算最优"
```

#### 📝 一句话总结
Chinchilla 提出在固定训练计算量下应同时、近似等比例扩展模型参数量和训练 token 数，解决了当时大模型“参数过大、训练数据不足”的计算分配问题。它用与 Gopher 相同的训练 FLOPs 训练 70B 参数模型和 1.4T token，证明更小但训练更充分的模型可以优于 280B 级模型。

#### 🎯 核心要点
- 研究问题是固定 compute budget \(C\) 下如何选择参数量 \(N\) 和训练 token 数 \(D\)，而不是单纯扩大参数量。
- 论文训练并分析 400 多个 Transformer LM，规模从约 70M 到 16B+ 参数，训练数据从 5B 到 500B token。
- 三种估计方法分别是固定模型尺寸扫 token、IsoFLOP profiles、拟合参数化 loss function。
- 核心损失模型为 \(\hat L(N,D)=E+A/N^\alpha+B/D^\beta\)，把误差拆成不可约熵、模型容量不足和训练 token 不足三部分。
- 计算近似采用 \(\mathrm{FLOPs}\approx 6ND\)，在约束 \(6ND=C\) 下寻找最小 loss 的 \((N,D)\)。
- 结论是 compute 增长时 \(N\) 和 \(D\) 应接近等比例扩展，明显不同于 Kaplan scaling law 中更偏向增大参数的建议。
- Chinchilla 实例为 70B 参数、1.4T token，与 Gopher 280B 参数、300B token 使用相同 FLOPs，但下游表现更强且推理成本更低。
- 论文强调数据集规模和质量成为继续 scaling 的关键瓶颈，不能只把预算投入更大参数量。

#### 🔬 深入细节
![Chinchilla compute-optimal scaling 示意图](https://ar5iv.labs.arxiv.org/html/2203.15556/assets/x1.png)
*图：论文 Figure 1。三种估计方法都预测当时的大型 LM 位于“参数过大、token 不足”的区域；Chinchilla 以更少参数和更多 token 接近 compute-optimal 前沿。*

```python
# Chinchilla 风格的 compute-optimal scaling 估计流程
runs = []

for N in model_sizes:                         # 约 70M 到 16B+
    for D in token_budgets:                   # 约 5B 到 500B
        model = TransformerLM(num_params=N)
        schedule = cosine_schedule(length_tokens=D)
        loss = train_and_measure_loss(model, tokens=D, schedule=schedule)
        C = 6 * N * D                         # 训练 FLOPs 近似
        runs.append((N, D, C, loss))

# 方法 1：从训练曲线 envelope 中找每个 compute 下的最低 loss
frontier_1 = lower_envelope(runs, key="C", value="loss")

# 方法 2：固定 FLOPs 切片，拟合 loss-vs-params 的 valley
frontier_2 = []
for C0 in flops_grid:
    points = select_isoflop_points(runs, C0)
    N_star = argmin_parabola_fit(points, x="log_N", y="loss")
    D_star = C0 / (6 * N_star)
    frontier_2.append((C0, N_star, D_star))

# 方法 3：拟合 L_hat(N,D)，再在 6ND=C 约束下优化
loss_law = fit_huber_loss_model(runs, form="E + A/N^alpha + B/D^beta")
for C0 in target_compute_budgets:
    N_star, D_star = minimize(loss_law, constraint=lambda N, D: 6 * N * D == C0)
```

Chinchilla 论文把大模型 scaling 的核心问题从“更大模型是否更好”改写为“给定训练 FLOPs，参数和数据怎么配比最优”。形式化地，令 \(N\) 为非 embedding 参数量，\(D\) 为训练 token 数，\(L(N,D)\) 为最终预训练 loss。目标是在训练计算量固定时求：

$$
N_{\mathrm{opt}}(C),D_{\mathrm{opt}}(C)=\arg\min_{N,D\;\mathrm{s.t.}\;\mathrm{FLOPs}(N,D)=C}L(N,D)
$$

在 dense Transformer LM 中，论文沿用近似：

$$
\mathrm{FLOPs}(N,D)\approx 6ND
$$

这个约束说明，如果预算 \(C\) 固定，参数量增加就必然减少可训练 token 数；反之，更多 token 需要缩小模型。Chinchilla 的贡献不是提出新架构，而是重新估计这个 trade-off 的最优点。

第一种方法固定一组模型尺寸，给每个模型训练不同 token horizon，并从完整训练曲线上抽取在每个 FLOPs 水平下的最低 loss envelope。然后对 envelope 上的最优 \(N\) 与 \(D\) 拟合幂律：

$$
N_{\mathrm{opt}}\propto C^a,\quad D_{\mathrm{opt}}\propto C^b
$$

该方法得到 \(a\approx0.50,b\approx0.50\)。直觉上，当 compute 扩大 10 倍时，不应主要把预算用于把模型变大，而应让模型大小和训练 token 数都约按平方根比例增长。

第二种方法是 IsoFLOP profiles：固定若干 FLOPs 预算，训练不同参数量的模型，并根据 \(D=C/(6N)\) 自动确定 token 数。对每条固定 FLOPs 曲线，loss 关于参数量会出现一个 valley：模型太小会容量不足，模型太大则 token 不够、训练不足。论文对每条曲线拟合抛物线来找 valley，再拟合 \(N_{\mathrm{opt}}\) 和 \(D_{\mathrm{opt}}\) 随 \(C\) 的幂律，得到 \(a\approx0.49,b\approx0.51\)，与第一种方法几乎一致。

第三种方法拟合参数化损失函数：

$$
\hat L(N,D)=E+\frac{A}{N^\alpha}+\frac{B}{D^\beta}
$$

其中 \(E\) 表示自然文本的不可约熵或理想生成过程下限，\(A/N^\alpha\) 表示模型容量有限带来的函数逼近误差，\(B/D^\beta\) 表示训练 token 有限和优化步数有限带来的误差。论文用 Huber loss 拟合 \((A,B,E,\alpha,\beta)\)，再在 \(6ND=C\) 下求解析近似：

$$
N_{\mathrm{opt}}(C)=G\left(\frac{C}{6}\right)^a,\quad D_{\mathrm{opt}}(C)=G^{-1}\left(\frac{C}{6}\right)^b
$$

$$
G=\left(\frac{\alpha A}{\beta B}\right)^{1/(\alpha+\beta)},\quad a=\frac{\beta}{\alpha+\beta},\quad b=\frac{\alpha}{\alpha+\beta}
$$

该方法得到 \(a\approx0.46,b\approx0.54\)，仍然支持“数据和参数接近等比扩展”。这与 Kaplan et al. 先前建议形成鲜明对比：Kaplan 的指数约为 \(a=0.73,b=0.27\)，意味着 compute 增长时更偏向扩模型，而 Chinchilla 认为当时的大模型显著 undertrained。

Chinchilla 本身是这个 scaling law 的验证实验。DeepMind 用与 Gopher 相同的 compute budget，不再训练 280B 参数、约 300B token 的模型，而是训练 70B 参数、1.4T token 的模型。两者 FLOPs 类似，但 Chinchilla 参数少 4 倍、训练 token 多约 4 倍。论文报告 Chinchilla 在大量下游任务上超过 Gopher、GPT-3、Jurassic-1 和 Megatron-Turing NLG，并在 MMLU 上达到约 67.5%/67.6% 的 5-shot 平均准确率。

架构上，Chinchilla 没有引入颠覆性结构，而是沿用 Gopher 风格的 dense autoregressive Transformer。它有 80 层、64 个 attention heads、key/value size 128、\(d_{model}=8192\)，FFN size 为 \(4d_{model}\)。训练细节包括使用 MassiveText、AdamW、略微修改的 SentencePiece tokenizer、不做 NFKC normalisation，并用 bfloat16 前后向加 float32 optimizer state。论文的重点是证明“训练分配”比“架构花样”更能解释当时的性能差距。

> 💡 关键：Chinchilla law 的工程启示是，同样的钱不一定应该训练最大模型；如果数据 token 不够，较小模型训练更久会同时改善质量、降低推理成本和降低微调成本。

与 GPT-3/Gopher 时代的做法相比，Chinchilla 把 scaling 的瓶颈从模型参数转向高质量数据。Table 3 的外推显示，175B 参数模型若要 compute-optimal 需要数万亿 token；280B 级模型需要更多 token 和更大 FLOPs 才合理。这也解释了后来 LLM 训练越来越重视数据去重、质量过滤、长尾覆盖和多 epoch 风险控制：如果最优策略要求更多 token，数据工程就成为模型 scaling 的一等公民。

#### 🧪 练习题
```yaml
question: "Chinchilla 论文相对于 Kaplan scaling law 最关键的修正是什么？"
options:
  - "训练更大模型时应该固定训练 token 数"
  - "在固定 compute 下，模型参数量和训练 token 数应接近等比例扩展"
  - "MoE 路由比 dense Transformer 更 compute-optimal"
  - "语言模型 loss 与训练数据量无关"
answer: 1
explain: "Chinchilla 通过三种估计方法发现 N 和 D 的最优 scaling 指数都接近 0.5，说明许多大模型参数偏大、训练 token 不足。"
```
