### ONPO：乐观 Nash 策略优化（Optimistic Nash Policy Optimization）

```yaml
id: onpo
full_name: "乐观Nash策略优化 (ONPO)"
year: "2026"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/eab6ea376caf12d786adbb0a090fb842-Abstract-Conference.html"
motivation: "乐观Nash策略在线对齐"
parent: "dpo"
category: "direct_preference"
```

#### 📝 一句话总结
ONPO 将 LLM 偏好对齐从 Bradley-Terry 标量奖励建模改写为一般偏好下的双人零和博弈，并用乐观在线镜像下降在自博弈中近似 Nash policy。它解决了传统奖励模型难以表达非传递/群体异质偏好的问题，同时把平均策略 duality gap 从常规自博弈 O(T^{-1/2}) 改进到 O(T^{-1})。

#### 🎯 核心要点
- 放弃 BT 模型假设，不再要求存在全局标量奖励函数 \(R^*(x,y)\)，而是直接使用二元偏好 oracle \(P(y_1 \succ y_2\mid x)\)
- 将偏好对齐定义为双人零和博弈：一个策略生成响应，另一个策略作为对手响应，收益是前者相对后者的期望胜率
- Nash policy 的目标是对任意对手至少不输，即在对称博弈中达到约 50% 的均衡胜率
- 使用 duality gap 衡量策略距离 Nash 均衡的程度，而不是只看单个 reward model 分数
- 在普通在线镜像下降基础上加入 optimistic predictor \(m_t=r_{t-1}\)，通过两步更新显式利用自博弈相邻轮次变化较小的结构
- 理论上证明平均策略的 duality gap 达到 \(O(T^{-1})\)，优于普通 OMD/INPO 类方法的 \(O(T^{-1/2})\)
- 实现上不需要显式估计整条策略分布上的 \(r_t(y)=P(y\succ\pi_t)\)，而是把在线采样响应对转成偏好数据集并最小化平方型直接偏好损失
- 实验主要在 AlpacaEval 2.0、Arena-Hard、MT-Bench 及通用能力基准上比较在线 DPO、SPPO、INPO 等方法

#### 🔬 深入细节

![ONPO 论文 Figure 1：学习率敏感性实验（NeurIPS 官方 PDF 原文）](https://proceedings.neurips.cc/paper_files/paper/2025/file/eab6ea376caf12d786adbb0a090fb842-Paper-Conference.pdf)
*图：ONPO 论文没有给出单独的架构总览图；官方 PDF 中的 Figure 1 展示学习率 \(\eta\) 变化下 ONPO 在 Arena-Hard 与 AlpacaEval 2.0 上的稳健性。方法流程可概括为“当前策略采样响应对 → 偏好 oracle 比较 → 更新辅助策略 \(\pi'_t\) → 乐观更新主策略 \(\pi_t\)”。*

```python
# ONPO 高层伪代码：用乐观 OMD 做在线 Nash 偏好对齐
initialize pi_prime = pi_sft          # auxiliary policy pi'_1
initialize pi = pi_sft                # policy pi_1

for t in range(1, T):
    # 1. 从当前策略采样成对回答，而不是训练单独 reward model
    pairs = sample_response_pairs(policy=pi, prompts=batch_prompts)

    # 2. 偏好 oracle / preference model 只返回二元偏好，形成 (winner, loser)
    D_t = []
    for y1, y2 in pairs:
        yw, yl = preference_oracle.compare(y1, y2)
        D_t.append((yw, yl))

    # 3. 先用本轮真实偏好更新 auxiliary policy pi'_{t+1}
    pi_prime_next = argmin_policy(
        mean((g_t(policy, yw, yl, anchor=pi_prime) - eta / 2) ** 2 for yw, yl in D_t)
    )

    # 4. 再用 pi'_{t+1} 作为近端锚点更新主策略 pi_{t+1}
    pi_next = argmin_policy(
        mean((g_next(policy, yw, yl, anchor=pi_prime_next) - eta / 2) ** 2 for yw, yl in D_t)
    )

    pi_prime, pi = pi_prime_next, pi_next

return pi  # 论文实现输出最后一轮策略 pi_T
```

ONPO 的出发点是：人类偏好未必能被一个标量奖励函数完整表示。BT 模型默认某个响应 \(y\) 有潜在奖励 \(R^*(x,y)\)，两两偏好由奖励差决定；这会隐含偏好传递性。但真实偏好可能存在循环，例如群体 A 偏好简洁、群体 B 偏好详细、群体 C 偏好安全保守，聚合后未必存在一个单调排序。ONPO 因此直接定义一般偏好 oracle：

$$
z \sim \mathrm{Ber}\left(P(y_1 \succ y_2\mid x)\right),
$$

其中 \(z=1\) 表示 \(y_1\) 优于 \(y_2\)。这一步把偏好学习从“给每个回答打分”改成“比较两个策略产出的回答”，为 Nash 学习提供了博弈视角。

在博弈形式中，两个策略 \(\pi_1,\pi_2\) 分别从同一个 prompt \(x\) 下采样回答，第一方收益定义为期望胜率：

$$
J(\pi_1,\pi_2)=\mathbb{E}_{x\sim d,\,y_1\sim\pi_1(\cdot\mid x),\,y_2\sim\pi_2(\cdot\mid x)}\left[P(y_1\succ y_2\mid x)\right].
$$

由于这是对称零和式比较，Nash policy \(\pi^*\) 的直觉是“任何其他策略都不能稳定击败它”。论文用 duality gap 度量近似程度：

$$
\mathrm{DualGap}(\pi)=\max_{\pi_1}J(\pi_1,\pi)-\min_{\pi_2}J(\pi,\pi_2).
$$

当 duality gap 为 0 时，策略达到 Nash 均衡；当它小于 \(\epsilon\) 时，可以称为 \(\epsilon\)-approximate Nash policy。

普通自博弈 OMD 的更新是让下一轮策略在“赢过当前策略”的收益和 KL 近端稳定性之间折中：

$$
\pi_{t+1}=\arg\max_\pi \langle \pi,r_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi_t),
$$

其中 \(r_t(y)=\mathbb{E}_{y'\sim\pi_t}[P(y\succ y')]\)。ONPO 的关键变化是把 optimistic OMD 引入这个自博弈过程：

