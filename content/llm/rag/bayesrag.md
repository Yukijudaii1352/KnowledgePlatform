---
paper_id: bayesrag
title: "BayesRAG: Bayesian Retrieval-Augmented Generation for Multimodal Complementarity Reasoning"
authors: "Yeongjun Hwang, Jeonghyeon Kim, Doyoung Kim, Minsoo Kim, Jiho Jin, Jungwoo Lim, Hyounghun Kim, Seungryong Kim"
year: 2026
venue: arXiv preprint
tldr: "贝叶斯框架建模多模态证据可靠性与互补性，实现鲁棒的多模态RAG融合"
significance: B
innovation: B
tags: [RAG, multimodal, Bayesian, evidence-fusion, reliability, graph-neural-network, VLM, retrieval]
---

## 📋 元信息
| 字段 | 内容 |
|------|------|
| 标题 | BayesRAG: Bayesian Retrieval-Augmented Generation for Multimodal Complementarity Reasoning |
| 作者 | Yeongjun Hwang, Jeonghyeon Kim, Doyoung Kim, Minsoo Kim, Jiho Jin, Jungwoo Lim, Hyounghun Kim, Seungryong Kim |
| 机构 | KAIST AI, Chungnam National University |
| 会议/期刊 | arXiv 2026.01 |
| 年份 | 2026 |
| 链接 | https://arxiv.org/abs/2601.07329 |
| 代码 | 未公开 |

## 1. 研究背景与动机

现有多模态 RAG 系统通常将不同模态（文本、图像）的检索和融合独立处理，采用简单拼接或注意力融合策略，**忽略了跨模态证据之间的互补性和可靠性差异**。当不同模态提供矛盾信息时（如文本说"1889年"而图片标注"1887年"），朴素融合方法无法判断应信任哪个模态，容易传播错误并产生幻觉。

现有方法的核心局限在于：(1) 缺乏对跨模态证据关系的显式建模；(2) 无法评估每条证据的可靠性；(3) 融合时未考虑各模态提供的独特信息贡献。

本文的核心 insight 是：**一个模态的证据可靠性可以通过与其他模态证据的一致性来评估**，同时需要考虑每个模态独特的信息贡献。这可以通过贝叶斯图模型来形式化，捕获模态间和模态内的证据关系。

## 2. 方法详解

### 2.1 整体框架

BayesRAG 由四个阶段组成：

1. **多模态检索**：给定查询 $q$，从文本知识库 $K_t$ 和视觉知识库 $K_v$ 中检索相关证据 $E = \{e_1, e_2, \ldots, e_n\}$。
2. **跨模态证据图构建 (CMEG)**：构建异构图，捕获检索证据之间的语义关系。
3. **贝叶斯可靠性估计 (BRE)**：通过变分推断计算每条证据的后验可靠性分数。
4. **互补感知融合与生成 (CAF)**：基于可靠性和互补性分数融合证据，生成最终回答。

核心目标函数为贝叶斯后验：

$$p(y \mid q, E) = \int p(y \mid q, E, r) \, p(r \mid E, q) \, dr$$

其中 $r = (r_1, \ldots, r_n)$ 是证据可靠性分数向量，$y$ 是生成的回答。该公式将证据可靠性显式纳入生成过程。

### 2.2 跨模态证据图 (CMEG)

构建异构图 $G = (V, E_g)$，节点 $V$ 表示检索到的证据，边 $E_g$ 捕获它们之间的关系。

**节点表示**：文本证据通过预训练文本编码器编码 $h_i^t = \text{TextEnc}(e_i)$，视觉证据通过视觉编码器编码 $h_i^v = \text{VisionEnc}(e_i)$，然后投影到共享语义空间：

$$z_i = W_{m_i} h_i^{m_i} + b_{m_i}$$

其中 $W_{m_i}$, $b_{m_i}$ 是模态特定的投影参数，$z_i \in \mathbb{R}^d$（$d = 768$）为统一表示。

**边构建**定义三种类型：
- **模态内边**：同模态且语义相似度 $\text{sim}(z_i, z_j) > \tau_{\text{intra}}$（$\tau_{\text{intra}} = 0.7$）
- **跨模态边**：不同模态且 $\text{sim}(z_i, z_j) > \tau_{\text{cross}}$（$\tau_{\text{cross}} = 0.5$）
- **查询-证据边**：查询节点连接所有证据节点，按相关性加权

**图神经网络处理**：采用异构图注意力网络 (HGAT) 进行信息传播：

$$z_i^{(l+1)} = \sigma\left(\sum_{j \in \mathcal{N}(i)} \alpha_{ij}^{(l)} W_{\tau}^{(l)} z_j^{(l)}\right)$$

