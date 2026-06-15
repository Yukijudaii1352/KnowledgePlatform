### LLaVA-CoT — LLaVA思维链推理 (LLaVA Chain-of-Thought)

```yaml
id: llava_cot
name: LLaVA-CoT
full_name: "LLaVA思维链推理 (LLaVA Chain-of-Thought)"
year: "2025"
org: "ByteDance"
paper_url: "https://openaccess.thecvf.com/content/ICCV2025/html/Xu_LLaVA-CoT_Let_Vision_Language_Models_Reason_Step-by-Step_ICCV_2025_paper.html"
category: mm_cot
parent: "llava"
motivation: "让VLM逐步推理，结构化提升多步准确性"
```

#### 📝 一句话总结

LLaVA-CoT 提出让 VLM 自主生成 Summary、Caption、Reasoning、Conclusion 四阶段结构化推理，并配合阶段级测试时搜索 SWIRES，解决普通 VLM 在复杂视觉问答中仓促回答、推理路径不稳定的问题。

#### 🎯 核心要点

- 将多模态回答显式拆为 `<SUMMARY>`、`<CAPTION>`、`<REASONING>`、`<CONCLUSION>` 四个阶段
- 构建 LLaVA-CoT-100k 数据集，用 GPT-4o 将多源 VQA 样本重写为结构化推理标注
- 基座模型为 Llama-3.2-11B-Vision-Instruct，使用全参数 SFT 学会阶段化输出
- Summary 负责解题规划，Caption 负责视觉解释，Reasoning 负责逻辑推导，Conclusion 输出最终答案
- 提出 SWIRES 阶段级回溯搜索：在每个阶段生成候选、奖励模型评分、低质量时回溯重试
- 使用 InternLM-XComposer2.5-Reward 作为测试时奖励模型，在 MMStar、MMBench、MMVet、MathVista、AI2D、HallusionBench 上验证

#### 🔬 深入细节

##### 核心示意图

