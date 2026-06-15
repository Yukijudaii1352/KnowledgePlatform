### Q-DiT：量化扩散 Transformer

```yaml
id: q-dit
name: Q-DiT
full_name: "量化扩散Transformer (Quantized DiT)"
year: "2025"
org: "Multiple Institutions"
paper_url: "https://arxiv.org/abs/2406.09923"
category: diffusion
parent: dit
motivation: "高精度后量化支持W6A8低比特推理"
```

> 资料限制：manifest 中的 `paper_url` 指向 CliBench，而不是 Q-DiT。下文依据公开可访问的 Q-DiT 论文 `https://arxiv.org/abs/2406.17343` 与项目资料整理，YAML 仍保持 manifest 元信息不变。

#### 📝 一句话总结

Q-DiT 提出面向 Diffusion Transformer 的后训练量化框架，通过逐层自动分配 group quantization 粒度与样本级动态激活量化，解决 DiT 权重/激活分布方差大、随时间步漂移导致低比特量化失真的问题。

#### 🎯 核心要点

- 面向 DiT 的 PTQ：无需重新训练大规模扩散 Transformer，即可压缩权重与激活以降低推理成本
- 两个关键观察：权重和激活在输入通道维度存在显著空间方差，激活还会随扩散时间步和样本发生明显漂移
- 细粒度组量化：在输入通道维度切分 group，每个 group 独立计算量化参数，缓解通道异常值对整层量化尺度的污染
- 自动量化粒度分配：用进化搜索为不同层选择 group size，以 FID/FVD 等生成质量指标直接指导量化配置
- 样本级动态激活量化：推理时按当前样本、当前时间步和当前 group 在线计算 activation scale/zero point，避免静态校准参数跨时间步失效
- 实验覆盖 ImageNet 图像生成与 VBench 视频生成，重点验证 W6A8、W4A8 等低比特设置下的质量保持能力

#### 🔬 深入细节

##### 1. 核心示意图

