### Video Swin — 视频Swin Transformer

```yaml
id: video_swin
name: Video Swin
full_name: "视频Swin Transformer (Video Swin Transformer)"
year: 2022
org: "MSRA"
paper_url: "https://arxiv.org/abs/2106.13230"
category: "transformer"
parent: "vivit"
motivation: "3D偏移窗口注意力"
```

#### 📝 一句话总结

Video Swin Transformer 将 Swin 的层级窗口注意力扩展到视频，用 3D window / shifted window 在局部时空块内高效建模，并通过跨窗口移位逐层扩大感受野。

#### 🎯 核心要点

- 3D Window MSA：在 \(P \times M \times M\) 时空窗口内计算注意力，复杂度近似线性于 token 数
- 3D Shifted Window：相邻层窗口沿时间、高度、宽度移位，建立跨窗口信息流
- 层级结构：继承 Swin 的 patch merging，逐 stage 降低空间分辨率并增加通道
- 3D 相对位置偏置：把 2D Swin 的相对位置偏置扩展到时间维度
- 复用图像预训练：可从 ImageNet 预训练 Swin 初始化，降低视频训练成本
- 多任务适用：在动作分类、时序相关数据集和视频检测/分割下作为通用 backbone

#### 🔬 深入细节

![Video Swin 总体结构](https://ar5iv.labs.arxiv.org/html/2106.13230/assets/x1.png)
*图：Video Swin 使用 3D patch partition、四阶段层级 backbone 和交替窗口注意力。*

##### 1. 动机与背景

TimeSformer、ViViT 等早期视频 Transformer 证明了 attention 适合视频，但全局或分解 attention 在高分辨率、多帧输入下仍然昂贵。视频还有强局部性：相邻帧、相邻空间区域通常相关，没必要在每一层都让所有 token 全局交互。

Swin Transformer 在图像中用局部窗口注意力和 shifted window 取得了很好的效率-精度平衡。Video Swin 的工作就是把这种归纳偏置扩展到视频：窗口不再是 2D 的 \(M \times M\)，而是 3D 的 \(P \times M \times M\)。

##### 2. 3D 窗口注意力

给定视频 token 特征 \(x \in \mathbb{R}^{T \times H \times W \times C}\)，模型将其划分为多个不重叠 3D 窗口。每个窗口内部执行多头自注意力：

$$
\text{Attention}(Q,K,V)=\text{Softmax}\left(\frac{QK^\top}{\sqrt{d}} + B\right)V
$$

其中 \(B\) 是 3D 相对位置偏置，覆盖时间和空间相对偏移。若窗口大小为 \(P \times M \times M\)，全局 3D attention 的二次项从 \((THW)^2\) 变为每个 token 只与 \(PM^2\) 个局部 token 交互：

$$
\Omega(\text{3D-W-MSA}) = 4THWC^2 + 2PM^2 \cdot THW \cdot C
$$

##### 3. 3D Shifted Window

![3D shifted window 机制](https://ar5iv.labs.arxiv.org/html/2106.13230/assets/figs/3d-shift-window.png)
*图：连续 block 交替使用常规 3D 窗口和移位 3D 窗口，实现跨窗口通信。*

单纯窗口注意力会让不同窗口之间没有直接通信。Video Swin 在相邻 block 中把窗口沿时间、高度、宽度移动 \((P/2, M/2, M/2)\)，使前一层分属不同窗口的 token 在后一层进入同一个窗口。

```python
# Video Swin block 伪代码
def video_swin_stage(tokens):
    for i, block in enumerate(blocks):
        if i % 2 == 0:
            windows = partition_3d(tokens, size=(P, M, M))
            out = window_attention(windows, rel_pos_bias_3d)
            tokens = merge_3d(out)
        else:
            shifted = cyclic_shift(tokens, shift=(P//2, M//2, M//2))
            windows = partition_3d(shifted, size=(P, M, M))
            out = window_attention(windows, rel_pos_bias_3d, attn_mask)
            tokens = reverse_shift(merge_3d(out))
        tokens = tokens + mlp(norm(tokens))
    return tokens
```

循环移位会在边界产生跨越原图边界的窗口片段，因此实现中需要 attention mask，确保不该互相看到的 token 不被错误连接。这与 2D Swin 的高效批处理策略一致。

##### 4. 层级视频 backbone

Video Swin 先用 3D patch partition 把输入划成 tubelet，再经过四个 stage。除最后 stage 外，每个 stage 后通过 patch merging 进行空间下采样，通道数提升。时间维度通常保持较高分辨率，以保留动作信息。

3D 相对位置偏置可由图像 Swin 的 2D 偏置初始化：时间相对位移为 0 的切片复制 2D 偏置，其他时间位置初始化或插值学习。这样模型一开始接近逐帧图像 Swin，再通过视频微调学习时序交互。

##### 5. 与 TimeSformer / ViViT 的区别

TimeSformer 通过分解时间和空间注意力降复杂度，但空间 attention 仍偏全局；ViViT 使用多种时空 factorization，但常需要较高预训练成本。Video Swin 通过局部 3D 窗口把计算限制在相邻时空块内，再靠 shifted window 逐层传播信息，更像一个层级视觉 backbone。

> 💡 关键：Video Swin 的效率来自“局部窗口”，表达力来自“移位窗口 + 层级堆叠”；它不是忽略全局，而是逐层构造更大感受野。

#### 🧪 练习题

```yaml
question: "Video Swin 中 3D Shifted Window 的主要作用是什么？"
options:
  - "在相邻窗口之间建立信息交互，扩大时空感受野"
  - "删除时间维度，只做图像分类"
  - "把所有窗口合并成全局注意力以增加计算量"
  - "替代相对位置偏置"
answer: 0
explain: "常规窗口注意力只在窗口内通信，shifted window 让不同窗口的 token 在下一层进入同一窗口，从而实现跨窗口信息流。"
```
