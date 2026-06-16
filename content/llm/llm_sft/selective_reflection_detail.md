### Selective Reflection-Tuning：选择性反思微调 (Selective Reflection-Tuning)
```yaml
id: selective_reflection
name: Selective Reflection-Tuning
full_name: 选择性反思微调 (Selective Reflection-Tuning)
year: "2026.01"
org: Tsinghua University
paper_url: https://arxiv.org/abs/2402.10110
category: frontier
parent: self_instruct
motivation: 学生模型自主选择高质量数据
```

#### 📝 一句话总结
Selective Reflection-Tuning 提出教师模型反思改写、学生模型选择接收的数据回收流程，解决传统 Self-Instruct / Reflection-Tuning 只由教师决定数据质量、忽略目标学生模型兼容性的问题。它用 IFD 衡量样本对学生的“难度”，用 reversed-IFD 衡量响应对指令的“可学习可行性”，从而自动构造更适合当前学生模型的 SFT 数据。

#### 🎯 核心要点
- 两阶段数据回收流程：Selective Instruction Reflection 先改写指令，Selective Response Reflection 再改写响应。
- 教师模型负责 reflection：基于清晰度、复杂度、相关性、完整性等 criteria 对原始 instruction-response pair 进行批判和重写。
- 学生模型负责 selection：不再依赖 GPT-4 或额外 judge，而是直接用待训练学生模型的统计量决定是否接收教师改写。
- IFD 指标用于指令选择：比较原样本和改写样本的 Instruction-Following Difficulty，保留对学生更有训练价值、更具挑战性的指令版本。
- reversed-IFD 指标用于响应选择：衡量给定响应时学生能否反推出对应指令，保留响应更能支撑指令、语义更匹配的样本。
- 数据来源不是重新收集，而是在 Alpaca、WizardLM 等现有 instruction-tuning 数据上做自动反思、选择和回收。
- 训练出的 sRecycled Alpaca / sRecycled WizardLM 在少量数据条件下取得强性能，表明“学生兼容的数据质量”比单纯扩大数据规模更关键。

#### 🔬 深入细节

