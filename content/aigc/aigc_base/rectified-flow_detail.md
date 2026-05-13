### 矫正流 (Rectified Flow)

```yaml
id: rectified-flow
name: Rectified Flow
full_name: 矫正流 (Rectified Flow)
year: '2022'
org: UT Austin
paper_url: https://arxiv.org/abs/2209.03003
category: flow_matching
parent: flow-matching
motivation: 重流技术直线化轨迹实现一步生成
```

#### 📝 一句话总结

Rectified Flow 提出通过学习沿直线路径传输的 ODE 模型，并引入"矫正（Reflow）"操作迭代拉直传输轨迹，使得仅需一步 Euler 积分即可完成高质量生成，为 Flow Matching 框架下的少步/一步生成奠定了理论与实践基础。

#### 🎯 核心要点

- **直线路径回归**：以线性插值 \(X_t = (1-t)X_0 + tX_1\) 为中间状态，用最小二乘回归速度场 \(v_\theta(X_t, t) \approx X_1 - X_0\)，训练目标与 Flow Matching / DDPM 连续形式等价
- **矫正（Reflow）操作**：用已学 ODE 生成新耦合 \((Z_0, Z_1)\) 替换原始独立耦合，迭代训练使轨迹越来越直，理论证明凸传输代价单调不增
- **一步蒸馏（Distillation）**：在轨迹充分拉直后，用 ODE 生成的 \((Z_0, Z_1)\) 对训练一步映射网络 \(f_\theta(Z_0) \approx Z_1\)，实现单步生成
- **理论保证**：证明 Reflow 单调降低直线度指标 \(S(v)\) 与凸传输代价，极限收敛至最优传输映射
- **统一框架**：同一方法无需修改即可处理生成建模（\(\pi_0\) 为高斯）、图像翻译（\(\pi_0, \pi_1\) 均为复杂分布）、域适应等任务
- **实验验证**：CIFAR-10 上 3-Rectified + Distill 实现 FID 5.21 的单步生成；LSUN Bedroom、CelebA-HQ 等数据集上均展示了有效性

#### 🔬 深入细节

##### 核心框架示意

![Rectified Flow 总览](https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/teaser.png)
*图 1：Rectified Flow 总览。左：从独立耦合出发学习 ODE 传输；中：Reflow 迭代拉直轨迹；右：轨迹拉直后可用极少步甚至一步 Euler 积分完成生成。*

![Rectified Flow 方法示意](https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/illustration.png)
*图 2：方法示意。(a) 初始独立耦合的直线路径会交叉，速度场需要在交叉处取平均，导致弯曲轨迹；(b) Reflow 后路径不再交叉，ODE 轨迹趋于直线。*

![2D 演示](https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/2d_demo.png)
*图 3：2D 合成数据上的可视化。随着 Reflow 轮次增加，传输路径从交叉弯曲逐步变为平行直线，一步采样质量显著提升。*

##### 算法伪代码

```python
# ===== Algorithm 1: 训练 Rectified Flow =====
# 输入: 源分布 π₀, 目标分布 π₁, 耦合 π (初始为独立耦合 π₀⊗π₁)
# 输出: 速度场网络 v_θ

for iteration in range(N):
    X0 ~ π₀;  X1 ~ π₁          # 从耦合 π 中采样
    t ~ Uniform(0, 1)           # 随机时间步
    Xt = (1 - t) * X0 + t * X1  # 线性插值
    loss = || v_θ(Xt, t) - (X1 - X0) ||²  # 最小二乘损失
    optimizer.step(loss)

# ===== Algorithm 2: Reflow (矫正) =====
# 输入: 已训练的 v_θ, 源分布 π₀
# 输出: 新耦合 (Z0, Z1)

pairs = []
for i in range(M):
    Z0 ~ π₀
    Z1 = ODE_solve(v_θ, Z0, t=0→1, steps=100)  # 用多步 Euler 求解
    pairs.append((Z0, Z1))
# 用新耦合 pairs 重新训练 → 得到更直的 v_θ'

# ===== Algorithm 3: 一步蒸馏 =====
# 输入: 充分矫正后的 v_θ
# 输出: 一步生成网络 f_θ

for iteration in range(K):
    Z0 ~ π₀
    Z1 = ODE_solve(v_θ, Z0, t=0→1, steps=100)
    loss = || f_θ(Z0) - Z1 ||²  # MSE 蒸馏
    optimizer.step(loss)
```

##### 动机与背景

扩散模型（Diffusion Models）和基于分数的生成模型（Score-based Models）在图像生成领域取得了巨大成功，但它们的采样过程通常需要数百甚至上千步 ODE/SDE 求解，计算开销极大。Flow Matching [Lipman et al., 2022] 提出了一种 simulation-free 的训练范式，通过回归条件速度场来学习 ODE 流，但其生成的 ODE 轨迹仍然可能弯曲，导致少步采样时质量急剧下降。

