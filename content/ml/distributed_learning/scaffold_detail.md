### SCAFFOLD

```yaml
id: scaffold
name: SCAFFOLD
full_name: 随机控制平均 (Stochastic Controlled Averaging for Federated Learning)
year: 2020
org: EPFL
paper_url: https://arxiv.org/abs/1910.06378
category: foundation
parent: —
motivation: 用控制变量校正客户漂移，解决联邦学习中数据异构性问题
```

#### 📝 一句话总结

SCAFFOLD 引入控制变量（control variates）校正联邦学习中因数据异构导致的客户漂移（client-drift），使收敛速率不再依赖数据异构程度，在通信效率上显著优于 FedAvg。

#### 🎯 核心要点

- 首次严格证明 FedAvg 在异构数据下存在不可消除的收敛偏差项 \(B^2/\mu\)，该偏差源于客户漂移
- 提出 SCAFFOLD 算法：为每个客户端和服务器维护控制变量 \(\boldsymbol{c}_i\) 和 \(\boldsymbol{c}\)，用于校正本地梯度方向
- 收敛速率完全不依赖梯度异构性 \(G\)，仅依赖随机噪声 \(\sigma^2\) 和平滑常数 \(\beta\)
- 两种控制变量更新策略：Option I（额外全梯度计算）和 Option II（利用已有梯度，无额外开销）
- 支持部分客户参与（partial participation）：每轮仅采样 \(S\) 个客户
- 在二次函数上证明 local steps 的加速效果依赖于 Hessian 相似度 \(\delta\)
- 实验在 EMNIST 上验证：SCAFFOLD 在凸和非凸设置下均一致优于 FedAvg、FedProx 和 SGD

#### 🔬 深入细节

##### 核心示意图

