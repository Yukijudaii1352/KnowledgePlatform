### Poseidon

```yaml
id: poseidon
name: Poseidon
full_name: "PDE基础模型 (Poseidon)"
year: "2024"
org: "ETH Zurich"
paper_url: "https://arxiv.org/abs/2405.19101"
category: "pde_solving"
parent: "fno"
motivation: "首个大规模PDE基础模型"
```

#### 📝 一句话总结

Poseidon 提出面向 PDE 解算子的基础模型：用可扩展 Operator Transformer 学习从初值/条件到完整解轨迹的映射，并通过 lead-time 条件化与 all2all 轨迹训练，让少量流体 PDE 预训练能迁移到大量未见过的 PDE 下游任务。

#### 🎯 核心要点

- **基础模型目标**：学习 PDE solution operator \(\mathcal{S}(t,a)\)，而不是只预测固定时间步或固定方程实例
- **主干模型 scOT**：使用层级式多尺度 SwinV2/shifted-window Transformer，并以 U-Net 式 patch merging/patch expansion 处理函数场
- **连续时间条件化**：在 Transformer block 中使用 lead-time conditioned layer norm，让同一模型可输入任意预测时间 \(t\)
- **all2all 训练策略**：利用时间依赖 PDE 解算子的半群性质，把单条轨迹中的任意 \((t_k,t_{\bar{k}})\) 快照对都变成训练样本，从 \(O(K)\) 扩展到 \(O(K^2)\)
- **预训练数据**：包含 6 个流体力学算子，4 个 compressible Euler、2 个 incompressible Navier-Stokes，共 77,840 条轨迹、11 个时间快照，经 all2all 后约 5.11M 训练样本
- **迁移评估**：在 15 个 out-of-distribution 下游任务上评估，其中 9 个涉及预训练未见过的 PDE 或物理过程
- **实现开放**：论文、代码和 PDEgym 数据集公开，可从 arXiv、GitHub 与 Hugging Face 访问

#### 🔬 深入细节

##### 图示与来源

