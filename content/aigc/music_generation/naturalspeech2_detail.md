### NaturalSpeech 2

```yaml
id: naturalspeech2
name: "NaturalSpeech 2"
full_name: "NaturalSpeech 2: Latent Diffusion Models are Natural and Zero-Shot Speech and Singing Synthesizers"
year: "2023"
org: "Microsoft Research Asia"
paper_url: "https://arxiv.org/abs/2304.09116"
category: "tts"
parent: "NaturalSpeech"
motivation: "利用连续潜在向量与扩散模型克服离散token的信息损失，实现大规模零样本语音与歌声合成"
```

#### 📝 一句话总结

NaturalSpeech 2 提出了一种基于**神经音频编解码器**与**潜在扩散模型**的非自回归 TTS 系统，通过将语音表示为连续潜在向量（而非离散 token）并结合 speech prompting 机制，在 44K 小时数据上训练后实现了**超越人类录音质量**的零样本语音与歌声合成。

#### 🎯 核心要点

- **连续潜在向量表示**：使用带残差向量量化（RVQ）的神经音频编解码器，将量化后的多层码本嵌入求和为单一连续向量，避免离散 token 的信息损失与多码本建模困难
- **潜在扩散模型**：基于 SDE 的扩散/去噪过程，在连续潜在空间中生成语音，以 WaveNet 为骨干网络，直接预测 \(\hat{z}_0\) 而非 score
- **三项联合损失**：数据重建损失 + score 匹配损失 + 新颖的 CE-RVQ 正则化损失（跨残差量化器的交叉熵约束）
- **Prior 模型**：Phoneme Encoder（Transformer）+ Duration/Pitch Predictor（卷积），提供帧级条件信息 \(c\)
- **Speech Prompting 机制**：训练时随机截取目标语音片段作为 prompt，对 duration/pitch predictor 使用 Q-K-V attention，对 diffusion model 使用双注意力瓶颈 + FiLM 仿射变换，实现零样本 in-context learning
- **大规模训练**：44K 小时多语言多说话人数据（MLS 数据集），400M 参数，16×V100 训练
- **SOTA 结果**：在 LibriSpeech/VCTK 上 CMOS 与真实录音持平甚至更优，SMOS 大幅超越 YourTTS/VALL-E，WER 仅 2.26%，50 条困难句子 0% 错误率

#### 🔬 深入细节

##### 整体架构

![NaturalSpeech 2 整体架构](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x1.png)
*图 1：NaturalSpeech 2 总览。系统由音频编解码器（上方）和条件潜在扩散模型（下方）两大部分组成。编解码器将语音压缩为连续潜在向量，扩散模型以音素编码器和时长/音高预测器为先验，在潜在空间中生成语音。*

##### 神经音频编解码器

![音频编解码器结构](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x2.png)
*图 2：编解码器由 Encoder、残差向量量化器（RVQ）和 Decoder 组成。RVQ 的 R 层码本嵌入求和为连续向量 z。*

编解码器的核心设计动机是**将离散 token 转化为连续向量**。传统方法（如 VALL-E）使用 RVQ 的离散码本索引作为语音表示，面临两个困境：

1. **码本数量少** → 信息损失大，语音质量差
2. **码本数量多** → 需要复杂的多阶段自回归建模，误差累积

NaturalSpeech 2 的解决方案：对 RVQ 的 \(R\) 层量化嵌入 \(e_1, e_2, \ldots, e_R\) 直接求和，得到单一连续向量：

$$z = \sum_{i=1}^{R} e_i$$

这样既保留了 RVQ 的高保真重建能力，又将表示统一为单一序列，可以直接用扩散模型建模。编解码器以 200 倍下采样率（16kHz 采样率下约 80Hz 帧率）提取帧级潜在表示。

> 💡 **关键洞察**：连续向量 = RVQ 所有层嵌入之和，这一简单操作消除了多码本序列建模的复杂性，是本文最重要的设计选择之一。

##### 潜在扩散模型

扩散模型在连续潜在空间中运行，采用 SDE 框架：

