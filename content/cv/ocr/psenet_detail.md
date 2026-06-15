### PSENet: 渐进式尺度扩展网络 (Progressive Scale Expansion Network)

```yaml
id: psenet
name: PSENet
full_name: "渐进式尺度扩展网络 (Progressive Scale Expansion Network)"
year: "2019"
org: Nanjing University
paper_url: https://arxiv.org/abs/1903.12473
category: detection
parent: east
motivation: 渐进扩展分离粘连文本
```

#### 📝 一句话总结

PSENet 提出从小文本核逐级扩展到完整文本区域的 Progressive Scale Expansion 方法，解决了分割式文本检测在相邻文本粘连时难以区分实例的问题。它把检测转化为多尺度文本核分割加实例扩张，在任意形状文本场景中兼顾检测精度和形状鲁棒性。

#### 🎯 核心要点

- 预测多个尺度的文本实例分割图 \(S_1,\ldots,S_n\)，其中 \(S_1\) 是最小文本核，\(S_n\) 是完整文本区域
- 先在最小核上做连通域标记，再按尺度从小到大执行 PSE 扩张，避免相邻文本在完整区域中直接粘连
- 使用 FPN 式多尺度特征融合，输出可为原图 \(1/1\) 或 \(1/4\) 分辨率以平衡速度和精度
- 标签生成通过 Vatti clipping 按比例收缩文本多边形，得到不同尺度的文本 kernel
- 损失函数由完整文本区域 Dice loss 和收缩文本核 Dice loss 组成，并用 OHEM 处理正负样本不均衡
- 在 CTW1500、Total-Text、ICDAR2015、ICDAR2017-MLT 等弯曲/多方向文本基准上取得强检测性能

#### 🔬 深入细节

##### 核心架构图

![PSENet 整体流程](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x3.png)
*图：PSENet 使用 FPN 提取并融合多尺度特征，输出多个文本核分割图，再通过 Progressive Scale Expansion 得到最终文本实例。*

![PSENet 渐进式扩展示意](https://ar5iv.labs.arxiv.org/html/1903.12473/assets/x4.png)
*图：PSE 先在最小尺度文本核上找到连通域，再逐级吸收更大尺度中的相邻像素，冲突像素保持先到先得的实例归属。*

##### 算法伪代码

```python
# PSENet Progressive Scale Expansion 推理伪代码
def pse_inference(pred_maps, thresholds):
    # pred_maps: [S1, S2, ..., Sn], S1 最小文本核, Sn 完整文本区域
    kernels = [(sigmoid(S) > t) for S, t in zip(pred_maps, thresholds)]

    label = connected_components(kernels[0])  # 只在最小文本核上初始化实例
    for k in range(1, len(kernels)):
        queue = boundary_pixels(label)
        while queue:
            p = queue.pop(0)
            for q in neighbors4(p):
                if kernels[k][q] and label[q] == 0:
                    label[q] = label[p]       # 从已标记 kernel 向外扩张
                    queue.append(q)

    polygons = contours_from_instance_map(label)
    return polygons
```

##### 方法详解

**1. 动机与背景**

EAST、TextBoxes 等回归式方法通常输出矩形或四边形，对弯曲文本和长文本行的边界表达能力有限。分割式方法能拟合任意形状，但如果直接预测完整文本区域，密集排版中的相邻文本会在概率图上粘连，后处理很容易把多个实例合成一个。

PSENet 的核心思想是：完整文本区域容易粘连，但向内收缩后的文本核通常彼此分离。因此它不急着在完整区域上做实例划分，而是先在最小 kernel 上确定实例身份，再逐级向外扩展到完整文本区域。

**2. 多尺度文本核预测**

网络输出 \(n\) 张二值分割图：

$$
S = \{S_1, S_2, \ldots, S_n\}, \quad S_1 \subset S_2 \subset \cdots \subset S_n
$$

其中 \(S_n\) 表示完整文本区域，\(S_1\) 是最小收缩 kernel。小 kernel 用于分离实例，大 kernel 用于恢复完整边界。相比只预测一个文本区域，多个嵌套 kernel 给后处理提供了从“可靠实例种子”到“完整实例区域”的路径。

**3. 标签生成**

对文本多边形 \(P_n\) 逐级向内收缩。第 \(i\) 个 kernel 的缩放比例为：

$$
r_i = 1 - \frac{(1-m)(n-i)}{n-1}
$$

其中 \(m\) 是最小 kernel 比例。收缩距离用多边形面积 \(A\) 和周长 \(L\) 估计：

$$
d_i = \frac{A(1-r_i^2)}{L}
$$

这个设计让不同尺度的文本区域保持拓扑嵌套关系，PSE 扩张时只需要在相邻尺度之间传播实例标签。

**4. 损失函数**

PSENet 使用 Dice loss 监督完整文本区域和各级 kernel：

$$
L = L_c + \lambda L_s
$$

\(L_c\) 是完整文本区域 \(S_n\) 的损失，\(L_s\) 是所有小尺度 kernel 的平均损失。Dice loss 对前景稀疏的文本检测更稳定；OHEM 主要用于完整文本区域，避免大量背景像素淹没文本像素的梯度。

**5. 与传统分割后处理的区别**

普通语义分割通常在完整文本概率图上做连通域分析，这对密集文本很脆弱。PSENet 把连通域分析前移到最小 kernel，先得到高置信、低粘连的实例种子，再把这些种子作为标签源向外扩散。冲突像素只会被一个已有实例吸收，因此相邻文本即使在外层区域接触，也不容易被合并。

> 💡 关键：PSENet 的“尺度”不是输入图像金字塔，而是同一个文本实例从内核到完整区域的形态尺度。它利用文本区域的形态收缩来制造天然实例间隔。

#### 🧪 练习题

```yaml
question: "PSENet 为什么要先在最小文本核上做连通域，而不是直接在完整文本区域上做连通域？"
options:
  - "最小文本核包含更多边界细节，能提升多边形拟合精度"
  - "最小文本核通常彼此分离，可作为可靠实例种子，避免相邻文本粘连"
  - "最小文本核可以减少网络输出通道数"
  - "完整文本区域只在训练阶段使用，推理阶段不会预测"
answer: 1
explain: "完整文本区域容易因相邻字符或文本行接触而粘连；收缩后的 kernel 更容易分离不同实例，PSE 再逐级恢复完整区域。"
```
