### MoE-POT

```yaml
id: moe_pot
name: MoE-POT
full_name: 混合专家算子Transformer (Mixture-of-Experts Operator Transformer)
year: '2026'
org: 清华大学
paper_url: https://arxiv.org/abs/2510.moe
category: operators
parent: fno
motivation: 混合专家系统扩展至亿级参数
```

#### 📝 一句话总结

MoE-POT 将稀疏激活的 Mixture-of-Experts 引入 PDE operator transformer 预训练，在每层用路由网络从 16 个 routed experts 中选择 4 个并叠加 2 个 shared experts，从而在控制推理成本的同时扩展参数规模并缓解多 PDE 数据集混训的负迁移。

#### 🎯 核心要点

- **来源限制说明**：任务给定 `https://arxiv.org/abs/2510.moe` 不是有效 arXiv URL；可追溯论文为 `Mixture-of-Experts Operator Transformer for Large-Scale PDE Pre-Training`，arXiv: `https://arxiv.org/abs/2510.25803`，OpenReview: `https://openreview.net/forum?id=PNgG4H3q9D`
- **预训练目标**：沿用自回归去噪 operator pre-training，从历史 PDE 帧 \(\bm{u}^{<t}+\epsilon\) 预测下一帧 \(\bm{u}^t\)
- **输入编码**：用 patchification layer 加时空位置编码将每个时间步的场变为 patch tokens，再通过 Fourier temporal aggregation 汇聚时间动态
- **主干 block**：每个 block 包含 Fourier layer 与 MoE layer，Fourier layer 负责核积分/全局传播，MoE layer 负责按 PDE 类型选择专家
- **稀疏 MoE 结构**：每层含 16 个 routed experts 和 2 个 shared experts；推理时 Top-4 routed experts + 2 shared experts 被激活
- **共享与专用分工**：shared experts 捕获守恒律、对称性等跨 PDE 共性，routed experts 学习不同方程族的专有模式
- **负载均衡损失**：用 expert importance 的 coefficient of variation 惩罚路由塌缩，鼓励专家使用更均衡
- **多数据集预训练**：在 6 个公开 PDE 数据集上训练 30M 到 0.5B 参数模型，覆盖 FNO、PDEBench 和 CFDBench 来源
- **效果与解释性**：论文报告 90M activated params 模型相对 120M activated params 现有模型零样本误差最高降低约 40%，路由决策可用来以约 98% 准确率识别数据集类型

#### 🔬 深入细节

