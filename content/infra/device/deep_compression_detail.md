### 深度压缩 (Deep Compression)

```yaml
id: deep_compression
name: Deep Compression
full_name: 深度压缩 (Deep Compression)
year: '2015'
org: Stanford
paper_url: https://arxiv.org/abs/1510.00149
category: efficiency
parent: —
motivation: 剪枝量化Huffman编码实现模型50倍压缩
```

#### 📝 一句话总结

Deep Compression 提出了一个三阶段压缩流水线——**剪枝、训练式量化与 Huffman 编码**——将深度神经网络存储需求压缩 35×–49×（如 AlexNet 从 240 MB 压至 6.9 MB），且不损失精度，使模型可完全放入片上 SRAM 而无需访问高能耗的 DRAM。

#### 🎯 核心要点

- **三阶段压缩流水线**：Pruning → Trained Quantization → Huffman Coding，三者正交互不干扰，可叠加获得极高压缩率
- **网络剪枝**：移除权重绝对值低于阈值的连接，AlexNet 参数量减少 9×，VGG-16 减少 13×；使用 CSR/CSC 稀疏格式存储，索引差分编码（conv 层 8 bit，fc 层 5 bit）
- **训练式量化与权重共享**：对每层权重做 k-means 聚类，同簇连接共享一个质心权重；CONV 层 256 簇（8 bit 索引），FC 层 32 簇（5 bit 索引）；训练时按簇聚合梯度更新质心
- **质心初始化策略**：比较了 Forgy（随机）、密度优先、线性三种初始化，线性初始化效果最优，因其对大权重覆盖更均匀
- **Huffman 编码**：利用量化权重和稀疏索引的非均匀分布，进一步节省 20%–30% 存储
- **压缩效果**：AlexNet 35×（240 MB → 6.9 MB），VGG-16 49×（552 MB → 11.3 MB），均无精度损失
- **硬件友好**：压缩后模型可放入片上 SRAM，避免 DRAM 访问；在 CPU/GPU/移动 GPU 上获得 3×–4× 加速和 3×–7× 能效提升

#### 🔬 深入细节

##### 核心框架图

![Deep Compression 三阶段压缩流水线](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x1.png)
*图 1：Deep Compression 的三阶段压缩流水线：剪枝将连接数减少 10×，量化进一步压缩至 27×–31×，Huffman 编码最终达到 35×–49×。压缩率已包含稀疏表示的元数据开销。*

![权重共享与质心微调示意](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x3.png)
*图 3：权重共享示意（上）与质心微调过程（下）。同色权重共享同一质心值，反向传播时按簇聚合梯度更新质心。*

##### 算法伪代码

```python
# Deep Compression 三阶段压缩流水线伪代码

# ========== 阶段 1：剪枝 ==========
model = train_network(data)                    # 正常训练至收敛
for layer in model.layers:
    threshold = compute_threshold(layer.weights)  # 基于权重分布确定阈值
    mask = abs(layer.weights) > threshold          # 保留大权重
    layer.weights *= mask                          # 置零小权重
model = retrain_network(model, data, masks)    # 仅更新保留的连接
# 用 CSR/CSC 格式存储稀疏权重，索引用差分编码

# ========== 阶段 2：训练式量化 ==========
for layer in model.layers:
    k = 256 if layer.is_conv else 32           # CONV 8-bit, FC 5-bit
    centroids, indices = kmeans(layer.weights[mask], k)  # k-means 聚类
    layer.codebook = centroids                 # 存储码本
    layer.indices = indices                    # 存储索引
# 微调：按簇聚合梯度更新质心
for epoch in range(finetune_epochs):
    for batch in data:
        grads = compute_gradients(model, batch)
        for layer in model.layers:
            for c_k in range(len(layer.codebook)):
                # 聚合属于第 k 簇的所有梯度
                grad_sum = sum(grads[i,j] for i,j if indices[i,j] == c_k)
                layer.codebook[c_k] -= lr * grad_sum

# ========== 阶段 3：Huffman 编码（离线，无需训练） ==========
for layer in model.layers:
    layer.encoded_weights = huffman_encode(layer.codebook)
    layer.encoded_indices = huffman_encode(layer.indices)
```

