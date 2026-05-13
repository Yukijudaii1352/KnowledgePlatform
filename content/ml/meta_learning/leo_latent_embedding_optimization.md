---
title: "LEO: Latent Embedding Optimization for Meta-Learning"
authors: "Andrei A. Rusu, Dushyant Rao, Jakub Sygnowski, Oriol Vinyals, Razvan Pascanu, Simon Osindero, Raia Hadsell"
venue: "ICLR 2019"
arxiv_id: "1807.05960"
year: 2019
tags: [meta-learning, few-shot-learning, latent-space, gradient-based]
topic: meta_learning
one_sentence: "LEO通过学习模型参数的低维潜在嵌入空间，在该空间中执行梯度适应，解决了MAML在高维参数空间中少样本适应的困难。"
---

# LEO: Latent Embedding Optimization

## 一句话总结

LEO通过学习模型参数的低维潜在嵌入空间，在该空间中执行梯度适应（而非直接在高维参数空间），解决了MAML类方法在少样本场景下因参数维度过高导致适应困难的问题。

## 核心要点

1. **问题洞察**：MAML在高维参数空间中做梯度下降，但few-shot场景下数据极少，高维空间中的梯度更新容易过拟合且难以有效适应——这是一个维度灾难问题。

2. **潜在空间适应**：LEO不直接优化模型参数θ，而是学习一个低维潜在编码z（n_z ≪ dim(θ)），在z空间做梯度下降后再解码回参数空间，大幅降低了适应的有效自由度。

3. **编码-解码架构**：编码器(encoder + relation network)将few-shot样本映射为类条件高斯分布的参数，采样得到z；解码器将z映射为分类器顶层权重w。整个流程可微分。

4. **数据条件化初始化**：不同于MAML的固定初始化，LEO的编码器根据当前任务的支持集生成任务特定的初始化z₀，使得不同任务有不同的起点。

5. **正则化策略**：外循环损失包含KL散度（鼓励解耦的潜在表示）、stopgrad项（鼓励编码器输出接近适应后的编码）、L2正则和解码器权重正交约束。

## 深入理解

### 整体架构图

```
┌─────────────────────────────────────────────────────────────────┐
│                        LEO 整体流程                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  Support Set D^tr ──→ [Encoder g_φe] ──→ Hidden codes h          │
│                              │                                    │
│                              ▼                                    │
│                     [Relation Net g_φr]                           │
│                     (pairwise on all h)                           │
│                              │                                    │
│                              ▼                                    │
│                    μ_n^e, σ_n^e (per class)                      │
│                              │                                    │
│                              ▼ (reparameterization trick)        │
│                         z_n ~ N(μ,σ²)                            │
│                              │                                    │
│              ┌───────────────┼───────────────┐                   │
│              │         INNER LOOP            │                   │
│              │                               │                   │
│              │   z'_n = z_n - α∇_{z_n} L^tr │                   │
│              │         (可重复多步)           │                   │
│              └───────────────┼───────────────┘                   │
│                              │                                    │
│                              ▼                                    │
│                     [Decoder g_φd]                                │
│                     z'_n → (μ_w, σ_w)                            │
│                              │                                    │
│                              ▼                                    │
│                    w_n ~ N(μ_w, σ_w²)                            │
│                    (classifier weights)                           │
│                              │                                    │
│                              ▼                                    │
│              Evaluate on D^val → L^val                           │
│                              │                                    │
│              ┌───────────────┼───────────────┐                   │
│              │         OUTER LOOP            │                   │
│              │                               │                   │
│              │  min L^val + β·KL + R         │                   │
│              │  更新 φ_e, φ_r, φ_d           │                   │
│              └───────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

### 算法伪代码

```
Algorithm: LEO Meta-Training

Input: Task distribution p(T), learning rates α (inner), η (outer)

1. Initialize encoder φ_e, relation net φ_r, decoder φ_d

