### Preview Control — 预观控制 (Preview Control)

```yaml
id: preview_control
name: Preview Control
full_name: 预观控制 (Preview Control)
year: "2003"
org: AIST
paper_url: https://ieeexplore.ieee.org/document/1241826
category: classic_control
parent: lipm
motivation: 预测未来ZMP轨迹优化步态规划
```

#### 📝 一句话总结

Preview Control 将 LIPM 步态生成表述为带积分误差的 ZMP 跟踪伺服问题，通过预先查看未来 ZMP 参考来生成平滑 CoM 轨迹，解决了单步反馈控制无法提前响应脚步切换的问题。它让任意脚步落点序列可以转化为稳定、可实时计算的人形机器人行走模式。

#### 🎯 核心要点

- **Cart-table 模型**：用固定高度小车代表 CoM，ZMP 输出由 CoM 位置和加速度共同决定
- **CoM jerk 控制输入**：以 \(\dddot{x}\) 作为控制量，保证 CoM 位置、速度和加速度连续平滑
- **积分型伺服控制**：在状态中加入 ZMP 跟踪误差积分，消除稳态误差
- **未来参考预观**：控制律包含未来 \(N\) 步 ZMP 参考的前馈项，提前为落脚切换做准备
- **任意脚步支持**：给定脚印序列即可构造分段常值或平滑 ZMP 参考，不需要解析设计 CoM 曲线
- **工程影响巨大**：HRP 系列、ASIMO 时代的人形机器人步态生成大量采用或扩展该框架

#### 🔬 深入细节

##### 核心示意图

