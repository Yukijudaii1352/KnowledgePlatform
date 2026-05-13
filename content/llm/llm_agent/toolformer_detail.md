### 工具学习者 (Toolformer)

```yaml
id: toolformer
name: Toolformer
full_name: 工具学习者 (Toolformer)
year: '2023'
org: Meta AI
paper_url: https://arxiv.org/abs/2302.04761
category: tool_use
parent: —
motivation: 自监督学习使模型自主学会调用工具
```

#### 📝 一句话总结

Toolformer 提出了一种自监督方法，让语言模型通过自我标注和过滤 API 调用来自主学会何时、如何调用外部工具（计算器、搜索引擎、问答系统等），无需大量人工标注即可显著提升模型在算术、事实查询等任务上的零样本能力。

#### 🎯 核心要点

- **自监督工具学习流水线**：利用 LM 的上下文学习能力自动标注 API 调用，再通过损失函数过滤无用调用，最终在增强数据集上微调
- **5 种外部工具**：问答系统（Atlas）、维基百科搜索（BM25）、计算器、日历、机器翻译（NLLB 600M）
- **基于损失的过滤机制**：比较"有 API 调用+结果"与"无调用/无结果"的加权交叉熵损失差，仅保留确实降低困惑度的调用
- **基础模型**：GPT-J 6.7B，训练数据为 CCNet 子集
- **推理机制**：解码时遇到 `→` 特殊标记即中断，调用对应 API 获取结果后继续生成
- **零样本性能**：6.7B 参数的 Toolformer 在多项任务上超越 175B 参数的 GPT-3

#### 🔬 深入细节

![Toolformer 工具调用示例总览](https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x1.png)
*图 1：Toolformer 学会在文本生成过程中自主插入各种 API 调用（计算器、问答、搜索、翻译、日历），每个调用以 `[API_name(input) → result]` 格式嵌入文本流中。*

##### 动机与背景

大语言模型虽然在语言理解和生成方面表现出色，但在一些看似简单的任务上仍存在根本性缺陷：无法精确进行数学运算、无法获取最新的事实信息、缺乏时间感知能力。已有的工具增强方法（如 WebGPT、LaMDA）要么依赖大量人工标注，要么将工具使用限定在特定任务上，缺乏通用性。

Toolformer 的核心目标是：**以自监督方式让模型自主决定何时、如何调用哪种工具**，且不丧失其通用语言建模能力。

##### 核心方法：三步自监督流水线

