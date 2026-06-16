### Poseidon — PDE高效基础模型 (Efficient Foundation Models for PDEs)

```yaml
id: poseidon
name: Poseidon
full_name: PDE高效基础模型 (Efficient Foundation Models for PDEs)
year: '2026'
org: ETH Zurich
paper_url: https://arxiv.org/abs/2602.15004
category: operators
parent: fno
motivation: PDE基础模型20样本达FNO千样本精度
```

#### 📝 一句话总结

Poseidon 提出以 scalable Operator Transformer (scOT) 为骨干的 PDE 基础模型，用 lead-time 条件化和 all2all 训练把少量 PDE 轨迹扩展成大规模算子学习样本，从而在下游 PDE 上用极少标注样本达到甚至超过专用 FNO 的精度。

#### 🎯 核心要点

- **scOT 多尺度算子 Transformer**：用 patch embedding、SwinV2 shifted-window attention、patch merging/expansion 和 U-Net 式跳连构成多尺度神经算子。
- **连续时间条件化**：在 LayerNorm 中注入 lead time \(t\)，使同一个模型可以直接查询任意目标时刻的解，而不只做固定步长预测。
- **all2all 训练策略**：利用时间相关 PDE 解算子的半群性质，把一条长度 \(K\) 的轨迹从 \(O(K)\) 个相邻样本扩展为 \(O(K^2)\) 个任意起止时间对。
- **PDEgym 预训练语料**：在 compressible Euler 和 incompressible Navier-Stokes 的多种数据分布上预训练，再迁移到 15 个未见下游任务。
- **跨 PDE 迁移方式**：通过通道补零、任务特定 embedding/recovery 层和主干参数迁移，把不同物理变量数目的 PDE 映射到统一 scOT 骨干。
- **样本效率突出**：论文报告 Poseidon 在 14/15 个下游任务上表现最优，并且达到同等误差所需样本数相对 FNO 的中位节省约 50 倍；任务元信息中的“20 样本达 FNO 千样本精度”对应这种少样本迁移现象。
- **开源生态**：Poseidon 模型、PDEgym 数据集和训练代码均公开，便于复现实验和作为 PDE foundation model 基线。

#### 🔬 深入细节

##### 来源与核心图示

任务给出的 `paper_url` 指向 `2602.15004`，该链接实际是 2026 年将 Poseidon 用作火星大气 weather emulator 的应用论文；Poseidon 方法本体的可访问论文是 `https://arxiv.org/abs/2405.19101`，官方代码为 `https://github.com/camlab-ethz/poseidon`。下面的方法解读以 Poseidon 本体论文为主，并把任务给出的 URL 视作相关应用来源。

