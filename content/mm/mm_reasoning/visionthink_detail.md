### VisionThink — 智能高效视觉语言模型 (Smart and Efficient VLM via RL)

```yaml
id: visionthink
name: VisionThink
full_name: "VisionThink: Enabling Vision-Language Models to Think Smarter and See Efficiently via Reinforcement Learning"
year: 2026
org: CUHK
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/88be023075a5a3ff3dc3b5d26623fa22-Abstract-Conference.html"
category: frontier_2026
parent: reason_rft
motivation: "RL+Token压缩，效率与性能平衡"
```

#### 📝 一句话总结

VisionThink 提出了一种动态分辨率视觉语言模型范式：模型先接收低分辨率图像进行推理，通过强化学习（Multi-Turn GRPO）自主决定是否需要请求高分辨率图像，结合 LLM-as-Judge 评估开放式 VQA 答案，在保持甚至超越全分辨率模型性能的同时大幅降低视觉 token 数量和推理时间。

#### 🎯 核心要点

- **动态分辨率推理范式**：模型首先接收低分辨率图像（如 384×384），在推理过程中自主决定是否调用 `<resize>` 工具获取高分辨率图像（如 768×768），实现"按需升分辨率"
- **Multi-Turn GRPO 训练**：将 GRPO（Group Relative Policy Optimization）扩展为多轮交互场景，模型在第一轮输出后可能触发工具调用，工具返回的 token 被 mask 不参与策略梯度计算
- **LLM-as-Judge 奖励机制**：使用 Qwen2.5-72B-Instruct 作为裁判模型评估开放式 VQA 答案的正确性，解决传统精确匹配无法处理同义表达的问题
- **Penalty 控制机制**：通过阈值 \(\theta\)（默认 0.2）控制高分辨率请求比例——仅当 resize 比例超过阈值时施加惩罚，平衡性能与效率
- **训练数据**：仅需 20K 样本（10K 高分辨率依赖 + 10K 低分辨率可解），涵盖 MathVerse、AI2D、ChartQA、DocVQA 等多类型数据
- **显著效率提升**：相比全分辨率基线，视觉 token 减少约 62%，推理时间减少约 66%，同时在多数基准上性能持平或提升

#### 🔬 深入细节

##### 核心框架

![VisionThink 框架总览](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x2.png)
*图：VisionThink 框架。(a) 左图展示推理流程——模型先接收低分辨率图像，自主决定是否调用 resize 工具获取高分辨率图像；(b) 右图展示 Multi-Turn GRPO 训练流程，包含 LLM-as-Judge 奖励评估。*

##### 动机与背景

当前视觉语言模型（VLM）为追求高性能，普遍采用高分辨率图像输入，导致视觉 token 数量急剧增长。例如，将图像从 384×384 提升到 768×768，视觉 token 数量从约 729 增加到约 2916（4 倍增长）。然而，论文的关键观察是：**并非所有任务都需要高分辨率输入**。

![关键观察](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x1.png)
*图：(a) 不同分辨率下的性能对比——部分基准（如 MathVerse）在低分辨率下即可达到高性能，而 OCR 类基准（如 DocVQA）确实需要高分辨率；(b)(c) VisionThink 在性能和效率上的优势。*

传统的高效 VLM 方法（如 FastV、FitPrune）通过注意力分数剪枝或合并 token 来减少冗余，但它们：
1. 对所有样本施加**固定比例**的 token 削减，无法区分简单/困难样本
2. 在 OCR 相关基准上性能下降严重
3. 是**被动的后处理策略**，而非让模型主动决策

VisionThink 提出了一种全新范式：让模型**主动思考**是否需要更多视觉信息，将分辨率选择从工程启发式转变为模型的内生能力。

##### 核心技术方案

**1. Multi-Turn 推理流程**

推理过程分为两种路径：

- **路径 A（低分辨率足够）**：模型接收低分辨率图像 → 思考 → 直接输出答案
- **路径 B（需要高分辨率）**：模型接收低分辨率图像 → 思考 → 输出 `<resize>` 工具调用 → 环境返回高分辨率图像 → 继续思考 → 输出答案

```python
# VisionThink 推理伪代码
def visionthink_inference(model, image, question):
    # Step 1: 输入低分辨率图像
    low_res_image = resize(image, 384)
    low_res_tokens = vision_encoder(low_res_image)  # ~729 tokens
    
    # Step 2: 模型第一轮推理
    prompt = f"<image>{low_res_tokens}</image>\n{question}"
    response_turn1 = model.generate(prompt)
    
    # Step 3: 检查是否请求高分辨率
    if "<resize>" in response_turn1:
        # 环境返回高分辨率图像
        high_res_image = resize(image, 768)
        high_res_tokens = vision_encoder(high_res_image)  # ~2916 tokens
        
        # Step 4: 模型第二轮推理（拼接高分辨率信息）
        prompt_turn2 = prompt + response_turn1 + f"<image>{high_res_tokens}</image>"
        response_turn2 = model.generate(prompt_turn2)
        return extract_answer(response_turn2)
    else:
        return extract_answer(response_turn1)
```

**2. LLM-as-Judge 奖励设计**

传统 RL 训练中，VQA 答案的正确性通常通过精确字符串匹配判断。但开放式问答中，语义等价的不同表达（如 "2/3" vs "0.667"、"New York" vs "NYC"）会被误判为错误。VisionThink 引入 LLM-as-Judge 解决此问题：

$$r_{\text{acc}}(q, a, a^*) = \text{LLM-Judge}(q, a, a^*) \in \{0, 1\}$$

其中 \(q\) 为问题，\(a\) 为模型预测答案，\(a^*\) 为标准答案。裁判模型（Qwen2.5-72B-Instruct）综合考虑问题语境，判断语义等价性。

