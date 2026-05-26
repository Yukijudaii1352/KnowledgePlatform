### ALIAS

```yaml
id: alias
name: ALIAS
full_name: 自动局部逐步步长近似 (ALIAS)
year: '2026'
org: BRAIn Lab / Yandex Research
paper_url: https://arxiv.org/abs/2506.03725
category: frontier
parent: adam
motivation: 为Sign-SGD提供无需调参的局部步长自适应
```

#### 📝 一句话总结
ALIAS 为 Sign-SGD 设计了一个真正无参数的步长选择机制：它一边在线估计全局尺度项和局部 \(L_\infty\) 光滑度，一边自动设置每一步的符号更新步长，从而去掉人工学习率搜索。论文还给出了带动量的 Adam-style 变体，使 Sign-SGD 在大模型预训练中接近甚至优于精调基线。

#### 🎯 核心要点
- 以经典 Sign-SGD 的收敛上界为出发点，目标是消除其中对未知 \(\Delta^\*\) 和 \(L_\infty\) 的依赖。
- 提出主算法 ALIAS：在线累积局部平滑度估计 \(\eta_t\)，再令 \(\lambda_t = 1/\sqrt{\eta_t}\) 作为步长分母。
- 提供两种全局尺度估计方式：Option I 用递增序列 \(d_t\) 近似 \(\Delta^\* = f(x_0)-f(x^\*)\)；Option II 直接用 \(f(x_0)-\underline f\)。
- 主更新仍保持 Sign-SGD 结构：\(x_{t+1} = x_t - \gamma_t \,\mathrm{sign}(\nabla f(x_t))\)，因此额外内存开销很低。
- 扩展到随机梯度与分布式学习场景，并给出带一阶/二阶动量的 Adam-style ALIAS 版本。
- 在 LLaMA 130M/350M 预训练和 Swin Transformer 微调中，ALIAS 在免调参前提下匹配 tuned Sign-SGD，并接近或超过 AdamW/Prodigy。

