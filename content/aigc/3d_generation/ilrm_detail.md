### iLRM：迭代式大规模 3D Gaussian 重建
```yaml
id: ilrm
name: iLRM
full_name: 迭代大规模重建 (Iterative LRM)
year: "2026.03"
org: CVPR
paper_url: https://arxiv.org/abs/2604.16000
category: feed_forward
parent: lrm
motivation: 迭代细化机制生成3DGS
```

#### 📝 一句话总结
iLRM 提出用紧凑场景表示和迭代细化机制预测 3D Gaussian，解决多视图前馈重建随视图数和分辨率扩展时注意力成本过高的问题。manifest 中的 arXiv 链接在本次检索中不可用；以下基于公开项目页 iLRM: An Iterative Large 3D Reconstruction Model 与 manifest 信息整理。

#### 🎯 核心要点
- 输出表示：直接预测 3D Gaussian Splatting，而不是先预测 NeRF 再转换。
- 紧凑场景 token：将场景表示与输入图像 token 解耦，避免所有视图全量互注意力。
- 两阶段注意力：把多视图交互拆成图像到场景、场景内部/场景到图像的高效更新。
- 迭代细化：多层或多轮更新 Gaussian 参数，使粗结构逐步变为高保真 3DGS。
- 高分辨率注入：在每层保留或注入高分辨率局部信息，改善细节和边界。

#### 🔬 深入细节
![iLRM 高效注意力设计](https://gynjn.github.io/iLRM/static/images/eff_attn.webp)
*图：iLRM 项目页展示的高效注意力设计，用紧凑场景表示替代对所有输入视图 token 的全局二次交互。*

```python
# iLRM 核心流程伪代码
images, cameras = load_multiview_inputs()
image_tokens = encode_images(images, cameras)

scene_tokens = initialize_compact_scene_tokens()
for layer in ilrm_layers:
    # 从多视图图像读取证据
    scene_tokens = layer.image_to_scene_attention(scene_tokens, image_tokens)
    # 在紧凑场景空间中融合几何
    scene_tokens = layer.scene_self_update(scene_tokens)
    # 注入高分辨率局部特征，恢复细节
    scene_tokens = layer.high_res_feature_injection(scene_tokens, image_tokens)

gaussians = gaussian_head(scene_tokens)
rendered = differentiable_splatting(gaussians, target_cameras)
loss = photometric_loss(rendered, target_images)
```

传统多视图 LRM 如果把所有图像 patch token 直接拼接后做全局注意力，复杂度会随 token 数近似二次增长。视图数增加、分辨率升高后，显存和计算都会迅速失控。iLRM 的核心思路是引入紧凑的场景 token，让输入图像只是被读取的信息源，而不是一直作为完整场景状态保存。

这种解耦可以写成：

$$
S^{k+1} = F_{\theta}(S^k, \{E(I_i,c_i)\}_{i=1}^{N})
$$

其中 \(S^k\) 是第 \(k\) 轮的场景表示，\(E(I_i,c_i)\) 是第 \(i\) 张图像及位姿编码后的 token。注意力主要发生在 \(S\) 与图像 token 之间，而不是所有图像 token 彼此之间做全连接交互。

迭代细化对 3DGS 很自然。早期层可以决定高斯的大致位置、尺度和可见区域；后续层逐步修正颜色、不透明度、旋转和局部几何。一个高斯通常包含：

$$
g_i=(\mu_i, \Sigma_i, \alpha_i, \mathbf{c}_i)
$$

其中 \(\mu_i\) 是中心，\(\Sigma_i\) 控制形状和方向，\(\alpha_i\) 是不透明度，\(\mathbf{c}_i\) 是颜色或球谐系数。通过可微 splatting 渲染到目标视角后，模型用图像重建损失学习这些参数。

> 💡 关键：iLRM 的效率来自“固定规模场景状态 + 迭代读取多视图证据”，而不是让所有输入视图 token 永久参与二次注意力。

相对 LRM 的 triplane-NeRF，iLRM 选择 3DGS 能获得更快渲染和更直接的显式资产表示；相对 DepthSplat/LongLRM 类多视图重建器，iLRM 的重点是可扩展到更多视图和更高分辨率，同时保持前馈速度。

#### 🧪 练习题
```yaml
question: "iLRM 为什么要把场景表示与输入图像 token 解耦？"
options:
  - "为了完全不使用相机参数"
  - "为了避免多视图 token 全局注意力带来的二次复杂度"
  - "为了只输出单张新视角图像"
  - "为了让 3DGS 不能被微分渲染"
answer: 1
explain: "紧凑场景 token 作为固定规模状态读取多视图证据，能显著降低随视图数和分辨率增长的注意力成本。"
```
