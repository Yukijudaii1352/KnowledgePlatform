### 视频GPT (VideoGPT)

```yaml
id: videogpt
name: VideoGPT
full_name: 视频GPT (VideoGPT)
year: "2021.04"
org: UC Berkeley
paper_url: "https://arxiv.org/abs/2104.10157"
category: generative
parent: "—"
motivation: "利用VQ-VAE和Transformer自回归生成视频"
```

#### 📝 一句话总结

VideoGPT 用 3D VQ-VAE 将视频压缩为离散时空 latent token，再用 GPT 式 Transformer 自回归建模 token 序列，解决了直接在像素空间生成视频维度过高、训练和采样成本过大的问题。

#### 🎯 核心要点

- **两阶段生成框架**：先训练 VQ-VAE tokenizer，再训练 autoregressive Transformer prior
- **3D VQ-VAE**：用 3D convolution 和 transposed convolution 在时间与空间上共同下采样和上采样
- **Axial self-attention**：在 VQ-VAE residual block 中加入轴向注意力，提升重建和生成质量
- **离散 latent prior**：把视频 latent 展平成序列，用 GPT-like masked self-attention 预测下一个 code
- **时空位置编码**：为 latent token 注入空间和时间位置信息，使 Transformer 能区分帧内位置和帧间顺序
- **条件生成扩展**：通过 cross-attention 做帧条件生成，通过 conditional LayerNorm 做动作或类别条件生成
- **基准验证**：在 BAIR Robot Pushing、UCF-101、TGIF、ViZDoom 等数据上展示无条件、单帧条件、动作条件视频生成

#### 🔬 深入细节

##### 核心示意图

![VideoGPT 训练流程](https://raw.githubusercontent.com/wilson1yan/VideoGPT/master/VideoGPT.png)
*图：VideoGPT 先把视频编码为离散 latent codes，再用 Transformer 预测 latent 序列，最后由 VQ-VAE decoder 还原为视频。*

##### 动机与背景

视频生成比图像生成难，核心原因是输入维度同时沿空间和时间膨胀。若直接用自回归模型预测每个像素，序列长度巨大，训练和采样都很慢。VideoGPT 的选择是保留 likelihood-based autoregressive model 的稳定训练优势，但把建模对象从像素换成 VQ-VAE 的离散 latent token。

第一阶段训练 VQ-VAE。encoder \(E\) 把视频 \(x\) 映射到连续 latent，再通过 codebook \(e_k\) 做最近邻量化，decoder \(G\) 重建视频。典型目标为：

$$
\mathcal{L}_{\text{VQ}} =
\|x - G(z_q)\|_2^2
+ \|\text{sg}(E(x)) - z_q\|_2^2
+ \beta \|E(x) - \text{sg}(z_q)\|_2^2
$$

其中 \(z_q\) 是量化后的 codebook embedding，第二项训练 codebook，第三项是 commitment loss。VideoGPT 的 VQ-VAE 在 encoder/decoder 中使用 3D 卷积处理视频时空结构，并在 residual block 中用 axial attention 增强长程依赖。

第二阶段训练 GPT prior。将离散 code \(z_{1:N}\) 展平成序列后，Transformer 学习：

$$
p_\theta(z_{1:N}) =
\prod_{i=1}^{N} p_\theta(z_i \mid z_{<i})
$$

条件生成时，可以把单帧或前缀帧编码成条件表示，通过 cross-attention 输入 prior；动作或类别则可以通过 conditional normalization 调制 Transformer 层。

##### 算法伪代码

```python
# Stage 1: train video tokenizer
for video in video_batches:
    z_e = encoder_3d_conv_axial_attn(video)
    z_q, code_ids = nearest_codebook_lookup(z_e)
    recon = decoder_3d_deconv_axial_attn(z_q)
    loss = recon_loss(video, recon)
    loss += codebook_loss(stopgrad(z_e), z_q)
    loss += beta * commitment_loss(z_e, stopgrad(z_q))
    optimize(vqvae, loss)

# Stage 2: train autoregressive prior
freeze(vqvae)
for video in video_batches:
    code_ids = vqvae.encode_to_codes(video)
    seq = flatten_spacetime(code_ids)
    logits = transformer_prior(seq[:-1], position="spacetime")
    loss = cross_entropy(logits, seq[1:])
    optimize(transformer_prior, loss)

# Sampling
seq = autoregressive_sample(transformer_prior, condition=optional_context)
video = vqvae.decode_from_codes(unflatten_spacetime(seq))
```

##### 方法机制拆解

VideoGPT 的核心不是提出复杂的新模块，而是把两个成熟组件组合成一个可复现的视频生成基线。VQ-VAE 负责去除视频中的低层冗余，Transformer 负责建模高层离散序列的时空依赖。这样既避免 GAN 的训练不稳定，也避免像素自回归的巨大计算成本。

3D convolution 的作用是让 tokenizer 从一开始就把时间维度纳入压缩，而不是逐帧编码。若只逐帧压缩，prior 仍要独自学习大量运动一致性；3D tokenizer 能把局部运动模式编码进 latent token，降低 prior 的负担。

Axial attention 是 VideoGPT 在 VQ-VAE 里提升建模能力的重要细节。完整时空 self-attention 成本高，轴向注意力分解为沿时间、高度、宽度等轴分别建模，使局部长程依赖更可控。论文的消融表明，加入 axial attention 的 VQ-VAE 重建和生成质量更好。

与传统视频 GAN 相比，VideoGPT 的优点是目标函数明确、可以用 likelihood 和 cross entropy 训练、条件生成接口自然。缺点也很直接：自回归采样仍然逐 token 进行，长视频生成会变慢，且 codebook 压缩质量限制了最终像素质量。

> 💡 关键：VideoGPT 的“GPT”不是处理文本，而是处理 VQ-VAE 离散视频 token；它把视频生成转化为离散时空 token 的语言建模问题。

#### 🧪 练习题

```yaml
question: "VideoGPT 为什么先训练 VQ-VAE 再训练 Transformer prior？"
options:
  - "为了把高维视频压缩为更短的离散 latent 序列，降低自回归建模成本"
  - "为了让 Transformer 直接预测 RGB 像素"
  - "为了完全避免使用位置编码"
  - "为了把视频生成改成监督分类任务"
answer: 0
explain: "VQ-VAE 去除时空冗余并生成离散 code，Transformer 只需在压缩后的 token 空间建模序列分布。"
```