> 💡 **关键**：LLM-as-Judge 不仅提升了奖励信号的准确性，还使得训练数据中可以包含更多开放式 VQA 样本，扩大了可用训练数据的范围。

**3. Multi-Turn GRPO**

标准 GRPO 的目标函数为：

$$\mathcal{J}_{\text{GRPO}}(\theta) = \mathbb{E}_{q \sim P(Q), \{o_i\}_{i=1}^G \sim \pi_{\theta_{\text{old}}}(O|q)} \left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \min\left(\rho_{i,t} \hat{A}_{i}, \text{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon) \hat{A}_{i}\right) - \beta D_{\text{KL}} \right]$$

其中 \(\rho_{i,t} = \frac{\pi_\theta(o_{i,t} | q, o_{i,<t})}{\pi_{\theta_{\text{old}}}(o_{i,t} | q, o_{i,<t})}\) 为新旧策略的概率比，\(\hat{A}_i\) 为基于组内奖励归一化的优势值。

VisionThink 将其扩展为 **Multi-Turn** 版本，关键修改是：**工具返回的 token（高分辨率图像 token）不参与策略梯度计算**，因为这些 token 由环境生成，不属于模型策略的一部分：

$$\mathcal{J}_{\text{MT-GRPO}}(\theta) = \mathbb{E}\left[ \frac{1}{G} \sum_{i=1}^G \frac{1}{|o_i|} \sum_{t=1}^{|o_i|} \mathbf{m}_{i,t} \cdot \min\left(\rho_{i,t} \hat{A}_{i}, \text{clip}(\rho_{i,t}, 1-\varepsilon, 1+\varepsilon) \hat{A}_{i}\right) - \beta D_{\text{KL}} \right]$$

其中 \(\mathbf{m}_{i,t}\) 为 mask 向量：模型生成的 token 处为 1，工具返回的 token 处为 0。

> ⚠️ **注意**：如果不对工具返回 token 进行 mask，这些 token 的梯度会干扰策略优化，因为模型无法控制环境返回的内容。

**4. 奖励函数与 Penalty 机制**

总奖励由三部分组成：

$$R = r_{\text{acc}} + r_{\text{format}} + r_{\text{penalty}}$$

- **准确性奖励** \(r_{\text{acc}} \in \{0, 1\}\)：由 LLM-as-Judge 评估
- **格式奖励** \(r_{\text{format}}\)：鼓励模型使用 `<think>...</think>` 和 `<answer>...</answer>` 标签的规范输出格式
- **Penalty 惩罚** \(r_{\text{penalty}}\)：控制高分辨率请求比例

Penalty 的设计尤为精巧。直接对所有 resize 请求施加惩罚会导致模型完全放弃使用高分辨率，在 OCR 类任务上性能崩溃。因此采用**阈值控制**：

$$r_{\text{penalty}} = \begin{cases} -\lambda & \text{if resize ratio} > \theta \text{ and sample requests resize} \\ 0 & \text{otherwise} \end{cases}$$

其中 \(\theta = 0.2\) 表示允许最多 20% 的样本请求高分辨率。只有当当前 batch 中 resize 比例超过阈值时，才对请求 resize 的样本施加惩罚。

![Penalty 消融实验](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x3.png)
*图：(a) Penalty 比例的影响——全部惩罚或完全不惩罚都不是最优策略；(b) 不同 θ 值对性能和 resize 比例的影响。*

**5. 训练数据构建**

训练数据仅需 20K 样本，按以下策略构建：

- **10K 高分辨率依赖样本**：从 DocVQA、ChartQA、InfoVQA 等 OCR 密集型数据集中筛选，这些样本在低分辨率下性能显著下降
- **10K 低分辨率可解样本**：从 MathVerse、AI2D、ScienceQA 等数据集中筛选，这些样本在低分辨率下即可正确回答

这种混合构建确保模型学会**区分**何时需要高分辨率、何时低分辨率即可。

##### 效率与性能分析

![推理效率对比](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x4.png)
*图：VisionThink 与传统高效 VLM 方法的推理时间和性能对比。VisionThink 在保持高性能的同时显著降低推理时间。*

VisionThink 的效率优势来源于：大部分样本（约 80%）仅使用低分辨率图像（729 tokens），仅约 20% 的困难样本使用高分辨率（2916 tokens）。平均视觉 token 数量从 2916 降至约 1166，减少约 60%。

![自适应 Resize 比例](https://ar5iv.labs.arxiv.org/html/2507.13348/assets/x5.png)
*图：VisionThink 在不同基准上的 resize 比例——OCR 类任务（DocVQA、ChartQA）的 resize 比例显著高于数学/科学类任务，验证了模型确实学会了"按需升分辨率"。*

> 💡 **关键洞察**：VisionThink 不是一种特定的 token 削减策略，而是一种**新范式**，可以与现有的高效 VLM 方法（如 FastV、FitPrune）正交组合，进一步提升效率。

#### 🧪 练习题

```yaml
question: "VisionThink 在 Multi-Turn GRPO 训练中，为什么要对工具返回的 token 进行 mask 处理？"
options:
  - "为了减少显存占用，加速训练"
  - "因为工具返回的 token 由环境生成，不属于模型策略，其梯度会干扰策略优化"
  - "为了防止模型过拟合到高分辨率图像特征"
  - "因为工具返回的 token 数量过多，会导致梯度爆炸"
answer: 1
explain: "工具返回的高分辨率图像 token 由环境（视觉编码器）生成，不受模型策略控制。如果不 mask，这些 token 的概率比会产生无意义的梯度信号，干扰策略优化方向。"
```