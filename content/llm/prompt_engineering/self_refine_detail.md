### Self-Refine: 自我精炼 (Self-Refine)
```yaml
id: self_refine
name: Self-Refine
full_name: 自我精炼 (Self-Refine)
year: '2023.03'
org: CMU/Allen AI
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/91edff07232fb1b55a505a9e9f6c0ff3-Abstract-Conference.html
category: optimization
parent: —
motivation: 通过自我反馈迭代改进输出质量
```

#### 📝 一句话总结
Self-Refine 让同一个语言模型先生成初稿，再给自己的输出写反馈，并基于反馈迭代改写，解决了单次生成难以一次达到高质量的问题。

#### 🎯 核心要点
- 三个核心阶段：initial generation、feedback、refine
- 使用同一个底座 LLM 完成生成、反馈和改写，不需要额外训练
- 迭代直到达到固定轮数或模型判断无需继续修改
- 反馈需要具体指出缺陷，refine 需要保留优点并修复问题
- 在对话、代码优化、约束生成、情感反转、缩写生成等任务上评估
- 适合开放式生成质量优化，但不能保证每轮都单调变好

#### 🔬 深入细节
![Self-Refine 高层流程图](https://ar5iv.labs.arxiv.org/html/2303.17651/assets/x1.png)
*图：论文 Figure 1，展示同一模型生成输出、生成反馈并迭代精炼的流程。图源：ar5iv / arXiv。*

```python
# Self-Refine 迭代伪代码
def self_refine(lm, task_input, max_iters=3):
    y = lm.generate(build_initial_prompt(task_input))
    history = []
    for t in range(max_iters):
        feedback = lm.generate(build_feedback_prompt(task_input, y, history))
        if is_satisfied(feedback):
            break
        y_new = lm.generate(build_refine_prompt(task_input, y, feedback))
        history.append((y, feedback, y_new))
        y = y_new
    return y, history
```

Self-Refine 的迭代可以写成：

$$
y_0 = \mathcal{M}(x), \quad
fb_t = \mathcal{M}(x,y_t), \quad
y_{t+1} = \mathcal{M}(x,y_t,fb_t)
$$

其中同一个模型 \(\mathcal{M}\) 同时扮演作者、评论者和编辑。它不依赖人工反馈，也不需要训练奖励模型；所有改进都通过 prompt 中的自反馈文本完成。

该方法的动机来自开放式生成的常见现象：第一次回答可能方向正确但有遗漏、约束违反、代码低效或表达不清。直接要求模型“再试一次”不一定有效，因为缺少明确改写目标；Self-Refine 先生成反馈，把问题显式列出来，再让模型根据反馈修订。

反馈质量是核心。好的 feedback 应该具体、可执行，例如指出“没有满足长度约束”“代码复杂度仍是 \(O(n^2)\)”“回答没有覆盖用户第二个要求”。如果反馈只是泛泛地说“需要更好”，refine 阶段很难稳定改进。论文也通过消融说明反馈步骤本身对性能很重要。

Self-Refine 与 Self-Consistency 的方向不同：Self-Consistency 并行采样多个候选后选择，Self-Refine 串行改进同一个候选。前者适合封闭答案投票，后者适合开放式质量打磨。实际系统中也可以组合：先采样多个初稿，再分别 refine，最后用选择器挑选。

> ⚠️ 注意：Self-Refine 没有外部真值校验，模型可能把正确内容改坏；高风险任务应加入测试、规则检查或人类审核。

#### 🧪 练习题
```yaml
question: "Self-Refine 的 feedback 阶段主要作用是什么？"
options:
  - "为模型参数计算梯度"
  - "指出当前输出的具体问题，为下一轮改写提供目标"
  - "随机删除上下文"
  - "替代最终答案输出"
answer: 1
explain: "Self-Refine 依靠模型生成的具体反馈指导 refine 阶段修复初稿问题。"
```
