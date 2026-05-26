### ConvNeXt

```yaml
id: convnext
name: ConvNeXt
full_name: "2020年代的卷积网络 (A ConvNet for the 2020s)"
year: "2022.01"
org: "Meta AI"
paper_url: "https://arxiv.org/abs/2201.03545"
category: foundation
parent: swin
motivation: "现代化CNN媲美Transformer"
```

#### 📝 一句话总结
ConvNeXt 通过系统吸收 Transformer 时代的训练配方和结构设计，把 ResNet 逐步现代化为更强的纯卷积骨干，证明精心设计的 CNN 仍然能在分类、检测和分割上与 Swin Transformer 正面竞争。

#### 🎯 核心要点
- 从 ResNet-50 出发，逐步替换训练策略、stem、深度卷积、大核、归一化和下采样设计。
- 用 4×4 patchify stem 和独立下采样层，把卷积网络的宏观结构对齐到 Swin 风格。
- 用 7×7 depthwise convolution、反转瓶颈、GELU 和 LayerNorm 重写 block。
- 强调性能差距很大一部分来自训练 recipe，而不仅是注意力机制本身。
- 在 ImageNet、COCO、ADE20K 上达到与 Swin 同级甚至更好的结果。

#### 🔬 深入细节

![ConvNeXt 现代化路线图](https://ar5iv.labs.arxiv.org/html/2201.03545/assets/x2.png)
*图：论文把 ResNet 到 ConvNeXt 的改造拆解成一系列可独立消融的步骤。*

```python
# ConvNeXt block 伪代码
def convnext_block(x):
    residual = x
    x = depthwise_conv(x, kernel_size=7, padding=3)
    x = layer_norm(x)
    x = linear(x, 4 * dim)
    x = gelu(x)
    x = linear(x, dim)
    return residual + x
```

ConvNeXt 的论文方法论很有代表性：作者没有从零发明一个新卷积架构，而是反过来问，“Transformer 时代到底哪些设计真正有效，这些设计是否也能迁移回 CNN？”因此它不是一次激进创新，而是一条清晰的现代化改造路线。

第一类改造来自训练策略。仅仅把 ResNet-50 的训练 recipe 升级为 AdamW、300 epoch、Mixup、CutMix、RandAugment、label smoothing、stochastic depth 等 ViT/Swin 风格设置，性能就能明显上升。这说明早期“CNN 不如 Transformer”的一部分结论其实混杂了训练协议差异。

第二类改造来自宏观结构。ConvNeXt 用 patchify stem 取代大卷积 + max-pooling 的传统开头，并把 stage 比例调整得更像 Swin，把更多计算量放到中间阶段。同时，阶段之间使用独立下采样层，而不是把降采样直接塞进残差块内部，使特征流更干净、更稳定。

第三类改造落在 block 内部。ConvNeXt 使用 depthwise 大核卷积做空间混合，再用两层 \(1\times1\) 线性层做通道混合，形式上已经很接近 Transformer 中“token mixing + channel MLP”的分工。论文特别把核扩大到 \(7\times7\)，并采用反转瓶颈、GELU、LayerNorm，从而让卷积块既保留 CNN 的局部先验，又获得更大的感受野和更现代的优化行为。

这篇论文最重要的结论不是“卷积比注意力更强”，而是“强视觉骨干的许多成功因素与是否使用注意力并不完全绑定”。ConvNeXt 因此成为后续大量 CNN 回潮工作的起点，也让“骨干网络设计”重新回到公平比较的语境中。

#### 🧪 练习题
```yaml
question: "ConvNeXt 的核心论点最准确的表述是哪一项？"
options:
  - "只要去掉所有归一化层，CNN 就会超过 Transformer"
  - "Transformer 的优势很大程度上也来自训练 recipe 和若干可迁移的结构设计，而不只是注意力机制本身"
  - "Depthwise 卷积可以完全等价替代自注意力"
  - "ConvNeXt 证明了卷积网络不需要大规模数据"
answer: 1
explain: "ConvNeXt 的方法是把 Transformer 时代被验证有效的设计逐步迁移回 CNN，说明性能差距并不只来自注意力本身。"
```
