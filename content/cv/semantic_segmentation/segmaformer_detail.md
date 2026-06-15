### SegMaFormer

```yaml
id: segmaformer
name: SegMaFormer
full_name: "分割MaFormer (SegMaFormer)"
year: "2026"
org: "多机构"
paper_url: "https://arxiv.org/abs/2603.22002"
category: "frontier"
parent: "vmamba"
motivation: "Mamba+Transformer混合高效分割"
```

#### 📝 一句话总结

SegMaFormer 提出轻量级 3D 医学分割混合编码器，在高分辨率早期阶段使用 Mamba 降低长序列建模成本，在低分辨率深层阶段保留 Transformer 注意力，并用 3D RoPE 和 MLP 解码器兼顾效率与精度。

#### 🎯 核心要点

- 任务定位：高效 3D medical image segmentation，面向体数据分割。
- 编码器：四阶段层级体素表示，早期高分辨率阶段使用 3D Mix Vision Mamba Block。
- 深层注意力：在 token 数变少的后期阶段使用 Transformer/self-attention，提高全局语义表达。
- 位置编码：在 overlapped 3D patch embedding 后加入 3D Rotary Position Embedding。
- 解码器：采用 SegFormer 风格 all-MLP decoder，对多尺度特征投影、上采样、拼接并预测 mask。
- 参数效率：arXiv 版本报告约 2.02M 参数、15.2 GFLOPs，相比多个大型 Transformer/CNN 模型显著更轻。
- 数据集：BraTS、Synapse、ACDC 三个公开 3D 医学分割基准。

#### 🔬 深入细节

![SegMaFormer 架构图](https://arxiv.org/html/2603.22002v1/Network-Architecture-Page-1.png)
*图：SegMaFormer 使用 3D patch embedding、3D RoPE、Mamba/Transformer 混合编码器和 all-MLP 解码器。*

##### 算法伪代码

```python
def segmaformer(volume):
    x = overlapped_3d_patch_embedding(volume)
    x = apply_3d_rope(x)
    features = []

    for i, block in enumerate(encoder_stages):
        if i < 3:
            x = mix_vision_mamba_block(x)      # 高分辨率阶段，线性复杂度
        else:
            x = efficient_transformer_block(x) # 低分辨率阶段，自注意力成本可控
        features.append(x)
        x = downsample_3d(x)

    projected = [mlp_project(f) for f in features]
    upsampled = [upsample_to_full(p) for p in projected]
    fused = mlp_fuse(concat(upsampled))
    return conv1x1_3d(fused)
```

##### 方法解读

3D 医学图像的 token 数量增长很快。若把 \(D\times H\times W\) 体数据切成 patch 后直接全局 self-attention，复杂度近似 \(O(N^2)\)，其中 \(N\) 是体素 token 数；这在 CT/MRI 体数据上很容易超出显存和算力预算。

SegMaFormer 的设计原则是把不同模块放在它们最合适的尺度上。早期阶段空间分辨率高、token 多，此时用 Mamba 的线性序列建模：

$$
\operatorname{Cost}_{Mamba}=O(NC)
$$

它能捕获长程依赖且不会像注意力那样随 token 数平方增长。后期阶段经过下采样，\(N\) 变小但通道维更高，此时 self-attention 的成本可控，更适合精炼全局语义。

3D RoPE 解决位置感知问题。体数据中的上下、左右、前后方向都包含解剖意义，简单绝对位置嵌入在尺寸变化时泛化较差；旋转位置编码把相对位置信息注入 query/key 或序列表示，让 Mamba 与 Transformer 都能区分 3D 空间关系。

编码器输出四个尺度特征，解码器不使用重卷积 U-Net 解码，而是采用 SegFormer 式 MLP：

$$
\hat{F}_l=\operatorname{MLP}(F_l),\quad
F=\operatorname{MLP}\left(\operatorname{Concat}(\operatorname{Up}(\hat{F}_1),...,\operatorname{Up}(\hat{F}_4))\right)
$$

这种 all-MLP decoder 参数少，适合轻量化目标。训练通常使用 Dice 与交叉熵组合，论文还讨论 deep supervision 对小结构可能并非总是有利。

与纯 VMamba 的区别是它没有在所有尺度都依赖状态空间层，而是在低分辨率处保留 Transformer 的全局表达；与纯 SegFormer3D 相比，它减少了高分辨率阶段的注意力成本。

> 💡 关键：SegMaFormer 的“混合”不是堆模块，而是按 token 数和语义层次分配 Mamba 与 Transformer。

#### 🧪 练习题

```yaml
question: "SegMaFormer 为什么把 Mamba 放在早期高分辨率阶段？"
options:
  - "因为早期 token 数多，Mamba 的线性复杂度比全局注意力更省"
  - "因为 Mamba 只能处理二维自然图像"
  - "因为后期阶段没有语义信息"
  - "因为 3D RoPE 只能和 Mamba 一起使用"
answer: 0
explain: "体数据早期特征 token 数巨大，Mamba 能以线性复杂度建模长程依赖，避免高分辨率全注意力的二次开销。"
```
