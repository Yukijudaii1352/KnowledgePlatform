### ReLoBRaLo — 相对损失平衡随机回溯 (Relative Loss Balancing with Random Lookback)

```yaml
id: relobralo
name: ReLoBRaLo
full_name: 相对损失平衡随机回溯 (Relative Loss Balancing with Random Lookback)
year: '2021'
org: ETH Zurich
paper_url: https://arxiv.org/abs/2110.09813
category: pinn_family
parent: lb_pinn
motivation: 基于损失变化率动态平衡权重
```

#### 📝 一句话总结

ReLoBRaLo 用各损失项的相对下降速度而不是绝对值或梯度范数来分配 PINN 权重，并通过指数平滑与随机回溯机制让训练周期性关注长期落后的物理约束。

#### 🎯 核心要点

- **目标场景**：解决 PINN 中 PDE、边界、初值、数据损失量纲不同、竞争关系强、固定权重难调的问题
- **相对损失标准**：根据 \(\mathcal{L}_i(t)/\mathcal{L}_i(t')\) 衡量第 \(i\) 项从历史时刻到当前的进展，而不是直接比较损失绝对大小
- **SoftAdapt 式归一化**：用带温度 \(\mathcal{T}\) 的 softmax 把每项相对进展转成有界权重，并乘以损失项数量 \(m\)
- **随机回溯**：引入 Bernoulli 变量 \(\rho\)，有时回看初始损失 \(\mathcal{L}_i(0)\)，避免模型只记住短期变化
- **指数平滑**：用 \(\alpha\) 平滑权重变化，减少每一步损失空间剧烈扭曲
- **无需梯度统计**：相比 GradNorm 和 Learning Rate Annealing，不需要每个损失项单独反向传播，计算开销更低
- **基准任务**：在 Burgers 方程、Kirchhoff 板弯曲方程、Helmholtz 方程的正问题和反问题上验证

#### 🔬 深入细节

##### 核心图示与来源

![PINN 多损失结构示意](https://raw.githubusercontent.com/rbischof/relative_balancing/main/images/PINNS_Loss.png)
*图：作者开源仓库中的 PINN 多损失结构图。ReLoBRaLo 作用于这些 PDE/边界/初值/数据损失项的权重分配。*

> 来源说明：论文 arXiv 页面可访问，TeX 源码中包含完整公式与实验图；作者仓库 `https://github.com/rbischof/relative_balancing` 提供可访问的图像与训练代码。

##### 算法伪代码

```python
# ReLoBRaLo 权重更新伪代码
# 输入: m 个 PINN 损失 L_i, 温度 T, 指数平滑 alpha, 回溯概率 p=E[rho]
# 输出: 动态权重 lambda_i

lambda_prev = ones(m)
L0 = evaluate_losses()
L_prev = L0

for step in range(1, num_steps + 1):
    L = evaluate_losses()  # [L_1(t), ..., L_m(t)]

    def balanced_weights(reference_losses):
        # 相对进展越差, softmax 权重越大
        scores = [L[i] / (T * reference_losses[i] + eps) for i in range(m)]
        return m * softmax(scores)

    lambda_short = balanced_weights(L_prev)     # 看上一步
    lambda_start = balanced_weights(L0)         # 看训练起点

    rho = bernoulli(p)                          # rho=1 保留历史, rho=0 随机回溯
    lambda_hist = rho * lambda_prev + (1 - rho) * lambda_start
    lambda_t = alpha * lambda_hist + (1 - alpha) * lambda_short
    lambda_t = stop_gradient(lambda_t)

    total_loss = sum(lambda_t[i] * L[i] for i in range(m))
    optimizer.step(total_loss)

    lambda_prev = lambda_t
    L_prev = L
```

##### 核心公式

ReLoBRaLo 从线性标量化的多目标 PINN 损失出发：

$$
\mathcal{L}(\theta)=\sum_{i=1}^{m}\lambda_i\mathcal{L}_i(\theta)
$$

关键是如何更新 \(\lambda_i\)。首先基于当前损失与某个历史时刻 \(t'\) 的相对比例计算候选权重：

$$
\lambda_i^{bal}(t,t')=
m\cdot
\frac{
\exp\left(\frac{\mathcal{L}_i(t)}
{\mathcal{T}\mathcal{L}_i(t')}\right)
}{
\sum_{j=1}^{m}
\exp\left(\frac{\mathcal{L}_j(t)}
{\mathcal{T}\mathcal{L}_j(t')}\right)
}
$$

如果某一项相对下降慢，比例 \(\mathcal{L}_i(t)/\mathcal{L}_i(t')\) 更大，softmax 会给它更高权重。温度 \(\mathcal{T}\) 控制激进程度：\(\mathcal{T}\) 越小，权重越接近“只关注最落后项”；\(\mathcal{T}\) 越大，权重越接近均匀分配。

然后用随机回溯混合历史权重与从初始损失计算出的权重：

$$
\lambda_i^{hist}(t)=
\rho\lambda_i(t-1)+(1-\rho)\lambda_i^{bal}(t,0),
\qquad \rho\sim \mathrm{Bernoulli}(\mathbb{E}[\rho])
$$

最后用指数衰减得到当前训练步的实际权重：

$$
\lambda_i(t)=
\alpha\lambda_i^{hist}(t)+(1-\alpha)\lambda_i^{bal}(t,t-1)
$$

> 💡 关键：ReLoBRaLo 不是奖励“损失值大”的项，而是奖励“相对进展慢”的项，因此能在量纲不同的 PDE、边界、初值损失之间做更公平的比较。

##### 方法机制

Learning Rate Annealing 依赖梯度统计，GradNorm 还需要额外优化权重；这两类方法在损失项数量很多时会引入明显计算开销。ReLoBRaLo 只读取损失值序列，避免为每个损失单独做反向传播，因此适合 Kirchhoff 这类含多条边界条件和高阶导数的 PINN。

随机回溯是它区别于普通 SoftAdapt 的核心。只看 \(t-1\) 会导致模型容易忘记某些长期被牺牲的约束；只看初始点又可能太僵硬，阻碍局部适应。Bernoulli 回溯在二者之间折中：大多数时间跟随短期变化，偶尔根据训练初始状态重新审视谁真正落后。

在 Burgers 方程中，损失通常包含 PDE 残差、左右边界和初值：

$$
\mathcal{L}=
\lambda_0\mathcal{L}_\Omega+
\lambda_1\mathcal{L}_{\Gamma_1}+
\lambda_2\mathcal{L}_{\Gamma_2}+
\lambda_3\mathcal{L}_{\Upsilon}
$$

其中

$$
\mathcal{L}_\Omega=
\frac{1}{|\hat{\Omega}|}\sum_{(x,t)\in\hat{\Omega}}
\left\|
\frac{\partial U}{\partial t}
+U\frac{\partial U}{\partial x}
-\nu\frac{\partial^2 U}{\partial x^2}
\right\|_2^2
$$

如果训练早期边界项下降很快、PDE 残差下降慢，ReLoBRaLo 会提高 PDE 项权重；如果后期边界项开始恶化，随机回溯能重新抬高边界项，而不是让网络只优化最显眼的 PDE 残差。

##### 实验与局限

论文比较了 ReLoBRaLo、SoftAdapt、GradNorm、Learning Rate Annealing 和手工权重基线。ReLoBRaLo 在多个正/反问题上通常取得更好的精度，并且由于不依赖梯度统计，计算开销接近 SoftAdapt，明显低于 GradNorm 和 LR Annealing。论文也指出超参数仍然重要：\(\alpha\) 决定记忆长度，\(\mathcal{T}\) 决定权重分布尖锐度，\(\mathbb{E}[\rho]\) 决定随机回溯频率。Helmholtz 这类边界项容易被忽视的问题，需要更激进的温度和更频繁的回溯。

#### 🧪 练习题

```yaml
question: "ReLoBRaLo 中随机回溯参数 ρ 的主要作用是什么？"
options:
  - "随机删除一部分训练样本以减少过拟合"
  - "偶尔用初始损失作为参照，提醒模型关注长期进展慢的损失项"
  - "随机冻结网络层以降低计算量"
  - "把所有损失权重固定为相同数值"
answer: 1
explain: "ρ 是 Bernoulli 随机变量；当发生回溯时，权重根据 L_i(t)/L_i(0) 计算，可避免训练只关注短期损失变化。"
```
