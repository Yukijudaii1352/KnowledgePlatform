### VisProg — 视觉编程 (Visual Programming)

```yaml
id: visprog
name: VisProg
full_name: "视觉编程 (Visual Programming)"
year: "2023"
org: "UW"
paper_url: "http://openaccess.thecvf.com/content/CVPR2023/html/Gupta_Visual_Programming_Compositional_Visual_Reasoning_Without_Training_CVPR_2023_paper.html"
category: compositional
parent: "blip2"
motivation: "LLM生成Python调用视觉API，无需训练"
```

#### 📝 一句话总结

VisProg 提出用 LLM 根据自然语言指令生成 python-like 视觉程序，再调用现成视觉模型、图像处理函数和 Python 逻辑执行组合推理，解决端到端 VLM 难以无训练覆盖长尾复杂视觉任务的问题。

#### 🎯 核心要点

- 使用 GPT-3 的 in-context learning 从少量“指令-程序”示例生成视觉程序，无需梯度训练
- 程序由一系列模块调用组成，每行读取前序变量并产生新的中间变量
- 模块库包含 OWL-ViT、DSFD、MaskFormer、CLIP、ViLT、Stable Diffusion、OpenCV/Python 函数等
- 支持四类任务：组合 VQA、图像对 NLVR 零样本推理、知识目标标注、语言引导图像编辑
- 每个模块实现 `parse`、`execute`、`html` 三类接口，既执行计算也生成可视化 rationale
- 与 Neural Module Networks 不同，VisProg 不学习模块布局和模块参数，而是重用现成模型和 Python 解释器

#### 🔬 深入细节

##### 核心示意图

![VisProg 系统框架](https://ar5iv.labs.arxiv.org/html/2211.11559/assets/x1.png)
*图：VisProg 根据自然语言指令生成模块化视觉程序，执行时调用视觉/语言/图像处理模块，并汇总中间结果形成可解释 rationale。*

##### 算法伪代码

```python
# VisProg 推理流程
def visprog(image_or_images, instruction, llm, examples, module_registry):
    prompt = build_prompt(examples, instruction)
    program_text = llm.generate(prompt)  # python-like module calls

    state = {"IMAGE": image_or_images}
    rationale_html = []
    for step in parse_program(program_text):
        module = module_registry[step.module_name]
        inputs = [state[name] for name in step.input_variables]
        output = module.execute(*inputs, **step.literal_args)
        state[step.output_variable] = output
        rationale_html.append(module.html(inputs, output))

    return state[program_text.return_variable], rationale_html
```

##### 动机与背景

许多真实视觉任务不是单一分类或问答，而是“定位目标、裁剪区域、读取属性、查知识、做计数或逻辑判断”的组合。端到端模型需要为每种任务收集数据并训练，Neural Module Networks 虽然可组合，但通常要学习程序布局和模块参数，监督昂贵且很难扩展到开放长尾任务。

VisProg 的关键判断是：复杂任务的组合逻辑可以交给 LLM 生成程序，而底层感知能力可以复用已有模型。这样系统不需要为每个新任务微调，只要在 prompt 中提供几个示例，LLM 就能根据指令生成调用模块的程序。

##### 模块与程序表示

每个程序步骤包含模块名、输入变量、字面参数和输出变量，例如可以先 `LOC(image=IMAGE, object='person')` 得到人框，再 `CROP` 出区域，最后调用 `VQA` 或 `COUNT`。从形式上看，VisProg 学的是一个函数组合：

$$
y = m_k(\dots m_2(m_1(x))\dots)
$$

其中 \(m_i\) 可以是神经模型、图像处理函数、知识检索或 Python 逻辑。模块的输入输出不局限于文本，也可以是 bbox、mask、图像 patch、对象列表或生成图像。

##### 可解释执行器

VisProg 的执行器维护一个状态字典：

$$
S_t = S_{t-1} \cup \{v_t = m_t(\operatorname{args}_t; S_{t-1})\}
$$

这意味着每一步的中间变量都可检查。模块除了 `execute()` 外还提供 `html()`，用于可视化输入和输出，例如显示检测框、分割 mask、裁剪图或编辑结果。最终 rationale 不是语言模型自己编写的解释，而是执行轨迹的可视化摘要。

> 💡 关键：VisProg 的“思维链”是可运行程序，而不是纯自然语言。程序一旦执行失败或中间结果错误，用户可以定位是哪一步模块或哪条指令出了问题。

##### 训练/推理流程

VisProg 没有任务专属训练阶段。用户为某类任务写少量 in-context 示例，每个示例包含自然语言指令和期望程序。推理时把这些示例与新指令拼接给 GPT-3，得到视觉程序后由解释器执行。由于 LLM 不直接看图像，程序生成依赖指令语义；具体视觉内容则在执行阶段由模块读取。

论文展示了 20 个左右模块的组合能力。对于 GQA，系统可把复杂问题拆成定位、裁剪、VQA、计数、表达式求值；对于 NLVRv2，系统把图像对问题拆成两张图上的局部判断和 Python 布尔表达式；对于知识目标标注，GPT-3 可生成候选类别列表，再用 CLIP 对区域分类；对于图像编辑，则组合分割和 Stable Diffusion 等模块完成局部修改。

##### 与 VLM/Neural Module Networks 的区别

端到端 VLM 把感知和推理都压进一次前向传播，缺少显式中间状态；Neural Module Networks 依赖训练得到的布局或模块，扩展新模块成本高。VisProg 把布局生成交给 LLM，把逻辑执行交给 Python，把感知交给现成专家模型，因此更灵活、更容易调试，但性能也受限于程序生成稳定性和模块库覆盖范围。

#### 🧪 练习题

```yaml
question: "VisProg 相比端到端 VLM 的核心优势是什么？"
options:
  - "通过更大图像分辨率提升所有任务性能"
  - "把复杂视觉任务拆成可执行模块程序，复用现成模型且无需任务专属训练"
  - "只使用一个 CLIP 向量完成所有推理"
  - "完全不依赖语言模型"
answer: 1
explain: "VisProg 让 LLM 生成程序，执行器调用视觉、语言和 Python 模块，显式暴露中间结果，因此更适合组合式长尾任务。"
```
