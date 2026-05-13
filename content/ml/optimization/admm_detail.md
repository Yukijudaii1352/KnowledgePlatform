### ADMM (交替方向乘子法)

```yaml
id: admm
name: ADMM
full_name: 交替方向乘子法 (Alternating Direction Method of Multipliers)
year: "2011"
org: Stanford University
paper_url: https://web.stanford.edu/~boyd/papers/pdf/admm_distr_stats.pdf
category: foundation
parent: "—"
motivation: 将大规模优化问题分解为可并行求解的子问题，融合对偶分解的可分解性与增广拉格朗日法的优越收敛性，支持分布式
```

#### 📝 一句话总结

ADMM 将增广拉格朗日法与对偶分解相结合，通过交替优化分裂变量实现大规模凸优化问题的可分解求解，天然支持分布式/并行计算，是现代大规模机器学习与信号处理中的核心优化框架。

#### 🎯 核心要点

- 标准问题形式：\(\min f(x) + g(z) \;\text{s.t.}\; Ax + Bz = c\)，将目标拆分为两个可独立处理的部分
- 三步迭代：x-update → z-update → 对偶变量 y-update，每步仅需求解一个子问题
- Scaled Form 简化：引入缩放对偶变量 \(u = (1/\rho)y\)，将线性项与二次项合并，简化实现
- 收敛性保证：仅需 \(f, g\) 为闭凸 proper 函数、增广拉格朗日有鞍点即可保证收敛
- 停止准则：基于原始残差 \(r^k = Ax^{k} + Bz^{k} - c\) 和对偶残差 \(s^k = \rho A^T B(z^k - z^{k-1})\)
- Consensus ADMM：将全局变量共识问题分布到 N 个处理器，每个处理器仅处理局部目标函数
- 支持正则化共识：中心节点可附加 \(g(z)\)（如 \(\ell_1\) 正则），实现分布式稀疏优化
- 罚参数 \(\rho\) 选择与自适应调整策略影响收敛速度

#### 🔬 深入细节

##### 示意图

