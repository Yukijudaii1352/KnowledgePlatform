### LNO

```yaml
id: lno
name: LNO
full_name: 拉普拉斯神经算子 (Laplace Neural Operator)
year: '2023'
org: DeepMind
paper_url: https://arxiv.org/abs/2303.10528
category: operators
parent: fno
motivation: 拉普拉斯变换处理非周期信号
```

#### 📝 一句话总结

LNO 将 FNO 的傅里叶域卷积核替换为拉普拉斯域的极点-留数参数化，显式同时建模瞬态响应和稳态响应，解决 FNO 在非周期、无阻尼和强瞬态 ODE/PDE 问题上泛化不足的问题。

#### 🎯 核心要点

- **拉普拉斯域算子层**：用 \(U(s)=K_\phi(s)V(s)\) 表示卷积算子，将核函数直接放在拉普拉斯域学习
- **极点-留数参数化**：令 \(K_\phi(s)=\sum_{n=1}^{N}\frac{\beta_n}{s-\mu_n}\)，把系统极点 \(\mu_n\) 和留数 \(\beta_n\) 作为可训练参数
- **瞬态/稳态分解**：输出由系统极点产生的瞬态项 \(\sum_n\gamma_n e^{\mu_n t}\) 和输入频率产生的稳态项 \(\sum_\ell\lambda_\ell e^{i\omega_\ell t}\) 组成
- **相对 FNO 的关键差异**：FNO 只在 \(i\omega\) 频率轴上学习稳态响应，LNO 通过 \(s=\sigma+i\omega\) 引入指数收敛/衰减因子，适合非周期与不稳定信号
- **单层替代多层频谱模块**：论文用一个 Laplace layer 对比四个 Fourier module，在 Duffing 振子、受迫摆、Lorenz 系统、Euler-Bernoulli 梁、扩散方程和反应-扩散系统上验证
- **可解释性更强**：学习到的 \(\mu_n,\beta_n\) 可对应动力系统的模态、阻尼/增长和响应强度，而不仅是黑箱频率权重
- **主要局限**：当输入代表初始条件而非外力/源项时，卷积积分的物理含义减弱，极点-留数形式不一定显著优于 FNO

#### 🔬 深入细节