**前向过程**（加噪）：

$$\mathrm{d}z_t = -\frac{1}{2}\beta_t z_t \,\mathrm{d}t + \sqrt{\beta_t}\,\mathrm{d}w_t, \quad t \in [0,1]$$

条件分布为高斯：\(p(z_t|z_0) \sim \mathcal{N}(\rho(z_0, t), \Sigma_t)\)，其中 \(\rho(z_0, t) = e^{-\frac{1}{2}\int_0^t \beta_s ds} z_0\)，\(\Sigma_t = I - e^{-\int_0^t \beta_s ds}\)。

**反向过程**（去噪）：

$$\mathrm{d}z_t = -\left(\frac{1}{2}z_t + \nabla\log p_t(z_t)\right)\beta_t\,\mathrm{d}t + \sqrt{\beta_t}\,\mathrm{d}\tilde{w}_t$$

也可使用 ODE 形式进行确定性采样。

**网络设计**：使用 WaveNet 架构的 \(s_\theta(z_t, t, c)\) 直接预测去噪后的 \(\hat{z}_0\)（而非 score），作者发现这能获得更好的语音质量。

##### 训练损失

总损失由三部分组成：

$$\mathcal{L} = \mathcal{L}_{\text{diff}} + \mathcal{L}_{\text{dur}} + \mathcal{L}_{\text{pitch}}$$

其中扩散损失 \(\mathcal{L}_{\text{diff}}\) 包含三项：

$$\mathcal{L}_{\text{diff}} = \mathbb{E}_{z_0, t}\left[\underbrace{\|\hat{z}_0 - z_0\|_2^2}_{\text{数据重建损失}} + \underbrace{\|\Sigma_t^{-1}(\rho(\hat{z}_0, t) - z_t) - \nabla\log p_t(z_t)\|_2^2}_{\text{Score 匹配损失}} + \underbrace{\lambda_{\text{ce-rvq}}\mathcal{L}_{\text{ce-rvq}}}_{\text{RVQ 正则化}}\right]$$

**CE-RVQ 损失**是本文的创新正则化项：对每个残差量化器 \(j \in [1, R]\)，计算预测 \(\hat{z}_0\) 的残差向量 \(\hat{z}_0 - \sum_{i=1}^{j-1} e_i\) 与码本中所有嵌入的 L2 距离，经 softmax 得到概率分布，再与真实码本 ID 计算交叉熵。\(\lambda_{\text{ce-rvq}} = 0.1\)。

> 💡 **CE-RVQ 的直觉**：该损失迫使扩散模型的预测不仅在连续空间中接近真实值，还要在离散码本空间中对齐正确的量化索引，相当于为连续预测提供了离散结构化约束。

```python
# CE-RVQ 损失伪代码
def ce_rvq_loss(z_hat_0, codebooks, gt_indices):
    """
    z_hat_0: 扩散模型预测的连续向量 [B, T, D]
    codebooks: R 个码本, 每个 [num_codes, D]
    gt_indices: 真实码本索引 [B, T, R]
    """
    total_loss = 0
    residual = z_hat_0
    for j in range(R):
        # 计算残差与码本的 L2 距离
        distances = -torch.cdist(residual, codebooks[j])  # 负距离
        probs = softmax(distances, dim=-1)
        # 交叉熵损失
        total_loss += cross_entropy(probs, gt_indices[:, :, j])
        # 更新残差（使用真实嵌入）
        residual = residual - codebooks[j][gt_indices[:, :, j]]
    return total_loss / R
```

##### Prior 模型

Prior 模型为扩散模型提供条件信息 \(c\)：

1. **Phoneme Encoder**：基于 Transformer，将 FFN 替换为卷积网络以捕获音素序列的局部依赖
2. **Duration Predictor**：卷积块，L1 损失训练，将音素级隐藏序列扩展为帧级序列
3. **Pitch Predictor**：卷积块，L1 损失训练，预测帧级基频信息

训练时使用真实时长和音高，推理时使用预测值。

##### Speech Prompting 机制

