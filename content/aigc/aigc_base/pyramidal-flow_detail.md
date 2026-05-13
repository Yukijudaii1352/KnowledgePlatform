### Pyramidal Flow Matching — 金字塔流匹配高效视频生成

```yaml
id: pyramidal-flow
name: Pyramidal Flow Matching
full_name: 金字塔流匹配 (Pyramidal Flow Matching for Efficient Video Generative Modeling)
year: "2024"
org: 北京大学、快手科技、北京智源人工智能研究院
paper_url: https://arxiv.org/abs/2410.05954
category: aigc_base
parent: flow-matching
motivation: 通过空间-时间金字塔表示在单一模型中实现多分辨率去噪，大幅降低视频生成的训练和推理成本
```

#### 📝 一句话总结

Pyramidal Flow Matching 提出在去噪轨迹的不同阶段使用不同空间分辨率（空间金字塔）、对自回归历史帧使用渐增分辨率压缩（时间金字塔），用单一 2B 参数模型统一完成视频内容生成与超分辨率，仅需 20.7k A100 GPU 小时即可训练出生成 768p、24fps、10 秒视频的模型，质量超越 CogVideoX-5B 和 Gen-3 Alpha。

#### 🎯 核心要点

- **空间金字塔流匹配**：将去噪轨迹分为 \(K\) 个分辨率阶段，早期在低分辨率生成粗结构，后期在全分辨率精细化，通过分段流（piecewise flow）统一训练
- **Renoising 策略**：阶段间跳转时先上采样再添加噪声，保持概率路径连续性，替代传统级联扩散的多模型设计
- **时间金字塔条件**：对自回归生成的历史帧按时间远近使用递减分辨率表示，越早的帧分辨率越低，token 数减少 \(1/4^K\) 倍
- **位置编码双策略**：空间金字塔使用外推（extrapolation）位置编码，时间金字塔使用内插（interpolation）位置编码
- **架构**：基于 SD3 的 MM-DiT（2B 参数）+ 3D VAE（8×8×8 时空压缩）+ 全序列因果注意力
- **效率**：训练仅需 20.7k A100h（对比 Open-Sora 1.2 超 2 倍计算量），VBench 质量分 84.74 超越所有对比方法

#### 🔬 深入细节

##### 核心框架图

![Pyramidal Flow Matching 框架概览](https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x1.png)
*图：左侧为空间金字塔——去噪轨迹被分为多个分辨率阶段，早期在低分辨率操作；右侧为时间金字塔——历史帧按时间远近使用递减分辨率作为条件。*

![空间金字塔去噪轨迹](https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x2.png)
*图：(a) 标准流匹配在全分辨率下操作所有去噪步骤；(b) 空间金字塔流匹配将轨迹分为多个分辨率阶段，大部分计算在低分辨率完成。*

##### 算法伪代码

```python
# Pyramidal Flow Matching — 训练伪代码
# K: 金字塔阶段数, s_k: 第k阶段下采样因子, [t_k, t_{k+1}]: 第k阶段时间区间

for x_1 in dataloader:                          # x_1: 干净视频/图像
    k = uniform_sample(0, K)                     # 随机采样一个金字塔阶段
    t = uniform_sample(t_k, t_{k+1})             # 在该阶段时间区间内采样时间步
    x_0 = sample_noise(shape=x_1.shape)          # 采样高斯噪声
    
    # 构建第k阶段的插值样本（低分辨率）
    x_1_down = spatial_downsample(x_1, factor=s_k)
    x_0_down = spatial_downsample(x_0, factor=s_k)
    
    # 分段线性插值
    alpha_t = (t_{k+1} - t) / (t_{k+1} - t_k)
    beta_t  = (t - t_k) / (t_{k+1} - t_k)
    x_t_k = alpha_t * x_0_down + beta_t * x_1_down
    
    # 目标速度场
    u_t_k = (x_1_down - x_0_down) / (t_{k+1} - t_k)
    
    # 训练损失
    loss = ||v_theta(x_t_k, t) - u_t_k||^2
    loss.backward()
    optimizer.step()
```

