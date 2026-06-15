### MotionGPT3
```yaml
id: motiongpt3
name: MotionGPT3
full_name: "运动作为第二模态 (Human Motion as a Second Modality)"
year: "2025"
org: "学术界"
paper_url: "https://arxiv.org/abs/2502.12345"
category: body_motion
parent: mdm
motivation: "LLM第二模态扩散解码"
```

#### 📝 一句话总结
MotionGPT3 将人体运动作为独立于文本的第二连续模态，用 motion VAE、双流 Transformer 和轻量扩散头统一运动理解与生成，缓解离散量化误差和单流多模态训练互相干扰。

#### 🎯 核心要点
- 连续运动表示：用预训练 motion VAE 将原始 motion 编码为连续 latent，避免 VQ token 的量化误差。
- 双流/混合架构：文本和运动保留各自参数通路，通过共享或跨模态 attention 交换信息，减少模态干扰。
- 运动扩散头：从语言 backbone hidden states 预测运动 latent 分布，用 diffusion supervision 提升生成多样性和保真度。
- 三阶段训练：先生成、再跨模态对齐、最后联合微调，降低多任务联合训练不稳定。
- 资料限制：manifest 中 `2502.12345` 与该题名不匹配；本文使用公开论文 `https://arxiv.org/abs/2506.24086` 与项目页资料。

#### 🔬 深入细节
##### 核心示意图/框架图
![MotionGPT3 method overview](https://arxiv.org/html/2506.24086v1/x3.png)
*图：MotionGPT3 方法总览。运动先经 VAE 得到连续 latent，再进入独立运动分支，与语言分支通过跨模态连接完成理解和生成。*

##### 核心流程伪代码
```python
# MotionGPT3 multimodal training
for batch in motion_language_tasks:
    text_tokens = text_tokenizer(batch.text)
    motion_latent = motion_vae.encode(batch.motion) if batch.has_motion else None

    text_h, motion_h = dual_stream_transformer(
        text_tokens=text_tokens,
        motion_latents=motion_latent,
        cross_modal_links=True,
    )

    loss = 0
    if batch.task == "motion_to_text":
        loss += cross_entropy(text_head(text_h), batch.target_text)
    if batch.task == "text_to_motion":
        target_z = motion_vae.encode(batch.target_motion)
        eps, t = sample_noise(target_z)
        eps_hat = diffusion_head(motion_h, t, text_h)
        loss += mse(eps_hat, eps)
    if batch.task == "alignment":
        loss += contrastive_or_matching_loss(text_h, motion_h)
    update(loss)
```

##### 方法解读
早期 MotionGPT/T2M-GPT 系列常把运动离散化成 VQ token，再让 LLM 像生成单词一样生成动作。这样天然适配自回归语言模型，但会带来两层问题：运动本身是连续轨迹，离散 codebook 会造成重建误差；把文本 token 和运动 token 混在单流 backbone 里训练，也容易损伤语言能力或让 motion task 互相干扰。

MotionGPT3 的第一步是把运动编码为连续 latent：
$$
z=\mathcal{E}(m^{1:M}),\qquad \hat{m}^{1:M}=\mathcal{D}(z),
$$
其中 \(\mathcal{E}\) 和 \(\mathcal{D}\) 是 motion VAE。连续 latent 保留了更多速度、关节角、接触等细粒度信息；同时 diffusion head 可以在 latent 空间建模一对多生成，而不是被迫输出单一 token 序列。

双流 Transformer 的直觉是“共享语义，不共享所有参数”。文本流保留预训练语言模型的语言知识，运动流拥有专门处理 motion latent 的参数；跨模态连接只在需要的位置打开，让文本描述影响运动生成，也让运动特征反向支持 captioning 和问答。相比单流拼接，这种架构更接近 mixture-of-transformers，对新增运动模态更友好。

训练调度同样重要。论文采用 generate-then-align 的三阶段策略：先让模型在生成任务上学会从文本产生运动 latent，再做文本-运动对齐，最后联合训练理解和生成任务。这样可以避免一开始就把 captioning、text-to-motion、QA 等目标混在一起导致梯度冲突。

与 MDM 的区别在于，MDM 是专用运动扩散模型，输入文本条件直接生成 motion；MotionGPT3 则把运动作为 LLM 的第二模态，使同一模型既能生成运动，也能解释运动、回答运动相关问题。其代价是系统更复杂，但优点是任务覆盖面和语言理解能力更强。

#### 🧪 练习题
```yaml
question: "MotionGPT3 为什么采用连续 motion VAE latent 而不是只使用 VQ 离散运动 token？"
options:
  - "为了完全取消 Transformer"
  - "为了避免量化误差并保留更细粒度的运动信息"
  - "为了让运动只能做分类任务"
  - "为了把所有 motion 变成固定一帧"
answer: 1
explain: "连续 latent 能减少 VQ codebook 的信息损失，并为扩散头在 latent 空间建模多样运动提供基础。"
```
