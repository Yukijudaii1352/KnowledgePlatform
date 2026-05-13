### Stable Diffusion 3 (SD3) 论文精读

```yaml
标题: "Scaling Rectified Flow Transformers for High-Resolution Image Synthesis"
作者: Patrick Esser, Sumith Kulal, Andreas Blattmann, et al. (Stability AI)
机构: Stability AI
发表: ICML 2024
链接: https://arxiv.org/abs/2403.03206
代码: https://github.com/Stability-AI/sd3-ref
关键词: [Rectified Flow, MMDiT, Text-to-Image, Diffusion Transformer, Scaling Laws]
```

## 📝 一句话总结

SD3提出了**MMDiT**（多模态DiT）架构和改进的**Rectified Flow**训练方法（logit-normal噪声采样），通过大规模scaling实验证明了其在文本到图像生成中的SOTA性能，8B参数模型在人类偏好评估中超越DALL·E 3和Midjourney v6。

---

## 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | 现有扩散模型的前向路径弯曲导致采样效率低；文本-图像交互不充分导致文本理解能力差 |
| **核心创新** | (1) MMDiT：双模态独立权重+联合注意力架构 (2) 改进的RF训练：logit-normal时步采样 (3) 系统性scaling研究 |
| **关键结果** | 8B MMDiT模型在GenEval、T2I-CompBench和人类偏好评估中均达到SOTA |
| **技术路线** | Rectified Flow + Transformer (非UNet) + 潜空间 (VAE) + 三文本编码器 (CLIP×2 + T5-XXL) |

---

## 🔬 深入细节

### 1. Rectified Flow (RF) 改进的训练公式

**背景**：传统扩散模型（如DDPM）的前向路径是弯曲的，需要大量采样步数。Rectified Flow通过直线连接数据和噪声，理论上单步即可采样。

**前向过程**（直线插值）：

$$z_t = (1-t) \cdot x_0 + t \cdot \epsilon, \quad t \in [0, 1]$$

其中 $x_0$ 为数据样本，$\epsilon \sim \mathcal{N}(0, I)$ 为噪声。与DDPM不同，RF的前向路径是**线性**的。

**训练目标**（速度场预测）：

$$\mathcal{L}_{RF} = \mathbb{E}_{t, x_0, \epsilon} \left[ \| v_\Theta(z_t, t) - (x_0 - \epsilon) \|_2^2 \right]$$

网络学习预测从噪声到数据的**速度向量** $v = x_0 - \epsilon$（即直线方向）。

**采样**（ODE求解）：

$$z_{t-\Delta t} = z_t - \Delta t \cdot v_\Theta(z_t, t)$$

直线路径使得Euler方法的离散化误差更小，少步采样质量更高。

![RF vs Diffusion采样效率](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/x1.png)
*Figure 3: Rectified Flow在少步采样时显著优于传统扩散模型*

---

### 2. Logit-Normal 时步采样

**动机**：RF的均匀时步采样对所有噪声尺度一视同仁，但中间时步（信噪比适中）对感知质量影响最大。

**核心公式**：将均匀采样 $t \sim \mathcal{U}(0,1)$ 替换为logit-normal分布：

$$\pi_{\text{ln}}(t; m, s) = \frac{1}{s\sqrt{2\pi}} \cdot \frac{1}{t(1-t)} \cdot \exp\left(-\frac{(\text{logit}(t) - m)^2}{2s^2}\right)$$

其中 $\text{logit}(t) = \log \frac{t}{1-t}$。

**参数含义**：
- **$m$（位置参数）**：控制偏向数据端（$m<0$）还是噪声端（$m>0$），$m=0$ 时对称聚焦于 $t=0.5$
- **$s$（尺度参数）**：控制分布的集中程度，$s$ 越小越集中于中间时步

**等价权重视角**：改变采样分布等价于对损失函数加权：

$$w_t^{\pi} = \frac{t}{1-t} \cdot \pi(t)$$

**实现伪代码**：

```python
def sample_logit_normal(batch_size, m=0.0, s=1.0):
    """Logit-normal时步采样"""
    # 在logit空间采样正态分布
    u = torch.randn(batch_size) * s + m
    # 通过sigmoid映射到[0,1]
    t = torch.sigmoid(u)
    return t

# 训练循环
for x_0 in dataloader:
    eps = torch.randn_like(x_0)
    t = sample_logit_normal(x_0.shape[0], m=0.0, s=1.0)  # 替代 torch.rand()
    z_t = (1 - t) * x_0 + t * eps
    v_pred = model(z_t, t)
    loss = F.mse_loss(v_pred, x_0 - eps)
    loss.backward()
```

---

### 3. MMDiT 架构

**核心设计**：与DiT使用交叉注意力处理条件不同，MMDiT为文本和图像各自维护**独立的权重流**，仅在注意力操作中进行**联合计算**。

**架构细节**：

```
输入处理:
  图像: VAE编码 → 2×2 patch化 → 线性投影 → 图像token序列 (h_img)
  文本: CLIP-L + CLIP-G + T5-XXL → 拼接 → 线性投影 → 文本token序列 (h_txt)
  时步: t → MLP → 自适应调制参数 (shift, scale, gate)

MMDiT Block (×N):
  ┌─────────────────────────────────────────────┐
  │  h_img → LayerNorm → AdaLN_img → Q_img, K_img, V_img  │
  │  h_txt → LayerNorm → AdaLN_txt → Q_txt, K_txt, V_txt  │
  │                                                          │
  │  联合注意力: Attention([Q_img; Q_txt], [K_img; K_txt], [V_img; V_txt])  │
  │  → 拆分回 attn_img, attn_txt                            │
  │                                                          │
  │  h_img = h_img + gate_img * attn_img                    │
  │  h_txt = h_txt + gate_txt * attn_txt                    │
  │                                                          │
  │  h_img = h_img + gate_img2 * MLP_img(AdaLN_img(h_img)) │
  │  h_txt = h_txt + gate_txt2 * MLP_txt(AdaLN_txt(h_txt)) │
  └─────────────────────────────────────────────┘

输出: h_img → AdaLN → 线性投影 → unpatch → VAE解码
```

