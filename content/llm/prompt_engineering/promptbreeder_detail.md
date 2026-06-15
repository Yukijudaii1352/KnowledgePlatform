### PromptBreeder：提示词繁殖 (PromptBreeder)
```yaml
id: promptbreeder
name: PromptBreeder
full_name: 提示词繁殖 (PromptBreeder)
year: '2023.09'
org: DeepMind
paper_url: https://arxiv.org/abs/2309.16797
category: optimization
parent: ape
motivation: 进化算法实现提示词自我演化
```

#### 📝 一句话总结
PromptBreeder 将提示词和“如何变异提示词的提示词”一起放入进化循环，让任务 prompt 与 mutation prompt 共同演化，自动产生更适配任务的指令。

#### 🎯 核心要点
- 使用遗传算法维护 prompt population，而不是一次性生成候选
- 每个个体通常包含 task prompt 与 mutation prompt
- task prompt 决定模型如何解题，mutation prompt 决定下一代如何改写 task prompt
- 通过随机训练批次上的任务表现作为 fitness
- 采用锦标赛选择、交叉、变异和自指式变异提升多样性
- 相比 APE，更强调长期搜索和元提示词的自我改进

#### 🔬 深入细节
![PromptBreeder 总览](https://arxiv.org/html/2309.16797/x1.png)
*图源：arXiv HTML Figure 1，展示 population、task prompt、mutation prompt 与评估循环。*

```python
# PromptBreeder 进化式提示优化伪代码
def promptbreeder(task, init_prompts, init_mutators, evaluate, generations=20):
    population = [(p, m) for p in init_prompts for m in init_mutators]
    for _ in range(generations):
        fitness = {unit: evaluate(task_prompt=unit[0], batch=sample_batch(task))
                   for unit in population}
        parents = tournament_select(population, fitness)

        children = []
        for prompt, mutator in parents:
            new_prompt = llm_generate(mutator, prompt, task.description)
            new_mutator = maybe_mutate_mutator(mutator, task.description)
            children.append((new_prompt, new_mutator))

        population = elitism(population, children, fitness)
    return best_unit(population, evaluate)[0]
```

PromptBreeder 的新意在于把优化器的一部分也文本化。普通 prompt 搜索只优化 task prompt；PromptBreeder 还让 mutation prompt 参与进化。也就是说，系统不仅在学“怎样提示模型做这个任务”，还在学“怎样生成更好的提示改写”。这构成了一个自指式的元优化循环。

每一代的 fitness 来自任务验证批次。为了控制成本，论文使用随机 batch 估计 prompt 表现，再通过锦标赛选择保留高分个体。变异算子可以直接改写 task prompt，也可以改写 mutation prompt；后者会改变后续搜索的方向，使搜索策略本身逐渐适配任务域。

这种方法特别适合 prompt 空间高度非凸、难以手工枚举的场景。进化算法保留了多个候选分支，避免过早收敛到单一措辞；而 LLM 生成的变异又比字符级或词级随机扰动更语义化，通常能产生仍然可读、可执行的候选 prompt。

PromptBreeder 的代价是评估成本高于单轮 APE，并且需要设计 population size、选择压力、变异比例等超参数。它的优势在于长期自适应：如果初始 prompt 较弱，只要评估信号足够可靠，系统仍可能通过多代变异找到任务专用指令。

#### 🧪 练习题
```yaml
question: "PromptBreeder 与普通候选 prompt 搜索最主要的区别是什么？"
options:
  - "它只使用人工写好的 prompt"
  - "它同时进化任务提示词和用于变异提示词的元提示词"
  - "它必须微调目标语言模型"
  - "它不需要任何任务评分"
answer: 1
explain: "PromptBreeder 的个体包含 task prompt 和 mutation prompt，后者让搜索策略本身也能进化。"
```
