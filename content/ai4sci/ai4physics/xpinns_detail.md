### XPINNs — 扩展PINN (Extended Physics-Informed Neural Networks)

```yaml
id: xpinns
name: XPINNs
full_name: 扩展PINN (Extended Physics-Informed Neural Networks)
year: '2020'
org: 布朗大学
paper_url: https://doi.org/10.4208/cicp.OA-2020-0164
category: pde_solving
parent: pinn
motivation: 域分解策略支持复杂几何并行化
```

#### 📝 一句话总结

XPINNs 将 PINN 扩展为任意空间-时间域分解框架：每个子域训练一个独立的物理约束网络，并用接口处的解连续、PDE 残差连续等损失把子域拼接起来，从而解决单一 PINN 难以处理复杂几何、多尺度解和并行训练的问题。

#### 🎯 核心要点

- **任意空间-时间域分解**：相比只面向守恒律空间分解的 cPINN，XPINNs 可在空间、时间或空间-时间联合维度切分任意形状子域
- **每个子域一套网络**：子域 \(q\) 使用独立神经网络 \(u_{\theta_q}\)，可配置不同深度、宽度、激活函数、残差点数量和优化超参数
- **接口损失负责“缝合”**：在相邻子域接口上同时惩罚解到平均解的偏差 \(MSE_{uavg}\) 和 PDE 残差不连续 \(MSE_R\)
- **适用于通用 PDE**：接口残差连续由自动微分计算，不依赖守恒通量形式，因此可用于非守恒律、稳态/非稳态、正问题/反问题
- **天然支持并行化**：各子域的残差和数据损失可分布式计算，接口项只需要交换边界/接口点上的网络输出与残差
- **复杂区域与多尺度解更灵活**：复杂或陡峭解区域可用更深网络和更多残差点，平滑区域可用较小网络，减少单一 PINN 的容量浪费

#### 🔬 深入细节

##### 核心架构示意图