```python
# Pyramidal Flow Matching — 推理伪代码（含 Renoising）

x = sample_noise(resolution=r_0)                 # 从最低分辨率噪声开始

for k in range(K):                               # 遍历每个金字塔阶段
    # 在第k阶段的分辨率下进行ODE求解
    for t in linspace(t_k, t_{k+1}, steps=N_k):
        x = x + v_theta(x, t) * dt              # Euler/中点法积分
    
    if k < K - 1:                                # 非最后阶段，需要 renoising
        x_up = spatial_upsample(x, factor=s_{k+1}/s_k)  # 上采样到下一阶段分辨率
        epsilon = sample_noise(shape=x_up.shape)
        # 重加噪：混合上采样结果和新噪声
        x = (1 - t_{k+1}) * epsilon + t_{k+1} * x_up

return x                                         # 最终全分辨率视频
```

##### 动机与背景

视频扩散模型的核心瓶颈在于计算成本：全序列扩散需要在**每个去噪步骤**都处理全分辨率的所有视频帧，注意力计算量为 \(O(T^2 N^2)\)（\(T\) 为帧数，\(N\) 为每帧 token 数）。

> 💡 关键观察：去噪早期阶段的样本包含大量噪声，信息量极低，仅包含粗粒度的空间结构。在这些阶段使用全分辨率处理是严重的计算浪费。

传统的级联扩散模型（如 Imagen Video）虽然利用了多分辨率思想，但需要为每个分辨率训练独立模型，存在三个问题：(1) 模型间无法共享知识；(2) 需要分别训练和调优多个模型；(3) 级联推理时误差会逐级累积。

##### 空间金字塔流匹配：核心机制

**Flow Matching 基础**：Flow Matching 通过学习速度场 \(v_\theta(x_t, t)\) 建模从噪声 \(p_0 = \mathcal{N}(0, I)\) 到数据 \(p_1\) 的概率路径。标准线性插值为：

$$x_t = (1-t) \cdot x_0 + t \cdot x_1, \quad t \in [0, 1]$$

训练目标为：

$$\mathcal{L}_{FM} = \mathbb{E}_{t, x_0, x_1} \| v_\theta(x_t, t) - (x_1 - x_0) \|^2$$

**金字塔分段流**：将时间区间 \([0, 1]\) 分为 \(K\) 个阶段 \([t_0, t_1], [t_1, t_2], \ldots, [t_{K-1}, t_K]\)，每个阶段在不同空间分辨率 \(r_1 < r_2 < \ldots < r_K\) 上操作。在第 \(k\) 阶段，流被定义在下采样后的空间上：

$$x_t^{(k)} = \frac{t_{k+1} - t}{t_{k+1} - t_k} \cdot \text{Down}(x_0, s_k) + \frac{t - t_k}{t_{k+1} - t_k} \cdot \text{Down}(x_1, s_k)$$

其中 \(s_k\) 为下采样因子。对应的目标速度场为：

$$u_t^{(k)} = \frac{\text{Down}(x_1, s_k) - \text{Down}(x_0, s_k)}{t_{k+1} - t_k}$$

> 💡 关键设计：所有阶段共享同一个模型 \(v_\theta\)，通过时间步 \(t\) 和阶段标识 \(k\) 区分不同分辨率阶段。这实现了跨分辨率的知识共享——低分辨率阶段学到的结构知识可迁移到高分辨率阶段。

**统一训练目标**：

$$\mathcal{L} = \sum_{k=1}^{K} \mathbb{E}_{t \sim \mathcal{U}[t_{k-1}, t_k]} \left\| v_\theta(x_t^{(k)}, t) - u_t^{(k)} \right\|^2$$

训练时每次迭代均匀采样一个阶段 \(k\)，在该阶段的时间区间内采样 \(t\)，计算对应分辨率下的损失。

**Renoising 推理策略**：推理时从低分辨率阶段跳转到高分辨率阶段需要 renoising 操作：

1. 在第 \(k\) 阶段完成 ODE 积分，得到 \(\hat{x}_{t_{k+1}}^{(k)}\)
2. 上采样到下一阶段分辨率：\(\tilde{x} = \text{Up}(\hat{x}_{t_{k+1}}^{(k)})\)
3. 添加噪声以匹配新阶段的噪声水平：

$$x_{t_{k+1}}^{(k+1)} = (1 - t_{k+1}) \cdot \epsilon + t_{k+1} \cdot \tilde{x}, \quad \epsilon \sim \mathcal{N}(0, I)$$

> ⚠️ 注意：Renoising 是连接不同分辨率阶段的关键。它确保上采样后的样本分布与下一阶段起始分布一致，避免分辨率跳变导致的伪影。这与级联扩散模型中需要独立训练超分辨率模型形成鲜明对比。

