### RS2-SAM2

```yaml
id: rs2_sam2
name: RS2-SAM2
full_name: "指代性遥感分割SAM2 (Referring Remote Sensing Segmentation with SAM2)"
year: "2026"
org: "Various Institutions"
paper_url: "https://arxiv.org/abs/2603.xxxxx"
category: "semantic_segmentation"
parent: "sam2_cd"
motivation: "AAAI2026指代性遥感分割框架"
```

#### 📝 一句话总结

RS2-SAM2 将 SAM2 改造成文本指代的遥感分割框架，通过联合视觉-文本编码、双向层级融合、伪掩码密集提示和文本引导边界约束，解决 SAM2 缺少语言定位能力、遥感目标低对比和边界模糊的问题。

#### 🎯 核心要点

- 任务定位：Referring Remote Sensing Image Segmentation，根据自然语言描述分割遥感图像中的目标实例或区域。
- Union Encoder：使用 BEiT-3 同时编码遥感图像与文本，得到对齐的视觉 token、文本 token 和多模态 `[CLS]` token。
- Bidirectional Hierarchical Fusion Module：在 SAM2 Hiera 编码器内部和编码后做文本-视觉双向交叉注意力，使语言逐层调制遥感视觉特征。
- Mask Prompt Generator：用多模态 token 与视觉嵌入生成伪掩码，作为 SAM2 prompt encoder 的 dense prompt。
- Text-guided Boundary Loss：用文本权重调制预测掩码和真值掩码的边界梯度差，强化小目标和弱边缘。
- 实验基准：RefSegRS 与 RRSIS-D，公开 arXiv/AAAI 版本报告其在多项 RRSIS 指标上超过 LAVT、RMSIN、FIANet 和 EVF-SAM。
- 链接说明：给定 `paper_url` 是占位符；可检索官方论文为 `https://arxiv.org/abs/2503.07266`，AAAI 2026 版本题名为 Customized SAM2 for Referring Remote Sensing Image Segmentation。

#### 🔬 深入细节

![RS2-SAM2 框架图](https://arxiv.org/html/2503.07266v4/x2.png)
*图：RS2-SAM2 由 union encoder、双向层级融合模块、mask prompt generator 和 SAM2 prompt/mask decoder 组成。*

##### 算法伪代码

```python
def rs2_sam2_forward(image_rs, text):
    # 1. 联合编码，让图像 patch 与文本 token 进入同一语义空间
    visual_tokens, text_tokens, cls_token = beit3_union_encoder(image_rs, text)

    # 2. SAM2 图像编码器中逐层注入文本信息
    sam_features = sam2_hiera_stem(image_rs)
    for layer in sam2_hiera_layers:
        sam_features = layer(sam_features)
        sam_features = sam_features + a_img * cross_attn(q=sam_features, kv=text_tokens)
        text_tokens = text_tokens + a_txt * cross_attn(q=text_tokens, kv=sam_features)

    # 3. 编码后再做文本引导的高层视觉门控
    fused_features = cross_attn(q=sam_features, kv=text_tokens) * sam_features

    # 4. 生成 dense mask prompt，并交给 SAM2 解码
    cls_enhanced = cross_attn(q=cls_token, kv=visual_tokens)
    dense_prompt = mlp_mask_generator(cls_enhanced, visual_tokens)
    pred_mask = sam2_mask_decoder(fused_features, dense_prompt, sparse_prompt=cls_token)
    return pred_mask
```

##### 方法解读

RRSIS 和普通语义分割不同：模型不仅要知道“建筑、道路、飞机”等类别，还要理解“左上角靠近跑道的飞机”“河边白色船只”这类文本约束。SAM2 的原始输入提示是点、框或掩码，它很擅长把被提示区域分割干净，但没有天然的文本 grounding 能力；直接把文本投影成稀疏 prompt 往往难以处理遥感图像中的小目标、密集重复目标和低前景背景对比。

RS2-SAM2 的第一步是把图像和文本一起送入 BEiT-3 式联合编码器，得到 \(F_v\)、\(F_t\) 和多模态 \(c\)。可以把它理解成先建立一个“候选目标语义空间”：文本不再只是外部条件，而是和视觉 patch 在同一 token 序列中完成初步对齐。

核心模块 BHFM 解决的是 SAM2 编码器内部缺少语言参与的问题。每一层视觉特征先作为 query，从文本 token 中读取指代语义；文本 token 又反向读取当前视觉层的空间信息。简化写法为：

$$
\hat{F}_v^{l}=F_v^{l}+\alpha_v\operatorname{MHCA}(F_v^{l}, F_t),\quad
\hat{F}_t=F_t+\alpha_t\operatorname{MHCA}(F_t, F_v^{l})
$$

这种双向交互比只在解码前拼接文本更细，因为它把“文本说的对象是什么”逐层带入 SAM2 的 Hiera 表征。编码完成后，再用 \(F_t\) 对高层 \(F_v\) 做一次交叉注意力并逐元素相乘，相当于对文本相关区域开门、对背景区域关门。

Mask Prompt Generator 则把语言条件转化为 SAM2 最熟悉的 dense prompt。其直觉是：多模态 `[CLS]` token 负责全局“这句话指的是什么”，视觉 token 负责“它在哪里”，两者交互后通过 MLP 生成伪掩码：

$$
M_p=\operatorname{MLP}\left(\operatorname{MHCA}(c, F_v)\odot c\right)
$$

训练时常规交叉熵和 Dice 损失负责区域重叠，文本引导边界损失负责让边界贴合描述对象。边界项可概括为对预测与真值的水平/垂直梯度差做 MSE，并用文本相关权重放大关键区域：

$$
\mathcal{L}=\lambda_{ce}\mathcal{L}_{ce}+\lambda_{dice}\mathcal{L}_{dice}+\lambda_{tbl}\mathcal{L}_{tbl}
$$

> 💡 关键：RS2-SAM2 不是简单“把 SAM2 加文本编码器”，而是把文本对齐、编码器适配、dense prompt 生成和边界监督都放进同一条 SAM2 兼容链路里。

#### 🧪 练习题

```yaml
question: "RS2-SAM2 中 Mask Prompt Generator 的主要作用是什么？"
options:
  - "替代 SAM2 的图像编码器以减少参数量"
  - "把视觉-文本联合表征转成 SAM2 可使用的密集掩码提示"
  - "只在训练阶段生成边界标签"
  - "把遥感图像裁剪为固定大小 patch"
answer: 1
explain: "MPG 将多模态 token 与视觉嵌入融合成伪掩码，作为 dense prompt 输入 SAM2 prompt encoder/decoder。"
```
