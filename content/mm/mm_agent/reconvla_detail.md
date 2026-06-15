### ReconVLA

```yaml
id: reconvla
name: ReconVLA
full_name: "重建视觉语言动作模型 (ReconVLA)"
year: "2026"
org: "MIT"
paper_url: "https://ojs.aaai.org/index.php/AAAI/article/view/38921"
category: "frontier_2026"
parent: "openvla_2"
motivation: "扩散Transformer重建注视区域提升成功率"
```

#### 📝 一句话总结

ReconVLA 提出用扩散 Transformer 重建目标“注视区域”的隐式 grounding 训练方式，解决 VLA 模型视觉注意力分散、容易抓错目标的问题。它不依赖额外输入裁剪图或显式输出框，而是把目标区域重建作为辅助监督，迫使 VLA 学到更细粒度的目标表示。

#### 🎯 核心要点

- 观察到传统 VLA 在操作预测时注意力分散，不能稳定聚焦到目标操作区域
- 提出 implicit grounding：让模型输出 reconstructive tokens，条件化扩散 denoiser 重建 gaze region
- ReconVLA 同时包含 action part 和 reconstruction part，动作 token 用交叉熵训练，视觉重建用扩散噪声预测损失训练
- 使用 frozen visual tokenizer 将 gaze region 转成 latent scene tokens，扩散 Transformer 从噪声中恢复目标区域 latent
- 构建超过 100k 条轨迹、200 万样本的机器人预训练数据，用 Grounding DINO 自动产生整图-目标区域配对
- 在 CALVIN、真实机器人和未见目标泛化实验中，相比 explicit grounding 与 CoT grounding 更稳定

#### 🔬 深入细节

##### 框架总览

![ReconVLA 论文 PDF](https://ojs.aaai.org/index.php/AAAI/article/view/38921/42883)
*图：AAAI 论文 PDF 中 Figure 3 展示 ReconVLA 架构。AAAI 页面未提供独立图片直链，因此使用公开 PDF 作为图源入口。*

ReconVLA 的核心发现来自 attention 可视化：许多 VLA 虽然能把图像和指令编码进动作，但视觉注意力并不总落在要操作的物体上。在 cluttered scene 或长程任务中，注意力分散会导致抓错块、碰错容器或遗漏当前子目标。论文因此把“让模型学会看哪里”作为动作学习之外的辅助目标。

##### 训练伪代码

```python
# ReconVLA 训练的简化流程
for image, instruction, proprio, action, gaze_crop in robot_batch:
    image_tokens = vision_encoder(image)
    text_tokens = text_tokenizer(instruction)

    # action part: 预测离散动作 token
    action_tokens = vla_llm(image_tokens, text_tokens, proprio)
    loss_action = cross_entropy(action_tokens, discretize(action))

    # reconstruction part: 用 gaze region latent 做隐式 grounding 监督
    z0 = visual_tokenizer(gaze_crop)              # frozen VAE/tokenizer
    t, eps = sample_diffusion_noise()
    zt = add_noise(z0, t, eps)
    recon_tokens = extract_reconstructive_tokens(vla_llm)
    eps_hat = diffusion_denoiser(zt, recon_tokens, t)
    loss_visual = mean_squared_error(eps_hat, eps)

    loss = loss_action + loss_visual
    update(loss)
```

##### 方法细节

已有 VLA grounding 方法大致有两类。Explicit Grounding 依赖外部检测/分割专家，把整图和裁剪目标一起输入策略；CoT Grounding 让模型先输出 bounding box，再输出动作。这两类方法能提供目标信息，但都有副作用：外部专家增加系统复杂性，裁剪图可能带来冗余输入；显式坐标输出则会让 VLA 同时学习精确框和连续动作，训练难度上升。

ReconVLA 的隐式 grounding 不改变推理输入输出。模型仍输入多视角图像、语言指令和机器人本体状态，输出动作 token；区别在于训练时额外要求模型的视觉输出能作为条件，驱动扩散 denoiser 重建目标 gaze region。这个重建目标不是整张图，而是机器人当前应该关注的操作区域，例如要抓的蓝色积木或要打开的抽屉把手。

形式上，普通 VLA 将图像和文本编码为 \(h_I, h_S\)，自回归生成动作 token \(a\)，再由 detokenizer 变成可执行动作：

$$
A = Q(a) = Q(\mathrm{LLM}(E(I), T(S)))
$$

ReconVLA 增加视觉重建目标。给定 gaze region \(I'\)，用 frozen visual tokenizer 得到 scene latent \(z_0=F(I')\)。扩散过程采样噪声和时间步得到 \(z_t\)，denoiser \(D\) 在 reconstructive tokens \(h_R\) 条件下预测噪声：

$$
\mathcal{L}_{visual} = \mathbb{E}_{t,\epsilon}\left[\|D(z_t;h_R,t)-\epsilon\|_2^2\right]
$$

总损失为动作交叉熵与视觉重建损失之和：

$$
\mathcal{L}_{ReconVLA}=\mathcal{L}^{action}_{VLA}+\mathcal{L}^{visual}_{VLA}
$$

数据侧，作者用 BridgeData V2、LIBERO、CALVIN 等开源机器人数据构建预训练集，并用 Grounding DINO 根据指令自动分割 gaze region，形成整图与目标区域配对。超过 100k 轨迹和 200 万样本的预训练让模型先学会“从任务相关视觉输出重建目标区域”，再在具体任务上微调动作能力。

实验上，隐式 grounding 在 CALVIN ABC→D 长程任务中完成长度和多步成功率高于 baseline、explicit grounding 和 CoT grounding。注意力可视化显示，ReconVLA 会随子任务切换注视区域，例如先关注要拿起的蓝色块，再关注放置目标。这个行为解释了它在长程任务中更少发生目标混淆。

> 💡 关键：ReconVLA 的重建任务不是为了在推理时生成图片，而是用生成式辅助损失塑造 VLA 的内部视觉表示，让动作解码器基于更聚焦的目标特征做决策。

#### 🧪 练习题

```yaml
question: "ReconVLA 的 implicit grounding 与显式输出 bounding box 的主要区别是什么？"
options:
  - "ReconVLA 在推理时必须先调用外部检测器"
  - "ReconVLA 通过训练时重建 gaze region 来约束内部表示，推理时仍直接输出动作"
  - "ReconVLA 不使用任何图像输入"
  - "ReconVLA 只适用于网页点击任务"
answer: 1
explain: "ReconVLA 把目标区域重建作为辅助监督，不要求模型在推理时额外输出坐标框或使用裁剪图。"
```
