### Composer — 混合架构搜索

```yaml
id: composer
name: Composer
full_name: "混合架构搜索 (Composer: Hybrid Neural Architecture Search)"
year: "2026"
org: "ICLR 2026"
paper_url: "https://openreview.net/forum?id=13934"
category: "nas"
parent: "nasnet"
motivation: "模块化混合搜索+堆叠拉伸至8B"
```

#### 📝 一句话总结

Composer 提出了一种模块化混合架构搜索框架，在异构算子库（Attention、SSM、Conv、MLP 等）中搜索最优层级组合模式，并通过"堆叠-拉伸"缩放策略将搜索到的小型代理架构无损扩展至 8B 参数规模，在语言建模任务上以更低计算成本超越纯 Transformer 架构。

#### 🎯 核心要点

- **异构算子搜索空间**：定义包含 Multi-Head Attention、Grouped-Query Attention、Mamba-2 SSM、Gated Conv1D、SwiGLU MLP、Linear Attention 共 6 类算子的模块化搜索空间
- **组合模式搜索（Composition Pattern Search）**：以"段（Segment）"为单位搜索算子排列，每段包含 \(K\) 层，搜索最优的算子类型分配
- **双阶段搜索策略**：Stage-1 在 150M 代理模型上用进化搜索确定组合模式，Stage-2 通过超网络权重共享微调算子内部超参数
- **堆叠-拉伸缩放法则（Stack-and-Stretch）**：将搜索到的段模式重复堆叠增加深度，同时按幂律拉伸隐藏维度，从 150M 无损扩展至 8B
- **缩放一致性定理**：证明在特定初始化条件下，堆叠-拉伸保持各层梯度范数比例不变，保证训练稳定性
- **多目标帕累托搜索**：同时优化困惑度（PPL）、推理吞吐量（tokens/s）和峰值显存，输出帕累托前沿架构族
- **搜索效率**：仅需 256 GPU-hours 完成全部搜索（含 Stage-1 + Stage-2），约为同规模随机搜索的 1/40
- **SOTA 结果**：Composer-8B 在 C4/Pile 上以 6.8/7.2 PPL 超越同参数量 Llama 架构（7.3/7.8），推理吞吐量提升 1.7×

#### 🔬 深入细节

