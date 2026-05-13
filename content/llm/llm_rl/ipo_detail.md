### IPO

```yaml
id: ipo
name: IPO
full_name: "恒等偏好优化 (Identity Preference Optimization, A General Theoretical Paradigm to Decouple Reward and Policy)"
year: "2023"
org: "Google DeepMind"
paper_url: "https://arxiv.org/abs/2310.12036"
category: "alignment"
parent: "DPO"
motivation: "提出ΨPO统一框架，推导出IPO算法，移除Bradley-Terry假设直接从偏好学习，缓解DPO的过拟合问题"
```

#### 📝 一句话总结

IPO 提出了 ΨPO 通用偏好优化框架，统一了 RLHF 和 DPO，并通过将非线性映射 \(\Psi\) 设为恒等函数（identity），推导出无需 Bradley-Terry 奖励模型假设即可直接从 pairwise 偏好数据学习策略的 IPO 算法，从理论上解决了 DPO 因隐式依赖 BT 假设而导致的过拟合问题。

#### 🎯 核心要点

- **ΨPO 统一框架**：提出通用目标函数 \(J_{\Psi PO}(\pi) = \mathbb{E}[\Psi(p^*(y_1 \succ y_2))] \cdot \log \frac{\pi(y_1)}{\pi(y_2)}\)，通过选择不同的 \(\Psi\) 函数统一 RLHF（\(\Psi = \log\frac{q}{1-q}\)）和 IPO（\(\Psi = \text{id}\)）
- **移除 Bradley-Terry 假设**：IPO 直接优化 pairwise 偏好概率，无需将偏好转化为 pointwise 奖励，避免了 BT 模型不成立时的系统性偏差
- **DPO 过拟合的理论分析**：证明 DPO 在确定性偏好（\(p^*=1\)）下无论正则化强度 \(\tau\) 如何，最优策略均退化为确定性策略，完全忽略参考策略 \(\pi_{\text{ref}}\)
- **IPO 损失函数**：采样版 IPO 损失为简洁的 MSE 回归形式 \(\mathbb{E}[(h_\pi(y_w, y_l) - \frac{1}{2\tau})^2]\)，其中 \(h_\pi\) 为策略与参考策略的对数似然比之差
- **唯一全局最优**：Theorem 2 证明在 KL 正则化下 IPO 目标函数存在唯一全局最优策略
- **正则化始终生效**：与 DPO 不同，IPO 通过控制对数似然比的 gap 始终将策略正则化向 \(\pi_{\text{ref}}\)，\(\tau\) 越大正则化越强

#### 🔬 深入细节

