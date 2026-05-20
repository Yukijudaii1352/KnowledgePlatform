### DFM-VLA：离散流匹配视觉语言动作模型详解

---
id: dfm_vla
name: DFM-VLA
full_name: 离散流匹配VLA (Discrete Flow Matching Vision-Language-Action Model)
year: 2026.03
org: arXiv
paper_url: https://arxiv.org/abs/2603.26320
category: diffusion_flow
parent: pi0
motivation: 迭代细化动作Token解决轨迹不稳定
---

#### 📋 基础信息速览

| 属性 | 内容 |
|------|------|
| paper_url | https://arxiv.org/abs/2603.26320 |
| year | 2026.03 |
| org | arXiv |
| parent | pi0 |
| category | diffusion_flow |
| motivation | 迭代细化动作Token解决轨迹不稳定 |
| backbone | Emu3 tokenizer + MoVQ visual tokenizer + FAST action tokenizer |
| benchmarks | CALVIN (4.44 Avg. Len), LIBERO (95.7%), Real-World (70.8%) |
| key technique | token-level velocity field + two-stage decoding + adaptive KV caching |

#### 🎯 核心要点

- **Token级速度场建模**：将离散流匹配（DFM）引入VLA的动作生成，不是一次性生成动作token，而是从纯噪声开始，通过预测token间的"速度场"（velocity field）迭代细化完整动作序列，从根本上解决自回归解码的"不可逆承诺"（irreversible commitment）问题。
- **两种速度场构建方案**：CE损失方案通过交叉熵训练→测速场转换；额外Head方案直接预测替换速度，保留 EditFlow 的 replacement 操作，两种方案均可收敛且精度媲美。
- **两阶段解码策略**：前期用连续时间Markov链（CTMC）的Euler步进行速度场引导的精炼，后期切换为argmax模式快速收敛到确定性的高置信度动作token，兼顾质量与速度。
- **自适应KV缓存加速**：利用DFM迭代去噪过程中多token仅有微小KV状态变化的特性，自适应复用视觉/指令侧的KV cache，动作侧按余弦相似度动态更新，相比自回归解码获得2.4倍延迟加速。
- **低数据场景显著优势**：在CALVIN上仅用10%训练数据即达到Avg. Len 3.21，大幅超越自回归（1.71）和离散扩散（2.84），证明迭代细化缓解了小数据下的过拟合和错误累积。
- **真实机器人验证**：在bimanual AgileX平台上三项任务均取得最高成功率（70.8%），显著超越π0-FAST（AR）、Dream-VLA（扩散）和RDT（连续扩散）等主流VLA方案。

#### 🔬 深入细节

##### 整体架构

![DFM-VLA Overall Architecture](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png)

*Figure 3：DFM-VLA整体架构。在语言-视觉上下文+噪声动作token \(x_t\) 条件下，模型预测干净动作 \(x_1\)，并通过 \(\mathcal{L}_{\text{ce}}\) 或 \(\mathcal{L}_{\text{head}}\) 学习速度场。*

##### 核心算法伪代码

```
**Algorithm 1: Two-Stage Decoding of DFM-VLA**

Input: predictor p_θ, context l, steps T_fine, T_val, action vocabulary V

1: Sample x_0 ~ Uniform(V); set T = T_fine + T_val
2: for k = 1 to T do
3:     t = (k-1)/T, h = 1/T
4:     x̂_1 ~ p_θ(· | x_t, l)
5:     if k ≤ T_fine then
6:         Compute velocity u_t from x̂_1 (Eq. 7 or Eq. 3)
7:         Update x_{t+h} by a CTMC Euler step
8:     else
9:         Update x_{t+h} ← arg max p_θ(· | x_t, l)
10:    end if
11: end for
Output: action sequence x_1
```

```
**Algorithm 2: Action-Modality DFM Training**

Input: Predictor p_θ, learning rate η

1: repeat
2:     Sample (l, x_1) ~ p_data
3:     Sample t ~ U(0, 1)
4:     Sample x_t ~ p_t(· | x_1)
5:     Choose L_train ∈ {L_ce, L_head}
6:     Compute L_train from (x_t, l) and x_1
7:     θ ← θ - η ∇_θ L_train
8: until converged
Output: trained predictor p_θ
```

##### 方法深度解析

