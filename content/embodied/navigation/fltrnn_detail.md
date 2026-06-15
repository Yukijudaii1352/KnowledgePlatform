### FLTRNN — 面向长程任务规划的忠实语言 RNN

```yaml
id: "fltrnn"
name: "FLTRNN"
full_name: "忠实长程任务规划 (Faithful Long-Horizon Task Planning)"
year: "2024"
org: "ICRA 2024"
paper_url: "https://ieeexplore.ieee.org/document/10611663"
category: "task_planning"
parent: "isr-llm"
motivation: "LLM+推理网络双层忠实规划"
```

#### 📝 一句话总结

FLTRNN 针对 LLM 在复杂长程任务中忽略上下文规则的问题，提出语言化 RNN 结构，把任务分解、长短期记忆、Rule-CoT 和 memory graph 融入规划推理，以提升生成计划对规则和状态的忠实性。

#### 🎯 核心要点

- **任务先分解再规划**：先把长程目标拆成若干更简单子目标，再逐个求解并汇总计划。
- **Language-Based RNN**：用类似 RNN 的逐子任务循环，把长期任务信息和短期子任务上下文传递给 LLM。
- **长短期记忆划分**：总目标、初始计划和全局规则作为 long-term memory；当前子目标、示例、对象状态和细节作为 short-term memory。
- **Rule-CoT**：在动作生成中显式写出规则推理，如“柜子关闭，取物前必须打开”“一次只能拿一个物体”。
- **Memory Graph**：维护对象位置、状态和已完成目标，减少长上下文中遗漏约束。
- **VirtualHome 评估**：在家庭长程任务中比较 planning-only、planning-reasoning 和 FLTRNN，展示忠实性与成功率提升。

#### 🔬 深入细节

##### 框架图

![FLTRNN 方法框架](https://tannl.github.io/FLTRNN.github.io/Method_simple_9_00.png)
*图：FLTRNN 作者项目页给出的框架示意。系统先拆分长程目标，再通过语言化 RNN 单元逐子目标规划，并结合规则推理与记忆管理。*

##### 算法伪代码

```python
# FLTRNN: faithful long-horizon planning with language-based RNN
subgoals = LLM_decompose(task_goal)
long_memory = {
    "total_goal": task_goal,
    "global_rules": action_rules,
    "initial_plan": subgoals,
    "completed_goals": [],
}
memory_graph = build_memory_graph(initial_observation)
full_plan = []

for subgoal in subgoals:
    short_memory = {
        "current_subgoal": subgoal,
        "retrieved_examples": select_examples(subgoal),
        "object_states": memory_graph.relevant_states(subgoal),
    }

    sub_plan = LLM_plan_with_rule_cot(long_memory, short_memory)
    checked_plan = enforce_rule_thoughts(sub_plan, action_rules, memory_graph)
    full_plan.extend(checked_plan)

    memory_graph.update(checked_plan)
    long_memory["completed_goals"].append(subgoal)

return aggregate_and_deduplicate(full_plan)
```

##### 方法拆解

长程家庭任务往往包含多个对象、容器状态和顺序约束。普通 in-context planning 把所有规则、示例和任务描述塞进一个长 prompt，模型容易在后半段忽略前文规则，产生“不忠实”计划。例如手里已有物体还继续 grab，容器是 closed 却直接 putin，或者重复打开已经打开的对象。FLTRNN 的目标是让 LLM 在长上下文下持续遵守规则。

第一步是任务分解。若目标是“把 pancake 放进 microwave 并打开 microwave，同时把 cupcake 放进 stove 并打开 stove”，系统先拆成 microwave 子任务和 stove 子任务。这样每次规划只关注一个较短子目标，降低上下文长度和组合复杂度。

第二步是 Language-Based RNN。它不是传统数值 RNN，而是把 RNN 的“长期状态 + 当前输入 + 输出更新状态”思想搬到语言提示中。长期记忆 \(M_L\) 包含总目标、已完成目标、全局动作规则和初始分解；短期记忆 \(M_S^t\) 包含当前子目标、相关示例和对象状态。每个子任务的 LLM 单元可写成：

$$p_t, M_L^{t+1}=\operatorname{LLMCell}(M_L^t, M_S^t)$$

其中 \(p_t\) 是当前子计划，\(M_L^{t+1}\) 更新已完成目标和关键状态。

Rule-CoT 要求模型在动作前写出规则推理。比如在 `grab(chicken)` 前写出“chicken 在 fridge 内且 fridge closed，所以先 open(fridge)”；在第二次抓取前写出“手上已有物体，所以先 putback 或 putin”。这种显式推理让规则不只存在于 prompt 开头，而是在每个动作附近被重新激活。

Memory Graph 负责保存对象位置和状态，如 `(cupcake, INSIDE, cabinet)`、`cabinet: closed`、`robot_hand: occupied`。规划完一个子任务后，图被更新；下一子任务检索相关状态进入 short-term memory。这样系统不必把所有历史原样塞进 prompt，而是把与当前子目标相关的状态结构化提取出来。

与 ISR-LLM 相比，FLTRNN 不主要依赖外部 validator 的生成-验证-修正闭环，而是从 prompt 组织和记忆机制上提高一次生成的忠实性。它更像“规划前把长任务拆小，规划中用语言 RNN 保持状态，动作处用 Rule-CoT 重申约束”。实际系统仍可与验证器结合，但论文重点是记忆与分解结构。

> 💡 关键：FLTRNN 解决的是长上下文规则遗忘问题。它把全局规则和当前子任务上下文分层管理，使 LLM 每一步都能看到最相关的约束。

#### 🧪 练习题

```yaml
question: "FLTRNN 中 long-term memory 与 short-term memory 的分工是什么？"
options:
  - "long-term memory 存当前图像，short-term memory 存模型参数"
  - "long-term memory 存总目标、全局规则和完成进度，short-term memory 存当前子目标、相关示例和对象状态"
  - "二者完全相同，只是名称不同"
  - "short-term memory 只用于训练，不参与推理"
answer: 1
explain: "FLTRNN 用长期记忆保持任务级约束和进度，用短期记忆聚焦当前子任务所需的示例与对象状态，从而减少长程规划中的规则遗漏。"
```
