### Listen Denoise Action — 用扩散模型生成音频驱动人体动作

```yaml
id: lda
name: Listen Denoise Action
full_name: "音频驱动运动合成 (Audio-driven Motion Synthesis)"
year: "2023"
org: "KTH"
paper_url: "https://arxiv.org/abs/2211.09707"
category: "body_motion"
parent: "mdm"
motivation: "扩散模型驱动手势生成"
```

#### 📝 一句话总结

Listen, Denoise, Action! 将 DiffWave 式扩散模型改造成音频条件 3D 人体运动生成器，并用 Conformer、classifier-free guidance 和 product-of-experts 实现高质量手势/舞蹈生成与风格控制。

#### 🎯 核心要点

- **音频驱动扩散运动生成**：用概率扩散模型处理语音手势、音乐舞蹈和路径驱动 locomotion 的一对多问题
- **DiffWave 改造**：从音频波形生成架构迁移到多维 motion sequence 生成
- **Conformer 残差块**：结合 self-attention 和卷积，兼顾长程动作结构与局部节奏模式
- **classifier-free guidance**：训练时随机丢弃风格标签，推理时调节风格强度
- **product-of-experts**：组合多个扩散专家的噪声预测，实现风格插值、跨模型组合和迁移
- **多数据评估**：Trinity Speech-Gesture、ZeroEGGS、Motorica Dance、100STYLE、MMA 等任务
- **主观评测重要**：论文强调 motion realism 和 style appropriateness 需要用户研究辅助判断

#### 🔬 深入细节

##### 核心示意图

![LDA 网络架构](https://ar5iv.labs.arxiv.org/html/2211.09707/assets/x1.png)
*图：LDA 的去噪网络由残差块堆叠组成，残差块内使用 Conformer 处理运动序列，并注入音频、扩散步和风格条件。*

##### 核心流程伪代码

```python
# LDA 训练与推理简化
for motion_x0, audio_cond, style in dataloader:
    n = sample_diffusion_step()
    eps = normal_like(motion_x0)
    x_n = sqrt(alpha_bar[n]) * motion_x0 + sqrt(1 - alpha_bar[n]) * eps

    if random() < p_uncond:
        style = null_style
    eps_hat = conformer_diffwave(x_n, audio_cond, style, n)
    loss = mse(eps_hat, eps)
    loss.backward()

def guided_sample(audio_cond, style, s):
    x = normal_motion()
    for n in reversed(diffusion_steps):
        eps_cond = model(x, audio_cond, style, n)
        eps_uncond = model(x, audio_cond, null_style, n)
        eps = (1 + s) * eps_cond - s * eps_uncond
        x = denoise_step(x, eps, n)
    return x

def product_of_experts_step(x, experts, weights, n):
    eps = sum(w * expert.predict_noise(x, n) for w, expert in zip(weights, experts))
    return denoise_step(x, eps, n)
```

##### 方法解读

音频驱动动作比普通回归更适合概率模型：同一句话可以配很多自然手势，同一段音乐也能跳出不同舞步。确定性 MSE 模型会输出平均动作，表现为手势幅度小、舞蹈无力。LDA 用扩散模型从噪声逐步采样动作序列，天然支持多样结果。

前向扩散为：

$$
q(x_n|x_0)=\mathcal{N}(\sqrt{\bar{\alpha}_n}x_0,(1-\bar{\alpha}_n)I)
$$

去噪网络学习预测噪声：

$$
\mathcal{L}=\mathbb{E}_{n,x_0,\epsilon}\left[\|\epsilon-\epsilon_\theta(x_n,c,n)\|_2^2\right]
$$

其中 \(c\) 包含音频特征和可选风格标签。网络结构继承 DiffWave 的 residual/skip 设计，但把原本的膨胀卷积增强为 Conformer。Conformer 的 self-attention 建模长程身体协调，卷积部分建模局部节奏和短期平滑，对语音手势和舞蹈都很重要。

风格控制使用 classifier-free guidance。训练时以一定概率把风格标签替换为空标签 \(\varnothing\)，推理时组合条件与无条件噪声预测：

$$
\hat{\epsilon}=(1+s)\epsilon_\theta(x_n,c,y,n)-s\epsilon_\theta(x_n,c,\varnothing,n)
$$

\(s\) 越大，风格越明显，但也可能牺牲自然度。这个设计让一个模型可以在推理时连续调节动作风格强度，而不是为每种强度重训模型。

Product-of-experts 是论文的独立亮点。多个扩散模型或同一模型的不同条件都可视为 experts，对每一步噪声预测做加权组合：

$$
\hat{\epsilon}_{poe}=\sum_m \gamma_m\hat{\epsilon}_m
$$

这相当于把多个分布约束相乘：生成结果要同时满足不同专家偏好。论文用它做风格插值、手势风格迁移，以及把舞蹈模型和 MMA/locomotion 模型组合到同一采样过程。

与 MDM 相比，LDA 更强调音频同步和风格化 motion synthesis；与 AIST++/FACT 相比，它从确定性 Transformer 过渡到概率扩散模型，更适合一对多音频-动作映射。

> 💡 关键：LDA 的核心价值是把扩散模型、音频条件、Conformer 时序建模和推理期风格组合放在一个通用动作合成框架里。

#### 🧪 练习题

```yaml
question: "LDA 中 product-of-experts 的主要用途是什么？"
options:
  - "把多个扩散专家的预测组合起来，实现风格插值或跨模型约束"
  - "把音频采样率提高到 48kHz"
  - "替代所有 Conformer 层"
  - "只用于计算训练集大小"
answer: 0
explain: "PoE 在采样时加权组合多个专家的噪声预测，使生成动作同时满足多个条件或风格分布，可用于风格插值和模型组合。"
```
