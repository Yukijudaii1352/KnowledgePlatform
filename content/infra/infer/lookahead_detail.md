### Lookahead Decoding: 展望解码 (Lookahead Decoding)

```yaml
id: lookahead
name: Lookahead Decoding
full_name: 展望解码 (Lookahead Decoding)
year: '2024'
org: Stanford
paper_url: https://arxiv.org/abs/2402.02057
category: spec_decode
parent: —
motivation: 基于Jacobi迭代的并行解码无需微调
```

#### 📝 一句话总结

Lookahead Decoding 将自回归解码改写为非线性方程组的 Jacobi 迭代，用目标 LLM 自身在一个并行窗口里生成、缓存并验证 \(n\)-gram 候选，从而无需 draft model、微调或外部 datastore 也能减少串行解码步数。它通过 verification branch 保持与原始解码相同的输出分布，并可用更多每步 FLOPs 换取更少总步数。

#### 🎯 核心要点

- 不训练辅助草稿模型，不修改目标 LLM 参数，也不依赖检索式 datastore
- 将 greedy 自回归生成写成非线性系统，再用 Jacobi decoding 并行更新多个未来 token 位置
- 使用固定大小 2D window 记录 Jacobi trajectory，从中构造多个彼此不相交的 \(n\)-gram
- 维护 \(n\)-gram pool，缓存历史 lookahead branch 生成的候选，供后续 verification branch 查找
- 每个解码步同时执行 lookahead branch 和 verification branch，并用定制 attention mask 隔离两类 token
- verification branch 只验证以当前最后 token 开头的候选，最多并行验证 \(G\) 条，成功则一次接受多个 token
- 支持 greedy 和 sampling 场景；sampling 版本通过逐步拒绝和归一化证明保持目标模型分布
- 可结合 FlashAttention 和多 GPU lookahead parallelism，论文报告 MT-bench 最高约 1.8x、代码补全多 GPU 强扩展最高约 4x 加速

#### 🔬 深入细节

