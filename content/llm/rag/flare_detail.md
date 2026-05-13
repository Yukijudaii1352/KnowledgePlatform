### FLARE

```yaml
id: flare
name: FLARE
full_name: 前瞻性主动检索 (Forward-Looking Active Retrieval)
year: '2023.05'
org: CMU
paper_url: https://arxiv.org/abs/2305.06983
category: architecture
parent: rag
motivation: 低置信度Token触发检索，主动式知识增强
```

#### 📝 一句话总结

FLARE 通过监测生成过程中 token 级概率，在模型不确定时以临时生成的下一句作为查询主动检索外部文档并重新生成，实现自适应按需检索增强，避免了固定间隔检索的效率浪费与噪声引入。

#### 🎯 核心要点

- 提出 **Active Retrieval Augmented Generation** 统一框架，将检索决策分解为 **when to retrieve**（何时检索）和 **what to retrieve**（如何构造查询）两个正交维度
- 检索触发条件：临时生成句中任一 token 概率低于阈值 \(\theta\) 即触发检索，无需额外训练
- 两种查询构造策略：**FLARE\_direct**（掩码低置信 token 后直接用临时句作查询）和 **FLARE\_instruct**（用 LM 显式生成检索查询）
- 前瞻式查询（forward-looking）：用即将生成的内容而非已生成内容构造查询，更精准匹配当前信息需求
- 在 4 个长文本知识密集型任务（2WikiMQA、StrategyQA、ASQA、WikiAsp）上全面优于或持平最强基线
- 检索频率仅为固定间隔方法的约 45%，兼顾效果与效率

#### 🔬 深入细节

##### 框架总览

