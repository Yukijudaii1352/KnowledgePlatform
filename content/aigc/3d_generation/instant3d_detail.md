### Instant3D：稀疏视图生成加快速 LRM 重建
```yaml
id: instant3d
name: Instant3D
full_name: 即时3D (Instant3D)
year: "2024"
org: Tencent
paper_url: https://arxiv.org/abs/2311.06214
category: feed_forward
parent: lrm
motivation: 稀疏视图+LRM快速前馈生成
```

#### 📝 一句话总结
Instant3D 提出“文本生成稀疏多视图 + LRM 快速重建”的两阶段框架，解决优化式文生 3D 速度慢和多面不一致的问题。它用多视图扩散先产生四张一致参考图，再由稀疏视图重建网络前馈生成 3D。

#### 🎯 核心要点
- 两阶段流程：text-to-multiview diffusion 生成稀疏视图，sparse-view LRM 重建 3D。
- 稀疏视图条件：通常使用 4 个固定相机视角，覆盖物体主要外观。
- 多视图扩散：在同一画布或联合 token 中生成多个视角，提升跨视角一致性。
- LRM 扩展：从单图 LRM 改为多图条件输入，直接预测 triplane-NeRF 或类似 3D 表示。
- 快速推理：避免 SDS 逐实例优化，将文生 3D 推理压缩到秒级到十秒级。

#### 🔬 深入细节
![Instant3D 整体效果与流程](https://arxiv.org/html/2311.06214v2/x1.png)
*图：Instant3D 通过稀疏多视图生成和大规模重建模型快速生成 3D 资产。*

```python
# Instant3D 核心流程伪代码
prompt = "a stylized robot, high quality"
cameras = fixed_four_views()

# 1. 文本到稀疏多视图
multi_view_images = multiview_diffusion(prompt, cameras)

# 2. 稀疏视图到 3D
view_tokens = image_encoder(multi_view_images, cameras)
triplane = sparse_view_lrm(view_tokens)

# 3. 任意视角渲染或导出
for camera in novel_cameras:
    image = render_triplane_nerf(triplane, camera)
mesh = extract_mesh_from_density(triplane)
```

Instant3D 的动机是把文生 3D 中最昂贵的部分拆掉。DreamFusion 系列依靠 2D 扩散模型提供 SDS 梯度，需要对每个 prompt 优化一个 3D 表示；优化过程慢，而且每个视角分别受 2D 先验影响，容易产生 Janus 问题。Instant3D 改为先让扩散模型一次性生成少量互相一致的视图，再用前馈重建器完成 3D。

第一阶段的多视图扩散可以理解为学习：

$$
p_{\theta}(I_1, I_2, I_3, I_4 \mid y, c_1,c_2,c_3,c_4)
$$

其中 \(y\) 是文本提示，\(c_i\) 是固定相机。与分别生成四张图不同，联合生成让注意力能跨视图共享物体身份和部件布局，因此相同物体不会在不同方向变成不同实例。

第二阶段是 LRM 思路的多视图版本。输入不再是一张图，而是带相机位姿的稀疏视图集合。图像 token 与相机编码一起进入 Transformer，输出 triplane 或其他可渲染 3D 表示。训练目标仍是目标视角重建：

$$
\mathcal{L} = \sum_{v \in \mathcal{V}_{target}}
\|R_{\theta}(G, c_v) - I_v^{gt}\|_1 + \lambda \mathcal{L}_{lpips}
$$

其中 \(G\) 是前馈预测的 3D 表示。多图输入比单图 LRM 更少依赖不可见区域幻觉，重建几何也更稳定。

> 💡 关键：Instant3D 的质量瓶颈主要从“优化是否收敛”转移到“稀疏多视图是否足够一致且覆盖充分”。

与 LRM 相比，Instant3D 更面向生成任务：LRM 假设已有输入图，Instant3D 从文本开始生成多视图观测。与 MVDream/Wonder3D 相比，它进一步把多视图图像接到重建模型上，形成端到端的资产生产流水线。

#### 🧪 练习题
```yaml
question: "Instant3D 为什么先生成稀疏多视图再重建 3D？"
options:
  - "因为稀疏视图能完全替代相机位姿"
  - "因为多视图观测提供更强几何约束，同时避免逐实例 SDS 优化"
  - "因为 LRM 只能处理文本输入"
  - "因为四张图一定比完整视频包含更多信息"
answer: 1
explain: "联合多视图扩散提供一致外观与几何线索，LRM 再前馈重建 3D，使流程比逐实例优化更快且更稳定。"
```
