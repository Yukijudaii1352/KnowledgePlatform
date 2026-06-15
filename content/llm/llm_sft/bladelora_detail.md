### BladeLoRA
```yaml
id: bladelora
name: BladeLoRA
full_name: 刀片式低秩适配 (BladeLoRA)
year: '2025.01'
org: ByteDance
paper_url: https://arxiv.org/abs/2501.02245
category: frontier
parent: adalora
motivation: 自适应秩选择与剪枝提升效率
```

#### 📝 一句话总结
BladeLoRA 提出按层重要性分配递增 LoRA rank、再用对齐和剪枝控制成本的适配流程，解决固定 rank LoRA 对不同层/不同任务容量需求不匹配的问题。

#### 🎯 核心要点
- 公开 Springer 页面显示 manifest 中的 arXiv 链接并非 BladeLoRA 论文，因此正文使用 Springer/DBLP 公开页面补足。
- 设计线性递增的 rank 序列，让更深层获得更高 LoRA 容量，体现不同层重要性差异。
- 调整特定层矩阵权重，使低秩适配结果更接近全参数微调行为。
- 为抵消更高 rank 和对齐步骤带来的额外计算，加入两类剪枝策略以适配不同规模大模型。
- 在 T5 和 Llama2 上验证，定位为 LoRA/AdaLoRA 后的自适应 rank 与 pruning 变体。

#### 🔬 深入细节
![LoRA A/B 低秩分支结构](https://dkopi.github.io/vera/diagram.png)
*图源：VeRA 官方项目页中的 LoRA/VeRA 对比图。BladeLoRA 在标准 LoRA A/B 分支上调整逐层 rank、对齐和剪枝；论文正文图需订阅访问。公开摘要页：https://link.springer.com/chapter/10.1007/978-3-032-02899-0_6*

```python
# BladeLoRA 公开机制整理伪代码
layers = transformer.layers
rank_schedule = linear_increasing_rank(
    num_layers=len(layers),
    r_min=r_base,
    r_max=r_deep
)

for layer_id, layer in enumerate(layers):
    r_l = rank_schedule[layer_id]
    layer.lora_A, layer.lora_B = init_lora(rank=r_l)

for step, batch in enumerate(data):
    # 1. 低秩适配训练
    loss = task_loss(model(batch))

    # 2. 对齐特定层，使低秩更新逼近全参微调方向/权重变化
    align_loss = gradient_or_weight_alignment(layer.lora_delta, full_ft_proxy)
    total_loss = loss + lambda_align * align_loss
    update_lora(total_loss)

    # 3. 根据模型规模选择剪枝策略
    if is_medium_model(model):
        prune_low_importance_lora_channels(score="rank_importance")
    else:
        prune_structured_blocks(score="layer_or_channel_importance")
```

BladeLoRA 的公开摘要指出，固定 rank 是当前 LoRA 系列方法的主要不足之一。Transformer 各层对下游任务的贡献并不均匀，浅层更偏词法/局部模式，深层更偏任务语义和生成决策。如果所有层使用同一个 rank，会在不重要层浪费参数，同时在关键层容量不足。BladeLoRA 用递增 rank 序列把更多低秩容量分配给更深层。

与 AdaLoRA 的关系可以理解为：AdaLoRA 动态调整 rank 预算，而 BladeLoRA 的公开描述更强调先验的层级递增分配，再结合剪枝。递增 rank 是一种简单但强的 inductive bias：越靠近输出的层越可能需要更细粒度任务适配，因此分配更多 rank；剪枝再把训练过程中不重要的通道或结构去掉，避免递增 rank 造成成本失控。

第二个公开机制是“对齐全参数微调”。低秩适配通常只能近似全参微调的权重变化 \(\Delta W_{\text{FT}}\)，BladeLoRA 试图调整特定层矩阵权重，让低秩更新 \(\Delta W_l=B_lA_l\) 更接近全参微调方向：

$$
\min_{A_l,B_l}\ \mathcal{L}_{\text{task}}+
\lambda\sum_{l\in\mathcal{S}}\left\|B_lA_l-\Delta W^{\text{proxy}}_l\right\|_F^2
$$

这里 \(\Delta W^{\text{proxy}}_l\) 可理解为全参微调或梯度方向的近似参照。即使公开页面没有给出完整公式，这个目标能表达其“让生成内容更接近全参数微调”的核心思想。

剪枝是 BladeLoRA 的效率保障。如果 rank 线性递增且再做对齐，训练计算和显存都会增加；剪枝通过重要性分数删除低贡献 rank 通道、层块或矩阵结构，使最终 adapter 更像“刀片”一样保留关键薄片。对于不同规模模型采用不同 pruning 粒度，也符合公开摘要中“handle large models of different scales”的描述。

> ⚠️ 注意：manifest 的 `paper_url` 指向 arXiv:2501.02245，但该条目实际是 “Adaptive GSIS for rarefied gas flow simulations”。本文件 YAML 按 manifest 原样保留，方法内容使用 Springer 正式 BladeLoRA 章节公开摘要补足。

#### 🧪 练习题
```yaml
question: "BladeLoRA 为什么要使用递增 rank 序列？"
options:
  - "让所有层共享同一个 LoRA 矩阵"
  - "把更多适配容量分配给更深、通常更任务相关的层"
  - "删除模型的 embedding 层"
  - "让 rank 与 batch size 相等"
answer: 1
explain: "公开摘要明确指出 BladeLoRA 通过线性递增 rank 让 LoRA 更关注深层信息，以缓解固定 rank 的层间容量不匹配。"
```
