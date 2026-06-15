### GigaMoE

```yaml
id: gigamoe
name: GigaMoE
full_name: 十亿像素MoE (GigaMoE)
year: 2026
org: AAAI
paper_url: https://ojs.aaai.org/index.php/AAAI/article/view/38810
category: sparsity_deploy
parent: nm_sparsity
motivation: 稀疏引导MoE高效十亿像素检测
```

#### 📝 一句话总结

GigaMoE 将高分辨率广域图像检测 backbone 中昂贵的 FFN 替换为稀疏引导 MoE，用 sparse backbone 的区域重要性分数动态分配专家计算，解决了 gigapixel detection 中所有候选区域使用同等计算导致效率低的问题。

#### 🎯 核心要点

- 面向 HRW/gigapixel object detection，基于 SparseFormer 等稀疏区域处理范式
- 观察到 FFN 是 SparseFormer backbone 的主要计算瓶颈
- 用 shared expert 为所有区域提供基础表征
- 用 Sparsity-Guided Routing 根据区域重要性给复杂区域更多专家预算
- 引入 computational bonus，将稀疏 backbone 的重要性分数转化为专家选择偏置
- 使用无辅助损失的在线 expert load balancing，通过可更新 bias 平衡专家负载

#### 🔬 深入细节

核心示意图说明：官方 AAAI 页面未提供独立图片直链；论文 Figure 1 位于官方 PDF `https://ojs.aaai.org/index.php/AAAI/article/download/38810/42772`，展示 GigaMoE 相比 SparseFormer 的 FLOPs 分解，说明 FFN/MoE 是主要优化对象。

```python
# GigaMoE 稀疏引导 MoE 路由伪代码
for window in selected_sparse_windows:
    base = shared_expert(window.features)
    importance = sparse_backbone_score(window)
    gate_logits = router(window.features) + bonus(importance) + expert_bias
    selected = topk(gate_logits, k=dynamic_k(importance))
    output = base + sum(expert_i(window.features) for i in selected)

    # loss-free load balancing
    counts = count_assigned_windows(selected)
    expert_bias += update_rate(t) * sign(mean(counts) - counts)
```

Gigapixel 图像中目标极稀疏，不同窗口复杂度差异很大。SparseFormer 类方法已经会筛选重要区域，但筛选后仍对所有区域使用同一套计算，导致简单背景窗口和复杂目标窗口消耗相同 FFN 成本。GigaMoE 的出发点是：区域选择分数本身就能提示“哪里值得花更多算力”。

标准 Transformer block 的 FFN 通常是计算瓶颈。GigaMoE 将 FFN 替换为 MoE：shared expert 对所有窗口执行，保证每个区域都有稳定基础特征；specialized experts 只对路由选中的窗口执行，提供额外容量。输出可概念化为：

$$
\mathbf{y}=\mathbf{E}_{\mathrm{shared}}(\mathbf{x})+\sum_{i\in \mathrm{TopK}(g(\mathbf{x})+b+c(s))}\mathbf{E}_i(\mathbf{x})
$$

其中 \(s\) 是稀疏 backbone 的重要性分数，\(c(s)\) 是 computational bonus，\(b\) 是负载均衡 bias。

> 💡 关键：GigaMoE 的路由不是只看 token feature，而是复用稀疏检测流程已有的重要性信号，让“目标更可能出现、内容更复杂”的窗口获得更多专家计算。

MoE 常见问题是专家负载不均，需要辅助 load balancing loss。GigaMoE 采用 loss-free online balancing：统计每个专家当前 batch 的分配数量，若某专家过载就降低其 bias，若分配不足就提高 bias，并让更新率随训练衰减。这样减少额外损失权重调参，同时保持路由稳定。

与 N:M Sparsity 的硬件规则稀疏不同，GigaMoE 属于条件计算稀疏：不是固定删除权重，而是按输入区域动态激活部分专家。它适合 gigapixel detection 这种内容稀疏、区域复杂度差异巨大的场景。

#### 🧪 练习题

```yaml
question: "GigaMoE 中 Sparsity-Guided Routing 的核心作用是什么？"
options:
  - "用稀疏 backbone 的区域重要性分数决定专家计算预算"
  - "把所有专家都固定激活"
  - "删除目标检测 head"
  - "将图像下采样到 224x224 后再检测"
answer: 0
explain: "GigaMoE 复用稀疏区域选择分数，为复杂或重要窗口提供 computational bonus，从而动态调用更多专家。"
```
