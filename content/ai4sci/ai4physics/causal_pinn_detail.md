### Causal PINN: 因果PINN (Causal Physics-Informed Neural Networks)

```yaml
id: causal_pinn
name: Causal PINN
full_name: 因果PINN (Causal Physics-Informed Neural Networks)
year: '2022'
org: 宾大
paper_url: https://arxiv.org/abs/2203.07404
category: pde_solving
parent: pinn
motivation: 时间因果律加权解决长时程收敛
```

#### 📝 一句话总结
Causal PINN 通过按时间因果顺序重加权 PDE residual，使模型只有在较早时间残差被充分压低后，才强烈优化较晚时间残差。它解决了连续时间 PINN 同时最小化所有时间点 residual、可能先拟合后期状态而违反时间因果结构的问题。

#### 🎯 核心要点
- 失败诊断：标准连续时间 PINN 的全局 residual loss 会同时优化所有时间点，可能在早期状态未正确时把后期 residual 压低到无意义的小值。
- 时间残差分解：把 residual loss 写成 \(\mathcal{L}_r(\theta)=\frac{1}{N_t}\sum_i \mathcal{L}_r(t_i,\theta)\)，显式区分每个时间切片的误差。
- 因果权重：为每个时间点设置 \(w_i=\exp(-\epsilon\sum_{k<i}\mathcal{L}_r(t_k,\theta))\)，前序 residual 大时，后序权重接近 0。
- 初值纳入因果链：把 \(\lambda_{ic}\mathcal{L}_{ic}\) 当作 \(t_0\) 的特殊时间残差，先确保初始条件被拟合。
- 退火策略：用 \(\epsilon\in[10^{-2},10^{-1},10^0,10^1,10^2]\) 逐步增强因果约束，减少单一 \(\epsilon\) 调参难度。
- 收敛判据：当所有时间权重接近 1，例如 \(\min_i w_i>\delta\)，说明前序 residual 已足够小，可以停止当前训练阶段。
- 工程细节：论文实现中对 \(w_i\) 使用 stop-gradient，避免梯度通过权重计算反传导致优化目标被扭曲。
- 适用结果：在 Allen-Cahn、Lorenz、Kuramoto-Sivashinsky 和湍流 Navier-Stokes 等标准 PINN 困难问题上显著提高精度。

#### 🔬 深入细节
来源说明：论文公开版本为 arXiv `https://arxiv.org/abs/2203.07404`，ar5iv HTML 为 `https://ar5iv.labs.arxiv.org/html/2203.07404`。下图来自论文 Figure 1 和 Figure 3 的公开渲染，展示标准 PINN 失败与因果加权训练后的 Allen-Cahn 结果。

![标准 PINN 在 Allen-Cahn 方程上违反时间因果导致失败](https://ar5iv.labs.arxiv.org/html/2203.07404/assets/AC_vanila_PINN_pred.png)
*图：标准连续时间 PINN 在 Allen-Cahn 方程上给出错误中间态，虽然部分后期 residual 可被压低。*

![Causal PINN 在 Allen-Cahn 方程上的预测结果](https://ar5iv.labs.arxiv.org/html/2203.07404/assets/AC_TW_PINN_pred.png)
*图：使用因果时间权重后，同一 Allen-Cahn 问题的预测明显贴近参考解。*

```python
# Causal training for PINNs 伪代码
initialize PINN u_theta(t, x)
time_grid = [t0, t1, ..., tN]
eps_schedule = [1e-2, 1e-1, 1e0, 1e1, 1e2]

def temporal_loss(i, theta):
    if i == 0:
        return lambda_ic * initial_condition_loss(u_theta, theta)
    return mean(abs(d_dt(u_theta, t_i, x) + N_operator(u_theta, t_i, x)) ** 2)

for epsilon in eps_schedule:
    for step in range(S):
        L = [temporal_loss(i, theta) for i in range(N + 1)]
        weights = [1.0]
        for i in range(1, N + 1):
            previous_error = sum(stop_gradient(L[k]) for k in range(i))
            weights.append(exp(-epsilon * previous_error))

        total_loss = mean(weights[i] * L[i] for i in range(N + 1))
        theta = optimizer_step(total_loss, theta)

        if min(weights) > delta:
            break
```

标准 PINN 考虑时间依赖 PDE：

$$
\mathbf{u}_t+\mathcal{N}[\mathbf{u}]=0,\qquad
t\in[0,T],\ \mathbf{x}\in\Omega,
$$

并用神经网络 \(\mathbf{u}_\theta(t,\mathbf{x})\) 近似解。常规训练目标是：

$$
\mathcal{L}(\theta)
=\lambda_{ic}\mathcal{L}_{ic}(\theta)
+\lambda_{bc}\mathcal{L}_{bc}(\theta)
+\lambda_r\mathcal{L}_r(\theta).
$$

其中 residual loss 为：

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_r}\sum_{i=1}^{N_r}
\left|
\frac{\partial \mathbf{u}_\theta}{\partial t}(t_r^i,\mathbf{x}_r^i)
+\mathcal{N}[\mathbf{u}_\theta](t_r^i,\mathbf{x}_r^i)
\right|^2.
$$

Causal PINN 的第一步是把 residual 按时间切片拆开。若 \(0=t_1<t_2<\cdots<t_{N_t}=T\)，空间点为 \(\{\mathbf{x}_j\}_{j=1}^{N_x}\)，则：

$$
\mathcal{L}_r(t_i,\theta)
=\frac{1}{N_x}\sum_{j=1}^{N_x}
\left|
\frac{\partial \mathbf{u}_\theta}{\partial t}(t_i,\mathbf{x}_j)
+\mathcal{N}[\mathbf{u}_\theta](t_i,\mathbf{x}_j)
\right|^2,
$$

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_t}\sum_{i=1}^{N_t}\mathcal{L}_r(t_i,\theta).
$$

