### AutoDAN：自动化 DAN 隐蔽越狱提示生成

```yaml
id: autodan
name: "AutoDAN"
full_name: "自动化DAN (AutoDAN)"
year: "2024"
org: "中科院"
paper_url: "https://proceedings.iclr.cc/paper_files/paper/2024/hash/f83cb637e159e789f5576ff6848874de-Abstract-Conference.html"
category: "jailbreak"
parent: "gcg"
motivation: "遗传算法进化隐蔽提示词"
```

#### 📝 一句话总结
AutoDAN 提出一种基于层次遗传算法的自动化红队提示搜索方法，用语义流畅的自然语言候选替代 GCG 式不可读 token 后缀。它解决了手写 DAN 不可规模化、梯度/token 级攻击不隐蔽且易被困惑度防御识别的问题。

#### 🎯 核心要点
- 将隐蔽提示生成视为离散文本空间中的黑盒/白盒优化问题，而不是直接对 token embedding 做梯度攻击
- 用已有手写 DAN 类提示作为 prototype，再通过 LLM 改写扩增初始化种群，兼顾搜索起点质量与多样性
- 用目标前缀条件 log-likelihood 构造 fitness，把“目标模型是否倾向于继续给出非拒绝回答”转成可优化分数
- AutoDAN-GA 使用段落级多点交叉、轮盘赌选择、精英保留和 LLM mutation
- AutoDAN-HGA 进一步利用文本层次结构，把搜索拆成句子级词汇替换与段落级句子重组两个空间
- 句子级搜索引入 momentum word scoring，对跨迭代稳定有效的词汇赋更高权重，再用近义替换保持语义自然
- 终止条件结合最大迭代次数和拒绝信号检测，返回当前 fitness 最高的候选提示
- 论文在 AdvBench Harmful Behaviors、Vicuna/Guanaco/Llama2/GPT-3.5 等设置下评估攻击有效性、迁移性、通用性与 PPL 隐蔽性

#### 🔬 深入细节

