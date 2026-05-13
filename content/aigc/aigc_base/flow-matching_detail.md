### Flow Matching for Generative Modeling

```yaml
id: flow-matching
name: "Flow Matching"
full_name: "Flow Matching for Generative Modeling"
year: 2023
org: "Meta AI (FAIR)"
paper_url: "https://arxiv.org/abs/2210.02747"
category: "foundation"
parent: "—"
motivation: "提出无需模拟ODE的连续归一化流(CNF)训练范式，通过条件概率路径回归实现高效无模拟训练"
```

#### 📝 一句话总结

Flow Matching 提出了一种无需模拟 ODE 的连续归一化流（CNF）训练方法，通过回归条件概率路径的向量场实现高效训练，并引入最优传输（OT）概率路径使生成轨迹更直、采样更快、质量更优。

#### 🎯 核心要点

- **Flow Matching (FM) 目标**：直接回归生成目标概率路径 \(p_t\) 的向量场 \(u_t(x)\)，无需昂贵的 ODE 模拟或似然计算
- **Conditional Flow Matching (CFM)**：将不可计算的边际 FM 目标分解为可解析计算的条件形式，通过 Theorem 1 证明两者梯度完全等价
- **高斯条件概率路径族**：统一框架涵盖 VP-SDE、VE-SDE 等扩散路径以及最优传输路径
- **最优传输（OT）概率路径**：条件向量场 \(u_t(x|x_1) = x_1 - (1-\sigma_{\min})x_0\) 不依赖时间，产生直线轨迹
- **统一 Diffusion 与 Flow**：证明 Score Matching（扩散模型）是 Flow Matching 在特定概率路径下的特例
- **实验优势**：OT 路径在 NLL 和 FID 上均优于 Diffusion 路径，训练收敛更快，采样所需 ODE 步数（NFE）更少

#### 🔬 深入细节

##### 1. 连续归一化流（CNF）基础

连续归一化流的核心思想是通过一个时间依赖的向量场 \(v_t: \mathbb{R}^d \to \mathbb{R}^d\) 定义一个流（flow）\(\phi_t\)：

$$\frac{d}{dt}\phi_t(x) = v_t(\phi_t(x)), \quad \phi_0(x) = x$$

流 \(\phi_t\) 将初始分布 \(p_0\)（通常为标准高斯 \(\mathcal{N}(0, I)\)）推前（pushforward）为时刻 \(t\) 的分布。当 \(t=1\) 时，\(p_1\) 应近似数据分布 \(q\)。概率密度的演化遵循**连续性方程**：

$$\frac{\partial p_t}{\partial t} + \text{div}(p_t v_t) = 0$$

这意味着：给定一个概率路径 \(p_t\)，存在（不唯一的）向量场 \(v_t\) 生成它；反之，给定向量场 \(v_t\)，它唯一确定一条概率路径。传统 CNF 训练需要通过 ODE 求解器模拟整条轨迹来计算似然，计算代价极高且梯度估计有偏。

##### 2. Flow Matching 目标与 Conditional Flow Matching

**FM 目标**（不可直接计算）：

$$\mathcal{L}_{\text{FM}}(\theta) = \mathbb{E}_{t \sim \mathcal{U}[0,1],\, x \sim p_t(x)} \|v_\theta(t, x) - u_t(x)\|^2$$

其中 \(u_t(x)\) 是生成概率路径 \(p_t\) 的目标向量场。问题在于边际分布 \(p_t(x) = \int p_t(x|x_1)q(x_1)dx_1\) 和边际向量场 \(u_t(x)\) 都涉及对数据分布 \(q\) 的不可解积分。

**CFM 目标**（核心突破）：

$$\mathcal{L}_{\text{CFM}}(\theta) = \mathbb{E}_{t \sim \mathcal{U}[0,1],\, x_1 \sim q(x_1),\, x \sim p_t(x|x_1)} \|v_\theta(t, x) - u_t(x|x_1)\|^2$$

