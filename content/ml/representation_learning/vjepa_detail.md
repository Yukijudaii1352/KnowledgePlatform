### V-JEPA

```yaml
id: vjepa
name: V-JEPA
full_name: 视频联合嵌入预测架构 (Video Joint-Embedding Predictive Architecture)
year: '2024'
org: Meta AI
paper_url: https://arxiv.org/abs/2402.09379
category: self_supervised
parent: mae
motivation: 潜空间预测视频世界模型
```

#### 📝 一句话总结

V-JEPA 提出在潜在特征空间（而非像素空间）中进行视频掩码预测的自监督学习方法，通过预测被遮蔽视频区域的抽象表征来学习通用视觉特征，无需像素级重建、负样本、文本监督或预训练图像编码器。

#### 🎯 核心要点

- **联合嵌入预测架构**：在特征空间而非像素空间进行预测，避免建模不必要的像素级细节
- **多块时空掩码策略**：对视频同时遮蔽多个时空区域（短时间范围 + 大空间范围），迫使模型学习高层语义
- **三组件架构**：Context Encoder（编码可见 patches）、Target Encoder（EMA 更新，生成预测目标）、Predictor（预测被遮蔽区域的表征）
- **无像素解码器**：完全抛弃像素重建目标，仅在表征空间计算 L2 预测损失
- **VideoMix2M 数据集**：在约 200 万视频片段上进行纯视频预训练
- **冻结骨干评估**：使用 attentive probe 在冻结特征上评估，验证表征的通用性
- **视频与图像双任务表现优异**：在 Kinetics-400、Something-Something-v2 等视频任务及 ImageNet 图像任务上均取得强竞争力

#### 🔬 深入细节

