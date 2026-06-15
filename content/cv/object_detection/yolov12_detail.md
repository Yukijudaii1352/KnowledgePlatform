### YOLOv12: Attention-Centric Real-Time Object Detectors

```yaml
id: yolov12
name: YOLOv12
full_name: "你只需要看一次v12 (You Only Look Once v12)"
year: "2025"
org: "sunsmarterjie"
paper_url: "https://github.com/sunsmarterjie/yolov12"
category: "one_stage"
parent: "yolov10"
motivation: "Area Attention与R-ELAN模块"
```

#### 📝 一句话总结

YOLOv12 提出 attention-centric YOLO，在保持实时速度的同时把注意力机制引入 YOLO 主干。它用 Area Attention 降低全局注意力复杂度，用 R-ELAN 稳定大模型优化，再结合 FlashAttention 和轻量 FFN 设计提升精度-速度平衡。

#### 🎯 核心要点

- **Attention-centric YOLO**：从以 CNN 改造为主的 YOLO 演进，转向以高效注意力为核心的实时检测器。
- **Area Attention (A2)**：把特征图按水平或垂直方向均分为若干区域，在区域内做 attention，降低复杂度并保留大感受野。
- **R-ELAN**：Residual Efficient Layer Aggregation Networks，为 ELAN 引入 block-level residual、缩放因子和重新设计的特征聚合。
- **FlashAttention**：用 I/O aware attention 减少 HBM 访问开销，解决注意力在 GPU 上的真实延迟问题。
- **YOLO 化注意力细节**：去掉位置编码，降低 MLP ratio，从 4 调到约 1.2，尽量保留卷积算子。
- **训练与部署约束**：官方仓库要求合适 GPU 支持 FlashAttention，并提供 n/s/m/l/x 与 turbo 系列权重。
- **性能定位**：论文报告 YOLOv12-N 在 T4 上以约 1.64 ms latency 达到 40.6% mAP，优于 YOLOv10-N/YOLOv11-N 的同级精度。

#### 🔬 深入细节

##### 4.1 核心示意图

![YOLOv12 Area Attention](https://arxiv.org/html/2502.12524v1/x2.png)
*图：YOLOv12 的 Area Attention 将特征图按区域划分，在保持较大感受野的同时降低注意力计算复杂度。*

##### 4.2 算法伪代码

```python
# YOLOv12 Area Attention + R-ELAN 伪代码
def area_attention(x, num_areas=4, direction="horizontal"):
    areas = split_feature_map(x, num_areas, direction)
    outs = []
    for a in areas:
        q, k, v = qkv_projection(a)
        outs.append(flash_attention(q, k, v))
    return concat_areas(outs, direction)

def r_elan_block(x):
    y = feature_aggregation_layers(x)
    y = area_attention(y)
    return x + 0.01 * re_aggregate(y)  # residual scaling for stable optimization
```

##### 4.3 方法解读

YOLOv12 的动机是：注意力机制有更强的全局建模能力，但标准 self-attention 复杂度为 \(O(L^2)\)，其中 \(L=H\cdot W\)。实时检测器不能在高分辨率特征上直接使用全局注意力，否则 latency 会失控。YOLOv12 因此设计 Area Attention，把特征图划成 \(n\) 个区域，每个区域内部做 attention。

如果每个区域大约有 \(L/n\) 个 token，总复杂度近似为：

$$
n\cdot O\left((L/n)^2\right)=O(L^2/n)
$$

相比全局注意力降低约 \(n\) 倍。论文默认区域数可取 4，并采用简单的水平或垂直均分，避免窗口移动、复杂索引或额外重排带来的工程开销。与局部窗口注意力相比，条带状区域仍能覆盖较长空间范围，对目标整体形状更友好。

R-ELAN 解决的是注意力引入后的优化问题。ELAN/GELAN 类结构擅长特征聚合，但大模型叠加注意力后更容易出现训练不稳定。YOLOv12 在 block 级加入 residual shortcut 和缩放因子，例如：

$$
\mathbf{Y}=\mathbf{X}+\gamma F(\mathbf{X}),\qquad \gamma=0.01
$$

小初始残差让新模块在训练早期不会破坏已有特征流，随后逐步学习有效增量。R-ELAN 还重新设计聚合方式，减少纯 ELAN 在注意力块中带来的冗余。

模型工程上，YOLOv12 不是把 ViT 原封不动塞进 YOLO。它去掉位置编码，降低 MLP ratio，减少堆叠深度，并尽可能使用卷积操作处理局部混合；注意力计算则使用 FlashAttention 降低显存读写开销。这样才能让 attention-centric 架构接近 CNN YOLO 的速度。

> 💡 关键：YOLOv12 的创新不是“用了注意力”本身，而是把注意力裁剪成适合 YOLO 延迟预算的 Area Attention，并用 R-ELAN 解决训练和聚合稳定性。

##### 4.4 与 YOLOv10 的区别

YOLOv10 的重点是 NMS-free label assignment 和效率-精度导向的 CNN/PSA 架构设计；YOLOv12 的重点是把注意力提升为主干核心能力。YOLOv12 不以完全端到端 NMS-free 作为主要叙事，而是更关注注意力模块在实时检测中的可用性。它适合需要更强全局感知的场景，但对 FlashAttention/GPU 支持更敏感。

#### 🧪 练习题

```yaml
question: "YOLOv12 的 Area Attention 为什么比全局 self-attention 更适合实时检测？"
options:
  - "它完全取消了 QKV 投影"
  - "它把特征图划分为区域，在区域内做注意力，使复杂度约从 O(L^2) 降到 O(L^2/n)"
  - "它只在 CPU 上运行，不使用 GPU"
  - "它把目标检测改成文本生成任务"
answer: 1
explain: "Area Attention 将 L 个 token 分成 n 个区域，每个区域内计算 attention，总复杂度约为 n*(L/n)^2，从而降低实时推理成本。"
```
