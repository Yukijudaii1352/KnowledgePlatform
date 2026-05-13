### DartControl: 基于扩散自回归运动基元的实时文本驱动运动控制

```yaml
meta:
  id: dartcontrol
  name: DartControl
  paper: "DART: A Diffusion-Based Autoregressive Motion Model for Real-Time Text-Driven Motion Control"
  arxiv: "2410.05260"
  year: 2025
  org: "ETH Zürich / ICLR 2025"
  category: body_motion
  parent: mdm
  project: "https://zkf1997.github.io/DART/"
```

---

### 📝 一句话总结

DART 提出基于潜在扩散的自回归运动基元模型，通过10步DDPM在紧凑潜空间中自回归生成运动基元，实现300+ fps实时文本驱动运动合成，并通过潜在噪声优化和强化学习两种方式实现精确的空间运动控制。

---

### 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | 现有文本驱动运动生成方法只能离线生成短序列，无法实时响应文本流，且难以同时满足文本语义和空间约束 |
| **核心创新** | (1) 自回归运动基元表示 + 潜在扩散模型实现实时在线生成；(2) 将空间控制统一为潜在噪声优化问题，支持梯度优化和RL两种求解方式 |
| **关键结果** | 运动合成FID最优(3.79)，生成速度334 fps / 延迟0.02s；运动插值目标误差0.54cm；RL目标到达成功率100% |
| **主要局限** | 在线生成导致动作切换有自然延迟，影响R-prec指标；RL控制仅验证了walk/run/hop三种动作；依赖BABEL数据集的帧级标注 |

---

### 🔬 深入细节

#### 1. 整体架构

DART由三个核心组件构成：运动基元表示、运动基元VAE、潜在扩散去噪器。DartControl在此基础上增加空间控制模块。

