### TimeSformer — 时空Transformer

```yaml
id: timesformer
name: TimeSformer
full_name: "时空Transformer (TimeSformer)"
year: 2021
org: "Facebook"
paper_url: "https://arxiv.org/abs/2102.05095"
category: "transformer"
parent: "non_local"
motivation: "分层时空自注意力机制"
```

#### 📝 一句话总结

TimeSformer 将 ViT 扩展到视频理解，系统比较多种时空注意力分解方式，并证明先时间后空间的 Divided Space-Time Attention 能以较低计算量实现强视频时序建模。

#### 🎯 核心要点

- 纯 Transformer 视频模型：不使用 3D 卷积，直接对视频 patch token 建模
- 五种注意力方案：Space-only、Joint Space-Time、Divided、Sparse Local-Global、Axial
- Divided Space-Time 最优：先同一空间位置跨帧注意力，再同一帧内空间注意力
- 降低复杂度：将全局时空注意力的 \(O((NF)^2)\) 分解为 \(O(NF^2 + FN^2)\)
- 支持长视频：相比 3D CNN 更容易处理更多帧和长程依赖
- 依赖图像预训练：通常从 ImageNet 预训练 ViT 初始化，再迁移到视频任务

#### 🔬 深入细节

![TimeSformer 时空注意力方案](https://ar5iv.labs.arxiv.org/html/2102.05095/assets/x1.png)
*图：TimeSformer 比较的五类时空注意力，其中 Divided Space-Time 在效率和精度上表现最好。*

##### 1. 动机与背景

在 TimeSformer 之前，视频理解主流是 3D CNN 或 2D CNN + temporal module。卷积有强局部归纳偏置，但长程关系需要堆叠很多层才能覆盖；当视频帧数增加时，3D 卷积的计算和训练成本也迅速上升。

ViT 已经证明图像可以被表示为 patch token 序列并交给 Transformer 处理。TimeSformer 的关键问题是：视频有时间和空间两个维度，如果直接把所有帧的所有 patch 拼成一个长序列做全局 attention，计算和显存会过高；如果只做空间 attention，又会丢失时序信息。

##### 2. 输入表示

给定 \(F\) 帧视频，每帧大小为 \(H \times W\)，用 patch size \(P\) 划分后每帧有 \(N=HW/P^2\) 个 patch。每个 patch 经线性投影得到 token，并加入时空位置编码：

$$
z^{(0)}_{p,t} = E x_{p,t} + e^{pos}_{p,t}
$$

模型还加入分类 token。经过多层 Transformer block 后，分类 token 用于动作分类。这个表示与 ViT 非常接近，差异在于 token 多了时间索引 \(t\)。

##### 3. Divided Space-Time Attention

TimeSformer 的核心 block 将注意力拆成两步。第一步是时间注意力：对每个空间位置 \(p\)，只在不同帧的同一位置之间交互：

$$
a^{time}_{p,t} = \sum_{t'=1}^{F}
\text{Softmax}\left(\frac{q_{p,t}k_{p,t'}^\top}{\sqrt{d}}\right)v_{p,t'}
$$

第二步是空间注意力：对每一帧 \(t\)，在该帧所有空间 patch 之间交互：

$$
a^{space}_{p,t} = \sum_{p'=1}^{N}
\text{Softmax}\left(\frac{q_{p,t}k_{p',t}^\top}{\sqrt{d}}\right)v_{p',t}
$$

```python
# TimeSformer Divided Space-Time Attention 伪代码
def timesformer_block(x):
    # x: [B, F, N, D]
    for p in range(N):
        x[:, :, p] = x[:, :, p] + temporal_attention(norm(x[:, :, p]))

    for t in range(F):
        x[:, t, :] = x[:, t, :] + spatial_attention(norm(x[:, t, :]))

    x = x + mlp(norm(x))
    return x
```

这种分解让每个 token 不必一次性关注 \(NF\) 个 token，而是先关注 \(F\) 个时间邻居，再关注 \(N\) 个空间邻居。它保留了跨帧建模和帧内空间理解，同时避免全局 joint attention 的二次爆炸。

##### 4. 为什么先时间后空间有效

视频动作往往表现为同一局部区域随时间变化，例如手的位置、物体移动、姿态变化。先做时间注意力，相当于为每个空间位置提取运动线索；随后空间注意力再把这些局部时序线索组合成整帧语义。

TimeSformer 还显示，数据集对时间建模的需求不同：Kinetics 中很多类别可由场景和对象识别完成，Space-only 已有不错结果；Something-Something V2 更依赖动作方向和物体交互，Divided 注意力的优势更明显。

##### 5. 与传统方法的区别

与 3D CNN 相比，TimeSformer 没有固定卷积核大小限制，每层 attention 可以建立更长距离依赖；与全局时空 Transformer 相比，它通过结构化分解降低计算；与后续 Video Swin 相比，它仍偏全局空间注意力，而 Video Swin 引入局部窗口和层级结构进一步提升效率。

> 💡 关键：TimeSformer 的贡献不只是“把 ViT 用到视频”，而是系统证明时空注意力的分解方式决定了视频 Transformer 的可训练性和效率。

#### 🧪 练习题

```yaml
question: "TimeSformer 中 Divided Space-Time Attention 的核心设计是什么？"
options:
  - "只做空间注意力，完全忽略时间维度"
  - "先在同一空间位置跨帧做时间注意力，再在同一帧内做空间注意力"
  - "把视频先压缩成单张图片再分类"
  - "用 NMS 删除重复视频片段"
answer: 1
explain: "Divided 方案把时空注意力拆成时间和空间两步，在保留时序建模的同时降低全局 joint attention 的计算量。"
```