##### 动机与背景

深度神经网络虽然在计算机视觉等任务上取得了最先进的性能，但其巨大的参数量（AlexNet 约 240 MB，VGG-16 约 552 MB）严重阻碍了在移动端和嵌入式设备上的部署。核心瓶颈有两个：

1. **存储限制**：移动应用商店对包体大小敏感（如 iOS App Store 限制 100 MB 以上需 Wi-Fi 下载），数百 MB 的模型无法直接嵌入 App。
2. **能耗瓶颈**：在 45nm CMOS 工艺下，一次 32-bit DRAM 访问消耗 640 pJ，是 32-bit SRAM 访问（5 pJ）的 128 倍，是一次浮点加法（0.9 pJ）的 700 倍。大模型无法放入片上 SRAM，必须频繁访问 DRAM，导致能耗远超移动设备的功率预算。

> 💡 **关键洞察**：如果能将模型压缩到足够小（几 MB），就可以完全放入片上 SRAM 缓存，从根本上消除 DRAM 访问的能耗瓶颈。

##### 阶段 1：网络剪枝

剪枝的核心思想是**移除冗余连接**，只保留对网络输出贡献最大的权重。具体流程：

1. 正常训练网络至收敛
2. 将权重绝对值低于阈值的连接移除（置零）
3. 对剩余稀疏网络重新训练（retrain），微调保留连接的权重

剪枝后，AlexNet 的连接数减少 9×，VGG-16 减少 13×。

**稀疏存储格式**：剪枝后的稀疏权重矩阵使用 CSR（Compressed Sparse Row）或 CSC（Compressed Sparse Column）格式存储，需要 \(2a + n + 1\) 个数（\(a\) 为非零元素数，\(n\) 为行/列数）。为进一步压缩索引，采用**相对索引**（存储索引差值而非绝对位置），conv 层用 8 bit、fc 层用 5 bit 编码。当差值超出编码范围时，插入填充零（filler zero）来处理溢出。

![稀疏索引的相对编码与填充零](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x2.png)
*图 2：用相对索引表示矩阵稀疏性，当索引差超出范围时填充零防止溢出。*

##### 阶段 2：训练式量化与权重共享

量化阶段的目标是**减少表示每个权重所需的比特数**。核心方法是让多个连接共享同一权重值：

1. **k-means 聚类**：对每层已剪枝的权重做一维 k-means 聚类，将 \(n\) 个原始权重 \(W = \{w_1, w_2, \ldots, w_n\}\) 划分为 \(k\) 个簇 \(C = \{c_1, c_2, \ldots, c_k\}\)，最小化簇内平方和：

$$\underset{C}{\arg\min} \sum_{i=1}^{k} \sum_{w \in c_i} |w - c_i|^2$$

2. **存储方式**：每个连接只需存储一个 \(\log_2(k)\) bit 的索引指向码本中的共享权重。压缩率公式为：

$$r = \frac{n \cdot b}{n \cdot \log_2(k) + k \cdot b}$$

其中 \(n\) 为连接数，\(b\) 为原始比特数（32），\(k\) 为簇数。

3. **质心微调**：聚类后，通过反向传播微调质心。每个质心的梯度是所有属于该簇的权重梯度之和：

$$\frac{\partial \mathcal{L}}{\partial C_k} = \sum_{i,j} \frac{\partial \mathcal{L}}{\partial W_{ij}} \cdot \mathbb{1}(I_{ij} = k)$$

> ⚠️ **注意**：权重共享不跨层进行——每层独立聚类，拥有自己的码本。

**质心初始化的影响**：

