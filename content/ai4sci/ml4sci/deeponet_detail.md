### DeepONet

```yaml
id: deeponet
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: 布朗大学
paper_url: https://www.nature.com/articles/s42256-021-00302-5
category: operators
parent: —
motivation: Branch-Trunk网络解耦输入与坐标
```

#### 📝 一句话总结

DeepONet 基于算子万能逼近定理，提出由 Branch Net（编码输入函数）和 Trunk Net（编码输出坐标）组成的双子网络架构，首次在实践中高效学习非线性算子（函数到函数的映射），在 ODE/PDE 问题上实现了远优于全连接网络的泛化精度，并观测到关于训练数据量的指数级误差收敛。

#### 🎯 核心要点

- **理论基础**：基于 Chen & Chen (1995) 的算子万能逼近定理（Theorem 1），证明单隐层网络可逼近任意非线性连续算子
- **双子网络架构**：Branch Net 编码输入函数 \(u\) 在 \(m\) 个固定 sensor 处的离散值 \([u(x_1), \dots, u(x_m)]\)；Trunk Net 编码输出函数的求值位置 \(y\)
- **两种变体**：Stacked DeepONet（\(p\) 个独立 branch 网络）和 Unstacked DeepONet（单个 branch 网络输出 \(p\) 维向量），后者参数更少、泛化更好
- **输出融合**：通过内积 \(G(u)(y) \approx \sum_{k=1}^{p} b_k \cdot t_k + b_0\) 合并两个子网络输出，添加 bias 项可显著降低误差
- **泛化优势**：相比 FNN 基线，DeepONet 的泛化误差大幅减小；在反导数算子、非线性 ODE、扩散-反应 PDE 和 advection PDE 等 4 类问题上均表现优异
- **收敛速率**：观测到关于训练数据量的多项式（半阶到四阶）乃至指数级误差收敛，为深度学习领域首次报告指数收敛
- **灵活的数据约束**：仅要求输入函数在相同 sensor 位置采样，对输出位置 \(y\) 无任何网格或数量限制

#### 🔬 深入细节