![Q-DiT 总览图](https://arxiv.org/html/2406.17343v2/x1.png)
*图：Q-DiT 将每层权重和激活按相同 group size 量化，group size 由进化搜索分配；激活在推理时执行动态量化。*

##### 2. 背景与动机

Diffusion Transformer 把扩散模型从传统 UNet 架构推进到 Transformer 架构，带来了更强的图像和视频生成能力，但代价是更高的参数规模、矩阵乘开销和多步去噪延迟。后训练量化是部署这类模型的自然选择，因为它不要求保留原始训练数据，也不需要对大模型重新训练。

直接把 UNet 扩散模型或普通 ViT/LLM 的 PTQ 技术迁移到 DiT 会失败，核心原因在于 DiT 的量化误差来源不同。论文首先观察到，DiT 线性层的权重和激活在输入通道方向上的幅值差异很大；如果整层共享一个 scale，少数高幅值通道会把量化区间撑大，使大量普通通道被粗糙地舍入。

第二个问题来自扩散采样本身。去噪过程中的时间步 \(t\) 不同，激活分布也不同；同一时间步的不同生成样本也可能具有不同范围。静态校准只在少量 calibration samples 和固定时间步上估计量化参数，难以覆盖整个采样轨迹，因此会造成有偏量化。

##### 3. 量化基础

Q-DiT 采用常见的均匀仿射量化。给定浮点张量 \(\mathbf{x}\) 和 bit-width \(b\)，量化-反量化结果为：

$$
\hat{\mathbf{x}} = Q(\mathbf{x}; b)
= s \cdot \left(\operatorname{clip}\left(\left\lfloor \frac{\mathbf{x}}{s} \right\rceil + Z, 0, 2^b - 1\right) - Z\right)
$$

其中 scale 与 zero point 由张量范围给出：

$$
s = \frac{\max(\mathbf{x}) - \min(\mathbf{x})}{2^b - 1}, \qquad
Z = -\left\lfloor \frac{\min(\mathbf{x})}{s} \right\rceil
$$

如果 \(\max(\mathbf{x})-\min(\mathbf{x})\) 被少量 outlier 主导，\(s\) 会过大，低幅值元素就会落入很少的整数桶中。Q-DiT 的后续设计，本质上都是在缩小“同一套量化参数需要覆盖的分布范围”。

##### 4. 自动量化粒度分配

对线性层 \(\mathbf{Y}=\mathbf{X}\mathbf{W}\)，其中 \(\mathbf{X}\in\mathbb{R}^{n\times d_{\text{in}}}\)、\(\mathbf{W}\in\mathbb{R}^{d_{\text{in}}\times d_{\text{out}}}\)，Q-DiT 沿输入通道把 \(\mathbf{X}\) 和 \(\mathbf{W}\) 分成若干 group。设第 \(l\) 层 group size 为 \(g_l\)，则每个 group 使用独立量化器：

$$
\hat{Y}_{i,j}
= \sum_{u=0}^{d_{\text{in}}/g_l-1}\sum_{v=0}^{g_l-1}
Q_u^{\mathbf{X}}\!\left(X_{i,u g_l+v}\right)
Q_u^{\mathbf{W}}\!\left(W_{u g_l+v,j}\right)
$$

group size 越小，每组内部的数值范围越窄，量化误差通常越低；但论文发现 DiT 中这种关系并不单调。过小 group 会带来额外 rescale 与低精度计算组织成本，并且不同层对 group size 的敏感性不同。因此 Q-DiT 不手工指定统一 group size，而是把每层 \(g_l\) 作为搜索变量。

搜索过程使用进化算法：一个候选个体是一组逐层 group size 配置；评估时用该配置量化模型、生成一小批样本，并用 FID 或 FVD 近似衡量视觉质量；随后保留高质量个体，并通过 crossover、mutation 生成下一代。这个设计比逐层 reconstruction loss 更贴近扩散模型最终目标，因为扩散误差会在多步采样中累积，局部 MSE 不一定等价于最终图像/视频质量。

##### 5. 样本级动态激活量化

权重量化可以离线完成，因为权重在推理期间固定；激活则不能简单依赖离线校准。Q-DiT 在推理时针对当前样本、当前时间步、当前 group 动态计算 activation 的 min/max、scale 和 zero point，再执行低比特矩阵乘。

这个机制解决了两个静态 PTQ 很难覆盖的变化源：一是扩散时间步带来的分布漂移，二是不同 prompt/噪声种子生成样本之间的分布差异。直觉上，静态量化是在用“平均尺子”量所有时间步，而动态量化是在每个样本的每一步重新校准尺子。

动态激活量化也有额外开销，因此实现上需要和 linear/GEMM 前处理融合，避免在每层显式搬运大量中间张量。Q-DiT 的思路不是让所有计算都变得更复杂，而是在最容易失真的 activation scale 上增加少量在线统计，换取明显更低的量化误差。

##### 6. 核心流程伪代码

```python
# Q-DiT PTQ core flow
def search_group_sizes(model, calibration_prompts, candidates, budget):
    population = initialize_layerwise_group_configs(candidates, budget)
    for generation in range(num_generations):
        scored = []
        for config in population:
            q_model = quantize_weights_by_group(model, config)  # offline weight PTQ
            samples = generate_with_dynamic_activation_quant(q_model, calibration_prompts, config)
            score = fid_or_fvd(samples)                         # lower is better
            scored.append((score, config))
        elites = select_best(scored)
        population = crossover_and_mutate(elites, candidates, budget)
    return best_config(scored)

def qdit_inference(q_model, noise, prompt, group_config):
    z = noise
    for t in diffusion_timesteps:
        for layer in q_model.transformer_layers:
            g = group_config[layer.name]
            x_groups = split_input_channels(layer.input, group_size=g)
            q_x = []
            for x_g in x_groups:
                scale, zero = minmax_quant_params(x_g)          # sample-wise dynamic
                q_x.append(uniform_quantize(x_g, scale, zero, bits=8))
            layer.output = low_bit_matmul(q_x, layer.quantized_weight)
        z = denoise_step(q_model, z, prompt, t)
    return decode_latent(z)
```

##### 7. 与传统量化方法的区别

传统 PTQ 常把 CNN/UNet 的局部 reconstruction error 作为优化目标，或者对 Transformer 采用较固定的 per-channel/per-token 规则。Q-DiT 的差异在于它把 DiT 的生成式特征放到中心：量化配置直接用生成样本质量评价，并且显式处理扩散时间步导致的 activation 漂移。

与纯 channel-wise 量化相比，group quantization 是质量和硬件效率之间的折中。每个输入通道一套量化参数最精细，但实际低精度 GEMM 中会频繁 rescale，效率差；整层一套参数效率高但误差大。Q-DiT 让不同层使用不同 group size，相当于把精度预算优先分给更敏感的层。

> 💡 关键：Q-DiT 的贡献不只是“把 DiT 量化到 W6A8/W4A8”，而是识别出 DiT 量化最脆弱的两个维度：输入通道方差与时间步激活漂移，并分别用 group search 和 dynamic activation quantization 对症处理。

#### 🧪 练习题

```yaml
question: "Q-DiT 为什么需要样本级动态激活量化？"
options:
  - "因为 DiT 的权重在推理时会随时间步变化"
  - "因为激活分布会随扩散时间步和不同样本漂移，静态校准参数容易失效"
  - "因为动态量化可以完全避免整数矩阵乘法"
  - "因为 group size 越小一定带来越好的 FID"
answer: 1
explain: "Q-DiT 的关键观察是 activation 在时间步和样本维度都有显著变化，因此推理时在线计算每组 scale/zero point 能降低有偏量化误差。"
```
