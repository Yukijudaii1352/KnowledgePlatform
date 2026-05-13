### SpinQuant — 旋转量化 (SpinQuant)

```yaml
id: spinquant
name: SpinQuant
full_name: "旋转量化 (SpinQuant)"
year: 2025
org: Meta
paper_url: "https://arxiv.org/abs/2405.16406"
category: quantization
parent: gptq
motivation: "学习旋转矩阵减少量化误差"
```

#### 📝 一句话总结

SpinQuant 提出在 Transformer 的四个旋转不变位置插入可学习的正交旋转矩阵，通过 Cayley SGD 在 Stiefel 流形上优化旋转参数以消除激活/权重中的离群值，使 W4A4KV4 量化在 LLaMA-2 7B 上仅损失 2.9 个百分点精度，大幅超越 SmoothQuant、LLM-QAT 和 QuaRot 等方法。

#### 🎯 核心要点

- **旋转不变性**：识别 Transformer 中 4 个可插入正交旋转矩阵且不改变全精度输出的位置（残差流 \(R_1\)、注意力头 \(R_2\)、Query/Key \(R_3\)、FFN 下投影 \(R_4\)）
- **随机旋转方差大**：不同随机旋转矩阵导致量化后零样本推理精度差异高达 13 个百分点
- **Cayley SGD 优化**：在 Stiefel 流形上用 Cayley 变换优化 \(R_1, R_2\)，仅需 100 次迭代、800 个 WikiText2 样本、约 1.3 小时（7B 模型，单 A100）
- **极低额外参数**：优化的旋转矩阵仅占模型权重的 0.26%，且可吸收进相邻权重矩阵，无推理开销（\(R_3, R_4\) 使用在线 Hadamard 变换）
- **兼容 GPTQ**：可与 GPTQ 权重量化联合使用，进一步提升精度
- **SOTA 结果**：W4A4KV4 下 LLaMA-2 7B 仅 2.9pt gap（vs LLM-QAT 22pt, SmoothQuant 27pt）；LLaMA-3 70B 仅 4.4pt gap

#### 🔬 深入细节

##### 核心框架图

