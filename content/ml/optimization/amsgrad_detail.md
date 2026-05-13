### AMSGrad

```yaml
id: amsgrad
name: AMSGrad
full_name: AMSGrad
year: '2018'
org: Google/CMU
paper_url: https://arxiv.org/abs/1904.09237
category: adaptive
parent: adam
motivation: 维护二阶矩最大值修复Adam收敛漏洞
```

#### 📝 一句话总结

AMSGrad 通过维护二阶矩估计的历史最大值（而非直接使用当前指数移动平均）来归一化梯度，修复了 Adam 在特定凸优化问题中因学习率非单调递减而导致的收敛失败问题，提供了理论上有保证的收敛性。

#### 🎯 核心要点

- **Adam 收敛缺陷的理论证明**：构造了一个简单的一维凸优化反例，证明 Adam 的 regret 不趋于零，即 \(R_T/T \nrightarrow 0\)
- **根因分析**：Adam 的指数移动平均导致关键量 \(\Gamma_t = \frac{\sqrt{V_{t+1}}}{\alpha_{t+1}} - \frac{\sqrt{V_t}}{\alpha_t}\) 可能为负，即学习率可能非单调递增，违反收敛所需的正定性条件
- **核心修复机制**：引入 \(\hat{v}_t = \max(\hat{v}_{t-1}, v_t)\)，维护二阶矩的逐元素历史最大值，确保有效学习率单调不增
- **保持 Adam 的计算效率**：时间和空间复杂度与 Adam 相同，仅多维护一个 \(\hat{v}\) 向量
- **理论收敛保证**：在凸设置下证明了 \(O(\sqrt{T})\) 的 regret bound，条件为 \(\gamma = \beta_1/\sqrt{\beta_2} < 1\)
- **"长期记忆"设计哲学**：指出自适应方法需要对历史梯度保持长期记忆才能保证收敛，而非仅依赖近期窗口

#### 🔬 深入细节

