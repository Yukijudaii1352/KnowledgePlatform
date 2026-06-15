---
domain: ai4sci
topic_id: ai4physics
topic_name: 物理学AI
page_icon: ⚛️
page_title: 物理学AI 算法总结
page_subtitle: '{build_date} 版'
page_desc: 从PINN到神经算子，从流体仿真到物理定律发现，涵盖2016-2026年物理学AI核心算法演化
hero_pills:
- 🏷️ PINN · Neural Operators · AI4Sci
- 🔬 PDE求解 · 流体仿真 · 物理发现
count_pill: '{count} 个算法'
categories:
  pde_solving:
    label: 偏微分方程求解
    color: '#3B82F6'
  fluid_simulation:
    label: 流体仿真
    color: '#10B981'
  solid_mechanics:
    label: 固体力学
    color: '#F59E0B'
  physics_discovery:
    label: 理论物理发现
    color: '#8B5CF6'
  physics_constrained:
    label: 物理约束学习
    color: '#EC4899'
  quantum_particle:
    label: 量子与粒子物理
    color: '#6366F1'
image_base: ../../content/ai4sci/ai4physics/assets/
---

## 领域综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4physics/overview/zhihu__物理AI（二）：物理AI数学原理及实操__d24e7271/article.md

## 最新进展综述

!INCLUDE_RAW ../../temp/content_survey_bulk_20260614_174337/researcher_output/ai4sci/ai4physics/latest/zhihu__当物理遇上AI：深度学习里的物理元素（下）__7b82434b/article.md

## 算法演化关系

```yaml
nodes:
- id: sindy
  x: 0.0
  y: 70
  category: physics_discovery
- id: nqs
  x: 10.0
  y: 110
  category: quantum_particle
- id: pde_net
  x: 20.0
  y: 10
  category: pde_solving
- id: neural_ode
  x: 20.0
  y: 90
  category: physics_constrained
- id: pinn
  x: 30.0
  y: 10
  category: pde_solving
- id: hnn
  x: 30.0
  y: 90
  category: physics_constrained
- id: xpinns
  x: 40.0
  y: 10
  category: pde_solving
- id: gns
  x: 40.0
  y: 30
  category: fluid_simulation
- id: meshgraphnets
  x: 40.0
  y: 30
  category: fluid_simulation
- id: jax_md
  x: 40.0
  y: 30
  category: fluid_simulation
- id: difftaichi
  x: 40.0
  y: 30
  category: fluid_simulation
- id: phiflow
  x: 40.0
  y: 30
  category: fluid_simulation
- id: ai_feynman
  x: 40.0
  y: 70
  category: physics_discovery
- id: ude
  x: 40.0
  y: 70
  category: physics_discovery
- id: lnn
  x: 40.0
  y: 90
  category: physics_constrained
- id: sympnets
  x: 40.0
  y: 90
  category: physics_constrained
- id: particlenet
  x: 40.0
  y: 110
  category: quantum_particle
- id: hp_vpinns
  x: 50.0
  y: 10
  category: pde_solving
- id: fno
  x: 50.0
  y: 10
  category: pde_solving
- id: deeponet
  x: 50.0
  y: 10
  category: pde_solving
- id: brax
  x: 50.0
  y: 30
  category: fluid_simulation
- id: canns
  x: 50.0
  y: 50
  category: solid_mechanics
- id: tanns
  x: 50.0
  y: 50
  category: solid_mechanics
- id: egnn
  x: 50.0
  y: 90
  category: physics_constrained
- id: noether_nets
  x: 50.0
  y: 90
  category: physics_constrained
- id: gpinn
  x: 60.0
  y: 10
  category: pde_solving
- id: causal_pinn
  x: 60.0
  y: 10
  category: pde_solving
- id: pi_deeponet
  x: 60.0
  y: 10
  category: pde_solving
- id: geo_fno
  x: 70.0
  y: 10
  category: pde_solving
- id: uno
  x: 70.0
  y: 10
  category: pde_solving
- id: pysr
  x: 70.0
  y: 70
  category: physics_discovery
- id: poseidon
  x: 80.0
  y: 10
  category: pde_solving
- id: walrus
  x: 100.0
  y: 10
  category: pde_solving
- id: transolver3
  x: 100.0
  y: 10
  category: pde_solving
- id: pf_pino
  x: 100.0
  y: 10
  category: pde_solving
- id: pikan
  x: 100.0
  y: 10
  category: pde_solving
- id: fedonet
  x: 100.0
  y: 10
  category: pde_solving
- id: fano
  x: 100.0
  y: 30
  category: fluid_simulation
- id: physicsnemo
  x: 100.0
  y: 30
  category: fluid_simulation
- id: simple_pinn
  x: 100.0
  y: 30
  category: fluid_simulation
- id: fe_pinns
  x: 100.0
  y: 50
  category: solid_mechanics
- id: aion1
  x: 100.0
  y: 90
  category: physics_constrained
- id: momentum_gnn
  x: 100.0
  y: 90
  category: physics_constrained
edges:
- from: pinn
  to: xpinns
  label: 域分解
- from: gns
  to: meshgraphnets
  label: 网格扩展
- from: neural_ode
  to: ude
  label: 混合建模
- from: hnn
  to: lnn
  label: 拉格朗日
- from: hnn
  to: sympnets
  label: 辛对称
- from: pinn
  to: hp_vpinns
  label: 变分细化
- from: jax_md
  to: brax
  label: 刚体引擎
- from: pinn
  to: gpinn
  label: 梯度增强
- from: pinn
  to: causal_pinn
  label: 因果加权
- from: deeponet
  to: pi_deeponet
  label: 物理嵌入
- from: fno
  to: geo_fno
  label: 几何自适应
- from: fno
  to: uno
  label: 多尺度
- from: fno
  to: poseidon
  label: 基础模型
- from: poseidon
  to: walrus
  label: 规模化扩展
- from: fno
  to: transolver3
  label: 大规模网格
- from: fno
  to: pf_pino
  label: 相场约束
- from: pinn
  to: pikan
  label: 架构演进
- from: deeponet
  to: fedonet
  label: 谱特征嵌入
- from: fno
  to: fano
  label: 平流增强
- from: pinn
  to: simple_pinn
  label: 算法融合
- from: canns
  to: fe_pinns
  label: 有限元集成
- from: egnn
  to: momentum_gnn
  label: 守恒律硬约束
milestones:
- id: neural_ode
  label: 连续深度模型奠基
- id: pinn
  label: 物理信息嵌入范式
- id: fno
  label: 算子学习突破
- id: walrus
  label: 物理大模型时代
```

## 核心算法

### SINDy

```yaml
id: sindy
num: 1
name: SINDy
full_name: 稀疏识别动力学 (Sparse Identification of Nonlinear Dynamics)
year: '2016'
org: 华盛顿大学
parent: —
paper_url: https://www.pnas.org/doi/10.1073/pnas.1517384113
project_url: ''
category: physics_discovery
motivation: 稀疏回归识别非线性控制方程
```

#### 📝 一句话总结
SINDy 的核心目标是：稀疏回归识别非线性控制方程。

#### 🎯 核心要点
- 核心动机：稀疏回归识别非线性控制方程
- 代表机构：华盛顿大学

#### 🔬 深入细节
稀疏回归识别非线性控制方程


### NQS

```yaml
id: nqs
num: 2
name: NQS
full_name: 神经量子态 (Neural Quantum States)
year: '2017'
org: ETH Zurich
parent: —
paper_url: https://www.science.org/doi/10.1126/science.aag2302
project_url: ''
category: quantum_particle
motivation: RBM表示波函数解决多体问题
```

#### 📝 一句话总结
NQS 的核心目标是：RBM表示波函数解决多体问题。

#### 🎯 核心要点
- 核心动机：RBM表示波函数解决多体问题
- 代表机构：ETH Zurich

#### 🔬 深入细节
RBM表示波函数解决多体问题


### PDE-Net

```yaml
id: pde_net
num: 3
name: PDE-Net
full_name: 偏微分方程网络 (PDE-Net)
year: '2018'
org: 北京大学
parent: —
paper_url: http://proceedings.mlr.press/v80/long18a.html
project_url: ''
category: pde_solving
motivation: 卷积矩约束模拟微分算子
```

#### 📝 一句话总结
PDE-Net 的核心目标是：卷积矩约束模拟微分算子。

#### 🎯 核心要点
- 核心动机：卷积矩约束模拟微分算子
- 代表机构：北京大学

#### 🔬 深入细节
卷积矩约束模拟微分算子


### Neural ODE

```yaml
id: neural_ode
num: 4
name: Neural ODE
full_name: 神经常微分方程 (Neural Ordinary Differential Equations)
year: '2018'
org: 多伦多大学
parent: —
paper_url: https://arxiv.org/abs/1806.07366
project_url: ''
category: physics_constrained
motivation: 网络层视为连续时间演化
```

