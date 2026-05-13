### Edit2Perceive

```yaml
id: edit2perceive
name: Edit2Perceive
full_name: "Edit2Perceive: Editing Models Are Strong Dense Perception Learners"
year: 2026
category: instruction_edit
parent: icedit
paper_url: https://arxiv.org/abs/2511.18673
motivation: 利用图像编辑扩散模型(I2I)替代传统文本生成模型(T2I)作为密集感知任务的基础，解决"表征失配"问题
```

## 一句话总结

Edit2Perceive 提出将图像编辑扩散模型（FLUX.1 Kontext）重新用于深度估计、法线估计和交互式抠图等密集感知任务，通过像素空间一致性损失和理论最优的平方根深度映射，以单步推理在12个基准上取得全面SOTA。

## 核心要点

1. **表征失配论点（Representation Mismatch）**：T2I 模型的预训练目标是"从文本创造图像"，学到的是语义→像素的生成映射；而 I2I 编辑模型的预训练目标是"理解输入图像并保持结构一致地修改"，天然学到了像素→像素的结构化理解能力。后者与密集感知任务（像素→像素映射）更为匹配。消融实验显示 I2I 模型在 AbsRel 上比同架构 T2I 模型提升 25-27%。

2. **像素空间一致性损失（Pixel-Space Consistency Loss）**：流匹配损失 $\mathcal{L}_{FM}$ 仅在潜空间监督，经 VAE 解码后可能放大误差。本文引入像素空间一致性损失 $\mathcal{L}_{Cons}$，针对三个任务分别设计：深度用 scale-shift invariant L1，法线用 atan2 角度误差（避免 arccos 梯度爆炸），抠图用前景/未知区域分离 L1。通过课程学习策略自适应加权。

3. **平方根深度映射的理论推导**：深度图呈长尾分布，BF16 精度下直接线性归一化会导致近场量化误差大。通过最小化相对量化误差积分并应用 Cauchy-Schwarz 不等式，理论证明最优映射函数为 $g(y) = \sqrt{y}$，配合百分位归一化（p2/p98）映射到 [-1,1]。

4. **单步推理高效架构**：基于 FLUX.1 Kontext（DiT + Rectified Flow），仅微调 DiT 参数，冻结其余部分。训练和推理共享固定随机种子，使用单步 Euler 积分即可完成推理：$\hat{z}_1 = z_0 + v_\theta(\text{concat}(z_0, c_x, c_p), t=0)$。

5. **全面SOTA结果**：仅用 74K 训练数据，在深度估计（5个基准，AvgRank 1.5）、法线估计（4个基准，AvgRank 1.4）、交互式抠图（3个基准，AvgRank 1.2）上全面超越现有方法，甚至超过使用 62.6M 数据的 DepthAnything V2。

## 深入细节

### 1. 整体架构

```
┌─────────────────────────────────────────────────────┐
│                  Edit2Perceive 框架                    │
│                                                       │
│  输入: RGB图像 x ∈ R^{H×W×3} + 文本提示 p            │
│  输出: 密集感知图 ŷ ∈ R^{H×W×3}                      │
│                                                       │
│  ┌──────┐    ┌──────┐    ┌──────────────┐            │
│  │ VAE  │───→│concat│───→│  DiT (FLUX.1 │───→ v_θ   │
│  │Encode│    │z_t,  │    │  Kontext)    │            │
│  │ x→c_x│    │c_x,  │    │  仅微调DiT   │            │
│  │ y→z_1│    │c_p   │    └──────────────┘            │
│  └──────┘    └──────┘                                 │
│                                                       │
│  训练: L = L_FM + λ·L_Cons                           │
│  推理: ẑ₁ = z₀ + v_θ(concat(z₀,c_x,c_p), t=0)     │
│        ŷ = VAE_Decode(ẑ₁)  [单步推理]                │
└─────────────────────────────────────────────────────┘
```