> 💡 关键：弯曲轨迹的根源在于**路径交叉**——当不同数据对 \((X_0, X_1)\) 和 \((X_0', X_1')\) 的线性插值路径在某个时刻 \(t\) 处交叉时，速度场 \(v(x, t)\) 必须在交叉点对多个方向取条件期望，导致学到的轨迹偏离任何一条直线。

Rectified Flow 的核心洞察是：**如果传输路径是不交叉的直线，那么一步 Euler 积分就能精确模拟 ODE**，因为直线上的速度恒为常数 \(X_1 - X_0\)。因此，关键问题转化为：如何消除路径交叉，使轨迹尽可能直？

##### 核心机制：直线路径回归与矫正

**1. 直线路径回归**

给定源分布 \(\pi_0\)（如标准高斯）和目标分布 \(\pi_1\)（如图像分布）的一个耦合 \(\pi\)，Rectified Flow 定义如下 ODE：

$$
\frac{dZ_t}{dt} = v_\pi(Z_t, t), \quad t \in [0, 1]
$$

其中速度场 \(v_\pi\) 通过求解最小二乘问题获得：

$$
\min_v \int_0^1 \mathbb{E}_{(X_0, X_1) \sim \pi} \left[ \| v(X_t, t) - (X_1 - X_0) \|^2 \right] dt
$$

这里 \(X_t = (1-t)X_0 + tX_1\) 是线性插值。该损失的最优解是条件期望：

$$
v_\pi(x, t) = \mathbb{E}[X_1 - X_0 \mid X_t = x]
$$

> ⚠️ 注意：这个训练目标在形式上与 Flow Matching [Lipman et al., 2022]、Conditional Flow Matching [Tong et al., 2023] 以及 DDPM 的连续时间形式完全等价。Rectified Flow 的独特贡献不在于训练目标本身，而在于对直线路径的几何解释以及矫正操作。

**2. 矫正（Reflow）操作**

初始独立耦合 \(\pi^0 = \pi_0 \otimes \pi_1\) 下，不同数据对的线性插值路径几乎必然交叉。矫正操作通过以下迭代消除交叉：

- **第 \(k\) 轮**：用当前速度场 \(v^k\) 从 \(Z_0 \sim \pi_0\) 出发求解 ODE 得到 \(Z_1^k\)
- 构造新耦合 \(\pi^{k+1} = (Z_0, Z_1^k)\)
- 用新耦合重新训练速度场 \(v^{k+1}\)

由于 ODE 解的唯一性，新耦合 \((Z_0, Z_1^k)\) 的传输路径天然不交叉（确定性映射的轨迹不会相交）。因此每轮矫正都会减少路径交叉，使轨迹更直。

**理论保证**：论文证明了两个关键定理：

定理 1（传输代价单调不增）：对任意凸代价函数 \(c\)，

$$
\mathbb{E}_{\pi^{k+1}}[c(X_1 - X_0)] \leq \mathbb{E}_{\pi^k}[c(X_1 - X_0)]
$$

定理 2（直线度单调改善）：定义直线度指标

$$
S(v) = \mathbb{E}\left[\int_0^1 \| v(Z_t, t) - (Z_1 - Z_0) \|^2 dt\right]
$$

则 \(S(v^{k+1}) \leq S(v^k)\)，即每轮矫正使轨迹更接近直线。

这两个定理的证明核心依赖于 Jensen 不等式：ODE 确定性映射消除了条件期望中的方差项，从而降低了代价。

**3. 一步蒸馏**

经过 2-3 轮 Reflow 后，轨迹已经足够直，此时可以进一步蒸馏为一步模型。蒸馏的训练目标非常简单：

$$
\min_\theta \mathbb{E}_{Z_0 \sim \pi_0} \left[ \| f_\theta(Z_0) - Z_1 \|^2 \right]
$$

其中 \(Z_1\) 由充分矫正后的 ODE 生成。由于轨迹已近似直线，\(Z_0 \to Z_1\) 的映射接近确定性，蒸馏损失的方差很小，因此一步模型能够高质量地逼近多步 ODE。

##### 训练与推理流程

**训练流程**分为三个阶段：

1. **1-Rectified Flow 训练**：使用独立耦合 \(\pi_0 \otimes \pi_1\)，训练速度场 \(v_\theta\)。网络架构采用与 DDPM 相同的 U-Net，Adam 优化器，学习率 \(2 \times 10^{-4}\)，batch size 128，训练 800K 迭代。
2. **Reflow**：用已训练模型生成 1M 个 \((Z_0, Z_1)\) 对（100 步 Euler），用新耦合重新训练模型。可重复 1-2 次。
3. **蒸馏（可选）**：用矫正后的 ODE 生成数据对，训练一步映射网络，200K 迭代。

