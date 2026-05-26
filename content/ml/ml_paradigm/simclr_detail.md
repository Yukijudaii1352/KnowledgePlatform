### SimCLR

```yaml
id: simclr
name: SimCLR
full_name: Simple Contrastive Learning of Representations
year: '2020'
org: Google
paper_url: https://arxiv.org/abs/2002.05709
category: core
parent: —
motivation: 对比学习框架强调大批量训练
```

#### 📝 一句话总结

SimCLR 用“同一图像的两种随机增强视图互相接近、不同图像的视图彼此远离”这一极简对比学习目标，统一了数据增强、编码器、投影头和 NT-Xent 损失四个组件，在不使用 memory bank 或动量编码器的前提下，把视觉自监督学习推到接近监督预训练的水平。它的真正贡献不只是提出一个 loss，而是系统揭示了强增强、非线性投影头、大 batch 和长训练在对比学习中的决定性作用。

#### 🎯 核心要点

- 双视图对比框架：对同一张图像独立采样两次增强，形成正样本对，其余样本都作为负样本
- 三类关键增强：随机裁剪并缩放、随机颜色扰动、随机高斯模糊；其中裁剪 + 颜色扰动的组合最关键
- 编码器 + 投影头：用 ResNet 提取表示 \(h\)，再用一层隐藏层的 MLP 投影到 \(z\) 空间计算对比损失
- NT-Xent 损失：在归一化嵌入上做温度缩放 softmax，使正对相似度高、负对相似度低
- 大 batch 训练：不使用 memory bank，而是直接依赖大 batch 在批内提供大量负样本
- 训练后丢弃投影头：下游任务使用编码器输出的 \(h\)，而不是训练损失所在的 \(z\)
- 系统性消融：论文明确证明投影头、温度参数、增强策略、batch size 和训练轮数都会显著影响效果

#### 🔬 深入细节

##### 核心示意图