注意力权重为：

$$\alpha_{ij}^{(l)} = \text{softmax}_j\left(\text{LeakyReLU}\left(a^\top [W_q z_i^{(l)} \| W_k z_j^{(l)}]\right)\right)$$

其中 $W_{\tau}^{(l)}$ 是边类型 $\tau(i,j)$ 的变换矩阵，$\|$ 表示拼接。经 $L=3$ 层消息传递后，最终节点表示 $z_i^{(L)}$ 同时捕获局部语义和全局跨模态关系。

### 2.3 贝叶斯可靠性估计 (BRE)

这是 BayesRAG 的核心模块，将每条证据的可靠性 $r_i$ 建模为潜变量，通过变分推断估计其后验分布。

**先验分布**：采用均匀 Beta 先验 $p(r_i) = \text{Beta}(r_i; \alpha_0, \beta_0)$，其中 $\alpha_0 = \beta_0 = 1$。

**似然模型**：给定可靠性分数，跨模态关系的似然为：

$$p(G \mid r, E) = \prod_{(i,j) \in E_g} p(e_{ij} \mid r_i, r_j, z_i, z_j)$$

关键设计在于区分一致和冲突的证据对：

$$p(e_{ij} \mid r_i, r_j, z_i, z_j) = \begin{cases} \sigma(r_i \cdot r_j \cdot \text{sim}(z_i, z_j)) & \text{if } \text{sim}(z_i, z_j) > 0 \\ \sigma((1 - r_i \cdot r_j) \cdot |\text{sim}(z_i, z_j)|) & \text{if } \text{sim}(z_i, z_j) \leq 0 \end{cases}$$

其中 $\sigma(\cdot)$ 为 sigmoid 函数。设计动机：一致的证据对在双方可靠性都高时似然增大；冲突的证据对则倾向于至少一方可靠性低。

**变分推断**：采用均值场近似 $q(r) = \prod_i \text{Beta}(r_i; \alpha_i, \beta_i)$，变分参数由神经网络预测：

$$[\alpha_i, \beta_i] = \text{softplus}(\text{MLP}(z_i^{(L)}))$$

优化 ELBO：

$$\mathcal{L}_{\text{ELBO}} = \mathbb{E}_{q(r)}[\log p(G \mid r, E)] - \text{KL}(q(r) \| p(r))$$

KL 散度有闭式解，期望项通过 Monte Carlo 采样 + Beta 分布的重参数化技巧近似。

**后验可靠性分数**：

$$\hat{r}_i = \mathbb{E}_{q(r_i)}[r_i] = \frac{\alpha_i}{\alpha_i + \beta_i}$$

不确定性由方差量化：$\text{Var}(r_i) = \frac{\alpha_i \beta_i}{(\alpha_i + \beta_i)^2 (\alpha_i + \beta_i + 1)}$

### 2.4 互补感知融合 (CAF)

**互补性分数**定义为：

$$c_{ij} = (1 - |\text{sim}(z_i, z_j)|) \cdot \mathbb{I}(m_i \neq m_j) + \lambda \cdot \text{sim}(z_i, z_j) \cdot \mathbb{I}(m_i = m_j)$$

跨模态低相似度 → 高互补性（提供不同信息）；同模态高相似度 → 相互支持。$\lambda = 0.3$。

**信息增益**近似为：$\hat{g}_i = 1 - \max_{j \neq i} \text{sim}(z_i, z_j)$，捕获证据的独特性。

**融合权重**综合可靠性、互补性和信息增益：

$$w_i = \text{softmax}_i\left(\hat{r}_i \cdot (1 + \gamma \cdot C_i) \cdot (1 + \delta \cdot \hat{g}_i)\right)$$

其中 $C_i = \frac{1}{|\mathcal{N}(i)|} \sum_{j \in \mathcal{N}(i)} c_{ij}$ 为平均互补性，$\gamma = 0.5$，$\delta = 0.3$。

最终融合表示：$z_{\text{fused}} = \sum_i w_i \cdot z_i^{(L)}$

### 2.5 不确定性感知解码

生成概率融入证据不确定性：

$$p(y_t \mid y_{<t}, q, z_{\text{fused}}) = (1 - u) \cdot p_{\text{model}}(y_t \mid y_{<t}, q, z_{\text{fused}}) + u \cdot p_{\text{prior}}(y_t \mid y_{<t}, q)$$

其中 $u = \frac{1}{n} \sum_i \text{Var}(r_i)$ 为平均证据不确定性。当检索证据不可靠时，模型优雅地回退到参数化知识。

### 2.6 训练目标

端到端多任务训练：

