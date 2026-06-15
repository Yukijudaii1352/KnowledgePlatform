### ORPO：无参考模型偏好优化 (Odds Ratio Preference Optimization)

```yaml
id: orpo
name: ORPO
full_name: 无参考模型偏好优化 (Odds Ratio Preference Optimization)
year: "2024.03"
org: KAIST
paper_url: https://arxiv.org/abs/2403.07691
category: preference
parent: dpo
motivation: SFT与对齐单阶段整合
```

#### 📝 一句话总结

ORPO 将监督微调和偏好对齐合并为单阶段训练，在标准 SFT 负对数似然旁加入 odds ratio 偏好损失，让模型提升 chosen 响应概率的同时温和惩罚 rejected 响应，从而不再需要 DPO/RLHF 中的冻结参考模型。

#### 🎯 核心要点

- 单阶段对齐：直接在偏好数据 \((x,y_w,y_l)\) 上训练，无需先 SFT 再单独做 DPO/PPO 对齐
- 无参考模型：损失只依赖当前策略 \(\pi_\theta\)，不需要 \(\pi_{\text{ref}}\) 的额外前向与显存
- 监督项保留领域适配：\(\mathcal{L}_{\text{SFT}}\) 只对 chosen 响应做 NLL，维持指令跟随和输出格式学习
- 偏好项使用 odds ratio：用 \(\text{odds}_\theta(y|x)=P_\theta(y|x)/(1-P_\theta(y|x))\) 对 chosen/rejected 做相对比较
- 关键观察：普通 SFT 会同时提高 chosen 与 rejected 的 log probability，缺少显式“压低坏回答”的机制
- 计算效率高：相对 DPO 省去 reference model，训练时主要多计算同一模型上 chosen/rejected 两条序列的 log probability
- 论文在 OPT、Phi-2、Llama-2、Mistral 等模型上验证；Mistral-ORPO 在 AlpacaEval 2.0、IFEval、MT-Bench 上达到强同规模表现

#### 🔬 深入细节

##### 核心示意图

