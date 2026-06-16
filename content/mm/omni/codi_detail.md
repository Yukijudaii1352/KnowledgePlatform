### 可组合扩散模型 (Composable Diffusion)

```yaml
id: codi
name: CoDi
full_name: 可组合扩散模型 (Composable Diffusion)
year: '2023'
org: Microsoft
paper_url: https://proceedings.neurips.cc/paper_files/paper/2023/hash/33edf072fe44f19079d66713a1831550-Abstract-Conference.html
category: diffusion_fusion
parent: —
motivation: 可组合扩散Any-to-Any生成
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/codi_detail.md
```

#### 📝 一句话总结

CoDi 提出了可组合扩散框架，通过输入侧 Bridging Alignment 和输出侧 Latent Alignment，把文本、图像、视频、音频的条件空间与扩散潜空间对齐，解决了 any-to-any 多模态生成组合数量指数爆炸、训练数据缺失的问题。

#### 🎯 核心要点

- **Any-to-Any 生成目标**：支持任意输入模态组合到任意输出模态组合，包括单输出、多条件输入和多模态同步输出
- **Bridging Alignment**：以文本为桥接模态，对齐文本、图像、视频、音频 prompt encoder，使单条件训练后的扩散模型可零样本接受多条件组合
- **Composable Diffusion**：分别训练图像、视频、音频、文本 LDM，再通过对齐后的条件表示和跨模态 attention 组合成统一生成系统
- **Latent Alignment**：在扩散步骤 \(t\) 对不同输出模态的 noisy latent 建立共享环境表示，让一个模态的 UNet 可关注另一个模态的扩散状态
- **线性任务覆盖组合空间**：只训练有限的成对/桥接任务，就能在推理时通过表示插值覆盖未见过的多输入、多输出组合
- **多模态数据覆盖**：使用 LAION-400M、AudioSet、AudioCaps、Freesound、BBC Sound Effect、SoundNet、WebVid10M、HD-Villa-100M 等数据训练和对齐

#### 🔬 深入细节

