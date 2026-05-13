### CLIP4Clip: An Empirical Study of CLIP for End to End Video-Text Retrieval

```yaml
标题: "CLIP4Clip: An Empirical Study of CLIP for End to End Video-Text Retrieval"
作者: Huaishao Luo, Lei Ji, Ming Zhong, Yang Chen, Wen Lei, Nan Duan, Tianrui Li
机构: Southwest Jiaotong University, Microsoft Research Asia, University of Illinois at Urbana-Champaign
会议/期刊: Neurocomputing (2022)
发表年份: 2022
论文链接: https://arxiv.org/abs/2104.08860
代码链接: https://github.com/ArrowLuo/CLIP4Clip
关键词: [CLIP, 视频文本检索, 迁移学习, 多模态, Transformer]
```

---

#### 一句话总结

CLIP4Clip将图像-文本预训练模型CLIP迁移到视频-文本检索任务，通过三种时序建模策略（均值池化/序列编码/跨模态交互）进行端到端微调，在五个基准数据集上取得SOTA性能。

---

#### 核心要点

| 维度 | 内容 |
|------|------|
| **问题** | 如何有效地将大规模图像-文本预训练模型（CLIP）迁移到视频-文本检索任务？ |
| **动机** | CLIP在图像-文本匹配上表现优异，但视频具有时序信息，直接逐帧应用忽略了帧间关系；此外视频-文本数据集规模远小于图像-文本数据集，迁移策略需要精心设计 |
| **方法** | 基于CLIP的视频/文本双编码器 + 三种相似度计算器（parameter-free均值池化、sequential LSTM/Transformer、tight跨模态Transformer），并探索在HowTo100M上后预训练 |
| **核心创新** | 1) 系统性探索CLIP到视频检索的迁移策略；2) 提出三种不同复杂度的时序融合方案；3) 证明即使简单均值池化也能取得强结果；4) 后预训练进一步提升性能 |
| **实验结果** | MSR-VTT 9K: R@1=44.5 (seqTransf), MSVD: R@1=46.2, LSMDC: R@1=22.6, ActivityNet: R@1=40.5, DiDeMo: R@1=43.4，全面超越此前SOTA |
| **局限性** | tight type在长视频数据集上效果差（ActivityNet/DiDeMo）；后预训练需大量计算资源（8×V100, 2周）；仅探索ViT-B/32，未尝试更大模型 |

---

#### 深入细节

##### 1. 整体架构

```
┌─────────────────────────────────────────────────────────┐
│                    CLIP4Clip Framework                    │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Video: v_i ──→ [Frame Sampling] ──→ {f_1,...,f_N}      │
│                        │                                 │
│                        ▼                                 │
│              ┌──────────────────┐                        │
│              │  Video Encoder   │ (CLIP ViT-B/32)        │
│              │  2D/3D Linear +  │                        │
│              │  Transformer×12  │                        │
│              └────────┬─────────┘                        │
│                       │                                  │
│                       ▼                                  │
│              Z_i = {z_1,...,z_N}  (frame embeddings)     │
│                       │                                  │
│                       ▼                                  │
│         ┌─────────────────────────────┐                  │
│         │   Similarity Calculator     │                  │
│         │  ┌─────┐ ┌─────┐ ┌─────┐   │                  │
│         │  │meanP│ │ seq │ │tight│   │                  │
│         │  └─────┘ └─────┘ └─────┘   │                  │
│         └─────────────┬───────────────┘                  │
│                       │                                  │
│  Text: t_j ──→ ┌─────────────────┐                      │
│                │  Text Encoder   │ (CLIP Text Transf.)   │
│                │  Transformer×12 │                       │
│                └────────┬────────┘                       │
│                         │                                │
│                         ▼                                │
│                    w_j (text embedding)                   │
│                         │                                │
│                         ▼                                │
│                   s(v_i, t_j) → Similarity Score         │
└─────────────────────────────────────────────────────────┘
```

##### 2. 视频编码器

视频编码器复用CLIP的ViT-B/32图像编码器，核心修改在于patch embedding层：

