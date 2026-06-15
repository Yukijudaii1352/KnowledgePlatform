### GR00T N1.6 — NVIDIA通用机器人基础模型 (NVIDIA General Robot Foundation Model)

```yaml
id: groot-n1
name: GR00T N1.6
full_name: "NVIDIA通用机器人基础模型 (NVIDIA General Robot Foundation Model)"
year: "2026"
org: "NVIDIA"
paper_url: "https://developer.nvidia.com/project-groot"
category: "vla_model"
parent: "pi0"
motivation: "双系统规划+扩散动作架构"
```

#### 📝 一句话总结

GR00T N1.6 是 NVIDIA 面向通用人形/跨具身操作的开源 VLA 模型，把视觉语言基础模型与 diffusion/flow matching Transformer 动作头组合起来，用真实、合成和仿真数据训练可后训练适配的机器人基础策略。

#### 🎯 核心要点

- 公开模型卡显示 GR00T N1.6-3B 是跨具身 VLA，输入语言、多视角图像和机器人本体状态，输出连续动作向量。
- 架构由视觉/文本 Transformer 编码器和 flow matching DiT 动作头组成，动作头在本体状态与带噪动作上做 self-attention，并 cross-attend 到视觉语言特征。
- N1 系列论文提出双系统设计：System 2 VLM 负责语义理解，System 1 diffusion transformer 负责高频闭环动作生成。
- N1.6 使用 SigLIP2 视觉编码、T5 文本编码、按 embodiment ID 索引的 MLP state/action projector，并支持变数量相机视角。
- 训练数据包含双臂、半人形、人形真实数据，以及 NVIDIA Isaac GR00T Blueprint 生成的合成/仿真数据。
- N1.6 模型卡说明其在连接器上有性能改进，并联合 flow matching 与 world-modeling 目标训练。

#### 🔬 深入细节

![GR00T N1.6 模型架构图](https://raw.githubusercontent.com/NVIDIA/Isaac-GR00T/main/media/model-architecture.png)
*图：GR00T N1.6 使用视觉/文本编码器、embodiment-specific MLP 和 flow matching DiT 动作头生成连续控制。*

```python
# GR00T N1.6 flow matching VLA 伪代码
def train_groot_n16(batch):
    image_tokens = siglip2_encoder(batch.camera_frames)      # 可变多视角拼接
    text_tokens = t5_encoder(batch.instruction)
    vl_tokens = concat(image_tokens, text_tokens)

    q = state_mlp[batch.embodiment_id](pad(batch.proprio))
    clean_actions = batch.action_chunk
    eps = normal_like(clean_actions)
    tau = uniform(0, 1)
    noisy_actions = tau * clean_actions + (1 - tau) * eps

    velocity = dit_action_head(
        noisy_actions=noisy_actions,
        proprio=q,
        diffusion_step=tau,
        context=vl_tokens,
        embodiment=batch.embodiment_id,
    )
    loss_fm = mse(velocity, clean_actions - eps)
    loss_wm = world_modeling_loss(batch)  # N1.6 模型卡提到的联合目标
    update(model, loss_fm + lambda_wm * loss_wm)

def act_groot_n16(obs, instruction, embodiment_id, steps=K):
    context = encode_vision_language(obs.frames, instruction)
    actions = sample_gaussian_chunk()
    for k in range(steps):
        tau = k / steps
        v = dit_action_head(actions, obs.proprio, tau, context, embodiment_id)
        actions = actions + v / steps
    return actions
```

GR00T N1 系列的核心思想是双系统 VLA：视觉语言模块承担 System 2 式语义理解，动作生成模块承担 System 1 式快速控制。N1.6 模型卡进一步明确了工程实现：RGB 相机帧经 SigLIP2 视觉 Transformer 编码，文本由 T5 编码；多视角图像 token 与语言 token 拼成上下文序列；机器人本体状态先按 embodiment ID 选择对应 MLP 投影，再进入动作头。

动作头是 flow matching / diffusion transformer。训练时将真实动作块 \(A_t\) 与高斯噪声 \(\epsilon\) 插值：

$$
A_t^\tau = \tau A_t + (1-\tau)\epsilon,\quad
\mathcal{L}_{\text{FM}} =
\left\|v_\theta(A_t^\tau,\tau,q_t,\phi_t,e)- (A_t-\epsilon)\right\|_2^2,
$$

其中 \(q_t\) 是本体状态，\(\phi_t\) 是视觉语言 token，\(e\) 是具身 ID。推理时从噪声动作块开始，用 Euler 积分逐步还原连续动作。这与 π0 的动作流思想相近，但 GR00T N1.6 更强调人形/跨具身工程适配、可变多视角输入和 NVIDIA Isaac 数据生成生态。

跨具身支持依赖 embodiment-specific projector。不同机器人自由度、状态维度和动作维度不同，N1.6 通过 padding 到统一最大长度，再用按 embodiment 索引的 MLP 编码状态和解码动作。形式上可以写作：

$$
q_t = E_{e}(s_t),\quad
\hat{A}_t = D_{e}(h_t),
$$

其中 \(E_e,D_e\) 是第 \(e\) 个具身的状态/动作投影器。这样主干 DiT 可以共享跨机器人技能，而输入输出适配由小模块处理。

数据侧，GR00T N1 论文提出“数据金字塔”：底部是大规模网络/人类视频，中间是合成与仿真轨迹，顶部是真实机器人演示。对无动作视频，系统可用 latent action 或 inverse dynamics 产生伪动作标签；对真实和仿真机器人轨迹，则使用真实动作或 IDM 标签训练。N1.6 模型卡还指出其训练混合包含真实采集数据和 Isaac GR00T Blueprint 生成的合成数据，并联合 world-modeling 目标，这说明它不只拟合动作，还在学习更稳定的动态/时序表示。

与 OpenVLA 相比，GR00T N1.6 不把动作当语言 token 自回归生成，而是输出连续动作块；与 π0 相比，它更突出人形机器人和多具身部署栈，包括模型卡、Isaac GR00T 仓库、仿真数据和后训练适配流程。该条目特别需要注意路径：本文件写入 `groot-n1_detail.md`，未编辑历史错误路径 `groot-n1.md`。

#### 🧪 练习题

```yaml
question: "GR00T N1.6 的动作生成头主要采用什么机制？"
options:
  - "离散动作 token 的自回归语言建模"
  - "flow matching / diffusion Transformer 对连续动作块去噪"
  - "只输出自然语言计划，由人类执行"
  - "固定查表控制，不使用神经网络"
answer: 1
explain: "N1.6 模型卡明确描述了 diffusion transformer head，它通过 flow matching 从噪声动作迭代生成连续动作。"
```
