### LIPM — 线性倒立摆模型 (Linear Inverted Pendulum Model)

```yaml
id: lipm
name: LIPM
full_name: 线性倒立摆模型 (Linear Inverted Pendulum Model)
year: "2001"
org: AIST
paper_url: https://www.researchgate.net/publication/3578434
category: classic_control
parent: zmp
motivation: 简化行走动力学实现实时控制
```

#### 📝 一句话总结

LIPM 将双足机器人的复杂全身动力学简化为“固定高度质点 + 无质量支撑腿”的线性模型，解决了 ZMP 步态生成中实时求解 CoM 轨迹过于复杂的问题。它用 \(\ddot{x}=\frac{g}{z_c}(x-p_x)\) 把 CoM 与 ZMP 直接关联，成为 2000 年代人形机器人行走控制的核心低阶模型。

#### 🎯 核心要点

- **三维倒立摆约束**：质心被约束在固定高度平面上运动，支撑腿只提供约束力
- **线性化动力学**：在固定 CoM 高度、忽略 CoM 角动量的条件下，水平动力学变为线性二阶系统
- **矢状面/冠状面解耦**：\(x\) 与 \(y\) 方向具有相同形式，可分别设计控制器
- **ZMP 作为控制输入**：通过调节 ZMP 或落脚点改变 CoM 加速度，而不是直接规划全身力矩
- **可解析离散化**：自然频率 \(\omega=\sqrt{g/z_c}\) 使系统具有闭式解，便于 MPC、预观控制和捕获点推导
- **模型假设明确**：不表达 CoM 高度变化、角动量调节、脚底滚动和飞行相，因此适合规则地面上的稳健步态生成

#### 🔬 深入细节

##### 核心示意图

![LIPM 质点-无质量腿模型](https://scaron.info/figures/lipm.png)
*图：LIPM 将机器人视为固定高度质点，ZMP/接触点决定水平加速度。原始 ResearchGate/IEEE 页面不稳定，图源采用开放的 LIPM 教学示意。*

##### 算法伪代码

```python
# LIPM 离散步态生成核心
def lipm_step(state, zmp_ref, dt, zc, gravity=9.81):
    # state = [x, x_dot, y, y_dot]
    omega2 = gravity / zc

    # x/y 两个方向解耦
    x_ddot = omega2 * (state.x - zmp_ref.x)
    y_ddot = omega2 * (state.y - zmp_ref.y)

    # 可用解析离散化；这里用简化积分表达
    x_dot_next = state.x_dot + x_ddot * dt
    x_next = state.x + x_dot_next * dt
    y_dot_next = state.y_dot + y_ddot * dt
    y_next = state.y + y_dot_next * dt

    return [x_next, x_dot_next, y_next, y_dot_next]
```

##### 动机与背景

ZMP 给出了稳定性判据，但如果直接从全身多刚体动力学中求满足 ZMP 约束的关节轨迹，优化维度高、非线性强，难以在 2000 年代硬件上实时运行。Kajita 等人的 3D-LIPM 论文抓住了人形机器人常规行走的主要结构：上身质量远大于腿部，CoM 高度变化相对小，角动量可以通过保持躯干姿态来抑制。

这些假设把机器人简化成一个在水平平面上运动的质点，由一条无质量伸缩腿支撑。虽然模型非常粗糙，但它保留了行走最关键的倒立摆不稳定性：CoM 会自然远离支撑点，必须通过 ZMP 或脚步位置持续调节。

##### 核心公式：ZMP 与 CoM 的线性关系

在 CoM 高度固定为 \(z_c\)，且质心角动量变化忽略时，水平动力学为：

$$
\ddot{x} = \frac{g}{z_c}(x - p_x), \quad
\ddot{y} = \frac{g}{z_c}(y - p_y)
$$

其中 \((x,y)\) 为 CoM 水平位置，\((p_x,p_y)\) 为 ZMP 位置。定义自然频率：

$$
\omega = \sqrt{\frac{g}{z_c}}
$$

则有：

$$
\ddot{\mathbf{c}} = \omega^2(\mathbf{c} - \mathbf{p}_{zmp})
$$

这个公式的直觉很清楚：若 ZMP 在 CoM 正下方，水平加速度为零；若 ZMP 在 CoM 前方，CoM 会被“拉回”或减速；若 ZMP 在后方，CoM 会继续向前加速。控制器本质上是在选择 ZMP 轨迹，让这个不稳定二阶系统产生期望的 CoM 轨迹。

##### 从三维倒立摆到线性模式

一般三维倒立摆的质点可能在任意曲面上运动，支撑腿方向和长度都变化，动力学是非线性的。LIPM 通过两个约束得到线性系统：

1. CoM 运动平面固定，通常取 \(z=z_c\)
2. 约束力方向通过支撑点，不产生关于 CoM 的额外角动量

在该模式下，矢状面和冠状面完全解耦，控制器可以分别计算 \(x\) 和 \(y\) 方向的 CoM 轨迹，再组合成三维步态。这一性质极大降低了步态生成复杂度。

> 💡 关键：LIPM 的“线性”不是小角度倒立摆线性化，而是通过固定 CoM 高度和零角动量约束，使 ZMP-CoM 关系在水平面内精确呈线性形式。

##### 离散系统与预观控制接口

为了用于数字控制，常将一维 LIPM 写成状态空间形式。令状态为：

$$
\mathbf{x}_k =
\begin{bmatrix}
c_k & \dot{c}_k & \ddot{c}_k
\end{bmatrix}^T
$$

以 CoM jerk \(u_k=\dddot{c}_k\) 为控制输入，可以得到离散积分模型：

$$
\mathbf{x}_{k+1} =
\begin{bmatrix}
1 & T & T^2/2 \\
0 & 1 & T \\
0 & 0 & 1
\end{bmatrix}\mathbf{x}_k +
\begin{bmatrix}
T^3/6 \\
T^2/2 \\
T
\end{bmatrix}u_k
$$

ZMP 输出为：

$$
p_k =
\begin{bmatrix}
1 & 0 & -z_c/g
\end{bmatrix}
\mathbf{x}_k
$$

这正是 Kajita 2003 Preview Control 的基础：给定未来 ZMP 参考，优化 CoM jerk 序列，使输出 \(p_k\) 跟踪参考且 CoM 轨迹平滑。

##### 与传统倒立摆和全身动力学的区别

普通倒立摆通常围绕固定铰点转动，状态变量是角度；LIPM 把接触点/ZMP 视作可移动控制输入，关注 CoM 的平动轨迹。全身动力学保留所有关节和接触力，表达能力更强但求解困难；LIPM 舍弃了大部分形体细节，换来线性可控、可快速规划和容易分析的结构。

这也解释了 LIPM 的限制：它不能主动利用躯干角动量，不能自然表达蹲起和跳跃，也无法处理足底滚动等复杂接触。但在规则地面行走中，这些缺失可以由下层全身控制器或反馈修正吸收，因此 LIPM 长期是工程系统中的高层规划模型。

#### 🧪 练习题

```yaml
question: "LIPM 能把双足行走动力学变成线性系统的关键假设是什么？"
options:
  - "机器人所有关节都没有摩擦"
  - "CoM 高度固定且关于 CoM 的角动量变化可忽略"
  - "足底必须始终双脚支撑"
  - "策略网络输出关节力矩"
answer: 1
explain: "固定 CoM 高度给出常数自然频率，忽略角动量变化使 ZMP 与 CoM 加速度线性相关，从而得到 LIPM。"
```
