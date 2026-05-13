### CLIPort: What and Where Pathways for Robotic Manipulation

```yaml
id: cliport
name: CLIPort
full_name: "CLIPort: What and Where Pathways for Robotic Manipulation"
year: 2022
venue: CoRL 2021
org: University of Washington & Google Research
paper_url: https://proceedings.mlr.press/v164/shridhar22a.html
arxiv_id: "2109.12098"
category: spatial_3d
parent: ""
motivation: 融合CLIP的开放词汇语义理解与Transporter Network的空间几何精度，实现语言条件化的桌面操作
```

---

### 一句话总结

CLIPort 提出了一种**双流架构**（语义流 + 空间流），通过将预训练 CLIP 视觉-语言模型与 Transporter Network 的像素级空间精度相结合，实现了以自然语言指令为条件的桌面 pick-and-place 操作，在仿真 10 个任务和真机 9 个任务上展示了强大的样本效率和泛化能力。

---

### 核心要点

1. **双流设计（What + Where）**：语义流（Semantic Stream）使用冻结的 CLIP ResNet-50 编码器提取语言对齐的视觉特征，空间流（Spatial Stream）使用从零训练的 ResNet 编码器-解码器处理 RGB-D 输入以保留像素级空间精度；两路通过 **lateral connections** 融合。

2. **语言条件化机制**：CLIP 文本编码器将自然语言指令编码为 1024 维向量，经 tile 扩展后与语义流的视觉特征做 **逐元素乘法（Hadamard product）**，实现语言对视觉注意力的调制。

3. **Transporter 动作表示**：将 pick-and-place 分解为两个独立的全卷积网络——**pick 网络**输出像素级抓取热力图，**place 网络**通过 query-key 互相关（cross-correlation）+ 离散旋转搜索输出放置位姿 $(u, v, \theta)$。

4. **预训练迁移 + 样本效率**：冻结 CLIP 视觉编码器权重，仅训练解码器和空间流，使得模型在 **1-100 个演示** 范围内即可达到高性能，远超纯从零训练的 Transporter 基线。

5. **多任务泛化**：单一多任务模型（multi-task CLIPort）在 57% 的任务上 **超越** 对应的单任务专家模型，证明跨任务知识共享的有效性。

6. **真机验证**：在真实 UR5e 机器人上仅用 **179 个演示**（9 个任务）训练单一模型，无需 sim-to-real 迁移即可执行多种语言条件化操作任务。

---

### 深入细节

#### 1. 整体架构

