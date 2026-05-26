### DINOv3

```yaml
id: dinov3
name: DINOv3
full_name: Self-Distillation with No Labels v3
year: '2025'
org: Meta AI Research
paper_url: https://arxiv.org/abs/2508.10104
category: frontier
parent: ijepa
motivation: Gram锚定缓解长训练下稠密特征退化
```

#### 📝 一句话总结

DINOv3 将 DINO 风格自监督训练扩展到 7B 级视觉骨干，并提出 Gram anchoring 来专门修复“大模型 + 长训练”下稠密特征图逐步退化的问题，使一个冻结的自监督视觉编码器同时在全局识别和密集预测任务上达到新的通用基础模型水准。随后它再通过高分辨率适配和多学生蒸馏，把 7B teacher 的能力压缩到一整套可部署的 ViT 家族中。

#### 🎯 核心要点

- 7B 级自监督 teacher：基于 DINOv2 / iBOT 路线继续放大模型和数据规模，构建 ViT-7B 主干
- 数据与训练扩展：使用大规模无标签“background”数据，并混入少量专门数据；主训练阶段采用常数超参数训练 1M iterations
- Gram anchoring：对学生 patch 特征的 Gram 矩阵施加约束，直接抑制长训练过程中 dense feature map 的退化
- Gram teacher 机制：选取较早、稠密特征质量更好的 teacher 作为 Gram teacher，并每 10k iter 刷新一次
- 精炼阶段目标：在 DINO、iBOT、Koleo 项之外加入 \(L_{\text{Gram}}\)，专门修复局部特征质量
- 高分辨率后适配：增加 mixed-resolution 高分辨率阶段，使模型在 4K 级输入上仍保持稳定 dense features
- 多学生蒸馏：从 7B teacher 并行蒸馏出 ViT-S/B/L/S+/H+ 等多个学生模型，兼顾效果与部署成本

#### 🔬 深入细节

##### 核心示意图

