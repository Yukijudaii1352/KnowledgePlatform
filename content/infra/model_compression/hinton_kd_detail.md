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

Hinton KD 提出用大模型或模型集成的 soft targets 训练小模型，并通过温度系数 \(T\) 放大非正确类别之间的相对概率，解决了强教师模型部署昂贵但其泛化行为可以迁移到轻量学生模型的问题。

#### 🎯 核心要点

- 将 cumbersome model、强正则大模型或模型集合作为教师，将更小、更适合部署的模型作为学生
- 用高温 softmax 生成 soft targets，让低概率类别之间的相对大小携带“暗知识”
- 学生训练时同时匹配教师软分布和真实硬标签，推理时恢复普通温度 \(T=1\)
- 软目标损失通常乘以 \(T^2\)，抵消高温导致的梯度尺度缩小
- 证明高温极限下匹配 soft targets 近似等价于匹配 zero-mean logits
- 引入 generalist + specialist models：通用模型覆盖全类别，专家模型专门区分易混类别簇
- 在 MNIST、Android 语音识别声学模型和 JFT specialist 实验中验证蒸馏与软目标正则化效果

#### 🔬 深入细节

![知识蒸馏教师-学生流程图](https://upload.wikimedia.org/wikipedia/commons/e/e8/Knowledge-distillation-example.png)
*图源：Wikimedia Commons CC0 图，原 Hinton KD 论文没有单独架构图；该图展示教师 soft labels、学生 soft predictions、硬标签监督和蒸馏损失的标准流程。*

```python
# Hinton Knowledge Distillation 的标准训练伪代码
for x, y in transfer_loader:
    with no_grad():
        teacher_logits = teacher_or_ensemble(x)
        teacher_soft = softmax(teacher_logits / T)

    student_logits = student(x)
    student_soft_log = log_softmax(student_logits / T)
    student_hard = softmax(student_logits)       # 推理温度对应 T=1

    loss_soft = KLDivLoss(student_soft_log, teacher_soft) * (T * T)
    loss_hard = CrossEntropyLoss(student_logits, y)
    loss = alpha * loss_soft + (1 - alpha) * loss_hard

    loss.backward()
    optimizer.step()
```

论文的出发点是把“知识”从参数值中解耦出来。教师模型可以是一个大网络，也可以是多个模型预测分布的平均；学生不需要复制教师结构，只需要学习教师从输入到输出分布的映射。对于部署场景，训练阶段可以承受大模型和集成的成本，推理阶段则需要把这种泛化能力折叠进一个小模型。

温度 softmax 是 Hinton KD 的核心机制。给定 logit \(z_i\)，带温度的类别概率为：

$$
p_i^{(T)}=\frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}
$$

当 \(T>1\) 时，分布变平，非正确类别不再全部贴近 0。硬标签只告诉学生“BMW 不是垃圾车也不是胡萝卜”，而教师 soft target 会告诉学生“BMW 被误认为其他汽车的概率远高于被误认为胡萝卜”。这些错误类别之间的相对概率就是论文强调的 dark knowledge。

常用的蒸馏目标写作：

$$
\mathcal{L}
=(1-\alpha)\,\mathrm{CE}\left(y,\mathrm{softmax}(\mathbf{z}_s)\right)
+\alpha T^2\,\mathrm{KL}\left(p_t^{(T)}\|p_s^{(T)}\right)
$$

其中 \(p_t^{(T)}\) 与 \(p_s^{(T)}\) 分别是教师和学生在高温下的分布。高温会让 softmax 梯度随 \(T\) 变小，论文指出软目标项的梯度量级大致按 \(1/T^2\) 缩放，因此实践中把蒸馏项乘以 \(T^2\)，使调节温度时软目标与硬标签的相对权重不至于被意外改变。

论文还解释了为什么“匹配 logits”是蒸馏的一个特例。在 \(T\) 足够大且每个样本的 logits 做零均值处理时，softmax 可以线性化，交叉熵梯度近似为：

$$
\frac{\partial C}{\partial z_i}
\approx \frac{1}{N T^2}(z_i-v_i)
$$

这里 \(z_i\) 是学生 logit，\(v_i\) 是教师 logit，\(N\) 是类别数。也就是说，高温蒸馏近似在拉近教师和学生的 logit 差值；但在中等温度下，极低概率类别的噪声会被自然压低，学生更关注教师真正有意义的类别关系。

> 💡 关键：KD 的目标不是让学生追求教师 top-1 答案，而是让学生学习教师如何分配“剩余概率质量”。这使每个样本提供的监督从一个类别扩展为完整类别相似性结构。

在训练流程上，transfer set 可以是原训练集，也可以是未标注迁移数据；若有真实标签，论文建议用软目标损失和硬标签损失的加权平均。硬标签防止学生在教师不确定或教师错误时偏离任务目标，软标签则起到更低方差、更强正则化的监督作用。论文在语音识别中展示，10 个模型集成的帧分类准确率提升大部分可以迁移到单个蒸馏模型，并且 WER 保持在集成水平附近。

specialist models 是论文的另一项重要设计。generalist 模型负责全类别预测，specialist 模型只关注通用模型容易混淆的一簇类别，把其余类别合成 dustbin 类，从而用小 softmax 学习细粒度区分。推理时先由 generalist 找到 top 类别集合，再激活覆盖这些类别的 specialists，并求一个全局分布 \(q\) 来同时贴近 generalist 和 active specialists：

$$
\min_q\ \mathrm{KL}(p_g\|q)+\sum_{m\in\mathcal{A}}\mathrm{KL}(p_m\|q_m)
$$

这一部分说明 KD 不只是一条 teacher-student 训练技巧，也是一种把多个互补模型的判断合并再压缩的框架。后来的 DistilBERT、TinyBERT、MiniLLM 等方法延续了 Hinton KD 的思想，但把蒸馏信号从分类 logits 扩展到隐藏状态、注意力、序列分布和生成策略。

#### 🧪 练习题

```yaml
question: "Hinton KD 中温度 T 的主要作用是什么？"
options:
  - "让教师模型参数更少"
  - "软化类别概率分布，使非正确类别之间的相对概率更明显"
  - "把学生模型权重量化到低比特"
  - "完全替代真实标签，不再需要交叉熵"
answer: 1
explain: "较高温度会让 softmax 分布更平滑，使学生看到教师对错误类别相似性的判断；训练中通常仍会结合硬标签。"
```
