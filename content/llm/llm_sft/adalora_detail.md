### AdaLoRA：自适应低秩适配
```yaml
id: adalora
name: AdaLoRA
full_name: 自适应低秩适配 (AdaLoRA)
year: "2023.03"
org: Georgia Tech
paper_url: https://arxiv.org/abs/2303.10512
category: peft
parent: lora
motivation: SVD动态分配参数预算优化性能
```

#### 📝 一句话总结
AdaLoRA 提出用 SVD 形式重参数化 LoRA 增量矩阵，并根据奇异值三元组的重要性动态分配全局 rank 预算，解决标准 LoRA 对所有层/矩阵均匀分配参数导致预算浪费的问题。

#### 🎯 核心要点
- 将低秩更新从 LoRA 的两矩阵乘积改写为 SVD-like 形式 \(\Delta W=P\Lambda Q\)，用可训练奇异值向量控制每个增量矩阵的有效 rank。
- 通过正交约束让 \(P\) 与 \(Q\) 更接近左右奇异向量，避免每轮显式计算高维 SVD。
- 以“奇异值 + 对应左右向量”的 triplet 为剪枝单元，只把低重要性的奇异值置零，保留向量以便后续恢复。
- 设计 sensitivity-based importance score，将 \(|w\nabla_w \mathcal{L}|\)、指数滑动平均和不确定性估计组合起来衡量 triplet 对任务损失的贡献。
- 使用 global budget scheduler：先用略高于目标的初始预算探索，再按 schedule 逐步降到目标预算，最后冻结预算分布继续微调。
- 论文在 DeBERTaV3-base、BART-large 上覆盖 GLUE、SQuAD、XSum、CNN/DailyMail，重点验证低预算场景下 AdaLoRA 优于均匀 rank 的 LoRA/Adapter。

