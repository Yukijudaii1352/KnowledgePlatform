### Llama 3（The Llama 3 Herd of Models）

```yaml
id: llama3
name: Llama 3
full_name: The Llama 3 Herd of Models
year: "2024"
org: Meta AI
paper_url: https://arxiv.org/abs/2407.21783
category: foundation
parent: —
motivation: 通过数据规模与质量的双重提升打造开放基础语言模型群，旗舰405B稠密Transformer在多项任务上达到GPT-4水平
```

#### 📝 一句话总结

Llama 3 是 Meta AI 发布的开放基础语言模型群，旗舰版为 405B 参数的稠密 Transformer，训练计算量达 3.8×10²⁵ FLOPs（约为 Llama 2 最大版的 50 倍），原生支持 128K 长上下文、多语言、代码、推理和工具调用，在大量任务上达到与 GPT-4 相当的性能，且全部模型权重公开可商用。

#### 🎯 核心要点

- **模型规模与架构**：采用标准 Dense Transformer 架构，旗舰版 405B 参数，126 层，embedding 维度 16,384，128 个 attention heads；使用 Grouped Query Attention (GQA，8 个 KV heads) 以提升推理效率；词表从 Llama 2 的 32K 扩展至 128K，RoPE 基频 theta 从 10,000 提高到 500,000 以更好支持长上下文。

- **预训练数据**：训练语料约 15.6T tokens（比 Llama 2 增长 7 倍），经过三层策展流水线：URL级去重→启发式过滤（结构/质量信号）→基于模型的质量分类器。通过知识蒸馏方法用大模型预测各数据源的"最优混合比例"，并在训练末期引入退火阶段（Annealing）——使用少量高质量非英语数据将学习率线性衰减至零，大幅提升多语言能力。

- **后训练对齐**：采用多轮 SFT（监督微调） + DPO（直接偏好优化）迭代流程。SFT 数据来自人类标注与合成生成；DPO 在消息级别标注偏好（而非对话级别），特别针对工具使用场景。引入模型平均（Model Averaging）技巧提高稳定性，并使用拒绝采样（Rejection Sampling）扩充高质量样本。

- **三大工具原生集成**：通过后训练赋予模型调用 Brave Search（网页搜索）、Python Interpreter（代码执行）和 Wolfram Alpha API（数学计算）的能力，支持多轮对话中的顺序工具调用和零样本工具调用（仅凭函数签名生成调用代码）。

- **性能**：在 MMLU、HumanEval、GSM8K、MATH 等主流基准上，Llama 3 405B 指令版与 GPT-4 持平或差距在误差范围内；多语言基准（如 MGSM、XWinograd）上显著优于同等规模的开放模型；代码能力（HumanEval+、MBPP+）达到顶级闭源模型水平。长上下文评测（Needle-in-Haystack 100% 召回率）和工具调用（BFCL 基准领先）均为第一梯队。

- **安全体系**：发布 Llama Guard 3 输入/输出安全分类器；构建 CybersecEval、ChemicalSafetyBench 等安全评测基准；进行大规模红队测试与系统级安全防护（System Guard）；预训练数据过滤个人身份信息与不安全内容。

- **推理优化**：采用 Pipeline Parallelism（流水线并行）+ FP8 量化，使得 405B 模型可在单节点 8×H100 上高效推理，推理延迟显著低于同类规模模型。

#### 🔬 深入细节