**推理流程**：

- **多步采样**：从 \(Z_0 \sim \mathcal{N}(0, I)\) 出发，用 \(N\) 步 Euler 方法求解 ODE：\(Z_{t+\Delta t} = Z_t + \Delta t \cdot v_\theta(Z_t, t)\)
- **一步生成**（蒸馏后）：直接计算 \(Z_1 = f_\theta(Z_0)\)

> 💡 关键：Reflow 的核心价值在于——即使不做蒸馏，矫正后的模型也能用极少的 Euler 步数（如 2-5 步）获得接近多步采样的质量，因为轨迹已经足够直。

##### 与 Flow Matching 及扩散模型的区别

| 维度 | 扩散模型 (DDPM/Score SDE) | Flow Matching | Rectified Flow |
|------|--------------------------|---------------|----------------|
| 训练目标 | 预测噪声 \(\epsilon\) 或分数 \(\nabla \log p_t\) | 回归条件速度场 | 回归直线方向 \(X_1 - X_0\)（等价于 FM） |
| 采样路径 | 弯曲（SDE/ODE 求解） | 可能弯曲 | 通过 Reflow 迭代拉直 |
| 少步采样 | 需要专门的加速方法（DDIM 等） | 质量随步数下降 | Reflow 后少步即可保持质量 |
| 一步生成 | 需额外蒸馏（Consistency Model 等） | 不直接支持 | Reflow + 蒸馏自然支持 |
| 理论保证 | 收敛到数据分布 | 收敛到数据分布 | 额外保证传输代价单调不增 |
| 任务通用性 | 主要用于生成 | 主要用于生成 | 统一处理生成、翻译、域适应 |

Rectified Flow 的核心创新不在训练目标（与 FM 等价），而在于 **Reflow 矫正操作**这一独特的后处理/迭代机制，它提供了一条从"任意耦合"到"近似最优传输"的系统化路径，并在理论上保证了单调改善。

##### 实验结果

**CIFAR-10 无条件生成**：

| 方法 | FID ↓ | NFE (步数) |
|------|-------|-----------|
| DDPM [Ho et al., 2020] | 3.17 | 1000 |
| Score SDE [Song et al., 2020] | 2.20 | 2000 |
| EDM [Karras et al., 2022] | 1.97 | 35 |
| Flow Matching [Lipman et al., 2022] | 6.35 | 142 |
| 1-Rectified Flow | 6.18 | 110 |
| 2-Rectified Flow | 4.85 | 110 |
| **3-Rectified + Distill** | **5.21** | **1** |

![CIFAR-10 FID vs NFE](https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/cifar10_uncond_fid_nfe.png)
*图 4：CIFAR-10 上 FID 与采样步数的关系。Reflow 轮次越多，少步采样的 FID 越低。*

**Euler 步数与 FID 的权衡**（消融实验）：

| Euler 步数 | 1-Rectified FID | 2-Rectified FID | 3-Rectified FID |
|-----------|-----------------|-----------------|-----------------|
| 1 | 25.3 | 12.1 | 5.21 |
| 2 | 15.7 | 7.8 | 4.12 |
| 5 | 8.9 | 5.5 | 3.85 |
| 10 | 6.8 | 5.0 | 3.72 |
| 100 | 6.18 | 4.85 | 3.68 |

该消融清晰展示了 Reflow 的核心效果：**更多轮矫正 = 更直的轨迹 = 更少的步数即可达到相同质量**。3-Rectified 仅需 1 步即可达到 1-Rectified 需要 100 步才能达到的水平。

**图像翻译**：Rectified Flow 无需修改即可用于无配对图像翻译（Photo→Monet、Horse→Zebra 等），展示了框架的通用性。

![图像翻译结果](https://ar5iv.labs.arxiv.org/html/2209.03003v2/assets/figs/i2i_main.png)
*图 5：无配对图像翻译结果。Rectified Flow 在风格迁移和物种转换任务上均产生高质量结果。*

#### 🧪 练习题

```yaml
question: "Rectified Flow 中 Reflow（矫正）操作的核心作用是什么？"
options:
  - "改变网络架构使其更适合一步生成"
  - "通过 ODE 生成新耦合替换原始耦合，迭代消除路径交叉使轨迹趋于直线"
  - "引入对抗训练损失提升生成图像的感知质量"
  - "增大训练数据量以提升模型泛化能力"
answer: 1
explain: "Reflow 用已学 ODE 的确定性映射构造新耦合 (Z₀, Z₁)，由于 ODE 解的唯一性，新耦合的路径天然不交叉，从而使下一轮训练的轨迹更直，理论证明传输代价单调不增。"
```