### AFSD — 无锚点检测器 (Anchor-Free Single-Stage)

```yaml
id: afsd
name: AFSD
full_name: 无锚点检测器 (Anchor-Free Single-Stage)
year: '2021'
org: SJTU
paper_url: http://openaccess.thecvf.com/content/CVPR2021/html/Lin_Learning_Salient_Boundary_Feature_for_Anchor-free_Temporal_Action_Localization_CVPR_2021_paper.html
category: localization
parent: gtad
motivation: 首个纯Anchor-free时序定位
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/afsd_detail.md
```

#### 📝 一句话总结

AFSD 提出首个纯 anchor-free 的单阶段时序动作定位框架，用“每个时序位置直接回归左右边界距离”的方式替代动作性枚举和预设 anchor，并通过显著边界特征与一致性学习提升边界精度。

#### 🎯 核心要点

- **纯 anchor-free TAL**：每个 FPN 时序位置只预测一个动作片段的起止距离与类别分数，不再枚举 \(\mathcal{O}(T^2)\) 起止组合或调参预设 anchor
- **端到端单阶段检测器**：I3D backbone + 1D temporal FPN + coarse prediction head + saliency-based refinement head 共同训练
- **显著边界池化**：在粗边界附近构造 start/end 区域，用 channel-wise max pooling 选择最强激活的 moment-level 边界特征
- **边界一致性学习 BCL**：用 Activation Guided Learning 约束边界敏感特征，并用 Boundary Contrastive Learning 拉近真实动作两段边界、拉远背景边界
- **质量置信度替代 centerness**：用预测片段与真实片段的 tIoU 作为质量监督，避免直接套用目标检测中的 centerness
- **推理融合**：粗分类、精分类与质量分数联合得到最终类别置信度，再用 Soft-NMS 去除冗余片段

#### 🔬 深入细节

##### 核心架构图