![CoDi 模型架构](https://codi-gen.github.io/static/images/main_architecture.jpg)
*图：CoDi 的三阶段架构。先对齐 prompt encoder，再训练单模态 diffuser，最后在扩散潜变量层面对不同 diffuser 做 Latent Alignment，实现多模态联合生成。*

CoDi 的出发点是：真实世界的生成需求常常不是“文本到图像”这么单一，而是“文本+音频到视频+音频”“图像到文本+音频”等组合。若有 \(n\) 个模态，朴素训练所有输入/输出组合会接近指数复杂度；更现实的问题是许多组合根本没有成对数据。CoDi 因此选择把问题拆成两个对齐空间：输入条件空间和输出扩散潜空间。

输入侧的 Composable Multimodal Conditioning 先把不同模态 prompt encoder 对齐到同一空间。论文记文本、图像、视频、音频编码器为 \(C_t,C_i,C_v,C_a\)，对多输入条件直接做加权组合：

$$
C(x_t,x_i,x_v,x_a)=\sum_{m\in\{t,i,v,a\}}\alpha_m C_m(x_m),
\qquad \sum_m \alpha_m = 1
$$

这里的关键是 Bridging Alignment：文本几乎和所有模态都有大规模配对数据，因此 CoDi 不尝试训练所有模态两两对齐，而是固定已有的 CLIP 文本-图像空间，再用音频-文本、视频-文本对比学习把音频和视频拉到同一空间。这样，虽然单个 diffuser 训练时可能只见过一个条件模态，推理时仍可把多个条件编码相加或插值，形成组合条件。

```python
# CoDi 训练与推理核心流程（简化伪代码）
modalities = ["text", "image", "video", "audio"]

# 1. Bridging Alignment: 以 text 为桥，对齐 prompt encoders
freeze(C_text, C_image)  # 复用 CLIP 文本-图像空间
for batch in audio_text_pairs:
    loss = contrastive(C_audio(batch.audio), C_text(batch.text))
    update(C_audio, loss)
for batch in video_text_pairs:
    loss = contrastive(C_video(batch.video), C_text(batch.text))
    update(C_video, loss)

# 2. 单模态 LDM: 分别训练 text/image/video/audio diffuser
for modality in modalities:
    for x, condition in dataset[modality]:
        z = VAE_encoder[modality](x)
        t, eps = sample_timestep(), normal_noise()
        z_t = alpha(t) * z + sigma(t) * eps
        cond = aligned_prompt_encoder(condition)
        loss = mse(eps, UNet[modality](z_t, t, cond))
        update(UNet[modality], loss)

# 3. Latent Alignment: 多输出联合生成时互相 cross-attend
for paired_modalities in joint_pairs:
    zA_t, zB_t = sample_noisy_latents(paired_modalities)
    envB = V_B(zB_t)
    lossA = mse(epsA, UNet_A.cross_attend(zA_t, envB, t, cond))
    lossB = mse(epsB, UNet_B.cross_attend(zB_t, V_A(zA_t), t, cond))
    update(cross_attention_and_env_encoders, lossA + lossB)
```

CoDi 的基础生成器是 Latent Diffusion Model。输入样本 \(x\) 先经自编码器变成潜变量 \(z=E(x)\)，再按时间步 \(t\) 加噪：

$$
z_t=\alpha_t z+\sigma_t\epsilon,\qquad \epsilon\sim\mathcal{N}(0,I)
$$

单模态扩散训练目标是预测噪声：

$$
\mathcal{L}_D
=\mathbb{E}_{z,\epsilon,t}\left\|\epsilon-\epsilon_\theta(z_t,t,C(y))\right\|_2^2
$$

这一步让每个模态保持自己的最佳生成结构：图像 LDM 继承 Stable Diffusion 1.5，视频 LDM 在图像 diffuser 上加入时序模块和 latent shift，音频 LDM 把 mel-spectrogram 当作单通道图像潜变量建模，文本 LDM 使用 OPTIMUS/GPT-2 风格的文本潜空间。也就是说，CoDi 没有强行把所有输出塞进一个 decoder，而是让每种模态保留擅长的 diffuser。

输出侧的 Latent Alignment 是 CoDi 的第二个关键。设要联合生成模态 \(A\) 和 \(B\)，它们在扩散步 \(t\) 的潜变量为 \(z_t^A,z_t^B\)。CoDi 用环境编码器 \(V_B\) 把 \(z_t^B\) 投到共享潜空间，然后让 \(A\) 的 UNet 在每层通过 cross-attention 关注 \(V_B(z_t^B)\)：

$$
\mathcal{L}_{\text{Cross}}^A
=\mathbb{E}_{z,\epsilon,t}
\left\|\epsilon-\epsilon_{\theta_c}(z_t^A,V_B(z_t^B),t,C(y))\right\|_2^2
$$

直觉上，Bridging Alignment 解决“我该听哪些输入条件”，Latent Alignment 解决“多个输出在生成过程中如何同步”。例如文本提示生成雨天街景视频和雨声时，视频 diffuser 的中间状态能关注音频 diffuser 的中间状态，音频也能反向关注视频，从而比后处理拼接更容易产生时间一致的输出。

与传统单向跨模态模型相比，CoDi 的优势在于可组合性。单向模型通常为某个固定方向训练，如 text-to-image 或 text-to-audio；CoDi 则将训练成本压到一组线性的桥接任务和成对 latent alignment 任务。未见过的组合在推理时通过条件表示插值、环境表示对齐和多 diffuser 同步去噪完成，因此它更像一个“可插拔的多模态扩散系统”，而不是一个固定输入输出接口的生成器。

> ⚠️ 注意：CoDi 的 any-to-any 能力主要来自对齐空间的可组合泛化，并不意味着所有未见组合都有同等质量；质量仍受单模态 diffuser、成对数据覆盖和 alignment 稳定性影响。

#### 🧪 练习题

```yaml
question: "CoDi 中 Bridging Alignment 的核心作用是什么？"
options:
  - "让所有输出模态共用同一个 VAE decoder"
  - "以文本为桥，把不同模态的 prompt encoder 对齐到同一条件空间，减少组合训练成本"
  - "在推理时把多个 diffuser 的像素输出直接平均"
  - "只用于提升文本生成质量，与多模态条件无关"
answer: 1
explain: "Bridging Alignment 利用文本与图像、音频、视频之间更容易获得的配对数据，把条件编码器对齐到共享空间，使模型能通过表示插值组合任意输入条件。"
```