DFM-VLA将机器人动作生成重新定义为一种离散流匹配过程，核心思想源于离散流匹配（Discrete Flow Matching, DFM）理论。在该框架下，一个已知的源分布（如均匀噪声）被逐步变换为动作序列的真实分布，中间的过程由一个概率路径（probability path）\(\{p_t(x)\}_{t\in[0,1]}\) 描述，而驱动这一变换的正是**速度场**（velocity field）\(u_t(x' \mid x)\) ——它定义了离散状态之间跳转的速率。

> 💡 **关键洞察**：自回归VLA逐个生成动作token，已生成的错误token如同覆水难收；而DFM-VLA在每个去噪步骤同时审视并修正整条动作序列，通过速度场精炼每一步的token，实现对"不可逆承诺"问题的根本性规避。

训练过程中，DFM-VLA学习预测干净动作 \(x_1\) 并据此推导速度场。论文提出了两种损失函数：

**方案一：CE损失 + 测速场（Denoising-Conditional Velocity）**

直接从预测分布 \(p_\theta(x_1 \mid x_t, l)\) 构造条件速度场：

\[
u_t^\theta(x \mid x_t) = \sum_{x_1} u_t(x \mid x_t, x_1) \, p_\theta(x_1 \mid x_t, l)
\]

其中条件速度 \(u_t(x \mid x_t, x_1)\) 具有闭式解，由概率路径 \(p_{t\mid 1}(x_t \mid x_1)\) 决定。训练时最小化预测 \(x_1\) 与真实 \(x_1^*\) 的交叉熵：

\[
\mathcal{L}_{\text{ce}} = -\mathbb{E}_{t, x_1, x_t} \left[ \sum_{i=1}^N \log p_\theta(x_1^i \mid x_t^i, l) \right]
\]

**方案二：额外Head直接预测速度（Velocity Head Loss）**

受EditFlow启发，在backbone之上附加轻量速度头，直接从隐状态映射到替换速度：

\[
h_t = f_\theta(x_t, l), \quad u_t^{\text{head}}(x \mid x_t) = \text{softmax}(W \, h_t)
\]

损失函数显式回归速度场：

\[
\mathcal{L}_{\text{head}} = \mathbb{E}_{t,x_1,x_t}\left[ \sum_{x \neq x_t} u_t^\theta(x \mid x_t) - \sum_{i=1}^N \mathbf{1}_{[x_t^i \neq x_1^i]} \log u_t^\theta(x^i \mid x_t^i) \, p_{1\mid t}(x_1^i \mid x_t^i, l) \right]
\]

> ⚠️ **注意**：两种方案在实验中均有效，且性能差异不大。CE方案实现简单，适合快速实验；Head方案解耦了预测与速度推导，推理时开销更低。

**两阶段解码策略**是DFM-VLA的另一个核心贡献。在\([0, T_{\text{fine}}]\)的精炼阶段，使用CTMC Euler步进行小步长迭代，速度场驱动token逐步靠近高概率区域；在\((T_{\text{fine}}, T]\)的验证阶段，直接用argmax策略将每个token锁定到预测分布的最高概率值，避免无限精度追逐。这种设计在"探索-收敛"之间找到了优雅的平衡。

**自适应KV缓存**（Adaptive KV Caching）进一步加速推理：视觉和指令token在整个去噪过程中产生的KV状态变化极小，可以仅计算一次并固定复用；动作token侧则基于当前cache与新值特征的余弦相似度决定是否更新。这一策略实现了2.4倍延迟加速，同时基本无损任务性能。

##### 实验表现

DFM-VLA在多个机器人操纵基准上验证了其有效性：

| Benchmark | Metric | DFM-VLA | 对比顶级方法 |
|-----------|--------|---------|--------------|
| CALVIN ABCD→D | Avg. Len | **4.44** | UniVLA* (4.11) |
| LIBERO-100 | Success Rate | **95.7%** | RDT (89.1%) |
| Real-World (3 tasks) | Avg. Success | **70.8%** | RDT (60.0%) |

特别是低数据场景下（10%训练数据），DFM-VLA的CALVIN Avg. Len达到3.21，远超自回归模型的1.71和离散扩散的2.84，充分验证了迭代细化在缓解小数据误差累积中的优势。

#### 🧪 练习题

```yaml
question: DFM-VLA的两阶段解码策略中，精细阶段（fine stage）和验证阶段（validation stage）分别用什么策略更新动作token？
options:
  - "两个阶段都用argmax"
  - "精细阶段用CTMC Euler步，验证阶段用argmax"
  - "精细阶段用argmax，验证阶段用CTMC Euler步"
  - "两个阶段都用CTMC Euler步"
answer_index: 1
explanation: 精细阶段（前T_fine步）使用速度场引导的CTMC Euler步进行迭代精炼，验证阶段切换到argmax模式快速收敛到确定性的高置信度动作token。
```