![Toolformer 数据增强三步流程](https://ar5iv.labs.arxiv.org/html/2302.04761/assets/x2.png)
*图 2：Toolformer 的数据增强流程——(1) 利用上下文学习采样候选 API 调用；(2) 执行 API 获取结果；(3) 基于损失过滤，仅保留有用的调用。*

整个方法分为三个阶段：

**阶段一：采样候选 API 调用**

对于数据集 \(\mathcal{C}\) 中的每段文本 \(\mathbf{x} = x_1, \ldots, x_n\)，为每种 API 编写少量示范提示（few-shot prompt），引导模型 \(M\) 在文本中标注潜在的 API 调用位置。具体地，对每个位置 \(i\)，计算模型在该位置生成 `<API>` 标记的概率：

$$p_i = p_M(\texttt{<API>} \mid P(\mathbf{x}), x_{1:i-1})$$

设定采样阈值 \(\tau_s\)，保留概率超过阈值的位置集合 \(I = \{i \mid p_i > \tau_s\}\)（最多保留 top-\(k\) 个）。对每个位置，以 `[P(x), x_1, ..., x_{i-1}, <API>]` 为前缀，采样最多 \(m\) 个候选 API 调用。

**阶段二：执行 API 调用**

对所有采样到的候选 API 调用执行实际调用，获取文本形式的返回结果 \(r_i\)。不同工具的执行方式各异——可以是调用另一个神经网络、执行 Python 脚本或进行检索。

**阶段三：基于损失的过滤**

这是方法的核心创新。定义加权交叉熵损失：

$$L_i(\mathbf{z}) = -\sum_{j=i}^{n} w_{j-i} \cdot \log p_M(x_j \mid \mathbf{z}, x_{1:j-1})$$

然后比较两个损失值：

$$L_i^{+} = L_i(\text{e}(c_i, r_i))$$

$$L_i^{-} = \min\left(L_i(\varepsilon),\; L_i(\text{e}(c_i, \varepsilon))\right)$$

其中 \(L_i^{+}\) 是将完整 API 调用（含返回结果）作为前缀时的损失，\(L_i^{-}\) 是不做调用或仅做调用但不含结果时的最小损失。

> 💡 **关键直觉**：如果同时提供 API 的输入和输出能让模型更好地预测后续 token（即 \(L_i^{-} - L_i^{+} \geq \tau_f\)），则该调用是"有用的"，予以保留；否则丢弃。

设定过滤阈值 \(\tau_f\)，仅保留满足条件的 API 调用。

##### 模型微调与推理

```python
# Toolformer 训练与推理伪代码
# === 训练阶段 ===
for text x in dataset C:
    # Step 1: 采样候选 API 调用位置
    for position i in range(len(x)):
        p_i = LM.prob("<API>" | prompt(x), x[:i])
        if p_i > tau_s:
            candidates = LM.sample_api_calls(prefix=x[:i], num=m)
            
            # Step 2: 执行 API
            for c in candidates:
                r = execute_api(c)
                
                # Step 3: 过滤
                L_plus = weighted_loss(x[i:], prefix=api_call_with_result(c, r))
                L_minus = min(
                    weighted_loss(x[i:], prefix=empty),
                    weighted_loss(x[i:], prefix=api_call_no_result(c))
                )
                if L_minus - L_plus >= tau_f:
                    insert_api_call(x, position=i, call=c, result=r)

# 在增强数据集 C* 上用标准语言建模目标微调 M

# === 推理阶段 ===
while generating:
    token = LM.decode_next()
    if token == "→":  # 模型期望 API 返回结果
        api_response = call_api(current_api_call)
        insert(api_response + "</API>")
        continue_decoding()
```

**微调**：将过滤后的 API 调用插入原始文本对应位置，构造增强数据集 \(\mathcal{C}^*\)。关键设计是 \(\mathcal{C}^*\) 包含与原始数据集 \(\mathcal{C}\) 完全相同的文本内容（仅多了 API 调用标注），因此微调不会损害模型的通用语言建模能力。

**推理**：正常解码直到模型生成 `→` 标记（表示它期望获得 API 返回结果），此时中断解码、调用对应 API、将返回结果和 `</API>` 标记插入，然后继续解码。

> ⚠️ **注意**：训练时 API 调用结果作为前缀而非插入文本中间，因为未微调的模型不习惯中间插入的 API 格式，这会破坏文本连贯性并损害困惑度。

##### API 调用的文本表示

每个 API 调用表示为元组 \(c = (a_c, i_c)\)，其中 \(a_c\) 是 API 名称，\(i_c\) 是输入。线性化格式为：

- 不含结果：`<API> a_c(i_c) </API>`
- 含结果：`<API> a_c(i_c) → r </API>`

实际实现中使用 `[`、`]`、`->` 代替特殊标记，无需修改词表。

##### 五种工具详解

| 工具 | 实现 | 输入示例 | 输出示例 |
|------|------|----------|----------|
| 问答系统 | Atlas（检索增强 LM，基于 Natural Questions 微调） | "Where was the Knights of Columbus founded?" | "New Haven, Connecticut" |
| 维基百科搜索 | BM25 检索器（KILT 维基百科索引） | "Fishing Reel Types" | 相关维基百科片段 |
| 计算器 | 四则运算，结果保留两位小数 | "27 + 4 * 2" | "35" |
| 日历 | 返回当前日期，无需输入 | ε（空） | "Today is Monday, January 30, 2023." |
| 机器翻译 | NLLB 600M（200 种语言→英语，fastText 自动检测源语言） | "sûreté nucléaire" | "nuclear safety" |

##### 与传统方法的区别

| 维度 | 传统工具增强方法 | Toolformer |
|------|------------------|------------|
| 监督信号 | 大量人工标注（WebGPT、LaMDA） | 自监督，仅需少量 few-shot 示范 |
| 工具使用范围 | 绑定特定任务 | 通用，模型自主决定何时/如何/用哪个工具 |
| 通用性保持 | 可能损害语言建模能力 | 增强数据集保留原始文本，不损害通用性 |
| 训练成本 | 需要人类反馈或强化学习 | 仅需标准语言建模微调 |
| 模型规模 | 通常需要超大模型 | 6.7B 即可超越 175B GPT-3 |

#### 🧪 练习题

```yaml
question: "Toolformer 过滤 API 调用的核心标准是什么？"
options:
  - "API 调用的执行时间是否低于阈值"
  - "API 返回结果的文本长度是否超过最小值"
  - "插入 API 调用及其结果后，模型预测后续 token 的损失是否显著降低"
  - "人工标注者判断该 API 调用是否有帮助"
answer: 2
explain: "Toolformer 通过比较 L_i^- - L_i^+ ≥ τ_f 来判断：如果提供 API 调用及其返回结果能显著降低模型预测后续 token 的加权交叉熵损失（相比不调用或调用但无结果），则保留该调用。这是一种完全自监督的过滤机制。"
```