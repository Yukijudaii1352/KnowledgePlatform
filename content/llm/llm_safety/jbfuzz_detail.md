### JBFuzz：LLM 模糊测试框架（JBFuzz: Jailbreaking LLMs Efficiently and Effectively Using Fuzzing）

```yaml
id: jbfuzz
name: JBFuzz
full_name: LLM模糊测试框架 (JBFuzz: LLM Fuzzing Framework)
year: "2026.03"
org: RedTeams
paper_url: https://redteams.ai/blog/jbfuzz-99-percent-success
category: jailbreak
parent: —
motivation: 模糊测试自动化越狱框架
```

#### 📝 一句话总结

JBFuzz 将软件模糊测试迁移到 LLM 安全红队评测中，用种子模板选择、同义词变异、目标模型执行和嵌入式评估器组成黑盒自动化测试循环，以高效率发现安全对齐薄弱点。

#### 🎯 核心要点

- 将传统 fuzzing 的 seed pool、seed selection、mutation、execution、evaluation 映射到 LLM prompt-template 搜索流程。
- 黑盒威胁模型：不访问目标 LLM 权重、训练数据、logprobs 或防护实现，只观察最终文本响应；适合授权红队和安全回归测试。
- 为避免旧手工越狱模板被模型厂商针对性修补，论文用高层主题生成新的初始 seed prompt templates，但不要求人工逐条调参。
- 为降低变异成本，用同义词替换替代 LLM mutator；保留问题占位符和非词 token，并约束同词性替换以保持语义可读性。
- 为降低评估成本，用 embedding model + classifier 取代 LLM-as-a-judge；预先嵌入带标签的正负样本，迭代中只需对目标响应做向量化和分类。
- 最终循环包括抽样问题、选择 seed、变异模板、填入测试问题、调用目标 LLM、评估响应、更新 seed 权重并保存成功样本。
- 论文在 9 个主流闭源/开源 LLM 上评估，报告平均 ASR 为 99%，平均每个问题约 60 秒、7 次查询；这些结果应被理解为安全测试风险信号，而不是滥用指南。

#### 🔬 深入细节

