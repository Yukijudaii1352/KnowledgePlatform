### Attention U-Net

```yaml
id: attention_unet
name: "Attention U-Net"
full_name: "注意力U-Net (Attention U-Net: Learning Where to Look for the Pancreas)"
year: "2018"
org: "Imperial College London"
paper_url: "https://arxiv.org/abs/1804.03999"
category: "medical_segmentation"
parent: "U-Net"
motivation: "在U-Net跳跃连接中引入注意力门控，自动学习聚焦目标区域，抑制背景噪声"
```

#### 📝 一句话总结

Attention U-Net 在标准 U-Net 的跳跃连接中嵌入 Attention Gate (AG) 模块，利用解码器粗粒度语义信息作为门控信号，自动抑制无关背景区域的特征响应，在仅增加约 8% 参数的条件下显著提升腹部 CT 器官（尤其是胰腺）分割精度。

#### 🎯 核心要点

- **Attention Gate (AG) 模块**：在每个跳跃连接处插入 AG，用解码器上采样前的粗尺度特征作为门控信号，对编码器特征进行空间注意力加权
- **Additive Attention 机制**：采用加性注意力（非点积），通过 1×1×1 卷积将编码器特征和门控信号映射到中间空间后相加，再经 ReLU + 1×1 卷积 + Sigmoid 得到注意力系数
- **Grid Attention（非全局向量）**：门控信号保留空间维度，是逐像素的网格信号而非单一全局向量，提供更精细的空间选择能力
- **Sigmoid 替代 Softmax**：使用 Sigmoid 归一化注意力系数，避免 Softmax 导致的过度稀疏激活，实验表明收敛更稳定
- **Deep Supervision**：在多尺度中间层添加辅助损失，确保各尺度注意力单元均能学习到语义判别信息
- **Sorensen-Dice Loss**：使用 Dice 损失训练，对类别不平衡更鲁棒（胰腺仅占腹部体积 ~0.5%）
- **端到端可训练**：AG 参数通过标准反向传播更新，无需硬注意力的采样策略，训练简单
- **实验验证**：CT-150 数据集胰腺 DSC 从 0.814 提升至 0.840（p=0.005），CT-82 (NIH-TCIA) 数据集同样有效

#### 🔬 深入细节