![Composer 混合架构搜索框架](https://production-media.paperswithcode.com/methods/composer_framework.png)
*图：Composer 框架总览。左侧为异构算子库，中间为组合模式搜索过程（进化算法在代理模型上评估不同算子排列），右侧为堆叠-拉伸缩放策略将最优模式扩展至目标规模。*

##### 算法伪代码

```python
# Composer: 混合架构搜索流程
# Stage 1: 组合模式搜索 (Evolutionary Search)

operator_library = [MultiHeadAttn, GQA, Mamba2, GatedConv1D, SwiGLU, LinearAttn]
segment_length = K  # 每段包含 K 层 (e.g., K=4)

# 初始化种群: 随机生成 P 个组合模式
population = [random_composition(segment_length, operator_library) for _ in range(P)]

for generation in range(G):
    # 评估每个候选架构 (150M proxy model, 训练 2B tokens)
    fitness = []
    for pattern in population:
        model = build_proxy_model(pattern, hidden_dim=768, num_segments=6)
        ppl = train_and_eval(model, data="C4_subset", tokens=2e9)
        throughput = measure_throughput(model, batch_size=32, seq_len=2048)
        fitness.append(pareto_score(ppl, throughput))
    
    # 选择 + 交叉 + 变异
    parents = tournament_select(population, fitness, top_k=P//4)
    offspring = crossover(parents) + mutate(parents, prob=0.1)
    population = elitism_merge(population, offspring, fitness)

best_pattern = pareto_front(population, fitness)[0]  # e.g., [Attn, Mamba2, Mamba2, GatedConv1D]

# Stage 2: 堆叠-拉伸缩放至目标规模
def scale_to_target(pattern, target_params=8e9):
    # 堆叠: 重复段模式直到达到目标深度
    num_segments = compute_depth(target_params, pattern)  # e.g., 16 segments → 64 layers
    # 拉伸: 按幂律扩展隐藏维度
    hidden_dim = compute_width(target_params, num_segments)  # e.g., 4096
    return build_model(pattern, hidden_dim, num_segments)

final_model = scale_to_target(best_pattern, target_params=8e9)
# 全量预训练 final_model on 2T tokens
```

##### 动机与背景

近年来，大语言模型（LLM）领域出现了一个重要趋势：**纯 Transformer 架构并非所有场景的最优选择**。Mamba、RWKV、Hyena 等亚二次复杂度模型在长序列建模上展现出优势，而实践中 Jamba、Zamba 等工作表明，混合架构（交替使用 Attention 和 SSM 层）往往能兼顾两者优点。

然而，混合架构的设计面临两个核心挑战：

1. **组合爆炸**：假设有 6 种算子、64 层网络，可能的排列组合为 \(6^{64} \approx 10^{50}\)，远超人工试错能力
2. **缩放不确定性**：在小规模验证的最优组合，放大后是否仍然最优？不同算子的缩放行为（scaling law）可能不同

Composer 的核心洞察继承自 NASNet 的"搜索-迁移"范式：**在小型代理模型上搜索最优的算子组合模式（而非完整架构），再通过理论保证的缩放法则扩展至目标规模**。

##### 核心机制：模块化组合搜索空间

**1. 异构算子库**

Composer 定义了 6 种标准化算子模块，每种算子统一为相同的输入输出接口 \(\mathbf{x} \in \mathbb{R}^{B \times L \times D} \to \mathbf{y} \in \mathbb{R}^{B \times L \times D}\)：

| 算子 | 复杂度 | 特点 |
|------|--------|------|
| Multi-Head Attention (MHA) | \(O(L^2 D)\) | 全局依赖，KV cache 线性增长 |
| Grouped-Query Attention (GQA) | \(O(L^2 D)\) | 减少 KV heads，推理更高效 |
| Mamba-2 SSM | \(O(LD)\) | 线性复杂度，硬件友好的选择性扫描 |
| Gated Conv1D | \(O(LDk)\) | 局部感受野，极低延迟 |
| SwiGLU MLP | \(O(LD_{\text{ff}})\) | 纯前馈，无序列交互 |
| Linear Attention | \(O(LD^2)\) | 线性复杂度的全局注意力近似 |

> 💡 关键：所有算子共享相同的 Pre-RMSNorm + Residual 包装结构，使得任意算子可在任意位置即插即用，搜索空间完全正交。

**2. 段级组合模式（Segment-Level Composition）**

与 NASNet 搜索 Cell 内部连接不同，Composer 搜索的是**层级算子类型分配**。网络被划分为等长的"段"，每段包含 \(K\) 层：

$$\text{Segment}(k_1, k_2, \ldots, k_K) \quad \text{where } k_i \in \{\text{MHA, GQA, Mamba2, Conv1D, SwiGLU, LinAttn}\}$$

整个网络由 \(S\) 个相同段重复堆叠构成：

$$\text{Network} = \text{Embed} \to \underbrace{\text{Seg} \to \text{Seg} \to \cdots \to \text{Seg}}_{S \text{ 次}} \to \text{LM-Head}$$

> ⚠️ 注意：段内的算子排列顺序是搜索目标，但所有段共享相同模式——这是实现可缩放堆叠的关键约束。

**3. 搜索空间规模分析**

对于段长 \(K=4\)，6 种算子的排列数为：

$$|\mathcal{S}| = 6^K = 6^4 = 1296$$

这比 NASNet 的 \(10^{28}\) 小得多，但每个候选需要实际训练评估，因此采用进化搜索而非穷举。加入算子内部超参数（如 attention head 数、SSM state 维度）后，有效搜索空间约为 \(10^5\)。

##### 堆叠-拉伸缩放法则（Stack-and-Stretch）

这是 Composer 最核心的理论贡献。给定代理模型的最优段模式 \(\mathcal{P}^*\)，如何将 150M 模型扩展至 8B？

**堆叠（Stack）**：增加段重复次数 \(S\)

$$S_{\text{target}} = S_{\text{proxy}} \cdot \alpha_d, \quad \alpha_d = \left(\frac{N_{\text{target}}}{N_{\text{proxy}}}\right)^{r_d}$$

**拉伸（Stretch）**：增加隐藏维度 \(D\)

$$D_{\text{target}} = D_{\text{proxy}} \cdot \alpha_w, \quad \alpha_w = \left(\frac{N_{\text{target}}}{N_{\text{proxy}}}\right)^{r_w}$$

其中 \(r_d + 2r_w \approx 1\)（因为参数量 \(N \propto S \cdot D^2\)），论文通过网格搜索确定最优比例为 \(r_d = 0.4, r_w = 0.3\)。

**缩放一致性定理**：

$$\text{若 } \frac{\|\nabla_{\ell} \mathcal{L}\|}{\|\nabla_{\ell'} \mathcal{L}\|} = c_{\ell,\ell'} \text{ 在 proxy 模型中成立，则在 Stack-and-Stretch 后仍成立}$$

条件是使用 μP（Maximal Update Parameterization）初始化，并对不同算子类型使用各自的学习率乘子。这保证了小模型上的最优组合在放大后仍然是最优的。

> 💡 关键：缩放一致性是 Composer 能够在 150M 上搜索、8B 上部署的理论基石。没有这一保证，代理模型的搜索结果可能在大规模上失效。

##### 多目标进化搜索

Composer 使用 NSGA-II 风格的多目标进化算法，同时优化三个指标：

1. **困惑度（PPL）**：在 C4 验证集上评估语言建模质量
2. **推理吞吐量**：在 A100 GPU 上测量 tokens/s（batch=1, seq=2048）
3. **峰值显存**：推理时的 GPU 内存占用

适应度函数为帕累托支配关系，最终输出一组帕累托前沿架构，用户可根据部署约束选择。

搜索超参数：
- 种群大小：\(P = 128\)
- 进化代数：\(G = 50\)
- 代理模型：150M 参数，训练 2B tokens（约 4 GPU-hours/个体）
- 总搜索预算：128 × 4 × 50 / 并行度 ≈ 256 GPU-hours

##### 实验结果与对比

**语言建模（8B 规模，2T tokens 训练）**：

| 模型 | 架构类型 | 参数量 | C4 PPL | Pile PPL | 吞吐量 (tok/s) |
|------|----------|--------|--------|----------|----------------|
| Llama-2 | 纯 Transformer (GQA) | 7B | 7.3 | 7.8 | 4,200 |
| Mamba-2 | 纯 SSM | 7.8B | 7.5 | 7.9 | 6,800 |
| Jamba | 手工混合 (Attn+Mamba) | 7.4B | 7.1 | 7.5 | 5,100 |
| **Composer-8B** | **搜索混合** | **8.0B** | **6.8** | **7.2** | **7,100** |

**搜索发现的最优模式**（段长 K=4）：

$$\mathcal{P}^* = [\text{GQA},\; \text{Mamba2},\; \text{Mamba2},\; \text{GatedConv1D}]$$

即每 4 层中仅 1 层使用注意力机制，其余使用亚二次复杂度算子。这一比例（25% Attention）显著低于手工设计的混合架构（通常 50%），但在搜索验证中被证明是 PPL-吞吐量帕累托最优的。

##### 与传统方法的区别

| 维度 | NASNet (2018) | DARTS (2019) | Composer (2026) |
|------|---------------|--------------|-----------------|
| 搜索目标 | CNN Cell 内部连接 | CNN Cell 内部连接 | LLM 层级算子类型分配 |
| 算子类型 | 同构（卷积/池化） | 同构（卷积/池化） | 异构（Attn/SSM/Conv/MLP） |
| 搜索方法 | RL (PPO) | 梯度松弛 | 多目标进化 (NSGA-II) |
| 缩放策略 | 增加 N 和滤波器数 | 增加 N 和滤波器数 | 堆叠-拉伸 + μP + 缩放一致性定理 |
| 目标规模 | ~100M (ImageNet) | ~10M (CIFAR) | **8B (LLM)** |
| 搜索成本 | 2000 GPU-hours | 1 GPU-day | 256 GPU-hours |
| 多目标 | 否 | 否 | 是（PPL + 吞吐 + 显存） |

Composer 的核心贡献在于将 NAS 的"搜索-迁移"范式从 CV 领域的同构算子搜索，推广到 LLM 领域的**异构算子组合搜索**，并通过缩放一致性定理解决了"小模型搜索结果能否迁移到大模型"这一关键问题。

#### 🧪 练习题

```yaml
question: "Composer 能够将 150M 代理模型的搜索结果可靠迁移到 8B 规模的关键理论保证是什么？"
options:
  - "使用 NSGA-II 多目标进化算法确保帕累托最优性"
  - "所有算子共享 Pre-RMSNorm + Residual 包装结构"
  - "堆叠-拉伸缩放法则在 μP 初始化下保持各层梯度范数比例不变（缩放一致性定理）"
  - "段内算子排列顺序在所有段中保持一致"
answer: 2
explain: "缩放一致性定理证明在 μP 初始化条件下，Stack-and-Stretch 操作保持各层梯度范数比例不变，确保小模型上的最优组合在放大后仍然最优，这是跨规模迁移的理论基石。"
```