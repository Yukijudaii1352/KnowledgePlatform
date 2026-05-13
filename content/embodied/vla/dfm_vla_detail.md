### DFM-VLA — 离散流匹配VLA (Discrete Flow Matching for Vision-Language-Action Model)

```yaml
title: "DFM-VLA: Discrete Flow Matching Meets Vision-Language-Action Model"
authors: "Yixiao Wang, Siyu Gao, Zhuolun He, Mingxiao Huo, Jiankai Sun, Feng Gao, Peng Sun, Chao Zhang"
venue: "arXiv 2025"
year: "2026.03"
url: "https://arxiv.org/abs/2603.26320"
significance: "迭代细化动作Token解决轨迹不稳定"
```

#### 📝 一句话总结

DFM-VLA 将离散流匹配（Discrete Flow Matching）引入视觉-语言-动作模型的动作解码阶段，通过在离散 token 空间中进行迭代细化，克服了自回归解码"不可逆承诺"和离散扩散收敛慢的问题，在 CALVIN（Avg. Len. 4.44）和 LIBERO（95.7%）基准上取得 SOTA 性能。

#### 🎯 核心要点

- **核心问题**：AR 解码存在"不可逆承诺"（irreversible commitment），早期 token 错误无法修正并向后传播；离散扩散（DD）虽可迭代但收敛慢、需大量去噪步
- **离散流匹配动作解码**：在 VLA 的动作 token 解码阶段引入离散流匹配，通过连续时间马尔可夫链（CTMC）在离散 token 空间中构建确定性概率路径，实现高效迭代细化
- **两种速度场构造**：Velocity Head（额外 MLP 头预测转移速率）和 Embedding-Guided（利用 LLM 词嵌入相似度隐式构建速度场），后者收敛更快、性能更优
- **两阶段推理策略**：前 \(T_{\text{fine}}\) 步使用 CTMC 随机采样进行迭代细化，后 \(T_{\text{val}}\) 步切换为贪心确定性解码进行验证锁定（默认 14+2）
- **Adaptive Cache 加速**：检测未变化的 token 跳过重复计算，推理速度达 121 Hz，兼顾质量与效率
- **基于 UniVLA 架构**：采用 FAST+BPE 动作编码将连续动作离散化为 token 序列，复用预训练 VLM 的 token 空间
- **CALVIN ABCD→D**：Avg. Len. 4.44（+Embed 变体），5-step 完成率 78.0%，超越 UniVLA（4.18）、ReconVLA（4.25）等基线
- **LIBERO**：四个子套件平均成功率 95.7%，在 Spatial/Object/Goal/Long 上全面领先
- **低数据优势**：10% 数据下 DFM 达 3.21 vs AR 1.71 / DD 2.84，数据效率显著更高

#### 🔬 深入细节

##### 整体架构

![DFM-VLA 整体架构对比](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x1.png)
*图 1：三种离散动作解码范式对比。(a) 自回归（AR）逐 token 生成，错误不可逆传播；(b) 离散扩散（DD）从全噪声出发逐步去噪；(c) DFM 通过离散流匹配构建确定性概率路径，实现高效迭代细化。*

![DFM-VLA 模型架构](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x2.png)
*图 2：DFM-VLA 模型架构。左侧为 VLM 骨干（视觉编码器 + 语言模型），右侧展示两种速度场构造方式（Velocity Head 和 Embedding-Guided）以及两阶段推理流程。*

