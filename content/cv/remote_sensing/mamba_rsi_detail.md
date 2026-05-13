### Mamba遥感图像分类

```yaml
id: mamba_rsi
name: Mamba-RSI
full_name: "Mamba遥感图像分类 (RSMamba: Remote Sensing Image Classification with State Space Model)"
year: 2024
org: Beihang University & HKU
paper_url: "https://arxiv.org/abs/2403.19654"
code_url: "https://github.com/KyanChen/RSMamba"
category: scene_classification
parent: ftransmamba
motivation: "将状态空间模型(Mamba)引入遥感图像场景分类，通过动态多路径激活机制克服原始Mamba单向建模和位置不敏感的局限，以线性复杂度实现全局感受野"
```

#### 📝 一句话总结

RSMamba 提出了动态多路径激活机制（正向、反向、随机打乱三条扫描路径 + 自适应门控融合），将 Mamba 状态空间模型应用于遥感图像场景分类，以线性复杂度和全局感受野同时超越 CNN 与 Transformer 基线。

#### 🎯 核心要点

- **状态空间模型骨干**：基于 Mamba（Selective SSM）构建视觉分类网络，具有 \(O(L)\) 线性序列建模复杂度，显著优于 Transformer 的 \(O(L^2)\)
- **动态多路径激活机制**：设计正向（Forward）、反向（Reverse）、随机打乱（Random Shuffle）三条扫描路径，共享同一 Mamba 混合器处理，缓解单向因果建模对二维图像的局限
- **自适应门控融合**：三路径输出恢复原始顺序后，通过 softmax 门控网络自适应加权融合，优于简单平均
- **均值池化替代 class token**：实验证明均值池化在 SSM 架构中优于 ViT 风格的 class token，且加速收敛
- **可学习位置编码**：为展平后的 patch 序列添加可学习位置编码，增强空间关系建模
- **三种模型规格**：Base（24层/192维/6.4M）、Large（36层/256维/16.2M）、Huge（48层/320维/33.1M），灵活适配不同场景
- **三大遥感基准验证**：在 UC Merced（21类）、AID（30类）、RESISC-45（45类）上均超越 ResNet、ViT、Swin Transformer 等 SOTA 方法

#### 🔬 深入细节

