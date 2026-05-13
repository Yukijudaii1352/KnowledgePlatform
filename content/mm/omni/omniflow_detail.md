### OmniFlow: Any-to-Any Generation with Multi-Modal Rectified Flow

```yaml
id: omniflow
name: "OmniFlow"
year: 2025
venue: "CVPR 2025"
org: "UCLA"
category: diffusion_fusion
parent: codi-2
arxiv: "2412.01169"
authors: "Shufan Li, Konstantinos Kallidromitis, Akash Gokul, Yusuke Kato, Kazuki Kozuka, Trevor Darrell"
```

---

## 一句话总结

OmniFlow 将 Stable Diffusion 3 的 MMDiT 架构扩展为多流 Omni-Transformer，通过**多模态修正流 (Multi-Modal Rectified Flow)** 统一建模图像、文本、音频的 any-to-any 生成，以模块化预训练+合并微调策略在仅 30M 训练图像下达到与 SD3-Medium 持平的生成质量。

---

## 核心要点

1. **多模态修正流统一框架**：为每个模态分配独立时间轴 $t_i$，通过路径 $\tau: t \to (t_1, t_2, \ldots, t_n)$ 编码任意生成任务（如 T→I 对应 $(1,0,1)\to(0,0,1)$），缺失模态的时间步设为 1（纯噪声），从而用单一模型覆盖所有 any-to-any 组合。

2. **多模态 Classifier-Free Guidance**：定义跨模态影响量 $\delta_{ij} = v_\theta(x_i^t, x_j^0) - v_\theta(x_i^t)$，通过独立的引导系数 $\alpha_{ij}$ 精确控制每对输入-输出模态间的对齐强度，当退化为两模态时等价于标准 CFG。

3. **Omni-Transformer 架构**：扩展 MMDiT 为三流结构（图像/文本/音频），每个模态拥有独立的 QKV 投影和 FFN 参数，唯一的跨模态操作是**联合注意力**（拼接所有模态的 Q/K/V 后做标准 attention），无额外可训练参数。

4. **模块化预训练策略**：(1) 以 SD3 的图像+文本模块初始化 Model 1；(2) 单独训练文本→音频模型 Model 2（100k 步）；(3) 合并 Model 1 和 Model 2（文本模块权重取平均）得到 Model 3；(4) 在多任务数据上微调 Model 3（150k 步）。相比从头训练节省巨大计算开销。

5. **训练配方探索**：在音频/文本生成中系统对比了 5 种连续流匹配变体和 2 种离散扩散模型（SEDD/MDLM），发现 **rf/lognorm**（修正流 + logit-normal 时间步分布）在 FAD 和 CLAP 上均最优。

6. **时间步偏移 (Timestep Shift)**：将 SD3 的分辨率自适应 shift 机制推广到音频/文本生成，$\hat{t} = \gamma t / (1 + (1-\gamma)t)$，$\gamma > 1$ 产生凹调度（前慢后快），shift=3.0 在音频和文本任务上效果最佳。

7. **SOTA 级生成质量**：GenEval=0.62（持平 SD3-Medium，远超 CoDi +0.24 / UniDiffuser +0.19）；FAD=1.75（优于 AudioLDM2）；CLIP=31.54（超越所有基线）。仅用 30M 图像训练，效率远高于 Chameleon-7B（3.5B 图像）和 Transfusion-7B。

---

## 深入细节

### 整体架构

