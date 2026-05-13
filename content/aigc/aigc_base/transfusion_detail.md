### Transfusion

```yaml
id: transfusion
title: "Transfusion: Predict the Next Token and Diffuse Images with One Multi-Modal Model"
authors: "Chunting Zhou, Lili Yu, Arun Babu, Kushal Tirumala, Michihiro Yasunaga, Leonid Shamis, Jacob Kahn, Xuezhe Ma, Luke Zettlemoyer, Omer Levy"
year: "2024"
venue: "arXiv 2408.11039"
paper_url: "https://arxiv.org/abs/2408.11039"
category: "unified"
parent: "chameleon"
motivation: "在单一Transformer中融合语言模型的next-token prediction与扩散模型的连续生成，实现文本与图像的无缝集成"
```

#### 📝 一句话总结

Transfusion 提出在**单一 Transformer** 上同时训练 **next-token prediction（文本）** 和 **diffusion（图像）** 两个目标函数，无需将图像离散化为 token，即可在一个模型中高效生成文本和图像，在图像生成质量上以 **1/34 的计算量** 超越全离散化方案 Chameleon，并达到与专用图像生成模型（DeepFloyd）可比的水平。

#### 🎯 核心要点

- **双目标训练范式**：对文本 token 使用标准因果语言模型损失（next-token prediction），对图像 patch 使用扩散损失（DDPM），两个损失在同一 Transformer 上联合训练
- **连续图像表示**：图像通过预训练 VAE 编码为连续潜空间向量，再分割为 patch 序列（如 2×2 latent pixels/patch），避免了 VQ-VAE 离散化带来的信息损失
- **模态感知注意力机制**：文本 token 使用标准因果注意力（causal mask），图像 patch 之间使用双向注意力（bidirectional），图像 patch 对前文文本可见但文本不可见未来图像
- **轻量 U-Net 编解码层**：在 Transformer 输入/输出端为图像 patch 添加浅层 U-Net 结构（仅增加约 3.8% 参数），显著提升图像生成质量（FID 从 27.2 降至 16.0）
- **高效扩展性**：在 0.16B–7B 参数规模上，Transfusion 的文本性能与纯文本 Llama 模型持平，图像生成 FID 以约 1/34 的 FLOPs 匹配 Chameleon
- **大规模验证**：7B 模型在 2T 等效 token 上训练，FID 6.78、GenEval 0.63，接近 DeepFloyd（FID 6.66、GenEval 0.61），超越 SDXL（GenEval 0.55）
- **图像编辑能力**：仅用 8k 编辑样本微调即可执行指令式图像编辑，展现跨模态组合的泛化能力

#### 🔬 深入细节

##### 核心架构示意