![DeepONet 架构示意图](https://ar5iv.labs.arxiv.org/html/1910.03193/assets/x1.png)
*图：(A) DeepONet 整体架构——Branch Net 接收输入函数在 sensors 处的值，Trunk Net 接收输出位置 y，二者输出通过内积合并得到 G(u)(y)。(B) 训练数据结构：所有输入函数共享相同 sensor 位置，但输出位置可任意。(C) Stacked DeepONet：p 个独立 branch 网络。(D) Unstacked DeepONet：单个 branch 网络输出 p 维向量。*

```python
# DeepONet 前向传播伪代码（Unstacked 版本）
def deeponet_forward(u_sensors, y, branch_net, trunk_net):
    """
    u_sensors: [batch, m]   — 输入函数在 m 个 sensor 处的值
    y:         [batch, d_y] — 输出函数的求值坐标
    """
    # Branch Net: 编码输入函数 → p 维特征
    b = branch_net(u_sensors)          # [batch, p]

    # Trunk Net: 编码输出位置 → p 维基函数
    t = trunk_net(y)                   # [batch, p]

    # 内积融合 + bias
    output = torch.sum(b * t, dim=-1)  # [batch]
    output = output + bias             # 可学习标量 bias
    return output                      # ≈ G(u)(y)

# 训练循环
for epoch in range(num_epochs):
    for (u_batch, y_batch, Gu_y_batch) in dataloader:
        pred = deeponet_forward(u_batch, y_batch, branch_net, trunk_net)
        loss = MSE(pred, Gu_y_batch)
        loss.backward()
        optimizer.step()
```

##### 动机与背景

传统神经网络学习的是**函数**（向量到向量的映射），而科学计算中大量问题本质上是**算子**学习——给定一个输入函数 \(u\)（如初始条件、外力场、边界条件），求解对应的输出函数 \(G(u)\)（如 PDE 的解）。Chen & Chen (1995) 的万能逼近定理证明了神经网络具备逼近任意非线性连续算子的能力，但该定理仅保证了足够大网络的逼近误差，未考虑实际训练中同样关键的**优化误差**和**泛化误差**。

> 💡 关键：总误差 = 逼近误差 + 优化误差 + 泛化误差。万能逼近定理只控制第一项，DeepONet 通过架构设计同时压低后两项。

##### 核心机制

**1. 算子万能逼近定理（Theorem 1）**

对于任意非线性连续算子 \(G: V \to C(\mathbb{R}^d)\)，存在 \(m\) 个 sensor 点 \(x_1, \dots, x_m\) 和网络参数，使得：

$$G(u)(y) \approx \sum_{k=1}^{p} \underbrace{\sigma\!\left(\sum_{j=1}^{m} \xi_k^j \, u(x_j) + \theta_k\right)}_{\text{Branch Net 第 } k \text{ 个输出 } b_k} \cdot \underbrace{\sigma\!\left(\boldsymbol{w}_k \cdot y + \zeta_k\right)}_{\text{Trunk Net 第 } k \text{ 个输出 } t_k}$$

其中 \(\sigma\) 为激活函数。这一公式自然地将网络分解为两个子网络：
- **Branch Net**：以 \([u(x_1), \dots, u(x_m)]\) 为输入，输出 \([b_1, \dots, b_p]\)，编码输入函数的"特征"
- **Trunk Net**：以 \(y\) 为输入，输出 \([t_1, \dots, t_p]\)，可理解为一组在 \(y\) 处求值的**可学习基函数**

**2. Stacked vs. Unstacked 架构**

- **Stacked DeepONet**：严格遵循定理结构，使用 \(p\) 个独立的 branch 网络，每个输出一个标量 \(b_k\)。参数量为 \(O(p \times m \times w)\)，其中 \(w\) 为隐层宽度。
- **Unstacked DeepONet**：使用单个 branch 网络，最后一层输出 \(p\) 维向量。参数量约为 \(O(m \times w + w \times p)\)，远少于 stacked 版本。实验表明 unstacked 版本虽然训练误差略大，但**泛化误差更小**，总体测试误差更优。

**3. Bias 的重要性**

在输出公式中添加可学习 bias \(b_0\)：

$$G(u)(y) \approx \sum_{k=1}^{p} b_k \, t_k + b_0$$

实验证明添加 bias 可同时降低训练误差和测试误差，且使训练更稳定（方差更小）。

> ⚠️ 注意：这里的 bias 不是普通神经网络层的 bias，而是在 branch-trunk 内积之后额外添加的全局偏置项。

##### 训练与数据流

**数据格式**：训练集由三元组 \(\{(u^{(i)}, y^{(i,j)}, G(u^{(i)})(y^{(i,j)}))\}\) 组成。关键约束是所有输入函数 \(u^{(i)}\) 必须在**相同的 \(m\) 个 sensor 位置**采样，但输出位置 \(y^{(i,j)}\) 可以任意分布、数量不同。

**损失函数**：标准均方误差（MSE）：

$$\mathcal{L} = \frac{1}{N} \sum_{i,j} \left| G_\theta(u^{(i)})(y^{(i,j)}) - G(u^{(i)})(y^{(i,j)}) \right|^2$$

**数据生成**：输入函数从高斯随机场（GRF）或切比雪夫多项式空间中采样，输出通过数值求解器（如 Runge-Kutta、有限差分）获得真值。

##### 与传统方法的区别

| 方面 | FNN 直接学习 | CNN 图像映射 | DeepONet |
|------|-------------|-------------|----------|
| 输入表示 | 拼接 \([u(x_1),\dots,u(x_m), y]\) | 网格化图像 | Branch + Trunk 分离 |
| 网格要求 | 无 | 等距网格 | sensor 固定即可，\(y\) 任意 |
| 泛化能力 | 差（大泛化误差） | 中等 | 优（归纳偏置压低泛化误差） |
| 理论保证 | 函数逼近定理 | 无 | 算子逼近定理 |
| 输出分辨率 | 固定 | 固定网格 | 连续（任意 \(y\) 可查询） |

DeepONet 的核心优势在于其**归纳偏置**：将输入函数编码与输出坐标编码解耦，使网络天然适配算子学习的结构，从而大幅降低泛化误差。

#### 🧪 练习题

```yaml
question: "DeepONet 中 Trunk Net 的输入和作用是什么？"
options:
  - "输入为函数 u 的离散值，作用是编码输入函数特征"
  - "输入为输出位置 y，作用是生成一组可学习基函数"
  - "输入为 PDE 的参数，作用是编码物理约束"
  - "输入为训练标签，作用是计算损失函数"
answer: 1
explain: "Trunk Net 以输出位置 y 为输入，输出 p 维向量 [t_1,...,t_p]，可理解为在 y 处求值的可学习基函数，与 Branch Net 输出通过内积融合得到最终预测。"
```