**关键设计决策**：

| 设计选择 | 方案 | 原因 |
|---------|------|------|
| 文本-图像交互 | 联合注意力（非交叉注意力） | 双向信息流，文本理解更强 |
| 模态权重 | 独立权重（非共享） | 各模态有不同的表示需求 |
| QK归一化 | RMSNorm on Q, K | 防止注意力logit爆炸，训练更稳定 |
| 文本编码器 | CLIP-L + CLIP-G + T5-XXL | T5对复杂提示词理解至关重要 |
| 位置编码 | 2D频率编码（可插值） | 支持可变分辨率 |

![架构对比](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/archs_squeezed/val_loss_level_avg.jpg)
*Figure 4: MMDiT vs DiT vs UViT训练动态对比，MMDiT收敛更快、验证损失更低*

![QK归一化效果](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/qk_norm/02_max_attn_logit_qk.png)
*Figure 5: QK归一化有效防止注意力logit发散*

---

### 4. 高分辨率时步偏移 (Timestep Shifting)

**问题**：在高分辨率下，相同的噪声水平 $t$ 对应的信噪比不同（高分辨率图像在同等 $t$ 下"更干净"）。

**解决方案**：对时步进行分辨率自适应偏移：

$$t' = \frac{t \cdot s}{1 + (s-1) \cdot t}, \quad s = \frac{\text{resolution}^2}{\text{base\_resolution}^2}$$

将更多训练权重分配给高噪声区域，补偿高分辨率下信噪比的偏移。

![时步偏移效果](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/timeshift_v1.png)
*Figure 6: 高分辨率下时步偏移显著提升生成质量*

---

### 5. Scaling 实验

**模型规模**：从15个MMDiT block（~450M参数）扩展到38个block（~8B参数），深度 $d \in \{15, 18, 21, 24, 30, 38\}$。

**关键发现**：

1. **可预测的Scaling趋势**：验证损失随模型大小和计算量呈现平滑的幂律下降
2. **损失-质量强相关**：更低的验证损失与更好的FID、CLIP分数、GenEval分数和人类偏好评分高度相关
3. **T5的重要性**：T5-XXL对复杂提示词（空间关系、计数、属性绑定）至关重要，但对简单提示词影响较小

![Scaling曲线](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/scale_val_squeeze/00_coco_val_loss_train-step.png)
*Figure 8: 验证损失随模型规模增大而平滑下降*

![T5影响](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/embedder_drop/burger_all_3.jpg)
*Figure 9: 使用T5（左）vs 不使用T5（右）的生成对比*

---

### 6. 整体Pipeline

```
                    ┌──────────────┐
  文本提示 ────────→│ CLIP-L/G     │──→ pooled embedding (条件向量)
                    │ T5-XXL       │──→ token序列
                    └──────────────┘
                           ↓
  噪声 z_T ──→ ┌──────────────────────┐ ──→ z_0 ──→ VAE Decoder ──→ 图像
               │   MMDiT (×N blocks)   │
               │  联合注意力 + AdaLN    │
               │  RF采样 (Euler/高阶)   │
               └──────────────────────┘
                           ↑
                    时步 t (logit-normal采样训练)
```

**VAE**：使用改进的16通道VAE（vs SD1.x/SDXL的4通道），重建质量更高。

---

### 7. 实验结果

**与SOTA对比**（人类偏好评估）：

![人类偏好评估](https://ar5iv.labs.arxiv.org/html/2403.03206/assets/img/baseline_comp.jpg)
*Figure 7: SD3 8B模型在人类偏好评估中超越DALL·E 3和Midjourney v6*

**GenEval基准**（组合生成能力）：SD3在属性绑定、空间关系、计数等维度全面领先。

**T2I-CompBench**：在颜色绑定、形状绑定、纹理绑定等细粒度评估中达到最优。

---

## 🧪 练习题

### 概念理解

1. **Rectified Flow vs DDPM**：请解释RF的前向过程 $z_t = (1-t)x_0 + t\epsilon$ 与DDPM的 $z_t = \sqrt{\bar{\alpha}_t}x_0 + \sqrt{1-\bar{\alpha}_t}\epsilon$ 在几何上有什么本质区别？这对采样效率有什么影响？

2. **联合注意力 vs 交叉注意力**：MMDiT使用联合注意力而非交叉注意力来融合文本和图像信息。请分析：(a) 两者在信息流方向上的区别；(b) 联合注意力的计算复杂度如何随序列长度变化？

3. **Logit-Normal采样**：为什么中间时步（$t \approx 0.5$）对生成质量更重要？如果将 $m$ 设为较大的正值，训练会偏向什么方向？

### 代码实践

4. **实现MMDiT Block**：请用PyTorch实现一个简化版的MMDiT block，包含双模态独立权重的AdaLN、联合注意力和独立MLP。

5. **RF采样器**：实现一个基于Euler方法的RF采样器，支持logit-normal时步调度和分辨率自适应偏移。

### 深度思考

6. **Scaling Law**：论文发现验证损失与生成质量强相关。你认为这个相关性在什么情况下可能失效？（提示：考虑过拟合、分布偏移等）

7. **架构演进**：从UNet（SD1.x）→ DiT → MMDiT的演进中，每一步解决了什么问题？MMDiT还有哪些潜在的改进方向？