### π0 — π0基础模型 (π0 Foundation Model)

```yaml
id: pi0
name: π0
full_name: "π0基础模型 (π0 Foundation Model)"
year: "2024"
org: "Physical Intelligence"
paper_url: "https://physicalintelligence.company/blog/pi0"
category: "vla_model"
parent: "openvla"
motivation: "跨具身形态泛化VLA基础模型"
```

#### 📝 一句话总结

π0 提出面向通用机器人控制的 VLA flow model，用 PaliGemma 视觉语言骨干和连续动作 flow matching 头，在跨机器人数据上学习可高频执行的动作 chunk。

#### 🎯 核心要点

- 使用 PaliGemma/Gemma 系列 VLM 作为语义骨干，并添加独立 action expert 预测连续动作。
- 训练数据混合自有 7 类机器人配置、68 个任务、数万小时级机器人交互以及 Open-X Embodiment 数据。
- 不把动作离散为 token，而是用 conditional flow matching 建模连续动作 chunk，适合高频控制。
- 输入包含图像、语言、机器人本体状态和带噪动作块，输出动作速度场 \(v_\theta\)。
- 推理时从高斯噪声出发，用少量 Euler/ODE 去噪步生成未来动作序列，然后逐步执行。
- 相比 OpenVLA，π0 更偏向“VLM 语义 + diffusion/flow 动作专家”的连续控制架构。

#### 🔬 深入细节

![π0 模型架构图](https://arxiv.org/html/2410.24164v1/x1.png)
*图：π0 在视觉语言骨干旁加入 action expert，通过 flow matching 生成连续动作 chunk。*

```python
# π0 flow matching 动作生成伪代码
def train_pi0(batch):
    obs_tokens = vlm_encode(batch.images, batch.language)
    state_tokens = state_encoder(batch.proprio)
    clean_actions = batch.action_chunk                 # shape: H x action_dim
    eps = normal_like(clean_actions)
    tau = uniform(0, 1)
    noisy = tau * clean_actions + (1 - tau) * eps
    target_velocity = clean_actions - eps
    pred_velocity = action_expert(obs_tokens, state_tokens, noisy, tau)
    loss = mse(pred_velocity, target_velocity)
    update(vlm_and_action_expert, loss)

def infer_pi0(images, language, proprio, steps=10):
    obs_tokens = vlm_encode(images, language, cache=True)
    actions = sample_gaussian_action_chunk()
    for k in range(steps):
        tau = k / steps
        v = action_expert(obs_tokens, state_encoder(proprio), actions, tau)
        actions = actions + v / steps
    return actions[0]  # 或执行整个 chunk 的前缀
```

π0 针对 OpenVLA 式离散自回归动作的瓶颈做了结构性改变。机器人控制的动作空间天然是连续的，并且每秒可能需要几十次控制更新；若每个动作都拆成多个 token 自回归生成，延迟和量化误差都会成为问题。π0 因此用条件 flow matching 学习从噪声到动作 chunk 的连续变换，把动作生成写成一个速度场：

$$
A^\tau = \tau A + (1-\tau)\epsilon,\quad
u^\star = A-\epsilon,\quad
\mathcal{L}_{\text{FM}} =
\mathbb{E}_{A,\epsilon,\tau}\left[\|v_\theta(A^\tau, \tau, o, \ell, q)-u^\star\|_2^2\right].
$$

其中 \(A\) 是真实未来动作块，\(\epsilon\sim\mathcal{N}(0,I)\)，\(q\) 是机器人本体状态。模型学习的不是直接回归单步动作，而是在不同噪声强度下预测把 noisy action 推向真实动作的速度。

架构上，π0 把 VLM 和 action expert 分工：VLM 负责图像/语言理解，action expert 负责短时连续控制。注意力结构通常让图像和语言 token 作为条件，状态 token 和动作 token 在动作专家里交互。这样可以保留基础 VLM 的语义泛化能力，又避免让语言模型词表承担连续控制细节。

推理时，π0 从随机动作块 \(A^0\) 出发，执行 \(K\) 步数值积分：

$$
A^{\tau+\Delta\tau} = A^\tau + \Delta\tau\,
v_\theta(A^\tau,\tau,o,\ell,q).
$$

得到动作 chunk 后，控制器可以执行第一个动作或采用 receding horizon 执行前几步，再用新观测重新生成。与传统 imitation learning 中单步 L2 回归相比，flow matching 可以表达多峰动作分布；与 diffusion policy 相比，它接入了更强的视觉语言骨干和跨具身预训练数据。

> 💡 关键：π0 的“基础模型”意义在于把机器人控制从离散 token 生成推进到可高频执行的连续 action flow。

#### 🧪 练习题

```yaml
question: "π0 为什么使用 flow matching 生成动作？"
options:
  - "为了把连续动作 token 化后逐字生成"
  - "为了学习从噪声到连续动作 chunk 的速度场，适配高频控制"
  - "为了只输出高层自然语言子任务"
  - "为了完全取消视觉语言骨干"
answer: 1
explain: "π0 将动作块视为连续变量，通过 flow matching 从噪声积分到动作序列，减少离散自回归控制的延迟和量化问题。"
```
