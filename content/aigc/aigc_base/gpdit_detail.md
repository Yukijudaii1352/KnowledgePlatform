### GPDiT: Generative Pre-trained Autoregressive Diffusion Transformer

```yaml
metadata:
  title: "Generative Pre-trained Autoregressive Diffusion Transformer"
  abbreviation: "GPDiT"
  authors: "Yuan Zhang, Jiacheng Jiang, Wenzhao Zheng, Jie Zhou, Jiwen Lu"
  affiliations: "清华大学, StepFun"
  publication: "arXiv 2505.07344v5"
  year: 2025
  url: "https://arxiv.org/abs/2505.07344"
  tags: ["视频生成", "扩散模型", "自回归模型", "Transformer", "时间条件化"]
  one_line: "将帧级因果自回归与连续扩散过程结合，通过旋转式无参数时间条件化替代adaLN-Zero，实现高效长视频生成与表征学习"
```

#### 📝 一句话总结

GPDiT 提出了一种帧级自回归扩散 Transformer 框架，通过因果注意力机制保证时序一致性，并创新性地将扩散前向过程重新解释为复平面上的旋转操作，从而以无参数方式注入时间步信息（替代 adaLN-Zero，节省约 28% 参数），在视频生成、视频表征和少样本学习任务上均展现出强竞争力。

#### 🎯 核心要点

1. **帧级因果注意力机制**：不同于现有扩散模型使用双向注意力（破坏时序连贯性），GPDiT 采用帧级因果注意力——每个噪声帧 $n_i$ 仅关注之前的干净帧 $c_{<i}$ 和自身。这使模型天然支持 KV 缓存加速推理，并能生成超出训练帧长的视频。
2. **轻量因果注意力变体**：在标准因果注意力中，干净帧之间的互注意力计算复杂度为 $\mathcal{O}(\frac{1}{2}F^2)$，轻量变体（OF）去除了干净帧间的注意力计算，将额外开销从 $\mathcal{O}(F^2)$ 降至 $\mathcal{O}(F)$，在不损失生成质量的前提下大幅降低训练和推理成本。
3. **旋转式无参数时间条件化**：将扩散前向过程 $x_t = \cos\theta_t \cdot x_0 + \sin\theta_t \cdot \epsilon$ 重新解释为复平面上的正交旋转，直接对每个 Transformer 块的输入施加反向旋转 $R(\theta_t)$ 来注入时间步信息，完全替代 adaLN-Zero 的 MLP 参数。
4. **三维能力验证**：GPDiT-H（2B 参数）在 MSRVTT 零样本视频生成上达到 FVD=68（SOTA），在 UCF-101 上 FVD=218/IS=66.6；同时在视频表征（线性探测分类）和少样本学习（人体检测、上色、边缘重建、风格迁移）上表现优异。

#### 🔬 深入细节

##### 整体框架

![GPDiT 框架总览](https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x2.png)

*图 2：GPDiT 框架。左：推理流程——逐帧自回归生成，每步以前序干净帧为条件扩散去噪当前帧；中：GPDiT Block 结构——用旋转式时间条件化替代 adaLN-Zero，用因果注意力替代双向注意力；右：扩散前向过程的旋转解释——数据与噪声在复平面上通过无参数旋转演化。*

GPDiT 的核心设计理念是将自回归建模（Autoregressive）与扩散模型（Diffusion）在连续潜空间中统一。与离散 token 的自回归方法（如 VideoPoet、OmniTokenizer）不同，GPDiT 直接在连续潜空间中操作，避免了量化损失。具体而言，视频被 WanVAE 编码器压缩（每 4 帧→1 个潜表示），然后模型以帧为单位进行自回归：给定已生成的干净帧序列 $c_1, c_2, \ldots, c_{i-1}$，通过扩散过程生成下一帧 $c_i$。训练目标为标准的噪声预测损失：

$$\mathcal{L}(\theta) = \mathbb{E}_{t \sim U[0,1],\, \epsilon \sim \mathcal{N}(0,I),\, x \sim p_{\text{data}}} \left\| \epsilon_\theta(n_i, t \mid c_{<i}) - \epsilon^t \right\|^2$$

##### 因果注意力机制

![因果注意力变体](https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x3.png)

*图 3：两种因果注意力变体。(a)(c) 标准因果注意力（OF2）：干净帧之间互相关注；(b)(d) 轻量因果注意力（OF）：去除干净帧间注意力。$c_i$ 和 $n_i$ 分别表示干净帧和噪声帧。*

**标准因果注意力（OF2）**：每个噪声帧 $n_i$ 仅关注之前的干净帧 $c_{<i}$ 和自身，而干净帧之间也互相关注。这保证了时序因果性，同时允许干净上下文帧之间充分交互以提取丰富的条件信息。该设计天然兼容 KV 缓存，在推理时可显著加速长视频生成。