![LLaVA-CoT 推理示例](https://raw.githubusercontent.com/PKU-YuanGroup/LLaVA-CoT/main/figures/reasoning.png)
*图：公开项目示例展示 LLaVA-CoT 如何先总结任务、描述图像，再逐步推理并给出结论。*

![LLaVA-CoT 基准表现](https://raw.githubusercontent.com/PKU-YuanGroup/LLaVA-CoT/main/figures/result.png)
*图：LLaVA-CoT 项目页展示其 11B 模型在六个多模态推理基准上的平均表现。*

##### 算法伪代码

```python
# LLaVA-CoT 四阶段生成 + SWIRES 阶段搜索
STAGES = ["SUMMARY", "CAPTION", "REASONING", "CONCLUSION"]

def llava_cot_answer(image, question, model):
    context = [image, question]
    outputs = {}
    for stage in STAGES:
        outputs[stage] = model.generate(
            context=context,
            prefix=f"<{stage}>"
        )
        context.append(f"<{stage}>{outputs[stage]}</{stage}>")
    return outputs["CONCLUSION"], outputs

def swires(image, question, model, reward_model, m=4, n=2, max_backtracks=3):
    summary = generate_stage(model, image, question, "SUMMARY")
    beams = [(summary, 0.0)]

    for stage in ["CAPTION", "REASONING", "CONCLUSION"]:
        candidates = []
        backtracks = 0
        while backtracks <= max_backtracks:
            for prefix, _ in beams:
                for _ in range(m):
                    out = generate_stage(model, image, question, stage, prefix)
                    score = reward_model.score(image, question, prefix + out)
                    candidates.append((prefix + out, score))
            candidates = sorted(candidates, key=lambda x: x[1], reverse=True)
            if quality_is_enough(candidates, reward_model) or stage == "CONCLUSION":
                break
            backtracks += 1
        beams = candidates[:n]
    return beams[0][0]
```

##### 动机与背景

普通 VLM 在复杂视觉问题中常见两类错误：一是没有先弄清问题就直接回答，二是在推理过程中遗漏或误读视觉证据。简单加一句“think step by step”并不稳定，因为模型仍可能把视觉描述、逻辑计算和最终答案混在一起生成，错误会在长回答中逐步累积。

LLaVA-CoT 的核心设计是给推理过程加结构边界。四个阶段分别承担不同职责：Summary 先决定要解决什么，Caption 把与问题相关的图像事实说清楚，Reasoning 在这些事实上推导，Conclusion 只输出最终结果。这个结构让模型学到更可控的生成顺序。

##### 四阶段结构化推理

模型输出被 XML-like 标签包裹：

```text
<SUMMARY>分析问题目标和所需步骤</SUMMARY>
<CAPTION>描述与问题相关的图像细节</CAPTION>
<REASONING>基于视觉事实逐步推理</REASONING>
<CONCLUSION>给出最终答案</CONCLUSION>
```

从概率建模角度，完整回答被分解为阶段条件生成：

$$
p(y\mid x,q)=\prod_{s\in\{\text{sum,cap,rea,con}\}} p(y_s\mid x,q,y_{<s})
$$

这种分解让后续阶段显式依赖前序阶段，Caption 的视觉事实成为 Reasoning 的条件，Reasoning 的结论再约束 Conclusion。

##### 数据与训练流程

LLaVA-CoT-100k 从多个视觉问答来源构造训练样本，覆盖通用 VQA、图表、文档 OCR、数学、科学和幻觉检测相关任务。作者使用 GPT-4o 生成四阶段标注，并过滤格式错误或答案不一致的样本。训练时对 Llama-3.2-11B-Vision-Instruct 做监督微调，让模型在没有额外提示模板约束时也能自然产出四阶段推理。

损失就是标准自回归语言建模损失，只是目标序列包含结构标签：

$$
\mathcal{L}_{\text{SFT}}=-\sum_t \log p_{\theta}(y_t\mid y_{<t}, I, q)
$$

> 💡 关键：标签不是展示格式而已。消融中去掉结构标签会降低效果，说明阶段边界帮助模型建立更稳定的内部推理流程。

##### SWIRES 测试时搜索

SWIRES 利用四阶段输出的天然边界做 test-time scaling。传统 Best-of-N 对完整回答采样再评分，粒度太粗；如果中间视觉描述错了，后面再好也难修复。SWIRES 在 Caption、Reasoning、Conclusion 等阶段分别生成候选，用奖励模型打分，保留 top-\(N\)，若候选质量低于阈值则回溯重试。

论文用奖励分数均值和方差设定回溯阈值：

$$
\tau=\mu_{\text{reward}} + Z\sigma_{\text{reward}}
$$

当阶段候选的高分项不足以通过阈值时，系统重新生成该阶段，最多回溯 \(C\) 次。这样做的直觉是把搜索预算花在“出错阶段”，而不是盲目生成更多完整答案。

##### 与传统 CoT 的区别

传统 CoT 主要增加推理文本长度，不区分规划、视觉观察和逻辑计算。LLaVA-CoT 把这些职责显式拆开，并用训练数据让模型习惯这种结构。相比 Visual CoT 的 bbox/局部重编码，LLaVA-CoT 更偏语言结构化推理；相比 VisProg/ViperGPT，它不执行外部程序，而是在 VLM 内部完成分阶段生成。

#### 🧪 练习题

```yaml
question: "LLaVA-CoT 中 SWIRES 相比 Best-of-N 的核心区别是什么？"
options:
  - "SWIRES 在完整回答级别一次性采样更多答案"
  - "SWIRES 在推理阶段级别生成、评分和回溯候选，而不是只对完整回答排序"
  - "SWIRES 通过重新训练奖励模型提升结果"
  - "SWIRES 只保留 Summary 阶段，不生成其他阶段"
answer: 1
explain: "SWIRES 利用 Summary、Caption、Reasoning、Conclusion 的阶段边界，在中间阶段就筛选和回溯，从而更早修复视觉描述或逻辑推理错误。"
```
