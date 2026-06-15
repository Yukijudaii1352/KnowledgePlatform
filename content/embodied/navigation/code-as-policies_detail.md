### Code as Policies — 用语言模型程序表示机器人策略

```yaml
id: "code-as-policies"
name: "Code as Policies"
full_name: "代码即策略 (Code as Policies)"
year: "2023"
org: "Google"
paper_url: "https://code-as-policies.github.io/"
category: "task_planning"
parent: "saycan"
motivation: "LLM代码生成表达行为逻辑"
```

#### 📝 一句话总结

Code as Policies 将自然语言指令翻译成可执行的机器人策略代码，让 LLM 通过 Python 控制流、函数组合和第三方库调用表达空间几何推理、反应式反馈循环和多步机器人行为。

#### 🎯 核心要点

- **Language Model Programs (LMPs)**：把 LLM 生成的 Python 程序作为策略，程序调用感知 API 和控制 API。
- **少样本代码提示**：提示中给出“指令注释 + 对应代码”示例，新指令由代码补全模型续写策略代码。
- **层级代码生成**：当主程序调用未定义函数时，递归提示 LLM 生成函数定义，形成可复用函数库。
- **表达反馈循环**：用 `if/while/for` 等代码结构表示“直到看见目标才移动”“如果检测到物体则停止”等闭环行为。
- **空间几何能力**：通过 NumPy、Shapely 等库进行坐标计算、形状生成、凸包和相对位置推理。
- **跨机器人验证**：在画图、桌面抓放、移动操作等多个真实机器人/仿真任务上展示无需额外训练的泛化。

#### 🔬 深入细节

##### 框架图

![Code as Policies 框架](https://ar5iv.labs.arxiv.org/html/2209.07753/assets/x1.png)
*图：LLM 根据少样本示例把自然语言命令转成调用感知 API 与控制 API 的策略代码，并可递归生成缺失函数。*

##### 算法伪代码

```python
# Code as Policies: generate and execute robot policy code
prompt = build_prompt(examples=[
    ("# stack the blocks on the empty bowl", "def policy(): ..."),
    ("# move right until you see the apple", "while not detect('apple'): ..."),
])

code = LLM.complete(prompt + f"\n# {user_instruction}\n")

while has_undefined_functions(code):
    fn_name = next_undefined_function(code)
    fn_prompt = build_function_prompt(fn_name, code, api_docs)
    code += LLM.complete(fn_prompt)

checked_code = static_check(code, allowed_apis, allowed_imports)
policy_fn = sandbox_compile(checked_code)
policy_fn(perception_api, control_api)
```

##### 方法拆解

SayCan 用 LLM 在固定技能集合上选择动作，优点是可控，缺点是表达能力受技能库限制。Code as Policies 的问题意识是：很多机器人任务需要更细的逻辑，例如“把红块放到最左边的碗里”“沿对角线摆放物体”“看到目标前一直后退”。这些行为可以自然地写成程序，而不是离散技能序列。

CaP 给 LLM 的不是普通文本规划提示，而是代码上下文。示例格式通常是自然语言命令作为注释，后面跟一段调用机器人 API 的 Python。新指令到来时，代码模型续写程序。生成的程序可以读取感知 API 输出，例如 `detect_objects()`、`get_obj_pos()`，再调用控制 API，例如 `pick_place()`、`move_to()`、`set_velocity()`。

代码表示带来三个关键能力。第一，控制流：`while not detect_object("apple")` 可表达反应式闭环，而不是一次性计划。第二，数值计算：程序可用坐标、距离、角度、插值和几何库处理“左边一点”“排成圆形”等模糊语言。第三，组合抽象：函数可封装常见子行为，在后续代码中复用。

层级代码生成是 CaP 的重要工程设计。LLM 生成主策略时可能写出 `get_empty_bowl()` 或 `put_first_on_second()` 等未定义函数。系统检测未定义符号后，再以函数名、上下文和 API 文档为提示，让 LLM 补全函数体。这类似让模型自建一个小型策略库，论文也显示它提升了 HumanEval 与机器人代码生成表现。

可以把生成策略形式化为：

$$\pi_{\theta}(a_t|o_{\le t}, u) = \operatorname{Exec}\left(\operatorname{LLM}(u,\mathcal{E},\mathcal{A})\right)$$

其中 \(u\) 是用户指令，\(\mathcal{E}\) 是少样本代码示例，\(\mathcal{A}\) 是可用 API。LLM 输出程序，程序在运行时根据观测 \(o_t\) 调用控制 API 产生动作。

CaP 的强项是可组合、可解释和数值精确；弱点是安全边界和 API 依赖。生成代码必须经过白名单、静态检查、沙箱执行和运行时异常处理，否则错误代码可能调用不允许的函数或产生危险参数。它适合已有稳定感知/控制原语的机器人栈，不适合直接替代低层控制学习。

> 💡 关键：Code as Policies 把 LLM 的输出从“自然语言计划”提升为“可执行程序”，因此能表达循环、条件、函数和几何计算。

#### 🧪 练习题

```yaml
question: "Code as Policies 相比只生成自然语言步骤的主要优势是什么？"
options:
  - "代码能表达控制流、数值计算和 API 调用，可直接形成闭环策略"
  - "代码不需要任何感知 API"
  - "代码一定比所有学习策略安全"
  - "代码会自动训练机器人低层控制器"
answer: 0
explain: "CaP 的策略代码可以调用感知与控制 API，并用 if/while/函数/几何库表达复杂逻辑，这是纯自然语言步骤难以精确执行的。"
```
