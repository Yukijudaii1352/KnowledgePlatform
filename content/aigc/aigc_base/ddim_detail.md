### DDIM（去噪扩散隐式模型）

```yaml
id: ddim
name: DDIM
full_name: "去噪扩散隐式模型 (Denoising Diffusion Implicit Models)"
year: 2021
org: Stanford
paper_url: "https://arxiv.org/abs/2010.02502"
category: diffusion
parent: ddpm
motivation: "通过非马尔可夫扩散过程实现确定性采样，将生成速度提升10-50倍"
```

#### 📝 一句话总结

DDIM 提出了一类非马尔可夫扩散过程，其训练目标与 DDPM 完全一致，但采样过程可以是确定性的，从而支持在远少于训练步数的情况下高质量生成图像，实现 10×–50× 的加速，同时获得语义有意义的隐空间。

#### 🎯 核心要点

- **非马尔可夫前向过程**：构造了一族参数化的非马尔可夫前向过程 \(q_\sigma(\mathbf{x}_{1:T}|\mathbf{x}_0)\)，其边缘分布 \(q_\sigma(\mathbf{x}_t|\mathbf{x}_0)\) 与 DDPM 完全相同
- **统一采样公式**：通过参数 \(\sigma\) 控制采样随机性，\(\sigma=0\) 为确定性 DDIM，特定 \(\sigma\) 值恢复 DDPM
- **确定性生成**：当 \(\sigma=0\) 时，生成过程从 \(\mathbf{x}_T\) 到 \(\mathbf{x}_0\) 完全确定，同一隐变量始终生成相同图像
- **加速采样**：利用时间步子序列 \(\tau \subset [1,\ldots,T]\)，以 \(S \ll T\) 步完成采样，无需重新训练
- **隐空间语义性**：确定性映射使隐空间具有语义插值能力，支持高层特征的平滑过渡
- **训练目标不变**：与 DDPM 使用完全相同的训练目标 \(L_1\)，已训练好的 DDPM 模型可直接用于 DDIM 采样
- **与 Neural ODE 的联系**：当步数趋于无穷时，DDIM 的确定性采样过程对应一个 Neural ODE

#### 🔬 深入细节

##### 核心框架图

![DDPM 马尔可夫前向过程](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x1.png)
![DDIM 非马尔可夫前向过程](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x2.png)

*图 1：左图为 DDPM 的马尔可夫前向过程，每一步仅依赖前一步；右图为 DDIM 的非马尔可夫前向过程，每一步同时依赖 \(\mathbf{x}_0\) 和前一步，但边缘分布保持不变。*

![加速采样图模型](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x3.png)

*图 2：加速采样的图模型。通过选取时间步子序列 \(\tau=[1,3]\)，跳过中间步骤直接生成，大幅减少采样步数。*

##### 算法伪代码

```python
# DDIM 采样算法
# 输入：训练好的噪声预测网络 ε_θ，噪声调度 α_1:T，采样子序列 τ，随机性参数 η
# 输出：生成样本 x_0

import torch

def ddim_sample(eps_model, alphas, tau, eta=0.0):
    """
    eps_model: 训练好的噪声预测网络 ε_θ(x_t, t)
    alphas:    累积噪声调度 α_t = ∏_{i=1}^{t} (1 - β_i)
    tau:       采样时间步子序列，如 [1, 21, 41, ..., 981]
    eta:       随机性控制参数，0=确定性DDIM，1=DDPM
    """
    # 从标准高斯采样初始噪声
    x = torch.randn_like(x_0_shape)  # x_T ~ N(0, I)
    
    for i in reversed(range(len(tau))):
        t = tau[i]
        t_prev = tau[i-1] if i > 0 else 0
        
        alpha_t = alphas[t]
        alpha_prev = alphas[t_prev] if t_prev > 0 else 1.0
        
        # 1. 预测噪声
        eps_pred = eps_model(x, t)
        
        # 2. 计算 σ_t（控制随机性）
        sigma_t = eta * ((1 - alpha_prev) / (1 - alpha_t) * (1 - alpha_t / alpha_prev)).sqrt()
        
        # 3. 预测 x_0
        pred_x0 = (x - (1 - alpha_t).sqrt() * eps_pred) / alpha_t.sqrt()
        
        # 4. 计算"指向 x_t 方向"的分量
        dir_xt = (1 - alpha_prev - sigma_t**2).sqrt() * eps_pred
        
        # 5. 随机噪声项
        noise = torch.randn_like(x) if t_prev > 0 else 0
        
        # 6. DDIM 更新
        x = alpha_prev.sqrt() * pred_x0 + dir_xt + sigma_t * noise
    
    return x
```

##### 动机与背景

