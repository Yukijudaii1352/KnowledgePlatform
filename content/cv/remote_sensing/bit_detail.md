### BIT

```yaml
id: bit
name: BIT
full_name: "双时相图像Transformer (Bi-temporal Image Transformer)"
year: "2021"
org: "Beihang University"
paper_url: "https://ieeexplore.ieee.org/abstract/document/9491802/"
category: "change_detection"
parent: "stanet"
motivation: "Transformer在特征域建模双时相上下文"
```

#### 📝 一句话总结

BIT 把双时相遥感特征压缩为少量语义 token，在 token 空间用 Transformer 建模跨时间长程上下文，再把上下文 token 回投到像素特征中，解决密集像素自注意力计算昂贵和卷积难以捕获全局时空关系的问题。

#### 🎯 核心要点

- 使用 Siamese CNN backbone 提取两期高层特征，再插入 BIT 模块。
- Semantic Tokenizer 用学习到的空间注意力把每期 \(H\times W\) 像素特征汇聚为 \(L\) 个语义 token，满足 \(L\ll HW\)。
- Transformer Encoder 在两期 token 拼接后的紧凑序列中建模空间-时间上下文。
- Siamese Transformer Decoder 将上下文增强 token 回投到每期像素特征，细化原始特征图。
- 预测头对增强后的两期特征做差分，输出像素级变化概率。
- 论文在 LEVIR-CD、WHU-CD、DSIFN-CD 等数据集上验证精度和效率。
- 官方实现：`https://github.com/justchenhao/BIT_CD`。

#### 🔬 深入细节

![BIT 总体框架](https://ar5iv.labs.arxiv.org/html/2103.00208/assets/x2.png)
*图：BIT 将双时相 CNN 特征转换为语义 token，经 Transformer 编码后再解码回像素空间。*

##### 算法伪代码

```python
def bit_change_detection(img1, img2):
    x1, x2 = siamese_cnn(img1), siamese_cnn(img2)

    # 1. 每期特征压缩为少量语义 token
    t1 = semantic_tokenizer(x1)  # [L, C]
    t2 = semantic_tokenizer(x2)  # [L, C]

    # 2. 拼接两期 token，在紧凑时空语义空间中做 self-attention
    tokens = transformer_encoder(concat(t1, t2))
    t1_ctx, t2_ctx = split(tokens)

    # 3. token 回投到像素空间，增强每个像素的语义上下文
    x1_refined = transformer_decoder(query=x1, memory=t1_ctx)
    x2_refined = transformer_decoder(query=x2, memory=t2_ctx)

    # 4. 特征差分 + 浅层 CNN 预测变化图
    fdi = abs(x1_refined - x2_refined)
    return prediction_head(fdi)
```

##### 方法解读

高分辨率遥感变化检测难在“同类物体跨时间外观差异大、不同类别局部纹理相似”。卷积网络擅长局部纹理，但难以把远处同类建筑、水体或道路作为上下文一起考虑；直接对所有像素做 non-local/self-attention 又需要 \(O((HW)^2)\) 的计算。

BIT 的关键观察是：变化相关的高层语义概念通常可以由少量 visual words 表示。Tokenizer 对特征图 \(X^i\in\mathbb{R}^{H\times W\times C}\) 学习 \(L\) 个空间注意力图 \(A^i\)，并做加权池化：

$$
T_l^i=\sum_{p=1}^{HW}A_{l,p}^i X_p^i,\quad l=1,\ldots,L
$$

这样，Transformer 的复杂度从像素级 \(O((HW)^2)\) 降为 token 级 \(O((2L)^2)\)。两期 token 拼接后进入 encoder，自注意力可以学习“时间 1 的建筑 token 与时间 2 的建筑 token 如何对应”“哪些 token 代表真实变化而非阴影/光照”等关系。

解码阶段不是直接用 token 分类，而是让每个像素特征作为 query 去读取上下文 token。简化形式为：

$$
\hat{X}^i=\operatorname{Decoder}(Q=X^i, K=T^i, V=T^i)
$$

这一步把全局语义重新分配给像素，让最终差分仍保留空间分辨率。预测头只需要在增强后的 \(F_1,F_2\) 上做特征差分和浅层卷积。

与 STANet 一类像素/区域注意力方法相比，BIT 的优势是更轻：它不在所有位置之间建立 dense relation，而是先汇聚成 token 再反馈。它也保留了 CNN 的局部归纳偏置，因此在中小规模 CD 数据集上比纯 Transformer 更容易训练。

> 💡 关键：BIT 的“token 化再回投”是效率来源；Transformer 只负责语义概念之间的长程关系，像素级边界仍由 CNN 特征和解码头保持。

#### 🧪 练习题

```yaml
question: "BIT 为什么先把特征图压缩成语义 token 再做 Transformer？"
options:
  - "为了让输入图像分辨率变大"
  - "为了在少量 token 上高效建模双时相长程上下文"
  - "为了替代所有卷积层"
  - "为了避免使用监督标签"
answer: 1
explain: "语义 token 数量 L 远小于像素数 HW，能显著降低自注意力计算，同时保留高层变化概念。"
```