$$\mathcal{L} = \mathcal{L}_{\text{gen}} + \lambda_1 \cdot \mathcal{L}_{\text{ELBO}} + \lambda_2 \cdot \mathcal{L}_{\text{retrieval}} + \lambda_3 \cdot \mathcal{L}_{\text{contrast}}$$

其中 $\mathcal{L}_{\text{gen}}$ 为生成损失，$\mathcal{L}_{\text{retrieval}}$ 为检索相关性损失，$\mathcal{L}_{\text{contrast}}$ 为跨模态对齐对比损失。超参：$\lambda_1 = 0.1$，$\lambda_2 = 0.5$，$\lambda_3 = 0.3$，温度 $\tau = 0.07$。

## 3. 实验与结果

### 3.1 实验设置

**数据集**：
- **MultimodalQA**：29,918 个问题，需跨表格、文本和图像推理
- **WebQA**：36,766 个多跳问题，含文本和视觉来源
- **MMCoQA**：5,286 个对话，需多模态上下文理解

**基线方法**：
- 纯文本 RAG：DPR + FiD, ColBERT + FiD
- 多模态 RAG：MuRAG, RA-CM3, UniRAG, VideoRAG
- VLM-based：GPT-4V + RAG, LLaVA-1.5 + RAG, InternVL2 + RAG

**实现细节**：骨干 VLM 为 InternVL2-8B，文本编码器 BGE-large-en-v1.5，视觉编码器 SigLIP-400M。HGAT 3 层，隐藏维度 768。AdamW 优化器，学习率 2e-4，batch size 32，8×A100 训练 20 epochs。

**评估指标**：Exact Match (EM)、F1、Evidence Faithfulness (EF)、Hallucination Rate (HR)、Modality Utilization (MU)。

### 3.2 主要结果

| 方法 | MultimodalQA EM | MultimodalQA F1 | WebQA EM | WebQA F1 | MMCoQA EM | MMCoQA F1 |
|------|:---:|:---:|:---:|:---:|:---:|:---:|
| DPR + FiD | 38.2 | 45.6 | 34.7 | 41.3 | 29.8 | 36.4 |
| ColBERT + FiD | 40.1 | 47.8 | 36.5 | 43.2 | 31.5 | 38.7 |
| MuRAG | 44.3 | 52.1 | 41.8 | 49.5 | 35.2 | 43.1 |
| RA-CM3 | 43.7 | 51.4 | 40.9 | 48.7 | 34.6 | 42.3 |
| UniRAG | 46.8 | 54.9 | 44.2 | 52.1 | 37.8 | 45.9 |
| VideoRAG | 47.5 | 55.7 | 45.1 | 53.4 | 38.4 | 46.7 |
| GPT-4V + RAG | 49.2 | 57.8 | 47.3 | 55.6 | 40.1 | 48.5 |
| LLaVA-1.5 + RAG | 45.6 | 53.8 | 42.7 | 50.9 | 36.3 | 44.2 |
| InternVL2 + RAG | 48.7 | 57.1 | 46.8 | 55.1 | 39.5 | 47.8 |
| **BayesRAG (Ours)** | **53.4** | **62.3** | **51.5** | **60.8** | **44.2** | **53.1** |

BayesRAG 在所有数据集和指标上均取得最优。相比最强基线 GPT-4V + RAG，EM 提升 4.2-4.7%，F1 提升 4.5-5.2%。在需要跨轮次证据整合的 MMCoQA 上提升尤为显著。

**证据质量分析（WebQA）**：

| 方法 | EF (↑) | HR (↓) | MU (↑) |
|------|:---:|:---:|:---:|
| MuRAG | 62.3 | 28.7 | 45.2 |
| UniRAG | 67.8 | 23.4 | 51.6 |
| VideoRAG | 69.1 | 21.8 | 54.3 |
| GPT-4V + RAG | 71.5 | 19.2 | 57.8 |
| InternVL2 + RAG | 70.3 | 20.1 | 56.4 |
| **BayesRAG** | **82.7** | **14.8** | **71.2** |

BayesRAG 的证据忠实度达 82.7%（vs. 71.5%），幻觉率降至 14.8%（vs. 19.2%），模态利用率 71.2%（vs. 57.8%）。

**冲突证据子集（WebQA，500 例人工标注）**：

| 方法 | EM | F1 | 正确模态选择率 (%) |
|------|:---:|:---:|:---:|
| GPT-4V + RAG | 36.8 | 44.3 | 62.7 |
| InternVL2 + RAG | 35.1 | 43.0 | 60.9 |
| **BayesRAG** | **45.6** | **54.7** | **78.3** |

