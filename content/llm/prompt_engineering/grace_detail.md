### GRACE：门控精炼压缩 (GRACE)
```yaml
id: grace
name: GRACE
full_name: 门控精炼压缩 (GRACE)
year: '2026.01'
org: NeurIPS
paper_url: https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html
category: frontier_2026
parent: opro
motivation: 门控机制精炼指令压缩冗余信息
```

#### 📝 一句话总结
GRACE 使用门控与拒答感知的条件遗忘机制，在多模态大模型中局部移除目标知识，同时尽量保留相关但不应删除的邻近知识。

#### 🎯 核心要点
- 论文中的 GRACE 实际聚焦多模态大模型知识遗忘，而不是普通 prompt 压缩
- 通过门控判断目标知识应局部遗忘还是需要更全局的条件更新
- 将 KL 约束从输出分布扩展到特征层，观察知识变化范围
- 对目标样本执行遗忘更新，同时用 retain 数据保护非目标能力
- 引入拒答感知训练，避免模型对无关问题过度拒绝
- 适合需要删除敏感实体、版权内容或错误知识的 MLLM 场景

#### 🔬 深入细节
[论文公开摘要页](https://proceedings.neurips.cc/paper_files/paper/2025/hash/7f9a44cb707ede42a659ad85d940dd55-Abstract-Conference.html)；[NeurIPS 论文 PDF 图源](https://proceedings.neurips.cc/paper_files/paper/2025/file/7f9a44cb707ede42a659ad85d940dd55-Paper-Conference.pdf)。

```python
# GRACE 条件遗忘伪代码
def grace_unlearn(model, forget_batch, retain_batch, threshold):
    for x_forget in forget_batch:
        feature_shift = estimate_feature_kl_shift(model, x_forget)
        retain_loss = preserve_outputs(model, retain_batch)
        refusal_loss = suppress_over_refusal(model, random_irrelevant_images())

        if feature_shift < threshold:
            # 局部知识：直接对目标样本做遗忘更新
            loss = gradient_ascent_forget_loss(model, x_forget) + retain_loss + refusal_loss
        else:
            # 全局关联知识：门控混合目标梯度与保留梯度
            gated_grad = gate(
                forget_gradient(model, x_forget),
                retain_gradient(model, retain_batch),
            )
            apply_gradient(model, gated_grad)
            continue

        model.update(loss)
    return model
```

GRACE 解决的是多模态模型遗忘中的两个冲突目标：既要让模型忘掉指定目标知识，又不能把邻近知识、通用视觉语言能力或正常回答行为一起破坏。简单的梯度上升会让目标答案概率下降，但也可能损伤相关实体、相似图像和一般问答能力。

门控机制用于判断知识影响范围。若特征层扰动显示目标知识较局部，模型可以直接在目标样本上执行遗忘；若扰动影响更广，说明该知识与其他概念强相关，就需要将遗忘梯度与保留梯度条件组合。这个门控避免了“一刀切”地删除整片相关知识。

拒答感知是另一个关键点。很多遗忘方法会让模型学到一种捷径：遇到类似输入就拒绝回答。GRACE 通过保留数据和随机无关图像构造训练信号，使模型只在真正触及目标知识时回避，而不是扩大拒答范围。这对多答案、多实体和视觉相似样本尤其重要。

虽然 manifest 将 GRACE 放在 prompt optimization 前沿中，它的方法论价值更接近“门控精炼”：先估计更新会影响哪些内部表征，再按影响范围压缩或过滤更新方向。迁移到提示优化时，这个思想对应于删除冗余指令、保留关键约束、避免优化一步破坏原本有效的行为。

#### 🧪 练习题
```yaml
question: "GRACE 中门控机制的主要作用是什么？"
options:
  - "决定遗忘更新应局部执行还是与保留梯度条件组合"
  - "把所有输入都变成拒答"
  - "随机删除视觉 token"
  - "生成更多候选 prompt"
answer: 0
explain: "门控根据目标知识对特征空间的影响范围，选择更合适的遗忘更新方式。"
```
