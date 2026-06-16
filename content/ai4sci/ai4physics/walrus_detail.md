### Walrus

```yaml
id: walrus
name: Walrus
full_name: "海象基础模型 (Walrus)"
year: "2026"
org: "Polymathic AI"
paper_url: "https://www.simonsfoundation.org/2025/12/09/polymathic-ai-announces-walrus-and-aion-1-foundation-models-for-science/"
category: "pde_solving"
parent: "poseidon"
motivation: "15TB数据训练跨领域物理基础模型"
```

#### 📝 一句话总结

Walrus 是 Polymathic AI 面向连续介质动力学的跨领域物理基础模型，用 1.3B 参数的时空 Transformer 在 19 类、63 个物理变量的 2D/3D 流体及类流体数据上预训练，并通过 patch jittering、2D/3D 统一增强、adaptive-compute tokenization 和拓扑感知分布式采样提升长期稳定性与训练吞吐。

#### 🎯 核心要点

- **模型定位**：面向 fluid-like continuum dynamics 的通用代理仿真模型，可做 next-step prediction、autoregressive rollout 和下游微调
- **模型规模**：论文报告 Walrus 为 1.3B 参数 Transformer，训练覆盖 The Well 与 FlowBench 等来源
- **训练数据**：19 个物理场景、63 个状态变量，覆盖 astrophysics、geoscience、rheology、plasma physics、acoustics、classical fluids；新闻/项目页说明 The Well 约 15TB
- **核心架构**：space-time factorized transformer，交替执行空间 attention 与时间 causal attention
- **自适应 tokenization**：encoder/decoder 使用 Convolutional Stride Modulation，根据输入分辨率动态选择下采样/上采样步幅
- **长期稳定性**：patch jittering 在 patch 化前随机平移参考系，缓解 stride/patch 操作造成的 aliasing 与网格印记
- **跨维度训练**：将 2D 数据作为 3D 中的薄平面并施加 tensor-law aware rotation/reflection，使 2D/3D 数据能进入统一训练流程
- **分布式效率**：topology-aware sampling 让 HSDP/FSDP 组内采样同类数据，论文报告相对朴素 FSDP 吞吐提升 262%

#### 🔬 深入细节

##### 图示与来源

