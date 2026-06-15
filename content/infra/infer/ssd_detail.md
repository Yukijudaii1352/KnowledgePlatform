### SSD: 异步投机解码 (SSD)

```yaml
id: ssd
name: SSD
full_name: 异步投机解码 (SSD)
year: '2026.03'
org: Stanford/Together AI
paper_url: https://arxiv.org/abs/2603.03251
category: spec_decode
parent: spec_leviathan
motivation: 异步草稿验证+几何扇出策略
```

#### 📝 一句话总结

SSD（Speculative Speculative Decoding）进一步投机化验证阶段：在 target 验证尚未完成时，draft model 预判可能的验证结果并提前准备后续草稿，以并行化传统投机解码中的 draft-verify 串行依赖。

#### 🎯 核心要点

- 指出普通 speculative decoding 仍有草稿与验证之间的串行等待
- 在验证进行中预测可能接受长度/验证结果
- 为多个可能结果提前生成后续 speculations 并缓存
- 提出 Saguaro 优化算法和 uniform/geometric fanout 策略
- 在命中预测结果时可立即返回后续草稿，降低 draft overhead

#### 🔬 深入细节

![SSD 核心示意图](https://ar5iv.labs.arxiv.org/html/2603.03251/assets/x1.png)
*图：SSD/Saguaro 的异步草稿与验证重叠框架。*

```python
while decoding:
    current_spec = get_ready_speculation(prefix)
    verify_future = target_model.verify_async(prefix, current_spec)

    # while verification is running, draft possible continuations
    outcomes = predict_verification_outcomes(current_spec)
    for outcome in fanout(outcomes, strategy='geometric'):
        cache[outcome] = draft_model.speculate(prefix_after(outcome))

    result = verify_future.wait()
    prefix.extend(result.accepted)
    if result in cache:
        next_spec = cache[result]
```

##### 动机与背景

普通投机解码每轮需要先 draft，再 target verify，再根据验证结果开始下一轮 draft。即使 target 验证本身并行，轮与轮之间仍存在串行控制依赖，尤其 draft 成本不可忽略时会限制加速。

##### 核心机制

SSD 让 draft model 在 target 验证期间猜测验证会产生哪些结果，例如接受几个 token，并提前为这些可能前缀生成下一轮草稿。若真实验证结果落在预测集合中，就能直接使用已准备好的 speculation。

##### 训练/推理流程

系统维护 speculation cache。当前候选送入 target 异步验证后，draft model 根据可能结果做 fanout。fanout 可以均匀分配，也可以按几何策略偏向更可能接受长度。验证返回后，命中则无缝继续，未命中则退回普通 draft。

##### 与传统方法的区别

SSD 不是替代 speculative decoding，而是在其外层再做一次投机，目标是重叠 draft 与 verify 的控制间隙。正确性仍依赖最终 target 验证，预测错只损失额外 draft 计算。

#### 🧪 练习题

```yaml
question: "SSD 相比普通投机解码多投机了什么？"
options:
  - "验证结果及其后续草稿"
  - "模型权重初始化"
  - "训练数据标签"
  - "显卡驱动版本"
answer: 0
explain: "SSD 在 target 验证未完成时预判可能接受结果，并为这些结果提前生成下一轮草稿。"
```
