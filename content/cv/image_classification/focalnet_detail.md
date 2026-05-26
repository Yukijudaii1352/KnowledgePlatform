### FocalNet

```yaml
id: focalnet
name: FocalNet
full_name: "焦点调制网络 (Focal Modulation Networks)"
year: "2022.03"
org: "Microsoft Research"
paper_url: "https://arxiv.org/abs/2203.11926"
category: modern_efficient
parent: swin_transformer
motivation: "用焦点调制替代自注意力，实现分层上下文聚合"
```

#### 📝 一句话总结
FocalNet 用 focal modulation 机制完全替代自注意力，通过分层上下文聚合、门控选择和逐元素调制，实现了既有全局建模能力又更高效的视觉 token 交互。

#### 🎯 核心要点
- 用 focal modulation 而不是 self-attention 建模 token 之间关系。
- 先用多层深度卷积提取从局部到全局的上下文，再由门控动态聚合。
- 将聚合后的上下文作为调制器，对 query token 做逐元素调制。
- 仍然采用分层视觉骨干，便于迁移到分类、检测和分割。
- 在 ImageNet、COCO、ADE20K 上以相似成本超过多种注意力基线。

#### 🔬 深入细节

![FocalNet 模型图](https://raw.githubusercontent.com/microsoft/FocalNet/main/figures/focalnet-model.png)
*图：FocalNet 先用多尺度上下文聚合器收集不同感受野信息，再通过调制器作用到当前 token。*

```python
# Focal modulation 伪代码
def focal_modulation(x):
    q, ctx, gates = linear(x).split([d, d, L + 1], dim=-1)
    contexts = []
    for l in range(L):
        ctx = depthwise_conv(ctx, kernel_size[level_k[l]])
        contexts.append(ctx)
    global_ctx = global_avg_pool(ctx)
    agg = sum(gates[..., l:l+1] * contexts[l] for l in range(L))
    agg = agg + gates[..., -1:] * global_ctx
    modulator = conv1x1(agg)
    return q * modulator
```

FocalNet 关注的核心问题是：视觉 Transformer 的强大建模能力，是否必须依赖成对 token 的自注意力矩阵？论文给出的答案是否定的。它认为 token 交互可以分成两步：先为每个位置收集一个结构化上下文，再让当前位置用这个上下文来调制自身表示，而不必显式计算 query-key 两两匹配。

具体来说，focal modulation 有三个阶段。第一是 hierarchical contextualization：用多层不同感受野的 depthwise convolution，从短程到长程依次构造上下文。第二是 gated aggregation：模型学习一个门控向量，决定当前 token 更该依赖哪一级上下文。第三是 modulation：把聚合后的上下文变成一个调制器，对当前 query 做逐元素缩放或仿射变换。整个过程更像“先看周围环境，再调整自己”，而不是标准自注意力那种成对匹配。

这种设计的直观优势是计算路径更规整、对硬件更友好，而且无需维护显式注意力图。与 Swin 这类局部窗口注意力相比，FocalNet 通过逐层扩大的上下文聚合器自然获得大范围感受野；与 CNN 相比，它又保留了内容自适应的门控调制能力，因此不是简单回到卷积，而是提出一种新的 token mixing 机制。

论文结果表明，FocalNet 在图像分类上能和注意力模型正面竞争，并在检测和分割上继续保持优势。它的重要性在于证明了“替代自注意力”的路线不仅可行，而且可以做到统一、可扩展、跨任务迁移。

#### 🧪 练习题
```yaml
question: "FocalNet 与自注意力最本质的区别是什么？"
options:
  - "它完全不做任何上下文建模"
  - "它不通过 token 两两匹配建图，而是先聚合多尺度上下文，再用调制器作用到当前 token"
  - "它只适用于卷积网络而不适用于视觉主干"
  - "它去掉了所有非线性激活"
answer: 1
explain: "FocalNet 的关键在于上下文聚合 + 调制，而不是标准自注意力中的 query-key 成对交互。"
```
