### FedNova: Tackling the Objective Inconsistency Problem in Heterogeneous Federated Optimization

```yaml
标题: "Tackling the Objective Inconsistency Problem in Heterogeneous Federated Optimization"
作者: Jianyu Wang, Qinghua Liu, Hao Liang, Gauri Joshi, H. Vincent Poor
机构: Carnegie Mellon University, Princeton University
发表: NeurIPS 2020
链接: https://arxiv.org/abs/2007.07481
代码: https://github.com/JYWa/FedNova
领域: 联邦学习, 分布式优化
关键词: [联邦学习, 异构本地更新, 目标不一致性, 归一化平均, 收敛分析]
```

#### 📝 一句话总结

FedNova 发现 FedAvg 在客户端执行不同数量本地步数时会收敛到错误的目标函数（目标不一致性问题），并提出通过**归一化本地梯度**（除以各自的本地步数）再聚合的简单修正方法，从理论上消除了这一非消失误差。

#### 🎯 核心要点

| 维度 | 内容 |
|------|------|
| **解决的问题** | FedAvg 在异构本地步数（τ_i 不同）下收敛到代理目标 F̃(x) = Σ w_i F_i(x)（其中 w_i ∝ p_i·τ_i）而非真实目标 F(x) = Σ p_i F_i(x)，产生不可消除的优化偏差 |
| **核心思想** | 聚合前将每个客户端的累积本地更新 Δ_i 除以其"有效步数" ‖a_i‖₁ 进行归一化，使隐式权重 w_i 恢复为期望权重 p_i |
| **关键公式** | FedNova 更新: x^(t+1) - x^(t) = -τ_eff · Σ p_i · η · d_i，其中 d_i = Δ_i / (η·‖a_i‖₁) |
| **理论保证** | 消除 Theorem 2 中的非消失误差项 2·χ²_{p‖w}·κ²（χ² 为 p 与 w 的卡方散度，κ² 为梯度异质性） |
| **实验效果** | 非IID CIFAR-10 上比 FedAvg 提升 6-9%，比 FedProx 提升约 10% 测试准确率 |
| **额外优势** | 框架统一支持多种本地求解器（SGD/Momentum/Proximal/学习率衰减），可与方差缩减、服务器动量组合 |

#### 🔬 深入细节

##### 1. 问题示意图：目标不一致性

```
┌─────────────────────────────────────────────────────────────┐
│  真实目标: F(x) = Σ p_i F_i(x)    最优解: x* = Σ p_i e_i  │
│                                                             │
│  FedAvg实际优化的代理目标:                                    │
│  F̃(x) = Σ (p_i·τ_i / Σ p_j·τ_j) · F_i(x)                │
│                                                             │
│  收敛点: x̃* = Σ τ_i·e_i / Σ τ_i  ≠  x*                   │
│                                                             │
│  ┌───┐     ┌───┐     ┌───┐                                 │
│  │ C1│τ=1  │ C2│τ=5  │ C3│τ=10   ← 不同客户端本地步数      │
│  └───┘     └───┘     └───┘                                 │
│    ↓         ↓↓↓↓↓     ↓↓↓↓↓↓↓↓↓↓                         │
│                                                             │
│  FedAvg: 直接平均 → C2,C3 贡献被隐式放大 → 偏离 x*         │
│  FedNova: 归一化后平均 → 各客户端贡献公平 → 收敛到 x*       │
└─────────────────────────────────────────────────────────────┘
```

##### 2. 算法伪代码

