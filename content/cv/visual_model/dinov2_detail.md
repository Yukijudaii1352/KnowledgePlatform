### DINOv2 — 无监督学习鲁棒通用视觉特征

```yaml
id: dinov2
name: DINOv2
full_name: "DINOv2: Learning Robust Visual Features without Supervision"
year: "2023"
org: Meta AI
paper_url: "https://arxiv.org/abs/2304.07193"
category: visual_model
parent: "DINO / iBOT"
motivation: "通过自动化数据管线构建大规模高质量数据集，结合判别式自监督方法训练 ViT，产出无需微调即可直接使用的通用视觉特征"
```

#### 📝 一句话总结

DINOv2 提出了一套完整的"数据 + 算法 + 工程"方案：通过自动化管线构建 1.42 亿图像的 LVD-142M 数据集，结合 DINO（图像级）与 iBOT（块级）判别式自监督损失以及 SwAV 中心化、KoLeo 正则等改进，在 ViT-g（1B 参数）上训练出无需微调即可在图像级与像素级任务上超越 OpenCLIP 的通用视觉特征，并通过知识蒸馏高效获得小模型。

#### 🎯 核心要点

- **自动化数据管线 LVD-142M**：从多个人工策展数据源出发，利用自监督特征对未策展网络图像进行检索与去重，构建 1.42 亿张高质量训练集，无需人工标注
- **判别式自监督组合损失**：图像级 DINO 损失（student-teacher CLS token 交叉熵）+ 块级 iBOT 损失（掩码 patch token 预测）+ SwAV Sinkhorn-Knopp 中心化
- **DINO 与 iBOT 使用独立投影头**：在大规模训练中，解耦两个损失的 MLP head 效果优于共享权重
- **KoLeo 正则化器**：基于 Kozachenko-Leonenko 微分熵估计，鼓励 batch 内特征均匀分布，防止表示坍塌
- **高效工程实现**：序列打包（block-diagonal attention mask）、高效随机深度（跳过计算而非掩码）、FSDP 混合精度训练、FlashAttention
- **知识蒸馏**：从 ViT-g 冻结教师蒸馏 ViT-S/B/L，性能优于从头训练
- **模型规模**：ViT-S (21M) / ViT-B (86M) / ViT-L (300M) / ViT-g (1.1B)
- **短时高分辨率微调**：训练末期将分辨率从 224 提升至 518，提升密集预测任务性能

#### 🔬 深入细节

##### 整体框架

![DINOv2 特征可视化 — PCA 主成分](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/new-figure-1.jpg)
*图 1：DINOv2 学到的特征经 PCA 可视化后，能在无监督条件下精准分离前景与背景，并在语义相似的物体间产生一致的特征映射。*

DINOv2 的核心思路是：**在足够大且足够好的数据上，用足够强的判别式自监督方法训练足够大的模型，就能得到通用视觉特征**。整个系统由三大支柱组成：

1. **数据管线**（Section 3）—— 自动构建 LVD-142M
2. **训练算法**（Section 4）—— DINO + iBOT + SwAV centering + KoLeo
3. **工程优化**（Section 5）—— FSDP / FlashAttention / 序列打包 / 高效随机深度

![数据规模与模型规模的 scaling 效果](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x1.png)
*图 2：增大数据量和模型规模均能持续提升下游性能，验证了 scaling 的有效性。*

---

##### 数据管线：LVD-142M

![数据管线示意](https://ar5iv.labs.arxiv.org/html/2304.07193/assets/x2.png)
*图 3：LVD-142M 数据管线。从策展源出发，对未策展网络图像进行自监督检索和去重。*

数据管线分为三步：

1. **策展数据源汇集**：收集 ImageNet-22k、ImageNet-1k、Google Landmarks 等已有高质量数据集作为"锚点"
2. **自监督检索扩充**：用预训练自监督模型提取特征，从大规模未标注网络图像池中检索与策展图像余弦相似度高的样本
3. **去重**：使用 copy detection 方法去除近重复图像，同时在策展源与未策展源之间、未策展源内部分别去重

> 💡 关键：整个管线**不依赖任何人工标注或文本监督**，完全基于视觉自监督特征完成数据筛选，这是与 CLIP/OpenCLIP 等方法的本质区别。

最终得到 LVD-142M 数据集（142M 张图像），实验表明其效果显著优于仅使用 ImageNet-22k（14M）。

---

##### 训练算法详解

DINOv2 的训练目标由四部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{DINO}} + \lambda_1 \mathcal{L}_{\text{iBOT}} + \lambda_2 \mathcal{L}_{\text{KoLeo}}$$

