---
id: flare
name: FLARE
full_name: 前瞻性主动检索 (Forward-Looking Active Retrieval)
year: '2023.05'
org: CMU
paper_url: https://arxiv.org/abs/2305.06983
category: architecture
parent: rag
---

# FLARE: 前瞻性主动检索 (Forward-Looking Active Retrieval)

## 一句话总结

利用生成过程中 token 级置信度判断是否需要检索，以临时生成的下一句作为查询来主动检索外部知识并重新生成，实现自适应按需检索增强。

## 动机与背景

- **核心问题**：大语言模型在长文本生成中容易产生幻觉（hallucination），而现有 RAG 方法要么仅检索一次（single retrieval），要么按固定间隔检索（every n tokens），前者无法应对信息需求动态变化，后者引入不必要的延迟和噪声。
- **关键观察**：生成 token 的概率可作为模型不确定性的代理指标——低概率 token 意味着模型对即将生成的内容缺乏知识支撑，此时检索最有价值；高置信区间则无需检索。
- **已有方法的不足**：RETRO 和 IC-RALM 按固定 chunk 检索，IRCoT 按 CoT 步骤检索，均未考虑"是否真正需要检索"这一判断，导致效率与质量的双重损失。

## 方法详解

### 整体框架

FLARE 将生成过程分解为逐句迭代，每步执行：**临时生成 → 置信度判断 → 条件检索 → 重新生成**。

Pipeline 流程：
1. 用 LM 生成临时下一句 $\hat{s}_t$
2. 检查 $\hat{s}_t$ 中是否存在低置信度 token
3. 若触发检索：构造查询 $q_t$，检索文档 $D_t$，基于检索结果重新生成 $s_t$
4. 若未触发：直接采纳 $\hat{s}_t$ 作为 $s_t$
5. 拼接 $s_t$ 到已有输出，重复直至生成完毕

### 核心公式

**检索触发条件**——当临时句中任一 token 概率低于阈值 $\theta$ 时触发：

$$\text{Retrieve?}(\hat{s}_t) = \exists\, w_i \in \hat{s}_t,\; p(w_i) < \theta$$

**查询构造**——两种变体：

$$q_t^{\text{direct}} = \text{Mask}(\hat{s}_t,\, \theta) \quad \text{（移除低置信 token 后的临时句）}$$

$$q_t^{\text{instruct}} = \text{LM}(\text{"Generate a search query:"} \,\|\, x \,\|\, y_{<t})$$

### 关键设计选择

| 设计点 | 选择 | 理由 |
|--------|------|------|
| 检索粒度 | 句级（非 token 级） | 平衡效率与语义完整性 |
| 触发信号 | token 概率 < θ | 无需额外训练，直接利用 LM 内在不确定性 |
| 查询来源 | 前瞻（upcoming sentence） | 比回顾（previous sentence）更准确捕捉当前信息需求 |
| 低置信 token 掩码 | FLARE_direct 中移除 | 避免错误 token 误导检索器 |

FLARE_instruct 通过 LM 显式生成查询，适合复杂推理场景；FLARE_direct 直接用掩码后的临时句作查询，更简洁高效。

## 实验与结果

### 实验设置

- **基座模型**：GPT-3.5（text-davinci-003）
- **检索器**：BM25 over Wikipedia，top-5 文档
- **默认阈值**：θ = 0.5
- **数据集**：4 个长文本知识密集型任务

### 主要结果

| 方法 | 2WikiMQA (F1) | StrategyQA (Acc) | ASQA (EM / F1 / Rouge-L) | WikiAsp (F1) |
|------|:---:|:---:|:---:|:---:|
| No Retrieval | 27.7 | 65.2 | 17.5 / 28.4 / 29.5 | 22.1 |
| Single Retrieval | 33.9 | 66.5 | 22.3 / 31.7 / 30.8 | 24.3 |
| Every Sentence | 31.2 | 63.8 | 21.8 / 30.9 / 30.2 | 23.7 |
| IRCoT | 35.1 | 67.3 | 23.1 / 32.4 / 31.2 | 24.8 |
| **FLARE_direct** | **36.2** | 67.1 | 24.5 / 33.8 / 32.1 | 25.2 |
| **FLARE_instruct** | **37.8** | **68.0** | **25.2 / 34.5 / 32.8** | **25.6** |

