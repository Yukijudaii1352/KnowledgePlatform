### MDM — 面向人体动作的文本/动作条件扩散生成模型

```yaml
id: mdm
name: MDM
full_name: "人体运动扩散模型 (Human Motion Diffusion Model)"
year: "2022"
org: "Tel Aviv Univ."
paper_url: "https://arxiv.org/abs/2209.14916"
category: "body_motion"
parent: "smplx"
motivation: "文本动作条件扩散运动生成"
```

#### 📝 一句话总结

MDM 将 classifier-free diffusion 适配到人体动作序列，用 Transformer 直接预测干净 motion sample，并引入几何损失和运动 inpainting，使文本到动作、动作类别到动作和局部编辑共享同一框架。

#### 🎯 核心要点

- **Transformer backbone**：不用图像扩散常见 U-Net，而用适合时间序列的 Transformer encoder/decoder 结构
- **\(x_0\)-prediction**：每个扩散步预测最终干净 motion \(\hat{x}_0\)，而不是只预测噪声
- **几何损失可用**：因为预测 \(\hat{x}_0\)，可以直接在关节位置、速度和脚接触上加 loss
- **classifier-free guidance**：训练时随机丢弃条件，推理时用 guidance scale 平衡保真度和多样性
- **多任务条件**：同一架构支持 text-to-motion、action-to-motion、unconditional generation
- **动作编辑**：把已知关节或时间段固定，在未知部分扩散去噪，实现 in-betweening 和 body-part editing
- **基准数据**：HumanML3D、KIT、HumanAct12、UESTC 等

#### 🔬 深入细节

##### 核心示意图

![MDM 架构图](https://guytevet.github.io/mdm-page/static/figures/mdm_arch.png)
*图：MDM 将 noisy motion、扩散步和文本/动作条件输入 Transformer，在每个采样步预测干净 motion sample。*

##### 核心流程伪代码

```python
# MDM 训练和 classifier-free sampling 简化
for x0, condition in motion_dataset:
    if random() < p_uncond:
        condition = null_condition
    t = sample_timestep()
    eps = normal_like(x0)
    xt = sqrt(alpha_bar[t]) * x0 + sqrt(1 - alpha_bar[t]) * eps

    x0_hat = transformer_mdm(xt, timestep=t, condition=condition)
    loss = mse(x0_hat, x0)
    loss += lambda_pos * joint_position_loss(x0_hat, x0)
    loss += lambda_vel * joint_velocity_loss(x0_hat, x0)
    loss += lambda_foot * foot_contact_loss(x0_hat)
    loss.backward()

def sample(condition, scale=2.5):
    xt = normal_motion()
    for t in reversed(diffusion_steps):
        cond = transformer_mdm(xt, t, condition)
        uncond = transformer_mdm(xt, t, null_condition)
        x0_hat = uncond + scale * (cond - uncond)
        xt = diffusion_reverse_step(xt, x0_hat, t)
    return x0_hat
```

##### 方法解读

人体动作生成天然是一对多问题：“a person walks forward and waves” 可以对应无数合理动作。扩散模型适合表达这种多模态分布，但直接照搬图像 U-Net 并不合适，因为 motion 是关节时间序列，不是二维局部纹理。MDM 因此用 Transformer 处理 \(N\) 帧动作 token，并把条件和 timestep 注入序列建模。

扩散前向过程是标准 DDPM：

$$
x_t=\sqrt{\bar{\alpha}_t}x_0+\sqrt{1-\bar{\alpha}_t}\epsilon
$$

MDM 的关键选择是预测 \(\hat{x}_0=G_\theta(x_t,t,c)\)，训练目标为：

$$
\mathcal{L}_{simple}=\mathbb{E}\left[\|x_0-G_\theta(x_t,t,c)\|_2^2\right]
$$

相比噪声预测，\(x_0\)-prediction 让模型输出直接处在动作空间，因此能额外计算几何损失。例如关节位置损失约束骨架位置，速度损失抑制抖动，脚接触损失减少 foot sliding。这些 motion-domain 先验对人类感知质量很关键。

文本条件通常来自 CLIP text embedding；动作类别条件则用 learned action embedding。classifier-free training 随机把条件替换为空条件，使同一模型同时学条件分布和无条件分布。采样时使用：

$$
\hat{x}_{0,guided}=\hat{x}_{0,\varnothing}+s(\hat{x}_{0,c}-\hat{x}_{0,\varnothing})
$$

较大的 \(s\) 会更贴合文本，但可能降低多样性；论文在实验中讨论了 guidance scale 的折中。

MDM 的另一个实用点是 motion editing。因为扩散采样可以在每一步把已知区域重新写回，模型能只生成缺失关节、缺失时间段或指定 body part。这样同一个模型既能做 text-to-motion，也能做 in-betweening 和局部语义编辑。

> 💡 关键：MDM 把扩散模型的概率生成能力和人体动作领域的几何约束结合起来，核心设计是 Transformer + \(x_0\)-prediction + classifier-free guidance。

#### 🧪 练习题

```yaml
question: "MDM 为什么选择预测干净动作 x0 而不是只预测噪声 epsilon？"
options:
  - "因为这样可以直接在预测动作上施加关节位置、速度和脚接触等几何损失"
  - "因为 Transformer 不能预测噪声"
  - "因为文本条件只能输入 x0"
  - "因为扩散过程不再需要加噪"
answer: 0
explain: "预测 x0 后，模型输出具有动作几何意义，可以计算 motion-domain losses；这些损失对减少抖动、脚滑和不自然姿态很有帮助。"
```