#### 🔬 深入细节
![AdaLoRA 中不同权重矩阵重要性差异](https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x1.png)
![AdaLoRA 中不同层重要性差异](https://ar5iv.labs.arxiv.org/html/2303.10512/assets/x2.png)
*图：论文 Figure 1 展示在相同参数预算下，选择不同权重矩阵或不同层进行 LoRA 微调会得到明显不同的 MNLI-m 表现；这正是 AdaLoRA 要解决的“均匀 rank 分配不合理”问题。*

```python
# AdaLoRA 核心训练流程（按论文 Algorithm 1 简化）
initialize P_i, Lambda_i, Q_i for every adapted weight W_i
initialize total rank budget b_t with a warmup -> cubic decay -> final budget schedule

for step in range(total_steps):
    batch = sample_minibatch(dataset)
    loss = task_loss(model(batch)) + lambda_reg * orthogonal_regularizer(P, Q)
    loss.backward()

    # 1. 估计每个可训练参数的敏感性
    for parameter w in {P_i, Lambda_i, Q_i}:
        sensitivity[w] = abs(w * grad(w))
        ema_sensitivity[w] = beta1 * ema_sensitivity[w] + (1 - beta1) * sensitivity[w]
        uncertainty[w] = beta2 * uncertainty[w] + (1 - beta2) * abs(sensitivity[w] - ema_sensitivity[w])
        importance[w] = ema_sensitivity[w] * uncertainty[w]

    # 2. 聚合到每个 SVD triplet：lambda_j 及其对应的 P[:, j], Q[j, :]
    for triplet in all_svd_triplets:
        score[triplet] = aggregate_importance(lambda_j, P_col_j, Q_row_j)

    optimizer.step()

    # 3. 按当前全局预算 b_t 保留 top-b_t 个 triplet，其余仅 mask 掉奇异值
    active_triplets = topk(score, k=b_t(step))
    mask_singular_values(Lambda, active_triplets)

return frozen_base_model + learned_adalora_parameters
```

LoRA 的基本假设是下游任务的权重增量 \(\Delta W\) 具有低内在秩，因此对一个预训练矩阵 \(W_0\) 只学习 \(\Delta W=BA\)，前向形式可写为 \(h=W_0x+BAx\)。问题在于标准 LoRA 通常为每个被适配矩阵指定同一个 rank \(r\)，等价于假设所有层、所有投影矩阵都同等重要。AdaLoRA 的 Figure 1 直接反驳了这个假设：在同样 0.28M 可训练参数下，FFN 矩阵比部分 attention projection 更有效，上层也明显比底层更值得分配预算。因此，AdaLoRA 不是单纯“减少参数”，而是把有限参数从低收益位置转移到高收益位置。

AdaLoRA 的关键重参数化是把每个增量矩阵写成近似 SVD：

$$
\Delta W_i=P_i\Lambda_iQ_i,
$$

其中 \(P_i\in\mathbb{R}^{d_1\times r}\)、\(Q_i\in\mathbb{R}^{r\times d_2}\)，\(\Lambda_i\) 是对角奇异值矩阵或向量。相比直接对 \(\Delta W_i\) 做精确 SVD 后截断，AdaLoRA 让 \(P_i,\Lambda_i,Q_i\) 参与梯度训练，并用正交正则近似奇异向量性质：

$$
\mathcal{R}(P_i,Q_i)=\lVert P_i^\top P_i-I\rVert_F^2+\lVert Q_iQ_i^\top-I\rVert_F^2.
$$

这个设计的直觉是：如果 \(P_i\) 与 \(Q_i\) 足够正交，那么按奇异值大小或重要性剪掉某些方向时，增量矩阵的扰动更接近真正的低秩截断，而不会像普通 LoRA 的 doublet 剪枝那样因为方向相关而产生剧烈不稳定。

预算分配的粒度不是单个参数，而是 triplet：第 \(j\) 个奇异值 \(\lambda_{i,j}\)、对应的左向量 \(P_i[:,j]\) 和右向量 \(Q_i[j,:]\)。AdaLoRA 为每个可训练参数估计一阶敏感性：

$$
s^{(t)}(w)=\left|w^{(t)}\nabla_w\mathcal{L}^{(t)}\right|.
$$

它表示如果把参数 \(w\) 移除，对当前损失可能造成多大影响。由于 mini-batch 噪声会让 \(s^{(t)}\) 抖动，论文进一步用指数滑动平均得到平滑敏感性 \(\bar{s}^{(t)}\)，并用局部偏差估计不确定性 \(\bar{u}^{(t)}\)，最终可写成类似 \(I(w)=\bar{s}^{(t)}(w)\bar{u}^{(t)}(w)\) 的参数级重要性。triplet 级分数再把 \(\lambda\)、\(P\) 列、\(Q\) 行的重要性聚合，例如：

$$
I_{i,j}=I(\lambda_{i,j})+\frac{1}{d_1}\sum_p I(P_i[p,j])+\frac{1}{d_2}\sum_q I(Q_i[j,q]).
$$

然后保留全局 top-\(b_t\) 个 triplet，其余只将对应奇异值 mask 为 0。

> 💡 关键：AdaLoRA 剪的是 \(\Lambda\) 中的奇异值，而不是删除 \(P\) 与 \(Q\) 的整列/整行。这样一个早期被误判为不重要的方向仍然能继续接收梯度并在后续步骤恢复，训练稳定性比硬删除 LoRA doublet 更好。

全局预算调度器控制当前总 rank \(b_t\)。训练初期预算略高于最终预算，让模型先探索更多方向；经过 warmup 后，预算按类似三次曲线逐步衰减：

$$
b_t=b_T+(b_0-b_T)\left(1-\frac{t-t_i}{t_f-t_i}\right)^3,
$$

其中 \(b_0\) 是初始预算，\(b_T\) 是目标预算，\(t_i\) 是开始剪枝前的 warmup 步数，\(t_f\) 是预算固定前的结束步数。最后阶段不再重新分配 rank，只在已选出的预算结构上继续微调。这个流程把“哪些层值得更高 rank”作为训练中动态学习出的结构，而不是由人工在训练前指定。

与传统 LoRA 相比，AdaLoRA 的优势来自两点叠加。第一，它把 rank 从静态超参数变成跨层共享的可调资源，适合预算极低、各模块重要性差异很大的场景。第二，它用 SVD-like 参数化降低 rank 调整的破坏性，使剪枝更接近“删除低贡献奇异方向”而非“任意删除低秩因子”。代价是训练逻辑更复杂，需要维护重要性统计、mask 和预算 schedule；但推理阶段仍可把有效增量合并回权重矩阵，不引入额外推理层。

#### 🧪 练习题
```yaml
question: "AdaLoRA 相比标准 LoRA 的核心改动是什么？"
options:
  - "把所有 LoRA rank 固定为更大的同一个值"
  - "用 SVD-like 增量参数化并按重要性动态分配全局 rank 预算"
  - "只微调 LayerNorm 和 bias 参数"
  - "把 LoRA adapter 改成额外的串行 MLP 模块"
answer: 1
explain: "AdaLoRA 的核心是用 PΛQ 表示增量，并根据 triplet 重要性剪奇异值，从而把预算分配给更关键的层和矩阵。"
```
