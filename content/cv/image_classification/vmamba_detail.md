### VMamba

```yaml
id: vmamba
name: VMamba
full_name: "视觉状态空间模型 (VMamba: Visual State Space Model)"
year: "2024.01"
org: "中国科学院大学 / 华为 / 鹏城实验室"
paper_url: "https://arxiv.org/abs/2401.10166"
category: modern_efficient
parent: swin_transformer
motivation: "以2D选择性扫描实现线性复杂度全局建模"
```

#### 📝 一句话总结
VMamba 把 Mamba 状态空间模型扩展到二维视觉场景，通过 2D Selective Scan 在保持线性复杂度的同时获得全局感受野，成为视觉状态空间模型路线中的代表工作。

#### 🎯 核心要点
- 提出 Visual State-Space (VSS) block，把 Mamba 从 1D 序列推广到 2D 图像。
- 核心模块 SS2D 用四条扫描路径在二维特征图上执行选择性扫描。
- 保持全局感受野和输入缩放效率，对高分辨率输入更友好。
- 采用分层主干结构，可直接迁移到分类、检测和分割任务。
- 在 ImageNet 分类和下游视觉任务上显示出优于多种 CNN/ViT 基线的效率表现。

#### 🔬 深入细节

![VMamba 整体架构图](https://raw.githubusercontent.com/MzeroMiko/VMamba/main/assets/architecture.png)
*图：VMamba 用分层 VSS block 堆叠成视觉主干，并在每个 block 内通过 SS2D 完成二维全局信息聚合。*

```python
# VMamba 的 SS2D 思路
def ss2d(x):
    routes = [
        scan_left_to_right(x),
        scan_right_to_left(x),
        scan_top_to_bottom(x),
        scan_bottom_to_top(x),
    ]
    outputs = [selective_scan(route) for route in routes]
    return merge_routes(outputs)

def vss_block(x):
    x = x + ss2d(layer_norm(x))
    x = x + mlp(layer_norm(x))
    return x
```

视觉版 Mamba 最大的问题，是原始 Mamba 面向一维序列，而图像本质上是二维结构。若简单把图像拉平成一条长序列，再直接用 1D selective scan，空间邻接关系会被严重扭曲。VMamba 的关键贡献，就是用 SS2D 解决这个结构错位问题。

SS2D 的基本思路是从多个方向遍历二维特征图。论文采用四条扫描路线，让状态传播不只依赖单一序列顺序，而是分别从水平和垂直两个维度的正反方向收集上下文。这样每个位置都能通过多路扫描接收到更完整的全局信息。相比自注意力，扫描式计算不需要显式构造 token 两两交互矩阵，因此复杂度更接近线性。

从机制上看，VMamba 保留了 Mamba 的“输入依赖参数”思想，也就是根据当前内容动态控制状态更新与信息选择。它既不是纯卷积，也不是注意力，而是一类具有全局传播能力的状态空间主干。论文特别强调其输入分辨率扩展效率，因为随着图像变大，注意力成本会快速膨胀，而 SS2D 的计算增长更可控。

VMamba 之所以重要，不只是因为它做到了“视觉版 Mamba”，而是因为它提出了一套比较完整的二维状态空间建模范式。后续很多视觉 SSM 工作，包括更强的混合主干和 deformable/state-space 变种，基本都在沿着这条路线继续推进。

#### 🧪 练习题
```yaml
question: "VMamba 中 SS2D 的主要作用是什么？"
options:
  - "把所有 token 送入标准全局自注意力"
  - "通过多方向二维选择性扫描，把一维 Mamba 扩展到图像结构并获取全局上下文"
  - "仅用于做数据增强"
  - "替代分类头输出 logits"
answer: 1
explain: "SS2D 通过在二维特征图上进行多方向扫描，弥补了原始 Mamba 只适用于一维序列的限制。"
```