DDPM（Denoising Diffusion Probabilistic Models）在图像生成质量上取得了与 GAN 可比的效果，但其采样过程需要模拟完整的马尔可夫链（通常 \(T=1000\) 步），导致生成速度极慢——在单张 Nvidia 2080 Ti GPU 上生成 50,000 张 32×32 图像需要约 20 小时。这一瓶颈严重限制了扩散模型的实际应用。

DDPM 采样慢的根本原因在于：其前向过程被定义为马尔可夫链，逆过程也必须逐步反转每一个时间步。然而，DDIM 的作者发现了一个关键洞察——**DDPM 的训练目标 \(L_1\) 实际上只依赖于边缘分布 \(q(\mathbf{x}_t|\mathbf{x}_0)\)，而非联合分布 \(q(\mathbf{x}_{1:T}|\mathbf{x}_0)\)**。这意味着存在无穷多种不同的前向过程（包括非马尔可夫的），它们共享相同的边缘分布，因此使用相同的训练目标。

##### 核心机制：非马尔可夫前向过程

**1. DDPM 的边缘分布回顾**

在 DDPM 中，前向过程的边缘分布为：

$$q(\mathbf{x}_t | \mathbf{x}_0) = \mathcal{N}(\sqrt{\alpha_t}\,\mathbf{x}_0,\;(1-\alpha_t)\mathbf{I})$$

其中 \(\alpha_t = \prod_{i=1}^{t}(1-\beta_i)\) 是累积噪声调度参数。

**2. 非马尔可夫前向过程的构造**

DDIM 定义了一族由实数向量 \(\sigma \in \mathbb{R}_{\geq 0}^T\) 索引的推断分布：

$$q_\sigma(\mathbf{x}_{1:T}|\mathbf{x}_0) = q_\sigma(\mathbf{x}_T|\mathbf{x}_0) \prod_{t=2}^{T} q_\sigma(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0)$$

其中：

$$q_\sigma(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0) = \mathcal{N}\!\left(\sqrt{\alpha_{t-1}}\,\mathbf{x}_0 + \sqrt{1-\alpha_{t-1}-\sigma_t^2}\cdot\frac{\mathbf{x}_t - \sqrt{\alpha_t}\,\mathbf{x}_0}{\sqrt{1-\alpha_t}},\;\sigma_t^2\mathbf{I}\right)$$

> 💡 **关键洞察**：这个前向过程不再是马尔可夫的——\(q_\sigma(\mathbf{x}_{t-1}|\mathbf{x}_t, \mathbf{x}_0)\) 同时依赖于 \(\mathbf{x}_t\) 和 \(\mathbf{x}_0\)。但通过精心设计均值和方差的参数化，可以证明其边缘分布仍然满足 \(q_\sigma(\mathbf{x}_t|\mathbf{x}_0) = \mathcal{N}(\sqrt{\alpha_t}\,\mathbf{x}_0, (1-\alpha_t)\mathbf{I})\)，与 DDPM 完全一致。

**3. 统一采样公式（核心公式）**

由于训练目标不变，已训练好的噪声预测网络 \(\epsilon_\theta\) 可以直接复用。对应的生成过程更新规则为：

$$\mathbf{x}_{t-1} = \underbrace{\sqrt{\alpha_{t-1}} \cdot \frac{\mathbf{x}_t - \sqrt{1-\alpha_t}\,\epsilon_\theta(\mathbf{x}_t, t)}{\sqrt{\alpha_t}}}_{\text{"预测的 } \mathbf{x}_0\text{"}} + \underbrace{\sqrt{1-\alpha_{t-1}-\sigma_t^2} \cdot \epsilon_\theta(\mathbf{x}_t, t)}_{\text{"指向 } \mathbf{x}_t \text{ 的方向"}} + \underbrace{\sigma_t\,\epsilon_t}_{\text{随机噪声}}$$

这个公式由三个直观的部分组成：
1. **预测的 \(\mathbf{x}_0\)**：利用当前 \(\mathbf{x}_t\) 和预测的噪声 \(\epsilon_\theta\) 估计原始干净图像
2. **指向 \(\mathbf{x}_t\) 的方向**：保持与当前噪声水平一致的方向分量
3. **随机噪声**：由 \(\sigma_t\) 控制的额外随机性

> ⚠️ **注意**：参数 \(\sigma_t\) 控制了采样的随机性程度：
> - 当 \(\sigma_t = \sqrt{(1-\alpha_{t-1})/(1-\alpha_t)} \cdot \sqrt{1-\alpha_t/\alpha_{t-1}}\) 时，恢复 DDPM
> - 当 \(\sigma_t = 0\) 时，采样过程完全确定，即 **DDIM**
> - 论文引入超参数 \(\eta \in [0, 1]\) 来统一控制：\(\sigma_t(\eta) = \eta \cdot \sqrt{(1-\alpha_{t-1})/(1-\alpha_t)} \cdot \sqrt{1-\alpha_t/\alpha_{t-1}}\)

