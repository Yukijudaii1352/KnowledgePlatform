### PINO — 物理信息神经算子 (Physics-Informed Neural Operator)

```yaml
id: pino
name: PINO
full_name: 物理信息神经算子 (Physics-Informed Neural Operator)
year: '2021'
org: Caltech
paper_url: https://arxiv.org/abs/2111.03794
category: operators
parent: fno
motivation: 算子学习中加入物理约束损失
```

#### 📝 一句话总结

PINO 将 FNO/神经算子的函数空间学习与 PINN 的 PDE 残差约束结合起来，用数据损失学习一族 PDE 的解算子，再用高分辨率物理损失和实例级微调提高保真度，解决纯数据 FNO 依赖高质量数据、纯 PINN 优化困难的问题。

#### 🎯 核心要点

- **混合监督目标**：训练神经算子 \(\mathcal{G}_\theta\) 时同时使用数据损失 \(\mathcal{J}_{\text{data}}\) 和 PDE 损失 \(\mathcal{J}_{\text{pde}}\)
- **跨分辨率训练**：可用低分辨率数据监督算子输出，同时在更高分辨率网格上施加 PDE 残差，改善 zero-shot super-resolution
- **两阶段流程**：先做 physics-informed operator learning，再对单个 PDE 实例做 instance-wise fine-tuning
- **算子级 ansatz**：微调时使用 \(\mathcal{G}_\theta(a)\) 作为解函数 ansatz，而不是像 PINN 那样从随机初始化的点值网络开始
- **anchor loss**：微调时可加入 \(\mathcal{L}_{\text{anchor}}\)，约束当前算子不要偏离预训练算子，缓解高分辨率 PDE loss 的不稳定
- **导数计算方法**：讨论有限差分/Fourier 数值微分、query function + autograd、function-wise Fourier differentiation 三种方式
- **FNO 作为主干**：利用 FNO 的通用算子逼近能力、离散化收敛性和快速推理，在 PDE loss 中显式计算输出函数导数
- **数据稀缺适用**：可在只有少量粗分辨率数据甚至无标注数据时训练，并可通过采样虚拟初值/系数生成无限 PDE 实例
- **任务覆盖**：论文验证 Darcy flow、Burgers、Navier-Stokes/Kolmogorov flow、Reynolds 数迁移和 Darcy 反问题

#### 🔬 深入细节

##### 核心架构示意

![PINO 架构图](https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino-arch7.png)
*图：论文 Figure 2。输入函数 \(a\) 经 lifting、多个线性积分算子和非线性、projection 得到输出 \(u\)；右侧同时计算 data loss 和 equation loss，导数 \(Du\) 可通过算子层在函数空间中显式求出。*