![V-JEPA 架构示意图](https://github.com/facebookresearch/jepa/assets/7530871/72df7ef0-2ef5-48bb-be46-27963db91f3d)
*图：V-JEPA 预训练框架。左侧为掩码策略，右侧为联合嵌入预测架构。模型在特征空间预测被遮蔽区域的表征，而非重建像素。*

![V-JEPA 掩码可视化](https://github.com/facebookresearch/jepa/assets/7530871/f26b2e96-0227-44e2-b058-37e7bf1e10db)
*图：V-JEPA 的多块掩码策略可视化。蓝色区域为可见 patches，灰色区域为被遮蔽的预测目标。*

```python
# V-JEPA 预训练伪代码
# 输入: 视频 V, Context Encoder f_θ, Target Encoder f_ξ (EMA), Predictor g_φ

for video_batch in dataloader:
    # 1. 将视频分割为时空 patches
    patches = patchify(video_batch)  # (B, T, H, W) -> (B, N, D)
    
    # 2. 多块掩码采样：选择多个时空块作为预测目标
    mask_target, mask_context = multi_block_masking(patches)
    # mask_target: 多个短时间、大空间范围的块
    # mask_context: 剩余可见区域
    
    # 3. Context Encoder 编码可见 patches
    x_context = patches[mask_context]
    h_context = f_theta(x_context)  # 编码可见区域
    
    # 4. Target Encoder (EMA, stop-grad) 编码目标 patches
    with no_grad():
        x_target = patches[mask_target]
        h_target = f_xi(x_target)  # 生成预测目标
    
    # 5. Predictor 基于可见表征预测被遮蔽区域表征
    h_pred = g_phi(h_context, mask_positions)
    
    # 6. 计算 L2 预测损失
    loss = MSE(h_pred, h_target.detach())
    
    # 7. 更新 Context Encoder 和 Predictor
    loss.backward()
    optimizer.step()
    
    # 8. EMA 更新 Target Encoder
    f_xi = momentum * f_xi + (1 - momentum) * f_theta
```

##### 动机与背景

视频自监督学习的传统方法主要分为两类：

1. **像素重建方法**（如 VideoMAE）：在像素空间重建被遮蔽的视频区域。这类方法需要建模大量低层次的像素细节（如纹理、光照变化），计算开销大且可能迫使模型浪费容量在非语义信息上。

2. **对比学习方法**（如 MoCo、DINO）：通过正负样本对比学习不变性表征。这类方法需要精心设计数据增强，且可能丢失对细粒度时空变化的敏感性。

V-JEPA 的核心洞察是：**一个好的视频世界模型应该在抽象的语义空间中进行预测，而非在像素空间**。这一思想源自 Yann LeCun 提出的联合嵌入预测架构（JEPA）框架，V-JEPA 将其扩展到视频领域。

> 💡 关键：像素空间包含大量与语义无关的信息（如精确纹理、光照），在潜空间预测可以自然地过滤这些噪声，让模型聚焦于高层语义结构。

##### 核心机制

**1. 联合嵌入预测（Joint-Embedding Prediction）**

与 MAE 类方法在像素空间重建不同，V-JEPA 的预测目标是 Target Encoder 输出的特征表征：

$$\mathcal{L} = \frac{1}{|\mathcal{M}|} \sum_{i \in \mathcal{M}} \| g_\phi(h_{\text{context}}, i) - \text{sg}(f_\xi(x_i)) \|_2^2$$

其中 \(\mathcal{M}\) 为被遮蔽的 patch 索引集合，\(g_\phi\) 为 Predictor，\(f_\xi\) 为 Target Encoder（通过 EMA 更新），\(\text{sg}\) 表示 stop-gradient。

**2. 多块时空掩码策略（Multi-Block Masking）**

V-JEPA 采用精心设计的掩码策略来控制预测任务的难度：

- **目标块**：采样多个（通常 4-8 个）时空块，每个块覆盖较短的时间范围（如 2 帧）但较大的空间范围（如图像面积的 15%-20%）
- **上下文块**：一个覆盖较长时间范围的大块（如完整视频长度的 70%-90%），但空间上与目标块互补

这种设计的直觉是：
- 短时间掩码 → 模型需要理解运动和时间动态
- 大空间掩码 → 模型需要理解全局语义结构
- 多块预测 → 增加任务多样性，防止捷径解

**3. EMA Target Encoder**

Target Encoder \(f_\xi\) 通过指数移动平均（EMA）从 Context Encoder \(f_\theta\) 更新：

$$\xi \leftarrow m \cdot \xi + (1 - m) \cdot \theta$$

其中动量系数 \(m\) 通常从 0.996 线性增加到 1.0。EMA 机制提供稳定的预测目标，防止表征坍缩（representation collapse）——即所有输入映射到相同表征的退化解。

> ⚠️ 注意：与对比学习不同，V-JEPA 不需要负样本来防止坍缩。EMA + Predictor 的组合本身就足以避免退化解，因为 Predictor 的存在使得 Encoder 不需要将所有信息压缩到不变表征中。

**4. 架构细节**

- **Encoder**：标准 Vision Transformer (ViT)，支持 ViT-L/16 和 ViT-H/16 配置
- **Patch Embedding**：将视频帧分割为 \(2 \times 16 \times 16\) 的时空 patches（时间步长 2，空间步长 16）
- **Predictor**：轻量级 Transformer（通常 12 层，宽度为 Encoder 的一半），接收可见 patch 表征和目标位置编码作为输入
- **位置编码**：使用 3D 正弦位置编码，编码时间和空间位置信息

##### 训练与推理流程

**预训练阶段：**
1. 从 VideoMix2M 数据集采样视频片段（16 帧，224×224 分辨率）
2. 应用多块时空掩码，分离上下文和目标区域
3. Context Encoder 编码可见 patches → 特征序列
4. Target Encoder（EMA，无梯度）编码目标 patches → 预测目标
5. Predictor 接收上下文特征 + 目标位置编码 → 预测目标特征
6. 计算 L2 损失，反向传播更新 Context Encoder 和 Predictor
7. EMA 更新 Target Encoder

**下游评估（Frozen Evaluation）：**
1. 冻结预训练的 Encoder 参数
2. 在 Encoder 输出上训练轻量级 attentive probe（注意力池化 + 线性分类器）
3. 在目标任务数据集上评估分类准确率

##### 与传统方法的区别

| 特性 | VideoMAE (像素重建) | 对比学习 (DINO等) | V-JEPA (特征预测) |
|------|-------------------|------------------|------------------|
| 预测空间 | 像素空间 | — | 潜在特征空间 |
| 需要解码器 | ✅ 像素解码器 | ❌ | ❌ |
| 需要负样本 | ❌ | ✅ | ❌ |
| 需要数据增强 | 掩码即增强 | 大量增强 | 掩码即增强 |
| 建模低层细节 | ✅ 必须重建纹理 | ❌ | ❌ 自动过滤 |
| 时间建模 | 隐式 | 弱 | 显式（时空掩码） |
| 表征通用性 | 需微调 | 冻结可用 | 冻结可用 |

V-JEPA 的核心优势在于：在不需要像素重建的情况下，通过特征空间预测自然地学到了既包含空间语义又包含时间动态的通用表征，且这些表征在冻结状态下即可直接用于多种下游任务。

#### 🧪 练习题

```yaml
question: "V-JEPA 相比 VideoMAE 最本质的区别是什么？"
options:
  - "使用了更大的 ViT 模型"
  - "在潜在特征空间而非像素空间进行掩码预测"
  - "使用了对比学习损失函数"
  - "需要文本监督信号辅助训练"
answer: 1
explain: "V-JEPA 的核心创新是将预测目标从像素空间转移到潜在特征空间，通过 Target Encoder 生成抽象表征作为预测目标，避免建模不必要的像素级细节。"
```