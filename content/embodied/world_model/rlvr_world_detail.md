### RLVR-World：RL微调世界模型 (Training World Models with RL)

```yaml
id: rlvr_world
name: RLVR-World
full_name: "RL微调世界模型 (Training World Models with RL)"
year: "2026.01"
org: Tsinghua University
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/4ec03ed08a3fcb59e1c815b5598beff1-Abstract-Datasets_and_Benchmarks_Track.html"
category: planning
parent: iris
motivation: "利用RL微调提升多步预测因果连贯性"
```

#### 📝 一句话总结

RLVR-World 提出把语言和视频世界模型统一为自回归序列模型，并用可验证预测指标作为奖励进行 RLVR/GRPO 微调，解决最大似然训练目标与实际世界转移评估指标不一致的问题。

#### 🎯 核心要点

- **资料说明**：清单给的是 NeurIPS 2025 proceedings 链接，方法细节和图源来自同题 arXiv 与项目页公开资料
- **统一序列建模**：语言状态、视觉状态、动作和连续控制量都转成 token 序列
- **RLVR 后训练**：用 verifiable rewards 直接优化预测准确率、F1、MSE、LPIPS、SSIM 等任务指标
- **GRPO 优化**：采样一组候选未来状态，用组内归一化奖励估计优势，无需单独 value function
- **语言世界模型**：覆盖 text game state prediction 与 web page state prediction
- **视频世界模型**：对机器人操作视频未来帧进行视觉 tokenizer/decoder 建模
- **下游收益**：提升 WebArena web agent MPC 成功率，并改善机器人视频预测质量与重复伪影

#### 🔬 深入细节

##### 方法框架

![RLVR-World 方法图](https://thuml.github.io/RLVR-World/static/images/method.png)
*图：RLVR-World 将语言和视频世界模型统一成序列模型，对采样输出解码后用可验证指标计算奖励，并通过 GRPO 更新模型。*

##### 算法伪代码

```python
# RLVR-World: post-training a pretrained world model
pretrained_WM = load_mle_world_model()

for batch in world_transition_dataset:
    q = tokenize_state_action(batch.state, batch.action)
    gt_next = batch.next_state

    # 1. group sampling
    samples = [pretrained_WM.generate(q) for _ in range(group_size)]

    # 2. modality-specific detokenization / extraction
    decoded = [decode_or_extract(sample) for sample in samples]

    # 3. verifiable reward from task metric
    rewards = [metric(pred, gt_next) for pred in decoded]
    advantages = normalize_within_group(rewards)

    # 4. GRPO update with KL regularization
    loss = 0
    for sample, adv in zip(samples, advantages):
        ratio = prob_theta(sample, q) / prob_old(sample, q)
        loss += -min(ratio * adv, clip(ratio, 1-eps, 1+eps) * adv)
        loss += beta * KL(policy_theta, reference_model)
    optimizer.step(loss)
```

##### 动机与背景

世界模型通常用最大似然训练：

$$\max_\theta \log p_\theta(s_{t+1}|s_t,a_t)$$

但 MLE 优化的是 token 级似然，不一定等价于下游关心的“状态转移是否正确”。在文本游戏中，一个对象属性错了就会导致状态预测失败；在网页环境中，DOM 元素或字段 F1 才是关键；在视频世界模型中，像素 token 似然高也可能产生重复、模糊或因果不连贯的未来帧。RLVR-World 的核心动机就是把训练目标改为直接优化这些可验证指标。

##### 世界模型作为序列模型

RLVR-World 把不同模态统一成 prompt-response：

$$q = \mathrm{Template}(s_t,a_t), \quad y = \mathrm{Tokens}(s_{t+1})$$

语言状态用文本 tokenizer；图像/视频用视觉 tokenizer；低维连续控制量可量化成离散 bins。这样，语言世界模型和视频世界模型都可以用 decoder-only Transformer 形式表示：

$$p_\theta(y|q)=\prod_i p_\theta(y_i|q,y_{<i})$$

这与 IRIS 的思想一致：把世界转移预测看成 token 序列生成。但 RLVR-World 进一步关注后训练目标，不满足于 token likelihood。

##### 可验证奖励：从 token loss 到 decoded metric

给定模型生成的一组候选输出 \(\{y^{(i)}\}_{i=1}^G\)，RLVR-World 先把它们解码成预测状态：

$$\hat{s}_{t+1}^{(i)} = \mathrm{Decode}(y^{(i)})$$

再用任务指标与 ground truth 比较：

$$r^{(i)} = R(\hat{s}_{t+1}^{(i)}, s_{t+1})$$

语言任务中，\(R\) 可以是 exact match、accuracy 或 F1；视频任务中，\(R\) 可以是 MSE、LPIPS、SSIM 等视觉质量指标。关键是奖励不来自 learned reward model，而来自可验证的外部评估函数，因此比 RLHF 更少受到偏好模型漂移影响。

##### GRPO 更新与组内相对优势

RLVR-World 采用 GRPO。对同一个输入采样多条输出，用组内奖励均值和标准差归一化得到 advantage：

$$A^{(i)} = \frac{r^{(i)}-\mathrm{mean}(\{r^{(j)}\})}{\mathrm{std}(\{r^{(j)}\})+\epsilon}$$

优化目标类似 PPO 裁剪目标，并加入参考模型 KL 约束：

$$\mathcal{L}_{\text{GRPO}}
= -\mathbb{E}_i
\left[
\min(\rho_i A^{(i)}, \mathrm{clip}(\rho_i,1-\epsilon,1+\epsilon)A^{(i)})
- \beta D_{\mathrm{KL}}(\pi_\theta \| \pi_{\text{ref}})
\right]$$

其中 \(\rho_i\) 是新旧模型生成该响应的概率比。因为 advantage 来自同输入的样本组，GRPO 不需要训练 value function，适合生成模型后训练。

##### 语言与视频实验的意义

在语言世界模型中，RLVR-World 用 text game 和 WebArena 风格网页状态转移评估，直接提升状态字段预测准确率/F1；更重要的是，改进后的网页世界模型可用于 MPC 式 web agent，在候选动作前模拟网页状态，从而提升下游成功率。

在视频世界模型中，RLVR-World 对机器人操作轨迹预测进行 RL 微调。模型先用视觉 tokenizer 编码视频帧和动作，再生成未来视觉 token，最后解码成帧并用视觉指标打分。相对纯 MLE，RLVR 能直接惩罚重复和视觉失真，使未来帧更符合真实操作因果。

> 💡 关键：RLVR-World 把“世界模型训练”从 token 级拟合推进到 metric-level 后训练，让模型直接对下游可验证预测质量负责。

#### 🧪 练习题

```yaml
question: "RLVR-World 相比最大似然训练的核心变化是什么？"
options:
  - "完全取消自回归建模，只使用物理引擎"
  - "用 decoded prediction 的可验证任务指标作为奖励进行 RL 微调"
  - "只训练奖励模型，不训练世界模型"
  - "把所有视频帧改成人工文本标签"
answer: 1
explain: "RLVR-World 仍可基于自回归世界模型，但后训练阶段用 accuracy/F1/LPIPS 等可验证指标直接优化生成预测。"
```
