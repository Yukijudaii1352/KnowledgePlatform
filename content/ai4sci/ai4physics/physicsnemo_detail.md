### PhysicsNeMo — 物理AI框架 (PhysicsNeMo)

```yaml
id: physicsnemo
name: PhysicsNeMo
full_name: 物理AI框架 (PhysicsNeMo)
year: '2026'
org: NVIDIA
paper_url: https://www.nvidia.com/en-us/ai-data-science/physics-nemo/
category: fluid_simulation
parent: —
motivation: 开源物理AI产业化仿真框架
```

#### 📝 一句话总结

PhysicsNeMo 不是单个网络结构，而是 NVIDIA 面向 Physics AI 的开源 PyTorch 框架：它把神经算子、GNN、Transformer、扩散模型、PINN/PINO、工程数据管线、分布式训练和 PDE 残差工具组合成可复用的工业仿真代理建模栈。

#### 🎯 核心要点

- **框架而非单篇论文算法**：任务给出的链接是 NVIDIA 官方项目页；方法解读基于官方文档、GitHub README 与示例，而不是某篇独立论文
- **模块化组件**：`physicsnemo.models` 提供模型族，`physicsnemo.datapipes` 处理网格/点云/场数据，`physicsnemo.distributed` 封装多 GPU/多节点训练，`physicsnemo.sym` 负责符号 PDE 与 physics loss
- **模型覆盖面广**：包含 FNO/AFNO/DeepONet/PINO、MeshGraphNet/GraphCast、DoMINO/XAeroNet、Transolver、扩散模型、PINN 和多种天气/CFD/结构力学模型
- **物理约束一等公民**：通过 `PDE` 子类和 `PhysicsInformer` 把连续方程残差、边界条件、数据监督项统一进 PyTorch loss
- **多种导数计算方式**：PhysicsInformer 支持 autodiff、finite difference、meshless finite difference、spectral、least squares 等梯度/残差计算路径
- **工程数据结构适配**：官方示例覆盖 Darcy flow、lid-driven cavity、vortex shedding、external aerodynamics、GraphCast 天气预测、分子动力学、结构力学等场景
- **可扩展训练与部署**：与 PyTorch 原生训练循环兼容，支持分布式训练、checkpoint/logging、ONNX 导出和领域包如 PhysicsNeMo CFD、Earth-2 Studio、PhysicsNeMo Curator

#### 🔬 深入细节

##### 可访问来源与核心示意图

`paper_url` 指向 NVIDIA PhysicsNeMo 官方介绍页，未对应一篇传统论文。本文以 NVIDIA 官方文档 https://docs.nvidia.com/physicsnemo/latest/overview.html、GitHub 仓库 https://github.com/NVIDIA/physicsnemo、Physics-guided 文档 https://docs.nvidia.com/physicsnemo/latest/user-guide/physics_addition.html 和 PINN 教程 https://docs.nvidia.com/physicsnemo/26.05/user-guide/pinns-tutorials/index.html 为来源；因此这里解读的是“框架级方法栈”，不是单个模型的封闭算法。

