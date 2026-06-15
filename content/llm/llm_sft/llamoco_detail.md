### Llamoco
```yaml
id: llamoco
name: Llamoco
full_name: 优化代码指令微调 (Llamoco)
year: '2026.01'
org: Peking University
paper_url: https://ieeexplore.ieee.org/abstract/document/11359290/
category: frontier
parent: flan_t5
motivation: 减少代码生成特征层面混淆
```

#### 📝 一句话总结
LLaMoCo 提出面向优化代码生成的指令微调框架，把“优化问题描述 -> 优化器代码”作为 code-to-code 任务，并在 SFT 前用对比学习 warm-up 减少相似/不相似问题在表示空间中的混淆。

#### 🎯 核心要点
- 构建优化问题到优化器实现的指令集，输入是 Python/LaTeX 风格问题描述，输出是有效优化算法代码。
- 通过大规模 benchmarking 和超参数搜索，为每个问题实例选择表现较好的优化器及配置作为监督答案。
- 使用 23 类优化器组成算法池，覆盖 GA、DE、PSO、ES、贝叶斯优化、局部搜索和数值优化等家族。
- 训练采用两阶段策略：先用 contrastive warm-up 对齐问题提示的隐空间，再进行标准 next-token instruction tuning。
- 使用 balanced data sampling 缓解某些优化器过度主导训练集的问题，使少数优化器知识也被学习到。

#### 🔬 深入细节
![LLaMoCo 概念总览](https://arxiv.org/html/2403.01131/x1.png)
*图源：arXiv HTML Figure 1。LLaMoCo 从“逐步找解”转向“给定问题直接生成优化器代码”的 instruction-tuned optimizer generator。*

```python
# LLaMoCo 训练伪代码
algorithm_pool = collect_optimizers(families=["GA", "DE", "PSO", "ES", "BO", "local_search"])
instruction_set = []

for problem in synthetic_and_realistic_problems:
    best_code = None
    best_score = -inf
    for optimizer in algorithm_pool:
        for config in grid_search(optimizer.hyperparams):
            score = benchmark(optimizer, config, problem)
            if score > best_score:
                best_score = score
                best_code = render_python_code(optimizer, config)
    for prompt_variant in rephrase_problem(problem, formats=["python", "latex"]):
        instruction_set.append((prompt_variant, best_code))

# Phase 1: contrastive warm-up
for batch in balanced_batches(instruction_set):
    reps = model.encode_prompts(batch.prompts)
    loss = contrastive_loss(reps, same_answer=batch.optimizer_id, margin=phi)
    update_model(loss)

# Phase 2: instruction tuning
for prompt, code in balanced_batches(instruction_set):
    loss = causal_lm_loss(model, prompt, code)
    update_model(loss)
```

LLaMoCo 解决的是“让 LLM 生成优化器代码”而不是普通代码补全。传统做法要么让 LLM 迭代提出下一步解，要么通过 prompt 让 LLM 直接写优化器，但这两类方法对 prompt 很敏感，且缺少领域知识沉淀。LLaMoCo 把优化器生成变成监督学习任务：问题描述是输入，经过 benchmark 验证的优化算法代码是输出。

指令集构建分两步。第一步是 knowledge gathering：对每个优化问题，在算法池里进行细粒度超参数搜索，选出表现最好的 optimizer/configuration，并把它渲染成 Python 代码。第二步是 prompt diversity：把同一个问题用不同 Python/LaTeX 写法表达，生成多个输入变体。这样同一个优化器答案可以对应形式差异很大的问题描述。

这种数据会带来表示混淆：两个文本差异很大的 prompt 可能需要同一个优化器，而两个表面相似的 prompt 可能应该输出不同优化器。为此，LLaMoCo 在 SFT 前加入 contrastive warm-up，把“共享同一目标优化器”的 prompt 表示拉近，把目标优化器不同的 prompt 表示推远。距离函数基于最终 self-attention block 的表示余弦距离：

$$
G(q_m,q_n)=\frac{1}{2}\left(1-\frac{\vec{o}(q_m)\cdot\vec{o}(q_n)}
{\|\vec{o}(q_m)\|\|\vec{o}(q_n)\|}\right)
$$

对比损失为：

$$
L_{\text{cl}}=
\begin{cases}
G(q_m,q_n), & a_m=a_n \\
\max(0,\varphi-G(q_m,q_n)), & a_m\neq a_n
\end{cases}
$$

数据采样同样关键。由于某些优化器在大量问题上表现最好，直接 SFT 会让模型偏向常见算法，忽视少数但必要的 optimizer。论文采用近似按 optimizer 均衡的采样概率：

$$
\rho(q,a)=\frac{1}{N_a\times N_{q,a}}
$$

其中 \(N_a\) 是算法池大小，\(N_{q,a}\) 是选择优化器 \(a\) 的样本数。这样每轮训练中不同优化器家族更均衡，减少输出坍缩到少数常见模板。

> 💡 关键：LLaMoCo 的创新点不是“让 LLM 写代码”本身，而是把优化领域知识先通过 benchmark 固化成监督答案，再用对比 warm-up 处理问题描述与目标优化器之间的多对一/近似混淆关系。

#### 🧪 练习题
```yaml
question: "LLaMoCo 中 contrastive warm-up 的主要目的是什么？"
options:
  - "压缩模型参数"
  - "让语义等价且目标优化器相同的 prompt 在隐空间中更接近"
  - "替代后续指令微调"
  - "让所有优化问题都使用同一个算法"
answer: 1
explain: "warm-up 用对比损失处理 prompt 形式和目标优化器之间的错位，帮助后续 SFT 更快收敛并减少代码生成混淆。"
```
