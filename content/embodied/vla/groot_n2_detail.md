### GR00T N2

```yaml
id: groot_n2
name: GR00T N2
full_name: 世界动作模型 (DreamZero / GR00T N2)
year: '2026.02'
org: NVIDIA Research
paper_url: https://arxiv.org/abs/2602.15922
category: diffusion_flow
parent: helix
motivation: 联合预测视频与动作，零样本泛化与跨本体迁移显著提升
```

#### 📝 一句话总结
GR00T N2 的学术核心对应 NVIDIA 的 DreamZero：它不再把机器人策略只当作“看图吐动作”的 VLA，而是把未来视频和动作一起建模成 **World Action Model (WAM)**，通过联合预测物理世界演化与动作序列，把零样本泛化、跨本体迁移和真实闭环控制显著推高。

#### 🎯 核心要点
- `GR00T N2` 的论文主来源不是新闻稿本身，而是其底层研究 **DreamZero / World Action Models are Zero-shot Policies**
- 提出 **WAM (World Action Model)**：联合预测未来视频和动作，而不是只预测动作 token 或连续动作
- 基于 **pretrained video diffusion backbone**，把世界状态演化作为动作学习的稠密监督
- 使用 **14B autoregressive diffusion transformer**，通过 **teacher-forcing chunk-wise video denoising objective** 训练
- 模型输入包含 **视觉上下文、语言指令、本体状态**，并分别用 VAE / text encoder / state encoder 编码
- 采用 **autoregressive DiT + flow matching**，并通过独立视频/动作解码头联合生成未来帧与动作
- 推出 **DreamZero-Flash**：通过视频/动作解耦噪声日程，把实时控制从约 350ms 降到约 150ms，每个动作块可达 **7Hz** 闭环控制
- 在真实机器人上，对新任务和新环境的泛化能力相对 SOTA VLA 提升 **2x+**，并展示 **42%+** 的视频级跨本体迁移收益与 **30 分钟** 新本体快速适配

#### 🔬 深入细节
##### 核心总览图

