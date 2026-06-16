---
domain: embodied
topic_id: motion_control
topic_name: 运动控制
page_icon: 🦿
page_title: 具身智能运动控制算法总结
page_subtitle: '{build_date} 版'
page_desc: 系统梳理四足/人形机器人运动控制技术演进，从经典ZMP/MPC到Teacher-Student RL再到VLA基础模型的发展历程
hero_pills:
- 🏷️ Locomotion · WBC · Sim-to-Real · VLA
count_pill: '{count} 个算法'
categories:
  classic_control:
    label: 经典控制理论
    color: '#6b7280'
  mpc:
    label: 模型预测控制
    color: '#22a06b'
  rl_locomotion:
    label: 强化学习运动
    color: '#5b63d3'
  wbc:
    label: 全身控制
    color: '#e8820c'
  sim2real:
    label: 仿真迁移
    color: '#0891b2'
  foundation_model:
    label: 基础模型
    color: '#dc2626'
image_base: ../../content/embodied/motion_control/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/motion_control/overview/zhihu__人形机器人运动控制Know-How__4fca7d49/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/embodied/motion_control/latest/zhihu__控制视角下的具身智能-自主闭环系统的工程化之路（上）__9b9f5870/article.md

## 算法演化关系

```yaml
nodes:
- id: zmp
  x: 100
  y: 50
  category: classic_control
- id: lipm
  x: 150
  y: 50
  category: classic_control
- id: preview_control
  x: 180
  y: 50
  category: classic_control
- id: centroidal_mpc
  x: 250
  y: 150
  category: mpc
- id: pr_mpc
  x: 300
  y: 130
  category: mpc
- id: convex_mpc
  x: 350
  y: 150
  category: mpc
- id: wb_mpc
  x: 530
  y: 130
  category: mpc
- id: perceptive_nmpc
  x: 580
  y: 170
  category: mpc
- id: ppo
  x: 300
  y: 250
  category: rl_locomotion
- id: teacher_student
  x: 420
  y: 250
  category: rl_locomotion
- id: amp
  x: 480
  y: 220
  category: rl_locomotion
- id: legged_gym
  x: 480
  y: 280
  category: rl_locomotion
- id: perceptive_loco
  x: 530
  y: 250
  category: rl_locomotion
- id: anymal_parkour
  x: 650
  y: 230
  category: rl_locomotion
- id: dreamwaq
  x: 650
  y: 270
  category: rl_locomotion
- id: exbody
  x: 650
  y: 310
  category: rl_locomotion
- id: hqp_wbc
  x: 270
  y: 350
  category: wbc
- id: ihwbc
  x: 380
  y: 350
  category: wbc
- id: hwc_loco
  x: 720
  y: 350
  category: wbc
- id: domain_rand
  x: 350
  y: 450
  category: sim2real
- id: isaac_gym
  x: 480
  y: 430
  category: sim2real
- id: rma
  x: 480
  y: 470
  category: sim2real
- id: isaac_lab
  x: 650
  y: 430
  category: sim2real
- id: asap
  x: 720
  y: 470
  category: sim2real
- id: rt2
  x: 580
  y: 550
  category: foundation_model
- id: pi0
  x: 650
  y: 550
  category: foundation_model
- id: openvla
  x: 650
  y: 590
  category: foundation_model
- id: helix02
  x: 800
  y: 530
  category: foundation_model
- id: groot_n1
  x: 800
  y: 570
  category: foundation_model
- id: ge1
  x: 800
  y: 610
  category: foundation_model
- id: dreamdojo
  x: 800
  y: 650
  category: foundation_model
edges:
- from: zmp
  to: lipm
  label: 简化动力学
- from: lipm
  to: preview_control
  label: 预测优化
- from: lipm
  to: centroidal_mpc
  label: 质心框架
- from: centroidal_mpc
  to: pr_mpc
  label: 策略融合
- from: centroidal_mpc
  to: convex_mpc
  label: 凸优化
- from: convex_mpc
  to: wb_mpc
  label: 全身扩展
- from: convex_mpc
  to: perceptive_nmpc
  label: 感知融合
- from: ppo
  to: teacher_student
  label: 特权蒸馏
- from: ppo
  to: amp
  label: 对抗模仿
- from: ppo
  to: legged_gym
  label: GPU并行
- from: teacher_student
  to: perceptive_loco
  label: 视觉感知
- from: perceptive_loco
  to: anymal_parkour
  label: 极限动作
- from: perceptive_loco
  to: dreamwaq
  label: 多模融合
- from: teacher_student
  to: exbody
  label: 表现力
- from: hqp_wbc
  to: ihwbc
  label: MPC联合
- from: ihwbc
  to: hwc_loco
  label: 鲁棒行走
- from: domain_rand
  to: isaac_gym
  label: GPU仿真
- from: domain_rand
  to: rma
  label: 在线自适应
- from: isaac_gym
  to: isaac_lab
  label: 多模态
- from: rma
  to: asap
  label: 残差补偿
- from: rt2
  to: pi0
  label: 跨形态
- from: rt2
  to: openvla
  label: 开源化
- from: pi0
  to: helix02
  label: Loco操作
- from: pi0
  to: groot_n1
  label: 人形专用
- from: pi0
  to: ge1
  label: 世界模型
- from: pi0
  to: dreamdojo
  label: 物理预判
milestones:
- convex_mpc
- teacher_student
- pi0
```

## 核心算法

### ZMP

```yaml
id: zmp
num: 1
name: ZMP
full_name: 零力矩点 (Zero Moment Point)
year: '1969'
org: Waseda University
parent: —
paper_url: https://ieeexplore.ieee.org/document/1083694
project_url: ''
category: classic_control
motivation: 定义双足稳定判据奠定机器人步态基础
```

#### 📝 一句话总结
ZMP 将双足机器人动态平衡转化为“地面反力合力作用点是否位于支撑多边形内”的判据，解决了早期步态规划缺少可计算稳定性约束的问题。它把复杂多刚体运动的可行性压缩成接触平面上的点约束，奠定了后续 LIPM、预观控制和人形机器人步态生成的基础。

#### 🎯 核心要点
- **动态稳定判据**：当惯性力、重力与接触力的合成力矩在水平轴方向为零时，对应地面点即 ZMP
- **支撑多边形约束**：真实 ZMP 必须落在足底接触区域或双足凸包内，越界意味着脚将绕边缘翻转
- **从静态到动态平衡**：CoM 投影在支撑面内是静态判据，ZMP 将加速度和角动量也纳入稳定分析
- **步态规划接口**：规划器可先给出期望 ZMP 轨迹，再求解满足该轨迹的质心、足端和关节运动
- **后续模型核心变量**：LIPM 将 ZMP 与 CoM 二阶动力学线性关联，Preview Control 进一步用未来 ZMP 参考生成平滑 CoM
- **适用边界清晰**：经典 ZMP 主要假设接触共面、足底不滑、角动量可忽略或受控，对多接触和强动态飞行相表达不足

#### 🔬 深入细节
##### 核心示意图

![ZMP 与单支撑接触几何](https://scaron.info/figures/zmp-axis-ssp.png)
*图：ZMP 可看作重力-惯性合力矩在接触平面上的零倾覆点。公开原论文直链受 IEEE 页面限制，这里采用 Stéphane Caron 的开放 ZMP 示意图辅助说明。*

##### 算法伪代码

```python
# ZMP 稳定性检查与步态修正
def zmp_balance_check(com, com_acc, angular_momentum_rate, support_polygon, mass, gravity):
    # 1. 由重力-惯性力和角动量变化计算平面 ZMP
    f_gi = mass * (gravity - com_acc)
    tau_o_gi = cross(com, mass * gravity) - angular_momentum_rate
    zmp = project_zero_tilting_point(f_gi, tau_o_gi, ground_normal=[0, 0, 1])

    # 2. 判断 ZMP 是否位于当前接触支撑区域
    stable = point_in_convex_polygon(zmp.xy, support_polygon)

    # 3. 越界时调节 CoM 加速度、脚步位置或上身角动量
    if not stable:
        zmp_ref = closest_point_on_polygon(zmp.xy, support_polygon)
        com_acc_cmd = adjust_com_acceleration_toward(zmp_ref)
        footstep_cmd = optionally_expand_support_polygon()
        return "recover", zmp_ref, com_acc_cmd, footstep_cmd

    return "stable", zmp, None, None
```

##### 动机与背景

双足机器人不是固定底座机械臂：它在行走时不断切换单支撑、双支撑，地面接触既要提供力也要避免脚底翻转。早期若只看 CoM 投影是否在支撑面内，就只能解释准静态姿态；一旦机器人加速、减速或摆动上身，惯性力会显著改变倾覆趋势，静态投影判据会失效。

Vukobratovic 与 Juricic 的贡献是把这个问题写成可计算的力矩平衡条件。设机器人所有质量和惯性效应等效为重力-惯性合力，ZMP 是地面上使水平倾覆力矩为零的点。若这个点落在支撑多边形内部，足底压力分布可以产生相应接触反力；若计算得到的点在支撑多边形外，真实接触点会饱和在足底边缘，机器人开始绕边缘倾覆。

论文原始 IEEE 页面通常不可直接开放访问，因此本条精读主要依据给定元信息、公开的 ZMP 综述和后续 ZMP/LIPM 文献中复现的公式与判据。核心方法本身是稳定的经典定义，不依赖实验数据细节。

##### 核心机制：零水平力矩点

令 \(G\) 为质心，\(m\) 为总质量，\(\ddot{\mathbf{p}}_G\) 为质心加速度，\(\dot{\mathbf{L}}_O\) 为关于惯性参考点 \(O\) 的角动量变化率。重力-惯性力为：

$$
\mathbf{f}^{gi}=m(\mathbf{g}-\ddot{\mathbf{p}}_G)
$$

若 \(Z\) 位于地面平面上，ZMP 条件要求关于 \(Z\) 的合力矩没有水平分量：

$$
\boldsymbol{\tau}^{gi}_Z \times \mathbf{n}=0
$$

其中 \(\mathbf{n}\) 是地面法向量。在常见平地、低角动量变化假设下，二维 ZMP 可写为：

$$
x_{zmp} =
\frac{\sum_i m_i(\ddot{z}_i + g)x_i - \sum_i m_i \ddot{x}_i z_i - \sum_i \dot{L}_{y,i}}
{\sum_i m_i(\ddot{z}_i + g)}
$$

$$
y_{zmp} =
\frac{\sum_i m_i(\ddot{z}_i + g)y_i - \sum_i m_i \ddot{y}_i z_i + \sum_i \dot{L}_{x,i}}
{\sum_i m_i(\ddot{z}_i + g)}
$$

直觉上，机器人向前加速时，惯性力会把 ZMP 往后拉；快速摆臂或躯干俯仰时，角动量变化也会移动 ZMP。因此 ZMP 不是单纯的几何点，而是“当前运动趋势要求地面反力在哪里作用才不会翻倒”的动态量。

##### 支撑多边形与 FZMP

在单脚支撑时，支撑多边形通常是脚底接触面的凸多边形；在双脚支撑时，是两只脚所有接触点的凸包。ZMP 判据写作：

$$
\mathbf{p}_{zmp} \in \mathcal{S}
$$

其中 \(\mathcal{S}\) 为支撑多边形。若计算点位于 \(\mathcal{S}\) 外，文献中常称其为 fictitious ZMP。这个“虚拟 ZMP”仍然有诊断意义：它离支撑边界越远，说明需要补偿的倾覆力矩越大。控制器可通过移动 CoM、调整落脚点、降低加速度或利用上身角动量把期望 ZMP 拉回可行区域。

> 💡 关键：ZMP 不是说机器人质心必须始终在脚上方，而是说接触力矩必须能由当前足底压力分布实现。这正是它能处理动态行走的原因。

##### 与传统静态稳定的区别

静态稳定只要求 CoM 投影在支撑多边形内：

$$
\mathbf{p}_{CoM}^{xy} \in \mathcal{S}
$$

ZMP 则允许 CoM 投影短时偏离，只要加速度和角动量能让接触力合力落在支撑面内。相比之下，ZMP 更适合规划慢速到中速的人形行走，但对跑跳、飞行相和非共面多接触不够直接。后续 Capture Point、DCM、Centroidal MPC 和 Whole-Body MPC 都可以看作是在 ZMP 思想之上，放宽模型或扩展接触表达。

##### 训练/推理流程中的位置

在经典人形步态生成中，ZMP 通常不是末端控制命令，而是中间规划变量。流程是：先根据脚步序列构造期望 ZMP 轨迹；再用 LIPM 或 Preview Control 生成 CoM 轨迹；最后通过逆运动学或全身控制器生成关节角与力矩。ZMP 因此把高层“走哪一步”和低层“关节怎么动”连接起来。

#### 🧪 练习题
```yaml
question: "经典 ZMP 判据中，为什么计算得到的 ZMP 落到支撑多边形外通常意味着机器人会倾覆？"
options:
  - "因为质心高度必须保持为零"
  - "因为足底接触无法在支撑区域外产生真实的压力合力作用点"
  - "因为关节速度一定超过电机上限"
  - "因为 ZMP 定义只适用于四足机器人"
answer: 1
explain: "真实接触压力只能分布在足底支撑区域内；若平衡所需作用点在区域外，接触力矩无法实现，脚会绕支撑边缘翻转。"
```

### LIPM

```yaml
id: lipm
num: 2
name: LIPM
full_name: 线性倒立摆模型 (Linear Inverted Pendulum Model)
year: '2001'
org: AIST
parent: zmp
paper_url: https://www.researchgate.net/publication/3578434
project_url: ''
category: classic_control
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

### Preview Control

```yaml
id: preview_control
num: 3
name: Preview Control
full_name: 预观控制 (Preview Control)
year: '2003'
org: AIST
parent: lipm
paper_url: https://ieeexplore.ieee.org/document/1241826
project_url: ''
category: classic_control
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

### Centroidal MPC

```yaml
id: centroidal_mpc
num: 4
name: Centroidal MPC
full_name: 质心动力学MPC (Centroidal Dynamics MPC)
year: '2015'
org: ETH Zurich
parent: lipm
paper_url: https://ieeexplore.ieee.org/document/7353848
project_url: ''
category: mpc
motivation: 基于质心动量的MPC框架
```

#### 📝 一句话总结
Centroidal Dynamics MPC 将多刚体机器人的全身动力学抽象为质心线动量与角动量的演化方程（牛顿-欧拉方程），并在模型预测控制框架下滚动优化接触力与质心轨迹，解决了传统 LIPM 仅适用于准静态步态、无法处理三维角动量与多接触场景的局限性。

#### 🎯 核心要点
- **质心动力学模型 (Centroidal Dynamics)**：将浮动基多刚体系统的全身动量投影到质心，用 6 维动量向量（3 维线动量 + 3 维角动量）描述整体运动状态
- **牛顿-欧拉约束**：质心线加速度由所有接触力之和决定，角动量变化率由接触力矩之和决定
- **MPC 滚动优化**：在有限时域内预测质心状态演化，优化各足端接触力序列，实现实时反馈控制
- **摩擦锥约束**：将库仑摩擦锥线性化为多面体锥，作为不等式约束纳入 QP 求解
- **步态调度 (Gait Scheduling)**：通过接触时序表控制各足的站立/摆动相，支持 trot、pace、bound、gallop 等多种步态
- **与 LIPM 的关键区别**：保留完整的三维角动量信息，不假设恒定质心高度，支持动态步态与非共面接触
- **层次化控制架构**：Centroidal MPC 作为高层规划器输出期望接触力与质心轨迹，下层由全身控制器 (WBC) 映射到关节力矩

#### 🔬 深入细节
##### 核心框架示意

![Centroidal MPC 控制框架](assets/centroidal_mpc_framework.png)
*图：基于质心动力学的 MPC 层次化控制架构。高层 Centroidal MPC 优化质心轨迹与接触力，低层 WBC 将其映射为关节力矩。*

Centroidal MPC 的核心思想是：不直接优化机器人全部关节自由度（通常 12-30 维），而是将问题分解为两层——上层在质心空间（6 维状态 + 接触力）进行 MPC 优化，下层通过全身控制器跟踪上层指令。这种分层策略在保持物理一致性的同时，大幅降低了在线优化的计算复杂度。

##### 算法伪代码

```python
# Centroidal Dynamics MPC 核心流程
def centroidal_mpc(x0, gait_schedule, N_horizon, dt):
    """
    x0: 当前状态 [com_pos, com_vel, angular_momentum]  (9维)
    gait_schedule: 各足接触时序表 {leg_id: [contact_flags]}
    N_horizon: 预测时域步数
    dt: 时间步长
    """
    # 1. 构建参考轨迹
    x_ref = generate_reference_trajectory(x0, v_cmd, N_horizon, dt)
    
    # 2. 滚动优化：求解 QP
    for k in range(N_horizon):
        # 质心动力学离散化
        # x_{k+1} = A_k * x_k + B_k * u_k + g_vec
        # 其中 u_k = [f_1, f_2, ..., f_n_c]  (各足接触力)
        
        # 目标函数：跟踪误差 + 力正则化
        # min Σ ||x_k - x_ref_k||²_Q + ||u_k||²_R
        
        # 约束条件：
        # (a) 动力学约束: x_{k+1} = f(x_k, u_k)
        # (b) 摩擦锥约束: A_friction * f_i <= 0  (线性化锥)
        # (c) 接触互补: f_i = 0 if leg_i in swing
        # (d) 法向力非负: f_iz >= 0
    
    u_opt, x_opt = solve_qp(Q, R, A, B, constraints)
    
    # 3. 仅执行第一步最优力
    f_applied = u_opt[0]
    
    # 4. 传递给全身控制器
    tau = whole_body_controller(f_applied, x_opt[1], joint_state)
    
    return tau
```

##### 方法深入解析

**1. 动机与背景：为什么需要质心动力学？**

传统的线性倒立摆模型 (LIPM) 假设质心高度恒定、角动量为零，这使得它只能处理准静态步行。当机器人需要执行 trot、gallop 等动态步态，或在非平坦地形上运动时，角动量的变化不可忽略。质心动力学模型保留了完整的牛顿-欧拉方程，是全身动力学的"最紧凑投影"：

$$
\begin{bmatrix} \dot{\mathbf{p}} \\ \dot{\mathbf{L}} \end{bmatrix} = \begin{bmatrix} m\mathbf{g} \\ \mathbf{0} \end{bmatrix} + \sum_{i=1}^{n_c} \begin{bmatrix} \mathbf{f}_i \\ (\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i \end{bmatrix}
$$

其中 \(\mathbf{p} = m\dot{\mathbf{r}}\) 为线动量，\(\mathbf{L}\) 为绕质心的角动量，\(\mathbf{r}\) 为质心位置，\(\mathbf{f}_i\) 为第 \(i\) 个接触点的力，\(\mathbf{c}_i\) 为接触点位置，\(n_c\) 为当前接触点数。

> 💡 **关键直觉**：质心动力学本质上是牛顿第二定律和角动量定理在整个多刚体系统上的应用——不管机器人有多少关节，其质心的运动完全由外力（接触力 + 重力）决定。

**2. 状态空间与动力学模型**

系统状态定义为：

$$
\mathbf{x} = \begin{bmatrix} \mathbf{r} \\ \dot{\mathbf{r}} \\ \boldsymbol{\Theta} \end{bmatrix} \in \mathbb{R}^{9}
$$

其中 \(\mathbf{r} \in \mathbb{R}^3\) 为质心位置，\(\dot{\mathbf{r}} \in \mathbb{R}^3\) 为质心速度，\(\boldsymbol{\Theta} \in \mathbb{R}^3\) 为躯干姿态（欧拉角或等效表示）。控制输入为所有接触足的地面反力：

$$
\mathbf{u} = \begin{bmatrix} \mathbf{f}_1 \\ \mathbf{f}_2 \\ \vdots \\ \mathbf{f}_{n_c} \end{bmatrix} \in \mathbb{R}^{3n_c}
$$

连续时间动力学方程为：

$$
\dot{\mathbf{x}} = \begin{bmatrix} \dot{\mathbf{r}} \\ \frac{1}{m}\sum_{i=1}^{n_c} \mathbf{f}_i + \mathbf{g} \\ \mathbf{I}^{-1}\left(\sum_{i=1}^{n_c} (\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i\right) \end{bmatrix}
$$

其中 \(\mathbf{I}\) 为躯干惯性张量（在质心动力学简化中通常取为常数近似），\(\mathbf{g} = [0, 0, -9.81]^T\)。

通过前向欧拉或零阶保持离散化，得到线性时变系统：

$$
\mathbf{x}_{k+1} = \mathbf{A}_k \mathbf{x}_k + \mathbf{B}_k \mathbf{u}_k + \mathbf{d}_k
$$

> ⚠️ **注意**：角动量方程中 \((\mathbf{c}_i - \mathbf{r}) \times \mathbf{f}_i\) 包含状态与控制的交叉项，使得原始问题非线性。实际实现中常在当前状态点线性化，将交叉项展开为线性近似，从而转化为 QP 可解的形式。

**3. MPC 优化问题公式化**

在预测时域 \(N\) 内，MPC 求解如下二次规划问题：

$$
\min_{\mathbf{u}_{0:N-1}} \sum_{k=0}^{N-1} \left[ (\mathbf{x}_k - \mathbf{x}_k^{\text{ref}})^T \mathbf{Q} (\mathbf{x}_k - \mathbf{x}_k^{\text{ref}}) + \mathbf{u}_k^T \mathbf{R} \mathbf{u}_k \right] + (\mathbf{x}_N - \mathbf{x}_N^{\text{ref}})^T \mathbf{Q}_f (\mathbf{x}_N - \mathbf{x}_N^{\text{ref}})
$$

$$
\text{s.t.} \quad \mathbf{x}_{k+1} = \mathbf{A}_k \mathbf{x}_k + \mathbf{B}_k \mathbf{u}_k + \mathbf{d}_k
$$

$$
\mathbf{D} \mathbf{f}_i \leq \mathbf{0}, \quad f_{i,z} \geq f_{\min}, \quad \forall i \in \mathcal{C}_k
$$

$$
\mathbf{f}_i = \mathbf{0}, \quad \forall i \notin \mathcal{C}_k
$$

其中：
- \(\mathbf{Q}, \mathbf{R}, \mathbf{Q}_f\) 为权重矩阵，分别惩罚状态偏差、力大小和终端误差
- \(\mathbf{D}\) 为线性化摩擦锥矩阵（将圆锥近似为 4 面或 8 面多面体）
- \(\mathcal{C}_k\) 为第 \(k\) 步的接触足集合，由步态调度器决定
- \(f_{\min}\) 为最小法向力，防止接触力过小导致滑动

**4. 摩擦锥线性化**

库仑摩擦锥约束要求接触力位于摩擦锥内：

$$
\sqrt{f_{i,x}^2 + f_{i,y}^2} \leq \mu f_{i,z}
$$

这是一个二阶锥约束（SOCP），为保持 QP 可解性，将其线性化为多面体近似：

$$
\begin{bmatrix} 1 & 0 & -\mu \\ -1 & 0 & -\mu \\ 0 & 1 & -\mu \\ 0 & -1 & -\mu \end{bmatrix} \mathbf{f}_i \leq \mathbf{0}
$$

这是最简单的 4 面近似，实际中常用 8 面或 16 面以提高精度。

**5. 步态调度与接触时序**

步态调度器定义了每条腿在预测时域内的接触/摆动状态。以四足机器人为例：

| 步态 | LF | RF | LH | RH | 特点 |
|------|----|----|----|----|------|
| Trot | ■□ | □■ | □■ | ■□ | 对角足同步，最常用 |
| Pace | ■□ | □■ | ■□ | □■ | 同侧足同步 |
| Bound | ■□ | ■□ | □■ | □■ | 前后足同步 |
| Gallop | ■□□□ | □■□□ | □□■□ | □□□■ | 四足依次着地 |

（■=站立相, □=摆动相）

接触时序直接决定了 MPC 中哪些力变量被激活（站立相）或强制为零（摆动相），从而改变优化问题的结构。

**6. 与传统方法的区别**

| 特性 | LIPM | Centroidal MPC |
|------|------|----------------|
| 质心高度 | 恒定假设 | 可变 |
| 角动量 | 忽略（假设为零） | 完整建模 |
| 接触模式 | 单/双支撑 | 任意多接触 |
| 适用步态 | 准静态行走 | 动态步态（trot/gallop等） |
| 地形适应 | 仅平地 | 非平坦地形 |
| 计算方法 | 解析解/简单QP | 在线QP求解 |
| 典型求解频率 | — | 50-400 Hz |

> 💡 **关键优势**：Centroidal MPC 在计算复杂度（~10ms QP 求解）和模型精度之间取得了最佳平衡，既比 LIPM 更准确地捕捉动态效应，又比全身动力学 MPC 计算量小一个数量级，成为当前四足/人形机器人运动控制的主流框架。

**7. 实际实现中的关键技巧**

- **热启动 (Warm-starting)**：用上一次 MPC 求解结果平移初始化当前问题，显著加速 QP 收敛
- **自适应时域**：近端用短时间步（高精度），远端用长时间步（降低变量数）
- **参考轨迹生成**：通常由速度指令积分得到质心参考位置，姿态参考保持水平或跟踪地形法线
- **典型参数**：预测时域 0.5-1.0s，时间步 10-50ms，QP 变量数 ~200-500

#### 🧪 练习题
```yaml
question: "与线性倒立摆模型 (LIPM) 相比，Centroidal Dynamics MPC 的核心改进是什么？"
options:
  - "使用非线性优化器替代线性 QP 求解"
  - "保留完整的三维角动量建模，支持动态步态与多接触场景"
  - "直接优化全部关节力矩，无需全身控制器"
  - "引入深度强化学习替代传统优化方法"
answer: 1
explain: "Centroidal MPC 的核心贡献是将 LIPM 中被忽略的角动量纳入建模，使用完整的牛顿-欧拉方程描述质心动力学，从而支持 trot、gallop 等动态步态以及非共面多接触场景。它仍然使用 QP 求解（非选项A），仍需下层 WBC（非选项C），也不涉及强化学习（非选项D）。"
```

### PR-MPC

```yaml
id: pr_mpc
num: 5
name: PR-MPC
full_name: 策略正则化MPC (Policy-Regularized MPC)
year: '2017'
org: MIT
parent: centroidal_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/8206268
project_url: ''
category: mpc
motivation: 融合学习策略与MPC提升泛化性
```

#### 📝 一句话总结
PR-MPC 在非线性 MPC 目标中加入启发式/学习策略的正则项，用参考策略引导足端落点、接触力和身体运动，解决四足动态步态优化容易病态、难以统一调参的问题。它让 MIT Cheetah 能在同一 MPC 结构下稳定 trot、bound、gallop 等多种步态，而不必为每种步态重写代价函数。

#### 🎯 核心要点
- **策略正则化项**：在 MPC 代价中惩罚偏离参考策略 \(\pi_{ref}\) 的控制序列，改善非线性优化条件数
- **统一多步态 MPC**：同一优化框架支持 trotting、bounding、galloping，无需针对每种步态重新设计权重
- **启发式先验 + 在线优化**：参考策略提供合理初值和行为偏置，MPC 仍根据动力学和约束在线修正
- **足步与力的耦合优化**：优化变量覆盖身体状态、接触力、足端位置或脚步参数，使动态步态更一致
- **降低局部极小风险**：正则项把搜索空间拉向已知可行运动模式，减少纯 MPC 在高维非凸问题中的发散
- **MPC/RL 融合雏形**：展示了“学习/启发式策略提供先验，模型优化提供约束满足”的混合控制范式

#### 🔬 深入细节
##### 核心示意图

![PR-MPC 多步态轨迹示意](https://d3i71xaburhd42.cloudfront.net/ba9bf25973fd38b636176c1c46fd83a972b9bda3/4-Figure3-1.png)
*图：PR-MPC 论文公开索引中的多步态结果图。IEEE 原文页面可能受限，公开图源用于说明其核心目标：在同一 MPC 框架内稳定多种 Cheetah 步态。*

##### 算法伪代码

```python
# Policy-Regularized MPC 的滚动优化结构
def pr_mpc_control(x0, gait_schedule, reference_policy, model, horizon):
    # 1. 参考策略给出脚步、身体速度或力分配先验
    u_ref, foot_ref, state_ref = reference_policy.rollout(x0, gait_schedule, horizon)

    # 2. 构造带策略正则化的非线性 MPC
    problem = NonlinearOCP()
    for k in range(horizon):
        problem.add_dynamics_constraint(model, k)
        problem.add_contact_constraints(gait_schedule[k])
        problem.add_friction_cone_constraints(k)
        problem.add_cost(track_body_state(k, state_ref[k]))
        problem.add_cost(track_commanded_velocity(k))
        problem.add_cost(lambda_reg * norm(control[k] - u_ref[k])**2)
        problem.add_cost(lambda_foot * norm(footstep[k] - foot_ref[k])**2)

    # 3. 用参考策略 warm-start，求解非线性优化
    solution = solve_nmpc(problem, initial_guess=(u_ref, foot_ref, state_ref))

    # 4. 只执行第一步控制，下一周期重新规划
    return solution.control[0], solution.footstep[0]
```

##### 动机与背景

四足动态步态的 MPC 难点不只是动力学复杂，而是优化问题高度非凸。足端什么时候接触、身体该如何起伏、接触力如何分配、下一步落在哪里，这些变量相互耦合。纯手工 MPC 如果代价函数过弱，会出现奇怪的局部解；如果权重过强，又会只适合某一种步态。

PR-MPC 的思路是承认“已有控制经验”很有价值。Raibert 式脚步规则、步态相位表或学习得到的局部策略虽然不保证全局最优，但能给出合理运动模板。MPC 不必从空白空间搜索，而是在这些模板附近寻找满足动力学和约束的最优修正。

##### 优化目标

标准 MPC 通常写作：

$$
\min_{\mathbf{x}_{0:N}, \mathbf{u}_{0:N-1}}
\sum_{k=0}^{N-1}
\ell(\mathbf{x}_k,\mathbf{u}_k)
+ \ell_f(\mathbf{x}_N)
$$

$$
\text{s.t.}\quad
\mathbf{x}_{k+1}=f(\mathbf{x}_k,\mathbf{u}_k),\quad
\mathbf{c}(\mathbf{x}_k,\mathbf{u}_k)\le 0
$$

PR-MPC 在此基础上加入策略正则化：

$$
\ell_{PR} =
\ell_{task}(\mathbf{x}_k,\mathbf{u}_k)
+ \lambda_u \|\mathbf{u}_k-\pi_u(\mathbf{x}_k)\|^2
+ \lambda_p \|\mathbf{p}^{foot}_k-\pi_p(\mathbf{x}_k)\|^2
$$

其中 \(\pi_u\) 和 \(\pi_p\) 可以是启发式或学习策略输出的参考控制和参考脚步。这个项并不是硬约束：当环境、速度命令或动力学约束要求偏离参考时，MPC 仍可选择更优解。

> 💡 关键：PR-MPC 不是用策略替代 MPC，而是用策略改变 MPC 的搜索地形，让优化更容易找到“像正常步态”的可行解。

##### 为什么正则化能改善优化

非线性 MPC 在四足机器人上常遇到三个问题。第一，接触力和足端位置存在冗余，多种组合都能短期满足身体加速度，导致 Hessian 条件差。第二，不同步态的身体轨迹形态差异很大，同一组权重难以覆盖。第三，优化初值若离可行步态太远，求解器容易收敛到不自然局部极小值。

策略正则化提供了“软先验”。对于 trot，参考策略给出对角腿相位和对称脚步；对于 bound，给出前后腿成对运动；对于 gallop，给出非对称触地序列。MPC 代价会鼓励解靠近这些模式，同时由动力学约束确保接触力、摩擦锥和身体运动可行。

##### 训练/推理流程

PR-MPC 的在线控制周期通常是：

1. 根据用户速度命令和当前步态生成接触时序
2. 参考策略滚动预测未来 \(N\) 步脚步或控制先验
3. 以该先验 warm-start 非线性 MPC
4. 求解满足质心/单刚体动力学、摩擦锥、接触约束的轨迹
5. 执行第一段控制，下一控制周期重新感知和优化

这种 receding horizon 结构允许控制器持续修正模型误差和扰动。参考策略只需局部合理，不需要覆盖所有外部扰动。

##### 与传统 MPC 和纯学习策略的区别

传统 MPC 依赖模型和代价设计，约束满足强，但很吃调参和初值；纯学习策略推理快、泛化潜力高，但很难显式保证摩擦锥、接触力和身体动态一致性。PR-MPC 处在二者之间：策略负责提供行为先验，MPC 负责物理可行性和在线反馈。

这种思路后来在 High-MPC、Residual MPC、learning warm-start 和 RL-MPC 混合控制中反复出现。它的局限是参考策略质量会影响优化结果，而且非线性 MPC 的实时性仍然比后来的 Convex MPC 更难保证。

#### 🧪 练习题
```yaml
question: "PR-MPC 在 MPC 目标中加入策略正则化项的主要目的是什么？"
options:
  - "完全取消动力学模型，只保留神经网络策略"
  - "用参考策略引导优化到合理步态附近，同时保留 MPC 的约束修正能力"
  - "把所有接触约束改成无约束优化"
  - "只用于减少传感器噪声"
answer: 1
explain: "策略正则项提供软先验和 warm-start，改善非线性优化的条件数与局部收敛，同时 MPC 仍显式处理动力学和接触约束。"
```

### Convex MPC

```yaml
id: convex_mpc
num: 6
name: Convex MPC
full_name: 凸模型预测控制 (Convex Model Predictive Control)
year: '2018'
org: MIT
parent: centroidal_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/8594448
project_url: ''
category: mpc
motivation: 简化单刚体模型实现实时足端力优化
```

#### 📝 一句话总结
Convex MPC 将四足机器人的质心动力学简化为**单刚体模型（SRBD）**，通过线性化与离散化将运动控制问题转化为**凸二次规划（QP）**，以约 30 Hz 的频率实时求解最优地面反力（GRF），在 MIT Cheetah 3 上实现了 trot、bound、pace、pronk、gallop 等多种动态步态。

#### 🎯 核心要点
- **单刚体动力学模型（SRBD）**：忽略腿部质量与惯性（仅占总质量 ~10%），将整个机器人视为一个受足端力驱动的刚体，状态维度从 36+ 降至 13
- **连续动力学线性化**：对欧拉角-角速度关系做小角度近似，惯性张量在当前姿态处冻结，忽略陀螺力矩项，使系统方程变为线性时变（LTV）形式
- **凸 QP 公式化**：将 LTV 系统通过矩阵指数离散化，结合二次代价函数和线性化摩擦锥约束，构造标准凸 QP 问题，保证全局最优解
- **摩擦锥金字塔近似**：将非线性摩擦锥约束 \(\|f_{x,y}\| \leq \mu f_z\) 近似为 4 个线性不等式（金字塔），保持 QP 的凸性
- **步态调度表（Gait Scheduler）**：通过周期性二值接触序列表定义不同步态，MPC 根据接触状态自动分配力约束，切换步态仅需更换调度表
- **实时性能**：使用 qpOASES 求解器，10 步预测窗口（~0.5s）的 QP 平均求解时间 < 1 ms，总控制周期约 33 ms

#### 🔬 深入细节
##### 整体控制架构

```
┌─────────────────────────────────────────────────────────┐
│                   Convex MPC 控制框架                     │
│                                                         │
│  ┌──────────┐    ┌──────────────┐    ┌───────────────┐  │
│  │ 步态调度表 │───▶│  Convex MPC  │───▶│ 足端力 f_i    │  │
│  │ Gait Table│    │  (QP Solver) │    │ (GRF, 12D)   │  │
│  └──────────┘    └──────┬───────┘    └───────┬───────┘  │
│                         │                     │          │
│  ┌──────────┐           │                     ▼          │
│  │ 状态估计  │───────────┘              ┌───────────────┐ │
│  │ x = [Θ,p,│    ▲                     │ τ = J^T · f   │ │
│  │  ω,ṗ,g]  │    │ ~30 Hz              │ 关节力矩映射   │ │
│  └──────────┘    │                     └───────┬───────┘ │
│       ▲          │                             │         │
│       │     ┌────┴──────┐                      ▼         │
│       └─────│ 参考轨迹   │              ┌───────────────┐ │
│             │ x_ref(t)  │              │ 关节 PD 控制器  │ │
│             └───────────┘              │ (~1 kHz)      │ │
│                                        └───────────────┘ │
└─────────────────────────────────────────────────────────┘
```

*图：Convex MPC 控制框架。上层 MPC 以低频（~30 Hz）求解最优地面反力，通过雅可比转置映射为关节力矩，下层关节 PD 控制器以高频（~1 kHz）执行。步态调度表决定每条腿的接触/摆动状态，摆动腿由独立的摆动腿控制器驱动。*

##### 算法伪代码

```python
# Convex MPC 核心求解流程
def convex_mpc_control(x_current, x_ref_trajectory, gait_table, dt, N_horizon):
    """
    x_current:        当前状态 [Θ, p, ω, ṗ, g]^T ∈ R^13
    x_ref_trajectory: 参考轨迹 (N_horizon 步)
    gait_table:       步态接触序列 (每条腿每步是否触地)
    dt:               离散时间步长 (~30ms)
    N_horizon:        预测步数 (~10)
    """
    # 1. 构建连续线性时变系统 ẋ = A_c * x + B_c * u
    A_c, B_c = build_continuous_dynamics(x_current)
    
    # 2. 离散化: x[k+1] = A_d * x[k] + B_d * u[k]
    A_d = matrix_exp(A_c * dt)          # 13×13
    B_d = A_c_inv @ (A_d - I) @ B_c    # 13×12
    
    # 3. 展开 N 步预测为批量 QP
    #    X_bar = A_bar * x_0 + B_bar * U_bar
    A_bar, B_bar = stack_prediction_matrices(A_d, B_d, N_horizon)
    
    # 4. 构造 QP 代价: min 0.5 * U^T H U + g^T U
    #    J = Σ_k ||x[k]-x_ref[k]||²_Q + ||u[k]||²_R
    H = 2 * (B_bar.T @ Q_bar @ B_bar + R_bar)
    g_vec = 2 * B_bar.T @ Q_bar @ (A_bar @ x_current - X_ref)
    
    # 5. 构造约束: 摩擦锥(金字塔) + 接触力非负 + 摆动腿力=0
    C_ineq, d_ineq = build_friction_pyramid(mu, f_z_max, gait_table, N_horizon)
    
    # 6. 求解 QP (使用 qpOASES)
    U_optimal = qpOASES_solve(H, g_vec, C_ineq, d_ineq)
    
    # 7. 取第一步最优力，通过雅可比转置映射到关节力矩
    f_feet = U_optimal[:12]             # 4 legs × 3D force
    for leg_i in range(4):
        tau[leg_i] = J_foot[leg_i].T @ f_feet[3*leg_i : 3*(leg_i+1)]
    
    return tau
```

##### 动机与背景：为什么需要 Convex MPC？

四足机器人的运动控制面临一个核心矛盾：**模型精度与计算效率的权衡**。

传统的全身动力学（Whole-Body Dynamics, WBD）方法考虑了机器人所有连杆的质量、惯性和关节约束，模型精确但维度极高（MIT Cheetah 3 有 18 个广义坐标），导致非线性优化问题难以实时求解——典型的非线性 MPC 求解一次需要数百毫秒甚至数秒。另一方面，简单的 ZMP（零力矩点）方法虽然计算快速，但仅适用于准静态或慢速行走，无法处理动态跑动中的飞行相（flight phase）。

Di Carlo 等人的关键洞察是：**对于四足机器人的动态运动，腿部质量仅占总质量的很小比例（Cheetah 3 约 10%），因此可以忽略腿部动力学，将整个机器人简化为一个受足端力驱动的单刚体**。这一简化使得：
1. 状态维度从 36+ 降至 13
2. 动力学方程可被线性化
3. 优化问题变为凸 QP，具有全局最优解和确定性求解时间

这种"用简化模型 + 高频重规划"替代"精确模型 + 低频求解"的思路，成为了此后四足机器人控制的主流范式。

##### 核心机制：单刚体动力学模型（SRBD）

系统状态向量定义为 13 维：

$$\mathbf{x} = \begin{bmatrix} \boldsymbol{\Theta} \\ \mathbf{p} \\ \boldsymbol{\omega} \\ \dot{\mathbf{p}} \\ g \end{bmatrix} \in \mathbb{R}^{13}$$

其中 \(\boldsymbol{\Theta} = [\phi, \theta, \psi]^T\) 为欧拉角（roll, pitch, yaw），\(\mathbf{p} \in \mathbb{R}^3\) 为质心位置，\(\boldsymbol{\omega} \in \mathbb{R}^3\) 为体坐标系角速度，\(\dot{\mathbf{p}} \in \mathbb{R}^3\) 为质心线速度，\(g\) 为重力加速度常数（作为状态的一部分以简化矩阵表示）。

控制输入为 4 条腿的地面反力（Ground Reaction Forces）：

$$\mathbf{u} = \begin{bmatrix} \mathbf{f}_1 \\ \mathbf{f}_2 \\ \mathbf{f}_3 \\ \mathbf{f}_4 \end{bmatrix} \in \mathbb{R}^{12}$$

牛顿-欧拉方程给出质心平动与转动动力学：

$$m \ddot{\mathbf{p}} = \sum_{i=1}^{4} \mathbf{f}_i + m\mathbf{g}$$

$$\frac{d}{dt}(\hat{\mathbf{I}} \boldsymbol{\omega}) = \sum_{i=1}^{4} (\mathbf{r}_i - \mathbf{p}) \times \mathbf{f}_i$$

其中 \(\mathbf{r}_i\) 为第 \(i\) 条腿足端在世界坐标系下的位置，\(\hat{\mathbf{I}} = R(\boldsymbol{\Theta}) \mathbf{I}_{body} R(\boldsymbol{\Theta})^T\) 为世界坐标系下的惯性张量。

> 💡 **关键洞察**：将惯性张量变换到世界坐标系后，角动量方程中的叉积项 \(\boldsymbol{\omega} \times \hat{\mathbf{I}} \boldsymbol{\omega}\)（陀螺力矩）在中低速运动下很小，可以忽略。这使得角动量方程简化为 \(\hat{\mathbf{I}} \dot{\boldsymbol{\omega}} = \sum \mathbf{r}_i \times \mathbf{f}_i\)，对控制输入 \(\mathbf{f}_i\) 是线性的。

##### 线性化与离散化

为将系统写成标准线性形式 \(\dot{\mathbf{x}} = \mathbf{A}_c \mathbf{x} + \mathbf{B}_c \mathbf{u}\)，论文做了以下关键近似：

**近似 1：欧拉角-角速度关系线性化。** 精确关系为：

$$\dot{\boldsymbol{\Theta}} = \begin{bmatrix} \cos\psi / \cos\theta & \sin\psi / \cos\theta & 0 \\ -\sin\psi & \cos\psi & 0 \\ \cos\psi \tan\theta & \sin\psi \tan\theta & 1 \end{bmatrix} \boldsymbol{\omega}$$

在小角度假设（\(\phi, \theta \approx 0\)）下近似为 \(\dot{\boldsymbol{\Theta}} \approx R_z(\psi) \boldsymbol{\omega}\)，其中 \(R_z(\psi)\) 为绕 z 轴的旋转矩阵。论文进一步在 yaw 角较小时近似为单位阵。

**近似 2：惯性张量冻结。** 在每个 MPC 求解周期内，将 \(\hat{\mathbf{I}}\) 在当前姿态处计算并固定为常数，不随状态变化。

**近似 3：忽略陀螺力矩。** 省略 \(\boldsymbol{\omega} \times \hat{\mathbf{I}} \boldsymbol{\omega}\) 项。

经过这些近似，连续系统矩阵为：

$$\mathbf{A}_c = \begin{bmatrix} \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & R_z(\psi) & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{I}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times1} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{g}_{vec} \\ \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & 0 \end{bmatrix}$$

$$\mathbf{B}_c = \begin{bmatrix} \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} \\ \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} & \mathbf{0}_{3\times3} \\ \hat{\mathbf{I}}^{-1}[\mathbf{r}_1]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_2]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_3]_\times & \hat{\mathbf{I}}^{-1}[\mathbf{r}_4]_\times \\ \mathbf{I}/m & \mathbf{I}/m & \mathbf{I}/m & \mathbf{I}/m \\ \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} & \mathbf{0}_{1\times3} \end{bmatrix}$$

