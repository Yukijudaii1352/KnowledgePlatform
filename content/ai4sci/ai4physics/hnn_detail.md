### HNN — 哈密顿神经网络 (Hamiltonian Neural Networks)

```yaml
id: hnn
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: "2019"
org: Google Brain / Dartmouth College
paper_url: https://arxiv.org/abs/1906.01563
category: foundation
parent: —
motivation: 通过神经网络参数化哈密顿量并利用辛结构约束动力学，实现物理系统的能量守恒
```

#### 📝 一句话总结

HNN 提出用神经网络直接参数化物理系统的哈密顿量 \(H_\theta(\mathbf{q}, \mathbf{p})\)，并通过自动微分强制输出满足哈密顿正则方程（辛结构），从而在不显式编码能量守恒规则的前提下，让网络自动学会保持系统总能量——在弹簧、单摆、两体问题乃至像素级观测等任务上，能量守恒精度比普通基线网络高出数个数量级。

#### 🎯 核心要点

- **核心思想**：不直接拟合 \(\dot{\mathbf{q}}, \dot{\mathbf{p}}\)，而是让 NN 输出标量哈密顿量 \(H_\theta\)，再通过辛梯度 \((\partial H/\partial \mathbf{p},\; -\partial H/\partial \mathbf{q})\) 得到动力学，结构性地保证能量守恒
- **损失函数**：直接监督哈密顿方程的左右两侧之差（Eq 3），无需能量标签
- **5 个实验任务**：理想弹簧（Task 1）、理想单摆（Task 2）、真实单摆视频数据（Task 3）、两体引力问题（Task 4）、像素级单摆（Task 5）
- **像素扩展**：Autoencoder + HNN 联合训练，辅助损失（Eq 7）使潜空间的后半部分 \(\mathbf{z_p}\) 近似 \(\mathbf{z_q}\) 的时间导数，从而满足正则坐标条件
- **定量结果**：在所有任务上，HNN 的能量 MSE 比基线低 1–3 个数量级（Table 1），而训练/测试损失与基线相当
- **网络架构**：极简 MLP（3 层全连接，200 隐藏单元，tanh 激活），训练使用 Adam（lr = 1e-3）

#### 🔬 深入细节

##### 核心架构示意图

![HNN 核心思想对比图](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x1.png)
*图 1：左侧为基线方法——直接用 NN 拟合状态导数 \((\dot{q}, \dot{p})\)；右侧为 HNN——NN 输出标量 \(H_\theta\)，再通过辛梯度（自动微分）得到动力学。HNN 的相空间轨迹保持在等能量面上（右下角），而基线轨迹逐渐偏离（左下角）。*

##### 算法伪代码

```python
# HNN 训练与推理伪代码
import torch
import torch.autograd as autograd

# === 模型定义 ===
class HNN(torch.nn.Module):
    def __init__(self, input_dim, hidden_dim=200):
        super().__init__()
        self.net = torch.nn.Sequential(
            torch.nn.Linear(input_dim, hidden_dim),  # (q,p) → hidden
            torch.nn.Tanh(),
            torch.nn.Linear(hidden_dim, hidden_dim),
            torch.nn.Tanh(),
            torch.nn.Linear(hidden_dim, 1)            # → 标量 H
        )

    def forward(self, q, p):
        x = torch.cat([q, p], dim=-1)
        return self.net(x)  # 输出标量哈密顿量

    def time_derivative(self, q, p):
        """通过辛梯度计算 dq/dt, dp/dt"""
        q.requires_grad_(True)
        p.requires_grad_(True)
        H = self.forward(q, p)
        dH_dq = autograd.grad(H.sum(), q, create_graph=True)[0]
        dH_dp = autograd.grad(H.sum(), p, create_graph=True)[0]
        dq_dt = dH_dp       # Hamilton 方程: dq/dt = ∂H/∂p
        dp_dt = -dH_dq      # Hamilton 方程: dp/dt = -∂H/∂q
        return dq_dt, dp_dt

# === 训练循环 ===
model = HNN(input_dim=2)  # 1D 系统: q, p 各 1 维
optimizer = torch.optim.Adam(model.parameters(), lr=1e-3)

for step in range(2000):
    # 从数据中采样 (q, p, dq/dt_true, dp/dt_true)
    q, p, dq_true, dp_true = sample_batch(data, batch_size=200)
    dq_pred, dp_pred = model.time_derivative(q, p)
    # 损失: 预测导数 vs 真实导数 (Eq 3)
    loss = ((dq_pred - dq_true)**2 + (dp_pred - dp_true)**2).mean()
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# === 推理: 用 RK4 积分生成轨迹 ===
def rk4_step(model, q, p, dt):
    def f(q, p):
        return model.time_derivative(q, p)
    k1q, k1p = f(q, p)
    k2q, k2p = f(q + dt/2*k1q, p + dt/2*k1p)
    k3q, k3p = f(q + dt/2*k2q, p + dt/2*k2p)
    k4q, k4p = f(q + dt*k3q, p + dt*k3p)
    q_new = q + dt/6 * (k1q + 2*k2q + 2*k3q + k4q)
    p_new = p + dt/6 * (k1p + 2*k2p + 2*k3p + k4p)
    return q_new, p_new
```

