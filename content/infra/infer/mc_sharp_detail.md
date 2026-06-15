### MC#: 混合压缩器 (MC#)

```yaml
id: mc_sharp
name: MC#
full_name: 混合压缩器 (MC#)
year: '2026'
org: IEEE TPAMI
paper_url: https://ieeexplore.ieee.org/document/10884444/
category: quantize
parent: awq
motivation: 自适应混合精度量化+在线剪枝压缩MoE
```

#### 📝 一句话总结

MC# 面向 MoE 大模型提出混合压缩思路，将自适应混合精度量化与在线剪枝结合，按专家和层的重要性分配压缩强度以降低 MoE 推理成本。

#### 🎯 核心要点

- 面向 Mixture-of-Experts LLM 的专家参数和激活稀疏特性
- 对不同专家/层/模块使用自适应混合精度量化
- 在线剪枝低贡献专家或通道，减少实际激活计算
- 目标是在质量约束下同时压缩存储和推理计算
- IEEE 页面访问受限时，结合任务元信息和可访问 MC-MoE/混合压缩资料整理

#### 🔬 深入细节

![MC# 核心示意图](https://arxiv.org/html/2410.06270v1/x1.png)
*图：可访问 MC-MoE 混合压缩论文页面图，展示 MoE 压缩框架；MC# 条目据 IEEE/任务元信息总结。*

```python
# MC# mixed compression sketch
for expert in moe_model.experts:
    importance = estimate_expert_importance(expert, calibration_or_online_stats)
    bit_width = assign_bits(importance, quality_budget)
    expert.W = quantize(expert.W, bits=bit_width)

for request in serving_stream:
    active = router.select_experts(request)
    active = prune_low_gain_experts(active, online_threshold)
    output = run_quantized_experts(active)
```

##### 动机与背景

MoE 模型总参数巨大，但每个 token 只激活少量专家。统一量化或统一剪枝会忽视专家重要性差异；只压缩权重又不能减少运行时路由到低贡献专家的计算。

##### 核心机制

MC# 的核心是混合压缩：重要专家或敏感层保留更高 bit，冗余专家使用更低 bit；在线阶段根据路由和贡献估计剪去低收益计算。这样同时利用 MoE 的参数冗余和动态稀疏。

##### 训练/推理流程

离线校准阶段评估专家/层敏感度并分配量化精度；部署阶段以量化专家运行，结合实时路由分数或贡献阈值做在线剪枝。质量预算控制剪枝和 bit 分配强度。

##### 与传统方法的区别

AWQ/GPTQ 主要处理 dense LLM 权重；MC# 针对 MoE 的专家异质性和动态路由。它不是单一 bit 宽算法，而是量化与剪枝的系统组合。

#### 🧪 练习题

```yaml
question: "MC# 为什么适合 MoE 模型？"
options:
  - "MoE 专家重要性和激活频率不均，适合混合压缩"
  - "MoE 没有权重"
  - "MoE 只能用 FP64"
  - "MoE 不需要路由"
answer: 0
explain: "不同专家贡献不同，混合精度和在线剪枝能按重要性分配资源。"
```
