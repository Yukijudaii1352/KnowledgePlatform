### EAGLE-3: 鹰3代 (EAGLE-3)

```yaml
id: eagle_v3
name: EAGLE-3
full_name: 鹰3代 (EAGLE-3)
year: '2025.03'
org: PKU/SafeAI Lab
paper_url: https://arxiv.org/abs/2503.01840
category: spec_decode
parent: eagle_v2
motivation: 直接Token预测+三层特征融合
```

#### 📝 一句话总结

EAGLE-3 在 EAGLE 系列上进一步改进为直接 token 预测与多层特征融合，利用目标模型不同深度表示提升草稿质量和可扩展性。

#### 🎯 核心要点

- 从仅预测高层特征推进到更直接的 token 预测设计
- 融合目标模型低/中/高三层特征作为 draft 输入
- 保留 EAGLE 系列的树验证和 lossless 接受机制
- 面向更大模型和更复杂任务提升接受率
- 减少特征预测误差向 token 分布传导的不确定性

#### 🔬 深入细节

![EAGLE-3 核心示意图](https://ar5iv.labs.arxiv.org/html/2503.01840/assets/x1.png)
*图：EAGLE-3 的多层特征融合与草稿生成框架。*

```python
# EAGLE-3 draft step
features = [hidden_low(prefix), hidden_mid(prefix), hidden_high(prefix)]
fused = fusion_proj(concat(features))
for depth in range(draft_depth):
    logits, fused = eagle3_drafter(fused, last_token)
    token = sample_or_topk(logits)
    draft_tree.add(token)
verified = target_model.verify_tree(prefix, draft_tree)
prefix.extend(accepted_prefix(verified))
```

##### 动机与背景

EAGLE 的特征预测降低了 token 空间不确定性，但单层高层特征可能丢失低层词法和中层句法信息；预测特征再接 LM head 也会引入误差传导。EAGLE-3 针对这些瓶颈提升草稿模型表达。

##### 核心机制

EAGLE-3 将目标模型多个层级的 hidden states 融合，给 drafter 更完整的上下文表示；同时更直接地产生 token 分布，减少从预测特征到 token 的不确定路径。候选仍由目标模型验证。

##### 训练/推理流程

训练阶段从目标模型运行轨迹中收集多层特征和真实后续 token，训练 EAGLE-3 drafter。推理阶段先取多层特征融合，再并行/树式产生候选，最后由 target model 验证接受前缀。

##### 与传统方法的区别

EAGLE-2 主要优化草稿树形状，EAGLE-3 主要优化草稿模型输入和预测目标。它和 P-EAGLE 后续的并行 drafting 方向互补：一个提高候选质量，一个减少草稿串行步。

#### 🧪 练习题

```yaml
question: "EAGLE-3 相比早期 EAGLE 的关键输入改进是什么？"
options:
  - "融合多层目标模型特征"
  - "只保留第一个 token"
  - "完全删除验证"
  - "改用 CPU 解码"
answer: 0
explain: "EAGLE-3 使用低/中/高层特征融合来增强 drafter 的上下文表示。"
```
