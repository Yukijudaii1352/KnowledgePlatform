### DeepSDF

```yaml
id: deepsdf
name: DeepSDF
full_name: "DeepSDF: Learning Continuous Signed Distance Functions for Shape Representation"
year: "2019"
org: "University of Washington & Facebook Reality Labs"
paper_url: "https://arxiv.org/abs/1901.05103"
category: foundation
parent: "—"
motivation: "提出用神经网络学习连续签名距离函数（SDF）来表示三维形状，开创了神经隐式表示范式"
```

#### 📝 一句话总结

DeepSDF 提出用深度神经网络直接回归连续的签名距离函数（Signed Distance Function），并设计了 auto-decoder 架构联合优化形状潜码与网络参数，实现了高质量的三维形状表示、重建与生成，开创了神经隐式三维表示这一研究方向。

#### 🎯 核心要点

- **连续隐式表示**：用神经网络 \(f_\theta(\mathbf{z}, \mathbf{x}) \to s\) 将三维点映射为签名距离值，取代离散体素/点云/网格表示
- **Clamped L1 损失**：对 SDF 值进行截断（\(\delta = 0.1\)），聚焦表面附近区域的精确重建
- **Auto-Decoder 架构**：摒弃编码器，直接将潜码 \(\mathbf{z}_i\) 作为可优化参数，与网络权重 \(\theta\) 联合训练
- **MAP 推理**：固定训练好的 \(\theta\) 后，通过梯度下降优化潜码 \(\hat{\mathbf{z}}\) 来表示新形状
- **高斯先验正则**：对潜码施加零均值球形高斯先验 \(\frac{1}{\sigma^2}\|\mathbf{z}\|_2^2\)，约束潜空间紧凑性
- **网络结构**：8 层全连接网络（512 维），第 4 层 skip connection，weight normalization，tanh 输出
- **数据集与评估**：在 ShapeNet 上进行已知形状表示、未知形状重建、部分形状补全、形状采样四项实验，对比 OGN、AtlasNet、3D-EPN

#### 🔬 深入细节

##### 核心框架图