核心发现：
- 固定间隔检索有时反而劣于单次检索（Every Sentence 在 StrategyQA 上降至 63.8）
- FLARE 在所有任务上达到最优或持平，同时检索次数仅为固定间隔方法的约 45%（2WikiMQA 上平均 2.3 次 vs 5.1 次）

### 消融实验

| 变体 | 2WikiMQA (F1) |
|------|:---:|
| FLARE_instruct（完整） | 37.8 |
| 始终检索（去掉置信度判断） | 34.5 |
| 回顾式查询（用上一句而非临时句） | 35.2 |
| 去掉低置信 token 掩码 | 35.0 |
| FLARE_direct（完整） | 36.2 |

消融证实三个组件均有贡献：置信度触发（+3.3 F1）、前瞻式查询（+2.6 F1）、token 掩码（+1.2 F1）。

## 优缺点分析

**优点**：
1. **无需额外训练**：仅依赖 LM 原生 token 概率，即插即用于任何可获取 logits 的模型
2. **自适应检索频率**：按需检索避免了固定间隔的效率浪费和噪声引入，检索次数减少约 55% 且效果更优
3. **前瞻式查询设计**：用即将生成的内容（而非已生成内容）构造查询，更精准匹配当前信息需求

**局限与改进方向**：
1. **依赖 token 概率可访问性**：部分 API（如早期 ChatGPT）不暴露 logprobs，限制了适用范围；可探索基于语义不确定性的替代信号
2. **阈值 θ 需手动调优**：最优 θ 因任务而异（0.3–0.6），缺乏自适应机制；可考虑端到端学习检索决策
3. **检索器质量瓶颈**：当 BM25 无法找到相关文档时，检索反而引入噪声；可结合 dense retriever 或多轮检索纠错
4. **句级粒度限制**：对于需要 sub-sentence 级别知识补充的场景（如实体属性填充），句级检索可能过粗

## 关键术语表

| 术语 | 释义 |
|------|------|
| Active Retrieval | 在生成过程中主动判断何时检索，而非固定间隔或一次性检索 |
| Forward-Looking Query | 用临时生成的下一句（而非已生成的上一句）作为检索查询 |
| Confidence Threshold (θ) | token 生成概率的阈值，低于此值触发检索 |
| Token Masking | 在 FLARE_direct 中移除低置信 token 以净化查询 |
| Single-time Retrieval | 仅在生成前检索一次的传统 RAG 模式 |
| Fixed-interval Retrieval | 按固定 token 数或句数间隔进行检索的方法（如 RETRO、IC-RALM） |

## 关联论文

- [RAG (Lewis et al., 2020)](https://arxiv.org/abs/2005.11401) — 开创性检索增强生成框架，FLARE 的直接改进对象
- [RETRO (Borgeaud et al., 2022)](https://arxiv.org/abs/2112.04426) — 固定间隔 chunk 级检索增强，FLARE 对其检索策略的改进
- [IRCoT (Trivedi et al., 2023)](https://arxiv.org/abs/2212.10509) — 交错检索与 CoT 推理，与 FLARE 同属主动检索但触发机制不同
- [Self-RAG (Asai et al., 2023)](https://arxiv.org/abs/2310.11511) — 训练模型生成特殊 token 控制检索，与 FLARE 的免训练方案形成互补
- [HyDE (Gao et al., 2023)](https://arxiv.org/abs/2212.10496) — 用 LM 生成假设文档作为检索查询，与 FLARE 的前瞻查询思路相通