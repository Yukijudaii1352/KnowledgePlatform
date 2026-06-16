### SFed-LoRA：联邦学习低秩适配
```yaml
id: sfed_lora
name: SFed-LoRA
full_name: 联邦学习低秩适配 (SFed-LoRA)
year: "2026.03"
org: HKU
paper_url: https://arxiv.org/abs/2603.08058
category: frontier
parent: lora
motivation: 缩放因子缓解联邦学习秩不匹配
```

#### 📝 一句话总结
SFed-LoRA 提出了面向联邦 LoRA 的稳定缩放因子 \(\gamma_z=\alpha\sqrt{N/r}\)，解决高秩 adapter 在多客户端聚合后梯度塌缩的问题。它不改变 LoRA 架构，只修正本地 adapter 计算中的尺度，使高 rank 在联邦微调中重新变得可训练。

#### 🎯 核心要点
- 基于 FedSA-LoRA 的拆分聚合：服务端只聚合全局共享的 \(A_i\)，客户端保留本地个性化的 \(B_i\)
- 提出联邦稳定缩放因子：将 LoRA / FedSA-LoRA 的 \(\alpha/r\) 与 rsLoRA 的 \(\alpha/\sqrt r\) 扩展为 \(\gamma_z=\alpha\sqrt{N/r}\)
- 给出 \((N,r)\)-federated-stabilized adapter 定义：要求前向输出矩与反向梯度范数在客户端数 \(N\) 和秩 \(r\) 变化时保持稳定
- 理论上证明稳定条件：adapter 输出与输入梯度主项尺度为 \(\gamma_z^2 r/N\)，因此必须令 \(\gamma_z\in\Theta_z(\sqrt{N/r})\)
- 不增加推理延迟：仍使用 LoRA 的低秩矩阵乘积，训练后可合并到冻结权重或保留为标准 adapter
- 实验覆盖 Alpaca、GSM8K、GLUE，模型包括 LLaMA2-7B 与 RoBERTa-large，并测试 IID、non-IID、不同客户端数与不同 rank

