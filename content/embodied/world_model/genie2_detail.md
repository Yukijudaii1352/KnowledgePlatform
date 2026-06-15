### 精灵2 (Large-scale Foundation World Model)

```yaml
id: genie2
name: Genie 2
full_name: 精灵2 (Large-scale Foundation World Model)
year: "2024.12"
org: Google DeepMind
paper_url: "https://deepmind.google/discover/blog/genie-2-a-large-scale-foundation-world-model/"
category: generative
parent: genie
motivation: "11B参数支持实时3D环境生成与交互"
```

#### 📝 一句话总结

Genie 2 将 Genie 的交互式世界模型扩展到可由单张图像提示生成、可用键盘鼠标控制的 3D playable environments，并用自回归 latent diffusion dynamics 支持 embodied agent 的训练和评估。

#### 🎯 核心要点

- **单图提示生成世界**：从 Imagen 3 生成图、概念图或真实照片启动一个可交互 3D 环境
- **动作可控**：人类或 AI agent 通过键盘和鼠标逐步输入动作，模型生成下一帧观察
- **自回归 latent diffusion world model**：视频经 autoencoder 进入 latent frames，再由 causal transformer dynamics model 逐帧预测
- **Classifier-free guidance**：推理时用于增强动作可控性
- **长程一致性**：官方博客展示最长约一分钟的世界一致性，多数样例为 10-20 秒
- **涌现能力**：支持长程记忆、3D 结构、物体交互、角色动画、NPC、水/烟/重力/光照/反射等模拟现象
- **Agent 评估用途**：DeepMind 展示 SIMA agent 在 Genie 2 生成的新环境中按自然语言指令完成任务
- **依据限制**：官方博客给出架构级描述但没有完整论文超参；YAML 标注 11B 参数，公开博客没有给出完整参数表

#### 🔬 深入细节

##### 核心示意图

![Genie 2 推理流程](https://lh3.googleusercontent.com/NWpfbDUhaC1ivgNDaRc7d3kmDjVh5vGPPOJV34yN6trHaFIPmBVasa7URKn-UQo0-l3PegAOOGUa78Bu4eSi2uht2zGm3KeIGCcVfw2a0FjyZGim7w%3Dw1440)
*图：Genie 2 从图像提示编码 latent world state，并在每一步接收键盘/鼠标动作，自回归生成下一帧。*

##### 动机与背景

Genie 1 证明了从无标注视频中学习 2D 交互环境是可行的，但未来 embodied agents 需要更丰富的训练和评估环境：3D 视角、复杂物体交互、长期记忆、NPC 行为以及多样化任务。真实游戏和模拟器制作成本高，Genie 2 的目标是把“生成环境”本身变成一个基础模型能力。

官方描述中，Genie 2 是 autoregressive latent diffusion model。给定图像提示 \(x_0\)，autoencoder 得到 latent frame \(z_0\)。随后在每个时间步接收动作 \(a_t\)，causal transformer dynamics model 预测下一 latent：

$$
p_\theta(z_{t+1} \mid z_{\le t}, a_{\le t}, c)
$$

其中 \(c\) 是 prompt 或场景条件。由于 latent transition 使用 diffusion 生成，可将单步采样写成去噪过程：

$$
z_{t+1}^{(k-1)} =
\text{Denoise}_\theta(z_{t+1}^{(k)}, k, z_{\le t}, a_{\le t}, c)
$$

生成后的 latent 再由 decoder 转回图像帧。和 Genie 1 相比，Genie 2 不只学习抽象 latent actions，而是面向通用键盘/鼠标控制和 3D playable worlds。

##### 算法伪代码

```python
# Publicly described Genie 2 inference abstraction
prompt_image = imagen3_or_user_image(prompt)
z_context = autoencoder.encode(prompt_image)

while episode_not_done:
    action = read_keyboard_mouse_or_agent_action()

    # Autoregressive latent diffusion next-frame generation
    z_next = gaussian_latent()
    for denoise_step in reversed(schedule):
        z_next = transformer_dynamics.denoise(
            z_next,
            denoise_step,
            context_latents=z_context,
            actions=history_actions + [action],
            guidance="classifier_free"
        )

    frame = autoencoder.decode(z_next)
    render(frame)
    z_context = append_context(z_context, z_next)
    history_actions.append(action)
```

##### 方法机制拆解

Genie 2 的关键接口是“single prompt image + action stream”。用户先用文本生成一张图，或直接提供照片/概念图，模型把它解释成一个可进入的世界。此后每一步动作都改变下一个观察，这使模型更像环境模拟器而不是离线视频生成器。

Causal transformer dynamics model 的作用类似语言模型中的 next-token model，只是 token 换成 autoencoder latent frames，并额外条件化动作。causal mask 保证当前预测只依赖过去观察和动作历史，这符合交互环境的时间因果结构。

自回归 latent diffusion 与 Genie 1 的离散 token dynamics 不同。它用 diffusion 的逐步去噪来生成下一帧 latent，理论上更适合高保真 3D 场景、复杂光照和视觉细节。官方博客还提到，未蒸馏 base model 质量更高，蒸馏版本可实时游玩但质量下降。

Genie 2 在 agent 训练上的意义是“无限新环境”。如果每个 prompt 都能生成一个未见过的可交互世界，那么 agent 可以在合成环境中进行泛化评估。DeepMind 展示 SIMA agent 在 Genie 2 生成场景中执行“打开蓝门”“绕到房子后面”等任务，说明这种世界模型可作为评估平台。

> ⚠️ 注意：Genie 2 官方博客没有发布可复现实验细节和完整训练配方，因此它更接近研究发布和技术报告，而不是完整论文。本文的算法解释依据公开架构描述和 YAML 元信息。

#### 🧪 练习题

```yaml
question: "Genie 2 与 Genie 1 相比，最关键的扩展是什么？"
options:
  - "从 2D 交互视频扩展到单图提示的可控 3D playable worlds，并使用自回归 latent diffusion dynamics"
  - "只保留静态图像生成，不再支持动作输入"
  - "放弃世界模型，改为纯文本语言模型"
  - "只能在已有游戏引擎地图中重放固定轨迹"
answer: 0
explain: "Genie 2 从图像提示生成可交互 3D 环境，逐步接收动作并由 latent diffusion dynamics 生成下一观察，用于 agent 训练和评估。"
```
