### Synthegy — 自然语言引导逆合成

```yaml
id: synthegy
name: Synthegy
full_name: 自然语言引导逆合成 (Synthegy)
year: '2026.05'
org: EPFL
paper_url: https://www.sciencedaily.com/releases/2026/05/260506133400.htm
category: retrosynthesis
parent: aizynthfinder
motivation: LLM驱动自然语言战略引导，专家一致性71.2%
```

#### 📝 一句话总结

Synthegy 将大语言模型放在“化学策略评估器”而不是“直接生成结构”的位置，用自然语言约束对 AiZynthFinder、Reaxys、Synthia 等逆合成工具给出的候选路线打分、解释并排序，从而把专家的合成意图转化为可搜索的路线偏好。

#### 🎯 核心要点

- **自然语言策略输入**：用户可直接写“尽早形成某个环”“避免不必要保护基”“优先高收率且副反应少”等目标，而不是手工配置固定规则
- **候选路线后评估**：底层仍由传统逆合成引擎生成路线，LLM 负责读取路线文本、判断与策略要求的匹配度，并给出 0-10 分和理由
- **兼容多种路线来源**：论文评估了 AiZynthFinder、Reaxys、Synthia 和文献实验路线，说明 Synthegy 是路线评估层而非单一逆合成搜索器
- **策略感知基准**：构建目标分子与自然语言 prompt 的成对任务，用程序化指标或专家评价衡量 route-to-prompt alignment
- **专家一致性验证**：EPFL 新闻稿披露双盲研究中 36 位化学家给出 368 个有效评价，Synthegy 与专家判断平均一致率为 71.2%
- **机制推断同构扩展**：同一框架也用于反应机理搜索，把候选 elementary step 序列交给 LLM 判断化学合理性
- **关键边界**：LLM 不替代反应规则、库存和图搜索；路线质量仍受候选路线生成器的覆盖度限制

#### 🔬 深入细节

##### 来源与框架图

任务给出的 `paper_url` 是新闻页；可追溯到 Matter 论文 *Chemical reasoning in LLMs unlocks strategy-aware synthesis planning and reaction mechanism elucidation*（DOI: `10.1016/j.matt.2026.102812`）、arXiv HTML 版本 `https://arxiv.org/html/2503.08537v2`，以及官方代码仓库 `https://github.com/schwallergroup/steer`。新闻页和论文题名在“strategy-aware synthesis planning”上略有命名差异，但指向同一方法线。

