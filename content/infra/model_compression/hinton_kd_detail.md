### Hinton KD

```yaml
id: hinton_kd
name: Hinton KD
full_name: 知识蒸馏 (Knowledge Distillation)
year: 2015
org: Google
paper_url: https://arxiv.org/abs/1503.02531
category: distillation
parent: —
motivation: 引入Soft Targets和温度系数T
```

#### 📝 一句话总结

Hinton KD 提出用教师模型的 soft targets 训练小学生模型，并通过温度系数 \(T\) 暴露类别间暗知识，解决了大模型或集成模型推理昂贵但知识可迁移到小模型的问题。

#### 🎯 核心要点

- 将 cumbersome model 或模型集成作为教师，将轻量模型作为学生
- 用温度 \(T\) 软化 softmax，使非正确类别的相对概率携带类别相似性
- 学生同时学习硬标签交叉熵与教师软标签蒸馏损失
- 训练时使用高温 soft targets，推理时学生恢复普通温度
- 引入 specialist models 作为专门区分易混细类的教师补充
- 在 MNIST 和大规模语音识别中展示小模型吸收大模型知识的可行性

#### 🔬 深入细节

![Google Research 论文页面图](https://storage.googleapis.com/gweb-research2023-media/images/HO_previewImage1.width-800.format-jpeg.jpg)
*图：Hinton KD 原论文没有单独架构图；此处引用 Google Research 论文页面公开图，核心流程见下方伪代码。*

```python
# Hinton Knowledge Distillation 伪代码
for x, y in train_loader:
    with no_grad():
        teacher_logits = teacher(x)
        p_teacher = softmax(teacher_logits / T)

    student_logits = student(x)
    p_student_T = log_softmax(student_logits / T)
    loss_soft = KLDivLoss(p_student_T, p_teacher) * (T * T)
    loss_hard = CrossEntropyLoss(student_logits, y)
    loss = alpha * loss_soft + (1 - alpha) * loss_hard
    update(student, loss)
```

知识蒸馏的核心不是简单复制教师的 top-1 预测，而是学习完整概率分布。硬标签只告诉学生“正确类是谁”，soft targets 还告诉学生“哪些错误类更像正确类”。例如图像中数字 3 被教师分给 8 的概率可能高于 1，这种相对概率就是暗知识。

温度 softmax 定义为：

$$
p_i=\frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}
$$

当 \(T>1\) 时，分布更平滑，低概率类别之间的差异被放大，学生能看到更多类别关系。训练时常把蒸馏项乘以 \(T^2\)，抵消高温导致梯度尺度变小的问题。

学生的总损失通常写成：

$$
\mathcal{L}=(1-\alpha)\mathrm{CE}(y,p_s)+\alpha T^2\mathrm{KL}(p_t^T\|p_s^T)
$$

其中 \(p_t^T\) 和 \(p_s^T\) 分别是教师、学生在温度 \(T\) 下的分布。硬标签负责保证任务目标，软标签负责传递教师对类别空间的结构认知。

> 💡 关键：KD 压缩的是函数行为，而不是参数本身。学生模型可以结构完全不同，只要能拟合教师输出分布，就能吸收教师知识。

与直接训练小模型相比，KD 提供了更丰富的监督信号；与部署大集成相比，KD 把多个模型的知识折叠到一个小模型中。后续 DistilBERT、TinyBERT、MiniLLM 等方法都延续了这一思想，只是蒸馏对象从分类 logits 扩展到隐藏层、注意力图和生成序列分布。

#### 🧪 练习题

```yaml
question: "Hinton KD 中温度 T 的主要作用是什么？"
options:
  - "减少学生模型层数"
  - "软化教师概率分布，让非正确类别的相对关系更明显"
  - "把权重量化到 INT8"
  - "替代交叉熵中的真实标签"
answer: 1
explain: "较高温度会让 softmax 分布更平滑，使学生能学习教师对错误类别相似性的判断。"
```
