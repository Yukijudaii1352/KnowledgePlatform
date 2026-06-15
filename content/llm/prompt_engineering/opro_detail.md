### OPRO：提示优化 (OPRO)
```yaml
id: opro
name: OPRO
full_name: 提示优化 (OPRO)
year: '2024'
org: Google DeepMind
paper_url: https://proceedings.iclr.cc/paper_files/paper/2024/hash/3339f19c5fcee3ad74502947a32be9e6-Abstract-Conference.html
category: optimization
parent: ape
motivation: LLM作为优化器迭代提升提示词
```

#### 📝 一句话总结
OPRO 把历史候选解和分数写进 meta-prompt，让 LLM 根据“哪些方案得分高”继续提出更好的解，从而把语言模型本身用作黑盒优化器。

#### 🎯 核心要点
- 用自然语言描述优化问题、历史解和对应分数
- LLM 读取优化轨迹后生成下一批候选解或候选 prompt
- 每轮用外部目标函数评估新候选，再把结果追加回 meta-prompt
- 适用于数学优化，也适用于任务 prompt 的自动改写
- 在 GSM8K、BBH 等任务上可找到超过人工 prompt 的指令
- 成败取决于历史排序呈现、探索约束、评价噪声和上下文长度

#### 🔬 深入细节
![OPRO 工作流示意图](https://arxiv.org/html/2309.03409v3/x3.png)
*图源：arXiv HTML Figure 2，展示 LLM 根据历史解-分数对迭代生成新解。*

```python
# OPRO 黑盒优化伪代码
def opro_optimize(problem_description, initial_solutions, optimizer_llm, objective, rounds=10):
    history = [(objective(sol), sol) for sol in initial_solutions]
    for _ in range(rounds):
        meta_prompt = render_meta_prompt(
            problem=problem_description,
            scored_solutions=sorted(history, reverse=True),
            instruction="Propose new solutions with higher scores.",
        )
        proposals = optimizer_llm.generate_list(meta_prompt)
        for sol in proposals:
            history.append((objective(sol), sol))
        history = keep_top_and_diverse(history, limit=50)
    return max(history, key=lambda pair: pair[0])[1]
```

OPRO 的基本假设是：LLM 不只会执行 prompt，也能从历史样本中归纳“什么样的解更好”。当 meta-prompt 中列出若干候选解及其分数后，模型会倾向于模仿高分解的结构，同时尝试新的变体。这把优化过程转化为上下文学习，而不是显式梯度下降。

用于 prompt 优化时，候选解就是自然语言指令，目标函数通常是验证集准确率。每轮 LLM 看到过去 prompt 的得分，生成更可能提升指标的新 prompt；外部评估器再给出真实分数。与 APE 的一次性 generate-and-rank 相比，OPRO 明确利用了历史轨迹，具有迭代爬坡能力。

meta-prompt 的组织方式很关键。高分样本通常按分数排序展示，以便模型学习趋势；同时需要保留一定低分或多样样本，避免搜索过早塌缩。候选解数量、温度、历史窗口大小都会影响探索与利用的平衡。

OPRO 的强项是通用：只要能把目标函数评价结果写成文本，它就能尝试优化。但它不是数学意义上有收敛保证的优化器；上下文长度限制、评价噪声、分数泄漏和验证集过拟合都会影响最终 prompt。实际使用时通常要配合独立测试集确认泛化。

#### 🧪 练习题
```yaml
question: "OPRO 中 LLM 扮演的核心角色是什么？"
options:
  - "仅作为固定分类器"
  - "读取历史解和分数后提出新的候选解"
  - "直接反向传播更新目标模型"
  - "删除低分样本以外的所有上下文"
answer: 1
explain: "OPRO 把优化轨迹写进 meta-prompt，让 LLM 基于历史表现生成下一轮候选。"
```
