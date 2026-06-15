### AdaLoRA

```yaml
id: "adalora"
name: "AdaLoRA"
full_name: "自适应低秩适配 (AdaLoRA)"
year: "2023.03"
org: "Georgia Tech"
paper_url: "https://arxiv.org/abs/2303.10512"
category: "peft"
parent: "lora"
motivation: "SVD动态分配参数预算优化性能"
```

#### 📝 一句话总结

AdaLoRA 用 SVD 形式参数化低秩增量，并根据重要性动态分配各层各矩阵的秩预算，解决 LoRA 为所有模块预设固定 rank 导致参数分配不匹配的问题。

#### 🎯 核心要点

- 将增量矩阵写成 \(\Delta W=P\Lambda Q\)，把每个奇异值三元组视为可剪枝 rank 单元。
- 根据梯度敏感度和不确定性估计 rank 单元重要性。
- 在训练过程中逐步从较大初始预算裁剪到目标预算，而不是一开始固定 rank。
- 使用正交正则约束 \(P\) 和 \(Q\)，避免低秩方向退化或重复。
- 在 GLUE、SQuAD、summarization 等任务上比固定 rank LoRA 更稳。

#### 🔬 深入细节

![AdaLoRA 不同模块重要性差异](http://ar5iv.labs.arxiv.org/html/2303.10512/assets/x1.png)
*图源：论文 Figure 1(a)，同样参数预算下，不同权重矩阵的 LoRA 适配效果差异明显。*

![AdaLoRA 不同层重要性差异](http://ar5iv.labs.arxiv.org/html/2303.10512/assets/x2.png)
*图源：论文 Figure 1(b)，不同层的适配价值不同，固定 rank 会浪费预算。*

```python
# AdaLoRA 动态秩分配伪代码
for adapted_matrix in target_modules:
    P, lambda_vec, Q = init_svd_lora(max_rank=r_init)

for step, batch in enumerate(task_data):
    loss = model(batch).loss + orthogonal_regularization(P, Q)
    loss.backward()

    for triplet in all_svd_triplets:
        sensitivity = abs(triplet.value * triplet.grad)
        uncertainty = ema_abs_change(sensitivity)
        triplet.score = sensitivity * uncertainty

    if step in pruning_schedule:
        budget = scheduled_rank_budget(step)
        keep_topk_triplets(all_svd_triplets, k=budget)

    optimizer.step()
```

LoRA 的 rank 是人工指定的，常见做法是所有目标矩阵都使用相同 \(r\)。AdaLoRA 指出这会忽略模块差异：某些 FFN 或高层权重对任务更关键，某些注意力矩阵或低层权重贡献较小。固定 rank 等价于平均分配预算，可能把参数浪费在不重要位置。

AdaLoRA 用类 SVD 形式表示权重增量：

$$
\Delta W = P\Lambda Q
$$

其中 \(\Lambda\) 的每个对角元素对应一个 rank 单元，连同 \(P\) 的一列和 \(Q\) 的一行构成一个可保留或剪枝的三元组。这样 rank allocation 被转化为选择哪些奇异值三元组值得保留。

重要性估计结合当前梯度敏感度和历史不确定性。直觉上，如果某个三元组的参数变化会强烈影响 loss，且这种重要性在训练中持续显著，就应该保留；反之可剪枝。训练采用预算调度：早期保留较大 rank 充分探索，随后周期性剪掉低分三元组，最终达到目标参数预算。

正交正则用于保持 \(P\) 和 \(Q\) 的方向多样性：

$$
\mathcal{R}(P,Q)=\lVert P^\top P-I\rVert_F^2 + \lVert QQ^\top-I\rVert_F^2
$$

这避免多个 rank 单元学习到重复方向，使重要性排序更有意义。与 LoRA 相比，AdaLoRA 的收益来自“同样参数预算下放到更该放的位置”，而不是单纯增加 rank。

> 💡 关键：AdaLoRA 把 PEFT 的问题从“选一个全局 rank”改成“在所有层和矩阵之间做预算分配”。

#### 🧪 练习题

```yaml
question: "AdaLoRA 相比 LoRA 的核心变化是什么？"
options:
  - "固定所有层使用同一个 rank"
  - "用 SVD rank 单元的重要性评分动态分配参数预算"
  - "完全取消低秩分解"
  - "只训练输入 soft prompt"
answer: 1
explain: "AdaLoRA 把每个奇异值三元组视为可剪枝单元，根据重要性保留高价值 rank。"
```