> 💡 **关键 Theorem 1**：在温和条件下，\(\nabla_\theta \mathcal{L}_{\text{CFM}}(\theta) = \nabla_\theta \mathcal{L}_{\text{FM}}(\theta)\)。即两个目标关于参数 \(\theta\) 的梯度完全等价，而 CFM 中的条件向量场 \(u_t(x|x_1)\) 有解析形式，可以高效采样和计算。

**证明直觉**：展开两个损失函数，\(\|v_\theta - u\|^2 = \|v_\theta\|^2 - 2\langle v_\theta, u \rangle + \|u\|^2\)。对 \(\theta\) 求梯度时 \(\|u\|^2\) 项消失；而交叉项 \(\langle v_\theta, u_t(x|x_1) \rangle\) 在对 \(q(x_1)\) 积分后恰好等于 \(\langle v_\theta, u_t(x) \rangle\)（由边际向量场的定义保证），因此两个梯度相等。

##### 3. 高斯条件概率路径

选择条件分布为高斯形式：

$$p_t(x|x_1) = \mathcal{N}\big(x \mid \mu_t(x_1),\, \sigma_t(x_1)^2 I\big)$$

边界条件要求 \(p_0(x|x_1) \approx \mathcal{N}(0, I)\)（纯噪声），\(p_1(x|x_1) \approx \mathcal{N}(x_1, \sigma_{\min}^2 I)\)（集中在数据点附近）。

对应的仿射流映射为 \(\psi_t(x) = \sigma_t(x_1) x + \mu_t(x_1)\)，条件向量场的解析形式为：

