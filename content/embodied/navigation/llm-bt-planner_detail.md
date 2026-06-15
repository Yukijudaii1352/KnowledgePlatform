### LLM-as-BT-Planner — LLM行为树规划器 (LLM as Behavior Tree Planner)

```yaml
id: llm-bt-planner
name: LLM-as-BT-Planner
full_name: "LLM行为树规划器 (LLM as Behavior Tree Planner)"
year: "2025"
org: "ICRA 2025"
paper_url: "https://ieeexplore.ieee.org/document/11128454"
category: "task_planning"
parent: "code-as-policies"
motivation: "LLM生成可组合行为树"
```

#### 📝 一句话总结

LLM-as-BT-Planner 把 LLM 生成的机器人任务计划组织为行为树，使语言规划结果具备模块化、可复用、可恢复执行的结构，而不是一次性输出脆弱的线性动作列表。

#### 🎯 核心要点

- 使用 Behavior Tree 表达机器人装配任务，节点包括 condition、action、sequence、fallback 等可组合控制结构。
- 提出四种基于 in-context learning 的 BT 生成方式：one-step、iterative、human-in-the-loop、recursive。
- recursive 方案通过逐步展开未完成节点生成子树，降低一次性生成大树的结构错误。
- human-in-the-loop 方案允许人在中间检查和修复 BT，论文中表现出更高成功率。
- 对 unit-tree generation 和 one-step BT generation 做监督微调，提升小模型输出结构合法性的概率。
- 在 Franka Emika Panda 真实装配场景中验证，BT 的模块化和运行时 tick 机制有利于错误恢复。

#### 🔬 深入细节

![LLM 递归生成行为树示意图](https://arxiv.org/html/2409.10444v1/extracted/5855020/pic/pic/ws_generation_rec.drawio.png)
*图：递归生成方法把复杂任务树拆成局部子树，逐步展开为可执行 Behavior Tree。*

```python
# LLM-as-BT-Planner 递归行为树生成伪代码
def generate_bt(task, domain_skills, examples):
    root = Node(type="Goal", text=task)
    frontier = [root]

    while frontier:
        node = frontier.pop()
        prompt = build_prompt(node, domain_skills, examples, current_tree=root)
        subtree = llm_generate_subtree(prompt)
        subtree = parse_and_validate_bt(subtree)

        replace(node, subtree)
        for child in subtree.children:
            if child.needs_expansion():
                frontier.append(child)

    while not executable(root):
        error = bt_static_check(root)
        root = llm_repair_tree(root, error)
    return root
```

这篇工作的出发点是：LLM 很擅长把“装配齿轮组”这样的高层目标拆成语义步骤，但直接输出线性动作序列会丢失条件检查、失败回退和可复用子任务。Behavior Tree 用 tick 机制执行，每个节点返回 `SUCCESS`、`FAILURE` 或 `RUNNING`，天然适合机器人任务的局部失败恢复。一个 sequence 节点可形式化为：

$$
\mathrm{Seq}(c_1,\ldots,c_n)=
\begin{cases}
\mathrm{FAILURE}, & \exists i,\ c_i=\mathrm{FAILURE}\\
\mathrm{RUNNING}, & \exists i,\ c_i=\mathrm{RUNNING}\ \land\ \forall j<i,\ c_j=\mathrm{SUCCESS}\\
\mathrm{SUCCESS}, & \forall i,\ c_i=\mathrm{SUCCESS}.
\end{cases}
$$

LLM-as-BT-Planner 的方法不是单一 prompt，而是比较了多种生成范式。one-step 最简单：把任务、技能库和示例放进 prompt，让 LLM 一次性输出完整 XML/JSON 行为树；iterative 每次生成后用检查器反馈错误再修；human-in-the-loop 在中间让人类纠正语义或结构问题；recursive 则把大计划拆成待展开节点，逐步生成局部子树。递归策略的直觉是局部上下文更短、约束更清楚，LLM 更不容易破坏 BT 语法。

监督微调部分把 BT 生成拆成两类数据：unit-tree generation 学习单个语义技能如何映射成小树，one-step generation 学习整棵树结构。优化目标本质仍是语言模型交叉熵：

$$
\mathcal{L}_{\text{SFT}}(\theta)=
-\sum_{t=1}^{T}\log p_\theta(y_t\mid y_{<t}, x),
$$

其中 \(x\) 包含任务描述、技能定义和上下文示例，\(y\) 是 BT 序列化文本。论文观察到微调通常能提升“可解析/结构合法”的比例，但是否提升真实任务成功率还取决于底层技能接口、错误检测和环境反馈。

与 Code-as-Policies 类方法相比，BT 输出不是任意 Python 程序，而是受限的控制结构。受限表示牺牲了一些表达自由度，但带来两个工程收益：第一，BT 的静态检查更容易，例如节点类型、孩子数量、技能名是否存在；第二，运行时可以在 condition 失败时局部回退，而不是整段代码异常退出。论文的真实机器人装配实验说明，LLM 负责语义组合，BT 负责执行控制，两者结合比线性 plan 更适合含接触和装配顺序的任务。

> ⚠️ 注意：用户给出的 IEEE 页面可能需要权限；本精读依据公开 arXiv 版本整理，YAML 中保留原始 `paper_url`。

#### 🧪 练习题

```yaml
question: "LLM-as-BT-Planner 使用 Behavior Tree 的核心好处是什么？"
options:
  - "把所有机器人动作离散化成单个 token"
  - "让任务计划具备条件检查、组合复用和失败回退结构"
  - "完全避免底层机器人技能库"
  - "替代视觉感知模型完成目标检测"
answer: 1
explain: "行为树通过 sequence/fallback/condition/action 节点组织执行逻辑，使 LLM 生成计划更容易验证和恢复。"
```
