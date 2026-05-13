### SelfCheckGPT

```yaml
id: selfcheckgpt
name: SelfCheckGPT
full_name: "SelfCheckGPT: 零资源黑盒幻觉检测 (Zero-Resource Black-Box Hallucination Detection for Generative Large Language Models)"
year: 2023
org: Cambridge (ALTA)
paper_url: https://aclanthology.org/2023.emnlp-main.557/
category: hallucination
parent: —
motivation: 通过多次随机采样一致性检测，在无需外部知识库的条件下识别LLM生成文本中的幻觉
```

#### 📝 一句话总结

SelfCheckGPT 提出了一种零资源黑盒幻觉检测框架：对同一提示多次采样生成响应，利用"事实性内容在不同采样间保持一致、而幻觉内容则相互矛盾"的核心假设，通过 BERTScore、问答、n-gram、NLI 和 LLM Prompt 五种一致性度量方法在句子级别检测幻觉，无需访问模型内部概率或外部知识库。

#### 🎯 核心要点

- **核心假设**：LLM 对已知事实的多次采样结果趋于一致，对幻觉内容则产生相互矛盾的信息
- **零资源 + 黑盒**：不依赖外部知识库，不需要访问模型内部 token 概率，仅需模型的文本输出
- **五种黑盒检测变体**：SelfCheck-BERTScore、SelfCheck-QA/MQAG、SelfCheck-n-gram、SelfCheck-NLI、SelfCheck-Prompt
- **灰盒基线对比**：同时提出基于 token 概率（Avg/Max \(-\log p\)）和熵（Avg/Max \(H\)）的灰盒方法作为对照
- **评估数据集**：WikiBio GPT-3 数据集——238 篇 GPT-3 生成的人物传记，1908 个句子经人工标注为 Major Inaccurate / Minor Inaccurate / Accurate 三类
- **关键结果**：SelfCheck-Prompt（AUC-PR 93.42）和 SelfCheck-NLI（AUC-PR 92.50）在句子级幻觉检测中显著超越灰盒概率基线（83.21），证明黑盒方法可行且有效
- **段落级检测**：SelfCheck-Prompt 在段落级别 Pearson 相关系数达 78.32，优于所有其他方法

#### 🔬 深入细节

##### 框架示意图

