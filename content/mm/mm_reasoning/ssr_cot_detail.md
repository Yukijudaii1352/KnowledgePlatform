### SSR-CoT - 空间推理思维链 (Spatial Reasoning Chain-of-Thought)

```yaml
id: ssr_cot
name: SSR-CoT
full_name: "空间推理思维链 (Spatial Reasoning Chain-of-Thought)"
year: "2026"
org: "SJTU"
paper_url: "https://proceedings.neurips.cc/paper_files/paper/2025/hash/b3732a13897c4cea145c3bdece80de64-Abstract-Conference.html"
category: "frontier_2026"
parent: "visual_cot"
motivation: "百万级空间推理数据，增强深度感知"
```

#### 📝 一句话总结

SSR-CoT/SSR 提出用深度图生成空间推理 rationale，并把这些文本 rationale 蒸馏成紧凑的 latent tokens 注入 VLM，使模型在无需显式输出长 CoT 的情况下获得深度感知和空间推理能力。它同时构建百万级 SSR-CoT 数据集与 SSRBench，用于训练和评估图像-深度-问题-推理-答案链路。

#### 🎯 核心要点

- **MIDI 模块**：提出 Mamba-based Image-Depth Interpreter，将 RGB 特征、深度特征和问题编码为深度感知的空间 reasoning latent tokens
- **深度到 rationale 的桥接**：先用 Depth Pro 估计深度，再把空间关系、距离、位置等信息写入中间 rationale
- **latent CoT 蒸馏**：不在推理时输出冗长文字 CoT，而是把 rationale 压缩进 \(Z_R\) latent tokens，插入 VLM 输入序列
- **两阶段训练**：Stage 1 对齐 MIDI latent tokens 与自然语言 rationale；Stage 2 可选地与 VLM 联合训练，直接监督最终答案
- **SSR-CoT 数据集**：整合 LLaVA-CoT、Visual-CoT、VoCoT、SpatialQA，形成超过 100 万条 image-depth-question-rationale-answer 样本
- **SSRBench 基准**：覆盖 general 与 spatial 任务，用于评估深度利用、空间关系理解和 VQA 泛化

#### 🔬 深入细节

##### 核心框架

