### Selective Reflection-Tuning
```yaml
id: selective_reflection
name: Selective Reflection-Tuning
full_name: 选择性反思微调 (Selective Reflection-Tuning)
year: '2026.01'
org: Tsinghua University
paper_url: https://arxiv.org/abs/2402.10110
category: frontier
parent: self_instruct
motivation: 学生模型自主选择高质量数据
```

#### 📝 一句话总结
Selective Reflection-Tuning 提出“教师反思生成 + 学生选择保留”的数据再循环流程，用 IFD 和 r-IFD 让被微调的学生模型自己判断哪些改写样本更适合自己学习。

#### 🎯 核心要点
- 两阶段数据改写：先反思 instruction，再反思 response，分别提升问题质量和回答质量。
- 教师模型负责按细粒度准则批判、反思并生成改进样本，学生模型不生成新数据而负责选择。
- 用 Instruction-Following Difficulty (IFD) 选择更具学习难度、对学生更有训练价值的 instruction-response 对。
- 提出 reversed-IFD (r-IFD)，衡量学生能否从 response 反推 instruction，用于判断样本是否可学习、是否匹配学生能力。
- 在 Alpaca/WizardLM 数据上进行数据回收，不依赖全新人工数据，提升 7B/13B 指令模型的样本效率。

#### 🔬 深入细节
![Selective Reflection-Tuning 流程图](https://arxiv.org/html/2402.10110/extracted/5652518/Figures/reflection_main.png)
*图源：arXiv HTML Figure 1。教师模型执行 instruction/response 反思，学生模型用 IFD/r-IFD 选择最终样本。*

```python
# Selective Reflection-Tuning 伪代码
for (x0, y0) in original_instruction_data:
    # Phase 1: instruction reflection by teacher
    critique_ins = teacher.reflect_instruction(x0, y0, criteria=instruction_criteria)
    x_ins, y_ins = teacher.rewrite_instruction_response(x0, y0, critique_ins)

    # student selects harder/useful instruction pair by IFD
    cand1 = [(x0, y0), (x_ins, y_ins)]
    x1, y1 = argmax(cand1, key=lambda pair: IFD(student, pair.x, pair.y))

    # Phase 2: response reflection by teacher
    critique_res = teacher.reflect_response(x1, y1, criteria=response_criteria)
    y_res = teacher.rewrite_response(x1, y1, critique_res)

    # student selects more feasible/matched response by reversed IFD
    cand2 = [(x1, y1), (x1, y_res)]
    x2, y2 = argmin(cand2, key=lambda pair: rIFD(student, pair.x, pair.y))
    recycled_data.append((x2, y2))

student = supervised_finetune(student, recycled_data)
```

IFD 衡量 instruction 对生成 response 的帮助程度，论文使用困惑度比值表示：

$$
\text{IFD}_{\theta}(y|x)=
\frac{\text{ppl}(y|x)}{\text{ppl}(y)}
=\exp(L_{\theta}(y|x)-L_{\theta}(y))
$$

选择 instruction 时，方法在原始样本和教师改写样本之间取 IFD 更高者：

$$
(x_1,y_1)=\arg\max_{(x,y)\in\{(x_0,y_0),(x_{\text{ins}},y_{\text{ins}})\}}
\text{IFD}_{\theta}(y|x)
$$

r-IFD 则反过来衡量 response 对反推 instruction 的帮助：

$$
\text{r-IFD}_{\theta}(x|y)=
\frac{\text{ppl}(x|y')}{\text{ppl}(x)}
=\exp(L_{\theta}(x|y')-L_{\theta}(x))
$$

response 选择阶段取 r-IFD 更低者：

$$
(x_2,y_2)=\arg\min_{(x,y)}\text{r-IFD}_{\theta}(x|y)
$$

这篇工作的出发点是，很多数据增强方法只让强教师模型判断样本好坏，但真正要学习数据的是学生模型。教师觉得“更好”的样本，可能太难、太偏或和学生当前能力不匹配。Selective Reflection-Tuning 把生成权交给教师，把最终选择权交给学生，从而把数据质量和学生兼容性同时纳入循环。

两阶段设计分别处理 instruction 和 response 的不同问题。instruction reflection 关注题目是否清晰、是否有挑战、是否需要足够细节；response reflection 关注答案是否有帮助、相关、准确、详尽。先选 instruction 是为了让样本对学生有足够训练信号，再选 response 是为了避免高质量但学生难以建立输入输出关系的答案。

IFD/r-IFD 的直觉很重要：高 IFD 表示 instruction 对 response 生成仍然构成挑战，因此样本有训练价值；低 r-IFD 表示 response 能支持学生反推 instruction，说明这对样本在语义上更紧密、更可学习。二者组合避免了只追求“难样本”导致的不可学，也避免了只追求“容易样本”导致的训练信号不足。

与 Self-Instruct 类方法相比，该方法不是从零扩写大量新任务，而是回收已有 Alpaca/WizardLM 数据；与单纯 teacher filtering 相比，它用被训练学生模型的统计量做选择。局限也随之出现：换一个学生模型时，IFD/r-IFD 分布可能改变，需要重新计算选择结果。

#### 🧪 练习题
```yaml
question: "Selective Reflection-Tuning 为什么需要 r-IFD？"
options:
  - "用于衡量学生从 response 反推 instruction 的可行性"
  - "用于替代教师模型生成 response"
  - "用于减少模型参数量"
  - "用于计算 LoRA 的 rank"
answer: 0
explain: "r-IFD 从反向条件概率角度衡量样本是否语义匹配且可被学生学习，弥补 IFD 只强调 instruction 难度的问题。"
```