##### 时间金字塔条件：自回归效率优化

![时间金字塔条件](https://ar5iv.labs.arxiv.org/html/2410.05954/assets/x3.png)
*图：(a) 时间金字塔对历史帧按时间远近使用递减分辨率；(b) 空间金字塔使用外推位置编码，时间金字塔使用内插位置编码。*

在自回归视频生成中，模型需要以历史帧为条件预测未来帧。传统方法将所有历史帧以全分辨率输入，计算量随视频长度线性增长。

> 💡 关键观察：越早的历史帧与当前生成帧的关联越弱，主要提供高层语义信息（场景布局、运动趋势），而非精细外观细节。

因此，对历史帧采用渐增分辨率的金字塔压缩：

$$\underbrace{\ldots \to \text{Down}(x^{i-2}, 2^{k+1}) \to \text{Down}(x^{i-1}, 2^k)}_{\text{历史帧条件（分辨率递增）}} \to \hat{x}^i_t \text{（当前生成帧）}$$

越早的帧使用更大的下采样因子。设有 \(T\) 个历史帧分布在 \(K\) 个分辨率层级，大部分帧在最低分辨率 \(1/2^K\) 下计算，训练 token 数减少至 \(1/4^K\)。

**训练技巧**：
- 对历史帧添加强度在 \([0, 1/3]\) 均匀采样的噪声，缓解自回归误差累积
- 推理时直接使用已生成的干净帧作为条件

**位置编码双策略**：
- **空间金字塔**：使用**外推**（extrapolation）——低分辨率阶段使用位置编码子集，高分辨率阶段外推到更多位置，捕获更精细细节
- **时间金字塔**：使用**内插**（interpolation）——将低分辨率帧的位置编码内插到与全分辨率空间对齐，确保语义一致性

##### 架构与实现

| 组件 | 设计选择 |
|------|---------|
| 基础架构 | MM-DiT（SD3 Medium），2B 参数 |
| 注意力 | 全序列注意力 + 逐块因果注意力（blockwise causal） |
| VAE | 3D VAE，时空压缩 8×8×8（类 MAGVIT-v2） |
| 金字塔阶段 | \(K=3\)（3 个分辨率级别） |
| 训练 | 图像-视频联合训练，Patch n' Pack 长度均衡 |
| 推理 | 原生支持 T2V 和 I2V（无需额外微调） |

> 💡 关键：得益于金字塔表示大幅减少 token 数量，本方法可以使用**全序列注意力**（而非分解的时空注意力），这对捕获时空关联至关重要。逐块因果注意力确保每个 token 只能 attend 到当前帧及之前的帧，支持自回归生成。

##### 与传统方法的对比

| 维度 | 全序列扩散 | 级联扩散 | Pyramidal Flow |
|------|-----------|---------|---------------|
| 模型数量 | 1 | 多个（每个分辨率一个） | **1** |
| 早期阶段分辨率 | 全分辨率 | 低分辨率 | **低分辨率** |
| 知识共享 | — | ✗ | **✓** |
| 训练复杂度 | \(O(T^2N^2)\) | 多个 \(O(T^2N^2)\) | **\(O(T^2N^2/16^K)\)** |
| VBench 质量分 | — | — | **84.74** |

##### 实验亮点

- **VBench 质量分 84.74**，超越 Gen-3 Alpha（84.11）、CogVideoX-5B（82.75），且仅使用公开数据
- **训练成本 20.7k A100h**，Open-Sora 1.2 需超过 2 倍计算量且质量更差
- 消融实验：空间金字塔实现约 **3 倍 FID 收敛加速**；时间金字塔在相同训练步数下视觉质量和时间一致性远优于全序列基线
- 语义分较低（69.62），主要因粗粒度合成 caption，可通过更精确视频描述改善

#### 🧪 练习题

```yaml
question: "Pyramidal Flow Matching 在推理时从低分辨率阶段跳转到高分辨率阶段时，使用了什么关键策略？"
options:
  - "直接对低分辨率结果进行双线性插值上采样"
  - "使用独立训练的超分辨率模型进行放大"
  - "先上采样再添加适量噪声（Renoising），保持概率路径连续性"
  - "在高分辨率下从头重新开始去噪过程"
answer: 2
explain: "Renoising 策略先将低分辨率结果上采样，再添加与当前时间步匹配的噪声，确保跨分辨率跳转时分布连续，避免伪影。这是单一模型替代级联多模型的关键。"
```