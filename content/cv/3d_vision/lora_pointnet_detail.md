### LoRA-PointNet++

```yaml
id: lora_pointnet
name: LoRA-PointNet++
full_name: LoRA增强点云分割 (LoRA-PointNet++)
year: '2026'
org: ISPRS
paper_url: https://www.sciencedirect.com/science/article/pii/S2667393226000050
category: point_cloud
parent: pointnet_pp
motivation: 引入LoRA微调技术实现高效跨领域点云适配
```

#### 📝 一句话总结

LoRA-PointNet++ 将低秩适配器插入 PointNet++ 的 Set Abstraction 与 Feature Propagation MLP 中，只训练少量低秩参数来完成跨域和增量类别适配，解决全量微调在航空 LiDAR 语义分割中参数开销大、灾难性遗忘强的问题。

#### 🎯 核心要点

- 参数高效微调：冻结预训练 PointNet++ 主干权重，仅训练低秩矩阵 \(A,B\) 形成 \(\Delta W=BA\)
- 插入位置明确：在编码器 Set Abstraction 的 MLP 和解码器 Feature Propagation 的 MLP 中加入 LoRA 分支
- 面向真实部署场景：评估 domain adaptation 和 novel classes incremental learning 两类任务
- 数据集覆盖航空 LiDAR：使用 TerLiDAR 与 DALES 等大规模点云子集，TerLiDAR 覆盖西班牙 Catalonia Ter River 沿线 51.4 km²、约 6.92 亿彩色点
- 抗遗忘能力：相比全量微调，对旧类别保持更好，尤其改善欠代表类别和新域类别
- 参数效率显著：报告在训练参数减少 73.4% 的情况下超过或接近全量微调，并在 DALES 上提升约 2.7 mIoU

#### 🔬 深入细节

![LoRA-PointNet++ 插入位置](https://ars.els-cdn.com/content/image/1-s2.0-S2667393226000050-gr2_lrg.jpg)
*图：LoRA-enabled PointNet++。橙色模块表示可训练 LoRA 分支，分别插入编码器 Set Abstraction 与解码器 Feature Propagation 的 MLP 权重。*

```python
# LoRA-PointNet++ 微调伪代码
class LoRALinear:
    def __init__(self, pretrained_weight, rank, alpha):
        self.W = freeze(pretrained_weight)
        self.A = trainable_matrix(rank, pretrained_weight.in_dim)
        self.B = trainable_matrix(pretrained_weight.out_dim, rank)
        self.scale = alpha / rank

    def __call__(self, x):
        return x @ self.W.T + self.scale * (x @ self.A.T @ self.B.T)

def finetune_lora_pointnetpp(batch):
    points, labels = batch
    logits = pointnetpp_with_lora(points)
    loss = cross_entropy(logits, labels)
    # 只更新 A、B 和可选分类头；预训练主干保持冻结
    loss.backward(parameters=["lora_A", "lora_B", "classifier"])
    optimizer.step()
```

**动机与背景**

航空 LiDAR 语义分割经常面对两个现实问题：一是采集平台、区域地貌、点密度、传感器通道不同导致 domain shift；二是国家测绘或城市治理任务会不断新增类别，旧模型需要增量学习。传统做法是全量微调 PointNet++，但全量更新会带来较高显存/训练成本，也容易在新域上过拟合并遗忘旧类别。

LoRA 的核心思想是：预训练权重 \(W_0\) 不动，只学习一个低秩增量：

$$
W = W_0 + \Delta W,\qquad \Delta W = \frac{\alpha}{r}BA
$$

其中 \(A\in\mathbb{R}^{r\times d_{\text{in}}}\)、\(B\in\mathbb{R}^{d_{\text{out}}\times r}\)，秩 \(r\) 远小于原始通道维度。这样模型仍然保留预训练 PointNet++ 的通用几何能力，新域知识通过低秩分支注入。

**为什么适合 PointNet++**

PointNet++ 的主要可学习参数集中在局部 PointNet/MLP 中。Set Abstraction 负责从局部邻域提取层级几何特征，Feature Propagation 负责把深层语义插值回原始点。LoRA-PointNet++ 将适配器放在这两类 MLP 上，等价于同时调整“局部几何编码方式”和“语义上采样方式”，但不破坏采样、分组和插值这些结构性归纳偏置。

> 💡 关键：LoRA 并不是替换 PointNet++，而是在已有线性/MLP 权重旁边增加一个低秩旁路。推理时 \(\Delta W\) 可以并回 \(W_0\)，几乎不增加推理延迟。

**训练流程**

训练前先准备一个在源域上预训练的 PointNet++。适配新城市、新传感器或新增类别时，冻结主干权重，只训练 LoRA 矩阵和必要的分类头。若是增量类别学习，分类头会扩展到新类别数，同时旧类别的主干表示尽量保持稳定；若是跨域适配，则分类空间不变，但 LoRA 学习新域的点密度、颜色/强度分布和地物形态偏移。

损失仍是逐点交叉熵：

$$
\mathcal{L}=-\frac{1}{N}\sum_{i=1}^{N}\sum_{c=1}^{C}y_{ic}\log p_{ic}
$$

LoRA 只改变 \(p_{ic}\) 的特征生成路径，不改变 PointNet++ 的置换不变性和层级局部建模方式。

**与全量微调的区别**

全量微调会更新所有 MLP 权重，容量更大但也更容易把旧域知识覆盖掉；LoRA 将更新限制在低秩子空间中，相当于给模型一个受控的“域偏移补偿器”。这解释了论文中观察到的抗灾难性遗忘现象：旧知识主要保存在冻结权重里，新知识由低秩增量承载。

**适用边界**

LoRA-PointNet++ 最适合“源域和目标域有共享几何结构，但分布发生偏移”的场景，例如不同城市航空 LiDAR、不同测绘批次、少量新类别加入。如果目标域类别体系完全不同，或点特征模态大幅变化，单纯低秩适配可能不足，需要解冻更多层或结合自监督预训练。

#### 🧪 练习题

```yaml
question: "LoRA-PointNet++ 相比全量微调的核心优势是什么？"
options:
  - "完全取消 PointNet++ 的 Set Abstraction"
  - "冻结主干权重，只用低秩增量适配新域，从而减少训练参数并缓解遗忘"
  - "把点云强制转换为 2D 图像后训练 CNN"
  - "只适用于单个物体分类，不能做语义分割"
answer: 1
explain: "LoRA 学习低秩矩阵 A、B 形成权重增量，保留预训练主干知识，同时用少量参数适配新域或新增类别。"
```
