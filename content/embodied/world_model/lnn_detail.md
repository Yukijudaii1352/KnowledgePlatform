### 拉格朗日神经网络 (Lagrangian Neural Networks)

```yaml
id: lnn
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: "2020.03"
org: MIT
paper_url: https://arxiv.org/abs/2003.04630
category: physics
parent: hnn
motivation: 基于拉格朗日力学处理复杂约束系统
```

#### 📝 一句话总结

LNN 提出用神经网络直接参数化拉格朗日量 \(L(q, \dot{q})\)，通过欧拉-拉格朗日方程推导运动方程，解决了哈密顿神经网络 (HNN) 必须依赖正则坐标的限制，使物理先验神经网络能够处理任意坐标系下的复杂约束系统。

#### 🎯 核心要点

- **拉格朗日参数化**：用神经网络学习系统的拉格朗日量 \(L(q, \dot{q})\)，而非直接学习动力学映射
- **任意坐标兼容**：不要求正则坐标 \((q, p)\)，可直接使用广义坐标 \((q, \dot{q})\)，适用范围远超 HNN
- **欧拉-拉格朗日约束**：通过 \(\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0\) 将物理守恒律硬编码进网络结构
- **二阶自动微分**：利用深度学习框架的自动微分计算 Hessian \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 及混合偏导数
- **拉格朗日图网络 (LGN)**：将方法扩展到 PDE 系统，通过图网络对拉格朗日密度求和建模连续场
- **实验验证**：在双摆、相对论粒子、1D 波动方程三个任务上展示了长时程能量守恒与坐标无关性优势

#### 🔬 深入细节

![LNN 核心框架图](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/new_lnn_figv3_fat.png)
*图：LNN 核心思想示意。物理学家用拉格朗日量描述双摆等物理系统的动力学（黑色）。普通神经网络在长时间预测中因误差累积而失败（红色），而 LNN 通过学习拉格朗日量并利用物理约束推导运动方程，实现精确的长期预测（蓝色）。*

##### 算法伪代码

```python
# Lagrangian Neural Network 前向推理
# 输入: 广义坐标 q, 广义速度 q_dot
# 输出: 广义加速度 q_ddot

def lnn_forward(q, q_dot, lagrangian_nn):
    """通过欧拉-拉格朗日方程计算加速度"""
    # 1. 神经网络预测拉格朗日量
    L = lagrangian_nn(q, q_dot)  # L: scalar
    
    # 2. 计算所需的偏导数（自动微分）
    dL_dq = grad(L, q)           # ∂L/∂q
    dL_dq_dot = grad(L, q_dot)   # ∂L/∂q̇
    
    # 3. 计算 Hessian 和混合偏导
    H = jacobian(dL_dq_dot, q_dot)  # ∂²L/∂q̇² (Hessian)
    J = jacobian(dL_dq_dot, q)      # ∂²L/∂q∂q̇ (混合项)
    
    # 4. 通过欧拉-拉格朗日方程求解加速度
    # q̈ = H⁻¹ [∂L/∂q - (∂²L/∂q∂q̇) q̇]
    q_ddot = solve(H, dL_dq - J @ q_dot)
    
    return q_ddot

# 训练循环
for (q, q_dot, q_ddot_true) in dataset:
    q_ddot_pred = lnn_forward(q, q_dot, lagrangian_nn)
    loss = MSE(q_ddot_pred, q_ddot_true)
    optimizer.step(loss)
```

##### 动机与背景

物理系统的动力学建模是科学计算的核心问题。传统方法直接用神经网络拟合状态到状态的映射 \(\dot{x} = f_\theta(x)\)，虽然短期预测准确，但由于缺乏物理约束，长时间积分后会严重违反能量守恒等基本物理定律。

**哈密顿神经网络 (HNN)** 率先引入物理先验，通过学习哈密顿量 \(H(q, p)\) 并利用哈密顿方程 \(\dot{q} = \frac{\partial H}{\partial p},\ \dot{p} = -\frac{\partial H}{\partial q}\) 来保证能量守恒。然而 HNN 有一个关键限制：**它要求输入必须是正则坐标 \((q, p)\)**，其中 \(p\) 是正则动量。在许多实际问题中（如机器人关节角度、传感器读数），我们获得的是广义坐标和广义速度 \((q, \dot{q})\)，而非正则动量。从 \(\dot{q}\) 到 \(p\) 的转换本身就需要知道系统的拉格朗日量，形成了鸡生蛋的困境。

> 💡 **关键洞察**：拉格朗日力学与哈密顿力学在物理上等价，但拉格朗日形式直接使用 \((q, \dot{q})\) 作为状态变量，天然兼容任意广义坐标，无需正则变换。

##### 核心机制：欧拉-拉格朗日方程驱动的神经网络

LNN 的核心思想极为优雅：用一个神经网络 \(\mathcal{L}_\theta\) 参数化拉格朗日量，然后通过经典力学的欧拉-拉格朗日方程自动推导出运动方程。

