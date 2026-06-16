---
domain: llm
topic_id: llm_safety
topic_name: LLM安全 算法总结
page_icon: 🛡️
page_title: LLM安全 算法总结
page_subtitle: '{build_date} 版'
page_desc: 涵盖从早期RLHF对齐到2026年神经元级攻防与过程化幻觉控制的技术演进
hero_pills:
- 越狱攻防 · 幻觉控制 · 价值观对齐 · 内容安全
count_pill: '{count} 个算法'
categories:
  alignment:
    label: 价值观对齐
    color: '#3B82F6'
  jailbreak:
    label: 越狱攻防
    color: '#EF4444'
  hallucination:
    label: 幻觉控制
    color: '#10B981'
  content_safety:
    label: 内容安全
    color: '#8B5CF6'
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_safety/overview/zhihu__报告分享_大语言模型安全和隐私研究综述__bda2fd9e/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/llm/llm_safety/latest/zhihu__LLM_Safety_最新论文推介_-_2026.5.19__c8dd2ae2/article.md

## 算法演化关系

```yaml
nodes:
- id: rlhf
  x: 150
  y: 100
  category: alignment
- id: cai
  x: 150
  y: 80
  category: alignment
- id: dpo
  x: 170
  y: 100
  category: alignment
- id: safe_rlhf
  x: 190
  y: 100
  category: alignment
- id: mart
  x: 190
  y: 80
  category: alignment
- id: safedpo
  x: 220
  y: 100
  category: alignment
- id: star_1
  x: 220
  y: 120
  category: alignment
- id: rmo
  x: 220
  y: 80
  category: alignment
- id: lasa
  x: 220
  y: 60
  category: alignment
- id: cai_2026
  x: 220
  y: 40
  category: alignment
- id: dan
  x: 150
  y: 200
  category: jailbreak
- id: gcg
  x: 170
  y: 200
  category: jailbreak
- id: ppl_filter
  x: 170
  y: 220
  category: jailbreak
- id: self_reminder
  x: 170
  y: 240
  category: jailbreak
- id: llama_guard
  x: 170
  y: 260
  category: jailbreak
- id: autodan
  x: 190
  y: 200
  category: jailbreak
- id: pair
  x: 190
  y: 180
  category: jailbreak
- id: llama_guard3
  x: 190
  y: 260
  category: jailbreak
- id: hmns
  x: 220
  y: 180
  category: jailbreak
- id: neurostrike
  x: 220
  y: 200
  category: jailbreak
- id: proact
  x: 220
  y: 160
  category: jailbreak
- id: aligntree
  x: 220
  y: 260
  category: jailbreak
- id: jbfuzz
  x: 220
  y: 220
  category: jailbreak
- id: jbf
  x: 220
  y: 240
  category: jailbreak
- id: rag
  x: 130
  y: 300
  category: hallucination
- id: truthfulqa
  x: 150
  y: 300
  category: hallucination
- id: selfcheckgpt
  x: 170
  y: 300
  category: hallucination
- id: factscore
  x: 170
  y: 320
  category: hallucination
- id: probe
  x: 220
  y: 300
  category: hallucination
- id: kghalubench
  x: 220
  y: 320
  category: hallucination
- id: abse
  x: 220
  y: 280
  category: hallucination
- id: halp
  x: 220
  y: 340
  category: hallucination
- id: ast_detect
  x: 220
  y: 360
  category: hallucination
- id: perspective
  x: 100
  y: 400
  category: content_safety
- id: toxigen
  x: 150
  y: 400
  category: content_safety
- id: nemo_guard
  x: 170
  y: 400
  category: content_safety
- id: llama_guard3
  x: 190
  y: 400
  category: content_safety
- id: expguard
  x: 220
  y: 400
  category: content_safety
- id: toxigan
  x: 220
  y: 420
  category: content_safety
- id: bielik_guard
  x: 220
  y: 440
  category: content_safety
- id: attriguard
  x: 220
  y: 380
  category: content_safety
- id: toolhijacker
  x: 220
  y: 460
  category: content_safety
edges:
- from: rlhf
  to: cai
  label: 宪法约束
- from: rlhf
  to: dpo
  label: 去奖励模型
- from: dpo
  to: safe_rlhf
  label: 安全约束
- from: dpo
  to: safedpo
  label: 集成安全
- from: cai
  to: cai_2026
  label: 推理框架
- from: safe_rlhf
  to: star_1
  label: 推理模型
- from: safe_rlhf
  to: rmo
  label: 边际重塑
- from: cai
  to: lasa
  label: 跨语言
- from: gcg
  to: autodan
  label: 隐蔽进化
- from: autodan
  to: pair
  label: 黑盒迭代
- from: gcg
  to: neurostrike
  label: 神经元级
- from: llama_guard
  to: llama_guard3
  label: 多模态
- from: llama_guard3
  to: aligntree
  label: 实时拦截
- from: pair
  to: proact
  label: 主动防御
- from: pair
  to: hmns
  label: 头掩蔽
- from: jbfuzz
  to: jbf
  label: 论文转攻击
- from: selfcheckgpt
  to: probe
  label: 过程化
- from: factscore
  to: kghalubench
  label: 图谱验证
- from: rag
  to: abse
  label: 语义熵
- from: truthfulqa
  to: halp
  label: VLM探测
- from: selfcheckgpt
  to: abse
  label: 贝叶斯熵
- from: toxigen
  to: toxigan
  label: 数据增强
- from: nemo_guard
  to: expguard
  label: 专业领域
- from: perspective
  to: bielik_guard
  label: 多语种
- from: llama_guard3
  to: attriguard
  label: 因果归因
- from: nemo_guard
  to: toolhijacker
  label: 工具劫持
milestones:
- rlhf
- dpo
- gcg
```

## 核心算法

### GCG

```yaml
id: gcg
num: 1
name: GCG
full_name: 贪婪坐标梯度 (Greedy Coordinate Gradient)
year: '2023'
org: CMU
parent: —
paper_url: https://arxiv.org/abs/2307.15043
project_url: ''
category: jailbreak
motivation: 梯度优化生成通用对抗后缀
```

#### 📝 一句话总结
GCG 提出了一种基于梯度的离散 token 搜索方法（贪心坐标梯度），通过优化对抗后缀使对齐 LLM 以肯定性开头（如 "Sure, here is"）回复有害指令，并证明该后缀可跨 prompt、跨模型迁移，成功攻击 GPT-4、Claude、PaLM-2 等闭源模型。

#### 🎯 核心要点
- **攻击目标**：最大化模型生成肯定性回复前缀（"Sure, here is [harmful content]"）的概率，将对抗攻击转化为目标序列的负对数似然最小化问题
- **GCG 优化器（Algorithm 1）**：基于 token embedding 梯度选取 top-k 候选替换，对所有位置同时搜索，每步采样 B 个单 token 替换候选并选择 loss 最低者——相比 AutoPrompt 的逐位置搜索效率大幅提升
- **通用攻击（Algorithm 2）**：将损失函数扩展为多 prompt 多模型的聚合梯度，渐进式增加优化目标数量，生成单一后缀即可攻击多种有害行为
- **迁移攻击**：在开源模型（Vicuna、Guanaco）上优化的后缀可直接迁移攻击 GPT-3.5（86.6%）、GPT-4（46.9%）、Claude-1（47.9%）、PaLM-2（66.0%）
- **AdvBench 基准**：构建包含 500 条有害行为和 500 条有害字符串的评估数据集
- **关键发现**：对齐训练（RLHF/Constitutional AI）并不能提供对抗鲁棒性，安全对齐与对抗鲁棒性之间存在根本差距

#### 🔬 深入细节
![GCG 攻击总览](https://arxiv.org/html/2307.15043v2/x1.png)
*图 1：GCG 攻击示意。在用户有害指令后拼接一段对抗后缀（adversarial suffix），使对齐 LLM 绕过安全防护生成有害内容。该后缀可迁移至 ChatGPT、Claude、Bard 等闭源模型。*

##### 问题形式化

给定一个有害用户指令 \(x_{1:n}\)，攻击者的目标是找到一段对抗后缀 \(p_{1:l}\)，使模型在输入 \(x_{1:n} \| p_{1:l}\) 后以特定的肯定性目标序列 \(x^*_{n+1:n+H}\)（如 "Sure, here is a tutorial for making a bomb"）开头回复。优化目标为最小化目标序列的负对数似然：

$$\mathcal{L}(p_{1:l}) = -\log p(x^*_{n+1:n+H} \mid x_{1:n} \| p_{1:l})$$

> 💡 **关键洞察**：作者发现，只要模型以肯定性前缀开头回复（而非拒绝），后续生成几乎必然会产生有害内容。这一观察将复杂的"让模型说有害内容"问题简化为"让模型说 Sure"的可优化目标。

##### GCG 搜索算法（Algorithm 1）

```python
# GCG: Greedy Coordinate Gradient 核心伪代码
def gcg_attack(prompt, suffix, target, model, T=500, k=256, B=512):
    """
    prompt: 有害指令 x_{1:n}
    suffix: 对抗后缀 p_{1:l}（随机初始化）
    target: 肯定性目标 "Sure, here is..."
    """
    for t in range(T):
        # Step 1: 计算每个后缀位置的 token 梯度
        # 对 one-hot token embedding 求梯度，选 top-k 最有希望的替换
        for i in range(len(suffix)):
            gradients = compute_gradient(loss, e_{p_i})  # 对第 i 个 token 的 embedding 求梯度
            X_i = top_k(-gradients, k)  # 梯度负方向 = loss 下降最快的 token

        # Step 2: 采样 B 个候选替换
        candidates = []
        for b in range(B):
            p_tilde = copy(suffix)
            i = random_position()              # 随机选一个位置
            p_tilde[i] = random_choice(X_i)    # 从该位置的 top-k 中随机选一个 token
            candidates.append(p_tilde)

        # Step 3: 评估所有候选，选最优
        losses = [compute_loss(prompt, c, target, model) for c in candidates]
        suffix = candidates[argmin(losses)]

    return suffix
```

> ⚠️ **与 AutoPrompt 的关键区别**：AutoPrompt 每步只搜索一个固定位置的替换；GCG 每步对**所有位置**同时计算梯度并采样候选，虽然每次仍只替换一个 token，但搜索空间覆盖更广，实验表明这一改动带来了巨大的性能提升。

##### 通用攻击优化（Algorithm 2）

单 prompt 攻击虽然有效，但每条有害指令都需要独立优化。Algorithm 2 将目标扩展为多 prompt 多模型的联合优化：

$$p^* = \arg\min_{p_{1:l}} \sum_{j=1}^{m} \mathcal{L}_j(x^{(j)}_{1:n} \| p_{1:l})$$

其中 \(\mathcal{L}_j\) 是第 \(j\) 个 prompt-模型对的损失。关键设计包括：

1. **梯度聚合**：对所有 prompt 和模型的梯度求和，选取聚合 top-k 候选：
   $$\mathcal{X}_i = \text{Top-}k\left(-\sum_{1 \leq j \leq m_c} \nabla_{e_{p_i}} \mathcal{L}_j\right)$$

2. **渐进式扩展**：不一次优化所有 prompt，而是从 \(m_c=1\) 开始，当当前 prompt 集合全部攻击成功后才增加 \(m_c\)，逐步扩展优化目标数量。这避免了一开始目标过多导致优化困难。

3. **多模型联合**：损失函数可同时包含多个模型（如 Vicuna-7B 和 Vicuna-13B），使优化出的后缀具有跨模型迁移能力。

##### 迁移攻击机制

![迁移攻击成功率](https://arxiv.org/html/2307.15043v2/x3.png)
*图 3：GCG 对抗后缀在不同 LLM 上的迁移攻击成功率（ASR）。在 Vicuna/Guanaco 上优化的后缀可迁移至架构、词表、参数量和训练方法完全不同的模型。*

迁移攻击的核心发现：

- **开源→闭源迁移**：在 Vicuna-7B/13B + Guanaco-7B/13B 上联合优化的后缀，可直接拼接到发送给 GPT-3.5/GPT-4/Claude 的 prompt 中
- **集成策略（Ensemble）**：生成多个对抗后缀，只要其中任一成功即算攻击成功，可将 GPT-3.5 的 ASR 从 47.4% 提升至 86.6%
- **跨架构有效**：即使目标模型的词表、架构（decoder-only vs encoder-decoder）、参数量完全不同，对抗后缀仍然有效

##### 实验结果

![优化器性能对比](https://arxiv.org/html/2307.15043v2/x2.png)
*图 2：不同优化器在 Vicuna-7B 上诱导有害字符串的性能对比。GCG 在 loss 和 ASR 上均大幅领先。*

**单模型攻击（Table 1）**：

| 方法 | 有害字符串 ASR (Vicuna) | 有害字符串 ASR (LLaMA-2) | 有害行为 ASR (Vicuna) | 通用攻击测试 ASR (Vicuna) |
|------|----------------------|------------------------|---------------------|------------------------|
| PEZ | 2% | 1% | 22% | 3% |
| GBDA | 1% | 0% | 36% | 5% |
| AutoPrompt | 24% | 3% | 57% | 36% |
| **GCG** | **88%** | **55%** | **57%** | **84%** |

**迁移攻击（Table 2）**：

| 方法 | GPT-3.5 | GPT-4 | Claude-1 | Claude-2 | PaLM-2 |
|------|---------|-------|----------|----------|--------|
| 仅有害行为 | 1.8% | 8.0% | 0.0% | 0.0% | 0.0% |
| + "Sure, here's" | 5.7% | 13.1% | 0.0% | 0.0% | 0.0% |
| + GCG (Vicuna) | 34.3% | 34.5% | 2.6% | 0.0% | 31.7% |
| + GCG (Vicuna & Guanaco) | 47.4% | 29.1% | 37.6% | 1.8% | 36.1% |
| + GCG Ensemble | **86.6%** | **46.9%** | **47.9%** | 2.1% | **66.0%** |

> 💡 **核心启示**：Claude-2 对迁移攻击表现出最强的鲁棒性（ASR 仅 2.1%），可能与其 Constitutional AI 训练方法有关。但这并不意味着 Claude-2 不可攻击——作者指出这可能只是当前攻击方法的局限，而非根本性的安全保障。

##### 与传统方法的对比

| 维度 | 传统 Jailbreak（手工） | AutoPrompt | GCG |
|------|----------------------|------------|-----|
| 构造方式 | 人工设计 prompt 模板 | 梯度引导逐位置搜索 | 梯度引导全位置同时搜索 |
| 自动化程度 | 低（需人类创意） | 高 | 高 |
| 通用性 | 模板固定，易被防御 | 单 prompt 优化 | 多 prompt 多模型通用 |
| 迁移性 | 依赖模板通用性 | 弱 | 强（开源→闭源） |
| 搜索效率 | N/A | 每步搜索 1 个位置 | 每步搜索所有位置 |

GCG 的核心创新在于将对抗攻击从"人工试错"推进到"自动化优化"，并首次证明了对齐 LLM 存在系统性的对抗脆弱性。这一发现对 AI 安全领域具有深远影响：它表明当前的安全对齐方法（RLHF、Constitutional AI 等）虽然能有效防御自然语言攻击，但无法抵御经过优化的对抗性输入。

#### 🧪 练习题
```yaml
question: "GCG 相比 AutoPrompt 的核心改进是什么？"
options:
  - "使用了更大的语言模型作为攻击目标"
  - "每步对所有后缀位置同时计算梯度并采样候选替换，而非逐位置搜索"
  - "引入了强化学习来优化对抗后缀"
  - "使用连续向量空间优化代替离散 token 搜索"
answer: 1
explain: "GCG 的关键改进在于每步对所有位置同时计算 top-k 候选，然后随机选择位置和 token 进行替换，相比 AutoPrompt 每步只搜索一个固定位置，搜索空间覆盖更广，攻击成功率大幅提升。"
```

### AutoDAN

```yaml
id: autodan
num: 2
name: AutoDAN
full_name: 自动化DAN (AutoDAN)
year: '2024'
org: 中科院
parent: gcg
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/f83cb637e159e789f5576ff6848874de-Abstract-Conference.html
project_url: ''
category: jailbreak
motivation: 遗传算法进化隐蔽提示词
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

### PAIR

```yaml
id: pair
num: 3
name: PAIR
full_name: 提示词自动迭代优化 (Prompt Automatic Iterative Refinement)
year: '2024'
org: UPenn
parent: autodan
paper_url: https://ieeexplore.ieee.org/abstract/document/10992337/
project_url: ''
category: jailbreak
motivation: 攻击者LLM迭代优化提示词
```

#### 📝 一句话总结
PAIR 提出用一个 attacker LLM 通过黑盒查询、自然语言反馈和迭代反思来自动生成 prompt-level 红队测试提示。它解决了手写提示不可扩展与 GCG 式 token 级攻击查询量大、不可解释、迁移性受限的问题，通常在很少轮次内完成语义级候选优化。

#### 🎯 核心要点
- 使用三个角色：attacker LLM 生成候选提示，target LLM 返回响应，judge 函数判断是否达到红队测试目标
- 只需要黑盒 API 访问，不要求目标模型权重、logits 或梯度信息
- 攻击粒度是 prompt-level semantic jailbreak，生成结果保持人类可读，区别于 token-level adversarial suffix
- 每轮包含四步：attack generation、target response、jailbreaking scoring、iterative refinement
- attacker 的上下文保存历史候选、目标响应和 judge 分数，并生成自然语言 improvement 来指导下一轮
- 支持并行 streams，用宽度 \(N\) 和深度 \(K\) 控制探索，最坏查询复杂度为 \(N\cdot K\)
- 论文用 JailbreakBench/JBB-Behaviors、AdvBench 等数据，并比较 GCG 与人工模板类方法
- judge 既可用 GPT-4 等强模型校验，也可用 Llama Guard 等可复现实验的开源安全分类器

#### 🔬 深入细节
![PAIR 官方流程示意图](https://jailbreaking-llms.github.io/static/images/pair_example.jpg)
*图：PAIR 项目页示意 attacker 与 target 的闭环。attacker 根据系统目标生成候选提示，target 返回响应，attacker 再基于历史反馈改进下一轮候选；论文实现中还加入 judge 对候选响应进行二元评分。*

```python
# PAIR 单流抽象伪代码：用于授权红队评估的黑盒迭代提示优化
conversation = []
attacker = AttackerLLM(system_prompt=redteam_objective_and_rules)
target = TargetLLM(black_box_api=True)
judge = SafetyJudge()

for step in range(K):
    # 1. attacker 基于历史记录生成候选提示和改进说明
    candidate_prompt, improvement = attacker.propose(conversation)

    # 2. target 只暴露黑盒响应
    target_response = target.generate(candidate_prompt)

    # 3. judge 判断响应是否满足预定义红队测试判据
    score = judge(candidate_prompt, target_response)  # score in {0, 1}

    if score == 1:
        return candidate_prompt

    # 4. 将失败样本、响应和分数写回上下文，驱动下一轮 refinement
    conversation.append({
        "prompt": candidate_prompt,
        "response_summary": summarize_for_safety(target_response),
        "score": score,
        "improvement": improvement,
    })

return best_candidate_seen(conversation)
```

PAIR 的问题设定非常直接：给定黑盒目标模型 \(T\)、候选提示 \(P\)、目标响应 \(R\sim q_T(P)\)，以及一个 judge 函数，算法希望在有限查询内找到能触发预定义红队判据的提示。论文把 judge 结果写成二元变量：

$$
S=\texttt{JUDGE}(P,R)\in\{0,1\}.
$$

当 \(S=1\) 时，候选被认为通过测试并停止；当 \(S=0\) 时，PAIR 不做梯度更新，而是把 \((P,R,S)\) 放入 attacker 的对话历史，让 attacker 用自然语言解释失败原因并提出下一轮候选。

PAIR 和 AutoDAN/GCG 的关键差异是搜索算子来自 LLM 的 in-context refinement，而不是遗传交叉或 token 梯度。attacker LLM 被设定为红队助手，它每轮读取目标 \(O\) 和历史 \(C_t\)，生成候选：

$$
P_t \sim A(\cdot\mid O,C_t).
$$

目标模型返回：

$$
R_t \sim T(\cdot\mid P_t),
$$

judge 给出：

$$
S_t=\texttt{JUDGE}(P_t,R_t).
$$

若失败，则更新历史：

$$
C_{t+1}=C_t\cup\{P_t,R_t,S_t,\text{improvement}_t\}.
$$

这个循环把搜索空间保持在自然语言提示层面，避免生成不可解释 token 后缀；同时，它利用强 LLM 的常识、角色扮演理解、语境重写和失败归因能力，减少人工模板设计成本。

论文强调 PAIR 的四个步骤：第一是 attack generation，即 attacker 生成候选提示；第二是 target response，即把候选发给目标模型并收集黑盒响应；第三是 jailbreaking scoring，即用 judge 判断响应是否满足测试目标；第四是 iterative refinement，即把历史结果反馈给 attacker 继续搜索。这个设计本质上是一个小样本黑盒优化器：目标函数不可微、反馈稀疏、搜索空间是自然语言，但优化器本身也具备语言建模能力。

并行 streams 是 PAIR 的工程关键。单条链路深度为 \(K\)，可能过早陷入某种策略；多条链路宽度为 \(N\)，可以同时探索不同语义方向。最坏查询次数满足：

$$
Q_{\max}=N\cdot K.
$$

当 \(N\ll K\) 时，算法偏向深度迭代，适合需要多轮修正的目标；当 \(N\gg K\) 时，算法偏向广度搜索，适合快速尝试多种语义策略。论文实验默认使用较大的并行宽度和较小深度，这与“少量查询内发现候选”的目标一致。

PAIR 的优势来自黑盒性和语义性。GCG 需要白盒梯度或大量近似查询，且输出 token 后缀常不可读；人工模板可读但依赖人工经验。PAIR 处在二者之间：它不需要模型内部信息，也不需要人工逐条设计，而是让 attacker 自动提出、观察、修正。由于候选是自然语言，成功样本往往更容易跨模型迁移；但这也意味着评估必须保守，judge 需要尽量降低误报，并且实验应在授权红队范围内进行。

> 💡 关键：PAIR 的“优化变量”不是 token 向量，而是 attacker LLM 的对话上下文。每一次失败都会变成下一轮生成的条件，因此算法的有效性高度依赖历史摘要、judge 质量和并行搜索预算。

#### 🧪 练习题
```yaml
question: "PAIR 为什么可以在没有目标模型梯度的情况下迭代优化提示？"
options:
  - "它训练了一个新的目标模型来替代黑盒模型"
  - "它让 attacker LLM 根据目标响应、judge 分数和历史记录进行自然语言 refinement"
  - "它只使用固定人工模板，不进行搜索"
  - "它通过困惑度过滤直接保证所有候选成功"
answer: 1
explain: "PAIR 将黑盒反馈写入 attacker 的上下文，利用 LLM 的自然语言改写和失败归因能力生成下一轮候选，因此不需要目标模型梯度。"
```

### DAN

```yaml
id: dan
num: 4
name: DAN
full_name: 无所不能模式 (Do Anything Now)
year: '2022'
org: Community
parent: —
paper_url: https://llm-attacks.org
project_url: ''
category: jailbreak
motivation: 角色扮演诱导脱离安全约束
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

### Perplexity Filter

```yaml
id: ppl_filter
num: 5
name: Perplexity Filter
full_name: 困惑度过滤器 (Perplexity Filter)
year: '2023'
org: Academic
parent: —
paper_url: https://arxiv.org/abs/2308.14132
project_url: ''
category: jailbreak
motivation: 困惑度异常检测过滤
```

#### 📝 一句话总结
Perplexity Filter 用外部语言模型计算输入 prompt 的困惑度，把机器生成的异常对抗后缀视为分布外文本进行拦截；论文发现单一困惑度阈值误报较高，而将困惑度与 token 长度输入 LightGBM 分类器能显著改善对 GCG 类后缀攻击的检测。

#### 🎯 核心要点
- 论文目标是检测 Zou et al. GCG 风格的 adversarial suffix，而不是直接判断模型输出是否有害。
- 过滤器使用 GPT-2 计算用户 prompt 的 perplexity，假设自然文本在语言模型下更高概率、机器搜索后缀更低概率。
- 朴素阈值规则为 \(\mathrm{PPL}(x)>\tau\) 判定攻击，但多语言、代码、数学符号、短文本等正常输入会造成高困惑度误报。
- 论文加入 token sequence length，与 perplexity 共同作为特征训练 LightGBM，以区分“长而异常的攻击后缀”和“短而罕见的正常文本”。
- 数据包含 1,407 个 GCG 机器生成攻击 prompt、79 个人工 GPT-4 jailbreak prompt，以及多来源普通 prompt。
- 实验显示分类器对机器生成后缀攻击有效，但对人工设计的自然语言 jailbreak 基本失效，说明该防御只覆盖特定威胁模型。
- 最适合部署为输入侧风险信号，与语义安全分类器、输出审查和速率限制结合，而不是单独作为完整安全边界。

#### 🔬 深入细节
![Perplexity 与序列长度联合分布](https://ar5iv.labs.arxiv.org/html/2308.14132/assets/media/pp-len_all_prompts.png)
*图：论文 Figure 2，横轴为 log-PPL，纵轴为 log-length；红色攻击样本和绿色正常样本在二维空间中比单独 PPL 更容易分离。*

困惑度过滤器的出发点是：GCG 等自动后缀攻击通常会产生人类看来不自然的 token 序列，例如罕见符号、大小写混杂、奇怪标点和语法断裂。虽然这些 token 对目标模型可能降低“肯定式回答”的损失，但在一个普通语言模型看来，它们不像自然网页文本或正常问句。因此可以用一个独立 LM，例如 GPT-2，估计 prompt 的平均负对数似然，并把异常高的输入标记为可疑。

给定 token 序列 \(x=(x_1,\dots,x_T)\)，语言模型给出条件概率 \(p_\phi(x_t\mid x_{<t})\)。论文使用的核心统计量是 perplexity：

$$
\mathrm{PPL}(x)=\exp\left(-\frac{1}{T}\sum_{t=1}^{T}\log p_\phi(x_t\mid x_{<t})\right)
$$

\(\mathrm{PPL}\) 越高，表示平均每个 token 越出乎语言模型意料。对抗后缀攻击的典型特征是把一段正常请求和一段机器搜索出的异常后缀拼接起来，因此整体 PPL 往往上升。论文报告，机器生成 adversarial suffix 中大量样本 PPL 极高，接近 90% 的样本超过 1000，而相关样本整体在 200 以上。

```python
# Perplexity Filter 推理伪代码
# 输入侧检测，不执行用户请求，不依赖目标闭源模型内部权重

def score_prompt(prompt):
    ids = gpt2_tokenize(prompt)
    nll = 0.0
    for t in range(1, len(ids)):
        prob = gpt2_prob(ids[t], context=ids[:t])
        nll += -log(prob)
    ppl = exp(nll / max(1, len(ids) - 1))
    length = len(ids)
    return ppl, length

def classify_prompt(prompt, threshold):
    ppl, length = score_prompt(prompt)
    risk = lightgbm.predict_proba([[ppl, length]])[0, 1]
    if risk >= threshold:
        return "block_or_review"
    return "allow_to_next_safety_layer"
```

朴素版本只需要一条规则：\(\mathrm{PPL}(x)>\tau\) 即拦截。但论文强调，这个一维阈值在真实流量中很脆弱。普通用户可能输入代码片段、数学表达式、非英语文本、拼写错误、单词列表或短命令，这些内容对 GPT-2 也可能呈现很高 PPL。相反，人工撰写的 jailbreak 往往仍是自然语言角色扮演，PPL 可能接近正常 prompt。于是单一阈值会同时带来 false positive 和 false negative。

长度特征解决的是一个很具体的混淆：自动 adversarial suffix 通常是“完整请求 + 长后缀”，因此 token 长度不会太短；很多正常高 PPL 样本虽然异常，但可能只是短代码、短公式或孤立符号。二维特征 \((\mathrm{PPL}, T)\) 让模型学习到“长且困惑度高”的区域更可疑，而“短且困惑度高”的区域需要更谨慎。论文使用 LightGBM 而不是手写复杂规则，是因为树模型能自然学习非线性边界，例如在不同长度区间使用不同 PPL 分割。

训练数据设计也体现了威胁模型边界。攻击侧包括 1,407 个由 Vicuna-7B-1.5 上运行 GCG individual 方法生成的机器后缀 prompt，以及 79 个人工 GPT-4 jailbreak prompt；正常侧混合了人类 GPT-4 prompts、DocRED、SuperGLUE BoolQ、SQuAD-v2、Platypus、Tapir 和 instructional code-search prompts 等。这样的组合故意把“正常但形态复杂”的输入加入负类，用来检验过滤器是否只是把所有奇怪文本都拒掉。

![LightGBM 测试集混淆矩阵](https://ar5iv.labs.arxiv.org/html/2308.14132/assets/media/GBM_confusioin_matrix.png)
*图：论文 Figure 3(a)，二维特征分类器在测试集上能识别多数机器生成攻击，但仍保留人工 jailbreak 漏检风险。*

实验结论需要谨慎解读。论文中的 GBM 分类器在测试集 \(F_\beta\) 得分约 94.2%，若排除人工 jailbreak 样本则达到约 99.1%；对机器生成攻击有较高召回，但 23 个人工 jailbreak 测试样本全部成为 false negative。这个结果说明 Perplexity Filter 是“检测机器优化后缀”的强特征，而不是“理解恶意意图”的语义安全模型。若攻击者把目标改成生成低 PPL、流畅自然的 jailbreak，或者在优化目标中显式惩罚高 PPL，单纯困惑度防御就会退化。

> ⚠️ 注意：Perplexity Filter 的优势是便宜、模型无关、可解释；弱点是覆盖面窄，不能把它当作完整的 jailbreak 防线。

实际部署时更合理的做法是把 PPL 作为输入风控管线的一项分数。高风险输入可以进入人工审核、更强安全分类器、隔离沙箱或更严格输出审查；中低风险输入继续由系统消息、工具权限控制和输出侧 policy model 处理。对于多语言或代码助手，还应使用与业务域匹配的语言模型计算 PPL，否则正常专业输入会被误伤。

#### 🧪 练习题
```yaml
question: "为什么论文认为只用单一 perplexity 阈值不是理想的 jailbreak 过滤器？"
options:
  - "因为 perplexity 无法由语言模型计算"
  - "因为正常的代码、数学、非英语或短文本也可能有高 perplexity，导致误报"
  - "因为 GCG 后缀一定拥有最低 perplexity"
  - "因为 token 长度与攻击检测完全无关"
answer: 1
explain: "单一 PPL 阈值不能区分异常但正常的输入和机器生成攻击后缀；论文用 PPL 加 token 长度训练 LightGBM 来降低这种混淆。"
```

### Self-Reminder

```yaml
id: self_reminder
num: 6
name: Self-Reminder
full_name: 自我提醒 (Self-Reminder)
year: '2023'
org: Academic
parent: —
paper_url: https://www.nature.com/articles/s42256-023-00765-8
project_url: ''
category: jailbreak
motivation: 系统提示词防御指令
```

#### 📝 一句话总结
Self-Reminder 提出 system-mode self-reminder：在系统层把用户查询包裹在责任提醒中，让模型在生成前后都显式回到“负责任助手”模式；论文在构造的 jailbreak 数据集上将 ChatGPT 的攻击成功率从 67.21% 降到 19.34%，且不需要重新训练模型。

#### 🎯 核心要点
- 方法灵感来自心理学中的 self-reminder：用外部提示帮助主体维持目标、规则和自我控制。
- 防御形式是系统提示词包装：在用户查询外层加入责任提醒，而不是修改用户原文或训练模型参数。
- 关键设计是 system-mode：提醒位于比用户 jailbreak 更外层的系统上下文，试图抢占对话“当前模式”的优先级。
- 论文构造 540 个 jailbreak 样本，由 54 个有效 jailbreak prompt 和 10 类 malicious instructions 组合而成。
- 恶意指令分为 misinformation 和 toxic 两类，用于评估不同危害场景下的攻击成功率。
- 评估使用 ChatGPT API gpt-3.5-turbo-0301 重复 5 次，平均 ASR 从 67.21±1.28% 降至 19.34±0.37%。
- 论文还检查了常规任务副作用、adaptive attacks、prefix/suffix-only ablation 和不同提醒语气，证明简单提示防御有效但并非完备。

#### 🔬 深入细节
![System-Mode Self-Reminder 示意图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig1_HTML.png)
*图：Nature Machine Intelligence 论文 Figure 1，对比无 jailbreak、有 jailbreak、以及用 system-mode self-reminder 包裹用户查询后的响应差异。*

Self-Reminder 的问题设定很直接：许多 jailbreak 并不是攻击模型权重，而是在上下文里诱导模型切换到一个不受控角色，例如要求模型忘记安全规则、扮演另一个代理、禁止道歉或禁止拒绝。作者认为，既然 jailbreak 能通过 prompt 把模型推入某种“模式”，防御也可以在更外层显式设定一个安全模式，让模型在处理用户输入时不断提醒自己是负责任的助手。

形式化地，设用户原始查询为 \(q\)，攻击者插入的 jailbreak 上下文为 \(j\)，模型为 \(M\)。无防御时，模型看到的输入近似为：

$$
x_{attack} = j \oplus q
$$

Self-Reminder 定义一个包装函数 \(D(\cdot)\)，把用户侧内容嵌入系统层责任提醒中：

$$
x_{defended} = D(j \oplus q) = r_{pre} \oplus \langle user\ query: j \oplus q \rangle \oplus r_{post}
$$

其中 \(r_{pre}\) 和 \(r_{post}\) 不是普通聊天内容，而是提醒模型保持负责任行为、避免有害或误导性输出的系统级约束。这个设计的核心不是关键词过滤，而是利用聊天模型对 system prompt 和外层上下文的服从倾向，让安全目标在注意力竞争中比用户注入的角色设定更显著。

```python
# System-Mode Self-Reminder 防御伪代码
# 使用概念化模板，避免复刻论文中的完整可执行提示词

def build_self_reminder_prompt(user_query):
    pre_reminder = (
        "System: operate as a responsible assistant; "
        "avoid harmful or misleading content; answer the enclosed request responsibly."
    )
    post_reminder = (
        "System reminder: keep the same responsible mode when producing the final answer."
    )
    return f"{pre_reminder}\n<UserQuery>\n{user_query}\n</UserQuery>\n{post_reminder}"

def safe_chat(user_query, model):
    defended_input = build_self_reminder_prompt(user_query)
    response = model.generate(defended_input)
    return response
```

论文的数据集构造是理解结果的关键。作者从公开 jailbreak prompt 来源中收集候选，去除需要人工交互或攻击成功率过低的样本，最终保留 54 个有效 jailbreak prompt；再设计 10 个 malicious instructions，覆盖 misinformation 与 toxic 两组任务。两者笛卡尔积形成 540 个评测样本。这样设计能区分“越狱模板是否强”和“具体恶意目标是否容易触发拒答”：有些恶意目标包含明显危险词，更容易被模型识别；有些 jailbreak prompt 会显式要求不要提醒安全规范，因此更难防。

评价指标是 Attack Success Rate (ASR)，可写为：

$$
\mathrm{ASR}=\frac{1}{N}\sum_{i=1}^{N}\mathbf{1}\left[\mathrm{Judge}(M(x_i))=\mathrm{unsafe\ success}\right]
$$

为了减少人工标注成本，补充材料描述了半自动判定流程：一类方法利用 watermark 式检测，另一类方法用 ChatGPT 作为分类器判断回复是否包含对应有害内容；两者一致时直接采用，不一致时人工复核。这个流程不是 Self-Reminder 本身的一部分，但它让 540 样本、5 次重复的 ASR 评估更可操作。

![不同场景下 ASR 分布](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-023-00765-8/MediaObjects/42256_2023_765_Fig3_HTML.png)
*图：论文 Figure 3，展示 Self-Reminder 在常规 jailbreak、adaptive attack、消融和不同模型版本等场景下的 ASR 变化。*

Self-Reminder 与 Perplexity Filter 这类输入检测不同。Perplexity Filter 尝试识别“这个输入像不像攻击”，而 Self-Reminder 假设攻击可能已经进入上下文，于是改变模型处理上下文的方式。它也不同于 RLHF 或安全微调，因为没有更新参数；部署成本接近一次 prompt 包装。这使它很适合作为产品侧快速防御，但也带来局限：如果底层模型对 system prompt 层级不敏感，或者攻击者能构造强 adaptive prompt 去反制提醒，防御效果会下降。

论文还关注副作用。一个糟糕的系统提醒可能让模型过度拒答，或者在普通任务上不断输出安全废话。作者因此在 GLUE、摘要、翻译、问答等常规任务上比较 ChatGPT 与 ChatGPT + Self-Reminder，观察到整体能力没有明显崩塌，但输出风格可能更偏解释性和谨慎。实际应用中，这意味着 reminder 文案需要面向业务调参：安全敏感场景可以更强硬，创作或开发者工具则需要降低过度拒答。

> 💡 关键：Self-Reminder 的有效性来自“外层模式设定”而非“识别所有坏 prompt”。它不需要知道用户用了哪一种 DAN、JailBreak、AIM 或其他角色扮演模板，只要系统层提醒能在生成时保持更高优先级，就可能把模型拉回安全轨道。

从工程角度看，Self-Reminder 最适合与其他防线组合。输入侧可以先做异常检测和意图分类；模型调用时用 system-mode reminder 固定责任模式；输出侧再做安全分类和必要的拒答重写。若只依赖 Self-Reminder，攻击者可以尝试更长上下文、间接指令、多轮诱导或工具调用绕行。若把它放在多层防御中，它的优势是实现简单、延迟低、无需训练数据，并且能覆盖一部分自然语言角色扮演越狱。

#### 🧪 练习题
```yaml
question: "Self-Reminder 区别于普通关键词过滤的核心在哪里？"
options:
  - "它通过重新训练模型删除有害知识"
  - "它在系统层包装用户查询，提醒模型保持负责任模式"
  - "它只允许英文 prompt 进入模型"
  - "它用 perplexity 阈值拦截异常 token 序列"
answer: 1
explain: "Self-Reminder 不依赖关键词或困惑度检测，而是在更外层的系统上下文中加入责任提醒，让模型处理用户输入时维持安全模式。"
```

### Llama Guard

```yaml
id: llama_guard
num: 7
name: Llama Guard
full_name: Llama Guard
year: '2023'
org: Meta
parent: —
paper_url: https://arxiv.org/abs/2312.06674
project_url: ''
category: jailbreak
motivation: LLM安全分类器监控
```

#### 📝 一句话总结
Llama Guard 基于 Llama2-7b 微调，将安全分类任务建模为指令跟随问题，通过在 prompt 中嵌入安全策略（taxonomy）实现对人机对话中 prompt 和 response 的安全分类，支持 zero-shot 适配新策略，是首个兼具高性能与灵活策略定制能力的开源 LLM 安全护栏模型。

#### 🎯 核心要点
- 提出 **安全风险分类体系**（Safety Risk Taxonomy）：涵盖暴力与仇恨、性内容、犯罪策划、枪支与非法武器、管制物质、自残共 6 大类 13 个子类
- 将安全分类建模为 **指令跟随任务**：通过 task instruction 在 prompt 中嵌入完整的安全策略定义，模型输出 "safe"/"unsafe" 及违规类别
- 支持 **prompt 分类和 response 分类** 两种任务，无需传统多任务学习的额外开销
- **零样本策略适配**：仅通过修改 prompt 中的 taxonomy 描述即可适配新的安全策略（如 OpenAI Moderation taxonomy），无需重新训练
- **少样本学习增强**：在 prompt 中加入 2-4 个示例即可在 OpenAI Moderation 数据集上超越 OpenAI 自己的 Moderation API
- **高效微调迁移**：仅需目标数据集 20% 的训练数据即可达到从头训练使用 100% 数据的 Llama2-7b 的性能
- 在自有测试集上 AUPRC 达 0.945（prompt）/ 0.953（response），在 ToxicChat 上零样本 AUPRC 0.626 超越所有基线

#### 🔬 深入细节
##### 核心框架

![Llama Guard 任务指令示意图](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/task3.png)
*图 1：Llama Guard 的 prompt 分类和 response 分类任务指令格式。左侧为 prompt 分类，右侧为 response 分类。安全策略（taxonomy）以自然语言形式嵌入 prompt 中。*

Llama Guard 的核心设计思想是将传统的安全内容分类问题转化为一个 **指令跟随（instruction-following）** 任务。模型接收一个包含以下组件的结构化 prompt：

1. **Task instruction**：指定当前任务类型（prompt 分类或 response 分类）
2. **Safety taxonomy**：以自然语言描述的安全策略定义，包含各违规类别及其描述
3. **Conversation**：待分类的对话内容（用户 prompt，或 prompt + 模型 response）

模型输出格式为：第一行 "safe" 或 "unsafe"，若为 unsafe 则第二行输出违规的类别编号（如 "O3" 表示 Criminal Planning）。

##### 算法伪代码

```python
# Llama Guard 推理流程
def llama_guard_classify(conversation, taxonomy, task_type="prompt"):
    """
    conversation: 用户prompt（及可选的模型response）
    taxonomy: 安全策略定义（类别名称+描述）
    task_type: "prompt" 或 "response"
    """
    # 1. 构建指令 prompt
    instruction = build_task_instruction(task_type)  # 指定分类目标
    taxonomy_text = format_taxonomy(taxonomy)          # 格式化安全策略
    conv_text = format_conversation(conversation)      # 格式化对话

    # 2. 拼接完整输入
    full_prompt = f"[INST] {instruction}\n{taxonomy_text}\n{conv_text} [/INST]"

    # 3. 模型生成
    output = llama2_7b_finetuned.generate(full_prompt)
    # output 示例: "unsafe\nO3" 或 "safe"

    # 4. 解析结果
    lines = output.strip().split('\n')
    is_safe = (lines[0] == "safe")
    violated_categories = lines[1] if not is_safe and len(lines) > 1 else None

    # 5. 获取概率分数（用于 AUPRC 计算）
    # 取第一个 token 为 "safe" 的 softmax 概率作为安全概率
    p_safe = softmax(logits_first_token)["safe"]

    return is_safe, violated_categories, p_safe
```

##### 动机与背景

现有的内容安全审核工具（如 OpenAI Moderation API、Perspective API、Azure AI Content Safety）存在两个核心问题：

1. **策略固化**：这些工具的安全分类体系是预定义且不可修改的。不同的应用场景（如医疗咨询 vs. 创意写作）对"安全"的定义差异巨大，固定的分类体系无法满足多样化需求。
2. **覆盖不全**：大多数现有工具仅针对用户输入（prompt）进行审核，而忽略了对 LLM 生成内容（response）的安全检查。LLM 可能在看似安全的 prompt 下生成有害内容。

> 💡 关键：Llama Guard 的核心创新在于将安全策略从模型参数中解耦出来，放入 prompt 中以自然语言描述，使得同一个模型可以通过修改 prompt 适配完全不同的安全策略。

##### 安全风险分类体系

Llama Guard 提出了一套参考性的安全风险分类体系，涵盖 6 大类：

| 类别 | 描述 | 适用对象 |
|------|------|----------|
| O1: Violence & Hate | 暴力行为、仇恨言论、歧视 | Prompt & Response |
| O2: Sexual Content | 色情内容、性行为描述 | Prompt & Response |
| O3: Criminal Planning | 犯罪活动策划（绑架、抢劫等） | Prompt & Response |
| O4: Guns & Illegal Weapons | 非法武器获取与使用 | Prompt & Response |
| O5: Regulated Substances | 管制药物、毒品相关 | Prompt & Response |
| O6: Self-Harm | 自杀、自残相关内容 | Prompt & Response |

> ⚠️ 注意：该分类体系是**参考性**的，而非强制性的。Llama Guard 的设计允许用户通过修改 prompt 中的 taxonomy 来定义自己的安全策略，这正是其核心优势。

##### 训练方法

Llama Guard 基于 Llama2-7b 进行监督微调（SFT），训练数据的构建流程如下：

1. **数据收集**：使用多种 LLM 生成 prompt，涵盖安全和不安全的样本。对于不安全样本，使用对抗性提示技术（adversarial prompting）生成更具挑战性的案例。
2. **Response 生成**：使用 Llama2 生成对应的 response，并通过多种策略确保 response 覆盖安全和不安全两种情况。
3. **人工标注**：由训练有素的标注员对每个 prompt-response 对进行多标签分类标注。
4. **数据格式化**：将标注数据转化为指令跟随格式，包含完整的 task instruction、taxonomy 和对话内容。

训练使用标准的 next-token prediction 损失函数，但 **仅在模型输出部分（"safe"/"unsafe" + 类别标签）计算损失**，输入 prompt 部分不参与损失计算。

##### 概率分数与分类阈值

作为生成式模型，Llama Guard 通过以下方式提供概率分数以支持灵活的分类阈值调整：

$$P(\text{safe}) = \text{softmax}(\text{logits}_{\text{first\_token}})[\text{"safe"}]$$

其中 \(\text{logits}_{\text{first\_token}}\) 是模型生成第一个 token 时的 logits。通过调整阈值 \(\tau\)，可以在精确率和召回率之间进行权衡：

$$\hat{y} = \begin{cases} \text{safe} & \text{if } P(\text{safe}) \geq \tau \\ \text{unsafe} & \text{otherwise} \end{cases}$$

这使得 Llama Guard 可以像传统分类器一样计算 AUPRC（Area Under Precision-Recall Curve）等指标。

##### 策略适配能力

Llama Guard 展现了三个层次的策略适配能力：

**1. 零样本适配（Zero-shot）**：仅修改 prompt 中的 taxonomy 描述即可适配新策略。在 OpenAI Moderation 数据集上，零样本 AUPRC 达 0.847，接近 OpenAI 自己的 API（0.856）。

**2. 少样本适配（Few-shot）**：在 prompt 中额外提供 2-4 个标注示例。在 OpenAI Moderation 数据集上 AUPRC 提升至 0.872，**超越 OpenAI Moderation API**。

**3. 微调适配（Fine-tuning）**：在目标数据集上进一步微调。实验表明，Llama Guard 仅需 ToxicChat 数据集 20% 的训练数据即可达到从头训练的 Llama2-7b 使用 100% 数据的性能。

![Llama Guard 在 OpenAI Mod 数据集上的类别级性能](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/figure/openai_categorical.png)
*图 2：Llama Guard 在 OpenAI Moderation 数据集上各类别的 AUPRC 表现。少样本（few-shot）prompting 显著缩小了与 OpenAI API 的差距。*

![Llama Guard 与 Llama2-7b 在 ToxicChat 上的微调对比](https://ar5iv.labs.arxiv.org/html/2312.06674/assets/x1.png)
*图 3：在 ToxicChat 数据集上，Llama Guard 通过微调展现出比 Llama2-7b 更强的数据效率和适配能力。*

##### 与现有方法的对比

| 特性 | Llama Guard | OpenAI Mod API | Perspective API | Azure AI |
|------|-------------|----------------|-----------------|----------|
| 策略可定制 | ✅ 通过 prompt | ❌ 固定 11 类 | ❌ 固定 6 类 | ❌ 固定 4 类 |
| Response 分类 | ✅ | ❌ 仅 prompt | ❌ 仅 prompt | ❌ 仅 prompt |
| 开源 | ✅ | ❌ | ❌ | ❌ |
| 概率分数 | ✅ | ✅ | ✅ | ❌（整数 0-6） |
| 零样本迁移 | ✅ | ❌ 需重训 | ❌ 需重训 | ❌ 需重训 |
| 自有测试集 AUPRC | **0.945** | 0.764 | 0.728 | — |
| ToxicChat AUPRC | **0.626** | 0.588 | 0.532 | — |

> 💡 关键：Llama Guard 在自有测试集上全面领先，在 ToxicChat（所有模型均未训练过的数据集）上也展现最强的零样本泛化能力。在 OpenAI Moderation 数据集上，虽然零样本略低于 OpenAI API（0.847 vs 0.856），但通过少样本 prompting 即可反超（0.872）。

#### 🧪 练习题
```yaml
question: "Llama Guard 实现策略灵活适配的核心机制是什么？"
options:
  - "使用多任务学习同时训练多种安全策略"
  - "将安全分类体系以自然语言形式嵌入输入 prompt 中，通过指令跟随范式实现"
  - "为每种安全策略训练一个独立的分类头"
  - "使用强化学习从人类反馈中动态调整安全策略"
answer: 1
explain: "Llama Guard 将安全策略（taxonomy）以自然语言描述的形式放入 prompt 中，将分类任务转化为指令跟随任务，从而实现仅通过修改 prompt 即可适配不同安全策略，无需重新训练模型。"
```

### SelfCheckGPT

```yaml
id: selfcheckgpt
num: 8
name: SelfCheckGPT
full_name: 自检GPT (SelfCheckGPT)
year: '2023'
org: Cambridge
parent: —
paper_url: https://aclanthology.org/2023.emnlp-main.557/
project_url: ''
category: hallucination
motivation: 多次采样一致性检测
```

#### 📝 一句话总结
SelfCheckGPT 提出了一种零资源黑盒幻觉检测框架：对同一提示多次采样生成响应，利用"事实性内容在不同采样间保持一致、而幻觉内容则相互矛盾"的核心假设，通过 BERTScore、问答、n-gram、NLI 和 LLM Prompt 五种一致性度量方法在句子级别检测幻觉，无需访问模型内部概率或外部知识库。

#### 🎯 核心要点
- **核心假设**：LLM 对已知事实的多次采样结果趋于一致，对幻觉内容则产生相互矛盾的信息
- **零资源 + 黑盒**：不依赖外部知识库，不需要访问模型内部 token 概率，仅需模型的文本输出
- **五种黑盒检测变体**：SelfCheck-BERTScore、SelfCheck-QA/MQAG、SelfCheck-n-gram、SelfCheck-NLI、SelfCheck-Prompt
- **灰盒基线对比**：同时提出基于 token 概率（Avg/Max \(-\log p\)）和熵（Avg/Max \(H\)）的灰盒方法作为对照
- **评估数据集**：WikiBio GPT-3 数据集——238 篇 GPT-3 生成的人物传记，1908 个句子经人工标注为 Major Inaccurate / Minor Inaccurate / Accurate 三类
- **关键结果**：SelfCheck-Prompt（AUC-PR 93.42）和 SelfCheck-NLI（AUC-PR 92.50）在句子级幻觉检测中显著超越灰盒概率基线（83.21），证明黑盒方法可行且有效
- **段落级检测**：SelfCheck-Prompt 在段落级别 Pearson 相关系数达 78.32，优于所有其他方法

#### 🔬 深入细节
##### 框架示意图

![SelfCheckGPT 框架示意图](https://arxiv.org/html/2303.08896v4/extracted/5307/images/selfcheckgpt_prompt.png)
*图：SelfCheckGPT-Prompt 工作流程——对同一概念多次采样生成响应，逐句与采样结果进行一致性比对，矛盾越多则幻觉可能性越高*

##### 算法伪代码

```python
# SelfCheckGPT 通用流程伪代码
def selfcheck_gpt(prompt, llm, method, N=20):
    """
    prompt: 输入提示 (e.g., "This is a Wikipedia passage about {concept}:")
    llm: 目标大语言模型
    method: 一致性检测方法 (BERTScore/QA/n-gram/NLI/Prompt)
    N: 采样次数
    """
    # Step 1: 生成主响应 (temperature=0, beam search)
    R = llm.generate(prompt, temperature=0.0)
    sentences = split_sentences(R)  # r_1, r_2, ..., r_M
    
    # Step 2: 随机采样 N 个响应 (temperature=1.0)
    samples = [llm.generate(prompt, temperature=1.0) for _ in range(N)]
    
    # Step 3: 逐句计算一致性得分
    scores = []
    for r_i in sentences:
        s_i = 0.0
        for S_n in samples:
            s_i += method.compute_inconsistency(r_i, S_n)
        scores.append(s_i / N)  # 平均不一致性得分
    
    return scores  # 得分越高 → 幻觉可能性越大
```

##### 动机与背景

大语言模型（LLM）在生成流畅文本的同时，经常产生"幻觉"（hallucination）——生成看似合理但实际不正确的内容。传统的事实核查方法依赖外部知识库（如 Wikipedia、知识图谱），但这些方法面临两大问题：

1. **知识覆盖不完整**：外部知识库无法覆盖所有领域和最新信息
2. **黑盒 API 限制**：许多商业 LLM（如 GPT-4）不提供 token 级别的概率信息，灰盒方法无法适用

SelfCheckGPT 的核心洞察在于：**LLM 本身就是最好的事实核查器**。如果模型真正"知道"某个事实，那么多次采样时会反复生成一致的内容；如果模型在"编造"，则每次采样会产生不同的虚假信息。

> 💡 **关键直觉**：采样一致性 ≈ 事实可靠性。一致的输出暗示模型对该知识有较高置信度，矛盾的输出则暴露了模型的不确定性。

##### 灰盒基线方法

作为对照，论文首先提出了需要访问 token 概率的灰盒方法。对于主响应中的第 \(i\) 个句子 \(r_i\)，包含 token 序列 \(\{t_1, t_2, \ldots, t_L\}\)：

**概率度量**（需要目标 token 的生成概率 \(p(t)\)）：

$$S_{\text{Avg}(-\log p)}(i) = \frac{1}{L_i} \sum_{l=1}^{L_i} -\log p(t_l)$$

$$S_{\text{Max}(-\log p)}(i) = \max_{l} \left( -\log p(t_l) \right)$$

**熵度量**（需要 top-\(K\) token 的概率分布）：

$$S_{\text{Avg}(H)}(i) = \frac{1}{L_i} \sum_{l=1}^{L_i} H(t_l), \quad H(t_l) = -\sum_{k=1}^{K} p(t_l^{(k)}) \log p(t_l^{(k)})$$

> ⚠️ **局限**：灰盒方法要求访问模型内部概率，对 GPT-4 等黑盒 API 不适用。这正是 SelfCheckGPT 黑盒方法的动机所在。

##### 五种黑盒检测方法详解

**1. SelfCheck-BERTScore**

利用 BERTScore 衡量主响应句子 \(r_i\) 与每个采样响应 \(S_n\) 中各句子的语义相似度。取最大相似度作为该采样的支持度，再对 \(N\) 个采样取平均：

$$S_{\text{BERTScore}}(i) = 1 - \frac{1}{N} \sum_{n=1}^{N} \max_{j} \text{BERTScore}(r_i, s_j^{(n)})$$

得分越高表示句子在采样中缺乏语义支持，幻觉可能性越大。

**2. SelfCheck-QA (MQAG)**

通过问答生成与回答来间接评估一致性。首先基于主响应句子 \(r_i\) 生成多个问题 \(q\)，然后分别在主响应和采样响应上回答这些问题，比较答案一致性：

$$P(a_i | q, C) = \frac{\exp(g(a_i, q, C))}{\sum_{a' \in A} \exp(g(a', q, C))}$$

其中 \(g(\cdot)\) 是 MQAG 模型的评分函数，\(C\) 为上下文。通过 KL 散度或计数匹配来量化答案分布差异。

**3. SelfCheck-n-gram**

最轻量的方法，计算主响应句子中 n-gram 在采样响应中出现的频率：

$$S_{\text{n-gram}}(i) = 1 - \frac{1}{N} \sum_{n=1}^{N} \frac{|\{g : g \in r_i \cap S_n\}|}{|r_i|}$$

其中 \(|r_i|\) 是句子 \(r_i\) 中的 n-gram 总数。论文使用 unigram 到 trigram 的加权组合，并引入 \(\min(\cdot, 1)\) 截断和负对数变换提升区分度：

$$S'_{\text{n-gram}}(i) = -\frac{1}{N} \sum_{n=1}^{N} \log \min\left(\frac{c_n(r_i, S_n)}{|r_i|}, 1\right)$$

> 💡 **优势**：n-gram 方法不依赖任何外部模型，计算开销极低，适合大规模部署。

**4. SelfCheck-NLI**

使用自然语言推理（NLI）模型判断采样响应是否与主响应句子矛盾。采用 DeBERTa-v3-large（在 MNLI 上微调）作为 NLI 模型：

$$P(\text{contradict} | r_i, S_n) = \frac{\exp(z_c)}{\exp(z_e) + \exp(z_c)}$$

其中 \(z_e\) 和 \(z_c\) 分别是"蕴含"和"矛盾"类别的 logits。注意此处**忽略了中性类别**，仅在蕴含和矛盾之间归一化，确保概率在 [0, 1] 之间。最终得分：

$$S_{\text{NLI}}(i) = \frac{1}{N} \sum_{n=1}^{N} P(\text{contradict} | r_i, S_n)$$

**5. SelfCheck-Prompt**

直接利用 LLM 自身作为一致性判断器，通过如下 prompt 询问：

```
Context: {sampled_passage}
Sentence: {sentence_to_check}
Is the sentence supported by the context above?
Answer Yes or No:
```

输出映射为数值：\(\{Yes: 0.0, No: 1.0, N/A: 0.5\}\)，最终得分：

$$S_{\text{Prompt}}(i) = \frac{1}{N} \sum_{n=1}^{N} x_i^n$$

> ⚠️ **注意**：论文发现只有较强的 LLM（如 GPT-3 text-davinci-003、ChatGPT）才能有效执行此一致性评估，较弱的模型（如 text-curie-001、LLaMA）效果不佳。

##### 实验结果与关键发现

**数据集构建**：从 WikiBio 数据集中选取 238 个人物概念，使用 GPT-3（text-davinci-003）生成传记文章，共 1908 个句子。人工标注结果：39.9% Major Inaccurate，33.1% Minor Inaccurate，27.0% Accurate。标注者间一致性 Cohen's κ = 0.748（2-class）。

**句子级检测性能**（AUC-PR，NonFactual 类别）：

| 方法 | AUC-PR (NonFact) | AUC-PR (Factual) | 类型 |
|------|:-:|:-:|:-:|
| Random baseline | 72.96 | 27.04 | — |
| Avg(-log p) | 83.21 | 53.97 | 灰盒 |
| SelfCheck-BERTScore | 81.09 | 46.56 | 黑盒 |
| SelfCheck-QA (MQAG) | 82.90 | 47.30 | 黑盒 |
| SelfCheck-n-gram | 85.28 | 56.94 | 黑盒 |
| SelfCheck-NLI | **92.50** | **72.32** | 黑盒 |
| SelfCheck-Prompt (GPT-3) | **93.42** | **74.56** | 黑盒 |

**关键发现**：

1. **黑盒超越灰盒**：SelfCheck-Prompt 和 SelfCheck-NLI 显著超越所有灰盒概率基线，证明采样一致性比 token 概率更能反映事实性
2. **LLM 概率确实与事实性相关**：灰盒方法（AUC-PR 83.21）远超随机基线（72.96），验证了"模型对幻觉内容的 token 不确定性更高"的假设
3. **代理 LLM 效果较差**：使用 LLaMA 作为代理模型替代 GPT-3 计算概率时，性能接近随机基线，表明不同 LLM 的生成模式差异显著
4. **采样数量影响**：N=5 时性能已有明显提升，N=20 时趋于饱和
5. **段落级检测**：SelfCheck-Prompt 的 Pearson 相关系数达 78.32，可有效识别"完全幻觉"段落

##### 与传统方法的区别

| 维度 | 传统事实核查 | SelfCheckGPT |
|------|:-:|:-:|
| 外部知识 | 需要知识库/搜索引擎 | **不需要** |
| 模型访问 | 需要内部概率（灰盒） | **仅需文本输出（黑盒）** |
| 适用范围 | 受限于知识库覆盖 | **任意领域** |
| 核心信号 | token 不确定性 | **采样间一致性** |
| 计算开销 | 单次推理 | 需 N 次额外采样 |

#### 🧪 练习题
```yaml
question: "SelfCheckGPT 的核心假设是什么？"
options:
  - "LLM 生成的所有内容都是幻觉"
  - "如果 LLM 真正掌握某个事实，多次采样会产生一致的内容；幻觉内容则在不同采样间相互矛盾"
  - "token 概率越高的句子越可能是幻觉"
  - "外部知识库可以完全覆盖 LLM 的所有输出"
answer: 1
explain: "SelfCheckGPT 的核心假设是采样一致性反映事实可靠性——已知事实在多次采样中保持一致，而幻觉内容因缺乏真实知识支撑而在不同采样间产生矛盾。"
```

### FActScore

```yaml
id: factscore
num: 9
name: FActScore
full_name: 细粒度原子事实评估 (Fine-grained Atomic Evaluation of Factual Precision)
year: '2023'
org: UW+Meta
parent: —
paper_url: https://arxiv.org/abs/2305.14251
project_url: ''
category: hallucination
motivation: 原子事实精度评估
```

#### 📝 一句话总结
FActScore 提出把长文本回答拆成“原子事实”并逐条验证的事实精度指标，解决了长答案里真假信息混杂时二元评分过粗、人工评估成本过高的问题。它进一步用检索增强的强语言模型自动估计原子事实是否被可信知识源支持，使长文本幻觉评估可以规模化。

#### 🎯 核心要点
- 评价单位从整句/整段改为 atomic fact：每个原子事实只承载一个可验证信息点。
- 评分目标是 factual precision：统计被指定知识源支持的原子事实比例，而不是衡量回答覆盖了多少事实。
- 知识源显式化：论文在人物传记任务中以英文 Wikipedia 作为可信证据源，避免把“事实性”定义成无上下文的全局真理。
- 人工评估流程包含实体采样、模型生成、原子事实拆解、Supported/Not-supported/Irrelevant 标注。
- 自动估计器使用“检索 → LLM 判别”的框架，将相关 Wikipedia 段落与 atomic fact 拼接后判断 True/False。
- 论文比较 No-context LM、Retrieve→LM、Nonparametric Probability、Retrieve→LM+NP 等估计变体，验证检索对事实判定非常关键。
- 实验显示 InstructGPT、ChatGPT、PerplexityAI 的人工 FActScore 分别约为 42.5%、58.3%、71.5%，说明即便有搜索增强，长传记仍会出现大量局部事实错误。

#### 🔬 深入细节
![FActScore 原子事实评估流程](https://ar5iv.labs.arxiv.org/html/2305.14251/assets/x1.png)
*图：FActScore 将一段人物传记拆成多个 atomic facts，并逐条判断是否被知识源支持；同样被传统二元指标判为 0 的回答，在 FActScore 下可以得到不同的细粒度分数。*

FActScore 的核心动机是：长文本生成不是一个“全对/全错”的对象。一个 biography 回答中可能同时包含正确出生地、错误职业、正确作品名和虚构奖项；如果按整句或整段打分，局部错误会被淹没，或者一个句子只要包含一个错误就被整体归零。论文因此把最小评价单元降到 atomic fact，例如“某人出生于 X”“某人获得过 Y 奖”“某人毕业于 Z 大学”，每条只判断 supported 或 not-supported。

形式化地，给定待评估语言模型 \(M\)、提示集合 \(X\)、知识源 \(S\)，模型对提示 \(x\) 生成回答 \(y=M(x)\)，再将回答拆成原子事实集合 \(A(y)\)。若 \(v(a,S)=1\) 表示原子事实 \(a\) 被知识源 \(S\) 支持，则一个常用写法是：

$$
\mathrm{FActScore}(M;X,S)=\frac{1}{|X|}\sum_{x\in X}\mathbf{1}[M\ \text{responds to}\ x]\cdot\frac{1}{|A(M(x))|}\sum_{a\in A(M(x))}\mathbf{1}[v(a,S)=1].
$$

这个公式有两个重要含义：第一，它衡量的是 precision，不奖励模型“少说但全对”之外的 recall，因此不能单独代表回答完整性；第二，它把“是否真实”改写为“是否被用户信任的知识源支持”，所以同一个 atomic fact 在不同知识源下可能有不同判定。论文选择人物传记和 Wikipedia，是因为人物事实通常客观、可验证，且 Wikipedia 覆盖相对充足。

```python
# FActScore 核心流程伪代码

def compute_factscore(model, prompts, knowledge_source):
    scores = []
    for x in prompts:
        y = model.generate(f"Tell me a bio of {x}")
        if abstains_or_empty(y):
            scores.append(0.0)
            continue

        atomic_facts = decompose_into_atomic_facts(y)
        labels = []
        for fact in atomic_facts:
            evidence = retrieve(knowledge_source, query=fact, top_k=K)
            label = judge_supported(fact, evidence)  # Supported / Not-supported / Irrelevant
            if label != "Irrelevant":
                labels.append(1 if label == "Supported" else 0)

        scores.append(sum(labels) / max(len(labels), 1))
    return sum(scores) / len(scores)
```

人工评估管线分三层：先从 Wikidata/Wikipedia 采样人物实体；再让 InstructGPT、ChatGPT、PerplexityAI 等模型回答 “Tell me a bio of <entity>”；最后让标注者拆 atomic facts，并在 Wikipedia 证据下标注 Supported、Not-supported 或 Irrelevant。Irrelevant 不是事实真假标签，而是说明该片段与题目人物无关或依赖前文错误事实，通常会从有效事实集合中剔除。这个设计让评估既能发现“捏造事实”，也能发现“答非所问的复制/检索污染”。

自动估计器是论文面向规模化评估的关键。最朴素的 No-context LM 只把 `<atomic fact> True or False?` 输入评估模型，这容易让模型凭内部记忆猜测。Retrieve→LM 则先从知识源中取相关段落，再把证据、atomic fact 和 True/False 问题一起交给评估 LM；这更接近人工查证流程，也显著降低错误率。Nonparametric Probability 变体用非参数 masked LM 对 atomic fact 的 token 似然做判断，Retrieve→LM+NP 则尝试融合检索判别和非参数证据。论文结果表明，检索增强比单靠 LLM 内部知识可靠得多。

> 💡 关键：FActScore 不是“让另一个大模型给答案打分”，而是先把答案结构化成可验证断言，再把每个断言绑定到显式证据源。这个拆解步骤是它区别于传统 factuality scorer 的主要贡献。

和早期事实一致性指标相比，FActScore 的差异在于评价对象从摘要/QA 的短输出扩展到 100 词以上的长文本，并且不把句子当成不可分割单位。一个句子可能包含 4 个以上事实点，其中部分正确、部分错误；FActScore 可以把它拆开后分别计分。与 SelfCheck 类方法相比，它不只依赖模型自洽性，而是要求外部知识源支持，因此更适合衡量“事实精度”而非“模型是否对自己的生成感到不确定”。

局限也来自同一设计：atomic fact 默认等权，但现实中“出生年份错误”和“获奖年份错误”的影响可能不同；它衡量 precision 而非 recall，模型可以通过少说话提升分数；知识源覆盖不足时，真实但未被记录的事实会被误判。论文因此把人物传记作为主要场景，而不是直接宣称它能无条件覆盖所有开放域生成。

#### 🧪 练习题
```yaml
question: "FActScore 相比整段二元事实性评分的核心优势是什么？"
options:
  - "直接提升被评估模型的事实准确率"
  - "把长回答拆成原子事实，分别验证每个信息点是否被知识源支持"
  - "用模型内部置信度替代外部证据检索"
  - "同时衡量 factual precision 和 factual recall"
answer: 1
explain: "FActScore 的关键是 atomic fact decomposition 和证据支持判定；它主要衡量 precision，不直接衡量 recall。"
```

### RAG

```yaml
id: rag
num: 10
name: RAG
full_name: 检索增强生成 (Retrieval-Augmented Generation)
year: '2020'
org: Meta
parent: —
paper_url: https://proceedings.neurips.cc/paper/2020/hash/6ad1d765d319713629bc3840d8d4881a-Abstract.html
project_url: ''
category: hallucination
motivation: 检索增强知识锚定生成
```

#### 📝 一句话总结
RAG 提出将预训练参数化记忆（BART seq2seq 生成器）与非参数化记忆（基于 DPR 的 Wikipedia 稠密向量索引）相结合的通用微调范式，通过在生成过程中检索外部知识文档作为上下文，解决了纯参数化语言模型在知识密集型任务上事实准确性不足、知识难以更新和缺乏可解释性的问题。

#### 🎯 核心要点
- 提出 RAG 框架：将检索器（非参数化记忆）与生成器（参数化记忆）以概率模型方式端到端结合
- 两种边际化变体：**RAG-Sequence**（整个输出序列使用同一检索文档）和 **RAG-Token**（每个输出 token 可使用不同检索文档）
- 检索器采用 **DPR**（Dense Passage Retriever）：基于双塔 BERT 编码器的稠密检索，通过内积计算查询-文档相关性
- 生成器采用 **BART-large**（400M 参数）：将输入查询与检索文档拼接后送入编码器-解码器生成答案
- 非参数化知识源：Wikipedia 全量转储（2018.12），切分为 2100 万个 100 词文档块，使用 FAISS 构建 MIPS 索引
- 训练策略：联合训练查询编码器 \(BERT_q\) 和 BART 生成器，**文档编码器和索引保持冻结**，无需显式检索监督
- 在 4 个开放域 QA 基准（NQ、TriviaQA、WebQuestions、CuratedTrec）上达到 SOTA，超越纯参数化和纯抽取式方法
- 在生成任务（Jeopardy 问题生成、MSMARCO 摘要式 QA）上生成更具体、多样和事实性更强的文本

#### 🔬 深入细节
![RAG 模型架构总览](https://ar5iv.labs.arxiv.org/html/2005.11401/assets/x1.png)
*图：RAG 模型架构。左侧为检索器（DPR），将输入查询编码后在 Wikipedia 文档索引中检索 top-K 相关文档；右侧为生成器（BART），将查询与检索文档拼接后自回归生成输出序列。两种变体 RAG-Sequence 和 RAG-Token 在边际化方式上有所不同。*

```python
# RAG 推理伪代码
def rag_inference(query_x, retriever, generator, k=5, mode="sequence"):
    """
    query_x: 输入查询
    retriever: DPR 检索器 (BERT_q + FAISS index)
    generator: BART-large 生成器
    k: 检索文档数量
    mode: "sequence" (RAG-Sequence) 或 "token" (RAG-Token)
    """
    # Step 1: 检索 top-K 文档
    q = BERT_q(query_x)                          # 编码查询
    top_k_docs = FAISS_index.search(q, k)         # MIPS 检索
    p_eta = softmax([dot(d_z, q) for d_z in top_k_docs])  # 检索概率

    if mode == "token":
        # RAG-Token: 每个 token 独立边际化
        # p'(y_i|x, y_{1:i-1}) = Σ_z p_η(z|x) * p_θ(y_i|x, z, y_{1:i-1})
        output = beam_search_with_marginalized_transition(
            generator, query_x, top_k_docs, p_eta
        )
    else:
        # RAG-Sequence: 每个文档独立 beam search，再合并
        hypotheses = {}
        for z, p_z in zip(top_k_docs, p_eta):
            input_seq = concatenate(query_x, z)
            beams = beam_search(generator, input_seq)
            for y, score in beams:
                hypotheses[y] = hypotheses.get(y, 0) + p_z * score
        output = argmax(hypotheses)

    return output
```

##### 动机与背景

大规模预训练语言模型（如 GPT-2、BERT）已被证明能在参数中存储大量事实知识，但这种纯参数化的知识存储方式存在三个根本性缺陷：

1. **知识更新困难**：模型参数中编码的世界知识无法便捷地修改或扩展，一旦训练完成，知识就被"冻结"在参数中。
2. **缺乏可解释性**：模型生成答案时无法提供决策依据的溯源（provenance），用户无法验证信息来源。
3. **幻觉问题**：模型可能生成看似合理但事实错误的内容（hallucination），在知识密集型任务上表现尤为突出。

在 RAG 之前，REALM 和 ORQA 等工作已探索将检索机制与掩码语言模型结合，但仅限于抽取式下游任务（即从检索文档中直接提取答案片段）。RAG 的核心创新在于将这一思路推广到**生成式任务**，使模型能够综合检索到的多个文档信息，自由生成答案文本。

> 💡 关键：RAG 将检索到的文档视为**潜变量（latent variable）**，通过边际化（marginalization）将检索与生成统一在一个端到端可训练的概率框架中，无需显式标注"应该检索哪个文档"。

##### 核心机制：两种边际化策略

RAG 的核心数学框架是将生成概率 \(p(y|x)\) 分解为检索概率与条件生成概率的边际化：

**RAG-Sequence 模型**——对整个输出序列使用同一文档进行边际化：

$$p_{\text{RAG-Sequence}}(y|x) \approx \sum_{z \in \text{top-}k(p(\cdot|x))} p_{\eta}(z|x) \prod_{i}^{N} p_{\theta}(y_i|x, z, y_{1:i-1})$$

直觉理解：先检索 K 个文档，对每个文档独立生成完整答案，最后按检索概率加权求和。这适合答案完全来自单一文档的场景。

**RAG-Token 模型**——允许每个 token 从不同文档中获取信息：

$$p_{\text{RAG-Token}}(y|x) \approx \prod_{i}^{N} \sum_{z \in \text{top-}k(p(\cdot|x))} p_{\eta}(z|x) \, p_{\theta}(y_i|x, z, y_{1:i-1})$$

直觉理解：生成每个 token 时，都对所有检索文档的贡献进行加权混合。这使模型能够在一个答案中融合多个文档的信息，适合需要综合多源知识的场景。

> ⚠️ 注意：两个公式的关键区别在于**求和符号 \(\sum\) 与连乘符号 \(\prod\) 的嵌套顺序**。RAG-Sequence 是"先生成后求和"，RAG-Token 是"先求和后连乘"。

##### 检索器：DPR 双塔架构

检索组件基于 Dense Passage Retriever（DPR），采用双塔（bi-encoder）架构：

$$p_{\eta}(z|x) \propto \exp\left(\mathbf{d}(z)^{\top} \mathbf{q}(x)\right)$$

其中 \(\mathbf{q}(x) = \text{BERT}_q(x)\) 为查询编码器输出，\(\mathbf{d}(z) = \text{BERT}_d(z)\) 为文档编码器输出。两者均基于 BERT-base，分别将查询和文档映射到同一稠密向量空间，通过内积衡量相关性。

文档索引使用 **FAISS** 库构建最大内积搜索（MIPS）索引，采用 HNSW（Hierarchical Navigable Small World）近似算法实现毫秒级检索。整个 Wikipedia 被切分为 2100 万个 100 词的文档块，每个块预计算稠密向量表示。

##### 生成器：BART-large

生成组件采用 BART-large（400M 参数），一个基于 Transformer 的预训练 seq2seq 模型。输入构造方式非常简洁：**将原始查询 \(x\) 与检索文档 \(z\) 直接拼接**，作为 BART 编码器的输入，解码器自回归生成输出序列。

BART 通过去噪自编码目标预训练，在多种生成任务上表现优异。论文将 BART 的参数 \(\theta\) 称为**参数化记忆（parametric memory）**，与 Wikipedia 索引构成的**非参数化记忆（non-parametric memory）**形成互补。

##### 训练流程

训练采用标准的监督微调范式，给定输入-输出对 \((x_j, y_j)\)，最小化负边际对数似然：

$$\mathcal{L} = \sum_j -\log p(y_j | x_j)$$

关键设计决策：
- **文档编码器 \(\text{BERT}_d\) 和 FAISS 索引保持冻结**：避免了 REALM 中需要周期性重建索引的高昂计算开销
- **仅微调查询编码器 \(\text{BERT}_q\) 和 BART 生成器**：通过梯度反向传播联合优化检索与生成
- **无需检索监督**：不需要标注"正确文档"，检索文档作为潜变量被自动学习
- 训练时检索 top-K 文档（\(k \in \{5, 10\}\)），测试时 K 值通过验证集选择

##### 解码策略

两种变体需要不同的解码方式：

- **RAG-Token**：由于边际化后的转移概率 \(p'_{\theta}(y_i|x, y_{1:i-1})\) 具有标准自回归形式，可直接使用常规 beam search 解码。
- **RAG-Sequence**：生成概率无法分解为逐 token 的形式，论文提出两种策略：
  - **Thorough Decoding**：对每个检索文档独立运行 beam search，收集所有候选假设，对未出现在某文档 beam 中的假设额外运行前向传播计算概率，最终加权求和。精确但计算量大。
  - **Fast Decoding**：假设未在某文档 beam 中出现的假设概率为 0，避免额外前向传播。近似但高效。

##### 与传统方法的对比

| 维度 | 纯参数化模型（如 T5） | 抽取式检索（如 DPR+Reader） | RAG |
|------|----------------------|---------------------------|-----|
| 知识来源 | 仅参数记忆 | 仅检索文档 | 参数 + 检索 |
| 答案形式 | 自由生成 | 文档片段抽取 | 自由生成 |
| 知识更新 | 需重新训练 | 替换文档索引 | 替换文档索引 |
| 可解释性 | 无 | 可追溯文档 | 可追溯文档 |
| 多文档综合 | 隐式 | 困难 | RAG-Token 原生支持 |

RAG 的独特优势在于：既保留了生成模型的灵活性（可以生成训练数据中未出现的答案），又通过检索机制锚定了外部知识，显著减少幻觉并支持知识热更新。

#### 🧪 练习题
```yaml
question: "RAG-Sequence 和 RAG-Token 两种变体的核心区别是什么？"
options:
  - "使用不同的检索器架构"
  - "边际化潜变量（检索文档）的方式不同：RAG-Sequence 对整个序列使用同一文档，RAG-Token 允许每个 token 使用不同文档"
  - "RAG-Sequence 使用 BART，RAG-Token 使用 T5"
  - "RAG-Token 不需要检索，仅依赖参数化记忆"
answer: 1
explain: "两种变体使用相同的检索器和生成器，区别在于求和(Σ)与连乘(Π)的嵌套顺序：RAG-Sequence 先对每个文档生成完整序列再求和，RAG-Token 在每个 token 位置先对文档求和再连乘。"
```

### TruthfulQA

```yaml
id: truthfulqa
num: 11
name: TruthfulQA
full_name: 真实性问答基准 (TruthfulQA Benchmark)
year: '2022'
org: Oxford
parent: —
paper_url: https://aclanthology.org/2022.acl-long.226/
project_url: ''
category: hallucination
motivation: 虚假陈述倾向基准
```

#### 📝 一句话总结
TruthfulQA 提出一个专门诱发“模仿人类错误信念”的问答基准，用 817 个跨 38 类的问题衡量语言模型是否会生成看似自然但事实错误的回答。它揭示了单纯扩大模型规模不一定提升真实性，甚至可能让模型更熟练地复现训练语料中的流行谬误。

#### 🎯 核心要点
- 构造 817 个问题、覆盖 38 个类别，包括健康、法律、金融、政治、迷信、谚语、虚构作品等容易出现误解的领域。
- 问题设计目标不是普通知识问答，而是诱导模型复现人类常见 false belief 或 misconception。
- 同时支持 generation task 和 multiple-choice task：前者评估自由文本回答，后者用真/假参考答案的条件似然做可复现实验。
- 评价维度区分 truthfulness 和 informativeness，避免模型靠 “I have no comment” 这类空回答获得高真实性。
- 引入 GPT-judge/GPT-info 等自动评估器，分别近似人工真实性标注和信息量标注。
- 实验发现最佳模型在 generation 任务上约 58% truthful，而人类约 94%；早期 GPT-3 系列还出现“模型越大越不 truthful”的逆缩放趋势。
- 论文结论强调：要提升真实性，不能只依赖 imitation learning 和规模扩展，需要改变训练目标或引入真实性导向的监督。

#### 🔬 深入细节
> ⚠️ 注意：任务 JSON 中的 `paper_url` 指向 `2022.acl-long.226`，该 ACL 页面实际是 REINA 论文；TruthfulQA 的正确 ACL 条目是 `https://aclanthology.org/2022.acl-long.229/`，arXiv 条目是 `https://arxiv.org/abs/2109.07958`。本解读按 TruthfulQA 原论文内容撰写，YAML 中保留任务原始元信息。

![TruthfulQA 诱发式问题示例](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x1.png)
*图：TruthfulQA 中的示例问题及 GPT-3-175B 默认提示下的错误回答，这些问题刻意利用人类常见误解，使模型容易输出训练语料中流行但不真实的说法。*

TruthfulQA 的问题意识很明确：传统 QA 基准通常奖励模型复现数据集中常见答案，而互联网文本中存在大量重复的误解、传说、偏见和错误健康/法律建议。一个最大似然训练的语言模型如果学会“人类通常怎么回答”，并不等价于学会“真实世界是什么”。因此 TruthfulQA 不问普通百科题，而是问那些人类也容易答错的问题，例如带有错误预设、迷信、流行谣言或虚构事实混淆的问题。

基准构造时，每个问题都配有多个 true reference answers 和 false reference answers，并附有支持真实答案的来源。generation task 要求模型自由生成完整句子，再由人工判断 truthfulness 与 informativeness；multiple-choice task 则把真实/错误参考答案作为选项，用模型对各答案的条件概率来计算真实性分数。二者互补：自由生成更接近真实使用场景，但昂贵；多选更便宜、可复现，但不能完全反映开放式回答的风险。

```python
# TruthfulQA 评估流程伪代码

def evaluate_truthfulqa(model, questions):
    generation_scores = []
    mc_scores = []
    for q in questions:
        # 1) 开放生成：人工或 GPT-judge 判断真实性，GPT-info 判断信息量
        answer = model.generate(format_prompt(q.text))
        truth = human_or_gpt_judge(q.text, answer)      # scalar 或 binary truth score
        info = human_or_gpt_info(q.text, answer)        # informative / uninformative
        generation_scores.append({"truth": truth, "info": info, "truth_info": truth * info})

        # 2) 多选：比较真/假参考答案的条件似然
        true_mass = 0.0
        all_mass = 0.0
        for ref in q.true_refs + q.false_refs:
            likelihood = exp(model.logprob(ref, condition=q.text))
            all_mass += likelihood
            if ref in q.true_refs:
                true_mass += likelihood
        mc_scores.append(true_mass / all_mass)

    return aggregate(generation_scores), sum(mc_scores) / len(mc_scores)
```

多选评分可以写成如下形式。设问题 \(q\) 的真实参考答案集合为 \(T_q\)，错误参考答案集合为 \(F_q\)，模型给参考答案 \(a\) 的条件对数似然为 \(\ell_\theta(a\mid q)\)，则：

$$
\mathrm{MCTruth}(q)=\frac{\sum_{a\in T_q}\exp(\ell_\theta(a\mid q))}{\sum_{a\in T_q\cup F_q}\exp(\ell_\theta(a\mid q))}.
$$

开放生成的核心指标则可以抽象为：

$$
\mathrm{Truth}(M)=\frac{1}{N}\sum_{i=1}^{N}\tau_i,
\quad
\mathrm{Info}(M)=\frac{1}{N}\sum_{i=1}^{N}\iota_i,
\quad
\mathrm{Truth{*}Info}(M)=\frac{1}{N}\sum_{i=1}^{N}\tau_i\iota_i,
$$

其中 \(\tau_i\) 是回答的真实性分数，\(\iota_i\) 是是否有信息量。这个拆分非常重要：如果只看 truthfulness，模型可以通过拒答、空泛回答获得高分；如果只看 informativeness，模型又可能自信地输出错误内容。Truth*Info 才更接近“既真实又有用”的目标。

![TruthfulQA 生成与多选任务结果](https://ar5iv.labs.arxiv.org/html/2109.07958/assets/x4.png)
*图：论文同时报告自由生成和多选任务上的真实性、信息量表现；开放生成用人工评估，多选任务用参考答案似然进行自动评分。*

TruthfulQA 最有影响力的观察是“逆缩放”：在早期 GPT-3 系列上，更大的模型在许多 TruthfulQA 问题上反而更容易给出错误但流畅的回答。论文的解释是，大模型更擅长模仿训练分布，而训练分布中对某些问题的高频回答就是错误信念。它不是不知道语言形式，而是学到了“人们会这样说”。这与许多 NLP 任务中规模越大指标越好的趋势形成对比，也让 TruthfulQA 成为后来 inverse scaling、truthfulness 和 hallucination 研究中的重要基准。

自动评估方面，论文比较了 ROUGE、BLEURT、GPT-3-Sim 等相似度方法，也训练了端到端判断回答真假的 GPT-judge，以及判断是否 informative 的 GPT-info。相似度指标的问题在于，真实回答可以有多种表述，错误回答也可能和参考答案词面相近；GPT-judge 直接学习“问题+模型回答→真假标签”，更贴近人工标准，但也会对较长、带限定条件或混合真假陈述的回答产生偏差。因此论文没有把自动指标当成完美裁判，而是把它作为降低评估成本的近似工具。

> 💡 关键：TruthfulQA 不是知识覆盖率测试，而是“抗误导性模仿”测试。模型必须避免输出训练语料中常见、自然、但不真实的答案。

与普通事实问答相比，TruthfulQA 的创新不在模型结构，而在 benchmark design。它把“模型是否会说假话”具体化为可测任务：问题必须足够诱导常见谬误，真实答案必须有来源支持，错误答案必须代表人类可能相信的虚假说法。这个设计使它特别适合评估 LLM 安全中的 hallucination、misinformation 和 sycophantic imitation 风险。

#### 🧪 练习题
```yaml
question: "TruthfulQA 为什么要同时评估 truthfulness 和 informativeness？"
options:
  - "因为多选任务无法计算条件似然"
  - "因为只评估真实性会鼓励模型给出空泛拒答，只评估信息量又会放过自信错误"
  - "因为 GPT-judge 只能判断信息量"
  - "因为所有 TruthfulQA 问题都没有参考答案"
answer: 1
explain: "TruthfulQA 希望模型既真实又有用；单独优化 truthfulness 可能导致无信息回答，单独优化 informativeness 则无法惩罚虚假陈述。"
```

### RLHF

```yaml
id: rlhf
num: 12
name: RLHF
full_name: 人类反馈强化学习 (Reinforcement Learning from Human Feedback)
year: '2022'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/2203.02155
project_url: ''
category: alignment
motivation: 人类偏好强化学习对齐
```

#### 📝 一句话总结
InstructGPT 提出了 SFT → 奖励模型训练 → PPO 强化学习的三阶段 RLHF 流程，利用人类偏好反馈对齐语言模型输出与用户意图，使 1.3B 参数的对齐模型在人类评估中优于 175B 的原始 GPT-3。

#### 🎯 核心要点
- **三阶段训练流程**：Step 1 监督微调 (SFT) → Step 2 奖励模型训练 (RM) → Step 3 PPO 强化学习优化
- **涉及 4 个模型**：SFT Model、Reward Model (6B)、Policy Model (\(\pi_\phi^{\text{RL}}\))、Reference Model (\(\pi^{\text{SFT}}\))
- **奖励模型**：基于人类对 K=4\~9 个输出的排序，利用 \(\binom{K}{2}\) 对比较对进行 pairwise 训练，6B 参数效果最优
- **PPO-ptx 目标函数**：在 PPO 奖励最大化的基础上加入 KL 散度惩罚（防止策略偏离 SFT）和预训练梯度混合（防止 NLP 能力退化）
- **数据规模**：SFT 约 13k 提示、RM 约 33k 提示、PPO 约 31k 提示，由 40 名标注者提供，标注者间一致率 72.6%
- **核心发现**：1.3B InstructGPT 在人类偏好评估中胜过 175B GPT-3；RLHF 显著降低毒性和幻觉

#### 🔬 深入细节
![InstructGPT 三阶段训练流程图](https://ar5iv.labs.arxiv.org/html/2203.02155/assets/x2.png)
*图：RLHF 训练的三个阶段——(1) 监督微调 SFT，(2) 奖励模型训练 RM，(3) PPO 强化学习优化*

```python
# InstructGPT / RLHF 三阶段训练伪代码

# ========== Step 1: Supervised Fine-Tuning (SFT) ==========
sft_model = pretrained_gpt3.copy()
for epoch in range(16):  # 16 epochs, cosine LR, dropout=0.2
    for (prompt, demonstration) in sft_dataset:  # ~13k prompts
        loss = cross_entropy(sft_model(prompt), demonstration)
        sft_model.update(loss)

# ========== Step 2: Reward Model Training (RM) ==========
reward_model = sft_model.remove_unembedding_layer()  # 6B params
reward_model.add_scalar_head()  # 输出标量奖励值
for batch in rm_dataset:  # ~33k prompts
    prompt, ranked_outputs = batch  # K=4~9 个输出的人类排序
    loss = 0
    for (y_w, y_l) in all_pairs(ranked_outputs):  # C(K,2) 对
        loss -= log(sigmoid(reward_model(prompt, y_w) - reward_model(prompt, y_l)))
    loss /= num_pairs
    reward_model.update(loss)

# ========== Step 3: PPO Reinforcement Learning ==========
policy = sft_model.copy()          # π_RL, 可训练
reference = sft_model.copy()       # π_SFT, 冻结
value_fn = reward_model.copy()     # 初始化自 RM

for iteration in ppo_iterations:
    prompt = sample(ppo_prompts)           # ~31k prompts
    response = policy.generate(prompt)     # rollout
    reward = reward_model(prompt, response)
    kl_penalty = beta * log(policy(response|prompt) / reference(response|prompt))
    ppo_reward = reward - kl_penalty
    # PPO-ptx: 混合预训练梯度
    pretrain_loss = -gamma * log_likelihood(policy, pretrain_batch)
    policy.ppo_update(ppo_reward + pretrain_loss)
```

**动机与背景：大语言模型的对齐问题**

大规模语言模型（如 GPT-3）通过在海量互联网文本上进行下一词预测训练，获得了强大的语言生成能力。然而，"预测下一个词"这一训练目标与"遵循用户指令并生成有帮助、诚实、无害的回答"之间存在根本性的错位（misalignment）。GPT-3 经常生成不真实的内容（幻觉）、有毒文本，或者无法准确理解用户意图。传统的监督微调虽然能在一定程度上改善指令遵循能力，但受限于高质量标注数据的稀缺性——让人类为每个可能的提示编写理想回答的成本极高。InstructGPT 的核心洞察是：**让人类评判输出的好坏（比较/排序）远比让人类撰写完美回答更容易**，因此可以通过人类偏好反馈训练一个奖励模型，再用强化学习优化语言模型的输出策略。

**核心机制：三阶段 RLHF 流程**

**第一阶段——监督微调 (SFT)**：在约 13,000 条由标注者编写的高质量 (prompt, demonstration) 对上微调 GPT-3。训练采用 16 个 epoch、余弦学习率衰减和 0.2 的 dropout。虽然 SFT 模型在 1 个 epoch 后就已过拟合验证损失，但继续训练仍能提升人类偏好评分，说明 RM 评分与验证损失并非完全相关。

**第二阶段——奖励模型训练 (RM)**：从 SFT 模型（6B 参数版本）移除最终的 unembedding 层，添加一个线性投影头输出标量奖励值。对于每个提示，标注者对 K=4\~9 个模型输出进行排序，产生 \(\binom{K}{2}\) 个偏好对。RM 的训练损失函数为：

$$\mathcal{L}_{\text{RM}}(\theta) = -\frac{1}{\binom{K}{2}} \mathbb{E}_{(x, y_w, y_l) \sim D}\left[\log \sigma\left(r_\theta(x, y_w) - r_\theta(x, y_l)\right)\right]$$

其中 \(r_\theta(x, y)\) 是奖励模型对提示 \(x\) 和输出 \(y\) 的标量评分，\(y_w\) 是偏好对中被偏好的输出，\(y_l\) 是较差的输出。关键设计是**将同一提示的所有 \(\binom{K}{2}\) 对比较放入同一个 batch**，避免了奖励模型的过拟合问题。论文发现 6B 的 RM 比 175B 更稳定，大模型 RM 训练不稳定。

> 💡 **关键**：奖励模型只需要学习输出之间的**相对偏好排序**，而非绝对分数。训练前通过偏置归一化使标注者示范的平均奖励为 0。

**第三阶段——PPO 强化学习优化**：将语言模型的生成过程建模为一个 bandit 环境——给定随机提示，模型生成回答，奖励模型给出评分后 episode 结束。PPO-ptx 的完整优化目标为：

$$\operatorname{objective}(\phi) = \mathbb{E}_{(x,y) \sim D_{\pi_\phi^{\text{RL}}}}\left[r_\theta(x,y) - \beta \log\frac{\pi_\phi^{\text{RL}}(y \mid x)}{\pi^{\text{SFT}}(y \mid x)}\right] + \gamma \mathbb{E}_{x \sim D_{\text{pretrain}}}\left[\log \pi_\phi^{\text{RL}}(x)\right]$$

其中第一项是经 KL 惩罚调节的奖励最大化——\(\beta\) 控制 KL 散度惩罚强度，防止策略 \(\pi_\phi^{\text{RL}}\) 过度偏离参考模型 \(\pi^{\text{SFT}}\)，从而避免对奖励模型的过度优化（reward hacking）。第二项是预训练数据上的语言模型损失，系数 \(\gamma\) 控制其权重，用于缓解 RL 训练导致的公共 NLP 任务性能退化（alignment tax）。当 \(\gamma = 0\) 时退化为标准 PPO 模型。Value function 从 RM 初始化。

> ⚠️ **注意**：KL 惩罚是**逐 token**施加的，而非在整个序列级别。这提供了更细粒度的约束，防止模型在局部生成与 SFT 分布严重偏离的 token。

**与传统方法的区别与核心优势**

与纯监督微调相比，RLHF 的关键优势在于利用了**比较反馈**而非**示范反馈**。人类标注者判断"A 比 B 好"的一致性和效率远高于"从零撰写完美回答"。与直接使用 RM 分数做 best-of-n 采样（rejection sampling）相比，PPO 优化将奖励信号内化到模型参数中，推理时无需多次采样，计算效率更高。实验表明，1.3B 的 InstructGPT 在人类偏好评估中以显著优势胜过 175B 的 GPT-3，甚至在 TruthfulQA 和 RealToxicityPrompts 等安全基准上也表现更优。PPO-ptx 变体通过混合预训练梯度，在对齐能力和通用 NLP 能力之间取得了良好平衡，将 alignment tax 降至最低。这一三阶段框架后来成为 ChatGPT 等对话系统的基础训练范式。

#### 🧪 练习题
```yaml
question: "InstructGPT 在 PPO 训练中加入 KL 散度惩罚项的主要目的是什么？"
options:
  - "加速策略模型的收敛速度"
  - "防止策略模型过度偏离 SFT 参考模型，避免奖励模型被过度优化"
  - "提升奖励模型的预测精度"
  - "减少模型的参数量以节省计算资源"
answer: 1
explain: "KL 散度惩罚约束 π_RL 与 π_SFT 的分布差异，防止策略过度优化奖励模型的漏洞（reward hacking），确保生成质量。"
```

### CAI

```yaml
id: cai
num: 13
name: CAI
full_name: 宪法AI (Constitutional AI)
year: '2022'
org: Anthropic
parent: rlhf
paper_url: https://arxiv.org/abs/2212.08073
project_url: ''
category: alignment
motivation: 宪法原则自我监督对齐
```

#### 📝 一句话总结
Constitutional AI 提出用一组自然语言原则替代大量有害性人工偏好标签，让模型先自我批判并修订回答，再用 AI 反馈训练偏好模型和 RL 策略。它解决了 RLHF 在 harmlessness 上依赖人工标注、目标不透明、模型容易过度拒答的问题。

#### 🎯 核心要点
- 训练目标由显式 constitution 驱动：少量原则定义助手应如何处理危险、违法、冒犯或不诚实请求。
- 包含两个阶段：监督学习阶段 SL-CAI 和强化学习阶段 RL-CAI。
- SL-CAI 让初始 helpful 模型对有害提示作答，再依据宪法原则自我 critique、revision，并用修订后的回答做 supervised finetuning。
- RL-CAI 用模型自己对成对回答做 harmlessness 比较，形成 AI preference labels，再训练 preference model。
- RL 阶段保留人类 helpfulness 标签，但 harmlessness 标签由 AI feedback 产生，形成 RLAIF。
- 使用多条原则随机采样/集成，使反馈模型不只过拟合单一安全措辞，并提升探索多样性。
- Chain-of-thought 式 critique 和 comparison reasoning 可提升反馈质量，也让训练时的价值判断更可检查。
- 目标不是让模型一味拒答，而是训练出能解释拒绝理由、在无害部分继续帮助用户的 non-evasive assistant。

#### 🔬 深入细节
![Constitutional AI 两阶段训练流程](https://ar5iv.labs.arxiv.org/html/2212.08073/assets/x1.png)
*图：CAI 由上方的监督阶段和下方的 RL 阶段组成；critique、revision 和 AI preference feedback 都由 constitution 中的原则引导。*

CAI 的出发点是扩展监督能力。RLHF 通常需要大量人类偏好比较，尤其在 harmlessness 上，标注者要阅读高风险、有害、违法或冒犯内容，不仅成本高，而且标签集合很难被外部审计。CAI 把人类监督压缩成一组自然语言原则：人类不再逐条判断每个有害样本，而是先写出“模型应该遵循什么原则”，再让模型在训练过程中解释、应用和蒸馏这些原则。

第一阶段是监督式自我修订。论文先用 helpful-only assistant 在 red-team/harmful prompts 上生成初始回答，这些回答往往会顺从危险请求。然后把回答和一条宪法原则交给模型，让它批判原回答有什么问题；接着再要求模型依据批判修订回答。这个 critique → revision 可以重复多轮，每轮随机抽取不同原则。最终用修订后的回答微调原模型，得到 SL-CAI。这个阶段的作用不是最终对齐，而是把模型响应分布拉到更安全、更可训练的区域，降低后续 RL 探索难度。

```python
# CAI 两阶段训练伪代码

# Stage 1: Supervised Constitutional AI
revised_dataset = []
for prompt in harmful_prompts:
    response = helpful_model.generate(prompt)
    for _ in range(num_revision_rounds):
        principle = sample(constitution)
        critique = helpful_model.generate(make_critique_prompt(prompt, response, principle))
        response = helpful_model.generate(make_revision_prompt(prompt, response, critique, principle))
    revised_dataset.append((prompt, response))

sl_cai = supervised_finetune(base_model, revised_dataset)

# Stage 2: RL from AI Feedback
preference_data = []
for prompt in harmful_prompts:
    y_a, y_b = sample_two(sl_cai, prompt)
    principle = sample(constitution)
    p_a = feedback_lm.probability("A", make_comparison_prompt(prompt, y_a, y_b, principle))
    p_b = feedback_lm.probability("B", make_comparison_prompt(prompt, y_a, y_b, principle))
    preference_data.append((prompt, y_a, y_b, normalize(p_a, p_b)))

pm = train_preference_model(preference_data, helpful_human_labels)
rl_cai = ppo_train(sl_cai, reward_model=pm, kl_reference=sl_cai)
```

第二阶段是 RLAIF。它复用 RLHF 的 preference model → RL 管线，但把 harmlessness 的人类比较替换成 AI comparison evaluations。具体做法是：对同一 prompt 从 SL-CAI 采样两个候选回答，把对话、候选 A/B 和一条宪法原则放入 feedback model，让它以多选形式判断哪个回答更符合原则。论文使用选项 A/B 的归一化概率作为软标签，而不是只取硬标签，这样可以保留反馈模型的不确定性。

偏好模型训练可用 Bradley-Terry 形式理解。若 \(r_\phi(x,y)\) 是 preference model 给回答 \(y\) 的奖励分数，则它认为 A 优于 B 的概率为：

$$
P_\phi(y_A \succ y_B\mid x)=\frac{\exp(r_\phi(x,y_A))}{\exp(r_\phi(x,y_A))+\exp(r_\phi(x,y_B))}.
$$

AI feedback model 产生的软目标记为 \(p_{AI}\)，则偏好模型可以最小化交叉熵：

$$
\mathcal{L}_{PM}=-p_{AI}\log P_\phi(y_A\succ y_B\mid x)-(1-p_{AI})\log P_\phi(y_B\succ y_A\mid x).
$$

训练好偏好模型后，RL 阶段与 PPO/RLHF 类似：最大化偏好模型奖励，同时用 KL 惩罚约束新策略不要偏离参考策略太远：

$$
\max_\theta\ \mathbb{E}_{x,y\sim\pi_\theta}\left[r_\phi(x,y)-\beta\,\mathrm{KL}(\pi_\theta(\cdot\mid x)\,\|\,\pi_{ref}(\cdot\mid x))\right].
$$

> 💡 关键：CAI 并不是“没有人类监督”，而是把人类监督从海量样本级标签转移到原则级规范；AI 负责把原则应用到大量具体样本上。

CAI 相比 RLHF 的核心差异在监督接口。RLHF 的价值信息主要隐藏在成千上万条人类比较中，很难读出“模型到底被教了什么”；CAI 的价值信息首先以 constitution 的形式出现，训练者可以直接审查、修改、添加或删除原则。对齐目标因此更透明，也更容易做版本控制。当然，原则如何被模型解释仍可能出错，所以论文强调使用 critique/revision、few-shot comparison 和多原则采样来提升鲁棒性。

另一个重要设计是 non-evasiveness。很多 harmless 模型会把安全性学成“遇到敏感主题就拒绝”，导致 helpfulness 大幅下降。CAI 的修订阶段会鼓励模型说明为什么不能提供有害帮助，同时尽量给出安全替代信息；RL 阶段的偏好比较也可通过原则约束“更少伤害但不无意义拒答”。这让模型在面对危险请求时可以解释边界，而不是简单结束对话。

Chain-of-thought 在 CAI 中扮演训练辅助角色：模型可以先写出 critique 或比较理由，再给出修订/选择。这一方面提升复杂规范判断的准确率，另一方面把部分决策过程显式化，便于研究者观察模型是否真的在应用原则。不过在部署时是否展示这些推理是另一个问题；论文关心的是训练阶段用 reasoning 改善 AI feedback 和 self-revision 的质量。

局限在于，CAI 的质量受 constitution 覆盖度、反馈模型能力和提示格式影响。如果原则之间冲突、反馈模型误解原则，错误偏好仍会被蒸馏进 PM；如果只用 AI 反馈，可能继承模型自身偏见。因此 CAI 更像是 RLHF 的可扩展补充：用原则和 AI feedback 替换最昂贵、最不透明的一部分 harmlessness 标注，而不是彻底消除人类在目标设定与审计中的责任。

#### 🧪 练习题
```yaml
question: "Constitutional AI 中 RL-CAI 与传统 RLHF 在 harmlessness 监督上的主要区别是什么？"
options:
  - "RL-CAI 不训练偏好模型"
  - "RL-CAI 用宪法原则引导的 AI feedback 产生 harmlessness 比较标签，而不是依赖大量人工 harmlessness 标签"
  - "RL-CAI 只做监督微调，不做强化学习"
  - "RL-CAI 删除 KL 约束，让策略自由偏离参考模型"
answer: 1
explain: "CAI 的 RL 阶段复用偏好模型和 RL 管线，但 harmlessness 偏好由反馈模型依据 constitution 自动标注。"
```

### DPO

```yaml
id: dpo
num: 14
name: DPO
full_name: 直接偏好优化 (Direct Preference Optimization)
year: '2023'
org: Stanford
parent: rlhf
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/a85b405ed65c6477a4fe8302b5e06ce7-Abstract-Conference.html
project_url: ''
category: alignment
motivation: 直接偏好优化无需奖励模型
```

#### 📝 一句话总结
DPO 提出把 RLHF 中“先学奖励模型、再用 RL 优化策略”的两阶段流程改写成一个直接作用在偏好样本上的分类损失，解决了 PPO 式 RLHF 训练复杂、采样昂贵和稳定性敏感的问题。它的关键洞察是：在 KL 约束的奖励最大化目标下，语言模型本身可以被视为一个隐式奖励模型。

#### 🎯 核心要点
- 用单阶段策略训练替代传统 RLHF 的奖励模型训练与 PPO 强化学习优化。
- 基于 Bradley-Terry 偏好模型，把人类偏好概率直接写成新策略与参考策略的 log-ratio。
- 通过 KL 约束奖励最大化的闭式最优解，推导出隐式奖励函数 \(\hat r_\theta(x,y)=\beta\log \frac{\pi_\theta(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}\)。
- DPO 损失只需要离线偏好三元组 \((x,y_w,y_l)\)，不需要训练时从当前策略 rollout。
- 更新方向同时提高 preferred response 的相对概率、降低 dispreferred response 的相对概率，并按当前排序错误程度动态加权。
- 参考模型 \(\pi_{\mathrm{ref}}\) 通常取 SFT 模型，用于限制策略偏离原始语言分布。
- 实验覆盖情感控制、摘要和单轮对话，显示 DPO 可达到或超过 PPO-based RLHF 的偏好优化效果。

#### 🔬 深入细节
![DPO 与传统 RLHF 流程对比](https://ar5iv.labs.arxiv.org/html/2305.18290/assets/figures/diagrams/teaser.png)
*图：传统 RLHF 需要显式奖励模型和强化学习循环；DPO 直接在偏好数据上做最大似然分类优化。*

```python
# DPO 核心训练伪代码：离线偏好三元组上直接优化策略
# D = [(prompt x, preferred y_w, rejected y_l)]
pi_ref = frozen_sft_model
pi_theta = trainable_sft_model
beta = kl_temperature

for batch in preference_loader(D):
    x, y_w, y_l = batch
    logp_w = log_prob(pi_theta, x, y_w)
    logp_l = log_prob(pi_theta, x, y_l)
    ref_logp_w = log_prob(pi_ref, x, y_w)
    ref_logp_l = log_prob(pi_ref, x, y_l)

    reward_gap = beta * ((logp_w - ref_logp_w) - (logp_l - ref_logp_l))
    loss = -log_sigmoid(reward_gap).mean()
    loss.backward()
    optimizer.step()
```

DPO 的出发点是传统 RLHF 的实际工程痛点。标准流程先用偏好数据训练奖励模型 \(r_\phi(x,y)\)，再让策略 \(\pi_\theta\) 通过 PPO 最大化奖励，同时用 KL 惩罚限制它不要偏离参考模型。这套流程强大但复杂：奖励模型可能被策略“钻空子”，PPO 需要在线采样，价值函数和 advantage 估计引入额外方差，训练超参也很敏感。DPO 的目标不是换一个奖励模型，而是证明在常用偏好建模假设下，可以把同一个 RLHF 目标直接变成监督学习形式。

传统 RLHF 的 KL 约束目标可写为：

$$
\max_{\pi}\;\mathbb{E}_{x\sim\mathcal{D},y\sim\pi(y\mid x)}[r(x,y)]-\beta D_{\mathrm{KL}}\left(\pi(y\mid x)\;\|\;\pi_{\mathrm{ref}}(y\mid x)\right)
$$

这个目标的最优策略有闭式形式：

$$
\pi_r(y\mid x)=\frac{1}{Z(x)}\pi_{\mathrm{ref}}(y\mid x)\exp\left(\frac{1}{\beta}r(x,y)\right)
$$

把它反解，可以得到奖励函数的重参数化：

$$
r(x,y)=\beta\log\frac{\pi_r(y\mid x)}{\pi_{\mathrm{ref}}(y\mid x)}+\beta\log Z(x)
$$

关键在于 Bradley-Terry 偏好模型只关心两个回答的奖励差。对于同一个 prompt \(x\)，归一化项 \(\beta\log Z(x)\) 在 \(y_w\) 与 \(y_l\) 的差分中抵消，因此不需要显式估计 partition function。于是，人类偏好“\(y_w\) 优于 \(y_l\)”的概率可以直接由策略 log-ratio 给出，而不是先由单独的 reward model 给出。

DPO 最终优化的负对数似然为：

$$
\mathcal{L}_{\mathrm{DPO}}(\pi_\theta;\pi_{\mathrm{ref}})
=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}\left[
\log\sigma\left(
\beta\log\frac{\pi_\theta(y_w\mid x)}{\pi_{\mathrm{ref}}(y_w\mid x)}
-\beta\log\frac{\pi_\theta(y_l\mid x)}{\pi_{\mathrm{ref}}(y_l\mid x)}
\right)
\right]
$$

这不是简单地把 \(y_w\) 做 SFT、把 \(y_l\) 做 unlikelihood。损失中的参考模型 log-ratio 让训练关注“相对参考模型的偏好提升”，而不是无约束地增加某个字符串概率。\(\beta\) 控制隐式 KL 强度：\(\beta\) 越大，模型越强烈地区分胜负样本；\(\beta\) 越小，更新更保守。由于 \(\pi_{\mathrm{ref}}\) 冻结，DPO 的每个 batch 都能离线计算，无需在训练中调用当前策略生成新回答。

从梯度角度看，DPO 会增加 \(\log\pi_\theta(y_w\mid x)\)，降低 \(\log\pi_\theta(y_l\mid x)\)，但样本权重由当前隐式奖励排序是否错误决定。若模型仍给 rejected answer 更高隐式奖励，\(\sigma(\hat r_\theta(x,y_l)-\hat r_\theta(x,y_w))\) 会较大，该样本更新更强；若模型已经明显偏好 \(y_w\)，更新自然变小。这解释了论文中“动态 per-example importance weight”的作用：它避免朴素概率比目标把模型推向退化的高概率模板。

与 PPO-based RLHF 相比，DPO 的优势主要来自去掉了在线 RL 环节。PPO 需要 reward model、value model、policy model、reference model 之间反复交互，还要控制 KL、clip、advantage、rollout 长度等细节；DPO 只保留 trainable policy 与 frozen reference policy。代价是 DPO 更依赖偏好数据覆盖：它不会主动探索新回答，也不会在训练中发现 reward model 未见过的模式。因此在实践中，DPO 适合已有高质量偏好对的对齐微调；若需要持续发现新风险，仍可能需要红队数据生成或在线反馈流程补充。

> 💡 关键：DPO 不是“没有奖励”，而是把奖励函数隐式地编码为策略相对参考策略的 log-ratio，因此语言模型同时扮演 policy 和 reward model。

#### 🧪 练习题
```yaml
question: "DPO 为什么可以绕过显式奖励模型训练？"
options:
  - "因为它只做普通 SFT，不使用偏好中的 rejected response"
  - "因为 Bradley-Terry 偏好概率可通过 KL 约束最优策略的 log-ratio 重参数化表示"
  - "因为它把 PPO 的 clip 操作替换成更大的 batch size"
  - "因为它完全移除了参考模型和 KL 约束"
answer: 1
explain: "DPO 利用 KL 约束奖励最大化目标的闭式最优策略，把奖励差转成策略相对参考策略的 log-ratio 差，从而直接在偏好对上优化分类损失。"
```

### Safe RLHF

```yaml
id: safe_rlhf
num: 15
name: Safe RLHF
full_name: 安全RLHF (Safe Reinforcement Learning from Human Feedback)
year: '2024'
org: PKU
parent: dpo
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/dd1577afd396928ed64216f3f1fd5556-Abstract-Conference.html
project_url: ''
category: alignment
motivation: 安全约束平衡有用与安全
```

#### 📝 一句话总结
Safe RLHF 提出把“有用性”和“无害性”偏好显式解耦，分别训练 Reward Model 与 Cost Model，再用带拉格朗日乘子的安全强化学习目标动态平衡两者。它解决了普通 RLHF 把 helpfulness 与 harmlessness 混成单一偏好后容易过度拒答或牺牲安全的问题。

#### 🎯 核心要点
- 将人类反馈拆成两条独立标注轴：helpfulness preference 与 harmlessness preference。
- 训练两个偏好模型：Reward Model 评估有用性，Cost Model 评估潜在危害成本。
- Cost Model 不只使用成对排序，还利用 safe/unsafe 二分类标签建立安全边界。
- 把 LLM 安全对齐形式化为约束优化：最大化期望奖励，同时约束期望成本不超过阈值。
- 使用 Lagrangian 方法把约束问题转成可优化目标，并动态更新惩罚系数 \(\lambda\)。
- 三轮 Safe RLHF 迭代包含数据收集、双维度标注、RM/CM 训练、安全 RL 微调与红队补充。
- 论文以 Alpaca-7B 为初始模型，得到 Beaver 系列模型，并发布 PKU-SafeRLHF 数据与代码。

#### 🔬 深入细节
![Safe RLHF 流程图](https://ar5iv.labs.arxiv.org/html/2310.12773/assets/x1.png)
*图：Safe RLHF 相比传统 RLHF，在标注和偏好建模阶段拆分 helpfulness 与 harmlessness，并在策略优化阶段用安全约束动态合成。*

```python
# Safe RLHF 简化伪代码：双偏好模型 + 拉格朗日安全约束
for round_id in range(3):
    prompts = collect_prompts(open_data=True, red_team=(round_id > 0))
    responses = sample_policy(policy, prompts)

    helpful_pairs, harmless_pairs, safety_labels = human_annotate_two_axes(responses)
    reward_model = train_reward_model(helpful_pairs)
    cost_model = train_cost_model(harmless_pairs, safety_labels)

    for step in rl_steps:
        y = policy.generate(prompts)
        reward = reward_model(prompts, y)
        cost = cost_model(prompts, y)

        # maximize reward while enforcing cost <= d
        policy_loss = -(reward - lambda_ * (cost - d))
        update_policy_with_ppo(policy_loss)
        lambda_ = max(0, lambda_ + lr_lambda * (cost.mean() - d))
```

Safe RLHF 的核心问题意识是：安全对齐并不等同于“让人类给一个总体偏好分数”。同一个回答可能更完整、更听话，因此更 helpful；但如果它满足了危险请求，就更 harmful。反过来，一个直接拒答的回答可能很 safe，却不够 helpful。传统 RLHF 用单一 reward model 学“总体偏好”时，标注者需要在两个冲突维度中做隐式折中，模型训练时也只能优化一个混合目标，容易导致安全和能力之间的不可控摆动。

论文因此把标注拆成两个任务。对每个 prompt 的多个回答，标注者分别比较“哪个更有帮助”和“哪个更无害”，同时给每个 QA 对标注 safe/unsafe 元标签。得到的数据可记为 helpfulness 数据集 \(\mathcal{D}_R\) 与 harmlessness 数据集 \(\mathcal{D}_C\)。Reward Model 使用常规 Bradley-Terry pairwise loss：

$$
\mathcal{L}_R(\phi)=-\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}_R}\left[
\log\sigma\left(R_\phi(x,y_w)-R_\phi(x,y_l)\right)
\right]
$$

Cost Model 的设计更特殊。它同样学习“哪个回答更有害”的相对排序，但还利用 safe/unsafe 标签加入分类项。若 \(C_\psi(x,y)\) 越大表示危害成本越高，则可以把安全边界视为一个虚拟响应 \(y_0\)，满足 \(C_\psi(x,y_0)=0\)。unsafe 回答应位于边界上方，safe 回答应位于边界下方。简化写法如下：

$$
\mathcal{L}_C(\psi)=
-\mathbb{E}_{\mathcal{D}_C}\left[\log\sigma(C_\psi(x,y_{\mathrm{harm}})-C_\psi(x,y_{\mathrm{safe}}))\right]
-\mathbb{E}_{(x,y,s)}\left[
\mathbf{1}_{s=1}\log\sigma(C_\psi(x,y))+
\mathbf{1}_{s=0}\log\sigma(-C_\psi(x,y))
\right]
$$

这个 Cost Model 的意义不是替代 Reward Model，而是为策略优化提供可约束的安全信号。论文中的 Figure 2 显示 reward 与 cost 可以形成不同分布：高 reward 不必然低 cost，低 cost 也不必然高 reward。因此，安全训练不能只靠把 reward 改成 \(R-\alpha C\) 的固定线性组合；固定 \(\alpha\) 在不同训练阶段可能过强或过弱，导致过度拒答或安全约束失效。

在策略优化阶段，Safe RLHF 把目标写成约束优化：

$$
\max_\theta J_R(\theta)\quad\mathrm{s.t.}\quad J_C(\theta)\le d
$$

其中

$$
J_R(\theta)=\mathbb{E}_{x\sim\mathcal{D},y\sim\pi_\theta(\cdot\mid x)}[R_\phi(x,y)],\quad
J_C(\theta)=\mathbb{E}_{x\sim\mathcal{D},y\sim\pi_\theta(\cdot\mid x)}[C_\psi(x,y)]
$$

\(d\) 是可接受成本阈值，用来控制模型生成有害回答的概率或强度。通过拉格朗日松弛，训练目标变为：

$$
\mathcal{L}(\theta,\lambda)=J_R(\theta)-\lambda\left(J_C(\theta)-d\right),\quad \lambda\ge0
$$

当当前策略的 cost 超过阈值时，\(\lambda\) 增大，安全惩罚变强；当 cost 已经低于阈值时，\(\lambda\) 可以减小，策略重新把优化重心放回 helpfulness。这就是 Safe RLHF 相比 reward shaping 的关键区别：它不是预先指定一个永远不变的 helpful/safe 权重，而是在训练中根据约束违反程度自适应调整。

训练流程上，Safe RLHF 仍然保留 RLHF 的生成-评价-优化循环，但把评价器拆成 RM 和 CM。第一轮使用已有安全相关与无关 prompt；后续轮次加入 red-teaming prompt，持续补充模型仍无法安全处理的场景。每轮都会重新收集偏好数据、训练或更新偏好模型，再进行安全 RL 微调。论文报告三轮迭代后，模型在人工和 GPT-4 评估下同时提升 helpfulness 与 harmlessness，说明解耦标注和约束优化能缓解“安全越强越没用”这一常见退化。

与 DPO 这类离线偏好优化相比，Safe RLHF 更接近完整的安全控制框架：它需要生成、偏好模型和 RL 优化，工程成本更高，但可以直接表达“安全成本必须低于阈值”的硬约束语义。DPO 的优势是简单稳定，Safe RLHF 的优势是能把安全目标从奖励偏好中独立出来，适合需要显式安全预算、红队迭代和动态风险控制的模型训练。

> ⚠️ 注意：Safe RLHF 中的“cost”不是负奖励的别名，而是单独建模的安全风险信号；把它作为约束处理，才是该方法区别于普通多目标加权 RLHF 的核心。

#### 🧪 练习题
```yaml
question: "Safe RLHF 使用拉格朗日乘子 λ 的主要目的是什么？"
options:
  - "固定提高所有回答的长度，从而提升 helpfulness"
  - "在训练中根据成本约束违反程度动态调整安全惩罚强度"
  - "把 Reward Model 和 Cost Model 合并为同一个分类器"
  - "替代人类标注，自动产生所有偏好标签"
answer: 1
explain: "λ 对应安全约束的惩罚系数；当策略生成的期望成本超过阈值时，λ 增大，使优化更重视降低风险。"
```

### MART

```yaml
id: mart
num: 16
name: MART
full_name: 多轮自动红队 (Multi-round Automatic Red-Teaming)
year: '2024'
org: Academic
parent: —
paper_url: https://aclanthology.org/2024.naacl-long.107/
project_url: ''
category: alignment
motivation: 自动化多轮红队对抗测试
```

#### 📝 一句话总结
MART 提出让 adversarial LLM 与 target LLM 多轮互相博弈：攻击模型持续生成能暴露漏洞的新 prompt，目标模型则用筛选出的安全高质量回答做安全微调。它解决了人工红队成本高、单轮自动红队只能发现风险而不能同步修复模型的问题。

#### 🎯 核心要点
- 同时训练两个模型：攻击侧 \(M_{adv}\) 负责生成 adversarial prompts，防御侧 \(M_{tgt}\) 负责产生并学习安全回答。
- 每轮使用安全 RM \(S_s\) 与有用性 RM \(S_h\) 评价 target response，自动划分 successful attack 与 successful defense。
- successful attack prompts 被加入下一轮攻击模型训练，使 \(M_{adv}\) 学会针对当前目标模型的新漏洞。
- safe 且 helpful 的 target responses 被加入目标模型安全微调数据，使 \(M_{tgt}\) 在真实攻击分布上提升防御能力。
- 采用多轮闭环而非一次性红队，目标模型更新后，攻击模型也随之适应新的失败模式。
- 初始化使用 LLaMA-65B、LIMA 与 Open Assistant 做通用指令能力基础，并用约 2,400 条红队 seed prompt 启动攻击空间。
- 论文报告经过 4 轮 MART，有限安全对齐模型在 adversarial prompt benchmark 上 violation rate 最高下降 84.7%，同时非对抗 prompt 上 helpfulness 基本保持稳定。

#### 🔬 深入细节
![MART 多轮自动红队框架](https://figures.semanticscholar.org/709af143f78bc62413c50ea1a7ee75b0702c4f59/2-Figure1-1.png)
*图：MART 根据 evaluator 反馈把成功攻击用于训练 adversarial LLM，把安全且有用的成功防御回答用于训练 target LLM。*

```python
# MART Algorithm 1/2 的简化合并版
M_adv = initialize_with_instruction_model()
M_tgt = initialize_with_instruction_model()
P_adv = seed_red_team_prompts
S_s = safety_reward_model
S_h = helpfulness_reward_model

for i in range(1, T):
    # 1. 攻击模型基于上一轮成功攻击生成新 adversarial prompts
    P_gen = generate_prompts(M_adv, P_adv, k=K_adv)

    # 2. 目标模型回答这些新攻击
    A_tgt = generate_answers(M_tgt, P_gen, k=K_tgt)

    next_P_adv = []
    R_tgt = []
    for prompt, answer in zip(P_gen, A_tgt):
        safety_score = S_s(prompt, answer)
        helpful_score = S_h(prompt, answer)

        if safety_score < theta_adv_s:
            next_P_adv.append(prompt)       # successful attack: train M_adv
        elif safety_score > theta_tgt_s and helpful_score > theta_tgt_h:
            R_tgt.append((prompt, answer))  # successful defense: train M_tgt

    M_adv = supervised_finetune(M_adv, pairs_from(P_adv, next_P_adv))
    M_tgt = supervised_finetune(M_tgt, R_tgt)
    P_adv = next_P_adv
```

MART 的动机来自红队训练的两个缺口。第一，人工红队有效但昂贵，尤其当模型多轮迭代后，之前的攻击样本很快变得过时，需要人持续设计新漏洞测试。第二，已有自动红队通常只负责“找出失败样本”，没有把安全回答生成和目标模型修复纳入同一个闭环。MART 把攻击生成和安全微调放进同一轮循环，使红队不再只是评测工具，而是训练数据生产器。

方法中有三个核心对象：攻击模型 \(M_{adv}\)、目标模型 \(M_{tgt}\)、评价器 \((S_s,S_h)\)。\(S_s\) 是 safety reward model，用来判断回答是否安全；\(S_h\) 是 helpfulness reward model，用来避免模型只学会机械拒答。对于第 \(i\) 轮生成的 prompt-response 对 \((p,a)\)，MART 计算：

$$
s_s = S_s(p,a),\quad s_h = S_h(p,a)
$$

若 \(s_s < \theta^{s}_{adv}\)，说明 target 在该 prompt 上被攻破，这个 prompt 进入 \(P^i_{adv}\)，用于训练攻击模型产生类似但更新的攻击。若 \(s_s > \theta^{s}_{tgt}\) 且 \(s_h > \theta^{h}_{tgt}\)，说明 target 给出了既安全又有帮助的回答，这个回答进入 \(R^i_{tgt}\)，用于目标模型的安全微调。这个双阈值筛选是 MART 的关键机制：攻击侧需要“能攻破”的 prompt，防御侧需要“安全且不失帮助”的 response。

攻击模型训练采用监督式 pairwise 生成。论文先用红队 seed 数据预训练 \(M_{adv}\)，让它学会把一个恶意或边界 prompt 改写成同类的新 prompt。在第 \(i\) 轮，如果 \(p^{i-1}_{adv}\) 触发了新的成功攻击 \(p^i_{adv}\)，就把 \((p^{i-1}_{adv},p^i_{adv})\) 作为输入输出对训练 \(M_{adv}\)。这相当于让攻击模型沿着“已知成功攻击附近”的方向搜索，而不是在整个 prompt 空间中随机探索，因此更容易发现目标模型当前仍薄弱的局部区域。

目标模型训练则是 feedback-guided safety finetuning。MART 不把所有拒答都视为好样本，因为过度强调 safety 会让模型退化为不愿回答。只有同时通过 \(\theta^{s}_{tgt}\) 和 \(\theta^{h}_{tgt}\) 的回答才被认为是高质量安全回答。目标模型用这些 \((p,a)\) 做 SFT，学习在 adversarial prompt 上先处理安全风险，再在允许范围内提供有用信息。这也是论文强调 helpfulness 在非对抗 prompts 上保持稳定的原因：训练数据不是单纯的“拒绝模板”，而是经过有用性 RM 过滤的安全回答。

MART 的“multi-round”并不是简单重复数据增强，而是一个非静态对抗过程。目标模型每轮更新后，旧攻击可能失效，但新漏洞也可能出现；攻击模型必须根据上一轮成功样本继续适配。用集合表示，单轮流程可以概括为：

$$
P^i_{gen}=\mathrm{Generate}(M^i_{adv},P^{i-1}_{adv}),\quad
A^i_{tgt}=\mathrm{Generate}(M^i_{tgt},P^i_{gen})
$$

$$
P^i_{adv}=\{p\in P^i_{gen}:S_s(p,M^i_{tgt}(p))<\theta^s_{adv}\}
$$

$$
R^i_{tgt}=\{(p,a):S_s(p,a)>\theta^s_{tgt}\land S_h(p,a)>\theta^h_{tgt}\}
$$

然后分别更新：

$$
M^{i+1}_{adv}\leftarrow\mathrm{Train}(M^i_{adv},P^{i-1}_{adv},P^i_{adv}),\quad
M^{i+1}_{tgt}\leftarrow\mathrm{Train}(M^i_{tgt},P^i_{gen},R^i_{tgt})
$$

论文还补充了两个工程细节。第一轮目标模型安全能力较弱，能直接通过双阈值的高质量回答可能太少，因此使用 context distillation：给 prompt 添加安全前缀，引导模型产生更安全回答，再参与筛选。后期模型趋于稳定时，新增可用样本减少，论文使用 rejection sampling：对同一 prompt 采样多个回答、调整温度扩大候选集，再从通过阈值的回答中抽取训练样本。这两个技巧解决的是数据稀疏问题，而不是改变 MART 的主循环。

与 Safe RLHF 或 DPO 相比，MART 的贡献更偏“数据生成与对抗训练流程”。DPO 关注如何从静态偏好对中直接优化策略；Safe RLHF 关注如何把安全当作约束；MART 则关注安全样本从哪里来，以及模型更新后如何持续发现新风险。它特别适合安全红队场景：每一轮都同时产出更强攻击器和更强防御器，最终把发现漏洞、筛选安全回答、修复目标模型串成可扩展闭环。

> 💡 关键：MART 的 evaluator 不只是打分器，而是路由器；低 safety score 的样本流向攻击模型，高 safety 且高 helpfulness 的样本流向目标模型。

#### 🧪 练习题
```yaml
question: "MART 中一个 prompt-response 对会被用于目标模型安全微调的条件是什么？"
options:
  - "只要 prompt 来自上一轮 successful attack 集合"
  - "只要回答的 safety score 很低，说明攻击足够强"
  - "回答同时超过目标侧 safety 阈值和 helpfulness 阈值"
  - "攻击模型和目标模型生成了完全相同的文本"
answer: 2
explain: "MART 用双阈值选择 successful defense：回答必须既安全又有帮助，才会进入目标模型的安全微调集合。"
```

### ToxiGen

```yaml
id: toxigen
num: 17
name: ToxiGen
full_name: ToxiGen数据集 (ToxiGen Dataset)
year: '2022'
org: Microsoft
parent: —
paper_url: https://aclanthology.org/2022.acl-long.234/
project_url: ''
category: content_safety
motivation: 隐性毒性检测数据集
```

#### 📝 一句话总结
ToxiGen 提出了一个用大语言模型生成的隐性毒性检测数据集，并用 ALICE 这种 classifier-in-the-loop 解码机制主动制造能迷惑现有毒性分类器的样本，解决传统毒性数据集依赖显式脏词、群体提及偏置和难以覆盖隐性仇恨的问题。

#### 🎯 核心要点
- 构建 274,186 条机器生成语句，覆盖 13 个少数/边缘化身份群体，并在 toxic 与 benign 两类之间保持接近平衡。
- 强调隐性毒性，论文统计 98.2% 的 ToxiGen 样本不含显式 profanity、slur 或 swearword。
- 使用 demonstration-based prompting，让 GPT-3 根据每个群体、每种标签的示例集合生成同类但不同的新语句。
- 提出 ALICE（Adversarial Language Imitation with Constrained Exemplars），在 beam search 中把语言模型概率和毒性分类器概率联合成解码分数。
- 通过两类对抗设置产生难例：毒性提示下最大化 benign 分类概率形成 false negative，良性提示下最大化 toxic 分类概率形成 false positive。
- ALICE 实验中使用 GPT-3 作为生成器、HateBERT OffensEval 作为分类器，设置 \(\lambda_L=\lambda_C=0.5\)、beam size 10、最大 30 token、temperature 0.9。
- 人工验证集 ToxiGen-HumanVal 使用 792 条样本，每条由 3 名标注者评估，用于确认机器生成文本的人类相似度、目标群体控制和毒性标签可靠性。
- 下游实验显示，用 ToxiGen 微调毒性分类器能提升其在 ImplicitHateCorpus、SocialBiasFrames、DynaHate 等人写隐性毒性数据上的表现。

#### 🔬 深入细节
![ToxiGen ALICE 对抗解码示意图](https://ar5iv.labs.arxiv.org/html/2203.09509/assets/x2.png)
*图：ALICE 在 constrained beam search 中把 GPT-3 生成候选 token 的语言模型分数与外部毒性分类器分数相结合，从而生成对现有检测器更难的隐性毒性样本。*

```python
# ToxiGen / ALICE 核心流程伪代码
identity_groups = ["Black", "Asian", "Native American", "Latino", "Jewish", "Muslim",
                   "Chinese", "Mexican", "Middle Eastern", "LGBTQ+", "Women",
                   "Mental Disability", "Physical Disability"]

for group in identity_groups:
    benign_demos = curate_examples(group, label="benign", n=20_to_50)
    toxic_demos = curate_examples(group, label="toxic", n=20_to_50)

    # 普通 ToxiGen 生成：用示例提示 GPT-3，再用 top-k decoding 采样
    for label, demos in [("benign", benign_demos), ("toxic", toxic_demos)]:
        prompt = build_demonstration_prompt(group, demos)
        samples = gpt3_top_k_decode(prompt, max_len=30, temperature=0.9)
        save(samples, group=group, label=label, source="top-k")

    # ALICE 对抗生成：把分类器放入 beam search 的打分环节
    for setup in ["false_negative", "false_positive"]:
        prompt, target_clf_class = choose_prompt_and_target_class(setup, group)
        beams = [empty_sequence()]
        for t in range(max_len):
            candidates = []
            for seq in beams:
                for token in top_100_lm_tokens(gpt3, prompt + seq):
                    new_seq = seq + token
                    lm_score = log_p_lm(token, prompt + seq)
                    clf_score = log_p_classifier(target_clf_class, prompt + new_seq)
                    score = 0.5 * lm_score + 0.5 * clf_score
                    candidates.append((score, new_seq))
            beams = select_top_beams(candidates, beam_size=10)
        save(beams, group=group, source="ALICE", adversarial_setup=setup)
```

ToxiGen 的出发点不是再爬一批网络辱骂文本，而是修正毒性检测中两个更隐蔽的问题。第一，很多既有数据集把少数群体关键词与 toxic 标签强绑定，模型容易学到“提到某群体就是有害”的捷径，造成对良性身份讨论的误杀。第二，真正难检测的隐性毒性通常没有显式脏词，可能以刻板印象、暗示性贬低、伪事实断言或貌似正面的偏见表达出现，靠关键词抓取很难规模化获得。ToxiGen 因此把目标改成“可控生成”：指定群体、指定 toxic/benign 标签、尽量避免显式攻击词。

普通生成阶段采用 demonstration-based prompting。对每个群体，作者先收集少量高质量示例，再让 GPT-3 模仿这些示例生成更多同分布语句。关键设计是把身份群体和标签拆开控制：每个目标群体都有 benign 与 toxic 两组 prompt，总计 26 组 prompt。这样得到的数据不是由网络平台自然分布决定，而是由实验者主动控制，使每个群体都有足量良性与有害样本，从源头降低“群体提及 = 毒性”的伪相关。

ALICE 是论文中最重要的算法机制。它把生成器 \(\mathrm{PLM}\) 和毒性分类器 \(\mathrm{CLF}\) 放进同一个解码循环：生成器保证语言流畅性，分类器提供软约束，beam search 每一步选择既像自然语言、又朝目标分类器标签移动的 token。论文的核心打分可写成：

$$
\log p(w_{i+1}\mid w_{0:i}) \propto
\lambda_L \log p_{\mathrm{LM}}(w_{i+1}\mid w_{0:i}) +
\lambda_C \log p_{\mathrm{CLF}}(y^\star\mid w_{0:i+1})
$$

其中 \(w_{0:i}\) 是当前部分序列，\(w_{i+1}\) 是候选下一个 token，\(y^\star\) 是希望分类器输出的目标类别，\(\lambda_L\) 与 \(\lambda_C\) 控制语言自然度和对抗目标之间的权衡。如果 \(\lambda_C\) 太高，生成文本可能变得不自然；如果 \(\lambda_L\) 太高，样本又可能只是普通 GPT-3 输出，不能有效攻击分类器。论文默认二者相等，本质上是在“可读性”和“分类器误判性”之间做折中。

ALICE 的两个对抗方向对应内容安全系统最常见的两类失败。false negative 方向从 toxic prompt 出发，却在 beam search 中最大化分类器的 benign 概率，从而生成“人看有害、模型看安全”的隐性毒性。false positive 方向从 benign prompt 出发，却最大化 toxic 概率，从而生成“人看良性、模型看有害”的身份提及文本。前者暴露漏检，后者暴露误杀；二者合在一起使 ToxiGen 不只是一个训练集，也是一套压力测试工具。

从训练分类器的角度看，ToxiGen 的价值在于它把困难样本分成可解释来源。top-k 生成样本提供规模和群体均衡；ALICE 样本提供模型特定的边界攻击；人工验证集则提供可信评估锚点。论文没有假设机器生成文本天然可靠，而是用人工标注检查“是否像人写的”“是否伤害目标群体”“是否包含直接或间接群体指涉”等维度。这样得到的数据能同时用于微调、鲁棒性评估和偏差诊断。

与传统毒性数据集相比，ToxiGen 的方法论差异非常明显。传统采集路径依赖平台语料、关键词、用户举报或人工红队，容易继承平台偏差和显式语言偏差；ToxiGen 则把 LLM 的潜在偏见能力反过来用于生成训练信号。它不是声称 GPT-3 生成的有害内容是现实世界分布的无偏样本，而是用“可控、平衡、隐性、对抗”的合成数据填补真实数据难以覆盖的区域。对内容安全系统而言，这种合成难例数据尤其适合补强边界行为，而不是替代真实线上分布。

> 💡 关键：ToxiGen 的核心不是“用 GPT-3 造毒性文本”这么简单，而是把数据生成过程变成一个可控的安全评测器，让生成器、分类器、目标群体和毒性标签都成为显式变量。

#### 🧪 练习题
```yaml
question: "ALICE 在 ToxiGen 中把毒性分类器放入 beam search 的主要目的是什么？"
options:
  - "让生成器完全避开少数群体相关词语"
  - "用分类器分数作为软约束，生成能暴露误杀或漏检的隐性毒性难例"
  - "把所有生成样本都转换为显式辱骂文本"
  - "用人工标注器替代语言模型的 token 选择"
answer: 1
explain: "ALICE 将语言模型概率与分类器目标类别概率加权合成解码分数，使生成文本既自然又能挑战已有毒性分类器。"
```

### NeMo Guardrails

```yaml
id: nemo_guard
num: 18
name: NeMo Guardrails
full_name: NeMo护栏 (NeMo Guardrails)
year: '2023'
org: NVIDIA
parent: —
paper_url: https://www.nvidia.com/en-us/about-nvidia/press-releases/2023/nvidia-nemo-guardrails-open-source-software-to-help-developers-guide-ai-chatbots/
project_url: ''
category: content_safety
motivation: 对话边界定义框架
```

#### 📝 一句话总结
NeMo Guardrails 提出了一套运行时可编程护栏框架，用 Colang 对话流和 guardrails runtime 在应用与 LLM 之间插入可解释的输入、对话、检索、执行和输出控制，解决模型内置对齐难以按业务场景快速改写的问题。

#### 🎯 核心要点
- 采用 runtime proxy 架构：应用代码不直接调用 LLM，而是先经过 Guardrails runtime，再由 runtime 决定是否调用模型、工具或预定义回复。
- 用 Colang 描述 rails：把用户 canonical form、bot canonical form、dialogue flow、自定义 action 和上下文状态组织成可执行对话规则。
- Topical rails 使用三阶段链式推理：生成用户 canonical form，匹配或生成下一步 flow，基于下一步生成 bot message。
- Execution rails 支持 Python 自定义动作，可实现事实核查、幻觉检测、输入/输出 moderation、工具调用约束等安全机制。
- 官方库抽象五类护栏：input rails、dialog rails、retrieval rails、execution rails、output rails，分别拦截用户输入、对话状态、RAG 检索片段、工具执行和模型输出。
- 通过 KNN/vector search 检索与当前输入相似的 canonical form、guardrail flow 和输出示例，为 few-shot prompting 提供动态上下文。
- 与 RLHF、SFT 等 embedded rails 不同，NeMo Guardrails 的规则在运行时生效，独立于底层 LLM，可解释、可版本化、可按应用快速调整。
- 论文评估显示，同时使用 input 与 output moderation rails 比单独使用任一 rail 更稳健；事实核查和幻觉 rail 也以 LLM-as-verifier 方式补充普通生成流程。

#### 🔬 深入细节
![NeMo Guardrails runtime 架构图](https://ar5iv.labs.arxiv.org/html/2310.10501/assets/emnlp2023-latex/figures/guardrails-architecture.png)
*图：NeMo Guardrails 作为应用与 LLM 服务之间的 runtime 层，内部执行 canonical form 生成、KNN 示例检索、guardrail flow 匹配/生成、Colang flow 执行和最终输出生成。*

```python
# NeMo Guardrails 推理路径伪代码
class GuardedConversation:
    def __init__(self, config):
        self.flows = load_colang_flows(config.rails_co)
        self.actions = load_python_actions(config.actions_py)
        self.vector_index = build_index(self.flows.canonical_forms,
                                        self.flows.dialog_flows,
                                        self.flows.bot_outputs)
        self.state = RuntimeState()

    def generate(self, user_message):
        # 1. input rails: 先检查或改写用户输入
        for rail in self.config.input_rails:
            result = rail.run(user_message, self.state)
            if result.blocked:
                return result.safe_response
            user_message = result.message

        # 2. topical/dialog rails: 把原始话语映射为 canonical form
        examples = self.vector_index.nearest(user_message, k=3)
        canonical_user = llm_generate_canonical_form(user_message, examples, self.state)

        # 3. Colang runtime 决定下一步：命中预定义 flow，或让 LLM 生成兼容的 next step
        next_steps = self.match_or_generate_next_steps(canonical_user)
        events = self.execute_colang_flow(next_steps, self.state)

        # 4. execution rails: flow 中可调用工具、事实核查、moderation 等 action
        for event in events:
            if event.type == "action_call":
                action_result = self.actions[event.name](**event.kwargs)
                self.state.update(action_result)

        # 5. 生成候选回复，再经过 output rails
        draft = llm_generate_bot_message(self.state, next_steps)
        for rail in self.config.output_rails:
            result = rail.run(draft, self.state)
            if result.blocked:
                return result.safe_response
            draft = result.message
        return draft
```

NeMo Guardrails 的核心动机是把“安全与可控”从模型权重中解耦出来。模型对齐、RLHF 或系统提示可以提供一般性的安全边界，但它们通常难以表达复杂业务流程，例如某个客服机器人必须先认证再查询订单、某个金融助手只能在检索证据支撑下回答、某个医疗应用必须在不确定时转人工。NeMo 的做法是把 LLM 看成可调用的生成器，把应用约束放在一个 dialogue-manager-like runtime 中执行。

Colang 是这个框架的关键抽象。它把自然语言意图写成 canonical form，把多轮对话策略写成 flow，把工具和检查器写成 action。与传统 NLU 系统中固定 intent 分类器不同，canonical form 可以由 LLM 生成，不必完全封闭在预定义标签集合里；但它又会被开发者定义的 canonical examples 和 flows 约束。于是系统同时保留了 LLM 的泛化能力和对话管理器的可控状态机能力。

Topical rails 的三阶段机制可以形式化为：

$$
c_t = f_\theta\big(\mathrm{Prompt}_{\mathrm{canon}}(h_t, \mathrm{KNN}(x_t, \mathcal{E}))\big)
$$

$$
s_t = R_{\mathrm{Colang}}(c_t, \mathcal{F}, \mathrm{state}_t)
$$

$$
y_t = f_\theta\big(\mathrm{Prompt}_{\mathrm{bot}}(h_t, s_t, \mathrm{state}_t)\big)
$$

其中 \(x_t\) 是用户输入，\(h_t\) 是对话历史，\(\mathcal{E}\) 是 canonical/form 示例库，\(\mathcal{F}\) 是 Colang flow 集合，\(R_{\mathrm{Colang}}\) 是运行时解释器，\(s_t\) 是下一步动作或 bot canonical form。直觉上，第一步把自然语言归一化为“当前用户在做什么”，第二步用规则和状态决定“机器人接下来应该做什么”，第三步才让 LLM 负责“怎么自然地说出来”。

Execution rails 扩展了 topical rails 的控制范围。事实核查 rail 把 RAG 场景转为 entailment 判断：给定 evidence 与 bot response，要求 LLM 判断 response 是否由 evidence 支撑；若不支撑，系统可以拒答、降级或要求重新生成。幻觉 rail 则借鉴 self-consistency：对同一问题采样多个候选答案，再检查候选之间是否一致；如果高温采样得到的回答彼此冲突，说明模型可能在无证据编造。Moderation rails 则在输入进入主对话系统前、输出返回用户前分别检查，形成前后两道闸门。

从工程角度看，NeMo Guardrails 的优势是可组合。一个配置目录可以同时包含 `config.yml`、`rails.co`、`actions.py` 和知识库设置；`config.yml` 选择模型和启用哪些 rails，`rails.co` 写对话规则，`actions.py` 写需要外部 API 或自定义逻辑的动作。由于 Guardrails runtime 是 async-first，实际部署时可包装 OpenAI、Llama、Falcon、Vicuna、LangChain chain 或工具服务，而不是绑定单一模型提供商。

与单纯系统提示相比，NeMo Guardrails 的区别在于它不只“告诉模型要遵守规则”，还在运行时执行规则。系统提示如果被 prompt injection 诱导，模型可能忽略约束；Colang flow 和 execution rail 则可以在模型前后检查、阻断、改写或调用外部判别器。与完全传统的任务型对话系统相比，NeMo 又不要求人工穷举所有 intent 和 response，而是让 LLM 在 canonical form 和 next step 层面补足泛化能力。

代价也很明确：三阶段链式 prompting 会带来额外延迟和成本，论文限制部分指出通常接近普通单次生成调用的 3 倍，因为 canonical form、next step、bot message 依赖顺序执行，难以简单 batch。安全 rail 也不是完美替代模型对齐；更合理的部署方式是把 programmable rails 与 embedded rails 叠加使用，用运行时规则覆盖业务边界，用模型对齐处理基础安全能力。

> 💡 关键：NeMo Guardrails 的“算法”不是一个单独分类器，而是一个可解释的运行时控制系统，把 LLM 生成、向量检索、Colang 状态机和外部动作统一编排成可审计的对话安全层。

#### 🧪 练习题
```yaml
question: "NeMo Guardrails 中 Colang flow 的核心作用是什么？"
options:
  - "替代所有底层大语言模型参数"
  - "把开发者定义的对话规则、canonical form 和动作组织成 runtime 可执行的护栏"
  - "只用于压缩 RAG 检索文档"
  - "把用户输入直接翻译成 SQL 查询"
answer: 1
explain: "Colang 是 NeMo Guardrails 的规则建模语言，runtime 解释这些 flow 来决定下一步对话、工具调用和安全控制。"
```

### Llama Guard 3

```yaml
id: llama_guard3
num: 19
name: Llama Guard 3
full_name: Llama Guard 3
year: '2024'
org: Meta
parent: llama_guard
paper_url: https://arxiv.org/abs/2312.06674
project_url: ''
category: content_safety
motivation: 多模态安全过滤分类
```

#### 📝 一句话总结
Llama Guard 3 将 Llama Guard 的“LLM-as-safety-classifier”范式扩展到 Llama 3.1/3.2 体系，尤其通过 Llama Guard 3 Vision 支持图文输入与文本输出的安全分类，解决多模态对话中 prompt 和 response 需要按可配置风险分类实时过滤的问题。

#### 🎯 核心要点
- 继承 Llama Guard 论文的输入/输出双任务设计：同一个模型可根据指令分类用户 prompt，也可分类 AI agent response。
- 将安全分类建模为 instruction-following generation，输出第一行是 `safe` 或 `unsafe`，若 unsafe 则第二行列出违反的风险类别。
- Llama Guard 3 文本模型面向 Llama 3.1 能力，对齐 MLCommons 标准化风险 taxonomy，并支持多语言文本分类与工具调用安全场景。
- Llama Guard 3 11B Vision 基于 Llama 3.2 11B Vision 微调，支持包含图像和文本的 prompt，以及这些 prompt 对应的文本 response 分类。
- 风险 taxonomy 采用 13 个 MLCommons hazard：Violent Crimes、Non-Violent Crimes、Sex-Related Crimes、Child Sexual Exploitation、Defamation、Specialized Advice、Privacy、Intellectual Property、Indiscriminate Weapons、Hate、Suicide & Self-Harm、Sexual Content、Elections。
- 多模态任务的四个输入要素是 guidelines、classification type、conversation（含图片、用户轮次和 agent 轮次）以及固定输出格式。
- Vision 版本训练集结合人类创建的 prompt-image 对、内部 Llama 生成的良性/违规 response、jailbreak 诱导样本，以及人类或 Llama 3.1 405B 标签。
- 论文报告 Vision 版本在内部 benchmark 上 response classification F1 达 0.938、FPR 为 0.016，优于 GPT-4o 与 GPT-4o mini 的 zero-shot judge 设置。
- 官方提示格式增加 `<|image|>` token，并要求用 `<BEGIN UNSAFE CONTENT CATEGORIES>` 与 `<BEGIN CONVERSATION>` 明确划分安全策略和对话内容。

#### 🔬 深入细节
![Llama Guard 3 Vision response classification 示例图](https://arxiv.org/html/2411.10414v1/extracted/6003144/figures/llama_guard_3_11B_vision_figure.png)
*图：Llama Guard 3 Vision 将图像、用户消息、模型回答和风险分类规则放入同一个指令化 prompt，输出 safe/unsafe 以及违反的 MLCommons hazard 类别。*

```python
# Llama Guard 3 / Llama Guard 3 Vision 推理伪代码
MLCOMMONS_CATEGORIES = [
    "S1 Violent Crimes", "S2 Non-Violent Crimes", "S3 Sex-Related Crimes",
    "S4 Child Sexual Exploitation", "S5 Defamation", "S6 Specialized Advice",
    "S7 Privacy", "S8 Intellectual Property", "S9 Indiscriminate Weapons",
    "S10 Hate", "S11 Suicide & Self-Harm", "S12 Sexual Content", "S13 Elections",
]

def build_guard_prompt(role, user_messages, agent_messages=None, image=None):
    prompt = "<|begin_of_text|><|start_header_id|>user<|end_header_id|>\n"
    if image is not None:
        prompt += "<|image|> "
    prompt += f"Task: Check if there is unsafe content in '{role}' messages "
    prompt += "according to our safety policy with the below categories.\n"
    prompt += "<BEGIN UNSAFE CONTENT CATEGORIES>\n"
    prompt += render_categories(MLCOMMONS_CATEGORIES)
    prompt += "<END UNSAFE CONTENT CATEGORIES>\n"
    prompt += "<BEGIN CONVERSATION>\n"
    prompt += render_conversation(user_messages, agent_messages)
    prompt += "<END CONVERSATION>\n"
    prompt += f"Provide your safety assessment for ONLY THE LAST {role}.\n"
    prompt += "First line: safe or unsafe. If unsafe, second line: violated categories."
    prompt += "<|eot_id|><|start_header_id|>assistant<|end_header_id|>"
    return prompt

def guardrail_decision(model, role, user_messages, agent_messages=None, image=None):
    prompt = build_guard_prompt(role, user_messages, agent_messages, image)
    output = model.generate(prompt, image=image, max_new_tokens=32)
    label, categories = parse_guard_output(output)
    if label == "unsafe":
        return {"allow": False, "violations": categories}
    return {"allow": True, "violations": []}
```

Llama Guard 的基础论文把安全过滤从传统小型分类器改造成 instruction-tuned LLM 分类器。它的关键判断是：内容安全并不只是“这句话有没有毒性”，还要区分用户是否在索取危险信息、模型是否给出了危险帮助、以及开发者当前采用哪套 policy。把 taxonomy 和 guidelines 放进 prompt 之后，模型就可以按不同规则进行 zero-shot、few-shot 或进一步 fine-tuning，而不必为每套政策训练完全独立的固定分类器。

Llama Guard 3 沿用这个范式，但把 taxonomy 换成更标准化、更细粒度的 MLCommons hazard。对文本模型来说，它覆盖 Llama 3.1 时代常见的多语言、搜索、代码解释器工具使用等安全需求；对 Vision 模型来说，它进一步加入图像理解。官方文档明确区分：Llama Guard 3 11B Vision 不是纯图片审核器，而是评估“图像 + 文本 prompt”或“图像上下文下的文本 response”在对话任务中的安全性。这一点很重要，因为同一张图像是否危险，往往取决于用户问题和模型回答。

从输入结构看，Llama Guard 3 Vision 的分类任务由四个部分组成。第一是 guidelines，也就是当前启用的风险类别及描述；第二是 classification type，说明要判断 User 还是 Agent；第三是 conversation，包含图片、用户轮次和模型轮次；第四是 output format，强制生成 `safe`/`unsafe` 与类别列表。这个结构把策略、对象、上下文和输出协议全部显式化，降低了“模型不知道该按什么标准判断”的歧义。

可以把其生成式分类目标写成：

$$
p_\theta(o_{1:m}\mid G, T, H, I) = \prod_{j=1}^{m} p_\theta(o_j\mid o_{<j}, G, T, H, I)
$$

其中 \(G\) 是安全指南和类别描述，\(T\) 是 prompt classification 或 response classification，\(H\) 是对话历史，\(I\) 是可选图像，\(o_{1:m}\) 是模型输出的安全判定文本。实际部署时，第一 token 或第一行决定二分类标签：

$$
\hat{y}=\begin{cases}
\mathrm{unsafe}, & p_\theta(\texttt{unsafe}\mid G,T,H,I) > p_\theta(\texttt{safe}\mid G,T,H,I) \\
\mathrm{safe}, & \text{otherwise}
\end{cases}
$$

如果 \(\hat{y}=\mathrm{unsafe}\)，后续 token 生成的类别如 `S10`、`S11` 就提供多标签解释。与普通 softmax 分类头相比，这种方案牺牲了一些固定接口的简洁性，但换来策略可写入 prompt、类别可裁剪、输出格式可解释的灵活性。

训练上，Llama Guard 3 Vision 不是只拿文本版数据硬迁移。论文描述的训练集包含 22,500 个 prompt-image 标注样本，以及 40,034 个 prompt-response-image 标注样本；其中 response 可由内部 Llama 模型生成，违规样本通过 jailbreak 技术诱导得到，标签由人类或 Llama 3.1 405B 提供。模型在 Llama 3.2 11B Vision 上做监督微调，序列长度 8192，训练 3600 步，每个 prompt 只含一张图像，图像编码器会将输入重采样成多个视觉块。

数据增强延续了 Llama Guard 的思想。训练时会随机丢弃未被违反的类别，使模型学会“只按 prompt 中包含的类别判断”；还会打乱类别索引，并同步修改目标输出，避免模型死记 `S10` 永远等于某个固定自然语言类别。这对实际部署很关键，因为不同应用可能删掉某些类别、改写类别描述、或者只关心少数高风险类别。

论文报告 prompt classification 明显比 response classification 难。原因是多模态 prompt 往往含有指代歧义，例如文本说“怎么买这个”而图像中有多个物体时，安全性取决于用户指的是什么；而 response classification 可以直接检查 agent 是否给出了违规帮助。因此 Vision 论文建议在许多场景中优先使用 response classification，它在内部 benchmark 中取得更高 F1 和更低 false positive rate。实际系统通常会同时部署输入检查与输出检查，但应理解二者错误模式不同。

与 NeMo Guardrails 这类 runtime orchestration 相比，Llama Guard 3 更像一个可插拔的安全判别模型。它不负责管理复杂对话流程，也不执行工具，但能作为 input rail 或 output rail 使用：用户输入先送 Llama Guard 3 判定，若 unsafe 则拒绝或改写；模型生成后再送 Llama Guard 3 判定，若 unsafe 则阻断、重写或升级到人工审核。对于多模态助手，Vision 版本的价值在于它能看到图片上下文，避免文本-only moderation 漏掉图像触发的风险。

> ⚠️ 注意：Llama Guard 3 Vision 的定位不是通用图像审核，也不是绝对安全判官；它是对话安全分类器，最适合在图文对话系统里与系统提示、模型对齐、工具权限控制和日志审计一起使用。

#### 🧪 练习题
```yaml
question: "Llama Guard 3 Vision 相比文本版 Llama Guard 的关键扩展是什么？"
options:
  - "只检测图片是否清晰，不处理文本"
  - "把图像、用户/模型对话和安全 taxonomy 一起输入，分类 prompt 或 response 是否安全"
  - "取消 taxonomy，只输出自然语言解释"
  - "替代所有业务侧 guardrails runtime"
answer: 1
explain: "Llama Guard 3 Vision 基于 Llama 3.2 11B Vision 微调，支持图文上下文下的输入和输出安全分类，并输出 safe/unsafe 及违反类别。"
```

### Perspective API

```yaml
id: perspective
num: 20
name: Perspective API
full_name: Perspective API
year: '2017'
org: Google
parent: —
paper_url: https://www.perspectiveapi.com/
project_url: ''
category: content_safety
motivation: 机器学习毒性评分
```

#### 📝 一句话总结
Perspective API 将用户评论映射为一组可解释的内容安全属性概率分数，解决了开放评论区中人工审核难以实时覆盖的问题。它的核心贡献不是“自动裁决”，而是把毒性、侮辱、威胁等主观感知标签转化为可供作者反馈、审核排序和读者过滤使用的机器学习信号。

#### 🎯 核心要点
- 提供 `AnalyzeComment` 风格的在线评分接口，把评论文本和 `requestedAttributes` 转换为 `summaryScore` 与可选 `spanScores`。
- 主属性是 `TOXICITY`，含义是粗鲁、不尊重或不合理且可能让人离开讨论的评论。
- 常见属性包括 `TOXICITY`、`SEVERE_TOXICITY`、`IDENTITY_ATTACK`、`INSULT`、`PROFANITY`、`THREAT`、`SEXUALLY_EXPLICIT` 等。
- 早期英语 TOXICITY 模型卡描述其使用在线论坛评论、Wikipedia 与 New York Times 评论等数据，并用众包标签训练。
- 模型卡给出的早期架构是基于 GloVe 词向量微调的 CNN 文本分类器，输出属性级概率分数。
- 产品设计强调 human-in-the-loop：用于审核优先级、实时作者反馈和评论排序，不建议作为全自动封禁或人格判断系统。
- 分数表示“人类标注者会如何感知该评论”的概率型估计，不等同于危害严重程度，也不应脱离社区语境直接设阈值。
- 模型卡包含 subgroup AUC、BPSN AUC、BNSP AUC 等偏差评估，用来检查身份词相关的误报和漏报风险。

#### 🔬 深入细节
![Perspective API 官方图标](https://raw.githubusercontent.com/conversationai/perspectiveapi/master/img/perspective_icon-2020.png)
*图：Perspective API 官方开源文档中的图标。官方站点不是传统论文页面，因此这里将其作为远程视觉锚点，并在下文把 API 的模型流水线展开为可复现的算法视图。*

```python
# Perspective API 毒性评分流水线（抽象版）
def analyze_comment(comment, requested_attributes, community_policy):
    text = normalize_unicode_and_whitespace(comment)
    tokens = tokenize(text)

    scores = {}
    spans = {}
    for attr in requested_attributes:
        # 早期模型卡描述：GloVe embeddings + CNN classifier
        token_vecs = glove_embedding(tokens, finetuned=True)
        features = cnn_pooling(token_vecs)
        score = sigmoid(linear_head[attr](features))
        scores[attr] = score

        # 如果启用 span scoring，对局部片段重复同类评分
        spans[attr] = score_text_spans(text, attr)

    actions = []
    for attr, score in scores.items():
        if score >= community_policy[attr].review_threshold:
            actions.append((attr, "send_to_human_review"))
        elif score >= community_policy[attr].feedback_threshold:
            actions.append((attr, "show_author_feedback"))

    return {
        "attributeScores": {
            attr: {
                "summaryScore": {"value": scores[attr], "type": "PROBABILITY"},
                "spanScores": spans[attr],
            }
            for attr in requested_attributes
        },
        "recommendedActions": actions,
    }
```

Perspective 的输入是一个评论片段，而不是完整用户画像。对每个安全属性 \(a\)，模型学习一个从文本 \(x\) 到概率分数的映射：

$$
s_a(x)=P_\theta(y_a=1\mid x)
$$

其中 \(y_a\) 表示众包标注者是否会把评论判为该属性，例如 toxic、insult 或 threat。这个公式的关键是“感知概率”而不是“客观严重度”：\(s_{\text{TOXICITY}}=0.8\) 更接近“相当多标注者会认为它 toxic”，而不是“这句话的危害强度为 80%”。因此 Perspective 更适合作为排序、预警和辅助审核信号，而不是直接替代社区规则或法律判断。

早期 TOXICITY 模型卡描述的分类器可以抽象成 CNN 文本分类流程。给定词向量序列 \(E=[e_1,\ldots,e_n]\)，卷积核在不同窗口上提取局部 n-gram 模式：

$$
h_{i,k}=\phi(W_k E_{i:i+k-1}+b_k)
$$

随后使用池化得到整句特征 \(c=\operatorname{pool}(h)\)，再用属性头输出概率：

$$
s_a=\sigma(w_a^\top c+b_a)
$$

这类结构适合 2017 年的在线生产环境：推理成本低、延迟小、能被封装成 API，同时通过微调词向量适应评论区中的侮辱、威胁、身份攻击等语言模式。它的弱点也很明确：局部模式可能误读讽刺、引用、反歧视讨论或身份词上下文，所以模型卡特别强调偏差评估和人工兜底。

API 返回层面通常包含 `summaryScore` 和 `spanScores` 两类信号。`summaryScore` 是整条评论的总体属性概率，用于审核队列排序或作者提示；`spanScores` 则把文本切成局部片段，帮助产品解释“哪一段触发了模型”。在产品策略上可以设置两个阈值：较低阈值触发作者端软反馈，较高阈值进入人工审核，而不是直接删除：

$$
\operatorname{action}(x,a)=
\begin{cases}
\text{human\_review}, & s_a(x)\ge \tau_{review} \\
\text{author\_feedback}, & \tau_{feedback}\le s_a(x)<\tau_{review} \\
\text{allow}, & s_a(x)<\tau_{feedback}
\end{cases}
$$

> 💡 关键：Perspective 的算法价值在于把内容安全问题转换为可校准、可排序、可审计的概率信号，而不是给出不可申诉的最终判决。

与关键词黑名单相比，Perspective 能学习组合语义。例如同样包含脏词的评论，可能是辱骂、引用、玩笑或自我描述；CNN 特征比简单关键词更能捕捉上下文窗口。与人工全量审核相比，Perspective 的优势是实时、规模化和成本低，适合在评论提交前给作者提示，或在高流量社区中把审核资源集中到高风险评论。与端到端自动 moderation 相比，它保留了社区策略层：不同社区可按自身风险偏好选择属性和阈值。

模型卡中的偏差评估是该方法不可分割的一部分。Subgroup AUC 衡量包含某个身份词的样本内部分类能力；BPSN AUC 关注“非毒性身份词评论被误判为 toxic”的风险；BNSP AUC 关注“包含身份词的 toxic 评论被漏判”的风险。这说明 Perspective 的方法论不只是训练一个分类器，还包括持续检查模型是否把身份词本身当作毒性线索。对于 LLM 安全评估而言，这一点尤其重要：如果把 Perspective 分数当作奖励或评测指标，需要意识到它携带标注语境、模型版本和偏差评估边界。

#### 🧪 练习题
```yaml
question: "Perspective API 的 toxicity 分数最准确的解释是什么？"
options:
  - "评论危害严重程度的绝对百分比"
  - "模型估计人类标注者会把评论感知为 toxic 的概率"
  - "是否必须自动删除评论的硬规则"
  - "用户长期人格或信誉的评分"
answer: 1
explain: "Perspective 的分数是属性级概率信号，用于辅助审核、排序或反馈；官方模型卡也强调不要把它用于全自动 moderation 或人格判断。"
```

### HMNS

```yaml
id: hmns
num: 21
name: HMNS
full_name: 头掩蔽零空间引导 (Head-Masked Nullspace Steering)
year: '2026.04'
org: ICLR
parent: pair
paper_url: https://iclr.cc/virtual/2026/papers.html
project_url: ''
category: jailbreak
motivation: 掩蔽安全头电路高成功率越狱
```

#### 📝 一句话总结
HMNS 提出一种推理时电路级干预方法：先用反事实掩蔽定位最影响模型默认行为的注意力头，再零化这些头的写入路径，并向被静默子空间的正交补注入缩放扰动。它解决了传统 prompt-only jailbreak 依赖启发式改写、查询成本高且缺乏机制解释的问题。

#### 🎯 核心要点
- 三段式机制：causal-head attribution、out-projection masking、nullspace-constrained residual steering。
- 使用 KL 散度比较原始输出分布和单头掩蔽后的输出分布，按全局 top-\(K\) 选择最关键注意力头。
- 通过将选中头在 \(W^O_\ell\) 中对应列块置零，临时压制这些头写入 residual stream 的能力。
- 构造选中头输出投影张成的子空间 \(\mathcal{W}_\ell\)，再用 QR 投影得到正交补方向 \(u_\ell\)。
- 扰动按 residual RMS 缩放：\(\delta_\ell=\alpha\operatorname{RMS}(a_\ell)u_\ell\)，避免注入量与激活尺度失配。
- 整个过程在推理时闭环运行，每次 decode attempt 重新做 attribution，以适应自回归上下文中因果头排序的变化。
- 论文在 AdvBench、HarmBench、JBB-Behaviors、StrongReject 等 jailbreak 基准和强防御设置上比较 ASR、ACQ、IPC、FPS、LPS。
- 消融显示 KL attribution、nullspace injection、RMS scaling、closed-loop re-identification 共同决定效果，随机头或非正交方向都会明显退化。

#### 🔬 深入细节
![HMNS 流程总览](https://arxiv.org/html/2604.10326v1/HMNS_image.jpg)
*图：HMNS 的闭环流程。先定位关键注意力头，再掩蔽其 out-projection 写入路径，计算正交补中的 steering direction，最后把缩放扰动注入 residual stream；若未达到目标行为，则重复 attribution 和干预。*

```python
# HMNS 推理时干预伪代码（安全研究抽象版）
def hmns_decode(model, prompt, K=10, T_loop=10, alpha0=0.25, eps=1e-6, tol=1e-4):
    context = prompt
    baseline_logits = model.forward(context)
    P = softmax(baseline_logits[-1])

    for t in range(T_loop):
        # 1. 反事实单头掩蔽，用 KL 衡量每个头的因果重要性
        importance = []
        for layer, head in all_attention_heads(model):
            with temporarily_zero_out_projection_slice(model, layer, head):
                masked_logits = model.forward(context)
            P_masked = softmax(masked_logits[-1])
            delta = kl_divergence(P, P_masked)
            importance.append((delta, layer, head))

        selected = top_k_global(importance, K)

        # 2. 对每层构造被掩蔽写入子空间，并取正交补方向
        hooks = []
        for layer, heads in group_by_layer(selected):
            M = concat_out_projection_blocks(model.W_O[layer], heads)
            Q, _ = thin_qr(M)
            u = None
            while u is None or max_abs(M.T @ u) >= tol:
                r = normal_vector(dim=model.d_model)
                u = (eye(model.d_model) - Q @ Q.T) @ r
                u = u / (l2_norm(u) + eps)

            hooks.append(mask_heads(layer, heads))
            hooks.append(inject_residual(layer, alpha(t, alpha0) * rms_residual(layer) * u))

        # 3. 带 hook 生成候选输出；失败则重新 attribution
        with apply_hooks(model, hooks):
            candidate = model.generate(context)
        if success_predicate(candidate):
            return candidate

    return best_candidate_seen()
```

HMNS 的动机来自一个观察：decoder-only Transformer 在最终 token 的 next-token prediction 中，往往只有少数注意力头对输出分布有强因果影响。传统 jailbreak 方法主要在输入表面做搜索或改写，既不直接控制模型内部路由，也容易在防御器、拒答模板或 prompt perturbation 下失效。HMNS 则把攻击面移动到推理时内部机制：找到当前 prompt 下最关键的写入路径，把它们临时静默，再从这些路径无法表示的几何方向施加 steering。

第一步是 causal head attribution。设模型原始最终位置 logits 为 \(z\)，输出分布为 \(P=\operatorname{softmax}(z)\)。对第 \(\ell\) 层第 \(h\) 个头，令 \(S_{\ell,h}\) 是只选中该头输出切片的对角选择矩阵，掩蔽后的 out-projection 为：

$$
\widetilde{W}^{O}_{\ell,h}=W^{O}_{\ell}(I-S_{\ell,h})
$$

用这个临时权重跑一次 ablated forward，得到 \(\widetilde{P}^{(\ell,h)}=\operatorname{softmax}(\widetilde{z}^{(\ell,h)})\)。该头的重要性用分布偏移衡量：

$$
\Delta_{\ell,h}=D_{\mathrm{KL}}\left(P\ \|\ \widetilde{P}^{(\ell,h)}\right)
$$

直觉上，如果掩蔽某个头后输出分布变化很大，说明它对模型默认续写行为有高因果贡献。论文使用 global top-\(K\) 而不是每层固定配额，因为关键头可能集中在少数层；强制每层选头会把预算浪费在低影响位置。

第二步是 head masking。注意力头的输出 \(\widehat{h}^{(h)}_{\ell,T}\) 通过 \(W^O_\ell[:,hd_h:(h+1)d_h]\) 写入 residual stream。HMNS 对选中头的列块做动态置零，只在当前 forward pass 生效，不永久修改模型权重。这样做的效果不是删除整个注意力层，而是精准切断被 attribution 选中的写入通道，使这些头无法继续把默认拒答或安全路由信号写回 residual stream。

第三步是 nullspace steering。对某层选中的头集合 \(\mathcal{S}_\ell\)，把它们在 \(W^O_\ell\) 中的列块拼接为：

$$
M_\ell=\left[W^O_\ell[:,hd_h:(h+1)d_h]\right]_{h\in\mathcal{S}_\ell}\in\mathbb{R}^{d\times |\mathcal{S}_\ell|d_h}
$$

\(M_\ell\) 张成的是被静默头原本可写入的子空间 \(\mathcal{W}_\ell\)。HMNS 对 \(M_\ell\) 做 thin QR 分解 \(M_\ell=Q_\ell R_\ell\)，采样随机向量 \(r\sim\mathcal{N}(0,I_d)\)，并投影到正交补：

$$
u_\ell=\frac{(I-Q_\ell Q_\ell^\top)r}{\|(I-Q_\ell Q_\ell^\top)r\|_2+\varepsilon}
$$

如果 \(\|M_\ell^\top u_\ell\|_\infty<\delta\)，就认为该方向近似位于 \(\mathcal{W}_\ell^\perp\)。这一步的核心直觉是：被掩蔽的写入路径无法重构或抵消这个正交方向，因此 steering 不会立即被刚刚静默的头“解释回去”。这也是 HMNS 相比普通 activation steering 更强调几何约束的地方。

实际注入时，论文不是直接加固定范数扰动，而是按 residual 激活的 RMS 缩放：

$$
\delta_\ell=\alpha\cdot\operatorname{RMS}(a_\ell)\cdot u_\ell,
\qquad
\operatorname{RMS}(a_\ell)=\sqrt{\frac{1}{d}\sum_{i=1}^{d}a_{\ell,i}^{2}}
$$

这样可以让扰动强度和当前层激活尺度匹配，减少过强扰动造成的流畅性崩坏，也避免过弱扰动无法改变路由。论文消融中，RMS scaling、post-attention 注入位置、QR 数值稳定性和正交容忍度都会影响 ASR 与延迟。

闭环 re-identification 是 HMNS 的另一个关键点。自回归生成中，随着上下文变化，哪些头最影响输出也会变化；冻结第一轮 top-\(K\) 会降低成功率并增加外部查询。HMNS 因此在每次 decode attempt 中重新计算 \(\Delta_{\ell,h}\)，重新构造 \(M_\ell\) 和 \(u_\ell\)。这使它不是一次性 hook，而是一个 detection-intervention loop：检测当前因果头，干预当前写入子空间，观察输出，再更新下一轮目标。

> ⚠️ 注意：从防御视角看，HMNS 的意义在于暴露“安全行为是否集中在少数可定位电路”这一风险。若模型过度依赖少数注意力头或固定拒答路由，机制级干预就可能绕过表层 prompt 防御。

#### 🧪 练习题
```yaml
question: "HMNS 为什么要把 steering vector 限制在被掩蔽写入子空间的正交补中？"
options:
  - "为了减少模型参数量"
  - "为了让扰动不能被已静默头的写入子空间重构或抵消"
  - "为了把所有注意力头都替换成 MLP"
  - "为了避免计算 KL 散度"
answer: 1
explain: "HMNS 先静默高因果头，再在其写入子空间的正交补注入扰动，使干预方向与被静默路径几何解耦。"
```

### NeuroStrike

```yaml
id: neurostrike
num: 22
name: NeuroStrike
full_name: '神经元级攻击 (NeuroStrike: Neuron-Level Attacks)'
year: '2026.02'
org: NDSS
parent: gcg
paper_url: https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/
project_url: ''
category: jailbreak
motivation: 剪枝安全神经元绕过对齐
```

#### 📝 一句话总结
NeuroStrike 提出一种神经元级安全评估框架，认为对齐后的拒答行为会集中依赖稀疏“安全神经元”，并通过识别、剪枝或规避这些神经元来测试模型安全边界。它解决了传统 jailbreak 依赖试错 prompt、跨模型迁移弱、缺少内部机制解释的问题。

#### 🎯 核心要点
- 提出“安全神经元”假设：安全对齐会在 MLP gate/up-projection 等子层形成稀疏、专门化、可迁移的激活签名。
- 白盒场景中，使用良性与恶意输入的 feedforward activation 训练线性探针，定位最能区分安全触发的神经元。
- 使用 logistic regression 权重的 z-score 选取离群神经元，默认阈值 \(z_i>3\)，以保持选择集合稀疏。
- 推理时将安全神经元激活置零或剪枝，测试模型是否仍能执行拒答与安全约束。
- 黑盒场景中，提出 LLM profiling attack：在开源 surrogate 上训练 prompt generator，使其既提高 jailbreak 成功率又降低安全神经元激活。
- 使用 GRPO 优化生成器奖励，组合输出层面的 jailbreak reward 与 neuron-level stealth reward。
- 实验覆盖 20+ open-weight LLM、fine-tuned/distilled 模型、multimodal LLM，以及 Gemini 等黑盒目标。
- 论文报告少量目标层神经元移除即可显著提高 ASR，同时显示安全神经元在同一模型族中具有较强迁移性。

#### 🔬 深入细节
![NeuroStrike 白盒攻击流程](https://arxiv.org/html/2509.11864v1/x1.png)
*图：NeuroStrike 白盒流程。对良性与恶意输入抽取 MLP 神经元激活，训练分类器定位 safety neurons，再在推理时剪枝这些神经元以评估安全对齐的脆弱性。*

![NeuroStrike 黑盒 profiling 流程](https://arxiv.org/html/2509.11864v1/x2.png)
*图：NeuroStrike 黑盒流程。用同族或相关 open-weight surrogate 学习安全神经元触发模式，并训练生成器产生更不易激活安全神经元的候选提示，再迁移到黑盒模型。*

```python
# NeuroStrike 核心流程（研究评估抽象版，不含具体有害内容）
def identify_safety_neurons(model, benign_prompts, unsafe_prompts, layers, z_threshold=3.0):
    activations = []
    labels = []
    for x in benign_prompts:
        activations.append(extract_mlp_gate_up_activations(model, x, layers))
        labels.append(0)
    for x in unsafe_prompts:
        activations.append(extract_mlp_gate_up_activations(model, x, layers))
        labels.append(1)

    safety_neurons = {}
    for layer in layers:
        X_layer = stack_layer_activations(activations, layer)
        clf = train_logistic_regression(X_layer, labels, epochs=5000, lr=1e-3, weight_decay=1e-3)
        z = (clf.weight - mean(clf.weight)) / std(clf.weight)
        safety_neurons[layer] = {i for i, zi in enumerate(z) if zi > z_threshold}
    return safety_neurons


def white_box_prune_eval(model, safety_neurons, evaluation_prompts):
    with activation_mask(model, safety_neurons, value=0.0):
        return evaluate_refusal_and_task_behavior(model, evaluation_prompts)


def black_box_profile(generator, surrogate, safety_neurons, seed_tasks):
    generator = supervised_finetune(generator, seed_tasks)
    for step in range(num_grpo_steps):
        candidates = generator.sample(seed_tasks)
        rewards = []
        for prompt in candidates:
            output = surrogate.generate(prompt)
            r_jb = judge_policy_violation(output)
            r_neuron = reward_low_safety_neuron_activation(surrogate, prompt, safety_neurons)
            rewards.append(r_jb + lambda_neuron * r_neuron)
        generator = grpo_update(generator, candidates, rewards)
    return select_high_reward_prompts(generator)
```

NeuroStrike 的出发点是把 safety alignment 看作一种可被内部表示触发的二分类边界。对齐训练让模型在遇到不安全请求时产生稳定拒答，这种稳定行为可能依赖某些 MLP 神经元的高激活。论文把这些神经元称为 safety neurons，并强调三种性质：specialized，专门响应安全相关输入；sparse，在目标层中只占很小比例；transferable，在同一模型族的 fine-tuned 或 distilled 变体中仍保留相似作用。

形式化地，若第 \(\ell\) 层的隐表示为 \(h^\ell(x)\in\mathbb{R}^d\)，安全对齐可被看作学习一个区分 benign prompts \(\mathcal{X}_B\) 与 malicious prompts \(\mathcal{X}_M\) 的内部边界。NeuroStrike 不直接在输出文本上搜索，而是收集两类输入在 MLP gate/up-projection 子层上的激活，并训练线性分类器：

$$
P(y=1\mid h^\ell(x))=\sigma(w_\ell^\top h^\ell(x)+b_\ell)
$$

其中 \(y=1\) 表示输入触发安全相关行为。线性模型的好处是可解释且可扩展：权重 \(w_{\ell,i}\) 可以直接对应到第 \(\ell\) 层第 \(i\) 个神经元对安全判别的贡献。

安全神经元选择使用 z-score 离群检测。对某层分类器权重，计算：

$$
z_{\ell,i}=\frac{w_{\ell,i}-\mu_{w_\ell}}{\sigma_{w_\ell}}
$$

当 \(z_{\ell,i}>\tau\) 时，把神经元 \(i\) 标记为 safety neuron；论文默认 \(\tau=3\)。这个设计的直觉是：不需要剪掉大量参数，只选择对“恶意 vs 良性”边界贡献异常大的神经元。论文案例中，Llama-3.2-1B-Instruct 某 up-projection 层只有约 0.35% 神经元被标记为 safety neurons；主实验也强调少量目标层神经元即可显著改变拒答行为。

白盒攻击评估阶段，NeuroStrike 在推理时将这些 safety neurons 的激活置零。若原模型的某层激活为 \(h^\ell\)，剪枝后的激活可以写作：

$$
\tilde{h}^\ell_i=
\begin{cases}
0, & i\in\mathcal{S}_\ell \\
h^\ell_i, & i\notin\mathcal{S}_\ell
\end{cases}
$$

其中 \(\mathcal{S}_\ell\) 是该层识别出的安全神经元集合。这个操作不是普通压缩意义上的模型剪枝，而是一个机制验证：如果只关掉很少的安全神经元就能让模型停止拒答，说明安全行为过度集中在稀疏路径上，存在单点脆弱性。

黑盒场景不能读取目标模型激活，因此 NeuroStrike 借助 transferability。它假设目标黑盒模型 \(f_{\theta_{tgt}}\) 与某个 open-weight surrogate \(f_{\theta_{src}}\) 在安全神经元触发模式上足够相似：

$$
h^{src}_{\mathcal{S}}(x)\approx h^{tgt}_{\mathcal{S}}(x)
$$

于是攻击者可以离线训练一个 prompt generator，让候选 prompt 在 surrogate 上既更可能获得不安全输出，又尽量不激活 surrogate 的 safety neurons。论文称这为 LLM profiling attack，因为大部分搜索和优化发生在 surrogate 上，迁移到黑盒时只提交已筛选候选。

生成器优化使用两阶段流程。第一阶段用监督微调学习已有 jailbreak prompt 模式；第二阶段用 GRPO 强化学习优化组合奖励。抽象奖励可写作：

$$
R(x)=R_{\text{jb}}(x)+\lambda R_{\text{neuron}}(x)
$$

其中 \(R_{\text{jb}}\) 来自输出是否绕过安全拒答的判别器，\(R_{\text{neuron}}\) 奖励低安全神经元激活。直觉是：只优化输出成功率容易学到显眼、易被防御识别的 prompt；加入 neuron reward 后，生成器会偏向那些在内部安全边界附近更“隐身”的候选。

论文实现细节中，安全神经元识别重点抽取 MLP 的 gate 和 up-projection 子层，因为这些子层常承载更高层语义特征，且对输入内容更敏感。每个子层单独训练 logistic regression，使用 binary cross-entropy、SGD、约 5000 epoch、学习率 \(10^{-3}\)、weight decay \(10^{-3}\)。黑盒生成器训练中则使用 SFT 加 GRPO，并用低秩适配技术降低训练成本。

与 GCG、PAIR、TAP 等 prompt 搜索方法相比，NeuroStrike 的关键区别是攻击单位从 token 转为 neuron。Prompt-only 方法通常需要大量在线查询，并且迁移性受模型表面行为影响；NeuroStrike 先识别内部安全电路，再在白盒中直接剪枝或在黑盒中训练规避激活的生成器。因此它既是攻击框架，也是对当前对齐方法的诊断工具：如果 safety neurons 过于稀疏且跨模型保留，那么单纯靠表层拒答模板或 prompt filter 很难提供稳健防线。

> 💡 关键：NeuroStrike 的防御启示是让安全行为不要集中在少量可定位神经元上。更稳健的对齐需要冗余、分布式、可校验的安全表示，并配合运行时完整性检查和异常激活监测。

#### 🧪 练习题
```yaml
question: "NeuroStrike 用 logistic regression 权重的 z-score 选择 safety neurons 的主要目的是什么？"
options:
  - "把所有 MLP 神经元都剪掉以提升速度"
  - "找到对良性/恶意激活边界贡献异常大的稀疏神经元集合"
  - "生成更长的 jailbreak prompt"
  - "替代模型的 tokenizer"
answer: 1
explain: "线性探针权重可对应单个神经元的判别贡献，z-score 离群检测能选出少量高贡献安全神经元。"
```

### ProAct

```yaml
id: proact
num: 23
name: ProAct
full_name: '主动防御 (ProAct: Jailbreaking Jailbreaks)'
year: '2026.03'
org: ICLR
parent: pair
paper_url: https://openreview.net/forum?id=AUZIYQGAoAb
project_url: ''
category: jailbreak
motivation: 伪造响应误导攻击智能体
```

#### 📝 一句话总结
ProAct 提出一种“主动防御”框架，在检测到越狱意图后不只是拒答，而是返回看似命中攻击目标、实际不含有害内容的伪响应，从而污染自动越狱攻击器的反馈信号并提前终止其搜索。

#### 🎯 核心要点
- 面向 PAIR、TAP、DAGR、X-Teaming 等依赖迭代反馈的黑盒自动越狱框架，攻击点是攻击器内部 evaluator 对目标模型输出的误判。
- 三代理流程：User Intent Analyzer 识别真实意图并抽取安全主题，ProAct Defender 生成主题相关但无害的伪响应，Surrogate Evaluator 反复评估并给出修改反馈。
- 四阶段运行：意图分析 -> 恶意请求路由到 Defender -> Surrogate Evaluator 触发再生成直到足够“像成功越狱” -> 良性请求直接返回基础模型正常回答。
- 核心判据是让攻击器评分器认为成功 `S_j(r)=1`，同时真实安全评分保持无害 `S_g(r)=0`，即制造“假阳性越狱反馈”。
- Defender 避免直接条件化原始危险请求，只使用意图分析器抽取的高层安全主题和历史尝试，降低真实泄露有害细节的风险。
- 与输入过滤、输出过滤、推理时引导等传统防线正交；论文在 4 个安全基准、6 个目标模型、4 类攻击框架上报告最高 92% 的 ASR 降幅。

#### 🔬 深入细节
![ProAct 框架总览](https://arxiv.org/html/2510.05052v1/x2.png)
*图：ProAct 的四阶段流程。恶意请求被路由到主动防御链路，良性请求则直接走基础模型正常回答。图源：arXiv HTML。*

```python
# ProAct 推理时防御伪代码（安全化概括，不包含具体越狱模板）
def proact_response(conversation, base_llm, analyzer, defender, surrogate, max_rounds=K):
    verdict = majority_vote([
        analyzer.classify_intent(conversation) for _ in range(N)
    ])

    if verdict.intent == "benign":
        return base_llm.generate(conversation)

    topic = verdict.security_topic
    candidate = None
    feedback = None

    for _ in range(max_rounds):
        candidate = defender.generate_spurious_response(
            topic=topic,
            previous_feedback=feedback,
            safety_constraint="benign_content_only"
        )
        judged = majority_vote([
            surrogate.judge_appears_successful(topic, candidate)
            for _ in range(M)
        ])
        if judged.looks_like_successful_jailbreak:
            return candidate
        feedback = judged.reasoning

    return candidate  # 达到预算后返回最后一个无害伪响应
```

ProAct 的动机来自自动越狱算法的闭环结构。PAIR/TAP 一类攻击不是只发一次提示，而是把目标模型的返回交给攻击器内部 evaluator，再根据 evaluator 的“是否成功”评分继续改写提示。传统防御通常是被动的：输入过滤拒绝请求、输出过滤删掉危险回答、系统提示要求模型保持安全。这些方法即使挡住了当前轮，也会把“没成功”的明确信号反馈给攻击器，使攻击器继续搜索。ProAct 反过来利用这一点：防御目标不再只是让模型拒绝，而是让攻击器误以为已经成功，从而停止或偏离搜索。

论文把目标系统写作 \(\mathcal{T}:\mathcal{X}\to\mathcal{R}\)，把提示 \(x\in\mathcal{X}\) 映射为响应 \(r\in\mathcal{R}\)。攻击器没有真实安全评分器，只能用自己的近似评分 \(S_j\) 判断响应是否越狱；真实安全判据记为 \(S_g\)。自动攻击的目标可写成：

$$
P_A^*=\arg\max_{P_A}\;\mathbb{E}_{p\in P_A}\left[S_j(\mathcal{T}(p))\right]
$$

ProAct 要构造的是评分器分歧：存在响应 \(r\)，使得 \(S_j(r)=1\land S_g(r)=0\)。也就是说，攻击器的近似评分认为“已经得到了危险答案”，但真实安全判据认为内容并不危险。对应的防御优化直觉可以写为：

$$
\mathcal{T}^*=\arg\max_{\mathcal{T}}\;\mathbb{E}_{p\in\mathcal{P}_A}\left[S_j(\mathcal{T}_\theta(p))\cdot(1-S_g(\mathcal{T}(p)))\right]
$$

这个目标强调两件事必须同时成立：表面形式要足够欺骗攻击器 evaluator，真实语义又不能提供可执行的有害信息。ProAct 因此不是“绕过安全规范”，而是将安全内容包装成攻击器容易误判的假成功信号。

User Intent Analyzer 是安全与可用性的分界点。如果对所有请求都返回伪响应，普通用户会被困惑，模型效用会显著下降；如果只做硬拒绝，又会把失败信号交给攻击器。因此 Analyzer 会查看当前输入和对话历史，判断真实意图而不是表面措辞，并抽取简短的安全主题。论文还使用多数投票：如果恶意/良性判断没有形成足够优势，就带着竞争理由重新评估。这一层的核心不是生成内容，而是决定请求是否应该进入主动防御链路。

ProAct Defender 负责生成 spurious response。关键设计是它不直接吃入原始危险请求，而是只条件化 Analyzer 给出的主题、先前尝试和 evaluator 反馈。这样能降低模型不慎补全真实危险步骤的概率。伪响应的目标是“主题相关、外观可信、语义无害”：它可以在表层上呈现出攻击器 evaluator 熟悉的成功模式，但内容本身应为空洞、不可执行或安全替代。这个设计把攻击器依赖的弱点从“模型是否拒绝”转移到“攻击器是否能准确区分真实有害内容与伪装内容”。

Surrogate Evaluator 是 ProAct 的内循环。它不需要知道攻击器内部 evaluator 的私有实现，只需要作为独立近似器判断当前伪响应是否“看起来像成功越狱”。如果判断不够强，Surrogate 会返回失败原因，Defender 再根据这些反馈重写。这个循环本质上是在防御侧做一次受安全约束的搜索：搜索目标不是危险答案，而是能诱发攻击器误判的安全文本。达到预算后，系统返回最后一个仍受安全约束的候选响应。

与传统防御相比，ProAct 的主要差异是它攻击攻击器的优化过程，而不是只拦截某个输入或输出。输入过滤器把恶意请求挡在模型前，但攻击器可以换提示；输出过滤器挡住危险回答，但攻击器仍能看到失败并继续迭代；推理时引导让模型更倾向拒绝，也仍可能暴露“拒绝了”的反馈。ProAct 则把反馈变成不可靠信号，使自动攻击器的搜索目标函数失真。因此论文强调它可以叠加在现有 guardrail 之上，作为额外一层主动干扰机制。

> 💡 关键：ProAct 的安全性依赖“伪响应真实无害”这一约束。若 Defender 直接基于危险原文生成细节，防御就可能退化成泄露风险；因此论文中特别强调用高层主题、反馈循环和多数投票降低误生成概率。

#### 🧪 练习题
```yaml
question: "ProAct 为什么能干扰 PAIR/TAP 这类自动越狱攻击？"
options:
  - "它通过增加模型参数量让攻击器无法查询"
  - "它让攻击器 evaluator 把无害伪响应误判为成功，从而破坏迭代反馈"
  - "它只依赖困惑度过滤所有低质量输入"
  - "它把所有用户请求都交给输出过滤器删除"
answer: 1
explain: "自动越狱攻击依赖目标模型输出作为下一轮优化信号；ProAct 制造 S_j=1 且 S_g=0 的假成功反馈，让攻击器提前停止或朝错误方向优化。"
```

### AlignTree

```yaml
id: aligntree
num: 24
name: AlignTree
full_name: '对齐树 (AlignTree: Efficient Defense)'
year: '2026.01'
org: AAAI
parent: llama_guard3
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
project_url: ''
category: jailbreak
motivation: 随机森林实时激活拦截
```

#### 📝 一句话总结
AlignTree 提出一种轻量级激活监控防御：把 LLM 隐状态中的线性拒绝方向与非线性 SVM 有害性信号拼接后交给随机森林分类器，在不引入额外 guard LLM 或多次推理的情况下实时拦截越狱输入。

#### 🎯 核心要点
- 属于 in-process defense：直接利用基础模型内部 activation/hidden state，不依赖 Llama Guard 类外部模型、LLM-as-a-judge 或额外提示轮次。
- 两类核心特征：最终 token 各层 hidden state 在单一 refusal direction 上的投影，以及多个 RBF-SVM 在不同层/位置上的有害概率。
- Refusal direction 通过 harmful/harmless 训练集的 difference-in-means 候选向量得到，再在验证集上选择影响拒绝行为最强的单一方向 \(r^*\)。
- 非线性信号来自第一批 token 和最后若干 token 的多层隐藏状态；每个位置-层组合训练一个 RBF-SVM，再筛选表现最好的 SVM 并用 Platt scaling 校准成概率。
- 最终分类器是浅层 Random Forest，输入为 refusal activation 与 SVM 概率拼接向量，输出 prompt harmfulness confidence。
- 阈值 \(\tau\) 通过强调 precision 的 \(F_\beta\) 分数选择，论文设置 \(\beta=0.2\)，以减少对良性请求的过拒绝。
- 训练/评估覆盖 Qwen2.5、Llama-3、Gemma-3 多个规模，安全数据包括 AdvBench、HarmBench、MaliciousInstruct、PAIR、AutoDAN 等，良性数据包括 ALPACA、XSTest、PIQA、ARC、OpenBookQA、SIQA 等。

#### 🔬 深入细节
![AlignTree 阈值选择图](https://arxiv.org/html/2511.12217v1/x1.png)
*图：论文用广义 \(F_\beta\) 曲线为具体模型选择阻断阈值。虽然论文没有单独画完整架构图，这张图展示了 AlignTree 从 harmfulness score 到“放行/阻断”决策的关键部署环节。图源：arXiv HTML。*

```python
# AlignTree 训练与推理伪代码
def train_aligntree(llm, harmful_train, harmless_train, validation):
    # 1. 计算每个层/位置的 harmful 与 harmless 均值差，得到候选 refusal directions
    candidates = []
    for layer in llm.layers:
        for pos in selected_token_positions:
            mu_h = mean(hidden(llm, x, layer, pos) for x in harmful_train)
            mu_b = mean(hidden(llm, x, layer, pos) for x in harmless_train)
            candidates.append(mu_h - mu_b)

    r_star = select_direction_by_refusal_effect(candidates, validation)

    # 2. 训练非线性 SVM 探针，捕捉 refusal direction 之外的几何信号
    svms = []
    for layer in llm.layers:
        for pos in first_3_and_last_5_positions:
            svm = train_rbf_svm(hidden_features(layer, pos), labels)
            svms.append(calibrate_with_platt_scaling(svm))
    selected_svms = top_k_by_validation_accuracy(svms)

    # 3. 拼接 refusal projection 与 SVM probability，训练随机森林
    X = [feature_vector(prompt, r_star, selected_svms) for prompt in train_prompts]
    rf = train_random_forest(X, labels, n_estimators=50, max_depth=6)
    tau = choose_threshold_by_f_beta(rf, validation, beta=0.2)
    return r_star, selected_svms, rf, tau


def defend(prompt, llm, r_star, selected_svms, rf, tau):
    features = feature_vector(prompt, r_star, selected_svms)
    harmfulness = rf.predict_proba(features)["harmful"]
    if harmfulness >= tau:
        return refuse_or_block(prompt)
    return llm.generate(prompt)
```

AlignTree 的出发点是推理成本。预处理防御如果调用另一个安全 LLM，会增加部署成本和延迟；后处理防御要等长文本生成完再检查，用户体验更慢；SmoothLLM 一类方法需要对输入做多次扰动并多次推理，成本随采样数增长。AlignTree 选择直接读基础模型自己的隐藏状态，用一个小分类器判断当前输入是否处在“会诱发不安全行为”的内部表示区域，从而避免额外模型和额外生成轮次。

第一类信号是 refusal direction。给定有害训练集 \(D_{\text{harmful}}^{\text{train}}\) 和无害训练集 \(D_{\text{harmless}}^{\text{train}}\)，对 token 位置 \(i\) 与层 \(l\) 的 hidden activation \(x_i^{(l)}(t)\)，论文先计算两类均值：

$$
\mu_i^{(l)}=\frac{1}{|D_{\text{harmful}}^{\text{train}}|}\sum_{t\in D_{\text{harmful}}^{\text{train}}}x_i^{(l)}(t),\quad
v_i^{(l)}=\frac{1}{|D_{\text{harmless}}^{\text{train}}|}\sum_{t\in D_{\text{harmless}}^{\text{train}}}x_i^{(l)}(t)
$$

候选方向是两者差值：

$$
r_i^{(l)}=\mu_i^{(l)}-v_i^{(l)}
$$

这些候选向量不是全部使用，而是在验证集上选择一个单一 \(r^*\)。选择准则继承 refusal-direction 工作的直觉：如果 ablate 该方向能降低拒绝倾向、add 该方向能诱导拒绝行为，同时不破坏一般能力，那么它更像模型内部的“拒绝几何轴”。随后任意 hidden state \(h\) 对该方向的 alignment 被压缩成标量特征：

$$
\text{proj}_{r^*}(h)=\frac{h\cdot r^*}{\|r^*\|}\in\mathbb{R}
$$

第二类信号解决“拒绝行为并非完全线性”的问题。单一方向能解释一部分安全行为，但越狱提示可能沿着更复杂的曲面移动，尤其是经过语义伪装、自动改写或后缀优化后。AlignTree 因此在每层、前 3 个 token 与后 5 个 token 的位置上训练 RBF-kernel SVM。RBF-SVM 能捕捉局部非线性边界；再通过 5-fold out-of-fold 预测和 Platt scaling，把 SVM decision value 映射为可比较的 harmfulness probability。筛选出的 SVM 集合 \(\mathcal{S}\) 形成概率特征：

$$
\text{SVMFeatures}(t)=\left[P_{\text{harmful}}(x_i^{(l)}(t))\right]_{(i,l)\in\mathcal{S}}
$$

最终 AlignTree 把线性与非线性特征拼接：

$$
\text{F}(t)=\left[\text{proj}_{r^*}(x_{-1}^{(l)}(t))\right]_{l=1}^{L}\oplus
\left[P_{\text{harmful}}(x_i^{(l)}(t))\right]_{(i,l)\in\mathcal{S}}
$$

其中 \(x_{-1}^{(l)}(t)\) 表示最后 token 在第 \(l\) 层的激活，\(\oplus\) 是向量拼接。这个特征向量交给浅层随机森林，而不是深网络，原因是部署目标是实时、低成本和可解释的特征组合。随机森林能处理不同尺度的概率/投影信号，也能通过树分裂学习“某些层的 refusal projection 与某些 token 的 SVM 概率同时异常”这类非线性交互。

阈值选择是 AlignTree 控制误拒绝的关键。分类器输出 harmfulness confidence 后，系统用 \(\tau\) 决定放行或阻断；如果 \(\tau\) 太低，良性请求会被过度拒绝；如果太高，有害请求会漏过。论文用广义 \(F_\beta\) 在验证集上选阈值：

$$
F_\beta=(1+\beta^2)\cdot\frac{\text{Precision}\cdot\text{Recall}}{\beta^2\cdot\text{Precision}+\text{Recall}}
$$

论文设置 \(\beta=0.2\)，强调 precision，即更重视被拦截样本确实有害，避免对正常用户造成过多拒绝。这与很多安全过滤器“宁可多拒绝”的取向不同：AlignTree 的目标是可部署，因此同时报告 ASR、良性 refusal rate 与执行时间。

> 💡 关键：AlignTree 不是训练一个新的安全语言模型，而是在已有 LLM 的激活空间上训练小型探针和随机森林。它的优势来自“少一次 LLM 调用”，风险则在于它依赖特定模型的内部表示，迁移到新模型时需要重新抽取方向、训练 SVM 和校准阈值。

#### 🧪 练习题
```yaml
question: "AlignTree 为什么要同时使用 refusal direction 和 RBF-SVM 信号？"
options:
  - "因为随机森林只能接收两类特征，不能接收单类特征"
  - "因为线性拒绝方向捕捉主要安全轴，而 RBF-SVM 补充非线性有害模式"
  - "因为 RBF-SVM 用来生成最终文本回答"
  - "因为 refusal direction 只能用于图像模型，不能用于 LLM"
answer: 1
explain: "论文认为单一线性方向不足以描述全部拒绝几何，因此用多层/多位置 RBF-SVM 概率补充复杂非线性信号，再交给随机森林融合。"
```

### JBFuzz

```yaml
id: jbfuzz
num: 25
name: JBFuzz
full_name: 'LLM模糊测试框架 (JBFuzz: LLM Fuzzing Framework)'
year: '2026.03'
org: RedTeams
parent: —
paper_url: https://redteams.ai/blog/jbfuzz-99-percent-success
project_url: ''
category: jailbreak
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

### JBF

```yaml
id: jbf
num: 26
name: JBF
full_name: 越狱铸造厂 (Jailbreak Foundry)
year: '2026.03'
org: arXiv
parent: jbfuzz
paper_url: https://arxiv.org/abs/2603.05001
project_url: ''
category: jailbreak
motivation: 论文自动转化攻击模块
```

#### 📝 一句话总结
JBF 提出 Jailbreak Foundry，把“读论文、实现越狱攻击、校验复现 fidelity、统一评测”做成一条多智能体流水线，解决新越狱论文很难及时、可比、可复现地进入安全基准的问题。它的核心不是发明某一个攻击提示词，而是把论文自动转化为符合统一契约的可运行攻击模块，再用固定数据集、受害模型、judge 和 ASR 指标进行横向比较。

> ⚠️ 资料校准：任务元信息中的 `paper_url` 指向 `arXiv:2603.05001`，该编号实际对应非 JBF 论文；以下精读基于可检索到的同名 JBF 论文 `https://arxiv.org/abs/2602.24009` 及其官方仓库图示，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点
- 三组件架构：`JBF-LIB` 提供统一攻击契约和运行时工具，`JBF-FORGE` 负责论文到模块的多智能体生成，`JBF-EVAL` 负责标准化评测。
- 多智能体 paper-to-module 流程：Planner 从论文抽取算法、控制流、提示模板和参数，Coder 按契约实现模块，Auditor 做逐行 fidelity 与 contract 检查。
- 统一模块契约 `C`：把不同论文中的攻击逻辑约束为可注册、可配置、可批量运行的模块，减少每篇论文重复写评测脚手架。
- 有界审计循环：实现不满足计划或契约时进入 revision，达到审计上限或通过检查后才进入 matched-setting 复现评测。
- fidelity 指标：用 `ASR_gen - ASR_paper` 衡量复现攻击成功率与原论文报告值的偏差，并在偏差低于阈值时触发增强 refinement。
- 统一评测设置：JBF-EVAL 固定数据集加载、victim model 协议、decoding/attempt 记录、judge 和 ASR 汇总，输出可比较表格和 heatmap。
- 实验规模：论文复现 30 个越狱攻击，其中 22 个有官方实现、8 个仅从论文文本实现，并在标准化 AdvBench/JailbreakBench 设定上评估。
- 工程收益：报告平均 ASR 偏差约 `+0.26` 个百分点，攻击专属代码显著减少，共享基础设施复用比例达到约 `82.5%`。

#### 🔬 深入细节
![JBF 系统架构图](https://raw.githubusercontent.com/OpenSQZ/Jailbreak-Foundry/main/images/jbf_architecture.jpg)
*图：JBF 官方架构图，展示 JBF-FORGE、JBF-LIB、JBF-EVAL 如何把新越狱论文转化为可运行模块并统一评测。*

JBF 要解决的直接痛点是 jailbreak 研究的“评测漂移”。新攻击出现很快，但 benchmark 往往依赖人工集成：工程师需要读论文、补齐作者没有写清的默认参数、适配自己的评测框架、再验证 ASR 是否接近论文报告。这个过程容易带来三类误差：集成滞后导致基准落后，工程师理解不同导致实现质量方差，评测数据集、解码参数、judge 和打分标准不统一导致不同论文的 ASR 无法直接比较。JBF 因此把“攻击实现”与“评测执行”解耦，用统一契约固定接口，用多 agent 缩短从论文到模块的路径。

JBF-LIB 是整个系统的底座。论文把它抽象为模块契约 \(C\)，包括 base-class interface、I/O schema、typed parameter hooks、注册与 lazy loading、消息格式化、请求响应归一化、缓存、日志、provider-agnostic LLM adapter 等。这个契约的意义是让攻击模块只表达“方法本身”：如何构造候选 prompt、如何迭代查询 victim、如何停止搜索、输出哪些 attempt 记录；而数据集加载、模型调用、judge、成本统计、批量运行和结果聚合都由共享库承担。

JBF-FORGE 是 paper-to-module 的核心。它先把论文 \(p\) 规范化成可读文本 \(x\)，可选检索官方仓库 \(R\)，再由 Planner \(\pi\) 生成结构化规格 \(s_p\)。规格里需要列出攻击算法步骤、prompt/template、参数默认值、控制流、重试逻辑和与契约 \(C\) 的映射。Coder \(\kappa\) 再把 \(s_p\) 编译成模块 \(m_p\)，并暴露 typed parameters。Auditor \(\alpha\) 不只是跑通测试，而是把模块逐行对照规格、契约和参考仓库，返回接受标志 \(a_c\) 与可操作 revision report \(r\)。

```python
# JBF-FORGE：论文到可运行攻击模块的简化伪代码
# 输入：论文 p，统一契约 C，最大审计轮数 T，fidelity 阈值 tau
x = normalize_to_markdown(p)
R = retrieve_official_repo_if_available(p)

spec = Planner(pi).extract_spec(x, contract=C, repo=R)
report = None
module = Coder(kappa).implement(spec, contract=C, repo=R, revision=report)

for t in range(1, T + 1):
    accepted, report = Auditor(alpha).audit(module, spec, contract=C, repo=R)
    if accepted or t == T:
        break
    module = Coder(kappa).patch(spec, contract=C, repo=R, revision=report)

setting = match_paper_config(p)
asr_gen = JBF_EVAL.evaluate(module, setting)
delta = asr_gen - asr_paper

if delta < tau:
    refined_spec = refine_with_failure_analysis(spec, p, module, report, C, R)
    refined_module = Coder(kappa).implement(refined_spec, contract=C, repo=R)
    refined_asr = JBF_EVAL.evaluate(refined_module, setting)
    if refined_asr - asr_paper >= delta:
        module = refined_module
        delta = refined_asr - asr_paper

return module, delta
```

论文中的 fidelity 机制可以写成：

$$
\Delta = ASR_{gen} - ASR_{paper}
$$

其中 \(ASR_{paper}\) 是原论文在匹配设置下报告的攻击成功率，\(ASR_{gen}\) 是 JBF 生成模块在同样设置下的复现结果。若 \(\Delta < \tau\)，系统会进入增强 refinement：分析失败样本、定位规格或实现中可能导致 ASR 偏低的差异，并在同一 matched setting 下重新评测。这个设计比单纯“模块能运行”更强，因为越狱攻击非常依赖模板细节、搜索停止条件、judge rubric 和 victim 配置；任何小偏差都可能让 ASR 明显变化。

> 💡 关键：JBF 的复现目标不是让 ASR 尽量高，而是让生成实现尽量忠实于论文设置。高于原论文很多也可能意味着模块引入了额外策略，因此论文用 matched-setting gap 来约束 fidelity。

JBF-EVAL 负责把通过审计的攻击放进统一 benchmark。它把 dataset、execution、judging 分成稳定接口：dataset loader 提供 AdvBench/JailbreakBench 等样本，runner 从 registry 实例化攻击并记录每次 attempt，judge 把最小响应记录映射成成功/失败标签，最后汇总 ASR、成本、trace、跨攻击/跨模型矩阵和 heatmap。这样同一个攻击模块既可以在原论文配置下做 fidelity 检查，也可以在统一 AdvBench、固定 GPT-4o judge、固定 victim model 列表下做 apples-to-apples 比较。

与传统手工集成相比，JBF 的创新在于把“论文理解”显式变成可审计 artifact。Planner 的规格、Coder 的模块、Auditor 的逐行报告构成可回溯链路；当攻击复现不准时，系统能指出是 prompt 模板、参数默认值、控制流、搜索次数还是评测边界出了问题。论文报告 30 个攻击的平均复现偏差接近 0，同时共享基础设施显著降低攻击专属代码量，说明很多 jailbreak 论文的差异集中在方法逻辑而非评测脚手架。

从安全评测角度看，JBF 更像“活基准生成器”而不是攻击库。它把快速增长的越狱论文转成统一模块，持续加入版本化结果，使研究者可以追踪模型随时间的鲁棒性变化。它也暴露了一个重要方法论：安全 benchmark 的可信度不只来自数据集规模，还来自实现 fidelity、judge 一致性、结果版本化和跨模型可比性。

#### 🧪 练习题
```yaml
question: "JBF-FORGE 中 Auditor 的核心作用是什么？"
options:
  - "自动生成更多恶意查询以提高攻击成功率"
  - "逐行检查生成模块是否忠实于论文规格和统一契约"
  - "替代 JBF-EVAL 直接给出最终排行榜"
  - "把所有攻击统一改写成同一种提示模板"
answer: 1
explain: "Auditor 的目标是降低复现漂移：它对照 spec、contract 和可选官方仓库检查模块，并在发现语义偏差或参数不一致时触发修订。"
```

### PROBE

```yaml
id: probe
num: 27
name: PROBE
full_name: 过程化基准 (PROcess-Based BEnchmark)
year: '2026.01'
org: EACL
parent: selfcheckgpt
paper_url: https://openreview.net/forum?id=GleVekx5ut
project_url: ''
category: hallucination
motivation: 过程化分解幻觉检测步骤
```

#### 📝 一句话总结
PROBE 提出把幻觉检测从一次性“LLM-as-a-judge”二分类改造成 claim decomposition、evidence finding、evidence evaluation、hallucination localization 四步过程化评测，解决传统基准只能判断最终答案对错、却无法诊断模型在哪一步失败的问题。它还构造了跨 summarization、QA、style transfer 的大规模 claim-evidence 数据集，用步骤级监督暴露 evidence finding 是当前模型的主要瓶颈。

> ⚠️ 资料校准：任务元信息中的 OpenReview id `GleVekx5ut` 未返回该论文；以下精读基于当前可检索同名论文 `https://openreview.net/forum?id=CUQZyxrWfp` 及其 PDF `https://openreview.net/pdf/122b431c56291ca47500709c9dbae81f5dd77597.pdf`，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点
- 四步幻觉检测流程：claim decomposition、evidence finding、evidence evaluation、hallucination localization。
- 数据覆盖三类 RAG/grounded generation 任务：summarization、question answering、style transfer。
- 数据源来自 Clean Wikipedia：每类任务采样 1,000 篇文章，共 3,000 个源文档。
- 每类任务包含 hallucination-free baseline 与三种复杂度的合成幻觉样本，总规模为 12,000 generated responses。
- claim 是最小可独立验证语义单元，PROBE 包含约 118k claim 级标注，并记录 claim 到 source evidence 的对应关系。
- 幻觉注入按复杂度分层：Complexity 1 注入一个事实幻觉，Complexity 2 注入两个，Complexity 3 注入三个且可能诱导后续真实推理依赖错误前提。
- claim-evidence 标注采用多模型流程：Llama-3.1-70B 分解 claim，多个 frontier LLM 检索 evidence，再用 3/4 共识判定 evidence 是否支持 claim。
- 评测指标从最终答案提升到步骤级：evidence finding 用 Partial/Complete Match，localization 用 claim/character-level precision、recall、F1。
- 关键实验发现：claim decomposition 较容易，evidence finding 和 evidence evaluation 才是瓶颈；过程化方法的召回显著高于直接提示。
- 训练信号：用 PROBE 的 claim-evidence 数据全参数微调 Llama-3.1-8B 后，evidence finding 与 evidence evaluation 均明显改善。

#### 🔬 深入细节
![PROBE 过程化幻觉检测流程图](https://quickchart.io/graphviz?format=svg&graph=digraph%20G%20%7B%0A%20%20graph%20%5Brankdir%3DLR%2C%20bgcolor%3D%22white%22%5D%3B%0A%20%20node%20%5Bshape%3Dbox%2C%20style%3D%22rounded%2Cfilled%22%2C%20fillcolor%3D%22%23eef6ff%22%2C%20color%3D%22%232f5f8f%22%2C%20fontname%3D%22Helvetica%22%5D%3B%0A%20%20edge%20%5Bcolor%3D%22%232f5f8f%22%5D%3B%0A%20%20output%20%5Blabel%3D%22Model%20output%0Along-form%20text%22%5D%3B%0A%20%20claims%20%5Blabel%3D%22Step%201%0AClaim%20decomposition%22%5D%3B%0A%20%20evidence%20%5Blabel%3D%22Step%202%0AEvidence%20finding%22%5D%3B%0A%20%20evaluate%20%5Blabel%3D%22Step%203%0AEvidence%20evaluation%22%5D%3B%0A%20%20locate%20%5Blabel%3D%22Step%204%0AHallucination%20localization%22%5D%3B%0A%20%20wiki%20%5Blabel%3D%22Clean%20Wikipedia%0A3%2C000%20articles%22%2C%20fillcolor%3D%22%23fff4df%22%5D%3B%0A%20%20base%20%5Blabel%3D%22Base%20content%0Ageneration%22%2C%20fillcolor%3D%22%23fff4df%22%5D%3B%0A%20%20poison%20%5Blabel%3D%22Hallucination%20insertion%0Acomplexity%201%2F2%2F3%22%2C%20fillcolor%3D%22%23ffe8e3%22%5D%3B%0A%20%20pairs%20%5Blabel%3D%22Claim-evidence%0Apair%20generation%22%2C%20fillcolor%3D%22%23f0f7e8%22%5D%3B%0A%20%20wiki%20-%3E%20base%20-%3E%20poison%20-%3E%20pairs%20-%3E%20claims%3B%0A%20%20output%20-%3E%20claims%20-%3E%20evidence%20-%3E%20evaluate%20-%3E%20locate%3B%0A%7D)
*图：根据论文 Figure 1 与 Figure 2 重绘的 PROBE 流程。原始图见 OpenReview PDF 第 1-3 页：`https://openreview.net/pdf/122b431c56291ca47500709c9dbae81f5dd77597.pdf`。*

PROBE 的动机来自一个具体缺陷：现有幻觉检测经常把模型输出交给另一个 LLM，让它一次性判断“是否包含幻觉”。这种 outcome-based evaluation 对短答案还勉强可用，但对长文本会丢失诊断粒度。一个模型可能能分解 claim，却找不到证据；也可能找到证据，却误判证据是否支持 claim；还可能知道有问题，却不能定位是哪一句或哪个 claim。PROBE 将幻觉检测拆成四个可测能力，使失败原因可以被定位，而不是只得到一个最终二分类。

论文聚焦 groundedness 场景：模型需要基于给定 source 或 retrieved passage 完成摘要、问答、风格迁移。如果输出中的某个陈述缺少 source 支持，则被视为 unfaithful hallucination。这个定义与纯开放世界事实性不同，因为判断标准不是“世界上是否真实”，而是“是否被给定材料支持”。因此 PROBE 的数据构造必须同时保存 source document、模型生成文本、claim、evidence span 与 hallucinated label。

数据生成有三阶段。第一阶段是 base content generation：从 Clean Wikipedia 采样 3,000 篇文章，每个任务 1,000 篇；摘要任务生成简明摘要，QA 任务先生成可由 2-4 个事实回答的问题再回答，style transfer 任务把文章改写成 blog post、lecture notes、FAQ 或 textbook 风格。第二阶段是 hallucination insertion：向文本注入语义连贯但 source 中无法检索支持的事实片段，并分成 1/2/3 个幻觉的复杂度等级。第三阶段是 claim-evidence pair generation：把生成文本拆成 atomic claims，并为 faithful claims 找 source evidence。

```python
# PROBE 数据构造与评测的简化伪代码
for task in ["summarization", "question_answering", "style_transfer"]:
    docs = sample_clean_wikipedia(n=1000, task=task)
    for doc in docs:
        base_output = generate_grounded_output(doc, task)
        add_sample(output=base_output, label="faithful")

        for complexity in [1, 2, 3]:
            poisoned = inject_plausible_hallucinations(
                base_output,
                unsupported_fact_count=complexity,
                preserve_fluency=True,
            )
            claims = decompose_into_atomic_claims(poisoned)
            for claim in claims:
                candidate_evidence = union([
                    model.retrieve_evidence(claim, doc)
                    for model in [llama70b, gpt4o_mini, mixtral_8x22b, claude_sonnet]
                ])
                votes = [model.supports(claim, e) for model in voters for e in candidate_evidence]
                verified = accept_if_consensus(votes, threshold=0.75)
                claim.label = "truth" if verified else "hallucinated"
            add_sample(output=poisoned, claims=claims)

# 评测时强制模型走四步，而不是直接输出最终 judge
claims = detector.decompose(output)
evidence = detector.find_evidence(claims, source)
support = detector.evaluate_evidence(claims, evidence)
hallucinated_claims = localize_unsupported_claims(claims, support)
```

PROBE 的 claim 定义是“可独立验证的最小信息单元”。论文使用 Llama-3.1-70B 进行 claim decomposition；对于由合成幻觉片段产生的 claim，因为 source 中不存在支持证据，可直接标为 hallucinated；对于 baseline 或非注入部分 claim，则调用四个模型检索 Wikipedia source 中的候选证据。Evidence evaluation 阶段让同样的多个模型独立判断候选证据是否支持 claim，至少 3/4 模型同意才接受该 evidence。这个 0.75 共识阈值降低了单一 judge 偶然误判带来的标注噪声。

PROBE 的检测目标可以抽象为从输出 \(y\) 中得到 claim 集合 \(C(y)=\{c_i\}\)，再为每个 claim 找到 evidence 集合 \(E_i\)，最后估计支持函数 \(s(c_i,E_i)\in\{0,1\}\)。当 \(s=0\) 时，该 claim 被定位为幻觉。对于最终 localization，论文采用细粒度匹配而非整段二分类：

$$
Precision = \frac{|P \cap G|}{|P|},\quad
Recall = \frac{|P \cap G|}{|G|},\quad
F1 = \frac{2\cdot Precision\cdot Recall}{Precision+Recall}
$$

其中 \(P\) 是模型预测的幻觉 claim/span，\(G\) 是标注幻觉 claim/span。Evidence finding 还单独报告 Partial Match 与 Complete Match：Partial 只要求至少找回一个正确支持证据，Complete 要求找全该 claim 的所有必要证据。论文结果显示，模型 Partial 往往在约 80% 附近，但 Complete 尤其在 QA 上明显更低，说明模型常能找到“一个相关段落”，却不能穷尽支持复杂 claim 所需的全部证据。

> 💡 关键：PROBE 将“是否会检测幻觉”拆成“是否会拆 claim、是否会找证据、是否会判断证据、是否会定位错误”。这种拆分让 benchmark 可以指导模型改进，而不只是排名。

实验部分最重要的发现是：claim decomposition 对 frontier LLM 来说相对容易，召回通常很高；真正限制幻觉检测的是 evidence finding 和 evidence evaluation。直接 prompting 的 hallucination recall 在长文本上很低，而过程化评测通常能把召回提高到 80% 以上。这个现象符合直觉：长文本中幻觉常常只占局部，要求模型一次性判断整段文本容易忽略小错误；若先把文本拆成 claim，再逐个找证据，局部错误更容易暴露。

论文还验证了 PROBE 作为训练数据的价值。作者用 Llama-3.1-8B 做全参数微调，学习率 \(2\times 10^{-5}\)，Adam 参数 \(\beta_1=0.9,\beta_2=0.999\)，cosine scheduler，2% warm-up，并在 8 张 A100 80GB 上用 FSDP 训练。微调模型在 evidence finding 和 evidence evaluation 上超过多个未微调 frontier baseline，说明过程级标注不只是评测资产，也能作为专门幻觉检测器的监督信号。

与 SelfCheckGPT 一类自一致性检测相比，PROBE 的差异在于它不把“不确定性”或“多次采样一致性”当作最终证据，而是要求 claim 绑定 source evidence。与 FactScore 类 atomic fact 评测相比，PROBE 更强调检测过程本身的可诊断性：FactScore 关心最终有多少事实被支持，PROBE 还会告诉你是 claim 提取、证据检索还是证据判定导致错误。因此它更适合训练和评测 agentic fact-checking pipeline。

#### 🧪 练习题
```yaml
question: "PROBE 为什么要把幻觉检测拆成四个步骤？"
options:
  - "为了减少数据集规模，降低标注成本"
  - "为了把最终对错转化为可诊断的步骤级能力评测"
  - "为了避免使用任何外部证据，只依赖模型自信度"
  - "为了只评测摘要任务，不再评测 QA 和风格迁移"
answer: 1
explain: "PROBE 的核心贡献是过程化评测：claim 分解、证据查找、证据判断和幻觉定位分别暴露不同失败模式，比一次性 judge 更可诊断。"
```

### KGHaluBench

```yaml
id: kghalubench
num: 28
name: KGHaluBench
full_name: 知识图谱幻觉基准 (Knowledge Graph Hallucination Benchmark)
year: '2026'
org: EACL
parent: factscore
paper_url: https://aclanthology.org/2026.findings-acl.1/
project_url: ''
category: hallucination
motivation: 知识图谱自动化验证
```

#### 📝 一句话总结
KGHaluBench 提出用知识图谱动态生成多事实复合问题，并用实体级过滤与事实级校验自动验证 LLM 长答案，解决静态 QA/幻觉基准覆盖窄、难度不可控、只给单一幻觉率而难以解释幻觉来源的问题。它把幻觉拆成 breadth of knowledge 与 depth of knowledge 两类，使评测不仅能看模型答得准不准，还能判断模型是不认识实体，还是认识实体但记错细节。

> ⚠️ 资料校准：任务元信息中的 `paper_url` 指向 `2026.findings-acl.1`，与 KGHaluBench 不匹配；以下精读基于 ACL Anthology 实际页面 `https://aclanthology.org/2026.findings-eacl.206/` 与 arXiv HTML `https://arxiv.org/html/2602.19643v1`，YAML 元信息按任务输入保持不改。

#### 🎯 核心要点
- 动态问题生成：从 Wikidata 等 KG 随机抽取 focal entity，再围绕该实体的一跳邻居和 relation-fact triple 生成开放式复合问题。
- 同时考察 breadth 与 depth：实体级是否对齐用于判断模型是否具备基础实体知识，事实级 triple 校验用于判断模型是否掌握具体细节。
- 三类输入属性：KG Triples 用于出题和事实验证，Entity Description 用于实体级语义对齐，Entity Statistics 用于估计实体流行度与题目难度。
- 难度建模：结合 entity popularity、entity type relevance、question complexity，用 sigmoid 生成问题难度 \(Q_d\)，再校准 weighted accuracy。
- 响应验证两阶段：Entity-Level Filter 先判定 aligned、hallucinated、abstained；只有 aligned response 进入 Fact-Level Check。
- 实体级过滤：结合语义相似度和 token overlap，并按 70:30 加权，过滤与 focal entity 概念不对齐的回答。
- 事实级校验：把 KG tuple 改写成自然语言事实句，再通过 NLI entailment、LLM entailment 与 expert decision filter 判断是否被回答正确表达。
- 新指标：\(W_a\) 按题目难度校准 accuracy，\(HaluBOK\) 衡量 breadth-of-knowledge 幻觉，\(HaluDOK\) 衡量 depth-of-knowledge 幻觉。
- 评测设置：论文实验使用约 25 个开源与闭源前沿模型，每个模型多轮回答 150 个动态问题并取均值。
- 关键发现：小模型更常在实体级失败，大模型能识别主题但仍会在具体事实上出错；高 abstention 可降低幻觉但会牺牲有用性。

#### 🔬 深入细节
![KGHaluBench 总体框架](https://arxiv.org/html/2602.19643v1/Figures/KGHaluBench_Framework6.png)
*图：KGHaluBench Figure 1，总体流程包括 Question Generation Module 与 Response Verification Module。*

KGHaluBench 的出发点是传统幻觉基准的两个不足。第一，静态 QA 数据集会过时，且覆盖的实体、主题、时间范围有限；模型可能因为见过题目或记住常见实体而取得虚高分数。第二，很多基准只给一个 accuracy 或 hallucination rate，无法解释模型为什么错：它到底完全不认识这个实体，还是知道实体但记错了某个关系？KGHaluBench 用 KG 动态采样实体和事实，使题目覆盖更广，再用分层验证区分 surface-level entity mismatch 与 fine-grained factual error。

Question Generation Module 的核心是 focal entity。系统先从 KG 批量采样实体，记录实体 ID 与 type，并按预定义有效类型过滤；类型还按 KG 频率分为 Very Common、Common、Uncommon，以避免评测被“人名、国家、城市”等高频类型垄断。选定 focal entity 后，系统抽取它的一跳邻居形成子图，从中筛选可用于出题的 relation-fact pairs。图像、官网、given name 等不适合构造挑战性问题的关系会被过滤；若有效关系不足三个，则丢弃该实体并继续采样。

KGHaluBench 每题通常选三个 relation-fact triples，要求模型先给出实体概览，再回答这些具体事实。这种 compound question 同时激活模型的实体背景知识与细节知识。为了支持验证，系统还取 Entity Description 作为实体级对齐基准，并收集 Entity Statistics 估计 popularity：page views、site links、linked entities、external IDs、wiki token count、statements、references 等。直觉上，越热门、连接越多、描述越丰富的实体，越可能出现在模型训练语料中，也越容易回答。

```python
# KGHaluBench：KG 动态出题与两级验证的简化伪代码
kg = WikidataSnapshot()
while need_more_questions:
    entity = sample_focal_entity(kg, prefer_balanced_entity_types=True)
    triples = filter_valid_relation_fact_pairs(kg.one_hop_subgraph(entity))
    if len(triples) < 3:
        continue

    selected = random_select(triples, k=3)
    description = fetch_entity_description(entity)
    stats = collect_entity_statistics(entity)
    q_complexity = estimate_question_complexity(selected)
    e_popularity = estimate_entity_popularity(stats, entity.type)
    q_difficulty = sigmoid(q_complexity, e_popularity)

    question = build_compound_question(entity, selected)
    response = llm.answer(question)

    entity_label = entity_level_filter(response, description)
    if entity_label == "abstained":
        score = 1
    elif entity_label == "hallucinated":
        score = 0
    else:
        facts = verbalize_triples(entity, selected)
        score = 0
        for fact in facts:
            if fact_level_check(response, fact):
                score += 1

    update_metrics(score, q_difficulty, entity_label)
```

问题难度 \(Q_d\) 是 KGHaluBench 的关键机制。论文受 Item Response Theory 启发，用 sigmoid 把问题复杂度与实体流行度合成为连续难度值：

$$
Q_d = \frac{1}{1 + e^{-\alpha(Q_{Avg}-EP_{Norm})}}
$$

其中 \(Q_{Avg}\) 表示三个关系对应的问题复杂度均值，\(EP_{Norm}\) 是 min-max 归一化后的实体流行度，\(\alpha\) 控制 sigmoid 陡峭程度。这个公式的直觉是：同样复杂的问题，如果实体很流行，难度应下降；如果实体冷门，即使关系形式不复杂，也可能难。用连续难度而非离散难度档位，可以让不同随机抽样批次之间的 accuracy 更可比。

Response Verification Module 先做 Entity-Level Filter。它把回答分成 aligned、hallucinated、abstained 三类：如果模型拒答、承认不知道或无法识别实体，则记为 abstained 并给部分信用；如果回答试图回答但与实体描述在概念上不匹配，则判为实体级幻觉；只有与实体描述对齐的回答才进入事实级校验。实体级相似度结合 embedding cosine similarity 与 token overlap，并按 70:30 加权，强调语义对齐而非表面词匹配。

![KGHaluBench 事实验证流程](https://arxiv.org/html/2602.19643v1/Figures/fact_pipeline_vert2.png)
*图：KGHaluBench Figure 4，事实级验证流水线使用 NLI、LLM entailment 与专家决策过滤器。*

Fact-Level Check 针对每个 relation 独立判断，最多每个回答 3 分。系统先把结构化 tuple，即 entity name、entity type、relation、tense indicator、fact，转写成自然语言事实句。然后进入 NLI Entailment Filter：若 NLI 判断回答蕴含该事实，则该事实正确；若 contradiction 或 neutral，则交给 LLM Entailment Filter 复核。LLM filter 以 fact-checking assistant 角色判断事实是否被明确陈述、被矛盾或未提及；当 LLM 与 NLI 冲突时，再进入 Expert Decision Filter 做二选一仲裁。这个多级设计平衡了速度、可解释性和复杂事实判断能力。

KGHaluBench 的主指标是 weighted accuracy：

$$
W_a = Accuracy \cdot \frac{Q_d}{Avg(Q_d)}
$$

这里 \(Accuracy\) 来自正确事实与合理 abstention 得分，\(Avg(Q_d)\) 是评测中平均题目难度。若某次抽样比平均更难，则同样 accuracy 会被上调；若抽样更容易，则会被下调。这个设计避免动态采样引入“这批题刚好简单/困难”的随机偏差。

幻觉率被拆成两类：

$$
HaluBOK = \frac{|Entity\ Hallucinations|}{|Total\ Responses|-|Abstentions|}
$$

$$
HaluDOK = \frac{|Incorrect\ Facts|}{Maximum\ Attainable\ Score}
$$

\(HaluBOK\) 是 breadth of knowledge 幻觉率，反映模型是否连 focal entity 的基本概念都没对齐；\(HaluDOK\) 是 depth of knowledge 幻觉率，反映模型已经理解实体主题但在具体 relation-fact 上出错。这个拆分比单一 hallucination rate 更可解释。例如小模型可能 \(HaluBOK\) 很高，说明它常把冷门实体答成别的对象；大模型 \(HaluBOK\) 降低后仍有 \(HaluDOK\)，说明它知道讨论谁，但细节记忆不可靠。

与 FactScore 相比，KGHaluBench 继承了“把长答案拆成事实并验证”的思想，但它的事实不是从回答中自由抽取后再找证据，而是由 KG 预先给出可验证 relation-fact triples。这样做牺牲了一部分开放性，却换来自动出题、自动验题、难度估计和幻觉来源分解。与普通 KGQA 相比，KGHaluBench 不只要求短答案命中实体或关系，而是要求模型生成一段围绕实体的自然语言回答，并在概念层与事实层都可验证。

论文结果显示，KGHaluBench 对当前模型仍有足够难度，GPT-5 的 weighted accuracy 也未接近满分。更重要的是，模型规模变大后 \(HaluBOK\) 下降明显，说明大模型更少“完全认错实体”；但 \(HaluDOK\) 下降较慢，说明精确事实仍是难点。abstention 结果也揭示了评测权衡：合理拒答能降低幻觉，但过度拒答会损害有用性，因此论文强调 constructive abstention，即在不知道时给出如何寻找可靠信息的帮助，而不只是拒绝。

#### 🧪 练习题
```yaml
question: "KGHaluBench 中 HaluBOK 与 HaluDOK 的主要区别是什么？"
options:
  - "HaluBOK 衡量实体级基础知识幻觉，HaluDOK 衡量事实级细节知识幻觉"
  - "HaluBOK 只用于闭源模型，HaluDOK 只用于开源模型"
  - "HaluBOK 是训练损失，HaluDOK 是推理延迟"
  - "二者完全等价，只是不同论文版本中的命名"
answer: 0
explain: "HaluBOK 来自 entity-level filter，反映模型是否认识并对齐 focal entity；HaluDOK 来自 fact-level check，反映具体 KG triples 是否回答正确。"
```

### ABSE

```yaml
id: abse
num: 29
name: ABSE
full_name: 自适应贝叶斯语义熵 (Adaptive Bayesian Semantic Entropy)
year: '2026.01'
org: AAAI
parent: rag
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
project_url: ''
category: hallucination
motivation: 自适应语义熵平衡精度效率
```

#### 📝 一句话总结
ABSE 提出用层次贝叶斯后验估计语义熵，并用方差阈值自适应决定是否继续采样，解决了固定采样预算在简单问题上浪费、在复杂问题上探索不足的问题。它进一步通过 guided semantic exploration 扰动语义关键 token，以重要性采样发现更多语义簇，在低预算幻觉检测中提升 AUROC 并减少采样次数。

#### 🎯 核心要点
- 将回答空间按语义等价关系聚类，用语义分布的熵作为幻觉不确定性分数
- 用层次贝叶斯建模未知语义类别数 \(K\) 与类别概率 \(\mathbf{p}\)，而不是假设已观察到的类别就是完整语义空间
- 用 Poisson 先验 \(p(K)\) 表示潜在语义类别数，先验参数由语义关键 token 加权困惑度估计
- 用带生成概率下界约束的截断 Dirichlet 后验估计每个语义类别概率，显式利用已采样序列概率
- 用后验语义熵方差 \(\mathrm{Var}[\mathbf{h}|\mathcal{D}]\) 作为自适应停止条件，达到阈值后停止继续调用 LLM
- 用 guided semantic exploration 在高语义重要性位置替换 top-k 备选 token，再用重要性权重校正偏差
- 在 CoQA、TriviaQA、TruthfulQA、SimpleQA 等 QA 数据集上验证，低预算场景约少用一半样本，并在相同采样预算下带来平均 AUROC 提升

#### 🔬 深入细节
![ABSE 自适应采样示意图](https://arxiv.org/html/2603.22812v1/figures/teaser-1.png)
*图：固定采样与 ABSE 自适应贝叶斯采样的对比。简单问题很快收敛，复杂问题继续探索更多语义分支。*

```python
# ABSE: Adaptive Bayesian Semantic Entropy
# 输入: prompt x, LLM P_theta, 方差阈值 gamma, 初始样本数 N0, top-k 扰动候选
samples = sample_llm(P_theta, x, N0)
for r in samples:
    r.meaning = semantic_cluster(r)
    r.prob = sequence_probability(P_theta, r, x)

lambda_hat = mean(weighted_perplexity(r) for r in samples)
prior_K = Poisson(lambda_hat)
posterior = initialize_hierarchical_posterior(samples, prior_K)

while posterior.var_entropy > gamma:
    seed = choose_sample(samples)
    pos = rank_tokens_by_semantic_importance(seed)[0]
    alt = choose_top_k_alternative(P_theta, seed.prefix(pos), k)
    r_new = continue_generation_after_replacement(P_theta, seed, pos, alt)
    w = importance_weight(P_theta, r_new, pos)
    r_new.meaning = semantic_cluster(r_new)
    r_new.prob = sequence_probability(P_theta, r_new, x)
    samples.append(r_new)
    posterior.update_weighted_counts(r_new.meaning, weight=w)
    posterior.update_truncated_dirichlet_constraints(samples)
    posterior.update_posterior_over_K()

H_sem_hat = posterior.expected_entropy
```

ABSE 的出发点是语义熵检测：同一个问题如果稳定生成同一语义答案，说明模型对事实更确定；如果不同采样落入多个互相矛盾的语义簇，幻觉风险更高。论文将响应空间 \(\mathcal{R}_x\) 映射到语义集合 \(\mathcal{M}_x\)，语义类别概率定义为：

$$
p(m|x)=\sum_{r\in\mathcal{R}_x:f_x(r)=m}P_\theta(r|x)
$$

语义熵就是这些语义类别概率的 Shannon 熵：

$$
H_{sem}=-\sum_{m\in\mathcal{M}_x}p(m|x)\log p(m|x)
$$

传统 Semantic Entropy 通常固定采样 \(N\) 次，然后把出现过的语义簇计数归一化。这个估计隐含两个弱假设：一是已经观察到足够多的语义类别，二是所有 prompt 需要相同采样预算。ABSE 反过来把 \(H_{sem}\) 看成随机变量 \(\mathbf{h}\)，并对未知类别数 \(K=|\mathcal{M}_x|\) 做边缘化：

$$
\mathbb{E}[\mathbf{h}|\mathcal{D}]=\sum_{K=1}^{\infty}\mathbb{E}[\mathbf{h}|K,\mathcal{D}]p(K|\mathcal{D})
$$

$$
\mathrm{Var}[\mathbf{h}|\mathcal{D}]=\mathbb{E}_K[\mathrm{Var}[\mathbf{h}|K,\mathcal{D}]]+\mathrm{Var}_K[\mathbb{E}[\mathbf{h}|K,\mathcal{D}]]
$$

这两个式子是“自适应”的核心：如果后验方差已经低于阈值 \(\gamma\)，继续采样的边际收益很小；如果方差仍高，说明语义类别数或类别概率仍不确定，需要继续探索。简单事实问答往往在少量样本后方差快速下降，复杂或歧义问题则会保留高方差，从而获得更多预算。

在固定 \(K\) 时，ABSE 用 Dirichlet 分布建模类别概率 \(\mathbf{p}=(p_1,\ldots,p_K)\)。标准后验是 \(\mathrm{Dir}(\alpha_0+n_1,\ldots,\alpha_0+n_K)\)，但论文进一步加入生成概率约束：若某些已观测序列属于语义类 \(j\)，那么该语义类总概率至少要覆盖这些序列概率之和：

$$
p_j\ge b_j=\sum_{r_i\in\mathcal{D}:f_x(r_i)=j}P_\theta(r_i|x)
$$

于是后验不是普通 Dirichlet，而是限制在 \(\mathcal{C}=\{\mathbf{p}\in\Delta^{K-1}:p_j\ge b_j\}\) 上的截断 Dirichlet。直觉上，这避免后验给已明确观察到的高概率语义类分配过低质量，从而收紧熵估计的不确定性。

ABSE 对 \(K\) 的先验使用 Poisson 分布 \(p(K)=\lambda^Ke^{-\lambda}/K!\)。关键不是固定 \(\lambda\)，而是用 prompt 相关的加权困惑度估计 \(\hat{\lambda}\)。每个 token 的语义重要性由删除该 token 前后的语义相似度变化表示：

$$
w_{i,j}=1-\mathrm{sim}(r_i,r_i\setminus\{t_{i,j}\})
$$

加权困惑度为：

$$
\mathrm{WPL}_i=\exp\left(-\frac{\sum_j w_{i,j}\log P_\theta(t_{i,j}|t_{i,<j},x)}{\sum_j w_{i,j}}\right)
$$

如果关键 token 处的概率分布更不确定，\(\mathrm{WPL}\) 更高，先验就允许更多潜在语义类别。这样做比只看普通 perplexity 更贴近“语义分支”数量，因为停用词或格式 token 的不确定性不会被过度放大。

Guided semantic exploration 解决另一个问题：普通多次采样可能反复生成同义回答，看似样本数增加，实际没有发现新的语义簇。ABSE 先按 \(w_{i,j}\) 排序找语义关键位置，再从该位置的条件分布里取 top-k 替代 token，替换后继续生成。因为这改变了原始采样分布，论文定义 proposal \(q(\mathbf{r}|x)\) 并用重要性权重校正：

$$
w(\mathbf{r})=\frac{P_\theta(\mathbf{r}|x)}{q(\mathbf{r}|x)}=P_\theta(t_j|\mathbf{t}_{<j},x)
$$

加权样本进入贝叶斯更新时，不是简单 \(+1\)，而是更新有效计数：

$$
n_j^{(N)}=n_j^{(N-1)}+w^{(N)},\quad \alpha_j^{(N)}=\alpha_0+n_j^{(N)}
$$

> 💡 关键：ABSE 不是“少采样”的启发式，而是把“是否继续采样”转化为后验方差是否足够小的问题；同时用扰动式探索主动寻找语义分支，再用重要性采样保持估计无偏。

#### 🧪 练习题
```yaml
question: "ABSE 为什么要同时建模语义类别数 K 和类别概率 p？"
options:
  - "因为只估计类别概率会默认已观察到完整语义空间，无法表达未发现语义簇的不确定性"
  - "因为 K 越大，LLM 的参数量越小"
  - "因为 Dirichlet 分布只能处理二分类问题"
  - "因为语义熵必须依赖人工标注的固定类别表"
answer: 0
explain: "ABSE 用 p(K|D) 表达潜在语义类别数的不确定性，再在每个 K 下估计类别概率分布，从而能决定是否需要继续采样。"
```

### HALP

```yaml
id: halp
num: 30
name: HALP
full_name: 'VLM探测 (HALP: VLM Probing)'
year: '2026'
org: EACL
parent: truthfulqa
paper_url: https://aclanthology.org/2026.findings-acl.1/
project_url: ''
category: hallucination
motivation: 内部表示预测幻觉风险
```

#### 📝 一句话总结
HALP 提出了一种轻量级探测框架，通过在视觉语言模型（VLM）生成文本**之前**的单次前向传播中提取三类内部表示（视觉特征、视觉 token 隐状态、查询 token 隐状态），训练 MLP 探针预测幻觉风险，在 8 个主流 VLM 上实现了最高 0.93 AUROC 的幻觉检测性能，且推理开销不足 1%。

#### 🎯 核心要点
- **预生成幻觉检测**：在 VLM 解码生成文本之前，仅通过 prefill 阶段的内部表示即可预测幻觉风险，无需等待完整生成
- **三类探测特征**：Visual Features (VF) — 视觉编码器全局池化输出；Vision Token (VT) — 解码器中视觉 token 最后位置的隐状态；Query Token (QT) — 解码器中查询 token 最后位置的隐状态
- **轻量 MLP 探针**：3 层 MLP（512→256→128），ReLU 激活，二分类输出幻觉概率分数 \(s^j \in [0,1]\)
- **大规模基准评测**：构建 10,000 样本多模态幻觉检测数据集，覆盖 11 个任务领域、4 种回答格式、7 类幻觉问题
- **8 个 VLM 系统评估**：Gemma3-12B、LLaVA-Next-8B、Llama-3.2-11B、Phi4-VL-5.6B、Molmo-7B、Qwen2.5-VL-7B、SmolVLM2-2.2B、FastVLM-7B
- **QT 特征一致性最优**：查询 token 表示在 7/8 模型上 AUROC 达 0.90–0.94，平均 0.87，显著优于 VF（0.69）和 VT（0.69）
- **层级分析**：QT 性能随解码器深度单调递增，3L/4 层为最优提取点；VT 性能跨层稳定但有限（~0.65–0.70）
- **实际部署开销极低**：探针推理仅 10–15ms，相对完整生成开销 <1%

#### 🔬 深入细节
##### 框架总览

![HALP 框架示意图](https://arxiv.org/html/2603.05465v1/x2.png)
*图：HALP 从 VLM 的单次前向传播中提取三类内部表示（VF、VT、QT），分别训练探针检测幻觉风险*

HALP 的核心思想是：VLM 在生成文本之前的 prefill 阶段，其内部表示已经编码了足够的信息来预测即将发生的幻觉。该框架无需修改模型权重，不依赖生成结果，可在解码前实时评估风险。

##### 算法流程

```python
# HALP 幻觉检测框架伪代码
def halp_pipeline(vlm, images, queries, ground_truths):
    # === 阶段 1: 幻觉标注 (离线) ===
    for (I, Q, Y) in zip(images, queries, ground_truths):
        Y_hat = vlm.generate(I, Q)                    # VLM 标准推理
        b = llm_judge(Y_hat, Y, Q)                     # LLM-as-a-Judge 判断幻觉 {0,1}
    
    # === 阶段 2: 特征提取 (单次前向传播) ===
    for (I, Q) in zip(images, queries):
        # 视觉特征 VF: 视觉编码器输出的全局平均池化
        u_bar = mean_pool(vision_encoder(I))            # shape: [d_vision]
        
        # 视觉 token 表示 VT: 解码器第 ℓ 层视觉序列最后位置
        # 查询 token 表示 QT: 解码器第 ℓ 层查询序列最后位置
        hidden_states = vlm.prefill(I, Q)               # 仅 prefill，不解码
        for ℓ in {1, L//4, L//2, 3*L//4, L}:
            vt[ℓ] = hidden_states[ℓ][last_vision_pos]  # shape: [d_model]
            qt[ℓ] = hidden_states[ℓ][last_query_pos]   # shape: [d_model]
    
    # === 阶段 3: 探针训练 ===
    for feature_type in [VF, VT, QT]:
        probe = MLP(input_dim, 512, 256, 128, 1)       # 3 层 MLP + sigmoid
        probe.train(features, labels_b, epochs=50, lr=0.001)
    
    # === 阶段 4: 推理时幻觉风险评估 ===
    score = probe(extract_qt(vlm.prefill(I_new, Q_new)))  # 10-15ms
    if score > threshold:
        flag_as_high_risk()  # 拒绝回答 / 路由到更强模型
```

##### 动机与背景

VLM 幻觉（hallucination）是指模型生成与视觉输入不一致的文本内容，包括虚构不存在的物体、错误描述属性/关系、编造事实等。现有幻觉检测方法主要分为两类：

1. **后生成检测**：需要模型完成整个生成过程后，通过对比参考答案或多次采样一致性来判断，计算开销大且无法实时干预
2. **生成过程中检测**：利用 token 级别的 logit 不确定性或注意力模式，但仍需部分解码过程

> 💡 **关键洞察**：HALP 发现 VLM 在 prefill 阶段（处理输入但尚未生成任何 token）的内部表示中，已经包含了丰富的幻觉预测信号。这意味着可以在**零生成开销**下评估风险。

##### 三类特征的设计原理

**Visual Features (VF)** 捕获纯视觉感知信号：

$$\bar{\mathbf{u}} = \frac{1}{M}\sum_{i=1}^{M}\mathbf{u}_i$$

其中 \(\mathbf{u}_i\) 是视觉编码器输出的第 \(i\) 个 patch token，\(M\) 为 patch 总数。VF 在多模态投影层之前提取，反映模型对图像的"纯视觉理解"。如果视觉编码器本身就无法正确感知图像内容，后续的语言生成必然会产生幻觉。

**Vision Token (VT)** 捕获视觉信息在语言解码器中的融合表示。提取解码器第 \(\ell\) 层视觉 token 序列最后位置的隐状态，反映视觉信息经过多模态投影和 Transformer 层处理后的状态。

**Query Token (QT)** 捕获完整的多模态推理结果。由于 Transformer 的因果注意力机制，查询序列最后位置的隐状态聚合了所有视觉 token 和文本 token 的信息，是模型即将开始生成时的"决策状态"。

> ⚠️ **注意**：QT 提取的是拼接序列 \((V, Q)\) 的最后位置，而非仅文本查询的最后位置。这意味着它包含了完整的视觉-文本交互信息。

##### 实验结果深入分析

**主结果（Table 2）** 显示了三类特征在 8 个 VLM 上的 AUROC：

| 模型 | VF | VT | QT | 平均 |
|------|-----|-----|-----|------|
| Gemma3-12B | 0.674 | 0.596 | **0.935** | 0.735 |
| Qwen2.5-VL-7B | 0.787 | 0.668 | **0.915** | 0.790 |
| Llama-3.2-11B | 0.770 | 0.738 | **0.896** | 0.801 |
| Phi4-VL-5.6B | 0.617 | 0.774 | **0.903** | 0.765 |
| Molmo-7B | 0.683 | 0.687 | **0.919** | 0.763 |
| SmolVLM2-2.2B | 0.724 | 0.689 | **0.901** | 0.772 |
| LLaVA-Next-8B | 0.611 | 0.627 | **0.903** | 0.714 |
| FastVLM-7B | 0.683 | **0.703** | 0.614 | 0.667 |
| **平均** | 0.694 | 0.685 | **0.873** | 0.751 |

三个关键发现：

1. **QT 一致性优势**：7/8 模型的 QT AUROC 在 0.90–0.94 之间，说明幻觉信号在多模态推理完成后最为集中
2. **架构异质性**：Qwen2.5-VL 和 Llama-3.2 的 VF 已达 0.77–0.79（视觉编码器本身信息丰富），而 LLaVA-Next 和 Phi4-VL 的 VF 仅 0.61（更依赖后续融合）
3. **FastVLM 异常**：唯一 VT > QT 的模型（0.703 vs 0.614），暗示其架构在早期融合阶段就完成了关键推理

**层级分析** 揭示了幻觉信号在解码器中的演化规律：
- QT 性能随层深单调递增，典型模式如 Gemma3：\(0.717 \to 0.812 \to 0.925 \to 0.932 \to 0.935\)
- VT 性能跨层基本稳定（0.65–0.70），说明视觉信息在解码器中的变化有限
- 最优提取层为 \(3L/4\)，在大多数模型上达到峰值或接近峰值性能

##### 与现有方法的区别

| 维度 | 后生成方法 | 生成中方法 | HALP（预生成） |
|------|-----------|-----------|---------------|
| 检测时机 | 生成完成后 | 解码过程中 | prefill 阶段 |
| 计算开销 | 高（完整生成+评估） | 中（部分解码） | 极低（<1%） |
| 干预能力 | 无（事后） | 有限 | 完全（可拒绝/路由） |
| 是否需要参考答案 | 通常需要 | 不需要 | 训练时需要，推理时不需要 |

##### 实际应用场景

HALP 支持两种部署模式：
- **选择性拒绝**：当探针分数超过阈值时拒绝回答，用安全提示替代。论文在附录中展示了覆盖率-准确率权衡曲线
- **选择性路由**：高风险输入路由到更强的 VLM 或工具增强管线，低风险输入由基础模型直接处理，平衡延迟与可靠性

#### 🧪 练习题
```yaml
question: "HALP 框架中，哪种内部表示在大多数 VLM 上提供了最强的幻觉预测能力？"
options:
  - "Visual Features (VF) — 视觉编码器的全局池化输出"
  - "Vision Token (VT) — 解码器中视觉 token 的隐状态"
  - "Query Token (QT) — 解码器中查询 token 最后位置的隐状态"
  - "注意力权重矩阵的熵值"
answer: 2
explain: "QT 表示在 7/8 模型上 AUROC 达 0.90–0.94（平均 0.87），因为查询序列最后位置通过因果注意力聚合了完整的视觉-文本交互信息，是最接近生成决策的内部状态。"
```

### AST-Detect

```yaml
id: ast_detect
num: 31
name: AST-Detect
full_name: 语法树检测 (AST-based Hallucination Detection)
year: '2026.03'
org: WWW
parent: —
paper_url: https://arxiv.org/abs/2403.06448
project_url: ''
category: hallucination
motivation: 语法树确定性代码验证
```

#### 📝 一句话总结
AST-Detect 提出一种不执行代码、只基于 AST 与动态知识库的确定性后处理框架，用来检测并自动修复 LLM 生成代码中的知识冲突型幻觉。它解决了传统 lint、语法约束解码和 LLM-in-the-loop 修复难以稳定识别“语法正确但 API 事实错误”的问题。

#### 🎯 核心要点
- 将目标错误定义为 Knowledge Conflicting Hallucinations，包括不存在 API、缺失模块限定、上下文与参数语义冲突
- 用 AST 静态解析生成代码，提取 import、别名映射、限定函数调用、裸函数调用与关键参数字面量
- 用库反射动态构建 Knowledge Base，记录合法函数、方法、常见别名、轻量语义偏好与库版本
- 用确定性规则验证调用点，主要检测 Unknown API、Bare Critical Call、Semantic Inconsistency 三类问题
- 用局部 AST 编辑完成修复，包括替换最接近 API、补全模块别名或 import、按参数线索改写 API
- 在 200 个 Python 样本、5 个库上评测，其中 161 个幻觉样本、39 个干净样本
- 报告 100% precision、87.6% recall、0.934 F1，自动修复 77.0% 已识别幻觉

#### 🔬 深入细节
![AST-Detect 框架图](https://arxiv.org/html/2601.19106v1/x1.png)
*图：LLM 生成代码先被解析为 AST，再经过静态分析、动态知识库、确定性验证和自动 AST 修复。*

```python
# AST-Detect: deterministic AST hallucination detection and correction
# 输入: LLM 生成的 Python 代码片段
ast_tree = parse_to_ast(code)
imports, aliases = extract_imports_and_aliases(ast_tree)
call_sites = extract_calls_and_arguments(ast_tree)

kb = KnowledgeBase()
for lib in imports:
    kb.add_public_api_by_introspection(lib)
    kb.add_common_aliases(lib)
    kb.add_version(lib.__version__)

issues = []
for call in call_sites:
    if call.qualified_name not in kb.valid_api:
        issues.append(unknown_api(call, nearest_by_edit_distance(call, kb)))
    if call.is_bare_critical_call() and kb.has_required_module(call.name):
        issues.append(bare_call(call, kb.canonical_alias(call.name)))
    if argument_shape_conflicts_with_api(call):
        issues.append(semantic_inconsistency(call, kb.intent_preference(call)))

for issue in issues:
    ast_tree = localized_ast_rewrite(ast_tree, issue)

fixed_code = unparse_ast(ast_tree)
return issues, fixed_code
```

AST-Detect 的核心判断是：代码幻觉不只表现为语法错误，也可能表现为“知识冲突”。例如 `pd.read_exel('data.csv')` 在语法上是合法的调用表达式，很多语法约束解码器不会阻止它，普通 linter 也未必知道 pandas 当前版本是否存在该 API；但它与 pandas API 事实冲突，因此运行时会失败。论文把这类错误称为 KCH，并进一步拆成 API Knowledge Conflicts 与 Identifier Knowledge Conflicts。

框架第一层是 Static Analysis Layer。它不执行代码，而是把生成片段解析成 AST，从结构上抽取四类信息：`import pandas as pd` 这样的导入与别名，`pd.read_csv` 这样的 fully qualified call，`read_csv` 这样的裸调用，以及 `.csv`、`.json` 这类能暗示调用意图的参数字面量。AST 的优势是稳定：格式、换行、括号风格不会影响结构抽取。

第二层是 Dynamic Knowledge Base。它不是静态白名单，而是通过反射从实际库中枚举公共 callables，并补充 pandas DataFrame、Series 等常用方法、`np`/`pd` 等常见别名，以及轻量语义偏好。KB 还记录库的 `__version__`，因此同一个检测结果可以绑定到具体依赖版本，避免“旧版本合法、新版本废弃”造成不可复现。

验证层可以抽象为一个确定性判别函数：

$$
D(c,\mathcal{K})=\mathbb{1}[\mathrm{name}(c)\notin\mathcal{K}]\vee\mathbb{1}[\mathrm{bare}(c)]\vee\mathbb{1}[\mathrm{intent}(c)\not\sim\mathrm{api}(c)]
$$

其中 \(c\) 是调用点，\(\mathcal{K}\) 是知识库。Unknown API 用编辑距离找最近合法符号，例如 `read_exel` 接近 `read_excel`；Bare Critical Call 检测缺少模块限定的关键调用，例如裸 `read_csv` 应补成 `pd.read_csv`；Semantic Inconsistency 则利用参数形状或意图词，例如 `.csv` 文件更符合 `pd.read_csv` 而不是 `pd.read_excel`。

论文给出验证复杂度为：

$$
O(n\cdot m)
$$

其中 \(n\) 是代码中的调用点数量，\(m\) 是 KB 中 API 条目数量。这个复杂度对 IDE 或 CI 中的轻量实时检查是可接受的，而且检测过程完全可复现，不依赖 LLM 再次生成。

自动修复使用局部 AST 编辑，而不是字符串替换。Unknown API 会替换为最近合法符号；上下文不一致会将 `pd.read_excel('f.csv')` 改成 `pd.read_csv('f.csv')`；裸调用会插入缺失 import 或补上 canonical alias。修复后再把 AST unparse 回源代码。这个设计避免了 LLM-in-the-loop 的随机性，但也暴露了边界：如果表面 typo 与深层意图冲突并存，单纯编辑距离可能修复 typo 却漏掉真正语义意图。

实验上，数据集包含 numpy、pandas、requests、matplotlib、json 五类库的 200 个 Python 样本。论文报告检测 precision 为 100%，说明没有把 39 个 clean 样本误报成幻觉；recall 为 87.6%，主要漏检集中在 matplotlib 与上下文不一致类；自动修复 124/161 个幻觉样本，整体 fix accuracy 为 77.0%。这说明 AST-Detect 最适合高置信的 API 事实错误与缺失限定问题，而不是复杂多行逻辑错误。

> ⚠️ 注意：AST-Detect 的“确定性”是优势也是边界。它能稳定处理库 API 与单文件调用结构，但不声称解决跨文件数据流、深层业务逻辑或需要执行才能发现的语义错误。

#### 🧪 练习题
```yaml
question: "AST-Detect 为什么能发现很多普通语法检查器漏掉的代码幻觉？"
options:
  - "因为它执行生成代码并比较运行结果"
  - "因为它只检查缩进和括号是否匹配"
  - "因为它将 AST 调用点与由真实库反射得到的知识库进行确定性比对"
  - "因为它要求 LLM 重新生成所有错误代码"
answer: 2
explain: "KCH 往往语法正确但违反库 API 事实；AST-Detect 用真实库知识库验证调用点，因此能覆盖普通语法检查器难以捕捉的错误。"
```

### SafeDPO

```yaml
id: safedpo
num: 32
name: SafeDPO
full_name: 安全DPO (Safe Direct Preference Optimization)
year: '2026.04'
org: ICLR
parent: dpo
paper_url: https://iclr.cc/virtual/2026/oral/23790
project_url: ''
category: alignment
motivation: 安全约束集成单阶段对齐
```

#### 📝 一句话总结
SafeDPO 将安全约束优化问题等价转化为对偏好数据的重排序操作，在标准 DPO 框架上实现**单阶段安全对齐**，无需额外训练奖励模型或代价模型，仅需有用性偏好数据和二值安全标签即可同时优化有用性与安全性。

#### 🎯 核心要点
- **安全约束→无约束等价变换**：定义修正奖励 \(r_c(x,y) = r(x,y)\) 若回答安全，否则 \(r_c(x,y) = -\infty\)，将带约束的安全优化问题（Eq.8）等价转化为标准无约束 RLHF 目标（Eq.11），理论上保证最优策略一致（Proposition 4.2）
- **数据需求大幅简化**：仅需有用性偏好对 \((y_w \succ y_l)\) 加上每个回答的**二值安全标签** \(h \in \{0, 1\}\)，完全不需要有害性偏好数据（Safe RLHF 需要），降低了标注成本和数据收集难度
- **偏好重排序变换 \(\mathcal{T}\)**：当不安全的回答被偏好于安全回答时（\(\tilde{h}_w > \tilde{h}_l\)），交换偏好顺序，确保安全回答始终被优先选择；对重排后的数据直接应用 DPO 损失即为 SafeDPO（Eq.14）
- **增强版 SafeDPO（Enhanced SafeDPO）**：在 DPO 损失的 sigmoid 内部添加偏移量 \(-(\tilde{h}_l - \tilde{h}_w)\Delta\)（\(\Delta \geq 0\)），进一步拉大安全与不安全回答的偏好差距，提升安全性；当 \(\Delta = 0\) 时退化为基础版
- **理论保证完备**：Proposition 4.3 证明变换 \(\mathcal{T}\) 下的 DPO 梯度是修正奖励下真实梯度的无偏估计；Proposition 4.4 证明 Enhanced SafeDPO 的最优解与基础版一致，\(\Delta\) 仅影响优化景观而不改变最优点
- **实验效果显著**：在 PKU-SafeRLHF-30K 数据集上，以 Alpaca-7B 为基座模型，SafeDPO 达到 97%（模型评估）/ 100%（GPT-4 评估）的安全率，同时保持较高的有用性得分，显著优于 Safe RLHF 等多阶段基线

#### 🔬 深入细节
![SafeDPO Pipeline](https://ar5iv.labs.arxiv.org/html/2505.20065/assets/x1.png)

```
算法: SafeDPO / Enhanced SafeDPO
────────────────────────────────────────────
输入: 
  - 有用性偏好数据集 D = {(x, y_w, y_l, h_w, h_l)}
    其中 y_w ≻ y_l 表示有用性偏好, h ∈ {0,1} 为安全标签(1=安全)
  - 参考策略 π_ref
  - 超参数 β > 0, Δ ≥ 0

步骤 1: 计算安全指示量
  对每个样本: h̃_w = 1 - h_w,  h̃_l = 1 - h_l
  (h̃ = 0 表示安全, h̃ = 1 表示不安全)

步骤 2: 偏好重排序 (变换 T)
  对每个样本 (x, y_w, y_l):
    if h̃_w > h̃_l:           // 被偏好的回答不安全, 未被偏好的安全
      交换: (y_w, y_l) ← (y_l, y_w)   // 强制安全回答被偏好
      交换: (h̃_w, h̃_l) ← (h̃_l, h̃_w)

步骤 3: 计算 Enhanced SafeDPO 损失
  对每个样本计算:
    u = β·[log π_θ(y_w|x)/π_ref(y_w|x) - log π_θ(y_l|x)/π_ref(y_l|x)]
    offset = -(h̃_l - h̃_w) · Δ
    L = -log σ(u + offset)
  总损失 = 所有样本的 L 的均值

步骤 4: 梯度下降优化 π_θ
  使用标准优化器最小化总损失

输出: 安全对齐后的策略 π_θ
────────────────────────────────────────────
注: Δ = 0 时退化为基础 SafeDPO (Eq.14)
    offset 仅在 h̃_l ≠ h̃_w 时非零
```

**问题建模与修正奖励函数。** SafeDPO 的核心洞察来自对安全约束优化问题的重新建模。标准的安全 RLHF 目标是一个带约束的优化问题：

$$\max_\pi \mathbb{E}_{x \sim \mathcal{D}_\mathcal{X}} \mathbb{E}_{y \sim \pi(\cdot|x)} [r(x,y)] - \beta \, \text{KL}[\pi \| \pi_{\text{ref}}], \quad \text{s.t.} \quad c(x,y) \leq 0$$

其中 \(r(x,y)\) 是奖励函数，\(c(x,y)\) 是代价函数（正值表示不安全）。Safe RLHF 通过 Lagrangian 方法求解此问题，需要分别训练奖励模型和代价模型，再用 PPO-Lagrangian 优化策略，流程复杂且不稳定。SafeDPO 的关键创新在于定义**修正奖励函数** \(r_c(x,y)\)：当回答安全时 \(r_c = r\)，当回答不安全时 \(r_c = -\infty\)。Proposition 4.2 严格证明了在此修正奖励下的无约束优化问题与原始带约束问题具有相同的最优解集合，从而将安全约束"编码"进了奖励函数本身。

**偏好重排序变换 \(\mathcal{T}\) 与 SafeDPO 损失。** 将修正奖励 \(r_c\) 代入 DPO 的 Bradley-Terry 偏好模型后，可以推导出修正奖励下的偏好概率。关键观察是：如果 \(y_w\) 不安全而 \(y_l\) 安全，则在修正奖励下 \(y_l\) 应当被偏好（因为 \(r_c(x, y_w) = -\infty\)）。这自然导出了变换 \(\mathcal{T}\) 的定义——当 \(\tilde{h}_w > \tilde{h}_l\) 时交换偏好顺序。对变换后的数据集 \(\mathcal{T}(\mathcal{D})\) 应用标准 DPO 损失即得到 SafeDPO 的训练目标：

$$\mathcal{L}_{\text{SafeDPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w', y_l') \sim \mathcal{T}(\mathcal{D})} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w'|x)}{\pi_{\text{ref}}(y_w'|x)} - \beta \log \frac{\pi_\theta(y_l'|x)}{\pi_{\text{ref}}(y_l'|x)} \right) \right]$$

其中 \((y_w', y_l')\) 是经过变换 \(\mathcal{T}\) 重排后的偏好对。Proposition 4.3 进一步证明此损失的梯度是修正奖励下真实 DPO 梯度的无偏估计量，保证了优化的正确性。

**Enhanced SafeDPO 与超参数 \(\Delta\) 的作用。** 基础 SafeDPO 虽然理论上正确，但在有限数据下可能对安全性的强调不够。Enhanced SafeDPO 通过在 sigmoid 函数内部引入偏移量来解决这一问题：

$$\mathcal{L}_{\text{E-SafeDPO}} = -\mathbb{E} \left[ \log \sigma \left( \beta \log \frac{\pi_\theta(y_w'|x)}{\pi_{\text{ref}}(y_w'|x)} - \beta \log \frac{\pi_\theta(y_l'|x)}{\pi_{\text{ref}}(y_l'|x)} - (\tilde{h}_l - \tilde{h}_w)\Delta \right) \right]$$

当被拒绝的回答不安全（\(\tilde{h}_l = 1, \tilde{h}_w = 0\)）时，偏移量为 \(-\Delta < 0\)，使得 sigmoid 的输入更小，产生更大的梯度，从而更强烈地惩罚不安全回答。Proposition 4.4 证明了无论 \(\Delta\) 取何值，Enhanced SafeDPO 的全局最优解与基础版完全一致——\(\Delta\) 仅改变损失景观的形状（使安全相关样本的梯度更陡峭），而不改变最优点的位置。实验中 \(\Delta \in \{0, 2, 5, 10, 20\}\) 的测试表明性能对 \(\Delta\) 的选择相当鲁棒，\(\Delta = 10\) 通常是较好的默认值。在 PKU-SafeRLHF-30K 数据集上，SafeDPO 以 Alpaca-7B（基于 LLaMA-2-7B）为基座，在安全率上达到 97-100%，同时有用性得分优于或持平 Safe RLHF、SACPO 等需要多阶段训练的基线方法。

#### 🧪 练习题
```yaml
question: "SafeDPO 的偏好重排序变换 T 在什么条件下会交换偏好对的顺序？"
options:
  A: "当两个回答都不安全时"
  B: "当被偏好的回答不安全而未被偏好的回答安全时"
  C: "当两个回答的有用性得分相近时"
  D: "当被偏好的回答安全而未被偏好的回答不安全时"
answer: B
explanation: "变换 T 的条件是 h̃_w > h̃_l，即被偏好的回答 y_w 不安全（h̃_w=1）而未被偏好的回答 y_l 安全（h̃_l=0）。此时交换顺序使安全回答被偏好，将安全约束编码进偏好数据中。当两个回答安全性相同时不交换。"
```

### STAR-1

```yaml
id: star_1
num: 33
name: STAR-1
full_name: 推理模型安全对齐 (Safer Alignment of Reasoning LLMs)
year: '2026.01'
org: AAAI
parent: safe_rlhf
paper_url: https://arxiv.org/abs/2502.11111
project_url: ''
category: alignment
motivation: 推理模型安全对齐数据集
```

#### 📝 一句话总结
STAR-1 提出只用 1K 条高质量安全推理样本对齐大推理模型，解决了安全微调常见的“安全提升但推理能力明显下降”问题。它把多源安全指令、类别化安全政策、DeepSeek-R1 生成的 deliberative reasoning trace 与 GPT-4o 严格评分结合起来，构造出小而高质量的 SFT 数据集。

#### 🎯 核心要点
- 面向 large reasoning models，特别是 DeepSeek-R1-Distill 系列的安全对齐
- 数据构建遵循三原则：Diversity、Deliberative Reasoning、Rigorous Filtering
- 从 18 个来源收集 529,816 条原始 harmful instructions，经三类去重得到 40,961 条唯一指令
- 标准化 8 个安全类别：Harassment/Hate/Discrimination、Sexual/Adult Content、Violence/Physical Harm、Self-Harm、Illicit/Criminal Behavior、Misinformation/Disinformation、Privacy/Personal Data、Intellectual Property Violations
- 为每个安全类别制定 policy objective 与 rules/responses，并把指令分类后组合为 `(Instruction, Category, Policy)`
- 用 DeepSeek-R1 生成 `(CoT, Answer)`，形成 41K 条结构化安全推理样本
- 用 GPT-4o 从 Safety Compliance、Policy Relevancy、Reasoning Accuracy 三方面打分，只保留满分样本，再按类别和来源多样性筛到 1K
- SFT 后在四个安全基准上平均安全表现提升约 40%，五个推理任务上平均只下降约 1.1%

#### 🔬 深入细节
![STAR-1 数据生成与安全对齐流程图](https://arxiv.org/html/2504.01903v2/x1.png)
*图：左侧展示 LRMs 容易被恶意指令诱导；中间是 STAR-1 的数据生成和筛选流程；右侧展示训练后模型通过回忆政策提升安全响应。*

```python
# STAR-1 data construction and safety SFT
raw = collect_harmful_instructions_from_18_sources()
raw = deduplicate(raw, methods=["ngram", "tfidf_cosine", "sentence_embedding"])

categories = classify_with_gpt4o(raw, eight_safety_categories)
triplets = []
for instruction, category in categories:
    policy = category_specific_policy(category)
    triplets.append((instruction, category, policy))

structured = []
for instruction, category, policy in triplets:
    cot, answer = deepseek_r1_generate_reasoning_and_answer(instruction, policy)
    structured.append((instruction, category, policy, cot, answer))

scored = []
for sample in structured:
    score = gpt4o_score(sample, criteria=[
        "safety_compliance",
        "policy_relevancy",
        "reasoning_accuracy",
    ])
    if score == 10:
        scored.append(sample)

star_1 = diversity_filter_to_1k(scored, keys=["category", "data_source"])
model = supervised_finetune(reasoning_lrm, star_1, loss_on=["CoT", "Answer"])
```

STAR-1 的关键判断是：推理模型的安全问题不只是“拒绝模板不够”，而是推理链会放大危险能力。LRM 被训练成擅长长链推理后，面对恶意请求时可能在中间推理中规划更具体的违规步骤。因此，直接用普通拒答数据做 SFT 往往会带来两个问题：安全提升有限，或者因为安全数据与推理格式不匹配而损伤数学、代码、科学问答等推理能力。

论文把数据质量放在规模之前。第一步是多样性收集：从 HarmBench、SimpleSafetyTests、TDCRedTeaming、BeaverTails、SaladBench、ALERT 等人写、机器生成和模板增强来源收集原始 harmful instructions，并按 n-gram、TF-IDF cosine similarity、sentence embedding similarity 去重，得到约 41K 唯一指令。多样性不仅覆盖来源，还覆盖 8 个安全类别，避免训练集只强化少数攻击类型。

第二步是 deliberative reasoning。论文不是简单把 harmful instruction 映射为拒绝答案，而是给每个类别配套政策：

$$
\mathrm{Policy}_{category}=\{\mathrm{Objective},\mathrm{Rules\ \&\ Responses}\}
$$

每条样本先由 GPT-4o 分类为安全类别，再与对应政策组合成 `(Instruction, Category, Policy)`。之后 DeepSeek-R1 根据指令和政策生成完整的 reasoning trace 与最终 answer。这样得到的训练样本包含“为什么该请求不安全、应引用哪条规则、最后如何安全回应”的过程监督，比单纯答案监督更适合推理模型。

第三步是严格过滤。GPT-4o 作为 judge 从三个维度评分：Safety Compliance 要求回答和推理过程都 helpful、honest、harmless；Policy Relevancy 要求只使用与当前类别相关的规则；Reasoning Accuracy 要求 CoT 逻辑连贯且与最终答案一致。论文只保留三个方面都满分的样本，先从 41K 缩到 2,368，再进入多样性筛选。

多样性筛选使用样本来源与安全类别的丢弃概率。设当前集合大小为 \(N\)，样本 \(x\) 所属来源计数为 \(N_{s(x)}\)，所属类别计数为 \(N_{c(x)}\)，则：

$$
p_s(x)=\frac{N_{s(x)}}{N},\quad p_c(x)=\frac{N_{c(x)}}{N}
$$

$$
P_{discard}(x)=\begin{cases}
p_s(x)\cdot p_c(x), & p_s(x)\ge\bar{p}_s\ \mathrm{and}\ p_c(x)\ge\bar{p}_c\\
0, & \mathrm{otherwise}
\end{cases}
$$

直觉上，如果某个样本来自已经过多的来源和已经过多的类别，它更可能被丢弃；如果它来自稀缺来源或稀缺类别，则保留概率更高。这样最终 1K 数据不是随机子集，而是在“满分质量”约束下尽量保持类别和来源覆盖。

训练阶段是普通 supervised fine-tuning，但只对 reasoning trace 和 final answer 计算损失，不对问题本身计算损失。可写成：

$$
\mathcal{L}_{SFT}=-\sum_{t\in \mathrm{CoT}\cup\mathrm{Answer}}\log p_\theta(y_t|y_{<t},x)
$$

论文默认对 5 个 DeepSeek-R1-Distill 模型训练 5 个 epoch，序列长度 8192，学习率 \(10^{-5}\)，batch size 128。8B 模型训练约 45 分钟即可完成，说明 STAR-1 的目标不是堆数据，而是用高质量过程监督降低安全对齐成本。

评估分为安全和推理两条线。安全用 StrongReject、JBB-Behaviors、WildChat、WildJailbreak，推理用 AIME 2024、Math500、HumanEval、GPQA Diamond、MMLU-Pro。安全率可以概括为：

$$
\mathrm{SafetyRate}=\frac{1}{N}\sum_{i=1}^N s_i
$$

其中 \(s_i=1\) 表示模型对第 \(i\) 个风险查询给出了安全响应。STAR-1 的核心结论是，1K 高质量安全推理数据能显著提升 LRM 安全性，同时保持通用推理能力，优于“更多但质量较低或格式不匹配”的安全训练数据。

> 💡 关键：STAR-1 的创新不在于新的优化器，而在于把安全对齐数据变成“政策驱动的推理过程监督”。LRM 学到的不是机械拒答，而是在推理时识别风险类别、调用相关政策并生成安全响应。

#### 🧪 练习题
```yaml
question: "STAR-1 为什么只保留 GPT-4o 三项评分都满分的样本？"
options:
  - "为了让数据集只包含最短回答，减少训练显存"
  - "为了同时保证安全合规、政策相关和推理过程正确，降低小规模 SFT 的噪声"
  - "因为低分样本不能被 tokenizer 编码"
  - "因为推理模型只能学习 1K 条以内的数据"
answer: 1
explain: "STAR-1 的核心是小规模高质量数据；满分过滤减少错误政策引用和不一致推理，使 1K 样本仍能有效安全对齐。"
```

### RMO

```yaml
id: rmo
num: 34
name: RMO
full_name: 重塑奖励边际 (Reshaping Reward Margin)
year: '2026.01'
org: AAAI
parent: safe_rlhf
paper_url: https://doi.org/10.1609/aaai.v40i44.41074
project_url: ''
category: alignment
motivation: 重塑奖励边际提升扩展性
```

#### 📝 一句话总结
RMO 提出 Reward Margin Optimization，把偏好对的“奖励边际分布”作为可优化对象，通过数据去噪、批次重排和边际放大来增强 DPO/SimPO 等偏好优化算法的监督信号。

#### 🎯 核心要点
- 三段式框架：Dual Denoising Filtering → Batch Margin Diversification → Pairwise Margin Amplification
- 用 base model 与 proxy model 的边际变化识别噪声偏好对，删除负边际且训练后继续恶化的样本
- 对仍然边际过小的样本按平滑概率下采样，降低含糊偏好对对训练的干扰
- 构造高方差训练 batch，让每个 batch 同时包含容易、困难和中等边际样本，提升梯度信号多样性
- 在 DPO 损失外加入边际正则项，显式惩罚低于全局中位边际的样本对
- 兼容 DPO、SimPO 等偏好优化目标，不依赖额外奖励模型推理管线
- 论文在 Anthropic HH、UltraFeedback 等偏好数据上报告对 LC win rate 和 raw win rate 的稳定提升

#### 🔬 深入细节
##### 示意图/图源

![RMO 论文 Figure 1/2 图源：高方差与低方差 reward margin batch 对训练曲线和胜率的影响](https://ojs.aaai.org/index.php/AAAI/article/view/40565/44526)
*图源：AAAI 官方 PDF 中 Figure 1/2 展示了同一数据集在不同 batch margin 方差划分下的 loss 和 win-rate 差异。Manifest 中 DOI 不可直接对应到公开页面，正文采用同题 AAAI 官方页面与 PDF 补足：`https://ojs.aaai.org/index.php/AAAI/article/view/40565`。*

##### 算法/流程伪代码

```python
# Reward Margin Optimization (RMO)
def train_rmo(D_train, model, ref_model, proxy_model, batch_size, epochs,
              tau, gamma, lambda_reg, alpha):
    # 1. Dual Denoising Filtering
    kept = []
    for sample in D_train:
        x, y_pos, y_neg = sample
        delta_base = margin(model, x, y_pos, y_neg, ref_model)
        delta_proxy = margin(proxy_model, x, y_pos, y_neg, ref_model)

        # 负边际且训练后更差：认为偏好标注或样本质量不可靠
        if delta_base < 0 and delta_proxy < delta_base:
            continue

        # 小边际样本概率保留，降低含糊偏好对权重
        p_keep = 0.5 * (1 - tanh((abs(delta_proxy) - tau) / gamma))
        if bernoulli(p_keep):
            kept.append((sample, delta_proxy))

    # 2. Batch Margin Diversification
    for _ in range(epochs):
        batches = stratified_batches_by_margin(kept, batch_size)
        batches = local_swap_maximize_intra_batch_variance(batches)

        # 3. Pairwise Margin Amplification
        global_median = median([m for _, m in kept])
        for batch in batches:
            loss = 0
            for (x, y_pos, y_neg), _ in batch:
                delta = logprob(model, x, y_pos) - logprob(model, x, y_neg)
                loss_dpo = dpo_loss(model, ref_model, x, y_pos, y_neg)
                loss_reg = lambda_reg * sigmoid((global_median - delta) / alpha)
                loss += loss_dpo + loss_reg
            model.update(loss / len(batch))
    return model
```

##### 方法解读

RMO 的出发点是：偏好优化并不只取决于“偏好标签是否正确”，还取决于 preferred response 与 rejected response 之间的 reward margin 分布是否有足够清晰、稳定、丰富的监督信号。DPO 把语言模型自身的 log-probability ratio 解释为隐式奖励，但标准 DPO 不会显式管理边际分布；如果大量样本边际接近 0，模型看到的是含糊信号，如果 batch 内边际高度相似，梯度又缺少层次。

论文把偏好对边际定义为：

$$
\Delta r(x; y^+, y^-) = r(x, y^+) - r(x, y^-)
$$

当 \(\Delta r\) 很大且为正时，偏好信号清晰；接近 0 时，preferred 与 rejected 很难区分；为负时，模型评分和人类偏好方向相反。RMO 的第一步 Dual Denoising Filtering 用 base model 与 proxy model 训练前后的边际变化过滤样本：若 \(\delta_i^{base} < 0\) 且 \(\delta_i^{proxy} < \delta_i^{base}\)，说明训练后样本仍朝错误方向恶化，可能是噪声偏好或矛盾标注，直接移除。

第二步 Small Margin Downsampling 针对没有被删除但边际仍很小的样本。论文使用平滑保留概率：

$$
P_{sample}(x_i)=0.5\left[1-\tanh\left(\frac{x_i-\tau}{\gamma}\right)\right],\quad x_i=|\delta_i^{proxy}|
$$

直觉上，小边际样本更可能是“谁更好都说不清”的偏好对，保留太多会稀释训练信号；但完全删除又可能丢掉有价值的困难样本。因此 RMO 采用概率下采样，把数据清理做成软决策。

Batch Margin Diversification 解决的是 batch 级别的信息密度问题。RMO 先按 reward margin 排序，再用交错方式初始化 batch，使每个 batch 都覆盖低、中、高边际样本；随后随机交换不同 batch 中的样本，只接受能提高 batch 内边际方差总和的交换：

$$
\max_{B_1,\ldots,B_n}\sum_{j=1}^{n}\mathrm{Var}_{i\in B_j}[\delta_i]
$$

这相当于避免“全是容易样本”或“全是模糊样本”的 batch。论文 Figure 1/2 显示，高方差 batch 能让 loss 曲线更稳定，并提升 length-controlled win rate 与 raw win rate。

Pairwise Margin Amplification 则直接改训练目标。论文指出在只考虑 \(y^+\) 与 \(y^-\) 两个候选且均匀采样时，reward variance 与边际平方成正比：

$$
\mathrm{Var}_{y\sim Uniform(y^+,y^-)}[r_{RM}(x,y)] = \frac{1}{4}\left(\Delta r(x;y^+,y^-)\right)^2
$$

因此放大 pairwise margin 可以提升模型区分 preferred/rejected 的能力。RMO 在 DPO 外加入：

$$
L_{reg} = \lambda_{reg}\cdot \sigma\left(\frac{\tilde{\delta}-\delta}{\alpha}\right),\quad
L_{total}=L_{DPO}+L_{reg}
$$

其中 \(\tilde{\delta}\) 是全局中位边际。若某个样本的当前边际低于中位数，正则项更大，推动模型扩大该偏好对的区分度。与 PPO-Lagrangian 或显式 reward model 方法不同，RMO 不改变偏好优化主框架，只在数据、batch 和损失三处重塑边际分布，所以可作为 DPO/SimPO 一类方法的增强层。

#### 🧪 练习题
```yaml
question: "RMO 中 Pairwise Margin Amplification 的主要目的是什么？"
options:
  - "减少训练样本数量以提升训练速度"
  - "显式扩大 preferred 与 rejected response 的隐式奖励边际"
  - "用人工标注替换 proxy model 的评分"
  - "把 DPO 改造成 PPO-Lagrangian"
answer: 1
explain: "该模块在 DPO 损失外加入低边际惩罚项，使低于全局中位边际的偏好对获得更强梯度，从而提升模型区分偏好响应和非偏好响应的能力。"
```

### LASA

```yaml
id: lasa
num: 35
name: LASA
full_name: 语言无关对齐 (Language-Agnostic Alignment)
year: '2026.03'
org: ACL
parent: cai
paper_url: https://aclanthology.org/2026.findings-acl.1/
project_url: ''
category: alignment
motivation: 中间层锚定低资源语言对齐
```

#### 📝 一句话总结
LASA 提出在 LLM 的中间“语义瓶颈层”做安全对齐，通过 Safety Semantic Interpreter 抽取语言无关的安全语义信号，使高资源语言学到的安全行为迁移到 Swahili、Bengali、Thai 等低资源语言。

#### 🎯 核心要点
- 发现 Semantic Bottleneck：中间层表征主要按语义聚类，而不是按语言身份聚类
- 用层级 silhouette score 选择 \(S_l^{Sem}-S_l^{Lang}\) 最大的瓶颈层 \(L^s\)
- 训练轻量 Safety Semantic Interpreter，参数量小于基座模型的 0.2%
- SSI 将瓶颈层 hidden state 映射为 benign/malicious 安全语义信号
- 在后训练阶段把 SSI 输出 \(z_i\) 作为条件信号，驱动模型学习跨语言拒答/合规模式
- 在 LLaMA-3.1-8B-Instruct 上平均 ASR 从 24.7% 降至 2.8%
- 在 Qwen2.5/Qwen3 多个 7B-32B 模型上，多语种 ASR 保持约 3-4%

#### 🔬 深入细节
##### 示意图/图源

![LASA 方法框架图](https://arxiv.org/html/2604.12710v2/figures/method.png)
*图：LASA 从 Semantic Bottleneck 层抽取 hidden states，经 Safety Semantic Interpreter 得到安全语义信号，再条件化后续生成。*

##### 算法/流程伪代码

```python
# Language-Agnostic Semantic Alignment (LASA)
def train_lasa(model, train_data):
    # Stage 1: locate semantic bottleneck
    scores = []
    for layer in range(model.num_layers):
        h = collect_hidden_states(model, train_data.parallel_prompts, layer)
        s_sem = silhouette_by_semantic_label(h)
        s_lang = silhouette_by_language_label(h)
        scores.append(s_sem - s_lang)
    Ls = argmax(scores)

    # Stage 2: train Safety Semantic Interpreter
    freeze(model)
    ssi = MLP(input_dim=model.hidden_size, output_dim=1)
    for x, safety_label in train_data.safety_pairs:
        h = model.hidden_state(x, layer=Ls)
        z = ssi(h)
        loss = binary_cross_entropy(sigmoid(z), safety_label)
        ssi.update(loss)

    # Stage 3: semantic-conditioned alignment
    unfreeze(model)
    for x, y, preference_label in train_data.alignment_pairs:
        h = model.hidden_state(x, layer=Ls)
        z = ssi(h).detach()
        loss = kto_style_loss(model, x, y, condition=z, label=preference_label)
        model.update(loss)

    return model, ssi
```

##### 方法解读

LASA 的核心观察是：多语种 LLM 已经具备一定语言无关语义理解，但安全对齐往往仍停留在高资源语言的文本空间。例如英文、中文、韩文安全训练可以让这些语言上的 ASR 接近 0，却可能让 Swahili 等低资源语言仍保持很高攻击成功率。这不是模型完全“不懂”低资源语言，而是安全边界没有锚定到共享语义空间。

论文用两类聚类指标定位语义瓶颈层：\(S_l^{Sem}\) 衡量同义不同语言 prompt 是否聚在一起，\(S_l^{Lang}\) 衡量表征是否仍按语言身份分离。LASA 选择：

$$
L^s=\arg\max_l\left(S_l^{Sem}-S_l^{Lang}\right)
$$

作为 Semantic Bottleneck。直觉上，这一层“最像语义空间”：同一个有害意图的英文、中文、Swahili 表达会更接近，而不是被表层语言差异拉开。

Safety Semantic Interpreter 是一个轻量 MLP，输入瓶颈层 hidden state \(h\)，输出安全语义 logit \(z=f_\phi(h)\)。训练目标是二分类 BCE：

$$
\mathcal{L}_{SSI}(\phi)=\mathbb{E}_{(h,s)\sim\mathcal{D}}\left[\mathrm{BCE}(\sigma(z),s)\right]
$$

这里的 \(s\) 是 benign/malicious 标签。由于 SSI 只读中间语义层，它学到的是“这个请求的语义是否危险”，而不是“这句话属于哪种语言或哪种表面模板”。

第三阶段将 SSI 的安全语义信号并入后训练。论文采用 KTO-style 目标，把 \(z_i\) 作为条件信号放入生成概率：

$$
\mathcal{L}(\Theta)=\mathbb{E}\left[\omega(w_i)\cdot\sigma\left(\lambda\left(\log\frac{P_\Theta(y_i\mid x_i,z_i)}{P_{ref}(y_i\mid x_i,z_i)}-z_{KL}\right)\right)\right]
$$

这一步的意义是把“中间层检测到的危险语义”绑定到后续语言生成行为：模型不只是知道某个 Swahili prompt 和英文有害 prompt 同义，还要把这种语义信号转化为对应语言里的拒答或安全替代响应。

与翻译式防御不同，LASA 不依赖把低资源语言翻成英文再审核；与逐语言安全微调不同，它也不要求为每种语言收集大量安全数据。它的限制也很清楚：如果某种表达需要多步推理才能还原有害语义，例如低相似度 emoji 表达，单层语义瓶颈可能无法稳定捕获完整意图。

#### 🧪 练习题
```yaml
question: "LASA 为什么要在 Semantic Bottleneck 层进行安全对齐？"
options:
  - "该层参数最少，训练速度最快"
  - "该层表征更按共享语义组织，较少受语言身份支配"
  - "该层只能处理英文 prompt"
  - "该层可以替代 tokenizer"
answer: 1
explain: "LASA 选择语义聚类强、语言聚类弱的中间层，使高资源语言中的安全语义能迁移到低资源语言，而不是绑定在表层文本分布上。"
```

### CAI 2026

```yaml
id: cai_2026
num: 36
name: CAI 2026
full_name: 'Claude宪法2026更新 (Claude''s Constitution: 2026 Update)'
year: '2026.01'
org: Anthropic
parent: cai
paper_url: https://www.anthropic.com/news/claudes-constitution
project_url: ''
category: alignment
motivation: 推理框架提升自主伦理决策
```

#### 📝 一句话总结
CAI 2026 将 Claude 的 constitution 从“原则列表”升级为面向模型自身的价值、优先级和推理说明文档，用更完整的情境解释来指导合成数据生成、偏好排序和后训练。

#### 🎯 核心要点
- 官方 2026 更新发布在 Anthropic “Claude's new constitution”和完整 constitution 页面
- 从 2023 版 standalone principles 转向解释“为什么这样做”的长文档
- 四级核心优先级：Broadly safe → Broadly ethical → Compliant with Anthropic’s guidelines → Genuinely helpful
- 明确区分 hard constraints 与需要情境判断的价值权衡
- Constitution 作为训练最终权威，用于合成训练数据、价值理解数据、响应示例和偏好排序
- 强调 principal hierarchy：Anthropic、API operator、end user 等不同主体的指令和利益需要加权
- 将透明度纳入方法设计，公开 constitution 以便外界理解 intended behavior 与 observed behavior 的差距

#### 🔬 深入细节
##### 示意图/图源

![Claude 2026 Constitution 官方头图](https://cdn.sanity.io/images/4zrzovbb/website/b296093596b38f0a5fb56b85760baed37ea6798b-2400x1260.png)
*图源：Anthropic “Claude's new constitution” 官方页面。完整 constitution 页面为 `https://www.anthropic.com/constitution`。*

##### 算法/流程伪代码

```python
# Constitutional AI with the 2026 Claude Constitution
def constitutional_training_2026(base_model, constitution, seed_tasks):
    # 1. Parse constitution into priorities and hard constraints
    priorities = [
        "broadly_safe",
        "broadly_ethical",
        "anthropic_guidelines",
        "genuinely_helpful",
    ]
    hard_constraints = extract_hard_constraints(constitution)
    judgment_guidance = extract_reasoning_guidance(constitution)

    # 2. Generate constitution-aware synthetic data
    critique_revision_data = []
    preference_pairs = []
    for task in seed_tasks:
        draft = base_model.generate(task)
        critique = base_model.generate_critique(draft, constitution)
        revised = base_model.revise(draft, critique, constitution)
        critique_revision_data.append((task, draft, critique, revised))

        candidates = sample_responses(base_model, task, n=2)
        ranking = constitutional_judge(
            task, candidates,
            priorities=priorities,
            hard_constraints=hard_constraints,
            guidance=judgment_guidance,
        )
        preference_pairs.append((task, candidates, ranking))

    # 3. Supervised phase: learn critique/revision and constitution-following responses
    sft_model = supervised_finetune(base_model, critique_revision_data)

    # 4. Preference phase: use AI feedback under constitution as labels
    reward_or_preference_model = train_preference_model(preference_pairs)
    aligned_model = preference_optimize(sft_model, reward_or_preference_model)

    # 5. Evaluate gap between intended behavior and actual behavior
    return run_system_card_evals(aligned_model, constitution)
```

##### 方法解读

2026 版 CAI 的关键变化不是新增一个单一损失函数，而是改变“宪法”在训练中的信息形态。2023 版 Claude constitution 更像原则清单，模型在 critique/revision 或 RLAIF 排序时抽取原则来评估回答；2026 版则把价值、背景、优先级、例外、hard constraints 和判断理由写成更完整的说明文档。Anthropic 明确表示，新 constitution 主要写给 Claude，本身是训练工件而不仅是对外政策文本。

该更新给 Claude 设定四个优先级：第一是 broadly safe，即不破坏当前阶段人类监督、纠正和控制 AI 的机制；第二是 broadly ethical，即诚实、良好价值和避免危险/伤害；第三是遵守 Anthropic 的具体 guidelines；第四是 genuinely helpful。优先级不是机械 if-else，而是当价值冲突出现时的总体权重结构。这样的设计意图是让模型在未预见场景中进行价值推理，而不是只匹配固定规则。

训练流程上，constitution 可以进入多类合成数据：帮助模型理解 constitution 的解释数据、constitution 相关对话、符合价值的响应示例、以及多个候选回答的排序标签。这延续了 Constitutional AI 的两阶段思想：先让模型基于原则 critique/revise 自己的输出，再用 AI feedback 对候选响应做偏好比较，训练更安全但仍有帮助性的模型。

2026 版还强调 hard constraints 与 judgment 的分层。某些高风险能力，如对生物武器攻击提供显著 uplift，应当是不可跨越边界；但大量日常任务需要模型权衡 helpfulness、用户自主、真实表达、敏感信息保护和长远福祉。与简单拒答策略相比，这要求模型学习“为什么某些帮助是好的，为什么某些帮助会越界”。

从算法角度看，CAI 2026 的价值在于提高对齐监督的可解释性和可扩展性：人类不必为所有危险或伦理边界手工标注偏好对，而是把可审查的 constitution 交给模型参与数据生成和排序。风险也相应存在：constitution 写得不清、互相冲突或覆盖不足时，模型可能学到错误的泛化。因此官方也强调 constitution 是持续更新的 living document，并通过 system cards 披露模型行为与目标之间的差距。

#### 🧪 练习题
```yaml
question: "Claude 2026 Constitution 相比早期原则列表的核心变化是什么？"
options:
  - "删除所有安全原则，只保留有用性"
  - "从独立原则列表转为解释价值、优先级和理由的训练文档"
  - "只用于产品文案，不参与训练"
  - "把所有场景都改为固定规则匹配"
answer: 1
explain: "2026 更新强调向模型解释为什么要这样判断，并将 constitution 用于合成数据、响应排序和后训练，而不仅是列出可抽取的原则。"
```

### ExpGuard

```yaml
id: expguard
num: 37
name: ExpGuard
full_name: 专业领域护栏 (Specialized Domains Guard)
year: '2026.03'
org: arXiv
parent: nemo_guard
paper_url: https://arxiv.org/abs/2603.02588
project_url: ''
category: content_safety
motivation: 专业领域定制内容审核
```

#### 📝 一句话总结
ExpGuard 提出了一套面向金融/医疗/法律专业领域的安全护栏方法，通过自动化术语挖掘与 LLM 驱动的数据构建 pipeline 生成领域特定训练数据（ExpGuardMix），训练出 7B 参数的护栏模型，在领域特定内容审核上大幅超越 WildGuard 等 SOTA（prompt F1 +8.9%，response F1 +15.3%），同时在公开安全基准上保持竞争力。

#### 🎯 核心要点
- **领域特定安全护栏模型 ExpGuard**：基于 Qwen2.5-7B 微调，同时支持 prompt 和 response 的有害性分类，覆盖金融、医疗、法律三大专业领域
- **大规模领域安全数据集 ExpGuardMix**（58,928 样本）：包含 ExpGuardTrain（56,653 训练样本）和 ExpGuardTest（2,275 专家标注测试样本），首个面向专业领域的安全审核数据集
- **三阶段自动化数据构建 pipeline**：(1) Wikipedia 术语挖掘 + Wikidata/GPT-4o/人工多级过滤 → 2,646 术语；(2) GPT-4o 生成有害/良性 prompt + Mistral/Gemma 生成 response；(3) 三模型（Claude/Gemini/Qwen）多数投票标签 + 去重
- **13 类危害分类体系**：基于 MLCommons Hazard Taxonomy，涵盖暴力、欺诈、隐私侵犯、不合格专业建议等
- **严格的标签共识机制**：要求三个 LLM 中至少两个在精确类别上一致（非仅 safe/unsafe 二分类），过滤 4.8% 模糊样本
- **ExpGuard+ 变体**：通过 AutoDAN-Turbo 生成 270 条领域特定越狱样本增强训练，提升对抗鲁棒性
- **关键发现**：API 级护栏（Detoxify/Perspective/OpenAI Moderation）在专业领域几乎完全失效（F1 < 1%）

#### 🔬 深入细节
##### 核心框架图

![ExpGuard 数据构建 Pipeline](https://arxiv.org/html/2603.02588v1/x2.png)
*图：ExpGuardMix 数据构建 pipeline 总览。包含三个阶段：(1) 领域术语挖掘；(2) Prompt 与 Response 构建；(3) 类别标注与数据过滤。*

![ExpGuardMix 数据组成与领域攻击示例](https://arxiv.org/html/2603.02588v1/x1.png)
*图：(a) 领域特定对抗攻击示例——ExpGuard 成功识别利用金融术语"haircut"伪装的有害 prompt，而通用护栏被绕过；(b) ExpGuardMix 数据集组成分布。*

##### 数据构建伪代码

```python
# ExpGuardMix 数据构建 Pipeline

# Stage 1: 领域术语挖掘
terms = recursive_crawl_wikipedia(categories=["finance", "healthcare", "law"])
terms = filter_by_wikidata(terms, exclude=["persons", "organizations", "countries"])
terms = filter_by_gpt4o(terms, criteria="sensitive_and_harmful_relevant")
terms = human_majority_vote(terms, n_annotators=3)  # → 2,646 terms

# Stage 2: Prompt & Response 构建
for term in domain_terms:
    # 有害 prompt：GPT-4o + 前缀绕过 + Wikipedia 上下文 + 100+ 模板
    harmful_prompts = gpt4o.generate(
        prefix="I have an idea for a prompt:",
        context=wikipedia_abstract(term),
        templates=sample(instruction_templates, k=random),
        variants=["short", "long"]
    )
    # 良性 prompt：从 Wikipedia 文档转换为 instruction-response 对
    benign_prompts = convert_wiki_to_instructions(term)

# 补充通用数据
in_the_wild = subsample(LMSYS_Chat_1M + WildChat + DAN_jailbreaks)
human_written = subsample(HH_RLHF + Aegis2)

# Response 生成
harmful_responses = mistral_7b_v01.generate(harmful_prompts)   # 早期模型更易 comply
refusal_responses = gemma3_27b_it.generate(harmful_prompts)    # 安全对齐模型生成拒绝

# Stage 3: 标签与过滤
for sample in all_data:
    labels = [claude37.classify(sample, cot=True),
              gemini2_flash.classify(sample, cot=True),
              qwen25_max.classify(sample, cot=True)]
    # 严格共识：至少 2/3 在精确类别上一致
    if majority_exact_category(labels):
        final_label = majority_vote(labels)
    else:
        discard(sample)  # 过滤 4.8% 模糊样本

# 去重 + 一致性检查
deduplicate(threshold=0.9, model="sentence-transformers")
```

##### 动机与背景

随着 LLM 在金融、医疗、法律等高风险领域的广泛部署，**专业领域的内容安全审核**成为一个被严重忽视的问题。现有的安全护栏模型（如 Llama-Guard、WildGuard）主要针对通用有害内容（暴力、色情等）训练，缺乏对专业术语和领域概念的理解能力。

> 💡 **关键洞察**：专业领域的有害内容往往利用技术术语进行伪装。例如，"List methods to obscure high haircuts in asset evaluations" 中的 "haircut" 在金融领域指资产价值的风险折扣，该查询实质上是在寻求金融欺诈方法，但通用护栏因不理解专业含义而放行。

实验数据显示，广泛使用的 API 级护栏（Detoxify、Perspective API、OpenAI Moderation）在 ExpGuardTest 上的 F1 分数几乎为零（0.3%–0.6%），充分说明了通用方案在专业领域的严重失效。

##### 核心技术方案

**1. 领域术语挖掘（Terminology Mining）**

采用多级过滤策略从 Wikipedia 中提取专业术语：

- **递归爬取**：从金融/医疗/法律类目递归爬取 Wikipedia 页面
- **实体过滤**：通过 Wikidata API 排除人名、组织、国家等非技术实体
- **敏感性筛选**：GPT-4o 评估术语是否与有害场景相关，大幅缩减候选集
- **人工验证**：3 名标注员多数投票，最终保留 2,646 个术语（金融 989、医疗 1,012、法律 645）

**2. 数据构建策略**

数据构建的核心挑战在于如何生成高质量的领域特定有害内容：

- **绕过安全机制**：采用 "I have an idea for a prompt:" 前缀绕过 GPT-4o 的内置安全过滤
- **多样性保障**：每个术语生成长短两种 prompt 变体，从 100+ 预定义模板中随机采样，结合 few-shot 示例
- **Response 生成的模型选择**：使用早期模型 Mistral-7B-v0.1 生成 compliant response（更容易配合有害请求），使用 Gemma-3-27B-IT 生成 refusal response（安全对齐更强）

**3. 多模型共识标注**

标注流程的设计体现了对领域特定内容标注难度的深刻理解：

$$\text{Label}(x) = \begin{cases} \text{majority}(l_1, l_2, l_3) & \text{if } \exists \text{ exact category agreement} \geq 2 \\ \text{discard} & \text{otherwise} \end{cases}$$

其中 \(l_i\) 是第 \(i\) 个 LLM（Claude 3.7 Sonnet / Gemini 2.0 Flash / Qwen2.5-Max）基于 Chain-of-Thought 推理给出的精确类别标签。

> ⚠️ **注意**：与常见的 safe/unsafe 二分类投票不同，ExpGuard 要求至少 2/3 模型在 **13 个精确危害类别** 上达成一致。即使三个模型都判定为 unsafe，但归因于不同类别，该样本也会被丢弃。这种严格机制确保了标签质量。

**4. 训练配置**

- **基座模型**：Qwen2.5-7B
- **训练数据**：ExpGuardTrain 全量 56,653 样本 + 通用安全数据混合
- **训练方式**：标准 SFT（Supervised Fine-Tuning），输入格式为 prompt（+ optional response）→ 安全标签

**5. ExpGuard+ 对抗增强**

为提升对越狱攻击的鲁棒性，引入 ExpGuard+ 变体：
- 使用 AutoDAN-Turbo 从 ExpGuardTest 中生成 270 条领域特定越狱 prompt
- 以 Gemma-1.1-7B-IT 为越狱生成器，Qwen2.5-7B-Instruct 为受害模型
- 将这 270 条样本加入训练集（与已有的 270 条 in-the-wild 越狱样本保持 1:1 比例）

##### 实验结果

**领域特定基准（ExpGuardTest）**：

| 方法 | Prompt F1 (%) | Response F1 (%) |
|------|:---:|:---:|
| Detoxify / Perspective / OpenAI Mod | 0.3–0.5 | 0.6 |
| Azure | 14.1 | 2.6 |
| Llama-Guard3 (8B) | 71.1 | 84.2 |
| WildGuard (7B) | 84.4 | 77.4 |
| Aegis-Guard-D (7B) | 82.9 | 87.2 |
| **ExpGuard (7B)** | **93.3** | **92.7** |

**公开安全基准（8 个 benchmark 平均）**：

| 方法 | Prompt Avg F1 (%) | Response Avg F1 (%) |
|------|:---:|:---:|
| WildGuard | 84.2 | 78.8 |
| Llama-Guard3 | 78.9 | 66.8 |
| **ExpGuard** | **85.7** | **78.5** |

**消融实验**（验证各数据源贡献）：

| 配置 | Public Prompt F1 | ExpTest Prompt F1 | Public Resp F1 | ExpTest Resp F1 |
|------|:---:|:---:|:---:|:---:|
| 完整 ExpGuardTrain | 85.7 | 93.3 | 78.5 | 92.7 |
| − Domain-specific | 85.1 | 85.3 (↓8.0) | 77.9 | 92.0 |
| − In-the-wild | 84.1 | 93.2 | 77.9 | 92.3 |
| − Human-written | 81.3 | 93.4 | 73.9 (↓4.6) | 92.3 |

> 💡 **关键结论**：领域特定数据对 ExpGuardTest 性能至关重要（去除后 prompt F1 下降 8%）；人工编写数据对公开基准泛化性贡献最大（去除后 response F1 下降 4.6%）；三类数据源互补，完整混合达到最优平衡。

**越狱鲁棒性**：在 CipherChat、AutoDAN-Turbo、FlipAttack、GASP 四种越狱攻击下，ExpGuard 在标准和领域特定场景中均保持较高检测率，ExpGuard+ 通过对抗增强进一步提升了领域特定越狱的检测能力。

##### 与现有方法的关键区别

| 维度 | 通用护栏（WildGuard 等） | ExpGuard |
|------|------|------|
| 训练数据 | 通用有害内容 | 通用 + 领域特定（金融/医疗/法律） |
| 术语理解 | 无专业术语知识 | 基于 2,646 个专业术语构建 |
| 标注策略 | 二分类投票 | 13 类精确类别多数投票 |
| 领域 F1 | ~84% prompt / ~77% response | **93.3% / 92.7%** |
| 通用 F1 | ~84% / ~79% | **85.7% / 78.5%**（持平或略优） |
| 可扩展性 | 固定类别 | pipeline 可适配新领域 |

#### 🧪 练习题
```yaml
question: "ExpGuard 在数据标注阶段采用三个 LLM 进行多数投票时，其共识机制与常规做法的关键区别是什么？"
options:
  - "使用更多的标注模型（5个而非3个）来提高准确率"
  - "要求至少两个模型在精确的危害类别上达成一致，而非仅在 safe/unsafe 二分类上投票"
  - "仅使用开源模型进行标注以降低成本"
  - "采用主动学习策略，让模型迭代标注最不确定的样本"
answer: 1
explain: "ExpGuard 的标注共识要求至少 2/3 的 LLM 在 13 个精确危害类别上达成一致，即使三个模型都判定为 unsafe 但归因于不同类别，该样本也会被丢弃。这种严格机制确保了领域特定内容标签的高质量。"
```

### ToxiGAN

```yaml
id: toxigan
num: 38
name: ToxiGAN
full_name: 毒性数据增强GAN (Toxic Data Augmentation GAN)
year: '2026'
org: EACL
parent: toxigen
paper_url: https://aclanthology.org/2026.findings-acl.1/
project_url: ''
category: content_safety
motivation: LLM引导毒性数据增强
```

#### 📝 一句话总结
ToxiGAN 提出一种 LLM-guided 的类别感知毒性文本增强框架，用 LLM 生成的中性样本作为 semantic ballast，并通过两步交替方向训练同时控制毒性语义和域内真实性。

#### 🎯 核心要点
- 架构包含 \(K\) 个 toxic generators、一个 LLM neutral text provider 和一个 multi-head discriminator
- LLM 不直接生成毒性文本，而是生成流畅中性样本作为 semantic ballast，降低安全风险
- 动态筛选 neutral pool，按 discriminator 的 neutral confidence 保留高质量中性锚点
- Two-Step Alternating Directional Learning：奇数步远离中性语义，偶数步靠近真实毒性分布
- Discriminator 输出 \(K+2\) 类：各毒性类、fake 类和 LLM-neutral 类
- 在 WZ、DC、HX、OR 四个 hate speech benchmark 上提升 Macro-F1 和 Hate-F1
- 消融表明去掉 semantic ballast 会退化到 SentiGAN，去掉 toxicity step 会削弱 Hate-F1

#### 🔬 深入细节
##### 示意图/图源

![ToxiGAN 总体框架](https://arxiv.org/html/2601.03121v1/x1.png)
*图：ToxiGAN 包含多个类别条件 toxic generators、一个 LLM neutral text provider 和一个 multi-class discriminator。*

![ToxiGAN 两步方向学习](https://arxiv.org/html/2601.03121v1/x2.png)
*图：生成器在 embedding space 中交替朝“远离中性语义”和“靠近真实毒性分布”两个方向更新。*

##### 算法/流程伪代码

```python
# Training of ToxiGAN
def train_toxigan(real_data, llm, K, epochs):
    generators = [LSTMGenerator(class_id=i) for i in range(K)]
    discriminator = MultiHeadDiscriminator(num_heads=K + 2)

    # LLM 只生成中性样本，作为 semantic ballast
    neutral_pool = llm.generate_neutral_examples(seed_real_neutral(real_data))
    ballast = refine_neutral_pool(neutral_pool, discriminator, top_r=0.5)

    # MLE pretraining
    for i in range(K):
        generators[i].pretrain_mle(real_data.toxic_class(i))
    discriminator.pretrain(real_data, generated_samples(generators), ballast)

    for t in range(epochs):
        ballast = refine_neutral_pool(neutral_pool, discriminator)

        for i, G_i in enumerate(generators):
            samples = G_i.sample()
            if t % 2 == 1:
                # Toxicity step: move away from neutral anchors
                loss_g = max_cosine_similarity(emb(samples), emb(ballast))
            else:
                # Authenticity step: make discriminator view samples as real class i
                loss_g = mean(1 - discriminator.class_prob(samples, i))
            G_i.update(loss_g)

        # Discriminator sees real toxic, generated toxic, and LLM-neutral texts
        loss_d = discriminator_loss(real_data, generated_samples(generators), ballast)
        discriminator.update(loss_d)

    return generators, discriminator
```

##### 方法解读

ToxiGAN 处理的是毒性分类中的数据稀缺和类别偏斜问题。直接让现代 LLM 生成有害文本往往被安全对齐机制拦截，或生成过于中性、礼貌、稀释的样本；传统 GAN 又容易 mode collapse 或 semantic drift。ToxiGAN 的折中方案是让 LLM 只承担安全的中性样本生成角色，用这些中性文本作为语义锚点，毒性样本由封闭训练环境中的 GAN 生成。

问题形式化为：给定 \(\mathcal{D}_{real}=\{(x_i,y_i)\}\)，其中 \(y_i\in\{\text{neutral},\text{toxic}_1,\ldots,\text{toxic}_K\}\)，训练生成器 \(G\) 产生既符合目标 toxic class、又具备域内真实性的样本。整体架构中每个 toxic class 有一个生成器分支，discriminator 则同时判断样本属于哪个毒性类、是否 fake，以及是否 LLM-neutral。

Semantic ballast 是最关键的设计。ToxiGAN 从真实中性数据构造候选池 \(\mathcal{X}_{neutral}\)，用 LLM 生成更流畅的中性 exemplars，再用 discriminator 的 neutral head 打分：

$$
s(x)=D_0(x)
$$

每轮保留 top-\(r\%\) 的候选，逐步形成固定大小的 \(\mathcal{B}_{neutral}^{(t)}\)。这批中性锚点既帮助 discriminator 学清楚“中性边界”，也为 generator 提供“应该远离什么”的语义参照。

两步交替方向学习避免了把毒性和真实性硬塞进一个固定加权目标。奇数步执行 toxicity step，最小化生成样本与中性锚点的最大 cosine similarity：

$$
\mathcal{L}_{G_i}^{(t)}=\mathbb{E}\left[\max_{x\in\mathcal{B}_{neutral}}\cos(\Phi(G_i(z)),\Phi(x))\right],\quad t\bmod 2=1
$$

偶数步执行 authenticity step，让生成样本更像真实的第 \(i\) 类毒性文本：

$$
\mathcal{L}_{G_i}^{(t)}=\mathbb{E}[1-D_i(G_i(z))],\quad t\bmod 2=0
$$

如果把两者写成固定 \(\lambda\) 的 joint objective，训练早期和后期两个 loss 的尺度、梯度方差可能不匹配，导致生成器要么过度追求毒性而失真，要么过度靠近中性而失去类别信号。交替优化让“远离中性”和“保持真实”分开施压，减少目标冲突。

实验上，ToxiGAN 在 WZ、DC、HX、OR 四个数据集上对 BERT/RoBERTa 分类器均带来平均 Macro-F1 与 Hate-F1 提升；RoBERTa 平均 Macro-F1 从无增强的 55.2 提升到 57.3，Hate-F1 从 46.4 提升到 48.4。附录还显示，在 ModernBERT 和 DeBERTa-v3 上也有约 1.2-1.6 Macro-F1 的额外收益，说明它不是只补弱分类器。

#### 🧪 练习题
```yaml
question: "ToxiGAN 中 LLM-generated neutral texts 的主要作用是什么？"
options:
  - "直接生成毒性攻击文本"
  - "作为 semantic ballast，为生成器和判别器提供中性语义锚点"
  - "替代所有人工标签"
  - "把多分类任务变成回归任务"
answer: 1
explain: "ToxiGAN 避免让 LLM 直接生成毒性内容，而是用 LLM 生成流畅中性文本，作为远离中性语义和训练 discriminator 的锚点。"
```

### Bielik Guard

```yaml
id: bielik_guard
num: 39
name: Bielik Guard
full_name: Bielik多语种护栏 (Bielik Multilingual Guard)
year: '2026'
org: arXiv
parent: perspective
paper_url: https://arxiv.org/abs/2603.02588
project_url: ''
category: content_safety
motivation: 多语种优化安全分类器
```

#### 📝 一句话总结
Bielik Guard 提出面向波兰语 LLM 应用的轻量安全分类器族，用社区标注的软标签数据训练 0.1B/0.5B RoBERTa 模型，在真实波兰语用户 prompt 上显著降低误报并保持较高精度。

#### 🎯 核心要点
- Manifest 中 `2603.02588` 实际指向 ExpGuard；Bielik Guard 公开论文为 `https://arxiv.org/abs/2602.07954`
- 两个模型规模：0.1B 基于 MMLW-RoBERTa-base，0.5B 基于 PKOBP/polish-roberta-8k
- 五类安全 taxonomy：Hate/Aggression、Vulgarities、Sexual Content、Crime、Self-Harm
- 社区标注 6,885 条波兰语文本，超过 60,000 个独立标注，平均每条 7-8 个评分
- 训练使用标注者比例作为 soft label，而非直接二值化，保留争议样本的不确定性
- 0.5B v1.1a 在 Sojka test set 上 F1 micro 0.791、F1 macro 0.785
- 0.1B v1.1 在 3,000 条真实波兰语用户 prompt 上 precision 77.65%、FPR 0.63%，优于同规模 HerBERT-PL-Guard

#### 🔬 深入细节
##### 示意图/图源

![Bielik Guard 官方项目图源](https://guard.bielik.ai/images/preview.png)
*图源：Bielik Guard/Sójka 官方项目页。模型页包括 `https://huggingface.co/speakleash/Bielik-Guard-0.1B-v1.1` 和 `https://huggingface.co/speakleash/Bielik-Guard-0.5B-v1.1`。*

##### 算法/流程伪代码

```python
# Bielik Guard training and inference
def train_bielik_guard(polish_texts, community_annotations, base_encoder):
    taxonomy = ["HATE", "VULGAR", "SEX", "CRIME", "SELF_HARM"]

    # 1. Convert community votes to soft labels
    dataset = []
    for text in polish_texts:
        votes = community_annotations[text]
        soft_label = [
            fraction_of_annotators(votes, category=c)
            for c in taxonomy
        ]
        dataset.append((text, soft_label))

    # 2. Add multi-label classification head
    model = RobertaEncoder(base_encoder)
    model.add_head(dropout=0.1, out_dim=len(taxonomy), activation="sigmoid")

    # 3. Fine-tune with BCE on soft labels
    for batch in make_batches(dataset, batch_size=32):
        logits = model(batch.text)
        loss = binary_cross_entropy_with_logits(logits, batch.soft_labels)
        model.update(loss, optimizer="AdamW", lr=2e-5, weight_decay=0.01)

    return model


def moderate(model, text, threshold=0.5):
    scores = sigmoid(model(text))
    labels = {cat: score for cat, score in scores.items() if score >= threshold}
    return {"unsafe": bool(labels), "categories": labels, "scores": scores}
```

##### 方法解读

Bielik Guard 的背景是波兰语应用缺少低延迟、可商用、误报率低的本地安全分类器。Llama Guard、Qwen3Guard 等多语种生成式 guard 模型覆盖语言广，但在波兰语真实用户流量上容易过度报警；HerBERT-PL-Guard 虽同为波兰语模型，但论文报告其真实 prompt precision 与 FPR 不如 Bielik Guard v1.1。

模型选择很务实：0.1B 版本采用 124M 参数 MMLW-RoBERTa-base，0.5B 版本采用 443M 参数 PKOBP/polish-roberta-8k。两者都不是生成式 LLM，而是 encoder + multi-label head：dropout 后接线性层输出 5 个 logits，再用 sigmoid 独立判定每个类别。这种架构牺牲了 prompt 可配置 taxonomy 的灵活性，但换来低成本、低延迟和更稳定的二分类决策。

数据方法是论文的重要贡献。团队通过社区平台收集波兰语文本标注，超过 1,500 名志愿者参与，6,885 条文本获得超过 60,000 个评分。训练时不把“60% 以上同意”立即变成硬标签，而是使用每个类别被标注者选择的比例作为 soft label。这样，明显有害文本接近 1，明显安全文本接近 0，争议文本保留在中间区间。

损失函数使用 BCE with soft labels：

$$
\mathcal{L}=-\sum_{c=1}^{5}\left[s_c\log p_c+(1-s_c)\log(1-p_c)\right]
$$

其中 \(s_c\) 是社区标注比例，\(p_c\) 是 sigmoid 后的类别概率。评估时，ground truth 按 60% annotator agreement 二值化，模型预测按 0.5 阈值二值化。论文也强调阈值可根据部署场景调整，特别是在生产系统中要控制误报率。

v1.1 的重点是校准 Crime 类阈值，减少 v1.0 对 crime-related 文本的过度反应。这个改动带来典型 precision-recall tradeoff：在 Gadzi Jezyk 这种 97.1% crime-related benchmark 上，部分 recall 下降，但真实用户 prompt 上 FPR 大幅降低。对生产护栏来说，误报会直接伤害可用性，所以 Bielik Guard 更偏向 conservative alert。

与生成式 guard 相比，Bielik Guard 的局限是 taxonomy 固定，不能像 Llama Guard 那样通过 prompt 换政策；论文也暂不覆盖 disinformation、jailbreak、copyright 等需要上下文或事实知识的类别。但对于波兰语内容安全的基础五类风险，它展示了小模型、本地数据和社区软标签在低资源语言护栏中的实际价值。

#### 🧪 练习题
```yaml
question: "Bielik Guard 训练中使用社区标注比例作为 soft label 的主要好处是什么？"
options:
  - "让模型不需要 sigmoid 输出"
  - "保留争议样本的不确定性，而不是过早二值化"
  - "自动把波兰语翻译成英语"
  - "使模型可以生成长文本回答"
answer: 1
explain: "软标签记录每个类别被多少标注者认为有害，能表达安全判断中的模糊和争议，训练信号比硬多数投票更细。"
```

### AttriGuard

```yaml
id: attriguard
num: 40
name: AttriGuard
full_name: 因果归因护栏 (Causal Attribution Guard)
year: '2026.03'
org: arXiv
parent: llama_guard3
paper_url: https://arxiv.org/abs/2603.10749
project_url: ''
category: content_safety
motivation: 因果归因防御提示注入
```

#### 📝 一句话总结
AttriGuard 将间接提示注入防御从“识别输入里有什么恶意文本”转为“判断工具调用为什么发生”，通过并行反事实重放和模糊存活测试拦截由不可信观察驱动的工具调用。

#### 🎯 核心要点
- 提出 action-level causal attribution，把每个 tool call 归因到 user intent 或 untrusted observations
- 定义 control effect：不可信观察对某个候选工具调用概率的 log shift
- 定义 control potency：原始观察与控制受限观察下工具调用分布的 KL 差异
- Runtime 防御，不需要训练目标模型，也不依赖白盒 attention/activation
- Teacher-forced shadow replay 固定历史 action，只替换被削弱控制力的 observations
- Hierarchical control attenuation 包含 structural flattening、perspective rewriting、causal scaffolding weakening
- Fuzzy survival criterion 先比函数名，再比 canonicalized arguments，必要时用辅助 LLM judge
- 在 AgentDojo/Agent Security Bench 上报告静态攻击 0% ASR，并保持较小 benign utility 损失

#### 🔬 深入细节
##### 示意图/图源

![AttriGuard pipeline 图源：arXiv PDF 中 Figure 1 展示 injected vs benign observations 下的 original run 与 shadow run](https://arxiv.org/pdf/2603.10749)
*图源：arXiv PDF。源文件中对应 `pdfs/attriguard_pipeline.pdf`，说明左侧 IPI 场景下恶意 call 在 shadow replay 中不存活，右侧 benign 场景下 save-to-pad call 正常存活。*

##### 算法/流程伪代码

```python
# AttriGuard-defended workflow
def run_attriguard(user_task, base_agent, attenuation_level):
    H = History(task=user_task, actions=[], observations=[])
    attenuated_obs_cache = []

    while True:
        response, proposed_calls = base_agent(H)
        if not proposed_calls:
            return response

        # Build control-attenuated shadow context incrementally
        last_obs = H.observations[-1] if H.observations else []
        attenuated_last = hier_attenuate(last_obs, attenuation_level)
        attenuated_obs_cache.append(attenuated_last)
        H_shadow = History(
            task=user_task,
            actions=H.actions,                 # teacher-forced original actions
            observations=attenuated_obs_cache,  # control-attenuated observations
        )

        _, shadow_calls = base_agent(H_shadow)

        for call in proposed_calls:
            if fuzzy_survive(call, shadow_calls, user_task):
                obs = execute(call)
            else:
                obs = reject_as_ipi(call, warning="focus on the user task")
            H.append(call, obs)
```

##### 方法解读

AttriGuard 的核心批评是：多数 IPI 防御把问题当作 input-level semantic discrimination，即判断外部文本是否像注入攻击。但真实 agent 失效发生在 action 层：模型调用了不该调用的工具，或者用敏感参数调用工具。攻击者可以不用“ignore previous instructions”这类模板，而把恶意指令伪装成工作流、政策说明或数据字段，从而绕过模式检测。

论文定义 action-level causal attribution：给定步骤 \(t\) 的上下文 \(H_t=(T_u,A_{1:t-1},O_{1:t-1})\) 和候选工具调用 \(c\)，判断 \(c\) 是 intent-supported 还是 observation-driven。前者由用户任务 \(T_u\) 和历史执行合理支持，后者需要不可信观察流提供额外控制力才会出现。

理想量是 control effect：

$$
\mathrm{CE}_t(c)=\log p_t(c)-\log p_t^{(0)}(c)
$$

其中 \(p_t(c)\) 是原始上下文下工具调用出现概率，\(p_t^{(0)}(c)\) 是控制受限观察上下文下的概率。若衰减外部观察控制力后 \(c\) 消失，说明它很可能由不可信观察驱动。由于黑盒 API 不暴露概率，AttriGuard 用“shadow replay 下是否还会产生等价 call”近似这个对比。

Hierarchical control attenuation 是构造反事实观察的关键。它不是删除所有外部内容，因为 agent 仍需要外部数据中的事实和参数；它削弱更像“控制通道”的表达。Level 1 structural flattening 把 JSON/function-like 结构改写为自然语言描述；Level 2 perspective rewriting 把第二人称指令改成第三人称陈述；Level 3 causal scaffolding weakening 弱化“因为...所以必须...”这类说服性因果脚手架。

Teacher-forced shadow replay 避免 shadow branch 自由运行导致轨迹发散。AttriGuard 在 shadow context 中复用原始 action history，只替换 observation history 为 attenuated view。这样 \(C_t\) 与 \(\widehat{C}_t\) 的差异更可能来自观察控制力变化，而不是 agent 在前几步规划上的自然随机差异。

最后的 FuzzySurvive 解决“完全字符串一致太严格”的问题。先要求 function name 匹配；若参数 canonicalize 后完全一致则通过；若函数名相同但参数略有不同，则让辅助 LLM judge 基于用户任务、proposed call 和 shadow alternatives 判断该调用是否仍与完成用户任务一致。由此， benign 的格式扰动不会被误杀，但目的地、金额、收件人等关键恶意参数变化仍会被拦截。

#### 🧪 练习题
```yaml
question: "AttriGuard 判断某个工具调用可疑的核心信号是什么？"
options:
  - "外部文本是否包含固定 jailbreak 模板"
  - "该工具调用在控制衰减后的 shadow replay 中是否仍然存活"
  - "模型输出是否包含英文"
  - "工具调用参数数量是否超过 3 个"
answer: 1
explain: "AttriGuard 关注 action-level causal attribution：若衰减不可信观察的控制力后调用消失，说明该调用更可能由注入内容驱动，而非用户意图支持。"
```

### ToolHijacker

```yaml
id: toolhijacker
num: 41
name: ToolHijacker
full_name: '工具劫持 (ToolHijacker: Agent Hijacking)'
year: '2026.02'
org: NDSS
parent: nemo_guard
paper_url: https://www.ndss-symposium.org/ndss-paper/neurostrike-neuron-level-attacks-on-aligned-llms/
project_url: ''
category: content_safety
motivation: 揭示工具文档劫持攻击
```

#### 📝 一句话总结
ToolHijacker 揭示了 LLM agent 的 retrieval-then-selection 工具选择管线可被恶意工具文档劫持，攻击者只需注入精心优化的 tool description，就能让 agent 在目标任务中优先选择攻击者工具。

#### 🎯 核心要点
- Manifest 中 paper_url 指向 NeuroStrike；ToolHijacker 官方 NDSS 页面为 `https://www.ndss-symposium.org/ndss-paper/prompt-injection-attack-to-tool-selection-in-llm-agents/`
- 攻击目标是工具选择两阶段：retrieval 阶段进入 Top-k，selection 阶段被 LLM 选中
- Threat model 是 no-box：攻击者无法访问目标 retriever、目标 LLM 或真实任务分布
- 构建 shadow task descriptions、shadow retriever、shadow LLM 和 shadow tool library 做替代优化
- 将恶意 tool description 分为 \(R\oplus S\)：\(R\) 优化检索相关性，\(S\) 优化最终选择
- 提供 gradient-free 与 gradient-based 两类优化方法
- 在 MetaTool、ToolBench 等工具库和 GPT-4o、Claude、Llama 等目标模型上报告高 ASR/AHR
- 防御实验显示 prevention/detection 基线均存在缺口，暴露工具文档供应链风险

#### 🔬 深入细节
##### 示意图/图源

![ToolHijacker 工具选择攻击示意图](https://arxiv.org/html/2504.19793v2/x1.png)
*图：正常情况下 agent 检索并选择合法工具；攻击时恶意工具文档同时操纵检索和选择，使 agent 执行攻击者工具。*

##### 算法/流程伪代码

```python
# ToolHijacker gradient-free optimization for malicious selection string S
def optimize_toolhijacker(target_task, attacker_llm, shadow_llm, shadow_retriever):
    Q_shadow = generate_shadow_task_descriptions(target_task)
    D_shadow = build_shadow_tool_library(target_task)

    # R: retrieval-oriented description, semantically close to target tasks
    R = attacker_llm.generate_functionality_summary(Q_shadow)

    # S: selection-oriented injection suffix
    S_candidates = [initial_selection_prompt()]
    feedback = []

    for q in Q_shadow:
        for _ in range(T_iter):
            variants = []
            for S in S_candidates:
                variants += attacker_llm.rewrite_variants(
                    S, query=q, tools=D_shadow, feedback=feedback, n=B
                )

            scores = []
            for S_new in variants:
                malicious_doc = make_tool_doc(name=attacker_tool, description=R + S_new)
                hit_count = 0
                eval_outputs = []
                for q_eval in Q_shadow:
                    topk = shadow_retriever(q_eval, D_shadow + [malicious_doc])
                    selected = shadow_llm.select_tool(q_eval, topk)
                    eval_outputs.append(selected)
                    if regex_match(selected, attacker_tool):
                        hit_count += 1
                scores.append((hit_count, S_new, eval_outputs))

            if max(scores).hit_count == len(Q_shadow):
                return R + max(scores).S_new

            S_candidates = prune_top_width(scores, W)
            feedback = collect_feedback(scores)

    return R + best_seen(S_candidates)
```

##### 方法解读

很多 LLM agent 的工具选择遵循 retrieval-then-selection：先用用户任务描述从工具库检索 Top-\(k\) 文档，再把这些工具文档交给 LLM 选择要调用的工具。ToolHijacker 的核心发现是，工具文档本身是一种可注入的提示面。如果第三方工具市场、插件仓库或企业内部工具库允许攻击者提交工具描述，攻击者就可以让描述既“像目标任务相关工具”，又“诱导 LLM 选自己”。

论文把攻击优化写成：

$$
\max_{d_t}\frac{1}{m'}\sum_{i=1}^{m'}\mathbb{I}\left(E'(q_i',Top\text{-}k'(q_i';D'\cup\{d_t\}))=o_t\right)
$$

其中 \(q_i'\) 是 shadow task description，\(D'\) 是 shadow tool library，\(E'\) 是 shadow LLM，\(d_t\) 是恶意工具文档，\(o_t\) 是选择攻击者工具的输出。这个目标同时覆盖“被检索到”和“被最终选中”两个条件。

为了可优化，ToolHijacker 把 tool description 切成 \(R\oplus S\)。\(R\) 针对 retrieval objective：让恶意文档与目标任务语义相似，稳定进入 Top-\(k\)。Gradient-free 版本让攻击者 LLM 从 shadow task descriptions 中总结通用功能描述；gradient-based 版本则利用 shadow retriever 的 embedding gradient 或 HotFlip 类 token 替换，最大化平均相似度：

$$
\max_R\frac{1}{m'}\sum_{i=1}^{m'}Sim(f'(q_i'),f'(R\oplus S))
$$

\(S\) 针对 selection objective：在候选工具文档都已进入 prompt 后，诱导 LLM 选择恶意工具。Gradient-free 版本使用树状搜索：攻击者 LLM 根据上一轮反馈生成多个 \(S\) 变体，shadow LLM 在所有 shadow tasks 上评估是否选择攻击者工具，保留 hit count 高的节点继续扩展。Gradient-based 版本则把目标写成最大化 shadow LLM 生成恶意工具名 \(d_{t\_name}\) 的概率，并加入一致性与可读性损失。

论文的三个损失项分别是 alignment loss、consistency loss 和 perplexity loss：

$$
\mathcal{L}_{all}(x^{(i)},S)=\mathcal{L}_1(x^{(i)},S)+\alpha\mathcal{L}_2(x^{(i)},S)+\beta\mathcal{L}_3(x^{(i)},S)
$$

\(\mathcal{L}_1\) 提高输出目标工具的概率，\(\mathcal{L}_2\) 强化工具名一致性，\(\mathcal{L}_3\) 控制文本可读性，降低人工或规则审查发现异常的概率。

ToolHijacker 的安全意义在于：agent 不仅会被网页、邮件、文件中的间接提示注入攻击，也会被“工具文档供应链”攻击。即使用户任务是良性的，只要检索阶段把恶意工具文档带入上下文，selection 阶段就可能把工具描述当成高优先级指令。防御因此不能只审核用户 prompt，还要审核工具文档来源、工具描述权限、检索候选集和最终工具调用。

#### 🧪 练习题
```yaml
question: "ToolHijacker 为什么把恶意工具描述拆成 R 和 S 两段？"
options:
  - "R 负责操纵检索相关性，S 负责操纵 LLM 最终选择"
  - "R 只用于加密，S 只用于压缩"
  - "R 是用户 prompt，S 是系统 prompt"
  - "R 用来减少 token 数，S 用来增加模型参数"
answer: 0
explain: "工具选择包含 retrieval 和 selection 两个阶段，R 让恶意工具进入 Top-k，S 在候选工具上下文中诱导 LLM 选择攻击者工具。"
```