```
Algorithm: FedNova (Federated Normalized Averaging)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
输入: 初始模型 x⁰, 学习率 η, 客户端权重 {p_i}, 通信轮数 T

For t = 0, 1, ..., T-1:
  服务器广播全局模型 x^(t,0) 给所有活跃客户端
  
  For each client i in parallel:
    │ 初始化本地模型: x_i ← x^(t,0)
    │ 执行 τ_i 步本地优化（SGD/Momentum/Proximal等）
    │ 计算累积更新: Δ_i = x_i - x^(t,0)
    │ 计算归一化因子: ‖a_i‖₁  （对vanilla SGD: ‖a_i‖₁ = τ_i）
    │ 上传: (Δ_i, ‖a_i‖₁) 到服务器
  
  服务器聚合:
    │ 计算归一化梯度: d_i = Δ_i / (η · ‖a_i‖₁)
    │ 计算有效步长: τ_eff = Σ p_i · ‖a_i‖₁
    │ 全局更新: x^(t+1,0) = x^(t,0) - τ_eff · η · Σ p_i · d_i
    │
    │ 等价形式 (vanilla SGD):
    │   x^(t+1,0) = x^(t,0) + (Σ p_i·τ_i) · Σ p_i · Δ_i/τ_i
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

##### 3. 方法细节解释

**为什么 FedAvg 会出错？**

当客户端 i 执行 τ_i 步本地 SGD 时，其累积更新为：
$$\Delta_i = -\eta \sum_{k=0}^{\tau_i - 1} g_i(x^{(t,k)})$$

FedAvg 直接聚合：$x^{(t+1)} = x^{(t)} + \sum_i p_i \Delta_i$

这等价于对 F̃(x) = Σ w_i F_i(x) 做优化，其中 $w_i = \frac{p_i \tau_i}{\sum_j p_j \tau_j} \neq p_i$。

执行更多本地步数的客户端被隐式赋予了更高的权重，导致全局模型偏向这些客户端的局部最优。

**FedNova 如何修正？**

核心思想极其简单：将每个客户端的累积更新除以其本地步数进行归一化：

$$d_i = \frac{\Delta_i}{\eta \cdot \tau_i} = \frac{1}{\tau_i}\sum_{k=0}^{\tau_i-1} g_i(x^{(t,k)})$$

然后按真实权重 p_i 聚合：$x^{(t+1)} = x^{(t)} - \tau_{\text{eff}} \cdot \eta \cdot \sum_i p_i \cdot d_i$

其中 $\tau_{\text{eff}} = \sum_i p_i \tau_i$ 是有效步长，保证全局更新的尺度与 FedAvg 一致。

**通用框架：**

对于一般的本地求解器，本地更新可以统一表示为：
$$\Delta_i = -\eta \cdot G_i \cdot a_i$$

其中 $G_i = [g_i^{(0)}, g_i^{(1)}, ..., g_i^{(\tau_i-1)}]$ 是梯度矩阵，$a_i$ 是权重向量：
- Vanilla SGD: $a_i = [1, 1, ..., 1]$，$\|a_i\|_1 = \tau_i$
- FedProx: $a_i = [(1-\alpha)^{\tau_i-1}, ..., (1-\alpha), 1]$，$\|a_i\|_1 = [1-(1-\alpha)^{\tau_i}]/\alpha$
- Momentum SGD: $a_i = [1-\rho^{\tau_i}, ..., 1-\rho]/(1-\rho)$

##### 4. 核心公式

**Theorem 2（收敛到真实目标的误差界）：**

$$\min_{t \in [T]} \|\nabla F(x^{(t,0)})\|^2 \leq \underbrace{2[\chi^2_{p\|w}(\beta^2-1)+1] \cdot \epsilon_{\text{opt}}}_{\text{随T增大而消失}} + \underbrace{2\chi^2_{p\|w} \cdot \kappa^2}_{\text{目标不一致性导致的非消失误差}}$$

其中：
- $\chi^2_{p\|w} = \sum_i p_i^2/w_i - 1$ 是 p 与 w 之间的卡方散度
- $\kappa^2 = \sum_i p_i \|\nabla F_i(x)\|^2 - \|\nabla F(x)\|^2$ 衡量梯度异质性
- $\epsilon_{\text{opt}}$ 是随通信轮数 T 增大而趋于零的优化误差

**FedNova 的关键性质：** 设 $w_i = p_i$ 时，$\chi^2_{p\|w} = 0$，非消失误差项完全消除！

**Lemma 1（FedAvg 的目标不一致性）：**

对于二次目标 $F_i(x) = \frac{1}{2}\|x - e_i\|^2$，FedAvg 收敛到：
$$\tilde{x}^*_{\text{FedAvg}} = \frac{\sum_i \tau_i e_i}{\sum_i \tau_i} \neq x^* = \frac{1}{m}\sum_i e_i$$

##### 5. 实验结果

| 方法 | 本地求解器 | 非IID CIFAR-10 准确率 |
|------|-----------|---------------------|
| FedAvg | SGD | ~65-70% |
| FedAvg | Momentum SGD | ~68-73% |
| FedProx | Proximal SGD | ~62-67% |
| **FedNova** | **SGD** | **~74-76%** (+6-9%) |
| **FedNova** | **Momentum SGD** | **~77-80%** (+6-9%) |
| **FedNova-Prox** | **Proximal SGD** | **~72-77%** (+10%) |
| FedNova + VR + LM | Momentum + SCAFFOLD | **~81%** (最高) |

实验设置：10个客户端，非IID划分，各客户端执行2个本地epoch（对应16-408步不等），100轮通信。

#### 🧪 练习题

**Q1（概念理解）：** 假设有3个客户端，数据权重均为 p_i = 1/3，本地步数分别为 τ₁=1, τ₂=2, τ₃=6。在 FedAvg 中，这三个客户端的隐式权重 w_i 分别是多少？FedNova 如何修正？

<details><summary>答案</summary>

FedAvg 隐式权重：$w_i = \frac{p_i \tau_i}{\sum_j p_j \tau_j} = \frac{\tau_i/3}{(1+2+6)/3} = \frac{\tau_i}{9}$

所以 w₁ = 1/9, w₂ = 2/9, w₃ = 6/9 = 2/3

客户端3虽然数据量与其他相同，但因为执行了6步本地更新，其贡献被放大了6倍！

FedNova 修正：将每个 Δ_i 除以 τ_i 归一化后再按 p_i = 1/3 聚合，确保 w_i = p_i = 1/3。

</details>

**Q2（公式推导）：** 证明对于 vanilla SGD 作为本地求解器，FedNova 的更新规则等价于 $x^{(t+1)} = x^{(t)} + (\sum_i p_i \tau_i) \cdot \sum_i p_i \cdot \Delta_i / \tau_i$。

<details><summary>答案</summary>

对于 vanilla SGD：$a_i = [1,1,...,1] \in \mathbb{R}^{\tau_i}$，所以 $\|a_i\|_1 = \tau_i$

归一化梯度：$d_i = \frac{G_i a_i}{\|a_i\|_1} = \frac{\sum_{k=0}^{\tau_i-1} g_i^{(k)}}{\tau_i} = \frac{-\Delta_i/\eta}{\tau_i} = \frac{-\Delta_i}{\eta \tau_i}$

有效步长：$\tau_{\text{eff}} = \sum_i p_i \|a_i\|_1 = \sum_i p_i \tau_i$

FedNova 更新：
$$x^{(t+1)} - x^{(t)} = -\tau_{\text{eff}} \cdot \eta \cdot \sum_i p_i \cdot d_i = -(\sum_i p_i \tau_i) \cdot \eta \cdot \sum_i p_i \cdot \frac{-\Delta_i}{\eta \tau_i} = (\sum_i p_i \tau_i) \cdot \sum_i \frac{p_i \Delta_i}{\tau_i}$$

</details>

**Q3（深入思考）：** FedNova 需要客户端额外上传什么信息？这对通信开销有何影响？如果客户端的本地步数是随机的（如受设备性能波动影响），FedNova 是否仍然有效？

<details><summary>答案</summary>

1. **额外通信**：客户端只需额外上传一个标量 ‖a_i‖₁（对 vanilla SGD 就是 τ_i），通信开销增加可忽略不计（一个标量 vs 整个模型参数）。

2. **随机本地步数**：FedNova 完全支持！论文 Figure 2 右图展示了 τ_i 为随机变量时，FedAvg 和 VRLSGD 可能发散，而 FedNova 仍然稳定收敛。这是因为 FedNova 的归一化是逐轮进行的，每轮使用当前实际的 τ_i^(t) 值，无需预先知道。

3. **理论保证**：Theorem 2 中 χ²_{p‖w} = 0 的条件只要求每轮聚合时 w_i = p_i，这通过归一化自动满足，与 τ_i 是否随机无关。

</details>