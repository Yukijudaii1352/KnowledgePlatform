### SigLIP — Sigmoid损失语言图像预训练 (SigLIP)

```yaml
id: siglip
name: SigLIP
full_name: Sigmoid损失语言图像预训练 (SigLIP)
year: '2023'
org: Google
paper_url: http://openaccess.thecvf.com/content/ICCV2023/html/Zhai_Sigmoid_Loss_for_Language_Image_Pre-Training_ICCV_2023_paper.html
category: dual_encoder
parent: clip
motivation: Sigmoid损失提升内存效率
```

#### 📝 一句话总结

SigLIP 用逐对 sigmoid 二分类损失替代 CLIP/ALIGN 的 softmax 对比损失，解决大 batch 训练中全局归一化带来的内存和通信压力。它保留双塔图文嵌入范式，但让每个图文 pair 的损失可独立计算。

#### 🎯 核心要点

- 提出 pairwise sigmoid loss：对 batch 内每个图文组合独立判断匹配或不匹配
- 移除 softmax 分母的全局归一化，不需要同时持有完整全局相似度矩阵
- 引入可学习温度 \(t\) 和偏置 \(b\)，其中偏置用于处理正负样本极度不均衡
- 支持 chunked / ring-style 分布式实现，降低大 batch 训练的峰值内存
- 在小 batch 下通常优于 softmax 基线，并发现 32k 左右 batch 已接近收益饱和
- 保持 CLIP 式双编码器推理能力，可直接用于零样本分类和图文检索

#### 🔬 深入细节

![SigLIP sigmoid loss 伪代码](https://raw.githubusercontent.com/ahmdtaha/distributed_sigmoid_loss/main/imgs/sigmoid_loss_pseudo_implementation.png)
*图：SigLIP 论文 Algorithm 1 的 sigmoid loss 伪代码公开转存图。核心是构造对角线为正、非对角为负的标签矩阵，对所有 pair 做 log-sigmoid。*

```python
# SigLIP 损失伪代码
img = l2_normalize(image_encoder(images))
txt = l2_normalize(text_encoder(texts))

logits = img @ txt.T * exp(t_prime) + bias
labels = 2 * eye(batch_size) - ones(batch_size, batch_size)  # +1 对角, -1 非对角
loss = -log_sigmoid(labels * logits).sum() / batch_size
loss.backward()
```

CLIP 的 softmax 对比损失把每张图像看作一个 \(N\) 类分类问题：在 batch 中选出正确文本。这个设计效果很好，但分母需要同一行或同一列所有相似度，分布式训练时就要跨设备聚合大量嵌入和相似度。batch 越大，通信与内存压力越明显。

SigLIP 改成二分类视角：给定任意图文 pair \((i,j)\)，只判断它是否匹配。令归一化图像向量为 \(x_i\)，文本向量为 \(y_j\)，标签为：

$$
z_{ij}=\begin{cases}
1,& i=j\\
-1,& i\neq j
\end{cases}
$$

损失为：

$$
\mathcal{L}=-\frac{1}{n}\sum_{i=1}^{n}\sum_{j=1}^{n}\log\sigma\left(z_{ij}(t\cdot x_i^\top y_j+b)\right)
$$

其中 \(t\) 是可学习温度，\(b\) 是可学习偏置。偏置很重要，因为一个 batch 中只有 \(n\) 个正 pair，却有 \(n^2-n\) 个负 pair；若没有偏置，初始化时 sigmoid 容易给大量负样本过高概率。论文常用负偏置初始化，使模型先验更接近“绝大多数 pair 不匹配”。

> 💡 关键：softmax 损失的一个正样本概率依赖整行/整列负样本；SigLIP 的每个 pair 损失只依赖自己的 logit，因此可以分块计算和累加。

分布式实现中，SigLIP 可以让每个设备只物化一块图文相似度矩阵，计算完局部负样本损失后再交换文本块继续累加。这样不必在单设备上保留完整 \(B\times B\) 全局矩阵。实验上，sigmoid 在较小 batch 下优势明显；当 batch 增大到 32k 以上时，收益逐渐饱和，这为资源有限的图文预训练提供了更实际的训练配方。

#### 🧪 练习题

```yaml
question: "SigLIP 相比 CLIP softmax 损失最关键的工程优势是什么？"
options:
  - "完全不需要负样本"
  - "每个图文 pair 的损失可独立计算，减少全局归一化带来的内存和通信压力"
  - "必须使用目标检测器生成对象标签"
  - "只能用于图像分类，不能用于检索"
answer: 1
explain: "Sigmoid 损失把图文匹配变成逐对二分类，不需要 softmax 分母依赖整行或整列相似度，因此更容易分块和分布式计算。"
```
