### LLaMoCo：优化代码指令微调 (Llamoco)
```yaml
id: llamoco
name: Llamoco
full_name: 优化代码指令微调 (Llamoco)
year: "2026.01"
org: Peking University
paper_url: https://ieeexplore.ieee.org/abstract/document/11359290/
category: frontier
parent: flan_t5
motivation: 减少代码生成特征层面混淆
```

#### 📝 一句话总结
LLaMoCo 提出面向优化问题代码生成的指令微调框架，把“给定优化问题描述，生成可执行优化器代码”建模为 code-to-code SFT，并用对比学习 warm-up 缓解同一问题多种描述与不同优化器标签之间的表示混淆。它解决了直接 prompt LLM 充当优化器时效率低、prompt 敏感、缺少领域优化知识的问题。

#### 🎯 核心要点
- 首个面向 optimization code generation 的 LLM instruction-tuning 框架，让通用 Code LLM 生成专门求解优化问题的 Python 优化器代码。
- 输入不是历史解序列，而是格式化问题 prompt，包含目标函数、变量维度、边界、约束等 Python/LaTeX 描述。
- 输出是可执行优化器实现，来自对算法池中多类优化器的基准测试和超参数搜索。
- 构造大规模优化指令集：合成无约束和有约束优化实例，覆盖 unimodal/multimodal、separable/non-separable、smooth/non-smooth 等 landscape。
- 引入两阶段训练：先做 contrastive warm-up 对齐同义问题 prompt 的潜在表示，再做常规 next-token / sequence-to-sequence 指令微调。
- 对比 warm-up 用“是否对应同一最优优化器”定义正负样本，减少特征层面混淆并加速后续 SFT 收敛。
- 使用 balanced data sampling 缓解优化器类别长尾，避免模型只学习出现频次最高的优化器家族。
- 在 CodeGen-Mono 350M、Phi、Code Llama 等基础模型上验证，CodeGen-Mono 经 LLaMoCo 微调后在合成和真实优化问题上可超过 GPT-4 Turbo 等直接 prompting 基线。

#### 🔬 深入细节