**轻量因果注意力（OF）**：标准因果注意力的主要问题是训练时需要维护噪声序列的干净副本用于注意力计算，导致内存和计算成本翻倍；推理时 KV 缓存随 token 累积不断膨胀。轻量变体利用视频数据的空间冗余性，去除干净帧之间的注意力计算。在标准设计中，注意力计算可分解为三部分：干净帧间注意力 $\mathcal{O}(\frac{1}{2}F^2)$、噪声帧与干净帧间注意力 $\mathcal{O}(\frac{1}{2}F^2)$、噪声帧自注意力 $\mathcal{O}(F)$。轻量变体去除第一项后，额外开销从 $\mathcal{O}(F^2)$ 降至 $\mathcal{O}(F)$。实验表明，OF 在生成质量上与 OF2 相当（UCF-101 FVD: 216 vs 214），但在表征任务上 OF2 更优（干净帧交互增强了特征表达能力）。

##### 旋转式时间条件化

传统 DiT 使用 adaLN-Zero（自适应层归一化）通过 MLP 将时间步嵌入注入每个 Transformer 块，这占据了模型约 28% 的参数量。GPDiT 提出了一种完全无参数的替代方案。

其核心思想是将方差保持（VP）扩散前向过程重新解释为复平面上的旋转。定义旋转角 $\theta_t$：

$$\cos\theta_t = \sqrt{\bar{\alpha}_t}, \quad \sin\theta_t = \sqrt{1 - \bar{\alpha}_t}$$

将干净样本 $x_0$ 和噪声 $\epsilon$ 堆叠为二维向量，前向过程即为正交旋转：

$$\begin{pmatrix} x_t^{(0)} \\ x_t^{(1)} \end{pmatrix} = \underbrace{\begin{pmatrix} \cos\theta_t & \sin\theta_t \\ -\sin\theta_t & \cos\theta_t \end{pmatrix}}_{R(\theta_t)} \begin{pmatrix} x_0 \\ \epsilon \end{pmatrix}$$

其中 $x_t^{(0)}$ 是通常的扩散样本，$x_t^{(1)}$ 是其正交伴随。模型被训练为从 $x_t^{(0)}$ 预测 $x_t^{(1)}$。关键创新在于：对每个 Transformer 块的输入施加角度为 $\theta_t$ 的反向旋转，即可高效地注入时间步信息，无需任何额外参数。其他条件（如文本、图像）仍通过标准方式（token 拼接或交叉注意力）注入。

```
# GPDiT 推理伪代码
def gpdit_inference(initial_frames, num_generate, model, scheduler):
    """帧级自回归扩散推理"""
    clean_frames = encode(initial_frames)  # WanVAE 编码
    
    for i in range(num_generate):
        # 初始化噪声帧
        n_i = sample_noise()  # ~ N(0, I)
        
        # 扩散去噪循环
        for t in reversed(scheduler.timesteps):
            theta_t = compute_rotation_angle(t)  # θ_t from noise schedule
            
            # 对输入施加旋转式时间条件化（替代 adaLN-Zero）
            rotated_input = apply_rotation(n_i, theta_t)
            
            # 因果注意力：n_i 仅关注 clean_frames 和自身
            noise_pred = model(rotated_input, context=clean_frames)
            
            # 去噪步
            n_i = scheduler.step(noise_pred, t, n_i)
        
        # 将去噪结果加入干净帧序列（支持 KV 缓存）
        clean_frames.append(n_i)
    
    return decode(clean_frames)  # WanVAE 解码
```

##### 模型配置与训练

| 模型 | 参数量 | 训练数据 | 训练策略 |
|------|--------|----------|----------|
| GPDiT-B | 80M | UCF-101 | 400k iter, lr=1e-4, batch=96 |
| GPDiT-H | 2.0B | LAION-Aesthetic + 混合图像视频 | 200k warmup(图像) + 200k(混合) |
| GPDiT-H-LONG | 2.0B | 24M 纯视频 | 续训 150k iter, lr=2e-5, 17-45帧 |

GPDiT-H 的训练分三阶段：(1) 200k 迭代的无条件图像预训练（LAION-Aesthetic，batch=960）；(2) 200k 迭代的图像-视频混合训练（等比采样，视频每 3 帧采样裁剪为 17 帧片段）；(3) 150k 迭代的纯视频续训（可变长度 17-45 帧）。视频潜表示由 WanVAE 压缩（4 帧→1 个潜表示）。

##### 实验结果