**拉格朗日量**定义为动能减去势能：

$$L(q, \dot{q}) = T(\dot{q}) - V(q)$$

**欧拉-拉格朗日方程**给出系统的运动方程：

$$\frac{d}{dt}\frac{\partial L}{\partial \dot{q}} - \frac{\partial L}{\partial q} = 0$$

将全导数展开，可以得到加速度的显式表达：

$$\ddot{q} = \left(\frac{\partial^2 L}{\partial \dot{q}^2}\right)^{-1} \left[\frac{\partial L}{\partial q} - \left(\frac{\partial^2 L}{\partial q \partial \dot{q}}\right) \dot{q}\right]$$

这个公式是 LNN 的核心计算步骤。其中：
- \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 是拉格朗日量对广义速度的 **Hessian 矩阵**，对应系统的广义质量矩阵
- \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\) 是**混合偏导数**，捕捉坐标与速度之间的耦合（如科里奥利力）
- \(\frac{\partial L}{\partial q}\) 包含广义力的信息

> ⚠️ **注意**：Hessian 矩阵 \(\frac{\partial^2 L}{\partial \dot{q}^2}\) 必须可逆。对于合理的物理系统，这等价于要求广义质量矩阵正定，这在物理上总是成立的。

##### 自动微分的关键作用

LNN 的实现高度依赖现代深度学习框架的**自动微分**能力。具体来说，需要计算：

1. **一阶梯度** \(\frac{\partial L}{\partial q}\) 和 \(\frac{\partial L}{\partial \dot{q}}\)：标准反向传播
2. **二阶导数** \(\frac{\partial^2 L}{\partial \dot{q}^2}\)：对一阶梯度再次求导（Hessian）
3. **混合二阶导数** \(\frac{\partial^2 L}{\partial q \partial \dot{q}}\)：交叉偏导数

这些高阶导数在 JAX 等框架中可以通过嵌套的 `grad` 和 `jacobian` 调用高效计算。论文使用 JAX 实现，利用其函数式自动微分特性。

##### 与 HNN 的核心区别

| 特性 | HNN | LNN |
|------|-----|-----|
| 学习目标 | 哈密顿量 \(H(q, p)\) | 拉格朗日量 \(L(q, \dot{q})\) |
| 输入坐标 | 正则坐标 \((q, p)\) | 任意广义坐标 \((q, \dot{q})\) |
| 运动方程 | 哈密顿方程（一阶ODE） | 欧拉-拉格朗日方程（二阶ODE） |
| 坐标限制 | 必须正则变换 | **无限制** |
| 约束系统 | 困难 | 自然处理 |
| 计算代价 | 一阶导数 | 二阶导数（Hessian） |

> 💡 **关键优势**：在相对论粒子实验中，HNN 在非正则坐标下完全失败（轨迹发散），而 LNN 在同样的任意坐标下仍能准确学习动力学。这验证了坐标无关性是 LNN 的核心优势。

##### 拉格朗日图网络：扩展到 PDE 系统

论文进一步提出了**拉格朗日图网络 (Lagrangian Graph Networks, LGN)**，将 LNN 的思想扩展到偏微分方程（PDE）描述的连续系统。

核心思想是将连续场离散化为图上的节点，每个节点的**拉格朗日密度** \(\mathcal{L}_i\) 由其局部邻域决定：

$$L_{\text{total}} = \sum_i \mathcal{L}_\theta(q_i, \dot{q}_i, q_{\mathcal{N}(i)})$$

其中 \(\mathcal{N}(i)\) 是节点 \(i\) 的邻居集合。这种设计使得 LNN 可以建模波动方程等连续物理系统，同时保持平移不变性和守恒律。

![双摆实验结果](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x1.png)
*图：双摆任务实验结果对比。LNN 和基线模型在短期动力学建模上表现相似，但在能量守恒方面 LNN 显著优于无物理先验的基线。*

![相对论粒子实验](https://ar5iv.labs.arxiv.org/html/2003.04630/assets/x4.png)
*图：相对论粒子任务。(a) HNN 在非正则坐标下失败；(b) HNN 在正则坐标下成功；(c) LNN 在任意坐标下均成功，验证了坐标无关性优势。*

#### 🧪 练习题

```yaml
question: "与哈密顿神经网络 (HNN) 相比，拉格朗日神经网络 (LNN) 的核心优势是什么？"
options:
  - "训练速度更快，因为只需一阶导数"
  - "能够在任意广义坐标下工作，无需正则坐标变换"
  - "网络参数量更少，更容易收敛"
  - "可以直接预测系统能量，无需积分"
answer: 1
explain: "LNN 基于拉格朗日力学，直接使用广义坐标 (q, q̇) 作为输入，而 HNN 要求正则坐标 (q, p)。这使得 LNN 能处理无法轻易获得正则动量的复杂约束系统。"
```