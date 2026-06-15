### ZMP — 零力矩点 (Zero Moment Point)

```yaml
id: zmp
name: ZMP
full_name: 零力矩点 (Zero Moment Point)
year: "1969"
org: Waseda University
paper_url: https://ieeexplore.ieee.org/document/1083694
category: classic_control
parent: "—"
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