![ADMM 迭代示意](https://stanford.edu/~boyd/papers/admm/admm_iter.png)
*图：ADMM 将原问题通过变量分裂转化为交替优化两个子问题，并通过对偶变量更新协调一致性。*

> 💡 注：由于原论文为纯数学推导型综述，无单一架构图。上述示意图为概念性描述，核心逻辑见下方算法伪代码。

##### 算法伪代码

```python
# ADMM 标准迭代 (Scaled Form)
# 问题: min f(x) + g(z)  s.t. Ax + Bz = c
# 参数: rho > 0 (罚参数), eps_pri, eps_dual (停止阈值)

u = zeros(m)  # 缩放对偶变量初始化
x, z = initialize()

for k in range(max_iter):
    # Step 1: x-update (最小化关于x的增广拉格朗日)
    x = argmin_x { f(x) + (rho/2) * ||Ax + Bz - c + u||_2^2 }
    
    # Step 2: z-update (最小化关于z的增广拉格朗日)
    z = argmin_z { g(z) + (rho/2) * ||Ax + Bz - c + u||_2^2 }
    
    # Step 3: 对偶变量更新
    u = u + (Ax + Bz - c)
    
    # 停止准则检查
    r = Ax + Bz - c                    # 原始残差
    s = rho * A.T @ B @ (z - z_prev)   # 对偶残差
    if norm(r) < eps_pri and norm(s) < eps_dual:
        break
```

```python
# Consensus ADMM (分布式版本)
# 问题: min sum_{i=1}^N f_i(x)
# 分布到 N 个处理器

x_local = [zeros(n) for _ in range(N)]  # 局部变量
y = [zeros(n) for _ in range(N)]         # 对偶变量

for k in range(max_iter):
    # 并行: 各处理器独立求解局部子问题
    for i in range(N):  # 可并行
        x_local[i] = argmin_xi { f_i(xi) + y[i].T @ (xi - x_bar) 
                                  + (rho/2) * ||xi - x_bar||^2 }
    
    # 中心节点: 计算全局平均
    x_bar = mean(x_local)
    
    # 并行: 更新对偶变量
    for i in range(N):  # 可并行
        y[i] = y[i] + rho * (x_local[i] - x_bar)
```

##### 动机与背景

大规模优化问题在机器学习、统计学习和信号处理中无处不在。传统方法面临两大困境：

1. **对偶分解法**（Dual Decomposition）虽然能将问题分解为独立子问题实现并行，但收敛条件严格（要求 \(f\) 严格凸），且收敛速度慢；
2. **增广拉格朗日法**（Method of Multipliers）通过添加二次罚项 \((\rho/2)\|Ax+Bz-c\|^2\) 改善收敛性，但破坏了问题的可分解结构。

ADMM 巧妙地融合了两者优势：保留增广拉格朗日的二次罚项以获得良好收敛性，同时通过**交替优化**（而非联合优化）恢复可分解性。

##### 核心机制详解

**标准形式与增广拉格朗日：**

ADMM 处理的标准问题为：

$$\min_{x,z} \; f(x) + g(z) \quad \text{s.t.} \quad Ax + Bz = c$$

其增广拉格朗日函数为：

$$L_\rho(x, z, y) = f(x) + g(z) + y^T(Ax + Bz - c) + \frac{\rho}{2}\|Ax + Bz - c\|_2^2$$

与标准增广拉格朗日法对 \((x,z)\) 联合最小化不同，ADMM **交替**对 \(x\) 和 \(z\) 分别最小化：

$$x^{k+1} := \arg\min_x \left[ f(x) + \frac{\rho}{2}\left\|Ax + Bz^k - c + u^k\right\|_2^2 \right]$$

$$z^{k+1} := \arg\min_z \left[ g(z) + \frac{\rho}{2}\left\|Ax^{k+1} + Bz - c + u^k\right\|_2^2 \right]$$

$$u^{k+1} := u^k + Ax^{k+1} + Bz^{k+1} - c$$

> 💡 关键：Scaled Form 通过令 \(u = (1/\rho)y\) 将线性项 \(y^T(\cdot)\) 吸收进二次项，使得每步更新仅涉及一个二次正则化的近端算子（proximal operator）。

**收敛性条件：**

ADMM 的收敛性在以下温和条件下成立：
- \(f\) 和 \(g\) 为闭的、proper 的凸函数
- 增广拉格朗日 \(L_0\) 存在鞍点

在此条件下：
1. 原始残差 \(r^k \to 0\)（可行性）
2. 对偶残差 \(s^k \to 0\)（最优性）  
3. 目标函数值 \(f(x^k) + g(z^k) \to p^*\)（最优值）

> ⚠️ 注意：ADMM 不要求 \(f\) 或 \(g\) 可微，也不要求严格凸，这使其适用于含 \(\ell_1\) 范数等非光滑正则项的问题。

**停止准则设计：**

实际使用中，通过原始残差和对偶残差的范数判断收敛：

$$\|r^k\|_2 \leq \epsilon^{\text{pri}}, \quad \|s^k\|_2 \leq \epsilon^{\text{dual}}$$

其中容差采用绝对+相对混合策略：

$$\epsilon^{\text{pri}} = \sqrt{p}\,\epsilon^{\text{abs}} + \epsilon^{\text{rel}} \max\{\|Ax^k\|, \|Bz^k\|, \|c\|\}$$

$$\epsilon^{\text{dual}} = \sqrt{n}\,\epsilon^{\text{abs}} + \epsilon^{\text{rel}} \|A^T y^k\|$$

##### 分布式共识优化

ADMM 最强大的应用之一是**分布式共识优化**。考虑目标函数可分解为 N 个局部项：

$$\min_x \sum_{i=1}^N f_i(x)$$

通过引入局部变量 \(x_i\) 和全局共识变量 \(z\)，重写为：

$$\min \sum_{i=1}^N f_i(x_i) \quad \text{s.t.} \quad x_i = z, \; i=1,\ldots,N$$

ADMM 迭代简化为：
- **各处理器并行**：求解 \(x_i^{k+1} = \arg\min_{x_i}\{f_i(x_i) + (y_i^k)^T(x_i - \bar{x}^k) + (\rho/2)\|x_i - \bar{x}^k\|^2\}\)
- **中心节点聚合**：\(z^{k+1} = \bar{x}^{k+1}\)（简单平均）
- **对偶更新**：\(y_i^{k+1} = y_i^k + \rho(x_i^{k+1} - \bar{x}^{k+1})\)

> 💡 关键：对偶变量 \(y_i\) 的平均值在第一次迭代后恒为零，因此 \(z^{k+1}\) 就是局部变量的简单平均。通信开销仅为每轮广播一次全局平均值。

**带正则化的共识：** 当中心节点附加正则项 \(g(z)\)（如 \(\lambda\|z\|_1\)）时，z-update 变为近端算子：

$$z^{k+1} = \text{prox}_{g/N\rho}\left(\bar{x}^{k+1} + (1/\rho)\bar{y}^k\right)$$

对于 \(\ell_1\) 正则，这就是软阈值操作 \(S_{\lambda/N\rho}(\cdot)\)。

##### 与传统方法的对比

| 方法 | 可分解性 | 收敛性 | 适用范围 |
|------|---------|--------|---------|
| 梯度下降 | ❌ 不可分解 | 需光滑+凸 | 光滑问题 |
| 对偶分解 | ✅ 完全并行 | 需严格凸，慢 | 严格凸问题 |
| 增广拉格朗日 | ❌ 联合优化 | 快，条件温和 | 一般凸问题 |
| **ADMM** | ✅ 交替分解 | 快，条件温和 | **一般凸+非光滑** |

ADMM 的独特优势在于：以极温和的条件（闭凸 proper）获得可靠收敛，同时保持完全的可分解/可并行结构。

##### 罚参数选择

罚参数 \(\rho\) 的选择对收敛速度有显著影响：
- \(\rho\) 过大：原始残差收敛快但对偶残差慢
- \(\rho\) 过小：对偶残差收敛快但原始残差慢

自适应策略（Varying Penalty）：

$$\rho^{k+1} = \begin{cases} \tau\rho^k & \text{if } \|r^k\| > \mu\|s^k\| \\ \rho^k/\tau & \text{if } \|s^k\| > \mu\|r^k\| \\ \rho^k & \text{otherwise} \end{cases}$$

典型参数：\(\mu = 10, \tau = 2\)。

#### 🧪 练习题

```yaml
question: "ADMM 相比标准增广拉格朗日法的核心改进是什么？"
options:
  - "使用更大的罚参数 ρ 加速收敛"
  - "对 x 和 z 交替最小化而非联合最小化，恢复可分解性"
  - "去掉了二次罚项以简化计算"
  - "要求目标函数必须光滑可微"
answer: 1
explain: "ADMM 保留增广拉格朗日的二次罚项保证收敛，但将联合最小化改为交替最小化，使得每步子问题可独立求解，从而恢复了对偶分解的可分解/可并行特性。"
```