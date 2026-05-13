### 像素到像素 (Pix2Pix)

```yaml
id: pix2pix
name: Pix2Pix
full_name: "像素到像素 (Pix2Pix)"
year: 2017
org: UC Berkeley
paper_url: "https://arxiv.org/abs/1611.07004"
category: controllable_gen
parent: "—"
motivation: "条件GAN实现成对图像翻译"
```

#### 📝 一句话总结

Pix2Pix 提出了一个基于条件 GAN 的通用图像到图像翻译框架，通过 U-Net 生成器与 PatchGAN 判别器的组合，配合 cGAN + L1 联合损失，在语义分割图→照片、边缘图→照片、黑白→彩色等多种成对图像翻译任务上均取得了高质量结果，证明了条件 GAN 作为图像翻译通用方案的可行性。

#### 🎯 核心要点

- **通用条件 GAN 框架**：将图像到图像翻译统一建模为条件 GAN 问题，同一架构无需针对不同任务做特殊设计
- **U-Net 生成器**：在编码器-解码器基础上添加跳跃连接（skip connections），保留低层细节信息，避免信息瓶颈
- **PatchGAN 判别器**：仅在 \(N \times N\) 局部图像块上判断真假（默认 70×70），捕捉高频纹理结构，参数更少、速度更快，可应用于任意尺寸图像
- **cGAN + L1 联合损失**：cGAN 损失负责高频细节的真实感，L1 损失负责低频结构的正确性，两者互补
- **噪声注入策略**：发现生成器会忽略显式输入的随机噪声 \(z\)，改用 dropout 在训练和测试时注入随机性
- **广泛的任务验证**：在语义标签↔照片、建筑标签→照片、地图↔航拍、黑白→彩色、边缘→照片、白天→夜晚等 9 类任务上验证了方法的通用性

#### 🔬 深入细节

##### 问题定义与动机

传统的图像翻译方法针对每个任务都需要设计专门的损失函数和网络结构。例如，超分辨率用感知损失，着色用分类损失，语义分割用交叉熵损失。Pix2Pix 的核心洞察是：**条件 GAN 可以作为一种"学习损失函数"的通用框架**——判别器自动学习区分生成图像与真实图像的标准，无需人工设计任务特定的损失。

![Pix2Pix 多任务概览](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x1.png)
*图 1：Pix2Pix 在多种图像翻译任务上的结果，包括标签→街景、标签→立面、黑白→彩色、航拍→地图、白天→夜晚、边缘→照片等*

##### 训练框架

![cGAN 训练流程](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x2.png)
*图 2：条件 GAN 训练流程。生成器 G 接收输入图像 x 生成 G(x)，判别器 D 同时观察输入 x 和输出（真实 y 或生成 G(x)），判断真假*

与标准 GAN 学习 \(G: z \rightarrow y\) 不同，条件 GAN 学习 \(G: \{x, z\} \rightarrow y\)，其中 \(x\) 是条件输入图像，\(z\) 是随机噪声。判别器 \(D\) 同时接收 \(x\) 和输出图像，判断该对是否为真实配对。

##### 损失函数设计

Pix2Pix 的最终目标函数由两部分组成：

**条件 GAN 损失**（对抗损失）：

$$\mathcal{L}_{cGAN}(G, D) = \mathbb{E}_{x,y}[\log D(x, y)] + \mathbb{E}_{x,z}[\log(1 - D(x, G(x, z)))]$$

**L1 重建损失**：

$$\mathcal{L}_{L1}(G) = \mathbb{E}_{x,y,z}[\|y - G(x, z)\|_1]$$

**最终联合目标**：

$$G^* = \arg\min_G \max_D \; \mathcal{L}_{cGAN}(G, D) + \lambda \mathcal{L}_{L1}(G)$$

> 💡 **关键设计直觉**：L1 损失倾向于产生模糊但结构正确的结果（负责低频），cGAN 损失则驱动生成器产生锐利、真实的纹理细节（负责高频）。两者互补，缺一不可。实验中 \(\lambda = 100\)。

> ⚠️ **注意**：论文选择 L1 而非 L2 距离，因为 L2 会导致更严重的模糊（L2 对大误差惩罚更重，倾向于回归均值）。

##### 生成器架构：U-Net

![U-Net vs Encoder-Decoder](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x3.png)
*图 3：两种生成器架构对比。左：标准编码器-解码器；右：U-Net，添加了对称层之间的跳跃连接*

图像翻译任务中，输入和输出共享大量底层结构信息（如边缘位置、整体布局）。标准编码器-解码器必须将所有信息压缩到瓶颈层再解码，导致细节丢失。U-Net 通过在编码器第 \(i\) 层和解码器第 \(n-i\) 层之间添加跳跃连接，直接传递低层特征（边缘、纹理等），让解码器同时利用高层语义和低层细节。

