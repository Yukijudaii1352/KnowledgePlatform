### VisionThink — 智能高效视觉语言模型 (Smart and Efficient VLM via RL)

```yaml
id: visionthink
name: VisionThink
full_name: "智能高效视觉语言模型 (Smart and Efficient VLM via RL)"
year: "2026"
org: "CUHK"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html"
category: "frontier_2026"
parent: "reason_rft"
motivation: "RL+Token压缩，效率与性能平衡"
```

#### 📝 一句话总结

VisionThink 提出一种样本级动态视觉 token 压缩范式：模型先用低分辨率图像回答，只有判断信息不足时才输出特殊 token 请求高分辨率图像，并通过 LLM-as-Judge、Multi-Turn GRPO 和 penalty 控制机制在准确率与推理效率之间取得平衡。

#### 🎯 核心要点

- **按样本动态分辨率**：先输入低分辨率图像以减少视觉 token，必要时再请求高分辨率图像
- **特殊 token / 工具调用机制**：模型通过指定格式发起 image resize 请求，进入第二轮高分辨率推理
- **LLM-as-Judge 奖励**：用外部 LLM 对开放式 VQA 答案做语义正确性判断，突破精确字符串匹配限制
- **Multi-Turn GRPO**：把 GRPO 扩展到多轮工具调用场景，对用户输入和工具返回 token 做 mask，只优化模型生成 token
- **Penalty 控制 resize 比例**：避免模型塌缩为“总是高分辨率”或“总是低分辨率”，使其学会何时值得付出额外视觉 token
- **与传统压缩方法兼容**：不同于固定剪枝比例，VisionThink 在样本级决定 token 预算，可与 FastV、SparseVLM 等空间剪枝方法互补

#### 🔬 深入细节

##### 核心示意图