![PINO 频谱外推示意](https://ar5iv.labs.arxiv.org/html/2111.03794/assets/fig/pino_spectrum_reduced_font.png)
*图：论文 Figure 1。PINO 利用 data + PDE loss 在 Kolmogorov flow 中更好外推到训练频率之外，纯插值网络在高频段明显失真。*

##### 算法伪代码

```python
# PINO 阶段 1：物理信息算子学习
def train_pino_operator(G_theta, data_loader, pde_sampler):
    for step in range(num_steps):
        # 可用数据：粗分辨率 input-output pair
        a_data, u_data = next(data_loader)
        pred_data = G_theta(a_data)
        J_data = norm_u(pred_data - u_data) ** 2

        # 可额外采样虚拟 PDE 实例，不一定有标签
        a_phys = pde_sampler.sample_initial_or_coefficients()
        pred_high = G_theta(a_phys, resolution="high")
        residual = pde_residual(a_phys, pred_high)  # 需要 Du, D2u, ...
        J_pde = mean_square(residual) + boundary_initial_terms(pred_high, a_phys)

        loss = lambda_data * J_data + lambda_pde * J_pde
        loss.backward()
        optimizer.step()

# PINO 阶段 2：实例级微调
def fine_tune_instance(G_theta, a_star, theta0):
    for step in range(finetune_steps):
        u_pred = G_theta(a_star, resolution=current_resolution)
        L_pde = mean_square(pde_residual(a_star, u_pred))
        L_anchor = norm_u(G_theta(a_star) - G_theta(theta0, a_star)) ** 2
        loss = L_pde + alpha * L_anchor
        loss.backward()
        optimizer.step()
```

##### 问题设定

PINO 统一考虑两类 PDE。静态问题写作：

$$\mathcal{P}(u,a)=0,\quad x\in D,\qquad u=g,\quad x\in\partial D$$

其中 \(a\) 是 PDE 系数或参数，\(u\) 是未知解。它诱导出解算子：

$$\mathcal{G}^{\dagger}: \mathcal{A}\to\mathcal{U},\qquad a\mapsto u$$

动态问题写作：

$$\frac{\mathrm{d}u}{\mathrm{d}t}=\mathcal{R}(u),\quad
u|_{\partial D}=g,\quad u|_{t=0}=a$$

这时解算子把初值 \(a\) 映射到整段时间上的解函数 \(u(t)\)。PINO 的目标不是只求某一个 \(a\) 的解，而是学习整个 \(\mathcal{A}\to\mathcal{U}\) 的算子；这正是它区别于 PINN 的核心。

##### 数据损失与 PDE 损失

如果有训练数据 \(\{(a_j,u_j)\}_{j=1}^{N}\)，神经算子可用数据损失训练：

$$\mathcal{L}_{\text{data}}(u,\mathcal{G}_\theta(a))
= \|u-\mathcal{G}_\theta(a)\|_{\mathcal{U}}^2
= \int_D |u(x)-\mathcal{G}_\theta(a)(x)|^2\,\mathrm{d}x$$

算子级平均数据损失为：

$$\mathcal{J}_{\text{data}}(\mathcal{G}_\theta)
= \mathbb{E}_{a\sim\mu}
\left[\mathcal{L}_{\text{data}}(a,\theta)\right]
\approx
\frac{1}{N}\sum_{j=1}^{N}
\int_D |u_j(x)-\mathcal{G}_\theta(a_j)(x)|^2\,\mathrm{d}x$$

PDE 损失则把模型输出代回方程：

$$\mathcal{J}_{\text{pde}}(\mathcal{G}_\theta)
= \mathbb{E}_{a\sim\mu}
\left[\mathcal{L}_{\text{pde}}(a,\mathcal{G}_\theta(a))\right]$$

以静态问题为例，PINN/PINO 形式的 PDE 残差损失可写成：

$$\mathcal{L}_{\text{pde}}(a,u_\theta)
=
\int_D |\mathcal{P}(u_\theta(x),a(x))|^2\,\mathrm{d}x
+\alpha\int_{\partial D}|u_\theta(x)-g(x)|^2\,\mathrm{d}x$$

动态问题则加入时间残差、边界条件和初值条件：

$$\mathcal{L}_{\text{pde}}(a,u_\theta)
=
\int_0^T\int_D
\left|\frac{\mathrm{d}u_\theta}{\mathrm{d}t}(t,x)-\mathcal{R}(u_\theta)(t,x)\right|^2
\,\mathrm{d}x\,\mathrm{d}t
+\alpha\int_0^T\int_{\partial D}|u_\theta(t,x)-g(t,x)|^2\,\mathrm{d}x\,\mathrm{d}t
+\beta\int_D |u_\theta(0,x)-a(x)|^2\,\mathrm{d}x$$

> 💡 关键：数据损失提供强监督，让优化更容易；PDE 损失提供物理约束，能利用无标签的虚拟 PDE 实例，并可在高于数据分辨率的网格上计算。

##### 神经算子主干与 FNO 导数

PINO 使用的神经算子可抽象为：

$$\mathcal{G}_{\theta}
=
\mathcal{Q}\circ(\mathcal{W}_L+\mathcal{K}_L)
\circ\cdots\circ
\sigma(\mathcal{W}_1+\mathcal{K}_1)\circ\mathcal{P}$$

\(\mathcal{P}\) 将输入函数 lift 到高维通道，\(\mathcal{Q}\) 将最后的隐函数 project 到输出函数，\(\mathcal{K}_l\) 是积分核算子。FNO 中常用 Fourier convolution：

$$\mathcal{K}v(x)=
\mathcal{F}^{-1}\left(R\cdot \mathcal{F}(v)\right)(x)$$

PDE loss 需要 \(\partial_x u\)、\(\partial_{xx}u\)、\(\partial_tu\) 等导数。PINO 讨论三种路径：

- **数值微分**：有限差分 \(O(n)\) 或 Fourier differentiation \(O(n\log n)\)，速度快但受网格、光滑性和截断误差影响
- **query function + autograd**：把神经算子输出写成可查询的 \(u(x)\)，对查询点用自动微分，通用但慢且耗显存
- **function-wise differentiation**：对 FNO 的 Fourier 表示显式求导，在频域中乘以频率因子，再 IFFT 回物理空间

对一维 Fourier 展开，若最后的输出可写为：

$$u(x)=Q\left(
\frac{1}{k_{\max}}\sum_{k=0}^{k_{\max}}
\left(R_k(\mathcal{F}v)_k\right)
\exp\left(\frac{i2\pi k}{D}x\right)
\right)$$

则导数只需对指数项求导：

$$\frac{\mathrm{d}}{\mathrm{d}x}
\exp\left(\frac{i2\pi k}{D}x\right)
=
\frac{i2\pi k}{D}
\exp\left(\frac{i2\pi k}{D}x\right)$$

因此在规则网格上可以通过 FFT 高效得到整场导数。这是 PINO 相比朴素 PINN 的重要工程优势：它不是对每个采样点独立反传求导，而是利用算子结构批量计算函数级导数。

##### 两阶段训练机制

第一阶段是 physics-informed operator learning。PINO 训练 \(\mathcal{G}_\theta\) 去近似真实解算子 \(\mathcal{G}^{\dagger}\)，可使用：

$$\mathcal{J}(\theta)
=
\lambda_{\text{data}}\mathcal{J}_{\text{data}}(\mathcal{G}_\theta)
+\lambda_{\text{pde}}\mathcal{J}_{\text{pde}}(\mathcal{G}_\theta)$$

当数据只在低分辨率可得时，\(\mathcal{J}_{\text{data}}\) 在粗网格上计算，\(\mathcal{J}_{\text{pde}}\) 可以在细网格上计算。这使模型不仅拟合观测/求解器数据，还被物理方程约束到更高频、更高分辨率的解空间。

第二阶段是 instance-wise fine-tuning。给定一个具体实例 \(a^\star\)，用预训练算子输出 \(\mathcal{G}_\theta(a^\star)\) 作为 ansatz，再最小化该实例上的 PDE residual。为了避免微调在高分辨率 PDE loss 下偏离太远，论文加入 anchor loss：

$$\mathcal{L}_{\text{anchor}}
\left(\mathcal{G}_{\theta_i}(a),\mathcal{G}_{\theta_0}(a)\right)
:=
\|\mathcal{G}_{\theta_i}(a)-\mathcal{G}_{\theta_0}(a)\|_{\mathcal{U}}^2$$

微调目标为：

$$\mathcal{L}_{\text{fine-tune}}
=
\mathcal{L}_{\text{pde}}
+\alpha\mathcal{L}_{\text{anchor}}$$

直觉上，预训练算子给出“已经接近解流形”的初值，PDE loss 只需做物理一致性修正；而 PINN 通常从随机网络开始直接拟合一个复杂函数，优化景观更差，尤其在多尺度动态系统中容易失败。

##### 与 PINN 和纯 FNO 的区别

| 方面 | PINN | FNO | PINO |
|------|------|-----|------|
| 学习对象 | 单个 PDE 实例的解函数 | 一族 PDE 的解算子 | 一族 PDE 的物理约束解算子 |
| 监督来源 | PDE/边界/初值残差 | 求解器或观测数据 | 数据损失 + PDE 损失 |
| 数据需求 | 可无标注数据 | 依赖大量 input-output pair | 可用少量粗数据，也可采样无标签 PDE 实例 |
| 优化难度 | 多尺度动态系统困难 | 监督学习较稳定 | 预训练算子 + PDE 微调，优化更好 |
| 分辨率 | 配点灵活但逐点优化 | 可 zero-shot super-resolution，但高频可能失真 | 在高分辨率施加 PDE loss，改善高频外推 |
| 推理 | 每个实例需优化 | 一次前向很快 | 可直接前向，也可实例级微调换精度 |

> ⚠️ 注意：PINO 的 PDE loss 仍需正确的微分和边界处理。对于非周期或不光滑问题，直接 Fourier differentiation 会出现误差；论文因此讨论 Fourier continuation，把非周期问题扩展到更大的周期空间。

#### 🧪 练习题

```yaml
question: "PINO 相比纯 FNO 的核心改进是什么？"
options:
  - "完全取消数据损失，只保留随机初始化的 PINN 优化"
  - "在神经算子训练中加入 PDE 残差，并可在高分辨率上施加物理约束"
  - "把 Fourier layer 替换成普通全连接网络"
  - "只学习单个 PDE 样本，不能泛化到一族方程"
answer: 1
explain: "PINO 保留 FNO 的算子学习能力，但额外使用 PDE loss 约束输出函数，尤其能用粗分辨率数据配合高分辨率物理残差提高泛化和超分辨率保真度。"
```
