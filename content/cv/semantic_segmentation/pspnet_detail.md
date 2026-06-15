### PSPNet

```yaml
id: pspnet
name: PSPNet
full_name: "金字塔场景解析网络 (Pyramid Scene Parsing Network)"
year: "2017"
org: "商汤/港中文"
paper_url: "https://arxiv.org/abs/1612.01105"
category: "core"
parent: "fcn"
motivation: "金字塔池化聚合全局上下文"
```

#### 📝 一句话总结

PSPNet 提出 Pyramid Pooling Module，在 FCN 主干上用多尺度池化聚合全局场景先验，解决局部感受野导致的类别混淆、关系错配和小目标不显眼问题。

#### 🎯 核心要点

- 核心模块：PPM 使用 1×1、2×2、3×3、6×6 自适应平均池化捕获全局到局部上下文。
- Backbone：采用 dilated ResNet，保持较高输出分辨率并扩大感受野。
- 特征融合：每个池化分支经 1×1 卷积降维、双线性上采样，再与原特征拼接。
- 辅助损失：在中间层增加 auxiliary segmentation head，缓解深层网络优化困难。
- 推理策略：多尺度和翻转测试可进一步提升结果。
- 代表成绩：ADE20K 2016 场景解析挑战冠军，并在 PASCAL VOC 2012、Cityscapes 上取得强结果。
- 影响：后续语义分割中的全局上下文池化、金字塔上下文和多尺度聚合广泛继承 PSPNet 思路。

#### 🔬 深入细节

![PSPNet 架构图](https://ar5iv.labs.arxiv.org/html/1612.01105/assets/x3.png)
*图：CNN 特征经过金字塔池化模块汇聚多尺度上下文，再融合生成像素级预测。*

##### 算法伪代码

```python
def pspnet_forward(image):
    feat = dilated_resnet(image)  # output_stride 通常为 8
    pyramids = [feat]

    for bin_size in [1, 2, 3, 6]:
        pooled = adaptive_avg_pool(feat, output_size=(bin_size, bin_size))
        reduced = conv1x1(pooled, out_channels=feat.channels // 4)
        up = bilinear_upsample(reduced, size=feat.spatial_size)
        pyramids.append(up)

    context = concat(pyramids, dim="channel")
    logits = segmentation_head(context)
    return bilinear_upsample(logits, size=image.spatial_size)
```

##### 方法解读

FCN 已经能端到端分割，但每个像素的预测仍主要依赖局部卷积感受野。场景解析中，类别判断常需要全局信息：船通常在水上，床通常在室内，天空和道路的空间布局也有强先验。缺少上下文时，模型容易把局部纹理相似的类别混淆。

PPM 的做法是对最终特征图 \(F\) 做多级自适应池化：

$$
\operatorname{PPM}(F)=\operatorname{Concat}\left(F,\operatorname{Up}(g_1(P_1(F))),\operatorname{Up}(g_2(P_2(F))),\operatorname{Up}(g_3(P_3(F))),\operatorname{Up}(g_4(P_4(F)))\right)
$$

其中 \(P_n\) 输出 1×1、2×2、3×3、6×6 网格，\(g_n\) 是 1×1 卷积降维。1×1 分支提供全图先验，2×2/3×3 捕获粗空间布局，6×6 保留较细区域上下文。

通道降维很重要。若每个池化分支都保留原始通道，拼接后全局上下文会带来巨大参数和显存；PSPNet 将每个分支降到原通道的约 \(1/N\)，再拼回原特征，既节省计算又保留局部主干。

Dilated ResNet 则解决分辨率问题：把后几层下采样改为空洞卷积，使输出 stride 从 32 降到 8，同时维持较大理论感受野。最终预测由 PPM 后特征经卷积分类，再上采样到原图。

辅助损失可写为：

$$
\mathcal{L}=\mathcal{L}_{main}+\alpha\mathcal{L}_{aux}
$$

论文中辅助头接在 ResNet 中间层，推理时丢弃。它给中层特征提供语义监督，让深层网络更容易收敛。

> 💡 关键：PSPNet 的 PPM 不是简单多尺度输入，而是在同一高层特征图上构造“场景级上下文金字塔”，低成本补齐 FCN 的全局信息缺口。

#### 🧪 练习题

```yaml
question: "PSPNet 中 1×1 金字塔池化分支的主要作用是什么？"
options:
  - "提供全图级上下文先验"
  - "增加输出类别数"
  - "替代所有空洞卷积"
  - "执行实例级匹配"
answer: 0
explain: "1×1 自适应平均池化把整幅特征图压成全局描述，为每个像素补充场景级语义。"
```