具体结构为 8 层编码器 + 8 层解码器，每层使用 Convolution-BatchNorm-ReLU 模块。跳跃连接通过 concatenation 实现（将编码器特征图与解码器特征图在通道维度拼接）。

##### 判别器架构：PatchGAN

传统 GAN 判别器输出一个标量（整张图像的真/假概率）。PatchGAN 的核心创新是：**判别器只在局部 \(N \times N\) 图像块上判断真假**，然后对所有块的响应取平均。

这一设计基于以下观察：
- L1 损失已经能很好地约束低频结构的正确性
- GAN 判别器只需要关注**高频纹理细节**
- 高频结构本质上是局部的，不需要全局感受野

论文实验了不同的 patch 尺寸：1×1（PixelGAN）、16×16、70×70、286×286（全图）。**70×70 PatchGAN 取得了最佳效果**，既能产生锐利的纹理，又避免了全图判别器的过多参数和伪影。

> 💡 **关键洞察**：PatchGAN 本质上将图像建模为马尔可夫随机场（MRF），假设超过 patch 直径距离的像素之间相互独立。这与纹理/风格建模中的常见假设一致，因此 PatchGAN 可以理解为一种**纹理/风格损失**。

##### 训练伪代码

```python
# Pix2Pix 训练伪代码
G = UNetGenerator()       # U-Net 生成器
D = PatchGANDiscriminator()  # 70x70 PatchGAN 判别器
optimizer_G = Adam(G.parameters(), lr=0.0002, betas=(0.5, 0.999))
optimizer_D = Adam(D.parameters(), lr=0.0002, betas=(0.5, 0.999))
lambda_L1 = 100

for epoch in range(num_epochs):
    for x, y in dataloader:  # x: 输入图像, y: 目标图像
        # --- 训练判别器 D ---
        fake = G(x)                          # 生成假图
        pred_real = D(x, y)                  # D 判断真实对
        pred_fake = D(x, fake.detach())      # D 判断生成对
        loss_D = 0.5 * (BCE(pred_real, 1) + BCE(pred_fake, 0))
        optimizer_D.step(loss_D)             # D 的损失除以 2 减缓学习

        # --- 训练生成器 G ---
        pred_fake = D(x, fake)               # D 重新评估
        loss_G_cGAN = BCE(pred_fake, 1)      # 欺骗 D（最大化 log D）
        loss_G_L1 = L1_loss(fake, y)         # L1 重建
        loss_G = loss_G_cGAN + lambda_L1 * loss_G_L1
        optimizer_G.step(loss_G)
```

##### 噪声与随机性

条件 GAN 理论上需要噪声输入 \(z\) 来建模输出的多样性。然而作者发现生成器会学会**忽略**显式输入的高斯噪声 \(z\)，这与 Mathieu et al. 的发现一致。最终方案是通过 **dropout**（在生成器的多个层上，训练和测试时均启用）注入随机性。但作者承认输出的随机性仍然有限，如何让条件 GAN 产生高度多样化的输出仍是开放问题。

##### 推理时的特殊处理

推理时保持与训练完全一致的行为：
- **Dropout 保持开启**（不同于常规做法）
- **Batch Normalization 使用测试 batch 的统计量**而非训练集的累积统计量（batch size=1 时等价于 Instance Normalization）

##### 损失函数消融实验

![损失函数消融](https://ar5iv.labs.arxiv.org/html/1611.07004/assets/x4.png)
*图 4：不同损失函数组合的效果对比。仅 L1 产生模糊结果；仅 cGAN 产生锐利但有伪影的结果；L1 + cGAN 兼具结构正确性和纹理真实感*

实验表明：
- 仅 L1：结构合理但模糊
- 仅 cGAN：纹理锐利但颜色/结构可能出错
- **L1 + cGAN**：最佳组合，兼具两者优势
- 条件判别器（观察 x）优于无条件判别器

#### 🧪 练习题

```yaml
question: "Pix2Pix 中 PatchGAN 判别器的核心设计思想是什么？"
options:
  - "在整张图像上输出单一真假概率，提升全局一致性"
  - "仅在局部图像块上判断真假，专注于高频纹理结构"
  - "使用多尺度金字塔结构，同时捕捉低频和高频信息"
  - "将判别器替换为预训练分类网络的感知损失"
answer: 1
explain: "PatchGAN 仅在 N×N 局部块上判断真假并取平均，因为 L1 损失已约束低频结构，判别器只需关注局部高频纹理，这使其参数更少、速度更快且可处理任意尺寸图像。"
```