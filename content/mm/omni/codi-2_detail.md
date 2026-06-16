### 可组合扩散模型第二代 (CoDi-2)

```yaml
id: codi-2
name: CoDi-2
full_name: 可组合扩散模型第二代 (CoDi-2)
year: '2024'
org: Microsoft
paper_url: https://openaccess.thecvf.com/content/CVPR2024/html/Tang_CoDi-2_In-Context_Interleaved_and_Interactive_Any-to-Any_Generation_CVPR_2024_paper.html
category: diffusion_fusion
parent: codi
motivation: 上下文交错生成增强交互
topic_id: omni
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/omni/codi-2_detail.md
```

#### 📝 一句话总结

CoDi-2 在 CoDi 的可组合扩散基础上引入多模态大语言模型作为交互与推理中枢，让模型能理解交错的图文音频上下文，并自回归地产生可供扩散模型解码的连续条件特征，从而实现更强的 in-context、交互式 any-to-any 生成。

#### 🎯 核心要点

- **MLLM 作为生成中枢**：用 LLM/MLLM 理解多轮对话、交错图像/音频/文本指令和 in-context 示例，而不是只依赖扩散模型的条件编码器
- **连续特征生成**：不把图像和音频离散化成 token，而是让 MLLM 自回归预测扩散模型所需的条件特征 \(c\)
- **扩散模型解码输出**：预测出的视觉/音频条件特征输入 Stable Diffusion 2.1 unCLIP、AudioLDM 等扩散解码器生成高质量样本
- **联合训练损失**：同时优化文本 token loss、扩散像素/潜变量生成 loss、MLLM 输出特征与目标特征的 MSE loss
- **交错式 in-context 数据构造**：引入 MIMIC-IT、LAION-400M、AudioSet、WebVid、InstructPix2Pix、AUDIT 风格音频编辑和构造式 in-context multimodal generation 数据
- **能力范围扩展**：覆盖多轮对话、图像编辑、音频编辑、主体驱动图像生成、示例学习、组合推理和同步多模态输出

#### 🔬 深入细节

![CoDi-2 模型架构](https://codi-2.github.io/static/images/main_model.jpg)
*图：CoDi-2 架构。多模态编码器把图像/音频输入变成特征序列并插入 LLM 上下文；MLLM 生成文本 token 或连续多模态特征，后者再交给扩散模型生成图像/音频。*

CoDi-2 解决的是 CoDi 的交互短板。CoDi 已经能把多种 diffuser 可组合起来，但它本质上仍是围绕扩散条件和潜空间对齐设计的生成系统，对多轮对话、上下文示例、复杂编辑指令的理解不如 LLM 自然。CoDi-2 因此把 MLLM 放在中心：输入端用多模态编码器把图像、音频变成特征序列，并用特殊 token 包裹后插入语言上下文，例如 `<image> feature sequence </image>`、`<audio> feature sequence </audio>`。

这个设计让交错上下文成为普通的自回归序列问题。对于一句“参考这张图中的主体，把它放到另一张场景里，并保留这段音频的节奏”这样的指令，CoDi-2 不需要为每种任务写固定接口；MLLM 在同一上下文里看到文本、图像特征、音频特征和历史对话，再决定要输出文本回答，还是输出用于图像/音频扩散解码的条件特征。

```python
# CoDi-2 交错 any-to-any 生成流程（概念伪代码）
def codi2_generate(conversation):
    sequence = []

    # 1. 编码交错输入：文本保留 token，图像/音频转为连续特征并加特殊边界 token
    for item in conversation:
        if item.type == "text":
            sequence.extend(text_tokenizer(item.text))
        elif item.type == "image":
            sequence.extend(["<image>", image_encoder(item.image), "</image>"])
        elif item.type == "audio":
            sequence.extend(["<audio>", audio_encoder(item.audio), "</audio>"])

    # 2. MLLM 自回归推理，输出文本 token 或多模态条件特征
    outputs = MLLM.generate(sequence)

    # 3. 文本直接解码；图像/音频特征送入对应 diffusion decoder
    result = []
    for out in outputs:
        if out.kind == "text_token":
            result.append(text_decoder(out))
        elif out.kind == "image_feature":
            result.append(image_diffusion_decoder(condition=out.feature))
        elif out.kind == "audio_feature":
            result.append(audio_diffusion_decoder(condition=out.feature))

    return result
```

CoDi-2 没有采用“把图片/音频压成离散 token 再像文本一样生成”的路线。论文认为这种方案受 VAE 式 decoder 限制，生成质量难以追上扩散模型。因此它保留扩散模型作为最终生成器，让 MLLM 预测扩散模型需要的连续条件特征。扩散模型的基础目标仍是：

$$
\mathcal{L}_{DM}
=\mathbb{E}_{z,\epsilon,t}
\left\|\epsilon-\epsilon_\theta(z_t,t,C_y(y))\right\|_2^2
$$

其中 \(z_t\) 是噪声潜变量，\(C_y(y)\) 是条件编码器输出。CoDi-2 的关键改动是让 MLLM 输出条件特征 \(c_{\text{MLLM}}\)，并显式逼近目标样本的编码特征 \(C_x(x)\)。总损失为：

$$
\mathcal{L}
=\alpha\,\operatorname{MSE}(c_{\text{MLLM}}, C_x(x))
+\mathcal{L}_{DM}
+\mathcal{L}_t
$$

\(\mathcal{L}_t\) 是标准文本 token 预测损失，\(\mathcal{L}_{DM}\) 让扩散解码器生成高质量感知输出，MSE 项则给 MLLM 更直接的连续特征监督。这样做的直觉是：LLM 负责“理解和规划生成什么”，扩散模型负责“把连续条件变成高保真图像/音频”。

训练数据是 CoDi-2 能进行 in-context 生成的另一半。论文不仅使用图文、音文、视频文本等成对数据，还把 InstructPix2Pix、AUDIT 风格音频编辑、Kosmos-G/主体驱动生成等任务改造成交错示例格式。对于没有天然多模态输出的数据，CoDi-2 利用已对齐的编码器特征，把文本侧的任务描述或响应替换成同一空间中的多模态特征，从而构造“示例输入 + 当前指令 + 目标输出”的上下文学习格式。

与 CoDi 相比，CoDi-2 的关键差异是控制流从 diffuser 侧转移到了 MLLM 侧。CoDi 擅长把多个 diffuser 同步组合，但任务接口更像生成图；CoDi-2 则能在多轮聊天中读取历史示例、理解抽象编辑意图、进行组合推理，再调用扩散解码器落地为图像或音频。这使它更接近一个交互式多模态生成代理，而不是单次调用的跨模态生成模型。

> 💡 关键：CoDi-2 不是抛弃扩散模型，而是让 MLLM 生成扩散模型的连续条件特征；语言模型负责 in-context 推理，扩散模型负责高保真解码。

#### 🧪 练习题

```yaml
question: "CoDi-2 为什么让 MLLM 预测连续条件特征，而不是直接离散化生成图像/音频 token？"
options:
  - "因为连续特征可以直接交给扩散模型解码，保留扩散模型的高质量生成能力"
  - "因为 CoDi-2 不需要任何图像或音频解码器"
  - "因为文本 token loss 已经足以训练所有模态输出"
  - "因为连续特征只用于检索，不参与生成"
answer: 0
explain: "论文认为离散 token 方案受生成 decoder 限制；CoDi-2 让 MLLM 预测扩散条件特征，再由图像/音频扩散模型生成高保真输出。"
```
