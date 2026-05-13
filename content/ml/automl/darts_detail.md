### DARTS: Differentiable Architecture Search

```yaml
id: darts_2018
tags: [AutoML, NAS, 可微搜索, 双层优化, 连续松弛]
authors: [Hanxiao Liu, Karen Simonyan, Yiming Yang]
venue: ICLR 2019
year: 2018
url: https://arxiv.org/abs/1806.09055
significance: 5/5
```

## 📝 一句话总结

DARTS通过将离散的架构搜索空间松弛为连续表示（softmax混合操作），将NAS问题转化为可微的双层优化问题，使得架构搜索可用梯度下降高效完成，搜索成本从数千GPU天降至约1天。

## 🎯 核心要点

- **连续松弛**：将离散的操作选择替换为所有候选操作的softmax加权和，使搜索空间连续可微
- **双层优化**：架构参数α在验证集上优化（上层），网络权重w在训练集上优化（下层），形成min-min嵌套优化
- **高效近似**：通过一步展开（one-step unrolled）近似内层优化，并用有限差分计算二阶导数，避免昂贵的Hessian计算
- **通用性**：同一框架适用于CNN（图像分类）和RNN（语言模型），搜索到的cell可迁移到更大模型
- **效率突破**：搜索仅需1-4 GPU天，比RL/进化方法快1000倍以上，性能持平或超越

## 🔬 深入细节

### 1. 搜索空间：有向无环图（DAG）

搜索空间定义为一个有N个节点的有向无环图。每个节点 $x^{(i)}$ 是一个潜在表示（特征图），每条有向边 $(i,j)$ 关联一个操作 $o^{(i,j)}$（如卷积、池化、skip等）。每个中间节点是其所有前驱节点经操作变换后的求和：

$$x^{(j)} = \sum_{i < j} o^{(i,j)}(x^{(i)})$$

![DARTS Overview](https://ar5iv.labs.arxiv.org/html/1806.09055/assets/darts.png)
*图1：DARTS方法概览。(a)初始未知操作 → (b)连续松弛为混合操作 → (c)联合优化α和w → (d)离散化得到最终架构*

### 2. 连续松弛

核心创新：将离散的操作选择松弛为连续的混合操作。对于边$(i,j)$上的候选操作集合$\mathcal{O}$，混合操作定义为：

$$\bar{o}^{(i,j)}(x) = \sum_{o \in \mathcal{O}} \frac{\exp(\alpha_o^{(i,j)})}{\sum_{o' \in \mathcal{O}} \exp(\alpha_{o'}^{(i,j)})} \cdot o(x)$$

其中 $\alpha = \{\alpha_o^{(i,j)}\}$ 是架构参数向量。搜索任务转化为学习一组连续变量α。搜索结束后，通过 $o^{(i,j)} = \arg\max_{o \in \mathcal{O}} \alpha_o^{(i,j)}$ 离散化得到最终架构。

### 3. 双层优化

架构搜索被形式化为双层优化问题：

$$\min_\alpha \quad \mathcal{L}_{val}(w^*(\alpha), \alpha)$$
$$\text{s.t.} \quad w^*(\alpha) = \arg\min_w \mathcal{L}_{train}(w, \alpha)$$

- **上层目标**：在验证集上最小化损失，优化架构参数α
- **下层约束**：在训练集上最小化损失，优化网络权重w

### 4. 梯度近似

直接求解双层优化需要完整训练内层，计算量巨大。DARTS使用**一步展开近似**：

用一步梯度下降近似 $w^*(\alpha)$：
$$w' \approx w - \xi \nabla_w \mathcal{L}_{train}(w, \alpha)$$

则α的梯度近似为：
$$\nabla_\alpha \mathcal{L}_{val}(w', \alpha) \approx \nabla_\alpha \mathcal{L}_{val}(w', \alpha) - \xi \nabla^2_{\alpha,w} \mathcal{L}_{train}(w, \alpha) \cdot \nabla_{w'} \mathcal{L}_{val}(w', \alpha)$$

**两种近似策略**：
- **一阶近似**（$\xi = 0$）：直接用 $\nabla_\alpha \mathcal{L}_{val}(w, \alpha)$，忽略二阶项，速度快但不精确
- **二阶近似**（$\xi > 0$）：保留Hessian-vector积项，用有限差分高效计算：