##### 动机与背景

物理系统的动力学建模是科学计算的核心任务。传统的神经网络方法（如 Neural ODE）直接用网络拟合状态的时间导数 \(\dot{\mathbf{x}} = f_\theta(\mathbf{x})\)，虽然灵活，但**完全忽略了物理系统的守恒律**。对于保守力学系统，总能量 \(H(\mathbf{q}, \mathbf{p})\) 是一个运动常数——沿真实轨迹恒定不变。普通 NN 无法保证这一点，导致长时间积分时能量漂移、轨迹发散。

> 💡 **关键洞察**：哈密顿力学提供了一个天然的归纳偏置——只要动力学由某个标量函数 \(H\) 的辛梯度给出，能量就自动守恒。HNN 的核心贡献就是将这一结构性约束嵌入神经网络。

##### 哈密顿力学基础

对于一个具有广义坐标 \(\mathbf{q}\) 和共轭动量 \(\mathbf{p}\) 的力学系统，哈密顿量 \(H(\mathbf{q}, \mathbf{p})\) 是系统的总能量。**哈密顿正则方程**给出了系统的时间演化：

$$\frac{d\mathbf{q}}{dt} = \frac{\partial H}{\partial \mathbf{p}}, \qquad \frac{d\mathbf{p}}{dt} = -\frac{\partial H}{\partial \mathbf{q}} \tag{1}$$

这组方程具有**辛结构**（symplectic structure），可以紧凑地写为：

$$\frac{d}{dt}\begin{pmatrix} \mathbf{q} \\ \mathbf{p} \end{pmatrix} = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix} \nabla_{(\mathbf{q},\mathbf{p})} H \tag{2}$$

其中 \(J = \begin{pmatrix} 0 & I \\ -I & 0 \end{pmatrix}\) 是辛矩阵。辛结构的直接推论是：

$$\frac{dH}{dt} = \nabla H \cdot \dot{\mathbf{x}} = \nabla H \cdot J \nabla H = 0$$

即 **\(H\) 沿轨迹恒为常数**——能量自动守恒，无需额外约束。

##### HNN 的核心机制

HNN 的设计极为优雅：

1. **参数化哈密顿量**：用一个神经网络 \(H_\theta: \mathbb{R}^{2n} \to \mathbb{R}\) 将相空间坐标 \((\mathbf{q}, \mathbf{p})\) 映射为标量。网络不直接预测动力学，而是预测一个"能量景观"。

2. **辛梯度提取动力学**：利用自动微分计算 \(\partial H_\theta / \partial \mathbf{p}\) 和 \(\partial H_\theta / \partial \mathbf{q}\)，再通过哈密顿方程得到 \(\dot{\mathbf{q}}\) 和 \(\dot{\mathbf{p}}\)。这一步是 HNN 的灵魂——它将物理结构硬编码进了计算图。

3. **损失函数（Eq 3）**：

$$\mathcal{L}_{\text{HNN}} = \left\| \frac{\partial H_\theta}{\partial \mathbf{p}} - \frac{d\mathbf{q}}{dt} \right\|^2 + \left\| \frac{\partial H_\theta}{\partial \mathbf{q}} + \frac{d\mathbf{p}}{dt} \right\|^2 \tag{3}$$

> ⚠️ **注意**：训练数据只需要状态-导数对 \((\mathbf{q}, \mathbf{p}, \dot{\mathbf{q}}, \dot{\mathbf{p}})\)，**不需要能量标签**。能量守恒是结构的自然结果，而非显式监督的目标。

##### 从坐标到像素：Autoencoder + HNN

论文最具创新性的实验是 **Task 5: Pixel Pendulum**——直接从 28×28 灰度图像序列中学习哈密顿动力学。

