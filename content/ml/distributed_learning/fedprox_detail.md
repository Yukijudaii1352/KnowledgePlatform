### FedProx: 联邦近端优化

```yaml
id: fedprox
name: FedProx
full_name: "联邦近端优化 (Federated Optimization in Heterogeneous Networks)"
year: "2020"
org: "CMU"
paper_url: "https://arxiv.org/abs/1812.06127"
category: "foundation"
parent: "—"
motivation: "通过近端项约束本地更新偏离度并允许不精确求解，解决联邦学习中统计与系统异构性问题"
```

#### 📝 一句话总结

FedProx 在 FedAvg 的本地子问题中引入近端项 \(\frac{\mu}{2}\|w - w^t\|^2\) 约束本地模型偏离全局模型的幅度，并通过 \(\gamma\)-inexact 求解机制容忍设备间不等量的本地计算，从而在统计异构（non-IID）和系统异构（设备掉线/算力不均）的联邦场景下实现更稳定的收敛。

#### 🎯 核心要点

- **近端项修正**：本地目标函数添加 \(\frac{\mu}{2}\|w - w^t\|^2\)，限制本地更新对全局模型的偏离，\(\mu=0\) 时退化为 FedAvg
- **\(\gamma\)-inexact 求解**：允许设备不精确求解本地子问题，只需满足 \(\|\nabla h_k(w^*)\| \leq \gamma \|\nabla h_k(w^t)\|\)，天然容忍系统异构
- **B-local dissimilarity 度量**：定义 \(B(w) = \sqrt{\frac{\mathbb{E}_k[\|\nabla F_k(w)\|^2]}{\|\nabla f(w)\|^2}}\) 量化设备间统计异构程度
- **收敛保证**：在非凸设定下，对异构数据和部分设备参与提供 \(O(1/T)\) 收敛率
- **FedAvg 的严格泛化**：FedAvg 是 FedProx 在 \(\mu=0\)、SGD 求解器、固定 \(\gamma\) 下的特例
- **实验验证**：在 4 个真实数据集 + 合成数据上，FedProx 相比 FedAvg 平均提升 22% 测试准确率（异构场景）

#### 🔬 深入细节

##### 核心实验结果

