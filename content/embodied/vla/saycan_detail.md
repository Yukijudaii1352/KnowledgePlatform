### SayCan

```yaml
id: saycan
name: SayCan
full_name: 语言可行性规划 (SayCan)
year: '2022.04'
org: Google
paper_url: https://arxiv.org/abs/2204.01691
category: llm_planning
parent: —
motivation: LLM规划结合底层技能可行性评估
```

#### 📝 一句话总结
SayCan 把大语言模型对“下一步该做什么”的语义常识和机器人当前状态下“这一步能不能做成”的技能价值函数相乘，用语言级规划加可行性过滤实现开放指令下的长程机器人执行。

#### 🎯 核心要点
- 提出 **SayCan**：让语言模型负责高层技能选择，让机器人技能价值函数负责低层可行性评估
- 把机器人能力表示成一组可调用的 **skill library**，每个技能都配有自然语言描述
- 用语言模型估计技能对用户目标的 **usefulness**，用 value function 估计当前状态下的 **affordance**
- 通过乘法打分在每一步重规划，而不是一次性生成整条固定计划
- 在真实移动操作机器人上验证了开放指令长程执行，项目页报告 **84% 正确技能选择率** 和 **74% 任务完成率**
- 展示了语言模型规模增大、链式思维提示和多语言指令都能继续改善高层规划表现

#### 🔬 深入细节
##### 核心总览图

![SayCan 总览图](https://ar5iv.labs.arxiv.org/html/2204.01691/assets/figures/intro.png)
*图：SayCan 论文 Figure 1。语言模型根据指令挑选下一步技能，价值函数根据当前观测过滤不可执行技能，两者联合决定机器人下一步调用哪个底层技能。*

##### 核心伪代码

```python
# SayCan: language-model usefulness x skill-value affordance

def choose_skill(instruction, history, state, skills):
    scores = []
    for skill in skills:
        p_useful = language_model_prob(skill.description, instruction, history)
        p_can = value_function(skill, state)
        scores.append((skill, p_useful * p_can))
    return argmax(scores)

history = []
while not task_finished():
    skill = choose_skill(user_instruction, history, robot_state(), skill_library)
    outcome = execute(skill)
    history.append((skill.name, outcome))
```

##### 动机：为什么单靠 LLM 规划还不够

SayCan 要解决的问题是开放指令长程执行。像 “I spilled my drink, can you bring me something to clean it up?” 这类命令，机器人需要先定位脏污，再决定去哪里拿海绵、怎样避开障碍、拿完后返回并执行清洁。纯 LLM 往往能写出语义上很合理的计划，但它不知道当前机器人是不是正好离海绵太远、是不是手里已经抓着别的东西、某个抽屉是不是根本打不开。

因此，论文把“合理”与“可做”显式拆开。语言模型负责判断某个技能对任务目标是否有帮助，也就是 usefulness；机器人已有的技能价值函数负责判断该技能在当前状态下成功概率高不高，也就是 affordance。真正执行时只选择两者都高的技能。

这相当于给 LLM 加了一个 grounded reality check。它保留了大模型的常识和组合规划能力，但避免让模型直接负责它根本没有感知到的物理可行性。

##### 核心机制一：skill description 上的语言规划

SayCan 首先把机器人底层能力抽象成离散 skill set，例如 `find a sponge`、`pick up sponge`、`go to table`、`wipe table`。每个技能都带有一段自然语言描述，语言模型根据当前任务描述和已经执行的步骤历史，为候选技能分配先验概率：

$$
P_{\text{LM}}(s_i \mid \text{instruction}, \text{history})
$$

它不直接生成连续动作，也不直接生成代码，而是在已有技能库上做语义级下一步选择。这让高层规划问题变得稳定很多，因为搜索空间被压缩到了“选哪个技能”。

##### 核心机制二：value function 过滤技能可行性

对每个候选技能 \(s_i\)，系统还会查询一个由机器人数据训练得到的成功价值估计：

$$
V(s_i, x_t) \approx P(\text{success} \mid s_i, x_t)
$$

其中 \(x_t\) 是当前机器人状态。这个 value function 可以来自离线技能成功预测器、本体/视觉条件策略的 critic，或者其它成功概率估计模块。它的任务不是决定“这一步是不是目标相关”，而是回答“现在执行它成功概率大不大”。

论文的核心打分就是把两者相乘：

$$
\mathrm{score}(s_i)
= P_{\text{LM}}(s_i \mid \text{instruction}, \text{history}) \cdot V(s_i, x_t)
$$

只有语义合理且物理可行的技能才会被推到前面。比如“拿海绵擦桌子”在语义上显然好于“去充电”，但如果机器人当前根本够不到海绵，value function 会把这个技能压下去，优先执行“移动到柜子附近”这类可行前置步骤。

> 💡 关键：SayCan 的创新不是让 LLM 学会机器人控制，而是承认 LLM 不懂控制，然后用显式价值函数把它校正到现实世界。

##### 核心机制三：逐步重规划而不是一次性生成整条计划

SayCan 不是一开始就生成完整计划然后盲执行，而是在每个技能执行后更新历史和状态，再重新打分下一个技能。这一点非常重要，因为真实环境中执行结果会不断改变后续最优动作。例如机器人拿到海绵之后，“go to cabinet” 这类技能的价值会立即下降，而 “return to table and wipe” 会升高。

从算法结构看，它更像一个高层 receding-horizon planner：

1. 读取用户指令和当前状态
2. 用 LLM 给所有技能打 usefulness 分
3. 用 value function 给所有技能打 affordance 分
4. 相乘后选最高分技能执行
5. 根据新状态继续循环

这就是它能处理长程开放任务的根本原因。它不要求规划器一开始就完全正确，而是允许在每一步都重新贴近真实世界。

##### 结果怎么看：它开创了 LLM 规划与机器人控制解耦的主线

SayCan 的方法本身非常朴素，但影响极大。后续大量具身系统都在沿用这条分工思路：LLM 负责计划、代码、技能选择或子目标；底层策略、世界模型或价值函数负责可行性、执行和闭环纠错。即使后来的系统换成了 VLA、world model 或 diffusion policy，它们也常常仍保留这种“高层语义推理 + 低层 grounded execution”的结构。

#### 🧪 练习题

```yaml
question: "SayCan 选择下一步技能时的核心打分原则是什么？"
options:
  - "只选语言模型概率最高的技能"
  - "只选 value function 最高的技能"
  - "把语言模型的 usefulness 和技能价值函数的 affordance 组合起来评分"
  - "先随机采样技能，再让机器人试错"
answer: 2
explain: "SayCan 的关键就是同时考虑任务语义相关性和当前状态下的可执行性。它把语言模型概率与技能成功价值结合，避免计划看起来合理但现实中做不到。"
```