![Poseidon / scOT 架构与 all2all 训练](https://arxiv.org/html/2405.19101v2/x2.png)
*图：scOT 主干、SwinV2 block、shifted-window attention 和 all2all 训练示意；Poseidon 用该骨干学习从初始条件到整条 PDE 轨迹的解算子。*

##### 算法伪代码

```python
# Poseidon 预训练与少样本微调伪代码
model = scOT(
    patch_embed=True,
    swin_v2_stages=True,
    time_conditioned_layernorm=True,
    unet_multiscale=True,
)

# 预训练：每条 PDE 轨迹 u_i(t_0), ..., u_i(t_K) 生成 all2all 时间对
for trajectory in pretraining_pdegym:
    for k in range(K + 1):
        for l in range(k, K + 1):
            x0 = trajectory.u[k]                 # 作为新的“初值”
            tau = trajectory.t[l] - trajectory.t[k]
            target = trajectory.u[l]

            pred = model(x0, lead_time=tau)
            loss = relative_l2(pred, target)
            optimizer.step(loss)

# 下游任务：迁移主干，重置或高学习率训练任务特定 embedding/recovery
model.load_pretrained_backbone()
model.reset_task_specific_io_if_needed()
for batch in few_shot_downstream_data:
    pred = model(batch.initial_or_input_field, lead_time=batch.tau)
    loss = relative_l2(pred, batch.solution)
    optimizer.step(loss)
```

##### 问题形式与解算子目标

Poseidon 学的不是单个时间步映射，而是 PDE 的解算子。对时间相关 PDE，令初值或输入函数为 \(a\)，解为 \(u(t)\)，解算子写成：

$$
u(t)=\mathcal{S}(t,a),\qquad \mathcal{S}:[0,T]\times \mathcal{X}\to \mathcal{X}.
$$

因此训练目标是得到 \(\mathcal{S}^{*}_{\theta}(t,a)\approx \mathcal{S}(t,a)\)，给定初值后可以直接生成任意时刻的解，而不是像普通自回归模型那样只能一步一步向前滚动。这个目标对 foundation model 很关键：预训练得到的表示要能迁移到不同 PDE、不同初值分布、不同时间尺度和不同输出变量数。

##### scOT 主干：把视觉 Transformer 改造成神经算子

scOT 先把输入场 \(a\in C(D;\mathbb{R}^n)\) 切成非重叠 patch，并用共享线性层嵌入为 \(C\) 维 token：

$$
\mathbf{v}=\widehat{\mathbf{E}}(a)\in C(D;\mathbb{R}^{C}).
$$

随后 token 进入分层 SwinV2 Transformer。每个 block 只在窗口内做多头自注意力，下一层窗口平移半个窗口宽度，让信息跨窗口交换。相比全局 ViT 注意力，这把高分辨率 PDE 场上的注意力成本限制在局部窗口内；相比纯卷积，又保留了跨区域组合特征的能力。编码器通过 patch merging 降低空间分辨率并提高通道数，解码器通过 patch expansion 恢复分辨率，U-Net 式跳连用 ConvNeXt block 把同尺度编码特征传给解码端。

> 💡 关键：Poseidon 的“基础模型能力”不只来自 Transformer 容量，而来自多尺度算子结构。patch/窗口机制提供可扩展性，U-Net 层级提供局部到全局的 PDE 表达，任务特定输入输出层提供跨 PDE 变量数适配。

##### lead-time 条件化：连续时间查询

标准 LayerNorm 对所有时间使用同一归一化参数，难以区分短时间外推和长时间演化。Poseidon 在归一化后加入 lead-time 调制：

$$
\mathrm{LN}_{t}(z)=\alpha(t)\odot \frac{z-\mu(z)}{\sqrt{\sigma^2(z)+\epsilon}}+\beta(t),
$$

$$
\alpha(t)=\alpha_1 t+\alpha_0,\qquad \beta(t)=\beta_1 t+\beta_0.
$$

其中 \(\alpha_1,\alpha_0,\beta_1,\beta_0\) 是可学习参数。直觉上，lead time 是“要求模型演化多远”的条件变量：小 \(t\) 更像局部时间推进，大 \(t\) 需要更强的全局稳定性和耗散/传播模式。把 \(t\) 注入每层归一化，比只把时间拼到输入通道更深地影响特征流。

##### all2all 训练：用半群性质放大数据

时间相关 PDE 解算子满足半群关系：

$$
\mathcal{S}(t_{\ell}-t_k,\mathcal{S}(t_k,a))=\mathcal{S}(t_{\ell},a),\qquad 0\le k\le \ell\le K.
$$

普通训练通常只用相邻时间对 \((u(t_k),u(t_{k+1}))\)，而 Poseidon 把任意早晚时刻都作为训练对：

$$
\mathcal{L}_{all2all}(\theta)=
\frac{1}{M\widehat{K}}
\sum_{i=1}^{M}\sum_{0\le k\le \ell\le K}
\frac{
\left\|\mathcal{S}^{*}_{\theta}(t_{\ell}-t_k,u_i(t_k))-u_i(t_{\ell})\right\|_2^2
}{
\left\|u_i(t_{\ell})\right\|_2^2+\epsilon
},
$$

$$
\widehat{K}=\frac{(K+1)(K+2)}{2}.
$$

这相当于把同一条数值轨迹切成大量“从任意状态出发、到任意未来时刻”的监督样本。它同时训练短期、长期和跨尺度时间映射，因此比只学一步预测更接近真正的解算子学习任务。

##### 预训练、微调与 FNO 的区别

FNO 的强项是频域卷积，适合在固定 PDE/固定网格分布上学习算子；但每个任务通常需要重新训练，且面对未见 PDE 时样本效率有限。Poseidon 选择先在 PDEgym 的 Euler/Navier-Stokes 族上学习通用流体动力学表示，再微调到波方程、Poisson/Helmholtz、airfoil、变系数对流等未见任务。微调时，若下游 PDE 的输入/输出通道与预训练不同，就重置或快速学习 embedding/recovery 层；大量 scOT 主干参数从预训练继承。

这解释了为什么 Poseidon 能在少样本下达到 FNO 大样本效果：FNO 从目标任务的样本里同时学习“物理表示”和“任务读写层”，Poseidon 则把前者主要放在预训练阶段完成。下游 20 个样本并不是凭空替代 1000 个样本，而是用来把已有 PDE 表示对齐到新任务。

##### 局限与使用注意

Poseidon 本体主要在规则 Cartesian 网格和有限 PDE 族上验证。论文也指出，若要覆盖更广泛的非笛卡尔几何、强边界条件变化或椭圆型稳态问题，需要更丰富的预训练数据和更强的几何适配机制。因此在复杂 CAD/非结构网格问题上，GAOT、GINO、RIGNO 等几何算子模型可能更合适；在规则网格且目标是跨 PDE 少样本迁移时，Poseidon 的 foundation model 路线更有优势。

#### 🧪 练习题

```yaml
question: "Poseidon 的 all2all 训练主要利用了时间相关 PDE 解算子的什么性质？"
options:
  - "傅里叶变换的平移不变性"
  - "解算子的半群性质，可从轨迹中构造任意起止时间对"
  - "边界条件的周期性"
  - "SwinV2 窗口注意力的局部性"
answer: 1
explain: "all2all 使用 \\(\\mathcal{S}(t_l-t_k, u(t_k))=u(t_l)\\)，把一条轨迹扩展为 \\(O(K^2)\\) 个监督样本。"
```
