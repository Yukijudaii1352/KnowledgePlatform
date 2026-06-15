### FC-Siam

```yaml
id: fc_siam
name: FC-Siam
full_name: "全卷积孪生网络 (Fully Convolutional Siamese Networks)"
year: "2018"
org: "ONERA"
paper_url: "https://arxiv.org/abs/1810.08462"
category: "change_detection"
parent: "—"
motivation: "全卷积孪生网络奠定深度变化检测基础"
```

#### 📝 一句话总结

FC-Siam 将 U-Net 式全卷积编码器-解码器扩展为双时相共享权重的孪生结构，用跳连拼接或差分显式比较配准影像，解决早期 patch/superpixel 变化检测速度慢、端到端像素预测能力弱的问题。

#### 🎯 核心要点

- 提出三种端到端 FCNN：FC-EF、FC-Siam-conc、FC-Siam-diff。
- FC-EF 在输入层拼接两期影像；FC-Siam 在编码器阶段共享权重，保持两期特征可比。
- FC-Siam-conc 在解码跳连中拼接两期同层特征，保留完整上下文。
- FC-Siam-diff 在跳连中拼接两期特征绝对差，直接强化变化线索。
- 使用 OSCD 和 Air Change 数据集，同时测试 RGB 与多光谱输入。
- 相比 patch-based 前作，推理速度提升到每对影像 0.1 秒量级，论文报告至少快 500 倍。
- 它奠定了后续 ChangeStar、BIT、ChangeFormer 等双流变化检测网络的基础范式。

#### 🔬 深入细节

![FC-Siam-diff 架构示意](https://ar5iv.labs.arxiv.org/html/1810.08462/assets/montpellier-diff2.png)
*图：FC-Siam-diff 的孪生编码器共享权重，解码跳连使用同层特征的绝对差。*

##### 算法伪代码

```python
def fc_siam_diff(x_t1, x_t2):
    skips_1, skips_2 = [], []
    h1, h2 = x_t1, x_t2

    # Siamese encoder: 两期影像共用同一组卷积参数
    for enc in encoder_blocks:
        h1 = enc(h1)
        h2 = enc(h2)
        skips_1.append(h1)
        skips_2.append(h2)
        h1, h2 = maxpool(h1), maxpool(h2)

    z = merge_bottleneck(h1, h2)

    # Decoder: 用同尺度差分跳连补回空间细节
    for dec, s1, s2 in reversed(zip(decoder_blocks, skips_1, skips_2)):
        z = upsample(z)
        z = concat(z, abs(s1 - s2))
        z = dec(z)

    logits = conv1x1(z, out_channels=2)
    return softmax(logits)
```

##### 方法解读

早期遥感变化检测常把任务拆成 patch 分类、后处理和阈值化，缺点是慢、边界粗、上下文有限。FCN 的出现说明卷积网络可以直接输出像素级预测；FC-Siam 的贡献是把这个思想转成双时相比较问题：输入不再是一张图，而是同一区域的 \(I_1,I_2\)。

FC-EF 是最直接的 baseline：把 \(I_1\) 和 \(I_2\) 在通道维拼接，让网络自己学习比较关系。它实现简单，但两期影像一进入网络就混合，缺少“同一个卷积滤波器看两期影像”的显式对称性。

FC-Siam 的编码器共享权重，保证两期特征在同一特征空间中可比较。第 \(l\) 层特征可写为：

$$
F_1^l=E_l(I_1),\quad F_2^l=E_l(I_2)
$$

其中 \(E_l\) 是共享参数编码器。FC-Siam-conc 使用 \([F_1^l,F_2^l]\) 作为跳连，让解码器自行判断差异；FC-Siam-diff 使用 \(|F_1^l-F_2^l|\)，把变化检测的归纳偏置直接放入结构。

全卷积解码器逐级上采样，使输出与输入空间对齐。训练目标通常是逐像素交叉熵：

$$
\mathcal{L}_{ce}=-\sum_{p}\sum_{c\in\{0,1\}}y_{p,c}\log \hat{y}_{p,c}
$$

和传统方法相比，FC-Siam 的关键差别不在某个复杂注意力，而在三个工程上极有效的选择：整图推理、共享编码器、跳连融合。这让网络既能处理大图，又能在浅层保留边缘和细小变化。

> 💡 关键：FC-Siam-diff 的绝对差跳连是“变化检测先验”的早期经典形式，它让网络少花容量去重新发现“比较两期特征”这件事。

#### 🧪 练习题

```yaml
question: "FC-Siam-diff 与 FC-Siam-conc 的核心区别是什么？"
options:
  - "FC-Siam-diff 不共享编码器权重"
  - "FC-Siam-diff 在跳连中使用两期特征的绝对差"
  - "FC-Siam-diff 只支持 RGB 图像"
  - "FC-Siam-diff 使用 Transformer 编码器"
answer: 1
explain: "两者都使用孪生共享编码器；区别在于 conc 拼接两期特征，而 diff 拼接同层特征的绝对差。"
```