#### 📝 一句话总结
Neural ODE 的核心目标是：网络层视为连续时间演化。

#### 🎯 核心要点
- 核心动机：网络层视为连续时间演化
- 代表机构：多伦多大学

#### 🔬 深入细节
网络层视为连续时间演化


### PINN

```yaml
id: pinn
num: 5
name: PINN
full_name: 物理信息神经网络 (Physics-Informed Neural Networks)
year: '2019'
org: 布朗大学
parent: —
paper_url: https://doi.org/10.1016/j.jcp.2018.10.045
project_url: ''
category: pde_solving
motivation: 将PDE残差嵌入Loss实现无网格求解
```

#### 📝 一句话总结
PINN 的核心目标是：将PDE残差嵌入Loss实现无网格求解。

#### 🎯 核心要点
- 核心动机：将PDE残差嵌入Loss实现无网格求解
- 代表机构：布朗大学

#### 🔬 深入细节
将PDE残差嵌入Loss实现无网格求解


### HNN

```yaml
id: hnn
num: 6
name: HNN
full_name: 哈密顿神经网络 (Hamiltonian Neural Networks)
year: '2019'
org: Google
parent: —
paper_url: https://proceedings.neurips.cc/paper/2019/hash/26cd8ecadce0d4efd6cc8a8725cbd1f8-Abstract.html
project_url: ''
category: physics_constrained
motivation: 学习哈密顿量确保能量守恒
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

### XPINNs

```yaml
id: xpinns
num: 7
name: XPINNs
full_name: 扩展PINN (Extended Physics-Informed Neural Networks)
year: '2020'
org: 布朗大学
parent: pinn
paper_url: https://doi.org/10.4208/cicp.OA-2020-0164
project_url: ''
category: pde_solving
motivation: 域分解策略支持复杂几何并行化
```

#### 📝 一句话总结
XPINNs 的核心目标是：域分解策略支持复杂几何并行化。

#### 🎯 核心要点
- 核心动机：域分解策略支持复杂几何并行化
- 演化来源：继承或改进自 pinn
- 代表机构：布朗大学

#### 🔬 深入细节
域分解策略支持复杂几何并行化


### GNS

```yaml
id: gns
num: 8
name: GNS
full_name: 图网络模拟器 (Graph Network Simulators)
year: '2020'
org: DeepMind
parent: —
paper_url: https://proceedings.mlr.press/v119/sanchez-gonzalez20a.html
project_url: ''
category: fluid_simulation
motivation: 粒子图网络模拟流体与材料交互
```

#### 📝 一句话总结
GNS 的核心目标是：粒子图网络模拟流体与材料交互。

#### 🎯 核心要点
- 核心动机：粒子图网络模拟流体与材料交互
- 代表机构：DeepMind

#### 🔬 深入细节
粒子图网络模拟流体与材料交互


### MeshGraphNets

```yaml
id: meshgraphnets
num: 9
name: MeshGraphNets
full_name: 网格图网络 (Mesh Graph Networks)
year: '2020'
org: DeepMind
parent: gns
paper_url: https://arxiv.org/abs/2010.03409
project_url: ''
category: fluid_simulation
motivation: 针对欧拉网格的非结构化图网络
```

#### 📝 一句话总结
MeshGraphNets 的核心目标是：针对欧拉网格的非结构化图网络。

#### 🎯 核心要点
- 核心动机：针对欧拉网格的非结构化图网络
- 演化来源：继承或改进自 gns
- 代表机构：DeepMind

#### 🔬 深入细节
针对欧拉网格的非结构化图网络


### JAX MD

```yaml
id: jax_md
num: 10
name: JAX MD
full_name: JAX分子动力学 (JAX Molecular Dynamics)
year: '2020'
org: Google
parent: —
paper_url: https://proceedings.neurips.cc/paper/2020/hash/83d3d4b6c9579515e1679aca8cbc8033-Abstract.html
project_url: ''
category: fluid_simulation
motivation: 端到端可微分分子动力学引擎
```

#### 📝 一句话总结
JAX MD 的核心目标是：端到端可微分分子动力学引擎。

#### 🎯 核心要点
- 核心动机：端到端可微分分子动力学引擎
- 代表机构：Google

#### 🔬 深入细节
端到端可微分分子动力学引擎


### DiffTaichi

```yaml
id: difftaichi
num: 11
name: DiffTaichi
full_name: 可微分太极 (Differentiable Taichi)
year: '2020'
org: MIT
parent: —
paper_url: https://arxiv.org/abs/1910.00935
project_url: ''
category: fluid_simulation
motivation: 命令式可微分编程支持流体控制
```

#### 📝 一句话总结
DiffTaichi 的核心目标是：命令式可微分编程支持流体控制。

#### 🎯 核心要点
- 核心动机：命令式可微分编程支持流体控制
- 代表机构：MIT

#### 🔬 深入细节
命令式可微分编程支持流体控制


### PhiFlow

```yaml
id: phiflow
num: 12
name: PhiFlow
full_name: 流体物理库 (PhiFlow)
year: '2020'
org: 慕尼黑工大
parent: —
paper_url: https://github.com/tum-pbs/PhiFlow
project_url: ''
category: fluid_simulation
motivation: 开源可微分流体仿真库
```

#### 📝 一句话总结
PhiFlow 的核心目标是：开源可微分流体仿真库。

#### 🎯 核心要点
- 核心动机：开源可微分流体仿真库
- 代表机构：慕尼黑工大

#### 🔬 深入细节
开源可微分流体仿真库


### AI Feynman

```yaml
id: ai_feynman
num: 13
name: AI Feynman
full_name: AI费曼 (AI Feynman)
year: '2020'
org: MIT
parent: —
paper_url: https://www.science.org/doi/abs/10.1126/sciadv.aay2631
project_url: ''
category: physics_discovery
motivation: 物理对称性与递归分解发现公式
```

#### 📝 一句话总结
AI Feynman 的核心目标是：物理对称性与递归分解发现公式。

#### 🎯 核心要点
- 核心动机：物理对称性与递归分解发现公式
- 代表机构：MIT

#### 🔬 深入细节
物理对称性与递归分解发现公式


### UDE

```yaml
id: ude
num: 14
name: UDE
full_name: 通用微分方程 (Universal Differential Equations)
year: '2020'
org: Christopher Rackauckas
parent: neural_ode
paper_url: https://arxiv.org/abs/2001.04385
project_url: ''
category: physics_discovery
motivation: NN作为微分方程未知项补全物理
```

#### 📝 一句话总结
UDE 的核心目标是：NN作为微分方程未知项补全物理。

#### 🎯 核心要点
- 核心动机：NN作为微分方程未知项补全物理
- 演化来源：继承或改进自 neural_ode
- 代表机构：Christopher Rackauckas

#### 🔬 深入细节
NN作为微分方程未知项补全物理


### LNN

```yaml
id: lnn
num: 15
name: LNN
full_name: 拉格朗日神经网络 (Lagrangian Neural Networks)
year: '2020'
org: DeepMind
parent: hnn
paper_url: https://arxiv.org/abs/2003.04630
project_url: ''
category: physics_constrained
motivation: 学习拉格朗日量处理约束动力学
```

#### 📝 一句话总结
LNN 的核心目标是：学习拉格朗日量处理约束动力学。

#### 🎯 核心要点
- 核心动机：学习拉格朗日量处理约束动力学
- 演化来源：继承或改进自 hnn
- 代表机构：DeepMind

#### 🔬 深入细节
学习拉格朗日量处理约束动力学


### SympNets

```yaml
id: sympnets
num: 16
name: SympNets
full_name: 辛神经网络 (Symplectic Neural Networks)
year: '2020'
org: Pengzhan Jin
parent: hnn
paper_url: https://doi.org/10.1016/j.neunet.2020.08.028
project_url: ''
category: physics_constrained
motivation: 本质满足辛对称消除数值耗散
```

#### 📝 一句话总结
SympNets 的核心目标是：本质满足辛对称消除数值耗散。

#### 🎯 核心要点
- 核心动机：本质满足辛对称消除数值耗散
- 演化来源：继承或改进自 hnn
- 代表机构：Pengzhan Jin

#### 🔬 深入细节
本质满足辛对称消除数值耗散


### ParticleNet

```yaml
id: particlenet
num: 17
name: ParticleNet
full_name: 粒子网络 (ParticleNet)
year: '2020'
org: Huilin Qu
parent: —
paper_url: https://doi.org/10.1103/PhysRevD.101.056019
project_url: ''
category: quantum_particle
motivation: 粒子云动态图卷积提升喷注鉴别
```

#### 📝 一句话总结
ParticleNet 的核心目标是：粒子云动态图卷积提升喷注鉴别。

#### 🎯 核心要点
- 核心动机：粒子云动态图卷积提升喷注鉴别
- 代表机构：Huilin Qu

#### 🔬 深入细节
粒子云动态图卷积提升喷注鉴别


### hp-VPINNs

```yaml
id: hp_vpinns
num: 18
name: hp-VPINNs
full_name: 变分PINN (hp-Variational PINNs)
year: '2021'
org: 布朗大学
parent: pinn
paper_url: https://doi.org/10.1016/j.cma.2020.113533
project_url: ''
category: pde_solving
motivation: 变分形式与hp细化优化精度
```

#### 📝 一句话总结
hp-VPINNs 的核心目标是：变分形式与hp细化优化精度。

#### 🎯 核心要点
- 核心动机：变分形式与hp细化优化精度
- 演化来源：继承或改进自 pinn
- 代表机构：布朗大学

#### 🔬 深入细节
变分形式与hp细化优化精度


### FNO

```yaml
id: fno
num: 19
name: FNO
full_name: 傅里叶神经算子 (Fourier Neural Operator)
year: '2021'
org: Caltech
parent: —
paper_url: https://openreview.net/forum?id=c8P9fhUhn9
project_url: ''
category: pde_solving
motivation: 频率域积分运算实现分辨率无关
```

#### 📝 一句话总结
FNO 的核心目标是：频率域积分运算实现分辨率无关。

#### 🎯 核心要点
- 核心动机：频率域积分运算实现分辨率无关
- 代表机构：Caltech

#### 🔬 深入细节
频率域积分运算实现分辨率无关


### DeepONet

```yaml
id: deeponet
num: 20
name: DeepONet
full_name: 深度算子网络 (Deep Operator Network)
year: '2021'
org: 宾大
parent: —
paper_url: https://www.nature.com/articles/s42256-021-00302-5
project_url: ''
category: pde_solving
motivation: 双分支架构学习函数空间映射
```

#### 📝 一句话总结
DeepONet 的核心目标是：双分支架构学习函数空间映射。

#### 🎯 核心要点
- 核心动机：双分支架构学习函数空间映射
- 代表机构：宾大

#### 🔬 深入细节
双分支架构学习函数空间映射


### Brax

```yaml
id: brax
num: 21
name: Brax
full_name: JAX刚体引擎 (Brax)
year: '2021'
org: Google
parent: jax_md
paper_url: https://github.com/google/brax
project_url: ''
category: fluid_simulation
motivation: 高性能刚体动力学引擎
```

#### 📝 一句话总结
Brax 的核心目标是：高性能刚体动力学引擎。

#### 🎯 核心要点
- 核心动机：高性能刚体动力学引擎
- 演化来源：继承或改进自 jax_md
- 代表机构：Google

#### 🔬 深入细节
高性能刚体动力学引擎


### CANNs

```yaml
id: canns
num: 22
name: CANNs
full_name: 本构神经网络 (Constitutive Artificial Neural Networks)
year: '2021'
org: ETH Zurich
parent: —
paper_url: https://doi.org/10.1016/j.jcp.2020.109841
project_url: ''
category: solid_mechanics
motivation: 应变能密度嵌入确保本构稳定
```

#### 📝 一句话总结
CANNs 的核心目标是：应变能密度嵌入确保本构稳定。

#### 🎯 核心要点
- 核心动机：应变能密度嵌入确保本构稳定
- 代表机构：ETH Zurich

#### 🔬 深入细节
应变能密度嵌入确保本构稳定


### TANNs

```yaml
id: tanns
num: 23
name: TANNs
full_name: 热力学神经网络 (Thermodynamics-based ANNs)
year: '2021'
org: 希腊国立理工
parent: —
paper_url: https://doi.org/10.1016/j.jmps.2020.104277
project_url: ''
category: solid_mechanics
motivation: 强制热力学定律模拟粘塑性
```

#### 📝 一句话总结
TANNs 的核心目标是：强制热力学定律模拟粘塑性。

#### 🎯 核心要点
- 核心动机：强制热力学定律模拟粘塑性
- 代表机构：希腊国立理工

#### 🔬 深入细节
强制热力学定律模拟粘塑性


### EGNN

```yaml
id: egnn
num: 24
name: EGNN
full_name: 等变图神经网络 (Equivariant Graph Neural Networks)
year: '2021'
org: 阿姆斯特丹大学
parent: —
paper_url: https://proceedings.mlr.press/v139/satorras21a.html
project_url: ''
category: physics_constrained
motivation: 旋转平移反射等变保证物理一致
```

#### 📝 一句话总结
EGNN 的核心目标是：旋转平移反射等变保证物理一致。

#### 🎯 核心要点
- 核心动机：旋转平移反射等变保证物理一致
- 代表机构：阿姆斯特丹大学

#### 🔬 深入细节
旋转平移反射等变保证物理一致


### Noether Networks

```yaml
id: noether_nets
num: 25
name: Noether Networks
full_name: 诺特网络 (Noether Networks)
year: '2021'
org: MIT
parent: —
paper_url: https://proceedings.neurips.cc/paper/2021/hash/8e296a067a37563370ded05f5a3bf83e-Abstract.html
project_url: ''
category: physics_constrained
motivation: 基于诺特定理自动发现守恒量
```

#### 📝 一句话总结
Noether Networks 的核心目标是：基于诺特定理自动发现守恒量。

#### 🎯 核心要点
- 核心动机：基于诺特定理自动发现守恒量
- 代表机构：MIT

#### 🔬 深入细节
基于诺特定理自动发现守恒量


### gPINN

```yaml
id: gpinn
num: 26
name: gPINN
full_name: 梯度增强PINN (Gradient-enhanced PINN)
year: '2022'
org: 宾大
parent: pinn
paper_url: https://doi.org/10.1016/j.cma.2022.114823
project_url: ''
category: pde_solving
motivation: 引入残差梯度项提升陡峭解精度
```

#### 📝 一句话总结
gPINN 的核心目标是：引入残差梯度项提升陡峭解精度。

#### 🎯 核心要点
- 核心动机：引入残差梯度项提升陡峭解精度
- 演化来源：继承或改进自 pinn
- 代表机构：宾大

#### 🔬 深入细节
引入残差梯度项提升陡峭解精度


### Causal PINN

```yaml
id: causal_pinn
num: 27
name: Causal PINN
full_name: 因果PINN (Causal Physics-Informed Neural Networks)
year: '2022'
org: 宾大
parent: pinn
paper_url: https://arxiv.org/abs/2203.07404
project_url: ''
category: pde_solving
motivation: 时间因果律加权解决长时程收敛
```

#### 📝 一句话总结
Causal PINN 的核心目标是：时间因果律加权解决长时程收敛。

#### 🎯 核心要点
- 核心动机：时间因果律加权解决长时程收敛
- 演化来源：继承或改进自 pinn
- 代表机构：宾大

#### 🔬 深入细节
时间因果律加权解决长时程收敛


### PI-DeepONet

```yaml
id: pi_deeponet
num: 28
name: PI-DeepONet
full_name: 物理信息DeepONet (Physics-Informed DeepONet)
year: '2022'
org: 布朗大学
parent: deeponet
paper_url: https://link.springer.com/book/10.1007/978-3-031-36644-4
project_url: ''
category: pde_solving
motivation: 物理信息嵌入算子网络
```

#### 📝 一句话总结
PI-DeepONet 的核心目标是：物理信息嵌入算子网络。

#### 🎯 核心要点
- 核心动机：物理信息嵌入算子网络
- 演化来源：继承或改进自 deeponet
- 代表机构：布朗大学

#### 🔬 深入细节
物理信息嵌入算子网络


### Geo-FNO

```yaml
id: geo_fno
num: 29
name: Geo-FNO
full_name: 几何傅里叶算子 (Geometry-Adaptive FNO)
year: '2023'
org: Caltech
parent: fno
paper_url: https://jmlr.org/papers/v24/23-0064.html
project_url: ''
category: pde_solving
motivation: 可学习坐标变换支持非规则几何
```

#### 📝 一句话总结
Geo-FNO 通过学习一个可微的坐标变换将不规则物理域映射到规则计算域，使得 FFT 可以在计算域上高效执行，从而将 FNO 扩展到任意几何形状和非均匀网格上的 PDE 求解，比数值求解器快 \(10^5\) 倍，比直接插值方法精度提升约 2 倍。

#### 🎯 核心要点
- **可学习坐标变换**：学习微分同胚映射 \(\phi^{-1}: D_a \to D_c\)，将不规则物理域 \(D_a\) 映射到单位环面 \(D_c = [0,1]^d\)
- **几何傅里叶变换**：在计算域上定义正向/逆向几何傅里叶变换 \(\mathcal{F}_a, \mathcal{F}_a^{-1}\)，仅需 \(\phi^{-1}\) 即可完成双向变换
- **结构化网格特例**：当输入为结构化网格时，索引直接提供规范坐标映射，Geo-FNO 退化为标准 FNO
- **Fourier 延拓**：对拓扑不规则域（如含孔洞），先嵌入到更大的规则域再做变换，训练时仅在原域计算损失
- **变形网络设计**：采用残差连接 \(\xi = f(x,a) + x\)（初始化为恒等映射）+ 正弦特征提升表达力
- **多场景验证**：弹性力学（点云输入）、塑性锻造、跨声速翼型流动、弯管流动四类 PDE 问题
- **逆向设计能力**：训练后可端到端优化几何参数（如翼型形状），实现气动逆设计

#### 🔬 深入细节
##### 核心架构示意图

![Geo-FNO 架构图](https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x1.png)
*图：Geo-FNO 架构。(a) 标准 FNO 在规则域上操作；(b) Geo-FNO 通过坐标变换 \(\phi_a\) 将不规则物理域映射到规则计算域，在计算域上执行 FFT，再映射回物理域。*

![实验场景](https://ar5iv.labs.arxiv.org/html/2207.05209/assets/x2.png)
*图：弹性力学（含孔洞的单元胞）和塑性锻造问题示例。*

##### 算法伪代码

```python
# Geo-FNO 前向传播伪代码
def geo_fno_forward(x_phys, a, phi_inv_net, fno_layers, P, Q):
    """
    x_phys: 物理域网格点坐标 [N, d]
    a:      输入函数值（如几何参数、边界条件）[N, d_a]
    phi_inv_net: 变形网络 φ^{-1}
    """
    # Step 1: 坐标变换 — 物理域 → 计算域
    xi = phi_inv_net(x_phys, a)  # ξ = f(x, a) + x (残差连接)
    # xi 现在是 [0,1]^d 上的均匀网格

    # Step 2: 提升通道维度
    v = P(a)  # [N, d_a] → [N, d_v]

    # Step 3: L 层 Fourier 卷积（在计算域上）
    for l in range(L):
        # 几何傅里叶变换（首层用 F_a，中间层用标准 FFT）
        v_hat = FFT(v)                    # 在均匀计算网格上做 FFT
        v_hat = R_l @ v_hat               # 频域线性变换（截断高频）
        v_freq = IFFT(v_hat)              # 逆 FFT
        v_local = W_l @ v + b_l           # 局部线性变换
        v = activation(v_freq + v_local)  # 残差 + 激活

    # Step 4: 投影到输出空间
    u = Q(v)  # [N, d_v] → [N, d_u]

    # Step 5: 逆变换回物理域（通过 ξ → x 对应关系）
    return u  # 物理域上的解
