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

EAGLE 提出 Extrapolation Algorithm for Greater Language-model Efficiency，把投机草稿从离散 token 预测改成目标模型第二顶层特征预测，并用向前错位的 token 序列消除采样分支带来的特征不确定性。它仍用标准 speculative sampling 验证候选，因此在 greedy 和非 greedy 采样下都保持目标 LLM 的输出分布不变。

#### 🎯 核心要点

- 草稿阶段不直接自回归预测 token，而是预测目标 LLM 的 second-to-top-layer feature
- 复用目标模型的 Embedding layer 和 LM Head，只训练轻量 Autoregression Head
- 将 feature sequence 与提前一个时间步的 token sequence 拼接，显式注入已经发生的采样结果
- 训练目标由 Smooth L1 特征回归损失和 LM Head 后的分类损失共同组成，默认 \(L=L_{reg}+0.1L_{cls}\)
- 推理阶段用 tree attention 生成树形草稿，再由目标 LLM 一次前向并行验证树中候选
- 验证阶段沿用 speculative sampling 的接受/拒绝规则，理论上保持原始生成分布
- 在 Vicuna、LLaMA2-Chat、Mixtral 8x7B Instruct 及 MT-bench、HumanEval、GSM8K、Alpaca 上验证，LLaMA2-Chat 70B 报告 2.7x-3.5x 延迟加速

#### 🔬 深入细节