![SelfCheckGPT 框架示意图](https://arxiv.org/html/2303.08896v4/extracted/5307/images/selfcheckgpt_prompt.png)
*图：SelfCheckGPT-Prompt 工作流程——对同一概念多次采样生成响应，逐句与采样结果进行一致性比对，矛盾越多则幻觉可能性越高*

##### 算法伪代码

```python
# SelfCheckGPT 通用流程伪代码
def selfcheck_gpt(prompt, llm, method, N=20):
    """
    prompt: 输入提示 (e.g., "This is a Wikipedia passage about {concept}:")
    llm: 目标大语言模型
    method: 一致性检测方法 (BERTScore/QA/n-gram/NLI/Prompt)
    N: 采样次数
    """
    # Step 1: 生成主响应 (temperature=0, beam search)
    R = llm.generate(prompt, temperature=0.0)
    sentences = split_sentences(R)  # r_1, r_2, ..., r_M
    
    # Step 2: 随机采样 N 个响应 (temperature=1.0)
    samples = [llm.generate(prompt, temperature=1.0) for _ in range(N)]
    
    # Step 3: 逐句计算一致性得分
    scores = []
    for r_i in sentences:
        s_i = 0.0
        for S_n in samples:
            s_i += method.compute_inconsistency(r_i, S_n)
        scores.append(s_i / N)  # 平均不一致性得分
    
    return scores  # 得分越高 → 幻觉可能性越大
```

##### 动机与背景

大语言模型（LLM）在生成流畅文本的同时，经常产生"幻觉"（hallucination）——生成看似合理但实际不正确的内容。传统的事实核查方法依赖外部知识库（如 Wikipedia、知识图谱），但这些方法面临两大问题：

1. **知识覆盖不完整**：外部知识库无法覆盖所有领域和最新信息
2. **黑盒 API 限制**：许多商业 LLM（如 GPT-4）不提供 token 级别的概率信息，灰盒方法无法适用

SelfCheckGPT 的核心洞察在于：**LLM 本身就是最好的事实核查器**。如果模型真正"知道"某个事实，那么多次采样时会反复生成一致的内容；如果模型在"编造"，则每次采样会产生不同的虚假信息。

> 💡 **关键直觉**：采样一致性 ≈ 事实可靠性。一致的输出暗示模型对该知识有较高置信度，矛盾的输出则暴露了模型的不确定性。

##### 灰盒基线方法

作为对照，论文首先提出了需要访问 token 概率的灰盒方法。对于主响应中的第 \(i\) 个句子 \(r_i\)，包含 token 序列 \(\{t_1, t_2, \ldots, t_L\}\)：

**概率度量**（需要目标 token 的生成概率 \(p(t)\)）：

$$S_{\text{Avg}(-\log p)}(i) = \frac{1}{L_i} \sum_{l=1}^{L_i} -\log p(t_l)$$

$$S_{\text{Max}(-\log p)}(i) = \max_{l} \left( -\log p(t_l) \right)$$

**熵度量**（需要 top-\(K\) token 的概率分布）：

$$S_{\text{Avg}(H)}(i) = \frac{1}{L_i} \sum_{l=1}^{L_i} H(t_l), \quad H(t_l) = -\sum_{k=1}^{K} p(t_l^{(k)}) \log p(t_l^{(k)})$$

> ⚠️ **局限**：灰盒方法要求访问模型内部概率，对 GPT-4 等黑盒 API 不适用。这正是 SelfCheckGPT 黑盒方法的动机所在。

##### 五种黑盒检测方法详解

**1. SelfCheck-BERTScore**

利用 BERTScore 衡量主响应句子 \(r_i\) 与每个采样响应 \(S_n\) 中各句子的语义相似度。取最大相似度作为该采样的支持度，再对 \(N\) 个采样取平均：

$$S_{\text{BERTScore}}(i) = 1 - \frac{1}{N} \sum_{n=1}^{N} \max_{j} \text{BERTScore}(r_i, s_j^{(n)})$$

得分越高表示句子在采样中缺乏语义支持，幻觉可能性越大。

**2. SelfCheck-QA (MQAG)**

通过问答生成与回答来间接评估一致性。首先基于主响应句子 \(r_i\) 生成多个问题 \(q\)，然后分别在主响应和采样响应上回答这些问题，比较答案一致性：

$$P(a_i | q, C) = \frac{\exp(g(a_i, q, C))}{\sum_{a' \in A} \exp(g(a', q, C))}$$

其中 \(g(\cdot)\) 是 MQAG 模型的评分函数，\(C\) 为上下文。通过 KL 散度或计数匹配来量化答案分布差异。

**3. SelfCheck-n-gram**

最轻量的方法，计算主响应句子中 n-gram 在采样响应中出现的频率：

$$S_{\text{n-gram}}(i) = 1 - \frac{1}{N} \sum_{n=1}^{N} \frac{|\{g : g \in r_i \cap S_n\}|}{|r_i|}$$

其中 \(|r_i|\) 是句子 \(r_i\) 中的 n-gram 总数。论文使用 unigram 到 trigram 的加权组合，并引入 \(\min(\cdot, 1)\) 截断和负对数变换提升区分度：

$$S'_{\text{n-gram}}(i) = -\frac{1}{N} \sum_{n=1}^{N} \log \min\left(\frac{c_n(r_i, S_n)}{|r_i|}, 1\right)$$

> 💡 **优势**：n-gram 方法不依赖任何外部模型，计算开销极低，适合大规模部署。

**4. SelfCheck-NLI**

使用自然语言推理（NLI）模型判断采样响应是否与主响应句子矛盾。采用 DeBERTa-v3-large（在 MNLI 上微调）作为 NLI 模型：

$$P(\text{contradict} | r_i, S_n) = \frac{\exp(z_c)}{\exp(z_e) + \exp(z_c)}$$

其中 \(z_e\) 和 \(z_c\) 分别是"蕴含"和"矛盾"类别的 logits。注意此处**忽略了中性类别**，仅在蕴含和矛盾之间归一化，确保概率在 [0, 1] 之间。最终得分：