其中 \([\mathbf{r}_i]_\times\) 为力臂向量 \((\mathbf{r}_i - \mathbf{p})\) 的反对称矩阵。

离散化通过矩阵指数完成：

$$\mathbf{A}_d = e^{\mathbf{A}_c \Delta t}, \quad \mathbf{B}_d = \mathbf{A}_c^{-1}(\mathbf{A}_d - \mathbf{I})\mathbf{B}_c$$

> ⚠️ **注意**：这些近似之所以在实践中有效，是因为 MPC 以 ~30 Hz 频率重新求解。每个求解周期内姿态变化仅约 1°，线性化误差很小，且会在下一周期被自动修正。这种"频繁重规划"策略是 MPC 鲁棒性的核心来源。

##### QP 构造与摩擦锥约束

将 \(N\) 步预测窗口展开为批量形式 \(\bar{\mathbf{X}} = \bar{\mathbf{A}} \mathbf{x}_0 + \bar{\mathbf{B}} \bar{\mathbf{U}}\)，代入二次代价函数后得到标准 QP：

$$\min_{\bar{\mathbf{U}}} \quad \frac{1}{2} \bar{\mathbf{U}}^T \mathbf{H} \bar{\mathbf{U}} + \mathbf{g}^T \bar{\mathbf{U}}$$

$$\text{s.t.} \quad \mathbf{C} \bar{\mathbf{U}} \leq \mathbf{d}$$

其中 \(\mathbf{H} = 2(\bar{\mathbf{B}}^T \bar{\mathbf{Q}} \bar{\mathbf{B}} + \bar{\mathbf{R}})\)，决策变量 \(\bar{\mathbf{U}} \in \mathbb{R}^{12N}\) 为 \(N\) 步的足端力序列。

**摩擦锥的金字塔近似：** 物理摩擦锥约束为二阶锥（SOCP）：

$$\sqrt{f_x^2 + f_y^2} \leq \mu f_z, \quad f_z \geq 0$$

为保持 QP 形式，论文将其近似为内接金字塔的 4 个线性不等式加上法向力上下界：

$$\begin{cases} f_x + \mu f_z \geq 0 \\ -f_x + \mu f_z \geq 0 \\ f_y + \mu f_z \geq 0 \\ -f_y + \mu f_z \geq 0 \\ f_z \geq 0 \\ f_z \leq f_{z,\max} \end{cases}$$

对于摆动腿（swing phase），直接将对应的 \(f_{z,\max} = 0\) 强制该腿力为零。这通过步态调度表在每个时间步自动设定。

##### 步态调度与多步态支持

论文提出了一种极其简洁的步态表示方法——**步态调度表（Gait Table）**。每种步态由一个二值矩阵定义，行对应 4 条腿（FR, FL, HR, HL），列对应步态周期内的离散时间步：

| 步态 | 特征 | 占空比 | 典型周期 |
|------|------|--------|---------|
| **Trot** | 对角腿同步 | 50% | ~0.36s |
| **Bound** | 前/后腿对同步 | 50% | ~0.36s |
| **Pace** | 同侧腿同步 | 50% | ~0.36s |
| **Pronk** | 四腿同步 | 50% | ~0.36s |
| **Gallop** | 四腿依次着地 | ~65% | ~0.36s |

MPC 在每个求解周期读取当前步态相位，确定未来 \(N\) 步的接触序列，据此设置力约束。这种设计使得**切换步态只需更换步态表**，无需修改控制器结构或重新调参。

##### 与传统方法的对比

| 特性 | ZMP 方法 | 全身非线性 MPC | **Convex MPC** |
|------|----------|---------------|----------------|
| 模型维度 | 低 (2-3D) | 高 (36+) | 中 (13) |
| 动态步态支持 | ✗ | ✓ | ✓ |
| 实时性 (~30Hz) | ✓ | ✗ (~1s/次) | ✓ (<1ms/次) |
| 飞行相建模 | ✗ | ✓ | ✓ |
| 凸性保证 | ✓ | ✗ | ✓ |
| 全局最优 | ✓ | 局部最优 | ✓ |
| 地形适应 | 有限 | 强 | 中等 |

> 💡 **核心优势总结**：Convex MPC 在保留动态运动能力的同时，通过单刚体近似和线性化将问题转化为凸 QP，获得了全局最优解和确定性的求解时间。其代价是忽略了腿部动力学和接触时序优化（落脚点由启发式规则预先确定），这些限制在后续工作（如 WBC、DRL 等）中被逐步解决。

##### 实验结果与影响

论文在 MIT Cheetah 3（四足机器人，约 45 kg）上验证了以下能力：

- **多步态运动**：Trot（最高 ~3 m/s）、Bound、Pace、Pronk、Gallop 均实现稳定运动
- **外部扰动恢复**：在 trot 行走中施加侧向推力（~100 N），MPC 自动调整足端力分配实现平衡恢复
- **求解性能**：10 步预测窗口，QP 决策变量 120 维（12×10），约束 200 个，使用 qpOASES 求解器平均求解时间 < 1 ms
- **后续影响**：该方法被广泛应用于 MIT Mini Cheetah、Unitree A1/Go1、ANYmal 等平台，成为四足机器人控制的标准基线方法

#### 🧪 练习题
```yaml
question: "Convex MPC 将四足机器人动力学简化为单刚体模型时，做了哪项关键假设使得优化问题变为凸 QP？"
options:
  - "假设地面完全刚性且摩擦系数无穷大"
  - "忽略腿部质量与惯性，并对旋转动力学进行线性化近似"
  - "假设机器人始终保持静态平衡，不存在飞行相"
  - "将连续时间系统直接替换为离散时间系统，无需近似"
answer: 1
explain: "单刚体动力学模型（SRBD）忽略腿部质量（仅占 ~10%），并通过冻结惯性张量、小角度近似欧拉角-角速度关系、忽略陀螺力矩等线性化手段，将非线性动力学转化为线性时变系统，从而使 MPC 问题成为可实时求解的凸 QP。"
```

### WB-MPC

```yaml
id: wb_mpc
num: 7
name: WB-MPC
full_name: 全身模型预测控制 (Whole-Body MPC)
year: '2022'
org: LAAS-CNRS
parent: convex_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/10000129
project_url: ''
category: mpc
motivation: 全身动力学MPC控制人形机器人
```

#### 📝 一句话总结
WB-MPC 将人形机器人的全身状态、关节运动、接触和浮动基动力学放入同一个滚动时域优化中，解决了传统“简化模型 MPC + 下层 WBC”之间动态不一致的问题。Dantec 等人在 torque-controlled Talos 上展示了用全身模型预测控制直接生成双足步态的可行性。

#### 🎯 核心要点
- **全身模型进入预测时域**：优化变量包含浮动基、关节位置/速度、控制输入和接触相关量，而非只优化质心或单刚体
- **减少层级不一致**：高层轨迹不再由低维模型单独生成，降低下层 WBC 跟踪时发现不可行动作的风险
- **DDP/Crocoddyl 系列求解**：利用多体动力学导数和轨迹优化结构，在有限时域内滚动求解非线性最优控制
- **接触序列驱动步态**：给定左右脚接触相位后，优化器同时决定身体和关节如何穿过这些相位
- **真实人形机器人验证**：面向 torque-controlled Talos 等平台，强调在线重规划与物理部署
- **计算成本高但表达强**：相比 Convex MPC 更难实时，但能处理关节限位、姿态、全身惯量和动力学耦合

#### 🔬 深入细节
##### 核心示意图

