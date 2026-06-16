### T²缩放定律 (Train-to-Test Scaling Laws)
```yaml
id: t2_scaling
name: T²缩放定律
full_name: T²缩放定律 (Train-to-Test Scaling Laws)
year: "2026"
org: 多机构
paper_url: https://www.machinelearningplus.com/llm/llm-scaling-laws/
category: scaling
parent: chinchilla_law
motivation: 推理最优的过度训练策略
```

#### 📝 一句话总结
T² 缩放定律把模型参数量 \(N\)、预训练 token 数 \(D\) 和测试时重复采样次数 \(k\) 放进同一个端到端算力约束中联合优化，解决了 Chinchilla 只优化训练而忽略推理成本的问题。它的核心结论是：当部署阶段会使用 pass@k 或重复采样时，更小但训练更久的过度训练模型往往比 Chinchilla 最优模型更符合总成本最优。

#### 🎯 核心要点
- 将预训练缩放和测试时缩放合并为一个联合决策问题：同时选择 \(N\)、\(D\)、\(k\)。
- 显式计入两类成本：训练成本近似为 \(6ND\)，重复采样推理成本近似为 \(2Nk\)。
- 用 pass@k 描述测试时重复采样收益：采样越多，至少一次答对的概率以非线性方式上升。
- 提出两条互补建模路线：基于 NLL/任务损失的 Approach 1，以及直接建模 pass@k 准确率的 Approach 2。
- 在超过 100 个模型检查点、12 个训练算力层级和 8 个任务上拟合缩放关系，并额外训练 21 个重度过度训练检查点做外推验证。
- 结论稳定指向小模型高 token/parameter 比例：在固定推理预算下，较小模型能获得更多 \(k\)，因此总性能-成本前沿向过度训练区域移动。
- 后训练后趋势仍然存在：FT/SFT 会削弱一部分过度训练收益，但不会把最优点拉回 Chinchilla 的约 20 tokens/parameter 规则。

#### 🔬 深入细节

