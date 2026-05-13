### Long Short-Term Memory (LSTM)

```yaml
id: lstm
name: LSTM
full_name: 长短期记忆网络 (Long Short-Term Memory)
year: 1997
org: TU Munich (Hochreiter & Schmidhuber)
paper_url: —
category: deep_rep
parent: —
motivation: 门控机制解决长程依赖
```

#### 📝 一句话总结

LSTM 通过引入具有恒定误差流（Constant Error Carrousel, CEC）的记忆单元及输入/输出门控机制，从根本上解决了传统 RNN 中梯度指数级衰减/爆炸导致无法学习长程依赖的问题，能够桥接超过 1000 步的时间间隔。

#### 🎯 核心要点

- **恒定误差流（CEC）**：记忆单元内部采用自连接权重为 1 的线性单元，确保误差信号在时间维度上既不衰减也不爆炸
- **输入门（Input Gate）**：学习何时允许新信息写入记忆单元，保护 CEC 免受无关输入的干扰
- **输出门（Output Gate）**：学习何时允许记忆内容输出到网络其他部分，防止当前无关的记忆内容扰乱后续计算
- **记忆单元块（Memory Cell Blocks）**：多个记忆单元共享同一对输入/输出门，减少参数量并提高计算效率
- **截断 BPTT 学习算法**：仅在单元内部保持完整梯度流，截断跨单元的梯度传播，实现 \(O(W)\) 时间复杂度（W 为权重总数）

#### 🔬 深入细节

![LSTM 记忆单元架构示意图](https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/LSTM_Cell.svg/1200px-LSTM_Cell.svg.png)
*图：LSTM 记忆单元架构（注：此图为含遗忘门的现代扩展版本，原始 1997 版本不含遗忘门）*

```python
# LSTM 前向传播伪代码（原始 1997 版本，无遗忘门）
# 假设单个记忆单元块含 S_c 个单元

for t in range(1, T+1):
    # --- 输入门激活 ---
    net_in[t] = sum(w_in_j * y_j[t-1] for j in all_sources)
    y_in[t] = sigmoid(net_in[t])  # f_in: [0,1] 的挤压函数

    # --- 记忆单元状态更新 ---
    for c in range(S_c):
        net_c[c][t] = sum(w_c_j * y_j[t-1] for j in all_sources)
        # CEC 核心：状态自连接 + 门控输入
        s_c[c][t] = s_c[c][t-1] + y_in[t] * g(net_c[c][t])
        # s_c 保持恒定误差流：自连接权重 = 1

    # --- 输出门激活 ---
    net_out[t] = sum(w_out_j * y_j[t-1] for j in all_sources)
    y_out[t] = sigmoid(net_out[t])  # f_out: [0,1] 的挤压函数

    # --- 单元输出 ---
    for c in range(S_c):
        y_c[c][t] = y_out[t] * h(s_c[c][t])
        # h: 将状态压缩到 [-1, 1] 或 [-2, 2]
```

**动机与背景：梯度消失问题的本质**

传统 RNN 使用 BPTT（Back-Propagation Through Time）或 RTRL（Real-Time Recurrent Learning）进行训练时，误差信号在时间维度上反向传播会被连乘因子缩放。Hochreiter (1991) 的分析表明，从时刻 \(t\) 到时刻 \(t-q\) 的误差缩放因子为：

$$\frac{\partial \delta_v(t-q)}{\partial \delta_u(t)} = \prod_{m=1}^{q} f'_m(net_m(t-m)) \cdot w_{m,m-1}$$

