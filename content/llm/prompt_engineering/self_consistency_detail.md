### Self-Consistency: 自洽性 (Self-Consistency)
```yaml
id: self_consistency
name: Self-Consistency
full_name: 自洽性 (Self-Consistency)
year: '2022.03'
org: Google
paper_url: https://arxiv.org/abs/2203.11171
category: reasoning
parent: cot
motivation: 多路径采样投票提升推理鲁棒性
```

#### 📝 一句话总结
Self-Consistency 用多次采样的 CoT 推理路径替代贪心解码，并对最终答案投票，解决了单条推理链偶然出错导致答案不稳的问题。

#### 🎯 核心要点
- 将 CoT 的 greedy decoding 改为随机采样多条 reasoning paths
- 对每条推理链抽取 final answer，再选择出现最一致的答案
- 近似边缘化中间推理路径，而不是信任单一路径
- 在 GSM8K、SVAMP、AQuA、StrategyQA、ARC-challenge 等任务上显著提升
- 与模型训练无关，是纯解码策略，可叠加在 CoT prompt 上
- 代价是多次采样带来更高推理成本，并依赖答案抽取规则

#### 🔬 深入细节
![Self-Consistency 三步流程](https://ar5iv.labs.arxiv.org/html/2203.11171/assets/x1.png)
*图：论文 Figure 1，展示 CoT prompt、多路径采样和最终答案聚合三步。图源：ar5iv / arXiv。*

```python
# Self-Consistency 解码伪代码
def self_consistency(lm, cot_prompt, question, n_samples, temperature):
    votes = {}
    traces = []
    for _ in range(n_samples):
        completion = lm.generate(
            cot_prompt + f"\nQ: {question}\nA:",
            temperature=temperature,
        )
        rationale, answer = parse_final_answer(completion)
        traces.append((rationale, answer))
        votes[answer] = votes.get(answer, 0) + 1
    best_answer = max(votes, key=votes.get)
    return best_answer, traces
```

Self-Consistency 的直觉是：复杂问题通常存在多条不同但等价的解题路线，错误路线之间不一定收敛到同一个错误答案，而正确路线更可能汇聚到同一最终答案。于是与其用贪心解码找单条最高概率推理链，不如采样多个 \(r\)，再边缘化掉 \(r\)：

$$
p(a \mid x) = \sum_r p_\theta(a,r \mid x)
\approx \sum_{m=1}^{M} \mathbf{1}[a_m=a]
$$

这里 \(M\) 是采样次数，\(a_m\) 是第 \(m\) 条推理链抽取出的最终答案。最终选择 \(\arg\max_a \text{count}(a)\)。这使决策从“哪条完整文本概率最高”变为“哪个答案被多种推理路径支持最多”。

与普通 CoT 相比，Self-Consistency 只改变解码和聚合。Prompt 仍是 CoT prompt，模型也不需要额外训练；关键参数是采样温度、样本数和答案解析函数。温度过低会得到高度相似的路径，投票收益有限；温度过高会生成噪声路径，增加解析错误。

它的强项是封闭答案空间的推理任务，例如数字答案、多选题、是非题。对于开放式生成，标准 Self-Consistency 会遇到“答案无法精确匹配”的问题：同义表达、列表顺序、长文本摘要都很难用正则或字符串投票处理。这也直接推动了 Universal Self-Consistency 等后续方法。

> 💡 关键：Self-Consistency 不是让模型反思，而是用采样近似“多条推理路径对同一答案的边缘支持”。

#### 🧪 练习题
```yaml
question: "Self-Consistency 相比普通 CoT 的核心变化是什么？"
options:
  - "训练一个新的验证器模型"
  - "采样多条推理链并对最终答案聚合投票"
  - "只使用零样本指令"
  - "把自然语言推理全部替换成 Python"
answer: 1
explain: "Self-Consistency 通过多路径采样降低单条推理链错误的影响，最终选择最一致的答案。"
```
