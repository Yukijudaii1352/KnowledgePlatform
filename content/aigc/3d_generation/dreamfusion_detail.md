### DreamFusion（梦境融合, DreamFusion）论文精读
```yaml
id: dreamfusion
name: DreamFusion
full_name: 梦境融合 (DreamFusion)
year: 2022
organization: Google Research
paper_url: https://arxiv.org/abs/2209.14988
category: optimization
parent: nerf
motivation: 提出SDS Loss开创文生3D范式
```

#### 📝 一句话总结
DreamFusion 用冻结的 2D 文生图扩散模型作为先验，通过 Score Distillation Sampling（SDS）直接优化 NeRF，让随机初始化的 3D 表示逐步变成符合文本提示的可渲染物体。

#### 🎯 核心要点
- **范式突破**：不训练 3D 生成模型，也不需要文本-3D 数据；每个 prompt 单独优化一个 3D 表示。
- **核心损失**：SDS 把扩散模型预测噪声与真实加噪噪声的差值转成对渲染图像的梯度，再反传到 NeRF 参数。
- **3D 约束来源**：同一个 NeRF 从随机相机反复渲染，所有视角共享一套参数，因此 2D 先验被“lift”到 3D。
- **典型问题**：SDS 倾向 mode-seeking，常出现过饱和、过平滑、Janus 多脸和几何不稳定。

#### 🔬 深入细节
**核心示意图/框架图**

![DreamFusion text-to-3D examples and pipeline context](https://ar5iv.labs.arxiv.org/html/2209.14988/assets/x1.png)

DreamFusion 的关键是把“采样扩散图像”改写成“优化一个可微图像生成器”。令 3D 参数为 $\theta$，随机相机为 $c$，可微渲染得到图像 $x=g(\theta,c)$。扩散模型在噪声步 $t$ 上看到 $x_t=\alpha_t x+\sigma_t\epsilon$，并预测噪声 $\hat{\epsilon}_\phi(x_t,t,y)$。SDS 使用近似梯度：

$$
\nabla_\theta \mathcal{L}_{\text{SDS}}
=
\mathbb{E}_{t,\epsilon,c}\left[
w(t)\left(\hat{\epsilon}_\phi(x_t,t,y)-\epsilon\right)
\frac{\partial x}{\partial \theta}
\right].
$$

这个梯度不需要反传穿过扩散 U-Net 的所有内部计算，只把 U-Net 输出当作一个图像空间更新方向。直观上，如果当前渲染图加噪后不像 prompt 对应的自然图像，扩散模型会指出应该往哪个方向去噪；NeRF 渲染器再把这个方向传回密度和颜色。

**算法伪代码**

```python
theta = initialize_nerf()
diffusion = frozen_text_to_image_model()
for step in range(num_steps):
    cam = sample_random_camera()
    image = render_nerf(theta, cam)
    t = sample_diffusion_timestep()
    eps = normal_like(image)
    x_t = alpha[t] * image + sigma[t] * eps

    eps_hat = diffusion.predict_noise(x_t, t, text_prompt, guidance_scale=large)
    grad_image = weight(t) * (eps_hat - eps)
    backprop_to_nerf(image, grad_image)
    apply_geometry_regularizers(theta)
```

DreamFusion 还加入了面向 3D 的工程约束，例如随机视角采样、前景/背景处理、法线与深度相关正则，以及鼓励表面朝向相机的 orientation loss。没有这些约束时，SDS 很容易只优化出能骗过单视角扩散模型的纹理云，而不是闭合、可旋转的物体。

这篇论文的历史价值大于其最终视觉质量：它证明了强 2D 扩散模型可以作为通用 3D 先验，开创了 text-to-3D 的 optimization-based 路线。后续 Magic3D、Fantasia3D、ProlificDreamer、MVDream 等工作基本都在回答两个问题：如何改进 SDS 的梯度质量，以及如何换更强、更快、更可编辑的 3D 表示。

#### 🧪 练习题
```yaml
questions:
  - type: concept
    prompt: "DreamFusion 为什么不需要文本-3D 配对数据？"
    answer: "它使用冻结的 2D 文生图扩散模型提供图像先验，再通过可微渲染把图像梯度反传到 3D 表示。"
  - type: formula
    prompt: "SDS 梯度中 eps_hat - eps 表示什么？"
    answer: "它表示扩散模型认为当前加噪渲染图应如何去噪，与实际噪声的差值构成图像空间更新方向。"
  - type: limitation
    prompt: "为什么 DreamFusion 容易出现 Janus 问题？"
    answer: "单视角 2D 扩散先验缺少跨视角一致性约束，多个视角可能各自生成最符合文本的正面语义。"
```
