### VAR — 视觉自回归建模 (Visual AutoRegressive Modeling)

```yaml
id: var
name: VAR
full_name: "视觉自回归建模 (Visual AutoRegressive Modeling)"
year: 2024
org: Tsinghua
paper_url: "https://arxiv.org/abs/2404.02905"
category: autoregressive
parent: llamagen
motivation: "下一尺度预测超越栅格扫描顺序"
```

#### 📝 一句话总结

VAR 提出"下一尺度预测"（next-scale prediction）范式，将图像自回归生成从逐像素的栅格扫描顺序重新定义为由粗到细的多尺度 token map 生成，首次使 GPT 风格的自回归模型在图像生成质量上超越扩散 Transformer（DiT），并展现出类似 LLM 的 Scaling Laws 和零样本泛化能力。

#### 🎯 核心要点

- **新范式 — 下一尺度预测**：将图像自回归建模从 1D 栅格扫描的 next-token prediction 改为多尺度的 next-scale prediction，每一步预测更高分辨率的完整 token map
- **多尺度 VQVAE（Multi-Scale VQVAE）**：设计多尺度量化自编码器，将图像编码为 \(K\) 层分辨率递增的 token map 序列 \((r_1, r_2, \dots, r_K)\)，分辨率从 \(1 \times 1\) 到 \(h \times w\)
- **GPT-2 风格 Transformer**：直接复用标准 GPT-2 架构（因果注意力 + AdaLN），无需双向注意力或特殊掩码设计
- **Scaling Laws**：模型参数从 0.3B 到 2B 展现清晰的幂律缩放规律，线性相关系数达 \(-0.998\)
- **零样本泛化**：无需额外训练即可完成图像修复（in-painting）、外扩（out-painting）和编辑（editing）
- **SOTA 性能**：ImageNet 256×256 上 FID 1.80、IS 356.4，推理速度比传统 AR 快 20 倍

#### 🔬 深入细节

##### 核心架构示意

![VAR 与传统 AR 对比](https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x1.png)
*图：(a) 语言 AR — 从左到右逐词生成；(b) 图像传统 AR — 栅格扫描逐 token 生成；(c) VAR — 从低分辨率到高分辨率逐尺度生成，每个尺度内并行生成所有 token。*

![多尺度 VQVAE 与 VAR Transformer](https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x2.png)
*图：(a) 多尺度 VQVAE 的编码-量化-解码流程；(b) VAR Transformer 的自回归训练与推理过程。*

##### 动机与背景

传统视觉自回归模型（如 VQGAN + GPT）将 2D 图像 token 展平为 1D 序列后按栅格扫描顺序逐个生成。这种做法存在三个根本问题：

1. **数学前提违反**：图像编码器产生的特征向量 \(f^{(i,j)}\) 之间相互依赖，展平后的 token 序列并不满足"当前 token 仅依赖前缀"的单向依赖假设
2. **结构信息丢失**：栅格扫描将 2D 空间结构压缩为 1D 序列，破坏了图像的空间局部性
3. **效率低下**：对 \(n \times n\) 的 token map，需要 \(\mathcal{O}(n^2)\) 次解码迭代，总计算量为 \(\mathcal{O}(n^6)\)

> 💡 **关键洞察**：人类感知图像是"先整体后细节"的层次化过程，而非逐像素扫描。VAR 将这一直觉形式化为多尺度自回归。

##### 核心机制：Next-Scale Prediction

**多尺度 token map 表示。** VAR 将一张图像编码为 \(K\) 个分辨率递增的 token map：

$$R = (r_1, r_2, \dots, r_K), \quad r_k \in [V]^{h_k \times w_k}$$

其中分辨率序列为 \((h_1, w_1), (h_2, w_2), \dots, (h_K, w_K)\)，从 \(1 \times 1\) 逐步增长到 \(h \times w\)。默认设置 \(K=10\)，分辨率为 \(1, 2, 3, 4, 5, 6, 8, 10, 13, 16\)。

**自回归分解。** 与传统 AR 按 token 分解不同，VAR 按尺度分解联合分布：

$$p(r_1, r_2, \dots, r_K) = \prod_{k=1}^{K} p(r_k \mid r_1, r_2, \dots, r_{k-1})$$

每一步预测的是一个**完整的 token map** \(r_k\)（包含 \(h_k \times w_k\) 个 token），而非单个 token。尺度内的所有 token **并行生成**。

**训练目标。** 最小化交叉熵损失：

$$\mathcal{L} = -\sum_{k=1}^{K} \sum_{i=1}^{h_k} \sum_{j=1}^{w_k} \log p\left(r_k^{(i,j)} \mid r_1, r_2, \dots, r_{k-1}\right)$$

> ⚠️ **注意**：尺度内 token 之间不存在因果依赖，因此同一尺度的 token 可以并行预测，这是 VAR 推理速度大幅提升的关键。

##### 多尺度 VQVAE

为了产生多尺度 token map，VAR 设计了专门的多尺度 VQVAE：

1. **编码**：标准编码器 \(\mathcal{E}\) 将图像编码为特征图 \(f \in \mathbb{R}^{h \times w \times C}\)
2. **多尺度量化**：对 \(f\) 进行多尺度插值得到 \(K\) 个不同分辨率的特征图，每个分别量化到共享码本 \(Z \in \mathbb{R}^{V \times C}\)
3. **残差设计**：除第一个尺度外，每个尺度量化的是与上一尺度上采样结果的**残差**，即 \(r_k = \mathcal{Q}(\phi_k(f) - \text{upsample}(\hat{f}_{k-1}))\)
4. **解码**：最终将所有尺度的量化特征求和后通过解码器 \(\mathcal{D}\) 重建图像

