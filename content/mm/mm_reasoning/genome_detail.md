### GENOME — 生成式神经符号推理 (Generative Neuro-Symbolic Reasoning)

```yaml
id: genome
name: GENOME
full_name: "生成式神经符号推理 (Generative Neuro-Symbolic Reasoning)"
year: "2024"
org: "MIT"
paper_url: "https://openreview.net/forum?id=GENOME2024"
category: compositional
parent: "vipergpt"
motivation: "模块生长与重用，动态扩展组合泛化"
```

#### 📝 一句话总结

GENOME 提出让 LLM 从少量训练样例中判断现有模块是否足够、自动生成新模块并通过测试后加入模块库，使神经符号视觉推理系统能像积累技能一样“生长和复用”模块，解决 VisProg/ViperGPT 每个样例都重新生成代码、难以积累可迁移能力的问题。

#### 🎯 核心要点

- 三阶段框架：Module Initialization、Module Generation、Module Execution
- 模块初始化阶段判断现有模块能否解决新任务，若不足则生成新模块签名和输入输出规范
- 模块生成阶段让 LLM 编写新模块代码，并用少量训练样例作为测试用例验证通过率
- 只有通过测试的新模块才被加入可扩展 module library，供后续任务复用
- 模块执行阶段把新查询解析为高层符号操作，并调用已有和新生成模块完成推理
- 覆盖 VQA、referring expression comprehension、Raven、图像编辑、知识标注等任务，强调模块迁移和少样本适应

#### 🔬 深入细节

##### 核心示意图

![GENOME 三阶段框架](https://ar5iv.labs.arxiv.org/html/2311.04901/assets/x2.png)
*图：GENOME 包含模块初始化、模块生成、模块执行三阶段；新模块通过测试后进入模块库，并可在后续任务中复用。*

##### 算法伪代码

```python
# GENOME: grow and reuse visual reasoning modules
def genome_train(task_examples, module_library, llm):
    # Stage 1: 判断现有模块是否足够，并提出新模块签名
    need_new, signatures, reasoning_tests = llm.initialize_modules(
        examples=task_examples,
        existing_signatures=module_library.signatures()
    )

    # Stage 2: 生成并测试新模块
    for sig in signatures if need_new else []:
        for attempt in range(MAX_TRIES):
            code = llm.write_module(sig, task_examples, module_library.signatures())
            module = compile_module(code)
            passed = run_unit_tests(module, reasoning_tests, task_examples)
            if passed:
                module_library.add(sig.name, module)
                break
    return module_library

def genome_infer(image, query, module_library, llm):
    # Stage 3: 将自然语言 query 解析成高层程序并执行
    program = llm.parse_to_symbolic_program(query, module_library.signatures())
    state = {"IMAGE": image}
    for op in program:
        state[op.output] = module_library[op.name](*resolve_args(op, state))
    return state[program.return_value]
```

##### 动机与背景

VisProg 需要人类预先定义模块，ViperGPT 虽然能为每个样例生成代码，但通常是“一次性代码”：每来一个新输入就重新生成完整代码片段，没有把成功经验沉淀成可复用模块。这样既低效，也容易在相似问题上重复犯错。

GENOME 的核心目标是让神经符号系统拥有“模块生长”的能力。系统从少量样例中发现现有模块缺口，生成一个有明确输入输出的新模块，并用这些样例当作测试集验证模块是否真正可用。通过测试后，模块被加入库中，后续任务可以直接复用或组合它。

##### 三阶段机制

第一阶段是 Module Initialization。LLM 读取训练样例和已有模块签名，判断现有操作是否足以表达解题过程。如果不足，它会提出新模块，例如 `COMPARE_ATTRIBUTE(IMAGE, BOX0, BOX1, ATTR)`，并给出输入输出类型与推理步骤。这一步决定“要长出什么技能”。

第二阶段是 Module Generation。LLM 根据模块签名和样例生成 Python 代码，代码可以调用已有视觉模块或基础函数。系统将少量训练样例变成测试用例，执行生成模块并检查输出；失败时继续重试或改写。只有通过测试的模块才会加入库：

$$
\mathcal{M}_{t+1}=\mathcal{M}_t \cup \{m_{\text{new}}\}, \quad \text{if } \operatorname{Pass}(m_{\text{new}}, \mathcal{D}_{\text{few-shot}})
$$

第三阶段是 Module Execution。面对测试查询，LLM 将自然语言解析成高层符号程序，执行器调用模块库中已有模块和新模块得到结果。此时系统不必为每个样例从零写完整程序，而是复用已经验证过的能力块。

##### 为什么测试用例重要

GENOME 与普通代码生成的关键差异是“生成后验证”。视觉推理模块的失败可能来自输入类型不匹配、边界框处理错误、属性比较逻辑错误或对已有模块调用方式错误。少量训练样例虽然不是大规模监督数据，但足以作为 sanity check，过滤明显不可用的模块。

> 💡 关键：GENOME 把 few-shot examples 从“提示 LLM 怎么回答”升级为“测试新模块能否成为可复用技能”的依据。

##### 模块复用与迁移

一旦新模块进入库，它不仅能用于同一任务的新样本，也能迁移到相关任务。例如用于比较对象属性、判断空间关系、识别模式结构的模块，可以从 VQA 迁移到图像编辑、知识标注或 Raven 式视觉推理。模块库越丰富，后续任务越可能通过组合已有模块解决。

这种设计也提升了可解释性。最终答案来自符号程序的执行轨迹，而不是黑箱生成；当结果错误时，可以检查是解析程序错了、某个已有模块错了，还是新模块没有覆盖足够案例。

##### 与 ViperGPT 的区别

ViperGPT 强调直接生成并执行 Python 代码，表达力强但缺少长期记忆；GENOME 进一步把代码片段提升为命名模块，并通过测试后持久化到模块库。它的目标不是为每个输入“临时写脚本”，而是让系统逐步形成可复用的视觉推理技能集。

#### 🧪 练习题

```yaml
question: "GENOME 中新模块为什么要先通过少量训练样例测试再加入模块库？"
options:
  - "为了增加模型参数量"
  - "为了验证生成代码确实满足输入输出规范并能解决目标任务，避免不可用模块污染模块库"
  - "为了把图像转换成更高分辨率"
  - "为了完全替代 LLM 的程序解析能力"
answer: 1
explain: "GENOME 的核心是生成可复用模块；测试用例用于过滤错误实现，只有通过验证的模块才会被沉淀为后续可复用技能。"
```