![Attention U-Net 架构图](https://ar5iv.labs.arxiv.org/html/1804.03999/assets/figure1_b.png)
*图：Attention U-Net 整体架构。AG 模块嵌入在每个跳跃连接与解码器拼接之前，利用粗尺度门控信号过滤编码器特征。*

![Attention Gate 模块示意](https://ar5iv.labs.arxiv.org/html/1804.03999/assets/figure1_a.png)
*图：Attention Gate 内部结构。输入特征 x^l 和门控信号 g 分别通过 1×1×1 卷积映射后相加，经 ReLU → 1×1 卷积 → Sigmoid 输出注意力图 α。*

##### 算法伪代码

```python
# Attention Gate 前向计算
def attention_gate(x_l, g, W_x, W_g, psi, b_g, b_psi):
    """
    x_l: 编码器第 l 层跳跃连接特征 [B, F_l, D, H, W]
    g:   解码器门控信号（上一层上采样前） [B, F_g, D', H', W']
    """
    # 1. 线性映射到中间空间 F_int（1×1×1 卷积）
    theta_x = conv1x1(x_l, W_x)        # [B, F_int, D, H, W]
    phi_g = conv1x1(g, W_g) + b_g      # [B, F_int, D', H', W']
    
    # 2. x 下采样到与 g 相同分辨率后逐元素相加
    theta_x_down = downsample(theta_x)  # 匹配 g 的空间尺寸
    q_att = relu(theta_x_down + phi_g)  # [B, F_int, D', H', W']
    
    # 3. 通过 ψ 映射到单通道 + Sigmoid
    q_att = conv1x1(q_att, psi) + b_psi # [B, 1, D', H', W']
    alpha = sigmoid(q_att)               # 注意力系数 ∈ (0, 1)
    
    # 4. 上采样 α 到 x_l 分辨率，逐元素加权
    alpha_up = upsample(alpha)           # [B, 1, D, H, W]
    x_hat = x_l * alpha_up              # 门控后的特征
    return x_hat
```

##### 动机与背景

标准 U-Net 通过跳跃连接将编码器各层特征直接拼接到解码器对应层，虽然保留了高分辨率细节，但同时也引入了大量**无关背景区域的特征响应**。对于腹部 CT 分割等任务，目标器官（如胰腺）仅占整个图像体积的极小比例（~0.5%），大量背景特征的传递不仅浪费计算资源，还可能干扰分割决策，导致假阳性。

传统解决方案包括：(1) 级联多阶段模型（先定位再精细分割），增加了流水线复杂度；(2) 外部器官定位模块，需要额外训练。Attention U-Net 提出了一种**轻量级、端到端**的解决方案——在跳跃连接处嵌入可学习的注意力门控。

##### 核心机制：Attention Gate

AG 的核心思想是利用**解码器已有的粗粒度语义信息**（门控信号 \(g\)）来指导编码器特征（\(x^l\)）的筛选。其数学形式为 additive attention：

$$q_{att}^l = \psi^T \sigma_1(W_x^T x_i^l + W_g^T g_i + b_g) + b_\psi$$

$$\alpha_i^l = \sigma_2(q_{att}^l(x_i^l, g_i; \Theta_{att}))$$

其中：
- \(W_x \in \mathbb{R}^{F_l \times F_{int}}\)，\(W_g \in \mathbb{R}^{F_g \times F_{int}}\)：将输入特征和门控信号映射到 \(F_{int}\) 维中间空间
- \(\psi \in \mathbb{R}^{F_{int} \times 1}\)：将中间表示压缩为单通道注意力图
- \(\sigma_1\)：ReLU 激活函数
- \(\sigma_2\)：**Sigmoid** 激活函数（而非 Softmax）

> 💡 **关键设计选择**：使用 Sigmoid 而非 Softmax 归一化注意力系数。Softmax 在图像分割场景中会导致过度稀疏（因为要在所有空间位置上竞争），而 Sigmoid 允许多个空间位置同时获得高注意力值，更适合分割任务中目标可能占据连续区域的特点。

##### Grid Attention vs. 全局注意力

与图像描述（image captioning）任务中使用单一全局向量作为 query 不同，Attention U-Net 采用**网格注意力**：门控信号 \(g\) 保留了空间维度，是一个与特征图同尺度的张量。这意味着：

1. 注意力计算是**逐像素**的，不同空间位置可以有不同的门控强度
2. 门控信号聚合了**多个成像尺度**的信息（因为解码器逐层融合了从粗到细的语义）
3. 随着解码器层级加深，门控信号的空间分辨率逐渐提高，实现从粗到细的注意力精化

##### 反向传播中的梯度调制

AG 不仅在前向传播中过滤特征，还在反向传播中自动调制梯度：

$$\frac{\partial(\hat{x}_i^l)}{\partial(\Phi^{l-1})} = \alpha_i^l \frac{\partial(f(x_i^{l-1};\Phi^{l-1}))}{\partial(\Phi^{l-1})} + \frac{\partial(\alpha_i^l)}{\partial(\Phi^{l-1})} x_i^l$$

> ⚠️ **注意**：第一项表明背景区域（\(\alpha \approx 0\)）的梯度被自动抑制，使得浅层参数主要根据前景相关区域更新，加速收敛并减少过拟合。

##### 训练流程与实现细节

- **3D 模型**：采用 3D U-Net 架构捕获体积上下文，输入尺寸 160×160×96
- **优化器**：Adam，小批量 2-4 样本
- **数据增强**：仿射变换、轴向翻转、随机裁剪
- **归一化**：Batch Normalization + 输入强度线性缩放至 N(0,1)
- **AG 初始化**：参数初始化使得初始时 AG 通过所有位置的特征（α≈1），训练过程中逐渐学习聚焦
- **Deep Supervision**：在中间尺度添加辅助分割头，确保各层 AG 都能获得有效监督信号

##### 与传统方法的对比

| 特性 | 标准 U-Net | 级联方法 | Attention U-Net |
|------|-----------|---------|----------------|
| 跳跃连接 | 直接拼接 | 直接拼接 | AG 过滤后拼接 |
| 定位机制 | 无 | 外部定位网络 | 内置 AG 自动定位 |
| 训练阶段 | 单阶段 | 多阶段 | 单阶段端到端 |
| 额外参数 | — | 整个定位网络 | 仅 +8% |
| 推理时间 | 0.167s | 2× 以上 | 0.179s |

实验表明，即使将 U-Net 参数量增加到与 Attention U-Net 相同（6.44M vs 6.40M），均匀分配额外参数的效果（DSC 0.821）仍不如 AG 方式（DSC 0.840），证明 AG 的注意力机制本身而非单纯增加容量带来了性能提升。

#### 🧪 练习题

```yaml
question: "Attention U-Net 中 Attention Gate 使用 Sigmoid 而非 Softmax 作为注意力归一化函数的主要原因是什么？"
options:
  - "Sigmoid 计算速度更快，减少推理延迟"
  - "Softmax 在空间位置间竞争导致过度稀疏，不适合分割任务中目标占据连续区域的场景"
  - "Sigmoid 的梯度更大，有利于深层网络的梯度传播"
  - "Softmax 需要额外的温度超参数调节，增加训练难度"
answer: 1
explain: "Softmax 要求所有空间位置的注意力系数之和为 1，导致激活过度稀疏；而 Sigmoid 允许多个位置同时获得高权重，更适合分割任务中前景区域连续分布的特点，实验也表明 Sigmoid 带来更好的训练收敛。"
```