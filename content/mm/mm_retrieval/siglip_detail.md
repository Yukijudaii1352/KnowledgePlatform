### SigLIP — Sigmoid损失语言图像预训练

```yaml
id: siglip
name: SigLIP
full_name: "Sigmoid损失语言图像预训练 (Sigmoid Loss for Language Image Pre-Training)"
year: 2023
org: Google
paper_url: "https://arxiv.org/abs/2303.15343"
category: dual_encoder
parent: clip
motivation: "用Sigmoid损失替代Softmax对比损失，消除全局归一化依赖，提升内存效率并简化分布式训练"
```

#### 📝 一句话总结

SigLIP 提出用 **sigmoid 损失**替代 CLIP 中的 softmax 对比损失进行语言-图像预训练，将图文匹配从多类分类问题转化为逐对二分类问题，消除了对全局归一化的依赖，从而实现更高的内存效率和更简单的分布式实现，在小批量场景下显著优于 softmax 基线。

#### 🎯 核心要点

- **Sigmoid 对比损失**：将图文对匹配建模为独立的二分类问题，对 batch 内所有 \(n^2\) 个图文对分别计算 sigmoid 损失，无需 softmax 的全局归一化
- **可学习偏置项 \(b\)**：在相似度计算中引入 learnable bias（初始化为 \(-\log(n)\) 量级），自动平衡正负样本比例（1 正 vs \(n-1\) 负）
- **两种实验设置**：SigLiT（锁定预训练 ViT 图像塔，仅训练文本塔）和 SigLIP（从头训练双塔）
- **Chunked Sigmoid Loss**：分块计算损失，无需在单设备上聚合全局 batch，内存复杂度从 \(O(B^2)\) 降至 \(O(B^2/K)\)（\(K\) 为设备数）
- **批量大小研究**：系统实验表明 32k batch size 即可达到接近最优性能，远小于此前认为需要的超大 batch
- **超参数鲁棒性**：sigmoid 损失在不同 batch size 下无需调整学习率和权重衰减，默认超参即为最优或接近最优
- **多语言扩展 mSigLIP**：在 WebLI 数据集上训练多语言版本，覆盖 36 种语言的跨模态检索

#### 🔬 深入细节

##### 方法总览