![RSMamba 架构示意图](https://ar5iv.labs.arxiv.org/html/2403.19654/assets/x1.png)
*图：RSMamba 整体架构。输入图像经 Conv2D 分块嵌入后，通过多路径 Mamba 块堆叠提取特征，最终均值池化后分类。*

```python
# RSMamba 核心前向传播伪代码
def RSMamba_forward(image, N_blocks, classifier):
    # Step 1: Patch Embedding
    tokens = Conv2D(image, kernel=16, stride=8)  # [B, d, H', W']
    tokens = flatten(tokens)                      # [B, L, d], L = H'*W'
    tokens = tokens + learnable_pos_encoding      # 添加位置编码

    # Step 2: N 个 RSMamba Block（含残差连接）
    for block in range(N_blocks):
        residual = tokens
        tokens = LayerNorm(tokens)

        # 动态多路径激活
        t_forward  = tokens                        # 正向序列
        t_reverse  = reverse(tokens)               # 反向序列
        t_shuffle  = random_shuffle(tokens)         # 随机打乱序列
        # 记录 shuffle 索引以便恢复

        # 共享 Mamba Mixer 处理
        o_forward  = MambaMixer(t_forward)
        o_reverse  = MambaMixer(t_reverse)
        o_shuffle  = MambaMixer(t_shuffle)

        # 恢复原始顺序
        o_reverse  = reverse(o_reverse)
        o_shuffle  = restore_order(o_shuffle)       # 按记录索引恢复

        # 自适应门控融合
        stacked = stack([o_forward, o_reverse, o_shuffle])  # [B, 3, L, d]
        pooled  = mean_pool(stacked, dim=2)                  # [B, 3, d]
        gate    = softmax(Linear(pooled.reshape(B, 3*d)), dim=-1)  # [B, 3]
        output  = sum(gate[:, i] * stacked[:, i] for i in range(3))

        tokens = residual + output

    # Step 3: 分类
    features = mean_pool(tokens, dim=1)  # [B, d]
    features = LayerNorm(features)
    logits   = Linear(features)          # [B, num_classes]
    return logits
```

**动机与背景：** 遥感图像场景分类需要从高空俯拍影像中识别地物类别（如机场、港口、农田等）。传统 CNN（如 ResNet）受限于局部感受野，难以捕获遥感图像中的大尺度空间关系；Transformer（如 ViT、Swin）虽具备全局建模能力，但自注意力的 \(O(L^2)\) 复杂度在高分辨率遥感影像上计算开销巨大，且依赖大规模预训练数据的归纳偏置。Mamba 作为新兴的状态空间模型，以 \(O(L)\) 线性复杂度实现长序列建模，但其源自因果语言建模的单向扫描机制无法直接适用于无因果关系的二维图像数据。RSMamba 正是为解决这一矛盾而提出。

**核心机制——动态多路径激活与门控融合：** RSMamba 的核心创新在于将单一 Mamba 扫描扩展为三条并行路径。给定展平后的 token 序列 \(T \in \mathbb{R}^{L \times d}\)，分别构造正向序列 \(T_f\)、反向序列 \(T_r = \text{flip}(T)\) 和随机打乱序列 \(T_s = \text{shuffle}(T)\)。三条路径共享同一组 Mamba 参数，经 Selective SSM 处理后得到输出 \(O_f, O_r, O_s\)，再将反向和打乱路径恢复到原始 token 顺序。融合阶段，三路输出沿序列维度均值池化后拼接，通过线性层 + softmax 生成三维门控权重 \(\alpha = [\alpha_f, \alpha_r, \alpha_s]\)，最终输出为加权和：

$$
Y = \alpha_f \cdot O_f + \alpha_r \cdot O_r + \alpha_s \cdot O_s
$$

其中 Mamba 内部的 Selective SSM 遵循离散化状态空间方程：

$$
h_t = \bar{A} h_{t-1} + \bar{B} x_t, \quad y_t = C h_t
$$

$$
\bar{A} = \exp(\Delta A), \quad \bar{B} = (\Delta A)^{-1}(\exp(\Delta A) - I) \cdot \Delta B
$$

这里 \(\Delta\) 是输入依赖的步长参数，使得 SSM 具有选择性地关注或忽略不同位置信息的能力。三路径设计确保每个 token 既能从正向获取"前文"信息，也能从反向获取"后文"信息，还能通过随机打乱建立跨距离的长程依赖，从而有效弥补单向 Mamba 的信息流缺陷。

> 💡 **关键**：门控机制优于简单平均——消融实验显示，在 AID 数据集上，门控融合比平均融合 F1 提升约 1.6%（90.07 → 91.66），说明不同路径对不同样本的贡献确实不均等。

**训练流程与实验验证：** RSMamba 采用 AdamW 优化器（初始学习率 \(5 \times 10^{-4}\)，权重衰减 0.05），配合余弦退火 + 线性预热调度器，批大小 1024，训练 500 个 epoch，损失函数为标准交叉熵。输入图像默认 \(224 \times 224\)，通过 \(k=16, s=8\) 的重叠卷积分块生成 \(L = 27 \times 27 = 729\) 个 token。在三大基准上，RSMamba-Huge 以 33.1M 参数达到最优 F1：UC Merced 95.25%、AID 92.63%、RESISC-45 95.18%，分别超越 Swin-B（87.3M 参数）约 3-5 个百分点。值得注意的是，即使是仅 6.4M 参数的 Base 版本也已接近或超过大部分 Transformer 基线，表明 SSM 架构在小数据量场景下具有天然的参数效率优势，无需大规模预训练即可获得强竞争力。消融实验进一步验证了各组件的有效性：均值池化优于所有 class token 变体；多路径数量与性能正相关；可学习位置编码带来稳定增益；重叠分块和更大输入尺寸均可进一步提升精度。

> ⚠️ **注意**：RSMamba 的三条路径共享 Mamba 参数，因此参数量仅为单路径的 1 倍（而非 3 倍），额外开销仅来自门控网络的少量参数和推理时的 3 次前向传播。

#### 🧪 练习题

```yaml
question: "RSMamba 中动态多路径激活机制的三条扫描路径分别是什么？"
options:
  - "水平扫描、垂直扫描、对角线扫描"
  - "正向扫描、反向扫描、随机打乱扫描"
  - "局部窗口扫描、全局扫描、跨步扫描"
  - "从左到右扫描、从上到下扫描、螺旋扫描"
answer: 1
explain: "RSMamba 设计了正向（Forward）、反向（Reverse）和随机打乱（Random Shuffle）三条路径，分别对展平后的 token 序列进行不同顺序的 Mamba 处理，以克服单向因果建模的局限。"
```