$$S_{\text{NLI}}(i) = \frac{1}{N} \sum_{n=1}^{N} P(\text{contradict} | r_i, S_n)$$

**5. SelfCheck-Prompt**

直接利用 LLM 自身作为一致性判断器，通过如下 prompt 询问：

```
Context: {sampled_passage}
Sentence: {sentence_to_check}
Is the sentence supported by the context above?
Answer Yes or No:
```

输出映射为数值：\(\{Yes: 0.0, No: 1.0, N/A: 0.5\}\)，最终得分：

$$S_{\text{Prompt}}(i) = \frac{1}{N} \sum_{n=1}^{N} x_i^n$$

> ⚠️ **注意**：论文发现只有较强的 LLM（如 GPT-3 text-davinci-003、ChatGPT）才能有效执行此一致性评估，较弱的模型（如 text-curie-001、LLaMA）效果不佳。

##### 实验结果与关键发现

**数据集构建**：从 WikiBio 数据集中选取 238 个人物概念，使用 GPT-3（text-davinci-003）生成传记文章，共 1908 个句子。人工标注结果：39.9% Major Inaccurate，33.1% Minor Inaccurate，27.0% Accurate。标注者间一致性 Cohen's κ = 0.748（2-class）。

**句子级检测性能**（AUC-PR，NonFactual 类别）：

| 方法 | AUC-PR (NonFact) | AUC-PR (Factual) | 类型 |
|------|:-:|:-:|:-:|
| Random baseline | 72.96 | 27.04 | — |
| Avg(-log p) | 83.21 | 53.97 | 灰盒 |
| SelfCheck-BERTScore | 81.09 | 46.56 | 黑盒 |
| SelfCheck-QA (MQAG) | 82.90 | 47.30 | 黑盒 |
| SelfCheck-n-gram | 85.28 | 56.94 | 黑盒 |
| SelfCheck-NLI | **92.50** | **72.32** | 黑盒 |
| SelfCheck-Prompt (GPT-3) | **93.42** | **74.56** | 黑盒 |

**关键发现**：

1. **黑盒超越灰盒**：SelfCheck-Prompt 和 SelfCheck-NLI 显著超越所有灰盒概率基线，证明采样一致性比 token 概率更能反映事实性
2. **LLM 概率确实与事实性相关**：灰盒方法（AUC-PR 83.21）远超随机基线（72.96），验证了"模型对幻觉内容的 token 不确定性更高"的假设
3. **代理 LLM 效果较差**：使用 LLaMA 作为代理模型替代 GPT-3 计算概率时，性能接近随机基线，表明不同 LLM 的生成模式差异显著
4. **采样数量影响**：N=5 时性能已有明显提升，N=20 时趋于饱和
5. **段落级检测**：SelfCheck-Prompt 的 Pearson 相关系数达 78.32，可有效识别"完全幻觉"段落

##### 与传统方法的区别

| 维度 | 传统事实核查 | SelfCheckGPT |
|------|:-:|:-:|
| 外部知识 | 需要知识库/搜索引擎 | **不需要** |
| 模型访问 | 需要内部概率（灰盒） | **仅需文本输出（黑盒）** |
| 适用范围 | 受限于知识库覆盖 | **任意领域** |
| 核心信号 | token 不确定性 | **采样间一致性** |
| 计算开销 | 单次推理 | 需 N 次额外采样 |

#### 🧪 练习题

```yaml
question: "SelfCheckGPT 的核心假设是什么？"
options:
  - "LLM 生成的所有内容都是幻觉"
  - "如果 LLM 真正掌握某个事实，多次采样会产生一致的内容；幻觉内容则在不同采样间相互矛盾"
  - "token 概率越高的句子越可能是幻觉"
  - "外部知识库可以完全覆盖 LLM 的所有输出"
answer: 1
explain: "SelfCheckGPT 的核心假设是采样一致性反映事实可靠性——已知事实在多次采样中保持一致，而幻觉内容因缺乏真实知识支撑而在不同采样间产生矛盾。"
```