![OmniFlow 整体架构](https://ar5iv.labs.arxiv.org/html/2412.01169v2/assets/x3.png)

*图：OmniFlow 整体流水线。三个模态分别经 VAE 编码为潜变量，加噪后与统一时间步嵌入一起送入 N 个 Omni-Transformer 块，最终各模态独立线性层输出速度场预测 $v$。*

![Omni-Transformer Block](https://ar5iv.labs.arxiv.org/html/2412.01169v2/assets/x4.png)

*图：单个 Omni-Transformer 块的设计。每个模态有独立的 QKV 投影和 FFN，联合注意力通过拼接所有模态的 Q/K/V 实现跨模态交互。时间步嵌入 $y$ 通过 AdaLN 调制各层。*

### 多模态修正流公式

**前向插值（每个模态独立）：**

$$x_i^{t_i} = (1 - t_i) x_i^0 + t_i x_i^1, \quad x_i^1 \sim \mathcal{N}(0, I)$$

**关键约束——模态间解耦：**

$$\frac{\partial x_i^{t_i}}{\partial t_j} = 0, \quad i \neq j$$

即模态 $i$ 的噪声状态仅由自身时间步 $t_i$ 控制，与其他模态的时间步无关。

**路径编码生成任务：**

| 任务 | 路径起点 $(t_1^{img}, t_2^{txt}, t_3^{aud})$ | 路径终点 |
|------|------|------|
| T→I (文本→图像) | $(1, 0, 1)$ | $(0, 0, 1)$ |
| T→A (文本→音频) | $(1, 0, 1)$ | $(1, 0, 0)$ |
| T→I+A (文本→图像+音频) | $(1, 0, 1)$ | $(0, 0, 0)$ |
| A→T+I (音频→文本+图像) | $(1, 1, 0)$ | $(0, 0, 0)$ |
| 联合生成 | $(1, 1, 1)$ | $(0, 0, 0)$ |

*注：$t=0$ 表示干净数据，$t=1$ 表示纯高斯噪声。缺失模态始终保持 $t=1$。*

### 训练伪代码

```
Algorithm: Multi-Modal Rectified Flow Training
─────────────────────────────────────────────
Input: 数据集 D（每个样本包含模态子集 {i1, i2, ...}）
Output: 共享网络参数 θ

while not converged:
    # 1. 采样数据（可能只有部分模态）
    x = (x_{i1}^0, x_{i2}^0, ...) ~ D
    
    # 2. 缺失模态设为零向量（其噪声版本为纯噪声）
    for j not in {i1, i2, ...}:
        x_j^0 = 0
    
    # 3. 采样路径 τ 和全局时间步 t
    τ ~ PathDistribution()    # 编码当前任务
    t ~ Uniform([0, 1])
    (t_1, ..., t_N) = τ(t)
    
    # 4. 对每个模态独立加噪
    for i in 1..N:
        x_i^1 ~ N(0, I)      # 采样噪声
        x_i^{t_i} = (1 - t_i) * x_i^0 + t_i * x_i^1
    
    # 5. 网络预测速度场并计算损失
    v_pred = v_θ(x_1^{t_1}, ..., x_N^{t_N}, t_1, ..., t_N)
    L = Σ_{i ∈ {i1,i2,...}} ||v_i - v_pred_i||²
    # 其中 v_i = x_i^0 - x_i^1（目标速度）
    
    # 6. 梯度更新
    θ ← θ - lr * ∇_θ L
```

### 多模态 Classifier-Free Guidance

标准单模态 CFG：$\hat{v} = v(x^t, c) + (\alpha - 1)(v(x^t, c) - v(x^t))$

**多模态扩展：**

$$\hat{v}_\theta(x_1^{t_1} \ldots x_n^{t_n}) = v_\theta(x_1^{t_1} \ldots x_n^{t_n}) + \sum_{j \neq i} (\alpha_{ij} - 1) \delta_{ij}$$

其中 $\delta_{ij} = v_\theta(x_i^t, x_j^0) - v_\theta(x_i^t)$ 表示输入模态 $j$ 对输出模态 $i$ 的影响。

**实现方式**：通过将不参与的模态设为纯噪声 $x^1$ 来获得条件/无条件预测。例如获取 $v_\theta(x_1^t, x_2^0)$ 时计算 $v_\theta(x_1^t, x_2^0, x_3^1)$。

**效果**：用户可通过调节 $\alpha_{ij}$ 独立控制输出与每个输入模态的对齐程度。例如在 A+I→T 任务中，增大 $\alpha_{au}$ 使输出更像音频描述，增大 $\alpha_{im}$ 使输出更像图像描述。

### Omni-Transformer 块内部机制

```
OmniTransformerBlock(x1, x2, x3, y):
    # y: 统一时间步嵌入（3个正弦嵌入经MLP融合）
    
    # 模态独立的 QKV 投影（AdaLN 调制）
    q1, k1, v1 = AdaLN_QKV_img(x1, y)
    q2, k2, v2 = AdaLN_QKV_txt(x2, y)
    q3, k3, v3 = AdaLN_QKV_aud(x3, y)
    
    # 联合注意力（唯一的跨模态操作，无额外参数）
    Q = Concat(q1, q2, q3)
    K = Concat(k1, k2, k3)
    V = Concat(v1, v2, v3)
    
    # 每个模态的输出 = 对所有模态的加权聚合
    out_i = Softmax(q_i^T · K / √d) · V   # 注意力跨越所有模态
    
    # Skip connection + 模态独立 FFN
    x1 = x1 + out_1;  x1 = x1 + FFN_img(x1, y)
    x2 = x2 + out_2;  x2 = x2 + FFN_txt(x2, y)
    x3 = x3 + out_3;  x3 = x3 + FFN_aud(x3, y)
    
    return x1, x2, x3
```

**关键设计选择**：模态独立参数 + 联合注意力 = 可分别预训练各模态模块，合并后通过注意力自然实现跨模态交互。

### 训练配方消融

| 配方 | FAD ↓ | CLAP ↑ |
|------|-------|--------|
| eps/linear | 2.08 | .141 |
| v/cosine | 2.01 | .203 |
| v/linear | 1.86 | .126 |
| rf/uniform | 1.82 | .227 |
| **rf/lognorm** | **1.79** | **.254** |
| SEDD (离散) | - | .180 |
| MDLM (离散) | - | .163 |

**结论**：修正流 + logit-normal 时间步采样在音频和文本生成中均最优；离散扩散模型未展现出优于连续方法的优势。

### 主要实验结果

**文本→图像 (GenEval)**：OmniFlow (3.4B, 30M images) = 0.62，持平 SD3-Medium (2B, 1B images)，远超 CoDi (0.38) 和 UniDiffuser (0.43)。

**文本→音频 (AudioCaps)**：FAD=1.75（优于 AudioLDM2-Full-L 的 1.86），CLAP=0.183（持平 AudioLDM2 的 0.182），远超 CoDi (CLAP=0.053)。

**采样超参**：音频生成最优 guidance=8, shift=3.0；文本生成最优 guidance=4, shift=3.0。

![训练配方与采样效果](https://ar5iv.labs.arxiv.org/html/2412.01169v2/assets/x5.png)

![定性对比](https://ar5iv.labs.arxiv.org/html/2412.01169v2/assets/x8.png)

*图：与 CoDi、UniDiffuser 的文本→图像定性对比。OmniFlow 在提示词遵循和图像质量上均显著优于先前 any-to-any 模型。*

---

## 练习题

### Q1：路径编码的灵活性
**问题**：如果要实现"图像+音频→文本"(I+A→T) 的生成任务，路径 $\tau$ 的起点和终点分别应该是什么？请用 $(t_{img}, t_{txt}, t_{aud})$ 表示。

<details><summary>参考答案</summary>

起点：$(0, 1, 0)$ —— 图像和音频为干净数据（$t=0$），文本为纯噪声（$t=1$）

终点：$(0, 0, 0)$ —— 所有模态均为干净数据

推理时沿此路径积分，文本从噪声逐步去噪，而图像和音频保持干净作为条件输入。

</details>

### Q2：多模态 CFG 的计算开销
**问题**：在三模态设置下，对输出模态 $i$ 执行完整的多模态 CFG（Eq. 9）需要多少次前向传播？如果有 $n$ 个输入模态呢？

<details><summary>参考答案</summary>

需要 $n+1$ 次前向传播（$n$ 为输入条件模态数）：
- 1 次完整条件预测 $v_\theta(x_i^t, x_{j_1}^0, x_{j_2}^0, \ldots)$
- 对每个输入模态 $j$ 各 1 次：$v_\theta(x_i^t, x_j^0)$（其余设为噪声）
- 1 次无条件预测 $v_\theta(x_i^t)$（所有条件设为噪声）

在三模态中，若输出图像、输入文本+音频，则需要 $2+1=3$ 次前向传播（条件、仅文本条件、仅音频条件各一次，其中无条件可从后两者推导）。实际实现中可通过 batch 并行化。

</details>

### Q3：模块化设计的核心优势
**问题**：OmniFlow 的 Omni-Transformer 块中，联合注意力是唯一的跨模态操作且没有额外可训练参数。这一设计选择带来了什么关键的训练优势？如果将 FFN 也改为跨模态共享，会有什么潜在问题？

<details><summary>参考答案</summary>

**关键优势**：由于跨模态交互仅通过无参数的联合注意力实现，各模态的投影层和 FFN 可以完全独立预训练。OmniFlow 利用这一点：先用 SD3 初始化图像+文本模块，再单独训练音频模块，最后合并微调。这避免了从头训练的巨大开销（仅需 30M 图像 vs Chameleon 的 3.5B）。

**共享 FFN 的问题**：(1) 无法分别预训练各模态模块，因为 FFN 参数耦合了所有模态；(2) 不同模态的特征分布差异大（图像 patch vs 文本 token vs 音频频谱），共享 FFN 可能导致特征空间冲突；(3) 无法利用已有的强大单模态预训练模型（如 SD3）进行初始化。

</details>

### Q4：时间步偏移的直觉
**问题**：论文发现 $\gamma > 1$ 的时间步偏移（产生凹调度：前慢后快）能改善音频和文本生成质量。请从去噪过程的角度解释为什么"前期慢、后期快"可能有益。

<details><summary>参考答案</summary>

在修正流中，$t$ 接近 0 时数据接近干净，$t$ 接近 1 时接近纯噪声。凹调度意味着在高噪声阶段（$t$ 接近 1）分配更多采样步数。

直觉：高噪声阶段需要模型做出全局结构决策（如音频的整体节奏、文本的主题），这些决策对最终质量影响最大，因此需要更精细的步长。而低噪声阶段主要是细节修饰，可以用更大步长快速完成。这与图像生成中的观察一致：早期步骤决定构图，后期步骤添加纹理细节。

</details>

### Q5：与 CoDi 的本质区别
**问题**：CoDi 和 OmniFlow 都能实现 any-to-any 生成，但设计哲学截然不同。请从跨模态交互的深度和方式上对比两者，并解释为什么 OmniFlow 在 GenEval 上比 CoDi 高出 0.24 分。

<details><summary>参考答案</summary>

**CoDi**：后融合架构，各模态使用独立的编码器和解码器（如 ViT + Stable Diffusion），跨模态交互仅通过桥接对齐（bridge alignment）实现，例如 T+A→I 任务中简单地对文本嵌入和音频嵌入做加权平均。这种浅层交互无法捕捉模态间的细粒度关系。

**OmniFlow**：早期融合架构，在每一层的联合注意力中，所有模态的 token 都可以直接相互 attend。这意味着图像的每个 patch 可以同时关注文本的每个 token 和音频的每个频谱帧，实现深层、细粒度的跨模态推理。

GenEval 差距的原因：GenEval 测试复杂的组合性提示（如"两只猫和一个红球"），需要模型精确理解文本语义并映射到图像空间。OmniFlow 的逐层联合注意力允许图像特征在生成过程中持续参考文本条件，而 CoDi 的加权平均方式会丢失细粒度的语义信息。

</details>