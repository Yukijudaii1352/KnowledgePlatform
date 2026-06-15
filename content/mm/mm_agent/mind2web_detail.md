### Mind2Web

```yaml
id: mind2web
name: Mind2Web
full_name: "思维到网页 (Mind2Web)"
year: "2023"
org: "OSU"
paper_url: "https://arxiv.org/abs/2306.06070"
category: "web"
parent: "webgpt"
motivation: "跨域网页操作通用Agent基准"
```

#### 📝 一句话总结

Mind2Web 提出面向真实网站的通用 Web Agent 数据集，并给出 MindAct 两阶段基线，用小模型先筛选 DOM 元素、再让 LLM 选择操作，解决真实网页 HTML 过长且跨网站泛化困难的问题。它把 Web Agent 从“搜索问答”推进到跨域、多步骤网页操作。

#### 🎯 核心要点

- **真实网站任务数据集**：包含 2,350 个任务，覆盖 137 个真实网站和 31 个二级领域
- **三部分实例结构**：任务描述、动作序列、网页快照；网页快照提供 MHTML、DOM snapshot、HAR、trace 等多种格式
- **动作表示**：每一步是 `(Target Element, Operation)`，操作包括 Click、Type、Select Option，部分 hover / enter 被统一到 Click
- **三种泛化划分**：Cross-Task、Cross-Website、Cross-Domain，分别考察同网站新任务、未见网站、未见领域
- **MindAct 两阶段模型**：DeBERTa 等小型 ranking LM 先选 top-k 元素，LLM 再用多选题形式预测元素和操作
- **严格评测指标**：Element Accuracy、Operation F1、Step Success Rate、Task Success Rate，任务成功要求所有步骤都正确

#### 🔬 深入细节

##### 框架总览

![MindAct 两阶段网页动作预测流程](https://ar5iv.labs.arxiv.org/html/2306.06070/assets/x3.png)
*图：MindAct 先用小型 ranking LM 从庞大 DOM 中筛出候选元素，再把候选元素组织成 LLM 可处理的多选输入并预测下一步动作。*

##### 算法流程

```python
# MindAct 单步动作预测
def predict_next_action(task, dom_snapshot, action_history):
    elements = extract_interactable_elements(dom_snapshot)

    # Stage 1: 候选元素生成
    scores = {}
    for elem in elements:
        query = build_query(task, action_history)
        elem_text = render_element(elem)  # tag, text, attributes, parent/children
        scores[elem.id] = ranker(query, elem_text)
    candidates = top_k(elements, scores, k=50)

    # Stage 2: LLM 多选动作预测
    groups = partition(candidates, size=5, add_none=True)
    selected = []
    for group in groups:
        prompt = build_multichoice_prompt(task, dom_snapshot, action_history, group)
        choice, operation, value = llm.predict(prompt)
        if choice != "None":
            selected.append((choice, operation, value))

    while len(selected) > 1:
        selected = rerank_by_multichoice(selected)

    if not selected:
        return "NoOp"
    return selected[0]  # (target_element, operation, optional_value)
```

##### 方法细节

**1. 动机与背景**

WebGPT 证明了语言模型可以使用搜索引擎回答问题，但它的动作空间主要是阅读和引用。真实网页任务更复杂：用户可能要筛选商品、填写表单、选择下拉框、跨页面比较信息。已有环境往往是简化网页或少量固定网站，无法衡量 Agent 对陌生网站和陌生领域的泛化。

Mind2Web 的目标是构建一个更接近真实互联网的离线基准。任务不是低层指令，而是高层目标，例如“找到符合条件的航班”或“在某网站修改筛选条件”。每一步标注目标元素和操作，让模型学习如何把自然语言目标落到具体 DOM 元素上。

**2. 数据集定义**

每个样本由三部分组成。第一是高层任务描述，不给逐步说明；第二是动作序列，每步包含目标元素与操作；第三是网页快照，保留原始网页状态，支持从不同表示方式建模。

动作形式可以写作：

$$
a_t=(e_t, o_t, v_t)
$$

其中 \(e_t\) 是当前网页的目标元素，\(o_t\in\{\text{Click},\text{Type},\text{Select}\}\)，\(v_t\) 是 Type 或 Select 所需的文本/选项参数。模型在第 \(t\) 步接收任务 \(g\)、当前页面 \(s_t\)、历史动作 \(h_{<t}\)，预测下一步动作：

$$
\hat{a}_t=\arg\max_a p_\theta(a \mid g, s_t, h_{<t})
$$

**3. 为什么需要两阶段模型**

真实网页 DOM 很大，平均可能包含上千个元素。直接把完整 HTML 输入 LLM 既昂贵又超出上下文限制，且大量节点与任务无关。MindAct 先用简单启发式过滤可见且有语义的元素，将平均元素数从约 1,135 降到 580，同时保留较高目标召回。

之后，DeBERTa-v3-base 作为 cross-encoder ranking LM，对“任务 + 历史动作”和每个候选元素文本做匹配打分：

$$
s_i=f_\theta(q_t, e_i), \quad C_t=\text{TopK}_{i}(s_i)
$$

候选元素文本不仅包含自身 tag、文本和属性，也包含父子节点的上下文，帮助模型判断元素在页面结构中的功能。

**4. LLM 动作预测：多选比自由生成稳定**

MindAct 不让 LLM 从零生成任意 DOM 路径，而是把 top-k 候选拆成多组，每组最多 5 个候选元素并附加 None 选项。LLM 对每组做多选，同时生成操作和参数；若多组都选中候选，再把选中的候选重新分组比较，直到得到单个元素。

这种设计把巨大网页动作空间压缩成多个小的选择题，降低了 LLM 的定位难度，也使 GPT-4、GPT-3.5 这类闭源模型可以通过 in-context learning 参与评测。

**5. 泛化评测的意义**

Mind2Web 的三个测试划分逐步提高难度：Cross-Task 中网站已见但任务新；Cross-Website 中领域已见但网站新；Cross-Domain 中领域也未见。论文结果显示，模型在 Cross-Task 上明显更好，而在未见网站/领域上显著下降，说明 Web Agent 的核心瓶颈不是“知道任务怎么分解”，而是把抽象意图稳定 grounding 到陌生页面结构。

> ⚠️ 注意：Mind2Web 是离线基准，评测的是给定快照下的下一步动作预测；它不要求模型在真实浏览器中执行并恢复错误，这一点与 WebArena 不同。

#### 🧪 练习题

```yaml
question: "MindAct 为什么要先用小型 ranking LM 过滤 DOM 元素？"
options:
  - "因为 LLM 无法生成自然语言操作"
  - "因为真实网页 HTML 元素太多，直接输入 LLM 成本高且噪声大"
  - "因为 Mind2Web 不提供网页快照"
  - "因为所有网页任务都只有一个可点击元素"
answer: 1
explain: "真实网页 DOM 往往有上千个元素，MindAct 先筛出 top-k 候选，再让 LLM 做小规模多选，从而提高效率和定位稳定性。"
```