##### 加速采样机制

DDIM 的另一个核心贡献是**加速采样**。由于训练目标只依赖边缘分布 \(q(\mathbf{x}_t|\mathbf{x}_0)\)，我们可以在采样时选择时间步的一个子序列 \(\tau = [\tau_1, \tau_2, \ldots, \tau_S]\)（其中 \(S \ll T\)），只在这些时间步上执行去噪更新。

例如，当 \(T=1000\) 时，可以选取 \(\tau = [1, 21, 41, \ldots, 981]\)（共 50 步），将采样速度提升 20 倍。这一加速**无需重新训练模型**，因为每一步的去噪操作仍然使用相同的 \(\epsilon_\theta\)，只是跳过了中间时间步。

![采样步数与质量的关系](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x8.png)

*图 3：采样时间与步数呈线性关系。DDIM 在 20-100 步即可达到与 1000 步 DDPM 可比的质量。*

##### 实验结果

| 数据集 | 方法 | 10 步 | 20 步 | 50 步 | 100 步 | 1000 步 |
|--------|------|-------|-------|-------|--------|---------|
| CIFAR10 | DDIM (\(\eta=0\)) | 13.36 | 6.84 | 4.67 | 4.16 | 4.04 |
| CIFAR10 | DDPM (\(\eta=1\)) | 41.07 | 18.36 | 8.01 | 5.78 | 4.73 |
| CelebA | DDIM (\(\eta=0\)) | 17.33 | 13.73 | 9.17 | 6.53 | 3.51 |
| CelebA | DDPM (\(\eta=1\)) | 33.12 | 26.03 | 18.48 | 13.93 | 5.98 |

*表：CIFAR10 和 CelebA 上的 FID 分数（越低越好）。DDIM 在少步采样时显著优于 DDPM。*

关键发现：
- **少步采样优势显著**：DDIM 100 步的 FID（4.16）已接近 DDPM 1000 步（4.73），实现 10× 加速
- **DDPM 在少步时严重退化**：DDPM 10 步的 FID 高达 41.07，而 DDIM 仅为 13.36
- **CelebA 上 20 步 DDIM 的 FID（13.73）与 100 步 DDPM（13.93）相当**，实现 5× 加速

##### 确定性采样的独特优势

![一致性采样](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/x10.png)

*图 4：DDIM 的一致性特性——相同的初始噪声 \(\mathbf{x}_T\) 在不同采样步数下生成语义一致的图像。*

DDIM 的确定性采样（\(\sigma=0\)）带来了 DDPM 不具备的独特优势：

1. **采样一致性**：给定相同的 \(\mathbf{x}_T\)，无论使用多少采样步数，DDIM 都生成语义相似的图像。这意味着可以先用少量步数快速预览，再用更多步数精细化。

2. **语义隐空间插值**：由于 \(\mathbf{x}_T\) 到 \(\mathbf{x}_0\) 的映射是确定性的，隐空间中的插值具有语义意义。

![隐空间插值](https://ar5iv.labs.arxiv.org/html/2010.02502/assets/figures/celeba-interp-line.png)

*图 5：CelebA 上 DDIM 隐空间的球面插值，展示了高层语义特征（姿态、表情、性别）的平滑过渡。*

##### 与传统方法的区别

| 特性 | DDPM | DDIM |
|------|------|------|
| 前向过程 | 马尔可夫链 | 非马尔可夫 |
| 采样过程 | 随机的 | 可确定性 |
| 最少采样步数 | \(T\)（通常 1000） | \(S \ll T\)（可低至 20-50） |
| 隐空间 | 无语义结构 | 语义可插值 |
| 训练目标 | \(L_1\) | 相同的 \(L_1\)（无需重训） |
| 生成多样性 | 每次不同 | 同一 \(\mathbf{x}_T\) 生成相同结果 |

> 💡 **关键**：DDIM 不是一个新的训练方法，而是一个新的采样方法。任何已训练好的 DDPM 模型都可以直接使用 DDIM 采样，无需任何额外训练。这使得 DDIM 成为扩散模型加速采样的即插即用方案。

#### 🧪 练习题

```yaml
question: "DDIM 能够实现加速采样的根本原因是什么？"
options:
  - "使用了更高效的神经网络架构来预测噪声"
  - "DDPM 的训练目标只依赖边缘分布 q(x_t|x_0)，允许使用非马尔可夫前向过程和时间步子序列"
  - "通过蒸馏技术将大模型压缩为小模型"
  - "采用了自适应步长的 ODE 求解器"
answer: 1
explain: "DDPM 的去噪目标 L_1 仅依赖于边缘分布 q(x_t|x_0) 而非联合分布，因此可以构造非马尔可夫前向过程并在采样时使用时间步子序列，无需重新训练即可大幅减少采样步数。"
```