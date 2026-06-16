### Frozen-PINN — 无梯度训练物理信息神经网络 (Fast training without gradient descent)

```yaml
id: frozen_pinn
name: Frozen-PINN
full_name: 无梯度训练物理信息神经网络 (Fast training without gradient descent)
year: '2026'
org: TUM
paper_url: https://arxiv.org/abs/2405.20836
category: pinn_family
parent: pinn
motivation: 无梯度训练加速46-2945倍
```

#### 📝 一句话总结

Frozen-PINN 将时间依赖 PDE 的解表示为空间随机基函数与时间系数的组合，冻结隐藏层空间参数后用最小二乘和自适应 ODE 求解器推进输出层系数，从根源上绕开传统 PINN 的高维非凸梯度下降训练。

#### 🎯 核心要点

- **空间-时间分离**：用冻结的空间基 \(\phi_i(x)\) 和随时间变化的输出系数 \(c_i(t)\) 表示解
- **无梯度训练**：隐藏层参数由 ELM 或 SWIM 采样得到，不通过反向传播优化
- **时间因果性内置**：把 PDE 代入 ansatz 后得到关于 \(C(t)\) 的 ODE，用 RK45/LSODA 等求解器顺序推进
- **损失解耦**：初值用最小二乘求 \(C(0)\)，边界条件通过边界兼容层或增强 ODE 处理，PDE 残差由 ODE 推进吸收
- **SVD 压缩层**：对基函数矩阵截断 SVD，降低 ODE 维度与刚性，论文报告最高可减少 20 倍维度、最高 75 倍加速
- **采样策略两类**：ELM 随机采样、SWIM 基于数据点对采样，后者能把陡峭基函数放到冲击或高梯度区域附近
- **广泛基准**：覆盖线性对流、Euler-Bernoulli、Wave、Burgers、非线性扩散、反应扩散、Kuramoto-Sivashinsky 和高维扩散等九类 PDE

#### 🔬 深入细节

##### 核心架构示意

