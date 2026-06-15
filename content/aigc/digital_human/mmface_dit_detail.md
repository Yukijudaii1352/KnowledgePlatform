### MMFace-DiT：双流 DiT 多模态人脸生成

```yaml
id: mmface_dit
name: MMFace-DiT
full_name: "多模态面部生成DiT (Multimodal Face Generation with DiT)"
year: "2026"
org: "CVPR 2026"
paper_url: "https://arxiv.org/abs/2601.12345"
category: "talking_head"
parent: "vasa1"
motivation: "双流DiT多模态融合架构"
```

#### 📝 一句话总结

MMFace-DiT 提出双流扩散 Transformer，将文本语义与 mask、sketch、edge 等空间条件在统一 DiT block 中融合，解决人脸生成里语义可控性和结构可控性难以协同的问题。

#### 🎯 核心要点

- 在 VAE latent 空间生成高保真人脸，避免像素空间扩散的高成本。
- 采用 image token 与 text token 双流处理，而不是外接独立 ControlNet。
- 用 AdaLN 注入全局条件，用 RoPE attention 作为跨模态融合核心。
- 支持文本 + 分割 mask、文本 + sketch 等多模态人脸控制。
- 重点是可控人脸图像生成，不是典型音频驱动 talking-head；纳入数字人管线时可作为人脸资产/参考图生成模块。

#### 🔬 深入细节

![MMFace-DiT 生成流程](https://arxiv.org/html/2603.29029v1/Images/MMDiT_Process.jpg)
*图：MMFace-DiT 生成流程。图像 latent 被切成 image tokens，文本由 CLIP 编码为空间外语义条件，空间先验作为结构控制输入。*

> ⚠️ 资料限制：manifest 中 `2601.12345` 快速核验后标题不匹配；公开可匹配论文为 `MMFace-DiT: A Dual-Stream Diffusion Transformer for High-Fidelity Multimodal Face Generation`，本文据此整理。

传统多模态人脸生成常把空间控制模块拼接到预训练文本扩散模型外部，例如额外加 ControlNet 或多个单模态分支。这类做法能快速复用模型，但不同条件之间常出现冲突：文本说“高发髻”，mask 给出另一种轮廓，模型可能只服从其中一个条件。

MMFace-DiT 的核心是把多模态融合放进 DiT 主干。图像 latent token 和文本 token 并行流动，空间条件经过编码后影响 image stream；全局条件通过 AdaLN 调制每个 DiT block；RoPE attention 在统一注意力中建模 token 间空间关系和语义关系。

```python
# MMFace-DiT 采样伪代码
def mmface_generate(prompt, spatial_condition):
    z = sample_noise_latent()
    text_tokens = clip_text_encoder(prompt)
    spatial_tokens = condition_encoder(spatial_condition)  # mask/sketch/edge
    global_cond = pool(text_tokens, spatial_tokens)

    for step in diffusion_steps:
        img_tokens = patchify(z)
        eps_tokens = dual_stream_dit(
            img_tokens, text_tokens, spatial_tokens,
            timestep=step, global_cond=global_cond
        )
        z = scheduler.step(z, unpatchify(eps_tokens), step)
    return vae.decode(z)
```

对数字人系统而言，MMFace-DiT 的意义在于“可控身份/脸部资产生成”：它不解决音频驱动运动，但能为 talking-head 模型提供结构一致、属性可控的参考人脸。与 VASA/Teller/RAP 这类动态生成方法结合时，它更像上游资产生成器。

#### 🧪 练习题

```yaml
question: "MMFace-DiT 相比外接 ControlNet 式多模态控制的主要优势是什么？"
options:
  - "完全不使用扩散采样"
  - "在 DiT 主干内部统一融合文本和空间条件，减少多模态冲突"
  - "只能生成低分辨率灰度图"
  - "只支持音频输入"
answer: 1
explain: "双流 DiT 让语义 token 与空间 token 在主干中共同建模，比外接多个独立控制模块更利于协同融合。"
```
