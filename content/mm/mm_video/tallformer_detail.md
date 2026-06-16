### TallFormer — 长程Transformer (TAL Long-Memory Transformer)

```yaml
id: tallformer
name: TallFormer
full_name: 长程Transformer (TAL Long-Memory Transformer)
year: '2022'
org: UNC
paper_url: https://link.springer.com/chapter/10.1007/978-3-031-19830-4_29
category: localization
parent: afsd
motivation: 长程记忆处理超长视频
topic_id: mm_video
yaml_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video.yaml
output_path: /mnt/dhwfile/raise/user/wanghaoyu/KnowledgePipeline/content/mm/mm_video/tallformer_detail.md
```

#### 📝 一句话总结

TallFormer 提出带长时记忆的端到端时序动作定位 Transformer，只在线处理少量采样 clip，并从 per-video long memory 中读取其余 clip 特征，从而在有限显存下同时保留强短时视频 Transformer 与长程边界定位能力。

#### 🎯 核心要点

- **Long Memory Module (LMM)**：为每个训练视频缓存所有短 clip 的特征，当前迭代只重算采样 clip，其余 clip 直接从 memory 读取
- **端到端高分辨率训练**：避免冻结 backbone 或降低空间分辨率，使 VideoSwin 等强视频 Transformer 能用于长视频 TAL
- **Uniform random clip sampling**：每轮训练随机选择 \(N_s\) 个 clip 经过 short-term encoder，未选 clip 用历史特征近似
- **Temporal Consistency Module (TCM)**：用多层 Transformer 让在线新特征和 memory 旧特征交互，缓解两者分布不一致
- **一阶段边界定位模块**：在 THUMOS14 上结合 DaoTAD 风格检测头，在 ActivityNet-1.3 上结合 AFSD 风格检测头，并减少对外部分类器的依赖
- **训练与推理分离**：训练阶段用 memory 节省显存和计算；推理阶段可直接用 short-term encoder 抽取全部 clip 特征

#### 🔬 深入细节

##### 核心架构图

