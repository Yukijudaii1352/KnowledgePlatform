### CASTL — 约束即规范 (Constraints as Specifications Through LLM)

```yaml
id: castl
name: CASTL
full_name: "约束即规范 (Constraints as Specifications Through LLM)"
year: "2025"
org: "ICRA 2025"
paper_url: "https://ieeexplore.ieee.org/document/11127555"
category: "task_planning"
parent: "isr-llm"
motivation: "自然语言约束转TAMP规范"
```

#### 📝 一句话总结

CASTL 提出用 LLM 将自然语言约束自动转成 TAMP 可执行规范，解决用户指令里“目标、禁忌、先后关系和全局规则”难以手工形式化的问题。

#### 🎯 核心要点

- 将语言约束分为四类：attribute、eventual/goal、implication/action ordering、global/action blocking。
- 输入包含 PDDL domain、环境 scene graph 和部分 problem specification，使 LLM 生成结果受已知对象、谓词和动作接口约束。
- 多步提示链先解析对象属性和指代，再识别约束类型，最后分别生成 PDDL goal 或 Python constraint script。
- 对 implication/global 约束采用自定义 planner API 生成 Python 脚本，并通过语法执行和语义一致性检查进行纠错。
- 后端使用 SMT/PDDL/TAMP 求解器 IDTMP，把语言约束落到可验证的规划问题中。
- 在 HouseChip、Kitchen、BlocksWorld 等任务上，完整 CASTL 比 one-step prompting 和 Subtask baseline 更稳定。

#### 🔬 深入细节

![CASTL 方法对比图](https://arxiv.org/html/2410.22225v1/x2.png)
*图：CASTL 将自然语言约束拆成可求解的 PDDL 目标与 Python 约束脚本，而不是让 LLM 直接输出完整动作序列。*

```python
# CASTL 约束转 TAMP 伪代码
def castl_compile(user_constraints, pddl_domain, scene_graph, partial_problem):
    resolved = llm_resolve_references(user_constraints, scene_graph)
    typed_constraints = llm_classify_constraints(resolved)

    problem = partial_problem.copy()
    scripts = []
    for c in typed_constraints:
        if c.kind in ["attribute", "eventual"]:
            goal_literals = llm_generate_pddl_goal(c, pddl_domain, scene_graph)
            problem.add_goal(goal_literals)
        else:
            script = llm_generate_python_constraint(c, planner_api=pddl_domain.api)
            while not executes(script):
                script = llm_repair_script(script, error_trace=last_error())
            scripts.append(script)

    planner = IDTMP(problem, domain=pddl_domain)
    for script in scripts:
        planner.load_constraint_script(script)
    return planner.solve()
```

CASTL 的背景是 task and motion planning 本身需要严格的形式化输入，而真实用户更习惯说“不要经过厨房”“拿蓝色杯子前先打开柜门”“所有热物体都不能碰木桌”这类约束。直接让 LLM 生成计划会缺少可验证性，直接让用户写 PDDL 又不现实。CASTL 选择中间路线：LLM 负责编译 specification，传统规划器负责求解和验证。

论文把约束分成四种，是因为不同约束对应不同后端表达。attribute 约束用于把“红色碗”“最左边的杯子”解析成对象集合；eventual/goal 约束可以直接写成 PDDL goal；implication 约束表达“若发生 A，则必须先/后发生 B”；global 约束表达整个轨迹都不能违反的规则。形式上，规划问题可以写成：

$$
\Pi = \langle \mathcal{O}, \mathcal{A}, s_0, G, \mathcal{C} \rangle,
$$

其中 \(G\) 是目标文字被编译出的 PDDL goal，\(\mathcal{C}\) 是由 Python constraint script 表达的轨迹约束集合。规划器搜索动作序列 \(\tau=(a_1,\ldots,a_T)\)，要求 \(\tau\models G\) 且 \(\tau\models \mathcal{C}\)。

对非目标类约束，CASTL 让 LLM 生成调用 planner API 的 Python 脚本，而不是生成松散 JSON。原因是 action blocking、ordering、forall 等逻辑往往需要程序化检查，例如在 planner 扩展节点时阻止某个动作：

```python
def _load_constraints(self, planner):
    hot_objects = planner.get_objects_by_attribute("temperature", "hot")
    wood_surfaces = planner.get_objects_by_attribute("material", "wood")
    for obj in hot_objects:
        for surface in wood_surfaces:
            planner.block_expression_action(
                action="place",
                arguments={"object": obj, "target": surface},
            )
```

训练/推理流程更接近“编译器流水线”而不是端到端学习：LLM 解析自然语言，生成候选规范；系统运行脚本并捕获语法错误；再用 LLM 做语义一致性检查，判断脚本是否真的覆盖用户约束；最后交给 IDTMP 求解。与 ISR-LLM 或 Code-as-Policies 类方法相比，CASTL 的优势是把 LLM 输出限定在 planner specification 层，保留 PDDL/TAMP 的可解释性和失败可诊断性。

> ⚠️ 注意：用户给出的 IEEE 链接可能需要访问权限；本精读依据公开 arXiv 版本与作者预印本整理，YAML 中仍保留原始 `paper_url`。

#### 🧪 练习题

```yaml
question: "CASTL 为什么不直接让 LLM 输出最终机器人动作序列？"
options:
  - "因为 CASTL 只处理视觉识别任务"
  - "因为最终动作序列无法表达任何自然语言约束"
  - "因为将语言编译成 PDDL/Python 规范后，可由 TAMP 求解器验证并搜索可行计划"
  - "因为 PDDL domain 在 CASTL 中完全没有被使用"
answer: 2
explain: "CASTL 的核心是把 LLM 放在规范生成层，让后端规划器负责可行性、几何约束和轨迹约束验证。"
```
