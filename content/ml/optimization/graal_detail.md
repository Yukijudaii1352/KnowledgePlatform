### GRAAL

```yaml
id: graal
name: GRAAL
full_name: Nesterov加速 GRAAL (Accelerated GRAAL)
year: '2026'
org: Yandex Research / HSE
paper_url: https://arxiv.org/abs/2507.09823
category: frontier
parent: nag
motivation: 将Nesterov加速与局部曲率自适应真正结合
```

#### 📝 一句话总结
GRAAL 把 Nesterov 加速、GRAAL 式外推和局部曲率自适应步长统一进同一个算法，在不做 line search 和超参搜索的前提下，实现了接近最优的凸优化收敛复杂度。它的关键突破是设计出可实现的耦合系数与几何增长步长规则，使“加速”和“自适应”不再互相掣肘。

#### 🎯 核心要点
- 提出 Accelerated GRAAL：在原始 GRAAL 的外推结构上显式加入 Nesterov acceleration/STM 混合步骤。
- 使用基于 Bregman 距离的局部曲率估计器 \( \Lambda(x; z) = 2D_f(x;z)/\|\nabla f(x)-\nabla f(z)\|^2 \)。
- 通过额外的 coupling step 引入 \(\beta_k\)，避免直接设定 \(\alpha_k\) 时对未来步长的循环依赖。
- 自适应步长规则 \( \eta_{k+1} = \min\{(1+\gamma)\eta_k,\; \nu H_{k-1}\lambda_{k+1}/\eta_{k-1}\} \) 支持几何级数式增长，而不是只能 \(1+1/k\) 地缓慢增长。
- 对 \(L\)-smooth 目标给出近最优复杂度 \(O(1+\sqrt{L\|x_0-x^\*\|^2/\varepsilon}+\log(1/\eta_0L))\)。
- 对更一般的 \((L_0, L_1)\)-smooth 目标也给出自适应理论保证，这是它比 AC-FGM、AdaNAG 更强的地方。

