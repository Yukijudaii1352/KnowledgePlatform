### MDM：面向人体动作的扩散生成框架

```yaml
id: mdm
name: MDM
full_name: 动作扩散模型 (Motion Diffusion Model)
year: '2022'
org: 特拉维夫大学
paper_url: https://arxiv.org/abs/2209.14916
category: motion
parent: actor
motivation: 首个将扩散模型应用于动作生成的框架
```

#### 📝 一句话总结
MDM 将 classifier-free diffusion 引入人体运动生成，并选择直接预测干净动作样本 $\hat{x}_0$，从而能在扩散训练中加入位置、速度和脚接触等人体几何损失。

#### 🎯 核心要点
- **统一框架**：同一扩散模型可支持文本到动作、动作类别到动作、无条件生成、动作补全和局部编辑。
- **关键设计**：不同于常见 DDPM 预测噪声 $\epsilon$，MDM 预测原始动作 $x_0$，便于在真实姿态空间上施加几何约束。
- **网络结构**：使用 Transformer encoder 作为去噪网络，输入带噪动作 $x_t$、时间步 $t$ 和条件 $c$。
- **条件控制**：文本条件通常由 CLIP 文本编码器提供，训练时随机丢弃条件以实现 classifier-free guidance。
- **几何损失**：在关节位置、速度和脚接触上加额外约束，缓解动作生成中常见的漂移、脚滑和不自然速度。
- **影响**：MDM 把动作生成从 VAE/GAN 范式推向扩散模型范式，成为后续 PriorMDM、guided motion editing、simulation-in-the-loop 方法的重要基础。

#### 🔬 深入细节
![MDM architecture](https://guytevet.github.io/mdm-page/static/figures/mdm_arch.png)

MDM 的前向扩散过程与 DDPM 一致：从真实动作序列 $x_0$ 逐步加入高斯噪声得到 $x_t$。如果 $\bar{\alpha}_t$ 是累计噪声日程，则：
$$
q(x_t\mid x_0)=\mathcal{N}\left(\sqrt{\bar{\alpha}_t}x_0,\,(1-\bar{\alpha}_t)I\right)
$$
模型学习反向去噪，但输出不是噪声，而是对干净动作的估计：
$$
\hat{x}_0=f_\theta(x_t,t,c)
$$

直接预测 $x_0$ 是 MDM 最重要的工程选择。动作不是图像像素，姿态序列有显式骨架结构、关节速度和接触状态；如果模型只预测噪声，几何损失很难自然作用到最终动作上。预测 $\hat{x}_0$ 后，可以把它送入前向运动学，计算关节位置、速度和脚接触约束：
$$
\mathcal{L}=\lVert x_0-\hat{x}_0\rVert_2^2+\lambda_{pos}\mathcal{L}_{pos}+\lambda_{vel}\mathcal{L}_{vel}+\lambda_{fc}\mathcal{L}_{foot}
$$

条件控制采用 classifier-free guidance。训练时以一定概率把条件置空，让同一个网络同时学习 $f_\theta(x_t,t,c)$ 和 $f_\theta(x_t,t,\varnothing)$；采样时用指导强度 $s$ 调整条件影响：
$$
\tilde{f}=f_\theta(x_t,t,\varnothing)+s\left(f_\theta(x_t,t,c)-f_\theta(x_t,t,\varnothing)\right)
$$
这使 MDM 能在“更贴合文本/类别”和“更多样自然”之间调节。

MDM 的另一个价值是任务统一。文本到动作时 $c$ 是 CLIP 文本嵌入；动作类别到动作时 $c$ 是类别嵌入；补全和编辑时则把已知帧或已知身体部位作为扩散 inpainting 的约束。相比 ACTOR 的单步 VAE 采样，扩散的多步去噪更慢，但它提供了更强的分布建模能力和更灵活的条件插入方式。

```text
Algorithm: MDM sampling with classifier-free guidance
Input: condition c, number of frames T, diffusion steps K
1. Initialize x_K ~ N(0, I) with shape [T, joints, features]
2. For k = K down to 1:
     a. Predict x0_cond = f_theta(x_k, k, c)
     b. Predict x0_uncond = f_theta(x_k, k, empty)
     c. Combine x0_hat = x0_uncond + s * (x0_cond - x0_uncond)
     d. Use diffusion posterior p(x_{k-1} | x_k, x0_hat) to sample x_{k-1}
     e. If doing editing or in-betweening, re-impose known motion constraints
3. Return x_0 as the generated motion
Output: text/action-conditioned human motion
```

#### 🧪 小练习
```yaml
exercise:
  question: MDM 为什么选择预测 x0 而不是预测噪声 epsilon？
  hint: 从人体动作的几何损失、脚接触损失以及前向运动学可解释性出发分析。
```