![DART整体架构](https://ar5iv.labs.arxiv.org/html/2410.05260/assets/x1.png)

**运动基元表示**：将连续运动序列切分为重叠的短片段（motion primitives），每个基元包含 $H=2$ 帧历史和 $F=8$ 帧未来，总共10帧。相邻基元之间重叠2帧（历史帧=上一基元的最后2帧），实现自回归拼接。

每帧运动状态 $\mathbf{x}_i \in \mathbb{R}^{276}$，包含：
- SMPL-X身体参数：全局朝向(6D)、身体姿态(63×6D=378→降维)、手部姿态
- 全局平移(3D)、关节位置、关节速度等

运动基元定义为：

$$\mathbf{M} = [\mathbf{x}_{-H+1}, \ldots, \mathbf{x}_0, \mathbf{x}_1, \ldots, \mathbf{x}_F]$$

其中 $\mathbf{x}_{-H+1}, \ldots, \mathbf{x}_0$ 为历史帧（条件），$\mathbf{x}_1, \ldots, \mathbf{x}_F$ 为待生成的未来帧。

#### 2. 运动基元VAE

采用Transformer架构的变分自编码器，将运动基元压缩到紧凑的潜在空间：

**编码器**：输入完整基元（历史+未来帧），通过Transformer编码器映射到潜在分布 $q(\mathbf{z}|\mathbf{M})$，潜在向量 $\mathbf{z} \in \mathbb{R}^d$。

**解码器**：以历史帧 $\mathbf{M}_h$ 和潜在向量 $\mathbf{z}$ 为条件，通过Transformer解码器重建未来帧：

$$\hat{\mathbf{M}}_f = \text{Dec}(\mathbf{z}, \mathbf{M}_h)$$

训练损失：
$$\mathcal{L}_{\text{VAE}} = \mathcal{L}_{\text{recon}} + \beta \cdot D_{\text{KL}}(q(\mathbf{z}|\mathbf{M}) \| \mathcal{N}(0, I))$$

重建损失包含关节位置、关节速度、全局平移等多项L2损失。

#### 3. 潜在扩散去噪器

在VAE的潜在空间上训练DDPM扩散模型，条件包括历史运动帧和文本描述：

**前向过程**（10步）：
$$q(\mathbf{z}_t | \mathbf{z}_{t-1}) = \mathcal{N}(\mathbf{z}_t; \sqrt{1-\beta_t}\mathbf{z}_{t-1}, \beta_t \mathbf{I})$$

**去噪网络** $\epsilon_\theta$：预测噪声，条件为：
- 历史运动帧 $\mathbf{M}_h$（通过Transformer编码）
- 文本描述 $c$（通过CLIP文本编码器）
- 扩散时间步 $t$

$$\mathcal{L}_{\text{diff}} = \mathbb{E}_{t, \mathbf{z}_0, \epsilon} \left[ \| \epsilon - \epsilon_\theta(\mathbf{z}_t, t, \mathbf{M}_h, c) \|^2 \right]$$

**Classifier-Free Guidance (CFG)**：训练时以概率 $p_{\text{uncond}}$ 丢弃文本条件，推理时使用引导尺度 $w$：

$$\hat{\epsilon}_\theta = (1+w) \cdot \epsilon_\theta(\mathbf{z}_t, t, \mathbf{M}_h, c) - w \cdot \epsilon_\theta(\mathbf{z}_t, t, \mathbf{M}_h, \varnothing)$$

**Scheduled Training**：为缓解自回归误差累积，训练时按概率 $p_{\text{sched}}$ 使用模型自身生成的历史帧（而非GT历史帧）作为条件，类似scheduled sampling。

#### 4. 自回归推理流程

```
输入: 文本描述流 {c_1, c_2, ...}, 初始历史帧 M_h^0
输出: 连续运动序列

for each step k:
    1. 采样噪声 z_T ~ N(0, I)
    2. 用DDPM去噪10步: z_0 = denoise(z_T, M_h^k, c_k)
    3. 用VAE解码器: M_f^k = Dec(z_0, M_h^k)  # 生成F=8帧未来
    4. 输出 M_f^k 的前6帧（去除重叠）
    5. 更新历史: M_h^{k+1} = M_f^k 的最后2帧
```

生成速度：**334 fps** (RTX 4090)，延迟 **0.02s**。

#### 5. DartControl: 空间控制

核心思想：由于DDIM采样是确定性的，运动基元完全由初始噪声 $\mathbf{z}_T$ 决定。因此空间控制等价于在噪声空间中搜索满足约束的最优噪声。

![DartControl控制框架](https://ar5iv.labs.arxiv.org/html/2410.05260/assets/x2.png)

##### 方法A: 梯度优化（适用于运动插值、人-场景交互）

将多步自回归展开为可微分的计算图：

$$\mathbf{M}_{1:K} = \text{Rollout}(\mathbf{z}_T^{1:K}, c_{1:K}, \mathbf{M}_h^0)$$

定义目标函数（以运动插值为例）：

$$\mathcal{L}_{\text{control}} = \lambda_{\text{goal}} \| \mathbf{x}_{\text{goal}} - \hat{\mathbf{x}}_{\text{goal}} \|^2 + \lambda_{\text{hist}} \| \mathbf{M}_h - \hat{\mathbf{M}}_h \|^2 + \lambda_{\text{reg}} \| \mathbf{z}_T \|^2$$

通过反向传播计算 $\nabla_{\mathbf{z}_T^{1:K}} \mathcal{L}_{\text{control}}$，用Adam优化器迭代更新噪声序列。

```
算法: 梯度优化空间控制 (Algorithm 2)
输入: 目标约束 G, 文本条件 c, 历史帧 M_h, 步数K
初始化: z_T^{1:K} ~ N(0, I)

for iter = 1 to N_opt:
    M_{1:K} = Rollout(z_T^{1:K}, c, M_h)  # 前向展开
    L = ControlLoss(M_{1:K}, G) + λ_reg * ||z_T||²
    z_T^{1:K} -= lr * ∇_{z_T} L  # 梯度下降
    
return Rollout(z_T^{1:K}, c, M_h)
```

对于**人-场景交互**，额外加入场景约束：
- 碰撞损失：$\mathcal{L}_{\text{collision}} = \sum_j \max(0, -\text{SDF}(\mathbf{p}_j))^2$（SDF为场景的有符号距离场）
- 接触损失：$\mathcal{L}_{\text{contact}} = \| \mathbf{p}_{\text{contact}} - \mathbf{p}_{\text{surface}} \|^2$

##### 方法B: 强化学习（适用于目标到达导航）

将运动生成建模为马尔可夫决策过程(MDP)：

| MDP元素 | 定义 |
|---------|------|
| **状态** $s_k$ | 当前历史帧 $\mathbf{M}_h^k$ + 目标位置 $\mathbf{g}$ |
| **动作** $a_k$ | 潜在噪声 $\mathbf{z}_T^k \in \mathbb{R}^d$ |
| **转移** | DART的确定性解码：$\mathbf{M}_h^{k+1} = f(\mathbf{z}_T^k, \mathbf{M}_h^k, c)$ |
| **奖励** $r_k$ | 到目标距离减少 + 运动质量惩罚 |

使用PPO算法训练Actor-Critic网络：
- **Actor** $\pi_\phi(a|s)$：输出高斯分布 $\mathcal{N}(\mu_\phi(s), \sigma_\phi(s))$
- **Critic** $V_\psi(s)$：估计状态价值

奖励函数设计：
$$r_k = r_{\text{goal}} + r_{\text{velocity}} + r_{\text{quality}}$$

其中 $r_{\text{goal}}$ 鼓励接近目标，$r_{\text{velocity}}$ 鼓励朝目标方向移动，$r_{\text{quality}}$ 惩罚脚部滑动和穿地。

RL控制生成速度：**240 fps**。

#### 6. 关键实验结果

##### 6.1 文本条件时序运动合成 (Table 1)

| 方法 | Seg FID↓ | R-prec↑ | Trans FID↓ | Speed(fps)↑ | Latency(s)↓ | Mem(MiB)↓ |
|------|----------|---------|------------|-------------|-------------|-----------|
| TEACH | 17.58 | 0.66 | 3.89 | 31 | 161.29 | 11892 |
| FlowMDM | 5.70 | **0.65** | 3.14 | 31 | 161.29 | 11892 |
| **DART(Ours)** | **3.79** | 0.62 | **1.86** | **334** | **0.02** | **2394** |

- DART在FID指标上最优，表明运动真实性最高
- 生成速度是FlowMDM的**10倍以上**，内存占用仅1/5
- R-prec略低于FlowMDM，因在线生成存在自然的动作过渡延迟

##### 6.2 用户研究 (Table 2)

| 对比 | 真实性(Ours%) | 语义对齐(Ours%) |
|------|-------------|---------------|
| vs. TEACH | **66.7** vs 33.3 | **66.0** vs 34.0 |
| vs. DoubleTake | **66.4** vs 33.6 | **66.1** vs 33.9 |
| vs. T2M-GPT* | **61.3** vs 38.7 | **66.7** vs 33.3 |
| vs. FlowMDM | **53.3** vs 46.7 | **51.3** vs 48.7 |

人类评估中DART在真实性和语义对齐上均优于所有基线。

##### 6.3 运动插值 (Table 3, 梯度优化)

| 方法 | History err(cm)↓ | Goal err(cm)↓ | Skate(cm/s)↓ | Jerk↓ |
|------|-----------------|--------------|-------------|-------|
| OmniControl | 17.22 | 5.88 | 5.48 | 1.26 |
| DNO | 2.15 | 5.52 | 5.12 | 0.72 |
| **DART Opt.** | **0.00** | **0.54** | **3.97** | **0.71** |

DART在所有指标上均最优，目标误差仅0.54cm，且能更好地保持文本语义。

##### 6.4 RL目标到达 (Table 4)

| 方法 | Time(s)↓ | Success↑ | Skate(cm/s)↓ | Floor dist(cm)↓ |
|------|---------|---------|-------------|-----------------|
| GAMMA walk | 31.44 | 0.95 | 5.14 | 5.55 |
| Ours 'walk' | 13.82 | **1.0** | 5.07 | **1.87** |
| Ours 'run' | **12.16** | **1.0** | **4.70** | 2.02 |
| Ours 'hop' | 13.89 | **1.0** | 41.18 | **1.43** |

DART RL控制器100%到达目标，速度更快，且支持多种文本条件动作。

#### 7. 关键设计选择与消融

- **扩散步数**：仅需10步即可高质量生成（得益于紧凑的潜在空间）
- **基元长度**：F=8帧（约0.27s@30fps），平衡了生成效率和动作语义粒度
- **历史帧数**：H=2帧提供足够的运动连续性条件
- **Scheduled Training**：$p_{\text{sched}}$ 从0线性增长到0.5，有效缓解误差累积
- **CFG引导尺度**：$w$ 控制文本条件强度，过大会降低多样性

---

### 🧪 练习题

**Q1 (理解)**: DART为什么选择H=2, F=8的运动基元设计？如果增大F会有什么影响？

<details><summary>参考答案</summary>
H=2帧历史提供运动连续性的最小必要上下文（速度信息）。F=8帧未来（约0.27s）对应原子动作的典型时长，使文本描述与运动基元有清晰的语义对齐。如果增大F：(1)每个基元覆盖更长时间，可能跨越多个动作语义，增加文本对齐难度；(2)潜在空间需要编码更多信息，扩散模型需要更多步数；(3)自回归步数减少但每步计算量增大，可能降低实时性。
</details>

**Q2 (分析)**: DartControl的两种空间控制方法（梯度优化 vs RL）各自的适用场景和优劣是什么？

<details><summary>参考答案</summary>
**梯度优化**：适用于有明确目标状态的离线规划任务（运动插值、场景交互）。优点是不需要额外训练，可以处理任意约束函数；缺点是需要多次前向+反向传播迭代，不适合实时交互。

**RL控制**：适用于需要实时响应的在线控制任务（目标导航）。优点是推理时只需一次前向传播（240fps），可实时交互；缺点是需要为每种任务/动作单独训练策略，泛化性受限于训练时的奖励设计。
</details>

**Q3 (扩展)**: DART使用DDIM的确定性采样特性将空间控制转化为噪声优化问题。如果使用DDPM的随机采样，这个框架还能工作吗？需要怎样修改？

<details><summary>参考答案</summary>
DDPM的随机采样引入了每步的随机噪声，使得从$\mathbf{z}_T$到$\mathbf{z}_0$的映射不再是确定性的。这意味着：(1)梯度优化方法需要对随机性取期望或使用重参数化技巧，优化效率会大幅降低；(2)RL方法的动作空间需要扩展为包含所有中间步的噪声，维度大幅增加。可能的修改包括：使用DDIM确定性采样（论文的选择）、使用随机优化方法（如CMA-ES）、或将中间步噪声也纳入优化变量但用正则化约束其接近标准高斯分布。
</details>

**Q4 (实践)**: 如果要将DART扩展到支持多人交互运动生成，你会如何修改架构？

<details><summary>参考答案</summary>
可能的方案：(1)将运动基元扩展为包含多人状态，VAE编码器/解码器使用交叉注意力机制建模人际交互；(2)为每个人维护独立的DART模型，但在扩散去噪过程中加入交互约束（类似DartControl的空间控制思路）；(3)在RL框架中设计多智能体奖励函数，鼓励协调运动。关键挑战在于：多人运动的组合空间爆炸、交互约束的建模（避免穿透、保持接触）、以及训练数据的稀缺性。
</details>