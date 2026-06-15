### AutoDAN：自动化DAN (AutoDAN)
```yaml
id: autodan
name: AutoDAN
full_name: 自动化DAN (AutoDAN)
year: '2024'
org: 中科院
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/f83cb637e159e789f5576ff6848874de-Abstract-Conference.html
category: jailbreak
parent: gcg
motivation: 遗传算法进化隐蔽提示词
```

#### 📝 一句话总结
AutoDAN 将越狱提示词生成建模为结构化离散文本优化问题，用分层遗传算法在保持语义可读性的同时搜索高成功率攻击提示，从而缓解 GCG 后缀易被困惑度过滤发现的问题。

#### 🎯 核心要点
- 提出面向结构化提示文本的 Hierarchical Genetic Algorithm，而不是逐 token 梯度搜索。
- 从人工提示种群出发，通过适应度评估、精英保留、句子级交叉、词级交叉和低概率 LLM 变异逐代进化。
- 优化目标同时考虑目标模型是否执行被测行为、提示是否自然可读，以及是否能迁移到不同模型。
- 相比无意义字符串后缀，AutoDAN 生成的提示更像正常自然语言，因此更不容易被简单困惑度防御拦截。
- 论文报告 AutoDAN-HGA 在开源和商业模型上具有较强攻击成功率、迁移性和通用性。

#### 🔬 深入细节
![AutoDAN 方法总览](https://arxiv.org/html/2310.04451v2/x1.png)
*图：AutoDAN 总览，展示从初始提示种群到遗传搜索和目标模型评估的流程。*

```python
# AutoDAN-HGA 简化伪代码，只保留论文方法结构
population = initialize_from_safe_eval_templates()
memory_score = defaultdict(float)

for generation in range(max_generations):
    scored = []
    for prompt in population:
        response = target_llm(prompt, benign_placeholder_goal)
        attack_score = judge_success(response)
        stealth_score = naturalness_or_ppl_score(prompt)
        scored.append((prompt, attack_score + alpha * stealth_score))

    elite = select_top_k(scored, k=elite_size)
    parents = roulette_select(scored, n=num_parents)
    children = []
    for p1, p2 in pairwise(parents):
        child = sentence_level_crossover(p1, p2)
        child = word_level_crossover(child, p1, p2, memory_score)
        if random() < mutation_prob:
            child = llm_based_rewrite(child)
        children.append(child)

    memory_score = update_momentum_word_scores(memory_score, scored)
    population = elite + children
    if max(score for _, score in scored) >= success_threshold:
        break

return best_prompt(population)
```

AutoDAN 的核心动机是修复自动越狱攻击中的“可检测性”问题。GCG 类方法通过优化无意义的 token 后缀来提高目标模型输出特定内容的概率，攻击效果强，但文本形态异常，困惑度过滤、重写或简单规则就能识别许多样本。AutoDAN 改为在自然语言提示空间里搜索，使候选提示仍保持句子结构和语义连贯性。

方法上，论文把提示词看成层级结构：上层是句子或子句，下层是词语。句子级交叉负责在两个高适应度提示之间交换更大的语义片段，避免搜索被局部词替换困住；词级交叉负责做更细粒度的表达替换。为了不让搜索退化为随机改写，AutoDAN 使用 momentum word scoring 记住历史上对适应度有贡献的词或片段，让后续交叉更偏向保留有效结构。

适应度函数不是单纯问“攻击是否成功”，而是把目标模型响应、隐蔽性和自然性放到同一个选择压力里。可写成抽象形式：
$$
F(p)=S_{\text{success}}(M(p, q))+\alpha S_{\text{stealth}}(p)+\beta S_{\text{transfer}}(p)
$$
其中 \(p\) 是候选提示，\(q\) 是被测目标，\(M\) 是目标模型。这个设计解释了为什么 AutoDAN 不是纯搜索最大攻击成功率，而是搜索“可用且不显眼”的提示。

训练或推理流程上，AutoDAN 不需要更新目标模型参数，只反复调用目标模型和评估器。每一代先评分，再保留精英个体，用 roulette selection 选择父代，然后生成子代。低概率 LLM-based mutation 用于引入新的自然语言表达，增加多样性，但论文中它不是主要驱动力，主要搜索仍来自分层交叉和适应度选择。

与 GCG 相比，AutoDAN 的创新点在搜索空间和约束形态：GCG 搜索 token 后缀，优势是可微近似强，缺点是字符串异常；AutoDAN 搜索结构化自然语言，优势是隐蔽性和迁移性，缺点是评估调用成本更高，且成功率依赖初始种群和评估器质量。

#### 🧪 练习题
```yaml
question: "AutoDAN 为什么比 GCG 后缀更难被简单困惑度过滤发现？"
options:
  - "因为 AutoDAN 不调用目标模型"
  - "因为 AutoDAN 直接修改模型权重"
  - "因为 AutoDAN 在自然语言结构中进化提示，而不是生成异常 token 串"
  - "因为 AutoDAN 只适用于分类模型"
answer: 2
explain: "AutoDAN 的分层遗传搜索保留句子和词语层面的自然表达，提示文本更接近正常输入，简单 perplexity 阈值更难区分。"
```
