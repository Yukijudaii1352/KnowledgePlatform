### Walrus: 跨领域连续介质动力学基础模型

```yaml
id: walrus
name: Walrus
full_name: Walrus (Walrus)
year: '2025'
org: Polymathic AI
paper_url: https://polymathic-ai.org/news/walrus
category: unified_foundation
parent: —
motivation: 连续介质动力学跨领域物理迁移
```

#### 📝 一句话总结

Walrus 提出了一个面向连续介质动力学的 13 亿参数空间-时间 Transformer，用同一模型处理 2D/3D、不同分辨率和不同物理场景的场演化预测。它的关键贡献不是单一 PDE 求解器，而是用自适应 token 化、patch jittering 稳定化和负载均衡训练把多领域物理仿真合成一个可迁移的基础模型。

#### 🎯 核心要点

- 统一任务形式：把流体、声学、等离子体、天体物理、地球科学、流变学等连续场都表示为网格上的多变量状态序列，学习短历史到下一步增量的映射。
- 空间-时间 Transformer：采用 encoder-processor-decoder 结构，encoder/decoder 使用带 stride modulation 的 hMLP/反 hMLP，processor 使用分解的空间注意力和时间注意力。
- 自适应计算 token 化：对不同空间维度、分辨率和长宽比动态调节下采样步幅，使 2D 与 3D 样本进入模型后的 token 数大致可控。
- Patch jittering 稳定化：训练/滚动时随机平移参考坐标系再反向平移输出，降低固定 patch 下采样带来的混叠和长期滚动伪影。
- 数据与训练规模：公开材料描述其在 19 个物理场景、63 个物理变量、2D/3D 数据上联合训练，并发布代码、权重和微调检查点。
- 迁移方式：预训练模型可零样本滚动，也可在新物理场景上用少量高保真轨迹微调，作为昂贵数值仿真的 surrogate model。

#### 🔬 深入细节

##### 1. 图示与来源