![AFSD 整体框架图](https://ar5iv.labs.arxiv.org/html/2103.13137/assets/x3.png)
*图：AFSD 从视频特征构建 1D temporal FPN，各层先输出粗边界，再用显著边界特征细化起止位置、类别和质量分数。*

![AFSD 显著边界池化图](https://ar5iv.labs.arxiv.org/html/2103.13137/assets/x4.png)
*图：Saliency-based Refinement Module 根据粗边界定位 start/end 区域，并在区域内寻找最显著的 moment-level 边界特征。*

##### 算法伪代码

```python
# AFSD 训练与推理核心流程伪代码
def AFSD(video):
    # 1. Backbone 与时序金字塔
    F = I3D(video)                              # [T', C', H', W']
    seq = flatten_spatial(F)                    # [T', C]
    pyramid = temporal_fpn(seq)                 # 多尺度 1D FPN 特征

    all_predictions = []
    for level, f_l in enumerate(pyramid):
        # 2. Anchor-free 粗预测：每个时序位置直接回归到左右边界的距离
        f_loc, f_cls = conv_branch(f_l, "loc"), conv_branch(f_l, "cls")
        d_start, d_end = regressor(f_loc)
        cls_coarse = classifier(f_cls)

        coarse = []
        for i in range(len(f_l)):
            stride = 2 ** level
            start = i * stride - d_start[i]
            end = i * stride + d_end[i]
            coarse.append((start, end, cls_coarse[i]))

        # 3. 显著边界池化：围绕粗边界提取 start/end 敏感特征
        f_start = relu(group_norm(conv_start(f_loc)))
        f_end = relu(group_norm(conv_end(f_loc)))
        boundary_feats = []
        for start, end, _ in coarse:
            width = end - start
            start_region = (start - width / delta_a, start + width / delta_b)
            end_region = (end - width / delta_b, end + width / delta_a)
            s_feat = max_pool_over_time(f_start, start_region)
            e_feat = max_pool_over_time(f_end, end_region)
            boundary_feats.append(concat(f_l, s_feat, e_feat, frame_level_feats))

        # 4. 细化预测
        refined_feat = conv_reduce(boundary_feats)
        delta_start, delta_end = refinement_regressor(refined_feat)
        cls_refined = refinement_classifier(refined_feat)
        quality = quality_head(refined_feat)

        all_predictions.extend(fuse(coarse, delta_start, delta_end, cls_refined, quality))

    return soft_nms(all_predictions)
```

##### 方法详解

**动机与背景**

AFSD 针对的是 Temporal Action Localization：输入未裁剪长视频，输出每个动作实例的类别、开始时间和结束时间。它之前的主流路线有两类：actionness-guided 方法先预测每个时刻的 start/end/actionness，再组合出大量候选；anchor-based 方法预设多个尺度的 anchor，再做边界回归。前者近似枚举所有起止组合，复杂度可到 \(\mathcal{O}(T^2)\)；后者输出数量与 anchor 数 \(C\) 绑定，约为 \(C \cdot T\)，并且对 anchor 尺度和位置超参敏感。

AFSD 的核心选择是把时序定位改写成类似 FCOS 的 anchor-free 回归：给定 FPN 第 \(l\) 层的时序位置 \(i\)，网络直接预测该位置到动作开始和结束的距离 \((\hat d_i^s,\hat d_i^e)\)，从而得到粗边界：

$$
\hat{\psi}_i = i \cdot 2^l - \hat d_i^s,\qquad
\hat{\xi}_i = i \cdot 2^l + \hat d_i^e
$$

这种形式让每个位置只产生一个候选片段，省掉了 anchor 设计和 proposal 组合。更重要的是，分类与定位在同一个端到端网络中完成，不再需要额外的片段分类器来给 proposal 重新打类别分。

**显著边界池化**

仅靠局部时序卷积回归边界会遇到一个问题：不同动作长度差异很大，固定感受野很难稳定看到真正的起止时刻。AFSD 因此增加 Saliency-based Refinement Module。它先把定位特征投影成 start-sensitive 和 end-sensitive 两个空间：

$$
f^s=\sigma(\mathrm{GN}(\mathrm{Conv}_s(f_{loc}))),\qquad
f^e=\sigma(\mathrm{GN}(\mathrm{Conv}_e(f_{loc})))
$$

对第 \(k\) 个粗预测片段 \((\hat\psi_k,\hat\xi_k)\)，设片段长度 \(\hat w_k=\hat\xi_k-\hat\psi_k\)，AFSD 在开始点和结束点附近构造非对称边界区域：

$$
T_s^k=\left[\hat\psi_k-\frac{\hat w_k}{\delta_a},\hat\psi_k+\frac{\hat w_k}{\delta_b}\right],\qquad
T_e^k=\left[\hat\xi_k-\frac{\hat w_k}{\delta_b},\hat\xi_k+\frac{\hat w_k}{\delta_a}\right]
$$

然后对每个通道在该区域内取最大激活：

$$
\hat f^s(k,c)=\max_{j\in T_s^k} f^s(j,c),\qquad
\hat f^e(k,c)=\max_{j\in T_e^k} f^e(j,c)
$$

这一步的直觉很明确：边界判断依赖的是“某一瞬间是否发生从背景到动作、或从动作到背景的变化”，而不是整段区域的平均特征。mean pooling 或卷积会混入大量非边界帧，max pooling 则更像是在边界候选区域里寻找最有判别力的瞬时证据。

**边界一致性学习**

显著边界池化本身只保证“取最大值”，不保证最大值对应真正边界。AFSD 为此设计 Boundary Consistency Learning。第一部分是 Activation Guided Learning：把 start/end 敏感特征经过 \(\tanh\) 后按通道平均，得到边界激活图 \(\tilde g^s,\tilde g^e\)，再用真实起止点邻域标签 \(g^s,g^e\) 做 BCE：

$$
\ell_{act}=\mathrm{BCE}(g^s,\tilde g^s)+\mathrm{BCE}(g^e,\tilde g^e)
$$

第二部分是 Boundary Contrastive Learning。论文把一个动作片段切成前后两段 \(A_1,A_2\)，中间插入背景 \(Bg\)。合理的边界特征应满足：\(A_1\) 的结束边界和 \(A_2\) 的开始边界相似，但应远离背景边界。于是使用 triplet 形式：

$$
\ell_{trip}=\max\left(\|f^e_{A_1}-f^s_{A_2}\|^2-\|f^e_{A_1}-f_{Bg}\|^2+1,0\right)
$$

最终一致性损失为：

$$
\ell_{con}=\ell_{act}+\ell_{trip}
$$

这使边界池化不只是局部最大激活选择器，而是被训练成“应当在真实动作开始/结束处产生高响应”的特征提取器。

**训练目标与质量分数**

AFSD 同时监督粗预测和细化预测。粗定位使用 tIoU loss，细化边界使用 L1 offset loss，粗分类和精分类都用 focal loss。总体检测损失为：

$$
\mathcal{L}=\ell^C_{cls}+\lambda\ell^C_{loc}+\ell^R_{cls}+\lambda\ell^R_{loc}+\gamma\ell_q
$$

其中粗定位损失可写成：

$$
\ell^C_{loc}=\frac{1}{N_C}\sum_i \mathbb{I}(y_i\ge 1)\left(1-\frac{|\hat\phi_i\cap\phi_i|}{|\hat\phi_i\cup\phi_i|}\right)
$$

质量分数 \(\eta_i\) 的监督目标不是 FCOS centerness，而是细化边界 \(\tilde\phi_i\) 与真实片段 \(\phi_i\) 的 tIoU：

$$
\ell_q=\frac{1}{N_R}\sum_i \mathbb{I}(y_i\ge 1)\,
\mathrm{BCE}\left(\eta_i,\frac{|\tilde\phi_i\cap\phi_i|}{|\tilde\phi_i\cup\phi_i|}\right)
$$

这是时序定位里的关键取舍：动作边界不像目标框中心那样有清晰几何中心，直接套 centerness 不稳定；用 tIoU 作为质量目标更贴近最终 NMS 和 mAP 评价。

**推理与传统方法差异**

推理时，AFSD 把细化 offset 加到粗边界上，并将粗分类、精分类和质量置信度融合：

$$
\tilde\psi_{l,i}=\hat\psi_{l,i}+\frac{1}{2}\hat w_{l,i}\Delta\hat\psi_{l,i},\qquad
\tilde\xi_{l,i}=\hat\xi_{l,i}+\frac{1}{2}\hat w_{l,i}\Delta\hat\xi_{l,i}
$$

$$
\hat y_{l,i}=\frac{1}{2}(\hat y^C_{l,i}+\hat y^R_{l,i})\eta_{l,i}
$$

相比 BMN/G-TAD 这类 proposal-centric 方法，AFSD 不再显式构建二维 proposal 图或图关系，而是在 dense temporal location 上直接回归片段；相比 anchor-based 方法，它也不依赖预设持续时间集合。它的性能提升主要来自两个补丁：用边界池化弥补 anchor-free 粗回归的边界不准，用 BCL 确保边界池化学到真实边界而不是背景峰值。

#### 🧪 练习题

```yaml
question: "AFSD 中显著边界池化的主要作用是什么？"
options:
  - "枚举所有可能的起止时刻组合"
  - "在粗边界附近选择最有判别力的 moment-level start/end 特征来细化边界"
  - "把视频级类别标签转换成帧级标签"
  - "用预设 anchor 生成多尺度候选片段"
answer: 1
explain: "AFSD 已经由 anchor-free head 给出粗边界，边界池化在该边界附近寻找最强 start/end 激活，提供用于边界修正和质量估计的显著瞬时特征。"
```