![T² 缩放定律框架图](https://arxiv.org/html/2604.01411v1/x1.png)
*图：T² 将 Chinchilla 训练缩放和 pass@k 测试时缩放组合起来，在给定训练预算和推理预算下寻找新的预训练最优配置。*

任务 JSON 给出的 `paper_url` 是缩放定律综述页；这里的精读对象是其中对应的原始论文 *Test-Time Scaling Makes Overtraining Compute-Optimal*，arXiv 链接为 `https://arxiv.org/abs/2604.01411`。论文要回答的问题非常具体：如果一个模型上线后会被重复采样很多次，那么训练时还应该继续遵循 Chinchilla 的“训练算力最优”比例吗？T² 的答案是否定的，因为 Chinchilla 默认每个模型只被查询一次，完全没有把小模型单次推理更便宜、因此可以多采样的事实放入优化目标。

```python
# T² 联合训练-测试缩放伪代码
# 输入：候选模型尺寸 N_grid、训练 token D_grid、训练预算 C_train、推理预算 C_inf
# 输出：在端到端预算下最优的 N, D, k

fit_chinchilla_or_task_model(checkpoints)  # 从缩放检查点拟合 N,D -> loss/accuracy
fit_passk_model(eval_samples)              # 从多次采样结果拟合 k -> pass@k

best = None
for N in N_grid:
    for D in D_grid:
        if 6 * N * D > C_train:
            continue

        # 关键推理成本修正：小模型单次采样更便宜，所以 k 更大
        k = floor(C_inf / (2 * N))
        if k < 1:
            continue

        # Approach 1: 预测 NLL 或任务损失，越低越好
        loss_score = predict_loss(N, D, k)

        # Approach 2: 预测 pass@k accuracy，越高越好
        acc_score = predict_passk_accuracy(N, D, k)

        candidate = combine_or_compare(loss_score, acc_score)
        best = arg_optimal(best, candidate, N, D, k)

return best.N, best.D, best.k
```

传统 Chinchilla 缩放律把预训练损失写成参数量和数据量的可加幂律：

$$
L(N,D)=E+\frac{A}{N^{\alpha}}+\frac{B}{D^{\beta}}.
$$

在只考虑训练预算 \(C_{\text{train}}\approx 6ND\) 时，最优解通常让模型规模和训练 token 数随预算以相近指数增长，即直觉上的“模型和数据一起变大”。T² 的关键改动是把推理也变成约束：

$$
\min_{N,D,k} L(N,D,k)\quad \text{s.t.}\quad 6ND\le C_{\text{train}},\quad 2Nk\le C_{\text{inf}}.
$$

如果直接优化准确率，则相应写成：

$$
\max_{N,D,k}\;\text{Acc}(N,D,k)\quad \text{s.t.}\quad 6ND\le C_{\text{train}},\quad 2Nk\le C_{\text{inf}}.
$$

这里的 \(2Nk\) 是简化的单 token 前向推理成本乘以采样数。它改变了最优点的方向：当 \(C_{\text{inf}}\) 固定时，\(k=\lfloor C_{\text{inf}}/(2N)\rfloor\)，所以小模型天然能被采样更多次。小模型单次正确率较低，但 pass@k 的收益不是线性的，重复采样可能补回甚至超过单次质量差距。

pass@k 的基本机制是：对同一题采样 \(k\) 次，只要有一次正确就算成功。如果第 \(i\) 个问题单次采样正确率是 \(p_i\)，那么：

$$
\text{pass@}k_i = 1-(1-p_i)^k.
$$

在包含 \(M\) 个问题的基准 \(\mathcal{D}\) 上，期望 pass@k 为：

$$
\text{pass@}k_{\mathcal{D}}=\frac{1}{M}\sum_{i=1}^{M}\left[1-(1-p_i)^k\right].
$$

这条公式解释了为什么 T² 会偏好过度训练。对一个大模型，\(p_i\) 可能更高，但 \(k\) 很小；对一个小模型，\(p_i\) 较低，但 \(k\) 可以大很多。只要任务存在“多试几次能找到正确轨迹”的空间，后者就可能在相同推理 FLOPs 下占优。

论文使用两种建模方式来避免单一指标带来的偏差。Approach 1 从损失角度建模，把 repeated sampling 对负对数 pass@k 的改善并入 \(L(N,D,k)\)，可以理解为在 Chinchilla 的 \(N,D\) 幂律上增加一个随 \(k\) 改善的测试时缩放项。Approach 2 则直接建模准确率，先拟合 \(N,D\) 对单次能力的影响，再用 Beta 分布刻画题目难度和单题成功概率的分布：

$$
p\sim \text{Beta}(a_{N,D}, b_{N,D}),\qquad
\mathbb{E}[\text{pass@}k]=1-\frac{\mathrm{B}(a_{N,D}, b_{N,D}+k)}{\mathrm{B}(a_{N,D}, b_{N,D})}.
$$

两个路线虽然拟合对象不同，一个偏连续损失，一个偏离散成功率，但都给出相同方向的建议：一旦加入推理预算，最优预训练配置会比 Chinchilla 更小、更久训、更高 tokens/parameter。

实验上，论文先用常规 Chinchilla 缩放检查点拟合模型，再向过度训练区域外推。为了验证不是曲线拟合幻觉，作者额外训练了 21 个超出标准缩放套件的过度训练检查点。结果显示，在固定 \(C_{\text{train}}=2.56\times10^{19}\) 且 \(C_{\text{inf}}=2\times10^9\) FLOPs 的比较下，小型过度训练模型在 8 个任务上都优于经验上的 Chinchilla 最优检查点。例如 LAMBADA 上 37M 过度训练模型优于 455M Chinchilla 检查点，Simple Reasoning 上 37M 过度训练模型也显著优于 901M 检查点。

> 💡 关键：T² 中的“过度训练”不是训练集过拟合的意思，而是相对 Chinchilla 推荐的 token/parameter 比例训练更久。它牺牲了一部分训练阶段的单次最优性，换取部署阶段更低的单样本成本和更多测试时采样机会。

与传统缩放律相比，T² 的主要创新不是发明新的模型结构，而是把“训练什么模型”和“部署时怎么用模型”合并成一个优化问题。Chinchilla 适合一次查询或推理预算可忽略的场景；T² 适合推理密集、会做 self-consistency、best-of-N、生成-验证或 pass@k 的场景。对于推理模型、代码模型、数学模型和 agent 任务，测试时采样往往是主性能杠杆，因此 T² 给出的是更接近真实部署成本的训练规划方法。

#### 🧪 练习题
```yaml
question: "T² 缩放定律为什么会推荐比 Chinchilla 更小但训练更久的模型？"
options:
  - "因为小模型的单次输出准确率一定高于大模型"
  - "因为在固定推理预算下，小模型单次采样更便宜，可以获得更大的 k，并通过 pass@k 弥补单次质量差距"
  - "因为 T² 完全不考虑训练成本，只优化推理成本"
  - "因为过度训练会减少模型参数量"
answer: 1
explain: "T² 同时约束训练成本 6ND 和推理成本 2Nk；当 N 变小时，同一推理预算能支持更多采样，pass@k 的非线性收益会把最优点推向小模型过度训练区域。"
```
