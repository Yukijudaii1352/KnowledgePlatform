### ViperGPT — Python执行视觉推理 (Visual Inference via Python Execution)

```yaml
id: vipergpt
name: ViperGPT
full_name: "Python执行视觉推理 (Visual Inference via Python Execution)"
year: "2023"
org: "Columbia"
paper_url: "https://openaccess.thecvf.com/content/ICCV2023/html/Suris_ViperGPT_Visual_Inference_via_Python_Execution_for_Reasoning_ICCV_2023_paper.html"
category: compositional
parent: "visprog"
motivation: "代码执行实现可解释可调试的视觉推理"
```

#### 📝 一句话总结

ViperGPT 提出让代码生成模型直接编写并执行 Python 函数，通过 API 组合 GLIP、MiDaS、BLIP-2、X-VLM 等视觉语言模块，把复杂视觉问题转化为可审计的程序执行过程，解决端到端模型感知与推理混在一起、难以泛化和解释的问题。

#### 🎯 核心要点

- 用 Codex 作为 program generator，将自然语言视觉查询生成 Python 函数定义
- 提供抽象 API，而不是完整实现，让模型依据函数签名、docstring 和示例生成代码
- 核心类包括 `ImagePatch` 与 `VideoSegment`，支持图像 patch、视频片段、目标列表和任意 Python 返回类型
- 感知模块调用 GLIP、MiDaS、BLIP-2、X-VLM 等预训练模型，逻辑、排序、循环、算术由 Python 解释器完成
- 不训练任务专属模型，可用于 visual grounding、GQA、OK-VQA、视频因果和时间推理
- 程序中间变量可检查，错误可定位到具体 API 调用或 Python 逻辑

#### 🔬 深入细节

##### 核心示意图

![ViperGPT 执行示例](https://ar5iv.labs.arxiv.org/html/2303.08128/assets/x1.png)
*图：ViperGPT 根据图像和查询生成 Python 程序，执行程序并展示中间变量，使最终答案可解释、可调试。*

##### 算法伪代码

```python
# ViperGPT: query -> Python function -> execution
def vipergpt(query, visual_input, codex, api_spec):
    prompt = api_spec + "\n# Query: " + query + "\n"
    code = codex.generate(prompt)  # def execute_command(image): ...

    # 只暴露受控 API 环境，真实实现内部调用预训练模型
    env = {
        "ImagePatch": ImagePatch,
        "VideoSegment": VideoSegment,
        "distance": distance,
        "bool_to_yesno": bool_to_yesno,
    }
    fn = compile_python_function(code, env)
    result = fn(visual_input)
    return result, code
```

##### 动机与背景

视觉问答中的复杂问题常常需要先做感知再做符号推理。例如“每个孩子公平分到几个松饼”需要检测孩子和松饼、计数、再做除法。端到端 VLM 往往把这些步骤隐式压进一次生成，既不能保证计数和数学逻辑可靠，也无法知道错误来自检测、计数还是推理。

ViperGPT 把推理问题拆成两个系统：LLM 负责编写程序，Python 解释器负责执行逻辑，预训练视觉模型负责感知。这等价于把复杂查询 \(q\) 转换成程序 \(p\)，再执行：

$$
p = G_{\phi}(q, \mathcal{A}), \quad y = \operatorname{Exec}(p, x, \mathcal{M})
$$

其中 \(\mathcal{A}\) 是 API 规范，\(\mathcal{M}\) 是可调用的视觉语言模块集合。

##### API 设计

论文强调只把 API 规范放进 prompt，而不是把模块实现塞进上下文。`ImagePatch` 表示图像或裁剪区域，提供 `find(object_name)`、`exists(object_name)`、`verify_property(property)`、`best_text_match(options, prefix)`、`simple_query(question)`、`compute_depth()`、`crop(...)` 等方法。`VideoSegment` 则处理视频区间、帧采样和时间关系。

这种抽象有两个好处。第一，LLM 的上下文只需要理解“能调用什么”和“返回什么”，不会被实现细节占满。第二，模块实现可以升级，例如把 detector 从 GLIP 换成更强模型，而程序生成接口不变。

##### Python 执行与可解释性

ViperGPT 和 VisProg 的差异在于它不是只生成受限的模块调用序列，而是直接生成 Python 函数。Python 的 `if/else`、`for`、`sort`、`math` 等语言能力自然提供符号推理、控制流和算术能力；视觉模块则只处理它们擅长的感知任务。

> 💡 关键：ViperGPT 的可解释性来自真实执行轨迹。生成的代码、中间 patch、检测结果和最终返回值都能被检查，而不是让模型事后生成解释。

##### 模块与任务覆盖

论文实现中使用 GLIP 处理开放词汇检测和存在性判断，MiDaS 处理深度估计，BLIP-2 处理图像问答，X-VLM/CLIP 类模型处理图文匹配。基于这些模块，ViperGPT 在 RefCOCO/RefCOCO+ 做 visual grounding，在 GQA 做组合 VQA，在 OK-VQA 做外部知识依赖问答，在视频任务上处理因果和时间关系。

在 GQA 中，代码可以先定位目标，再裁剪相对区域，最后对局部区域调用 VQA；在 OK-VQA 中，程序可先抽取图像实体，再用 LLM 查询外部知识；在视频任务中，程序能遍历帧或片段并比较时间顺序。这些都利用了 Python 的结构化控制能力。

##### 与 VisProg 的区别

VisProg 生成更接近 DSL 的模块调用列表，强调模块库和可视化 rationale；ViperGPT 进一步放宽为普通 Python 代码，表达力更强，也更自然支持复杂控制流和任意返回类型。代价是代码安全、运行错误和 API 滥用需要额外防护，因此实际系统中应限制执行环境并审计可调用函数。

#### 🧪 练习题

```yaml
question: "ViperGPT 为什么要把视觉查询转换成 Python 代码执行？"
options:
  - "为了让 Python 替代所有视觉模型"
  - "为了显式组合感知模块与符号逻辑，使中间步骤可检查并支持控制流、算术和条件判断"
  - "为了减少图像输入大小"
  - "为了训练一个新的端到端视觉编码器"
answer: 1
explain: "ViperGPT 让 Codex 生成 Python 函数，视觉模块负责感知，Python 负责逻辑执行，因此复杂任务能被拆解、审计和调试。"
```
