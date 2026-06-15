### SPIN：自博弈微调 (Self-Play Fine-Tuning)

```yaml
id: spin
name: SPIN
full_name: 自博弈微调 (Self-Play Fine-Tuning)
year: "2024.01"
org: UCLA
paper_url: https://arxiv.org/abs/2401.01335
category: online_rl
parent: instructgpt
motivation: 新旧模型博弈实现自我进化
```

#### 📝 一句话总结

SPIN 提出一种只依赖已有 SFT 数据的自博弈微调方法：旧模型为同一 prompt 生成合成回答，新模型学习把人类回答和旧模型回答区分开，并在多轮迭代中逐步逼近人类示范分布。

#### 🎯 核心要点

- 自博弈数据构造：每轮用当前/旧模型 \(p_{\theta_t}\) 为 SFT prompt 生成 synthetic response \(y'\)
- 人类回答作为正例：原始 SFT 响应 \(y\) 来自 \(p_{\text{data}}\)，训练时被视作优于模型自生成回答
- DPO-like 更新：用新旧模型 log probability ratio 构造判别分数，训练 \(p_{\theta_{t+1}}\) 偏好 \(y\) 而非 \(y'\)
- 不需要额外偏好标注：训练信号来自已有示范数据与模型自身生成，不依赖 GPT-4 评审或新的人类 pairwise preference
- 迭代式提升：第 \(t+1\) 轮训练好的模型成为下一轮 opponent，继续产生更强的负例
- 理论保证：在论文假设下，目标函数全局最优仅在模型分布 \(p_\theta=p_{\text{data}}\) 时达到
- 实验基于 zephyr-7b-sft-full 和 UltraChat200k，评估覆盖 HuggingFace Open LLM Leaderboard、MT-Bench 与 Big-Bench

#### 🔬 深入细节

##### 核心示意图

![SPIN 自博弈流程](https://ar5iv.labs.arxiv.org/html/2401.01335/assets/x1.png)
*图：论文 Figure 1。旧模型生成合成回答，新模型学习区分人类回答和旧模型回答；下一轮再用更新后的模型生成更强对手样本。*

![SPIN 官方算法图](https://uclaml.github.io/SPIN/static/images/algorithm.png)
*图：官方项目页给出的 SPIN Algorithm 图源，展示按轮次生成 synthetic data 并更新模型的流程。*

##### 算法伪代码

```python
# SPIN: Self-Play Fine-Tuning
theta = theta_sft
for t in range(num_iterations):
    pairs = []
    old_model = freeze(theta)

    for x, y_human in sft_dataset:
        y_model = old_model.generate(x)
        pairs.append((x, y_human, y_model))

    # Train a new model from the previous model.
    theta_new = copy(theta)
    for batch in minibatches(pairs):
        x, y, y_prime = batch
        score_human = lambda_ * (
            logprob(theta_new, x, y) - logprob(old_model, x, y)
        )
        score_model = lambda_ * (
            logprob(theta_new, x, y_prime) - logprob(old_model, x, y_prime)
        )
        loss = -log_sigmoid(score_human - score_model)
        update(theta_new, loss)

    theta = theta_new

return theta
```

##### 1. 动机：SFT 数据并没有被一次训练“榨干”

SPIN 关注的问题是：当一个模型已经在高质量示范数据上做过 SFT 后，继续用同一批数据多轮 SFT 往往收益很小，甚至可能退化。但这不代表示范数据的信息已经被充分利用。论文的核心想法是把 SFT 数据从“单点监督标签”变成“自博弈中的人类分布样本”：同一个 prompt 下，人类回答是正样本，当前模型回答是负样本。

这样做的好处是训练信号会随着模型能力变化而变化。早期模型生成的负例较弱，新模型容易区分；随着迭代推进，旧模型负例越来越接近人类回答，训练难度也逐渐提高。SPIN 因此把静态 SFT 数据变成了动态 curriculum。

##### 2. 目标函数：判别人类分布与旧模型分布

论文先把主玩家写成一个判别函数 \(f_{t+1}\)，目标是让它给人类回答更高分、给旧模型回答更低分：

$$
f_{t+1}=
\arg\min_{f\in\mathcal{F}_t}
\mathbb{E}_{x\sim q,\ y\sim p_{\text{data}},\ y'\sim p_{\theta_t}}
\left[
\ell\left(f(x,y)-f(x,y')\right)
\right].
$$

其中 \(\ell(t)=\log(1+\exp(-t))\) 是 logistic loss。SPIN 随后把函数类限制为新旧策略的 log ratio：

$$
\mathcal{F}_t=
\left\{
\lambda\log
\frac{p_\theta(y\mid x)}
{p_{\theta_t}(y\mid x)}
\,\middle|\,\theta\in\Theta
\right\}.
$$

代入后，实际训练目标可以写成 DPO-like 形式：

$$
\mathcal{L}_{\text{SPIN}}(\theta;\theta_t)=
-\mathbb{E}
\left[
\log\sigma\left(
\lambda\log\frac{p_\theta(y\mid x)}{p_{\theta_t}(y\mid x)}
-
\lambda\log\frac{p_\theta(y'\mid x)}{p_{\theta_t}(y'\mid x)}
\right)
\right].
$$

这和 DPO 的形态很像，但 winner/loser 不是人工偏好对，而是“人类示范回答 vs 当前模型自生成回答”。\(\theta_t\) 同时扮演 reference policy 和 opponent：它既生成负例，也定义相对提升的基准。

##### 3. 训练流程：生成、判别、替换对手

每一轮 SPIN 包含两个阶段。第一阶段冻结旧模型 \(p_{\theta_t}\)，对每个 SFT prompt 生成回答 \(y'\)。第二阶段用 \((x,y,y')\) 训练新模型 \(p_{\theta_{t+1}}\)，让新模型相对旧模型更偏好人类回答、更不偏好旧模型回答。

训练结束后，\(p_{\theta_{t+1}}\) 不只是输出模型，也会成为下一轮生成负例的 opponent。这个设计让“负样本质量”跟着模型能力一起上升，避免只用初始弱模型生成的一批固定负例导致训练信号很快饱和。

##### 4. 与 DPO/RLHF 的关系

RLHF 需要额外收集偏好数据并训练 reward model；DPO 省掉 reward model，但仍需要同一 prompt 下的人工或模型标注偏好对。SPIN 的监督来源更弱：只需要 SFT demonstration。偏好标签由构造方式自然产生，人类示范 \(y\) 被视为胜者，旧模型生成 \(y'\) 被视为败者。

SPIN 也不是传统在线 RL。它没有显式奖励模型和 rollout reward，而是把自生成回答转化为 offline preference-like batch，再用稳定的二分类/logistic 目标优化。因此它处在 SFT 和偏好优化之间：数据来自 SFT，目标函数像 DPO，样本刷新方式像自博弈。

##### 5. 理论直觉：什么时候停止进步

论文证明，在单调递减且凸的损失假设下，SPIN 的全局最优点对应 \(p_\theta=p_{\text{data}}\)。直观地说，如果旧模型分布仍不同于人类分布，那么总能找到一个判别函数区分人类回答和模型回答，新模型就还有提升方向；当模型分布已经等于人类分布时，自生成回答与人类回答不可区分，自博弈训练自然不再产生有效优势。

> 💡 关键：SPIN 的“自我进化”不是凭空创造新知识，而是通过越来越强的自生成负例，把已有 SFT 示范数据中的分布约束反复转化为可优化的偏好边界。

##### 6. 实验解读

论文以 zephyr-7b-sft-full 为初始模型，从 UltraChat200k 中抽取 prompt 让模型生成 synthetic responses，并在多轮 SPIN 后评估 Open LLM Leaderboard、MT-Bench 和 Big-Bench。结果显示，SPIN 能突破继续 SFT 的平台期；第 0 轮已经能达到接近使用额外偏好数据的 DPO 训练效果，后续迭代还能继续提升但增益逐渐变小。

这个结果说明 SPIN 最适合的场景是：已有质量不错的 SFT 数据，但额外人类偏好标注昂贵或不可得。它的代价是需要多轮生成和训练，且负例质量依赖初始模型与解码设置；如果模型生成过差或过于模板化，训练信号会偏窄，如果生成已经接近人类分布，后续收益也会自然收敛。

#### 🧪 练习题

```yaml
question: "SPIN 中每轮训练的 rejected/负例主要来自哪里？"
options:
  - "额外收集的人类偏好标注"
  - "GPT-4 对 SFT 数据重新生成的答案"
  - "上一轮模型 p_theta_t 对同一 prompt 生成的回答"
  - "随机打乱的其他 prompt 的人类回答"
answer: 2
explain: "SPIN 的自博弈机制用旧模型为 SFT prompt 生成 synthetic response，并把它与原始人类回答组成训练对。"
```
