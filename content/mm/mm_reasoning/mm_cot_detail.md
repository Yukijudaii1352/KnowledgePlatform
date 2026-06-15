### Multimodal-CoT — 多模态思维链 (Multimodal Chain-of-Thought)

```yaml
id: mm_cot
name: Multimodal-CoT
full_name: "多模态思维链 (Multimodal Chain-of-Thought)"
year: "2023.02"
org: "Amazon"
paper_url: "https://arxiv.org/abs/2302.00923"
category: mm_cot
parent: "blip2"
motivation: "两阶段框架生成推理理由，首超人类水平"
```

#### 📝 一句话总结

Multimodal-CoT 将多模态问答拆成“先生成视觉语言依据的 rationale、再基于 rationale 推断答案”两个阶段，解决了小于 1B 的语言模型直接生成 CoT 时容易幻觉并误导答案的问题。

#### 🎯 核心要点

- 两阶段框架：Stage 1 生成 rationale，Stage 2 将 rationale 拼回输入后预测答案
- 视觉特征参与两个阶段：图像不是先转成 caption，而是通过冻结 ViT 提供 patch-level features
- T5/FLAN-Alpaca backbone：用 encoder-decoder 语言模型实现文本生成式 rationale 与 answer
- 跨模态交互模块：文本表示作为 query，视觉 patch 表示作为 key/value 做单头注意力
- 门控融合：自适应融合语言表示和视觉注意力输出，降低无关视觉信息干扰
- 支持无图问题：没有图像时使用同形状零向量作为 blank visual features
- ScienceQA 和 A-OKVQA 验证：显示视觉特征可减少幻觉、加速收敛并提升答案准确率

#### 🔬 深入细节

##### 核心架构示意图

![Multimodal-CoT 两阶段框架](https://ar5iv.labs.arxiv.org/html/2302.00923/assets/x4.png)
*图：Multimodal-CoT 先用语言和视觉输入生成 rationale，再把 rationale 加入第二阶段输入以推断最终答案。*

##### 算法伪代码

```python
# 训练阶段：两个模型结构相同，但目标不同
for question, context, choices, image, rationale, answer in scienceqa:
    x1 = concat(question, context, choices)
    v = frozen_vit(image) if image is not None else zeros_like_visual_features()

    pred_rationale = model_rationale(language=x1, vision=v)
    loss_r = seq2seq_loss(pred_rationale, rationale)

    x2 = concat(question, context, choices, rationale)
    pred_answer = model_answer(language=x2, vision=v)
    loss_a = seq2seq_loss(pred_answer, answer)

    optimize(loss_r + loss_a)

# 推理阶段：先生成，再回答
r_hat = model_rationale(language=concat(Q, C, M), vision=V)
a_hat = model_answer(language=concat(Q, C, M, r_hat), vision=V)
```

##### 动机与背景

语言模型的 CoT 能在数学和常识任务上提升推理，但论文发现小模型在 ScienceQA 这类多模态任务上直接输出“rationale 再 answer”反而会降低准确率。原因是模型会生成看似合理但与图像不一致的 rationale，一旦错误 rationale 被放在答案前面，就会强烈误导后续答案生成。

Multimodal-CoT 的核心设计是把 CoT 从一个连续生成问题拆开：第一阶段专门学习生成有视觉依据的 rationale，第二阶段专门学习利用该 rationale 做答案推断。这个拆分让模型可以分别优化“解释质量”和“答案正确性”，也便于把视觉特征注入两个阶段。

##### 视觉语言编码与融合

语言输入 \(X\) 经过 Transformer encoder 得到文本表示：

$$
H=\mathrm{LanguageEncoder}(X)
$$

图像 \(I\) 经冻结 ViT 提取 patch-level 特征，再线性投影到和文本表示相同的维度：

$$
V=W_v\cdot \mathrm{VisionExtractor}(I)
$$

交互阶段以文本表示为 query、视觉 patch 为 key/value 做注意力：

$$
A=\mathrm{softmax}\left(\frac{H V^\top}{\sqrt{d}}\right)V
$$

随后使用门控机制融合文本与视觉注意力输出：

$$
G=\sigma(W_h H + W_a A)
$$

$$
F=G\odot H + (1-G)\odot A
$$

融合后的 \(F\) 输入 Transformer decoder，生成 rationale 或 answer。门控的直觉是：并非每个 token 都需要视觉信息，模型应学会在文本已足够时依赖语言，在图像关键时打开视觉通道。

##### 两阶段目标

第一阶段输入通常是 question、context 和 multiple choices，输出人工标注 rationale：

$$
p(R \mid Q,C,M,I)
$$

第二阶段把生成或标注的 rationale 追加到输入中，输出答案：

$$
p(A \mid Q,C,M,R,I)
$$

训练时两个阶段使用标注 rationale；推理时先由第一阶段生成 \(\hat{R}\)，再用 \(\hat{R}\) 做答案推断。这种 train/inference 设定迫使 rationale 生成模块尽可能提供可用中间证据，而不是只在答案后生成解释。

> ⚠️ 注意：Multimodal-CoT 并不是简单“让模型多说几步”。如果 rationale 缺少视觉 grounding，它会比不使用 CoT 更危险，因为错误中间结论会被第二阶段当作条件。

##### 幻觉缓解机制

论文对错误样本分析发现，文本-only 两阶段模型经常对图中物体关系做错误假设。加入 ViT patch 特征后，rationale 的 RougeL 和答案准确率同时提升，说明视觉信号不仅帮助最终答案，也改善了中间推理链的事实性。

Caption 作为视觉替代只带来有限收益，因为 caption 会丢失空间关系、数量、图表和细粒度视觉属性。直接使用视觉特征则保留更多低层证据，模型可以在 token 与 patch 之间建立更细的注意力对应。

##### 与 BLIP-2/LLaVA 的区别

BLIP-2 和 LLaVA 更关注通用视觉语言接口或指令跟随，Multimodal-CoT 更聚焦“如何让小模型可靠地产生中间推理”。它不是依赖超大模型 few-shot prompting，而是在可训练的小型 encoder-decoder 框架里显式建模 rationale generation 与 answer inference，适合 ScienceQA 这类有解释标注的多模态推理数据。

#### 🧪 练习题

```yaml
question: "Multimodal-CoT 为什么要把 rationale 生成和答案推断拆成两个阶段？"
options:
  - "为了让模型完全不使用图像特征"
  - "为了减少文本输入长度到 1 个 token"
  - "为了先生成有视觉依据的中间推理，再用它辅助答案推断，降低幻觉误导"
  - "为了把所有问题都转成图像分类任务"
answer: 2
explain: "小模型直接生成 CoT 容易产生错误 rationale；两阶段设计让模型先优化中间理由，再将理由作为条件进行答案预测。"
```
