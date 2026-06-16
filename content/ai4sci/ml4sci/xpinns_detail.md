### XPINNs — 扩展物理信息神经网络 (Extended PINNs)

```yaml
id: xpinns
name: XPINNs
full_name: 扩展物理信息神经网络 (Extended PINNs)
year: '2020'
org: 布朗大学
paper_url: https://arxiv.org/abs/2005.05653
category: pinn_family
parent: cpinn
motivation: 广义域分解支持任意几何形状
```

#### 📝 一句话总结

XPINNs 把 PINN 从单一全域网络扩展为通用的空间-时间域分解框架：每个子域训练一个独立的物理信息子网络，再用接口上的解连续和 PDE 残差连续项把局部解拼接成全局解。它解决了 cPINN 主要面向守恒律、空间切分和较规则接口的问题，使任意复杂几何、时间切分、多尺度区域和并行训练都能纳入 PINN 家族。

#### 🎯 核心要点

- **任意空间-时间域分解**：可在空间、时间或空间-时间联合维度把计算域切成规则或不规则子域，不要求网格状切块。
- **每个子域一套 PINN**：子域 \(\Omega_q\) 使用独立网络 \(u_{\theta_q}\)，可按局部解复杂度配置不同层数、宽度、激活函数、采样密度和优化器。
- **接口损失负责拼接**：相邻子域接口 \(\Gamma_{q,q^+}\) 上加入平均解连续 \(MSE_{uavg}\) 与残差连续 \(MSE_R\)，让信息跨子域传播。
- **比 cPINN 更通用**：cPINN 依赖守恒律的通量连续；XPINNs 的核心接口项只依赖 PDE 残差和自动微分，因此可用于非守恒律、稳态/非稳态、正问题/反问题。
- **支持复杂几何与移动接口**：接口条件不需要显式法向量，降低了高维复杂边界、非凸域和动态接口问题的实现复杂度。
- **天然并行与局部自适应**：子域内部残差计算可并行，只有接口点需要交换网络输出和残差；困难区域可部署更深网络或更多残差点。

#### 🔬 深入细节

##### 来源与核心图示

论文 arXiv 页面为 `https://arxiv.org/abs/2005.05653`，会议版 PDF 可通过 CEUR-WS 访问：`https://ceur-ws.org/Vol-2964/article_60.pdf`。下图来自 Semantic Scholar 对论文 Figure 1 的公开图像索引，展示 XPINN 子网和不规则 X-shaped 域分解。