![AMSGrad 算法伪代码](https://ar5iv.labs.arxiv.org/html/1904.09237/assets/x1.png)
*图：论文中 Adam 与 AMSGrad 在反例函数上的收敛行为对比*

##### 算法伪代码

```python
# AMSGrad 算法
# 输入: x_1, 学习率 {α_t}, 动量参数 {β_1t}, β_2
# 初始化: m_0 = 0, v_0 = 0, v_hat_0 = 0

for t in range(1, T+1):
    g_t = ∇f_t(x_t)                          # 计算梯度
    m_t = β_1t * m_{t-1} + (1 - β_1t) * g_t  # 一阶矩估计（动量）
    v_t = β_2 * v_{t-1} + (1 - β_2) * g_t**2 # 二阶矩估计
    v_hat_t = max(v_hat_{t-1}, v_t)           # ★ 关键：取历史最大值
    x_{t+1} = Π_F(x_t - α_t * m_t / sqrt(v_hat_t))  # 参数更新
```

##### 动机与背景：Adam 为何会发散？

Adam 及 RMSprop 等自适应学习率方法使用指数移动平均（EMA）来估计梯度的二阶矩：

$$v_t = \beta_2 v_{t-1} + (1 - \beta_2) g_t^2$$

这种设计的初衷是让算法只关注近期梯度信息，避免 Adagrad 中学习率因累积所有历史梯度而过快衰减的问题。然而，EMA 引入了一个致命缺陷：**学习率可能在某些步骤突然增大**。

具体而言，收敛分析依赖于以下关键量为正半定：

$$\Gamma_{t+1} = \frac{\sqrt{V_{t+1}}}{\alpha_{t+1}} - \frac{\sqrt{V_t}}{\alpha_t}$$

对于 SGD 和 Adagrad，\(\Gamma_t \succeq 0\) 天然成立（学习率单调不增）。但对于 Adam，当某一步梯度较小时，\(v_t\) 会因 EMA 衰减而减小，导致 \(\Gamma_t\) 为负——即学习率反而增大了。

##### Adam 的反例构造

论文构造了一个精巧的一维凸优化问题，定义域 \(\mathcal{F} = [-1, 1]\)：

$$f_t(x) = \begin{cases} Cx, & \text{若 } t \bmod 3 = 1 \\ -x, & \text{其他} \end{cases}$$

其中 \(C > 2\)。最优解显然是 \(x^* = -1\)（因为总梯度 \(C - 2 > 0\)）。

设 \(\beta_1 = 0\)，\(\beta_2 = 1/(1 + C^2)\)。直觉上：
1. 每 3 步中有 1 步观察到大梯度 \(C\)（方向正确，推向 \(-1\)）
2. 另外 2 步观察到梯度 \(-1\)（方向错误，推向 \(+1\)）
3. 大梯度 \(C\) 本应主导更新方向，但由于 \(\beta_2\) 的选择，\(v_t\) 在大梯度出现时也很大（约 \(C^2\)），将其归一化后更新幅度仅约为 1
4. 而小梯度 \(-1\) 出现时 \(v_t\) 已衰减，归一化后的更新幅度反而更大

> ⚠️ 关键洞察：Adam 的 EMA 机制使得"信息量大的稀疏梯度"被过度压缩，而"噪声性的频繁梯度"被放大，最终导致算法收敛到错误方向。

**Theorem 1** 形式化证明了在此设置下 Adam 的平均 regret \(R_T/T \nrightarrow 0\)，即算法不收敛。

##### AMSGrad 的修复机制

AMSGrad 的核心修改只有一行：

$$\hat{v}_t = \max(\hat{v}_{t-1}, v_t)$$

用 \(\hat{v}_t\) 替代 \(v_t\) 进行归一化。这一简单修改带来了关键性质：

1. **学习率单调不增**：由于 \(\hat{v}_t \geq \hat{v}_{t-1}\)，有效学习率 \(\alpha_t / \sqrt{\hat{v}_t}\) 单调不增，确保 \(\Gamma_t \succeq 0\)
2. **保留自适应性**：不同坐标仍然有不同的学习率，保持了 Adam 的核心优势
3. **介于 Adam 和 Adagrad 之间**：当梯度稳定时，\(\hat{v}_t \approx v_t\)，行为接近 Adam；当梯度波动大时，\(\hat{v}_t\) 趋向累积最大值，行为更接近 Adagrad

##### 收敛性保证

**Theorem 4** 证明了 AMSGrad 在凸设置下的 regret bound：

$$R_T \leq \frac{D_\infty^2 \sqrt{T}}{\alpha(1-\beta_1)} \sum_{i=1}^d \hat{v}_{T,i}^{1/2} + \frac{\alpha\sqrt{1+\log T}}{(1-\beta_1)^2(1-\gamma)\sqrt{1-\beta_2}} \sum_{i=1}^d \|g_{1:T,i}\|_2$$

其中要求 \(\gamma = \beta_1/\sqrt{\beta_2} < 1\)。该 bound 具有数据依赖性，在稀疏梯度场景下可显著优于 SGD 的 \(O(\sqrt{dT})\) bound。

> 💡 关键：AMSGrad 的收敛保证不依赖于学习率递减调度（\(\alpha_t = \alpha/\sqrt{t}\) 即可），而 Adam 即使使用递减学习率也无法在上述反例中收敛。

##### 与 Adam 的对比

| 特性 | Adam | AMSGrad |
|------|------|---------|
| 二阶矩估计 | \(v_t = \beta_2 v_{t-1} + (1-\beta_2)g_t^2\) | 同左 + \(\hat{v}_t = \max(\hat{v}_{t-1}, v_t)\) |
| 归一化分母 | \(\sqrt{v_t}\) | \(\sqrt{\hat{v}_t}\) |
| 学习率单调性 | 非单调（可增可减） | 单调不增 |
| 理论收敛保证 | ❌ 存在反例 | ✅ \(O(\sqrt{T})\) regret |
| 额外存储 | 无 | 一个 \(\hat{v}\) 向量 |
| 实际表现 | 通常更快收敛 | 某些任务更稳定 |

#### 🧪 练习题

```yaml
question: "AMSGrad 相比 Adam 的核心修改是什么？"
options:
  - "使用更小的学习率 α"
  - "将一阶矩估计替换为梯度累积和"
  - "维护二阶矩估计的历史最大值用于归一化"
  - "增加 bias correction 步骤"
answer: 2
explain: "AMSGrad 的唯一核心修改是 v̂_t = max(v̂_{t-1}, v_t)，即用二阶矩的历史最大值替代当前值进行归一化，确保学习率单调不增，从而修复 Adam 的收敛缺陷。"
```