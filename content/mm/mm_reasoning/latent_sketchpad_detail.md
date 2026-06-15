### Latent Sketchpad — 潜空间草图板 (Latent Sketchpad)

```yaml
id: latent_sketchpad
name: Latent Sketchpad
full_name: "潜空间草图板 (Latent Sketchpad)"
year: "2025"
org: "Google"
paper_url: "https://arxiv.org/abs/2501.latentsketchpad"
category: "frontier_2026"
parent: "mvot"
motivation: "潜空间草图绘制，高效辅助复杂推理"
```

#### 📝 一句话总结

Latent Sketchpad 提出在冻结的多模态大模型中外挂 Context-Aware Vision Head，让模型在自回归文本推理过程中生成连续视觉 latent，并用 Sketch Decoder 将这些 latent 渲染成可解释草图，从而把文本 CoT 扩展为“边想边画”的潜空间视觉思考。

#### 🎯 核心要点

- **潜空间视觉草图板**：不直接生成像素图，而是在 MLLM 视觉特征空间中生成连续 visual latents，用作推理中间状态
- **Context-Aware Vision Head**：根据 MLLM 当前隐藏状态、历史图像 latent 和当前图像已生成 latent，自回归地产生下一组视觉 latent
- **Pretrained Sketch Decoder**：独立于主模型训练，将视觉 latent 对齐到 VAE latent 空间，再渲染为草图，便于人类检查推理轨迹
- **冻结主干的模块化训练**：Vision Head 和 Sketch Decoder 可单独训练，尽量保持 Gemma3、Qwen2.5-VL 等预训练 MLLM 的原有理解能力
- **MazePlanning 数据集**：构造 47.8K 训练迷宫和 500 测试迷宫，用 interleaved text-image reasoning 评估空间规划能力
- **与 MVoT 的区别**：MVoT 依赖统一生成模型产生像素级中间图；Latent Sketchpad 复用预训练视觉特征，在 latent 层完成轻量视觉思考

#### 🔬 深入细节

##### 核心示意图

![Latent Sketchpad 总览](https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/overview.png)
*图：Latent Sketchpad 在现有 MLLM 上增加 Vision Head 与 Sketch Decoder，使模型可以在文本推理中插入视觉 latent。*

##### 动机与背景

传统多模态 CoT 主要把视觉信息转写为语言，复杂空间关系、路径规划和动态场景状态会被压缩成离散文本描述，容易丢失几何细节。另一类方法调用外部视觉工具或图像生成模型，但工具能力固定，像素生成也往往更关注逼真度而不是推理需要的抽象结构。

Latent Sketchpad 的核心判断是：预训练 MLLM 的视觉编码器已经拥有可用于理解的高质量视觉表征，只是这些表征通常只作为输入感知结果，而不会在推理过程中被主动生成。论文因此把视觉特征空间重新用作“内部草图板”：模型每走一步，可以生成下一段视觉 latent，用它帮助后续语言推理。

这种设计把视觉思考放在 latent 层，而不是像素层。latent 不需要对人类天然可读，但它可以保留空间结构；当需要解释时，再通过 Sketch Decoder 渲染成草图。这样既避免了高成本图像生成，又能让模型拥有可插拔的视觉中间状态。

##### 方法机制