![DINOv3 多学生蒸馏流程图](https://ar5iv.labs.arxiv.org/html/2508.10104/assets/x18.png)
*图：论文 Figure 12 展示的 multi-student distillation。DINOv3 先训练出 7B teacher，再共享 teacher inference，把知识并行蒸馏到多个不同规模的学生模型。*

##### 算法伪代码

```python
# DINOv3 training pipeline (condensed)

# Stage 1: large-scale self-distillation pretraining
teacher = EMA(student_init())
student = student_init()
for step in range(1_000_000):
    views = sample_global_and_local_crops(batch)
    loss_dino = dino_global_loss(student, teacher, views.global_crops)
    loss_ibot = ibot_patch_loss(student, teacher, views)
    loss_koleo = koleo_regularizer(student, views.global_crops)
    loss = w_d * loss_dino + loss_ibot + w_dkl * loss_koleo
    optimize(student, loss)
    update_ema(teacher, student)

# Stage 2: refinement with Gram anchoring
gram_teacher = snapshot_of_early_teacher()
for step in range(refinement_steps):
    X_s = l2_normalized_patch_features(student, global_crops_only=True)
    X_g = l2_normalized_patch_features(gram_teacher, global_crops_only=True)
    loss_gram = frobenius_norm(X_s @ X_s.T - X_g @ X_g.T) ** 2
    loss_ref = w_d * loss_dino + loss_ibot + w_dkl * loss_koleo + w_gram * loss_gram
    optimize(student, loss_ref)
    update_ema(teacher, student)
    if step % 10_000 == 0:
        gram_teacher = copy(teacher)

# Stage 3: high-resolution adaptation
train_with_mixed_resolutions(student, teacher, use_gram=True)

# Stage 4: distillation to practical backbones
for student_model in [vit_s, vit_b, vit_l, vit_s_plus, vit_h_plus]:
    distill_from_teacher(vit_7b_teacher, student_model)
```

##### 动机与背景

DINOv2 已经证明了自监督视觉模型可以作为强大的通用编码器，但论文指出，继续单纯扩大模型规模和训练时长时，会出现一个之前没有被真正解决的问题：**全局识别能力继续上涨，但局部 patch 特征会逐渐变脏，dense feature map 在长训练后退化**。这意味着模型在分类、检索等全局任务上更强了，却可能在分割、跟踪、匹配等依赖局部空间一致性的任务上变差。

DINOv3 的核心目标，就是不再把“全局语义”和“局部稠密特征”视为天然兼容，而是明确承认两者会冲突，并为 dense features 单独设计修复机制。论文把这一问题概括为：大规模 SSL 模型需要成为真正的 frozen universal visual encoder，就不能只看 ImageNet linear probe，而必须保证 patch-level consistency 也能在长训练中维持住。

##### 7B 基础模型：先把 DINO 路线扩到极限

在基础架构上，DINOv3 并没有抛弃 DINOv2，而是沿着这条路继续做大。论文先构建了一个 7B 参数的 ViT teacher，引入 axial RoPE 等现代位置编码设计，并改掉 DINOv2 中多段 cosine schedule 的做法，转而采用**常数超参数训练 1M iterations**。这一步的目的很明确：先证明在超大无标签数据上，自监督 teacher 本身可以继续扩展。

但作者紧接着就发现，单纯扩展虽然能继续提高 global representation，却会让 dense features 恶化。论文在多处可视化里展示了这个现象：patch token 之间的局部相似性随着训练推进变得越来越噪，说明模型在“看懂整张图”和“保留局部空间结构”之间发生了失衡。

##### Gram anchoring：不直接锁特征，而是锁特征之间的关系

DINOv3 最核心的创新是 Gram anchoring。作者不是直接要求学生 patch 特征去逼近某个旧 teacher 的特征向量，而是约束它们的 **Gram matrix**，也就是 patch 之间两两点积组成的相似性结构。记学生和 Gram teacher 的 L2 归一化局部特征分别为 \(X_S, X_G \in \mathbb{R}^{P \times d}\)，则：

$$
L_{\text{Gram}} =
\left\|
X_S X_S^\top - X_G X_G^\top
\right\|_F^2.
$$

这个设计的直觉非常强。若直接约束特征向量本身，学生会被强行锁死在旧表示上，不利于继续提升全局语义能力；而约束 Gram matrix 则只要求“局部 patch 之间的相对关系别崩”，允许具体特征坐标继续移动。换句话说，DINOv3 锁住的是 dense representation 的几何结构，而不是每个 token 的绝对数值。

论文进一步说明，Gram loss 只施加在 global crops 上，并且出于效率考虑，不是在一开始就用，而是**主训练完成 1M iterations 之后**才进入 refinement step。更关键的是，Gram teacher 不是固定死的，而是从早期 teacher 开始，在 refinement 阶段每隔 10k iterations 更新一次，使其逐步对齐当前 EMA teacher，但始终保留“局部特征更稳定”的参考作用。

##### 精炼阶段与高分辨率适配

Gram anchoring 并不是单独训练，而是被加进 refinement objective 中：

$$
L_{\text{Ref}} =
w_D L_{\text{DINO}} + L_{\text{iBOT}} + w_{DKL} D_{\text{Koleo}} + w_{\text{Gram}} L_{\text{Gram}}.
$$

这里最关键的是，它没有替换掉原本的 DINO / iBOT 自监督目标，而是在保持全局语义学习的同时，额外补上对 dense feature structure 的约束。论文观察到，加入 Gram objective 后，iBOT loss 会更快下降，说明 Gram anchoring 其实也在间接稳住 patch-level 学习过程。

在此基础上，DINOv3 还额外做了 high-resolution adaptation。作者指出，很多真实应用并不是在 \(224\) 或 \(518\) 分辨率下工作，而是需要 1K、2K 甚至 4K 输入。因此 DINOv3 在后处理阶段继续用 mixed-resolution global/local crops 训练，并继续使用 Gram anchoring，以保证模型在超高分辨率下仍能保持干净的局部特征图。这一点对分割、跟踪、匹配这类 dense tasks 很关键。

> 💡 关键：DINOv3 的本质不是“再做一个更大的 DINO”，而是明确把 dense feature degeneration 当成独立问题，并用 Gram matrix 约束专门修复它。

##### 多学生蒸馏：把 7B teacher 变成可用的模型家族

仅有 7B teacher 还不够实用，因此论文最后一步是蒸馏。它把 7B teacher 作为固定教师，蒸馏到多个 ViT 学生中，并设计了 **single-teacher / multi-student** 并行蒸馏流程：先在全局组共享 teacher inference，再把结果 all-gather 到各学生组分别训练。这样做的好处是 teacher 推理成本被多学生共享，新增学生主要只增加自己的训练成本，整体效率明显高于串行蒸馏。

最终，DINOv3 不只是一个大模型，而是一整套视觉基础模型家族。论文报告显示，冻结 backbone 即可在 COCO detection、ADE20K segmentation、DAVIS tracking 等任务上达到或超过当时专门设计的强基线，这也是它和“只会做图像分类的 SSL 模型”之间最本质的差别。

#### 🧪 练习题

```yaml
question: "DINOv3 中 Gram anchoring 的直接作用对象是什么？"
options:
  - "图像像素重建误差"
  - "学生与教师 patch 特征两两相似性构成的 Gram 矩阵"
  - "分类头的 softmax 概率"
  - "文本与图像的跨模态对齐分数"
answer: 1
explain: "DINOv3 不是直接对齐 patch 特征向量本身，而是约束学生和 Gram teacher 的 Gram matrix，从而稳住局部特征的关系结构并缓解 dense feature 退化。"
```