```

##### 方法详解

**1. 动机与背景：FNO 的几何局限**

标准 Fourier Neural Operator (FNO) 通过在频域进行全局卷积来学习 PDE 的解算子，其核心优势在于利用 FFT 实现 \(O(N \log N)\) 的高效计算。然而，FFT 要求输入数据定义在**均匀网格**和**规则域**（如矩形/环面）上，这严重限制了 FNO 在实际工程问题中的应用——真实 PDE 问题通常涉及复杂几何（翼型、含孔洞结构等）和非均匀自适应网格。

现有的解决方案包括：(1) 将不规则域插值到规则网格再用 FNO，但插值引入额外误差；(2) 使用图神经网络（GNO）处理任意网格，但失去了频域全局卷积的效率优势。Geo-FNO 的核心洞察是：**与其改变算子，不如改变坐标系**。

> 💡 **关键直觉**：如果我们能找到一个光滑的坐标变换，把不规则的物理域"拉直"成规则的计算域，就可以在计算域上直接用 FFT，同时保持与物理域的精确对应关系。

**2. 核心机制：可微坐标变换**

Geo-FNO 的数学基础是微分同胚映射。定义坐标变换：

$$\phi_a: D^c \to D_a, \quad \xi \mapsto x$$

其中 \(D^c = [0,1]^d\) 是单位环面（计算域），\(D_a\) 是物理域。该映射将计算域上的均匀网格 \(\mathcal{T}^c\) 推前（pushforward）为物理域上的自适应网格：

$$\mathcal{T}_a \coloneqq \phi_a(\mathcal{T}^c), \quad \psi_a(x) \coloneqq \psi^c \circ \phi_a^{-1}(x)$$

对于物理域上的函数 \(v(x)\)，通过拉回（pullback）变换到计算域：

$$v^c(\xi) \coloneqq v(\phi_a(\xi))$$

**3. 几何傅里叶变换**

基于坐标变换，定义正向几何傅里叶变换：

$$(\mathcal{F}_a v)(k) = \int_{D^c} v^c(\xi) e^{-2i\pi \langle \xi, k \rangle} d\xi \approx \frac{1}{|\mathcal{T}^i|} \sum_{x \in \mathcal{T}^i} m(x) v(x) e^{-2i\pi \langle \phi^{-1}(x), k \rangle}$$

逆变换为：

$$(\mathcal{F}_a^{-1} \hat{v})(x) = \sum_k \hat{v}(k) e^{2i\pi \langle \phi^{-1}(x), k \rangle}$$

> ⚠️ **重要性质**：正向和逆向变换都只需要 \(\phi^{-1}\)（物理域→计算域方向），无需显式计算 \(\phi\)，这大大简化了实现。

当 \(\phi^{-1}\) 将输入网格映射为均匀网格时，权重 \(m(x) = 1\)，几何傅里叶变换退化为标准 FFT。

**4. 变形网络的设计**

变形网络 \(\phi_\theta^{-1}\) 将物理坐标和几何参数映射到计算坐标：

$$\phi_\theta^{-1}: (x_1, x_2, a) \mapsto (\xi_1, \xi_2)$$

关键设计选择：
- **残差连接**：\(\xi = f(x, a) + x\)，使 \(\phi^{-1}\) 初始化为恒等映射，训练更稳定
- **正弦位置编码**：使用 \(\sin(2^i x)\) 特征提升网络对高频几何细节的表达能力
- **端到端训练**：变形网络与 FNO 主体联合优化，损失函数为相对 L2 误差

**5. 两种使用场景**

| 场景 | 坐标映射方式 | 是否需要学习 | 示例 |
|------|-------------|-------------|------|
| 结构化网格 | 索引归一化：\(\phi^{-1}: \mathcal{T}^i[i_1,...,i_d] \mapsto (i_1/s_1,...,i_d/s_d)\) | 否 | 翼型、管道 |
| 点云/非结构网格 | 神经网络参数化 | 是 | 弹性力学 |

**6. Fourier 延拓处理拓扑不规则域**

当物理域拓扑不规则（如含孔洞，不同胚于圆盘或环面）时，不存在到 \(D^c\) 的微分同胚。此时 Geo-FNO 先将域嵌入更大的规则域 \(D_a \hookrightarrow \bar{D}_a\)（如将含孔方形补全为完整方形），在 \(\bar{D}_a\) 上做变换。训练时仅在原域 \(D_a\) 上计算损失，网络隐式学习延拓。

**7. 实验结果**

在弹性力学（点云输入）基准上，Geo-FNO 显著优于其他方法：

| 模型 | 测试误差 | 训练时间/epoch |
|------|---------|---------------|
| **Geo-FNO (learned)** | **2.29%** | 1s |
| Geo-FNO (O-mesh) | 3.63% | 0.5s |
| FNO + 插值 | 5.08% | 0.5s |
| UNet + 插值 | 5.31% | 0.9s |
| DeepONet | 9.65% | 45s |
| GNO | 12.60% | 32s |

在翼型和管道流动（结构化网格）上，Geo-FNO 同样优于插值方法（翼型测试误差 1.38% vs FNO+插值 4.21%）。推理速度约 0.01 秒/样本，比数值求解器快 \(10^5\) 倍。

> 💡 **关键发现**：学习到的变形比手工设计的启发式变形（R-mesh、O-mesh）更优，说明端到端学习坐标变换的有效性。训练后的 Geo-FNO 还可直接用于逆向设计——通过反向传播优化翼型形状参数以最小化阻力、最大化升力。

#### 🧪 练习题
```yaml
question: "Geo-FNO 中几何傅里叶变换的正向和逆向变换分别需要哪个方向的坐标映射？"
options:
  - "正向需要 φ（计算域→物理域），逆向需要 φ^{-1}（物理域→计算域）"
  - "正向和逆向都只需要 φ^{-1}（物理域→计算域）"
  - "正向和逆向都只需要 φ（计算域→物理域）"
  - "正向需要 φ^{-1}，逆向需要 φ，因此必须显式计算两个方向的映射"