![Frozen-PINN 核心思想](https://arxiv.org/html/2405.20836v3/x1.png)
*图：Frozen-PINN 的两条核心思路：冻结空间基函数并演化输出层时间系数；将 PDE、边界和初值损失尽量分开处理。*

![Frozen-PINN 完整训练架构](https://arxiv.org/html/2405.20836v3/x4.png)
*图：Frozen-PINN 无梯度训练流水线，包括随机/数据依赖基函数采样、边界兼容层、SVD 层、最小二乘初值和 ODE 求解。*

##### 算法伪代码

```python
# Frozen-PINN 训练伪代码
# 输入: PDE 算子 L/N, 初值 u0, 边界条件, collocation points X
# 输出: 测试网格上的 PDE 解 u_hat(x, t)

X = sample_collocation_points(domain)

# 1. 构造并冻结空间基函数
if sampler == "ELM":
    W, b = sample_random_features()
else:  # SWIM
    W, b = sample_features_from_point_pairs(X)
Phi = activation(W @ X.T + b)                 # [M, Nc]

# 2. 处理边界条件
A = build_boundary_compliant_layer(Phi, boundary_condition)
Phi_A = concat(A @ Phi, ones_row)

# 3. SVD 压缩，降低 ODE 系统维度
V_r, S_r, U_r = truncated_svd(A @ Phi, threshold=eps_svd)
A_r = V_r.T @ A
Phi_r = concat(A_r @ Phi, ones_row)

# 4. 初值最小二乘，不做梯度下降
C0 = u0(X).T @ pinv(Phi_r)

# 5. 将 PDE 转成关于 C(t) 的 ODE 并推进
def rhs(t, C):
    R = -C @ L(Phi_r) - gamma * N(C @ Phi_r) + f(X).T
    return R @ pinv(Phi_r)

C_t = ode_solve(rhs, C0, t_span, method="RK45_or_LSODA")

# 6. 查询任意时刻的解
u_hat = lambda x, t: C_t(t) @ Phi_r(x)
```

##### 核心公式

Frozen-PINN 先用单隐层随机特征表示时间依赖解：

$$
\hat{u}(x,t)=\sum_{i=1}^{M}c_i(t)\sigma(w_i\cdot x+b_i)+c_0(t)
=C(t)[\Phi(x),\mathbbm{1}]
$$

其中 \(w_i,b_i\) 是空间相关参数，采样后冻结；真正随时间变化的是输出层系数 \(C(t)\)。这与传统 PINN 把 \((x,t)\) 一起输入神经网络并对所有参数做梯度下降完全不同。

把 ansatz 代入一般时间依赖 PDE，可得到关于 \(C(t)\) 的 ODE。论文给出的核心形式是：

$$
C_t(t)=R(X,C(t))[\Phi(X),\mathbbm{1}]^{+}
$$

$$
R(X,C(t))=
-C(t)\mathcal{L}[\Phi(X),\mathbbm{1}]
-\gamma\mathcal{N}(C(t)[\Phi(X),\mathbbm{1}])
+[f(X)]^\top
$$

这里 \((\cdot)^+\) 是伪逆，\(\mathcal{L}\) 是线性空间微分算子，\(\mathcal{N}\) 是非线性项，\(f\) 是外力或源项。初值通过最小二乘直接给出：

$$
C(0)=u(X,0)^\top[\Phi(X),\mathbbm{1}]^+
$$

> 💡 关键：传统 PINN 在整个时空域上最小化残差；Frozen-PINN 把时间方向变成 ODE 初值问题，因此天然按时间推进，避免非因果的全局时空拟合。

##### 边界条件与 SVD 层

Frozen-PINN 提供两种边界处理方式。第一种是边界兼容层：构造线性映射 \(A\)，令

$$
\Phi_A=[A\Phi,\mathbbm{1}]
$$

从而把边界条件编码进基函数空间。此时 ODE 改写为：

$$
C_t(t)=R(X,C(t))\Phi_A(X)^+
$$

第二种是增强 ODE：当无法方便构造边界兼容层时，在 ODE 右端加入边界纠偏项，让边界点 \(X_b\) 上的预测以速率 \(\kappa(\hat{u}-g)\) 被拉回给定边界值 \(g\)。论文默认 \(\kappa=10^5\)，并讨论它对边界误差和求解时间的影响。

SVD 层用于降低数值刚性。对 \(A\Phi(X)\) 做截断分解：

$$
V_r\Sigma_rU_r^\top=A\Phi(X)+O(\Sigma_{r+1}),\qquad
A_r=V_r^\top A
$$

然后用 \(A_r\Phi(X)\) 替换原始基函数矩阵。这样得到的数据基近似正交，伪逆更稳定，ODE 系统维度也更小。

##### ELM 与 SWIM 采样

ELM 是数据无关的随机特征方法，直接从高斯/均匀分布采样 \(w_i,b_i\)。它实现简单，但不能主动把基函数放到解变化剧烈的区域。

SWIM 是数据依赖采样策略：用两个 collocation 点构造一对权重和偏置，使激活函数的变化方向与点对方向对齐。对于 Burgers 冲击、强对流或局部高梯度问题，SWIM 能在关键区域放置更陡峭的基函数，减少无效随机特征。

##### 与传统 PINN 的区别

传统 PINN 的困难来自三个方面：参数维度高、PDE/边界/初值多目标竞争、时间被当作普通输入导致非因果拟合。Frozen-PINN 分别对应处理：冻结隐藏层减少可训练参数；最小二乘、边界层和 ODE 推进拆开损失项；按 \(C(t)\) 的初值问题顺序演化时间。

论文在 2026 年 ICLR 版本中报告 Frozen-PINN 在九个 PDE 基准上通常比 SOTA PINN 快数个数量级，并在低维问题上接近高效网格方法精度，在高维扩散等场景中避免传统网格法的维度灾难。局限是它依赖随机/数据依赖基函数质量，复杂边界和强非线性问题仍需要合适的边界处理、重采样和 ODE 求解器设置。

#### 🧪 练习题

```yaml
question: "Frozen-PINN 为什么能避免传统 PINN 的大规模梯度下降训练？"
options:
  - "它删除了 PDE 残差项，只拟合数据"
  - "它冻结空间基函数，并把输出层时间系数转化为 ODE 进行求解"
  - "它把所有边界条件都忽略，因此训练更快"
  - "它使用更深的 Transformer 代替全连接网络"
answer: 1
explain: "Frozen-PINN 采样并冻结隐藏层空间参数，用最小二乘确定初值，再通过 ODE 求解器推进 C(t)，因此不需要对全网络做反向传播式训练。"
```