![ORPO 对齐流程对比](https://arxiv.org/html/2403.07691v2/x2.png)
*图：论文 Figure 2。ORPO 将 SFT 的强适配信号和 rejected 响应的弱惩罚放在同一个目标函数内，不再维护 reference model 或额外对齐阶段。*

##### 算法伪代码

```python
# ORPO: one-stage SFT + odds-ratio preference optimization
for batch in dataloader:
    x, y_w, y_l = batch  # prompt, chosen response, rejected response

    logp_w_tokens = model.log_probs(x, y_w)
    logp_l_tokens = model.log_probs(x, y_l)

    # chosen-only supervised fine-tuning term
    loss_sft = -mean(logp_w_tokens)

    # sequence-level mean log likelihood
    logp_w = mean(logp_w_tokens)
    logp_l = mean(logp_l_tokens)
    p_w, p_l = exp(logp_w), exp(logp_l)

    log_odds_w = log(p_w) - log(1 - p_w + eps)
    log_odds_l = log(p_l) - log(1 - p_l + eps)
    loss_or = -log_sigmoid(log_odds_w - log_odds_l)

    loss = loss_sft + lambda_or * loss_or
    loss.backward()
    optimizer.step()
```

##### 1. 动机：SFT 本身不会惩罚 rejected 风格

ORPO 的出发点不是“完全抛弃 SFT”，而是指出 SFT 在偏好数据上缺了一个关键方向。普通 SFT 只最大化 chosen 响应 token 的似然；对 rejected 响应里出现的 token，没有直接惩罚。论文在 HH-RLHF 上观察到，随着 SFT 进行，chosen 和 rejected 的 log probability 都会上升。这说明模型学到的是“对话/指令域的通用分布”，而不是“chosen 比 rejected 更好”的偏好边界。

因此，ORPO 把问题改写成一个单阶段目标：chosen 响应用 NLL 提供强适配信号，rejected 响应通过 odds ratio 项参与对比。这样模型仍然能快速适应目标域，但不会像单纯 SFT 那样无差别抬高不受偏好的回答。

##### 2. 核心机制：为什么是 odds ratio 而不是 probability ratio

对输出序列 \(y=(y_1,\dots,y_m)\)，ORPO 先定义平均 log likelihood：

$$
\log P_\theta(y\mid x)=\frac{1}{m}\sum_{t=1}^{m}\log P_\theta(y_t\mid x,y_{<t}).
$$

然后定义序列级 odds：

$$
\text{odds}_\theta(y\mid x)=\frac{P_\theta(y\mid x)}{1-P_\theta(y\mid x)}.
$$

chosen 对 rejected 的 odds ratio 写作：

$$
\text{OR}_\theta(y_w,y_l\mid x)=
\frac{\text{odds}_\theta(y_w\mid x)}
{\text{odds}_\theta(y_l\mid x)}.
$$

直觉上，probability ratio 只看 \(P(y_w)/P(y_l)\)，而 odds ratio 还考虑“不是该序列”的补集概率。当序列概率很小或模型还没有充分适应目标域时，odds ratio 给出的梯度更适合做温和区分，不会过早把 rejected 中仍有用的语言模式整体压低。

##### 3. 目标函数：SFT 主导适配，OR 项负责偏好分离

ORPO 的完整目标是：

$$
\mathcal{L}_{\text{ORPO}}=
\mathbb{E}_{(x,y_w,y_l)\sim\mathcal{D}}
\left[
\mathcal{L}_{\text{SFT}}(x,y_w)
+\lambda\mathcal{L}_{\text{OR}}(x,y_w,y_l)
\right].
$$

其中 SFT 项为：

$$
\mathcal{L}_{\text{SFT}}=
-\frac{1}{|y_w|}\sum_{t=1}^{|y_w|}
\log P_\theta(y_w^{(t)}\mid x,y_w^{(<t)}).
$$

偏好项为：

$$
\mathcal{L}_{\text{OR}}=
-\log\sigma\left(
\log\frac{\text{odds}_\theta(y_w\mid x)}
{\text{odds}_\theta(y_l\mid x)}
\right).
$$

当 chosen 的 odds 明显大于 rejected 时，\(\mathcal{L}_{\text{OR}}\) 很小；当 rejected 反而更可能时，该项会产生更强梯度，推动模型上调 chosen、下调 rejected。这里的 \(\lambda\) 控制偏好惩罚强度，论文常用小权重，使训练仍以 SFT 的稳定适配为主。

##### 4. 与 DPO/RLHF 的差别

RLHF 通常需要 reward model、reference model、policy、value model 等多组件流水线；DPO 虽然省掉显式 reward model，但仍要用 \(\pi_{\text{ref}}\) 计算相对 log ratio。ORPO 的关键取舍是：不再用 reference model 衡量“相对旧策略的提升”，而是直接让当前模型在同一 prompt 下区分 chosen 与 rejected 的 odds。

这也解释了 ORPO 的工程优势。它不是在线 RL，不需要采样 rollout 后再用 PPO 优化；它也不像 DPO 那样每个 batch 都要冻结模型前向。训练数据仍是偏好对，但训练形态更接近普通 causal LM fine-tuning，只是在 loss 中增加一项对 rejected 的序列级对比。

##### 5. 训练和推理流程

训练时，每条样本包含 prompt、chosen、rejected。模型分别计算两条响应的 token log probability：chosen 的 token 用于 NLL；chosen/rejected 的序列平均概率再转为 odds，进入 OR loss。两个损失相加后做一次反向传播。推理时只保留训练后的 policy model，没有 reward model、reference model 或 value model。

> 💡 关键：ORPO 的“无参考模型”不是没有偏好基准，而是把基准改成同一 prompt 下 chosen 与 rejected 的 odds 对比。

##### 6. 实验解读

论文在 HH-RLHF 和 Binarized UltraFeedback 上比较 SFT、RLHF、DPO 与 ORPO，并覆盖 OPT 125M/350M/1.3B、Phi-2 2.7B、Llama-2 7B、Mistral 7B。结果显示，ORPO 对中小规模模型尤其有效：它能在单阶段训练中同时获得领域适配和偏好分离，避免 SFT 只学到“对话格式”而不学“好坏边界”。

在公开 leaderboard 上，Mistral-ORPO 系列在 AlpacaEval 2.0、IFEval 和 MT-Bench 上达到强表现。这个结果的意义不只是分数，而是说明 reference-free 的偏好损失可以成为 DPO/RLHF 的轻量替代，尤其适合资源受限、希望把 SFT 和 alignment 合并的场景。

#### 🧪 练习题

```yaml
question: "ORPO 相比 DPO 最核心的工程变化是什么？"
options:
  - "引入一个更大的 reward model 来提高偏好分数精度"
  - "使用 odds ratio 偏好损失，把 SFT 和偏好对齐合并到单阶段，并去掉 reference model"
  - "只训练 rejected 响应，不再使用 chosen 响应"
  - "把在线 PPO rollout 替换成 beam search"
answer: 1
explain: "ORPO 的核心是 L_SFT + lambda L_OR：chosen 仍做监督微调，chosen/rejected 通过 odds ratio 做偏好分离，因此不需要 DPO 的冻结参考模型。"
```