- **2D Linear（默认）**：直接对每帧独立做2D patch embedding（32×32 patch → 768维），与原始CLIP一致
- **3D Linear**：将patch embedding扩展为3D卷积（时间维度kernel=3, stride=1, padding=1），捕获相邻帧的时序信息

3D Linear初始化策略（来自ViViT）：
$$E_{3D} = [0, E_{2D}, 0]$$
即将CLIP预训练的2D权重放在中心帧位置，两侧补零。

##### 3. 三种相似度计算器

**核心设计哲学**：由于CLIP已在大规模数据上预训练，新引入的参数越多，越难训练且可能破坏预训练表示。

**(a) Parameter-free Type（均值池化）**

$$\hat{z}_i = \text{mean-pooling}(z_1_i, z_2_i, \ldots, z_N_i)$$

$$s(v_i, t_j) = \frac{w_j^\top \hat{z}_i}{\|w_j\| \|\hat{z}_i\|}$$

- 无新参数，直接在CLIP的多模态嵌入空间中计算余弦相似度
- 假设：CLIP已将帧和文本映射到同一空间，简单平均即可表示视频

**(b) Sequential Type（序列编码）**

$$\tilde{Z}_i = \text{LSTM}(Z_i) \quad \text{或} \quad \tilde{Z}_i = \text{Transformer-Enc}(Z_i + P)$$

$$\hat{z}_i = \text{mean-pooling}(\tilde{Z}_i)$$

$$s(v_i, t_j) = \frac{w_j^\top \hat{z}_i}{\|w_j\| \|\hat{z}_i\|}$$

- 引入少量新参数建模帧间时序关系
- Transformer初始化：复用CLIP图像编码器对应层的权重
- 位置编码：重复CLIP文本编码器的位置编码

**(c) Tight Type（跨模态交互）**

$$U_i = [w_j, z_1_i, z_2_i, \ldots, z_N_i]$$

$$\tilde{U}_i = \text{Transformer-Enc}(U_i + P + T)$$

$$s(v_i, t_j) = \text{FC}(\text{ReLU}(\text{FC}(\tilde{U}_i[0,:])))$$

- 引入最多新参数：Transformer + 类型嵌入 + 线性投影
- 类型嵌入T区分文本token和视频帧token（类似BERT的segment embedding）
- 取第一个token（[CLS]对应位置）的输出做相似度预测

##### 4. 训练策略

**损失函数**：对称的对比学习损失（InfoNCE）

对于batch中B对(video, text)：
$$\mathcal{L}_{v2t} = -\frac{1}{B}\sum_{i=1}^{B}\log\frac{\exp(s(v_i,t_i)/\tau)}{\sum_{k=1}^{B}\exp(s(v_i,t_k)/\tau)}$$

$$\mathcal{L}_{t2v} = -\frac{1}{B}\sum_{j=1}^{B}\log\frac{\exp(s(v_j,t_j)/\tau)}{\sum_{k=1}^{B}\exp(s(v_k,t_j)/\tau)}$$

$$\mathcal{L} = \mathcal{L}_{v2t} + \mathcal{L}_{t2v}$$

其中τ为可学习温度参数（初始化自CLIP）。

**后预训练（Post-pretraining）**：在HowTo100M（136M视频-文本对）上继续训练CLIP，弥合图像-文本与视频-文本的域差距。

##### 5. 关键超参数与消融实验发现

```
┌────────────────────┬────────────────────────────────────┐
│ 超参数              │ 设置                                │
├────────────────────┼────────────────────────────────────┤
│ 预训练模型          │ CLIP ViT-B/32                      │
│ 学习率(编码器)      │ 1e-7                               │
│ 学习率(新模块)      │ 1e-4                               │
│ 优化器              │ Adam + Cosine Schedule             │
│ Batch Size         │ 128                                │
│ 帧数               │ 12                                 │
│ 文本长度            │ 32 tokens                          │
│ 训练轮数            │ 5 epochs                           │
│ Seq/Tight层数      │ 4层 Transformer                    │
│ LSTM层数            │ 1层                                │
│ 冻结策略            │ 冻结前6层                           │
│ 硬件               │ 4× NVIDIA V100 32GB                │
└────────────────────┴────────────────────────────────────┘
```