![JBFuzz 最终框架](https://arxiv.org/html/2503.08990v1/x2.png)
*图：JBFuzz 的最终框架，将 seed 生成、选择、同义词变异、目标 LLM 执行与 embedding-based evaluator 串成反馈循环。图源：arXiv HTML。*

```python
# JBFuzz 安全化伪代码：用于授权红队评测，不包含具体越狱模板内容
def jbfuzz(questions, seed_pool, target_llm, embedder, classifier, labeled_examples,
           replacement_prob=0.2, budget=1000):
    example_vectors = embedder(labeled_examples.text)
    successes = []

    for step in range(budget):
        q = sample_authorized_test_question(questions)
        seed = select_seed(seed_pool, strategy="ucb_or_weighted_random")
        mutated_template = synonym_mutate(
            seed,
            p=replacement_prob,
            keep_placeholder=True,
            preserve_part_of_speech=True
        )
        prompt = fill_placeholder(mutated_template, q)
        response = target_llm.query(prompt)

        response_vec = embedder(response)
        is_policy_violation = classifier.predict(response_vec, example_vectors)

        if is_policy_violation:
            update_seed_weight(seed_pool, seed, reward=1)
            successes.append({
                "question_id": q.id,
                "template_id": seed.id,
                "response_label": "unsafe"
            })

        if stopping_condition(successes, step):
            break

    return successes
```

JBFuzz 的核心类比是：软件 fuzzing 用大量变异输入触发程序崩溃，LLM fuzzing 用大量变异 prompt template 触发安全策略失效。这个任务具备 fuzzing 适用的几个条件：搜索空间巨大、目标系统难以形式化建模、存在大量未覆盖边界案例，并且可以构造自动 evaluator。与人工红队相比，JBFuzz 的价值不在于单个提示技巧，而在于把“生成候选 -> 查询模型 -> 自动判定 -> 更新搜索”的循环做成可扩展的测试流水线。

论文首先给出一个初始 formulation：种子池 \(\mathcal{S}\) 存放 prompt templates；选择器 \(\mathbb{S}\) 在第 \(t\) 轮选出 \(s_t\)；变异器 \(\mathbb{M}\) 生成 \(m_t\)；执行器 \(\mathbb{EX}\) 将变异模板与测试问题 \(q_t\) 组合后调用目标 LLM 得到响应 \(r_t\)；评估器 \(\mathbb{EV}\) 判断响应是否违反安全预期，得到 \(jb_t\)。这一抽象可以写成：

$$
\mathbb{S}(\mathcal{S})\to s_t,\quad
\mathbb{M}(s_t)\to m_t,\quad
\mathbb{EX}_{\mathcal{L}_{\text{target}}}(m_t,q_t)\to r_t,\quad
\mathbb{EV}(r_t)\to jb_t
$$

初始版本的问题是成本过高：如果 mutation 和 evaluation 都调用强 LLM，每一轮都要等待额外模型响应，几千轮 fuzzing 会很慢且昂贵。JBFuzz 因此提出三个替换：新的 seed 生成策略提升初始质量，同义词变异替代 LLM mutator，embedding-based evaluator 替代 LLM-as-a-judge。这三个替换共同把每轮不可避免的成本集中在目标模型查询上，而把 fuzzer 自身操作压到很低。

同义词变异是 JBFuzz 最具工程感的部分。给定 seed template 的 token 序列 \(l_1,l_2,\ldots,l_n\)，变异器不会改问题占位符，也不会改数字/符号等非词 token；对普通词，以概率 \(p\) 替换为同词性同义词，以概率 \(1-p\) 保持不变：

$$
\mathbb{M}_p(s_t)=l'_1|l'_2|\cdots|l'_n
$$

$$
l'_i=\begin{cases}
l_i, & \text{if }l_i\text{ is question placeholder or not a word}\\
\text{synonym}(l_i), & \text{with probability }p\\
l_i, & \text{with probability }1-p
\end{cases}
$$

这里 \(p\) 控制探索与保真：太小会导致模板多样性不足，太大则可能破坏语义，使模板变成无意义文本。论文特别强调同词性替换，因为把名词替成动词、形容词替成名词会显著降低自然语言模板的可读性。实验中，同义词变异的速率约 388.8 seeds/s，而 LLM-based mutator 约 0.84 seeds/s，速度提升约 462.7 倍。

评估器的替换同样重要。LLM-as-a-judge 准确但慢，并且会引入额外 API 成本和限速。JBFuzz 用 embedding model \(\mathcal{E}\) 将响应与带标签样本 \(\mathcal{Y}\) 映射到向量空间，再用分类器 \(\mathcal{C}\) 判断响应是否落在不安全语义邻域：

$$
\mathbb{EV}_{\mathcal{E};\mathcal{C};\mathcal{Y}}(r_t)=\mathcal{C}\left(\mathcal{E}(r_t),\mathcal{E}(\mathcal{Y})\right)
$$

所有 labeled examples 在 fuzzing 前预先嵌入，迭代时只对目标响应做一次 embedding 和分类。论文探索了不同 embedding model 和 classifier 组合，例如近邻投票或小型 MLP，目标是在速度、准确性和误判率之间取得平衡。这个评估器的局限也很清楚：如果 classifier 有 false positive/false negative，就会错误奖励或错过某些 seed，因此它适合做高吞吐筛查，重要发现仍应进入人工或更强评估链路复核。

最终 JBFuzz 的数据流是：先生成或加载 seed pool，再预计算 \(\mathcal{E}(\mathcal{Y})\)；每轮随机抽一个授权测试问题 \(q_t\)，用 UCB、weighted random 等策略从 seed pool 选择模板，进行同义词变异，填入占位符后查询目标 LLM；embedding evaluator 若判定响应不安全，就更新该 seed 的权重并记录成功样本。攻击成功率按问题粒度统计：

$$
\text{ASR}=\frac{q^s}{|\mathcal{Q}|}
$$

其中 \(q^s\) 是被成功触发不安全响应的问题数，\(|\mathcal{Q}|\) 是测试问题总数。论文还报告 ItS、Efficiency Ratio、Average Token Count、Fuzzing Rate 等指标，用来区分“是否成功”和“以多大代价成功”。这对安全团队很实用：一个 ASR 高但查询成本巨大的方法，与一个 ASR 稍低但每次发布都能快速跑完的回归测试工具，在工程价值上并不相同。

与 GPTFuzzer、人工模板库或单次红队提示相比，JBFuzz 的贡献是把模板发现变成一个低成本闭环系统。但从防御视角看，它也暴露了一个现实问题：只靠对已知模板做拒绝训练，很容易被语义保持的变异或新 seed 绕开。因此论文的正确使用方式应是授权环境中的安全评测与回归测试：发现薄弱点、聚类失败模式、修补模型或 guardrail，而不是传播可直接滥用的具体模板。

> ⚠️ 注意：本文解读刻意不展示论文中的具体危险问题和 prompt template 样例，只保留 fuzzing 机制、评估指标和工程结构，便于用于防御研究和安全测试流程设计。

#### 🧪 练习题

```yaml
question: "JBFuzz 用 embedding-based evaluator 替代 LLM-as-a-judge 的主要原因是什么？"
options:
  - "embedding evaluator 可以直接修改目标 LLM 权重"
  - "embedding evaluator 在 fuzzing 循环中更快、更便宜，能降低每轮评估开销"
  - "embedding evaluator 不需要任何带标签样本"
  - "embedding evaluator 会生成新的 prompt template"
answer: 1
explain: "JBFuzz 的迭代次数很多，若每轮都调用评估 LLM 会非常慢；预嵌入标签样本后，用轻量 embedding + classifier 可以显著降低评估成本。"
```