**（1）图像级目标 — DINO Loss**

采用 student-teacher 框架。对同一图像生成不同裁剪（global crops + local crops），分别送入 student 和 teacher 网络。取两者的 CLS token，经各自的 MLP 投影头后得到 prototype scores，再分别做 softmax：

$$\mathcal{L}_{\text{DINO}} = -\sum p_t \log p_s$$

其中 \(p_t\) 为教师输出（经 Sinkhorn-Knopp 中心化），\(p_s\) 为学生输出（经 softmax）。教师网络参数通过学生参数的**指数移动平均（EMA）**更新：

$$\theta_t \leftarrow m \cdot \theta_t + (1 - m) \cdot \theta_s$$

**（2）块级目标 — iBOT Loss**

对学生输入随机掩码部分 patch，但教师看到完整图像。对学生的 mask token 和教师对应位置的 patch token 分别经投影头后计算交叉熵：

$$\mathcal{L}_{\text{iBOT}} = -\sum_{i \in \text{masked}} p_{t,i} \log p_{s,i}$$

> ⚠️ 注意：在大规模训练中，DINO head 和 iBOT head **使用独立参数**（untied weights），这与 iBOT 原论文中共享权重的结论相反。作者发现在大规模下解耦效果更好。

**（3）Sinkhorn-Knopp 中心化**

替代 DINO 原始的 softmax + moving-average centering，采用 SwAV 的 Sinkhorn-Knopp 批归一化（3 次迭代），对教师输出进行中心化。这能更好地防止表示坍塌。

**（4）KoLeo 正则化器**

基于 Kozachenko-Leonenko 微分熵估计器，鼓励 batch 内特征均匀分布：

$$\mathcal{L}_{\text{KoLeo}} = -\frac{1}{n}\sum_{i=1}^{n} \log(d_{n,i})$$

其中 \(d_{n,i} = \min_{j \neq i} \|x_i - x_j\|\) 是样本 \(x_i\) 到 batch 内最近邻的距离。特征在计算前先做 \(\ell_2\) 归一化。

> 💡 直觉：KoLeo 惩罚特征过于聚集（最近邻距离小 → log 值大负数 → loss 大），从而鼓励特征在超球面上均匀展开。

---

##### 训练伪代码

```python
# DINOv2 训练核心伪代码
for images in dataloader:
    # 数据增强：生成 2 个 global crops + N 个 local crops
    global_crops = augment_global(images)  # 224x224
    local_crops  = augment_local(images)   # 96x96

    # Student: 对 global crops 随机 mask patches
    student_tokens = student_backbone(mask(global_crops))
    student_cls    = student_tokens[:, 0]          # CLS token
    student_patch  = student_tokens[:, 1:]         # patch tokens

    # Teacher (frozen EMA): 看完整图像
    with no_grad():
        teacher_tokens = teacher_backbone(global_crops)
        teacher_cls    = teacher_tokens[:, 0]
        teacher_patch  = teacher_tokens[:, 1:]

    # DINO loss: 图像级 CLS token 交叉熵
    ps_cls = softmax(student_dino_head(student_cls))
    pt_cls = sinkhorn_knopp(teacher_dino_head(teacher_cls))
    L_dino = -sum(pt_cls * log(ps_cls))

    # iBOT loss: 块级 masked patch token 交叉熵
    ps_patch = softmax(student_ibot_head(student_patch[masked_indices]))
    pt_patch = sinkhorn_knopp(teacher_ibot_head(teacher_patch[masked_indices]))
    L_ibot = -sum(pt_patch * log(ps_patch))

    # KoLeo regularizer: 鼓励特征均匀分布
    feats = l2_normalize(student_cls)
    d_nn  = pairwise_min_distance(feats)
    L_koleo = -mean(log(d_nn))

    # 总损失
    loss = L_dino + λ1 * L_ibot + λ2 * L_koleo
    loss.backward()
    optimizer.step()

    # 更新教师 EMA
    teacher.params = m * teacher.params + (1 - m) * student.params
```

