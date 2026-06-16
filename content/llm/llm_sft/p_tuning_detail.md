### P-Tuning：用连续提示稳定离散 Prompt

```yaml
id: p_tuning
name: P-Tuning
full_name: P调优 (P-Tuning)
year: "2021"
org: Tsinghua University
paper_url: https://arxiv.org/abs/2103.10385
category: peft
parent: prefix_tuning
motivation: 连续嵌入替代离散提示优化
```

#### 📝 一句话总结

P-Tuning 提出用可训练的连续提示向量与离散模板拼接，解决人工离散 Prompt 对措辞高度敏感、离散搜索难以直接利用梯度的问题。它把 Prompt 选择从离散 token 搜索转成连续参数优化，并用轻量 Prompt Encoder 建模提示向量之间的依赖。

#### 🎯 核心要点

- 将离散 Prompt 中的部分位置替换或拼接为连续提示向量 `[P]`，由反向传播直接学习。
- 使用 Prompt Encoder 将可训练提示参数映射到输入 embedding，论文实验了 LSTM、MLP 和直接 embedding 三类实现。
- 连续提示可以和原始离散模板同时使用，离散模板提供语义锚点，连续向量提供可优化的任务适配空间。
- 支持两种设置：冻结语言模型只训练提示，或在 SuperGLUE 等任务上联合微调语言模型和提示。
- 在 LAMA 知识探测和 SuperGLUE NLU 上验证，重点展示了对人工 Prompt 方差的稳定化以及对 AutoPrompt、PET 等离散提示方法的性能提升。
- 作为 PEFT 早期代表，它仍主要作用在输入层，提示容量受序列长度约束，这也是 P-Tuning v2 后续引入深层提示的直接原因。

#### 🔬 深入细节

![P-Tuning 连续提示优化示意图](https://ar5iv.labs.arxiv.org/html/2103.10385/assets/x2.png)
*图：论文 Figure 2 对比了离散 Prompt 搜索与 P-Tuning。离散搜索只能根据最终 reward 改 token，连续提示和 Prompt Encoder 则可以通过任务损失端到端优化。*

P-Tuning 的动机来自一个很具体的问题：人工离散 Prompt 在预训练语言模型上并不稳定。同一个知识探测问题，只要把模板中的一个词换掉，LAMA 上的 Precision@1 就可能大幅波动。AutoPrompt 一类方法尝试搜索更好的离散 token，但搜索空间仍是离散的，优化信号无法像普通神经网络参数那样顺畅地反传到每个候选 token。P-Tuning 的核心转折是把 Prompt 的一部分从词表 token 放宽为连续向量，让提示本身成为可微参数。

形式上，给定输入文本 \(x\)、标签 \(y\)、预训练语言模型 \(M_\theta\) 和一组连续提示参数 \(P = \{p_1, \ldots, p_m\}\)，P-Tuning 不再只构造硬模板，例如 `The capital of [X] is [MASK]`，而是在模板中插入若干 `[P]` 槽位。每个槽位通过 Prompt Encoder \(g_\phi\) 映射到语言模型可接受的 embedding：

$$
h_i = g_\phi(p_i), \quad \tilde{x} = [h_1, \ldots, h_a, e(x), h_{a+1}, \ldots, h_m, e(\text{[MASK]})]
$$

其中 \(e(\cdot)\) 是预训练模型原本的词嵌入层，\(h_i\) 是连续提示向量。训练目标仍然是任务条件概率或分类交叉熵，例如在 masked LM 形式下最大化正确 verbalizer token 的概率：

$$
\max_{P,\phi} \sum_{(x,y)\in\mathcal{D}} \log p_{M_\theta}\big(v(y) \mid \tilde{x}; P, \phi\big)
$$

这里 \(v(y)\) 是标签对应的 verbalizer token。若语言模型冻结，则只更新 \(P\) 和 \(\phi\)；若采用联合微调，则 \(\theta\) 也参与更新。

Prompt Encoder 是这篇论文区别于简单 soft prompt 的关键实现细节。直接把每个 `[P]` 当作独立 embedding 会让提示槽位彼此缺少结构约束，尤其当提示被插入到句子中间时，多个提示向量之间的顺序关系很重要。论文尝试用 LSTM 或 MLP 作为 \(g_\phi\)，让一串连续提示先经过轻量网络再送入 PLM。直觉上，这相当于让 Prompt 不只是若干孤立参数，而是一段可学习的“隐式句子”。实验里 LSTM 和 MLP 通常比直接优化 embedding 更稳定，说明 Prompt Encoder 的结构偏置确实能缓解连续提示的优化难度。

P-Tuning 不是完全抛弃离散 Prompt，而是经常把连续提示与人工模板拼接使用。这个选择很务实：离散模板保留任务语义，比如“capital of”暗示知识关系；连续向量则负责补偿模板措辞带来的不稳定性，并在训练集中学习更适合当前模型的隐藏提示。对 LAMA 这类知识探测任务，模型可以冻结，只训练连续提示来读取预训练模型中已有的事实知识；对 SuperGLUE 这类下游 NLU，论文也允许连续提示与模型参数一起微调，使提示成为任务输入重写的一部分。

与 Prefix Tuning 相比，P-Tuning v1 更关注 NLU 和知识探测中的输入模板稳定性，而不是在生成模型每一层注入前缀状态。它的优点是实现简单、参数少、和 BERT/GPT 等不同 PLM 兼容；局限也很明确：连续提示主要插入输入层，因此提示对深层表示的影响是间接的，容量也受最大输入长度限制。这个局限解释了为什么后来的 P-Tuning v2 会把连续提示扩展到 Transformer 的每一层。

```python
# P-Tuning 核心训练逻辑
initialize prompt_slots P = [p_1, ..., p_m]
initialize prompt_encoder g_phi  # LSTM, MLP, or identity

for batch in dataset:
    x, y = batch
    hard_template = build_discrete_template(x)          # e.g. "The capital of [X] is [MASK]"
    soft_prompt = g_phi(P)                              # continuous prompt embeddings
    input_embeds = insert_soft_prompt(hard_template, soft_prompt)

    logits = pretrained_lm(input_embeds)
    target = verbalizer(y)                              # label word or task target
    loss = cross_entropy(logits_at_mask_or_head(logits), target)

    # Frozen setting: update only P and g_phi.
    # Finetuning setting: update P, g_phi, and optionally LM parameters.
    loss.backward()
    optimizer.step()
```

> 💡 关键：P-Tuning 的“连续”并不是让输出标签连续化，而是让输入侧的提示槽位连续化。这样 Prompt 可以像普通神经网络参数一样被梯度优化，同时仍可借助离散模板表达任务语义。

#### 🧪 练习题

```yaml
question: "P-Tuning 相比人工离散 Prompt 的核心优势是什么？"
options:
  - "把所有语言模型参数都压缩成低秩矩阵"
  - "把提示的一部分变成可训练连续向量，从而能用反向传播优化并降低模板措辞敏感性"
  - "在推理阶段搜索所有可能的离散模板"
  - "完全取消 verbalizer 并只使用分类头"
answer: 1
explain: "P-Tuning 的关键是连续提示向量和 Prompt Encoder，优化对象从离散 token 选择变成可微参数，因此能缓解人工模板不稳定问题。"
```
