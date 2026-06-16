### STAR-1：推理模型安全对齐 (Safer Alignment of Reasoning LLMs)
```yaml
id: star_1
name: STAR-1
full_name: 推理模型安全对齐 (Safer Alignment of Reasoning LLMs)
year: "2026.01"
org: AAAI
paper_url: https://arxiv.org/abs/2502.11111
category: alignment
parent: safe_rlhf
motivation: 推理模型安全对齐数据集
```

> 论文定位说明：任务元信息中的 `paper_url` 指向四值译码器论文；本文按算法名 STAR-1 对应的论文 **STAR-1: Safer Alignment of Reasoning LLMs with 1K Data** 精读，实际可访问版本为 `https://arxiv.org/abs/2504.01903`。

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
