### UDE — 通用微分方程 (Universal Differential Equations)

```yaml
id: ude
name: UDE
full_name: 通用微分方程 (Universal Differential Equations)
year: '2020'
org: Christopher Rackauckas
paper_url: https://arxiv.org/abs/2001.04385
category: physics_discovery
parent: neural_ode
motivation: NN作为微分方程未知项补全物理
```

#### 📝 一句话总结

UDE 将已知科学模型与神经网络、傅里叶/切比雪夫展开等通用逼近器嵌入同一个微分方程求解框架，用可微分数值求解器和伴随敏感性训练未知项，从而在小数据条件下补全机制、发现方程并加速仿真。

#### 🎯 核心要点

- **统一形式**：把 Neural ODE、神经 SDE、神经 DDE、神经 PDE、混合 DAE 和物理约束最优控制都视为嵌入通用逼近器的微分方程
- **混合建模**：保留可信的物理项 \(f_{\mathrm{known}}\)，只让 \(U_\theta\) 学习未知闭合项、残差项、参数化项或未建模交互
- **训练机制**：通过 DifferentialEquations.jl 求解状态轨迹，通过 DiffEqSensitivity.jl/自动微分计算对 \(p,\theta\) 的梯度
- **方程发现**：先训练 UDE 拟合未知动力学，再对训练出的 \(U_\theta\) 或导数估计做稀疏回归/符号回归，得到可解释控制方程
- **数值优势**：显式纳入自适应步长、刚性求解器、DAE/DDE/SDE 支持、checkpoint adjoint 和稳定伴随方法，避免把科学模型训练完全变成 PINN 式大优化问题
- **代表案例**：Lotka-Volterra 机制补全、Fisher-KPP PDE 发现、高维 Hamilton-Jacobi-Bellman、气候参数化、非牛顿流体闭合关系
- **主要风险**：若已知物理骨架错误或数据无法辨识未知项，UDE 可能得到预测有效但解释错误的补偿项

#### 🔬 深入细节

##### 可访问来源与核心示意图

论文 arXiv 页面: https://arxiv.org/abs/2001.04385；可访问 HTML 与图像来源: https://ar5iv.labs.arxiv.org/html/2001.04385；复现实验代码: https://github.com/ChrisRackauckas/universal_differential_equations。

![SciML 与 UDE 的统一接口](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x1.png)
*图：UDE 位于 SciML 工具链中间，将高层科学模型、符号-数值表示、优化器、微分方程求解器、伴随敏感性和深度学习库组合成可训练系统。*

![UDE 在低维生物动力学中的机制补全示例](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x3.png)
*图：UDE 用少量观测数据训练未知交互项后，可以在长时间范围内重建 Lotka-Volterra 类系统轨迹。*