#### 🔬 深入细节
![GRAAL 算法流程示意图](https://quickchart.io/graphviz?graph=digraph%7Brankdir%3DTB%3B%20node%20%5Bshape%3Dbox%2C%20style%3Drounded%5D%3B%20A%5Blabel%3D%22Current%20x_k%20and%20tilde%20x_k%22%5D%3B%20B%5Blabel%3D%22Gradient%20step%0Ax_%7Bk%2B1%7D%3Dx_k-eta_k%20nabla%20f%28tilde%20x_k%29%22%5D%3B%20C%5Blabel%3D%22Coupling%20with%20beta_k%22%5D%3B%20D%5Blabel%3D%22GRAAL%20extrapolation%0Ahat%20x_%7Bk%2B1%7D%3Dx_%7Bk%2B1%7D%2Btheta%28x_%7Bk%2B1%7D-x_k%29%22%5D%3B%20E%5Blabel%3D%22Nesterov%20mixing%0Atilde%20x_%7Bk%2B1%7D%3Dalpha%20hat%20x%20%2B%281-alpha%29x%22%5D%3B%20F%5Blabel%3D%22Local%20curvature%20estimate%20lambda_%7Bk%2B1%7D%22%5D%3B%20G%5Blabel%3D%22Adaptive%20stepsize%20eta_%7Bk%2B1%7D%22%5D%3B%20A-%3EB-%3EC-%3ED-%3EE-%3EF-%3EG%3B%7D)
*图：根据论文 Algorithm 1 整理的 Accelerated GRAAL 主循环。它不是简单把 Nesterov 动量硬拼到 GRAAL 上，而是通过 \(\alpha_k,\beta_k,H_k\) 的联动设计，把可实现性和自适应性同时保住。*

```python
# Algorithm 1: Accelerated GRAAL
alpha = beta = 1.0
H = H_prev = eta_prev = eta0
tilde_x = x = x0

for k in range(K):
    alpha_next = (1 + gamma) * eta / (H + (1 + gamma) * eta)
    x_grad = x - eta * grad(tilde_x)
    x_next = beta * tilde_x + (1 - beta) * x_grad
    hat_x_next = x_next + theta * (x_next - x)
    tilde_x_next = alpha_next * hat_x_next + (1 - alpha_next) * x_next

    lambda_next = min(Lambda(x_next, tilde_x), Lambda(x_next, tilde_x_next))
    eta_next = min((1 + gamma) * eta, nu * H_prev * lambda_next / eta_prev)
    H_next = H + eta_next
    beta_next = eta_next / (alpha_next * H_next)

    x, tilde_x = x_next, tilde_x_next
    eta_prev, eta, H_prev, H = eta, eta_next, H, H_next
    beta = beta_next
```

GRAAL 的问题背景很明确：经典梯度下降和 Nesterov 加速都能给出漂亮的理论复杂度，但都要提前知道全局 Lipschitz 常数 \(L\)；而原始 GRAAL/AdGD 虽然能根据局部曲率自动调步长，却没有把 Nesterov 加速真正做进来。论文的核心问题因此变成一句话：能不能既保留 GRAAL 的“局部曲率自适应”，又达到加速方法的 \(O(\sqrt{L/\varepsilon})\) 级别复杂度？

作者的第一个关键设计是局部曲率估计器。对凸目标，定义 Bregman 距离
$$
D_f(x;z)=f(x)-f(z)-\langle \nabla f(z), x-z\rangle,
$$
然后用
$$
\Lambda(x; z)=
\begin{cases}
\dfrac{2D_f(x;z)}{\|\nabla f(x)-\nabla f(z)\|^2}, & \nabla f(x)\neq \nabla f(z),\\[6pt]
\infty, & \nabla f(x)=\nabla f(z)
\end{cases}
$$
近似“当前区域的逆 Lipschitz 常数”。这比原始 GRAAL 在更一般 VI 场景使用的距离比值更适合纯优化问题，因为它直接利用了目标函数的凸结构和 Bregman 几何。

第二个关键设计是把 Nesterov 加速真正接到自适应框架里。论文不是直接用预设的 \(\alpha_k \propto 2/(k+2)\)，而是引入了三层变量：普通点 \(x_k\)、外推点 \(\hat x_k\)、以及混合点 \(\tilde x_k\)。其中
$$
\hat x_{k+1}=x_{k+1}+\theta(x_{k+1}-x_k),
\qquad
\tilde x_{k+1}=\alpha_{k+1}\hat x_{k+1}+(1-\alpha_{k+1})x_{k+1}.
$$
如果只照搬标准 Nesterov 推导，会遇到 \(\alpha_k\) 依赖未来步长、而未来步长又依赖当前曲率估计的循环依赖问题。为解决这一点，作者额外插入 coupling step
$$
x_{k+1}=\beta_k\tilde x_k + (1-\beta_k)x_k,
$$
并设置
$$
\beta_k=\frac{\eta_k}{\alpha_k H_k},\qquad H_k=\sum_{i=0}^k \eta_i.
$$
这一步是整篇论文最核心的结构性创新，因为它把“可实现的 Nesterov 混合系数”和“自适应步长累计量”绑在了一起。

第三个关键设计是步长规则本身：
$$
\eta_{k+1}=\min\left\{(1+\gamma)\eta_k,\; \frac{\nu H_{k-1}\lambda_{k+1}}{\eta_{k-1}}\right\}.
$$
第一项允许步长以几何速度增长，第二项则由局部曲率估计器 \(\lambda_{k+1}\) 控制，防止过冲。相比 AC-FGM 和 AdaNAG 只能满足 \(\eta_{k+1}\le (1+1/k)\eta_k\) 之类的缓慢增长，这个几何增长上限是 GRAAL 真正具备“从很小初始步长快速恢复”的原因。作者也正是借此证明了：即使 \(\eta_0\) 取得非常小，额外代价也只会落在一个对数项上。

论文的理论结果分两层。一般凸连续可微情形下，Theorem 1 给出势函数单调下降：
$$
\Psi_{k+1}(x)\le \Psi_k(x) - \frac{\gamma\theta}{2}\eta_k^2\|\nabla f(\tilde x_k)\|^2
 - \frac{1}{4(1+\gamma)}\eta_k D_f(x_k;\tilde x_k).
$$
在 \(L\)-smooth 情形下，Corollary 2 进一步给出
$$
K = O\!\left(1+\sqrt{\frac{L\|x_0-x^\*\|^2}{\varepsilon}}+\ln\frac{1}{\eta_0L}\right),
$$
而对更一般的 \((L_0,L_1)\)-smooth 目标，又得到
$$
K = O\!\left(1+\sqrt{\frac{L_0D^2}{\varepsilon}} + L_1^3D^3 + (1+L_1^2D^2)\ln\frac{1}{\eta_0L_0}\right),
$$
其中 \(D=O(\|x_0-x^\*\|)\)。这说明它不仅在标准平滑凸优化里接近最优，而且在更贴近深度学习实践的“梯度越大 Hessian 也可能越大”的广义平滑模型下，依然保持自适应优势。

> 💡 关键：GRAAL 最重要的不是“又一个动量法”，而是证明了局部曲率自适应和 Nesterov 加速可以在一个可实现、可证明的算法里兼得。

> ⚠️ 注意：论文里真正加速的是“自适应基线算法”而不是普通 GD，因此 \(\alpha_k,\beta_k,H_k\) 三者的耦合关系是不能随便删的；删掉 coupling step 后，理论闭环就会断。

#### 🧪 练习题
```yaml
question: "GRAAL 相比 AC-FGM / AdaNAG 的一个关键优势是什么？"
options:
  - "它完全不需要梯度信息，只依赖函数值"
  - "它把步长增长限制在 \\(1+1/k\\)，因此更稳定"
  - "它允许步长按几何速度增长，因此能从过小的初始步长中快速恢复"
  - "它把凸优化问题直接转成二阶牛顿法"
answer: 2
explain: "Accelerated GRAAL 的步长上界是 \\((1+\\gamma)\\eta_k\\)，而不是 \\((1+1/k)\\eta_k\\)。这种几何增长能力正是它保持自适应性的核心。"
```