![视频生成结果](https://ar5iv.labs.arxiv.org/html/2505.07344/assets/x4.png)

*图 4：基于 MovieGenBench 数据集的 13 帧条件生成后续 16 帧的视频生成结果。*

**零样本视频生成（Table 2）**：

| 数据集 | 模型 | FID↓ | FVD↓ | IS↑ |
|--------|------|------|------|-----|
| MSRVTT | SnapVideo (3.9B) | 8.5 | 110 | - |
| MSRVTT | **GPDiT-H (2.0B)** | **7.4** | **68** | - |
| UCF-101 | PixelDance (1.5B) | 49.4 | 243 | 42.1 |
| UCF-101 | **GPDiT-H-LONG (2.0B)** | **7.9** | **218** | **66.6** |

GPDiT-H 在 MSRVTT 上以 2B 参数实现了 FVD=68，大幅超越 SnapVideo（3.9B, FVD=110）。在 UCF-101 上，GPDiT-H-LONG 达到 FVD=218、IS=66.6。

**UCF-101 训练对比（Table 3）**：GPDiT-B（仅 80M 参数）在 UCF-101 上达到 FVD=214（OF2）/216（OF），与 FAR（130M, FVD=194）等更大模型相当，验证了框架的参数效率。

**视频表征**：通过线性探测实验评估特征质量。OF2 变体显著优于 OF，表明干净帧间的注意力交互增强了表征能力。GPDiT-H 在开放域数据上训练后，在 UCF-101 分类任务上展现了良好的泛化表征能力。

**少样本学习**：仅用 20 个视频序列（每个由 3 对任务特定图像对采样生成）进行监督微调，GPDiT 即可完成人体检测、图像上色、Canny 边缘重建和风格迁移等任务，展示了强大的下游迁移能力。

#### 🧪 练习题

```yaml
quiz:
  - question: "GPDiT 中旋转式时间条件化的核心思想是什么？"
    options:
      A: "使用 MLP 将时间步嵌入映射为自适应归一化参数"
      B: "将扩散前向过程重新解释为复平面上的正交旋转，通过反向旋转注入时间信息"
      C: "使用正弦位置编码对时间步进行编码"
      D: "通过交叉注意力机制将时间步嵌入与特征融合"
    answer: "B"
    explanation: "GPDiT 将 VP 扩散的前向过程 x_t = cos(θ_t)·x_0 + sin(θ_t)·ε 解释为复平面上的旋转矩阵 R(θ_t) 操作，然后对每个 Transformer 块的输入施加反向旋转来注入时间步信息，完全替代了 adaLN-Zero 的 MLP 参数（节省约 28%）。"

  - question: "GPDiT 的轻量因果注意力（OF）相比标准因果注意力（OF2）主要去除了什么？"
    options:
      A: "噪声帧的自注意力计算"
      B: "噪声帧与干净帧之间的交叉注意力"
      C: "干净帧之间的互注意力计算"
      D: "所有帧间的注意力计算"
    answer: "C"
    explanation: "轻量因果注意力利用视频数据的空间冗余性，去除了干净帧之间的注意力计算（复杂度 O(F²/2)），将额外开销从 O(F²) 降至 O(F)。实验表明这不影响生成质量（FVD: 216 vs 214），但会略微降低表征能力。"

  - question: "GPDiT 相比离散 token 自回归方法（如 VideoPoet）的关键区别是什么？"
    options:
      A: "使用更大的模型参数量"
      B: "在连续潜空间中进行帧级自回归扩散，避免量化损失"
      C: "使用双向注意力而非因果注意力"
      D: "不需要任何预训练即可直接生成视频"
    answer: "B"
    explanation: "GPDiT 的核心创新之一是在连续潜空间（而非离散 token 空间）中进行帧级自回归扩散。离散 token 方法需要将视频量化为有限词表，不可避免地引入量化损失；GPDiT 直接在连续空间操作，保留了更丰富的视觉信息。"

  - question: "在 MSRVTT 零样本视频生成任务上，GPDiT-H 相比 SnapVideo 的优势体现在哪里？"
    options:
      A: "GPDiT-H 使用了更多的训练数据（1.1B vs 192M+6.4M）"
      B: "GPDiT-H 以更少的参数（2.0B vs 3.9B）实现了更低的 FVD（68 vs 110）"
      C: "GPDiT-H 的推理速度更快但生成质量略低"
      D: "GPDiT-H 在 IS 指标上大幅领先"
    answer: "B"
    explanation: "GPDiT-H 仅 2.0B 参数，在 MSRVTT 上达到 FVD=68、FID=7.4，而 SnapVideo 使用 3.9B 参数和 1.1B 训练数据仅达到 FVD=110、FID=8.5。GPDiT 以更少参数和数据实现了显著更优的生成质量。"
```