![Walrus 架构示意图](https://raw.githubusercontent.com/PolymathicAI/walrus/main/assets/ArchitectureWIP.png)
*图：Walrus 官方 GitHub README 中的架构示意，展示 adaptive-compute patching、patch jitter、空间/时间 attention 与逆 patch jitter。给定 `paper_url` 是新闻页；可追溯论文为 arXiv:2511.15684（https://arxiv.org/abs/2511.15684），官方代码为 https://github.com/PolymathicAI/walrus，模型卡为 https://huggingface.co/polymathic-ai/walrus。*

##### 算法伪代码

```python
# Walrus 训练/推理伪代码
def walrus_forward(history, system_meta):
    # history = [u(t-tau+1), ..., u(t)]，包含多个物理场
    x = normalize_by_rms(history)             # per-field RMS over space-time

    if system_meta.dim == 2:
        x = embed_2d_as_thin_3d_plane(x)      # singleton dimension + zero padding
        x = tensor_law_augmentation(x)        # vector: R u, tensor: R u R^T

    shift = sample_patch_jitter()
    x = translate_reference_frame(x, shift)

    tokens = adaptive_compute_patch(x)        # CSM 动态选择 stride，控制 token 数
    h = encoder_hmlp(tokens)

    for block in transformer_blocks:
        h = spatial_attention(h, axial_rope=True)
        h = temporal_causal_attention(h, t5_relative_position=True)
        h = swiglu_mlp(h)

    delta_norm = decoder_hmlp(h)
    delta = denormalize_by_delta_rms(delta_norm)
    delta = inverse_translate(delta, shift)
    return history[-1] + delta

for step in pretraining:
    source = topology_aware_sample_source()   # HSDP shard group 内采同一来源
    stride = random_int(1, 5)
    history, target_delta = sample_history_and_delta(source, stride)
    pred = walrus_forward(history, source.meta)
    loss = per_field_normalized_l1(pred - history[-1], target_delta)
    optimizer.step(loss)
```

##### 预测目标：学习残差式动力学更新

Walrus 不要求显式输入 PDE 系数或方程文本，而是从一小段历史快照中推断系统动力学。论文把任意系统 \(S\) 的离散快照写作 \(u_t^S\)，历史窗口为：

$$
U_t^S=[u_{t-\tau\Delta t}^S,\ldots,u_t^S]
$$

模型学习下一步残差：

$$
u_{t+\Delta t}^S \approx u_t^S + M(U_t^S)
$$

这种残差式预测适合连续动力学：模型只需预测下一步变化 \(\Delta u\)，而不是重新生成完整物理状态。推理时反复应用该更新即可得到长期 rollout。

##### 架构：空间-时间分解 Transformer

Walrus 使用 factorized space-time transformer。空间维度上采用并行化 attention 与 axial RoPE 编码位置；时间维度上使用 causal attention 和 T5-style relative position encoding，保证 next-step 预测只能使用历史信息。每个 block 中空间与时间 attention 分解计算，避免把所有空间点和时间帧拼成一个超长序列后做全局二次 attention。

encoder/decoder 不是固定 patch 大小，而是使用 Convolutional Stride Modulation。训练时，系统分辨率、维度和长宽比各不相同，固定 patching 会导致某些样本 token 极多、某些样本 token 极少。CSM 通过调整下采样 stride，把 2D 样本控制在约 \(32\) 个 token/轴、3D 样本控制在约 \(16\) 个 token/轴附近，从而让不同来源的样本在 GPU 上具有更接近的计算负载。

##### Patch jittering：抑制长期 rollout 的网格化误差

ViT 式 patchification 或 strided convolution 会进行规则下采样和上采样。对于物理场，这类规则重采样会引入 aliasing，长期自回归时小误差会沿固定网格累积，出现周期性纹理或不稳定增长。Walrus 的 patch jittering 在每一步 patch 化前随机平移参考系，边界按任务类型做 padding，然后在输出后再逆平移回原坐标。

直觉上，若固定下采样模式造成某些频率别名总是被同一种方式放大，随机平移会打散这个确定性误差通道。论文从 Fourier shift property 解释这一点，并报告 patch jittering 改善了 17/19 个预训练数据集的长期验证 rollout，中长程误差显著降低。

##### 2D/3D 统一与 tensor-law aware augmentation

Walrus 的跨领域性不仅来自数据量，还来自把不同维度和不同变量类型放入同一物理一致的增强空间。2D 场会先被嵌入为 3D 薄平面，例如 \((H,W)\) 的速度 \((v_x,v_y)\) 被扩成 \((H,W,1)\) 的 \((v_x,v_y,0)\)。随后使用 90 度旋转和反射等变换，但对不同阶数的物理量采用不同变换律：

$$
\text{vector field:}\quad u \mapsto R u
$$

$$
\text{rank-2 tensor field:}\quad u \mapsto R u R^\top
$$

这样可以避免“图像增强”式的数据变换破坏物理含义。例如旋转速度场时，只旋转像素位置而不旋转速度方向是不一致的；Walrus 显式按张量阶数同步变换数值。

##### 归一化损失与高效采样

Walrus 学的是 \(\Delta u\)，输入 \(U_t\) 和输出 \(\Delta u_{t+1}\) 的尺度通常不同，因此使用非对称归一化：输入场按历史窗口的 space-time RMS 归一化，输出残差按 \(\Delta U_t\) 的 RMS 反归一化。训练损失是按物理场归一化的 L1：

$$
\mathcal{L}
=\frac{1}{q}\sum_{i=1}^{q}
\frac{
\left\|M(U_t^{(i)})-\Delta u_{t+1}^{(i)}\right\|_1
}{
\mathrm{RMS}_{\mathrm{Space}\times\mathrm{Time}}(\Delta U_t^{(i)})
}
$$

这个设计让快速变化的大幅值变量不会完全主导 loss，同时也让缓慢变化但可预测的变量得到足够权重。训练时还随机采样 time stride \(1\) 到 \(5\)，迫使模型从历史上下文推断相对时间尺度，而不是只记住固定时间间隔。

分布式训练方面，异构数据会让 FSDP/HSDP 中不同 rank 的计算量差异很大，产生等待。Walrus 使用 topology-aware sampling，让同一个 sharding group 内的 rank 采样同一数据源，同时通过差异化 batch size 和历史长度平衡 2D/3D 负载。论文报告这些改动组合后吞吐相对朴素 FSDP 提升 262%。

> ⚠️ 来源说明：任务给定的是 Simons Foundation 新闻/项目页，方法细节主要依据可追溯 arXiv 论文、官方 GitHub README 与 Hugging Face 模型卡整理；新闻页用于确认 Walrus/AION-1 发布背景与 The Well 15TB 数据规模描述。

#### 🧪 练习题

```yaml
question: "Walrus 中 patch jittering 的主要作用是什么？"
options:
  - "把 2D 数据永久降采样成低分辨率图像"
  - "在 patch 化前随机平移参考系，缓解规则下采样造成的 aliasing 和长期 rollout 网格误差"
  - "把所有物理变量转换成文本 token"
  - "替代时间 causal attention，使模型只做空间预测"
answer: 1
explain: "patch jittering 随机化 patch/stride 的相对位置，打散固定重采样模式造成的频谱伪影，从而提升自回归长期稳定性。"
```
