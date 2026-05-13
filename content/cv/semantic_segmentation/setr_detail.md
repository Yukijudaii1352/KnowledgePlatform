### SETR

```yaml
id: setr
name: SETR
full_name: 分割Transformer (SEgmentation TRansformer)
year: '2021'
org: 腾讯/港大
paper_url: https://arxiv.org/abs/2012.15840
category: unified
parent: —
motivation: 纯Transformer序列到序列分割
```

#### 📝 一句话总结

SETR 将语义分割重新定义为序列到序列预测任务，首次采用纯 Transformer（无卷积、无分辨率下降）作为编码器，通过每一层的全局自注意力彻底解决了 FCN 感受野受限的问题，在 ADE20K 上取得当时 SOTA（50.28% mIoU）。

#### 🎯 核心要点

- 将图像分割建模为序列到序列预测任务，完全抛弃 FCN 编码器架构
- 编码器采用纯 ViT（Vision Transformer），将图像切分为 16×16 patch 后展平为 1D 序列输入
- 每层 Transformer 都具有全局感受野，从根本上解决 CNN 局部感受野受限问题
- 设计三种解码器：Naive（直接上采样）、PUP（渐进上采样）、MLA（多层特征聚合）
- 使用 ImageNet-21K 预训练的 ViT-Large（24层, 1024维, 16头）作为骨干网络
- 在 ADE20K（50.28% mIoU）、Pascal Context（55.83% mIoU）达到 SOTA，Cityscapes 上有竞争力
- 提交时在 ADE20K 测试服务器排行榜取得第一名

#### 🔬 深入细节

![SETR 整体架构图](https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x1.png)
*图：SETR 编码器架构——纯 Transformer 将图像 patch 序列编码为特征序列*

![SETR 解码器设计](https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x2.png)
*图：SETR-PUP 渐进上采样解码器*

