### SSD: 异步投机解码 (SSD)

```yaml
id: ssd
name: SSD
full_name: 异步投机解码 (SSD)
year: '2026.03'
org: Stanford/Together AI
paper_url: https://arxiv.org/abs/2603.03251
category: spec_decode
parent: spec_leviathan
motivation: 异步草稿验证+几何扇出策略
```

#### 📝 一句话总结

SSD（Speculative Speculative Decoding）把“下一轮 draft 必须等待当前 verification 完成”的串行依赖再投机化：target 正在验证时，draft 设备提前预测可能的验证结果并为这些结果生成后续草稿。论文的优化实例 Saguaro 用验证结果缓存、几何 fan-out、cache-aware sampling 和 batch-aware fallback，让投机解码的 drafting 与 verification 更充分重叠。

#### 🎯 核心要点

- 异步 draft/verify：draft model 独立运行在与 target verifier 不同的硬件上，在 target verification 期间预计算下一轮 speculations
- 验证结果建模：verification outcome 包含接受了多少 draft token 以及 rejection/all-accept 后采样的 bonus token
- Saguaro cache：在有限预算 \(B\) 下选择最可能命中的 outcome，并为每个 outcome 预生成后续 draft
- 几何扇出：按接受长度概率分配每个位置的 bonus token 猜测数 \(F_k\)，而不是 uniform fan-out
- Cache-aware sampling：主动下调 top-\(F\) draft token 的采样概率，使 residual distribution 更集中到缓存 token
- Fallback 策略：cache miss 时根据 batch size 在慢但准的 primary speculator 和快但弱的 backup speculator 之间切换
- Lossless 保证：SSD 只提前准备候选，最终输出仍由 target speculative verification 决定，cache miss 只影响额外计算和等待时间

#### 🔬 深入细节