![后续公开 WB-MPC 结构示意](https://ar5iv.labs.arxiv.org/html/2505.19540v1/assets/x1.png)
*图：全身/类全身 MPC 的模型结构示意。目标 IEEE 论文页面无稳定开放图片直链，这里采用后续公开 WB-MPC 论文图源说明“全身状态进入 MPC 预测模型”的核心思想。*

##### 算法伪代码

```python
# Whole-Body MPC 的滚动时域控制
def whole_body_mpc(q, v, contact_schedule, task_command, previous_solution):
    # q, v: 浮动基 + 全部关节状态
    problem = ShootingProblem()

    for k, contact_mode in enumerate(contact_schedule):
        model = full_rigid_body_dynamics(contact_mode)
        cost = 0
        cost += w_base * base_tracking_cost(k, task_command)
        cost += w_feet * swing_foot_clearance_cost(k, contact_mode)
        cost += w_posture * joint_posture_regularization(k)
        cost += w_control * torque_or_acceleration_regularization(k)
        constraints = [
            contact_consistency(contact_mode),
            joint_limits(),
            friction_or_contact_force_limits(),
        ]
        problem.add_stage(model, cost, constraints)

    # warm-start 上一次解，求解全身非线性 OCP
    solution = ddp_or_sqp_solve(problem, warm_start=previous_solution)

    # 执行第一步关节命令，下一周期重规划
    return solution.torque[0], solution
```

##### 动机与背景

经典人形步态系统通常分为三层：LIPM/Preview Control 规划 CoM 和 ZMP，全身控制器把轨迹转成关节加速度或力矩，低层伺服执行。这种架构清晰高效，但存在结构性问题：高层简化模型可能产生下层全身动力学无法精确实现的轨迹，下层只能用投影、QP 或反馈尽量修补。

WB-MPC 的目标是把这种分裂合并。既然真实机器人最终受全身多体动力学支配，那么预测模型也应尽量使用全身状态。这样优化器在规划未来几步时就知道关节限位、身体姿态、腿部运动和接触切换的代价，不会事后才发现某个 CoM 轨迹需要不可能的关节动作。

##### 全身最优控制问题

浮动基机器人状态可写为：

$$
\mathbf{x} =
\begin{bmatrix}
\mathbf{q} \\
\mathbf{v}
\end{bmatrix}
$$

其中 \(\mathbf{q}\) 包含基座位姿和全部关节角，\(\mathbf{v}\) 包含基座速度和关节速度。连续全身动力学为：

$$
M(\mathbf{q})\dot{\mathbf{v}} + h(\mathbf{q},\mathbf{v})
= S^T\boldsymbol{\tau} + J_c(\mathbf{q})^T\boldsymbol{\lambda}
$$

接触约束为：

$$
J_c(\mathbf{q})\dot{\mathbf{v}} + \dot{J}_c(\mathbf{q},\mathbf{v})\mathbf{v}=0
$$

WB-MPC 在有限时域内求解：

$$
\min_{\mathbf{x}_{0:N}, \mathbf{u}_{0:N-1}}
\sum_{k=0}^{N-1}\ell_k(\mathbf{x}_k,\mathbf{u}_k)
+ \ell_N(\mathbf{x}_N)
$$

$$
\text{s.t.}\quad
\mathbf{x}_{k+1}=f_k(\mathbf{x}_k,\mathbf{u}_k),\quad
\mathbf{g}_k(\mathbf{x}_k,\mathbf{u}_k)\le 0
$$

这里 \(f_k\) 随接触模式变化。相比只优化质心，WB-MPC 的状态维度高得多，但每个候选轨迹都更接近真实机器人可执行运动。

##### 代价函数设计

全身 MPC 的代价通常由多项组成：

- 基座姿态和速度跟踪：让机器人朝期望方向行走
- 摆动脚轨迹/清障：防止拖脚并控制落脚相位
- 关节姿态正则：避免奇异姿态和关节限位附近运动
- 控制平滑：惩罚力矩、加速度或其变化率
- 接触稳定：约束或惩罚非法接触力、脚底滑动和冲击

> 💡 关键：WB-MPC 的优势不是某个单独代价项，而是这些目标在同一个预测问题中同时权衡。躯干摆动、膝关节弯曲和脚步清障会自然互相影响。

##### 求解与实时性

全身非线性 OCP 的计算量远高于 Convex MPC。论文所处的技术背景包括 Crocoddyl、DDP/FDDP、快速刚体动力学导数和 warm-start。实际部署时，控制器通常不会从零开始求解，而是把上一周期轨迹平移作为初值，并只执行第一步命令。

这种 receding horizon 方式带来两个好处：一是扰动可在下一周期被重新吸收；二是求解器不必每次完全收敛到高精度，只要得到足够好的下降方向即可控制真实机器人。代价是工程实现对模型、时间同步和状态估计非常敏感。

##### 与 Convex MPC / WBC 的区别

Convex MPC 常用单刚体或质心动力学，将足端力优化成 QP，实时性强但忽略关节运动细节；WBC 通常是瞬时 QP，只看当前时刻如何实现任务；WB-MPC 则在未来时域内同时考虑全身动力学和任务演化。

| 方法 | 预测模型 | 计算速度 | 表达能力 | 典型问题 |
|------|----------|----------|----------|----------|
| Preview/LIPM | 固定高度质点 | 很快 | 低 | 高层简化过强 |
| Convex MPC | 单刚体/质心 | 快 | 中 | 关节可行性依赖下层 |
| WBC | 全身瞬时模型 | 快 | 中高 | 缺少未来规划 |
| WB-MPC | 全身时域模型 | 慢 | 高 | 实时求解困难 |

WB-MPC 的研究意义在于证明“全身模型直接滚动优化”正在从离线轨迹优化走向真实机器人在线控制。随着求解器和硬件进步，它逐渐成为人形机器人复杂运动的重要方向。

#### 🧪 练习题
```yaml
question: "WB-MPC 相比“简化模型 MPC + 下层 WBC”的核心优势是什么？"
options:
  - "完全不需要状态估计"
  - "在预测时域内直接考虑全身动力学和关节约束，减少高低层轨迹不一致"
  - "一定比 Convex MPC 计算更快"
  - "只适用于静态站立"
answer: 1
explain: "WB-MPC 将浮动基、关节和接触动力学纳入同一优化问题，规划阶段就能考虑全身可行性，而不是交给下层事后修正。"
```

### Perceptive NMPC

```yaml
id: perceptive_nmpc
num: 8
name: Perceptive NMPC
full_name: 感知非线性MPC (Perceptive Nonlinear MPC)
year: '2023'
org: ETH Zurich
parent: convex_mpc
paper_url: https://ieeexplore.ieee.org/abstract/document/10138309
project_url: ''
category: mpc
motivation: 结合地形感知的非线性MPC
```

#### 📝 一句话总结
本文提出了一种三层感知运动控制框架：通过将地形高程图预处理为可踏性分类、凸多边形脚点约束和有符号距离场（SDF）碰撞约束，构建包含全关节自由度的非线性 MPC 问题，并采用多重打靶 + 实时迭代（RTI）策略高效求解，使四足机器人 ANYmal 能够以多种步态自主穿越台阶、间隙、踏石等复杂地形。

#### 🎯 核心要点
- **三层异步架构**：感知层（20 Hz）预计算地形表示 → NMPC（100 Hz）全身轨迹优化 → WBC（400 Hz）力矩跟踪执行
- **地形感知管线**：高程图 → 可踏性分类（法向量 + 粗糙度阈值）→ 连通域 + RANSAC 平面分割 → 内接凸多边形提取 → 3D 体素 SDF 计算
- **全自由度 NMPC**：状态包含 6-DOF 基座 + 12 关节角 + 速度 + 接触力（共 72 维），采用单刚体 + 质心动力学模型
- **凸多边形脚点约束**：将可踏区域的凸内近似编码为半空间不等式，直接约束 MPC 中的落脚点位置
- **SDF 碰撞避障**：在膝关节和摆动足处评估预计算的 SDF，通过 relaxed barrier 函数编码为软约束
- **Loopshaping 平滑策略**：将接触力和关节速度提升为状态变量，引入辅助输入（力/速度的导数）并施加二次代价，保证力和速度的时间连续性
- **数值求解**：多重打靶离散化 + SQP 实时迭代 + HPIPM QP 求解器 + 简化 filter line-search，单次求解约 3.5 ms
- **WBC 执行层**：单 QP 全身控制器 + CBF 关节限位 + 事件驱动接触反馈（提前/延迟触地处理）
- **实验验证**：ANYmal C/D 在仿真和实机上以 trot/pace/walk/gallop 多种步态穿越台阶、间隙、踏石、碎石和户外山径

#### 🔬 深入细节
##### 系统总览

![系统总览](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x1.jpg)
*图 1：系统总览。左：ANYmal 在踏石上行走；右：三层控制架构示意——感知层异步预处理地形信息，MPC 层进行全身轨迹优化，WBC 层执行力矩跟踪。*

本文的核心思想是：**将地形感知信息转化为优化友好的数学约束**，使得非线性 MPC 能够同时优化脚点选择、碰撞避障和欠驱动系统动力学，而无需手工设计启发式规则。

##### 1. 感知层：从高程图到优化约束

![感知管线](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x2.png)
*图 2：感知处理管线。高程图 → 可踏性分类 → 平面分割 → 凸多边形 → SDF。*

感知层以 20 Hz 异步运行，将原始高程图（4 cm 分辨率）逐步转化为 MPC 可直接使用的约束：

**Step 1 — 可踏性分类**：对每个高程图像素计算局部表面法向量和粗糙度，通过阈值判定是否可踏。法向量偏离重力方向过大或粗糙度过高的区域被标记为不可踏。

**Step 2 — 平面分割**：对可踏区域进行连通域分析，将相连的可踏像素聚类为候选区域。对每个连通域使用 RANSAC 拟合平面参数 \((n, d)\)，获得局部地形平面。

**Step 3 — 凸多边形提取**：对每个分割平面计算其内接凸多边形（inscribed convex polygon），表示为半空间交集：

$$\mathcal{P}_j = \{ p \in \mathbb{R}^3 \mid A_j p \leq b_j,\ n_j^\top p = d_j \}$$

其中 \(A_j, b_j\) 定义凸多边形边界，\(n_j, d_j\) 定义平面方程。这一凸内近似保证了约束的凸性，使 MPC 求解更加可靠。

**Step 4 — SDF 计算**：在机器人周围的 3D 体素网格上计算有符号距离场。利用高程图的 2.5D 特性，先沿 z 方向解析计算距离，再沿 x、y 方向执行 2D 距离变换（基于 Felzenszwalb & Huttenlocher 的线性时间算法），总复杂度为 \(O(N)\)。

> 💡 **关键设计**：凸内近似（而非凸外近似）确保优化器找到的脚点一定位于可踏区域内，牺牲少量可行域面积换取安全性保证。

##### 2. NMPC 公式化

![状态定义](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/figures/stateDefinition.jpg)
*图：全身状态定义。包含基座位姿、关节角度、广义速度和接触力。*

**状态空间**：与传统 convex MPC 仅优化基座状态不同，本文将全部关节角纳入优化：

$$x = \begin{bmatrix} \theta_{base} \\ q_{joints} \\ v_{base} \\ \dot{q}_{joints} \\ \lambda_1, \ldots, \lambda_k \end{bmatrix} \in \mathbb{R}^{72}$$

其中 \(\theta_{base} \in \mathbb{R}^6\) 为基座位姿（位置 + ZYX 欧拉角），\(q_{joints} \in \mathbb{R}^{12}\) 为关节角，\(\lambda_i \in \mathbb{R}^3\) 为各接触点力。

**动力学模型**：采用单刚体近似——忽略腿部惯量对质心动力学的影响，但保留完整的运动学：

$$\dot{p} = v, \quad M\dot{v} = \sum_i \lambda_i + Mg$$

$$\dot{L} = \sum_i (p_i - p_{com}) \times \lambda_i$$

其中 \(M\) 为总质量，\(L\) 为角动量，\(p_i\) 为足端位置（通过正运动学从关节角计算）。关节速度通过运动学约束与基座速度耦合。

**Loopshaping 平滑化**：为避免接触力和关节速度在时间上出现不连续跳变，将它们提升为状态变量，引入辅助输入 \(u_{aux}\) 作为其时间导数：

$$\dot{\lambda}_i = u_{\lambda,i}, \quad \ddot{q}_{joints} = u_q$$

对 \(u_{aux}\) 施加二次代价 \(\|u_{aux}\|_R^2\)，等价于对力和速度施加平滑性正则化。

##### 3. 约束体系

**脚点约束**：对每只脚在每个接触相位，从预计算的凸多边形集合中选择最近的可踏多边形，将其半空间约束施加于足端位置：

$$A_j \cdot p_{foot}(q) \leq b_j$$

这里 \(p_{foot}(q)\) 是通过正运动学从关节角计算的足端位置，因此约束是关于状态 \(x\) 的非线性函数。

**碰撞避障**：在膝关节和摆动足处放置碰撞球体，评估预计算的 SDF 值：

$$\text{SDF}(p_{collision}(q)) \geq d_{margin}$$

**摩擦锥**：在局部地形平面坐标系下施加平滑化摩擦锥约束：

$$\sqrt{f_t^2 + f_s^2 + \epsilon^2} \leq \mu f_n$$

其中 \(f_t, f_s\) 为切向力分量，\(f_n\) 为法向力，\(\mu\) 为摩擦系数，\(\epsilon\) 为平滑化参数。

**Relaxed Barrier 函数**：所有不等式约束通过 relaxed log-barrier 函数转化为代价项：

$$B_\mu(h) = \begin{cases} -\mu \ln(h) & \text{if } h > \delta \\ \frac{1}{2}\mu\left(\frac{h - 2\delta}{\delta}\right)^2 - \mu \ln(\delta) & \text{if } h \leq \delta \end{cases}$$

当约束 \(h > \delta\) 时为标准对数障碍，当 \(h \leq \delta\) 时切换为二次外罚。参数 \(\mu\) 控制障碍强度，\(\delta\) 控制切换点。这种设计允许优化器从不可行初始点启动，同时在可行域内提供强约束。

> ⚠️ **与 convex MPC 的关键区别**：convex MPC 仅优化基座轨迹和接触力，脚点位置由启发式规则（如 Raibert heuristic）预先确定。本文的 NMPC 将脚点选择纳入优化变量，通过凸多边形约束让优化器自主决定最优落脚位置。

##### 4. 参考轨迹与摆动腿规划

![摆动轨迹](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x8.png)
*图：五次样条摆动轨迹示意。*

**名义脚点**：基于当前速度指令和步态时序，计算名义落脚位置，然后将其投影到最近的分割平面上。

**摆动轨迹**：使用五次样条（quintic spline）连接抬脚点和落脚点，中间经过一个抬腿高度控制点。五次样条保证位置、速度、加速度的连续性，为 MPC 提供平滑的参考轨迹。

**终端代价**：通过在参考轨迹终点线性化系统并求解连续时间 Riccati 方程，获得 LQR 终端代价矩阵 \(P\)：

$$V_f(x) = \frac{1}{2} \|x - x_{ref}\|_P^2$$

这为有限时域 MPC 提供了无限时域近似，改善了闭环稳定性。

##### 5. 数值求解策略

```
算法：Perceptive NMPC 实时迭代求解

输入：当前状态 x₀，地形约束（凸多边形、SDF），步态时序
输出：最优控制序列 u*₀, ..., u*_{N-1}

1. 初始化：用上一时刻解做时间平移（warm-start）
2. 离散化：多重打靶，N 个射击区间，RK2 积分，零阶保持输入
3. 构建 NLP：
   min  Σᵢ ℓ(xᵢ, uᵢ) + Σᵢ B_μ(hᵢ(xᵢ)) + V_f(x_N)
   s.t. xᵢ₊₁ = F(xᵢ, uᵢ)           (射击约束)
        g(xᵢ, uᵢ) = 0               (接触互补、运动学)
4. SQP 迭代（仅 1 步 = 实时迭代）：
   a. 线性化动力学和约束 → QP 子问题
   b. 等式约束投影：消除部分变量，缩减 QP 规模
   c. HPIPM 求解 QP → 搜索方向 Δx, Δu
   d. Filter line-search 确定步长 α：
      - 分支 1：满足 Armijo + filter 条件 → 接受
      - 分支 2：不满足但改善约束违反 → 接受
      - 分支 3：都不满足 → 缩小步长重试
5. 更新解：x ← x + αΔx, u ← u + αΔu
6. 输出 u*₀ 和 Riccati 反馈增益 K₀
```

**关键实现细节**：

- **多重打靶 vs iLQR**：实验表明多重打靶（MS）在处理不等式约束时显著优于 iLQR。iLQR 在踏石场景中高速运动时频繁发散，而 MS 始终稳定收敛。根本原因是 iLQR 的单打靶结构在约束激活时缺乏足够的数值稳定性。
- **并行化**：各射击区间的动力学积分和线性化可并行执行，充分利用多核 CPU。
- **求解时间**：在 ANYmal 的机载 Intel i7 处理器上，单次 MPC 求解约 3.5 ms，远低于 10 ms 的控制周期。

##### 6. 全身控制器（WBC）

WBC 以 400 Hz 运行，将 MPC 输出的状态-力矩轨迹转化为关节力矩指令：

$$\min_{\tau, \lambda, \ddot{q}} \| \text{tracking errors} \|^2 \quad \text{s.t.} \quad M\ddot{q} + h = S^\top \tau + J^\top \lambda$$

采用**单 QP**（非分层）求解，同时跟踪 MPC 的加速度、力和摆动轨迹参考。关节限位通过**控制障碍函数（CBF）**编码，保证关节角始终在安全范围内。

**事件驱动接触反馈**：当检测到提前触地（摆动相中足端接触）时，立即将该腿切换为支撑相；当检测到延迟触地（预期接触时刻未检测到接触）时，延长摆动相并降低足端高度。这种反应式机制弥补了感知误差和模型不确定性。

##### 7. 实验结果

![障碍课程](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x13.png)
*图：仿真障碍课程。ANYmal 以 0.8 m/s 的 trot 步态穿越斜坡、间隙、踏石和碎石地形。*

![硬件实验](https://ar5iv.labs.arxiv.org/html/2208.08373/assets/x16.jpg)
*图：硬件实验。ANYmal 穿越斜坡、间隙和大台阶。底部显示高程图、MPC 足端轨迹和凸多边形脚点约束。*

**仿真验证**：
- 踏石场景：以 trot（0.5 m/s）、pace（0.4 m/s）、walk（0.25 m/s）成功穿越，MS 求解器在所有速度下稳定，iLQR 在 0.3 m/s 以上发散
- 台阶场景：以 trot/pace/walk/static walk 四种步态上下 18.5 cm 高台阶，自动决定跨步/重复/跳步
- 障碍课程：连续穿越斜坡、间隙、踏石、碎石，trot 0.8 m/s 完成全程
- 对比 RL：RL 控制器在踏石和窄通道上失败，因其策略本质上是反应式的，缺乏长时域规划能力

**硬件验证（ANYmal C/D）**：
- 斜坡 + 间隙 + 大台阶组合障碍
- 20×20 cm 不规则踏石（每级高 20 cm）
- 户外森林山径徒步
- 动态步态（gallop、带飞行相的 trot）在平地上验证

> 💡 **核心发现**：所有运动行为均从优化中自动涌现，无需针对特定地形或步态的手工参数调整。同一套参数适用于所有测试场景。

#### 🧪 练习题
```yaml
question: "本文将可踏地形区域编码为凸多边形约束时，为什么选择凸内近似（inscribed polygon）而非凸外近似（circumscribed polygon）？"
options:
  - "凸内近似的计算速度更快"
  - "凸内近似保证优化器找到的脚点一定位于实际可踏区域内，确保安全性"
  - "凸外近似无法用半空间不等式表示"
  - "凸内近似能覆盖更大的可踏面积"
answer: 1
explain: "凸内近似（inscribed polygon）是可踏区域的子集，因此满足凸多边形约束的任何脚点必然位于可踏区域内。凸外近似虽然覆盖面积更大，但可能包含不可踏的区域，导致优化器选择危险的落脚点。"
```

### PPO

```yaml
id: ppo
num: 9
name: PPO
full_name: 近端策略优化 (Proximal Policy Optimization)
year: '2017'
org: OpenAI
parent: —
paper_url: https://arxiv.org/abs/1707.06347
project_url: ''
category: rl_locomotion
motivation: 策略梯度优化基准算法
```

#### 📝 一句话总结
PPO 提出了用裁剪替代 TRPO 硬信赖域约束的策略梯度算法，解决了普通 policy gradient 更新过大易崩溃、TRPO 实现复杂的问题。它用简单的一阶优化就能多轮复用 on-policy rollout，成为机器人运动控制和 RLHF 中最常用的稳定基线之一。

#### 🎯 核心要点
- **裁剪代理目标**：通过 \(\text{clip}(r_t,1-\epsilon,1+\epsilon)\) 限制新旧策略概率比
- **近端更新思想**：保留 TRPO “不要让新策略离旧策略太远”的核心，但去掉二阶约束求解
- **多 epoch 小批量优化**：同一批 rollout 可进行多轮 minibatch SGD，提高样本利用率
- **Actor-Critic 结构**：策略网络输出动作分布，价值网络估计 \(V(s)\) 用于优势函数
- **GAE 常用搭配**：用 generalized advantage estimation 在偏差和方差间折中
- **联合损失**：实践中常组合 policy loss、value loss 和 entropy bonus
- **广泛适配连续控制**：MuJoCo locomotion、四足/人形 sim-to-real 和大规模并行仿真常以 PPO 为默认优化器

#### 🔬 深入细节
##### 核心示意图

![PPO-Clip 目标函数](https://spinningup.openai.com/en/latest/_images/math/99621d5bcaccd056d6ca3aeb48a27bf8cc0e640c.svg)
*图：PPO-Clip 的核心目标函数。PPO 原论文主要给出算法和实验曲线，这里使用 OpenAI Spinning Up 的公开公式图说明裁剪机制。*

##### 算法伪代码

```python
# PPO-Clip 训练循环
for iteration in range(num_iterations):
    trajectories = collect_rollouts(policy_old, envs, horizon)
    advantages, returns = compute_gae(trajectories, value_fn)

    # 固定旧策略概率，重复优化同一批 on-policy 数据
    old_logp = trajectories.logp.detach()
    for epoch in range(K):
        for batch in minibatches(trajectories):
            logp = policy.log_prob(batch.obs, batch.actions)
            ratio = exp(logp - old_logp[batch.indices])

            unclipped = ratio * batch.advantages
            clipped = clip(ratio, 1 - eps, 1 + eps) * batch.advantages
            policy_loss = -mean(min(unclipped, clipped))

            value_loss = mse(value_fn(batch.obs), batch.returns)
            entropy_bonus = mean(policy.entropy(batch.obs))
            loss = policy_loss + c1 * value_loss - c2 * entropy_bonus

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

    policy_old.load_state_dict(policy.state_dict())
```

##### 动机与背景

策略梯度方法直接优化 \(\pi_\theta(a|s)\)，适合连续动作控制，但更新步长非常敏感。如果某次梯度让策略概率分布变化过大，采样数据来自旧策略，而优化目标却评估新策略，训练会出现性能崩塌。TRPO 用 KL 约束限制策略变化，但需要 Fisher-vector product、共轭梯度和 line search，实现复杂且不够通用。

PPO 的核心工程判断是：不必精确求解信赖域约束，只要构造一个简单目标，让过大的概率比不再继续带来收益，就能达到类似稳定效果。这就是 PPO-Clip。

##### 裁剪目标函数

定义新旧策略概率比：

$$
r_t(\theta)=
\frac{\pi_\theta(a_t|s_t)}
{\pi_{\theta_{old}}(a_t|s_t)}
$$

普通策略梯度代理目标为：

$$
L^{PG}(\theta)=
\hat{\mathbb{E}}_t[r_t(\theta)\hat{A}_t]
$$

PPO-Clip 改为：

$$
L^{CLIP}(\theta)=
\hat{\mathbb{E}}_t
\left[
\min
\left(
r_t(\theta)\hat{A}_t,
\text{clip}(r_t(\theta),1-\epsilon,1+\epsilon)\hat{A}_t
\right)
\right]
$$

当 \(\hat{A}_t>0\) 时，动作比平均更好，策略应提高其概率；但若 \(r_t>1+\epsilon\)，说明提高过多，裁剪项变成上限，继续增大概率不再增加目标。当 \(\hat{A}_t<0\) 时，动作较差，策略应降低其概率；但若 \(r_t<1-\epsilon\)，降低过多也会被截断。

> 💡 关键：PPO 的 clip 不是直接限制参数变化，而是限制“采样动作概率比”带来的优化收益，从而间接抑制大步更新。

##### 完整训练目标

实践中 PPO 通常使用 actor-critic 联合损失：

$$
L_t^{PPO}(\theta)=
\hat{\mathbb{E}}_t
\left[
L_t^{CLIP}(\theta)
- c_1 L_t^{VF}(\theta)
+ c_2 S[\pi_\theta](s_t)
\right]
$$

其中价值损失为：

$$
L_t^{VF}(\theta)=
\left(V_\theta(s_t)-\hat{R}_t\right)^2
$$

熵项 \(S[\pi_\theta]\) 鼓励探索。优势函数常用 GAE：

$$
\hat{A}_t =
\sum_{l=0}^{\infty}(\gamma\lambda)^l\delta_{t+l}
$$

$$
\delta_t=r_t+\gamma V(s_{t+1})-V(s_t)
$$

\(\lambda\) 越接近 1，方差更高但偏差更低；越接近 0，更依赖价值函数，方差更低但偏差更高。

##### 训练/推理流程

PPO 是 on-policy 算法。每轮先用当前策略在环境中采集一批轨迹，保存状态、动作、奖励、done、旧 log probability 和价值估计；再计算 return 与 advantage；随后固定旧概率，使用多 epoch minibatch 更新策略和价值网络；更新后丢弃旧数据，重新采样。

在机器人 locomotion 中，PPO 常和大规模并行仿真结合：几千个环境同时 rollout，一次更新获得大量多样样本。动作通常是关节 PD 目标或残差，底层 PD 将其转成力矩。这个结构比直接输出力矩更稳定，也便于 sim-to-real。

##### 与 TRPO / 普通 PG 的区别

| 方法 | 更新约束 | 优化器 | 样本复用 | 实现复杂度 |
|------|----------|--------|----------|------------|
| Vanilla PG | 无显式约束 | 一阶 SGD | 低 | 低但不稳定 |
| TRPO | KL 硬约束 | 二阶近似 | 中 | 高 |
| PPO-Penalty | KL 软惩罚 | 一阶 Adam | 中 | 中 |
| PPO-Clip | 概率比裁剪 | 一阶 Adam | 中高 | 低 |

PPO 的主要局限是仍然 on-policy，样本效率低于 SAC/TD3 等 off-policy 方法；clip 也不是严格信赖域，超参数和奖励尺度仍会影响稳定性。但它的实现简单、吞吐高、鲁棒性好，因此成为运动控制论文中最常见的训练算法。

#### 🧪 练习题
```yaml
question: "PPO-Clip 中裁剪概率比 r_t(theta) 的主要作用是什么？"
options:
  - "强制价值函数输出为正数"
  - "限制新旧策略对采样动作的概率变化收益，避免单次策略更新过大"
  - "把 on-policy 算法变成 off-policy 算法"
  - "删除优势函数中的折扣因子"
answer: 1
explain: "裁剪目标在概率比超出 [1-epsilon, 1+epsilon] 且更新方向过激时截断收益，从而抑制破坏性大步更新。"
```

### Teacher-Student RL

```yaml
id: teacher_student
num: 10
name: Teacher-Student RL
full_name: 特权学习框架 (Privileged Learning Framework)
year: '2020'
org: ETH Zurich
parent: ppo
paper_url: https://www.science.org/doi/10.1126/scirobotics.abc5986
project_url: ''
category: rl_locomotion
motivation: 特权信息蒸馏实现零射Sim-to-Real迁移
```

#### 📝 一句话总结
Teacher-Student RL 先在仿真中训练可访问地形、接触和物理参数等特权信息的教师策略，再把其行为和潜变量蒸馏给仅使用本体感知历史的学生策略，解决了粗糙地形四足行走中真实部署无法获得完整环境状态的问题。该框架使 ANYmal 在泥地、雪地、碎石和植被等未仿真真实地形上实现零射迁移。

#### 🎯 核心要点
- **两阶段训练**：Teacher 用 RL 和 privileged information 学会粗糙地形运动，Student 用监督/DAgger 模仿 Teacher
- **特权信息编码**：Teacher 访问地形高度、足端接触、摩擦、外力等真实机器人部署时不可用信息
- **本体感知学生**：Student 只输入 IMU、关节状态、速度估计和历史序列，通过时间卷积推断隐含地形状态
- **自动地形课程**：用粒子滤波维护“既可通过又有挑战”的地形参数分布
- **PMTG 运动先验**：策略调制周期足端轨迹生成器，而不是从零输出全关节轨迹
- **零射 Sim-to-Real**：学生策略部署到 ANYmal B/C，无需真实微调即可穿越自然复杂地形
- **鲁棒反射行为涌现**：足部被卡、湿滑、负载变化等情况通过本体历史触发适应动作

#### 🔬 深入细节
##### 核心示意图

![Teacher-Student RL 方法总览](https://ar5iv.labs.arxiv.org/html/2010.11251/assets/x4.png)
*图：论文 Figure 4 展示两阶段训练、自动地形课程和控制架构。Teacher 使用特权信息训练，Student 通过本体感知历史模仿并部署到真实机器人。*

##### 算法伪代码

```python
# Privileged Teacher -> Proprioceptive Student
def train_teacher_student(env_generator):
    teacher = MLPPolicy(obs="proprioception + privileged_info")
    student = TCNPolicy(obs="history_of_proprioception")

    # Phase 1: teacher RL
    for iteration in range(num_teacher_updates):
        terrains = env_generator.sample_curriculum()
        rollouts = collect_rollouts(teacher, terrains)
        update_teacher_with_trpo_or_ppo(teacher, rollouts)
        env_generator.update_by_traversability(rollouts)

    # Phase 2: student distillation with DAgger
    replay = []
    for iteration in range(num_student_updates):
        rollouts = collect_rollouts(student, env_generator.sample_curriculum())
        for state in rollouts.states:
            target_action, target_latent = teacher.query_with_privileged_info(state)
            replay.append((state.proprioceptive_history, target_action, target_latent))
        loss = mse(student.action, target_action) + beta * mse(student.latent, target_latent)
        optimize(student, replay, loss)

    return student
```

##### 动机与背景

粗糙地形行走需要知道很多机器人本体传感器看不到的东西：脚下石块是否会滚动、泥地摩擦系数是多少、足端是否被草或障碍卡住、局部坡度和高度如何变化。直接训练一个只看本体感知的策略，奖励稀疏且状态部分可观测，学习难度很高。

但在仿真中，这些信息是可以免费读取的。Teacher-Student 框架利用这一点：让教师在“作弊”的全观测条件下先学会正确行为，再要求学生从真实可用的历史观测中推断教师的隐含判断。这是一种面向 sim-to-real 的 privileged learning。

##### Teacher 的 MDP

Teacher 状态可分为两部分：

$$
s_t^{T} = [o_t, p_t]
$$

其中 \(o_t\) 是真实机器人可测的本体信息，如机体姿态、速度、关节角、关节速度和命令方向；\(p_t\) 是特权信息，如地形扫描点、接触状态、接触力、摩擦系数和扰动力。Teacher 策略输出：

$$
a_t^T, z_t^T = \pi_T(o_t, p_t)
$$

\(z_t^T\) 是对特权环境的潜在表示，\(a_t^T\) 是对运动生成器的调制命令。论文中 Teacher 使用 RL 训练，目标是沿命令方向前进，同时保持稳定、平滑和不过度碰撞。

##### Student 蒸馏

Student 无法访问 \(p_t\)，只看到一段本体历史：

$$
h_t = [o_{t-H+1}, \ldots, o_t]
$$

学生策略为：

$$
a_t^S, z_t^S = \pi_S(h_t)
$$

训练损失通常包含动作模仿和潜变量模仿：

$$
\mathcal{L}_{student}
=
\|a_t^S-a_t^T\|_2^2
+ \beta \|z_t^S-z_t^T\|_2^2
$$

这使 Student 不只是复制动作，还学习从本体历史中重建教师对地形/接触状态的隐含估计。例如脚被台阶卡住时，关节速度、位置误差和机体姿态历史会留下信号，TCN 可以据此触发抬脚反射。

> 💡 关键：Student 并没有“看到地形”，但它通过时间序列推断地形对身体产生的影响。这是该方法能在无视觉条件下穿越复杂自然地形的核心。

##### 自动地形课程

训练地形如果太简单，策略不会学到适应能力；如果太难，RL 几乎得不到有效奖励。论文使用自适应课程：用地形参数生成不同难度样本，评估策略 traversability，把采样分布集中在“成功率中等”的区域。

可把地形参数记为 \(\theta\)，可通行性为：

$$
T(\theta, \pi)=
\mathbb{E}[\mathbf{1}(\text{trajectory succeeds})]
$$

期望采样那些 \(T\) 既不接近 0 也不接近 1 的 \(\theta\)。粒子滤波维护这些参数的分布，随着策略变强，地形难度自动上升。

##### 控制架构：PMTG + 残差

策略没有直接输出 12 个关节力矩，而是调制 Policies Modulating Trajectory Generators。每条腿有周期相位和足端轨迹生成器，策略输出频率偏置、相位调制和足端残差，再通过解析 IK 和关节 PD 控制执行。

这种设计把“周期步态”作为先验交给控制结构，RL 重点学习如何在复杂地形中调整步高、落脚和姿态。相比端到端力矩策略，它更容易训练，也更利于真实机器部署。

##### 与普通 Domain Randomization 的区别

域随机化只是在训练中随机物理参数，希望策略对变化不敏感；Teacher-Student 则把随机化后的隐藏因素显式提供给 Teacher，并把其适应方式蒸馏给 Student。前者强调鲁棒不变性，后者强调从观测历史中进行在线隐式辨识。

这也带来限制：Student 能推断的环境因素必须在本体历史中留下可观测痕迹。对于悬崖、远处障碍或需要提前规划的视觉任务，纯本体感知学生仍然不足，需要外感知模块扩展。

#### 🧪 练习题
```yaml
question: "Teacher-Student RL 中 Teacher 可以访问 privileged information 的主要作用是什么？"
options:
  - "让真实机器人部署时也读取仿真内部状态"
  - "降低训练难度并产生可模仿的适应行为，再蒸馏给只用真实可测本体感知的 Student"
  - "替代所有奖励函数"
  - "保证 Student 不需要历史观测"
answer: 1
explain: "Teacher 在仿真中利用地形、接触等特权信息学会适应策略，Student 通过模仿动作和潜变量，从本体历史中间接恢复这些信息。"
```

### AMP

```yaml
id: amp
num: 11
name: AMP
full_name: 对抗运动先验 (Adversarial Motion Priors)
year: '2021'
org: UC Berkeley
parent: ppo
paper_url: https://arxiv.org/abs/2104.02180
project_url: ''
category: rl_locomotion
motivation: 对抗学习模仿自然动作风格
```

#### 📝 一句话总结
AMP 用对抗判别器从非结构化动作片段中学习“运动是否自然”的风格奖励，解决传统模仿学习需要手工设计跟踪误差、动作片段选择和相位同步的问题。它把任务奖励与运动先验奖励结合，使物理角色能完成目标任务的同时呈现接近 mocap 数据的自然动作风格。

#### 🎯 核心要点
- **运动先验判别器**：训练 \(D(\cdot)\) 区分参考动作片段和策略生成动作，判别器输出转为 style reward
- **无需相位同步**：不要求策略逐帧跟踪某条参考轨迹，也不需要 motion planner 选择片段
- **任务奖励 + 风格奖励**：高层目标由简单 task reward 定义，低层自然性由 adversarial motion prior 提供
- **非结构化数据可用**：动作库可以包含跑、跳、翻滚、攻击等多种片段，不需要任务级标注
- **与 PPO 结合训练**：策略通过 RL 最大化混合奖励，判别器通过二分类对抗训练同步更新
- **技能组合涌现**：在障碍穿越、击打目标等任务中，策略可自动组合数据集中不同运动风格
- **稳定化设计**：使用状态转移特征、梯度惩罚/正则和 replay 机制改善 adversarial RL 稳定性

#### 🔬 深入细节
##### 核心示意图

![AMP 框架总览](https://ar5iv.labs.arxiv.org/html/2104.02180/assets/figures/overview.png)
*图：AMP 将运动数据集训练成 Motion Prior，输出风格奖励 \(r_t^S\)，再与任务奖励 \(r_t^G\) 合并训练策略。*

##### 算法伪代码

```python
# AMP adversarial RL loop
for iteration in range(num_iterations):
    # 1. 用当前策略采样物理角色轨迹
    sim_traj = collect_rollouts(policy, env)
    ref_traj = sample_motion_clips(motion_dataset)

    # 2. 更新判别器：参考动作为真，策略动作为假
    for batch in discriminator_batches(sim_traj, ref_traj):
        d_ref = D(batch.ref_motion_features)
        d_sim = D(batch.sim_motion_features)
        disc_loss = bce(d_ref, ones) + bce(d_sim, zeros)
        disc_loss += gradient_penalty(D, batch)
        optimize(D, disc_loss)

    # 3. 判别器输出转为风格奖励
    style_reward = -log(max(1 - D(sim_traj.motion_features), eps))
    task_reward = compute_task_reward(sim_traj)
    total_reward = w_g * task_reward + w_s * style_reward

    # 4. PPO 更新控制策略
    advantages = compute_gae(total_reward, value_fn)
    ppo_update(policy, value_fn, sim_traj, advantages)
```

##### 动机与背景

物理角色控制有两个目标：完成任务和动作自然。传统 tracking-based imitation 会让角色追踪某条参考动作，奖励中手工比较关节角、速度、末端位置和身体姿态。这对单一技能很有效，但面对包含多种动作的大型数据集时，需要额外机制选择当前该跟踪哪段动作，还要处理相位对齐和片段切换。

AMP 的观点是：如果我们只需要“看起来像这个动作库的风格”，就不必逐帧跟踪某条轨迹。可以训练一个判别器判断策略产生的局部动作是否像真实 mocap 片段，然后把判别器信号作为奖励。这样任务由环境奖励指定，风格由数据集隐式指定。

##### Motion Prior 判别器

AMP 不直接对完整轨迹判别，而是对局部运动特征 \(\mathbf{s}_t, \mathbf{s}_{t+1}\) 或其组合判别。判别器训练目标可写为：

$$
\mathcal{L}_D =
-\mathbb{E}_{\mathbf{m}\sim \mathcal{M}}
[\log D(\mathbf{m})]
-\mathbb{E}_{\mathbf{s}\sim \pi}
[\log(1-D(\mathbf{s}))]
+ \lambda \mathcal{R}_{gp}
$$

其中 \(\mathcal{M}\) 是参考动作数据分布，\(\pi\) 是当前策略生成分布。训练好的 \(D\) 越认为策略动作接近参考数据，style reward 越高。

常用风格奖励形式为：

$$
r_t^S =
-\log(1-D(\mathbf{s}_t,\mathbf{s}_{t+1}))
$$

若策略动作骗过判别器，\(D\) 接近 1，奖励变大；若动作明显不像参考数据，奖励变小。

##### 任务奖励与风格奖励结合

总奖励为：

$$
r_t =
w^G r_t^G + w^S r_t^S
$$

\(r_t^G\) 可以非常简单，例如向目标方向移动、到达目标、击中物体或越过障碍；\(r_t^S\) 则负责动作质量。两者分工后，用户不需要为“自然跑步”“翻滚落地”“出拳姿态”分别写复杂奖励。

> 💡 关键：AMP 的 motion prior 是任务无关的。换任务时可复用同一动作数据集和判别式风格奖励，只需替换高层任务奖励。

##### 与 GAIL / DeepMimic 的区别

GAIL 通常从专家状态-动作对中学习策略占用分布，适合任务和演示强绑定的场景。DeepMimic 通过明确 tracking reward 跟踪指定参考动作，需要相位变量和目标姿态。AMP 则从非结构化 motion clips 中学习局部风格分布，不要求知道当前任务应对应哪条 clip。

| 方法 | 数据要求 | 是否相位同步 | 奖励设计 | 多技能数据 |
|------|----------|--------------|----------|------------|
| DeepMimic | 指定参考动作 | 需要 | 手工 tracking | 需选择片段 |
| GAIL | 专家轨迹 | 通常任务绑定 | 判别器奖励 | 依赖演示覆盖 |
| AMP | 非结构化动作片段 | 不需要 | 对抗风格奖励 + 任务奖励 | 天然支持 |

##### 训练稳定性

对抗式 RL 容易不稳定：判别器太强会让策略得不到有效奖励，判别器太弱又无法提供风格约束。AMP 通过多个工程设计缓解，包括选择合适的运动特征、对判别器做正则、保持生成样本缓存、与 PPO 的熵和价值估计配合。

在运动控制中，AMP 的影响超出了动画角色。后续人形/四足机器人工作常把它视为“从数据中学习自然运动奖励”的模板，用于替代难以手写的姿态、步态和能耗风格项。

##### 推理阶段

训练完成后，部署只需要策略网络；判别器通常不参与推理。策略输入角色状态和任务目标，输出 PD 目标或关节动作。自然运动风格已经内化到策略参数中，因此运行时开销与普通 PPO 策略相近。

#### 🧪 练习题
```yaml
question: "AMP 相比逐帧 tracking-based imitation 的核心优势是什么？"
options:
  - "完全不需要动作数据"
  - "不需要为每个时刻选择并同步具体参考片段，可从非结构化动作库学习通用风格奖励"
  - "只能学习单一周期步态"
  - "部署时必须持续运行判别器"
answer: 1
explain: "AMP 用判别器学习动作分布的自然性，而不是逐帧匹配某条轨迹，因此能处理多技能、非结构化 motion clips。"
```

### Legged Gym

```yaml
id: legged_gym
num: 12
name: Legged Gym
full_name: 四足训练框架 (Legged Gym Framework)
year: '2021'
org: ETH Zurich
parent: ppo
paper_url: https://github.com/leggedrobotics/legged_gym
project_url: ''
category: rl_locomotion
motivation: GPU并行RL训练四足行走开源框架
```

#### 📝 一句话总结
Legged Gym 将 Isaac Gym 的 GPU 并行物理仿真、PPO 训练、地形课程、域随机化和四足机器人任务封装成开源训练框架，解决了 legged locomotion RL 训练慢、复现难和 sim-to-real 组件分散的问题。它把数千个机器人环境放在单 GPU 上并行 rollout，使 ANYmal 等四足策略能在几十分钟量级完成训练。

#### 🎯 核心要点
- **端到端 GPU pipeline**：物理仿真和 PyTorch 训练都在 GPU 上，减少 CPU-GPU 数据搬运瓶颈
- **大规模并行环境**：典型配置同时运行 2048-4096 个机器人，提高 PPO on-policy 样本吞吐
- **粗糙地形课程**：机器人从简单地形逐步推进到台阶、斜坡、离散障碍等更难地形
- **PPO + rsl_rl**：使用高吞吐 actor-critic PPO 作为默认训练算法
- **Sim-to-Real 组件齐全**：摩擦/质量随机化、观测噪声、随机推搡、执行器网络等提高真实迁移鲁棒性
- **任务配置模块化**：环境、奖励、机器人资产、控制参数通过配置类组织，便于迁移到新机器人
- **开源生态影响**：成为后续 legged RL、humanoid-gym、parkour、RMA/teacher-student 实验的重要基础设施

#### 🔬 深入细节
##### 核心示意图

![Legged Gym 大规模并行训练](https://ar5iv.labs.arxiv.org/html/2109.11978/assets/x1.png)
*图：Learning to Walk in Minutes 中的 Isaac Gym 大规模并行四足训练场景。Legged Gym 仓库提供了这类训练环境和 sim-to-real 组件。*

##### 算法伪代码

```python
# Legged Gym 风格的 PPO 训练循环
env = LeggedRobot(num_envs=4096, terrain_curriculum=True, domain_randomization=True)
policy = ActorCritic(obs_dim=env.num_obs, action_dim=env.num_actions)
runner = PPORunner(env, policy)

for iteration in range(max_iterations):
    obs = env.get_observations()
    rollout = []
    for t in range(num_steps_per_env):
        action = policy.act(obs)
        obs_next, reward, done, info = env.step(action)
        rollout.append((obs, action, reward, done, info))
        obs = obs_next

    advantages, returns = runner.compute_returns(rollout)
    runner.ppo_update(rollout, advantages, returns)
    env.update_terrain_curriculum()
    env.randomize_physics_if_needed()
```

##### 动机与背景

PPO 虽然稳定，但 on-policy 样本效率不高。传统 CPU 仿真一次只能跑几十到几百个环境，四足机器人需要数亿步交互，训练周期很长。Isaac Gym 的关键突破是把 PhysX 仿真和张量接口放到 GPU，Legged Gym 则把这个能力整理成专门面向腿式机器人的训练框架。

仓库 README 明确强调它提供训练 ANYmal 和其他腿式机器人的环境，并包括 sim-to-real 所需的执行器网络、摩擦和质量随机化、观测噪声、随机推搡等组件。配套论文 Learning to Walk in Minutes 进一步分析了并行机器人数量、batch size 和训练时间的关系。

##### 环境与观测动作设计

典型 Legged Gym 任务中，策略输入包括：

- 机体线速度和角速度
- 重力方向在机体系下的投影
- 速度命令
- 关节位置和速度
- 上一时刻动作
- 可选地形高度采样点

策略动作通常不是直接力矩，而是关节目标位置残差：

$$
\mathbf{q}^{target}_t =
\mathbf{q}^{default} + \alpha \mathbf{a}_t
$$

底层 PD 控制器生成力矩：

$$
\boldsymbol{\tau}
= K_p(\mathbf{q}^{target}-\mathbf{q})
- K_d\dot{\mathbf{q}}
$$

这种动作空间降低了探索难度，也让真实机器人部署更稳健。

##### 奖励函数

奖励通常是多项加权和：

$$
r =
w_v r_{velocity}
+ w_\omega r_{yaw}
- w_\tau \|\boldsymbol{\tau}\|^2
- w_{\Delta a}\|\mathbf{a}_t-\mathbf{a}_{t-1}\|^2
- w_c r_{collision}
+ w_s r_{survival}
$$

核心项鼓励跟踪线速度和角速度命令，惩罚非期望方向速度、姿态偏差、力矩、关节加速度、动作变化和身体碰撞。Legged Gym 的工程价值在于这些奖励和终止条件被组织成可配置函数，方便不同机器人复用。

> 💡 关键：Legged Gym 的贡献不只是“跑 PPO”，而是把可迁移的 locomotion 训练配方工程化，包括观测、动作、奖励、课程、随机化和日志。

##### 大规模并行与 PPO

在大规模并行下，每次 PPO 更新的 batch 来自许多短轨迹。论文观察到并行数并非越大越好：环境数太多而每个环境 rollout 太短时，单个机器人的时间相关经验不足，会影响学习；环境数太少则样本多样性和吞吐不足。实践中 2048-4096 个环境常是较好折中。

这种结构非常适合 GPU：所有机器人状态、动作、奖励和重置都以张量形式批处理，PPO 更新也在同一设备上完成。相比传统仿真，训练时间从天级缩短到分钟/小时级。

##### Sim-to-Real 机制

Legged Gym 默认集成多种迁移技巧：

- 摩擦系数随机化：让策略适应不同地面
- 质量和质心随机化：提高模型误差鲁棒性
- 观测噪声：模拟真实 IMU 和关节编码器误差
- 随机推搡：训练抗扰恢复能力
- 执行器网络：用神经网络近似 SEA/电机动态，弥合仿真 PD 与真实执行器差异

这些组件共同减少 reality gap。单独使用 PPO 往往只能得到仿真内高分策略；加入随机化和执行器建模后，策略更可能零射部署。

##### 与单篇算法论文的区别

Legged Gym 更像“可复现实验系统”而不是单一控制算法。其理论基础来自 PPO、域随机化、课程学习和 Isaac Gym GPU 仿真；贡献在于把这些要素组合成标准化、可扩展代码库。它降低了 legged RL 的进入门槛，也使后续论文能以统一平台比较奖励、观测和网络结构。

限制也很明确：框架依赖 Isaac Gym 预览版生态，任务仍需要大量奖励调参；学到的策略通常对训练命令分布和机器人形态敏感，迁移到人形或极端地形时需要改造环境、奖励和随机化设置。

#### 🧪 练习题
```yaml
question: "Legged Gym 能显著缩短四足 RL 训练时间的关键原因是什么？"
options:
  - "完全不使用物理仿真"
  - "将大量机器人环境和 PPO 张量计算放在 GPU 上并行执行"
  - "只训练单个关节控制器"
  - "取消所有域随机化"
answer: 1
explain: "Legged Gym 基于 Isaac Gym 的 GPU pipeline，可同时运行数千个环境并直接把仿真数据用于 PyTorch PPO 更新，大幅提高 on-policy 样本吞吐。"
```

### Perceptive Locomotion

```yaml
id: perceptive_loco
num: 13
name: Perceptive Locomotion
full_name: 感知运动控制 (Perceptive Locomotion)
year: '2022'
org: ETH Zurich
parent: teacher_student
paper_url: https://arxiv.org/abs/2206.08392
project_url: ''
category: rl_locomotion
motivation: 引入视觉感知的地形自适应控制
```

#### 📝 一句话总结
Perceptive Locomotion 提出一种把本体感知与外部地形感知融合到循环 belief state 的 Teacher-Student 强化学习控制器，解决四足机器人在野外面对噪声高度图、遮挡、雪地、植被和传感器失效时既要提前规划落脚又要保持鲁棒的问题。

#### 🎯 核心要点
- **Teacher-Student 特权学习**：Teacher 在仿真中访问无噪声地形、摩擦、扰动等特权信息；Student 只使用真实机器人可获得的本体感知和高度采样
- **注意力门控循环编码器**：用 GRU 维护隐式环境 belief，并通过门控机制自适应决定外感信息在当前时刻是否可信
- **外感退化建模**：训练时注入高度偏移、逐点噪声、逐足噪声和整 episode 偏置，模拟位姿漂移、软地形、遮挡和传感器故障
- **双损失蒸馏**：Student 同时最小化对 Teacher 动作的行为克隆损失和对特权环境状态/高度样本的重建损失
- **传感器无关接口**：以机器人中心 2.5D elevation map 的高度采样作为外感输入，可由 LiDAR 或深度相机产生
- **零射 Sim-to-Real**：策略在仿真训练后直接部署到 ANYmal C，控制器 50 Hz 运行，地图约 20 Hz 更新
- **鲁棒性-速度折中**：外感可靠时提前抬脚、调姿和加速；外感不可靠时退化为本体感知驱动的稳健行走

#### 🔬 深入细节
##### 资料依据与框架图

> ⚠️ 注意：清单中的 `paper_url`（`arXiv:2206.08392`）实际指向一篇数学论文，不是该算法论文。以下精读基于同名公开论文 *Learning robust perceptive locomotion for quadrupedal robots in the wild*（`arXiv:2201.08117`）和 ETH 官方项目页；YAML 元信息仍按清单原样保留。

![Perceptive Locomotion 训练与部署框架](https://ar5iv.labs.arxiv.org/html/2201.08117/assets/x4.png)
*图：先训练带特权信息的 Teacher，再把 Teacher 的动作和环境 belief 蒸馏到只使用真实传感器输入的 Student，最后在真实 ANYmal 上零射部署。*

##### 动机与背景

纯本体感知的四足策略已经能在粗糙地形上保持鲁棒，但它必须“踩到之后才知道”地形性质，因此遇到台阶、树根、坑洞时速度和能耗都会受限。外部感知可以让机器人提前抬脚和调整身体姿态，但真实野外的深度信息并不可靠：雪和水可能反光，草和软泡沫看起来像可踩的硬面，树枝和低矮障碍会被 2.5D 高度图错误地当成地面障碍，位姿漂移还会让地图整体偏移。

论文的核心判断是：不要把 elevation map 当作绝对可信的几何真值，而是让策略在训练中学习“什么时候相信外感、什么时候回退到本体感知”。因此控制器没有手写的传感器置信度规则，而是在循环网络里形成一个 belief state，用过去的身体反馈修正当前高度图。

##### 方法机制：Teacher、Student 与 belief state

Teacher 策略在仿真中通过 PPO 训练，输入包括机器人本体状态、速度命令、无噪声地形高度、摩擦/扰动等特权量。Teacher 的目标是先学到“如果知道真实环境，最优应该怎么走”。Student 之后只看到真实可用的观测：

$$
o_t^{\text{student}} = [o_t^{\text{prop}},\ h_t^{\text{noisy}},\ c_t]
$$

其中 \(o_t^{\text{prop}}\) 是关节、IMU、历史动作等本体信息，\(h_t^{\text{noisy}}\) 是从机器人中心 elevation map 查询得到的高度采样，\(c_t\) 是期望速度命令。Student 的循环编码器先生成中间状态，再用注意力门控融合外感特征：

$$
\tilde{b}_t = \mathrm{GRU}([o_t^{\text{prop}}, e_t], b_{t-1}), \qquad
g_t = \sigma(f_g(\tilde{b}_t))
$$

$$
b_t = [\tilde{b}_t,\ g_t \odot e_t]
$$

这里 \(e_t\) 是高度采样编码，\(g_t\) 是逐维门控系数。直觉上，门控系数高表示“当前外感对控制有用”，系数低表示“高度图可能错了，应更多依赖身体反馈和记忆”。

##### 训练流程与损失函数

```python
# Perceptive Locomotion 核心训练伪代码
for iter in teacher_rl:
    obs_T = concat(proprioception, privileged_terrain, friction, disturbances, velocity_cmd)
    action_T = teacher_policy(obs_T)
    reward = velocity_tracking + terrain_progress - energy_cost - instability_penalty
    PPO_update(teacher_policy, reward)

for iter in student_distillation:
    noisy_height = corrupt_height_samples(
        clean_height,
        point_noise=True,
        foot_offset=True,
        episode_bias=True,
        failure_modes=["nominal", "large_offset", "large_noise"],
    )
    belief = gated_gru_encoder(proprioception, noisy_height, history)
    action_S = student_policy(belief, velocity_cmd)
    action_T = teacher_policy(privileged_obs).detach()

    loss_bc = mean_squared_error(action_S, action_T)
    loss_rec = reconstruct_privileged_state(belief, clean_height, friction)
    update(student_policy, encoder, loss_bc + lambda_rec * loss_rec)

deploy_zero_shot(student_policy, onboard_elevation_map)
```

Student 的行为克隆损失可写为：

$$
\mathcal{L}_{\text{BC}} =
\mathbb{E}_t \left[\|\pi_S(o_t^{\text{prop}}, h_t^{\text{noisy}}, b_{t-1}) -
\pi_T(s_t^{\text{priv}})\|_2^2\right]
$$

重建损失则要求 belief state 能解码出真实地形/摩擦等特权量：

$$
\mathcal{L}_{\text{rec}} =
\|D(b_t) - y_t^{\text{priv}}\|_2^2
$$

这不是为了部署时真的使用解码器，而是为了约束隐藏状态包含“可用于控制的环境解释”。例如当机器人踩到软泡沫时，高度图仍显示前方可踩，但身体反馈会显示足端下陷，循环 belief 会快速修正对地形高度和可支撑性的估计。

##### 噪声建模为什么关键

论文将高度采样噪声分为多个作用域：逐采样点噪声模拟深度测量随机误差，逐足噪声模拟局部地形注册偏差，episode 级偏置模拟整张地图漂移。训练 episode 中还按比例切换三种地图质量：正常噪声、大偏移、大噪声。这样 Student 不会只学会“读高度图”，而会学会用本体反馈判别高度图可信度。

这种设计与传统“先建图、再规划脚点”的方法有明显区别。传统方法通常假设地图是正确的，再用规则或优化器选脚点；Perceptive Locomotion 把地图看作不完整观测，并把“地图是否可信”交给策略网络从交互历史中学习。它也不同于纯本体感知策略：可靠外感存在时，机器人能提前抬腿跨过 30 cm 级台阶，并在平地上以更高速度前进。

##### 部署流程

真实机器人上，LiDAR 或深度相机点云被融合为机器人中心 elevation map，策略在固定查询点采样局部高度；若某个查询点没有地图信息，则填入随机值，使输入分布接近训练时的“缺失地图”模式。策略输出 12 个关节目标位置，再由底层 PD/执行器控制实现。

> 💡 关键：外感在这里不是单独的规划模块，而是 Student belief 的一个观测来源。控制器可以使用外感获得前瞻性，也可以在外感坏掉时保留本体感知策略的鲁棒性。

#### 🧪 练习题
```yaml
question: "Perceptive Locomotion 中注意力门控循环编码器的主要作用是什么？"
options:
  - "把高度图压缩成更小的图像，减少显存占用"
  - "根据历史本体反馈和当前外感，自适应决定外部高度信息的可信程度"
  - "用显式规则检测雪地、玻璃和植被"
  - "替代底层关节 PD 控制器直接输出电机电流"
answer: 1
explain: "门控 GRU 维护环境 belief，并学习在外感可靠时利用高度图、在外感缺失或误导时回退到本体感知与历史记忆。"
```

### ANYmal Parkour

```yaml
id: anymal_parkour
num: 14
name: ANYmal Parkour
full_name: ANYmal极限运动 (ANYmal Parkour Learning)
year: '2024'
org: ETH Zurich
parent: perceptive_loco
paper_url: https://www.science.org/doi/abs/10.1126/scirobotics.adi7566
project_url: ''
category: rl_locomotion
motivation: 四足机器人实现跳跃攀爬极限动作
```

#### 📝 一句话总结
ANYmal Parkour 提出了感知-运动-导航三层分层架构，通过多分辨率 3D 卷积感知模块、5 种专用运动技能策略和混合动作空间导航策略的端到端联合训练，使四足机器人 ANYmal 能够在真实世界中以最高 2 m/s 的速度完成跳跃 1m 间隙、攀爬 0.9m 高台、匍匐穿越低矮障碍等跑酷动作。

#### 🎯 核心要点
- **三层分层架构**：感知模块（exteroception）处理深度点云、运动模块（locomotion）包含 5 种技能策略、导航模块（navigation）进行高层决策
- **双分辨率 3D 卷积感知**：粗分辨率（0.1m 体素，2.4×2.4×1.6m 范围）带自回归时序反馈 + 细分辨率（0.05m 体素，1.2×1.2×0.8m 范围），点云→体素网格→编解码器
- **5 种运动技能**：行走（walk）、跳跃（jump）、攀爬（climb-up）、下降（climb-down）、匍匐（crouch），各自独立训练
- **Position-based 任务表述**：运动策略统一接收目标位置（而非速度命令），不同技能以各自方式到达目标
- **混合动作空间导航**：Gaussian 分布输出连续目标位置 + Categorical 分布选择离散技能，支持时间依赖命令序列
- **Teacher-Student 蒸馏**：运动策略先用特权地形信息训练 Teacher，再蒸馏到仅用本体感知 + 感知潜变量的 Student
- **稀疏导航奖励**：仅在命令序列最后一步计算距离目标的惩罚，避免密集奖励塑形偏差
- **课程学习**：地形难度随训练进度递增，每种技能 80% 专用地形 + 20% 随机粗糙地形

#### 🔬 深入细节
##### 系统架构总览

![ANYmal Parkour 系统架构](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x2.png)
*图：ANYmal Parkour 三层分层架构示意图。底层感知模块将深度点云编码为潜在表示；中层运动模块包含 5 种专用技能策略；顶层导航模块选择技能并输出运动命令。三个模块在仿真中端到端联合训练。*

![ANYmal Parkour 真实跑酷场景](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x1.png)
*图：ANYmal 机器人在真实跑酷赛道上展示多种敏捷运动技能，包括跳跃间隙、攀爬高台和匍匐穿越。*

##### 1. 动机与背景

四足机器人在非结构化环境中的敏捷运动是一个长期挑战。此前的工作主要存在两类局限：

1. **端到端方法**（如直接从图像到关节命令）将感知到控制映射为单一策略，但难以在同一策略中兼顾跳跃、攀爬、匍匐等截然不同的运动模式，且对感知噪声敏感；
2. **基于 Elevation Map 的模块化方法**使用 2.5D 高度图作为中间表示，但在复杂 3D 环境中（如悬空障碍物、需要匍匐的低矮通道）会丢失关键的高度信息。

ANYmal Parkour 的核心洞察是：**将问题分解为感知、运动技能和导航三个层次，每层专注于各自的子问题，通过明确定义的接口耦合**。这既保留了端到端学习的优势（所有模块可联合优化），又通过分层大幅降低了单一策略需要处理的复杂度。

##### 2. 感知模块（Exteroceptive Module）

感知模块负责将机载深度相机的原始点云转换为紧凑的潜在表示，分别供运动和导航模块使用。

**点云预处理**：深度相机获取的点云首先从相机坐标系转换到机器人基座坐标系（仅保留偏航对齐，消除俯仰和横滚的影响），然后体素化为 3D 二值占据网格。系统维护两个不同分辨率的体素网格：

- **粗分辨率网格**：体素大小 0.1m，覆盖范围 2.4×2.4×1.6m（24×24×16 体素），用于远距离地形感知和导航决策
- **细分辨率网格**：体素大小 0.05m，覆盖范围 1.2×1.2×0.8m（24×24×16 体素），用于近距离精细地形感知和运动控制

**3D 卷积编解码器**：每个分辨率对应一个独立的 3D 卷积编解码器网络。编码器通过多层 3D 卷积和下采样将体素网格压缩为低维潜在向量；解码器将潜在向量重建为体素网格，通过二值交叉熵重建损失进行训练：

$$\mathcal{L}_{recon} = -\sum_{i} \left[ v_i \log(\hat{v}_i) + (1 - v_i) \log(1 - \hat{v}_i) \right]$$

其中 \(v_i\) 为真实体素占据值，\(\hat{v}_i\) 为重建值。

> 💡 关键：粗分辨率编码器采用**自回归反馈机制**——将上一时间步的潜在向量拼接到当前输入中。这使得网络能够隐式地积累时间信息，弥补单帧深度图的有限视野（例如机器人转头后仍能"记住"之前看到的障碍物位置）。细分辨率编码器不使用自回归，因为近距离感知更依赖当前帧的精确信息。

> ⚠️ 注意：系统使用**密集 3D 卷积**（而非稀疏卷积），虽然训练时需要约 45GB GPU 显存，但避免了稀疏卷积在体素化点云上可能出现的梯度传播不稳定问题。推理时由于只需前向传播，计算开销可接受。

##### 3. 运动模块（Locomotion Module）

运动模块包含 5 种专用技能策略，每种策略是一个独立的 MLP 神经网络，输出 12 维关节目标位置（ANYmal 有 4 条腿，每条 3 个关节）。

| 技能 | 功能描述 | 专用地形类型 | 关键能力 |
|------|---------|-------------|---------|
| Walk | 平坦/粗糙地面行走 | 随机粗糙地形 | 稳定步态，速度跟踪 |
| Jump | 跨越间隙/沟壑 | 间隙地形（最大 1m） | 起跳时机，飞行姿态 |
| Climb-up | 攀爬高台/阶梯 | 阶梯上升（最高 0.9m） | 前肢攀附，后肢推蹬 |
| Climb-down | 从高台安全跳下 | 阶梯下降 | 着陆缓冲，姿态恢复 |
| Crouch | 低姿匍匐穿越 | 低矮障碍物 | 降低重心，HFE 偏转 160° |

**Position-based 任务表述**：所有技能策略接收统一的输入——目标位置相对于机器人的 2D 坐标 \(\mathbf{p}_{target} = (x_{rel}, y_{rel})\)，而非传统的速度命令 \((v_x, v_y, \omega_z)\)。这一设计的核心优势在于：

- **统一接口**：导航模块可以用相同的命令格式控制所有技能，无需为每种技能设计不同的命令空间
- **隐式行为差异**：不同技能对"到达目标位置"的理解不同——walk 策略会平稳行走过去，jump 策略会在间隙边缘起跳飞越，climb-up 策略会攀爬过去
- **简化导航**：导航模块只需决定"去哪里"和"用什么技能"，无需精确规划速度曲线

**Teacher-Student 两阶段训练**：

```python
# 运动策略训练伪代码
# ===== Phase 1: Teacher Training (with privileged info) =====
for iteration in range(num_iterations):
    # Teacher 可访问完整地形高度图、接触力等特权信息
    obs_teacher = concat([
        proprioception,        # 关节角度、角速度、IMU 数据
        privileged_heightmap,  # 机器人周围精确高度图
        contact_forces,        # 足端接触力
        target_position        # 目标位置 (x_rel, y_rel)
    ])
    action = teacher_policy(obs_teacher)  # 输出 12 维关节目标位置
    # PPO 更新，奖励包含位置跟踪 + 动作平滑 + 接触惩罚
    reward = r_tracking + r_smoothness + r_contact
    PPO_update(teacher_policy, value_fn, reward)

# ===== Phase 2: Student Distillation =====
for iteration in range(num_iterations):
    # Student 仅使用本体感知 + 感知模块潜在向量
    obs_student = concat([
        proprioception,        # 关节角度、角速度、IMU
        perception_latent,     # 感知模块输出的潜在向量
        target_position        # 目标位置
    ])
    action_teacher = teacher_policy(obs_teacher).detach()
    action_student = student_policy(obs_student)
    # 行为克隆损失
    loss = MSE(action_student, action_teacher)
    update(student_policy, perception_encoder, loss)
```

> 💡 关键：Student 蒸馏阶段会**同时更新感知编码器**的参数，这意味着感知模块的表示是由运动任务的需求驱动学习的，而非独立预训练。这种端到端的梯度流确保感知表示包含运动控制所需的关键信息。

每种技能的训练环境由 **80% 专用地形 + 20% 随机粗糙地形**组成。20% 的随机地形确保策略在非专用场景下也具备基本的鲁棒性（例如 jump 策略在平地上也能正常行走）。

##### 4. 导航模块（Navigation Module）

导航模块是系统的"大脑"，负责在高层决定使用哪种技能以及给出什么运动命令。它以 5Hz 频率运行（每 0.2s 决策一次），而运动策略以 50Hz 运行。

**混合动作空间 PPO**：导航策略的动作空间同时包含连续和离散部分，使用混合概率分布建模：

$$\pi_{nav}(\mathbf{a}|s) = \underbrace{\mathcal{N}(\mu_{\mathbf{v}}, \sigma_{\mathbf{v}})}_{\text{连续：目标位置}} \cdot \underbrace{\text{Cat}(\mathbf{p}_k)}_{\text{离散：技能选择}}$$

其中 \(\mu_{\mathbf{v}}, \sigma_{\mathbf{v}}\) 参数化连续目标位置的 Gaussian 分布，\(\mathbf{p}_k\) 为 5 种技能的选择概率。两部分共享同一个策略网络的主干，仅在输出层分叉。

**时间依赖命令序列**：导航策略不仅输出当前时刻的命令，而是输出未来 \(N=10\) 个时间步（每步 0.2s，共 2s）的完整命令序列：

$$\mathbf{a}_{nav} = \left\{(\mathbf{p}_{target}^{(t)}, k^{(t)})\right\}_{t=1}^{N}$$

这使得导航策略可以规划短期轨迹，例如"先用 walk 接近间隙边缘 → 切换到 jump 跳过去 → 落地后切回 walk"。运动模块按时间顺序依次执行这些命令。

**稀疏奖励设计**：

$$r_{nav} = -\left\|\mathbf{p}_{robot}^{(N)} - \mathbf{p}_{goal}\right\|_2$$

仅在命令序列执行完毕（第 \(N\) 步）计算机器人当前位置与全局目标点的欧氏距离作为惩罚。这种极度稀疏的奖励设计有两个重要优势：

1. **避免奖励塑形偏差**：密集奖励（如每步给予接近目标的奖励）可能导致策略学到贪心的局部最优行为，而非全局最优的技能切换策略
2. **鼓励长期规划**：策略必须学会在 2s 的时间窗口内做出合理的技能序列规划

**课程学习**：训练采用地形难度课程，随策略性能提升逐步增加挑战：
- 初期：小间隙（0.2m）、低台阶（0.2m）
- 中期：中等间隙（0.5m）、中等台阶（0.5m）
- 后期：大间隙（1.0m）、高台阶（0.9m）

##### 5. 联合训练与系统集成

整个系统包含 **8 个神经网络**在 Isaac Gym 仿真器中端到端联合训练：

| 网络 | 数量 | 功能 |
|------|------|------|
| 运动技能策略（Student） | 5 | 各技能的关节控制 |
| 导航策略 | 1 | 技能选择 + 命令生成 |
| 导航 Value 网络 | 1 | 导航奖励的价值估计 |
| 感知编解码器 | 2（粗+细） | 点云→潜在表示 |

训练流程在数千个并行仿真环境中同时进行：每个机器人被随机分配到不同难度的地形上，感知模块处理模拟的深度点云，导航模块选择技能和命令，运动模块执行低层控制，所有网络通过各自的损失函数同步更新。

##### 6. 与传统方法的对比

| 特性 | 端到端方法 | Elevation Map 方法 | ANYmal Parkour |
|------|-----------|-------------------|----------------|
| 感知表示 | 原始图像/点云 | 2.5D 高度图 | 3D 体素潜在编码 |
| 运动多样性 | 单一策略覆盖所有行为 | 单一策略 | 5 种专用技能策略 |
| 3D 障碍处理 | 有限 | 信息丢失（无法表示悬空物） | 完整 3D 体素感知 |
| 技能切换 | 隐式（策略内部） | 无 | 显式（导航模块选择） |
| Sim-to-Real | 较难（感知差异大） | 较易（高度图鲁棒） | 中等（Teacher-Student 蒸馏） |
| 训练复杂度 | 低（单网络） | 中 | 高（8 个网络联合训练） |
| 可扩展性 | 高 | 中 | 待验证（新增技能需重训） |

> ⚠️ 注意：该方法的主要局限在于 **8 个网络的联合训练复杂度高**，新增技能需要重新训练整个系统。作者在讨论中指出，如何实现技能的模块化扩展是未来的重要研究方向。

![ANYmal Parkour 实验结果](https://ar5iv.labs.arxiv.org/html/2306.14874/assets/x3.png)
*图：不同技能在各类地形上的表现。系统能够自主选择合适的技能应对不同障碍，实现流畅的技能切换。*

#### 🧪 练习题
```yaml
question: "ANYmal Parkour 中感知模块的粗分辨率编码器采用了什么特殊机制来弥补单帧深度图的视野限制？"
options:
  - "使用 Transformer 的注意力机制聚合多帧信息"
  - "将上一时间步的潜在向量反馈到当前输入（自回归反馈）"
  - "使用光流估计相邻帧之间的运动并融合"
  - "维护一个全局 TSDF 地图并持续更新"
answer: 1
explain: "粗分辨率编码器采用自回归反馈机制，将上一时间步的潜在向量拼接到当前输入中，使网络能隐式积累时间信息，记住之前观察到但当前帧不可见的环境特征。"
```

### DreamWaQ++

```yaml
id: dreamwaq
num: 15
name: DreamWaQ++
full_name: 梦境行走增强版 (Dream Walking for Quadrupeds++)
year: '2024'
org: KAIST
parent: perceptive_loco
paper_url: https://arxiv.org/abs/2409.19709
project_url: ''
category: rl_locomotion
motivation: 本体+视觉融合极限地形穿越
```

#### 📝 一句话总结
DreamWaQ++ 提出一个单策略、多模态、传感器鲁棒的四足运动学习框架，通过层次外感记忆、PointNet 置信过滤、Proprioception/Exteroception latent fusion 和多目标自监督损失，使机器人能在楼梯、缺口、斜坡、可变形地面和外感失效下进行快速地形穿越。

#### 🎯 核心要点
- **单一神经控制器覆盖多种障碍行为**：上/下楼梯、跨越 gap、试探未知落差、跳跃和大坡度攀爬均由同一策略涌现
- **Hierarchical Exteroceptive Memory**：缓存低频外感点云/高度观测，并与高频本体感知对齐，缓解传感器异步和延迟
- **PointNet 外感编码器 + Confidence Filter**：对 3D 点特征学习置信 mask，在聚合前抑制不可靠点云特征
- **Proprioceptive Encoder**：从本体历史中估计隐式地形/动力学上下文，继承 DreamWaQ 的“有限感知下 terrain imagination”思路
- **Multi-Modal Mixer**：用轻量 MLP-Mixer 融合本体 latent \(z_t^p\) 和外感 latent \(z_t^e\)，比 Transformer 更便于实时部署
- **三类辅助损失**：特权状态估计损失、VAE 表征损失、跨模态对比损失共同塑造可解释环境上下文
- **Skill Discovery / Versatility Gain**：用内在奖励鼓励探索非保守技能，避免只学到低速稳态行走
- **部署鲁棒性训练**：随机化物理参数、系统延迟、外感噪声和传感器外参偏差，覆盖真实机器人的时延与标定误差

#### 🔬 深入细节
##### 核心框架图

![DreamWaQ++ 框架图](https://arxiv.org/html/2409.19709v2/x2.png)
*图：DreamWaQ++ 的层次编码结构。低层分别编码外感原始测量和本体历史，高层用时空 mixer 融合多模态上下文并输出策略动作。*

![DreamWaQ++ 外感编码器](https://arxiv.org/html/2409.19709v2/x3.png)
*图：外感编码器使用 PointNet 骨干，并通过 confidence filter 在点特征聚合前屏蔽不可靠观测。*

##### 动机与背景

原始 DreamWaQ 的关键思想是：即使没有视觉，机器人也能从身体历史中隐式估计地形和动力学上下文；但在连续高台阶、缺口、落差等场景中，纯本体感知仍然来不及提前调整摆腿轨迹。另一方面，直接把深度相机或 LiDAR 点云接到策略上也不稳，因为外感频率低、延迟大、可能与本体状态不同步，还会受到标定误差、遮挡和点云噪声影响。

DreamWaQ++ 的目标不是简单“加视觉”，而是让控制器在多模态之间建立可恢复的上下文：本体感知负责提供真实接触反馈，外感负责提供前方地形先验，融合模块负责判断二者是否一致。如果二者冲突，策略仍能通过本体反馈触发试探、拖脚、扩展支撑面等恢复动作。

##### 多模态表示与融合

设本体历史为 \(\mathcal{H}_t^p\)，外感记忆为 \(\mathcal{M}_t^e\)。两个编码器分别得到上下文：

$$
z_t^p = E_p(\mathcal{H}_t^p), \qquad
z_t^e = E_e(\mathcal{M}_t^e)
$$

外感编码器以点云/体素化局部扫描为输入，先对每个点提特征，再学习置信权重：

$$
\alpha_i = \sigma(f_c(\phi(p_i))), \qquad
z_t^e = \mathrm{Pool}_i(\alpha_i \cdot \phi(p_i))
$$

其中 \(\alpha_i\) 越低，该点越可能来自噪声、遮挡、标定偏差或不可用区域。相比直接最大池化，置信过滤使策略不必把每个外感点都当作真实障碍。

融合后策略输入为：

$$
z_t^{pe} = \mathrm{Mixer}([z_t^p, z_t^e]), \qquad
a_t \sim \pi_\theta(a_t \mid o_t^p, z_t^{pe}, c_t)
$$

这里 \(c_t\) 是速度命令，\(a_t\) 通常是关节目标位置或低层 PD 目标。MLP-Mixer 在 token/mode 维度上做轻量混合，保留 Transformer 类似的跨模态交互能力，但计算更稳定、推理更快。

##### 辅助目标：让 latent 不只是“能控制”

DreamWaQ++ 的训练不仅靠任务奖励，还加入多种表征损失：

$$
\mathcal{L} =
\mathcal{L}_{\text{PPO}}
\lambda_{\text{est}}\mathcal{L}_{\text{est}}
\lambda_{\text{vae}}\mathcal{L}_{\text{vae}}
\lambda_{\text{con}}\mathcal{L}_{\text{contrast}}
$$

估计损失让 latent 预测特权状态，例如真实基座速度、足端位置、物理参数、局部高度图等；VAE 损失约束本体上下文形成平滑、可泛化的隐变量；对比损失则鼓励同一地形/状态下的跨模态上下文接近，不同场景下拉开距离。这样做的结果是 latent 更像“地形和动力学语义”，而不是只服务于当前训练分布的黑箱特征。

##### 训练与部署伪代码

```python
# DreamWaQ++ 单阶段多模态 RL 伪代码
initialize policy pi_theta, value V, encoders E_p, E_e, mixer M
for iteration in range(num_updates):
    for env in parallel_sim:
        # 1. 多频观测
        proprio_hist = update_proprioceptive_history(joint, imu, contacts, last_actions)
        extero_mem = update_exteroceptive_memory(point_cloud_or_depth, timestamp)

        # 2. 多模态编码
        z_p = E_p(proprio_hist)
        z_e = E_e(extero_mem, confidence_filter=True)
        z_pe = M(concat(z_p, z_e))

        # 3. 策略执行
        action = pi_theta(obs=proprioception, context=z_pe, command=velocity_cmd)
        next_state, task_reward = env.step(action)

        # 4. 辅助监督信号来自仿真特权状态
        est_loss = predict_privileged_states(z_pe, privileged_state)
        vae_loss = beta_vae_loss(z_p)
        contrast_loss = align_modal_context(z_p, z_e)
        intrinsic = versatility_gain(z_pe, behavior_statistics)

    PPO_update(task_reward + intrinsic, est_loss + vae_loss + contrast_loss)
```

部署时不需要特权状态和辅助解码器，只保留编码器、mixer 和 policy。外感可来自不同硬件配置：RealSense 深度相机、Ouster LiDAR、Livox LiDAR 等；训练中的外参偏差和延迟随机化使策略不强依赖某个传感器的理想同步。

##### 鲁棒性设计

DreamWaQ++ 将现实差异显式写进训练分布：随机化 payload、motor strength、质心偏移、摩擦系数和系统延迟；对本体观测注入均匀噪声；对外感观测设置低/中/高三档噪声，并在 episode 开始时注入传感器姿态和位置偏置。对多线程系统中常见的数据异步，论文还随机延迟本体观测，使策略把小范围时间错位当作观测噪声。

与 Perceptive Locomotion 相比，DreamWaQ++ 更强调“外感-本体双向互补”：外感支持提前摆腿和跨越障碍，本体 latent 在外感失效或错配时仍能估计实际接触条件。与纯 domain randomization 策略相比，它不是把所有变化压进一个鲁棒但保守的策略，而是通过可解释 latent 让策略动态改变步态高度、频率和支撑面。

> 💡 关键：DreamWaQ++ 的强点不是某个单独模块，而是把多模态记忆、置信过滤、辅助表示学习和技能探索放进同一 RL 管线，使复杂地形能力能由一个实时策略涌现。

#### 🧪 练习题
```yaml
question: "DreamWaQ++ 中 confidence filter 的主要作用是什么？"
options:
  - "把点云转换成二维 RGB 图像"
  - "在外感点特征聚合前学习置信 mask，抑制不可靠外感观测"
  - "用硬编码阈值删除所有低于地面的点"
  - "替代本体感知编码器，仅使用视觉完成控制"
answer: 1
explain: "外感点云可能受噪声、遮挡和标定误差影响。confidence filter 学习每个点特征的可信权重，减少错误外感对策略的干扰。"
```

### ExBody

```yaml
id: exbody
num: 16
name: ExBody
full_name: 表现力全身控制 (Expressive Whole-Body Control)
year: '2024'
org: CMU
parent: teacher_student
paper_url: https://arxiv.org/abs/2402.16759
project_url: ''
category: rl_locomotion
motivation: 人形机器人表现力全身控制
```

#### 📝 一句话总结
ExBody 提出一种面向真实人形机器人的全身强化学习控制器：上半身尽量模仿人类动作以获得表现力，下半身放松逐关节模仿并主要跟踪根部运动命令，从而在 Unitree H1 等平台上实现跳舞、挥手、握手和风格化行走等真实世界动作。

#### 🎯 核心要点
- **分解 imitation 目标**：上半身跟踪参考关节和关键点，下半身不强制逐关节模仿，只要求稳健完成 root movement goal
- **双目标输入**：策略同时接收 expression goal \(g^e\) 和 root movement goal \(g^m\)，部署时 \(g^m\) 可由摇杆给出
- **多源人类动作数据**：可使用 CMU MoCap、生成模型、video-to-pose 等来源，经 retargeting 转换为机器人可执行动作片段
- **运动重定向到硬件约束**：将人类动作映射到 H1 的 19 DoF 结构，显式处理人-机器人自由度和能力差异
- **Guided State Initialization**：训练初始状态从重定向动作分布采样，提高探索效率，避免策略只在默认站姿附近学习
- **奖励设计替代 AMP 依赖**：通过上身关键点/关节跟踪、根运动跟踪、稳定性和正则项组合，比直接全身 AMP 更适合真实硬件
- **Sim-to-Real 部署**：在仿真中训练单一策略，真实机器人无需针对每个动作单独调控制器

#### 🔬 深入细节
##### 资料依据与框架图

> ⚠️ 注意：清单中的 `paper_url` 为 `arXiv:2402.16759`，公开可检索的 ExBody 论文编号为 `arXiv:2402.16796`。以下内容基于该公开论文和项目页；YAML 元信息按清单保留。

![ExBody 方法框架](https://arxiv.org/html/2402.16796v1/extracted/5431719/figures/method.png)
*图：ExBody 将多源人类动作重定向到机器人，提取 expression goal 与 root movement goal，再用 goal-conditioned RL 训练可真实部署的全身控制器。*

##### 动机与背景

人形机器人控制通常把重点放在“不摔倒”和“跟踪速度”上，因此动作稳定但缺乏人类式表现力。图形学中的物理角色控制可以全身模仿大规模动捕数据，但这些方法常假设仿真角色具有更丰富自由度、更强力矩和仿真可见的特权状态，直接迁移到真实 H1 这类机器人会失败。

ExBody 的关键取舍是：不要让机器人完整复制人类全身轨迹。上半身的手臂、肩部、手部关键点主要负责表达意图和风格，应该尽量模仿；下半身则承担平衡和移动，必须服从真实机器人动力学能力。因此论文把问题定义为“表达目标 + 根运动目标”的联合控制，而非传统全身逐关节 tracking。

##### 控制目标形式化

命令条件运动控制通常只跟踪根部速度、朝向或高度：

$$
\pi(a_t \mid o_t, g_t^m)
$$

ExBody 扩展为：

$$
\pi(a_t \mid o_t, g_t^m, g_t^e)
$$

其中 \(g_t^m\) 是 root movement goal，例如线速度、朝向误差、根高度等；\(g_t^e\) 是 expression goal，包括上半身 9 个 actuated joints 的目标角度，以及肩、肘、手等关键点的 3D 位置。策略输出低层关节控制目标，由仿真中的 RL 学习如何在满足表达动作的同时保持站立和移动。

关键奖励可概括为：

$$
r_t =
w_m r_t^{\text{root}}
+ w_e r_t^{\text{expression}}
+ w_s r_t^{\text{stability}}
- w_r c_t^{\text{regularization}}
$$

上半身表达项使用关键点和关节误差：

$$
r_t^{\text{expression}} =
\exp(-\alpha \|q_{upper} - q_{upper}^{ref}\|^2)
+ \exp(-\beta \|p_{key} - p_{key}^{ref}\|^2)
$$

下半身不使用同等强度的关节模仿项，这让机器人可以弯膝、调整步态和足端高度，以真实硬件可承受的方式完成同一个表达动作。

##### 训练流程伪代码

```python
# ExBody 训练流程伪代码
motion_dataset = load_human_motions(CMU_MoCap, generated_motion, video_to_pose)
robot_clips = []
for human_clip in motion_dataset:
    robot_clip = retarget_to_humanoid(
        human_clip,
        robot_dof=19,
        preserve_upper_body_keypoints=True,
        relax_lower_body_constraints=True,
    )
    robot_clips.append(robot_clip)

for iteration in range(PPO_updates):
    clip = sample(robot_clips)
    state = guided_state_initialization(clip)  # 从动作片段附近初始化
    for t in rollout:
        g_e = extract_expression_goal(clip, t)
        g_m = extract_root_movement_goal(clip, t)  # 或部署时来自 joystick
        action = policy(obs=state, expression_goal=g_e, root_goal=g_m)
        state = sim.step(action)
        reward = root_tracking + upper_body_tracking + stability - regularization
    PPO_update(policy, reward)
```

Guided State Initialization 很重要：如果所有 episode 都从默认站姿开始，策略很难探索到挥手、击掌、舞蹈等高维上身姿态；从数据集状态附近初始化相当于把训练分布推向真实动作流形，让策略更快学会在这些姿态附近恢复平衡。

##### 为什么不做全身强模仿

完整全身 tracking 看似最直接，但真实人形机器人和人类身体存在明显差异：髋、肩等关节自由度不同，脚掌接触模型不同，腿长和力矩限制也不同。若强制 H1 的膝、踝、髋完全跟随人类动作，策略会为了追逐不可实现的腿部姿态牺牲稳定性，常表现为膝盖过直、足端净空不足或直接跌倒。

ExBody 的“上身严格、下身放松”让策略保留了人类动作的可识别部分。例如挥手、拥抱、握手、僵尸步的表达主要来自手臂和躯干，上身关键点必须接近参考；但腿部可以选择更弯的膝、更高的摆脚或更保守的支撑步态。这正是它能从动捕/生成动作迁移到真实硬件的关键。

##### 与 AMP/图形学方法的区别

AMP 通过判别器鼓励动作片段看起来像数据集，但当数据集很大且目标机器人能力受限时，判别器容易推动策略追求“像人类”的全身分布，而不是“真实机器人可稳定执行”的动作。ExBody 更像一个任务条件控制器：给出表达目标和根运动目标，奖励直接约束哪些部分必须像参考、哪些部分优先稳定。

与传统 WBC 或 MPC 相比，ExBody 不显式求解接触力和全身动力学优化，而是在大规模仿真中学习一个神经策略。优势是动作风格丰富、可复用人类动作数据；劣势是安全约束主要来自奖励和训练分布，面对未覆盖的高风险接触仍不如模型控制器可解释。

> 💡 关键：ExBody 的贡献不是“人形机器人会模仿动作”本身，而是明确指出真实硬件上应把表达性和运动稳定性拆开：上半身承载表达，下半身负责稳健移动。

#### 🧪 练习题
```yaml
question: "ExBody 为什么放松下半身的人类动作模仿约束？"
options:
  - "因为人形机器人的下半身没有传感器"
  - "因为表达性主要由上半身体现，而下半身需要优先满足真实机器人平衡和运动能力"
  - "因为 PPO 不能训练腿部控制"
  - "因为论文只研究静态站立，不涉及行走"
answer: 1
explain: "真实机器人与人类腿部自由度和动力学能力不同，强制全身逐关节模仿会破坏稳定性。ExBody 让上半身跟踪表达动作，下半身通过根运动目标保持可执行行走。"
```

### HQP-WBC

```yaml
id: hqp_wbc
num: 17
name: HQP-WBC
full_name: 层次QP全身控制 (Hierarchical QP Whole-Body Control)
year: '2016'
org: IIT
parent: —
paper_url: https://www.worldscientific.com/doi/abs/10.1142/S0219843615500346
project_url: ''
category: wbc
motivation: 任务优先级层次化QP求解
```

#### 📝 一句话总结
HQP-WBC 将全身逆动力学、接触约束、关节/力矩限制和多任务跟踪写成按优先级求解的二次规划序列，解决人形/腿足机器人在接触切换和多目标控制中“高优先级安全约束不能被低优先级任务破坏”的问题。

#### 🎯 核心要点
- **浮动基全身逆动力学**：以广义加速度 \(\ddot{q}\)、接触力 \(\lambda\) 和关节力矩 \(\tau\) 为决策变量，满足刚体动力学一致性
- **严格任务优先级**：安全/接触/动力学约束处于最高优先级，质心/动量、摆动足、姿态、关节姿态等任务按层次依次优化
- **接触约束显式建模**：包含支撑脚无滑动约束、摩擦锥、法向力非负、接触力上限等物理可行性条件
- **关节与执行器限制**：用不等式约束处理关节位置、速度、加速度和力矩限制，避免优化解不可执行
- **层次 QP / 级联 QP**：每一层在保持上层最优残差不变的可行集合内最小化当前任务误差
- **可兼容 DCM/动量控制**：高层步态或 DCM 控制器给出期望质心动量变化，WBC 将其转成可执行关节命令
- **硬件实现导向**：论文链接对应的 THOR 系列弹性执行器人形机器人工作强调 QP-WBC 与低阻抗力控硬件的结合

#### 🔬 深入细节
##### 图源与控制框架

> ⚠️ 说明：该 DOI 的公开 PDF 可访问，但页面没有暴露独立的图像直链。下方用公开 PDF 作为图源链接，并用文本框复刻 HQP-WBC 的核心计算图。

![HQP-WBC 原论文公开 PDF](https://www.cs.cmu.edu/~cga/z/Hopkins_IJHR_2016.pdf)

```text
高层步态 / DCM / 操作任务
        │
        ▼
任务参考: 质心动量、基座姿态、摆动足轨迹、关节姿态
        │
        ▼
层次 QP 逆动力学求解器
  Level 0: 刚体动力学 + 接触保持 + 摩擦锥 + 力矩/关节限制
  Level 1: 质心动量 / DCM 稳定
  Level 2: 摆动足、躯干姿态、手部任务
  Level 3: 姿态正则、力矩/加速度最小化
        │
        ▼
τ*, qddot*, λ*  →  关节力矩/位置/速度底层控制
```

##### 动机与背景

腿足机器人全身控制的难点不是单个任务的控制律，而是任务之间会冲突：支撑脚必须不滑、摩擦锥不能违反、浮动基动力学必须成立；同时机器人还要稳定质心、跟踪摆动足轨迹、保持躯干姿态、避免关节限位。若把所有任务简单加权到一个 QP，权重调小的安全任务可能被调大的运动任务牺牲；权重调参也会非常脆弱。

HQP-WBC 的核心思想是把“任务重要性”变成优化结构本身。高优先级任务先求解并固定其最优误差，低优先级任务只能在不破坏高优先级结果的剩余自由度里优化。这样，接触可行性和动力学一致性不会因为想让手或摆动足更接近目标而被破坏。

##### 全身逆动力学约束

浮动基机器人满足：

$$
M(q)\ddot{q} + h(q,\dot{q}) = S^\top \tau + J_c(q)^\top \lambda
$$

其中 \(q\in\mathbb{R}^{6+n}\) 包含 6D 浮动基和 \(n\) 个关节，\(S\) 选择可驱动关节，\(\lambda\) 是接触力。因为浮动基不可直接驱动，未驱动部分必须由接触力和惯性满足：

$$
S_f\left(M(q)\ddot{q}+h(q,\dot{q})-J_c^\top\lambda\right)=0
$$

接触保持约束通常写成：

$$
J_c\ddot{q} + \dot{J}_c\dot{q}=0
$$

摩擦锥可线性化为金字塔不等式：

$$
A_f \lambda \le b_f,\qquad \lambda_z \ge 0
$$

这些约束构成最高优先级，因为它们定义了解是否物理可行。

##### 层次 QP 公式

第 \(k\) 层任务一般写成：

$$
A_k x \approx b_k,\qquad x=[\ddot{q},\lambda,\tau]
$$

HQP 的级联形式为：

$$
x_k^* =
\arg\min_x \|A_kx-b_k\|_{W_k}^2
$$

subject to

$$
C x \le d,\quad E x = e,\quad
\|A_i x-b_i\|_{W_i}^2 = \|A_i x_i^*-b_i\|_{W_i}^2,\ i<k
$$

也就是说，第 \(k\) 层不仅要满足物理约束，还要保持所有更高层任务的最优残差。实际实现中也可用 null-space 投影近似：

$$
x = x_{1}^* + N_1 y_2,\qquad
x = x_{2}^* + N_{1:2} y_3,\ldots
$$

其中 \(N\) 是高优先级任务的零空间。QP 级联更容易纳入不等式约束；null-space 形式计算更快但对主动约束变化更敏感。

##### 算法伪代码

```python
# HQP-WBC 伪代码
def hqp_wbc(q, dq, task_refs, contacts):
    x = DecisionVars(qddot, contact_force, joint_torque)

    hard_constraints = [
        floating_base_dynamics(q, dq, x),
        stance_contact_acceleration(q, dq, x, contacts),
        friction_pyramid(x.contact_force),
        torque_limits(x.joint_torque),
        joint_position_velocity_limits(q, dq, x.qddot),
    ]

    hierarchy = [
        centroidal_momentum_task(task_refs.hdot_des),
        base_orientation_task(task_refs.base_R_des),
        swing_foot_task(task_refs.foot_acc_des),
        hand_or_manipulation_task(task_refs.ee_acc_des),
        posture_regularization(task_refs.q_nominal),
    ]

    previous_optimal_residuals = []
    for level, task in enumerate(hierarchy):
        sol = solve_qp(
            minimize=task.weighted_squared_error(x),
            subject_to=hard_constraints + previous_optimal_residuals,
        )
        previous_optimal_residuals.append(fix_residual(task, sol))

    return sol.joint_torque, sol.qddot, sol.contact_force
```

##### 与加权 QP、经典逆运动学的区别

加权 QP 将任务写成一个大目标：

$$
\min_x \sum_i w_i\|A_i x-b_i\|^2
$$

它简单、快速，但“优先级”只由权重近似表达。如果摆动足任务和接触保持冲突，优化器可能同时牺牲二者。HQP 则将高优先级任务作为低层的等式/最优性约束，所以低层任务没有权力破坏高层。

相比经典逆运动学，HQP-WBC 直接在动力学层面处理接触力和关节力矩，因此能判断目标运动是否真的可由支撑接触产生；这对人形机器人单脚支撑、推搡恢复、楼梯/不平地行走尤其关键。

> 💡 关键：HQP-WBC 的价值在于把“安全、接触和动力学一致性”从调权重问题提升为优化层级问题，减少低优先级任务对高优先级约束的干扰。

#### 🧪 练习题
```yaml
question: "HQP-WBC 相比单个加权 QP 的核心优势是什么？"
options:
  - "完全不需要机器人动力学模型"
  - "低优先级任务只能在不破坏高优先级任务最优性的空间中优化"
  - "可以把所有接触约束删除以提高速度"
  - "只适用于固定基机械臂，不适用于浮动基机器人"
answer: 1
explain: "HQP 通过级联 QP 或零空间投影保持上层任务的最优残差，使接触、安全和动力学约束不会被低优先级跟踪任务牺牲。"
```

### IHWBC

```yaml
id: ihwbc
num: 18
name: IHWBC
full_name: 隐式层次全身控制 (Implicit Hierarchical WBC)
year: '2019'
org: MIT
parent: hqp_wbc
paper_url: https://arxiv.org/abs/1909.06586
project_url: ''
category: wbc
motivation: MPC+WBC联合优化提升动态性能
```

#### 📝 一句话总结
IHWBC 清单链接对应的论文实际是 MIT Mini Cheetah 的 Whole-Body Impulse Control (WBIC) + MPC 框架：MPC 在长时域规划地面反力，WBC 在短周期内用任务优先级和 QP 修正反力、加速度与关节命令，从而实现高速动态四足运动。

#### 🎯 核心要点
- **MPC + WBC 两层架构**：MPC 用简化模型规划接触反力，WBC 用全身模型把反力、身体稳定和摆动腿任务转为关节命令
- **优先级任务执行**：通过 null-space projection 依次处理身体姿态、身体位置、足端位置等任务
- **QP 反力修正**：以 MPC 反力为参考，在满足浮动基动力学、任务加速度和接触力约束的前提下求解最终接触力
- **浮动基松弛变量**：对浮动基加速度和反力引入 relaxation，允许飞行相或强动态阶段不被不可实现约束卡死
- **多输出底层接口**：WBC 同时给关节 torque、position、velocity 命令，而不是只输出力矩
- **高频执行**：MPC 较低频更新，WBIC/WBC 以约 2 ms 级周期修正反力和任务跟踪
- **硬件验证**：Mini Cheetah 在实机上完成高速 trot、多步态切换和动态跑动，稳定速度达到约 3.7 m/s

#### 🔬 深入细节
##### 命名说明与框架图

> ⚠️ 注意：清单名为 IHWBC，但 `paper_url` 指向论文 *Highly Dynamic Quadruped Locomotion via Whole-Body Impulse Control and Model Predictive Control*。以下按该链接的 MPC + WBIC/WBC 方法精读，YAML 保持清单原值。

![WBIC + MPC 控制架构](https://ar5iv.labs.arxiv.org/html/1909.06586/assets/x1.png)
*图：MPC 计算较长时域的反力规划，WBC 将其与身体稳定、摆动腿控制结合，输出实际机器人命令。*

![整体控制框架](https://ar5iv.labs.arxiv.org/html/1909.06586/assets/x2.png)
*图：用户速度/步态命令进入 MPC，MPC 输出期望反力和足端/身体命令，WBIC/WBC 生成关节 torque、position、velocity 并交给关节控制器。*

##### 动机与背景

Convex MPC 在四足机器人中很强，因为它能实时优化未来接触反力；但只靠简化单刚体模型不能完整处理腿部运动学、摆动足跟踪和关节级执行限制。传统 WBC 能处理全身任务，却缺乏 MPC 的长时域反力规划。WBIC 的设计是把二者组合：MPC 负责“未来支撑力应该怎样变化”，WBC 负责“当前全身应该怎样执行这个力，同时稳定身体并摆动腿”。

这种组合尤其适合高速运动。高速 trot 或 bound 中支撑时间短、存在飞行相，若 WBC 严格要求每个瞬间都完全满足浮动基任务，优化可能不可行；若完全相信 MPC 反力，又无法处理实际关节和足端任务误差。因此论文在 QP 中对部分约束松弛，让控制器在强动态阶段以可执行性为优先。

##### 优先级任务执行

WBIC 先用 null-space projection 计算任务空间期望加速度。第 \(i\) 个任务的期望加速度通常为：

$$
\ddot{x}_i^{des} =
\ddot{x}_i^{ref}
 + K_p(x_i^{ref}-x_i)
 + K_d(\dot{x}_i^{ref}-\dot{x}_i)
$$

任务雅可比为 \(J_i\)，则任务约束为：

$$
J_i\ddot{q} + \dot{J}_i\dot{q} = \ddot{x}_i^{des}
$$

对多任务按优先级投影：

$$
\ddot{q}_i =
\ddot{q}_{i-1} +
(J_i N_{i-1})^\#(\ddot{x}_i^{des}-\dot{J}_i\dot{q}-J_i\ddot{q}_{i-1})
$$

其中 \(N_{i-1}\) 是更高优先级任务的零空间，\((\cdot)^\#\) 可取 SVD 伪逆或动态一致伪逆。论文用这种方式同时得到期望关节位置/速度增量和任务加速度，再把加速度送入 QP。

##### QP：用 MPC 反力做参考，而不是照抄

MPC 输出接触反力 \(\lambda^{mpc}\)。WBIC 的 QP 求解：

$$
\min_{\ddot{q},\lambda,\delta}
\|\lambda-\lambda^{mpc}\|_{W_\lambda}^2
+ \|\delta_b\|_{W_b}^2
+ \|\delta_\lambda\|_{W_r}^2
$$

subject to

$$
S_f(M\ddot{q}+h-J_c^\top \lambda)=\delta_b
$$

$$
J_{task}\ddot{q}+\dot{J}_{task}\dot{q}=\ddot{x}^{des}
$$

$$
A_f\lambda \le b_f
$$

这里 \(\delta_b\) 是浮动基动力学松弛项，\(\delta_\lambda\) 是反力松弛项。直觉上，QP 既想尽量跟随 MPC 反力，又允许在硬件、接触和任务执行需要时做局部修正。

得到 \(\ddot{q}^*\) 和 \(\lambda^*\) 后，再由刚体动力学求关节力矩：

$$
\tau =
S\left(M(q)\ddot{q}^*+h(q,\dot{q})-J_c(q)^\top\lambda^*\right)
$$

##### 算法伪代码

```python
# WBIC + MPC 控制循环伪代码
while robot_is_running:
    state = estimate_base_joints_contacts()
    gait_phase = gait_scheduler(commanded_gait, commanded_velocity)

    if mpc_tick:
        lambda_mpc, body_ref, foot_ref = solve_mpc(
            simplified_body_model,
            state,
            gait_phase,
            velocity_command,
        )

    # WBC/WBIC 高频运行
    task_acc = prioritized_task_projection([
        body_orientation_task(body_ref),
        body_position_task(body_ref),
        swing_foot_task(foot_ref),
    ])

    qddot_star, lambda_star = solve_qp(
        minimize_force_error_to=lambda_mpc,
        satisfy_floating_base_dynamics_with_relaxation=True,
        satisfy_task_acceleration=task_acc,
        satisfy_contact_force_constraints=True,
    )

    tau = inverse_dynamics(qddot_star, lambda_star)
    q_des, dq_des = integrate_task_solution(task_acc)
    send_joint_commands(tau=tau, q_des=q_des, dq_des=dq_des)
```

##### 与 HQP-WBC 和 Convex MPC 的关系

与纯 HQP-WBC 相比，WBIC 没有把所有任务都做成多层严格 QP，而是在任务投影后用一个小 QP 处理反力与动力学可行性，因此更适合 Mini Cheetah 的高频动态运动。与纯 Convex MPC 相比，它不仅输出地面反力，还把摆动腿轨迹、身体姿态和关节级命令纳入执行层。

这种方法的工程取舍很清楚：MPC 负责任务级可预见性，WBC 负责本体级实时修正；松弛变量牺牲一部分严格动力学跟踪，换来强动态场景中的可行性和稳定执行。

> 💡 关键：WBIC 不是替代 MPC，而是把 MPC 的反力计划变成“可被全身模型和硬件执行的命令”，这一步对高速四足运动尤其重要。

#### 🧪 练习题
```yaml
question: "WBIC + MPC 框架中，WBC 的主要作用是什么？"
options:
  - "完全替代 MPC，独立规划未来接触序列"
  - "将 MPC 反力与身体/足端任务结合，求解可执行的关节 torque、position、velocity 命令"
  - "只负责视觉建图，不参与动力学控制"
  - "只输出高层速度命令给遥控器"
answer: 1
explain: "MPC 给出长时域反力参考，WBC/WBIC 在当前时刻结合全身任务、动力学和接触约束，修正反力并生成关节级命令。"
```

### HWC-Loco

```yaml
id: hwc_loco
num: 19
name: HWC-Loco
full_name: 层次全身控制行走 (Hierarchical Whole-Body Control)
year: '2025'
org: TUM
parent: ihwbc
paper_url: https://www.researchgate.net/publication/389012345
project_url: ''
category: wbc
motivation: 鲁棒人形行走控制
```

#### 📝 一句话总结
HWC-Loco 将人形机器人运动学习拆成目标跟踪策略、安全恢复策略和高层切换策略，利用层次控制在“完成速度/动作目标”和“从危险状态恢复稳定”之间动态取舍，从而提升人形机器人在扰动、复杂地形和跨平台部署中的鲁棒性。

#### 🎯 核心要点
- **双低层策略**：Goal-tracking policy 负责高效人形行走，Safety recovery policy 负责从 hard kick、失衡和极端姿态中恢复
- **高层 Double-DQN selector**：输入与低层策略相同的本体观测，输出二维 Q 值，在两种低层策略之间切换
- **切换惩罚**：高层训练中加入 switch penalty，减少频繁抖动切换，保证行为连续
- **鲁棒优化视角**：把策略学习看作目标性能与安全恢复之间的约束/鲁棒优化，而不是单一奖励最大化
- **人类运动先验**：使用 CMU MoCap 行走、慢跑、跑步等 318 段 locomotion 数据进行 retargeting，形成更自然的人形行为
- **历史观测编码**：Actor 使用历史观测编码器和 merger 提取固定维特征，提高对速度、ZMP、姿态和外部扰动的感知
- **VAE 与特权信息估计**：用历史观测推断 latent 和特权状态，增强未知地形/动力学下的状态理解
- **多地形训练**：Isaac Gym 中训练 flats、obstacles、slopes、stairs，并用课程学习调整难度

#### 🔬 深入细节
##### 资料依据与框架图

> ⚠️ 说明：清单 `paper_url` 是 ResearchGate 风格占位链接，公开论文可检索为 `arXiv:2503.00923`，题名 *HWC-Loco: A Hierarchical Whole-Body Control Approach to Robust Humanoid Locomotion*。以下精读基于该公开 arXiv 版本；YAML 按清单原值保留。

![HWC-Loco 框架总览](https://arxiv.org/html/2503.00923v3/x2.png)
*图：HWC-Loco 先训练目标跟踪策略和安全恢复策略，再训练高层 selector 在两者之间切换，兼顾任务性能与安全恢复。*

##### 动机与背景

人形机器人行走策略常见问题是“正常状态性能很好，极端状态恢复很差”。如果把所有场景都放进一个 PPO 奖励里训练，策略要么为了安全变得过于保守，要么为了速度跟踪在强扰动下摔倒。HWC-Loco 的切入点是分层：把正常行走和危险恢复看成两类不同技能，再训练一个高层策略决定何时切换。

这与传统 WBC 的层次任务思想相似，但 HWC-Loco 的层次不是 QP 优先级，而是学习策略层面的层次：低层连续策略输出关节目标，高层离散策略负责选择“继续追踪目标”还是“进入恢复模式”。

##### 低层策略：目标跟踪与安全恢复

低层策略输入本体观测 \(o_t\)，包括基座角速度、roll/pitch、关节位置/速度、上一时刻动作和投影重力等；动作是关节目标位置，交给 PD 控制器生成力矩。目标跟踪策略通过 PPO 训练，奖励强调速度命令跟踪：

$$
r_{\text{track}} =
\exp(-\alpha_v\|v_{xy}-v_{xy}^{cmd}\|^2)
+ \exp(-\alpha_\omega|\omega_z-\omega_z^{cmd}|^2)
$$

同时加入能耗、安全和动作平滑约束，例如 torque、DoF velocity、DoF acceleration、action rate、碰撞和关节限位惩罚。训练地形包括平地、障碍、坡道和楼梯，并采用课程学习：当目标速度跟踪达到阈值时提高地形难度，低于阈值时降低难度。

恢复策略使用类似任务奖励，但速度跟踪容忍度更大，并加入站立/姿态恢复奖励：

$$
r_{\text{stand}} = \exp(-\alpha_q\|q-q_{\text{default}}\|^2)
$$

直觉是：危险状态下不应继续强迫机器人精确追踪速度命令，而应优先回到稳定可控的站立/行走状态。

##### 高层策略：Double-DQN 切换器

高层 selector 是一个离散动作策略：

$$
a_t^{H} \in \{\text{goal},\ \text{recovery}\}
$$

它输出两个 Q 值：

$$
Q_\psi(o_t,\text{goal}),\quad Q_\psi(o_t,\text{recovery})
$$

执行时选择 Q 值更大的低层策略。训练采用 Double-DQN，目标为：

$$
y_t = r_t + \gamma Q_{\bar{\psi}}\left(o_{t+1},
\arg\max_a Q_\psi(o_{t+1},a)\right)
$$

切换惩罚为：

$$
r_t^{H} = r_t^{task} - \lambda_{\text{switch}}\mathbf{1}[a_t^H \ne a_{t-1}^H]
$$

这样 selector 不会因为短期 Q 值波动在两个策略间高频抖动，而是在危险状态持续时进入 recovery，恢复后再切回 goal tracking。

##### 训练伪代码

```python
# HWC-Loco 训练流程伪代码
# Stage 1: 训练目标跟踪策略
pi_goal = train_ppo(
    terrains=["flat", "obstacle", "slope", "stairs"],
    reward=velocity_tracking + safety_energy_regularization,
    curriculum=True,
)

# Stage 2: 训练安全恢复策略
pi_recovery = train_ppo(
    initial_states=extreme_and_disturbed_states,
    reward=relaxed_velocity_tracking + standing_recovery + safety_regularization,
)

# Stage 3: 冻结低层策略，训练高层 Double-DQN selector
Q, Q_target = init_selector(), init_target()
replay = ReplayBuffer()
for episode in range(num_episodes):
    obs = env.reset()
    prev_mode = None
    while not done:
        mode = epsilon_greedy(Q(obs))  # goal or recovery
        switch_penalty = lambda_switch if mode != prev_mode else 0.0
        action = pi_goal(obs) if mode == "goal" else pi_recovery(obs)
        next_obs, task_reward, done = env.step(action)
        replay.add(obs, mode, task_reward - switch_penalty, next_obs, done)
        update_double_dqn(Q, Q_target, replay)
        obs, prev_mode = next_obs, mode
```

##### 历史编码、VAE 与人类先验

HWC-Loco 不只使用瞬时观测。Actor 先用 encoder 处理每个历史时刻的观测，再用 merger 聚合为固定维特征。这对人形机器人尤其重要，因为速度、接触状态、外部推搡和 ZMP 相关信息往往需要从短期历史中推断。

论文还引入 VAE：encoder 从历史观测输出 latent 和特权信息估计，decoder 从 latent 重建下一观测。这样的辅助学习让策略获得更稳定的隐式状态估计，类似 RMA/DreamWaQ 系列中“从历史推断环境”的思想。人类运动先验来自 CMU MoCap locomotion 数据，经过 skeleton 对齐、旋转/平移/尺度调整和关节映射，帮助目标跟踪策略形成更自然的人形步态。

##### 与传统 WBC / 单策略 RL 的区别

传统模型 WBC 通常通过任务优先级或 QP 约束显式保证安全，但对复杂扰动和多地形需要大量建模与调参。单策略 RL 虽部署简单，却把正常行走和极端恢复混在一个奖励里，容易出现安全-性能冲突。HWC-Loco 的折中是用学习策略表达复杂行为，用层次切换表达安全优先级。

> 💡 关键：HWC-Loco 的“层次”不是单纯多网络堆叠，而是把不同风险状态对应到不同控制目标。正常状态追求速度和人类式动作，危险状态放宽任务跟踪并优先恢复稳定。

#### 🧪 练习题
```yaml
question: "HWC-Loco 为什么要单独训练 safety recovery policy？"
options:
  - "为了替代 PD 控制器输出电流"
  - "为了在危险状态下放宽速度跟踪，优先恢复稳定姿态，再切回目标跟踪"
  - "为了只在平地上行走，避免复杂地形"
  - "为了把所有观测换成视觉图像"
answer: 1
explain: "正常行走和极端恢复的最优目标不同。恢复策略牺牲部分速度跟踪精度，强调站立、姿态和安全约束，高层 selector 在需要时切换到该策略。"
```

### Domain Randomization

```yaml
id: domain_rand
num: 20
name: Domain Randomization
full_name: 域随机化 (Domain Randomization)
year: '2018'
org: Google Brain
parent: —
paper_url: https://arxiv.org/abs/1804.10332
project_url: ''
category: sim2real
motivation: 随机化物理参数弥合仿真差异
```

#### 📝 一句话总结
Domain Randomization 将机器人训练环境中的质量、惯量、摩擦、延迟、执行器、地形和扰动等物理因素随机化，使策略在一簇仿真域上优化期望回报，从而把真实世界看成随机域分布中的一个样本，缓解从仿真到真实机器人的现实差距。

#### 🎯 核心要点
- **随机化物理参数**：在 episode 级别采样机体质量、腿部质量、惯量、摩擦、阻尼、电机强度和执行器响应等参数
- **随机化外部扰动**：训练中加入随机推力/冲击，提升策略对真实碰撞、打滑和未知地形的恢复能力
- **执行器建模**：论文链接对应的 Minitaur 工作包含电机动力学拟合和控制延迟建模，减少策略在真实硬件上的动作失真
- **仿真域期望优化**：优化目标不是某个标称仿真，而是随机参数分布下的平均性能
- **无需真实数据微调**：策略只在仿真中训练，通过覆盖足够宽的参数范围直接迁移到硬件
- **与系统辨识互补**：系统辨识让仿真中心更接近真实，domain randomization 让策略对剩余误差不敏感
- **四足运动验证**：在 Minitaur 上学习 trot/gallop 等步态，并展示随机化显著缩小 sim-to-real gap

#### 🔬 深入细节
##### 核心示意图

![随机化对 Sim-to-Real 性能的影响](https://ar5iv.labs.arxiv.org/html/1804.10332/assets/x3.png)
*图：不同仿真质量和随机扰动组合下，仿真性能与真实机器人性能的差异。改进仿真模型并加入随机扰动后，真实性能更接近仿真。*

![惯量随机化泛化实验](https://ar5iv.labs.arxiv.org/html/1804.10332/assets/x4.png)
*图：对不同机体惯量进行测试时，带随机化训练的控制器比未随机化控制器泛化更稳定。*

##### 动机与背景

强化学习可以在仿真中产生复杂运动，但真实机器人和仿真总有差异：摩擦系数不准、执行器有延迟、接触模型不完全、质量和惯量存在制造误差，地面也不是理想刚体。若策略只在一个“标称仿真”上训练，它会利用仿真细节，例如刚好踩在某个接触模型的稳定区域，真实硬件上这些细节不存在，策略就会摔倒。

Domain Randomization 的思路很直接：与其试图把仿真调到完全等于真实，不如让训练时的仿真不断变化。只要真实世界落在这组变化范围内，策略就会学到对参数不敏感的行为。

##### 数学形式

令 \(\xi\) 表示仿真域参数，包括动力学、接触、执行器和观测噪声：

$$
\xi = [m,\ I,\ \mu,\ k_d,\ \tau_{\text{delay}},\ \eta_{\text{motor}},\ h_{\text{terrain}},\ldots]
$$

训练时从分布 \(p(\xi)\) 采样：

$$
\xi_i \sim p(\xi)
$$

策略优化目标为：

$$
\pi^* =
\arg\max_\pi
\mathbb{E}_{\xi\sim p(\xi)}
\left[
\mathbb{E}_{\tau\sim P_\xi(\tau|\pi)}
\sum_{t=0}^{T}\gamma^t r(s_t,a_t;\xi)
\right]
$$

这个目标的含义是：策略不追求在某个固定世界最优，而是在一组可能世界里平均表现好。若参数分布覆盖真实机器人，真实部署时的性能可看作该期望目标中的一个样本点。

##### 训练流程伪代码

```python
# Domain Randomization for locomotion
for iteration in range(num_policy_updates):
    trajectories = []
    for env in parallel_envs:
        # episode 开始时随机化域
        xi = sample({
            "base_mass": uniform(m0 * 0.8, m0 * 1.2),
            "link_inertia": uniform(I0 * 0.7, I0 * 1.3),
            "ground_friction": uniform(0.5, 1.5),
            "motor_strength": uniform(0.8, 1.2),
            "control_latency": uniform(0, 20_ms),
            "terrain_profile": random_roughness(),
        })
        env.set_physics(xi)

        for t in range(horizon):
            if random_event():
                env.apply_push(force=random_force())
            action = policy(observation)
            observation, reward, done = env.step(action)
            trajectories.append((observation, action, reward, done))

    update_policy_with_rl(trajectories)
```

##### 关键设计一：随机范围不能只靠“越大越好”

随机范围太窄，真实世界可能落在分布外，策略仍然脆弱；随机范围太宽，策略会为了覆盖所有情况变得极度保守，训练也更难收敛。因此实际工程常采用两步：

1. **系统辨识**：用真实硬件数据估计仿真参数中心，例如电机响应、质量、关节摩擦；
2. **围绕中心随机化**：在可信误差范围内扰动参数，让策略对剩余建模误差鲁棒。

论文链接对应的 Minitaur 工作就不仅随机化参数，还改进了电机模型和硬件控制链路。图中对比显示，单纯 baseline 仿真、baseline+扰动、改进仿真+扰动的真实效果逐步提升。

##### 关键设计二：动作与观测也要随机化

真实硬件差异不仅来自动力学参数，还来自控制接口。电机命令可能延迟，关节角有噪声，IMU 有偏置，足端接触并非精确二值。因此 domain randomization 通常要覆盖：

- **动作侧**：电机强度缩放、命令延迟、动作低通滤波、PD 增益扰动；
- **观测侧**：关节角/速度噪声、IMU 噪声、延迟观测、随机丢帧；
- **环境侧**：摩擦、地形高度、坡度、外部推力；
- **形体侧**：质量、惯量、质心偏移、腿长误差。

如果只随机化地面摩擦，而忽略执行器延迟，策略可能在真实机器人上因为相位滞后而失败。

##### 与其他 Sim-to-Real 方法的区别

Domain Randomization 是一种“训练分布扩展”方法，不需要在线估计真实参数；RMA 则在部署时从历史观测估计 extrinsics 并动态调节策略；Isaac Gym/Isaac Lab 提供大规模并行仿真，使随机化可以在数千环境中高效执行。三者关系并非替代：现代腿足 RL 往往同时使用 GPU 并行仿真、广泛 domain randomization 和在线适应模块。

> 💡 关键：Domain Randomization 的目标不是让仿真更真实，而是让策略不依赖仿真的某个脆弱细节。真实世界只要处在训练域族内，策略就更可能零射成功。

#### 🧪 练习题
```yaml
question: "Domain Randomization 缩小 sim-to-real gap 的核心思路是什么？"
options:
  - "把真实机器人数据全部加入监督学习数据集"
  - "训练时随机化仿真参数，使策略在一组可能世界上都表现稳定"
  - "只使用更高分辨率渲染图像"
  - "部署时实时求解精确接触动力学方程"
answer: 1
explain: "Domain Randomization 将真实世界视为随机化仿真域中的一个样本，通过优化域分布下的期望回报提升策略对建模误差的鲁棒性。"
```

### Isaac Gym

```yaml
id: isaac_gym
num: 21
name: Isaac Gym
full_name: NVIDIA物理仿真 (Isaac Gym Physics Simulation)
year: '2021'
org: NVIDIA
parent: domain_rand
paper_url: https://arxiv.org/abs/2108.10470
project_url: ''
category: sim2real
motivation: 端到端GPU物理仿真训练平台
```

#### 📝 一句话总结
Isaac Gym 提出端到端 GPU 强化学习仿真管线，将物理仿真、状态张量读写、神经网络前向和策略优化都放在 GPU 上，消除传统 CPU 仿真与 GPU 训练之间的数据搬运瓶颈，使数千到上万并行机器人环境的训练成为常规工作流。

#### 🎯 核心要点
- **GPU PhysX 后端**：刚体、关节、接触和约束求解直接在 GPU 上执行
- **Tensor API**：仿真状态和控制量以 PyTorch 可直接包装的 GPU tensor 暴露，避免 CPU round-trip
- **大规模向量化环境**：同一 scene 中复制成千上万个环境，每步并行推进并批量采样 RL 数据
- **端到端训练闭环**：`simulate → refresh tensors → policy forward → set action tensors → optimizer update` 全流程在 GPU 上完成
- **显著吞吐提升**：论文报告整体 RL 数据采集/训练管线可获得 100–1000x 级加速，任务训练时间从数天降到分钟/小时级
- **机器人任务库**：Ant、Humanoid、ANYmal、Shadow Hand、Franka cube stack、TriFinger 等环境验证
- **支撑 Domain Randomization**：大量并行环境天然适合对物理参数、地形、初始状态和观测噪声做逐环境随机化

#### 🔬 深入细节
##### 核心框架图

![Isaac Gym GPU RL 管线](https://ar5iv.labs.arxiv.org/html/2108.10470/assets/x1.png)
*图：Isaac Gym 的 Tensor API 让 Python/RL 代码直接在 GPU 上 step PhysX 后端并读取/写入仿真状态。*

![传统管线与端到端 GPU 管线对比](https://ar5iv.labs.arxiv.org/html/2108.10470/assets/figure/tensor_api/end2end.png)
*图：传统 RL 需要 CPU 物理引擎和 GPU 神经网络之间反复拷贝；Isaac Gym 将仿真与策略计算放在同一 GPU 侧。*

##### 动机与背景

强化学习运动控制需要极大量环境交互。传统仿真器往往在 CPU 上运行，神经网络训练在 GPU 上运行，中间的状态拷贝、进程同步和 Python 调度会成为瓶颈。即使神经网络很快，采样速度也会被 CPU physics 限制；如果使用多进程 CPU 并行，又会增加系统复杂度和数据传输成本。

Isaac Gym 的工程判断是：RL 训练最重要的是吞吐，而不是每个环境单独可视化得多精细。只要把大批量相似机器人环境并行铺到 GPU 上，物理 step、状态收集、策略前向和 loss 计算都可以共享 GPU 的大规模并行能力。

##### Tensor API 与状态布局

Isaac Gym 将场景中所有 actor、rigid body、DOF、force sensor 的状态组织成大张量。例如刚体状态可写成：

$$
X_{\text{body}}\in\mathbb{R}^{N_B\times 13}
$$

其中每行包含位置、四元数、线速度和角速度。DOF 状态可写成：

$$
X_{\text{dof}}\in\mathbb{R}^{N_D\times 2}
$$

包含关节位置和速度。RL 代码不需要逐环境调用 getter，而是一次 refresh tensor 后按 env index 切片：

```python
root_state_tensor = gym.acquire_actor_root_state_tensor(sim)
dof_state_tensor = gym.acquire_dof_state_tensor(sim)
root_states = gymtorch.wrap_tensor(root_state_tensor)  # GPU tensor
dof_states = gymtorch.wrap_tensor(dof_state_tensor)    # GPU tensor
```

这个设计让观察构造变成 GPU 上的张量索引和拼接，策略网络可直接消费同一块显存中的数据。

##### PPO 训练循环伪代码

```python
# Isaac Gym 风格端到端 GPU PPO
sim = create_gpu_physx_sim(num_envs=8192)
obs_buf = torch.zeros(num_envs, obs_dim, device="cuda")
rew_buf = torch.zeros(num_envs, device="cuda")

for update in range(num_updates):
    rollout = []
    for t in range(horizon):
        gym.refresh_actor_root_state_tensor(sim)
        gym.refresh_dof_state_tensor(sim)
        obs_buf = build_observations(root_states, dof_states, commands)

        with torch.no_grad():
            action, logprob, value = policy(obs_buf)

        gym.set_dof_actuation_force_tensor(sim, unwrap(action_to_torque(action)))
        gym.simulate(sim)
        gym.fetch_results(sim, True)

        reward, done = compute_reward_and_reset(root_states, dof_states)
        rollout.append((obs_buf, action, logprob, value, reward, done))

    advantages = compute_gae(rollout)
    ppo_update(policy, rollout, advantages)  # still on GPU
```

关键点是：`obs_buf`、`action`、`reward` 和 rollout buffer 全部是 GPU tensor。与传统 Gym 环境相比，这不是“用 GPU 加速网络”，而是把环境本身也向量化为 GPU 工作负载。

##### 为什么适合腿足机器人

腿足 RL 训练通常会同时使用 domain randomization、课程学习和大规模并行环境。Isaac Gym 使每个环境都可以有不同地形、不同摩擦、不同随机推力、不同 payload，并在同一次 GPU step 中并行推进。这让策略在训练早期快速见到足够多失败案例，也让后期可以覆盖更广的 sim-to-real 分布。

在 ANYmal 粗糙地形任务中，论文展示了策略在 Isaac Gym 中训练后转移到真实机器人。平台本身不提供 sim-to-real 的理论保证，但它让以前代价很高的“大量随机化 + 大量并行采样”变得可执行。

##### 与传统仿真器和后续平台的关系

传统 MuJoCo、PyBullet、RaiSim 等仿真器在模型准确性、API 成熟度或 CPU 并行上各有优势；Isaac Gym 的突破点是端到端 GPU tensor 管线。后续 Isaac Sim/Isaac Lab 继承了这一思路，并在 Omniverse、传感器、资产和任务管理上扩展。

> 💡 关键：Isaac Gym 不是一种控制算法，而是改变了运动控制算法的训练成本结构。它让 PPO、domain randomization、RMA、legged_gym 等方法能在成千上万并行机器人上快速迭代。

#### 🧪 练习题
```yaml
question: "Isaac Gym 相比传统 CPU 物理仿真训练管线的核心优势是什么？"
options:
  - "用更复杂的奖励函数替代 PPO"
  - "将物理仿真状态以 GPU tensor 暴露给策略网络，避免 CPU-GPU 数据搬运瓶颈"
  - "完全不需要物理引擎"
  - "只能训练单个机器人环境但精度更高"
answer: 1
explain: "Isaac Gym 的 Tensor API 让仿真 step、状态读写、策略前向和优化都在 GPU 侧完成，支持数千环境并行并显著提升 RL 吞吐。"
```

### RMA

```yaml
id: rma
num: 22
name: RMA
full_name: 快速运动自适应 (Rapid Motor Adaptation)
year: '2021'
org: UC Berkeley
parent: domain_rand
paper_url: https://www.science.org/doi/10.1126/scirobotics.abk2822
project_url: ''
category: sim2real
motivation: 在线自适应网络实时调整策略
```

#### 📝 一句话总结
RMA 提出“基础策略 + 在线适应模块”的两阶段训练框架：基础策略在仿真中使用特权环境参数 latent 学习运动，适应模块在部署时仅从最近的本体历史估计该 latent，使四足机器人能实时适应摩擦、载荷、地形高度和执行器差异等未知变化。

#### 🎯 核心要点
- **两子系统架构**：Base policy \(\pi\) 负责 100 Hz 关节目标输出，adaptation module \(\phi\) 以较低频率从历史观测预测 extrinsics latent
- **特权环境因子编码器**：训练阶段用环境参数 \(e_t\) 经 encoder \(\mu\) 生成 latent \(z_t\)，作为基础策略输入
- **两阶段训练**：先用 RL 训练带特权 latent 的基础策略，再冻结基础策略，用监督学习训练 \(\phi\) 从历史状态-动作估计 \(z_t\)
- **纯本体在线适应**：部署时不需要视觉、真实参数测量或在线梯度更新，只用最近状态和动作历史估计环境变化
- **异步设计**：适应模块 10 Hz 更新 latent，基础策略 100 Hz 使用最近 latent 输出动作，适合低算力板载部署
- **广泛随机化环境参数**：训练中随机化摩擦、质量、质心、惯量、地形高度、外力、关节增益和电机参数
- **真实鲁棒性验证**：在油滑塑料、泡沫、台阶、斜坡和负载变化下，相比无适应策略和厂商控制器表现更稳

#### 🔬 深入细节
##### 核心框架图

![RMA 训练与部署框架](https://ar5iv.labs.arxiv.org/html/2107.04034/assets/x1.png)
*图：RMA 上半部分为两阶段训练：基础策略使用特权 extrinsics latent；适应模块学习从历史观测预测 latent。下半部分为部署：只用本体历史在线估计 latent 并驱动基础策略。*

##### 动机与背景

Domain Randomization 让策略在许多仿真参数上平均鲁棒，但它本质上训练的是一个“对所有情况都还可以”的策略。当机器人突然背上重物、踩到油滑地面或走上软泡沫时，最优动作其实应该快速改变：需要更大力矩、更短支撑周期、更谨慎的摆腿，或者更保守的速度响应。若策略无法知道当前处于哪种环境，只能学到折中行为。

RMA 的核心问题是：能否在不使用真实参数传感器、不在线反向传播的情况下，让机器人从自身运动历史推断当前环境？答案是把可观测历史映射到一个低维 extrinsics latent，再让基础策略条件化于这个 latent。

##### 阶段一：带特权 latent 的基础策略

仿真中环境因子 \(e_t\) 是已知的，例如摩擦、payload、质心偏移、地形高度和电机强度。RMA 用 encoder \(\mu\) 将其压缩为：

$$
z_t = \mu(e_t)
$$

基础策略输入当前观测 \(x_t\)、上一动作 \(a_{t-1}\) 和 latent：

$$
a_t = \pi_\theta(x_t, a_{t-1}, z_t)
$$

策略通过 model-free RL 训练：

$$
\theta^* =
\arg\max_\theta
\mathbb{E}_{e\sim p(e),\tau\sim\pi_\theta}
\sum_t \gamma^t r_t
$$

因为 \(\pi\) 能看到真实 \(z_t\)，它可以学会“在低摩擦时怎样走、在高负载时怎样走、在粗糙地形时怎样抬腿”。这一步相当于训练一个环境条件化专家。

##### 阶段二：从历史观测估计 latent

真实部署时 \(e_t\) 不可见，因此 RMA 训练适应模块 \(\phi\)：

$$
\hat{z}_t =
\phi(x_{t-k:t}, a_{t-k:t-1})
$$

监督目标是匹配阶段一中的特权 latent：

$$
\mathcal{L}_{\text{adapt}} =
\|\phi(x_{t-k:t},a_{t-k:t-1}) - \mu(e_t)\|_2^2
$$

训练数据来自基础策略在随机化仿真中的 on-policy rollout。这样 \(\phi\) 学到的是“在策略真实会遇到的状态分布上，哪些历史运动模式对应哪些环境因子”。例如低摩擦会导致足端打滑、速度跟踪误差和关节力矩模式变化；额外 payload 会造成机身下沉和更大腿部负载，这些都能从历史本体信号中推断。

##### 训练与部署伪代码

```python
# Phase 1: privileged base policy training
for iteration in range(rl_updates):
    e = sample_environment_factors()      # friction, mass, terrain, motor params
    z = mu(e)                             # privileged extrinsics latent
    for t in rollout:
        action = pi(x_t, a_prev, z)
        x_next, reward = env.step(action)
    PPO_or_RL_update(pi, mu, reward)

# Phase 2: adaptation module training
freeze(pi, mu)
dataset = collect_on_policy_rollouts(pi, randomized_envs)
for batch in dataset:
    hist = batch.states_actions_history
    z_target = mu(batch.privileged_environment_factors)
    z_hat = phi(hist)
    update(phi, mse(z_hat, z_target))

# Deployment
while robot_is_running:
    if adaptation_tick_10hz:
        z_hat = phi(recent_state_action_history)
    action = pi(current_state, previous_action, z_hat)  # 100 Hz
    send_pd_target(action)
```

##### 为什么 RMA 比“纯随机化鲁棒策略”更强

纯 domain randomization 会把所有环境变化平均到一个策略中。如果环境差异很大，策略需要选择保守动作以覆盖最坏情况。RMA 则将随机化环境中的可变因素编码成条件变量，使基础策略可以在同一个网络里表达多种行为模式：

$$
\pi(a|x) \quad \rightarrow \quad \pi(a|x,\hat{z})
$$

这相当于把“鲁棒性”从静态折中变成在线识别。适应模块每 0.1 秒更新一次 latent，基础策略不需要在线学习就能改变输出模式，因此适合真实机器人实时控制。

##### 实验直觉

论文展示了油滑塑料地面实验：机器人进入低摩擦区域后，\(\hat{z}\) 的某些维度快速变化，膝关节力矩增大，步态周期恢复到接近正常。这说明适应模块并不是识别出“摩擦系数数值”，而是输出一个对策略有用的隐式环境编码。

在负载实验中，机器人背部被增加 5 kg 沙袋后，机身瞬间下沉，\(\hat{z}\) 迅速跳变并维持在新状态，策略随之提高支撑力。对 12 kg 左右的 A1 机器人而言，5 kg 是显著载荷，这验证了 latent 适应的实际价值。

##### 与 Teacher-Student 感知方法的关系

RMA 与 Perceptive Locomotion/DreamWaQ 的共同点是都用特权信息训练、部署时用可观测历史估计隐状态。区别在于 RMA 的 latent 主要描述动力学和外部环境因子，输入只依赖本体感知；Perceptive Locomotion 额外使用外感地图；DreamWaQ++ 则进一步融合外感和本体 latent。RMA 因此是许多后续运动策略“在线适应模块”的基础模板。

> 💡 关键：RMA 的适应模块不是在线优化器，而是一个前馈历史编码器。它把最近运动误差转换为策略可用的环境 latent，实现毫秒级自适应。

#### 🧪 练习题
```yaml
question: "RMA 部署时 adaptation module 预测的是什么？"
options:
  - "真实世界的精确摩擦系数和质量标量"
  - "从最近本体状态和动作历史估计的 extrinsics latent，用于条件化基础策略"
  - "未来相机图像"
  - "MPC 的完整接触力序列"
answer: 1
explain: "RMA 的适应模块不需要显式输出物理参数，而是预测训练阶段特权环境因子 encoder 产生的低维 latent，基础策略用该 latent 实时调整动作。"
```

### Isaac Lab

```yaml
id: isaac_lab
num: 23
name: Isaac Lab
full_name: NVIDIA机器人学习平台 (Isaac Lab)
year: '2024'
org: NVIDIA
parent: isaac_gym
paper_url: https://arxiv.org/abs/2407.02229
project_url: ''
category: sim2real
motivation: Omniverse多模态机器人学习平台
```

#### 📝 一句话总结
Isaac Lab 将 Isaac Gym 的 GPU 并行强化学习范式扩展成基于 Isaac Sim/Omniverse 的多模态机器人学习平台，统一高保真物理、RTX 传感器、域随机化、演示采集和 RL/IL 工作流，解决现代 sim-to-real 训练中“仿真快但不够真实、真实但不够可扩展”的矛盾。

#### 🎯 核心要点
- 继承 Isaac Gym 的 GPU-native 并行仿真优势，并引入 Isaac Sim 的 PhysX、RTX 渲染和 USD 场景生态
- 采用 manager-based API，将 observation、action、reward、termination、event/randomization 等环境逻辑拆成可复用组件
- 支持多频率传感器和控制链路，包括 RGB-D、segmentation、LiDAR/height scan、IMU、触觉和本体状态
- 内置域随机化、程序化场景生成、actuator model、低层控制器接口和演示数据采集管线
- 兼容多种学习库与范式：RSL-RL、RL-Games、SKRL、SB3、Ray，以及模仿学习和运动规划流程
- 面向 locomotion、whole-body control、navigation、工业装配、灵巧手操作、医疗机器人和 GR00T 类基础模型数据生成
- 相比 Isaac Gym，从“高吞吐 RL 仿真器”升级为“高保真、多模态、可扩展的机器人学习操作系统”

#### 🔬 深入细节
##### 核心示意图

![Isaac Lab 多模态机器人学习示意图](https://ar5iv.labs.arxiv.org/html/2511.04831/assets/x1.png)
*图：Isaac Lab 技术报告中的总览图。该图展示 Isaac Lab 对多机器人、多传感器和 sim-to-real 工作流的统一支撑。*

![Isaac Lab 传感器与资产组件](https://developer-blogs.nvidia.com/wp-content/uploads/2026/02/issac-lab-assets-multimodal-sensors-controllers-png.webp)
*图：Isaac Lab 通过资产、传感器、控制器和程序化场景构建可组合机器人学习环境。*

> ⚠️ 依据限制：清单中的 `paper_url` 当前指向 arXiv:2407.02229（LaMoD 医学影像论文），与 Isaac Lab 不匹配。以下精读基于 NVIDIA Isaac Lab 官方资料与公开技术报告 arXiv:2511.04831，YAML 元信息按任务清单原样保留。

##### 算法伪代码

```python
# Isaac Lab 中典型 manager-based RL 环境训练流程

env_cfg = ManagerBasedRLEnvCfg(
    scene=SceneCfg(robot="humanoid", num_envs=4096, terrain="procedural"),
    observations=ObservationManagerCfg(
        policy=["joint_pos", "joint_vel", "base_velocity", "rgbd_camera"]
    ),
    actions=ActionManagerCfg(
        joint_targets=JointPositionActionCfg(actuator_model="learned_motor")
    ),
    rewards=RewardManagerCfg(
        track_velocity=RewardTerm(weight=1.0),
        energy_penalty=RewardTerm(weight=-0.01),
        fall_penalty=RewardTerm(weight=-5.0),
    ),
    events=EventManagerCfg(
        randomize_mass=True,
        randomize_friction=True,
        randomize_lighting=True,
        push_robot=True,
    ),
)

env = IsaacLabEnv(env_cfg)
policy = PPO(policy_net, value_net)

for update in range(num_updates):
    rollout = []
    obs = env.reset_if_needed()
    for t in range(horizon):
        action = policy.act(obs)
        next_obs, reward, done, info = env.step(action)
        rollout.append((obs, action, reward, done))
        obs = next_obs

    loss = policy.compute_ppo_loss(rollout)
    policy.update(loss)

    if update % eval_interval == 0:
        validate_in_high_fidelity_scene(policy)
```

##### 方法详解

**动机与背景：为什么 Isaac Gym 之后还需要 Isaac Lab？**

Isaac Gym 的核心价值是把物理仿真和 RL rollout 全部放在 GPU 上，极大提升了四足、机械臂和人形机器人策略训练速度。但随着机器人学习进入多模态阶段，单纯“快”不够了：策略需要从 RGB-D、语义分割、触觉、LiDAR、本体状态等多源信号中学习，还要在更复杂的 USD 场景、真实材质、复杂接触和多频控制中保持可迁移性。Isaac Lab 的定位就是把 Isaac Gym 的吞吐优势和 Isaac Sim/Omniverse 的高保真资产生态合在一起。

**核心机制一：manager-based 可组合环境设计**

Isaac Lab 最重要的工程抽象是 manager-based workflow。传统 RL 环境常把观测拼接、动作映射、奖励计算、终止条件、随机化和场景重置写在一个脚本里，短期能跑，长期难复用。Isaac Lab 将环境定义拆成多个 manager：

- Observation Manager：定义策略看到什么，例如关节状态、相机图像、高度扫描
- Action Manager：定义策略输出如何映射到关节、末端执行器或低层控制器
- Reward Manager：把奖励项拆成带权重的可复用函数
- Event Manager：管理域随机化、外力扰动、重置逻辑和场景变化
- Termination Manager：定义跌倒、越界、任务完成等结束条件

这种设计把“机器人学习任务”拆成可配置组件，使研究者可以替换奖励或传感器而不重写物理场景。对大规模实验尤其重要，因为 sim-to-real 往往需要系统性扫描质量、摩擦、延迟、噪声、光照和相机外参。

**核心机制二：高保真物理和多模态传感器**

Isaac Lab 建立在 PhysX 与 RTX 渲染之上。物理层支持刚体、关节、接触、闭链、软体/布料等复杂交互；渲染层支持 tiled rendering，可在成千上万个并行环境中生成 RGB、depth、segmentation 等视觉信号。其目标不是让所有任务都用最贵的仿真，而是允许研究者在训练吞吐和物理/视觉真实性之间选择合适的点。

这一点对运动控制很关键。纯状态输入的 locomotion 可以在低视觉负载下追求极高 FPS；视觉导航、灵巧抓取或医疗任务则更依赖高质量传感器仿真。Isaac Lab 把这些工作流放在同一套 API 下，避免从 locomotion 切到 vision policy 时重建整个仿真栈。

**核心机制三：sim-to-real 的随机化、actuator model 与验证闭环**

机器人策略迁移失败通常不是因为 PPO 或 BC 本身，而是仿真中的电机、接触、延迟和传感器噪声与真实世界不一致。Isaac Lab 在环境层提供事件随机化，在动作层支持 actuator model，并通过可配置传感器模拟真实机器人中不同频率的数据流。

可以把 sim-to-real 目标写成：

$$
\pi^\* = \arg\max_\pi \mathbb{E}_{\xi \sim p(\xi)}\left[\sum_t \gamma^t r(s_t, a_t; \xi)\right]
$$

其中 \(\xi\) 表示被随机化的物理和传感器参数。传统做法常只随机化少量摩擦或质量；Isaac Lab 倾向于把材质、光照、相机、动作延迟、外力扰动和场景布局都纳入配置化流程，让训练分布覆盖真实部署的不确定性。

**训练/推理流程**

在训练阶段，Isaac Lab 并行创建大量环境，批量执行 rollout，把观测送给策略网络并收集奖励。学习算法本身可以来自外部库，例如 PPO、SAC、BC 或 diffusion policy。Isaac Lab 的作用是稳定地产生高吞吐、高保真、可复现的数据流。部署前，策略通常会经过更高保真的验证场景、系统辨识回放和真实机器人小规模测试。

与 Isaac Gym 相比，Isaac Lab 的创新不在某个单一损失函数，而在训练系统的边界条件：它把“环境构建、传感器、随机化、控制器、数据采集、学习库适配”统一成可组合平台。因此它更像运动控制基础设施，而不是一个单点算法。

#### 🧪 练习题
```yaml
question: "Isaac Lab 相比 Isaac Gym 的关键升级是什么？"
options:
  - "只保留 GPU 并行物理，移除高保真渲染以提高速度"
  - "把物理、RTX 传感器、域随机化和学习工作流统一成可组合机器人学习平台"
  - "只支持机械臂模仿学习，不再支持强化学习"
  - "完全依赖真实机器人数据，不使用仿真训练"
answer: 1
explain: "Isaac Lab 继承 Isaac Gym 的 GPU 并行优势，同时引入 Isaac Sim/Omniverse 的高保真物理、渲染、传感器和 manager-based 工作流，目标是支持多模态 sim-to-real 机器人学习。"
```

### ASAP

```yaml
id: asap
num: 24
name: ASAP
full_name: 残差动作学习 (ASAP Delta Action Learning)
year: '2025'
org: Stanford
parent: rma
paper_url: https://arxiv.org/abs/2504.12609
project_url: ''
category: sim2real
motivation: 残差动作补偿弥合仿真差距
```

#### 📝 一句话总结
ASAP 提出两阶段 sim-to-real 框架：先在仿真中用人类动作重定向训练人形全身跟踪策略，再用真实机器人 rollout 学习 delta action 残差模型并嵌入仿真微调策略，从而补偿动力学差距并实现更敏捷的真实人形动作。

#### 🎯 核心要点
- 提出 **ASAP (Aligning Simulation and Real Physics)**，目标是让人形机器人执行跳跃、踢腿、舞蹈等高动态全身技能
- 使用人类视频/动作数据重建 SMPL 运动，并通过 motion retargeting 转成 Unitree G1 等人形机器人可执行目标
- 第一阶段在仿真中训练 motion tracking policy，得到可在真实机器人上 rollout 的初始策略
- 第二阶段收集真实 rollout，训练 **delta action model**，用残差动作修正仿真状态转移，使仿真更接近真实物理
- 将冻结的 delta action model 接入 simulator，对原策略继续 fine-tune，最终部署时只使用策略本身
- 评估覆盖 IsaacGym→IsaacSim、IsaacGym→Genesis、IsaacGym→真实 Unitree G1 三种迁移场景
- 相比 SysID、Domain Randomization、delta dynamics 等基线，ASAP 更少牺牲动作敏捷性，能降低真实跟踪误差

#### 🔬 深入细节
##### 核心示意图

![ASAP 方法流程图](https://agile.human2humanoid.com/static/images/ASAP_pipeline-crop.png)
*图：ASAP 的四步流程：运动跟踪预训练与真实轨迹采集、delta action model 训练、带对齐仿真的策略微调、真实部署。*

> ⚠️ 依据限制：清单中的 `paper_url` 指向 arXiv:2504.12609（Human2Sim2Robot），不是 ASAP 论文。以下内容基于 ASAP 官方项目页与正确公开论文 arXiv:2502.01143，YAML 元信息按任务清单原样保留。

##### 算法伪代码

```python
# ASAP: delta action model for sim-to-real humanoid skills

# Stage 1: motion tracking pre-training in simulation
for motion in retargeted_human_motions:
    for rollout in simulator:
        a_t = policy(s_t, motion_phase, motion_target)
        s_next = simulator.step(a_t)
        r = tracking_reward(s_next, motion_target)
        update_policy_with_rl(r)

# Collect real trajectories with the pretrained policy
real_buffer = []
for episode in real_robot_rollouts:
    a_t = policy(s_t)
    s_real_next = robot.step(a_t)
    real_buffer.append((s_t, a_t, s_real_next))

# Stage 2: train delta action model to align simulated transition
for s_t, a_t, s_real_next in real_buffer:
    delta_a = delta_model(s_t, a_t)
    s_sim_next = simulator.step(a_t + delta_a)
    loss_delta = mse(features(s_sim_next), features(s_real_next))
    update(delta_model, loss_delta)

# Fine-tune policy inside aligned simulator
freeze(delta_model)
for rollout in aligned_simulator:
    a_t = policy(s_t)
    s_next = simulator.step(a_t + delta_model(s_t, a_t))
    r = tracking_reward(s_next, target_motion)
    update_policy_with_rl(r)

# Deployment: use policy only; delta model served its role during fine-tuning
deploy(policy)
```

##### 方法详解

**动机与背景：为什么 SysID 和域随机化不够？**

高动态人形动作对仿真误差极其敏感。慢速行走可以通过保守策略、摩擦随机化和关节增益调参获得一定鲁棒性，但跳跃、侧移、踢腿、快速转身会放大每个接触、执行器和惯量误差。传统 SysID 试图找到一组更准确的物理参数，但真实硬件中未建模因素很多；域随机化能提高鲁棒性，却容易让策略变保守，牺牲敏捷动作。

ASAP 的核心判断是：与其只改 simulator 参数，不如学习一个“动作侧的残差补偿器”。这个补偿器不直接替换真实动力学，而是在仿真训练时告诉 simulator：如果真实机器人执行 \(a_t\) 会产生某种状态变化，那么仿真中应该用 \(a_t + \Delta a_t\) 才能产生相似后果。

**核心机制一：从人类动作到机器人 motion tracking**

ASAP 首先从人类运动中获得高层动作目标。人类视频经过姿态估计/SMPL 重建后得到人体运动，再通过 retargeting 转成机器人目标姿态。由于人和机器人形态不同，直接复制关节角不可行，训练过程使用 RL 让机器人在自身动力学约束下跟踪目标运动。

策略可写成：

$$
a_t = \pi_\theta(s_t, g_t)
$$

其中 \(s_t\) 是机器人状态，\(g_t\) 是当前相位对应的人类重定向运动目标。奖励通常包含关键点位置、关节姿态、基座速度、接触稳定性和能量项。第一阶段目标不是完美真实部署，而是得到一个足够接近目标技能、能安全收集真实 rollout 的初始策略。

**核心机制二：delta action model 学仿真到真实的转移差异**

给定真实 rollout 数据 \((s_t, a_t, s^r_{t+1})\)，ASAP 学习残差模型：

$$
\Delta a_t = f_\phi(s_t, a_t)
$$

然后让仿真执行：

$$
s^s_{t+1} = F_{sim}(s_t, a_t + \Delta a_t)
$$

训练目标是让仿真下一状态接近真实下一状态：

$$
\mathcal{L}_{\Delta} =
\left\| \psi(s^s_{t+1}) - \psi(s^r_{t+1}) \right\|_2^2
$$

这里 \(\psi(\cdot)\) 可以选择关键的状态特征，例如基座姿态、关节状态、足端接触和速度。相比直接学习 \(\Delta s\) 的 delta dynamics，delta action 的好处是仍然让物理引擎承担大部分动力学约束，残差只在动作接口处调节，减少生成不物理状态的风险。

> 💡 关键：ASAP 不是把真实机器人数据拿来训练一个黑盒动力学模型，而是把残差模型嵌入仿真动作通道，让策略在“更像真实世界的仿真”里继续用 RL 改进。

**核心机制三：对齐仿真中的策略微调**

训练好 delta action model 后，ASAP 将其冻结并接入仿真环境。策略继续输出原始动作 \(a_t\)，仿真执行 \(a_t + f_\phi(s_t, a_t)\)。这一步的意义是让策略在训练时体验真实硬件会产生的动力学偏差，从而主动学会补偿。

最终部署到真实机器人时，ASAP 不需要把 delta model 放在线上控制环里。因为微调后的策略参数已经吸收了这种对齐关系。这一设计让部署系统更简单，也避免残差模型在线推理带来的额外延迟和安全边界问题。

**与传统方法的区别**

SysID 调的是 simulator 参数，假设误差能被少量物理参数解释；Domain Randomization 扩大训练分布，假设真实世界落在随机化包络内；Residual dynamics 学状态变化补偿，容易绕开物理约束。ASAP 的 delta action 位于动作接口，既保留物理仿真的结构先验，又能用真实 rollout 学到复杂误差。

对运动控制而言，ASAP 的价值在于保住“敏捷性”。许多 sim-to-real 方法为了安全会让策略动作变钝，而 ASAP 通过更准确地对齐训练环境，让高动态动作仍能维持节奏、幅度和全身协调。

#### 🧪 练习题
```yaml
question: "ASAP 中 delta action model 的主要作用是什么？"
options:
  - "直接替代真实机器人控制策略，在部署时输出全部动作"
  - "在仿真中给策略动作加残差，使仿真转移更接近真实机器人"
  - "把人类视频直接转换成机器人关节角并跳过强化学习"
  - "随机化所有物理参数，使策略完全不依赖仿真精度"
answer: 1
explain: "ASAP 用真实 rollout 训练 delta action model，在仿真中执行 a_t + Δa_t 来对齐真实动力学；策略随后在该对齐仿真中微调，部署时主要使用微调后的策略。"
```

### RT-2

```yaml
id: rt2
num: 25
name: RT-2
full_name: 机器人Transformer 2 (Robotics Transformer 2)
year: '2023'
org: Google DeepMind
parent: —
paper_url: https://arxiv.org/abs/2307.15818
project_url: ''
category: foundation_model
motivation: 首个VLA模型实现Web知识迁移
```

#### 📝 一句话总结
RT-2 提出了 Vision-Language-Action (VLA) 模型范式，将预训练的大规模视觉-语言模型（PaLI-X、PaLM-E）通过**动作 token 化 + 协同微调**直接转化为机器人策略，使机器人继承 web 规模预训练的语义理解与推理能力，在未见物体、场景和指令上实现约 **2× 的泛化性能提升**。

#### 🎯 核心要点
- **VLA 范式**：首次将 VLM 端到端微调为可直接输出机器人动作的策略模型，无需额外任务特定头
- **动作 token 化**：将 8 维连续动作（6-DoF 末端执行器位移 + 夹爪开合 + 终止标志）离散化为 256 个 bin，表示为整数字符串 token
- **两种 VLM 骨干**：基于 PaLI-X（5B/55B 参数）和 PaLM-E（12B 参数）分别构建 RT-2-PaLI-X 和 RT-2-PaLM-E
- **协同微调（Co-fine-tuning）**：同时使用原始 web VQA 数据和机器人演示数据进行微调，防止灾难性遗忘
- **输出约束解码**：推理时限制 token 采样空间仅包含合法动作 token，确保输出始终为有效机器人动作
- **涌现能力**：继承 VLM 的符号理解、语义推理、多语言理解和人物识别能力，在涌现任务上达到基线 3× 以上的成功率
- **链式思维（Chain-of-Thought）**：通过数据增强让模型先输出自然语言计划再输出动作，展示了规划与控制的统一
- **大规模评估**：在真实机器人上进行超过 6000 次评估试验，覆盖已见任务、未见任务和涌现能力三大类别

#### 🔬 深入细节
##### 核心架构示意图

![RT-2 整体架构](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x1.png)
*图 1：RT-2 将视觉-语言模型（VLM）转化为视觉-语言-动作模型（VLA）。模型接收机器人摄像头图像和自然语言指令，直接输出以文本 token 表示的机器人动作。*

![RT-2 动作 token 化与训练流程](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/x2.png)
*图 2：动作 token 化方案。连续动作被离散化为 256 个 bin 并表示为整数字符串，与自然语言 token 共享同一词表空间。*

##### 算法伪代码

```python
# RT-2 训练与推理伪代码

# === 动作 token 化 ===
def tokenize_action(action_vector):
    """将 8 维连续动作转为文本 token 序列"""
    # action_vector: [Δx, Δy, Δz, Δroll, Δpitch, Δyaw, gripper, terminate]
    tokens = []
    for dim in action_vector:
        # 将连续值均匀离散化到 [0, 255]
        bin_idx = int((dim - min_val) / (max_val - min_val) * 255)
        bin_idx = clip(bin_idx, 0, 255)
        tokens.append(str(bin_idx))  # 转为整数字符串
    return " ".join(tokens)  # e.g., "128 64 200 132 100 98 255 1"

# === 协同微调 ===
def co_fine_tune(vlm, web_data, robot_data):
    """在 web VQA 数据和机器人数据上联合微调"""
    for batch in interleave(web_data, robot_data):
        if batch.source == "web":
            # 标准 VQA: image + question → answer
            loss = cross_entropy(vlm(batch.image, batch.question), batch.answer)
        else:
            # 机器人: image + instruction → action tokens
            action_str = tokenize_action(batch.action)
            loss = cross_entropy(vlm(batch.image, batch.instruction), action_str)
        optimizer.step(loss)

# === 受限解码推理 ===
def inference(vlm, image, instruction):
    """推理时限制输出为合法动作 token"""
    valid_tokens = set(range(0, 256))  # 仅允许 0-255 的整数 token
    output_tokens = []
    for step in range(8):  # 8 个动作维度
        logits = vlm.next_token_logits(image, instruction, output_tokens)
        # 将非法 token 的 logits 设为 -inf
        for t in range(vocab_size):
            if t not in valid_tokens:
                logits[t] = -float('inf')
        next_token = argmax(logits)
        output_tokens.append(next_token)
    return detokenize_action(output_tokens)
```

##### 方法详解

**动机与背景：为什么需要 VLA？**

传统机器人学习方法面临严重的数据瓶颈：机器人演示数据的采集成本极高（RT-1 数据集由 13 台机器人耗时 17 个月收集），且覆盖的物体、场景和指令极为有限。与此同时，视觉-语言模型（VLM）已在 web 规模数据上学到了丰富的语义知识——它们理解数千种物体、场景关系和抽象概念。RT-2 的核心洞察是：**如果能让 VLM 直接输出机器人动作，就能将这些 web 知识零成本迁移到机器人控制中**。此前的工作（如 SayCan、PaLM-E）仅将 LLM/VLM 用作高层规划器，仍需独立的低层策略；RT-2 则首次实现了感知、理解、推理与控制的端到端统一。

**核心机制：动作 token 化与 VLM 复用**

RT-2 的关键技术创新在于将机器人动作表示为自然语言 token，从而复用 VLM 的整个架构和训练流程。具体而言，每个时间步的动作是一个 8 维向量：

$$\mathbf{a} = [\Delta x, \Delta y, \Delta z, \Delta \text{roll}, \Delta \text{pitch}, \Delta \text{yaw}, \text{gripper}, \text{terminate}]$$

其中前 6 维为末端执行器的位移增量，第 7 维为夹爪开合状态，第 8 维为终止标志。每个连续维度被均匀离散化为 256 个 bin（即 \(b_i = \lfloor (a_i - a_{\min}) / (a_{\max} - a_{\min}) \times 255 \rfloor\)），然后将 bin 索引转为整数字符串。例如，一个动作可能被表示为 `"128 64 200 132 100 98 255 1"`。

对于 **PaLI-X** 骨干，这些整数字符串可以直接作为 token 使用，因为 PaLI-X 的词表本身包含数字 token。对于 **PaLM-E** 骨干，由于其词表中数字 token 的语义已被占用，RT-2 采用了一种巧妙的方案：**覆写词表中使用频率最低的 256 个 token**，将它们重新映射为动作 bin 索引。这样做既不影响模型在常见文本上的表现，又能无缝引入动作表示。

> 💡 **关键洞察**：动作 token 化的本质是将控制问题转化为"受限文本生成"问题。VLM 不需要任何架构修改——它只是在"回答一个特殊格式的问题"。

**协同微调策略**

简单地用机器人数据微调 VLM 会导致灾难性遗忘——模型会丢失预训练阶段学到的语义知识。RT-2 采用**协同微调（co-fine-tuning）**策略：在微调阶段同时混合原始 web 数据（VQA、图像描述等）和机器人轨迹数据。消融实验证实，co-fine-tuning 在泛化性能上显著优于纯机器人数据微调（fine-tuning only），而纯微调又远优于从头训练（training from scratch）。这表明 web 数据在微调阶段的持续参与对于保持语义泛化能力至关重要。

**推理与部署**

推理时，模型接收当前摄像头图像和自然语言指令，自回归地生成 8 个动作 token。为确保输出始终为合法动作，RT-2 在解码时施加**输出约束**：将所有非动作 token 的 logits 设为负无穷，使采样仅在有效动作空间内进行。55B 参数的 RT-2-PaLI-X 通过多 TPU 云服务实现 1-3 Hz 的推理频率；5B 版本可达约 5 Hz。尽管频率低于 RT-1 的实时速率，但对于桌面操作任务已足够。

**涌现能力与链式思维**

RT-2 展现了三类涌现能力，均未在机器人数据中出现过：

1. **符号理解**：执行 "move apple to 3"（理解数字符号）或 "push coke can on top of heart"（理解形状符号）
2. **语义推理**：执行 "move the apple to the cup with the same color"（视觉推理）、"move X near the sum of two plus one"（数学推理）、"mueve la manzana al vaso verde"（多语言理解）
3. **人物识别**：执行 "move the coke can to the person with glasses"

在涌现能力评估中，RT-2-PaLI-X 的平均成功率达到基线 RT-1 的 **3 倍以上**。

链式思维（Chain-of-Thought）变体通过数据增强引入 "Plan" 步骤：模型先生成自然语言计划（如 "Plan: pick rxbar chocolate"），再生成动作 token。这为将 VLM 规划器与低层策略统一到单一模型中提供了初步证据。

![涌现能力与消融实验结果](https://ar5iv.labs.arxiv.org/html/2307.15818/assets/figures/rt2_emergent_dm.png)
*图：RT-2 在符号理解、推理和人物识别等涌现任务上显著超越 RT-1 和 VC-1 基线。*

**模型规模与训练策略消融**

消融实验揭示了三个关键发现：

| 配置 | 泛化性能 |
|------|---------|
| 从头训练 5B | 极差（跳过 55B 评估） |
| 纯微调 5B | 中等 |
| 协同微调 5B | 良好 |
| 协同微调 55B | **最佳** |

$$\text{泛化性能排序: co-fine-tune 55B} > \text{co-fine-tune 5B} > \text{fine-tune 5B} \gg \text{from scratch 5B}$$

> ⚠️ **注意**：RT-2 不会习得新的运动技能——其物理操作能力仍限于机器人数据中出现过的技能分布。VLM 知识迁移的价值在于让已有技能能够泛化到新的语义场景中。

##### 与传统方法的对比

| 方法 | 参数量 | 预训练数据 | 动作表示 | 泛化能力 |
|------|--------|-----------|---------|---------|
| RT-1 | 35M | 无 | 离散化 token（专用头） | 基线 |
| VC-1 / R3M | ~100M | 视觉预训练 | 冻结特征 + 策略头 | 略优于 RT-1 |
| MOO | ~35M | 无 | 同 RT-1 | 与 RT-1 相当 |
| **RT-2-PaLI-X** | **55B** | **web VQA + 图像** | **文本 token（共享词表）** | **~2× RT-1** |
| **RT-2-PaLM-E** | **12B** | **web 文本 + 图像** | **覆写 token** | **~2× RT-1** |

#### 🧪 练习题
```yaml
question: "RT-2 中 PaLM-E 骨干如何将动作 bin 索引映射到词表中？"
options:
  - "在词表末尾追加 256 个新 token"
  - "直接使用词表中已有的数字 token（0-255）"
  - "覆写词表中使用频率最低的 256 个 token"
  - "使用独立的动作解码头，不经过词表"
answer: 2
explain: "PaLM-E 的数字 token 语义已被占用，因此 RT-2 选择覆写词表中最不常用的 256 个 token 来表示动作 bin 索引，既不影响常见文本生成，又能复用自回归解码框架。"
```

### π₀

```yaml
id: pi0
num: 26
name: π₀
full_name: 通用机器人策略 (Generalist Robot Policy)
year: '2024'
org: Physical Intelligence
parent: rt2
paper_url: https://www.pi.website/blog/pi0
project_url: ''
category: foundation_model
motivation: 跨形态通用基础模型Flow Matching架构
```

#### 📝 一句话总结
π₀ 提出建立在预训练 VLM 之上的 Vision-Language-Action Flow Model，用单独的 action expert 通过 flow matching 生成连续动作块，解决离散动作 token 难以支持高频灵巧控制的问题。

#### 🎯 核心要点
- 使用预训练 VLM 继承互联网语义知识，再加入机器人状态和动作专家形成 VLA 策略
- 动作不是自回归离散 token，而是连续 action chunk，支持最高约 50Hz 的灵巧控制
- 使用 conditional flow matching 学习从噪声动作块到真实动作块的向量场
- 架构上采用较大的 VLM backbone 与较小的 action expert，分离语义理解和连续控制建模
- 训练数据覆盖多种机器人形态，包括单臂、双臂、移动机械臂等跨 embodiment 数据
- 训练 recipe 区分 pre-training 与 post-training：前者学广泛能力，后者学具体任务的稳定执行
- 展示洗衣折叠、桌面清理、装箱等长程灵巧任务，并能通过微调获得新技能

#### 🔬 深入细节
##### 核心示意图

![π0 框架总览](https://ar5iv.labs.arxiv.org/html/2410.24164/assets/x1.png)
*图：π₀ 使用 VLM backbone 编码视觉和语言，并通过 action expert 与 flow matching 生成连续动作块。*

##### 算法伪代码

```python
# π0: VLM prefix + action expert + conditional flow matching

for batch in robot_dataset:
    images, language, proprio, action_chunk = batch

    obs_tokens = vlm_encode(images, language)     # semantic prefix
    state_tokens = state_encoder(proprio)

    tau = sample_timestep()
    noise = randn_like(action_chunk)
    noisy_action = tau * action_chunk + (1 - tau) * noise

    action_tokens = action_encoder(noisy_action, tau)
    pred_velocity = transformer(
        tokens=[obs_tokens, state_tokens, action_tokens],
        expert="action"
    )

    target_velocity = action_chunk - noise
    loss = mse(pred_velocity.action_part, target_velocity)
    update(loss)

# inference
noisy_action = randn(action_chunk_shape)
for k in range(num_euler_steps):
    tau = k / num_euler_steps
    v = model(images, language, proprio, noisy_action, tau)
    noisy_action = noisy_action + (1 / num_euler_steps) * v
execute(noisy_action[:control_horizon])
```

##### 方法详解

**动机与背景：为什么不继续用 RT-2 式离散动作 token？**

RT-2/OpenVLA 等 VLA 将动作离散化成语言 token，优点是能最大限度复用 LLM/VLM 的自回归训练框架。但灵巧操作需要高频、平滑、连续且多峰的控制输出，例如折衣服、装盒、双臂整理物体。这类动作如果拆成离散 token 序列，会带来量化误差、长序列生成延迟和控制频率限制。

π₀ 的设计思路是保留 VLM 的语义骨干，但把动作生成从“文本分类”改成“连续生成”。模型输入仍是图像、语言指令和本体状态，输出却是未来一段连续动作：

$$
A_t = [a_t, a_{t+1}, \ldots, a_{t+H-1}]
$$

这样一次前向采样可以产生局部时间窗口内的动作块，减少逐 token 解码延迟，并让轨迹天然更连贯。

**核心机制一：VLM backbone 与 action expert 分工**

π₀ 的 VLM backbone 负责处理图像和语言，继承预训练模型中的物体、空间关系和指令理解能力。机器人状态和 noisy action chunk 则进入 action expert。两者通过 Transformer 注意力交互，但 action expert 的参数专门服务于连续动作建模。

这种分工很关键。若直接把连续动作信号塞进 VLM 主干，容易污染语言/视觉表征；若完全冻结 VLM 又可能无法适应机器人视觉分布。π₀ 通过“语义主干 + 控制专家”的方式，让语义泛化和动作精度分别由更合适的参数承担。

**核心机制二：conditional flow matching**

π₀ 建模条件动作分布：

$$
p(A_t \mid o_t), \quad o_t = (I_t, l_t, q_t)
$$

其中 \(I_t\) 是多视角图像，\(l_t\) 是语言，\(q_t\) 是本体状态。训练时采样真实动作块 \(A_t\)、高斯噪声 \(\epsilon\) 和时间 \(\tau\)，构造：

$$
A_t^\tau = \tau A_t + (1-\tau)\epsilon
$$

网络预测向量场：

$$
v_\theta(A_t^\tau, o_t) \approx A_t - \epsilon
$$

对应损失为：

$$
\mathcal{L}(\theta)=
\mathbb{E}\left[
\left\|v_\theta(A_t^\tau,o_t)-(A_t-\epsilon)\right\|_2^2
\right]
$$

直觉上，模型学习“从噪声动作块流向真实动作块”的方向。推理时从随机噪声开始，用 Euler 积分多步更新，得到可执行连续动作。

**核心机制三：pre-training / post-training 配方**

π₀ 不把通用能力和任务特化混在一个阶段解决。pre-training 使用多机器人、多任务、大规模数据，让模型学到跨形态控制先验和恢复能力；post-training 则使用更高质量、更聚焦的任务数据，让执行更稳定、更像专家。

这种配方与大语言模型的预训练/对齐很类似：预训练负责覆盖广度，后训练负责行为品质。对机器人来说尤其重要，因为真实任务中失败恢复、接触调整和长程执行风格往往不可能只靠少量干净演示学到。

**与传统 VLA 的区别**

OpenVLA/RT-2 把动作当作 token 分类问题，适合低频桌面操作和语义泛化；π₀ 把动作当作连续条件生成问题，更适合高频、灵巧、需要轨迹平滑的任务。它不是放弃 VLM，而是把 VLM 放在更合适的位置：理解“做什么”，action expert 负责“怎么连续地做”。

> 💡 关键：π₀ 的核心创新是把 VLM 的语义泛化能力和 flow matching 的连续动作生成能力组合成一个端到端机器人策略。

#### 🧪 练习题
```yaml
question: "π₀ 相比离散动作 token VLA 的核心变化是什么？"
options:
  - "使用 flow matching action expert 生成连续动作块"
  - "完全移除视觉输入，只保留语言输入"
  - "用手工状态机替代神经网络策略"
  - "把所有动作都转换成自然语言句子再执行"
answer: 0
explain: "π₀ 保留 VLM 语义骨干，但用 conditional flow matching 在连续动作空间生成 action chunk，因此更适合高频灵巧控制。"
```

### OpenVLA

```yaml
id: openvla
num: 27
name: OpenVLA
full_name: 开源视觉语言动作模型 (Open Vision-Language-Action)
year: '2024'
org: Stanford
parent: rt2
paper_url: https://huggingface.co/openvla
project_url: ''
category: foundation_model
motivation: 7B参数开源VLA模型
```

#### 📝 一句话总结
OpenVLA 提出 7B 参数开源 VLA 模型，在 Prismatic VLM 上融合 SigLIP 与 DINOv2 视觉特征，并在 970k 条机器人轨迹上微调，使研究社区可以直接获取、微调和量化部署通用视觉语言动作策略。

#### 🎯 核心要点
- 首个广泛发布的 7B 级开源 VLA，面向多机器人形态的语言条件视觉操作
- 基座为 Prismatic-7B，LLM 使用 Llama 2 7B，视觉塔融合 SigLIP 语义特征与 DINOv2 空间特征
- 使用 Open X-Embodiment 数据集中的约 970k 真实机器人演示轨迹进行动作预测微调
- 将连续动作按维度离散成 256 个 bin，并映射到语言模型 token 空间进行分类预测
- 在多种机器人评测中以远小于 55B RT-2-X 的参数量取得强泛化表现
- 支持 LoRA 参数高效微调，可用少量演示适配新机器人或新任务
- 支持 4-bit 量化推理，降低部署显存门槛

#### 🔬 深入细节
##### 核心示意图

![OpenVLA 架构图](https://ar5iv.labs.arxiv.org/html/2406.09246/assets/x1.png)
*图：OpenVLA 以 Prismatic VLM 为基座，将图像和语言编码后输出离散动作 token，再反量化为机器人控制命令。*

##### 算法伪代码

```python
# OpenVLA: action tokenization and VLA fine-tuning

def discretize_action(action, quantile_bins):
    tokens = []
    for dim, value in enumerate(action):  # e.g. 7 DoF EEF action
        bin_id = bucketize(value, quantile_bins[dim])  # 0..255
        tokens.append(action_token_id(dim, bin_id))
    return tokens

for image, instruction, action in oxe_robot_dataset:
    visual_tokens = siglip_encoder(image) + dinov2_encoder(image)
    prompt_tokens = tokenizer(instruction)
    target_tokens = discretize_action(action, quantile_bins)

    logits = prismatic_vlm(visual_tokens, prompt_tokens)
    loss = cross_entropy(logits.action_positions, target_tokens)
    update(loss)

# inference
logits = model(image, instruction)
action_tokens = constrained_argmax(logits, valid_action_tokens)
action = dequantize(action_tokens, quantile_bins)
robot.step(action)
```

##### 方法详解

**动机与背景：为什么需要开源 VLA？**

RT-2 证明了 VLM 可以通过动作 token 化变成机器人策略，但模型、训练细节和数据并未完全开放，社区难以复现、微调或系统研究。与此同时，传统模仿学习策略虽然可开源，但通常缺少互联网规模视觉语言预训练，跨物体、跨语言指令和跨机器人泛化有限。OpenVLA 的目标就是把 VLA 从闭源演示变成可用研究基线。

**核心机制一：双视觉编码器融合**

OpenVLA 的视觉部分融合 SigLIP 与 DINOv2。SigLIP 更偏语义对齐，擅长回答“图中是什么、和语言指令如何对应”；DINOv2 更偏自监督空间表征，擅长保留物体形状、边界和局部结构。机器人操作同时需要识别目标和定位目标，因此双视觉塔比单一路径更稳。

视觉特征经过投影后进入 LLM token 空间，与语言指令共同作为上下文。语言模型不再只生成文本，而是在动作位置上生成离散动作 token。

**核心机制二：动作离散化**

设连续动作为：

$$
a_t = [\Delta x,\Delta y,\Delta z,\Delta roll,\Delta pitch,\Delta yaw,g]
$$

OpenVLA 对每个维度使用 256 个分位数 bin。训练时，真实连续动作被量化为分类标签：

$$
z_i = Q_i(a_i), \quad z_i \in \{0,\ldots,255\}
$$

损失为动作 token 的交叉熵：

$$
\mathcal{L} =
- \sum_i \log p_\theta(z_i \mid I_t, l_t)
$$

推理时，模型在每个动作维度对应的合法 token 集合中取最大概率，再通过反量化映射回连续动作。该方案牺牲一部分精度，但换来稳定训练和对语言模型训练栈的最大复用。

**核心机制三：大规模机器人轨迹微调**

OpenVLA 使用 Open X-Embodiment 的大规模真实机器人轨迹进行微调。数据覆盖多个机器人、任务、相机视角和动作空间。训练中的关键工程问题是清洗和标准化：去除无效动作、统一动作维度、对齐语言指令，并为不同数据集定义一致的动作 token 化规则。

这种训练让模型不只会“看懂图像”，还学到视觉变化和机器人动作之间的统计关系。相比从头训练的小模型，VLM 预训练提供语义泛化；相比闭源大模型，OpenVLA 提供可微调、可量化、可检查的基线。

**适配与部署**

OpenVLA 的重要贡献之一是证明 VLA 可以用 LoRA 低成本适配新任务。实际使用时，研究者可冻结大部分参数，只在注意力/MLP 线性层插入低秩更新，用几十到数百条演示把模型迁移到新机器人。量化推理进一步降低部署成本，使 7B VLA 不再只属于大集群实验。

> ⚠️ 注意：OpenVLA 的动作离散化适合许多桌面操作，但对于高频灵巧控制仍可能受量化和自回归延迟限制，这也是 π₀ 等连续动作 VLA 后续发展的动机。

#### 🧪 练习题
```yaml
question: "OpenVLA 使用 SigLIP + DINOv2 双视觉编码器的主要原因是什么？"
options:
  - "SigLIP 提供语义对齐，DINOv2 提供空间结构，两者互补支持机器人操作"
  - "两个编码器分别控制左臂和右臂"
  - "DINOv2 负责语言理解，SigLIP 负责动作解码"
  - "只是为了增加参数量，不影响控制性能"
answer: 0
explain: "机器人操作既需要识别语言指令中的目标，也需要准确感知目标位置和形状；SigLIP 与 DINOv2 分别补充语义和空间表征。"
```

### Helix-02

```yaml
id: helix02
num: 28
name: Helix-02
full_name: Figure AI VLA系统 (Helix VLA System)
year: '2026'
org: Figure AI
parent: pi0
paper_url: https://www.figure.ai/blog/helix-02
project_url: ''
category: foundation_model
motivation: 端到端Loco-manipulation控制
```

#### 📝 一句话总结
Helix-02 将 Figure 的 Helix VLA 扩展到人形机器人全身控制，通过 System 2 语义推理、System 1 视觉运动策略和 System 0 千赫兹全身运动控制，把行走、平衡、双手操作和触觉反馈统一到端到端 loco-manipulation 流程中。

#### 🎯 核心要点
- 目标从上半身 manipulation 扩展到全身 loco-manipulation：边走、边拿、边保持平衡
- 采用三层系统：System 2 语义推理，System 1 视觉运动策略，System 0 低层全身控制
- System 0 以约 1kHz 控制全身关节，学习人体运动先验并负责平衡、接触和协调
- System 1 融合头部相机、手掌相机、触觉、本体感知等输入，以高频输出全身关节目标
- System 2 处理自然语言、场景语义和长时域任务目标，不手工规划每个关节动作
- 展示厨房整理等长时域任务：机器人连续移动、开关门、搬运餐具、使用身体其他部位辅助操作
- 强调 “all sensors in, all actuators out”，减少传统状态机和分模块控制的接口断裂

#### 🔬 深入细节
##### 核心示意图

![Helix-02 官方展示图](https://images.ctfassets.net/qx5k8y1u9drj/7qpJLAT9FKWaptebSQgA0Y/4e2bdb81cbecddfd7cbea49f8ab143ac/Open_Graph_Image__4_.jpg)
*图：Figure AI 官方 Helix-02 页面展示的全身自主任务场景。公开页面还提供 System 0/1/2 架构动画和厨房整理演示视频。*

##### 算法伪代码

```python
# Helix-02 conceptual control loop

while robot_is_active:
    # System 2: low-frequency semantic reasoning
    if need_replan():
        scene_tokens = encode_scene(head_camera)
        task_latent = system2_vlm(scene_tokens, language_instruction, memory)

    # System 1: visuomotor whole-body policy
    obs = {
        "head_rgb": head_camera.read(),
        "palm_rgb": palm_cameras.read(),
        "tactile": fingertip_tactile.read(),
        "proprio": joint_states.read(),
        "task": task_latent,
    }
    whole_body_targets = system1_policy(obs)  # arms, hands, torso, legs

    # System 0: high-frequency feasibility and balance controller
    for _ in range(low_level_steps):
        motor_cmd = system0_controller(
            current_state=joint_states.read(),
            target=whole_body_targets,
            contacts=contact_sensors.read(),
        )
        actuators.apply(motor_cmd)
```

##### 方法详解

**动机与背景：为什么 loco-manipulation 难？**

人形机器人不是“机械臂装在移动底盘上”这么简单。行走会改变身体重心和双手可达空间，抓取重物会反过来影响平衡，打开门、拉抽屉、搬餐具都涉及接触力、足底支撑和全身协调。传统系统通常把导航、站定、机械臂操作、恢复平衡拆成状态机，一旦任务需要边走边操作或用身体其他部位辅助，就会出现接口脆弱和切换迟缓。

Helix-02 的目标是用统一学习系统处理这种耦合。高层只需要表达任务意图，中层策略直接从多传感器输入产生全身目标，底层控制器以高频保证物理可执行性。

**核心机制一：System 2 语义推理**

System 2 类似慢速思考模块，负责语言、场景理解和长时域任务分解。它不直接输出每个关节的轨迹，而是为 System 1 提供目标 latent。例如“把洗碗机里的盘子拿到柜台”这种任务，System 2 需要理解物体、容器、空间关系和顺序约束。

这种分层可以避免把 VLM 放进毫秒级控制环。语义推理更新频率低，但影响任务方向；运动执行更新频率高，但只需处理局部感知和动作。

**核心机制二：System 1 多模态视觉运动策略**

System 1 是从传感器到全身动作目标的桥。输入不只是头部相机，还包括手掌相机、触觉和本体状态。手掌相机解决近距离遮挡问题，触觉解决接触确认和握力调节问题，本体状态提供平衡与关节约束。

可以把策略抽象为：

$$
y_t = \pi_{\theta}^{S1}(I_t^{head}, I_t^{palm}, h_t^{tactile}, q_t, z_t^{S2})
$$

其中 \(y_t\) 是全身关节目标或低层控制目标，\(z_t^{S2}\) 是 System 2 给出的语义条件。与只输出末端执行器动作的 VLA 不同，Helix-02 强调全身输出：腿、躯干、手臂、手腕和手指都在同一策略中协调。

**核心机制三：System 0 高频全身控制**

System 0 是物理可执行性的底座。它以约 1kHz 的频率运行，处理平衡、接触、关节限制和执行器响应。公开资料中强调 System 0 学习了人体运动数据和仿真强化学习得到的全身运动先验，用来替代大量手写控制逻辑。

从控制角度看，System 1 给出的是“想做什么姿态/动作”，System 0 负责“在当前接触和动力学约束下如何安全做”。这与传统 WBC/MPC 的职责类似，但控制律主要通过学习获得。

**与传统模块化控制的区别**

传统 humanoid pipeline 常是：

$$
\text{Task Planner} \rightarrow \text{Footstep Planner} \rightarrow \text{Arm Planner} \rightarrow \text{WBC}
$$

Helix-02 更接近：

$$
\text{Language + Sensors} \rightarrow \text{Whole-body Neural Policy} \rightarrow \text{Learned Low-level Control}
$$

优势是全身耦合动作可以端到端学习，例如双手拿盘时用身体保持平衡、手被占用时用髋部关抽屉、用脚辅助门体动作。风险是系统细节未以论文形式完全公开，外部难以独立复现实验和评估边界。

> ⚠️ 注意：Helix-02 目前主要是官方技术发布与演示，未提供完整论文、数据集和可复现训练细节；因此应把它理解为工业 VLA/全身控制系统案例，而不是完全开放的学术算法基线。

#### 🧪 练习题
```yaml
question: "Helix-02 中 System 0 的核心职责是什么？"
options:
  - "低频解释自然语言并生成任务计划"
  - "以高频执行全身平衡、接触和关节协调控制"
  - "只负责图像分类，不参与动作控制"
  - "离线生成训练数据，不在机器人上运行"
answer: 1
explain: "System 0 是底层全身控制模块，以高频处理物理可执行性；System 2 才负责语义推理，System 1 负责多模态视觉运动策略。"
```

### GR00T N1.6

```yaml
id: groot_n1
num: 29
name: GR00T N1.6
full_name: NVIDIA人形基础模型 (GR00T Humanoid Foundation)
year: '2026'
org: NVIDIA
parent: pi0
paper_url: https://developer.nvidia.com/isaac/groot
project_url: ''
category: foundation_model
motivation: 32层扩散Transformer人形控制
```

#### 📝 一句话总结
GR00T N1.6 是 NVIDIA 在 GR00T N1/N1.5 基础上改进的人形 VLA 模型，用 VLM 负责视觉语言理解、32 层 Diffusion Transformer 负责连续动作去噪，并通过多机器人、多任务和仿真/真实数据预训练提升双臂操作与 loco-manipulation 后训练效果。

#### 🎯 核心要点
- 延续 GR00T N1 的 dual-system 架构：System 2 VLM 编码图像和语言，System 1 DiT 生成动作
- N1.6 使用内部 Cosmos-2B VLM 变体，支持原生长宽比图像和 embodied reasoning 数据
- DiT 从 N1.5 的 16 层扩展到 32 层，增强连续动作去噪和复杂操作表达能力
- 移除 N1.5 的 post-VLM 4 层 adapter，改为在预训练中解冻 VLM 顶部 4 层
- 多数 embodiment 使用 state-relative action chunks，提升平滑性和跨机器人泛化
- 额外加入 Bimanual YAM、AGIBOT Genie-1、Galaxea R1 Pro 仿真和 Unitree G1 全身操作数据
- 预训练 300K steps，后训练通常用较小任务数据集微调 10K-30K steps
- 开源生态围绕 Isaac GR00T、Isaac Lab、LeRobot 格式和 Hugging Face 模型卡组织

#### 🔬 深入细节
##### 核心示意图

![GR00T N1 架构图](https://ar5iv.labs.arxiv.org/html/2503.14734/assets/x3.png)
*图：GR00T N1 的 VLA 架构。VLM 输出视觉语言 token，DiT 结合机器人状态与噪声动作块，通过 flow matching 生成连续控制动作。N1.6 延续该架构并扩大 DiT。*

![GR00T N1.6 预训练数据分布](https://research.nvidia.com/labs/gear/n1_6/training_data_distribution_v3.svg)
*图：NVIDIA Research 页面展示的 GR00T N1.6 预训练数据加权分布。*

##### 算法伪代码

```python
# GR00T N1.6 conceptual training loop

for batch in mixed_humanoid_dataset:
    images, language, state, action_chunk, embodiment_id = batch

    # System 2: VLM reasoning tokens
    vl_tokens = cosmos_vlm(images, language, train_top_layers=True)

    # Embodiment-specific state/action projection
    s = state_encoder[embodiment_id](state)
    tau = sample_flow_timestep()
    eps = randn_like(action_chunk)
    noisy_action = tau * action_chunk + (1 - tau) * eps
    a = action_encoder[embodiment_id](noisy_action, tau)

    # System 1: 32-layer DiT action denoising
    h = dit_32_layers(self_tokens=[s, a], cross_tokens=vl_tokens)
    pred = action_decoder[embodiment_id](h)

    target = action_chunk - eps
    loss = mse(pred, target)
    update(loss)

# post-training
finetune_on_task_data(model, demos, cotrain_pretraining_data=True)
```

##### 方法详解

**动机与背景：人形基础模型为什么需要 dual-system？**

人形机器人要同时解决“理解任务”和“控制身体”两个问题。VLM 擅长从图像和语言中识别目标、理解指令和推断任务上下文，但它不是为 100Hz 以上连续控制设计的。扩散/flow matching 策略擅长生成平滑连续动作，却缺少互联网级语义知识。GR00T 的 dual-system 把两者组合：System 2 负责慢速语义理解，System 1 负责高频动作生成。

在 GR00T N1 论文中，System 2 运行在较低频率，处理图像和语言；System 1 使用 Diffusion Transformer，交叉注意力读取 VLM token，并结合本体状态和噪声动作块输出动作。N1.6 沿用这个范式，但提升 VLM、DiT 和数据配方。

**核心机制一：32 层 DiT 与 action flow matching**

GR00T 的动作生成目标与 π₀ 类似，都是学习连续动作块的向量场。给定真实动作块 \(A\)、噪声 \(\epsilon\) 和时间 \(\tau\)：

$$
A^\tau = \tau A + (1-\tau)\epsilon
$$

DiT 预测：

$$
v_\theta(A^\tau, s, z_{vl}) \approx A - \epsilon
$$

其中 \(s\) 是机器人状态 token，\(z_{vl}\) 是 VLM 的视觉语言 token。N1.6 将 DiT 扩展为 32 层，使动作模块有更强的时序和多关节耦合建模能力，尤其适合双臂、手部和全身移动操作。

**核心机制二：跨 embodiment 的状态/动作编码**

不同机器人有不同自由度、动作空间和传感器布局。GR00T 使用 embodiment-specific encoder/decoder 将各自状态和动作投影到共享隐藏空间。共享 DiT 学通用控制先验，特定 encoder/decoder 处理机器人差异。

N1.6 进一步强调 state-relative action chunks。相对动作通常表示为相对于当前状态或末端姿态的增量：

$$
a_t^{rel} = a_t^{target} - f(s_t)
$$

这种表示在不同场景中数值范围更集中，更容易学习平滑控制，也更利于跨机器人迁移。但相对动作会积累误差，因此 N1.6 在讨论中提到需要结合数据统计、DAgger、RTC 和后训练正则来稳定部署。

**核心机制三：数据金字塔与 N1.6 数据增强**

GR00T N1 的核心不是只靠真实机器人数据，而是混合真实机器人、仿真数据、神经生成轨迹和人类视频。真实数据最接近部署但昂贵；仿真和神经轨迹可扩展；人类视频提供广泛行为先验。N1.6 在 N1.5 数据基础上额外加入多种机器人平台和 Unitree G1 loco-manipulation 数据，使后训练时更容易收敛到复杂全身任务。

**后训练与部署**

N1.6 预训练后并不保证零样本完成所有任务。NVIDIA 的工作流强调 post-training：针对目标 embodiment 和任务收集较小规模数据，微调模型 10K-30K steps，并视情况使用 DAgger、数据增强、co-training 和实时控制补偿。基础模型提供强初始化，后训练负责把能力落到具体硬件。

> 💡 关键：GR00T N1.6 的“基础模型”意义在于跨任务、跨 embodiment 提供可后训练的通用动作先验，而不是跳过机器人数据收集。

#### 🧪 练习题
```yaml
question: "GR00T N1.6 相比 N1.5 的一个关键架构改进是什么？"
options:
  - "将 DiT 动作模块从 16 层扩大到 32 层"
  - "完全取消 VLM，只使用关节状态"
  - "把连续动作改成纯文本输出"
  - "只支持单臂机械臂，不再支持人形机器人"
answer: 0
explain: "N1.6 的公开说明中明确提到使用 2x 更大的 DiT，即 32 层而非 N1.5 的 16 层，以提升动作去噪和复杂控制能力。"
```

### GE-1

```yaml
id: ge1
num: 30
name: GE-1
full_name: AGIBOT世界模型 (AGIBOT World Model)
year: '2026'
org: AGIBOT
parent: pi0
paper_url: https://www.agibot.com/ge1
project_url: ''
category: foundation_model
motivation: 视频生成式物理交互预测
```

#### 📝 一句话总结
GE-1 可理解为 AGIBOT Genie Envisioner 系列的生成式机器人世界模型路线：把机器人交互预测建模为语言和视觉条件下的视频生成，用多视角自回归 DiT 预测未来物理交互，从而服务策略评估、数据生成和世界模型内训练。

#### 🎯 核心要点
- 目标是从视频层面预测机器人与环境的未来交互，而不是只回归低维状态
- 以 language instruction、初始视觉观测和历史 sparse memory 为条件，生成未来多视角视频 chunk
- 采用视频 diffusion transformer/DiT 作为核心，借助通用视频生成模型能力迁移到机器人领域
- 使用自回归 chunk 生成，逐段预测长时域交互，增强时间一致性
- 引入跨视角信息交换的 causal block，保持多视角空间一致性
- 面向机器人 manipulation、策略评估、虚拟 rollout、数据扩增和 sim-to-real 前验证
- 清单 URL 当前不可用，内容基于公开 Genie Envisioner / GE-Base 资料和论文整理

#### 🔬 深入细节
##### 核心示意图

![GE-Base 世界模型总览](https://ar5iv.labs.arxiv.org/html/2508.05635/assets/x3.png)
*图：Genie Envisioner / GE-Base 的世界基础模型概览。模型以多视角视觉条件、语言指令和 sparse memory 为输入，自回归生成未来视频片段。*

> ⚠️ 依据限制：`https://www.agibot.com/ge1` 当前返回 404。以下内容基于 AGIBOT Genie Envisioner / GE-Base 公开论文和官网新闻整理，作为 GE-1/AGIBOT 世界模型条目的格式化精读。

##### 算法伪代码

```python
# GE-style video world model for robot interaction prediction

memory = []
current_obs = multi_view_images_t0

for k in range(num_chunks):
    visual_condition = build_condition(
        initial_obs=multi_view_images_t0,
        current_obs=current_obs,
        sparse_memory=sample_sparse(memory),
    )

    noise = randn(video_latent_shape)
    for step in diffusion_steps:
        denoised_velocity = video_dit(
            noisy_latent=noise,
            language=instruction,
            visual_condition=visual_condition,
            cross_view_causal_block=True,
            timestep=step,
        )
        noise = solver_update(noise, denoised_velocity, step)

    next_video_chunk = vae_decode(noise)
    memory.extend(select_frames(next_video_chunk))
    current_obs = last_frame(next_video_chunk)

return generated_future_video
```

##### 方法详解

**动机与背景：为什么机器人需要视频世界模型？**

传统仿真器依赖几何、材质、接触参数和手工物理建模，面对衣物、包装袋、液体、杂乱桌面等开放世界物体时成本很高。机器人策略如果只能在真实世界试错，数据又昂贵且有安全风险。生成式世界模型试图走第三条路：直接从真实或生成视频中学习物理交互的像素级未来。

GE-Base 将机器人世界建模为 text-and-image-to-video generation：给定语言指令和初始观测，模型生成接下来可能发生的多视角视频。这种表示保留了物体外观、遮挡、接触后形变和环境变化，比低维状态预测更贴近视觉策略实际看到的数据。

**核心机制一：自回归视频 chunk**

一次生成完整长视频很难保持一致性，也不利于在线交互。GE 将未来分成多个 video chunk，逐段生成：

$$
V_{k+1} \sim p_\theta(V_{k+1} \mid V_0, m_{\le k}, l)
$$

其中 \(V_0\) 是初始视觉观测，\(m_{\le k}\) 是 sparse memory，\(l\) 是语言指令。每生成一段，就把关键帧加入 memory，再预测下一段。这使模型能在较长任务中保持历史上下文，而不必把所有帧都塞进上下文窗口。

**核心机制二：多视角一致性**

机器人通常有头部、腕部、外部相机等多视角输入。若每个视角独立生成，物体位置和接触状态容易不一致。GE-Base 在视频 DiT 中加入跨视角信息交换模块，让不同视角在生成过程中共享空间线索。

直觉上，多视角世界模型不只是“生成好看的视频”，还要满足同一物理事件在不同相机中一致。例如夹爪推开盒子，侧视角和俯视角都必须表现同一接触结果，否则策略评估会被虚假视觉反馈误导。

**核心机制三：从通用视频生成到 embodied prediction**

GE 使用通用视频生成模型作为基础，再通过 robotic-adaptive pretraining 迁移到机器人交互场景。通用视频模型提供外观、运动和场景先验；机器人数据让模型学会指令条件、机械臂/人形手的运动模式和接触后果。

扩散/flow matching 训练目标可概括为：

$$
\mathcal{L} =
\mathbb{E}_{x_0,\epsilon,t,c}
\left\|
v_\theta(x_t,t,c) - u_t(x_t \mid x_0)
\right\|^2
$$

其中 \(x_0\) 是真实未来视频 latent，\(x_t\) 是加噪 latent，\(c\) 包含语言、初始帧、多视角条件和 memory。模型学习从噪声视频 latent 流向真实未来视频 latent。

**应用：策略评估、数据生成和模型内训练**

GE 类世界模型的价值不在直接输出电机命令，而在为策略提供“想象空间”。给定候选策略或动作计划，世界模型可以生成未来视觉结果，用于过滤明显失败的动作、做离线策略评估，或为 VLA 训练生成更多交互变化。AGIBOT 后续 GE 2.0/GE-2 Sim 资料也延续了这一方向：让世界模型从离线预测器逐步变成可交互的模拟环境。

> ⚠️ 注意：公开视频世界模型的物理一致性仍有限，尤其在精确接触力、长期累积误差和反事实动作方面需要系统评估。它更适合作为策略训练和评估的补充，而不是完全替代物理仿真器。

#### 🧪 练习题
```yaml
question: "GE-1/Genie Envisioner 类世界模型的核心建模对象是什么？"
options:
  - "机器人未来交互的视频片段，而不是单纯低维状态"
  - "只预测关节电流，不处理视觉信息"
  - "只做语言问答，不参与机器人训练"
  - "用手写碰撞规则替代神经网络"
answer: 0
explain: "该路线把机器人世界建模为语言和视觉条件下的视频生成问题，通过预测未来视频来表示物理交互结果。"
```

### DreamDojo

```yaml
id: dreamdojo
num: 31
name: DreamDojo
full_name: 梦境道场 (DreamDojo World Model)
year: '2026'
org: ShengShu
parent: pi0
paper_url: https://shengshu-ai.github.io/DreamDojo
project_url: ''
category: foundation_model
motivation: 物理交互预判世界模型
```

#### 📝 一句话总结
DreamDojo 提出从 44k+ 小时第一视角人类视频中预训练机器人世界模型，用连续 latent actions 作为无标注视频的统一代理动作，再经过机器人后训练和蒸馏，实现可交互、接近实时的动作条件未来视频预测。

#### 🎯 核心要点
- 构建 DreamDojo-HV 大规模人类第一视角视频数据，最终混合约 44,711 小时视频
- 目标是学习 open-world、contact-rich 机器人任务的未来视觉结果，而非仅在窄分布机器人数据上预测
- 使用 continuous latent actions 从相邻帧自监督提取“动作”代理标签，解决人类视频缺少机器人动作标注的问题
- 基于 Cosmos-Predict2.5 / latent video diffusion world model，使用 flow matching 预测未来视频 latent
- 后训练时重置并学习目标机器人动作条件层，将真实机器人连续动作接入世界模型
- 提出蒸馏流程，把双向、多步扩散教师压缩为因果、少步学生模型，实现约 10.81 FPS 和超过 1 分钟长时域交互
- 应用包括 live teleoperation、policy evaluation、model-based planning 和真实部署前的虚拟评估

#### 🔬 深入细节
##### 核心示意图

![DreamDojo 方法总览](https://dreamdojo-world.github.io/overview.png)
*图：DreamDojo 先用 latent actions 从大规模人类视频中学习物理交互，再在目标机器人数据上后训练，最后通过蒸馏获得实时交互能力。*

![DreamDojo-HV 数据统计](https://dreamdojo-world.github.io/hv.png)
*图：DreamDojo-HV 数据覆盖大量场景、物体和技能，用于扩大世界模型的物理交互先验。*

> ⚠️ 依据限制：清单中的 `paper_url` 当前不是 DreamDojo 公开项目主页；公开项目页为 `https://dreamdojo-world.github.io/`，论文为 arXiv:2602.06949。以下内容基于这些公开资料整理，YAML 元信息按任务清单原样保留。

##### 算法伪代码

```python
# DreamDojo: pretrain from human videos, post-train on robots, distill for real time

# 1. Train latent action model from video frame pairs
for frame_t, frame_tp1 in human_video_pairs:
    z = latent_action_encoder(frame_t, frame_tp1)
    pred_next = latent_action_decoder(frame_t, z)
    loss_lam = recon_loss(pred_next, frame_tp1) + beta * kl_or_vq_loss(z)
    update(latent_action_model, loss_lam)

# 2. Pretrain world model with latent action chunks
for video_clip in human_video_dataset:
    latent_actions = extract_latent_actions(video_clip)
    noisy_video_latent, timestep = add_noise(video_clip.future_latents)
    pred_velocity = world_model(
        condition_frame=video_clip.first_frame,
        action_chunks=latent_actions,
        timestep=timestep,
    )
    loss = flow_matching_loss(pred_velocity, target_velocity)
    update(world_model, loss)

# 3. Post-train on target robot with real continuous actions
reset_action_condition_layer(world_model)
for robot_clip, robot_actions in robot_dataset:
    relative_actions = rebase(robot_actions)
    loss = action_conditioned_video_loss(world_model, robot_clip, relative_actions)
    update(world_model, loss)

# 4. Distill to causal few-step student for online rollout
student = initialize_from_teacher(world_model)
replace_bidirectional_attention_with_causal(student)
train_student_with_teacher_ode_and_distribution_matching(student, teacher=world_model)
```

##### 方法详解

**动机与背景：为什么从人类视频预训练？**

机器人世界模型需要见过足够多的物体、场景和接触方式，才能在新环境中预测“如果这样推/拿/拉，会发生什么”。但真实机器人数据昂贵，且常集中在少数实验室场景。人类第一视角视频天然包含大量日常交互：开门、拿取、整理、倒入、按压、拖拽、行走和双手操作。虽然人手与机器人形态不同，但许多物理规律共享，例如物体受力后移动、遮挡变化、容器开合和软物体形变。

DreamDojo 的核心假设是：先从人类视频学广泛物理交互，再用较小规模目标机器人数据把动作空间对齐到机器人 embodiment。

**核心机制一：continuous latent actions**

人类视频没有机器人动作标签。若直接做无动作视频预测，模型可能学到“场景会怎样变化”，却不知道变化由什么动作导致，反事实控制能力差。DreamDojo 用 latent action model 从相邻帧中提取低维连续动作：

$$
z_t = E_\phi(I_t, I_{t+1})
$$

再让解码器用 \(I_t\) 和 \(z_t\) 重构 \(I_{t+1}\)。信息瓶颈迫使 \(z_t\) 捕获导致帧变化的关键动作因素，而不是完整复制图像上下文。训练后，\(z_t\) 可作为所有无标注人类视频的代理动作条件。

这种设计比手部关键点更通用，因为它不要求动作一定来自可见手部，也能覆盖相机运动、身体移动和遮挡严重的交互。

**核心机制二：动作条件视频 diffusion world model**

DreamDojo 基于 latent video diffusion / Cosmos-Predict2.5。给定条件帧、动作条件和视频 latent，模型用 flow matching 学习去噪向量场：

$$
\mathcal{L}_{fm} =
\mathbb{E}_{x_0,\epsilon,t,c}
\left\|
v_\theta(x_t,t,c) - (\epsilon - x_0)
\right\|_2^2
$$

其中 \(c\) 包含条件帧、文本或动作条件。论文还强调 temporal consistency loss，使模型不仅单帧逼近真实视频，还更好匹配相邻帧的物理过渡，减少长时域 rollout 中的物体破碎和接触漂移。

**核心机制三：目标机器人后训练**

预训练阶段使用 latent actions；后训练阶段需要让模型理解真实机器人动作。DreamDojo 重置动作条件层，把目标机器人动作转成相对动作并接入模型：

$$
a_{t:t+H}^{rel} = a_{t:t+H} - a_t^{base}
$$

相对动作空间更集中，能降低跨轨迹和跨机器人差异。后训练使用较小机器人数据把“人类视频中学到的物理先验”对齐到具体机器人，例如 GR-1、G1、AgiBot 或 YAM。

**核心机制四：蒸馏到实时交互**

标准视频扩散模型需要多步去噪且常用双向注意力，难以在线交互。DreamDojo 将教师模型蒸馏为因果、少步学生模型：先用教师 ODE 轨迹做 warmup，再让学生在自己的历史输出上训练，减少推理时分布偏移。蒸馏后模型能以约 10.81 FPS 进行长时域生成，并在超过 1 分钟的 rollout 中保持较好一致性。

> 💡 关键：DreamDojo 的贡献不只是“视频预测”，而是解决机器人世界模型的三个瓶颈：数据规模、动作条件和实时交互。

**与传统仿真的区别**

传统仿真器需要显式几何、接触和材质参数，优点是可控、可解释，缺点是开放世界建模成本高。DreamDojo 直接在像素/latent 视频空间预测未来，能覆盖更丰富外观和复杂交互，但物理精度和可验证性仍需评估。因此更现实的用法是与 Isaac Lab、MuJoCo 等物理仿真互补：物理仿真提供可控动力学，世界模型提供开放外观、反事实视觉和策略筛选。

#### 🧪 练习题
```yaml
question: "DreamDojo 为什么引入 continuous latent actions？"
options:
  - "为无动作标注的人类视频提供统一代理动作条件，提升动作可控的未来预测"
  - "把所有视频压缩成文本描述，完全不做视觉生成"
  - "替代机器人后训练，使模型无需任何机器人数据"
  - "只用于加密数据，与模型训练无关"
answer: 0
explain: "人类视频规模大但缺少机器人动作标签；latent actions 通过自监督从帧间变化中提取动作因素，使世界模型能学习动作条件的物理后果。"
```
