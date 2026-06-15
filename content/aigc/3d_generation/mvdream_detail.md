### MVDream（多视图梦境, MVDream）论文精读
```yaml
id: mvdream
name: MVDream
full_name: 多视图梦境 (MVDream)
year: 2024
organization: ByteDance
paper_url: https://arxiv.org/abs/2308.16512
category: feed_forward
parent: zero123
motivation: 多视图注意力解决Janus问题
```

#### 📝 一句话总结
MVDream 训练一个能同时生成一致多视图图像的扩散模型，并把它作为 text-to-3D 的多视图 SDS 先验，显著缓解单视角 2D lifting 中的 Janus 和视角漂移问题。

#### 🎯 核心要点
- **核心动机**：单图扩散模型每次只看一个视角，容易在不同角度重复生成正面语义或让内容漂移。
- **模型改动**：在 Stable Diffusion U-Net 基础上加入跨视图连接/3D self-attention，并为每个视图注入相机 embedding。
- **训练策略**：混合 3D 渲染多视图数据和大规模 2D 图文数据，兼顾多视图一致性与开放词汇泛化。
- **3D 使用方式**：一次渲染多个相机视图，把多视图扩散模型的 score 同时蒸馏到同一个 3D 表示。

#### 🔬 深入细节
**核心示意图/框架图**

![MVDream multi-view diffusion model](https://ar5iv.labs.arxiv.org/html/2308.16512/assets/x6.png)

MVDream 的关键判断是：仅仅让扩散模型知道“当前是背面视角”还不够，因为每个视图独立生成时仍可能各自满足文本，却彼此不一致。真正需要的是联合建模一组视图，让前后左右共享身份、纹理和结构。

形式上，模型输入是一组 noisy latent $\mathbf{x}_t\in\mathbb{R}^{F\times H\times W\times C}$，其中 $F$ 是视图数。U-Net 保留文本 cross-attention，同时把原本只在单张图内部做的 self-attention 扩展到跨视图维度，并加入相机参数：

$$
\epsilon_\theta =
\epsilon_\theta(\mathbf{x}_t,t,y,\{c_1,\dots,c_F\}).
$$

训练损失仍是扩散噪声预测 MSE：

$$
\mathcal{L}=
\mathbb{E}_{t,\epsilon}
\left[
\left\|
\epsilon-\epsilon_\theta(\mathbf{x}_t,t,y,\mathbf{c})
\right\|^2
\right],
$$

但样本是同一物体的多视图组，因此模型被迫学习跨视角一致性。

**算法伪代码**

```python
# train multi-view diffusion
for multiview_images, cameras, text in training_data:
    z = vae.encode(multiview_images)  # shape: F x H x W x C
    t, eps = sample_t_and_noise()
    z_t = alpha[t] * z + sigma[t] * eps
    eps_pred = multiview_unet(z_t, t, text, camera_embeddings(cameras))
    update(mse(eps_pred, eps))

# use as 3D prior
for step in range(num_3d_steps):
    cameras = sample_camera_group()
    renders = render_3d_representation(theta, cameras)
    grad = multiview_sds_gradient(renders, prompt, cameras)
    update_3d(theta, grad)
```

MVDream 对 optimization-based 3D 生成的意义很明确：把每次监督从“单张随机视角图像”升级为“相互通信的一组视角”。同一个 3D 表示在同一步被多个相机共同约束，扩散模型也能在注意力层看到其他视图，从而减少多脸、纹理漂移和背面语义重生。

它的代价是训练和推理更重，并且多视图扩散模型的相机分布会影响泛化范围。若目标视角、物体类型或风格远离训练分布，仍可能出现不一致；但相对 Zero123 式逐视图生成和 DreamFusion 式单视图 SDS，MVDream 提供了更直接的多视图先验。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "MVDream 为什么能缓解 Janus 问题？"
    answer: "它联合生成并监督多个视图，跨视图注意力让各视角共享身份和结构，而不是各自独立满足文本。"
  - type: architecture
    prompt: "MVDream 在 2D diffusion U-Net 上主要增加了什么信息？"
    answer: "增加跨视图 self-attention/连接和每个视图的相机 embedding。"
  - type: comparison
    prompt: "MVDream 与 Zero-1-to-3 的核心区别是什么？"
    answer: "Zero-1-to-3 主要做输入图条件的单目标视图生成；MVDream 强调文本条件下联合多视图生成与多视图 SDS 先验。"
```