![SpinQuant 旋转位置示意图](https://ar5iv.labs.arxiv.org/html/2405.16406v3/assets/x1.png)
*图：SpinQuant 在 Transformer 块中的四个旋转插入位置。\(R_1\) 作用于残差流，\(R_2\) 作用于注意力输出，\(R_3\) 作用于 Q/K 向量，\(R_4\) 作用于 FFN 下投影层输入。其中 \(R_1, R_2\) 可吸收进权重矩阵（离线），\(R_3, R_4\) 需在线计算（使用高效 Hadamard 变换）。*

##### 算法伪代码

```python
# SpinQuant 旋转矩阵优化流程
# 输入: 预训练LLM权重 W, 校准集 D (800 samples from WikiText2)
# 输出: 优化后的旋转矩阵 R1, R2

# Step 1: 初始化旋转矩阵为随机 Hadamard 矩阵
R1 = random_hadamard(D_token, D_token)       # 残差流旋转
R2 = {l: random_hadamard(D_head, D_head)      # 每层每头的注意力旋转
       for l in range(num_layers)}
R3 = hadamard(D_head)                         # Q/K 旋转 (固定, 在线)
R4 = hadamard(D_intermediate)                 # FFN 旋转 (固定, 在线)

# Step 2: 将 R1, R2 吸收进权重 (不改变全精度输出)
W_rotated = absorb_rotations(W, R1, R2)

# Step 3: Cayley SGD 优化 (在 Stiefel 流形上)
for iteration in range(100):
    # 前向传播: 对旋转后的权重和激活进行量化
    loss = 0
    for batch in calibration_loader(D):
        # 量化权重和激活 (仅量化激活用于优化, 权重量化交给GPTQ)
        output = quantized_forward(W_rotated, batch, R3, R4)
        loss += cross_entropy(output, batch.labels)
    
    # 计算梯度并用 Cayley 变换更新
    grad = compute_gradient(loss, R1, R2)
    # Cayley 更新: R' = (I + η/2 · A)^{-1} (I - η/2 · A) R
    # 其中 A = grad @ R^T - R @ grad^T (反对称矩阵)
    R1 = cayley_update(R1, grad_R1, lr=1.5 * (1 - iteration/100))
    R2 = cayley_update(R2, grad_R2, lr=1.5 * (1 - iteration/100))
    
    # 重新吸收旋转进权重
    W_rotated = absorb_rotations(W, R1, R2)

# Step 4: 最终量化 (可选配合 GPTQ)
model_quantized = quantize(W_rotated, method="RTN_or_GPTQ", bits=4)
```

##### 动机与背景

**离群值问题**：LLM 的激活和权重中存在少量极端离群值（outliers），这些值拉伸了量化范围，导致大部分正常值只能使用很少的有效比特表示，造成严重的量化误差。例如，直接对 LLaMA-2 7B 进行 W4A4 RTN 量化，零样本精度从 66.9% 暴跌至 37.1%。

**随机旋转的局限**：QuIP 和 QuaRot 等工作发现，对权重/激活矩阵乘以随机正交矩阵可以统计性地"打散"离群值，使分布更均匀。然而 SpinQuant 的关键发现是：**不同的随机旋转矩阵之间存在巨大的性能差异**——在 LLaMA-2 7B W4A4KV4 设置下，100 个随机种子的零样本精度范围从约 53% 到 66%，差距高达 13 个百分点。这意味着随机选择旋转矩阵是一种"碰运气"的做法。

##### 核心机制：四个旋转位置

SpinQuant 系统性地识别了 Transformer 中四个满足**旋转不变性**的位置，即插入正交矩阵 \(R\)（满足 \(RR^T = I\)）后不改变全精度网络的输出：

**\(R_1\) — 残差流旋转（Residual Rotation）**

在每个 Transformer 块的残差连接处插入旋转。由于 RMSNorm 对旋转不变（\(\text{RMSNorm}(Rx) = R \cdot \text{RMSNorm}(x)\)），可以将 \(R_1\) 吸收进相邻的线性层权重中：

$$W'_{\text{proj}} = W_{\text{proj}} \cdot R_1^T, \quad W'_{\text{out}} = R_1 \cdot W_{\text{out}}$$

这样 \(R_1\) 不引入任何推理开销。\(R_1\) 的维度为 \(D_{\text{token}} \times D_{\text{token}}\)（如 LLaMA-2 7B 为 4096×4096）。

> 💡 **关键**：\(R_1\) 同时改变了输入到注意力层和 FFN 层的激活分布，以及所有投影矩阵的权重分布，是影响最大的旋转位置。

**\(R_2\) — 注意力头内旋转（MHSA Rotation）**

在每个注意力头的 Value 投影和 Output 投影之间插入逐头旋转矩阵。由于 \(V \cdot R_2^T\) 和 \(R_2 \cdot W_O\) 可以分别吸收进 \(W_V\) 和 \(W_O\)，同样无推理开销。维度为 \(D_{\text{head}} \times D_{\text{head}}\)（如 128×128），每层独立学习。

**\(R_3\) — Query/Key Hadamard 旋转**

对 Query 和 Key 向量在每个头内施加 Hadamard 变换。由于 RoPE 位置编码的存在，\(R_3\) 无法吸收进权重（RoPE 对非对角旋转不不变），必须在线计算。但 Hadamard 变换的计算复杂度仅为 \(O(d \log d)\)，开销极小。

**\(R_4\) — FFN 下投影 Hadamard 旋转**

在 FFN 的 Gate/Up 投影输出与 Down 投影输入之间插入 Hadamard 变换。由于 SiLU 激活函数的非线性，\(R_4\) 同样无法吸收进权重，需在线计算。

> ⚠️ **注意**：\(R_1, R_2\) 通过 Cayley SGD 优化学习；\(R_3, R_4\) 保持为固定的 Hadamard 矩阵（在线高效计算）。这种设计平衡了优化效果和推理效率。

##### Cayley SGD 优化

旋转矩阵必须保持正交性（\(RR^T = I\)），这意味着优化空间是 **Stiefel 流形**而非欧氏空间。SpinQuant 采用 Cayley SGD 方法：

1. 计算欧氏梯度 \(\nabla_R \mathcal{L}\)
2. 构造反对称矩阵 \(A = \nabla_R \mathcal{L} \cdot R^T - R \cdot (\nabla_R \mathcal{L})^T\)
3. 通过 Cayley 变换更新：

$$R' = \left(I + \frac{\eta}{2} A\right)^{-1} \left(I - \frac{\eta}{2} A\right) R$$

这保证了更新后的 \(R'\) 仍然是正交矩阵。整个优化过程：
- 学习率从 1.5 线性衰减到 0
- 仅 100 次迭代，800 个 WikiText2 校准样本
- LLaMA-2 7B 约 1.25 小时（8×A100），LLaMA-3 8B 约 1.39 小时
- 从不同随机种子初始化，优化后的结果方差极小

##### 与 GPTQ 的协同

SpinQuant 发现一个重要的实践技巧：当同时量化权重和激活时，应**仅针对激活量化误差优化旋转矩阵**（即在 W16A4 设置下优化），然后再用 GPTQ 处理权重量化误差。这种分工策略比同时优化两者效果更好，因为 GPTQ 已经能很好地处理权重量化误差，而旋转矩阵更擅长处理激活分布的不均匀性。

##### 实验结果亮点

| 设置 | 模型 | SpinQuant | QuaRot | LLM-QAT | FP |
|------|------|-----------|--------|---------|-----|
| W4A4KV4 | LLaMA-2 7B | 64.0 | 62.5 | 44.9 | 66.9 |
| W4A4KV4 | LLaMA-2 13B | 66.9 | 66.2 | — | 68.3 |
| W4A4KV4 | LLaMA-2 70B | 71.2 | 70.3 | — | 72.9 |
| W4A4KV4 | LLaMA-3 8B | 65.2 | 63.3 | 43.2 | 69.6 |
| W4A4KV4 | LLaMA-3 70B | 69.3 | 65.1 | — | 74.5 |

> 💡 **关键**：SpinQuant 在最具挑战性的 W4A4KV4 设置下，将 LLaMA-2 7B 与全精度的差距缩小到仅 2.9 个百分点，而 LLM-QAT 差距为 22 个百分点，SmoothQuant 差距为 27 个百分点。在 LLaMA-3 70B 上，SpinQuant 将差距从 QuaRot 的 9.4pt 缩小到 5.2pt。

##### 各旋转位置的贡献（消融实验）

- **无旋转**：W4A4KV4 精度仅约 38%（几乎不可用）
- **仅 \(R_1\)**：精度大幅提升，是最重要的单一旋转位置
- **\(R_1 + R_2\)**：进一步改善注意力层的量化质量
- **\(R_1 + R_2 + R_3 + R_4\)**（全部）：达到最佳效果
- **Cayley 优化 vs 随机**：优化后的旋转比最佳随机旋转（100 种子中最好的）还要好，且方差极小

#### 🧪 练习题

```yaml
question: "SpinQuant 中为什么 R3（Query/Key 旋转）不能像 R1 那样吸收进权重矩阵？"
options:
  - "因为 R3 的维度太大，无法存储"
  - "因为 RoPE 位置编码的存在使得旋转无法与权重合并"
  - "因为 Query 和 Key 需要不同的旋转矩阵"
  - "因为注意力分数的 softmax 操作对旋转不不变"
answer: 1
explain: "RoPE 对每个位置施加不同的旋转，与 R3 不可交换，因此 R3 无法被吸收进 W_Q/W_K 权重中，必须在推理时在线计算。"
```