### WeSaR (Weight Scaling as Reparameterization)
```yaml
id: wesar
name: WeSaR
full_name: "WeSaR (Weight Scaling as Reparameterization)"
year: "2025.10"
org: "学术界"
paper_url: "https://arxiv.org/abs/2410.16682"
category: "training"
parent: "—"
motivation: "可学习门控抑制梯度爆炸"
```

> 注：任务元信息中的 `paper_url` 指向 NVIDIA 的 LLM training stability 方法论文；但 `WeSaR (Weight Scaling as Reparameterization)` 对应的主论文是 *Initialization of Large Language Models via Reparameterization to Mitigate Loss Spikes*（arXiv:2410.05052）。以下精读以 WeSaR 主论文为方法依据，同时保留上方任务元信息原样。

#### 📝 一句话总结
WeSaR 提出用每个参数矩阵一个可学习 gate \(\alpha\) 进行权重缩放重参数化，把“满足梯度传播所需的函数尺度”和“参数自身的统一小范数”解耦，从而缓解 LLM 预训练中的 loss spike 与梯度/更新比例不稳定。它解决的是传统初始化中不同矩阵范数不均导致小范数矩阵更新比例过大的问题。

#### 🎯 核心要点
- 失稳诊断：论文把 loss spike 与不同参数矩阵的 update ratio \(\|\Delta W\|/\|W\|\) 不均联系起来。
- 范数冲突：Transformer 为避免梯度消失/爆炸需要某些矩阵采用非均匀初始化尺度，但小范数矩阵会对同等梯度更新更敏感。
- 权重缩放重参数化：每个参数矩阵使用 \(\bar W_i=\alpha_i W_i\)，模型前向使用虚拟权重 \(\bar W_i\)。
- 统一实际参数尺度：实际参数 \(W_i\) 全部用共同小标准差 \(\hat\sigma\) 初始化，降低 update ratio 不均。
- Gate 承担功能尺度：\(\alpha_i\) 初始化为目标初始化尺度与 \(\hat\sigma\) 的比值，使 \(\bar W_i\) 满足 He/residual scaling 等 backbone 初始化要求。
- 可学习且低开销：每个矩阵仅增加一个标量 gate，训练时可学习，推理时可合并为 \(\alpha_i W_i\)。
- 与 WeightNorm/Reparam 区别：WeSaR 不做逐行范数归一化或谱归一化，避免额外 normalization 反向开销。
- 实验覆盖：在 130M、1.3B、13B Transformer decoder 预训练上稳定并加速训练，在 WikiText、LAMBADA 与下游 SuperGLUE 评估中优于多种初始化和重参数化基线。

