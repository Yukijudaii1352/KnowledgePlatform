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

Movement Pruning 提出在预训练语言模型微调过程中根据权重是“远离零”还是“靠近零”的运动趋势来学习剪枝 mask，解决了迁移学习场景中单纯按权重幅值剪枝无法反映下游任务适配方向的问题。

#### 🎯 核心要点

- 面向 BERT 等预训练语言模型的下游微调压缩，而不是从头训练完成后的静态剪枝
- 为每个可剪权重维护一个并行重要性分数 \(\mathbf{S}\)，通过 top-\(v\) 或阈值函数生成二值 mask \(\mathbf{M}\)
- hard movement pruning 使用 \(\mathrm{Top}_v(\mathbf{S})\) 保留最高分连接，并用 straight-through estimator 让梯度穿过离散 mask
- soft movement pruning 用阈值化分数和正则项控制稀疏率，使分数持续受到向下压力
- 重要性信号来自微调中的一阶梯度与权重方向，倾向保留正在远离零、对任务适配变重要的连接
- 使用渐进稀疏率调度和可选知识蒸馏，在高稀疏率下显著优于 magnitude pruning
- 论文在 SQuAD v1.1、MNLI、QQP 上剪枝 BERT-base，并报告结合蒸馏时可在只保留约 3% 参数下保持较小精度损失

#### 🔬 深入细节

![Movement Pruning 权重运动对比图](https://ar5iv.labs.arxiv.org/html/2005.07683/assets/finetuning_delta_mvp.png)
*图：来源为论文 Figure 1 的 ar5iv 渲染。Magnitude pruning 倾向保留远离 0 的大幅值权重，Movement pruning 则关注微调期间相对初始值和 0 点的运动方向。*

```python
# Movement Pruning 微调剪枝伪代码
def movement_pruning_finetune(model, task_loader, final_keep_ratio):
    W = model.trainable_weights()
    S = {name: zeros_like(weight) for name, weight in W.items()}

    for step, batch in enumerate(task_loader):
        keep_ratio = cubic_keep_ratio_schedule(step, final_keep_ratio)

        masks = {}
        for name, score in S.items():
            # hard movement pruning: 全局或分层保留分数最高的 keep_ratio
            masks[name] = topk_binary_mask(score, keep_ratio)

        logits = model.forward_with_masks(batch.inputs, masks)
        loss = supervised_task_loss(logits, batch.labels)
        if has_teacher():
            loss = loss + distillation_loss(logits, teacher_logits(batch.inputs))

        loss.backward()

        # W 正常由任务梯度更新；S 通过 STE 接收 mask 梯度
        optimizer_w.step(W)
        optimizer_s.step(S)
        optimizer_w.zero_grad()
        optimizer_s.zero_grad()

    return export_sparse_model(model, masks)
```

Movement Pruning 先把通用剪枝写成带 mask 的前向计算。对权重矩阵 \(\mathbf{W}\)、重要性分数 \(\mathbf{S}\) 和二值 mask \(\mathbf{M}\)，输入 \(\mathbf{x}\) 的线性输出为：

$$
\mathbf{a}=(\mathbf{W}\odot\mathbf{M})\mathbf{x},\quad
\mathbf{M}\in\{0,1\}^{n\times n}
$$

保留比例为 \(v\) 时，hard 版本用 top-\(v\) 函数生成 mask：

$$
\mathrm{Top}_v(\mathbf{S})_{i,j}=
\begin{cases}
1,& S_{i,j}\ \text{in top }v\%\\
0,& \text{otherwise}
\end{cases}
$$

Magnitude pruning 的分数是 \(\mathbf{S}=|\mathbf{W}|\)，本质上只看当前权重离 0 多远。这个假设在迁移学习微调中会变弱：预训练权重通常不会大幅离开原始值，因此“现在小”不等于“对下游任务不重要”，“现在大”也不等于“应该保留”。Movement Pruning 把分数 \(\mathbf{S}\) 作为可学习变量，在微调时与权重一起更新，让下游任务梯度参与决定哪些连接留下。

hard movement pruning 的困难是 \(\mathrm{Top}_v\) 几乎处处不可导。论文采用 straight-through estimator：前向仍使用离散 mask，反向时忽略 top-\(v\) 的不可导性，把 mask 梯度近似传给分数。对单个线性输出 \(a_i=\sum_j W_{i,j}M_{i,j}x_j\)，可把分数梯度直观写成：

$$
\frac{\partial\mathcal{L}}{\partial S_{i,j}}
\approx
\frac{\partial\mathcal{L}}{\partial M_{i,j}}
=
\frac{\partial\mathcal{L}}{\partial a_i}W_{i,j}x_j
$$

SGD 更新 \(S_{i,j}\leftarrow S_{i,j}-\eta\partial\mathcal{L}/\partial S_{i,j}\)。如果 \(W_{i,j}>0\) 且任务梯度推动它继续增大，那么上式为负，分数会上升；如果 \(W_{i,j}<0\) 且任务梯度推动它继续变得更负，分数同样会上升。也就是说，分数累计的是“权重远离 0 的证据”；相反，朝 0 收缩或对任务损失没有正贡献的连接会逐步失去分数。

> 💡 关键：Movement Pruning 的一阶信号不是梯度绝对值大小，而是梯度方向和权重符号的组合。它保留的是下游微调正在使用的连接，而不只是预训练模型里已经幅值较大的连接。

soft movement pruning 则把 top-\(v\) 换成阈值 mask，例如 \(M_{i,j}=\mathbf{1}\{S_{i,j}>\tau\}\)，并加入鼓励分数下降的正则项来间接控制稀疏率。它比 hard 版本少了每一步显式 top-k 排序的刚性，但需要调节阈值和正则强度。两种版本通常都配合渐进稀疏率调度：先 warm-up 做正常微调，再逐步提高目标稀疏率，最后 cool-down 稳定已形成的稀疏结构，避免训练早期一次性删除过多连接。

实验设置也体现了它与 Lottery Ticket/静态剪枝的区别。论文对 BERT-base 的 transformer 层和任务头做微调剪枝，冻结 embedding，并在 SQuAD v1.1、MNLI、QQP 等任务上评估。低稀疏率时 magnitude pruning 仍然很强，因为大幅值权重通常可靠；但当只保留很少参数时，Movement Pruning 能利用任务数据重新排序连接重要性，因此明显更稳。结合蒸馏时，稀疏学生模型还学习教师 logits，能在极高压缩率下减少任务性能损失。

#### 🧪 练习题

```yaml
question: "Movement Pruning 相比 Magnitude Pruning 的核心区别是什么？"
options:
  - "只剪除 attention head，不剪除 MLP 权重"
  - "根据微调时权重远离零或靠近零的趋势学习重要性分数"
  - "完全不需要下游任务数据"
  - "使用二阶 Hessian 精确计算每个权重的删除损失"
answer: 1
explain: "Movement Pruning 在微调中学习分数，并通过一阶梯度方向判断连接是否正在被下游任务推离 0，因此比静态幅值规则更适合迁移学习压缩。"
```