![像素摆实验结果](https://ar5iv.labs.arxiv.org/html/1906.01563/assets/x4.png)
*图 4：像素摆实验。HNN 在潜空间中保持能量守恒，预测轨迹数百帧后仍接近真实值；基线模型迅速衰减到低能态。*

方法设计：
- **输入**：连续两帧 28×28 图像拼接（batch × 28 × 28 × 2），双帧使速度可观测
- **Autoencoder**：4 层全连接（200 隐藏单元，ReLU + 残差连接），潜空间维度为 2（\(\mathbf{z} = (\mathbf{z_q}, \mathbf{z_p})\)）
- **HNN**：在潜空间上运行，架构与坐标实验相同
- **辅助损失（Eq 7）**：

$$\mathcal{L}_{CC} = \left\| \mathbf{z}^t_{\mathbf{p}} - (\mathbf{z}^t_{\mathbf{q}} - \mathbf{z}^{t+1}_{\mathbf{q}}) \right\|_2 \tag{7}$$

该损失鼓励 \(\mathbf{z_p}\) 近似 \(\dot{\mathbf{z}}_{\mathbf{q}}\)（有限差分），使潜空间具有正则坐标 \((\mathbf{q}, \mathbf{p})\) 的性质——这是哈密顿力学成立的前提条件。

总损失 = HNN 损失 + 自编码器重建损失（L2 像素损失）+ 辅助正则坐标损失。

##### 实验结果与对比

论文在 5 个任务上对比了 HNN 与基线（直接拟合导数的同架构 NN）：

| 任务 | 基线能量 MSE (×10³) | HNN 能量 MSE (×10³) | 提升倍数 |
|------|---------------------|---------------------|---------|
| 理想弹簧 | 170 ± 20 | **0.38 ± 0.1** | ~450× |
| 理想单摆 | 42 ± 10 | **25 ± 5** | ~1.7× |
| 真实单摆 | 390 ± 7 | **14 ± 5** | ~28× |
| 两体问题 | — | — | 约 10× |
| 像素单摆 | — | — | 数量级提升 |

> 💡 **关键发现**：HNN 与基线的训练/测试损失相当（两者拟合能力相似），但 HNN 在**能量守恒**指标上以压倒性优势胜出。这说明辛结构归纳偏置的价值不在于更好的拟合，而在于更好的**泛化和长期稳定性**。

##### 与传统方法的对比

| 特性 | 传统 NN (Neural ODE) | HNN |
|------|---------------------|-----|
| 输出 | 直接预测 \(\dot{\mathbf{q}}, \dot{\mathbf{p}}\) | 预测标量 \(H_\theta\)，辛梯度得动力学 |
| 能量守恒 | 无保证，长期漂移 | 结构性保证（精确到数值积分误差） |
| 物理先验 | 无 | 哈密顿辛结构 |
| 训练数据 | 状态-导数对 | 同样是状态-导数对（无需能量标签） |
| 长期积分 | 轨迹迅速发散 | 轨迹长期稳定 |
| 局限 | 灵活但不稳定 | 要求系统为保守系统（无耗散） |

##### 讨论与局限

- **正则坐标要求**：HNN 假设输入为正则坐标 \((\mathbf{q}, \mathbf{p})\)，对于像素等非正则输入需要额外的 Autoencoder 和辅助损失来学习正则表示
- **保守系统假设**：HNN 天然不能处理耗散系统（如有摩擦的系统），后续工作如 Dissipative HNN 对此进行了扩展
- **数值积分误差**：虽然 HNN 结构上保证 \(dH/dt = 0\)，但实际使用 RK4 等非辛积分器时仍有微小能量漂移；使用辛积分器（如 Leapfrog）可进一步改善
- **可扩展性**：论文在两体和三体问题上展示了扩展性，但更高维系统的效果有待验证

#### 🧪 练习题

```yaml
question: "HNN 相比直接拟合时间导数的基线网络，其核心优势来源于什么？"
options:
  - "使用了更深的网络架构和更多的训练数据"
  - "网络输出标量哈密顿量并通过辛梯度得到动力学，结构性地保证能量守恒"
  - "在损失函数中显式加入了能量守恒的惩罚项"
  - "使用了辛积分器（如 Leapfrog）替代 Runge-Kutta 进行时间积分"
answer: 1
explain: "HNN 的核心创新在于让 NN 输出标量 H 而非直接输出导数，再通过自动微分计算辛梯度得到动力学。由于辛结构的数学性质（dH/dt = ∇H · J∇H = 0），能量守恒是结构的自然结果，无需显式惩罚项或特殊积分器。"
```