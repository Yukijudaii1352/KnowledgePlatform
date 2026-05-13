### Self-RAG

```yaml
id: self_rag
name: Self-RAG
full_name: "自反射检索增强生成 (Self-Reflective Retrieval-Augmented Generation)"
year: "2024"
org: "University of Washington / IBM Research"
paper_url: "https://arxiv.org/abs/2310.11511"
category: "rag"
parent: "—"
motivation: "训练LM通过反射token自适应决策检索时机并批判结果事实性，解决传统RAG无差别检索与无法自我评估的问题"
```

#### 📝 一句话总结

Self-RAG 训练单一语言模型在生成过程中按需检索外部文档，并通过特殊的反射 token（Retrieve / IsRel / IsSup / IsUse）对检索内容和自身输出进行细粒度自我批判，在不依赖额外 Reward Model 或 RL 的前提下显著提升了事实性和引用准确性。

#### 🎯 核心要点

- **4 类反射 token**：Retrieve（是否需要检索）、IsRel（段落是否相关）、IsSup（输出是否被证据支持）、IsUse（整体效用 1-5 分）
- **Critic 模型蒸馏**：使用 GPT-4 标注 4k–20k 样本训练 Llama2-7B Critic，与 GPT-4 一致性 > 90%
- **离线标注 + 标准 LM 训练**：Critic 离线为训练语料插入反射 token，Generator 以标准 next-token prediction 在扩展词表上训练，无需 RL
- **推理时自适应检索**：通过 Retrieve token 概率阈值 \(\delta\) 控制检索频率，支持按需检索而非每步检索
- **段级 Beam Search 排序**：对多条检索段落并行生成，用 IsRel / IsSup / IsUse 加权评分选取最优片段
- **推理时可定制行为**：调整各 critique 权重即可在引用精度与流畅度之间灵活权衡，无需重新训练
- **6 项任务全面评估**：涵盖事实验证（PubHealth）、推理（ARC-C）、开放域 QA（PopQA / TriviaQA）、传记生成（Bio）、长文 QA（ASQA），Self-RAG 7B/13B 全面超越 ChatGPT 及同规模 RAG 基线

#### 🔬 深入细节

##### 框架总览

