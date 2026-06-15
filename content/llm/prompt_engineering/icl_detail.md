### ICL: 上下文学习 (In-Context Learning)
```yaml
id: icl
name: ICL
full_name: 上下文学习 (In-Context Learning)
year: '2021'
org: Google/Stanford
paper_url: https://arxiv.org/abs/2110.04541
category: basic
parent: few_shot
motivation: 研究示例选择与顺序对性能的影响
```

#### 📝 一句话总结
ICL 指模型在不更新参数的情况下利用当前上下文中的任务信号完成新输入；该论文从预训练样本切分角度解释了模型为什么偏好同一上下文内的依赖，并提出用 kNN-Pretraining 改善这种归纳偏置。

#### 🎯 核心要点
- 分析预训练文本被切成固定长度 example 后带来的 in-context inductive bias
- 理论上说明模型更容易建模同一训练 example 内片段之间的依赖，而跨 example 依赖被削弱
- 将 ICL 现象与预训练 example 设计联系起来，而不只看推理时 prompt 模板
- 提出 kNN-Pretraining：把语义相关但非相邻的句子放入同一预训练 example
- 在 Natural Questions closed-book QA 和 SentEval 相似度任务上展示增益
- 启发后续示例检索、示例排序、上下文构造等 prompt engineering 方法

#### 🔬 深入细节
![ICL 归纳偏置与 kNN-Pretraining 效果](https://ar5iv.labs.arxiv.org/html/2110.04541/assets/x1.png)
*图：论文 Figure 1，展示少量 kNN-Pretraining 对 closed-book QA 的提升。图源：ar5iv / arXiv。*

```python
# kNN-Pretraining 风格的上下文构造伪代码
def build_pretraining_example(anchor_sentence, corpus, encoder, max_len):
    neighbors = knn_search(
        query=encoder(anchor_sentence),
        index=[encoder(s) for s in corpus],
        k=K,
    )
    packed = [anchor_sentence]
    for sent in neighbors:
        if token_len(packed + [sent]) <= max_len:
            packed.append(sent)
    return concatenate(packed)
```

论文关注的不是单个 prompt 技巧，而是 ICL 的来源：语言模型在预训练时看到的是一个个长度有限的连续文本块。若两个文本片段出现在同一个训练 example 中，Transformer 的自注意力和语言建模损失可以直接学习它们之间的条件依赖；若它们被切到不同 example，中间没有共同上下文，模型只能通过参数中的统计记忆间接连接。

可以用一个抽象式子表达这种差异：同一上下文中的片段 \(a,b\) 允许模型直接估计 \(p_\theta(b \mid a, c)\)，而不同 example 中的片段只能通过全局参数近似相关性。论文将这种训练机制称为一种 in-context bias，它有利于语言建模，却可能让需要整合语料中分散证据的 NLU 任务受限。

kNN-Pretraining 的思路是改变“哪些文本被放在同一个 example”。给定一个 anchor 句子，用语义检索找到近邻句子，再把这些非相邻但相关的句子打包到同一个预训练样本中。这样模型在训练时就能通过上下文直接看到跨文档或跨位置的语义关系，从而强化“在上下文里对齐相关证据”的能力。

对 prompt engineering 的启发是：ICL 不只是“多放几个例子”，而是要让上下文中的片段形成有用依赖。推理时的示例选择、示例顺序、标签分布和测试输入相似度，都会改变模型可见的条件结构；预训练时的 example 设计则决定模型多大程度上习惯利用这些结构。

> 💡 关键：ICL 的表现由两层因素共同决定：预训练阶段模型是否学会利用同一上下文内的依赖，推理阶段 prompt 是否把有用依赖组织进上下文。

#### 🧪 练习题
```yaml
question: "该论文解释 ICL 归纳偏置时最强调哪一点？"
options:
  - "模型必须通过反向传播学习每个新任务"
  - "同一预训练 example 内的片段依赖比跨 example 依赖更容易被建模"
  - "示例越随机越能提升上下文学习"
  - "上下文学习只由模型参数量决定"
answer: 1
explain: "论文指出常规 chunking 会让模型偏向同一上下文内的信息整合，kNN-Pretraining 正是利用这一偏置。"
```