![Llama 3 整体架构与训练流程](https://ar5iv.labs.arxiv.org/html/2407.21783/assets/x1.png)
*图 1：Llama 3 整体架构与训练流程 — Llama 3 是一个预测下一 token 的 Transformer 语言模型*

![后训练策略总览](https://ar5iv.labs.arxiv.org/html/2407.21783/assets/x7.png)
*图 7：Llama 3 后训练策略总览 — 包含 SFT、拒绝采样和 DPO 的多轮迭代*

```python
# Llama 3 DPO 训练目标简化伪代码
# 对每个偏好对 (x, y_w, y_l)，y_w 为获胜响应，y_l 为落败响应

def dpo_loss(model, ref_model, x, y_w, y_l, beta=0.1):
    # 计算模型对两个响应的对数概率比
    log_pi_w = model.log_prob(x, y_w)  # 策略模型下获胜响应的 log prob
    log_pi_l = model.log_prob(x, y_l)  # 策略模型下落败响应的 log prob
    log_ref_w = ref_model.log_prob(x, y_w)  # 参考模型下获胜响应的 log prob
    log_ref_l = ref_model.log_prob(x, y_l)  # 参考模型下落败响应的 log prob

    # 构建隐式奖励差
    reward_diff = beta * ((log_pi_w - log_ref_w) - (log_pi_l - log_ref_l))

    # 二元交叉熵损失（等价于 Bradley-Terry 偏好模型）
    loss = -log_sigmoid(reward_diff)
    return loss

def training_loop():
    for epoch in range(6):  # 6 轮 SFT → DPO 迭代
        # 阶段 1: SFT（监督微调）
        for batch in sft_data:
            loss = cross_entropy(model(batch.prompt), batch.response)
            optimizer.step(loss)

        # 阶段 2: 收集偏好标注数据（消息级别）
        preferences = human_annotate_message_level(model, prompts)

        # 阶段 3: DPO（直接偏好优化）
        for batch in preferences:
            loss = dpo_loss(model, ref_model, batch.x, batch.y_w, batch.y_l)
            optimizer.step(loss)

        # 阶段 4: 模型平均
        model = average_checkpoints(checkpoints[-5:])
```

##### 1. 设计哲学：数据、规模与复杂度

Meta 团队将高质量基础模型的开发总结为三个核心杠杆：(1) **数据** — 相比 Llama 2 大幅提升预训练数据的数量（×7）与质量，引入更精细的预处理和策展流水线；(2) **规模** — 将模型预训练计算量提升近 50 倍至 3.8×10²⁵ FLOPs；(3) **管理复杂度** — 刻意选择标准 Dense Transformer 而非 Mixture-of-Experts，以最大化开发流程的可扩展性和可预测性，降低训练不确定性和调试成本。

> 💡 关键：Dense 架构的选择使得扩展规律（Scaling Law）预测更准确，模型行为更可预测，这对于 54 天的超大规模训练至关重要。

##### 2. 模型架构详解

Llama 3 保持与 Llama 2 高度一致的架构选择，性能增益主要来自数据与训练规模。关键改进包括：

- **Grouped Query Attention (GQA)**：每 8 个 query head 共享 1 组 KV head，在大 batch 推理时减少 KV cache 占用约 8 倍，使 405B 模型的单节点推理成为可能。
- **128K 词表**：使用 tiktoken（与 GPT-4 相同的 tokenizer 框架）将词表从 32K 扩大至 128K，多语言编码效率提升，平均每 token 覆盖更多语义信息。
- **RoPE 优化**：将旋转位置编码的频率基值 θ 从 10,000 增加到 500,000，使高频分量衰减更慢。给定位置 m 和 n，旋转角度为：

  $$\Theta_{m-n} = (m-n) \cdot \theta^{-2d/D}$$

  增大 θ 使高频分量的角度差异在长距离下仍然显著，从而改善 128K 极限长度下的位置区分能力。

##### 3. 预训练数据策展流水线

预训练数据总量约 15.6T tokens，经过三层策展：

- **第一阶段：URL 级去重与清洗**。移除重复文档、低质量页面（如导航页、错误页）、成人内容。
- **第二阶段：启发式过滤**。基于文本长度、停用词比例、困惑度评分等信号进行粗筛。
- **第三阶段：质量分类器**。使用 Llama 2 作为基座训练二分类器，对每个文档打分，仅保留高质量部分。分类器训练样本来自人工标注的"高质量文档"（维基百科、书籍等）与"低质量文档"。
- **数据混合优化**：采用知识蒸馏思路 — 用小型代理模型在不同数据混合比例下训练，预测其在关键基准上的表现，寻找最优数据配比。最终混合：通用网页 50%、代码 15%、数学/推理 15%、非英语 15%。
- **退火阶段（Annealing）**：在预训练最后 40M tokens，将学习率线性退火至零，同时混入精心挑选的高质量多语言数据，在不显著增加计算成本的前提下大幅提升多语言能力。

##### 4. 后训练：SFT + DPO 多轮迭代

- **SFT（监督微调）**：收集涵盖指令遵循、代码、数学、多语言、长上下文、工具使用等场景的人工标注示例。同时引入合成数据 — 用前序模型生成多样化 prompt-response 对，经筛选后加入训练集。
- **DPO 偏好优化**：在消息级别（message-level）标注偏好，核心损失函数为：

  $$\mathcal{L}_{\text{DPO}}(\pi_\theta; \pi_{\text{ref}}) = -\mathbb{E}_{(x, y_w, y_l) \sim \mathcal{D}} \left[\log \sigma\left(\beta \log\frac{\pi_\theta(y_w|x)}{\pi_{\text{ref}}(y_w|x)} - \beta \log\frac{\pi_\theta(y_l|x)}{\pi_{\text{ref}}(y_l|x)}\right)\right]$$

  其中 σ 为 sigmoid 函数，β 控制偏离参考模型的程度，y_w / y_l 分别为获胜和落败响应。消息级别标注在工具使用等多步交互场景中比对话级别更精确。

> ⚠️ 注意：在工具使用相关任务中，拒绝采样（Rejection Sampling）未带来显著收益，因此省略了该步骤。

- **迭代轮次**：整个后训练过程进行 6 轮 SFT → DPO 迭代，每轮使用新收集的标注数据。
- **模型平均（Model Averaging）**：在不同训练步数保存的多个 checkpoint 进行权重平均，有效降低方差并提升下游任务稳定性。

##### 5. 工具使用能力

完全依赖人类标注和偏好数据教授工具使用（非 Toolformer 式的自监督合成）。三大工具为 Brave Search、Python Interpreter 和 Wolfram Alpha API。关键能力包括：

- **零样本工具调用**：给定未见过的 Python 函数签名和文档字符串，模型可直接生成正确的调用代码，无需额外训练。
- **多步工具链**：模型可在回答中生成分步计划，依次调用多个工具（如先搜索信息 → 运行 Python 验证计算 → 调用 Wolfram Alpha 确认结果），每步之间进行推理。

##### 6. 安全性设计

- **预训练安全**：过滤训练数据中的 PII、仇恨言论、暴力内容和 CSAM。
- **Llama Guard 3**：基于 Llama 3 微调的安全分类器，覆盖 13 个风险类别，可同时检测输入 prompt 和输出 response。
- **CybersecEval**：专门评估网络安全风险场景下的模型行为。
- **红队测试与 System Guard**：组织内外部红队对抗性测试，部署层设置规则+模型双重过滤。

##### 7. 推理部署

405B 模型的推理部署采用流水线并行（16 个阶段）+ FP8 权重量化。FP8 通过带缩放因子的浮点压缩将显存需求降低约一半，逐层校准最小化精度损失。最终在单台 8×H100 节点上即可服务 405B 模型。

#### 🧪 练习题

```yaml
question: "Llama 3 的 DPO（直接偏好优化）采用消息级别偏好标注的主要优势是什么？"
options:
  - "减少标注成本，因为只需标注一次对话"
  - "在多步工具调用等交互场景中更精确，能区分单步响应质量"
  - "使模型完全不需要参考模型的约束"
  - "让训练速度比对话级别标注快 10 倍"
answer: 1
explain: "消息级别标注在工具使用等多步交互场景中可精确比较同一上下文下的两个候选 assistant 消息，避免对整个对话排序引入噪声。"
```