**关键发现**：
1. **学习率极其敏感**：1e-7最优，偏大（>1e-6）会严重损害性能
2. **冻结底层有效**：冻结前6层效果最好，全部微调反而下降
3. **帧数影响**：12帧通常最优，更多帧在短视频数据集上收益递减
4. **Batch Size**：越大越好（对比学习特性），128为实际最优
5. **Tight type在长视频上失效**：ActivityNet/DiDeMo上远差于meanP/seq

##### 6. 主要实验结果

| 数据集 | 方法 | R@1 | R@5 | R@10 | MdR |
|--------|------|-----|-----|------|-----|
| MSR-VTT (9K) | seqTransf | **44.5** | 71.4 | 81.6 | 2 |
| MSR-VTT (7K) | meanP | **42.1** | 71.9 | 81.4 | 2 |
| MSVD | meanP | **46.2** | 76.1 | 84.6 | 2 |
| LSMDC | seqTransf | **22.6** | 41.0 | 49.1 | 11 |
| ActivityNet | meanP/seqTransf | **40.5** | 72.4 | 98.1/98.2 | 2 |
| DiDeMo | meanP | **43.4** | 70.2 | 80.6 | 2 |

对比此前SOTA提升：MSR-VTT 9K上R@1从38.9(MDMMT)→44.5(+14.4%)

##### 7. 伪代码

```python
# CLIP4Clip Forward Pass (simplified)
def clip4clip_forward(video_frames, text, sim_type='meanP'):
    # 1. Encode video frames independently
    frame_features = []
    for frame in video_frames:  # N frames
        patch_embed = linear_projection(frame)  # 2D or 3D
        z = clip_visual_transformer(patch_embed)  # [CLS] token
        frame_features.append(z)
    Z = stack(frame_features)  # (N, d)
    
    # 2. Encode text
    w = clip_text_transformer(text)  # (d,)
    
    # 3. Similarity calculation
    if sim_type == 'meanP':
        z_hat = mean(Z, dim=0)  # (d,)
        sim = cosine_similarity(w, z_hat)
    elif sim_type == 'seqTransf':
        Z_tilde = temporal_transformer(Z + pos_embed)  # (N, d)
        z_hat = mean(Z_tilde, dim=0)  # (d,)
        sim = cosine_similarity(w, z_hat)
    elif sim_type == 'tightTransf':
        U = concat([w.unsqueeze(0), Z], dim=0)  # (N+1, d)
        U_tilde = cross_transformer(U + pos_embed + type_embed)
        sim = fc2(relu(fc1(U_tilde[0])))  # scalar
    
    return sim

# Training: symmetric contrastive loss
def clip4clip_loss(videos, texts, temperature):
    sims = compute_similarity_matrix(videos, texts)  # (B, B)
    loss_v2t = cross_entropy(sims / temperature, labels=arange(B))
    loss_t2v = cross_entropy(sims.T / temperature, labels=arange(B))
    return (loss_v2t + loss_t2v) / 2
```

---

#### 练习题

**基础题：**
1. CLIP4Clip中parameter-free type相似度计算器的核心操作是什么？为什么这种简单方法也能取得好效果？
2. 解释为什么CLIP4Clip需要使用极小的学习率（1e-7）来微调编码器？

**进阶题：**
3. 对比三种相似度计算器，分析tight type在长视频数据集（ActivityNet/DiDeMo）上效果远差于meanP的原因。
4. 如果要将CLIP4Clip扩展到视频问答（VideoQA）任务，你会选择哪种相似度计算器？需要做哪些架构修改？

**开放题：**
5. CLIP4Clip证明了"简单迁移+端到端微调"的有效性。讨论这种范式相比"设计复杂的视频专用预训练"（如VideoBERT、ActBERT）的优劣势，以及在什么条件下后者可能更优。