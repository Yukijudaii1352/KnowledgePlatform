### EAGLE-2: 鹰2代 (EAGLE-2)

```yaml
id: eagle_v2
name: EAGLE-2
full_name: 鹰2代 (EAGLE-2)
year: '2024'
org: PKU
paper_url: https://aclanthology.org/2024.emnlp-main.422/
category: spec_decode
parent: eagle
motivation: 引入动态草稿树根据置信度调整路径
```

#### 📝 一句话总结

EAGLE-2 在 EAGLE 的基础上引入 context-aware dynamic draft tree，用 draft confidence 近似接受概率，为不同上下文动态分配草稿树宽度和深度。

#### 🎯 核心要点

- 发现候选接受率不仅与树位置有关，也强烈依赖上下文
- 利用 EAGLE draft model 的置信度估计节点接受概率
- 动态构造草稿树，把预算分配给更可能被接受的分支
- 保持 lossless 验证，目标模型分布不变
- 相对静态树 EAGLE 提升接受长度和端到端速度

#### 🔬 深入细节

![EAGLE-2 核心示意图](https://ar5iv.labs.arxiv.org/html/2406.16858/assets/x1.png)
*图：EAGLE-2 的动态草稿树，根据节点置信度选择扩展路径。*

```python
root = current_prefix
frontier = [root]
while draft_budget_remaining:
    node = pop_highest_confidence(frontier)
    children = eagle_draft(node).topk()
    for child in children:
        child.accept_prob = estimate_from_confidence(child)
        if child.accept_prob > threshold:
            frontier.push(child)
    tree.add(children)
verified = target_model.verify_tree(prefix, tree)
prefix.extend(accepted_prefix(verified))
```

##### 动机与背景

EAGLE 使用固定草稿树时，默认同一深度/位置的候选接受率相近。但实际语言上下文差异很大：有些前缀下模型非常确定，有些前缀下分布多峰。固定树会把预算浪费在低置信路径上。

##### 核心机制

EAGLE-2 使用 draft model 的 confidence 作为接受率近似，动态选择哪些节点继续扩展。高置信节点获得更深或更多子节点，低置信节点少扩展甚至停止。这样同样的验证预算覆盖更可能被接受的路径。

##### 训练/推理流程

推理时先逐步构造动态 draft tree，而不是使用预设形状；然后 target model 一次验证该树。接受规则仍与投机解码一致，因此改变的是候选集合，不改变最终采样分布。

##### 与传统方法的区别

EAGLE-1 的树结构静态，EAGLE-2 的树结构随上下文变化。它的核心收益来自更好的草稿预算分配，而不是更大的模型或近似接受。

#### 🧪 练习题

```yaml
question: "EAGLE-2 动态草稿树依据什么扩展节点？"
options:
  - "节点置信度/近似接受率"
  - "token 在词表中的编号"
  - "GPU 温度"
  - "YAML 文件顺序"
answer: 0
explain: "EAGLE-2 用 draft confidence 估计候选被目标模型接受的概率，并优先扩展高概率节点。"
```
