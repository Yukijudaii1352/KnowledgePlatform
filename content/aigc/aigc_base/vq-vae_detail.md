### VQ-VAE

```yaml
id: vq-vae
name: VQ-VAE
full_name: 向量量化变分自编码器 (Vector Quantized VAE)
year: "2017"
org: DeepMind
paper_url: https://arxiv.org/abs/1711.00937
category: gan_vae
parent: —
motivation: 引入离散向量量化表征学习
```

#### 📝 一句话总结

VQ-VAE 通过在 VAE 的潜空间中引入**离散向量量化（Vector Quantization）**，将编码器输出映射到有限大小的码本（codebook）中最近的嵌入向量，从而学习到紧凑的离散表征；结合 straight-through 梯度估计器解决离散操作不可微的问题，并利用自回归先验（PixelCNN / WaveNet）在离散潜空间上建模，实现了高质量的图像、音频和视频生成。

#### 🎯 核心要点

- **离散潜变量**：不同于传统 VAE 使用连续高斯潜变量，VQ-VAE 维护一个包含 \(K\) 个嵌入向量的码本 \(e \in \mathbb{R}^{K \times D}\)，编码器输出通过最近邻查找映射为离散码字索引。
- **向量量化（VQ）**：编码器输出 \(z_e(x)\) 通过 \(z_q(x) = e_k, \; k = \arg\min_j \|z_e(x) - e_j\|_2\) 量化为码本中最近的向量，实现信息瓶颈。
- **Straight-Through 梯度估计**：前向传播使用量化后的 \(z_q\)，反向传播时将解码器对 \(z_q\) 的梯度直接复制给编码器输出 \(z_e\)，绕过不可微的 argmin 操作。
- **三项损失函数**：重建损失 + VQ 损失（码本向编码器输出靠拢）+ Commitment 损失（编码器输出向码本靠拢），其中 commitment 系数 \(\beta = 0.25\)。
- **自回归先验**：训练后在离散潜空间上拟合 PixelCNN（图像）或 WaveNet（音频）作为先验分布，用于无条件采样生成。
- **多模态验证**：在图像（CIFAR-10、ImageNet）、音频（VCTK 语音）和视频（DeepMind Lab）上均取得与连续 VAE 可比甚至更优的性能。

#### 🔬 深入细节

##### 核心架构示意图