![Active Retrieval Augmented Generation 总览](https://ar5iv.labs.arxiv.org/html/2305.06983v2/assets/x1.png)
*图 1：Active Retrieval Augmented Generation 框架总览——在每个生成步骤中，模型主动决定何时检索、检索什么。*

![FLARE 核心流程图](https://ar5iv.labs.arxiv.org/html/2305.06983v2/assets/x2.png)
*图 2：FLARE 工作流程——迭代生成临时句，检测低置信 token，触发检索后用检索结果重新生成。*

##### 算法伪代码

```python
# FLARE 核心流程伪代码
def flare_generate(x, LM, Retriever, corpus, theta=0.5):
    y = ""           # 已生成输出
    D_all = []       # 累积检索文档
    while not finished:
        # Step 1: 临时生成下一句
        s_hat, token_probs = LM.generate_next_sentence(x, D_all, y)

        # Step 2: 检查是否存在低置信 token
        if any(p < theta for p in token_probs):
            # Step 3: 构造查询（FLARE_direct: 掩码低置信 token）
            query = mask_low_conf_tokens(s_hat, token_probs, theta)
            # 或 FLARE_instruct: query = LM.generate_query(x, y)

            # Step 4: 检索相关文档
            D_t = Retriever.search(query, corpus, top_k=5)
            D_all.extend(D_t)

            # Step 5: 基于检索结果重新生成
            s = LM.regenerate_sentence(x, D_all, y)
        else:
            s = s_hat  # 置信度足够，直接采纳

        y += s
    return y
```

##### 动机与背景

传统 RAG 方法面临两个极端：**单次检索**（single-time retrieval）仅在生成前检索一次，无法应对长文本生成中信息需求的动态演变；**固定间隔检索**（如 RETRO 每 n 个 token 检索、IC-RALM 每句检索）则不区分是否真正需要检索，既浪费计算资源又可能引入无关信息干扰生成质量。FLARE 的核心洞察是：**LM 自身的 token 生成概率是不确定性的天然信号**——当模型对某个 token 的预测概率很低时，说明它缺乏足够的知识支撑，此时检索最有价值；反之，高置信区间无需检索。

##### 核心机制：置信度驱动的检索触发

FLARE 的检索触发基于 token 级概率监测。在每个生成步骤 \(t\)，模型先生成一个临时句 \(\hat{s}_t = [w_1, w_2, \ldots, w_n]\)，并记录每个 token 的生成概率。检索触发条件为：

$$\text{Retrieve?}(\hat{s}_t) = \exists\, w_i \in \hat{s}_t,\; p(w_i) < \theta$$

其中 \(\theta\) 为置信度阈值（默认 0.5）。当 \(\theta\) 过低（如 0.1）时 FLARE 几乎不检索，退化为无检索生成；过高（如 0.9）时则过度检索，退化为固定间隔方法。实验表明最优 \(\theta\) 在 0.3–0.6 之间。

> 💡 关键：这一机制**无需任何额外训练**，直接利用 LM 的 logits 输出，使 FLARE 可即插即用于任何暴露 token 概率的模型。

##### 查询构造：前瞻 vs 回顾

FLARE 的另一创新在于**前瞻式查询**（forward-looking query）——用临时生成的下一句（而非已生成的上一句）来构造检索查询。直觉是：即将生成的内容更直接反映当前的信息需求，而已生成内容可能已经偏离了需要补充知识的方向。

两种具体实现：

**FLARE\_direct** 将临时句中低置信 token 掩码后作为查询：

$$q_t = \text{Mask}(\hat{s}_t,\, \theta)$$

掩码的理由是低置信 token 很可能是错误的，保留它们会误导检索器。例如，临时句 "The film was directed by [John Smith]" 中如果 "John Smith" 置信度极低，则将其移除，用 "The film was directed by" 作为查询。

**FLARE\_instruct** 则让 LM 显式生成一个搜索查询：

$$q_t = \text{LM}(\text{"Given the context, generate a search query:"} \,\|\, x \,\|\, y_{<t})$$

这种方式更灵活，尤其在需要复杂推理的场景（如多跳问答）中表现更优，因为 LM 能理解"需要什么信息"并生成针对性查询。

##### 与已有方法的对比

| 方法 | 检索时机 | 查询来源 | 是否需要训练 |
|------|---------|---------|:---:|
| RETRO | 每 n 个 token | 前 n 个 token | 是 |
| IC-RALM | 每句 | 上一句 | 否 |
| IRCoT | 每个 CoT 步骤 | 上一 CoT 句 | 否 |
| Self-RAG | 学习到的特殊 token | 学习到的查询 | 是 |
| **FLARE** | 低置信度触发 | 前瞻临时句 | **否** |

FLARE 的独特优势在于：(1) 自适应检索频率，按需触发而非固定间隔；(2) 前瞻式查询比回顾式更精准；(3) 免训练，仅需 token 概率可访问。

> ⚠️ 注意：FLARE 依赖 token 概率的可访问性。对于仅提供文本输出的黑盒 API（如部分 ChatGPT 接口），需要 API 支持 `logprobs` 参数才能使用。

##### 消融验证

消融实验在 2WikiMQA 上验证了三个核心组件的贡献：
- 去掉置信度触发（始终检索）：F1 从 37.8 降至 34.5（**-3.3**），证明选择性检索的重要性
- 去掉前瞻查询（改用上一句）：F1 降至 35.2（**-2.6**），证明前瞻式查询的优势
- 去掉 token 掩码：F1 降至 35.0（**-1.2**），证明掩码净化查询的作用

#### 🧪 练习题

```yaml
question: "FLARE 中触发检索的核心依据是什么？"
options:
  - "已生成文本的长度达到固定阈值"
  - "临时生成句中存在 token 生成概率低于阈值 θ"
  - "检索器返回的文档相关性分数低于阈值"
  - "用户显式发出检索请求信号"
answer: 1
explain: "FLARE 监测临时生成句中每个 token 的概率，当任一 token 概率低于 θ 时触发检索，这是其区别于固定间隔方法的核心机制。"
```