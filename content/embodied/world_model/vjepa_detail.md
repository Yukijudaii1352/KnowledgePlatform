### 视频JEPA (Video-JEPA)

```yaml
id: vjepa
name: V-JEPA
full_name: 视频JEPA (Video-JEPA)
year: "2024.04"
org: Meta AI
paper_url: "https://arxiv.org/abs/2404.08471"
category: predictive
parent: ijepa
motivation: "扩展至视频域学习时空特征理解物理运动"
```

#### 📝 一句话总结

V-JEPA 将 JEPA 式特征预测扩展到视频，通过遮挡大块时空区域并预测其 latent features，在不使用文本、负样本、预训练图像编码器或像素重建的情况下学习兼具外观和运动理解的视频表征。

#### 🎯 核心要点

- **视频特征预测目标**：从视频中可见 token 表征预测被遮挡时空 token 的 target encoder 表征
- **无需额外监督**：不使用标签、文本、负样本、预训练 image encoder 或像素级 decoder
- **多块时空 mask**：目标块为空间连续区域，并沿整个时间维重复，减少视频冗余造成的信息泄漏
- **EMA target encoder + stop-gradient**：用动量 target encoder 提供稳定目标，避免常数表示坍塌
- **VideoMix2M 预训练**：整合 HowTo100M、Kinetics、Something-Something-v2 等约 200 万公开视频
- **冻结骨干评估强**：同一 frozen backbone 在 Kinetics、Something-Something-v2、ImageNet 等外观和运动任务上表现稳健

#### 🔬 深入细节

##### 核心示意图

![V-JEPA 训练流程](https://ar5iv.labs.arxiv.org/html/2404.08471/assets/x3.png)
*图：V-JEPA 丢弃视频中的可见 token 输入 context encoder，再用 predictor 和 mask tokens 预测被遮挡时空位置的 target encoder 表征。*

##### 动机与背景

视频理解需要同时捕获外观、运动、物体交互和时间因果。像素级视频重建方法容易把容量花在颜色、纹理、压缩噪声等低层细节上；对比学习则常依赖负样本或强增强。V-JEPA 的问题是：单独的 latent feature prediction 是否足以让视频模型学到通用表征？

V-JEPA 的答案是肯定的。它沿用 JEPA 的非生成式思想，把目标定义为“预测另一个视频区域的表征”。给定视频 clip \(x\)，采样上下文区域 \(x_c\) 和目标区域 \(x_t\)，模型优化：

$$
\mathcal{L}
=
\left\|
P_\phi(E_\theta(x_c), m_t)
-
\mathrm{sg}(E_{\bar\theta}(x)_{m_t})
\right\|_1
$$

其中 \(m_t\) 是目标时空位置的 mask token/positional embedding，\(E_{\bar\theta}\) 是 EMA target encoder。

##### 算法伪代码

```python
# V-JEPA pretraining
for video in VideoMix2M:
    tokens = patchify_video(video)  # 3D spatio-temporal patches
    target_masks = sample_multiblock_masks(tokens)
    context_tokens = drop_tokens(tokens, target_masks)

    context_repr = context_encoder(context_tokens)
    with stop_gradient():
        full_target_repr = target_encoder(tokens)
        targets = full_target_repr[target_masks]

    mask_tokens = positional_tokens(target_masks)
    preds = predictor(context_repr, mask_tokens)

    loss = l1_distance(preds, targets)
    optimize(context_encoder, predictor, loss)
    update_ema(target_encoder, context_encoder)
```

##### 时空 mask 设计

视频有强冗余，如果只随机遮挡少量 patch，模型可能从相邻帧和相邻像素直接插值，而不是学习运动或对象关系。V-JEPA 采样空间连续的大块区域，并把这些区域沿整个时间维重复遮挡。论文使用短程和长程 mask：短程目标覆盖较小比例，长程目标可覆盖很大比例，从而同时训练局部和全局预测能力。

这种 mask 让任务更接近“根据可见场景推断被遮挡对象/动作在整段视频中的表征”，而不是补一小块纹理。对于 Something-Something-v2 这类动作类别高度依赖物体运动关系的数据集，这种时空预测尤其关键。

##### 网络结构与目标编码器

V-JEPA 使用 ViT 视频骨干，把视频切成 3D patch tokens。context encoder 只处理未被遮挡 token，因此计算类似 MAE 一样高效；predictor 是较窄的 Transformer，接收 context 表征和 learnable mask tokens，输出每个目标 token 的表征预测。

target encoder 是 context encoder 的 EMA 版本，输出 stop-gradient 目标。没有这个机制时，最简单的表征预测损失会允许 encoder 输出常数，导致坍塌。EMA target 让 predictor 追逐一个缓慢变化、信息更稳定的目标。

> 💡 关键：V-JEPA 的“非生成式”不是不预测，而是只预测抽象特征，让模型保留对下游任务有用的运动和语义信息。

##### 结果与意义

论文在约 200 万公开视频组成的 VideoMix2M 上预训练 ViT-L/16、ViT-H/16 和更高分辨率模型。最大模型在 frozen backbone 评估下同时覆盖外观任务和运动任务：Kinetics-400 更偏外观识别，Something-Something-v2 更考验时序和物体交互。V-JEPA 在不微调骨干的情况下表现稳健，说明特征预测能学习通用视觉表征。

与 I-JEPA 相比，V-JEPA 的新增挑战是时间维冗余和运动理解；与视频 MAE 相比，它不重建像素，训练周期更短且冻结表征更强。对于具身智能，V-JEPA 提供了一个重要方向：先从大量无标签视频学习物理和时空表征，再把这些表征接入规划、控制或世界模型预测。

#### 🧪 练习题

```yaml
question: "V-JEPA 为什么把空间目标块沿整个时间维重复遮挡？"
options:
  - "为了让模型只学习单帧分类"
  - "为了减少视频相邻帧泄漏，迫使模型学习更高层的时空关系"
  - "为了让 target encoder 不需要 EMA 更新"
  - "为了把所有视频都转换成文本数据"
answer: 1
explain: "视频相邻帧冗余很强，若遮挡太局部，模型可直接插值；沿时间维遮挡连续区域能强化运动和对象关系预测。"
```
