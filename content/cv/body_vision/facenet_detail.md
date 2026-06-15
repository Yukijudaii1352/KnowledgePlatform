### FaceNet

```yaml
id: facenet
name: FaceNet
full_name: "人脸网络 (FaceNet)"
year: "2015"
org: "Google"
paper_url: "https://www.cv-foundation.org/openaccess/content_cvpr_2015/html/Schroff_FaceNet_A_Unified_2015_CVPR_paper.html"
category: "face"
parent: "deepface"
motivation: "提出三元组损失直接学习欧氏空间映射"
```

#### 📝 一句话总结

FaceNet 用深度 CNN 直接学习 128 维 L2 归一化欧氏人脸嵌入，并通过在线 semi-hard triplet mining 优化三元组损失，让验证、识别和聚类都可以基于简单距离完成。

#### 🎯 核心要点

- **统一嵌入空间**：把每张人脸映射为 \(d=128\) 的单位球面向量，距离直接表示身份相似度
- **Triplet Loss**：约束 anchor-positive 距离小于 anchor-negative 距离至少一个 margin
- **在线 semi-hard negative mining**：在大 batch 内选择位于 margin 内但比 positive 更远的 negative，避免训练坍塌
- **无需复杂 3D 对齐**：输入只做紧致人脸裁剪和尺度/平移归一化，不依赖 DeepFace 式 3D frontalization
- **两类骨干网络**：实验比较 Zeiler&Fergus 风格大模型与 Inception 风格高效模型
- **大规模数据训练**：使用约 100M-200M 人脸缩略图、约 8M 身份，提升跨姿态、光照和年龄鲁棒性
- **经典结果**：LFW 99.63%、YouTube Faces 95.12%，每张人脸可量化为 128 bytes 表示

#### 🔬 深入细节

![FaceNet 模型结构](https://ar5iv.labs.arxiv.org/html/1503.03832/assets/x2.png)
*图：FaceNet 使用深度 CNN 后接 L2 normalization 得到 embedding，训练阶段接 triplet loss。*

![FaceNet 三元组损失](https://ar5iv.labs.arxiv.org/html/1503.03832/assets/x1.png)
*图：学习后 anchor 更接近同身份 positive，并远离不同身份 negative。*

```python
# FaceNet 在线 semi-hard triplet mining 伪代码
for batch in identity_balanced_batches(images, persons_per_id=40):
    emb = l2_normalize(cnn(batch.images))  # (B, 128)
    triplets = []
    for anchor, positive in all_same_identity_pairs(batch):
        d_ap = squared_l2(emb[anchor], emb[positive])
        candidates = different_identity_indices(anchor, batch)
        # semi-hard: d_ap < d_an < d_ap + alpha
        neg = choose_negative(candidates, condition=lambda n: d_ap < squared_l2(emb[anchor], emb[n]) < d_ap + alpha)
        if neg is not None:
            triplets.append((anchor, positive, neg))
    loss = sum(max(sqdist(a, p) - sqdist(a, n) + alpha, 0) for a, p, n in triplets)
    optimize(loss)
```

**动机与背景。** DeepFace、DeepID 等早期深度人脸方法通常先训练大规模身份分类器，再取中间层特征做验证。这种方式间接地优化分类边界，嵌入维度也较高，还常需要 PCA、SVM、Joint Bayesian 或复杂对齐。FaceNet 的核心转变是：不要把人脸识别拆成“分类特征 + 外部度量”，而是直接学习一个距离空间，使欧氏距离本身就是可用的相似度。

**三元组约束。** 对于同一身份的 anchor \(x_i^a\)、positive \(x_i^p\) 和不同身份的 negative \(x_i^n\)，FaceNet 希望：

$$
\|f(x_i^a)-f(x_i^p)\|_2^2+\alpha < \|f(x_i^a)-f(x_i^n)\|_2^2
$$

训练损失为：

$$
\mathcal{L}=\sum_i \left[\|f(x_i^a)-f(x_i^p)\|_2^2-\|f(x_i^a)-f(x_i^n)\|_2^2+\alpha\right]_+
$$

其中 \(f(x)\) 被约束在单位超球面，论文使用 margin \(\alpha=0.2\)。直觉上，模型不要求同一个人的所有照片塌缩成一个点，只要求它们相对任何其他身份都更近，因此同一身份可以在姿态、光照、年龄变化下形成小流形。

**为什么要挖 triplet。** 全部三元组数量巨大，而且绝大多数很快满足约束，继续训练没有梯度。最硬 negative 虽然梯度大，但早期可能是脏标签或极端样本，容易导致所有 embedding 坍塌。因此论文选择 semi-hard negative：

$$
\|f(a)-f(p)\|_2^2 < \|f(a)-f(n)\|_2^2 < \|f(a)-f(p)\|_2^2+\alpha
$$

这种 negative 比 positive 远一点，但仍在 margin 内，既有学习信号又不会太不稳定。

**网络与训练。** FaceNet 并不绑定某个唯一 CNN。论文比较了 22 层 Zeiler&Fergus 风格网络（约 140M 参数、1.6B FLOPs）和 Inception 风格网络（约 6.6M-7.5M 参数，效率更高）。训练使用 SGD + AdaGrad，大 batch 内每个身份采样约 40 张图，再加入随机负样本，batch 规模可达约 1800，保证在线 mining 有足够候选。

**推理流程。** 推理时不再需要 triplet。任意人脸经过 CNN 得到 128 维向量并 L2 归一化；验证任务对两向量求平方欧氏距离并阈值判断；识别任务用 kNN 或最近中心；聚类任务直接用 k-means、层次聚类等。由于表示可量化为 128 bytes，FaceNet 特别适合大规模照片聚类和检索。

**与 DeepFace 的区别。** DeepFace 强调 3D 对齐和大分类网络，最终还要外部度量；FaceNet 强调端到端度量学习和紧凑向量。前者把姿态归一化作为系统工程重点，后者让大规模训练和 triplet loss 学出对姿态/光照的距离不变性。

#### 🧪 练习题

```yaml
question: "FaceNet 使用 semi-hard negative 而不是总选最硬 negative 的主要原因是什么？"
options:
  - "semi-hard negative 可以减少 embedding 维度"
  - "最硬 negative 早期可能来自噪声或异常样本，容易导致训练坍塌"
  - "最硬 negative 无法计算欧氏距离"
  - "semi-hard negative 只用于推理阶段"
answer: 1
explain: "semi-hard negative 位于 margin 内但仍比 positive 更远，既提供有效梯度，又比最硬负样本更稳定。"
```