![DeepSDF 框架概览](https://ar5iv.labs.arxiv.org/html/1901.05103/assets/x1.png)
*图：DeepSDF 将三维形状表示为连续的签名距离函数。左侧展示 SDF 的连续场表示，右侧展示从潜空间中不同潜码解码出的形状。*

![DeepSDF 网络架构与 Auto-Decoder 训练流程](https://ar5iv.labs.arxiv.org/html/1901.05103/assets/x2.png)
*图：DeepSDF 的三种使用模式——单形状推理、auto-decoder 训练、auto-decoder 推理（MAP 估计）。*

##### 算法伪代码

```python
# ===== 训练阶段 (Auto-Decoder) =====
# 初始化
theta = init_network_params()          # 8层FC网络参数
Z = {z_i ~ N(0, 0.01²I) for i in 1..N}  # N个形状的潜码

for epoch in range(num_epochs):
    for shape_i, samples_Xi in dataloader:
        z_i = Z[shape_i]                # 取出该形状的潜码
        for (x_j, s_j) in samples_Xi:   # 采样的(点, SDF值)对
            s_pred = f_theta(z_i, x_j)  # 网络前向
            loss_j = |clamp(s_pred, δ) - clamp(s_j, δ)|  # Clamped L1
        
        loss = sum(loss_j) + (1/σ²) * ||z_i||²  # 加正则项
        loss.backward()                 # 同时更新 theta 和 z_i
        optimizer.step()

# ===== 推理阶段 (MAP Estimation) =====
theta = freeze(theta)                  # 固定网络参数
z_hat = torch.zeros(latent_dim, requires_grad=True)

for step in range(inference_steps):
    loss = sum(|clamp(f_theta(z_hat, x_j), δ) - clamp(s_j, δ)|) \
           + (1/σ²) * ||z_hat||²
    loss.backward()                    # 仅更新 z_hat
    optimizer_z.step()

mesh = marching_cubes(lambda x: f_theta(z_hat, x))  # 提取零等值面
```

##### 动机与背景

传统三维形状表示方法——体素网格、点云、三角网格——均为**离散表示**，存在固有局限：

1. **体素网格**：内存随分辨率立方增长（\(O(n^3)\)），难以表示精细几何细节
2. **点云**：缺乏拓扑连接信息，无法直接定义封闭表面
3. **网格**：拓扑固定，难以处理亏格变化的形状

DeepSDF 的核心洞察是：**签名距离函数（SDF）本身是一个连续函数**，可以用神经网络来参数化。SDF 在物体内部为负、外部为正、表面为零，其零等值面天然定义了封闭的物体表面。这种表示具有**任意分辨率**、**天然封闭性**和**紧凑参数量**的优势。

##### 核心机制：从单一 SDF 到形状空间

**（1）单一形状的 SDF 回归**

对于单个形状，DeepSDF 训练一个网络 \(f_\theta\) 直接拟合其 SDF：

$$f_\theta(\mathbf{x}) = s, \quad \mathbf{x} \in \mathbb{R}^3, \; s \in \mathbb{R}$$

训练数据为从形状表面附近采样的点对集合 \(X = \{(\mathbf{x}_j, s_j)\}\)，其中 \(s_j\) 是点 \(\mathbf{x}_j\) 的真实 SDF 值。

> 💡 **关键设计——Clamped L1 Loss**：远离表面的点的 SDF 值对重建质量影响不大，因此对 SDF 值进行截断：

$$\mathcal{L}(\hat{s}, s) = |\text{clamp}(\hat{s}, \delta) - \text{clamp}(s, \delta)|, \quad \text{clamp}(x, \delta) = \min(\delta, \max(-\delta, x))$$

其中 \(\delta = 0.1\)。这使网络集中学习表面附近（\(|s| < \delta\)）的精确距离值，而非浪费容量在远处区域。

**（2）条件化形状空间（Coded DeepSDF）**

为了用**一个网络表示多个形状**，引入形状潜码 \(\mathbf{z}_i \in \mathbb{R}^{256}\)，网络变为条件模型：

$$f_\theta(\mathbf{z}_i, \mathbf{x}_j) \approx \text{SDF}^i(\mathbf{x}_j)$$

潜码 \(\mathbf{z}_i\) 与查询点 \(\mathbf{x}_j\) 拼接后输入网络。不同的 \(\mathbf{z}_i\) 对应不同的形状，网络学习了一个**连续的形状嵌入空间**。

**（3）Auto-Decoder 架构**

与 VAE 等编码器-解码器架构不同，DeepSDF 采用 **auto-decoder**：

- **无编码器**：潜码 \(\mathbf{z}_i\) 不由编码器生成，而是作为**自由参数**直接优化
- **联合训练**：网络参数 \(\theta\) 和所有潜码 \(\{\mathbf{z}_i\}_{i=1}^N\) 同时通过反向传播更新

训练目标（最大化后验概率的等价最小化形式）：

$$\arg\min_{\theta, \{\mathbf{z}_i\}_{i=1}^N} \sum_{i=1}^{N} \left( \sum_{j=1}^{K} \mathcal{L}(f_\theta(\mathbf{z}_i, \mathbf{x}_j), s_j) + \frac{1}{\sigma^2} \|\mathbf{z}_i\|_2^2 \right)$$

> ⚠️ **正则项的作用**：\(\frac{1}{\sigma^2}\|\mathbf{z}_i\|_2^2\) 来自零均值高斯先验 \(p(\mathbf{z}_i) = \mathcal{N}(\mathbf{0}, \sigma^2 \mathbf{I})\)。它防止潜码发散，确保潜空间紧凑且平滑，使得插值和采样有意义。

**（4）MAP 推理：表示新形状**

训练完成后固定 \(\theta\)，对新形状 \(X\)（可以是完整或部分观测），通过梯度下降优化潜码：

$$\hat{\mathbf{z}} = \arg\min_{\mathbf{z}} \sum_{(\mathbf{x}_j, \mathbf{s}_j) \in X} \mathcal{L}(f_\theta(\mathbf{z}, \mathbf{x}_j), s_j) + \frac{1}{\sigma^2}\|\mathbf{z}\|_2^2$$

这一过程类似测试时优化（test-time optimization），通常只需数百步即可收敛。最终通过 Marching Cubes 算法从 \(f_\theta(\hat{\mathbf{z}}, \cdot)\) 提取零等值面得到网格。

##### 网络架构细节

- **8 层全连接网络**，每层 512 维隐藏单元
- **Skip connection**：在第 4 层重新注入输入（\(\mathbf{z}\) 和 \(\mathbf{x}\) 的拼接），缓解梯度消失
- **激活函数**：隐藏层 ReLU，输出层 tanh（将输出约束在 \([-1, 1]\)）
- **Weight normalization**：替代 batch normalization，稳定训练
- **Dropout**：用于正则化
- **优化器**：Adam，学习率 \(5 \times 10^{-4}\)（网络）和 \(10^{-3}\)（潜码），每 500 epoch 衰减一半
- **潜码维度**：单类别 256 维，多类别 256 维

##### 与传统方法的对比

| 特性 | 体素方法 (OGN) | 网格方法 (AtlasNet) | **DeepSDF** |
|------|----------------|---------------------|-------------|
| 表示类型 | 离散体素 | 参数化表面片 | 连续隐式函数 |
| 分辨率 | 固定（如 \(64^3\)） | 固定采样点数 | **任意精度** |
| 拓扑约束 | 无 | 固定模板拓扑 | **无限制** |
| 内存效率 | \(O(n^3)\) | 中等 | **紧凑（仅网络参数+潜码）** |
| 表面封闭性 | 不保证 | 不保证 | **天然封闭** |
| 已知形状 CD（×10³） | 0.167 | 0.157 | **0.084** |

##### 实验结果

在 ShapeNet 数据集上的四项实验均验证了 DeepSDF 的优越性：

1. **已知形状表示**（Table 2）：DeepSDF 的 Chamfer Distance（0.084）远优于 OGN（0.167）和 AtlasNet（0.157），表明连续 SDF 表示的高保真度
2. **未知形状重建**（Table 3）：在 chair/plane/sofa 等类别上，DeepSDF 的 CD 中位数（0.072/0.036/0.088）大幅优于 AtlasNet-25（0.276/0.065/0.311）
3. **部分形状补全**：利用深度图作为部分观测，DeepSDF 在 CD 和 mesh accuracy 上均优于 3D-EPN
4. **形状采样与插值**：在潜空间中采样或插值可生成平滑、合理的新形状，证明学到的潜空间具有良好结构

#### 🧪 练习题

```yaml
question: "DeepSDF 的 auto-decoder 架构与传统 auto-encoder 的关键区别是什么？"
options:
  - "auto-decoder 使用更深的解码器网络"
  - "auto-decoder 没有编码器，潜码作为自由参数直接优化"
  - "auto-decoder 使用变分推断来估计潜码分布"
  - "auto-decoder 在推理时不需要优化任何参数"
answer: 1
explain: "Auto-decoder 摒弃了编码器，将每个形状的潜码 z_i 视为可学习参数，在训练时与网络参数联合优化；推理时通过 MAP 估计优化新形状的潜码。这避免了编码器的信息瓶颈，且训练更简单。"
```