![Speech Prompting 机制](https://ar5iv.labs.arxiv.org/html/2304.09116/assets/x3.png)
*图 3：Speech Prompting 在 duration/pitch predictor 和 diffusion model 中的不同策略。训练时从目标语音中随机截取片段作为 prompt，推理时使用参考说话人的语音。*

这是实现零样本合成的关键机制：

**训练策略**：从目标语音潜在序列 \(z\) 中随机截取片段 \(z^{u:v}\) 作为 prompt，剩余部分 \(z^{\setminus u:v}\) 作为扩散模型的学习目标。

**两种注入策略**：

1. **Duration/Pitch Predictor**：在卷积层中插入 Q-K-V attention，query 来自卷积隐藏序列，key/value 来自 prompt encoder 的输出。这允许预测器直接从 prompt 中学习说话人的韵律特征。

2. **Diffusion Model**：采用**双注意力瓶颈**设计，避免向扩散模型暴露过多细节：
   - **第一个注意力块**：用 \(m\) 个随机初始化的可学习嵌入作为 query，attend 到 prompt 隐藏序列 → 得到长度为 \(m\) 的压缩表示（信息瓶颈）
   - **第二个注意力块**：WaveNet 隐藏序列作为 query，\(m\) 长度的压缩表示作为 key/value
   - 注意力结果通过 **FiLM 层**（Feature-wise Linear Modulation）对 WaveNet 隐藏序列进行仿射变换

> ⚠️ **设计考量**：对 diffusion model 使用信息瓶颈而非直接 attention 是有意为之——如果暴露过多 prompt 细节，扩散模型可能直接复制而非学习泛化的说话人特征，反而损害生成质量。

**推理时**：使用目标说话人的一段参考语音（经 codec encoder 编码为潜在向量）作为 prompt，即可实现零样本语音克隆。

##### 与传统方法的对比

| 特性 | VALL-E (AR + 离散) | NaturalSpeech 2 (Non-AR + 连续) |
|------|-------------------|-------------------------------|
| 语音表示 | 离散 token 序列 | 连续潜在向量 |
| 生成模型 | 自回归语言模型 | 潜在扩散模型 |
| 码本建模 | 多阶段（AR + NAR） | 单一连续向量，无需分阶段 |
| 鲁棒性 | 存在重复/跳词问题 | 非自回归，50 条困难句 0% 错误 |
| 韵律多样性 | 受限 | 扩散模型天然支持多样采样 |
| 语音质量 (CMOS) | -0.31 vs NS2 | 与真实录音持平/更优 |

##### 实验结果亮点

- **语音质量**：在 LibriSpeech 上 CMOS 为 -0.142（vs GT），在 VCTK 上为 +0.208（vs GT），均在统计误差范围内或优于真实录音
- **说话人相似度**：SMOS 在 LibriSpeech 上达 3.54（GT 为 3.79），大幅超越 YourTTS（2.29）和 VALL-E（3.23）
- **可懂度**：WER 在 LibriSpeech 上仅 2.26%（GT 为 1.94%），在 VCTK 上 3.36%（GT 为 5.89%，NS2 更优）
- **鲁棒性**：50 条特别困难的句子上 0% 错误率，而 VALL-E 为 4%，YourTTS 为 12%
- **歌声合成**：同一模型可扩展到歌声合成任务

#### 🧪 练习题

```yaml
question: "NaturalSpeech 2 为什么将 RVQ 的多层码本嵌入求和为单一连续向量，而非直接使用离散 token？"
options:
  - "为了减少模型参数量和计算开销"
  - "为了避免多码本序列建模的复杂性和离散 token 的信息损失，使扩散模型可以在统一的连续空间中生成"
  - "为了兼容自回归语言模型的输入格式"
  - "为了提高 RVQ 编解码器本身的重建质量"
answer: 1
explain: "离散 token 面临码本少则信息损失、码本多则建模困难的两难困境。求和为连续向量后，既保留了多层 RVQ 的高保真信息，又将表示统一为单一序列，可直接用扩散模型在连续空间中建模，避免了多阶段自回归的复杂性。"
```