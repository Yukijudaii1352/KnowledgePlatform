### SCott — 随机一致性蒸馏 (Stochastic Consistency Distillation)

```yaml
id: scott
name: SCott
full_name: "随机一致性蒸馏 (Stochastic Consistency Distillation)"
year: 2025
org: "USTC / OPPO / SJTU / CUHK"
paper_url: "https://arxiv.org/abs/2403.01505"
category: diffusion
parent: consistency-model
motivation: "将 SDE 求解器引入一致性蒸馏，结合对抗训练，实现 2 步高质量的蒸馏技术"
```

#### 📝 一句话总结

SCott 将随机微分方程（SDE）求解器引入一致性蒸馏框架，通过控制噪声强度和多步 SDE 采样来释放教师模型的潜力，并结合 LoRA 判别器的对抗训练，仅用 2 步采样即可生成高质量图像，全面超越 LCM、InstaFlow 等同类加速方法。

#### 🎯 核心要点

- **SDE 求解器替代 ODE**：在一致性蒸馏（CD）中首次使用 SDE 求解器估计教师模型轨迹，理论证明其收敛性（Theorem 1），解决了 ODE 求解器离散化误差大的问题
- **噪声强度控制**：通过扩展逆时 SDE（ER-SDE）中的参数 \(\eta\) 控制随机性强度，\(\eta \to 0\) 退化为 ODE，\(\eta = 1\) 为标准逆时 SDE，实验最优 \(\eta = 1\)
- **多步 SDE 采样**：在训练时从 \(z_{t_n}\) 到 \(\hat{z}_{t_m}\) 使用 \(h\) 步 SDE 求解（默认 \(h=3\)），缩小离散化区间以降低误差
- **LoRA 判别器 + GAN 损失**：在预训练 U-Net 上附加 LoRA 层构建轻量判别器，融合时间步和文本条件，以对抗损失辅助少步采样的质量提升
- **核心结果**：MSCOCO-2017 5K 上 2 步 FID=21.9（LCM 为 27.4），MJHQ-5K 上 2 步 FID=24.9（LCM 为 37.2），4 步内性能持续提升

#### 🔬 深入细节

##### 框架总览