![Synthegy/steer 总览图](https://raw.githubusercontent.com/schwallergroup/steer/main/assets/overview.png)
*图：官方仓库给出的 LLM-as-chemical-reasoning-engine 总览。Synthegy 的核心不是让 LLM 直接画分子，而是让 LLM 解释并评价由化学搜索算法枚举出的候选路线或机理。*

##### 基本流程

Synthegy 的输入是目标分子 \(m\) 和用户策略文本 \(q\)。底层逆合成工具先产生候选路线集合：

$$
\mathcal{R}(m)=\{r_1,r_2,\ldots,r_N\}
$$

每条路线 \(r_i\) 被序列化为包含反应 SMILES、中间体、反应顺序和步骤描述的文本 \(s_i=\text{Serialize}(r_i)\)。LLM 评估器接收 \((q,s_i)\)，输出路线对策略的匹配分数和解释：

$$
S_\theta(q,r_i),\ a_i=\text{LLM}_\theta(\text{Prompt}(q,s_i)),\quad S_\theta\in[0,10]
$$

最终选择或展示：

$$
r^\*=\arg\max_{r_i\in\mathcal{R}(m)} S_\theta(q,r_i)
$$

这里 \(S_\theta\) 不是反应模板概率，也不是路径长度惩罚，而是把“化学家想要的策略”作为文本条件后的语义评分。它可以表达传统搜索权重难以编码的偏好，例如“这个保护基循环是否多余”“关键偶联步骤是否过晚”“某一步是否可能引入副产物”。

```python
# Synthegy 策略感知逆合成伪代码
def synthegy(target_smiles, user_instruction, retrosynthesis_engine, llm):
    routes = retrosynthesis_engine.search(target_smiles)
    scored_routes = []

    for route in routes:
        route_text = serialize_route(
            route,
            include_intermediates=True,
            include_reaction_smiles=True,
            include_step_order=True,
        )
        prompt = build_evaluation_prompt(
            instruction=user_instruction,
            route_text=route_text,
            score_range="0-10",
            require_rationale=True,
        )
        score, rationale = llm.evaluate(prompt)
        scored_routes.append((score, rationale, route))

    return sorted(scored_routes, key=lambda x: x[0], reverse=True)
```

##### 为什么不是直接让 LLM 做逆合成

直接让 LLM 生成分子结构或完整路线时，常见问题是化学合法性、库存约束、反应模板覆盖和可复现性都难控制。Synthegy 采用更保守的分工：图搜索和反应枚举仍由成熟 CASP 系统负责，LLM 只在文本层面对“路线是否符合策略”做判别。

这个设计把 LLM 的强项放在合适位置：它擅长读自然语言约束、综合多步上下文、指出保护基、官能团兼容性、反应顺序等战略问题；而不要求它独自承担原子映射、反应模板应用或购买库存判断。EPFL 新闻稿也明确说明，Synthegy 是把 LLM 作为 evaluator 来指导传统计算工具。

##### 策略评分与基准构造

论文中有两类评估方式。第一类是可程序化验证的策略 prompt，例如“某类环形成反应应尽早发生”。这时可以把路线中满足条件的反应位置转为自动得分：

$$
S_{\text{early}}(r)=
\begin{cases}
10\left(1-\frac{\min J(r)-1}{L(r)-1}\right), & J(r)\neq\varnothing\\
0, & J(r)=\varnothing
\end{cases}
$$

其中 \(L(r)\) 是路线步数，\(J(r)\) 是满足目标反应模式的步骤集合。越靠近起始原料端发生，得分越高；没有发生则为 0。这类任务用于检验 LLM 是否能从路线文本中恢复可验证的结构事件。

第二类是更接近真实研发的可行性 prompt，例如“高可行性、高总收率、考虑副反应和副产物、避免不必要反应”。这种评价没有简单程序答案，因此论文将 AiZynthFinder、Reaxys、Synthia 和文献实验路线放到同一评分框架下，由 LLM 比较路线的全局合理性。arXiv 方法部分说明，feasibility assessment 使用 Gemini-2.5-pro 作为后端 LLM，并要求模型给出 0-10 数值分和详细理由。

##### 与 AiZynthFinder 的关系

YAML 中的 `parent: aizynthfinder` 可以理解为“候选路线生成层”的默认父系统。AiZynthFinder 给定目标分子后，会在反应模板和库存库上执行逆合成树搜索，产出若干可到达原料的路线。Synthegy 在其上增加一层语义价值函数：

$$
\text{CASP route score}(r)
\quad\longrightarrow\quad
\big(\text{CASP score}(r),\ S_\theta(q,r),\ \text{rationale}_\theta(q,r)\big)
$$

如果只做后处理，Synthegy 是 reranker；如果进一步把 \(S_\theta(q,r)\) 接入搜索队列，它就可以成为策略感知 value function，引导搜索优先扩展更符合自然语言目标的路线。当前公开论文和仓库更强调前者：对已有候选路线打分、排序、解释和筛选。

##### 机理搜索的同构思想

Synthegy 还把反应机理拆成最小动作空间：`ionization` 与 `attack`。给定当前分子状态、目标产物、历史 elementary steps 和一个候选下一步，LLM 评估该动作是否符合化学原则：

$$
a_t^\*=\arg\max_{a\in\mathcal{A}(x_t)} S_\theta(a\mid x_t,\text{history},\text{product},q)
$$

这说明框架本质上是“搜索枚举 + LLM 化学判别”：只要候选对象能被文本化，并且评分标准能用自然语言表达，就可以复用同一评估器。

> 💡 关键：Synthegy 的创新不是新的反应模板，而是把专家策略从硬编码过滤器变成自然语言条件下的 LLM 评价函数，使传统 CASP 工具能按人类合成策略重新排序。

#### 🧪 练习题

```yaml
question: "Synthegy 相比直接用 LLM 生成逆合成路线的核心设计差异是什么？"
options:
  - "它完全不用传统逆合成搜索，只由 LLM 生成所有反应步骤"
  - "它让传统工具生成候选路线，再用 LLM 按自然语言策略评分、解释和排序"
  - "它只预测单步反应产率，不处理多步路线"
  - "它把所有路线都转化为固定模板，不允许用户输入自然语言"
answer: 1
explain: "Synthegy 将 LLM 作为 evaluator/reranker，底层路线仍由 AiZynthFinder、Reaxys、Synthia 等工具生成，因此能结合结构搜索的可靠性和自然语言策略表达能力。"
```