![XPINNs 子域网络与接口示意图](https://figures.semanticscholar.org/78f0649ee879d97e73d492eaf76d3f5dfc554ba0/8-Figure1-1.png)
*图：上半部分是在单个子域内的 PINN 子网与物理残差计算；下半部分展示不规则子域，每个子域部署一个 Sub-Net，并通过接口条件连接。*

##### 算法伪代码

```python
# XPINNs 训练流程伪代码
# 输入: PDE 算子 F, 分解后的子域 {Omega_q}, 边界/初值/观测点, 接口点
subdomains = decompose_space_time_domain(Omega, mode="arbitrary")
models = {q: PINN(config_for_subdomain(q)) for q in subdomains}

for step in range(num_steps):
    total_loss = 0.0

    for q, model_q in models.items():
        x_u, y_u = sample_data_or_bc_ic(q)
        x_f = sample_residual_points(q)

        u_q = model_q(x_u)
        mse_u = mean((u_q - y_u) ** 2)

        r_q = pde_residual(model_q, x_f)       # F[u_theta_q](x_f), via AD
        mse_f = mean(r_q ** 2)

        loss_q = W_u[q] * mse_u + W_f[q] * mse_f

        for p in neighbors(q):
            x_i = sample_interface_points(q, p)

            u_left = models[q](x_i)
            u_right = models[p](x_i)
            u_avg = 0.5 * (u_left + u_right)

            r_left = pde_residual(models[q], x_i)
            r_right = pde_residual(models[p], x_i)

            mse_uavg = mean((u_left - u_avg) ** 2)
            mse_residual = mean((r_left - r_right) ** 2)

            # 可按 PDE 类型额外加入通量连续或 C^k 导数连续
            loss_q += W_i[q] * mse_uavg + W_if[q] * mse_residual

        total_loss += loss_q

    optimizer.zero_grad()
    total_loss.backward()
    optimizer.step()
```

##### 方法机制解释

标准 PINN 用一个全局神经网络 \(u_\theta(\mathbf{x})\) 近似全域解，并最小化数据/边界项与 PDE 残差项：

$$
\mathcal{L}_{PINN}
= W_u MSE_u + W_F MSE_F,\qquad
MSE_F=\frac{1}{N_F}\sum_{i=1}^{N_F}
\left|\mathcal{F}[u_\theta](\mathbf{x}^{(i)}_F)\right|^2.
$$

这种全局单网络在简单光滑问题上有效，但在复杂几何、多尺度解、局部陡峭区域或不同物理区域并存时会变得难训：同一个网络既要拟合平滑区域，又要表达局部高频/间断结构，残差点也很难一次性分配合理。cPINN 已经把域分解引入 PINN，但其接口设计主要服务于守恒律中的通量连续。XPINNs 的关键扩展是把域分解抽象为通用机制：只要能在每个子域上用自动微分计算 PDE 残差，就可以用接口约束把子网络连接起来。

令全域被分解成 \(N_{sd}\) 个非重叠子域 \(\Omega_q\)，第 \(q\) 个子域的网络为：

$$
u_{\theta_q}(\mathbf{z}) = N_L(\mathbf{z};\theta_q),\qquad
\mathbf{z}\in\Omega_q,\quad q=1,\ldots,N_{sd}.
$$

全局解可理解为局部解的拼接：

$$
u_{\theta}(\mathbf{z})
=\sum_{q=1}^{N_{sd}} u_{\theta_q}(\mathbf{z})\,\mathbf{1}_{\Omega_q}(\mathbf{z}),
$$

其中 \(\mathbf{1}_{\Omega_q}\) 在子域内部取 1，在外部取 0；在公共接口上可按相交子域数量归一化。这个表示让每个子域拥有自己的表达能力和训练点分布，避免一个网络承担所有局部复杂性。

对第 \(q\) 个子域，XPINNs 的前向问题损失写作：

$$
\mathcal{J}(\theta_q)=
W_{u_q}MSE_{u_q}
+W_{F_q}MSE_{F_q}
+W_{I_q}MSE_{uavg}
+W_{IF_q}MSE_R
+\text{optional interface terms}.
$$

前两项与普通 PINN 相同：

$$
MSE_{u_q}
=\frac{1}{N_{u_q}}\sum_i
\left|u^{(i)}-u_{\theta_q}(\mathbf{x}^{(i)}_{u_q})\right|^2,
$$

$$
MSE_{F_q}
=\frac{1}{N_{F_q}}\sum_i
\left|\mathcal{F}[u_{\theta_q}](\mathbf{x}^{(i)}_{F_q})\right|^2.
$$

真正的新增部分是接口条件。对相邻子域 \(q\) 和 \(q^+\)，接口平均解为：

$$
u_{avg}(\mathbf{x})
=\frac{u_{\theta_q}(\mathbf{x})+u_{\theta_{q^+}}(\mathbf{x})}{2},
\qquad \mathbf{x}\in\Gamma_{q,q^+}.
$$

XPINNs 让每一侧的解贴近该平均值，并让两侧 PDE 残差一致：

$$
MSE_{uavg}
=\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|u_{\theta_q}(\mathbf{x}^{(i)}_{I_q})-u_{avg}(\mathbf{x}^{(i)}_{I_q})\right|^2,
$$

$$
MSE_R
=\sum_{q^+}\frac{1}{N_{I_q}}\sum_i
\left|
\mathcal{F}[u_{\theta_q}](\mathbf{x}^{(i)}_{I_q})
-\mathcal{F}[u_{\theta_{q^+}}](\mathbf{x}^{(i)}_{I_q})
\right|^2.
$$

> 💡 关键：\(MSE_{uavg}\) 主要保证 \(C^0\) 意义下的解连续；\(MSE_R\) 让相邻子域在接口处满足同一个 PDE 残差结构。两者合起来既传递数值信息，又传递物理约束。

这种设计带来的优势不是简单“把网络拆小”。第一，每个子网络只学习局部函数，困难区域可以用更深/更宽网络、更多残差点或不同激活函数，平滑区域可保持轻量。第二，子域内部训练几乎独立，适合多 GPU/多进程并行；接口通信只发生在 \(\Gamma_{q,q^+}\) 上。第三，接口残差项不需要法向通量，因此比 cPINN 更容易用于非守恒 PDE、复杂曲面接口或动态接口。

反问题也能自然处理。如果 PDE 中含未知参数 \(\lambda\)，只需把 \(\lambda\) 放入优化变量集合，残差变为 \(\mathcal{F}[u_{\theta_q};\lambda]\)，接口和子域损失的结构保持不变。因此 XPINNs 的本质不是更换 PINN 的自动微分物理监督，而是把一个全局物理优化问题改写成多个局部优化问题加接口协调条件。

#### 🧪 练习题

```yaml
question: "XPINNs 相比 cPINN 和普通 PINN 的关键扩展是什么？"
options:
  - "只把全域残差点数量增加到原来的数倍"
  - "用多个子域 PINN 和接口上的平均解连续、残差连续项拼接任意空间-时间域"
  - "把所有 PDE 改写成守恒律并强制法向通量连续"
  - "取消 PDE 残差项，只使用边界数据监督"
answer: 1
explain: "XPINNs 的核心是通用域分解：每个子域有独立 PINN，接口用解连续和 PDE 残差连续连接；这使其不局限于守恒律或规则空间切分。"
```
