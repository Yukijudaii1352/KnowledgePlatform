### Mind2Web-2

```yaml
id: mind2web_2
name: Mind2Web-2
full_name: "思维到网页2.0 (Mind2Web-2)"
year: "2025"
org: "OSU"
paper_url: "https://github.com/osu-nlp/Mind2Web-2"
category: "frontier_2026"
parent: "mind2web"
motivation: "Agent-as-Judge框架验证引用真实性"
```

#### 📝 一句话总结

Mind2Web-2 提出面向 Deep Research 式 agentic search 的长程网页搜索基准，并用 Agent-as-a-Judge 的树状 rubric 同时评估答案正确性和来源归因。它解决了传统网页基准只适合短步静态任务、难以可靠评估实时多源综合答案的问题。

#### 🎯 核心要点

- 构建 130 个真实、高质量、长程 agentic search 任务，覆盖 6 个大领域和 24 个子领域
- 任务要求实时网页浏览、跨网页信息综合和引用支撑，许多答案具有时间变化性
- 采用 Agent-as-a-Judge，而不是单次 LLM-as-a-Judge，对每个任务构造专门 judge agent
- 使用树状 rubric 分解评价逻辑，叶子节点做二元判定，内部节点聚合为根节点 partial completion
- 同时评估 answer correctness 和 source attribution，要求答案中的关键事实能被引用网页支撑
- 对 10 个前沿 agentic search 系统和人类表现做系统评测，指出最强系统已达到人类 50%-70% 水平但仍有明显差距

#### 🔬 深入细节

##### 框架总览

![Mind2Web-2 概览](https://raw.githubusercontent.com/OSU-NLP-Group/Mind2Web-2/main/assets/mind2web2_overview.jpg)
*图：Mind2Web-2 的任务与评价框架，长程、多源、时间变化任务需要同时检查答案正确性和引用归因。*

清单中的 `paper_url` 指向 GitHub 仓库；项目实际论文页为 `https://arxiv.org/abs/2506.21506`，本文按 Mind2Web-2 官方项目和论文内容解读，元信息字段保持清单原样。Mind2Web-2 的对象不是传统“点击网页完成表单”的 web agent，而是能像研究助理一样浏览网页、综合多源事实并输出带引用长答案的 agentic search 系统。

##### Agent-as-a-Judge 伪代码

```python
# Mind2Web-2 评价流程的简化版
for task in benchmark:
    answer = run_agentic_search_system(task.prompt)
    cited_pages = cache_and_parse(answer.citations)
    rubric_tree = load_task_specific_rubric(task.id)

    for node in postorder(rubric_tree):
        if node.is_leaf():
            node.score = judge_leaf(
                requirement=node.requirement,
                answer=answer.text,
                sources=cited_pages,
            )
        else:
            node.score = aggregate(node.children, node.logic)

    correctness = rubric_tree.correctness_subtree.score
    attribution = rubric_tree.attribution_subtree.score
    partial_completion = rubric_tree.root.score
```

##### 方法细节

Mind2Web-2 的动机来自 agentic search 评估的结构变化。Deep Research 类系统会自主搜索几十分钟，输出几百到几千词，并附带多个引用链接；答案可能随时间变化，且很难用单个 exact match 或静态参考答案判断。传统 Mind2Web/WebVoyager 更关注短程导航或单页面操作，难以覆盖“找出满足多个约束的多项结果，并证明每个事实来源可靠”这类任务。

基准构造阶段，作者投入超过 1000 小时人工劳动，对任务进行设计、打磨和验证。每个任务都要满足现实性、长程性、可验证性和多面性：既要符合真实用户需求，又要需要广泛搜索；既不能只靠常识回答，又必须能通过答案文本和引用网页验证。任务覆盖生活休闲、科学研究、职业教育、旅行交通、娱乐和杂项等领域。

Agent-as-a-Judge 的关键是“生成-验证不对称”。虽然不同 agent 的答案格式、搜索路线和引用页面差异很大，但评测者事先知道一个任务到底要检查哪些事实。因此 Mind2Web-2 为每个任务写出树状 rubric，把复杂需求拆成细粒度节点。例如一个采购任务可能包含价格区间、颜色、品牌、尺寸、是否来自指定商家、每条引用是否支持对应事实等叶子节点。

评价时，judge agent 不是泛泛地问“这个答案好吗”，而是带着特定 rubric 逐节点审查。叶节点通常是二元判断：答案是否给出某项必需事实，引用网页是否支持该事实；内部节点按 AND/OR/加权逻辑聚合，根节点给出 partial completion。这样可以同时产生成功率、Pass@3、部分完成度和失败位置，而不仅是一个粗糙的对错标签。

形式上，可以把 rubric 看成一棵树 \(T\)。叶子节点 \(l\) 的分数为 \(s_l \in \{0,1\}\)，内部节点根据逻辑函数聚合：

$$
s_v = g_v(\{s_u: u \in \mathrm{children}(v)\})
$$

根节点 \(s_{\mathrm{root}}\) 就是 partial completion。相比单次 LLM judge，这个分解让评估更可审计，也能定位 agent 是错在搜索不全、事实不准，还是引用无法支撑。

> 💡 关键：Mind2Web-2 真正评估的是“可验证的网页研究能力”，因此 citation attribution 与 answer correctness 同等重要；没有可靠来源支撑的正确文字也不能算完整完成任务。

#### 🧪 练习题

```yaml
question: "Mind2Web-2 为什么采用树状 rubric 的 Agent-as-a-Judge？"
options:
  - "为了让 agent 少浏览网页，只回答静态问题"
  - "为了把复杂长答案拆成可验证节点，同时检查正确性和引用归因"
  - "为了完全替代人工设计任务"
  - "为了只评估网页点击动作是否符合轨迹"
answer: 1
explain: "Mind2Web-2 的答案长、动态且带引用；树状 rubric 能把任务需求拆成叶子判定并向上聚合，比单次总体打分更可靠。"
```
