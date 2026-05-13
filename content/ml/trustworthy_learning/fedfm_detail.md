### Advances and Open Challenges in Federated Foundation Models

```yaml
id: fedfm_survey_2024
tags: [federated-learning, foundation-models, survey, PEFT, trustworthiness, incentive-mechanism]
authors: [Chao Ren, Han Yu, Hongyi Peng, Xiaoli Tang, Bo Zhao, Liping Yi, Alysa Ziying Tan, Yulan Gao, Anran Li, Bo Li, Xiaoxiao Li, Zengxiang Li, Qiang Yang]
year: 2024
venue: IEEE (Transactions)
url: https://arxiv.org/abs/2404.15381
```

## 一句话总结

本文系统性地提出了联邦基础模型（FedFM）的多层分类体系，从**高效训练与聚合**、**可信赖性**、**激励机制**和**模型评估**四大支柱出发，全面综述了将基础模型（FM）与联邦学习（FL）结合的现有方法、关键挑战与未来方向。

## 核心要点

- **FedFM 定义与动机**：基础模型（GPT、BERT、ViT 等）需要海量数据训练，而 FL 可在保护隐私的前提下聚合分布式数据；但 FM 的巨大规模（数十亿参数）使传统 FL 方法在计算、通信和聚合方面面临根本性挑战。
- **四支柱分类体系**：(1) 高效训练与聚合——涵盖聚合策略（加权平均→MoE 启发）、计算效率（PEFT/LoRA、Prompt Tuning、Instruction Tuning）、通信效率（剪枝、量化压缩）；(2) 可信赖性——拜占庭鲁棒性（投毒攻击与防御）+ 隐私保护（成员推断/数据重建攻击与 DP/压缩防御）；(3) 激励机制——参与者选择、贡献评估（Shapley 值）、奖励分配；(4) 评估——客户端/样本贡献评估与特征贡献解释。
- **规模差距问题**：TABLE III 显示当前 FL 实验中使用的 FM 规模仅 0.05M–223M 参数，远低于真实 FM（数十亿至万亿），表明 FedFM 研究仍处于早期阶段。
- **FedFM 特有挑战**：FM 的黑盒性质使传统 FL 攻防方法失效；FM 的 in-context learning 特性引入新的 prompt 注入攻击面；Shapley 值计算在 FM 规模下指数级不可行。
- **MoE 与聚合的天然联系**：MoE 的路由机制与 FL 中局部模型聚合策略存在结构性相似，可启发新型 FedFM 聚合方法——将聚合视为可学习组件而非固定规则。

## 深入细节

### 1. FedFM 整体框架与分类体系

论文提出的 FedFM 分类体系如下（对应论文 Fig. 1）：

```
FedFM Taxonomy
├── Efficient FedFM Training & Aggregation (Section IV)
│   ├── Aggregation Strategies
│   │   ├── Weighted Averaging (FedAvg, FedProx, SCAFFOLD...)
│   │   └── Advanced (Model Soup, MoE-inspired routing)
│   ├── Computational Efficiency
│   │   ├── PEFT (LoRA, Adapter, BitFit)
│   │   ├── Prompt Tuning (Soft prompts, FedPrompt)
│   │   └── Instruction Tuning (FedIT)
│   └── Communication Efficiency
│       ├── Model Pruning (HeteroFL, FjORD, PruneFL, FedPM, FedTiny)
│       └── Model Compression (FedPAQ quantization, SoteriaFL)
├── Trustworthiness (Section V)
│   ├── Byzantine Robustness
│   │   ├── Attacks: Untargeted (Gaussian) / Targeted (backdoor, prompt-based)
│   │   └── Defenses: Geometric outlier detection / Top performance selection / Hybrid
│   └── Privacy
│       ├── Attacks: Membership Inference / Data Reconstruction
│       └── Defenses: Differential Privacy / Gradient Compression / Sparsification
├── Incentive Mechanisms (Section VI)
│   ├── Participant Selection (Contract Theory / Game Theory / Auction / Model-centric)
│   ├── Contribution Evaluation (Shapley Value / Influence Function)
│   └── Reward Distribution (Free-riding deterrence)
└── Evaluation (Section VII)
    ├── Client & Sample Contribution (SV-based / Influence-based)
    └── Feature Contribution (Model-Agnostic / Model-Specific)
```

### 2. 核心算法：FedAvg 适配 FM（Algorithm 1）

```
Algorithm 1: FedFM Training via FedAvg
────────────────────────────────────────
Input: N clients, pre-trained FM w₀, T rounds, local epochs E
Output: Fine-tuned global FM w_T

Server:
  for t = 1, ..., T do
    Select subset S_t ⊆ {1,...,N}
    Broadcast w_t to clients in S_t
    for each client k ∈ S_t in parallel do
      w_t^k ← ClientUpdate(k, w_t)
    end
    w_{t+1} ← Σ_{k∈S_t} (n_k/n) · w_t^k    // Weighted aggregation
  end

ClientUpdate(k, w):
  for epoch e = 1, ..., E do
    for batch b ∈ D_k do
      w ← w - η · ∇L(w; b)
    end
  end
  return w
```