**核心设计选择**：选择 I2I 编辑模型而非 T2I 生成模型。FLUX.1 Kontext 通过序列拼接机制统一处理文本和图像输入，使用共享+任务特定的 Transformer 块提取特征，天然具备保持输入图像结构一致性的能力。

### 2. 训练流程伪代码

```python
# Edit2Perceive 训练伪代码
def train_step(x, y, p, step, total_steps_per_epoch):
    """
    x: 输入RGB图像, y: 目标密集感知图(depth/normal/alpha)
    p: 文本提示 (如 "estimate depth map")
    """
    # 1. 数据预处理 (任务特定)
    y_norm = task_preprocess(y)  # sqrt映射+归一化(depth) / 单位化(normal) / 二值化(matting)
    
    # 2. VAE编码
    c_x = vae_encode(x)          # 条件图像潜码
    z_1 = vae_encode(y_norm)     # 目标潜码
    c_p = text_encode(p)         # 文本嵌入
    
    # 3. Rectified Flow 前向过程
    z_0 = torch.randn_like(z_1)  # 固定种子的高斯噪声
    t = torch.rand(1)            # 随机时间步 t ∈ [0,1]
    z_t = (1 - t) * z_0 + t * z_1  # 直线插值
    v_true = z_1 - z_0           # 真实速度
    
    # 4. 模型预测速度
    v_pred = dit_model(concat(z_t, c_x, c_p), t)
    
    # 5. 流匹配损失
    L_FM = mse_loss(v_pred, v_true)
    
    # 6. 像素空间一致性损失 (需要单步推理得到预测)
    z1_pred = z_0 + v_pred       # 单步Euler积分
    y_pred = vae_decode(z1_pred) # 解码到像素空间
    L_Cons = task_consistency_loss(y_pred, y)  # 任务特定损失
    
    # 7. 自适应加权 (课程学习)
    ratio = max(0, step / total_steps_per_epoch - 1)  # 第一个epoch为0
    lambda_w = (L_FM.detach().abs() / (L_Cons.detach().abs() + 1e-3)) * ratio
    
    # 8. 总损失
    loss = L_FM + lambda_w * L_Cons
    loss.backward()
```

### 3. 三个任务的一致性损失设计

| 任务 | 损失函数 | 设计动机 |
|------|---------|---------|
| **深度估计** | Scale-Shift Invariant L1: 先最小二乘对齐 $\hat{y}_{align}=s\hat{y}+t$，再计算 $\|\hat{y}_{align}-y\|_1$ | 深度预测的绝对尺度不确定，需要先对齐再比较 |
| **法线估计** | atan2 角度误差: $\text{atan2}(\|y \times \hat{y}\|, y \cdot \hat{y})$ | 等价于 arccos 但梯度稳定，避免共线时梯度爆炸 |
| **交互式抠图** | 区域分离 L1: 未知区域 $\mathcal{U}$ 和已知区域 $\mathcal{K}$ 分别计算 L1 并求和 | 关注边缘过渡区域的精细细节 |

### 4. 平方根深度映射推导

**问题**：深度图在 BF16 精度下直接线性归一化，近场（小深度值）区域量化误差大。

**形式化**：寻找最优非线性映射 $g(y)$ 最小化相对量化误差积分：

