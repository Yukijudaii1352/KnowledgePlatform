### RMSProp

```yaml
id: rmsprop
name: RMSProp
full_name: 均方根传播 (RMSProp)
year: '2012'
org: Univ. of Toronto
paper_url: https://d2l.ai/chapter_optimization/rmsprop.html
category: adaptive
parent: adagrad
motivation: 指数衰减移动平均解决学习率消失
```

#### 📝 一句话总结

RMSProp 通过对梯度平方使用指数衰减移动平均（而非 Adagrad 的累积求和）来归一化学习率，解决了 Adagrad 在非凸优化中学习率单调递减至零的问题，使其适用于深度学习训练。

#### 🎯 核心要点

- 将 Adagrad 的梯度平方累积和替换为**指数加权移动平均**，避免学习率无限衰减
- 引入衰减系数 \(\gamma\)（典型值 0.9）控制历史信息的半衰期，约为 \(1/(1-\gamma)\) 步
- **解耦**了学习率调度与坐标自适应缩放：全局学习率 \(\eta\) 独立可控
- 保留了 Adagrad 的坐标级自适应性（coordinate-wise adaptivity）作为预条件器
- 是 Adam、Adadelta 等后续自适应优化器的直接前驱

#### 🔬 深入细节

##### 核心示意图

![RMSProp 指数衰减权重分布](https://d2l.ai/_images/output_rmsprop_251805_3_0.svg)
*图：不同 \(\gamma\) 值下，指数移动平均对历史梯度的权重分配。\(\gamma\) 越大，记忆越长。*

![RMSProp 优化轨迹](https://d2l.ai/_images/output_rmsprop_251805_6_1.svg)
*图：RMSProp 在二次函数 \(f(x_1, x_2) = 0.1x_1^2 + 2x_2^2\) 上的优化轨迹，相比 Adagrad 后期不会停滞。*

##### 算法伪代码

```python
# RMSProp 核心更新规则
# 输入: 学习率 η, 衰减系数 γ, 稳定常数 ε, 初始参数 x_0
# 初始化: s_0 = 0

for t in range(1, T+1):
    g_t = compute_gradient(x_{t-1})          # 计算当前梯度
    s_t = γ * s_{t-1} + (1 - γ) * g_t ** 2  # 指数移动平均更新二阶矩估计
    x_t = x_{t-1} - η / sqrt(s_t + ε) * g_t # 自适应学习率参数更新
```

##### 动机与背景

Adagrad 通过累积所有历史梯度的平方和 \(\mathbf{s}_t = \mathbf{s}_{t-1} + \mathbf{g}_t^2\) 来自适应调整每个参数的学习率。这在凸优化（如稀疏特征的线性模型）中效果良好，但存在一个根本缺陷：**状态变量 \(\mathbf{s}_t\) 单调递增，导致有效学习率以 \(\mathcal{O}(t^{-1/2})\) 的速率衰减至零**。对于深度学习中的非凸问题，训练后期模型可能尚未收敛，学习率就已经过小而无法继续有效更新。

一种朴素的修复方案是使用 \(\mathbf{s}_t / t\) 进行归一化，但这意味着算法"记住"了完整的历史轨迹，收敛到合理行为需要很长时间。

##### 核心机制：指数衰减移动平均

RMSProp 的核心创新是引入**泄漏平均（leaky average）**机制，与动量法中的做法类似：

$$
\mathbf{s}_t \leftarrow \gamma \mathbf{s}_{t-1} + (1 - \gamma) \mathbf{g}_t^2
$$

$$
\mathbf{x}_t \leftarrow \mathbf{x}_{t-1} - \frac{\eta}{\sqrt{\mathbf{s}_t + \epsilon}} \odot \mathbf{g}_t
$$

其中：
- \(\gamma \in (0, 1)\) 为衰减系数，控制历史信息的遗忘速度
- \(\eta\) 为全局学习率，独立于自适应缩放
- \(\epsilon\)（典型值 \(10^{-6}\)）防止除零

> 💡 **关键直觉**：展开递推可得 \(\mathbf{s}_t = (1-\gamma)\sum_{i=0}^{t} \gamma^{t-i} \mathbf{g}_i^2\)，即近期梯度权重大、远期梯度权重指数衰减。权重总和归一化为 1，有效窗口长度约为 \(1/(1-\gamma)\)。当 \(\gamma=0.9\) 时，相当于对最近约 10 步梯度取加权平均。

##### 与 Adagrad 的关键区别

| 特性 | Adagrad | RMSProp |
|------|---------|---------|
| 二阶矩估计 | 累积求和（无界增长） | 指数移动平均（有界） |
| 有效学习率 | 单调递减 → 0 | 可随梯度变化波动 |
| 适用场景 | 凸优化、稀疏特征 | 非凸优化、深度学习 |
| 历史记忆 | 完整轨迹 | 近期窗口（\(\sim 1/(1-\gamma)\) 步） |
| 学习率调度 | 与自适应耦合 | 解耦，\(\eta\) 独立可调 |

##### 训练流程与超参数设置

典型超参数配置：
- 学习率 \(\eta = 0.01\)
- 衰减系数 \(\gamma = 0.9\)（聚合最近约 10 步梯度信息）
- 稳定常数 \(\epsilon = 10^{-6}\)

> ⚠️ **注意**：当 \(\gamma = 1\) 时，RMSProp 退化为 Adagrad（无遗忘）；当 \(\gamma = 0\) 时，仅使用当前步梯度，失去平滑效果。实践中 \(\gamma \in [0.9, 0.99]\) 效果最佳。

##### 历史地位与影响

RMSProp 由 Geoffrey Hinton 在 2012 年 Coursera 课程 "Neural Networks for Machine Learning" 第 6e 讲中提出（未正式发表论文），但因其简洁有效而被广泛采用。它直接启发了：
- **Adadelta**（2012）：用参数更新的 RMS 替代全局学习率
- **Adam**（2014）：结合 RMSProp 的二阶矩估计与动量的一阶矩估计，并加入偏差校正

#### 🧪 练习题

```yaml
question: "RMSProp 相比 Adagrad 的核心改进是什么？"
options:
  - "引入动量项加速收敛"
  - "用梯度平方的指数移动平均替代累积和，防止学习率衰减至零"
  - "对学习率施加 L2 正则化"
  - "使用二阶导数（Hessian）信息进行预条件"
answer: 1
explain: "RMSProp 将 Adagrad 中无界增长的梯度平方累积和替换为指数衰减移动平均，使得有效学习率不会单调递减至零，从而适用于深度学习中的非凸优化。"
```