**三大关键研究问题**（论文标注于算法中）：
- **RQ1**: 如何设计更优的聚合策略？（加权平均 vs. 学习型路由）
- **RQ2**: 如何降低本地计算开销？（PEFT 使只需微调 <1% 参数）
- **RQ3**: 如何降低通信开销？（剪枝/量化使传输量大幅减少）

### 3. 计算效率方法对比

| 方法类别 | 代表工作 | 核心思想 | 可训练参数比例 |
|---------|---------|---------|--------------|
| **Full Fine-tuning** | FedBERT [40] | 全参数训练 | 100% |
| **PEFT/LoRA** | FFA-LoRA, FedPara | 低秩分解注入适配器 | ~0.1-1% |
| **Prompt Tuning** | FedPrompt, PROMPTFL | 冻结 FM，只训练 soft prompt | <0.01% |
| **Instruction Tuning** | FedIT [67] | 结构化指令-输出对 + FedAvg 聚合 LoRA | ~0.1% |

### 4. 可信赖性：FedFM 特有威胁分析

**投毒攻击在 FedFM 中的特殊性**：
- **无目标攻击更难**：FM 规模巨大，攻击者需反复训练影子模型来优化毒化样本，计算成本极高；且本地任务异构性使全局收敛难以被单点破坏。
- **有目标攻击更隐蔽**：FM 的 in-context learning 使 prompt 成为新攻击面；prompt-based backdoor [81-83] 可在不影响正常性能的情况下操纵特定输出。
- **防御更困难**：现有后门检测依赖跨类别样本迁移优化，但 FM 任务复杂度（如百万级分类）使其不可行。

**隐私攻击在 FedFM 中的特殊性**：
- 成员推断攻击因 FM 黑盒性质和规模而难以直接实施，但 prompt-based 推断攻击 [98] 仍构成威胁。
- 数据重建攻击因 FM 的强信息表示能力和频繁交互，反而可能通过精心构造的 prompt 诱导敏感反馈 [102-104]。

### 5. 激励机制：Shapley 值在 FedFM 中的挑战

Shapley 值定义：

$$\phi_i = \sum_{S \subseteq N \setminus \{i\}} \frac{|S|!(|N|-|S|-1)!}{|N|!} [v(S \cup \{i\}) - v(S)]$$

**FedFM 中的不可行性**：
- 效用函数评估需训练子模型，复杂度随参与者数指数增长
- FM 规模使每次子模型训练成本极高
- 现有加速方法：梯度近似 SV [163]、局部嵌入 SV [164]、蒙特卡洛采样 [166-167]、截断采样 [168-169]

### 6. 聚合策略的新方向：Model Soup 与 MoE

**Model Soup [55-56]**：将多个独立微调的 FM 权重直接平均，即可提升准确率和鲁棒性。这暗示 FedFM 中即使只在训练结束后聚合一次也可能有效。

**MoE 启发的聚合**：
- MoE 中的路由函数 ↔ FL 中的聚合权重分配
- 可将聚合策略设计为数据驱动的可学习路由，而非固定的加权平均
- 潜在方向：设计同时学习本地更新和聚合方式的算法

### 7. 通信效率关键方法

| 方法 | 策略 | 特点 |
|------|------|------|
| HeteroFL [31] | 异构子网络分配 | 适配不同客户端能力 |
| FjORD [33] | 有序 Dropout + 自蒸馏 | 层次化知识组织 |
| PruneFL [35] | 两阶段剪枝（预热+自适应） | 可信客户端初始化 |
| FedPM [36] | 彩票假设启发的二值掩码 | 传输掩码而非权重 |
| FedPAQ [30] | 动态量化 | 降低通信精度 |
| SoteriaFL [38] | 压缩 + 隐私保护 | 兼顾效率与安全 |

## 练习题

1. **概念理解**：解释为什么 MoE 架构中的路由机制与联邦学习中的模型聚合策略存在结构性相似？如果将 FL 聚合设计为可学习的路由函数，可能面临哪些额外挑战（如隐私、通信）？

2. **方法对比**：在 FedFM 场景下，PEFT（如 LoRA）和 Prompt Tuning 各有什么优劣？如果客户端计算资源极度受限（如移动设备），你会推荐哪种方法？为什么？

3. **安全分析**：论文指出 FM 的 in-context learning 特性使 prompt-based backdoor 攻击成为新威胁。请设计一种可能的防御策略，考虑到 FedFM 中服务器无法直接访问客户端数据的约束。

4. **规模挑战**：TABLE III 显示当前实验规模远小于真实 FM。请分析从 223M 参数扩展到 70B+ 参数时，FedFM 在聚合、通信和隐私保护三个维度分别会遇到什么新的瓶颈？提出至少一个可能的解决思路。

5. **贡献评估**：Shapley 值在 FedFM 中计算不可行。请比较 Shapley 值方法和 Influence Function 方法的优缺点，并提出一种可能适用于 FedFM 规模的轻量级贡献评估方案。