![SETR-MLA 解码器](https://ar5iv.labs.arxiv.org/html/2012.15840/assets/x3.png)
*图：SETR-MLA 多层特征聚合解码器*

##### 动机与背景

传统语义分割方法基于 FCN 编码器-解码器架构，编码器通过堆叠卷积层逐步降低分辨率来扩大感受野。然而，卷积操作的**局部性**导致感受野仅随层数线性增长，且增加更多层的收益会迅速递减。虽然空洞卷积和注意力模块可以缓解这一问题，但它们仅作为组件级别的改进，FCN 架构本身的局限性并未改变。

SETR 的核心思想是：**在架构级别做出根本性改变**——完全放弃 FCN，采用纯 Transformer 编码器，使每一层都具有全局感受野，从根本上消除对感受野的担忧。

##### 核心机制：Image-to-Sequence 编码

**Patch Embedding：** 给定输入图像 \(x \in \mathbb{R}^{H \times W \times 3}\)，由于直接将每个像素作为 token 会导致序列长度过大（如 480×480 图像将产生 691,200 长度的序列），SETR 将图像划分为 \(\frac{H}{16} \times \frac{W}{16}\) 个大小为 16×16 的 patch，每个 patch 通过线性投影映射到 \(C\) 维嵌入空间：

$$p \longrightarrow e \in \mathbb{R}^C$$

**位置编码：** 为保留空间信息，为每个位置 \(i\) 学习一个位置嵌入 \(p_i\)，最终输入序列为：

$$E = \{e_1 + p_1, \ e_2 + p_2, \ \cdots, \ e_L + p_L\}$$

其中序列长度 \(L = \frac{HW}{256}\)。

##### Transformer 编码器

编码器由 \(L_e\) 层多头自注意力（MSA）和 MLP 块组成。在每层 \(l\)，计算过程为：

**自注意力计算：**

$$\text{query} = Z^{l-1} \mathbf{W}_Q, \quad \text{key} = Z^{l-1} \mathbf{W}_K, \quad \text{value} = Z^{l-1} \mathbf{W}_V$$

$$SA(Z^{l-1}) = Z^{l-1} + \text{softmax}\left(\frac{Z^{l-1}\mathbf{W}_Q (Z^{l-1}\mathbf{W}_K)^\top}{\sqrt{d}}\right)(Z^{l-1}\mathbf{W}_V)$$

**多头注意力：**

$$MSA(Z^{l-1}) = [SA_1(Z^{l-1}); \ SA_2(Z^{l-1}); \ \cdots; \ SA_m(Z^{l-1})]\mathbf{W}_O$$

**层输出（含 MLP 和残差连接）：**

$$Z^l = MSA(Z^{l-1}) + MLP(MSA(Z^{l-1})) \in \mathbb{R}^{L \times C}$$

> 💡 关键：与 CNN 不同，Transformer 的自注意力在每一层都对所有 patch 进行全局交互，因此**每一层都具有全局感受野**，无需通过堆叠层数来扩大感受野。

##### 三种解码器设计

编码器输出 \(Z \in \mathbb{R}^{\frac{HW}{256} \times C}\) 需要 reshape 为 \(\frac{H}{16} \times \frac{W}{16} \times C\) 的 3D 特征图后送入解码器：

**1. SETR-Naive（朴素上采样）：**
- 对最后一层特征 \(Z^{L_e}\) 用 1×1 conv + BN + ReLU + 1×1 conv 投影到类别数维度
- 直接双线性插值上采样到原始分辨率

**2. SETR-PUP（渐进上采样）：**
- 避免一步上采样引入噪声，采用 4 次 2× 上采样交替 conv 层
- 从 \(\frac{H}{16} \times \frac{W}{16}\) 逐步恢复到 \(H \times W\)

**3. SETR-MLA（多层特征聚合）：**
- 类似 FPN 思想，但所有层特征分辨率相同（无金字塔形状）
- 从 \(M\) 个均匀分布的层（间隔 \(\frac{L_e}{M}\)）提取特征
- 每个流经过 1×1、3×3、3×3 卷积（通道逐步减半）+ 4× 上采样
- 引入自顶向下的逐元素加法聚合跨流交互
- 最终通过通道拼接融合所有流，再 4× 上采样到全分辨率

```python
# SETR 前向传播伪代码
def setr_forward(image, patch_size=16):
    # 1. Patch Embedding
    H, W = image.shape[:2]
    patches = split_into_patches(image, patch_size)  # (H/16 * W/16) patches
    embeddings = linear_project(patches)  # [L, C], L = HW/256
    
    # 2. 添加位置编码
    pos_embed = learnable_position_embedding(L)
    tokens = embeddings + pos_embed  # [L, C]
    
    # 3. Transformer 编码器 (ViT-Large: 24层)
    for layer in transformer_layers:  # 24 layers
        tokens = layer.MSA(layer.LN(tokens)) + tokens  # 全局自注意力
        tokens = layer.MLP(layer.LN(tokens)) + tokens  # FFN
    
    # 4. Reshape 为 2D 特征图
    feature_map = tokens.reshape(H//16, W//16, C)
    
    # 5. 解码器 (以 PUP 为例)
    for i in range(4):  # 4次 2x 上采样
        feature_map = conv_bn_relu(feature_map)
        feature_map = bilinear_upsample_2x(feature_map)
    
    segmentation = pixel_classify(feature_map)  # [H, W, num_classes]
    return segmentation
```

##### 与传统方法的区别

| 特性 | FCN 编码器 | SETR 编码器 |
|------|-----------|------------|
| 基本操作 | 卷积（局部） | 自注意力（全局） |
| 感受野 | 随层数线性增长 | 每层即为全局 |
| 分辨率变化 | 逐步下采样 | 保持不变（1/16） |
| 特征维度 | 逐层变化 | 所有层相同（C=1024） |
| 上下文建模 | 仅高层有效 | 每层都建模全局上下文 |

> ⚠️ 注意：SETR 的计算复杂度为 \(O(L^2)\)，其中 \(L = \frac{HW}{256}\)。对于 480×480 图像，\(L=900\)；对于 768×768 图像，\(L=2304\)。这使得处理高分辨率图像时计算开销较大，模型参数量也较大（~306M）。

##### 模型配置与实验结果

| 配置 | 层数 | 隐藏维度 | 注意力头数 |
|------|------|---------|-----------|
| T-Base | 12 | 768 | 12 |
| T-Large | 24 | 1024 | 16 |

主要结果（使用 T-Large + ImageNet-21K 预训练）：
- **ADE20K**: SETR-MLA 达到 50.28% mIoU（测试集 SOTA）
- **Pascal Context**: 55.83% mIoU
- **Cityscapes**: SETR-PUP 达到 79.34% mIoU（80k iterations）

#### 🧪 练习题

```yaml
question: "SETR 相比传统 FCN 分割方法的核心架构级别改变是什么？"
options:
  - "使用空洞卷积扩大感受野"
  - "在 FCN 编码器后添加注意力模块"
  - "完全用 Transformer 替代 CNN 编码器，每层都具有全局感受野"
  - "使用更深的 ResNet 作为骨干网络"
answer: 2
explain: "SETR 的核心创新是在架构级别完全抛弃 FCN，采用纯 Transformer 编码器，使得每一层的自注意力都能建模全局上下文，从根本上解决感受野受限问题。"
```