$$\nabla^2_{\alpha,w} \mathcal{L}_{train}(w, \alpha) \cdot v \approx \frac{\nabla_\alpha \mathcal{L}_{train}(w^+, \alpha) - \nabla_\alpha \mathcal{L}_{train}(w^-, \alpha)}{2\epsilon}$$

其中 $w^\pm = w \pm \epsilon v$，$v = \nabla_{w'} \mathcal{L}_{val}(w', \alpha)$，$\epsilon$ 为小常数（论文取 $\epsilon = 0.01 / \|v\|_2$）。

### 5. 算法伪代码

```
Algorithm: DARTS
Input: 候选操作集O, 搜索轮数T
Output: 离散化架构

1. 初始化架构参数α和网络权重w（随机初始化）
2. while 未收敛 do:
3.   // 上层：更新架构参数
4.   通过∇α L_val(w', α)更新α  （w' = w - ξ∇w L_train(w,α)）
5.   // 下层：更新网络权重  
6.   通过∇w L_train(w, α)更新w
7. end while
8. // 离散化
9. 对每条边(i,j): 选择 o* = argmax_o α_o^(i,j)
10. 对每个节点j: 保留前k条最强边（k=2 for CNN）
11. return 最终架构
```

### 6. 实验结果

**CIFAR-10 图像分类**：

| 方法 | 测试错误率(%) | 参数量(M) | 搜索成本(GPU天) |
|------|:---:|:---:|:---:|
| NASNet-A | 2.65 | 3.3 | 1800 |
| AmoebaNet-A | 3.34 | 3.2 | 3150 |
| ENAS | 2.89 | 4.6 | 0.5 |
| **DARTS (1st order)** | **3.00±0.14** | **3.3** | **0.5** |
| **DARTS (2nd order)** | **2.76±0.09** | **3.3** | **1.0** |

**Penn Treebank 语言模型**：

| 方法 | 困惑度(Perplexity) | 参数量(M) | 搜索成本(GPU天) |
|------|:---:|:---:|:---:|
| NAS | 62.4 | 25 | ~10000 |
| ENAS | 55.8 | 24 | 0.5 |
| **DARTS (1st order)** | **58.1** | **23** | **0.5** |
| **DARTS (2nd order)** | **55.7** | **23** | **1.0** |

**ImageNet迁移**：CIFAR-10搜索到的cell直接迁移到ImageNet，top-1错误率26.7%（mobile setting），与NASNet/AmoebaNet持平。

![Search Progress](https://ar5iv.labs.arxiv.org/html/1806.09055/assets/x2.png)
*图3：DARTS在CIFAR-10上搜索过程中验证准确率的变化*

### 7. 关键设计细节

- **候选操作集**（CNN）：3×3/5×5 separable conv, 3×3/5×5 dilated conv, 3×3 max/avg pool, identity, zero
- **Cell结构**：搜索normal cell和reduction cell，reduction cell在1/3和2/3深度处使用
- **搜索阶段**：小型代理模型（8 cells, 16初始通道），搜索完成后放大评估（20 cells, 36通道）
- **正则化**：搜索时对α无正则，评估时使用cutout、drop-path等

### 8. 局限性与后续

- **性能坍塌**：搜索后期α可能退化（过多skip-connection），后续工作如P-DARTS、DARTS+等改进
- **搜索-评估gap**：代理模型与最终模型之间存在差距
- **内存开销**：需同时存储所有操作的激活值，内存随操作数线性增长

## 🧪 练习题

1. **概念题**：为什么DARTS需要在验证集上优化α而不能在训练集上同时优化α和w？如果都在训练集上优化会发生什么？

2. **推导题**：详细推导一阶近似（ξ=0）和二阶近似的梯度表达式。解释为什么一阶近似等价于忽略w对α的依赖。

3. **实践题**：假设候选操作集有8个操作，DAG有4个中间节点（每个节点连接所有前驱），计算搜索空间中α的参数量。与离散搜索空间大小（可能的架构数）做对比。

4. **分析题**：DARTS的有限差分近似引入了什么量级的误差？ε的选择如何影响近似精度和数值稳定性？

5. **扩展题**：DARTS搜索后期容易出现skip-connection主导的退化现象。分析其原因，并提出至少两种可能的解决方案。