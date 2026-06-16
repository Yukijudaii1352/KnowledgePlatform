### GaLore：梯度低秩投影
```yaml
id: galore
name: GaLore
full_name: 梯度低秩投影 (GaLore)
year: "2024.03"
org: UT Austin
paper_url: https://arxiv.org/abs/2403.03507
category: peft
parent: lora
motivation: 梯度投影减少80%优化器显存
```

#### 📝 一句话总结
GaLore 提出在训练时投影“梯度”而不是重参数化“权重”的低秩训练策略，解决 LoRA 类方法限制参数搜索空间、预训练阶段显存仍高的问题。它让模型继续做全参数更新，但把 Adam/Adafactor 等优化器状态维护在低秩子空间中，从而显著降低优化器显存。

#### 🎯 核心要点
- 核心对象从低秩权重更新转为低秩梯度：利用训练中权重梯度逐渐呈现低稳定秩的性质。
- 保留全参数学习轨迹：不冻结主权重、不额外训练 LoRA adapter，而是把优化器处理后的低秩梯度投影回原空间更新权重。
- 低秩投影机制：用 SVD 从当前梯度中估计投影矩阵 \(P_t\) 和 \(Q_t\)，将 \(G_t\) 压缩为 \(P_t^\top G_t Q_t\)。
- 子空间可周期切换：每隔若干步重新计算投影矩阵，使不同阶段的低秩更新叠加后仍能学习全秩权重。
- 与优化器解耦：可接入 AdamW、8-bit Adam、Adafactor 等，把一阶/二阶矩等优化器状态存到压缩梯度空间。
- 训练场景覆盖预训练与微调：在 C4 上预训练 LLaMA 1B/7B，并在 GLUE 上微调 RoBERTa，展示接近全秩训练的性能。
- 显存收益来自优化器状态：8-bit GaLore 进一步结合量化优化器和逐层权重更新，论文报告优化器状态显存最高降低约 82.5%，总训练显存降低约 63.3%。