#### 🔬 深入细节
![WeSaR loss spike 与 update ratio 示意图](https://ar5iv.org/html/2410.05052/assets/x1.png)
*图：WeSaR 主论文 Figure 1 展示 13B Transformer 训练初期 loss spike，以及最后一层 FFN up/down projection 的 update ratio 变化；基线中小尺度矩阵的更新比例更大，而 WeSaR 使更新比例更稳定。*

WeSaR 的切入点不是“再设计一个更深的 Transformer 架构”，而是重新审视初始化尺度带来的训练动力学问题。LLM 预训练中的 loss spike 常被归因于异常 batch、优化器状态、attention entropy 或 logits 爆炸；WeSaR 论文关注的是另一个量：参数更新相对参数自身大小的比例，记为 \(r_i=\|\Delta W_i\|/\|W_i\|\)。如果某个矩阵因为 residual scaling 或特定初始化策略而范数很小，那么即使绝对更新量不大，\(r_i\) 也可能很大，导致这个矩阵在训练早期被过度扰动，进而触发不稳定。

传统初始化存在一个冲突：为了让反向传播的梯度尺度在深层网络中不爆炸也不消失，初始化标准差通常依赖 fan-in、fan-out、层深度或 residual 分支位置；但为了让不同参数矩阵有相近 update ratio，又希望所有矩阵本身的范数接近。WeSaR 的核心是把这两个目标拆开：实际可训练参数 \(W_i\) 负责保持统一的小范数，gate \(\alpha_i\) 负责把前向/反向看到的有效权重尺度调到初始化理论所需的大小。

具体地，对每个矩阵 \(W_i\)，WeSaR 不直接把它初始化为传统方法要求的标准差 \(\sigma_i\)，而是统一采样：

$$
W_i\sim\mathcal N(0,\hat\sigma^2),\qquad \bar W_i=\alpha_i W_i,
$$

其中 \(\hat\sigma\) 是所有矩阵共享的小标准差，\(\bar W_i\) 是模型实际使用的虚拟权重。为了让虚拟权重在初始时仍满足 backbone 初始化方法，gate 初始化为：

$$
\alpha_i^{(0)}=\frac{\sigma_i}{\hat\sigma},\qquad \mathrm{Std}(\bar W_i)=\mathrm{Std}(\alpha_i W_i)=\sigma_i.
$$

这样，前向和反向中的有效权重 \(\bar W_i\) 仍具备 He initialization、embedding scaling、residual scaling 等要求的函数尺度；但优化器直接维护的实际参数 \(W_i\) 都拥有接近的范数，更新比例更均匀。

```python
# WeSaR 初始化与训练伪代码
# sigma_target[i] 来自选定 backbone 初始化规则，例如 He init + residual scaling
sigma_common = 4e-5  # 论文默认量级，可作为超参数调节

for each parameter matrix i:
    W[i] = Normal(mean=0, std=sigma_common)
    alpha[i] = sigma_target[i] / sigma_common

for each training step:
    for each matrix i used by the Transformer:
        W_eff[i] = alpha[i] * W[i]
    loss = transformer_forward(parameters=W_eff)
    loss.backward()
    Adam.update(W, alpha)

for inference:
    fold W_eff[i] = alpha[i] * W[i]
    discard alpha[i]
```

论文给出的理论解释主要围绕 Adam。若模型使用 \(\bar W=\alpha W\)，则对实际参数的梯度满足 \(\nabla_W\mathcal L=\alpha\nabla_{\bar W}\mathcal L\)。Adam 的一阶动量和二阶动量会分别随 \(\alpha\) 与 \(\alpha^2\) 缩放，因此在忽略 \(\epsilon\) 与符号细节时，更新方向近似不依赖 \(\alpha\)：

$$
\Delta W_t\approx -\eta\frac{\alpha m_{\bar W,t}}{\sqrt{\alpha^2 v_{\bar W,t}}}
= -\eta\frac{m_{\bar W,t}}{\sqrt{v_{\bar W,t}}}.
$$

这意味着 gate 可以承担“把虚拟权重放大到合适函数尺度”的职责，而不会简单地把 Adam 对实际参数 \(W\) 的更新按同样比例放大。于是 WeSaR 可以选择更小的 \(\hat\sigma\)，让所有实际参数的范数更可控，同时保留梯度传播所需的有效尺度。

> 💡 关键：WeSaR 不是把权重归一化到固定范数，而是把“参数本体”和“函数中使用的缩放后权重”分离。训练时 gate 是可学习的稳定器；推理时 gate 可以折叠进权重，没有额外推理成本。

与 Weight Normalization 相比，WeSaR 的缩放粒度是“每个矩阵一个标量”，不是每一行一个归一化尺度，因此不需要在每个 batch 中计算行范数并反向传播通过归一化。与 \(\sigma\)-Reparam 相比，WeSaR 不需要估计谱范数，也不是专门通过控制 attention entropy 来稳定训练；它把所有参数矩阵纳入统一的小标准差初始化，并用 gate 对齐每个矩阵自己的目标尺度。与 residual scaling as reparameterization 相比，WeSaR 不是只处理残差分支相关矩阵，而是扩展到 Transformer 中所有主要参数矩阵。

训练流程上，WeSaR 通常可以作为初始化和参数化层面的改动接入预训练代码。模型结构、loss、数据流不需要改变；需要改变的是参数注册方式：原先一个矩阵 \(W\) 变成实际矩阵 \(W\) 与标量 gate \(\alpha\)，forward 时临时使用 \(\alpha W\)。由于每个矩阵只多一个标量，这个方法对参数量和通信量几乎无影响；在分布式训练中，gate 的同步开销也可以忽略。

实验上，论文在 130M、1.3B、13B Transformer decoder 上验证 WeSaR。主结果显示，WeSaR 相比 Small initialization 在 WikiText 和 LAMBADA perplexity 上更好，并在 13B 模型训练初期减少 loss spike。更值得关注的是消融结论：He initialization 本身可能产生 loss spike，但作为 WeSaR 的虚拟权重 backbone 反而有效，因为它负责梯度传播尺度；实际参数则由统一小 \(\hat\sigma\) 控制 update ratio。这说明 WeSaR 的价值正是解耦了“函数尺度”和“可训练参数尺度”。

#### 🧪 练习题
```yaml
question: "WeSaR 中 gate 参数 alpha 的核心作用是什么？"
options:
  - "把所有权重剪枝为稀疏矩阵，减少计算量"
  - "让实际参数保持统一小范数，同时把有效权重缩放到满足初始化规则的尺度"
  - "替代 Adam 的二阶动量估计，直接控制学习率"
  - "只缩放 attention logits，避免 softmax 过尖锐"
answer: 1
explain: "WeSaR 使用 alpha W 作为模型中的有效权重，alpha 承担每个矩阵所需的函数尺度，而 W 本身用共同小标准差初始化以稳定 update ratio。"
```

#### 📚 参考来源
- 任务给定链接：<https://arxiv.org/abs/2410.16682>
- WeSaR 主论文：<https://arxiv.org/abs/2410.05052>
- WeSaR HTML：<https://arxiv.org/html/2410.05052v1>
