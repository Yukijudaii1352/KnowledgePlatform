### Swin Transformer

```yaml
id: swin
name: Swin Transformer
full_name: "移动窗口层级Transformer (Swin Transformer)"
year: "2021.03"
org: "Microsoft Research Asia"
paper_url: "https://arxiv.org/abs/2103.14030"
category: foundation
parent: vit
motivation: "层级特征+线性复杂度"
```

#### 📝 一句话总结
Swin Transformer 用局部窗口注意力和跨层移位窗口机制，把 Transformer 从单尺度全局建模改造成可线性扩展、可输出层级特征的通用视觉骨干，直接打通了检测和分割等密集预测任务。

#### 🎯 核心要点
- 用 window-based self-attention 把全局 \(O((HW)^2)\) 复杂度降为对图像尺寸线性增长。
- 相邻层交替使用 W-MSA 和 shifted W-MSA，实现跨窗口信息交换。
- 通过 patch merging 构建 4-stage 层级特征金字塔，形式上更接近 CNN/FPN。
- 使用相对位置偏置而非绝对位置编码，便于迁移到不同窗口尺寸和下游任务。
- 在分类、检测、实例分割和语义分割上都显著优于同时代 ViT/ResNet 骨干。

#### 🔬 深入细节

![Swin Transformer 架构图](https://ar5iv.labs.arxiv.org/html/2103.14030/assets/x1.png)
*图：Swin 采用分阶段层级结构，每个阶段内部交替堆叠常规窗口注意力和移位窗口注意力，并在阶段间做 patch merging。*

```python
# Swin Block 伪代码
def swin_block(x, shift=False, window_size=7):
    shortcut = x
    x = layer_norm(x)
    if shift:
        x = torch.roll(x, shifts=(-window_size // 2, -window_size // 2), dims=(1, 2))
    windows = partition_windows(x, window_size)
    windows = window_attention(windows, relative_position_bias=True, use_mask=shift)
    x = reverse_windows(windows, window_size)
    if shift:
        x = torch.roll(x, shifts=(window_size // 2, window_size // 2), dims=(1, 2))
    x = shortcut + x
    x = x + mlp(layer_norm(x))
    return x
```

ViT 的两个短板很明显：第一，全局自注意力在高分辨率下计算量过高；第二，输出始终是单尺度 token 序列，不适合检测和分割等需要多尺度特征的任务。Swin 的贡献就是把这两个问题一起处理掉，而且尽量不牺牲 Transformer 的建模能力。

它的第一步是把注意力限制在固定大小窗口内。若特征图大小为 \(h \times w\)，窗口边长为 \(M\)，则全局注意力复杂度近似为

$$
\Omega(\text{MSA}) = 4hwC^2 + 2(hw)^2C
$$

而窗口注意力变成

$$
\Omega(\text{W-MSA}) = 4hwC^2 + 2M^2hwC
$$

当 \(M\) 固定时，复杂度对图像尺寸 \(hw\) 线性增长。问题在于：如果永远只在独立窗口内部做注意力，不同窗口之间的信息就断开了。Swin 的解法是下一层把窗口平移半个窗口宽度，让原来分属不同窗口的 token 在新分组中相遇，这就是 shifted window 的核心。

实现上，直接平移会导致边界出现尺寸不整齐的小窗口。论文因此使用 cyclic shift 加 attention mask：先对特征图做循环平移，再按原窗口数划分，最后用掩码阻断不该相互通信的位置。这样既保留了跨窗口连接，又不增加窗口数量，工程上非常高效。

Swin 的第二个关键设计是 patch merging。每过一个阶段，把相邻 \(2\times2\) patch 拼接并线性映射，空间分辨率减半、通道数增加，于是模型天然得到类似 CNN 的多尺度层级表示。这也是它能无缝接到 FPN、Mask R-CNN、UPerNet 等下游框架上的根本原因。某种意义上，Swin 不是“把 CNN 替掉”，而是把 Transformer 改造成了更像 CNN 的视觉骨干。

#### 🧪 练习题
```yaml
question: "Swin Transformer 中 shifted window 的主要作用是什么？"
options:
  - "让每层都恢复成全局自注意力"
  - "在保持窗口注意力线性复杂度的同时，实现跨窗口的信息交互"
  - "替代 patch embedding 做下采样"
  - "去掉位置编码的需求"
answer: 1
explain: "如果只做独立窗口注意力，不同窗口之间不会通信；shifted window 通过跨层平移窗口，让边界 token 在下一层建立连接。"
```