$$u_t(x|x_1) = \frac{\sigma_t'(x_1)}{\sigma_t(x_1)}\big(x - \mu_t(x_1)\big) + \mu_t'(x_1)$$

通过不同的 \(\mu_t, \sigma_t\) 选择，可以恢复多种已知框架：

| 路径类型 | \(\mu_t(x_1)\) | \(\sigma_t\) | 特点 |
|---------|----------------|-------------|------|
| VP-SDE (Diffusion) | \(\alpha_t x_1\) | \(\sqrt{1-\alpha_t^2}\) | 弯曲轨迹，等价于 DDPM |
| VE-SDE (Diffusion) | \(x_1\) | \(\sigma_{\max}^{1-t}\sigma_{\min}^t\) | 弯曲轨迹 |
| **OT 路径** | \(tx_1\) | \(1-(1-\sigma_{\min})t\) | **直线轨迹** |

##### 4. Diffusion 路径 vs OT 路径

这是论文最重要的对比。两种路径的条件向量场形式差异巨大：

**Diffusion 路径**的条件向量场依赖复杂的调度函数 \(\alpha_t, \beta_t\)，产生弯曲的流轨迹。

**OT 路径**的条件向量场极其简洁：

$$u_t(x|x_1) = x_1 - (1-\sigma_{\min})x_0$$

> 💡 **关键洞察**：OT 条件向量场**不依赖时间 \(t\)**，仅由端点 \(x_0, x_1\) 决定。这意味着条件流的轨迹是从 \(x_0\) 到 \(x_1\) 的直线，ODE 求解器可以用更大步长而不损失精度。

![Diffusion 路径产生弯曲轨迹](https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/2d_traj/2d_traj_diff.png)
*图：Diffusion 路径的流轨迹——从噪声到数据的路径弯曲，需要更多 ODE 步数*

![OT 路径产生近似直线轨迹](https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/2d_traj/2d_traj_ot.png)
*图：OT 路径的流轨迹——近似直线，采样效率大幅提升*

##### 5. 训练与采样算法

```python
# Algorithm: Conditional Flow Matching with OT Paths - Training
# ─────────────────────────────────────────────────────────────
# Input: dataset D, neural network v_θ, σ_min ≈ 1e-5
# Output: trained v_θ

for step in range(num_steps):
    x_1 = sample_data(D)                              # 数据样本
    x_0 = torch.randn_like(x_1)                       # 噪声样本 ~ N(0, I)
    t = torch.rand(batch_size)                         # 时间步 ~ U(0, 1)

    # OT 插值：沿直线从 x_0 走到 x_1
    x_t = (1 - (1 - sigma_min) * t) * x_0 + t * x_1

    # 条件向量场目标（不依赖 t！）
    target = x_1 - (1 - sigma_min) * x_0

    # 回归损失
    loss = ||v_theta(t, x_t) - target||^2
    loss.backward()
    optimizer.step()
```

```python
# Algorithm: CFM Sampling (Euler method)
# ─────────────────────────────────────────
# Input: trained v_θ, number of steps N

x = torch.randn(shape)          # x_0 ~ N(0, I)
dt = 1.0 / N
for k in range(N):
    t = k / N
    x = x + v_theta(t, x) * dt  # Euler 积分
# x ≈ 数据样本

# 注：OT 路径由于轨迹近似直线，即使 N=10~20 也能获得高质量样本
# 更高阶求解器（如 RK45, Dopri5）可进一步减少步数
```

##### 6. 与 Diffusion Models 的统一关系

Flow Matching 框架统一了多种生成模型：

- **Score Matching / Diffusion**：当选择扩散概率路径时，FM 的条件向量场与去噪得分匹配（DSM）的目标等价，差一个时间依赖的缩放因子。具体地，扩散模型学习的得分函数 \(\nabla_x \log p_t(x)\) 与 FM 的向量场 \(v_t(x)\) 通过连续性方程相关联。
- **Rectified Flow**（Liu et al., 2022）：独立同期工作，提出了类似的 OT 路径直线插值思想。
- **Stochastic Interpolants**（Albergo & Vanden-Eijnden, 2022）：从随机插值角度得到类似结论。

> ⚠️ **关键区别**：FM 框架更通用，适用于任意高斯概率路径族，不局限于扩散过程。它提供了一个统一视角来理解和设计不同的生成模型。

##### 7. 实验结果

![训练过程中 NLL 和 FID 的变化曲线](https://ar5iv.labs.arxiv.org/html/2210.02747/assets/x9.png)
*图：ImageNet 64×64 上的训练曲线。FM w/ OT（蓝色）收敛最快，最终 NLL 和 FID 均最优*

论文在 CIFAR-10 和 ImageNet 32/64/128/256 上进行了全面实验：

- **NLL（负对数似然）**：FM w/ OT 在所有数据集上取得最优 NLL（如 CIFAR-10 上 2.99 bpd，优于 Score Matching 的 3.16 和 FM w/ Diffusion 的 3.10）
- **FID（生成质量）**：FM w/ OT 的 FID 优于 FM w/ Diffusion 和 Score Matching
- **训练效率**：OT 路径收敛速度约为 Diffusion 路径的 2 倍
- **采样效率**：OT 路径仅需 10–20 NFE 即可达到 Diffusion 路径 100+ NFE 的质量

![ImageNet 64×64 生成样本（FM w/ OT）](https://ar5iv.labs.arxiv.org/html/2210.02747/assets/figures/imagenet64/imagenet64_fm_ot.png)
*图：FM w/ OT 在 ImageNet 64×64 上的生成样本*

#### 🧪 练习题

```yaml
question: "Flow Matching 中 Conditional Flow Matching (CFM) 目标相比 FM 目标的核心优势是什么？"
options:
  - "CFM 使用了更强的神经网络架构，拟合能力更强"
  - "CFM 将不可计算的边际向量场分解为可解析计算的条件向量场，且与 FM 梯度等价"
  - "CFM 引入了对抗训练机制，提升了生成质量"
  - "CFM 通过蒸馏预训练模型减少了计算量"
answer: 1
explain: "FM 目标中的边际分布 p_t(x) 和边际向量场 u_t(x) 涉及对数据分布的不可解积分，无法直接计算。CFM 通过条件分解将问题转化为回归解析可计算的条件向量场 u_t(x|x_1)，Theorem 1 证明两者梯度完全等价，因此 CFM 在不损失任何信息的前提下实现了高效训练。"
```