![LNO 架构示意图](https://media.springernature.com/m312/springer-static/image/art%3A10.1038%2Fs42256-024-00844-4/MediaObjects/42256_2024_844_Fig1_HTML.png)
*图：LNO 的整体架构与 Laplace layer。arXiv 预印本的对应图为 Figure 1，源文件为 `figure/LNO4.pdf`；Nature Machine Intelligence 版本提供了公开图片直链。*

##### 算法伪代码

```python
# LNO Laplace layer 的核心计算（简化版）
def lno_forward(f_t):
    # 1. Lift: 输入函数 f(t) 升维为 latent 表示 v(t)
    v_t = P(f_t)

    # 2. 将 v(t) 分解为输入频率极点 i*omega_l 与留数 alpha_l
    alpha, omega = fft_coefficients(v_t)

    # 3. 可训练的系统极点与留数
    mu = trainable_system_poles          # [N]
    beta = trainable_system_residues     # [N]

    # 4. 系统极点处的瞬态留数 gamma_n = beta_n * V(mu_n)
    V_mu = sum_over_l(alpha_l / (mu_n - 1j * omega_l))
    gamma = beta * V_mu
    transient = sum_over_n(gamma_n * exp(mu_n * t_grid))

    # 5. 输入频率处的稳态留数 lambda_l = alpha_l * K_phi(i omega_l)
    K_iw = sum_over_n(beta_n / (1j * omega_l - mu_n))
    lam = alpha * K_iw
    steady = ifft_from_coefficients(lam, omega)

    # 6. 局部线性变换 + 非线性 + projection
    u_t = activation(transient + steady + W(v_t))
    return Q(u_t)

for f_batch, u_batch in dataloader:
    pred = lno_forward(f_batch)
    loss = relative_l2(pred, u_batch)
    loss.backward()
    optimizer.step()
```

##### 动机与背景

FNO 的核心假设是把卷积核放到傅里叶域中学习，即沿纯虚频率轴 \(i\omega\) 做频谱乘法。这个设计在周期边界、稳态振荡或规则网格上很有效，但对两类动力学会吃亏：一类是非周期或不绝对可积的信号，另一类是无阻尼系统中的长瞬态响应。傅里叶变换没有显式的指数衰减/增长因子，也不自然包含初始值影响，因此容易把瞬态部分当成需要多层网络“补出来”的误差。

LNO 的核心变化是从傅里叶变量 \(i\omega\) 扩展到拉普拉斯变量 \(s=\sigma+i\omega\)。这里 \(\sigma\) 提供指数收敛因子，使模型可以表示衰减、增长和短时瞬态。直觉上，FNO 学的是“频率响应”，而 LNO 学的是“系统模态响应”：每个极点 \(\mu_n\) 对应一个模态，每个留数 \(\beta_n\) 控制这个模态对输入的响应强度。

##### 核心机制

LNO 仍然遵循神经算子的 lift-operator-project 框架。输入函数 \(\mathbf f(t)\) 先经浅层网络 \(\mathcal{P}\) 升维为 \(v(t)\)，再经过 Laplace layer 与局部线性变换 \(W\)，最后由 \(\mathcal{Q}\) 投影回目标维度：

$$
\mathbf u(t)=\sigma\left((\kappa(\mathbf f;\phi)*v)(t)+\mathbf W v(t)\right)
$$

其中卷积核积分为：

$$
(\kappa(\mathbf f;\phi)*v)(t)=\int_D\kappa_{\phi}(t-\tau)v(\tau)\,d\tau
$$

对卷积项做拉普拉斯变换，得到：

$$
U(s)=K_\phi(s)V(s)
$$

LNO 不像 FNO 那样直接学习一组离散频点的 \(K_\phi(i\omega)\)，而是把 \(K_\phi(s)\) 写成极点-留数形式：

$$
K_\phi(s)=\sum_{n=1}^{N}\frac{\beta_n}{s-\mu_n}
$$

这里 \(\mu_n\) 和 \(\beta_n\) 是网络训练参数。若输入 latent 信号写成傅里叶级数：

$$
v(t)=\sum_{\ell=-\infty}^{\infty}\alpha_\ell e^{i\omega_\ell t}
$$

则其拉普拉斯变换为：

$$
V(s)=\sum_{\ell=-\infty}^{\infty}\frac{\alpha_\ell}{s-i\omega_\ell}
$$

二者相乘后，输出 \(U(s)\) 同时具有系统极点 \(\mu_n\) 和输入激励极点 \(i\omega_\ell\)。通过留数定理可得：

$$
\gamma_n=\beta_n V(\mu_n), \qquad
\lambda_\ell=\alpha_\ell K_\phi(i\omega_\ell)
$$

逆拉普拉斯变换给出时间域输出：

$$
u_1(t)=\sum_{n=1}^{N}\gamma_n e^{\mu_n t}
+\sum_{\ell=-\infty}^{\infty}\lambda_\ell e^{i\omega_\ell t}
$$

> 💡 关键：第一项是由系统极点决定的瞬态响应，第二项是由输入频率决定的稳态响应。FNO 主要覆盖第二项，LNO 显式加入第一项。

##### 训练与数据流

训练数据仍是算子学习常见的输入-输出函数对 \(\{(\mathbf f_j,\mathbf u_j)\}_{j=1}^{N}\)。论文中的主要任务是学习外力/源项到响应函数的映射，例如 \(f(t)\rightarrow x(t)\) 或 \(f(x,t)\rightarrow y(x,t)\)。损失通常采用相对 \(\mathcal{L}_2\) 误差：

$$
\mathcal{L}_{rel}=
\frac{\|\mathcal{G}_\theta(\mathbf f)-\mathbf u\|_2}{\|\mathbf u\|_2}
$$

训练过程中，FFT 仍用于获得输入的 \(\alpha_\ell,\omega_\ell\)，但核函数不再只是一组傅里叶权重，而是由 \(\mu_n,\beta_n\) 计算出来。这样做把“如何响应某个输入频率”和“系统自身有哪些衰减/增长模态”拆开了。

##### 与 FNO 的区别

| 方面 | FNO | LNO |
|------|-----|-----|
| 核参数 | \(K_\phi(i\omega_\ell)\) | \((\mu_n,\beta_n)\) |
| 域 | 傅里叶频域 | 拉普拉斯复平面 |
| 主要响应 | 稳态/周期响应 | 瞬态 + 稳态响应 |
| 对非周期信号 | 需要网络间接拟合 | 由 \(\sigma+i\omega\) 更自然表示 |
| 可解释性 | 频谱权重 | 极点、留数、模态贡献 |

论文结果显示，在无阻尼 Duffing 振子、无阻尼受迫摆等强瞬态场景，LNO 相比 FNO 的优势最明显；在 Euler-Bernoulli 梁和扩散方程这类线性算子上，极点-留数结构几乎直接对应解析响应，因此误差可比 FNO 低一个到两个数量级。反应-扩散系统是非线性的，LNO 仍然通过可训练极点/留数获得更小误差，但优势来自有用的归纳偏置，而不是严格解析等价。

#### 🧪 练习题

```yaml
question: "LNO 相比 FNO 的核心改动是什么？"
options:
  - "把所有卷积层替换为普通全连接层"
  - "在拉普拉斯域用可训练极点和留数参数化核函数，同时表示瞬态与稳态响应"
  - "只使用更多 Fourier modes 来提升高频分辨率"
  - "用图神经网络处理不规则网格"
answer: 1
explain: "LNO 的关键是将核函数写为 K_phi(s)=sum beta_n/(s-mu_n)，系统极点产生瞬态项，输入频率产生稳态项，从而补足 FNO 对瞬态/非周期信号的短板。"
```
