### Zero-1-to-3（零样本视角合成, Zero-1-to-3）论文精读
```yaml
id: zero123
name: Zero-1-to-3
full_name: 零样本视角合成 (Zero-1-to-3)
year: 2023
organization: Columbia University
paper_url: https://arxiv.org/abs/2303.11328
category: feed_forward
parent: "—"
motivation: 注入相机参数实现单图新视角
```

#### 📝 一句话总结
Zero-1-to-3 把单图到新视角生成建模为相机条件的图像到图像扩散任务，通过输入图像特征和相对相机位姿控制，让大规模 2D 扩散模型获得可泛化的 3D 视角先验。

#### 🎯 核心要点
- **输入输出**：给一张物体图像和目标相对视角，生成该物体在目标视角下的图像。
- **相机条件**：将相对相机变化编码为低维向量，例如方位、俯仰和半径变化，再注入 latent diffusion。
- **训练数据**：使用 Objaverse 等 3D 资产渲染成多视角图像对，学习从源视图到目标视图的条件生成。
- **用途**：既可直接做 novel view synthesis，也可生成多视图伪观测后优化 NeRF/SDF/mesh。

#### 🔬 深入细节
**核心示意图/框架图**

![Zero-1-to-3 conditional latent diffusion architecture](https://ar5iv.labs.arxiv.org/html/2303.11328/assets/x3.png)

单图 3D 是高度欠约束问题：看不到的背面并没有唯一答案。Zero-1-to-3 的策略不是直接输出 3D，而是先学习“给定源图和相机变化时，合理目标视图长什么样”。这种形式保留了不确定性，也能继承 Stable Diffusion 的自然图像先验。

训练时，取同一 3D 物体的两张渲染图 $x_{\text{src}}$ 和 $x_{\text{tgt}}$，计算相对相机 $\Delta c$。扩散模型在目标图 latent 上做噪声预测：

$$
\mathcal{L}=
\mathbb{E}_{t,\epsilon}
\left[
\left\|
\epsilon -
\epsilon_\theta(z_t,t,\mathrm{CLIP}(x_{\text{src}}),\Delta c)
\right\|^2
\right].
$$

其中源图通常通过 CLIP/image encoder 提供语义和外观条件，相机向量提供几何控制。论文中常用球坐标变化表示相机，例如 $[\theta,\sin(\phi),\cos(\phi),r]$，避免俯仰角周期性表示不连续。

**算法伪代码**

```python
for src_img, tgt_img, rel_camera in rendered_view_pairs:
    cond_img = image_encoder(src_img)
    cond_pose = pose_mlp(rel_camera)
    z = vae.encode(tgt_img)
    t, eps = sample_t_and_noise()
    z_t = alpha[t] * z + sigma[t] * eps

    eps_pred = unet(z_t, t, image_condition=cond_img, pose_condition=cond_pose)
    loss = mse(eps_pred, eps)
    update(loss)

def generate_new_view(input_img, rel_camera):
    return diffusion_sample(condition=(input_img, rel_camera))
```

Zero-1-to-3 的价值在于把 3D 先验变成可调用的 feed-forward 视角生成器。与 DreamFusion 类逐场景优化相比，它一次生成新视图只需几秒；与传统单图重建相比，它不被固定类别 CAD 先验限制。但生成的新视图之间可能不完全一致，所以后续 One-2-3-45、SyncDreamer、MVDream 等工作都在加强多视图一致性或直接把多视图作为联合输出。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "Zero-1-to-3 为什么不直接预测 3D 模型？"
    answer: "单图到 3D 不确定性很强，先预测相机条件新视图更容易利用 2D 扩散先验并保留多种可能。"
  - type: formula
    prompt: "训练损失中的 rel_camera 起什么作用？"
    answer: "它指定目标视角相对输入视角的变化，使扩散模型生成受控的新视图。"
  - type: limitation
    prompt: "Zero-1-to-3 生成多张视图后为什么还可能重建失败？"
    answer: "各视图是分别采样的，细节和几何可能不一致，后续 3D 融合会受到冲突伪观测影响。"
```