![CLIPort Architecture](https://ar5iv.labs.arxiv.org/html/2109.12098/assets/x2.png)

CLIPort 的核心思想来源于神经科学中的 **"What" 和 "Where" 通路**：
- **"What" 通路（语义流）**：负责理解 *操作什么物体*——利用 CLIP 的语义理解识别目标对象
- **"Where" 通路（空间流）**：负责确定 *在哪里操作*——利用 RGB-D 输入的空间信息精确定位像素坐标

两条通路通过 **lateral connections**（拼接 + 1×1 卷积）在解码器的多个尺度上融合，最终输出像素级的动作预测。

#### 2. 背景：Transporter Network

Transporter Network 将桌面操作建模为两步 pick-and-place：

**Pick 动作**：对观测图像 $o_t$ 生成像素级 Q 值图，取 argmax 作为抓取点：

$$Q_{\text{pick}}(o_t) = f_{\text{pick}}(\gamma_t)$$

$$a_{\text{pick}} = \arg\max_{(u,v)} Q_{\text{pick}}$$

其中 $\gamma_t$ 是正交投影的 RGB-D 图像。

**Place 动作**：以 pick 点为中心裁剪 query patch，与全图 key 特征做互相关，搜索 $k$ 个离散旋转：

$$Q_{\text{place}}(o_t | a_{\text{pick}}) = \left[ \Phi_{\text{query}}(\gamma_t[T_{\text{pick}}]) * \Phi_{\text{key}}(\gamma_t) \right]_{\Delta\tau}$$

$$a_{\text{place}} = \arg\max_{(u,v,\theta)} Q_{\text{place}}$$

其中 $*$ 表示互相关操作，$\Delta\tau$ 遍历 $k=36$ 个离散旋转（每 10° 一个），$T_{\text{pick}}$ 是以 pick 点为中心的裁剪变换。

#### 3. 双流融合架构详解

```
┌─────────────────────────────────────────────────────────┐
│                    CLIPort Two-Stream                     │
│                                                           │
│  输入: RGB-D 图像 γ_t (6通道: RGB + D×3)                  │
│  语言: 自然语言指令 l                                      │
│                                                           │
│  ┌──────────────────┐    ┌──────────────────┐            │
│  │  Spatial Stream   │    │  Semantic Stream  │            │
│  │  (从零训练)       │    │  (CLIP 冻结编码器) │            │
│  │                   │    │                   │            │
│  │  ResNet43-FPN     │    │  CLIP-RN50 编码器  │            │
│  │  编码器(RGB-D)    │    │  (仅RGB, 冻结)    │            │
│  │       ↓           │    │       ↓           │            │
│  │  ResNet43-FPN     │    │  可学习解码器      │            │
│  │  解码器           │←───│  (上采样恢复分辨率) │            │
│  │       ↓           │    │       ↓           │            │
│  │  spatial feat     │    │  ⊙ CLIP文本特征   │            │
│  └──────┬───────────┘    └──────┬───────────┘            │
│         │      lateral connections       │                │
│         │  (concat + 1×1 conv, 多尺度)   │                │
│         └──────────┬─────────────────────┘                │
│                    ↓                                      │
│            融合特征 → 像素级动作预测                        │
└─────────────────────────────────────────────────────────┘
```

**语义流细节**：
- **编码器**：CLIP ResNet-50 的视觉编码器，权重完全冻结，仅接受 RGB 输入
- **解码器**：可学习的上采样解码器，将 CLIP 特征恢复到输入分辨率
- **语言条件化**：CLIP 文本编码器输出 $e_l \in \mathbb{R}^{1024}$，经 tile 扩展到空间维度后与视觉特征做 Hadamard 乘积：$f_{\text{sem}} = f_{\text{vis}} \odot \text{tile}(e_l)$

**空间流细节**：
- **编码器-解码器**：ResNet-43 + FPN 结构，从零训练
- **输入**：6 通道（RGB + depth 复制 3 次）
- **作用**：提供精确的像素级空间定位，弥补 CLIP 在空间精度上的不足

**Lateral Connections**：
- 从空间流向语义流的解码器注入特征
- 操作：$f_{\text{fused}} = \text{Conv}_{1\times1}(\text{concat}(f_{\text{spatial}}, f_{\text{semantic}}))$
- 在解码器的多个分辨率层级上进行

#### 4. 伪代码

```python
# CLIPort 推理伪代码
def cliport_inference(rgb_d_image, language_instruction):
    """
    输入:
        rgb_d_image: (H, W, 6) 正交投影RGB-D图像 (RGB + depth×3)
        language_instruction: str, 自然语言指令
    输出:
        pick_pose: (u, v) 像素坐标
        place_pose: (u, v, θ) 像素坐标 + 旋转角
    """
    # ===== 语言编码 =====
    text_emb = clip_text_encoder(language_instruction)  # (1024,)
    text_tiled = tile(text_emb, spatial_dims=(H, W))     # (H, W, 1024)
    
    # ===== Pick Network (双流) =====
    # 空间流
    spatial_enc = spatial_encoder(rgb_d_image)            # 从零训练的ResNet
    spatial_feat = spatial_decoder(spatial_enc)            # 像素级特征
    
    # 语义流
    clip_feat = frozen_clip_visual(rgb_d_image[:,:,:3])   # 冻结CLIP编码器(仅RGB)
    sem_feat = learnable_decoder(clip_feat)               # 可学习解码器
    sem_feat = sem_feat * text_tiled                       # Hadamard乘积语言条件化
    
    # Lateral fusion
    fused = conv1x1(concat(spatial_feat, sem_feat))       # 多尺度融合
    
    # Pick预测
    Q_pick = pick_head(fused)                             # (H, W) 热力图
    pick_uv = argmax(Q_pick)                              # 抓取像素坐标
    
    # ===== Place Network (双流, 类似结构) =====
    query_patch = crop(fused_query, center=pick_uv, size=64)  # pick点裁剪
    key_map = place_key_network(rgb_d_image, text_emb)         # 全图key特征
    
    # 旋转搜索 + 互相关
    Q_place = zeros(H, W, k)                              # k=36个旋转
    for i, theta in enumerate(linspace(0, 360, k)):
        rotated_query = rotate(query_patch, theta)
        Q_place[:,:,i] = cross_correlate(rotated_query, key_map)
    
    place_uv = argmax_spatial(Q_place)
    place_theta = argmax_rotation(Q_place)
    
    return pick_uv, (place_uv, place_theta)

# ===== 训练 =====
def train_step(demo):
    """每个演示提供 (observation, pick_pixel, place_pixel, place_rotation)"""
    # Pick loss: 像素级交叉熵
    Q_pick = pick_network(demo.obs, demo.language)
    loss_pick = cross_entropy(Q_pick, one_hot(demo.pick_pixel))
    
    # Place loss: 像素+旋转交叉熵
    Q_place = place_network(demo.obs, demo.pick_pixel, demo.language)
    loss_place = cross_entropy(Q_place, one_hot(demo.place_pixel, demo.place_rotation))
    
    loss = loss_pick + loss_place
    loss.backward()  # 仅更新解码器和空间流，CLIP编码器冻结
```

#### 5. 关键公式汇总

| 公式 | 含义 |
|------|------|
| $Q_{\text{pick}} = f_{\text{pick}}(\gamma_t)[(u,v)]$ | Pick Q值：对每个像素预测抓取价值 |
| $Q_{\text{place}} = [\Phi_q(\gamma_t[T_p]) * \Phi_k(\gamma_t)]_{\Delta\tau}$ | Place Q值：query-key互相关 + 旋转搜索 |
| $f_{\text{sem}} = f_{\text{vis}} \odot \text{tile}(e_l)$ | 语言条件化：Hadamard乘积调制 |
| $f_{\text{fused}} = \text{Conv}_{1\times1}(\text{cat}(f_{\text{spa}}, f_{\text{sem}}))$ | Lateral融合：拼接+1×1卷积 |
| $\mathcal{L} = \text{CE}(Q, \text{one\_hot}(\text{pixel}_{\text{gt}}))$ | 训练损失：像素级交叉熵 |

#### 6. 实验结果

**仿真环境**：基于 Ravens（PyBullet），10 个桌面操作任务，正交投影 RGB-D 输入（320×160）。

**单任务性能**（1000 demos）：

| 任务 | Transporter | CLIPort | 提升 |
|------|------------|---------|------|
| align-box-corner | 75.0% | **90.0%** | +15% |
| assembling-kits-seq | 36.8% | **40.4%** | +3.6% |
| packing-boxes-pairs | 64.0% | **80.0%** | +16% |
| put-block-in-bowl | 44.0% | **94.0%** | +50% |
| stack-block-pyramid-seq | 18.0% | **28.0%** | +10% |
| separating-piles | 52.0% | **76.0%** | +24% |

**多任务 vs 单任务**：多任务 CLIPort 在 **57% 的任务**上超越对应的单任务专家模型，展示了跨任务知识共享的优势。

**样本效率**：
- 在 1-10 个演示范围内，CLIPort 显著优于无预训练的 Transporter
- CLIP 预训练提供的语义先验是样本效率提升的关键

**消融实验**：

| 变体 | 说明 | 效果 |
|------|------|------|
| 仅空间流 | 无CLIP语义 | 退化为原始Transporter |
| 仅语义流 | 无空间精度 | 语义理解好但定位差 |
| 双流无lateral | 无特征融合 | 性能下降 |
| 微调CLIP | 解冻编码器 | 小数据集上过拟合，性能下降 |
| **完整CLIPort** | 冻结CLIP+lateral | **最优** |

**关键发现**：冻结 CLIP 编码器比微调更好——在有限演示数据下，微调会破坏预训练表示。

#### 7. 真机实验

![Real Robot Results](https://ar5iv.labs.arxiv.org/html/2109.12098/assets/x6.png)

- **硬件**：UR5e 机械臂 + 吸盘末端执行器
- **数据**：9 个任务，共 **179 个人类遥操作演示**
- **训练**：单一多任务模型，无 sim-to-real 迁移
- **输入**：3 个 RealSense 相机重建的正交投影 RGB-D 图像
- **结果**：模型能成功执行语言条件化的多种操作（如 "put the red block in the green bowl"），展示了对未见颜色组合和物体配置的泛化能力

#### 8. 局限性

1. **动作空间受限**：仅支持平面 pick-and-place（吸盘），不支持 6-DoF 抓取或灵巧操作
2. **单步推理**：每步独立决策，缺乏长期规划能力
3. **视角固定**：依赖正交投影俯视图，不适用于非结构化场景
4. **语言理解有限**：依赖 CLIP 的语言能力，对复杂/组合指令的理解受限
5. **无闭环反馈**：开环执行，不根据执行结果调整后续动作

---

### 练习题

1. **概念理解**：CLIPort 为什么选择冻结 CLIP 编码器而非微调？在什么条件下微调可能更优？

2. **架构分析**：如果去掉空间流，仅使用语义流（CLIP），模型在哪些任务上会退化最严重？为什么？

3. **公式推导**：Place 网络的互相关操作 $\Phi_q * \Phi_k$ 等价于什么几何操作？为什么需要离散旋转搜索而不能直接回归旋转角？

4. **扩展思考**：如何将 CLIPort 的双流思想扩展到 6-DoF 操作场景？需要解决哪些核心挑战？

5. **实验设计**：论文发现多任务模型在 57% 的任务上超越单任务专家。请设计一个实验来分析：哪些任务特征决定了多任务训练是否有益？