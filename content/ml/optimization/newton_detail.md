### 牛顿法 (Newton's Method)

```yaml
id: newton
name: Newton's Method
full_name: 牛顿法 (Newton's Method)
year: '1740'
org: Newton/Simpson
paper_url: https://en.wikipedia.org/wiki/Newton%27s_method_in_optimization
category: convex
parent: —
motivation: 利用Hessian矩阵实现局部二次收敛
```

#### 📝 一句话总结

牛顿法通过构造目标函数的二阶泰勒近似并求解其极值点来迭代更新参数，利用 Hessian 矩阵的曲率信息实现局部二次收敛速度，是所有二阶优化方法的理论基石。

#### 🎯 核心要点

- 二阶优化方法：利用梯度（一阶）和 Hessian 矩阵（二阶）信息确定搜索方向
- 迭代公式：\(x_{k+1} = x_k - [H(x_k)]^{-1} \nabla f(x_k)\)，其中 \(H\) 为 Hessian 矩阵
- 局部二次收敛：在最优解附近满足条件时，误差以平方速度衰减
- 几何直觉：每步用二次曲面拟合目标函数，直接跳到该曲面的极值点
- 对二次函数精确求解：若目标函数恰好是二次函数，一步即可到达最优解
- 核心限制：需要 Hessian 正定且可逆；计算/存储 Hessian 代价为 \(O(d^2)\) 空间和 \(O(d^3)\) 求逆时间
- 衍生方法：拟牛顿法（BFGS/L-BFGS）、Gauss-Newton、Levenberg-Marquardt、信赖域方法

#### 🔬 深入细节