2. While not converged:
   2.1 Sample batch of tasks {T_i} ~ p(T)
   
   2.2 For each task T_i = (D^tr, D^val):
       # === ENCODING ===
       For each class n:
           h_n^k = g_φe(x_n^k)  for k=1..K        # encode each example
           μ_n^e, σ_n^e = (1/NK²) Σ g_φr(h_n^k, h_m^j)  # relation net (all pairs)
           z_n ~ N(μ_n^e, diag(σ_n^e²))            # sample latent code
       
       # === DECODING (initial) ===
       For each class n:
           μ_w_n, σ_w_n = g_φd(z_n)
           w_n ~ N(μ_w_n, diag(σ_w_n²))            # initial classifier weights
       
       # === INNER LOOP (latent space adaptation) ===
       Compute L^tr = CrossEntropy(f_θ(D^tr))      # using current w_n
       z'_n = z_n - α · ∇_{z_n} L^tr              # gradient step in z-space
       (repeat S steps)
       
       # === DECODE adapted codes ===
       w'_n = g_φd(z'_n)                           # (mean of decoded distribution)
       
       # === OPTIONAL: fine-tune in parameter space ===
       w''_n = w'_n - α₂ · ∇_{w'_n} L^tr
       
       # === EVALUATE ===
       L^val = CrossEntropy(f_{w''}(D^val))
   
   2.3 # === OUTER LOOP ===
       L_meta = Σ_i [L^val_i + β·KL(q(z|D^tr)||p(z)) 
                     + γ·||sg(z') - z||² + R]
       
       Update φ_e, φ_r, φ_d ← φ - η·∇_φ L_meta
```

### 关键设计解释

#### 为什么在潜在空间做适应？

| 对比维度 | MAML (参数空间) | LEO (潜在空间) |
|---------|----------------|---------------|
| 适应维度 | dim(θ) ~ 数万-数百万 | n_z ~ 数十-数百 |
| 每步更新的自由度 | 极高，易过拟合 | 低，受约束 |
| 初始化 | 所有任务共享一个θ₀ | 每个任务有条件化的z₀ |
| 梯度信号 | 直接来自少量样本 | 通过解码器结构约束 |

核心直觉：**低维空间中的一步梯度下降等价于高维参数空间中一个结构化的大步更新**。解码器学到了参数空间的流形结构，使得潜在空间中的小扰动对应参数空间中有意义的变化方向。

#### Relation Network的作用

Relation Network处理所有(NK)²个样本对，使得编码过程能够：
- 考虑类间关系（细粒度区分 vs 粗粒度区分需要不同的决策边界）
- 聚合类内信息（多个shot的信息融合）
- 输出的z是数据条件化的，不同任务实例产生不同初始化

#### 损失函数各项的作用

```
L_meta = L^val                          # 主目标：验证集分类损失
       + β · KL(q(z|D^tr) || p(z))     # 正则化潜在空间，鼓励解耦
       + γ · ||sg(z') - z||²           # 鼓励初始z接近适应后的z'
       + λ₁ · (||φ_e||² + ||φ_r||² + ||φ_d||²)  # L2权重衰减
       + λ₂ · ||C_d - I||             # 解码器正交约束
```

- **KL项**：类似β-VAE，鼓励潜在维度解耦，使梯度方向更独立
- **stopgrad项**：如果编码器已经能输出好的z，就不需要太多适应步骤
- **正交约束**：确保解码器各维度最大化表达能力，避免冗余

### 实验结果

#### 主要结果（5-way分类，使用WRN-28-10特征）

| 数据集 | 1-shot | 5-shot |
|--------|--------|--------|
| **miniImageNet** | **61.76 ± 0.08%** | **77.59 ± 0.12%** |
| **tieredImageNet** | **66.33 ± 0.05%** | **81.44 ± 0.09%** |

对比当时SOTA（如MAML ~49%, Prototypical Nets ~53%, Qiao et al. ~59.6%），LEO在miniImageNet 1-shot上提升约2个百分点。

#### 消融实验关键发现

| 变体 | miniImageNet 1-shot | 影响 |
|------|-------------------|------|
| LEO (完整) | 61.76% | — |
| Meta-SGD (无潜在空间) | 54.24% | -7.5% → **低维瓶颈是关键** |
| 条件生成器 (无潜在适应) | 60.33% | -1.4% → 潜在适应有效 |
| 随机先验 (无数据条件化) | 性能下降 | → 数据条件化编码重要 |
| 确定性 (无随机性) | 略降 | → 随机性在小数据集有帮助 |

### 与MAML的本质区别

```
MAML:   θ₀ ──(∇_θ L^tr)──→ θ' ──(eval on D^val)──→ 更新θ₀
         ↑ 固定初始化        ↑ 高维适应

LEO:    D^tr ──(encode)──→ z₀ ──(∇_z L^tr)──→ z' ──(decode)──→ θ' ──(eval)──→ 更新φ
         ↑ 数据条件化初始化    ↑ 低维适应         ↑ 结构化映射
```

## 练习与思考

### 概念题

1. **为什么MAML在参数空间做few-shot适应会遇到困难？** 从优化景观和过拟合两个角度分析。

2. **LEO的编码器为什么输出的是分布参数(μ,σ)而不是确定性的z？** 随机性带来了什么好处？

3. **如果去掉Relation Network，只用简单的均值池化聚合类内样本，会有什么问题？**

### 推导题

4. **写出LEO内循环一步更新后，解码得到的参数w'对原始潜在编码z的梯度表达式。** 提示：需要用到链式法则通过解码器。

5. **证明：当解码器是线性映射 w = Wz 时，潜在空间中的梯度下降等价于参数空间中沿W^T方向的投影梯度下降。**

### 实验设计题

6. **设计一个实验来验证：LEO的优势是来自"低维瓶颈"还是"数据条件化初始化"。** 提示：考虑将MAML的初始化替换为数据条件化的，但仍在高维空间适应。

7. **LEO目前只生成分类器顶层权重。如果要生成整个网络的参数，你会如何修改架构？需要考虑哪些可扩展性问题？**