![Walrus 架构示意图](https://raw.githubusercontent.com/PolymathicAI/walrus/main/assets/ArchitectureWIP.png)

*图：Walrus 官方仓库中的整体架构图，展示从物理场输入、patch/token 表示、空间-时间处理器到预测输出的流程。*

可访问来源包括 arXiv 论文页面 `https://arxiv.org/abs/2511.15684`、官方仓库 `https://github.com/PolymathicAI/walrus`、Hugging Face 模型卡 `https://huggingface.co/polymathic-ai/walrus`。任务给出的 `paper_url` 是新闻/项目页，因此本文优先依据 arXiv 摘要、官方代码仓库和模型卡；部分训练损失细节按物理 surrogate 的公开实现范式整理，未公开的超参数不作臆测。

##### 2. 问题形式：从场历史预测下一步增量

连续介质仿真的状态可写成多通道场 \(u_t(x)\)，例如密度、速度、压力、温度或磁场分量。Walrus 不为每个方程族设计专用网络，而是把最近 \(\tau\) 个时间步组织为历史窗口：

$$
U_t = [u_{t-\tau+1}, \ldots, u_t]
$$

模型学习一个增量预测器：

$$
\Delta \hat{u}_{t+1} = M_\theta(U_t, m), \qquad \hat{u}_{t+1}=u_t+\Delta \hat{u}_{t+1}
$$

其中 \(m\) 表示变量索引、网格元信息、边界/数据源等条件信息。训练时通常对真实增量 \(\Delta u_{t+1}=u_{t+1}-u_t\) 做归一化回归：

$$
\mathcal{L}_{\text{step}}
= \sum_{c \in \mathcal{C}} w_c
\left\|
\frac{\Delta \hat{u}^{(c)}_{t+1}-\Delta u^{(c)}_{t+1}}{\sigma_c+\epsilon}
\right\|_2^2
$$

这种“预测增量而不是绝对状态”的形式有两个好处：一是不同物理量的动态尺度更容易归一化，二是在自回归滚动时可直接把输出反馈为下一步输入。

##### 3. 架构机制：自适应 token 化与空间-时间处理

Walrus 的 encoder 把网格场压缩成 token 序列。传统 ViT/PDE surrogate 往往使用固定 patch 大小，这在多分辨率、多维度训练中会导致 token 数暴涨或过度压缩。Walrus 使用 stride modulation 动态调节下采样，使内部 token 网格保持近似目标大小；公开 README 中给出的预训练设置是 2D 内部尺度约为每维 32/33，3D 约为每维 16/17。

processor 部分采用分解注意力：空间注意力负责同一时间片内的远程空间相互作用，时间注意力负责历史帧之间的信息整合。相比分别训练 2D 模型、3D 模型和单一方程模型，这种结构把“局部守恒、波动传播、扩散、旋涡输运”等跨领域动力学模式压到同一参数空间中。

##### 4. Patch jittering：用随机坐标平移抑制混叠

固定 patch 化和转置卷积上采样容易产生网格对齐伪影；这些误差在单步预测中可能很小，但自回归滚动会不断放大。Walrus 的 patch jittering 在每一步随机平移输入参考系，模型输出后再反向平移回原坐标。

从频域直觉看，下采样-上采样组合会让高频分量折叠到低频。若下采样倍率为 \(P=N/M\)，输出频谱可概括为：

$$
\hat{v}[k]
= \hat{h}[k]\hat{g}[k]\hat{u}[k]
+ \sum_{j=1}^{P-1}\hat{h}[k]\hat{g}[k+jM]\hat{u}[k+jM]
$$

第二项就是由固定采样格点引入的混叠。若对输入施加随机平移 \(s\)，再对输出反平移，混叠项会乘上相位因子：

$$
\mathbb{E}_s\left[e^{-i2\pi s jM}\right] \approx 0
$$

因此期望意义下混叠被平均掉，长期 rollout 中的棋盘格/条纹伪影更难持续积累。

##### 5. 核心训练与推理伪代码

```python
# Walrus-style continuum dynamics pretraining
for step in range(num_steps):
    source = load_balanced_sampler.pick_dataset()  # 2D/3D heterogeneous sources
    fields = source.sample_window(length=tau + 1)
    history = normalize(fields[:tau])
    target_delta = normalize(fields[tau] - fields[tau - 1])

    shift = sample_spatial_shift()                 # patch jittering
    history_j = translate_with_padding(history, shift)

    tokens = adaptive_patch_embed(history_j, target_internal_grid=source.target_grid)
    latent = spacetime_transformer(tokens, variable_metadata=source.variables)
    pred_delta_j = decoder(latent)
    pred_delta = inverse_translate(pred_delta_j, shift)

    loss = weighted_mse(pred_delta, target_delta)
    loss.backward()
    optimizer.step()

# autoregressive rollout
context = observed_initial_window
for _ in range(forecast_steps):
    delta = walrus(context)
    next_state = context[-1] + denormalize(delta)
    context = append_and_drop_oldest(context, next_state)
```

##### 6. 与传统 PDE surrogate 的区别

传统 FNO、UNet 或专用 Transformer 往往假设固定网格、固定方程族和固定变量集合；它们在一个数据集上很强，但跨数据集迁移时需要重新设计输入通道、分辨率策略和训练流程。Walrus 的目标是把这些差异抽象为 token 化、变量元数据和数据采样问题，让一个大模型跨物理域共享表征。

这并不意味着 Walrus 替代数值求解器。它更适合作为快速近似器：用短历史状态生成多步预测，用于参数扫描、初筛、交互式分析或给下游优化提供廉价 rollout。对守恒律严格性、极端外推和未见边界条件仍需通过物理校验或高保真仿真复核。

#### 🧪 练习题

```yaml
question: "Walrus 中 patch jittering 的主要作用是什么？"
options:
  - "随机丢弃物理变量以降低显存占用"
  - "随机平移输入参考系并反平移输出，削弱固定 patch 下采样导致的混叠伪影"
  - "把所有 3D 数据投影成 2D 图像以便使用 ViT"
  - "用语言 token 替代连续物理场"
answer: 1
explain: "patch jittering 的核心是随机化采样网格相位，使固定 patch 化产生的混叠项在期望上被抵消，从而提升长期自回归预测稳定性。"
```