![VQ-VAE Architecture](https://ar5iv.labs.arxiv.org/html/1711.00937/assets/figures/Figure1_9.png)

**图说明**：左图展示 VQ-VAE 的整体架构。编码器将输入 \(x\) 编码为连续向量 \(z_e(x)\)，通过最近邻查找在离散码本（Embedding space）中选取最接近的嵌入向量 \(z_q(x)\)，传递给解码器重建输入。右图展示了嵌入空间的可视化：灰色点为码本向量，蓝色箭头表示 VQ 损失将码本向编码器输出拉近，红色箭头表示 commitment 损失将编码器输出向码本拉近。

##### 算法伪代码

```
Algorithm: VQ-VAE Training
─────────────────────────────────────────────
Input: 训练数据 x, 码本大小 K, 嵌入维度 D, commitment 系数 β
Output: 训练好的编码器 E, 解码器 G, 码本 e

1. 初始化码本 e = {e_1, e_2, ..., e_K}, e_i ∈ ℝ^D
2. 初始化编码器 E 和解码器 G 的参数

3. for each mini-batch x do:
4.   ── 编码 ──
5.   z_e(x) = E(x)                          // 编码器输出连续向量
6.
7.   ── 向量量化 ──
8.   for each spatial position i do:
9.     k_i = argmin_j ‖z_e^(i)(x) − e_j‖₂  // 最近邻查找
10.    z_q^(i)(x) = e_{k_i}                  // 用码本向量替换
11.  end for
12.
13.  ── Straight-Through 梯度传递 ──
14.  z_q(x) = z_e(x) + sg[z_q(x) − z_e(x)] // sg = stop-gradient
15.  // 前向: z_q(x) = 量化值; 反向: 梯度直通到 z_e(x)
16.
17.  ── 解码与损失计算 ──
18.  x̂ = G(z_q(x))                           // 解码器重建
19.  L_recon = ‖x − x̂‖²₂                     // 重建损失
20.  L_vq    = ‖sg[z_e(x)] − e‖²₂            // VQ 损失 (更新码本)
21.  L_commit = ‖z_e(x) − sg[e]‖²₂           // Commitment 损失 (更新编码器)
22.  L = L_recon + L_vq + β · L_commit
23.
24.  ── 参数更新 ──
25.  更新 E, G 参数 (通过 L_recon + β·L_commit 的梯度)
26.  更新码本 e (通过 L_vq 的梯度, 或使用 EMA 更新)
27. end for
```

##### 方法细节

**1. 离散潜变量与向量量化**

VQ-VAE 的核心创新在于将 VAE 的连续潜空间替换为离散潜空间。传统 VAE 通过重参数化技巧（reparameterization trick）从连续高斯分布中采样潜变量，而 VQ-VAE 则维护一个**离散码本**（codebook / embedding table） \(e \in \mathbb{R}^{K \times D}\)，其中 \(K\) 是码本大小（通常为 512），\(D\) 是每个嵌入向量的维度。

编码器将输入 \(x\) 映射为连续表征 \(z_e(x) \in \mathbb{R}^{H' \times W' \times D}\)（对于图像，\(H', W'\) 为空间分辨率下采样后的尺寸）。对于每个空间位置的 \(D\) 维向量，通过最近邻查找确定其对应的码字索引：

$$k = \arg\min_j \|z_e(x) - e_j\|_2$$

然后用对应的码本向量 \(e_k\) 替换编码器输出，得到量化后的表征 \(z_q(x) = e_k\)。这一操作将连续空间压缩为 \(K\) 个离散状态，形成了强有力的信息瓶颈。

> 💡 **关键直觉**：离散表征天然避免了传统 VAE 中常见的"后验坍缩"（posterior collapse）问题——因为潜变量只能取有限个离散值，解码器无法忽略潜变量而仅依赖自身的自回归能力。

**2. Straight-Through 梯度估计**

向量量化中的 \(\arg\min\) 操作是不可微的，无法直接反向传播。VQ-VAE 采用 **straight-through estimator** 解决这一问题：在前向传播中使用量化后的 \(z_q(x)\)，但在反向传播时将解码器输入端的梯度 \(\nabla_{z_q} L\) 直接复制到编码器输出 \(z_e(x)\)。

实现上，这等价于：

$$z_q(x) = z_e(x) + \text{sg}[z_q(x) - z_e(x)]$$

其中 \(\text{sg}[\cdot]\) 表示 stop-gradient 操作。前向计算时 \(z_q(x)\) 等于量化值，反向传播时梯度直接流向 \(z_e(x)\)。

这一近似的合理性在于：编码器和解码器共享相同的 \(D\) 维空间，当码本足够密集时，\(z_q(x)\) 与 \(z_e(x)\) 之间的差异较小，梯度方向近似一致。

**3. 损失函数设计**

VQ-VAE 的总损失由三项组成：

$$L = \underbrace{\|x - D(z_q(x))\|_2^2}_{\text{重建损失}} + \underbrace{\|\text{sg}[z_e(x)] - e\|_2^2}_{\text{VQ 损失}} + \underbrace{\beta \|z_e(x) - \text{sg}[e]\|_2^2}_{\text{Commitment 损失}}$$

- **重建损失**：衡量解码器输出与原始输入的差异，梯度通过 straight-through 传递给编码器和解码器。
- **VQ 损失**（也称 codebook loss）：仅更新码本嵌入向量，使其向编码器输出靠拢。这本质上是字典学习中的 VQ 目标，等价于对码本做在线 k-means 更新。
- **Commitment 损失**：仅更新编码器参数，防止编码器输出在嵌入空间中剧烈波动。系数 \(\beta\) 控制编码器对当前码字的"承诺"程度，论文中发现 \(\beta \in [0.1, 2.0]\) 范围内结果稳健，默认取 \(\beta = 0.25\)。

> ⚠️ **注意**：作者还提出了一种替代方案——使用**指数移动平均（EMA）**更新码本，此时无需 VQ 损失项，训练更稳定。EMA 更新规则为：\(e_i \leftarrow \gamma e_i + (1-\gamma) \bar{z}_{e,i}\)，其中 \(\bar{z}_{e,i}\) 是被分配到第 \(i\) 个码字的所有编码器输出的均值。

**4. 先验分布与生成采样**

与传统 VAE 使用固定的标准正态先验不同，VQ-VAE 的先验分布 \(p(z)\) 是在训练完成后单独拟合的。由于潜变量是离散的（每个空间位置取 \(K\) 个值之一），可以用强大的自回归模型来建模这个离散分布：

- **图像**：使用 **PixelCNN** 在 \(H' \times W'\) 的离散潜码图上建模，捕获码字之间的空间依赖关系。
- **音频**：使用 **WaveNet** 在一维离散潜码序列上建模。

生成时，先从自回归先验中采样离散码字序列，再通过码本查找和解码器生成最终输出。这种两阶段方案使得 VQ-VAE 的潜空间利用率远高于传统 VAE。

**5. 与传统方法的区别**

与连续 VAE 相比，VQ-VAE 有三个关键优势：（1）离散表征更适合语言、推理等天然离散的任务；（2）避免了后验坍缩，因为解码器必须依赖离散码字才能重建输入；（3）可以利用强大的自回归先验在离散空间上建模，而非受限于简单的高斯先验。实验表明，VQ-VAE 在 CIFAR-10 上达到 4.67 bits/dim 的负对数似然（使用 PixelCNN 先验），与当时最优的连续 VAE 相当。在 ImageNet 128×128 上，VQ-VAE 的重建质量优于连续 VAE，且码本利用率接近 100%。在音频领域，VQ-VAE 能够将语音内容与说话人身份解耦到不同层级的潜变量中，实现语音风格迁移。

#### 🧪 练习题

```yaml
question: "VQ-VAE 中 straight-through estimator 的作用是什么？"
options:
  - "将连续潜变量离散化为码本索引"
  - "在反向传播时将解码器对量化向量的梯度直接传递给编码器输出，绕过不可微的 argmin 操作"
  - "用指数移动平均更新码本嵌入向量"
  - "在训练时用 PixelCNN 先验替代均匀先验"
answer: 1
explain: "argmin 量化操作不可微，straight-through estimator 在反向传播时将梯度从 z_q 直接复制到 z_e，使编码器可以接收来自重建损失的梯度信号进行更新。"
```