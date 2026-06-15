### DistilBERT

```yaml
id: distilbert
name: DistilBERT
full_name: 蒸馏BERT (DistilBERT)
year: 2019
org: HuggingFace
paper_url: https://arxiv.org/abs/1910.01108
category: distillation
parent: hinton_kd
motivation: 预训练阶段三重损失蒸馏保留97%性能
```

#### 📝 一句话总结

DistilBERT 将知识蒸馏提前到 BERT 预训练阶段，用三重损失训练一个层数减半的通用语言表示模型，在减少约 40% 参数、提升约 60% 推理速度的同时保留约 97% 语言理解能力。

#### 🎯 核心要点

- 学生模型保留 BERT 的 hidden size 和 vocabulary，但层数从 12 层减为 6 层
- 用教师 BERT 的每隔一层参数初始化学生，提高预训练蒸馏稳定性
- 去掉 token-type embeddings 和 NSP 目标，聚焦 masked language modeling
- 三重损失：MLM loss、蒸馏 soft target loss、隐藏状态 cosine embedding loss
- 在预训练阶段获得通用小模型，再像 BERT 一样 fine-tune 到下游任务
- 在 GLUE 等任务上保持接近 BERT-base 的性能，并更适合边端/低资源部署

#### 🔬 深入细节

![DistilBERT 参数规模对比图](https://ar5iv.labs.arxiv.org/html/1910.01108/assets/GOOD_big.png)
*图：DistilBERT 论文展示了预训练语言模型参数规模快速增长，说明压缩通用表示模型的必要性。*

```python
# DistilBERT 预训练蒸馏伪代码
student = init_from_every_other_layer(bert_base_teacher, num_layers=6)
for tokens in pretraining_corpus:
    teacher_logits, teacher_hidden = teacher(tokens, output_hidden=True)
    student_logits, student_hidden = student(tokens, output_hidden=True)

    loss_mlm = cross_entropy(student_logits[masked_pos], labels[masked_pos])
    loss_kd = KLDivLoss(log_softmax(student_logits / T),
                        softmax(teacher_logits / T)) * T * T
    loss_cos = 1 - cosine_similarity(student_hidden[-1], teacher_hidden[-1]).mean()
    loss = lambda_mlm * loss_mlm + lambda_kd * loss_kd + lambda_cos * loss_cos
    update(student, loss)
```

多数早期 BERT 蒸馏关注下游任务 fine-tuning 后的小模型，而 DistilBERT 的关键是预训练阶段蒸馏。这样得到的是一个通用学生模型，可复用到多个任务，而不是每个任务单独蒸馏一次。它保留 BERT 的表示维度，让学生仍能使用类似的下游分类头。

三重损失分别约束不同层面的知识。MLM loss 保证学生仍学习语言建模任务；蒸馏 loss 让学生 logits 接近教师 logits；cosine loss 直接拉近学生和教师隐藏表示方向：

$$
\mathcal{L}=\lambda_{\mathrm{MLM}}\mathcal{L}_{\mathrm{MLM}}+\lambda_{\mathrm{KD}}T^2\mathrm{KL}(p_t^T\|p_s^T)+\lambda_{\cos}(1-\cos(\mathbf{h}_s,\mathbf{h}_t))
$$

其中 hidden cosine loss 的作用是防止学生只拟合输出词分布，却学不到教师中间表示的语义几何。

> 💡 关键：DistilBERT 的压缩主要来自“少层数”，不是降低 hidden size。这样可减少串行 Transformer 层带来的延迟，同时保持每层表示容量。

初始化也很重要。学生 6 层通常从 BERT-base 的 12 层中隔层抽取初始化，避免从随机小模型开始追教师造成优化困难。预训练完成后，DistilBERT 可以像 BERT 一样对 GLUE、SQuAD 等任务 fine-tune。

与 Hinton KD 相比，DistilBERT 把蒸馏从分类输出扩展到了 masked LM 预训练和隐藏表示对齐。与 TinyBERT 相比，它的中间层监督较少、结构更简洁，因此是一种轻量实用的通用 BERT 压缩基线。

#### 🧪 练习题

```yaml
question: "DistilBERT 的三重损失不包括以下哪一项？"
options:
  - "Masked language modeling loss"
  - "教师 soft logits 的蒸馏损失"
  - "学生与教师隐藏状态的 cosine loss"
  - "Hessian 逆矩阵二阶量化损失"
answer: 3
explain: "DistilBERT 是蒸馏方法，不使用 GPTQ 那类 Hessian 逆二阶量化目标。"
```