![两阶段推理策略](https://ar5iv.labs.arxiv.org/html/2603.26320/assets/x3.png)
*图 3：两阶段推理策略示意。Stage 1（Iterative Refinement）使用 CTMC 随机采样逐步细化动作 token；Stage 2（Deterministic Validation）切换为贪心解码锁定最终动作。*

##### 算法伪代码

```python
# DFM-VLA: 离散流匹配动作解码核心流程

# === 训练阶段 ===
def train_step(x1, observation, instruction):
    """x1: 目标动作token序列 (FAST+BPE编码)"""
    # 1. 采样时间步 t ~ Uniform(0, 1)
    t = uniform(0, 1)
    
    # 2. 构造插值分布 p_t(x|x1)
    #    p_t(x=x1) = t,  p_t(x=mask) = 1-t
    #    即以概率 t 保持真实token，以概率 1-t 替换为 [MASK]
    mask = bernoulli(1 - t, shape=x1.shape)
    x_t = where(mask, MASK_TOKEN, x1)
    
    # 3. VLM前向传播，获取条件概率 p_theta(·|x_t, obs, inst)
    logits = vlm_forward(x_t, observation, instruction, t)
    
    # 4. 计算交叉熵损失（仅在被mask的位置）
    loss = cross_entropy(logits[mask], x1[mask])
    return loss

# === 推理阶段：两阶段解码 ===
def inference(observation, instruction, T_fine=14, T_val=2):
    T = T_fine + T_val
    dt = 1.0 / T
    
    # 初始化：全部为 [MASK] token
    x = full(action_length, MASK_TOKEN)
    
    # Stage 1: CTMC 随机迭代细化
    for step in range(T_fine):
        t = step * dt
        logits = vlm_forward(x, observation, instruction, t)
        
        # 计算速度场（两种方式之一）
        # 方式A - Velocity Head:
        #   v = velocity_head(hidden_states)  # 额外MLP
        # 方式B - Embedding-Guided (默认):
        #   p_theta = softmax(logits)
        #   v(y|x_t) = p_theta(y) / (1-t)  对 y ≠ x_t
        
        # CTMC 转移：以概率 v(y|x_t)*dt 跳转到新token y
        probs = compute_transition_probs(logits, x, t, dt)
        x = categorical_sample(probs)  # 随机采样
    
    # Stage 2: 贪心确定性验证
    for step in range(T_fine, T):
        t = step * dt
        logits = vlm_forward(x, observation, instruction, t)
        x = argmax(logits, dim=-1)  # 贪心解码
    
    return x  # 最终动作token序列 → FAST解码为连续动作
```

##### 动机与背景

当前主流 VLA 模型的动作解码主要有三种范式：

1. **自回归（AR）解码**：逐 token 从左到右生成，每个 token 一旦生成即"锁定"，无法回溯修正。这种"不可逆承诺"（irreversible commitment）意味着早期的微小错误会通过条件依赖链向后传播，在长序列中导致严重的误差累积。

2. **连续扩散（Continuous Diffusion）**：在连续动作空间中通过去噪过程迭代细化，但需要额外的扩散头，无法复用 VLM 的离散 token 空间，且与语言建模的统一性较差。

3. **离散扩散（DD）**：在离散 token 空间中进行去噪，但其从均匀噪声出发的随机过程收敛较慢，需要大量去噪步才能达到良好性能。

DFM-VLA 的核心洞察是：**离散流匹配（Discrete Flow Matching）可以在离散 token 空间中构建更高效的确定性概率路径**，相比离散扩散的随机游走，流匹配的插值路径更直接、收敛更快。

##### 核心机制：离散流匹配

**概率路径构造**。DFM-VLA 在源分布 \(p_0\)（噪声/mask 分布）和目标分布 \(p_1\)（真实动作 token 分布）之间构建条件概率路径。对于每个目标 token \(x_1\)，条件分布为：

$$p_t(x \mid x_1) = t \cdot \mathbf{1}_{x = x_1} + (1 - t) \cdot \mathbf{1}_{x = m}$$

其中 \(m\) 是 mask token，\(t \in [0, 1]\)。直觉上，随着 \(t\) 从 0 增大到 1，token 从全 mask 状态逐渐"显现"为真实动作 token。

**速度场与 CTMC**。该概率路径对应的连续时间马尔可夫链（CTMC）的速率矩阵为：

$$u_t(y \mid x, x_1) = \frac{p_t(y \mid x_1)}{(1 - t) \cdot p_t(x \mid x_1)} \cdot \mathbf{1}_{y \neq x}$$

> 💡 **关键直觉**：速率矩阵描述了在时刻 \(t\)，当前状态为 \(x\) 时跳转到状态 \(y\) 的"速度"。分子是目标状态的概率质量，分母是当前状态的"剩余时间"——越接近 \(t=1\)，剩余时间越少，跳转速率越高，迫使 token 快速收敛到目标。

**边际化速度场**。训练时我们无法访问 \(x_1\)，因此需要对其边际化：

$$u_t(y \mid x) = \mathbb{E}_{p_{1|t}(x_1 \mid x)} \left[ u_t(y \mid x, x_1) \right] = \frac{p_{1|t}(y \mid x)}{1 - t} \cdot \mathbf{1}_{y \neq x}$$

其中 \(p_{1|t}(y \mid x)\) 是给定当前噪声状态 \(x\) 对目标 token 的后验预测。这正是 VLM 输出的 softmax 概率！

##### 两种速度场构造

**Velocity Head（+Head）**：在 VLM 最后一层隐藏状态之上添加一个独立的 MLP 头，直接预测每个位置的转移速率向量 \(v_\theta(x_t, t) \in \mathbb{R}^{|\mathcal{V}|}\)。优点是解耦了语言建模和速度场预测；缺点是引入额外参数且无法利用预训练词嵌入的语义信息。

**Embedding-Guided（+Embed）**：利用 VLM 的 LM head 输出 logits，通过 softmax 得到 \(p_\theta(y \mid x_t)\)，然后按上述公式隐式构造速度场：

$$v_\theta(y \mid x_t, t) = \frac{p_\theta(y \mid x_t)}{1 - t} \cdot \mathbf{1}_{y \neq x_t}$$

> 💡 **关键优势**：Embedding-Guided 方式直接复用了预训练 LLM 的词嵌入空间，token 之间的语义相似度自然编码在嵌入中，提供了更平滑的优化信号。实验表明该变体收敛更快、最终性能更优。

##### 两阶段推理策略

推理分为两个阶段，总步数固定为 \(T = T_{\text{fine}} + T_{\text{val}}\)（默认 16 = 14 + 2）：

1. **Stage 1 — 迭代细化**（\(T_{\text{fine}}\) 步）：使用 CTMC 的随机采样规则，每步根据速度场计算转移概率并采样新 token。随机性允许模型探索多种可能的 token 组合，避免过早锁定。

2. **Stage 2 — 确定性验证**（\(T_{\text{val}}\) 步）：切换为贪心 argmax 解码，确定性地锁定最终 token。这一阶段消除了随机性带来的噪声，确保输出动作的稳定性。

> ⚠️ **设计权衡**：消融实验表明 \(T_{\text{val}} = 0\)（纯随机）和 \(T_{\text{val}}\) 过大（过早贪心）都会损害性能。最优配置 \(T_{\text{fine}} = 14, T_{\text{val}} = 2\) 在探索与稳定之间取得最佳平衡。

##### 训练细节

- **动作编码**：采用 FAST（Frequency-Adaptive Serialization of Trajectories）+ BPE 将连续动作序列离散化为 token，复用 VLM 的词表空间
- **调度参数**：\(c = 3\)（logit-linear 调度控制噪声分布），\(\alpha = 1\)（采样温度）
- **训练损失**：标准交叉熵，仅在被 mask 的位置计算，与语言建模目标形式一致
- **基础模型**：基于 UniVLA 预训练检点初始化，学习率 \(1 \times 10^{-4}\)，batch size 8，8×H100 GPU
- **训练步数**：仿真 20k–32k 步，真实世界 5k 步

##### 实验结果与分析

**CALVIN ABCD→D**（1000 rollouts，每个含 5 个连续子任务）：

| 方法 | 1-step | 2-step | 3-step | 4-step | 5-step | Avg. Len. |
|------|--------|--------|--------|--------|--------|-----------|
| UniVLA* (AR) | 0.960 | 0.920 | 0.862 | 0.790 | 0.690 | 4.18 |
| ReconVLA | 0.966 | 0.924 | 0.870 | 0.800 | 0.690 | 4.25 |
| DFM-VLA+Head | 0.972 | 0.938 | 0.886 | 0.824 | 0.760 | 4.38 |
| **DFM-VLA+Embed** | **0.978** | **0.948** | **0.892** | **0.840** | **0.780** | **4.44** |

**LIBERO**（4 个子套件，每套件 10 任务 × 50 rollouts）：

| 方法 | Spatial | Object | Goal | Long | Avg. |
|------|---------|--------|------|------|------|
| UniVLA* | 91.4 | 95.8 | 90.6 | 88.2 | 91.5 |
| **DFM-VLA+Embed** | **96.8** | **98.0** | **95.2** | **92.8** | **95.7** |

**推理效率**（CALVIN）：

| 方法 | Avg. Len. | Speed (Hz) |
|------|-----------|------------|
| AR | 4.18 | 50.2 |
| DFM | 4.42 | 60.2 |
| DFM + Adaptive Cache | 4.40 | **121.0** |

**数据效率**（CALVIN，不同数据比例）：

| 数据比例 | AR | DD | DFM |
|----------|-----|-----|------|
| 10% | 1.71 | 2.84 | **3.21** |
| 50% | 3.01 | 3.88 | **4.03** |
| 100% | 4.18 | 4.32 | **4.44** |

> 💡 **关键发现**：DFM 在 10% 数据下相比 AR 提升 +1.50，相比 DD 提升 +0.37，表明离散流匹配在低数据场景下具有显著的数据效率优势。

#### 🧪 练习题

```yaml
question: "DFM-VLA 相比传统自回归（AR）动作解码的核心优势是什么？"
options:
  - "使用更大的模型参数量提升表达能力"
  - "通过离散流匹配实现动作token的迭代细化，避免不可逆承诺导致的误差累积"
  - "采用连续扩散过程在连续动作空间中去噪"
  - "通过增加训练数据量来提升泛化性能"
answer: 1
explain: "DFM-VLA的核心创新在于用离散流匹配替代AR的逐token生成，允许所有动作token在多步迭代中同时被细化和修正，从而避免了AR中早期token错误不可逆传播的问题。"
```