#### 🔬 深入细节
![GaLore 低秩子空间训练示意图](https://arxiv.org/html/2403.03507v2/x2.png)
*图：GaLore 在一段训练步内固定低秩子空间，累计若干步后重新计算投影矩阵并切换到新的子空间。不同低秩更新块相加后，权重本身不被限制为单一低秩矩阵。*

![GaLore 显存对比图](https://arxiv.org/html/2403.03507v2/x1.png)
*图：论文以 LLaMA 7B 单卡预训练为例，对比 BF16 AdamW、Adafactor、8-bit Adam 和 8-bit GaLore 等设置的估计显存消耗。GaLore 的目标不是减少参数本身，而是削减梯度和优化器状态的主要开销。*

```python
# GaLore 的核心训练逻辑，按单个权重矩阵 W 描述
for step, batch in enumerate(loader):
    loss = model(batch).loss
    G = -grad(loss, W)                     # G_t in R^{m x n}

    if step % update_proj_gap == 0:
        U, S, Vt = truncated_svd(G, rank=r)
        P = U[:, :r]                       # left singular subspace
        Q = Vt.T[:, :r]                    # right singular subspace

    R = P.T @ G @ Q                        # compact gradient core
    R_hat = optimizer.update(R)            # Adam/Adafactor states live here
    G_hat = P @ R_hat @ Q.T                # project back to original space
    W = W + lr * G_hat                     # full weight matrix is updated
```

GaLore 的出发点是反驳“想省显存就必须让权重更新低秩”这一常见做法。LoRA 把线性层写成 \(W = W_0 + BA\)，训练的是低秩因子 \(B,A\)，这会减少可训练参数和优化器状态，但也把搜索空间绑定在 adapter 的低秩参数化里。GaLore 认为真正占用大量显存的是 Adam 这类优化器为每个权重元素维护的一阶矩、二阶矩和梯度，而不是一定要把最终权重限制为低秩。因此它保留 \(W\in\mathbb{R}^{m\times n}\) 的完整形状，只在优化器处理梯度时进入低维空间。

论文先给出常规全秩训练的更新形式。设 \(G_t=-\nabla_W\phi_t(W_t)\) 是第 \(t\) 步反向传播得到的负梯度，\(\rho_t\) 是 Adam 这类带状态的逐元素梯度正则器，则完整更新可以写成：

$$
W_T = W_0 + \eta \sum_{t=0}^{T-1}\tilde{G}_t
    = W_0 + \eta \sum_{t=0}^{T-1}\rho_t(G_t).
$$

对 Adam 来说，需要维护 \(M_t,V_t\in\mathbb{R}^{m\times n}\)：

$$
M_t=\beta_1M_{t-1}+(1-\beta_1)G_t,
\qquad
V_t=\beta_2V_{t-1}+(1-\beta_2)G_t^2,
$$

$$
\tilde{G}_t=\frac{M_t}{\sqrt{V_t}+\epsilon}.
$$

这解释了为什么全参训练显存会被优化器状态放大：权重、梯度、一阶矩、二阶矩都与 \(mn\) 同阶。GaLore 的关键替换是只让 \(\rho_t\) 看到压缩后的梯度核心，而不是原始 \(G_t\)：

$$
\tilde{G}_t = P_t\,\rho_t\left(P_t^\top G_t Q_t\right)Q_t^\top,
\qquad
P_t\in\mathbb{R}^{m\times r},\ Q_t\in\mathbb{R}^{n\times r}.
$$

直觉上，\(P_t^\top G_t Q_t\) 是梯度在当前主奇异子空间里的低维坐标；优化器只在这个小矩阵上维护动量和方差，处理完再投影回原始维度。实际实现还会使用单侧投影来平衡投影矩阵存储与计算：当 \(m\le n\) 时使用 \(P^\top G\)，否则使用 \(GQ\)，因此压缩梯度的形状通常是 \(r\times n\) 或 \(m\times r\)，而不是必须使用 \(r\times r\) 的双侧核心。

GaLore 为什么敢压缩梯度？论文的理论部分说明，在一类可逆网络和 Transformer FFN 的分析框架下，权重梯度会随训练呈现低稳定秩。一个抽象形式是：

$$
G_t = \frac{1}{N}\sum_{i=1}^{N}\left(A_i-B_iW_tC_i\right),
$$

其中 \(B_i,C_i\) 为半正定结构。若训练动力学让非主导方向衰减，那么 \(G_t\) 的稳定秩 \(\operatorname{sr}(G_t)\) 会下降。论文给出的上界包含一个随 \(t\) 指数衰减的项：

$$
\operatorname{sr}(G_t)
\le
\operatorname{sr}(G^{\parallel}_{t_0})+
\left(\frac{1-\eta\lambda_2}{1-\eta\lambda_1}\right)^{2(t-t_0)}
\frac{\|G_{t_0}-G^{\parallel}_{t_0}\|_F^2}{\|G^{\parallel}_{t_0}\|_2^2}.
$$

这里的含义不需要死记公式：训练若进入某个局部稳定阶段，梯度中非关键特征方向的能量会更快衰减，剩下的主要变化集中在少数方向上。GaLore 用截断 SVD 动态跟踪这些方向：

$$
G_t = U S V^\top \approx \sum_{i=1}^{r}s_i u_i v_i^\top,
\qquad
P_t=[u_1,\dots,u_r],\ Q_t=[v_1,\dots,v_r].
$$

子空间切换是 GaLore 区别于“固定低维训练”的关键。若 \(P,Q\) 永远不变，权重只能沿固定子空间累计更新，长期看仍会限制表达能力。GaLore 每隔 \(T\) 步重新从当前梯度估计 SVD 子空间，于是权重可以写成多段低秩更新的和：

$$
W_t = W_0 + \Delta W_{T_1}+\Delta W_{T_2}+\cdots+\Delta W_{T_k}.
$$

每个 \(\Delta W_{T_i}\) 处在一个低秩子空间内，但不同阶段的子空间不同，累加后不再等价于单个固定低秩 adapter。这也是它能用于从头预训练的原因：ReLoRA 等方法往往需要全秩 warmup，而 GaLore 的低显存状态从训练早期就可以启用。

与 LoRA 的差别可以概括为“低秩在哪里”。LoRA 低秩化的是参数增量 \(\Delta W=BA\)，所以推理时可以合并、训练时参数少，但训练轨迹天然不同于全参优化；GaLore 低秩化的是优化器看到的梯度统计，权重矩阵本身仍完整更新。当 rank 达到全秩且 \(\rho_t\equiv 1\) 时，GaLore 可退化到原始梯度下降轨迹；而 LoRA 即使 rank 足够大，同时优化 \(B,A\) 的非线性参数化也仍会改变优化路径。

> 💡 关键：GaLore 的“省显存”不是因为模型更小，而是因为 Adam 的 \(M,V\) 不再为完整 \(m\times n\) 梯度保存状态。它适合显存瓶颈主要来自优化器状态的 LLM 预训练/微调场景，也能和 8-bit optimizer、逐层权重更新等工程手段叠加。

#### 🧪 练习题
```yaml
question: "GaLore 与 LoRA 在低秩化对象上的核心区别是什么？"
options:
  - "GaLore 低秩化权重矩阵本身，LoRA 低秩化梯度矩阵"
  - "GaLore 低秩化优化器处理的梯度统计，LoRA 低秩化可训练权重增量"
  - "GaLore 只用于推理量化，LoRA 只用于训练量化"
  - "GaLore 必须冻结主模型权重，LoRA 必须更新全模型权重"
answer: 1
explain: "GaLore 将梯度投影到低秩子空间并在其中维护优化器状态，再投影回原空间更新完整权重；LoRA 则训练低秩 adapter 参数 BA。"
```