![SSR 框架图](https://arxiv.org/html/2505.12448v3/x2.png)
*图：SSR 由深度估计、MIDI 模块、VLM 推理与两阶段训练组成；Stage 1 让 MIDI 学会恢复空间 rationale，Stage 2 可选地让 MIDI 与 VLM 联合生成最终答案。*

##### 动机与背景

多数 VLM 只看 RGB 图像，天然缺少几何深度信息。即使引入深度图或点云，传统做法也常把深度当作额外输入特征，缺少“如何把深度用于推理”的中间表达。例如判断“谁在更前面”“物体是否在桌子下面”“人推着什么”时，模型需要把像素级深度转成对象级位置、距离、遮挡和交互关系。

SSR 的核心思想是把深度数据翻译成结构化、可解释的空间 rationale，再把 rationale 压缩为 latent tokens。这样既保留了 CoT 的推理信息，又避免推理阶段生成大量文字带来的成本。

##### MIDI：从图像和深度生成空间 latent tokens

给定 RGB 图像 \(X_V \in \mathbb{R}^{H\times W\times 3}\)、文本问题 \(X_T\)，SSR 首先用 Depth Pro 得到单目深度图：

$$
X_D \in \mathbb{R}^{H\times W\times 1}
$$

随后分别提取 RGB 和深度特征。论文使用 CLIP ViT-L/14 作为视觉编码器 \(E_V\)，使用 SigLIP 作为深度编码器 \(E_D\)：

$$
H_\alpha = E_\alpha(X_\alpha), \quad \alpha \in \{V,D\}
$$

再通过两层 MLP projector \(\phi_V,\phi_D\) 映射到语言模型可用的语义空间：

$$
Z_\alpha = \phi_\alpha(H_\alpha), \quad \alpha \in \{V,D\}
$$

MIDI 的核心是一个 Mamba-based language model \(f_{\text{LM}}\)，它联合 RGB 特征、深度特征和问题，生成表示中间空间 rationale 的隐状态：

$$
H_R = f_{\text{LM}}(Z_V,Z_D,X_T)
$$

最后再用投影层 \(\phi_R\) 变成可插入 VLM 的 latent rationale tokens：

$$
Z_R = \phi_R(H_R)
$$

这些 \(Z_R\) token 被当作“隐式空间思维链”拼入 VLM 的图文输入，最终答案为：

$$
Y_A = f_{\text{VLM}}(X_V,Z_R,X_T)
$$

> 💡 关键：SSR 不是简单把深度图塞给 VLM，而是让 MIDI 把深度转换成任务相关的空间推理表示，再由 VLM 使用这些 latent tokens 回答问题。

##### 两阶段训练目标

**Stage 1：Reasoning and Alignment**

Stage 1 只训练 MIDI，使它产生的 latent tokens 能被冻结或后续 LLM 理解为原始文字 rationale。每个样本包含 ground-truth rationale \(Y_R\)，训练目标是从 \(X_V,X_D,X_T,Z_R\) 自回归重建该 rationale：

$$
\mathcal{L}_1(\theta)=
-\mathbb{E}_{(X_V,X_D,X_T,Z_R,Y_R)\sim D}
\left[
\frac{1}{|Y_R|}
\sum_{i=1}^{|Y_R|}
\log P_\theta(Y_{R,i}\mid X_V,X_D,X_T,Z_R,Y_{R,<i})
\right]
$$

这一阶段解决两个问题：MIDI 必须学会“读懂深度并形成空间推理”，同时还要把 latent tokens 投影到语言语义空间，使后续 VLM 能消费它们。

**Stage 2：Co-Training**

Stage 2 是可选的联合训练。此时不再监督中间 rationale，而是让 VLM 直接生成答案 \(Y_A\)，目标函数为：

$$
\mathcal{L}_2(\theta)=
-\mathbb{E}_{(X_V,X_D,X_T,Y_A)\sim D}
\left[
\frac{1}{|Y_A|}
\sum_{j=1}^{|Y_A|}
\log P_\theta(Y_{A,j}\mid X_V,X_D,X_T,Y_{A,<j})
\right]
$$

因为 Stage 2 不需要 rationale 标注，所以可以引入更多普通 VQA 样本来扩展泛化能力。论文也强调 MIDI 具备 plug-and-play 特性：只做 Stage 1 时，也能把 \(Z_R\) 作为外部模块接入已有 VLM。

##### SSR-CoT 数据构造

![SSR-CoT 标注流程](https://arxiv.org/html/2505.12448v3/x3.png)
*图：SSR-CoT 先估计深度，再结合 bounding box、SpatialRGPT/GPT-4o 等工具生成空间 rationale，并通过质量评估筛选。*

SSR-CoT 的样本格式可以理解为：

```yaml
image: RGB image
depth: estimated depth map
question: spatial or general VQA question
rationale: object locations, depth/order/proximity relations, and reasoning steps
answer: final answer
```

数据来源包括：

- LLaVA-CoT：通用和科学 VQA 的结构化 reasoning 数据
- Visual-CoT：以 bounding box 作为中间思考步骤的多模态 CoT 数据
- VoCoT：包含对象关系和框标注的细粒度 image-text CoT 数据
- SpatialQA：包含深度相关和机器人空间问答的数据

处理流程大致如下：

```python
# SSR-CoT 构造伪代码
def build_ssr_cot(raw_vqa_samples):
    dataset = []
    for sample in raw_vqa_samples:
        depth = depth_pro(sample.image)
        objects = extract_boxes_or_spatial_entities(sample)
        spatial_query = rewrite_as_spatial_query(sample.question, objects)
        rationale = generate_spatial_rationale(
            image=sample.image,
            depth=depth,
            question=spatial_query,
            tools=["SpatialRGPT", "GPT-4o"],
        )
        if quality_check(sample.image, sample.question, rationale, sample.answer):
            dataset.append((sample.image, depth, sample.question, rationale, sample.answer))
    return dataset
```

论文报告，加入 intermediate rationale 后，Qwen2.5-VL-7B-Instruct 的评估准确率从 67.80 提升到 79.42，说明这些 rationale 不只是解释性文本，而是包含了对答案有用的空间信息。

##### 推理效率：显式 CoT 到 latent CoT

显式输出文字 CoT 的问题是推理慢、token 多，还可能引入冗余解释。SSR 把 rationale 蒸馏到少量 latent tokens 后，可以在推理时避免输出长链。论文在 SpatialBench 上对比显示，SFT 文本 CoT 版本每样本需要数百个 token，而 SSR 只需要极少 latent reasoning token，并显著缩短推理时间。

这种设计的直觉是：训练时用文字 rationale 教模型“空间信息应该如何组织”，推理时让 MIDI 在隐藏空间中提供同类信息。VLM 接收到的是压缩后的空间工作记忆，而不是一整段自然语言解释。

##### 与传统空间 VLM 的区别

| 方法 | 深度信息使用方式 | 中间推理 | 推理成本 |
|---|---|---|---|
| RGB-only VLM | 无显式深度 | 依赖语言模型猜测空间关系 | 低，但空间错误多 |
| 直接拼接深度特征 | 深度作为额外视觉输入 | 缺少对象级/关系级 rationale | 中等，深度利用可能浅 |
| 文本 CoT 空间推理 | 显式生成空间描述 | 可解释但 token 长 | 高 |
| SSR / SSR-CoT | 深度经 MIDI 转为 latent rationale | 隐式空间 CoT | 低，且可 plug-and-play |

#### 🧪 练习题

```yaml
question: "SSR 为什么要把空间 rationale 蒸馏成 latent tokens，而不是推理时直接输出完整文字 CoT？"
options:
  - "因为 VLM 不能处理自然语言 rationale"
  - "因为 latent tokens 可以保留空间推理信息，同时显著降低长文本 CoT 的 token 成本"
  - "因为深度图只能用 Mamba 编码，不能用 Transformer 编码"
  - "因为 SSRBench 不允许模型输出解释"
answer: 1
explain: "SSR 用文字 rationale 做训练监督，让 MIDI 学到深度相关的空间推理；推理时以压缩 latent tokens 注入 VLM，避免生成冗长 CoT。"
```
