### Movement Pruning

```yaml
id: movement_pruning
name: Movement Pruning
full_name: 运动剪枝 (Movement Pruning)
year: 2020
org: HuggingFace
paper_url: https://proceedings.neurips.cc/paper/2020/hash/eae15aabaa768ae4a5993a8a4f4fa6e4-Abstract.html
category: pruning
parent: lottery_ticket
motivation: 微调中根据权重趋势动态剪枝
```

#### 📝 一句话总结

Movement Pruning 提出在微调过程中根据权重“向零移动还是远离零”的趋势进行剪枝，解决了迁移学习场景下单纯按权重幅值剪枝无法识别任务适配方向的问题。

#### 🎯 核心要点

- 面向预训练语言模型微调，而非从头监督训练后的静态剪枝
- 为每个权重维护可学习剪枝分数 \(s_i\)，用 top-k 或阈值生成二值 mask
- 用一阶梯度近似判断权重移动方向，保留对下游任务有正贡献的连接
- 提出 hard movement pruning 和 soft movement pruning 两种 mask 形式
- 可与知识蒸馏结合，在高稀疏率下保持 BERT 下游任务性能
- 实验显示在只保留极少参数时明显优于 magnitude pruning

#### 🔬 深入细节

![Movement Pruning 权重移动示意图](https://ar5iv.labs.arxiv.org/html/2005.07683/assets/finetuning_delta_mvp.png)
*图：Movement Pruning 关注微调时权重相对零点的移动趋势，而不是只看当前绝对值大小。*

```python
# Movement Pruning 微调伪代码
initialize pretrained weights W
initialize score S = zeros_like(W)

for batch in finetuning_data:
    M = topk_mask(S, target_sparsity)       # hard movement
    logits = model_forward(W * M, batch.x)
    loss = task_loss(logits, batch.y) + distill_loss_if_used(logits)
    loss.backward()

    # 通过 straight-through estimator 更新分数
    W = optimizer_w.step(W.grad)
    S = optimizer_s.step(S.grad)
```

Magnitude pruning 默认“大权重重要，小权重不重要”。这个假设在从头训练的模型中常常有效，但在预训练语言模型微调中会失效：某些原本幅值较小的权重可能正在被下游任务推大，某些大权重则可能正被任务梯度拉向零。Movement Pruning 因此把“运动方向”作为重要性信号。

论文把剪枝写成带 mask 的优化问题：

$$
\mathbf{W}'=\mathbf{W}\odot \mathbf{M},\quad \mathbf{M}\in\{0,1\}^{|\mathbf{W}|}
$$

每个 mask 由分数 \(\mathbf{S}\) 决定。hard 版本直接用 top-k 选择保留权重，前向是离散 mask；反向通过 straight-through estimator 让梯度传到分数。soft 版本则用连续门控近似 mask，使训练更平滑。

从一阶近似看，若权重 \(w_i\) 被保留对损失有帮助，优化会让对应分数增加；若权重向零方向移动或对任务有负贡献，分数会下降。也就是说，Movement Pruning 不要求权重已经很大才保留，而是看它在微调任务中是否“值得继续长大”。

> 💡 关键：Movement Pruning 的剪枝决策发生在微调过程中，因此它能利用下游任务梯度；Magnitude pruning 通常是静态地看权重大小，容易误删正在变重要的连接。

训练流程通常包含稀疏率调度：从稠密或低稀疏开始，逐渐提高目标稀疏率，避免一开始就删除太多连接导致优化不稳定。论文还把该方法与蒸馏结合，让稀疏学生模型同时学习硬标签和教师 logits，在只保留很少参数时进一步稳定性能。

与 Lottery Ticket 思想相比，Movement Pruning 不强调寻找可重置的中奖子网络，而是利用预训练模型的下游微调轨迹。它更适合“已有大模型 + 小数据下游任务 + 需要压缩部署”的 NLP 迁移学习范式。

#### 🧪 练习题

```yaml
question: "Movement Pruning 与 Magnitude Pruning 的核心区别是什么？"
options:
  - "Movement Pruning 只剪 attention 层"
  - "Movement Pruning 根据微调中的权重运动趋势和梯度更新剪枝分数"
  - "Movement Pruning 不需要任何任务数据"
  - "Movement Pruning 只能做结构化层剪枝"
answer: 1
explain: "它关注权重在下游微调中是远离零还是靠近零，因此能保留对任务适配正在变重要的连接。"
```
