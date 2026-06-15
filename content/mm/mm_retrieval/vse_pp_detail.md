### VSE++ — 视觉语义嵌入改进版 (VSE++)

```yaml
id: vse_pp
name: VSE++
full_name: 视觉语义嵌入改进版 (VSE++)
year: '2018'
org: U Toronto
paper_url: https://arxiv.org/abs/1707.05612
category: foundation
parent: —
motivation: 困难负样本挖掘增强区分能力
```

#### 📝 一句话总结

VSE++ 将传统视觉语义嵌入的“所有负样本 hinge 求和”改为只优化 mini-batch 中最难的图像和文本负样本，解决了普通排序损失被大量容易负样本稀释的问题。它用极小的目标函数改动显著增强图文检索的判别边界。

#### 🎯 核心要点

- 提出 Max-of-Hinges 损失：每个正样本对只取当前 batch 内得分最高、最容易混淆的负图像和负文本
- 保留 VSE 双塔框架：图像编码器和句子编码器分别映射到同一嵌入空间，用余弦相似度排序
- 对比 Sum-of-Hinges：证明传统损失会让大量低风险负样本主导梯度，而不是集中修正近邻错误
- 支持更强视觉端：使用 ResNet-152 并微调图像编码器，进一步放大困难负样本训练的收益
- 使用数据增强和 mini-batch 内负样本挖掘，在 MS-COCO 与 Flickr30K 图文检索上明显提升 R@1

#### 🔬 深入细节

![VSE++ MH 损失行为分析](https://ar5iv.labs.arxiv.org/html/1707.05612/assets/images/sum_vs_max_f30k.png)
*图：论文 Figure 2 展示 Sum-of-Hinges 与 Max-of-Hinges 在 Flickr30K 训练中的行为差异。VSE++ 关注最高代价负样本，因此更直接优化检索排序前列的错误。*

```python
# VSE++ 训练伪代码
for images, captions in dataloader:
    img = l2_normalize(image_encoder(images))
    txt = l2_normalize(text_encoder(captions))
    scores = img @ txt.T

    pos = diag(scores)
    caption_cost = margin + scores - pos[:, None]   # image -> wrong captions
    image_cost = margin + scores - pos[None, :]     # caption -> wrong images

    caption_cost.fill_diagonal_(0)
    image_cost.fill_diagonal_(0)

    loss = relu(caption_cost).max(dim=1).values.mean()
    loss += relu(image_cost).max(dim=0).values.mean()
    loss.backward()
    optimizer.step()
```

VSE++ 的背景是图文检索中的联合嵌入学习：给定图像 \(i\) 和描述 \(c\)，模型学习两个编码器 \(f(i)\)、\(g(c)\)，并用相似度 \(s(i,c)=f(i)^\top g(c)\) 排序。检索指标 R@K 只关心正确结果是否排在前几名，因此真正危险的是那些得分接近甚至超过正样本的负例，而不是已经远离决策边界的普通负例。

传统 VSE 使用 Sum-of-Hinges 损失：

$$
\mathcal{L}_{SH}(i,c)=\sum_{c'\neq c}[\alpha+s(i,c')-s(i,c)]_+ + \sum_{i'\neq i}[\alpha+s(i',c)-s(i,c)]_+
$$

这里 \([x]_+=\max(x,0)\)，\(\alpha\) 是 margin。问题在于，求和会把许多“稍微违反 margin”的负例累加起来，使梯度不一定集中在最影响 R@1/R@5 的近邻错误上。VSE++ 改成 Max-of-Hinges：

$$
\mathcal{L}_{MH}(i,c)=\max_{c'\neq c}[\alpha+s(i,c')-s(i,c)]_+ + \max_{i'\neq i}[\alpha+s(i',c)-s(i,c)]_+
$$

这个公式的直觉很直接：对一张图，只惩罚当前最像它但不匹配的 caption；对一句话，只惩罚当前最像它但不匹配的 image。这样每个更新步骤都把正样本推离最近的错误邻居，优化目标和检索排序的失败模式更一致。

> 💡 关键：VSE++ 不是换架构，而是换训练信号。它把“全局平均变好”改成“最危险的局部排序错误必须先被修正”。

训练时的困难负样本通常只在 mini-batch 内搜索，因此 batch 越大，越可能采到真正困难的负例。论文还展示了微调图像编码器、使用更强 ResNet 特征和数据增强会进一步提升效果，因为更强的视觉表示让 hard negative 的差异更可学习。与后来的 SCAN、CLIP 相比，VSE++ 仍属于全局向量匹配范式，但它把“负样本质量”这件事推到了图文检索训练的中心。

#### 🧪 练习题

```yaml
question: "VSE++ 将 Sum-of-Hinges 改为 Max-of-Hinges 的主要目的是什么？"
options:
  - "减少图像编码器参数量"
  - "让训练集中优化 batch 内最容易混淆的负图像和负文本"
  - "把双塔模型改成跨注意力模型"
  - "避免使用余弦相似度"
answer: 1
explain: "Max-of-Hinges 只保留得分最高的错误负样本项，使梯度集中在最影响检索排序前列的混淆样本上。"
```
