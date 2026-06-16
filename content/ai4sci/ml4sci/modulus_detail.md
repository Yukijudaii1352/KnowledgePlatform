### Modulus — NVIDIA Modulus

```yaml
id: modulus
name: Modulus
full_name: NVIDIA Modulus
year: '2022'
org: NVIDIA
paper_url: https://developer.nvidia.com/modulus
category: acceleration
parent: —
motivation: 工业级数字孪生GPU深度优化
```

#### 📝 一句话总结

NVIDIA Modulus 将 PINN、数据驱动建模和神经算子组织成面向工业仿真的 GPU 框架，用 Geometry/Data、Node、Constraint、Domain、Solver、Hydra 等组件把多物理场仿真、参数化设计、反问题和数字孪生统一为可扩展的优化图。

#### 🎯 核心要点

- **工程化 PINN 框架**：把 PDE、边界条件、观测数据和网络输出都表示为 `Node` 与 `Constraint` 组成的计算图
- **约束驱动训练**：`Constraint` 持有损失函数和执行节点，`Solver` 在每轮迭代汇总全局损失并优化可训练模型
- **积分化损失**：官方文档把残差损失视为区域积分，并用 Monte Carlo / quasi-Monte Carlo 近似，使 loss 与几何面积/体积尺度一致
- **参数化几何与设计空间探索**：网络可把几何参数作为输入，一次训练覆盖多个设计配置，推理阶段快速评估新配置
- **复杂几何支持**：SimNet/Modulus 系列支持 CSG、STL/OBJ tessellated geometry、点云采样和边界法向/距离计算
- **SDF 空间加权**：用 signed distance function 调整 PDE residual loss 权重，缓解尖角、间隙、壁面附近强梯度导致的训练困难
- **工业 GPU 优化**：支持 Fourier feature、modified Fourier、SiReN 等架构，并强调多 GPU/多节点、FP32/FP64/TF32 和 TensorBoard/ParaView 可视化链路

#### 🔬 深入细节

##### 核心架构示意