当 \(q\) 增大时，若 \(|f'_m \cdot w_{m,m-1}| < 1\)，误差指数级衰减（梯度消失）；若 \(> 1\)，则指数级爆炸。这意味着传统 RNN 在实践中无法学习超过 10-20 步的时间依赖关系。

**核心机制：恒定误差流与门控**

LSTM 的核心洞察是：要实现长程记忆，必须保证误差信号在时间维度上的恒定流动。对于记忆单元 \(c\) 的内部状态 \(s_c\)，其自连接权重设为 1：

$$s_c(t) = s_c(t-1) + y^{in}(t) \cdot g(net_c(t))$$

这保证了 \(\frac{\partial s_c(t)}{\partial s_c(t-1)} = 1.0\)，即 CEC（Constant Error Carrousel）中的误差可以无损地在任意长的时间跨度内流动。

> 💡 关键：CEC 的恒定误差流是 LSTM 能够桥接长时间间隔的数学基础。自连接权重 = 1 意味着记忆单元的"遗忘"不是被动发生的，而是由门控机制主动控制的。

然而，单纯的恒定误差流会带来**输入权重冲突**和**输出权重冲突**问题：
- 输入权重冲突：同一权重既要在存储阶段允许信息写入，又要在非存储阶段阻止噪声干扰
- 输出权重冲突：同一权重既要在需要时允许信息读出，又要在不需要时阻止无关内容输出

LSTM 通过**乘性门控单元**优雅地解决了这两个冲突：

$$y^{in}(t) = f_{in}\left(\sum_j w_{in_j} \cdot y_j(t-1)\right)$$

$$y^{out}(t) = f_{out}\left(\sum_j w_{out_j} \cdot y_j(t-1)\right)$$

其中 \(f_{in}\) 和 \(f_{out}\) 为 sigmoid 函数，输出范围 \([0, 1]\)。当门值接近 0 时，信息通道关闭；接近 1 时，信息通道完全打开。

**训练流程与截断梯度**

LSTM 的学习算法是 RTRL 的一种高效变体，核心思想是**截断梯度传播**：
1. 在 CEC 内部，梯度完整保留（保证长程依赖学习）
2. 跨越记忆单元边界的梯度被截断（即不回传通过门控单元到其他单元的梯度）

具体的权重更新规则：

对于连接到记忆单元 \(c\) 的输入权重 \(w_{c_l}\)：

$$\Delta w_{c_l} = \alpha \sum_t \frac{\partial E}{\partial y_c(t)} \cdot y^{out}(t) \cdot h'(s_c(t)) \cdot \frac{\partial s_c(t)}{\partial w_{c_l}}$$

其中内部状态的偏导数递推为：

$$\frac{\partial s_c(t)}{\partial w_{c_l}} = \frac{\partial s_c(t-1)}{\partial w_{c_l}} + y^{in}(t) \cdot g'(net_c(t)) \cdot y_l(t-1)$$

> ⚠️ 注意：截断梯度并不影响长程误差流——因为 CEC 内部的梯度始终完整保留。截断仅影响门控单元之间的间接梯度路径，这在实践中不会损害性能。

这种截断策略使得计算复杂度降为 \(O(W)\)（W 为网络权重总数），与标准 BPTT 相同，但能有效学习远超 BPTT 能力范围的长程依赖。

**与传统方法的对比**

| 方法 | 长程依赖能力 | 时间复杂度 | 核心问题 |
|------|-------------|-----------|---------|
| 标准 BPTT | ≤10-20 步 | \(O(W)\) | 梯度消失/爆炸 |
| RTRL | ≤10-20 步 | \(O(W^2)\) | 梯度消失 + 高复杂度 |
| Elman/Jordan 网络 | ≤10 步 | \(O(W)\) | 固定衰减，无法学习 |
| Narendra 自适应 | 有限 | \(O(W)\) | 需要已知系统模型 |
| **LSTM** | **>1000 步** | **\(O(W)\)** | **门控 + CEC 解决** |

实验表明，LSTM 在嵌入式 Reber 文法、加法问题、乘法问题、时序异或等任务上均大幅超越竞争方法，且是唯一能解决需要精确桥接 1000+ 步时间间隔的任务的方法。

#### 🧪 练习题

```yaml
question: "LSTM 中恒定误差流（CEC）的实现机制是什么？"
options:
  - "使用 ReLU 激活函数避免梯度饱和"
  - "记忆单元内部自连接权重设为 1，保证梯度在时间维度上不衰减"
  - "通过梯度裁剪将梯度范数限制在固定阈值内"
  - "使用残差连接跳过多个时间步"
answer: 1
explain: "CEC 的核心是记忆单元的自连接权重恒为 1，使得 ∂s(t)/∂s(t-1) = 1.0，误差信号可以在任意长的时间跨度内无损流动，这是 LSTM 解决梯度消失问题的数学基础。"
```