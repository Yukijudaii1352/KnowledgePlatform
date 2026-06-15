### 占据空 (4D Occupancy Generation)

```yaml
id: occsora
name: OccSora
full_name: 占据空 (4D Occupancy Generation)
year: "2026.02"
org: Tsinghua University
paper_url: https://ieeexplore.ieee.org/abstract/document/11511396/
category: generative
parent: sora
motivation: 利用4D占据栅格提供几何稳定环境
```

#### 📝 一句话总结

OccSora 提出面向自动驾驶的扩散式 4D occupancy 世界模型，用 4D 场景 tokenizer 压缩长时序占据栅格，再用轨迹条件 DiT 生成未来占据 token，解决自回归 occupancy 预测长时程低效且几何稳定性不足的问题。

#### 🎯 核心要点

- **公开资料限制**：清单中的 IEEE 链接可能对应后续版本；主要可访问论文和图源为 arXiv:2405.20337 与项目页
- **4D occupancy 表征**：用体素语义占据网格表示 3D 场景，并显式加入时间维度
- **4D scene tokenizer**：通过类别嵌入、3D encoder、codebook 量化和 3D decoder 压缩/重建占据视频
- **扩散式世界模型**：在离散/潜在 occupancy token 空间中加噪与去噪，避免逐步自回归生成长序列
- **轨迹条件控制**：将 ego vehicle trajectory 作为条件嵌入，使生成结果与车辆运动逻辑一致
- **nuScenes + Occ3D 评估**：基于 nuScenes occupancy 标注验证 16 秒级 4D occupancy 生成能力

#### 🔬 深入细节

![OccSora 总体流程](https://arxiv.org/html/2405.20337v1/x2.png)
*图：OccSora 先用 4D occupancy tokenizer 压缩真实占据序列，再用轨迹条件扩散 Transformer 从噪声生成可控 4D occupancy token。*

##### 算法伪代码

```python
# OccSora: tokenizer + trajectory-conditioned diffusion world model
for occ_video, ego_traj in dataset:
    # 1. 4D occupancy scene tokenizer
    category_tokens = category_embedding(occ_video)       # [D, H, W, T] semantic occupancy
    latent = encoder3d(category_tokens)                   # spatiotemporal compression
    quantized = nearest_codebook(latent)                  # vector quantization
    recon_occ = decoder3d(quantized)
    tokenizer_loss = reconstruction_loss(recon_occ, occ_video) + vq_loss(latent, quantized)

    # 2. diffusion world model on compressed tokens
    eps = normal_like(quantized)
    noisy_tokens, step = add_noise(quantized, eps)
    traj_embed = mlp(ego_traj)
    eps_pred = diffusion_transformer(noisy_tokens, step, condition=traj_embed)
    diffusion_loss = mse(eps_pred, eps)

    update(tokenizer_loss + diffusion_loss)

# sampling
tokens = denoise_from_gaussian(condition=target_trajectory)
generated_4d_occ = decoder3d(tokens)
```

##### 动机与背景

自动驾驶世界模型需要理解“车辆如何运动”和“周围 3D 场景如何随时间演化”的耦合关系。只生成前视 RGB 视频容易缺失三维空间约束；只预测下一步 occupancy 又容易受自回归误差累积限制，长时程生成效率低。

OccSora 将世界状态放在 4D occupancy 空间中：每个体素位置不仅记录是否被占据，还记录语义类别，并沿时间维形成 occupancy video。这种表示比 RGB 更接近规划与安全决策所需的几何结构，也更容易检查物体是否穿插、道路空间是否连续。

##### 4D Scene Tokenizer

输入 4D occupancy 可抽象为：

$$
R_{in} \in \mathbb{R}^{D \times H \times W \times T}
$$

类别嵌入后，3D encoder 在空间和时间维上共同下采样，得到低维 latent：

$$
R_{latent} = \tau_{en}(R_{in})
$$

再用 codebook 做向量量化：

$$
z_i = \arg\min_{e_j \in \mathcal{C}} \|R_{latent,i} - e_j\|_2
$$

最后 3D decoder 将 token 还原为原始分辨率 occupancy。这个 tokenizer 的作用类似视频 VQ-VAE，但处理对象不是 RGB，而是 4D 占据语义体。

##### 轨迹条件扩散生成

扩散模型在 tokenizer 的 latent token 空间工作。前向过程逐步加入高斯噪声：

$$
q(z_t \mid z_0) = \mathcal{N}(\sqrt{\bar{\alpha}_t}z_0,\ (1-\bar{\alpha}_t)I)
$$

去噪网络学习在给定 ego 轨迹 \(a\) 和扩散步 \(t\) 时预测噪声：

$$
\mathcal{L}_{diff} =
\mathbb{E}_{z_0,\epsilon,t,a}\left[
\|\epsilon - \epsilon_{\theta}(z_t, t, a)\|_2^2
\right]
$$

轨迹 \(a\) 被编码为条件向量并注入 Transformer token 序列，使模型学会“车辆直行/右转/静止”对应的未来场景演化差异。

##### 与自回归 occupancy 世界模型的区别

OccWorld 等方法通常按时间递推下一帧 occupancy token，误差会在长 rollout 中累积。OccSora 用扩散模型一次性建模完整时空 occupancy token 分布，把长序列生成转化为条件去噪问题，因此更适合生成 16 秒级长时序场景。

> 💡 关键：OccSora 的世界模型不是“像素视频模拟器”，而是“可控 4D 几何-语义场景模拟器”，因此更贴近自动驾驶规划对可通行空间和动态障碍物的需求。

#### 🧪 练习题

```yaml
question: "OccSora 为什么选择 4D occupancy 作为世界状态？"
options:
  - "因为 occupancy token 可以直接替代所有相机图像传感器"
  - "因为 4D occupancy 同时表达 3D 几何、语义和时间演化，更适合自动驾驶规划"
  - "因为扩散模型只能处理体素数据，不能处理 RGB"
  - "因为轨迹条件只能加到 occupancy decoder 上"
answer: 1
explain: "4D occupancy 将空间占据、语义类别和时间演化统一起来，比纯 RGB 更能提供几何稳定的驾驶环境表示。"
```
