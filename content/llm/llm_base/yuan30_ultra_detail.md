### Yuan3.0 Ultra: Trillion-Parameter Enterprise-Oriented MoE LLM — 论文精读
```yaml
arxiv_id: "2601.14327"
title: "Layer-adaptive Expert Pruning for Pre-Training of Mixture-of-Experts Large Language Models"
authors: "YuanLab.ai"
published: "2026-01-28"
category: "LLM MoE / Pre-training Pruning"
```

#### 📝 一句话总结
本文提出**层自适应专家剪枝（LAEP）算法**，在MoE预训练稳定阶段剪除欠利用专家并跨设备重排，将1515B模型压缩至1010B（参数减少33.3%），同时训练效率提升48.3%，且性能与SOTA媲美。

#### 🎯 核心要点
1. **两阶段预训练特性**：初始化过渡期（token分配剧烈波动）→ 稳定期（负载收敛），LAEP在稳定期触发剪枝。
2. **层自适应剪枝**：每层独立统计token分布，用局部系数α控制层内剪枝阈值，全局系数β控制跨层剪枝强度。
3. **专家重排（Expert Rearrangement）**：将剩余专家均衡分配到计算设备上，缓解负载不均，最大化硬件利用率。
4. **实际效果**：1515B参数稀疏MoE → 1010B，推理参数量同步下降，预训练效率提升48.3%，多领域基准性能与SOTA持平。

#### 🔬 深入细节

