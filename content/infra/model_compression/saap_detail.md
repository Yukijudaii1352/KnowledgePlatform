### SAAP

```yaml
id: saap
name: SAAP
full_name: 结构感知自适应剪枝 (SAAP)
year: 2026
org: IEEE
paper_url: https://ieeexplore.ieee.org/abstract/document/11360603/
category: pruning
parent: sparsegpt
motivation: 维持LLM理解能力的结构感知剪枝
```

#### 📝 一句话总结

SAAP 提出结构感知自适应剪枝，通过融合不同耦合结构的重要性与不确定性来选择要裁剪的模块，并用 group-wise fine-tuning 恢复性能，解决了 LLM 结构化剪枝中层间重要性波动大、统一阈值容易误剪的问题。

#### 🎯 核心要点

- 面向 LLM 的结构化剪枝，删除可部署友好的耦合结构而非孤立权重
- 将依赖检测得到的 attention head、MLP channel 等耦合结构视为 pruning group
- 结合 vector-wise 与 element-wise 重要性，构造 adaptive importance fusion metric
- 用 homoscedastic uncertainty 自适应调节不同重要性指标的权重
- 按模块/层排序选择要剪的结构，以满足给定剪枝率和性能约束
- 用 group-wise fine-tuning 对剪枝后的组进行高效恢复，减少全模型微调开销

#### 🔬 深入细节

![SAAP 方法总览图](https://arxiv.org/html/2412.15127v1/x2.png)
*图：SAAP 先用自适应重要性评估删除最不稳定结构，再通过高效 group-wise fine-tuning 恢复剪枝模型。*

```python
# SAAP 结构感知剪枝伪代码
groups = detect_coupled_structures(llm)  # heads, channels, coupled modules
for group in groups:
    I_vector = estimate_vector_importance(group, calibration_data)
    I_element = estimate_element_importance(group, calibration_data)
    uncertainty = estimate_homoscedastic_uncertainty(group)
    score[group] = fuse_importance(I_vector, I_element, uncertainty)

pruned_groups = select_low_score_groups(score, target_ratio)
llm_pruned = remove_structures(llm, pruned_groups)
group_wise_finetune(llm_pruned, calibration_or_task_data)
```

LLM 的结构化剪枝比普通权重剪枝更难，因为 Transformer 中很多参数存在耦合关系：剪掉一个 attention head、MLP 中间维度或投影通道时，前后矩阵的对应维度必须一起删除，否则张量形状和语义流都会被破坏。SAAP 首先识别这些耦合结构，把它们作为统一评估和删除的 group。

论文中的重要性估计沿用泰勒近似思想。对第 \(i\) 个结构权重 \(\mathbf{W}_i\)，删除它造成的损失变化可近似为：

$$
I_i \approx \left|\frac{\partial \mathcal{L}^\top}{\partial \mathbf{W}_i}\mathbf{W}_i-\frac{1}{2}\mathbf{W}_i^\top\mathbf{H}\mathbf{W}_i\right|
$$

实际计算中，vector-wise 指标更关注整个结构向量的整体贡献，element-wise 指标更细粒度地刻画权重内部差异。只使用其中一种指标会偏向某些层或某类结构，难以在不同 LLM 架构间泛化。

SAAP 的 adaptive importance fusion 用同方差不确定性来给不同指标分配权重，可理解为：

$$
I_{\mathrm{fuse}}=\sum_m \frac{1}{2\sigma_m^2}I^{(m)}+\log\sigma_m
$$

其中 \(I^{(m)}\) 是一种重要性度量，\(\sigma_m\) 表示该度量的不确定性。若某个指标在当前结构上波动大、不可靠，它对最终分数的影响会被降低；若指标稳定，则获得更高权重。

> 💡 关键：SAAP 不是用一个全局幅值阈值剪所有层，而是先在结构组级别估计“重要且稳定”的程度，再按层和模块做自适应选择。

剪枝后，模型会出现层间分布偏移和能力下降。SAAP 采用 group-wise fine-tuning：不对所有参数做昂贵的完整微调，而是围绕被剪结构相关的组进行恢复训练，使输出分布重新对齐。这样保留结构化剪枝带来的推理加速，同时降低恢复成本。

与 SparseGPT 这类非结构化/半结构化一次性剪枝相比，SAAP 更强调删除完整可部署结构，因此理论压缩更容易转成实际延迟收益。与 LLM-Pruner 等结构化方法相比，SAAP 的重点在于用不确定性处理不同层重要性分数不可比的问题。

#### 🧪 练习题

```yaml
question: "SAAP 中 homoscedastic uncertainty 的主要作用是什么？"
options:
  - "随机选择要剪掉的层"
  - "自适应调节不同重要性指标在融合分数中的权重"
  - "把所有权重量化到 4 bit"
  - "替代剪枝后的微调过程"
answer: 1
explain: "不同结构和层的重要性指标波动不同，不确定性项可以降低不稳定指标的影响，使剪枝排序更可靠。"
```