![SigLIP 框架对比图](https://ar5iv.labs.arxiv.org/html/2303.15343v2/assets/x1.png)
*图：Softmax 对比损失（左）vs Sigmoid 对比损失（右）。Softmax 需要在整行/列上做归一化（需要全局通信），而 Sigmoid 对每个 cell 独立计算损失。*

SigLIP 的核心思想非常直观：传统 CLIP 使用 softmax 对比损失（InfoNCE），需要对 batch 内所有样本做全局归一化。这意味着在多设备分布式训练时，必须在所有设备间同步完整的相似度矩阵。SigLIP 将其替换为 sigmoid 损失，每个图文对独立判断"是否匹配"，彻底消除了全局依赖。

##### 损失函数设计

**Softmax 对比损失（CLIP 基线）：**

传统的图文对比学习使用 InfoNCE 损失，对 batch 内 \(n\) 个图文对：

$$\mathcal{L}_{\text{softmax}} = -\frac{1}{n}\sum_{i=1}^{n}\left[\log\frac{e^{x_i \cdot y_i / \tau}}{\sum_{j=1}^{n} e^{x_i \cdot y_j / \tau}} + \log\frac{e^{x_i \cdot y_i / \tau}}{\sum_{j=1}^{n} e^{x_j \cdot y_i / \tau}}\right]
$$

其中 \(x_i, y_i\) 分别是图像和文本的归一化嵌入，\(\tau\) 是温度参数。关键问题在于分母中的求和 **必须遍历 batch 内所有样本**，在分布式训练中需要跨设备聚合。

**Sigmoid 对比损失（SigLIP 提出）：**

$$\mathcal{L}_{\text{sigmoid}} = -\frac{1}{n}\sum_{i=1}^{n}\sum_{j=1}^{n}\log\frac{1}{1 + e^{z_{ij}(-x_i \cdot y_j \cdot t + b)}}
$$

其中：
- \(z_{ij} = \begin{cases} 1 & \text{if } i = j \text{（正样本对）} \\ -1 & \text{if } i \neq j \text{（负样本对）} \end{cases}\)
- \(t\) 是可学习的温度参数（对应 \(1/\tau\)）
- \(b\) 是可学习的偏置项

> 💡 **关键直觉**：Sigmoid 损失将每个图文对视为一个独立的二分类问题——"这张图和这段文字是否匹配？"。正样本对（对角线）标签为 1，负样本对（非对角线）标签为 -1。每个 cell 的损失计算完全独立，不依赖同行/同列的其他值。

##### 偏置项 \(b\) 的作用

偏置项 \(b\) 是 SigLIP 的一个精妙设计。在一个 batch 中，正样本对有 \(n\) 个，而负样本对有 \(n^2 - n\) 个，正负比例约为 \(1 : (n-1)\)。如果没有偏置项，sigmoid 函数在零点处输出 0.5，这意味着模型初始化时会将所有对都预测为"匹配"，导致训练不稳定。

偏置项 \(b\) 初始化为 \(-\log(n) \approx -10\)（当 \(n = 32768\) 时），使得初始时 sigmoid 输出接近 0（即"不匹配"），与负样本占绝大多数的先验一致。论文实验表明，\(b\) 的初始化值对最终性能影响不大（在 \(-10\) 到 \(-15\) 范围内结果稳定），但训练过程中 \(b\) 会收敛到约 \(-10\) 附近。

> ⚠️ **注意**：偏置项 \(b\) 的角色类似于逻辑回归中的截距项，它补偿了正负样本的类别不平衡。这与 Focal Loss 中处理类别不平衡的思路异曲同工。

##### Chunked Sigmoid Loss 分布式实现

```python
# Chunked Sigmoid Loss 伪代码
# 假设 K 个设备，每个设备持有 n/K 个样本
# 设备 k 上的图像嵌入: img_emb[k], 文本嵌入: txt_emb[k]

def chunked_sigmoid_loss(img_emb, txt_emb, t, b):
    """每个设备独立计算局部损失，无需聚合全局相似度矩阵"""
    local_loss = 0
    # 本地图像 vs 所有文本（通过 all-gather 获取文本嵌入）
    for k in range(K):
        txt_chunk = all_gather(txt_emb)[k]  # 获取第k个设备的文本
        # 计算局部相似度矩阵 (n/K × n/K)
        logits = img_emb @ txt_chunk.T * t + b
        # 构造标签：只有当 chunk_k 是本设备时对角线为正
        labels = get_labels(k, device_id)  # 1 for pos, -1 for neg
        # Sigmoid 损失：每个元素独立计算
        local_loss += -log_sigmoid(labels * logits).sum()
    return local_loss / (n * n)
```

> 💡 **关键优势**：Softmax 损失需要在单个设备上构建完整的 \(n \times n\) 相似度矩阵来计算归一化分母，内存为 \(O(n^2)\)。Chunked sigmoid 损失将矩阵分成 \(K \times K\) 个块，每个设备只需处理 \(K\) 个大小为 \((n/K) \times (n/K)\) 的块，内存降至 \(O(n^2/K)\)。

##### 与 Softmax 对比损失的关键区别

| 特性 | Softmax (CLIP) | Sigmoid (SigLIP) |
|------|----------------|-------------------|
| 损失类型 | 多类交叉熵 | 逐对二分类 |
| 归一化 | 全局（跨 batch） | 无（每对独立） |
| 分布式通信 | 需要聚合全局矩阵 | 仅需 all-gather 嵌入 |
| 内存复杂度 | \(O(B^2)\) | \(O(B^2/K)\) |
| 小 batch 性能 | 较差 | 显著更优 |
| 超参数敏感性 | 需按 batch 调参 | 默认超参即可 |
| 偏置项 | 无 | 可学习偏置 \(b\) |

##### 实验关键发现

**1. Sigmoid 在小 batch 下优势显著：** 在 SigLiT 设置（锁定预训练 ViT-L/16 图像塔）下，batch size 为 512 时 sigmoid 比 softmax 高 3.0%（72.5% vs 69.5%），随着 batch 增大差距缩小，在 128k 时两者基本持平。

**2. 32k 是性价比最优 batch size：** 论文系统实验了从 512 到 1M 的 batch size，发现 32k 即可达到接近最优性能（84.2% vs 84.7%@1M），而所需计算资源远小于超大 batch。

**3. 从头训练（SigLIP）同样有效：** 在 WebLI 数据集上从头训练 ViT-B/16，SigLIP 在 ImageNet zero-shot 上达到 73.4%（batch=32k, 36B examples），优于同等设置的 softmax 基线。

**4. 噪声鲁棒性：** 在人工注入标签噪声的实验中，sigmoid 损失比 softmax 更鲁棒，在 40% 噪声率下仍保持合理性能。

#### 🧪 练习题

```yaml
question: "SigLIP 中引入可学习偏置项 b 的主要目的是什么？"
options:
  - "加速模型收敛"
  - "补偿正负样本的严重不平衡（1个正样本 vs n-1个负样本）"
  - "替代温度参数 τ 的作用"
  - "防止梯度消失问题"
answer: 1
explain: "在 batch size 为 n 的对比学习中，每个 anchor 有 1 个正样本和 n-1 个负样本。偏置项 b 初始化为约 -log(n)，使 sigmoid 初始输出偏向'不匹配'，与负样本占多数的先验一致，从而稳定训练。"
```