![ZMP Preview Control 生成的 ZMP 与 CoM 轨迹](https://raw.githubusercontent.com/ekorudiawan/ZMP-Preview-Control-WPG/master/images/python_zmp_com.png)
*图：预观控制中 ZMP 参考呈脚步切换的折线/分段轨迹，CoM 轨迹则因 jerk 优化而平滑跟随。原始 IEEE 页面可能受限，这里采用复现实验开源项目的公开结果图。*

##### 算法伪代码

```python
# Kajita ZMP Preview Control 的核心控制律
def preview_control_step(x, zmp_ref_future, gains):
    # x = [com_position, com_velocity, com_acceleration]
    # zmp_ref_future = [p_ref(k+1), ..., p_ref(k+N)]

    zmp = x[0] - gains.zc_over_g * x[2]
    error = zmp - zmp_ref_future[0]
    gains.integral_error += error

    # u 为 CoM jerk
    u = -gains.Gi * gains.integral_error
    u -= gains.Gx @ x
    for j, pref in enumerate(zmp_ref_future):
        u -= gains.Gp[j] * pref

    x_next = gains.A @ x + gains.B * u
    return x_next, zmp, u
```

##### 动机与背景

LIPM 给出了 CoM 与 ZMP 的线性关系，但“给定脚步序列，如何自动生成可行 CoM 轨迹”仍然不简单。若只用当前 ZMP 误差反馈，控制器会在支撑脚切换时反应滞后：ZMP 参考已经跳到下一只脚附近，CoM 才开始追赶，容易产生大加速度或越界。

Kajita 等人的关键想法是：脚步计划本身提供了未来 ZMP 参考。控制器不应只看当前误差，而应提前知道未来几秒 ZMP 将移动到哪里，然后从现在开始逐渐调整 CoM。这个“预观”思想来自离散时间最优控制，被用于人形机器人后成为经典步态生成器。

##### Cart-table 模型

论文用 cart-table 模型解释 LIPM：一个质量为 \(m\) 的小车在高度 \(z_c\) 的桌面上水平运动。ZMP 与小车位置和水平加速度关系为：

$$
p = x - \frac{z_c}{g}\ddot{x}
$$

若分别处理 \(x\) 和 \(y\) 方向，系统完全同构。选择 CoM jerk \(u=\dddot{x}\) 作为输入，离散状态为：

$$
\mathbf{x}(k)=
\begin{bmatrix}
x(k) & \dot{x}(k) & \ddot{x}(k)
\end{bmatrix}^T
$$

离散动力学为：

$$
\mathbf{x}(k+1)=A\mathbf{x}(k)+B u(k)
$$

$$
A=
\begin{bmatrix}
1 & T & T^2/2 \\
0 & 1 & T \\
0 & 0 & 1
\end{bmatrix},
\quad
B=
\begin{bmatrix}
T^3/6 \\
T^2/2 \\
T
\end{bmatrix}
$$

输出方程为：

$$
p(k)=C\mathbf{x}(k), \quad
C=
\begin{bmatrix}
1 & 0 & -z_c/g
\end{bmatrix}
$$

##### 预观最优控制律

控制目标不是单纯最小化当前误差，而是平衡三件事：ZMP 跟踪误差、状态偏移和 jerk 平滑性。典型代价函数为：

$$
J=\sum_{i=k}^{\infty}
\left[
Q_e e(i)^2 + \Delta \mathbf{x}(i)^T Q_x \Delta \mathbf{x}(i) + R \Delta u(i)^2
\right]
$$

其中 \(e(i)=p(i)-p^{ref}(i)\)。求解离散 Riccati 方程后，得到控制律：

$$
u(k)=
-G_i \sum_{i=0}^{k} e(i)
-G_x \mathbf{x}(k)
-\sum_{j=1}^{N} G_p(j)p^{ref}(k+j)
$$

三项含义分别是：

- \(G_i\)：积分反馈，压低 ZMP 稳态误差
- \(G_x\)：状态反馈，稳定 CoM 的位置、速度和加速度
- \(G_p(j)\)：预观前馈，利用未来参考提前调整

> 💡 关键：预观项不是“预测机器人未来状态”，而是利用已知的未来 ZMP 参考。脚步计划越可靠，前馈越能提前塑造平滑 CoM。

##### 步态生成流程

完整流程通常如下：

1. 根据足步序列生成参考 ZMP：单支撑时位于支撑脚内部，双支撑时从一脚平滑过渡到另一脚
2. 对 \(x\)、\(y\) 两个方向分别运行 Preview Controller，生成 CoM 轨迹
3. 根据脚步时序生成摆动脚轨迹，包括抬脚高度和落脚位置
4. 将 CoM、足端和躯干姿态交给逆运动学或全身控制器求关节轨迹
5. 用实际 ZMP/IMU/力传感器反馈做修正

这种模块化设计的价值在于脚步规划与稳定控制解耦。高层可以任意给脚印，底层预观控制器负责生成动态一致的 CoM。

##### 与 LIPM 直接控制的区别

LIPM 本身只是动力学模型；Preview Control 是在 LIPM 上构造的最优伺服器。没有预观时，控制器对未来脚步切换无感，只能在误差发生后补偿；加入预观后，CoM 会在参考 ZMP 切换前就开始移动，因此步态更自然、加速度更小、ZMP 跟踪更稳定。

它的主要限制来自 LIPM 假设：CoM 高度固定、角动量有限、接触面近似平坦。因此后续工作常用 MPC、可变高度倒立摆、捕获点或全身优化扩展它，但“用未来接触/ZMP 信息提前控制质心”的思想仍然保留。

#### 🧪 练习题

```yaml
question: "Preview Control 相比只使用当前 ZMP 误差反馈的主要优势是什么？"
options:
  - "可以完全不需要脚步规划"
  - "可以提前利用未来 ZMP 参考，使 CoM 在支撑切换前开始平滑调整"
  - "可以直接输出所有关节力矩"
  - "可以消除所有模型误差"
answer: 1
explain: "预观控制律包含未来参考的前馈项，能提前响应即将到来的脚步/ZMP 切换，从而减少滞后和突变。"
```