$$\min_g \frac{1}{512(y_{max}-y_{min})} \int_{y_{min}}^{y_{max}} \frac{g(y)_{max}-g(y)_{min}}{y \cdot g'(y)} dy$$

**推导**：应用 Cauchy-Schwarz 不等式，证明当 $g'(y) \propto 1/\sqrt{y}$ 时积分最小，得到：

$$g(y) = \sqrt{y}$$

**后处理**：对 $\sqrt{y}$ 应用百分位归一化（p2/p98）映射到 [-1,1]，再复制为3通道。

**直觉理解**：平方根映射"拉伸"了近场深度值的表示范围，"压缩"了远场的范围，使得 BF16 的有限精度在各深度段的相对误差更均匀。消融实验显示该映射在大深度范围的室外数据集（KITTI）上改进尤为显著。

### 5. 自适应损失加权策略

$$\lambda = \frac{\text{sg}(|\mathcal{L}_{FM}|)}{\text{sg}(|\mathcal{L}_{Cons}|) + \epsilon} \cdot \max\left(0, \frac{\text{step}}{N_{step}} - 1\right)$$

- **第一个 epoch**：$\lambda = 0$，纯流匹配训练，让模型先学习扩散先验
- **后续 epoch**：$\lambda$ 线性增长，逐渐引入像素级约束
- **自适应比例**：$|\mathcal{L}_{FM}|/|\mathcal{L}_{Cons}|$ 自动平衡两个损失的量级

### 6. 关键消融实验结果

**I2I vs T2I 基础模型对比**（相同架构 FLUX.1 Kontext vs FLUX.1）：

| 设置 | NYU AbsRel↓ | KITTI AbsRel↓ |
|------|------------|---------------|
| T2I (基础) | ~6.0 | ~10.9 |
| I2I (基础) | ~4.5 | ~7.9 |
| **相对提升** | **~25%** | **~27%** |

**各组件贡献**：
- 一致性损失：在 T2I 上提升大（AbsRel 降 1.0-1.4），在 I2I 上提升较小（降 0.3-0.4），说明 I2I 已有较好结构理解
- Sqrt 映射：在室外大范围数据集（KITTI）上提升最显著（AbsRel 降 1.4-3.0）

### 7. 训练细节

| 参数 | 值 |
|------|-----|
| 基础模型 | FLUX.1 Kontext (DiT架构) |
| 微调范围 | 仅 DiT 参数，其余冻结 |
| 优化器 | AdamW (depth/normal), AdamW8bit (matting) |
| 学习率 | 3×10⁻⁵ |
| Batch size | 16 |
| 收敛步数 | ~6000 步 |
| 训练时间 | ~1.5 天 / 单张 H200 GPU |
| 推理步数 | 1 步 (单步 Euler) |
| 训练数据量 | 59K-77K (远少于竞品的数百万) |

### 8. 与相关工作的关键区别

| 方法 | 基础模型 | 推理步数 | 像素损失 | 深度映射 |
|------|---------|---------|---------|---------|
| Marigold | SD (T2I) | 多步 DDIM | ✗ | 线性 |
| Lotus | SD (T2I) | 1步 | ✗ | 线性 |
| E2E-FT | SD (T2I) | 1步 | ✗ | 线性 |
| FE2E (concurrent) | 编辑模型 | 1步 | ✗ | 对数 |
| **Edit2Perceive** | **FLUX Kontext (I2I)** | **1步** | **✓** | **√y (理论最优)** |

## 练习题

1. **概念理解**：为什么作者认为 I2I 编辑模型比 T2I 生成模型更适合密集感知任务？请从预训练目标的角度解释"表征失配"（Representation Mismatch）论点。

2. **数学推导**：在平方根深度映射的推导中，为什么 Cauchy-Schwarz 不等式能给出 $g'(y) \propto 1/\sqrt{y}$ 的结论？请尝试写出关键推导步骤。

3. **工程设计**：一致性损失中法线估计使用 atan2 而非 arccos 计算角度误差。请解释 arccos 在什么情况下会出现梯度爆炸，以及 atan2 如何避免这个问题。

4. **消融分析**：消融实验显示一致性损失在 T2I 模型上的提升（AbsRel 降 1.0-1.4）远大于在 I2I 模型上的提升（降 0.3-0.4）。如何解释这种"互补关系"？这对选择基础模型有什么启示？

5. **拓展思考**：本文的方法框架是否可以扩展到其他密集预测任务（如语义分割、光流估计）？如果可以，需要设计怎样的一致性损失和数据表示？如果不可以，瓶颈在哪里？