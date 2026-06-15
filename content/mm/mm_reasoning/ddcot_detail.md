### DDCoT — 职责分离思维链 (Duty-Distinct Chain-of-Thought)

```yaml
id: ddcot
name: DDCoT
full_name: "职责分离思维链 (Duty-Distinct Chain-of-Thought)"
year: "2023"
org: "Tsinghua"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/108030643e640ac050e0ed5e6aace48f-Abstract-Conference.html"
category: mm_cot
parent: "mm_cot"
motivation: "职责分离减轻幻觉，提升推理可靠性"
```

#### 📝 一句话总结

DDCoT 将多模态 CoT 中的“语言推理”和“视觉识别”职责显式拆开，用 negative-space prompting 标记 LLM 无法仅凭文本确定的部分，再调用视觉模型补全证据，解决了 LLM 在看不见图像时编造视觉事实导致推理幻觉的问题。

#### 🎯 核心要点

- Duty-distinct prompting：把复杂问题拆成子问题，并判断每个子问题是否需要视觉识别
- Negative-space prompting：要求 LLM 在缺少图像时对不可判断子问题回答 `Uncertain`
- 视觉补全：使用现成 VQA/视觉模型回答被标记为不确定的视觉子问题
- 批判式整合：LLM 在整合阶段被提示“补充信息可能无效”，从而筛选或修正视觉模型错误
- 同时支持 zero-shot prompting 和 fine-tuning 两种使用方式
- Deep-Layer Prompting：在微调小模型时为不同 encoder 层加入可学习 prompts
- Rationale-Compressed Visual Embedding：用生成的 rationale 过滤和压缩关键视觉特征

#### 🔬 深入细节

##### 核心架构示意图

![DDCoT 框架总览](https://ar5iv.labs.arxiv.org/html/2310.16436/assets/x5.png)
*图：DDCoT 先把问题拆成语言推理与视觉识别子任务，再将视觉补全结果与原问题联合整合为 rationale，并可用于 zero-shot 或 fine-tuning。*

##### 算法伪代码

```python
# DDCoT rationale generation
def ddcot(question, context, choices, image):
    sub_questions = llm(
        "Think step by step and deconstruct the question "
        "into necessary sub-questions.",
        question, context, choices
    )

    sub_answers = []
    for sq in sub_questions:
        text_answer = llm(
            "Assume you have no image. Answer the sub-question; "
            "write Uncertain if it cannot be determined.",
            sq, question, context, choices
        )
        if text_answer == "Uncertain":
            visual_answer = vqa_model(image, sq)
            sub_answers.append((sq, visual_answer, "visual"))
        else:
            sub_answers.append((sq, text_answer, "language"))

    rationale = llm(
        "Use the supplementary information critically; it may be invalid. "
        "Select valid information and reason step by step.",
        question, context, choices, sub_answers
    )
    return rationale

# 使用方式
rationale = ddcot(Q, C, M, I)
answer = llm_or_finetuned_model(Q, C, M, I, rationale)
```

##### 动机与背景

多模态 CoT 的难点不只是“需要图像”，更在于 LLM 很容易把自身语言先验当成视觉事实。例如问题需要判断图中物体朝向、数量或相对位置时，纯文本 LLM 往往会生成流畅但错误的中间推理。DDCoT 的两个核心洞察是：保持批判性，以及让不同模型做自己擅长的事。

“职责分离”意味着 LLM 不应被迫承担视觉识别职责。它擅长拆解问题、组织逻辑、整合证据；视觉模型擅长回答局部识别问题。把这两类职责混在一个 prompt 中，会让 LLM 在看不见图像时编造缺失信息。

##### Negative-space prompting

DDCoT 首先让 LLM 将原问题拆成一组必要子问题。然后显式设定一个假设：“你没有任何图片信息”。在这个假设下，如果子问题可由题干、选项和常识回答，LLM 给出文本子答案；如果必须看图，则输出 `Uncertain`。

这个 `Uncertain` 就是 negative space：它不是失败，而是把缺失的视觉证据标记出来。相比让 LLM 直接猜测，negative space 把不确定性显式暴露，后续系统才能调用视觉模型补全。

##### 视觉补全与批判式整合

对每个 `Uncertain` 子问题，DDCoT 调用视觉问答模型获取视觉补充答案。视觉模型可能也会出错，因此 DDCoT 不把这些答案当作绝对事实，而是在最终整合 prompt 中明确提醒 LLM：补充信息不一定有效，需要选择可信信息形成 rationale。

> 💡 关键：DDCoT 不是简单“LLM + VQA”。它把视觉模型输出放在可被质疑的补充证据位置，让 LLM 在整合时保留对原问题和常识的一致性检查。

##### Fine-tuning 使用：DLP 与 RCVE

除了 zero-shot prompting，DDCoT 还把生成的 rationale 用于微调较小的多模态模型。Deep-Layer Prompting 在 encoder 的多层插入可学习 prompt，使浅层和深层都能参与跨模态对齐，而不是只在输入层拼接视觉信息。

Rationale-Compressed Visual Embedding 则利用 rationale 作为先验来筛选视觉特征。给定文本/理由表示 \(T\)、全局视觉特征 \(V_g\) 和局部视觉特征 \(V_l\)，模型先用 cross-attention 得到与文本相关的视觉摘要：

$$
\tilde{V}_g=\mathrm{CrossAttn}(Q=T,K=V_g,V=V_g)
$$

再通过低秩中间向量从局部视觉特征中过滤关键区域，形成最终输入语言模型的压缩视觉 embedding。直觉上，rationale 告诉模型“应该看什么”，RCVE 则把视觉输入压缩到与推理相关的部分。

##### 训练/推理流程

Zero-shot 场景中，DDCoT 先生成 rationale，再把 rationale 与题目一起输入 GPT-3/ChatGPT 等 LLM 预测答案。Fine-tuning 场景中，生成的 multimodal rationales 作为训练信号，配合 DLP 和 RCVE 微调 UnifiedQA 等小模型，在 ScienceQA 上提升答案准确率和解释质量。

论文强调 DDCoT 的 rationale 在自动指标上未必总是最高，但在人类评估中的相关性、正确性、完整性、一致性和可解释性更强。这与方法目标一致：它追求的是可靠视觉 grounding，而不只是生成与参考文本表面相似的解释。

##### 与 Multimodal-CoT 的区别

Multimodal-CoT 通过架构注入视觉特征，并用两阶段训练缓解小模型幻觉；DDCoT 则从 prompt 和职责分解角度处理幻觉。它不要求每一步都由同一个模型完成，而是让 LLM 承担推理规划与整合，让视觉模型承担识别，并通过 negative space 避免 LLM 在视觉缺失处过度自信。

#### 🧪 练习题

```yaml
question: "DDCoT 中 negative-space prompting 的主要作用是什么？"
options:
  - "让 LLM 在无法仅凭文本判断的视觉子问题上显式输出不确定"
  - "把所有图像转换成黑白图"
  - "删除最终 rationale 中的所有视觉信息"
  - "强制视觉模型完成语言推理"
answer: 0
explain: "Negative-space prompting 要求 LLM 承认缺失视觉证据，避免编造事实，并为后续视觉模型补全留下明确接口。"
```