![UDE 学习非牛顿流体闭合关系](https://ar5iv.labs.arxiv.org/html/2001.04385/assets/x5.png)
*图：在非牛顿流体闭合问题中，神经闭合项比线性近似更准确，并可作为更快的降阶模型使用。*

##### 算法伪代码

```python
# UDE 训练 + 方程发现伪代码

def known_physics(u, t, p):
    # 可信的机理项，例如守恒律、扩散项、反应项、约束项
    return f_known(u, t, p)

def unknown_closure(u, t, theta):
    # 通用逼近器：NN、CNN、Fourier/Chebyshev 展开或其它可微模块
    return U_theta(u, t, theta)

def ude_rhs(u, t, p, theta):
    return known_physics(u, t, p) + unknown_closure(u, t, theta)

def train_ude(observations, tspan, p, theta):
    for step in range(num_steps):
        u0, ts, ys = sample_trajectory(observations)
        pred = differential_equation_solve(
            rhs=lambda u, t: ude_rhs(u, t, p, theta),
            u0=u0,
            saveat=ts,
            solver="adaptive_or_stiff_solver",
        )

        loss = mean_squared_error(pred, ys) + regularization(theta, p)

        # adjoint / sensitivity methods compute d loss / d(p, theta)
        grad_p, grad_theta = sensitivity_gradient(loss, pred, p, theta)
        p, theta = optimizer_update((p, theta), (grad_p, grad_theta))

    return p, theta

def discover_equation(trained_model, sampled_states):
    # 用训练好的 U_theta 生成未知项取值，再做稀疏符号回归
    library = build_candidate_library(sampled_states, derivatives=True)
    target = evaluate_unknown_closure(trained_model, sampled_states)
    sparse_formula = sparse_regression(library, target)
    return sparse_formula
```

##### UDE 的基本形式

最常用的 UDE 可以写成一个带未知项的 ODE：

$$
\frac{du}{dt}
=
f_{\mathrm{known}}(u,t,p)
+
U_\theta(u,t),
\qquad
u(t_0)=u_0.
$$

其中 \(f_{\mathrm{known}}\) 是研究者已经相信的机理模型，例如质量守恒、动量守恒、反应网络中已知反应、扩散项或边界条件；\(U_\theta\) 是通用逼近器，用来表达未知交互、模型误差、闭合关系或难以手写的高维算子。训练目标通常是离散观测点上的轨迹误差：

$$
\mathcal{L}(p,\theta)
=
\sum_{i=1}^{m}
\left\|
u_{p,\theta}(t_i)-y_i
\right\|_2^2
+
\lambda \mathcal{R}(p,\theta),
$$

其中

$$
u_{p,\theta}(t_i)
=
\operatorname{DESolve}
\left(u_0,\; f_{\mathrm{known}}+U_\theta,\; t_0,\; t_i\right).
$$

这一定义并不限于 ODE。把求解器换成 SDE、DDE、PDE method-of-lines、DAE 或 jump/hybrid solver，就得到对应的 Universal SDE、Universal DDE、Universal PDE 或 Universal DAE。UDE 的重点不是“神经网络替代微分方程”，而是“在微分方程内部只替代未知部分”。

##### 为什么 UDE 比纯黑盒 Neural ODE 更适合科学建模

纯 Neural ODE 通常写作 \(\dot u=f_\theta(u,t)\)，所有动力学都由网络学习。这在数据丰富时很灵活，但在科学问题中常有两个问题：实验数据昂贵，且研究者已经知道大量约束。如果忽略这些约束，模型会把数据稀缺性转化为外推失败。

UDE 把模型写成

$$
\dot u = f_{\mathrm{known}}(u,t,p) + U_\theta(u,t),
$$

等价于把学习任务从“学习整个物理世界”缩小成“学习已知模型的缺口”。这使 \(U_\theta\) 的函数复杂度更低，也让外推更受物理骨架约束。例如已知 Lotka-Volterra 系统存在增长/衰减项，但相互作用项未知时，网络只需学习交互结构；已知 PDE 是扩散-反应型时，网络只需学习未知反应项或离散算子。

> 💡 关键：UDE 的数据效率来自归纳偏置。可信物理项越多，网络需要从数据中凭空学习的东西越少。

##### 梯度计算：求解器与伴随法是核心

训练 UDE 需要对微分方程解 \(u(t;p,\theta)\) 求参数梯度。用链式法则可写成：

$$
\frac{d\mathcal{L}}{d\theta}
=
\sum_i
\frac{\partial \mathcal{L}}{\partial u(t_i)}
\frac{\partial u(t_i)}{\partial \theta}.
$$

直接存储求解器每一步再反向传播，在刚性系统或长时间积分中成本很高。论文强调 SciML 工具链提供多类 sensitivity/adjoint 选择：forward sensitivity 适合参数少的系统；连续伴随适合大参数模型；checkpointed interpolation adjoint 可避免反向积分不稳定；离散伴随更贴近实际求解器轨迹；刚性问题可使用稳定伴随和隐式求解器。

这也是 UDE 与许多 PINN 写法的差异。PINN 常把微分方程残差直接放进损失，在大量 collocation point 上优化网络；UDE 则继续使用成熟数值求解器推进状态，只把未知模型项纳入可微计算图。对于已有高质量求解器的科学模型，这通常更稳定，也更容易复用工程代码。

##### 从补全模型到发现方程

UDE 的一个重要工作流是两阶段发现：

1. 用 \(U_\theta\) 补全未知动力学，使混合模型能匹配观测；
2. 在训练好的 \(U_\theta\) 上采样，再用稀疏回归或符号回归把神经项压缩成可读公式。

例如对反应-扩散型 PDE，可先训练

$$
u_t
=
D_\phi(u)
+
N_\theta(u),
$$

其中 \(D_\phi\) 可以是可学习卷积 stencil，\(N_\theta\) 是局部非线性反应项。训练后再把 \(N_\theta(u)\) 对候选库 \(\{1,u,u^2,u^3,\ldots\}\) 做稀疏回归，可能恢复出 Fisher-KPP 型增长项：

$$
u_t = D u_{xx} + r u(1-u).
$$

这种方式把“发现方程”转化成低维、低噪声的后处理问题：神经网络先吸收复杂观测和数值误差，再由稀疏回归提取可解释结构。

##### 与相关方法的区别

| 方法 | 已知物理使用方式 | 求解方式 | 可解释性 | 典型瓶颈 |
|------|------------------|----------|----------|----------|
| 纯 Neural ODE | 几乎不用或只弱约束 | ODE solver + NN RHS | 弱 | 小数据外推差、刚性训练难 |
| PINN | PDE 残差进入损失 | 优化网络函数本身 | 中等，依赖已知 PDE | collocation 优化难、刚性问题慢 |
| 稀疏方程发现 | 候选库人工给定 | 先估导数再回归 | 强 | 对噪声和导数估计敏感 |
| UDE | 已知机理项保留，未知项由 UA 学习 | 成熟微分方程求解器 + 伴随 | 先弱后强，可再做符号回归 | 需选择正确物理骨架和敏感性方法 |

UDE 的价值在于工程组合：它把科学计算中已有的求解器、符号建模、自动微分、优化器和机器学习模块接起来。对研究者来说，最重要的设计不是网络层数，而是把什么写进 \(f_{\mathrm{known}}\)，把什么留给 \(U_\theta\)，以及训练后是否能把 \(U_\theta\) 重新解释为科学公式。

##### 局限与实践注意

UDE 不是自动保证可解释的万能模型。如果已知物理项漏掉了关键状态变量，\(U_\theta\) 可能学到一个依赖训练分布的补偿项；如果观测只覆盖很短时间窗口，未知项和初值误差、参数误差可能不可辨识；如果系统很刚性，错误选择反向伴随会导致梯度发散。实践中应同时检查轨迹拟合、外推、守恒量、参数可辨识性和符号回归残差。

#### 🧪 练习题

```yaml
question: "UDE 相比纯 Neural ODE 的核心建模优势是什么？"
options:
  - "完全不需要数值微分方程求解器"
  - "只让通用逼近器学习未知或残差项，同时保留可信物理模型作为归纳偏置"
  - "把所有科学问题都改写成图像分类任务"
  - "训练时不需要观测数据"
answer: 1
explain: "UDE 的关键是混合建模：已知机理项继续由微分方程表达，神经网络等通用逼近器只补全未知部分，因此通常比全黑盒 Neural ODE 更数据高效、更适合外推。"
```