![VisionThink 框架](https://raw.githubusercontent.com/dvlab-research/VisionThink/main/files/Framework.jpg)
*图：VisionThink 对简单样本直接用低分辨率回答，对 OCR/细节依赖样本请求高分辨率图像。*

##### 动机与背景

VLM 性能提升往往伴随视觉 token 数量增长。例如同一张高分辨率图像，在新一代模型中可能被切成数千个视觉 token。视觉 token 通常比问题文本长得多，因此序列长度和计算成本主要由图像决定。

论文的关键观察是：大多数通用 VQA 场景并不需要完整高分辨率信息，低分辨率甚至四分之一视觉 token 也能答对；但 ChartQA、OCRBench、DocVQA 等 OCR 或细粒度任务对高分辨率高度敏感。固定比例 token pruning 无法区分这两类样本，简单样本浪费计算，困难样本又可能丢失关键文字或细节。

VisionThink 因此把“视觉 token 压缩比例”变成模型策略的一部分：模型先看低分辨率，如果信息足够就直接答；如果不够，就主动请求原始高分辨率图像继续推理。

##### Multi-Turn 推理流程

推理有两条路径：

- **低分辨率路径**：低分辨率图像 + 问题 → `<think>` → `<answer>`
- **高分辨率路径**：低分辨率图像 + 问题 → 判断信息不足 → 输出 resize 调用 → 环境返回高分辨率图像 → 再推理并回答

```python
# VisionThink 推理伪代码
def visionthink_inference(model, image, question):
    low_image = resize(image, scale=0.5)
    prompt = build_prompt(low_image, question)

    first_response = model.generate(prompt)

    if requests_high_resolution(first_response):
        high_image = image
        tool_result = encode_tool_result(high_image)
        second_prompt = prompt + first_response + tool_result
        second_response = model.generate(second_prompt)
        return extract_answer(second_response)

    return extract_answer(first_response)
```

这个过程本质上是多轮交互：模型第一轮不只是回答，也可以选择是否购买更多视觉信息。选择高分辨率会增加 token 和时间成本，但可能提升 OCR/图表/文档题的正确率。

##### LLM-as-Judge 奖励

通用 VQA 的答案常有多种等价表达，规则匹配不够稳定。VisionThink 使用 LLM-as-Judge 判断模型答案 \(a\) 与标准答案 \(a^\*\) 是否语义一致：

$$R_{acc}(q,a,a^\*)\in\{0,1\}$$

判断只基于问题、预测答案和标准答案的文本，不重新看图像，以避免裁判模型视觉能力影响训练 reward。离散 0/1 奖励比连续分数更稳，减少裁判误判对策略更新的放大。

##### Multi-Turn GRPO

标准 GRPO 的组内优势为：

$$\hat{A}_i=\frac{R_i-\mathrm{mean}(\{R_j\})}{\mathrm{std}(\{R_j\})}$$

VisionThink 将其用于多轮输出。由于高分辨率图像 token 是工具/环境返回的内容，不是模型策略生成的 token，训练时需要 mask：

$$\mathcal{J}_{MT-GRPO}=
\mathbb{E}\left[\sum_{i,t}m_{i,t}
\min(\rho_{i,t}\hat{A}_i,\mathrm{clip}(\rho_{i,t},1-\epsilon,1+\epsilon)\hat{A}_i)
-\beta D_{KL}\right]$$

其中 \(m_{i,t}=1\) 表示模型生成 token，\(m_{i,t}=0\) 表示用户输入或工具返回 token。这样优化目标只奖励/惩罚模型可控制的行为，包括是否请求 resize、如何推理、如何回答。

##### Reward 与 Penalty

总 reward 包含三部分：

$$R=R_{acc}+R_{format}+R_{penalty}$$

- \(R_{acc}\)：LLM-as-Judge 判断答案正确性
- \(R_{format}\)：检查 `<think>`、`<answer>` 和 resize 调用 JSON 格式
- \(R_{penalty}\)：控制高分辨率请求比例，避免策略塌缩

Penalty 的难点是两种塌缩都可能发生：不惩罚 resize 时，模型倾向于总是请求高分辨率；过度惩罚 resize 时，模型会总是低分辨率直接猜。VisionThink 根据低分辨率和高分辨率的正确性统计设定阈值，动态决定该惩罚直接回答还是惩罚 resize。

> ⚠️ 注意：VisionThink 的目标不是最少 token，而是在“该省时省、该看清看清”的前提下最大化任务 reward。

##### 训练数据与评估

论文使用 Qwen2.5-VL-7B-Instruct 作为基座，先验证 LLM-as-Judge 能在通用 VQA 上支撑 RL，再训练高低分辨率决策能力。数据覆盖通用 VQA 与细粒度/OCR 任务，使模型同时见到“低分辨率足够”和“必须高分辨率”的样本。

评估包含 ChartQA、OCRBench、DocVQA、MME、MMVet、RealWorldQA、POPE、MathVista、MathVerse 等。相较 FastV、SparseVLM 等固定保留比例方法，VisionThink 在平均使用约一半视觉 token 的情况下保持或提升总体性能，并在 OCR 相关任务上避免固定剪枝造成的大幅退化。

##### 与传统视觉 token 压缩的区别

| 方法 | 决策粒度 | 是否需要固定阈值 | OCR 任务风险 | 与 vLLM/FlashAttention 兼容性 |
|---|---|---|---|---|
| FastV / SparseVLM | token/层级剪枝 | 是 | 可能误删关键 token | 剪枝逻辑增加复杂度 |
| 直接降采样 | 全样本固定 | 是 | 高 | 简单 |
| VisionThink | 样本级动态 | 否，由策略决定 | 低，必要时看高分辨率 | 主要改变输入轮次，工程上更直接 |

#### 🧪 练习题

```yaml
question: "VisionThink 中 penalty 控制机制的主要目的是什么？"
options:
  - "强制所有样本都使用最低分辨率"
  - "避免模型塌缩为总是请求高分辨率或总是直接低分辨率回答"
  - "替代 LLM-as-Judge 的准确性奖励"
  - "减少语言 token 的数量，与视觉 token 无关"
answer: 1
explain: "没有 penalty 时模型可能总是请求高分辨率；惩罚过强又会使模型不敢请求高分辨率。VisionThink 用阈值控制 resize 比例，在效率和性能之间平衡。"
```