![PhysicsNeMo knowledge-guided models](https://raw.githubusercontent.com/NVIDIA/physicsnemo/main/docs/img/value_prop/Knowledge_guided_models.gif)
*图：NVIDIA PhysicsNeMo README 中的 knowledge-guided models 示意图。PhysicsNeMo 的核心定位是把数据、物理约束和可扩展深度学习模块放在同一训练/推理管线中。*

##### 框架训练伪代码

```python
# PhysicsNeMo physics-guided training pipeline, simplified
from physicsnemo.distributed import DistributedManager
from physicsnemo.models.fno import FNO
from physicsnemo.sym.eq.phy_informer import PhysicsInformer
from my_equations import NavierStokes2D

DistributedManager.initialize()
dist = DistributedManager()

model = FNO(in_channels=..., out_channels=...).to(dist.device)
pde = NavierStokes2D(nu=nu, rho=rho)  # physicsnemo.sym.eq.pde.PDE subclass
informer = PhysicsInformer(
    required_outputs=["continuity", "momentum_x", "momentum_y"],
    equations=pde,
    grad_method="autodiff",  # or finite_difference / spectral / least_squares
    device=dist.device,
)

for batch in datapipe:
    inputs = batch["coords_or_fields"].to(dist.device)
    target = batch.get("target")

    pred = model(inputs)
    losses = {}

    if target is not None:
        losses["data"] = mean_squared_error(pred, target)

    residuals = informer.forward({"x": inputs[..., 0], "y": inputs[..., 1]}, pred)
    losses["continuity"] = mean(residuals["continuity"] ** 2)
    losses["momentum_x"] = mean(residuals["momentum_x"] ** 2)
    losses["momentum_y"] = mean(residuals["momentum_y"] ** 2)

    loss = sum(loss_weight[name] * value for name, value in losses.items())
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

export_to_onnx_or_checkpoint(model)
```

##### 方法机制解释

PhysicsNeMo 的关键不是提出某个新的 PDE 求解公式，而是把 Physics AI 的常见构件做成可组合的工程抽象。传统 SciML 项目通常需要研究者自己处理模型实现、网格/点云数据读取、残差求导、分布式训练、日志、checkpoint 和部署接口；PhysicsNeMo 把这些拆成模块，使同一套训练循环可以在 FNO、MeshGraphNet、Transolver、PINN 或混合 physics-guided 模型之间复用。

一个典型 PhysicsNeMo 任务可以写成加权经验风险：

$$
\mathcal{L}(\theta)
=
\lambda_{\mathrm{data}}\mathcal{L}_{\mathrm{data}}
+
\sum_{k}\lambda_k
\left\|
\mathcal{R}_k[u_\theta; a]
\right\|_2^2
+
\lambda_{\mathrm{bc}}\mathcal{L}_{\mathrm{bc}},
$$

其中 \(u_\theta\) 是神经网络预测的场变量，\(a\) 可以是初始条件、边界条件、几何、材料参数或网格特征；\(\mathcal{R}_k\) 是由 PDE、守恒律或约束产生的残差。对于不可压 Navier-Stokes，一个常见 residual 形式为：

$$
\mathcal{R}_{c}
=
\frac{\partial u}{\partial x}
+
\frac{\partial v}{\partial y},
$$

$$
\mathcal{R}_{x}
=
\frac{\partial u}{\partial t}
+
u\frac{\partial u}{\partial x}
+
v\frac{\partial u}{\partial y}
+
\frac{1}{\rho}\frac{\partial p}{\partial x}
-
\nu
\left(
\frac{\partial^2 u}{\partial x^2}
+
\frac{\partial^2 u}{\partial y^2}
\right),
$$

$$
\mathcal{R}_{y}
=
\frac{\partial v}{\partial t}
+
u\frac{\partial v}{\partial x}
+
v\frac{\partial v}{\partial y}
+
\frac{1}{\rho}\frac{\partial p}{\partial y}
-
\nu
\left(
\frac{\partial^2 v}{\partial x^2}
+
\frac{\partial^2 v}{\partial y^2}
\right).
$$

`physicsnemo.sym` 的作用是把这些符号方程转换为训练时可计算的 residual。用户定义 `PDE`，指定输出变量和 `grad_method`，`PhysicsInformer` 根据模型输出自动构造计算图或有限差分/谱方法求导。这样做的优势是训练脚本仍然是普通 PyTorch 代码，但 PDE residual 不需要手写大量微分张量索引。

从数据结构看，PhysicsNeMo 同时服务规则网格、非结构网格、图、点云和多尺度天气网格。神经算子类模型适合规则场到场映射，例如 Darcy flow 或天气预测；MeshGraphNet 类模型适合非结构网格上的流固仿真；Transformer/Transolver 类模型适合点集或复杂几何上的长程相互作用；PINN/PINO 类模型则把 PDE residual 直接作为训练信号或正则项。框架把这些差异收敛到“模型 + datapipe + loss + optimizer”的组合。

> 💡 关键：PhysicsNeMo 的“物理 AI”不是只在 loss 里加一个 PDE 项。它更像一个工程化操作系统：模型库提供可替换主干，datapipe 统一工程数据输入，PhysicsInformer 统一残差计算，distributed/launch/deploy 处理规模化训练和落地。

与传统 CFD 求解器相比，PhysicsNeMo 训练出的模型通常是代理模型或校正模型：训练成本可能较高，但推理阶段可以在新参数、新几何或新初边值条件下快速给出近似场。与普通 PINN 脚本相比，PhysicsNeMo 的优势在可复用组件和规模化训练；与纯监督 CNN/Transformer 相比，它可以把守恒方程、边界条件和物理 residual 纳入优化目标，从而在数据稀缺或分布外外推时提供额外约束。

在流体仿真场景中，PhysicsNeMo 常见流程是：先用 CFD/实验/再分析数据构造样本，再选择 FNO、MeshGraphNet、Transolver 或扩散模型做场预测，随后用 PDE residual、边界条件误差或物理诊断量约束训练。对于实时工程设计，模型可导出为 checkpoint/ONNX 或接入领域包；对于研究工作，用户可以替换 PDE、模型主干、导数计算方式和 loss 聚合策略。

#### 🧪 练习题

```yaml
question: "PhysicsNeMo 中 PhysicsInformer 的核心作用是什么？"
options:
  - "把神经网络权重自动转换成有限元网格"
  - "根据符号 PDE 和模型输出计算方程残差，并将 physics loss 接入 PyTorch 训练"
  - "只负责下载 CFD 数据集，与训练损失无关"
  - "把所有模型强制改写成 GraphCast 架构"
answer: 1
explain: "PhysicsInformer 接收 PDE 定义、目标 residual 名称和导数计算方式，计算连续方程残差；这些 residual 可与数据损失一起组成 PhysicsNeMo 的训练目标。"
```