![SimNet/Modulus 框架结构](https://ar5iv.labs.arxiv.org/html/2012.07938/assets/x4.png)
*图：NVIDIA SimNet 论文中的系统结构。SimNet 是 Modulus 的前身/同源方法脉络，展示几何、PDE、网络、优化器、数据集、求解器、GPU 与可视化输出如何组成端到端仿真框架。*

![Modulus 参数化微分方程示例](https://docscontent.nvidia.com/dims4/default/3838a28/2147483647/strip/true/crop/960x721%2B0%2B0/resize/960x721%21/quality/90/?url=https%3A%2F%2Fk3-prod-nvidia-docs.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fsphinx%2F00000187-bf1b-d3c6-a7f7-ff7f4e8b0000%2Fdeeplearning%2Fmodulus%2Fmodulus-v2209%2F_images%2Fevery_parabola.png)
*图：NVIDIA Modulus v22.09 文档中的参数化 ODE/PDE 示例。网络输入包含参数 \(l\)，一次训练得到不同边界位置下的解族。*

来源说明：任务给出的 `paper_url` 是 NVIDIA 产品页；方法解读主要基于 NVIDIA Modulus v22.09 官方文档与论文 [NVIDIA SimNet: an AI-accelerated multi-physics simulation framework](https://arxiv.org/abs/2012.07938)。Modulus 后续品牌演进到 PhysicsNeMo，但本条目按 2022 年 Modulus/SimNet 方法脉络解读。

##### 算法伪代码

```python
# NVIDIA Modulus 风格物理约束训练伪代码
# 输入: 几何 Ω, PDE 节点, 边界/内部约束, 网络结构, Hydra 配置

@modulus_main(config_path="conf", config_name="config")
def run(cfg):
    # 1. 几何与参数化设计空间
    x, y, z = Symbol("x"), Symbol("y"), Symbol("z")
    l = Symbol("l")                         # 设计变量/几何参数
    geometry = build_csg_or_import_stl(l)

    # 2. PDE/网络都转成 Nodes，框架据此构建执行图
    pde_nodes = NavierStokes(nu=nu, rho=rho).make_nodes()
    net = FullyConnectedArch(
        input_keys=["x", "y", "z", "l"],
        output_keys=["u", "v", "w", "p"],
        frequencies="fourier"
    )
    nodes = pde_nodes + [net.make_node(name="flow_network")]

    # 3. 多个 Constraints 共同定义问题
    domain = Domain()
    domain.add_constraint(
        PointwiseBoundaryConstraint(nodes, geometry.inlet,
                                    outvar={"u": inlet_u, "v": 0, "w": 0}),
        name="inlet_bc"
    )
    domain.add_constraint(
        PointwiseInteriorConstraint(nodes, geometry,
                                    outvar={"continuity": 0, "momentum_x": 0,
                                            "momentum_y": 0, "momentum_z": 0},
                                    lambda_weighting={"momentum_x": sdf_weight(geometry)}),
        name="pde_residual"
    )
    domain.add_inferencer(PointwiseInferencer(nodes, query_points), name="vtk_export")

    # 4. Solver 汇总所有 constraint loss 并优化
    solver = Solver(cfg, domain)
    solver.solve()
```

##### 方法机制

Modulus 的基本 PINN 机制和普通 physics-informed learning 一致：用神经网络 \(u_{net}(x)\) 近似未知解，并把 PDE 与边界条件变成损失。例如官方文档用如下一维问题说明：

$$
\frac{d^2u}{dx^2}(x)=f(x),\quad u(0)=u(1)=0.
$$

边界损失为：

$$
L_{BC}=u_{net}(0)^2+u_{net}(1)^2,
$$

残差损失为：

$$
L_{residual}=\frac{1}{N}\sum_{i=0}^{N}
\left(\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\right)^2.
$$

Modulus 文档进一步把这个求和解释为积分的 Monte Carlo 近似：

$$
L_{residual}
=\int_0^1
\left(\frac{d^2u_{net}}{dx^2}(x)-f(x)\right)^2 dx
\approx
\left(\int_0^1 dx\right)\frac{1}{N}\sum_{i=0}^{N}
\left(\frac{d^2u_{net}}{dx^2}(x_i)-f(x_i)\right)^2.
$$

> 💡 关键：把 loss 写成积分不是形式主义。对于复杂 2D/3D 几何，不同区域面积/体积不同，积分视角能让约束强度随物理区域尺度变化，并自然接入 Monte Carlo、quasi-Monte Carlo 和区域重采样。

Modulus 的工程抽象围绕 `Node`、`Constraint`、`Domain` 和 `Solver` 展开。`Node` 可以是 PyTorch 网络、用户函数、PDE 方程或特征变换；它声明输入/输出变量，框架据此推断执行图，并自动补齐计算 PDE 残差所需的导数。`Constraint` 是训练目标，包含采样器、目标变量、损失函数和节点集合。`Domain` 汇总所有约束、验证器、监控器和推理器；`Solver` 执行优化循环，在每次迭代中调用约束、计算全局 loss、反向传播并更新模型。

参数化几何是 Modulus/SimNet 面向工业设计的核心能力。若边界位置或几何尺寸由参数 \(l\in[1,2]\) 控制，网络可写为 \(u_{net}(x,l)\)，残差积分变成：

$$
L_{residual}=
\int_1^2\int_0^l
\left(\frac{d^2u_{net}}{dx^2}(x,l)-f(x)\right)^2 dx\,dl.
$$

这意味着一次训练得到的是一族解，而不是单一几何上的一个解。传统 CFD/FEM 通常要对每个设计点重新网格化和求解；Modulus 在训练成本付出后，可以在推理阶段快速扫描设计参数，用于设计空间探索、优化和数字孪生。

SimNet 论文指出，真实工业几何中的尖角、薄间隙和不连续边界会让 PINN 训练变得困难。SDF loss weighting 是为此设计的机制：令 \(d(x,\partial\Omega)\) 表示点到边界的 signed distance，可定义空间相关权重 \(\lambda(x)\)，将损失写成

$$
\mathcal{L}_{pde}=
\int_{\Omega}
\lambda(x)\left\|\mathcal{R}_\theta(x)\right\|^2 dx,
\quad
\lambda(x)=\psi(d(x,\partial\Omega)).
$$

在尖角或强梯度区域调低/调节 residual 权重，可以避免局部奇异性支配整个优化过程。论文还提到对 tessellated mesh 的 SDF 计算使用 NVIDIA OptiX 做 inside/outside 测试和距离计算，这体现了 Modulus 与通用研究框架的差异：它不仅关注算法公式，也关注几何预处理和 GPU 工程吞吐。

对于不可压流，Modulus/SimNet 还加入 exact continuity 与 integral continuity 约束。连续性方程

$$
\frac{\partial u}{\partial x}+
\frac{\partial v}{\partial y}+
\frac{\partial w}{\partial z}=0
$$

既可以用速度势/向量势构造严格散度为零的速度场，也可以对截面 \(S\) 添加积分流量约束：

$$
L_{IC}=
\left(\iint_S(n_xu+n_yv+n_zw)\,dS\right)^2
\approx
\left(|S|\frac{1}{N}\sum_{i=1}^{N}
(n_x^iu_i+n_y^iv_i+n_z^iw_i)\right)^2.
$$

这种约束比只在点上惩罚 divergence 更贴近工程上关心的整体质量守恒，尤其有助于长通道、出口截面和复杂 3D 流动的收敛。

##### 与普通 PINN 框架的区别

DeepXDE、NeuralPDE.jl 更偏研究者友好的算法试验平台；Modulus 的目标更偏工业仿真生产线。它内置 Hydra 配置、TensorBoard/ParaView 输出、Validator/Monitor、STL/OBJ 导入、GPU 训练优化和多种网络架构，适合把 PINN 或神经算子放入数字孪生与设计优化流程。代价是框架更重，用户需要理解 Modulus 的节点图、约束系统和配置体系。

#### 🧪 练习题

```yaml
question: "NVIDIA Modulus 将 PDE residual loss 写成区域积分并用 Monte Carlo 近似的主要好处是什么？"
options:
  - "让所有训练点必须固定在规则网格上"
  - "使损失自然随几何面积/体积缩放，并支持复杂区域上的随机/准随机采样"
  - "完全避免自动微分计算导数"
  - "把 PINN 训练转换成无需优化器的线性方程组"
answer: 1
explain: "积分视角把残差约束定义在物理区域上，Monte Carlo 近似适合复杂几何采样，也能让不同区域的 loss 与其尺度一致。"
```