![Self-RAG 框架示意图](https://arxiv.org/html/2310.11511v4/x1.png)
*图：Self-RAG 推理流程。模型先判断是否需要检索（Retrieve token），若需要则检索多条段落并并行生成，随后通过 IsRel / IsSup / IsUse 反射 token 对每条候选输出进行细粒度评估，最终选取最优片段拼接为完整回答。*

##### 算法伪代码

```python
# Self-RAG 推理流程 (Algorithm 1 简化)
def self_rag_inference(x, M, R, threshold=0.2, K=5, weights=(1.0, 1.0, 0.5)):
    """
    x: 输入 query
    M: Self-RAG Generator
    R: Retriever (Contriever-MSMARCO)
    """
    output = []
    while not finished:
        # Step 1: 预测 Retrieve token
        p_retrieve = M.predict_token_prob("[Retrieve]", context=(x, output))
        
        if p_retrieve("Yes") > threshold:
            # Step 2: 检索 top-K 段落
            passages = R.retrieve(x, K=K)
            candidates = []
            
            for d in passages:
                # Step 3: 条件生成 + 反射 token
                y_t, is_rel, is_sup, is_use = M.generate_with_critique(x, output, d)
                
                # Step 4: 加权评分 (Eq. 3)
                score = (M.generation_prob(y_t) 
                         + weights[0] * score(is_rel)    # IsRel
                         + weights[1] * score(is_sup)    # IsSup  
                         + weights[2] * score(is_use))   # IsUse
                candidates.append((y_t, score))
            
            # Step 5: 选取最优片段
            best = max(candidates, key=lambda c: c[1])
            output.append(best[0])
        else:
            # 无需检索，直接生成
            y_t = M.generate(x, output)
            output.append(y_t)
    
    return "".join(output)
```

##### 动机与背景

传统 RAG 方法存在两个核心缺陷：

1. **无差别检索**：无论问题是否需要外部知识，都固定在每一步检索，既浪费计算资源，又可能因引入不相关信息而降低生成质量。例如，"太阳从哪个方向升起？"这类常识问题完全不需要检索。

2. **缺乏自我评估**：模型无法判断检索到的文档是否与问题相关，也无法评估自身输出是否被证据充分支持。即使检索到了高质量文档，模型也可能忽略证据或产生幻觉。

> 💡 关键：Self-RAG 的核心洞察是——将"何时检索"和"如何评估"这两个决策内化为模型自身的生成能力，而非依赖外部模块或启发式规则。

##### 核心机制：反射 token 体系

Self-RAG 设计了 4 类反射 token，覆盖检索-生成-评估的完整链路：

| Token 类型 | 输出值 | 作用时机 | 功能 |
|:---:|:---:|:---:|:---|
| **Retrieve** | `yes` / `no` / `continue` | 每个片段生成前 | 决定是否需要检索 |
| **IsRel** | `relevant` / `irrelevant` | 检索后、生成前 | 判断检索段落与查询的相关性 |
| **IsSup** | `fully supported` / `partially supported` / `no support` | 生成后 | 评估输出是否被检索证据支持 |
| **IsUse** | `1` – `5` | 生成后 | 评估输出对回答问题的整体效用 |

这些 token 被加入模型词表，在训练和推理时与普通文本 token 一样通过 next-token prediction 生成，无需额外的分类头或奖励模型。

##### 训练流程：三阶段蒸馏

**阶段一：Critic 模型训练**

使用 GPT-4 为少量样本（每类 token 4k–20k 条）生成反射 token 标注，然后蒸馏到 Llama2-7B 作为 Critic 模型 \(\mathcal{C}\)。具体地，对于每类反射 token，设计特定 prompt 让 GPT-4 判断（如"该段落是否与问题相关？"），收集其输出作为训练标签。训练后的 Critic 与 GPT-4 的一致性超过 90%。

**阶段二：离线语料标注**

使用训练好的 Critic \(\mathcal{C}\) 对整个训练语料进行离线标注：
- 对每个训练样本，先用 \(\mathcal{C}\) 判断是否需要检索（Retrieve token）
- 若需要，用检索器获取段落，再用 \(\mathcal{C}\) 标注 IsRel / IsSup / IsUse
- 将这些反射 token 插入原始文本的对应位置

**阶段三：Generator 训练**

在标注后的增强语料上，以标准 next-token prediction 目标训练 Generator \(\mathcal{M}\)（Llama2-7B 或 13B）。模型的词表扩展以包含反射 token。训练目标为：

$$\max_{\theta} \sum_{t} \log p_{\theta}(y_t \mid y_{<t}, x)$$

其中 \(y_t\) 可以是普通文本 token 或反射 token。

> ⚠️ 注意：整个训练过程不使用强化学习，仅依赖标准的监督学习（next-token prediction），这使得训练过程稳定且高效。

##### 推理流程：自适应检索 + 段级排序

推理时，模型逐片段（segment-by-segment）生成输出：

1. **检索决策**：在每个片段开始时，模型预测 Retrieve token 的概率。若 \(p(\text{Yes}) > \delta\)（默认 \(\delta = 0.2\)），则触发检索。

2. **并行生成与评估**：检索 top-K 段落（默认 K=5），对每条段落并行生成候选片段，同时生成 IsRel / IsSup / IsUse 反射 token。

3. **加权排序**：对每个候选片段计算综合得分：

$$\text{score}(y_t, d) = p_{\theta}(y_t) + \sum_{G \in \{\text{IsRel}, \text{IsSup}, \text{IsUse}\}} w_G \cdot s(r_G)$$

其中 \(w_G\) 为各 critique 类型的权重（默认 IsRel=1.0, IsSup=1.0, IsUse=0.5），\(s(r_G)\) 为对应反射 token 的归一化得分。

4. **推理时定制**：通过调整权重 \(w_G\)，可在不重新训练的情况下控制模型行为。例如，增大 IsSup 权重可提升引用精度但可能降低流畅度（MAUVE 分数）。

##### 与传统方法的关键区别

| 维度 | 传统 RAG | Self-RAG |
|:---|:---|:---|
| 检索策略 | 每步固定检索 | 按需自适应检索 |
| 评估机制 | 无 / 仅依赖检索器相关性分数 | 4 类反射 token 细粒度评估 |
| 训练方式 | 检索器与生成器独立训练 | 端到端训练统一模型 |
| 推理灵活性 | 固定行为 | 权重可调，支持运行时定制 |
| 额外模块 | 需要 NLI 模型做事实验证 | 自包含，无需外部验证器 |

##### 实验结果

Self-RAG 在 6 项任务上的主要结果（Accuracy / FactScore / Citation Precision）：

| 模型 | PopQA | TriviaQA | PubHealth | ARC-C | Bio (FactScore) | ASQA (Citation Prec) |
|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| Llama2-7B | 14.7 | 55.6 | 49.1 | 45.0 | — | — |
| Llama2-13B-chat | 20.0 | 63.3 | 70.0 | 67.3 | 55.9 | 37.1 |
| Alpaca-13B + RAG | 46.7 | 57.4 | 49.8 | 45.7 | — | — |
| ChatGPT | 29.3 | 64.8 | 70.0 | 75.3 | 71.3 | 65.1 |
| **Self-RAG 7B** | **54.9** | **66.4** | **72.4** | 67.3 | **81.2** | **66.9** |
| **Self-RAG 13B** | **55.8** | **69.3** | **74.5** | **73.1** | 80.2 | **70.3** |

> 💡 关键发现：Self-RAG 7B 即可在 PopQA、PubHealth、Bio、ASQA 上超越 ChatGPT，Self-RAG 13B 在所有任务上均为非专有模型中的最佳。

**消融实验**验证了各组件的必要性：
- **去除检索器**：所有任务性能显著下降
- **去除 Critic（反射 token）**：ASQA citation precision 从 32.1 降至 18.1
- **固定使用 top-1 段落**（传统 RAG 方式）：PopQA 和 ASQA 大幅下降
- **去除 IsSup**：ASQA 性能明显受损

**人工评估**（50 样本）：PopQA 上 S&P（合理且有支持）得分 92.5%，IsRel 预测与人工一致性 95%，IsSup 一致性 90%。

#### 🧪 练习题

```yaml
question: "Self-RAG 在训练阶段使用了什么优化方法来学习反射 token？"
options:
  - "基于 PPO 的强化学习，以反射 token 准确率为奖励"
  - "标准 next-token prediction，将反射 token 作为扩展词表的一部分"
  - "对比学习，拉近正确反射 token 与上下文的表示距离"
  - "RLHF，使用人类偏好数据微调反射 token 的生成概率"
answer: 1
explain: "Self-RAG 将反射 token 加入词表，与普通文本 token 一起通过标准的 next-token prediction 目标训练，不使用任何强化学习，这是其训练简洁高效的关键设计。"
```