#### 🔬 深入细节
![SFed-LoRA 框架图](https://arxiv.org/html/2603.08058v1/figure/sfedlora-mainfig.jpg)
*图：SFed-LoRA 在 FedSA-LoRA 拆分聚合框架上加入 \(\gamma_z=\alpha\sqrt{N/r}\) 缩放；客户端上传共享矩阵，保留本地矩阵，用尺度因子抵消客户端聚合与高秩扩展带来的方差错配。*

```python
# SFed-LoRA 联邦训练伪代码
# N: 客户端数, r: LoRA rank, alpha: 缩放超参数
# W0 冻结；每个客户端 i 持有本地 B_i，服务端维护共享 A_bar

gamma = alpha * sqrt(N / r)
initialize A_i ~ Normal(0, sigma_A^2) for each client i
initialize B_i = 0 for each client i
A_bar = average_i(A_i)

for round in range(num_rounds):
    server.broadcast(A_bar)

    uploaded_A = []
    for client i in selected_clients:
        A_i = A_bar
        for local_step in range(K):
            # LoRA adapter output: gamma * B_i @ A_i @ x
            y = frozen_model_forward(W0, x) + gamma * B_i @ A_i @ x
            loss = task_loss(y, target)
            update(B_i, A_i, grad(loss))
        uploaded_A.append(A_i)      # 只上传共享矩阵 A_i
        keep_local(B_i)             # B_i 不上传，保留本地个性化信息

    A_bar = average(uploaded_A)      # 服务端聚合共享低秩矩阵
```

LoRA 的基本形式是冻结原始权重 \(W_0\)，只训练低秩增量：

$$
h = W_0x + \gamma B_i A_i x,
$$

其中 \(A_i\in\mathbb{R}^{r\times k}\)、\(B_i\in\mathbb{R}^{d\times r}\)。普通 LoRA 通常令 \(\gamma=\alpha/r\)，rsLoRA 在单机训练中将其改为 \(\alpha/\sqrt r\)，以避免 rank 增大时更新幅度被过度压小。SFed-LoRA 的关键观察是：联邦场景不仅有 rank 维度，还有客户端聚合维度 \(N\)。如果仍使用单机缩放，服务端对共享矩阵求平均会改变 adapter 的统计量，导致高秩时梯度被压到接近 0，表现为“rank 越大越学不动”。

论文选择 FedSA-LoRA 作为理论分析基底，是因为它将低秩矩阵拆开处理：\(A_i\) 被上传和平均，\(B_i\) 留在本地。这比同时平均 \(B_iA_i\) 或分别平均两矩阵更容易分析，因为矩阵乘积的平均并不等于平均矩阵的乘积。按照论文附录的推导，经过本地更新与服务端聚合后，adapter 主项的期望尺度可以写成：

$$
\mathbb{E}\left[\gamma_z B_i^{(n)}A_i^{(n)}\right]
\approx
-\gamma_z^2\frac{r}{N}\sigma_A^2\eta
\sum_{s=0}^{n-1} v_{i,s}x_{i,s}^{\top}.
$$

这条式子的直觉非常直接：rank \(r\) 增大会放大低秩乘积中累加方向的数量，而客户端平均会引入 \(1/N\) 的尺度变化；如果缩放因子没有同时补偿 \(r\) 和 \(N\)，前向输出与反向梯度就无法保持同一数量级。论文将前向 \(h\)-阶矩与输入梯度都约束为 \(\Theta_N(1)\) 和 \(\Theta_r(1)\)，因此要求：

$$
\Theta_z\left(\left(\gamma_z^2\frac{r}{N}\right)^h\right)=\Theta(1),
\quad\Rightarrow\quad
\gamma_z\in\Theta_z\left(\sqrt{\frac{N}{r}}\right).
$$

实现上，SFed-LoRA 采用带超参数的形式：

$$
\gamma_z=\alpha\sqrt{\frac{N}{r}}.
$$

这个式子也解释了它和已有方法的关系：当没有联邦聚合影响时，\(N\) 可以视作常数，形式退化到类似 rsLoRA 的 \(1/\sqrt r\) 稳定化；当客户端数增大时，\(\sqrt N\) 项会补偿聚合导致的有效更新变弱。论文的实验也围绕这个机制展开：在 Alpaca 上固定客户端数、扫描 \(r\in\{4,8,32,128,512\}\) 时，FedSA-LoRA 的高秩梯度范数出现明显塌缩，FedSA-rsLoRA 只能部分缓解，而 SFed-LoRA 的不同 rank 曲线基本处于同一有效范围。

从训练流程看，SFed-LoRA 并不是一个新的 adapter 结构，而是一个联邦参数化规则。客户端仍然执行本地监督微调，损失函数仍可以是语言建模或下游任务交叉熵；变化只在 adapter forward 中的尺度 \(\gamma_z\)，以及服务端只聚合共享矩阵 \(A_i\)。这使它特别适合 cross-silo 场景：机构间不共享原始数据，本地保留 \(B_i\) 可以维持个性化表达，而共享 \(A\) 提供跨客户端可迁移的低秩子空间。

与传统 FedAvg + LoRA 相比，SFed-LoRA 避免了直接聚合完整 adapter 带来的乘积误差；与 FedSA-LoRA 相比，它修复了原始 \(\alpha/r\) 在高 rank 下过度衰减的问题；与 rsLoRA 相比，它显式建模了客户端数 \(N\)。论文在 LLaMA2-7B 的 Alpaca/GSM8K、RoBERTa-large 的 GLUE 上报告了更快收敛和更稳定的高秩性能，尤其是在 \(r=512\) 与 \(N\in\{5,10,15,20\}\) 变化时，SFed-LoRA 的 perplexity 对客户端扩展更不敏感。

> 💡 关键：SFed-LoRA 的核心不是“更大的 rank 一定更好”，而是先让高 rank 不再因为错误缩放而失效。只有当梯度尺度稳定后，额外 rank 才可能转化为有效容量。

#### 🧪 练习题
```yaml
question: "SFed-LoRA 为什么将缩放因子设为 gamma_z = alpha * sqrt(N / r)？"
options:
  - "为了让每个客户端上传更多 LoRA 参数"
  - "为了同时补偿 rank 扩展和客户端聚合造成的统计尺度变化"
  - "为了把 LoRA 矩阵从低秩变成满秩矩阵"
  - "为了减少服务端平均的通信轮数"
answer: 1
explain: "论文推导中 adapter 输出和输入梯度主项尺度为 gamma_z^2 * r / N；令 gamma_z 与 sqrt(N/r) 同阶可以使该主项保持常数量级，避免高秩梯度塌缩。"
```