#### 🔬 深入细节
![ALIAS 算法流程示意图](https://quickchart.io/graphviz?graph=digraph%7Brankdir%3DTB%3B%20node%20%5Bshape%3Dbox%2C%20style%3Drounded%5D%3B%20A%5Blabel%3D%22Gradient%20at%20x_t%22%5D%3B%20B%5Blabel%3D%22Smoothness%20accumulator%0Aeta_t%3Deta_%7Bt-1%7D%2B%7C%7Cg_t-g_%7Bt-1%7D%7C%7C_1%2F%7C%7Cx_t-x_%7Bt-1%7D%7C%7C_inf%22%5D%3B%20C%5Blabel%3D%22lambda_t%20%3D%201%2Fsqrt%28eta_t%29%22%5D%3B%20D%5Blabel%3D%22Global%20scale%20estimate%0Ad_t%20or%20f%28x_0%29-f_low%22%5D%3B%20E%5Blabel%3D%22Set%20stepsize%20gamma_t%22%5D%3B%20F%5Blabel%3D%22Sign%20step%0Ax_%7Bt%2B1%7D%3Dx_t-gamma_t%20sign%28g_t%29%22%5D%3B%20G%5Blabel%3D%22Optional%20momentum%20%2F%20Adam-style%20ALIAS%22%5D%3B%20A-%3EB-%3EC-%3EE%3B%20A-%3ED-%3EE%3B%20E-%3EF-%3EG%3B%7D)
*图：根据论文 Algorithm 2/3 整理的 ALIAS 主流程。核心思想是把 Sign-SGD 的未知最优步长拆成“全局尺度项”和“局部曲率项”，并分别在线估计。*

```python
# Algorithm 2: ALIAS (deterministic version)
eta_prev = 0.0
d = d0

for t in range(T):
    g_t = grad(x_t)
    if t > 0:
        eta_t = eta_prev + l1_norm(g_t - g_prev) / linf_norm(x_t - x_prev)
        lambda_t = 1.0 / sqrt(eta_t)
        d_tilde = sum(gamma_i * dot(grad(x_{i+1}), sign(grad(x_i))) for i in range(t))
        d = max(d, d_tilde)   # Option I
    else:
        eta_t = eta_prev
        lambda_t = 1.0 / sqrt(max(eta_t, 1e-12))

    gamma_t = lambda_t * sqrt(d)              # Option I
    # gamma_t = lambda_t * sqrt(f(x0) - f_low)  # Option II
    x_next = x_t - gamma_t * sign(g_t)

    x_prev, g_prev = x_t, g_t
    x_t = x_next
    eta_prev = eta_t
```

ALIAS 的出发点是 Sign-SGD 的经典收敛界。对精确梯度情形，论文回顾了如下上界：
$$
\frac{1}{T}\sum_{t=0}^{T-1}\|\nabla f(x_t)\|_1 \le \frac{\Delta^\*}{\gamma T} + \frac{\gamma L_\infty}{2},
$$
其中 \(\Delta^\* = f(x_0)-f(x^\*)\)，\(L_\infty\) 是相对于 \(\|\cdot\|_\infty\) 的光滑常数。最优固定步长满足
$$
\gamma^\* \asymp \sqrt{\frac{\Delta^\*}{L_\infty T}},
$$
但这需要事先知道两个现实里通常未知的量：全局函数间隙 \(\Delta^\*\) 和局部光滑度 \(L_\infty\)。ALIAS 的核心就是把这两个量拆开，各自在线近似。

论文对分母部分采用了“局部 \(L_\infty\) 曲率累计”的思路。它先定义
$$
\eta_t = \eta_{t-1} + \frac{\|\nabla f(x_t)-\nabla f(x_{t-1})\|_1}{\|x_t-x_{t-1}\|_\infty},
\qquad
\lambda_t = \frac{1}{\sqrt{\eta_t}}.
$$
直觉上，\(\eta_t\) 越大，说明最近几步观察到的局部梯度变化越剧烈，步长就该更保守；因此用 \(\lambda_t\) 作为步长分母与 AdaGrad-Norm 的“累积后再开根号衰减”是同一类想法，只不过这里累积的不是梯度范数，而是更直接反映局部平滑性的有限差分比值。

对分子部分，ALIAS 给了两种方案。Option I 用
$$
\widetilde d_t = \sum_{i=0}^{t-1} \gamma_i \langle \nabla f(x_{i+1}), \operatorname{sign}(\nabla f(x_i)) \rangle,
\qquad
d_t = \max(d_{t-1}, \widetilde d_t),
$$
把它作为 \(\Delta^\*\) 的递增近似；Option II 则更实用，直接使用 \(f(x_0)-\underline f\)，其中 \(\underline f \le f(x^\*)\) 是一个已知下界。在很多经验风险最小化问题里，\(\underline f = 0\) 就够用了。于是主步长写成
$$
\gamma_t = \lambda_t \sqrt{d_t}
\quad \text{或} \quad
\gamma_t = \lambda_t \sqrt{f(x_0)-\underline f}.
$$
这样一来，ALIAS 每一步都能同时根据局部曲率和全局剩余尺度自动调节步长，而不需要单独搜索学习率。

论文还把这套机制扩展到了更实用的设置。随机梯度版本用相邻两次 stochastic gradient 近似局部 \(L_\infty\)；带动量的 Algorithm 3 则引入类似 Adam 的一阶、二阶指数滑动平均，但最终仍以 sign 方向作为主更新方向。这个 Adam-style ALIAS 的形式可写为
$$
m_{t+1} = \beta_1 m_t + (1-\beta_1)d_t g_t,\qquad
v_{t+1} = \beta_2 v_t + (1-\beta_2)d_t^2 g_t^2,
$$
并配合符号化方向和归一化因子执行更新。作者在实验中发现，正是这个“参数自由的尺度估计 + sign 方向 + 动量归一化”的组合，让 ALIAS 在大模型训练里摆脱了必须人工网格搜索学习率的痛点。

> 💡 关键：ALIAS 不是重新设计一个全新优化方向，而是保留 Sign-SGD 的低内存符号更新，只把“步长从哪里来”这件事彻底自动化。

> ⚠️ 注意：论文的理论主结果仍以“找到 near-stationary point”为目标，因此复杂度形式仍是 Sign-SGD 一类方法常见的 \(O(1/\varepsilon^2)\) 级别；它的主要贡献在于去掉未知超参数，而不是把阶数改写成更快的凸优化上界。

#### 🧪 练习题
```yaml
question: "ALIAS 中的 \\(\\lambda_t = 1/\\sqrt{\\eta_t}\\) 主要在做什么？"
options:
  - "为每个坐标学习独立的二阶矩统计"
  - "根据累计的局部平滑度估计自动缩放步长"
  - "把 Sign-SGD 改写成标准梯度下降"
  - "直接近似最优解 \\(x^*\\) 的位置"
answer: 1
explain: "ALIAS 将局部梯度差分比值累积到 \\(\\eta_t\\) 中，再用 \\(1/\\sqrt{\\eta_t}\\) 作为步长分母，从而根据局部曲率自动调节更新尺度。"
```