![MoE-POT 架构示意图](https://arxiv.org/html/2510.25803v1/x4.png)
*图：MoE-POT 的模型架构。轨迹来自混合 PDE 数据集，模型用历史帧预测下一帧；MoE layer 由 shared experts、routed experts 和 router-gating network 组成。*

##### 算法伪代码

```python
# MoE-POT 训练伪代码
def moe_pot_forward(u_history):
    # u_history: [B, H, W, T, C]

    # 1. patchification + spatiotemporal positional encoding
    z_time = []
    for t in range(T):
        z_t = PatchConv(u_history[:, :, :, t] + pos_embed(x, y, t))
        z_time.append(z_t)

    # 2. temporal aggregation with Fourier feature
    z = sum(W_t(z_time[t]) * exp(-1j * gamma * t) for t in range(T))

    # 3. repeated Fourier + MoE blocks
    balance_loss = 0.0
    for block in blocks:
        z = block.fourier_layer(z)  # F^{-1}(R_phi * F[z])

        logits = block.router(z)        # CNN router, shape [B, N_r]
        weights = softmax(logits)
        topk_idx, topk_w = topk(weights, k=4)

        shared_out = mean(expert(z) for expert in block.shared_experts)  # 2 experts
        routed_out = sum(topk_w[k] * block.routed_experts[topk_idx[k]](z)
                         for k in range(4))
        z = shared_out + routed_out

        balance_loss += cv_importance_loss(weights)

    return decode_next_frame(z), balance_loss

for u_history, u_next in mixed_pde_loader:
    noisy_history = u_history + epsilon_noise()
    pred, lb = moe_pot_forward(noisy_history)
    loss = mse(pred, u_next) + lb
    loss.backward()
    optimizer.step()
```

##### 为什么需要 MoE

PDE 预训练面临两个冲突目标。第一，模型需要把不同方程族、边界条件和时空分辨率的数据混在一起学，才能成为更通用的 PDE foundation model；第二，直接把所有异构数据压进一个 dense backbone 往往产生负迁移。论文的 preliminary experiment 显示，同一方程族内不同参数混训只会带来相对温和的误差上升，而完全不同方程类型混训时误差可能急剧恶化。

MoE-POT 的设计目标是把“容量扩展”和“每次推理成本”解耦。dense 模型增大宽度/深度时，所有参数都会在推理中激活；MoE 则把参数拆成专家集合，只激活与当前输入最相关的一小部分。对 PDE 来说，路由网络还具有物理含义：不同数据集/方程族会触发不同专家组合，shared experts 则保留跨任务共性。

##### 输入编码与时间聚合

输入是时变 PDE 场：

$$
\bm{u}^{<T}\in\mathbb{R}^{H\times W\times T\times C}
$$

每个时间步先加可学习时空位置编码，再经 patchification layer：

$$
Z_p^t=\mathcal{P}(\bm{u}^t+\bm{p}^t),\quad t=1,\ldots,T
$$

其中 \(\mathcal{P}\) 是卷积层，位置编码可写为：

$$
p_{i,j}^t=W_p(x_i,y_j,t)
$$

随后用 Fourier feature 形式的时间聚合把多个历史帧汇成局部动态表示：

$$
\bm{z}_{\operatorname{agg}}
=\sum_t W_t\cdot\bm{z}_p^t e^{-i\bm{\gamma}t}
$$

直觉上，这一步让模型仅从观测轨迹中隐式推断 PDE 类型和动力学参数，而不依赖显式方程系数输入。

##### Fourier Layer

每个主干 block 先通过 Fourier layer 近似核积分。连续形式为：

$$
(\mathcal{K}_{\phi}z^l)(x)
=\int_{\Omega}\kappa(x,y;\phi)z^l(y)\,dy
$$

为了降低复杂度，令核具有平移不变性：

$$
\kappa(x,y;\phi)=\kappa(x-y;\phi)
$$

于是可在傅里叶域高效实现：

$$
(\mathcal{K}_{\phi}z^l)(x)
=\mathcal{F}^{-1}\left[R_{\phi}\cdot\mathcal{F}[z^l]\right]
$$

其中 \(R_\phi(k)\) 是频率相关的可学习变换。论文还使用 multi-head/grouping，把通道分成多个子空间分别进行频谱变换，以兼顾表达力和显存效率。

##### MoE Layer

MoE layer 接收 Fourier layer 输出的特征 \(z_0^l(x)\)。router-gating network \(s^l\) 产生 routed experts 的 logits：

$$
s^l(z_0^l(x))\in\mathbb{R}^{N_r},\qquad N_r=16
$$

softmax 后得到路由权重：

$$
w^l(z_0^l(x))=\operatorname{Softmax}(s^l(z_0^l(x)))\in\mathbb{R}^{N_r}
$$

为保持稀疏性，只保留 Top-\(K\) 项，论文默认 \(K=4\)：

$$
\operatorname{TopK}(w^l(z_0^l(x)))
=\{(i_k,w_k^l(z_0^l(x)))\}_{k=1}^{K}
$$

shared experts 始终激活，routed experts 动态选择。MoE 输出为：

$$
z^{l+1}(x)
=\frac{1}{N_s}\sum_{i=1}^{N_s}E_i^{l(s)}(z_0^l(x))
+\sum_{k=1}^{K}w_k^l(z_0^l(x))\cdot E_{i_k}^{l(r)}(z_0^l(x))
$$

其中 \(N_s=2\)，\(N_r=16\)，\(K=4\)。论文将 expert 和 router 都实现为 CNN，以保留 PDE 场的局部空间结构。

> 💡 关键：shared experts 提供所有 PDE 都能用的“公共物理子程序”，routed experts 则按输入动态选择，降低不同方程族之间的参数冲突。

##### 负载均衡与训练损失

MoE 的常见风险是 routing collapse：少数专家被频繁选择，其余专家长期闲置。MoE-POT 对每层每个 expert 定义 batch importance：

$$
\operatorname{Importance}_i^l=\sum_{b=1}^{B}w_{i,b}^l(x)
$$

再用 routed experts importance 的变异系数作为均衡惩罚：

$$
\mathcal{L}_{balance}^l
=w_{bal}\cdot
\operatorname{CV}\left(\{\operatorname{Importance}_i^l\}_{i=1}^{N_r}\right)^2
$$

主任务是自回归去噪预测下一帧：

$$
\mathcal{L}
=\sum_{1\leq t\leq T}
\left\|\mathcal{G}_w(\bm{u}^{<t}+\bm{\varepsilon})-\bm{u}^t\right\|_2^2
+\sum_{l=1}^{N}\mathcal{L}_{balance}^l
$$

噪声 \(\bm{\varepsilon}\) 缓解训练和多步推理之间的分布偏移；balance loss 则保证扩大总参数量后，专家不会退化成只用少数几个。

##### 与 dense operator transformer 的区别

| 方面 | Dense POT/DPOT 类模型 | MoE-POT |
|------|----------------------|---------|
| 容量扩展 | 增宽/加深，所有参数激活 | 增加专家，总参数变大但稀疏激活 |
| 多 PDE 混训 | 单一参数空间承载全部方程 | 路由专家隔离方程族特征 |
| 推理成本 | 近似随总参数线性增长 | 随 activated experts 增长 |
| 可解释性 | 难判断方程类型影响 | routing pattern 可反映数据集/PDE 类型 |
| 风险 | 负迁移、过高推理成本 | routing collapse，需要 balance loss |

论文的解释性分析显示，训练后的 router-gating pattern 可用于推断数据集类型，说明 MoE 不只是增加参数量，而是在不同 PDE 动力学之间形成了可观察的专家分工。

#### 🧪 练习题

```yaml
question: "MoE-POT 中 shared experts 与 routed experts 的分工是什么？"
options:
  - "shared experts 只用于训练，routed experts 只用于推理"
  - "shared experts 始终激活以学习跨 PDE 共性，routed experts 由 router 动态选择以学习方程特异模式"
  - "shared experts 用于处理图结构，routed experts 用于处理文本 token"
  - "shared experts 负责损失函数，routed experts 负责数据增强"
answer: 1
explain: "MoE-POT 每层固定激活 2 个 shared experts，同时从 16 个 routed experts 中选择 Top-4；这种设计兼顾公共物理规律与不同 PDE 类型的专门化。"
```