![XPINNs 子域网络与接口示意图](https://figures.semanticscholar.org/78f0649ee879d97e73d492eaf76d3f5dfc554ba0/8-Figure1-1.png)
*图：XPINNs 在每个子域内部使用 PINN 子网络，并在不规则子域接口上施加物理残差与解连续约束。原论文 DOI 页面部分内容受限；上图来自 Semantic Scholar 对论文 Figure 1 的公开图像索引，论文 PDF 可从作者 GitHub 与 CEUR-WS 页面访问。*

##### 算法伪代码

```python
# XPINNs 训练流程伪代码
subdomains = decompose_space_time_domain(Omega_T)  # Ω×[0,T] -> {Ω_q}
models = {q: PINN(network_config[q]) for q in subdomains}

for step in range(num_steps):
    total_loss = 0.0

    for q, model_q in models.items():
        # 子域内部数据/边界/初值点与 PDE 残差点
        x_u, y_u = sample_data_or_bc_ic(q)
        x_f = sample_residual_points(q)

        u_pred = model_q(x_u)
        mse_u = mean_squared_error(u_pred, y_u)

        # 自动微分计算 PDE 残差 F[u_q](x)
        residual_q = pde_residual(model_q, x_f)
        mse_f = mean(residual_q ** 2)

        loss_q = W_u[q] * mse_u + W_f[q] * mse_f

        # 与所有相邻子域在接口 Γ_{q,q+} 上交换输出与残差
        for q_plus in neighbors(q):
            x_i = sample_interface_points(q, q_plus)
            u_q = models[q](x_i)
            u_p = models[q_plus](x_i)
            u_avg = 0.5 * (u_q + u_p)

            r_q = pde_residual(models[q], x_i)
            r_p = pde_residual(models[q_plus], x_i)

            mse_uavg = mean((u_q - u_avg) ** 2)
            mse_residual = mean((r_q - r_p) ** 2)

            loss_q += W_i[q] * mse_uavg + W_if[q] * mse_residual

            # 可选：对守恒律加入法向通量连续，对高阶 PDE 加入 C^k 连续
            # loss_q += flux_or_derivative_continuity(models[q], models[q_plus], x_i)

        total_loss += loss_q

    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

##### 方法机制解释

标准 PINN 用单个网络 \(u_\theta(\mathbf{x})\) 近似整个计算域上的 PDE 解，并通过初值/边界数据项与 PDE 残差项训练：

$$
\mathcal{L}_{PINN} =
W_u MSE_u + W_F MSE_F,\qquad
MSE_F = \frac{1}{N_F}\sum_{i=1}^{N_F}\left|\mathcal{F}[u_\theta](\mathbf{x}_F^{(i)})\right|^2.
$$

当解在不同区域具有明显不同的尺度、光滑性或边界结构时，单个网络需要同时拟合所有局部行为，训练会变得僵硬；复杂几何中残差点分布也难以一次性调好。XPINNs 的核心做法是把全域 \(\Omega\) 分成 \(N_{sd}\) 个子域 \(\Omega_q\)，每个子域学习一个局部代理 \(u_{\theta_q}\)，再通过接口 \(\Gamma_{q,q^+}\) 交换信息。

对第 \(q\) 个子域，论文给出的前向问题损失可写成：

$$
\mathcal{J}(\theta_q)=
W_{u_q}MSE_{u_q}
+W_{F_q}MSE_{F_q}
+W_{I_q}MSE_{uavg}
+W_{IF_q}MSE_R
+\text{optional interface terms}.
$$

其中前两项与普通 PINN 相同，分别约束观测/初边值数据和子域内部 PDE 残差：

$$
MSE_{u_q}=\frac{1}{N_{u_q}}\sum_i
\left|u^{(i)}-u_{\theta_q}(\mathbf{x}_{u_q}^{(i)})\right|^2,\qquad
MSE_{F_q}=\frac{1}{N_{F_q}}\sum_i
\left|\mathcal{F}[u_{\theta_q}](\mathbf{x}_{F_q}^{(i)})\right|^2.
$$

真正让子域成为一个整体的是接口项。对相邻子域 \(q\) 与 \(q^+\)，接口平均解定义为：

$$
u_{avg}(\mathbf{x})=
\frac{u_{\theta_q}(\mathbf{x})+u_{\theta_{q^+}}(\mathbf{x})}{2},
\qquad \mathbf{x}\in\Gamma_{q,q^+}.
$$

XPINNs 让每一侧的解贴近这个平均值，得到 \(C^0\) 意义下的解连续；同时让两侧 PDE 残差一致：

$$
MSE_{uavg}=
\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|u_{\theta_q}(\mathbf{x}_{I_q}^{(i)})-u_{avg}(\mathbf{x}_{I_q}^{(i)})\right|^2,
$$

$$
MSE_R=
\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|
\mathcal{F}[u_{\theta_q}](\mathbf{x}_{I_q}^{(i)})
-\mathcal{F}[u_{\theta_{q^+}}](\mathbf{x}_{I_q}^{(i)})
\right|^2.
$$

> 💡 关键：XPINNs 不要求接口法向通量一定可定义。残差连续项只依赖 PDE 算子和自动微分，因此它比 cPINN 更通用；如果问题本身是守恒律，也可以额外加入通量连续项增强物理约束。

这种设计带来两个直接收益。第一，子域之间只在接口点通信，子域内部残差计算可以并行；第二，模型容量和采样密度可以按局部难度分配。例如 Burgers 方程中有陡峭梯度的区域可以使用更多残差点、更宽网络或不同激活函数，而平滑区域不必承担相同成本。论文示例中，空间-时间域被切成带不规则“dolphin”接口的两个子域，并分别使用不同网络结构与激活函数，说明 XPINNs 的域分解并不限于规则网格切块。

反问题也可自然纳入：若 PDE 含未知参数 \(\lambda\)，只需把 \(\lambda\) 加入待优化参数集合，残差 \(\mathcal{F}[u_{\theta_q};\lambda]\) 仍由自动微分计算。换言之，XPINNs 的主要变化不是改写 PINN 的物理监督，而是把“一个全局优化问题”变成“多个带接口协调的局部物理优化问题”。

#### 🧪 练习题

```yaml
question: "XPINNs 相比普通 PINN 的关键新增损失是什么？"
options:
  - "只在全域增加更多初始条件采样点"
  - "在相邻子域接口上加入解连续和 PDE 残差连续约束"
  - "把所有 PDE 都改写成守恒通量形式"
  - "用卷积网络替代全连接网络"
answer: 1
explain: "XPINNs 的核心是域分解后用接口损失拼接子域，包括解到平均解的连续约束和两侧 PDE 残差连续约束；这使多个局部 PINN 能组成一个全域解。"
```