![TallFormer 长记忆框架图](https://ar5iv.labs.arxiv.org/html/2204.01680/assets/x2.png)
*图：TallFormer 只把随机采样 clip 送入短时 Transformer，其余位置读取 long memory；融合后的全视频特征进入 TCM 和边界定位模块。*

##### 算法伪代码

```python
# TallFormer 长记忆训练流程伪代码
def tallformer_train_step(video_id, clips, long_memory, encoder, tcm, tblm, r):
    # clips: [N_c, L_c, H, W, 3]
    # long_memory[video_id]: [N_c, L_f, C_f]
    N_c = len(clips)
    sampled_idx = uniform_sample(N_c, ratio=r)          # N_s 个 clip 在线编码
    remaining_idx = [i for i in range(N_c) if i not in sampled_idx]

    # 1. Short-term Transformer Encoder
    sampled_features = encoder(clips[sampled_idx])      # 有梯度

    # 2. Long Memory Module
    memory_features = long_memory[video_id][remaining_idx]  # 无需重算、无梯度
    long_memory[video_id][sampled_idx] = stop_gradient(sampled_features)

    # 3. 按原始时间顺序拼回全视频特征
    features = zeros_like_full_video_feature(N_c)
    features[sampled_idx] = sampled_features
    features[remaining_idx] = memory_features
    features = features.reshape(N_c * L_f, C_f)

    # 4. Temporal Consistency Module
    for _ in range(L):
        features = TransformerLayer(features)

    # 5. Temporal Boundary Localization Module
    detections = tblm(features)
    loss = detection_loss(detections)
    loss.backward()
    return detections
```

##### 方法详解

**动机与背景**

时序动作定位需要同时解决两个尺度的问题：短时 clip 内要有强视觉表示，长视频全局上要准确定位动作边界。早期 TAL 方法常把这两步拆开：先离线提取 I3D/TSN 等 action recognition 特征，再训练边界定位模型。这样显存低、速度快，但 feature extractor 不是为定位任务端到端优化的。AFSD、DaoTAD 等端到端方法推进了这一点，但为了装进显存，通常要降低输入分辨率、缩短 temporal support 或冻结部分 backbone。

TallFormer 的核心观察是：长视频相邻 clip 高度冗余，训练时没有必要每轮都重算全部 clip 的 Transformer 特征。设一个视频被切成 \(N_c\) 个不重叠 clip，当前迭代只采样 \(N_s\) 个 clip 送入 VideoSwin 等 short-term Transformer，采样比例为：

$$
r=\frac{N_s}{N_c}
$$

理想情况下，短时 encoder 的主要显存和计算开销也近似按 \(r\) 缩减。剩余 \(N_c-N_s\) 个 clip 的特征从 long memory 中读取，这使模型仍然能把完整视频的时序上下文交给边界定位模块。

**Long Memory Module**

LMM 是 TallFormer 的关键。它为每个训练视频维护一个特征缓存：

$$
M_V \in \mathbb{R}^{N_c \times L_f \times C_f}
$$

其中 \(N_c\) 是 clip 数，\(L_f\) 是每个 clip 输出的短时 token/feature 长度，\(C_f\) 是特征维度。当前迭代采样索引集合 \(I\)，未采样集合 \(I'\)。在线 encoder 只计算：

$$
f_I^{(s)} = E_\theta(c_I)
$$

未采样特征直接读取：

$$
f_{I'}^{(l)} = M_V[I']
$$

随后把新计算的 sampled features 写回 memory：

$$
M_V[I] \leftarrow \mathrm{stopgrad}(f_I^{(s)})
$$

这里 `stopgrad` 很重要：memory 里的旧特征不参与反向传播，所以不会把梯度图扩展到所有历史 clip。由于 encoder 通常从 Kinetics 等大规模动作识别预训练开始，并且学习率小于后续定位模块，特征随训练变化相对缓慢，缓存近似在实践中可行。

**Temporal Consistency Module**

LMM 带来一个副作用：同一个视频的特征来自两个时间点，在线采样 clip 是当前 encoder 输出，memory clip 可能是若干迭代之前的 encoder 输出。直接拼接会产生 temporal inconsistency。TallFormer 用 Temporal Consistency Module 处理这个问题。

先按原时间顺序构造全视频特征 \(g\)：

$$
g[i]=
\begin{cases}
f_i^{(s)}, & i\in I \\
f_i^{(l)}, & i\in I'
\end{cases}
$$

然后用 \(L\) 层 TransformerLayer 让所有 clip 特征全局交互：

$$
h^{(0)}=g,\qquad h^{(\ell)}=\mathrm{TransformerLayer}(h^{(\ell-1)}),\quad \ell=1,\ldots,L
$$

TCM 的作用不是再做短时视频编码，而是把新旧来源的 clip-level 表示拉到同一分布，同时用 self-attention 建模完整视频范围内的长程依赖。论文默认使用 3 层 TCM，并采用相对位置编码、GELU 和 DropPath。

**Temporal Boundary Localization Module**

TCM 输出的 refined features 会送入 TBLM 预测动作边界与类别。TallFormer 不是重新发明检测头，而是把强 backbone 和 long memory 接到成熟 TAL head 上：THUMOS14 使用 DaoTAD 风格的 FPN + detection head，分类分支用 focal loss，回归分支用 DIoU loss；ActivityNet-1.3 使用 AFSD 风格的 basic prediction + saliency refinement，并额外加入视频级分类器。

可以把总体训练目标概括为：

$$
\mathcal{L}_{TallFormer}
=\mathcal{L}_{TBLM}(h^{(L)}, \Phi)
+\lambda_{video}\mathcal{L}_{video\_cls}
$$

其中 \(\Phi\) 表示动作边界和类别标注。对 ActivityNet-1.3，\(\mathcal{L}_{TBLM}\) 包含 AFSD 中的 focal classification、basic prediction tIoU regression、saliency refinement L1 regression 等损失；\(\mathcal{L}_{video\_cls}\) 来自 TCM 特征的 global average pooling、dropout 和线性分类器。对 THUMOS14，则主要是 DaoTAD head 的分类与边界回归损失。

**训练、推理与设计取舍**

训练阶段，TallFormer 的 memory 是“encoder 近似器”：未采样 clip 的 feature 不再在线计算，从而允许模型使用更强的 VideoSwin-B、更高空间分辨率和更长 temporal support。相比传统 memory bank 只作为辅助信息，TallFormer 直接把 memory feature 当作检测输入的一部分，这是它能保持长程定位能力的原因。

推理阶段，论文不再需要 LMM：因为没有反向传播，显存压力大幅降低，可以用 short-term Transformer encoder 抽取所有 clip 的特征，再经过 TCM/TBLM 输出检测结果。也就是说，LMM 主要是训练时的显存和时间优化，而不是推理时的模型结构依赖。

**与 AFSD 的关系**

AFSD 解决的是“如何让单阶段 anchor-free detector 精确定位边界”；TallFormer 解决的是“如何把强视频 Transformer 端到端训练到长视频定位里”。在 ActivityNet-1.3 上，TallFormer 直接继承 AFSD detection head，但用 LMM + TCM 替换了传统的密集特征提取流程。它的贡献不在于新的边界回归公式，而在于把原本显存不可承受的强短时编码器带回 TAL 训练闭环。

#### 🧪 练习题

```yaml
question: "TallFormer 中 Long Memory Module 的核心目的是什么？"
options:
  - "在推理阶段替代所有视频特征提取"
  - "训练时缓存未采样 clip 的历史特征，使模型只需重算一小部分 clip 仍能看到完整视频"
  - "把语言查询缓存为文本 memory"
  - "用动态规划枚举所有动作边界"
answer: 1
explain: "TallFormer 每轮只把采样 clip 送入 short-term Transformer，未采样 clip 从 per-video long memory 读取，从而显著降低端到端训练长视频 Transformer 的显存和计算开销。"
```