![AutoDAN 官方流程图](https://github.com/SheltonLiu-N/AutoDAN/raw/main/AutoDAN.png)
*图：AutoDAN 官方仓库中的方法概览：从 prototype 初始化种群，经 fitness evaluation，再通过层次遗传策略做段落级交叉、句子级交叉和 LLM-based mutation，最终得到语义流畅的优化提示。*

```python
# AutoDAN-HGA 抽象伪代码：用于授权红队评估的隐蔽提示搜索
prototype = load_authorized_redteam_prototype()
population = llm_diversify(prototype, population_size=M)
word_score_memory = {}

while not exhausted(max_iterations):
    # 1. 句子级搜索：围绕词汇选择做细粒度探索
    for _ in range(sentence_level_steps):
        fitness = evaluate_loglikelihood_fitness(population, target_model, evaluation_goal)
        word_scores = assign_prompt_scores_to_words(population, fitness)
        word_scores = momentum_update(word_score_memory, word_scores, beta=momentum)
        population = synonym_replace_by_score(population, word_scores, keep_semantics=True)
        word_score_memory = word_scores

    # 2. 段落级搜索：围绕句子组合做结构探索
    for _ in range(paragraph_level_steps):
        fitness = evaluate_loglikelihood_fitness(population, target_model, evaluation_goal)
        elites = keep_top_k(population, fitness, elitism_rate)
        parents = roulette_select(population, probs=softmax(fitness))
        children = multipoint_sentence_crossover(parents, crossover_rate)
        children = llm_mutation(children, mutation_rate, preserve_meaning=True)
        population = elites + children

    if no_refusal_signal(best_candidate(population), target_model):
        break

return best_candidate(population)
```

AutoDAN 的动机来自两类旧方法的夹缝：手写 DAN 提示有语义、低困惑度、接近真实用户文本，但依赖人工发现，难以随模型更新快速适配；GCG 等自动方法能通过梯度搜索 adversarial suffix，但常生成不可读或乱码式 token 序列，容易被简单 perplexity/PPL 检测拦截。AutoDAN 的核心判断是：如果目标是生成“像人写的一样”的隐蔽提示，就不应只在 token 层面贪婪改字，而应把提示当作结构化离散文本，用遗传算法做群体搜索。

论文把攻击目标写成目标模型对某个“非拒绝开头/目标前缀”的条件概率最大化。抽象地，给定安全评估问题 \(q\)、候选提示 \(p\)、目标前缀 token \(s_{1:m}\)，模型为下一个 token 给出概率：

$$
P_\theta(x_{n+1}\mid x_{1:n}).
$$

候选提示的优化目标可理解为最大化：

$$
\prod_{i=1}^{m}P_\theta\left(s_i\mid p\oplus q\oplus s_{<i}\right),
$$

等价地最小化负 log-likelihood：

$$
\mathcal{L}(p)=-\sum_{i=1}^{m}\log P_\theta\left(s_i\mid p\oplus q\oplus s_{<i}\right).
$$

遗传算法需要“分数越高越好”的 fitness，因此 AutoDAN 令 \(F(p)=-\mathcal{L}(p)\)。这让搜索可以不依赖可读性很差的梯度 token 替换，而是把模型倾向、语义保持和候选多样性放进同一个进化循环。

初始化阶段并不是随机生成整段提示，而是从手写 prototype 出发，让 LLM 在保持语义和逻辑结构的前提下改写出一个初始 population。这样做有两个好处：第一，prototype 已经包含某些已知红队提示的高层结构，缩小搜索空间；第二，LLM 改写能带来词汇、句式、段落顺序上的多样性，避免整个种群在第一代就过早收敛。这个设计体现了 AutoDAN 的基本取舍：不追求从零发现所有攻击结构，而是把社区经验转化为可自动优化的初始分布。

普通 AutoDAN-GA 在段落层面执行精英保留、softmax 轮盘赌选择、多点交叉和 mutation。若第 \(i\) 个候选 fitness 为 \(F_i\)，选择概率可写为：

$$
\rho_i=\frac{\exp(F_i)}{\sum_j \exp(F_j)}.
$$

高 fitness 候选更可能成为 parent，但低分候选仍保留一定概率参与交叉，从而维持探索。多点交叉是在句子边界交换两个 parent 的片段；mutation 则继续调用 LLM 做局部改写，以降低破坏语义流畅性的风险。

AutoDAN-HGA 的关键增强是把提示看成“段落-句子-词”的层次结构。段落级搜索只重组句子，容易陷入局部最优；词级搜索空间又过大，直接随机改词会破坏语义。HGA 先在句子级为词打分：把包含某个词的提示 fitness 聚合到该词上，并用 momentum 平滑跨迭代噪声。可抽象为：

$$
S_t(w)=\beta S_{t-1}(w)+(1-\beta)\,\overline{F_t(w)}.
$$

随后只挑选高分词汇，在其他候选中寻找近义替换位置。这相当于把“哪些词对当前模型更有效”的信息沉淀下来，再用近义词约束维持自然语言外观。论文中 AutoDAN-HGA 相比 GA 更不容易卡在局部最优，正是因为它同时搜索句子组合与词汇选择。

与 GCG 的区别可以概括为优化粒度不同。GCG 把目标放在 token 后缀上，优势是可借助梯度快速定位 token，但代价是输出常不符合自然语言分布；AutoDAN 把目标放在语义提示本身，牺牲部分精确梯度信息，换取更低 PPL、更强跨模型迁移和更像人工提示的可读性。对防御研究而言，AutoDAN 的价值不在于提供可滥用模板，而在于提醒仅依赖困惑度或乱码检测的防线不足以覆盖语义级自动红队攻击。

> ⚠️ 注意：AutoDAN 属于双用途安全研究。实际使用应限定在授权红队、基准测试和防御评估环境中，避免把算法输出直接用于真实系统绕过。

#### 🧪 练习题
```yaml
question: "AutoDAN-HGA 相比基础 AutoDAN-GA 的主要改进是什么？"
options:
  - "完全删除 mutation，只保留梯度下降"
  - "把提示视为层次化文本，同时做句子级词汇搜索和段落级组合搜索"
  - "只使用随机字符串作为初始化种群"
  - "用更大的模型替代 fitness 函数，不再进行遗传选择"
answer: 1
explain: "HGA 利用文本的层次结构：句子级用 momentum word scoring 做细粒度替换，段落级用交叉和 mutation 做结构探索。"
```