![EAGLE 推理流水线](https://ar5iv.labs.arxiv.org/html/2401.15077/assets/x6.png)
*图：论文 Figure 6 展示 EAGLE 的草稿模型流水线；蓝色模块复用目标 LLM 参数，黄色 Autoregression Head 是需要训练的轻量模块，底部展示 3 次草稿前向构造 10-token tree 的过程。*

```python
# EAGLE feature-level speculative decoding, simplified from the paper
while not finished:
    # 1. Target LLM computes exact features for the accepted prefix.
    F_prefix = target_llm.second_to_top_features(prefix)
    shifted_tokens = prefix[1:] + [last_sampled_token]

    # 2. Draft a token tree in feature space.
    draft_tree = Tree(root=prefix)
    frontier = [draft_tree.root]
    for depth in range(tree_depth):
        batch_inputs = []
        for node in frontier:
            fused = concat(node.feature, target_embedding(node.shifted_token))
            batch_inputs.append(fused)

        next_features = autoregression_head(batch_inputs)
        next_probs = target_lm_head(next_features)
        children = sample_topk_children(next_probs, next_features)
        draft_tree.attach(frontier, children)
        frontier = children

    # 3. Target LLM verifies all tree nodes in one pass with tree attention.
    target_probs = target_llm.verify_tree(prefix, draft_tree)
    accepted, replacement = speculative_accept_or_resample(
        draft_tree=draft_tree,
        draft_probs=draft_tree.probs,
        target_probs=target_probs,
    )
    prefix.extend(accepted or [replacement])
```

EAGLE 先把普通自回归过程拆成特征和 token 两层。目标模型在前缀 \(T_{1:j}\) 上的标准一步生成可以写成：

$$
T_{1:j}\rightarrow E_{1:j}\rightarrow f_j\rightarrow
p_{j+1}=\mathrm{LM\_Head}(f_j)\rightarrow t_{j+1}.
$$

传统 speculative sampling 通常让一个小 draft model 直接产生 \(\hat{T}_{j+1:j+\gamma}\)。问题在于 token 是离散、多峰且对上下文模板敏感的变量，弱 draft model 很容易和目标 LLM 分布错位；Medusa 虽然利用目标模型 feature，但多头直接预测未来 token，仍要处理“未来第几个 token 到底是什么”的离散不确定性。EAGLE 的核心判断是：目标模型 LM Head 前的高层 feature 更连续、更结构化，在这个空间做短程外推更容易。

仅预测 feature 还不够，因为采样本身会造成分支不确定性。论文用 “I” 后面可能采样到 “am” 或 “always” 的例子说明：同一个 \(f_I\) 后续会走向不同的 feature 序列，若草稿模型只看 \(F_{1:i}\)，下一特征目标并不唯一。因此 EAGLE 输入 \(T_{2:i+1}\) 这条“提前一个时间步”的 token 序列，把实际采样结果也喂给草稿模型：

$$
\hat f_{i+1}=\mathrm{Draft\_Model}(T_{2:i+1},F_{1:i}).
$$

这个设计的直觉是：feature 提供连续语义状态，shifted token 告诉模型刚刚选择了哪条离散分支，两者合起来才能定义下一步 feature 的监督目标。工程上，EAGLE 将 token 经过目标模型 Embedding 得到 \(e\)，与 \(f\) 拼接成 \(2d\) 维向量，再经 FC 降回 \(d\) 维，最后由一个 decoder layer 预测 \(\hat f\)。Embedding 和 LM Head 冻结复用目标 LLM，新增训练参数集中在 Autoregression Head。

训练目标同时约束“像真实 feature”和“经过 LM Head 后像真实 token 分布”。论文使用 Smooth L1 做 feature regression：

$$
L_{reg}=\mathrm{SmoothL1}\left(f_{i+1},
\mathrm{Draft\_Model}(T_{2:i+1},F_{1:i})\right),
$$

并把真实和预测 feature 都送入目标 LM Head：

$$
p_{i+2}=\mathrm{Softmax}(\mathrm{LM\_Head}(f_{i+1})),\quad
\hat p_{i+2}=\mathrm{Softmax}(\mathrm{LM\_Head}(\hat f_{i+1})),
$$

$$
L_{cls}=\mathrm{CrossEntropy}(p_{i+2},\hat p_{i+2}),\quad
L=L_{reg}+w_{cls}L_{cls},\quad w_{cls}=0.1.
$$

这里的分类损失不是为了替代 feature regression，而是把最终目标拉回“候选 token 是否更可能被目标模型接受”。推理时 Autoregression Head 会连续消费自己预测出来的 feature，存在误差累积风险；论文用在目标 feature 上加入 \(\mathcal U(-0.1,0.1)\) 噪声的数据增强，让训练时就暴露于轻微 feature 偏移，从而提高多步草稿稳定性。

验证阶段仍是 lossless 的关键。EAGLE 用 tree attention 构造树形草稿，目标 LLM 一次前向给出树中每个候选 token 的目标概率 \(p\)。对每个 draft token \(\hat t_{j+i}\)，接受概率沿用 speculative sampling：

$$
\min\left(1,\frac{p_{j+i}(\hat t_{j+i})}{\hat p_{j+i}(\hat t_{j+i})}\right).
$$

若拒绝，则丢弃后续候选，并从

$$
\mathrm{norm}(\max(0,p_{j+i}-\hat p_{j+i}))
$$

中重采样替换 token。由于最终提交的 token 都经过目标模型概率校正，EAGLE 改变的是“每次前向能验证多少候选”，而不是目标模型定义的文本分布。

与标准 speculative decoding 相比，EAGLE 不依赖同系列的小模型作为 draft model，因此 7B 这类没有合适小草稿模型的场景也能加速；与 Medusa 相比，它没有直接在 token 空间猜多个未来位置，而是在 feature 空间逐步外推并通过目标 LM Head 采样。论文结果也说明 feature&shifted-token 的组合比仅 token、仅 feature 或 feature&unshifted-token 更有效，核心收益来自“连续空间外推 + 显式消除采样分支歧义”这一组合。

#### 🧪 练习题

```yaml
question: "EAGLE 为什么要把 token sequence 提前一个时间步输入草稿模型？"
options:
  - "让草稿模型知道实际采样走向，减少 feature-level 自回归目标的不确定性"
  - "把目标模型的词表大小减半，从而减少 LM Head 参数量"
  - "绕过 speculative sampling 的验证步骤，直接接受所有草稿 token"
  - "将目标 LLM 的所有 Transformer 层替换为一个小模型"
answer: 0
explain: "feature 序列会随采样 token 分支变化；shifted token 提供已发生的离散采样结果，使下一 feature 的监督目标更确定。"
```