![Client-drift 示意图](https://ar5iv.labs.arxiv.org/html/1910.06378/assets/x1.png)
*图1：FedAvg 中的客户漂移现象。两个客户端（N=2, K=3）的本地更新分别收敛到各自局部最优 \(\boldsymbol{x}_1^\star\) 和 \(\boldsymbol{x}_2^\star\)，而非全局最优 \(\boldsymbol{x}^\star\)。*

![SCAFFOLD 校正机制](https://ar5iv.labs.arxiv.org/html/1910.06378/assets/x2.png)
*图2：SCAFFOLD 在单个客户端上的更新步骤。本地梯度（黑色虚线）指向局部最优，但校正项 \((\boldsymbol{c} - \boldsymbol{c}_i)\)（红色）确保更新方向朝向全局最优。*

![实验对比](https://ar5iv.labs.arxiv.org/html/1910.06378/assets/x3.png)
*图3：模拟数据上 SGD、FedAvg 和 SCAFFOLD 的对比。FedAvg 随 local steps 增加而变慢，SCAFFOLD 则持续加速且不受异构性 G 影响。*

##### 算法伪代码

```python
# SCAFFOLD 算法核心流程
# 初始化
x = x_0                    # 服务器模型
c = 0                      # 服务器控制变量
c_i = 0 for all i in [N]   # 客户端控制变量

for round r in range(R):
    # 服务器采样客户子集
    S = sample(clients, size=S)
    
    for client i in S (parallel):
        # 接收服务器参数
        y_i = x
        
        # 本地更新 K 步（核心：加入控制变量校正）
        for k in range(K):
            g_i = stochastic_gradient(y_i, local_data_i)
            y_i = y_i - eta_l * (g_i + c - c_i)  # 校正梯度方向
        
        # 更新本地控制变量（Option II，无额外开销）
        c_i_new = c_i - c + (1 / (K * eta_l)) * (x - y_i)
        
        # 发送更新给服务器
        send(delta_x = y_i - x, delta_c = c_i_new - c_i)
        c_i = c_i_new
    
    # 服务器聚合
    x = x + (eta_g / |S|) * sum(delta_x for i in S)
    c = c + (1 / N) * sum(delta_c for i in S)
```

##### 动机与背景：客户漂移问题

联邦学习的核心优化目标为：

$$f(\boldsymbol{x}) = \frac{1}{N}\sum_{i=1}^{N} f_i(\boldsymbol{x})$$

其中 \(f_i\) 是第 \(i\) 个客户端的本地目标函数。FedAvg 让每个客户端执行 \(K\) 步本地 SGD 后聚合，以减少通信轮次。

**问题核心**：当各客户端数据分布不同（non-iid）时，本地更新会使各客户端模型漂移向各自的局部最优 \(\boldsymbol{x}_i^\star\)，而非全局最优 \(\boldsymbol{x}^\star\)。论文严格证明了 FedAvg 的收敛上界包含不可消除项：

$$R_{\text{FedAvg}} = \mathcal{O}\left(\frac{\sigma^2}{\mu K S \epsilon} + \frac{B^2}{\mu}\right)$$

其中 \(B^2 = \frac{1}{N}\sum_i \|\nabla f_i(\boldsymbol{x}^\star)\|^2\) 度量数据异构程度。即使通信轮次 \(R \to \infty\)，FedAvg 也无法收敛到精确解。

> 💡 关键：客户漂移的根源在于本地梯度 \(\nabla f_i(\boldsymbol{x})\) 不是全局梯度 \(\nabla f(\boldsymbol{x})\) 的无偏估计——它们有系统性偏差。

##### 核心机制：控制变量校正

SCAFFOLD 的核心思想借鉴了方差缩减（variance reduction）技术中的控制变量方法。

**理想更新**：如果通信不受限，每步理想更新应为：

$$\boldsymbol{y}_i \leftarrow \boldsymbol{y}_i - \eta_l \cdot \frac{1}{N}\sum_{j=1}^{N} g_j(\boldsymbol{y}_i)$$

这等价于在 iid 数据上运行 FedAvg。但这需要每步都与所有客户端通信。

**SCAFFOLD 的近似**：维护控制变量使得 \(\boldsymbol{c}_j \approx \nabla f_j(\boldsymbol{y}_i)\)，\(\boldsymbol{c} \approx \frac{1}{N}\sum_j \nabla f_j(\boldsymbol{y}_i)\)。则本地更新变为：

$$\boldsymbol{y}_i \leftarrow \boldsymbol{y}_i - \eta_l\left(g_i(\boldsymbol{y}_i) - \boldsymbol{c}_i + \boldsymbol{c}\right)$$

此时校正后的梯度估计为：

$$g_i(\boldsymbol{y}_i) - \boldsymbol{c}_i + \boldsymbol{c} \approx g_i(\boldsymbol{y}_i) - \nabla f_i(\boldsymbol{y}_i) + \frac{1}{N}\sum_j \nabla f_j(\boldsymbol{y}_i) \approx \frac{1}{N}\sum_j g_j(\boldsymbol{y}_i)$$

> 💡 关键：控制变量 \((\boldsymbol{c} - \boldsymbol{c}_i)\) 作为校正项，消除了本地梯度的系统性偏差，使得本地更新方向始终指向全局最优。

**控制变量更新**有两种方案：
- **Option I**：\(\boldsymbol{c}_i^+ = \nabla f_i(\boldsymbol{x})\)，需额外一次全数据梯度计算，更稳定
- **Option II**：\(\boldsymbol{c}_i^+ = \boldsymbol{c}_i - \boldsymbol{c} + \frac{1}{K\eta_l}(\boldsymbol{x} - \boldsymbol{y}_i)\)，利用已有计算结果推导，无额外开销

Option II 的直觉：\(\frac{1}{K\eta_l}(\boldsymbol{x} - \boldsymbol{y}_i)\) 实际上是 \(K\) 步本地更新中使用的校正梯度的平均值。

##### 收敛理论：消除异构性依赖

SCAFFOLD 的收敛定理（Theorem III）表明，对于 \(\mu\)-强凸函数：

$$R_{\text{SCAFFOLD}} = \tilde{\mathcal{O}}\left(\frac{\sigma^2}{\mu K S \epsilon} + \frac{\beta}{\mu} + \frac{N}{S}\right)$$

**关键对比**：
| 指标 | FedAvg | SCAFFOLD |
|------|--------|----------|
| 异构性依赖 | \(B^2/\mu\)（不可消除） | **无** |
| 噪声项 | \(\sigma^2/(\mu KS\epsilon)\) | \(\sigma^2/(\mu KS\epsilon)\) |
| 通信下界 | \(\beta/\mu + B^2/\mu\) | \(\beta/\mu + N/S\) |
| local steps 加速 | 仅在 iid 时有效 | 始终有效 |

> ⚠️ 注意：SCAFFOLD 的 \(N/S\) 项来自部分参与的方差，当所有客户参与（\(S=N\)）时消失。\(\beta/\mu\) 项是条件数的固有下界。

##### 双步长机制

论文引入全局步长 \(\eta_g\) 和本地步长 \(\eta_l\) 的分离设计：
- \(\eta_g = \sqrt{S}\)：较大的全局步长确保聚合后有足够进展
- \(\eta_l \leq \frac{1}{81\beta K \eta_g}\)：较小的本地步长控制漂移

这种设计使得即使 FedAvg 也能获得改进的收敛率（相比之前的分析），但仍无法消除异构性偏差。

##### 与相关方法的对比

- **FedProx**（Li et al., 2018）：添加近端正则项 \(\frac{\mu}{2}\|\boldsymbol{x} - \boldsymbol{y}_i\|^2\)，理论复杂度与 FedAvg 相同（\(B^2/\mu\)），无本质改进
- **DANE**（Shamir et al., 2014）：在二次函数上需要 \((\delta/\mu)^2\) 轮，SCAFFOLD 仅需 \(\delta/\mu\) 轮
- **SGD**（单步通信）：SCAFFOLD 通过 local steps 实现线性加速，当 \(\delta=0\) 时 \(K\) 步等价于 \(K\) 倍加速

#### 🧪 练习题

```yaml
question: "SCAFFOLD 算法中控制变量 (c - c_i) 的核心作用是什么？"
options:
  - "减小本地 SGD 的随机噪声方差"
  - "校正本地梯度的系统性偏差，使更新方向指向全局最优"
  - "限制本地模型参数的更新幅度，防止过拟合"
  - "加速服务器端的模型聚合过程"
answer: 1
explain: "控制变量 (c - c_i) ≈ (1/N)∑∇f_j - ∇f_i，补偿了本地梯度与全局梯度之间的系统性差异（客户漂移），而非随机噪声。"
```