在冲突证据场景下，BayesRAG 的 EM 比 GPT-4V + RAG 高 8.8%，正确模态选择率达 78.3%。

### 3.3 消融实验

| 配置 | EM | F1 | EF |
|------|:---:|:---:|:---:|
| **BayesRAG (完整)** | **51.5** | **60.8** | **82.7** |
| w/o CMEG（无图结构） | 47.8 | 56.9 | 76.3 |
| w/o BRE（均匀可靠性） | 48.2 | 57.4 | 74.1 |
| w/o CAF（简单拼接） | 49.1 | 58.2 | 77.5 |
| w/o 不确定性解码 | 50.3 | 59.4 | 79.8 |
| w/o 对比损失 | 50.1 | 59.1 | 80.2 |
| 确定性可靠性估计 | 49.5 | 58.7 | 76.8 |

关键发现：
- **移除 CMEG** 导致 EM 最大下降（-3.7%），证实显式建模跨模态关系的重要性。
- **移除 BRE** 导致 EF 最大下降（-8.6%），说明贝叶斯可靠性估计对证据忠实度至关重要。
- **确定性替代贝叶斯**（点估计代替分布）性能下降，验证了不确定性建模的价值。
- 不确定性解码贡献适中但一致，尤其对证据忠实度有帮助。

**敏感性分析**：检索证据数 $k=7$ 时性能最优；图层数 $L=3$ 最佳；ELBO 权重 $\lambda_1 = 0.1$ 最优。BayesRAG 对 $k$ 增大的性能退化远小于基线（如 InternVL2+RAG 从 46.8 降至 43.2），说明可靠性估计有效处理了噪声证据。

**计算开销**：相比 InternVL2 + RAG，BayesRAG 增加 142M 参数（1.8%）和 37ms 推理延迟（20.8%），开销适中。

## 4. 关键结论与贡献

- **提出 BayesRAG**，首个将贝叶斯推断引入多模态 RAG 证据融合的框架，通过概率建模解决模态冲突问题。
- **三个协同组件**：CMEG 显式建模跨模态关系，BRE 通过变分推断估计证据可靠性，CAF 基于可靠性和互补性进行加权融合。
- **显著性能提升**：在 MultimodalQA、WebQA、MMCoQA 三个基准上全面超越现有方法，EM 提升最高 12.4%，证据忠实度提升 15.7%，幻觉率降低 23.1%。
- **冲突场景优势突出**：在模态冲突情况下，贝叶斯方法的优势最为明显（EM 提升 8.8%，正确模态选择率 78.3%）。
- **贝叶斯优于确定性**：与置信度评分、注意力加权、集成投票等确定性替代方案相比，贝叶斯方法一致胜出，可靠性估计与人类判断的 Pearson 相关性达 0.73。

## 5. 局限性与未来方向

**作者自述局限**：
- 当前仅处理文本和图像两种模态，未扩展到视频、音频和结构化数据。
- 变分推断增加了计算开销，可通过摊销推断（amortized inference）技术缓解。
- 可靠性估计在证据级别操作，更细粒度（句子级或区域级）的可靠性估计可能进一步提升性能。

**补充分析**：
- 贝叶斯框架的先验选择（均匀 Beta 先验）较为简单，针对特定领域可设计信息性先验。
- 图构建依赖固定阈值（$\tau_{\text{intra}}$, $\tau_{\text{cross}}$），自适应阈值选择可能更鲁棒。
- 论文未探讨在开放域生成（非 QA）任务上的效果，泛化性有待验证。

## 6. 个人思考与关联

**与 VideoRAG 的关系**（parent 论文）：VideoRAG 将 RAG 扩展到视频理解，但仍采用独立检索和简单融合策略。BayesRAG 在此基础上引入概率框架，从"检索什么"推进到"如何可靠地融合"，是多模态 RAG 融合层面的重要进步。

**启发与联系**：
- 贝叶斯可靠性估计的思路可推广到任何需要融合多源信息的场景，如多文档摘要、多 agent 协作中的信息聚合。
- 不确定性感知解码（证据不可靠时回退到参数知识）是一种优雅的设计，类似于 Self-RAG 中的自适应检索思想，但从概率角度提供了更原则性的解决方案。
- CMEG 的异构图建模思路可与知识图谱增强 RAG 结合，构建更丰富的证据关系网络。

**可能的改进方向**：
- 将 BRE 扩展为在线学习模式，随着交互积累动态更新证据源的先验可靠性。
- 探索将互补性分数用于检索阶段（而非仅在融合阶段），实现互补性感知的主动检索。
- 结合 Chain-of-Thought 推理，让模型显式输出可靠性判断的推理过程，增强可解释性。