![质心初始化方法对比](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x4.png)
*图 4：三种质心初始化方法对比（左）及权重分布与码本微调前后的变化（右）。*

- **Forgy（随机）初始化**：从数据中随机选取 k 个观测值作为初始质心，倾向于集中在双峰分布的峰值附近
- **密度优先初始化**：在权重 CDF 的 y 轴上等距采样，质心在峰值处更密集
- **线性初始化**：在权重的 \([\min, \max]\) 之间等距分布质心，对分布不敏感

> 💡 **关键发现**：线性初始化效果最优。原因是大权重虽然数量少但对网络输出影响大，Forgy 和密度优先方法在大权重区域分配的质心过少，导致表示精度不足。

实验中，CONV 层使用 8 bit（256 个共享权重），FC 层使用 5 bit（32 个共享权重），在不损失精度的前提下实现了高效量化。

##### 阶段 3：Huffman 编码

![量化权重和稀疏索引的分布](https://ar5iv.labs.arxiv.org/html/1510.00149/assets/x6.png)
*图 5：量化权重（左）和稀疏索引（右）的分布均呈现明显偏斜，适合 Huffman 编码。*

Huffman 编码是一种最优前缀码，用变长编码表示源符号——出现频率越高的符号用越短的编码。由于量化后的权重集中在双峰附近、稀疏索引差值集中在小值区域，分布高度非均匀，Huffman 编码可在量化基础上进一步节省 **20%–30%** 的存储。

Huffman 编码是纯离线操作，不需要额外训练，在剪枝和量化微调全部完成后执行。

##### 与传统方法的对比

| 方法 | 核心思路 | AlexNet 压缩率 |
|------|---------|----------------|
| 原始网络 | — | 1× |
| HashedNets (Chen et al., 2015) | 哈希函数预定义权重共享 | — |
| 仅剪枝 (Han et al., 2015) | 移除小权重连接 | 9× |
| 仅量化 | k-means 权重共享 | ~8× |
| **Deep Compression** | **剪枝 + 量化 + Huffman** | **35×** |

Deep Compression 的核心优势在于三种技术**正交互补**：剪枝减少连接数量，量化减少每个连接的比特数，Huffman 编码利用统计冗余进一步压缩。论文实验证明，剪枝不仅不会损害量化效果，反而因为去除了接近零的权重，使得剩余权重的分布更有利于聚类。

##### 压缩效果总结

| 网络 | 原始大小 | 压缩后大小 | 压缩率 | 精度变化 |
|------|---------|-----------|--------|---------|
| LeNet-300-100 | 1070 KB | 27 KB | **40×** | Top-1: 1.64% → 1.58%（提升） |
| LeNet-5 | 1720 KB | 44 KB | **39×** | Top-1: 0.80% → 0.74%（提升） |
| AlexNet | 240 MB | 6.9 MB | **35×** | Top-1/5: 42.78%/19.73% → 42.78%/19.70% |
| VGG-16 | 552 MB | 11.3 MB | **49×** | Top-1/5: 31.50%/11.32% → 31.17%/10.91%（提升） |

在硬件层面，压缩后的网络在 CPU 上获得 3× 加速，在 GPU 上获得 3.5× 加速，在移动 GPU 上获得 4× 加速；能效方面，CPU 上提升 7×，GPU 上提升 3.3×。

#### 🧪 练习题

```yaml
question: "Deep Compression 中，训练式量化阶段使用什么方法实现权重共享？"
options:
  - "对权重矩阵做 SVD 低秩分解"
  - "使用哈希函数将权重映射到固定桶"
  - "对每层权重做 k-means 聚类，同簇连接共享质心值"
  - "将所有权重统一截断到最近的 2 的幂次"
answer: 2
explain: "Deep Compression 对每层已剪枝的权重进行 k-means 聚类，同一簇内的所有连接共享该簇的质心作为权重值，存储时只需保存索引和码本，从而大幅减少比特数。"
```