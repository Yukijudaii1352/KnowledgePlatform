### Self-Consistency

```yaml
id: self_consistency
name: Self-Consistency
full_name: 自一致性 (Self-Consistency)
year: '2022'
org: Google
paper_url: https://arxiv.org/abs/2203.11171
category: planning
parent: cot
motivation: 多路采样投票选出一致答案
```

#### 📝 一句话总结

Self-Consistency 提出了一种"采样—边际化"解码策略，通过对大语言模型的 Chain-of-Thought 推理进行多路采样并以多数投票选出最一致的答案，无需额外训练即可大幅提升复杂推理任务的准确率。

#### 🎯 核心要点

- **替换贪心解码**：用多路采样（temperature / top-k / nucleus sampling）替代 CoT 中的贪心解码，生成多条多样化推理路径
- **多数投票聚合**：对采样得到的多条推理路径的最终答案执行多数投票（majority vote），选出出现次数最多的答案
- **加权投票变体**：可选地用模型输出概率 \(P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question})\) 对每条路径加权后再聚合
- **完全无监督**：不需要额外训练、微调、验证器或人工标注，直接在预训练模型上即插即用
- **"自集成"思想**：区别于传统多模型集成，Self-Consistency 在单一模型上通过采样实现多样性
- **广泛的基准验证**：在 GSM8K（+17.9%）、SVAMP（+11.0%）、AQuA（+12.2%）、StrategyQA（+6.4%）、ARC-challenge（+3.9%）等基准上取得显著提升
- **跨模型泛化**：在 UL2-20B、GPT-3-175B、LaMDA-137B、PaLM-540B 四种不同规模模型上均有效
- **对采样策略和不完美 prompt 鲁棒**：不同采样参数和含有错误的 prompt 下均能稳定提升性能

#### 🔬 深入细节

##### 核心示意图

![Self-Consistency 方法示意图](https://ar5iv.labs.arxiv.org/html/2203.11171v1/assets/x1.png)
*图：Self-Consistency 方法的三步流程——(1) 使用 CoT 提示语言模型；(2) 从解码器中采样生成多条多样化推理路径；(3) 边际化推理路径，通过多数投票选出最一致的答案。*

##### 算法伪代码

```python
# Self-Consistency 伪代码
def self_consistency(model, prompt, question, num_samples=40, temperature=0.5):
    """
    输入: 语言模型 model, CoT 提示 prompt, 问题 question
    输出: 最一致的答案
    """
    answers = []
    for i in range(num_samples):
        # Step 1 & 2: 采样一条推理路径 + 答案
        reasoning_path, answer = model.sample(
            prompt + question, temperature=temperature
        )
        answers.append(answer)
    
    # Step 3: 多数投票 — 边际化推理路径，选出最一致答案
    answer_counts = Counter(answers)
    best_answer = answer_counts.most_common(1)[0][0]
    return best_answer
```

##### 动机与背景

Chain-of-Thought (CoT) 提示通过让语言模型生成中间推理步骤，显著提升了多步推理任务的表现。然而，CoT 默认使用**贪心解码**（greedy decoding），即每一步只选择概率最高的 token。这种策略存在两个关键缺陷：

1. **局部最优**：贪心解码容易陷入次优的推理路径，一旦某一步出错就无法纠正；
2. **缺乏多样性**：同一个问题只产生一条推理路径，无法利用"殊途同归"的直觉——即正确答案往往可以通过多种不同的推理方式得出。

Self-Consistency 的核心洞察来自人类认知：**如果多条不同的思考路径都指向同一个答案，我们对该答案的信心就会更高**。这一直觉在心理学中被称为"双过程理论"（Stanovich & West, 2000），即深思熟虑的问题通常存在多种合理的推理方式。

##### 核心机制：采样—边际化

Self-Consistency 的方法可以形式化为一个潜变量模型。给定提示（prompt）和问题（question），模型生成一组 \(m\) 条输出 \((\mathbf{r}_i, \mathbf{a}_i)\)，其中 \(\mathbf{r}_i\) 是推理路径（latent variable），\(\mathbf{a}_i\) 是最终答案。

**多数投票（Majority Vote）**——最简单也最有效的聚合方式：

$$\hat{a} = \operatorname*{arg\,max}_{a} \sum_{i=1}^{m} \mathbb{1}(\mathbf{a}_i = a)$$

即选择在 \(m\) 条采样路径中出现次数最多的答案。这等价于将推理路径 \(\mathbf{r}_i\) 边际化（marginalize out），只关注最终答案的一致性。

**加权投票变体**——可以进一步利用模型的输出概率进行加权：

$$\hat{a} = \operatorname*{arg\,max}_{a} \sum_{i=1}^{m} \mathbb{1}(\mathbf{a}_i = a) \cdot P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question})$$

其中条件概率可以通过长度归一化计算：

$$P(\mathbf{r}_i, \mathbf{a}_i \mid \text{prompt}, \text{question}) = \exp\left(\frac{1}{K}\sum_{k=1}^{K} \log P(t_k \mid \text{prompt}, \text{question}, t_1, \ldots, t_{k-1})\right)$$

> 💡 **关键发现**：论文实验表明，简单的无权重多数投票（unweighted majority vote）在大多数任务上已经与加权投票表现相当甚至更好，因此推荐使用最简单的多数投票策略。

##### 采样策略与路径数量

Self-Consistency 兼容多种采样策略：

- **Temperature Sampling**：通过调节温度参数 \(T\) 控制输出多样性（论文中 \(T=0.5\) 效果较优）
- **Top-k Sampling**：只从概率最高的 \(k\) 个 token 中采样（论文中 \(k=40\)）
- **Nucleus Sampling**：从累积概率达到 \(p\) 的最小 token 集合中采样（论文中 \(p=0.95\)）

论文通过实验验证了**采样路径数量**的影响：从 1 条增加到 40 条，性能持续提升。例如在 GSM8K 上，PaLM-540B 从 CoT 的 56.5% 提升到 Self-Consistency（40 路径）的 74.4%。

> ⚠️ **注意**：Self-Consistency 的计算开销与采样路径数量成正比。在实际应用中需要在性能提升和推理成本之间权衡。

##### 与传统方法的区别

| 方法 | 是否需要额外训练 | 是否需要多个模型 | 核心思想 |
|------|:---:|:---:|------|
| Greedy CoT | ❌ | ❌ | 单路径贪心解码 |
| Sample-and-Rank | ❌ | ❌ | 采样后按模型概率排序选最优 |
| Verifier (Cobbe et al.) | ✅ | ✅ | 训练额外验证器打分 |
| 模型集成 | ✅ | ✅ | 多模型输出聚合 |
| **Self-Consistency** | **❌** | **❌** | **单模型多路采样 + 多数投票** |

Self-Consistency 的核心优势在于：**零额外成本**（无需训练、无需标注、无需辅助模型），仅通过改变解码策略就能获得类似集成学习的效果，本质上是一种"自集成"（self-ensemble）方法。

#### 🧪 练习题

```yaml
question: "Self-Consistency 方法在聚合多条推理路径的答案时，默认采用什么策略？"
options:
  - "选择模型输出概率最高的那条推理路径的答案"
  - "对所有推理路径的答案取多数投票（majority vote）"
  - "训练一个额外的验证器对每条路径打分"
  - "使用 beam search 选择全局最优路径"
answer: 1
explain: "Self-Consistency 的核心是将推理路径作为潜变量边际化，通过多数投票选出出现次数最多的答案，无需额外训练或模型。"
```