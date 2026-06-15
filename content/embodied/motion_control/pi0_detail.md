### π₀：基于 Flow Matching 的通用机器人策略

```yaml
id: pi0
name: π₀
full_name: 通用机器人策略 (Generalist Robot Policy)
year: "2024"
org: Physical Intelligence
paper_url: https://www.pi.website/blog/pi0
category: foundation_model
parent: rt2
motivation: 跨形态通用基础模型Flow Matching架构
```

#### 📝 一句话总结

π₀ 提出建立在预训练 VLM 之上的 Vision-Language-Action Flow Model，用单独的 action expert 通过 flow matching 生成连续动作块，解决离散动作 token 难以支持高频灵巧控制的问题。

#### 🎯 核心要点

- 使用预训练 VLM 继承互联网语义知识，再加入机器人状态和动作专家形成 VLA 策略
- 动作不是自回归离散 token，而是连续 action chunk，支持最高约 50Hz 的灵巧控制
- 使用 conditional flow matching 学习从噪声动作块到真实动作块的向量场
- 架构上采用较大的 VLM backbone 与较小的 action expert，分离语义理解和连续控制建模
- 训练数据覆盖多种机器人形态，包括单臂、双臂、移动机械臂等跨 embodiment 数据
- 训练 recipe 区分 pre-training 与 post-training：前者学广泛能力，后者学具体任务的稳定执行
- 展示洗衣折叠、桌面清理、装箱等长程灵巧任务，并能通过微调获得新技能

#### 🔬 深入细节

##### 核心示意图

![π0 框架总览](https://ar5iv.labs.arxiv.org/html/2410.24164/assets/x1.png)
*图：π₀ 使用 VLM backbone 编码视觉和语言，并通过 action expert 与 flow matching 生成连续动作块。*

##### 算法伪代码

```python
# π0: VLM prefix + action expert + conditional flow matching

for batch in robot_dataset:
    images, language, proprio, action_chunk = batch

    obs_tokens = vlm_encode(images, language)     # semantic prefix
    state_tokens = state_encoder(proprio)

    tau = sample_timestep()
    noise = randn_like(action_chunk)
    noisy_action = tau * action_chunk + (1 - tau) * noise

    action_tokens = action_encoder(noisy_action, tau)
    pred_velocity = transformer(
        tokens=[obs_tokens, state_tokens, action_tokens],
        expert="action"
    )

    target_velocity = action_chunk - noise
    loss = mse(pred_velocity.action_part, target_velocity)
    update(loss)

# inference
noisy_action = randn(action_chunk_shape)
for k in range(num_euler_steps):
    tau = k / num_euler_steps
    v = model(images, language, proprio, noisy_action, tau)
    noisy_action = noisy_action + (1 / num_euler_steps) * v
execute(noisy_action[:control_horizon])
```

##### 方法详解

**动机与背景：为什么不继续用 RT-2 式离散动作 token？**

RT-2/OpenVLA 等 VLA 将动作离散化成语言 token，优点是能最大限度复用 LLM/VLM 的自回归训练框架。但灵巧操作需要高频、平滑、连续且多峰的控制输出，例如折衣服、装盒、双臂整理物体。这类动作如果拆成离散 token 序列，会带来量化误差、长序列生成延迟和控制频率限制。

π₀ 的设计思路是保留 VLM 的语义骨干，但把动作生成从“文本分类”改成“连续生成”。模型输入仍是图像、语言指令和本体状态，输出却是未来一段连续动作：

$$
A_t = [a_t, a_{t+1}, \ldots, a_{t+H-1}]
$$

这样一次前向采样可以产生局部时间窗口内的动作块，减少逐 token 解码延迟，并让轨迹天然更连贯。

**核心机制一：VLM backbone 与 action expert 分工**

π₀ 的 VLM backbone 负责处理图像和语言，继承预训练模型中的物体、空间关系和指令理解能力。机器人状态和 noisy action chunk 则进入 action expert。两者通过 Transformer 注意力交互，但 action expert 的参数专门服务于连续动作建模。

这种分工很关键。若直接把连续动作信号塞进 VLM 主干，容易污染语言/视觉表征；若完全冻结 VLM 又可能无法适应机器人视觉分布。π₀ 通过“语义主干 + 控制专家”的方式，让语义泛化和动作精度分别由更合适的参数承担。

**核心机制二：conditional flow matching**

π₀ 建模条件动作分布：

$$
p(A_t \mid o_t), \quad o_t = (I_t, l_t, q_t)
$$

其中 \(I_t\) 是多视角图像，\(l_t\) 是语言，\(q_t\) 是本体状态。训练时采样真实动作块 \(A_t\)、高斯噪声 \(\epsilon\) 和时间 \(\tau\)，构造：

$$
A_t^\tau = \tau A_t + (1-\tau)\epsilon
$$

网络预测向量场：

$$
v_\theta(A_t^\tau, o_t) \approx A_t - \epsilon
$$

对应损失为：

$$
\mathcal{L}(\theta)=
\mathbb{E}\left[
\left\|v_\theta(A_t^\tau,o_t)-(A_t-\epsilon)\right\|_2^2
\right]
$$

直觉上，模型学习“从噪声动作块流向真实动作块”的方向。推理时从随机噪声开始，用 Euler 积分多步更新，得到可执行连续动作。

**核心机制三：pre-training / post-training 配方**

π₀ 不把通用能力和任务特化混在一个阶段解决。pre-training 使用多机器人、多任务、大规模数据，让模型学到跨形态控制先验和恢复能力；post-training 则使用更高质量、更聚焦的任务数据，让执行更稳定、更像专家。

这种配方与大语言模型的预训练/对齐很类似：预训练负责覆盖广度，后训练负责行为品质。对机器人来说尤其重要，因为真实任务中失败恢复、接触调整和长程执行风格往往不可能只靠少量干净演示学到。

**与传统 VLA 的区别**

OpenVLA/RT-2 把动作当作 token 分类问题，适合低频桌面操作和语义泛化；π₀ 把动作当作连续条件生成问题，更适合高频、灵巧、需要轨迹平滑的任务。它不是放弃 VLM，而是把 VLM 放在更合适的位置：理解“做什么”，action expert 负责“怎么连续地做”。

> 💡 关键：π₀ 的核心创新是把 VLM 的语义泛化能力和 flow matching 的连续动作生成能力组合成一个端到端机器人策略。

#### 🧪 练习题

```yaml
question: "π₀ 相比离散动作 token VLA 的核心变化是什么？"
options:
  - "使用 flow matching action expert 生成连续动作块"
  - "完全移除视觉输入，只保留语言输入"
  - "用手工状态机替代神经网络策略"
  - "把所有动作都转换成自然语言句子再执行"
answer: 0
explain: "π₀ 保留 VLM 语义骨干，但用 conditional flow matching 在连续动作空间生成 action chunk，因此更适合高频灵巧控制。"
```
