### DAN：无所不能模式 (Do Anything Now)
```yaml
id: "dan"
name: "DAN"
full_name: "无所不能模式 (Do Anything Now)"
year: "2022"
org: "Community"
paper_url: "https://llm-attacks.org"
category: "jailbreak"
parent: "—"
motivation: "角色扮演诱导脱离安全约束"
```

#### 📝 一句话总结
DAN 将“角色扮演”作为越狱入口，诱导模型进入一个声称不受原安全规范约束的对话模式；指定论文链接中的 GCG 工作进一步把这种“模式切换”形式化为可优化的对抗后缀搜索问题，说明手工 DAN 类提示和自动化越狱在机制上都依赖改变模型下一步拒答/顺从的概率分布。

#### 🎯 核心要点
- DAN 的核心是身份重写：让模型扮演一个与原助手不同的虚构角色，从而削弱系统安全策略在生成时的显著性。
- 传统 DAN 依赖人工 prompt engineering，常见结构是“新身份声明、规则覆盖、禁止拒绝、输出格式约束、惩罚或奖励叙事”。
- 指定 paper_url 对应的 llm-attacks 论文把手工越狱推进到自动化攻击：搜索附加在用户请求后的 adversarial suffix，使模型更可能以肯定式回答开头。
- 论文提出 Greedy Coordinate Gradient (GCG)：用 token 级梯度找候选替换，再用真实前向损失筛选最优单 token 修改。
- 为了得到通用越狱，论文同时在多个有害目标、多个开源模型上聚合损失，学习一个可迁移到黑盒模型的共享后缀。
- DAN 类角色扮演和 GCG 的共同点是操纵“当前对话模式”：前者通过自然语言设定角色，后者通过离散 token 优化提高非拒答前缀的概率。
- 安全评测中应只在受控红队数据集和授权模型上使用该类方法，不应发布可直接复用的越狱字符串或真实危害性请求。

#### 🔬 深入细节
![GCG 通用越狱攻击示意图](https://ar5iv.labs.arxiv.org/html/2307.15043/assets/x1.png)
*图：llm-attacks 论文中的 Figure 1，展示单个对抗提示可在多个对齐模型上诱导非预期回答；这里用作理解 DAN 类“模式切换”越狱的技术参照。*

DAN 最初不是一个严格定义的学术算法，而是一族社区传播的角色扮演 prompt。它的关键假设是：聊天模型在生成时会同时受系统消息、用户消息、上下文示例和局部叙事约束影响；如果用户把模型重新描述成“另一个角色”，并在 prompt 中反复强调该角色不受原规则限制，模型可能把后续 token 的高概率区域移向“遵从该角色设定”而不是“遵守安全拒答”。这解释了为什么 DAN 常常带有冗长设定、固定口头禅、双轨输出、惩罚计分等结构：这些结构不是为了增加真实权限，而是为了在上下文中制造一个强烈的局部身份框架。

指定论文链接的工作把这种现象进一步形式化。设原始用户请求为 \(q\)，聊天模板和系统消息合并为 \(c\)，模型为 \(p_\theta\)，DAN 或自动后缀为 \(s\)。越狱成功并不需要精确指定完整回答，而只需要让模型开头进入一个“肯定式响应”轨道。论文因此优化目标前缀 \(y^*\)，即让模型在上下文 \([c, q, s]\) 后生成目标起始片段的负对数似然尽可能小：

$$
\mathcal{L}(s; q, y^*) = -\sum_{t=1}^{|y^*|}\log p_\theta\left(y^*_t \mid c, q, s, y^*_{<t}\right)
$$

直觉上，如果 \(\mathcal{L}\) 很低，说明模型认为“直接进入肯定式回答”比“拒绝回答”更自然。手工 DAN 通过自然语言角色设定降低这个损失；GCG 则把 \(s\) 当成一串可替换 token，通过离散优化寻找更强的触发后缀。

```python
# 安全红队评测版 GCG / DAN 抽象伪代码
# 只描述机制，不输出真实越狱字符串或真实危害性请求
suffix = initialize_neutral_tokens(length=m)
for step in range(num_steps):
    candidate_sets = []
    for pos in range(m):
        # 对当前位置 token 的 one-hot 表示求损失梯度
        grad = gradient(loss_affirmative_prefix(prompt, suffix), token_position=pos)
        # 取最可能降低损失的 top-k 替换 token
        candidate_sets.append(top_k_by_negative_gradient(grad, k))

    batch = sample_single_token_replacements(suffix, candidate_sets, batch_size=B)
    scored = [(cand, loss_affirmative_prefix(prompt, cand)) for cand in batch]
    suffix = argmin_loss(scored)

# 通用版本：对多个评测请求和多个授权模型聚合 loss，再重复上述过程
```

GCG 的关键不是“梯度直接生成文本”，而是用梯度缩小离散搜索空间。语言 token 是离散的，不能像图像像素那样做连续微小扰动；如果暴力枚举每个位置的全部词表替换，计算量又不可接受。GCG 先对当前位置的 one-hot token 表示求 \(\nabla_{e_i}\mathcal{L}\)，用线性近似找最可能降低损失的候选 token，再通过真实 forward pass 精确评估候选后缀。相比 AutoPrompt 每次只固定一个坐标搜索，GCG 在每轮同时为所有可修改坐标产生候选，因此更容易跳出“只改一个位置”的局部限制。

论文的通用攻击版本把单个请求扩展为多请求、多模型目标。若有评测请求集合 \(\{q_j\}_{j=1}^n\) 和模型集合 \(\{M_r\}_{r=1}^R\)，共享后缀 \(s\) 的训练目标可以写成：

$$
\min_s \sum_{r=1}^{R}\sum_{j=1}^{n}\mathcal{L}_{M_r}(s; q_j, y^*_j)
$$

这与 DAN 的“通用角色脚本”很像：一个 DAN prompt 往往试图适配多种恶意请求，而不是为每个请求单独写一套新 prompt。区别在于，DAN 的共享结构是人写的角色叙事，GCG 的共享结构是机器搜索出的 token 后缀；前者更可读、可被规则检测，后者更不自然但在白盒/灰盒评测中可能更容易迁移。

> 💡 关键：DAN 类越狱真正利用的是上下文竞争，而不是获得了系统权限。模型仍然只是在给定上下文下采样下一 token；所谓“无所不能模式”是 prompt 诱导出的生成分布偏移。

从防御视角看，DAN 暴露了三个问题。第一，单纯依赖模型“记得安全规则”并不稳健，因为用户上下文可以制造相互冲突的局部规则。第二，检测不能只匹配某个固定 DAN 字符串，因为角色扮演模板可被改写、翻译、压缩或嵌套。第三，自动化后缀攻击说明，即便移除可读的 DAN 叙事，离散 token 空间中仍可能存在低可读性触发器。因此，实际系统通常需要多层防御：系统消息隔离、输入检测、输出审查、拒答一致性训练、红队回归集和对抗样本持续更新。

#### 🧪 练习题
```yaml
question: "DAN 类角色扮演越狱与 GCG 自动后缀攻击最核心的共同机制是什么？"
options:
  - "直接修改模型参数，使安全策略失效"
  - "改变上下文，使模型更可能进入非拒答或角色顺从的生成模式"
  - "绕过 tokenizer，让模型无法读取用户输入"
  - "降低模型规模，从而减少安全约束"
answer: 1
explain: "二者都不改变模型权重，而是通过上下文诱导改变下一 token 分布；DAN 使用自然语言角色设定，GCG 使用优化出的离散后缀。"
```