---

##### 工程优化

DINOv2 在工程层面做了大量优化，使得在 ViT-g（1.1B 参数）规模上的训练成为可能：

| 优化技术 | 核心思路 | 收益 |
|---------|---------|------|
| **序列打包** | 将不同分辨率的 crops 拼接为一条长序列，用 block-diagonal attention mask 隔离 | 避免多次前向/反向，显著提升吞吐 |
| **高效随机深度** | 跳过被 drop 的残差块计算（而非计算后掩码），随机 shuffle batch 后取前 \((1-d) \times B\) 个样本 | drop rate=40% 时节省约 40% 计算和显存 |
| **FSDP 混合精度** | 权重 float32 存储 + float16 通信（backbone 梯度 fp16 reduce，MLP head 梯度 fp32 reduce） | 通信量减半，显存不受单卡限制 |
| **FlashAttention** | 融合 attention 计算，减少 HBM 访问 | 加速 attention 计算 |

> 💡 关键：FSDP 混合精度在几乎所有场景下都优于 DDP + autocast，因为它同时减少了通信开销和显存占用。

---

##### 知识蒸馏

训练完 ViT-g 后，通过蒸馏获得小模型（ViT-S/B/L）：

- 使用 ViT-g 作为**冻结教师**
- 复用同一训练框架（DINO + iBOT loss）
- 关键修改：去除 masking 和 stochastic depth，对两个 global crops 都计算 iBOT loss
- 最终模型取学生的 EMA

> 💡 实验发现：蒸馏得到的 ViT-L 性能优于从头训练的 ViT-L，说明大模型的知识能有效传递。

---

##### 与先前方法的对比

| 维度 | DINO | iBOT | DINOv2 |
|------|------|------|--------|
| 图像级目标 | ✅ CLS token 蒸馏 | ✅ 继承 DINO | ✅ 继承 DINO |
| 块级目标 | ❌ | ✅ masked patch prediction | ✅ 继承 iBOT |
| 中心化方式 | softmax + moving avg | softmax + moving avg | **Sinkhorn-Knopp** |
| 投影头 | 共享 | 共享 | **独立（untied）** |
| 特征正则 | 无 | 无 | **KoLeo** |
| 数据 | ImageNet-1k | ImageNet-1k/22k | **LVD-142M（自动策展）** |
| 模型规模 | ViT-S/B | ViT-S/B/L | **ViT-S/B/L/g（1.1B）** |
| 蒸馏 | 无 | 无 | **ViT-g → 小模型** |

DINOv2 的核心贡献不在于提出全新的损失函数，而在于**系统性地将数据规模、模型规模和训练技巧整合到一起**，证明了判别式自监督方法在正确的 scaling 下可以产出媲美甚至超越弱监督方法（如 CLIP）的通用视觉特征。

#### 🧪 练习题

```yaml
question: "DINOv2 中为什么要将 DINO head 和 iBOT head 的权重解耦（untied）？"
options:
  - "为了减少模型总参数量"
  - "因为在大规模训练中，解耦两个 head 的性能优于共享权重"
  - "为了让 iBOT loss 只作用于 CLS token"
  - "因为 Sinkhorn-Knopp 中心化要求两个 head 独立"
answer: 1
explain: "iBOT 原论文在小规模实验中发现共享权重更好，但 DINOv2 在大规模训练中观察到相反结论——解耦两个投影头能获得更好的下游性能。"
```