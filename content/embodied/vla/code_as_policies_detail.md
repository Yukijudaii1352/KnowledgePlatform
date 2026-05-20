# Code as Policies (CaP): Language Model Programs for Embodied Control

> **论文信息**: Jacky Liang, Wenlong Huang, Fei Xia, Peng Xu, Karol Hausman, Brian Ichter, Pete Florence, Andy Zeng (Google Robotics)  
> **发表**: CoRL 2022 (Oral) | arXiv: 2209.07753 | [项目网站](https://code-as-policies.github.io/)  
> **标签**: #VLA #LLM #Robot #Code_Generation #Hierarchical_Planning

---

#### 📝 一句话总结

让大语言模型直接为机器人编写**可执行Python代码**（而非自然语言指令序列），通过**递归组合语言模型程序（LMPs）**形成分层策略，并利用代码的函数调用、变量状态、循环/条件结构、API参数化等编程语言原语，实现复杂长时任务的推理与闭环纠错，显著提升机器人策略的空间泛化力、行为多样性和交互灵活性。

---

#### 🎯 核心要点

- **核心理念：代码即策略（Code as Policies）** — 用LLM生成的Python代码直接作为机器人控制策略，而不仅是生成高层行动计划或子目标序列。代码天然支持状态变量、循环、条件分支、函数递归等，比纯自然语言更具表现力和可组合性。
- **语言模型程序（LMP）** — 将LLM输出的代码视为一种"程序单元"，既可调用现有感知基元和控制API，也可定义新函数供其他LMP调用，形成**递归分层结构**。上层LMP可调用下层LMP来逐步具象化模糊指令。
- **分层代码生成** — 复杂任务被分解为多个LMP的层次调用链：高层LMP将自然语言需求转为带参数的函数调用；中间层LMP定义任务特化的辅助函数（如空间推理、顺序约束处理）；底层LMP直接调用机器人控制API（如 `pick_and_place`）。
- **代码作为"Chain-of-Thought"的强化版** — 精心命名的变量和函数名、中间计算步骤、日志输出等，天然构思维链，且代码能被编译器和运行时检验语法错误，部分逻辑错误也可在仿真中发现。
- **零样本跨实体迁移** — 因为LMP生成的是高层控制逻辑，底层API可被替换为不同机器人的控制原语（如移动基座速度控制、物体操作用夹爪API），实现**同一高层策略在不同实体间的复用**。
- **人机交互新范式** — 用户可以用自然语言给机器人新指令，LLM当场生成新代码片段；也可进行"代码审阅"式的纠错；机器人遇到错误时LLM能生成排查/恢复代码。
- **安全与限制** — 论文展示了仿真和真实机器人上的多样化实验，但生成的代码存在安全风险（语法/语义错误、不安全动作），实际部署需人工监督或沙箱测试。

---

#### 🔬 深入细节

##### 1. 问题形式化

给定：
- 用户自然语言指令 $\ell$（如："把所有红块放到篮子里，然后在桌上画一个L形"）
- 一组预定义的**控制基元** $\mathcal{A}$（如 `pick(obj)`, `place(pos)`, `draw_shape(coords)`）
- 感知模块 $\mathcal{P}$（返回物体名称/位姿/颜色等结构化信息）

目标是生成一个**可执行的Python代码片段** $c$，使得在机器人上运行 $c$ 能完成指令 $\ell$ 所述任务。CaP 用 LLM 作为转换器：$c \sim \text{LLM}(\text{prompt}(\ell, \mathcal{A}, \mathcal{P}, \text{examples}))$。

![图1: CaP系统概览](https://code-as-policies.github.io/static/images/overview.png)

**图1说明**：用户说"把水壶里的水倒进杯子里"。CaP 生成的LMP代码通过：①调用视觉模块定位物体；②分析物体间空间关系（相对位置、沿轴方向）；③生成机器人轨迹/动作原语序列；④输出执行代码。这一切都在**同一个Python执行环境**中，中间变量、日志等天然可见。

##### 2. 语言模型程序（LMP）的层级结构

CaP 的核心贡献在于提出了**LMP 的分层组合机制**。论文定义了三种层次：

| 层级 | 功能 | 示例LMP |
|------|------|--------|
| **L0**: 控制基元 | 直接驱动机器人的动作原语 | `pick(obj)`, `push(obj, dir)`, `move_to(pos)` |
| **L1**: 感知/空间推理 | 将感知数据结构化，进行空间逻辑推理 | `get_obj_by_relation(base, relation)`, `filter_by_color(objs, color)` |
| **L2**: 任务规划 | 将自然语言分解为L1/L0调用序列 | 主LMP函数体，含循环、条件和分层调用 |

这种分层的关键优势：**上层LMP无需知道底层API细节**。换一个机器人时，只需替换L0基元，L1和L2代码无需修改。

![图2: 分层代码生成示意](https://code-as-policies.github.io/static/images/hierarchy.png)

**图2说明**：示例指令"stack blocks in the empty bowl"。LLM 生成的高层代码调用 `parse_obj` 获取物体名，再调用 `stack_objs_in_order`。该函数由另一个LMP定义（右上方），内部循环调用 `put_first_on_second` 这一L0基元，实现块块堆叠。此即**函数式递归组合**：每个LMP既可被LLM生成，也可被其他LMP调用。

##### 3. 提示词工程：分层提示 + Few-Shot

CaP 使用**分阶段提示**来生成不同层次的LMP：

```
阶段1: 定义L1辅助函数 → 阶段2: 定义任务特化的组合函数 → 阶段3: 生成主执行代码
```

每个阶段的提示包含：
- **角色描述**：如 "You are a helpful robot assistant that writes code to control a robot."
- **可用API清单**：带签名的函数列表及简短说明
- **Few-Shot示例**：2-4个代码生成示例，展示如何将自然语言转换为正确的API调用
- **当前感知状态**（可选）：当前场景中物体的名称、位置、属性等结构化数据，作为代码中的初始变量

```python
# CaP 提示结构示例（简化版）
system_prompt = """
# Robot Control Code Generation
Available functions:
- pick(obj_name: str): pick up the named object
- place(x: float, y: float): place held object at position
- get_pos(obj_name: str) -> (float, float): get object position
Write Python code that uses these functions to achieve the user's instruction.
"""
```

##### 4. 算法伪代码

论文的Algorithm 1描述了CaP的核心流程：

```
Algorithm 1: Hierarchical Code-as-Policies Generation
─────────────────────────────────────────────────────
Input: Natural language instruction l,
       Base API primitives A = {f1, f2, ..., fn},
       Perception module P,
       Pre-trained LLM (e.g., Codex, PaLM)
Output: Executable Python policy code C

1:  state ← P()                              ▷ 获取当前场景感知状态
2:  prompt ← BUILD_BASE_PROMPT(A, state)     ▷ 构建含API清单+状态的基础提示
3:  H ← {l}                                  ▷ 初始化LMP层级栈，顶层为用户指令
4:  C ← ""
5:  while H is not empty do
6:      h ← H.pop()                          ▷ 取当前待处理的指令/函数签名
7:      if h IS_USER_INSTRUCTION then
8:          prompt_h ← prompt + INSTRUCTION_PROMPT(h, examples)
9:          c_h ← LLM(prompt_h)              ▷ 生成主执行代码
10:         C ← c_h
11:     else if h IS_UNDEFINED_FUNCTION then
12:         prompt_h ← prompt + FUNCTION_DEF_PROMPT(h, examples)
13:         c_h ← LLM(prompt_h)              ▷ 生成函数定义
14:         C ← INSERT_FUNCTION_DEF(C, c_h)
15:     end if
16:     H ← H ∪ EXTRACT_UNDEFINED_CALLS(c_h) ▷ 提取未定义函数，推入栈
17: end while
18: return C
```

该算法的核心创新在于**递归展开未定义函数**：当LLM生成的代码中调用了尚未定义的函数时（如 `stack_in_order()`），算法自动将该函数签名推入待处理栈，再调用LLM生成其函数体。最终得到一棵完整的函数调用树。

##### 5. 关键实验与发现

**空间推理的代码表达**：传统VLA模型难以表达复杂的空间关系（如"离门最近的杯子"、"沿墙排成L形"）。CaP通过代码中的数学运算（距离计算、排序、几何变换）优雅地解决：

```python
# 示例：把离门最近的杯子放到桌子上
door_pos = get_pos('door')
cups = [o for o in get_objects() if 'cup' in o]
nearest_cup = min(cups, key=lambda c: dist(get_pos(c), door_pos))
pick(nearest_cup)
place(table_pos)
```

**多模态交互与纠错**：CaP支持"代码反馈循环"——机器人执行代码后若失败，LLM可根据错误信息生成修正代码。论文展示了一个场景：机器人抓取失败后，LLM生成代码"后退、重新定位、再尝试"（即重试逻辑）。

**跨实体泛化**：在移动机器人（基于语言指令的导航+操作）和固定臂（桌面物体重排）两种场景间，CaP只需替换L0控制基元，高层L1/L2代码可完全复用，验证了代码层面的抽象能力。

##### 6. 局限性分析

- **语法/语义错误风险**：LLM生成的代码可能包含运行时错误（如空列表索引、类型不匹配），论文报告约30-40%的生成代码需事后再生成或人工修正；
- **计算开销**：复杂任务需要多轮LLM调用（为每个未定义函数递归生成），延迟较高；
- **安全边界**：代码可直接控制物理机器人，恶意或错误代码可能造成损害；论文仅在实验室环境中测试，未涉及安全沙箱；
- **感知耦合度**：代码中硬编码了感知函数名（如 `get_color`），若新环境中的感知API不同，需手动适配。

---

#### 🧪 练习题

**Q1（最简单）**：CaP提出的"语言模型程序（LMP）"与传统的"LLM直接生成动作序列"有何本质区别？这种区别为何能提升泛化能力？

**Q2（中等）**：论文Algorithm 1中的递归展开未定义函数机制（步骤16），与标准的Chain-of-Thought有何异同？请从"可验证性"和"模块化复用"两个角度分析。

**Q3（挑战）**：假设你想将CaP部署到一台全新的农业机器人上（如采摘苹果）。请列出需要替换/适配的模块，并说明哪些LMP层级可以复用、哪些需要重新获取Few-Shot示例。

**Q4（开放）**：论文提到约30-40%的生成代码需要二次修正。若要求你设计一个"验证+自动修正"模块来降低出错率，你会如何利用CaP的多轮生成能力和机器人的仿真/现实环境反馈？请勾勒大致流程。

---

> *本文基于Google Research Blog文章 [Code as Policies: Language Model Programs for Embodied Control](https://ai.googleblog.com/2022/11/code-as-policies-language-model.html) 及原始论文 [arXiv:2209.07753](https://arxiv.org/abs/2209.07753) 精读撰写。*