![SSD 总览图](https://arxiv.org/html/2603.03251v3/x1.png)
*图源：arXiv HTML Figure 1，左侧是普通 speculative decoding，中间是 SSD 在 target 验证时异步预生成多个可能后续草稿。*

![Saguaro sampling 示意](https://arxiv.org/html/2603.03251v3/x5.png)
*图源：arXiv HTML Figure 5，展示 Saguaro sampling 如何在 acceptance rate 与 cache hit rate 之间折中。*

```python
# SSD / Saguaro 的异步推理骨架
def verifier(prompt, target, channel):
    target.prefill(prompt)
    spec_tokens = channel.recv_from_speculator()
    generated = []
    while True:
        outcome = target.verify(spec_tokens)          # 接受长度 + bonus token
        generated.extend(outcome.tokens)
        channel.send_to_speculator(outcome)
        if outcome.has_eos:
            return generated
        spec_tokens = channel.recv_from_speculator()

def speculator(prompt, primary_draft, backup_draft, channel):
    primary_draft.prefill(prompt)
    spec_tokens = primary_draft.speculate(prompt)
    while True:
        channel.send_to_verifier(spec_tokens)

        # target 正在 verify 时，draft 预测可能 outcome 并并行预生成
        outcomes = predict_verify_outcomes(
            spec_tokens,
            logits=primary_draft.cached_logits,
            fanout_strategy="geometric",
        )
        cache = {
            outcome: primary_draft.speculate(prefix_after(outcome))
            for outcome in outcomes
        }

        actual = channel.recv_from_verifier()
        if actual.has_eos:
            return
        if actual in cache:
            spec_tokens = cache[actual]
        else:
            spec_tokens = fallback_speculate(actual, primary_draft, backup_draft)
```

普通 speculative decoding 已经把“一次 target forward 只出一个 token”变成“draft 多个 token，target 一次并行验证”。但它仍有轮次级别的同步点：第 \(r\) 轮 target 没验证完，第 \(r+1\) 轮 draft 就不知道真实前缀是什么，只能等待。SSD 的核心问题就是：能否在等待 target 时提前猜出 verification outcome，并把下一轮 draft 准备好？如果猜中，verification 结束后 speculator 可以立即交出下一轮候选，draft overhead 在关键路径上接近 0。

SSD 把 verification outcome 记为“接受长度 + bonus token”。若当前 speculation 长度为 \(K\)，接受 \(k\) 个 token 后，目标模型还会从 residual distribution 或 target distribution 采样一个 bonus token；因此 outcome 空间约为

$$
|\mathcal{V}_{\text{outcome}}| \approx (K+1)V,
$$

其中 \(V\) 是词表大小。这个空间太大，无法全部预生成。Saguaro 因此把缓存构造写成预算约束问题：给定最多能预生成的 \(B\) 个 outcome，如何分配到不同接受长度 \(k\) 上，最大化 cache hit probability。

Saguaro 的第一项优化是几何 fan-out。令 \(F_k\) 表示“接受 \(k\) 个 token 时，为 bonus token 猜多少个候选”。论文观察 cache miss rate 随 fan-out 近似服从 power law：

$$
1-p_{\mathrm{hit},*}(F)=\frac{1}{F^r},\qquad r>0.
$$

在 draft token 接受率为 \(a_p\)、总预算 \(\sum_{k=0}^{K}F_k\le B\) 下，最优 fan-out 形状是 capped geometric series：

$$
F_k = F_0 a_p^{k/(1+r)}\quad (k<K),
$$

$$
F_K = F_0 a_p^{K/(1+r)}(1-a_p)^{-1/(1+r)}.
$$

直觉是接受长度本身近似几何分布：越靠后的 \(k\) 通常概率越低，不应平均分配猜测预算；但 \(k=K\) 的 all-accept 情况有特殊 bonus token 分布，所以用 capped 项修正。

第二项优化是 Saguaro sampling。普通 speculative verification 在拒绝时会从 residual distribution 采样：

$$
r(t)\propto \max\left(p_{\mathrm{target}}(t)-p_{\mathrm{draft}}(t),0\right).
$$

若 draft 分布在某个 token 上概率太高，residual 反而不容易采到它。Saguaro 反向利用这一点：对 draft logits 的 top-\(F\) token 下调采样权重，让这些 token 在 residual 中更可能出现，从而让 bonus token 更容易落入 cache。给定 draft logits \(z\)、fan-out \(F\) 和下调常数 \(C\in[0,1]\)，采样分布定义为

$$
\sigma_{F,C}(z)_t \propto
\begin{cases}
C\exp(z_t), & t\in \operatorname{top}_F(z),\\
\exp(z_t), & t\notin \operatorname{top}_F(z).
\end{cases}
$$

\(C\) 越小，cache hit rate 越高，但 draft 分布越偏离 target，接受率可能下降。Saguaro 的设计重点不是单调提高 draft acceptance，而是在 end-to-end latency 上平衡 acceptance length 与 cache hit rate。

第三项优化是 fallback。cache miss 在低 batch、低温度时可能较少，但 batch size 增大后，只要 batch 中某个请求 miss，整批都可能等待 fallback speculation。论文给出的策略是根据 batch size 选择 backup speculator：小 batch 可用慢但准的 primary 做 fallback，以保持后续 cache hit；大 batch 下 miss 几乎不可避免，等待慢模型会放大 stall，因此改用更快的 backup speculator。论文用下式刻画 batch 趋大时 speedup 分母会被 backup latency 主导：

$$
\text{speedup}\rightarrow
\frac{
p_{\mathrm{hit}}E_{\mathrm{hit}}+(1-p_{\mathrm{hit}})E_{\mathrm{miss}}
}{
1+T_b
}
\quad \text{as } b\rightarrow\infty .
$$

这里 \(T_b\) 是 backup speculator 时间，说明大 batch 场景下“miss 后尽快恢复流水线”比“用更准但慢的备份”更重要。

正确性上，SSD 没有改变 speculative decoding 的接受/拒绝规则。预生成 cache 只是提前计算“如果 outcome 是 \(v\)，下一轮 draft 是什么”；真实 outcome 仍由 target verifier 产生。若命中 cache，就直接使用对应 draft；若未命中，就退回 fallback 重新 draft。因此 SSD 的失败模式是性能退化和额外 draft 计算，而不是输出分布错误。

与 Leviathan-style speculative decoding 相比，SSD 的新增投机层位于轮次控制流上：传统 SD 投机 token，SSD 投机“验证会怎样结束”。这使它特别适合 target verification 时间足够长、draft 可放在独立设备上并行工作的场景。论文报告 Saguaro 平均比最强 speculative decoding baseline 快约 30%，最高可达 autoregressive decoding 的 5x，但也指出大 batch、temperature 和额外 draft 设备数量会显著影响最优策略。

> 💡 关键：SSD 的 cache 命中不是为了跳过 target，而是为了在 target 刚完成验证时，下一轮 draft 已经在旁路设备上准备好了。

#### 🧪 练习题

```yaml
question: "Saguaro 为什么采用几何 fan-out 而不是在所有接受长度上平均分配缓存预算？"
options:
  - "不同接受长度的验证结果概率近似几何衰减，平均分配会把计算浪费在低概率 outcome 上"
  - "几何 fan-out 可以取消 target verification"
  - "所有 token 的 residual probability 总是完全相同"
  - "batch size 越大就越不需要 fallback"
answer: 0
explain: "Saguaro 将有限预算更多分配给更可能出现的接受长度，并对 all-accept 位置做 capped 修正，从而提高 cache hit rate。"
```
