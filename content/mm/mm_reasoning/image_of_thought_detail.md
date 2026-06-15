### Image-of-Thought — 图像思维提示 (Image-of-Thought Prompting)

```yaml
id: image_of_thought
name: Image-of-Thought
full_name: "图像思维提示 (Image-of-Thought Prompting)"
year: "2024.05"
org: "CUHK"
paper_url: "https://arxiv.org/abs/2405.13872"
category: mm_cot
parent: "visual_cot"
motivation: "每步锚定文本与视觉证据，精细化推理"
```

#### 📝 一句话总结

Image-of-Thought 提出一种免训练 prompting 方法，让 MLLM 自动把问题拆成子目标，并在每一步调用图像处理工具生成视觉证据，再用“文本理由 + 视觉理由”的混合 rationale 修正最终答案，解决纯文本 CoT 难以可靠锚定图像细节的问题。

#### 🎯 核心要点

- 将 CoT 从纯文本扩展为多模态 rationale：每步包含 step、visual rationale、textual rationale 三元组
- 自动设计 IoT 流程：模型根据问题选择需要关注的目标、区域、空间关系或颜色等视觉操作
- 工具箱包含 FastSAM、GroundingDINO 和 PIL 等图像处理能力，用于分割、检测、裁剪、区域增强和空间辅助
- 将每一步生成的视觉证据重新输入 MLLM，使最终回答建立在显式可见的中间图像证据上
- 不需要额外训练数据或微调，主要依赖提示模板、多轮交互和外部视觉工具
- 在 MMBench、MME、MMVet 上验证，对空间关系、位置、属性比较等认知类任务提升更明显

#### 🔬 深入细节

##### 核心示意图

![Image-of-Thought 方法框架](https://arxiv.org/html/2405.13872v2/x1.png)
*图：IoT prompting 先设计图像处理步骤，逐步提取视觉 rationale，再把混合 rationale 序列反馈给 MLLM 修正答案。*

##### 算法伪代码

```python
# Image-of-Thought Prompting
def image_of_thought(question, image, mllm, toolbox):
    # 1. 让 MLLM 根据问题自动规划视觉证据抽取流程
    sub_goals = mllm.plan_visual_steps(question, image)
    rationales = []

    # 2. 每个子目标选择并执行图像处理操作
    for goal in sub_goals:
        action = mllm.select_tool(goal, toolbox)
        visual_rationale = toolbox.execute(action, image, goal)
        textual_rationale = mllm.explain_step(question, goal, visual_rationale)
        rationales.append({
            "step": goal,
            "visual": visual_rationale,
            "text": textual_rationale,
        })

    # 3. 把图像证据链和文本理由链一起反馈给模型
    answer = mllm.refine_answer(question, image, rationales)
    return answer, rationales
```

##### 动机与背景

多模态 CoT 的核心难点是：语言模型可以生成看似合理的推理步骤，但这些步骤未必真的来自图像。尤其在空间关系、目标位置、局部颜色、遮挡和多目标比较任务中，纯文本 CoT 容易把“猜测的描述”当成证据，导致推理链可读但不可靠。

Image-of-Thought 的思路是把中间推理步骤显式落到图像操作上。模型不只是写“我需要看左上角”，还要选择检测、分割、裁剪、空间标尺、颜色空间转换等操作，得到一个可重新输入模型的视觉 rationale。这样每一步推理都有对应的图像证据。

##### 多模态 rationale 三元组

IoT 把每个中间步骤表示成：

$$
r_i=(s_i, v_i, t_i)
$$

其中 \(s_i\) 是子目标或操作说明，\(v_i\) 是工具生成的视觉证据，\(t_i\) 是 MLLM 对该视觉证据的文字解释。多个步骤串联后形成 multimodal rationale series：

$$
R=\{(s_1,v_1,t_1),\dots,(s_n,v_n,t_n)\}
$$

最终回答不是直接从原图和问题生成，而是基于 \(R\) 做答案 refining：

$$
a=\operatorname{MLLM}(q, I, R)
$$

这种设计把“想什么”和“看到了什么”绑定起来，减少文本理由脱离图像的风险。

##### 工具调用与视觉证据抽取

论文使用可扩展工具箱来生成视觉 rationale。FastSAM 负责快速分割和显著区域提取，GroundingDINO 支持文本条件目标检测，PIL 用于裁剪、区域拼接、坐标标注、颜色变换等基础图像处理。论文还讨论了空间标尺、密集目标检测、referring object detection、颜色空间转换等操作，它们共同服务于把复杂问题拆成更小的视觉检查点。

> 💡 关键：IoT 的工具不是为了替代 MLLM，而是把 MLLM 的注意力落到“可以重新看的中间图像”上；最终判断仍由 MLLM 综合原图、子图和文本理由完成。

##### 训练/推理流程

IoT 是 training-free 方法。推理开始时，提示词要求模型“逐步思考图像特征”，并告知模型可以使用图像处理操作。模型先规划子目标，再为每个子目标选择工具并生成视觉 rationale。得到 rationale 序列后，模型再次看到这些中间结果，并输出修正后的最终答案。

与 Visual CoT 的数据监督不同，IoT 不需要预先标注 bbox 或训练模型学会定位。它更像一个推理时流程控制器：通过 prompt 让 MLLM 自主决定要抽取哪些视觉证据，并把抽取到的图像片段作为额外上下文。优点是部署轻、无需训练；代价是依赖工具质量和多轮调用稳定性。

##### 与传统 CoT 的区别

传统 CoT 只扩展文本上下文，无法保证每一步都被视觉证据支持；IoT 则把每步理由拆为视觉和文本两部分。当问题需要判断“哪一个更靠左”“某个小物体是什么颜色”“两个对象是否接触”时，视觉 rationale 能直接突出相关区域，降低模型在整图中遗漏关键证据的概率。

#### 🧪 练习题

```yaml
question: "Image-of-Thought 中 multimodal rationale 的核心组成是什么？"
options:
  - "只包含最终答案和置信度"
  - "由 step、visual rationale、textual rationale 组成的三元组序列"
  - "仅由模型隐藏层 attention map 组成"
  - "由训练集标签和梯度信息组成"
answer: 1
explain: "IoT 每一步都绑定子目标、图像处理得到的视觉证据和 MLLM 生成的文本解释，再把这些混合理由反馈给模型修正答案。"
```
