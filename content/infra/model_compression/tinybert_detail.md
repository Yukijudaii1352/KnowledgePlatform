### TinyBERT

```yaml
id: tinybert
name: TinyBERT
full_name: 微型BERT (TinyBERT)
year: 2020
org: 华为
paper_url: https://aclanthology.org/2020.findings-emnlp.372/
category: distillation
parent: distilbert
motivation: 两阶段蒸馏涵盖嵌入中间预测层
```

#### 📝 一句话总结

TinyBERT 提出面向 Transformer 的两阶段知识蒸馏框架，在通用预训练和任务微调阶段同时蒸馏 embedding、attention、hidden states 与 prediction layer，解决了只蒸馏 logits 难以充分压缩 BERT 内部表示的问题。

#### 🎯 核心要点

- 设计 Transformer distillation，将教师知识拆成嵌入层、注意力矩阵、隐藏状态和预测 logits
- 使用两阶段学习：general distillation 学通用语言知识，task-specific distillation 学下游任务知识
- 支持层映射，把教师 BERT 的多层知识对齐到较浅的 TinyBERT 学生层
- 注意力蒸馏直接对齐 multi-head attention 矩阵，保留 token 间关系
- 隐藏层蒸馏用线性变换对齐不同 hidden size 后计算表示损失
- TinyBERT4 在 GLUE 上保留教师大部分性能，同时显著减少参数和推理时间

#### 🔬 深入细节

![TinyBERT 学习框架图](https://ar5iv.labs.arxiv.org/html/1909.10351/assets/x1.png)
*图：TinyBERT 通过两阶段 Transformer distillation，把教师 BERT 的多层知识迁移到小学生模型。*

```python
# TinyBERT 两阶段蒸馏伪代码
for stage in ["general_distillation", "task_specific_distillation"]:
    data = general_corpus if stage == "general_distillation" else augmented_task_data
    for x, y in data:
        teacher_outputs = teacher(x, output_attn=True, output_hidden=True)
        student_outputs = student(x, output_attn=True, output_hidden=True)

        loss_emb = mse(student.embedding, teacher.embedding)
        loss_attn = sum(mse(A_s, A_t) for A_s, A_t in mapped_attentions)
        loss_hidden = sum(mse(W_h @ H_s, H_t) for H_s, H_t in mapped_hiddens)
        loss_pred = KLDivLoss(log_softmax(z_s / T), softmax(z_t / T)) * T * T
        update(student, loss_emb + loss_attn + loss_hidden + loss_pred)
```

TinyBERT 的出发点是：BERT 的知识不只存在于最终 logits。Transformer 的 attention 矩阵记录 token 之间的依赖，隐藏状态记录上下文语义，embedding 层记录词表基础表示。如果只用 Hinton KD 的输出分布，学生可能学到任务答案，却丢失教师内部推理路径。

对于第 \(m\) 个学生层，TinyBERT 会映射到教师的某一层 \(g(m)\)。attention 蒸馏可写成：

$$
\mathcal{L}_{\mathrm{attn}}=\frac{1}{h}\sum_i\|\mathbf{A}_{s,i}^{m}-\mathbf{A}_{t,i}^{g(m)}\|_2^2
$$

隐藏状态维度不一致时，TinyBERT 使用可学习线性变换 \(\mathbf{W}_h\) 对齐学生表示：

$$
\mathcal{L}_{\mathrm{hidn}}=\|\mathbf{W}_h\mathbf{H}_s^m-\mathbf{H}_t^{g(m)}\|_2^2
$$

> 💡 关键：TinyBERT 的“深蒸馏”覆盖 Transformer 内部结构，因此比只蒸馏最终预测层更适合压缩多层语言表示模型。

两阶段设计也很关键。general distillation 在大规模语料上压缩通用 BERT 知识；task-specific distillation 在下游任务数据及其增强样本上进一步对齐任务决策边界。这样学生既不是纯通用小模型，也不是只靠小任务数据硬拟合的模型。

与 DistilBERT 相比，TinyBERT 的蒸馏信号更细，尤其显式对齐 attention 和中间层；代价是训练流程更复杂，需要教师中间输出和任务数据增强。它适合对小模型精度要求更高、可接受额外离线蒸馏成本的场景。

#### 🧪 练习题

```yaml
question: "TinyBERT 相比只蒸馏 logits 的方法，多蒸馏了哪些 Transformer 内部知识？"
options:
  - "attention 矩阵、隐藏状态和 embedding 表示"
  - "GPU kernel 调度策略"
  - "Hessian 逆矩阵"
  - "稀疏 KV cache 元数据"
answer: 0
explain: "TinyBERT 的 Transformer distillation 显式对齐嵌入层、注意力矩阵、隐藏状态和预测层。"
```