answer: 1
explain: "论文的一个关键设计是正向变换 F_a 用 φ^{-1} 将输入函数拉回计算域，逆向变换 F_a^{-1} 用 φ^{-1} 将查询点映射到计算域以评估傅里叶基，因此只需定义 φ^{-1} 一个方向的映射。"
```

### U-NO

```yaml
id: uno
num: 30
name: U-NO
full_name: U形神经算子 (U-shaped Neural Operator)
year: '2023'
org: 布朗大学
parent: fno
paper_url: https://www.nature.com/articles/s41467-024-49411-w
project_url: ''
category: pde_solving
motivation: 多尺度结构捕捉全局与局部特征
```

#### 📝 一句话总结
U-NO 的核心目标是：多尺度结构捕捉全局与局部特征。

#### 🎯 核心要点
- 核心动机：多尺度结构捕捉全局与局部特征
- 演化来源：继承或改进自 fno
- 代表机构：布朗大学

#### 🔬 深入细节
多尺度结构捕捉全局与局部特征


### PySR

```yaml
id: pysr
num: 31
name: PySR
full_name: Python符号回归 (PySR)
year: '2023'
org: Miles Cranmer
parent: —
paper_url: https://arxiv.org/abs/2305.01582
project_url: ''
category: physics_discovery
motivation: 进化算法提取物理表达式
```

#### 📝 一句话总结
PySR 的核心目标是：进化算法提取物理表达式。

#### 🎯 核心要点
- 核心动机：进化算法提取物理表达式
- 代表机构：Miles Cranmer

#### 🔬 深入细节
进化算法提取物理表达式


### Poseidon

```yaml
id: poseidon
num: 32
name: Poseidon
full_name: PDE基础模型 (Poseidon)
year: '2024'
org: ETH Zurich
parent: fno
paper_url: https://arxiv.org/abs/2405.19101
project_url: ''
category: pde_solving
motivation: 首个大规模PDE基础模型
```

#### 📝 一句话总结
Poseidon 的核心目标是：首个大规模PDE基础模型。

#### 🎯 核心要点
- 核心动机：首个大规模PDE基础模型
- 演化来源：继承或改进自 fno
- 代表机构：ETH Zurich

#### 🔬 深入细节
首个大规模PDE基础模型


### Walrus

```yaml
id: walrus
num: 33
name: Walrus
full_name: 海象基础模型 (Walrus)
year: '2026'
org: Polymathic AI
parent: poseidon
paper_url: https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/
project_url: ''
category: pde_solving
motivation: 15TB数据训练跨领域物理基础模型
```

#### 📝 一句话总结
Walrus 的核心目标是：15TB数据训练跨领域物理基础模型。

#### 🎯 核心要点
- 核心动机：15TB数据训练跨领域物理基础模型
- 演化来源：继承或改进自 poseidon
- 代表机构：Polymathic AI

#### 🔬 深入细节
15TB数据训练跨领域物理基础模型


### Transolver-3

```yaml
id: transolver3
num: 34
name: Transolver-3
full_name: 超大规模求解器 (Transolver-3)
year: '2026'
org: 清华大学/NVIDIA
parent: fno
paper_url: https://arxiv.org/abs/2602.02414
project_url: ''
category: pde_solving
motivation: 几何切片技术支持1.6亿单元网格
```

#### 📝 一句话总结
Transolver-3 的核心目标是：几何切片技术支持1.6亿单元网格。

#### 🎯 核心要点
- 核心动机：几何切片技术支持1.6亿单元网格
- 演化来源：继承或改进自 fno
- 代表机构：清华大学/NVIDIA

#### 🔬 深入细节
几何切片技术支持1.6亿单元网格


### PF-PINO

```yaml
id: pf_pino
num: 35
name: PF-PINO
full_name: 相场物理神经算子 (Phase-Field PINO)
year: '2026'
org: arXiv
parent: fno
paper_url: https://arxiv.org/abs/2603.09693
project_url: ''
category: pde_solving
motivation: 相场方程残差提升长期稳定性
```

#### 📝 一句话总结
PF-PINO 的核心目标是：相场方程残差提升长期稳定性。

#### 🎯 核心要点
- 核心动机：相场方程残差提升长期稳定性
- 演化来源：继承或改进自 fno
- 代表机构：arXiv

#### 🔬 深入细节
相场方程残差提升长期稳定性


### PIKAN

```yaml
id: pikan
num: 36
name: PIKAN
full_name: KAN物理信息网络 (Physics-Informed KAN)
year: '2026'
org: ResearchGate
parent: pinn
paper_url: https://www.researchgate.net/publication/384994434
project_url: ''
category: pde_solving
motivation: KAN替代MLP增强高维处理能力
```

#### 📝 一句话总结
PIKAN 的核心目标是：KAN替代MLP增强高维处理能力。

#### 🎯 核心要点
- 核心动机：KAN替代MLP增强高维处理能力
- 演化来源：继承或改进自 pinn
- 代表机构：ResearchGate

#### 🔬 深入细节
KAN替代MLP增强高维处理能力


### FEDONet

```yaml
id: fedonet
num: 37
name: FEDONet
full_name: 傅里叶嵌入DeepONet (Fourier-embedded DeepONet)
year: '2026'
org: JCP
parent: deeponet
paper_url: https://www.sciencedirect.com/science/article/pii/S0021999126002846
project_url: ''
category: pde_solving
motivation: 嵌入傅里叶特征实现谱精度学习
```

#### 📝 一句话总结
FEDONet 的核心目标是：嵌入傅里叶特征实现谱精度学习。

#### 🎯 核心要点
- 核心动机：嵌入傅里叶特征实现谱精度学习
- 演化来源：继承或改进自 deeponet
- 代表机构：JCP

#### 🔬 深入细节
嵌入傅里叶特征实现谱精度学习


### FANO

```yaml
id: fano
num: 38
name: FANO
full_name: 傅里叶平流算子 (Fourier Advection Neural Operator)
year: '2026'
org: IEEE
parent: fno
paper_url: https://ieeexplore.ieee.org/abstract/document/11358915/
project_url: ''
category: fluid_simulation
motivation: 傅里叶平流机制用于天气预报
```

#### 📝 一句话总结
FANO 将描述大气输运的平流方程（advection equation）嵌入傅里叶神经算子（FNO）框架，利用 Fourier 谱方法在频域仅需一次 FFT/IFFT 即可高效求解平流过程，并通过守恒量、梯度和散度三类物理约束增强模型的物理一致性，在天气预报任务上超越传统 NWP 模型并媲美最先进的深度学习方法。

#### 🎯 核心要点
- **核心架构**：基于 FNO 框架，将平流方程的求解嵌入 Fourier 层，形成 Fourier Advection Layer
- **频域平流求解**：利用 Fourier 谱方法将平流方程 \(\partial u / \partial t + \mathbf{v} \cdot \nabla u = 0\) 转化为频域的逐点乘法，仅需单次 FFT + IFFT
- **速度场学习**：通过神经网络学习大气速度向量场 \(\mathbf{v}(x,t)\)，驱动频域平流算子
- **三类物理约束**：守恒量约束（conserved quantities）、梯度约束（gradient constraints）、散度约束（divergence constraints）
- **数据集**：基于 ERA5 再分析数据，涵盖多个大气变量（含海表温度 SST 等）
- **输入序列**：支持可变长度输入序列（input sequence length），捕获时间演化信息
- **性能**：超越传统 NWP 模型（如 IFS），与 Pangu-Weather、FourCastNet、GraphCast 等 SOTA 深度学习模型性能相当
- **效率**：保持 FNO 的计算效率优势，频域操作为 \(O(N \log N)\) 复杂度

#### 🔬 深入细节
##### 模型架构总览

![FANO 架构示意图](assets/fano_architecture.png)
*图：FANO 模型架构示意。输入大气状态经 Lifting 层映射到高维空间，在 Fourier 域通过 Spectral Advection 算子（基于学习的速度场）进行平流求解，叠加物理约束后经 Projection 层输出预测结果。*

##### 算法伪代码

```python
# FANO 前向传播伪代码
def FANO_forward(x_t, num_layers=N):
    """
    x_t: 输入大气状态张量 [B, C, H, W]，包含温度、风速、气压等变量
    """
    # Step 1: Lifting — 将输入映射到高维隐空间
    h = P(x_t)                          # h: [B, d_model, H, W]

    # Step 2: N 层 Fourier Advection Block
    for l in range(num_layers):
        # 2a. 学习速度场 v(x, t)
        v = VelocityNet_l(h)             # v: [B, 2, H, W] (2D velocity field)

        # 2b. FFT 变换到频域
        h_hat = FFT2(h)                  # h_hat: [B, d_model, K1, K2] (complex)

        # 2c. 频域平流算子 — 核心创新
        # 对于波数 k = (k1, k2)，平流方程的谱解为:
        #   h_hat_new[k] = h_hat[k] * exp(-i * (v · k) * Δt)
        # 等价于频域的逐点复数乘法
        phase_shift = compute_advection_phase(v, k_grid, dt)
        h_hat = h_hat * phase_shift      # point-wise multiplication

        # 2d. IFFT 回到物理域
        h_new = IFFT2(h_hat)             # h_new: [B, d_model, H, W]

        # 2e. 残差连接 + 非线性激活
        h = activation(h_new + h)

    # Step 3: Projection — 映射回物理变量空间
    x_pred = Q(h)                        # x_pred: [B, C, H, W]

    # Step 4: 物理约束损失
    L_conserve = conservation_loss(x_t, x_pred)   # 守恒量约束
    L_gradient = gradient_loss(x_pred)              # 梯度平滑约束
    L_diverge  = divergence_loss(x_pred)            # 散度约束
    L_total = L_data + λ1*L_conserve + λ2*L_gradient + λ3*L_diverge

    return x_pred, L_total