训练损失与标准 VQVAE 相同，包含重建损失、感知损失（LPIPS）和对抗损失：

$$\mathcal{L} = \|im - \hat{im}\|_2 + \|f - \hat{f}\|_2 + \lambda_P \mathcal{L}_P(\hat{im}) + \lambda_G \mathcal{L}_G(\hat{im})$$

##### VAR Transformer 架构

VAR Transformer 直接采用 GPT-2 风格的 decoder-only 架构：

- **输入序列**：将 \(K\) 个尺度的 token map 展平并拼接为一个序列，前面加上类别条件 token
- **注意力掩码**：标准因果掩码 — 每个尺度可以看到所有之前尺度的 token，但看不到后续尺度
- **条件注入**：使用 Adaptive Layer Normalization (AdaLN) 注入类别条件信息
- **输出头**：每个位置输出 \(V\) 维 logits，对应码本中的 token 概率分布

##### 算法伪代码

```python
# VAR 训练伪代码
def var_train(image, class_label):
    # Step 1: 多尺度 VQVAE 编码
    f = encoder(image)                    # [h, w, C]
    R = multi_scale_quantize(f)           # K个token maps: r1(1×1), r2(2×2), ..., rK(16×16)
    
    # Step 2: 构建输入序列
    tokens = [class_token(class_label)]
    for k in range(K):
        tokens.append(flatten(R[k]))      # 展平每个尺度的token map
    
    # Step 3: GPT-2 Transformer 前向
    logits = transformer(concat(tokens))  # 因果注意力，每个尺度看到之前所有尺度
    
    # Step 4: 交叉熵损失（next-scale prediction）
    loss = cross_entropy(logits, target_tokens)
    return loss

# VAR 推理伪代码（仅需 K 步！）
def var_generate(class_label):
    tokens = [class_token(class_label)]
    for k in range(K):                    # K=10 步
        logits = transformer(tokens)      # 前向一次
        next_scale = sample(logits[-h_k*w_k:])  # 并行采样整个尺度
        tokens.append(next_scale)
    image = vqvae_decode(tokens)
    return image
```

> 💡 **效率优势**：传统 AR 需要 \(\mathcal{O}(n^2)\) 步解码（如 256 步），VAR 仅需 \(K=10\) 步，每步并行生成一个尺度的所有 token，推理速度提升约 **20 倍**。

##### 与传统方法的关键区别

| 特性 | 传统 AR (VQGAN+GPT) | VAR |
|------|---------------------|-----|
| 预测单元 | 单个 token | 整个尺度的 token map |
| 生成顺序 | 栅格扫描（左→右，上→下） | 粗到细（低分辨率→高分辨率） |
| 解码步数 | \(n^2\)（如 256） | \(K\)（如 10） |
| 总计算量 | \(\mathcal{O}(n^6)\) | \(\mathcal{O}(Kn^4)\) |
| 空间结构 | 破坏（1D 展平） | 保留（2D token map） |
| VQVAE | 标准单尺度 | 多尺度残差量化 |

##### Scaling Laws

VAR 模型在参数量从 0.3B 扩展到 2B 时，展现出与 LLM 类似的幂律缩放规律：

- **验证损失 vs 参数量**：\(L(N) \propto N^{-\alpha}\)，线性相关系数 \(R^2 \approx -0.998\)
- **验证损失 vs 计算量**：\(L(C) \propto C^{-\beta}\)，同样呈现清晰幂律关系
- **FID/IS 指标**：随模型规模增大持续改善，FID 从 ~4 降至 1.80，IS 从 ~270 升至 356.4

![Scaling Laws](https://ar5iv.labs.arxiv.org/html/2404.02905/assets/x3.png)
*图：VAR 模型的 Scaling Laws — 验证损失与模型参数/计算量呈清晰幂律关系。*

这是视觉自回归模型**首次**展现出如此清晰的 scaling 行为，表明 VAR 的 next-scale prediction 范式具有与 LLM 类似的可扩展性。

##### 主要实验结果

在 ImageNet 256×256 类条件生成基准上：

| 模型 | 类型 | FID↓ | IS↑ | 推理步数 |
|------|------|------|-----|---------|
| DiT-XL/2 | Diffusion | 2.27 | 278.2 | 250 |
| MaskGIT | Masked | 6.18 | 182.1 | ~8 |
| VQGAN (传统AR) | AR | 18.65 | 80.4 | 256 |
| **VAR-d30** | **VAR** | **1.92** | **323.1** | **10** |
| **VAR-d36** | **VAR** | **1.80** | **356.4** | **10** |

VAR 同时在 512×512 分辨率上取得 FID 2.63，并展示了零样本图像编辑能力。

#### 🧪 练习题

```yaml
question: "VAR 相比传统视觉自回归模型的核心改变是什么？"
options:
  - "使用更大的码本词汇量来提升重建质量"
  - "将逐 token 的栅格扫描生成改为逐尺度的由粗到细生成"
  - "引入双向注意力机制替代因果注意力"
  - "使用连续值回归替代离散 token 预测"
answer: 1
explain: "VAR 的核心创新是将自回归单元从单个 token 改为整个尺度的 token map，按从低分辨率到高分辨率的顺序生成，每个尺度内并行预测所有 token。"
```