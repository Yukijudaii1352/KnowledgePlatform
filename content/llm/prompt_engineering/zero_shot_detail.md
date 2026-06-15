### Zero-shot: 零样本提示 (Zero-shot Prompting)
```yaml
id: zero_shot
name: Zero-shot
full_name: 零样本提示 (Zero-shot Prompting)
year: '2020'
org: OpenAI
paper_url: https://arxiv.org/abs/2005.14165
category: basic
parent: —
motivation: 仅凭指令完成任务，无需示例
```

#### 📝 一句话总结
Zero-shot Prompting 让语言模型只依赖自然语言指令和待处理输入完成任务，解决了没有示例或标注样本时如何快速调用预训练能力的问题。

#### 🎯 核心要点
- 只提供任务描述和测试输入，不提供输入-输出示例
- 测试时无微调、无梯度更新、无任务专属参数
- GPT-3 论文将 Zero-shot 作为与 One-shot、Few-shot、Fine-tuning 并列的评估范式
- 性能依赖预训练中积累的任务知识、指令理解能力和模型规模
- 通常弱于 Few-shot，但成本最低、上下文占用最小、任务切换最快
- 对模糊任务、非标准标签空间和复杂推理任务更容易产生格式偏差或误解

#### 🔬 深入细节
![GPT-3 零样本与少样本评估范式](https://ar5iv.labs.arxiv.org/html/2005.14165/assets/figures/eval_strategies.png)
*图：GPT-3 论文 Figure 2.1，Zero-shot 面板展示只用任务说明和当前输入进行预测。图源：ar5iv / arXiv。*

```python
# Zero-shot prompting 推理伪代码
def zero_shot_predict(lm, instruction, query):
    prompt = f"{instruction.strip()}\n\nInput: {query}\nOutput:"
    answer = lm.generate(prompt, stop=["\n"])
    return normalize(answer)
```

Zero-shot 的条件分布可以写为：

$$
p_\theta(y_\* \mid d, x_\*)
$$

其中 \(d\) 是自然语言任务说明，\(x_\*\) 是测试输入。与 Few-shot 相比，条件中没有 \((x_i,y_i)\) 示例，因此模型必须从指令文本本身推断任务目标、输出格式和标签空间。它本质上是在调用预训练阶段已经吸收的知识和模式，而不是在上下文中学习新映射。

这一范式的动机非常直接：很多真实任务没有现成示例，或者用户只愿意用一句话表达需求。Zero-shot 把任务接口压缩成“说明 + 输入”，让一个通用模型能在翻译、摘要、问答、分类、改写等任务之间直接切换。GPT-3 论文的重要观察是，随着模型规模扩大，Zero-shot 能力也会平滑提升，但在不少任务上仍明显低于带示例的 Few-shot。

设计 Zero-shot prompt 时，指令必须承担更多约束功能。它需要说明角色、目标、输出格式、边界条件和禁止行为，例如“只输出一个标签”“用 JSON 返回”“如果无法判断则回答 Unknown”。如果指令省略这些约束，模型会按最可能的自然文本续写，可能给出解释、补充背景或使用与评测脚本不匹配的答案格式。

与 Few-shot 的区别在于，Zero-shot 的失败更常来自“任务解释错误”，而 Few-shot 的失败更常来自“示例选择或模式泛化错误”。因此 Zero-shot 通常适合开放生成、常见任务和低成本批量调用；当标签空间罕见、格式严格或推理链较长时，加入示例、思维链或自洽投票通常更稳。

> ⚠️ 注意：Zero-shot 不是“模型不知道任务也能做”，而是“用户不提供示例”；模型仍依赖预训练中已有的语言和任务知识。

#### 🧪 练习题
```yaml
question: "Zero-shot Prompting 最依赖 prompt 中的哪类信息？"
options:
  - "梯度更新次数"
  - "任务说明和输出约束"
  - "训练集随机种子"
  - "奖励模型打分"
answer: 1
explain: "Zero-shot 没有示例可参考，模型主要依靠自然语言任务说明判断应执行什么以及如何输出。"
```