![FedProx vs FedAvg 收敛对比](https://ar5iv.labs.arxiv.org/html/1812.06127/assets/x1.png)
*图：FedProx 在异构联邦场景下相比 FedAvg 的显著收敛改进。在 5 个数据集上，FedProx 展现出更稳定的训练损失下降曲线。*

##### 算法伪代码

```
FedProx (Algorithm 2)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
服务器端:
  输入: w⁰, T轮, K个设备, μ (近端项系数)
  for t = 0, 1, ..., T-1:
      S_t ← 采样部分设备子集
      for 每个设备 k ∈ S_t (并行):
          发送 w^t 给设备 k
          设备 k 求解: min_w h_k(w) = F_k(w) + μ/2·||w - w^t||²
          返回 w_k^(t+1) (γ-inexact 解)
      聚合: w^(t+1) = Σ (n_k/n) · w_k^(t+1)
  return w^T

客户端 γ-inexact 条件:
  ||∇h_k(w*)|| ≤ γ · ||∇h_k(w^t)||,  γ ∈ [0, 1)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

##### 动机与背景

联邦学习面临两大核心挑战：

1. **统计异构性（Statistical Heterogeneity）**：各设备的本地数据分布不同（non-IID），导致本地目标函数 \(F_k\) 之间差异显著。FedAvg 在此场景下可能发散或收敛到次优解。

2. **系统异构性（Systems Heterogeneity）**：设备的计算能力、网络带宽差异巨大，部分设备可能掉线（stragglers）。FedAvg 要求所有设备完成固定轮次的本地 SGD，无法适应这种不均衡。

传统分布式优化方法（如 DANE、ADMM）假设数据中心化或 IID 分布，无法直接应用于联邦场景。FedAvg 虽然实用，但缺乏理论保证且在异构环境下不稳定。

##### 核心机制：近端项约束

FedProx 的核心创新是将本地子问题从：

$$\min_w F_k(w)$$

修改为：

$$\min_w h_k(w; w^t) = F_k(w) + \frac{\mu}{2}\|w - w^t\|^2$$

其中 \(w^t\) 是当前轮次的全局模型参数。

> 💡 **关键直觉**：近端项 \(\frac{\mu}{2}\|w - w^t\|^2\) 相当于一个"弹簧"，将本地更新"拉回"全局模型附近。当本地数据与全局分布偏差越大时，这个约束越重要——它防止某个设备的本地模型"跑偏"太远，从而稳定全局聚合。

**\(\mu\) 的作用**：
- \(\mu = 0\)：退化为 FedAvg，无约束
- \(\mu\) 较大：本地更新被强约束在全局模型附近，类似于只做一步梯度下降
- \(\mu\) 适中：平衡本地适应性与全局一致性

从优化角度看，当 \(F_k\) 非凸时，若 \(\mu\) 足够大，\(h_k\) 可变为凸函数（Hessian 正定），大幅改善优化景观。

##### \(\gamma\)-Inexact 求解机制

FedProx 不要求本地子问题被精确求解。定义 \(\gamma\)-inexact 解：

$$\|\nabla h_k(w^*; w^t)\| \leq \gamma \|\nabla h_k(w^t; w^t)\|, \quad \gamma \in [0, 1)$$

> 💡 **关键直觉**：\(\gamma\) 衡量本地求解的"完成度"。\(\gamma = 0\) 表示精确解，\(\gamma\) 接近 1 表示几乎没有优化。不同设备可以有不同的 \(\gamma_k^t\)，自然适应系统异构——算力强的设备多迭代（小 \(\gamma\)），算力弱或即将掉线的设备少迭代（大 \(\gamma\)）也能贡献有效更新。

这与 FedAvg 的"固定 E 轮本地 SGD"形成对比：FedAvg 中掉线设备的更新被直接丢弃，而 FedProx 中部分完成的更新仍然有效。

##### 收敛分析

收敛分析基于 **B-local dissimilarity**（Definition 3）：

$$\mathbb{E}_k[\|\nabla F_k(w)\|^2] \leq B^2 \|\nabla f(w)\|^2$$

该度量刻画了本地梯度与全局梯度的偏差程度。\(B=1\) 对应 IID 情形，\(B\) 越大异构性越强。

**Theorem 6（非凸收敛）**：在 Assumption 1（有界 dissimilarity）下，FedProx 以 \(O(1/T)\) 的速率收敛到近似驻点，收敛率与 \(B\)、\(\mu\)、\(\gamma\) 相关。具体地，更大的 \(B\)（更异构）需要更大的 \(\mu\) 来补偿。

> ⚠️ **注意**：FedAvg（\(\mu=0\)）在理论上更难分析，因为缺少近端项时本地目标可能非凸且无界，导致收敛分析需要更强的假设。

##### 与 FedAvg 的关键区别

| 特性 | FedAvg | FedProx |
|------|--------|---------|
| 本地目标 | \(F_k(w)\) | \(F_k(w) + \frac{\mu}{2}\|w-w^t\|^2\) |
| 本地求解器 | 固定为 SGD | 任意求解器 |
| 本地计算量 | 固定 E 轮 | 可变（\(\gamma\)-inexact） |
| 设备掉线处理 | 丢弃更新 | 部分更新仍有效 |
| 收敛保证 | 无（non-IID 下） | \(O(1/T)\) 非凸收敛 |

#### 🧪 练习题

```yaml
question: "FedProx 中近端项 μ/2·||w - w^t||² 的主要作用是什么？"
options:
  - "加速本地 SGD 的收敛速度"
  - "限制本地模型偏离全局模型的幅度，提升异构场景下的稳定性"
  - "减少通信轮次以降低带宽消耗"
  - "使本地损失函数变为凸函数以保证全局最优"
answer: 1
explain: "近端项约束本地更新不偏离全局模型太远，在 non-IID 数据下防止本地模型'跑偏'，从而稳定全局聚合收敛。虽然 μ 足够大时确实可使局部目标变凸，但这只是附带效果而非主要目的。"
```