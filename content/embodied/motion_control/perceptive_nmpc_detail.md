### 感知非线性模型预测控制 (Perceptive Nonlinear MPC)

```yaml
id: perceptive_nmpc
name: Perceptive NMPC
full_name: 感知非线性模型预测控制 (Perceptive Locomotion through Nonlinear Model Predictive Control)
year: 2023
org: ETH Zurich (RSL)
authors: Ruben Grandia, Fabian Jenelten, Shaohui Yang, Farbod Farshidian, Marco Hutter
paper_url: https://arxiv.org/abs/2208.08373
doi: 10.1109/TRO.2023.3275384
category: mpc
parent: convex_mpc
motivation: "将地形感知信息（可踏性、平面分割、SDF）编码为凸约束，嵌入全身非线性 MPC，实现四足机器人在复杂地形上的精确脚点规划与动态运动"
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