$$
\pi_t=\arg\max_\pi \langle \pi,m_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi'_t),
$$

$$
\pi'_{t+1}=\arg\max_\pi \langle \pi,r_t\rangle-\frac{1}{\eta}\mathrm{KL}(\pi\Vert\pi'_t).
$$

这里 \(m_t\) 是对本轮收益的预测。论文利用相邻策略变化小这一事实，直接取 \(m_t=r_{t-1}\)。直觉上，普通 OMD 是“看到本轮反馈后再走一步”，而乐观 OMD 是“先按上一轮反馈预测走一步，再用真实反馈校正辅助点”。在自博弈中，收益变化项 \(\lVert r_t-r_{t-1}\rVert_\infty^2\) 会被策略稳定项抵消，因此得到更快的 \(O(T^{-1})\) duality-gap 界。

工程实现的难点是 \(r_t(y)=P(y\succ\pi_t)\) 需要对整条策略分布求期望，直接估计昂贵。ONPO 通过闭式解的 log-ratio 条件把它改写成偏好对上的监督损失。令

$$
g_t(\pi,y,y')=\log\frac{\pi(y)}{\pi(y')}-\log\frac{\pi'_t(y)}{\pi'_t(y')},
$$

则可在采样得到的 winner/loser 数据 \((y_w,y_l)\sim D_t\) 上优化：

$$
\mathcal{L}_t(\pi)=\mathbb{E}_{(y_w,y_l)\sim D_t}\left[\left(g_t(\pi,y_w,y_l)-\frac{\eta}{2}\right)^2\right].
$$

这使 ONPO 与 DPO 类方法一样可以用常规语言模型 log-prob 训练，但数据是在线自博弈产生的，优化目标又来自 Nash/optimistic OMD。它和 DPO 的根本区别是：DPO 仍围绕固定偏好数据和隐式 BT reward 推导；ONPO 直接追求一般偏好博弈的均衡策略，尤其适合偏好非传递、偏好多群体混合或奖励模型排序不稳定的场景。

> 💡 关键：ONPO 的“乐观”不是更大的步长，而是把上一轮自博弈收益当作本轮预测器，使策略更新能利用博弈序列的平滑性；KL 项仍然用于近端稳定，但不再把目标函数本身改成 KL-regularized game。

#### 🧪 练习题
```yaml
question: "ONPO 相比普通自博弈 OMD 的核心改进是什么？"
options:
  - "把二元偏好重新拟合成单个 Bradley-Terry 奖励模型"
  - "用上一轮收益作为 optimistic predictor，并采用两步镜像下降更新"
  - "只在离线偏好数据上训练，不再进行在线采样"
  - "删除所有 KL 近端项以扩大策略更新幅度"
answer: 1
explain: "ONPO 的关键是 optimistic OMD：先用预测收益更新主策略，再用真实收益更新辅助策略，从而在自博弈中获得更快的 duality-gap 收敛。"
```