为什么普通 PINN 会违反时间因果？用 forward Euler 近似时间导数时，第 \(i\) 个时间片 residual 近似依赖相邻状态：

$$
\mathcal{L}_r(t_i,\theta)
\approx
\frac{1}{N_x}\sum_{j=1}^{N_x}
\left|
\frac{\mathbf{u}_\theta(t_i,\mathbf{x}_j)-\mathbf{u}_\theta(t_{i-1},\mathbf{x}_j)}{\Delta t}
+\mathcal{N}[\mathbf{u}_\theta](t_i,\mathbf{x}_j)
\right|^2.
$$

如果 \(t_{i-1}\) 的状态仍是错的，单独把 \(t_i\) 的 residual 压低并不表示 \(t_i\) 的解正确。标准 loss 却把所有时间点并列求和，优化器可能先降低后期 residual，从而形成“后面的方程看似满足，前面的因果来源仍未解决”的错误收敛。

论文提出的因果 residual loss 是：

$$
\mathcal{L}_r(\theta)
=\frac{1}{N_t}\sum_{i=1}^{N_t}
w_i\mathcal{L}_r(t_i,\theta),
$$

其中时间权重由过去 residual 的累积误差决定：

$$
w_i=
\exp\left(
-\epsilon\sum_{k=1}^{i-1}\mathcal{L}_r(t_k,\theta)
\right),\qquad i=2,\ldots,N_t.
$$

若早期时间片 residual 很大，后期 \(w_i\) 会接近 0，优化器几乎不会关注后期 residual；只有当前序 residual 降到足够小，后续权重才逐步接近 1。这相当于把时间推进的因果顺序嵌入连续时间 PINN 的 loss，而不需要把模型改成显式 time-marching solver。

完整算法还把初始条件作为 \(t_0\) 的特殊项：

$$
\mathcal{L}(t_0,\theta)=\lambda_{ic}\mathcal{L}_{ic}(\theta),
$$

并优化加权总损失：

$$
\mathcal{L}(\theta)
=\frac{1}{N_t}\sum_{i=0}^{N_t}w_i\mathcal{L}(t_i,\theta).
$$

> 💡 关键：因果权重不是为了“永久忽略”后期时间点，而是让后期时间点等待前序条件成熟。当所有 \(w_i\) 接近 1 时，说明从初值到后期的 residual 链条都已被激活。

\(\epsilon\) 控制权重曲线陡峭程度。太小会让后期权重过早激活，因果约束弱；太大则要求早期 residual 极小后后期才有梯度，优化可能困难。因此论文使用退火序列逐步增强约束，并建议用 \(\min_i w_i>\delta\) 作为阶段收敛判据。这个判据比只看总 loss 更有物理含义，因为总 loss 可能在后期权重尚未激活时已经很小。

该方法与 adaptive time sampling 或 time-marching 有相似动机，但实现不同。adaptive time sampling 改变采样密度，time-marching 显式切时间窗；Causal PINN 保留连续时间 PINN 的整体形式，只在 residual loss 中加入依赖历史误差的权重。因此它可嵌入现有 PINN、physics-informed DeepONet 或 physics-informed neural operator 训练流程中。

#### 🧪 练习题
```yaml
question: "Causal PINN 中权重 \\(w_i=\\exp(-\\epsilon\\sum_{k<i}\\mathcal{L}_r(t_k))\\) 的主要目的是什么？"
options:
  - "让所有时间点的 residual 始终具有相同权重"
  - "当前序时间 residual 仍大时降低后序时间 residual 的优化权重"
  - "只优化最终时刻的误差"
  - "把 PDE residual 替换成监督数据误差"
answer: 1
explain: "该权重把时间因果顺序写入 loss：只有较早时间片 residual 被压低后，较晚时间片权重才会接近 1 并被充分优化。"
```