![LLaMoCo 概念总览](https://arxiv.org/html/2403.01131v1/x1.png)
*图：论文 Figure 1 对比三类范式。左侧是反复要求 LLM 生成更好解的 solution-to-solution，中央是直接 prompt 生成优化器代码，右侧是 LLaMoCo：先用问题-优化器代码指令集微调，再一次性生成优化器程序。*

LLaMoCo 的出发点是：LLM 可以被当成优化器，但直接让它在对话中不断提出更好解会非常低效。OPRO 一类方法需要把当前最优解、历史候选解和目标值放进上下文，随着变量维度和迭代次数增加，上下文窗口和 token 成本都会成为瓶颈。另一类方法直接让 LLM 写一个 optimizer program，推理轮数少得多，但 prompt 往往需要包含问题类型、推荐算法、实现细节等专家 hint，否则生成代码容易不稳定。LLaMoCo 的判断是：这些 domain-specific optimization knowledge 不应每次靠 prompt 临时注入，而应通过 instruction tuning 固化到模型参数中。

论文把优化问题抽象为：

$$
\min_{\mathbf{x}\in\mathbb{R}^{d}} f(\mathbf{x})
\quad \text{s.t.}\quad g_i(\mathbf{x})\le 0,
\; h_j(\mathbf{x})=0,
\; \ell \le \mathbf{x}\le u.
$$

在数据构造阶段，作者先建立基本函数集合和约束集合，再通过 composition 与 hybrid 两种方式合成不同 landscape。composition 是对多个基本函数做线性组合，hybrid 则把决策变量维度拆成若干片段，让不同基本函数作用在不同子空间后求和。这样得到的问题覆盖多峰、非可分、非光滑、局部平坦等性质，更接近真实优化任务。随后，系统从算法池中为每个实例搜索表现最好的优化器及超参数，算法池覆盖 evolutionary algorithms、differential evolution、particle swarm optimization、evolution strategies、Bayesian optimization、local search、numerical optimization 等家族；最终把“问题 prompt”作为输入，把“选中优化器的 Python 实现”作为输出。

LLaMoCo 的关键不是简单收集 prompt-code pair，而是处理“描述和优化器标签之间的非一一对应”。同一个数学问题可以被学生用 Python 代码、LaTeX 公式、不同变量命名、不同约束顺序描述；这些 prompt 文本表面差异很大，但应该生成同一个优化器。反过来，两个表面相近的函数描述可能因为约束、维度或 landscape 细节不同，最合适的优化器完全不同。如果直接 SFT，模型在 token 级损失中很难先学会“同义问题描述聚在一起、不同优化策略分开”，这就是任务清单中所说的特征层面混淆。

论文用 contrastive warm-up 先塑造表示空间。对 decoder-only code model，取最后一个 self-attention block 的输出 embedding 作为 prompt 表示 \(\mathbf{z}\)。两个 prompt 的距离可用余弦距离表示：

$$
D(\mathbf{z}_i,\mathbf{z}_j)=1-\frac{\mathbf{z}_i^{\top}\mathbf{z}_j}{\|\mathbf{z}_i\|\|\mathbf{z}_j\|}.
$$

若两个 prompt 对应同一个 selected optimizer，则它们是正样本，训练目标让距离变小；若对应不同 optimizer，则它们是负样本，目标让距离至少大于 margin \(m\)：

$$
\mathcal{L}_{\mathrm{con}}(i,j)=
\mathbb{1}[a_i=a_j]D(\mathbf{z}_i,\mathbf{z}_j)^2
+
\mathbb{1}[a_i\ne a_j]\max(0,m-D(\mathbf{z}_i,\mathbf{z}_j))^2.
$$

这里 \(a_i\) 表示第 \(i\) 个 prompt 通过 benchmark 选出的目标优化器。warm-up 不生成完整代码，所以比 SFT 阶段便宜；它的作用是先把 optimization semantics 编码到 latent space，再让 next-token loss 学习具体代码实现。

```python
# LLaMoCo 两阶段训练伪代码
# P: 优化问题实例集合；A: 优化器算法池；M: 代码语言模型
instruction_set = []

for problem in synthesize_optimization_problems(P):
    candidates = []
    for optimizer in A:
        best_cfg = grid_search(optimizer, problem)
        score = benchmark(optimizer, best_cfg, problem)
        candidates.append((score, optimizer, best_cfg))

    best_optimizer, best_cfg = select_best(candidates)
    prompt_variants = rephrase_as_python_or_latex(problem)
    code = render_optimizer_code(best_optimizer, best_cfg)

    for prompt in prompt_variants:
        instruction_set.append({
            "input": format_prompt(prompt),
            "output": code,
            "optimizer_label": best_optimizer.name,
        })

# Phase 1: contrastive warm-up
for batch in balanced_sample(instruction_set):
    z = M.encode_prompt(batch.input)
    loss_con = contrastive_loss(z, batch.optimizer_label)
    update(M, loss_con)

# Phase 2: instruction tuning
for batch in balanced_sample(instruction_set):
    logits = M(batch.input, batch.output_prefix)
    loss_sft = cross_entropy(logits, batch.output)
    update(M, loss_sft)
```

> 💡 关键：LLaMoCo 学的不是“某个优化算法的固定模板”，而是从问题结构映射到优化器选择与实现代码的条件生成能力。

balanced data sampling 解决的是另一个实际问题：某些优化器可能在大量合成实例上表现最好，而少数 optimizer 只适合特定 landscape。如果按原始频次采样，模型会过度偏向头部优化器，即使遇到适合长尾优化器的问题也生成常见模板。论文采用近似按 optimizer 类别均衡的采样概率，让每个训练 epoch 中各优化器主导的样本数更接近。这个设计与对比 warm-up 配合：warm-up 需要高质量正负样本，均衡采样能让 mini-batch 中有足够多的 minority optimizer 表示，避免表示空间被头部类别压扁。

推理时，用户只需按照协议描述优化问题，模型一次前向生成 optimizer code，再运行该程序求解问题。由于不再进行 solution-to-solution 多轮搜索，token 开销大幅下降；由于输出是程序而非单个解，它对问题规模更友好；由于优化器知识来自离线 benchmark 和 SFT，用户也不需要在 prompt 里手工指定“应该用 DE、PSO 还是 CMA-ES”。论文用 code error rate、code recovery cost、optimization performance、computational overhead 四类指标评估，覆盖代码可执行性、修复成本、求解质量和 token/计算开销。

与 FLAN-T5 式通用指令微调相比，LLaMoCo 的特色在于任务空间高度结构化：输入的“指令”不是自然语言问答，而是数学/代码形式的优化问题；输出也不是解释文本，而是可执行优化器代码。与普通 code SFT 相比，它又多了 optimization algorithm selection 这层监督信号，因为同一个目标函数可能适合不同算法。两阶段训练因此非常必要：先用对比学习让模型把问题语义和优化器类别对应起来，再让 SFT 学具体 API、控制流、边界处理和约束处理。

论文的局限也清晰：数据构造依赖算法池和基准测试，若算法池缺少某类现实优化器，模型不可能凭空学会；合成 landscape 虽然多样，但仍可能覆盖不到工业问题中的离散结构、噪声目标、昂贵黑箱评估和复杂约束。尽管如此，LLaMoCo 展示了一个可复用范式：对需要专业程序生成的领域，不只收集代码答案，还要把“如何选方法”的专家搜索过程蒸馏进指令数据，并用表示学习降低同义描述造成的混淆。

#### 🧪 练习题
```yaml
question: "LLaMoCo 中 contrastive warm-up 的核心目的是什么？"
options:
  - "把对应同一优化器的问题 prompt 表示拉近，把对应不同优化器的 prompt 表示推远"
  - "让模型在推理时进行更多轮对话，以提高搜索次数"
  - "替代优化器算法池，完全不需要 benchmark 选择标签"
  - "只训练 tokenizer，使代码长度更短"
answer: 0
explain: "LLaMoCo 的 warm-up 先塑造问题 prompt 的潜在表示空间，缓解同一问题多种描述和不同优化器标签之间的特征混淆，再进入常规代码指令微调。"
```
