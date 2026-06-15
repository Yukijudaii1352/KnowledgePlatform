### UVAS / Screener: Unsupervised Visual Anomaly Segmentation for medical CT

```yaml
id: uvas
name: UVAS
full_name: "UVAS: 无监督视觉异常分割 (Unsupervised Visual Anomaly Segmentation)"
year: "2026.04"
org: "ICLR 2026"
paper_url: "https://openreview.net/forum?id=uvas2026"
category: "segmentation"
parent: "—"
motivation: "无监督异常发现解决长尾病变标注稀缺问题"
```

#### 📝 一句话总结

UVAS 将病理发现建模为相对健康组织的低概率异常区域，Screener 用密集自监督特征和密度估计在无标注 CT 上学习“正常性”。它不依赖病灶类别标签，目标是发现长尾、稀有或未标注病变，缓解医学异常分割中监督标签覆盖不足的问题。

#### 🎯 核心要点

- **给定链接为占位符**：`uvas2026` 不是有效 OpenReview ID；可检索 ICLR 2026 主源是 “Modeling the Density of Pixel-level Self-supervised Embeddings for Unsupervised Pathology Segmentation in Medical CT”。
- **模型名 Screener**：OpenReview TL;DR 描述其为 fully self-supervised pathology segmentation model for medical CT images。
- **UVAS 问题设定**：假设病理区域相对健康解剖结构稀有，通过正常特征密度低来定位异常。
- **密集自监督特征**：用 DenseVICReg 等 dense SSL 学习像素/体素级表征，避免依赖 ImageNet 或有监督医学预训练。
- **密度建模**：在 dense embedding 空间中估计正常分布，对低似然区域生成 anomaly score map。
- **遮罩不变条件特征**：使用 learned, masking-invariant dense features 作为 conditioning variables，替代手工位置编码。
- **大规模无标注训练**：OpenReview 摘要报告训练使用超过 30,000 个无标注 3D CT volume，并在 4 个含 1,820 扫描的测试集上评估。

#### 🔬 深入细节

##### 4.1 核心示意图

![Screener / UVAS 框架图](https://figures.semanticscholar.org/cc920ae3dcd2e300cc4691dc5da77aba10107155/2-Figure1-1.png)
*图：Screener 的密集自监督特征与条件密度建模流程。该图来自可公开访问的 Semantic Scholar figure CDN，对应 Screener/UVAS 论文图示。*

##### 4.2 算法伪代码

```python
# UVAS / Screener 推理伪代码
def screener_infer(ct_volume):
    # 1. 提取密集自监督特征
    dense_feat = dense_ssl_encoder(ct_volume)       # [D, H, W, C]

    # 2. 生成遮罩不变条件变量，表示局部解剖和上下文
    cond_feat = conditioning_encoder(mask_aug(ct_volume))

    # 3. 用正常数据训练得到的密度模型估计每个位置的 log likelihood
    logp = density_model.log_prob(dense_feat, cond=cond_feat)

    # 4. 低似然位置即异常候选
    anomaly_score = -logp
    anomaly_map = postprocess(anomaly_score)
    return threshold_or_rank(anomaly_map)
```

##### 4.3 方法解读

监督医学分割的弱点在异常检测上尤其明显：公共数据集通常只标注少数常见病灶，临床上却存在大量长尾异常、偶发病变和组合病理。UVAS 的出发点是“不知道异常类别也要能发现异常”，因此它不学习某个具体病灶的分类边界，而是学习正常 CT 的密集特征分布。

基本评分可以写成负对数似然：

$$
s(\mathbf{x}_{p})=-\log p_{\theta}(\mathbf{z}_{p}\mid \mathbf{c}_{p})
$$

其中 \(\mathbf{x}_{p}\) 是位置 \(p\) 的局部影像，\(\mathbf{z}_{p}\) 是 dense SSL encoder 输出的像素/体素级特征，\(\mathbf{c}_{p}\) 是条件变量。若某个位置的表征在正常数据分布下概率很低，则 anomaly score \(s\) 高，被视为病理候选区域。

早期 UVAS 方法常用有监督预训练特征或手工位置编码。Screener 的第一项改进是 dense self-supervised learning：让模型在无标注 CT 上学习局部结构和上下文一致性，避免自然图像特征和医学体数据之间的域差异。第二项改进是 learned masking-invariant conditioning：通过遮罩增强迫使条件变量不依赖病灶本身，而更多表达正常解剖上下文，从而避免密度模型把异常也解释成“正常条件”。

训练流程可分为两阶段。第一阶段训练 dense descriptor，使相同解剖位置或增强视图的特征稳定，不同位置有区分度；第二阶段在这些 dense feature 上训练条件密度模型，例如 flow/Glow 类可逆模型。推理时不需要病灶标签，只输出每个位置的异常分数，再通过阈值、连通域或 top-k 体素生成分割结果。

> ⚠️ 注意：UVAS 不是万能病灶分割器。它对“训练集中罕见、统计上异常”的区域敏感，但对正常变异、扫描伪影、金属伪影或训练集中已频繁出现的慢性改变可能产生误报或漏报。

##### 4.4 与监督分割的区别

传统 nnU-Net/UNETR 学的是 \(p(y\mid x)\)：需要每类病灶的 mask 标签，泛化到未见病种时能力有限。UVAS 学的是 \(p(z\mid c)\)：只要求大量无标注正常或混合 CT，检测低概率区域。它牺牲了病种语义分类能力，换来对未知异常和低标注场景的适应性，因此更适合作为筛查、预标注或低样本微调的前置模型。

#### 🧪 练习题

```yaml
question: "UVAS/Screener 为什么适合长尾病变发现？"
options:
  - "它为每一种病灶都训练一个有监督分类头"
  - "它学习正常 dense feature 的条件密度，把低似然区域视为异常候选"
  - "它只检测 COCO 数据集中的 80 个类别"
  - "它通过 NMS 合并检测框而不是输出分割图"
answer: 1
explain: "UVAS 不依赖具体病灶类别标签，而是用正常特征分布的低似然定位异常，因此更适合未标注或长尾病理发现。"
```