![Transfusion 架构示意图](https://arxiv.org/html/2408.11039v2/x1.png)
*图：Transfusion 在单一 Transformer 中融合 LM 和 Diffusion 的训练流程。文本 token 使用因果注意力 + 交叉熵损失，图像 patch 使用双向注意力 + 扩散去噪损失。*

##### 算法伪代码

```python
# Transfusion 训练伪代码
def transfusion_train_step(model, text_tokens, image_patches, vae):
    """
    text_tokens: 离散 token 序列
    image_patches: 通过 VAE 编码后的连续潜空间 patch
    """
    # 1. 对图像 patch 采样噪声时间步 t ~ Uniform(0, T)，添加噪声
    t = sample_timestep()
    noise = sample_gaussian(image_patches.shape)
    noised_patches = sqrt(alpha_bar_t) * image_patches + sqrt(1 - alpha_bar_t) * noise

    # 2. 将 [BOI] + noised_patches + [EOI] 插入文本序列对应位置
    mixed_sequence = interleave(text_tokens, noised_patches, t_embedding)

    # 3. 前向传播（模态感知注意力）
    #    - 文本 token: 因果注意力 (causal mask)
    #    - 图像 patch: 双向注意力 (bidirectional within image)
    #    - 图像可看到前文文本，文本不可看到未来图像
    outputs = model(mixed_sequence, attention_mask="intra-image-bidirectional")

    # 4. 计算混合损失
    text_loss = cross_entropy(outputs[text_positions], text_targets)
    image_loss = mse(outputs[image_positions], noise)  # 预测噪声 ε
    total_loss = text_loss + λ * image_loss  # λ=5 in experiments

    return total_loss

# Transfusion 图像生成推理
def generate_image(model, text_prompt, num_steps=250):
    # 1. 用 LM 自回归生成文本直到输出 [BOI]
    context = autoregressive_decode(model, text_prompt, stop_token="[BOI]")

    # 2. 初始化纯噪声图像 patch
    x_T = sample_gaussian(num_patches)

    # 3. DDPM 反向去噪（可用 classifier-free guidance）
    for t in reversed(range(num_steps)):
        epsilon_pred = model(context + x_t, t)  # 预测噪声
        x_{t-1} = denoise_step(x_t, epsilon_pred, t)

    # 4. 通过 VAE 解码器还原像素空间
    image = vae.decode(x_0)
    return image
```

##### 动机与背景

多模态生成的核心挑战在于：**文本是离散序列，图像是连续信号**，两者的最优生成范式截然不同。语言模型（LM）通过 next-token prediction 在离散 token 上取得了巨大成功，而图像生成领域的最强方法是扩散模型（Diffusion），直接在连续空间中操作。

此前的统一多模态方法（如 Chameleon）选择将图像也离散化为 token，从而用统一的 next-token prediction 处理所有模态。然而，这种方法存在两个根本问题：
1. **信息瓶颈**：VQ-VAE 的离散化过程不可避免地丢失图像细节，限制了生成质量的上限
2. **效率低下**：将 256×256 图像编码为 1024 个离散 token，序列极长，训练和推理成本高昂

Transfusion 的核心洞察是：**不必强迫所有模态使用同一个目标函数**。既然文本适合 LM、图像适合 Diffusion，那就让一个共享的 Transformer 同时优化两个目标，各取所长。

##### 核心机制详解

**1. 数据表示与序列构造**

文本使用标准 BPE tokenizer 编码为离散 token。图像通过预训练的 VAE（来自 Stable Diffusion 1.x）编码为 \(32 \times 32 \times 8\) 的连续潜空间表示，然后将其分割为不重叠的 patch。每个 patch 对应 \(p \times p\) 个 latent pixel，通过线性投影映射到 Transformer 的隐藏维度。特殊标记 `[BOI]`（Begin of Image）和 `[EOI]`（End of Image）标记图像边界。

> 💡 **关键**：patch 大小是重要的超参数。\(2 \times 2\) 的 patch 将 256×256 图像编码为 256 个向量（而非 Chameleon 的 1024 个 token），在质量和效率间取得良好平衡。

**2. 模态感知注意力（Intra-Image Bidirectional Attention）**

标准因果注意力对图像生成并不理想——图像 patch 之间存在强烈的空间依赖关系，需要全局信息交互。Transfusion 设计了一种混合注意力模式：

$$
\text{Attention}(i, j) = \begin{cases}
\text{允许} & \text{if } j \leq i \text{ (标准因果，文本对文本)} \\
\text{允许} & \text{if } i, j \in \text{同一图像} \text{ (双向，图像内部)} \\
\text{允许} & \text{if } j \text{ 是图像前的文本，} i \text{ 是图像 patch} \\
\text{禁止} & \text{otherwise}
\end{cases}
$$

消融实验表明，双向注意力对图像生成至关重要：在 0.76B 模型上，将图像注意力从因果改为双向，FID 从 31.6 降至 16.7（提升 47%）。

**3. U-Net 编解码层**

受扩散模型中 U-Net 架构启发，Transfusion 在 Transformer 的输入端和输出端为图像 patch 添加了轻量级 U-Net 层。具体而言：

- **编码端**：在图像 patch 进入 Transformer 前，经过若干下采样-上采样卷积块处理，通过跳跃连接（skip connection）保留多尺度特征
- **解码端**：Transformer 输出的图像表示经过对称的 U-Net 解码块，融合编码端的跳跃连接特征后输出最终去噪预测

这些 U-Net 层仅对图像 patch 生效，不影响文本处理路径。在 7B 模型中仅增加 3.8% 的参数量，但带来显著的图像质量提升。

> ⚠️ **注意**：U-Net 层的效果随模型规模递减——在 0.16B 模型中贡献 106% 的额外参数但 FID 提升显著（37.6→18.8），在 7B 模型中仅 3.8% 参数但 FID 仍从 18.6 降至 16.0。这表明更大的 Transformer 本身能学到部分局部特征处理能力。

**4. 训练目标与损失函数**

总损失为两个模态损失的加权和：

$$
\mathcal{L} = \mathcal{L}_{\text{LM}} + \lambda \cdot \mathcal{L}_{\text{DDPM}}
$$

其中 \(\mathcal{L}_{\text{LM}}\) 是标准的 next-token prediction 交叉熵损失，\(\mathcal{L}_{\text{DDPM}}\) 是扩散去噪损失（预测添加的噪声 \(\epsilon\)）：

$$
\mathcal{L}_{\text{DDPM}} = \mathbb{E}_{t, \epsilon} \left[ \| \epsilon - \epsilon_\theta(x_t, t) \|^2 \right]
$$

实验中 \(\lambda = 5\)，用于平衡两个损失的量级差异。

**5. 推理流程**

Transfusion 的推理是**混合自回归-扩散**过程：
1. 模型以自回归方式逐 token 生成文本
2. 当输出 `[BOI]` token 时，切换到扩散模式
3. 从纯高斯噪声开始，通过 250 步 DDPM 去噪迭代生成图像 patch
4. 输出 `[EOI]` 后切回自回归模式继续生成文本
5. 支持 classifier-free guidance（CFG，guidance scale=3.5 用于 GenEval，5.0 用于 FID）

##### 与 Chameleon 的关键区别

| 维度 | Chameleon | Transfusion |
|------|-----------|-------------|
| 图像表示 | 离散 token（VQ-VAE, 8192 codebook） | 连续潜空间 patch（VAE） |
| 训练目标 | 统一 next-token prediction | 文本 LM + 图像 Diffusion |
| 图像注意力 | 因果（causal） | 双向（bidirectional） |
| 序列长度（256px） | 1024 tokens | 256 patches（2×2） |
| 图像生成 FID（7B） | 26.74 | 6.78 |
| GenEval（7B） | 0.39 | 0.63 |
| 文本性能 | 与 Llama 持平 | 与 Llama 持平 |

> 💡 **关键洞察**：Transfusion 证明了"**每种模态用最适合它的目标函数**"这一简单原则的强大威力。共享 Transformer 参数不会导致模态间的负迁移，反而能在几乎不损失文本能力的前提下获得远超离散化方案的图像生成质量。

##### 扩展性分析

在 0.16B 到 7B 的五个模型规模上，Transfusion 展现出优异的扩展特性：
- **文本性能**：在所有规模上与同参数量的纯文本 Llama 模型几乎完全一致（C4 PPL 差异 < 0.1）
- **图像生成**：FID 随模型规模稳定下降，且在每个规模点上均大幅优于 Chameleon。以 FID 12 为基准，Transfusion 0.37B 即可达到，而 Chameleon 需要约 34 倍的 FLOPs

#### 🧪 练习题

```yaml
question: "Transfusion 中图像 patch 之间使用什么注意力机制？"
options:
  - "标准因果注意力（causal attention）"
  - "完全双向注意力（full bidirectional attention）"
  - "仅限同一图像内的双向注意力（intra-image bidirectional attention）"
  - "交叉注意力（cross attention）"
answer: 2
explain: "Transfusion 对同一图像内的 patch 使用双向注意力以捕获空间依赖，但不同图像之间仍遵循因果顺序，文本 token 也保持因果注意力。消融实验显示这一设计使 FID 从 31.6 降至 16.7。"
```