![SCott 框架总览](https://ar5iv.labs.arxiv.org/html/2403.01505/assets/x2.png)
*图：SCott 训练框架。左侧为基于 SDE 求解器的一致性蒸馏，右侧为 LoRA 判别器的对抗训练。教师模型通过多步 SDE 采样从 \(z_{t_n}\) 生成 \(\hat{z}_{t_m}\)，学生模型学习将 \(z_{t_n}\) 和 \(\hat{z}_{t_m}\) 映射到一致的去噪结果。*

![多步 SDE 采样示意](https://ar5iv.labs.arxiv.org/html/2403.01505/assets/x3.png)
*图：多步 SDE 求解器采样过程。通过将 \([t_m, t_n]\) 区间细分为 \(h\) 步，减小每步离散化误差。*

##### 算法伪代码

```python
# SCott 训练伪代码
# 输入: 预训练教师模型 ε_teacher, 学生模型 f_θ, EMA模型 f_θ⁻, LoRA判别器 D_φ
# 超参: η=1 (噪声强度), h=3 (SDE步数), λ_adv=0.4 (对抗权重)

for iteration in range(40000):
    # 1. 采样时间步对 (t_n, t_m), 其中 t_m = t_{n-24}
    n = uniform_sample(boundaries)  # 从时间步边界均匀采样
    t_n, t_m = boundaries[n], boundaries[n - 24]
    
    # 2. 采样噪声潜变量 z_{t_n}
    x_0 = sample_from_dataset()
    z_tn = alpha(t_n) * x_0 + sigma(t_n) * ε,  ε ~ N(0, I)
    
    # 3. 多步 SDE 求解: z_{t_n} → ẑ_{t_m} (h=3 步)
    z = z_tn
    for step in range(h):
        t_curr = t_n - step * (t_n - t_m) / h
        t_next = t_n - (step + 1) * (t_n - t_m) / h
        # ER-SDE 更新 (含噪声项 η·g(t)·dw̄)
        score = ε_teacher(z, t_curr, c)  # 教师模型预测
        z = sde_step(z, score, t_curr, t_next, η=1.0)
    z_tm_hat = z
    
    # 4. 一致性蒸馏损失
    x_pred_n = f_θ(z_tn, t_n, c)      # 学生模型预测
    x_pred_m = f_θ⁻(z_tm_hat, t_m, c)  # EMA 模型预测 (stop gradient)
    L_cd = huber_loss(x_pred_n, x_pred_m)
    
    # 5. 对抗损失 (LoRA 判别器)
    L_adv = -D_φ(x_pred_n, c, t_n)  # 生成样本应被判为真
    L_disc = D_φ(x_pred_n.detach(), c, t_n) - D_φ(x_real, c, t_n)  # 判别器损失
    
    # 6. 总损失与更新
    L_total = L_cd + λ_adv * L_adv
    update(θ, L_total)
    update(φ, L_disc)
    ema_update(θ⁻, θ)
```

##### 动机与背景

**一致性蒸馏（CD）的瓶颈。** 一致性模型（Consistency Model）通过学习概率流 ODE 轨迹上的一致性映射来实现少步生成。其蒸馏版本（CD）依赖教师扩散模型的 ODE 求解器来估计相邻时间步之间的映射目标。然而，ODE 求解器在大步长下存在显著的离散化误差，导致教师提供的监督信号不准确，最终限制了学生模型的生成质量。

**为什么用 SDE 而非 ODE？** 直觉上，SDE 求解器通过引入随机噪声项，可以在采样过程中"探索"更广泛的分布空间，从而提供更丰富的监督信号。SCott 的核心洞察是：虽然 SDE 采样路径不同于 ODE，但它们最终收敛到相同的边际分布，因此可以合法地用于一致性蒸馏。

##### 核心机制详解

**1. 扩展逆时 SDE（ER-SDE）与噪声控制**

标准扩散模型的前向过程为：

$$dz_t = f(t)z_t \, dt + g(t) \, dw_t$$

其逆时过程可以推广为一族 SDE（ER-SDE），由参数 \(\eta\) 控制噪声强度：

$$dz_t = \left[ f(t)z_t - \frac{1 + \eta^2}{2} g^2(t) \nabla_z \log p_t(z_t) \right] dt + \eta \, g(t) \, d\bar{w}_t$$

其中 \(\eta = 0\) 退化为概率流 ODE（即传统 CD 使用的方式），\(\eta = 1\) 为标准逆时 SDE。关键性质是：**对于任意 \(\eta \geq 0\)，ER-SDE 的边际分布 \(p_t(z_t)\) 保持不变**。这意味着无论选择何种噪声强度，采样过程的边际分布始终正确。

> 💡 **关键**：\(\eta\) 的引入使得 CD 框架可以在确定性（ODE）和随机性（SDE）之间灵活切换。实验表明 \(\eta = 1\)（完全随机）效果最佳，因为适度的随机性有助于缓解离散化误差的累积。

**2. 收敛性保证（Theorem 1）**

SCott 提供了理论保证：基于 SDE 求解器的一致性蒸馏在训练步数 \(N \to \infty\) 时收敛。具体地，对于一致性蒸馏损失：

$$\mathcal{L}_{CD}(\theta, \theta^-) = \mathbb{E}\left[ d\left( f_\theta(z_{t_n}, t_n, c), \, f_{\theta^-}(\hat{z}_{t_m}, t_m, c) \right) \right]$$

当 \(N \to \infty\) 时，\(\hat{z}_{t_m}\) 的分布趋近于真实的条件分布 \(p(z_{t_m} | z_{t_n})\)，从而 \(\mathcal{L}_{CD} \to 0\)。这一结论对所有 \(\eta \geq 0\) 成立。

**3. 多步 SDE 采样**

单步 SDE 求解器在大时间间隔下误差较大。SCott 将区间 \([t_m, t_n]\) 等分为 \(h\) 个子区间，逐步求解：

$$t_m = s_0 < s_1 < \cdots < s_h = t_n$$

每步使用一阶 SDE 求解器（Euler-Maruyama）更新。实验中 \(h = 3\) 步效果最佳（FID 从 \(h=1\) 的 27.2 降至 24.9）。

> ⚠️ **注意**：多步采样仅在**训练阶段**使用，推理时学生模型仍然只需 1-4 步。这意味着训练成本增加（每次需调用教师模型 \(h\) 次），但推理效率不受影响。

**4. LoRA 判别器与对抗训练**

为进一步提升少步采样的视觉质量，SCott 引入了基于 LoRA 的轻量判别器：

- **架构**：在预训练 U-Net 的注意力层上附加 LoRA 适配器（rank=64），冻结原始参数，仅训练 LoRA 权重
- **条件输入**：同时接收时间步 \(t\) 和文本条件 \(c\)，帮助判别器在不同噪声水平下区分真假样本
- **输出**：取 U-Net 中间特征的均值作为判别分数

对抗损失采用非饱和 GAN 形式：

$$\mathcal{L}_{adv} = -\mathbb{E}\left[ D_\phi(\hat{x}_0, c, t) \right]$$

总训练目标为：

$$\mathcal{L} = \mathcal{L}_{CD} + \lambda_{adv} \cdot \mathcal{L}_{adv}, \quad \lambda_{adv} = 0.4$$

> 💡 **关键**：LoRA 判别器的参数量远小于完整 U-Net 判别器，但实验表明其效果更好（FID 21.9 vs 23.5），因为 LoRA 的低秩约束起到了正则化作用，防止判别器过拟合。

##### 与传统方法的对比

| 特性 | 传统 CD (LCM) | SCott |
|------|--------------|-------|
| 教师求解器 | ODE (DDIM/DPM++) | SDE (ER-SDE) |
| 随机性 | 无 | 可控 (\(\eta\) 参数) |
| 教师采样步数 | 1 步 | \(h\) 步（默认 3） |
| 对抗训练 | 无 | LoRA 判别器 |
| 2 步 FID (COCO-2017) | 27.4 | **21.9** |
| 多样性 (Recall) | 0.8160 | **0.9114** |

SCott 相比 LCM 的核心优势在于：(1) SDE 求解器提供更准确的教师监督信号；(2) 随机性带来更高的生成多样性（Recall 从 0.816 提升至 0.911）；(3) 对抗训练弥补了少步采样的质量损失。

##### 训练细节

- **硬件**：4 × NVIDIA A100 GPU
- **数据**：LAION-Aesthetics 6+ 子集
- **训练量**：40K 迭代，batch size = 40
- **学习率**：模型 8e-6，判别器 2e-5
- **时间步跨度**：\(t_m = t_{n-24}\)（在 1000 步离散化中跨 24 步）
- **EMA 衰减**：0.95

#### 🧪 练习题

```yaml
question: "SCott 在一致性蒸馏中使用 SDE 求解器替代 ODE 求解器的理论基础是什么？"
options:
  - "SDE 求解器的计算速度比 ODE 求解器更快"
  - "ER-SDE 族对任意噪声强度 η 保持相同的边际分布，因此可合法用于一致性蒸馏"
  - "SDE 求解器不需要教师模型的梯度信息"
  - "SDE 求解器可以跳过中间时间步直接生成最终图像"
answer: 1
explain: "ER-SDE 的关键性质是：无论 η 取何值，采样过程的边际分布 p_t(z_t) 保持不变。这保证了 SDE 求解器产生的目标与 ODE 一样合法，同时随机性有助于降低离散化误差。"
```