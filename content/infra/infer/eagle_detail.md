### EAGLE: 鹰 (EAGLE)

```yaml
id: eagle
name: EAGLE
full_name: 鹰 (EAGLE)
year: '2024'
org: PKU
paper_url: https://arxiv.org/abs/2401.15077
category: spec_decode
parent: spec_leviathan
motivation: 在特征空间投机解决标记预测不确定性
```

#### 📝 一句话总结

EAGLE 将投机草稿从 token 空间转到特征空间：用轻量自回归头预测下一步高层特征，再经目标 LM head 得到 token，从而降低 token 级不确定性并提升接受率。

#### 🎯 核心要点

- 草稿模型预测 target model 的第二顶层/高层特征而非直接预测 token
- 利用原模型 LM head 将预测特征映射为 token 分布
- 构造 draft tree 并由目标模型并行验证
- 保持目标模型输出分布不变，属于 lossless speculative acceleration
- 在多种 LLM 上相比传统草稿模型和 Medusa 提高接受长度

#### 🔬 深入细节

![EAGLE 核心示意图](https://ar5iv.labs.arxiv.org/html/2401.15077/assets/x1.png)
*图：EAGLE 的特征级 autoregressive drafting 与目标模型验证流程。*

```python
# EAGLE feature-level drafting
feature = target_hidden_last(prefix)
draft_tree = []
for depth in range(tree_depth):
    next_feature = eagle_head(feature, sampled_token)
    token_dist = target_lm_head(next_feature)
    token = sample_or_topk(token_dist)
    draft_tree.add(token, next_feature)
    feature = next_feature
verified = target_model.verify_tree(prefix, draft_tree)
prefix.extend(accepted_prefix(verified))
```

##### 动机与背景

直接预测未来 token 难度高，因为 token 离散且多峰；小 draft model 与目标模型分布差距会降低接受率。EAGLE 的洞察是，目标模型高层特征比 token 更连续、更容易外推，同时仍能通过原 LM head 转为 token。

##### 核心机制

EAGLE 训练一个轻量特征预测器，输入当前 token 和目标模型特征，输出下一位置的高层特征。该特征接入目标模型原本的 LM head 产生 token 候选。由于候选最终仍由 target model 验证，生成分布保持不变。

##### 训练/推理流程

离线训练 EAGLE head 拟合目标模型隐藏状态转移；推理时 EAGLE head 自回归生成特征和 token 树；目标模型用树注意力并行验证候选，接受合法前缀后进入下一轮。

##### 与传统方法的区别

相比 Medusa 的多头直接 token 预测，EAGLE 把不确定性放在连续特征空间处理；相比独立 draft model，它复用目标模型的表示和 LM head，分布更贴近。

#### 🧪 练习题

```yaml
question: "EAGLE 的草稿预测主要发生在哪个空间？"
options:
  - "连续特征空间"
  - "文件系统路径"
  - "优化器状态"
  - "纯字符空间"
answer: 0
explain: "EAGLE 预测目标模型高层特征，再通过目标 LM head 得到 token 候选。"
```