![SimCLR 框架图](https://1.bp.blogspot.com/-LpvCxgNepEI/Xo4axqZpoNI/AAAAAAAAFpE/NKjDKOQSnVEdq-gHUCDtl88LaUczNX_pACLcBGAsYHQ/s400/image2.png)
*图：Google Research 博客给出的 SimCLR 框架示意。每个样本经过两次随机增强，送入共享的编码器 \(f(\cdot)\) 和投影头 \(g(\cdot)\)，在投影空间最大化正样本对一致性。*

##### 算法伪代码

```python
# SimCLR
for minibatch in dataloader:                # {x_k}_{k=1}^N
    z_list = []
    h_list = []

    for x in minibatch:
        x_i = augment(x)                    # random crop + color distort + blur
        x_j = augment(x)

        h_i = encoder(x_i)                  # ResNet representation
        h_j = encoder(x_j)
        z_i = projector(h_i)                # MLP projection head
        z_j = projector(h_j)

        h_list.extend([h_i, h_j])
        z_list.extend([normalize(z_i), normalize(z_j)])

    loss = 0.0
    for i, j in positive_pairs(z_list):
        numerator = exp(sim(z_list[i], z_list[j]) / tau)
        denominator = sum(
            exp(sim(z_list[i], z_list[k]) / tau)
            for k in range(len(z_list)) if k != i
        )
        loss += -log(numerator / denominator)

    loss /= len(z_list)
    optimize(loss)

# downstream 只保留 encoder，丢弃 projector
```

##### 动机与背景

在 SimCLR 之前，视觉自监督学习已经有不少对比学习方法，但大多依赖 memory bank、专门的网络结构、复杂的采样策略，或者需要额外的动量编码器。SimCLR 的目标非常明确：把这类方法压缩成一个“任何人都能在标准图像分类 pipeline 里复用”的最小框架，同时搞清楚到底是什么因素真正让对比学习有效。

论文把问题拆成四个模块：数据增强、编码器、投影头、对比损失。其核心观点是，视觉自监督学习的 supervision 不来自标签，而来自“你如何构造两个应该相似的视图”。换句话说，增强策略本身就是任务定义。如果任务定义得太简单，模型就会学到捷径而不是语义表示。

##### 核心机制 1：两视图正样本与批内负样本

给定一张原图 \(x\)，SimCLR 从增强分布 \(\mathcal{T}\) 中独立采样两次变换，得到 \(\tilde{x}_i\) 和 \(\tilde{x}_j\)，把它们视为一个正样本对。一个 batch 中原本有 \(N\) 张图，因此会生成 \(2N\) 个增强样本。对任意一个 anchor \(i\)，除去与它匹配的正样本 \(j\) 外，其余 \(2N-2\) 个样本都被当作负样本。

编码器 \(f(\cdot)\) 输出表示 \(h\)，投影头 \(g(\cdot)\) 把 \(h\) 映射到对比空间中的 \(z\)。论文明确写出，投影头是一个含单个隐藏层的 MLP：

$$
z_i = g(h_i) = W^{(2)} \sigma\!\left(W^{(1)} h_i\right).
$$

这个设计看似简单，但它是 SimCLR 的关键发现之一：在 \(z\) 上做对比学习，比直接在 \(h\) 上做效果明显更好，而真正适合下游任务的表示反而往往是投影前的 \(h\)。

##### 核心机制 2：NT-Xent 对比损失

SimCLR 使用归一化温度缩放交叉熵损失（NT-Xent）。对正样本对 \((i,j)\)，单项损失为：

$$
\ell_{i,j} =
- \log
\frac{
\exp(\mathrm{sim}(z_i, z_j)/\tau)
}{
\sum_{k=1}^{2N}\mathbf{1}[k \neq i]\exp(\mathrm{sim}(z_i, z_k)/\tau)
},
$$

其中 \(\mathrm{sim}(u,v)=\frac{u^\top v}{\|u\|\|v\|}\) 是余弦相似度，\(\tau\) 是温度参数。最终损失会对 batch 中所有正样本对的两个方向同时求平均。

这个式子的本质，是把“识别与 anchor 匹配的那个视图”写成一个 \(2N-1\) 类 softmax 分类问题。温度 \(\tau\) 控制 softmax 的尖锐程度：温度太高，正负样本区分不明显；温度太低，训练会过于极端、数值不稳定。论文的系统实验表明，归一化嵌入加合适温度，对性能影响非常大。

##### 为什么增强组合这么重要

论文最有价值的结论之一，是“强增强不是锦上添花，而是任务本身”。如果只有随机裁剪而没有颜色扰动，不同 crop 之间的颜色直方图可能高度相似，模型就能靠颜色统计这一浅层线索完成匹配，而不必真正理解语义内容。随机颜色扰动和高斯模糊，恰好是用来破坏这些捷径的。

因此 SimCLR 的强大不在于发明了一个复杂结构，而在于把自监督任务定义得足够难且足够合理：模型必须在外观、颜色、局部视野都变化的情况下，仍然识别“这两张图其实来自同一个对象/场景”。这迫使它学习可迁移的语义表示，而不是低层像素模式。

> 💡 关键：SimCLR 证明了视觉对比学习里最重要的不是“多一个模块”，而是“如何构造不让模型走捷径的正样本任务”。

##### 大 batch、长训练与无 memory bank 设计

SimCLR 不使用 memory bank，而是直接把 batch 做大。论文在方法部分明确指出，batch size 可以从 256 一直扩到 8192；当 \(N=8192\) 时，每个正样本对会天然拥有 \(16382\) 个批内负样本。这让实现更简洁，也使损失定义保持端到端一致。

这种设计的代价是训练资源需求高，因此论文配套使用了 LARS 优化器和更长训练周期。实验表明，对比学习从更大的模型、更大的 batch、更长的训练里得到的收益，往往比监督学习更明显。最终，SimCLR 在 ImageNet 线性评估上达到 76.5% top-1，首次把纯自监督视觉表示拉到接近监督 ResNet-50 的水平。

#### 🧪 练习题

```yaml
question: "为什么 SimCLR 要在编码器表示 h 之后再接一个投影头 g(h) 来计算对比损失？"
options:
  - "因为投影头负责生成图像增强后的新像素"
  - "因为在投影空间 z 上做对比学习更有效，同时能让下游使用的 h 保留更多有用信息"
  - "因为投影头可以把对比学习变成生成模型"
  - "因为没有投影头就无法构造正样本对"
answer: 1
explain: "论文的关键消融发现之一就是：在 z 上优化对比损失比直接在 h 上优化更好，而下游任务常常更适合使用投影前的表示 h。"
```
