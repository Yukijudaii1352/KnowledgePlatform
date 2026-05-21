### π0

```yaml
id: pi0
name: π0
full_name: 物理智能零号 (π0)
year: '2024.10'
org: Physical Intelligence
paper_url: https://www.pi.website/download/pi0.pdf
category: diffusion_flow
parent: octo
motivation: 流匹配动作专家支持50Hz高频控制
```

#### 📝 一句话总结
π0 提出了一种建立在预训练 VLM 之上的流匹配 VLA 架构，通过单独的动作专家生成连续动作块，在保留互联网级语义知识的同时实现最高 50Hz 的高频灵巧控制。

#### 🎯 核心要点
- 提出 **π0**：首个将 **预训练 VLM backbone + flow matching 动作专家** 系统结合的大规模通用机器人策略
- 主干基于 **PaliGemma 3B**，再增加约 **300M** 参数的 action expert，总参数约 **3.3B**
- 使用 **continuous action chunk** 而不是离散动作 token，单次预测动作视野为 **H = 50**
- 训练目标是 **conditional flow matching**，直接建模 \(p(A_t \mid o_t)\) 的连续动作分布
- 采用 **双专家 Transformer**：图像和语言走大 VLM 权重，机器人状态和动作走更小的 action expert 权重
- 使用 **三段 blockwise causal attention mask**，兼顾 VLM 预训练分布保持与流匹配采样缓存
- 预训练数据来自 **7 种机器人配置、68 个任务、超过 10,000 小时机器人数据**，并混合 OXE/Bridgev2/DROID
- 训练 recipe 明确区分 **pre-training** 与 **post-training**：前者学广泛能力，后者学高质量任务执行策略
- 支持 **cross-embodiment**：单臂、双臂、移动机械臂在同一模型中联合训练

#### 🔬 深入细节
##### 核心总览图