![IPO 与 DPO 学习曲线对比](https://arxiv.org/html/2310.12036v1/x2.png)
*图：IPO 与 DPO 在三动作 bandit 设定下的学习曲线对比。DPO 将未观测动作概率压至 0（过拟合），而 IPO 通过 \(\tau\) 控制正则化强度，保持对未观测动作的合理概率分配。*

```python
# Sampled IPO 伪代码 (Algorithm 1)
# 输入: 偏好数据集 D = {(x, y_w, y_l)}, 参考策略 π_ref, 温度 τ

def h_pi(y_w, y_l, x, pi, pi_ref):
    """计算策略与参考策略的对数似然比之差"""
    return (log(pi(y_w|x)) - log(pi_ref(y_w|x))) - \
           (log(pi(y_l|x)) - log(pi_ref(y_l|x)))

# 从 π = π_ref 开始训练
pi = copy(pi_ref)

for batch in DataLoader(D):
    x, y_w, y_l = batch
    # IPO 损失: MSE 回归到 1/(2τ)
    loss = mean((h_pi(y_w, y_l, x, pi, pi_ref) - 1/(2*tau))**2)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()
```

##### 动机与背景：DPO 的隐含缺陷

RLHF 的标准流程分为两步：(1) 基于 Bradley-Terry 模型从偏好数据训练奖励模型；(2) 用 PPO 等 RL 算法优化策略。DPO 将这两步合并为一步，直接从偏好数据优化策略，避免了 RL 训练的不稳定性。然而，DPO 的推导**本质上仍然依赖 Bradley-Terry 假设**——它假设 pairwise 偏好可以分解为 pointwise 奖励的函数：

$$p^*(y_1 \succ y_2) = \sigma(r^*(y_1) - r^*(y_2))$$

这一假设在现实中常常不成立。人类偏好可能是非传递的（A > B, B > C, 但 C > A），或者无法用单一标量奖励刻画。当 BT 假设不成立时，DPO 会将偏好数据强行拟合到一个不存在的奖励函数上，导致**过拟合到偏好数据的噪声而非真实偏好结构**。

> ⚠️ 注意：DPO 的过拟合不仅是经验现象，而是理论上可证明的。论文 Section 4.2 证明：当偏好为确定性（\(p^*(y_1 \succ y_2) = 1\)）时，DPO 的最优策略为 \(\pi^*(y_1) = 1, \pi^*(y_2) = 0\)，**与正则化强度 \(\tau\) 完全无关**。这意味着 DPO 的 KL 正则化在极端偏好下完全失效。

##### 核心机制一：ΨPO 统一框架

论文首先提出了一个通用的偏好优化目标，称为 ΨPO：

$$J_{\Psi PO}(\pi, \pi_{\text{ref}}) = \underset{\substack{y \sim \mu \\ y' \sim \mu}}{\mathbb{E}} \left[ \Psi(p^*(y \succ y')) \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

其中 \(\Psi: [0,1] \to \mathbb{R}\) 是一个非递减映射函数，\(p^*(y \succ y')\) 是真实偏好概率，\(\mu\) 是采样分布。

**关键洞察**：不同的 \(\Psi\) 选择对应不同的算法：

| \(\Psi\) 选择 | 对应算法 | 含义 |
|---|---|---|
| \(\Psi(q) = \log\frac{q}{1-q}\)（logit 函数） | RLHF / DPO | 将偏好概率映射为 BT 奖励差 |
| \(\Psi(q) = q\)（恒等函数） | **IPO** | 直接使用偏好概率 |

当 \(\Psi\) 为 logit 函数时，\(\Psi(p^*) = \log\frac{p^*}{1-p^*}\)。若 BT 模型成立，则 \(\Psi(p^*) = r^*(y) - r^*(y')\)，ΨPO 退化为标准 RLHF 目标。但当 BT 模型不成立时，logit 映射会放大极端偏好（\(p^* \to 0\) 或 \(p^* \to 1\) 时 logit 趋向 \(\pm\infty\)），导致过拟合。

> 💡 关键：IPO 选择 \(\Psi = \text{identity}\) 的核心原因是**避免 logit 函数在极端偏好处的发散**。恒等映射保持偏好概率的有界性，使正则化始终有效。

##### 核心机制二：IPO 目标函数推导

将 \(\Psi(q) = q\) 代入 ΨPO 框架，IPO 的目标函数为：

$$J_{IPO}(\pi, \pi_{\text{ref}}) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ p^*(y \succ y') \left( \log \frac{\pi(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi(y')}{\pi_{\text{ref}}(y')} \right) \right]$$

加入 KL 正则化后，完整优化问题为：

$$\pi^*_{IPO} = \arg\max_\pi \left\{ J_{IPO}(\pi, \pi_{\text{ref}}) - \tau \cdot \text{KL}(\pi \| \pi_{\text{ref}}) \right\}$$

**Theorem 1**（最优策略的充要条件）：策略 \(\pi^*\) 是 IPO 的最优策略，当且仅当对所有 \(y, y'\)：

$$\log \frac{\pi^*(y)}{\pi_{\text{ref}}(y)} - \log \frac{\pi^*(y')}{\pi_{\text{ref}}(y')} = \frac{1}{\tau} \left( p^*(y \succ_\mu y') - p^*(y' \succ_\mu y) \right)$$

其中 \(p^*(y \succ_\mu y') = \mathbb{E}_{y'' \sim \mu}[p^*(y \succ y'')]\) 是对采样分布 \(\mu\) 的边际偏好。

这个条件的直觉是：**最优策略相对于参考策略的对数似然比之差，正比于两个动作的边际偏好差**。正则化参数 \(\tau\) 控制这个比例——\(\tau\) 越小，策略越偏离参考策略以追求偏好；\(\tau\) 越大，策略越接近参考策略。

**Theorem 2**（唯一性）：IPO 的最优策略是唯一的，给出闭式解：

$$\pi^*(y) \propto \pi_{\text{ref}}(y) \cdot \exp\left(\frac{p^*(y \succ_\mu \cdot)}{\tau}\right)$$

##### 核心机制三：从总体损失到采样损失

总体 IPO 损失函数为：

$$\mathcal{L}_{IPO}(\pi) = \underset{y, y' \sim \mu}{\mathbb{E}} \left[ \left( h_\pi(y, y') - \frac{p^*(y \succ_\mu \cdot) - p^*(y' \succ_\mu \cdot)}{\tau} \right)^2 \right]$$

其中 \(h_\pi(y, y') = \log\frac{\pi(y)\pi_{\text{ref}}(y')}{\pi(y')\pi_{\text{ref}}(y)}\)。

然而，边际偏好 \(p^*(y \succ_\mu \cdot)\) 在实际中不可直接获取。论文利用偏好对 \((y_w, y_l)\) 的对称性，巧妙推导出**采样版损失**：

$$\mathcal{L}_{IPO}^{\text{sampled}}(\pi) = \underset{(y_w, y_l) \sim D}{\mathbb{E}} \left[ \left( h_\pi(y_w, y_l) - \frac{1}{2\tau} \right)^2 \right]$$

> 💡 关键：采样损失的推导利用了 \(h_\pi(y_w, y_l) + h_\pi(y_l, y_w) = 0\) 的反对称性。将 \((y_w, y_l)\) 视为"偏好标签为 1"的样本，\((y_l, y_w)\) 视为"偏好标签为 0"的样本，两项合并后得到目标值 \(\frac{1}{2\tau}\)。

这个损失函数的物理含义极为清晰：**IPO 将策略与参考策略的对数似然比之差回归到常数 \(\frac{1}{2\tau}\)**。这意味着：
1. 对于每一对 \((y_w, y_l)\)，IPO 要求 \(\pi\) 相对于 \(\pi_{\text{ref}}\) 对 \(y_w\) 的偏好程度恰好为 \(\frac{1}{2\tau}\)
2. \(\tau\) 越小，要求的偏好 gap 越大，策略越偏离参考策略
3. \(\tau\) 越大，要求的偏好 gap 越小，策略越接近参考策略

##### 与 DPO 的关键区别

| 特性 | DPO | IPO |
|---|---|---|
| 偏好模型假设 | 依赖 Bradley-Terry 模型 | 无需 BT 假设，直接使用偏好概率 |
| 损失函数形式 | 交叉熵（logistic loss） | MSE 回归 |
| 正则化行为 | 确定性偏好下 \(\tau\) 失效 | \(\tau\) 始终控制策略与 \(\pi_{\text{ref}}\) 的距离 |
| 极端偏好处理 | logit 发散导致过拟合 | 恒等映射保持有界 |
| 目标值 | 使 \(\sigma(h_\pi) \to 1\)（无上界） | 使 \(h_\pi \to \frac{1}{2\tau}\)（有界目标） |

论文通过三个 bandit 实验验证了上述理论分析：

1. **二动作确定性偏好**（\(\mathcal{D}_1\)）：DPO 收敛到确定性策略 \(\pi(y_1)=1\)，无视 \(\tau\)；IPO 收敛到 \(\pi^*(y_1) = \frac{e^{1/\tau}}{1+e^{1/\tau}}\)，\(\tau\) 有效控制偏好强度
2. **二动作随机偏好**（\(\mathcal{D}_2\)）：DPO 仍然过拟合到采样偏好；IPO 保持稳定
3. **三动作部分观测**（\(\mathcal{D}_3\)）：仅观测 \(y_1 \succ y_2\) 和 \(y_2 \succ y_3\)。DPO 将未直接比较的 \(y_3\) 概率压至 0；IPO 通过 \(\tau\) 合理分配概率

#### 🧪 练习题

```yaml
question: "IPO 采样损失函数中，目标回归值 1/(2τ) 的物理含义是什么？"
options:
  - "偏好对 (y_w, y_l) 的 Bradley-Terry 奖励差"
  - "策略 π 与参考策略 π_ref 的 KL 散度上界"
  - "策略相对于参考策略对 y_w 与 y_l 的对数似然比之差的期望目标"
  - "偏好数据集中 y_w 被选中的经验概率"
answer: 2
explain: "IPO 损失要求 h_π(y_w, y_l) = log(π(y_w)π_ref(y_l)/(π(y_l)π_ref(y_w))) 回归到 1/(2τ)，即控制策略相对于参考策略对优选与劣选响应的对数似然比之差为固定常数，τ 越小目标值越大，策略越偏离参考策略。"
```