![牛顿法与梯度下降对比示意图](https://upload.wikimedia.org/wikipedia/commons/d/da/Newton_optimization_vs_grad_descent.svg)
*图：梯度下降（绿色）与牛顿法（红色）的优化路径对比。牛顿法利用曲率信息，以更直接的路径趋近最优解。*

```python
# Newton's Method 优化伪代码
import numpy as np

def newton_method(f, grad_f, hessian_f, x0, tol=1e-8, max_iter=100):
    """
    f: 目标函数
    grad_f: 梯度函数 ∇f(x) → R^d
    hessian_f: Hessian函数 H(x) → R^{d×d}
    x0: 初始点
    """
    x = x0
    for k in range(max_iter):
        g = grad_f(x)           # 计算梯度
        H = hessian_f(x)        # 计算Hessian矩阵
        
        # 求解牛顿方程: H @ delta_x = -g
        delta_x = np.linalg.solve(H, -g)  # 牛顿方向
        
        x = x + delta_x         # 更新参数
        
        if np.linalg.norm(g) < tol:
            break
    return x
```

**动机与背景**

在优化问题中，一阶方法（如梯度下降）仅利用目标函数的梯度信息来确定下降方向。梯度下降的更新公式为 \(x_{k+1} = x_k - \alpha \nabla f(x_k)\)，其中步长 \(\alpha\) 需要精心调节。一阶方法的根本缺陷在于：它忽略了目标函数的**曲率信息**——在曲率大的方向上步长应该小，曲率小的方向上步长可以大。这导致梯度下降在病态问题（条件数大）上收敛极慢，呈现"之字形"震荡。

牛顿法的核心动机是：**利用二阶导数（Hessian矩阵）提供的曲率信息，自适应地调整每个方向上的步长**，从而实现远超一阶方法的收敛速度。

**核心机制：二阶泰勒展开与迭代求解**

牛顿法的推导基于目标函数 \(f(x)\) 在当前迭代点 \(x_k\) 处的二阶泰勒展开：

$$f(x_k + \Delta x) \approx f(x_k) + \nabla f(x_k)^\top \Delta x + \frac{1}{2} \Delta x^\top H(x_k) \Delta x$$

其中 \(H(x_k) = \nabla^2 f(x_k)\) 是 Hessian 矩阵。为了最小化这个二次近似，对 \(\Delta x\) 求导并令其为零：

$$\nabla f(x_k) + H(x_k) \Delta x = 0$$

求解得到**牛顿方向**：

$$\Delta x = -[H(x_k)]^{-1} \nabla f(x_k)$$

因此牛顿法的迭代公式为：

$$x_{k+1} = x_k - [H(x_k)]^{-1} \nabla f(x_k)$$

> 💡 关键直觉：牛顿法相当于在每一步用一个二次曲面（抛物面）去拟合目标函数，然后直接跳到该二次曲面的极值点。如果目标函数本身就是二次的，牛顿法一步到位。

**收敛性分析**

在满足以下条件时，牛顿法具有**局部二次收敛**性质：
1. \(f\) 二阶连续可微
2. Hessian 在最优解 \(x^*\) 处正定
3. Hessian 满足 Lipschitz 连续条件

此时存在 \(x^*\) 的邻域，使得从该邻域内任意初始点出发，迭代满足：

$$\|x_{k+1} - x^*\| \leq C \|x_k - x^*\|^2$$

这意味着有效数字位数每步翻倍。例如，若当前误差为 \(10^{-4}\)，下一步误差约为 \(10^{-8}\)，再下一步约为 \(10^{-16}\)。

> ⚠️ 注意：二次收敛仅在局部成立。远离最优解时，牛顿法可能发散、震荡或收敛到鞍点。实际使用中通常结合**线搜索**（line search）或**信赖域**（trust region）策略来保证全局收敛性。

**一维情形的特殊形式**

对于一元函数 \(f: \mathbb{R} \to \mathbb{R}\)，Hessian 退化为二阶导数标量 \(f''(x)\)，迭代公式简化为：

$$x_{k+1} = x_k - \frac{f'(x_k)}{f''(x_k)}$$

这本质上是对导数 \(f'(x)\) 应用牛顿求根法，寻找 \(f'(x) = 0\) 的解（即驻点）。

**与梯度下降的本质区别**

| 特性 | 梯度下降 | 牛顿法 |
|------|---------|--------|
| 使用信息 | 一阶（梯度） | 二阶（梯度 + Hessian） |
| 收敛速度 | 线性收敛 | 二次收敛（局部） |
| 步长选择 | 需手动设定学习率 \(\alpha\) | 自适应（由 Hessian 决定） |
| 每步计算量 | \(O(d)\) | \(O(d^3)\)（求解线性系统） |
| 存储需求 | \(O(d)\) | \(O(d^2)\)（存储 Hessian） |
| 对条件数敏感性 | 高（收敛率 \(\propto \kappa\)） | 低（仿射不变） |

牛顿法的一个重要性质是**仿射不变性**：对变量做线性变换 \(x = Ay\) 后，牛顿法在新坐标下的迭代轨迹与原坐标完全等价，而梯度下降则会因坐标变换而改变行为。

**实际应用中的关键问题与改进**

1. **Hessian 非正定**：当 Hessian 不正定时，牛顿方向可能不是下降方向，甚至指向鞍点。解决方案包括：
   - 修正 Hessian：添加正则项 \(H + \mu I\)（类似 Levenberg-Marquardt）
   - 对角化后将负特征值取绝对值或设为正数 \(\epsilon\)
   - 使用信赖域方法约束步长

2. **计算代价过高**：对于 \(d\) 维问题，精确计算和求逆 Hessian 需要 \(O(d^2)\) 存储和 \(O(d^3)\) 计算。改进方案：
   - **拟牛顿法**（Quasi-Newton）：用梯度差分近似 Hessian 或其逆（BFGS、L-BFGS）
   - **截断牛顿法**：用共轭梯度法近似求解牛顿方程，无需显式构造 Hessian
   - **Hessian-free 方法**：仅需 Hessian-向量积 \(Hv\)，可通过自动微分高效计算

3. **全局收敛保障**：
   - **带回溯线搜索的牛顿法**：沿牛顿方向做 Armijo 线搜索
   - **信赖域牛顿法**：在信赖域半径内求解约束二次子问题

#### 🧪 练习题

```yaml
question: "牛顿法相比梯度下降的核心优势来源于什么？"
options:
  - "使用更小的学习率避免震荡"
  - "利用Hessian矩阵的曲率信息自适应调整各方向步长"
  - "通过动量项加速收敛"
  - "使用随机采样减少计算量"
answer: 1
explain: "牛顿法的核心优势在于利用二阶导数（Hessian矩阵）提供的曲率信息，在曲率大的方向取小步、曲率小的方向取大步，从而实现自适应的最优步长选择和局部二次收敛。"
```