![Poseidon scOT 与 all2all 训练示意图](https://arxiv.org/html/2405.19101v2/x2.png)
*图：Poseidon 的 scOT 主干、SwinV2 block、shifted window 机制和 all2all training。来源为 arXiv HTML Figure 2；论文页为 https://arxiv.org/abs/2405.19101，官方代码为 https://github.com/camlab-ethz/poseidon。*

##### 算法伪代码

```python
# Poseidon/scOT 预训练与下游微调伪代码
def build_all2all_pairs(trajectory):
    # trajectory = [u(t_0), ..., u(t_K)]
    pairs = []
    for k in range(K + 1):
        for k_bar in range(k, K + 1):
            lead_time = t[k_bar] - t[k]
            pairs.append((trajectory[k], lead_time, trajectory[k_bar]))
    return pairs

def scot_forward(u_in, lead_time):
    tokens = patch_embed(u_in)
    h = tokens
    for stage in encoder_stages:
        h = shifted_window_swin_block(h, time=lead_time)
        h = patch_merge(h)
    for stage in decoder_stages:
        h = patch_expand(h)
        h = convnext_skip_mix(h)
        h = shifted_window_swin_block(h, time=lead_time)
    return recover_field(h)

for pde_family, dataset in pretraining_operators:
    for trajectory in dataset:
        for u_t, dt, u_future in build_all2all_pairs(trajectory):
            pred = scot_forward(u_t, dt)
            loss = relative_l1(pred, u_future)
            optimizer.step(loss)

# 下游任务：载入预训练参数，替换/扩展输入输出通道后少样本微调
theta = load_poseidon_pretrained()
theta = finetune(theta, downstream_trajectories)
```

##### 问题设定：从“固定网格预测”到“解算子学习”

Poseidon 要学习的是 PDE 解算子。给定初值或条件 \(a\)，真实解算子 \(\mathcal{S}\) 输出任意时刻的解 \(\mathcal{S}(t,a)\)。这与普通自回归一步预测不同：模型不是只看前几个时间步滚动预测，而是显式把 lead time \(t\) 作为输入，目标是近似整个轨迹生成机制。

标准训练可以写成：

$$
\mathcal{L}(\theta)=\frac{1}{M(K+1)}
\sum_{i=1}^{M}\sum_{k=0}^{K}
\left\|\mathcal{S}_{\theta}^{*}(t_k,a_i)-\mathcal{S}(t_k,a_i)\right\|_{L^p(D)}^p
$$

这里 \(M\) 是轨迹条数，\(K+1\) 是每条轨迹的快照数。论文实际采用相对形式并以 \(p=1\) 为主，使不同 PDE/物理量的尺度更容易平衡。

##### scOT 架构：把视觉 Transformer 改造成算子学习器

Poseidon 的主干 scOT 先把输入函数场 \(a(x)\) 切成 patch 并线性嵌入，再用 SwinV2 shifted-window attention 在局部窗口内建模空间相关性。窗口在相邻层之间平移，因此每个 token 既能享受局部窗口 attention 的计算效率，也能跨层传播到更远空间区域。

SwinV2 block 的结构可概括为：

$$
\begin{aligned}
v'_{\ell} &= v_{\ell-1} + \mathrm{LN}_{\alpha_1^\ell,\beta_1^\ell}
\left(\mathrm{W\text{-}MSA}(v_{\ell-1})\right),\\
v_{\ell} &= v'_{\ell} + \mathrm{LN}_{\alpha_2^\ell,\beta_2^\ell}
\left(\mathrm{MLP}(v'_{\ell})\right).
\end{aligned}
$$

与普通 Swin 不同，Poseidon 把 layer norm 改成时间条件化形式：

$$
\mathrm{LN}_{\alpha(t),\beta(t)}(v)(x)
= \alpha(t)\odot \frac{v(x)-\mu_v(x)}{\sigma_v(x)}+\beta(t)
$$

其中 \(\alpha(t)=\bar{\alpha}t+\alpha\)，\(\beta(t)=\bar{\beta}t+\beta\)。直觉上，模型在不同 lead time 下使用不同的归一化尺度和偏置，相当于给每个时间跨度一个可学习的调制器，因此可以直接预测 \(t=0.3\)、\(t=1.0\) 或更长时间的解，而不必把时间离散固定死。

##### all2all 训练：把一条轨迹拆成大量解算子样本

时间依赖 PDE 的解算子具有半群性质：

$$
u(t^*)=\mathcal{S}(t^*,a)
=\mathcal{S}(t^*-t,u(t))
=\mathcal{S}(t^*-t,\mathcal{S}(t,a)),
\quad 0\le t\le t^*\le T
$$

Poseidon 利用这个性质，把轨迹中任意早晚快照对 \((u(t_k),u(t_{\bar{k}}))\) 都当作一个训练样本，输入是 \(u(t_k)\)，lead time 是 \(t_{\bar{k}}-t_k\)，监督目标是 \(u(t_{\bar{k}})\)。对应损失为：

$$
\widehat{\mathcal{L}}(\theta)=
\frac{1}{M\widehat{K}}
\sum_{i=1}^{M}\sum_{0\le k\le \bar{k}\le K}
\left\|
\mathcal{S}(t_{\bar{k}}-t_k,u_i(t_k))
-\mathcal{S}_{\theta}^{*}(t_{\bar{k}}-t_k,u_i(t_k))
\right\|_{L^p(D)}^p
$$

其中 \(\widehat{K}=(K+1)(K+2)/2\)。这一步是 Poseidon 成为基础模型的关键：它不只增加样本量，还强迫模型在多个时间间隔上学习一致的动力学表示。

##### 预训练与微调机制

预训练时，Poseidon 将不同 PDE 和不同数据分布用索引 \((\lambda,\xi)\) 表示，对每个算子 \(\mathcal{S}_{\lambda,\xi}\) 共享同一个 scOT。若不同物理系统通道数不同，则用额外常零通道补齐到统一维度，再统一输入模型。预训练目标是所有预训练算子的 all2all 损失平均：

$$
\theta^*=\arg\min_{\theta}
\frac{1}{|\widehat{\Lambda}||\widehat{\Xi}|}
\sum_{\lambda\in\widehat{\Lambda}}
\sum_{\xi\in\widehat{\Xi}}
\widehat{\mathcal{L}}_{\lambda,\xi}(\theta)
$$

微调时，下游任务可以是新数据分布、新物理过程，甚至新 PDE。Poseidon 复用预训练的空间-时间表征，只针对下游算子做少样本微调。它也支持两类推理：直接输入目标 lead time 一次预测，或者把目标时间拆成若干步做 autoregressive rollout。

> 💡 关键：Poseidon 的贡献不只是“Transformer 更大”，而是把 PDE 解算子、连续时间调制、半群数据扩增和跨 PDE 预训练放在同一个训练范式里。

#### 🧪 练习题

```yaml
question: "Poseidon 的 all2all training 主要利用了时间依赖 PDE 解算子的哪一条性质？"
options:
  - "傅里叶变换后所有 PDE 都变成线性方程"
  - "解算子满足半群性质，可把同一轨迹中的任意早晚快照对作为训练样本"
  - "SwinV2 attention 的窗口大小随时间自动增大"
  - "所有下游 PDE 都与 Navier-Stokes 方程完全相同"
answer: 1
explain: "all2all training 使用 \\(u(t^*)=\\mathcal{S}(t^*-t,u(t))\\)，把单条轨迹扩展为 \\(O(K^2)\\) 个监督对。"
```