![Selective Reflection-Tuning 总体流程](https://arxiv.org/html/2402.10110v2/extracted/5652518/Figures/reflection_main.png)
*图：论文 Figure 1 展示了两阶段 teacher-student collaboration。教师模型先反思并生成改写候选，学生模型再用 IFD / r-IFD 选择是否接收。*

传统指令微调数据增强通常是 teacher-dominated：Self-Instruct 依赖强模型生成新任务，WizardLM / Reflection-Tuning 让强教师改写指令或响应，DEITA 等方法再用强模型打分筛选。这类方法默认“教师认为更好”的样本就一定适合学生，但论文指出这会带来两个偏差：第一，教师生成本身有随机性，反思后的样本可能看似更复杂却破坏了原问题；第二，评估模型与真正要微调的学生模型不同，judge 的偏好未必等于学生的学习需求。因此 Selective Reflection-Tuning 把问题改写为：让教师提出改进候选，但最终由学生模型基于自身困惑度统计量决定是否学习。

方法从一个原始样本 \((x, y)\) 出发，其中 \(x\) 是 instruction，\(y\) 是 response。SFT 的常规目标仍然是最大化给定指令时响应的条件似然，等价于最小化：

$$
\mathcal{L}_{\mathrm{SFT}}(\theta)=-\sum_{t=1}^{|y|}\log p_{\theta}(y_t \mid x, y_{<t}).
$$

Selective Reflection-Tuning 不改变最终 SFT 损失，而是改变进入 SFT 的数据分布。它先让 teacher 在原始 \((x,y)\) 和一组 instruction criteria \(C_x\) 上生成 critique，再输出候选 \((x', y')\)。这个候选不会被无条件接收，而是交给 student 计算 IFD。直觉上，IFD 比较“有指令条件”和“无指令条件”下拟合响应的困惑度差异，可写成：

$$
\mathrm{IFD}_{\theta}(x,y)=\frac{\mathrm{PPL}_{\theta}(y\mid x)}{\mathrm{PPL}_{\theta}(y)}.
$$

当 IFD 更高时，说明该 instruction-response pair 对学生更有挑战，单靠语言模型先验不容易直接生成目标响应，指令提供了更明确的学习信号。第一阶段的选择规则可概括为：

$$
(x^{*},y^{*})=
\begin{cases}
(x',y'), & \mathrm{IFD}_{\theta}(x',y') > \mathrm{IFD}_{\theta}(x,y),\\
(x,y), & \text{otherwise.}
\end{cases}
$$

第二阶段关注 response，因为只提高 instruction 难度并不保证 answer 更好。教师再次基于 response criteria \(C_y\) 反思 \((x^{*},y^{*})\)，生成新的响应候选 \(\tilde{y}\)。论文提出 reversed-IFD，把原先“指令是否帮助生成响应”的方向反过来，考察“响应是否足以让学生反推出指令”。可用同样的困惑度比例直观表示为：

$$
\mathrm{rIFD}_{\theta}(x,y)=\frac{\mathrm{PPL}_{\theta}(x\mid q(y))}{\mathrm{PPL}_{\theta}(x)},
$$

其中 \(q(y)\) 是把响应包装成“请根据答案猜测可能指令”的查询模板。r-IFD 越低，说明给定响应时学生越容易恢复对应 instruction，响应和指令的语义约束越一致，样本越可学。第二阶段选择规则因此与 IFD 相反：保留 r-IFD 更低的响应版本。论文最后还丢弃没有经过 response reflection 的样本，以保持响应分布一致，得到 selective recycled data，再用常规 SFT 训练 sRecycled Models。

```python
# Selective Reflection-Tuning 核心伪代码
# D: 原始 SFT 数据；T: teacher LLM；S: student base model
D_recycled = []

for x, y in D:
    # Phase 1: Selective Instruction Reflection
    critique_x = T.reflect(sample=(x, y), criteria="instruction quality")
    x_new, y_new = T.rewrite_instruction(sample=(x, y), critique=critique_x)

    if IFD(S, x_new, y_new) > IFD(S, x, y):
        x1, y1 = x_new, y_new
    else:
        x1, y1 = x, y

    # Phase 2: Selective Response Reflection
    critique_y = T.reflect(sample=(x1, y1), criteria="response quality")
    y2 = T.rewrite_response(sample=(x1, y1), critique=critique_y)

    if rIFD(S, x1, y2) < rIFD(S, x1, y1):
        D_recycled.append((x1, y2))
    else:
        # 论文实践中为了响应分布一致，会过滤未 response-reflected 的样本
        continue

student = SFT(student=S, data=D_recycled)
```

> 💡 关键：教师只负责“提出候选改进”，学生才负责“判断是否值得学习”。这使得数据选择从通用质量评分变成 model-specific compatibility 评估。

这种设计与 Self-Instruct 的区别非常直接。Self-Instruct 主要扩大指令集合，质量控制依赖规则过滤和强模型能力；Reflection-Tuning 强调让教师从多个 criteria 反思并改写现有样本，但仍然由教师主导。Selective Reflection-Tuning 的新增价值在于 selection 不是 another LLM judge，而是直接读取学生模型的条件困惑度。换言之，它不问“GPT-4 喜欢哪个样本”，而问“这个 base student 会从哪个样本中获得更有效的梯度信号”。这对于 7B/13B 学生尤其重要，因为它们的能力边界与教师模型差异很大。

训练流程上，Selective Reflection-Tuning 可以看作一种离线数据生成加筛选算法，不需要在每个 SFT step 内调用 teacher。实际实现时先对 Alpaca/WizardLM 样本批量调用 teacher 生成 reflection 和候选，再用 student 前向计算 IFD/r-IFD 分数，形成新的数据文件，最后按标准 causal language modeling loss 训练。由于 IFD/r-IFD 只需要学生模型打困惑度，比让 GPT-4 逐条 pairwise judge 更便宜，也避免引入独立 reward model 的偏好错位。

实验部分不是该算法的核心，但能佐证机制：论文在 Alpaca 和 WizardLM 上构造 sRecycled Alpaca / sRecycled WizardLM，并用 AlpacaEval、Open LLM Leaderboard、MT-Bench、pairwise comparison 和 human study 评估。消融显示，仅 reflection 不如 reflection + selection；随机选择、coherence、perplexity 等替代选择策略也弱于 IFD/r-IFD 组合。这说明收益不是来自“多生成一点数据”，而是来自“让学生模型参与决定哪些教师改写真正可学”。

#### 🧪 练习题
```yaml
question: "Selective Reflection-Tuning 中 reversed-IFD 的主要作用是什么？"
options:
  - "衡量响应是否足以支持学生反推出对应指令，从而判断样本可学习性"
  - "计算教师模型生成响应的速度，用于过滤高延迟样本"
  - "替代 SFT 交叉熵损失，直接优化学生模型参数"
  - "强制所有样本都变得更长，以提高回答详细程度"
answer: 0
explain: "r-IFD 将 IFD 的方向反过来，评估给定响应时学生恢复指令的难易程度；值越低通常表示响应和指令更匹配、更可学。"
```