##### 1. 预训练中专家Token分布的两阶段现象
![Figure 1: Token分布演化](https://ar5iv.labs.arxiv.org/html/2601.14327/assets/training_tokens+expert_index.png)
*图1：三个代表性层的专家token负载随训练过程演化（左列a-c）。初始数百步内负载剧烈震荡（数量级差异），随后进入稳定收敛阶段。*

- 在10B小规模模型上验证，使用附录A.1描述的架构和A.2的数据集
- **过渡期**（约前数百次迭代）：各层专家接收的token数量差距可达数量级
- **稳定期**：负载分布收敛，波动减小，此时可安全进行剪枝决策

**专家负载量化图示：**
![Figure 2: 负载分布](https://ar5iv.labs.arxiv.org/html/2601.14327/assets/num_tokens_and_expert_index_bar_vertical1.png)
*图2：(a)不同token负载下的专家数量分布；(b)专家累积token数（从低到高排列），少数专家承载绝大多数token。*

##### 2. LAEP Expert Pruning 算法

**定义**：设第l层有N个专家，处理S个token。指示变量：

$$E[i, j, l] = \begin{cases} 1 & \text{若第}j\text{个token路由到第}i\text{个专家} \\ 0 & \text{否则} \end{cases}$$

**局部剪枝条件**（层内）：

$$\sum_{j'=1}^{S} E[i, j', l] \leq \alpha \cdot \frac{1}{N}\sum_{i'=1}^{N}\sum_{j'=1}^{S} E[i', j', l]$$

即专家i接收的token数 ≤ α × 该层专家平均token数时触发剪枝。α越小，剪枝越激进。

**全局剪枝条件**（跨层）：

$$\text{累积token}(i) < \beta \cdot \max_k(\text{累积token}(k))$$

即某专家累积token低于全局最大值×β时被剪除。β控制全局剪枝强度。

**算法 1：Expert Pruning**
```
Input: Token分配统计数据 D_t, 组数 n_g
Output: 剪枝后保留的专家集合 Exp'

Step 1: 统计每层每个专家的token累积量
Step 2: 按局部条件(α)和全局条件(β)标记待剪枝专家
Step 3: 移除标记专家，输出保留专家集合 Exp'
```

##### 3. Expert Rearrangement（专家重排）
![Figure 3: 重排算法示意图](https://ar5iv.labs.arxiv.org/html/2601.14327/assets/rearrange.png)
*图3：专家重排算法示意图。通过将token负载均衡到各计算设备组，减少设备间的负载不均。*

**算法 2：Expert Rearranging**
```
Input: 各专家平均token数 D_t, 组数 n_g
Output: 重排后的数据 D_r

Step 1: 初始化
  S_g = len(D_t) // n_g                    // 每组容量
  p = argsort(D_t, order=descending)        // token数降序索引
  G = [空列表] x n_g                       // 组容器
  G_sums = [0] x n_g                        // 各组累计token

Step 2: 贪心分配
  for idx in p:
    num = D_t[idx]
    while true:
      Min_g = argmin(G_sums)               // 当前token总数最少组
      if len(G[Min_g]) < S_g:
        将num加入G[Min_g]
        将idx加入G_indice[Min_g]
        G_sums[Min_g] += num
        break
      else:
        G_sums[Min_g] = infinity           // 组已满

Step 3: 数据重排
  In_flat = concat(G_indice[1..n_g])       // 展平索引
  D_r = [D_t[idx] for idx in In_flat]      // 按新顺序输出
  return D_r
```

##### 4. 参数消融实验

**Table 1：α, β及辅助损失对比（10B模型）**

| 配置 | 系数 | 参数量(B) | Test Loss |
|------|------|-----------|-----------|
| Base Model | — | 9.78 | 1.661 |
| Base + DeepSeek-V3辅助损失 | 0.0001 | 9.78 | **1.656** |
| Base + Mixtral辅助损失 | 0.0001 | 9.78 | **1.656** |
| LAEP(β=0.05, α=∞) | β=0.05 | 8.06 | 1.648 |
| LAEP(β=0.1, α=∞) | β=0.1 | 6.89 | 1.658 |
| LAEP(β=0.2, α=∞) | β=0.2 | 5.51 | 1.670 |

- β=0.05时：参数量降至8.06B，test loss从1.661降至1.648（更好！）
- 辅助损失方法无法减少参数，仅改善负载均衡

**Table 2：α局部剪枝系数消融（LFA 指局部灵活调整）**

| 配置 | Test Loss | Test Loss w/o LFA |
|------|-----------|-------------------|
| Base Model | 1.661 | 1.739 |
| α=0.2 | **1.643** | 1.723 |
| α=0.2+0.4混合 | 1.650 | 1.729 |
| α=0.4 | 1.653 | 1.733 |
| α=0.6 | 1.661 | 1.741 |

- **α越小越好**：α=0.2时test loss最低(1.643)，比未剪枝基线(1.661)更好
- LFA（局部灵活调整）机制显著提升性能：test loss从1.739降至1.643（降幅5.5%）

##### 5. 辅助负载均衡损失的影响
![Figure 4: 辅助损失效果对比](https://ar5iv.labs.arxiv.org/html/2601.14327/assets/deepseek_app.png)
*图4：不同辅助损失系数(c=0.0001, 0.01)下专家token分布趋势。上两行为DeepSeek-V3辅助损失，下两行为Mixtral辅助损失。辅助损失能平滑负载但不减少参数，而LAEP直接剪枝+重排从根本上解决问题。*

- 辅助损失仅缓解负载不均，不减少专家总数
- LAEP从架构层面减少冗余专家，同时重排均衡负载

##### 6. 大规模验证：1515B → 1010B

在主预训练实验中，将LAEP应用于1515B稀疏MoE模型：
- 剪枝后模型参数：**1010B**（减少33.3%）
- 训练效率提升：**48.3%**（吞吐量）
- 多领域基准性能：与SOTA系统相当

**结论**：LAEP在预训练阶段安全地剪枝冗余专家，不仅显著降低算力需求，还通过消除欠训练专家可能带来的噪声梯度提升了模型质量（test loss更低）。

##### 7. 练习题（供复习）
1. 为什么LAEP要求在稳定期而非过渡期触发剪枝？如果在过渡期剪枝可能有什么风险？
2. α和β两个参数分别控制什么？为什么α=0.2的模型test loss反而低于未剪枝基线？
3. Expert Rearrangement算法的贪心策略核心思想是什么？其时间复杂度是多少？

---
*论文链接：https://arxiv.org/abs/2601.14327*