![Lookahead Decoding 工作流](https://ar5iv.labs.arxiv.org/html/2402.02057/assets/x1.png)
*图：论文 Figure 1 展示 \(W=5,N=3,G=2\) 时的 Lookahead Decoding；每步并行生成 lookahead branch、从 \(n\)-gram pool 中验证候选、缓存新 \(n\)-gram，并滑动窗口。*

```python
# Lookahead Decoding, simplified from Algorithm 2
C = set()                         # n-gram pool
output = []
window = random_init(time=N-1, width=W)
last_token = prompt[-1]

for step in range(max_steps):
    # 1. Lookahead branch: modified Jacobi update over W future positions.
    new_row = []
    for j in range(W):
        context = build_visible_context(
            prompt=prompt,
            output=output,
            window=window,
            position=j,
            lookback=N - 1,
        )
        new_row.append(argmax(target_llm.next_token(context)))
    window.append_row(new_row)

    # 2. Verification branch: find promising candidates from the pool.
    candidates = []
    for _ in range(G):
        candidates.append(pop_ngram_starting_with(C, last_token))

    # 3. Verify candidates in parallel with the target LLM.
    accepted = verify_ngrams(
        prompt=prompt + output,
        model=target_llm,
        candidates=candidates,
        mode="greedy_or_sampling",
    )
    output.extend(accepted)
    last_token = output[-1]

    # 4. Cache newly generated n-grams and slide the 2D window.
    for j in range(W):
        C.add(extract_ngram(window, column=j, length=N))
    window.drop_outdated_rows_and_columns()
```

Lookahead 的出发点是：LLM 单 token 自回归解码通常受内存带宽限制，每一步只生成一个 token，GPU 的并行计算能力没有被充分利用。普通 speculative decoding 通过“小模型猜、大模型验”缓解这个问题，但需要一个高接受率、低开销且能泛化到目标模型和任务的数据分布的 draft model。Lookahead 选择不用额外模型，而是重新解释目标 LLM 自身的一步生成能力。

在 greedy 解码下，长度为 \(m\) 的输出可以写成一组必须按顺序求解的问题：

$$
\begin{aligned}
y_1 &= \arg\max P_M(y_1|\mathbf{x}^0),\\
y_2 &= \arg\max P_M(y_2|y_1,\mathbf{x}^0),\\
&\dots\\
y_m &= \arg\max P_M(y_m|\mathbf{y}_{1:m-1},\mathbf{x}^0).
\end{aligned}
$$

论文进一步把它改写成非线性方程组：

$$
f(y_i,\mathbf{y}_{1:i-1},\mathbf{x}^0)
=y_i-\arg\max P_M(y_i|\mathbf{y}_{1:i-1},\mathbf{x}^0)=0.
$$

Jacobi decoding 会从一个随机初始 \(\mathbf{y}^0\) 出发，在每轮同时更新所有位置：

$$
\mathbf{y}^{r}_{1:m}\leftarrow
\arg\max P_M(\mathbf{y}^{r}_{1:m}|\mathbf{y}^{r-1}_{1:m},\mathbf{x}^0).
$$

这个过程最多 \(m\) 轮能得到与自回归一致的固定点，因为每轮至少第一个未定 token 与标准自回归一致。但直接 Jacobi decoding 通常没有实际加速：它在并行位置上生成的 token 经常出现在错误位置，且已正确的 token 可能被下一轮覆盖。Lookahead 的关键改造不是直接提交 Jacobi 序列，而是把 Jacobi 轨迹里相邻时间步、相邻位置形成的 \(n\)-gram 当作“未来可能会用到的草稿片段”缓存起来。

Lookahead branch 维护一个固定大小的二维窗口。宽度 \(W\) 表示向未来并行预测多少个位置，回看长度 \(N-1\) 表示用过去多少轮 Jacobi trajectory 构造 \(N\)-gram。每个解码步对 \(W\) 个位置做一次 modified Jacobi update，并从窗口的纵向轨迹中抽取 \(N\)-gram 加入 pool。例如 \(N=4\) 时，一个候选 4-gram 可以由前三轮在对应位置上的 token 加上当前新生成 token 组成。窗口随后在时间和位置两个维度滑动，保证每步计算量受控。

Verification branch 则把这些候选变成 lossless 加速。它先从 \(n\)-gram pool 里找“promising” 候选，即第一个 token 等于当前已生成序列最后 token 的 \(n\)-gram；然后最多选 \(G\) 条候选并行送入目标 LLM 验证。greedy 场景下，验证逻辑类似 speculative decoding：若候选第 \(i\) 个 token 等于目标 LLM 对相同前缀的 \(\arg\max\)，则接受并继续检查下一位；若全部候选在某一位都失败，则回退到标准目标 LLM 生成一个 token，保证序列至少前进一步。

sampling 场景更复杂，因为 naive speculative decoding 需要保留 draft token 的采样分布；而 Lookahead 的 \(n\)-gram pool 可能长期保存大量候选，若为每个候选保存完整词表分布会不可行。论文的做法是让 lookahead branch 使用 greedy 生成候选，使 draft 分布退化成 one-hot；verification branch 中若候选 \(s_j\) 被拒绝，就将当前目标分布中 \(s_j\) 的概率置零并归一化，再尝试下一条候选。该过程等价于逐步从目标分布中剔除已拒绝 token，论文附录用归纳证明 \(Q(v)=P(v)\)，即算法最终采样任意 token \(v\) 的概率仍等于目标 LLM 原始分布。

Lookahead 的单步同时包含“预测”和“验证”，因此 attention mask 是工程核心。lookahead branch 中不同并行位置只允许看见其 Jacobi 依赖需要的历史 token；verification branch 中候选 \(n\)-gram 只按各自前缀可见；两条 branch 之间互不可见，避免候选之间串扰。论文还将这种自定义 mask hardcode 到 FlashAttention 中，相比直接 PyTorch 实现带来约 20% 端到端收益。

论文用 step compression ratio 描述缩短解码步数的能力：

$$
\mathcal S=\frac{\#\mathrm{generated\ tokens}}{\#\mathrm{Lookahead\ steps}}.
$$

作为对比，单条 speculative decoding 长度为 \(\gamma\)、平均接受率为 \(\alpha\) 时，期望接受 token 数为：

$$
E(\#tokens)=\frac{1-\alpha^{\gamma+1}}{1-\alpha}.
$$

若每步并行验证 \(b\) 条长度为 \(\gamma\) 的候选，则有：

$$
E(\#tokens)=(\gamma+1)-\sum_{i=1}^{\gamma}(1-\alpha^i)^b.
$$

Lookahead 中可近似令 \(b=G=W\)、\(\gamma=N-1\)。若平均每 \(f\) 步有一步找到好候选，其步压缩率可写成：

$$
\mathcal S=\frac{f-1+E(\#tokens)}{f}.
$$

这个公式表达了 Lookahead 的取舍：增加 \(W,N,G\) 会提高每步 FLOPs，但可能减少总解码步数。因为 vanilla decoding 受内存带宽约束，额外 FLOPs 在单 GPU 或多 GPU 上可能原本闲置；Lookahead parallelism 进一步把 disjoint lookahead/verification 分支分配到不同 GPU，每个 GPU 保留完整模型副本，以近零通信换取更低延迟。

#### 🧪 练习题

```yaml
question: "Lookahead Decoding 为什么不需要训练独立 draft model？"
options:
  - "它利用目标 LLM 的 Jacobi 并行更新轨迹生成 n-gram 候选，再由目标 LLM 自己验证"
  - "它删除了验证阶段，因此所有未来 token 都直接提交"
  - "它只在训练阶段使用，推理时仍是普通自回归"
  - "它把所有候选 token 固定为词表中的最高频 token"
answer: 0
explain: "候选来自目标模型自身的并行 lookahead branch，而不是外部草稿模型；verification branch 确保最终输出仍与目标解码一致。"
```