```

##### 动机与背景

天气预报是关系国计民生的核心科学问题。传统数值天气预报（NWP）模型通过求解描述大气运动的偏微分方程组（如 Navier-Stokes 方程、热力学方程等）来预测未来天气状态，代表性系统包括 ECMWF 的 IFS（Integrated Forecasting System）。然而，NWP 模型的计算成本极高——全球 0.25° 分辨率的 10 天预报通常需要数千 CPU 核心运行数小时。

近年来，深度学习方法在天气预报领域取得了突破性进展：

| 模型 | 机构 | 年份 | 核心方法 |
|------|------|------|----------|
| FourCastNet | NVIDIA | 2022 | AFNO (Adaptive Fourier Neural Operator) |
| Pangu-Weather | 华为 | 2023 | 3D Earth-Specific Transformer |
| GraphCast | DeepMind | 2023 | Graph Neural Network on mesh |
| FengWu | 上海 AI Lab | 2023 | Multi-modal Transformer |
| GenCast | DeepMind | 2024 | Diffusion model for ensemble |

这些模型虽然在推理速度上比 NWP 快数个数量级（秒级 vs 小时级），但普遍存在一个关键缺陷：**缺乏显式的物理约束**。它们本质上是纯数据驱动的黑盒模型，不保证预测结果满足基本的物理定律（如质量守恒、能量守恒），这限制了其在实际业务中的可靠性和可解释性。

FANO 的核心动机正是弥合这一鸿沟：**如何在保持深度学习计算效率的同时，将物理方程的约束显式嵌入模型架构？**

##### 核心机制：频域平流求解

**平流方程**是大气动力学中最基本的 PDE 之一，描述了物理量（如温度、湿度、污染物浓度）被风场输运的过程：

$$\frac{\partial u}{\partial t} + \mathbf{v} \cdot \nabla u = 0$$

其中 \(u(x, y, t)\) 是被输运的标量场，\(\mathbf{v} = (v_x, v_y)\) 是速度（风）场。

FANO 的关键洞察在于：**平流方程在 Fourier 域有优雅的解析解**。对上式做空间 Fourier 变换：

$$\frac{\partial \hat{u}_{\mathbf{k}}}{\partial t} + i(\mathbf{v} \cdot \mathbf{k}) \hat{u}_{\mathbf{k}} = 0$$

其中 \(\hat{u}_{\mathbf{k}}\) 是波数 \(\mathbf{k} = (k_x, k_y)\) 处的 Fourier 系数。对于局部常速度场，其解为：

$$\hat{u}_{\mathbf{k}}(t + \Delta t) = \hat{u}_{\mathbf{k}}(t) \cdot \exp\left(-i (\mathbf{v} \cdot \mathbf{k}) \Delta t\right)$$

> 💡 **关键洞察**：平流方程在频域退化为**逐点复数乘法**（point-wise multiplication），这与 FNO 中 Fourier 层的操作形式天然一致！标准 FNO 的 Fourier 层执行 \(\hat{u}_{\mathbf{k}}' = R_{\mathbf{k}} \cdot \hat{u}_{\mathbf{k}}\)，其中 \(R_{\mathbf{k}}\) 是可学习的复数权重矩阵。FANO 将 \(R_{\mathbf{k}}\) 替换为物理驱动的相位旋转因子 \(\exp(-i(\mathbf{v} \cdot \mathbf{k})\Delta t)\)，从而将 FNO 的频域操作赋予了明确的物理含义。

这种设计的计算优势显著：整个平流求解过程仅需**一次 FFT + 频域逐点乘法 + 一次 IFFT**，时间复杂度为 \(O(N \log N)\)，与标准 FNO 相同，远低于有限差分法的迭代求解。

##### 速度场学习

与传统 NWP 中速度场由风速观测直接给出不同，FANO 通过一个子网络 \(\text{VelocityNet}(\cdot)\) 从当前大气状态中**学习**速度向量场 \(\mathbf{v}(x, y, t)\)。这使得模型能够：

1. **自适应捕获有效输运速度**：学到的速度场不仅包含显式风速，还可能编码其他隐式输运机制（如波动传播、对流参数化效应）
2. **处理多尺度动力学**：不同 Fourier Advection Layer 可以学习不同尺度的速度场，分别捕获大尺度环流和中小尺度扰动

##### 物理约束体系

FANO 嵌入三类物理约束作为正则化损失：

**1. 守恒量约束（Conservation Loss）**

大气中的总质量、总能量等物理量在封闭系统中应守恒。FANO 通过约束预测场的全局积分来近似实现：

$$\mathcal{L}_{\text{conserve}} = \left\| \int_{\Omega} x_{t+\Delta t} \, d\Omega - \int_{\Omega} x_t \, d\Omega \right\|^2$$

在离散网格上，这等价于约束预测场与输入场的全局均值一致，对应 Fourier 系数的零频分量 \(\hat{u}_{\mathbf{0}}\) 不变。

**2. 梯度约束（Gradient Loss）**

确保预测场的空间梯度合理，避免出现非物理的剧烈跳变：

$$\mathcal{L}_{\text{gradient}} = \left\| \nabla x_{t+\Delta t} \right\|_{\text{reg}}$$

这有助于保持天气场的空间平滑性，抑制 Gibbs 现象等频域方法的常见伪影。

**3. 散度约束（Divergence Loss）**

对于近似不可压缩的大气流动，速度场应满足连续性方程的约束：

$$\mathcal{L}_{\text{diverge}} = \left\| \nabla \cdot \mathbf{v} \right\|^2$$

> ⚠️ **注意**：散度约束施加在学习到的速度场上而非预测的大气状态上，确保平流输运过程本身的物理合理性。

总损失函数为：

$$\mathcal{L} = \mathcal{L}_{\text{data}} + \lambda_1 \mathcal{L}_{\text{conserve}} + \lambda_2 \mathcal{L}_{\text{gradient}} + \lambda_3 \mathcal{L}_{\text{diverge}}$$

##### 与传统方法的对比

| 特性 | 传统 NWP (IFS) | 标准 FNO | FANO |
|------|---------------|----------|------|
| 物理方程 | 完整 PDE 组 | 无显式物理 | 平流方程 |
| 求解方式 | 有限差分/谱方法迭代 | 数据驱动学习 | Fourier 谱方法 (解析) |
| 计算复杂度 | 极高 (小时级) | 低 (秒级) | 低 (秒级) |
| 物理约束 | 内建 | 无 | 守恒+梯度+散度 |
| 频域操作含义 | — | 可学习滤波器 | 物理驱动相位旋转 |
| 可解释性 | 高 | 低 | 中-高 |

FANO 相比标准 FNO 的核心改进在于：将 Fourier 层中的**任意可学习复数权重**替换为**物理驱动的平流算子**，使频域操作具有明确的物理含义（相位旋转 = 空间平移 = 大气输运），同时通过物理约束损失进一步增强预测的物理一致性。

##### 实验设置与结果

论文基于 ERA5 再分析数据集进行实验，该数据集由 ECMWF 提供，覆盖全球 0.25° 分辨率的多层大气变量。实验涵盖多个关键气象变量的预测，包括：
- 位势高度（Geopotential, Z500）
- 温度（Temperature, T850）
- 海表温度（Sea Surface Temperature, SST）
- 风速分量（U/V wind components）

实验结果表明：
1. **超越传统 NWP**：在多个变量和预报时效上，FANO 的 RMSE/ACC 指标优于 IFS 等传统模型
2. **媲美 SOTA DL**：与 Pangu-Weather、FourCastNet 等最先进深度学习模型性能相当
3. **物理一致性更强**：物理约束有效减少了非物理预测（如质量不守恒、梯度异常）
4. **计算高效**：保持了 FNO 框架的推理速度优势

#### 🧪 练习题
```yaml
question: "FANO 将平流方程嵌入 FNO 框架的关键在于，平流方程在 Fourier 域的解具有什么特殊形式？"
options:
  - "卷积运算，需要多次迭代求解"
  - "逐点复数乘法（相位旋转），可一步求解"
  - "矩阵求逆运算，需要特征值分解"
  - "非线性激活函数变换，需要反向传播"
