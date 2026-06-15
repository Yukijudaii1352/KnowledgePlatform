### Motion VAE

```yaml
id: motionvae
name: Motion VAE
full_name: 动作变分自编码器 (Motion Variational Autoencoder)
year: '2017'
org: 爱丁堡大学
paper_url: https://www.research.ed.ac.uk/en/publications/a-recurrent-variational-autoencoder-for-human-motion-synthesis/
category: motion
parent: —
motivation: 递归VAE学习运动潜在空间支持多模态生成
```

#### 📝 一句话总结

Motion VAE 提出 VAE-LSTM 人体运动生成模型，把控制信号编码进变分推断框架，并用自回归 LSTM 解码潜变量序列生成长时域动作。它解决了确定性 RNN 在远期预测中容易平均化、静止化，且难以表达多种可能动作的问题。

#### 🎯 核心要点

- **VAE-LSTM 结构**：用变分潜变量表达动作不确定性，用 LSTM 表达时间依赖。
- **控制信号条件化**：输入用户提供的高层控制信号 \(C_{1:T}\)，让生成动作可控而非完全自由漂移。
- **卷积式时序编码器**：用 1D temporal convolution 编码动作序列和控制序列，提高长片段训练效率。
- **自回归解码器**：LSTM 在低帧率 motion canvas 上递归生成动作，再通过反卷积/上采样恢复完整序列。
- **可学习先验**：学习由控制信号决定的潜空间先验，使推理时不必提供已有动作片段也能采样。
- **ELBO 训练目标**：联合优化重建似然和 KL 散度，平衡动作质量与潜空间可采样性。

#### 🔬 深入细节

##### 核心示意图

![Motion VAE-LSTM 架构图（论文 PDF 第 4 页 Figure 1）](https://www.bmva-archive.org.uk/bmvc/2017/papers/paper119/paper119.pdf#page=4)
*图：原论文没有提供独立图片文件，公开 PDF 第 4 页 Figure 1 展示 VAE-LSTM 架构：控制信号和动作序列经卷积编码，潜变量送入自回归 LSTM 解码器生成 motion canvas，再上采样为完整动作。*

##### 算法伪代码

```text
Algorithm: recurrent variational autoencoder for motion synthesis
# VAE-LSTM 运动生成训练流程
def train_motion_vae(motion X_1T, control C_1T):
    h_c = control_encoder_1d_cnn(C_1T)
    h_x = motion_encoder_1d_cnn(X_1T)

    # approximate posterior q_phi(z_t | X_1T, h_c_t)
    mu_q, logvar_q = inference_network(h_x, h_c)
    z = reparameterize(mu_q, logvar_q)

    # learned conditional prior p_theta(z_t | h_c_t)
    mu_p, logvar_p = prior_network(h_c)

    canvas = []
    state = init_lstm_state()
    for t in reduced_time_grid:
        state = lstm_decoder(state, z[t], h_c[t])
        canvas.append(state_to_pose_feature(state))

    X_hat = deconv_upsampler(canvas)
    loss = reconstruction_loss(X_hat, X_1T)
    loss += kl_divergence_normal(mu_q, logvar_q, mu_p, logvar_p)
    update(loss)

def sample_motion(control C_1T):
    h_c = control_encoder_1d_cnn(C_1T)
    z = sample_from_prior(prior_network(h_c))
    return autoregressive_decode_and_upsample(z, h_c)
```

##### 动机与背景

人体运动长期预测和合成天然是一对多问题。同样的起始状态和目标控制信号，可以对应不同步幅、手臂摆动、转身节奏和身体风格。确定性 RNN 常用均方误差训练，面对多峰分布时会学到“平均动作”，表现为远期动作变钝、脚步漂移或逐渐静止。

Motion VAE 的思路是把多样性显式放进潜变量 \(z\)。VAE 负责学习可采样的运动潜空间，LSTM 负责时间递推，控制信号负责给生成过程提供方向。这样系统既能按用户控制生成动作，又能通过采样得到多种合理变化。

##### 变分目标

标准 VAE 最大化边际似然的证据下界。对动作序列 \(x\) 和控制信号 \(c\)，可写为：

$$
\log p_\theta(x|c) \ge
\mathbb{E}_{q_\phi(z|x,c)}[\log p_\theta(x|z,c)]
-D_{KL}\left(q_\phi(z|x,c)\|p_\theta(z|c)\right)
$$

第一项要求解码动作接近真实动作，第二项要求后验接近条件先验。条件先验 \(p_\theta(z|c)\) 很重要，因为推理阶段没有真实动作 \(x\)，只能根据控制信号采样潜变量。

##### 时序编码与解码

论文使用一维卷积沿时间轴编码 \(X_{1:T}\) 和 \(C_{1:T}\)。卷积会降低时间分辨率，得到较短的 latent time grid。这样训练时不必在每一帧都维护一个昂贵的潜变量，也能让模型看到较长时间上下文。

解码端采用自回归 LSTM。每个低频时间步输入潜变量 \(z_t\) 和控制编码 \(h_t^c\)，输出 motion canvas 的一部分。最后通过反卷积或上采样网络恢复到完整帧率：

$$
\hat{X}_{1:T}=D_{\text{deconv}}\left(\mathrm{LSTM}(z_{1:K}, h^c_{1:K})\right)
$$

> 💡 关键：控制信号降低长期预测的不确定性，潜变量保留同一控制下的多模态动作可能性，LSTM 负责把这些可能性组织成时间连续的运动。

##### 与传统方法的区别

早期运动预测常用确定性 encoder-decoder RNN，把未来动作视为单一答案。Motion VAE 则承认未来动作是概率分布，并通过 KL 正则学习可采样潜空间。相比普通 VAE，它又加入递归解码结构，使潜变量不是一次性生成独立帧，而是驱动一段连贯运动。

这一路线直接影响了后续 action-to-motion 和 text-to-motion 工作。Action2Motion 继承了“动作类别条件 + VAE + 时序生成”的方向，ACTOR 进一步用 Transformer VAE 处理整段变长序列，后续扩散模型则把多模态生成能力推到更强的逐步去噪框架。

#### 🧪 练习题

```yaml
question: "Motion VAE 中条件先验 p(z|c) 的主要作用是什么？"
options:
  - "让推理阶段只凭控制信号就能采样潜变量生成动作"
  - "把所有动作压缩成确定性单一路径"
  - "替代 LSTM 的时间建模能力"
  - "只用于计算 2D 关键点重投影误差"
answer: 0
explain: "训练后推理时没有真实动作可编码，条件先验根据控制信号给出可采样的潜变量分布，从而生成多样但受控的动作。"
```