![Vision Head 与 Sketch Decoder 架构](https://github.com/hwanyu112/Latent-Sketchpad/raw/main/asset/task_visualization.png)
*图：Latent Sketchpad 在 MazePlanning 中生成逐步草图，展示模型对路径状态的中间视觉表示。*

给定输入图像 \(X_0\)，视觉编码器先得到 visual latents：

$$l_{X_0}=G(X_0)\in\mathbb{R}^{n_v\times d_v}$$

连接器 \(C(\cdot)\) 将其投影到 LLM embedding 空间：

$$h_{X_0}=C(l_{X_0})$$

Latent Sketchpad 在原有文本 token 流中插入特殊标记，例如 `<start_of_image>` 与 `<end_of_image>`。当模型生成到视觉片段时，Context-Aware Vision Head 负责预测视觉 latent，而不是普通词表 token。它同时利用两类上下文：

- **Global context**：历史图像或历史草图 latent，提供长程视觉记忆
- **Local context**：当前正在生成的草图 latent，保证同一张草图内部连贯

可抽象为：

$$\hat{l}_{t}=H_\phi(h_t,\;l_{<t}^{global},\;l_{<t}^{local})$$

其中 \(H_\phi\) 是 Vision Head，\(h_t\) 是 MLLM 当前隐藏状态。训练时用视觉编码器得到的目标 latent \(l_t\) 监督：

$$\mathcal{L}_{vision}=\sum_t d(\hat{l}_t,l_t)$$

距离 \(d(\cdot)\) 可使用 cosine、L1 或 MSE。关键是主干 MLLM 冻结，只训练 Vision Head，降低对原模型语言/视觉理解能力的扰动。

##### 推理流程伪代码

```python
# Latent Sketchpad 推理伪代码
def latent_sketchpad_reason(model, vision_head, sketch_decoder, image, question):
    visual_latents = vision_encoder(image)
    context = connector(visual_latents) + tokenize(question)
    generated = []
    sketch_latents = []

    while not stop(generated):
        token = model.next_token(context + generated)

        if token == "<start_of_image>":
            current_sketch = []
            for i in range(NUM_VISUAL_TOKENS):
                h_i = model.hidden_state(context + generated + current_sketch)
                z_i = vision_head(
                    hidden_state=h_i,
                    global_visual_memory=sketch_latents,
                    local_visual_context=current_sketch,
                )
                current_sketch.append(z_i)

            sketch_latents.append(current_sketch)
            generated.append("<visual_latents>")
        else:
            generated.append(token)

    sketches = [sketch_decoder.decode(z) for z in sketch_latents]
    return parse_answer(generated), sketches
```

##### Sketch Decoder

Sketch Decoder 解决“latent 有用但人看不懂”的问题。它使用 AlignerNet 将 ViT/SigLIP/CLIP 等视觉特征映射到冻结 VAE 的 latent 空间，再由 VAE decoder 输出草图风格图像。训练目标结合像素重建、VAE latent 分布对齐和 patch embedding 对齐：

$$\mathcal{L}_{decoder}=\mathcal{L}_{focal}+\mathcal{L}_{nll}+\mathcal{L}_{mse}$$

其中 \(\mathcal{L}_{focal}\) 更强调前景笔画区域，\(\mathcal{L}_{nll}\) 对齐 VAE posterior，\(\mathcal{L}_{mse}\) 保持视觉 patch 语义一致。论文用 Quick, Draw! 草图数据预训练 decoder，因此输出更像结构化草图而非真实照片。

> 💡 关键：Sketch Decoder 不参与最终答案生成，它是解释器；模型真正用于推理的是连续视觉 latent。

##### 训练与评估

训练通常分两层：先让 MLLM 在 MazePlanning 上学习 interleaved reasoning 格式，再训练 Vision Head 对齐视觉 latent。MazePlanning 任务要求模型根据迷宫当前状态规划动作序列，输出被 `<actions>` 标签包裹的路径。评估指标包括 Success Rate（完整动作序列正确）和 Progress Rate（首次错误前连续正确动作比例）。

与文本 CoT 相比，Latent Sketchpad 的优势在于可以持续维护“当前路径/状态”的视觉记忆；与外部工具相比，它不需要每一步调用检测器、分割器或绘图程序；与像素级图像生成相比，它只在潜空间中补充推理状态，视觉输出只是可选解释。

##### 与传统方法的区别

| 方法 | 中间推理形态 | 是否依赖外部工具 | 是否直接生成像素 | 主要优势 |
|---|---|---|---|---|
| Text CoT | 文本 rationale | 否 | 否 | 简单、通用 |
| MVoT / Visual Sketchpad | 图像或绘图结果 | 常需要 | 是 | 人类可读、空间直观 |
| Latent Sketchpad | 连续视觉 latent | 否 | 否，解释时才解码 | 轻量、可插拔、保留视觉结构 |

#### 🧪 练习题

```yaml
question: "Latent Sketchpad 为什么选择在视觉 latent 空间生成中间草图，而不是直接生成像素图？"
options:
  - "因为 latent 空间可以复用预训练视觉特征，成本更低且更贴近推理所需的结构信息"
  - "因为像素图无法被 Sketch Decoder 读取"
  - "因为模型只能输出固定长度的文本 token"
  - "因为 MazePlanning 不包含任何视觉输入"
answer: 0
explain: "Latent Sketchpad 的核心是把预训练 MLLM 的视觉特征重新用于生成式视觉思考，推理时使用连续 latent，只有解释时才解码成草图。"
```
