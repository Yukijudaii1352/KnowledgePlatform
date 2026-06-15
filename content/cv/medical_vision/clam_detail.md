### CLAM: Data-efficient and weakly supervised computational pathology on whole-slide images

```yaml
id: clam
name: CLAM
full_name: "CLAM: 聚类约束注意力多实例学习 (Data-efficient and weakly supervised computational pathology on whole-slide images)"
year: "2021"
org: "哈佛医学院"
paper_url: "https://www.nature.com/articles/s41551-020-00682-w"
category: "diagnostic"
parent: "attention_mil"
motivation: "聚类约束的注意力机制实现WSI弱监督高效分类"
```

#### 📝 一句话总结

CLAM 提出了聚类约束注意力多实例学习框架，在只有 slide-level 标签的情况下完成全切片图像分类、ROI 热力图解释和多类别亚型诊断。它用 class-specific attention 聚合 WSI patch 特征，并用高/低注意力 patch 的伪标签做实例级聚类约束，缓解弱监督 WSI 学习中监督信号稀疏的问题。

#### 🎯 核心要点

- **弱监督 WSI 处理**：不需要 ROI 标注或像素级标注，只用整张切片诊断标签训练。
- **Patch 特征预提取**：先做组织区域分割与 patch 切块，再用 ImageNet 预训练 CNN 编码每个 patch。
- **多分支注意力 MIL**：为每个诊断类别学习独立 attention branch，生成 class-specific slide representation。
- **聚类约束**：用高注意力 patch 作为正证据、低注意力 patch 作为负证据，训练实例级聚类分类器。
- **多类别亚型诊断**：相比传统二分类 MIL，CLAM 直接支持 RCC、NSCLC 等多类别 subtyping。
- **可解释热力图**：把预测类别的 attention score 映射回 WSI 空间，生成诊断相关区域热力图。
- **数据效率**：在较少 slide-level 标签下仍能保持高 AUC，尤其优于 max-pooling MIL 和 same-label patch 训练。

#### 🔬 深入细节

##### 4.1 核心示意图

![CLAM 弱监督 WSI 框架](https://cdn.ncbi.nlm.nih.gov/pmc/blobs/b98d/8711640/cb8bbd942cd9/nihms-1723086-f0002.jpg)
*图：CLAM 从 WSI 组织区域切 patch，预训练 CNN 编码 patch，注意力网络聚合为 slide representation，并用高/低注意力 patch 训练实例级聚类分支。*

##### 4.2 算法伪代码

```python
# CLAM 训练流程伪代码
for slide, y_slide in dataloader:
    patches = tile_tissue_regions(slide)
    H = pretrained_cnn(patches)              # [K, D], K 个 patch 特征

    A = class_specific_attention(H)          # [N_class, K]
    M = softmax(A, dim=1) @ H                # [N_class, D]
    logits = classifier(M)                   # slide-level logits
    loss_slide = cross_entropy(logits, y_slide)

    # in-the-class branch: 最高注意力为正证据，最低注意力为负证据
    top_idx = topk(A[y_slide], B)
    bottom_idx = bottomk(A[y_slide], B)
    inst_x = concat(H[top_idx], H[bottom_idx])
    inst_y = concat(ones(B), zeros(B))
    loss_patch = smooth_top1_svm(instance_head[y_slide](inst_x), inst_y)

    # 多类别互斥任务中，可把其他类别分支的高注意力 patch 当作 false positive 负证据
    loss = c1 * loss_slide + c2 * loss_patch
    loss.backward()
    optimizer.step()
```

##### 4.3 方法解读

CLAM 的背景问题是 WSI 的标注粒度和计算规模不匹配：一张 WSI 可能有数十万 patch，但训练标签通常只有整张切片的诊断结果。传统 MIL 的 max pooling 只让最高分实例参与梯度，same-label 方法又把 slide 标签强行赋给所有 patch，导致大量噪声标签。CLAM 选择 embedding-based MIL：先把 patch 编码为特征，再用可学习注意力做集合聚合。

核心注意力聚合可写成：

$$
\mathbf{h}_{\text{slide}, i}=\sum_{k=1}^{K} a_{i,k}\mathbf{h}_k
$$

其中 \(i\) 表示类别分支，\(K\) 是 patch 数量，\(a_{i,k}\) 是第 \(i\) 类 attention branch 对第 \(k\) 个 patch 的归一化权重。这样每个类别都有自己的“证据视角”：同一张 WSI 中，被腺癌分支关注的区域和被鳞癌分支关注的区域可以不同。

CLAM 的关键增量是实例级聚类约束。由于没有 patch label，模型从自己的 attention 中构造伪标签：ground-truth 类别分支的 top-\(B\) patch 视为该类正证据，bottom-\(B\) patch 视为负证据；如果任务类别互斥，其他类别分支的 top-\(B\) patch 还可被视为 false positive 负证据。这个辅助任务迫使 patch feature space 把“强诊断证据”和“非诊断证据”拉开。

训练损失由 slide-level 分类损失和 patch-level 聚类损失组成：

$$
\mathcal{L}_{\text{total}}=c_1\mathcal{L}_{\text{slide}}+c_2\mathcal{L}_{\text{patch}}
$$

其中 \(\mathcal{L}_{\text{slide}}\) 通常是交叉熵，\(\mathcal{L}_{\text{patch}}\) 使用 smooth top-1 SVM loss。论文选择 margin-style 的实例损失，是因为 attention 伪标签不可避免有噪声；带 margin 的损失比直接交叉熵更不容易过拟合错误伪标签。

推理时，CLAM 对所有 tissue patch 计算 attention score 和 slide logits。预测类别对应的 attention score 会被归一化为 percentile 后映射回原始 WSI 坐标，形成 heatmap。这个热力图不是显式分割模型输出，但在病理诊断中可作为“模型依赖哪些形态学区域”的解释工具。

> 💡 关键：CLAM 不是简单把 Attention MIL 用到病理图像，而是在 attention 选出的代表性 patch 上加入实例级可分性约束，让弱监督训练从“一个 slide 标签”获得更多可用梯度。

##### 4.4 与传统方法的区别

相比 max-pooling MIL，CLAM 不只依赖单个最强 patch，而是通过 attention 加权聚合多个诊断区域；相比 mean pooling，CLAM 不会让背景和无关组织等权参与 slide 表示；相比 patch-level same-label 训练，CLAM 不会把全片标签强加给所有 patch。它的代价是需要先离线提取 patch 特征，并且 attention 伪标签仍可能在早期训练阶段出错，因此聚类约束更适合与稳健的 slide-level loss 共同优化。

#### 🧪 练习题

```yaml
question: "CLAM 中实例级聚类约束的主要作用是什么？"
options:
  - "用像素级标注训练一个额外的分割头"
  - "把高/低注意力 patch 构造成伪标签，增强 patch 特征空间的可分性"
  - "用 NMS 合并多个 WSI 预测框"
  - "把所有 patch 的 slide 标签都改成独立 patch 标签"
answer: 1
explain: "CLAM 没有 patch-level 真值标签，因此利用 attention 选出的 top/bottom patch 构造伪监督，约束诊断证据和负证据在特征空间中分离。"
```
