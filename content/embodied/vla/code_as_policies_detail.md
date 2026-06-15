### Code as Policies：代码即策略

```yaml
id: code_as_policies
name: Code as Policies
full_name: 代码即策略 (Code as Policies)
year: "2022.11"
org: Google
paper_url: https://ai.googleblog.com/2022/11/robots-that-write-their-own-code.html
category: llm_planning
parent: saycan
motivation: LLM生成Python代码控制机器人
```

#### 📝 一句话总结

Code as Policies 将代码生成大模型转化为机器人策略生成器，让 LLM 直接写可执行 Python 控制逻辑，解决了传统语言规划只能调用固定技能、难以表达反馈循环和几何计算的问题。它通过语言模型程序（LMP）和递归函数生成，把感知 API、控制 API、Python 控制流和第三方库组合成可在机器人上运行的策略。

#### 🎯 核心要点

- 提出 Language Model Programs（LMP）：把 LLM 输出的 Python 程序作为机器人策略，而不是只输出自然语言计划或离散技能序列。
- Few-shot prompt 由 Hints 和 Examples 组成：Hints 暴露可用感知/控制 API，Examples 展示自然语言注释到代码的映射格式。
- 层级代码生成：当主策略调用未定义函数时，用专门的函数生成 LMP 递归补全函数体，形成可复用的动态代码库。
- 代码表达反馈策略：用 `if/else`、`for/while`、变量、函数调用和会话状态表示闭环行为、上下文引用和多步任务。
- 代码调用外部库：用 NumPy、Shapely 等库处理坐标、形状、排序和空间几何关系，弥补纯文本规划对数值推理的弱点。
- 机器人落地依赖因子化接口：开放词汇检测器提供对象、位置、边界框等结构化感知结果，底层控制原语执行抓取、放置、导航、轨迹跟踪等动作。
- 实验覆盖桌面抓放、形状绘制、移动操作和代码生成基准；层级生成在 RoboCodeGen 与 HumanEval 上均优于 flat code generation。

#### 🔬 深入细节

![Code as Policies 框架图](https://ar5iv.labs.arxiv.org/html/2209.07753/assets/x1.png)
*图：CaP 用 few-shot prompt 将自然语言命令翻译为策略代码，代码调用感知 API、控制 API，并递归生成未定义函数。*

元信息中的 `paper_url` 指向 Google Research 官方博客而非论文正文；这里同时依据该博客、项目页和论文 `Code as Policies: Language Model Programs for Embodied Control`（arXiv:2209.07753）完成精读。论文的核心问题是：SayCan 等方法把 LLM 用作高层规划器，通常输出一串已有技能，但机器人仍必须预先训练或手写这些技能；一旦指令需要“向左一点”“直到看到苹果再停”“画一个更小的三角形”这类数值、反馈或几何细节，固定技能表就很难覆盖。

CaP 的做法是把策略写成程序。给定自然语言指令 \(\ell\)、感知 API 集合 \(\mathcal{P}\)、控制 API 集合 \(\mathcal{A}\) 和 few-shot 示例 \(E\)，LLM 生成一段代码：

$$
c \sim p_\theta(c \mid \mathrm{prompt}(\ell, \mathcal{P}, \mathcal{A}, E))
$$

这段代码不是离线说明，而是在受限 Python 环境中执行的机器人策略。代码可以读取对象检测结果、计算目标坐标、根据条件分支选择动作，并在循环中反复观察环境。对机器人而言，`get_pos("red block")`、`detect_object("orange")`、`put_first_on_second(obj, target)` 这类 API 是 grounding；对 LLM 而言，有意义的函数名和示例让它能把语言短语映射到可执行调用。

```python
# Code as Policies 层级生成伪代码
def generate_policy(instruction, scope, examples):
    prompt = build_prompt(hints=scope.available_apis, examples=examples)
    code = llm_complete(prompt + f"# {instruction}\n")

    while True:
        ast_tree = parse_python(code)
        missing = find_called_functions_not_in_scope(ast_tree, scope)
        if not missing:
            break

        for fn_name, signature in missing:
            fn_prompt = build_function_prompt(fn_name, signature, scope, examples)
            fn_code = llm_complete(fn_prompt)
            assert passes_static_safety_checks(fn_code)
            scope.add_function(fn_name, fn_code)
            code = fn_code + "\n\n" + code

    assert passes_static_safety_checks(code)
    exec(code, scope.globals, scope.locals)
```

层级生成是论文最关键的工程机制。主 LMP 可以先写出“粗略但结构清晰”的策略，例如 `stack_objs_in_order(obj_names)`；如果这个函数还不存在，系统解析 AST 找到未定义调用，再让另一个 LMP 生成函数体。这个过程以深度优先方式重复，直到所有调用都能在当前 scope 中解析。相比一次性让模型写完整长程序，递归函数生成把复杂任务拆成更短、更局部的代码生成问题，也让后续任务能复用已生成函数。

安全执行不是完全放任 `exec`。论文实现会在执行前检查生成代码，禁止 import、`__` 开头的特殊变量、`exec` 和 `eval` 等高风险构造，然后把感知/控制 API 放入 `globals`，把新变量和函数放入 `locals`。这不是完整的物理安全方案，但体现了 CaP 的定位：它负责在高层组合感知结果与控制原语，真正的碰撞检查、力控限制和动作安全仍应由底层机器人控制栈承担。

CaP 与传统 LLM 规划的主要差别在于“动作参数从代码中算出来”。例如“把最左边的块向右移动 5cm”不需要预训练一个专门技能；策略代码可以先对所有块的位置排序，再把目标位置加上 \([0.05, 0]\)。如果任务涉及形状绘制，代码可以用 NumPy 插值路径点；如果涉及空间包含关系，代码可以用 Shapely 处理几何对象。换言之，LLM 的世界知识负责把语言翻译成程序结构，而确定性的 Python 运算负责做精确数值推理。

> 💡 关键：CaP 的泛化发生在“解释语言、操作结构化感知、参数化控制 API”这一层；它不是端到端学习低层动力学，也不消除对可靠感知和控制原语的依赖。

局限也直接来自这个边界。若感知 API 无法描述某个属性，代码就无法稳健引用它；若控制 API 没有某类动作，CaP 也不能凭空执行。生成代码还可能出现语法、类型、逻辑和安全问题，真实机器人部署需要沙箱、仿真验证、动作约束和人工监督。尽管如此，CaP 证明了一个重要方向：对具备代码能力的 LLM 来说，程序本身可以成为比自然语言计划更强的机器人策略表示。

#### 🧪 练习题

```yaml
question: "Code as Policies 相比只输出自然语言技能序列的 LLM 规划器，最核心的优势是什么？"
options:
  - "完全不需要底层机器人控制 API"
  - "可以用可执行代码表达变量、循环、条件分支和数值几何计算"
  - "把所有机器人动作都改成端到端强化学习"
  - "只依赖图像生成模型来预测下一帧"
answer: 1
explain: "CaP 的关键是让 LLM 生成可执行 Python 策略代码，代码能处理感知输出、计算动作参数并表达闭环逻辑；它仍然需要可靠的感知和控制 API。"
```
