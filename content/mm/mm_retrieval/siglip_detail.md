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

SigLIP 提出用逐对 sigmoid 二分类损失替代 CLIP/ALIGN 的 batch-level softmax 对比损失，解决大 batch 图文预训练中全局归一化带来的内存与通信压力。它保留双塔检索能力，同时让每个图文 pair 的损失项可独立计算，更适合资源受限或分块分布式训练。

#### 🎯 核心要点

- 损失函数：把图文对齐从 \(N\) 类 softmax 分类改成 \(N^2\) 个 pairwise 二分类项，对角线为正样本，非对角线为负样本
- 可学习参数：保留温度 \(t=\exp(t')\)，新增偏置 \(b\) 处理正负 pair 极度不均衡，论文使用负偏置初始化让训练先验接近“多数 pair 不匹配”
- 计算优势：sigmoid loss 不需要对整行/整列相似度做全局 softmax 归一化，单个 pair 的损失只依赖自己的 logit
- 分布式实现：支持 chunked/ring-style 交换文本或图像块，局部累加损失，避免每个设备完整物化 \(|B|\times|B|\) 全局相似度矩阵
- 经验结论：在小于 16k 的 batch 下 sigmoid 明显优于 softmax，32k 左右 batch 已接近收益饱和，继续推到百万 batch 收益有限
- 模型接口：沿用 CLIP 式图像塔与文本塔，推理阶段仍可做零样本分类、图文检索和向量库召回

#### 🔬 深入细节

![SigLIP sigmoid loss 伪代码](https://raw.githubusercontent.com/ahmdtaha/distributed_sigmoid_loss/main/imgs/sigmoid_loss_pseudo_implementation.png)
*图：SigLIP 论文 Algorithm 1 的 sigmoid loss 伪实现公开转存图。它构造对角线为 \(+1\)、非对角为 \(-1\) 的标签矩阵，并对所有图文组合累加 log-sigmoid 损失。*

```python
# SigLIP pairwise sigmoid loss 伪代码
def siglip_loss(image_emb, text_emb, t_prime, bias):
    t = exp(t_prime)
    z_img = l2_normalize(image_emb)
    z_txt = l2_normalize(text_emb)

    logits = z_img @ z_txt.T * t + bias
    labels = 2 * eye(batch_size) - ones(batch_size, batch_size)  # +1 diagonal, -1 otherwise
    loss = -log_sigmoid(labels * logits).sum() / batch_size
    return loss

# chunked distributed sketch
for local_images, local_texts in device_batch:
    img = image_encoder(local_images)
    txt_block = text_encoder(local_texts)
    total_loss = local_positive_and_negative_loss(img, txt_block)
    for _ in range(num_devices - 1):
        txt_block = send_to_next_and_receive_from_prev(txt_block)
        total_loss += negative_loss_against_received_texts(img, txt_block)
    total_loss.backward()
```

CLIP/ALIGN 的 softmax 对比损失把每张图像看成一个 batch 内 \(N\) 类分类问题：正确文本是唯一正类，其余 \(N-1\) 个文本是负类；同时再做一次 text-to-image 方向。这个目标效果强，但它的概率分母依赖整行或整列所有相似度。分布式训练时，为了计算这些分母，通常要 all-gather 所有设备上的图像/文本嵌入，并在设备上物化大矩阵；batch size 越大，内存、通信、数值稳定化中的额外 pass 都越贵。

SigLIP 的核心改写是把 batch 分类问题变成 pairwise binary classification。给定图像编码器 \(f(\cdot)\)、文本编码器 \(g(\cdot)\)，令 \(x_i=f(I_i)\)、\(y_j=g(T_j)\) 为 L2 归一化嵌入，标签为：

$$
z_{ij}=
\begin{cases}
1, & i=j \\
-1, & i\neq j
\end{cases}
$$

则 sigmoid loss 写作：

$$
\mathcal{L}=-\frac{1}{|B|}
\sum_{i=1}^{|B|}\sum_{j=1}^{|B|}
\log\sigma\left(z_{ij}\left(t\,x_i^\top y_j+b\right)\right)
$$

其中 \(t=\exp(t')\) 是可学习温度，\(b\) 是可学习偏置。温度仍然控制相似度尺度，偏置则是 SigLIP 相比朴素二分类对比损失的关键补丁：一个 batch 中正样本只有 \(|B|\) 个，负样本有 \(|B|^2-|B|\) 个，初始化时负样本项会压倒梯度。论文用负偏置初始化，使模型一开始就倾向于判断“随机图文 pair 不匹配”，避免早期优化步被类别不均衡强行拉偏。

> 💡 关键：softmax 的一个样本概率必须“看见”整行或整列候选；SigLIP 的每个 \((i,j)\) 项是局部二分类损失，因此可以分块计算、交换块、累加标量损失。

chunked 实现的直觉很简单。假设全局 batch 被切到 \(D\) 个设备上，每个设备有 \(b\) 对图文。设备先计算本地 \(b\times b\) 块，其中包含 \(b\) 个正 pair 和本地负 pair；随后把文本块按环形发送给下一个设备，每轮只计算当前图像块与收到文本块之间的负样本损失。重复 \(D-1\) 轮后，每个设备已经覆盖了所有跨设备负样本，但任一时刻只需保存一个小块相似度矩阵，而不是全局 \(|B|\times|B|\) 矩阵。

与 softmax 的优化语义相比，SigLIP 也改变了 batch size 的角色。softmax 中 batch size 直接定义分类任务的类别数，batch 变大通常意味着每个正样本面对更多负类；sigmoid 中损失定义不依赖全局归一化，batch size 更多决定每步采样多少 pair、正负比例以及梯度估计质量。论文系统扫描 batch size 后发现，小 batch 下 sigmoid 优势明显；随着 batch 增大，softmax 会逐渐追上，但 32k 附近已经接近最优，继续扩大到数十万甚至百万 batch 的收益很快变小。

在模型使用层面，SigLIP 不是新的跨模态融合架构，而是替换了 CLIP/ALIGN 训练目标。图像塔可用 ViT，文本塔为 Transformer；训练完成后依然输出可独立预计算的图像/文本向量。因此它对部署链路的影响集中在训练端：更低峰值内存、更简单的分布式 loss、更可接受的小资源训练配方；推理端仍然保持双塔模型的零样本分类和 ANN 检索优势。

SigLIP 还解释了为什么“更大 batch”不是无限收益。超大 batch 会减少每个 epoch 的更新步数，若训练总样本数固定，优化动态可能变慢；同时许多负样本已经足够容易，继续增加随机负样本对梯度的信息量有限。sigmoid loss 的价值因此不只是能塞进更大 batch，而是把 batch size 从 loss 定义中解耦出来，让研究者可以根据硬件、数据噪声、训练时长和负样本比例选择更合理的点。

#### 🧪 练习题

```yaml
question: "SigLIP 中引入可学习偏置 b 的主要原因是什么？"
options:
  - "让文本编码器输出更长的 token 序列"
  - "补偿 batch 内正 pair 少、负 pair 多造成的二分类先验不均衡"
  - "替代图像编码器中的位置编码"
  - "保证推理阶段必须使用跨注意力重排序"
answer: 1
explain: "Sigmoid loss 会对所有图文组合做二分类，一个 batch 中负 pair 数量远多于正 pair；负偏置初始化让模型从多数 pair 不匹配的合理先验开始训练。"
```