answer: 1
explain: "平流方程在 Fourier 域的解为 û_k(t+Δt) = û_k(t)·exp(-i(v·k)Δt)，即逐点复数乘法（相位旋转），这与 FNO 的 Fourier 层操作形式天然一致，仅需单次 FFT+IFFT 即可完成。"
```

### PhysicsNeMo

```yaml
id: physicsnemo
num: 39
name: PhysicsNeMo
full_name: 物理AI框架 (PhysicsNeMo)
year: '2026'
org: NVIDIA
parent: —
paper_url: https://www.nvidia.com/en-us/ai-data-science/physics-nemo/
project_url: ''
category: fluid_simulation
motivation: 开源物理AI产业化仿真框架
```

#### 📝 一句话总结
PhysicsNeMo 的核心目标是：开源物理AI产业化仿真框架。

#### 🎯 核心要点
- 核心动机：开源物理AI产业化仿真框架
- 代表机构：NVIDIA

#### 🔬 深入细节
开源物理AI产业化仿真框架


### SIMPLE-PINN

```yaml
id: simple_pinn
num: 40
name: SIMPLE-PINN
full_name: SIMPLE算法PINN (SIMPLE-PINN)
year: '2026'
org: arXiv
parent: pinn
paper_url: https://arxiv.org/abs/2603.24013
project_url: ''
category: fluid_simulation
motivation: SIMPLE算法与PINN融合求解NS方程
```

#### 📝 一句话总结
SIMPLE-PINN 的核心目标是：SIMPLE算法与PINN融合求解NS方程。

#### 🎯 核心要点
- 核心动机：SIMPLE算法与PINN融合求解NS方程
- 演化来源：继承或改进自 pinn
- 代表机构：arXiv

#### 🔬 深入细节
SIMPLE算法与PINN融合求解NS方程


### FE-PINNs

```yaml
id: fe_pinns
num: 41
name: FE-PINNs
full_name: 有限元PINN (Finite-Element-based PINNs)
year: '2026'
org: APL Machine Learning
parent: canns
paper_url: https://pubs.aip.org/aip/aml/article/4/1/016106/3379950
project_url: ''
category: solid_mechanics
motivation: 有限元基函数实现网格无关建模
```

#### 📝 一句话总结
FE-PINNs 的核心目标是：有限元基函数实现网格无关建模。

#### 🎯 核心要点
- 核心动机：有限元基函数实现网格无关建模
- 演化来源：继承或改进自 canns
- 代表机构：APL Machine Learning

#### 🔬 深入细节
有限元基函数实现网格无关建模


### AION-1

```yaml
id: aion1
num: 42
name: AION-1
full_name: 天文基础模型 (AION-1)
year: '2026'
org: Flatiron Institute
parent: —
paper_url: https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/
project_url: ''
category: physics_constrained
motivation: 31亿参数统一39种观测模态
```

#### 📝 一句话总结
AION-1 的核心目标是：31亿参数统一39种观测模态。

#### 🎯 核心要点
- 核心动机：31亿参数统一39种观测模态
- 代表机构：Flatiron Institute

#### 🔬 深入细节
31亿参数统一39种观测模态


### Momentum-GNN

```yaml
id: momentum_gnn
num: 43
name: Momentum-GNN
full_name: 动量守恒图网络 (Momentum-conserving GNN)
year: '2026'
org: Nature Communications
parent: egnn
paper_url: https://www.nature.com/articles/s41467-025-67802-5
project_url: ''
category: physics_constrained
motivation: 严格线性角动量守恒防止能量漂移
```

#### 📝 一句话总结
DYNAMI-CAL GraphNet 提出了一种物理约束的等变图神经网络，通过在边局部参考系中解码反对称力与力矩（\(\vec{F}_{ij}=-\vec{F}_{ji}\), \(\vec{A}_{ij}=-\vec{A}_{ji}\)），从架构层面严格保证线性动量和角动量守恒，解决了现有等变 GNN（如 EGNN、GMN）因消息不对称导致的动量漂移问题，并在颗粒碰撞、N 体动力学、人体运动、蛋白质分子动力学等六类任务上展现了卓越的长程稳定性与外推能力。

#### 🎯 核心要点
- **边局部参考系**：为每条边 \(ij\) 构建三个正交基向量 \(\vec{a}_{ij}, \vec{b}_{ij}, \vec{c}_{ij}\)，满足 SO(3) 等变、T(3) 不变、节点交换反对称
- **反对称力解码**：力 \(\vec{F}_{ij} = \sum_k \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[k] \cdot \text{basis}_k\)，由于基向量反对称，自动满足牛顿第三定律 \(\vec{F}_{ij} = -\vec{F}_{ji}\)，严格保守线性动量
- **反对称力矩解码**：角动量交互向量 \(\vec{A}_{ij} = -\vec{A}_{ji}\)，通过分离轨道分量得到自旋力矩，严格保守总角动量（轨道 + 自旋）
- **时空消息传递**：边嵌入通过 skip 连接跨时间步传递记忆，结合隐式 Euler 积分实现时空一致性
- **Ghost 节点边界建模**：通过反射生成 ghost 节点处理无网格边界，无需重新训练即可适配不同几何形状
- **六类基准验证**：颗粒 6-DoF 碰撞、动量守恒测试、旋转 hopper 外推（60→2073 球、平面→曲面）、约束 N 体、人体运动预测、蛋白质分子动力学

#### 🔬 深入细节
##### 核心架构示意图

![DYNAMI-CAL GraphNet 架构总览](https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41467-025-67802-5/MediaObjects/41467_2025_67802_Fig1_HTML.png)

*图：DYNAMI-CAL GraphNet 的完整流程——从图构建、边局部参考系、反对称力/力矩解码到节点状态更新。核心创新在于边消息的物理约束设计，确保牛顿第三定律在架构层面被严格满足。*

##### 算法伪代码

```python
# DYNAMI-CAL GraphNet 单步前向传播
def forward(graph_t, edge_memory_prev):
    # === 1. 编码 ===
    h_i = φ_node(node_features_i)          # 节点标量嵌入
    
    # === 2. 边局部参考系构建 ===
    for edge (i, j) in graph:
        d_ij = r_j - r_i                    # 位移向量
        v_ij = v_j - v_i                    # 相对速度
        a_ij = d_ij / ||d_ij||              # 第一基向量（沿连线）
        c_ij = d_ij × v_ij                  # 第三基向量（叉积）
        c_ij = c_ij / ||c_ij||
        b_ij = c_ij × a_ij                  # 第二基向量（右手系）
        # 关键性质: a_ij = -a_ji, b_ij = -b_ji, c_ij = -c_ji
    
    # === 3. 边嵌入 + 时空消息传递 ===
    for edge (i, j):
        inv_features = [||d_ij||, d_ij·v_ij, ...]  # 不变量特征
        ε_ij = φ_edge(h_i, h_j, inv_features)
        ε_ij = ε_ij + skip_connection(edge_memory_prev[i,j])  # 时间记忆
        ε'_ij = MLP_interaction(ε_ij)       # 交互嵌入
    
    # === 4. 反对称力解码（线性动量守恒）===
    for edge (i, j):
        coeffs_f = ψ_ef(ε'_ij)              # 3个标量系数
        F_ij = coeffs_f[0]*a_ij + coeffs_f[1]*b_ij + coeffs_f[2]*c_ij
        # 自动满足 F_ij = -F_ji（因基向量反对称）
    
    # === 5. 反对称力矩解码（角动量守恒）===
    for edge (i, j):
        coeffs_a = ψ_ea(ε'_ij)              # 3个标量系数
        A_ij = coeffs_a[0]*a_ij + coeffs_a[1]*b_ij + coeffs_a[2]*c_ij
        # A_ij = -A_ji（总角动量交互反对称）
        
        # 对称参考点
        w_i, w_j = ψ_n1(h_i), ψ_n1(h_j)
        r0_ij = (w_i * r_i + w_j * r_j) / (w_i + w_j)  # r0_ij = r0_ji
        
        # 分离自旋力矩
        λ_ij = ψ_el(ε'_ij)                  # 稳定性标量
        M_ij = A_ij - (r_j - r0_ij) × F_ij * λ_ij  # I_j·Δω_j
    
    # === 6. 聚合 + 节点更新 ===
    for node i:
        ΔF_total = Σ_j F_ij                 # 合力
        ΔM_total = Σ_j M_ij                 # 合力矩
        Δv_i = ψ_n2(h_i) * ΔF_total         # 1/m_i · ΣF
        Δω_i = ψ_n3(h_i) * ΔM_total         # 1/I_i · ΣM
        Δv_ext = ψ_n4(h_i)                  # 外力（如重力）
        
        v_new = v_i + Δv_i + Δv_ext
        ω_new = ω_i + Δω_i
        x_new = x_i + (v_i + v_new)/2 * Δt  # 梯形积分
    
    return graph_t+1, edge_memory_current
```

##### 方法深入解析

**1. 动机与背景：等变 GNN 的动量漂移问题**

现有等变 GNN（如 EGNN、GMN、ClofNet）虽然保证了 SE(3) 等变性，但**不保证动量守恒**。根本原因在于：这些模型的边消息 \(m_{ij} \neq m_{ji}\)（或虽然力等变但不反对称），导致节点 \(i\) 对 \(j\) 施加的"力"与 \(j\) 对 \(i\) 的"力"不满足牛顿第三定律。在长程自回归推理中，这种微小的不对称性会累积，造成系统总动量漂移，最终导致物理不一致甚至轨迹发散。

> 💡 **关键洞察**：等变性（输出随输入旋转而旋转）≠ 守恒性（系统总量不变）。DYNAMI-CAL GraphNet 的核心贡献是**在保持等变性的同时，从架构层面强制守恒**。

**2. 核心机制一：边局部参考系**

对每条边 \(ij\)，利用位移向量 \(\vec{d}_{ij} = \vec{r}_j - \vec{r}_i\) 和相对速度 \(\vec{v}_{ij} = \vec{v}_j - \vec{v}_i\) 构建正交基：

$$\vec{a}_{ij} = \frac{\vec{d}_{ij}}{\|\vec{d}_{ij}\|}, \quad \vec{c}_{ij} = \frac{\vec{d}_{ij} \times \vec{v}_{ij}}{\|\vec{d}_{ij} \times \vec{v}_{ij}\|}, \quad \vec{b}_{ij} = \vec{c}_{ij} \times \vec{a}_{ij}$$

这组基向量具有三个关键性质：
- **SO(3) 等变**：全局旋转 \(R\) 作用时，\(\vec{a}_{ij} \to R\vec{a}_{ij}\)
- **T(3) 不变**：平移不改变相对位移和相对速度
- **节点交换反对称**：\(\vec{a}_{ij} = -\vec{a}_{ji}\)，\(\vec{b}_{ij} = -\vec{b}_{ji}\)，\(\vec{c}_{ij} = -\vec{c}_{ji}\)

> ⚠️ **注意**：反对称性是守恒的关键——当 \(\vec{d}_{ij}\) 变为 \(\vec{d}_{ji} = -\vec{d}_{ij}\) 时，叉积 \(\vec{d}_{ji} \times \vec{v}_{ji} = (-\vec{d}_{ij}) \times (-\vec{v}_{ij}) = \vec{d}_{ij} \times \vec{v}_{ij}\)，但归一化后 \(\vec{a}_{ji} = -\vec{a}_{ij}\)，进而 \(\vec{b}_{ji} = \vec{c}_{ji} \times \vec{a}_{ji} = (-\vec{c}_{ij}) \times (-\vec{a}_{ij}) = ... = -\vec{b}_{ij}\)。

**3. 核心机制二：反对称力与线性动量守恒**

力通过不变标量系数调制反对称基向量来解码：

$$\vec{F}_{ij} = \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[0] \cdot \vec{a}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[1] \cdot \vec{b}_{ij} + \psi_{e_f}(\boldsymbol{\epsilon}'_{ij})[2] \cdot \vec{c}_{ij}$$

由于边嵌入 \(\boldsymbol{\epsilon}'_{ij}\) 仅依赖不变量（距离、内积等），对称边 \(ij\) 和 \(ji\) 产生相同的标量系数，但基向量反号，因此：

$$\vec{F}_{ij} = -\vec{F}_{ji} \quad \Longrightarrow \quad \sum_{i} \Delta \vec{p}_i = \sum_{i} \sum_{j \in \mathcal{N}(i)} \vec{F}_{ij} = 0$$

这就是牛顿第三定律的架构级实现，**无需任何正则化或后处理**即可严格保证线性动量守恒。

**4. 核心机制三：角动量守恒的力矩解码**

角动量守恒更为复杂，因为总角动量 = 轨道角动量 + 自旋角动量。论文定义边 \(ij\) 的总角动量交互向量：

$$\vec{A}_{ij} = I_i(\vec{\omega}_i^{t+\Delta t} - \vec{\omega}_i^t) + (\vec{r}_i - \vec{r}_0) \times m_i(\vec{v}_i^{t+\Delta t} - \vec{v}_i^t)$$

同样通过反对称基向量解码，确保 \(\vec{A}_{ij} = -\vec{A}_{ji}\)。然后通过对称参考点 \(\vec{r}_{0_{ij}}\) 分离自旋分量：

$$I_j \cdot \Delta\vec{\omega}_j = \vec{A}_{ij} - (\vec{r}_j - \vec{r}_{0_{ij}}) \times \vec{F}_{ij} \cdot \lambda_{ij}$$

其中 \(\vec{r}_{0_{ij}} = \frac{\psi_{n1}(h_i) \cdot \vec{r}_i + \psi_{n1}(h_j) \cdot \vec{r}_j}{\psi_{n1}(h_i) + \psi_{n1}(h_j)}\) 在节点交换下保持不变（\(\vec{r}_{0_{ij}} = \vec{r}_{0_{ji}}\)），\(\lambda_{ij}\) 是稳定性标量，防止微小噪声力产生不合理的大力矩。

**5. 时空消息传递与边记忆**

传统 GNN 每步独立处理图，丢失了时间连贯性。DYNAMI-CAL GraphNet 通过 **skip 连接**将上一时间步的边嵌入传递到当前步：

$$\boldsymbol{\epsilon}_{ij}^{(t)} = \phi_{\text{edge}}(\text{features}_{ij}^{(t)}) + W_{\text{skip}} \cdot \boldsymbol{\epsilon}_{ij}^{(t-1)}$$

这使得模型能够捕捉碰撞前后的时间相关性，类似于 RNN 的隐状态但作用在边上。配合隐式 Euler 积分（使用更新后的速度计算位移），提高了数值稳定性。

**6. Ghost 节点：无网格边界处理**

对于边界（如墙壁），论文提出将每个靠近边界的粒子关于边界面反射，生成 ghost 节点。Ghost 节点继承边界属性（如零速度、边界标识符），与原始粒子之间建立边连接。这种方法：
- 无需显式编码边界几何
- 可推广到任意形状（平面、曲面）
- 训练时用平面墙，测试时可直接迁移到旋转圆柱 hopper

**7. 与 EGNN/GMN 的关键区别**

| 特性 | EGNN | GMN | DYNAMI-CAL GraphNet |
|------|------|-----|---------------------|
| 等变性 | E(n) | E(n) | SE(3) |
| 消息对称性 | \(m_{ij} \neq m_{ji}\) | \(m_{ij} \neq m_{ji}\) | \(\vec{F}_{ij} = -\vec{F}_{ji}\) |
| 线性动量守恒 | ✗ | ✗ | ✓（严格） |
| 角动量守恒 | ✗ | ✗ | ✓（严格） |
| 旋转动力学 | 不支持 | 不支持 | 6-DoF（平动+转动） |
| 时间记忆 | 无 | 无 | 边 skip 连接 |

> 💡 **为什么 EGNN 不守恒？** EGNN 的位置更新 \(\vec{x}_i' = \vec{x}_i + \sum_j (\vec{x}_i - \vec{x}_j) \phi(m_{ij})\) 中，\(\phi(m_{ij})\) 是标量但 \(m_{ij} \neq m_{ji}\)（因为消息聚合依赖节点特征），所以 \(i\) 对 \(j\) 的"推力"与 \(j\) 对 \(i\) 的不等，总动量不守恒。

**8. 实验亮点**

- **旋转 hopper 外推**：仅用 60 球 + 平面墙训练，成功预测 2073 球 + 旋转曲面墙的 16000 步演化，GNS 在早期即发散
- **动量守恒验证**：两球斜碰实验中，DYNAMI-CAL GraphNet 精确保守所有分量的线性和角动量，GNS 和 EGNN 均出现明显漂移
- **蛋白质 MD**：在 NPT 系综（300K, 1 bar）条件下准确预测蛋白质构象动力学

#### 🧪 练习题
```yaml
question: "DYNAMI-CAL GraphNet 如何从架构层面保证牛顿第三定律 F_ij = -F_ji？"
options:
  - "在损失函数中添加 ||F_ij + F_ji||² 正则化项"
  - "使用节点交换反对称的边局部基向量，乘以对称的标量系数来解码力"
  - "对每条边的消息取平均值 (m_ij + m_ji)/2 作为对称消息"
  - "在后处理阶段将力投影到反对称子空间"
answer: 1
explain: "DYNAMI-CAL GraphNet 构建的边局部参考系基向量满足 a_ij=-a_ji, b_ij=-b_ji, c_ij=-c_ji，而标量系数由不变量嵌入产生（ij 和 ji 相同），因此力 F_ij = Σ coeff_k · basis_k 自动满足 F_ij = -F_ji，无需正则化或后处理。"
```