![DreamZero 方法总览](https://dreamzero0.github.io/images/project_overview.png)
*图：DreamZero 总览。WAM 通过联合预测视频与动作，把世界物理演化直接变成策略学习目标，因此天然更适合零样本泛化、跨环境迁移和跨本体学习。*

##### 核心架构图

![DreamZero 模型架构](https://arxiv.org/html/2602.15922v1/x4.png)
*图：DreamZero 架构。视觉上下文先经 VAE 编码，语言指令经文本编码器，本体状态经状态编码器，三者共同输入自回归 DiT 主干；主干再通过视频头和动作头联合生成未来帧与动作。*

##### 核心伪代码

```python
# DreamZero / GR00T N2 simplified training loop

z_ctx = VAE.encode(context_frames)              # clean visual context
z_tgt = VAE.encode(target_future_frames)        # future video latents
e_txt = text_encoder(instruction)               # language condition
e_state = state_encoder(proprio_history)        # robot state condition

t_v, t_a = sample_noise_schedule()              # coupled in DreamZero, decoupled in Flash
z_tgt_noisy = add_noise(z_tgt, t_v)
a_noisy = add_noise(action_chunk, t_a)

h = autoregressive_DiT(
    visual_context=z_ctx,
    video_latents=z_tgt_noisy,
    action_latents=a_noisy,
    text=e_txt,
    state=e_state,
)

pred_video_velocity = video_head(h)
pred_action_velocity = action_head(h)

loss = flow_matching(pred_video_velocity, z_tgt) \
     + flow_matching(pred_action_velocity, action_chunk)
update(loss)
```

##### 动机与背景

DreamZero 这篇工作想解决的是 VLA 路线里一个越来越明显的问题。传统 VLA 很擅长语义泛化，例如理解“把苹果放进碗里”这类语言命令，但它们往往依赖动作监督直接学从观测到动作的映射，因此更容易学到“任务语义”，却不一定真的学到“物理演化”。这会导致模型一旦碰到没见过的新动作、新环境布局，或者没反复演示过的复杂接触过程时，就容易退化成几种熟悉的默认动作模式。

DreamZero 的核心判断是：如果机器人真的要泛化，它就不能只学“下一步怎么动”，而要学“这个世界接下来会怎么变，同时我该怎么动”。于是它把视频和动作放进同一个生成任务里，让策略学习依赖于未来世界状态预测。论文把这种模型叫做 **World Action Model**。它和普通 world model 的区别在于，不是先学一个世界模型再外挂一个策略，而是直接在一个统一模型里 jointly predict video and action。

这也是为什么 NVIDIA 在发布 GR00T N2 时，明确说它是基于 **DreamZero research** 的 **world action model architecture**。对页面里的这条算法来说，真正该精读的不是新闻稿，而是 DreamZero 论文本身。新闻稿只给出了产品定位和 benchmark 宣传，而论文才解释了它为什么能把真实机器人零样本泛化做到比领先 VLA 高出两倍以上。

> 💡 关键：DreamZero 把“策略是否正确”转化为“未来视频是否合理、动作是否与视频一致”的联合建模问题，因此世界建模质量直接决定了动作策略质量。

##### 核心机制一：联合视频与动作预测的 WAM

DreamZero 的第一条核心机制是联合建模未来视频和动作，而不是把视频仅当作输入、把动作仅当作输出。设视觉上下文为 \(x_{\le t}\)，未来视频 latent 为 \(z_{t+1:t+H}\)，未来动作 chunk 为 \(a_{t:t+H-1}\)，那么模型学习的是它们的联合条件分布：

$$
p(z_{t+1:t+H}, a_{t:t+H-1} \mid x_{\le t}, l, s_{\le t})
$$

其中 \(l\) 是语言指令，\(s_{\le t}\) 是本体状态历史。直觉上，这个目标比单独预测动作更强，因为它迫使模型回答两个问题：动作是什么，以及这个动作会把世界带到什么状态。只要视频预测和动作预测之间不一致，训练就会给出明显惩罚。

论文强调视频是关于世界演化的“稠密表示”。相比只从 sparse action labels 学习，视频里包含了接触、遮挡、物体相对运动、人体或机械臂姿态变化等大量物理信息。所以一旦把视频预测纳入训练目标，模型不再只是在记忆成功动作，而是在学习 underlying dynamics。也因此，DreamZero 能从更加多样、甚至不重复的 heterogeneous robot data 中有效学习，而不依赖传统机器人数据里常见的“一个任务反复示范很多次”。

##### 核心机制二：自回归 DiT 与 teacher-forcing chunk-wise denoising

DreamZero 的模型主体是一个 **14B autoregressive diffusion transformer**。论文明确比较了 bidirectional 与 autoregressive 两类 WAM，最后选择自回归结构，因为它在视频-动作对齐、动作平滑性和真实控制闭环里更稳定。训练时模型并不是逐帧像普通视频生成那样从头采样整段未来，而是采用 **teacher-forcing chunk-wise video denoising objective**：给定干净的上下文视频块，去噪当前 chunk 的未来视频 latent 和动作 latent。

如果写成简化形式，可以把其目标看成两个 flow matching 子目标的和：

$$
\mathcal{L} = \mathcal{L}_{\text{video}} + \lambda \mathcal{L}_{\text{action}}
$$

其中

$$
\mathcal{L}_{\text{video}} = \left\| v_\theta^{(z)} - v^\*(z_t) \right\|^2,
\qquad
\mathcal{L}_{\text{action}} = \left\| v_\theta^{(a)} - v^\*(a_t) \right\|^2
$$

这里 \(v_\theta\) 表示模型预测的 velocity field。论文采用 flow matching 而不是经典扩散 loss 的表述，本质上是在学习如何把 noisy video/action latents 推回干净目标。重要的不是公式外观，而是训练方式让视频和动作共享同一个时序主干，保证“看见的未来”和“执行的动作”来自同一内部物理想象。

Figure 4 还揭示了另一个关键细节：推理时模型使用 **asynchronous execution**，并把真实观测回灌到 KV cache 中，抑制纯开放式 rollout 带来的误差积累。也就是说，虽然 DreamZero 会生成未来视频，但它不是盲目地长期 hallucinate；每个动作 chunk 执行后，真实世界观测又会重新校正上下文。

> ⚠️ 注意：DreamZero 不是“先生成整段视频再离线规划”，而是 chunk-wise、autoregressive、closed-loop 地一边想象未来、一边接收真实反馈。

##### 核心机制三：DreamZero-Flash 与实时闭环控制

视频扩散模型真正落到机器人上时，最大问题不是生成质量，而是速度。论文提到原始 DreamZero 单 GPU 推理一个 action chunk 约需 **5.7 秒**，这对机器人闭环控制是不可接受的。为此，作者从三层做优化：异步执行、编译/量化/内核优化，以及最关键的 **DreamZero-Flash**。

DreamZero-Flash 的核心思想是：动作和视频在少步推理时面对的噪声条件并不对称。动作最好尽快收敛到接近干净的输出，而视频在当前 chunk 内可以容忍更高噪声，只要它还能提供有用的未来上下文。因此论文把标准 DreamZero 中“视频和动作共享同一噪声时间步”的策略改成了解耦噪声日程。Figure 5 对这一点解释得很清楚：视频噪声偏向高噪声区，而动作噪声仍保持更直接的去噪目标。

可以把这种差异化训练写成：

$$
t_v \sim \text{Beta}(\alpha,\beta), \qquad t_a \sim \mathcal{U}(0,1)
$$

其中 \(t_v\) 和 \(t_a\) 分别是视频与动作的噪声时间步。这样训练出来的模型，在少步甚至单步推理时，也能学会“在视频条件还不完全干净时，先把动作预测准”。配合 action chunk smoothing 和 async inference，DreamZero 最终把推理降到 **约 150ms per action chunk**，实现 **7Hz closed-loop control**。

这一步对 GR00T N2 尤其关键，因为产品级机器人 foundation model 不只是要“泛化更强”，还必须“能跑得起来”。NVIDIA 新闻稿把 GR00T N2 定义为比领先 VLA 在新任务/新环境成功率高 **2x+** 的基础模型，但真正让这件事可部署的，是 DreamZero 论文里这些围绕实时控制展开的系统级设计。

##### 与 Helix / VLA 路线的区别

如果说 Helix 代表的是“双系统 VLA”路线，即把高层语义理解和低层运动控制拆分协同，那么 DreamZero/GR00T N2 代表的是另一条更偏世界模型的路线。它不再把动作策略当作唯一核心，而是把“视频未来会如何变化”作为机器人理解物理世界的中间表示。这使它对新动作、新环境和新本体的迁移更强，因为迁移的是世界动力学先验，而不只是动作模板。

从实验上看，这一点体现在几个数字上都很强：对领先 VLA 的新任务/新环境泛化 **2x+**；视频级跨本体或人到机器人迁移带来 **42%+** 的 unseen task 提升；只用 **30 分钟** 新机器人的 play data 就能适配新 embodiment；最终还把 14B 视频扩散模型压到 **7Hz** 实时闭环。这组结果说明 DreamZero 的核心优势不是单一 benchmark 分数，而是它让“视频世界模型直接做机器人零样本策略”这件事第一次在真实机器人上站住了。

#### 🧪 练习题

```yaml
question: "DreamZero 相比传统 VLA 最核心的建模差异是什么？"
options:
  - "它只把语言换成了更大的语言模型，其余保持不变"
  - "它只预测动作，不再使用视觉输入以减少延迟"
  - "它联合预测未来视频与动作，把世界状态演化作为动作学习的监督信号"
  - "它把连续动作全部改成离散 token，因此不再需要世界模型"
answer: 2
explain: "DreamZero 的核心就是 WAM：未来视频和动作一起预测。视频不是额外展示结果，而是动作学习的重要监督来源，用来显式建模物理世界如何随动作演化。"
```