![π0 官方总览图](https://physicalintelligence.company/images/pi0-og.png)
*图：Physical Intelligence 官方总览图。π0 的定位是一个建立在大规模多任务、多机器人数据上的通用机器人基础策略。*

##### 任务示意图

![π0 洗衣折叠任务示意图](https://www.pi.website/images/p0-hero-video-poster.jpg)
*图：官方博客中的任务示意图。论文重点展示了洗衣折叠、桌面清理、装箱等长程灵巧操作场景。*

##### 核心伪代码

```python
# π0: VLM prefix + action expert + flow matching sampling

obs = encode_images_and_text(images, language_prompt)     # PaliGemma VLM prefix
state = encode_robot_state(q_t)                           # proprioception token

for training_step in dataset:
    A_t = future_action_chunk(horizon=50)
    tau = sample_shifted_beta_timestep()
    eps = randn_like(A_t)
    A_tau = tau * A_t + (1 - tau) * eps

    tokens = concat(obs, state, action_tokens(A_tau, tau))
    v = transformer_with_action_expert(tokens)

    target = A_t - eps
    loss = mse(v.action_suffix, target)
    update(loss)

# inference
A_tau = randn(action_shape)
for _ in range(10):
    v = transformer_with_action_expert(concat(obs, state, action_tokens(A_tau, tau)))
    A_tau = A_tau + 0.1 * v.action_suffix
execute(A_tau[:control_steps])
```

##### 动机：为什么 π0 不走标准 VLA 的离散动作 token 路线

π0 的问题意识很明确。已有 VLA 很擅长把图像和语言映射到动作，但主流方案通常沿用语言模型的自回归离散 token 形式来表达动作。这种做法对低频、相对粗粒度的操作还可以，但一旦任务需要更高控制频率、更多动作自由度和更连续的轨迹细节，离散动作 token 会迅速变得低效而粗糙。

Physical Intelligence 的做法是反过来保留语言模型的语义骨干，但把动作建模这件事改成交给流匹配。论文把要预测的对象定义为未来动作块 \(A_t = [a_t, a_{t+1}, \dots, a_{t+H-1}]\)，其中动作视野 \(H=50\)。这意味着模型不是每步只吐出一个短动作，而是一次性生成一段连续动作块，因此既能维持高频控制，又能在更长的局部时间窗口内保持动作连贯性。

> 💡 关键：π0 的核心创新不是“把 VLM 用到机器人上”，而是“让 VLM 管语义，让 flow matching 管连续动作”，从而同时保住泛化能力和控制精度。

##### 核心机制一：VLM backbone + action expert 的双专家结构

π0 的主干是一个 late-fusion VLM。图像观测会先被编码到与语言 token 相同的嵌入空间，再和语言提示一起送入 Transformer。与普通 VLM 不同的是，π0 额外引入了机器人本体状态 \(q_t\) 和动作块 \(A_t^\tau\) 这两类机器人特有 token。

论文没有把所有 token 都塞进同一组权重里硬学，而是采用了类似 **mixture-of-experts** 的双专家设计。图像和文本 token 走较大的 VLM backbone，直接继承 PaliGemma 的预训练语义能力；机器人状态和动作 token 则走单独的 **action expert**。这两个专家通过共享的 self-attention 层交互，但各自的 MLP 权重分离。这样做的直觉是：互联网预训练学到的视觉和语言知识很宝贵，不应被机器人连续控制信号大幅污染；而动作和状态又确实需要一套更贴近控制分布的参数。

在实现上，PaliGemma 主干大约是 **3B** 量级，action expert 额外增加约 **300M** 参数。作者还刻意把动作专家做得更小，用更低宽度和更小 MLP 规模换取更快的多步流匹配采样速度，因为推理时动作部分需要多次迭代前向。

##### 核心机制二：conditional flow matching 生成连续动作块

给定观测

$$
o_t = [I_t^1, \dots, I_t^n, \ell_t, q_t]
$$

π0 要建模的是条件动作分布 \(p(A_t \mid o_t)\)。这里 \(I_t^i\) 是多路 RGB 图像，\(\ell_t\) 是语言指令，\(q_t\) 是本体状态。与离散 VLA 不同，动作块 \(A_t\) 是连续向量序列。训练时每个动作位置都对应一个 action token，但监督信号不是交叉熵，而是 conditional flow matching：

$$
\mathcal{L}^{\tau}(\theta)
=
\mathbb{E}_{p(A_t \mid o_t),\, q(A_t^\tau \mid A_t)}
\left\|
v_\theta(A_t^\tau, o_t) - u(A_t^\tau \mid A_t)
\right\|_2^2
$$

论文采用线性高斯概率路径：

$$
q(A_t^\tau \mid A_t) = \mathcal{N}(\tau A_t, (1-\tau) I)
$$

实际训练时，先采样高斯噪声 \(\epsilon \sim \mathcal{N}(0, I)\)，构造 noisy action：

$$
A_t^\tau = \tau A_t + (1-\tau)\epsilon
$$

然后让网络输出的向量场去逼近去噪目标：

$$
u(A_t^\tau \mid A_t) = A_t - \epsilon
$$

这个设计的好处是，模型直接在连续动作空间里学“如何把噪声流向真实动作块”，因此比离散化动作 token 更适合高频、平滑且多峰的机器人控制分布。

##### 核心机制三：采样、注意力掩码与实时控制

推理时，π0 从随机噪声动作块 \(A_t^0 \sim \mathcal{N}(0, I)\) 出发，用前向 Euler 积分逐步逼近有效动作：

$$
A_t^{\tau + \delta} = A_t^\tau + \delta \, v_\theta(A_t^\tau, o_t)
$$

论文中使用 **10 个积分步**，即 \(\delta = 0.1\)。这使 π0 在高频灵巧任务上能达到最高 **50Hz** 控制。为了让这类多次前向采样仍然足够快，模型使用了三段 blockwise causal attention mask：

$$
[I_t^1, \dots, I_t^n, \ell_t], [q_t], [A_t^\tau]
$$

每个 block 内部允许双向注意力，但不能看未来 block。这样做有两层作用。第一，它尽量维持图像和文本部分接近 VLM 预训练时的分布，减少新输入打乱 backbone；第二，状态 block 不会随着每次流匹配迭代变化，因此它的 key/value 可以缓存，真正每轮重算的主要是动作 suffix。这就是 π0 能把大 VLM 和多步连续采样拼起来还维持实时性的关键工程设计。

> ⚠️ 注意：π0 不是单纯把 diffusion 接在 VLM 后面。它专门为“VLM prefix 基本不变、动作 suffix 需要反复迭代”设计了注意力分块和更小的动作专家，这一点对实时部署非常关键。

##### 核心机制四：cross-embodiment 预训练与 post-training 配方

论文另一半的重要贡献不在架构，而在训练 recipe。π0 的预训练混合了 **7 种机器人配置、68 个任务、超过 10,000 小时机器人数据**，再加上 OXE、Bridgev2、DROID 等开源数据。作者把不同机器人统一到最大维度的状态与动作空间中：低维机器人用 zero-padding 补齐，少相机平台则 mask 掉缺失图像槽位。这样单臂、双臂和移动机械臂可以进入同一个模型联合学习。

但作者强调，光有大杂烩预训练还不够。预训练的目标是获得“见过很多情况”的恢复能力和广泛能力，而真正流畅、稳定、像专家一样的下游行为，需要额外的 **post-training**。所以 π0 把训练过程分成两段：pre-training 学广度，post-training 用更高质量、更一致的任务数据学执行风格。论文把这套配方用于洗衣折叠、桌面 bussing、微波炉放盘、装箱、杂货装袋等复杂任务，说明通用基础策略和任务特化并不是对立关系，而是前后两段训练分别承担不同职责。

对 π0 最准确的理解是：它不是单篇论文里一个局部 trick，而是一套完整的 VLA 方案。它把大模型语义先验、连续动作生成、跨本体预训练和后训练配方放进同一框架，定义了后续 `π0.5 / π0.7 / FAST / openpi` 这一整条 Physical Intelligence 路线的起点。

#### 🧪 练习题

```yaml
question: "π0 相比早期自回归离散动作 VLA，最核心的结构变化是什么？"
options:
  - "保留预训练 VLM 语义主干，并增加 flow matching action expert 来生成连续动作块"
  - "完全放弃语言和视觉输入，只用本体状态做 50Hz 控制"
  - "把所有机器人平台拆成独立模型分别训练，避免动作空间不一致"
  - "把动作离散成更长 token 序列，通过更深的解码器提升控制频率"
answer: 0
explain: "π0 的关键不是更深的自回归动作解码，而是把连续动作生成交给 flow matching action expert，同时保留预训练 VLM 作为语义 backbone。这样它才能兼顾泛化能力和高频灵巧控制。"
```
