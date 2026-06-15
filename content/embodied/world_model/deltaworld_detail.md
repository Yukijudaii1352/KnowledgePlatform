### 增量世界 (Efficient World Modeling with Delta Tokens)

```yaml
id: deltaworld
name: DeltaWorld
full_name: 增量世界 (Efficient World Modeling with Delta Tokens)
year: "2026.04"
org: ETH Zurich
paper_url: https://arxiv.org/abs/2604.04913
category: generative
parent: genie2
motivation: 仅编码帧间差异计算量降低2000倍
```

#### 📝 一句话总结

DeltaWorld 提出用 DeltaTok 将相邻帧在视觉基础模型特征空间中的变化压缩成单个连续 delta token，并在这些 token 上训练生成式世界模型，解决了视频世界模型因空间 token 过多和多次采样导致的高计算成本问题。

#### 🎯 核心要点

- **DeltaTok 单 token 差分压缩**：只编码相邻帧 VFM 特征差异，而不是重建整帧空间特征图
- **一维时间序列世界模型**：将视频从时空三维 token 网格压缩为每帧一个 delta token 的时间序列
- **Best-of-Many 生成训练**：并行产生多个未来假设，只监督最接近真实未来的样本
- **单次前向多未来预测**：推理时用不同噪声查询在一次前向中输出多个合理未来
- **密集预测评估**：在 Cityscapes、VSPW 语义分割和 KITTI 深度预测等 dense forecasting 任务上评估
- **高效率收益**：论文报告相对既有生成式世界模型参数少 35 倍以上、FLOPs 少约 2000 倍

#### 🔬 深入细节

![DeltaWorld 总览](https://deltatok.github.io/assets/fig4_deltaworld.svg)
*图：DeltaWorld 使用单个 delta token 表示每个未来步的视觉变化，并在 token 序列上生成多种未来。*

##### 算法伪代码

```python
# DeltaWorld 训练与推理核心流程
for video in dataset:
    features = frozen_vfm(video.frames)              # DINO/CLIP 类 VFM patch features
    delta_tokens = []
    for t in range(1, T):
        z_t = DeltaTok.encode(features[t - 1], features[t])
        delta_tokens.append(z_t)

    # Best-of-Many: 一次生成 K 个未来 token 假设
    hypotheses = DeltaWorld(context=delta_tokens[:c], noise_queries=sample_noise(K))
    losses = [smooth_l1(h, target_delta_tokens) for h in hypotheses]
    loss = min(losses)                               # 只监督最接近真实未来的样本
    update(loss)

# 推理
samples = DeltaWorld(context_delta_tokens, sample_noise(K))
future_features = rollout_decode(previous_feature, samples, DeltaTok.decode)
```

##### 动机与背景

视频世界模型需要预测未来，而真实未来通常是多模态的：行人可能左转或直行，车辆可能加速或减速。判别式模型用回归损失输出单一预测，容易变成“平均未来”；扩散或自回归生成模型可以采样多种未来，但常常需要多次前向、逐空间 patch 生成，成本很高。

DeltaWorld 的切入点是：下游任务并不总需要像素级重建，很多决策任务只需要 VFM 特征中的语义和几何信息。更进一步，相邻帧的大部分内容不变，真正需要预测的是“从上一帧到下一帧发生了什么”。因此论文把目标从“生成整帧特征图”改成“生成单个变化 token”。

##### 核心机制：DeltaTok

给定相邻两帧的视觉基础模型特征 \(F_{t-1}\) 与 \(F_t\)，DeltaTok 编码器学习一个紧凑表示：

$$
z_t = E_{\Delta}(F_{t-1}, F_t)
$$

解码器则利用上一帧特征和 delta token 重建当前帧特征：

$$
\hat{F}_t = D_{\Delta}(F_{t-1}, z_t)
$$

训练目标是让 \(\hat{F}_t\) 接近 \(F_t\)，通常可用 MSE 或 smooth L1 形式：

$$
\mathcal{L}_{tok} = \|D_{\Delta}(F_{t-1}, E_{\Delta}(F_{t-1}, F_t)) - F_t\|_2^2
$$

这个设计的直觉很直接：如果场景没有变化，delta token 可以接近“无变化”；如果只有局部运动，token 只需表达变化的语义方向，而不用重新携带整张图的空间背景。

##### 生成式世界模型与 Best-of-Many

DeltaWorld 在 delta token 序列上预测未来。设历史 token 为 \(z_{1:c}\)，模型用多个随机查询 \(\epsilon_k\) 生成 \(K\) 个未来候选：

$$
\hat{z}_{c+1:T}^{(k)} = f_{\theta}(z_{1:c}, \epsilon_k)
$$

Best-of-Many 训练只对最接近真实未来的候选反传：

$$
\mathcal{L}_{BoM} = \min_{k \in \{1,\dots,K\}} d(\hat{z}_{c+1:T}^{(k)}, z_{c+1:T})
$$

这避免了普通回归把多种未来平均掉，也避免了扩散模型多步 denoising 的高开销。推理时保留所有候选，就能在单次前向里获得多样未来。

##### 与传统视频生成世界模型的区别

传统视频生成器通常在像素 latent 或空间 patch token 上建模，序列长度随分辨率和时间一起增长。DeltaWorld 通过 delta token 将每个时间步压到一个 token，使未来预测主要沿时间维展开。对 \(512 \times 512\) 输入，论文报告可达到约 \(1024\times\) token reduction；在另一个 DINO-Foresight 迁移实验中，delta token 也可带来约 \(2048\times\) token reduction。

> 💡 关键：DeltaWorld 不是追求直接生成最漂亮的 RGB 视频，而是让世界模型在 VFM 特征空间中高效生成“对下游感知任务有用”的多未来表示。

#### 🧪 练习题

```yaml
question: "DeltaWorld 计算量显著下降的核心原因是什么？"
options:
  - "完全取消未来预测，只复制最后一帧"
  - "把每帧空间特征图压缩成表示帧间变化的单个 delta token"
  - "使用更大的扩散模型减少训练轮数"
  - "只在低分辨率 RGB 像素上训练"
answer: 1
explain: "DeltaTok 只编码相邻帧的 VFM 特征差异，将时空 token 网格压缩为一维时间 token 序列，因此生成多个未来的成本大幅降低。"
```
